import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test1Listening2022 = () => {
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
            Buckworth Conservation Group
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            woman called Jan, phoning a man about their local conservation
            group.First, you have some time to look at questions 1 to 5.Now
            listen carefully and answer questions 1 to 5.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>Hello
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>Oh hello, my name is Jan.Are
            you the right person to talk to about the Buckworth Conservation
            Group?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>Good, I've just moved to this
            area, and I'm interested in getting involved.I was in a similar
            group where I used to live.Could you tell me something about your
            activities, please?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>Of course.Well we have a
            mixture of regular activities and special events.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              One of the regular ones is trying to keep the beach free of
              litter.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            A few of us spend a couple of hours a month on it.And it's awful how
            much there is to clear.I wish people would be more responsible and
            take it home with them.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>I totally agree.I'd be happy
            to help with that.Is it OK to take dogs?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I'm afraid not, as they're banned from the beach itself.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
            You can take them along the cliffs though, and children are welcome.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>Right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>We also manage a nature
            reserve, and there's a lot to do there all year round.Uh. For
            example, because it's a popular place to visit, we spend a lot of
            time looking after the paths.And making sure they're in good
            condition for walking.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>I could certainly help with
            that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>Good.And we have a program
            of creating new habitats there.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              We've just finished making and installing nesting boxes for birds
              to use, and next we're going to work on encouraging insects.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
            They're important for the biodiversity of the reserve.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>They certainly are.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Oh, and we're also running a project to identify the different
              species of butterflies that visit the reserve.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
            You might be interested in taking part in that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>Sure, I was involved in
            something similar where I used to live, counting all the species of
            moths.I'd enjoy that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Another job we're doing at the reserve is replacing the wall on
              the southern side.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
            Between the parking area and our woodshed, it was badly damaged in a
            storm last month.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>ok
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Before you hear the
            rest of the conversation, you have some time to look at questions 6
            to 10.Now listen and answer questions 6 to 10.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>Then, as I said, we have a
            program of events as well, both at the weekend and during the week.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>Right.I presume you have
            guided walks.I'd like to get to know the local countryside, as I'm
            new to the area.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>Yes, we do.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The next walk is to Ruston Island a week on Saturday.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
            We'll be meeting in the car park at Dunsmore Beach at low
            tide.That's when the sands are dry enough for us to walk to the
            island without getting wet.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>OK. And is there anything we
            should bring?Like a picnic for instance.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes, do bring one, as it's a full-day walk, and of course it'll be
              wet walking across and back, so make sure your boots are
              waterproof.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>I must buy a new pair.There's
            a hole in one of my current ones.Well, I'd definitely like to come
            on the walk
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Definitely, there'll be a couple of experts leading the session,
              and we keep the number of participants down, so you'll get as much
              help as you need.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>Excellent! I'd love to be
            able to make chairs.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>Ha. That's probably too
            ambitious for one day!
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You'll be starting with wooden spoons, and of course learning how
              to use the tools, and anything you make is yours to take home with
              you.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>That sounds like fun.When is
            it?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">PETER:</span>It's on the 17th, from 10
            a.m. until 3.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There's a charge of £35 including lunch,
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
            </span>
            or £40, if you want to camp in the wood.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JAN:</span>I should think I'll come home
            the same day.Well, I'd certainly like to join the group.It sounds
            like you've...
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER</span>That is the end of part
            1.You now have half a minute to check your answers to part 1.
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
          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Buckworth Conservation Group
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Regular activities <br /> Beach
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>making sure the beach does not have:</span>
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
                <span>on it.</span>
              </li>

              <li className="text-lg">
                <span>no</span>
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
                <span></span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Nature reserve</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">maintaining paths</li>
              <li className="text-lg">nesting boxes for birds installed</li>
              <li className="text-lg">
                <span>next task is taking action to attract</span>
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
                <span>to the place.</span>
              </li>

              <li className="text-lg">
                <span>identifying types of</span>
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
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>building a new</span>
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
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Forthcoming events <br /> Saturday
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">meet at Dunsmore Beach car park</li>
              <li className="text-lg">
                <span>walk across the sands and reach the</span>
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
                <span>wear appropriate</span>
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
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Woodwork session</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>suitable for</span>
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
                <span>to participate in.</span>
              </li>
              <li className="text-lg">
                <span>Making </span>
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
                <span>out of it.</span>
              </li>

              <li className="text-lg">
                <span>cost of session (no camping): £</span>
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
                <span>.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Listening2022;
