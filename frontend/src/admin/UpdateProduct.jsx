import React, { useContext, useEffect, useState } from "react";
import { useAddBook } from "../hooks/useAddBook";
import { UseGetBookByIdForUpdate } from "../hooks/useGetBookByIdForUpdate";
import { BookDetailContext } from "../store/fetchForUpdate";
import { useUpdateBook } from "../hooks/useUpdateBook";

const UpdateProduct = () => {
  const [detail, setDetail] = useState({
    title: "",
    author: "",
    quantity: "",
    price: "",
    genre: "",
    publisher: "",
    publishedOn: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const today = new Date().toISOString().split("T")[0];

  // Function to handle input key pressed is numeric or not
  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    // handle delet key
    if (event.key === "Backspace") {
      return;
    }
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const { loading, updateBook } = useUpdateBook();
  const { loadingFetch, getData } = UseGetBookByIdForUpdate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(detail);
  };

  const { bookDetail, setBookDetail } = useContext(BookDetailContext);
  useEffect(() => {
    if (bookDetail.title === "") {
      setDetail({
        title: "",
        author: "",
        quantity: "",
        price: "",
        genre: "",
        publisher: "",
        publishedOn: "",
        description: "",
      });
      return;
    }
    // console.log(bookDetail);
    const dateFromAPI = new Date(bookDetail.publishedOn);
    setDetail({
      title: bookDetail.title,
      author: bookDetail.author,
      quantity: bookDetail.quantity,
      price: bookDetail.price,
      genre: bookDetail.genre,
      publisher: bookDetail.publisher,
      publishedOn: dateFromAPI.toISOString().split("T")[0],
      description: bookDetail.description,
    });
  }, [bookDetail]);

  const handleFetchData = async (e) => {
    e.preventDefault();
    await getData(detail.title);
  };

  return (
    <>
      <div className="font-[sans-serif] text-[#333]  w-full ">
        <h1 className="text-3xl font-bold align-center text-center">
          Update book detail
        </h1>
        <form
          className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6"
          onSubmit={handleSubmit}
        >
          <div className="grid sm:grid-cols-2 gap-10">
            {/* Title  */}
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.title}
                onChange={(e) =>
                  setDetail({ ...detail, title: e.target.value })
                }
              />
              <button className="btn btn-sm" onClick={handleFetchData}>
                {loadingFetch ? (
                  <span className="loading loading-spinner"> </span>
                ) : (
                  "Get Detail"
                )}
              </button>
            </div>

            {/* Author Name  */}
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Author Name
              </label>
              <input
                type="text"
                placeholder="Enter author name"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.author}
                onChange={(e) =>
                  setDetail({ ...detail, author: e.target.value })
                }
              />
            </div>

            {/* Quantity and Price  */}
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Quantity
              </label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.quantity}
                onChange={(e) =>
                  setDetail({ ...detail, quantity: e.target.value })
                }
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter price"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.price}
                onChange={(e) =>
                  setDetail({ ...detail, price: e.target.value })
                }
                onKeyDown={handleKeyPress}
              />
            </div>

            {/* Publisher  */}
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Publisher
              </label>
              <input
                type="text"
                placeholder="Enter book publisher"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.publisher}
                onChange={(e) =>
                  setDetail({ ...detail, publisher: e.target.value })
                }
              />
            </div>
            {/* publised on */}
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Published On
              </label>
              <input
                type="date"
                placeholder="Enter book published on"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.publishedOn}
                onChange={(e) =>
                  setDetail({ ...detail, publishedOn: e.target.value })
                }
                max={today}
              />
            </div>

            {/* genre */}
            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">
                Genre
              </label>
              <input
                type="text"
                placeholder="Enter book genre"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={detail.genre}
                onChange={(e) =>
                  setDetail({ ...detail, genre: e.target.value })
                }
              />
            </div>
          </div>
          {/* Description  */}

          <textarea
            className=" m-2 textarea textarea-bordered bg-white w-full text-black"
            placeholder="Book description"
            value={detail.description}
            onChange={(e) =>
              setDetail({ ...detail, description: e.target.value })
            }
          ></textarea>

          {/* Add File*/}
          {/* <input */}
          {/*   className=" m-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" */}
          {/*   id="large_size" */}
          {/*   type="file" */}
          {/*   onChange={handleFileChange} */}
          {/* /> */}
          {/* Submit button  */}
          <button
            type="submit"
            className="mt-10 px-2 py-2.5 w-full rounded text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
          >
            {loading ? (
              <span className="loading loading-spinner"> </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
