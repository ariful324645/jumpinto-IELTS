import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";







import Writing2Pagination2007 from "../Pagination 2007/Writing2Pagination2007";

const Writing2Part22007 = () => {
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
              Successful sports professionals can earn a great deal more money
              than people in other important professions. Some people think this
              is fully justified while others think it is unfair. <br /> <br />{" "}
              Discuss both these views and give your own opinion.
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
                  Should Sports Professionals Earn More Than Others?
                </h1>
                <p className="mt-5">
                  The disparity in earnings between elite athletes and
                  professionals in fields like education or healthcare sparks
                  heated debates. While some defend sports stars' incomes as
                  natural market outcomes, others view this wealth gap as
                  socially irresponsible. Both perspectives hold merit but
                  require balanced evaluation. <br /> <br /> Proponents of high athlete
                  salaries argue that market forces legitimately determine
                  earnings. Global sports generate billions through broadcasting
                  rights and sponsorships, with top performers like Cristiano
                  Ronaldo or Naomi Osaka directly driving revenue. Their careers
                  typically last under 15 years, facing constant injury risks
                  and intense competition. A tennis player's decade-long career
                  peak contrasts with a teacher's 40-year service, justifying
                  higher short-term compensation. Moreover, athletes' earnings
                  often fund post-retirement ventures, as seen in Serena
                  Williams' investment initiatives. <br /> <br /> Opponents counter that
                  essential professions remain undervalued despite greater
                  societal impact. Nurses during the pandemic demonstrated
                  irreplaceable value, yet their compensation rarely reflects
                  such critical contributions. In Sweden, teacher strikes have
                  highlighted the paradox where educators shaping future
                  generations earn less than hockey players. This imbalance
                  arguably distorts youth aspirations, potentially steering
                  talent toward lucrative sports over socially vital careers. I
                  believe market dynamics partially explain but don't fully
                  justify this earnings chasm. While entertainment industries
                  naturally reward star power, societies must consciously
                  elevate essential workers' status through policy measures. <br /> <br />
                  Norway's approach of redirecting sports earnings into
                  community athletic programs offers a balanced model,
                  celebrating athletic achievement while reinvesting in public
                  welfare. Ultimately, a civilization's priorities reflect not
                  just in whom it pays, but in whom it values.
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
      <Writing2Pagination2007></Writing2Pagination2007>
    </div>
  );
};

export default Writing2Part22007;
