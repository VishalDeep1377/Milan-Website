# SRM DSA Recruitment Submission Notes — MILAN 2026

**Track:** Frontend Development Track  
**Candidate Submission Checklist & Operational Verification:**

### 1. Requirements Compliance
- [x] **Homepage:** Complete with navigation, hero section, festival introduction, experience showcase, statistics, and closing CTA.
- [x] **Events Discovery:** 8 events across 7 categories (Music, Dance, Fine Arts, Photography, Literary, Theatre, Gaming).
- [x] **Keyword Search:** Real-time search across event title, category, description, venue, and tags.
- [x] **Category Filters:** Working category tabs with visual active state and one-click clear button.
- [x] **Event Details:** Accessible modal with schedule, venue, prizes, team limits, and direct registration button.
- [x] **Registration Form:** Validates full name, email, 10-digit Indian mobile number (`^[6-9]\d{9}$`), institution, and event.
- [x] **User Feedback:** Inline field errors, duplicate registration prevention, loading indicators, and official pass generation.
- [x] **Pass Code Generation:** Produces official pass reference code (e.g., `MILAN26-MUS-7842`) with clipboard copy functionality.
- [x] **Responsive Design:** Verified from 320px mobile to 1920px desktop viewports.
- [x] **Code Quality:** Modular component tree under `src/components/`, strictly typed with TypeScript.
- [x] **Automated Tests:** 14 automated unit and integration tests passing (`npm test`).
- [x] **Build Verification:** Production build verified with `npm run build` (0 errors).

### 2. Evaluator Quick Start Commands
```bash
npm install
npm test
npm run check
npm run build
npm run preview
```

### 3. Submission Links
- **GitHub Repository:** `<YOUR_GITHUB_REPO_URL>`
- **Live Vercel URL:** `<YOUR_VERCEL_APP_URL>`
