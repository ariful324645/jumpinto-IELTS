import React, { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Test1Writing = () => {
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
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TASK 1</h1>
          </div>

          <div className="">
            <h1 className="text-xl mb-4">
              You should spend about 20 minutes on this task.
            </h1>
            <p className="text-lg p-5 font-bold italic border-2 border-black">
              The first table below shows changes in the total population of New
              York City from 1800 to 2000. The second and third tables show
              changes in the population of the five districts of the city
              (Manhattan, Brooklyn, Bronx, Queens, Staten Island) over the same
              period.
              <br /> <br />
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </p>

            <p className="text-lg mt-4">Write at least 150 words.</p>
            <br />

            {/* table 1 */}
            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2"></th>
                  <th className="border border-gray-400 p-2">
                    New York City(all five district)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">Year</td>
                  <td className="border border-gray-400 p-2"> Population</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">1800</td>
                  <td className="border border-gray-400 p-2">79,270</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">1900</td>
                  <td className="border border-gray-400 p-2">3,437,203</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">2000</td>
                  <td className="border border-gray-400 p-2">8,009,185</td>
                </tr>
              </tbody>
            </table>

            <br />

            {/* table 2 */}
            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2"></th>
                  <th colSpan="2" className="border border-gray-400 p-2">
                    New York City(all five district)
                  </th>
                </tr>
                <tr>
                  <th className="border  p-2">Year</th>
                  <th className="border p-2">Population</th>
                  <th className="border p-2">
                    As percentage(%) of total population
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">1800</td>
                  <td className="border border-gray-400 p-2">60,515</td>
                  <td className="border border-gray-400 p-2">76%</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">1900</td>
                  <td className="border border-gray-400 p-2">1,850,093</td>
                  <td className="border border-gray-400 p-2">54%</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">2000</td>
                  <td className="border border-gray-400 p-2">1,538,076</td>
                  <td className="border border-gray-400 p-2">17%</td>
                </tr>
              </tbody>
            </table>

            <br />

            {/* table 3 */}
            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2"></th>
                  <th colSpan="2" className="border border-gray-400 p-2">
                    New York City(all five district)
                  </th>
                </tr>
                <tr>
                  <th className="border  p-2">Year</th>
                  <th className="border p-2">Population</th>
                  <th className="border p-2">
                    As percentage(%) of total population
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">1800</td>
                  <td className="border border-gray-400 p-2">18,701</td>
                  <td className="border border-gray-400 p-2">24%</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">1900</td>
                  <td className="border border-gray-400 p-2">1,586,109</td>
                  <td className="border border-gray-400 p-2">46%</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">2000</td>
                  <td className="border border-gray-400 p-2">6,571,089</td>
                  <td className="border border-gray-400 p-2">81%</td>
                </tr>
              </tbody>
            </table>

            <br />
            <hr className="border border-gray-400" />
            <br />
            <p>Sample Writing Answer</p>
            <br />
            <h1 className="text-xl text-center  font-bold ">
              Population Changes in New York City and Its Five Districts (1800 -
              2000)
            </h1>
            <p className="mt-5">
              The tables detail population changes in New York City and its
              districts (Manhattan; Brooklyn, Bronx, Queens, Staten Island) from
              1800 to 2000. <br /> Overall, New York City's total population
              soared over these two centuries. Manhattan's population share
              declined, while the other districts' population and share surged.{" "}
              <br /> In 1800, the city had 79,216 people. By 1900, this jumped
              to 3,437,202, and further to 8,009,185 in 2000. <br /> Manhattan
              held 60,515 residents (76% of the total) in 1800. By 1900, its
              population grew to 1,850,093 but its share dropped to 54%. By
              2000, it fell to 1,538,096, making up just 19% of the total.{" "}
              <br /> The other districts had 18,701 people (24% of the total) in
              1800. In 1900, their population reached 1,587,109 (46% of the
              total). By 2000, it soared to 6,471,089, accounting for 81% of the
              city's population. <br /> In short, New York City's overall
              population expanded dramatically. Manhattan's demographic
              influence waned, while the other districts became far more
              populous and dominant in the city's makeup.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">
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

export default Test1Writing;
