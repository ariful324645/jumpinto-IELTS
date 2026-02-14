import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2013 from "../Pagination 2013/Listening2Pagination2013";

const Listening2Part32013 = () => {
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
        "Section 3. You will hear the director of studies in an English language center and a student representative talking about their self-access center.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully, and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "PAM",
      text: [
        "Hi, Jun. As you know, I've asked you here today to discuss the future of our Self-access Center.",
        "We have to decide what we want to do about this very important resource. For our English language students.",
        "So, can you tell me what the students think about this?",
      ],
    },
    {
      speaker: "JUN",
      text: [
        "Well, from the students' point of view, we would like to keep it.",
        "The majority of students say that they enjoy using it because it provides a variation on the classroom routine, and they see it as a pretty major component of their course.",
        {
          text: "But we would like to see some improvements to the equipment, particularly the computers. There aren't enough for one each at the moment, and we always have to share.",
          number: 21,
        },
      ],
    },
    {
      speaker: "PAM",
      text: [
        "Well, yes. The teachers agree that it is a very valuable resource, but one thing we have noticed is that a lot of the students are using it to check their personal emails.",
        "We don't want to stop you students using it. But we think the computers should be used as a learning resource, not for emails.",
        "Hmm. Some of us also think that we could benefit a lot more by relocating the Self-access Center to the main university library building.",
        {
          text: "How do you think the students would feel about that, Jun?",
          number: 22,
        },
      ],
    },
    {
      speaker: "JUN",
      text: [
        "Well, the library is big enough to incorporate the Self-access Center, but it wouldn't be like a class activity anymore.",
        {
          text: "Our main worry would be not being able to go to a teacher for advice.",
          number: 23,
        },
        "I'm sure there would be plenty of things to do, but we really need teachers to help us choose the best activities.",
      ],
    },
    {
      speaker: "PAM",
      text: [
        "Well, there would still be a teacher present, and he or she would guide the activities of the students.",
        "We wouldn't just leave them to get on with it.",
      ],
    },
    {
      speaker: "JUN",
      text: [
        "Yes, but I think the students would be much happier keeping the existing set-up.",
        "They really like going to the Self-access Center with their teacher, and staying together as a group to do activities.",
        "If we could just improve the resources and facilities, I think it would be fine.",
        {
          text: "Is the cost going to be a problem?",
          number: 24,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "PAM",
      text: [
        "Now what about the computers? I think it might be a good idea to install some new models.",
        "They would take up a lot less room, and so that would increase the workspace for textbooks and so on.",
      ],
    },
    {
      speaker: "JUN",
      text: ["That would be great. It is a bit cramped in there at times."],
    },
    {
      speaker: "PAM",
      text: [
        "What about other resources? Do you have a list of things that the students would like to see improved?",
      ],
    },
    {
      speaker: "JUN",
      text: [
        "Yes, one of the comments that students frequently make is that they find it difficult to find materials that are appropriate for their level. Especially reading resources, so I think we need to label them more clearly.",
        {
          text: "",
          number: 25,
        },
      ],
    },
    {
      speaker: "PAM",
      text: [
        "Well that's easy enough, we can get that organized very quickly. Hmm, in fact, I think we should review all of the study resources, as some of them are looking a bit out of date.",
      ],
    },
    {
      speaker: "JUN",
      text: [
        "Definitely. The CD section especially needs to be more current.",
        {
          text: "I think we should get some of the ones that go with our latest course books, and also make multiple copies.",
          number: 26,
        },
      ],
    },
    {
      speaker: "PAM",
      text: [
        "Good. Now, I was also thinking about some different materials that we haven't got in there at all.",
        {
          text: "What do you think of the idea of introducing some workbooks?",
          number: 27,
        },
        "If we break them up into separate pages and laminate them, they'd be a great resource.",
        "The students could study the main course book in class, and then do follow-up practice in the Self-access Center.",
      ],
    },
    {
      speaker: "PAM",
      text: [
        "OK, now finally we need to think about how the room is used.",
        "I'll have to talk to the teachers and make sure we can all reach some agreement on a timetable to supervise the Center after class.",
        {
          text: "But we also need to think about security too, especially if we're going to invest in some new equipment.",
          number: 28,
        },
      ],
    },
    {
      speaker: "JUN",
      text: [
        {
          text: "Um. What about putting in an alarm?",
          number: 29,
        },
      ],
    },
    {
      speaker: "PAM",
      text: [
        {
          text: "Good idea. The other thing I'd like to do is talk to our technicians and see whether we could somehow limit the access to email.",
          number: 30,
        },
        "I really don't want to see that resource misused.",
        "What about if we agree to only use it before and after class?",
        "Yes, that would be fine. OK, anyway, that's great for now. We'll discuss it further when we've managed to...",
      ],
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

  const correctAnswers = {
    // Questions 21–24 (MCQ: A, B, C)
    21: "C", // it is a pretty major component of their course
    22: "B", // move the Self-Access Centre elsewhere
    23: "B", // difficulty in getting help
    24: "C", // difficulty in supervising the centre

    // Questions 25–30 (NO MORE THAN TWO WORDS)
    25: "level", // label materials more clearly for level
    26: "CD", // CD section needs updating
    27: "workbooks", // introduce workbooks
    28: "timetable", // agreement on a timetable
    29: "alarm", // install an alarm
    30: "email", // limit access to email
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
                  "Improving the Self-access Centre for English Language Students",
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
              {renderText("Self-Access Centre: Improvements and Notes")}
            </h1>

            {/* ================= Questions 21–24 (Radio buttons) ================= */}
            <div className="mt-6">
              <h2 className="font-bold text-lg mb-2">
                {renderText("Questions 21–24")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  num: 21,
                  question:
                    "Students want to keep the Self-Access Centre because",
                  options: [
                    "they enjoy the variety of equipment.",
                    "they like being able to work on their own.",
                    "it is an important part of their studies",
                  ],
                },
                {
                  num: 22,
                  question: "Some teachers would prefer to",
                  options: [
                    "close the Self-Access Centre.",
                    "move the Self-Access Centre elsewhere.",
                    "restrict access to the Self-Access Centre.",
                  ],
                },
                {
                  num: 23,
                  question:
                    "The students' main concern about using the library would be",
                  options: [
                    "the size of the library.",
                    "difficulty in getting help.",
                    "the lack of materials.",
                  ],
                },
                {
                  num: 24,
                  question: "The Director of Studies is concerned about",
                  options: [
                    "the cost of upgrading the centre.",
                    "the lack of space in the centre.",
                    "the difficulty in supervising the centre.",
                  ],
                },
              ].map(({ num, question, options }) => (
                <div key={num} className="mt-4">
                  <p className="font-bold text-lg">
                    {num}. {renderText(question)}
                  </p>
                  <div className="space-y-2 mt-2">
                    {options.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx);
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
              ))}
            </div>

            {/* ================= Questions 25–30 (Input in sentence) ================= */}
            <div className="mt-8 ">
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 25–30")}
              </h2>
              <p>
                {renderText(
                  "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
                )}
              </p>

              <div className="mt-4 space-y-4 border p-4">
                <h2 className="font-bold text-xl text-center mb-4">
                  {renderText(
                    "Necessary improvements to the existing Self-Access Centre",
                  )}
                </h2>
                <p className="">
                  {renderText("The level of the ")}
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
                    value={userAnswers[25] || ""}
                    onChange={(e) => handleInputChange(25, e.target.value)}
                    className="border-1 rounded px-2 py-1"
                  />
                  {renderText(
                    " materials, in particular, should be more clearly shown.",
                  )}
                </p>

                {/* Q26 */}
                <p>
                  {renderText("Update the ")}
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
                    value={userAnswers[26] || ""}
                    onChange={(e) => handleInputChange(26, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  {renderText(" collection.")}
                </p>

                {/* Q27 */}
                <p>
                  {renderText("Buy some ")}
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
                    value={userAnswers[27] || ""}
                    onChange={(e) => handleInputChange(27, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  {renderText(" and divide them up.")}
                </p>

                {/* Q28 */}
                <p>
                  {renderText("Speak to the teachers and organise a ")}
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
                    value={userAnswers[28] || ""}
                    onChange={(e) => handleInputChange(28, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  {renderText(" for supervising the centre.")}
                </p>

                {/* Q29 */}
                <p>
                  {renderText("Install an ")}
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
                    value={userAnswers[29] || ""}
                    onChange={(e) => handleInputChange(29, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  {renderText(".")}
                </p>

                {/* Q30 */}
                <p>
                  {renderText("Restrict personal use of ")}
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
                    value={userAnswers[30] || ""}
                    onChange={(e) => handleInputChange(30, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  {renderText(" on computers.")}
                </p>
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
      <Listening2Pagination2013></Listening2Pagination2013>
    </div>
  );
};

export default Listening2Part32013;
