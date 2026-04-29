# Persona-Based AI Chatbot

A persona-based chatbot that lets users chat with three Scaler/InterviewBit personalities. Each persona uses its own system prompt, example conversations, and constraints.

## Features
- Persona switcher with clear active state
- Dedicated system prompt per persona
- Suggestion chips and typing indicator
- Mobile-friendly layout
- API error handling

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Groq API (OpenAI-compatible endpoint)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` from `.env.example` and add your key:
   ```bash
   GROQ_API_KEY=your_key
   GROQ_MODEL=llama-3.1-70b-versatile
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Deployment
- Deploy on Vercel or Netlify.
- Add `GROQ_API_KEY` (and optional `GROQ_MODEL`) to the platform environment variables.

Deployed link: TODO

## Assignment Checklist
- [ ] prompts.md updated with real research
- [ ] reflection.md (300-500 words)
- [ ] README includes deployed link and screenshots
- [ ] .env.example present and no keys committed

## Screenshots
Add screenshots to `/public` and link them here.
