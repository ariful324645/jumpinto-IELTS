import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2021 from "../Pagination 2021/Reading4Pagination2021";

const Reading4Part22021 = () => {
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
  // Marks show
  const correctAnswers = {
    // Questions 14–17: Multiple Choice (A–D)
    14: "A", // Our use of technology is having a hidden effect on us.
    15: "B", // We should pay attention to what might be lost when innovation occurs.
    16: "D", // Some brain circuits adjust to whatever is required of them.
    17: "B", // Has influenced what they select to read.

    // Questions 18–22: Summary Completion (A–H)
    18: "E", // many
    19: "H", // thorough
    20: "A", // fast
    21: "F", // hard
    22: "C", // emotional

    // Questions 23–26: Yes / No / Not Given
    23: "YES", // The medium we use to read can affect our choice of reading content.
    24: "NOT GIVEN", // Some age groups are more likely to lose their complex reading skills than others.
    25: "YES", // False information has become more widespread in today's digital era.
    26: "YES", // We still have opportunities to rectify the problems that technology is presenting.
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
    localStorage.removeItem("/reading2Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part22021");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          {/* ===== Header ===== */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
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

          {/* ===== Instructions ===== */}
          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on")}
              <span className="font-bold">
                {renderText(" Questions 14–26")}
              </span>
              {renderText(" which are based on Reading Passage 2 below.")}
            </h1>
          </div>

          {/* ===== Passage Text ===== */}
          <div>
            <h1 className="text-2xl font-bold mb-3 text-center">
              {renderText("Changes in reading habits")}
            </h1>
            <h2 className="text-lg font-semibold text-center mb-6">
              {renderText(
                "What are the implications of the way we read today?"
              )}
            </h2>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "Look around on your next plane trip. The iPad is the new pacifier for babies and toddlers. Younger school-aged children read stories on smartphones; older kids don't read at all, but hunch over video games. Parents and other passengers read on tablets or skim a flotilla of email and news feeds. Unbeknown to most of us, an invisible, game-changing transformation links everyone in this picture: the neuronal circuit that underlies the brain's ability to read is subtly, rapidly changing and this has implications for everyone from the pre-reading toddler to the expert adult."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  14
                </span>
              )}
            </p>

            <br />

            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "As work in neurosciences indicates, the acquisition of literacy necessitated a new circuit in our species' brain more than 6,000 years ago. That circuit evolved from a very simple mechanism for decoding basic information, like the number of goats in one's herd, to the present, highly elaborated reading brain."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " Research surfacing in many parts of the world now cautions that each of these essential 'deep reading' processes may be under threat as we move into digital-based modes of reading."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    15
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "This is not a simple, binary issue of print versus digital reading and technological innovation."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " In this hinge moment between print and digital cultures, society needs to confront what is diminishing in the expert reading circuit, what our children and older students are not developing, and what we can do about it."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    16
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "We know from research that the reading circuit is not given to human beings through a genetic blueprint like vision or language; it needs an environment to develop."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " If the dominant medium advantages processes that are fast, multi-task oriented and well-suited for large volumes of information, like the current digital medium, so will the reading circuit."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    17
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 5 */}
            <p className="text-lg">
              {renderText(
                "Increasing reports from educators and from researchers in psychology and the humanities bear this out."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " English literature scholar Mark Edmundson describes how many college students actively avoid the classic literature of the 19th and 20th centuries in favour of something simpler."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    17
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Final Paragraph */}
            <p className="text-lg">
              {renderText(
                "There's an old rule in neuroscience that does not alter with age: use it or lose it."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " We possess both the science and the technology to identify and redress the changes in how we read before they become entrenched."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    26
                  </span>
                )}
              </span>
            </p>
          </div>

          {/* ===== Highlight Modal (unchanged) ===== */}
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
          {/* ---------- Questions 14–17: Multiple Choice ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14–17")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </p>

            {[
              {
                qNum: 14,
                question:
                  "What is the writer's main point in the first paragraph?",
                options: [
                  "A. Our use of technology is having a hidden effect on us.",
                  "B. Technology can be used to help youngsters to read.",
                  "C. Travellers should be encouraged to use technology on planes.",
                  "D. Playing games is a more popular use of technology than reading.",
                ],
              },
              {
                qNum: 15,
                question:
                  "What main point does Sherry Turkle make about innovation?",
                options: [
                  "A. Technological innovation has led to a reduction in print reading.",
                  "B. We should pay attention to what might be lost when innovation occurs.",
                  "C. We should encourage more young people to become involved in innovation.",
                  "D. There is a difference between developing products and developing ideas.",
                ],
              },
              {
                qNum: 16,
                question:
                  "What point is the writer making in the fourth paragraph?",
                options: [
                  "A. Humans have an inborn ability to read and write.",
                  "B. Reading can be done using many different mediums.",
                  "C. Writing systems make unexpected demands on the brain.",
                  "D. Some brain circuits adjust to whatever is required of them.",
                ],
              },
              {
                qNum: 17,
                question:
                  "According to Mark Edmundson, the attitude of college students",
                options: [
                  "A. has changed the way he teaches.",
                  "B. has influenced what they select to read.",
                  "C. does not worry him as much as it does others.",
                  "D. does not match the views of the general public.",
                ],
              },
            ].map(({ qNum, question, options }) => (
              <div key={qNum} className="mb-6">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(question)}
                </p>
                {options.map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx); // A, B, C, D
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-3 cursor-pointer mb-1"
                    >
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={value}
                        checked={userAnswers[qNum] === value}
                        onChange={(e) =>
                          handleInputChange(qNum, e.target.value)
                        }
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt.replace(/^.\s/, ""))}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ---------- Questions 18–22: Summary Completion ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 18–22")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Complete the summary using the list of letters below."
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose the correct letter, A–H, in boxes 18–22 on your answer sheet."
              )}
            </p>

            {/* List of letters */}
            <div className="border border-gray-400 rounded-md p-4 mb-6 max-w-[220px] mx-auto bg-white shadow-sm">
              <ul className="space-y-1 text-center text-gray-700">
                {[
                  "A.fast",
                  "B.isolated",
                  "C.emotional",
                  "D.worrying",
                  "E.many",
                  "F.hard",
                  "G.combined",
                  "H.thorough",
                ].map((item, idx) => (
                  <li key={idx}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            {/* Summary content */}
            <div className="border p-5 leading-8">
              <h2 className="font-bold text-xl text-center">
                {renderText("Studies on digital screen use")}
              </h2>
              <p>
                {renderText(
                  "Studies on digital screen use. There have been many studies on digital screen use, showing some"
                )}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    18
                  </span>
                  <select
                    value={userAnswers[18] || ""}
                    onChange={(e) => handleInputChange(18, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>{" "}
                {renderText(
                  "trends. Psychologist Anne Mangen gave high-school students a short story to read, half using digital and half using print mediums. Her team then used a question-and-answer technique to find out how"
                )}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    19
                  </span>
                  <select
                    value={userAnswers[19] || ""}
                    onChange={(e) => handleInputChange(19, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>{" "}
                {renderText(
                  "each group's understanding of the plot was. The findings showed a clear pattern in the responses, with those who read screens finding the order of information"
                )}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    20
                  </span>
                  <select
                    value={userAnswers[20] || ""}
                    onChange={(e) => handleInputChange(20, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>{" "}
                {renderText("to recall.")}
              </p>

              <p className="mt-4">
                {renderText(
                  "Studies by Ziming Liu show that students are tending to read"
                )}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    21
                  </span>
                  <select
                    value={userAnswers[21] || ""}
                    onChange={(e) => handleInputChange(21, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>{" "}
                {renderText(
                  "words and phrases in a text to save time. This approach, she says, gives the reader a superficial understanding of the"
                )}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    22
                  </span>
                  <select
                    value={userAnswers[22] || ""}
                    onChange={(e) => handleInputChange(22, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>{" "}
                {renderText(
                  "content of material, leaving no time for thought."
                )}
              </p>
            </div>
          </div>

          {/* ---------- Questions 23–26: Yes / No / Not Given ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23–26")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 2?"
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "In boxes 23–26 on your answer sheet, choose YES, NO, or NOT GIVEN."
              )}
            </p>

            {[
              {
                qNum: 23,
                text: "The medium we use to read can affect our choice of reading content.",
              },
              {
                qNum: 24,
                text: "Some age groups are more likely to lose their complex reading skills than others.",
              },
              {
                qNum: 25,
                text: "False information has become more widespread in today's digital era.",
              },
              {
                qNum: 26,
                text: "We still have opportunities to rectify the problems that technology is presenting.",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="mb-4">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(text)}
                </p>
                <div className="flex flex-col gap-1 ml-4">
                  {["YES", "NO", "NOT GIVEN"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={option}
                        checked={userAnswers[qNum] === option}
                        onChange={() => handleInputChange(qNum, option)}
                        className="mr-1"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14–26)
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
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
      <Reading4Pagination2021></Reading4Pagination2021>
    </div>
  );
};

export default Reading4Part22021;
