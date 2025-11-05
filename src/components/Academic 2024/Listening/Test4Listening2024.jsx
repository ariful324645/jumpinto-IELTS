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

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-4 overflow-y-scroll">
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
            Charlotte's First Day at the Supermarket
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear
            two neighbors who live in an apartment block talking about shopping
            for food.First you have some time to look at questions 1 to 6.Now
            listen carefully and answer questions 1 to 6.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span> Hello, Charlotte.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I'm Kaeden, one of the supervisors.
              {highlight && "(1)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>Hi, Aiden.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>Uh. It's Kaeden.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span> I'm so sorry.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span> Oh, don't worry.People
            often get my name wrong, ha ha.They never know how to spell it.It's
            K A E D E N, in case you ever need to write it.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span> Uh. The email I
            received said to go to the front desk to show my letter of
            appointment and pick up my badge.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>You'll need that for the
            staffroom and other areas of the supermarket where shoppers aren't
            allowed.So, after you've finished at the front desk, I'll take you
            to the staffroom.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Put your coat and rucksack in one of the lockers there, uh, take
              whichever one is free.
              {highlight && "(2)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>
            Will I have a key?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            You also need to go to the HR department to see Tiffany.She's really
            helpful.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I was told to bring my passport with me.
              {highlight && "(3)"}
            </span>
            HR need to take a note of the number in it.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>That's right.Or you can
            show your ID card.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>I don't have one of
            those.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              OK, Tiffany will give you a uniform.
              {highlight && "(4)"}
            </span>
            Uh. They have lots in different sizes, so you just tell her what you
            need.I won't come with you to HR.I've got to go and sort something
            else out.Um. Problem with a bread slicer.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>Is the HR office near
            the staffroom?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The staffroom is on the first floor, and HR are a couple of floors
              above that, on the third floor.
              {highlight && "(5)"}
            </span>
            There's a staircase outside the staffroom.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span> OK.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            Uh. I'll just give you my phone number in case you can't find me.Uh.
            Have you got your phone there?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>Uh. Yes, uh OK, ready?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's oh four one two double six five nine oh three (0412665903).
              {highlight && "(6)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>
            OK.Done.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>So, Charlotte, your tasks
            today are in the bakery section, on the sushi counter, and on the
            meat and fish counters.The first job is to check sell-by dates on
            the bread and cakes.If any of the dates are today's, put a new price
            label on the packaging.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>
            What if any of the labels are yesterday's dates or older?Do I throw
            those items away?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            Yes, but that shouldn't happen.We check the stock every day.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              When something needs a new price label, put a yellow one on the
              package next to the original price.
              {highlight && "(7)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span> OK.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>Uh. For today, you'll just
            be helping the staff..
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>
            Yes, of course.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            You'll see lots of flat-cardboard boxes at one end of the counter.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Beneath those is where we keep the plastic boxes.
              {highlight && "(8)"}
            </span>
            We run out of those really quickly, so you should bring more from
            the storeroom.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>Is that my only task on
            the sushi counter?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span> Uh. Finally the meat and
            fish counters, you need to clean the area where staff serve
            customers, including wiping the weighing scales.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span> OK.Anything else?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Um. The fish is laid on ice, but when that starts to melt, you'll
              need to get more from the cold-room.
              {highlight && "(9)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span>I know the staff on the
            food counters wear a hat.Will that be the same for me?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">KAEDEN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You won't be serving customers directly, so, no, but make sure you
              put on thermal gloves when you take anything out of the cold-room.
              {highlight && "(10)"}
            </span>
            The temperature's low enough in there to get frostbite from touching
            things.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CHARLOTTE:</span> Understood.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1.You now have one minute to check your answers to part 1.
          </h3>
        </div>

        {/* right div */}
        <div className="w-1/2 bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-lg cursor-pointer"
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

          <h2 className="text-lg font-bold mb-3">Questions 1–6</h2>
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">
              First day at work
            </h1>

            <h2 className="text-lg font-bold mt-6">Name of supervisor:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block"></span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">
              Where to leave coat and bag:
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Use</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>in staffroom</span>
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">See Tiffany in HR:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">to give</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>number</span>
              </li>

              <li className="text-lg">
                <span className="inline-block">to collect</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>outside</span>
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">Location of HR office:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">On</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>floor.</span>
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">
              Supervisor's mobile number:
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block"></span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
            </ul>
          </div>

          {/* TABLE SECTION */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">Questions 7–10</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE WORD</span> for each answer.
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
              <thead>
                <tr>
                  <th colSpan="4" className="border text-lg font-bold p-2">
                    Responsibilities
                  </th>
                </tr>
                <tr>
                  <th className="border text-lg p-2"></th>
                  <th className="border text-lg p-2">Task1</th>
                  <th className="border text-lg  p-2">Task2</th>
                  <th className="border text-lg  p-2">Task3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border text-lg p-2">Bakery section</td>
                  <td className="border text-lg  p-2">Check sell-by dates</td>
                  <td className="border text-lg  p-2">Change price labels</td>
                  <td className="border text-lg  p-2">
                    <span>Use</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>labels</span>
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg  p-2">
                    Sushi takeaway counter
                  </td>
                  <td className="border text-lg  p-2">
                    <span>Re-stock with</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>boxes if needed</span>
                  </td>
                  <td className="border text-lg  p-2">
                    Wipe preparation area and clean the sink
                  </td>
                  <td className="border text-lg  p-2">
                    Do not clean any knives
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg  p-2">
                    Meat and fish counters
                  </td>
                  <td className="border text-lg  p-2">
                    Clean the serving area, including the weighing scales
                  </td>
                  <td className="border text-lg  p-2">
                    <span>Collect</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>for the fish from the cold-room</span>
                  </td>
                  <td className="border text-lg  p-2">
                    <span>Must wear special</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening2024;
