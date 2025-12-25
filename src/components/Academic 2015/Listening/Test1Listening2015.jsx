import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";
// import Listening1Pagination2017 from "../Pagination2017/Listening1Pagination2017";

const Test1Listening2015 = () => {
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
        "Section 1. You will hear a telephone conversation between a travel agent and a customer.",
        "First, you have some time to look at questions 1 to 6.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "Good morning, World Tours. My name is Jamie. How can I help you?",
      ],
    },
    {
      speaker: "ANDREA",
      text: [
        "Good morning. I want some information on self-drive tours in the USA.",
        "Could you send me a brochure?",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Of course. Could I have your name please?"],
    },
    {
      speaker: "ANDREA",
      text: ["Andrea Brown."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The customer's name is Andrea Brown, so Brown has been written in the space.",
        "Now we shall begin.",
        "You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "Good morning, World Tours. My name is Jamie. How can I help you?",
      ],
    },
    {
      speaker: "ANDREA",
      text: [
        "Good morning, I want some information on self-drive tours in the USA.",
        "Could you send me a brochure?",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Of course. Could I have your name please?"],
    },
    {
      speaker: "ANDREA",
      text: ["Andrea Brown."],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Thank you. And your address?"],
    },
    {
      speaker: "ANDREA",
      text: [{ text: "24 Ardleigh Road.", number: 1 }],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Can you spell that?"],
    },
    {
      speaker: "ANDREA",
      text: ["ARDLEIGH Road."],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Post code?"],
    },
    {
      speaker: "ANDREA",
      text: ["BH5 2OP."],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Thanks, and can I have your phone number?"],
    },
    {
      speaker: "ANDREA",
      text: ["Is a mobile all right?"],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Fine."],
    },
    {
      speaker: "ANDREA",
      text: ["It's 07786643091."],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "Thank you. And can I ask you where you heard about World Tours?",
        "From a friend, or did you see an advert somewhere?",
      ],
    },
    {
      speaker: "ANDREA",
      text: [{ text: "I read about you in the newspaper.", number: 2 }],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "OK, I'll get the brochures in the post to you.",
        "But can I give you some information over the phone?",
        "What kinds of things do you want to do on your holiday?",
      ],
    },
    {
      speaker: "ANDREA",
      text: [
        "I'm interested in going to California with my family.",
        "I've got two children, and we want to hire a car.",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "The first tour begins in Los Angeles, and there's plenty of time to visit some of the theme parks there.",
        { text: "Theme parks are included.", number: 3 },
      ],
    },
    {
      speaker: "ANDREA",
      text: [
        "That's something on my children's list, so I'd want to include that.",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "Then you drive to San Francisco.",
        "From there, you go to Yosemite Park where you spend a couple of nights.",
        "You can stay in a lodge or on a campsite.",
      ],
    },
    {
      speaker: "ANDREA",
      text: [
        { text: "I don't like the idea of staying in a tent.", number: 4 },
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Right. And the tour ends in Las Vegas."],
    },
    {
      speaker: "ANDREA",
      text: [
        {
          text: "Someone told me there's a really nice castle near Cambria.",
          number: 5,
        },
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: ["Hearst Castle is on that road, so you could stop there."],
    },
    {
      speaker: "ANDREA",
      text: [{ text: "That's good for beaches, isn't it?", number: 6 }],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "The first tour lasts 12 days and covers 2,020 kilometres.",
        { text: "The total distance is 2,020 km.", number: 7 },
        "The cost is £525 per person.",
        { text: "Meals are not included.", number: 8 },
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        "The second trip lasts nine days and costs £429 per person.",
        { text: "It is almost £100 cheaper.", number: 9 },
      ],
    },
    {
      speaker: "TRAVEL AGENT",
      text: [
        {
          text: "Flights are not included, but dinner is provided.",
          number: 10,
        },
      ],
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
    1: "ardleigh",
    2: "newspaper",
    3: "theme",
    4: "campsite",
    5: "castle",
    6: "beach",
    7: "2020",
    8: "flight",
    9: "429",
    10: "dinner",
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
                {renderText("Self-drive tours in USA")}
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
            {renderText("Questions 1–6")}
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
              {renderText("SELF-DRIVE TOURS IN THE USA")}
            </h1>

            {/* ---------- Example Section ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Name: Andrea Brown")}
              </li>

              <li className="text-lg">
                <span>{renderText("Address: 24")}</span>

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

                <span>{renderText("Road")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Postcode: BH5")}</span>

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

                <span>{renderText("OP")}</span>
              </li>

              <li className="text-lg">
                {renderText("Phone (mobile): 077 8664 3091")}
              </li>
            </ul>

            {/* ---------- Possible Tours ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Possible self-drive tours")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  {renderText(
                    "Trip One: Los Angeles – customer wants to visit some"
                  )}
                </span>

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

                <span>{renderText("parks with her children")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Yosemite Park – wants to stay in a lodge, not a"
                  )}
                </span>

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
                <span>{renderText("Trip Two – wants to see the")}</span>

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

                <span>{renderText("on the way to Cambria")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("At San Diego, wants to spend time on the")}
                </span>

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
            </ul>
          </div>
          <div className="space-y-6 leading-relaxed p-4">
            <h1 className="text-2xl font-bold text-center mb-5">
              {renderText("Self-drive tour details")}
            </h1>

            <table className="w-full border border-gray-400 text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2">
                    {renderText("Trip")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Number of days")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Total distance")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Price (per person)")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Includes")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* ---------- Trip One ---------- */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("Trip One")}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {renderText("12 days")}
                  </td>

                  <td className="border border-gray-400 p-2">
                    <button
                      onClick={() => toggleButton(7)}
                      className={`mx-2 h-8 w-8 rounded-full font-semibold border ${
                        activeButtons[7]
                          ? "bg-yellow-400 border-yellow-500 text-white"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      7
                    </button>
                    <input
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="w-[100px] border rounded-md px-2 py-1"
                      type="text"
                    />
                    <span className="ml-2">{renderText("km")}</span>
                  </td>

                  <td className="border border-gray-400 p-2">
                    {renderText("£525")}
                  </td>

                  <td className="border border-gray-400 p-2 space-y-1">
                    <div>{renderText("accommodation")}</div>
                    <div>{renderText("car")}</div>
                    <div className="flex items-center gap-2">
                      {renderText("one")}
                      <button
                        onClick={() => toggleButton(8)}
                        className={`h-8 w-8 rounded-full font-semibold border ${
                          activeButtons[8]
                            ? "bg-yellow-400 border-yellow-500 text-white"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        8
                      </button>
                      <input
                        value={userAnswers[8] || ""}
                        onChange={(e) => handleInputChange(8, e.target.value)}
                        className="w-[120px] border rounded-md px-2 py-1"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>

                {/* ---------- Trip Two ---------- */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("Trip Two")}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {renderText("9 days")}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {renderText("980 km")}
                  </td>

                  <td className="border border-gray-400 p-2">
                    <span>{renderText("£")}</span>
                    <button
                      onClick={() => toggleButton(9)}
                      className={`mx-2 h-8 w-8 rounded-full font-semibold border ${
                        activeButtons[9]
                          ? "bg-yellow-400 border-yellow-500 text-white"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      9
                    </button>
                    <input
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="w-[100px] border rounded-md px-2 py-1"
                      type="text"
                    />
                  </td>

                  <td className="border border-gray-400 p-2 space-y-1">
                    <div>{renderText("accommodation")}</div>
                    <div>{renderText("car")}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleButton(10)}
                        className={`h-8 w-8 rounded-full font-semibold border ${
                          activeButtons[10]
                            ? "bg-yellow-400 border-yellow-500 text-white"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        10
                      </button>
                      <input
                        value={userAnswers[10] || ""}
                        onChange={(e) => handleInputChange(10, e.target.value)}
                        className="w-[120px] border rounded-md px-2 py-1"
                        type="text"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      <Listening1Pagination2015></Listening1Pagination2015>
    </div>
  );
};

export default Test1Listening2015;
