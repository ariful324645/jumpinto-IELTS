import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening4Pagination2011 from "../Pagination 2011/Listening4Pagination2011";

const Listening4Part22011 = () => {
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

  // different option
  const questions = [
    "Community groups are mainly concerned about",
    "It has been decided that the overhead power lines will be",
    "The expenses related to the power lines will be paid for by",
  ];

  const options = [
    ["A. pedestrian safety.", "B. traffic jams.", "C. increased pollution."],
    ["A. extended.", "B. buried.", "C. repaired."],
    ["A. the council.", "B. the power company.", "C. local businesses."],
  ];
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
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

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

  const correctAnswers = {
    11: "A. pedestrian safety.",
    12: "B. buried.",
    13: "B. the power company.",

    14: "A",
    15: "B",
    16: "C",
    17: "A",
    18: "B",
    19: "C",
    20: "A",
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
    localStorage.setItem("/listening2Part32020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  //update  button function
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [voices, setVoices] = useState([]);

  const utteranceRef = useRef(null);
  const progressInterval = useRef(null);

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 2. You will hear a man being interviewed on local radio about a plan to improve a suburb called Red Hill.",
        "First, you have some time to look at questions 11 to 13.",
        "Now listen carefully, and answer questions 11 to 13.",
      ],
    },

    {
      speaker: "CAROL",
      text: [
        "Good morning, and welcome again to Your City Today.",
        "With me today is Graham Campbell, a councillor from the city council.",
        "He'll be telling us about the plan to improve the fast growing suburb of Red Hill.",
        "Good morning Graham and welcome to the show.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: ["Good morning Carol."],
    },

    {
      speaker: "CAROL",
      text: [
        "Now Graham, I understand that there has been a lot of community consultation for the new plan.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Yes, we've tried to address some of the concerns that local groups told us about.",
        "People we've heard from are mainly worried about traffic in the area, and in particular the increasing speed of cars near schools.",
        {
          text: "They feel that it's only a matter of time before there's an accident as a lot of children walk to the school.",
          number: 11,
        },
        "So, we're trying to do something about that.",
        "Another area of concern is the overhead power lines. These are very old, and a lot of people we spoke to asked if something could be done about them.",
        {
          text: "The power company have agreed to move the power lines underground at a cost of $800,000.",
          number: 12,
        },
        "I think that will really improve the look of the area, as well as being safer.",
        "Well, the power company have agreed to bear the cost of this themselves after a lot of discussion with the council.",
        {
          text: "This is wonderful news, as the council now has some extra funds for us to put into other things like tree planting and artwork.",
          number: 13,
        },
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the interview, you have some time to look at questions 14 to 20.",
        "Now listen and answer questions 14 to 20.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "We've also put together a map, which we sent out to all the residents in the area, and on the map we've marked the proposed changes.",
        "Firstly, we'll plant mature pine trees to provide shelter and shade just to the right of the supermarket in Days Road.",
        {
          text: "In order to address the traffic problems, the pavements on the corner of Carberry and Thomas Street will be widened.",
          number: 14,
        },
        {
          text: "The roadway at the entrance to Thomas Street from Days Road will be painted red to mark it clearly.",
          number: 15,
        },
        {
          text: "We will install a new sign to improve pedestrian safety at key intersections.",
          number: 16,
        },
        {
          text: "A 'keep clear' sign will be erected at the junction of Evelyn Street and Hill Street to enable traffic to exit at all times.",
          number: 17,
        },
        {
          text: "Traffic lights will be installed halfway down Hill Street where it crosses Days Road.",
          number: 18,
        },
        {
          text: "Schoolchildren will research a local story which an artist will turn into artwork on a building opposite the supermarket.",
          number: 19,
        },
        {
          text: "We have agreed to build a new children's playground near the intersection with Carberry Street.",
          number: 20,
        },
      ],
    },

    {
      speaker: "CAROL",
      text: ["Wonderful. Now, what's the next stage?"],
    },

    {
      speaker: "GRAHAM",
      text: ["Well, the final plan will..."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 2.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];
  const flatText = lines.flatMap((line, lineIndex) =>
    line.text.map((chunk, chunkIndex) => ({
      text: chunk,
      lineIndex,
      chunkIndex,
    })),
  );
  useEffect(() => {
    let total = 0;

    flatText.forEach((item) => {
      const actualText =
        typeof item.text === "string" ? item.text : item.text.text;

      total += actualText.split(" ").length * 0.45;
    });

    setTotalDuration(total);
  }, [flatText]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      if (voiceList.length > 0) {
        setVoices(voiceList);
        setVoicesLoaded(true);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }, []);

  const getVoice = (speaker) => {
    if (!voices.length) return null;

    if (speaker === "GRANT")
      return voices.find((v) => v.name.includes("Male")) || voices[0];

    if (speaker === "CAROL")
      return (
        voices.find((v) => v.name.includes("Female")) || voices[1] || voices[0]
      );

    return voices[0]; // ANNOUNCER
  };

  const speakFromIndex = (index) => {
    if (index >= flatText.length) {
      stopCompletely();
      return;
    }

    const item = flatText[index];

    setCurrentLine(item.lineIndex);
    setCurrentChunk(item.chunkIndex);
    setCurrentIndex(index);

    const actualText =
      typeof item.text === "string" ? item.text : item.text.text;

    const utterance = new SpeechSynthesisUtterance(actualText);

    utterance.voice = getVoice(lines[item.lineIndex].speaker);
    utterance.rate = 1;

    utterance.onstart = () => {
      setCurrentLine(item.lineIndex);
      setCurrentChunk(item.chunkIndex);
    };

    utterance.onend = () => {
      speakFromIndex(index + 1);
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const startProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= totalDuration) {
          clearInterval(progressInterval.current);
          return totalDuration;
        }
        return prev + 0.5;
      });
    }, 500);
  };

  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleControl = () => {
    if (!voicesLoaded) {
      alert("Voices still loading... please wait 1 second and click again.");
      return;
    }

    if (!isPlaying) {
      // যদি আগে pause করা থাকে
      if (currentIndex > 0 && !window.speechSynthesis.speaking) {
        speakFromIndex(currentIndex);
        startProgress();
        setIsPlaying(true);
        return;
      }

      // First time start
      window.speechSynthesis.cancel();
      setCurrentIndex(0);
      setProgress(0);
      speakFromIndex(0);
      startProgress();
      setIsPlaying(true);
    } else {
      // Pause করলে পুরো speech cancel করবো
      window.speechSynthesis.cancel();
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    }
  };

  const stopCompletely = () => {
    window.speechSynthesis.cancel();
    clearInterval(progressInterval.current);
    setIsPlaying(false);
    setCurrentLine(null);
    setCurrentChunk(null);
    setCurrentIndex(0);
    setProgress(0);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const newIndex = Math.floor((percent / 100) * flatText.length);
    window.speechSynthesis.cancel();
    clearInterval(progressInterval.current);
    setCurrentIndex(newIndex);
    setProgress((percent / 100) * totalDuration);
    if (isPlaying) {
      speakFromIndex(newIndex);
      startProgress();
    }
  };

  const renderLine = (line, lineIdx) => (
    <p key={lineIdx} className="text-lg">
      <span className="font-bold">{line.speaker}:</span>{" "}
      {line.text.map((chunk, chunkIdx) => {
        let parts = [chunk];
        highlightedTexts.forEach((ht) => {
          parts = parts.flatMap((part) =>
            typeof part === "string"
              ? part.split(ht).flatMap((p, i, arr) =>
                  i < arr.length - 1
                    ? [
                        p,
                        <span key={Math.random()} className="bg-yellow-200">
                          {ht}
                        </span>,
                      ]
                    : [p],
                )
              : [part],
          );
        });

        return (
          <span
            key={chunkIdx}
            className={
              lineIdx === currentLine && chunkIdx === currentChunk
                ? "bg-green-200 transition-all duration-300"
                : ""
            }
          >
            {parts}{" "}
          </span>
        );
      })}
    </p>
  );

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
          {/* Updated button */}
          <div className="space-y-4">
            <button
              onClick={handleControl}
              className={`px-6 py-2 rounded-full text-white ${isPlaying ? "bg-yellow-500" : "bg-green-500"}`}
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            <div className="flex items-center gap-4">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={(progress / totalDuration) * 100 || 0}
                onChange={handleSeek}
                className="w-full"
              />
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

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
                {renderText("Improvement Plan for Red Hill Suburb")}
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
                        "Are you sure you want to clear all answers?",
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
              {renderText(" Questions 11-13")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}{" "}
              <span className="font-bold"> {renderText("    A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText(" Improvements to Red Hill Suburb")}
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

          {/* 2st section */}

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 14-20")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What topic do Cathy and Graham choose to illustrate with each novel?",
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-H")}</span>{" "}
                {renderText("next to Questions 14-20.")}
              </h3>

              <br />
            </div>
          </div>
          {/* image */}
          <div className="flex items-center justify-center">
            <img
              className="w-auto h-96"
              src="https://i.ibb.co.com/ccfXkM0n/a8t4l2.jpg"
              alt="Eikhane image bosabo"
            />
          </div>
          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">14–20</h1>

            {/* ---------- 14 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("14.")}</span>
              <span>{renderText("trees")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("14")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
                </span>
              </div>
            </p>

            {/* ---------- 15 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("15.")}</span>
              <span>{renderText("wider footpaths")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("15")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
                </span>
              </div>
            </p>

            {/* ---------- 16 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("16.")}</span>
              <span>{renderText("coloured road surface")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("16")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
                </span>
              </div>
            </p>

            {/* ---------- 17 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("17.")}</span>
              <span>{renderText("new sign")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("17")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
                </span>
              </div>
            </p>

            {/* ---------- 18 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              <span>{renderText("traffic lights")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("18")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
                </span>
              </div>
            </p>

            {/* ---------- 19 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("19.")}</span>
              <span>{renderText("artwork")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("19")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
                </span>
              </div>
            </p>

            {/* ---------- 20 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("20.")}</span>
              <span>{renderText("children's playground")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[20] || ""}
                  onChange={(e) => handleInputChange(20, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("20")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {" "}
                  <FaChevronDown />{" "}
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
                    All Answers (31–40)
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
      <Listening4Pagination2011></Listening4Pagination2011>
    </div>
  );
};

export default Listening4Part22011;
