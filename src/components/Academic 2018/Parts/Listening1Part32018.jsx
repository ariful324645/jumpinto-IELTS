import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2018 from "../Pagination2018/Listening1Pagination2018";

const Listening1Part32018 = () => {
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
        "Section 3. You will hear two biology students called Emma and Jack discussing an experiment they are going to do together.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "We've got to choose a topic for our experiment, haven't we, Jack? Were you thinking of something to do with seeds?",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Hmm, that's right. I thought we could look at seed germination, how a seed begins to grow.",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "OK, any particular reason? I know you're hoping to work in plant science eventually.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Yeah, but practically everything we do is going to feed into that.",

        {
          text: "No, there's an optional module on seed structure and function in the 3rd year that I might do, so I thought it might be useful for that.",
          number: 21,
        },
        "If I choose that option, I don't have to do a dissertation module.",
      ],
    },

    {
      speaker: "EMMA",
      text: ["Good idea."],
    },

    {
      speaker: "JACK",
      text: [
        "Hmm, well I thought for this experiment, we could look at the relationship between seed size and the way the seeds are planted.",
        "So we could plant different sized seeds in different ways and see which grow best.",
      ],
    },

    {
      speaker: "EMMA",
      text: ["OK, we'd need to allow time for the seeds to come up."],
    },

    {
      speaker: "JACK",
      text: [
        {
          text: "That should be fine if we start now.",
          number: 22,
        },
        "A lot of the other possible experiments need quite a bit longer.",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "So that would make it a good one to choose.",
        "And I don't suppose it needs much equipment. We're not doing chemical analysis or anything, though that's not really an issue. We've got plenty of equipment in the laboratory.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Yeah, we need to have a word with the tutor if we're going to go ahead with it though.",
        "I'm sure our aim's OK, it's not very ambitious, but the assignment's only 10% of our final mark, isn't it?",
        {
          text: "But we need to be sure we're the only ones doing it.",
          number: 23,
        },
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "Yeah, it's only 5% actually, but it would be a bit boring if everyone was doing it.",
      ],
    },

    {
      speaker: "JACK",
      text: ["Did you read that book on seed germination on our reading list?"],
    },

    {
      speaker: "EMMA",
      text: [
        "The one by Graves? Hmm, I looked through it for my last experiment, though it wasn't all that relevant there..",
        {
          text: " It would be for this experiment though.I found it quite hard to follow, lots about the theory which I hadn't expected.",
          number: 24,
        },
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Yes, I'd been hoping for something more practical. It does include references to the recent findings on genetically modified seeds, though.",
      ],
    },

    {
      speaker: "EMMA",
      text: ["Yes, that was interesting."],
    },

    {
      speaker: "JACK",
      text: ["I read an article about seed germination by Lee Hall."],
    },

    {
      speaker: "EMMA",
      text: [
        "About seeds that lie in the ground for ages and only germinate after a fire.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Hmm, that's the one. I knew a bit about it already, but not about this research.",
        {
          text: "His analysis of figures comparing the times of the fires and the proportion of seeds that germinated was done in a lot of detail, very impressive.",
          number: 25,
        },
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "Was that the article with the illustrations of early stages of plant development? They were very clear.",
      ],
    },

    {
      speaker: "JACK",
      text: ["I think those diagrams were in another article."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "Anyway, shall we have a look at the procedure for our experiment? We'll need to get going with it quite soon.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Right. So the first thing we have to do is find our seeds. ",
        {
          text: "I think vegetable seeds would be best, and obviously they mustn't all be the same size.",
          number: 26,
        },
        "So how many sorts do we need? About four different ones.",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "I think that would be enough. There'll be quite a large number of seeds for each one.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        {
          text: "Then for each seed, we need to find out how much it weighs.",
          number: 27,
        },
        "And also measure its dimensions, and we need to keep a careful record of all that.",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "That'll be quite time consuming, and we also need to decide how deep we're going to plant the seeds. ",
        {
          text: "Right on the surface, a few millimeters down, or several centimeters.",
          number: 28,
        },
      ],
    },

    {
      speaker: "JACK",
      text: [
        "OK, so then we get planting. Do you think we can plant several seeds together in the same plant pot?",
      ],
    },

    {
      speaker: "EMMA",
      text: [
        {
          text: "No, I think we need a different one for each seed.",
          number: 29,
        },
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Hmm, right, and we'll need to label them. We can use different colored labels. Then we wait for the seeds to germinate. I reckon that'll be about 3 weeks, depending on what the weather's like. Then we see if our plants have come up.",
        {
          text: "And write down how tall they've grown.",
          number: 30,
        },
      ],
    },

    {
      speaker: "EMMA",
      text: [
        "Then all we have to do is look at our numbers and see if there's any relation between them.",
      ],
    },

    {
      speaker: "JACK",
      text: ["That's right. So then we..."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "Why is Jack interested in investigating seed germination?",
    "Jack and Emma agree the main advantage of their present experiment is that it can be",
    "What do they decide to check with their tutor?",
    "They agree that Graves' book on seed germination is disappointing because",
    "What does Jack say about the article on seed germination by Lee Hall?",
  ];

  const options = [
    [
      "A. He may do a module on a related topic later on.",
      "B. He wants to have a career in plant science.",
      "C. He is thinking of choosing this topic for his dissertation.",
    ],

    [
      "A. described very easily.",
      "B. carried out inside the laboratory.",
      "C. completed in the time available.",
    ],

    [
      "A. whether their aim is appropriate",
      "B. whether anyone else has chosen this topic",
      "C. whether the assignment contributes to their final grade",
    ],

    [
      "A. it fails to cover recent advances in seed science.",
      "B. the content is irrelevant for them.",
      "C. its focus is very theoretical.",
    ],

    [
      "A. The diagrams of plant development are useful.",
      "B. The analysis of seed germination statistics is thorough.",
      "C. The findings on seed germination after fires are surprising.",
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
      const answerKey = qIndex + 21;
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
      if (speaker === "JACK") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "EMMA") {
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
    // Section 3 – Jack seed germination
    21: "A. He may do a module on a related topic later on.",
    22: "C. completed in the time available.",
    23: "B. whether anyone else has chosen this topic",
    24: "C. its focus is very theoretical.",
    25: "B. The analysis of seed germination statistics is thorough.",
    26: "G", // Select seeds of different types and sizes
    27: "C", // Measure and record the weight and size of each one
    28: "H", // Decide on the depths to be used
    29: "A", // Use a different container for each seed and label it
    30: "E", // After about 3 weeks, record the plant's height
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
            <h1 className="text-xl font-bold">{renderText("    PART 3")}</h1>
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
                {renderText("Jack seed germination")}
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
            <h2 className="text-lg font-bold">
              {renderText("Questions 11-13")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Traffic Changes in Granford")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

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
                {renderText("Questions 26-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Level the map below")} <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-I")}</span>{" "}
                {renderText("next to Questions 26-30.")}
              </h3>
              <div className="flex items-center justify-center ">
                <div className="text-center border-2 border-black p-4 space-y-2">
                  <ul className="list-disc list-inside text-left">
                    <li className="text-lg">{renderText("A. container")}</li>
                    <li className="text-lg">{renderText("B. soil")}</li>
                    <li className="text-lg">{renderText("C. weight")}</li>
                    <li className="text-lg">{renderText("D. condition")}</li>
                    <li className="text-lg">{renderText("E. height")}</li>
                    <li className="text-lg">{renderText("F. colour")}</li>
                    <li className="text-lg">{renderText("G. types")}</li>
                    <li className="text-lg">{renderText("H. depths")}</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          {/* Stages in the experiment */}
          <div className="space-y-2">
            {/* ---------- Step 1 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span className="text-lg">
                {renderText("Select seeds of different and sizes")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="26">{renderText("26")}</option>
                  <option value="A">{renderText("A. container")}</option>
                  <option value="B">{renderText("B. soil")}</option>
                  <option value="C">{renderText("C. weight")}</option>
                  <option value="D">{renderText("D. condition")}</option>
                  <option value="E">{renderText("E. height")}</option>
                  <option value="F">{renderText("F. colour")}</option>
                  <option value="G">{renderText("G. types")}</option>
                  <option value="H">{renderText("H. depths")}</option>
                </select>
              </div>
            </p>

            {/* ---------- Step 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span className="text-lg">
                {renderText("Measure and record the and size of each one")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="27">{renderText("27")}</option>
                  <option value="A">{renderText("A. container")}</option>
                  <option value="B">{renderText("B. soil")}</option>
                  <option value="C">{renderText("C. weight")}</option>
                  <option value="D">{renderText("D. condition")}</option>
                  <option value="E">{renderText("E. height")}</option>
                  <option value="F">{renderText("F. colour")}</option>
                  <option value="G">{renderText("G. types")}</option>
                  <option value="H">{renderText("H. depths")}</option>
                </select>
              </div>
            </p>

            {/* ---------- Step 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              <span className="text-lg">
                {renderText("Decide on the to be used")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="28">{renderText("28")}</option>
                  <option value="A">{renderText("A. container")}</option>
                  <option value="B">{renderText("B. soil")}</option>
                  <option value="C">{renderText("C. weight")}</option>
                  <option value="D">{renderText("D. condition")}</option>
                  <option value="E">{renderText("E. height")}</option>
                  <option value="F">{renderText("F. colour")}</option>
                  <option value="G">{renderText("G. types")}</option>
                  <option value="H">{renderText("H. depths")}</option>
                </select>
              </div>
            </p>

            {/* ---------- Step 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              <span className="text-lg">
                {renderText("Use a different for each seed and label it")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="29">{renderText("29")}</option>
                  <option value="A">{renderText("A. container")}</option>
                  <option value="B">{renderText("B. soil")}</option>
                  <option value="C">{renderText("C. weight")}</option>
                  <option value="D">{renderText("D. condition")}</option>
                  <option value="E">{renderText("E. height")}</option>
                  <option value="F">{renderText("F. colour")}</option>
                  <option value="G">{renderText("G. types")}</option>
                  <option value="H">{renderText("H. depths")}</option>
                </select>
              </div>
            </p>

            {/* ---------- Step 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              <span className="text-lg">
                {renderText("After about 3 weeks, record the plant's")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="30">{renderText("30")}</option>
                  <option value="A">{renderText("A. container")}</option>
                  <option value="B">{renderText("B. soil")}</option>
                  <option value="C">{renderText("C. weight")}</option>
                  <option value="D">{renderText("D. condition")}</option>
                  <option value="E">{renderText("E. height")}</option>
                  <option value="F">{renderText("F. colour")}</option>
                  <option value="G">{renderText("G. types")}</option>
                  <option value="H">{renderText("H. depths")}</option>
                </select>
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
                    All Answers (21-30)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
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
      {/* <Listening2Pagination2020></Listening2Pagination2020> */}
    </div>
  );
};

export default Listening1Part32018;
