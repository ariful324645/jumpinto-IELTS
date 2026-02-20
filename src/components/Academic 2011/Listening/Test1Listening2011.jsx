import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2011 from "../Pagination 2011/Listening1Pagination2011";

const Test1Listening2011 = () => {
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
      "Section 1, you will hear a conversation between two friends called George and Nina about a summer music festival.",
      "First, you have some time to look at questions 1 and 2.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "NINA",
    text: ["Hi, George. Glad you're back. Loads of people have phoned you."],
  },
  {
    speaker: "GEORGE",
    text: ["Really?"],
  },
  {
    speaker: "NINA",
    text: ["I felt just like your secretary."],
  },
  {
    speaker: "GEORGE",
    text: [
      "Sorry. I went into the library this afternoon to have a look at a newspaper, and I came across something really interesting.",
    ],
  },
  {
    speaker: "NINA",
    text: ["What? A book?"],
  },
  {
    speaker: "GEORGE",
    text: [
      "No, a brochure from a summer festival, mainly Spanish music. Look, I've got it here.",
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "George says that he found a brochure from a festival, so b has been circled as the answer.",
      "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully and answer questions 1 and 2.",
    ],
  },
  {
    speaker: "NINA",
    text: ["Hi, George. Glad you're back. Loads of people have phoned you."],
  },
  {
    speaker: "GEORGE",
    text: [
      "Really?",
      "Sorry. I went into the library this afternoon to have a look at a newspaper, and I came across something really interesting.",
    ],
  },
  {
    speaker: "NINA",
    text: ["I felt just like your secretary.", "What? A book?"],
  },
  {
    speaker: "GEORGE",
    text: [
      "No, a brochure from a summer festival, mainly Spanish music. Look, I've got it here.",
      {
        text: "They're really good. They had a video with all the highlights of the festival at a stand in the lobby to the library. So I heard them. They play fantastic instruments, drums and flutes and old kinds of guitars. I've never heard anything like it before.",
        number: 1,
      },
      "The only problem is there aren't any cheap seats. It's all one price.",
      {
        text: "Yeah, though, I think that if you sit at the back, you can actually hear the whole thing better.",
        number: 2,
      },
    ],
  },
  {
    speaker: "NINA",
    text: [
      "Spanish music. I really love the guitar. Hmm. Let's have a look. So what's this group 'Guitarrini'?",
      "Sounds great.",
      "Hmm. Yes, anyway we can decide when we get there.",
    ],
  },
  {
    speaker: "GEORGE",
    text: ["OK, shall we go then? Spoil ourselves?"],
  },
  {
    speaker: "NINA",
    text: ["Yes, let's."],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the conversation, you have some time to look at questions 3 to 10.",
      "Now listen and answer questions 3 to 10.",
    ],
  },
  {
    speaker: "NINA",
    text: ["So will you fill in the form or shall I?"],
  },
  {
    speaker: "GEORGE",
    text: [
      "I'll do it. Name: George O'Neill. Address: 48 North Avenue, Westsea.",
      {
        text: "Do you remember our new postcode? Still can't remember it.",
        number: 3,
      },
    ],
  },
  {
    speaker: "NINA",
    text: [
      "Hmm. Just a minute, I've got it written down here. WS62YH.",
      {
        text: "Do you need the phone too?",
        number: 4,
      },
    ],
  },
  {
    speaker: "GEORGE",
    text: [
      "Please, I'm really bad at numbers. 01674553242.",
      {
        text: "So, let's book two tickets for Guitarrini.",
        number: 5,
      },
      "OK, if you're sure £7.50 each is all right. How do you feel about the singer?",
    ],
  },
  {
    speaker: "NINA",
    text: [
      "Hmm. I haven't quite decided, but I've noticed something on the booking form that might just persuade me.",
    ],
  },
  {
    speaker: "GEORGE",
    text: ["What's that then?"],
  },
  {
    speaker: "NINA",
    text: [
      "Yes, look here. Sunday, 17th of June. Singer, ticket £6.00 includes drinks in the garden.",
      {
        text: "Sounds like a bargain to me.",
        number: 6,
      },
    ],
  },
  {
    speaker: "GEORGE",
    text: [
      "OK, let's book two tickets for that. So what else? I'm feeling quite keen now. How about the pianist on the 22nd of June?",
      {
        text: "Anna Ventura? I've just remembered that's my evening class night.",
        number: 7,
      },
    ],
  },
  {
    speaker: "NINA",
    text: [
      "Hmm. That's OK. I'll just have to go on my own. But we can go to the Spanish dance and guitar concert together, can't we?",
    ],
  },
  {
    speaker: "GEORGE",
    text: [
      "Yes, I'm sure Tom and Kieran would enjoy that too. Good heavens, £10.50 a ticket.",
      {
        text: "I can see we're going to have to go without food for the rest of the week. We'll need to book four.",
        number: 8,
      },
    ],
  },
  {
    speaker: "NINA",
    text: [
      "Uh. Wish we were students. Look, children, students and senior citizens get a 50% discount on everything.",
      {
        text: "If only.",
        number: 9,
      },
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "That is the end of section 1.",
      "You now have half a minute to check your answers.",
    ],
  },
];

  // different option
const questions = [
  "In the lobby of the library George saw",
  "George wants to sit at the back so they can",
];

const options = [
  [
    "A. a group playing music.",
    "B. a display of instruments.",
    "C. a video about the festival.",
  ],
  ["A. see well.", "B. hear clearly.", "C. pay less."],
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
      const answerKey = qIndex + 1;
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

      // Erica: female
      if (speaker === "NINA") {
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
  1: "C. a video about the festival.",
  2: "B. hear clearly.",
  3: "48 North Avenue",
  4: "WS62YH",
  5: "01674553242",
  6: "drinks",
  7: "Pianist",
  8: "10.50",
  9: "4",
  10: "50%",
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
                {renderText("Planning a Trip to a Summer Festival")}
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
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 1-10")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("   Matthews Island Holidays")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 1;

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
          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("SUMMER MUSIC FESTIVAL BOOKING FORM")}
            </h2>

            {/* Name & Address */}
            <div className="mb-5">
              <div className="flex items-center mb-2">
                <span className="mr-2">{renderText("NAME:")}</span>
                <span className="font-bold">George O'Neill</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">{renderText("ADDRESS:")}</span>{" "}
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
                  className="w-[200px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
                <span>, Westsea</span>
              </div>

              <div className="flex items-center mb-2">
                <span className="mr-2">{renderText("POSTCODE:")}</span>{" "}
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
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">{renderText("TELEPHONE:")}</span>{" "}
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
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="w-[150px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
              </div>
            </div>

            {/* Ticket Table */}
            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Date")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Event")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Price per ticket")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("No. of tickets")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">5 June</td>
                  <td className="border border-gray-400 p-2">
                    Instrumental group - Guitarrini
                  </td>
                  <td className="border border-gray-400 p-2">£7.50</td>
                  <td className="border border-gray-400 p-2">2</td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">17 June</td>
                  <td className="border border-gray-400 p-2">
                    Singer (price includes
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
                      value={userAnswers[6] || ""}
                      onChange={(e) => handleInputChange(6, e.target.value)}
                      className="w-[200px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    in the garden)
                  </td>
                  <td className="border border-gray-400 p-2">£6</td>
                  <td className="border border-gray-400 p-2">2</td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">22 June</td>
                  <td className="border border-gray-400 p-2">
                    {" "}
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
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="w-[200px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    (Anna Ventura)
                  </td>
                  <td className="border border-gray-400 p-2">£7.00</td>
                  <td className="border border-gray-400 p-2">1</td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">23 June</td>
                  <td className="border border-gray-400 p-2">
                    Spanish Dance & Guitar Concert
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
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
                    £
                    <input
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    <button
                      onClick={() => toggleButton(9)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[9]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      9
                    </button>
                    <input
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="mt-3 text-lg">
              {renderText("NB: Children / Students / Senior Citizens have")}
              <button
                onClick={() => toggleButton(10)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[10]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                10
              </button>
              <input
                value={userAnswers[10] || ""}
                onChange={(e) => handleInputChange(10, e.target.value)}
                className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                type="text"
              />
              {renderText("discount on all tickets.")}
            </p>
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
<Listening1Pagination2011></Listening1Pagination2011>
    </div>
  );
};

export default Test1Listening2011;
