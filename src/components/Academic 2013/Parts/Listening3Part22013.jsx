import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2013 from "../Pagination 2013/Listening3Pagination2013";

const Listening3Part22013 = () => {
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
        "Section 2.You will hear a talk on local radio about a children's theme park.",
        "First, you have some time to look at questions 11 to 13.",
        "Now listen carefully and answer questions 11 to 13.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "For the second in our series about locally run businesses, we meet Simon Winridge, co-founder of the hugely successful Winridge Forest Railway Park.",
        "Welcome, Simon. Now perhaps you can begin by telling us a little bit about how it all started.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Well, during the 1970s my wife Liz and I had just acquired 80 acres of sheep farming land.",
        "And we decided to settle down and have children.",
        "Pretty soon we had a daughter Sarah and a son Duncan.",
        "The place was wonderful for the kids.",
        "They particularly loved trains, and gradually built up an enormous network of miniature railway track.",
        "I began to develop larger scale models of locomotives, but we didn't think anything more of it until I went on a trip to a theme park near Birmingham, and decided we could do a much better job.",
        {
          text: "So we set up a small one ourselves, based on the miniature railway, and we opened to the public for just a month that year, 1984 in July, our driest month.",
          number: 11,
        },
        "Because our children said they didn't want our guests to have a miserable wet visit.",
        "I dealt with park business, and Liz carried on with the farmwork.",
        "It soon became clear that we were on to a winner.",
        "We began to extend the railway track and lay it among more interesting landscape by planting trees.",
        "Which in turn attracted more wildlife, and by making cuttings through the rock.",
        "Nowadays we're open all year round, and we're pleased to say that Winridge is one of the most popular visitor attractions in the area, with 50,000 visitors a year.",
        {
          text: "A million and a half people have been through our doors since we opened.",
          number: 12,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 14 to 20.",
        "Now listen and answer questions 14 to 20.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "All these visitors mean we have had to expand our operation, and it's now a truly family concern.",
        "I'm near to retirement age, so I only concern myself with looking after the mechanical side of things.",
        { text: "Keeping the trains going.", number: 14 },
        "Liz now devotes all her energies to recruiting and supporting the large squadron of workers, which keep the place running smoothly.",
        {
          text: "We're really pleased that after some years away teaching, Sarah has now returned to the park, and makes sure the visitors are kept fed and watered, which keeps her pretty busy, as you can imagine.",
          number: 15,
        },
        {
          text: "Our son Duncan has been a stalwart of the park for the last 10 years, taking over from me in the area of construction.",
          number: 16,
        },
        "And I'll say a little bit more about that in a moment.",
        "And his new wife Judith has also joined the team in charge of retail.",
        {
          text: "That's becoming a tremendous growth area for us. A lot of people want to buy souvenirs.",
          number: 18,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "So have you finished your development of the site for the moment?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Not at all. We are constantly looking for ways to offer more to our visitors.",
        "The railway remains the central feature, and there's now 1.2 km of the line laid, but we'd like to lay more.",
        "Because of the geology of the area, our greatest problem is digging tunnels, but we're gradually overcoming that.",
        {
          text: "We're also very pleased with a new installation of the Go-Kart arena. Which is 120 square meters in area.",
          number: 19,
        },
        "Again the problem is the geology. We had to level the mounds on the track for safety reasons.",
        "We wanted to enable 5 to 12 year olds to use the go-karts, and the main attraction here is the Formula 1 Kart.",
        {
          text: "We've known fights to break out over who gets it, ha ha ha, and then finally to our most recent development, which is the landscaped...",
          number: 20,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 2.",
        "You now have half a minute to check your answers. Now turn to Section 3.",
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
    // Questions 11–13 (radio buttons, A–C)
    11: "C", // his visit to another park
    12: "A", // the weather was expected to be good
    13: "C", // 1,500,000 visitors

    // Questions 14–18 (dropdown, A–H)
    14: "E", // Simon → engine maintenance
    15: "H", // Liz → staffing
    16: "F", // Sarah → food and drink
    17: "C", // Duncan → building
    18: "G", // Judith → sales

    // Questions 19–20 (table: ONE WORD / NUMBER)
    19: "120", // 120 m²
    20: "5-12", // 5 to 12 year-olds
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
                  "Winridge Forest Railway Park: From Start to Success and Future Plans",
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
              {renderText("Winridge Forest Railway Park")}
            </h1>

            {/* ================= Questions 11–13 (Radio) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 11–13")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  num: 11,
                  question: "Simon's idea for a theme park came from",
                  options: [
                    "his childhood hobby.",
                    "his interest in landscape design.",
                    "his visit to another park.",
                  ],
                },
                {
                  num: 12,
                  question:
                    "When they started, the family decided to open the park only when",
                  options: [
                    "the weather was expected to be good.",
                    "the children weren't at school.",
                    "there were fewer farming commitments.",
                  ],
                },
                {
                  num: 13,
                  question: "Since opening, the park has had",
                  options: [
                    "50,000 visitors.",
                    "1,000,000 visitors.",
                    "1,500,000 visitors.",
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
            </div>

            {/* ================= Questions 14–18 (Dropdown) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 14–18")}
              </h2>
              <p>
                {renderText(
                  "What is currently the main area of work of each of the following people?",
                )}
              </p>
              <p>{renderText("Choose the correct letter, A–H.")}</p>

              <div className="border p-4 rounded-lg max-w-[220px]  mx-auto mt-4">
                <h3 className="font-bold text-xl text-center mb-2">
                  {renderText("Area of work")}
                </h3>
                {[
                  "advertising",
                  "animal care",
                  "building",
                  "educational links",
                  "engine maintenance",
                  "food and drink",
                  "sales",
                  "staffing",
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
                { num: 14, label: "Simon (the speaker)" },
                { num: 15, label: "Liz" },
                { num: 16, label: "Sarah" },
                { num: 17, label: "Duncan" },
                { num: 18, label: "Judith" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span className="w-[160px]">{renderText(label)}</span>

                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 19–20 (Table) ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">
                {renderText("Questions 19 and 20")}
              </h2>
              <p>{renderText("Complete the table below.")}</p>
              <p>
                {renderText("Write ONE WORD AND/OR NUMBERS for each answer.")}
              </p>

              <table className="w-full border-collapse border mt-4 text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Feature</th>
                    <th className="border p-2">Size</th>
                    <th className="border p-2">Biggest challenge</th>
                    <th className="border p-2">Target age group</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Railway</td>
                    <td className="border p-2">1.2 km</td>
                    <td className="border p-2">Making tunnels</td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-2">Go-Kart arena</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        className="border px-2 py-1 w-24"
                        value={userAnswers[19] || ""}
                        onChange={(e) => handleInputChange(19, e.target.value)}
                      />
                    </td>
                    <td className="border p-2">Removing mounds on the track</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        className="border px-2 py-1 w-24"
                        value={userAnswers[20] || ""}
                        onChange={(e) => handleInputChange(20, e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
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
                      {renderText("All Answers (21–30)")}
                    </h3>
                    <ul className="space-y-3">
                      {Array.from({ length: 11 }, (_, i) => i + 10).map(
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
      <Listening3Pagination2013></Listening3Pagination2013>
    </div>
  );
};

export default Listening3Part22013;
