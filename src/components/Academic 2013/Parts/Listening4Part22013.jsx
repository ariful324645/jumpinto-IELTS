import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2013 from "../Pagination 2013/Listening4Pagination2013";

const Listening4Part22013 = () => {
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
        "Section 2. You will hear a man who owns a holiday home, talking on the phone to a woman who is staying there.",
        "First, you have some time to look at questions 11 to 13.",
        "Now listen carefully, and answer questions 11 to 13.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Hello?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Hi, it's Laura Carlton here.",
        "We've just arrived at the holiday flat, but I can't get the hot water and heating to work.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, right. That's easy. Don't worry.",
        "In the upstairs cupboard, you'll find the water heater.",
        "You'll see three main controls on the left at the bottom of the heater.",
        {
          text: "The first one, the round one on the far left, is the most important one for the heating and hot water. It's the main control switch.",
          number: 11,
        },
        "Make sure it's in the on position.",
        "The switch itself doesn't light up, but the little square below will be black if the switch is off.",
        "Uh. That's probably what's happened. It's got switched off by mistake.",
        "The middle one of these three controls, you'll see it's slightly larger than the first one, controls the radiators.",
        "If you feel cold while you're there, and need the radiators on, this needs to be turned to maximum.",
        "The last of the three controls, the one on the right, is usually on about a No. 4 setting, which for the water in the taps is usually quite hot enough.",
        {
          text: "Below the heating controls in the middle is a small round plastic button. If there isn't enough water in the pipes, sometimes the heater goes out.",
          number: 12,
        },
        {
          text: "If this happens, you'll need to press this button to reset the heater. Hold it in for about 5 seconds, and the heater should come on again.",
          number: 12,
        },
        {
          text: "Then there's a little square indicator under the third knob that's a kind of alarm light. It'll flash if you need to reset the heater.",
          number: 13,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hmm. It sounds complicated."],
    },
    {
      speaker: "MAN",
      text: [
        "Ha, I'm sure you won't have any problems with it.",
        "There should be some more instructions on the side of the heater.",
        "Call me back if you can't make it work.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["OK."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 14 to 20.",
        "Now listen and answer questions 14 to 20.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "While you're on the phone, we haven't managed to find a few things we need, like extra pillows for the beds and some washing powder.",
        "Is there any here?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Pillows, uh, yes. If you look in the cupboard, the large white one upstairs, to the left of the bathroom door, there should be four or five on the top shelf.",
          number: 14,
        },
        {
          text: "And if you want to do some washing, there's some powder for that. Probably by the back door. There's a kind of shelf there above the sink. I'm sure there's some there in a large blue box.",
          number: 15,
        },
        {
          text: "Oh, and that reminds me, the spare key to the back door is hanging on a hook on the wall by the sitting room window.",
          number: 16,
        },
        {
          text: "And if you have any trouble with the lamps, you'll find some spare bulbs in a large cardboard box. It's on top of the washing machine with all kinds of useful things in it.",
          number: 17,
        },
        {
          text: "Oh, and another thing I forgot to mention. I've left you a local map. I put it in the top drawer of the chest under the TV in your bedroom. There's a whole file of local information in there too.",
          number: 18,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Thanks. What about visiting the town?",
        "Can you give us any advice?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, you'll need to take the car. It's too far to walk from the flat, really.",
        "You have to pay to leave your car in all the car parks now, I'm afraid.",
        "I like the one that's by the station best, and you can walk to the town centre from there in five minutes.",
        "That's where all the best restaurants are.",
        {
          text: "If you want a takeaway, the Italian one does really good pasta and pizzas. Call 7 3 22 8 1 for that one.",
          number: 19,
        },
        "Or 7 66 11 9 for the Chinese. They're both good, and they'll both deliver to the flat.",
        {
          text: "As for places to visit, do go and see the railway museum. It's small but very good. Avoid Sundays because it's crowded, and not Thursdays because it's market day and the museum is closed.",
          number: 20,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Not for the moment. Thanks."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 2.",
        "You now have half a minute to check your answers.",
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
    // Questions 11–13 (Diagram labelling, A–E)
    11: "B", // on/off switch
    12: "C", // reset button
    13: "E", // warning indicator

    // Questions 14–18 (Locations, A–G)
    14: "B", // pillows → in cupboard on landing
    15: "E", // washing powder → on shelf by back door
    16: "D", // key → next to window in living room
    17: "A", // light bulbs → in box on washing machine
    18: "C", // map → in chest of drawers

    // Questions 19–20 (Notes: ONE WORD / NUMBER)
    19: "732281", // phone number for takeaway pizzas
    20: "Thursday", // railway museum closed on
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
                {renderText("Holiday Flat Information and Troubleshooting")}
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
            {/* ================= Questions 11–13 ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 11–13")}
              </h2>
              <p>{renderText("Label the diagram below.")}</p>
              <p>
                {renderText(
                  "Choose the correct letter, A–E, next to Questions 11–13.",
                )}
              </p>
              <div className="max-w-[450px] mx-auto">
                <img
                  src="https://i.ibb.co.com/Q7DV6D14/water-heater.jpg"
                  alt=""
                />
              </div>

              <div className="border p-4 rounded-lg max-w-[260px] mx-auto mt-4">
                <h3 className="font-bold text-lg text-center mb-2">
                  {renderText("Diagram")}
                </h3>
                {[
                  "electricity indicator",
                  "on/off switch",
                  "reset button",
                  "time control",
                  "warning indicator",
                ].map((item, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <p key={idx}>
                      <strong>{letter}.</strong> {renderText(item)}
                    </p>
                  );
                })}
              </div>

              {[11, 12, 13].map((num) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 14–18 ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 14–18")}
              </h2>
              <p>
                {renderText("Where can each of the following items be found?")}
              </p>
              <p>{renderText("Choose the correct letter, A–G.")}</p>

              <div className="border p-4 rounded-lg max-w-[300px] mx-auto mt-4">
                <h3 className="font-bold text-xl text-center mb-2">
                  {renderText("Locations")}
                </h3>
                {[
                  "in box on washing machine",
                  "in cupboard on landing",
                  "in chest of drawers",
                  "next to window in living room",
                  "on shelf by back door",
                  "on top of television",
                  "under kitchen sink",
                ].map((item, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <p key={idx}>
                      <strong>{letter}.</strong> {renderText(item)}
                    </p>
                  );
                })}
              </div>

              {[
                { num: 14, label: "pillows" },
                { num: 15, label: "washing powder" },
                { num: 16, label: "key" },
                { num: 17, label: "light bulbs" },
                { num: 18, label: "map" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <div>
                    <span className="w-[160px]">{renderText(label)}</span>
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

            {/* ================= Questions 19–20 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">
                {renderText("Questions 19 and 20")}
              </h2>
              <p>{renderText("Complete the notes below.")}</p>
              <p>
                {renderText("Write ONE WORD AND/OR A NUMBER for each answer.")}
              </p>

              <div className="space-y-4 mt-4">
                <p>
                  {renderText(
                    "The best place to park in town - next to the station",
                  )}
                </p>

                <p className="flex items-center gap-2">
                  {renderText("Phone number for takeaway pizzas -")}
                  <button
                    onClick={() => toggleButton(19)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[19]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    19
                  </button>
                  <input
                    type="text"
                    className="border px-2 py-1 w-32"
                    value={userAnswers[19] || ""}
                    onChange={(e) => handleInputChange(19, e.target.value)}
                  />
                </p>

                <p className="flex items-center gap-2">
                  {renderText("Railway museum closed on")}
                  <button
                    onClick={() => toggleButton(20)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[20]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    20
                  </button>
                  <input
                    type="text"
                    className="border px-2 py-1 w-32"
                    value={userAnswers[20] || ""}
                    onChange={(e) => handleInputChange(20, e.target.value)}
                  />
                </p>
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
                        {renderText("Your Score: ")} {score}/10
                      </p>
                    </div>

                    {/* All Answers List */}
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-700 mb-3">
                        {renderText("All Answers (11–20)")}
                      </h3>
                      <ul className="space-y-3">
                        {Array.from({ length: 10 }, (_, i) => i + 11).map(
                          (num) => {
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
      </div>
      <Listening4Pagination2013></Listening4Pagination2013>
    </div>
  );
};

export default Listening4Part22013;
