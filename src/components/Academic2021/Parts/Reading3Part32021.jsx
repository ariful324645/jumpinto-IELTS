import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2021 from "../Pagination 2021/Reading3Pagination2021";

const Reading3Part32021 = () => {
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
  const questions = [
    // Questions 11–12
    {
      qNum: 11,
      text: "According to Megan, what are the TWO main advantages of working in the agriculture and horticulture sectors?",
      options: ["A", "B", "C", "D", "E"],
    },
    // Questions 13–14
    {
      qNum: 13,
      text: "Which TWO of the following are likely to be disadvantages for people working outdoors?",
      options: ["A", "B", "C", "D", "E"],
    },
    // Questions 15–20
    {
      qNum: 15,
      text: "Fresh food commercial manager",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 16,
      text: "Agronomist",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 17,
      text: "Fresh produce buyer",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 18,
      text: "Garden centre sales manager",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 19,
      text: "Tree technician",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 20,
      text: "Farm worker",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
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
  const correctAnswers = {
    // Questions 27–32: True / False / Not Given
    27: "NOT GIVEN", // The passage does not say if other scientists were surprised
    28: "TRUE", // The target for agricultural production by 2050 could be missed due to climate change
    29: "TRUE", // Wheat and rice suffer from a rise in temperatures
    30: "TRUE", // Could develop crops resilient to thermal stress (implies less water needed)
    31: "TRUE", // Plants grow faster in sunlight than in shade (light activates growth)
    32: "FALSE", // Phytochromes do not change state at the same speed day and night (dark reversion slower at night)

    // Questions 33–37: Section Matching (A–H)
    33: "H", // mention of specialists who can make use of the research findings → Paragraph H
    34: "D", // a reference to a potential benefit of the research findings → Paragraph D
    35: "G", // scientific support for a traditional saying → Paragraph G
    36: "C", // a reference to people traditionally making plans based on plant behaviour → Paragraph C
    37: "A", // a reference to where the research has been reported → Paragraph A

    // Questions 38–40: Gap-fill (NO MORE THAN TWO WORDS)
    38: "warm winter", // Daffodils flower early in response to warm winter
    39: "the British", // Weather will probably be wet (British know)
    40: "Arabidopsis", // Research carried out using Arabidopsis
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

    Object.keys(correctAnswers).forEach((key) => {
      const correct = correctAnswers[key];
      const user = answers[key];

      // 🟢 CASE 1: Choose TWO letters (array)
      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          correct.length === user.length &&
          correct.every((val) => user.includes(val))
        ) {
          newScore += 1;
        }
      }

      // 🟢 CASE 2: Single answer (string)
      else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening2Part32015", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22021");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 3")}</h1>
            <div className="flex gap-3">
              <IoBookSharp className="text-green-900" size={28} />
              <input
                type="checkbox"
                checked={highlight}
                onChange={() => setHighlight(!highlight)}
                className="toggle toggle-accent"
              />
            </div>
          </div>

          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 27-40")}
              </span>
              {renderText(" which are based on Reading Passage 3 below.")}
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText(
                "Plant 'thermometer' triggers springtime growth by measuring night-time heat"
              )}
            </h1>

            <p className="text-lg">
              {renderText(
                "A photoreceptor molecule in plant cells has been found to have a second job as a thermometer after dark - allowing plants to read seasonal temperature changes. Scientists say the discovery could help breed crops that are more resilient to the temperatures expected to result from climate change."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "An international team of scientists led by the University of Cambridge has discovered that the 'thermometer' molecule in plants enables them to develop according to seasonal temperature changes. Researchers have revealed that molecules called phytochromes - used by plants to detect light during the day - actually change their function in darkness to become cellular temperature gauges that measure the heat of the night."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Researchers have revealed that molecules called phytochromes - used by plants to detect light during the day - actually change their function in darkness to become cellular temperature gauges that measure the heat of the night."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    37
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "At night, these molecules change states, and the pace at which they change is 'directly proportional to temperature', say scientists, who compare phytochromes to mercury in a thermometer. The warmer it is, the faster the molecular change - stimulating plant growth."
              )}
            </p>

            <br />

            <p className="text-lg">
              <span className={highlight ? "bg-yellow-100" : ""}>
                {renderText(
                  "Farmers and gardeners have known for hundreds of years how responsive plants are to temperature: warm winters cause many trees and flowers to bud early, something humans have long used to predict weather and harvest times for the coming year. The latest research pinpoints for the first time a molecular mechanism in plants that reacts to temperature - often triggering the buds of spring we long to see at the end of winter."
                )}
              </span>
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  36
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "With weather and temperatures set to become ever more unpredictable due to climate change, researchers say the discovery that this light-sensing molecule also functions as the internal thermometer in plant cells could help us breed tougher crops."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  '"It is estimated that agricultural yields will need to double by 2050, but climate change is a major threat to achieving this. Key crops such as wheat and rice are sensitive to high temperatures. Thermal stress reduces crop yields by around 10% for every one degree increase in temperature," says lead researcher Dr Philip Wigge from Cambridge\'s Sainsbury Laboratory.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In their active state, phytochrome molecules bind themselves to DNA to restrict plant growth. During the day, sunlight activates the molecules, slowing down growth. If a plant finds itself in shade, phytochromes are quickly inactivated - enabling it to grow faster to find sunlight again."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  '"Light-driven changes to phytochrome activity occur very fast, in less than a second," says Wigge.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "At night, however, it's a different story. Instead of a rapid deactivation following sundown, the molecules gradually change from their active to inactive state. This is called 'dark reversion.'"
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  '"Just as mercury rises in a thermometer, the rate at which phytochromes revert to their inactive state during the night is a direct measure of temperature," says Wigge.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The lower the temperature, the slower the rate at which phytochromes revert to inactivity, so the molecules spend more time in their active, growth-suppressing state. This is why plants are slower to grow in winter. Warm temperatures accelerate dark reversion, so that phytochromes rapidly reach an inactive state and detach themselves from the plant's DNA - allowing genes to be expressed and plant growth to resume."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Some plants mainly use day length as an indicator of the season. Other species, such as daffodils, have considerable temperature sensitivity, and can flower months in advance during a warm winter. In fact, the discovery of the dual role of phytochromes provides the science behind a well-known rhyme long used to predict the coming season: oak before ash we'll have a splash, ash before oak we're in for a soak."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText("35")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The new findings are the culmination of twelve years of research involving scientists from Germany, Argentina and the US, as well as the Cambridge team. The work was done in a model system, using a mustard plant called Arabidopsis, but Wigge says the phytochrome genes necessary for temperature sensing are found in crop plants as well."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "\"Recent advances in plant genetics now mean that scientists are able to rapidly identify the genes controlling these processes in crop plants, and even alter their activity using precise molecular 'scalpels',\" adds Wigge."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    33
                  </span>
                )}
              </span>
            </p>
          </div>

          {/* highlight modal */}
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
          {/* ---------- Questions 27–32: True/False/Not Given ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27–32")}
            </h2>
            <p className="mb-4">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 3?"
              )}
            </p>
            <p className="mb-4">
              {renderText(
                "In boxes 27–32 on your answer sheet, choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this."
              )}
            </p>

            {[
              {
                qNum: 27,
                text: "The Cambridge scientists' discovery of the 'thermometer molecule' caused surprise among other scientists.",
              },
              {
                qNum: 28,
                text: "The target for agricultural production by 2050 could be missed.",
              },
              {
                qNum: 29,
                text: "Wheat and rice suffer from a rise in temperatures.",
              },
              {
                qNum: 30,
                text: "It may be possible to develop crops that require less water.",
              },
              {
                qNum: 31,
                text: "Plants grow faster in sunlight than in shade.",
              },
              {
                qNum: 32,
                text: "Phytochromes change their state at the same speed day and night.",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="mb-6">
                {/* Question text */}
                <p className="mb-2 font-semibold">
                  {qNum}. {renderText(text)}
                </p>

                {/* Options vertical */}
                <div className="flex flex-col ml-6 gap-1">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={option}
                        checked={userAnswers[qNum] === option}
                        onChange={() => handleInputChange(qNum, option)}
                        className="accent-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ---------- Questions 33–37: Section Matching ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 33–37")}
            </h2>
            <p className="mb-4">
              {renderText(
                "Reading Passage 3 has eight sections, A–H. Which section contains the following information?"
              )}
            </p>
            <p className="mb-4">
              {renderText(
                "Choose the correct letter, A–H, in boxes 33–37 on your answer sheet."
              )}
            </p>

            {[
              {
                qNum: 33,
                text: "mention of specialists who can make use of the research findings",
              },
              {
                qNum: 34,
                text: "a reference to a potential benefit of the research findings",
              },
              { qNum: 35, text: "scientific support for a traditional saying" },
              {
                qNum: 36,
                text: "a reference to people traditionally making plans based on plant behaviour",
              },
              {
                qNum: 37,
                text: "a reference to where the research has been reported",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="flex items-center gap-2 mb-4">
                <span className="font-semibold">{qNum}.</span>
                <span className="">{renderText(text)}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* ---------- Questions 38–40: Gap Fill ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 38–40")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Complete the sentences below.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose NO MORE THAN TWO WORDS from the passage for each answer."
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Write your answers in boxes 38–40 on your answer sheet."
              )}
            </p>

            <div className="border p-5 space-y-4">
              {[
                {
                  qNum: 38,
                  textBefore:
                    "Daffodils are likely to flower early in response to ",
                  textAfter: " weather.",
                },
                {
                  qNum: 39,
                  textBefore:
                    "If ash trees come into leaf before oak trees, the weather in ",
                  textAfter: " will probably be wet.",
                },
                {
                  qNum: 40,
                  textBefore:
                    "The research was carried out using a particular species of ",
                  textAfter: ".",
                },
              ].map(({ qNum, textBefore, textAfter }) => (
                <div key={qNum} className="flex items-center gap-3">
                  <span>{renderText(textBefore)}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 font-bold">
                      {qNum}
                    </div>
                    <input
                      type="text"
                      value={userAnswers[qNum] || ""}
                      onChange={(e) => handleInputChange(qNum, e.target.value)}
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </div>
                  <span>{renderText(textAfter)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Submit / Result ---------- */}
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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27–40)
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
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
      <Reading3Pagination2021></Reading3Pagination2021>
    </div>
  );
};

export default Reading3Part32021;
