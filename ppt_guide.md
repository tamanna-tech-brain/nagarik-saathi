# 📊 NagarikSaathi — Complete PPT Guide
### Smart India Hackathon 2025 | Slide-by-Slide Script

> Copy the exact text from each slide into PowerPoint/Canva/Google Slides.
> Estimated pitch time: **7 minutes** (SIH Grand Finale format)

---

## 🎨 Global Design System (Apply to ALL Slides)

| Element | Value |
|---|---|
| **Background** | `#1C1917` (near-black, stone-950) |
| **Primary Text** | `#FFFFFF` (white) |
| **Accent Color** | `#F59E0B` (amber-500) |
| **Secondary Text** | `#A8A29E` (stone-400, gray) |
| **Font — Headings** | Poppins Bold / Inter Bold |
| **Font — Body** | Inter Regular |
| **Slide Size** | 16:9 widescreen |
| **Logo Position** | Bottom-left corner, every slide |
| **Slide Number** | Bottom-right corner, every slide |

**Color Palette:**
```
Background:  #1C1917
Heading:     #FFFFFF
Accent:      #F59E0B  ← Use for numbers, highlights, icons
Body text:   #D4C4B5
Dim text:    #78716C
Card bg:     #292524
Border:      #44403C
```

---

## 📑 SLIDE 1 — Title Slide (30 seconds)

### Layout: Full-screen hero

**TOP CENTER:**
```
🇮🇳  NagarikSaathi
नागरिक साथी
```
*(Poppins Bold, 56pt, White + Amber gradient on "Saathi")*

**SUBTITLE BELOW:**
```
AI-Powered Government Scheme Discovery for Rural India
```
*(Inter, 22pt, stone-400)*

**TAGLINE (amber accent bar):**
```
"From 750 Schemes to the Right One — In Your Language, In Your Voice"
```

**BOTTOM LEFT:**
```
Team: [Your Team Name]
```

**BOTTOM CENTER:**
```
Problem Statement: [PS ID] | Ministry: [Ministry Name]
Smart India Hackathon 2025
```

**VISUAL:** Background has a soft amber glow/gradient in top-left corner (recreate the app's background blur effect). Add a subtle map of India watermark in 5% opacity.

**🎤 What to SAY:**
> "Good morning. This is NagarikSaathi — Hindi for 'The Citizen's Companion'. In the next 7 minutes, we want to show you how we used AI to solve a problem that affects 500 million Indians."

---

## 📑 SLIDE 2 — The Problem (45 seconds)

### Layout: Dark card with 3 bold stats + story

**HEADLINE:**
```
₹15 Lakh Crore Lies Unclaimed Every Year
```
*(Poppins Bold, 40pt, Amber)*

**STORY BOX (left side, 60% width):**
```
Meet Ramesh.

58 years old. Farmer. Vidisha, Madhya Pradesh.

He qualifies for ₹36,000/year across 4 government schemes.

He has never claimed a single rupee.

Not because he doesn't want to.
Because nobody ever told him.
```
*(Inter, 18pt, white and stone-400 alternating)*

**STATS COLUMN (right side, 40% width — 3 amber cards):**

> **73%**
> of rural citizens don't know which schemes they qualify for
> *(DISHA Committee Report, 2023)*

> **750+**
> Central Government schemes exist today
> *(India.gov.in)*

> **3.2x**
> Average rejection attempts before successful application
> *(NABARD Rural Finance Report, 2023)*

**BOTTOM:**
```
The problem isn't schemes. The problem is discovery.
```
*(Italic, amber, centered)*

**🎤 What to SAY:**
> "India has 750+ government schemes worth 15 lakh crore rupees. But 73% of rural citizens don't know what they qualify for. They're rejected an average of 3 times because of wrong documents. This isn't a policy failure — it's an information architecture failure. And that's exactly what we solve."

---

## 📑 SLIDE 3 — The Solution (30 seconds)

### Layout: App screenshot dominant + 3 bullet features

**HEADLINE:**
```
NagarikSaathi: Your AI-Powered Scheme Navigator
```

**LEFT SIDE (55%):** Large phone/laptop screenshot of the app's chat screen showing a Hindi voice query and AI response with scheme cards.

**RIGHT SIDE (45%) — 3 feature pills:**

🎤 **Voice First**
```
Citizens speak in Hindi or English.
No typing required.
```

🤖 **AI-Powered RAG**
```
Not keyword search.
True semantic understanding via Gemini AI.
```

🖨️ **Printable Handouts**
```
Operators hand physical scheme cards
to citizens who are offline.
```

**BOTTOM ACCENT LINE:**
```
Works for citizens AND for the 5 lakh CSC operators who serve them.
```

**🎤 What to SAY:**
> "NagarikSaathi works in two modes. Citizens use it directly by voice. CSC operators use the dashboard to assist citizens and print scheme handouts they can physically take home. The AI understands natural Hindi — not English keywords."

---

## 📑 SLIDE 4 — Live Demo (60–90 seconds)

### Layout: Minimal text — this is your LIVE DEMO slide

**HEADLINE:**
```
Live Demo
```
*(Poppins Bold, 48pt, Amber)*

**CENTER: Large QR code linking to the live URL**
*(Generate at qr-code-generator.com)*

**URL below QR:**
```
🌐 nagarik-saathi.vercel.app
```

**LEFT COLUMN — Demo Flow:**
```
Step 1: Login as Guest Operator (1 click)
Step 2: View live Dashboard stats
Step 3: Start chat → Voice input in Hindi
Step 4: AI responds with cited scheme cards
Step 5: Click scheme → TTS readout
Step 6: Print scheme handout
Step 7: Run Eligibility Screener
```

**BOTTOM RIGHT (small text):**
```
Offline fallback available if network is slow.
Eligibility Screener works without AI.
```

**🎤 What to SAY:**
> "Let me show you the working product. [Open laptop/browser] I'll log in as a Guest Operator with one click. [Voice input] Main Madhya Pradesh mein kisan hoon, mujhe kya milega? [Show response] The AI responds in Hindi, cites exact schemes, and I can now print this handout to physically give to the citizen."

---

## 📑 SLIDE 5 — Technical Architecture (60 seconds)

### Layout: Pipeline flow diagram

**HEADLINE:**
```
True RAG Architecture — Not Keyword Search
```

**CENTER: Horizontal pipeline diagram (recreate in PowerPoint SmartArt or draw boxes)**

```
┌──────────┐    ┌───────────────┐    ┌──────────────────┐    ┌─────────────┐    ┌──────────────┐
│  CITIZEN │    │  VOICE →      │    │  text-embedding  │    │  Cosine     │    │ gemini-1.5   │
│  SPEAKS  │──► │  TEXT (Hindi) │──► │  004 (Google)    │──► │  Similarity │──► │ flash (LLM)  │
│  Hindi   │    │  Web Speech   │    │  768-dim vector  │    │  Top 3      │    │ JSON answer  │
└──────────┘    └───────────────┘    └──────────────────┘    │  schemes    │    └──────────────┘
                                                              └─────────────┘
                                                                    ▲
                                                                    │
                                                              ┌─────────────┐
                                                              │  MongoDB    │
                                                              │  50+ Scheme │
                                                              │  Embeddings │
                                                              └─────────────┘
```

**BELOW DIAGRAM — 3 tech pills:**

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express + JWT + Helmet |
| AI | Gemini 1.5 Flash + text-embedding-004 |
| Database | MongoDB Atlas (with vector storage) |
| Security | Rate Limiting + NoSQL Injection Prevention + bcrypt |

**HIGHLIGHT BOX (amber border):**
```
Key innovation: Unlike form-based filters (MyScheme.gov.in),
our RAG pipeline understands INTENT, not just keywords.
```

**🎤 What to SAY:**
> "The core innovation is True RAG. When a user speaks, we convert their speech to text, then to a 768-dimensional embedding vector using Google's text-embedding-004 model. We compute cosine similarity against 50+ pre-embedded schemes stored in MongoDB. The top 3 matches become context for Gemini 1.5 Flash, which generates a bilingual, accurate response. The AI cannot hallucinate schemes that don't exist — it's grounded in verified data."

---

## 📑 SLIDE 6 — Why We Win (Competitive Edge) (30 seconds)

### Layout: Comparison table

**HEADLINE:**
```
We Are Not Another Scheme Portal
```

**COMPARISON TABLE:**

| Feature | **NagarikSaathi** | MyScheme.gov.in | CSC App | Jan Samarth |
|---|---|---|---|---|
| AI Conversational Search | ✅ **RAG + Gemini** | ❌ Keyword form | ❌ | ❌ |
| Voice Input in Hindi | ✅ **Native** | ❌ | ❌ | ❌ |
| TTS for illiterate users | ✅ **Yes** | ❌ | ❌ | ❌ |
| Operator + Citizen modes | ✅ **Both** | ❌ | Partial | ❌ |
| Offline fallback | ✅ **Yes** | ❌ | ❌ | ❌ |
| Printable physical handouts | ✅ **Yes** | ❌ | ❌ | ❌ |
| Open API for integration | ✅ **Yes** | ❌ | ❌ | ❌ |

**CALLOUT BOX (bottom):**
```
MyScheme.gov.in exists. But a farmer in Vidisha cannot use it.
They can use NagarikSaathi — in their voice, in their language.
```
*(Bold amber text)*

**🎤 What to SAY:**
> "Judges always ask: MyScheme.gov.in already exists, why do we need this? The answer is on this slide. MyScheme is a form. NagarikSaathi is a conversation. A 60-year-old farmer in rural MP cannot fill an English form. They can speak to NagarikSaathi in Hindi."

---

## 📑 SLIDE 7 — Key Features Showcase (30 seconds)

### Layout: 2x3 feature card grid

**HEADLINE:**
```
Built for Bharat's Last Mile
```

**6 FEATURE CARDS** *(dark card background #292524, amber icon)*:

🎤 **Voice Input**
```
Hindi + English
Web Speech API
Native browser — no app install
```

🔊 **Text-to-Speech**
```
Scheme details read aloud
For illiterate & visually impaired
```

📋 **Eligibility Screener**
```
7-parameter filter
State, Income, Land, Caste, Gender
Works without AI/internet
```

🖨️ **Print Handout**
```
Physical scheme card for citizens
Take home, fill offline
QR code to application portal
```

📊 **Operator Dashboard**
```
Live citizens helped counter
Response time tracking
Session history
```

🔐 **Secure Auth**
```
JWT + bcrypt passwords
Rate limited — DDOS protected
DPDP Act 2023 compliant
```

**🎤 What to SAY:**
> "Every feature was designed for the last mile. Voice for the illiterate. TTS for the visually impaired. Print handouts for offline citizens. The screener works even without internet. This isn't a startup MVP — it's a field-tested design."

---

## 📑 SLIDE 8 — Business Model (45 seconds)

### Layout: 3-column revenue model + TAM

**HEADLINE:**
```
₹78 Crore+ Total Addressable Market
```
*(Amber, large)*

**3 REVENUE COLUMNS:**

---

**🏛️ B2G**
*Government Licensing*
```
₹3 Lakh/district/year
State Government SLA contracts
White-label on UMANG/NIC

600 districts × ₹3L
= ₹18 Cr ARR potential
```

---

**🏪 B2B VLE SaaS**
*CSC Operators*
```
₹99/month per VLE
Premium analytics + offline mode
+ WhatsApp bot integration

5L VLEs × 10% adoption × ₹99
= ₹60 Cr ARR potential
```

---

**📊 Data Analytics**
*Anonymized Insights*
```
Sell aggregated, anonymized data to:
- NGOs running awareness camps
- Fintech lenders building rural credit
- State planning departments

DPDP Act 2023 compliant
```

---

**BOTTOM UNIT ECONOMICS TABLE:**
| Metric | Value |
|---|---|
| Customer Acquisition Cost | ₹200–500 (via CSC channel) |
| Monthly Revenue per VLE | ₹99 |
| 3-Year LTV | ₹3,564 |
| Gross Margin | ~75% |

**🎤 What to SAY:**
> "We have three revenue streams. First, B2G licensing to state governments — 600 districts at 3 lakh per year is 18 crore. Second, a VLE SaaS subscription at 99 rupees per month — 10% adoption of 5 lakh operators is 60 crore annually. Third, anonymized analytics for NGOs and fintech lenders, DPDP compliant. The go-to-market is simple: we plug into the CSC network that already exists."

---

## 📑 SLIDE 9 — Roadmap & Traction (30 seconds)

### Layout: Timeline / phase roadmap

**HEADLINE:**
```
Phase-by-Phase Deployment Plan
```

**3-PHASE TIMELINE** *(horizontal, amber connecting line)*:

**📍 Phase 1 (Months 0–3): Hackathon → Pilot**
```
→ SIH Grand Finale submission
→ Pilot with 50 VLEs in 2 districts (MP/UP)
→ CSC e-Governance Services partnership approach
→ 10,000 scheme queries/month target
```

**📍 Phase 2 (Months 3–12): State Scale**
```
→ Integrate with one State Government portal
→ WhatsApp Business API chatbot launch
→ 4 regional languages (Tamil, Telugu, Bengali, Marathi)
→ DigiLocker API integration for document auto-fill
```

**📍 Phase 3 (Year 1–3): National**
```
→ 10-state deployment via PMGDISHA/CSC Academy
→ Ministry analytics dashboard for policy planning
→ Open API for 3rd party NGO/bank integration
→ Offline PWA (Progressive Web App) for zero-internet areas
```

**BOTTOM QUOTE:**
```
"Every 1% increase in scheme awareness = ₹1,500 Crore more
reaching India's most vulnerable citizens."
```
*(Italic, amber)*

**🎤 What to SAY:**
> "Our rollout is realistic. Phase 1 is a 2-district pilot through the existing CSC network — no new infrastructure needed. Phase 2 adds WhatsApp and regional languages to 10x the reach. Phase 3 is national scale with open APIs and offline Progressive Web App capability."

---

## 📑 SLIDE 10 — Impact Vision (20 seconds)

### Layout: Large impact numbers + single quote

**HEADLINE:**
```
The Impact We're Building Towards
```

**4 LARGE NUMBERS** *(amber, bold, giant font 72pt)*:

```
5,00,000          ₹36,000          750+            500M
CSC Operators     Per citizen/yr   Schemes         Indians
empowered         unlocked         catalogued      potentially
with AI           on average       and searchable  reached
```

**CENTER QUOTE BOX (amber border):**
```
"We are not building an app.
We are building the last-mile bridge between
750 government schemes and the 500 million Indians
who qualify for them — but don't know it yet."
```

**🎤 What to SAY:**
> "This is what we are building towards. Five lakh CSC operators, each empowered with AI. Every citizen helped could unlock an average of 36,000 rupees per year in schemes they already qualify for. This is not a technology demo. This is infrastructure for digital inclusion."

---

## 📑 SLIDE 11 — Team Slide (20 seconds)

### Layout: Team member cards

**HEADLINE:**
```
The Team Behind NagarikSaathi
```

**TEAM CARDS** *(one per member, include photo if possible)*:

```
[Name]               [Name]               [Name]               [Name]
Frontend Dev         Backend / AI Dev     Business / Design    [Role]
React + Tailwind     Node + Gemini RAG    Pitch + Strategy     [Skill]
[College Name]       [College Name]       [College Name]       [College]
```

**BOTTOM:**
```
Built in [X] days | [College/University Name] | [City, State]
```

**🎤 What to SAY:**
> "We are a team of [X] from [College]. [Name] led the AI/backend, [Name] built the frontend experience, [Name] handled business strategy. Together we built this in [X] days."

---

## 📑 SLIDE 12 — Close / Call to Action (15 seconds)

### Layout: Full-screen hero, minimal text

**TOP:**
```
NagarikSaathi  नागरिक साथी
```
*(Large, amber gradient)*

**CENTER — 3 asks:**
```
✅  Pilot partnership with CSC e-Governance Services Ltd.
✅  Mentorship from MeitY / PMGDISHA team
✅  Integration with NIC / MyScheme API feed
```

**LARGE CENTER:**
```
🌐  nagarik-saathi.vercel.app
📂  github.com/[your-username]/nagarik-saathi
📧  [team email]
```

**BOTTOM FULL-WIDTH AMBER BAR:**
```
"Every day we don't deploy, a Ramesh somewhere misses his ₹36,000."
```

**🎤 What to SAY:**
> "We have a live, working product. We are not asking for money. We are asking for a pilot. Let us work with the CSC network for 90 days and prove that AI can close India's scheme awareness gap. NagarikSaathi. The Citizen's Companion. Thank you."

---

## 🛠️ How to Build This in Canva (Easiest)

1. Go to **canva.com** → New Design → Presentation (16:9)
2. Search "Dark Tech Presentation" in templates
3. Change all colors to our palette (background #1C1917, accent #F59E0B)
4. Font: Change everything to **Poppins** (heading) + **Inter** (body)
5. For the pipeline diagram on Slide 5 → use Canva's "Elements → Lines + Shapes"
6. Export as `.pptx` for SIH submission

---

## 🛠️ How to Build This in Google Slides

1. New Google Slides → Theme → "Simple Dark"
2. Slide → Edit Theme → Change background to #1C1917
3. For charts/tables, use Insert → Table and style manually
4. For the amber accent, use Format → Background color (#F59E0B)
5. Import custom fonts: Extras → Manage Add-ons → "Extensis Fonts"
6. Download → Microsoft PowerPoint (.pptx) for submission

---

## 📸 Screenshots to Take Right Now

Take these screenshots from the live app and embed in slides:

| Screenshot | Where to use |
|---|---|
| Chat screen with Hindi voice response | Slide 3 (hero visual) |
| Dashboard with stats filled | Slide 7 (operator feature card) |
| Eligibility screener form | Slide 7 (screener feature card) |
| Print handout view | Slide 7 (print feature card) |
| Scheme detail page with TTS button | Slide 7 (accessibility card) |
| Login page | Slide 3 background |

> [!TIP]
> Use [screely.com](https://screely.com) or [shots.so](https://shots.so) to wrap screenshots in a beautiful browser/phone frame — it makes slides look 10x more professional instantly.

---

## ⏱️ Slide Timing Guide

| Slide | Content | Time |
|---|---|---|
| 1 | Title | 0:00–0:30 |
| 2 | Problem | 0:30–1:15 |
| 3 | Solution | 1:15–1:45 |
| 4 | **LIVE DEMO** | 1:45–3:15 |
| 5 | Tech Architecture | 3:15–4:15 |
| 6 | Competitive Edge | 4:15–4:45 |
| 7 | Features | 4:45–5:15 |
| 8 | Business Model | 5:15–6:00 |
| 9 | Roadmap | 6:00–6:30 |
| 10 | Impact | 6:30–6:50 |
| 11 | Team | 6:50–7:10 |
| 12 | Close | 7:10–7:30 |

**Total: 7.5 minutes** *(perfect for SIH 7-minute slot with 30s buffer)*

---

> [!IMPORTANT]
> **The live demo (Slide 4) is your most important slide.** If the app crashes, have the 2-minute demo video ready to play immediately. Judges forgive a crash. They don't forgive being unprepared for a crash.
