import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const RazorPayPayment = ({
  firstName,
  lastName,
  email,
  phoneNo,
  address,
  state,
  city,
  pincode,
}) => {
  const handlePayment = async () => {
    console.log(firstName);
    try {
      console.log("Works");
      await axios
        .post("/api/v1/order", {
          firstName,
          lastName,
          email,
          phoneNo,
          address,
          state,
          city,
          pincode,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Error in the order ");
          console.log(err.response);
          toast.error(err.response.message);
          return;
        });

      // await axios
      //   .post("api/v1/order/create", {
      //     amount: 50000,
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //     toast.error(err.response.message);
      //     return;
      //   });
      const options = {
        key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      // rzp1.open();
    } catch (err) {
      toast.error(" Internal server error");
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        type="button"
        className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
      >
        Complete Purchase
      </button>
    </>
  );
};

export default RazorPayPayment;
