import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing1Pagination2017 from "../Pagination2017/Writing1Pagination2017";

const Writing1Part22017 = () => {
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
              Some people believe that it is good to share as much information
              as possible in scientific research,business and the academic
              world. Others believe that some information is too important or
              too valuable to be shared freely. <br /> <br /> Discuss both views
              and give your own opinion.
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
                  To Share or Not to Share Information in Research, Business and
                  Academia
                </h1>
                <p className="mt-5">
                  The debate over information sharing in professional fields
                  centers on balancing collective progress with legitimate
                  protections. Advocates of open knowledge exchange argue that
                  transparency accelerates innovation and addresses global
                  challenges. During the COVID-19 pandemic, scientists worldwide
                  shared viral genome data within days of discovery, enabling
                  rapid vaccine development. Similarly, academic institutions
                  collaborating on climate change research have created
                  comprehensive models guiding international environmental
                  policies. These examples demonstrate how removing information
                  barriers can yield solutions benefiting humanity. <br /> <br /> However,
                  reasonable limitations exist. Businesses investing heavily in
                  R&D require intellectual property protections to sustain
                  operations. The pharmaceutical industry, for instance, relies
                  on patent systems to fund drug development while eventually
                  making medicines accessible through generic versions. National
                  security concerns also justify controlled information flow -
                  nuclear technology research remains restricted to prevent
                  weapon proliferation. Even in academia, premature disclosure
                  of incomplete findings could misguide public understanding, as
                  seen when early hypotheses about volcanic activity were
                  mistakenly reported as confirmed predictions. <br /> <br /> In my view, the
                  solution lies in tiered sharing systems. Core scientific
                  principles and non-sensitive data should remain publicly
                  accessible to foster innovation. The Human Genome Project's
                  decision to make basic genetic information freely available
                  while allowing commercial applications exemplifies this
                  balance. Meanwhile, proprietary details in business or
                  sensitive military technologies warrant protection through
                  ethical frameworks. Modern patent systems that mandate
                  eventual public disclosure after exclusive periods demonstrate
                  how time-bound restrictions can serve both commercial and
                  societal interests. <br /> <br /> Ultimately, information control should
                  follow a "shared by default, protected by necessity"
                  principle. This approach encourages collaborative
                  problem-solving without undermining fair competition or global
                  security. The key lies in continually reassessing what
                  constitutes necessary protection as technological and social
                  contexts evolve.
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
      <Writing1Pagination2017></Writing1Pagination2017>
    </div>
  );
};

export default Writing1Part22017;
