import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2013 from "../Pagination 2013/Listening3Pagination2013";

const Listening3Part32013 = () => {
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
        "Section 3.You will hear a geography student called Caroline discussing her dissertation with her tutor.",
        "First, you have some time to look at questions 21 to 23.",
        "Now listen carefully and answer questions 21 to 23.",
      ],
    },
    {
      speaker: "TUTOR",
      text: ["Ah, Caroline... come on in. Sit down."],
    },
    {
      speaker: "CAROLINE",
      text: ["Thanks."],
    },
    {
      speaker: "TUTOR",
      text: ["So how's the dissertation planning going?"],
    },
    {
      speaker: "CAROLINE",
      text: [
        "Ah, Well, Dr Schulmann, I'm still having a lot of trouble deciding on a title.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Well, that's perfectly normal at this stage.",
        "And this is what your tutorials will help you to do.",
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["Right."],
    },
    {
      speaker: "TUTOR",
      text: [
        "What we'll do is jot down some points that might help you in your decision.",
        "First of all you have chosen your general topic area, haven't you?",
      ],
    },
    {
      speaker: "CAROLINE",
      text: [{ text: "Yes, it's the fishing industry.", number: 21 }],
    },
    {
      speaker: "TUTOR",
      text: [
        "Oh yes, that was one of the areas you mentioned.",
        "Now uh, what aspects of the course are you good at?",
      ],
    },
    {
      speaker: "CAROLINE",
      text: [
        {
          text: "Well, I think I'm coping well with statistics, and I'm never bored by it.",
          number: 22,
        },
      ],
    },
    {
      speaker: "TUTOR",
      text: ["Good. Anything else?"],
    },
    {
      speaker: "CAROLINE",
      text: [
        "Well, I found computer modeling fascinating.",
        "I have no problem following what's being taught, whereas quite a few of my classmates find it difficult.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Well, that's very good.",
        "Do you think these might be areas you could bring into your dissertation?",
      ],
    },
    {
      speaker: "CAROLINE",
      text: [
        "Oh, yes, if possible.",
        "It's just that I'm having difficulty thinking how I can do that.",
        "You see, I feel I don't have sufficient background information.",
      ],
    },
    {
      speaker: "TUTOR",
      text: ["I see. Uh. Well, do you take notes?"],
    },
    {
      speaker: "CAROLINE",
      text: [{ text: "I'm very weak at notetaking.", number: 23 }],
    },
    {
      speaker: "TUTOR",
      text: [
        "My teachers always used to say that.",
        "Well, I think you really need to work on these weaknesses before you go any further.",
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["What do you suggest?"],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the tutorial, you have some time to look at questions 24 to 30.",
        "Now listen and answer questions 24 to 30.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Well, I can go through the possible strategies with you and let you decide where to go from there.",
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["OK, thanks."],
    },
    {
      speaker: "TUTOR",
      text: [
        "Well, some people find it helpful to organize peer-group discussions, you know, each week a different person studies a different topic and shares it with the group.",
        "It really helps build confidence.",
        {
          text: "You know, having to present something to others.",
          number: 24,
        },
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["Yeah.", "I can see that."],
    },
    {
      speaker: "TUTOR",
      text: [
        {
          text: "The drawback is that everyone in the group seems to share the same ideas.",
          number: 25,
        },
        "They keep being repeated in all the dissertations.",
        {
          text: "OK, you could also try a service called Student Support.",
          number: 26,
        },
        "It's designed to give you a structured program over a number of weeks to develop your skills.",
        {
          text: "Yes, unfortunately there are only a few places.",
          number: 27,
        },
        "Ah. But it's worth looking into.",
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["Yes, of course.", "I know I've got to work on my study skills."],
    },
    {
      speaker: "TUTOR",
      text: [
        "And then there are several study skills books you can consult.",
        {
          text: "They'll be a good source of reference, but the problem is they are sometimes too general.",
          number: 28,
        },
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["Yes, that's what I've found."],
    },
    {
      speaker: "TUTOR",
      text: [
        "Other than that, uh, I would strongly advise quite simple ideas, uh, like using a card index.",
        "Uh. It's simple, but it really works because you have to get points down in a small space.",
        {
          text: "Another thing I always advise is don't just take your notes and forget about them. Read everything 3 times, that'll really fix them in your mind.",
          number: 29,
        },
      ],
    },
    {
      speaker: "CAROLINE",
      text: [
        "Yes, I can see it'd take discipline, but...",
        "Oh, yes, I completely agree.",
        "It's just that I don't seem to be able to discipline myself.",
        "I need to talk things over.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "Well, we'll be continuing these tutorials of course.",
        "Let's arrange next month's now.",
        "I can see you virtually any time during the week starting January 22nd.",
      ],
    },
    {
      speaker: "CAROLINE",
      text: ["What about the 24th? I'm free in the afternoon."],
    },
    {
      speaker: "TUTOR",
      text: ["Sorry, I'm booked then. What about the following day?"],
    },
    {
      speaker: "CAROLINE",
      text: ["Thursday?", "I can make the morning."],
    },
    {
      speaker: "TUTOR",
      text: [{ text: "Fine. We'll go for the 25th then.", number: 30 }],
    },
    {
      speaker: "CAROLINE",
      text: ["That's great. Thanks."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 3.",
        "You now have half a minute to check your answers. Now turn to section 4.",
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
      if (speaker === "JANE") {
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

  const correctAnswers = {
    // Questions 21–23 (notes)
    21: "future", // Dissertation topic: the future
    22: "strong", // Strengths: strong computer modelling
    23: "writing", // poor writing skills

    // Questions 24–28 (table)
    24: "confidence", // increases confidence
    25: "ideas", // same ideas
    26: "tutorial", // use the tutorial service
    27: "availability", // limited availability
    28: "general", // too general

    // Questions 29–30 (notes)
    29: "summaries", // read all notes → summaries
    30: "23rd", // 23 January
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "17-18" || id === "19-20") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
            <h1 className="text-xl font-bold">{renderText("    PART 2")}</h1>
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
                  "Caroline's Dissertation Planning and Study Skills Discussion",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–30")}
          </h2>
          <p className="font-semibold mb-4">
            {renderText("Complete the notes below.")}
          </p>
          <p className="italic mb-4">
            {renderText(
              "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
            )}
          </p>
          <div className="p-6 rounded-lg space-y-6 border mt-5 bg-white ">
            <h1 className="text-xl font-bold text-center">
              {renderText("Study Skills Tutorial – Caroline Benning")}
            </h1>

            {/* ---------- Q21–23 ---------- */}
            <div className="space-y-4">
              <p>
                <strong>{renderText("Dissertation topic:")}</strong> <br /> the{" "}
                <button
                  onClick={() => toggleButton(21)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[21]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  21
                </button>
                <input
                  type="text"
                  className=" border rounded-md px-2 py-1 w-24 ml-1"
                  value={userAnswers[21] || ""}
                  onChange={(e) => handleInputChange(21, e.target.value)}
                />
              </p>

              <p>
                <strong>{renderText("Strengths:")}</strong> <br />{" "}
                <button
                  onClick={() => toggleButton(22)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[22]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  22
                </button>
                <input
                  type="text"
                  className=" border rounded-md px-2 py-1 w-24 ml-1"
                  value={userAnswers[22] || ""}
                  onChange={(e) => handleInputChange(22, e.target.value)}
                />{" "}
                <br />
                {renderText("computer modelling")}
              </p>

              <p>
                <strong>{renderText("Weaknesses:")}</strong> <br />{" "}
                {renderText("lack of background information, poor")}{" "}
                <button
                  onClick={() => toggleButton(23)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[23]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  23
                </button>
                <input
                  type="text"
                  className=" border rounded-md px-2 py-1 w-24 ml-1"
                  value={userAnswers[23] || ""}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                />{" "}
                {renderText("skills")}
              </p>
            </div>

            {/* ---------- Q24–28 Table ---------- */}
            <div>
              <h2 className="font-bold text-lg mb-2">
                {renderText("Possible strategy")}
              </h2>

              <table className="w-full border border-collapse text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Strategy</th>
                    <th className="border p-2">Benefits</th>
                    <th className="border p-2">Problems</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">peer group discussion</td>
                    <td className="border p-2">
                      increases{" "}
                      <button
                        onClick={() => toggleButton(24)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[24]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        24
                      </button>
                      <input
                        type="text"
                        className=" border rounded-md px-2 py-1 w-24 ml-1"
                        value={userAnswers[24] || ""}
                        onChange={(e) => handleInputChange(24, e.target.value)}
                      />
                    </td>
                    <td className="border p-2">
                      dissertations tend to contain the same{" "}
                      <button
                        onClick={() => toggleButton(25)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[25]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        25
                      </button>
                      <input
                        type="text"
                        className=" border rounded-md px-2 py-1 w-24 ml-1"
                        value={userAnswers[25] || ""}
                        onChange={(e) => handleInputChange(25, e.target.value)}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">
                      use the{" "}
                      <button
                        onClick={() => toggleButton(26)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[26]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        26
                      </button>
                      <input
                        type="text"
                        className=" border rounded-md px-2 py-1 w-24 ml-1"
                        value={userAnswers[26] || ""}
                        onChange={(e) => handleInputChange(26, e.target.value)}
                      />{" "}
                      service
                    </td>
                    <td className="border p-2">
                      provides structured programme
                    </td>
                    <td className="border p-2">
                      limited{" "}
                      <button
                        onClick={() => toggleButton(27)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[27]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        27
                      </button>
                      <input
                        type="text"
                        className=" border rounded-md px-2 py-1 w-24 ml-1"
                        value={userAnswers[27] || ""}
                        onChange={(e) => handleInputChange(27, e.target.value)}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2">consult study skills books</td>
                    <td className="border p-2">
                      are a good source of reference
                    </td>
                    <td className="border p-2">
                      can be too{" "}
                      <button
                        onClick={() => toggleButton(28)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[28]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        28
                      </button>
                      <input
                        type="text"
                        className=" border rounded-md px-2 py-1 w-24 ml-1"
                        value={userAnswers[28] || ""}
                        onChange={(e) => handleInputChange(28, e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ---------- Q29–30 ---------- */}
            <div className="space-y-4">
              <p>
                <strong>{renderText("Recommendations:")}</strong>
                <br />
                {renderText("use a card index, read all notes")}{" "}
                <button
                  onClick={() => toggleButton(29)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[29]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  29
                </button>
                <input
                  type="text"
                  className=" border rounded-md px-2 py-1 w-24 ml-1"
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                />
              </p>

              <p>
                <strong>{renderText("Next tutorial date:")}</strong>
                <br />
                <button
                  onClick={() => toggleButton(30)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[30]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  30
                </button>
                <input
                  type="text"
                  className=" border rounded-md px-2 py-1 w-24 ml-1"
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                />{" "}
                {renderText("January")}
              </p>
            </div>
            <div className="mt-10">
              {!showResult ? (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setShowResult(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                  >
                    {renderText("Submit Answers")}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Result Card */}
                  <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {renderText("Result")}
                    </h1>
                    <p className="text-green-600 text-2xl font-semibold">
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (21–30)")}
                    </h3>
                    <ul className="space-y-3">
                      {Array.from({ length: 10 }, (_, i) => i + 21).map(
                        (num) => {
                          const user = userAnswers[num];
                          const correct = correctAnswers[num];

                          const isCorrect = (() => {
                            if (Array.isArray(correct)) {
                              return (
                                Array.isArray(user) &&
                                user.length === correct.length &&
                                correct.every((val) => user.includes(val))
                              );
                            } else {
                              return (
                                user?.trim().toLowerCase() ===
                                correct?.trim().toLowerCase()
                              );
                            }
                          })();

                          const noAnswer = !user;

                          const userAnswerDisplay = Array.isArray(user)
                            ? user.join(", ")
                            : user?.trim() || "";
                          const correctAnswerDisplay = Array.isArray(correct)
                            ? correct.join(", ")
                            : correct?.trim();

                          return (
                            <li
                              key={num}
                              className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                            >
                              <div className="flex items-center gap-2">
                                {isCorrect && (
                                  <FaDotCircle className="text-green-600 text-xl font-bold" />
                                )}
                                {!isCorrect && (
                                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                    <ImCross className="text-white text-sm font-bold" />
                                  </div>
                                )}
                                <p className="font-bold">Q{num}:</p>
                              </div>

                              <p className="ml-8">
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
                                {noAnswer ? (
                                  <span className="italic">
                                    No answer provided
                                  </span>
                                ) : (
                                  userAnswerDisplay
                                )}
                              </p>

                              <p className="ml-8">
                                <span className="font-semibold text-green-600">
                                  Correct Answer:
                                </span>{" "}
                                {correctAnswerDisplay}
                              </p>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening3Pagination2013></Listening3Pagination2013>
    </div>
  );
};

export default Listening3Part32013;
