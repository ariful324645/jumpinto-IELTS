import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing4Pagination2019 from "../Pagination/Writing4Pagination2019";

const Writing4Part22019 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing2Part22019";

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
              Nowadays many people choose to be self-employed, rather than to
              work for a company or organisation. <br /> <br /> Why might this
              be the case? What could be the disadvantages of being
              self-employed?
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
                  Reasons and Disadvantages of Being Self-employed
                </h1>
                <p className="mt-5">
                  The growing trend of self-employment reflects fundamental
                  shifts in modern work culture. While traditional employment
                  remains common, increasing numbers now prefer being their own
                  bosses, driven by both practical considerations and evolving
                  workplace values. <br /> <br /> Flexibility stands as the primary motivator.
                  Self-employed individuals control their schedules, allowing
                  them to prioritize personal commitments or creative projects.
                  A graphic designer might choose to work nights to care for
                  children during daytime, while a consultant could take
                  extended breaks between projects to travel. Digital platforms
                  like Upwork and Etsy have democratized access to global
                  markets, enabling artisans in Indonesia to sell handmade
                  crafts worldwide without corporate intermediaries.
                  Additionally, many pursue self-employment to align work with
                  personal passions, such as a nutrition enthusiast starting a
                  meal-planning service rather than working in unrelated
                  corporate roles. <br /> <br /> However, this independence carries
                  significant challenges. Financial instability tops the list,
                  as income fluctuates unpredictably - a freelance photographer
                  might earn $5,000 monthly during wedding season but struggle
                  to find clients in slower months. Unlike salaried employees,
                  self-workers must personally handle tax payments, health
                  insurance, and retirement planning, which even tech-savvy
                  individuals often find burdensome. The blurred boundaries
                  between professional and personal life frequently lead to
                  burnout, exemplified by home-based entrepreneurs working
                  14-hour days in shared living spaces. Moreover, isolation
                  becomes problematic, particularly for those transitioning from
                  office environments; a UK survey revealed 68% of solo workers
                  experience loneliness affecting productivity. <br /> <br /> Ultimately,
                  self-employment offers liberation from rigid corporate
                  structures but demands exceptional self-discipline and risk
                  tolerance. While enabling work-life integration and passion
                  pursuits, it simultaneously introduces financial
                  vulnerabilities and psychological pressures that not all
                  individuals can sustainably manage.
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
      <Writing4Pagination2019></Writing4Pagination2019>
    </div>
  );
};

export default Writing4Part22019;
