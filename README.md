# 🌍 Geo-Sleuth

> **Because knowing what a Romanian utility pole looks like is a highly marketable skill.**

Welcome to **Geo-Sleuth**, a full-stack micro-game designed to test whether you can identify a country strictly by the shape of its water tanks, the paint on the back of its street signs, or the presence of obscure Cyrillic letters.

Built through a series of "baby steps" on a Friday afternoon when we absolutely should have been doing something else.

## 🏗️ The Tech Stack Flex

For a game that basically just serves up trivia, the architecture is completely over-engineered (as all good side projects should be):

- **The Face (Frontend):** Next.js 14, React, and Tailwind CSS. Features a brutal, gamified streak-tracker that resets to zero the second you mistake Brazil for Argentina.
- **The Brains (Backend):** NestJS. Clean, modular, and separated into controllers and services like a proper enterprise application.
- **The Memory (Database):** TypeORM + `better-sqlite3`. Because setting up a dedicated PostgreSQL server for 12 lines of geography trivia is where we draw the line.
- **The "Look How Professional We Are" Flex:** Swagger OpenAPI. Fully auto-generated API docs so you can ping the database directly from your browser.

## 🚀 How to Spin It Up

Since this is a monorepo, you'll need two terminal tabs.

### 1. Boot up the Backend (NestJS)

```bash
cd geo-sleuth-backend
npm install
npm run start:dev
```

Wait for the console to say Seeding complete! (it auto-populates the SQLite database on the first run).

- API Endpoints: http://localhost:3001/clues/random

- Swagger Docs: http://localhost:3001/api

### 2. Boot up the Frontend (Next.js)

```bash
cd geo-sleuth-ui
npm install
npm run dev
```

Play the game: http://localhost:3000

### 🔮 What's Next?

- Deployment to the actual internet.

- A database of clues so massive it threatens to crash SQLite.

- Global leaderboards (maybe).

Built by a Software Engineer avoiding massive architectures by building tiny, perfectly structured ones.
