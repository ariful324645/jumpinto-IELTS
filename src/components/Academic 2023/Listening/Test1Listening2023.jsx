import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test1Listening2023 = () => {
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
          <h1 className="text-xl font-bold text-center">Transport Survey</h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear
            an interview with a woman who is doing a survey on transport.First,
            you have some time to look at questions 1 to 5.Now listen carefully
            and answer questions 1 to 5.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Excuse me, would you mind if
            I asked you some questions?We're doing a survey on transport.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>Yes, that's OK
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>First of all can I take your
            name?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> Yes, it's Sadie Jones.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Thanks very much.And could I
            have your date of birth?Just the year will do, actually.Is that all
            right?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> Uh. Yes, that's fine.It's
            1991.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> So, next your post code
            please.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's DW307YZ.1
              {highlight && "(1)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Great, thanks.Is that in
            Wells?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> No, it's actually in
            Harborne.Wells isn't far from there, though.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>I really like that area.My
            grandmother lived there when I was a kid.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> Yes, it is nice.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Right, so now I want to ask
            you some questions about how you traveled here today.Did you use
            public transport?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> Yes, I came by bus.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> OK, and that was today.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's the 24th of April, isn't it?
              {highlight && "(2)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> Isn't it the 25th uh, no,
            ha, actually you're right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Ha ha ha.And what was the
            reason for your trip today?I can see you've got some shopping with
            you.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes, I did some shopping, but the main reason I came here was to
              go to the dentist.
              {highlight && "(3)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>That's not much fun.Hope it
            was nothing serious.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>No, it was just a
            check-up.It's fine.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>Good.Do you normally travel
            by bus into the city center?.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes, I stopped driving ages ago, because parking was so difficult
              to find, and it cost so much.
              {highlight && "(4)"}
            </span>{" "}
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>I see.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>The bus is much more
            convenient too. It only takes about 30 minutes.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>That's good.So where did you
            start your journey?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              At the bus stop on Claxby Street.
              {highlight && "(5)"}
            </span>{" "}
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>Is that CLAXBY?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            That's right.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Before you hear the
            rest of the conversation, you have some time to look at questions 6
            to 10.Now listen and answer questions 6 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> And how satisfied with the
            service are you?Do you have any complaints?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> Well, as I said, it's very
            convenient and quick when it's on time.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              But this morning it was late, only about 10 minutes, but still.
              {highlight && "(6)"}
            </span>{" "}
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            Yes, I understand that's annoying.And what about the timetable?Do
            you have any comments about that?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            Hmm, I suppose I mainly use the bus during the day, but anytime I've
            been in town in the evening.Uh. For dinner or at the cinema
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              .I've noticed you have to wait a long time for a bus.
              {highlight && "(7)"}
            </span>{" "}
            Uh. There aren't that many.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> OK, thanks.So now, I'd like
            to ask you about your car use.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            Well, I have got a car, but I don't use it that often.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Mainly just to go to the supermarket.
              {highlight && "(8)"}
            </span>{" "}
            But that's about it really.My husband uses it at the weekends to go
            to the golf club.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> And what about a bicycle?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>I don't actually have one
            at the moment.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>What about the city bikes you
            can rent?Do you ever use those?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              No, I'm not keen on cycling there because of all the pollution.
              {highlight && "(9)"}
            </span>
            But I would like to get a bike.It would be good to use it to get to
            work.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> So, why haven't you got one
            now?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SADIE:</span> :Well, I live in a flat on
            the 2nd floor.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And it doesn't have any storage, so we'd have to leave it in the
              hall outside the flat.
              {highlight && "(10)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> I see.OK, well I think
            that's all we need from you today...
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1.You now have one minute to check your answers to part 1.
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
              Transport survey
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Name: Sadie Jones</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">Year of birth: 1991</li>
              <li className="text-lg">
                <span>Postcode::</span>
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
                <span>hectares</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Travelling by bus</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Date of bus journey:</span>
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
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>Reason for trip: shopping and visit to the</span>
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
                <span>and compass</span>
              </li>

              <li className="text-lg">
                <span>Travelled by bus because cost of</span>
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
                <span>too high.</span>
              </li>

              <li className="text-lg">
                <span>Got on bus at</span>
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
                <span>street.</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Complaints about bus service:
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>bus today was</span>
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
                <span>frequency of buses in the</span>
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
            <h2 className="text-lg font-bold mt-6">Travelling by car</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Goes to the</span>
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
                <span>by car.</span>
              </li>
            </ul>
            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Travelling by bicycle</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  Dislikes travelling by bike in the city centre because of the
                </span>
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
                <span>.</span>
              </li>
              <li className="text-lg">
                <span>Doesn't own a bike because of a lack of</span>
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

export default Test1Listening2023;
