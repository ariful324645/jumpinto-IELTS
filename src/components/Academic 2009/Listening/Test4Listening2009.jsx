import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening4Pagination2009 from "../Pagination 2009/Listening4Pagination2009";

const Test4Listening2009 = () => {
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
      "Section 1, you will hear a student talking to a housing officer about living with a homestay family.",
      "First, you have some time to look at questions 1 to 6.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "OFFICER",
    text: ["Yes, what can I do for you?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "My friend is in homestay, and she really enjoys it.",
      "So I'd like to join a family as well.",
    ],
  },
  {
    speaker: "OFFICER",
    text: ["OK, so let me get some details. What's your name?"],
  },
  {
    speaker: "STUDENT",
    text: ["My name is Keiko Yuichini."],
  },
  {
    speaker: "OFFICER",
    text: ["Could you spell your family name for me?"],
  },
  {
    speaker: "STUDENT",
    text: ["It's Yuichini. That's YUICHINI."],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "The student's surname is Yuichini. So, Yuichini has been written on the form.",
      "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully, and answer questions 1 to 6.",
    ],
  },
  {
    speaker: "OFFICER",
    text: ["Yes, what can I do for you?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "My friend is in homestay, and she really enjoys it.",
      "So I'd like to join a family as well.",
    ],
  },
  {
    speaker: "OFFICER",
    text: ["OK, so let me get some details. What's your name?"],
  },
  {
    speaker: "STUDENT",
    text: ["My name is Keiko Yuichini."],
  },
  {
    speaker: "OFFICER",
    text: ["Could you spell your family name for me?"],
  },
  {
    speaker: "STUDENT",
    text: ["It's Yuichini. That's YUICHINI."],
  },
  {
    speaker: "OFFICER",
    text: ["And your first name?"],
  },
  {
    speaker: "STUDENT",
    text: ["It's Keiko.", { text: "Keiko", number: 1 }],
  },
  {
    speaker: "OFFICER",
    text: [
      "That's Keiko Yuichini... OK... And you're female, and your nationality?",
    ],
  },
  {
    speaker: "STUDENT",
    text: ["I'm Japanese."],
  },
  {
    speaker: "OFFICER",
    text: ["Right. And could I see your passport please?"],
  },
  {
    speaker: "STUDENT",
    text: ["Here it is."],
  },
  {
    speaker: "OFFICER",
    text: ["OK, your passport number is JO6337, and you're how old?"],
  },
  {
    speaker: "STUDENT",
    text: ["I'm 28 years old.", { text: "28", number: 2 }],
  },
  {
    speaker: "OFFICER",
    text: ["Now you live at one of the colleges, which one?"],
  },
  {
    speaker: "STUDENT",
    text: ["Willow College, um, room 21C."],
  },
  {
    speaker: "OFFICER",
    text: [
      "Right, 21C Willow College. And how long are you planning on staying with homestay?",
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "About four months, longer if I like it.",
      { text: "about four months", number: 3 },
    ],
  },
  {
    speaker: "OFFICER",
    text: ["And what course are you enrolled in?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "Well, I've enrolled for 20 weeks in the advanced English studies, because I need help with my writing, and I'm nearly at the end of my first 5 week course.",
      { text: "advanced English studies", number: 4 },
    ],
  },
  {
    speaker: "OFFICER",
    text: [
      "Do you have any preference for a family with children or without children?",
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "I prefer, I mean, I like young children, but I'd like to be with older people.",
      { text: "older people", number: 5 },
    ],
  },
  {
    speaker: "OFFICER",
    text: ["And what about pets?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "I am a veterinarian, so that's fine.",
      { text: "the more the better", number: 6 },
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
      "Now listen and answer questions 7 to 10.",
    ],
  },
  {
    speaker: "OFFICER",
    text: [
      "All right, now what about you? Are you a vegetarian, or do you have any special food requirements?",
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "No, I am not a vegetarian, but I don't eat a lot of meat. I really like seafood.",
      { text: "seafood", number: 7 },
    ],
  },
  {
    speaker: "OFFICER",
    text: ["And what are your hobbies?"],
  },
  {
    speaker: "STUDENT",
    text: ["I like reading and going to the movies."],
  },
  {
    speaker: "OFFICER",
    text: ["Do you play any sports?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "Yes, I joined the handball team. But I didn't like that, so I stopped playing. Now I play tennis on the weekend with my friends.",
      { text: "tennis", number: 8 },
    ],
  },
  {
    speaker: "OFFICER",
    text: [
      "All right, let's see. Name, age, uh, now the location. Are you familiar with the public transport system?",
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "No, I'm not really, because I have been living on campus. I've been to the city a few times on the bus, but they are always late.",
    ],
  },
  {
    speaker: "OFFICER",
    text: ["What about the trains?"],
  },
  {
    speaker: "STUDENT",
    text: ["I like catching the train.", { text: "trains", number: 9 }],
  },
  {
    speaker: "OFFICER",
    text: [
      "Now, let me go check on the computer and see who I've got. Um. Listen, leave it with me. I'll check my records, and I'll give you details this afternoon.",
      { text: "details this afternoon", number: 10 },
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Thank you for helping me."],
  },
  {
    speaker: "OFFICER",
    text: ["It's a pleasure. Bye."],
  },
  {
    speaker: "STUDENT",
    text: ["Bye."],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "That is the end of section 1. You now have half a minute to check your answers.",
    ],
  },
];



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
      if (speaker === "STUDENT") {
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
  1: "Keiko",
  2: "JO6337",
  3: "about four months",
  4: "advanced English studies",
  5: "older people",
  6: "the more the better",
  7: "seafood",
  8: "tennis",
  9: "trains",
  10: "details this afternoon",
};
``;




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
                {renderText("Keiko's Homestay Arrangement")}
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
            {renderText("Questions 1–10")}
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
              {renderText("HOMESTAY APPLICATION")}
            </h1>

            {/* Example Surname */}
            <p className="text-lg">
              {renderText("(Example) Surname:")}
              <span className="mx-2 font-semibold">Yuichini</span>
            </p>

            {/* First Name */}
            <p className="text-lg">
              {renderText("First name:")}
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
            </p>

            {/* Sex */}
            <p className="text-lg">{renderText("Sex: female")}</p>

            {/* Nationality */}
            <p className="text-lg">{renderText("Nationality: Japanese")}</p>

            {/* Passport number */}
            <p className="text-lg">
              {renderText("Passport number:")}
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

            {/* Age */}
            <p className="text-lg">{renderText("Age: 28 years")}</p>

            {/* Present Address */}
            <p className="text-lg">
              {renderText("Present address: Room 21C, Willow College")}
            </p>

            {/* Length of Homestay */}
            <p className="text-lg">
              {renderText("Length of homestay: approx")}
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

            {/* Course Enrolled */}
            <p className="text-lg">
              {renderText("Course enrolled in:")}
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
                className="border rounded-md px-2 py-1 w-64"
              />
            </p>

            {/* Family Preferences */}
            <p className="text-lg">
              {renderText("Family preferences: no")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("no objection to")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Questions 7-10 */}
            <h2 className="text-xl font-semibold">
              {renderText("Questions 7-10")}
            </h2>
            <p className="text-lg">
              {renderText("Answer the questions below.")}
            </p>
            <p className="text-lg">
              {renderText("Write NO MORE THAN TWO WORDS for each answer.")}
            </p>

            {/* Question 7 */}
            <p className="text-lg">
              {renderText("What does the student particularly like to eat?")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Question 8 */}
            <p className="text-lg">
              {renderText("What sport does the student play?")}
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
                value={userAnswers[8] || ""}
                onChange={(e) => handleInputChange(8, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Question 9 */}
            <p className="text-lg">
              {renderText("What mode of transport does the student prefer?")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Question 10 */}
            <p className="text-lg">
              {renderText(
                "When will the student find out her homestay address?",
              )}
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
                className="border rounded-md px-2 py-1 w-64"
              />
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
    <Listening4Pagination2009></Listening4Pagination2009>
    </div>
  );
};

export default Test4Listening2009;
