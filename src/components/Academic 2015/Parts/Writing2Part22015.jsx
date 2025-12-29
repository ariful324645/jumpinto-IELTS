import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2015 from "../Pagination 2015/Writing2Pagination2015";

const Writing1Part22015 = () => {
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
              Some people think that all university students should study
              whatever they like. Others believe that they should only be
              allowed to study subjects that will be useful in the future, such
              as those related to science and technology. <br /> <br /> Discuss
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
                  University Students' Subject Choice: Personal Interest vs.
                  Future Usefulness
                </h1>
                <p className="mt-5">
                  The debate over university curriculum choices centers on
                  balancing personal fulfillment with societal needs. While some
                  advocate for unrestricted academic freedom, others prioritize
                  practical disciplines that address workforce demands. Both
                  perspectives hold merit but require careful examination. <br /> <br />
                  Proponents of free choice argue that intellectual curiosity
                  drives meaningful learning. When students pursue passions,
                  they develop deeper engagement and creativity. History's
                  greatest innovators often combined multiple disciplines -
                  Leonardo da Vinci's artistic and scientific inquiries
                  revolutionized both fields. Modern universities encouraging
                  interdisciplinary studies, like Stanford's design thinking
                  programs, demonstrate how self-directed learning fosters
                  breakthrough innovations. Additionally, forcing students into
                  disliked fields may result in high dropout rates and
                  psychological distress, wasting educational resources. <br /> <br />
                  Conversely, focusing on future-proof disciplines addresses
                  pressing global challenges. Healthcare workers trained during
                  pandemics, renewable energy engineers combating climate
                  change, and AI specialists shaping technological progress all
                  exemplify how targeted education serves collective needs.
                  Countries like Germany successfully align academic programs
                  with industry requirements through vocational universities,
                  maintaining low youth unemployment. However, this approach
                  risks creating skill imbalances - Japan's 1990s overproduction
                  of engineering graduates left many unemployed during economic
                  downturns. <br /> <br /> In my view, universities should adopt a hybrid
                  model. Core programs could focus on evolving societal needs
                  like environmental science or digital literacy, while offering
                  elective modules for personal interests. A computer science
                  student might take philosophy courses to enhance ethical
                  reasoning, combining technical skills with critical thinking.
                  This approach mirrors Singapore's recent educational reforms
                  where STEM students must complete arts modules, producing
                  graduates who innovate in technology while considering
                  humanistic implications. <br /> <br /> Ultimately, education should empower
                  individuals to thrive personally while contributing to
                  society. Structured flexibility in curriculum design offers a
                  balanced solution, preparing students not just for jobs, but
                  for adaptable, meaningful lives in our rapidly changing world.
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
      <Writing2Pagination2015></Writing2Pagination2015>
    </div>
  );
};

export default Writing1Part22015;
