import React, { useState, useContext } from "react";
import "./App.css";
import CompanyList from "./pages/CompanyList";
import CompanyPage from "./pages/CompanyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const CompanyContext = React.createContext();
function App() {
  const [companyInfo, setCompanyInfo] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/:symbol" element={<CompanyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
