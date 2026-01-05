import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2022 from "../Pagination2022/Listening3Pagination2022";

const Listening3Part32022 = () => {
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
        "Part 3. You will hear Holly, a student on an events management course, talking to her tutor about her work placement.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        "Hello, Doctor Green. I'm here to talk to you about my work placement.",
      ],
    },
    {
      speaker: "TUTOR",
      text: ["Oh, yes, it's Holly, isn't it?"],
    },
    {
      speaker: "HOLLY",
      text: ["Yes."],
    },
    {
      speaker: "TUTOR",
      text: ["So, which work placement have you chosen?"],
    },
    {
      speaker: "HOLLY",
      text: [
        "I decided to go for the Orion Stadium placement.",
        "The event I'll be managing is one where I'm helping to set up a sports competition for primary school children.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Yep, that's always a popular placement, even though it can be tougher than you think working with children.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        "I know, but it's the fresh air that attracts me.",
        {
          text: "Organizing something indoors doesn't have the same appeal, even though it might be fun.",
          number: 21,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "OK, so obviously safety is going to be one of your key concerns for this event.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        "Yes, I've already thought about that.",
        "I'll need to make sure none of the equipment's damaged.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Well you'll be working with schools, so the equipment will be their responsibility.",
        "However, the grounds and what goes on there will be yours.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        "Oh, I see.",
        "That'll include keeping everyone within the boundary once they're in their kit and on the field.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Exactly.",
        "You'll need to inspect areas like changing rooms as well, for anything someone can trip over.",
        {
          text: "But your main priority will be not to lose anyone.",
          number: 22,
        },
      ],
    },
    {
      speaker: "HOLLY",
      text: ["Right. I'll need staff to help with that."],
    },
    {
      speaker: "TUTOR",
      text: ["And don't forget about the spectators."],
    },
    {
      speaker: "HOLLY",
      text: [
        "I was thinking that many of them will be parents who could help run the event.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "I wouldn't rely on that.",
        "They'll be more interested in filming their children than volunteering.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        "I'll need to make sure they don't interfere with events doing that.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        {
          text: "And that's not always easy, especially when a proud parent's trying to get a snap of their child, and you want them to move elsewhere.",
          number: 23,
        },
      ],
    },
    {
      speaker: "HOLLY",
      text: ["OK. What about the scheduling?"],
    },
    {
      speaker: "TUTOR",
      text: [
        "With sporting events, there are all sorts of things that can alter the timetable.",
        "Like rain for instance, though so far we've always been lucky with that.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        {
          text: "I was thinking about what to do if someone got hurt as well. I know that last year that caused a terrible delay.",
          number: 24,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: ["You have to be prepared for such things."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Now, the aim of your work placement is to give you the opportunity to develop the skills that an events manager needs.",
        "So, let's talk about those a bit.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        "Well, I think my communication skills are pretty good.",
        "I can talk on the phone to people, and book venues, and that kind of thing.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Good.",
        "Just remember, it isn't only about what you say.",
        {
          text: "If you meet someone face to face and want to persuade them to be a sponsor, for example.",
          number: 25,
        },
      ],
    },
    {
      speaker: "HOLLY",
      text: ["I'll dress up for that, sure."],
    },
    {
      speaker: "TUTOR",
      text: [
        "Let's go on to think about your organizational skills.",
        "You're working in a very people-based industry, and that means things won't always go to plan.",
      ],
    },
    {
      speaker: "HOLLY",
      text: [
        {
          text: "I guess it's being prepared to make changes that matters.",
          number: 26,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: ["That's right."],
    },
    {
      speaker: "HOLLY",
      text: [
        {
          text: "I've got to look calm, even if I'm in a panic.",
          number: 27,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Another skill that events managers need is creativity.",
        {
          text: "You need to listen carefully to the big idea, and then fill in all the gaps.",
          number: 28,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Another key skill is leadership.",
        {
          text: "Believe in what you think is best, even if others disagree.",
          number: 29,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        {
          text: "Think ahead, remember what your ambitions are, and keep them in mind.",
          number: 30,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have half a minute to check your answers to part 3.",
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

  //  Marks show

  const correctAnswers = {
    // ---------- Questions 21–24 (Choose A, B or C) ----------
    21: "B", // it is outdoors
    22: "A", // ensuring children stay in the stadium
    23: "A", // They can be hard to manage
    24: "B", // an injury

    // ---------- Questions 25–30 (Match A–H) ----------
    25: "C", // Communication – having a smart appearance
    26: "A", // Organisation – being flexible
    27: "D", // Time management – hiding your emotions
    28: "B", // Creativity – focusing on details
    29: "F", // Leadership – trusting your own views
    30: "H", // Networking – thinking of the future
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
    localStorage.setItem("/listening3Part32022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part32022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part32022");
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
                {renderText("Holly's Work Placement Tutorial")}
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
            {renderText("Questions 21–30")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Choose the correct letter or letters as instructed.")}
          </h3>

          <div className="p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Holly's Work Placement Tutorial")}
            </h1>

            {/* ---------- Questions 21–24 ---------- */}
            <h2 className="font-bold text-xl">
              {renderText("Questions 21–24")}
            </h2>

            <p className="mb-4">
              {renderText("Choose the correct letter, ")}
              <span className="font-bold">A, B or C</span>.
            </p>

            {/* Q21 */}
            <p className="font-bold text-lg">
              21{" "}
              {renderText(
                "Holly has chosen the Orion Stadium placement because"
              )}
            </p>
            {[
              "it involves children.",
              "it is outdoors.",
              "it sounds like fun.",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q21"
                    value={value}
                    checked={userAnswers[21] === value}
                    onChange={(e) => handleInputChange(21, e.target.value)}
                  />
                  <span>
                    {value}. {renderText(text)}
                  </span>
                </label>
              );
            })}

            {/* Q22 */}
            <p className="font-bold text-lg mt-4">
              22{" "}
              {renderText(
                "Which aspect of safety does Dr Green emphasise most?"
              )}
            </p>
            {[
              "ensuring children stay in the stadium",
              "checking the equipment children will use",
              "removing obstacles in changing rooms",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q22"
                    value={value}
                    checked={userAnswers[22] === value}
                    onChange={(e) => handleInputChange(22, e.target.value)}
                  />
                  <span>
                    {value}. {renderText(text)}
                  </span>
                </label>
              );
            })}

            {/* Q23 */}
            <p className="font-bold text-lg mt-4">
              23 {renderText("What does Dr Green say about the spectators?")}
            </p>
            {[
              "They can be hard to manage.",
              "They make useful volunteers.",
              "They shouldn't take photographs.",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q23"
                    value={value}
                    checked={userAnswers[23] === value}
                    onChange={(e) => handleInputChange(23, e.target.value)}
                  />
                  <span>
                    {value}. {renderText(text)}
                  </span>
                </label>
              );
            })}

            {/* Q24 */}
            <p className="font-bold text-lg mt-4">
              24 {renderText("What has affected the schedule in the past?")}
            </p>
            {["bad weather", "an injury", "extra time"].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q24"
                    value={value}
                    checked={userAnswers[24] === value}
                    onChange={(e) => handleInputChange(24, e.target.value)}
                  />
                  <span>
                    {value}. {renderText(text)}
                  </span>
                </label>
              );
            })}

            {/* ---------- Questions 25–30 ---------- */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 25–30")}
            </h2>

            <p className="mb-2">
              {renderText(
                "What do Holly and her tutor agree is an important aspect of each of the following events management skills?"
              )}
            </p>

            <p className="font-semibold mb-3">
              {renderText("Choose the correct letter, A–H.")}
            </p>

            {/* Information Box */}
            <div className="mb-6 border max-w-[300px] mx-auto p-4">
              <p className="font-semibold text-center mb-2">
                {renderText("Important aspects")}
              </p>
              {[
                "A. being flexible",
                "B. focusing on details",
                "C. having a smart appearance",
                "D. hiding your emotions",
                "E. relying on experts",
                "F. trusting your own views",
                "G. doing one thing at a time",
                "H. thinking of the future",
              ].map((item) => (
                <p key={item}>{renderText(item)}</p>
              ))}
            </div>

            {/* Dropdown Questions */}
            {[
              "Communication",
              "Organisation",
              "Time management",
              "Creativity",
              "Leadership",
              "Networking",
            ].map((skill, index) => {
              const qNum = 25 + index;
              return (
                <div key={qNum} className="flex items-center gap-2 mb-2">
                  {/* Number + skill text */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold w-5">{qNum}</span>
                    <span className="truncate">{renderText(skill)}</span>
                  </div>

                  {/* Dropdown */}
                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-2 py-1 w-16 text-center"
                  >
                    <option value="">{qNum}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
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
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (21–30)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
                      const userAnswer = userAnswers[num]?.trim();
                      const correctAnswer = correctAnswers[num]?.trim();
                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
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
                            {!isCorrect && (
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
                              <span className="italic">No answer provided</span>
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
      <Listening3Pagination2022></Listening3Pagination2022>
    </div>
  );
};

export default Listening3Part32022;
