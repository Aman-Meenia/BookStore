import { createContext, useState } from "react";
export const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [usersData, setUsersData] = useState({});
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        usersData,
        setUsersData,
        alreadyLogin,
        setAlreadyLogin,
        adminLogin,
        setAdminLogin,
      }}
    >
      {children}{" "}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
