import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

import API from "../api/axios";

const Navbar = () => {

  const navigate =
    useNavigate();

  const {
    logout
  } = useContext(
    AuthContext
  );

  const handleLogout =
    async () => {

      try {

        await API.post(
          "/auth/logout"
        );

      }

      catch (error) {

        console.log(
          "Logout error"
        );

      }

      logout();

      navigate(
        "/login"
      );

    };

  const token =
    localStorage.getItem(
      "token"
    );

  if (!token)
    return null;

  return (

    <nav
      style={{
        padding: "10px",
        background: "#eee"
      }}
    >

      <Link to="/dashboard">
        Dashboard
      </Link>

      {" | "}

      <button
        onClick={
          handleLogout
        }
      >
        Logout
      </button>

    </nav>

  );

};

export default Navbar;