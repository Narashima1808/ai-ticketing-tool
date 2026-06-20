import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import NewTicket from "./pages/NewTicket";
import MyTickets from "./pages/MyTickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/new-ticket" element={<NewTicket />} />
        <Route path="/my-tickets" element={<MyTickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;