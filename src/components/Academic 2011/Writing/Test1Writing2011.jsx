import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing1Pagination2011 from "../Pagination 2011/Writing1Pagination2011";


const Test1Writing2011 = () => {
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
                The pie chart below shows the main reasons why agricultural land
                becomes less productive. The table shows how these causes
                affected three regions of the world during the 1990s.
                <br /> <br /> Summarise the information by selecting and
                reporting the main features, and make comparisons where
                relevant.
              </p>

              <p className="text-lg mt-4">Write at least 150 words.</p>
              <br />

              {/* image */}
              <div className="flex items-center justify-center">
                <img
                  className="w-96 h-96"
                  src="https://i.ibb.co.com/602w6xDp/w1.jpg"
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
                    Global and Regional Causes of Agricultural Land Degradation
                  </h1>
                  <p className="mt-5">
                    The pie chart illustrates global causes of agricultural land
                    degradation, while the table compares how these factors
                    affected North America, Europe, and Oceania in the 1990s.
                    Overall, over-grazing is the primary global cause, though
                    regional patterns vary significantly. <br /> <br /> In the pie chart,
                    over-grazing accounts for 35% of worldwide land degradation,
                    followed by deforestation (30%) and over-cultivation (28%).
                    Minor causes make up 7%. <br /> <br /> The table reveals distinct regional
                    trends: North America has the lowest total degradation (5%),
                    with over-cultivation (3.3%) being the main cause. Europe,
                    with 23% degraded land, faces higher impacts from
                    deforestation (9.8%) and over-cultivation (7.7%). <br /> <br /> Oceania
                    (13% degradation) is most affected by over-grazing (11.3%),
                    with no contribution from over-cultivation. Comparatively,
                    over-grazing is dominant globally and in Oceania, while
                    Europe struggles more with deforestation. North America's
                    land degradation is minimal across all causes, highlighting
                    regional disparities in the drivers of agricultural land
                    degradation.
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
  <Writing1Pagination2011></Writing1Pagination2011>
    </div>
  );
};

export default Test1Writing2011;
