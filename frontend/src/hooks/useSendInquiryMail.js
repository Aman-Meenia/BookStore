import { useState } from "react";
import toast from "react-hot-toast";

export const useSendInquiryMail = () => {
  const [loading, setLoading] = useState(false);

  const sendInquiryMail = async ({
    firstName,
    lastName,
    email,
    message,
    subject,
    phoneNo,
  }) => {
    setLoading(true);
    const valid = validate(
      firstName,
      lastName,
      email,
      message,
      subject,
      phoneNo,
    );
    if (!valid) return;
    setLoading(false);
    toast.success("Inquiry sent successfully");
  };
  return {
    loading,
    sendInquiryMail,
  };
};

const validate = (firstName, lastName, email, message, subject, phoneNo) => {
  if (!firstName || !lastName || !email || !message || !subject || !phoneNo) {
    toast.error("All fields are required");

    return false;
  }

  return true;
};
