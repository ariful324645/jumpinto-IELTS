import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing2Pagination2016 from "../Pagination2016/Writing2Pagination2016";




const Writing2Part22016 = () => {
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
              Some people claim that not enough of the waste from homes is
              recycled. They say that the only way to increase recycling is for
              governments to make it a legal requirement. <br /> <br /> To what
              extent do you think laws are needed to make people recycle more of
              their waste?
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
                  Are Laws Needed to Boost Home Waste Recycling?
                </h1>
                <p className="mt-5">
                  While public awareness campaigns about recycling have existed
                  for decades, household waste separation rates remain
                  disappointingly low in many regions. This reality leads some
                  to argue that only legal enforcement can drive behavioral
                  change. Though legislation alone cannot solve this complex
                  issue, I believe implementing recycling laws forms a necessary
                  foundation for progress. Legal requirements create universal
                  participation that voluntary schemes cannot achieve. Germany's
                  "Green Dot" system demonstrates this principle effectively.
                  Since 1991, manufacturers have been legally required to
                  finance packaging recycling, leading to 70% of household
                  packaging being recovered compared to 50% before legislation. <br /> <br />
                  Similarly, Seoul's mandatory food waste recycling law reduced
                  landfill-bound organic waste by 40% within three years through
                  enforced separation and composting programs. These examples
                  show how laws establish clear expectations and accountability
                  mechanisms that overcome the limitations of relying solely on
                  civic responsibility. However, legislation must be
                  complemented by education and infrastructure to ensure
                  effectiveness. Japan's meticulous recycling system combines
                  strict sorting laws with neighborhood workshops teaching waste
                  categorization.  <br /> <br /> Sweden pairs recycling mandates with
                  accessible bottle return machines in supermarkets and
                  waste-to-energy plants that make compliance convenient.
                  Without such supportive measures, laws risk becoming punitive
                  rather than transformative. Public resistance often emerges
                  when rules feel arbitrary, as seen in early phases of
                  California's plastic bag ban before reusable alternatives
                  became widely available. Ultimately, recycling mandates serve
                  as essential catalysts rather than complete solutions. <br /> <br /> They
                  create the structural framework within which education
                  campaigns gain relevance and infrastructure investments make
                  practical sense. Norway's deposit return system for bottles,
                  which achieved 97% return rates through a blend of
                  legislation, consumer refund incentives, and automated
                  collection points, exemplifies this balanced approach. While
                  laws cannot instantly alter deeply ingrained habits, they
                  establish the minimum standards that allow other initiatives
                  to flourish.
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
      <Writing2Pagination2016></Writing2Pagination2016>
    </div>
  );
};

export default Writing2Part22016;
