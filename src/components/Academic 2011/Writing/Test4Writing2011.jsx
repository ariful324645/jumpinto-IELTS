import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing4Pagination2011 from "../Pagination 2011/Writing4Pagination2011";


const Test4Writing2011 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/2019/Test 1/writing";

  // Load mark from localStorage if it exists
  const [mark, setMark] = useState(
    Number(localStorage.getItem(storageKey)) || null,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Count words
    const rawWords = message.split(/\s+/).filter((s) => s.length > 0);
    const wordCount = rawWords.length;

    setSentenceCount(wordCount);

    if (wordCount < 1) {
      toast.warn("Please write at least one word!", { autoClose: 3000 });
    } else {
      toast.success(`You wrote ${wordCount} words`, { autoClose: 3000 });
    }

    // Set mark if more than 5 words
    const newMark = wordCount > 5 ? 1 : null;
    setMark(newMark);

    // Save mark in localStorage using the home page key
    if (newMark !== null) {
      localStorage.setItem(storageKey, newMark);
    } else {
      localStorage.removeItem(storageKey);
    }

    setSubmittedMessage(message);
  };

  return (
    <div>
      {" "}
      <div className="px-3">
        <div className="flex gap-6">
          {/* LEFT SIDE */}
          <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-[1000px]">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">TASK 1</h1>
            </div>

            <div className="">
              <h1 className="text-xl mb-4">
                You should spend about 20 minutes on this task.
              </h1>
              <p className="text-lg p-5 font-bold italic border-2 border-black">
                The graph below shows the quantities of goods transported in the
                UK between 1974 and 2002 by four different modes of transport.{" "}
                <br /> <br />
                Summarise the information by selecting and reporting the main
                features, and make comparisons where relevant.
              </p>

              <p className="text-lg mt-4">Write at least 150 words.</p>
              <br />

              {/* image */}
              <div className="flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="https://i.ibb.co.com/tTc0NPYY/w4.jpg"
                  alt="Eikhane image bosabo"
                />
              </div>

              <br />
              <hr className="border border-gray-400" />
              <br />

              <div className="flex justify-between items-center">
                <p onClick={() => setOpenScript(!openScript)}>
                  Sample Writing Answer
                </p>
                <span onClick={() => setOpenScript(!openScript)}>
                  <IoIosArrowDown size={20} />
                </span>
              </div>
              <br />
              {/* left text */}
              {openScript ? (
                <div>
                  <h1 className="text-xl text-center  font-bold ">
                    Goods Transport Quantities in UK by Mode (1974 - 2002)
                  </h1>
                  <p className="mt-5">
                    The line graph illustrates the quantities of goods
                    transported in the UK between 1974 and 2002 using four
                    modes: road, water, rail, and pipeline. Overall, road
                    transport remained the dominant method, while pipeline
                    transport showed steady growth over the period. <br /> <br /> Road
                    transport started at approximately 70 million tonnes in 1974
                    and increased consistently, reaching nearly 100 million
                    tonnes by 2002. <br /> <br /> Water transport also demonstrated a steady
                    upward trend, rising from below 40 million tonnes to roughly
                    65 million tonnes. In contrast, rail transport fluctuated:
                    it began relatively high, experienced a significant drop in
                    the 1980s, and then showed a slight recovery toward the end
                    of the period. Pipeline transport, starting from a minimal
                    volume, grew steadily to over 20 million tonnes by 2002. A
                    key comparison highlights road's unwavering dominance, with
                    its upward trajectory outpacing other modes. Water
                    transport's steady growth contrasts with rail's instability,
                    while pipeline's slow but consistent rise reflects a gradual
                    shift in transportation preferences. These trends underscore
                    the varying popularity and reliability of different
                    transport methods over the 28-year span.
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  <hr className=" border border-gray-400 border-dotted" />
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-[1000px]">
            <textarea
              rows="16"
              placeholder="Please input"
              className="border border-gray-400 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div className="flex justify-between p-4">
              <h3 className="mt-3">Words: {sentenceCount}</h3>
              <input
                onClick={handleSubmit}
                type="submit"
                value="Submit for Feedback"
                className="bg-blue-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-600 transition"
              />
            </div>

            {/* MARK */}
            {mark !== null && (
              <div className="flex justify-center mt-4">
                <div className="bg-green-100 text-green-800 px-8 py-4 rounded-2xl font-bold shadow-lg">
                  Mark: {mark}
                </div>
              </div>
            )}

            {/* Submitted Message */}
            <h1 className="text-2xl font-bold mt-6">Writing Feedback</h1>
            <div className="bg-gray-300 p-5 mt-4 rounded-lg min-h-[100px]">
              <p>{submittedMessage}</p>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
   <Writing4Pagination2011></Writing4Pagination2011>
    </div>
  );
};

export default Test4Writing2011;
