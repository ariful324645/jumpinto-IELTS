import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Test3Listening2009 = () => {
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
      "Section 1, you will hear a conversation between a student and a job advisor.",
      "First, you have some time to look at questions 1 to 5.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "AGENT",
    text: ["Good morning."],
  },
  {
    speaker: "STUDENT",
    text: ["Oh, good morning. Is this... er... room number 26?"],
  },
  {
    speaker: "AGENT",
    text: ["Yes, that's right."],
  },
  {
    speaker: "STUDENT",
    text: ["So, is this the Student Job Center?"],
  },
  {
    speaker: "AGENT",
    text: ["It certainly is. How can I help you?"],
  },
  {
    speaker: "STUDENT",
    text: ["Well, actually, I'm looking for a job."],
  },
  {
    speaker: "AGENT",
    text: ["Uh huh."],
  },
  {
    speaker: "STUDENT",
    text: ["A part-time job. Do you have anything available at the moment?"],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "The student is looking for a part-time job, so part-time has been written in the space.",
      "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully and answer questions 1 to 5.",
    ],
  },
  {
    speaker: "AGENT",
    text: ["Good morning."],
  },
  {
    speaker: "STUDENT",
    text: ["Oh, good morning. Is this... er... room number 26?"],
  },
  {
    speaker: "AGENT",
    text: ["Yes, that's right."],
  },
  {
    speaker: "STUDENT",
    text: ["So, is this the Student Job Center?"],
  },
  {
    speaker: "AGENT",
    text: ["It certainly is. How can I help you?"],
  },
  {
    speaker: "STUDENT",
    text: ["Well, actually, I'm looking for a job."],
  },
  {
    speaker: "AGENT",
    text: [
      "Uh. Yes. Are you a registered student? I'm afraid this service is only available to full-time students.",
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "Yes, I am. I'm doing a degree in business studies.",
      { text: "Here's my student card.", number: 1 },
    ],
  },
  {
    speaker: "AGENT",
    text: ["Which year are you in?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "Well, I've been at uni for 4 years, but I'm in the 3rd year because I took last year off.",
      { text: "3rd year", number: 2 },
    ],
  },
  {
    speaker: "AGENT",
    text: [
      "Right, well, let's just have a look at what positions are available at the moment. Uh. There's a job working at the reception desk at the Sports Center for three evenings a week.",
      { text: "Wednesdays, Thursdays and Fridays", number: 3 },
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "Hmm. That sounds like fun, but unfortunately I have evening lectures, so that's not possible. Is there anything during the day?",
    ],
  },
  {
    speaker: "AGENT",
    text: [
      "OK, that's no good then. Um. What about cleaning? There's a position for a cleaner.",
      { text: "at the childcare center", number: 4 },
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Right."],
  },
  {
    speaker: "AGENT",
    text: ["But you'd need to be there at 6:00 am. Does that appeal?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "6 o'clock in the morning? Oh, that's far too early for me. I'm afraid I'd never make it that early in the morning.",
    ],
  },
  {
    speaker: "AGENT",
    text: [
      "Hmm, well, there was a position going in the computer lab for 3 days a week that might be OK. Ah, here it is. No, it's in the library, not the lab.",
      {
        text: "Clerical assistant required, mostly putting books back on shelves",
        number: 5,
      },
    ],
  },
  {
    speaker: "STUDENT",
    text: ["No, I can't manage that because of the lectures."],
  },
  {
    speaker: "AGENT",
    text: [
      "OK, I'm getting the idea. Uh. Look, I'll just get a few details from you anyway, and then we can check through the list and see what comes up.",
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10. Now listen and answer questions 6 to 10.",
    ],
  },
  {
    speaker: "AGENT",
    text: [
      "We'll fill in the personal details on this application form first, if that's OK.",
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Yeah, that's fine."],
  },
  {
    speaker: "AGENT",
    text: ["Now, what's your name again?"],
  },
  {
    speaker: "STUDENT",
    text: ["Anita Newman. Uh. That's NEWMAN."],
  },
  {
    speaker: "AGENT",
    text: ["And your address, Anita?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "I'm in one of the halls of residence for postgraduate students, you know International House.",
      { text: "International House", number: 6 },
    ],
  },
  {
    speaker: "AGENT",
    text: ["OK, that's easy. Uh. What's your room number there?"],
  },
  {
    speaker: "STUDENT",
    text: [
      "Room B 5 6 9, uh, no, sorry, B 6 5 9. I always get that wrong. I haven't been living there very long.",
      { text: "B659", number: 7 },
    ],
  },
  {
    speaker: "AGENT",
    text: [
      "Do you have any other skills? Typing, languages, that sort of thing?",
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Well, I speak some Japanese."],
  },
  {
    speaker: "AGENT",
    text: [
      "Right, I'll make a note of that. Now, let's see what else is available. Uh. What do you think of administrative work? There's a position for an office assistant at the English Language Center.",
      { text: "Office assistant", number: 8 },
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Hmm, that sounds interesting."],
  },
  {
    speaker: "AGENT",
    text: [
      "It's for three days a week, Monday, Friday, and Saturday mornings. Interested?",
    ],
  },
  {
    speaker: "STUDENT",
    text: [
      "Hmm. I was hoping to have Saturdays free, but I need the work, so, uh huh, can you tell me what the job involves?",
    ],
  },
  {
    speaker: "AGENT",
    text: [
      "Yep, sure. It says here that you'll be required to deal with student inquiries and answer the phone.",
      { text: "Answering student inquiries and phone calls", number: 9 },
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Oh, I'm sure I can handle all that without a problem."],
  },
  {
    speaker: "AGENT",
    text: [
      "Great. Well, would you like me to arrange an interview for you? Say Friday morning around 10.",
      { text: "11:30", number: 10 },
    ],
  },
  {
    speaker: "STUDENT",
    text: ["Me too, and thanks for all your help."],
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
      if (speaker === "STUDENT") {
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
  1: "business studies", // Student is studying
  2: "3rd", // Year of the course
  3: "Receptionist", // Position available 1
  4: "evenings", // Problem with receptionist job
  5: "library", // Position available 2 (Clerical Assistant)
  6: "International House", // Student address
  7: "B659", // Room number
  8: "Office assistant", // Position available at English Language Centre
  9: "answer the phone", // Duties
  10: "10–11:30", // Time of interview
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
                {renderText("Anita's Search for a Part-time Student Job")}
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
            {renderText("Questions 1–2")}
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
              {renderText("STUDENT JOB APPLICATION FORM")}
            </h1>

            {/* Example Type of Job */}
            <p className="text-lg">
              {renderText("(Example) Type of job required: Part-time")}
            </p>

            {/* Course / Study */}
            <p className="text-lg">
              {renderText("Student is studying:")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Year of Study */}
            <p className="text-lg">
              {renderText("Student is in the")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" year of the course.")}
            </p>
          </div>

          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 3-5")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br />
              {renderText("Write ONE WORD AND/OR A NUMBER for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Position Available")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Where")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Problem")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Receptionist */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Receptionist")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    in the{" "}
                    <button
                      onClick={() => toggleButton(3)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[3]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      3
                    </button>{" "}
                    <input
                      value={userAnswers[3] || ""}
                      onChange={(e) => handleInputChange(3, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />{" "}
                    evening lectures
                  </td>
                  <td className="border border-gray-400 p-2">
                    <button
                      onClick={() => toggleButton(4)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[4]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      4
                    </button>{" "}
                    <input
                      value={userAnswers[4] || ""}
                      onChange={(e) => handleInputChange(4, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />{" "}
                    in the Child Care Centre
                  </td>
                </tr>

                {/* Clerical Assistant */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Clerical Assistant")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    in the{" "}
                    <button
                      onClick={() => toggleButton(5)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[5]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      5
                    </button>{" "}
                    <input
                      value={userAnswers[5] || ""}
                      onChange={(e) => handleInputChange(5, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />{" "}
                    evening lectures
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("too early")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 6-10")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br />
              {renderText(
                "Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
              )}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("STUDENT DETAILS")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Information")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Name */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Name")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("Anita Newman")}
                  </td>
                </tr>

                {/* Address */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Address")}
                  </td>
                  <td className="border border-gray-400 p-2">
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
                      className="mx-1 w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* Room Number */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Room No.")}
                  </td>
                  <td className="border border-gray-400 p-2">
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
                      className="mx-1 w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* Other Skills */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Other skills")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {renderText("Speaks some Japanese")}
                  </td>
                </tr>

                {/* Position Available */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Position available")}
                  </td>
                  <td className="border border-gray-400 p-2">
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
                      className="mx-1 w-[200px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />{" "}
                    at the English Language Centre
                  </td>
                </tr>

                {/* Duties */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Duties")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    Respond to enquiries and{" "}
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
                      className="mx-1 w-[200px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* Time of Interview */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Time of interview")}
                  </td>
                  <td className="border border-gray-400 p-2">
                    Friday at{" "}
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
                      className="mx-1 w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />{" "}
                    a.m.
                  </td>
                </tr>
              </tbody>
            </table>
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

export default Test3Listening2009;
