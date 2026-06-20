import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

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
  }

  return (
  <>
     
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Tickets
      </h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="font-bold text-xl">
              {ticket.title}
            </h2>

            <p>{ticket.description}</p>

            <div className="mt-2">
              <span className="mr-3">
                Category: {ticket.category}
              </span>

              <span className="mr-3">
                Urgency: {ticket.urgency}
              </span>

              <span>
                Status: {ticket.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}