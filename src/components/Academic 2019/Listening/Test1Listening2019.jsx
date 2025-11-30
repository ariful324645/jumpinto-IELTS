import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2019 from "../Pagination/Listening1Pagination2019";

const Test1Listening2019 = () => {
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
        "Section 1. You will hear a woman reporting a theft to an officer in a police station.",
        "First, you have some time to look at questions 1 to 3.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["Good morning. Uh. What can I do for you?"],
    },
    {
      speaker: "LOUISE",
      text: [
        "I want to report a theft. I had some things stolen out of my bag yesterday.",
      ],
    },
    {
      speaker: "OFFICER",
      text: [
        "I'm sorry to hear that. Right, so I'll need to take a few details.",
        "Can I start with your name?",
      ],
    },
    {
      speaker: "LOUISE",
      text: ["Louise Taylor."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The woman's name is Louise Taylor. So Taylor has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 3.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["Good morning. Uh. What can I do for you?"],
    },
    {
      speaker: "LOUISE",
      text: [
        "I want to report a theft. I had some things stolen out of my bag yesterday.",
      ],
    },
    {
      speaker: "OFFICER",
      text: [
        "I'm sorry to hear that. Right, so I'll need to take a few details.",
        "Can I start with your name?",
      ],
    },
    {
      speaker: "LOUISE",
      text: ["Louise Taylor."],
    },
    {
      speaker: "OFFICER",
      text: ["OK, thank you. And are you resident in the UK?"],
    },
    {
      speaker: "LOUISE",
      text: [
        {
          text: "No, I'm actually Canadian, though my mother was British.",
          number: 1,
        },
      ],
    },
    {
      speaker: "OFFICER",
      text: ["And your date of birth?"],
    },
    {
      speaker: "LOUISE",
      text: ["December 14th, 1977."],
    },
    {
      speaker: "OFFICER",
      text: ["So you're just visiting this country?"],
    },
    {
      speaker: "LOUISE",
      text: [
        "That's right. ",
        {
          text: "I come over most summers on business. I'm an interior designer, and I come over to buy old furniture, antiques you know..",
          number: 2,
        },
        "There are some really lovely things around here. But you need to get out to the small towns",
        "I've had a really good trip this year, until this happened.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["OK, so you've been here quite a while?"],
    },
    {
      speaker: "LOUISE",
      text: ["Yes. I'm here for 2 months, I go back next week."],
    },
    {
      speaker: "OFFICER",
      text: ["So, may I ask where you're staying now?"],
    },
    {
      speaker: "LOUISE",
      text: [
        {
          text: "Well, at present, I've got a place at Park Apartments, that's on King Street",
          number: 3,
        },
        "I was staying at the Riverside Apartments on the same street, but the apartment there was only available for six weeks, so I had to find another one.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["OK. And the apartment Number?"],
    },
    {
      speaker: "LOUISE",
      text: ["Fifteen."],
    },
    {
      speaker: "OFFICER",
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
      speaker: "OFFICER",
      text: [
        "Now, I need to take some details of the theft. So, you said you had some things stolen out of your bag.",
      ],
    },
    {
      speaker: "LOUISE",
      text: ["That's right."],
    },
    {
      speaker: "OFFICER",
      text: [
        "And were you actually carrying the bag when the theft took place?",
      ],
    },
    {
      speaker: "LOUISE",
      text: [
        "Yes. I really can't understand it. I had my backpack on, and I went into a supermarket to buy a few things, and when I opened it up, my wallet wasn't there.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["And what did your wallet have in it?"],
    },
    {
      speaker: "LOUISE",
      text: [
        "Well, fortunately, I don't keep my credit cards in that wallet. I keep them with my passport in an inside compartment in my backpack.",
        {
          text: "But there was quite a bit of cash there, about £250 Sterling I should think.",
          number: 4,
        },
        "I withdrew £300 from my account yesterday. But I did a bit of shopping, so I must have already spent about £50 of that.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["OK."],
    },
    {
      speaker: "LOUISE",
      text: [
        "At first I thought, oh, I must have left the wallet back in the apartment. ",

        {
          text: "But then I realized my phone had gone as well.",
          number: 5,
        },
        "It was only a week old, and that's when I realized I'd been robbed",
        "Anyway, at least they didn't take the keys to my rental car.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["Yes. So you say the theft occurred yesterday?"],
    },
    {
      speaker: "LOUISE",
      text: ["Yes."],
    },
    {
      speaker: "OFFICER",
      text: [
        {
          text: "So that was September the 10th, and do you have any idea at all of where or when the things might possibly have been stolen?",
          number: 6,
        },
      ],
    },
    {
      speaker: "LOUISE",
      text: [
        "Well, at first I couldn't believe it, because the bag had been on my back ever since I left the apartment after lunch.",
        "It's just a small backpack. But I generally use it when I'm traveling, because it seems safer than a handbag.",
        "Anyway, I met up with a friend, and we spent a couple of hours in the museum.",
        {
          text: "But I do remember that as we were leaving there, at about 4 o'clock, a group of young boys ran up to us, and they were really crowding round us.",
          number: 7,
        },
        {
          text: "And they were asking us what time it was, then all of a sudden, they ran off.",
          number: 8,
        },
      ],
    },
    {
      speaker: "OFFICER",
      text: ["Can you remember anything about them?"],
    },
    {
      speaker: "LOUISE",
      text: [
        "The one who did most of the talking was wearing a T-shirt with a picture of something. Ah. Let's see, a tiger.",
      ],
    },
    {
      speaker: "OFFICER",
      text: ["Right, any idea of how old he might have been?"],
    },
    {
      speaker: "LOUISE",
      text: ["Around 12 years old."],
    },
    {
      speaker: "OFFICER",
      text: ["And can you remember anything else about his appearance?"],
    },
    {
      speaker: "LOUISE",
      text: [
        "Not much, he was quite thin.Color of hair?",
        {
          text: " I do remember that, he was blonde. All the others were dark haired.",
          number: 9,
        },
      ],
    },
    {
      speaker: "OFFICER",
      text: ["And any details of the others?"],
    },
    {
      speaker: "LOUISE",
      text: ["Not really. They came and went so quickly."],
    },
    {
      speaker: "OFFICER",
      text: [
        "Right. So what I'm going to do now is give you a crime reference number, so you can contact your insurance company.",
        { text: "So, this is 10 digits, 8795482361.", number: 10 },
      ],
    },
    {
      speaker: "LOUISE",
      text: ["Thank you. So, should I contact the..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1.",
        "You now have half a minute to check your answers.",
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "LOUISE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
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
    1: "Canadian",
    2: "antiques",
    3: "Park",
    4: "£250",
    5: "phone",
    6: "10 September",
    7: "museum",
    8: "time",
    9: "blonde",
    10: "8795482361",
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
    localStorage.setItem("/2019/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2019/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2019/Test 1/listening");
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
                {renderText("Crime Report Form")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
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
                        "Are you sure you want to clear all answers?"
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

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–10")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("CRIME REPORT FORM")}
            </h1>

            {/* ---------- Section 1: Type of Crime ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">{renderText("Type of crime: theft")}</li>
            </ul>

            {/* ---------- Section 2: Personal Information ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Personal information")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Name (Example) Louise Taylor")}
              </li>

              <li className="text-lg">
                <span>{renderText("Nationality")}</span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("Date of birth: 14 December 1977")}
              </li>

              <li className="text-lg">
                {renderText("Occupation: interior designer")}
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Reason for visit: business (to buy antique")}
                </span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText(")")}</span>
              </li>

              <li className="text-lg">
                {renderText("Length of stay: two months")}
              </li>

              <li className="text-lg">
                <span>{renderText("Current address:")}</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("Apartments (No 15)")}</span>
              </li>
            </ul>

            {/* ---------- Section 3: Details of Theft ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Details of theft")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  {renderText(
                    "Items stolen: a wallet containing approximately £"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("a")}</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("Date of theft:")}</span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>

            {/* ---------- Section 4: Possible Time & Place ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Possible time and place of theft")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Location: outside the")}</span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("at about 4 pm")}</span>
              </li>
            </ul>

            {/* ---------- Section 5: Details of Suspect ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Details of suspect")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("some boys asked for the")}</span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("then ran off")}</span>
              </li>

              <li className="text-lg">
                {renderText(
                  "one had a T-shirt with a picture of a tiger, he was about 12, slim build with"
                )}
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("hair")}</span>
              </li>
            </ul>

            {/* ---------- Section 6: Crime Reference ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Crime reference number allocated")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>
          </div>
          {/* ---------- Marks display ---------- */}
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
      <Listening1Pagination2019></Listening1Pagination2019>
    </div>
  );
};

export default Test1Listening2019;
