import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async ({ userName, password }) => {
    userName = userName.trim();
    password = password.trim();

    if (!userName || !password) {
      toast.error("All fields are required", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    setLoading(true);
    await axios
      .post("/api/v1/user/login", { userName, password })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        console.log("error is " + err);
        toast.error(err.response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, login };
};
