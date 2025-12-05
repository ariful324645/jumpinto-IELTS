import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing4Pagination2018 from "../Pagination2018/Writing4Pagination2018";

const Writing4Part22018 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing4Part22018";

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
              In spite of the advances made in agriculture, many people around
              the world still go hungry. <br /> <br /> Why is this the case?
              What can be done about this problem?
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
                  Reasons and Solutions for Global Hunger Despite Agricultural
                  Advances
                </h1>
                <p className="mt-5">
                  Despite remarkable progress in agricultural productivity over
                  the past century, global hunger persists as a paradox of
                  modern civilization. This issue stems from systemic failures
                  in distribution systems, economic inequalities, and political
                  instability rather than absolute food shortages. The primary
                  obstacle lies in unequal access to food resources. While
                  industrialized nations produce surplus crops, many developing
                  regions lack infrastructure to store and transport perishable
                  goods. <br /> <br /> In India, for instance, nearly 40% of harvested fruits
                  and vegetables rot before reaching markets due to inadequate
                  cold storage facilities. Meanwhile, economic disparities
                  prevent vulnerable populations from purchasing available food.
                  A family in rural Kenya might live near maize fields yet
                  remain food-insecure because they cannot afford market prices.
                  Political conflicts exacerbate these challenges, as seen in
                  Yemen where war has disrupted food supply chains despite
                  international aid efforts. <br /> <br /> Addressing this crisis requires
                  coordinated global action. Governments and international
                  organizations should invest in rural infrastructure,
                  particularly in climate-resilient storage systems and
                  transportation networks. The success of Brazil's school
                  feeding program, which connects local farmers to educational
                  institutions, demonstrates how supply chain improvements can
                  benefit both producers and consumers. Simultaneously,
                  wealthier nations must reform trade policies that disadvantage
                  developing economies through unfair subsidies and export
                  restrictions. Reducing food waste presents another critical
                  opportunity - European nations like France have shown that
                  supermarket donation mandates and consumer education can
                  dramatically decrease edible food discards. <br /> <br /> Ultimately,
                  solving world hunger demands recognizing it as a political and
                  logistical challenge rather than purely agricultural. By
                  prioritizing equitable distribution over maximum production,
                  humanity could realistically eliminate starvation within our
                  lifetime. This requires sustained commitment to infrastructure
                  development, fair trade practices, and conflict resolution -
                  challenges that are surmountable with coordinated
                  international effort.
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
      <Writing4Pagination2018></Writing4Pagination2018>
    </div>
  );
};

export default Writing4Part22018;
