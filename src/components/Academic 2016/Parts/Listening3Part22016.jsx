import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening3Pagination2016 from "../Pagination2016/Listening3Pagination2016";

const Listening2Part22017 = () => {
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
      "Section 2. You will hear a talk given by a woman called Shona Ferguson about changes in a town called Barford.",
      "First, you have some time to look at questions 11 to 15.",
      "Now listen carefully and answer questions 11 to 15.",
    ],
  },

  {
    speaker: "MAN",
    text: [
      "First of all, let me thank you all for coming to this public meeting to discuss the future of our town.",
      "Our first speaker is Shona Ferguson from Barford Town Council.",
      "Shona.",
    ],
  },

  {
    speaker: "SHONA",
    text: [
      "Thank you.",
      "First I'll briefly give you some background information, then I'll be asking you for your comments on developments in the town.",
      "Well, as you don't need me to tell you, Barford has changed a great deal in the last 50 years.",
      "These are some of the main changes.",
      "Fifty years ago, buses linked virtually every part of the town and the neighbouring towns and villages.",

      {
        text: "Most people used them frequently, but not now, because the bus companies concentrate on just the routes that attract most passengers.",
        number: 11,
      },
      "So parts of the town are no longer served by buses.",
      "Even replacing old uncomfortable buses with smart new ones has had little impact on passenger numbers.",
      "It's sometimes said that bus fares are too high.",
      "But in relation to average incomes, fares are not much higher than they were 50 years ago.",
      "Changes in the road network are affecting the town.",
      "The centre was recently closed to traffic on a trial basis, making it much safer for pedestrians.",
      "The impact of this is being measured.",

      {
        text: "The new cycle paths separating bikes from cars in most main roads are being used far more than was expected, reducing traffic and improving air quality.",
        number: 12,
      },
      "And although the council's attempts to have a bypass constructed have failed, we haven't given up hope of persuading the government to change its mind.",
      "Shopping in the town centre has changed over the years.",
      "Many of us can remember when the town was crowded with people going shopping.",
      "Numbers have been falling for several years.",
      "Despite efforts to attract shoppers, for instance by opening new car parks.",
      "Some people combine shopping with visits to the town's restaurants and cafes.",

      {
        text: "Most shops are small independent stores, which is good, but many people prefer to use supermarkets and department stores in nearby large towns,As there are so few well-known chain stores here.",
        number: 13,
      },

      "Turning now to medical facilities, the town is served by family doctors in several medical practices, fewer than 50 years ago, but each catering for far more patients.",

      {
        text: "Our hospital closed 15 years ago, which means journeys to other towns are unavoidable.",
        number: 14,
      },

      "On the other hand, there are more dentists than there used to be.",
      "Employment patterns have changed along with almost everything else.",

      {
        text: "The number of schools and colleges has increased, making that the main employment sector.",
        number: 15,
      },

      "Services such as website design and accountancy have grown in importance, and surprisingly perhaps, manufacturing hasn't seen the decline that has affected it in other parts of the country.",
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
    speaker: "SHONA",
    text: [
      "Now, I'll very quickly outline current plans for some of the town's facilities before asking for your comments.",
      "As you'll know, if you regularly use the car park at the railway station, it's usually full.",
      "The railway company applied for permission to replace it with a multi-storey car park.",
      "But that was refused.",

      {
        text: "Instead, the company has bought some adjoining land, and this will be used to increase the number of parking spaces.",
        number: 16,
      },
      "This will be used to increase the number of parking spaces.",

      {
        text: "The Grand, the old cinema in the High Street, will close at the end of the year.And reopen on a different site.",
        number: 17,
      },

      "You've probably seen the building under construction.",
      "The plan is to have three screens with fewer seats, rather than just the one large auditorium in the old cinema.",
      "I expect many of you shop in the indoor market.",
      "It's become more and more shabby-looking, and because of fears about safety, it was threatened with demolition.",

      {
        text: "The good news is that it will close for six weeks to be made safe and redecorated, and the improved building will open in July.",
        number: 18,
      },
      "It will close for six weeks and reopen in July.",
      "Lots of people use the library, including school and college students who go there to study.",

      {
        text: "The council has managed to secure funding to keep the library open later into the evening, twice a week.",
        number: 19,
      },
      "The library will stay open later twice a week.",
      "We would like to enlarge the building in the not too distant future, but this is by no means definite.",
      "There's no limit on access to the nature reserve on the edge of town.",
      "And this will continue to be the case.",

      {
        text: "What will change though, is that the council will no longer be in charge of the area.Instead, it will become the responsibility of a national body that administers most nature reserves in the country.",
        number: 20,
      },
      "It will become the responsibility of a national body.",
      "OK, now let me ask you, if you have...",
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



  // different option
 const questions = [
   "In Shona's opinion, why do fewer people use buses in Barford these days?",
   "What change in the road network is known to have benefited the town most?",
   "What is the problem affecting shopping in the town centre?",
   "What does Shona say about medical facilities in Barford?",
   "The largest number of people are employed in",
 ];

 const options = [
   [
     "A. The buses are old and uncomfortable.",
     "B. Fares have gone up too much.",
     "C. There are not so many bus routes.",
   ],
   [
     "A. the construction of a bypass",
     "B. the development of cycle paths",
     "C. the banning of cars from certain streets",
   ],
   [
     "A. lack of parking spaces",
     "B. lack of major retailers",
     "C. lack of restaurants and cafés",
   ],
   [
     "A. There is no hospital.",
     "B. New medical practices are planned.",
     "C. The number of dentists is too low.",
   ],
   ["A. manufacturing.", "B. services.", "C. education."],
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
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JOY PARKINS") {
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
  // Section 2 – Changes in Barford (Questions 11–15)
  11: "C. There are not so many bus routes.",
  12: "B. the development of cycle paths",
  13: "B. lack of major retailers",
  14: "A. There is no hospital.",
  15: "C. education.",

  // Questions 16–20 (Plans)
  16: "G", // railway station car park → It will be expanded
  17: "A", // cinema → It will move to a new location
  18: "C", // indoor market → It will be refurbished
  19: "B", // library → It will have its opening hours extended
  20: "F", // nature reserve → It will have new management
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
    localStorage.setItem("/listening2Part32018", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32018");
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
                {renderText("Changes in Barford over the last 50 years")}
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
              {renderText("Questions 11-15")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Changes in Barford over the last 50 years")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 11;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col  gap-2 ml-4">
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

          {/* 2st section */}

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 16-20")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Level the map below")} <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-G")}</span>{" "}
                {renderText("next to Questions 16-20.")}
              </h3>
              <div className="flex items-center justify-center ">
                <div className="text-center border-2 border-black p-4 space-y-2">
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-lg font-bold text-center">
                      {renderText("Plans")}
                    </h1>

                    <li className="text-lg">
                      {renderText("A. It will move to a new location.")}
                    </li>
                    <li className="text-lg">
                      {renderText(
                        "B. It will have its opening hours extended."
                      )}
                    </li>
                    <li className="text-lg">
                      {renderText("C. It will be refurbished.")}
                    </li>
                    <li className="text-lg">
                      {renderText(
                        "D. It will be used for a different purpose."
                      )}
                    </li>
                    <li className="text-lg">
                      {renderText("E. It will have its opening hours reduced.")}
                    </li>
                    <li className="text-lg">
                      {renderText("F. It will have new management.")}
                    </li>
                    <li className="text-lg">
                      {renderText("G. It will be expanded.")}
                    </li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          <div className="space-y-2">
            {/* ---------- Step 1 ---------- */}
            <h1 className="text-lg font-bold">{renderText("Facilities")}</h1>

            {/* 17 - Joy Parkins */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("16.")}</span>
              <span className="text-lg">
                {renderText("railway station car park")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="16">{renderText("16")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="F">{renderText("G")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* 17 - Joy Parkins */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("17.")}</span>
              <span className="text-lg">{renderText("Cinema")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="17">{renderText("17")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>{" "}
                  <option value="F">{renderText("G")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* 18 - David Field */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              <span className="text-lg">{renderText("indoor market")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="18">{renderText("18")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>{" "}
                  <option value="F">{renderText("G")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* 19 - Dexter Wills */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("19.")}</span>
              <span className="text-lg">{renderText("Library")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="19">{renderText("19")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>{" "}
                  <option value="F">{renderText("G")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* 20 - Mike Smith */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("20.")}</span>
              <span className="text-lg">{renderText("nature reserve")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[20] || ""}
                  onChange={(e) => handleInputChange(20, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="20">{renderText("20")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>{" "}
                  <option value="F">{renderText("G")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
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
                    All Answers (11-20)
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
      {/* <Listening2Pagination2017></Listening2Pagination2017> */}
      <Listening3Pagination2016></Listening3Pagination2016>
    </div>
  );
};

export default Listening2Part22017;
