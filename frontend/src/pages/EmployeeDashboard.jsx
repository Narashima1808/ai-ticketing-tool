import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

import {
  FaTicketAlt,
  FaClipboardList,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setStats({
      open: data.filter((t) => t.status === "Open").length,
      inProgress: data.filter((t) => t.status === "In Progress").length,
      resolved: data.filter((t) => t.status === "Resolved").length,
    });
  }

  return (
  <>
     
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold">Welcome Back 👋</h1>
            <p className="text-slate-300 mt-2">
              Manage support requests and track ticket progress.
            </p>
          </div>

          <Link to="/new-ticket" className="mt-4 md:mt-0">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-2xl font-semibold hover:scale-105 transition flex items-center gap-2">
              <FaPlus />
              Raise New Ticket
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500/20 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-6"
          >
            <FaTicketAlt size={30} />
            <h2 className="text-xl mt-4">Open Tickets</h2>
            <p className="text-5xl font-bold mt-3 text-blue-300">{stats.open}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-500/20 backdrop-blur-lg border border-yellow-500/20 rounded-3xl p-6"
          >
            <FaClipboardList size={30} />
            <h2 className="text-xl mt-4">In Progress</h2>
            <p className="text-5xl font-bold mt-3 text-yellow-300">{stats.inProgress}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-500/20 backdrop-blur-lg border border-green-500/20 rounded-3xl p-6"
          >
            <FaCheckCircle size={30} />
            <h2 className="text-xl mt-4">Resolved</h2>
            <p className="text-5xl font-bold mt-3 text-green-300">{stats.resolved}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/new-ticket">
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition cursor-pointer">
                <h3 className="text-xl font-semibold">🎫 Raise New Ticket</h3>
                <p className="text-slate-400 mt-2">
                  Create a support request and let AI classify it automatically.
                </p>
              </div>
            </Link>

            <Link to="/my-tickets">
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition cursor-pointer">
                <h3 className="text-xl font-semibold">📋 My Tickets</h3>
                <p className="text-slate-400 mt-2">
                  View ticket history and track current status.
                </p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}