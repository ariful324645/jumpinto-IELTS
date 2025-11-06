import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test4Listening2021 = () => {
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
              Renting a Cottage: Details and Arrangements
            </h1>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> Part 1. You will
              hear a man phoning the owner of a holiday cottage. First, you have
              some time to look at questions 1 to 6. Now listen carefully and
              answer questions 1 to 6.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Hello?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Oh hello. I was hoping to
              speak to Jack Fitzgerald about renting a cottage.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> I'm his wife Shirley,
              and we own the cottages together, so I'm sure I can help you.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Great, my name's Tom. Some
              friends of ours rented Granary Cottage from you last year, and
              they thought it was great. So my wife and I are hoping to come in
              May for a week.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> What date did you have
              in mind?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> The week beginning the
              14th, if possible.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> I'll just check. I'm
              sorry, Tom. It's already booked that week.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                It's free the week beginning the 28th though, for seven nights.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>{" "}
              In fact, that's the only time you could have it in May.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Oh, well, we could manage
              that, I think. We'd just need to change a couple of things. How
              much would it cost?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                That's the beginning of high season, so it'd be £550 for the
                week.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Ah, that's a bit more than
              we wanted to pay, I'm afraid. We've budgeted up to £500 for
              accommodation.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Well, we've just
              finished converting another building into a cottage,
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                which we're calling Chervil Cottage.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Sorry? What was that
              again?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Chervil. C H E R, V
              for Victor, I L.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Oh, that's a herb, isn't
              it?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> That's right. It grows
              fairly wild around here. You could have that for the week you want
              for £480.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> OK, so could you tell me
              something about it, please?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Of course.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The building was built as a garage.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>{" "}
              It's a little smaller than Granary Cottage.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> So that must sleep two
              people as well.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> That's right. There's
              a double bedroom.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Does it have a garden?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> .
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Yes, you get to it from the living room through French doors
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>{" "}
              And we provide two deck chairs. We hope to build a patio soon, but
              I can't guarantee it'll be done by May.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> OK.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                The front door opens onto the old farmyard, and parking isn't a
                problem.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              There's plenty of room at the front for that.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> Before you hear the
              rest of the conversation, you have some time to look at questions
              7 to 10. Now listen and answer questions 7 to 10.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> What about facilities in
              the cottage? It has standard things like a cooker and fridge, I
              presume.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> In the kitchen area,
              there's a fridge freezer. And we've just put in an electric
              cooker.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Is there a washing
              machine?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Yes, there's also a TV
              in the living room which plays DVDs too. The bathroom is too small
              for a bath, so there's a shower instead.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> It's more environmentally
              friendly, isn't it? Unless you spend half the day in it.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Exactly. There's
              central heating, and if you want to light a fire, there's a stove.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                We can provide all the wood you need for it.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
              It smells so much nicer than coal, and it makes the room very
              cozy.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> That sounds very pleasant.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> There are some
              attractive views from the cottage which I haven't mentioned.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                There's a famous stone bridge, one of the oldest in the region,
                and you can see it from the living room.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>{" "}
              It isn't far away
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The bedroom window looks toward the hills and the Monument at
                the top.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> Well, that all sounds
              perfect. I'd like to book it, please. Would you want a deposit?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span> Yes, we ask for 30% to
              secure your booking. So that'll be £144.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">TOM:</span> And when would you like
              the rest of the money?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">SHIRLEY:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                You're coming in May, so the last day of March, please.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
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
            <h1 className="text-2xl font-bold text-center mb-4">
              Holiday rental
            </h1>
            <p className="text-lg">
              Owners' names: Jack Fitzgerald and Shirley Fitzgerald
            </p>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Granary Cottage</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>available for week beginning</span>
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
                <span>may.</span>
              </li>{" "}
              <li className="text-lg">
                <span>cost for the week: £</span>
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
                <span> </span>
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
                <span>Cottage.</span>
              </li>
              <li className=" text-lg">cost for the week: £480</li>{" "}
              <li className="text-lg">
                <span>building was originally a</span>
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
                <span> .</span>
              </li>
              <li className="text-lg">
                <span>walk through doors from living room into a</span>
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
              <li className="text-lg">
                <span>serval</span>
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
                <span>spaces at the front.</span>
              </li>
              <li className="text-lg">
                <span>central heating and stove that burns</span>
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
              <li className="text-lg">
                <span>views of old</span>
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
                <span>from living room.</span>
              </li>
              <li className="text-lg">
                <span>view of hilltop</span>
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
                <span>from the bedroom.</span>
              </li>
              <h2 className="text-lg font-bold mt-6">Payment</h2>
              <li className="text-lg">deposit: £144</li>
              <li className="text-lg">
                <span>deadline for final payment: end of</span>
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
                <span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening2021;
