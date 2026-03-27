import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2022 from "../Pagination2022/Writing2Pagination2022";

const Writing2Part22022 = () => {
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
              Some children spend hours every day on their smartphones. <br />
              <br /> Why is this the case? Do you think this is a positive or a
              negative development?
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
                  Children's Daily Smartphone Use: Reasons and Impact
                </h1>
                <p className="mt-5">
                  The widespread use of smartphones among children has become a
                  defining feature of modern childhood. While some view this
                  trend as inevitable technological progress, others express
                  concerns about its implications. This essay will examine the
                  driving forces behind this phenomenon and argue that its
                  negative consequences outweigh potential benefits. <br /> <br /> Two primary
                  factors explain children's smartphone dependency. Firstly,
                  digital platforms provide instant gratification through
                  algorithm-driven content. Applications like TikTok and YouTube
                  Shorts deliver endless streams of entertaining videos tailored
                  to individual preferences, creating compulsive viewing habits.
                  Secondly, smartphones serve as social lifelines for young
                  users. In many Western schools, for instance, group chats on
                  platforms like Snapchat have become essential for maintaining
                  peer relationships and accessing real-time social updates. <br /> <br /> The
                  educational potential of smartphones should not be dismissed
                  entirely. During the COVID-19 pandemic, students globally
                  utilized devices for remote learning through platforms like
                  Khan Academy. However, such constructive usage remains the
                  exception rather than the norm. Most screen time involves
                  passive consumption rather than active learning, with the
                  average teenager spending over 4 hours daily on non-academic
                  mobile activities according to Common Sense Media research. <br /> <br />
                  The long-term consequences of excessive smartphone use raise
                  significant concerns. In Japan, medical professionals have
                  reported increasing cases of "smartphone-induced insomnia"
                  among adolescents, linking late-night device usage to reduced
                  academic performance and emotional instability. Moreover, the
                  constant stimulation from devices appears to diminish
                  attention spans - a phenomenon observed by European educators
                  who note declining reading comprehension levels coinciding
                  with increased mobile usage. <br /> <br /> While smartphones have become
                  embedded in modern life, their dominance in childhood
                  development presents more risks than rewards. Parents and
                  educators should implement balanced approaches, such as
                  Germany's "device-free Wednesday" initiatives in some schools,
                  to help children cultivate healthier relationships with
                  technology. Ultimately, childhood should prioritize real-world
                  experiences over virtual engagement.
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
      <Writing2Pagination2022></Writing2Pagination2022>
    </div>
  );
};

export default Writing2Part22022;
