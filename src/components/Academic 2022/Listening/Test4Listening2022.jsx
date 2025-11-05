import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test4Listening2022 = () => {
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
            Easy Life Cleaning Services
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            man phoning to inquire about a cleaning service for his
            apartment.First, you have some time to look at questions 1 to 5.Now
            listen carefully and answer questions 1 to 5.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Hello, Easy Life Cleaning
            Services, Jacinta speaking.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>Oh, hello.I'm looking for
            a cleaning service for my apartment.Do you do domestic cleaning?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Sure
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>Well, it's just a 1
            bedroom flat.Do you have a basic cleaning package?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Yes, for a 1 bedroom
            flat, we're probably looking at about 2 hours for a clean.So we'd do
            a thorough clean of all surfaces in each room, and polish them where
            necessary.Does your apartment have carpets?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              No, I don't have any, but the floor would need cleaning.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Then we have some
            additional services, which you can request if you want,so for
            example, we can clean your oven for you every week.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Actually, I hardly ever use that, but can you do the fridge?
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It wouldn't be much, just my shirts for work that week.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>That's fine, and we could
            also clean your microwave if you want.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>No, I wipe that out pretty
            regularly, so there's no need for that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>We also offer additional
            services that you might want a bit less often, say every month.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So for example, if the inside of your windows need cleaning, we
              could do that.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>Yes, that'd be good.I'm on
            the 15th floor, so the outside gets done regularly by specialists,
            but the inside does get a bit grubby.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>And we could arrange for
            your curtains to get cleaned if necessary.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>No, they're OK.But would
            you be able to do something about the balcony?{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's quite small, and I don't use it much, but it could do with a
              wash every month or so.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Yes, we can get the
            pressure washer onto that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Before you hear the
            rest of the conversation, you have some time to look at questions 6
            to 10.Now listen and answer questions 6 to 10.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>:Now, if you're
            interested, we do offer some other possibilities to do with general
            maintenance.For example, if you have a problem with water, and you
            need a plumber in a hurry,{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              we can put you in touch with a reliable one who can come out
              straightaway. And the same thing if you need an electrician.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>Right, that's good to
            know.I've only just moved here, so I don't have any of those sorts
            of contacts.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And I don't know if this is of interest to you, but we also offer
              a special vacuum cleaning system, which can improve the indoor air
              quality of your home by capturing up to 99% of all the dust in the
              air.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
            So, if you're troubled by allergies, this can make a big difference.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>Right.In fact, I don't
            have that sort of problem, but I'll bear it in mind.Now, can you
            tell me a bit about your cleaning staff?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Of course, so all our
            cleaners are very carefully selected.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              When they apply to us, they have to undergo a security check with
              the police to make sure they don't have any sort of criminal
              background.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
            And of course they have to provide references as well.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Then if we think they might be suitable for the job, we give them
              training for it.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
            That lasts for two weeks, so it's very thorough.And at the end of
            it, they have a test.If they pass that, we take them on, but we
            monitor them very carefully.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              We ask all our clients to complete a review of their performance
              after every visit.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
            </span>
            And to email it to us, so we can pick up any problems straightaway
            and deal with them.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>OK, well, that all sounds
            good.And will I always have the same cleaner?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACINTA:</span>Yes.We do our best to
            organize it that way, and we usually manage it.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">CLIENT:</span>Good, that's fine.Right,
            so I'd like to go ahead and...
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>That is the end of part
            1.You now have half a minute to check your answers to part 1
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
            <h1 className="text-2xl font-bold text-center mb-4">
              Easy Life Cleaning Services
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Basic cleaning package offered
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">Cleaning all surfaces</li>
              <li className="text-lg">
                <span>Cleaning the</span>
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
                <span>throughout the apartment.</span>
              </li>{" "}
              <li className="text-lg">Cleaning shower, sinks, toilet etc.</li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Additional services agreed
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">Every Weak</li>

              <li className="text-lg">
                <span>Cleaning the</span>
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
                <span>Ironing clothes -</span>
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
                <span>only.</span>
              </li>

              <li className="text-lg">
                <span>Cleaning all the</span>
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
                <span>from the inside.</span>
              </li>

              <li className="text-lg">
                <span>Washing down the</span>
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
            <h2 className="text-lg font-bold mt-6">Other possibilities</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>They can organise a plumber or an</span>
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
                <span>if necessary.</span>
              </li>
              <li className="text-lg">
                <span>
                  A special cleaning service is available for customers who are
                  allergic to
                </span>
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
            <h2 className="text-lg font-bold mt-6">
              Information on the cleaners
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  Before being hired, all cleaners have a background check
                  carried out by the
                </span>
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
                <span>degrees.</span>
              </li>
              <li className="text-lg">
                <span>All cleaners are given </span>
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
                <span>for two weeks.</span>
              </li>

              <li className="text-lg">
                <span>Customers send a</span>
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
                <span>after each visit.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening2022;
