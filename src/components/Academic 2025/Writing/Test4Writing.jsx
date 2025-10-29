import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Test4Writing = () => {
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
              The diagram below shows how fabric is manufactured from bamboo.{" "}
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
            <p>Sample Writing Answer</p>
            <br />
            <h1 className="text-xl text-center  font-bold ">
              How Bamboo Fabric Is Made
            </h1>
            <p className="mt-5">
              This diagram illustrates the step-by-step process of making fabric
              from bamboo, which consists of several distinct stages spanning
              from cultivation to the creation of final products. <br /> <br /> The process
              commences in spring with planting bamboo plants, allowing them
              sufficient time to grow before harvest. In autumn, when the bamboo
              reaches maturity, it is carefully harvested. Subsequently, the
              harvested bamboo is cut into thin strips to facilitate further
              processing, and these strips are then crushed mechanically to form
              a liquid pulp. After that, the pulp undergoes a thorough filtering
              process to separate long, usable fibres from the liquid. <br /> <br /> Next, the
              extracted fibres are softened by mixing them with water and amine
              oxide, a substance that helps enhance their flexibility. Following
              this treatment, the softened fibres are spun into continuous yarn
              using specialized spinning equipment. The yarn is then woven on
              looms to create fabric, which can ultimately be made into a
              variety of bamboo-fabric products like T-shirts, socks, and other
              clothing items. <br /> <br /> Overall, the production of bamboo fabric involves
              multiple stages, from bamboo cultivation and harvesting to fibre
              processing, spinning, weaving, and final product manufacturing,
              transforming raw bamboo into practical and comfortable textile
              materials.
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

export default Test4Writing;
