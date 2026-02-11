import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2013 from "../Pagination 2013/Listening4Pagination2013";

const Listening4Part32013 = () => {
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
        "Section 3. You will hear a conversation between an English teacher called Paul, and a former student of his called Kira.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "PAUL",
      text: ["Hello, Kira. How are you?"],
    },
    {
      speaker: "KIRA",
      text: ["Fine, thanks, Paul. How are you?"],
    },
    {
      speaker: "PAUL",
      text: [
        "Well, thanks. It's good to see you. It must be 12 months since you did our course.",
      ],
    },
    {
      speaker: "KIRA",
      text: ["That's right. It's nice to come back and say hello."],
    },
    {
      speaker: "PAUL",
      text: ["What course did you enroll in?"],
    },
    {
      speaker: "KIRA",
      text: [
        "Actually, I went straight into 3rd year pharmacy. They credited me with 2 years which probably made it more difficult for me.",
        {
          text: "Yes, and as I'd already finished a course in it in my country, I thought it would be easier if I studied something I already knew.",
          number: 21,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: [
        "I didn't realize you went into 3rd year. I thought you started in first year. No wonder it was so hard. And what do you think is one of the big differences between studying at a university here and studying in your country?",
      ],
    },
    {
      speaker: "KIRA",
      text: [
        "Well, I found it very difficult to write assignments. Because I wasn't familiar with that aspect of the system here. The main problem is that the lecturers expect you to be critical. That made me feel really terrible. I thought 'How can I possibly do it? How can I comment on someone else's research when they probably spent 5 years doing it?' I think a lot of people who come from overseas countries have similar problems, but after a while, it became easier for me. People expect you to have problems with the process of reading and writing, but in fact, it is more a question of altering your viewpoint towards academic study.",
        {
          text: "Yes, that was a big challenge for me.",
          number: 22,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: [
        "Hmm, uh, how was the content of the lectures? Was it easy for you?",
      ],
    },
    {
      speaker: "KIRA",
      text: [
        "I didn't really have many problems understanding lectures. The content was very similar to what I'd studied before.",
        {
          text: "And what about the lecturers themselves? Are they essentially the same as lecturers in your country?",
          number: 23,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: ["Uh. Well, actually no. Here they're much easier to approach."],
    },
    {
      speaker: "KIRA",
      text: [
        "After every lecture, you can go and ask them something you didn't understand, or you can make an appointment and talk to them about anything in the course.",
        {
          text: "Maybe you found them different because you're a more mature student now, whereas when you were studying in your country, you were younger and not so assertive.",
          number: 24,
        },
      ],
    },
    {
      speaker: "KIRA",
      text: [
        "No, I don't think that's the difference. Most of the students here do it. In my faculty, they all seem to make appointments, usually to talk about something in the course that's worrying them, but sometimes just about something that might really interest them.",
        {
          text: "Something they might want to specialize in. Hmm. The lecturers must set aside certain times every week when they're available for students.",
          number: 25,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: ["That's good to hear."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },
    {
      speaker: "PAUL",
      text: ["And how was your timetable? Was it a very busy year?"],
    },
    {
      speaker: "KIRA",
      text: [
        "Oh, very very busy. They make you work very hard. Apart from lectures, we had practical sessions in a lot of subjects. We did these in small groups.",
        {
          text: "I had to go and work 4 hours every week in a community pharmacy. Hmm. Actually, I enjoyed this very much, meeting new people all the time.",
          number: 26,
        },
        "Then in 2nd semester, we had to get experience in hospital dispensaries. So every second day we went to one of the big hospitals and worked there.",
        {
          text: "And on top of all that we had our assignments, which took me a lot of time. Oh, I nearly forgot, between 1st and 2nd semesters, we had to work full time for two weeks in a hospital.",
          number: 27,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: [
        "That does sound a very heavy year. So are you pleased now that you did it? Do you feel some sense of achievement?",
      ],
    },
    {
      speaker: "KIRA",
      text: [
        {
          text: "Yeah, I do feel much more confident, which I suppose is the most important thing.",
          number: 29,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: [
        "And have you got any recommendations for people who are studying from overseas?",
      ],
    },
    {
      speaker: "KIRA",
      text: [
        "Well, I suppose they need very good English. It would be much better if they spent more time learning English before they enter the university. Because you can be in big trouble if you don't understand what people are saying, and you haven't got time to translate.",
        {
          text: "Uh. Anything else?",
          number: 28,
        },
        {
          text: "Well, as I said before. The biggest problem for me was lack of familiarity with the education system here.",
          number: 30,
        },
      ],
    },
    {
      speaker: "PAUL",
      text: ["It sounds as if it was a real challenge. Congratulations, Kira."],
    },
    {
      speaker: "KIRA",
      text: ["Hmm, thanks, Paul."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 3.",
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
    // Questions 21–22: Radio buttons (A–C)
    21: "A", // completed a course
    22: "C", // change her way of thinking

    // Questions 23–25: ONE WORD ONLY
    23: "approach", // lecturers are easier to approach
    24: "mature", // Kira may be more mature
    25: "interest", // things that interest them very much

    // Questions 26–30: NO MORE THAN THREE WORDS / NUMBER
    26: "small groups", // practical sessions done in small groups
    27: "every second day", // worked in hospital every second day
    28: "two weeks", // full-time work for two weeks
    29: "confident", // having completed the year, feels confident
    30: "education system", // need to become familiar with education system
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
                {renderText("Kira's University Study Experience and Insights")}
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

          {/* ---------- Instructions ---------- */}
          <h3 className="text-lg mb-6">
            {renderText("Follow the instructions for each question type.")}
          </h3>

          {/* ================= Questions 21–22 (Radio buttons) ================= */}
          <div className=" p-6  rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Kira's University Study Experience")}
            </h1>

            {[21, 22].map((num) => {
              const questions = {
                21: {
                  question: "In her home country, Kira had",
                  options: [
                    "completed a course.",
                    "done two years of a course.",
                    "found her course difficult.",
                  ],
                },
                22: {
                  question: "To succeed with assignments, Kira had to",
                  options: [
                    "read faster.",
                    "write faster.",
                    "change her way of thinking.",
                  ],
                },
              };
              return (
                <div key={num} className="mt-4">
                  <p className="font-bold text-lg">
                    {num}. {renderText(questions[num].question)}
                  </p>
                  <div className="space-y-2 mt-2">
                    {questions[num].options.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx); // A, B, C
                      return (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={num}
                            value={value}
                            checked={userAnswers[num] === value}
                            onChange={() => handleInputChange(num, value)}
                          />
                          <span className="font-semibold">{value}.</span>
                          <span>{renderText(opt)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* ================= Questions 23–30 (Input fields) ================= */}
            {[23, 24, 25, 26, 27, 28, 29, 30].map((num) => {
              const questions = {
                23: "Kira says that lecturers are easier to",
                24: "Paul suggests that Kira may be more",
                25: "Kira says that students want to discuss things that worry them or that",
                26: "How did the students do their practical sessions?",
                27: "In the second semester how often did Kira work in a hospital?",
                28: "How much full-time work did Kira do during the year?",
                29: "Having completed the year, how does Kira feel?",
                30: "In addition to the language, what do overseas students need to become familiar with?",
              };
              return (
                <div key={num} className="mt-4 flex items-center gap-3">
                  <div>
                    {" "}
                    <span className="w-[280px]">
                      {renderText(questions[num])}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleButton(num)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[num]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    {num}
                  </button>
                  <input
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1 w-48"
                  />
                </div>
              );
            })}
          </div>

          {/* ---------- Submit & Results ---------- */}
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
      <Listening4Pagination2013></Listening4Pagination2013>
    </div>
  );
};

export default Listening4Part32013;
