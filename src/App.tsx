import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import AStarPage from "./pages/path-algorithms/AStarPage";
import BfsPage from "./pages/path-algorithms/BfsPage";
import DijkstraPage from "./pages/path-algorithms/DijkstraPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BfsPage />} />
          <Route path="bfs" element={<BfsPage />} />
          <Route path="dijkstra" element={<DijkstraPage />} />
          <Route path="a-star" element={<AStarPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
