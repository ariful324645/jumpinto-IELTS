import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing2Pagination2018 from "../Pagination2018/Writing2Pagination2018";

const Writing2Part22018 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing2Part22018";

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
              Some people believe that nowadays we have too many choices. <br />{" "}
              <br /> To what extent do you agree or disagree with this
              statement?
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
                  Do We Have Too Many Choices Nowadays?
                </h1>
                <p className="mt-5">
                  The notion that modern society offers excessive choices
                  warrants careful examination. While I acknowledge that
                  decision-making has become more complex in consumer-driven
                  economies, I believe the core issue lies not in the quantity
                  of options but in our ability to navigate them effectively.
                  This essay will demonstrate how choice abundance becomes
                  problematic primarily when combined with inadequate
                  decision-making skills. <br /> <br /> Technological advancements have
                  undoubtedly expanded our selection spectrum. Streaming
                  platforms like Netflix host thousands of titles, while
                  e-commerce giants such as Amazon present countless product
                  variations. This proliferation often leads to decision
                  fatigue, where consumers spend 40% longer choosing toothpaste
                  from 50 varieties than when selecting from 5 options, as
                  demonstrated in a Columbia University behavioral study. The
                  paradox emerges when increased options reduce satisfaction, as
                  buyers frequently second-guess their selections, wondering if
                  a better alternative exists. <br /> <br /> Educational and career pathways
                  exemplify another dimension of this challenge. Where previous
                  generations might have followed linear vocational routes,
                  modern students confront interdisciplinary programs and hybrid
                  professions. A European university freshman today chooses from
                  120+ course combinations compared to 20 options available in
                  the 1980s. While this diversity accommodates individual
                  talents, it overwhelms many adolescents lacking career
                  guidance systems. The Swedish education model addresses this
                  effectively through mandatory mentorship programs, proving
                  that structural support can transform choice overload into
                  empowerment. Critically, the value of choice abundance
                  manifests through minority needs fulfillment. Gluten-free
                  consumers in the 1990s struggled to find suitable products,
                  whereas contemporary supermarkets dedicate entire aisles to
                  dietary alternatives. <br /> <br /> This inclusivity justifies the expanded
                  marketplace, suggesting that the problem resides not in choice
                  quantity but in consumers' ability to filter options through
                  self-awareness. Those who understand personal priorities
                  navigate options efficiently, while others drown in
                  indecision. <br /> <br /> Ultimately, the solution lies not in reducing
                  choices but in cultivating decision-making literacy through
                  education systems and consumer guidance programs. When
                  individuals develop clarity about their values and needs,
                  choice abundance transforms from a burden into a liberation
                  tool. Societies must therefore invest in critical thinking
                  education rather than lamenting the wealth of opportunities
                  available.
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
      <Writing2Pagination2018></Writing2Pagination2018>
    </div>
  );
};

export default Writing2Part22018;
