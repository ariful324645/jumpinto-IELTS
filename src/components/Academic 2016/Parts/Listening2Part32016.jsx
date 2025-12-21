import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2016 from "../Pagination2016/Listening2Pagination2016";

const Listening2Part22016 = () => {
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
        "Section 3. You will hear two biology students called Helen and Colin talking about the report they're writing on their recent field trip to a seaside area called Rocky Bay.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully, and answer questions 21 to 26.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "I've brought my notes on our biology field trip to Rocky Bay, Colin.",
        "So we can work on our report on the research we did together.",
      ],
    },

    {
      speaker: "COLIN",
      text: [
        "OK, I've got mine too.",
        "Let's look at the aims of the trip first.",
      ],
    },

    {
      speaker: "HELEN",
      text: ["Right, what did you have?"],
    },

    {
      speaker: "COLIN",
      text: [
        {
          text: "I just put something about getting experience of the different sorts of procedures used on a field trip, but we need something about what causes different organisms to choose particular habitats.",
          number: 21,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "I agree.",
        "And something about finding out how to protect organisms in danger of dying out?",
      ],
    },

    {
      speaker: "COLIN",
      text: ["In our aims? But we weren't really looking at that."],
    },

    {
      speaker: "HELEN",
      text: [
        "OK, now there's the list of equipment we all had to bring on the field trip.",
        "What did they tell us to bring a ruler for?",
      ],
    },

    {
      speaker: "COLIN",
      text: [
        "It was something about measuring the slope of the shore.",
        "But of course we didn't need it, because we were measuring wind direction, and we'd brought the compass for that.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        {
          text: "But not the piece of string to hold up in the air.",
          number: 22,
        },
        "Didn't Mr Blake make a fuss about us leaving that behind?",
      ],
    },

    {
      speaker: "COLIN",
      text: [
        "Yeah. He does go on.",
        "Anyway, it was easy to get one from another of the students.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "Now, the next section's the procedure.",
        "I sent you the draft of that.",
      ],
    },

    {
      speaker: "COLIN",
      text: [
        {
          text: "Yeah. It was clear, but I don't think we need all these details of what time we left and what time we got back, and how we divided up the different research tasks.",
          number: 23,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: ["OK. I'll look at that again."],
    },

    {
      speaker: "COLIN",
      text: [
        "Then we have to describe our method of investigation in detail, so let's begin with how we measured wave speed.",
        {
          text: "I was surprised how straightforward that was.",
          number: 24,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "I'd expected us to have some sort of high-tech device, not just stand there and count the number of waves per minute.",
        "Not very precise, but I suppose it was good enough.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "But the way we measured the amount of salt in the water from the rock pools was interesting.",
        "I wanted to check the chemicals we used in the lab.",
        "Was it potassium chromate and silver nitrate?",
      ],
    },

    {
      speaker: "COLIN",
      text: ["That's right."],
    },

    {
      speaker: "HELEN",
      text: [
        {
          text: "I had to draw the map of the seashore while the tide was low, but I started it from the beach.",
          number: 25,
        },
        "Then I realized I should have gone higher to get better visibility.",
        "So I had to start again, but at least I had the squared paper.",
      ],
    },

    {
      speaker: "COLIN",
      text: [
        "Yeah, it looks good.",
        "We could get a map of the region off the internet.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "I tried, but I couldn't find anything.",
        "But you took some photos, didn't you?",
      ],
    },

    {
      speaker: "COLIN",
      text: ["Yeah, I'll email them to you."],
    },

    {
      speaker: "HELEN",
      text: [
        {
          text: "Great. I'll use them to make my amendments and scan the map into our report.",
          number: 26,
        },
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "When we get to our findings, I thought we could divide them into different zones on the shore.",
      ],
    },

    {
      speaker: "COLIN",
      text: ["The splash zone."],
    },

    {
      speaker: "HELEN",
      text: [
        {
          text: "The shells prevent organisms from drying out when they're exposed to the air.",
          number: 27,
        },
      ],
    },

    {
      speaker: "COLIN",
      text: [
        {
          text: "They also need shelter so they don't get too hot.",
          number: 28,
        },
      ],
    },

    {
      speaker: "COLIN",
      text: [
        {
          text: "I'm not sure we identified all the species correctly.",
          number: 29,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        {
          text: "We might have missed some organisms that were hiding under rocks.",
          number: 30,
        },
      ],
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
    "What do the students agree should be included in their aims?",
    "What equipment did they forget to take on the Field Trip?",
    "In Helen's procedure section, Colin suggests a change in",
    "What do they say about the method they used to measure wave speed?",
    "What mistake did Helen make when first drawing the map?",
    "What do they decide to do next with their map?",
    "What problem affects organisms in the splash zone related to drying out?",
    "What problem affects organisms in the splash zone related to heat?",
    "Which reason for possible error relates to identifying organisms incorrectly?",
    "Which reason for possible error relates to missing some organisms during counting?",
  ];

  const options = [
    [
      "A. factors affecting where organisms live",
      "B. the need to preserve endangered species",
      "C. techniques for classifying different organisms",
    ],
    ["A. string", "B. a compass", "C. a ruler"],
    [
      "A. the order in which information is given",
      "B. the way the information is divided up",
      "C. the amount of information provided",
    ],
    [
      "A. It provided accurate results",
      "B. It was simple to carry out",
      "C. It required special equipment",
    ],
    [
      "A. She chose the wrong scale",
      "B. She stood in the wrong place",
      "C. She did it at the wrong time",
    ],
    [
      "A. scan it onto a computer",
      "B. check it using photographs",
      "C. add information from the internet",
    ],
    ["A. lack of water", "B. lack of food", "C. strong winds"], // Answer: A
    ["A. high temperatures", "B. strong winds", "C. large waves"], // Answer: A
    [
      "A. inaccurate records of habitat",
      "B. incorrect identification of organisms",
      "C. small sample size",
    ], // Answer: B
    [
      "A. influence by observer",
      "B. missing some organisms when counting",
      "C. incorrect habitat mapping",
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
      if (speaker === "COLIN") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "HELEN") {
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
  21: "A. factors affecting where organisms live", //
  22: "A. string", //
  23: "C. the amount of information provided", //
  24: "B. simple to carry out", //
  25: "B. stood in the wrong place", //
  26: "B. check it using photographs", //
  27: "A. lack of water", //
  28: "A. high temperatures", //
  29: "B. incorrect identification of organisms", //
  30: "B. missing some organisms when counting", //
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
                {renderText("Rocky Bay field trip")}
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
              {renderText("Questions 21-30")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Rocky Bay field trip")}
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
      {/* <Listening2Pagination2017></Listening2Pagination2017> */}
      <Listening2Pagination2016></Listening2Pagination2016>
    </div>
  );
};

export default Listening2Part22016;
