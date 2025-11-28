import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing3Pagination2020 from "../../Pagination/Writing2Pagination/Writing3Pagination2020";

const Writing2Part22020 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing2Part22020";

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
              In the future, nobody will buy printed newspapers or books because
              they will be able to read everything they want online without
              paying. <br /> <br /> To what extent do you agree or disagree with
              this statement?
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
                  Will Printed Newspapers and Books Disappear Due to Free Online
                  Reading?
                </h1>
                <p className="mt-5">
                  While digital reading platforms continue gaining popularity, I
                  disagree with the assertion that printed materials will
                  completely disappear from consumer markets. Physical books and
                  newspapers will likely retain niche appeal despite the
                  dominance of online content, particularly for their cultural
                  significance and sensory value.
                  <br />
                  <br />
                  Undeniably, online accessibility has transformed reading
                  habits. Most news consumers now prefer real-time updates
                  through apps like Google News over waiting for morning papers.
                  Educational institutions increasingly adopt e-books to reduce
                  costs and backpack weight, as seen in Japan's digital textbook
                  initiative across 200 schools. Environmental concerns also
                  drive this shift, with many European publishers committing to
                  carbon-neutral digital operations by 2030.
                  <br />
                  <br />
                  However, printed materials maintain irreplaceable qualities.
                  Limited-edition books persist as cultural artifacts - consider
                  the enduring demand for Tolkien's "Lord of the Rings"
                  collector's editions, which appreciate in value annually.
                  Print newspapers retain ceremonial importance in certain
                  contexts; British households traditionally keep Sunday papers
                  for relaxed weekend reading, while New York Times' special
                  anniversary prints become family heirlooms. Neuroscientific
                  studies from Cambridge University further confirm that
                  physical reading enhances information retention through
                  tactile engagement.
                  <br />
                  <br />
                  Moreover, demographic factors ensure print's survival. Elderly
                  populations in countries like Italy and Portugal show strong
                  preference for familiar newspaper formats, with 68% resisting
                  digital transition according to EU media reports. Independent
                  bookstores in cities like Paris and Buenos Aires thrive by
                  curating rare prints and hosting author events, creating
                  communities around physical books.
                  <br />
                  <br />
                  In conclusion, while digital platforms will dominate practical
                  reading needs, printed materials will endure as cultural
                  symbols and luxury items. Their survival mirrors how vinyl
                  records coexist with streaming services - valued not for
                  convenience, but for the irreplicable experiences they provide
                  discerning users.
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
      <Writing3Pagination2020></Writing3Pagination2020>
    </div>
  );
};

export default Writing2Part22020;
