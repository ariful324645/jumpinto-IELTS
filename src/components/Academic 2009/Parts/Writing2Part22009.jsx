import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





import Writing2Pagination2009 from "../Pagination 2009/Writing2Pagination2009";

const Writing2Part22009 = () => {
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
              Some people believe that there should be fixed punishments for
              each type of crime. Others, however, argue that the circumstances
              of an individual crime, and the motivation for committing it,
              should always be taken into account when deciding on the
              punishment. <br /> <br /> Discuss both these views and give your
              own opinion.
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
                  Fixed Punishments vs. Considering Circumstances for Crimes
                </h1>
                <p className="mt-5">
                  The debate over whether legal systems should apply
                  standardized penalties or consider contextual factors in
                  sentencing remains contentious. Both perspectives have valid
                  reasoning, yet a balanced approach that prioritizes
                  consistency while allowing flexibility for extraordinary
                  situations appears most just. <br /> <br /> Proponents of fixed punishments
                  argue that uniform sentencing ensures equality before the law.
                  When identical crimes receive identical penalties regardless
                  of the perpetrator's background, it eliminates judicial bias
                  and prevents arbitrary decisions. For instance, many countries
                  impose standardized fines for traffic violations like
                  speeding, which helps drivers clearly understand consequences
                  and discourages reckless behavior. <br /> <br /> This system also
                  streamlines court processes, reducing delays caused by
                  prolonged case-by-case evaluations. Such predictability
                  strengthens public trust in legal institutions, as citizens
                  perceive the law as an impartial force rather than a
                  subjective human judgment. Conversely, advocates for
                  contextual sentencing emphasize that human behavior cannot be
                  neatly categorized. A teenager stealing bread to feed siblings
                  during an economic crisis fundamentally differs from an
                  organized retail theft ring profiting from luxury goods. <br /> <br />
                  Norway's judicial system exemplifies this approach, where
                  courts evaluate offenders' backgrounds, mental states, and
                  societal conditions. A notable case involved reducing
                  sentences for addicts committing petty crimes when
                  rehabilitation programs were deemed more effective than
                  imprisonment. This philosophy recognizes that mechanical
                  punishment without understanding root causes often perpetuates
                  criminal cycles rather than solving them. In my view, while
                  core penalties should maintain consistency for common
                  offenses, exceptional circumstances warrant judicial
                  discretion. Murder charges could carry mandatory minimum
                  sentences but permit reduced penalties for crimes committed
                  under duress or severe psychological distress. <br /> <br /> South Africa's
                  Truth and Reconciliation Commission demonstrated how
                  context-sensitive approaches could address systemic injustices
                  while maintaining legal principles during post-apartheid
                  transitions. Ultimately, justice requires both the stability
                  of clear legal frameworks and the humanity to recognize unique
                  situations. By establishing baseline punishments while
                  permitting carefully regulated exceptions, legal systems can
                  uphold fairness without sacrificing compassion.
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

      <Writing2Pagination2009></Writing2Pagination2009>
    </div>
  );
};

export default Writing2Part22009;
