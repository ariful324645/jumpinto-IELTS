import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test2Writing2019 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/2019/Test 3/writing";

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
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-screen">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TASK 1</h1>
          </div>

          <div className="">
            <h1 className="text-xl mb-4">
              You should spend about 20 minutes on this task.
            </h1>
            <p className="text-lg p-5 font-bold italic border-2 border-black">
              The diagram below shows how electricity is generated in a
              hydroelectric power station. <br /> <br /> Summarise the
              information by selecting and reporting the main features, and make
              comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="h-full"
                src="https://i.ibb.co.com/CKgF1bpW/w3-2019.jpg"
                alt="Eikhane image bosabo"
              />
            </div>

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
                <h1 className="text-xl text-center  font-bold ">
                  Process of Electricity Generation in a Hydroelectric Power
                  Station
                </h1>
                <p className="mt-5">
                  The diagram illustrates the process of electricity generation
                  in a hydroelectric power station. <br /> <br /> Water from the
                  river is stored in a high-level reservoir behind a dam. During
                  the day, the intake is open, and water flows down through a
                  channel to the power station. As the water passes through
                  reversible turbines, it drives the generator to produce
                  electricity, which is then transmitted to the national grid
                  via power lines. The used water then enters a low - level
                  reservoir. <br /> <br /> At night, when electricity demand is
                  lower, the intake is closed. The reversible turbines switch
                  function and act as pumps. They take water from the low-level
                  reservoir and pump it back up to the high-level reservoir,
                  ready for the next day's electricity generation. <br /> <br />{" "}
                  This system effectively utilizes the gravitational potential
                  energy of water to generate electricity, and the reversible
                  turbines play a crucial role in both electricity production
                  during the day and water recycling at night, making it a
                  sustainable and efficient power-generation method.
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
        <div className="w-1/2">
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
    </div>
  );
};

export default Test2Writing2019;
