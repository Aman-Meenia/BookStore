import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const signup = async ({
    fullName,
    email,
    password,
    userName,
    confirmPassword,
    gender,
  }) => {
    const validation = checkValidation({
      fullName,
      email,
      password,
      userName,
      confirmPassword,
      gender,
    });

    if (!validation) return false;
    setLoading(true);
    await axios
      .post("/api/v1/user/signup", {
        fullName,
        email,
        password,
        userName,
        confirmPassword,
        gender,
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
        console.log(err.response);
        const error = err.response.data.message;
        toast.error(error, {
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

    return false;
  };

  return { loading, signup };
};

const checkValidation = ({
  fullName,
  email,
  password,
  userName,
  confirmPassword,
  gender,
}) => {
  fullName = fullName.trim();
  email = email.trim();
  password = password.trim();
  userName = userName.trim();
  confirmPassword = confirmPassword.trim();
  gender = gender.trim();

  // console.log(fullName);
  if (
    !fullName ||
    !email ||
    !password ||
    !userName ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("All fields are required", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password and confirm password should be same", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }
  return true;
};
