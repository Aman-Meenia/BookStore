import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Card = ({ book }) => {
  return (
    <>
      {/* Replace the :34 with the id of the book */}
      <Link to="/book/:34" className="block">
        <div className="bg-white rounded-2xl p-6 cursor-pointer hover:-translate-y-2 transition-all relative">
          <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
            <FaRegHeart size={20} />
          </div>

          <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
            <img
              // src="http://surl.li/rkyla"
              // src="http://surl.li/rkylt"
              src={book.images}
              alt="Image not Avaliable "
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{book.author}</p>
            <h4 className="text-lg text-gray-700 font-bold mt-4">$10</h4>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;

// import React, { useState } from "react";
//
// const Card = ({ book }) => {
//   const AlreadyBorrowed = true;
//   const handleSubmitBorrow = (e) => {
//     e.preventDefault();
//   };
//   const handleSubmitReturn = (e) => {
//     e.preventDefault();
//   };
//
//   return (
//     <>
//       <div className=" bg-white rounded-lg shadow-md overflow-hidden w-50-md">
//         <img
//           className="w-full h-64 object-cover object-center"
//           // src={`https://via.placeholder.com/300x400?text=${book.title}`}
//           src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=3012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt={book.title}
//         />
//         <div className="ps-4">
//           <h2 className="text-xl font-semibold break-words ">
//             {" "}
//             Title: {book.title}
//           </h2>
//           {/*   <p className="text-gray-600  font-semibold  ">Author:{book.author}</p> */}
//           {/**/}
//           {/*   <p className="text-gray-700  font-semibold ">Genre: {book.genre}</p> */}
//         </div>
//         {/* <div className="rating rating-sm ps-4"> */}
//         {/*   <input */}
//         {/*     type="radio" */}
//         {/*     name={`rating-${book._id}`} */}
//         {/*     value="1" */}
//         {/*     className="mask mask-star-2 bg-orange-400" */}
//         {/*     disabled */}
//         {/*   /> */}
//         {/*   <input */}
//         {/*     type="radio" */}
//         {/*     name={`rating-${book._id}`} */}
//         {/*     value="1.5" */}
//         {/*     className="mask mask-star-2 bg-orange-400 " */}
//         {/*     checked */}
//         {/*     disabled */}
//         {/*   /> */}
//         {/*   <input */}
//         {/*     type="radio" */}
//         {/*     name={`rating-${book._id}`} */}
//         {/*     className="mask mask-star-2 bg-orange-400 " */}
//         {/*     disabled */}
//         {/*   /> */}
//         {/*   <input */}
//         {/*     type="radio" */}
//         {/*     name={`rating-${book._id}`} */}
//         {/*     value="2.5" */}
//         {/*     className="mask mask-star-2 bg-orange-400" */}
//         {/*     disabled */}
//         {/*   /> */}
//         {/*   <input */}
//         {/*     type="radio" */}
//         {/*     name={`rating-${book._id}`} */}
//         {/*     value="3" */}
//         {/*     className="mask mask-star-2 bg-orange-400" */}
//         {/*     disabled */}
//         {/*   /> */}
//         {/* </div> */}
//         {/* <div className="flex justify-end bottom-0"> */}
//         {/*   {AlreadyBorrowed === true ? ( */}
//         {/*     <button className="btn btn-sm m-1" onClick={handleSubmitReturn}> */}
//         {/*       Return */}
//         {/*     </button> */}
//         {/*   ) : ( */}
//         {/*     <button className="btn btn-sm m-1" onClick={handleSubmitBorrow}> */}
//         {/*       Borrow */}
//         {/*     </button> */}
//         {/*   )} */}
//         {/* </div> */}
//       </div>
//     </>
//   );
// };
//
// export default Card;
