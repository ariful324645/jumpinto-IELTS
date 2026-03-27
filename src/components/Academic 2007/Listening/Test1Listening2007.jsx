import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Test1Listening2007 = () => {
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
        "Section 1, you will hear a man telephoning a sports club to ask about membership and facilities.",
        "First, you have some time to look at questions 1 to 4.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Good morning, oh, sorry, it's gone 12. I'll start again. Uh. Good afternoon, Kingswell Sports Club. How can I help you?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, good afternoon. I was wondering if you could give me some information about membership and facilities.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The name of the sports club is Kingswell. So, Kingswell has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully, and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Good morning, oh, sorry, it's gone 12. I'll start again. Uh. Good afternoon, Kingswell Sports Club. How can I help you?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, good afternoon. I was wondering if you could give me some information about membership and facilities.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Of course. What would you like to know?"],
    },
    {
      speaker: "MAN",
      text: ["Do you have tennis courts for example?"],
    },
    {
      speaker: "WOMAN",
      text: ["No, I'm afraid we don't. We're primarily a golf club."],
    },
    {
      speaker: "MAN",
      text: ["What about football? I heard you had a team."],
    },
    {
      speaker: "WOMAN",
      text: [
        "No, I'm sorry. Perhaps you're thinking about Fresham Sports Center.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, right. I know it. I've played badminton there."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Have you? They've got a lot of facilities we don't have, and vice versa.",
        { text: "We do have a keep fit studio.", number: 1 },
        { text: "There's swimming of course.", number: 2 },
      ],
    },
    {
      speaker: "MAN",
      text: ["That's good, I like to swim every day."],
    },
    {
      speaker: "WOMAN",
      text: [
        "We have a range of classes too.",
        { text: "We're currently running a range of yoga classes.", number: 3 },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "What about relaxing after exercise? I assume you have a restaurant or something.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "At the moment, we've got a salad bar, which is very popular.",
          number: 4,
        },
        "We'll also have a fully licensed restaurant by the end of the year.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10.",
        "Now listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["What kind of membership are you interested in?"],
    },
    {
      speaker: "MAN",
      text: ["Um. Not really sure. Uh. What are the options?"],
    },
    {
      speaker: "WOMAN",
      text: ["Well, there are 3 different membership schemes."],
    },
    {
      speaker: "WOMAN",
      text: [
        "The first one's called Gold.",
        { text: "It's now £500 for the annual subscription fee.", number: 5 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "The next one is Silver.",
        { text: "You have to pay £1 per lesson.", number: 6 },
        {
          text: "You can only use the facilities between 10 am and 4:30 pm.",
          number: 7,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "The Bronze scheme would probably suit you best.",
        { text: "The annual fee is £180.", number: 8 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "We book you in for an assessment with an instructor.",
          number: 9,
        },
        { text: "You'll need to speak to David KYNCHLEY.", number: 10 },
      ],
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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

const correctAnswers = {
  1: "keep fit studio",
  2: "swimming",
  3: "yoga",
  4: "salad bar",
  5: "500",
  6: "1",
  7: "10",
  8: "180",
  9: "assessment",
  10: "Kynchley",
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
                {renderText(
                  "Man Inquires about Kingswell Sports Club Membership and Facilities",
                )}
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
            {renderText("Questions 1–4")}
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
              {renderText("NOTES ON SPORTS CLUB")}
            </h1>

            {/* Example Name of Club */}
            <p className="text-lg">
              {renderText("(Example) Name of club: Kingswell")}
            </p>

            {/* Main Sport */}
            <p className="text-lg">{renderText("Main sport: Golf")}</p>

            {/* Facility 1 */}
            <p className="text-lg">
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Facility 2 */}
            <p className="text-lg">
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Classes Available */}
            <p className="text-lg">
              {renderText("Classes available: Kick-boxing")}
            </p>

            {/* Additional Class */}
            <p className="text-lg">
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Additional Facility */}
            <p className="text-lg">
              {renderText("Additional facility:")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              <span className="ml-2">
                {renderText("(restaurant opening soon)")}
              </span>
            </p>
          </div>

          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 5-8")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br />
              {renderText("Write NO MORE THAN TWO NUMBERS for each answer.")}
            </h3>

            <h2 className="text-lg font-bold text-center mb-3">
              {renderText("MEMBERSHIP SCHEMES")}
            </h2>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">Type</th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Use of facilities")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Cost of classes")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {" "}
                    {renderText("Times")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {" "}
                    {renderText("Joining fee")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {" "}
                    {renderText("Annual subscription fee")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* GOLD */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("GOLD")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("ALL")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("  Free")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("  Any time")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("  £250")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("   £ ")}
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
                      className="w-[80px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* SILVER */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("    SILVER")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("All")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("£")}
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    from
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    {renderText("am to 4:30 pm")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("£225")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("£300")}
                  </td>
                </tr>

                {/* BRONZE */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("BRONZE")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("Restricted")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("£3")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("from 10:30 to 3:30 weekdays only")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    {renderText("£50")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    £
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
                      className="w-[80px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          {/* box*/}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 9-10")}
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
            {/* Question 9 */}
            <p className="text-lg">
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
              {renderText(
                "To join the centre, you need to book an instructor's",
              )}
              <input
                value={userAnswers[9] || ""}
                onChange={(e) => handleInputChange(9, e.target.value)}
                className="mx-2 border rounded-md px-2 py-1 w-40"
              />
              .
            </p>

            {/* Question 10 */}
            <p className="text-lg">
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
              {renderText("To book a trial session, speak to David")}
              <input
                value={userAnswers[10] || ""}
                onChange={(e) => handleInputChange(10, e.target.value)}
                className="mx-2 border rounded-md px-2 py-1 w-40"
              />
              {renderText("(0458 95311).")}
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
      {/* <Listening1Pagination></Listening1Pagination> */}
    </div>
  );
};

export default Test1Listening2007;
