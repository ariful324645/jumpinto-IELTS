import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing5Pagination2020 from "../../Pagination/Writing4Pagination/Writing5Pagination2020";

const Writing4Part22020 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing4Part22020";

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
              In some cultures, children are often told that they can achieve
              anything if they try hard enough. <br /> <br /> What are the
              advantages and disadvantages of giving children this message?
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
                  Advantages and Disadvantages of Telling Children They Can
                  Achieve Anything with Hard Work
                </h1>
                <p className="mt-5">
                  The widespread belief that relentless effort guarantees any
                  achievement carries both empowering and problematic
                  implications for childhood development. While this mindset can
                  foster valuable traits, its oversimplification risks creating
                  unrealistic expectations in young minds.
                  <br />
                  <br />
                  On the positive side, this philosophy cultivates resilience
                  and self-efficacy. Children taught to value persistent effort
                  often demonstrate stronger problem-solving abilities when
                  facing challenges. For instance, Thomas Edison's famous 1,000
                  unsuccessful attempts before inventing the light bulb serve as
                  a timeless example of perseverance paying off. This narrative
                  encourages students to approach academic difficulties as
                  temporary obstacles rather than permanent failures. Moreover,
                  it helps develop growth mindset - the understanding that
                  abilities can be improved through dedication, which
                  educational psychologists recognize as crucial for long-term
                  learning success.
                  <br />
                  <br />
                  However, the "you can achieve anything" doctrine becomes
                  problematic when it disregards practical limitations.
                  Biological factors inevitably influence outcomes, as seen in
                  athletic pursuits. A determined child measuring 160cm tall
                  might train exhaustively for basketball, yet still face
                  insurmountable challenges against naturally taller
                  competitors. Similarly, tone-deaf individuals striving to
                  become opera singers could waste years pursuing incompatible
                  goals. More concerningly, this ideology often overlooks
                  systemic barriers. A bright student from impoverished
                  neighborhoods might work diligently yet still lack access to
                  quality education resources available to wealthier peers,
                  through no fault of their own.
                  <br />
                  <br />
                  The potential damage lies not in encouraging effort, but in
                  framing it as the sole determinant of success. Children
                  internalizing this message may blame themselves
                  disproportionately for failures beyond their control, leading
                  to diminished self-worth. A balanced approach would
                  acknowledge effort's importance while teaching children to
                  recognize external factors and adapt their goals accordingly.
                  For example, educators could emphasize personal progress over
                  absolute achievement, celebrating improved math scores
                  regardless of final ranking. This nuanced perspective
                  maintains motivation while preventing destructive
                  self-criticism when reality doesn't match idealized
                  expectations.
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
      <Writing5Pagination2020></Writing5Pagination2020>
    </div>
  );
};

export default Writing4Part22020;
