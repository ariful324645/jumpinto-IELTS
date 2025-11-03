import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test4Listening = () => {
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
            Conversation about Caring for Elderly Mother and Council Support
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Part 1. You will hear
            a man asking a friend for advice on things to do in the city with a
            family of visitors. First, you have some time to look at questions 1
            to 6. Now listen carefully and answer questions 1 to 6.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Sandra, I seem to remember
            you had some family visitors staying with you recently.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Yeah, that's right. My
            brother and his family were here a couple of months ago.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Ok, good. Well, I wanted to
            ask your advice. I've got my cousin and her family visiting next
            month, and as I don't have kids, I've no idea where to take them.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Right, what about
            accommodation? Are they going to stay with you in your flat?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> No, thankfully, there
            wouldn't be room. My cousin wants me to recommend a hotel. Do you
            know anywhere?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Yes, I do actually.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I always recommend people stay at the Kings Hotel.{" "}
              {highlight && "(1)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Where's that near?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> It's about 5 minutes'
            walk from Murray station, so nice and central. It's actually on
            George Street.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Oh, yes, I know. I think
            they're on quite a tight budget, so how much roughly is it to stay
            there?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              If you book a family room, it's about £125 per night.{" "}
              {highlight && "(2)"}
            </span>{" "}
            My brother paid for two double rooms in the end, and I think that
            was around £95 for each room.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Oh, that's not so bad.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> So how old are your
            cousin's kids?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> 12 and 9. So I want to
            organize some trips while they're here. I was thinking of doing a
            bus tour of the city center, as none of them have been here before.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Those bus tours are quite expensive. I think it's better to do a
              walking tour. {highlight && "(3)"}
            </span>{" "}
            It gives you a much better feel for the city. There's one that
            starts from Carlton Square. It takes a couple of hours and doesn't
            cost that much.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Sounds good. I'll look that
            up, thanks.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              If the weather's nice, one thing you could do is visit the old
              fort. You could get there by boat. {highlight && "(4)"}
            </span>{" "}
            The whole trip takes half a day.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> That's a really good idea.
            I'd like to do that myself. And if the weather's bad, I was thinking
            they could go to the science museum. But maybe they could do that
            when I'm at work.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Yeah, don't forget it's
            closed on Mondays.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They're here from Saturday for 4 nights, so Tuesday would be best
              I think. {highlight && "(5)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>
            There's another one starting soon on space, which looks really good
            too.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {highlight && "(6)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Ok, well I'll mention that
            to my cousin.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Before you hear the
            rest of the conversation, you have some time to look at questions 7
            to 10. Now listen and answer questions 7 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Have you thought about
            where to take them to eat?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            Well, I really like all the food stalls at Clacton Market.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              uh My cousin's vegetarian, I know it's one of the best places for
              that kind of food. {highlight && "(7)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>
            Definitely. And there'll be loads of choice for the kids too.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You need to get there quite early though, at the weekend most of
              the stalls stop serving lunch at 2:30. {highlight && "(8)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Good point, it's all going
            to need careful planning. My cousin said she'd love to take the kids
            to a show at the theater, but tickets are so expensive.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>I know, but you can get
            some good deals if you book online with bargaintickets.com for the
            following day.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              On some seats, there's a 75% discount. {highlight && "(9)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Really? Hmm, I must try and
            get some.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Yeah, there are lots of
            things you can do for free as well. No need to spend a fortune.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Like what?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> They're coming next
            month, right? Well check and see if it's the same weekend as the
            Roots Music Festival in Blakewell Gardens.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> R double O T S.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Yeah, check it out
            online. It's always a family friendly event, and there's no entry
            charge.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> That sounds perfect.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span>
            And if you're in Blakewell Gardens - climb Telegraph Hill - you'll
            be able to look right down on the port.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Everyone's always really impressed because it's so huge.{" "}
              {highlight && "(10)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Oh, yeah. I've been meaning
            to do that for ages. I've heard the view's amazing.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SANDRA:</span> Yeah, it's really worth
            the effort.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Well, that's given me loads
            of ideas. Thanks so much...
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1. You now have one minute to check your answers to part 1.
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
            Complete the table below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Advice on family visit
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-xl font-bold mt-6">Accommodation</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg flex items-center gap-3">
                •
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>Hotel on George Street</span>
              </li>
              <li className="text-lg flex items-center gap-3">
                •<span>cost of family room per night: £</span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>(approx.)</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-xl font-bold mt-6">Recommended trips</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg flex items-center gap-3">
                •<span>a</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>tour of the city centre (starts in Carlton Square)</span>
              </li>
              <li className="text-lg flex items-center gap-3">
                •<span>a trip by</span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>to the old fort</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-xl font-bold mt-6">Science Museum</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg flex items-center gap-3">
                •<span>best day to visit:</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
              </li>
              <li className="text-lg flex items-center gap-3">
                •<span>see the exhibition about</span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>, which opens soon</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-xl font-bold mt-6">Food</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">Clacton Market:</li>
              <li className="text-lg flex items-center gap-3">
                •<span>good for</span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>food</span>
              </li>
              <li className="text-lg flex items-center gap-3">
                •<span>need to have lunch before</span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>P.M</span>
              </li>
            </ul>

            {/* ---------- Section 5 ---------- */}
            <h2 className="text-xl font-bold mt-6">Theatre tickets</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg flex items-center gap-3">
                •<span>save up to</span>
                <button
                  onClick={() => toggleButton(9)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>% on ticket prices at bargaintickets.com</span>
              </li>
            </ul>

            {/* ---------- Section 6 ---------- */}
            <h2 className="text-xl font-bold mt-6">Free activities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">Blakewell Gardens:</li>
              <li className="text-lg">Roots Music Festival</li>
              <li className="text-lg flex items-center gap-3">
                •<span>climb Telegraph Hill to see a view of the</span>
                <button
                  onClick={() => toggleButton(10)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                <span>P.M</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening;
