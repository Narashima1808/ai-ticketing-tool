import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import axios from "axios";

import { motion } from "framer-motion";

import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaFire,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  });

  const [drafts, setDrafts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setTickets(data);

    setStats({
      total: data.length,
      open: data.filter((t) => t.status === "Open").length,
      inProgress: data.filter(
        (t) => t.status === "In Progress"
      ).length,
      resolved: data.filter(
        (t) => t.status === "Resolved"
      ).length,
      closed: data.filter(
        (t) => t.status === "Closed"
      ).length,
    });
  }

  async function updateStatus(ticketId, newStatus) {
    const { error } = await supabase
      .from("tickets")
      .update({
        status: newStatus,
        updated_at: new Date(),
      })
      .eq("id", ticketId);

    if (error) {
      console.log(error);
      alert("Failed to update status");
      return;
    }

    fetchTickets();
  }

  async function generateDraft(ticket) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/draft-response",
        {
          title: ticket.title,
          description: ticket.description,
          category: ticket.category,
        }
      );

      setDrafts((prev) => ({
        ...prev,
        [ticket.id]: response.data.draft,
      }));
    } catch (error) {
      console.log(error);
      alert("Failed to generate AI response");
    }
  }

  function getPriority(ticket) {
    let score = 0;

    if (ticket.urgency === "Critical") score += 50;
    else if (ticket.urgency === "High") score += 35;
    else if (ticket.urgency === "Medium") score += 20;
    else score += 10;

    if (ticket.sentiment === "Frustrated") score += 30;
    else if (ticket.sentiment === "Urgent") score += 25;
    else if (ticket.sentiment === "Confused") score += 15;
    else score += 5;

    return score;
  }

return (
<>
    <Navbar />

  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white">
    <div className="mb-8">
      <h1 className="text-5xl font-bold">
        AI Ticketing Dashboard
      </h1>

      <p className="text-slate-300 mt-2">
        AI-powered support operations center
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5"
      >
        <FaTicketAlt size={28} />
        <p className="mt-3 text-slate-300">
          Total Tickets
        </p>
        <h2 className="text-4xl font-bold">
          {stats.total}
        </h2>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-blue-500/20 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-5"
      >
        <FaClock size={28} />
        <p className="mt-3 text-slate-300">
          Open
        </p>
        <h2 className="text-4xl font-bold text-blue-300">
          {stats.open}
        </h2>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-yellow-500/20 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-5"
      >
        <FaClock size={28} />
        <p className="mt-3 text-slate-300">
          In Progress
        </p>
        <h2 className="text-4xl font-bold text-yellow-300">
          {stats.inProgress}
        </h2>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-green-500/20 backdrop-blur-lg border border-green-500/20 rounded-2xl p-5"
      >
        <FaCheckCircle size={28} />
        <p className="mt-3 text-slate-300">
          Resolved
        </p>
        <h2 className="text-4xl font-bold text-green-300">
          {stats.resolved}
        </h2>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-red-500/20 backdrop-blur-lg border border-red-500/20 rounded-2xl p-5"
      >
        <FaTimesCircle size={28} />
        <p className="mt-3 text-slate-300">
          Closed
        </p>
        <h2 className="text-4xl font-bold text-red-300">
          {stats.closed}
        </h2>
      </motion.div>

    </div>

    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Search tickets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-white placeholder-slate-400"
      />
    </div>

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-x-auto">

      <table className="w-full">

        <thead className="text-slate-300">
          <tr className="border-b border-slate-700">
            <th className="text-left p-3">Ticket</th>
            <th className="text-left p-3">Department</th>
            <th className="text-left p-3">Urgency</th>
            <th className="text-left p-3">Sentiment</th>
            <th className="text-left p-3">Priority</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">AI Reply</th>
          </tr>
        </thead>

        <tbody>

          {tickets
            .filter((ticket) =>
              (
                ticket.title +
                " " +
                ticket.description +
                " " +
                ticket.category
              )
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((ticket) => (

              <tr
                key={ticket.id}
                className="border-b border-slate-800 align-top hover:bg-white/5 transition"
              >
                <td className="p-4">
                  <div className="font-semibold">
                    {ticket.title}
                  </div>

                  <div className="text-sm text-slate-400 mt-2">
                    {ticket.description}
                  </div>
                </td>

                <td className="p-4">
                  {ticket.category}
                </td>

                <td className="p-4">
                  {ticket.urgency}
                </td>

                <td className="p-4">
                  {ticket.sentiment}
                </td>

                <td className="p-4">
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full flex items-center gap-2 w-fit">
                    <FaFire />
                    {getPriority(ticket)}
                  </span>
                </td>

                <td className="p-4">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      updateStatus(
                        ticket.id,
                        e.target.value
                      )
                    }
                    className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      generateDraft(ticket)
                    }
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                  >
                    🤖 Generate Reply
                  </button>

                  {drafts[ticket.id] && (
                    <div className="mt-3 p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-sm">
                      {drafts[ticket.id]}
                    </div>
                  )}
                </td>

              </tr>

          ))}

        </tbody>

      </table>

    </div>
    </div>
</>
  );
}