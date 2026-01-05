import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2022 from "../Pagination2022/Listening4Pagination2022";

const Listening4Part22022 = () => {
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
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 2. You will hear a training manager giving a talk to a group of senior staff from a hotel chain about the problem of high staff turnover.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "As many of you here today have worked in the hotel industry for some time, I'm sure you have experienced the problem of high staff turnover in your hotels.",
        "Every hotel relies on having loyal and experienced members of staff who make sure that everything runs smoothly.",
        "If staff are constantly changing it can make life difficult for everyone.",
        "But why do staff leave frequently in many hotels?",
        "Of course, many hotel jobs such as cleaning are low skilled and are not well paid.",
        "A lot of managers think it's this, and the long hours that are the main causes of high staff turnover, but what they don't realize is that it's the lack of training in many hotel jobs.",
        {
          text: "Which is a huge factor.",
          number: 11,
        },
        "So, what kind of problems does a high turnover of staff cause?",
        "Well, having to recruit new staff all the time can be very time consuming.",
        "And managers may have to cover some duties while waiting for new staff to arrive.",
        {
          text: "This means they don't have time to think about less immediate problems, such as how to improve their service.",
          number: 12,
        },
        "When staff leave, it can also severely affect the colleagues they leave behind.",
        "It has a negative effect on remaining staff, who may start to feel that they too should be thinking about leaving.",
        "So what can be done to change this situation?",
        "Firstly, managers should stop making basic errors, which leave their staff feeling upset and resentful.",
        "When organizing shifts, for example.",
        {
          text: "Make sure you never give certain staff preferential treatment.",
          number: 13,
        },
        "All staff should be given some choice about when they work, and everyone should have to work some evening and weekend shifts.",
        "If you treat staff fairly, they'll be more likely to step in and help when extra staff are needed.",
        "Keeping staff happy has other tangible benefits for the business.",
        "Take the Dunwich Hotel as an example.",
        "It had been experiencing a problem with staff complaints, and in order to deal with this, invested in staff training and improved staff conditions.",
        {
          text: "Not only did the level of complaints fall, but they also noticed a significant increase in the amount each customer spent during their stay.",
          number: 14,
        },
        "They have now introduced a customer loyalty scheme, which is going really well.",
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
      speaker: "SPEAKER",
      text: [
        "Now, I'd like to look at some ways you can reduce staff turnover in your hotels, and I'll do this by giving some examples of hotels where I've done some training recently.",
        "The Sun Club received feedback which showed that staff thought managers didn't value their opinions.",
        "They weren't made to feel they were partners who were contributing to the success of the business as a whole.",
        "This situation has changed.",
        {
          text: "Junior staff at all levels are regularly invited to meetings where their ideas are welcomed.",
          number: 15,
        },
        "A year ago, The Portland recognized the need to invest in staff retention.",
        "Their first step was to introduce a scheme for recognizing talent amongst their employees.",
        {
          text: "The hope is that organizing training for individuals with management potential will encourage them to stay with the business.",
          number: 16,
        },
        "At Bluewater, managers decided to recognize 50 high achievers from across the company's huge hotel chain as a reward.",
        {
          text: "They're sent on an all-expenses-paid trip abroad every year.",
          number: 17,
        },
        "Fun is an important element in the trips, but there's also the opportunity to learn something useful.",
        "This year's trip included a visit to a brewery, where staff learned about the new beer that would be served in the hotel.",
        "Pentlow Hotels identified that retention of junior reception staff was an issue in order to encourage them to see that working in a hotel could be worthwhile and rewarding, with good prospects, they introduced a management program.",
        {
          text: "These staff were given additional responsibilities.",
          number: 18,
        },
        "And the chance to work in various roles in the hotel.",
        "Green Planet wanted to be seen as a caring employer.",
        "To make life easier for staff, many of whom had childcare responsibilities, the hotel began issuing vouchers to help cover the cost of childcare.",
        {
          text: "Louise Marsh at the Amesbury has one of the best staff retention rates in the business.",
          number: 19,
        },
        "Since she joined the company, she's made a huge effort to achieve this.",
        {
          text: "By creating a co-operative and supportive environment.",
          number: 20,
        },
        "For her, the staff are part of a large family where everyone is valued.",
        "OK, now I'd like to...",
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
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

  const correctAnswers = {
    11: "A", // Many hotel managers unaware due to lack of training
    12: "A", // High staff turnover increases manager workload
    13: "A", // Managers should avoid failing to treat staff equally
    14: "C", // Dunwich Hotel saw a rise in spending per customer

    15: "A", // The Sun Club – improving relationships and teamwork
    16: "C", // The Portland – providing career opportunities
    17: "B", // Bluewater Hotels – offering incentives and financial benefits
    18: "C", // Pentlow Hotels – providing career opportunities
    19: "B", // Green Planet – offering incentives and financial benefits
    20: "A", // The Amesbury – improving relationships and teamwork
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "11-12") {
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
    localStorage.setItem("/listening3Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part22022");
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
                {renderText("Hotel Management")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–20")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Choose the correct letter, A, B or C.")}
          </h3>

          <div className="p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Hotel Management")}
            </h1>

            {/* ---------- Questions 11–14 ---------- */}
            {[11, 12, 13, 14].map((qNum) => {
              let questionText = "";
              let options = [];
              switch (qNum) {
                case 11:
                  questionText =
                    "Many hotel managers are unaware that their staff often leave because of";
                  options = ["a lack of training.", "long hours.", "low pay."];
                  break;
                case 12:
                  questionText =
                    "What is the impact of high staff turnover on managers?";
                  options = [
                    "an increased workload",
                    "low morale",
                    "an inability to meet targets",
                  ];
                  break;
                case 13:
                  questionText = "What mistake should managers always avoid?";
                  options = [
                    "failing to treat staff equally",
                    "reorganising shifts without warning",
                    "neglecting to have enough staff during busy periods",
                  ];
                  break;
                case 14:
                  questionText =
                    "What unexpected benefit did Dunwich Hotel notice after improving staff retention rates?";
                  options = [
                    "a fall in customer complaints",
                    "an increase in loyalty club membership",
                    "a rise in spending per customer",
                  ];
                  break;
                default:
                  break;
              }

              return (
                <div key={qNum}>
                  <p className="text-lg font-bold mt-4">
                    {qNum} {renderText(questionText)}
                  </p>
                  {options.map((text, index) => {
                    const value = String.fromCharCode(65 + index);
                    return (
                      <label
                        key={value}
                        className="flex items-center gap-2 mb-1"
                      >
                        <input
                          type="radio"
                          name={`q${qNum}`}
                          value={value}
                          checked={userAnswers[qNum] === value}
                          onChange={(e) =>
                            handleInputChange(qNum, e.target.value)
                          }
                        />
                        <span>
                          {value}. {renderText(text)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              );
            })}

            {/* ---------- Questions 15–20 ---------- */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 15–20")}
            </h2>
            <p className="mb-3">
              {renderText(
                "Which way of reducing staff turnover was used in each of the following hotels?"
              )}
            </p>
            <p className="font-semibold mb-2">
              {renderText("Choose the correct letter, A–C.")}
            </p>

            <div className="mb-4 border max-w-[300px] mx-auto p-4">
              <p className="font-semibold mb-2 text-center">
                {renderText("Ways of reducing staff turnover")}
              </p>
              <p>A. {renderText("improving relationships and teamwork")}</p>
              <p>
                B. {renderText("offering incentives and financial benefits")}
              </p>
              <p>C. {renderText("providing career opportunities")}</p>
            </div>

            {[
              { hotel: "The Sun Club", qNum: 15 },
              { hotel: "The Portland", qNum: 16 },
              { hotel: "Bluewater Hotels", qNum: 17 },
              { hotel: "Pentlow Hotels", qNum: 18 },
              { hotel: "Green Planet", qNum: 19 },
              { hotel: "The Amesbury", qNum: 20 },
            ].map(({ hotel, qNum }) => (
              <div key={qNum} className="flex items-center mb-2 gap-2">
                <span className="font-bold w-5">{qNum}</span>
                <span className="w-32">{renderText(hotel)}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1 w-15 text-center"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
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
                    {Array.from({ length: 10 }, (_, i) => i + 11).map((num) => {
                      const user = userAnswers[num];
                      const correct = correctAnswers[num];

                      const isCorrect =
                        user?.trim()?.toUpperCase() ===
                        correct?.trim()?.toUpperCase();
                      const noAnswer = !user;

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
                              user
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            {correct}
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
      <Listening4Pagination2022></Listening4Pagination2022>
    </div>
  );
};

export default Listening4Part22022;
