import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";

const Test2Listening2018 = () => {
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
      "Section 1.You will hear a woman phoning the secretary of a cycling club to find out about becoming a member.",
      "First, you have some time to look at questions 1 to 6.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "JIM",
    text: ["Hello, South City Cycling Club."],
  },
  {
    speaker: "WOMAN",
    text: ["Oh, hi.Um. I want to find out about joining the club."],
  },
  {
    speaker: "JIM",
    text: [
      "Right, I can help you there.I'm the club secretary, and my name's Jim Hunter.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Oh, hi, Jim."],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "The club secretary's name is Jim Hunter, so Hunter has been written in the space.",
      "Now we shall begin.",
      "You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully, and answer questions 1 to 6.",
    ],
  },
  {
    speaker: "JIM",
    text: ["Hello, South City Cycling Club."],
  },
  {
    speaker: "WOMAN",
    text: ["Oh, hi.Um. I want to find out about joining the club."],
  },
  {
    speaker: "JIM",
    text: [
      "Right, I can help you there.I'm the club secretary, and my name's Jim Hunter.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Oh, hi, Jim."],
  },
  {
    speaker: "JIM",
    text: ["So, are you interested in membership for yourself?"],
  },
  {
    speaker: "WOMAN",
    text: ["That's right."],
  },
  {
    speaker: "JIM",
    text: [
      "OK, well there are basically two types of adult membership.",
      "If you're pretty serious about cycling, there's the full membership.",

      {
        text: "That costs $260, and that covers you not just for ordinary cycling, but also for races both here in the city and also in other parts of Australia.",
        number: 1,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Right.Well I'm not really up to that standard.",
      "I was more interested in just joining a group to do some cycling in my free time.",
    ],
  },
  {
    speaker: "JIM",
    text: [
      "Sure, that's why most people join.",
      "So, in that case, you'd be better with the recreational membership.",
      "That's $108 if you're over 19, and ninety five dollars if you're under.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["I'm 25."],
  },
  {
    speaker: "JIM",
    text: [
      "OK.",
      "It's paid quarterly, and you can upgrade it later to the full membership if you want to, of course.",
      "Now both types of membership include the club fee of $20.",

      {
        text: "They also provide insurance in case you have an accident, though we hope you won't need that, of course.",
        number: 2,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "No, OK.",
      "Well, I'll go with the recreational membership, I think.",
      "And that allows me to join in the club activities and so on.",
    ],
  },
  {
    speaker: "JIM",
    text: [
      "That's right.",
      "And once you're a member of the club, you're also permitted to wear our kit when you're out cycling.",
      "It's green and white.",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Yes, I've seen cyclists wearing it.",
      "So can I buy that at the club?",
    ],
  },
  {
    speaker: "JIM",
    text: [
      "Uh. No, it's made to order by a company in Brisbane.",
      "You can find them online.",

      { text: "They're called Jerriz.", number: 3 },
      "That's JERRIZ.",
      "You can use your membership number to put in an order on their website.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["OK, now can you tell me a bit about the rides I can do?"],
  },
  {
    speaker: "JIM",
    text: [
      "Sure, so we have training rides pretty well every morning, and they're a really good way of improving your cycling skills as well as your general level of fitness.",
      "But they're different levels.",
      "Level A is pretty fast, you're looking at about 30 or 35 kilometers an hour.",

      {
        text: "If you can do about 25 km an hour, you'd probably be level B, and then level C are the novices who stay at about 15 km per hour.",
        number: 4,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Right.Well, I reckon I'd be level B.So when are the sessions for that level?",
    ],
  },
  {
    speaker: "JIM",
    text: [
      "Uh. There are a couple each week.",
      "They're both early morning sessions.",
      "There's one on Tuesdays, and for that one you meet at 5:30 am.",

      { text: "And the meeting point's the stadium.", number: 5 },
      "Do you know where that is?",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Yes, it's quite near my home, in fact.OK, and how about the other one?",
    ],
  },
  {
    speaker: "JIM",
    text: [
      {
        text: "That's on Thursdays, it starts at the same time, but they meet at the main gate to the park.",
        number: 6,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Is that the one just past the shopping mall?"],
  },
  {
    speaker: "JIM",
    text: ["That's it."],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
      "Now listen and answer questions 7 to 10.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["So how long are the rides?"],
  },
  {
    speaker: "JIM",
    text: [
      "Uh. They're about an hour and a half.",
      "So if you have a job, it's easy to fit in before you go to work.",

      {
        text: "And the members often go somewhere for coffee afterwards, so it's quite a social event.",
        number: 7,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "OK, that sounds good.",
      "I've only just moved to the city, so I don't actually know many people yet.",
    ],
  },
  {
    speaker: "JIM",
    text: ["Well, it's a great way to meet people."],
  },
  {
    speaker: "WOMAN",
    text: ["And does each ride have a leader?"],
  },
  {
    speaker: "JIM",
    text: [
      { text: "Sometimes, but not always.", number: 8 },
      "But you don't really need one.",
      "The group members on the ride support one another anyway.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["How would we know where to go?"],
  },
  {
    speaker: "JIM",
    text: [
      {
        text: "If you check the club website, you'll see that the route for each ride is clearly marked.",
        number: 9,
      },
      "So you can just print that out and take it along with you.",
      "It's similar from one week to another, but it's not always exactly the same.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["And what do I need to bring?"],
  },
  {
    speaker: "JIM",
    text: [
      "Hmm. Well, bring a bottle of water and your phone.",
      "You shouldn't use it while you're cycling, but have it with you.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Right."],
  },
  {
    speaker: "JIM",
    text: [
      {
        text: "And in winter, it's well before sunrise when we set out, so you need to make sure your bike's got lights.",
        number: 10,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "That's OK.Well, thanks, Jim.I'd definitely like to join.So what's the best way of going about it?",
    ],
  },
  {
    speaker: "JIM",
    text: ["Uh. You can..."],
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "JIM") {
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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

const correctAnswers = {
  1: "city",
  2: "insurance",
  3: "Jerriz",
  4: "25",
  5: "stadium",
  6: "main gate ",
  7: "coffee",
  8: "leader",
  9: "route",
  10: "lights",
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
    localStorage.setItem("/2018/Test 2/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2018/Test 2/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 2/listening");
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
                {renderText("South City Cycling Club")}
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
          {/* box */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("South City Cycling Club")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Membership")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Name of club secretary: Jim Hunter")}
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Full membership costs $260; this covers cycling and"
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
                <span>{renderText("all over Australia.")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Recreational membership costs $108")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Cost of membership includes the club fee and")}
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
                <span>{renderText(".")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("The club kit is made by a company called")}
                </span>
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
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Training rides")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Chance to improve cycling skills and fitness")}
              </li>

              <li className="text-lg">
                <span>{renderText("Level B: speed about")}</span>
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
                <span>{renderText("kph")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Weekly sessions — Tuesdays at 5.30 am, meet at the"
                  )}
                </span>
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
                <span>{renderText(".")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Thursdays at 5.30 am, meet at the entrance to the"
                  )}
                </span>
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

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Further information")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Rides are about an hour and a half")}
              </li>

              <li className="text-lg">
                <span>{renderText("Members often have")}</span>
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
                <span>{renderText("together afterwards.")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("There is not always a")}</span>
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
                <span>{renderText("with the group on these rides.")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Check and print the")}</span>
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
                <span>{renderText("on the website beforehand.")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Bikes must have")}</span>
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
                <span>{renderText(".")}</span>
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
      {/* <Listening1Pagination2020></Listening1Pagination2020> */}
    </div>
  );
};

export default Test2Listening2018;
