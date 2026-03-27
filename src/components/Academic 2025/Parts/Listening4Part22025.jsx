import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2025 from "../Pagination 2025/Listening4Pagination2025";

const Listening4Part22025 = () => {
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
        "Part 2, you will hear a guide talking to members of the public who are visiting a football stadium in the UK.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning and welcome to City Football Club.",
        "I'd like to give you some useful information about your visit to the stadium today.",
        "And then we'll start the tour of the areas of the stadium that are open to visitors.",
        "I can see lots of children here today, so just to let mums and dads know a few things before we start.",
        "The stadium has lots of stairs, and the players' tunnel is very dark.",
        "Please don't let your children wander off on their own, even for a minute.",
        {
          text: "We don't want any accidents or anyone getting frightened.",
          number: 12,
        },
        "Cameras are permitted everywhere, and you can take pictures of your child shooting a penalty.",
        "Assistants are helping to organize this, and hopefully the queue won't be too long.",
        "It's very hot and sunny out on the pitch today.",
        "You can get food and drink at the cafe, and I really recommend the healthy lunch boxes for children.",
        "Also in the cafe, children are invited to do a football themed drawing.",
        {
          text: "We'll pick the best one at the end of the afternoon, so don't forget to put your name and contact details on the back.",
          number: 11,
        },
        "That way, if you've left the stadium before then, we'll send your prize, but sadly we can't return drawings.",
        "I'd like to mention some features of the tour.",
        "We'll start with the three-sixty cinema experience, which has been very popular over the years.",
        "And then I'll take you to the players' dressing rooms, before going outside to the seating area and the pitch.",
        "I should say if you'd prefer your visit to be self-guided, please collect headphones from the reception, and then you can listen to the pre-recorded information at your own speed.",
        { text: "We've only just introduced this feature.", number: 14 },
        "And would appreciate your feedback.",
        "We're thinking of offering tours in other languages in future, so if you have any thoughts on that, we'd welcome those too.",
        "If you plan to return another time, you might like to book one of our VIP tours.",
        { text: "We've only just started offering these.", number: 13 },
        "And they can be booked online.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 15 to 20.",
        "Now listen and answer questions 15 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Now, the stadium you see today was built in 1989, as part of a three-year redevelopment project.",
        "While that project was going on the team had to play its matches at the ground of another club.",
        "Apart from that, the club has been here on this site since 1870.",
        "As some of you may know, that was the start of a really important decade in the history of football in this country.",
        "For example, 1870 was also the year that football teams started to include a player whose role it was to guard the goal.",
        {
          text: "It's hard to imagine what the game must have been like without someone in that position, isn't it?",
          number: 15,
        },
        "In 1872 and 73, many other clubs were established, both here and abroad, and the following year, in 1874, referees were allowed to send players off if they committed certain offenses, and also in that year, teams started having to swap ends at half-time.",
        {
          text: "One fact I was interested to discover was that in early football games, the aim was for the scorer to get the ball between two flag posts, and later between sticks joined at the top with a piece of tape.",
          number: 16,
        },
        "In 1875, that tape was replaced with the solid crossbar that we're familiar with today.",
        {
          text: "1877 saw the founding of further new clubs, and the history books tell us that in the same year, all the clubs decided to set a limit of 90 minutes for each match.",
          number: 17,
        },
        {
          text: "Before that, it was a more casual arrangement, and this sometimes caused huge arguments.",
          number: 18,
        },
        "And sometimes fights during matches, when one team called the end of the game, and the other team wanted to play on to try and score a winning goal.",
        "By 1878 the number of teams in the Football League increased again.",
        "In addition, referees started using whistles.",
        "And electric lamps were installed on certain pitches.",
        {
          text: "This was a significant change, as games could then be played in the evenings all year round.",
          number: 19,
        },
        "In 1880, clubs began to charge fans for admission to games, even though players were still amateurs, and had other proper jobs.",
        {
          text: "That's hard to imagine in the modern professional game, where top players earn significant sums of money from both playing and commercial activities.",
          number: 20,
        },
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
      if (speaker === "WOMAN") {
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

  //  Marks show
  const correctAnswers = {
    // Questions 11–12 (Choose TWO letters, A–E)
    "11-12": ["B", "C"],
    // B: There is a competition for children today
    // C: Parents must stay with their children at all times

    // Questions 13–14 (Choose TWO letters, A–E)
    "13-14": ["A", "E"],
    // A: VIP tour
    // E: tours in other languages

    // Questions 15–20 (Choose ONE letter, A–H)
    15: "D", // 1870 → the introduction of goalkeepers
    16: "F", // 1874 → two changes to the rules of the game
    17: "B", // 1875 → a change to the design of the goal
    18: "H", // 1877 → an agreement on the length of a game
    19: "C", // 1878 → the first use of lights for matches
    20: "G", // 1880 → the introduction of a fee for spectators
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "11-12" || id === "13-14") {
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
    localStorage.setItem("/listening1Part22025", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22025");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22025");
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
                  "UK Football Stadium Tour and Football History Introduction",
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
              {renderText("UK Football Stadium Tour")}
            </h1>

            {/* ================= Questions 11–12 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 11 and 12</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>
              <p className="font-bold text-lg mt-3">
                11–12{" "}
                {renderText(
                  "Which TWO things does the speaker say about visiting the football stadium with children?",
                )}
              </p>

              {[
                "Children can get their photo taken with a football player.",
                "There is a competition for children today.",
                "Parents must stay with their children at all times.",
                "Children will need sunhats and drinks.",
                "The café has a special offer on meals for children.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["11-12"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("11-12", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 13–14 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 13 and 14</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>
              <p className="font-bold text-lg mt-3">
                13–14{" "}
                {renderText(
                  "Which TWO features of the stadium tour are new this year?",
                )}
              </p>

              {[
                "VIP tour",
                "360 cinema experience",
                "audio guide",
                "dressing room tour",
                "tours in other languages",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["13-14"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("13-14", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 15–20")}
              </h2>
              <p>
                {renderText(
                  "Which event in the history of football in the UK took place in each of the following years?",
                )}
              </p>
              <p>
                {renderText(
                  "Choose the correct letter, A–H, next to Questions 15–20.",
                )}
              </p>

              {/* Events list */}
              <div className="space-y-1 border p-4 max-w-[500px] mx-auto mt-4">
                <h3 className="font-bold text-xl text-center">
                  {renderText("Events in the history of football")}
                </h3>

                {[
                  "the introduction of pay for the players",
                  "a change to the design of the goal",
                  "the first use of lights for matches",
                  "the introduction of goalkeepers",
                  "the first international match",
                  "two changes to the rules of the game",
                  "the introduction of a fee for spectators",
                  "an agreement on the length of a game",
                ].map((event, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A-H
                  return (
                    <p key={idx}>
                      <strong>{letter}.</strong> {renderText(event)}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 15–20 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 15–20</h2>
              <p>
                {renderText("Choose the correct letter, A–H, for each year.")}
              </p>

              {[
                { year: 1870, num: 15 },
                { year: 1874, num: 16 },
                { year: 1875, num: 17 },
                { year: 1877, num: 18 },
                { year: 1878, num: 19 },
                { year: 1880, num: 20 },
              ].map(({ year, num }) => (
                <div key={num} className="flex items-center gap-4 mt-4">
                  <span className="font-bold">{num}.</span>
                  <div>
                    <span className="w-[200px] font-semibold">{year}</span>
                  </div>

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

            {/* ---------- Submit / Result ---------- */}
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
                      {["11-12", "13-14", 15, 16, 17, 18, 19, 20].map((num) => {
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
      <Listening4Pagination2025></Listening4Pagination2025>
    </div>
  );
};

export default Listening4Part22025;
