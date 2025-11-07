import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test4Writing2021 = () => {
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
              The diagram below shows the process for recycling plastic bottles.{" "}
              <br /> <br />
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-96 h-96"
                src="https://i.ibb.co.com/XxkPGs15/w4-2021.jpg"
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
              The Process of Recycling Plastic Bottles
            </h1>
            <p className="mt-5">
              The diagram illustrates the step-by-step process of recycling
              plastic bottles. <br /> <br /> It all begins when individuals
              discard used plastic bottles into collection bins (step 1).
              Subsequently, these bottles are transported by trucks to a
              recycling centre (step 2). At the centre, workers sort the bottles
              carefully, separating suitable ones from those unfit for recycling
              (step 3). <br /> <br /> The selected bottles are then compressed
              into blocks (step 4), followed by crushing them into small pieces
              (step 5). These pieces are washed thoroughly to remove any
              contaminants. After that, the clean fragments are processed to
              produce plastic pellets (step 6). <br /> <br />
              The plastic pellets are heated to form raw material (step 7),
              which is then stored as large packages (step 8). Finally, this raw
              material is used to manufacture a variety of end products, such as
              new plastic bottles, clothing, pens, and bags (step 9). <br />{" "}
              <br /> Overall, the recycling process is a complex yet essential
              system that transforms waste plastic bottles into valuable
              resources, reducing environmental pollution and conserving energy.
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

export default Test4Writing2021;
