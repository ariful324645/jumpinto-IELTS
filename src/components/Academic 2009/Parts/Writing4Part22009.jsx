import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";







import Writing4Pagination2009 from "../Pagination 2009/Writing4Pagination2009";

const Writing4Part22009 = () => {
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
              Some people think that universities should provide graduates with
              the knowledge and skills needed in the workplace. Others think
              that the true function of a university should be to give access to
              knowledge for its own sake, regardless of whether the course is
              useful to an employer. <br /> <br /> What, in your opinion, should
              be the main function of a university?
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
                  The Main Function of a University: Workplace Skills or
                  Knowledge for Its Own Sake?
                </h1>
                <p className="mt-5">
                  The primary purpose of universities has become a contentious
                  issue in an era where education costs rise alongside graduate
                  unemployment rates. While vocational training undeniably
                  benefits students entering competitive job markets, I believe
                  universities must balance practical skills with intellectual
                  exploration to remain socially relevant institutions. <br /> <br />
                  Proponents of workplace-oriented education rightly emphasize
                  universities' responsibility to prepare students for economic
                  participation. Germany's dual education system, which combines
                  academic learning with corporate apprenticeships, demonstrates
                  how structured skill development reduces youth unemployment.
                  Similarly, medical schools universally require clinical
                  rotations because theoretical knowledge alone cannot produce
                  competent doctors. These examples confirm that
                  profession-specific training remains vital in fields where
                  human welfare directly depends on practical expertise. <br /> <br />
                  However, reducing universities to vocational centers would
                  impoverish human civilization. The internet itself originated
                  from theoretical physics research at CERN, not corporate R&D
                  departments. Philosophy graduates, though rarely directly
                  employed as philosophers, develop critical thinking that
                  benefits law, politics, and social activism. A university that
                  only teaches "employable" skills might never have nurtured
                  someone like Einstein, whose relativity theories initially had
                  no commercial application but later revolutionized GPS
                  technology. Moreover, interdisciplinary fields like bioethics
                  or digital humanities demonstrate how abstract knowledge
                  addresses modern dilemmas that rigid job training cannot
                  anticipate. Ultimately, universities serve society best by
                  being laboratories for both applied and pure knowledge. <br /> <br /> They
                  should equip students with transferable skills like data
                  analysis and problem-solving while preserving space for
                  intellectual curiosity. This balanced approach allows
                  graduates to adapt to evolving workplaces while contributing
                  to long-term societal progress. A computer science student
                  studying Renaissance art history might develop user-friendly
                  AI interfaces; an engineering major exploring philosophy could
                  pioneer ethical AI frameworks. Such cross-pollination of
                  practical and theoretical learning defines truly
                  transformative education.
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

      <Writing4Pagination2009></Writing4Pagination2009>
    </div>
  );
};

export default Writing4Part22009;
