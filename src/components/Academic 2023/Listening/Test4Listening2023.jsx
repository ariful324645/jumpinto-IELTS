import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test4Listening2024 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex relative group justify-between items-center">
            <h1 className="text-xl font-bold">PART 1</h1>
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight(!highlight)}
              className="toggle toggle-accent"
            />
            <span className="absolute -top-7 right-6 text-left bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Toggle guided mode
            </span>
          </div>

          <div>
            <audio controls className="mt-2 w-7/12">
              <source type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <hr />
          <p>Audio Script</p>
          <h1 className="text-xl font-bold text-center">
            Job Details from Employment Agency
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            man who works at an employment agency, phoning a woman who is
            looking for a job.First, you have some time to look at questions 1
            to 5.Now listen carefully and answer questions 1 to 5.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Hello?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>Oh, hello. Is that Julie
            Davison?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Yes.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span> This is Greg Preston from
            the Employment Agency.We met last week when you came in to enquire
            about office work.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Oh, that's right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span> Now we've just had some
            details come in of a job which might interest you.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              OK, so this is a position for a receptionist.
              {highlight && "(1)"}
            </span>
            I believe you've done that sort of work before.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Yes, I have.I worked in a
            sports center for a couple of years before I got married and had the
            children.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, this job's in Fordham, so not too far away for you, and it's
              at the medical center there.
              {highlight && "(2)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> OK, so where exactly is
            that?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>It's quite near the station
            on Chastons Road.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> sorry?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Chastons Road.
              {highlight && "(3)"}
            </span>
            That's CHASTONS.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span>OK, thanks.So what would
            the work involve?Dealing with enquiries from patients?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span> Yes.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And you'd also be involved in making appointments, whether face to
              face or on the phone, and rescheduling them if necessary.
              {highlight && "(4)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span>Fine.That shouldn't be a
            problem.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And another of your duties would be keeping the center's database
              up-to-date.
              {highlight && "(5)"}
            </span>
            Then you might have other general administrative duties as well.But
            those would be the main ones.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> ok.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER::</span> Before you hear the
            rest of the conversation, you have some time to look at questions 6
            to 10.Now listen and answer questions 6 to 10.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Now, when the details came in, I immediately thought of you,
              because one thing they do require is someone with experience.
              {highlight && "(6)"}
            </span>
            And you did mention your work at the sports center when you came in
            to see us.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Yes, in fact, I enjoyed
            that job.Is there anything else they're looking for?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span> Well, they say it's quite
            a high-pressure environment.They're always very busy, and patients
            are often under stress.So they want someone who can cope with that.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And stay calm, and at the same time, be confident when interacting
              with the public.
              {highlight && "(7)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span>Well, after dealing with
            three children all under 5, I reckon I can cope with that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span> I'm sure you can.And then
            another thing they mention is that they're looking for someone with
            good IT skills...
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Not a problem.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span> So you'd be interested in
            following this up?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Sure.When would it start?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>Well, they're looking for
            someone from the beginning of next month.But I should tell you that
            this isn't a permanent job.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's temporary.
              {highlight && "(8)"}
            </span>
            So the contract would be just to the end of September, but they do
            say that there could be further opportunities after that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> Yes, my husband would
            have to get the kids up and off to my mother's.She's going to be
            looking after them while I'm at work.What time would I finish?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG::</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              One fifteen.
              {highlight && "(9)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE::</span> That should work out all
            right.I can pick the kids up on my way home, and then I'll have the
            afternoon with them.Oh, one thing.Is there parking available for
            staff at the center?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG: </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes, there is.
              {highlight && "(10)"}
            </span>
            And it's also on a bus route.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE:</span> Right.Well, I expect I'll
            have the car, but it's good to know that.OK, so where do I go from
            here?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG:</span> Well, if you're happy for
            me to do so, I'll forward your CV and references.And then the best
            thing would probably be for you to phone them, so they can arrange
            for an interview.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE:</span>Great.Well, thank you very
            much.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">GREG:</span>You're welcome.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JULIE:</span> Bye now.Bye.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>That is the end of part
            1.You now have one minute to check your answers to part 1.
          </h3>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}

            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>
              {/* Tooltip */}

              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Clear answer
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to clear all answers?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        No, keep them
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Yes, clear them
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h2 className="text-lg font-bold mb-3">Questions 1–10</h2> <br />
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Job details from employment agency
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Role:</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span></span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Location</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Fordham</span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>centre.</span>
              </li>

              <li className="text-lg">
                <span></span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>Road, Fordham.</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">Work involves</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">dealing with enquiries</li>
              <li className="text-lg">
                <span>making</span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>and reorganising them</span>
              </li>

              <li className="text-lg">
                <span>maintaining the internal</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
              <li className="text-lg">general administration</li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Requirements</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span></span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>(essential)</span>
              </li>

              <li className="text-lg">
                <span>a calm and</span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>manner.</span>
              </li>
              <li className="text-lg">good IT skills</li>
            </ul>
            {/* ---------- Section 5 ---------- */}
            <h2 className="text-lg font-bold mt-6">Other information</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>a</span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>job - further opportunities may be available</span>
              </li>

              <li className="text-lg">
                <span>hours: 7.45 a.m. to</span>
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>PM monday to friday</span>
              </li>
              <li className="text-lg">
                <span></span>
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>is available onsite.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening2024;
