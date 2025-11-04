import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test3Writing2023 = () => {
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
              The diagram below shows the floor plan of a public library 20
              years ago and how it looks now. <br /> <br /> Summarise the
              information by selecting and reporting the main features, and make
              comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="h-96 w-96"
                src="https://i.ibb.co.com/PvBvsZkm/w3-2023.jpg"
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
              Transformation of Central Library Layout over 20 Years
            </h1>
            <p className="mt-5">
              The diagrams illustrate the transformation of the Central
              Library's layout over a span of two decades. The most striking
              change is the modernization of the library to accommodate
              technological advancements and the evolving needs of its patrons.{" "}
              <br /> <br />
              Twenty years ago, the library was primarily divided into sections
              for different types of books and media. The children's section was
              specifically dedicated to books, while a separate section was
              allocated for CDs, videos, and computer games. The adult section
              was bifurcated into fiction and non-fiction books. A reading room
              was available for newspapers and magazines, and an enquiry desk
              handled tickets and book returns. <br /> <br /> Fast forward to
              the present day, the library has undergone significant changes.
              The children's section now exclusively contains fiction books, and
              storytelling events are a new addition. The adult section remains
              dedicated to fiction books, but all reference books are now
              consolidated into a single area. The enquiry desk has been
              replaced by self-service machines, reflecting the shift towards
              automation. Notably, the library has expanded its services to
              include a computer room and a café, catering to the digital needs
              and comfort of its users. A lecture room has also been introduced,
              indicating a focus on educational events. <br /> <br /> In
              conclusion, the Central Library has evolved over the past 20
              years, transitioning from a traditional book-centric model to a
              more diverse, user-friendly hub that embraces technology and
              community engagement. This transformation reflects broader
              societal changes and the dynamic role of libraries in the 21st
              century.
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

export default Test3Writing2023;
