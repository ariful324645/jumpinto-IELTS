import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2011 from "../Pagination 2011/Listening3Pagination2011";


const Test3Listening2011 = () => {
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
        "Section 1, you will hear an estate agent talking to a customer who wants to rent a house.",
        "First, you have some time to look at questions 1 to 8.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Good morning. How can I help you?"],
    },
    {
      speaker: "MAN",
      text: ["Hello, I'm interested in renting a house somewhere in the town."],
    },
    {
      speaker: "WOMAN",
      text: ["Right. Uh. Could I have your name please?"],
    },
    {
      speaker: "MAN",
      text: ["Yes, it's Steven Godfrey."],
    },
    {
      speaker: "WOMAN",
      text: ["And tell me how many bedrooms you're looking for."],
    },
    {
      speaker: "MAN",
      text: [
        "Well, we'd need four, because I'm going to share the house with three friends.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The number of bedrooms needed is four, so 4 has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 8.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Good morning. How can I help you?"],
    },
    {
      speaker: "MAN",
      text: ["Hello, I'm interested in renting a house somewhere in the town."],
    },
    {
      speaker: "WOMAN",
      text: ["Right, uh, could I have your name please?"],
    },
    {
      speaker: "MAN",
      text: ["Yes, it's Steven Godfrey."],
    },
    {
      speaker: "WOMAN",
      text: ["And tell me how many bedrooms you're looking for."],
    },
    {
      speaker: "MAN",
      text: [
        "Well, we'd need four, because I'm going to share the house with 3 friends.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, there are several of that size on our books. They mostly belong to families who are working abroad at the moment. What about the location?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "It'd be nice to be central.",
          number: 1,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Uh. That might be difficult, as most houses of that size are in the suburbs. Still, there are a few. What's your upper limit for the rent?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "We'd like something around £500 a month, but we could go up to £600 if we have to.",
          number: 2,
        },
        "But we can't go beyond that.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Do you know how long you want to rent the house for? The minimum let is six months as you probably realize.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "We're at college here for two years, and we don't wanna have to move during that time if we can avoid it.",
          number: 3,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right, and how soon do you want to move in? All our lets start on the 1st of the month.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Well, as soon as possible really, so that means September 1st."],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, let me have a look at what we've got. Uh. We have photographs of all the houses on our books, so you can get an idea of what they're like.",
        "There's this one in Oakington Avenue, at £550 a month, combined living room and dining room with a separate kitchen.",
        {
          text: " It doesn't have a garage, though you can park in the road.",
          number: 4,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["We'd prefer to have one if possible."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right, then have a look at this house in Mead Street. It's got a very large living room and kitchen, bathroom, cloakroom.",
        { text: "Oh, and there's a big garden.", number: 5 },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "I don't think we could cope with that to be honest. We'll be too busy to look after it.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK. Then there's this older house in Hamilton Road. Living room, kitchen, diner, and it has a study.",
        { text: "Living room, kitchen, diner, and it has a study.", number: 6 },
        "Uh. 550 a month.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That looks rather nice, but whereabouts in Hamilton road?",
        { text: "Oh, that'll be very noisy", number: 7 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, it's pretty lively, but some people like it though. Well, what about this house in Devon Close?",
        {
          text: "It's got a living room, dining room, and small kitchen, and it's 595 a month£595",
          number: 8,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["That looks lovely."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 9 and 10.",
        "Now listen and answer questions 9 and 10.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Why is that part of town so popular?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, there's a big scheme to improve the district, and it'll soon have the best facilities for miles around.",
        {
          text: "In fact, the swimming pool already opened, ahead of schedule, and it's attracting a lot of people.",
          number: 10,
        },
        "he local people are trying to get a new cinema added to the scheme.",
      ],
    },
    {
      speaker: "MAN",
      text: ["What about cinemas? Are there any in the area?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "The only one closed down last year, and it's now in the process of being converted into a film museum.",
        { text: "Oh, that's due to start next year", number: 9 },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Well, it sounds an interesting area to live in. Hmm. Could I go and see the house please?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, of course."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1. You now have half a minute to check your answers.",
      ],
    },
  ];

  const questions = [
    "Which facility in the district of Devon Close is open to the public at the moment?",
    "Which other facility in the district of Devon Close is open to the public at the moment?",
  ];

  const options = [
    ["A. Museum.", "B. Concert Hall.", "C. a Cinema"],
    ["A. Sports Centre.", "B. Swimming Pool.", "C. Library."],
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
      const answerKey = qIndex + 9;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };
  // different option

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

      // Erica: female
      if (speaker === "WOMAN") {
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
    1: "central",
    2: "600",
    3: "two years",
    4: "garage",
    5: "garden",
    6: "study",
    7: "noisy",
    8: "595",
    9: "B. Concert Hall.",
    10:"C. Library.",
  };

  // const [userAnswers, setUserAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState({
    "9-10": [], // initialize empty array
  });

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
    localStorage.setItem("/listening1Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22020");
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
            <h1 className="text-xl font-bold">{renderText("    PART 1")}</h1>
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
                {renderText("Looking for a Rental House in the Town")}
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
          {/* box*/}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–3")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("NO MORE THAN THREE WORDS AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ----------  Box ---------- */}
          <div className="border p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Rented Properties Customer's Requirements")}
            </h1>

            {/* Name */}
            <p className="text-lg">{renderText("Name: Steven Godfrey")}</p>

            {/* Example: No. of bedrooms */}
            <p className="text-lg">
              {renderText("(Example) No. of bedrooms:")}
            </p>

            {/* Preferred location */}
            <p className="text-lg">
              {renderText("Preferred location: in the")}
              <button
                onClick={() => toggleButton(1)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[1]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                1
              </button>
              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("area of town")}
            </p>

            {/* Maximum monthly rent */}
            <p className="text-lg">
              {renderText("Maximum monthly rent: £")}
              <button
                onClick={() => toggleButton(2)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[2]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                2
              </button>
              <input
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Length of let required */}
            <p className="text-lg">
              {renderText("Length of let required:")}
              <button
                onClick={() => toggleButton(3)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[3]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                3
              </button>
              <input
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Starting date */}
            <p className="text-lg">
              {renderText("Starting:")}

              {renderText("September 1st")}
            </p>
          </div>

          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Rented Houses Table")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br />
              {renderText("Write ONE WORD AND/OR A NUMBER for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Address")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Rooms")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Monthly rent")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Problem")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Oakington Avenue */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Oakington Avenue")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("living/dining room, separate kitchen")}
                  </td>
                  <td className="border border-gray-400 p-2">£550</td>
                  <td className="border border-gray-400 p-2">
                    no{" "}
                    <button
                      onClick={() => toggleButton(4)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[4]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      4
                    </button>
                    <input
                      type="text"
                      value={userAnswers[4] || ""}
                      onChange={(e) => handleInputChange(4, e.target.value)}
                      className="mx-2 w-20 border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* Mead Street */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Mead Street")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText(
                      "large living room and kitchen, bathroom and a cloakroom",
                    )}
                  </td>
                  <td className="border border-gray-400 p-2">£580</td>
                  <td className="border border-gray-400 p-2">
                    the{" "}
                    <button
                      onClick={() => toggleButton(5)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[5]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      5
                    </button>
                    <input
                      type="text"
                      value={userAnswers[5] || ""}
                      onChange={(e) => handleInputChange(5, e.target.value)}
                      className="mx-2 w-20 border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />{" "}
                    is too large
                  </td>
                </tr>

                {/* Hamilton Road */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Hamilton Road")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    living room, kitchen-diner, and a{" "}
                    <button
                      onClick={() => toggleButton(6)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[6]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      6
                    </button>
                    <input
                      type="text"
                      value={userAnswers[6] || ""}
                      onChange={(e) => handleInputChange(6, e.target.value)}
                      className="mx-2 w-20 border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">£550</td>
                  <td className="border border-gray-400 p-2">
                    too{" "}
                    <button
                      onClick={() => toggleButton(7)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[7]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      7
                    </button>
                    <input
                      type="text"
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="mx-2 w-20 border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* Devon Close */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Devon Close")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("living room, dining room, small kitchen")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    £
                    <button
                      onClick={() => toggleButton(8)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[8]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      8
                    </button>
                    <input
                      type="text"
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="mx-2 w-20 border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("no")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 9-10")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("   Matthews Island Holidays")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 9;

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
                    All Answers (1-10)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
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
     
<Listening3Pagination2011></Listening3Pagination2011>
    </div>
  );
};

export default Test3Listening2011;
