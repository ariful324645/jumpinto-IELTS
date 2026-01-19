import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2024 from "../Pagination 2024/Listening1Pagination2024";

const Listening1Part22024 = () => {
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
        "Part 2, you will hear the chairman of Stanthorpe Twinning Association, which organizes the link between Stanthorpe in England and a town in France, talking to members about the year's events.",
        "First you have some time to look at questions 11 to 15.",
        "Now listen carefully, and answer questions 11 to 15.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "It's great to see so many members of the Twinning Association here tonight.",
        "Since the twinning link between our two towns, Stanthorpe here in England, and Malatte in France was established, the relationship between the towns has gone from strength to strength.",
        "Last month, 25 members of the association from Stanthorpe spent a weekend in Malatte.",
        "Our hosts had arranged a great program.",
        "We learned how cheese is produced in the region, and had the chance to taste the products.",
        "The theme park trip had to be cancelled, but we all had a great time on the final boat trip down the river.",
        { text: "That was the real highlight.", number: 11 },
        "This is a special year for the association, because it's 25 years since we were founded.",
        "In Malatte, they're planning to mark this by building a footbridge in the municipal park.",
        "We've been discussing what to do here, and we've decided to plant a Poplar tree in the museum gardens.",
        {
          text: "We considered buying a garden seat to put there. But the authorities weren't happy with that idea.",
          number: 12,
        },
        "In terms of fund raising to support our activities, we've done very well.",
        "Our pancake evening was well attended and made record profits, and everyone enjoyed the demonstration of French cookery, which was nearly as successful.",
        {
          text: "Numbers for our film show were limited because of the venue, so we're looking for somewhere bigger next year.",
          number: 13,
        },
        "We're looking forward to welcoming our French visitors here next week.",
        "And I know that many of you here will be hosting individuals or families.",
        "The coach from France will arrive at 5 pm on Friday.",
        "Don't try to do too much that first evening, as they'll be tired.",
        {
          text: "So have dinner in the house or garden rather than eating out.",
          number: 14,
        },
        "The weather looks as if it'll be OK, so you might like to plan a barbecue.",
        "Then the next morning's market day in town, and that's always a good place to stroll round.",
        "On Saturday evening, we'll all meet up at the football club.",
        {
          text: "Where once again we'll have Toby Sharp and his band performing English and Scottish country songs.",
          number: 15,
        },
        "Toby will already be well known to many of you, as last year he organized our special quiz night and presented the prizes.",
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
        "Now, on Sunday, we'll be taking our visitors to Farley House.",
        "You may not all be familiar with it, so here's a map to help you.",
        "You can see the car park at the bottom of the map.",
        "There's an excellent farm shop in the grounds where our visitors can buy local produce.",
        {
          text: "It's in the old stables, which is the first building you come to.",
          number: 16,
        },
        "They're built round a courtyard, and the shop's in the far corner on the left.",
        "There's also a small cafe on the right as you go in.",
        "I know that one or two of our visitors may not be all that mobile.",
        "The main entrance to the house has a lot of steps, so you might want to use the disabled entry.",
        {
          text: "This is on the far side of the house from the car park.",
          number: 17,
        },
        "Children will probably be most interested in the adventure playground.",
        {
          text: "That's at the northern end of the larger lake, in a bend on the path that leads to the lake.",
          number: 18,
        },
        "There's lots for children to do there.",
        "There are a number of lovely gardens near the house.",
        "The kitchen gardens are rectangular and surrounded by a wall.",
        {
          text: "They're to the northeast of the house, quite near the smaller lake.",
          number: 19,
        },
        "They're still in use, and have a great collection of fruit and vegetables.",
        "The Temple of the Four Winds is a bit more of a walk, but it's worth it.",
        {
          text: "Take the path from the car park, and go past the western sides of the stables and the house.",
          number: 20,
        },
        "Then, when the path forks, take the right-hand path.",
        "Go up there with the woods on your left, and the temple is right at the end.",
        "There are great views over the whole area.",
        "OK, so that's the...",
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
    // Questions 11–15 (Choose the correct letter, A–C)
    11: "C", // visiting a cheese factory
    12: "A", // A tree will be planted
    13: "B", // the pancake evening
    14: "C", // have a meal at home
    15: "A", // listen to a concert

    // Questions 16–20 (Label the map, letters A–H)
    16: "A", // Farm shop
    17: "B", // Disabled entry
    18: "C", // Adventure playground
    19: "D", // Kitchen gardens
    20: "E", // The Temple of the Four Winds
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
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
                {renderText("Stanthorpe and Malatte Twinning Association")}
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
              {renderText("Stanthorpe Twinning Association")}
            </h1>

            {/* ================= Questions 11–15 ================= */}
            <div>
              {[
                {
                  num: 11,
                  question:
                    "During the visit to Malatte, in France, members especially enjoyed",
                  options: [
                    "going to a theme park.",
                    "experiencing a river trip.",
                    "visiting a cheese factory.",
                  ],
                },
                {
                  num: 12,
                  question:
                    "What will happen in Stanthorpe to mark the 25th anniversary of the Twinning Association?",
                  options: [
                    "A tree will be planted.",
                    "A garden seat will be bought.",
                    "A footbridge will be built.",
                  ],
                },
                {
                  num: 13,
                  question: "Which event raised most funds this year?",
                  options: [
                    "the film show",
                    "the pancake evening",
                    "the cookery demonstration",
                  ],
                },
                {
                  num: 14,
                  question:
                    "For the first evening with the French visitors host families are advised to",
                  options: [
                    "take them for a walk round the town.",
                    "go to a local restaurant.",
                    "have a meal at home.",
                  ],
                },
                {
                  num: 15,
                  question: "On Saturday evening there will be the chance to",
                  options: [
                    "listen to a concert.",
                    "watch a match.",
                    "take part in a competition.",
                  ],
                },
              ].map(({ num, question, options }) => {
                const selected = userAnswers[num] || "";
                return (
                  <div key={num} className="mb-6">
                    <p className="font-bold text-lg mb-2">
                      {num}. {renderText(question)}
                    </p>
                    <div className="space-y-2">
                      {options.map((opt, idx) => {
                        const value = String.fromCharCode(65 + idx); // A, B, C
                        return (
                          <label key={idx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`q${num}`}
                              value={value}
                              checked={selected === value}
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
            </div>

            {/* ================= Questions 16–20 ================= */}
            <div>
              <h2 className="font-bold text-xl mt-10">Questions 16–20</h2>
              <p className="mt-2">{renderText("Label the map below.")}</p>
              <p className="mt-2">
                {renderText("Choose the correct letter, A–H.")}
              </p>

              <div className="flex items-center justify-center mt-4">
                <img
                  src="https://i.ibb.co.com/Z65gQ7JN/apart.jpg"
                  className="w-[500px]"
                  alt="Map diagram"
                />
              </div>

              <div>
                {[
                  { num: 16, label: "Farm shop" },
                  { num: 17, label: "Disabled entry" },
                  { num: 18, label: "Adventure playground" },
                  { num: 19, label: "Kitchen gardens" },
                  { num: 20, label: "The Temple of the Four Winds" },
                ].map(({ num, label }) => (
                  <div key={num} className="flex items-center gap-2 mt-4">
                    <div className="font-bold flex items-center gap-2 justify-center">
                      <span>{num}.</span>
                      <h2>{renderText(label)}</h2>
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

              {/* Submit & Results */}
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
                        {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => {
                          const user = userAnswers[num];
                          const correct = correctAnswers[num];
                          const isCorrect = Array.isArray(correct)
                            ? Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            : user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase();
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
                                {isCorrect ? (
                                  <FaDotCircle className="text-green-600 text-xl font-bold" />
                                ) : (
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
      </div>
      <Listening1Pagination2024></Listening1Pagination2024>
    </div>
  );
};

export default Listening1Part22024;
