import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2013 from "../Pagination 2013/Listening2Pagination2013";

const Listening2Part42013 = () => {
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
        "Section 4. You will hear the beginning of a lecture about business cultures.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning everyone.",
        "Now whether you're going to university to study business or some other subject, many of you will eventually end up working for a company of some kind.",
        "Now when you first start working somewhere, you will realize that the organization you've joined has certain characteristics.",
        "And we often refer to these social characteristics as the culture of the organization.",
        "This includes its unwritten ideas, beliefs, values, and things like that.",
        "One well-known writer has classified company cultures by identifying four major types.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "The first type is called the power culture.",
        "And it's usually found in small organizations.",

        {
          text: "It's the type of culture that needs a central source of power to be effective, and because control is in the hands of just one or two people there aren't many rules or procedures.",
          number: 31,
        },
        "There aren't many rules or procedures.",

        {
          text: "Another characteristic is that communication usually takes the form of conversations rather than say formal meetings or written memos. conversations",
          number: 32,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Now one of the benefits of this culture is that the organization has the ability to act quickly, so it responds well to threat or danger on the one hand, and opportunity on the other.",

        {
          text: "But on the negative side, this type of organization doesn't always act effectively, because it depends too much on one or two people at the top.",
          number: 33,
        },
        "And when these people make poor decisions, there's no one else who can influence them.",

        {
          text: "poor decisions And the kind of person who does well in this type of business culture is one who is happy to take risks, and for whom job security is a low priority. risk-taking",
          number: 34,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "The next type is known as role culture.",
        "And this type is usually found in large companies, ",
        {
          text: "which have lots of different levels in them.",
          number: 35,
        },
        "These organizations usually have separate departments that specialize in things like finance or sales or maintenance or whatever.",
        "Each one is coordinated at the top by a small group of senior managers, and typically everyone's job is controlled by sets of rules and procedures.",
        {
          text: "For example, there are specific job descriptions, rules for discipline, and so on.",
          number: 36,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "What are the benefits of this kind of culture?",
        "Well firstly, because it's found in large organizations, its fixed costs, or overheads as they're known, are low in relation to its output.",
        "In other words, it can achieve economies of scale.",
        "",
        {
          text: "And secondly, it is particularly successful in business markets where technical expertise is important.",
          number: 37,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        {
          text: "On the other hand, this culture is often very slow to recognize the need for change, and even slower to react.",
          number: 38,
        },
        "What kind of person does this type of culture suit?",

        {
          text: "Well, it suits employees who value security, and who don't particularly want to have responsibility. job security",
          number: 39,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Moving on now to task cultures.",
        "This type is found in organizations that are project oriented.",
        "You usually find it where the market for the company's product is extremely competitive.",
        "Or where the products themselves have a short lifespan.",
        "Usually top management delegates the projects, the people, and other resources.",

        {
          text: "Now one of the major benefits of this culture is that it's flexible, but it does have some major disadvantages too.",
          number: 40,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 4.",
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
    31: "centralised", // power source
    32: "conversation", // communication by
    33: "decisively", // might not act decisively
    34: "responsibility", // not afraid of responsibility

    35: "highly", // many highly specialised departments
    36: "descriptions", // job descriptions
    37: "technical", // technical ability is important
    38: "change", // slow to see when change is needed
    39: "responsibility", // doesn't want responsibility

    40: "flexibility", // advantage of task culture
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
                {renderText("Company Culture Types and Their Characteristics")}
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
            • {renderText("Questions 31–40")}
          </h2>

          <h3 className="text-lg mb-6">
            • {renderText("Complete the notes below.")} <br />
            <br />• {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 max-w-2xl mx-auto rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              • {renderText("Business Cultures")}
            </h1>

            {/* ================= Power culture ================= */}
            <h2 className="text-xl font-bold">{renderText("Power culture")}</h2>

            <p className="text-lg">
              {renderText("Characteristics of organisation")}
            </p>
            <p className="text-lg">{renderText("small")}</p>

            <p className="text-lg">
              <button
                onClick={() => toggleButton(31)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[31]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                31
              </button>
              <input
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText(" power source")}
            </p>

            <p className="text-lg">{renderText("few rules and procedures")}</p>

            <p className="text-lg">
              {renderText("communication by")}
              <button
                onClick={() => toggleButton(32)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[32]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                32
              </button>
              <input
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            <p className="text-lg font-semibold">{renderText("Advantage:")}</p>
            <p className="text-lg">{renderText("can act quickly")}</p>

            <p className="text-lg font-semibold">
              {renderText("Disadvantage:")}
            </p>
            <p className="text-lg">
              {renderText("might not act")}
              <button
                onClick={() => toggleButton(33)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[33]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                33
              </button>
              <input
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            <p className="text-lg font-semibold">
              {renderText("Suitable employee:")}
            </p>
            <p className="text-lg">
              {renderText("not afraid of")}
              <button
                onClick={() => toggleButton(34)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[34]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                34
              </button>
              <input
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>
            <p className="text-lg">{renderText("doesn't need job security")}</p>

            {/* ================= Role culture ================= */}
            <h2 className="text-xl font-bold mt-4">
              {renderText("Role culture")}
            </h2>

            <p className="text-lg">
              {renderText("Characteristics of organisation:")}
            </p>

            <p className="text-lg">
              {renderText("large, many")}
              <button
                onClick={() => toggleButton(35)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[35]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                35
              </button>
              <input
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            <p className="text-lg">{renderText("specialised departments")}</p>

            <p className="text-lg">
              {renderText("rules and procedure, e.g. job")}
              <button
                onClick={() => toggleButton(36)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[36]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                36
              </button>
              <input
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText(" and rules for discipline")}
            </p>

            <p className="text-lg font-semibold">{renderText("Advantages:")}</p>
            <p className="text-lg">{renderText("economies of scale")}</p>

            <p className="text-lg">
              {renderText("successful when")}
              <button
                onClick={() => toggleButton(37)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[37]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                37
              </button>
              <input
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText(" ability is important")}
            </p>

            <p className="text-lg font-semibold">
              {renderText("Disadvantages:")}
            </p>

            <p className="text-lg">
              {renderText("slow to see when")}
              <button
                onClick={() => toggleButton(38)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[38]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                38
              </button>
              <input
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText(" is needed")}
            </p>

            <p className="text-lg">{renderText("slow to react")}</p>

            <p className="text-lg font-semibold">
              {renderText("Suitable employee:")}
            </p>
            <p className="text-lg">{renderText("values security")}</p>

            <p className="text-lg">
              {renderText("doesn't want")}
              <button
                onClick={() => toggleButton(39)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[39]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                39
              </button>
              <input
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* ================= Task culture ================= */}
            <h2 className="text-xl font-bold mt-4">
              {renderText("Task culture")}
            </h2>

            <p className="text-lg">
              {renderText("Characteristics of organisation:")}
            </p>
            <p className="text-lg">{renderText("project orientated")}</p>
            <p className="text-lg">
              {renderText(
                "in competitive market or making product with short life",
              )}
            </p>
            <p className="text-lg">{renderText("a lot of delegation")}</p>

            <p className="text-lg font-semibold">{renderText("Advantage:")}</p>
            <p className="text-lg">
              <button
                onClick={() => toggleButton(40)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[40]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                40
              </button>
              <input
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
                className="border rounded-md px-2 py-1 w-48"
              />
            </p>

            <p className="text-lg">
              {renderText(
                "Disadvantages: no economies of scale or special expertise",
              )}
            </p>

            <p className="text-lg font-semibold">
              {renderText("Suitable employee:")}
            </p>
            <p className="text-lg">{renderText("likes to work in groups")}</p>
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
                    {[31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map((num) => {
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
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
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

export default Listening2Part42013;
