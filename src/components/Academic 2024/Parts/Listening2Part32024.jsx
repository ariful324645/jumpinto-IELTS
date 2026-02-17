import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2024 from "../Pagination 2024/Listening2Pagination2024";

const Listening2Part32024 = () => {
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
        "Part 3, you will hear two students called Bella and Don, discussing a presentation they plan to do on recycling footwear.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "BELLA",
      text: [
        "Hi, Don. Did you get the copy of the article on recycling footwear that I emailed you?",
      ],
    },
    {
      speaker: "DON",
      text: ["Yeah, it's here. I've had a look at it."],
    },
    {
      speaker: "BELLA",
      text: ["So, do you think it's a good topic for our presentation?"],
    },
    {
      speaker: "DON",
      text: [
        "Well, before I started reading it, I thought recycling footwear. Well, although it's quite interesting, perhaps there isn't enough to say about it.",
        {
          text: "'Cause we put shoes in recycling bins, they go to charity shops, and that's about it.",
          number: 21,
        },
      ],
    },
    {
      speaker: "BELLA",
      text: ["But there's much more to it than that."],
    },
    {
      speaker: "DON",
      text: ["I realize that now. And I'm keen to research the topic more."],
    },
    {
      speaker: "BELLA",
      text: ["That's great."],
    },
    {
      speaker: "DON",
      text: [
        "One of the things I didn't realize until I read the article was just how many pairs of trainers get recycled.",
        "Well, a lot of young people wear them all the time now. They've become more popular than ordinary shoes.",
        "I know, I guess they are very hard wearing. But don't they look a bit casual for school uniform?",
        { text: "I don't think they're right for that.", number: 22 },
        "Actually, I think some of them look quite smart on pupils, better than a scruffy old pair of shoes. So, do you keep shoes a long time?",
      ],
    },
    {
      speaker: "BELLA",
      text: [
        "Yes, though I do tend to wear my old pairs for doing dirty jobs like cleaning my bike.",
        {
          text: "I must admit, I've recycled some perfectly good shoes that haven't gone out of fashion and still fit, just because they don't look great on me anymore.",
          number: 23,
        },
      ],
    },
    {
      speaker: "DON",
      text: [
        "I think it's common because there's so much choice. The article did say that recent sales of footwear have increased enormously.",
        "That didn't surprise me.",
        "No. But then it said that the amount of recycled footwear has fallen, it's 6% now, compared to a previous level of 11% that doesn't seem to make sense.",
        {
          text: "That's because not everything goes through the recycling process. Some footwear just isn't good enough to resell for one reason or another, and gets rejected.",
          number: 24,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "BELLA",
      text: [
        "So, let's find some examples in the article of footwear that was rejected for recycling.",
      ],
    },
    {
      speaker: "DON",
      text: [
        "OK, I think there are some in the interview with the recycling manager. Yeah, here it is.",
      ],
    },
    {
      speaker: "BELLA",
      text: [
        "Hmm. Let's start with the lady's high heeled shoes. What did he say about those?",
        {
          text: "He said they were probably expensive. The material was suede, and they were beige in colour. It looked like someone had only worn them once, but in a very wet field. So the heels were too stained with MUD and grass to resell them.",
          number: 25,
        },
      ],
    },
    {
      speaker: "DON",
      text: [
        "OK, and the leather ankle boots, what was wrong with them?",
        {
          text: "Apparently, the heels were worn, but that wasn't the problem. One of the shoes was a much lighter shade than the other one. It had obviously been left in the sun.",
          number: 26,
        },
        "I suppose even second-hand shoes should look the same.",
      ],
    },
    {
      speaker: "BELLA",
      text: [
        "Sure. Then there were the red baby shoes.",
        {
          text: "People often don't bother tying shoes together when we put them in a recycling bin. You'd think it would have been easy to find the other, but it wasn't.",
          number: 27,
        },
      ],
    },
    {
      speaker: "DON",
      text: [
        "The trainers were interesting. He said they looked like they'd been worn by a marathon runner.",
        {
          text: "One of the soles was so worn under the foot that you could put your finger through it.",
          number: 28,
        },
      ],
    },
    {
      speaker: "BELLA",
      text: [
        "Hmm. What did you think about the project his team set up to avoid this by making new shoes out of the good parts of old shoes?",
        {
          text: "It sounded like a good idea. They get so many shoes, they should be able to match parts. I wasn't surprised that it failed though. I mean, who wants to buy second-hand shoes really? Think of all the germs you could catch.",
          number: 29,
        },
      ],
    },
    {
      speaker: "DON",
      text: [
        "Well, people didn't refuse them for that reason, did they? It was because the pairs of shoes weren't identical.",
        {
          text: "They still managed to ship them overseas though.",
          number: 30,
        },
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
      if (speaker === "BELLA") {
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
    21: "A", // limited in scope
    22: "B", // how suitable they are for school
    23: "B", // she no longer likes them
    24: "B", // Less footwear is recycled now than in the past

    // Questions 25–28 (Dropdown, reasons A–F)
    25: "E", // high-heeled shoes → too dirty
    26: "B", // ankle boots → colour of one shoe faded
    27: "D", // baby shoes → brand new
    28: "C", // trainers → one shoe had a hole in it

    // Questions 29–30 (Single-choice, A–C)
    29: "C", // shoes in 'new' pairs were not completely alike
    30: "A", // present from a new angle
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
                {renderText("Recycling Footwear: Challenges and Opportunities")}
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

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Recycling Footwear: Challenges and Opportunities")}
            </h1>

            {/* ================= Questions 21–24 (Single Choice) ================= */}
            {[
              {
                num: 21,
                question:
                  "At first, Don thought the topic of recycling footwear might be too",
                options: [
                  "limited in scope.",
                  "hard to research.",
                  "boring for listeners.",
                ],
              },
              {
                num: 22,
                question:
                  "When discussing trainers, Bella and Don disagree about",
                options: [
                  "how popular they are among young people.",
                  "how suitable they are for school.",
                  "how quickly they wear out.",
                ],
              },
              {
                num: 23,
                question:
                  "Bella says that she sometimes recycles shoes because",
                options: [
                  "they no longer fit.",
                  "she no longer likes them.",
                  "they are no longer in fashion.",
                ],
              },
              {
                num: 24,
                question: "What did the article say that confused Don?",
                options: [
                  "Public consumption of footwear has risen.",
                  "Less footwear is recycled now than in the past.",
                  "People dispose of more footwear than they used to.",
                ],
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

            {/* ================= Questions 25–28 (Dropdown) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 25–28")}
              </h2>
              <p>
                {renderText(
                  "Choose the correct letter, A–F, next to each question."
                )}
              </p>
              <div className="space-y-2 border p-4 max-w-[350px] mx-auto mt-5">
                <h2 className="font-bold text-2xl text-center">
                  {renderText("Reasons")}
                </h2>
                {[
                  "one shoe was missing",
                  "the colour of one shoe had faded",
                  "one shoe had a hole in it",
                  "the shoes were brand new",
                  "the shoes were too dirty",
                  "the stitching on the shoes was broken",
                ].map((reason, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C, ...
                  return (
                    <p key={idx}>
                      <strong>{letter}.</strong> {renderText(reason)}
                    </p>
                  );
                })}
              </div>

              {[
                { num: 25, label: "the high-heeled shoes" },
                { num: 26, label: "the ankle boots" },
                { num: 27, label: "the baby shoes" },
                { num: 28, label: "the trainers" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <div className="font-bold flex items-center gap-2 justify-center">
                    <span>{num}.</span>
                    <h2> {renderText(label)}</h2>
                  </div>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 29–30 (Single Choice) ================= */}
            {[
              {
                num: 29,
                question:
                  "Why did the project to make 'new' shoes out of old shoes fail?",
                options: [
                  "People believed the 'new' pairs of shoes were unhygienic.",
                  "There were not enough good parts to use in the old shoes.",
                  "The shoes in the 'new' pairs were not completely alike.",
                ],
              },
              {
                num: 30,
                question:
                  "Bella and Don agree that they can present their topic",
                options: [
                  "from a new angle.",
                  "with relevant images.",
                  "in a straightforward way",
                ],
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
                      {renderText("All Answers (21–30)")}
                    </h3>

                    <ul className="space-y-3">
                      {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((num) => {
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

export default Listening2Part32024;
