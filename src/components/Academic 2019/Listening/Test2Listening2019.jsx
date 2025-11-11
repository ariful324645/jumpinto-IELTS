import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

const Test1Listening2019 = () => {
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

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 1. You will hear a woman talking to a doctor at a clinic about a medical problem.",
        "First, you have some time to look at questions 1 to 4.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "CARL",
      text: ["Hi, come and take a seat."],
    },
    {
      speaker: "JULIE",
      text: ["Thank you."],
    },
    {
      speaker: "CARL",
      text: [
        "My name is Carl Rogers, and I'm one of the doctors here at the Total Health Clinic.",
        "So, I understand this is your first visit to the clinic.",
      ],
    },
    {
      speaker: "JULIE",
      text: ["Yes, it is."],
    },
    {
      speaker: "CARL",
      text: [
        "OK, well I hope you'll be very happy with the service you receive here.",
        "So if it's all right with you, I'll take a few details to help me give you the best possible service.",
      ],
    },
    {
      speaker: "JULIE",
      text: ["Sure."],
    },
    {
      speaker: "CARL",
      text: [
        "So, can I check first of all that we have the correct personal details for you?",
        "So your full name is Julie Anne Garcia.",
      ],
    },
    {
      speaker: "JULIE",
      text: ["That's correct."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The woman's name is Julie Anne Garcia. So Garcia has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "CARL",
      text: ["Hi, come and take a seat."],
    },
    {
      speaker: "JULIE",
      text: ["Thank you."],
    },
    {
      speaker: "CARL",
      text: [
        "My name is Carl Rogers, and I'm one of the doctors here at the Total Health Clinic.",
        "So, I understand this is your first visit to the clinic.",
      ],
    },
    {
      speaker: "JULIE",
      text: ["Yes, it is."],
    },
    {
      speaker: "CARL",
      text: [
        "OK, well I hope you'll be very happy with the service you receive here.",
        "So if it's all right with you, I'll take a few details to help me give you the best possible service.",
      ],
    },
    {
      speaker: "JULIE",
      text: ["Sure."],
    },
    {
      speaker: "CARL",
      text: [
        "So can I check first of all that we have the correct personal details for you?",
        "So your full name is Julie Anne Garcia.",
      ],
    },
    {
      speaker: "JULIE",
      text: ["That's correct."],
    },
    {
      speaker: "CARL",
      text: ["Perfect. And can I have a contact phone number?"],
    },
    {
      speaker: "JULIE",
      text: [{ text: "It's 2194429785.", number: 1 }],
    },
    {
      speaker: "CARL",
      text: [
        "OK, and then can I just check that we have the correct date of birth?",
      ],
    },
    {
      speaker: "JULIE",
      text: [{ text: "October 10th, 1992.", number: 2 }],
    },
    {
      speaker: "CARL",
      text: [
        "Oh, I actually have 1991. I'll just correct that now. Right, so that's all good.",
        "Now I just need a few more personal details. Do you have an occupation, either full-time or part-time?",
      ],
    },
    {
      speaker: "JULIE",
      text: [
        "Uh. Yes, I work full time in Esterhazy's, you know the restaurant chain.",

        {
          text: "I started off as a waitress there a few years ago, and I'm a manager now.",
          number: 3,
        },
      ],
    },
    {
      speaker: "CARL",
      text: [
        "Oh, I know them. Yeah, they're down on 114th Street, aren't they?",
      ],
    },
    {
      speaker: "JULIE",
      text: ["Uh. That's right."],
    },
    {
      speaker: "CARL",
      text: ["Yeah, I've been there a few times. I just love their salads."],
    },
    {
      speaker: "JULIE",
      text: ["That's good to hear."],
    },
    {
      speaker: "CARL",
      text: [
        "Right, so one more thing I need to know before we talk about why you're here, Julie, and that's the name of your insurance company.",
      ],
    },
    {
      speaker: "JULIE",
      text: [{ text: "It's Cawley Life Insurance, that's CAWLEY.", number: 4 }],
    },
    {
      speaker: "CARL",
      text: ["Excellent, thank you so much."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10.",
        "Now listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "CARL",
      text: [
        "Now, Julie, let's look at how we can help you. So, tell me a little about what brought you here today.",
      ],
    },
    {
      speaker: "JULIE",
      text: [
        {
          text: "Well, I've been getting a pain in my knee, the left one, not very serious at first, but it's gotten worse.",
          number: 5,
        },
        "So I thought I ought to see someone about it.",
      ],
    },
    {
      speaker: "CARL",
      text: [
        "That's certainly the right decision. So how long have you been aware of this pain?",
        "Is it just a few days, or is it longer than that?",
      ],
    },
    {
      speaker: "JULIE.Longer.",

      text: [
        {
          text: " It's been worse for the last couple of days, but it's 3 weeks since I first noticed it.",
          number: 6,
        },
        "It came on quite gradually though, so I kind of ignored it at first.",
      ],
    },
    {
      speaker: "CARL",
      text: [
        "And have you taken any medication yourself or treated it in any way?",
      ],
    },
    {
      speaker: "JULIE",
      text: [
        "Um. Yeah, I've been taking medication to deal with the pain, Tylenol, and that works OK for a few hours.",
        "But I don't like to keep taking it.",
      ],
    },
    {
      speaker: "CARL",
      text: [
        "OK, and what about heat treatment? Have you tried applying heat at all?",
      ],
    },
    {
      speaker: "JULIE",
      text: ["No, but I have been using ice on it for the last few days."],
    },
    {
      speaker: "CARL",
      text: ["And does that seem to help the pain at all?"],
    },
    {
      speaker: "JULIE",
      text: ["A little, yes."],
    },
    {
      speaker: "CARL",
      text: ["Good. Now you look as if you're quite fit normally."],
    },
    {
      speaker: "JULIE",
      text: ["I am, yes."],
    },
    {
      speaker: "CARL",
      text: ["So, do you do any sport on a regular basis?"],
    },
    {
      speaker: "JULIE",
      text: [
        { text: "Yes, I play a lot of tennis.", number: 7 },
        "I belong to a club, so I go there a lot. I'm quite competitive, so I enjoy that side of it as well as the exercise, but I haven't gone since this started.",
      ],
    },
    {
      speaker: "CARL",
      text: ["Sure. And do you do any other types of exercise?"],
    },
    {
      speaker: "JULIE",
      text: [
        "Uh. Yeah, I sometimes do a little swimming.",
        {
          text: " But usually just when I'm on vacation.But normally I go running a few times a week, maybe 3 or 4 times.",
          number: 8,
        },
      ],
    },
    {
      speaker: "CARL",
      text: [
        "Hmm. So your legs are getting quite a pounding, but you haven't had any problems up to now.",
      ],
    },
    {
      speaker: "JULIE",
      text: [
        "No, not with my legs. ,",
        {
          text: "I did have an accident last year when I slipped and hurt my shoulder. but that's better now.",
          number: 9,
        },
      ],
    },
    {
      speaker: "CARL",
      text: ["Excellent. And do you have any allergies?"],
    },
    {
      speaker: "JULIE",
      text: ["No, none that I'm aware of."],
    },
    {
      speaker: "CARL",
      text: ["And do you take any medication on a regular basis?"],
    },
    {
      speaker: "JULIE",
      text: [
        { text: "Well, I take vitamins, but that's all.", number: 10 },
        "I'm generally very healthy.",
      ],
    },
    {
      speaker: "CARL",
      text: [
        "OK, well, let's have a closer look and see what might be causing this problem. If you can just get up...",
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
      if (speaker === "JULIE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "CARL")
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
    1: "It's 2194429785",
    2: "October 10th, 1992",
    3: "I started off as a waitress there a few years ago, and I'm a manager now",
    4: "It's Cawley Life Insurance, that's CAWLEY",
    5: "Well, I've been getting a pain in my knee, the left one, not very serious at first, but it's gotten worse",
    6: "It's been worse for the last couple of days, but it's 3 weeks since I first noticed it",
    7: "Yes, I play a lot of tennis",
    8: "But usually just when I'm on vacation.But normally I go running a few times a week, maybe 3 or 4 times",
    9: "I did have an accident last year when I slipped and hurt my shoulder. but that's better now",
    10: "Well, I take vitamins, but that's all",
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
    localStorage.setItem("/2019/Test 2/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2019/Test 2/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2019/Test 2/listening");
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
                {renderText("Total Health Clinic")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
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
              {renderText("TOTAL HEALTH CLINIC")}
            </h1>

            {/* ---------- Section 1: Patient Details ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("PATIENT DETAILS")}
            </h2>

            <h3 className="text-lg font-bold mt-4">
              {renderText("Personal information")}
            </h3>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Name: Julie Anne Garcia")}
              </li>

              <li className="text-lg">
                <span>{renderText("Contact phone:")}</span>
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
                <span>{renderText("Date of birth:")}</span>
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
                <span>{renderText(", 1992")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Occupation: works as a")}</span>
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
                <span>{renderText("Insurance company:")}</span>
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
                <span>{renderText("Life Insurance")}</span>
              </li>
            </ul>

            {/* ---------- Section 2: Details of the Problem ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Details of the problem")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Type of problem: pain in her left")}</span>
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

              <li className="text-lg">
                <span>{renderText("When it began:")}</span>
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
                <span>{renderText("ago")}</span>
              </li>

              <li className="text-lg">
                {renderText(
                  "Action already taken: has taken painkillers and applied ice"
                )}
              </li>
            </ul>

            {/* ---------- Section 3: Other Information ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Other information")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Sports played: belongs to a")}</span>
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
                <span>{renderText("club")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("goes")}</span>
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
                <span>{renderText("regularly")}</span>
              </li>
            </ul>

            {/* ---------- Section 4: Medical History ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Medical history")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Injured her")}</span>
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
                <span>{renderText("last year")}</span>
              </li>

              <li className="text-lg">{renderText("No allergies")}</li>

              <li className="text-lg">
                <span>{renderText("No regular medication apart from")}</span>
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
        </div>
      </div>
    </div>
  );
};

export default Test1Listening2019;
