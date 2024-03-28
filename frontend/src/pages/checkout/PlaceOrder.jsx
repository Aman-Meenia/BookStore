import React, { useContext, useState } from "react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../../store/cart";

const PlaceOrder = () => {
  const { navBarCart, setNavBarCart } = useContext(CartContext);
  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  // Function to handle input key pressed is numeric or not
  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    // handle delete key
    if (event.key === "Backspace") {
      return;
    }
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  // Function to handle form submission
  const handlePayment = async (event) => {
    // console.log(detail.firstName);
    let razorOrderDetail = "";

    console.log(detail);
    let isError = false;
    await axios
      .post("/api/v1/order", {
        detail,
      })
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => {
        console.log("Error in the order ");
        // console.log(err.response.data);
        toast.error(err.response.data.message);
        isError = true;
      });
    if (isError) return;
    await axios
      .post("api/v1/order/create", {
        amount: navBarCart.bill,
      })
      .then((res) => {
        console.log(res.data);
        razorOrderDetail = res.data;
      })
      .catch((err) => {
        // console.log(err.response);
        console.log("eroor in create order");
        toast.error(err.response.data.message);
        isError = true;
        return;
      });
    if (isError) return;
    // console.log("KEY IS", razorOrderDetail.key);

    const options = {
      key: razorOrderDetail.key, // Enter the Key ID generated from the Dashboard
      amount: razorOrderDetail.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://avatar.iran.liara.run/public/1",
      order_id: razorOrderDetail.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // order_id: "12312",
      handler: function (response) {
        const body = response;
        axios
          .post("/api/v1/order/validatepayment", {
            body,
          })
          .then((response) => {
            console.log("payment done");
            toast.success("Payment Successfull");
            window.location.href = "/";
          })
          .catch((err) => {
            // console.log(err);
            toast.error(err.response.data.message);
          });
      },
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
    rzp1.on("payment.failed", function (response) {
      console.log(response);
      toast.error("Error while processing payment");
      return;
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <>
      <div className="xl:col-span-2 h-max rounded-md p-2 sticky top-0 ">
        <h2 className="text-2xl font-bold text-[#333]">Complete your order</h2>
        <form className="mt-10">
          <div>
            <h3 className="text-lg font-bold text-[#333] mb-6">
              Personal Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  value={detail.firstName}
                  onChange={(e) => {
                    setDetail({ ...detail, firstName: e.target.value });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  value={detail.lastName}
                  onChange={(e) => {
                    setDetail({ ...detail, lastName: e.target.value });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  value={detail.email}
                  onChange={(e) => {
                    setDetail({ ...detail, email: e.target.value });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path
                      fill="none"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  onKeyDown={handleKeyPress}
                  value={detail.phoneNo}
                  onChange={(e) => {
                    setDetail({ ...detail, phoneNo: e.target.value });
                  }}
                />
                <svg
                  fill="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold text-[#333] mb-6">
              Shipping Address
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Address Line"
                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                value={detail.address}
                onChange={(e) => {
                  setDetail({ ...detail, address: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                value={detail.city}
                onChange={(e) => {
                  setDetail({ ...detail, city: e.target.value });
                }}
              />
              {/* <input */}
              {/*   type="text" */}
              {/*   placeholder="State" */}
              {/*   className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" */}
              {/* /> */}
              <select
                className="form-control px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                value={detail.state}
                onChange={(e) =>
                  setDetail({ ...detail, state: e.target.value })
                }
              >
                <option value=""> Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Tripura">Tripura</option>
                <option value="Telangana">Telangana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman & Nicobar (UT)">
                  Andaman & Nicobar (UT)
                </option>
                <option value="Chandigarh (UT)">Chandigarh (UT)</option>
                <option value="Dadra & Nagar Haveli and Daman & Diu (UT)">
                  Dadra & Nagar Haveli and Daman & Diu (UT)
                </option>
                <option value="Delhi [National Capital Territory (NCT)]">
                  Delhi [National Capital Territory (NCT)]
                </option>
                <option value="Jammu & Kashmir (UT)">
                  Jammu & Kashmir (UT)
                </option>
                <option value="Ladakh (UT)">Ladakh (UT)</option>
                <option value="Lakshadweep (UT)">Lakshadweep (UT)</option>
                <option value="Puducherry (UT)">Puducherry (UT)</option>
              </select>
              <input
                type="text"
                placeholder="Zip Code"
                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                onKeyDown={handleKeyPress}
                value={detail.pincode}
                onChange={(e) => {
                  setDetail({ ...detail, pincode: e.target.value });
                }}
              />
            </div>
            <div className="flex gap-6 max-sm:flex-col mt-10">
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]"
              >
                Cancel
              </button>

              <button
                onClick={handlePayment}
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlaceOrder;
