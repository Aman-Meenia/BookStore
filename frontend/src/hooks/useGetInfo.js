import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ProfileContext } from "../store/profile";

export const useGetInfo = () => {
  const [loading, setLoading] = useState(false);
  const { profile, setProfile } = useContext(ProfileContext);
  const getInfo = async () => {
    setLoading(true);
    await axios
      .get("api/v1/user/getdetail")
      .then((response) => {
        setProfile(response.data.data);
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
    getInfoLoading: loading,
    getInfo,
  };
};
