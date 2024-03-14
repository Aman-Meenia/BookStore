import React, { useState } from "react";
import { useResetPassword } from "../hooks/resetPassword";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUrl = window.location.href;

    await resetPassword({ password, confirmPassword, currentUrl });
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg bg-teal-50">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Reset
            <span className="text-blue-900"> Password</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text ">New password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full input input-bordered h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text ">Confirm password</span>
              </label>
              <input
                type="password"
                placeholder="Enter confirm password"
                className="w-full input input-bordered h-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <button className="btn btn-block btn-sm mt-10">
                {loading ? (
                  <span className="loading loading-spinner"> </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
