import React from 'react';
import './App.css';
import CompanyList from './pages/CompanyList';
import CompanyPage from './pages/CompanyPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/:name" element={<CompanyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
