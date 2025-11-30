import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2019 from "../Pagination/Listening1Pagination2019";

const Listening1Part32019 = () => {
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
        "Section 3. You will hear two urban planning students called Carla and Rob discussing their presentation on cities built by the sea, following instructions from their tutor.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "OK, so what I'd like you to do now is to talk to your partner about your presentations on urban planning.",
        "You should have done most of the reading now, so I'd like you to share your ideas.",
        "And talk about the structure of your presentation and what you need to do next.",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "OK, Rob, I'm glad we chose quite a specific topic, cities built next to the sea.",
        "It made it much easier to find relevant information.",
      ],
    },

    {
      speaker: "ROB",
      text: [
        "Yeah, and cities are growing so quickly.",
        "I mean we know that more than half the world's population lives in cities now.",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        {
          text: "Yeah, though that's all cities, not just ones on the coast, but most of the biggest cities are actually built by the sea.",
          number: 21,
        },
        "I'd not realized that before.",
      ],
    },

    {
      speaker: "ROB",
      text: [
        "Nor me.",
        "And what's more, a lot of them are built at places where rivers come out into the sea, but apparently this can be a problem.",
      ],
    },

    {
      speaker: "CARLA",
      text: ["Why?"],
    },

    {
      speaker: "ROB",
      text: [
        "Well, as the city expands, agriculture and industry tend to spread further inland along the rivers.",
        "And so agriculture moves even further inland up the river.",

        {
          text: "That's not necessarily a problem, except it means more and more pollutants are discharged into the rivers.",
          number: 22,
        },
      ],
    },

    {
      speaker: "CARLA",
      text: ["So these are brought downstream to the cities."],
    },

    {
      speaker: "ROB",
      text: [
        "Right. Did you read that article about Miami on the east coast of the USA?",
      ],
    },

    {
      speaker: "CARLA",
      text: ["No."],
    },

    {
      speaker: "ROB",
      text: [
        "Well, apparently back in the 1950s, they built channels to drain away the water in case of flooding.",
      ],
    },

    {
      speaker: "CARLA",
      text: ["Sounds sensible."],
    },

    {
      speaker: "ROB",
      text: [
        {
          text: "Yeah, they spent quite a lot of money on them, but what they didn't take into account was global warming.",
          number: 23,
        },
        "So they built the drainage channels too close to sea level, and now sea levels are rising, they're more or less useless.",
        "If there's a lot of rain, the water can't run away. There's nowhere for it to go. The whole design was faulty.",
      ],
    },

    {
      speaker: "CARLA",
      text: ["So, what are the authorities doing about it now?"],
    },

    {
      speaker: "ROB",
      text: [
        "I don't know. I did read that they're aiming to stop disposing of waste water into the ocean over the next 10 years.",
      ],
    },

    {
      speaker: "CARLA",
      text: ["But that won't help with flood prevention now, will it?"],
    },

    {
      speaker: "ROB",
      text: [
        {
          text: "No, really, they just need to find the money for something to replace the drainage channels, in order to protect against flooding now.",
          number: 24,
        },
        "But in the long term, they need to consider the whole ecosystem.",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "Right. Really though, coastal cities can't deal with their problems on their own, can they?",

        {
          text: "I mean, they've got to start acting together at an international level, instead of just doing their own thing.",
          number: 25,
        },
      ],
    },

    {
      speaker: "ROB",
      text: [
        "Absolutely. The thing is, everyone knows what the problems are, and environmentalists have a pretty good idea of what we should be doing about them.",
        "So they should be able to work together to some extent.",
        "But it's going to be a long time before countries come to a decision on what principles they're prepared to abide by.",
      ],
    },

    {
      speaker: "CARLA",
      text: ["Yeah, if they ever do."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "So, I think we've probably got enough for our presentation. It's only 15 minutes.",
      ],
    },

    {
      speaker: "ROB",
      text: [
        "OK, so I suppose we'll begin with some general historical background about why coastal cities were established.",

        {
          text: "But we don't want to spend too long on that, the other students will already know a bit about it.",
          number: 26,
        },
        "It's all to do with communications and so on.",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "Yes, we should mention some geographical factors, uh, things like wetlands and river estuaries and coastal erosion and so on.",
        "We could have some maps of different cities with these features marked, on a handout you mean?",
      ],
    },

    {
      speaker: "ROB",
      text: [{ text: "Or some slides everyone can see.", number: 27 }],
    },

    {
      speaker: "CARLA",
      text: ["Yeah, that'd be better."],
    },

    {
      speaker: "ROB",
      text: [
        "It'd be good to go into past mistakes in a bit more detail.",
        "Did you read that case study of the problems there were in New Orleans with flooding a few years ago?",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "Yes. ",
        {
          text: "Uh. We could use that as the basis for that part of the talk.",
          number: 28,
        },
        "I don't think the other students will have read it, but they'll remember hearing about the flooding at the time.",
      ],
    },

    {
      speaker: "ROB",
      text: ["Hmm, OK. So that's probably enough background."],
    },

    {
      speaker: "CARLA",
      text: [
        "So, then we'll go on to talk about what action's being taken to deal with the problems of coastal cities.",
      ],
    },

    {
      speaker: "ROB",
      text: [
        "OK. What else do we need to talk about?",
        "Maybe something on future risks, looking more at the long term, if populations continue to grow.",
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "Yeah, we'll need to do a bit of work there.",
        "I haven't got much information, have you?",
      ],
    },

    {
      speaker: "ROB",
      text: [
        {
          text: "No, we'll need to look at some websites, shouldn't take too long.",
          number: 29,
        },
      ],
    },

    {
      speaker: "CARLA",
      text: [
        "OK, and I think we should end by talking about international implications.",

        { text: "Maybe we could ask people in the audience.", number: 30 },
        "We've got people from quite a lot of different places.",
      ],
    },

    {
      speaker: "ROB",
      text: [
        "That would be interesting if we have time. Yes, so now should we go on?",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // updated Section 3 questions & options
  const questions = [
    "Carla and Rob were surprised to learn that coastal cities",
    "According to Rob, building coastal cities near to rivers",
    "What mistake was made when building water drainage channels in Miami in the 1950s?",
    "What do Rob and Carla think that the authorities in Miami should do immediately?",
    "What do they agree should be the priority for international action?",
  ];

  const options = [
    [
      "A. contain nearly half the world's population.",
      "B. include most of the world's largest cities.",
      "C. are growing twice as fast as other cities.",
    ],
    [
      "A. may bring pollution to the cities.",
      "B. may reduce the land available for agriculture.",
      "C. may mean the countryside is spoiled by industry.",
    ],
    [
      "A. There were not enough of them.",
      "B. They were made of unsuitable materials.",
      "C. They did not allow for the effects of climate change.",
    ],
    [
      "A. take measures to restore ecosystems",
      "B. pay for a new flood prevention system",
      "C. stop disposing of waste materials into the ocean",
    ],
    [
      "A. greater coordination of activities",
      "B. more sharing of information",
      "C. agreement on shared policies",
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
      const answerKey = qIndex + 21;
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
      if (speaker === "TUTOR") {
        return voices.find((v) => v.name.includes("Mark")) || voices[0];
      }
      if (speaker === "ROB") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "CARLA") {
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
 
    21: "B. include most of the world's largest cities.",
    22: "A. may bring pollution to the cities.",
    23: "C. They did not allow for the effects of climate change.",
    24: "B. pay for a new flood prevention system",
    25: "A. greater coordination of activities",
    26: "B",
    27: "E",
    28: "F",
    29: "G",
    30: "C",
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
    localStorage.setItem("/listening1Part22019", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22019");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22019");
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
                {renderText("Cities built by the sea")}
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
          {/* 1st section */}

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 21-25")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              Cities built by the sea
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

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

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 26-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What decision do the students make about each of the following parts of their presentation?"
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-G")}</span>{" "}
                {renderText("next to Questions 26-30.")}
              </h3>

              <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
                <div className="text-center">
                  <h1 className="text-xl font-bold mb-5">Decisions</h1>
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. use visuals")}</li>
                    <li>{renderText("B. keep it short")}</li>
                    <li>{renderText("C. involve other students")}</li>
                    <li>
                      {renderText("D. check the information is accurate")}
                    </li>
                    <li>{renderText("E. provide a handout")}</li>
                    <li>{renderText("F. focus on one example")}</li>
                    <li>{renderText("G. do online research")}</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 1 ---------- */}
            <h1 className="text-lg font-bold">
              {renderText("Parts of the presentation")}
            </h1>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span>{renderText("Historical background")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="26">{renderText("26")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span>{renderText("Geographical factors")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="27">{renderText("27")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              <span>{renderText("Past mistakes")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="28">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("Future risks")}
              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="29">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>

                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("International implications")}
              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="30">{renderText("30")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
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
                    All Answers (21-30)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
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
      <Listening1Pagination2019></Listening1Pagination2019>
    </div>
  );
};

export default Listening1Part32019;
