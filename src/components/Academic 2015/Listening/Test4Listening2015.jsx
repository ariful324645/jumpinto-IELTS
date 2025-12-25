import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2015 from "../Pagination 2015/Listening4Pagination2015";
// import Listening1Pagination2017 from "../Pagination2017/Listening1Pagination2017";

const Test4Listening2015 = () => {
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
        "Section 1, you will hear a customer phoning a builder to discuss some work she would like him to do on her home.",
        "First, you have some time to look at questions 1 to 6.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Thorndyke's."],
    },
    {
      speaker: "EDITH",
      text: ["Good morning, is that Mr Thorndyke?"],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Speaking, how can I help?"],
    },
    {
      speaker: "EDITH",
      text: [
        "I've got quite a few things which need painting and fixing in the flat.",
        "And I wonder whether you'd be able to do the work.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "I'm sure I'll be able to help, but let me take down a few details.",
      ],
    },
    {
      speaker: "EDITH",
      text: ["Yes, of course."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Well, uh, firstly, how did you hear about us?"],
    },
    {
      speaker: "EDITH",
      text: [{ text: "It was my friend May Hampton.", number: 0 }], // Example
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The customer heard of the builder from her friend, so friend has been written in the space.",
        "Now we shall begin.",
        "You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Thorndyke's."],
    },
    {
      speaker: "EDITH",
      text: ["Good morning, is that Mr Thorndyke?"],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Speaking, how can I help?"],
    },
    {
      speaker: "EDITH",
      text: [
        "I've got quite a few things which need painting and fixing in the flat.",
        "And I wonder whether you'd be able to do the work.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "I'm sure I'll be able to help, but let me take down a few details.",
      ],
    },
    {
      speaker: "EDITH",
      text: ["Yes, of course."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Well, uh, firstly, how did you hear about us?"],
    },
    {
      speaker: "EDITH",
      text: [
        "It was my friend May Hampton.",
        "You did some excellent work for her a couple of years ago.",
        "Do you remember?",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Oh, yes.", "That was in West Park flats, lovely lady."],
    },
    {
      speaker: "EDITH",
      text: ["Yes, she is."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["And what's your name please?"],
    },
    {
      speaker: "EDITH",
      text: [{ text: "It's Edith Pargetter.", number: 1 }],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Edith, can you spell your surname please?"],
    },
    {
      speaker: "EDITH",
      text: ["It's PARGETTER."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Double T. Right.", "And do you live in West Park Flats as well?"],
    },
    {
      speaker: "EDITH",
      text: [{ text: "No, actually it's East Park.", number: 2 }, "Flat 4."],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "Oh, right, that's over the road, I seem to remember, quite difficult to get to.",
      ],
    },
    {
      speaker: "EDITH",
      text: [{ text: "Yes, it's at the back of the library.", number: 3 }],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Right, I know.", "And what's your phone number?"],
    },
    {
      speaker: "EDITH",
      text: [
        "8 7 five, nine three four, but I'm out a great deal in the afternoons and evenings.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        {
          text: "So would the best time to ring you be in the morning?",
          number: 4,
        },
      ],
    },
    {
      speaker: "EDITH",
      text: ["Yes."],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "Fine.",
        "I've made a note of that.",
        "Can I just ask, I'll be in a van, and I know parking is rather difficult around your flats.",
        "Where would you recommend?",
      ],
    },
    {
      speaker: "EDITH",
      text: [
        {
          text: "Well, I always tell people in larger vehicles to park by the post box on the other side of the road from the entrance.",
          number: 5,
        },
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Good, thanks."],
    },
    {
      speaker: "EDITH",
      text: ["And will you be able to give me a full itemized quote?"],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        {
          text: "Oh yes, I'll list all the jobs separately with individual prices.",
          number: 6,
        },
      ],
    },
    {
      speaker: "EDITH",
      text: ["That would be a great help."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["No problem."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Now, what would you like me to do?"],
    },
    {
      speaker: "EDITH",
      text: [
        "Firstly, and most urgently, is in the kitchen.",
        "With all the weather damage, the glass in the door has cracked, and I'd need that fixing.",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["I presume you mean replacing."],
    },
    {
      speaker: "EDITH",
      text: [{ text: "Oh yes, and as soon as possible.", number: 7 }],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "What I'll do is come round tomorrow morning and do that immediately.",
      ],
    },
    {
      speaker: "EDITH",
      text: [
        "Oh, thank you so much.",
        "The other things aren't so urgent, but..",
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Now, I'll make a note of everything you want doing."],
    },
    {
      speaker: "EDITH",
      text: ["Well, in the kitchen, I'd like some painting doing."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["All the kitchen walls?"],
    },
    {
      speaker: "EDITH",
      text: [
        {
          text: "Just the area over the cooker. It's very greasy...",
          number: 8,
        },
      ],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Right, it does tend to get that way."],
    },
    {
      speaker: "EDITH",
      text: ["Yes."],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "Well, if you want a proper job done, what I'd need to do is strip the old paint and plaster it about a week before I paint it.",
      ],
    },
    {
      speaker: "EDITH",
      text: [{ text: "Of course.", number: 9 }],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Now, May tells me you also do work in the garden."],
    },
    {
      speaker: "EDITH",
      text: ["That's right."],
    },
    {
      speaker: "EDITH",
      text: ["Well, I'd like you to replace a fence."],
    },
    {
      speaker: "MR THORNDYKE",
      text: [{ text: "Just one.", number: 10 }],
    },
    {
      speaker: "EDITH",
      text: ["Yes, at the far end."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["Fine, shouldn't be a problem."],
    },
    {
      speaker: "EDITH",
      text: ["And that's the lot."],
    },
    {
      speaker: "MR THORNDYKE",
      text: [
        "Fine, yeah, as I say, I can come round tomorrow morning to look over things with you.",
      ],
    },
    {
      speaker: "EDITH",
      text: ["Well, that's great.", "Thank you."],
    },
    {
      speaker: "MR THORNDYKE",
      text: ["So, I'll look forward to seeing you tomorrow at..."],
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
      if (speaker === "TC EMPLOYEE")
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
    1: "Pargetter",
    2: "East",
    3: "library",
    4: "morning",
    5: "postbox",
    6: "prices",
    7: "glass",
    8: "cooker",
    9: "week",
    10: "fence",
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
    localStorage.setItem("/2017/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2017/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/listening");
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
                {renderText("Thorndyke's builders")}
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
            {renderText("Questions 1–6")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* Notes Section (Questions 1-6) */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg mb-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              {renderText("THORNDYKE'S BUILDERS")}
            </h1>

            <ul className="list-none space-y-5 text-lg">
              <li>
                {renderText(
                  "(Example) Customer heard about Thorndyke's from a "
                )}
                <span className="font-bold">{renderText("friend")}</span>
              </li>

              <li>
                {renderText("Name: Edith")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                  type="text"
                />
              </li>

              <li>
                {renderText("Address: Flat 4,")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                  type="text"
                />
                {renderText(" Park Flats (Behind the")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2 w-32"
                  type="text"
                />
                {renderText(")")}
              </li>

              <li>{renderText("Phone number: 875934")}</li>

              <li>
                {renderText("Best time to contact customer: during the")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                  type="text"
                />
              </li>

              <li>
                {renderText("Where to park: opposite entrance next to the")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                  type="text"
                />
              </li>

              <li>
                {renderText("Needs full quote showing all the jobs and the")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                  type="text"
                />
              </li>
            </ul>
          </div>

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 7–10")}
          </h2>
          <h3 className="text-lg mb-5">
            {renderText("Complete the table below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* Table Section (Questions 7-10) */}
          <div className="">
            <table className="w-full border border-gray-400 text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-3 text-left">
                    {renderText("Area")}
                  </th>
                  <th className="border border-gray-400 p-3 text-left">
                    {renderText("Work to be done")}
                  </th>
                  <th className="border border-gray-400 p-3 text-left">
                    {renderText("Notes")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    rowSpan="2"
                    className="border border-gray-400 p-3 align-top "
                  >
                    {renderText("Kitchen")}
                  </td>
                  <td className="border border-gray-400 p-3 align-top">
                    {renderText("Replace the")}
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
                      className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                      type="text"
                    />
                    {renderText("in the door")}
                  </td>
                  <td className="border border-gray-400 p-3 align-top">
                    {renderText("Fix tomorrow")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-3 align-top">
                    {renderText("Paint wall above the")}
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
                      className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                      type="text"
                    />
                  </td>
                  <td className="border border-gray-400 p-3 align-top">
                    {renderText("Strip paint and plaster approximately one")}
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
                      className="border-2 rounded-md px-2 py-1 mx-2 w-32"
                      type="text"
                    />
                    <br />
                    {renderText("in advance")}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-3 align-top">
                    {renderText("Garden")}
                  </td>
                  <td className="border border-gray-400 p-3 align-top">
                    {renderText("One")}
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
                      className="border-2 rounded-md px-2 py-1 mx-2 w-40"
                      type="text"
                    />
                    {renderText("needs replacing (end of garden)")}
                  </td>
                  <td className="border border-gray-400 p-3 align-top"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Submit and Result Section */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  {renderText("Submit Answers")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText("Your Score: ")}
                    {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–10)")}
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
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{userAnswers[num]}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
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
      <Listening4Pagination2015></Listening4Pagination2015>
    </div>
  );
};

export default Test4Listening2015;
