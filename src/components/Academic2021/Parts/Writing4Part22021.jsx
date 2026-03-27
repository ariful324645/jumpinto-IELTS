import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing4Pagination2021 from "../Pagination 2021/Writing4Pagination2021";

const Writing4Part22021 = () => {
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
              In the future all cars,buses and trucks will be driverless. The
              only people traveling inside these vehicles will be passengers.{" "}
              <br /> <br /> Do you think the advantages of driverless vehicles
              outweigh the disadvantages?
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
                  Driverless Vehicles: Advantages vs Disadvantages
                </h1>
                <p className="mt-5">
                  The transition to fully autonomous vehicles presents
                  transformative possibilities for modern transport systems.
                  While concerns about technological reliability and employment
                  impacts exist, I believe the benefits of eliminating human
                  drivers substantially outweigh potential drawbacks. <br /> <br /> The
                  foremost advantage lies in enhanced road safety. Human error
                  causes over 90% of traffic accidents globally according to
                  World Health Organization estimates. Driverless systems
                  eliminate risks from fatigue, distraction, and impaired
                  judgment. For instance, Singapore's trial of autonomous buses
                  in 2022 reported zero collisions during its initial 10,000 km
                  of operation, contrasting sharply with human-operated routes.
                  This technology could prevent countless tragedies,
                  particularly protecting vulnerable road users like cyclists
                  and children. <br /> <br /> Environmental and efficiency gains equally merit
                  consideration. Self-driving vehicles optimize routes and
                  driving patterns, reducing fuel consumption by up to 20% as
                  demonstrated in California's freight trials. When integrated
                  with smart traffic systems, platooning trucks could decrease
                  highway congestion by maintaining consistent speeds and safe
                  following distances. Shared autonomous fleets in cities like
                  Oslo have already shown 30% reductions in urban traffic volume
                  through efficient ride-pooling algorithms. Critics rightly
                  highlight cybersecurity risks and potential job losses in
                  driving professions. However, these challenges are addressable
                  through robust encryption protocols and workforce transition
                  programs. <br /> <br /> Germany's autonomous truck initiative includes
                  retraining schemes for drivers as logistics coordinators,
                  demonstrating viable adaptation pathways. The greater ethical
                  imperative lies in preventing road deaths - equivalent to a
                  commercial airliner crashing daily - which autonomous systems
                  could dramatically reduce. While no technological shift is
                  flawless, the lifesaving potential and sustainability benefits
                  of driverless transport present an overwhelming case for
                  adoption. With proper safeguards and phased implementation,
                  autonomous vehicles promise to create safer, cleaner, and more
                  efficient mobility networks for future generations.
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
      <Writing4Pagination2021></Writing4Pagination2021>
    </div>
  );
};

export default Writing4Part22021;
