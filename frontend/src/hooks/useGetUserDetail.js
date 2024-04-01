import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "../store/profile";

export const useGetUserDetail = () => {
  const [loading, setLoading] = useState(false);
  const { usersData, setUsersData } = useContext(ProfileContext);

  const getUserDetail = async () => {
    setLoading(true);
    console.log("Working");

    await axios
      .get("/api/v1/order/ordersdetail")
      .then((response) => {
        console.log(response.data);
        setUsersData(response.data);
        console.log("Data set successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
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
    loading,
    getUserDetail,
  };
};
