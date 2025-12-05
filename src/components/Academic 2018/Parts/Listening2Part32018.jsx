import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening2Pagination2018 from "../Pagination2018/Listening2Pagination2018";

const Listening2Part32018 = () => {
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
        "Section 3. You will hear a student called Russ consulting his tutor about a presentation he is preparing on nanotechnology, the study of materials on an extremely small scale.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },

    {
      speaker: "TUTOR",
      text: ["Ah... come in, Russ."],
    },

    {
      speaker: "RUSS",
      text: ["Thank you."],
    },

    {
      speaker: "TUTOR",
      text: [
        "Now you wanted to consult me about your class presentation on nanotechnology. You're due to give it next week, aren't you?",
      ],
    },

    {
      speaker: "RUSS",
      text: [
        "That's right, and I'm really struggling. I chose the topic because I didn't know much about it, and wanted to learn more. But now I've read so much about it, in a way there's too much to say. I could talk for much longer than the 20 minutes I've been allocated.",

        {
          text: "Should I assume the other students don't know much, and give them a kind of general introduction, or should I try and make them share my fascination with a particular aspect?",
          number: 21,
        },
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "You could do either, but you'll need to have it clear in your own mind.",
      ],
    },

    {
      speaker: "RUSS",
      text: ["Then I think I'll give an overview."],
    },

    {
      speaker: "TUTOR",
      text: [
        "OK, now one way of approaching this is to work through developments in chronological order.",
      ],
    },

    {
      speaker: "RUSS",
      text: ["Uh huh."],
    },

    {
      speaker: "TUTOR",
      text: [
        "On the other hand, you could talk about the numerous ways that nanotechnology is being applied.",
      ],
    },

    {
      speaker: "RUSS",
      text: [
        "You mean things like thin films on camera displays to make them water-repellent, and additives to make motorcycle helmets stronger and lighter.",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "Exactly. ",
        {
          text: "Or another way would be to focus on its impact in one particular area.",
          number: 22,
        },
        "Say medicine or space exploration.",
      ],
    },

    {
      speaker: "RUSS",
      text: [
        {
          text: "That would make it easier to focus. Perhaps I should do that.",
          number: 22,
        },
      ],
    },

    {
      speaker: "TUTOR",
      text: [{ text: "I think that would be a good idea.", number: 22 }],
    },

    {
      speaker: "RUSS",
      text: [
        "Right. How important is it to include slides in the presentation?",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "They aren't essential by any means, and there's a danger of tailoring what you say to fit whatever slides you can find.",
        "While it can be good to include slides, ",
        {
          text: "you could end up spending too long looking for suitable ones. You might find it better to leave them out.",
          number: 23,
        },
      ],
    },

    {
      speaker: "RUSS",
      text: [
        "I see. Another thing I was wondering about was how to start. I know presentations often begin with, first, I'm going to talk about this, and then I'll talk about that.",
        "But I thought about asking the audience what they know about nanotechnology.",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "That would be fine if you had an hour or two for the presentation, but you might find that you can't do anything with the answers you get.",
        "And it simply eats into the short time that's available.",
      ],
    },

    {
      speaker: "RUSS",
      text: [
        {
          text: "So maybe I should mention a particular way that nanotechnology is used to focus people's attention.",
          number: 24,
        },
      ],
    },

    {
      speaker: "TUTOR",
      text: [{ text: "That sounds sensible.", number: 24 }],
    },

    {
      speaker: "RUSS",
      text: [
        "What do you think I should do next? I really have to plan the presentation today and tomorrow.",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "Well, initially, I think you should ignore all the notes you've made. ",
        {
          text: "Take a small piece of paper and write a single short sentence that ties together the whole presentation.It can be something as simple as, nanotechnology is already improving our lives.Then start planning the content around that.",
          number: 25,
        },
        " You can always modify that sentence later if you need to.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "OK, now let's think about actually giving the presentation. You've only given one before, if I remember correctly, about an experiment you've been involved in.",
      ],
    },

    {
      speaker: "RUSS",
      text: ["That's right. It was pretty rubbish."],
    },

    {
      speaker: "TUTOR",
      text: [
        "Let's say it was better in some respects than in others.",
        {
          text: " With regard to the structure, I felt that you ended rather abruptly without rounding it off.",
          number: 26,
        },
        "Be careful not to do that in next week's presentation.",
      ],
    },

    {
      speaker: "RUSS",
      text: ["OK."],
    },

    {
      speaker: "TUTOR",
      text: [
        {
          text: "And you made very little eye contact with the audience, because you were looking down at your notes most of the time.",
          number: 27,
        },
        "You need to be looking at the audience and only occasionally glancing at your notes.",
        "Your body language was a little odd. Every time you showed a slide, you turned your back on the audience, so you could look at it.",

        {
          text: "You should have been looking at your laptop, and you kept scratching your head, so I found myself wondering when you were next going to do that, instead of listening to what you were saying.",
          number: 28,
        },
      ],
    },

    {
      speaker: "RUSS",
      text: [
        "Oh, dear. What did you think of the language? I knew that not everyone was familiar with the subject, so I tried to make it as simple as I could.",
      ],
    },

    {
      speaker: "TUTOR",
      text: [
        "Yes, that came across. ",
        {
          text: "You used a few words that are specific to the field, but you always explained what they meant, so the audience wouldn't have had any difficulty understanding.",
          number: 29,
        },
      ],
    },

    {
      speaker: "RUSS",
      text: ["Uh-huh."],
    },

    {
      speaker: "TUTOR",
      text: [
        "I must say the handouts you prepared were well thought out. ",
        {
          text: "They were a good summary of your presentation, which people would have been able to refer to later on.",
          number: 30,
        },
      ],
    },

    {
      speaker: "RUSS",
      text: ["Thank you."],
    },

    {
      speaker: "TUTOR",
      text: ["Well, I hope that helps you with next week's presentation."],
    },

    {
      speaker: "RUSS",
      text: ["Yes, it will. Thanks a lot."],
    },

    {
      speaker: "TUTOR",
      text: ["I'll look forward to seeing a big improvement then."],
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
    "Russ says that his difficulty in planning the presentation is due to",
    "Russ and his tutor agree that his approach in the presentation will be",
    "In connection with slides, the tutor advises Russ to",
    "They both agree that the best way for Russ to start his presentation is",
    "What does the tutor advise Russ to do next while preparing his presentation?",
  ];

  const options = [
    [
      "A. his lack of knowledge about the topic.",
      "B. his uncertainty about what he should try to achieve.",
      "C. the short time that he has for preparation.",
    ],

    [
      "A. to concentrate on how nanotechnology is used in one field.",
      "B. to follow the chronological development of nanotechnology.",
      "C. to show the range of applications of nanotechnology.",
    ],

    [
      "A. talk about things that he can find slides to illustrate.",
      "B. look for slides to illustrate the points he makes.",
      "C. consider omitting slides altogether.",
    ],

    [
      "A. to encourage the audience to talk.",
      "B. to explain what Russ intends to do.",
      "C. to provide an example.",
    ],

    [
      "A. summarise the main point he wants to make",
      "B. read the notes he has already made",
      "C. list the topics he wants to cover",
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
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "TUTOR") {
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
  // Section 3 – Updated Answers
  21: "B. his uncertainty about what he should try to achieve.",
  22: "A. to concentrate on how nanotechnology is used in one field.",
  23: "C. consider omitting slides altogether.",
  24: "C. to provide an example.",
  25: "A. summarise the main point he wants to make",

  // Questions 26–30
  26: "A",
  27: "C",
  28: "D",
  29: "G",
  30: "B",
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
                {renderText("Presentation on Nanotechnology")}
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
              {renderText("Questions 21-25")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Planning a presentation on nanotechnology")}
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

          {/* 2st section */}

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 26-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Level the map below")} <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-G")}</span>{" "}
                {renderText("next to Questions 26-30.")}
              </h3>
              <div className="flex items-center justify-center ">
                <div className="text-center border-2 border-black p-4 space-y-2">
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-lg font-bold text-center">
                      {renderText("Comments")}
                    </h1>
                    <li className="text-lg">
                      {renderText("A. lacked a conclusion")}
                    </li>
                    <li className="text-lg">
                      {renderText("B. useful in the future")}
                    </li>
                    <li className="text-lg">{renderText("C. not enough")}</li>
                    <li className="text-lg">
                      {renderText("D. sometimes distracting")}
                    </li>
                    <li className="text-lg">
                      {renderText("E. showed originality")}
                    </li>
                    <li className="text-lg">
                      {renderText("F. covered a wide range")}
                    </li>
                    <li className="text-lg">
                      {renderText("G. not too technical")}
                    </li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          {/* Stages in the experiment */}
          <div className="space-y-2">
            {/* ---------- Step 1 ---------- */}{" "}
            <h1 className="text-lg font-bold">
              {renderText("Aspects of Russ's previous presentation")}
            </h1>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span className="text-lg">{renderText("structure")}</span>

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
                  <option value="H">{renderText("H")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
            {/* ---------- Step 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span className="text-lg">{renderText("eye contact")}</span>

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
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
            {/* ---------- Step 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              <span className="text-lg">{renderText("body language")}</span>

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
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
            {/* ---------- Step 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              <span className="text-lg">{renderText("choice of words")}</span>

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
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
            {/* ---------- Step 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              <span className="text-lg">{renderText("handouts")}</span>

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
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
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
      <Listening2Pagination2018></Listening2Pagination2018>
      {/* <Listening2Pagination2020></Listening2Pagination2020> */}
    </div>
  );
};

export default Listening2Part32018;
