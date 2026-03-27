import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Writing3Pagination2025 from "../Pagination 2025/Writing3Pagination2025";

const Writing3Part22025 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22019";

  // Load mark from localStorage if it exists
  const [mark, setMark] = useState(
    Number(localStorage.getItem(storageKey)) || null,
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
              Some people have decided to reduce the number of times they fly
              every year or to stop flying altogether. <br /> <br /> Do you
              think the environmental benefits of this development outweigh the
              disadvantages for individuals and businesses?
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
                  Environmental Benefits vs. Disadvantages of Reducing Flying
                </h1>
                <p className="mt-5">
                  In an era of growing climate awareness, many people are
                  choosing to fly less or stop altogether, aiming to reduce
                  environmental harm. While this brings challenges for
                  individuals and businesses, its environmental benefits
                  ultimately outweigh the drawbacks. Aviation is widely
                  recognized as a significant contributor to global carbon
                  emissions, with its impact growing as air travel becomes more
                  popular. Each flight releases large amounts of greenhouse
                  gases, which accelerate climate change. By cutting down on
                  flying, people directly reduce their own contribution to this
                  problem. For instance, long-distance flights, even with a
                  single passenger, generate far more emissions than other
                  transport options. <br /> <br /> Choosing trains for shorter trips or online
                  meetings instead of in-person ones can make a real difference
                  in lowering one's environmental footprint. Such choices
                  support global efforts to tackle climate change, which
                  requires reducing high-carbon activities. Critics say less
                  flying limits personal mobility and hurts businesses,
                  especially those needing international links. <br /> <br /> Professionals
                  might miss face-to-face meetings, and tourism industries could
                  lose income. But alternatives are improving: high-speed trains
                  in many regions offer good substitutes for short flights, and
                  digital tools make virtual teamwork easier. More importantly,
                  the costs of ignoring climate change - including extreme
                  weather disasters, crop failures, and collapsed ecosystems -
                  dwarf the short-term economic and logistical costs of
                  adjusting to less flying. <br /> <br /> In the end, reducing flights is more
                  than a lifestyle tweak - it's a vital step in confronting our
                  planet's most pressing threat. Short-term inconveniences for
                  individuals and businesses pale beside the urgency of securing
                  a sustainable future. Choosing the environment over ease isn't
                  just a duty; it's an act of hope. It trades momentary
                  convenience for the enduring promise of a world where life
                  thrives, not just survives.
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
      <Writing3Pagination2025></Writing3Pagination2025>
    </div>
  );
};

export default Writing3Part22025;
