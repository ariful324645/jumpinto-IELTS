import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Writing4Pagination2015 from "../Pagination 2015/Writing4Pagination2015";

const Writing4Part22015 = () => {
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
              Many museums charge for admission while others are free. <br />{" "}
              <br /> Do you think the advantages of charging people for
              admission to museums outweigh the disadvantages?
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
                  Museum Admission: Charge or Free?
                </h1>
                <p className="mt-5">
                  The debate around museum entrance fees involves balancing
                  cultural accessibility with institutional sustainability.
                  While free admission democratizes access to knowledge,
                  charging reasonable fees ultimately creates more sustainable
                  cultural institutions that better serve public interests
                  through improved services and preservation efforts. Charging
                  admission fees enables museums to fulfill their educational
                  missions more effectively. <br /> <br /> Operating costs for
                  climate-controlled galleries, artifact conservation, and
                  interactive exhibits require substantial funding. The Louvre
                  in Paris, which charges €17 per ticket, uses these resources
                  to maintain its vast collection while offering free audio
                  guides and educational workshops. This financial model allows
                  continuous upgrades like virtual reality tours that enhance
                  visitor experiences. Conversely, completely free museums often
                  rely on unpredictable government funding or donations, which
                  can lead to neglected facilities and outdated exhibitions as
                  seen in some underfunded municipal museums across Europe. <br /> <br />
                  However, the exclusion of low-income visitors remains a valid
                  concern. London's free museums like the British Museum
                  demonstrate how philanthropic endowments and voluntary
                  donations can support operations without mandatory fees. Yet
                  this model works best in wealthy cities with strong donor
                  cultures. <br /><br /> For most museums globally, moderate entrance fees
                  combined with free access schemes create a balanced solution.
                  New York's Metropolitan Museum of Art implements
                  "pay-what-you-wish" admission for state residents while
                  charging tourists, ensuring both accessibility and financial
                  viability. <br /> <br /> The key lies in implementing equitable pricing
                  strategies rather than blanket free entry. Many institutions
                  now offer free admission during off-peak hours or cultural
                  heritage days, as practiced by Amsterdam's Rijksmuseum. This
                  approach maintains revenue streams while fulfilling social
                  responsibilities. When managed transparently, entrance fees
                  transform museums from passive repositories into dynamic
                  educational hubs capable of preserving humanity's shared
                  heritage for future generations.
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
      <Writing4Pagination2015></Writing4Pagination2015>
    </div>
  );
};

export default Writing4Part22015;
