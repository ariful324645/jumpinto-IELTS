import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Listening1Pagination2018 from "../Pagination2018/Listening1Pagination2018";

const Test1Listening2018 = () => {
  // second

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

  // result marks display
  const [showResult, setShowResult] = useState(false);

const lines = [
  {
    speaker: "ANNOUNCER",
    text: [
      "Section 1. You will hear a telephone conversation between a woman who wants to attend a cookery class, and an official at a tourist information center.",
      "First, you have some time to look at questions 1 to 6.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Hello, Tourist Information Center. Mike speaking. How can I help you?",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Oh, hi. I wanted to find out about cookery classes. I believe there are some one-day classes for tourists.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Well, they're open to everyone, but tourists are always welcome. OK, let me give you some details of what's available.",
      "There are several classes, one very popular one is at the Food Studio.",
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "The first cooking class is at the Food Studio, so studio has been written in the space.",
      "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully, and answer questions 1 to 6.",
    ],
  },

  // Conversation starts again
  {
    speaker: "OFFICIAL",
    text: [
      "Hello, Tourist Information Center. Mike speaking. How can I help you?",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Oh, hi. I wanted to find out about cookery classes. I believe there are some one-day classes for tourists.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Well, they're open to everyone, but tourists are always welcome. OK, let me give you some details of what's available.",
      "There are several classes, one very popular one is at the Food Studio.",
      {
        text: "OK, they focus on seasonal products, and as well as teaching you how to cook them, they also show you how to choose them.",
        number: 1,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Right, that sounds good. How big are the classes?"],
  },
  {
    speaker: "OFFICIAL",
    text: ["I'm not sure exactly, but they'll be quite small."],
  },
  {
    speaker: "WOMAN",
    text: ["And could I get a private lesson there?"],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "I think so. Let me check. ",
      {
        text: "Yes, they do offer those.",
        number: 2,
      },
      "Though in fact most of the people who attend the classes find it's a nice way of getting to know one another.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["I suppose it must be, yes."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "And this company has a special deal for clients,",
      {
        text: "where they offer a discount of 20 percent, if you return for a further class.",
        number: 3,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: ["OK, but you said there were several classes."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "That's right. Another one you might be interested in is Bond's Cookery School. They're quite new. They just opened 6 months ago, but I've heard good things about them.",
      {
        text: "They concentrate on teaching you to prepare healthy food, and they have quite a lot of specialist staff.",
        number: 4,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "So is that food for people on a diet, and things like that? I don't know if I'd be interested in that.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Well, I don't think they particularly focus on low calorie diets or weight loss.",
      {
        text: "It's more to do with recipes that look at specific needs, like including ingredients that will help build up your bones and make them stronger, that sort of thing.",
        number: 5,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "I see. Well, I might be interested, I'm not sure. Do they have a website I could check?",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Yes, just key in the name of the school, it'll come up.",
      {
        text: "And if you want to know more about them, every Thursday evening they have a lecture at the school.",
        number: 6,
      },
      "It's free, and you don't need to book or anything, just turn up at 7:30. And that might give you an idea of whether you want to go to an actual class.",
    ],
  },

  // SECTION 2
  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
      "Now listen and answer questions 7 to 10.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "OK, there's one more place you might be interested in. That's got a rather strange name. It's called The Arretsa Center.",
        number: 7,
      },
      "That's spelled ARRETSA.",
      "OK, they've got a very good reputation.",
      {
        text: "They do a bit of meat and fish cookery, but they mostly specialize in vegetarian dishes.",
        number: 8,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Right. That's certainly an area I'd like to learn more about. I've got lots of friends who don't eat meat.In fact, I think I might have seen that school today. ",
      {
        text: "Is it just by the market?",
        number: 9,
      },
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "That's right. So they don't have any problem getting their ingredients. They're right next door.",
      {
        text: "And they also offer a special two-hour course in how to use a knife.",
        number: 10,
      },
      "They cover all the different skills: buying them, sharpening, chopping techniques. It gets booked up quickly though, so you'd need to check it was available.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Right, well, thank you very much. I'll go and check that out."],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "That is the end of Section 1. You now have half a minute to check your answers.",
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "OFFICIAL") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "WOMAN") {
        return (
          voices.find((v) => v.name.includes("Aria")) ||
          voices.find((v) => v.name.includes("Jenny")) ||
          voices.find((v) => v.name.includes("Ana")) ||
          voices.find((v) => v.name.includes("Female")) ||
          voices[0]
        );
      }

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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

 const correctAnswers = {
   1: "choose",
   2: "private",
   3: "20%",
   4: "healthy",
   5: "bones",
   6: "lecture",
   7: "Arretsa",
   8: "vegetarian",
   9: "market",
   10: "knife",
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
    localStorage.setItem("/2018/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2018/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 1/listening");
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
                {renderText("Cookery Classes")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
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
          {/* 1st section */}
          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-10")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Write")}{" "}
              <span className="font-bold">{renderText("ONLY ONE WORD")}</span>{" "}
              {renderText("for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    className="border border-gray-400 text-lg font-bold p-2"
                  >
                    {renderText("COOKERY CLASSES")}
                  </th>
                </tr>
                <tr>
                  <th className="border p-2">{renderText("Cookery Class")}</th>
                  <th className="border p-2">{renderText("Focus")}</th>
                  <th className="border p-2">
                    {renderText("Other Information")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Example Row */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("The Food Studio")}
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    <span>{renderText("how to")}</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span className="ml-2">
                      {renderText("and cook with seasonal products")}
                    </span>
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("small classes, also offers")}
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">
                      {renderText("classes; clients who return get a")}
                    </span>

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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">{renderText("discount")}</span>
                  </td>
                </tr>

                {/* Bond's Cookery School */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Bond's Cookery School")}
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("food that is")}
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">
                      {renderText("includes recipes to strengthen your")}
                    </span>

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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("they have a free")}
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">{renderText("every Thursday")}</span>
                  </td>
                </tr>

                {/* The Arretsa Centre */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>{renderText("The")}</span>

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
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">{renderText("Centre")}</span>
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("mainly")}
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">{renderText("food")}</span>
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("located near the")}
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">
                      {renderText(
                        "they offer a special course in skills with a"
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />

                    <span className="ml-2">
                      {renderText("is sometimes available")}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
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
                           All Answers (1-10)
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
  <Listening1Pagination2018></Listening1Pagination2018>
    </div>
  );
};

export default Test1Listening2018;
