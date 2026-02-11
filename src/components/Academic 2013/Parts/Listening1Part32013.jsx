import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2013 from "../Pagination 2013/Listening1Pagination2013";

const Listening1Part32013 = () => {
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
        "Section 3. Two overseas students called Spiros and Hiroko have just finished the first semester of their university course.",
        "They are discussing with their English language teacher how they coped with the course.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "TEACHER",
      text: [
        "Before we start, Spiros and Hiroko, thanks for coming in today to talk about your recent study experiences, and congratulations to you both on doing so well in your first semester exams.",
        "I'd like to discuss with you the value of the English for Academic Purposes course you did here last year before starting your university course.",
        "Spiros, if I could start with you. What parts of the program have now proved to be particularly valuable to you?",
      ],
    },
    {
      speaker: "SPIROS",
      text: [
        "I think that having to do a seminar presentation really helped me.",
        "For example, a couple of weeks ago in our marketing subject, when it was my turn to give a presentation, I felt quite confident.",
        "Of course, I was still nervous, but because I had done one before, I knew what to expect.",
        "I was well prepared, and I had practiced my timing.",
        {
          text: "In fact, compared with some of the other people in my group, I think I did quite a good job because my overall style was quite professional.",
          number: 21,
        },
      ],
    },
    {
      speaker: "HIROKO",
      text: [
        "That's interesting. In my group, I was really surprised by the way the students did their presentations.",
        "They just read their notes aloud.",
        {
          text: "They didn't worry about their presentation style or keeping eye contact with their audience, even though these things were strongly emphasized in the course.",
          number: 22,
        },
      ],
    },
    {
      speaker: "TEACHER",
      text: ["So how did you approach your presentation, Hiroko?"],
    },
    {
      speaker: "HIROKO",
      text: [
        "To be honest, I read my notes too.",
        {
          text: "Although it felt easier at the time, when I finished I didn't feel any real sense of satisfaction or positivity about the experience.",
          number: 23,
        },
      ],
    },
    {
      speaker: "SPIROS",
      text: [
        "That's a pity.",
        "Although I was pleased with my presentation, I'm not so pleased with my performance in tutorials.",
        {
          text: "Throughout the whole semester, I haven't said anything at all in tutorial discussions.",
          number: 24,
        },
      ],
    },
    {
      speaker: "HIROKO",
      text: [
        "Really? Spiros, why is that? Do the other students talk too much?",
      ],
    },
    {
      speaker: "SPIROS",
      text: [
        "Partly, yes, but mostly it's because I don't have the confidence to speak out.",
        "Their speaking style is very different from what we were used to during the course.",
        "They use a lot of colloquial language, they aren't very polite, and sometimes there's no clear order in the discussion.",
        {
          text: "Because they already know each other well, they can easily include one another in the discussion.",
          number: 25,
        },
      ],
    },
    {
      speaker: "HIROKO",
      text: ["You're right, Spiros. I've experienced that too."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },
    {
      speaker: "HIROKO",
      text: [
        "For most of this semester, I've said absolutely nothing in tutorials.",
        "But recently, I've started speaking up more and just jumping into the discussion.",
        {
          text: "I've noticed that if my point was interesting or new, the next time they actually asked for my opinion.",
          number: 26,
        },
      ],
    },
    {
      speaker: "SPIROS",
      text: [
        "That's great, Hiroko. I hope that happens for me next semester.",
        "I'll need to work hard to come up with interesting ideas.",
        "What helped you to find these ideas?",
      ],
    },
    {
      speaker: "HIROKO",
      text: [
        "One thing that really helped was the reading.",
        {
          text: "I had to read for hours every night, using reference lists and making detailed notes, which helped me understand the lectures and contribute ideas in tutorials.",
          number: 27,
        },
      ],
    },
    {
      speaker: "SPIROS",
      text: [
        "I did a lot of reading too, but my reading speed is still quite slow.",
        {
          text: "Although I'm better with vocabulary now, I still find reading very time-consuming.",
          number: 28,
        },
      ],
    },
    {
      speaker: "TEACHER",
      text: [
        "What else do you think we could add to the course to help with reading?",
      ],
    },
    {
      speaker: "HIROKO",
      text: [
        "I think the reading material could have been more relevant.",
        {
          text: "In the English class, we didn't read anything related to engineering, which made me feel I was wasting time on unnecessary vocabulary.",
          number: 29,
        },
      ],
    },
    {
      speaker: "TEACHER",
      text: [
        "But surely the strategies you learned for dealing with unfamiliar vocabulary were helpful.",
      ],
    },
    {
      speaker: "HIROKO",
      text: [
        {
          text: "Yes, but psychologically, I would have felt much better reading texts from my own subject area.",
          number: 30,
        },
      ],
    },
    {
      speaker: "SPIROS",
      text: [
        "I agree. That would have improved my confidence and motivation.",
        "It was good, though, that we could focus on our own topics for the research assignments.",
      ],
    },
    {
      speaker: "TEACHER",
      text: ["OK, let's move on to writing now."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
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
    21: "B", // his style was good
    22: "C", // they didn't look at the audience enough
    23: "B", // dissatisfied
    24: "A", // not very happy
    25: "C", // they know each other well
    26: "B", // she is making more of a contribution
    27: "A", // consulted reference materials
    28: "B", // it still takes him a long time to read
    29: "C", // engineering
    30: "B",
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
            <h1 className="text-xl font-bold">{renderText("    PART 3")}</h1>
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
                  "Discussion on the Value of English for Academic Purposes Course",
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

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Course Feedback")}
            </h1>

            {/* ================= Questions 21–30 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 21–30</h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  q: 21,
                  text: "One reason why Spiros felt happy about his marketing presentation was that",
                  options: [
                    "he was not nervous.",
                    "his style was good.",
                    "the presentation was the best in his group.",
                  ],
                },
                {
                  q: 22,
                  text: "What surprised Hiroko about the other students' presentations?",
                  options: [
                    "Their presentations were not interesting.",
                    "They found their presentations stressful.",
                    "They didn't look at the audience enough.",
                  ],
                },
                {
                  q: 23,
                  text: "After she gave her presentation, Hiroko felt",
                  options: ["delighted.", "dissatisfied.", "embarrassed."],
                },
                {
                  q: 24,
                  text: "How does Spiros feel about his performance in tutorials?",
                  options: [
                    "not very happy",
                    "really pleased",
                    "fairly confident",
                  ],
                },
                {
                  q: 25,
                  text: "Why can the other students participate so easily in discussions?",
                  options: [
                    "They are polite to each other.",
                    "They agree to take turns in speaking.",
                    "They know each other well.",
                  ],
                },
                {
                  q: 26,
                  text: "Why is Hiroko feeling more positive about tutorials now?",
                  options: [
                    "She finds the other students' opinions more interesting.",
                    "She is making more of a contribution.",
                    "The tutor includes her in the discussion.",
                  ],
                },
                {
                  q: 27,
                  text: "To help her understand lectures, Hiroko",
                  options: [
                    "consulted reference materials.",
                    "had extra tutorials with her lecturers.",
                    "borrowed lecture notes from other students.",
                  ],
                },
                {
                  q: 28,
                  text: "What does Spiros think of his reading skills?",
                  options: [
                    "He reads faster than he used to.",
                    "It still takes him a long time to read.",
                    "He tends to struggle with new vocabulary.",
                  ],
                },
                {
                  q: 29,
                  text: "What is Hiroko's subject area?",
                  options: [
                    "environmental studies",
                    "health education",
                    "engineering",
                  ],
                },
                {
                  q: 30,
                  text: "Hiroko thinks that in the reading classes the students should",
                  options: [
                    "learn more vocabulary.",
                    "read more in their own subject areas.",
                    "develop better reading strategies.",
                  ],
                },
              ].map(({ q, text, options }) => (
                <div key={q} className="mt-6">
                  <p className="font-bold">
                    {q} {renderText(text)}
                  </p>

                  {options.map((opt, i) => {
                    const letter = ["A", "B", "C"][i];
                    return (
                      <label
                        key={letter}
                        className="flex items-center gap-2 mt-2"
                      >
                        <input
                          type="radio"
                          name={`q${q}`}
                          value={letter}
                          checked={userAnswers[q] === letter}
                          onChange={(e) => handleInputChange(q, e.target.value)}
                        />
                        <strong>{letter}.</strong> {renderText(opt)}
                      </label>
                    );
                  })}
                </div>
              ))}
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
                      {renderText("All Answers (21–30)")}
                    </h3>

                    <ul className="space-y-3">
                      {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];
                        const isCorrect =
                          user?.trim().toLowerCase() ===
                          correct?.trim().toLowerCase();

                        return (
                          <li
                            key={num}
                            className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <FaDotCircle className="text-green-600 text-xl" />
                              ) : (
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                  <ImCross className="text-white text-sm" />
                                </div>
                              )}
                              <p className="font-bold">Q{num}:</p>
                            </div>

                            <p className="ml-8">
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {user || (
                                <span className="italic">
                                  No answer provided
                                </span>
                              )}
                            </p>

                            <p className="ml-8">
                              <span className="font-semibold text-green-600">
                                Correct Answer:
                              </span>{" "}
                              {correct}
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

export default Listening1Part32013;
