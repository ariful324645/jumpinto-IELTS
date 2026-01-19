import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Writing1Pagination2013 from "../Pagination 2013/Writing1Pagination2013";

const Writing1Part22013 = () => {
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
              Some experts believe that it is better for children to begin
              learning a foreign language at primary school rather than
              secondary school. <br /> <br /> Do the advantages of this outweigh
              the disadvantages?
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
                  Learning Foreign Languages at Primary vs Secondary School:
                  Advantages vs Disadvantages
                </h1>
                <p className="mt-5">
                  Introducing foreign language education at primary level
                  presents both opportunities and challenges. While early
                  exposure may create academic pressures, the cognitive and
                  cultural benefits for young learners appear more significant
                  when supported by proper implementation. <br /> <br /> The primary advantage
                  lies in children's natural language acquisition abilities.
                  Between ages 5-10, the brain demonstrates remarkable
                  plasticity in phonetic recognition and pattern detection.
                  Swedish primary schools' successful English programs
                  demonstrate how young learners effortlessly adopt native-like
                  pronunciation through interactive games and songs - an
                  advantage rarely replicated in teenage classrooms. Early
                  bilingual exposure also enhances cognitive flexibility, as
                  shown by Canadian immersion students outperforming monolingual
                  peers in problem-solving tasks. <br /> <br /> These neurological benefits
                  create lifelong learning advantages that secondary school
                  starters might never fully recover. However, valid concerns
                  exist regarding educational priorities. In developing nations
                  like India, where primary schools often struggle with basic
                  literacy instruction, adding foreign languages might dilute
                  core competencies. The 2018 Kerala education survey revealed
                  that 40% of primary teachers felt overwhelmed when
                  implementing English alongside regional language instruction. <br /> <br />
                  There's also the risk of creating linguistic confusion,
                  particularly when the foreign language's alphabet differs
                  significantly from the native script, as observed in Japanese
                  schools teaching English romanization alongside kanji
                  characters. When properly resourced, early language programs
                  yield greater benefits than drawbacks. Germany's modular
                  approach demonstrates this balance effectively - children
                  learn through play-based methods for 20-minute daily sessions,
                  avoiding academic overload while building foundational skills.
                  Such measured implementation prevents curriculum crowding
                  while harnessing children's peak learning potential. <br /> <br /> The
                  cultural awareness gained through early language exposure, as
                  seen in Dutch children's understanding of German media,
                  ultimately outweighs temporary logistical challenges. In
                  conclusion, while requiring careful planning to prevent
                  educational strain, initiating language learning during
                  primary years leverages critical developmental windows that
                  secondary education cannot replicate. The lasting cognitive
                  benefits and intercultural competence justify prioritizing
                  this educational approach.
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
      <Writing1Pagination2013></Writing1Pagination2013>
    </div>
  );
};

export default Writing1Part22013;
