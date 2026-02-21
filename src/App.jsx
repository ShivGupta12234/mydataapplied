import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DataPortfolio from "./pages/DataPortfolio";
import DevPortfolio from "./pages/DevPortfolio";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/data" element={<DataPortfolio />} />
      <Route path="/dev" element={<DevPortfolio />} />
    </Routes>
  );
}