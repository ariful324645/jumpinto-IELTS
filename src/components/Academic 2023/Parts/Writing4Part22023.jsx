import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




import Writing4Pagination2023 from "../Pagination 2023/Writing4Pagination2023";

const Writing4Part22023 = () => {
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
              It is important for people to take risks, both in their
              professional lives and their personal lives. <br /> <br /> Do you
              think the advantages of taking risks outweigh the disadvantages?
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
                  Advantages vs Disadvantages of Taking Risks in Professional
                  and Personal Lives
                </h1>
                <p className="mt-5">
                  Calculated risk-taking serves as a catalyst for growth across
                  life domains, though it requires balanced consideration. While
                  potential setbacks exist, the transformative potential of
                  well-considered risks ultimately creates more value than the
                  possible negative consequences. <br /> <br /> Professionally, risk-taking
                  often unlocks opportunities that conservative approaches
                  cannot. Many technological breakthroughs emerged from
                  experimental projects initially deemed uncertain. The
                  development of mRNA vaccine technology, for instance, involved
                  decades of high-risk research before proving crucial during
                  the COVID-19 pandemic. Similarly, career transitions
                  frequently yield unexpected benefits. A marketing specialist I
                  know transitioned to renewable energy consulting despite
                  initial income reduction, eventually tripling her earnings
                  while gaining sector-specific expertise. These examples
                  demonstrate how professional risks can yield compound rewards
                  over time. <br /> <br /> In personal development, measured risks foster
                  resilience and self-awareness. Relocation decisions illustrate
                  this principle effectively. A friend from Poland relocated to
                  Portugal to learn marine conservation, initially struggling
                  with language barriers and cultural adaptation. Within two
                  years, however, she developed multilingual communication
                  skills and established an eco-tourism initiative. While such
                  transitions may cause temporary instability, they often
                  accelerate personal growth more effectively than predictable
                  routines. Critics rightly note that reckless risk-taking can
                  lead to financial loss or emotional distress. <br /> <br /> Failed business
                  ventures and damaged relationships serve as valid cautionary
                  examples. However, these outcomes typically stem from
                  inadequate planning rather than risk-taking itself. The key
                  distinction lies in taking calculated risks after evaluating
                  potential downsides, rather than impulsive gambles. When
                  individuals analyze possible scenarios and prepare contingency
                  plans, even unsuccessful attempts provide valuable learning
                  experiences that inform future decisions. <br /> <br /> Ultimately, the
                  advantages of prudent risk-taking outweigh its disadvantages
                  because it drives innovation and self-improvement. While not
                  every risk yields immediate success, the cumulative effect of
                  strategic experimentation typically surpasses the safety of
                  perpetual caution. Societies progress when individuals dare to
                  challenge conventional paths while maintaining rational
                  assessment of potential outcomes.
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
      <Writing4Pagination2023></Writing4Pagination2023>
    </div>
  );
};

export default Writing4Part22023;
