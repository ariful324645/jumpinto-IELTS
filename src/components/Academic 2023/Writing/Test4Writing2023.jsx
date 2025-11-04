import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test4Writing2023 = () => {
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
              The graph below shows the average monthly change in the prices of
              three metals during 2014. <br /> <br /> Summarise the information
              by selecting and reporting the main features, and make comparisons
              where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="h-96 w-96"
                src="https://i.ibb.co.com/Tqhq4CjV/w4-2023.jpg"
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
              Average Monthly Price Changes of Three Metals in 2014
            </h1>
            <p className="mt-5">
              The line graph illustrates the average monthly percentage changes
              in the prices of copper, nickel, and zinc throughout 2014.
              Overall, all three metals experienced significant price
              volatility, with nickel showing the widest range of fluctuations.{" "}
              <br /> <br />
              In January, nickel witnessed a dramatic 6% price surge, the most
              substantial increase among the three metals during the year.
              Copper and zinc also saw price hikes of 2% and 1% respectively. In
              February, the upward trend continued for all metals, with nickel
              leading the way with a 4% increase. <br /> <br /> From March to
              April, the prices of all metals continued to rise, albeit at a
              slower pace. Zinc recorded the largest increase during this
              period. However, in May, copper's price dipped by approximately
              0.5%, while nickel and zinc maintained their upward movement, but
              more moderately. <br /> <br /> June brought a decline in the
              prices of all metals, with nickel experiencing the most
              significant drop of 3%. From July to September, copper's price
              rebounded steadily, increasing by 1% each month, while nickel and
              zinc suffered price reductions. <br /> <br /> In November, there
              was a turnaround as all metals saw price increases. Zinc led the
              upswing with an approximate 1.5% increase. This upward trend
              continued into December, with zinc registering the most
              substantial increase of around 2%. <br /> When comparing the
              overall price movements, nickel demonstrated the most erratic
              behavior with large fluctuations, copper exhibited a more balanced
              pattern of rises and falls, and zinc, while showing relatively
              stable overall volatility compared to nickel, experienced notable
              price surges in specific periods such as November and December.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 ">
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

export default Test4Writing2023;
