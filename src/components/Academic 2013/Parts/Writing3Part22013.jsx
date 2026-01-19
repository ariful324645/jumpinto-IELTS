import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Writing3Pagination2013 from "../Pagination 2013/Writing3Pagination2013";

const Writing3Part22013 = () => {
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
              Some people say that the best way to improve public health is by
              increasing the number of sports facilities. Others, however, say
              that this would have little effect on public health and that other
              measures are required. <br /> <br /> Discuss both these views and
              give your own opinion.
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
                  Ways to Improve Public Health: Sports Facilities or Other
                  Measures?
                </h1>
                <p className="mt-5">
                  The relationship between sports infrastructure and population
                  wellness remains contentious. While expanding athletic
                  facilities appears logical for promoting physical activity,
                  critics argue this approach addresses symptoms rather than
                  root causes of health crises. Both perspectives warrant
                  examination through practical examples. <br /> <br /> Proponents of sports
                  facility expansion rightly emphasize accessibility's
                  psychological impact. When Oslo transformed industrial docks
                  into waterfront exercise zones with climbing walls and outdoor
                  gyms, pedestrian traffic increased 40% within two years. Such
                  visible infrastructure normalizes active lifestyles through
                  environmental design - what urban planners term "choice
                  architecture." The convenience of neighborhood basketball
                  courts or swimming pools reduces reliance on expensive gym
                  memberships, particularly benefiting lower-income groups.
                  Singapore's park connector network demonstrates how integrated
                  recreational spaces encourage incidental exercise during daily
                  commutes. <br /> <br /> However, infrastructure alone cannot counteract
                  systemic health threats. Japan's longevity correlates more
                  strongly with dietary education programs than sports centers.
                  Mandatory nutrition labeling and school lunch reforms reduced
                  childhood obesity rates by 15% over a decade. Similarly,
                  Amsterdam's cycling culture thrives not merely through bike
                  lanes but through comprehensive traffic laws prioritizing
                  cyclists and pedestrian zones. Mental health components also
                  matter - New Zealand's workplace stress reduction initiatives
                  decreased cardiovascular disease incidence by 12% among
                  participants. <br /> <br /> In my view, sports facilities form necessary but
                  insufficient components of public health strategies. Effective
                  wellness policies must combine infrastructure with behavioral
                  nudges and policy reforms. Denmark's holistic approach
                  exemplifies this synergy: bicycle highways coexist with sugar
                  taxes and corporate wellness mandates. Digital innovations
                  like Australia's fitness tracker subsidies further bridge
                  physical infrastructure and personal accountability.
                  Ultimately, creating healthy societies requires building both
                  exercise venues and supportive ecosystems that make healthy
                  choices inevitable rather than optional.
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
      <Writing3Pagination2013></Writing3Pagination2013>
    </div>
  );
};

export default Writing3Part22013;
