import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Join from "./Join";
import Chat from "./Chat";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Join />} />
        <Route path="/chat/:user" element={<Chat />} />

      </Routes>
    </Router>
  );
}

export default App;
