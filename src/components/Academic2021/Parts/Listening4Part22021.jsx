import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening4Pagination2021 from "../Pagination 2021/Listening4Pagination2021";

const Listening4Part22021 = () => {
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
        "Part 2, you will hear a town councilor reporting on the local transport network and a recreation facility.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "CHAIRPERSON",
      text: [
        "Right, next on the agenda, we have traffic and highways. Councilor Thornton.",
      ],
    },
    {
      speaker: "COUNCILLOR THORNTON",
      text: [
        "Thank you. Well, we now have the results of the survey carried out last month about traffic and road transport in the town.",
        "People were generally satisfied with the state of the roads.",
        "There were one or two complaints about potholes which will be addressed.",
        "But a significant number of people complained about the increasing number of heavy vehicles using our local roads to avoid traffic elsewhere.",
        {
          text: "We'd expected more complaints by commuters about the reduction in the train service. But it doesn't seem to have affected people too much.",
          number: 11,
        },
        "The cycle path that runs alongside the river is very well used by both cyclists and pedestrians, since the surface was improved last year, but overtaking can be a problem.",
        {
          text: "So we're going to add a bit on the side to make it wider.",
          number: 12,
        },
        "At some stage, we'd like to extend the path, so that it goes all the way through the town, but that won't be happening in the immediate future.",
        "The plans to have a pedestrian crossing next to the Post Office have unfortunately had to be put on hold for the time being.",
        "We'd budgeted for this to be done this financial year.",
        "But then there were rumors that the Post Office was going to move, which would have meant there wasn't really a need for a crossing.",
        "Now they've confirmed that they're staying where they are.",
        "But the Highways Department have told us that it would be dangerous to have a pedestrian crossing where we'd originally planned it, as there's a bend in the road there, so that'll need some more thought.",
        {
          text: "On Station Road near the station and level crossing, drivers can face quite long waits if the level crossing's closed, and we've now got signs up requesting them not to leave their engines running at that time.",
          number: 13,
        },
        {
          text: "This means pedestrians waiting on the pavement to cross the railway line don't have to breathe in car fumes.",
          number: 14,
        },
        "We've had some problems with cyclists leaving their bikes chained to the railings outside the ticket office.",
        "But the station has agreed to provide bike racks there.",
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
      speaker: "CHAIRPERSON",
      text: [
        "So next on the agenda is 'Proposals for improvements to the recreation ground'. Councilor Thornton again.",
      ],
    },
    {
      speaker: "COUNCILLOR THORNTON",
      text: [
        "Well, since we managed to extend the recreation ground, we've spent some time talking to local people about how it could be made a more attractive and useful space.",
        "If you have a look at the map up on the screen, you can see the river up in the north, and the Community Hall near the entrance from the road.",
        "At present, cars can park between the Community Hall and that line of trees to the east, but this is quite dangerous for pedestrians.",
        {
          text: "So we're suggesting a new car park on the opposite side of the Community Hall right next to it.",
          number: 15,
        },
        "We also have a new location for the cricket pitch, as we've now purchased additional space to the east of the recreation ground, beyond the trees.",
        {
          text: "We plan to move it away from its current location, which is rather near the road, into this new area beyond the line of trees.",
          number: 16,
        },
        "This means there's less danger of stray balls hitting cars or pedestrians.",
        "We've got plans for a children's playground, which will be accessible by a footpath from the Community Hall, and will be alongside the river.",
        {
          text: "We'd originally thought of having it close to the road. But we think this will be a more attractive location.",
          number: 17,
        },
        "The skateboard ramp is very popular with both younger and older children.",
        "We had considered moving this up towards the river, but in the end we decided to have it in the southeast corner near the road.",
        {
          text: "The pavilion is very well used at present by both football players and cricketers. It will stay where it is now, to the left of the line of trees and near to the river.",
          number: 18,
        },
        {
          text: "Handy for both the football and cricket pitches, and finally, we'll be getting a new notice board for local information, and that will be directly on people's right as they go from the road into the recreation ground.",
          number: 19,
        },
        {
          text: "That has quite a pleasant view, as it looks out onto the trees.",
          number: 20,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have half a minute to check your answers to part 2.",
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

  //  Marks show
  //  Marks show
  const correctAnswers = {
    11: "C",
    12: "A",
    13: "B",
    14: "C",
    15: "D",
    16: "H",
    17: "A",
    18: "F",
    19: "B",
    20: "I",
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
    localStorage.setItem("/listening1Part22021", newScore);
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
                {renderText("Town Infrastructure Updates and Proposals")}
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
          {/* ---------- Questions 11–14 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–14")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>
          <h2 className="text-lg font-bold mb-3 text-center">
            {renderText("Local council report on traffic and highways")}
          </h2>
          {/* Q11 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              {renderText(
                "11. A survey found people's main concern about traffic in the area was"
              )}
            </p>
            {[
              "cuts to public transport.",
              "poor maintenance of roads.",
              "changes in the type of traffic.",
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
                "12. Which change will shortly be made to the cycle path next to the river?"
              )}
            </p>
            {[
              "It will be widened.",
              "It will be extended.",
              "It will be resurfaced.",
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
              {renderText(
                "13. Plans for a pedestrian crossing have been postponed because"
              )}
            </p>
            {[
              "the Post Office has moved.",
              "the proposed location is unsafe.",
              "funding is not available at present.",
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
          <div className="mb-10">
            <p className="font-semibold mb-2">
              {renderText("14. On Station Road, notices have been erected")}
            </p>

            {[
              "telling cyclists not to leave their bikes outside the station ticket office.",
              "asking motorists to switch off engines when waiting at the level crossing.",
              "warning pedestrians to leave enough time when crossing the railway line.",
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

          {/* ---------- Questions 15–20 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 15–20")}
          </h2>
          <h2 className="text-lg font-bold mb-3">
            {renderText("Label the map below")}
          </h2>
          <h2 className="text-lg font-bold mb-3">
            {renderText(
              "Choose the correct letter, A–I, next to Questions 15–20."
            )}
          </h2>

          <div className="mt-5 flex items-center justify-center">
            <img
              src="https://i.ibb.co.com/5g27KfX9/a16t4l2.jpg"
              alt="Map diagram"
              className="w-[350px] h-auto"
            />
          </div>

          <div className="p-5 rounded-lg bg-white space-y-4">
            {[
              "New car park",
              "New cricket pitch",
              "Children's playground",
              "Skateboard ramp",
              "Pavilion",
              "Notice board",
            ].map((place, index) => {
              const qNum = 15 + index;
              return (
                <div key={qNum} className="flex items-center gap-1">
                  <span className="font-semibold">{qNum}.</span>
                  <span>{place}</span>
                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value="">{qNum}</option>
                    {"ABCDEFGHI".split("").map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
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
      <Listening4Pagination2021></Listening4Pagination2021>
    </div>
  );
};

export default Listening4Part22021;
