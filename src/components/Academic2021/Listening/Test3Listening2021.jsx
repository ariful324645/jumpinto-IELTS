import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2021 from "../Pagination 2021/Listening3Pagination2021";

const Test3Listening2021 = () => {
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
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 1. You will hear a woman phoning to ask about a summer cycling camp for her young son, who is called Charlie.",
        "First you have some time to look at questions 1 to 5.",
        "Now listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Hello, Junior Cycle Camp, Jake speaking."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Hi.",
        "I'm calling for some information about the cycle camp.",
        "I'm thinking of sending my son.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Great.",
        "Well, it's held every weekday morning over the summer vacation.",
        "And we focus on basic cycling skills and safety.",
        "We have eight levels for children from 3 years upwards.",
        "How old's your son?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Charlie, he's 7.",
        "He can ride a bike, but he needs a little more training before he's safe to go on the road.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "He'd probably be best in level 5.",
        "They start off practicing on the site here, and we aim to get them riding on the road.",
        {
          text: "But first, they're taken to ride in the park, away from the traffic.",
          number: 1,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right.", "And can you tell me a bit about the instructors?"],
    },
    {
      speaker: "JAKE",
      text: [
        "Well, all our staff wear different colored shirts.",
        "So we have three supervisors, and they have red shirts.",
        "They support the instructors, and they also stand in for me if I'm not around.",
        {
          text: "Then the instructors themselves are in blue shirts.",
          number: 2,
        },
        "And one of these is responsible for each class.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["OK."],
    },
    {
      speaker: "JAKE",
      text: [
        "In order to be accepted, all our instructors have to submit a reference from someone who's seen them work with children.",
        {
          text: "Like if they've worked as a babysitter for example.",
          number: 3,
        },
        "Then they have to complete our training course, including how to do lesson plans, and generally care for the well-being of the kids in their class.",
        "They do a great job, I have to say.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right, and tell me a bit about the classes.",
        "What size will Charlie's class be?",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "We have a limit of 8 children in each class, so their instructor really gets to know them well.",
        "They're out riding most of the time.",
        "But they have quiet times too, where their instructor might tell them a story that's got something to do with cycling,",
        {
          text: "or get them to play a game together.",
          number: 4,
        },
        "It's a lot of fun.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "It must be.",
        { text: "What happens if there's rain?", number: 5 },
        "Do the classes still run?",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Oh yes, we don't let that put us off.",
        "We just put on our waterproofs.",
        "And keep cycling.",
      ],
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
        "And is there anything special Charlie should bring along with him?",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Well, maybe some spare clothes, especially if the weather's not so good.",
        {
          text: "A snack for break time.",
          number: 6,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["How about a drink?"],
    },
    {
      speaker: "JAKE",
      text: [
        "No, we'll provide that.",
        "And make sure he has shoes, not sandals.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Sure.",
        {
          text: "And just at present, Charlie has to take medication every few hours, so I'll make sure he has that.",
          number: 7,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Absolutely.",
        "Just give us details of when he has to take it, and we'll make sure he does.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Thanks."],
    },
    {
      speaker: "JAKE",
      text: [
        "Now, there are a few things you should know about day one of the camp.",
        "The classes normally start at 9:30 every morning, but on day one, you should aim to get Charlie here by 9:20.",
        "The finishing time will be 12:30 as usual.",
        "We need the additional time because there are a few extra things to do.",
        {
          text: "The most important is that we have a very careful check to make sure that every child's helmet fits properly.",
          number: 8,
        },
        "If it doesn't fit, we'll try to adjust it, or we'll find him another one.",
        "But he must wear it all the time he's on the bike.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Of course."],
    },
    {
      speaker: "JAKE",
      text: [
        "Then after that, all the instructors will be waiting to meet their classes,",
        {
          text: "and they'll meet up in the tent.",
          number: 9,
        },
        "You can't miss it.",
        "Each instructor will take their class away and get started.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, well that all sounds good.",
        "Now, can you tell me how much the camp costs a week?",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        {
          text: "$199.",
          number: 10,
        },
        "We've managed to keep the price more or less the same as last year.",
        "It was 190 then.",
        "But the places are filling up quite quickly.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right.", "OK, well, I'd like to book for the..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1.",
        "You now have half a minute to check your answers to part 1.",
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
    1: "park",
    2: "blue",
    3: "reference",
    4: "story",
    5: "rain",
    6: "shoes",
    7: "medication",
    8: "helmet",
    9: "tent",
    10: "199",
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
                {renderText("Junior Cycle Camp")}
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
          <div className="border p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("JUNIOR CYCLE CAMP")}
            </h1>

            <p className="text-lg">
              {renderText("The course focuses on skills and safety.")}
            </p>
            <p className="text-lg">
              {renderText("Charlie would be placed in Level 5.")}
            </p>

            {/* Q1 */}
            <p className="text-lg">
              {renderText(
                "First of all, children at this level are taken to practise in a"
              )}
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
              .
            </p>

            {/* ---------- Instructors ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Instructors")}
            </h2>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Instructors wear")}
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
              {renderText(" shirts.")}
            </p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("A")}
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
              {renderText(" is required and training is given.")}
            </p>

            {/* ---------- Classes ---------- */}
            <h2 className="text-lg font-bold mt-6">{renderText("Classes")}</h2>

            <p className="text-lg">
              {renderText("The size of the classes is limited.")}
            </p>

            {/* Q4 */}
            <p className="text-lg">
              {renderText("There are quiet times during the morning for a")}
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
              {renderText(" or a game.")}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("Classes are held even if there is")}
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
              .
            </p>

            {/* ---------- What to bring ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("What to bring")}
            </h2>

            <p className="text-lg">{renderText("a change of clothing")}</p>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("a")}
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
              {renderText(" shoes (not sandals)")}
            </p>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("Charlie's")}
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
              .
            </p>

            {/* ---------- Day 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">{renderText("Day 1")}</h2>

            <p className="text-lg">
              {renderText("Charlie should arrive at 9.20 am on the first day.")}
            </p>

            {/* Q8 */}
            <p className="text-lg">
              {renderText("Before the class, his")}
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
              {renderText(" will be checked.")}
            </p>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("He should then go to the")}
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
              {renderText(" to meet his class instructor.")}
            </p>

            {/* ---------- Cost ---------- */}
            <h2 className="text-lg font-bold mt-6">{renderText("Cost")}</h2>

            {/* Q10 */}
            <p className="text-lg">
              {renderText("The course costs $")}
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
              {renderText(" per week.")}
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
      <Listening3Pagination2021></Listening3Pagination2021>
    </div>
  );
};

export default Test3Listening2021;
