import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2022 from "../Pagination2022/Listening4Pagination2022";

const Listening4Part32022 = () => {
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
        "Part 3, you will hear two students called Jeanne and Thomas discussing their sport science course.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "JEANNE",
      text: ["Hi, Thomas. How are you enjoying the course so far?"],
    },
    {
      speaker: "THOMAS",
      text: ["Yeah, I think it's good."],
    },
    {
      speaker: "JEANNE",
      text: [
        "Remind me why did you decide to study sports science? Didn't you want to be a professional athlete when you were at school?",
      ],
    },
    {
      speaker: "THOMAS",
      text: [
        "Yeah, that was my goal, and all my classmates assumed I would achieve it. They thought I was brilliant.",
        {
          text: "",
          number: 22,
        },
      ],
    },
    {
      speaker: "JEANNE",
      text: ["That must have been a nice feeling."],
    },
    {
      speaker: "THOMAS",
      text: [
        "Hmm, I thought I could win anything. There was no one who could run faster than me.",
      ],
    },
    {
      speaker: "JEANNE",
      text: [
        "Exactly. So what happened? Did your mom and dad want you to be more academic?",
      ],
    },
    {
      speaker: "THOMAS",
      text: [
        "Not at all. Perhaps they should have pushed me harder, though.",
        "I think I should have practiced more.",
        {
          text: "",
          number: 21,
        },
      ],
    },
    {
      speaker: "JEANNE",
      text: ["What makes you say that?"],
    },
    {
      speaker: "THOMAS",
      text: ["Well, I went out to Kenya for a couple of weeks to train."],
    },
    {
      speaker: "JEANNE",
      text: ["Really! I didn't know that."],
    },
    {
      speaker: "THOMAS",
      text: [
        "I was chosen to go there out of loads of kids and run with some of the top teenage athletes in the world. And I was so calm about it. I just kept thinking how fortunate I was, what a great chance this was.",
        {
          text: "",
          number: 24,
        },
        "Everyone back home was so proud of me. But once we started competing, I very quickly realized I wasn't good enough.",
      ],
    },
    {
      speaker: "JEANNE",
      text: ["Hmm, that must have been a huge shock."],
    },
    {
      speaker: "THOMAS",
      text: [
        "I thought 'this can't be happening'! I was used to winning.",
        {
          text: "",
          number: 23,
        },
      ],
    },
    {
      speaker: "JEANNE",
      text: ["I'm sorry to hear that."],
    },
    {
      speaker: "THOMAS",
      text: [
        "It's OK. I'm over it now. And I think it's much better to do a university course. And this one has such a variety of sports related areas. It's going to be good.",
      ],
    },
    {
      speaker: "JEANNE",
      text: ["Oh, I agree. I chose it because of that."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "THOMAS",
      text: [
        "So, Jeanne, have you thought of any ideas for the discussion session next week on technology and sport?",
      ],
    },
    {
      speaker: "JEANNE",
      text: ["We have to cover more than one sport, don't we?"],
    },
    {
      speaker: "THOMAS",
      text: ["Yeah."],
    },
    {
      speaker: "JEANNE",
      text: [
        "You know, we always think technology is about the future, but we could gather some ideas about past developments in sport.",
      ],
    },
    {
      speaker: "THOMAS",
      text: [
        "Look at early types of equipment, perhaps. Uh. I remember reading something about table tennis bats once, how they ended up being covered with pimpled rubber.",
      ],
    },
    {
      speaker: "JEANNE",
      text: ["Cos they were just wooden at first, I'd imagine."],
    },
    {
      speaker: "THOMAS",
      text: [
        "Yeah. In about the 1920s, a factory was making rolls of the rubber in bulk, for something like horse harnesses.",
        {
          text: "",
          number: 25,
        },
        "Yeah, and someone realized that it would make a perfect covering for the wooden bats.",
      ],
    },
    {
      speaker: "JEANNE",
      text: ["Really!"],
    },
    {
      speaker: "THOMAS",
      text: [
        "So, what about cricket? That's had a few innovative changes, maybe the pads they wear on their legs.",
        "I don't think they've changed much, but I'm just looking on the internet. And it says that when the first cricket helmet came in 1978, the Australian batsman who first wore it was booed and jeered by people watching because it was so ugly!",
        {
          text: "",
          number: 26,
        },
      ],
    },
    {
      speaker: "JEANNE",
      text: [
        "Wow, players have to protect themselves from getting hurt. I mean everyone wears one now. Hmm, unlike the cycle helmet, well unless you're a professional, but you're right. Many ordinary bikers don't wear a helmet.",
      ],
    },
    {
      speaker: "THOMAS",
      text: [
        "Hey, look at these pictures of original helmet designs. This one looks like an upside-down bowl.",
        "Yet the woman's laughing. Ha, she's so proud to be wearing it.",
        "It says serious cyclists ended up with wet hair from all the hard exercise.",
        {
          text: "",
          number: 27,
        },
      ],
    },
    {
      speaker: "JEANNE",
      text: [
        "I guess that's why they have large air vents in them now, so that the skin can breathe more easily.",
      ],
    },
    {
      speaker: "THOMAS",
      text: [
        "OK, so we've done helmets. What about golf balls? Or better still, golf clubs. They've changed a lot.",
        "Yeah, I remember my great grandfather telling me that because a club was made entirely of wood. It would easily break, and players had to get another.",
        {
          text: "",
          number: 28,
        },
        "There's no wood at all in them now, is there?",
        "No, they're much more powerful.",
        "The same must be true of hockey sticks.",
        "Hmm. I don't think so, because players still use wooden sticks today. Hmm. What it does say here though, is that when the game started, you had to produce a stick yourself.",
        {
          text: "",
          number: 29,
        },
        "I guess they just weren't being manufactured. So one more perhaps, what about football?",
        "Well, I know the first balls were made of animal skin.",
        "Yeah, they covered them with pieces of leather that were stitched together. The balls let in water when it rained.",
        {
          text: "",
          number: 30,
        },
        "Oh, how painful that must have been.",
        "Yeah, well, I think we can put together some useful ideas...",
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
    "21-22": ["A", "C"],
    "23-24": ["A", "E"],
    // Questions 25–30 (Choose the correct letter, A–H)
    25: "B", // Table tennis bat – mass produced material used for another purpose
    26: "F", // Cricket helmet – unpopular among spectators
    27: "A", // Cycle helmet – could cause excessive sweating
    28: "D", // Golf club – often had to be replaced
    29: "C", // Hockey stick – people often needed to make their own
    30: "G", // Football – caused injuries
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

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
                {renderText("Sporting Activities at School")}
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
              {renderText("Sporting Activities at School")}
            </h1>

            {/* ---------- Questions 21–22 ---------- */}
            <h2 className="font-bold text-xl mt-4">
              {renderText("Questions 21–22")}
            </h2>
            <p className="mb-3">
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>

            <p className="text-lg mb-2">
              <span className="font-bold">21–22 </span>
              {renderText(
                "Which TWO points do Thomas and Jeanne make about Thomas's sporting activities at school?"
              )}
            </p>

            {[
              "He should have felt more positive about them.",
              "The training was too challenging for him.",
              "He could have worked harder at them.",
              "His parents were disappointed in him.",
              "His fellow students admired him.",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              const selected = userAnswers["21-22"] || [];
              const checked = selected.includes(value);
              const disabled = selected.length === 2 && !checked;

              return (
                <label
                  key={value}
                  className={`flex items-center gap-3 mb-1 ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => handleInputChange("21-22", value)}
                  />
                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(text)}</span>
                </label>
              );
            })}

            {/* ---------- Questions 23–24 ---------- */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 23–24")}
            </h2>
            <p className="mb-3">
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>

            <p className="text-lg mb-2">
              <span className="font-bold">23–24 </span>
              {renderText(
                "Which TWO feelings did Thomas experience when he was in Kenya?"
              )}
            </p>

            {["disbelief", "relief", "stress", "gratitude", "homesickness"].map(
              (text, index) => {
                const value = String.fromCharCode(65 + index);
                const selected = userAnswers["23-24"] || [];
                const checked = selected.includes(value);
                const disabled = selected.length === 2 && !checked;

                return (
                  <label
                    key={value}
                    className={`flex items-center gap-3 mb-1 ${
                      disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => handleInputChange("23-24", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(text)}</span>
                  </label>
                );
              }
            )}

            {/* ---------- Questions 25–30 ---------- */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 25–30")}
            </h2>
            <p className="mb-3">
              {renderText(
                "What comment do the students make about the development of each of the following items of sporting equipment?"
              )}
            </p>

            <p className="font-semibold mb-2">
              {renderText("Choose the correct letter, A–H.")}
            </p>

            <div className="mb-4 border max-w-[300px] mx-auto p-4">
              <p className="font-semibold mb-2 text-center">
                {renderText("Comments")}
              </p>
              {[
                "A. It could cause excessive sweating.",
                "B. The material was being mass produced for another purpose.",
                "C. People often needed to make their own.",
                "D. It often had to be replaced.",
                "E. The material was expensive.",
                "F. It was unpopular among spectators.",
                "G. It caused injuries.",
                "H. No one using it liked it at first.",
              ].map((item) => (
                <p key={item}>{renderText(item)}</p>
              ))}
            </div>

            {[
              "the table tennis bat",
              "the cricket helmet",
              "the cycle helmet",
              "the golf club",
              "the hockey stick",
              "the football",
            ].map((item, index) => {
              const qNum = 25 + index;
              return (
                <div key={qNum} className="flex items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-6">{qNum}</span>
                    <span className="w-40">{renderText(item)}</span>
                  </div>

                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-3 py-1 w-20 text-center"
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
                    All Answers (11–20)
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
      <Listening4Pagination2022></Listening4Pagination2022>
    </div>
  );
};

export default Listening4Part32022;
