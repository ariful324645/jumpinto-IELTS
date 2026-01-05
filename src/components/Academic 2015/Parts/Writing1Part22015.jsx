import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing1Pagination2015 from "../Pagination 2015/Writing1Pagination2015";

const Writing1Part22015 = () => {
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
              It is important for children to learn the difference between right
              and wrong at an early age. Punishment is necessary to help them
              learn this distinction. <br /> <br /> To what extent do you agree
              or disagree with this opinion? What sort of punishment should
              parents and teachers be allowed to use to teach good behaviour to
              children?
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
                  Punishment for Children's Moral Learning
                </h1>
                <p className="mt-5">
                  The question of whether punishment plays a necessary role in
                  moral education for young children requires balanced
                  consideration. While I agree that establishing boundaries is
                  crucial during early development, the nature and
                  implementation of "punishment" demand careful definition to
                  avoid harmful consequences. Mild disciplinary measures can
                  effectively reinforce behavioral standards when applied
                  appropriately. For instance, temporarily removing privileges
                  like screen time or playdates helps children connect actions
                  with consequences. <br /> <br /> A child who deliberately breaks household
                  rules might lose access to favorite toys for a day, creating
                  tangible understanding of accountability. Teachers often use
                  logical consequences, such as having students tidy a mess they
                  created, which directly links behavior correction to the
                  offense. These methods work because they emphasize
                  cause-effect relationships rather than instilling fear. <br /> <br />
                  However, the notion that punishment alone teaches moral
                  reasoning is fundamentally flawed. Children primarily learn
                  ethical values through positive reinforcement and modeled
                  behavior. Praise for sharing toys teaches generosity more
                  effectively than scolding for selfishness. Studies in child
                  psychology consistently show that over-reliance on punitive
                  measures breeds resentment, not moral understanding. A child
                  repeatedly punished for accidental spills may develop anxiety
                  rather than genuine care in handling objects. <br /> <br /> The dangerous
                  misconception lies in equating punishment with physical or
                  verbal aggression. Corporal punishment and humiliating tactics
                  cause psychological harm and damage trust. Effective
                  discipline should never involve pain or shame. Instead,
                  age-appropriate methods like "time-out" periods or natural
                  consequences (e.g., a child refusing to wear gloves
                  experiences cold hands) allow safe learning through
                  experience. Parents might implement restitution, such as
                  donating allowance money to replace damaged items, fostering
                  responsibility. <br /> <br /> Ultimately, moral education succeeds through
                  consistent guidance, not fear-based compliance. While
                  reasonable consequences have their place, they must be coupled
                  with patient explanations and positive role modeling to
                  cultivate intrinsic understanding of right and wrong.
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
      <Writing1Pagination2015></Writing1Pagination2015>
    </div>
  );
};

export default Writing1Part22015;
