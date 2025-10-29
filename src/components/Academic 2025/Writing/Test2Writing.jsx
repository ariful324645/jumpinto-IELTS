import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test2Writing = () => {
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
              The plans below show the site of a farm in 1950 and the same site
              today.
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
              Population Changes in New York City and Its Five Districts (1800 -
              2000)
            </h1>
            <p className="mt-5">
              The two maps illustrate the transformations of Beechwood Farm from
              1950 to the present. <br /> <br /> In 1950, the farm had a layout
              centered on agricultural production. There were areas for fruit
              trees, soft fruits, and vegetables by the river. A system of
              tracks connected the barn, farmhouse, and chicken area, serving as
              the primary routes within the farm, while the northeast section
              was dedicated to sheep grazing. <br /> <br /> Today, Beechwood
              Farm has undergone a series of significant changes. The tracks
              have been replaced by roads. Agricultural elements like the sheep
              area are gone. New additions include a farm shop, parking lots, a
              camping field with tents, holiday cottages, and solar panels. The
              barn has moved southwest of the farmhouse, which remains in place,
              as does the chicken area and the fruit-growing regions. <br />{" "}
              <br /> Overall, Beechwood Farm has shifted from a focus on
              traditional farming to a more diversified use, incorporating
              tourism and modern energy features while retaining some
              agricultural aspects.
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

export default Test2Writing;
