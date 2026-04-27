# JeevanAid Requirements (Website / PWA)

## 0) Platform Decision

- Recommended: **PWA** (because offline emergency use is core to JeevanAid).
- A normal **website** can be used for demo purposes, but it will not meet full offline emergency goals.

### If built as Website only
- Responsive pages, online APIs, and browser-based navigation.
- No install prompt required.
- Limited offline behavior (best-effort browser cache only).

### If built as PWA (recommended)
- Installable on mobile/desktop from browser.
- Offline-first emergency core via service worker + cache.
- App-like standalone launch and persistent local data.

## 1) Product Scope (Hackathon MVP)

### Must-have features
- Offline emergency first-aid guide for core emergency types.
- Language selection and multilingual content support (minimum: Hindi + 1 regional language for MVP).
- One-tap `108` emergency call visible on all screens.
- Basic AI symptom diagnosis card flow (online mode).
- Live ambulance tracker UI mock (online mode; real API optional for MVP).

### Should-have (if time permits)
- Offline clinic finder (cached data).
- Basic offline symptom triage decision tree.
- Family health records local save + export.

## 2) Functional Requirements

### Offline mode
- App must open and show emergency guide without internet.
- Emergency steps must include:
  - step-by-step actions,
  - `DO` list,
  - `DO NOT` list,
  - optional audio guidance.
- Offline status indicator should be visible.

### Online mode
- Internet detection toggles online features.
- AI diagnosis accepts text (voice optional) and returns:
  - probable condition,
  - urgency (`Red/Amber/Green`),
  - immediate next action.
- Ambulance tracker page shows map placeholder, ETA, and status cards.

### Navigation and UX
- Reach emergency type in <= 2 taps from home.
- Large touch targets (>= 64px) for critical actions.
- High-contrast design and panic-safe visual hierarchy.
- Sticky emergency CTA (`Call 108`) on all key screens.

## 3) Non-Functional Requirements

- Performance:
  - first online load target: < 5s on 3G,
  - repeat/offline loads target: < 2s.
- Accessibility:
  - clear typography,
  - icon-first interactions,
  - high contrast,
  - readable in bright daylight.
- Reliability:
  - offline core should work with no network,
  - graceful fallback for failed online APIs.
- Security:
  - HTTPS only,
  - no sensitive ID storage,
  - show medical disclaimer on AI outputs.

## 4) Technical Requirements

### Frontend
- HTML, CSS, JavaScript.
- PWA support:
  - `manifest.json`,
  - service worker,
  - installable standalone experience.

### Offline stack
- Service Worker + Cache API for assets/content.
- IndexedDB (or localStorage for MVP) for language and user state.

### Online integrations (MVP may use mocks)
- LLM/API endpoint for symptom diagnosis.
- Map layer for ambulance UI (Leaflet/OpenStreetMap).
- Optional telemedicine and medicine-identifier APIs.

## 5) Content Requirements

- Emergency content for at least the currently defined set in `src/js/emergencies.js`.
- Bilingual strings for every emergency field:
  - `title`, `steps`, `dos`, `donts`.
- Medical disclaimers visible on diagnosis and guidance views.
- Harm-prevention warnings (`DO NOT`) must be prominent.

## 6) Project/Code Requirements (Current Repo Gaps)

The current repository has design and data foundations but needs these files/components for a complete MVP:

- `src/index.html` (main app shell).
- `src/js/app.js` (routing, rendering, language state, event handling).
- `src/sw.js` (service worker caching strategy).
- `src/icons/` assets referenced by `src/manifest.json`.
- Optional: `src/data/clinics.json` for offline clinic finder.

## 7) Suggested Folder Structure

```text
src/
  index.html
  manifest.json
  sw.js
  css/
    style.css
  js/
    app.js
    emergencies.js
  data/
    clinics.json
  icons/
    icon-192.png
    icon-512.png
```

## 8) Acceptance Criteria (MVP Done)

- PWA installs from browser and launches standalone.
- App works offline after first load.
- User can open emergency card and view steps + DO/DON'T guidance.
- User can switch between available languages.
- `Call 108` action is visible and functional.
- Online mode reveals diagnosis and tracker screens.
- No blocking console errors on core user flow.
