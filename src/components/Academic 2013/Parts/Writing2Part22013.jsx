import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing2Pagination2013 from "../Pagination 2013/Writing2Pagination2013";

const Writing2Part22013 = () => {
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
              Some people believe that unpaid community service should be a
              compulsory part of high school programmes (for example working for
              a charity, improving the neighbourhood or teaching sports to
              younger children). <br /> <br /> To what extent do you agree or
              disagree?
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
                  Compulsory Unpaid Community Service in High School Programmes
                </h1>
                <p className="mt-5">
                  Mandatory community service in high schools could
                  significantly benefit both students and society, provided that
                  programs maintain flexibility. While requiring unpaid work
                  raises valid concerns about individual freedom, structured
                  volunteer programs can cultivate civic responsibility and
                  practical skills when thoughtfully implemented. <br /> <br /> Compulsory
                  service exposes teenagers to social realities beyond classroom
                  walls. Tutoring underprivileged children in reading programs,
                  for instance, develops empathy while reinforcing academic
                  knowledge through teaching. Environmental clean-up projects
                  transform abstract ecological concepts into tangible actions,
                  as seen in German schools where students maintain urban green
                  spaces. Such experiences often spark lasting community
                  engagement - a 2020 OECD report noted that 68% of participants
                  in school-based volunteering continued similar activities
                  post-graduation. <br /> <br /> Critics rightly argue that forced
                  volunteering might breed resentment. However, this risk
                  diminishes when students choose service areas aligning with
                  personal interests. A tech-savvy student could assist seniors
                  with digital literacy, while aspiring healthcare workers might
                  volunteer at animal shelters. Canadian schools successfully
                  employ this approach through "passion projects," where
                  students design service initiatives related to their career
                  aspirations. This autonomy transforms obligation into
                  meaningful participation. <br /> <br /> Potential academic interference
                  remains a legitimate concern, yet properly scheduled programs
                  enhance rather than hinder education. Weekend beach clean-ups
                  or after-school mentoring sessions complement rather than
                  replace curricular activities. Singaporean schools integrate
                  service hours within existing co-curricular time slots,
                  demonstrating how logistical planning prevents academic
                  disruption. Moreover, the time management skills gained
                  through balancing studies and service prove valuable for
                  university life. <br /> <br /> When designed with student input and schedule
                  considerations, mandatory community service becomes an
                  investment in societal cohesion. By connecting classroom
                  learning to real-world applications and fostering
                  intergenerational understanding, such programs prepare
                  students not just for exams, but for active citizenship.
                  Schools should implement these requirements with sufficient
                  options and support systems to maximize positive outcomes.
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
      <Writing2Pagination2013></Writing2Pagination2013>
    </div>
  );
};

export default Writing2Part22013;
