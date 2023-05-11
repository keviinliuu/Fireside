import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />;
          <Route path="/signup" element={<Signup />} />;
          <Route path="/home" element={<Home />} />;
        </Routes>
      </Router>
    </div>
  )
}

export default App;
