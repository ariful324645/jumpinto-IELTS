import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";

const Listening3Part22015 = () => {
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
        "Section 1. You will hear a man interviewing a woman in the street about her use of transport.",
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
        "Oh, lovely.",
        "The survey is on behalf of the local council.",
        "They'd like to know about what transport you use, and any suggestions for improvement.",
        "Can I start by asking you how you traveled to town today?",
      ],
    },
    {
      speaker: "LUISA",
      text: ["Sure, I came on the bus."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The woman traveled to town by bus, so bus has been written in the space.",
        "Now we shall begin.",
        "You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 5.",
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
        "Oh, lovely.",
        "The survey is on behalf of the local council.",
        "They'd like to know about what transport you use, and any suggestions for improvement.",
        "Can I start by asking you how you traveled to town today?",
      ],
    },
    {
      speaker: "LUISA",
      text: ["Sure, I came on the bus."],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "Great.",
        "Now can I get a few details about yourself?",
        "OK, what's your name?",
      ],
    },
    {
      speaker: "LUISA",
      text: [
        "It's Luisa.",
        {
          text: "Hardie.",
          number: 1,
        },
      ],
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
      text: [
        {
          text: "It's 19 White Stone Road.",
          number: 2,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Oh, right, I know that area.", "It's Bradfield, isn't it?"],
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
      text: [
        {
          text: "It's actually GT82LC.",
          number: 3,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Great, and could I ask what your job is?", "Are you a student?"],
    },
    {
      speaker: "LUISA",
      text: [
        "I've actually just finished my training.",
        {
          text: "I'm a hairdresser.",
          number: 4,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "All right, and one more question in this section.",
        "What is the reason for you coming into town today?",
      ],
    },
    {
      speaker: "LUISA",
      text: [
        "Actually, it's not for shopping today, which would be my normal reason.",
        {
          text: "But to see the dentist.",
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
          text: "Well, something I've thought about for some time is that when I do walk, and I'm doing a later shift, I think the lighting should be better.",
          number: 6,
        },
        "And of course, I think it's a real shame they've been cutting down on the number of footpaths.",
        "They should have more of those.",
        "Then people would walk more.",
        {
          text: "And I don't think there are enough trains.",
          number: 7,
        },
        "That's why I don't use them.",
        "You have to wait so long.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Thanks, and finally, I'd like to ask your opinion on cycling."],
    },
    {
      speaker: "LUISA",
      text: [
        "Well, where I work, there are no safe places to leave your bikes.",
        {
          text: "",
          number: 8,
        },
        "Also I'd have to cycle uphill, and on a hot day I'd arrive at work pretty sweaty.",
        {
          text: "So, I think I need a shower somewhere at work.",
          number: 9,
        },
        {
          text: "And I wouldn't feel confident cycling on busy roads. I'd like training for that.",
          number: 10,
        },
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "Well, that's very helpful.",
        "Thank you very much for your time.",
      ],
    },
    {
      speaker: "LUISA",
      text: ["No problem. Bye."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 1.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "According to the manager, what do most people like about the job of kitchen assistant?",
    "The manager is concerned about some of the new staff's",
    "The manager says that the day is likely to be busy for kitchen staff because",
    "Only kitchen staff who are 18 or older are allowed to use",
    "What is one reason the job of kitchen assistant can be stressful?",
    "What is another reason the job of kitchen assistant can be stressful?",
  ];

  const options = [
    [
      "A. the variety of work",
      "B. the friendly atmosphere",
      "C. the opportunities for promotion",
    ],

    ["A. jewellery.", "B. hair styles.", "C. shoes."],

    [
      "A. it is a public holiday.",
      "B. the head chef is absent.",
      "C. the restaurant is almost fully booked.",
    ],

    [
      "A. the waste disposal unit.",
      "B. the electric mixer.",
      "C. the meat slicer.",
    ],
    [
      "A. They have to follow orders immediately.",
      "B. The kitchen gets very hot.",
      "C. They may not be able to take a break.",
    ],
    [
      "A. They have to do overtime.",
      "B. The work is physically demanding.",
      "C. They have to clean customer areas.",
    ],
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 11;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

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
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JOY PARKINS") {
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
    // Questions 11 and 12 (Choose TWO: A and C)
    11: "A", // the gym (recently refurbished with 10 new running machines)
    12: "C", // the indoor pool (expanded to eight lanes, making it much wider)

    // Questions 13–20 (Notes completion)
    13: "health problems",
    14: "safety rules",
    15: "plan",
    16: "joining",
    17: "free entry",
    18: "peak",
    19: "guests",
    20: "photo card",
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
    localStorage.setItem("/listening2Part32018", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32018");
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
            <h1 className="text-xl font-bold">{renderText("    PART 2")}</h1>
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
        <div className="p-4 max-w-4xl mx-auto overflow-y-scroll">
          {/* ---------- Transport Survey ---------- */}

          <p className="mb-4">
            {renderText("Complete the notes below.")} <br />
            {renderText("Write ONE WORD AND/OR A NUMBER for each answer.")}
          </p>

          <div className="border p-5 rounded-lg bg-white space-y-4">
            <h2 className="text-lg font-bold mb-3 text-center">
              {renderText("Transport Survey")}
            </h2>
            {/* Example */}
            <p className="flex items-center gap-2">
              {renderText("(Example) Travelled to town today: by")}
              <span className="font-semibold">bus</span>
            </p>

            {/* Circle style */}
            {/* w-9 h-9 border-2 rounded-full flex items-center justify-center */}

            {/* 1 */}
            <p className="flex items-center gap-3">
              {renderText("Name: Luisa")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                1
              </span>
              <input
                type="text"
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* 2 */}
            <p className="flex items-center gap-3">
              {renderText("Address:")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                2
              </span>
              <input
                type="text"
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("White Stone Rd")}
            </p>

            {/* Area */}
            <p>{renderText("Area: Bradfield")}</p>

            {/* 3 */}
            <p className="flex items-center gap-3">
              {renderText("Postcode:")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                3
              </span>
              <input
                type="text"
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* 4 */}
            <p className="flex items-center gap-3">
              {renderText("Occupation:")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                4
              </span>
              <input
                type="text"
                value={userAnswers[4] || ""}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* 5 */}
            <p className="flex items-center gap-3">
              {renderText("Reason for visit to town: to go to the")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                5
              </span>
              <input
                type="text"
                value={userAnswers[5] || ""}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* Suggestions */}
            <p className="font-semibold mt-4">
              {renderText("Suggestions for improvement:")}
            </p>

            {/* 6 */}
            <p className="flex items-center gap-3">
              {renderText("better")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                6
              </span>
              <input
                type="text"
                value={userAnswers[6] || ""}
                onChange={(e) => handleInputChange(6, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            <p>{renderText("have more footpaths")}</p>

            {/* 7 */}
            <p className="flex items-center gap-3">
              {renderText("more frequent")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                7
              </span>
              <input
                type="text"
                value={userAnswers[7] || ""}
                onChange={(e) => handleInputChange(7, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* Cycling */}
            <p className="font-semibold mt-4">
              {renderText("Things that would encourage cycling to work:")}
            </p>

            {/* 8 */}
            <p className="flex items-center gap-3">
              {renderText("having")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                8
              </span>
              <input
                type="text"
                value={userAnswers[8] || ""}
                onChange={(e) => handleInputChange(8, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("parking places for bicycles")}
            </p>

            {/* 9 */}
            <p className="flex items-center gap-3">
              {renderText("being able to use a")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                9
              </span>
              <input
                type="text"
                value={userAnswers[9] || ""}
                onChange={(e) => handleInputChange(9, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("at work")}
            </p>

            {/* 10 */}
            <p className="flex items-center gap-3">
              {renderText("the opportunity to have cycling")}
              <span className="w-9 h-9 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                10
              </span>
              <input
                type="text"
                value={userAnswers[10] || ""}
                onChange={(e) => handleInputChange(10, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("on busy roads")}
            </p>
          </div>
        </div>
      </div>
      <Listening3Pagination2015></Listening3Pagination2015>
    </div>
  );
};

export default Listening3Part22015;
