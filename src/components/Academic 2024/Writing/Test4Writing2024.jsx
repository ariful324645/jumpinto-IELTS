import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test4Writing2024 = () => {
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
    <div className="p-6">
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
              The charts below give information on the location and types of
              dance classes young people in a town in Australia are currently
              attending . <br /> <br /> Summarise the information by selecting
              and reporting the main features, and make comparisons where
              relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-90 h-auto"
                src="https://i.ibb.co.com/4gNm8f0g/w4-2024.jpg"
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
              Dance Classes in an Australian Town: Location and Age-related
              Preferences
            </h1>
            <p className="mt-5">
              The provided charts offer insights into the location and types of
              dance classes attended by young people in an Australian town.{" "}
              <br /> <br /> In terms of the location of dance classes, as
              depicted in the pie chart, private studios emerge as the most
              favored venue, accommodating nearly half (48%) of all dance
              classes. School halls (after-school) follow, accounting for 24% of
              the total. Community halls and other locations jointly constitute
              18%, while college-based studios are the least utilized,
              representing a mere 10%. <br /> <br /> The bar chart presents a
              breakdown of the types of dance classes by age group. Ballet
              attracts a significantly larger number of students under 11 (over
              600) compared to 11-16-year-olds (around 300). In contrast, for
              tap dance, 11-16-year-olds (approximately 450) outnumber those
              under 11 (around 420) slightly. Modern dance shows an inverse
              pattern, with around 500 students aged 11-16 and only about 300
              students under 11. <br /> <br /> Overall, it is evident that
              private studios are the dominant choice for dance-class locations.
              Moreover, different dance types have distinct appeal across age
              groups, with ballet being more popular among younger students, tap
              dance having a slight edge among older students, and modern dance
              showing a preference for the 11-16 age bracket.
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

export default Test4Writing2024;
