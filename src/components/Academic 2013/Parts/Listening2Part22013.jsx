import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2013 from "../Pagination 2013/Listening2Pagination2013";

const Listening2Part22013 = () => {
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
        "Section 2. You will hear a man giving a talk to new members of a wildlife club in the south of England.",
        "First, you have some time to look at questions 11 to 13.",
        "Now listen carefully, and answer questions 11 to 13.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Hello, I'm delighted to welcome you to our wildlife club, and very pleased that you're interested in the countryside, and the plants and creatures of this area.",
        "I think you'll be surprised at the variety we have here, even though we're not far from London.",
        "I'll start by telling you about some of the parks and open spaces nearby.",
        "One very pleasant place is Halland Common. This has been public land for hundreds of years, and what you'll find interesting is that the River Ouse, which flows into the sea 80 km away, has its source in the common.",
        "There's an information board about the plants and animals you can see here, and by the way, the common is accessible 24 hours a day.",
        "Then there's Holt Island, which is noted for its great range of trees.",
        {
          text: "In the past willows were grown here commercially for basket making. And this ancient craft has recently been reintroduced. The island is only open to the public from Friday to Sunday, because it's quite small.",
          number: 11,
        },
        {
          text: "And if there were people around every day, much of the wildlife would keep away.",
          number: 12,
        },
        "From there, it's just a short walk across the bridge to Longfield Country Park. Longfield has a modern replica of a farm from over 2,000 years ago.",
        {
          text: "Children's activities are often arranged there, like bread making and face painting. The park is only open during daylight hours, so bear that in mind if you decide to go there.",
          number: 13,
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
      speaker: "SPEAKER",
      text: [
        "Longfield Park has a program of activities throughout the year, and to give you a sample, this is what's happening in the next few days.",
        "On Monday, you can learn about herbs and how they've been used over the centuries.",
        {
          text: "You'll start with a tour of our herb garden, practice the technique of using them as color dyes for cloth, and listen to an illustrated talk about their use in cooking and medicine.",
          number: 14,
        },
        "Then on Wednesday, you can join local experts to discover the variety of insects and birds that appear in the evening.",

        {
          text: " We keep to a small number of people in the group, so if you want to go, you'll need to phone the park ranger a few days ahead.",
          number: 15,
        },
        "There's a small charge which you should pay when you turn up. I'm sure you're all keen to help with the practical task of looking after the park, so on Saturday you can join a working party. You'll have a choice of all sorts of activities from planting hedges to picking up litter. So you'll be able to change from one to another when you feel like it. The rangers will be hard at work all day, but do come and join in, even for just a short while.",
        {
          text: "One thing though is to make sure you're wearing something that you don't mind getting dirty or torn.",
          number: 16,
        },
        "And finally, I'd like to tell you about our new wildlife area, Hinchingbrooke Park, which will be opened to the public next month. This slide doesn't really indicate how big it is, but anyway, you can see the two gates into the park, and the main paths.",
        {
          text: " As you can see, there's a lake in the northwest of the park, with a bird hide to the west of it, at the end of a path.",
          number: 17,
        },
        "So it'll be a nice quiet place for watching the birds on the lake",
        {
          text: ". Fairly close to where refreshments are available, there's a dog walking area in the southern part of the park, leading off from the path.",
          number: 18,
        },
        {
          text: "And if you just want to sit and relax, you can go to the flower garden.",
          number: 19,
        },
        {
          text: "That's the circular area on the map, surrounded by paths. And finally, there's a wooded area in the western section of the park between two paths.",
          number: 20,
        },
        "OK, that's enough from me, so let's go on to...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 2.",
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
    11: "willows were grown", // Holt Island: past commercial use
    12: "Friday to Sunday", // Holt Island: open days
    13: "reconstruction of farm", // Longfield Country Park: 2000-year-old farm

    // Questions 14–16 (Radio buttons, A–C)
    14: "C", // dye cloth with herbs
    15: "B", // visitors should book in advance
    16: "A", // come in suitable clothing

    // Questions 17–20 (Dropdown, map labels A–I)
    17: "B", // bird hide
    18: "C", // dog-walking area
    19: "D", // flower garden
    20: "E", // wooded area
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
                {renderText(
                  "Introduction to the Wildlife Club and Nearby Areas",
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
              {renderText("Wildlife Club: Parks, Activities and Map")}
            </h1>

            {/* ================= Questions 11–13 (Table) ================= */}
            <div className="mt-6 overflow-x-auto">
              <h2 className="font-bold text-lg mb-2">
                {renderText("Questions 11–13: Complete the table")}
              </h2>
              <p>
                {renderText("Write NO MORE THAN THREE WORDS for each answer.")}
              </p>
              <table className="w-full border border-gray-300 mt-4 text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">
                      {renderText("Name of place")}
                    </th>
                    <th className="border p-2">
                      {renderText("Of particular interest")}
                    </th>
                    <th className="border p-2">{renderText("Open")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* -------- Row 1 -------- */}
                  <tr>
                    <td className="border p-2">Halland Common</td>
                    <td className="border p-2">source of River Ouse</td>
                    <td className="border p-2">24 hours</td>
                  </tr>

                  {/* -------- Row 2 -------- */}
                  <tr>
                    <td className="border p-2">Holt Island</td>
                    <td className="border p-2">
                      <h2>{renderText("many different")}</h2>
                      <button
                        onClick={() => toggleButton(11)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[11]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        11
                      </button>
                      <input
                        type="text"
                        value={userAnswers[11] || ""}
                        onChange={(e) => handleInputChange(11, e.target.value)}
                        className="border rounded px-2 py-1 "
                      />
                    </td>
                    <td className="border p-2">
                      <p>{renderText("between")}</p>
                      <button
                        onClick={() => toggleButton(12)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[12]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        12
                      </button>
                      <input
                        type="text"
                        value={userAnswers[12] || ""}
                        onChange={(e) => handleInputChange(12, e.target.value)}
                        className="border rounded px-2 py-1 "
                      />
                    </td>
                  </tr>

                  {/* -------- Row 3 -------- */}
                  <tr>
                    <td className="border p-2">Longfield Country Park</td>
                    <td className="border p-2">
                      <p>{renderText("reconstruction of a 2,000-year-old")}</p>
                      <button
                        onClick={() => toggleButton(13)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[13]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        13
                      </button>
                      <input
                        type="text"
                        value={userAnswers[13] || ""}
                        onChange={(e) => handleInputChange(13, e.target.value)}
                        className="border rounded px-2 py-1 "
                      />
                    </td>
                    <td className="border p-2">daylight hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ================= Questions 14–16 (Radio buttons) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 14–16")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>
              {[
                {
                  num: 14,
                  question: "As part of Monday's activity, visitors will",
                  options: [
                    "prepare food with herbs.",
                    "meet a well-known herbalist.",
                    "dye cloth with herbs.",
                  ],
                },
                {
                  num: 15,
                  question: "For the activity on Wednesday,",
                  options: [
                    "only group bookings are accepted.",
                    "visitors should book in advance.",
                    "attendance is free.",
                  ],
                },
                {
                  num: 16,
                  question: "For the activity on Saturday, visitors should",
                  options: [
                    "come in suitable clothing.",
                    "make sure they are able to stay for the whole day.",
                    "tell the rangers before the event what they wish to do.",
                  ],
                },
              ].map(({ num, question, options }) => (
                <div key={num} className="mt-4">
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

            {/* ================= Questions 17–20 (Dropdown) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 17–20")}
              </h2>
              <p>
                {renderText(
                  "Choose the correct letter, A–I, next to each question.",
                )}
              </p>
              <div className="mt-4 flex items-center justify-center">
                <img
                  src="https://i.ibb.co.com/gZyxfg52/map.jpg"
                  alt=""
                  className="w-[350px] h-auto"
                />
              </div>
              {[
                { num: 17, label: "bird hide" },
                { num: 18, label: "dog-walking area" },
                { num: 19, label: "flower garden" },
                { num: 20, label: "wooded area" },
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
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              ))}
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
                      {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => {
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
      <Listening2Pagination2013></Listening2Pagination2013>
    </div>
  );
};

export default Listening2Part22013;
