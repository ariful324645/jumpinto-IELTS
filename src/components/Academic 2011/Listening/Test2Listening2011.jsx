import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Test2Listening2011 = () => {
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
        "Section 1, you will hear a conversation between a representative of an insurance company and a customer.",
        "First, you have some time to look at questions 1 to 3.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "Good morning. Total Insurance. Judy speaking. How may I help you?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: [
        "I recently shipped my belongings from overseas back here to Australia, and I took out insurance with your company.",
        "Uh. Some items were damaged during the move, so I need to make a claim. What do I have to do?",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "OK, well, first I need to get a few details about this. Can you give me your name, please?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: ["Yes, it's Michael Alexander."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The man's name is Michael Alexander. So Michael Alexander has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 3.",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "Good morning. Total Insurance. Judy speaking. How may I help you?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: [
        "I recently shipped my belongings from overseas back here to Australia, and I took out insurance with your company.",
        "Uh. Some items were damaged during the move, so I need to make a claim. What do I have to do?",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "OK, well, first I need to get a few details about this. Can you give me your name, please?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: ["Yes, it's Michael Alexander."],
    },
    {
      speaker: "JUDY",
      text: ["OK, and your address please?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "My old address or my current one?",
        {
          text: "It's 24 Manly Street. Milperra near Sydney.",
          number: 1,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: ["What was the suburb, sorry?"],
    },
    {
      speaker: "MICHAEL",
      text: ["Milperra. MILPERRA."],
    },
    {
      speaker: "JUDY",
      text: ["Right. Now, who was the shipping agent, Mr Alexander?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Hmm. You mean the company we used?",

        {
          text: "Oh, it was... er... First Class Movers.",
          number: 2,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: ["OK, uh, where were the goods shipped from?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "China, but the ship came via Singapore, and was there for about a week.",
        {
          text: "It left on the 11th of October and got to Sydney on the 28th of November.",
          number: 3,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "OK, I need one more thing. There's a reference number. It should be in the top right-hand corner of the pink form they gave you.",
      ],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Uh. Let me have a look. I have so many papers. Uh. Yes, here it is. It's 601ACK.",
      ],
    },
    {
      speaker: "JUDY",
      text: ["Thanks."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 4 to 10.",
        "Now listen and answer questions 4 to 10.",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "I need to take down a few details of the actual damage over the phone before you put in a full report.",
        "Can you tell me how many items were damaged, and what the damage was?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Yes, well, four things actually. I'll start with the big things. My TV first of all, it's a large one, very expensive.",
      ],
    },
    {
      speaker: "JUDY",
      text: ["Our Insurance doesn't cover electrical problems."],
    },
    {
      speaker: "MICHAEL",
      text: [
        "It isn't an electrical problem. ",
        {
          text: "The screen has a huge crack in it, so it's unusable.",
          number: 4,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: ["I see. Any idea of the price to repair it?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "No. Well, I don't think it can be repaired. It will need a new one.",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "OK, I'll make a note of that, and we'll see what we can do. Now, what was the second item?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: [
        {
          text: "The cabinet from the bathroom was damaged as well.",
          number: 5,
        },
        " It's a lovely cabinet, we use it to keep our towels in.",
      ],
    },
    {
      speaker: "JUDY",
      text: ["And what is the extent of the damage?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Well, the back and the sides seem OK, but the door has a huge hole in it.",
        {
          text: "It can't be repaired. I'm really not very happy about it.",
          number: 6,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: ["And how much do you think it will cost to replace it?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Well, when I bought it last year, I paid $125 for it.",
        {
          text: " But the one I've seen here in Sydney is a bit more expensive, it's $140.",
          number: 7,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: ["Right, and what was the third item?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "My dining room table, it's a lovely table from Indonesia. ",
        {
          text: "It must have been very hot inside the container, because one leg has completely split down the middle.",
          number: 8,
        },
        "The top and the other 3 look OK, thank goodness.",
      ],
    },
    {
      speaker: "JUDY",
      text: ["Any idea of the price to repair it?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Well, I had an estimate done on this actually, because it is a very special table to us. They quoted us $200 which is really pricey. So I hope the insurance will cover the total cost.",
      ],
    },
    {
      speaker: "JUDY",
      text: [
        "I'm sure that will be fine. Uh. What was the last item, Mr Alexander?",
      ],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Well, we have a lovely set of china plates and dishes, you know, with matching cups, saucers, the lot. ",
        {
          text: "They were all in the one box, which must have got dropped, because some plates were broken, 6 actually.",
          number: 9,
        },
      ],
    },
    {
      speaker: "JUDY",
      text: ["And can you tell me the replacement value of these?"],
    },
    {
      speaker: "MICHAEL",
      text: [
        "Well, it's hard to say, because they were part of a set, but they can be up to $10 each, as it's such a good set.",
        {
          text: " OK, so that would be around $60 altogether.",
          number: 10,
        },
      ],
    },
    {
      speaker: "MICHAEL",
      text: ["Yes, that's right."],
    },
    {
      speaker: "JUDY",
      text: ["And is that all of the items?"],
    },
    {
      speaker: "MICHAEL",
      text: ["Yes, so what do I have to do now?"],
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
      if (speaker === "JUDY") {
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
  1: "Milperra", // Address suburb
  2: "First Class Movers", // Shipping agent
  3: "28th of November", // Date of arrival
  4: "screen", // Television damage
  5: "cabinet", // Cabinet damaged
  6: "door", // Cabinet part damaged
  7: "140", // Cost to replace cabinet
  8: "leg", // Dining table damage
  9: "plates", // Set of china broken items
  10: "60", // Cost to replace china
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
                {renderText("Making an Insurance Claim for Damaged Shipment")}
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
            {renderText("Questions 1–3")}
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

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("TOTAL INSURANCE INCIDENT REPORT")}
            </h1>

            {/* Example Name */}
            <p className="text-lg">
              {renderText("(Example) Name: Michael Alexander")}
            </p>

            {/* Address */}
            <p className="text-lg">
              {renderText("Address: 24 Manly Street,")}
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
              {renderText(", Sydney")}
            </p>

            {/* Shipping Agent */}
            <p className="text-lg">
              {renderText("Shipping agent:")}
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

            {/* Place of Origin */}
            <p className="text-lg">{renderText("Place of origin: China")}</p>

            {/* Date of Arrival */}
            <p className="text-lg">
              {renderText("Date of arrival:")}
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

            {/* Reference Number */}
            <p className="text-lg">{renderText("Reference number: 601 ACK")}</p>
          </div>

          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 4-10")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br />
              {renderText("Write ONE WORD AND/OR A NUMBER for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Item")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Damage")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Cost to repair/replace")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Television */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Television")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    The{" "}
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    needs to be replaced
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("not known")}
                  </td>
                </tr>

                {/* Cabinet */}
                <tr>
               
                  <td className="border border-gray-400 p-2">
                    The{" "}
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                     cabinet
                  </td>
                  <td className="border border-gray-400 p-2">
                    The{" "}
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    of the cabinet is damaged
                  </td>
                  <td className="border border-gray-400 p-2">
                    $
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
                      className="mx-1 w-[80px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>

                {/* Dining room table */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Dining room table")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    A{" "}
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    is split
                  </td>
                  <td className="border border-gray-400 p-2">$200</td>
                </tr>

                {/* Set of china */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Set of china")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    Six{" "}
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
                      className="mx-1 w-[80px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    were broken
                  </td>
                  <td className="border border-gray-400 p-2">
                    about $
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
                      className="mx-1 w-[80px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    in total
                  </td>
                </tr>
              </tbody>
            </table>
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
      {/* <Listening1Pagination></Listening1Pagination> */}
    </div>
  );
};

export default Test2Listening2011;
