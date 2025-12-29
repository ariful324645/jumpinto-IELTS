import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing3Pagination2015 from "../Pagination 2015/Writing3Pagination2015";

const Writing3Part22015 = () => {
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
              Countries are becoming more and more similar because people are
              able to buy the same products anywhere in the world. <br /> <br />{" "}
              Do you think this is a positive or negative development?
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
                  Is the Global Similarity due to Uniform Products a Positive or
                  Negative Development?
                </h1>
                <p className="mt-5">
                  The increasing uniformity of consumer goods across nations
                  presents both practical benefits and cultural risks. While
                  globalized trade enhances living standards through
                  accessibility, the erosion of regional distinctiveness
                  threatens cultural diversity in ways that demand careful
                  consideration. <br /> <br /> On the positive side, standardized global
                  products democratize access to essential innovations. Medical
                  equipment like MRI scanners, developed through international
                  collaboration, now benefit patients from Nairobi to Oslo.
                  Affordable smartphones designed in California but manufactured
                  in Vietnam have connected remote Indonesian fishing
                  communities to global weather alerts and educational
                  resources. This technological equalization helps bridge
                  developmental gaps, particularly benefiting emerging economies
                  through knowledge transfer and improved infrastructure. <br /> <br />
                  However, the cultural cost of this homogenization manifests in
                  diminishing local traditions. The replacement of Parisian
                  bookshops with multinational chain stores illustrates how
                  distinctive urban identities become diluted. When Swedish
                  furniture giant IKEA replaces handcrafted Moroccan souk
                  furniture in Middle Eastern homes, centuries-old artisan
                  skills face extinction alongside the social rituals
                  surrounding their creation. <br /> <br /> More alarmingly, dietary
                  globalization sees Brazil's tapioca-based cuisine yielding to
                  American fast food patterns, correlating with rising health
                  issues in urban populations. The solution lies in balanced
                  globalization that preserves cultural assets while embracing
                  beneficial innovations. Japan's approach offers guidance -
                  while adopting global technologies, it maintains strict
                  protections for traditional craftsmen through the "Living
                  National Treasure" system.  <br /> <br />  Similarly, Mexico's requirement for
                  international retailers to stock locally-made products
                  alongside global brands demonstrates how commercial spaces can
                  celebrate both modernity and heritage. Ultimately, the
                  standardization of goods should serve as a tool for progress
                  rather than cultural erasure. By consciously preserving
                  regional identities while sharing practical innovations,
                  nations can achieve meaningful development without becoming
                  indistinct copies of one another.
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
      <Writing3Pagination2015></Writing3Pagination2015>
    </div>
  );
};

export default Writing3Part22015;
