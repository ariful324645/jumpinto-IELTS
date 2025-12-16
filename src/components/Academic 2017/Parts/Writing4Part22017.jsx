import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing4Pagination2017 from "../Pagination2017/Writing4Pagination2017";

const Writing4Part22017 = () => {
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
              Some people believe that allowing children to make their own
              choices on everyday matters (such as food, clothes and
              entertainment) is likely to result in a society of individuals who
              only think about their own wishes. Other people believe that it is
              important for children to make decisions about matters that affect
              them. <br /> <br /> Discuss both these views and give your own
              opinion.
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
                  Should Children Make Their Own Choices on Everyday Matters?
                </h1>
                <p className="mt-5">
                  The debate over children's autonomy in daily decisions
                  reflects broader concerns about social values. Critics argue
                  that permitting unrestricted choices in matters like meals or
                  leisure fosters self-centered attitudes. They observe that
                  children who habitually select sugary snacks over vegetables
                  or demand expensive toys may develop entitlement, prioritizing
                  instant gratification over collective well-being. For
                  instance, a British study revealed that 63% of parents who let
                  children control weekend plans reported increased conflicts
                  about family activities, suggesting such freedom might
                  undermine cooperation skills. <br /> <br /> Conversely, proponents of
                  childhood decision-making emphasize its role in developing
                  essential life competencies. When children choose their
                  extracurricular activities or manage weekly allowances, they
                  gradually cultivate responsibility and critical thinking.
                  Scandinavian education systems exemplify this approach, where
                  primary students collaboratively plan classroom rules and
                  learning methods. This practice not only teaches negotiation
                  skills but also demonstrates how personal choices intersect
                  with community needs. A Swedish teenager selecting
                  eco-friendly clothing through independent research, for
                  example, learns to align personal preferences with
                  environmental consciousness. <br /> <br /> From my perspective, balanced
                  autonomy guided by parental mentorship yields optimal
                  outcomes. Complete freedom without context risks creating
                  impulsive decision-makers, while excessive control stifles
                  emotional growth. Practical solutions include offering limited
                  options within boundaries - allowing a child to choose between
                  broccoli and spinach at dinner, or between saving allowance
                  for video games versus donating to animal shelters. This
                  structured approach mirrors workplace scenarios where
                  employees exercise creativity within professional frameworks,
                  preparing children for real-world collaboration. <br /> <br /> Ultimately,
                  the goal should be nurturing individuals who make informed
                  choices while considering broader implications. Like saplings
                  needing both space to grow and stakes for support, children
                  require measured independence to become socially responsible
                  adults.
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
      <Writing4Pagination2017></Writing4Pagination2017>
    </div>
  );
};

export default Writing4Part22017;
