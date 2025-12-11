import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2017 from "../Pagination2017/Listening2Pagination2017";

const Test2Listening2017 = () => {
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
        "Section 1. You will hear a woman phoning a box office to ask about a festival in the town of Kenton.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning, Kenton Festival box office. How can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, good morning. I'm coming to Kenton for a few days' holiday next month. And a friend told me there's a festival. She gave me this number to find out about it.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's right. The festival begins on the 16th of May, and goes on till the 19th.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, that's great. I'll be there from the 15th till the 19th."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The festival starts on the 16th of May, so 16th has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning, Kenton Festival box office. How can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, good morning. I'm coming to Kenton for a few days' holiday next month, and a friend told me there's a festival. She gave me this number to find out about it.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's right, the festival begins on the 16th of May, and goes on till the 19th.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, that's great. I'll be there from the 15th till the 19th. So, could you tell me the program, please?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Well, on the first day, there's the opening ceremony in the town center. ",
        {
          text: "People start gathering around 2 o'clock, to get a good place to see from, and the events will start at 2.45, and finish about 5.30.",
          number: 1,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, thanks. I'll make sure I get there early to get a good spot.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "The festival will be officially opened by the mayor. He'll just speak for a few minutes, welcoming everyone to the festival. All the town councillors will be there, and of course lots of other people.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right."],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Then there'll be a performance by a band.",
          number: 2,
        },
        "Most years we have a children's choir, but this year the local army cadets offered to perform, and they're very good.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Uh-huh."],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "After that, a community group from the town will perform a play they've written themselves, just a short one.",
          number: 3,
        },
        "It's about Helen Tungate. I don't know if you've heard of her.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I certainly have. ",
        {
          text: "She was a scientist years ago.",
          number: 4,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's right. She was born in Kenton exactly 100 years ago, so we're celebrating her centenary.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I'm a biologist, so I've always been interested in her. I didn't realize she came from Kenton.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes. Well, all that will take place in the afternoon, and later as the sun sets, there'll be a firework display. You should go to the park to watch, as you'll get the best view from there.",
        {
          text: "And the display takes place on the opposite side of the river.",
          number: 5,
        },
        "It's always one of the most popular events in the festival.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Sounds great."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["And what's happening on the other days?"],
    },
    {
      speaker: "MAN",
      text: [
        "There are several events that go on the whole time. .",
        {
          text: "For example, the students of the art college have produced a number of videos, all connected with relationships between children and their grandparents",
          number: 6,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "That sounds interesting. It makes a change from children and parents, doesn't it?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Ha, exactly, uh, because the art college is in use for classes throughout the festival.",
        { text: " The videos are being shown in Handsworth House.", number: 7 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["How do you spell the name?"],
    },
    {
      speaker: "MAN",
      text: ["HANDSWORTH. Handsworth House, it's close to the Town Hall."],
    },
    {
      speaker: "WOMAN",
      text: ["Right."],
    },
    {
      speaker: "MAN",
      text: ["Now let me see, what else can I tell you about?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Are there any displays of ballet dancing? I'm particularly interested in that, as I do it as a hobby.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "There isn't any ballet, I'm afraid, but there'll be a demonstration of traditional dances from all round the country.",
          number: 8,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, that would be nice. Where is that being held?"],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "It's in the market in the town center, the outdoor one, not the covered market.",
          number: 9,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Lovely. I'm interested in all kinds of dancing, so I'm sure I'll enjoy that.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Hmm, I'm sure you will."],
    },
    {
      speaker: "WOMAN",
      text: ["And I'd really like to go to some concerts, if there are any."],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, there are several, three performed by professionals, and one by local children.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["And where is it being held?"],
    },
    {
      speaker: "MAN",
      text: [
        "It's in the library. Which is in Part Street, on the 18th at 6.30 in the evening.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["I presume I'll need tickets for that."],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, you can book online.",
        {
          text: " Or you can buy them when you arrive in Kenton, either at the festival box office or from any shops displaying our logo in the windows.",
          number: 10,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, I think that'll keep me busy for the whole of my stay in Kenton. Thank you so much for all your help.",
      ],
    },
    {
      speaker: "MAN",
      text: ["You're welcome. I hope you enjoy your stay."],
    },
    {
      speaker: "WOMAN",
      text: ["Thank you. Goodbye."],
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
    1: "2.45",
    2: "army cadets",
    3: "play",
    4: "scientist",
    5: "river",
    6: "grandparents",
    7: "College",
    8: "traditional",
    9: "farmers'",
    10: "logo",
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
    localStorage.setItem("/2017/Test 2/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2017/Test 2/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 2/listening");
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
                {renderText("Events during Kenton Festival")}
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
              {renderText("Events during Kenton Festival")}
            </h1>

            {/* ---------- Opening Ceremony Section ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Opening ceremony (first day)")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Start date: 16th May")}
              </li>

              <li className="text-lg">
                <span>{renderText("In town centre, starting at")}</span>

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
                <span>{renderText("The mayor will make a speech")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("A")}</span>

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

                <span>{renderText("will perform")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Performance of a")}</span>

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

                <span>{renderText("about Helen Tungate (a")}</span>

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

                <span>{renderText(")")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Evening fireworks display situated across the")}
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
              </li>
            </ul>

            {/* ---------- Other Events Section ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Other events")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  {renderText(
                    "Videos about relationships that children have with their"
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

                <span>{renderText("Venue:")}</span>

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

                <span>{renderText("House")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Performance of")}</span>

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

                <span>{renderText("dances")}</span>

                <span>{renderText("Venue: the")}</span>

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

                <span>{renderText("market in the town centre")}</span>
              </li>

              <li className="text-lg">
                {renderText(
                  "Time: 2 and 5 pm every day except 1st day of festival"
                )}
              </li>

              <li className="text-lg">
                {renderText(
                  "Several professional concerts and one by children"
                )}
                <br />
                {renderText("Venue: library")}
                <br />
                {renderText("Time: 6.30 pm on the 18th")}
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Tickets available online from festival box office and from shops which have the festival"
                  )}
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

                <span>{renderText("in their windows")}</span>
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
      <Listening2Pagination2017></Listening2Pagination2017>
    </div>
  );
};

export default Test2Listening2017;
