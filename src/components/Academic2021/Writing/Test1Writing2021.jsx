import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test1Writing2021 = () => {
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
              The charts below show the changes in ownership of electrical
              appliances and amount of time spent doing housework in households
              in one country between 1920 and 2019. <br /> <br /> Summarise the
              information by selecting and reporting the main features, and make
              comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-96 h-96"
                src="https://i.ibb.co.com/67QnLSwK/w1-2021.jpg"
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
              Changes in Appliance Ownership and Housework Time (1920 - 2019)
            </h1>
            <p className="mt-5">
              The provided set of charts details two aspects of household life
              in a specific country from 1920 to 2019: the ownership of
              electrical appliances and the time dedicated to housework. <br />{" "}
              <br /> In the chart about appliance ownership, in 1920, the
              percentage of households with refrigerators was close to zero,
              while for washing machines and vacuum cleaners, it was around 40%
              and 30% respectively. By 1940, the proportion of households with
              refrigerators increased significantly to around 55%, slightly
              overtaking the ownership rate of vacuum cleaners, but still
              remained below the 60% rate of washing machines. <br /> <br /> The
              ownership of vacuum cleaners grew steadily over the years,
              reaching a plateau close to 100% around 2000 and maintaining that
              level through 2019. Refrigerator ownership reached 100% even
              earlier in 1980 and remained at that level through 2019. <br />{" "}
              <br /> The percentage of households with washing machines
              increased gradually from 1920 to 1960, approaching 70%, before
              briefly dropping to approximately 62% in 1980. It then continued
              to slowly increase again until reaching about 75% in 2019. Turning
              to the housework-related chart, in 1920, an average household
              spent approximately 50 hours per week on housework, which included
              washing clothes, preparing meals, and cleaning. This number
              declined continuously over the years. By 1960, it had dropped to
              around 20 hours, and by 2019, it further decreased to roughly 11
              hours per week. <br />
              <br /> In summary, the increased prevalence of electrical
              appliances in households seems to have coincided with a
              substantial reduction in the time spent on housework over the
              99-year period.
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

export default Test1Writing2021;
