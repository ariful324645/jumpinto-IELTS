import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";








import Writing3Pagination2007 from "../Pagination 2007/Writing3Pagination2007";

const Writing3Part22007 = () => {
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
              Some people believe that visitors to other countries should follow
              local customs and behaviour. Others disagree and think that the
              host country should welcome cultural differences. <br /> <br />{" "}
              Discuss both these views and give your own opinion.
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
                  Follow Local Customs or Welcome Cultural Differences?
                </h1>
                <p className="mt-5">
                  The debate over whether travelers should adapt to local norms
                  or nations should embrace foreign customs reflects deeper
                  questions about cultural exchange. While both perspectives
                  have merit, practical solutions require balancing mutual
                  respect with open-mindedness. <br /> <br /> Proponents of cultural
                  adaptation argue that respecting traditions maintains social
                  harmony. Many societies have deeply rooted practices tied to
                  their history and values. In Japan, for instance, bowing
                  serves as more than greeting - it embodies respect hierarchy
                  and social harmony. Visitors ignoring this might
                  unintentionally offend locals. Similarly, conservative Middle
                  Eastern regions expect modest clothing to honor religious
                  principles. When tourists disregard these norms, it often
                  creates tension rather than fostering understanding. <br /> <br />
                  Compliance with local etiquette essentially functions as
                  social currency, enabling smoother interactions. Conversely,
                  advocates for cultural acceptance highlight how diversity
                  enriches societies. Global cities like London and New York
                  thrive through cultural fusion, where immigrant communities
                  preserve traditions while contributing to urban life. The
                  popularity of Indian yoga studios in Europe or Mexican cuisine
                  in Southeast Asia demonstrates how foreign elements can become
                  local assets. Moreover, expecting absolute conformity risks
                  promoting cultural imperialism - the notion that dominant
                  cultures should override others. True hospitality might
                  involve creating spaces where visitors feel their identities
                  are acknowledged, not suppressed. <br /> <br /> In my view, cultural
                  exchange works best through reciprocal adaptation. Tourists
                  should make reasonable efforts to learn basic customs, while
                  hosts could provide clear guidance without harsh judgment.
                  India offers an instructive example: many temples require
                  removing footwear and avoiding leather items, but staff
                  politely remind unaware visitors rather than shaming them. <br /> <br />
                  Simultaneously, Indian restaurants abroad often adjust spice
                  levels to suit foreign palates while maintaining authentic
                  flavors. This two-way adjustment respects core traditions
                  while allowing gradual cultural blending. Ultimately, cultural
                  boundaries need not be rigid walls but semi-permeable
                  membranes. When travelers and hosts meet halfway, differences
                  become bridges rather than barriers.
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
      <Writing3Pagination2007></Writing3Pagination2007>
    </div>
  );
};

export default Writing3Part22007;
