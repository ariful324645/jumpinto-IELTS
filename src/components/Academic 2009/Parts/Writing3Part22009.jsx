import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






import Writing3Pagination2009 from "../Pagination 2009/Writing3Pagination2009";

const Writing3Part22009 = () => {
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
              As most people spend a major part of their adult life at work, job
              satisfaction is an important element of individual wellbeing.{" "}
              <br /> <br /> What factors contribute to job satisfaction? How
              realistic is the expectation of job satisfaction for all workers?
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
                  Factors of Job Satisfaction and Its Realistic Expectation
                </h1>
                <p className="mt-5">
                  Job satisfaction remains a fundamental human need that
                  significantly impacts quality of life. While its components
                  vary across professions and cultures, three universal factors
                  emerge as critical: alignment of work with personal values,
                  opportunities for growth, and workplace relationships. <br /> <br /> The
                  primary driver lies in whether employees perceive their work
                  as meaningful. A nurse treating patients during health crises
                  or a teacher shaping young minds often experiences fulfillment
                  through service-oriented roles. Conversely, repetitive factory
                  tasks might feel disconnected from personal aspirations unless
                  workers recognize their contribution to larger production
                  chains. Professional development opportunities also play vital
                  roles - tech companies like Spotify that offer skill-upgrading
                  programs typically report higher staff retention rates. <br /> <br />
                  Equally crucial are interpersonal dynamics; supportive teams
                  and respectful management consistently rank higher than salary
                  in global employee surveys across Europe and North America.
                  However, expecting universal job satisfaction proves
                  unrealistic due to economic constraints and occupational
                  limitations. In developing nations like India or Brazil, many
                  laborers prioritize survival needs over career fulfillment,
                  accepting monotonous manufacturing jobs to sustain families.
                  Even in affluent societies, essential but stressful
                  professions - emergency responders or retail workers - face
                  inherent dissatisfaction from irregular hours and public
                  interactions. The gig economy further complicates this
                  landscape, where food delivery riders in Southeast Asia work
                  algorithm-controlled schedules with minimal benefits or job
                  security. Structural solutions could narrow this gap. <br /> <br />
                  Scandinavian countries demonstrate that government-enforced
                  work-life balance policies and corporate profit-sharing models
                  enhance satisfaction across income levels. While complete
                  universal fulfillment remains idealistic, combining fair labor
                  practices with individual adaptability makes substantial
                  progress achievable. Ultimately, job satisfaction shouldn't be
                  viewed as an entitlement but as an evolving negotiation
                  between personal aspirations and socioeconomic realities.
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

      <Writing3Pagination2009></Writing3Pagination2009>
    </div>
  );
};

export default Writing3Part22009;
