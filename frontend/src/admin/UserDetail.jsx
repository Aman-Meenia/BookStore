import React from "react";

const UserDetail = ({ user }) => {
  // console.log(user);
  return (
    <>
      <div className="lg:col-span-2 py-3 px-6 bg-white overflow-x-auto">
        <div className="bg-white divide-y">
          <div className="flex  items-center gap-8 py-2  border px-6  border-gray-200">
            {/*     <div className="md:col-span-2 flex items-center gap-6"> */}

            <img
              className="  rounded-full w-32 h-32 max-w-full shadow-lg"
              // src="http://res.cloudinary.com/dlvslvw2m/image/upload/v1710442693/Library/hvbimfnajy6ph5ikrh1t.webp"
              src={user?.user[0]?.profilePic}
            />
            <div>
              <h6 className="text-md text-gray-500 mt-2">
                <strong className="ml-2">{user?.user[0]?.userName}</strong>
              </h6>
            </div>

            <div className="flex w-full justify-end gap-10  ">
              {" "}
              <div className="flex ">
                <h4 className="text-lg font-bold text-[#333]">
                  Total Order :{user?.totalQuantity}
                </h4>{" "}
              </div>
              <div className="flex">
                <h4 className="text-lg font-bold text-[#333]">
                  {/* {order.status} */}
                  Total Amount :₹{user?.totalPrice}
                </h4>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
