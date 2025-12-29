import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2016 from "../Pagination2016/Listening3Pagination2016";

const Test3Listening2016 = () => {
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
        "Section 1. You will hear a woman telephoning a tourist office to ask about free activities.",
        "First, you have some time to look at questions 1 to 6.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },

    {
      speaker: "MARTIN",
      text: ["Good morning, this is Burnham tourist office, Martin speaking."],
    },

    {
      speaker: "SUE",
      text: [
        "Oh, hello. I saw a poster about free things to do in the area, and it said people should phone you for information.",
        "I'm coming to Burnham with my husband and two children for a few days on June the 27th, or possibly the 28th, and I'd like some ideas for things to do on the 29th.",
      ],
    },

    {
      speaker: "MARTIN",
      text: ["Yes, of course."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "The date that the woman wants information about is 29 June. So the letter C has been circled.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully, and answer questions 1 to 6.",
      ],
    },

    {
      speaker: "MARTIN",
      text: [
        "OK. Then let's start with a couple of events especially for children.",
        "The art gallery is holding an event called Family Welcome that day, when there are activities and trails to use throughout the gallery.",
      ],
    },

    {
      speaker: "SUE",
      text: ["That sounds interesting. What time does it start?"],
    },

    {
      speaker: "MARTIN",
      text: [
        {
          text: "The gallery opens at 10, and the Family Welcome event runs from 10:30 until 2:00.",
          number: 1,
        },
        "The gallery stays open until 5. And several times during the day, they're going to show a short film that the gallery has produced..",
        {
          text: " It demonstrates how ceramics are made, and there'll be equipment and materials for children to have a go themselves",
          number: 2,
        },
        "Last time they ran the event, there was a film about painting, which went down very well with the children, and they're now working on one about sculpture.",
      ],
    },

    {
      speaker: "SUE",
      text: [
        "I like the sound of that. And what other events happen in Burnham?",
      ],
    },

    {
      speaker: "MARTIN",
      text: ["Well, do you all enjoy listening to music?"],
    },

    {
      speaker: "SUE",
      text: ["Oh, yes."],
    },

    {
      speaker: "MARTIN",
      text: [
        "Well, there are several free concerts taking place at different times, 1 or 2 in the morning. ",
        {
          text: "The majority at lunchtime and a couple in the evening, and they range from pop music to Latin American.",
          number: 3,
        },
      ],
    },

    {
      speaker: "SUE",
      text: ["The Latin American could be fun. What time is that?"],
    },

    {
      speaker: "MARTIN",
      text: [
        "It's being repeated several times in different places. ",
        {
          text: "They're performing in the Central Library at 1 o'clock, then at 4 it's in the City Museum, and in the evening at 7.30 there's a longer concert in the theater.",
          number: 4,
        },
      ],
    },

    {
      speaker: "SUE",
      text: ["Right, I'll suggest that to the rest of the family."],
    },

    {
      speaker: "MARTIN",
      text: [
        "Something else you might be interested in is the boat race along the river.",
      ],
    },

    {
      speaker: "SUE",
      text: ["Oh, yes, do tell me about that."],
    },

    {
      speaker: "MARTIN",
      text: [
        {
          text: "The race starts at Offord Marina, to the north of Burnham, and goes as far as Summer Pool.",
          number: 5,
        },
        "The best place to watch it from is Charlesworth Bridge, though that does get rather crowded.",
      ],
    },

    {
      speaker: "SUE",
      text: ["And who's taking part?"],
    },

    {
      speaker: "MARTIN",
      text: [
        "Well, local boat clubs, but the standard is very high. .",
        {
          text: "One of them came first in the west of England regional championship in May this year",
          number: 6,
        },
        "It was the first time a team from Burnham has won. It means that next year, they'll be representing the region in the national championship.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },

    {
      speaker: "SUE",
      text: [
        "Now, I've heard something about Paxton Nature Reserve.",
        {
          text: " It's a good place for spotting unusual birds, isn't it?",
          number: 7,
        },
      ],
    },

    {
      speaker: "MARTIN",
      text: [
        "That's right throughout the year. There is a lake there, as well as a river. And they provide a very attractive habitat, so it's a good idea to bring binoculars if you have them. ",
        {
          text: "And just at the moment you can see various flowers that are pretty unusual.",
          number: 8,
        },
        "The soil at Paxton isn't very common. They're looking good right now.",
      ],
    },

    {
      speaker: "SUE",
      text: ["Right. My husband will be particularly interested in that."],
    },

    {
      speaker: "MARTIN",
      text: [
        {
          text: "And there's going to be a talk and slide show about mushrooms, and you'll be able to go out and pick some afterwards, and study the different varieties.",
          number: 9,
        },
      ],
    },

    {
      speaker: "SUE",
      text: ["Huh, and is it possible for children to swim in the river?"],
    },

    {
      speaker: "MARTIN",
      text: [
        {
          text: "Yes, part of it has been fenced off to make it safe for children to swim in.",
          number: 10,
        },
        "It's very shallow, and there's a life guard on duty whenever it's open. The lake is too deep, so swimming isn't allowed there.",
      ],
    },

    {
      speaker: "SUE",
      text: [
        "OK, we must remember to bring their swimming things, in case we go to Paxton. How long does it take to get there by car from Burnham?",
      ],
    },

    {
      speaker: "MARTIN",
      text: [
        "Hmm. About 20 minutes, but parking is very limited, so it's usually much easier to go by bus, and it takes about the same time.",
      ],
    },

    {
      speaker: "SUE",
      text: [
        "Right. Well, I'll discuss the options with the rest of the family. Thanks very much for all your help.",
      ],
    },

    {
      speaker: "MARTIN",
      text: ["You're welcome."],
    },

    {
      speaker: "SUE",
      text: ["Goodbye."],
    },

    {
      speaker: "MARTIN",
      text: ["Bye."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
const questions = [
  "The 'Family Welcome' event in the art gallery begins at",
  "The film that is now shown in the 'Family Welcome' event is about",
  "When do most of the free concerts take place?",
  "Where will the 4 pm concert of Latin American music take place?",
  "The boat race begins at",
  "One of the boat race teams",
];

const options = [
  ["A. 10 am.", "B. 10.30 am.", "C. 2 pm."],
  ["A. sculpture.", "B. painting.", "C. ceramics."],
  ["A. in the morning", "B. at lunchtime", "C. in the evening"],
  ["A. in a museum", "B. in a theatre", "C. in a library"],
  ["A. Summer Pool.", "B. Charlesworth Bridge.", "C. Offord Marina."],
  [
    "A. won a regional competition earlier this year.",
    "B. has represented the region in a national competition.",
    "C. has won several regional competitions.",
  ],
];


  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 1;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

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
      if (speaker === "STEWART") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "TRUDIE") {
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
    // Section 1 – Free activities in Burnham area
    1: "B. 10.30 am.",
    2: "C. ceramics.",
    3: "B. at lunchtime",
    4: "B. in a theatre",
    5: "C. Offord Marina.",
    6: "A. won a regional competition earlier this year.",

    // Section 1 – Paxton Nature Reserve
    7: "birds",
    8: "flowers",
    9: "mushrooms",
    10: "river",
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
    localStorage.setItem("/listening2Part32018", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32018");
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
                {renderText("Free activities in Burnham area")}
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

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">{renderText("Questions 1-6")}</h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Free activities in the Burnham area")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 1;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col  gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

                      return (
                        <li
                          key={oIndex}
                          onClick={() => handleOptionClick(qIndex, option)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 inline-block ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-700"
                            }`}
                          ></span>

                          <span
                            className={
                              isSelected ? "text-blue-500" : "text-black"
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 2st section */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 7-10")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Paxton Nature Reserve: Possible Questions")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* 7 */}
              <li className="text-lg">
                <span>
                  {renderText("Paxton is a good place for seeing rare")}
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
                  value={userAnswers[7] || ""}
                  onChange={(e) => handleInputChange(7, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("all year round.")}</span>
              </li>

              {/* 8 */}
              <li className="text-lg">
                <span>
                  {renderText(
                    "This is a particularly good time for seeing certain unusual"
                  )}
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
                  value={userAnswers[8] || ""}
                  onChange={(e) => handleInputChange(8, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText(".")}</span>
              </li>

              {/* 9 */}
              <li className="text-lg">
                <span>
                  {renderText("Visitors will be able to learn about")}
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
                  value={userAnswers[9] || ""}
                  onChange={(e) => handleInputChange(9, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("and then collect some.")}</span>
              </li>

              {/* 10 */}
              <li className="text-lg">
                <span>{renderText("Part of the")}</span>

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

                <span>
                  {renderText("has been made suitable for swimming.")}
                </span>
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
      {/* <Listening1Pagination2017></Listening1Pagination2017> */}
      <Listening3Pagination2016></Listening3Pagination2016>
    </div>
  );
};

export default Test3Listening2016;
