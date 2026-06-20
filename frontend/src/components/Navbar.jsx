import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-8 py-4 flex justify-between items-center">

      <h1 className="text-white font-bold text-2xl">
        🚀 Nudge AI Helpdesk
      </h1>

      <div className="flex gap-6 text-slate-300">
        <Link to="/employee">Employee</Link>
        <Link to="/my-tickets">My Tickets</Link>
        <Link to="/agent">Agent</Link>
      </div>

    </nav>
  );
}