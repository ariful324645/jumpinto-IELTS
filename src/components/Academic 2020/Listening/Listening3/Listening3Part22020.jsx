import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2020 from "../../Pagination/Listening3Pagination/Listening3Pagination2020";

const Listening3Part22020 = () => {
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
        "Part 2. You will hear a woman called Alice Riches talking on the radio about a scheme which involves closing streets to traffic to allow children to play.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully and answer questions 11 to 16.",
      ],
    },

    {
      speaker: "PRESENTER",
      text: [
        "My guest on the show today is Alice Riches, who started the street play scheme where she lives in Beechwood Road.",
        "For those of you that don't already know, street play involves local residents closing off their street for a few hours so that children have a chance to play in the street safely.",
        "She started it in her own street, Beechwood Road, and the idea caught on, and there are now street play schemes all over the city.",
        "So when did you actually start the scheme, Alice?",
      ],
    },

    {
      speaker: "ALICE",
      text: [
        "Well, I first had the idea when my oldest child was still a toddler.",
        "So that's about oh, 6 years ago now, but it took at least 2 years of campaigning before we were actually able to make it happen.",

        {
          text: "So the scheme's been up and running for 3 years now.",
          number: 11,
        },
        "We'd love to be able to close our road for longer, for the whole weekend from Saturday morning until Sunday evening for example.",

        {
          text: "At the moment, it's just once a week, but when we started, it was only once a month, but we're working on it.",
          number: 12,
        },
      ],
    },

    {
      speaker: "PRESENTER",
      text: ["So what actually happens when Beechwood Road is closed?"],
    },

    {
      speaker: "ALICE",
      text: [
        { text: "We have volunteer wardens.", number: 13 },

        "Mostly parents, but some elderly residents too, who block off our road at either end.",
        "The council have provided special signs, but there's always a volunteer there to explain what's happening to any motorists.",
        "Generally they're fine about it.",
        "We've only had to get the police involved once or twice.",
        "Now, I should explain that the road isn't completely closed to cars.",
        "But only residents' cars are allowed.",

        {
          text: "If people really need to get in or out of Beechwood Road, it's not a problem, as long as they drive at under 20 km per hour.",
          number: 14,
        },
        "But most people just decide not to use their cars during this time, or they park in another street.",

        "The wardens are only there to stop through traffic.",
      ],
    },

    {
      speaker: "PRESENTER",
      text: ["So, can anyone apply to get involved in street play?"],
    },

    {
      speaker: "ALICE",
      text: [
        {
          text: "Absolutely. We want to include all kids in the city, especially those who live on busy roads.",
          number: 15,
        },
        "It's here that demand is greatest, obviously, there isn't such demand in wealthier areas where the children have access to parks or large gardens.",
        "Or in the suburbs where there are usually more places for children to play outside.",
        "I'd recommend that anyone listening who likes the idea should just give it a go.",
        "We've been surprised by the positive reaction of residents all over the city.",
        "And that's not just parents, there are always a few who complain, but they're a tiny minority.",

        {
          text: "On the whole, everyone is very supportive, and says they're very happy to see children out on the street.",
          number: 16,
        },
        "Even if it does get quite noisy.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 17 to 20.",
        "Listen and answer questions 17 to 20.",
      ],
    },

    {
      speaker: "ALICE",
      text: [
        "There have been so many benefits of street play for the kids.",
        "Parents really like the fact that the kids are getting fresh air, instead of sitting staring at a computer screen.",
        "Even if they're not doing anything particularly energetic, and of course it's great that kids can play with their friends outside without being supervised by their parents.",

        {
          text: "But for me, the biggest advantage is that kids develop confidence in themselves to be outside without their parents.",
          number: 17,
        },

        {
          text: "The other really fantastic thing is that children get to know the adults in the street.",
          number: 18,
        },
        "It's like having a big extended family.",
      ],
    },

    {
      speaker: "PRESENTER",
      text: [
        "It certainly does have a lot of benefits.",
        "I want to move on now and ask you about a related project in King Street.",
      ],
    },

    {
      speaker: "ALICE",
      text: [
        "Right. Well, uh, this was an experiment I was involved in, where local residents decided to try and reduce the traffic along King Street, which is the busiest main road in our area.",
        "By persuading people not to use their cars for one day.",
        "We thought about making people pay more for parking, but we decided that would be really unpopular.",
        "So instead, we just stopped people from parking on King Street, but left the other car parks open.",
        "It was surprising how much of a difference all this made.",

        {
          text: "As we'd predicted, air quality was significantly better, but what I hadn't expected was how much quieter it would be, even with the buses still running.",
          number: 20,
        },

        {
          text: "Of course, everyone said they felt safer, but we were actually amazed that sales in the shops went up considerably that day.",
          number: 20,
        },
        "We thought there'd be fewer people out shopping, not more.",
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
    "When did the Street Play Scheme first take place?",
    "How often is Beechwood Road closed to traffic now?",
    "Who is responsible for closing the road?",
    "Residents who want to use their cars",
    "Alice says that Street Play Schemes are most needed in",
    "What has been the reaction of residents who are not parents?",
    "What does Alice consider the main benefit of street play for children?",
    "What other important benefit does Alice mention for children in street play?",
    "Which result of the King Street experiment surprised Alice the most?",
    "Which other outcome of the King Street experiment was unexpected?",
  ];

  const options = [
    ["A. two years ago", "B. three years ago", "C. six years ago"],

    ["A. once a week.", "B. on Saturdays and Sundays", "C. once a month"],

    ["A. a council official", "B. the police", "C. the wardens."],

    [
      "A. have to park in another street.",
      "B. must drive very slowly.",
      "C. need permission from a warden",
    ],
    [
      "A. wealthy areas.",
      "B. quiet suburban areas.",
      "C. areas with heavy traffic.",
    ],
    [
      "A. Many of them were unhappy at first.",
      "B. They like seeing children play in the street.",
      "C. They are surprised by the lack of noise.",
    ],
    [
      "A. More outdoor exercise",
      "B. Gaining independence",
      "C. Learning new games",
    ],
    [
      "A. Meeting neighbors and building community",
      "B. Making new friends",
      "C. Improving academic skills",
    ],
    ["A. More shoppers", "B. Improved safety", "C. Less air pollution"],
    [
      "A. More relaxed atmosphere",
      "B. Less noise pollution",
      "C. Increased pedestrian traffic",
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
      if (speaker === "PRESENTER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "ALICE") {
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
    11: "B. three years ago",
    12: "A. once a week",
    13: "C. the wardens",
    14: "B. must drive very slowly",
    15: "C. areas with heavy traffic",
    16: "B. They like seeing children play in the street",
    17: "B. Gaining independence",
    18: "A. Meeting neighbors and building community",
    19: "A. More shoppers",
    20: "B. Less noise pollution",
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
    localStorage.setItem("/listening3Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part22020");
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
                {renderText("Street Play Scheme")}
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
            <h2 className="text-lg font-bold">Questions 11-20</h2>
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
      <Listening3Pagination2020></Listening3Pagination2020>
    </div>
  );
};

export default Listening3Part22020;
