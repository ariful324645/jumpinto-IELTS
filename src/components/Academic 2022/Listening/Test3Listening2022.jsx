import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test3Listening2022 = () => {
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
            Advice on Surfing Holidays
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            man called Jack giving advice to a friend about surfing
            holidays.First, you have some time to look at questions 1 to 6.Now
            listen carefully and answer questions 1 to 6.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Jack, I'm thinking of
            taking the kids to the seaside on a surfing holiday this summer, and
            I wanted to ask your advice, as I know you're such an expert.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>Well, I don't know about
            that.But yes, I've done a bit of surfing over the years.I'd
            thoroughly recommend it.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I think it's the kind of holiday all the family can enjoy
              together.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            The thing about surfing is that it's great for all ages and all
            abilities.My youngest started when he was only 3.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Wow!But it's quite
            physically demanding, isn't it?
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I've heard you need to be pretty fit.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>Yes, you'll certainly learn
            more quickly, and won't tire as easily.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>What about in County
            Clare?I read that's also really good for surfing.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>Yes, it is.I've been there a
            few times.Most people go to Lahinch.My kids love it there, the waves
            aren't too challenging, and the town is very lively.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Are there good hotels
            there?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes, some very nice ones.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
            And there are also a few basic hostels and camp sites.It's great if
            you need lessons, as the surf schools are excellent.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Sounds good.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>Yes, and there's lots to see
            in the area.Like those well-known cliffs, I've forgotten the name of
            them.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Oh, don't worry, I can look
            them up.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>I've also been surfing in
            County Mayo.Which is less well known for surfing, but we had a
            really good time.That was a few years ago, when the kids were
            younger.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There's a good surf school at Carrowniskey beach.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Oh, right.How long was that
            for?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              3 hours every day for a week.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
            It was perfect.They were so tired out after that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>I can imagine
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              One thing we did while the kids were surfing was to rent some
              kayaks to have a look around the bay, which is nearby.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
            It's really beautiful.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>It doesn't have the same
            appeal somehow.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>Well, the weather's been
            fine the last couple of years when I've been there, but actually it
            tends to rain more in August than in the spring or autumn.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              September's my favorite month, because the water is warmer then.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>The only problem is that
            the kids are back to school then.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>I know, but one good thing
            about Irish summers is that it doesn't get too hot.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The average temperature is about 19 degrees, and it usually
              doesn't go above 25 degrees.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>That sounds all right.Now
            what about costs?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>Surfing is a pretty cheap
            holiday really, the only cost is the hire of equipment.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You can expect to pay a daily rate of about €30 for the hire of a
              wetsuit and board, but you can save about €40 if you hire by the
              week.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>That's not too bad.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JACK:</span>No, it's important to make
            sure you get good quality wetsuits
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              .You'll all get too cold if you don't, and make sure you also get
              boots.10
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
            They keep your feet warm, and it's easier to surf with them on too.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>OK, well, thanks very much
            for that.
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
            <h1 className="text-2xl font-bold text-center mb-4">
              Advice on surfing holidays
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Jack's advice</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Recommends surfing for</span>
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
                <span>holidays in the summer.</span>
              </li>

              <li className="text-lg">
                <span>Need to be quite</span>
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
            <h2 className="text-lg font-bold mt-6">Irish surfing locations</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">County Clare</li>
              <li className="text-lg">There are famous cliffs nearby</li>
              <li className="text-lg">
                <span>Lahinch has some good quality</span>
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
                <span>and suffer school.</span>
              </li>

              <li className="text-lg">
                <span>Good surf school at</span>
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
                <span>beach.</span>
              </li>

              <li className="text-lg">
                <span>Surf camp lasts for one</span>
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
              <li className="text-lg">
                <span>Can also explore the local</span>
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
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">Weather</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Best month to go</span>
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
              <li className="text-lg">
                <span>Average temperature in summer: approx.</span>
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
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Costs</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Wetsuit and surfboard </span>
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
                <span>euros per day.</span>
              </li>

              <li className="text-lg">
                <span>Also advisable to hire</span>
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
                <span>for warmth.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3Listening2022;
