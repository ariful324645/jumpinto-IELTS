import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing2Pagination2020 from "../../Pagination/writing1Pagination/Writing2Pagination2020";
import Writing4Pagination2020 from "../../Pagination/Writing3Pagination/Writing4Pagination2020";

const Writing3Part22020 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing3Part22020";

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
              Some people say that advertising is extremely successful at
              persuading us to buy things. Other people think that advertising
              is so common that we no longer pay attention to it. <br /> <br />{" "}
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
                  Advertising: Persuasive or Ignored?
                </h1>
                <p className="mt-5">
                  The debate around advertising's effectiveness hinges on
                  whether its persuasive power outweighs public desensitization.
                  While some argue that ads actively shape consumer behavior,
                  others believe their omnipresence renders them invisible. Both
                  perspectives contain elements of truth, depending on context
                  and audience.
                  <br />
                  <br />
                  Proponents of advertising's influence rightly point to its
                  emotional engineering. Global brands like Coca-Cola have spent
                  decades associating their products with universal themes of
                  happiness and togetherness through seasonal campaigns. Apple's
                  minimalist product reveals generate immediate consumer
                  anticipation, demonstrating how targeted messaging can create
                  cultural moments. These examples show advertising's capacity
                  to embed products into social narratives rather than merely
                  promoting features.
                  <br />
                  <br />
                  However, the counterargument gains validity when considering
                  modern media saturation. YouTube viewers instinctively reach
                  for the "skip ad" button, while streaming service subscribers
                  pay premiums to avoid commercials. The proliferation of
                  ad-blockers across 63% of European internet users (Statista
                  2023) suggests many actively resist promotional content. This
                  behavioral shift implies that generic advertising often fails
                  to penetrate public consciousness unless exceptionally
                  crafted.
                  <br />
                  <br />
                  My view aligns with a middle ground: advertising succeeds
                  selectively through audience segmentation. Children's
                  programming remains a potent advertising channel, with cereal
                  companies using cartoon mascots to drive pester power - a
                  tactic so effective that Norway banned such ads. Conversely,
                  adult consumers increasingly adopt defensive behaviors;
                  smartphone shoppers typically compare online reviews despite
                  seeing flashy commercials.
                  <br />
                  <br />
                  Ultimately, advertising functions like rainfall - its impact
                  depends on the soil it touches. While repetitive campaigns
                  drown in the noise of modern life, strategically targeted
                  messages continue to harvest consumer attention. The
                  industry's future lies not in blanket coverage but in
                  understanding micro-audiences, blending psychological insight
                  with respect for consumer autonomy.
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
      <Writing4Pagination2020></Writing4Pagination2020>
    </div>
  );
};

export default Writing3Part22020;
