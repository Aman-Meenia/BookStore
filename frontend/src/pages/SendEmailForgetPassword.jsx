import React, { useState } from "react";
import { useEmailSend } from "../hooks/sendEmail";
const SendEmail = () => {
  const [email, setEmail] = useState("");

  const { loading, emailSend } = useEmailSend();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await emailSend({ email });
    setEmail("");
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
                <span className="text-base label-text ">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full input input-bordered h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button className="btn btn-block btn-sm mt-10">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
