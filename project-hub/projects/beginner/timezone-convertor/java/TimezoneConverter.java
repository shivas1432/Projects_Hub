// Comprehensive Time Zone Converter — Java (java.time)
//
// Compile: javac TimezoneConverter.java
// Run examples:
//   java TimezoneConverter now UTC Asia/Kolkata America/New_York
//   java TimezoneConverter convert 2025-08-16T15:00 UTC Asia/Tokyo
//   java TimezoneConverter offset Europe/London
//   java TimezoneConverter meeting 2025-08-16T10:00 Europe/London America/New_York Asia/Tokyo
//
// Note: Java handles DST automatically via ZoneId rules.
// Transition scanning is done by detecting offset changes at step intervals.

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class TimezoneConverter {

    static DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z");

    static ZoneId parseZone(String z) {
        // Minimal support for UTC±HH[:MM]
        if (z.toUpperCase().startsWith("UTC")) {
            String rest = z.substring(3).trim();
            if (rest.isEmpty() || rest.equals("Z")) return ZoneId.of("UTC");
            return ZoneId.of("UTC" + rest);
        }
        // Common abbreviations (best-effort)
        Map<String,String> abbr = new HashMap<>();
        abbr.put("EST","America/New_York"); abbr.put("EDT","America/New_York");
        abbr.put("CST","America/Chicago");  abbr.put("CDT","America/Chicago");
        abbr.put("MST","America/Denver");   abbr.put("MDT","America/Denver");
        abbr.put("PST","America/Los_Angeles"); abbr.put("PDT","America/Los_Angeles");
        abbr.put("GMT","UTC"); abbr.put("BST","Europe/London");
        abbr.put("CET","Europe/Paris"); abbr.put("CEST","Europe/Paris");
        abbr.put("EET","Europe/Athens"); abbr.put("EEST","Europe/Athens");
        abbr.put("IST","Asia/Kolkata"); abbr.put("JST","Asia/Tokyo");
        if (abbr.containsKey(z.toUpperCase())) return ZoneId.of(abbr.get(z.toUpperCase()));
        return ZoneId.of(z);
    }

    // Core conversion
    static String convert(String iso, String fromZone, String toZone) {
        ZoneId f = parseZone(fromZone);
        ZoneId t = parseZone(toZone);
        LocalDateTime ldt = LocalDateTime.parse(iso);
        ZonedDateTime zdt = ldt.atZone(f).withZoneSameInstant(t);
        return zdt.format(FMT);
    }

    static Map<String,String> nowIn(List<String> zones) {
        Map<String,String> out = new LinkedHashMap<>();
        for (String z: zones) {
            ZoneId zi = parseZone(z);
            out.put(z, ZonedDateTime.now(zi).format(FMT));
        }
        return out;
    }

    static String offset(String zone) {
        ZoneId zi = parseZone(zone);
        return ZonedDateTime.now(zi).format(DateTimeFormatter.ofPattern("z Z"));
    }

    // DST transitions (coarse)
    static List<String> dstTransitions(String zone, int year, int stepMinutes) {
        ZoneId zi = parseZone(zone);
        ZonedDateTime t = ZonedDateTime.of(LocalDateTime.of(year,1,1,0,0), ZoneId.of("UTC"));
        ZonedDateTime end = t.plusYears(1);
        ArrayList<String> res = new ArrayList<>();
        ZoneOffset last = null;
        while (t.isBefore(end)) {
            ZonedDateTime local = t.withZoneSameInstant(zi);
            ZoneOffset off = local.getOffset();
            if (last == null) last = off;
            else if (!off.equals(last)) {
                res.add(String.format("%s: transition near %s (%s) [UTC %s]",
                        zone,
                        local.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                        local.format(DateTimeFormatter.ofPattern("z Z")),
                        t.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))));
                last = off;
            }
            t = t.plusMinutes(stepMinutes);
        }
        if (res.isEmpty()) res.add(zone + ": no offset changes detected in " + year + ".");
        return res;
    }

    // Meeting coordinator
    static Map<String,String> meeting(String baseZone, String isoLocal, List<String> participants) {
        ZoneId base = parseZone(baseZone);
        ZonedDateTime baseZdt = LocalDateTime.parse(isoLocal).atZone(base);
        Map<String,String> out = new LinkedHashMap<>();
        for (String p: participants) {
            ZoneId zi = parseZone(p);
            out.put(p, baseZdt.withZoneSameInstant(zi).format(FMT));
        }
        return out;
    }

    // Business overlap (now)
    static Map<String,String> overlap(List<String> zones, int startHour, int endHour) {
        Map<String,String> out = new LinkedHashMap<>();
        for (String z: zones) {
            ZoneId zi = parseZone(z);
            ZonedDateTime local = ZonedDateTime.now(zi);
            boolean ok = local.getHour() >= startHour && local.getHour() < endHour;
            out.put(z, local.format(FMT) + "  within [" + startHour + ":00–" + endHour + ":00)? " + (ok ? "YES" : "no"));
        }
        return out;
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage:");
            System.out.println("  now ZONE... | convert ISO FROM TO | offset ZONE | meeting ISO BASE P1 P2 ... | dst ZONE YEAR");
            return;
        }
        switch (args[0]) {
            case "now": {
                List<String> zs = Arrays.asList(Arrays.copyOfRange(args, 1, args.length));
                System.out.println(nowIn(zs));
                break;
            }
            case "convert": {
                if (args.length < 4) { System.out.println("convert ISO FROM TO"); break; }
                System.out.println(convert(args[1], args[2], args[3]));
                break;
            }
            case "offset": {
                if (args.length < 2) { System.out.println("offset ZONE"); break; }
                System.out.println(offset(args[1]));
                break;
            }
            case "meeting": {
                if (args.length < 4) { System.out.println("meeting ISO BASE Z1 Z2 ..."); break; }
                String iso = args[1]; String base = args[2];
                List<String> parts = Arrays.asList(Arrays.copyOfRange(args, 3, args.length));
                System.out.println(meeting(base, iso, parts));
                break;
            }
            case "dst": {
                if (args.length < 3) { System.out.println("dst ZONE YEAR"); break; }
                System.out.println(dstTransitions(args[1], Integer.parseInt(args[2]), 30));
                break;
            }
            case "overlap": {
                if (args.length < 2) { System.out.println("overlap ZONE..."); break; }
                List<String> zs = Arrays.asList(Arrays.copyOfRange(args, 1, args.length));
                System.out.println(overlap(zs, 9, 17));
                break;
            }
            default:
                System.out.println("Unknown command.");
        }
    }
}
