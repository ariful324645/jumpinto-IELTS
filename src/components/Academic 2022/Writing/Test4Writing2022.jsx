import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test4Writing2022 = () => {
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
              The graph below shows the number of shops that closed and the
              number of new shops that opened in one country between 2011 and
              2018. <br /> <br /> Summarise the information by selecting and
              reporting the main features, and make comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="h-auto w-auto"
                src="https://i.ibb.co.com/hJLQxGP2/w4-2022.jpg"
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
              Shops Closing and Opening in a Country (2011 - 2018)
            </h1>
            <p className="mt-5">
              The line graph illustrates the number of shop closures and
              openings in a country from 2011 to 2018. Overall, the trends for
              shop closures and openings were quite volatile. <br /> <br /> In
              2011, there were approximately 8,500 new shop openings, much
              higher than the around 6,300 closures. However, in 2012, the
              number of openings dropped significantly to about 4,000, while
              closures decreased moderately to around 6,000.
              <br /> <br /> From 2013 to 2014, closures increased to over 7,000
              and then declined to around 6,500, while openings grew steadily
              from 5,000 to over 6,000. In 2015, there was a sharp fall in
              closures to only 600, and openings decreased to about 4,000.
              <br /> <br /> After 2015, closures rebounded to over 5,000 in 2016
              and remained relatively stable until 2018, while openings remained
              relatively stable at around 4,000 from 2015 to 2017 before falling
              to approximately 3,000 in 2018. <br /> <br /> It's clear that the
              number of shop closures and openings varied greatly over the
              eight-year period, with no consistent pattern of one being higher
              than the other throughout.
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

export default Test4Writing2022;
