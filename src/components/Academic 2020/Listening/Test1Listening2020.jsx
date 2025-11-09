import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

const Test1Listening2020 = () => {
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
        "Part 1. You will hear a woman phoning a friend to get information about a job agency.",
        "First, you have some time to look at questions 1 to 5.",
        "Now listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "Hello, William. This is Amber.",
        "You said to phone if I wanted to get more information about the job agency you mentioned.",
        "Is now a good time?",
      ],
    },
    {
      speaker: "WILLIAM",
      text: [
        "Uh. Hi, Amber. Yes, fine.",
        "So the agency I was talking about is called Bankside.",
        "They're based in Docklands.",
        "I can tell you the address now, 497 Eastside.",
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "OK, thanks.",
        "So is there anyone in particular I should speak to there?",
      ],
    },
    {
      speaker: "WILLIAM",
      text: [
        {
          text: "The agent I always deal with is called Becky Jamieson.",
          number: 1,
        },
      ],
    },
    {
      speaker: "AMBER",
      text: ["Let me write that down.", "Becky..."],
    },
    {
      speaker: "WILLIAM",
      text: ["Jamieson. J-A-M-I-E-S-O-N."],
    },
    {
      speaker: "AMBER",
      text: ["Do you have her direct line?"],
    },
    {
      speaker: "WILLIAM",
      text: [
        "Yes, it's in my contacts somewhere.",
        { text: "Right, here we are. 07866 510333.", number: 2 },
        "I wouldn't call her until the afternoon, if I were you.",
        "She's always really busy in the morning, trying to fill last-minute vacancies.",
        "She's really helpful and friendly, so I'm sure it would be worth getting in touch with her for an informal chat.",
      ],
    },
    {
      speaker: "AMBER",
      text: ["It's mainly clerical and admin jobs they deal with, isn't it?"],
    },
    {
      speaker: "WILLIAM",
      text: [
        "That's right.",
        "I know you're hoping to find a full-time job in the media eventually, but Becky mostly recruits temporary staff for the finance sector.",
        "Which will look good on your CV, and generally pays better too.",
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "Yeah, I'm just a bit worried because I don't have much office experience.",
      ],
    },
    {
      speaker: "WILLIAM",
      text: [
        "I wouldn't worry.",
        "They'll probably start you as a receptionist or something like that.",
        "So what's important for that kind of job isn't so much having business skills or knowing lots of different computer systems.",
        {
          text: "It's communication that really matters, so you'd be fine there.",
          number: 3,
        },
        "And you'll pick up office skills really quickly on the job. It's not that complicated.",
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "OK, good.",
        "So, how long do people generally need temporary staff for?",
        "It would be great if I could get something lasting at least a month.",
      ],
    },
    {
      speaker: "WILLIAM",
      text: [
        "That shouldn't be too difficult",
        {
          text: " But you're more likely to be offered something for a week at first, which might get extended.",
          number: 4,
        },
        "It's unusual to be sent somewhere for just a day or two.",
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "Right. I've heard the pay isn't too bad. Better than working in a shop or a restaurant.",
      ],
    },
    {
      speaker: "WILLIAM",

      text: [
        "Oh, yes, definitely.",
        {
          text: " The hourly rate is about 10 pounds, 11 if you're lucky.",
          number: 5,
        },
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "That's pretty good. I was only expecting to get 8 or 9 pounds an hour.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "WILLIAM",
      text: [
        "Do you want me to tell you anything about the registration process?",
      ],
    },
    {
      speaker: "AMBER",
      text: ["Yes, please. I know you have to have an interview."],
    },
    {
      speaker: "WILLIAM",
      text: [
        "The interview usually takes about an hour, and you should arrange that about a week in advance.",
      ],
    },
    {
      speaker: "AMBER",
      text: [
        "I suppose I should dress smartly, if it's for office work",
        {
          text: "I can probably borrow a suit from Mum.",
          number: 6,
        },
      ],
    },
    {
      speaker: "WILLIAM",
      text: ["Good idea, it's better to look too smart than too casual."],
    },
    {
      speaker: "AMBER",
      text: [
        "Will I need to bring copies of my exam certificates or anything like that?",
      ],
    },
    {
      speaker: "WILLIAM",
      text: ["No, they don't need to see those, I don't think."],
    },
    {
      speaker: "AMBER",
      text: ["What about my passport?"],
    },
    {
      speaker: "WILLIAM",
      text: [{ text: "Oh, yes, they will ask to see that.", number: 7 }],
    },
    {
      speaker: "AMBER",
      text: ["OK."],
    },
    {
      speaker: "WILLIAM",
      text: [
        "I wouldn't get stressed about the interview though.",
        "It's just a chance for them to build a relationship with you, so they can try and match you to a job which you'll like.",
        {
          text: "So there are questions about personality that they always ask candidates.",
          number: 8,
        },
        "Fairly basic ones, and they probably won't ask anything too difficult, like what your plans are for the future.",
      ],
    },
    {
      speaker: "AMBER",
      text: ["Hope not."],
    },
    {
      speaker: "WILLIAM",
      text: [
        "Anyway, there are lots of benefits to using an agency.",
        {
          text: " For example, the interview will be useful because they'll give you feedback on your performance, so you can improve next time.",
          number: 9,
        },
      ],
    },
    {
      speaker: "AMBER",
      text: [
        {
          text: " And they'll have access to jobs which aren't advertised .Exactly, most temporary jobs aren't advertised.",
          number: 10,
        },
      ],
    },
    {
      speaker: "WILLIAM",
      text: ["Well, I think I've covered..."],
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
      if (speaker === "AMBER")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "WILLIAM")
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

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setActiveButtons({});
    document
      .querySelectorAll("input[type='text']")
      .forEach((input) => (input.value = ""));
    handleClearHighlight();
    setIsOpen(false);
  };

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
                {renderText("Bankside Recruitment Agency")}
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

          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Bankside Recruitment Agency")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("Address of agency: 497 Eastside, Docklands")}
              </li>

              <li className="text-lg">
                <span>{renderText("Name of agent: Becky")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText(".")}</span>
              </li>

              <li className="text-lg">
                {renderText("Phone number: 07866 510333")}
              </li>

              <li className="text-lg">
                <span>{renderText("Best to call her in the")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText(".")}</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Typical jobs")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText(
                  "Clerical and admin roles, mainly in the finance industry"
                )}
              </li>
              <li className="text-lg">
                <span>{renderText("Must have good ")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("skill.")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("Jobs are usually for at least one")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText(".")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("Pay is usually £")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("per hour.")}</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Registration process")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Wear a")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("to the interview.")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Must bring your")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("to the interview.")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("They will ask questions about each applicant's")}
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("can not be fixed.")}</span>
              </li>
            </ul>

            {/* ---------- Section 6 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Advantages of using an agency")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("The")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>
                  {renderText(
                    "you receive at interview will benefit you. Will get access to vacancies which are not advertised."
                  )}
                </span>
              </li>

              <li className="text-lg">
                <span>{renderText("Less")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("is involved in applying for jobs.")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Listening2020;
