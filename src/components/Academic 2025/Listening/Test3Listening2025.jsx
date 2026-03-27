import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2025 from "../Pagination 2025/Listening3Pagination2025";

const Test3Listening2025 = () => {
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
        "Part 1. You will hear a woman phoning the owner of a house she is going to rent about companies that she could rent furniture from.",
        "First, you have some time to look at questions 1 to 5.",
        "Now listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning."],
    },
    {
      speaker: "SHELLEY MAYER",
      text: [
        "Hi, this is Shelley Mayer.",
        "I'm renting your house on Archwood Avenue.",
        "I'm due to move in next week.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh yes, hello, Ms Mayer.", "What can I do for you?"],
    },
    {
      speaker: "SHELLEY MAYER",
      text: [
        "When I viewed the house, I told you I'll most probably need to rent some furniture,",
        "at least until I know whether my temporary work contract is going to be made permanent.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, of course.",
        "I remember.",
        "And I said I could give you some information about furniture rental companies in the city.",
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["That's right."],
    },
    {
      speaker: "MAN",
      text: [
        "Well, the biggest company is called Peak Rentals.",
        "I've recommended them to other people,",
        "and I've always heard positive reports about them.",
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["Could you give me an idea of their costs?"],
    },
    {
      speaker: "MAN",
      text: [
        "Sure, I actually have one of their brochures here.",
        "It says the monthly price per room starts at $105 and goes up to $239.",
        {
          text: "That depends on which rooms you need furniture for, of course.",
          number: 1,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: [
        "Sure.",
        "It's just to get a general idea of how much it's gonna cost.",
        "And you said you had some positive feedback about this company.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes.",
        {
          text: "People have mentioned that the furniture from Peak Rentals is more modern than any of the other companies.",
          number: 2,
        },
        "And also, once you place an order, the furniture will be delivered to you in just one or two days.",
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["That would be really helpful."],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, and the brochure says that there's a special offer at the moment,",
        "if you rent living room furniture.",
        "I believe that's a set of chairs and a TV table.",
        {
          text: "You'll also get a lamp at no extra cost.",
          number: 3,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: [
        "Ok, but you know that price range you gave is more than I was hoping to pay.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Then you could try Aaron and Oliver.",
          number: 4,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["Sorry, what and Oliver?"],
    },
    {
      speaker: "MAN",
      text: ["Aaron, double A R O N."],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["Ok, are they cheaper?"],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "I'd say they're a mid price company, but if you chose them, you need to be aware that they charge an extra twelve percent every month in case of damage.",
          number: 5,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["I see.", "I'd have to do the math carefully then."],
    },
    {
      speaker: "MAN",
      text: [
        "Right.",
        "But one helpful thing is that they also do cleaning for customers.",
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["For the furniture?"],
    },
    {
      speaker: "MAN",
      text: ["For the house."],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["Oh, I see.", "I probably won't need that."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation,",
        "you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "There's another company called Larch Furniture.",
        "It's quite new,",
        "and it has the lowest prices in town.",
        {
          text: "That's for both furniture and also electronic equipment.",
          number: 6,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: [
        "Well, that would be good.",
        "I'm not bringing much with me,",
        "and I won't have much time to go shopping after I start my job.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "There are two things you need to know about Larch Furniture.",
        "First of all, you have to take out insurance on the furniture,",
        {
          text: "and you need to organize that yourself.",
          number: 7,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["That wouldn't be too hard."],
    },
    {
      speaker: "MAN",
      text: [
        "Also, you can't take out a contract for less than six months.",
        "But I figure that might not be a problem for you.",
        "You're renting the house for twelve months after all, aren't you?",
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["Yes.", "OK.", "Well, I..."],
    },
    {
      speaker: "MAN",
      text: [
        "Sorry to interrupt.",
        "I just thought of another furniture rental company.",
        {
          text: "It's called Space Rentals, and it's located very near to the house.",
          number: 8,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["OK."],
    },
    {
      speaker: "MAN",
      text: [
        "I don't have any information about their charges.",
        {
          text: "So it's best to use their app to find out what it would cost you to use them.",
          number: 9,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: ["OK, thanks.", "I'll do that."],
    },
    {
      speaker: "MAN",
      text: [
        "One good thing about that company is that if you don't like the furniture once it's delivered,",
        {
          text: "you can request exchanges, as long as you do that within a week of receiving it.",
          number: 10,
        },
      ],
    },
    {
      speaker: "SHELLEY MAYER",
      text: [
        "That sounds really great.",
        "Ok, well thanks very much, that's so helpful.",
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
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "SHELLEY MAYER") {
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
    1: "105", // Prices range from $105 to $___ per room per month
    2: "sturdy", // The furniture is very sturdy
    3: "delivery", // Special offer: free delivery with every living room set
    4: "larch", // Company name: Larch Furniture (example)
    5: "fee", // Mid-range prices 12% monthly fee
    6: "secondhand", // Offers cheapest prices for renting furniture and secondhand items
    7: "vehicle", // Must have own vehicle
    8: "months", // Minimum contract length: six months
    9: "website", // See the website for up-to-date prices
    10: "insurance", // Extra column/note: insurance
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
                {renderText("Furniture Rental Company Consultation")}
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
            {renderText("Complete the table below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Table Box ---------- */}
          <div className="border rounded-lg overflow-x-auto bg-white">
            <table className="min-w-full text-lg border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">
                    {renderText("Name of company")}
                  </th>
                  <th className="border px-4 py-2 text-left">
                    {renderText("Information about costs")}
                  </th>
                  <th className="border px-4 py-2 text-left">
                    {renderText("Additional notes")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {renderText("Peak Rentals")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("Prices range from $105 to $")}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                    {renderText(" per room per month")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("The furniture is very")}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                    <br />
                    {renderText("Delivers in 1-2 days")}
                    <br />
                    {renderText("Special offer: free")}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {renderText("and Oliver")}
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
                      value={userAnswers[3] || ""}
                      onChange={(e) => handleInputChange(3, e.target.value)}
                      className="border rounded-md px-2 py-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("Mid-range prices 12% monthly fee for")}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("Also offers a cleaning service")}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {renderText("Larch Furniture")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText(
                      "Offers cheapest prices for renting furniture and",
                    )}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("Must have own")}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {renderText("Rentals")}
                    <div>
                      {" "}
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
                        className="border rounded-md px-2 py-1 w-20"
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("six months")}
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
                      className="border rounded-md px-2 py-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("See the")}
                    <button
                      onClick={() => toggleButton(10)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[9]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      10
                    </button>
                    <input
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="border rounded-md px-2 py-1 w-20"
                    />
                    {renderText(" for the most up-to-date prices")}
                  </td>
                </tr>

                {/* Row 5 */}
              </tbody>
            </table>
          </div>

          {/* ---------- Submit / Result Section ---------- */}
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
      <Listening3Pagination2025></Listening3Pagination2025>
    </div>
  );
};

export default Test3Listening2025;
