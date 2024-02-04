import React from "react";
import "./App.css";
import CompanyList from "./pages/CompanyList";
import CompanyPage from "./pages/CompanyPage";
import ChatBox from "./Component/ChatBox";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ChatBox />} />
          <Route path="/:name" element={<CompanyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
