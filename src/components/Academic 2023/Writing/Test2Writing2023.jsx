import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test2Writing2023 = () => {
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
              The chart below shows the number of households in the US by their
              annual income in 2007, 2011 and 2015 <br /> <br /> Summarise the
              information by selecting and reporting the main features, and make
              comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-auto h-auto"
                src="https://i.ibb.co.com/7x8mCfvx/w2-2023.jpg"
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
              U.S. Household Numbers by Income Brackets: 2007 - 2015 Trends
            </h1>
            <p className="mt-5">
              The column chart depicts the variation in the number of households
              across different annual income brackets in the United States in
              2007, 2011, and 2015. <br /> <br /> For the lowest-income
              households (earning less than $25,000), there was a notable rise
              from around 25 million in 2007 to approximately 28 million in
              2011. However, this number dipped slightly to about 27 million in
              2015. <br /> <br /> Similarly, households with an income range of
              $25,000 - $49,999 grew from about 27 million in 2007 to nearly 30
              million in 2011, only to decline back to 28 million in 2015.{" "}
              <br /> <br /> In contrast, the highest-income households ($100,000
              or more) saw their numbers fall from nearly 29 million in 2007 to
              around 27 million in 2011, but then they experienced a remarkable
              surge, reaching roughly 33 million in 2015. Households in the
              $50,000 - $74,999 and $75,000 - $99,999 income brackets remained
              relatively steady throughout the years, with figures hovering
              around 21 million and 14 million respectively. <br /> <br />{" "}
              Overall, most income-level groups showed some form of growth
              during this period, apart from the $50,000 - $74,999 group. The
              $75,000 - $99,999 income group consistently represented the
              smallest proportion, while those with at least $100,000 income
              held the largest share in 2007 and 2015.
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

export default Test2Writing2023;
