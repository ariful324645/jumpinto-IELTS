import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing1Pagination2021 from "../Pagination 2021/Writing1Pagination2021";

const Writing1Part22021 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22019";

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
              In some countries, more and more people are becoming interested in
              finding out about the history of the house or building they live
              in. <br /> <br /> What are the reasons for this? How can people
              research this?
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
                  Reasons and Research Methods for People's Interest in the
                  History of Their Living Places
                </h1>
                <p className="mt-5">
                  The growing curiosity about residential history stems from our
                  innate desire to connect with the past through tangible
                  surroundings. This trend reflects both personal identity
                  formation and collective cultural preservation efforts,
                  enabled by modern accessibility of historical data. <br /> <br /> One
                  primary driver is the increasing value placed on heritage
                  conservation. Homeowners often discover that understanding a
                  building's past helps preserve architectural integrity during
                  renovations. For instance, those residing in Amsterdam's canal
                  houses frequently uncover original 17th-century features
                  beneath modern layers, prompting careful restoration rather
                  than demolition. Additionally, historical awareness satisfies
                  emotional needs - knowing a Victorian-era London terrace
                  survived wartime bombings creates deeper emotional attachment
                  to living spaces. <br /> <br /> The digital revolution has democratized
                  historical research through various channels. Local council
                  archives now digitize property records, enabling online access
                  to blueprints and ownership history. The UK's "Historic
                  England" database allows postcode-based searches of listed
                  buildings with construction details. Physical investigation
                  also yields clues - examining attic beams in New England
                  colonial homes might reveal shipbuilding techniques through
                  tool marks and joint types. Oral histories remain valuable;
                  Chicago residents often trace brownstone histories through
                  elderly neighbors' recollections of previous occupants. <br /> <br />
                  Community initiatives further facilitate discovery. Toronto's
                  "House History Project" trains volunteers to interpret census
                  records and fire insurance maps, while Melbourne's heritage
                  walks emphasize architectural storytelling. These approaches
                  transform private curiosity into collective knowledge
                  preservation. Ultimately, researching a building's past
                  satisfies both practical preservation needs and the human
                  yearning for connection across generations, turning houses
                  into living history books rather than mere shelters.
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
      <Writing1Pagination2021></Writing1Pagination2021>
    </div>
  );
};

export default Writing1Part22021;
