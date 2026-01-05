import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2021 from "../Pagination 2021/Listening3Pagination2021";

const Listening3Part22021 = () => {
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
        "Part 2. You will hear a recruitment officer called Megan Baker, giving a talk at a jobs fair about opportunities for those interested in the food and agriculture sectors.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "MEGAN BAKER",
      text: [
        "Hello, everyone.",
        "My name is Megan Baker, and I'm a recruitment consultant at AVT Recruitment Specialists.",
        "Now, our company specializes in positions that involve working in the agriculture and horticulture sectors, so that's fresh food production,",
        "garden and park maintenance and so on, and these sectors do provide some very special career opportunities.",
        "For a start, they often offer opportunities for those who don't want to be stuck with a 40-hour week,",
        {
          text: "but need to juggle work with other responsibilities, such as childcare.",
          number: 12,
        },
        "And this is very important for many of our recruits.",
        "Some people like working in a rural setting, surrounded by plants and trees instead of buildings.",
        "Although we can't guarantee that.",
        "But there are certainly health benefits,",
        {
          text: "especially in jobs where you're not sitting all day looking at a screen.",
          number: 11,
        },
        "A big plus for many people.",
        "Salaries can sometimes be good too, although there's a lot of variety here.",
        "And you may have the opportunity in some types of jobs for travel overseas,",
        "although that obviously depends on the job, and not everyone is keen to do it.",
        "Of course, working outdoors does have its challenges.",
        "It's fine in summer, but can be extremely unpleasant when it's cold and windy.",
        {
          text: "You may need to be pretty fit for some jobs.",
          number: 14,
        },
        "Though with modern technology, that's not as important as it once was.",
        "And standards of health and safety are much higher now than they used to be.",
        "So there are fewer work-related accidents,",
        "but if you like a lively city environment surrounded by lots of people,",
        {
          text: "these jobs are probably not for you.",
          number: 13,
        },
        "They're often in pretty remote areas,",
        "and some people worry about finding a suitable place to live,",
        "but in our experience, this usually turns out fine.",
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
      speaker: "MEGAN BAKER",
      text: [
        "Now, let me tell you about some of the exciting jobs that we have on our books right now.",
        "One is for a fresh food commercial manager.",
        "Our client here is a very large fresh food producer, supplying a range of top supermarkets.",
        "They operate in a very fast-paced environment with low profit margins.",
        {
          text: "The staff there work hard, but they play hard as well.",
          number: 15,
        },
        "So, if you have a sociable personality, this may be for you.",
        "We have an exciting post as an agronomist, advising farmers on issues such as crop nutrition,",
        "protection against pests, and the latest legislation on farming and agricultural practices.",
        "There are good opportunities for the right person to quickly make their way up the career ladder,",
        {
          text: "but a deep knowledge of the agricultural sector is expected of applicants.",
          number: 16,
        },
        "A leading supermarket is looking for a fresh produce buyer,",
        "who is available for a 12-month maternity cover contract.",
        {
          text: "You need to have experience in administration, planning and buying in the fresh produce industry.",
          number: 17,
        },
        "In return, you will receive a very competitive salary.",
        "We have also received a request for a sales manager for a chain of garden centres.",
        "You will be visiting centres in the region to ensure their high levels of customer service are maintained.",
        {
          text: "This post is only suitable for someone who is prepared to live in the region.",
          number: 18,
        },
        "There is also a vacancy for a tree technician to carry out tree cutting, forestry and conservation work.",
        "Candidates must have a clean driving licence and have training in safety procedures.",
        "A year's experience would be preferred,",
        {
          text: "but the company might be prepared to consider someone who has just completed an appropriate training course.",
          number: 19,
        },
        "Finally, we have a position for a farm worker.",
        "This will involve a wide range of farm duties, including crop sowing and harvesting,",
        "machine maintenance and animal care.",
        "Perks of the job include the possibility of renting a small cottage on the estate,",
        {
          text: "and a chance to earn a competitive salary.",
          number: 20,
        },
        "A driving licence and tractor driving experience are essential.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 2.",
        "You now have half a minute to check your answers to Part 2.",
      ],
    },
  ];

  // different option
  const questions = [
    "Which TWO facilities at the leisure club have recently been improved?",
  ];

  const options = [
    [
      "A. the gym",
      "B. the tracks",
      "C. the indoor pool",
      "D. the outdoor pool",
      "E. the sports training for children",
    ],
  ];
  const notesQuestions = [
    "New members should describe any ____.",
    "The ____ will be explained to you before you use the equipment.",
    "You will be given a six-week ____.",
    "There is a compulsory £90 ____ fee for members.",
    "Gold members are given ____ to all the LP clubs.",
    "Premier members are given priority during ____ hours.",
    "Premier members can bring some ____ every month.",
    "Members should always take their ____ with them.",
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
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JOY PARKINS") {
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
  // Marks show
  const correctAnswers = {
    "11-12": ["C", "E"], // Q11 and Q12 combined
    "13-14": ["C", "E"],
    15: "D",
    16: "F",
    17: "A",
    18: "H",
    19: "C",
    20: "G",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "11-12" || id === "13-14") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // const handleMultiSelectChange = (questionId, letter) => {
  //   setUserAnswers((prev) => {
  //     const current = prev[questionId] || [];

  //     let updated;
  //     if (current.includes(letter)) {
  //       // Remove the letter if already selected
  //       updated = {
  //         ...prev,
  //         [questionId]: current.filter((l) => l !== letter),
  //       };
  //     } else {
  //       // Add the letter
  //       updated = { ...prev, [questionId]: [...current, letter] };
  //     }

  //     calculateScore(updated); // recalc score immediately
  //     return updated;
  //   });
  // };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22021");
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
                {renderText("Food and Agriculture Sector Job Opportunities")}
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 11–12 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–12")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>

          <p className="mb-4 font-semibold">
            {renderText(
              "According to Megan, what are the TWO main advantages of working in the agriculture and horticulture sectors?"
            )}
          </p>

          {[
            "the active lifestyle",
            "the above-average salaries",
            "the flexible working opportunities",
            "the opportunities for overseas travel",
            "the chance to be in a natural environment",
          ].map((optionText, index) => {
            const value = String.fromCharCode(65 + index); // A, B, C, ...

            const selectedOptions = userAnswers["11-12"] || [];
            const isChecked = selectedOptions.includes(value);

            // Disable other checkboxes if 2 are already selected
            const isDisabled = selectedOptions.length === 2 && !isChecked;

            return (
              <label
                key={index}
                className={`flex items-center gap-3 cursor-pointer mb-1 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={userAnswers["11-12"]?.includes(value) || false}
                  onChange={() => handleInputChange("11-12", value)}
                />

                <span className="font-semibold">{value}.</span>
                <span>{renderText(optionText)}</span>
              </label>
            );
          })}

          {/* ---------- Questions 13–14 ---------- */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 13–14")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose TWO letters, A–E.")}
            </p>

            <p className="mb-4 font-semibold">
              {renderText(
                "Which TWO of the following are likely to be disadvantages for people working outdoors?"
              )}
            </p>

            {[
              "the increasing risk of accidents",
              "being in a very quiet location",
              "difficult weather conditions at times",
              "the cost of housing",
              "the level of physical fitness required",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A, B, C, D, E

              const selectedOptions = userAnswers["13-14"] || [];
              const isChecked = selectedOptions.includes(value);

              // Disable other checkboxes if 2 are already selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer mb-1 ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={userAnswers["13-14"]?.includes(value) || false}
                    onChange={() => handleInputChange("13-14", value)}
                  />

                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(optionText)}</span>
                </label>
              );
            })}
          </div>

          {/* ---------- Questions 15–20 ---------- */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">
              {renderText("Questions 15–20")}
            </h2>

            <p className="mb-4 font-semibold">
              {renderText(
                "What information does Megan give about each of the following job opportunities?"
              )}
            </p>

            <p className="mb-6 font-semibold">
              {renderText(
                "Choose the correct letter, A–H, next to Questions 15–20."
              )}
            </p>

            {/* Information box */}
            <div className="border border-gray-400 rounded-md p-4 max-w-sm mx-auto bg-white shadow-sm mb-6">
              <h3 className="font-semibold text-center mb-3">
                {renderText("Information")}
              </h3>
              <ul className="space-y-1 text-gray-700">
                {[
                  "A. not a permanent job",
                  "B. involves leading a team",
                  "C. experience not essential",
                  "D. intensive work but also fun",
                  "E. chance to earn more through overtime",
                  "F. chance for rapid promotion",
                  "G. accommodation available",
                  "H. local travel involved",
                ].map((item, index) => (
                  <li key={index}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            {/* Job list */}
            <div className="p-5 rounded-lg bg-white space-y-4">
              {[
                { qNum: 15, job: "Fresh food commercial manager" },
                { qNum: 16, job: "Agronomist" },
                { qNum: 17, job: "Fresh produce buyer" },
                { qNum: 18, job: "Garden centre sales manager" },
                { qNum: 19, job: "Tree technician" },
                { qNum: 20, job: "Farm worker" },
              ].map(({ qNum, job }) => (
                <div key={qNum} className="flex items-center gap-2">
                  <span className="font-semibold">{qNum}.</span>
                  <span className="">{renderText(job)}</span>
                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value="">{qNum}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
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
                    {["11-12", "13-14", 15, 16, 17, 18, 19, 20].map((num) => {
                      const user = userAnswers[num];
                      const correct = correctAnswers[num];

                      // Check correctness
                      const isCorrect = (() => {
                        if (Array.isArray(correct)) {
                          // Multi-select questions
                          return (
                            Array.isArray(user) &&
                            user.length === correct.length &&
                            correct.every((val) => user.includes(val))
                          );
                        } else if (typeof user === "string") {
                          // Single-answer questions
                          return (
                            user.trim().toLowerCase() ===
                            correct.trim().toLowerCase()
                          );
                        } else {
                          // No answer or invalid type
                          return false;
                        }
                      })();

                      const noAnswer = !user;

                      // For display
                      const userAnswerDisplay = Array.isArray(user)
                        ? user.join(", ")
                        : typeof user === "string"
                        ? user.trim()
                        : "";

                      const correctAnswerDisplay = Array.isArray(correct)
                        ? correct.join(", ")
                        : typeof correct === "string"
                        ? correct.trim()
                        : "";

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect && (
                              <FaDotCircle className="text-green-600 text-xl font-bold" />
                            )}
                            {!isCorrect && (
                              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                <ImCross className="text-white text-sm font-bold" />
                              </div>
                            )}
                            <p className="font-bold">Q{num}:</p>
                          </div>

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              userAnswerDisplay
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            {correctAnswerDisplay}
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
      <Listening3Pagination2021></Listening3Pagination2021>
    </div>
  );
};

export default Listening3Part22021;
