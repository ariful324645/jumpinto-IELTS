import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




import Writing1Pagination2011 from "../Pagination 2011/Writing1Pagination2011";

const Writing1Part22011 = () => {
  const [message, setMessage] = useState("");
  const [sentenceCount, setSentenceCount] = useState(0);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const [openScript, setOpenScript] = useState(true);

  // The key used by the home page
  const storageKey = "/Writing1Part22018";

  // Load mark from localStorage if it exists
  const [mark, setMark] = useState(
    Number(localStorage.getItem(storageKey)) || null
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Count words
    const rawWords = message.split(/\s+/).filter((s) => s.length > 0);
    const wordCount = rawWords.length;

    setSentenceCount(wordCount);

    if (wordCount < 1) {
      toast.warn("Please write at least one word!", { autoClose: 3000 });
    } else {
      toast.success(`You wrote ${wordCount} words`, { autoClose: 3000 });
    }

    // Set mark if more than 5 words
    const newMark = wordCount > 5 ? 1 : null;
    setMark(newMark);

    // Save mark in localStorage using the home page key
    if (newMark !== null) {
      localStorage.setItem(storageKey, newMark);
    } else {
      localStorage.removeItem(storageKey);
    }

    setSubmittedMessage(message);
  };

  return (
    <div className="px-3">
      <div className="flex gap-6 ">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-[1000px]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TASK 2</h1>
          </div>

          <div className="">
            <h1 className="text-xl mb-4">
              You should spend about 40 minutes on this task.
            </h1>
            <p className="text-xl mb-4">Write about the following topic:</p>
            <p className="text-lg p-5 font-bold italic border-2 border-black">
              Some people think that parents should teach children how to be
              good members of society. Others, however, believe that school is
              the place to learn this. <br /> <br /> Discuss both these views
              and give your own opinion.
            </p>
            <p className="text-xl my-4">
              Give reasons for your answer and include any relevant examples
              from your own knowledge or experience.
            </p>
            <p className="text-lg mt-4">Write at least 250 words.</p>
            <br />

            <br />
            <hr className="border border-gray-400" />
            <br />

            <div className="flex justify-between items-center">
              <p onClick={() => setOpenScript(!openScript)}>
                Sample Writing Answer
              </p>
              <span onClick={() => setOpenScript(!openScript)}>
                <IoIosArrowDown size={20} />
              </span>
            </div>
            <br />
            {/* left text */}
            {openScript ? (
              <div>
                <h1 className="text-xl text-center font-bold">
                  Parents or School: Who Should Teach Children to Be Good Social
                  Members?
                </h1>
                <p className="mt-5">
                  The responsibility of shaping children into responsible
                  community members sparks debate between family-centered and
                  school-based approaches. While both institutions play crucial
                  roles, their contributions differ in nature and scope, making
                  them complementary rather than conflicting forces. <br /> <br /> Proponents
                  of parental guidance rightly emphasize the formative power of
                  home environments. Through daily interactions, children absorb
                  fundamental moral frameworks - whether learning table manners
                  demonstrates respect for others, or observing parents assist
                  elderly neighbors models community care. These organic lessons
                  in empathy and social consciousness often predate formal
                  education, forming what psychologists call "moral intuition."
                  A child raised in a household that values honesty and kindness
                  will likely carry these traits into adulthood, regardless of
                  subsequent influences.  <br /> <br /> Schools, however, provide structured
                  socialization that families cannot replicate. Classroom group
                  projects teach collaborative problem-solving, while
                  school-organized community services like park clean-ups or
                  charity drives offer practical citizenship training.
                  International studies show students participating in peer
                  mediation programs develop stronger conflict-resolution skills
                  than those solely relying on family teachings. Educational
                  institutions also expose children to diverse perspectives
                  through multicultural curricula, preparing them for societal
                  participation beyond their immediate cultural bubble. In
                  reality, effective character education requires synergy
                  between both spheres. Parents establish core values through
                  emotional bonding and consistent modeling, while schools
                  refine these values through systematic practice in broader
                  social contexts.  <br /> <br /> For instance, a child taught generosity at
                  home can expand this virtue through school-organized donation
                  drives for disaster victims. Conversely, schools emphasizing
                  environmental responsibility rely on families to reinforce
                  these lessons through home recycling practices. Ultimately,
                  expecting either parents or schools to single-handedly
                  cultivate social responsibility creates unnecessary
                  limitations. Like two wings enabling a bird's flight, family
                  nurturing and educational systems must work in concert to
                  raise socially conscious individuals. Society benefits most
                  when homes plant the seeds of morality and schools provide the
                  soil for these values to grow and bear fruit.
                </p>
              </div>
            ) : (
              <>
                {" "}
                <hr className=" border border-gray-400 border-dotted" />
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll h-[1000px]">
          <textarea
            rows="16"
            placeholder="Please input"
            className="border border-gray-400 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="flex justify-between p-4">
            <h3 className="mt-3">Words: {sentenceCount}</h3>
            <input
              onClick={handleSubmit}
              type="submit"
              value="Submit for Feedback"
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-600 transition"
            />
          </div>

          {/* MARK */}
          {mark !== null && (
            <div className="flex justify-center mt-4">
              <div className="bg-green-100 text-green-800 px-8 py-4 rounded-2xl font-bold shadow-lg">
                Mark: {mark}
              </div>
            </div>
          )}

          {/* Submitted Message */}
          <h1 className="text-2xl font-bold mt-6">Writing Feedback</h1>
          <div className="bg-gray-300 p-5 mt-4 rounded-lg min-h-[100px]">
            <p>{submittedMessage}</p>
          </div>

          <ToastContainer />
        </div>
      </div>
      <Writing1Pagination2011></Writing1Pagination2011>
      {/* <Writing1Pagination2013></Writing1Pagination2013> */}
    </div>
  );
};

export default Writing1Part22011;
