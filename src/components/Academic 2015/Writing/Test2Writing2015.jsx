import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing2Pagination2015 from "../Pagination 2015/Writing2Pagination2015";

const Test1Writing2015 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/2019/Test 1/writing";

  // Load mark from localStorage if it exists
  const [mark, setMark] = useState(
    Number(localStorage.getItem(storageKey)) || null
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
                The tables below give information about sales of
                Fairtrade*-labelled coffee and bananas in 1999 and 2004 in five
                European countries. <br /> <br /> Summarise the information by
                selecting and reporting the main features, and make comparisons
                where relevant.
              </p>

              <p className="text-lg mt-4">Write at least 150 words.</p>
              <br />

              {/* image */}
              <div className="flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="https://i.ibb.co.com/vCdStxP7/15-w2.jpg"
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
                    Sales of Fairtrade-labelled Coffee and Bananas in Five
                    European Countries (1999 - 2004)
                  </h1>
                  <p className="mt-5">
                    The tables illustrate the sales of Fairtrade-labelled coffee
                    and bananas in five European countries in 1999 and 2004.
                    Overall, most countries saw increased sales for both
                    products, with notable growth in specific markets. <br />{" "}
                    <br /> For coffee, the UK demonstrated the most dramatic
                    rise, soaring from 1.5 million euros in 1999 to 20 million
                    in 2004. Switzerland also showed steady growth, increasing
                    from 3 million to 6 million. Other countries - Denmark (1.8M
                    to 2M), Belgium (1M to 1.7M), and Sweden (0.8M to 1M) - had
                    more modest increases. In banana sales, Switzerland led with
                    a substantial jump from 15 million to 47 million euros.{" "}
                    <br /> <br /> The UK and Belgium also experienced
                    significant growth: the UK rose from 1 million to 5.5
                    million, while Belgium increased from 0.6 million to 4
                    million. Conversely, Sweden's sales dropped slightly from
                    1.8 million to 1 million, and Denmark's fell from 2 million
                    to 0.9 million.
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
      <Writing2Pagination2015></Writing2Pagination2015>
      {/* <Writing1Pagination2017></Writing1Pagination2017> */}
    </div>
  );
};

export default Test1Writing2015;
