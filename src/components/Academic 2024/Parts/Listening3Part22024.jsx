import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2024 from "../Pagination 2024/Listening2Pagination2024";
import Listening3Pagination2024 from "../Pagination 2024/Listening3Pagination2024";

const Listening3Part22024 = () => {
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
        "Part 2, you will hear the organizer of a children's book festival giving some information about it on a local radio program.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully and answer questions 11 to 16.",
      ],
    },
    {
      speaker: "PRESENTER",
      text: [
        "The Children's Book Festival is coming up again soon, and here to tell us all about it is the festival's organizer, Jenny Morgan.",
        "So, tell us what we can expect this year, Jenny.",
      ],
    },
    {
      speaker: "JENNY",
      text: [
        "Well, as usual, we've got five days of action-packed, exciting events for children, with writers coming from all over the country getting involved.",
        "Just to give you an idea of what's on offer in the workshops.",
        {
          text: "First of all, there's a very special event called Superheroes.",
          number: 11,
        },
        "This is a chance for deaf children to share their reading experiences with author Madeleine Gordon, who is herself hearing impaired.",
        {
          text: "'Just do it' is a practical workshop, led by the well-known illustrator Mark Keane.",
          number: 12,
        },
        "He'll take participants on a magical journey to far away lands, with an opportunity for aspiring actors to do some role play.",
        {
          text: "'Count on me' is an inspiring and entertaining look at the issues of friendship for 13–14-year-olds.",
          number: 13,
        },
        "It looks at some of the friendships described in popular books and asks participants to compare these with their own experiences.",
        {
          text: "'Speak up' is part of a series of workshops on the subject of mental health.",
          number: 14,
        },
        "This is a creative writing workshop, encouraging children to describe situations where young people experience loneliness.",
        {
          text: "'Jump for joy' is the heart-warming, best-selling story by Nina Karan.",
          number: 15,
        },
        "It's about a young girl's trip to visit her relatives in India and recently received the gold medal at the Waterford Awards.",
        "Nina will get children to celebrate the word joy by writing a poem.",
        {
          text: "'Sticks and stones' is a beautifully illustrated picture book for young readers.",
          number: 16,
        },
        "It's about a community who organize an African-Caribbean festival to help local children learn about their Jamaican roots.",
        "This will be a musical event where children will have the chance to play steel drums.",
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
      speaker: "PRESENTER",
      text: [
        "Thanks, Jenny. That all sounds really interesting.",
        "I'm just wondering if you have a favourite book you could recommend for our listeners?",
      ],
    },
    {
      speaker: "JENNY",
      text: [
        {
          text: "It's hard to choose, but 'Alive and Kicking' is definitely worth mentioning.",
          number: 17,
        },
        "You won't have heard of the writer, as it's her first book.",
        "It's basically the teenage diary of a boy from Somalia who comes to live in the UK.",
        {
          text: "It deals with the serious issue of immigration.",
          number: 18,
        },
        "And all the challenges the boy has to face at school and with the language barrier.",
        "Usually books like this are quite sad, but this one actually made me cry with laughter.",
        {
          text: "On each page there are simple but hilarious black and white stick drawings.",
          number: 19,
        },
        "At the end of each diary entry, there are new English words the boy learns each day.",
        {
          text: "If you want to encourage children to read, it's a good idea to share books with them.",
          number: 20,
        },
        "Reading aloud, audiobooks, and introducing new genres can really help.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have 30 seconds to check your answers to part 2.",
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

  const correctAnswers = {
    // Questions 11–16 (Single-choice, A–H)
    11: "C", // Superheroes → aimed at children with a disability
    12: "F", // Just do it → aimed at a specific age group
    13: "E", // Count on me → focuses on new relationships
    14: "D", // Speak up → involves a drama activity
    15: "A", // Jump for joy → involve painting and drawing
    16: "H", // Sticks and stones → raises awareness of a particular culture

    // Questions 17–18 (Choose TWO letters, A–E)
    "17-18": ["A", "E"],
    // A: It will appeal to both boys and girls
    // E: It deals with an important topic

    // Questions 19–20 (Choose TWO letters, A–E)
    "19-20": ["B", "D"],
    // B: Allow children to listen to audio books
    // D: Give children a choice about what they read
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
                  "Children's Book Festival Highlights and Reading Tips"
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
            {renderText("Questions 11–20")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Children’s Book Festival")}
            </h1>

            {/* ================= Questions 11–16 (Dropdown) ================= */}
            <div>
              <h2 className="font-bold text-xl">
                {renderText("Questions 11–16")}
              </h2>
              <p className="mt-2">
                {renderText(
                  "What information is given about each of the following festival workshops?"
                )}
              </p>
              <p className="mt-1">
                {renderText("Choose the correct letter, A–H.")}
              </p>

              {/* Information List */}
              <div className="mt-4 space-y-1 text-sm">
                {[
                  "A. involve painting and drawing",
                  "B. will be led by a prize-winning author",
                  "C. is aimed at children with a disability",
                  "D. involves a drama activity",
                  "E. focuses on new relationships",
                  "F. is aimed at a specific age group",
                  "G. explores an unhappy feeling",
                  "H. raises awareness of a particular culture",
                ].map((item, idx) => (
                  <p key={idx}>{renderText(item)}</p>
                ))}
              </div>

              {/* Dropdown Questions */}
              {[
                { num: 11, label: "Superheroes" },
                { num: 12, label: "Just do it" },
                { num: 13, label: "Count on me" },
                { num: 14, label: "Speak up" },
                { num: 15, label: "Jump for joy" },
                { num: 16, label: "Sticks and stones" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <span className="font-bold">{num}</span>
                  <span className="w-40">{renderText(label)}</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 17–18 (Multiple Choice) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 17 and 18")}
              </h2>
              <p>{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-2">
                17–18{" "}
                {renderText(
                  "Which TWO reasons does the speaker give for recommending Alive and Kicking?"
                )}
              </p>

              {[
                "It will appeal to both boys and girls.",
                "The author is well known.",
                "It has colourful illustrations.",
                "It is funny.",
                "It deals with an important topic.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["17-18"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("17-18", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 19–20 (Multiple Choice) ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">
                {renderText("Questions 19 and 20")}
              </h2>
              <p>{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-2">
                19–20{" "}
                {renderText(
                  "Which TWO pieces of advice does the speaker give to parents about reading?"
                )}
              </p>

              {[
                "Encourage children to write down new vocabulary.",
                "Allow children to listen to audio books.",
                "Get recommendations from librarians.",
                "Give children a choice about what they read.",
                "Only read aloud to children until they can read independently.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["19-20"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("19-20", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
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
                      {renderText("All Answers (11–20)")}
                    </h3>

                    <ul className="space-y-3">
                      {[11, 12, 13, 14, 15, 16, "17-18", "19-20"].map((num) => {
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
      <Listening3Pagination2024></Listening3Pagination2024>
    </div>
  );
};

export default Listening3Part22024;
