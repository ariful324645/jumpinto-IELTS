import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2024 from "../Pagination 2024/Listening2Pagination2024";

const Listening2Part22024 = () => {
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
        "Part 2. You will hear a man called David talking on the radio about his work as a lifeboat volunteer.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully and answer questions 11 to 16.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "I never really planned to be a lifeboat volunteer when I came to live in Northsea.",
        "I'd been working in London as a website designer, but although that was interesting, I didn't like city life.",
        "I'd been really keen on boats as a teenager, and I thought if I went to live by the sea, I might be able to pursue that interest a bit more in my free time.",
        {
          text: "Then, I found that the Lifeboat Institution was looking for volunteers, so I decided to apply.",
          number: 11,
        },
        "The Lifeboat Institution building here in Northsea's hard to miss. It's one of the largest in the country.",
        "It was built 15 years ago, with funds provided by a generous member of the public who'd lived here all her life.",
        {
          text: "As the Lifeboat Institution is a charity that relies on that kind of donation, rather than funding provided by the government, that was a huge help to us.",
          number: 12,
        },
        "When I applied, I had to have a health assessment. The doctors were particularly interested in my vision.",
        "I used to be short sighted, so I'd had to wear glasses, but I'd had laser eye surgery two years earlier, so that was OK.",
        "They gave me tests for colour blindness, and they thought I might have a problem there, but it turned out I was OK.",
        {
          text: "When the coastguard gets an alert, all the volunteers are contacted and rush to the lifeboat station.",
          number: 13,
        },
        "Our target's to get there in five minutes.",
        "Then we try to get the boat off the dock and out to sea in another six to eight minutes.",
        { text: "Our team's proud that we usually achieve that.", number: 14 },
        "I've recently qualified as what's called a helmsman, which means I have the ultimate responsibility for the lifeboat.",
        "I have to check that the equipment we use is in working order.",
        "The crew have special life jackets that can support up to four people in the water, and it's ultimately my decision whether it's safe to launch the boat.",
        {
          text: "But it's very rare not to launch it, even in the worst weather.",
          number: 15,
        },
        "As well as going out on the lifeboat, my work involves other things too.",
        "A lot of people underestimate how quickly conditions can change at sea, so I speak to youth groups and sailing clubs in the area.",
        {
          text: "We also have a lot of volunteers who organize activities to raise money for us. And we couldn't manage without them.",
          number: 16,
        },
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
      speaker: "SPEAKER",
      text: [
        "The training we get is a continuous process, focusing on technical competence and safe handling techniques, and it's given me the confidence to deal with extreme situations without panicking.",
        {
          text: "I was glad I'd done a first aid course before I started, as that's a big help with the casualty care activities we do.",
          number: 17,
        },
        "We've done a lot on how to deal with ropes and tie knots - that's an essential skill.",
        "After a year, I did a one-week residential course. Led by specialists, they had a wave-tank where they could create extreme weather conditions - so we could get experience at what to do if the boat turned over in a storm at night, for example.",
        {
          text: "Since I started, I've had to deal with a range of emergency situations, but the work's hugely motivating.",
          number: 18,
        },
        "It's not just about saving lives. I've learned a lot about the technology involved.",
        "My background in IT's been useful here, and I can use my expertise to help other volunteers.",
        "They're a great group. We're like a family really, which helps when you're dragging yourself out of bed on a cold stormy night.",
        {
          text: "But actually, it's the colder months that can be the most rewarding time.",
          number: 19,
        },
        "That's when the incidents tend to be more serious, and you realize that you can make a huge difference to the outcome.",
        {
          text: "So, if any of you listeners are interested. Why don't you give us a call...",
          number: 20,
        },
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
    // Questions 11–16 (Single-choice, A–C)
    11: "A", // He was eager to develop a hobby.
    12: "B", // a local resident.
    13: "A", // might be colour blind.
    14: "A", // five minutes.
    15: "C", // if the lifeboat should be launched.
    16: "A", // gives talks on safety at sea.

    // Questions 17–18 (Choose TWO letters, A–E)
    "17-18": ["C", "E"],
    // C: The training exercises have built up his mental strength
    // E: The wave tank activities provided practice in survival techniques

    // Questions 19–20 (Choose TWO letters, A–E)
    "19-20": ["A", "B"],
    // A: working as part of a team
    // B: experiences when working in winter
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
                {renderText("Working as a Lifeboat Volunteer")}
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
              {renderText("Working as a Lifeboat Volunteer")}
            </h1>

            {/* ================= Questions 11–16 (Single Choice) ================= */}
            {[
              {
                num: 11,
                question: "What made David leave London and move to Northsea?",
              },
              {
                num: 12,
                question:
                  "The Lifeboat Institution in Northsea was built with money provided by",
              },
              {
                num: 13,
                question:
                  "In his health assessment, the doctor was concerned about the fact that David",
              },
              {
                num: 14,
                question:
                  "After arriving at the lifeboat station, they aim to launch the boat within",
              },
              {
                num: 15,
                question:
                  "As a 'helmsman', David has the responsibility of deciding",
              },
              {
                num: 16,
                question: "As well as going out on the lifeboat, David",
              },
            ].map(({ num, question }) => {
              const options = (() => {
                switch (num) {
                  case 11:
                    return [
                      "He was eager to develop a hobby.",
                      "He wanted to work shorter hours.",
                      "He found his job in website design unsatisfying.",
                    ];
                  case 12:
                    return [
                      "a local organisation.",
                      "a local resident.",
                      "the local council.",
                    ];
                  case 13:
                    return [
                      "might be colour blind.",
                      "was rather short-sighted.",
                      "had undergone eye surgery.",
                    ];
                  case 14:
                    return [
                      "five minutes.",
                      "six to eight minutes.",
                      "eight and a half minutes.",
                    ];
                  case 15:
                    return [
                      "who will be the members of his crew.",
                      "what equipment it will be necessary to take.",
                      "if the lifeboat should be launched.",
                    ];
                  case 16:
                    return [
                      "gives talks on safety at sea.",
                      "helps with fundraising.",
                      "recruits new volunteers.",
                    ];
                  default:
                    return [];
                }
              })();

              return (
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
              );
            })}

            {/* ================= Questions 17–18 (Multiple Choice) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 17–18")}
              </h2>
              <p>{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-2">
                17–18{" "}
                {renderText(
                  "Which TWO things does David say about the lifeboat volunteer training?"
                )}
              </p>
              {[
                "The residential course developed his leadership skills.",
                "The training in use of ropes and knots was quite brief.",
                "The training exercises have built up his mental strength.",
                "The casualty care activities were particularly challenging for him.",
                "The wave tank activities provided practice in survival techniques.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["17-18"] || [];
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
                      onChange={() => handleInputChange("17-18", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 19–20 (Multiple Choice) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 19–20")}
              </h2>
              <p>{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-2">
                19–20{" "}
                {renderText(
                  "Which TWO things does David find most motivating about the work he does?"
                )}
              </p>
              {[
                "working as part of a team",
                "experiences when working in winter",
                "being thanked by those he has helped",
                "the fact that it keeps him fit",
                "the chance to develop new equipment",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["19-20"] || [];
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
                      onChange={() => handleInputChange("19-20", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Submit & Result ================= */}
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
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (11–20)")}
                    </h3>

                    <ul className="space-y-3">
                      {[11, 12, 13, 14, 15, 16, "17-18", "19-20"].map((num) => {
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
      <Listening2Pagination2024></Listening2Pagination2024>
    </div>
  );
};

export default Listening2Part22024;
