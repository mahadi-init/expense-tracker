import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Income from "./pages/income";
import NotFound from "./pages/not-found";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
