# ⚡ CodeChef Campus Chapter — College Event Management Portal

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.1-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?logo=vercel&logoColor=white&style=for-the-badge)](https://codechef-college-event-manager.vercel.app)
[![Style](https://img.shields.io/badge/Design-Neo--Brutalist-FFE600?style=for-the-badge)](https://en.wikipedia.org/wiki/Neubrutalism)
[![Status](https://img.shields.io/badge/Build-Passing-00F59B?style=for-the-badge)]()

> 🌐 **Live Website**: [https://codechef-college-event-manager.vercel.app](https://codechef-college-event-manager.vercel.app)  
> 🚀 **Time to Serve Your Dish!**  
> An authentic, high-energy, responsive web application engineered for the **CodeChef Campus Chapter**. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, styled in a **Neo-Brutalist / Memphis** aesthetic with solid bright colors, hard black drop shadows, interactive patterns, a movable sticker playground, multiple distinct landing pages, and a full-featured admin management suite.

---

## 🔑 Quick Access Credentials

| Role | Username / ID | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin Portal** | `codechef_admin` (or `admin`) | `admin@2026` (or `codechef2026`) | Full Event CRUD, Attendee Roster, 1-Click CSV Export, Check-in status, Real-time Analytics deep dives |
| **Student Portal** | Any email (e.g. `aditya@college.edu`) | Any password / Auto-fill | 1-Click Event Registration, Digital Pass with QR Code, Track & Manage Reserved Seats |

---

## 👨‍🍳 What We Cooked (The Main Course)

Unlike typical cookie-cutter AI templates with soft purple gradients and generic stock imagery, this application is crafted from the ground up as a **real, living college tech club portal**. It features bold graphic geometry, hard drop shadows, dot-matrix patterns, hazard stripes, real student data structures (Roll numbers, branches, On-Duty OD letters, CodeChef handles), and playful interactivity.

---

## ✨ Features Overview

### 1. 🎓 Student & Attendee Side

- 🏠 **Home Landing Page**:
  - **Campus Impact Counters**: Real-time stats (1,200+ Active Coders, 48+ Contests, 15,000+ Submissions, 180+ Placement Impacts).
  - **Flagship Spotlight Event**: Retro flip countdown timer ticking down to the next big clash, real-time seat counter, and 1-click registration.
  - **Infinite Marquee Strip**: Moving ticker with campus announcements and contest updates.
  - **Upcoming Events Preview**: Calendar grid of latest events with category pills and venue markers.
  - **Four Core Wings Showcase**: Highlighting Competitive Programming, Full-Stack Web, AI/ML, and Open Source.
  - **Interactive Campus FAQ Accordion**: Instant answers to common student doubts (OD verification, eligibility, fees, and rules).

- 📅 **Events & Timeline Catalog (`events`)**:
  - **Dual View Modes**: Switch seamlessly between **Card Grid View** and **Timeline Roadmap View**.
  - **Live Search & Category Filtering**: Search by name, venue, or keywords; filter by category (`Competitive Programming`, `Web Development`, `Hackathon`, `AI & Machine Learning`, `Open Source & Systems`).
  - **Event Details Modal**: Comprehensive breakdown including session-by-session agendas, rules, eligibility, and lead coordinator contact numbers.

- 📝 **Event Registration Flow**:
  - Standard college registration form collecting:
    - **Student Full Name**
    - **University Roll Number / Reg No** (e.g., `22BCSE104`)
    - **Official College Email**
    - **Department & Year of Study** (e.g., `B.Tech CSE • 3rd Year`)
    - **WhatsApp Contact Number**
    - **CodeChef Handle (Optional)**
  - Real-time client-side validation, seat-limit enforcement, and celebratory confetti animations upon submission.

- 🎫 **Digital Delegate Badge & Pass**:
  - Automatically generates an event pass complete with unique ticket code (`CC-CP-XXXX`), attendee info, date, and venue.
  - **Scannable QR Code** (powered by `qrcode.react`) for rapid verification at the venue entry desk.
  - **Print / Save Pass** option with centered print styles for saving tickets offline or printing.

- 🗂️ **Student Passes Tracker & Management (`StudentPassesModal`)**:
  - Signed-in students can view all their active registrations in one place.
  - Live status tracking (`Confirmed`, `Checked In / OD Verified ✅`, `Waitlisted`).
  - 1-click **View / Scan QR Badge** access.
  - Ability to **Cancel Booking**, automatically freeing up the seat for other students.
  - Event cards and event details dynamically reflect when a student has already joined an event.

- 🔐 **Dual Authentication System (Student & Admin)**:
  - **Student Sign In**: Save student profile (Name, University Roll No, Email, Department & Year, WhatsApp, CodeChef handle) to **auto-fill event registrations** and view delegate passes. Includes 1-click **⚡ Auto-Fill Demo** button.
  - **Admin Security Gate**: Protected by a unique Chapter Coordinator ID and Password. If accessed unauthenticated, a security gate locks the control suite until verified.
    - **Official Admin ID**: `codechef_admin` (or `admin@codechef.org`)
    - **Admin Password**: `admin@2026` (or `admin123`)
    - Includes 1-click **⚡ Auto-Fill Demo Credentials** button for seamless review.

- 🏆 **Past Hackathons & Hall of Fame (`hackathons`)**:
  - Archive of past chapter editions (**DevHacks '25**, **CodeClash 2.0**, **InnoSprint Winter '24**).
  - Showcase of winning teams, projects, cash prizes, and participant stats.

- 🗺️ **Wings & Interactive Roadmaps (`wings`)**:
  - Curated milestone roadmaps for the 4 core wings.
  - **Clickable milestone checklists** that save progress and trigger confetti upon completing milestones.

- 👥 **Chapter Working Divisions & Recruitment (`team`)**:
  - Highlights the 5 functional campus divisions using expressive **emoji avatars** (`👑 Leadership`, `🎯 Competitive Programming`, `💻 Technical & Systems`, `📢 Events & Operations`, `🎨 Design & Media`) instead of placeholder photos.
  - Detailed scopes of work and active volunteer opening counters.
  - **Interactive Volunteer Application Form**: Form for aspiring juniors to apply for chapter volunteer and lead positions.

- 🧲 **Movable Sticker Board Playground**:
  - Interactive retro canvas with draggable badges (`5★ CODER`, `HACKER`, `OD APPROVED`, `PIZZA & CODE`, etc.).
  - Ability to drag stickers anywhere on screen, create custom stickers, and reset positions.

- 🧭 **Improved Directory Footer**:
  - Every button and link is categorized with explicit uppercase headings, context tags, and direct utility actions (`View Digital Ticket Badge`, `Student Sign In / Register`, `Admin Sign In Portal`).

---

### 2. 🛡️ Admin & Chapter Coordinator Dashboard (`admin`)

- 🔒 **Protected by Unique ID & Password**:
  - Secured with unique Chapter Admin credentials (`codechef_admin` / `admin@2026`).
  - Active admin session badge with instant logout capability.

- 📊 **Executive Overview Metrics**:
  - Total events active, confirmed registrations, upcoming dates, and overall campus hall capacity utilization.

- 🛠️ **Full Event CRUD Operations**:
  - **Create New Event**: Modal with validation for title, category, date/time, venue, seat limits, entry fees, cover banners, and tags.
  - **Edit Event**: Instant update of any event details across the application.
  - **Delete Event**: Safe removal with confirmation protection.
  - **Homepage Spotlight Pinning**: 1-click toggle to feature any event on the homepage hero countdown.

- 👥 **Attendance & Registrations Management**:
  - Full attendee roster with search across names, roll numbers, emails, phone numbers, and ticket codes.
  - Filter by registered event or attendance status.
  - **Entrance Desk Check-in**: 1-click button to mark students as `Checked In` for live attendance and On-Duty (OD) verification.
  - **1-Click CSV Export**: Download the complete attendee sheet as `CodeChef_Campus_Registrations.csv` for university records.
  - **Demo Data Reset**: Restore default sample data anytime.

---

## 🎨 Design System: Neo-Brutalist & Memphis

| Element | Specification |
|---|---|
| **Palette** | Vibrant Solids: `#FFE600` (Yellow), `#00F59B` (Mint), `#00D2FF` (Cyan), `#FF5A5F` (Coral), `#B388FF` (Purple), `#FF9F1C` (Orange) |
| **Borders** | Solid black borders (`border-2`, `border-[3px]`, `border-4 border-black`) |
| **Shadows** | Geometric hard offset shadows (`shadow-[4px_4px_0px_0px_#000]`, `shadow-[6px_6px_0px_0px_#000]`) |
| **Textures** | Radial dot-matrix backgrounds, hazard caution stripes, and moving ticker ribbons |
| **Typography** | High-contrast `Space Grotesk` with heavy weights (`font-black`) and bold uppercase tags |

---

## 📂 Project Architecture

```
CODECHEF_Entrance/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # SVGs and images
│   ├── components/
│   │   ├── admin/              # Coordinator Dashboard Suite
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminEventsList.jsx
│   │   │   ├── AdminRegistrations.jsx
│   │   │   └── EventFormModal.jsx
│   │   ├── common/             # Global Reusable Components
│   │   │   ├── AuthModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MarqueeStrip.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── MovableStickerBoard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ToastContainer.jsx
│   │   └── student/            # Student Portal Components
│   │       ├── ClubDomains.jsx
│   │       ├── EventCard.jsx
│   │       ├── EventDetailsModal.jsx
│   │       ├── FaqSection.jsx
│   │       ├── FeaturedEvent.jsx
│   │       ├── HeroSection.jsx
│   │       ├── RegistrationModal.jsx
│   │       ├── StudentPassesModal.jsx
│   │       └── TicketPassModal.jsx
│   ├── context/
│   │   └── ClubContext.jsx     # Central State & localStorage persistence
│   ├── data/
│   │   └── initialData.js      # Seed events, registrations, leadership, & FAQs
│   ├── pages/                  # Multi-page Views
│   │   ├── EventsPage.jsx
│   │   ├── HackathonsPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── TeamJoinPage.jsx
│   │   └── WingsRoadmapsPage.jsx
│   ├── utils/
│   │   └── csvExport.js        # CSV report generator
│   ├── App.jsx                 # App root & navigation router
│   ├── index.css               # Tailwind v4 & Neo-Brutalist CSS rules
│   └── main.jsx                # Vite entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚡ Quickstart & Setup Instructions

### Prerequisites
- **Node.js** (v18.0 or newer recommended)
- **npm** (v9.0 or newer)

### 1. Clone the repository
```bash
git clone https://github.com/Arpit-Agnihotri-15/codechef-college-event-manager.git
cd codechef-college-event-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 4. Build for production
```bash
npm run build
```
Production assets are generated in the `dist/` directory, ready to be deployed to Vercel, Netlify, or GitHub Pages.

### 5. Deployment with Vercel
The project is configured with `vercel.json` for seamless deployment with SPA rewrites:
```bash
npx vercel --prod
```
- Live Production URL: [https://codechef-college-event-manager.vercel.app](https://codechef-college-event-manager.vercel.app)
- Continuous deployment is enabled: every push to the `main` branch on GitHub triggers an automatic production build and deployment on Vercel.

---

## 📦 Dependencies

- **`react` & `react-dom`** (v19.x) - Component rendering and state
- **`tailwindcss`** (v4.x) & **`@tailwindcss/vite`** - Modern atomic utility styling
- **`lucide-react`** - Clean, sharp iconography
- **`canvas-confetti`** - Micro-interaction celebration particles
- **`qrcode.react`** - Client-side scannable QR ticket generation

---

## 👨‍💻 Author

Crafted with ❤️ and ☕ by **[Arpit Agnihotri](https://github.com/Arpit-Agnihotri-15)**  
Department of Computer Science & Engineering  
GitHub: [@Arpit-Agnihotri-15](https://github.com/Arpit-Agnihotri-15)
