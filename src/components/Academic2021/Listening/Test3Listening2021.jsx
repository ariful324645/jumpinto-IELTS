import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test3Listening2021 = () => {
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

          {/* left text  */}

          <div className="space-y-5">
            <h1 className="text-2xl font-bold mb-8 text-center">
              Junior Cycle Camp
            </h1>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> Part 1. You will
              hear a woman phoning to ask about a summer cycling camp for her
              young son, who is called Charlie. First you have some time to look
              at questions 1 to 5. Now listen carefully and answer questions 1
              to 5.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Hello, Junior Cycle Camp,
              Jake speaking.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Hi. I'm calling for some
              information about the cycle camp. I'm thinking of sending my son.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Great. Well, it's held
              every weekday morning over the summer vacation. And we focus on
              basic cycling skills and safety. We have eight levels for children
              from 3 years upwards. How old's your son?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Charlie, he's 7. He can
              ride a bike, but he needs a little more training before he's safe
              to go on the road.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> He'd probably be best in
              level 5. They start off practicing on the site here, and we aim to
              get them riding on the road.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But first, they're taken to ride in the park, away from the
                traffic.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Right. And can you tell
              me a bit about the instructors?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Well, all our staff wear
              different colored shirts. So we have three supervisors, and they
              have red shirts. They support the instructors, and they also stand
              in for me if I'm not around.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Then the instructors themselves are in blue shirts.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>{" "}
              And one of these is responsible for each class.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                In order to be accepted, all our instructors have to submit a
                reference from someone who's seen them work with children.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>{" "}
              Like if they've worked as a babysitter for example. Then they have
              to complete our training course, including how to do lesson plans,
              and generally care for the well-being of the kids in their class.
              They do a great job, I have to say.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Right, and tell me a bit
              about the classes. What size will Charlie's class be?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> We have a limit of 8
              children in each class, so their instructor really gets to know
              them well. They're out riding most of the time.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But they have quiet times too, where their instructor might tell
                them a story that's got something to do with cycling,
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>{" "}
              or get them to play a game together. It's a lot of fun.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> It must be.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                What happens if there's rain?
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>{" "}
              Do the classes still run?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Oh yes, we don't let that
              put us off. We just put on our waterproofs and keep cycling.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> Before you hear the
              rest of the conversation, you have some time to look at questions
              6 to 10. Now listen and answer questions 6 to 10.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> And is there anything
              special Charlie should bring along with him?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Well, maybe some spare
              clothes, especially if the weather's not so good.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                A snack for break time.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> How about a drink?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> No, we'll provide that.
              And make sure he has shoes, not sandals.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Sure.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                And just at present, Charlie has to take medication every few
                hours, so I'll make sure he has that.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Absolutely. Just give us
              details of when he has to take it, and we'll make sure he does.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Thanks.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span> Now, there are a few
              things you should know about day one of the camp. The classes
              normally start at 9:30 every morning, but on day one, you should
              aim to get Charlie here by 9:20. The finishing time will be 12:30
              as usual. We need the additional time because there are a few
              extra things to do.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The most important is that we have a very careful check to make
                sure that every child's helmet fits properly.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>{" "}
              If it doesn't fit, we'll try to adjust it, or we'll find him
              another one. But he must wear it all the time he's on the bike.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Of course.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Then after that, all the instructors will be waiting to meet
                their classes, and they'll meet up in the tent.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>{" "}
              You can't miss it. Each instructor will take their class away and
              get started.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK, well that all sounds
              good. Now can you tell me how much the camp costs a week?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">JAKE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                $199.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>{" "}
              We've managed to keep the price more or less the same as last
              year. It was 190 then. But the places are filling up quite
              quickly.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Right. OK, well, I'd
              like to book for the...
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> That is the end of
              part 1. You now have half a minute to check your answers to part
              1.
            </h3>
          </div>
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
          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              JUNIOR CYCLE CAMP
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              The course focuses on skills and safety.
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">Charlie would be placed in Level 5.</li>
              <li className="text-lg">
                <span>
                  First of all, children at this level are taken to practise in
                  a
                </span>
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
            <h2 className="text-lg font-bold mt-6">Instructor</h2>
            <ul className="list-disc list-inside space-y-3">
              {" "}
              <li className="text-lg">
                <span>Instructors wear</span>
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
                <span>shirt.</span>
              </li>
              <li className="text-lg">
                <span>A </span>
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
                <span>is required and training is given..</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Services included in the price
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className=" text-lg">The size of the classes is limited.</li>{" "}
              <li className="text-lg">
                <span>There are quiet times during the morning for a</span>
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
                <span>or a game .</span>
              </li>
              <li className="text-lg">
                <span>Classes are held even if there is</span>
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
            </ul>
            {/* ---------- Section 5 ---------- */}
            <h2 className="text-lg font-bold mt-6">What to bring</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">a change of clothing</li>{" "}
              <li className="text-lg">
                <span>a</span>
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
                <span>.</span>
              </li>
              <li className="text-lg">
                <span>shoes (not sandals) Charlie's</span>
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
                <span>.</span>
              </li>{" "}
            </ul>
            {/* ---------- Section 6 ---------- */}
            <h2 className="text-lg font-bold mt-6">Day 1</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Charlie should arrive at 9.20 am on the first day.
              </li>{" "}
              <li className="text-lg">
                <span>Before the class, his</span>
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
                <span>will be checked.</span>
              </li>
              <li className="text-lg">
                <span>He should then go to the</span>
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
                <span>to meet his class instructor.</span>
              </li>
              <li className="text-lg">
                <span>The course costs $</span>
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
                <span>).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3Listening2021;
