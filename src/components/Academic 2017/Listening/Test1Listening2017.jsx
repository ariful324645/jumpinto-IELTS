import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2017 from "../Pagination2017/Listening1Pagination2017";

const Test1Listening2017 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [openScript, setOpenScript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [currentChunk, setCurrentChunk] = useState(null);

  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 1. You will hear a man inquiring in a tourist center about activities suitable for families.",
        "First, you have some time to look at questions 1 to 4.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: ["Hi. Can I help you?"],
    },
    {
      speaker: "VISITOR",
      text: [
        "I'd like to find out if you have any excursions suitable for families.",
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Sure. How about taking your family for a cruise? We have a steamship that takes passengers out several times a day. It's over 100 years old.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The cruise takes place on a steamship. So, steamship has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully, and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: ["Hi. Can I help you?"],
    },
    {
      speaker: "VISITOR",
      text: [
        "I'd like to find out if you have any excursions suitable for families.",
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Sure. How about taking your family for a cruise? We have a steamship that takes passengers out several times a day. It's over 100 years old.",
      ],
    },
    {
      speaker: "VISITOR",
      text: ["That sounds interesting. How long is the trip?"],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "About an hour and a half. ",
        {
          text: "And don't forget to take pictures of the mountains.",
          number: 1,
        },
        "They're all around you when you're on the boat, and they look fantastic.",
      ],
    },
    {
      speaker: "VISITOR",
      text: ["OK, and I assume there's a cafe or something on board?"],
    },
    {
      speaker: "TC EMPLOYEE",
      text: ["Sure. How old are your children?"],
    },
    {
      speaker: "VISITOR",
      text: ["Uh. My daughter's fifteen, and my son's 7."],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Right. Well, there are various things you can do once you've crossed the lake to make a day of it.",
        "One thing that's very popular is a visit to the country farm.",
        "You're met off the boat by the farmer, and he'll take you to the holding pens where the sheep are kept.",
        "Children love feeling them.",
      ],
    },
    {
      speaker: "VISITOR",
      text: ["My son would love that. He really likes animals."],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        {
          text: "Well, there's also a 40-minute trek round the farm on a horse, if he wants.",
          number: 2,
        },
      ],
    },
    {
      speaker: "VISITOR",
      text: ["Do you think he'd manage it? He hasn't done that before."],
    },
    {
      speaker: "TC EMPLOYEE",
      text: ["Sure, it's suitable for complete beginners."],
    },
    {
      speaker: "VISITOR",
      text: ["Ah, good."],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "And again visitors are welcome to explore the farm on their own, as long as they take care to close gates and so on.",

        {
          text: "There are some very beautiful gardens along the side of the lake, which also belong to the farm.",
          number: 3,
        },
        "They'll be just at their best now. You could easily spend an hour or two there.",
      ],
    },
    {
      speaker: "VISITOR",
      text: [
        {
          text: "OK, well, that all sounds good.And can we get lunch there?",
          number: 4,
        },
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "You can, and it's very good, though it's not included in the basic cost. You pay when you get there.",
      ],
    },
    {
      speaker: "VISITOR",
      text: ["Right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10.",
        "Now listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "VISITOR",
      text: ["So, is there anything else to do over on that side of the lake?"],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Well, what you can do is take a bike over on the ship, and then go on a cycling trip.",
        "There's a trail there called the Back Road.",
        "You could easily spend three or four hours exploring it, and the scenery's wonderful.",

        {
          text: "They'll give you a map when you get your ticket for the cruise, there's no extra charge.",
          number: 5,
        },
      ],
    },
    {
      speaker: "VISITOR",
      text: ["What's the trail like in terms of difficulty?"],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        {
          text: "Quite challenging in places, it wouldn't be suitable for your 7 year old, it needs someone who's got a bit more experience.",
          number: 6,
        },
      ],
    },
    {
      speaker: "VISITOR",
      text: [
        "Hmm, well my daughter loves cycling, and so do I.",
        "So maybe the two of us could go, and my wife and son could stay on the farm.",
        "That might work out quite well, uh, but we don't have bikes here.",
        "Is there somewhere we could rent them?",
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Yes, there's a place here in the city. ",
        { text: "It's called Ratchesons.", number: 7 },
      ],
    },
    {
      speaker: "VISITOR",
      text: ["I'll just make a note of that. Uh. How do you spell it?"],
    },
    {
      speaker: "TC EMPLOYEE",
      text: ["RATCHESONS. It's just by the cruise ship terminal."],
    },
    {
      speaker: "VISITOR",
      text: ["OK."],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "You'd also need to pick up a repair kit for the bike from there to take along with you, and you'd need to take along a snack and some water.",
        "It would be best to get those in the city.",
      ],
    },
    {
      speaker: "VISITOR",
      text: [
        "Fine, that shouldn't be a problem. ",
        {
          text: "And I assume I can rent a helmet from the bike place.",
          number: 8,
        },
      ],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Sure, you should definitely get that. It's a great ride, but you want to be well prepared, because it's very remote.",

        {
          text: "You won't see any shops round there or anywhere to stay, so you need to get back in time for the last boat.",
          number: 9,
        },
      ],
    },
    {
      speaker: "VISITOR",
      text: ["Yeah. Uh. So what sort of prices are we looking at here?"],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        "Let's see, that would be one adult and one child for the cruise with Farm tour.",
        "That's 117 dollars, and an adult and a child for the cruise only, so that's $214 altogether.",
        "Oh, wait a minute. How old did you say your daughter was?",
      ],
    },
    {
      speaker: "VISITOR",
      text: ["15."],
    },
    {
      speaker: "TC EMPLOYEE",
      text: [
        {
          text: "Then I'm afraid it's $267, because she has to pay the adult fare, which is $75, instead of the child fare, which is $22 sorry about that.",
          number: 10,
        },
      ],
    },
    {
      speaker: "VISITOR",
      text: ["That's OK. Er, so how do..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0).getBoundingClientRect();
      setModalPosition({
        top: range.bottom + window.scrollY,
        left: range.left + window.scrollX,
      });
      setSelectedText(selection.toString());
      setIsModalOpen(true);
    }
  };

  const handleHighlight = () => {
    if (selectedText) {
      setHighlightedTexts((prev) => [...prev, selectedText]);
      setSelectedText("");
      setIsModalOpen(false);
    }
  };

  const handleClearHighlight = () => {
    setHighlightedTexts([]);
    setSelectedText("");
    setIsModalOpen(false);
  };

  const renderText = (chunk) => {
    const text = typeof chunk === "string" ? chunk : chunk.text;
    let parts = [text];
    highlightedTexts.forEach((ht) => {
      parts = parts.flatMap((part) =>
        typeof part === "string"
          ? part.split(ht).flatMap((p, i, arr) =>
              i < arr.length - 1
                ? [
                    p,
                    <span key={Math.random()} className="bg-yellow-200 ">
                      {ht}
                    </span>,
                  ]
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  const speakerText = (line, lineIdx) => {
    const chunks = Array.isArray(line.text) ? line.text : [line.text];
    return (
      <h3 key={lineIdx} className="text-lg">
        <span className="font-bold">{line.speaker}:</span>{" "}
        {chunks.map((chunk, idx) => {
          const chunkNumber = typeof chunk === "string" ? null : chunk.number;
          return (
            <span
              key={idx}
              className={`ml-2 ${
                lineIdx === currentLine && idx === currentChunk
                  ? "bg-green-200"
                  : highlight && chunkNumber
                  ? "bg-yellow-100"
                  : "bg-transparent"
              }`}
            >
              {renderText(chunk)}{" "}
              {chunkNumber &&
                highlight &&
                !(lineIdx === currentLine && idx === currentChunk) && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white">
                    {chunkNumber}
                  </span>
                )}
              {chunkNumber &&
                lineIdx === currentLine &&
                idx === currentChunk && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-green-700 rounded-sm text-white ">
                    {chunkNumber}
                  </span>
                )}
            </span>
          );
        })}
      </h3>
    );
  };

  // ---- Voice function ----
  const handleVoice = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentLine(null);
      setCurrentChunk(null);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    const getVoice = (speaker) => {
      if (!voices.length) return null;
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
      return voices[0];
    };

    let lineIndex = 0;
    let chunkIndex = 0;
    setIsSpeaking(true);
    const speakNextChunk = () => {
      if (lineIndex >= lines.length) {
        setIsSpeaking(false);
        setCurrentLine(null);
        setCurrentChunk(null);
        return;
      }
      const line = lines[lineIndex];
      const chunks = Array.isArray(line.text) ? line.text : [line.text];
      if (chunkIndex >= chunks.length) {
        lineIndex++;
        chunkIndex = 0;
        speakNextChunk();
        return;
      }
      setCurrentLine(lineIndex);
      setCurrentChunk(chunkIndex);
      const chunk = chunks[chunkIndex];
      const text = typeof chunk === "string" ? chunk : chunk.text;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = getVoice(line.speaker);
      utterance.rate = 1;
      utterance.onend = () => {
        chunkIndex++;
        speakNextChunk();
      };
      window.speechSynthesis.speak(utterance);
    };
    speakNextChunk();
  };

  //  Marks show

  const correctAnswers = {
    1: "mountains",
    2: "horse",
    3: "gardens",
    4: "lunch",
    5: "map",
    6: "experience",
    7: "Ratchesons",
    8: "helmet",
    9: "shops",
    10: "267",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        answers[key]?.trim().toLowerCase() ===
        correctAnswers[key].trim().toLowerCase()
      ) {
        newScore += 1;
      }
    });
    setScore(newScore);
    localStorage.setItem("/2017/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2017/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/listening");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex relative group justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("    PART 1")}</h1>
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight(!highlight)}
              className="toggle toggle-accent"
            />
          </div>

          <button
            onClick={handleVoice}
            className={`mt-5 px-6 py-2 rounded-full font-medium text-white transition ${
              isSpeaking ? "bg-yellow-400" : "bg-green-400"
            }`}
          >
            {isSpeaking ? "⏹ Stop" : "🔊 Play Voice"}
          </button>

          <hr />
          <div className="flex justify-between items-center">
            <p onClick={() => setOpenScript(!openScript)}>
              {renderText("Audio Script")}
            </p>
            <span onClick={() => setOpenScript(!openScript)}>
              <IoIosArrowDown size={20} />
            </span>
          </div>

          {openScript ? (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold mb-8 text-center">
                {renderText("Family Excursions")}
              </h1>
              {lines.map((line, index) => speakerText(line, index))}
            </div>
          ) : (
            <hr className="border border-gray-400 border-dotted" />
          )}

          {isModalOpen && (
            <div
              style={{ top: modalPosition.top + 5, left: modalPosition.left }}
              className="absolute bg-white p-3 rounded-lg shadow-lg flex gap-3 z-50"
            >
              <button
                onClick={handleHighlight}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Highlight
              </button>
              <button
                onClick={handleClearHighlight}
                className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition"
              >
                Clear Highlight
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
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
                {renderText("Clear answer")}
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      {renderText(
                        "Are you sure you want to clear all answers?"
                      )}
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        {renderText("No, keep them")}
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        {renderText("Yes, clear them")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–10")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("FAMILY EXCURSIONS")}
            </h1>

            {/* ---------- Cruise Section ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Cruise on a lake")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Travel on an old steamship")}
              </li>

              <li className="text-lg">
                <span>{renderText("Can take photos of the")}</span>
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
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("that surround the lake")}</span>
              </li>
            </ul>

            {/* ---------- Farm Visit Section ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Farm visit")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Children can help feed the sheep")}
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Visit can include a 40-minute ride on a")}
                </span>

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
                  value={userAnswers[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("Visitors can walk in the farm's")}</span>

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
                  value={userAnswers[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("by the lake")}</span>
              </li>

              <li className="text-lg">
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
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("is available at extra cost")}</span>
              </li>
            </ul>

            {/* ---------- Cycling Section ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Cycling trips")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Cyclists explore the Back Road")}
              </li>

              <li className="text-lg">
                <span>{renderText("A")}</span>

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
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("is provided")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Only suitable for cyclists who have some")}
                </span>

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
                  value={userAnswers[6] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("Bikes can be hired from")}</span>

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
                  value={userAnswers[7] || ""}
                  onChange={(e) => handleInputChange(7, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("(near the Cruise Ship Terminal)")}</span>
              </li>

              <li className="text-lg">
                {renderText("Cyclists need:")}
                <ul className="list-disc list-inside ml-5 space-y-2">
                  <li>{renderText("a repair kit")}</li>
                  <li>{renderText("food and drink")}</li>

                  <li>
                    <span>{renderText("a")}</span>

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
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                      type="text"
                    />

                    <span>{renderText("(can be hired)")}</span>
                  </li>
                </ul>
              </li>

              <li className="text-lg">
                <span>{renderText("There are no")}</span>

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
                  value={userAnswers[9] || ""}
                  onChange={(e) => handleInputChange(9, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("or accommodation in the area")}</span>
              </li>
            </ul>

            {/* ---------- Cost Section ---------- */}
            <h2 className="text-lg font-bold mt-6">{renderText("Cost")}</h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  {renderText(
                    "Total cost for whole family of cruise and farm visit: $"
                  )}
                </span>

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
                  value={userAnswers[10] || ""}
                  onChange={(e) => handleInputChange(10, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>
          </div>

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1–10)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();

                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;

                      const isWrong =
                        userAnswer && userAnswer !== correctAnswer;

                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
                            )}
                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}

                            <p className="font-bold">Q{num}:</p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswers[num]}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Listening1Pagination2017></Listening1Pagination2017>
    </div>
  );
};

export default Test1Listening2017;
