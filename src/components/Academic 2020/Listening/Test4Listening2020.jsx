import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

const Test4Listening2020 = () => {
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

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 1. You will hear a representative from a train company talking to a woman about her train journey.",
        "First, you have some time to look at questions 1 to 6.",
        "Now listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Hello, do you mind if I ask you some questions about your journey today? We're doing a customer satisfaction survey.",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Yes, OK. I've got about 10 minutes before my train home leaves. I'm on a day trip.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Great, thank you. So first of all, could you tell me your name?"],
    },
    {
      speaker: "SOPHIE",
      text: ["It's Sophie Bird."],
    },
    {
      speaker: "MAN",
      text: ["Thank you. And would you mind telling me what you do?"],
    },
    {
      speaker: "SOPHIE",
      text: [{ text: "I'm a journalist.", number: 1 }],
    },
    {
      speaker: "MAN",
      text: ["Oh, really? That must be interesting."],
    },
    {
      speaker: "SOPHIE",
      text: ["Yes, it is."],
    },
    {
      speaker: "MAN",
      text: ["So, what's the reason for your visit here today? Work?"],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Actually, it's my day off.",
        {
          text: " I came here to do some shopping.",
          number: 2,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["All right."],
    },
    {
      speaker: "SOPHIE",
      text: ["But I do sometimes come here for work."],
    },
    {
      speaker: "MAN",
      text: [
        "OK. Now, I'd like to ask some questions about your journey today, if that's OK.",
      ],
    },
    {
      speaker: "SOPHIE",
      text: ["Yes, no problem."],
    },
    {
      speaker: "MAN",
      text: [
        "Right, so can you tell me which station you're traveling back to?",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [{ text: "Staunfirth, where I live.", number: 3 }],
    },
    {
      speaker: "MAN",
      text: ["Uh. Can I just check the spelling? STAUNFIRTH?"],
    },
    {
      speaker: "SOPHIE",
      text: ["That's right."],
    },
    {
      speaker: "MAN",
      text: ["Hmm. And you traveled from there this morning?"],
    },
    {
      speaker: "SOPHIE",
      text: ["Yes."],
    },
    {
      speaker: "MAN",
      text: [
        "OK, good. Next, can I ask what kind of ticket you bought? I assume it wasn't a season ticket, as you don't travel every day.",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [
        "That's right.",
        {
          text: " No, I just got a normal return ticket.",
          number: 4,
        },
        "I don't have a rail card, so I didn't get any discount. I keep meaning to get one, because it's a lot cheaper.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, you'd have saved 20% on your ticket today. Uh. So you paid the full price for your ticket.",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [{ text: "I paid £23.70.", number: 5 }],
    },
    {
      speaker: "MAN",
      text: ["OK, do you think that's good value for money?"],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Not really, I think it's too much for a journey that only takes 45 minutes.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, that's one of the main complaints we get. So you didn't buy your ticket in advance?",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [
        "No, I know it's cheaper if you buy a week in advance, but I didn't know I was coming then.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "I know, you can't always plan ahead. So, did you buy it this morning?",
      ],
    },
    {
      speaker: "SOPHIE",
      text: ["No, it was yesterday."],
    },
    {
      speaker: "MAN",
      text: ["Right, and do you usually buy your tickets at the station?"],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Well, I do usually, but the ticket office closes early, and I hate using ticket machines. I think ticket offices should be open for longer hours. There's always a queue for the machines, and they're often out of order.",
        {
          text: "So to answer your question, I got an e-ticket online.",
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
      speaker: "MAN",
      text: [
        "OK, thank you. Now I'd like to ask you about your satisfaction with your journey. So what would you say you were most satisfied with today?",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Well, I like the Wi-Fi on the train. It's improved a lot. It makes it easier for me to work if I want to.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's the first time today anyone's mentioned that. It's good to get some positive feedback on that.",
      ],
    },
    {
      speaker: "SOPHIE",
      text: ["Hmm."],
    },
    {
      speaker: "MAN",
      text: ["And is there anything you weren't satisfied with?"],
    },
    {
      speaker: "SOPHIE",
      text: [
        {
          text: "Well, normally the trains run on time and are pretty reliable, but today there was a delay.",
          number: 7,
        },
        "The train was about 15 minutes behind schedule.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Hmm. OK, I'll put that down. Now, uh, I'd also like to ask about the facilities at this station. You've probably noticed that the whole station's been upgraded. What are you most satisfied with?",
      ],
    },
    {
      speaker: "SOPHIE",
      text: [
        {
          text: "Uh. I think the best thing is that they've improved the amount of information about train times et cetera that's given to passengers.",
          number: 8,
        },
        "It's much clearer, before there was only one board, and I couldn't always see it properly, which was frustrating.",
      ],
    },
    {
      speaker: "MAN",
      text: ["That's good, and is there anything you're not satisfied with?"],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Let's see, I think things have generally improved a lot. The trains are much more modern, and I like the new cafe, but one thing is that there aren't enough places to sit down.",
        {
          text: "Especially on the platforms.",
          number: 9,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "OK, so I'll put seating down, shall I, as the thing you're least satisfied with?",
      ],
    },
    {
      speaker: "SOPHIE",
      text: ["Yes, OK."],
    },
    {
      speaker: "MAN",
      text: ["Can I ask your opinion about some of the other facilities?"],
    },
    {
      speaker: "SOPHIE",
      text: ["Uh huh."],
    },
    {
      speaker: "MAN",
      text: [
        "We'd like feedback on whether people are satisfied, dissatisfied or neither satisfied nor dissatisfied. ?",
        {
          text: "OK, uh, what about the parking at the station",
          number: 10,
        },
      ],
    },
    {
      speaker: "SOPHIE",
      text: [
        "Well, to be honest, I don't really have an opinion, as I never use it.",
      ],
    },
    {
      speaker: "MAN",
      text: ["So neither satisfied nor dissatisfied for that then?"],
    },
    {
      speaker: "SOPHIE",
      text: ["Yes, I suppose so."],
    },
    {
      speaker: "MAN",
      text: ["OK, uh, and what about these?"],
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "AMBER")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "WILLIAM")
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
    1: "I'm a journalist",
    2: "I came here to do some shopping",
    3: "Staunfirth, where I live",
    4: "No, I just got a normal return ticket",
    5: "I paid £23.70",
    6: "So to answer your question, I got an e-ticket online",
    7: "Well, normally the trains run on time and are pretty reliable, but today there was a delay",
    8: "Uh. I think the best thing is that they've improved the amount of information about train times et cetera that's given to passengers",
    9: " Especially on the platforms",
    10: "OK, uh, what about the parking at the station",
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
    localStorage.setItem("/2020/Test 4/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2020/Test 4/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 4/listening");
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
                {renderText("Customer Satisfaction Survey")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
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

          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Customer Satisfaction Survey")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h2 className="text-lg font-bold mt-6">
                {renderText("Customer details")}
              </h2>
              <li className="text-lg">{renderText("Name: Sophie Bird")}</li>

              <li className="text-lg">
                <span>{renderText("Occupation:")}</span>
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
                <span>{renderText(".")}</span>
              </li>

              <li className="text-lg">
                {renderText("Phone number: 07866 510333")}
              </li>

              <li className="text-lg">
                <span>{renderText("Reason for travel today:")}</span>
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
                <span>{renderText(".")}</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Journey information")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Name of station returning to:")}
              </li>
              <li className="text-lg">
                <span>{renderText("Name of station returning to: ")}</span>
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
                <span>{renderText(".")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("Type of ticket purchased: standard")}</span>
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
                <span>{renderText("ticket.")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("Cost of ticket: £")}</span>
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
                <span>{renderText("per hour.")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("Where ticket was bought:")}</span>
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
                <span>{renderText(".")}</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Satisfaction with journey")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Least satisfied with: the")}</span>
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
                <span>{renderText(".")}</span>
              </li>
            </ul>

            {/* ---------- Section 6 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Satisfaction with station facilities")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Most satisfied with: how much")}</span>
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
                <span>{renderText("was provided.")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("The")}</span>
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
                <span>{renderText(" ")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Neither satisfied nor dissatisfied with: the")}
                </span>
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
                <span>{renderText("available.")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening2020;
