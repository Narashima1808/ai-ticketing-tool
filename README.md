# 🎫 AI Ticketing Tool

An AI-powered support ticket management platform that automates ticket classification, sentiment analysis, prioritization, and response generation to help organizations streamline support operations.

---

## 🚀 Overview

Traditional support systems require agents to manually categorize tickets, determine urgency, and draft repetitive responses before solving actual problems.

This project introduces an **AI-first ticketing workflow** where Large Language Models automatically:

* Classify support tickets
* Detect user sentiment
* Estimate urgency
* Calculate ticket priority
* Generate professional draft responses

The goal is to reduce manual triaging effort and improve response times while keeping humans in control of final decisions.

---

## ✨ Features

### Employee Portal

* Create support tickets
* AI-powered ticket analysis
* Automatic category prediction
* Automatic urgency detection
* Real-time sentiment analysis
* Track ticket status

### Agent Dashboard

* View all support requests
* Ticket analytics dashboard
* Priority-based ticket handling
* Update ticket status
* AI-generated draft responses
* Search and filter tickets

### AI Capabilities

* Ticket Classification
* Sentiment Analysis
* Urgency Detection
* Priority Scoring
* Automated Response Drafting

---

## 🧠 AI Workflow

### Ticket Classification

The LLM analyzes the issue description and predicts:

```json
{
  "category": "IT",
  "urgency": "Critical",
  "sentiment": "Frustrated"
}
```

### Priority Engine

Priority is calculated using:

* Urgency Level
* User Sentiment

Higher business impact tickets automatically receive higher priority scores.

### AI Response Generation

Support agents can generate professional first-response drafts with a single click.

Example:

> Thank you for reporting this issue. We understand that the problem is impacting your ability to work. Our IT team has been notified and is currently investigating the matter. We will provide updates as soon as additional information becomes available.

---

## 🏗️ System Architecture

```text
Employee Portal (React)
           │
           ▼
    Express Backend
           │
     ┌─────┴─────┐
     ▼           ▼
  Groq LLM    Supabase
(Classification) (Storage)
```

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Axios
* Framer Motion
* React Icons

### Backend

* Node.js
* Express.js
* Groq SDK
* CORS
* Dotenv

### Database

* Supabase

### AI

* Groq API
* Llama 3.1 8B Instant

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Supabase

---

## 📂 Project Structure

```text
AI-Ticketing-Tool
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   ├── AgentDashboard.jsx
│   │   │   ├── NewTicket.jsx
│   │   │   ├── Login.jsx
│   │   │   └── MyTickets.jsx
│   │   │
│   │   ├── lib
│   │   │   └── supabase.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Narashima1808/ai-ticketing-tool.git

cd ai-ticketing-tool
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
GROQ_API_KEY=your_groq_api_key
```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run frontend:

```bash
npm run dev
```

---

## 🌐 Deployment

### Backend

Hosted on Render

```text
https://ai-ticketing-tool.onrender.com
```

### Frontend

Hosted on Vercel

```text
https://your-vercel-domain.vercel.app
```

---

## 🎯 Future Enhancements

* Authentication & Role-Based Access Control
* SLA Tracking
* Email Notifications
* Real-Time Updates
* Ticket Assignment Recommendations
* RAG-Based Internal Knowledge Assistant
* Multi-Language Support
* Advanced Analytics Dashboard

---

## 📸 Demo

### Employee Workflow

1. Create Ticket
2. AI Categorizes Ticket
3. Ticket Stored in Supabase

### Agent Workflow

1. View Incoming Tickets
2. Prioritize Using AI Score
3. Generate AI Response
4. Update Ticket Status

---

## 👨‍💻 Author

**Narashimamurthy K**

B.E. Robotics & Artificial Intelligence
Bangalore Institute of Technology

GitHub: https://github.com/Narashima1808

LinkedIn: https://linkedin.com/in/narashimamurthy-k-884407227

---

## ⭐ If you found this project interesting

Consider starring the repository and sharing feedback.
