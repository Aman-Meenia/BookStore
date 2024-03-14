import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ password, confirmPassword, currentUrl }) => {
    console.log("current url is " + currentUrl);

    const hashval = currentUrl.split("/").pop();

    const unHashedToken = hashval.replace("%20+", "");
    console.log("unhashed token is " + unHashedToken);

    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (!password || !confirmPassword) {
      toast.error("All fields are required", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password does not match", {
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
      .post(`/api/v1/user/forgetpassword/${unHashedToken}`, {
        password,
        confirmPassword,
      })
      .then((response) => {
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

  return { loading, resetPassword };
};
