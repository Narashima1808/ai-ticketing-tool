import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-8">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-md text-white shadow-2xl"
      >

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            🚀
          </div>

          <h1 className="text-4xl font-bold">
            Nudge AI Helpdesk
          </h1>

          <p className="text-slate-300 mt-2">
            AI-Powered Internal Ticketing Platform
          </p>

        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-6 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <Link to="/employee">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-semibold hover:scale-[1.02] transition mb-4">
            Employee Login
          </button>
        </Link>

        <Link to="/agent">
          <button className="w-full bg-white/10 border border-white/10 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
            Agent Login
          </button>
        </Link>

        <div className="text-center text-sm text-slate-400 mt-6">
          AI Categorization • Sentiment Analysis • Smart Routing
        </div>

      </motion.div>

    </div>
  );
}