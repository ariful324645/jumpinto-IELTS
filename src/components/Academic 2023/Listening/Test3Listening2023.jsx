import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test3Listening2023 = () => {
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
      <div className="flex px-3 gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-4 overflow-y-scroll">
          <div className="flex relative group justify-between items-center">
            <h1 className="text-3lg font-bold">PART 1</h1>
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
          <h1 className="text-xl font-bold text-center">Wayside Camera Club</h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            man talking to the coordinator of a photography club.First, you have
            some time to look at questions 1 to 4.Now listen carefully and
            answer questions 1 to 4.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span> Hello, Wayside Camera
            Club, Breda speaking.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Oh, hello.Um. My name is Dan,
            and I'd like to join your club.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>That's great, Dan.We have
            an application form.Would you like to complete it over the
            phone?Then you can ask any questions you might have.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Oh, yes, thanks.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>OK, so what's your family
            name?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>It's Green, Dan Green.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>So, can I take your email
            address?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Yes, it's dan1068@market.com.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Thanks, and what about your
            home address?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Well, I'm about 10 miles away
            from your club in Peacetown.I live in a house there.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>OK, so what's the house
            number and street?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>That's great, Dan.We have an
            application form.Would you like to complete it over the phone?Then
            you can ask any questions you might have.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>OK, so what's the house
            number and street?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's 52 Marrowfield Street.
              {highlight && "(1)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Is that MARROWFIELD?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>That's right.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>And that's Peacetown, you
            said?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Uh huh.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>So, how did you hear about
            our club?Did you look on the internet?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I usually do that, but this time well, I was talking to a relative
              the other day, and he suggested it.
              {highlight && "(2)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Oh, is he a member too?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>He belongs to another club,
            but he'd heard good things about yours.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Right, anything else?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, I also like to socialize with other photographers.
              {highlight && "(3)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>It's £30 a year for full
            membership, or £20 a year if you're an associate.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I think I'll go for the full membership then.
              {highlight && "(4)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>So, you said you wanted to
            compete.Have you ever won any photography competitions?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Not yet, but I have entered 3
            in the past.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Oh, that's interesting.So
            why don't you tell me something about those?Let's start with the
            first one.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, the theme was entitled "Domestic life".
              {highlight && "(5)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>So what was the theme of
            the second competition?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Well, my university was on
            the coast, and that area gets a lot of beautiful sunsets.So that was
            the theme.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Oh sunsets, that's a great
            theme.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes, the instructions were to capture the clouds as well.
              {highlight && "(6)"}
            </span>
            Uh. It couldn't just be blue sky and a setting sun. BREDA:Sure,
            cause they give you all those amazing pinks and purples.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Sure, cause they give you
            all those amazing pinks and purples.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Yeah, and I thought I'd done
            that well, but the feedback was that I should have waited a bit
            longer to get the shot.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span> I see
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So the timing wasn't right.
              {highlight && "(7)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Yes, I took it too soon,
            basically.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And then the third competition I entered was called Animal Magic.
              {highlight && "(8)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>I'm sure, because animals
            move all the time.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>That's what we had to show.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There had to be some movement in the scene.
              {highlight && "(9)"}
            </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I got a great shot of a fox in the end, but I took it at night,
              and well, I suspected that it was a bit dark, which is what I was
              told.
              {highlight && "(10)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">BREDA:</span>Well, Dan, you seem to be
            really keen, and we'd be delighted to have you in our club.I'm sure
            we can help with all those areas that you've outlined.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">DAN:</span>Thanks, that's great.
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

          <h2 className="text-lg font-bold mb-3">Questions 1–4</h2>
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className=" overflow-x-auto border text-lg bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-xl font-bold text-center mb-8">
              Wayside Camera Club Membership Form
            </h1>

            {/* ---------- Section 1 ---------- */}
            <div className="flex items-center justify-between gap-10 mb-4">
              <h2 className="text-lg font-bold w-48">Name:</h2>
              <span className="text-lg flex-1">Dan Green</span>
            </div>

            {/* ---------- Section 2 ---------- */}
            <div className="flex items-center justify-between gap-10 mb-4">
              <h2 className="text-lg font-bold w-48">Email address:</h2>
              <span className="text-lg flex-1">dan1068@market.com</span>
            </div>

            {/* ---------- Section 3 ---------- */}
            <div className="flex items-center justify-between gap-10 mb-4">
              <h2 className="text-lg font-bold w-48">Home address:</h2>
              <div className="flex items-center flex-wrap gap-2 flex-1">
                <span>52</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-1"
                  type="text"
                />
                <span>Street, Peacetown</span>
              </div>
            </div>

            {/* ---------- Section 4 ---------- */}
            <div className="flex items-center justify-between gap-10 mb-4">
              <h2 className="text-lg font-bold w-48">Heard about us:</h2>
              <div className="flex items-center gap-2 flex-1">
                <span>from a </span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-1"
                  type="text"
                />
              </div>
            </div>

            {/* ---------- Section 5 ---------- */}
            <div className="flex items-center justify-between gap-10 mb-4">
              <h2 className="text-lg font-bold w-48">Reason for joining:</h2>
              <div className="flex items-center flex-wrap gap-2 flex-1">
                <span>to enter competitions, to</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-1"
                  type="text"
                />
              </div>
            </div>

            {/* ---------- Section 6 ---------- */}
            <div className="flex items-center justify-between gap-10 mb-4">
              <h2 className="text-lg font-bold w-48">Type of membership:</h2>
              <div className="flex items-center flex-wrap gap-2 flex-1">
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-1"
                  type="text"
                />
                <span>membership (£30)</span>
              </div>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">Questions 5–10</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE WORD</span> for each answer.
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center text-lg mx-auto">
              <thead>
                <tr>
                  <th colSpan="3" className="border text-lg font-bold border-gray-400 p-2">
                    Photography competitions
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-400 p-2">
                    Title of competition
                  </th>
                  <th className="border border-gray-400 p-2">Instructions</th>
                  <th className="border border-gray-400 p-2">
                    Feedback to Dan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">
                    <span>"</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>"</span>
                  </td>

                  <td className="border  border-gray-400 text-lg  p-2">
                    A scene in the home
                  </td>
                  <td className="border border-gray-400 p-2">
                    The picture's composition was not good.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    'Beautiful Sunsets'
                  </td>
                  <td className="border border-gray-400 p-2">
                    <span>Scene must show some</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>.</span>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <span>The</span>
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
                    <span>was wrong..</span>
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">
                    <span>"</span>
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
                    <span>"</span>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <span>Scene must show</span>
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
                    <span>.</span>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <span> The photograph was too</span>
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
                    <span>.</span>
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

export default Test3Listening2023;
