import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening4Pagination2021 from "../Pagination 2021/Listening4Pagination2021";

const Listening4Part32021 = () => {
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
        "Part 3. You will hear two urban planning students discussing bike-sharing schemes in different cities.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Now that we've done all the research into bike-sharing schemes in cities around the world, we need to think about how we're going to organize our report.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Right. I think we should start by talking about the benefits. I mean it's great that so many cities have introduced these schemes where anyone can pick up a bike from dozens of different locations and hire it for a few hours. It makes riding a bike very convenient for people.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Yes, but the costs can add up, and that puts people on low incomes off in some places.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Hmm, I suppose so. But if it means more people in general are cycling rather than driving, then because they're increasing the amount of physical activity they do, it's good for their health.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "OK. But isn't that of less importance? I mean, doesn't the impact of reduced emissions on air pollution have a more significant effect on people's health?",
        {
          text: "Reduced emissions from bike-sharing can have a significant effect on public health.",
          number: 22,
        },
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Certainly in some cities, bike-sharing has made a big contribution to that, and also helped to cut the number of cars on the road significantly.",
        {
          text: "Bike-sharing reduces car use and traffic in cities.",
          number: 21,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: ["Which is the main point."],
    },
    {
      speaker: "AMY",
      text: [
        "Exactly. But I'd say it's had less of an impact on noise pollution, because there are still loads of buses and lorries around.",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Right."],
    },
    {
      speaker: "AMY",
      text: [
        "Shall we quickly discuss the recommendations we're going to make?",
      ],
    },
    {
      speaker: "JAKE",
      text: ["In order to ensure bike-sharing schemes are successful?"],
    },
    {
      speaker: "AMY",
      text: ["Yes."],
    },
    {
      speaker: "JAKE",
      text: [
        "OK. Well, while I think it's nice to have really state-of-the-art bikes with things like GPS, I wouldn't say they're absolutely necessary.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "But some technical things are really important, like a fully functional app, so people can make payments and book bikes easily.",
        {
          text: "Technical infrastructure like apps is crucial for bike-sharing success.",
          number: 23,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Good point. Some people say there shouldn't be competing companies offering separate bike-sharing schemes. But in some really big cities, competition's beneficial. And anyway, one company might not be able to manage the whole thing.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Right. Deciding how much to invest is a big question. Cities which have opened loads of new bike lanes at the same time as introducing bike-sharing schemes have generally been more successful, but there are examples of successful schemes where this hasn't happened. What does matter though, is having a big publicity campaign.",
        {
          text: "Investment in infrastructure and publicity affects the success of bike-sharing schemes.",
          number: 24,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Definitely. If people don't know how to use the scheme, or don't understand its benefits, they won't use it. People need a lot of persuasion to stop using their cars.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Shall we look at some examples now, and say what we think is good or bad about them?",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "I suppose we should start with Amsterdam, as this was one of the first cities to have a bike-sharing scheme.",
        {
          text: "Amsterdam is a leading example of a bike-sharing scheme.",
          number: 25,
        },
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Yes. There was already a strong culture of cycling here. In a way, it's strange that there was such a demand for bike-sharing, because you'd have thought most people would have used their own bikes.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "And yet it's one of the best used schemes. Dublin's an interesting example of a success story.",
        {
          text: "Dublin's bike-sharing success shows demand can grow even with other transport options.",
          number: 26,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Hmm. Not really. There's no underground, but there are trams and a good bus network. I'd say price has a lot to do with it. It's one of the cheapest schemes in Europe to join.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "But the buses are really slow. Anyway, the weather certainly can't be a factor.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "No, definitely not. The London scheme's been quite successful.",
        {
          text: "London's bike-sharing scheme is popular and well maintained.",
          number: 27,
        },
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Yes, it's been a really good thing for the city. The bikes are popular, and the whole system is well maintained, but it isn't expanding quickly enough.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Basically not enough's been spent on increasing the number of cycle lanes, hopefully that'll change.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Yes, now what about outside Europe?",
        {
          text: "Bike-sharing schemes vary widely outside Europe.",
          number: 28,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Well, bike-sharing schemes have taken off in places like Buenos Aires.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "Hmm, they built a huge network of cycle lanes to support the introduction of the scheme there, didn't they? It attracted huge numbers of cyclists where previously there were hardly any.",
        {
          text: "Buenos Aires invested in cycle lanes, increasing bike usage.",
          number: 29,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: ["An example of good planning."],
    },
    {
      speaker: "AMY",
      text: [
        "Absolutely. New York is a good example of how not to introduce a scheme. When they launched it, it was more than 10 times the price of most other schemes.",
        {
          text: "New York's scheme failed due to high cost.",
          number: 30,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "More than it costs to take a taxi, crazy. I think the organizers lacked vision and ambition there.",
      ],
    },
    {
      speaker: "AMY",
      text: [
        "I think so too. Sydney would be a good example to use. I would have expected it to have grown pretty quickly here.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Yes, I can't quite work out why it hasn't been an instant success like some of the others.",
      ],
    },
    {
      speaker: "AMY",
      text: ["It's a shame really."],
    },
    {
      speaker: "JAKE",
      text: ["I know. OK, so now we've thought about all those."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 3.",
        "You now have half a minute to check your answers to Part 3.",
      ],
    },
  ];

  // different option
  const questions = [
    "Which TWO facilities at the leisure club have recently been improved?",
  ];

  const options = [
    [
      "A. the gym",
      "B. the tracks",
      "C. the indoor pool",
      "D. the outdoor pool",
      "E. the sports training for children",
    ],
  ];
  const notesQuestions = [
    "New members should describe any ____.",
    "The ____ will be explained to you before you use the equipment.",
    "You will be given a six-week ____.",
    "There is a compulsory £90 ____ fee for members.",
    "Gold members are given ____ to all the LP clubs.",
    "Premier members are given priority during ____ hours.",
    "Premier members can bring some ____ every month.",
    "Members should always take their ____ with them.",
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
      if (speaker === "AMY") {
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
    // Questions 21–22: TWO benefits of city bike-sharing schemes
    "21-22": ["B", "D"], // B: reducing traffic congestion, D: encouraging health and fitness

    // Questions 23–24: TWO necessary things for successful bike-sharing schemes

    "23-24": ["B", "C"], // same as Q23 for the second part

    // Questions 25–30: Opinion of bike-sharing schemes in each city
    25: "C", // Amsterdam – surprised it has been so successful
    26: "C", // Dublin – surprised it has been so successful
    27: "D", // London – more investment required
    28: "C", // Buenos Aires – surprised it has been so successful
    29: "A", // New York – disappointing
    30: "F", // Sydney – disagree about the reasons for success
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev };

      // If it's a multiple-answer question
      if (Array.isArray(correctAnswers[id])) {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];

        if (prevAnswers.includes(value)) {
          // Uncheck: remove from array
          updated[id] = prevAnswers.filter((ans) => ans !== value);
        } else {
          // Check: add to array
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-answer question
        updated[id] = value;
      }

      calculateScore(updated);
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
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening4Part32021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening4Part32021");
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
                {renderText("Analyzing and Discussing Bike-sharing Schemes")}
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 21–24 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–24")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>

          {/* Q21–22 */}
          <p className="mb-4 font-semibold">
            {renderText("Questions 21 and 22")}
          </p>
          <p className="mb-2">Choose TWO letters, A–E.</p>
          <p className="mb-4">
            {renderText(
              "Which TWO benefits of city bike-sharing schemes do the students agree are the most important?"
            )}
          </p>

          {[
            "reducing noise pollution",
            "reducing traffic congestion",
            "improving air quality",
            "encouraging health and fitness",
            "making cycling affordable",
          ].map((optionText, index) => {
            const value = String.fromCharCode(65 + index);

            const selectedOptions = userAnswers["21-22"] || [];
            const isChecked = selectedOptions.includes(value);
            const isDisabled = selectedOptions.length === 2 && !isChecked;

            return (
              <label
                key={index}
                className={`flex items-center gap-3 mb-1 cursor-pointer ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleInputChange("21-22", value)}
                />

                <span className="font-semibold">{value}.</span>
                <span>{renderText(optionText)}</span>
              </label>
            );
          })}

          {/* Q23–24 */}
          <p className="mt-8 mb-4 font-semibold">
            {renderText("Questions 23 and 24")}
          </p>
          <p className="mb-2">Choose TWO letters, A–E.</p>
          <p className="mb-4">
            {renderText(
              "Which TWO things do the students think are necessary for successful bike-sharing schemes?"
            )}
          </p>

          {[
            "Bikes should have a GPS system.",
            "The app should be easy to use.",
            "Public awareness should be raised.",
            "Only one scheme should be available.",
            "There should be a large network of cycle lanes.",
          ].map((optionText, index) => {
            const value = String.fromCharCode(65 + index);

            const selectedOptions = userAnswers["23-24"] || [];
            const isChecked = selectedOptions.includes(value);
            const isDisabled = selectedOptions.length === 2 && !isChecked;

            return (
              <label
                key={index}
                className={`flex items-center gap-3 mb-1 cursor-pointer ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleInputChange("23-24", value)}
                />

                <span className="font-semibold">{value}.</span>
                <span>{renderText(optionText)}</span>
              </label>
            );
          })}

          {/* ---------- Questions 25–30 ---------- */}
          <div className="mb-6 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {renderText("Questions 25–30")}
            </h2>
            <p className="text-gray-700 mb-4">
              {renderText(
                "What is the speakers' opinion of the bike-sharing schemes in each of the following cities? Choose the correct letter, A–G, next to Questions 25–30."
              )}
            </p>

            <div className="border border-gray-400 rounded-md p-4 max-w-sm mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-3">
                {renderText("Opinion of bike-sharing scheme")}
              </h3>
              <ul className="space-y-1 text-gray-700">
                {[
                  "A. They agree it has been disappointing",
                  "B. They think it should be cheaper",
                  "C. They are surprised it has been so successful",
                  "D. They agree that more investment is required",
                  "E. They think the system has been well designed",
                  "F. They disagree about the reasons for its success",
                  "G. They think it has expanded too quickly",
                ].map((item, index) => (
                  <li key={index} className="ml-2">
                    {renderText(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-white space-y-4">
            {[
              { qNum: 25, city: "Amsterdam" },
              { qNum: 26, city: "Dublin" },
              { qNum: 27, city: "London" },
              { qNum: 28, city: "Buenos Aires" },
              { qNum: 29, city: "New York" },
              { qNum: 30, city: "Sydney" },
            ].map(({ qNum, city }) => (
              <div key={qNum} className="flex items-center gap-2">
                <span className="font-semibold">{qNum}.</span>
                <span>{city}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Result Section */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (21–30)
                  </h3>

                  <ul className="space-y-3">
                    {["21-22", "23-24", 25, 26, 27, 28, 29, 30].map((num) => {
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
                            user?.trim().toUpperCase() ===
                            correct?.trim().toUpperCase()
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
      <Listening4Pagination2021></Listening4Pagination2021>
    </div>
  );
};

export default Listening4Part32021;
