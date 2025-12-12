import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2017 from "../Pagination2017/Listening3Pagination2017";

const Listening3Part22017 = () => {
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
        "Section 2. You will hear part of a training session for new employees at a large travel company.",
        "First, you have some time to look at questions 11 to 17.",
        "Now listen carefully and answer questions 11 to 17.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "In this session in your training day, we're going to look at some of the more specialized holidays we offer at BC Travel.",
        "Now, the travel business is very competitive and it's important to be aware of how the market's changing and developing.",

        {
          text: "In terms of age groups, the over 65s are an important market, and one that's increasing steadily year on year.",
          number: 12,
        },
        "The fewest holidays are taken by the 31 to 42 year olds. And that figure shows no sign of rising.",
        "The biggest market at present is still the youngest group, the 16 to 30s, but this group's also seen the biggest drop over the last few years.",

        {
          text: "Whereas there's a noticeable growth in the number of holidays taken by the 55 to 64 year olds.",
          number: 11,
        },
        "As far as the 43 to 54 year olds are concerned, bookings there are steady, but we haven't seen the increase we expected.",
        "One trend we're noticing with nearly all age groups is the growing popularity of holidays in which clients do some kind of specialized activity.",
        "I'm not talking here about adventure holidays where clients take part in high risk activities like white water rafting, just for the thrill of it.",
        "Activity holidays usually involve rather less high-risk sports or things like art and music.",

        {
          text: "They're not necessarily cheaper than ordinary holidays, often the opposite in fact, but they do often take place outside the main tourist centers, which gives an opportunity for clients to find out more about the local people and customs.",
          number: 14,
        },
        "And many say this is one of the most positive features of these holidays.",
        "Of course, they offer the chance to develop a new skill or talent.",
        {
          text: "But clients often say that more than this, it's the chance to create lasting relationships with other like-minded people that's the main draw.",
          number: 13,
        },
        "Let me give you some examples of BC Travel activity holidays.",
        "Our painting holidays take place in four different centres in France and Italy.",
        "They're very popular with clients of all abilities from beginners onwards.",

        {
          text: "We've got an excellent team of artists to lead the classes; some have been with us from the start, and five additional ones will be joining us this year so that we can offer a greater number of classes in each centre.",
          number: 15,
        },

        {
          text: "As far as cooking holidays are concerned, many agents offer holidays where clients cook recipes related to one country, but we focus on dishes from many different ones.",
          number: 16,
        },
        "Apart from that, you'll find the usual emphasis on good quality organic ingredients, and there are generally some meat-free recipes included.",
        "Photography holidays take place in a wide range of countries from Iceland to Vietnam, with opportunities to see stunning scenery.",

        {
          text: "Groups are small, no more than eight, so clients can have one-on-one tuition, and excursions are arranged with fully trained guides.",
          number: 17,
        },
        "At the end of each holiday, an exhibition is held of the photographs taken, so clients can receive valuable feedback.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the training session, you have some time to look at questions 18 to 20.",
        "Now listen and answer questions 18 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Finally, let me tell you about our fitness holidays.",
        "In Ireland and Italy, we run one-week general fitness classes for all ages and levels.",
        "Clients start the course with a consultation with a trainer, and together they draw up an individual program.",

        {
          text: "As well as improving general fitness, clients find they end up losing much of the stress built up in their daily lives.",
          number: 18,
        },

        {
          text: "In Greece, we have a two-week holiday for clients who want to do something about their weight.",
          number: 19,
        },
        "This includes all the usual features such as a personalised diet program, but the most popular feature is that the exercise classes are all held on the beach.",
        "Finally, we offer several holidays in Morocco.",
        "One very popular one is the mountain biking holiday.",
        "Bikes are provided and there are routes for all levels.",
        {
          text: "We offer one tailored for families, which is particularly popular.",
          number: 20,
        },
        "OK, so that's about all the time I have today.",
        "Thank you very much.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 2.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "Which age group is taking an increasing number of holidays with BC Travel?",
    "Which age group is also increasing steadily year on year?",
    "What is one main reason for the popularity of activity holidays?",
    "What do clients say they enjoy most about activity holidays?",
    "How does BC Travel plan to expand the painting holidays?",
    "Why are BC Travel's cooking holidays unusual?",
    "What does the speaker say about the photography holidays?",
  ];

  const options = [
    // Question 11
    ["A. 16–30 years", "B. 55–64 years", "C. 31–42 years"],

    // Question 12
    ["A. Over 65 years", "B. 43–54 years", "C. 16–30 years"],

    // Question 13
    [
      "A. Clients make new friends",
      "B. Clients enjoy high-risk activities",
      "C. Clients find them cheap",
    ],

    // Question 14
    [
      "A. Learning about a new culture",
      "B. Learning a new skill",
      "C. Building lasting relationships with like-minded people",
    ],

    // Question 15
    [
      "A. by adding to the number of locations",
      "B. by increasing the range of levels",
      "C. by employing more teachers",
    ],

    // Question 16
    [
      "A. They only use organic foods",
      "B. They have an international focus",
      "C. They mainly involve vegetarian dishes",
    ],

    // Question 17
    [
      "A. Clients receive individual tuition",
      "B. The tutors are also trained guides",
      "C. Advice is given on selling photographs",
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

      // Erica: female
      if (speaker === "ERICA MATTHEWS") {
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
  11: "B. 55–64 years",
  12: "A. Over 65 years",
  13: "A. Clients make new friends",
  14: "C. Building lasting relationships with like-minded people",
  15: "C. by employing more teachers",
  16: "B. They have an international focus",
  17: "A. Clients receive individual tuition",
  18: "stress",
  19: "diet",
  20: "families",
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
    localStorage.setItem("/listening1Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22020");
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
                {renderText("BC travel fitness holidays")}
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
              {renderText("Questions 11-17")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 11;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col gap-2 ml-4">
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
          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 18-20")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Write")}{" "}
              <span className="font-bold">{renderText("ONLY ONE WORD")}</span>{" "}
              {renderText("for each answer.")}
            </h3>
            <h1 className="text-2xl font-bold text-center mb-5">
              {renderText("  Fitness Holidays")}
            </h1>
            <tbody>
              {/* Ireland & Italy */}
              <tr>
                <td className="border border-gray-400 text-lg p-2">
                  Ireland and Italy
                </td>
                <td className="border border-gray-400 text-lg p-2">
                  general fitness
                </td>
                <td className="border border-gray-400 text-lg p-2">
                  <div>personally designed programme</div>
                  <div>also reduces</div>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => toggleButton(18)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[18]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      18
                    </button>
                    <input
                      value={userAnswers[18] || ""}
                      onChange={(e) => handleInputChange(18, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </div>
                </td>
              </tr>

              {/* Greece */}
              <tr>
                <td className="border border-gray-400 text-lg p-2">Greece</td>
                <td className="border border-gray-400 text-lg p-2">
                  weight control
                </td>
                <td className="border border-gray-400 text-lg p-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleButton(19)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[19]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      19
                    </button>
                    <input
                      value={userAnswers[19] || ""}
                      onChange={(e) => handleInputChange(19, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span className="ml-2">includes exercise on the beach</span>
                  </div>
                </td>
              </tr>

              {/* Morocco */}
              <tr>
                <td className="border border-gray-400 text-lg p-2">Morocco</td>
                <td className="border border-gray-400 text-lg p-2">
                  mountain biking
                </td>
                <td className="border border-gray-400 text-lg p-2">
                  <div>wide variety of levels</div>
                  <div className="flex items-center mt-1">
                    <span>one holiday that is specially designed for</span>
                    <button
                      onClick={() => toggleButton(20)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[20]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      20
                    </button>
                    <input
                      value={userAnswers[20] || ""}
                      onChange={(e) => handleInputChange(20, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
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
                    All Answers (11–20)
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
      <Listening3Pagination2017></Listening3Pagination2017>
    </div>
  );
};

export default Listening3Part22017;
