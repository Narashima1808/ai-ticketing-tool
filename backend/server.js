import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/api/categorize", async (req, res) => {
  try {
    console.log("NEW SERVER VERSION LOADED");
    const { description } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You are an AI support ticket classifier.

Analyze the ticket description and return ONLY valid JSON.

Categories:
- IT
- HR
- Finance
- Admin

Urgency:
- Low
- Medium
- High
- Critical

Sentiment:
- Frustrated
- Neutral
- Urgent
- Confused

Return ONLY this format:

{
  "category": "IT",
  "urgency": "High",
  "sentiment": "Frustrated"
}

Do not include markdown.
Do not include explanations.
Do not include code blocks.
`,
        },
        {
          role: "user",
          content: description,
        },
      ],
    });

    console.log(completion.choices[0].message.content);

const response =
  completion.choices[0].message.content;

    res.json({
      result: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to classify ticket",
    });
  }
});

app.post("/api/draft-response", async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
You are a professional internal support agent.

Write a short first response to acknowledge the ticket.

Rules:
- Be professional
- Be concise
- Mention the issue
- Tell the employee the team is investigating
- Maximum 80 words
`,
        },
        {
          role: "user",
          content: `
Title: ${title}

Category: ${category}

Description:
${description}
`,
        },
      ],
    });

    res.json({
      draft: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate draft",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});