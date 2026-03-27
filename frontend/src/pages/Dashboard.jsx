import {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

const Dashboard = () => {

  const [user,
    setUser] =
    useState(null);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const res =
            await API.get(
              "/auth/me"
            );

          setUser(
            res.data
          );

        }

        catch (error) {

          console.log(
            error
          );

        }

      };

    fetchUser();

  }, []);

  if (!user)
    return <p>Loading...</p>;

  return (

    <div>

      <h2>
        Dashboard
      </h2>

      <p>
        Welcome:
        {user.name}
      </p>

      <p>
        Role:
        {user.role}
      </p>

    </div>

  );

};

export default Dashboard;