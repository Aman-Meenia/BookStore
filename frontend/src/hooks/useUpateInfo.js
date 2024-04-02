import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useUpdateInfo = () => {
  const [loading, setLoading] = useState(false);

  const updateInfo = async ({ userName, fullName, email, gender }) => {
    const valid = validateDetails({ userName, fullName, email, gender });
    if (!valid) {
      return;
    }
    setLoading(true);

    await axios
      .post("api/v1/user/updatedetail", {
        userName,
        fullName,
        email,
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
  return { updateLoading: loading, updateInfo };
};

const validateDetails = ({ userName, fullName, email, gender }) => {
  userName = userName.trim();
  fullName = fullName.trim();
  email = email.trim();
  gender = gender.trim();
  if (!userName || !fullName || !email || !gender) {
    toast.message("All fields are required");
    return false;
  }
  return true;
};
