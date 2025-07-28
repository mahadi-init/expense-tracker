import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Expense from "./pages/expense";
import Income from "./pages/income";
import NotFound from "./pages/not-found";
import Reports from "./pages/reports";
import Settings from "./pages/settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
