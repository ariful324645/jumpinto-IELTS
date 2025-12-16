import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing3Pagination2017 from "../Pagination2017/Writing3Pagination2017";

const Writing3Part22017 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22018";

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
      <div className="flex gap-6 ">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-[1000px]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TASK 2</h1>
          </div>

          <div className="">
            <h1 className="text-xl mb-4">
              You should spend about 40 minutes on this task.
            </h1>
            <p className="text-xl mb-4">Write about the following topic:</p>
            <p className="text-lg p-5 font-bold italic border-2 border-black">
              In a number of countries, some people think it is necessary to
              spend large sums of money on constructing new railway lines for
              very fast trains between cities. Others believe the money should
              be spent on improving existing public transport. <br /> <br />{" "}
              Discuss both these views and give your own opinion.
            </p>
            <p className="text-xl my-4">
              Give reasons for your answer and include any relevant examples
              from your own knowledge or experience.
            </p>
            <p className="text-lg mt-4">Write at least 250 words.</p>
            <br />

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
                <h1 className="text-xl text-center font-bold">
                  Spending on New High-speed Railways vs. Existing Public
                  Transport
                </h1>
                <p className="mt-5">
                  Investing in transportation infrastructure remains a
                  contentious issue globally. Advocates for high-speed rail
                  networks argue that intercity bullet trains stimulate regional
                  economies by connecting business hubs efficiently. For
                  instance, Japan's Shinkansen system reduced travel time
                  between Tokyo and Osaka from 6 hours to under 3, enabling
                  daily commutes that boosted commercial activities in both
                  cities. Similarly, France's TGV lines have revitalized
                  secondary cities like Lyon by making them accessible within 2
                  hours from Paris, attracting investments and skilled workers.
                  Such projects demonstrate how rapid rail links can
                  redistribute economic opportunities beyond overcrowded
                  metropolises. <br /><br /> Conversely, opponents emphasize that existing
                  public transport serves broader societal needs. Urban buses,
                  subways, and trams cater to daily commuters, students, and
                  low-income groups who form the backbone of city economies.
                  London's Crossrail project exemplifies this approach, where
                  upgrading suburban rail networks improved accessibility for
                  1.5 million residents while creating 55,000 jobs. Unlike
                  high-speed trains that primarily benefit business travelers,
                  modernizing aging infrastructure addresses chronic issues like
                  traffic congestion and air pollution. Mumbai's suburban rail
                  upgrades, despite being less glamorous than bullet trains,
                  reduced overcrowding by 22% while accommodating 8 million
                  daily passengers - a tangible impact on ordinary citizens'
                  quality of life. <br /> <br /> In my view, governments should prioritize
                  current transport systems while selectively developing
                  high-speed corridors. Cities like Berlin demonstrate this
                  balance effectively: while maintaining Europe's most punctual
                  metro system, Germany also built the ICE network connecting
                  major cities without neglecting regional services. This dual
                  approach ensures equitable access for all citizens while
                  fostering intercity commerce. <br /><br /> Allocating 70% of budgets to
                  maintain affordable fares, electrify buses, and expand metro
                  coverage would yield immediate benefits, reserving the
                  remainder for strategic rail projects between economic
                  powerhouses. Ultimately, transportation policies must serve
                  both economic ambitions and social equality to achieve
                  sustainable development.
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
      <Writing3Pagination2017></Writing3Pagination2017>
    </div>
  );
};

export default Writing3Part22017;
