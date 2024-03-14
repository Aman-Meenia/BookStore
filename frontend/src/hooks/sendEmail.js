import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
export const useEmailSend = () => {
  const [loading, setLoading] = useState(false);

  const emailSend = async ({ email }) => {
    if (!email) {
      toast.error("Email is required", {
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
      .post("/api/v1/user/forgetpassword", { email })
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

  return { loading, emailSend };
};
