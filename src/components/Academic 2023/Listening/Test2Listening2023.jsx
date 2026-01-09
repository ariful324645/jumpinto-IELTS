import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2023 from "../Pagination 2023/Listening2Pagination2023";

const Test2Listening2023 = () => {
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
        "Part 1. You will hear a woman from a job agency giving information to a man about work in a chain of restaurants.",
        "First, you have some time to look at questions 1 to 5.",
        "Now listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["So, I understand you're interested in restaurant work."],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, I've got a bit of experience, and I can provide references.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "That's good, I can check all that later.",
        "Now, Milo's restaurants have some vacancies at the moment.",
        "They're a really good company to work for, lots of benefits.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh right."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes. They've got a very good reputation for looking after staff.",
        {
          text: "For example, all employees get training, even temporary staff.",
          number: 1,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, really? That's quite unusual, isn't it?"],
    },
    {
      speaker: "WOMAN",
      text: ["Certainly is."],
    },
    {
      speaker: "MAN",
      text: ["And do staff get free uniforms too?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Um. You just need to wear a white T-shirt and black trousers, it says here, so I guess not.",
        {
          text: "But another benefit of working for a big company like this is that you can get a discount at any of their restaurants.",
          number: 2,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Even at weekends?"],
    },
    {
      speaker: "WOMAN",
      text: ["No, but you'll be working then anyway."],
    },
    {
      speaker: "MAN",
      text: [
        "Oh yes, I suppose so.",
        "Most of their restaurants are in the city centre, aren't they?",
        "So easy to get to by bus.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, that's right.",
        {
          text: "But if you have to do a late shift and finish work after midnight, the company will pay for you to get a taxi home.",
          number: 3,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["I probably won't need one. I think I'd use my bike."],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK.",
        "Now, they do have some quite specific requirements for the kind of person they're looking for.",
        "Milo's is a young dynamic company, and they're really keen on creating a strong team.",
        "It's really important that you can fit in and get on well with everyone.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yep, I've got no problem with that.",
        {
          text: "The last place I worked for was quite demanding too, we had to make sure we gave a really high level of service.",
          number: 4,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "That's good to hear, because that will be equally important at Milo's.",
        "I know they want people who have an eye for detail.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's fine. I'm very used to working in that kind of environment.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Perfect.",
        {
          text: "So the only other thing that's required is good communication skills. So you'll need to have a certificate in English.",
          number: 5,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Sure."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK. Let's have a look at the current job vacancies at Milo's.",
        {
          text: "The first one is in Wivenhoe Street.",
          number: 6,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Sorry, where?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Wivenhoe. W I V E N H O E.",
        "It's quite central, just off Cork Street.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, right."],
    },
    {
      speaker: "WOMAN",
      text: [
        "They're looking for a breakfast supervisor.",
        "So you're probably familiar with the kind of responsibilities involved.",
        {
          text: "Obviously checking that all the portions are correct, and that procedures for cleaning equipment are being followed.",
          number: 7,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "OK, and what about the salary?",
        "In my last job, I was getting £9.50 per hour.",
        "I was hoping to get a bit more than that.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Well, to begin with, you'd be getting £9.75, but that goes up to £11.25 after three months.",
          number: 8,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["That's not too bad."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Now you might also be interested in the job at the City Road branch.",
        "That's for a junior chef.",
        {
          text: "You'd be responsible for making sure there's enough stock each week and sorting out deliveries.",
          number: 9,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Yes, it does sound interesting. What are the hours like?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "There's a lot of evening and weekend work, but they're closed on Mondays.",
        {
          text: "You do get one Sunday off every four weeks.",
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

  //  Marks show

  const correctAnswers = {
    1: "meals",
    2: "training",
    3: "transport",
    4: "hygiene",
    5: "catering",
    6: "Market",
    7: "kitchen",
    8: "9.50",
    9: "supplies",
    10: "Sunday",
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
                {renderText("Working at Milo's Restaurants")}
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
            {renderText("Questions 1–5")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box for Q1–5 ---------- */}
          <div className="border p-6 max-w-2xl mx-auto rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Working at Milo's Restaurants")}
            </h1>

            {/* Q1 */}
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>

              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />

              <p className="text-lg">{renderText("provided for all staff")}</p>
            </div>

            {/* Q2 */}
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>

              <input
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />

              <p className="text-lg">
                {renderText("during weekdays at all Milo's Restaurants")}
              </p>
            </div>

            {/* Q3 */}
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>

              <input
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />

              <p className="text-lg">{renderText("provided after midnight")}</p>
            </div>

            <h3 className="font-semibold mt-4">
              {renderText("Person specification")}
            </h3>

            {/* Q4 */}
            {/* Q4 */}
            <div className="flex items-center gap-3">
              <p className="text-lg">
                {renderText("must care about maintaining a high standard of")}
              </p>
              <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <input
                value={userAnswers[4] || ""}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </div>

            {/* Q5 */}
            <div className="flex items-center gap-3">
              <p className="text-lg">
                {renderText("must have a qualification in")}
              </p>

              <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                5
              </span>
              <input
                value={userAnswers[5] || ""}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </div>
          </div>

          {/* ================= Q6–10 Table ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 6–10")}
          </h2>
          <h3 className="text-lg mb-6">
            {renderText("Complete the table below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-3 py-2">
                    {renderText("Location")}
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    {renderText("Job title")}
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    {renderText("Responsibilities include")}
                  </th>
                  <th className="border border-gray-300 px-3 py-2">
                    {renderText("Pay and conditions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Q6 */}
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("Street")}
                    <div className="flex items-center">
                      <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                        6
                      </span>
                      <input
                        value={userAnswers[6] || ""}
                        onChange={(e) => handleInputChange(6, e.target.value)}
                        className="border rounded-md px-2 py-1 w-32 mx-1"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("Breakfast supervisor")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("Checking portions, etc. are correct")} <br />
                    {renderText("Making sure ")}
                    <div className="flex items-center">
                      {" "}
                      <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                        7
                      </span>
                      <input
                        value={userAnswers[7] || ""}
                        onChange={(e) => handleInputChange(7, e.target.value)}
                        className="border rounded-md px-2 py-1 w-32 mx-1"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("is clean")} <br />
                    {renderText("Starting salary £")}
                    <div className="flex items-center">
                      {" "}
                      <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                        8
                      </span>
                      <input
                        value={userAnswers[8] || ""}
                        onChange={(e) => handleInputChange(8, e.target.value)}
                        className="border rounded-md px-2 py-1 w-32 mx-1"
                      />
                    </div>
                    {renderText(" per hour")} <br />
                    {renderText("Start work at 5.30 a.m.")}
                  </td>
                </tr>

                {/* Row 2: Q8 */}
                <tr>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("City Road")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("Junior chef")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("Supporting senior chefs")} <br />
                    {renderText("Maintaining stock and organising ")}
                    <div className="flex items-center">
                      {" "}
                      <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                        9
                      </span>
                      <input
                        value={userAnswers[9] || ""}
                        onChange={(e) => handleInputChange(9, e.target.value)}
                        className="border rounded-md px-2 py-1 w-32 mx-1"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {renderText("Annual salary £23,000")} <br />
                    {renderText("No work on a ")}
                    <div className="flex items-center">
                      {" "}
                      <span className="h-6 w-6 border rounded-full flex items-center justify-center text-sm font-semibold">
                        10
                      </span>
                      <input
                        value={userAnswers[10] || ""}
                        onChange={(e) => handleInputChange(10, e.target.value)}
                        className="border rounded-md px-2 py-1 w-32 mx-1"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      <Listening2Pagination2023></Listening2Pagination2023>
    </div>
  );
};

export default Test2Listening2023;
