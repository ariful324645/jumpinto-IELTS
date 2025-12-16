import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Writing4Pagination2017 from "../Pagination2017/Writing4Pagination2017";

const Test4Writing2017 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/2019/Test 1/writing";

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
    <div>
      {" "}
      <div className="px-3">
        <div className="flex gap-6">
          {/* LEFT SIDE */}
          <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-[1000px]">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">TASK 1</h1>
            </div>

            <div className="">
              <h1 className="text-xl mb-4">
                You should spend about 20 minutes on this task.
              </h1>
              <p className="text-lg p-5 font-bold italic border-2 border-black">
                The diagram below shows how geothermal energy is used to produce
                electricity. <br />
                <br /> Summarise the information by selecting and reporting the
                main features, and make comparisons where relevant.
              </p>

              <p className="text-lg mt-4">Write at least 150 words.</p>
              <br />

              {/* image */}
              <div className="flex items-center justify-center">
                <img
                  className="w-96 h-96"
                  src="https://i.ibb.co.com/0jZC6s9w/w-4-2017.jpg"
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
                    Geothermal Energy for Electricity Production
                  </h1>
                  <p className="mt-5">
                    The diagram illustrates the process of generating
                    electricity using geothermal energy. Overall, the system
                    harnesses heat from underground hot rocks to produce steam,
                    which powers a turbine and generator. <br /> <br /> The process begins
                    with cold water being pumped down an injection well to a
                    geothermal zone 4.5 km underground, where hot rocks heat the
                    water. The heated water is then pumped up through a
                    production well to the surface. Next, the hot water enters a
                    condenser, where it is converted into steam. This steam
                    drives a turbine, which is connected to a generator. As the
                    turbine spins, the generator produces electricity, which is
                    transmitted via power lines. After driving the turbine, the
                    steam cools down, likely restarting the cycle as condensed
                    water. <br /><br /> This renewable energy system efficiently utilizes
                    Earth's internal heat, converting thermal energy into
                    electrical energy through a series of mechanical and
                    thermodynamic processes, demonstrating a sustainable power
                    generation method.
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
      </div>
      <Writing4Pagination2017></Writing4Pagination2017>
      {/* <Writing1Pagination2018></Writing1Pagination2018> */}
    </div>
  );
};

export default Test4Writing2017;
