# HACKTRONIX 2.0 — Implementation Complete

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Prizes.jsx
│   ├── WhyJoinUs.jsx
│   ├── Timeline.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── RegistrationModal.jsx
├── admin/
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── StatCards.jsx
│   ├── ParticipantsTable.jsx
│   └── DetailDrawer.jsx
├── hooks/
│   ├── useAuth.js
│   └── useRegistrations.js
├── lib/
│   ├── firebase.js
│   └── emailjs.js
├── pages/
│   └── Home.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Configuration Required

### Firebase (src/lib/firebase.js)
Replace placeholder values with your Firebase project config:
- apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId

### EmailJS (src/lib/emailjs.js)
Replace placeholder values:
- YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID

### Admin Credentials (src/hooks/useAuth.js)
Default: `admin@hacktronex.com` / `hacktronex2026`

## Run Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
```

## Routes

- `/` — Public Home page
- `/admin/login` — Admin login
- `/admin` — Admin dashboard (protected)
