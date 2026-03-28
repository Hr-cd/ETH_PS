import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try { await API.post("/auth/logout"); } 
    catch (error) { console.log("Logout error", error); }
    logout();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-brand">
        ✨ AI Tutor
      </Link>
      <div className="nav-links">
        <Link to="/questions" className="nav-link">Questions</Link>
        <Link to="/submit-attempt" className="nav-link">Practice</Link>
        {user?.role === "teacher" && (
           <Link to="/create-question" className="nav-link">Create</Link>
        )}
      </div>
      <div className="nav-user">
        <span>{user?.name || "Student"}</span>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};
export default Navbar;