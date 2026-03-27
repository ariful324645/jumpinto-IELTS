import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2013 from "../Pagination 2013/Listening2Pagination2013";

const Test2Listening2013 = () => {
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
        "Section 1. You will hear a student talking to the student accommodation officer at a college.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I've just been accepted on a course at the university, and I'd like to try and arrange accommodation in the hall of residence.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, certainly. Please sit down. What I'll do is fill in a form with you to find out a little more about your preferences and so forth.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Thank you."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The student wishes to arrange accommodation in a hall of residence, so hall has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I've just been accepted on a course at the university, and I'd like to try and arrange accommodation in the hall of residence.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, certainly. Please sit down. What I'll do is fill in a form with you to find out a little more about your preferences and so forth.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Thank you."],
    },
    {
      speaker: "MAN",
      text: ["So, first of all, um, can I take your name?"],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "It's Anu Bhatt.", number: 1 }],
    },
    {
      speaker: "MAN",
      text: ["Could you spell your name please?"],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, ANU BHATT."],
    },
    {
      speaker: "MAN",
      text: ["Thanks, and could I ask your date of birth?"],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "March 31st, 1972.", number: 2 }],
    },
    {
      speaker: "MAN",
      text: ["Thank you. And where are you from?"],
    },
    {
      speaker: "WOMAN",
      text: ["India."],
    },
    {
      speaker: "MAN",
      text: ["Oh, right. And um what will you be studying?"],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "I'm doing a course in nursing.", number: 3 }],
    },
    {
      speaker: "MAN",
      text: [
        "Right, thank you. And how long would you want to stay in hall do you think?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, it'll take 3 years. But I'd only like to stay in hall for two.",
        {
          text: "I'd like to think about living outside for the third year.",
          number: 4,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Fine. And what did you have in mind for catering? Do you want to cook for yourself, or have all your meals provided, that's full board?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Is there something in between?"],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, you can just have evening meal provided, which is half board.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["That's what I'd prefer."],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, a lot of students opt for that. Now, with that in mind, do you have any special diet, anything we should know about?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "Yes, I don't take red meat.", number: 5 }],
    },
    {
      speaker: "MAN",
      text: ["No red meat."],
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
        "Now, thinking about the room itself, we have a number of options. Uh. You can have a single study bedroom, or you can have a shared one. These are both what we call simple rooms. The other alternative is to opt for a single bedsit, which actually has more space and better facilities. Uh. There's about £20 a week difference between them.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Well, actually my grant is quite generous, and I think the bedsit sounds the best option.",
          number: 6,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Lovely. I'll put you down for that, and we'll see what availability is like. Now, can I ask some other personal details which we like to have on record?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, of course."],
    },
    {
      speaker: "MAN",
      text: [
        "I wonder if you could let us know what your interests are. This might help us get a closer match for placing you in a particular hall.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "Ummm. Well, I love the theater.", number: 7 }],
    },
    {
      speaker: "MAN",
      text: ["Right."],
    },
    {
      speaker: "WOMAN",
      text: ["And I enjoy sports, uh, particularly badminton."],
    },
    {
      speaker: "MAN",
      text: [
        "Ah, that's worth knowing. Now, what we finish with on the form is really a list from you of what your priorities are in choosing a hall, and we'll do our best to take these into account.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Well, the first thing is I'd prefer a hall where there are other mature students, if possible.",
          number: 8,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, we do have halls which tend to cater for slightly older students.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "Hmm. Uh. And I'd prefer to be out of town.", number: 9 }],
    },
    {
      speaker: "MAN",
      text: [
        "That's actually very good for you, because we tend to have more vacancies in out-of-town halls.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Ah. Lucky."],
    },
    {
      speaker: "MAN",
      text: ["Yes, uh, anything else?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Well, I would like somewhere with a shared area, a TV room for example, or something like that.",
          number: 10,
        },
        " It's a good way to socialize.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Certainly is."],
    },
    {
      speaker: "WOMAN",
      text: ["That's it."],
    },
    {
      speaker: "MAN",
      text: ["Now we just need a contact telephone number for you."],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, sure, I'll just find it. Um. It's 667549."],
    },
    {
      speaker: "MAN",
      text: ["Great, so we'll be in contact with you as soon as possible."],
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
      if (speaker === "FATHER") {
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

  //  Marks show

  const correctAnswers = {
    1: "anu", // Name
    2: "march 31st", // Date of birth
    3: "nursing", // Course of study
    4: "2", // Number of years planned in hall
    5: "no", // Special dietary requirements (no red meat)
    6: "single", // Preferred room type
    7: "theater", // Interest 1 (theater)
    8: "mature students", // Priority: to be with other students who are
    9: "out of town", // Priority: to live outside the
    10: "shared", // Priority: to have a shared area for socialising
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
                {renderText("Arranging University Hall Accommodation")}
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
            • {renderText("Questions 1–10")}
          </h2>

          <h3 className="text-lg mb-6">
            • {renderText("Complete the notes below.")} <br />
            <br />• {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 max-w-2xl mx-auto rounded-lg space-y-5 bg-white">
            <h1 className="text-xl font-bold text-center">
              • {renderText("ACCOMMODATION FORM - STUDENT INFORMATION")}
            </h1>

            {/* Example */}
            <p className="text-lg">
              • {renderText("(Example) Type of accommodation:")}
              <input
                value={userAnswers["example"] || "hall of residence"}
                readOnly
                className="border rounded-md px-2 py-1 w-48 ml-2 bg-gray-100"
              />
            </p>

            {/* Q1 */}
            <p className="text-lg">
              • {renderText("Name:")}
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

            {/* Q2 */}
            <p className="text-lg">
              • {renderText("Date of birth:")}
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
            </p>

            {/* Q3 */}
            <p className="text-lg">
              • {renderText("Course of study:")}
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
                className="border rounded-md px-2 py-1 w-48"
              />
            </p>

            {/* Q4 */}
            <p className="text-lg">
              • {renderText("Number of years planned in hall:")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Q5 */}
            <p className="text-lg">
              • {renderText("Special dietary requirements: no (red)")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Q6 */}
            <p className="text-lg">
              • {renderText("Preferred room type: a single")}
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
                className="border rounded-md px-2 py-1 w-48"
              />
            </p>

            {/* Q7 */}
            <p className="text-lg">
              • {renderText("Interests: the")}
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
                className="border rounded-md px-2 py-1 w-48"
              />
              {renderText(" badminton")}
            </p>

            {/* Q8 */}
            <p className="text-lg">
              •{" "}
              {renderText(
                "Priorities in choice of hall: to be with other students who are",
              )}
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
                className="border rounded-md px-2 py-1 w-48"
              />
            </p>

            {/* Q9 */}
            <p className="text-lg">
              • {renderText("to live outside the")}
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
                className="border rounded-md px-2 py-1 w-48"
              />
            </p>

            {/* Q10 */}
            <p className="text-lg">
              • {renderText("to have a")}
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
                className="border rounded-md px-2 py-1 w-48"
              />
              {renderText(" area for socialising")}
            </p>

            {/* Contact */}
            <p className="text-lg">
              • {renderText("Contact phone number: 667549")}
            </p>
          </div>

          {/* ---------- Submit / Result ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
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
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
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

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

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
      <Listening2Pagination2013></Listening2Pagination2013>
    </div>
  );
};

export default Test2Listening2013;
