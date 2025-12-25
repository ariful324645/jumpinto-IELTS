import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2015 from "../Pagination 2015/Listening2Pagination2015";
// import Listening1Pagination2017 from "../Pagination2017/Listening1Pagination2017";

const Test2Listening2015 = () => {
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
        "Section 1, you will hear a man interviewing a woman in the street about her use of transport.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Excuse me."],
    },
    {
      speaker: "LUISA",
      text: ["Yes?"],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "I wonder if you could spare a few minutes to do a survey on transport.",
        "It won't take long.",
      ],
    },
    {
      speaker: "LUISA",
      text: ["Uh. No, that's fine."],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "Oh, lovely. The survey is on behalf of the local council.",
        "They'd like to know about what transport you use, and any suggestions for improvement.",
        "Can I start by asking you how you traveled to town today?",
      ],
    },
    {
      speaker: "LUISA",
      text: [{ text: "I came on the bus.", number: 0 }], // Example
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The woman traveled to town by bus, so bus has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "Great. Now can I get a few details about yourself? OK, what's your name?",
      ],
    },
    {
      speaker: "LUISA",
      text: ["It's Luisa."],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Yes."],
    },
    {
      speaker: "LUISA",
      text: [{ text: "Hardie.", number: 1 }],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Can you spell that please?"],
    },
    {
      speaker: "LUISA",
      text: ["Yes, it's HARDIE."],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Great, thanks, and can I have your address?"],
    },
    {
      speaker: "LUISA",
      text: [{ text: "19 White Stone Road.", number: 2 }],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Oh, right, I know that area. It's Bradfield, isn't it?"],
    },
    {
      speaker: "LUISA",
      text: ["That's right."],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Is the postcode GT7?"],
    },
    {
      speaker: "LUISA",
      text: [{ text: "It's actually GT82LC.", number: 3 }],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Great, and could I ask what your job is? Are you a student?"],
    },
    {
      speaker: "LUISA",
      text: [
        {
          text: "I've actually just finished my training. I'm a hairdresser.",
          number: 4,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "All right, and one more question in this section. What is the reason for you coming into town today?",
      ],
    },
    {
      speaker: "LUISA",
      text: [
        {
          text: "Actually, it's not for shopping today, but to see the dentist.",
          number: 5,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Right, thanks."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the interview, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "Now, in this last section, I'd like you to give us some ideas about the facilities and arrangements in the city for getting to and from work.",
        "Any suggestions you have for improvements?",
      ],
    },
    {
      speaker: "LUISA",
      text: [
        {
          text: "When I walk in a later shift, I think the lighting should be better.",
          number: 6,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Yes, good point."],
    },
    {
      speaker: "LUISA",
      text: [{ text: "They should have more footpaths.", number: 7 }],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Yes, right."],
    },
    {
      speaker: "LUISA",
      text: [{ text: "I don't think there are enough trains.", number: 8 }],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Thanks, and finally, I'd like to ask your opinion on cycling."],
    },
    {
      speaker: "LUISA",
      text: [
        { text: "There are no safe places to leave bikes.", number: 9 },
        { text: "I would like a shower at work.", number: 10 },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Well, that's very helpful. Thank you very much for your time."],
    },
    {
      speaker: "LUISA",
      text: ["No problem. Bye."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1. You now have half a minute to check your answers.",
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
    1: "Hardie",
    2: "19",
    3: "GT82LC",
    4: "hairdresser",
    5: "dentist",
    6: "lighting",
    7: "trains",
    8: "safe",
    9: "shower",
    10: "lanes",
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

          {/* Box with Transport Survey */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("TRANSPORT SURVEY")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Travelled to town today: by ")}
                <span className="font-bold">{renderText("bus")}</span>
              </li>

              <li className="text-lg">
                {renderText("Name: Luisa")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("Address:")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText("White Stone Rd")}
              </li>

              <li className="text-lg">{renderText("Area: Bradfield")}</li>

              <li className="text-lg">
                {renderText("Postcode:")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("Occupation:")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("Reason for visit to town: to go to the")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("Suggestions for improvement: better")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("More frequent")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText(
                  "Things that would encourage cycling to work: having"
                )}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText("parking places for bicycles")}
              </li>

              <li className="text-lg">
                {renderText("Being able to use a")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText("at work")}
              </li>

              <li className="text-lg">
                {renderText("The opportunity to have cycling")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText("on busy roads")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Listening2Pagination2015></Listening2Pagination2015>
    </div>
  );
};

export default Test2Listening2015;
