import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test2Writing2024 = () => {
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
              The plans below show a harbour in 2000 and how it looks today.{" "}
              <br /> <br />
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
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
              Changes of Porth Harbour from 2000 to Present
            </h1>
            <p className="mt-5">
              The two maps respectively depict the layout of Porth Harbour in
              2000 and its current appearance. <br /> <br /> In 2000, Porth Harbour had a
              clear division of areas. Along the main road, there were two car
              parks, one of which was adjacent to the showers and toilets. The
              marina for private yachts was located on the northwest side of the
              harbour. Fishing boats were moored in the southwest part. There
              was a dock near the public beach in the northeast, where passenger
              ferries were anchored. Besides, a lifeboat station was set on the
              road close to the disused castle, and another public beach was on
              the southern coast near the castle. <br /> <br /> Currently, several changes
              have taken place. An extra set of showers and toilets has been
              built near the southern car park. The fishing boats' mooring area
              and the marina for private yachts have been swapped with each
              other. A row of cafés and shops has emerged along the road,
              replacing part of the previous open-space area. The disused castle
              has been transformed into a hotel, and the nearby public beach has
              become a private one for the hotel. In addition, the number of
              docks has also increased. Although the positions of the passenger
              ferries and lifeboat station remain largely the same, the overall
              functionality and appearance of the harbour have been
              significantly updated.
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

export default Test2Writing2024;
