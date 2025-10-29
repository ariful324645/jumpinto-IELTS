import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test3Writing = () => {
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
              The charts below give information about a public library in a town
              called Little Chalfont. <br /> <br /> Summarise the information by
              selecting and reporting the main features, and make comparisons
              where relevant.
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
            <p>Sample Writing Answer</p>
            <br />
            <h1 className="text-xl text-center  font-bold ">
              Little Chalfont Library: A Snapshot of Membership, Loans, and
              Trends
            </h1>
            <p className="mt-5">
              The charts present data on Little Chalfont Library in 2016,
              covering member ages, loan categories, and loan trends from 2007
              to 2016. <br /> <br />
              aking up 51%. Children follow at 22%, then Young adults (13 - 17)
              at 15%, and Adults 65+ at 12%. <br /> <br /> In terms of 2016 loan
              categories, Children's fiction and Adult fiction are the most
              popular, each accounting for 38%. Adult non-fiction takes 13%,
              while Children's non-fiction, Young adults, and Adult audio books
              have smaller shares (6%, 2%, 2% respectively), and Children's DVDs
              are the least borrowed at 1%. <br /> <br /> From 2007 - 2016,
              total loans show an overall upward trend. Starting at around
              15,000 in 2007, they rise, with a slight dip in 2013 but reaching
              over 20,000 by 2016. <br /> <br />
              In summary, Adults 18 - 64 dominate membership, fiction is highly
              borrowed, and loan numbers have generally increased over the
              decade.
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

export default Test3Writing;
