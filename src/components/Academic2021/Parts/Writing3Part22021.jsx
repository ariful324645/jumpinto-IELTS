import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing3Pagination2021 from "../Pagination 2021/Writing3Pagination2021";

const Writing2Part22021 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22019";

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
              Many manufactured food and drink products contain high levels of
              sugar, which causes many health problems. Sugary products should
              be made more expensive to encourage people to consume less sugar.{" "}
              <br /> <br />
              Do you agree or disagree?
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
                  Should Sugary Products Be Made More Expensive to Reduce Sugar
                  Consumption?
                </h1>
                <p className="mt-5">
                  I agree that increasing the price of sugary products could
                  help reduce sugar consumption, but this measure alone would be
                  insufficient without complementary strategies. While economic
                  disincentives have proven effective in modifying consumer
                  behavior historically, their success in combating sugar
                  addiction requires careful implementation and public
                  education. Higher prices naturally discourage purchases,
                  particularly among price-sensitive groups. The tobacco control
                  model demonstrates this principle effectively - Australia's
                  25% cigarette tax increase in 2013 resulted in 16% fewer adult
                  smokers within two years. <br /> <br /> Similarly, Mexico's 10% tax on
                  sugary drinks in 2014 reduced sales by 12% in the first year,
                  with the steepest declines occurring in low-income communities
                  where diabetes rates are highest. These examples suggest that
                  financial disincentives could help break habitual sugar
                  consumption patterns, especially when targeting products with
                  no nutritional value like soft drinks and candy bars. However,
                  relying solely on price hikes risks creating unintended
                  consequences. Wealthier consumers might continue purchasing
                  sugary items regardless of cost, while manufacturers could
                  replace sugar with cheaper artificial sweeteners that pose
                  different health risks. <br /> <br /> A 2019 UK study revealed that 60% of
                  "reduced-sugar" snacks contained chemical substitutes linked
                  to metabolic disorders. Moreover, sudden price increases might
                  disproportionately affect budget-conscious families who rely
                  on affordable processed foods. Therefore, this strategy should
                  be combined with mandatory nutrition education in schools and
                  clearer food labeling systems. Japan's "Shokuiku" food
                  education law, implemented in 2005, successfully reduced
                  national sugar intake by 15% through classroom instruction and
                  standardized supermarket labeling, without requiring price
                  adjustments. <br /> <br /> Ultimately, while pricing mechanisms can initiate
                  behavioral change, lasting solutions require comprehensive
                  approaches. Governments should implement sugar taxes gradually
                  while simultaneously funding public health campaigns and
                  regulating food industry practices. This balanced strategy
                  would empower consumers to make informed choices rather than
                  simply forcing them to abandon affordable options.
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
      <Writing3Pagination2021></Writing3Pagination2021>
    </div>
  );
};

export default Writing2Part22021;
