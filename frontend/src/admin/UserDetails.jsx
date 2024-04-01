import React, { useContext, useEffect } from "react";
import UserDetail from "./UserDetail";
import { useGetUserDetail } from "../hooks/useGetUserDetail";
import { ProfileContext } from "../store/profile";

const UserDetails = () => {
  const { loading, getUserDetail } = useGetUserDetail();
  const { usersData, setUserData } = useContext(ProfileContext);

  useEffect(() => {
    const fun = async () => {
      await getUserDetail();
    };
    fun();
  }, []);
  console.log(usersData.data);
  return (
    <>
      <div className="font-[sans-serif] w-full md:w-full lg:w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex justify-center mt-4">
          {" "}
          Customer Details
        </h1>
        <div className="grid">
          {usersData.data &&
            usersData.data.length > 0 &&
            usersData.data.map((user, index) => (
              <UserDetail key={index} user={user} />
            ))}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
