#!/usr/bin/env python3
"""
Comprehensive Time Zone Converter — Python (CLI + Library)

Features
- Convert time between any two time zones (IANA).
- Multiple current-time displays.
- Time zone abbreviation recognition (best-effort), UTC offset calculations.
- DST: automatic handling; transition date calculations; simple historical changes report; impact on recurring meetings.
- Business tools: meeting time coordinator; business-hours overlap; international call planner; travel time adjustment helper.
- Advanced: time zone history scan; custom (fixed-offset) time zones; simple solar time approximation; astronomical (Julian Day & sidereal time).

Requires: Python 3.9+ (uses zoneinfo). No external deps.
"""

from __future__ import annotations
import argparse
import sys
import math
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
from typing import List, Tuple, Dict, Optional, Iterable

# -----------------------------
# Abbreviation support (best-effort)
# Note: Many abbreviations are ambiguous. We map to a representative IANA zone.
# Users can always pass a full IANA name instead (recommended).
ABBREV_TO_IANA = {
    # North America (representatives)
    "EST": "America/New_York",   # EST/EDT will auto-handle DST by date
    "EDT": "America/New_York",
    "CST": "America/Chicago",
    "CDT": "America/Chicago",
    "MST": "America/Denver",
    "MDT": "America/Denver",
    "PST": "America/Los_Angeles",
    "PDT": "America/Los_Angeles",
    # Europe
    "GMT": "Etc/UTC",
    "BST": "Europe/London",
    "WET": "Europe/Lisbon",
    "WEST": "Europe/Lisbon",
    "CET": "Europe/Paris",
    "CEST": "Europe/Paris",
    "EET": "Europe/Athens",
    "EEST": "Europe/Athens",
    "IST": "Asia/Kolkata",  # India Standard Time (common use). Ireland also uses IST (Irish); ambiguous!
    "WEST_AFRICA": "Africa/Lagos",
    # APAC
    "JST": "Asia/Tokyo",
    "KST": "Asia/Seoul",
    "AEST": "Australia/Sydney",
    "AEDT": "Australia/Sydney",
    "ACST": "Australia/Adelaide",
    "ACDT": "Australia/Adelaide",
    "AWST": "Australia/Perth",
    # Middle East
    "GST": "Asia/Dubai",
}

def parse_zone(name: str) -> ZoneInfo:
    # Fixed-offset custom tz like "UTC+05:30" or "UTC-07"
    if name.upper().startswith("UTC"):
        rest = name[3:].strip()
        if rest == "" or rest == "Z":
            return ZoneInfo("Etc/UTC")
        # Parse +/-HH[:MM]
        sign = 1
        s = rest
        if s.startswith("+"):
            sign = 1
            s = s[1:]
        elif s.startswith("-"):
            sign = -1
            s = s[1:]
        if ":" in s:
            hh, mm = s.split(":", 1)
        else:
            hh, mm = s, "00"
        try:
            hours = int(hh)
            minutes = int(mm)
        except ValueError:
            raise ZoneInfoNotFoundError(f"Invalid UTC offset: {name}")
        offset = sign * (hours * 3600 + minutes * 60)
        return timezone(timedelta(seconds=offset))  # type: ignore[return-value]
    # Abbrev mapping
    key = name.strip()
    if key.upper() in ABBREV_TO_IANA:
        return ZoneInfo(ABBREV_TO_IANA[key.upper()])
    # Try IANA
    try:
        return ZoneInfo(key)
    except Exception:
        raise ZoneInfoNotFoundError(f"Unknown time zone/abbreviation: {name}")

# -----------------------------
# Helpers

def iso_parse(dt_str: str) -> datetime:
    """
    Accepts:
      - naive ISO local "YYYY-MM-DDTHH:MM" (treated as local to --from zone)
      - with seconds "YYYY-MM-DDTHH:MM:SS"
      - with 'Z' or offset "+05:30" (converted to aware dt as-is)
    """
    try:
        # Python 3.11+: fromisoformat handles offsets; for Z replace 'Z' with +00:00
        if dt_str.endswith("Z"):
            dt_str = dt_str[:-1] + "+00:00"
        return datetime.fromisoformat(dt_str)
    except Exception as e:
        raise ValueError(f"Could not parse datetime '{dt_str}': {e}")

def fmt(dt: datetime, zone: ZoneInfo | timezone) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=zone)  # interpret naive as zone-local
    return dt.astimezone(zone).strftime("%Y-%m-%d %H:%M:%S %Z%z")

def current_time_in_zones(zones: Iterable[str]) -> List[Tuple[str, str]]:
    out = []
    now_utc = datetime.now(timezone.utc)
    for z in zones:
        zi = parse_zone(z)
        out.append((z, now_utc.astimezone(zi).strftime("%Y-%m-%d %H:%M:%S %Z%z")))
    return out

def convert_time(dt_in: datetime, from_zone: str, to_zone: str) -> datetime:
    z_from = parse_zone(from_zone)
    z_to = parse_zone(to_zone)
    if dt_in.tzinfo is None:
        aware = dt_in.replace(tzinfo=z_from)
    else:
        aware = dt_in.astimezone(z_from)
    return aware.astimezone(z_to)

def utc_offset_string(zone: str, when: Optional[datetime] = None) -> str:
    zi = parse_zone(zone)
    when = when or datetime.now(timezone.utc)
    local = when.astimezone(zi)
    return local.strftime("%Z %z")

# -----------------------------
# DST analysis

def _scan_transitions(zone: str, year: int, step_minutes: int = 30) -> List[Tuple[datetime, int]]:
    """
    Return list of (timestamp_UTC, total_offset_seconds) whenever offset changes.
    We scan the year in 'step_minutes' increments (coarse but dependency-free).
    """
    zi = parse_zone(zone)
    start = datetime(year, 1, 1, tzinfo=timezone.utc)
    end = datetime(year + 1, 1, 1, tzinfo=timezone.utc)
    results = []
    last_off = None
    t = start
    while t < end:
        local = t.astimezone(zi)
        off = int(local.utcoffset().total_seconds()) if local.utcoffset() else 0
        if last_off is None:
            last_off = off
        elif off != last_off:
            results.append((t, off))
            last_off = off
        t += timedelta(minutes=step_minutes)
    return results

def dst_transitions(zone: str, year: int) -> List[str]:
    """
    Human-readable transition moments (UTC & local).
    """
    zi = parse_zone(zone)
    trans = _scan_transitions(zone, year)
    out = []
    for t_utc, off in trans:
        local = t_utc.astimezone(zi)
        out.append(f"{zone}: transition near {local.strftime('%Y-%m-%d %H:%M')} ({utc_offset_string(zone, local)}) [UTC {t_utc:%Y-%m-%d %H:%M}]")
    if not out:
        out.append(f"{zone}: no offset changes detected in {year}.")
    return out

def dst_history(zone: str, start_year: int, end_year: int) -> List[str]:
    lines = []
    for y in range(start_year, end_year + 1):
        tr = _scan_transitions(zone, y)
        parts = ", ".join(f"{t:%b %d %H:%M}Z→{off//3600:+d}h" for t, off in tr) or "no changes"
        lines.append(f"{zone} {y}: {parts}")
    return lines

# -----------------------------
# Business utilities

def meeting_coordinator(base_zone: str, dt_local: datetime, participant_zones: List[str]) -> List[Tuple[str, str]]:
    """
    Given a base-zone local datetime (naive or aware), return participant local times.
    """
    base = parse_zone(base_zone)
    if dt_local.tzinfo is None:
        dt_local = dt_local.replace(tzinfo=base)
    else:
        dt_local = dt_local.astimezone(base)
    return [(z, fmt(dt_local, parse_zone(z))) for z in participant_zones]

def business_overlap(zones: List[str], date: Optional[datetime] = None,
                     start_hour: int = 9, end_hour: int = 17) -> Dict[str, Tuple[str, bool]]:
    """
    For each zone, tell if now (or given 'date') falls within [start_hour, end_hour).
    Also returns the local formatted time for context.
    """
    out: Dict[str, Tuple[str, bool]] = {}
    utc_now = (date or datetime.now(timezone.utc)).astimezone(timezone.utc)
    for z in zones:
        zi = parse_zone(z)
        local = utc_now.astimezone(zi)
        in_window = (start_hour <= local.hour < end_hour)
        out[z] = (local.strftime("%Y-%m-%d %H:%M:%S %Z%z"), in_window)
    return out

def call_planner(zone_a: str, zone_b: str,
                 a_window: Tuple[int, int] = (8, 22),
                 b_window: Tuple[int, int] = (8, 22),
                 date: Optional[datetime] = None,
                 step_minutes: int = 30) -> List[str]:
    """
    Find windows on a given date (default: today) that are acceptable for both sides.
    Returns list of readable slots in A's local time, with B's equivalent.
    """
    zi_a = parse_zone(zone_a)
    zi_b = parse_zone(zone_b)
    if date is None:
        # Use today's date in A's zone
        today_a = datetime.now(zi_a)
    else:
        today_a = date.astimezone(zi_a)
    start_a = today_a.replace(hour=a_window[0], minute=0, second=0, microsecond=0)
    end_a = today_a.replace(hour=b_window[1], minute=0, second=0, microsecond=0)  # We'll scan until end of B-window max; safe to go 24h
    t = start_a
    slots = []
    while t < start_a.replace(hour=23, minute=59):
        in_a = a_window[0] <= t.hour < a_window[1]
        t_b = t.astimezone(zi_b)
        in_b = b_window[0] <= t_b.hour < b_window[1]
        if in_a and in_b:
            slots.append(f"{t.strftime('%Y-%m-%d %H:%M')} {zone_a}  ⇄  {t_b.strftime('%Y-%m-%d %H:%M')} {zone_b}")
        t += timedelta(minutes=step_minutes)
    return slots or ["No overlapping slots found with given windows."]

def travel_adjust(from_zone: str, to_zone: str, depart_local: datetime,
                  hours_per_day_shift: float = 1.5) -> List[str]:
    """
    Simple jet-lag helper: compute time difference and suggest daily shift plan.
    """
    z_from = parse_zone(from_zone)
    z_to = parse_zone(to_zone)
    if depart_local.tzinfo is None:
        depart_local = depart_local.replace(tzinfo=z_from)
    offset = (depart_local.astimezone(z_to).utcoffset() or timedelta()).total_seconds() / 3600.0
    # Compute absolute difference in hours between zones at that date/time
    from_off = (depart_local.utcoffset() or timedelta()).total_seconds() / 3600.0
    to_off = (depart_local.astimezone(z_to).utcoffset() or timedelta()).total_seconds() / 3600.0
    diff = to_off - from_off
    wrap = ((diff + 12) % 24) - 12  # choose shortest direction
    days = math.ceil(abs(wrap) / hours_per_day_shift) if hours_per_day_shift > 0 else 0
    plan = [f"Zone difference at departure: {wrap:+.1f} hours (shortest direction). Estimated days to adjust: {days}."]
    cur = 0.0
    for d in range(1, days + 1):
        shift = min(hours_per_day_shift, abs(wrap) - abs(cur))
        cur += math.copysign(shift, wrap)
        plan.append(f"Day {d}: shift sleep/wake by {math.copysign(shift, wrap):+.1f}h (cumulative {cur:+.1f}h).")
    if days == 0:
        plan.append("No adjustment needed.")
    return plan

# -----------------------------
# Advanced

def time_zone_history(zone: str, years: int = 10) -> List[str]:
    now = datetime.now(timezone.utc)
    start_year = now.year - years + 1
    return dst_history(zone, start_year, now.year)

def solar_time_adjustment(clock_dt: datetime, longitude_deg: float,
                          zone: str) -> Tuple[str, str]:
    """
    Very rough solar time approximation:
    Solar time ≈ clock time + (longitude - tz_meridian)/15 hours + Equation of Time (in hours).
    tz_meridian ~ offset_hours * 15°.
    Equation of Time (minutes) ≈ 9.87 sin(2B) - 7.53 cos(B) - 1.5 sin(B), B = 2π (day-81)/364
    """
    zi = parse_zone(zone)
    local = clock_dt if clock_dt.tzinfo else clock_dt.replace(tzinfo=zi)
    local = local.astimezone(zi)
    # Offset hours at that moment:
    off_hours = (local.utcoffset() or timedelta()).total_seconds() / 3600.0
    tz_meridian = off_hours * 15.0
    # Day of year
    n = int(local.strftime("%j"))
    B = 2 * math.pi * (n - 81) / 364.0
    eot_minutes = 9.87 * math.sin(2 * B) - 7.53 * math.cos(B) - 1.5 * math.sin(B)
    eot_hours = eot_minutes / 60.0
    correction_hours = (longitude_deg - tz_meridian) / 15.0 + eot_hours
    solar_dt = local + timedelta(hours=correction_hours)
    return (local.strftime("%Y-%m-%d %H:%M:%S %Z%z"),
            solar_dt.strftime("%Y-%m-%d %H:%M:%S (approx solar)"))

# Astronomical: Julian Day and sidereal time (approx)

def julian_day(dt: datetime) -> float:
    """
    Algorithm valid for Gregorian calendar dates after 1582-10-15.
    Converts UTC datetime to Julian Day.
    """
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    dt = dt.astimezone(timezone.utc)
    y = dt.year
    m = dt.month
    d = dt.day + (dt.hour + (dt.minute + dt.second/60)/60)/24
    if m <= 2:
        y -= 1
        m += 12
    A = y // 100
    B = 2 - A + A // 5
    jd = int(365.25*(y + 4716)) + int(30.6001*(m + 1)) + d + B - 1524.5
    return jd

def greenwich_sidereal_time(dt: datetime) -> float:
    """
    Returns GST in hours [0,24). Approximate IAU expression.
    """
    jd = julian_day(dt)
    T = (jd - 2451545.0) / 36525.0
    # GMST in seconds
    gmst = (67310.54841
            + (876600.0*3600 + 8640184.812866)*T
            + 0.093104*T*T
            - 6.2e-6*T*T*T)
    gmst_hours = (gmst/3600.0) % 24
    return gmst_hours

def local_sidereal_time(dt: datetime, longitude_deg: float) -> float:
    """
    LST (hours) at given east-positive longitude.
    """
    gst = greenwich_sidereal_time(dt)
    lst = (gst + longitude_deg/15.0) % 24
    return lst

# -----------------------------
# CLI

def build_cli() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Time Zone Conversion Tool (with DST & business utilities)")
    sub = p.add_subparsers(dest="cmd", required=True)

    # convert
    c = sub.add_parser("convert", help="Convert time between zones")
    c.add_argument("--from", dest="from_zone", required=True)
    c.add_argument("--to", dest="to_zone", required=True)
    c.add_argument("--dt", required=True, help="ISO datetime (e.g., 2025-08-16T15:00 or 2025-08-16T15:00:00+05:30)")

    # now
    n = sub.add_parser("now", help="Current time in multiple zones")
    n.add_argument("zones", nargs="+", help="IANA zones or abbreviations")

    # offset
    o = sub.add_parser("offset", help="Show UTC offset/abbrev at a time")
    o.add_argument("zone")
    o.add_argument("--dt", default=None, help="Optional ISO datetime (default: now UTC)")

    # dst transitions
    d = sub.add_parser("dst", help="Show DST/offset transitions for a year")
    d.add_argument("zone")
    d.add_argument("year", type=int)

    # dst history
    dh = sub.add_parser("dst-history", help="Show DST/offset change history for a range")
    dh.add_argument("zone")
    dh.add_argument("start_year", type=int)
    dh.add_argument("end_year", type=int)

    # meeting coordinator
    m = sub.add_parser("meeting", help="Show participant local times for a meeting")
    m.add_argument("--base", required=True, help="Base zone")
    m.add_argument("--dt", required=True, help="Base-zone local datetime (ISO)")
    m.add_argument("--participants", nargs="+", required=True)

    # business overlap
    b = sub.add_parser("overlap", help="Business-hours overlap status now")
    b.add_argument("zones", nargs="+")
    b.add_argument("--start", type=int, default=9)
    b.add_argument("--end", type=int, default=17)

    # call planner
    cp = sub.add_parser("call", help="International call planner (find overlapping windows today)")
    cp.add_argument("--a", required=True)
    cp.add_argument("--b", required=True)
    cp.add_argument("--a-window", default="8-22")
    cp.add_argument("--b-window", default="8-22")
    cp.add_argument("--step-min", type=int, default=30)

    # travel adjustment
    ta = sub.add_parser("travel", help="Travel adjustment plan")
    ta.add_argument("--from", dest="from_zone", required=True)
    ta.add_argument("--to", dest="to_zone", required=True)
    ta.add_argument("--depart", required=True, help="Departure local datetime in FROM zone (ISO)")
    ta.add_argument("--shift-rate", type=float, default=1.5, help="Hours/day shift capacity")

    # advanced: tz history (last N years)
    th = sub.add_parser("tz-history", help="Time zone history (last N years)")
    th.add_argument("zone")
    th.add_argument("--years", type=int, default=10)

    # advanced: solar time (approx)
    st = sub.add_parser("solar", help="Approx solar time from clock time, longitude, and zone")
    st.add_argument("--zone", required=True)
    st.add_argument("--dt", required=True)
    st.add_argument("--lon", type=float, required=True, help="Longitude (east positive)")

    # advanced: sidereal time
    sid = sub.add_parser("sidereal", help="Local sidereal time (hours)")
    sid.add_argument("--dt", required=True, help="UTC or with offset")
    sid.add_argument("--lon", type=float, required=True, help="Longitude (east positive)")

    return p

def parse_window(spec: str) -> Tuple[int, int]:
    try:
        a, b = spec.split("-", 1)
        return int(a), int(b)
    except Exception:
        raise ValueError(f"Bad window spec '{spec}', expected H1-H2")

def main(argv: List[str] | None = None) -> int:
    args = build_cli().parse_args(argv)

    if args.cmd == "convert":
        dt = iso_parse(args.dt)
        out = convert_time(dt, args.from_zone, args.to_zone)
        print(fmt(out, out.tzinfo))
        return 0

    if args.cmd == "now":
        for z, s in current_time_in_zones(args.zones):
            print(f"{z}: {s}")
        return 0

    if args.cmd == "offset":
        when = iso_parse(args.dt) if args.dt else None
        print(utc_offset_string(args.zone, when))
        return 0

    if args.cmd == "dst":
        for line in dst_transitions(args.zone, args.year):
            print(line)
        return 0

    if args.cmd == "dst-history":
        for line in dst_history(args.zone, args.start_year, args.end_year):
            print(line)
        return 0

    if args.cmd == "meeting":
        dt = iso_parse(args.dt)
        for z, s in meeting_coordinator(args.base, dt, args.participants):
            print(f"{z}: {s}")
        return 0

    if args.cmd == "overlap":
        res = business_overlap(args.zones, start_hour=args.start, end_hour=args.end)
        for z, (local, ok) in res.items():
            print(f"{z}: {local}  within [{args.start:02d}:00–{args.end:02d}:00)? {'YES' if ok else 'no'}")
        return 0

    if args.cmd == "call":
        a1, a2 = parse_window(args.a_window)
        b1, b2 = parse_window(args.b_window)
        for slot in call_planner(args.a, args.b, (a1, a2), (b1, b2), step_minutes=args.step_min):
            print(slot)
        return 0

    if args.cmd == "travel":
        dt = iso_parse(args.depart)
        for line in travel_adjust(args.from_zone, args.to_zone, dt, args.shift_rate):
            print(line)
        return 0

    if args.cmd == "tz-history":
        for line in time_zone_history(args.zone, args.years):
            print(line)
        return 0

    if args.cmd == "solar":
        dt = iso_parse(args.dt)
        local, solar = solar_time_adjustment(dt, args.lon, args.zone)
        print(f"Clock local: {local}")
        print(f"Approx solar: {solar}")
        return 0

    if args.cmd == "sidereal":
        dt = iso_parse(args.dt)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        lst = local_sidereal_time(dt, args.lon)
        print(f"LST ≈ {lst:05.2f} hours")
        return 0

    return 1

if __name__ == "__main__":
    sys.exit(main())
