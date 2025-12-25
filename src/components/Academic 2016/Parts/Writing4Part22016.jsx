import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing4Pagination2016 from "../Pagination2016/Writing4Pagination2016";

const Writing4Part22016 = () => {
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
              Some people say that the only reason for learning a foreign
              language is in order to travel to or work in a foreign country.
              Others say that these are not the only reasons why someone should
              learn a foreign language. <br /> <br /> Discuss both these views
              and give your own opinion.
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
                  Reasons for Learning a Foreign Language: Travel/Work or More?
                </h1>
                <p className="mt-5">
                  The debate around foreign language acquisition often centers
                  on practical versus intrinsic motivations. While career
                  prospects and travel convenience remain valid reasons for
                  learning new languages, limiting their value to these purposes
                  overlooks broader cognitive and cultural benefits. Proponents
                  of utilitarian language learning rightly emphasize its
                  professional advantages. Multinational corporations
                  increasingly prioritize bilingual employees, as seen in
                  European Union institutions where staff members routinely use
                  three working languages. Similarly, medical professionals in
                  global health organizations like Médecins Sans Frontières
                  require local language skills to deliver effective care.{" "}
                  <br /> <br />
                  Tourism industries also demonstrate this practicality -
                  Japanese hospitality workers learning Mandarin to accommodate
                  visitors exemplify how language skills directly enhance
                  service quality and economic opportunities. However, reducing
                  language study to mere functionality ignores its
                  transformative personal impacts. Neuroscience reveals that
                  bilingual individuals develop stronger neural plasticity,
                  delaying age-related cognitive decline. <br /> <br /> The
                  mental exercise of switching between grammatical structures
                  enhances multitasking abilities, benefiting learners
                  regardless of their travel plans. Culturally, language mastery
                  grants access to literary treasures in their original form -
                  reading Gabriel García Márquez in Spanish or Haruki Murakami
                  in Japanese offers nuances lost in translation. Moreover,
                  language learning fosters empathy by exposing students to
                  alternative worldviews, as demonstrated by Scandinavian
                  schools incorporating Arabic studies to combat cultural
                  prejudice. <br /> <br />
                  From my perspective, while vocational motives provide initial
                  motivation, sustained language engagement requires deeper
                  rewards. Consider how Korean pop culture enthusiasts worldwide
                  voluntarily study Hangul to better understand song lyrics and
                  variety shows. This organic interest often leads to unexpected
                  opportunities, proving that practical benefits and personal
                  growth aren't mutually exclusive. Governments recognizing this
                  duality develop balanced language policies - Canada's
                  bilingual education system cultivates both workforce
                  competitiveness and national unity through French-English
                  immersion. Ultimately, viewing languages solely as career
                  tools underestimates their role in shaping adaptable minds and
                  global citizens. Whether through enhanced employability,
                  cultural literacy, or cognitive resilience, multilingualism
                  offers compound benefits that transcend geographical
                  boundaries.
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
   <Writing4Pagination2016></Writing4Pagination2016>
    </div>
  );
};

export default Writing4Part22016;
