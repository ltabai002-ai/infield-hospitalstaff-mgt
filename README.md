# INFIELD Live Staff

Build a single-page, highly engaging, easy-to-understand, 100% mobile-responsive landing page for INFIELD for Hospitals — a real-time staff tracking app that helps hospitals find any doctor, nurse or staff member instantly.

3-SECOND RULE (most important): Within 3 seconds of landing, a visitor must understand: (1) this is an APP, (2) it is for HOSPITALS, (3) it shows where every doctor and nurse is and who is available. The hero headline, subheadline and phone mockup must make this obvious without scrolling or reading small text.

DESIGN REFERENCE

Match the attached reference image (healthcare template) as closely as possible for layout, spacing, card style, typography, photo usage and overall clean medical feel. Use the attached INFIELD logo instead of the reference logo. Replace all the reference's hospital-service content with the content below — we are selling SOFTWARE to hospitals, not medical services.

TECH

- React + Tailwind + Framer Motion + Lucide icons.

- Scroll-triggered animations in every section (fade/slide-up, staggered cards, count-up numbers, pulsing status dots, map pins dropping in).

- Use real, high-quality hospital photos from Unsplash (hospital building, corridors, doctors and nurses, reception, ICU, ambulance entrance), preferably showing Indian medical staff. Check that every image loads.

- All app screens (phone mockups, floor maps, dashboards, staff cards) are built in HTML/SVG with detailed, realistic UI inside. NO empty phone frames, NO placeholder boxes.

- Respect prefers-reduced-motion.

DESIGN SYSTEM (from reference + INFIELD logo)

- Primary Blue #2D5BE3 (buttons, icons, eyebrow text, links) | Hover #1E46C7

- Navy #0B1F4B (headings, dark banner, form card) | Deep Navy #06132F (top bar, footer)

- Light Blue Background #F3F6FD | Soft Blue Tint #E6EDFC | White | Body Grey #5B6B82

- Staff status colors (inside app UI only): Green #22C55E Available | Amber #F59E0B Busy | Red #EF4444 In Surgery / Emergency | Grey #9CA3AF Off Duty

- Font: Plus Jakarta Sans (headings semibold/bold, body regular).

- Headings: navy, single color, like the reference. Eyebrow: small uppercase blue text above every heading (e.g., "THE PROBLEM").

- Buttons: blue, slightly rounded rectangle (rounded-lg), white text, small arrow icon; hover = darker blue + slight lift. Secondary: white with blue border.

- Cards: white, rounded-xl, thin light border, soft shadow, centered blue line icon, bold title, short grey description — exactly like the reference service cards.

- Section backgrounds alternate white and light blue, like the reference.

TOP BAR (deep navy, desktop only)

Social icons left | Email, Phone, WhatsApp (+91 9164060961) right.

NAVBAR (white, sticky, shadow on scroll)

INFIELD logo left | links: How It Works, Features, Departments, Contact | blue button "Book a Free Demo →". Mobile: logo + hamburger → full-screen menu with large links + CTA; closes on link tap and smooth-scrolls.

SECTION 1 — HERO (Scene 1: The Hospital Chaos Problem) — layout like the reference hero

- Eyebrow: "STAFF TRACKING APP FOR HOSPITALS"

- Headline (h1): "Find Any Doctor or Nurse in Your Hospital — In One Tap."

- Sub: "Doctors, nurses, ward boys, technicians and housekeeping are always on the move. INFIELD shows you who is available, where they are and how fast they can reach you — live, on your phone."

- Buttons: "Book a Free Demo →" (blue) + "See How It Works" (outline, scrolls down).

- Micro-trust line: "✓ Free demo  ✓ Works on Android & iPhone  ✓ No obligation"

- Right visual: hospital photo (administrator or doctor with a phone) exactly like the reference, PLUS a realistic phone mockup overlapping the photo showing the app: a hospital floor list with colored staff dots (green/amber/red) and a card "Dr. Verma — Available — Floor 2". A few status dots pulse gently.

- Three white cards overlapping the bottom of the hero (like the reference): 

  "Live Staff Location" – See where every staff member is, right now.

  "Nearest Doctor in One Tap" – Find and call the closest available doctor.

  "Department-Wise View" – ICU, OT, Emergency, OPD, Pharmacy and Lab at a glance.

SECTION 2 — THE EMERGENCY PAIN (Scene 2) — layout like the reference "About Our Clinic" section

- Left: 2x2 photo grid: ambulance at the emergency entrance, patient on a stretcher in a corridor, receptionist on the phone, an empty department desk.

- Right:

  Eyebrow: "THE REAL PROBLEM"

  Headline: "An Emergency Arrives. Who Is Available — Right Now?"

  Sub: "The patient needs a specialist immediately. But which doctor is free? Who is nearest? Precious minutes are lost making phone calls and searching corridors."

  Pain list (red clock / ✗ icons instead of checkmarks):

  "Multiple phone calls just to find one doctor"

  "Nurses running between floors searching"

  "No live view of who is on duty or on break"

  "Every minute of delay puts patients at risk"

  Small animated clock/timer element that ticks up (00:30 → 02:00 → 05:00) labelled "Time lost searching".

- Button: "Stop Losing Minutes →" (scrolls to form).

SECTION 3 — THE SOLUTION (Scene 3) — layout like the reference "Why Choose Us" section (id="how-it-works")

- Left:

  Eyebrow: "MEET INFIELD"

  Headline: "Your Entire Hospital Staff. Live. On One Screen."

  Sub: "INFIELD tracks your hospital staff in real time. With one tap you know who is available, where they are, and how quickly they can reach you."

  Two small feature tiles (like the reference "99% Accurate" tiles): "Real-Time Status – Updated live" | "One-Tap Contact – Call or message instantly".

  Status legend: 🟢 Available  🟡 Busy  🔴 In Surgery

- Right: large phone mockup showing a floor-by-floor hospital view (Floor 1 Emergency, Floor 2 Cardiology, Floor 3 OT/ICU) with colored staff dots on each floor, and floating UI cards flying out: doctor name, specialty, status, floor.

- Below: "How it works" in 3 steps with small icons: 1) Staff check in on the app → 2) INFIELD shows their live status and location → 3) You find and contact the right person in one tap.

DARK BANNER (like the reference "Transforming Medical Insights" band)

Navy overlay on a hospital corridor photo, centered white text:

"When Every Second Matters, Don't Waste Them Searching."

Sub: "Know exactly who can respond — before you pick up the phone."

SECTION 4 — FIND THE NEAREST AVAILABLE DOCTOR (Scene 4) — layout like the reference "Meet Our Senior Specialists" cards (id="features")

- Eyebrow: "EMERGENCY RESPONSE"

- Headline: "Emergency? See the Nearest Available Doctor Instantly."

- Sub: "Open the app, see who is closest to the Emergency Ward, and call or message them in one tap."

- Center: a small "📍 Emergency Ward" pin card.

- Three staff profile cards (photo/avatar, name, role, status dot, floor, distance, and "Call" + "Message" buttons):

  Nurse Anjali — Staff Nurse — 🟢 Available — Floor 1 · 15 m — tag "NEAREST" (highlighted with a blue border)

  Dr. Verma — Cardiologist — 🟢 Available — Floor 2 · 30 m

  Dr. Khan — Neurologist — 🟡 Busy — Floor 3 · 50 m

- Clicking/tapping "Call" on a card shows a green ripple "Connecting…" animation.

- Outcome line: "From emergency to response — without a single wasted call."

SECTION 5 — DEPARTMENT-WISE STAFF TRACKING (Scene 5) — layout like the reference "Our Comprehensive Services" card row (id="departments")

- Eyebrow: "DEPARTMENT VIEW"

- Headline: "Every Department. Every Shift. At a Glance."

- Sub: "See how many staff are in each department, who is on duty and who is on a break."

- Six department cards (reference card style with blue icon), each showing count-up numbers:

  ICU – On Duty 12 · On Break 2

  OT – On Duty 8 · In Surgery 5

  Emergency – On Duty 10 · On Break 1

  OPD – On Duty 15 · On Break 3

  Pharmacy – On Duty 4 · On Break 1

  Lab – On Duty 6 · On Break 0

  (grid: 3 columns desktop, 2 tablet, 1 mobile — or 2 per row on mobile if cards stay readable)

- Below: a dashboard mockup showing the same data as a live department summary.

[SCENES 6+ — TO BE ADDED. Leave the page structured so more feature sections can be inserted here before the final CTA.]

SECTION — FINAL CTA + FORM (id="contact") — layout like the reference "Get Your Free Consultation" block

- Left: hospital photo (administrator looking at a phone) with headline "See INFIELD Live in Your Hospital" and 3 checks: "Free personalised demo", "Setup for all your departments", "No obligation".

- Right: navy form card "Book Your Free Demo":

  Full Name*, Hospital Name*, Phone* (+91 prefix, 10 digits starting 6–9, inputMode="tel"), Email, Number of Staff (1–50, 51–200, 201–500, 500+), Your Role (Owner/Director, Administrator, Operations, Other), Message.

  Inline red validation errors, loading spinner, no double submit.

  Button: "Book My Free Demo on WhatsApp →"

  Under button: "🔒 Your details are safe. We never spam."

- ON SUBMIT:

  a) Save to a database table "demo_requests" (name, hospital, phone, email, staff_count, role, message, created_at) using Lovable Cloud / Supabase.

  b) Redirect to https://wa.me/919164060961?text=<encodeURIComponent(message)> directly inside the submit handler (window.location.href on mobile, window.open new tab on desktop with a fallback if blocked).

  c) Message: "Hello INFIELD Team, I would like a demo of INFIELD for Hospitals.\n\nName: {name}\nHospital: {hospital}\nPhone: +91 {phone}\nEmail: {email}\nStaff: {staffCount}\nRole: {role}\nMessage: {message}" (skip empty optional fields).

  d) Success state: green check + "Almost done! Please tap 'Send' in WhatsApp to confirm your demo." + "Didn't open WhatsApp? Click here" link.

- Small trust line under the section: "🔒 Tracks staff only during duty hours · Staff consent built-in · Patient data is never tracked"

FOOTER (deep navy, like the reference)

INFIELD logo on a white rounded badge | How It Works, Features, Departments, Contact | contact details | social icons | "© 2026 INFIELD. All rights reserved." | Privacy Policy | Terms & Conditions.

FLOATING WHATSAPP BUTTON

Fixed bottom-LEFT on all screens (20px desktop / 16px mobile + safe-area inset), 56px circle, #25D366, white WhatsApp logo, gentle pulse, desktop tooltip "Chat on WhatsApp", opens https://wa.me/919164060961?text=Hi%20INFIELD%20Team%2C%20I%27m%20interested%20in%20INFIELD%20for%20Hospitals. in a new tab.

MOBILE FLOATING CTA

Mobile only: blue button "Book a Free Demo" fixed bottom-RIGHT, never overlapping the WhatsApp button; hides when #contact is in view.

MOBILE REQUIREMENTS (critical)

- Mobile-first; perfect at 360, 375, 390, 414, 768, 1024, 1440px. Zero horizontal scroll.

- On mobile the hero shows headline → sub → buttons → phone mockup; the headline must be fully visible on the first screen at 390px.

- Two-column layouts stack (text first, visual below). Photo grids become 2x2 small tiles.

- clamp() typography: h1 ~30–34px mobile, ~52–58px desktop; body min 16px.

- Tap targets min 44px; main buttons full width on mobile; form inputs 16px font.

- Lighter animations on mobile; lazy-load images.

COPY RULES

- Use all copy word for word. Simple, clear English for Indian hospital owners and administrators.

- Do not invent statistics, testimonials, doctor reviews or client logos.

SEO

Title: "INFIELD for Hospitals — Find Any Doctor or Nurse Instantly | Staff Tracking App". Meta description: "See which doctors and nurses are available, where they are, and contact the nearest one in one tap. Real-time hospital staff tracking app. Book a free demo." Open Graph tags, INFIELD logo as favicon.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c3a27ab9-9807-481f-80d1-a887eb45da37).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
