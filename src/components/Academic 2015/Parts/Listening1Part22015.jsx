import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";

const Listening1Part22015 = () => {
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
        "Section 2. You will hear a fitness manager of a leisure club talking to some new members.",
        "First, you have some time to look at questions 11 and 12.",
        "Now listen and answer questions 11 and 12.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "On behalf of LP clubs, I'd like to welcome you all here today.",
        "My name is Sandy Fisher, and I'm one of the fitness managers here.",
        "Before we start our tour of the club, I'll just run through some basic information about the facilities we have here, including recent improvements, and explain the types of membership available.",
        "Our greatest asset is probably our swimming pool, which at 25 meters isn't Olympic sized, but now we've expanded it to eight lanes, it's much wider.",
        {
          text: "This means there are rarely more than a couple of people at a time in each lane.",
          number: 12,
        },
        "Unfortunately, there isn't space for an outdoor pool here, but the glass roof on the swimming pool is partly retractable.",
        "Which means you can enjoy something of the open air experience on warmer days.",
        "Our recently refurbished fitness suite has all the latest exercise equipment, including 10 new running machines.",
        { text: "And a wide range of weight training machines.", number: 11 },
        "Each member is given full training in how to operate the equipment, and there is always a trainer on duty to offer help and advice.",
        "Although we do have adult only times after 6, and at certain times at weekends.",
        "Children are well catered for, older children continue to benefit from a wide range of tuition, anything from trampolining to yoga.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 13 to 20.",
        "Now listen and answer questions 13 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "One thing all our members appreciate about us is that we take very good care of them.",
        "This starts on day 1 with your personal assessment.",
        {
          text: "You are asked to fill in a questionnaire giving details of any health problems.",
          number: 13,
        },
        "One of our personal trainers will then go through this with you.",
        {
          text: "The trainer will then take you through the safety rules for using the equipment in the fitness suite.",
          number: 14,
        },
        "During your next exercise session, a personal trainer will work with you to make sure you understand these.",
        "It's very important to do this, because we really do want to avoid having any sports injuries.",
        "There's a lot more to looking after yourself than simply lifting weights.",
        {
          text: "At the end of the personal assessment, the trainer will draw up a plan, outlining what you should try to achieve within a 6 week period.",
          number: 15,
        },
        "This will then be reviewed at the end of the 6 weeks.",
        "Now, I'll just quickly run through the types of membership we have available.",
        {
          text: "All members must pay a joining fee of £90, in addition to the rates for the monthly membership fees.",
          number: 16,
        },
        {
          text: "Gold membership entitles you to free entry at all LP clubs.",
          number: 17,
        },
        "There are now LP clubs in all major cities and towns, so if you travel a lot this will be a great advantage.",
        "Individual gold membership costs £50 a month, and joint membership for you and your partner will cost £75.",
        {
          text: "Premier membership is for professional people whose work commitments make it difficult for them to use the club during the day.",
          number: 18,
        },
        "And so LP gives booking preferences to premier members at peak times.",
        "This means you'll find it easier to book the sessions at times that suit you.",
        {
          text: "Reciprocal arrangements with other LP clubs are available to Premier members.",
          number: 19,
        },
        "Premier membership is for individuals only, but you'll be sent passes for guests every month.",
        "The monthly fee is £65.",
        "You don't have to have any special clothes or equipment when you visit the club.",
        "We provide robes and hairdryers in the changing rooms, but it's very important to remember your photo card.",
        {
          text: "Because you won't be able to get in without it.",
          number: 20,
        },
        "For people who aren't working during the day.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 2.",
        "You now have half a minute to check your answers.",
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

  //  Marks show

  const correctAnswers = {
    // Questions 11 and 12 (Choose TWO: A and C)
    11: "A", // the gym (recently refurbished with 10 new running machines)
    12: "C", // the indoor pool (expanded to eight lanes, making it much wider)

    // Questions 13–20 (Notes completion)
    13: "health problems",
    14: "safety rules",
    15: "plan",
    16: "joining",
    17: "free entry",
    18: "peak",
    19: "guests",
    20: "photo card",
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
            <h1 className="text-xl font-bold">{renderText("    PART 2")}</h1>
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
                {renderText("Joining the leisure club")}
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
        <div className="p-4 max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11 and 12")}
          </h2>

          <p className="mb-2 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>

          <p className="mb-4">
            {renderText(
              "Which TWO facilities at the leisure club have recently been improved?"
            )}
          </p>

          <ul className="space-y-2 mb-10">
            {[
              "the gym",
              "the tracks",
              "the indoor pool",
              "the outdoor pool",
              "the sports training for children",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input type="checkbox" className="w-4 h-4" />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </li>
            ))}
          </ul>

          {/* ---------- Questions 13–20 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 13–20")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the notes below.")} <br />
            {renderText("Write NO MORE THAN TWO WORDS for each answer.")}
          </p>

          <div className="border p-5 rounded-lg bg-white space-y-5">
            <h3 className="font-bold text-lg">
              {renderText("Joining the leisure club")}
            </h3>

            <h4 className="font-semibold">
              {renderText("Personal Assessment")}
            </h4>

            {/* Q13 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("New members should describe any")}
              <button className="w-7 h-7 rounded-full border">13</button>
              <input
                type="text"
                value={userAnswers[13] || ""}
                onChange={(e) => handleInputChange(13, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* Q14 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("The")}
              <button className="w-7 h-7 rounded-full border">14</button>
              <input
                type="text"
                value={userAnswers[14] || ""}
                onChange={(e) => handleInputChange(14, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText(
                "will be explained to you before you use the equipment."
              )}
            </p>

            {/* Q15 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("You will be given a six-week")}
              <button className="w-7 h-7 rounded-full border">15</button>
              <input
                type="text"
                value={userAnswers[15] || ""}
                onChange={(e) => handleInputChange(15, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            <h4 className="font-semibold mt-4">
              {renderText("Types of membership")}
            </h4>

            {/* Q16 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("There is a compulsory £90")}
              <button className="w-7 h-7 rounded-full border">16</button>
              <input
                type="text"
                value={userAnswers[16] || ""}
                onChange={(e) => handleInputChange(16, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("fee for members.")}
            </p>

            {/* Q17 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Gold members are given")}
              <button className="w-7 h-7 rounded-full border">17</button>
              <input
                type="text"
                value={userAnswers[17] || ""}
                onChange={(e) => handleInputChange(17, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("to all the LP clubs.")}
            </p>

            {/* Q18 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Premier members are given priority during")}
              <button className="w-7 h-7 rounded-full border">18</button>
              <input
                type="text"
                value={userAnswers[18] || ""}
                onChange={(e) => handleInputChange(18, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("hours.")}
            </p>

            {/* Q19 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Premier members can bring some")}
              <button className="w-7 h-7 rounded-full border">19</button>
              <input
                type="text"
                value={userAnswers[19] || ""}
                onChange={(e) => handleInputChange(19, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("every month.")}
            </p>

            {/* Q20 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Members should always take their")}
              <button className="w-7 h-7 rounded-full border">20</button>
              <input
                type="text"
                value={userAnswers[20] || ""}
                onChange={(e) => handleInputChange(20, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("with them.")}
            </p>
          </div>
        </div>
      </div>
      <Listening1Pagination2015></Listening1Pagination2015>
    </div>
  );
};

export default Listening1Part22015;
