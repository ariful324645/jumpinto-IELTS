import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





import Writing2Pagination2011 from "../Pagination 2011/Writing2Pagination2011";

const Writing2Part22011 = () => {
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
              Nowadays the way many people interact with each other has changed
              because of technology. <br /> <br /> In what ways has technology
              affected the types of relationships people make? Has this become a
              positive or negative development?
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
                  The Impact of Technology on Human Relationships: Positive or
                  Negative?
                </h1>
                <p className="mt-5">
                  Digital tools have fundamentally reshaped how humans form
                  connections, creating both broader social networks and new
                  challenges in relationship depth. While traditional
                  interactions relied on physical proximity, modern technology
                  enables instantaneous communication across continents,
                  allowing people to maintain friendships with childhood
                  classmates through messaging apps while simultaneously bonding
                  with international gaming teammates. This geographical
                  liberation has particularly benefited immigrant communities -
                  a Filipino nurse in London can now share daily experiences
                  with family via video calls, preserving emotional ties that
                  distance might otherwise weaken. The nature of relationships
                  has diversified through specialized platforms. <br /> <br /> Fitness
                  enthusiasts connect on Strava through shared cycling routes,
                  amateur chefs exchange recipes in cooking forums, and language
                  learners practice through tandem apps with native speakers.
                  These interest-based connections often develop into meaningful
                  mentorships or collaborations, like open-source programmers
                  meeting on GitHub to create free software. However, this
                  connectivity comes with fragmentation risks. The average
                  smartphone user juggles 8 messaging platforms, potentially
                  creating shallow interactions where quick emoji exchanges
                  replace thoughtful conversations. Evaluating this shift
                  requires balancing accessibility against quality. <br /> <br /> Video
                  conferencing tools undoubtedly sustain crucial relationships
                  during life transitions - university students maintain
                  hometown friendships while building new campus connections.
                  Yet research indicates excessive social media use correlates
                  with increased loneliness, particularly when substituting
                  digital interactions for face-to-face contact. The solution
                  lies in conscious usage: a German engineer might limit
                  LinkedIn networking to working hours while reserving evenings
                  for neighborhood book club meetings. This hybrid approach
                  harnesses technology's connective power without sacrificing
                  relationship depth, suggesting the digital revolution in human
                  connections ultimately represents progress when managed
                  intentionally.
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
      <Writing2Pagination2011></Writing2Pagination2011>
    </div>
  );
};

export default Writing2Part22011;
