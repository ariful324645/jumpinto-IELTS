import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2021 from "../Pagination 2021/Listening3Pagination2021";

const Listening3Part32021 = () => {
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
        "Part 3. You will hear two food science students called Adam and Rosie, starting to plan their presentation on diet and obesity.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "OK, Rosie.",
        "Shall we try to get some ideas together for our presentation on diet and obesity?",
      ],
    },
    {
      speaker: "ROSIE",
      text: ["Sure."],
    },
    {
      speaker: "ADAM",
      text: [
        "I can talk about the experiment I did.",
        "To see if people can tell the difference between real sugar and artificial sweeteners.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Where you gave people drinks with either sugar or artificial sweeteners,",
        "and they had to say which they thought it was.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Yeah.",
        "It took me ages to decide exactly how I'd organize it,",
        {
          text: "especially how I could make sure that people didn't know which drink I was giving them.",
          number: 22,
        },
        "It was hard to keep track of it all.",
        {
          text: "Especially as I had so many people doing it, I had to make sure I kept a proper record of what each person had had.",
          number: 21,
        },
      ],
    },
    {
      speaker: "ROSIE",
      text: ["So, could most people tell the difference?"],
    },
    {
      speaker: "ADAM",
      text: [
        "Yeah.",
        "I hadn't thought that they would be able to, but most people could.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Then there's that experiment I did, measuring the fat content of nuts",
        "to see if the nutritional information given on the packet was accurate.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "The one where you ground up the nuts",
        "and mixed them with a chemical to absorb the fat.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Yes, my results were a bit problematic.",
        "The fat content for that type of nut seemed much lower than it said on the package.",
        "But I reckon the package information was right.",
        {
          text: "I think I should probably have ground up the nuts more than I did.",
          number: 23,
        },
        {
          text: "It's possible that the scales for weighing the fat weren't accurate enough too.",
          number: 24,
        },
        "I'd really like to try the experiment again sometime.",
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
      speaker: "ADAM",
      text: [
        "So what can we say about helping people to lose weight?",
        "There's a lot we could say about what restaurants could do to reduce obesity.",
        {
          text: "I read that the items at the start of a menu and the items at the end of a menu are much more likely to be chosen than the items in the middle.",
          number: 25,
        },
        "So, if you put the low calorie items at the beginning and end of the menu,",
        "people will probably go for the food with fewer calories without even realizing what they're doing.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "I think food manufacturers could do more to encourage healthy eating.",
      ],
    },
    {
      speaker: "ADAM",
      text: ["How?"],
    },
    {
      speaker: "ROSIE",
      text: [
        "Well, when manufacturers put calorie counts of a food on the label,",
        {
          text: "they're sometimes really confusing, and I suspect they do it on purpose.",
          number: 26,
        },
        "Because food that's high in calories tastes better,",
        "and so they'll sell more.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Yeah, so if you look at the amount of calories in a pizza.",
        "They'll give you the calories per quarter pizza,",
        "and you think oh that's not too bad, but who's going to eat a quarter pizza?",
      ],
    },
    {
      speaker: "ROSIE",
      text: ["Exactly."],
    },
    {
      speaker: "ADAM",
      text: [
        "I suppose another approach to this problem is to get people to exercise more.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Right.",
        "In England, the current guidelines are for at least 30 minutes of brisk walking,",
        "5 days a week.",
        "Now when you ask them, about 40% of men and 30% of women say they do this,",
        {
          text: "but when you objectively measure the amount of walking they do with motion sensors.",
          number: 27,
        },
        {
          text: "You find that only 6% of men and 4% of women do the recommended amount of exercise.",
          number: 27,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: ["Hmm, so you can see why obesity is growing."],
    },
    {
      speaker: "ROSIE",
      text: ["So, how can people be encouraged to take more exercise?"],
    },
    {
      speaker: "ADAM",
      text: [
        "Well, for example, think of the location of stairs in a train station.",
        {
          text: "If people reach the stairs before they reach the escalator when they're leaving the station,",
          number: 28,
        },
        {
          text: "they're more likely to take the stairs, and if you increase the width of the stairs.",
          number: 28,
        },
        {
          text: "You'll get more people using them at the same time.",
          number: 28,
        },
        "It's an unconscious process and influenced by minor modifications in their environment.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Right.",
        "And it might not be a big change, but if it happens every day, it all adds up.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Yes, but actually I'm not sure if we should be talking about exercise in our presentation.",
      ],
    },
    {
      speaker: "ROSIE",
      text: ["Well, we've done quite a bit of reading about it."],
    },
    {
      speaker: "ADAM",
      text: [
        "I know, but it's going to mean we have a very wide focus,",
        {
          text: "and our tutor did say that we need to focus on causes and solutions in terms of nutrition.",
          number: 29,
        },
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Oh, I suppose so.",
        "And we've got plenty of information about that.",
        "OK, well, that will be simpler.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "So what shall we do now?",
        "We've still got half an hour before our next lecture.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        {
          text: "Let's think about what we're going to include, and what will go where.",
          number: 30,
        },
        {
          text: "Then we can decide what slides we need.",
          number: 30,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: ["OK, fine."],
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
  // Marks show
  const correctAnswers = {
    "21-22": ["D", "E"], // Q11 and Q12 combined
    "23-24": ["C", "E"],
    // 24: ["C", "E"], // Same as above
    25: "C", // Menus organized in a particular way
    26: "A", // Manufacturers make calorie counts hard to understand
    27: "B", // Most people overestimate exercise
    28: "A", // Stairs example: practical changes influencing behaviour
    29: "B", // They need more research on including exercise
    30: "C", // Decide on content and organisation next
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22" || id === "23-24") {
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
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part32021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part32021");
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
                  "Planning a Presentation on Diet, Obesity, and Related Solutions"
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 21–22 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–22")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>
          <p className="mb-4 font-semibold">
            {renderText(
              "Which TWO points does Adam make about his experiment on artificial sweeteners?"
            )}
          </p>

          <p className="mb-4 font-semibold">
            {renderText(
              "Questions 21–22: Which TWO benefits of city bike-sharing schemes do the students agree are the most important?"
            )}
          </p>

          {[
            "reducing noise pollution",
            "reducing traffic congestion",
            "improving air quality",
            "encouraging health and fitness",
            "making cycling affordable",
          ].map((optionText, index) => {
            const value = String.fromCharCode(65 + index); // A–E

            const selectedOptions = userAnswers["21-22"] || [];
            const isChecked = selectedOptions.includes(value);

            // Disable other options once TWO are selected
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

          {/* ---------- Questions 23–24 ---------- */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23–24")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose TWO letters, A–E.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Which TWO problems did Rosie have when measuring the fat content of nuts?"
              )}
            </p>

            {[
              "She used the wrong sort of nuts.",
              "She used an unsuitable chemical.",
              "She did not grind the nuts finely enough.",
              "The information on the nut package was incorrect.",
              "The weighing scales may have been unsuitable.",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A–E

              const selectedOptions = userAnswers["23-24"] || [];
              const isChecked = selectedOptions.includes(value);

              // Disable other checkboxes if 2 are already selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer mb-1 ${
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
          </div>

          {/* ---------- Questions 25–30 ---------- */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">
              {renderText("Questions 25–30")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose the correct letter, A, B or C.")}
            </p>

            <div className="p-5 rounded-lg bg-white space-y-6">
              {[
                {
                  qNum: 25,
                  question:
                    "Adam suggests that restaurants could reduce obesity if their menus",
                  options: [
                    "A. offered fewer options.",
                    "B. had more low-calorie foods.",
                    "C. were organised in a particular way.",
                  ],
                },
                {
                  qNum: 26,
                  question:
                    "The students agree that food manufacturers deliberately",
                  options: [
                    "A. make calorie counts hard to understand.",
                    "B. fail to provide accurate calorie counts.",
                    "C. use ineffective methods to reduce calories.",
                  ],
                },
                {
                  qNum: 27,
                  question:
                    "What does Rosie say about levels of exercise in England?",
                  options: [
                    "A. The amount recommended is much too low.",
                    "B. Most people overestimate how much they do.",
                    "C. Women now exercise more than they used to.",
                  ],
                },
                {
                  qNum: 28,
                  question:
                    "Adam refers to the location and width of stairs in a train station to illustrate",
                  options: [
                    "A. practical changes that can influence people's behaviour.",
                    "B. methods of helping people who have mobility problems.",
                    "C. ways of preventing accidents by controlling crowd movement.",
                  ],
                },
                {
                  qNum: 29,
                  question:
                    "What do the students agree about including reference to exercise in their presentation?",
                  options: [
                    "A. They should probably leave it out.",
                    "B. They need to do more research on it.",
                    "C. They should discuss this with their tutor.",
                  ],
                },
                {
                  qNum: 30,
                  question:
                    "What are the students going to do next for their presentation?",
                  options: [
                    "A. prepare some slides for it",
                    "B. find out how long they have for it",
                    "C. decide on its content and organisation",
                  ],
                },
              ].map(({ qNum, question, options }) => (
                <div key={qNum} className="flex flex-col gap-2">
                  <span className="font-semibold">
                    {qNum}. {question}
                  </span>
                  <div className="flex flex-col ml-4 space-y-1">
                    {options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`question-${qNum}`}
                          value={opt[0]} // stores "A", "B", or "C"
                          checked={userAnswers[qNum] === opt[0]}
                          onChange={() => handleInputChange(qNum, opt[0])}
                          className="form-radio"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
      <Listening3Pagination2021></Listening3Pagination2021>
    </div>
  );
};

export default Listening3Part32021;
