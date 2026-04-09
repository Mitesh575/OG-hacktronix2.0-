# HACKTRONIX 2.0 — Plan

## 1. Fix "HACKTRONEX" → "HACKTRONIX" spelling

All occurrences need to be corrected:

| File | Line |
|------|------|
| src/components/Hero.jsx | 156 |
| src/components/Navbar.jsx | 38 |
| src/components/About.jsx | 24, 27 |
| src/components/Footer.jsx | 68, 112 |
| src/components/Contact.jsx | 20 |
| src/components/WhyJoinUs.jsx | 95 |
| src/components/RegistrationModal.jsx | 298 |
| src/admin/AdminDashboard.jsx | 54 |
| src/admin/AdminLogin.jsx | 51, 82 |
| src/hooks/useAuth.js | 3, 4, 11, 21, 29 |
| src/pages/TrackExperiencePage.jsx | 64 |
| index.html | title tag |

Replace all `HACKTRONEX` → `HACKTRONIX` (case-sensitive where appropriate).

---

## 2. Timeline — progress bar driven by actual dates

Currently the timeline vertical line uses `useScroll` + `useTransform` (scroll % as progress). Replace with date-based progress:

- Define `EVENT_START` (e.g. Day 1 9:00 AM) and `EVENT_END` (Day 2 2:00 PM)
- On each frame, compute `now = new Date()`
- If `now < EVENT_START`: progress = 0
- If `now > EVENT_END`: progress = 1
- Else: `progress = (now - EVENT_START) / (EVENT_END - EVENT_START)`
- Apply to `scaleY` on the line

This way the line fills as real time passes during the event. Outside event window it shows fully empty (before) or fully filled (after).

---

## 3. Registration backend — patch up

**Firestore rules**: Ensure the `registrations` collection allows read for authenticated admin only and write for anyone.

**Missing fields in registration** (`RegistrationModal.jsx → onSubmit`):
- Add `submittedAt: serverTimestamp()` explicitly (already has `createdAt`)
- Consider adding `hackathonYear: "2.0"` for future-proofing

**EmailJS confirmation** (`src/lib/emailjs.js`):
- Currently placeholder. Wire up `sendRegistrationEmail(data)` using EmailJS to send a confirmation email to the registrant on successful Firestore write. Parameters needed: public key, service ID, template ID.

**Firestore indexes**: The `useRegistrations` hook queries `registrations` ordered by `createdAt desc`. Ensure this composite index exists in Firebase console.

**Admin read path** (`useRegistrations`): Firestore security rules must allow authenticated admin to read all registrations.

---

## 4. Update Implementation.md

Fix the title from `HACKTRONEX` to `HACKTRONIX`.
