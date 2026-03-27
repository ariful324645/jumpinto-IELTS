import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2023 from "../Pagination 2023/Listening1Pagination2023";

const Test1Listening2023 = () => {
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
        "Part 1. You will hear an interview with a woman who is doing a survey on transport.",
        "First, you have some time to look at questions 1 to 5.",
        "Now listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Excuse me, would you mind if I asked you some questions?",
        "We're doing a survey on transport.",
      ],
    },
    {
      speaker: "SADIE",
      text: ["Yes, that's OK."],
    },
    {
      speaker: "MAN",
      text: ["First of all can I take your name?"],
    },
    {
      speaker: "SADIE",
      text: ["Yes, it's Sadie Jones."],
    },
    {
      speaker: "MAN",
      text: [
        "Thanks very much.",
        "And could I have your date of birth?",
        "Just the year will do, actually.",
        "Is that all right?",
      ],
    },
    {
      speaker: "SADIE",
      text: ["Uh. Yes, that's fine.", "It's 1991."],
    },
    {
      speaker: "MAN",
      text: ["So, next your post code please."],
    },
    {
      speaker: "SADIE",
      text: [{ text: "It's DW307YZ.", number: 1 }],
    },
    {
      speaker: "MAN",
      text: ["Great, thanks.", "Is that in Wells?"],
    },
    {
      speaker: "SADIE",
      text: [
        "No, it's actually in Harborne.",
        "Wells isn't far from there, though.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "I really like that area.",
        "My grandmother lived there when I was a kid.",
      ],
    },
    {
      speaker: "SADIE",
      text: ["Yes, it is nice."],
    },
    {
      speaker: "MAN",
      text: [
        "Right, so now I want to ask you some questions about how you traveled here today.",
        "Did you use public transport?",
      ],
    },
    {
      speaker: "SADIE",
      text: ["Yes, I came by bus."],
    },
    {
      speaker: "MAN",
      text: [
        "OK, and that was today.",
        { text: "It's the 24th of April, isn't it?", number: 2 },
      ],
    },
    {
      speaker: "SADIE",
      text: ["Isn't it the 25th?", "Uh, no, ha, actually you're right."],
    },
    {
      speaker: "MAN",
      text: [
        "Ha ha ha.",
        "And what was the reason for your trip today?",
        "I can see you've got some shopping with you.",
      ],
    },
    {
      speaker: "SADIE",
      text: [
        "Yes, I did some shopping,",
        {
          text: "but the main reason I came here was to go to the dentist.",
          number: 3,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["That's not much fun.", "Hope it was nothing serious."],
    },
    {
      speaker: "SADIE",
      text: ["No, it was just a check-up.", "It's fine."],
    },
    {
      speaker: "MAN",
      text: ["Good.", "Do you normally travel by bus into the city center?"],
    },
    {
      speaker: "SADIE",
      text: [
        "Yes, I stopped driving ages ago,",
        {
          text: "because parking was so difficult to find, and it cost so much.",
          number: 4,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["I see."],
    },
    {
      speaker: "SADIE",
      text: [
        "The bus is much more convenient too.",
        "It only takes about 30 minutes.",
      ],
    },
    {
      speaker: "MAN",
      text: ["That's good.", "So where did you start your journey?"],
    },
    {
      speaker: "SADIE",
      text: [{ text: "At the bus stop on Claxby Street.", number: 5 }],
    },
    {
      speaker: "MAN",
      text: ["Is that CLAXBY?"],
    },
    {
      speaker: "SADIE",
      text: ["That's right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "And how satisfied with the service are you?",
        "Do you have any complaints?",
      ],
    },
    {
      speaker: "SADIE",
      text: [
        "Well, as I said, it's very convenient and quick when it's on time.",
        {
          text: "But this morning it was late, only about 10 minutes, but still.",
          number: 6,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, I understand that's annoying.",
        "And what about the timetable?",
        "Do you have any comments about that?",
      ],
    },
    {
      speaker: "SADIE",
      text: [
        "Hmm, I suppose I mainly use the bus during the day,",
        "but anytime I've been in town in the evening,",
        "for dinner or at the cinema,",
        {
          text: "I've noticed you have to wait a long time for a bus.",
          number: 7,
        },
        "There aren't that many.",
      ],
    },
    {
      speaker: "MAN",
      text: ["OK, thanks.", "So now, I'd like to ask you about your car use."],
    },
    {
      speaker: "SADIE",
      text: [
        "Well, I have got a car, but I don't use it that often.",
        {
          text: "Mainly just to go to the supermarket.",
          number: 8,
        },
        "But that's about it really.",
        "My husband uses it at the weekends to go to the golf club.",
      ],
    },
    {
      speaker: "MAN",
      text: ["And what about a bicycle?"],
    },
    {
      speaker: "SADIE",
      text: ["I don't actually have one at the moment."],
    },
    {
      speaker: "MAN",
      text: [
        "What about the city bikes you can rent?",
        "Do you ever use those?",
      ],
    },
    {
      speaker: "SADIE",
      text: [
        "No, I'm not keen on cycling there",
        {
          text: "because of all the pollution.",
          number: 9,
        },
        "But I would like to get a bike.",
        "It would be good to use it to get to work.",
      ],
    },
    {
      speaker: "MAN",
      text: ["So, why haven't you got one now?"],
    },
    {
      speaker: "SADIE",
      text: [
        "Well, I live in a flat on the 2nd floor.",
        {
          text: "And it doesn't have any storage, so we'd have to leave it in the hall outside the flat.",
          number: 10,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["I see.", "OK, well I think that's all we need from you today."],
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
      if (speaker === "SADIE") {
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
    1: "DW307YZ",
    2: "24",
    3: "dentist",
    4: "parking",
    5: "claxby",
    6: "late",
    7: "evening",
    8: "supermarket",
    9: "pollution",
    10: "storage",
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
                {renderText("Transport Survey")}
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
            {renderText("Questions 1–10")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 max-w-2xl mx-auto rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Transport survey")}
            </h1>

            <p className="text-lg">{renderText("Name: Sadie Jones")}</p>

            <p className="text-lg">{renderText("Year of birth: 1991")}</p>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Postcode:")}
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

            <h3 className="font-semibold mt-4">
              {renderText("Travelling by bus")}
            </h3>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Date of bus journey:")}
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

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Reason for trip: shopping and visit to the")}
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

            {/* Q4 */}
            <p className="text-lg">
              {renderText("Travelled by bus because cost of")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" too high")}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("Got on bus at")}
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
              {renderText(" Street")}
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Complaints about bus service")}
            </h3>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("bus today was")}
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

            {/* Q7 */}
            <p className="text-lg">
              {renderText("frequency of buses in the")}
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

            <h3 className="font-semibold mt-4">
              {renderText("Travelling by car")}
            </h3>

            {/* Q8 */}
            <p className="text-lg">
              {renderText("Goes to the")}
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
              {renderText(" by car")}
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Travelling by bicycle")}
            </h3>

            {/* Q9 */}
            <p className="text-lg">
              {renderText(
                "Dislikes travelling by bike in the city centre because of the"
              )}
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

            {/* Q10 */}
            <p className="text-lg">
              {renderText("Doesn't own a bike because of a lack of")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
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
      <Listening1Pagination2023></Listening1Pagination2023>
    </div>
  );
};

export default Test1Listening2023;
