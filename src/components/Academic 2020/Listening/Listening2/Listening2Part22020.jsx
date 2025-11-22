import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2020 from "../../Pagination/Listening2Pagination/Listening2Pagination2020";

const Listening2Part22020 = () => {
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
        "Part 2. You will hear part of a talk to a gardening club about a local park.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },

    {
      speaker: "WOMAN",
      text: [
        "I'm very pleased to welcome this evening's guest speaker, Mark Logan, who's going to tell us about the recent transformation of Minster Park.",
        "Over to you, Mark.",
      ],
    },

    {
      speaker: "MARK",
      text: [
        "Thank you. I'm sure you're all familiar with Minster Park.",
        "It's been a feature of the city for well over a century, and has been the responsibility of the city council for most of that time.",
        "What perhaps isn't so well known is the origin of the park.",

        {
          text: "Unlike many public parks that started in private ownership, as the garden of a large house for instance, Minster was some waste land, which people living nearby started planting with flowers in 1892.",
          number: 11,
        },
        "It was unclear who actually owned the land.",
        "And this wasn't settled until 20 years later, when the council took possession of it.",
        "You may have noticed the statue near one of the entrances.",
        "It's of Diane Gosforth, who played a key role in the history of the park.",
        "Once the council had become the legal owner, it planned to sell the land for housing.",
        "Many local people wanted it to remain a place that everyone could go to, to enjoy the fresh air and natural environment.",
        "Remember, the park is in a densely populated residential area.",

        {
          text: "Diane Gosforth was one of those people, and she organized petitions and demonstrations, which eventually made the council change its mind about the future of the land.",
          number: 12,
        },
        "Soon after this, the First World War broke out in 1914, ",
        {
          text: "and most of the park was dug up and planted with vegetables, ",
          number: 13,
        },
        "which were sold locally.At one stage, the army considered taking it over for troop exercises, and got as far as contacting the city council, then decided the park was too small to be of use.",
        "There were occasional public meetings during the war, in an area that had been retained as grass.",
        "After the war, the park was turned back more or less to how it had been before 1914 and continued almost unchanged until recently.",
        "Plans for transforming it were drawn up at various times, most recently in 2013, though they were revised in 2015 before any work had started.",
        {
          text: "The changes finally got going in 2016 and were finished on schedule last year.",
          number: 14,
        },
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 15 to 20.",
        "Now listen and answer questions 15 to 20.",
      ],
    },

    {
      speaker: "MARK",
      text: [
        "OK, let me tell you about some of the changes that have been made, and some things that have been retained.",
        "If you look at this map.",
        "You'll see the familiar outline of the park, with the river forming the northern boundary, and a gate in each of the other three walls.",
        "The statue of Diane Gosforth has been moved.",

        {
          text: "It used to be close to the south gate, but it's now immediately to the north of the lily pond, almost in the center of the park, which makes it much more visible.",
          number: 15,
        },
        {
          text: "There's a new area of wooden sculptures, which are on the river bank, where the path from the east gate makes a sharp bend.",
          number: 16,
        },
        "There are two areas that are particularly intended for children.",

        {
          text: "The playground has been enlarged and improved, and that's between the river and the path that leads from the pond to the river.",
          number: 17,
        },
        "Then there's a new maze, a circular series of paths separated by low hedges.",

        {
          text: "That's near the west gate.",
          number: 18,
        },
        " You go north from there towards the river and then turn left to reach it.",
        "There have been tennis courts in the park for many years, and they've been doubled from four to eight.",

        {
          text: "They're still in the south-west corner of the park",
          number: 19,
        },
        ", where there's a right-angle bend in the path.Something else I'd like to mention is the new fitness area.",

        {
          text: "This is right next to the lily pond, on the same side as the west gate.",
          number: 20,
        },
        "Now, as you're all gardeners, I'm sure you'll like to hear about the plants that have been chosen for the park.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have 30 seconds to check your answers to part 2.",
      ],
    },
  ];

  // different option
  const questions = [
    "The park was originally established",
    "Why is there a statue of Diane Gosforth in the park?",
    "During the First World War, the park was mainly used for",
    "When did the physical transformation of the park begin?",
  ];

  const options = [
    [
      "A. as an amenity provided by the city council.",
      "B. as land belonging to a private house.",
      "C. as a shared area set up by the local community.",
    ],

    [
      "A. She was a resident who helped to lead a campaign.",
      "B. She was a council member responsible for giving the public access.",
      "C. She was a senior worker at the park for many years.",
    ],

    ["A. exercises by troops", "B. growing vegetables.", "C. public meetings."],

    ["A. 2013", "B. 2015", "C. 2016"],
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
      const answerKey = qIndex + 11;
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
      if (speaker === "MARK") {
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
  11: "C. as a shared area set up by the local community.",
  12: "A. She was a resident who helped to lead a campaign.",
  13: "B. growing vegetables.",
  14: "C. 2016",
  15: "H",
  16: "C",
  17: "G",
  18: "B",
  19: "E",
  20: "F",
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
    localStorage.setItem("/listening2Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part22020");
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
            <h1 className="text-xl font-bold">{renderText("    PART 2")}</h1>
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
                {renderText("Minster Park")}
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
            <h2 className="text-lg font-bold">Questions 11-14</h2>
            <p className="text-xl">
              Choose the correct letter,{" "}
              <span className="font-bold">A, B or C</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">Minster Park</h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 11;

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

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 15-20")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Level the map below")} <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-I")}</span>{" "}
                {renderText("next to Questions 15-20.")}
              </h3>
              <div className="flex items-center justify-center ">
                <div className="text-center">
                  <img className="h-96 w-96" src="https://i.ibb.co.com/7N4HdKN4/L1.jpg" alt="Image bosa" />
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 1 ---------- */}

            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("15.")}</span>
              <span className="text-lg">
                {renderText("statue of Diane Gosforth")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="1">{renderText("15")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("16.")}</span>
              <span className="text-lg">{renderText("a middle child")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="2">{renderText("16")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("17.")}</span>
              <span className="text-lg">
                {renderText("the youngest child")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="3">{renderText("17")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              <span className="text-lg"> {renderText("a twin")}</span>
              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="4">{renderText("18")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("19.")}</span>
              <span className="text-lg"> {renderText("an only child")}</span>
              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="5">{renderText("19")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 6 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("20.")}</span>
              <span className="text-lg">
                {" "}
                {renderText("a child with much older siblings")}
              </span>
              <div className="relative w-40">
                <select
                  value={userAnswers[20] || ""}
                  onChange={(e) => handleInputChange(20, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="6">{renderText("20")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
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
                    All Answers (11-20)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 11).map((num) => {
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
     <Listening2Pagination2020></Listening2Pagination2020>
    </div>
  );
};

export default Listening2Part22020;
