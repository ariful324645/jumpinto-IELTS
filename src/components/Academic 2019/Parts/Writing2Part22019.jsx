import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing2Pagination2019 from "../Pagination/Writing2Pagination2019";

const Writing2Part22019 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing2Part22019";

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
                  The Main Environmental Problem: Loss of Species or Others?
                </h1>
                <p className="mt-5">
                  The accelerating disappearance of species and broader
                  ecological crises both represent critical challenges, yet
                  their interconnected nature complicates simplistic
                  comparisons. Proponents of species conservation rightly
                  emphasize that each extinction triggers unpredictable chain
                  reactions. The near-disappearance of bees in parts of Europe
                  demonstrated how pollinator loss could threaten food security,
                  given that 75% of crops require animal pollination. Similarly,
                  coral reef collapses in the Caribbean have not only erased
                  marine habitats but destabilized coastal economies reliant on
                  fishing and tourism. These cases prove that preserving
                  biodiversity isn't merely sentimental but pragmatically
                  safeguards human systems. <br /> <br /> However, prioritizing climate change
                  as the paramount issue appears equally justified given its
                  omnipresent impacts. Melting permafrost in Siberia releasing
                  methane, intensified hurricanes in the Gulf of Mexico, and
                  prolonged droughts turning Mediterranean farmlands barren all
                  illustrate how climate disruption transcends ecological niches
                  to affect entire civilizations. Unlike localized species loss,
                  atmospheric changes create global domino effects - a single
                  coal plant's emissions might simultaneously bleach Australian
                  reefs and flood Bangladeshi deltas. <br /> <br /> Rather than competing for
                  priority, these crises demand integrated solutions. Rewilding
                  projects in Costa Rica show how restoring forests can both
                  protect endemic species and sequester carbon. Kenya's adoption
                  of solar-powered water pumps reduces fossil fuel dependence
                  while preventing habitat destruction from energy
                  infrastructure. This synergy suggests that framing
                  environmental issues as either/or choices creates false
                  dichotomies. Effective policies must address biodiversity
                  collapse and climate change as facets of the same problem:
                  humanity's unsustainable resource consumption. Only through
                  systemic changes in energy, agriculture, and urban planning
                  can we mitigate both crises simultaneously.
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
      <Writing2Pagination2019></Writing2Pagination2019>
    </div>
  );
};

export default Writing2Part22019;
