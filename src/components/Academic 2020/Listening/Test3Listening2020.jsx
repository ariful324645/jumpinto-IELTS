import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Listening3Pagination2020 from "../Pagination/Listening3Pagination/Listening3Pagination2020";

const Test3Listening2020 = () => {
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
        "Part 1.You will hear a woman who works at an employment agency talking to a man about jobs he could apply for.",
        "First, you have some time to look at questions 1 to 5.",
        "Now listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "SALLY",
      text: [
        "Good morning, thanks for coming in to see us here at the agency, Joe.",
        "I'm one of the agency representatives, and my name's Sally Baker.",
      ],
    },
    {
      speaker: "JOE",
      text: ["Hi, Sally. I think we spoke on the phone, didn't we?"],
    },
    {
      speaker: "SALLY",
      text: [
        "That's right, we did.",
        "So, thank you for sending in your cv.",
        "We've had quite a careful look at it, and I think we have two jobs that might be suitable for you.",
      ],
    },
    { speaker: "JOE", text: ["OK."] },

    {
      speaker: "SALLY",
      text: [
        "The first one is in a company based in North London.",
        "They're looking for an administrative assistant.",
      ],
    },
    {
      speaker: "JOE",
      text: ["OK, what sort of company is it?"],
    },
    {
      speaker: "SALLY",
      text: [
        "Uh. They're called Home Solutions.",
        { text: "And they design and make furniture.", number: 1 },
      ],
    },
    {
      speaker: "JOE",
      text: ["Oh, I don't know much about that, but it sounds interesting."],
    },
    {
      speaker: "SALLY",
      text: [
        "Yes, well as I said, they want someone in their office, and looking at your past experience.",
        "It does look as if you fit quite a few of the requirements.",
        "So on your cv, it appears you've done some data entry.",
      ],
    },
    { speaker: "JOE", text: ["Yes."] },

    {
      speaker: "SALLY",
      text: [
        "So that's one skill they want.",
        {
          text: "Then they expect the person they appoint to attend meetings and take notes there.",
          number: 2,
        },
      ],
    },
    {
      speaker: "JOE",
      text: ["OK, I've done that before, yes."],
    },
    {
      speaker: "SALLY",
      text: ["And you'd need to be able to cope with general admin."],
    },
    {
      speaker: "JOE",
      text: [
        "Filing, and keeping records and so on? That should be OK.",

        {
          text: "And in my last job, I also had to manage the diary.",
          number: 3,
        },
      ],
    },
    {
      speaker: "SALLY",
      text: [
        "Excellent. That's something they want here too.",
        "I'd suggest you add it to your cv.",
        "I don't think you mentioned that, did you?",
      ],
    },
    { speaker: "JOE", text: ["No."] },

    {
      speaker: "SALLY",
      text: [
        "So as far as the requirements go, they want good computer skills of course.",
        "And they particularly mention spreadsheets.",
      ],
    },
    {
      speaker: "JOE",
      text: ["That should be fine."],
    },
    {
      speaker: "SALLY",
      text: [
        "And interpersonal skills, which would be something they'd check with your references.",
      ],
    },
    {
      speaker: "JOE",
      text: ["I think that should be OK, yes."],
    },
    {
      speaker: "SALLY",
      text: [
        {
          text: "Hmm, and then they mention that they want someone who is careful and takes care with details.",
          number: 4,
        },
        "Just looking at your cv, I'd say you're probably all right there.",
      ],
    },

    {
      speaker: "JOE",
      text: ["I think so, yes. Do they want any special experience?"],
    },

    {
      speaker: "SALLY",
      text: ["I think they wanted some experience of teleconferencing."],
    },
    {
      speaker: "JOE",
      text: ["Oh, I've got 3 years experience of that."],
    },
    {
      speaker: "SALLY",
      text: [
        "Uh huh, let's see.",
        "Yes, good.",
        {
          text: "In fact they're only asking for at least one year, so that's great.",
          number: 5,
        },
        "So is that something that might interest you?",
      ],
    },

    {
      speaker: "JOE",
      text: [
        "It is, yes.",
        "The only thing is you said they were in North London, so it would be quite a long commute for me.",
      ],
    },
    { speaker: "SALLY", text: ["OK."] },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Listen and answer questions 6 to 10.",
      ],
    },

    {
      speaker: "SALLY",
      text: [
        "So the second position might suit you better, as far as the location goes.",
        "Uh. That's for a warehouse assistant, and that's in South London.",
      ],
    },
    {
      speaker: "JOE",
      text: ["Yes, that would be a lot closer."],
    },
    {
      speaker: "SALLY",
      text: ["And you've worked in a warehouse before, haven't you?"],
    },
    { speaker: "JOE", text: ["Yes."] },

    {
      speaker: "SALLY",
      text: [
        "So, as far as the responsibilities for this position go, they want someone who can manage the stock, obviously.",
        {
          text: "And also deliveries.",
          number: 6,
        },
      ],
    },
    {
      speaker: "JOE",
      text: [
        "That should be OK.",
        "You've got to keep track of stuff, but I've always been quite good with numbers.",
      ],
    },
    {
      speaker: "SALLY",
      text: [
        "Good. That's their first requirement, and they want someone who's computer literate, which we know you are.",
      ],
    },
    { speaker: "JOE", text: ["Sure."] },

    {
      speaker: "SALLY",
      text: [
        "Uh. Then they mention organizational skills.",
        "They want someone who's well organized.",
      ],
    },
    {
      speaker: "JOE",
      text: ["Yes, uh, I think I am."],
    },
    {
      speaker: "SALLY",
      text: [{ text: "And tidy?", number: 7 }],
    },
    {
      speaker: "JOE",
      text: ["Yes, they go together really, don't they?"],
    },

    {
      speaker: "SALLY",
      text: [
        "Sure. Then the usual stuff, they want someone who can communicate well both orally and in writing.",
      ],
    },
    {
      speaker: "JOE",
      text: [
        "OK, and for the last warehouse job I had, one of the things I enjoyed most was being part of a team.",
        "I found that was really essential for the job.",
      ],
    },

    {
      speaker: "SALLY",
      text: [
        "Excellent.",
        {
          text: "Yes, they do mention that they want someone who's used to that, yes.",
          number: 8,
        },
        "Now, when you were working in a warehouse last time, what sorts of items were you dealing with?",
      ],
    },

    {
      speaker: "JOE",
      text: [
        "It was mostly bathroom and kitchen equipment, sinks and stoves and fridges.",
      ],
    },

    {
      speaker: "SALLY",
      text: [{ text: "So you're OK moving heavy things?", number: 9 }],
    },
    {
      speaker: "JOE",
      text: ["Sure. I'm quite strong, and I've had the training."],
    },

    {
      speaker: "SALLY",
      text: [
        "Good. Now, as far as experience goes, they mention they want someone with a license, and that you have experience of driving in London.",
        "So you can cope with the traffic and so on.",
      ],
    },

    { speaker: "JOE", text: ["Yes, no problem."] },

    {
      speaker: "SALLY",
      text: [
        {
          text: "And you've got experience of warehouse work And the final thing they mention is customer service,I think looking at your cv, you're OK there.",
          number: 10,
        },
      ],
    },

    {
      speaker: "JOE",
      text: [
        "Right. So what about pay? Can you tell me a bit more about that please?",
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

      if (speaker === "JOE")
        return voices.find((v) => v.name.includes("David")) || voices[0];
      // Erica: female
      if (speaker === "SALLY") {
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
    1: "furniture",
    2: "meetings",
    3: "the diary",
    4: "detail",
    5: "one year",
    6: "deliveries",
    7: "tidy",
    8: "team",
    9: "heavy",
    10: "customer",
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
    localStorage.setItem("/listening3Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2020/Test 3/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 3/listening");
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
                {renderText("Employment Agency")}
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
          {/* box section */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Employment Agency: Possible Jobs")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-xl font-bold mb-4">
                {renderText("First Jobs")}
              </h1>
              <li className="text-lg">
                <span>
                  {renderText(
                    "Administrative assistant in a company that produces"
                  )}
                </span>
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
                <span>{renderText("(North London)")}</span>
              </li>

              <li className="text-lg font-bold">
                {renderText("Responsibilities")}
              </li>

              <li className="text-lg">{renderText("data entry")}</li>

              <li className="text-lg">
                <span>{renderText("go to")}</span>
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
                <span>{renderText("and take notes")}</span>
              </li>

              <li className="text-lg">{renderText("general admin")}</li>

              <li className="text-lg">
                <span>{renderText("management of")}</span>
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
              </li>

              <li className="text-lg font-bold">
                {renderText("Requirements")}
              </li>

              <li className="text-lg">
                {renderText("good computer skills including spreadsheets")}
              </li>
              <li className="text-lg">
                {renderText("good interpersonal skills")}
              </li>

              <li className="text-lg">
                <span>{renderText("attention to")}</span>
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
              </li>

              <li className="text-lg font-bold">{renderText("Experience")}</li>

              <li className="text-lg">
                <span>{renderText("need a minimum of")}</span>
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
                <span>{renderText("of experience of teleconferencing")}</span>
              </li>
            </ul>

            {/* ---------- Second Job ---------- */}
            <h1 className="text-xl font-bold text-center mt-10 mb-4">
              {renderText("Second Job")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Warehouse assistant in South London")}
              </li>

              <li className="text-lg font-bold">
                {renderText("Responsibilities")}
              </li>

              <li className="text-lg">{renderText("stock management")}</li>

              <li className="text-lg">
                <span>{renderText("managing")}</span>
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

              <li className="text-lg font-bold">
                {renderText("Requirements")}
              </li>

              <li className="text-lg">
                {renderText("ability to work with numbers")}
              </li>
              <li className="text-lg">{renderText("good computer skills")}</li>

              <li className="text-lg">
                <span>{renderText("very organised and")}</span>
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
              </li>

              <li className="text-lg">
                {renderText("good communication skills")}
              </li>

              <li className="text-lg">
                <span>{renderText("used to working in a")}</span>
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
              </li>

              <li className="text-lg">
                <span>{renderText("able to cope with items that are")}</span>
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
              </li>

              <li className="text-lg font-bold">
                {renderText("Need experience of")}
              </li>

              <li className="text-lg">{renderText("driving in London")}</li>
              <li className="text-lg">{renderText("warehouse work")}</li>

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
                <span>{renderText("service")}</span>
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
      <Listening3Pagination2020></Listening3Pagination2020>
    </div>
  );
};

export default Test3Listening2020;
