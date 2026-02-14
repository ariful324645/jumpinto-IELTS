import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing1Pagination2025 from "../Pagination 2025/Writing1Pagination2025";

const Writing1Part22025 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22019";

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
              Access to clean water is a basic human right. Therefore every home
              should have a water supply that is provided free of charge. <br />{" "}
              <br /> Do you agree or disagree?
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
                  Should Clean Water Be Free for Every Home?
                </h1>
                <p className="mt-5">
                  While access to clean water is undeniably a fundamental human
                  right as recognized by the United Nations, the assertion that
                  every home should receive free water supply requires careful
                  consideration of practical sustainability and equitable
                  resource management. I disagree with the absolute proposal of
                  universal free water, believing instead that a balanced
                  approach combining affordability, government responsibility,
                  and conservation is more effective in fulfilling this right.​ <br /> <br />
                  First, framing water as an entirely free commodity risks
                  encouraging waste and inefficient use, particularly in regions
                  facing growing water scarcity. Economic theory and real-world
                  examples demonstrate that when resources are priced at zero,
                  consumers have fewer incentives to conserve. Free water could
                  also strain public budgets, diverting funds from critical
                  infrastructure upgrades needed to ensure consistent clean
                  water supply, especially in developing nations where pipelines
                  and purification systems are often inadequate. <br /> <br />​ However, this
                  does not mean denying the human right to water. The key lies
                  in establishing a tiered pricing system that guarantees a
                  basic monthly water allocation - sufficient for drinking,
                  cooking, and hygiene - nearly free of charge, while charging
                  progressively for excessive usage. This model ensures
                  vulnerable populations are protected without promoting waste.
                  Governments must also prioritize subsidizing water services
                  for low-income families and investing in renewable water
                  sources like wastewater recycling to expand accessibility
                  without compromising fiscal stability.​  <br /> <br />In conclusion, while
                  the ideal of free water aligns with the moral imperative of
                  human rights, its implementation must account for
                  environmental sustainability and economic viability. A
                  targeted approach that combines subsidized basic access, price
                  signals for conservation, and robust public investment strikes
                  a necessary balance, ensuring clean water remains a universal
                  right without compromising the long-term capacity to deliver
                  it.
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
      <Writing1Pagination2025></Writing1Pagination2025>
    </div>
  );
};

export default Writing1Part22025;
