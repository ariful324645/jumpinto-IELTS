import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Writing4Pagination2024 from "../Pagination 2024/Writing4Pagination2024";

const Writing4Part22024 = () => {
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
              In many countries nowadays, consumers can go to a supermarket and
              buy food produced all over the world. <br /> <br /> Do you think
              this is a positive or negative development?
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
                  The Positive Impact of Global Food Availability in Local
                  Supermarkets
                </h1>
                <p className="mt-5">
                  Nowadays, supermarkets filled with globally sourced food have
                  become a common scene in many countries. From my perspective,
                  the advantages of this trend undoubtedly outweigh its
                  drawbacks, as it enriches people's lives in various aspects.
                  First, the presence of international food offers consumers a
                  wider range of choices. <br /> <br /> For example, in a country with a cold
                  climate, people can easily find tropical fruits such as
                  mangoes or pineapples on supermarket shelves, which were once
                  rare or costly. These imports not only diversify daily diets
                  but also supply nutrients absent in local produce. Moreover,
                  sampling foods from different cultures, like Japanese sushi or
                  Mexican tacos, has become an accessible pleasure, enabling
                  people to experience global cuisines without traveling long
                  distances. This variety meets changing tastes and promotes a
                  more balanced and interesting diet. <br /> <br /> Another positive aspect is
                  the economic and cultural bonds it creates. When countries
                  export their local products to foreign supermarkets, it
                  provides opportunities for farmers and producers in those
                  regions. Take coffee from Colombia or olive oil from Greece as
                  examples; their access to global markets helps sustain
                  livelihoods in agrarian regions. Meanwhile, the sight of these
                  products on shelves allows consumers to learn about the
                  traditions and lifestyles of different countries. A family
                  purchasing Italian pasta may become interested in Italian
                  cooking methods, thus fostering cross-cultural appreciation.
                  In this sense, food serves as a bridge, bringing people and
                  nations closer. <br /> <br /> Some may claim that relying on global food
                  sources could reduce support for local agriculture. However,
                  in reality, supermarkets usually stock both local and
                  international products, allowing consumers to make choices
                  according to their needs. Local farmers still have a stable
                  market for fresh, seasonal goods, while global options
                  complement these offerings. This coexistence fosters a
                  balanced market, ensuring that people maintain their
                  connection to local food heritage while benefiting from global
                  offerings. <br /> <br /> In conclusion, the availability of food from around
                  the world in supermarkets is a positive development. It
                  enhances dietary choices, strengthens cultural understanding,
                  and supports global economic links, enriching societies
                  holistically in meaningful ways.
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
      <Writing4Pagination2024></Writing4Pagination2024>
    </div>
  );
};

export default Writing4Part22024;
