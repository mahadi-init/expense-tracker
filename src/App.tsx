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
import Categories from "./components/Categories";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <div className="px-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
