import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);

    await axios
      .get("api/v1/user/logout")
      .then((response) => {
        console.log(response);
        console.log("LOgout ");
        toast.success(response.data.message);
        window.location.href = "/login";
      })
      .catch((err) => {
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

  return {
    logoutLoading: loading,
    logout,
  };
};
