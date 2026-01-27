import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2024 from "../Pagination 2024/Writing2Pagination2024";

const Writing2Part22024 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22019";

  // Load mark from localStorage if it exists
  const [mark, setMark] = useState(
    Number(localStorage.getItem(storageKey)) || null,
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
              The working week should be shorter and workers should have a
              longer weekend. Do you agree or disagree?
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
                  The Case for a Shorter Working Week
                </h1>
                <p className="mt-5">
                  A shorter working week, typically reducing the standard
                  five-day work model to four or four-and-a-half days, is a
                  proposal worth embracing. By allowing workers more time
                  outside of employment, society can unlock dual benefits:
                  fostering innovation that drives progress and enhancing
                  personal well-being that strengthens family and community
                  bonds. <br /> <br /> First, a shorter workweek creates vital space for
                  creativity and innovation. When people are not confined to
                  repetitive job routines, they have the mental energy to
                  explore new ideas, develop hobbies, or even pursue side
                  projects. For example, many tech startups today encourage
                  flexible hours or compressed workweeks, recognizing that
                  employees generate their best solutions when they have time to
                  recharge and engage in diverse activities. Kevin Systrom, a
                  software engineer who balanced a full-time job with evenings
                  and weekends of creative experimentation, used his spare time
                  to develop a photo-sharing app, eventually refining it into
                  Instagram, which revolutionized visual storytelling for
                  millions. Innovations like this often stem from the freedom to
                  explore beyond daily routines, whether through a four-day
                  workweek or evenings outside office hours. <br /> <br /> Equally important
                  is the positive impact on personal and family life. Longer
                  weekends allow individuals to prioritize physical health
                  through regular exercise, which reduces the risk of
                  work-related illnesses like burnout or chronic stress. They
                  also provide opportunities for meaningful family interactions,
                  such as shared meals, outings, or simply quality time that
                  strengthens relationships. A study by the Families and Work
                  Institute in the United States found that in companies that
                  implemented a four-day workweek, employees reported a 25%
                  increase in the amount of time they spent on family activities
                  during non-work hours. This not only enhanced the employees'
                  sense of well-being but also contributed to closer family
                  bonds and a more engaged society. <br /> <br /> Critics may argue that
                  reducing work hours could lower productivity, but evidence
                  often contradicts this. Companies that implement shorter weeks
                  usually focus on optimizing efficiency during working hours,
                  leading to better output without compromising results.
                  Ultimately, a shorter workweek is not just about less work;
                  it's about smarter work that values human potential beyond the
                  office. By investing in workers' ability to innovate and
                  thrive personally, societies can build a more balanced and
                  forward-looking future.
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
     <Writing2Pagination2024></Writing2Pagination2024>
    </div>
  );
};

export default Writing2Part22024;
