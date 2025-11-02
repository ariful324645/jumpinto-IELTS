import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test1Writing2024 = () => {
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
              The graph below gives information on the numbers of participants
              for different activities at one social centre in Melbourne,
              Australia for the period 2000 to 2020. <br /> <br /> Summarise the
              information by selecting and reporting the main features, and make
              comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div>
              <img src="" alt="Eikhane image bosabo" />
            </div>

            <br />
            <hr className="border border-gray-400" />
            <br />
            <p>
              <p>Sample Writing Answer</p>
            </p>
            <br />
            <h1 className="text-xl text-center  font-bold ">
              Activity Participation Trends at a Melbourne Social Centre (2000 -
              2020)
            </h1>
            <p className="mt-5">
              The line graph illustrates the number of participants in five
              different activities at a social centre in Melbourne, Australia,
              from 2000 to 2020. Overall, while some activities witnessed
              significant growth, others experienced a decline, and one remained
              consistently popular. <br /> <br /> The film club was the most popular activity
              throughout the period. In 2000, it boasted approximately 64
              participants. Although the number dipped to around 60 in 2010, it
              rebounded to nearly 66 by 2020. <br /> <br /> Martial arts participation was
              characterized by fluctuations. Starting at about 36 in 2000, it
              decreased to roughly 32 in 2005, reached a peak of 39 in 2010, and
              then returned to around 36 in 2020. <br /> <br />  Table-tennis showed a
              remarkable upward trend. Beginning with just about 16 participants
              in 2000, it soared to approximately 54 in 2020, outpacing all
              other activities in terms of growth rate. <br /> <br /> Amateur dramatics, on
              the other hand, suffered a steady decline. The number of
              participants dropped from around 26 in 2000 to merely about 7 in
              2020. Musical performances started from scratch in 2000. <br /> <br /> They
              gradually gained popularity, reaching around 12 in 2010 and
              approximately 19 in 2020. <br /> <br /> In conclusion, the popularity of
              activities at the social centre varied significantly over the
              20-year period, with table-tennis emerging as the fastest-growing
              activity and amateur dramatics experiencing the most substantial
              decline.
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

export default Test1Writing2024;
