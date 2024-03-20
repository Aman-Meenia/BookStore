import React, { useContext, useEffect, useState } from "react";
import { useGetInfo } from "../../hooks/useGetInfo";
import { ProfileContext } from "../../store/profile";
import { defaults } from "autoprefixer";
import { useUpdateInfo } from "../../hooks/useUpateInfo";

const UserProfile = () => {
  const [details, setDetails] = useState({
    email: "",
    userName: "",
    fullName: "",
    gender: "",
  });
  const { getInfoLoading, getInfo } = useGetInfo();
  const { profile, setProfile } = useContext(ProfileContext);
  useEffect(() => {
    const fun = async () => {
      getInfo();
    };
    fun();
  }, []);

  useEffect(() => {
    if (profile) {
      setDetails({
        email: profile.email || "",
        userName: profile.userName || "",
        fullName: profile.fullName || "",
        gender: profile.gender || "",
      });
    }
  }, [profile]);

  // update details
  const { updateLoading, updateInfo } = useUpdateInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateInfo({
      userName: details.userName,
      fullName: details.fullName,
      email: details.email,
      gender: details.gender,
    });
  };

  return (
    <>
      {getInfoLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update Profile
          </h2>

          <form action="#">
            <div className=" flex justify-center">
              <img
                className="rounded-full w-60 h-60"
                src={profile?.profilePic}
                alt="image description"
              />
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="username"
                  value={details.userName}
                  onChange={(e) => {
                    setDetails({ ...details, userName: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="fullname"
                  value={details.fullName}
                  onChange={(e) => {
                    setDetails({ ...details, fullName: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="email"
                  value={details.email}
                  onChange={(e) => {
                    setDetails({ ...details, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 sm:mb-5">
              <div className=" w-full flex justify-between">
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Male"
                    name="gender"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    value="male"
                    checked={details.gender === "male"}
                    onChange={(e) => {
                      setDetails({ ...details, gender: e.target.value });
                    }}
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Male
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      value="female"
                      checked={details.gender === "female"}
                      onChange={(e) => {
                        setDetails({ ...details, gender: e.target.value });
                      }}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Female
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      value="other"
                      checked={details.gender === "other"}
                      onChange={(e) => {
                        setDetails({ ...details, gender: e.target.value });
                      }}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/*Handle Submit*/}
            <div className="flex justify-center">
              <button onClick={handleSubmit} className="btn btn-primary btn-sm">
                {updateLoading ? (
                  <span className="loading loading-spinner"> </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
