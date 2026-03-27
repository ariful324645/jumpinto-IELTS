import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2025 from "../Pagination 2025/Listening2Pagination2025";

const Listening2Part22025 = () => {
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
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 2. You will hear a man who works for Elmleigh Town Council talking to some people who want to join the small town's volunteer scheme.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully and answer questions 11 to 16.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "Good morning everyone.",
        "I'm Steve Wainwright from Elmleigh Town Council, and I organize the town's volunteer scheme.",
        "I'm delighted you're all interested in joining the scheme.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "Our volunteers help to create a sense of community among the many people who live in our historic town of Elmleigh,",
        "and make residents and visitors feel welcome at local events.",
        "At first, I'll mention just a few of the activities that volunteers carry out.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "One is to walk around the town centre streets wearing our volunteer T-shirt.",
        "Tourists often ask how to get to a particular shop,",
        {
          text: "and they might also be grateful for recommendations about what to visit.",
          number: 11,
        },
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "The town holds a large number of concerts each year,",
        {
          text: "and part of the volunteers' role is to get everyone in the audience to the right place as smoothly as possible.",
          number: 12,
        },
        "You'd be surprised how many people buy tickets then don't check them,",
        "and head for the wrong section of the hall.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "Volunteers may get involved with community groups,",
        {
          text: "such as sports clubs or gardeners' associations, where the volunteers talk about how groups can help each other.",
          number: 13,
        },
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "For instance, a writing group might want to travel to another town to hear a talk by a well-known author,",
        "but may not know that another club has a coach they could travel in.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "The town produces a monthly magazine, and anyone who lives in the town can send in articles.",
        "It's free to residents, and is paid for by local businesses.",
        "That's the responsibility of the council's advertising department.",
        {
          text: "We depend on volunteers though, to find out what people think of events they've attended, and any suggestions they have for the future.",
          number: 14,
        },
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "The volunteers then send a summary to the editors.",
        "There are a number of clubs for retired people,",
        "and every year, the council arranges lunch for all the members.",
        "The volunteers welcome the guests.",
        {
          text: "And when everyone's sitting down and relaxing after the meal, some volunteers put on a show, usually around half an hour of songs and short plays.",
          number: 15,
        },
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "The club members really welcome the chance to chat to the volunteers at these events.",
        "The town council has a website of course,",
        {
          text: "and volunteers are asked to help by making sure residents know about it.",
          number: 16,
        },
        "It's updated every day with information about future activities.",
        "And we want as many people as possible to use it.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 17 to 20.",
        "Now listen and answer questions 17 to 20.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "OK, now you know some of the things our volunteers do.",
        "I'll go on to some practical matters.",
        "As you probably know, the town arranges three major festivals every year,",
        "and they all depend on a large number of volunteers.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "The Book Festival lasts three days and uses several venues, which all need volunteers.",
        "More are needed for the music festival, because that lasts a whole week,",
        {
          text: "and even more help is required for the science festival.",
          number: 17,
        },
        "Even though it's only two days long, it involves quite a lot of venues though.",
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "It's a good idea to help at the festival you're most interested in,",
        "because you can attend most of the events for free.",
        "We try to use volunteers who are flexible though,",
        "because some festival events are held outdoors,",
        "and the weather may affect the size of the audience,",
        "and even whether the event can take place.",
        "So there can be changes at short notice.",
        {
          text: "What's essential though, is being able to get on well with other people, and also to deal with someone who's behaving badly.",
          number: 18,
        },
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "Our plan is to get you all working in September,",
        "after a week's training starting on the 2nd.",
        {
          text: "So we'll be timetabling you for duties the following week from the 9th onward.",
          number: 19,
        },
      ],
    },
    {
      speaker: "STEVE WAINWRIGHT",
      text: [
        "Later, in the week beginning September 23rd,",
        "we have a chat with each of you to find out how you feel about being a volunteer,",
        "and what extra support you need.",
        "As a thank you to the volunteers, we arrange an annual event.",
        "In recent years, we've had a party in the town hall,",
        "and last year, a barbecue in Chamber Park.",
        {
          text: "Our forthcoming event is a trip along the canal from here to Dewhurst and back.",
          number: 20,
        },
        "It's on Saturday, September the 28th,",
        "and if you'd like to attend, you can sign up once you start work.",
        "Now, this is the volunteers' T-shirt...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have 30 seconds to check your answers to part two.",
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
                : [p],
            )
          : [part],
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
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JANE") {
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

  const correctAnswers = {
    // Questions 11–16 (dropdown, A–I)
    11: "D", // walking around the town centre → giving advice to visitors
    12: "I", // helping at concerts → helping people find their seats
    13: "H", // getting involved with community groups → encouraging cooperation between local organisations
    14: "E", // helping with a magazine → collecting feedback on events
    15: "A", // participating at lunches for retired people → providing entertainment
    16: "B", // helping with the website → providing publicity about a council service

    // Questions 17–20 (radio buttons, A–C)
    17: "B", // the science festival
    18: "A", // interpersonal skills
    19: "B", // 9 September
    20: "A", // a boat trip
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "17-18" || id === "19-20") {
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
    localStorage.setItem("/listening1Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
                {renderText(
                  "Elmleigh Town Council Volunteer Scheme Introduction",
                )}
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

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Elmleigh Town Council Volunteer Scheme")}
            </h1>

            {/* ================= Questions 11–16 (Dropdown) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 11–16")}
              </h2>
              <p>
                {renderText(
                  "What is the role of the volunteers in each of the following activities?",
                )}
              </p>
              <p>{renderText("Choose the correct letter, A–I.")}</p>

              {/* Role list */}
              <div className="space-y-1 border p-4 max-w-[500px] mx-auto mt-4">
                <h3 className="font-bold text-xl text-center">
                  {renderText("Role of volunteers")}
                </h3>

                {[
                  "providing entertainment",
                  "providing publicity about a council service",
                  "contacting local businesses",
                  "giving advice to visitors",
                  "collecting feedback on events",
                  "selling tickets",
                  "introducing guest speakers at an event",
                  "encouraging cooperation between local organisations",
                  "helping people find their seats",
                ].map((role, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <p key={idx}>
                      <strong>{letter}.</strong> {renderText(role)}
                    </p>
                  );
                })}
              </div>

              {[
                { num: 11, label: "walking around the town centre" },
                { num: 12, label: "helping at concerts" },
                { num: 13, label: "getting involved with community groups" },
                { num: 14, label: "helping with a magazine" },
                {
                  num: 15,
                  label: "participating at lunches for retired people",
                },
                { num: 16, label: "helping with the website" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <div>
                    <span className="w-[260px]">{renderText(label)}</span>
                  </div>

                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 17–20 (Radio) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 17–20")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  num: 17,
                  question:
                    "Which event requires the largest number of volunteers?",
                  options: [
                    "the music festival",
                    "the science festival",
                    "the book festival",
                  ],
                },
                {
                  num: 18,
                  question:
                    "What is the most important requirement for volunteers at the festivals?",
                  options: [
                    "interpersonal skills",
                    "personal interest in the event",
                    "flexibility",
                  ],
                },
                {
                  num: 19,
                  question:
                    "New volunteers will start working in the week beginning",
                  options: ["2 September.", "9 September.", "23 September."],
                },
                {
                  num: 20,
                  question: "What is the next annual event for volunteers?",
                  options: ["a boat trip", "a barbecue", "a party"],
                },
              ].map(({ num, question, options }) => (
                <div key={num} className="mt-6">
                  <p className="font-bold text-lg">
                    {num}. {renderText(question)}
                  </p>

                  <div className="space-y-2 mt-2">
                    {options.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx);
                      return (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={num}
                            value={value}
                            checked={userAnswers[num] === value}
                            onChange={() => handleInputChange(num, value)}
                          />
                          <span className="font-semibold">{value}.</span>
                          <span>{renderText(opt)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* ================= Submit & Result ================= */}

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
                      {Array.from({ length: 10 }, (_, i) => i + 11).map(
                        (num) => {
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
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
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
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening2Pagination2025></Listening2Pagination2025>
    </div>
  );
};

export default Listening2Part22025;
