import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing1Pagination2018 from "../Pagination2018/Writing1Pagination2018";

const Writing1Part22018 = () => {
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
              Living in a country where you have to speak a foreign language can
              cause serious social problems, as well as practical problems.{" "}
              <br /> <br /> To what extent do you agree or disagree with this
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
                  Problems of Living in a Foreign-language Country
                </h1>
                <p className="mt-5">
                  While adapting to life in a foreign language environment
                  undoubtedly presents challenges, I partially agree that these
                  difficulties amount to "serious" social and practical
                  problems. The severity largely depends on individual
                  circumstances and available support systems, though
                  fundamental communication barriers inevitably create friction. <br /> <br />
                  Social integration often suffers when language skills are
                  limited. Basic interactions like grocery shopping or using
                  public transport become manageable with time, but forming
                  meaningful relationships requires nuanced communication. A
                  Ukrainian refugee in Germany might master essential phrases
                  yet struggle to discuss personal values or humor with locals,
                  leading to isolation. This emotional disconnect can foster
                  misunderstandings, particularly when cultural differences
                  compound language gaps. For instance, direct communication
                  styles in some countries might be misinterpreted as rudeness
                  by non-native speakers accustomed to indirect expressions. <br /> <br />
                  Practical challenges emerge most acutely in high-stakes
                  situations. Medical consultations, legal procedures, or
                  workplace safety protocols demand precise language
                  comprehension. A Spanish-speaking cleaner in Dubai might
                  misinterpret chemical handling instructions, risking health
                  hazards. Financial literacy gaps could lead to exploitation in
                  rental agreements or loan contracts. Even mundane tasks like
                  reading medication labels or emergency notices become
                  potential hazards without language proficiency. <br /> <br /> However,
                  modern societies increasingly mitigate these issues through
                  technology and community support. Translation apps now handle
                  real-time conversations, while multinational companies provide
                  workplace language training. Cities like Toronto demonstrate
                  how official multilingual services and cultural sensitivity
                  training in public institutions reduce practical barriers.
                  Moreover, language limitations sometimes foster unexpected
                  social bonds through non-verbal communication and mutual
                  patience. <br /> <br /> International students often form friendships
                  through shared efforts to navigate local markets or
                  transportation systems. Ultimately, while language barriers
                  create genuine difficulties, labeling them universally
                  "serious" overlooks adaptive human capacity and evolving
                  societal support mechanisms. The problems are significant but
                  rarely insurmountable when individuals access available
                  resources and communities demonstrate inclusivity.
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
      <Writing1Pagination2018></Writing1Pagination2018>
    </div>
  );
};

export default Writing1Part22018;
