import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2013 from "../Pagination 2013/Listening1Pagination2013";

const Listening1Part22013 = () => {
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
        "Section 2. You will hear part of a radio program about the opening of a new local sports shop.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully, and answer questions 11 to 16.",
      ],
    },
    {
      speaker: "ANDREW",
      text: [
        "Now we go to Jane, who is going to tell us about what's happening in town this weekend.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Right, thanks Andrew. And now on to what's new, and do we really need yet another sports shop in Bradcaster? Well, most of you probably know Sports World, the branch of a Danish sports goods company that opened a few years ago. It's attracted a lot of custom. And so the company has now decided to open another branch in the area.",
        {
          text: "It's going to be in the shopping center to the west of Bradcaster.",
          number: 11,
        },
        {
          text: "So that will be good news for all of you who've found the original shop in the north of the town hard to get to.",
          number: 12,
        },
        "I was invited to a special preview, and I can promise you, this is the ultimate in sports retailing. The whole place has been given a new minimalist look with the company's signature colors of black and red. The first three floors have a huge range of sports clothing as well as equipment.",
        {
          text: "And on the top floor, there's a café and a book and DVD section. You'll find all the well-known names, as well as some less well-known ones. If they haven't got exactly what you want in stock, they promise to get it for you in 10 days, unlike the other store, where it can take up to 14 days.",
          number: 13,
        },
        "They cover all the major sports, including football, tennis, and swimming. But they particularly focus on running, and they claim to have the widest range of equipment in the country.",
        {
          text: "As well as that, a whole section of the third floor is devoted to sports bags, including the latest designs from the States.",
          number: 15,
        },
        {
          text: "If you can't find what you want here, it doesn't exist.",
          number: 16,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the program, you have some time to look at questions 17 to 20.",
        "Now listen and answer questions 17 to 20.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "The shop will be open from 9:00 am this Saturday, and if you go along to the opening, then you'll have the chance to meet the national 400 meters running champion Paul King.",
        {
          text: "Who's coming along to open the shop, and he will be staying around until about midday to chat to any fans who want to meet him and sign autographs.",
          number: 17,
        },
        "Then there will be a whole range of special attractions all weekend. There will be free tickets for local sporting events for the first 50 customers. And also a special competition open to all.",
        {
          text: "Just answer 15 out of 20 sports questions correctly to win a signed copy of Paul King's DVD 'Spring Tips', while the first person to get all the questions correct gets a year's free membership of the Bradcaster Gym.",
          number: 18,
        },
        {
          text: "All entrants will receive a special sports calendar, with details of all Bradcaster fixtures in the coming year. One of the special opening offers is a fitness test, a complete review of your cardiac fitness and muscle tone, actually done in the shop by qualified staff. This would normally cost £30 but is available at half price for this month only.",
          number: 20,
        },
        { text: "So to make a booking, phone 560341.", number: 19 },
        "In addition, if you open an account, you get lots more special offers. Including the chance to try out equipment at special open evenings.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 2.",
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
    // Questions 11–16 (Notes completion)
    11: "branch",
    12: "west",
    13: "clothing",
    14: "10",
    15: "running",
    16: "bags",

    // Questions 17–18 (Choose ONE letter, A–C)
    17: "A", // on Saturday morning only
    18: "A", // gym membership

    // Questions 19–20 (Choose TWO letters, A–E)
    "19-20": ["A", "E"], // need to reserve a place, cheaper this month
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "19-20") {
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
                {renderText("Sports World's New Branch in Bradcaster")}
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
            {renderText("Questions 11–20")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("SPORTS WORLD")}
            </h1>

            {/* ================= Questions 11–16 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 11–16</h2>
              <p className="mt-2">
                {renderText("Complete the notes below.")}
                <br />
                {renderText("Write ")}
                <span className="font-bold">
                  {renderText("ONE WORD AND/OR A NUMBER")}
                </span>
                .
              </p>

              <div className="mt-5 space-y-4 border p-5 text-lg rounded-lg">
                <p>
                  • a new{" "}
                  <input
                    className="border px-2 py-1 w-32 mx-2"
                    value={userAnswers[11] || ""}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                  />{" "}
                  of an international sports goods company
                </p>

                <p>
                  • located in the shopping centre to the{" "}
                  <input
                    className="border px-2 py-1 w-32 mx-2"
                    value={userAnswers[12] || ""}
                    onChange={(e) => handleInputChange(12, e.target.value)}
                  />{" "}
                  of Bradcaster
                </p>

                <p>
                  • has sports{" "}
                  <input
                    className="border px-2 py-1 w-32 mx-2"
                    value={userAnswers[13] || ""}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                  />{" "}
                  and equipment on floors 1–3
                </p>

                <p>
                  • can get you any item within{" "}
                  <input
                    className="border px-2 py-1 w-20 mx-2"
                    value={userAnswers[14] || ""}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                  />{" "}
                  days
                </p>

                <p>
                  • shop specialises in equipment for{" "}
                  <input
                    className="border px-2 py-1 w-32 mx-2"
                    value={userAnswers[15] || ""}
                    onChange={(e) => handleInputChange(15, e.target.value)}
                  />
                </p>

                <p>
                  • has a special section which just sells{" "}
                  <input
                    className="border px-2 py-1 w-32 mx-2"
                    value={userAnswers[16] || ""}
                    onChange={(e) => handleInputChange(16, e.target.value)}
                  />
                </p>
              </div>
            </div>

            {/* ================= Questions 17–18 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 17 and 18</h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {/* Q17 */}
              <div className="mt-4">
                <p className="font-bold">
                  17 {renderText("A champion athlete will be in the shop")}
                </p>
                {[
                  "on Saturday morning only.",
                  "all day Saturday.",
                  "for the whole weekend.",
                ].map((opt, i) => {
                  const letter = ["A", "B", "C"][i];
                  return (
                    <label
                      key={letter}
                      className="flex items-center gap-2 mt-2"
                    >
                      <input
                        type="radio"
                        name="q17"
                        value={letter}
                        checked={userAnswers[17] === letter}
                        onChange={(e) => handleInputChange(17, e.target.value)}
                      />
                      <strong>{letter}.</strong> {renderText(opt)}
                    </label>
                  );
                })}
              </div>

              {/* Q18 */}
              <div className="mt-6">
                <p className="font-bold">
                  18{" "}
                  {renderText(
                    "The first person to answer 20 quiz questions correctly will win",
                  )}
                </p>
                {["gym membership.", "a video.", "a calendar."].map(
                  (opt, i) => {
                    const letter = ["A", "B", "C"][i];
                    return (
                      <label
                        key={letter}
                        className="flex items-center gap-2 mt-2"
                      >
                        <input
                          type="radio"
                          name="q18"
                          value={letter}
                          checked={userAnswers[18] === letter}
                          onChange={(e) =>
                            handleInputChange(18, e.target.value)
                          }
                        />
                        <strong>{letter}.</strong> {renderText(opt)}
                      </label>
                    );
                  },
                )}
              </div>
            </div>

            {/* ================= Questions 19–20 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 19 and 20</h2>
              <p>{renderText("Choose TWO letters, A–E.")}</p>

              <p className="font-bold mt-2">
                19–20{" "}
                {renderText(
                  "Which TWO pieces of information does the speaker give about the fitness test?",
                )}
              </p>

              <div className="space-y-2 mt-4">
                {[
                  "You need to reserve a place.",
                  "It is free to account holders.",
                  "You get advice on how to improve your health.",
                  "It takes place in a special clinic.",
                  "It is cheaper this month.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["19-20"] || [];
                  const isChecked = selected.includes(value);
                  const disabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={value}
                      className={`flex items-center gap-2 ${
                        disabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={disabled}
                        onChange={() => handleInputChange("19-20", value)}
                      />
                      <strong>{value}.</strong> {renderText(opt)}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Submit & Result ================= */}
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
                      {renderText("All Answers (11–20)")}
                    </h3>

                    <ul className="space-y-3">
                      {[11, 12, 13, 14, 15, 16, 17, 18, "19-20"].map((num) => {
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
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening1Pagination2013></Listening1Pagination2013>
    </div>
  );
};

export default Listening1Part22013;
