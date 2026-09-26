# Project Guide

This repository contains two different AI-related projects. Follow the instructions below to run the one you need.

---

## 1. Full-stack AI Assistant (Recommended)
A production-ready AI chat application with a FastAPI backend and a Next.js frontend.

**Location:** `ai-assistant/`

### How to run:
You need to open two separate terminals.

**Terminal 1: The Backend (API)**
```powershell
cd ai-assistant/api
uv sync
uv run fastapi dev app/main.py
```

**Terminal 2: The Frontend (Web)**
```powershell
cd ai-assistant/web
npm install
npm run dev
```

**Access the app:** Open [http://localhost:3000](http://localhost:3000) in your browser.

**Optional: Local Model**
If you have Ollama installed:
```powershell
ollama pull llama3.2
```

---

## 2. Simple Python API
A basic "Hello World" API project.

**Location:** `app/` (root level)

### How to run:
```powershell
uv run --env-file .env python -m app.main
```
