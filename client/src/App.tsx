import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat/:name" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
