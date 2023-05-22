import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const user = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        {user && <Route path="/" element={<Home />} /> }
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
    
  )
}

export default App;