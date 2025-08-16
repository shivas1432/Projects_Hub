# Time Zone Converter (DST-Aware)

Multi-language implementations providing:
- **Core**: time conversion; current time in multiple zones; abbreviation recognition; UTC offset display.
- **DST**: automatic handling; transition-date scanning; historical change summaries; recurring-meeting impact (via meeting coordinator).
- **Business**: meeting coordinator; business-hours overlap; international call planner; travel adjustment helper.
- **Advanced**: time zone history scans; custom fixed-offset zones (`UTC+05:30`); solar time approximation; astronomical (Julian Day, sidereal time).

## Python
`python/timezone_converter.py` (no deps; uses `zoneinfo`)

**Examples**
```bash
# Convert
python timezone_converter.py convert --from UTC --to Asia/Tokyo --dt 2025-08-16T15:00

# Current time in zones
python timezone_converter.py now UTC Europe/London Asia/Kolkata America/New_York

# Offset / abbreviation at a time
python timezone_converter.py offset Europe/London --dt 2025-03-31T01:00

# DST transitions and history
python timezone_converter.py dst Europe/London 2025
python timezone_converter.py dst-history America/New_York 2020 2025

# Meeting coordinator & overlap
python timezone_converter.py meeting --base Europe/London --dt 2025-08-16T10:00 --participants America/New_York Asia/Tokyo
python timezone_converter.py overlap Europe/London America/New_York Asia/Tokyo --start 9 --end 17

# Call planner (overlapping windows today)
python timezone_converter.py call --a Europe/London --b Asia/Tokyo --a-window 8-20 --b-window 9-21 --step-min 30

# Travel adjustment
python timezone_converter.py travel --from America/Los_Angeles --to Asia/Tokyo --depart 2025-08-16T10:00 --shift-rate 1.5

# Solar & sidereal
python timezone_converter.py solar --zone Asia/Kolkata --dt 2025-08-16T12:00 --lon 77.6
python timezone_converter.py sidereal --dt 2025-08-16T12:00Z --lon 77.6
