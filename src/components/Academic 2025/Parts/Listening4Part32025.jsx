import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2025 from "../Pagination 2025/Listening4Pagination2025";

const Listening4Part32025 = () => {
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
        "Part 3, you will hear two education students discussing an assignment on teaching handwriting to children.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "MAN",
      text: ["How are you getting on with the assignment on handwriting?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Not too bad. You know, I hadn't realized that children benefit in so many ways from learning to write. It's such an important skill, and yet most people think handwriting is less important than in the past, because people hardly ever write by hand these days.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes. And all the evidence suggests children should learn to write by hand before they learn to type, not least because it helps their memory.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "That's right, the physical act of writing helps children to remember letters. That seems pretty obvious when you think about it.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Ha, what's less obvious is how it helps develop their concentration.",
        { text: "They have to sit still and focus on one thing.", number: 21 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yeah. That aspect of handwriting had never occurred to me before.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Hmm, same here. I'm not sure I understand how it improves children's imagination though.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, there was that study which showed that primary age children generated more ideas when they were writing by hand than using a keyboard. I would have guessed that would be the case.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Hmm, yeah. I've never associated spatial awareness with handwriting either.",
        {
          text: "I thought spatial awareness was more to do with knowing where you are in relation to objects or other people.",
          number: 22,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Hmm, I thought that too. But good spatial awareness is essential for writing, because you have to space words correctly. It's not just fine motor skills that improve through writing, as I'd always assumed.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Hmm, handwriting is so much harder for children with dyspraxia, who have problems coordinating movement. It's good there are lots of things you can do in the classroom to help them. They need so much more support with letter formation. You need to play lots of games to help them distinguish letter shapes. Huh, it takes a lot of patience. Yeah.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I like the idea of using one of those pens that lights up if you press too hard.",
        { text: "That seems like a really simple solution.", number: 24 },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, absolutely. I'm not sure there's much you can do about children with dyspraxia writing very slowly. It's more important to focus on accuracy, and as they get more confident. I think they eventually speed up.",
        "One quite simple thing you can do is to use grid paper. So they write each letter in a box, and that trains them to space the letters correctly.",
        {
          text: "Indeed. That's more important for legibility than trying to get them to write in a straight line.",
          number: 23,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "For some children, it might be better to teach them to write on a laptop, rather than by hand. Like children with dyslexia, they often really struggle with handwriting, and some just give up.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yeah, it's not as frustrating for them if they get things wrong on a keyboard, they can be more willing to have a go, but I read that developing fluency isn't any faster.",
        {
          text: "That's right. Did you read that article on the benefits of teaching print rather than cursive handwriting, where the letters are joined up?",
          number: 25,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes. Well, in the past cursive writing was certainly considered more stylish and educated. But not anymore. Teachers' attitudes have changed because it's been proved that cursive is more difficult to learn, especially for children with learning difficulties who find joining up letters really challenging.",
        {
          text: "I agree. I was always worried that my poor handwriting affected my exam results, and now research shows that I was right to worry.",
          number: 26,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "I'm sure a lot of students think it's unfair that they're being judged on their handwriting.",
        {
          text: "Not just their knowledge, marks are definitely affected if examiners can't read the script. That's why it's always been so important to teach children to write legibly.",
          number: 27,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Do you think the role of handwriting will change in the future?",
        {
          text: "I can't see that changing much. Touch typing still isn't taught in most schools. Which is a shame, but maybe that won't be necessary in the future, because people will also be able to write by hand on digital devices.",
          number: 28,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "However, the fact is that people are writing by hand less and less and relying on digital devices. That does cause some problems.",
        {
          text: "I think you can put that down to lack of practice.",
          number: 29,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Ha ha, I expect so. Personally, I miss writing by hand. I hardly ever write anything now. I remember my grandparents had such beautiful handwriting, and it was so individual. Nobody I know would be able to identify my handwriting now. It's a shame.",
        {
          text: "I know, I feel the same way. I used to write a diary by hand. And now I do that digitally. It just seems less effort to do it that way. Hmm. So it's not just a problem.",
          number: 30,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part three.",
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
    // Questions 21–22 (Choose TWO letters, A–E)
    "21-22": ["B", "C"],
    // B: improved memory
    // C: improved concentration

    // Questions 23–24 (Choose TWO letters, A–E)
    "23-24": ["A", "C"],
    // A: not spacing letters correctly
    // C: applying too much pressure when writing

    // Questions 25–30 (Choose ONE letter, A, B or C)
    25: "C", // Children react more positively if they make a mistake
    26: "A", // cursive writing disadvantages a certain group of children
    27: "A", // evidence suggests grades are affected by poor handwriting
    28: "B", // children will continue to learn to write by hand
    29: "B", // spell and punctuate
    30: "C", // regretful that they have lost the habit
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22" || id === "23-24") {
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
    localStorage.setItem("/listening1Part22025", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22025");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22025");
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
                {renderText("Discussion on Teaching Handwriting to Children")}
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
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–30")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Teaching Handwriting")}
            </h1>

            {/* ================= Questions 21–22 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 21 and 22</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>
              <p className="font-bold text-lg mt-3">
                21–22{" "}
                {renderText(
                  "Which TWO benefits for children of learning to write did both students find surprising?",
                )}
              </p>

              {[
                "improved fine motor skills",
                "improved memory",
                "improved concentration",
                "improved imagination",
                "improved spatial awareness",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["21-22"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("21-22", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 23–24 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 23 and 24</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>
              <p className="font-bold text-lg mt-3">
                23–24{" "}
                {renderText(
                  "For children with dyspraxia, which TWO problems with handwriting do the students think are easiest to correct?",
                )}
              </p>

              {[
                "not spacing letters correctly",
                "not writing in a straight line",
                "applying too much pressure when writing",
                "confusing letter shapes",
                "writing very slowly",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["23-24"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("23-24", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 25–30 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 25–30</h2>
              <p>
                {renderText(
                  "Choose the correct letter, A, B or C for each question.",
                )}
              </p>

              {[
                {
                  num: 25,
                  text: "What does the woman say about using laptops to teach writing to children with dyslexia?",
                  options: [
                    "Children often lack motivation to learn that way.",
                    "Children become fluent relatively quickly.",
                    "Children react more positively if they make a mistake.",
                  ],
                },
                {
                  num: 26,
                  text: "When discussing whether to teach cursive or print writing, the woman thinks that",
                  options: [
                    "cursive writing disadvantages a certain group of children.",
                    "print writing is associated with lower academic performance.",
                    "most teachers in the UK prefer a traditional approach to handwriting.",
                  ],
                },
                {
                  num: 27,
                  text: "According to the students, what impact does poor handwriting have on exam performance?",
                  options: [
                    "There is evidence to suggest grades are affected by poor handwriting.",
                    "Neat handwriting is less important now than it used to be.",
                    "Candidates write more slowly and produce shorter answers.",
                  ],
                },
                {
                  num: 28,
                  text: "What prediction does the man make about the future of handwriting?",
                  options: [
                    "Touch typing will be taught before writing by hand.",
                    "Children will continue to learn to write by hand.",
                    "People will dislike handwriting on digital devices.",
                  ],
                },
                {
                  num: 29,
                  text: "The woman is concerned that relying on digital devices has made it difficult for her to",
                  options: [
                    "take detailed notes.",
                    "spell and punctuate.",
                    "read old documents.",
                  ],
                },
                {
                  num: 30,
                  text: "How do the students feel about their own handwriting?",
                  options: [
                    "concerned they are unable to write quickly",
                    "embarrassed by comments made about it",
                    "regretful that they have lost the habit",
                  ],
                },
              ].map(({ num, text, options }) => (
                <div key={num} className="mt-4">
                  <p className="font-bold">
                    {num}. {renderText(text)}
                  </p>
                  {options.map((opt, idx) => {
                    const value = String.fromCharCode(65 + idx);
                    const checked = userAnswers[num] === value;

                    return (
                      <label key={idx} className="flex items-center gap-2 mt-2">
                        <input
                          type="radio"
                          name={`q${num}`}
                          value={value}
                          checked={checked}
                          onChange={() => handleInputChange(num, value)}
                        />
                        <span className="font-semibold">{value}.</span>
                        <span>{renderText(opt)}</span>
                      </label>
                    );
                  })}
                </div>
              ))}
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
                      {["21-22", "23-24", 25, 26, 27, 28, 29, 30].map((num) => {
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
      <Listening4Pagination2025></Listening4Pagination2025>
    </div>
  );
};

export default Listening4Part32025;
