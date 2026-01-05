import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2021 from "../Pagination 2021/Writing2Pagination2021";

const Writing2Part22021 = () => {
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
              In their advertising, businesses nowadays usually emphasise that
              their products are new in some way. <br /> <br /> Why is this? Do
              you think it is a positive or negative development?
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
                  Businesses' Emphasis on New Products: Reasons and Impact
                </h1>
                <p className="mt-5">
                  Businesses increasingly highlight the novelty of their
                  products in advertisements primarily due to market competition
                  and evolving consumer psychology. In saturated markets where
                  similar items exist, emphasizing new features helps companies
                  differentiate themselves. Consumers, particularly younger
                  generations raised in fast-paced digital environments, often
                  associate innovation with progress and quality. This creates a
                  cycle where businesses feel compelled to continuously present
                  updates to maintain relevance. <br /> <br /> This trend has both
                  constructive and problematic aspects. Positively, it drives
                  technological advancement and creative problem-solving.
                  Smartphone manufacturers like Apple and Samsung, for instance,
                  have consistently introduced improved camera systems and
                  battery technologies through this competitive process.
                  Similarly, furniture companies like IKEA now develop
                  space-saving modular designs to address urban housing
                  challenges, demonstrating how market demands spur practical
                  innovation. These developments frequently translate to better
                  user experiences and expanded consumer choices. However, the
                  obsession with novelty risks promoting wasteful consumption
                  patterns. <br /> <br /> Fast fashion brands releasing weekly clothing
                  collections exemplify this issue, as garments are often
                  discarded after minimal use despite being labeled "new."
                  Research by the Ellen MacArthur Foundation reveals that such
                  practices contribute significantly to textile waste, with 73%
                  of clothing ending up in landfills. <br /> <br /> Moreover, superficial
                  updates like repackaged snacks with identical ingredients
                  mislead customers seeking genuine improvements. While the
                  emphasis on newness accelerates innovation cycles, its
                  benefits depend on ethical implementation. Governments and
                  industry bodies should incentivize meaningful upgrades over
                  cosmetic changes. For example, Germany's Blue Angel
                  certification rewards products with verifiable environmental
                  advantages rather than mere novelty claims. When businesses
                  prioritize substantial improvements aligned with societal
                  needs, this marketing strategy becomes a force for progress
                  rather than exploitation.
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
      <Writing2Pagination2021></Writing2Pagination2021>
    </div>
  );
};

export default Writing2Part22021;
