import {
  useState,
  useContext
} from "react";

import API from "../api/axios";

import {
  AuthContext
} from "../context/AuthContext";

const Login = () => {

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const { login } =
    useContext(
      AuthContext
    );

  const handleSubmit =
    async e => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        login(res.data);

      }

      catch (error) {

        alert(
          error.response.data.message
        );

      }

    };

  return (

    <form
      onSubmit={handleSubmit}
    >

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e =>
          setPassword(
            e.target.value
          )
        }
      />

      <button>
        Login
      </button>

    </form>

  );

};

export default Login;