import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Test3Listening2007 = () => {
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
        "Section 1, you will hear a man talking to the customer services manager of a bank.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Good morning, I'd like to open a bank account, please."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Certainly. If you'd like to take a seat, I'll just get some details from you. It won't take long.",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Thanks."],
    },
    {
      speaker: "WOMAN",
      text: ["Is it a current account or a deposit account you wanted?"],
    },
    {
      speaker: "PIETER",
      text: ["A current account."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The man wishes to apply for a current account, so current has been written in the space.",
        "Now we shall begin, you should answer the questions as you listen.",
        "Because you will not hear the recording a second time. Listen carefully, and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Good morning, I'd like to open a bank account, please."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Certainly. If you'd like to take a seat, I'll just get some details from you. It won't take long.",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Thanks."],
    },
    {
      speaker: "WOMAN",
      text: ["Is it a current account or a deposit account you wanted?"],
    },
    {
      speaker: "PIETER",
      text: ["A current account."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right. I've got the application form here then. We have different types. I see you've got our leaflet there.",
      ],
    },
    {
      speaker: "PIETER",
      text: [{ text: "I've decided on the one called 'Select'.", number: 1 }],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right, that's fine. So, first of all, can I have your full name please?",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Yes, it's Pieter Henes. That's PIETER."],
    },
    {
      speaker: "WOMAN",
      text: ["Is it HENNES?"],
    },
    {
      speaker: "PIETER",
      text: [
        "Uh, only one N actually, it's a less common spelling of the name.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, right. OK, and what's your date of birth please?"],
    },
    {
      speaker: "PIETER",
      text: ["The 27th of the 1st, 1973.", { text: "27/1/1973", number: 2 }],
    },
    {
      speaker: "WOMAN",
      text: ["Right. And will this be a joint account?"],
    },
    {
      speaker: "PIETER",
      text: ["No, just myself."],
    },
    {
      speaker: "WOMAN",
      text: ["OK, fine. And where are you living, Mr Henes?"],
    },
    {
      speaker: "PIETER",
      text: ["15. Riverside.", { text: "15. Riverside", number: 3 }],
    },
    {
      speaker: "WOMAN",
      text: ["Is that all one word?"],
    },
    {
      speaker: "PIETER",
      text: ["Yes."],
    },
    {
      speaker: "WOMAN",
      text: ["Exeter?"],
    },
    {
      speaker: "PIETER",
      text: ["Yes."],
    },
    {
      speaker: "WOMAN",
      text: [
        "How long have you been at your present address? Er, Is it more than two years?",
      ],
    },
    {
      speaker: "PIETER",
      text: [
        "Ah, just two weeks actually. I only arrived in the country a month ago. I'm from Holland.",
        { text: "2 weeks", number: 4 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, that's fine. But we normally ask for a previous address in that case.",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Oh, yes. Well, it's Rielsdorf 2. That's RIELSDORF 2, Utrecht."],
    },
    {
      speaker: "WOMAN",
      text: ["Holland. OK, thank you. Do you have a daytime telephone number?"],
    },
    {
      speaker: "PIETER",
      text: [
        "Yes, I think the number at my office is 6 0 6 2 9 5. Um, just a minute, I'd better check. Oh, no, sorry, 6 1 6.",
        { text: "606295", number: 5 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["I'm not used to it yet. Would you like my home number too?"],
    },
    {
      speaker: "PIETER",
      text: ["Yes, please. It's 7 9 6 4 3 1."],
    },
    {
      speaker: "WOMAN",
      text: ["Are they both local numbers?"],
    },
    {
      speaker: "PIETER",
      text: ["Yes."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right. And your occupation?"],
    },
    {
      speaker: "PIETER",
      text: [
        "Well, I'm in Britain as a project manager, but that's not my main job. I'm an engineer by profession.",
        { text: "engineer", number: 6 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I see. I think I'll put that then, it's shorter. Now we usually ask for a piece of information which we can use to check your identity for security reasons, you know, if you phone us.",
      ],
    },
    {
      speaker: "PIETER",
      text: ["Like, erm, my wife's first name?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Mother's might be better, it's less likely to be known.",
        { text: "mother", number: 7 },
      ],
    },
    {
      speaker: "PIETER",
      text: ["OK, hers is Siti."],
    },
    {
      speaker: "WOMAN",
      text: ["Siti?"],
    },
    {
      speaker: "PIETER",
      text: ["Yes, SITI. It's Indonesian."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Fine. And how much would you like to open your account with? We usually ask for a minimum sum of £50 that's about 75 euros.",
      ],
    },
    {
      speaker: "PIETER",
      text: [
        "Well, I'm going to transfer 2,000 euros from my Dutch account, uh, just till I get paid.",
        { text: "2000", number: 8 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Uh. In fact, I wanted to ask you about that. What's the best way to do it?",
      ],
    },
    {
      speaker: "PIETER",
      text: ["It depends which bank you're with."],
    },
    {
      speaker: "WOMAN",
      text: ["It's the Fransen Bank in Utrecht."],
    },
    {
      speaker: "PIETER",
      text: [
        "OK, fine. I'll check that in a minute. If we have links with them, we can do a direct transfer, but it's not a big problem either way. Let's see, how often would you like to receive statements?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I haven't really thought. Um, what's the usual thing?",
        { text: "monthly", number: 9 },
      ],
    },
    {
      speaker: "PIETER",
      text: ["It's up to you. Some people like them weekly."],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, no, that's too often. Can I have them sent once a month?"],
    },
    {
      speaker: "PIETER",
      text: ["Yes, that's fine. Is there anything else?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "I was thinking of registering for your internet service at some stage.",
        { text: "internet service", number: 10 },
      ],
    },
    {
      speaker: "PIETER",
      text: ["Oh, yes. Would you like me to send you information about that?"],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, please, yes."],
    },
    {
      speaker: "PIETER",
      text: [
        "And would you like to receive information about the bank's other services? Insurance, loans, anything like that?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hmm. I don't think so, thanks."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1. You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option

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
                : [p],
            )
          : [part],
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
  1: "Select",
  2: "27/1/1973",
  3: "15. Riverside",
  4: "2 weeks",
  5: "606295",
  6: "engineer",
  7: "mother",
  8: "2000",
  9: "monthly",
  10: "internet",
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
    localStorage.setItem("/listening1Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22020");
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
                {renderText(
                  "Pieter's Application for a Current Account at the Bank",
                )}
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
                        "Are you sure you want to clear all answers?",
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
          {/* box*/}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–10")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("NO MORE THAN THREE WORDS AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ----------  Box ---------- */}
          <div className="border p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("OPENING A BANK ACCOUNT")}
            </h1>

            {/* Example: Application for a Current bank account */}
            <p className="text-lg">
              {renderText("(Example) Application for a")}
              <span className="font-bold mx-1">{renderText("Current")}</span>
              {renderText("bank account")}
            </p>

            {/* Type of current account */}
            <p className="text-lg">
              {renderText("Type of current account: The '")}
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
              <span>{renderText("' account")}</span>
            </p>

            {/* Full name */}
            <p className="text-lg">
              {renderText("Full name of applicant:")}
              <span className="ml-1 font-bold">
                {renderText("Pieter Henes")}
              </span>
            </p>

            {/* Date of birth */}
            <p className="text-lg">
              {renderText("Date of birth:")}
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

            {/* Joint account */}
            <p className="text-lg">
              {renderText("Joint account holder(s):")}
              <span className="ml-1">{renderText("No")}</span>
            </p>

            {/* Current address */}
            <p className="text-lg">
              {renderText("Current address:")}
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
              <span className="ml-2">{renderText("Exeter")}</span>
            </p>

            {/* Time at current address */}
            <p className="text-lg">
              {renderText("Time at current address:")}
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
            </p>

            {/* Previous address */}
            <p className="text-lg">
              {renderText("Previous address: Rielsdorf 2, Utrecht, Holland")}
            </p>

            {/* Telephone */}
            <p className="text-lg">
              {renderText("Telephone:")}
              {renderText("work")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText("home 796431")}
            </p>

            {/* Occupation */}
            <p className="text-lg">
              {renderText("Occupation:")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Identity (security) */}
            <p className="text-lg">
              {renderText("Identity (security): Name of his")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText(": Siti")}
            </p>

            {/* Opening sum */}
            <p className="text-lg">
              {renderText("Opening sum: €")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText("to be transferred from Fransen Bank, Utrecht")}
            </p>

            {/* Statements */}
            <p className="text-lg">
              {renderText("Statements: Every")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Requests */}
            <p className="text-lg">
              {renderText("Requests: Supply information about the bank's")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText("service")}
            </p>
          </div>

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
                    All Answers (1-10)
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
      {/* <Listening1Pagination></Listening1Pagination> */}
    </div>
  );
};

export default Test3Listening2007;
