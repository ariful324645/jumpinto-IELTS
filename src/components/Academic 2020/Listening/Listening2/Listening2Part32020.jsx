import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";
import Listening1Pagination from "../../Pagination/Listening1Pagination/listening1Pagination2020";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2020 from "../../Pagination/Listening2Pagination/Listening2Pagination2020";

const Listening2Part32020 = () => {
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
        "Part 3. You will hear two students of English called Cathy and Graham planning a display on 19th century British life and literature for a university event.",
        "You have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "OK, Graham, so let's check we both know what we're supposed to be doing.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: ["OK."],
    },

    {
      speaker: "CATHY",
      text: [
        "So for the university's open day, we have to plan a display on British life and literature in the mid 19th century.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "That's right. But we'll have some people to help us find the materials and set it up, remember? For the moment, we just need to plan it.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "Good. So have you gathered who's expected to come and see the display? Is it for the people studying English or students from other departments? I'm not clear about it.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Nor me. That was how it used to be, but it didn't attract many people so this year it's going to be part of an open day to raise the university's profile.",

        {
          text: "It'll be publicized in the city to encourage people to come and find out something of what goes on here.",
          number: 21,
        },
        {
          text: "And it's included in the information that's sent to people who are considering applying to study here next year.",
          number: 22,
        },
      ],
    },

    {
      speaker: "CATHY",
      text: ["Presumably some current students and lecturers will come."],
    },

    {
      speaker: "GRAHAM",
      text: [
        "I would imagine so. But we've been told to concentrate on the other categories of people.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "Right. We don't have to cover the whole range of 19th century literature, do we?",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "No, it's entirely up to us. I suggest just using Charles Dickens.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "That's a good idea.",
        {
          text: " Most people have heard of him and have probably read some of his novels or seen films based on them.",
          number: 24,
        },
        "Hmm. So that's a good lead-in to life in his time.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Exactly. ?",
        {
          text: "And his novels show the awful conditions that most people had to live in, don't they?. He wanted to shock people into doing something about it.",
          number: 23,
        },
      ],
    },

    {
      speaker: "CATHY",
      text: ["Did he do any campaigning other than writing?"],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Yes, he campaigned for education and other social reforms and gave talks, but I'm inclined to ignore that and focus on the novels.",
      ],
    },

    {
      speaker: "CATHY",
      text: ["Yes, I agree."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "I listen and answer questions 25 to 30.",
      ],
    },

    {
      speaker: "CATHY",
      text: ["OK, so now should we think about a topic linked to each novel?"],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Yes, I've printed out a list of Dickens's novels in the order they were published. In the hope you'd agree to focus on him.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "Ha ha ha, you're lucky. I did agree. Ha ha. Let's have a look. Uh. OK, the first was the Pickwick Papers. Published in 1836 it was very successful when it came out, wasn't it? And was adapted for the theatre straight away.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "There's an interesting point though. ",
        {
          text: "That there's a character who keeps falling asleep, and that medical condition was named after the book, Pickwickian syndrome.",
          number: 25,
        },
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "Oh, so why don't we use that as the topic? And include some quotations from the novel.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Right, next is Oliver Twist. Hmm. There's a lot in the novel about poverty, but maybe something less obvious.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "Well, Oliver is taught how to steal, isn't he? ",
        {
          text: "We could use that to illustrate the fact that very few children went to school, particularly not poor children, so they learned in other ways.Hmm.",
          number: 26,
        },
      ],
    },

    {
      speaker: "GRAHAM",
      text: ["Good idea. What's next?"],
    },

    {
      speaker: "CATHY",
      text: [
        "Maybe Nicholas Nickleby. Actually he taught in a really cruel school, didn't he?",
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "That's right. But there's also the company of touring actors that Nicholas joins..",
        {
          text: " We could do something on theaters and other amusements of the time",
          number: 27,
        },
        "We don't want only the bad things, do we? OK, what about Martin Chuzzlewit? He goes to the USA, doesn't he?",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        {
          text: "Yes, and Dickens himself had been there a year before.And drew on his experience there in the novel.",
          number: 28,
        },
      ],
    },

    {
      speaker: "GRAHAM",
      text: [
        "I wonder though, the main theme is selfishness, so we could do something on social justice. Hmm. No, too general. Let's keep to your idea. I think it would work well.",
      ],
    },

    {
      speaker: "CATHY",
      text: ["He wrote Bleak House next, that's my favorite of his novels."],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Yes, mine too. Oh, his satire of the legal system is pretty powerful.",
      ],
    },

    {
      speaker: "CATHY",
      text: [
        "That's true, but think about Esther the heroine.",
        {
          text: " As a child, she lives with someone she doesn't know is her aunt, who treats her very badly.",
          number: 29,
        },

        {
          text: "Then she's very happy living with her guardian, and he puts her in charge of the household, and at the end she gets married, and her guardian gives her and her husband a house, where of course they're very happy.",
          number: 29,
        },
      ],
    },

    {
      speaker: "GRAHAM",
      text: ["Yes, I like that."],
    },

    {
      speaker: "CATHY",
      text: [
        "What should we take next? Uh. Little Dorrit, old Mr Dorrit has been in a debtor's prison for years.",
      ],
    },

    {
      speaker: "GRAHAM",
      text: ["So was Dickens's father, wasn't he?"],
    },

    {
      speaker: "CATHY",
      text: ["That's right."],
    },

    {
      speaker: "GRAHAM",
      text: [
        {
          text: "What about focusing on the part when Mr Dorrit inherits a fortune?. And he starts pretending he's always been rich.",
          number: 30,
        },
      ],
    },

    {
      speaker: "CATHY",
      text: ["Ha ha, good idea."],
    },

    {
      speaker: "GRAHAM",
      text: [
        "Ha ha, OK. So next we need to think about what materials we want to illustrate each issue. That's going to be quite hard.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
      ],
    },
  ];

  // different option
  const questions = [
    "Who is the display mainly aimed at?",
    "Who else is expected to attend the display?",
    "Why did Cathy and Graham choose Charles Dickens as their focus?",
    "What was another reason for choosing Charles Dickens?",
  ];

  const options = [
    [
      "A. Students from the English department",
      " B. Residents of the local area",
      " C. Potential new students",
    ],
    [
      "A. Students from other departments",
      " B. The university’s teaching staff",
      " C. Potential new students",
    ],
    [
      "A. His novels are widely known today",
      " B. He used his writing to highlight social problems",
      " C. His reputation has recently changed",
    ],
    [
      "A. He was consulted on social issues",
      " B. His speeches inspired positive change",
      " C. His novels link well to life in his time",
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
      if (speaker === "GRAHAM") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "CATHY") {
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
    21: "C. Potential new students",
    22: "B. The university’s teaching staff",
    23: "A. His novels are widely known today",
    24: "C. His novels link well to life in his time",
    25: "G",
    26: "B",
    27: "D",
    28: "C",
    29: "H",
    30: "F",
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
                {renderText("Cathy & Graham novels")}
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
            <h2 className="text-lg font-bold">Questions 21-24</h2>
            <p className="text-xl">
              Choose the correct letter,{" "}
              <span className="font-bold">A, B or C</span>.
            </p>

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

          {/* 2st section */}

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 25-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What topic do Cathy and Graham choose to illustrate with each novel?"
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-H")}</span>{" "}
                {renderText("next to Questions 25-30.")}
              </h3>
              <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
                <div className="text-center">
                  <h1 className="text-xl font-bold mb-5">Topics</h1>

                  <ul className="space-y-1 text-lg">
                    <li>A. poverty</li>
                    <li>B. education</li>
                    <li>C. Dickens's travels</li>
                    <li>D. entertainment</li>
                    <li>E. crime and the law</li>
                    <li>F. wealth</li>
                    <li>G. medicine</li>
                    <li>H. a woman's life</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 1 ---------- */}
            <h1 className="text-lg font-bold">Novels by Dickens</h1>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("25.")}</span>
              <span>{renderText("The Pickwick Papers")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="1">{renderText("25")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span>{renderText("Oliver Twist")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="2">{renderText("26")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span>{renderText("Nicholas Nickleby")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="3">{renderText("27")}</option>
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
              <span className="font-bold text-lg">{renderText("28.")}</span>
              {renderText("Martin Chuzzlewit")}
              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="4">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("Bleak House")}
              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="5">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 6 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("Little Dorrit")}
              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="6">{renderText("30")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
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
                    All Answers (21–30)
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
      <Listening2Pagination2020></Listening2Pagination2020>
    </div>
  );
};

export default Listening2Part32020;
