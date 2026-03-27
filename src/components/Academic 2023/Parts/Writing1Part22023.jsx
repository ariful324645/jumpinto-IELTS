import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Writing1Pagination2023 from "../Pagination 2023/Writing1Pagination2023";

const Writing1Part22023 = () => {
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
              The most important aim of science should be to improve people's
              lives. <br /> <br /> To what extent do you agree or disagree with
              this statement?
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
                  The Role of Science in Improving People's Lives
                </h1>
                <p className="mt-5">
                  Science has always been a driving force behind the progress of
                  humanity, and I wholeheartedly agree that its most important
                  aim should be to improve people's lives. From the moment the
                  first tools were crafted to make hunting and gathering easier,
                  science has been dedicated to enhancing the quality of human
                  existence. <br /> <br /> One of the most evident ways science has improved
                  lives is through medical advancements. In the past, diseases
                  like smallpox and polio were rampant, causing widespread death
                  and disability. However, through scientific research, vaccines
                  were developed. Smallpox, for instance, has been eradicated
                  globally, saving countless lives. This is a testament to how
                  science can directly address life-threatening issues and
                  improve the well-being of people. In modern times, research
                  into cancer treatments is ongoing, and each new discovery,
                  whether it's a more effective chemotherapy drug or a
                  revolutionary immunotherapy technique, gives hope to patients
                  and their families, improving their quality of life even in
                  the face of a serious illness. <br /> <br /> Another area where science has
                  had a profound impact on people's lives is in technology. The
                  invention of the internet, a result of scientific and
                  technological research, has transformed the way we
                  communicate, access information, and conduct business. People
                  from remote areas can now connect with the world, access
                  educational resources, and find job opportunities. For
                  example, students in rural villages can take online courses
                  from top universities around the world, expanding their
                  knowledge and future prospects. This connectivity has also
                  improved the lives of the elderly, who can now stay in touch
                  with their families living far away through video calls. <br /> <br />
                  Moreover, science has played a key role in environmental
                  protection, which in turn improves people's lives. Scientists
                  study climate change and develop solutions to mitigate its
                  effects. Renewable energy sources, such as solar and wind
                  power, are being developed and implemented, reducing our
                  reliance on fossil fuels and improving air quality. Cleaner
                  air means fewer respiratory diseases, directly benefiting the
                  health of the population. Additionally, sustainable farming
                  practices, developed through scientific research, ensure food
                  security while protecting the environment, which is essential
                  for the well-being of current and future generations. <br /> <br /> In
                  conclusion, science has an immense potential to improve
                  people's lives, and making this its primary goal is not only
                  logical but also necessary. By focusing on medical,
                  technological, and environmental advancements, science can
                  continue to enhance the quality of life for all.
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
      <Writing1Pagination2023></Writing1Pagination2023>
    </div>
  );
};

export default Writing1Part22023;
