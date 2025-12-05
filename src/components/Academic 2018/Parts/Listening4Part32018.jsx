import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening2Pagination2018 from "../Pagination2018/Listening2Pagination2018";
import Listening4Pagination2018 from "../Pagination2018/Listening4Pagination2018";

const Listening4Part32018 = () => {
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
        "Section 3. You will hear two students called Jack and Alice discussing food labels that give information on the nutritional value of foods.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully and answer questions 21 to 26.",
      ],
    },
    {
      speaker: "JACK",
      text: [
        "I've still got loads to do for our report on nutritional food labels.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "Me too. What did you learn from doing the project about your own shopping habits?",
      ],
    },
    {
      speaker: "JACK",
      text: [
        "Well, I've always had to check labels for traces of peanuts in everything I eat because of my allergy.",
        {
          text: "But beyond that, I've never really been concerned enough to check how healthy a product is.",
          number: 21,
        },
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "This project has actually taught me to read the labels much more carefully.",
        "I tended to believe claims on packaging like 'low in fat'.",
        {
          text: "But I now realize that the 'healthy' yogurt I've bought for years is full of sugar, and that it's actually quite high in calories.",
          number: 22,
        },
      ],
    },
    {
      speaker: "JACK",
      text: [
        "Hmm. Ready meals are the worst. Comparing the labels on supermarket pizzas was a real eye opener.",
        "Did you have any idea how many calories they contain? I was amazed.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        {
          text: "Yes, because unless you read the label really carefully, you wouldn't know that the nutritional values given are for half a pizza.",
          number: 23,
        },
      ],
    },
    {
      speaker: "JACK",
      text: [
        "When most people eat the whole pizza. Not exactly transparent, is it?",
      ],
    },
    {
      speaker: "ALICE",
      text: ["Not at all, but I expect it won't stop you from buying pizza."],
    },
    {
      speaker: "JACK",
      text: [
        "Probably not, no. I thought comparing the different labeling systems used by food manufacturers was interesting.",
        "I think the kind of labeling system used makes a big difference.",
      ],
    },
    {
      speaker: "ALICE",
      text: ["Which one did you prefer?"],
    },
    {
      speaker: "JACK",
      text: [
        "I like the traditional daily value system best. The one which tells you what proportion of your required daily intake of each ingredient the product contains.",
        "I'm not sure it's the easiest for people to use, but at least you get the full story.",
        {
          text: "I like to know all the ingredients in a product, not just how much fat, salt and sugar they contain.",
          number: 24,
        },
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "But it's good, supermarkets have been making an effort to provide reliable information for customers.",
      ],
    },
    {
      speaker: "JACK",
      text: [
        "Yes. There just needs to be more consistency between labeling systems used by different supermarkets, in terms of portion sizes, et cetera.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "Hmm. The labels on the different brands of chicken flavor crisps were quite revealing too, weren't they?",
      ],
    },
    {
      speaker: "JACK",
      text: [
        "Yeah, I don't understand how they can get away with calling them chicken flavor.",
        {
          text: "When they only contain artificial additives.",
          number: 25,
        },
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "I know. I'd at least have expected them to contain a small percentage of real chicken.",
      ],
    },
    {
      speaker: "JACK",
      text: ["Absolutely."],
    },
    {
      speaker: "ALICE",
      text: [
        "I think having nutritional food labelling has been a good idea, don't you?",
        "I think it will change people's behavior and stop mothers, in particular, buying the wrong things.",
      ],
    },
    {
      speaker: "JACK",
      text: [
        "But didn't that study kind of prove the opposite? People didn't necessarily stop buying unhealthy products.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "They only said that might be the case.",
        {
          text: "Those findings weren't that conclusive, and it was quite a small-scale study.",
          number: 26,
        },
        "I think more research has to be done.",
      ],
    },
    {
      speaker: "JACK",
      text: ["Yes, I think you're probably right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
      ],
    },
    {
      speaker: "JACK",
      text: ["What do you think of the traffic light system?"],
    },
    {
      speaker: "ALICE",
      text: [
        "I think supermarkets like the idea of having a color coded system, red, orange or green for levels of fat, sugar and salt in a product.",
      ],
    },
    {
      speaker: "JACK",
      text: [
        {
          text: "But it's not been adopted universally, and not on all products.",
          number: 27,
        },
        "Why do you suppose that is?",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "Pressure from the food manufacturers, hardly surprising that some of them are opposed to flagging up how unhealthy their products are.",
      ],
    },
    {
      speaker: "JACK",
      text: [
        "I'd have thought it would have been compulsory. It seems ridiculous it isn't.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "I know, and what I couldn't get over is the fact that it was brought in without enough consultation.",
        {
          text: "A lot of experts had deep reservations about it.",
          number: 28,
        },
      ],
    },
    {
      speaker: "JACK",
      text: [
        "That is a bit weird. I suppose there's an argument for doing the research now when consumers are familiar with this system.",
      ],
    },
    {
      speaker: "ALICE",
      text: ["Yeah, maybe."],
    },
    {
      speaker: "JACK",
      text: [
        "The participants in the survey were quite positive about the traffic light system.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "Hmm, but I don't think they targeted the right people.",
        "They should have focused on people with low literacy levels, because these labels are designed to be accessible to them.",
      ],
    },
    {
      speaker: "JACK",
      text: [
        {
          text: "Yeah, but it's good to get feedback from all socio-economic groups.",
          number: 29,
        },
        "And there wasn't much variation in their responses.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        {
          text: "No, but if they hadn't interviewed participants face to face, they could have used a much bigger sample size. I wonder why they chose that method.",
          number: 30,
        },
      ],
    },
    {
      speaker: "JACK",
      text: [
        "Dunno. How were they selected? Did they volunteer, or were they approached?",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "I think they volunteered. The thing that wasn't stated was how often they bought packaged food.",
        "All we know is how frequently they use the supermarket.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 3.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "What was Jack's attitude to nutritional food labels before this project?",
    "Alice says that before doing this project,",
    "When discussing supermarket brands of pizza, Jack agrees with Alice that",
    "Jack prefers the daily value system to other labelling systems because it is",
    "What surprised both students about one flavour of crisps?",
    "What do the students think about research into the impact of nutritional food labelling?",
    "Which one things surprised the students about the traffic-light system for nutritional labels",
    "Which one things surprised the students about the traffic-light system for nutritional labels",
    "Which one things are true about the participants in the study on the traffic-light system?",
    "Which one things are true about the participants in the study on the traffic-light system?",
  ];

  const options = [
    [
      "A. He didn't read everything on them.",
      "B. He didn't think they were important.",
      "C. He thought they were too complicated.",
    ],
    [
      "A. she was unaware of what certain foods contained.",
      "B. she was too lazy to read food labels.",
      "C. she was only interested in the number of calories.",
    ],
    [
      "A. the list of ingredients is shocking.",
      "B. he will hesitate before buying pizza again.",
      "C. the nutritional label is misleading.",
    ],
    ["A. more accessible.", "B. more logical.", "C. more comprehensive."],
    [
      "A. The percentage of artificial additives given was incorrect.",
      "B. The products did not contain any meat.",
      "C. The labels did not list all the ingredients.",
    ],
    [
      "A. It did not produce clear results.",
      "B. It focused on the wrong people.",
      "C. It made unrealistic recommendations.",
    ],
    [
      "A. its widespread use",
      "B. the fact that it is voluntary for supermarkets",
      "C. how little research was done before its introduction",
    ],
    [
      "A. its unpopularity with food manufacturers",
      "B. the way certain colours are used",
      "C. the fact that it is voluntary for supermarkets",
    ],
    [
      "A. They were from all socio-economic groups.",
      "B. They were interviewed face-to-face.",
      "C. They had low literacy levels.",
    ],
    [
      "A. They were regular consumers of packaged food.",
      "B. They were selected randomly.",
      "C. They were interviewed face-to-face.",
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
      if (speaker === "JACK") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "EMMA") {
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
    21: "B. He didn't think they were important.",
    22: "A. she was unaware of what certain foods contained.",
    23: "C. the nutritional label is misleading.",
    24: "C. more comprehensive.",
    25: "B. The products did not contain any meat.",
    26: "A. It did not produce clear results.",
    27: "C. how little research was done before its introduction",
    28: "A. its unpopularity with food manufacturers",
    29: "A. They were from all socio-economic groups.",
    30: "C. They were interviewed face-to-face.",
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
    localStorage.setItem("/listening4Part32018", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening4Part32018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening4Part32018");
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
                {renderText("Food packaging labels")}
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
              {renderText("Questions 21-26")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "  Labels giving nutritional information on food packaging"
              )}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

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

      <Listening4Pagination2018></Listening4Pagination2018>
    </div>
  );
};

export default Listening4Part32018;
