import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";

const Test3Listening2015 = () => {
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
        "Section 1. You will hear a conversation between the director of a childcare centre and a parent enrolling her child in the centre.",
        "First, you have some time to look at questions 1 to 6.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Good morning, welcome to the Early Learning Childcare Centre. How may I help you?",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        "Hi, I spoke to you last week about enrolling my daughter to next year.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Oh yes, I'll just get some details from you. So you're her mother?",
      ],
    },
    {
      speaker: "CAROL",
      text: ["That's right."],
    },
    {
      speaker: "DIRECTOR",
      text: ["And, can I have your name?"],
    },
    {
      speaker: "CAROL",
      text: [{ text: "It's Carol, Carol Smith.", number: 0 }], // Example (surname: Smith)
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The parent's name is Carol Smith, so Smith has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Good morning. Welcome to the Early Learning Childcare Centre. How may I help you?",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        "Hi. I spoke to you last week about enrolling my daughter to next year.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Oh, yes. I'll just get some details from you. So, you're her mother?",
      ],
    },
    {
      speaker: "CAROL",
      text: ["That's right."],
    },
    {
      speaker: "DIRECTOR",
      text: ["And, can I have your name?"],
    },
    {
      speaker: "CAROL",
      text: ["It's Carol, Carol Smith."],
    },
    {
      speaker: "DIRECTOR",
      text: ["And your daughter's name?"],
    },
    {
      speaker: "CAROL",
      text: ["It's Kate."],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Now, we have several groups at the centre and we cater for children from three to five years old. How old is your daughter?",
      ],
    },
    {
      speaker: "CAROL",
      text: ["She's three now but she turns four next month."],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "I'll put four down because that's how old she'll be when she starts.",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        {
          text: "Fine, she's so excited about her birthday and coming to the centre.",
          number: 1,
        },
      ],
    },
    {
      speaker: "DIRECTOR",
      text: ["That's good to hear. And what's your address?"],
    },
    {
      speaker: "CAROL",
      text: [
        {
          text: "It's 46 Wombat Road, that's WOMBAT. Woodside 4032.",
          number: 2,
        },
      ],
    },
    {
      speaker: "DIRECTOR",
      text: ["And what's the phone number?"],
    },
    {
      speaker: "CAROL",
      text: ["Oh... it's... 3345 9865."],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "So, have you decided on the days you'd like to bring your daughter here?",
      ],
    },
    {
      speaker: "CAROL",
      text: ["I'd prefer Monday and Wednesday if possible."],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Mmm. I'll check, Monday's fine, but I think the centre is already full for Wednesday. Erm. Yes. Sorry. It seems to be a very popular day. We can offer you a Thursday or a Friday as well.",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        {
          text: "Oh dear. I suppose Thursday would be all right because she has swimming on Friday.",
          number: 3,
        },
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "OK, got that. Because a lot of parents work, we do offer flexible start and finish times. We are open from 7:30 in the morning until 6 o'clock at night. What time would you like your daughter to start?",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        {
          text: "I need to get to work in the city by 9:00 so I'll drop her off at 8:30. You're pretty close to the city here so that should give me plenty of time to get there.",
          number: 4,
        },
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "That's fine. Now, we also need to decide which group she'll be in. We have two different groups and they're divided up according to age. There's the green group. Which is for three- to four-year-olds. And then there's the red group which is for four- to five-year-olds.",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        "She's quite mature for her age and she can already write her name and read a little.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Well, I'll put her in the red group and we can always change her to the green one if there are any problems.",
      ],
    },
    {
      speaker: "CAROL",
      text: [{ text: "That sounds fine.", number: 5 }],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "OK. Let's move on to meals. We can provide breakfast, lunch and dinner. As she's finishing pretty early, she won't need dinner, will you give her breakfast before she comes?",
      ],
    },
    {
      speaker: "CAROL",
      text: [{ text: "Yes, she'll only need lunch.", number: 6 }],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Now, does she have any medical conditions we need to know about? Does she have asthma or any hearing problems for example?",
      ],
    },
    {
      speaker: "CAROL",
      text: [{ text: "No. But she does need to wear glasses.", number: 7 }],
    },
    {
      speaker: "DIRECTOR",
      text: ["Oh, I'll make a note of that."],
    },
    {
      speaker: "CAROL",
      text: [
        "Yes, she's pretty good about wearing them, she can't see much without them.",
      ],
    },
    {
      speaker: "DIRECTOR",
      text: ["Right. OK. Now, I also need emergency contact details."],
    },
    {
      speaker: "CAROL",
      text: ["So what sort of information do you need?"],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Just the name and number of a friend or family member we can contact in case we can't get hold of you at any time.",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        {
          text: "OK. That'd better be my sister... Jenny Ball. That's BALL. Her phone number is 3346 7523.",
          number: 8,
        },
      ],
    },
    {
      speaker: "DIRECTOR",
      text: ["Great. So she is the child's aunt?"],
    },
    {
      speaker: "CAROL",
      text: [{ text: "Yes, that's right.", number: 9 }],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "I'll make a note of that as well. Now, is there anything you'd like to ask?",
      ],
    },
    {
      speaker: "CAROL",
      text: ["What about payment? How much are the fees each term?"],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Well, for two days and the hours you've chosen, that will be $450 altogether.",
      ],
    },
    {
      speaker: "CAROL",
      text: ["OK, and do I have to pay that now?"],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "No, we send out invoices once the children start at the centre. You can choose to pay at the end of each term or we do offer a slightly discounted rate if you pay every month.",
      ],
    },
    {
      speaker: "CAROL",
      text: [
        {
          text: "Oh, I'll do that then. I find it easier to budget that way and I'm not used to the term dates just yet.",
          number: 10,
        },
      ],
    },
    {
      speaker: "DIRECTOR",
      text: [
        "Good, it makes it a lot simpler for us as well. Well, that's everything. Would you like me to show you around the centre?",
      ],
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
    1: "4",
    2: "Wombat",
    3: "Thursday",
    4: "8.30",
    5: "red",
    6: "lunch",
    7: "glasses",
    8: "Ball",
    9: "aunt",
    10: "month",
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
                {renderText("Early Learning Childcare Centre")}
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

          {/* Box with Enrolment Form */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Early Learning Childcare Centre Enrolment Form")}
            </h1>

            <ul className="list-none space-y-4">
              <li className="text-lg">
                {renderText("(Example) Parent or guardian: Carol ")}
                <span className="font-bold">{renderText("Smith")}</span>
              </li>

              <li className="text-lg font-bold mt-6">
                {renderText("Personal Details")}
              </li>

              <li className="text-lg">{renderText("Child's name: Kate")}</li>

              <li className="text-lg">
                {renderText("Age:")}
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
                {renderText(" Road, Woodside, 4032")}
              </li>

              <li className="text-lg">{renderText("Phone: 3345 9865")}</li>

              <li className="text-lg font-bold mt-6">
                {renderText("Childcare Information")}
              </li>

              <li className="text-lg">
                {renderText("Days enrolled for: Monday and")}
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
                {renderText("Start time:")}
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
                {renderText(" am")}
              </li>

              <li className="text-lg">
                {renderText("Childcare group: the")}
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
                {renderText(" group")}
              </li>

              <li className="text-lg">
                {renderText("Which meal/s are required each day?")}
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
                {renderText("Medical conditions: needs")}
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
                {renderText("Emergency contact: Jenny")}
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
              </li>

              <li className="text-lg">{renderText("Phone: 3346 7523")}</li>

              <li className="text-lg">
                {renderText("Relationship to child:")}
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
              </li>

              <li className="text-lg font-bold mt-6">{renderText("Fees")}</li>

              <li className="text-lg">
                {renderText("Will pay each")}
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
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Listening3Pagination2015></Listening3Pagination2015>
    </div>
  );
};

export default Test3Listening2015;
