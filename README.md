# NagarikSaathi 🇮🇳

**AI-Powered Government Scheme Discovery for Rural India**

NagarikSaathi is a comprehensive, bilingual (Hindi & English), AI-powered platform designed to bridge the information gap between rural citizens and life-changing government schemes. By leveraging **Gemini AI**, **RAG (Retrieval-Augmented Generation)**, and an intuitive UI, NagarikSaathi empowers Common Service Centre (CSC) operators and citizens to find, verify, and apply for schemes effortlessly.

## 🚀 Features

- **True AI RAG Pipeline**: Uses `text-embedding-004` to intelligently match citizen profiles with government schemes using cosine similarity, bypassing traditional rigid database queries.
- **Bilingual Voice Input**: Citizens can speak their queries in Hindi or English using built-in Voice-to-Text capabilities.
- **Dual Mode Interface**:
  - **Citizen Mode**: A simplified, guided chat interface for individuals.
  - **Operator (VLE) Mode**: A powerful dashboard for CSC operators, showing live stats, response times, and citizen tracking.
- **Smart Eligibility Screener**: Instantly filters schemes based on demographics (State, Income, Land, Caste, Gender, Occupation).
- **Printable Scheme Handouts**: Generates beautiful, print-ready scheme cards with QR codes and required documents that citizens can take home.
- **Accessibility First**: Features native Text-to-Speech (TTS) for illiterate users to hear scheme details out loud.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **AI Integration**: Google Gemini (`gemini-1.5-flash`), `@langchain/google-genai` for Text Embeddings
- **Security**: Helmet, Express Rate Limit, JWT Authentication, bcryptjs

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tamanna-tech-brain/nagarik-saathi.git
   cd nagarik-saathi
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/nagariksaathi
   JWT_SECRET=your_super_secret_key_123
   GEMINI_API_KEY=your_gemini_api_key
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Seed the Database (Important for RAG Embeddings):**
   ```bash
   node seed.js
   ```
   *(Ensure your MongoDB server is running)*

4. **Start the Backend Server:**
   ```bash
   npm run dev
   ```

5. **Setup and Start the Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🌐 Deployment Instructions

**Backend (Render/Heroku/Vercel):**
1. Deploy the `backend/` folder to your hosting provider.
2. Ensure you add `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` to your environment variables.
3. Update `CORS_ORIGIN` to match your frontend URL.

**Frontend (Vercel/Netlify):**
1. Deploy the `frontend/` folder.
2. Add `VITE_API_BASE` (e.g., `https://your-backend.onrender.com/api`) in the deployment environment variables.

## 📴 Offline / Fallback Behavior
NagarikSaathi is designed to be resilient during live hackathon demos:
- If the `GEMINI_API_KEY` is missing or fails (timeout), the application automatically switches to **Fallback Mode**.
- In Fallback Mode, the AI chat returns a graceful error, but **the Eligibility Screener and local Scheme Database remain 100% operational** because they rely purely on MongoDB queries, not the LLM.

## 🔐 Security Enhancements
- **Rate Limiting**: Protects the `/api/chat` and `/api/auth` endpoints from brute-force, spam, and DDOS attacks.
- **Helmet**: Secures Express apps by setting various HTTP headers.
- **JWT & Passwords**: Passwords hashed via `bcryptjs`. Enforces 8-character minimums. API routes protected by JWT Bearer tokens.
- **Input Sanitization**: Query filters explicitly cast to strings to prevent NoSQL injection via object payloads.

## 📖 Hackathon Judges
Please refer to [DEMO.md](./DEMO.md) for a step-by-step guide on how to evaluate the product features during the pitch!
