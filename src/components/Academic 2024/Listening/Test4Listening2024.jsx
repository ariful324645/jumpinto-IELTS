import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2024 from "../Pagination 2024/Listening4Pagination2024";

const Test4Listening2024 = () => {
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
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 1, you will hear a supervisor in a supermarket talking to a new worker on her first day.",
        "First, you have some time to look at questions 1 to 6.",
        "Now listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "KAEDEN",
      text: [
        "Hello, Charlotte. I'm Kaeden, one of the supervisors.",
        { text: "Welcome to the team.", number: 1 },
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: ["Hi, Aiden."],
    },
    {
      speaker: "KAEDEN",
      text: [
        "Uh. It's Kaeden.",
        "Oh, don't worry. People often get my name wrong.",
        "They never know how to spell it.",
        "It's K A E D E N, in case you ever need to write it.",
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: ["I'll try and remember."],
    },
    {
      speaker: "KAEDEN",
      text: [
        "There are a few practical things you need to sort out this morning.",
        "Then I'll show you what you're going to do today.",
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: [
        "The email I received said to go to the front desk to show my letter of appointment and pick up my badge.",
      ],
    },
    {
      speaker: "KAEDEN",
      text: [
        "You'll need that for the staffroom and other areas of the supermarket where shoppers aren't allowed.",
        "After you've finished at the front desk, I'll take you to the staffroom.",
        {
          text: "Put your coat and rucksack in one of the lockers there, take whichever one is free.",
          number: 2,
        },
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: ["Will I have a key?"],
    },
    {
      speaker: "KAEDEN",
      text: [
        "Yes, try not to lose it.",
        "At the end of the day, leave it in the door for the next person to use.",
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: ["Will do."],
    },
    {
      speaker: "KAEDEN",
      text: ["You also need to go to the HR department to see Tiffany."],
    },
    {
      speaker: "CHARLOTTE",
      text: [
        "I was told to bring my passport with me.",
        { text: "HR need to take a note of the number in it.", number: 3 },
      ],
    },
    {
      speaker: "KAEDEN",
      text: ["That's right.", "Or you can show your ID card."],
    },
    {
      speaker: "CHARLOTTE",
      text: ["I don't have one of those."],
    },
    {
      speaker: "KAEDEN",
      text: [
        {
          text: "OK, Tiffany will give you a uniform.",
          number: 4,
        },
        "They have lots in different sizes, so just tell her what you need.",
        "I won't come with you to HR. I've got to sort something else out.",
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: ["Is the HR office near the staffroom?"],
    },
    {
      speaker: "KAEDEN",
      text: [
        "The staffroom is on the first floor, and HR are on the third floor.",
        {
          text: "There's a staircase outside the staffroom.",
          number: 5,
        },
      ],
    },
    {
      speaker: "CHARLOTTE",
      text: ["OK."],
    },
    {
      speaker: "KAEDEN",
      text: [
        "When you've finished with HR, come and find me in the bakery section.",
        "I'll give you my phone number in case you can't find me.",
        {
          text: "It's 0412 665 903.",
          number: 6,
        },
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
      speaker: "KAEDEN",
      text: [
        "Your tasks today are in the bakery section, the sushi counter, and the meat and fish counters.",
        "Check sell-by dates on bread and cakes.",
        {
          text: "Put a yellow label next to the original price.",
          number: 7,
        },
      ],
    },
    {
      speaker: "KAEDEN",
      text: [
        "On the sushi counter, bring more plastic boxes from the storeroom if we run out.",
        { text: "They are kept beneath the cardboard boxes.", number: 8 },
      ],
    },
    {
      speaker: "KAEDEN",
      text: [
        "At the meat and fish counters, clean the serving area.",
        {
          text: "Get more ice from the cold-room when needed.",
          number: 9,
        },
      ],
    },
    {
      speaker: "KAEDEN",
      text: [
        {
          text: "Wear thermal gloves when taking items from the cold-room.",
          number: 10,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1.",
        "You now have one minute to check your answers to part 1.",
      ],
    },
  ];

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
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "CHARLOTTE") {
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

  //  Marks show

  const correctAnswers = {
    // Questions 1–6 (notes)
    1: "Mark",
    2: "locker",
    3: "bank",
    4: "uniform",
    5: "second",
    6: "0789456123",

    // Questions 7–10 (table)
    7: "date",
    8: "plastic",
    9: "ice",
    10: "gloves",
  };

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
    localStorage.setItem("/2021/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2021/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/listening");
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
                {renderText("Shopping for a Meal in Kite Place")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–6")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>{" "}
            {renderText("for each answer.")}
          </h3>

          {/* ---------- Notes Q1–6 ---------- */}
          <div className="border p-6 rounded-lg space-y-4 max-w-[500px] mx-auto bg-white">
            <p className="font-bold text-center">
              {renderText("First day at work")}
            </p>

            <ul className="list-disc pl-6 space-y-3">
              {[
                { text: "Name of supervisor:", num: 1 },
                {
                  text: "Where to leave coat and bag: use",
                  num: 2,
                  suffix: "in staffroom",
                },
                {
                  text: "See Tiffany in HR: to give",
                  num: 3,
                  suffix: "number",
                },
                { text: "to collect", num: 4 },
                { text: "Location of HR office: on", num: 5, suffix: "floor" },
                { text: "Supervisor's mobile number:", num: 6 },
              ].map(({ text, num, prefix = "", suffix = "" }) => (
                <li key={num}>
                  <div className="flex items-center gap-2">
                    <p className="w-[220px]">
                      {renderText(text)} {renderText(prefix)}
                    </p>

                    <button
                      onClick={() => toggleButton(num)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        activeButtons[num]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      {num}
                    </button>

                    <input
                      value={userAnswers[num] || ""}
                      onChange={(e) => handleInputChange(num, e.target.value)}
                      className="border rounded-md px-2 py-1 w-28"
                    />

                    <p>{renderText(suffix)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Header for Questions 7–10 ---------- */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 7–10")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the table below.")} <br />
            <br />
            {renderText("Write ONE WORD ONLY for each answer.")}
          </h3>

          {/* ---------- Table Q7–10 (4 columns, 4 rows) ---------- */}
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold text-center mb-4">
              {renderText("Responsibilities")}
            </h2>

            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 w-[180px]">{renderText("Task")}</th>
                  <th className="border p-2">{renderText("Task 1")}</th>
                  <th className="border p-2">{renderText("Task 2")}</th>
                  <th className="border p-2">{renderText("Task 3")}</th>
                </tr>
              </thead>

              <tbody>
                {/* -------- Row 1 -------- */}
                <tr>
                  <td className="border p-2 font-bold">
                    {renderText("Bakery section")}
                  </td>
                  <td className="border p-2">
                    {renderText("Check sell-by dates")}
                  </td>
                  <td className="border p-2">
                    {renderText("Change price labels")}
                  </td>
                  <td className=" p-2 flex items-center gap-2">
                    {renderText("Use")}
                    <button
                      onClick={() => toggleButton(7)}
                      className={`w-7 h-7 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                    {renderText("labels")}
                  </td>
                </tr>

                {/* -------- Row 2 -------- */}
                <tr>
                  <td className="border p-2 font-bold">
                    {renderText("Sushi takeaway counter")}
                  </td>
                  <td className=" p-2 flex items-center gap-2">
                    {renderText("Re-stock with")}
                    <button
                      onClick={() => toggleButton(8)}
                      className={`w-7 h-7 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                    {renderText("boxes if needed")}
                  </td>
                  <td className="border p-2">
                    {renderText("Wipe preparation area and clean the sink")}
                  </td>
                  <td className="border p-2">
                    {renderText("Do not clean any knives")}
                  </td>
                </tr>

                {/* -------- Row 3 -------- */}
                <tr>
                  <td className="border p-2 font-bold">
                    {renderText("Meat and fish counters")}
                  </td>
                  <td className="border p-2">
                    {renderText(
                      "Clean the serving area, including the weighing scales"
                    )}
                  </td>
                  <td className=" p-2  items-center gap-2">
                    <div>
                      {renderText("Collect")}
                      <button
                        onClick={() => toggleButton(9)}
                        className={`w-7 h-7 rounded-full border-2 ${
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
                        className="border rounded-md px-2 py-1 w-28"
                      />
                      {renderText("for the")} <br />
                    </div>

                    <div> {renderText("fish from the cold-room")}</div>
                  </td>
                  <td className="border p-2">
                    {" "}
                    {renderText("Must wear special")} <br />
                    <button
                      onClick={() => toggleButton(10)}
                      className={`w-7 h-7 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                  </td>
                </tr>

                {/* -------- Row 10 -------- */}
              </tbody>
            </table>
          </div>

          {/* ---------- Submit & Result ---------- */}
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
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1–10)
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
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
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

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

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
      <Listening4Pagination2024></Listening4Pagination2024>
    </div>
  );
};

export default Test4Listening2024;
