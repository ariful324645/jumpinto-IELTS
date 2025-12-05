import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing3Pagination2018 from "../Pagination2018/Writing3Pagination2018";

const Writing3Part22018 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing3Part22018";

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
              Some people say History is one of the most important school
              subjects. Other people think that, in today's world, subjects like
              Science and Technology are more important than History. <br />{" "}
              <br /> Discuss both these views and give your own opinion.
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
                  History vs. Science and Technology in School Subjects
                </h1>
                <p className="mt-5">
                  The debate over educational priorities reflects our evolving
                  societal values. While some argue that history remains
                  fundamental to holistic learning, others prioritize STEM
                  subjects as drivers of contemporary progress. Both
                  perspectives contain valid arguments that merit careful
                  examination. Proponents of history's significance rightly
                  emphasize its role in shaping critical thinking and cultural
                  awareness. By studying past civilizations, students gain
                  perspective on current geopolitical landscapes and social
                  structures. <br /> <br /> For instance, understanding the Roman Empire's
                  administrative systems helps explain modern European legal
                  frameworks. Historical analysis also develops pattern
                  recognition skills crucial for decision-making - the 2008
                  financial crisis repeated many mistakes from the 1920s
                  economic policies, demonstrating how historical illiteracy can
                  have real-world consequences. Furthermore, examining events
                  like the civil rights movement fosters empathy and ethical
                  reasoning, qualities increasingly valuable in our
                  interconnected world. <br /> <br /> Conversely, advocates for science and
                  technology education highlight their immediate practical
                  applications. In an era defined by AI development and climate
                  challenges, STEM skills directly address pressing global
                  issues. Countries like South Korea and Germany have
                  strengthened their economies through focused investments in
                  technological education, creating skilled workforces for
                  industries ranging from renewable energy to biomedical
                  engineering. The COVID-19 pandemic particularly illustrated
                  this, where vaccine development relied entirely on advanced
                  scientific knowledge. Moreover, digital literacy has become a
                  survival skill, with basic coding and data analysis now
                  essential across numerous professions. <br /> <br /> In my view, a balanced
                  curriculum serves students best. While technological
                  proficiency ensures economic competitiveness, historical
                  understanding prevents societies from becoming culturally
                  rootless. Singapore's education model demonstrates this
                  equilibrium effectively, combining rigorous STEM programs with
                  mandatory national history courses. Schools should integrate
                  interdisciplinary approaches - for example, studying the
                  Industrial Revolution could simultaneously cover historical
                  timelines, sociological impacts, and the scientific principles
                  behind steam engines. This synthesis prepares students to
                  address complex modern challenges without losing touch with
                  humanity's collective wisdom. Ultimately, education shouldn't
                  force choices between past and future, but rather build
                  bridges between them.
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
      <Writing3Pagination2018></Writing3Pagination2018>
    </div>
  );
};

export default Writing3Part22018;
