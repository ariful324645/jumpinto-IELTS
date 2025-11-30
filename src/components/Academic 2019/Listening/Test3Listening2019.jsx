import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2019 from "../Pagination/Listening3Pagination2019";

const Test3Listening2019 = () => {
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

  //   voice
  const [voices, setVoices] = useState([]);

  // Load voices
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const allVoices = synth.getVoices();
      if (allVoices.length) setVoices(allVoices);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 1. You will hear a man phoning the customer services manager of a hotel to get information about holding a conference there.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "ANGELA",
      text: ["Hello, Flanders Conference Hotel."],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, hi, I wanted to ask about conference facilities at the hotel.",
        "Have I come through to the right person?",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        "Hmm. You have. I'm the customer services manager. My name's Angela.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The name of the customer services manager is Angela. So Angela has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "ANGELA",
      text: ["Hello, Flanders Conference Hotel."],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, hi, I wanted to ask about conference facilities at the hotel.",
        "Have I come through to the right person?",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        "Hmm. You have. I'm the customer services manager. My name's Angela.",
        "So, how can I help you?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Well, I'm calling from Barrett and Stansons. We're a medical company based in Perth.",
      ],
    },
    {
      speaker: "ANGELA",
      text: ["Oh, yes."],
    },
    {
      speaker: "MAN",
      text: [
        "And we're organizing a conference for our clients to be held in Sydney.",
        "It'll be held over two days, and we're expecting about 50 or 60 people.",
      ],
    },
    {
      speaker: "ANGELA",
      text: ["When were you thinking of having it?"],
    },
    {
      speaker: "MAN",
      text: [
        "Sometime early next year, like the end of January. It would have to be a weekend.",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        "Uh. Let me see. Our conference facilities are already booked for the weekend beginning January the 28th.",
        "We could do the first weekend in February.",
      ],
    },
    {
      speaker: "MAN",
      text: ["How about January the 21st?"],
    },
    {
      speaker: "ANGELA",
      text: ["Ah, oh, I'm afraid that's booked too."],
    },
    {
      speaker: "MAN",
      text: ["Well, let's go for the February date then."],
    },
    {
      speaker: "ANGELA",
      text: ["So, that's the weekend beginning the 4th."],
    },
    {
      speaker: "MAN",
      text: [
        "OK, now can you tell me a bit about what conference facilities you have?",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        {
          text: "Sure, uh, so for talks and presentations, we have the Tesla room.",
          number: 1,
        },
        "That's spelled T-E-S-L-A.It holds up to 100 people, and it's fully equipped with a projector and so on.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "How about a microphone?",
          number: 2,
        },
      ],
    },
    {
      speaker: "ANGELA",

      text: [
        "And there'll be one that members of the audience can use too, for questions if necessary.",

        {
          text: "Yes, that'll be all set up ready for you.",
          number: 2,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Fine. And we'll also need some sort of open area where people can sit and have a cup of coffee.",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        {
          text: "And we'd like to have an exhibition of our products and services there as well, so that'll need to be quite a big space.",
          number: 3,
        },
        "That's fine. There's a central atrium with all those facilities, and you can come before the conference starts if you want to set everything up.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Great, and I presume there's wifi",
          number: 4,
        },
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        {
          text: "Oh, yes. That's free and available throughout the hotel.",
          number: 4,
        },
        "OK, would you also like us to provide a buffet lunch?",
        "We can do a two course meal with a number of different options.",
      ],
    },
    {
      speaker: "MAN",
      text: ["What sort of price are we looking at for that?"],
    },
    {
      speaker: "ANGELA",
      text: [
        "Well, I can send you a copy of the standard menu.",
        {
          text: "That's $45 per person, or you can have the special for $25 more.",
          number: 5,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["I think the standard should be OK, but yes, send me the menu."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Now, we're also going to need accommodation on the Saturday night for some of the participants.",
        "I'm not sure how many, but probably about 25. So, what do you charge for a room?",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        "Well, for conference attendees, we have a 25% reduction.",
        { text: "So we can offer you rooms at $135.", number: 6 },
        "Normally a standard room's $180.",
      ],
    },
    {
      speaker: "MAN",
      text: ["And does that include breakfast?"],
    },
    {
      speaker: "ANGELA",
      text: [
        "Sure, and of course guests can also make use of all the other facilities at the hotel.",
        "So we've got a spa where you can get massages and facials and so on.",
        {
          text: " And there's a pool up on the roof for the use of guests.",
          number: 7,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh. Great. Now what about transport links? The hotel's downtown, isn't it?",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        {
          text: "Yes, it's about 12 km from the airport, but there's a complimentary shuttle bus for guests, and it's only about 10 minutes' walk from the Central Railway Station.",
          number: 8,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "OK. Now, I don't know Sydney very well. Can you just give me an idea of the location of the hotel?",
      ],
    },
    {
      speaker: "ANGELA",
      text: [
        {
          text: "Uh. Well, it's downtown on Wilby Street. That's quite a small street, and it's not very far from the sea.",
          number: 9,
        },
        "And of course, if the conference attendees want to go out on their Saturday evening, there's a huge choice of places to eat.",
        {
          text: "Then, if they want to make a night of it, they can go on to one of the clubs in the area. There are a great many to choose from.",
          number: 10,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "OK. So, if we go ahead with this, can you give me some information about how much we're looking at?",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 1.",
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
      if (speaker === "ANGELA")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "MAN")
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
    1: "Tesla",
    2: "microphones",
    3: "exhibition",
    4: "wifi",
    5: "45",
    6: "135",
    7: "pool",
    8: "airport",
    9: "sea",
    10: "clubs",
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
    localStorage.setItem("/2019/Test 3/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2019/Test 3/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2019/Test 3/listening");
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
                {renderText("Flanders conference hotel")}
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
              {renderText("FLANDERS CONFERENCE HOTEL")}
            </h1>

            {/* ---------- Section 1: Hotel Information ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  {renderText("(Example) Customer Services Manager:")}
                </span>
                <span className="ml-2 font-semibold">
                  {renderText("Angela")}
                </span>
              </li>

              <li className="text-lg">
                <span>{renderText("Date available: weekend beginning")}</span>
                <input
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("4th")}</span>
              </li>

              <h2 className="text-lg font-bold mt-6">
                {renderText("Conference facilities")}
              </h2>

              <li className="text-lg">
                <span>{renderText("the")}</span>
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
                <span>{renderText("room for talks (projector and")}</span>
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
                <span>{renderText("available)")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("area for coffee and an")}</span>
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

              <li className="text-lg">
                <span>{renderText("free")}</span>
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
                <span>{renderText("throughout")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("a standard buffet lunch costs $")}</span>
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
                <span>{renderText("per head")}</span>
              </li>

              <h2 className="text-lg font-bold mt-6">
                {renderText("Accommodation")}
              </h2>

              <li className="text-lg">
                <span>{renderText("Rooms will cost $")}</span>
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
                <span>{renderText("including breakfast")}</span>
              </li>

              <h2 className="text-lg font-bold mt-6">
                {renderText("Other facilities")}
              </h2>

              <li className="text-lg">
                <span>
                  {renderText("The hotel also has a spa and rooftop")}
                </span>
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
                <span>
                  {renderText("There's a free shuttle service to the")}
                </span>
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

              <h2 className="text-lg font-bold mt-6">
                {renderText("Location")}
              </h2>

              <li className="text-lg">
                <span>{renderText("Wilby Street (quite near the")}</span>
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
                <span>{renderText(")")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("near to restaurants and many")}</span>
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
      <Listening3Pagination2019></Listening3Pagination2019>
    </div>
  );
};

export default Test3Listening2019;
