import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing4Pagination2013 from "../Pagination 2013/Writing4Pagination2013";

const Writing4Part22013 = () => {
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
              Every year several languages die out. Some people think that this
              is not important because life will be easier if there are fewer
              languages in the world. <br /> <br /> To what extent do you agree
              or disagree with this opinion?
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
                  The Significance of Dying Languages and the Ease of Fewer
                  Languages
                </h1>
                <p className="mt-5">
                  The gradual extinction of languages worldwide sparks debate
                  about whether this trend truly matters. While some argue that
                  fewer languages would simplify global communication, I firmly
                  disagree because language loss erodes cultural identity and
                  diminishes humanity's collective wisdom. <br /> <br /> Each language serves
                  as a living repository of cultural heritage. When a language
                  disappears, unique traditions, oral histories, and social
                  practices often vanish with it. For instance, the
                  revitalization of Māori in New Zealand has been crucial for
                  preserving indigenous storytelling methods and ancestral
                  knowledge about environmental stewardship. Similarly,
                  Australia's Aboriginal languages contain intricate
                  vocabularies describing land formations and seasonal patterns
                  that modern science is only beginning to understand. These
                  examples demonstrate how languages act as cultural DNA that
                  cannot be fully translated into dominant tongues. Moreover,
                  linguistic diversity contributes to scientific and
                  philosophical understanding. <br /> <br /> Many indigenous languages encode
                  specialized knowledge about local ecosystems. The Kallawaya
                  people of South America, through their secret language, have
                  preserved extensive medicinal plant knowledge that has
                  contributed to modern pharmacology. If their language had
                  disappeared before documentation, this valuable information
                  might have been lost forever. Languages also shape cognitive
                  processes differently - the Guugu Yimithirr language's use of
                  cardinal directions instead of relative spatial terms
                  literally changes how speakers perceive their environment.
                  Admittedly, having fewer languages could reduce communication
                  barriers in theory. <br /> <br /> However, the actual convenience gained
                  would be minimal compared to the irreversible losses. Most
                  international communication already occurs through major
                  languages like English, Spanish, or Mandarin, without
                  requiring smaller languages to disappear. Technology now
                  enables instant translation services, making multilingual
                  coexistence more practical than ever before. In conclusion,
                  the argument for accepting language extinction as beneficial
                  overlooks the profound connections between linguistic
                  diversity and human civilization. <br /> <br /> Protecting endangered
                  languages through education policies and digital preservation
                  isn't about resisting progress, but rather about maintaining
                  the rich tapestry of human thought and experience. Our world
                  becomes poorer with every language that falls silent.
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
      <Writing4Pagination2013></Writing4Pagination2013>
    </div>
  );
};

export default Writing4Part22013;
