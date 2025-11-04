import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test1Writing2023 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawSentences = message.split(/\s+/).filter((s) => s.length > 0);

    const sentences = rawSentences.map((w) => w.trim());

    setSentenceCount(sentences.length);

    if (sentences.length < 1) {
      toast.warn("Please write at least one sentence!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.success(`You wrote ${sentences.length} sentences`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setSubmittedMessage(message);
  };

  return (
    <div className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-screen">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TASK 1</h1>
          </div>

          <div className="">
            <h1 className="text-xl mb-4">
              You should spend about 20 minutes on this task.
            </h1>
            <p className="text-lg p-5 font-bold italic border-2 border-black">
              The graph below gives information about the percentage of the
              population in four Asian countries living in cities from 1970 to
              2020, with predictions for 2030 and 2040. <br /> <br /> Summarise
              the information by selecting and reporting the main features, and
              make comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-auto h-auto"
                src="https://i.ibb.co.com/zhcnmYpT/w1-2023.jpg"
                alt="Eikhane image bosabo"
              />
            </div>

            <br />
            <hr className="border border-gray-400" />
            <br />
            <p>
              <p>Sample Writing Answer</p>
            </p>
            <br />
            <h1 className="text-xl text-center  font-bold ">
              Urban Population Percentage Trends in Four Asian Countries (1970 -
              2040)
            </h1>
            <p className="mt-5">
              The line graph presents the proportion of the urban population in
              four Asian countries - the Philippines, Malaysia, Thailand, and
              Indonesia - from 1970 to 2020, along with projections for 2030 and
              2040. <br /> <br /> Overall, all four nations have witnessed a
              continuous increase in urbanization over the period, with Malaysia
              emerging as the front-runner in terms of the urban population
              share, while Indonesia has demonstrated the most substantial
              growth rate. <br /> <br /> In 1970, Malaysia started with
              approximately 30% of its populace residing in urban areas.
              Subsequently, it experienced a relentless and steady ascent. By
              2040, it is anticipated to soar to over 80%, firmly establishing
              itself as the country with the highest urban-dwelling percentage
              among the four. <br /> <br /> The Philippines, commencing at a
              comparable level to Malaysia in 1970, endured a more erratic
              journey. Despite the fluctuations, it is forecast to attain around
              55% urban population by 2040. <br /> <br /> Indonesia, starting
              from a meager base of below 15% in 1970, has undergone a
              remarkable surge. It is projected to draw close to 65% by 2040,
              signifying a substantial transformation in its urbanization
              landscape. <br /> <br /> Thailand, beginning at roughly 20% in
              1970, has had a rather sluggish yet consistent growth pattern. It
              is predicted to reach nearly 50% in 2040. <br /> <br /> In
              conclusion, the line graph shows an ongoing upward trend of
              urbanization in these four Asian countries, with each following
              its own unique path.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 ">
          <p className="text-gray-500">Autosaved @ 2025-10-29 10:46:44.</p>
          <br />

          <div className="flex flex-col w-full mx-auto">
            <textarea
              id="message"
              name="message"
              rows="16"
              placeholder="Please input"
              className="border border-gray-400 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-between p-4">
            <h3 className="mt-3">Words: {sentenceCount}</h3>
            <input
              onClick={handleSubmit}
              type="submit"
              value="Submit for Feedback"
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-600 transition"
            />
          </div>

          {/* input field ja likhbo show korbe  */}

          <h1 className="text-2xl font-bold">Writing FeedBack</h1>
          <div className="bg-gray-300 p-5 mt-4 rounded-lg min-h-[100px]">
            <p>{submittedMessage}</p>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Test1Writing2023;
