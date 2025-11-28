import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing2Pagination2020 from "../../Pagination/writing1Pagination/Writing2Pagination2020";

const Writing1Part22020 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22020";

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
              It is important for people to take risks, both in their
              professional lives and their personal lives. <br /> <br /> Do you
              think the advantages of taking risks outweigh the disadvantages?
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
                  Reasons and Evaluation of Home-ownership Preference in Some
                  Countries
                </h1>
                <p className="mt-5">
                  The cultural emphasis on homeownership over renting in certain
                  societies stems from complex psychological and economic
                  factors. While property ownership offers perceived stability,
                  its societal prioritization carries significant drawbacks that
                  merit critical examination.
                  <br />
                  <br />
                  Three interlinked drivers fuel this phenomenon. Firstly,
                  property serves as a tangible store of value in economies with
                  volatile currencies or limited investment options - many
                  middle-class families in Argentina traditionally convert
                  savings into real estate as protection against peso
                  fluctuations. Secondly, homeownership often functions as a
                  social status marker, particularly in Mediterranean cultures
                  where multigenerational home inheritance symbolizes family
                  continuity. Spanish families might renovate ancestral village
                  houses despite urban relocation, viewing them as heritage
                  rather than assets. Thirdly, legal frameworks in some nations
                  disadvantage tenants - until recent reforms, German rental
                  contracts offered such strong tenant protections that
                  landlords preferred temporary leases, inadvertently pushing
                  stability-seekers toward buying.
                  <br />
                  <br />
                  The societal consequences of this housing paradigm prove
                  problematic. Young adults in Seoul exemplify the financial
                  strain, where average apartment prices require 18 years of
                  median income, forcing many into lifelong debt or delayed life
                  milestones. Urban planning distortions emerge when cities like
                  Dublin prioritize luxury developments over affordable rentals
                  to satisfy investor demand, exacerbating housing shortages.
                  Environmental impacts compound these issues as suburban sprawl
                  intensifies in markets favoring detached homes - Phoenix's
                  water crisis partially stems from unchecked desert housing
                  expansion catering to ownership aspirations.
                  <br />
                  <br />
                  While property ownership provides individual security, its
                  cultural glorification creates systemic risks. Balanced
                  housing policies should decouple residential stability from
                  ownership status, as demonstrated by Vienna's successful
                  social housing model where 60% rent high-quality public
                  apartments without stigma. Only when societies stop equating
                  walls with worth can sustainable housing ecosystems emerge.
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
      <Writing2Pagination2020></Writing2Pagination2020>
    </div>
  );
};

export default Writing1Part22020;
