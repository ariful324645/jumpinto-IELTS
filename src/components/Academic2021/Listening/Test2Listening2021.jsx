import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2021 from "../Pagination 2021/Listening2Pagination2021";

const Test2Listening2021 = () => {
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
        "Part 1. You will hear a woman phoning a company that converts old photographs to digital format.",
        "First, you have some time to look at questions 1 to 3.",
        "Now listen carefully and answer questions 1 to 3.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Hello, Picturerep. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, hi.",
        "I saw your advertisement about copying pictures to disk, and I'd like a bit more information about what you do.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Sure, what would you like to know?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, I've got a box full of old family photos that's been up in the attic for years.",
        "Some of them must be 50 or 60 years old.",
        "And I'd like to get them converted to digital format.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Sure, we can do that for you."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right, and what about size?",
        "The photos are all sorts of sizes.",
        "Are there any restrictions?",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "Well, the maximum size of photo we can do with our normal service is 30 centimeters,",
        "and each picture must be at least 4 cm.",
        "That's the minimum we can cope with.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, that should be fine.",
        "And some of them are in a frame.",
        { text: "Should I take them out before I send them?", number: 1 },
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "Yes, please.",
        "We can't copy them otherwise, and also the photos must all be separate,",
        "they mustn't be stuck into an album.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, that's not a problem.",
        "So, can you give me an idea of how much this will cost?",
        "I've got about 360 photos, I think.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        {
          text: "We charge £195 for 300 to 400 photos for the basic service.",
          number: 2,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["OK, and does that include the disk?"],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Yes, one disk, but you can get extra ones for £5 each."],
    },
    {
      speaker: "WOMAN",
      text: [
        "That's good.",
        "So, do I need to pay when I send you the photos?",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "No, we won't need anything until we've actually copied the pictures.",
        {
          text: "Then we'll let you know how much it is, and once we've received the payment, we'll send the parcel off to you.",
          number: 3,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 4 to 10.",
        "Now listen and answer questions 4 to 10.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Is there anything else you'd like to ask about our services?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I've roughly sorted out the photos into groups according to what they're about.",
        "So, can you keep them in those groups when you copy them?",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "Sure, we'll save each group in a different folder on the disk,",
        "and if you like, you can suggest a name for each folder.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "So, I could have one called 'Grandparents' for instance?",
          number: 4,
        },
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Exactly."],
    },
    {
      speaker: "WOMAN",
      text: [
        "And do you do anything besides scan the photos?",
        "Like, can you make any improvements?",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "Yes, in the standard service, each photo is checked,",
        {
          text: "and we can sometimes touch up the color a bit, or improve the contrast,",
          number: 5,
        },
        "that can make a big difference.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, and some of the photos are actually quite fragile.",
        "They won't get damaged in the process, will they?",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        {
          text: "No, if any look particularly fragile, we'd do them by hand.",
          number: 6,
        },
        "We do realize how precious these old photos can be.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "And another thing is we can make changes to a photo if you want,",
        {
          text: "so, if you want to remove an object from a photo, or maybe alter the background,",
          number: 7,
        },
        "we can do that.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Really?",
        "I might be interested in that.",
        "I'll have a look through the photos and see.",
        "Oh, and talking of fixing photos.",
        { text: "I've got a few that aren't properly in focus.", number: 8 },
        "Can you do anything to make that better?",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: ["No, I'm afraid that's one thing we can't do."],
    },
    {
      speaker: "WOMAN",
      text: ["OK."],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Any other information I can give you?"],
    },
    {
      speaker: "WOMAN",
      text: ["Er... oh, how long will it all take?"],
    },
    {
      speaker: "EMPLOYEE",
      text: [{ text: "We aim to get the copying done in 10 days.", number: 9 }],
    },
    {
      speaker: "WOMAN",
      text: [
        "Fine.",
        "Right, well, I'll get the photos packed up in a box and post them off to you.",
      ],
    },
    {
      speaker: "EMPLOYEE",
      text: [
        "Right, if you've got a strong cardboard box, that's best.",
        {
          text: "We've found that plastic ones sometimes break in the post.",
          number: 10,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["OK.", "Right, thanks for your help.", "Bye."],
    },
    {
      speaker: "EMPLOYEE",
      text: ["Bye."],
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
    1: "frame",
    2: "195",
    3: "payment",
    4: "grandparents",
    5: "colour",
    6: "hand",
    7: "background",
    8: "focus",
    9: "10 days",
    10: "plastic",
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
                {renderText("Picture Conversion Service")}
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
              {renderText("Copying photos to digital format")}
            </h1>

            {/* ---------- Company ---------- */}
            <p className="text-lg">
              {renderText("Name of company: ")}
              <span className="font-semibold">{renderText("Picturerep")}</span>
            </p>

            {/* ---------- Requirements ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Requirements")}
            </h2>

            <p className="text-lg">
              {renderText(
                "Maximum size of photos is 30 cm, minimum size 4 cm."
              )}
            </p>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Photos must not be in a")}
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
              {renderText("or an album.")}
            </p>

            {/* ---------- Cost ---------- */}
            <h2 className="text-lg font-bold mt-6">{renderText("Cost")}</h2>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("The cost for 360 photos is £")}
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
              {renderText("(including one disk).")}
            </p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Before the completed order is sent,")}
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
              {renderText("is required.")}
            </p>

            {/* ---------- Services Included ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Services included in the price")}
            </h2>

            {/* Q4 */}
            <p className="text-lg">
              {renderText(
                "Photos can be placed in a folder, e.g. with the name"
              )}
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
              .
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("The")}
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
              {renderText("and contrast can be improved if necessary.")}
            </p>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("Photos which are very fragile will be scanned by")}
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
              .
            </p>

            {/* ---------- Special Restore ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Special restore service (costs extra)")}
            </h2>

            {/* Q7 */}
            <p className="text-lg">
              {renderText(
                "It may be possible to remove an object from a photo, or change the"
              )}
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

            {/* Q8 */}
            <p className="text-lg">
              {renderText("A photo which is not correctly in")}
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
              {renderText("cannot be fixed.")}
            </p>

            {/* ---------- Other Information ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Other information")}
            </h2>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("Orders are completed within")}
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
              .
            </p>

            {/* Q10 */}
            <p className="text-lg">
              {renderText("Send the photos in a box (not")}
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
              ).
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
      <Listening2Pagination2021></Listening2Pagination2021>
    </div>
  );
};

export default Test2Listening2021;
