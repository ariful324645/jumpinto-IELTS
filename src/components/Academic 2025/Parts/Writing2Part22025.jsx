import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2025 from "../Pagination 2025/Writing2Pagination2025";

const Writing2Part22025 = () => {
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
              In many countries, primary and secondary schools close for two
              months or more in the summer holidays. What is the value of long
              school holidays? <br /> <br /> What are the arguments in favour of
              shorter school holidays?
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
                  The Value of Long and Short School Holidays
                </h1>
                <p className="mt-5">
                  Long summer holidays in primary and secondary education hold
                  significant value in fostering holistic development, yet they
                  also spark debates about academic continuity. Understanding
                  both perspectives is crucial for balancing educational goals
                  with student well-being. <br /> <br />The primary value of extended
                  holidays lies in promoting physical and mental rejuvenation.
                  Students and teachers alike benefit from prolonged breaks that
                  allow them to escape the pressures of daily curricula. For
                  instance, children can use this time to explore non-academic
                  interests - such as joining art workshops, sports camps, or
                  volunteering - that nurture creativity and social skills,
                  which classroom settings alone cannot fully develop. Long
                  holidays also strengthen family bonds, as families often use
                  this period for travel or shared activities, enhancing
                  emotional connections. Moreover, these breaks provide
                  opportunities for experiential learning, like visiting museums
                  or engaging in nature-based projects, which complement
                  classroom education.​  <br /> <br />On the other hand, arguments in favor of
                  shorter holidays emphasize maintaining academic momentum.
                  Extended breaks can lead to "learning loss," where students
                  forget up to 30% of previously acquired knowledge,
                  particularly in math and language skills, according to
                  educational studies. Shorter holidays would minimize such
                  cognitive regression, ensuring a more consistent learning
                  curve. This is especially important for students from
                  disadvantaged backgrounds who may lack access to structured
                  holiday programs, exacerbating educational inequalities during
                  long breaks. Additionally, compressed holidays allow schools
                  to offer more intensive instruction or remedial classes,
                  addressing gaps in student understanding. <br /> <br /> In conclusion, while
                  long holidays are vital for holistic growth and personal
                  connections, shorter holidays address academic retention and
                  equity concerns. Educational systems should consider adaptive
                  approaches - perhaps modular breaks throughout the year - to
                  balance rest and rigorous learning, ensuring students thrive
                  both academically and personally.
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
      <Writing2Pagination2025></Writing2Pagination2025>
    </div>
  );
};

export default Writing2Part22025;
