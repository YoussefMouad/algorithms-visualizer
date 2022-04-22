import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import BfsPage from "./pages/bfs/BfsPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BfsPage />} />
          <Route path="dfs" element={"dfs"} />
          <Route path="bfs" element={<BfsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
