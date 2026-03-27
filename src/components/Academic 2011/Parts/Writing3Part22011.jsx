import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing3Pagination2011 from "../Pagination 2011/Writing3Pagination2011";

const Writing3Part22011 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22018";

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
              Increasing the price of petrol is the best way to solve growing
              traffic and pollution problems. To what extent do you agree or
              disagree? <br /> <br /> What other measures do you think might be
              effective?
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
                  Petrol Price Hike: Best Solution for Traffic and Pollution?
                </h1>
                <p className="mt-5">
                  Raising fuel costs is often proposed as a primary solution to
                  traffic congestion and environmental damage, but I believe
                  this approach alone is insufficient. While increasing petrol
                  prices might reduce car usage to some extent, it
                  disproportionately affects lower-income groups and fails to
                  address systemic issues. Practical alternatives exist that
                  could yield better long-term results without exacerbating
                  social inequality. <br /> <br /> Higher petrol prices could temporarily
                  discourage unnecessary car trips, as seen in Norway's 2022
                  carbon tax adjustments that reduced urban traffic by 8%.
                  However, this strategy becomes less effective when commuters
                  lack alternatives. Office workers in car-dependent cities like
                  Los Angeles continued driving despite fuel price hikes because
                  inadequate public transport left them no choice. Moreover,
                  this measure unfairly burdens essential workers like nurses
                  and delivery drivers who cannot avoid daily commuting. <br /> <br /> More
                  equitable solutions should focus on transforming
                  transportation infrastructure. Amsterdam's bicycle-friendly
                  urban redesign decreased car reliance from 40% to 22% of trips
                  within a decade through dedicated cycling lanes and
                  bike-sharing systems. Similarly, Seoul's investment in
                  electric buses and subway expansions reduced traffic-related
                  emissions by 15% while maintaining affordable fares. These
                  systemic changes provide accessible alternatives rather than
                  punishing drivers financially. <br /> <br /> Complementary measures could
                  include congestion charges for city centers, as successfully
                  implemented in London, where traffic decreased by 30% in
                  charged zones. Workplace initiatives like mandatory remote
                  work days for desk-based employees, tested by major tech
                  companies in Berlin, also show promise in reducing rush-hour
                  gridlock. Such targeted strategies address root causes of
                  traffic and pollution without penalizing low-income citizens
                  for essential travel. <br /> <br /> In conclusion, while fuel price
                  increases might contribute marginally to solving
                  transportation issues, lasting solutions require
                  infrastructure modernization and policy innovations that make
                  sustainable choices convenient and affordable. A combination
                  of improved public transit, urban planning reforms, and smart
                  regulations would prove more effective and socially just than
                  simply making driving more expensive.
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
      <Writing3Pagination2011></Writing3Pagination2011>
    </div>
  );
};

export default Writing3Part22011;
