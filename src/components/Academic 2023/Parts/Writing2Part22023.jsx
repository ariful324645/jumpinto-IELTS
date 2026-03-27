import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2023 from "../Pagination 2023/Writing2Pagination2023";

const Writing2Part22023 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22019";

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
              Some university students want to learn about other subjects in
              addition to their main subjects Others believe it is more
              important to give all their time and attention to studying for a
              qualification. <br /> <br /> Discuss both these views and give
              your own opinion.
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
                  Balancing Specialization and Diversification in University
                  Education
                </h1>
                <p className="mt-5">
                  In today's ever-evolving academic landscape, university
                  students are frequently confronted with a pivotal choice
                  regarding their educational paths. While some students
                  advocate for delving into supplementary subjects alongside
                  their core disciplines, others firmly believe that dedicating
                  all their time and energy to attaining a qualification in
                  their main field is of paramount importance. <br /> <br /> Those who
                  champion the exploration of additional subjects underscore the
                  manifold benefits it offers. Interdisciplinary learning, for
                  example, has the potential to significantly broaden students'
                  intellectual horizons. Consider a computer science major who
                  enrolls in a course on cognitive psychology. By understanding
                  the intricacies of human thought processes, this student can
                  design more user-centric software, thereby enhancing the
                  overall user experience. Moreover, exposure to diverse
                  academic disciplines fosters creativity and critical thinking
                  skills, equipping students with a versatile skill set that is
                  highly sought after in the contemporary job market. <br /> <br /> This
                  holistic approach to education enriches the students' overall
                  university experience, enabling them to develop a more
                  comprehensive understanding of the world. Conversely,
                  proponents of concentrating solely on the main qualification
                  emphasize the necessity of in-depth knowledge. In certain
                  fields, such as medicine, a profound understanding of the
                  subject matter is non-negotiable. A medical student, for
                  instance, must master a vast array of complex medical
                  concepts, from anatomy and physiology to pharmacology. <br /> <br /> Any
                  diversion of time and attention to non-relevant subjects could
                  potentially dilute their focus and impede their ability to
                  achieve a high level of expertise. By adopting a single-minded
                  approach, students can attain better grades and acquire
                  specialized skills that are highly valued in their chosen
                  professions. In my considered opinion, a judicious balance
                  between the two approaches is the most prudent strategy. While
                  it is imperative to establish a solid foundation in the main
                  subject, exploring related or interesting subjects can add
                  immeasurable value to a student's education. Universities
                  should actively encourage students to take a selection of
                  elective courses in different fields. For example, an
                  engineering student could benefit greatly from taking a course
                  in business administration. <br /> <br /> This would enable them to
                  understand the commercial aspects of engineering projects,
                  such as project management, cost-benefit analysis, and market
                  trends. By combining in-depth knowledge in their main field
                  with a broader understanding of other disciplines, students
                  will be well-prepared to tackle the multifaceted challenges of
                  the real world. In conclusion, by striking a harmonious
                  balance between specialization and diversification, university
                  students can maximize their educational potential and enhance
                  their prospects for success in their future careers.
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
      <Writing2Pagination2023></Writing2Pagination2023>
    </div>
  );
};

export default Writing2Part22023;
