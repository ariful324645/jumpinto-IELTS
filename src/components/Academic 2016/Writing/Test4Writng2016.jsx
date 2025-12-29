import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing4Pagination2016 from "../Pagination2016/Writing4Pagination2016";

const Test4Writing2016 = () => {
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
                Many governments think that economic progress is their most
                important goal. Some people, however, think that other types of
                progress are equally important for a country. <br /> <br />{" "}
                Discuss both these views and give your own opinion.
              </p>

              <p className="text-lg mt-4">Write at least 150 words.</p>
              <br />

              {/* image */}
              <div className="flex items-center justify-center">
                <img
                  className="h-full w-full"
                  src="https://i.ibb.co.com/7wvc1qY/w-4.jpg"
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
                    Economic Progress vs. Other Types of Progress for a Country
                  </h1>
                  <p className="mt-5">
                    The prioritization of economic growth by national
                    governments frequently sparks debate about what truly
                    constitutes national progress. While financial stability
                    undeniably forms the foundation for societal development,
                    exclusive focus on economic metrics risks overlooking other
                    vital aspects of national well-being. Proponents of economic
                    prioritization argue that wealth generation enables
                    solutions to fundamental challenges. South Korea's
                    transformation from postwar poverty to technological
                    leadership demonstrates how GDP growth funds infrastructure,
                    healthcare, and education systems. <br /> <br /> Stable economies also
                    attract foreign investment, as seen in Singapore's emergence
                    as a global business hub through deliberate economic
                    policies. Governments often view economic strength as
                    essential for geopolitical influence and crisis resilience,
                    particularly evident during global events like the COVID-19
                    pandemic when wealthier nations generally maintained better
                    social safety nets. <br /> <br /> However, critics contend that equating
                    prosperity solely with financial metrics creates imbalanced
                    societies. Nordic countries consistently rank highest in
                    happiness indexes not because of exceptional GDP, but due to
                    investments in gender equality, environmental
                    sustainability, and work-life balance initiatives.
                    Conversely, nations like Qatar, despite immense wealth, face
                    international criticism regarding workers' rights and
                    cultural preservation issues. Environmental costs further
                    complicate this equation - Indonesia's palm oil boom
                    improved economic indicators but caused irreversible
                    biodiversity loss and community displacement. In my view,
                    economic progress should serve as a means rather than an
                    end.  <br /> <br />Costa Rica exemplifies this balance, having redirected
                    military spending towards education and environmental
                    protection since 1948. This approach fostered both stable
                    growth and global leadership in eco-tourism and renewable
                    energy. True national advancement requires synchronized
                    development across economic, social, and environmental
                    spheres, where financial resources enable rather than
                    dictate human progress. Governments must recognize that
                    while economic metrics are easily quantifiable, the most
                    meaningful progress often resists numerical measurement.
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
      <Writing4Pagination2016></Writing4Pagination2016>
      {/* <Writing1Pagination2017></Writing1Pagination2017> */}
    </div>
  );
};

export default Test4Writing2016;
