
# Codebase Refactoring Plan — Ticking World Clock

## Summary
After reviewing all source files, I identified 7 refactoring areas ranked by significance. All changes preserve existing UI and functionality. Each step is incremental and testable independently.

---

## Priority 1 — HIGH IMPACT

### 1. `src/lib/cityImages.ts` — Dead Code Removal
**Issue:** This 190-line module with curated Unsplash URLs and `getCityImages()` is **completely unused**. The app fetches images via the `city-image` edge function instead.
**Action:** Delete the entire file.
**Risk:** None — no imports reference it.
**Test:** Verify build succeeds; image loading works as before.

### 2. `src/lib/timezones.ts` — Performance: Memoize Formatters
**Issue:** `getTimeForTimezone()` creates **two new `Intl.DateTimeFormat` instances every second per city** (called on every tick). These are expensive to construct.
**Action:** Cache formatters in a `Map<string, Intl.DateTimeFormat>` keyed by `${timezone}-${use24h}`. Reuse on subsequent calls.
**Effect:** Eliminates ~10+ formatter constructions per second → smoother performance, especially on lower-end devices.
**Risk:** Very low — pure optimization, same output.
**Test:** Verify times still update correctly every second in both 12h/24h modes.

### 3. `src/components/HeroClock.tsx` — Extract Repeated Digit Column
**Issue:** The hours/minutes/seconds columns are identical JSX blocks repeated 3× (lines 67–96), differing only in label text and value. This violates DRY and makes changes error-prone.
**Action:** Extract a `ClockDigit` subcomponent: `({ label, value })`.
**Effect:** Reduces component from 106 → ~70 lines; one place to change digit styling.
**Risk:** Low — purely presentational extraction.
**Test:** Visual regression check — clock looks identical.

---

## Priority 2 — MEDIUM IMPACT

### 4. `src/hooks/useWorldClock.ts` — Bug Fix + Simplification of `removeCity`
**Issue:** `removeCity` uses stale `cities` from the closure inside `setPrimaryIndex`, which can cause race conditions. Also, `primaryIndex` management is fragile — if cities array shrinks, `primaryIndex` can point out of bounds (partially guarded on line 109 but not robustly).
**Action:** 
- Switch to storing `primaryId: string | null` instead of `primaryIndex: number`. This eliminates all index-boundary bugs.
- Simplify `removeCity` and `setPrimary` to work with IDs directly.
**Effect:** Eliminates potential bugs; simpler mental model.
**Risk:** Low — behavior stays the same, but internal representation changes.
**Test:** Add/remove cities, switch primary, verify correct city stays primary after removals.

### 5. `src/hooks/useCityImage.ts` — Add Error State + TTL for Cache
**Issue:** 
- No error state exposed — consumers can't distinguish "loading" from "failed permanently."
- Global `imageCache` has no TTL — if an API returns a bad result once, it's cached forever until page reload.
- `loading` state isn't reset on city change when cache misses, causing brief flicker.
**Action:**
- Add `error` to returned state.
- Add a simple 30-minute TTL to cached entries.
- Reset loading cleanly on city change.
**Risk:** Low — additive changes.
**Test:** Change cities rapidly; verify no stale/broken states.

### 6. `src/components/NavLink.tsx` — Dead Code Removal
**Issue:** This component is **never imported** anywhere in the app.
**Action:** Delete the file.
**Risk:** None.
**Test:** Build succeeds.

---

## Priority 3 — HOUSEKEEPING

### 7. `src/index.css` — Consolidate Custom Font Classes into Tailwind Config
**Issue:** `.font-clock`, `.font-display`, `.font-body` are defined as raw CSS classes (lines 98–108) outside the Tailwind system. They should be registered as `fontFamily` entries in `tailwind.config.ts` so they're available as proper Tailwind utilities (`font-clock`, `font-display`, `font-body`) with IntelliSense support.
**Action:** Move font-family definitions into `tailwind.config.ts` under `theme.extend.fontFamily` and remove the manual CSS classes.
**Effect:** Better developer experience, consistent with design system.
**Risk:** Very low — same output classes.
**Test:** All text renders with correct fonts.

---

## Execution Order
1. Delete dead files (#1, #6) — zero risk
2. Extract `ClockDigit` (#3) — isolated component change
3. Memoize formatters (#2) — pure optimization
4. Refactor primary city to ID-based (#4) — logic improvement
5. Improve image hook (#5) — additive enhancement
6. Move fonts to Tailwind config (#7) — housekeeping

Each step gets a build verification + visual check before proceeding to the next.

## Out of Scope
- No UI or visual changes
- No new features
- No dependency changes
- No edge function modifications
