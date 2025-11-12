import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test1Writing2019 = () => {
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
    <div className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-screen">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TASK 1</h1>
          </div>

          <div className="">
            <h1 className="text-xl mb-4">
              You should spend about 20 minutes on this task.
            </h1>
            <p className="text-lg p-5 font-bold italic border-2 border-black">
              The charts below show the average percentages in typical meals of
              three types of nutrients, all of which may be unhealthy if eaten
              too much. <br /> <br /> Summarise the information by selecting and
              reporting the main features, and make comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-96 h-96"
                src="https://i.ibb.co.com/mCkM62zS/w1-2019.jpg"
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
                  Average Percentages of Unhealthy Nutrients in Typical Meals
                </h1>
                <p className="mt-5">
                  The pie charts illustrate the average proportions of sodium,
                  saturated fat, and added sugar in different typical meals in
                  the USA. <br /> <br /> For sodium, dinner accounts for the
                  largest share at 43%, followed by lunch at 29%. Breakfast and
                  snacks each contribute 14%. This indicates that dinner is the
                  main source of sodium in the American diet. <br /> <br />{" "}
                  Regarding saturated fat, dinner also takes the biggest portion
                  at 37%, while lunch makes up 26%. Breakfast provides 16% and
                  snacks 21%. It shows a similar pattern to sodium, with dinner
                  being a significant contributor. <br /> <br /> In terms of
                  added sugar, snacks are the top source, representing 42%.
                  Dinner follows with 23%, lunch with 19%, and breakfast with
                  16%. <br /> <br /> Overall, dinner is the major provider of
                  sodium and saturated fat, while snacks are the leading source
                  of added sugar. These figures highlight the importance of
                  being cautious about the intake of these potentially unhealthy
                  nutrients, especially during dinner and when having snacks.
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
        <div className="w-1/2">
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
  );
};

export default Test1Writing2019;
