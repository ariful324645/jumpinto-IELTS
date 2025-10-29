import React, { useState } from "react";
import { FcCollapse } from "react-icons/fc";
import { Link } from "react-router";

const VoiceIelts = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const toggleHighlight = () => {
    setHighlight(!highlight);
  };
  let utterance;

  const handleVoice = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = `
      WOMAN: Really? So, who runs the classes?
      MAN: Really? So, who runs the classes?
      WOMAN: Really? So, who runs the classes?
      MAN: Really? So, who runs the classes?
    `;

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => setIsSpeaking(false);
  };

  return (
    <div className="w-11/12 mx-auto ">
      <div className=" mt my-10 grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg">
        {/* Left side */}
        <div className="bg-blue-50 p-6 space-y-4 border-r border-gray-200">
          <h1 className="text-2xl font-bold text-blue-700">
            Inside Coleman's Guitar Experience
          </h1>

          {/* Voice control header */}
          <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <h1 className="text-lg font-bold flex items-center gap-2">
              AudioScript <FcCollapse size={22} />
            </h1>

            <button
              onClick={handleVoice}
              className={`mt-5 px-6 py-2 rounded-full font-medium text-white transition ${
                isSpeaking
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSpeaking ? "⏹ Stop" : "🔊 Play Voice"}
            </button>
          </div>

          <div className="space-y-2 text-gray-800">
            <p className="text-lg font-bold">
              WOMAN:{" "}
              <span className="font-semibold">
                Really? So, who runs the classes?
              </span>
            </p>
            <p className="text-lg font-bold">
              MAN:{" "}
              <span className="font-semibold">
                Really? So, who runs the classes?
              </span>
            </p>
            <p className="text-lg font-bold">
              WOMAN:{" "}
              <span className="font-semibold">
                Really? So, who runs the classes?
              </span>
            </p>
            <p className="text-lg font-bold">
              MAN:{" "}
              <span className="font-semibold">
                Really? So, who runs the classes?
              </span>
            </p>
          </div>

          {/* Search box */}
          <div className="pt-2">
            <input
              type="text"
              placeholder="🔍 Search script text..."
              className="w-full border border-blue-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="bg-gradient-to-r from-pink-50 to-red-100 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              IELTS Practice Tests
            </h1>

            {/* Image grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <img
                src="https://i.ibb.co.com/tPY8WXvb/IELTS-Academic.webp"
                alt="IELTS"
                className="rounded-lg shadow-sm hover:scale-105 transition"
              />
              <img
                src="https://i.ibb.co.com/tPY8WXvb/IELTS-Academic.webp"
                alt="IELTS"
                className="rounded-lg shadow-sm hover:scale-105 transition"
              />
              <img
                src="https://i.ibb.co.com/tPY8WXvb/IELTS-Academic.webp"
                alt="IELTS"
                className="rounded-lg shadow-sm hover:scale-105 transition"
              />
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Cambridge IELTS 20 has been released!
            </h1>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-l-full rounded-r-none hover:bg-blue-600 transition font-medium">
              My Last Practice
            </button>
            <br />
            <Link to="/">
              <button className="bg-red-400 text-white px-5 py-2 rounded-full hover:bg-red-500 transition font-medium">
                More Authentic Tests
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" mt my-10 grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg">
        {/* Left side */}
        <div className="bg-gradient-to-r from-pink-50 to-red-100 space-y-10  p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-5">
              Vocabulary in IELTS
            </h1>

            <h1 className="text-2xl font-bold mb-5">misfit</h1>

            <hr />
            <p className="mb-5">
              When one mentions pirates, an image springs to most people's minds
              of a crew of misfits, daredevils and adventurers in command of a
              tall sailing ship in the Caribbean Sea.
            </p>
            <ul className="flex gap-2">
              <Link>academic</Link>
              <Link>19</Link>
              <Link>Practice</Link>
              <Link>Reading</Link>
            </ul>

            <h1 className="text-xl font-semibold text-gray-800 mb-5">
              Cambridge IELTS 20 has been released!
            </h1>

            <hr />
            <p className="mb-5">
              When one mentions pirates, an image springs to most people's minds
              of a crew of misfits, daredevils and adventurers in command of a
              tall sailing ship in the Caribbean Sea.
            </p>
            {/* Buttons */}
            <div className="">
              <Link to="/vocabularySearch">
                <button className="bg-red-400 text-white px-5 py-2 rounded-full hover:bg-red-500 transition font-medium">
                  My started Words
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Right side */}

        <div className="bg-blue-50 p-6  border-r border-gray-200">
          <div className="bg-blue-50 p-6 border-r border-gray-200 flex-1">
            <h1 className="text-2xl font-bold text-blue-700">
              The Growth Mindset
            </h1>

            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Vocabulary in IELTS
            </h1>

            <h1 className="text-2xl font-bold">misfit</h1>
            <hr />
            <p
              className={`mt-2 p-2 rounded transition-all duration-300 ${
                highlight ? "bg-yellow-200" : "bg-transparent"
              }`}
            >
              When one mentions pirates, an image springs to most people's minds
              of a crew of misfits, daredevils and adventurers in command of a
              tall sailing ship in the Caribbean Sea.
            </p>

            <h1 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cambridge IELTS 20 has been released!
            </h1>
            <hr />
            <p
              className={`mt-2 p-2 rounded transition-all duration-300 ${
                highlight ? "bg-yellow-200" : "bg-transparent"
              }`}
            >
              When one mentions pirates, an image springs to most people's minds
              of a crew of misfits, daredevils and adventurers in command of a
              tall sailing ship in the Caribbean Sea.
            </p>
          </div>

          {/* Right Side Toggle Button */}
          <div className="p-6">
            <button
              onClick={toggleHighlight}
              className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
                highlight
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {highlight ? "Remove Highlight" : "Highlight Text"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceIelts;
