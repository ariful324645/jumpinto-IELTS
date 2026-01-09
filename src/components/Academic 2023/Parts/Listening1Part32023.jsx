import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2023 from "../Pagination 2023/Listening1Pagination2023";

const Listening1Part32023 = () => {
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
        "Part 3, you will hear two students called Hugo and Chantal discussing a talk they have just attended at the start of their course in fashion design.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully and answer questions 21 to 26.",
      ],
    },
    {
      speaker: "HUGO",
      text: [
        "Hi, Chantal. What did you think of the talk then?",
        {
          text: "Oh, were the people beside you chatting or something?",
          number: 21,
        },
        "It's hard to see through people's heads, isn't it?",
        "Yeah, but it looks like there's a whole range of areas of work that we hadn't even thought of.",
        {
          text: "Like fashion journalism for instance.",
          number: 22,
        },
        "Hmm, overall she had quite a strong message, didn't she?",
        "Perhaps she thinks students are a bit narrow-minded about the industry.",
        {
          text: "We know it's a tough industry.",
          number: 23,
        },
        "Yeah, and we're only first years after all. We've got a lot to learn.",
        {
          text: "Do you think our secondary-school education should have been more career focused?",
          number: 24,
        },
        "Well, we had numerous talks on careers, which was good, but none of them were very inspiring.",
        "They could have asked more people like today's speaker to talk to us.",
        {
          text: "Well, I promised myself that I'd go through this course and keep an open mind till the end.",
          number: 25,
        },
        "But I think it's better to pick an area of the industry now, and then aim to get better and better at it.",
        "Well, I think we'll just have to differ on that issue.",
        "One thing's for certain though. From what she said, we'll be unpaid assistants in the industry for quite a long time.",
        {
          text: "I'm prepared for that, aren't you?",
          number: 26,
        },
        "Actually, I'm not going to accept that view.",
        "Really? But she knows it's the case, and everyone else says the same.",
        "That doesn't mean it has to be true for me.",
        "OK, well I hope you're right.",
      ],
    },
    {
      speaker: "CHANTAL",
      text: [
        "Hi, Hugo. I thought it was good once I'd moved seats.",
        {
          text: "It wasn't that. I went early so that I'd get a seat and not have to stand, but then this guy sat right in front of me, and he was so tall.",
          number: 21,
        },
        "Impossible. Anyway, to answer your question, I thought it was really interesting. Especially what the speaker said about the job market.",
        "Yeah, I wasn't expecting so many career options.",
        "She did. She kept saying things like 'I know you all think this, but...' and then she'd tell us how it really is.",
        {
          text: "It was a bit harsh though.",
          number: 23,
        },
        "Exactly. Do you think our secondary-school education should have been more career focused?",
        "I agree. We were told about lots of different careers, just when we needed to be, but not by the experts who really know stuff.",
        {
          text: "Well, I promised myself that I'd go through this course and keep an open mind till the end.",
          number: 25,
        },
        "Mmm.",
        "It must have felt amazing. Though she said all she was looking for back then was experience, not financial reward.",
        {
          text: "I'm always considering my own clothes, but now I can see you should be focusing on your client.",
          number: 27,
        },
        "She obviously regretted losing the job.",
        {
          text: "This would be especially suitable if you have done some acting.",
          number: 28,
        },
        "Yeah, it would be good to know that kind of thing.",
        "Yeah.",
        {
          text: "Yeah, people don't give up searching. They also take things back to the store if they aren't right.",
          number: 30,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
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
    21: "A", // Her view of the speaker was blocked
    22: "B", // There is more variety in it than they had realised
    23: "C", // critical of the industry
    24: "C", // who gave the advice
    25: "B", // when to choose a career in fashion
    26: "A", // He is realistic about the practice

    // Questions 27–28 (Choose TWO letters, A–E)
    "27-28": ["B", "E"], // paying too much attention to how she looked, openly disliking her client

    // Questions 29–30 (Choose TWO letters, A–E)
    "29-30": ["A", "C"], // the reasons people return fashion items, fashion designs people want but can't find
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "27-28" || id === "29-30") {
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
    localStorage.setItem("/listening1Part32023", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part32023");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part32023");
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
                {renderText("Talk on jobs in fashion design")}
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
            {renderText(
              "Choose the correct letter, A, B or C, or choose TWO letters as instructed."
            )}
          </h3>

          <div className="p-6 rounded-lg space-y-8 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Talk on jobs in fashion design")}
            </h1>

            {/* ================= Questions 21–26 ================= */}
            <h2 className="font-bold text-xl">
              {renderText("Questions 21–26")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B or C.")}</p>

            {/* Questions 21–26 */}
            {[
              {
                num: 21,
                question:
                  "What problem did Chantal have at the start of the talk?",
                options: [
                  "A. Her view of the speaker was blocked.",
                  "B. She was unable to find an empty seat.",
                  "C. The students next to her were talking.",
                ],
              },
              {
                num: 22,
                question:
                  "What were Hugo and Chantal surprised to hear about the job market?",
                options: [
                  "A. It has become more competitive than it used to be.",
                  "B. There is more variety in it than they had realised.",
                  "C. Some areas of it are more exciting than others.",
                ],
              },
              {
                num: 23,
                question:
                  "Hugo and Chantal agree that the speaker's message was",
                options: [
                  "A. unfair to them at times.",
                  "B. hard for them to follow.",
                  "C. critical of the industry.",
                ],
              },
              {
                num: 24,
                question:
                  "What do Hugo and Chantal criticise about their school careers advice?",
                options: [
                  "A. when they received the advice",
                  "B. how much advice was given",
                  "C. who gave the advice",
                ],
              },
              {
                num: 25,
                question:
                  "When discussing their future, Hugo and Chantal disagree on",
                options: [
                  "A. which is the best career in fashion.",
                  "B. when to choose a career in fashion.",
                  "C. why they would like a career in fashion.",
                ],
              },
              {
                num: 26,
                question: "How does Hugo feel about being an unpaid assistant?",
                options: [
                  "A. He is realistic about the practice.",
                  "B. He feels the practice is dishonest.",
                  "C. He thinks others want to change the practice.",
                ],
              },
            ].map(({ num, question, options }) => (
              <div key={num} className="mt-4">
                <p className="font-bold text-lg">
                  {num} {renderText(question)}
                </p>
                {options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${num}`}
                      value={opt[0]}
                      checked={userAnswers[num] === opt[0]}
                      onChange={(e) => handleInputChange(num, e.target.value)}
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            ))}

            {/* ================= Questions 27–28 ================= */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 27–28")}
            </h2>
            <p>
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>
            <p className="font-bold text-lg mt-3">
              27–28{" "}
              {renderText(
                "Which TWO mistakes did the speaker admit she made in her first job?"
              )}
            </p>

            <div className="space-y-2">
              {[
                "being dishonest to her employer",
                "paying too much attention to how she looked",
                "expecting to become well known",
                "trying to earn a lot of money",
                "openly disliking her client",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["27-28"] || [];
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
                      onChange={() => handleInputChange("27-28", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 29–30 ================= */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 29–30")}
            </h2>
            <p>
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>
            <p className="font-bold text-lg mt-3">
              29–30{" "}
              {renderText(
                "Which TWO pieces of retail information do Hugo and Chantal agree would be useful?"
              )}
            </p>

            <div className="space-y-2">
              {[
                "the reasons people return fashion items",
                "how much time people have to shop for clothes",
                "fashion designs people want but can't find",
                "the best time of year for fashion buying",
                "the most popular fashion sizes",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["29-30"] || [];
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
                      onChange={() => handleInputChange("29-30", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>
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
                    {[21, 22, 23, 24, 25, 26, "27-28", "29-30"].map((num) => {
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
      <Listening1Pagination2023></Listening1Pagination2023>
    </div>
  );
};

export default Listening1Part32023;
