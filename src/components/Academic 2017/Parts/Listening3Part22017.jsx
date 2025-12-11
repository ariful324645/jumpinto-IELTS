import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2017 from "../Pagination2017/Listening3Pagination2017";

const Listening3Part22017 = () => {
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

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 2. You will hear a woman giving a presentation about a holiday on an island in Britain that her company organizes.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "ERICA MATTHEWS",
      text: [
        "Good morning. My name's Erica Matthews, and I'm the owner of Matthews Island Holidays, a company set up by my parents.",
        "Thank you for coming to this presentation, in which I hope to interest you in what we have to offer.",
        "We're a small family-run company, and we believe in the importance of the personal touch.",
        "So we don't aim to compete with other companies on the number of customers.",
        {
          text: "What we do is build on our many years' experience, more than almost any other rail holiday company, ",
          number: 11,
        },
        "to ensure we provide perfect holidays in a small number of destinations, which we've got to know extremely well.",
        "I'll start with our six-day Isle of Man holiday.",
        "This is a fascinating island in the Irish Sea, with Wales to the south, England to the east, Scotland to the north, and Northern Ireland to the west.",

        {
          text: "Our holiday starts in Heysham, where your tour manager will meet you.",
          number: 12,
        },
        "Then you'll travel by ferry to the Isle of Man.",
        "Some people prefer to fly from Luton instead.",
        "And another popular option is to go by train to Liverpool and take a ferry from there.",
        "You have five nights in the hotel, and the price covers five breakfasts and dinners.",
        {
          text: "And lunch on the three days when there are organized trips.",
          number: 13,
        },
        "Day 4 is free, and most people have lunch in a cafe or restaurant in Douglas.",
        "The price of the holiday includes the ferry to the Isle of Man, all travel on the island, the hotel, and the meals I've mentioned.",
        "Incidentally, we try to make booking our holidays as simple and fair as possible.",
        "So unlike with many companies, the price is the same whether you book 6 months in advance or at the last minute, and there's no supplement for single rooms in hotels.",
        {
          text: " If you make a booking, then need to change the start date, you're welcome to change to an alternative date or a different tour for a small administrative fee.",
          number: 14,
        },
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
      speaker: "ERICA MATTHEWS",
      text: [
        "OK, so what does the holiday consist of?",
        "Well, on day one, you'll arrive in time for a short introduction by your tour manager, followed by dinner in the hotel.",
        {
          text: "The dining room looks out at the river, close to where it flows into the harbor, and there's usually plenty of activity going on.",
          number: 15,
        },
        "On day two, you'll take the coach to the small town of Peel, on the way calling in at the Tynwald Exhibition.",
        "The Isle of Man isn't part of the United Kingdom, and it has its own parliament called Tynwald.",
        "It's claimed that this is the world's oldest parliament that's still functioning, and that it dates back to 979.",
        {
          text: "However, the earliest surviving reference to it is from 1422, so perhaps it isn't quite as old as it claims.",
          number: 16,
        },
        "Day three, we have a trip to the mountain Snaefell.",
        "This begins with a leisurely ride along the promenade in Douglas in a horse-drawn tram.",
        "Then you board an electric train, which takes you to the fishing village of Laxey.",
        {
          text: "From there, it's an eight-kilometer ride in the Snaefell Mountain Railway to the top.",
          number: 17,
        },
        "Lunch will be in the cafe, giving you spectacular views of the island.",
        {
          text: "Day 4 is free for you to explore, using the pass which we'll give you.",
          number: 18,
        },
        "So you won't have to pay for travel on local transport, or for entrance to the island's heritage sites.",
        "Or you might just want to take it easy in Douglas, and perhaps do a little light shopping.",

        {
          text: "The last full day, day 5, is for some people the highlight of the holiday, with a ride on the steam railway from Douglas to Port Erin.",
          number: 19,
        },
        "After some time to explore, a coach will take you to the Headland that overlooks the Calf of Man, a small island just off the coast.",
        "From there, you continue to Castletown,",
        {
          text: " which used to be the capital of the Isle of Man, and its mediaeval castle.",
          number: 20,
        },
        "And on day 6, it's back to the ferry, or the airport, if you flew to the island.",
        "And time to go home.",
        "Now, I'd like to tell you a bit more.",
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
  // different option
  const questions = [
    "According to the speaker, the company",
    "Where can customers meet the tour manager before travelling to the Isle of Man?",
    "arranges holidays to more destinations than its competitors.",
    "has more customers than its competitors.",
  ];

  const options = [
    [
      "A. has been in business for longer than most of its competitors.",
      " B. arranges holidays to more destinations than its competitors.",
      " C. has more customers than its competitors.",
    ],
    ["A. Liverpool", "B. Heysham", "C. Luton"],
    ["A. three", "B. four", "C. five"],
    [
      "A. guaranteeing themselves a larger room.",
      "B. booking at short notice",
      "C. transferring to another date.",
    ],
  ];
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 11;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

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

      // Erica: female
      if (speaker === "ERICA MATTHEWS") {
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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

  const correctAnswers = {
    11: "A. has been in business for longer than most of its competitors.",
    12: "B. Heysham",
    13: "B. three",
    14: "C. transferring to another date.",
    15: "harbour",
    16: "1422",
    17: "top",
    18: "pass",
    19: "steam",
    20: "capital",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        answers[key]?.trim().toLowerCase() ===
        correctAnswers[key].trim().toLowerCase()
      ) {
        newScore += 1;
      }
    });
    setScore(newScore);
    localStorage.setItem("/listening1Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22020");
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
                {renderText("Matthews Island")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>

              {/* Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {renderText("Clear answer")}
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      {renderText(
                        "Are you sure you want to clear all answers?"
                      )}
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        {renderText("No, keep them")}
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        {renderText("Yes, clear them")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 11-14")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("   Matthews Island Holidays")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 11;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

                      return (
                        <li
                          key={oIndex}
                          onClick={() => handleOptionClick(qIndex, option)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 inline-block ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-700"
                            }`}
                          ></span>

                          <span
                            className={
                              isSelected ? "text-blue-500" : "text-black"
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 15-20")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Write")}{" "}
              <span className="font-bold">{renderText("ONLY ONE WORD")}</span>{" "}
              {renderText("for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    className="border border-gray-400 text-lg font-bold p-2"
                  >
                    {renderText("Timetable for Isle of Man holiday")}
                  </th>
                </tr>
                <tr>
                  <th className="border p-2"> {renderText("")} </th>
                  <th className="border p-2">{renderText("Activity")}</th>
                  <th className="border p-2">{renderText("Notes")}</th>
                </tr>
              </thead>

              <tbody>
                {/* Day 1 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">Day 1</td>
                  <td className="border border-gray-400 text-lg p-2">Arrive</td>
                  <td className="border border-gray-400 text-lg p-2">
                    <div>Introduction by manager</div>
                    <div className="flex items-center mt-1">
                      <span>Hotel dining room has view of the</span>
                      <button
                        onClick={() => toggleButton(15)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[15]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        15
                      </button>
                      <input
                        value={userAnswers[15] || ""}
                        onChange={(e) => handleInputChange(15, e.target.value)}
                        className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                {/* Day 2 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">Day 2</td>
                  <td className="border border-gray-400 text-lg p-2">
                    Tynwald Exhibition and Peel
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>Tynwald may have been founded in </span>
                    <button
                      onClick={() => toggleButton(16)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[16]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      16
                    </button>
                    <input
                      value={userAnswers[16] || ""}
                      onChange={(e) => handleInputChange(16, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span> not 979.</span>
                  </td>
                </tr>

                {/* Day 3 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">Day 3</td>
                  <td className="border border-gray-400 text-lg p-2">
                    Trip to Snaefell
                  </td>
                  <td className="border border-gray-400 text-lg p-2 leading-relaxed">
                    <div>Travel along promenade in a tram;</div>
                    <div>train to Laxey;</div>
                    <div className="flex items-center">
                      <span>train to the </span>
                      <button
                        onClick={() => toggleButton(17)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[17]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        17
                      </button>
                      <input
                        value={userAnswers[17] || ""}
                        onChange={(e) => handleInputChange(17, e.target.value)}
                        className="w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span> of Snaefell</span>
                    </div>
                  </td>
                </tr>

                {/* Day 4 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">Day 4</td>
                  <td className="border border-gray-400 text-lg p-2">
                    Free day
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>Company provides a </span>
                    <button
                      onClick={() => toggleButton(18)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[18]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      18
                    </button>
                    <input
                      value={userAnswers[18] || ""}
                      onChange={(e) => handleInputChange(18, e.target.value)}
                      className="w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span> for local transport and heritage sites.</span>
                  </td>
                </tr>

                {/* Day 5 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">Day 5</td>
                  <td className="border border-gray-400 text-lg p-2">
                    Take the{" "}
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
                      value={userAnswers[19] || ""}
                      onChange={(e) => handleInputChange(19, e.target.value)}
                      className="w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    railway train from Douglas to Port Erin
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <div>Free time, then coach to Castletown – former </div>

                    <div className="flex items-center mt-1">
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
                        value={userAnswers[20] || ""}
                        onChange={(e) => handleInputChange(20, e.target.value)}
                        className="w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span> has old castle.</span>
                    </div>
                  </td>
                </tr>

                {/* Day 6 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">Day 6</td>
                  <td className="border border-gray-400 text-lg p-2">Leave</td>
                  <td className="border border-gray-400 text-lg p-2">
                    Leave the island by ferry or plane
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
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
                    {Array.from({ length: 10 }, (_, i) => i + 11).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();

                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;

                      const isWrong =
                        userAnswer && userAnswer !== correctAnswer;

                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
                            )}
                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}

                            <p className="font-bold">Q{num}:</p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswers[num]}</span>
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
      <Listening3Pagination2017></Listening3Pagination2017>
    </div>
  );
};

export default Listening3Part22017;
