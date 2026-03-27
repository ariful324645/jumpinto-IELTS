import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing4Pagination2022 from "../Pagination2022/Writing4Pagination2022";

const Writing4Part22022 = () => {
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
              Nowadays, a growing number of people with health problems are
              trying alternative medicines and treatments instead of visiting
              their usual doctor. <br /> <br /> Do you think this is a positive
              or a negative development?
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
                  Health Problems: Alternative Medicines vs Usual Doctors
                </h1>
                <p className="mt-5">
                  The increasing preference for alternative medicine over
                  conventional healthcare presents both opportunities and risks,
                  but I believe the trend carries more dangers than benefits
                  overall. While holistic approaches can complement modern
                  medicine in specific cases, relying solely on unproven
                  treatments often delays proper diagnosis and exacerbates
                  health issues. <br /> <br />  Proponents argue that alternative therapies
                  offer accessible and natural solutions. Many find practices
                  like yoga or herbal remedies less expensive and more
                  culturally familiar than clinical treatments. For chronic
                  conditions such as arthritis, acupuncture has helped some
                  patients manage pain without pharmaceuticals. In Germany, for
                  instance, herbal supplements like St. John's Wort remain
                  popular for mild depression, demonstrating how traditional
                  remedies can coexist with mainstream medicine when used
                  cautiously. <br /> <br /> However, the absence of scientific validation
                  poses significant risks. Unlike regulated pharmaceuticals,
                  alternative treatments rarely undergo rigorous testing for
                  safety and efficacy. A 2019 Australian study revealed that
                  cancer patients using unproven therapies as primary treatment
                  had 2.5 times higher mortality rates than those following
                  oncologists' advice. Moreover, self-diagnosis through online
                  sources frequently leads to mismanagement. Consider diabetes
                  patients in India substituting insulin with unregulated
                  Ayurvedic preparations, often resulting in preventable
                  complications like kidney failure when blood sugar levels
                  remain uncontrolled. <br /> <br /> The core issue lies not in exploring
                  complementary options, but in abandoning evidence-based care.
                  Medical systems could integrate beneficial alternative
                  practices under professional supervision. Chile's public
                  health model successfully incorporates Mapuche herbal medicine
                  into mainstream clinics through physician-guided programs.
                  This balanced approach preserves cultural healing traditions
                  while ensuring scientific accountability. <br /> <br /> Ultimately, while
                  alternative therapies might address minor ailments or
                  supplement conventional treatment, prioritizing them over
                  established medical protocols jeopardizes patient safety.
                  Health authorities should educate the public about
                  distinguishing between complementary care and dangerous
                  substitutions, fostering collaboration rather than competition
                  between different healing philosophies.
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
      <Writing4Pagination2022></Writing4Pagination2022>
    </div>
  );
};

export default Writing4Part22022;
