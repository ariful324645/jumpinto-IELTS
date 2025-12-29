import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";

const Listening1Part32015 = () => {
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
        "Section 3. You will hear a student called John talking to a professor about a design competition he is entering.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        "Um, hello professor. I'm John Wishart.",
        "I'm working on my entry for the global design competition.",
        "My tutor said you might be able to help me with it.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "Oh, yes. I got a copy of your drawings.",
        "Come in and tell me about it.",
        "What sort of competition is it?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        "Well, it's an international design competition, and we have to come up with a new design for a typical domestic kitchen appliance.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "I see. And are there any special conditions?",
        "Does it have to save energy for example?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        "Actually that was the focus in last year's competition.",
        "This year is different.",
        {
          text: "We have to adopt an innovative approach to existing technology, using it in a way that hasn't been thought of before.",
          number: 21,
        },
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "I see, that sounds tricky.",
        "And what kitchen appliance have you chosen?",
      ],
    },
    {
      speaker: "JOHN",
      text: ["Well, I decided to choose the dishwasher."],
    },
    {
      speaker: "PROFESSOR",
      text: ["Interesting. What made you choose that?"],
    },
    {
      speaker: "JOHN",
      text: [
        "Well, they're an everyday kitchen appliance in most Australian houses,",
        {
          text: "but they're all pretty boring, and almost identical to each other. I think some people will be prepared to pay a little extra for something that looks different.",
          number: 22,
        },
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "It's a nice idea.",
        "I see you've called your design 'The Rockpool'.",
        "Why is that?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        "Basically because it looks like the rock pools you find on a beach.",
        "The top is made of glass, so that you can look down into it.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "And there's a stone at the bottom.",
        "Is that just for decoration?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        {
          text: "Actually it does have a function. Instead of pushing a button, you turn the stone.",
          number: 23,
        },
      ],
    },
    {
      speaker: "PROFESSOR",
      text: ["So it's really just a novel way of starting the dishwasher."],
    },
    {
      speaker: "JOHN",
      text: ["That's right."],
    },
    {
      speaker: "PROFESSOR",
      text: ["It's a really nice design, but what makes it innovative?"],
    },
    {
      speaker: "JOHN",
      text: ["Well, I decided to make a dishwasher that uses carbon dioxide."],
    },
    {
      speaker: "PROFESSOR",
      text: ["In place of water and detergent?", "How will you manage that?"],
    },
    {
      speaker: "JOHN",
      text: [
        "The idea is to pressurize the carbon dioxide so that it becomes a liquid.",
        "The fluid is then released into the dishwasher where it cleans the dishes all by itself.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "Sounds like a brilliant idea.",
        "Your system will totally do away with the need for strong detergents.",
        "So what happens once the dishes are clean?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        "Well, to allow them to dry, the liquid carbon dioxide and the waste materials all go to an area called the holding chamber.",
        {
          text: "That's where the liquid is depressurized, and so it reverts to a gas.",
          number: 24,
        },
        "Then the oil and grease are separated out and sent to the waste system.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "It sounds like you've thought it all out very thoroughly.",
        "So what happens to the carbon dioxide once the process is complete?",
        "Not wasted, I hope.",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        {
          text: "Actually, that's where the real savings are made. The carbon dioxide is sent back to the cylinder, and can be used again and again.",
          number: 25,
        },
      ],
    },
    {
      speaker: "PROFESSOR",
      text: ["What a terrific idea.", "Do you think it will ever be built?"],
    },
    {
      speaker: "JOHN",
      text: ["Probably not, but that's OK."],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "Well, I'm sure a lot of positive things will come out of your design.",
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
      speaker: "PROFESSOR",
      text: [
        "Now you seem to have thought about everything, so what exactly did you need me to help you with?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        {
          text: "Well, my design has made it to the final stage of the competition, and in a few months' time, I have to give a presentation.",
          number: 26,
        },
        "And that's the part I was hoping you could help me with.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "Right, well that should be easy enough.",
        "What have you managed to do so far?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        "Well, I've got detailed drawings to show how it will work,",
        "and I've also written a 500-word paper on it.",
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        {
          text: "I see. Well, if you want to stand a good chance of winning, you really need a model of the machine.",
          number: 27,
        },
      ],
    },
    {
      speaker: "JOHN",
      text: ["Yes, I thought I might, but I'm having a few problems."],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "What's the main difficulty so far?",
        "Let me guess, is it the materials?",
      ],
    },
    {
      speaker: "JOHN",
      text: [
        {
          text: "Yes, I want it to look professional, but everything that's top quality is also very expensive.",
          number: 28,
        },
      ],
    },
    {
      speaker: "PROFESSOR",
      text: [
        "Look, projects like this are very important to us.",
        "They really help lift our profile.",
        {
          text: "So why don't you talk to the university about a grant?",
          number: 29,
        },
        "I can help you fill out the application forms if you like.",
      ],
    },
    {
      speaker: "JOHN",
      text: ["Oh, that would be great."],
    },
    {
      speaker: "PROFESSOR",
      text: [
        {
          text: "You'd better show me this paper you've written as well. For a global competition such as this, you need to make sure the technical details you've given are accurate and thorough.",
          number: 30,
        },
      ],
    },
    {
      speaker: "JOHN",
      text: ["Oh, that would be a great help."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "According to the manager, what do most people like about the job of kitchen assistant?",
    "The manager is concerned about some of the new staff's",
    "The manager says that the day is likely to be busy for kitchen staff because",
    "Only kitchen staff who are 18 or older are allowed to use",
    "What is one reason the job of kitchen assistant can be stressful?",
    "What is another reason the job of kitchen assistant can be stressful?",
  ];

  const options = [
    [
      "A. the variety of work",
      "B. the friendly atmosphere",
      "C. the opportunities for promotion",
    ],

    ["A. jewellery.", "B. hair styles.", "C. shoes."],

    [
      "A. it is a public holiday.",
      "B. the head chef is absent.",
      "C. the restaurant is almost fully booked.",
    ],

    [
      "A. the waste disposal unit.",
      "B. the electric mixer.",
      "C. the meat slicer.",
    ],
    [
      "A. They have to follow orders immediately.",
      "B. The kitchen gets very hot.",
      "C. They may not be able to take a break.",
    ],
    [
      "A. They have to do overtime.",
      "B. The work is physically demanding.",
      "C. They have to clean customer areas.",
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
    21: "C",
    22: "A",
    23: "C",
    24: "B",
    25: "C",

    // Questions 26–30
    26: "presentation",
    27: "model",
    28: "images",
    29: "grant",
    30: "technical",
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
    localStorage.setItem("/listening1Part32015", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part32015");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part32015");
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
                {renderText("Global Design Competition")}
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
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 21–25 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–25")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          <h3 className="font-bold mb-4">
            {renderText("Global Design Competition")}
          </h3>

          {/* Q21 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              21.{" "}
              {renderText("Students entering the design competition have to")}
            </p>
            {[
              "produce an energy-efficient design.",
              "adapt an existing energy-saving appliance.",
              "develop a new use for current technology.",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q21"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(21, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* Q22 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              22.{" "}
              {renderText(
                "John chose a dishwasher because he wanted to make dishwashers"
              )}
            </p>
            {["more appealing.", "more common.", "more economical."].map(
              (item, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer mb-1"
                >
                  <input
                    type="radio"
                    name="q22"
                    value={String.fromCharCode(65 + index)}
                    onChange={() =>
                      handleInputChange(22, String.fromCharCode(65 + index))
                    }
                  />
                  <span className="font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{renderText(item)}</span>
                </label>
              )
            )}
          </div>

          {/* Q23 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              23. {renderText("The stone in John's 'Rockpool' design is used")}
            </p>
            {[
              "for decoration.",
              "to switch it on.",
              "to stop water escaping.",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q23"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(23, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* Q24 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              24. {renderText("In the holding chamber, the carbon dioxide")}
            </p>
            {[
              "changes back to a gas.",
              "dries the dishes.",
              "is allowed to cool.",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q24"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(24, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* Q25 */}
          <div className="mb-10">
            <p className="font-semibold mb-2">
              25.{" "}
              {renderText(
                "At the end of the cleaning process, the carbon dioxide"
              )}
            </p>
            {[
              "is released into the air.",
              "is disposed of with the waste.",
              "is collected ready to be re-used.",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q25"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(25, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* ---------- Questions 26–30 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 26–30")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the notes below.")} <br />
            {renderText("Write ONE WORD ONLY for each answer.")}
          </p>

          <div className="border p-5 rounded-lg bg-white space-y-4">
            <p className="flex items-center gap-2">
              {renderText("John needs help preparing for his")}
              <span className="font-semibold">26</span>
              <input
                type="text"
                value={userAnswers[26] || ""}
                onChange={(e) => handleInputChange(26, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            <p className="flex items-center gap-2">
              {renderText("The professor advises John to make a")}
              <span className="font-semibold">27</span>
              <input
                type="text"
                value={userAnswers[27] || ""}
                onChange={(e) => handleInputChange(27, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("of his design.")}
            </p>

            <p className="flex items-center gap-2">
              {renderText("John's main problem is getting good quality")}
              <span className="font-semibold">28</span>
              <input
                type="text"
                value={userAnswers[28] || ""}
                onChange={(e) => handleInputChange(28, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            <p className="flex items-center gap-2">
              {renderText("The professor suggests John apply for a")}
              <span className="font-semibold">29</span>
              <input
                type="text"
                value={userAnswers[29] || ""}
                onChange={(e) => handleInputChange(29, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            <p className="flex items-center gap-2">
              {renderText("The professor will check the")}
              <span className="font-semibold">30</span>
              <input
                type="text"
                value={userAnswers[30] || ""}
                onChange={(e) => handleInputChange(30, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("information in John's written report.")}
            </p>
          </div>
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
      <Listening1Pagination2015></Listening1Pagination2015>
    </div>
  );
};

export default Listening1Part32015;
