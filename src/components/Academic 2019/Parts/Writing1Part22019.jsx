import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing1Pagination2019 from "../Pagination/Writing1Pagination2019";

const Writing1Part22019 = () => {
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
              Some people believe that it is best to accept a bad situation,
              such as an unsatisfactory job or shortage of money. Others argue
              that it is better to try and improve such situations. <br />{" "}
              <br /> Discuss both these views and give your own opinion.
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
                  Accept or Improve Bad Situations: A Discussion
                </h1>
                <p className="mt-5">
                  The debate between accepting unfavorable circumstances and
                  striving to change them reflects fundamental differences in
                  human coping mechanisms. While both approaches have valid
                  reasoning, their effectiveness largely depends on contextual
                  factors and individual capabilities. <br /> <br /> Proponents of acceptance
                  argue that constantly resisting reality creates unnecessary
                  stress. During the 2008 global financial crisis, many
                  professionals who maintained their lower-paying jobs rather
                  than chasing risky opportunities eventually regained stability
                  as markets recovered. This demonstrates how patience during
                  turbulent periods can prevent hasty decisions. Additionally,
                  in situations where systemic barriers exist - such as
                  gender-based pay gaps in certain industries - temporary
                  acceptance might conserve energy for strategic, long-term
                  advocacy rather than futile short-term battles. <br /> <br /> Conversely,
                  the improvement camp emphasizes human agency in shaping
                  outcomes. Consider the story of a Kenyan farmer who
                  transformed arid land into productive soil through drip
                  irrigation techniques. This proactive approach not only solved
                  immediate food shortages but created sustainable income.
                  Similarly, employees developing digital skills during
                  pandemic-induced job losses exemplify how targeted efforts can
                  turn crises into growth opportunities. History shows that
                  transformative innovations - from vaccine development to
                  renewable energy solutions - emerged from refusing to accept
                  environmental or health challenges as permanent.  <br /> <br /> In my view, a
                  balanced perspective proves most practical. Acceptance becomes
                  valuable when circumstances are genuinely beyond control,
                  serving as emotional armor against frustration. However, it
                  should never become an excuse for complacency in alterable
                  situations. The key lies in discerning between temporary
                  constraints requiring patience and systemic issues demanding
                  action. For instance, tolerating temporary overtime during a
                  project deadline differs fundamentally from enduring chronic
                  workplace exploitation. Wisdom lies in strategically choosing
                  battles while cultivating resilience through manageable
                  improvements, thereby maintaining both mental well-being and
                  progressive momentum.
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
      <Writing1Pagination2019></Writing1Pagination2019>
    </div>
  );
};

export default Writing1Part22019;
