/**
 * Comprehensive Time Zone Converter — JavaScript (ES Module)
 *
 * Uses Luxon for robust IANA time zones & DST handling:
 *   npm i luxon
 *
 * Supports:
 * - Time conversion
 * - Current times for multiple zones
 * - Offset/abbrev
 * - DST transitions (coarse scan), history
 * - Meeting coordinator, business overlap, call planner
 * - Travel adjustment
 * - Simple solar time & sidereal time (approx)
 */

import { DateTime, Interval } from "luxon";

// Ambiguous abbreviations -> representative IANA zones (best-effort)
const ABBREV = {
  EST: "America/New_York",
  EDT: "America/New_York",
  CST: "America/Chicago",
  CDT: "America/Chicago",
  MST: "America/Denver",
  MDT: "America/Denver",
  PST: "America/Los_Angeles",
  PDT: "America/Los_Angeles",
  GMT: "UTC",
  BST: "Europe/London",
  CET: "Europe/Paris",
  CEST: "Europe/Paris",
  EET: "Europe/Athens",
  EEST: "Europe/Athens",
  IST: "Asia/Kolkata",
  JST: "Asia/Tokyo",
  KST: "Asia/Seoul",
  AEST: "Australia/Sydney",
  AEDT: "Australia/Sydney",
  ACST: "Australia/Adelaide",
  ACDT: "Australia/Adelaide",
  AWST: "Australia/Perth",
  GST: "Asia/Dubai",
};

function parseZone(z) {
  if (!z) throw new Error("Missing zone");
  const up = z.toUpperCase();
  if (up.startsWith("UTC")) {
    // UTC+05:30, UTC-7
    const rest = z.slice(3).trim();
    if (!rest || rest === "Z") return "UTC";
    return `UTC${rest}`;
  }
  if (ABBREV[up]) return ABBREV[up];
  return z;
}

export class TimezoneConverter {
  static convert(dtISO, fromZone, toZone) {
    const fz = parseZone(fromZone);
    const tz = parseZone(toZone);
    const dt = DateTime.fromISO(dtISO, { zone: fz });
    if (!dt.isValid) throw new Error("Invalid datetime");
    return dt.setZone(tz).toFormat("yyyy-LL-dd HH:mm:ss ZZZZ");
  }

  static nowIn(zones) {
    return zones.map((z) => {
      const zone = parseZone(z);
      const t = DateTime.now().setZone(zone);
      return { zone: z, time: t.toFormat("yyyy-LL-dd HH:mm:ss ZZZZ") };
    });
  }

  static offset(zone, dtISO = null) {
    const z = parseZone(zone);
    const dt = dtISO ? DateTime.fromISO(dtISO).setZone(z) : DateTime.now().setZone(z);
    return dt.toFormat("ZZZZ"); // e.g., GMT+05:30 or PDT -07:00
  }

  // ----- DST -----

  static dstTransitions(zone, year, stepMinutes = 30) {
    const z = parseZone(zone);
    let t = DateTime.fromObject({ year, month: 1, day: 1, hour: 0 }, { zone: "UTC" });
    const end = t.plus({ years: 1 });
    let last = null;
    const out = [];
    while (t < end) {
      const local = t.setZone(z);
      const off = local.offset; // minutes
      if (last === null) last = off;
      else if (off !== last) {
        out.push(`${zone}: transition near ${local.toFormat("yyyy-LL-dd HH:mm")} (${local.toFormat("ZZZZ")}) [UTC ${t.toFormat("yyyy-LL-dd HH:mm")}]`);
        last = off;
      }
      t = t.plus({ minutes: stepMinutes });
    }
    if (!out.length) out.push(`${zone}: no offset changes detected in ${year}.`);
    return out;
  }

  static dstHistory(zone, startYear, endYear) {
    const out = [];
    for (let y = startYear; y <= endYear; y++) {
      const trans = this.dstTransitions(zone, y);
      out.push(`${zone} ${y}: ${trans.length > 1 ? `${trans.length} changes` : (trans[0].includes("no offset") ? "no changes" : "1 change")}`);
    }
    return out;
  }

  // ----- Business -----

  static meetingCoordinator(baseZone, dtISO, participantZones) {
    const base = parseZone(baseZone);
    const baseDt = DateTime.fromISO(dtISO, { zone: base });
    if (!baseDt.isValid) throw new Error("Invalid datetime");
    return participantZones.map((z) => {
      const zone = parseZone(z);
      return { zone: z, time: baseDt.setZone(zone).toFormat("yyyy-LL-dd HH:mm:ss ZZZZ") };
    });
  }

  static businessOverlap(zones, startHour = 9, endHour = 17) {
    const res = {};
    zones.forEach((z) => {
      const zone = parseZone(z);
      const now = DateTime.now().setZone(zone);
      const ok = now.hour >= startHour && now.hour < endHour;
      res[z] = { local: now.toFormat("yyyy-LL-dd HH:mm:ss ZZZZ"), inBusiness: ok };
    });
    return res;
  }

  static callPlanner(zoneA, zoneB, aWindow = [8, 22], bWindow = [8, 22], stepMinutes = 30) {
    const a = parseZone(zoneA);
    const b = parseZone(zoneB);
    let t = DateTime.now().setZone(a).startOf("day").plus({ hours: aWindow[0] });
    const end = t.plus({ hours: 24 });
    const slots = [];
    while (t < end) {
      const inA = t.hour >= aWindow[0] && t.hour < aWindow[1];
      const tb = t.setZone(b);
      const inB = tb.hour >= bWindow[0] && tb.hour < bWindow[1];
      if (inA && inB) {
        slots.push(`${t.toFormat("yyyy-LL-dd HH:mm")} ${zoneA}  ⇄  ${tb.toFormat("yyyy-LL-dd HH:mm")} ${zoneB}`);
      }
      t = t.plus({ minutes: stepMinutes });
    }
    return slots.length ? slots : ["No overlapping slots found with given windows."];
  }

  static travelAdjust(fromZone, toZone, departISO, hoursPerDay = 1.5) {
    const f = parseZone(fromZone);
    const t = parseZone(toZone);
    const depart = DateTime.fromISO(departISO, { zone: f });
    const fromOff = depart.offset; // minutes
    const toOff = depart.setZone(t).offset;
    const diffHours = (toOff - fromOff) / 60.0;
    const shortest = ((((diffHours + 12) % 24) + 24) % 24) - 12; // [-12,12)
    const days = hoursPerDay > 0 ? Math.ceil(Math.abs(shortest) / hoursPerDay) : 0;
    const plan = [`Zone difference at departure: ${shortest.toFixed(1)}h (shortest). Estimated days: ${days}.`];
    let cur = 0;
    for (let d = 1; d <= days; d++) {
      const remaining = Math.abs(shortest) - Math.abs(cur);
      const step = Math.min(hoursPerDay, remaining) * Math.sign(shortest);
      cur += step;
      plan.push(`Day ${d}: shift ${step > 0 ? "+" : ""}${step.toFixed(1)}h (cum ${cur > 0 ? "+" : ""}${cur.toFixed(1)}h).`);
    }
    if (!days) plan.push("No adjustment needed.");
    return plan;
  }

  // ----- Advanced -----

  static solarTime(dtISO, longitudeDeg, zone) {
    const z = parseZone(zone);
    let local = DateTime.fromISO(dtISO, { zone: z });
    if (!local.isValid) throw new Error("Invalid datetime");
    const offHours = local.offset / 60.0;
    const tzMeridian = offHours * 15.0;
    const n = parseInt(local.toFormat("o"), 10); // day of year
    const B = (2 * Math.PI * (n - 81)) / 364.0;
    const eotMin = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    const correctionHours = (longitudeDeg - tzMeridian) / 15.0 + eotMin / 60.0;
    const solar = local.plus({ minutes: correctionHours * 60 });
    return {
      clock: local.toFormat("yyyy-LL-dd HH:mm:ss ZZZZ"),
      solar: solar.toFormat("yyyy-LL-dd HH:mm:ss") + " (approx solar)",
    };
  }

  static julianDay(dtISO) {
    const dt = DateTime.fromISO(dtISO, { zone: "UTC" });
    if (!dt.isValid) throw new Error("Invalid datetime");
    const Y = dt.year;
    let y = Y;
    let m = dt.month;
    let d = dt.day + (dt.hour + (dt.minute + dt.second / 60) / 60) / 24;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 5);
    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    return jd;
  }

  static greenwichSiderealHours(dtISO) {
    const jd = this.julianDay(dtISO);
    const T = (jd - 2451545.0) / 36525.0;
    const gmst =
      67310.54841 +
      (876600.0 * 3600 + 8640184.812866) * T +
      0.093104 * T * T -
      6.2e-6 * T * T * T;
    const hours = ((gmst / 3600) % 24 + 24) % 24;
    return hours;
  }

  static localSiderealHours(dtISO, longitudeDeg) {
    const gst = this.greenwichSiderealHours(dtISO);
    return ((gst + longitudeDeg / 15) % 24 + 24) % 24;
  }
}

// Example (uncomment to try):
// console.log(TimezoneConverter.convert("2025-08-16T15:00", "UTC", "Asia/Tokyo"));
// console.log(TimezoneConverter.nowIn(["UTC", "Asia/Kolkata", "America/New_York"]));
// console.log(TimezoneConverter.dstTransitions("Europe/London", 2025));
