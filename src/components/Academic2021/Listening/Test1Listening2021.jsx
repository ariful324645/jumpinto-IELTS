import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test1Listening2021 = () => {
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
            Children's Engineering Workshops
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1.You will hear a
            man phoning to find out about some children's engineering
            workshops.First, you have some time to look at questions 1 to 3.Now
            listen carefully and answer questions 1 to 3.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>Hello, children's
            engineering workshops.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>Oh, hello.I wanted some
            information about the workshops in the school holidays.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>Yes, our Tiny Engineers
            workshop is for 4 to 5 year olds.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>What sorts of activities
            do they do?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>All sorts.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              For example, they work together to design a special cover that
              goes round an egg, so that when it's inside, they can drop it from
              a height, and it doesn't break.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            Well, sometimes it does break, but that's part of the fun.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>:Right.And Lydia loves
            building things.Is there any opportunity for her to do that?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, they have a competition to see who can make the highest
              tower.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
            You'd be amazed how high they can go
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>Right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>But they're learning all
            the time as well as having fun.For example, one thing they do is to
            design and build a car that's attached to a balloon.3And the force
            of the air in that actually powers the car, and makes it move
            along.They go really fast too.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>And do they do the same
            sorts of activities?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>Some are the same.But a bit
            more advanced.{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So they work out how to build model vehicles, things like cars and
              trucks, but also how to construct animals using the same sorts of
              material and technique.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
            And then they learn how they can program them and make them move.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>Right.And do they have
            competitions too?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>Yes, with the Junior
            Engineers, it's to use recycled materials like card and wood.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              To build a bridge, and the longest one gets a prize.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>That sounds fun, I
            wouldn't mind doing that myself.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>Then they have something a
            bit different.{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Which is to think up an idea for a 5 minute movie, and then film
              it using special animation software.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
            You'd be amazed what they come up with.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>And of course that's
            something they can put on their phone,and take home to show all
            their friends.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>Exactly.{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And then they also build a robot in the shape of a human, and they
              decorate it and program it so that it can move its arms and legs.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>And are the classes on a
            Monday too?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They used to be, but we found it didn't give our staff enough time
              to clear up after the first workshop, so we moved them to
              Wednesdays.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
            The classes are held in the morning from 10 to 11.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>OK, that's better for me
            actually.And what about the location?Where exactly are the workshops
            held?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>They're in building
            10A.There's a big sign on the door, you can't miss it.{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And that's in Fradstone Industrial Estate.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>And will I have any
            parking problems there?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              No, there's always plenty available.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
            </span>
            So would you like to enroll Lydia and Carly now?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FATHER:</span>ok
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SARAH:</span>So can I have your full
            name?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>That is the end of part
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
              Children's Engineering Workshops
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Tiny Engineers (ages 4-5) <br /> Activities
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Create a cover for an</span>
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
                <span>
                  so they can drop it from a height without breaking it..
                </span>
              </li>

              <li className="text-lg">
                <span>Take part in a competition to build the tallest</span>
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
              <li className="text-lg">
                <span>make a </span>
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
                <span>powered by a balloon..</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Junior Engineers (ages 6-8) <br /> Activities
            </h2>
            <ul className="list-disc list-inside space-y-3">
             
              <li className="text-lg">
                <span>Build model cars, trucks and</span>
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
                <span>and learn how to program them so they can move.</span>
              </li>
              <li className="text-lg">
                <span>Take part in a competition to build the longes</span>
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
                <span>using card and wood.</span>
              </li>{" "}
              <li className="text-lg">
                <span>Create a short</span>
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
                <span>with special software..</span>
              </li>
              <li className="text-lg">
                <span>Build</span>
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
                <span>and program a humanoid robot.</span>
              </li>
              <li className="text-lg">
                <span>Cost for a five-week block: £50 Held on</span>
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
                <span>from 10 AM to 11 AM.</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Location</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Building 10 A</span>
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
                <span>Industrial Estate, Grasford.</span>
              </li>
              <li className="text-lg">
                <span>Plenty of</span>
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
                <span>is available.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Listening2021;
