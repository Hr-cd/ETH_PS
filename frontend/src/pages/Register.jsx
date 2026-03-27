import {
  useState
} from "react";

import API from "../api/axios";

const Register = () => {

  const [name,
    setName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleSubmit =
    async e => {

      e.preventDefault();

      try {

        await API.post(
          "/auth/register",
          {
            name,
            email,
            password
          }
        );

        alert(
          "Registered successfully"
        );

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

      <h2>
        Register
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e =>
          setName(
            e.target.value
          )
        }
      />

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
        Register
      </button>

    </form>

  );

};

export default Register;