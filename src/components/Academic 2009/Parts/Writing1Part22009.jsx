import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





import Writing1Pagination2009 from "../Pagination 2009/Writing1Pagination2009";

const Writing1Part22009 = () => {
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
              It is generally believed that some people are born with certain
              talents, for instance for sport or music, and others are not.
              However, it is sometimes claimed that any child can be taught to
              become a good sports person or musician. <br /> <br /> Discuss
              both these views and give your own opinion.
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
                  Nature vs Nurture in Talent Development
                </h1>
                <p className="mt-5">
                  The debate between innate talent and acquired skill in fields
                  like sports and music has persisted for decades. While some
                  argue that exceptional abilities are genetic gifts, others
                  believe systematic training can cultivate excellence in any
                  child. Both perspectives hold merit but overlook the complex
                  interplay between biology and environment. <br /> <br /> Proponents of
                  natural talent often cite prodigies like Mozart, who composed
                  symphonies at five, or sprinter Usain Bolt, whose unique
                  muscle composition contributed to his record-breaking speed.
                  These cases suggest biological advantages create a performance
                  ceiling that training alone cannot breach. Neuroscientific
                  studies reveal that predispositions like perfect pitch or
                  fast-twitch muscle fibers do occur naturally, giving some
                  individuals a head start. However, this view risks
                  underestimating human adaptability - the brain's
                  neuroplasticity allows for remarkable skill development
                  through sustained practice. <br /> <br /> The nurture argument gains
                  credibility through pedagogical systems like Japan's Suzuki
                  violin method, which produces competent musicians from
                  ordinary children through immersive training. Football
                  academies in Brazil demonstrate how structured coaching in
                  favelas transforms street players into world-class athletes.
                  Psychologist Anders Ericsson's research on deliberate practice
                  contends that 10,000 hours of focused training can develop
                  expertise regardless of initial aptitude. Yet this approach
                  struggles to explain why identically trained individuals
                  achieve differing mastery levels. <br /><br /> In my view, talent and
                  training operate synergistically rather than exclusively.
                  Innate abilities provide initial advantages but require
                  cultivation through disciplined practice. Conversely,
                  dedicated training can compensate for biological limitations
                  to a significant degree, though reaching elite levels might
                  necessitate both. The story of Beethoven composing
                  masterpieces while deaf illustrates how acquired skill can
                  transcend physical constraints. Ultimately, while biology
                  might influence the starting line, persistent effort
                  determines how far one progresses in the marathon of skill
                  development.
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

      <Writing1Pagination2009></Writing1Pagination2009>
    </div>
  );
};

export default Writing1Part22009;
