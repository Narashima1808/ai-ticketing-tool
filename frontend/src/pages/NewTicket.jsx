import { useState } from "react";
import supabase from "../lib/supabase";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function NewTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("IT");
  const [urgency, setUrgency] = useState("Low");
  const [sentiment, setSentiment] = useState("Neutral");

  const [loadingAI, setLoadingAI] = useState(false);

  async function getAISuggestion(text) {
    if (text.length < 20) return;

    try {
      setLoadingAI(true);

      const response = await axios.post(
        "http://localhost:5000/api/categorize",
        {
          description: text,
        }
      );

      const aiResult = JSON.parse(response.data.result);

      setCategory(aiResult.category || "IT");
      setUrgency(aiResult.urgency || "Medium");
      setSentiment(aiResult.sentiment || "Neutral");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAI(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("tickets")
      .insert([
        {
          title,
          description,
          category,
          urgency,
          sentiment,
        },
      ]);

    if (error) {
      console.error(error);
      toast.error("Failed to create ticket");
      return;
    }

   toast.success("Ticket created successfully!");

    setTitle("");
    setDescription("");
    setCategory("IT");
    setUrgency("Low");
    setSentiment("Neutral");
  }

  return (
    <>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-8">

      <motion.form
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl"
      >

        <h1 className="text-4xl font-bold mb-2">
          Raise Support Ticket
        </h1>

        <p className="text-slate-300 mb-8">
          Describe your issue and let AI classify it automatically.
        </p>

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ticket Title"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            rows="7"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              getAISuggestion(e.target.value);
            }}
            placeholder="Describe your issue..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {loadingAI && (
            <div className="bg-blue-500/20 border border-blue-500/20 rounded-xl p-4">
              🤖 AI analyzing your ticket...
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

            <h3 className="font-semibold text-lg mb-3">
              AI Suggestions
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-slate-900/50 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Category
                </p>

                <p className="font-bold text-lg mt-1">
                  {category}
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Urgency
                </p>

                <p className="font-bold text-lg mt-1">
                  {urgency}
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Sentiment
                </p>

                <p className="font-bold text-lg mt-1">
                  {sentiment}
                </p>
              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white"
            >
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Admin</option>
            </select>

            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-semibold text-lg hover:scale-[1.02] transition"
          >
            🚀 Submit Ticket
          </button>

        </div>

      </motion.form>

    </div>
    </>
  );
}