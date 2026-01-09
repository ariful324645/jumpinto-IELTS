import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2023 from "../Pagination 2023/Listening1Pagination2023";

const Listening1Part22023 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [openScript, setOpenScript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [currentChunk, setCurrentChunk] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 2. You will hear a woman speaking to a group of people who are interested in becoming volunteers for an organization called ACE.",
        "First, you have some time to look at questions 11 to 15.",
        "Now listen carefully and answer questions 11 to 15.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good evening everyone. Let me start by welcoming you all to this talk, and thanking you for taking the time to consider joining ACE voluntary organization.",
        "ACE offers support to people and services in the local area, and we're now looking for more volunteers to help us do this.",
        {
          text: "By the way, I hope you're all comfortable. We have brought in extra seats so that no one has to stand, but it does mean that the people at the back of the room may be a bit squashed.",
          number: 11,
        },
        "We'll only be here for about half an hour, so, hopefully, that's OK.",
        "One of the first questions we're often asked is how old you need to be to volunteer.",
        {
          text: "Well, you can be as young as 16, or you can be 60 or over. It all depends on what type of voluntary work you want to do.",
          number: 12,
        },
        "Other considerations such as reliability are crucial in voluntary work.",
        {
          text: "And age isn't related to these in our experience.",
          number: 13,
        },
        "Another question we get asked relates to training.",
        "Well, there's plenty of that, and it's all face to face.",
        "What's more, training doesn't end when you start working for us.",
        "It takes place before, during, and after periods of work.",
        {
          text: "Often it's run by other experienced volunteers, as managers tend to prefer to get on with other things.",
          number: 14,
        },
        "Now, I would ask you to consider a couple of important issues before you decide to apply for voluntary work.",
        "We don't worry about why you want to be a volunteer.",
        {
          text: "But it is critical that you have enough hours in the day for whatever role we agree is suitable for you.",
          number: 15,
        },
        "If being a volunteer becomes stressful, then it's best not to do it at all.",
        "You may think that your income is important. But we don't ask about that.",
        "It's up to you to decide if you can work without earning money.",
        "What we value is dedication.",
        "Some of our most loyal volunteers earn very little themselves, but still give their full energy to the work they do with us.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.",
        "Now listen and answer questions 16 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "OK, so let's take a look at some of the work areas that we need volunteers for, and the sort of things that would help you in those.",
        "You may wish simply to help us raise money.",
        {
          text: "If you have the creativity to come up with an imaginative or novel way of fundraising, we'd be delighted.",
          number: 16,
        },
        "As standing in the local streets or shops with a collection box can be rather boring.",
        "One outdoor activity that we need volunteers for is litter collection.",
        {
          text: "For this it's useful if you can walk for long periods, sometimes uphill.",
          number: 17,
        },
        "Some of our regular collectors are quite elderly, but very active and keen to protect the environment.",
        "If you enjoy working with children, we have three vacancies for what are called playmates.",
        {
          text: "These volunteers help children learn about staying healthy through a range of out-of-school activities.",
          number: 18,
        },
        "You don't need to have children yourself, but it's good if you know something about nutrition, and can give clear instructions.",
        "If that doesn't appeal to you, maybe you would be interested in helping out at our story club for disabled children.",
        {
          text: "This would be especially suitable if you have done some acting.",
          number: 19,
        },
        "We put on three performances a year based on books they have read.",
        "We're always looking for support with the theatrical side of this.",
        "The last area I'll mention today is first aid.",
        {
          text: "Initially, your priority will be to take in a lot of information, and not forget any important steps or details.",
          number: 20,
        },
        "Right, so does anyone have any questions?",
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

  //  Marks show
  const correctAnswers = {
    // Questions 11–13 (Choose the correct letter, A, B or C)
    11: "C", // Some of them are very close together
    12: "A", // The age of volunteers is less important than other factors
    13: "A", // It is continuous

    // Questions 14–15 (Choose TWO letters, A–E)
    "14-15": ["B", "E"], // their level of commitment, their availability

    // Questions 16–20 (dropdown A–G)
    16: "B", // Fundraising → original, new ideas
    17: "G", // Litter collection → a good level of fitness
    18: "D", // Playmates → an understanding of food and diet
    19: "A", // Story club → experience on stage
    20: "F", // First aid → a good memory
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "14-15") {
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
    localStorage.setItem("/listening1Part22023", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22023");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22023");
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
                {renderText("Becoming a volunteer for ACE")}
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
            {renderText(
              "Choose the correct letter, A, B or C, or choose TWO letters / use the dropdown as instructed."
            )}
          </h3>

          <div className="p-6 rounded-lg space-y-8 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Becoming a volunteer for ACE")}
            </h1>

            {/* ================= Questions 11–13 ================= */}
            <h2 className="font-bold text-xl">
              {renderText("Questions 11–13")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B or C.")}</p>

            {/* Q11 */}
            <p className="font-bold text-lg">
              11 {renderText("Why does the speaker apologise about the seats?")}
            </p>
            <div className="space-y-2">
              {[
                "A. They are too small.",
                "B. There are not enough of them.",
                "C. Some of them are very close together.",
              ].map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q11"
                    value={opt[0]}
                    checked={userAnswers[11] === opt[0]}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                  />
                  <span>{renderText(opt)}</span>
                </label>
              ))}
            </div>

            {/* Q12 */}
            <p className="font-bold text-lg mt-4">
              12{" "}
              {renderText(
                "What does the speaker say about the age of volunteers?"
              )}
            </p>
            <div className="space-y-2">
              {[
                "A. The age of volunteers is less important than other factors.",
                "B. Young volunteers are less reliable than older ones.",
                "C. Most volunteers are about 60 years old.",
              ].map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q12"
                    value={opt[0]}
                    checked={userAnswers[12] === opt[0]}
                    onChange={(e) => handleInputChange(12, e.target.value)}
                  />
                  <span>{renderText(opt)}</span>
                </label>
              ))}
            </div>

            {/* Q13 */}
            <p className="font-bold text-lg mt-4">
              13 {renderText("What does the speaker say about training?")}
            </p>
            <div className="space-y-2">
              {[
                "A. It is continuous.",
                "B. It is conducted by a manager.",
                "C. It takes place online.",
              ].map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q13"
                    value={opt[0]}
                    checked={userAnswers[13] === opt[0]}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                  />
                  <span>{renderText(opt)}</span>
                </label>
              ))}
            </div>

            {/* ================= Questions 14–15 ================= */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 14 and 15")}
            </h2>
            <p>
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>

            <p className="font-bold text-lg mt-3">
              14–15{" "}
              {renderText(
                "Which TWO issues does the speaker ask the audience to consider before they apply to be volunteers?"
              )}
            </p>

            <div className="space-y-2">
              {[
                "their financial situation",
                "their level of commitment",
                "their work experience",
                "their ambition",
                "their availability",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["14-15"] || [];
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
                      onChange={() => handleInputChange("14-15", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 16–20 ================= */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 16–20")}
            </h2>

            <p className="mb-3">
              {renderText("Choose the correct letter, A–G.")}
            </p>

            <div className="space-y-2 border p-4 max-w-[250px] mx-auto">
              <p>
                <strong>A.</strong> experience on stage
              </p>
              <p>
                <strong>B.</strong> original, new ideas
              </p>
              <p>
                <strong>C.</strong> parenting skills
              </p>
              <p>
                <strong>D.</strong> an understanding of food and diet
              </p>
              <p>
                <strong>E.</strong> retail experience
              </p>
              <p>
                <strong>F.</strong> a good memory
              </p>
              <p>
                <strong>G.</strong> a good level of fitness
              </p>
            </div>

            {[
              ["16", "Fundraising"],
              ["17", "Litter collection"],
              ["18", "Playmates"],
              ["19", "Story club"],
              ["20", "First aid"],
            ].map(([num, label]) => (
              <div key={num} className="flex items-center">
                {/* Question number */}
                <p className="font-bold  p-0">{num}.</p>

                {/* Question label */}
                <p className=" ml-2 p-0">{renderText(label)}</p>

                {/* Dropdown */}
                <select
                  value={userAnswers[num] || ""}
                  onChange={(e) => handleInputChange(num, e.target.value)}
                  className="border rounded  ml-2 p-0"
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
                    {renderText("All Answers (11–20)")}
                  </h3>

                  <ul className="space-y-3">
                    {[11, 12, 13, "14-15", 16, 17, 18, 19, 20].map((num) => {
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

export default Listening1Part22023;
