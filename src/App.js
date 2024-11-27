import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Input from "./pages/Input";
import Output from "./pages/Output";
import Dashboard from "./pages/Dashboard";
import DashboardSupplier from "./pages/DashboardSupplier";
import DashboardWorker from "./pages/DashboardWorker";
import DatePicker from "./components/DatePicker";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<Input />} />
        <Route path="/output" element={<Output />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardsupplier" element={<DashboardSupplier />} />
        <Route path="/dashboardworker" element={<DashboardWorker />} />
        <Route path="/datepicker" element={<DatePicker />} />
      </Routes>
    </Router>
  );
};

export default App;
