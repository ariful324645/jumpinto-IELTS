import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






import Writing1Pagination2007 from "../Pagination 2007/Writing1Pagination2007";

const Writing1Part22007 = () => {
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
              Today, the high sales of popular consumer goods reflect the power
              of advertising and not the real needs of the society in which they
              are sold. <br /> <br /> To what extent do you agree or disagree?
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
                  High Sales of Consumer Goods: Advertising Power or Real Social
                  Needs?
                </h1>
                <p className="mt-5">
                  The influence of advertising on consumer behavior has become a
                  cornerstone of modern capitalism. While I acknowledge that
                  marketing strategies significantly drive product sales, I
                  disagree with the notion that consumer needs play a negligible
                  role in purchasing decisions. This complex relationship
                  between promotion and necessity requires balanced examination. <br /> <br />
                  Undeniably, advertising possesses transformative power in
                  shaping market trends. Psychological techniques like emotional
                  storytelling and social proof often create artificial demand
                  for non-essential items. The global success of energy drink
                  brands exemplifies this phenomenon. Through aggressive
                  campaigns associating their products with extreme sports and
                  youthful rebellion, companies have convinced millions to
                  regularly consume beverages containing potentially harmful
                  caffeine levels. <br /> <br /> Similarly, fast fashion retailers like Zara
                  sustain high sales through relentless advertising that equates
                  frequent wardrobe changes with social status, despite growing
                  environmental concerns about textile waste. However,
                  dismissing all popular products as mere advertising triumphs
                  overlooks genuine societal needs. The COVID-19 pandemic
                  demonstrated how essential items naturally dominate markets
                  during crises. When face masks and sanitizers became
                  bestsellers globally, this reflected urgent health
                  requirements rather than marketing influence. <br /> <br /> Pharmaceutical
                  companies like Pfizer achieve record sales for vaccines and
                  medications because they address fundamental human needs for
                  survival and well-being, not through advertising campaigns.
                  The reality lies in the coexistence of both factors.
                  Smartphone adoption illustrates this balance. While Apple's
                  iconic "Think Different" campaigns undoubtedly boosted iPhone
                  popularity, the devices ultimately succeeded by fulfilling
                  evolving communication needs in our digital era. <br /> <br /> Advertising
                  might initiate consumer interest, but sustained sales require
                  authentic value. Modern markets operate through this dual
                  mechanism where promotional strategies amplify existing needs
                  while occasionally inventing new ones. Responsible consumption
                  emerges when individuals critically evaluate whether products
                  serve genuine purposes or manufactured desires.
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

      <Writing1Pagination2007></Writing1Pagination2007>
    </div>
  );
};

export default Writing1Part22007;
