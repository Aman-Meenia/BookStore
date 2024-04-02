import axios from "axios";
import { ProfileContext } from "../store/profile";
import { useContext, useState } from "react";
export const useCheckUserAlreadyLogin = () => {
  const { setAlreadyLogin, setAdminLogin } = useContext(ProfileContext);

  const [loading, setLoading] = useState(false);

  const alreadyLoginUser = async (req, res) => {
    setLoading(true);
    await axios
      .get("/api/v1/user/alreadyLogin")
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.role);
        if (response.data.role === "ADMIN") {
          setAdminLogin(true);
        } else {
          setAlreadyLogin(true);
        }
      })
      .catch(() => {
        console.log("Already Login Error");
        setAlreadyLogin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { alreadyLoginUser, loading };
};
