import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




import Writing4Pagination2025 from "../Pagination 2025/Writing4Pagination2025";

const Writing4Part22025 = () => {
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
              Many aspects of the way people dress today are influenced by
              global fashion trends. How has global fashion become such a strong
              influence on people's lives? <br /> <br /> Do you think this is a
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
                  The Impact of Global Fashion Trends
                </h1>
                <p className="mt-5">
                  Global fashion trends have become a dominant force in shaping
                  people's clothing choices, a phenomenon driven by
                  interconnected modern forces with both beneficial and
                  problematic outcomes. <br /> <br />​ The rise of global fashion's influence
                  is rooted in three key factors. Firstly, digital platforms
                  like TikTok and Instagram enable instantaneous dissemination
                  of styles, turning a celebrity's red carpet outfit or a
                  streetwear look from Tokyo into a viral trend within hours.
                  Secondly, fast fashion giants such as Shein and Uniqlo
                  accelerate this process by mass-producing these trends at low
                  costs, making them accessible to consumers worldwide - whether
                  in Paris or Hanoi. Thirdly, globalization has blurred cultural
                  boundaries; international travel and streaming services expose
                  people to diverse aesthetics, creating a shared "visual
                  vocabulary" that transcends local traditions. <br /> <br />​ This
                  development is a double-edged sword. On one hand, global
                  fashion promotes cultural exchange and inclusivity. For
                  example, traditional patterns from African or Asian textiles
                  often appear in mainstream collections, fostering
                  cross-cultural appreciation. It also empowers individuals to
                  express identity through widely recognized styles, enhancing
                  self-confidence in a globalized world. However, the downsides
                  are substantial. <br /> <br /> The fast fashion model encourages
                  overconsumption, with garments discarded after a few wears,
                  contributing to massive waste and environmental degradation.
                  Moreover, the homogenization of style risks eroding local
                  sartorial traditions; in many cities, traditional clothing is
                  being replaced by generic global brands, diminishing cultural
                  diversity. In essence, global fashion's influence reflects
                  modern connectivity's strengths and flaws. Its cultural
                  exchange value is undeniable, but unchecked, it threatens
                  sustainability and cultural diversity. A balanced approach -
                  valuing both global trends and local heritage - would maximize
                  its benefits.
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
      <Writing4Pagination2025></Writing4Pagination2025>
    </div>
  );
};

export default Writing4Part22025;
