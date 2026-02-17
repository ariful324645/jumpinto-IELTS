import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2021 from "../Pagination 2021/Listening2Pagination2021";

const Listening2Part22021 = () => {
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
        "Part 2. You will hear a head teacher talking to parents of pupils about changes at the school.",
        "First, you have some time to look at questions 11 to 15.",
        "Now listen carefully and answer questions 11 to 15.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning, and thank you for coming here today.",
        "I'd like to bring you up to date with changes in the school that will affect your children.",
        "As you know, the school buildings date from various times, some from the 1970s, some from the last five years, and of course, Dartfield House is over a century old.",
        "It was commissioned by a businessman, Neville Richards, and intended as his family home, but he died before it was completed.",
        {
          text: "His heir chose to sell it to the local council, who turned it into offices.",
          number: 11,
        },
        "A later plan to convert it into a tourist information centre didn't come about through lack of money.",
        "Instead, it formed the nucleus of this school when it opened 40 years ago.",
        "The school has grown as the local population has increased.",
        "I can now give you some news about the lower school site, which is separated from the main site by a road.",
        "Planning permission has been granted for development of both sites.",
        "The lower school will move to new buildings that will be constructed on the main site.",
        {
          text: "Developers will construct houses on the existing lower school site.",
          number: 12,
        },
        {
          text: "Work on the new school buildings should start within the next few months.",
          number: 13,
        },
        "A more imminent change concerns the catering facilities and the canteen.",
        "The canteen is always very busy throughout the lunch period.",
        "In fact, it's often full to capacity, because a lot of our pupils like the food that's on offer there.",
        "However, there's only one serving point, so most pupils have to wait a considerable time to be served.",
        "This is obviously unsatisfactory, as they may have hardly finished their lunch before afternoon lessons start.",
        "So we've had a new Food Hall built, and this will come into use next week.",
        "It will have several serving areas, and I'll give you more details about those in a minute.",
        {
          text: "One thing we ask you to do is to discuss with your children each morning which type of food they want to eat that day.",
          number: 14,
        },
        "This will allow them to go straight to the relevant serving point.",
        "There won't be any junk food.",
        "Everything on offer will be healthy.",
        "There's no change to the current system of paying for lunches by topping up your child's electronic payment card online.",
        "You may be wondering what will happen to the old canteen.",
        "We'll still have tables and chairs in there, and pupils can eat food from the Food Hall or lunch they've brought from home.",
        {
          text: "Eventually, we may use part of the canteen for storage.",
          number: 15,
        },
        "But first, we'll see how many pupils go in there at lunchtime.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.",
        "Now listen and answer questions 16 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "OK, back to the serving points in the Food Hall.",
        "They will all have side dishes, desserts and drinks on sale, as well as main courses.",
        "One serving point we call World Adventures.",
        {
          text: "This will serve a different country's cuisine each day, maybe Chinese one day and Lebanese the next.",
          number: 16,
        },
        "The menus will be planned for a week at a time, so pupils will know what's going to be available that whole week.",
        "Street Life is also international, with food from three particular cultures.",
        "We'll ask pupils to make suggestions.",
        {
          text: "So perhaps sometimes there'll be food from Thailand, Ethiopia and Mexico.",
          number: 17,
        },
        "Then one of them will be replaced by Jamaican food for a week or two.",
        "The speedy Italian serving point will cater particularly for the many pupils who don't eat meat or fish.",
        {
          text: "They can be sure that all the food served there is suitable for them.",
          number: 18,
        },
        "There'll be plenty of variety, so they shouldn't get bored with the food.",
        "Now after-school lessons.",
        "These are very popular with pupils, particularly swimming.",
        "In fact, there's a waiting list for lessons.",
        "Cycling is another favourite.",
        "I'm delighted that dozens of pupils make use of the chance to learn to ride in off-road conditions.",
        "It means that more and more cycle to and from school every day.",
        "As you know, we have a well-equipped performance centre.",
        {
          text: "We're going to start drama classes in there too.",
          number: 20,
        },
        "Pupils will be able to join in just for fun, or work up to taking part in a play.",
        "We hope to put on at least one a year.",
        "We already teach a number of pupils to use the sound and lighting systems in the centre.",
        {
          text: "A former pupil has given a magnificent grand piano to the school.",
          number: 19,
        },
        "So a few pupils will be able to learn at the school instead of going to the local college.",
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
      if (speaker === "SPEAKER") {
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
    11: "C",
    12: "B",
    13: "A",
    14: "A",
    15: "C",
    16: "D",
    17: "A",
    18: "B",
    "19-20": ["A", "E"],
  };

  const [userAnswers, setUserAnswers] = useState({
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    "19-20": [],
  });

  const [score, setScore] = useState(0);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated);
      return updated;
    });
  };
  const handleChooseTwoChange = (id, letter) => {
    setUserAnswers((prev) => {
      const current = prev[id] || [];
      let updated;

      if (current.includes(letter)) {
        updated = {
          ...prev,
          [id]: current.filter((l) => l !== letter),
        };
      } else if (current.length < 2) {
        updated = {
          ...prev,
          [id]: [...current, letter],
        };
      } else {
        return prev;
      }

      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const correct = correctAnswers[key];
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (Array.isArray(user)) {
          // Count how many correct letters the user selected
          const correctCount = correct.filter((ans) =>
            user.includes(ans)
          ).length;
          newScore += correctCount; // ✅ Each correct letter = 1 mark
        }
      } else {
        if (user && user.toLowerCase() === correct.toLowerCase()) {
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
    localStorage.removeItem("/listening2Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part22021");
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
                {renderText("Updates on School Developments and Facilities")}
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
          {/* ---------- Questions 11–15 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–15")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          {/* Q11 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              {renderText("11. Dartfield House school used to be")}
            </p>
            {[
              "a tourist information centre",
              "a private home",
              "a local council building",
            ].map((item, i) => {
              const letter = ["A", "B", "C"][i];
              return (
                <label key={letter} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="q11"
                    checked={userAnswers[11] === letter}
                    onChange={() => handleInputChange(11, letter)}
                  />
                  <span>
                    {letter}. {item}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Q12 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              {renderText(
                "12. What is planned with regard to the lower school?"
              )}
            </p>
            {[
              "All buildings on the main site will be improved",
              "The lower school site will be used for new homes",
              "Additional school buildings will be constructed on the lower school site",
            ].map((item, i) => {
              const letter = ["A", "B", "C"][i];
              return (
                <label key={letter} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="q12"
                    checked={userAnswers[12] === letter}
                    onChange={() => handleInputChange(12, letter)}
                  />
                  <span>
                    {letter}. {item}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Q13 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              {renderText("13. The catering has been changed because of")}
            </p>
            {[
              "long queuing times",
              "changes to the school timetable",
              "dissatisfaction with the menus",
            ].map((item, i) => {
              const letter = ["A", "B", "C"][i];
              return (
                <label key={letter} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="q13"
                    checked={userAnswers[13] === letter}
                    onChange={() => handleInputChange(13, letter)}
                  />
                  <span>
                    {letter}. {item}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Q14 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              {renderText("14. Parents are asked to")}
            </p>
            {[
              "help their children to decide in advance which serving point to use",
              "make sure their children have enough money for food",
              "advise their children on healthy food to eat",
            ].map((item, i) => {
              const letter = ["A", "B", "C"][i];
              return (
                <label key={letter} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="q14"
                    checked={userAnswers[14] === letter}
                    onChange={() => handleInputChange(14, letter)}
                  />
                  <span>
                    {letter}. {item}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Q15 */}
          <div className="mb-10">
            <p className="font-semibold mb-2">
              {renderText(
                "15. What does the speaker say about the existing canteen?"
              )}
            </p>
            {[
              "Food will still be served there",
              "Only staff will have access to it",
              "Pupils can take their food into it",
            ].map((item, i) => {
              const letter = ["A", "B", "C"][i];
              return (
                <label key={letter} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="q15"
                    checked={userAnswers[15] === letter}
                    onChange={() => handleInputChange(15, letter)}
                  />
                  <span>
                    {letter}. {item}
                  </span>
                </label>
              );
            })}
          </div>

          {/* ---------- Questions 16–18 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 16–18")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose the correct letter, A–D.")}
          </p>

          {["World Adventures", "Street Life", "Speedy Italian"].map(
            (place, index) => {
              const qNum = 16 + index;
              return (
                <div key={qNum} className="flex items-center gap-3 mb-4">
                  <span className="font-semibold">
                    {qNum}. {place}
                  </span>
                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value="">{qNum}</option>
                    {["A", "B", "C", "D"].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
          )}

          {/* ---------- Questions 19–20 ---------- */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 19 and 20")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>
          <div className="mt-6">
            <p className="mb-4 font-semibold">
              {renderText("Questions 19–20: Choose TWO letters, A–E.")}
            </p>

            {[
              "swimming",
              "piano",
              "acting",
              "cycling",
              "theatre sound and lighting",
            ].map((item, i) => {
              const letter = String.fromCharCode(65 + i); // A–E
              const selected = userAnswers["19-20"] || [];

              const isChecked = selected.includes(letter);
              const isDisabled = selected.length === 2 && !isChecked;

              return (
                <label
                  key={letter}
                  className={`flex items-center gap-2 mb-1 cursor-pointer
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleChooseTwoChange("19-20", letter)}
                  />

                  <span className="font-semibold">
                    {letter}. {renderText(item)}
                  </span>
                </label>
              );
            })}
          </div>

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
                    {[11, 12, 13, 14, 15, 16, 17, 18, "19-20"].map((num) => {
                      const userAnswer = userAnswers[num];
                      const correctAnswer = correctAnswers[num];

                      const isMulti = Array.isArray(correctAnswer);

                      const noAnswer = isMulti
                        ? !userAnswer || userAnswer.length === 0
                        : !userAnswer;

                      const isCorrect = isMulti
                        ? userAnswer &&
                          userAnswer.length === correctAnswer.length &&
                          correctAnswer.every((ans) => userAnswer.includes(ans))
                        : userAnswer?.toLowerCase() ===
                          correctAnswer?.toLowerCase();

                      const isWrong = !noAnswer && !isCorrect;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
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
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>
                                {isMulti ? userAnswer.join(", ") : userAnswer}
                              </span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>
                              {isMulti
                                ? correctAnswer.join(", ")
                                : correctAnswer}
                            </span>
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
      <Listening2Pagination2021></Listening2Pagination2021>
    </div>
  );
};

export default Listening2Part22021;
