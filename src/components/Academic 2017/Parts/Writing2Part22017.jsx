import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2017 from "../Pagination2017/Writing2Pagination2017";

const Writing2Part22017 = () => {
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
              At the present time, the population of some countries includes a
              relatively large number of young adults, compared with the number
              of older people. <br /> <br /> Do the advantages of this situation
              outweigh the disadvantages?
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
                  Young Adults vs. Older People: Advantages Outweigh
                  Disadvantages?
                </h1>
                <p className="mt-5">
                  The demographic structure favoring younger populations, as
                  seen in nations like India and Nigeria, presents both
                  opportunities and challenges for national development. While
                  this situation brings economic vitality, it also tests social
                  systems' capacity to manage youthful aspirations. <br /> <br /> A youthful
                  population primarily benefits economic growth through
                  workforce expansion. Countries with median ages below 25, such
                  as Kenya, demonstrate how abundant labor attracts
                  manufacturing investments. Vietnam's electronics industry
                  boom, fueled by its young workforce supplying companies like
                  Samsung, illustrates this advantage. Moreover, younger
                  demographics drive technological adoption, with Nigerian
                  fintech startups like Flutterwave revolutionizing digital
                  payments across Africa. This demographic dividend also fosters
                  cultural innovation, as seen in South Korea's global
                  entertainment influence powered by its creative youth. <br /> <br />
                  However, disproportionate youth populations create systemic
                  pressures. Educational infrastructure often struggles to meet
                  demand, exemplified by overcrowded universities in Egypt where
                  lecture halls frequently accommodate triple their intended
                  capacity. Job market saturation remains critical, with South
                  Africa's 63% youth unemployment demonstrating the risks of
                  unabsorbed labor forces. Urbanization challenges emerge
                  concurrently, as observed in Manila's traffic gridlock and
                  housing shortages caused by rural youth migration. <br /> <br /> These
                  factors combined may fuel social unrest, similar to the "Arab
                  Spring" movements partially rooted in youth unemployment. The
                  advantages generally outweigh disadvantages when governments
                  implement balanced policies. Indonesia's vocational training
                  programs, preparing youth for renewable energy sectors, show
                  how strategic education investments can transform demographic
                  potential into economic assets. Conversely, nations failing to
                  create youth opportunities, like certain Sahel region
                  countries facing radicalization issues, demonstrate the
                  critical need for proactive measures. <br /> <br /> Sustainable advantage
                  requires matching workforce growth with skills development and
                  job creation. Ultimately, youthful populations offer nations a
                  dynamic growth engine, but this potential converts to
                  prosperity only through educational investment, economic
                  planning, and social inclusion strategies. The demographic
                  window becomes either an opportunity or crisis based on policy
                  responses.
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
      <Writing2Pagination2017></Writing2Pagination2017>
    </div>
  );
};

export default Writing2Part22017;
