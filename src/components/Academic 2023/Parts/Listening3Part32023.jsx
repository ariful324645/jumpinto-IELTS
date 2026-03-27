import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2023 from "../Pagination 2023/Listening3Pagination2023";

const Listening3Part32023 = () => {
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
        "Part 3, you will hear two business students discussing automation and the future of work.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "That seminar yesterday on automation and the future of work was really good, wasn't it?",
        "Looking at the first industrial revolution in Britain in the 19th century.",
        "And seeing how people reacted to massive change was a real eye-opener.",
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "Yes, it was interesting to hear how people felt about automation then, and what challenges they faced.",
        "I didn't know that first started with workers in the textile industry.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "With those protesting workers called the Luddites, destroying their knitting machines because they were so worried about losing their jobs.",
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "Yes.",
        {
          text: "And ultimately, they didn't achieve anything.",
          number: 21,
        },
        "And anyway, industrialization created more jobs than it destroyed.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "Yes, that's true.",
        "But it probably didn't seem a positive thing at the time.",
        {
          text: "I can see why the Luddites felt so threatened.",
          number: 22,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "I know, I'm sure I would have felt the same.",
        "The discussion about the future of work was really optimistic for a change.",
        "I like the idea that work won't involve doing boring repetitive tasks, as robots will do all that.",
        "Normally, you only hear negative stuff about the future.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "Bit too optimistic, don't you think?",
        "",
        {
          text: "For example, I can't see how people are about to have more leisure time, when all the evidence shows people are spending longer than ever at work.",
          number: 24,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "No, that's true.",
        {
          text: "And what about lower unemployment?",
          number: 23,
        },
        "I'm not so sure about that.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: ["Perhaps in the long term, but not in the foreseeable future."],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "Mmm.",
        "And I expect most people will be expected to work until they're much older.",
        "As everyone's living much longer.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: ["That's already happening."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "I enjoyed all that stuff on how technology has changed some jobs, and how they're likely to change in the near future.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "Yeah, incredible, like accountants.",
        "You might think all the technological innovations would have put them out of a job, but in fact there are more of them than ever.",
        {
          text: "They're still really in demand and have become far more efficient.",
          number: 25,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "Right.",
        "That was amazing.",
        "20 times more accountants in this country compared to the 19th century.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "I know.",
        "I'd never have thought the demand for hairdressing would have gone up so much in the last hundred years.",
        "One hairdresser for every 287 people now, compared to one for over 1,500.",
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "",
        {
          text: "Yeah, because people's earning power has gone up, so they can afford to spend more on personal services like that.",
          number: 26,
        },
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: ["But technology hasn't changed the actual job that much."],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "No, they've got hair dryers et cetera, but it's one job where you don't depend on a computer.",
        "The kind of work that administrative staff do has changed enormously, thanks to technology.",
        "Even 20 years ago, there were secretaries doing dictation and typing.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "",
        {
          text: "Yes, really boring compared to these days, when they're given much more responsibility and higher status.",
          number: 27,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "Mmm.",
        "A lot of graduates go in for this kind of work now...",
        "I'd expected there to be a much bigger change in the number of agricultural workers in the 19th century, but the 1871 census showed that roughly 25% of the population worked on the land.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "Yeah, I'd have assumed it would be more than 50%.",
        {
          text: "Now it's less than 0.2%.",
          number: 28,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: ["Hmm, what about care workers?"],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "",
        {
          text: "They barely existed in the 19th century, as people's lifespan was so much shorter, but now of course this sector will see huge growth.",
          number: 29,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "Yeah, and it's hard enough to meet current demand.",
        "The future looks quite bleak for bank clerks.",
      ],
    },
    {
      speaker: "YOUNG MAN",
      text: [
        "",
        {
          text: "They've been in decline since ATMs were introduced in the 80s, and technology will certainly make most of the jobs they do now redundant, I think.",
          number: 30,
        },
      ],
    },
    {
      speaker: "YOUNG WOMAN",
      text: [
        "I agree.",
        "Although the situation may change, it's very hard to predict what will happen.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "YOUNG WOMAN") {
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
    "21-22": ["A", "E"], // Their actions were ineffective, Their attitude is understandable
    "23-24": ["B", "D"], // Unemployment will fall, Working hours will be shorter
    25: "G", // Accountants → Both employment and productivity have risen
    26: "F", // Hairdressers → There is likely to be a significant rise in demand
    27: "B", // Administrative staff → Their role has become more interesting
    28: "C", // Agricultural workers → Number of people in this sector has fallen dramatically
    29: "F", // Care workers → Likely a significant rise in demand
    30: "A", // Bank clerks → These jobs are likely to be at risk
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22" || id === "23-24") {
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
    localStorage.setItem("/listening3Part32023", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part32023");
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
                {renderText("Picking Mushrooms")}
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
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–30")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Luddites")}
            </h1>

            {/* ================= Questions 21–22 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 21 and 22</h2>
              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                21–22{" "}
                {renderText(
                  "Which TWO opinions about the Luddites do the students express?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "Their actions were ineffective.",
                  "They are still influential today.",
                  "They have received unfair criticism.",
                  "They were proved right.",
                  "Their attitude is understandable.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["21-22"] || [];
                  const isChecked = selected.includes(value);
                  const isDisabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isDisabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleInputChange("21-22", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 23–24 ================= */}
            <div>
              <h2 className="font-bold text-xl mt-8">Questions 23 and 24</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                23–24{" "}
                {renderText(
                  "Which TWO predictions about the future of work are the students doubtful about?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "Work will be more rewarding.",
                  "Unemployment will fall.",
                  "People will want to delay retiring.",
                  "Working hours will be shorter.",
                  "People will change jobs more frequently.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["23-24"] || [];
                  const isChecked = selected.includes(value);
                  const isDisabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isDisabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleInputChange("23-24", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 25–30 ================= */}
            <div>
              <h2 className="font-bold text-xl mt-10">Questions 25–30</h2>
              <p className="mt-2">
                {renderText(
                  "What comment do the students make about each of the following jobs?"
                )}
              </p>
              <p className="mt-2">
                {renderText(
                  "Choose the correct letter, A–G, next to Questions 25–30."
                )}
              </p>
              <div className="mt-4 border max-w-[500px] mx-auto p-4">
                <h3 className="font-bold text-lg mb-2 text-center">
                  {renderText("Comments")}
                </h3>
                <ul className=" space-y-1">
                  {[
                    {
                      letter: "A",
                      text: "These jobs are likely to be at risk.",
                    },
                    {
                      letter: "B",
                      text: "Their role has become more interesting in recent years.",
                    },
                    {
                      letter: "C",
                      text: "The number of people working in this sector has fallen dramatically.",
                    },
                    {
                      letter: "D",
                      text: "This job will require more qualifications.",
                    },
                    {
                      letter: "E",
                      text: "Higher disposable income has led to a huge increase in jobs.",
                    },
                    {
                      letter: "F",
                      text: "There is likely to be a significant rise in demand for this service.",
                    },
                    {
                      letter: "G",
                      text: "Both employment and productivity have risen.",
                    },
                  ].map((comment) => (
                    <li key={comment.letter}>
                      <span className="font-semibold">{comment.letter}.</span>{" "}
                      {renderText(comment.text)}
                    </li>
                  ))}
                </ul>
              </div>

              {[
                { num: 25, job: "Accountants" },
                { num: 26, job: "Hairdressers" },
                { num: 27, job: "Administrative staff" },
                { num: 28, job: "Agricultural workers" },
                { num: 29, job: "Care workers" },
                { num: 30, job: "Bank clerks" },
              ].map(({ num, job }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <div className="font-bold flex items-center gap-2 justify-center">
                    <span>{num}.</span>
                    <h2>{renderText(job)}</h2>
                  </div>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
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
                    {renderText("Submit Answers")}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Result Card */}
                  <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {renderText("Result")}
                    </h1>
                    <p className="text-green-600 text-2xl font-semibold">
                      {renderText("Your Score: ")}
                      {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (21–30)")}
                    </h3>

                    <ul className="space-y-3">
                      {["21-22", "23-24", 25, 26, 27, 28, 29, 30].map((num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const isCorrect = (() => {
                          if (Array.isArray(correct)) {
                            return (
                              Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            );
                          } else {
                            return (
                              user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase()
                            );
                          }
                        })();

                        const noAnswer = !user;

                        const userAnswerDisplay = Array.isArray(user)
                          ? user.join(", ")
                          : user?.trim() || "";
                        const correctAnswerDisplay = Array.isArray(correct)
                          ? correct.join(", ")
                          : correct?.trim();

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
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {noAnswer ? (
                                <span className="italic">
                                  No answer provided
                                </span>
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
      </div>
      <Listening3Pagination2023></Listening3Pagination2023>
    </div>
  );
};

export default Listening3Part32023;
