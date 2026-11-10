# MILAN 2026 — Official Cultural Festival Website

> Developed for the **Directorate of Student Affairs (DSA), SRM Institute of Science and Technology, Kattankulathur**.  
> Recruitment Assignment — **Frontend Development Track**.

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-14%20Passing-brightgreen)](https://nodejs.org/api/test.html)

A high-performance, responsive cultural festival web application showcasing Milan 2026. Designed with an editorial brutalist visual aesthetic, modular component architecture, accessible dialogs, real-time form validation, ticket pass generation, and duplicate prevention.

---

## 🌟 Key Features

### 1. Festival Discovery & Editorial Theme
- **Brutalist Cultural Design System:** Dark background (`#0a0a0e`), neon lime accents (`#d6ff63`), glowing radial orbs, geometric overlays, and animated marquee banner.
- **Official Typography:** `Space Grotesk` (display headings), `Manrope` (body copy), and `DM Mono` (festival timestamps and venue metadata).
- **Smooth Navigation:** Interactive links for `Home`, `About`, `Events`, `Experience`, and `Register` with animated DOM scrolling.

### 2. Event Discovery Engine
- **Dedicated Dataset:** 8 curated cultural festival events categorized under `Music`, `Dance`, `Fine Arts`, `Photography`, `Literary`, `Theatre`, and `Gaming`.
- **Live Search & Filter:** Instant multi-property keyword search (title, category, description, venue, tags) paired with category tab filters.
- **Empty State Recovery:** Dedicated zero-results view with a one-click "CLEAR ALL FILTERS" reset.
- **Accessible Detail Modals:** Keyboard-navigable dialogs (`role="dialog"`, `aria-modal="true"`, `Escape` key close, and background scroll locking).

### 3. Production-Ready Registration Experience
- **Real-Time Validation:** Validates full name, email address, 10-digit Indian mobile numbers (`^[6-9]\d{9}$`), institution, and event choice with immediate field-level error clearing.
- **Duplicate Prevention:** Detects and blocks duplicate registrations for the same event by identical email or mobile number.
- **Official Ticket Pass Generation:** Automatically issues a unique delegate reference code (e.g., `MILAN26-MUS-7842`) with one-click clipboard copying.
- **Pluggable Architecture:** Implements a service adapter layer that supports immediate LocalStorage persistence with simulated network delay, while seamlessly integrating with an external REST API when `VITE_API_URL` is configured.

---

## 🏗️ Architecture & Component Hierarchy

```text
src/
├── components/
│   ├── AnnouncementBar.tsx      # Festival notification marquee banner
│   ├── Navbar.tsx               # Responsive header, brand mark, mobile drawer
│   ├── Hero.tsx                 # Headline, interactive orbs, event jump CTA
│   ├── MarqueeTicker.tsx        # Infinite typographic marquee
│   ├── AboutSection.tsx         # Festival vision, SRMIST infinity seal
│   ├── EventsSection.tsx        # Search bar, category filters, empty state
│   ├── EventCard.tsx            # Animated card, category glyph, hover elevation
│   ├── EventDetailsModal.tsx    # Accessible modal with Escape key & focus management
│   ├── RegistrationModal.tsx    # Form validation, duplicate check, pass generator
│   ├── ExperienceSection.tsx    # Festival culture showcase
│   ├── StatsSection.tsx         # Metric counters & editorial quote
│   ├── ClosingCta.tsx           # High-energy closing registration call
│   ├── Footer.tsx               # SRMIST links, copyright, back-to-top
│   └── Toast.tsx                # Auto-dismissing floating confirmation toast
├── services/
│   └── registrationService.ts   # Pluggable persistence, duplicate checks, ticket generator
├── utils/
│   └── validation.ts            # Schema and input validation utilities
├── types/
│   └── index.ts                 # Shared TypeScript interfaces
├── events.ts                    # Typed event dataset
├── styles.css                   # Responsive CSS variables and component styling
├── vite-env.d.ts                # Vite environment typings
└── App.tsx                      # Top-level orchestration container
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0+ (Node 20 or 22 LTS recommended)
- npm 9+

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/your-username/milan-fest-website.git
cd milan-fest-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing & Verification

The project includes both content verification and automated unit/integration test suites:

```bash
# Run unit & integration test suites (14 tests)
npm test

# Run content & architecture verification
npm run check

# Execute production build & type check
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Responsive Testing Matrix

The CSS design system has been tested across standard viewports:

| Viewport | Device Class | Layout Adaptation |
|---|---|---|
| **320px – 480px** | Mobile Phones (iPhone SE, Galaxy S) | Single-column card grid, collapsible navigation drawer, optimized touch targets. |
| **481px – 768px** | Large Phones & Mini Tablets | Responsive 1-to-2 column transition, stacked form rows. |
| **769px – 1024px** | Tablets & Small Laptops | 2-column card grid, full desktop navigation. |
| **1025px – 1920px** | Desktops & Ultra-wide Displays | 4-column card grid, centered 1220px container, proportional background orbs. |

---

## 🌐 Deployment Guide (Vercel)

This application is ready for continuous deployment on **Vercel**:

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete production-ready MILAN 2026 website"
   git remote add origin https://github.com/<your-username>/milan-fest-website.git
   git push -u origin main
   ```
2. Navigate to [Vercel Dashboard](https://vercel.com/new) and click **Add New > Project**.
3. Import your `milan-fest-website` repository.
4. Select **Vite** as the Framework Preset.
5. Build settings (automatically configured):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **Deploy**. Vercel will output a live HTTPS public URL.

*(Note: `vercel.json` is included with security headers and SPA route rewrite rules).*

---

## 📄 License & Attribution

Created as a technical recruitment submission for the **SRM Institute of Science and Technology Directorate of Student Affairs (DSA) Tech Team**.  
All branding, logos, and cultural fest marks belong to SRMIST.
