import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2023 from "../Pagination 2023/Listening3Pagination2023";

const Test3Listening2023 = () => {
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
        "Part 1.",
        "You will hear a man talking to the coordinator of a photography club.",
        "First, you have some time to look at questions 1 to 4.",
        "Now listen carefully and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["Hello, Wayside Camera Club, Breda speaking."],
    },
    {
      speaker: "DAN",
      text: [
        "Oh, hello.",
        "Um. My name is Dan, and I'd like to join your club.",
      ],
    },
    {
      speaker: "BREDA",
      text: [
        "That's great, Dan.",
        "We have an application form.",
        "Would you like to complete it over the phone?",
        "Then you can ask any questions you might have.",
      ],
    },
    {
      speaker: "DAN",
      text: ["Oh, yes, thanks."],
    },
    {
      speaker: "BREDA",
      text: ["OK, so what's your family name?"],
    },
    {
      speaker: "DAN",
      text: ["It's Green, Dan Green."],
    },
    {
      speaker: "BREDA",
      text: ["So, can I take your email address?"],
    },
    {
      speaker: "DAN",
      text: ["Yes, it's dan1068@market.com."],
    },
    {
      speaker: "BREDA",
      text: ["Thanks, and what about your home address?"],
    },
    {
      speaker: "DAN",
      text: [
        "Well, I'm about 10 miles away from your club in Peacetown.",
        "I live in a house there.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["OK, so what's the house number and street?"],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: "It's 52 Marrowfield Street.",
          number: 1,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: ["Is that MARROWFIELD?"],
    },
    {
      speaker: "DAN",
      text: ["That's right."],
    },
    {
      speaker: "BREDA",
      text: ["And that's Peacetown, you said?"],
    },
    {
      speaker: "DAN",
      text: ["Uh huh."],
    },
    {
      speaker: "BREDA",
      text: [
        "So, how did you hear about our club?",
        "Did you look on the internet?",
      ],
    },
    {
      speaker: "DAN",
      text: [
        "I usually do that, but this time, well,",
        {
          text: "I was talking to a relative the other day, and he suggested it.",
          number: 2,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: ["Oh, is he a member too?"],
    },
    {
      speaker: "DAN",
      text: [
        "He belongs to another club,",
        "but he'd heard good things about yours.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["OK, so what do you hope to get from joining?"],
    },
    {
      speaker: "DAN",
      text: [
        "Well, one thing that really interests me is the competitions that you have.",
        "I enjoy entering those.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["Right, anything else?"],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: "Well, I also like to socialize with other photographers.",
          number: 3,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: ["That's great.", "So, what type of membership would you like?"],
    },
    {
      speaker: "DAN",
      text: ["What are the options?"],
    },
    {
      speaker: "BREDA",
      text: [
        "It's £30 a year for full membership,",
        "or £20 a year if you're an associate.",
      ],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: "I think I'll go for the full membership then.",
          number: 4,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: [
        "That's a good idea,",
        "because you can't vote in meetings with an associate membership.",
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
      speaker: "BREDA",
      text: ["If I could just find out a bit more about you."],
    },
    {
      speaker: "DAN",
      text: ["OK."],
    },
    {
      speaker: "BREDA",
      text: [
        "So, you said you wanted to compete.",
        "Have you ever won any photography competitions?",
      ],
    },
    {
      speaker: "DAN",
      text: ["Not yet, but I have entered 3 in the past."],
    },
    {
      speaker: "BREDA",
      text: [
        "Oh, that's interesting.",
        "So why don't you tell me something about those?",
        "Let's start with the first one.",
      ],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: 'Well, the theme was entitled "Domestic life".',
          number: 5,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: ["I see, so it had to be something related to the home."],
    },
    {
      speaker: "DAN",
      text: [
        "Yeah, I chose to take a photo of a family sitting around the dinner table having a meal.",
        "And I didn't win, but I did get some feedback.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["Oh, what did the judges say?"],
    },
    {
      speaker: "DAN",
      text: ["That it was too busy as a picture."],
    },
    {
      speaker: "BREDA",
      text: [
        "Aha – so it was the composition of the picture that they criticized?",
      ],
    },
    {
      speaker: "DAN",
      text: ["That's right."],
    },
    {
      speaker: "BREDA",
      text: ["So what was the theme of the second competition?"],
    },
    {
      speaker: "DAN",
      text: [
        "Well, my university was on the coast, and that area gets a lot of beautiful sunsets.",
        "So that was the theme.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["Oh sunsets, that's a great theme."],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: "Yes, the instructions were to capture the clouds as well.",
          number: 6,
        },
        "It couldn't just be blue sky and a setting sun.",
      ],
    },
    {
      speaker: "BREDA",
      text: ["Sure, cause they give you all those amazing pinks and purples."],
    },
    {
      speaker: "DAN",
      text: [
        "Yeah, and I thought I'd done that well,",
        "but the feedback was that I should have waited a bit longer to get the shot.",
      ],
    },
    {
      speaker: "BREDA",
      text: [
        {
          text: "I see. So the timing wasn't right.",
          number: 7,
        },
      ],
    },
    {
      speaker: "DAN",
      text: ["Yes, I took it too soon, basically."],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: "And then the third competition I entered was called Animal Magic.",
          number: 8,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: ["Well, that's a difficult subject."],
    },
    {
      speaker: "DAN",
      text: ["Ha, I know. I had to take hundreds of shots."],
    },
    {
      speaker: "BREDA",
      text: ["I'm sure, because animals move all the time."],
    },
    {
      speaker: "DAN",
      text: [
        {
          text: "That's what we had to show. There had to be some movement in the scene.",
          number: 9,
        },
        "I got a great shot of a fox in the end,",
        "but I took it at night, and well, I suspected that it was a bit dark,",
        {
          text: "which is what I was told.",
          number: 10,
        },
      ],
    },
    {
      speaker: "BREDA",
      text: [
        "Well, Dan, you seem to be really keen,",
        "and we'd be delighted to have you in our club.",
        "I'm sure we can help with all those areas that you've outlined.",
      ],
    },
    {
      speaker: "DAN",
      text: ["Thanks, that's great."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 1.",
        "You now have one minute to check your answers to Part 1.",
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
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "BREDA") {
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
    1: "marrowfield",
    2: "relative",
    3: "socialize",
    4: "full",
    5: "domestic life",
    6: "clouds",
    7: "timing",
    8: "animal magic",
    9: "movement",
    10: "dark",
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
                {renderText("Wayside Camera Club")}
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
            {renderText("Questions 1–4")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the form below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Form Box ---------- */}
          <div className="border p-6 max-w-2xl mx-auto rounded-lg space-y-4 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Wayside Camera Club membership form")}
            </h1>

            <p className="text-lg">{renderText("Name: Dan Green")}</p>

            <p className="text-lg">
              {renderText("Email address: dan1068@market.com")}
            </p>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Home address: 52")}
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
              {renderText(" Street, Peacetown")}
            </p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Heard about us: from a")}
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

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Reason for joining: to enter competitions to")}
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

            {/* Q4 */}
            <p className="text-lg">
              {renderText("Type of membership:")}
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
              {renderText(" membership (£30)")}
            </p>
          </div>

          {/* ---------- Questions 5–10 ---------- */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 5–10")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the table below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("NO MORE THAN TWO WORDS")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Table ---------- */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border  border-gray-400 text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">
                    {renderText("Title of competition")}
                  </th>
                  <th className="border p-2">{renderText("Instructions")}</th>
                  <th className="border p-2">
                    {renderText("Feedback to Dan")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border px-6 py-3 flex items-center p-2">
                    <button
                      onClick={() => toggleButton(5)}
                      className={`mx-1 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </td>
                  <td className="border p-2">
                    {renderText("A scene in the home")}
                  </td>
                  <td className="border p-2">
                    {renderText("The picture's composition was not good.")}
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border p-2">
                    {renderText("Beautiful Sunsets")}
                  </td>
                  <td className="border p-2">
                    {renderText("Scene must show some")}
                    <button
                      onClick={() => toggleButton(6)}
                      className={`mx-1 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                  </td>
                  <td className="border p-2">
                    {renderText("The")}
                    <button
                      onClick={() => toggleButton(7)}
                      className={`mx-1 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                    {renderText(" was wrong")}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border p-2">
                    <button
                      onClick={() => toggleButton(8)}
                      className={`mx-1 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </td>
                  <td className="border p-2">
                    {renderText("Scene must show")}
                    <button
                      onClick={() => toggleButton(9)}
                      className={`mx-1 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                  </td>
                  <td className="border p-2">
                    {renderText("The photograph was too")}
                    <button
                      onClick={() => toggleButton(10)}
                      className={`mx-1 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      <Listening3Pagination2023></Listening3Pagination2023>
    </div>
  );
};

export default Test3Listening2023;
