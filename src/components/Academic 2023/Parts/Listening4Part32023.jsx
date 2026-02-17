import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2023 from "../Pagination 2023/Listening4Pagination2023";

const Listening4Part32023 = () => {
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
        "Part 3, following instructions from their tutor, you will hear two trainee teachers discussing the use of origami, a paper folding activity in the classroom.",
        "First, you have some time to look at questions 21 to 27.",
        "Now listen carefully and answer questions 21 to 27.",
      ],
    },
    {
      speaker: "TUTOR",
      text: [
        "So now I want you to discuss the lesson we've just been watching on the video, and think about the ways in which origami can be a useful educational tool.",
        "Can you all work with the person sitting next to you?",
      ],
    },
    {
      speaker: "SEB",
      text: [
        "I had no idea that such a simple thing like folding squares of paper to make the shape of something like a bird could be such an amazing tool.",
        "It's made me see origami in a whole new light.",
        {
          text: "On the video you could see them really listening hard to make sure they did all the steps in the right order to make the bird.",
          number: 21,
        },
      ],
    },
    {
      speaker: "LIA",
      text: [
        "I know.",
        "It was interesting to see the educational skills the children were developing by doing origami.",
        {
          text: "One thing that really stood out for me was that the children were all having fun while being taught something new.",
          number: 22,
        },
      ],
    },
    {
      speaker: "SEB",
      text: [
        "That's right.",
        "In this lesson, they were working individually, but it would also be interesting to see if the children could work out how to make something simple without being given any direction.",
        "That would help with building teamwork as well.",
      ],
    },
    {
      speaker: "LIA",
      text: [
        "Yes, but much more of a challenge.",
        "I wrote all their names down and took some notes.",
      ],
    },
    {
      speaker: "SEB",
      text: ["Yes, I did too."],
    },
    {
      speaker: "LIA",
      text: [
        "OK, good. Let's start with Sid.",
        "He was interesting, because before they started doing the origami, he was being quite disruptive.",
        {
          text: "Yes, he really benefited from having to use his hands. It helped him to settle down and start concentrating.",
          number: 23,
        },
      ],
    },
    {
      speaker: "SEB",
      text: [
        "Yes, I noticed that too. What about Jack?",
        {
          text: "You could see him trying out different things rather than asking the teacher for help.",
          number: 24,
        },
      ],
    },
    {
      speaker: "LIA",
      text: [
        "Hmm. What did you make of Naomi?",
        "She seemed to be losing interest at one point, but then she decided she wanted her mouse to be the best. And that motivated her to try harder.",
      ],
    },
    {
      speaker: "SEB",
      text: [
        {
          text: "She didn't seem satisfied with hers in the end, though.",
          number: 25,
        },
      ],
    },
    {
      speaker: "LIA",
      text: [
        "No.",
        "Anya was such a star. She listened so carefully, and then produced the perfect bird with very little effort.",
        {
          text: "Hmm, I think the teacher could have increased the level of difficulty for her.",
          number: 26,
        },
      ],
    },
    {
      speaker: "SEB",
      text: [
        "Hmm, maybe. I think it was the first time Zara had come across origami.",
        {
          text: "She seemed unsure about what she was supposed to do. But in the end, hers didn't turn out too badly.",
          number: 27,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 28 to 30.",
        "Now listen and answer questions 28 to 30.",
      ],
    },
    {
      speaker: "LIA",
      text: [
        "I think one reason why the origami activity worked so well in this class was that the teacher was well prepared.",
      ],
    },
    {
      speaker: "SEB",
      text: [
        "Right. I think it would have taken me ages to prepare examples showing each of the steps involved in making the bird. But that was a really good idea.",
        {
          text: "The children could see what they were aiming for, and much better for them to be able to hold something, rather than just looking at pictures.",
          number: 28,
        },
      ],
    },
    {
      speaker: "LIA",
      text: [
        "Hmm, those physical examples supported her verbal explanations really well.",
        "It's strange that origami isn't used more widely. Why do you think that is?",
      ],
    },
    {
      speaker: "SEB",
      text: [
        "Oh, I don't know. It's no different to any other craft activity. I bet it's because so many teachers are clumsy like me.",
        {
          text: "Too much effort required if you're not good with your hands.",
          number: 29,
        },
      ],
    },
    {
      speaker: "LIA",
      text: [
        "Well, anyway, I think we should try it out in our maths teaching practice with Year 3. I can see using origami is a really engaging way of reinforcing children's knowledge of geometric shapes, like they were doing in the video.",
        "But I think it would also work really well for presenting fractions, which is coming up soon.",
        {
          text: "That's something most of the kids in that class might struggle with. Origami would also be good practice for using symmetry.",
          number: 30,
        },
      ],
    },
    {
      speaker: "SEB",
      text: [
        "OK. Well, let's try and get some ideas together, and plan the lesson next week.",
      ],
    },
    {
      speaker: "TUTOR",
      text: ["OK, if you could all stop..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "LIA") {
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
    "21-22": ["B", "E"], // following instructions, developing hand-eye coordination
    23: "D", // Sid → seemed to find the activity calming
    24: "A", // Jack → demonstrated independence
    25: "C", // Naomi → developed a competitive attitude
    26: "E", // Anya → seemed pleased with the results
    27: "F", // Zara → seemed confused
    28: "A", // Teacher should make models demonstrating the stages
    29: "B", // Some teachers might not have the necessary skills
    30: "C", // Students use origami to introduce a new concept in maths
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22") {
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
    localStorage.setItem("/listening3Part32023", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part32023");
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
                {renderText("Children Doing Origami")}
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
              {renderText("Children Doing Origami")}
            </h1>

            {/* ================= Questions 21–22 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 21 and 22</h2>
              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                21–22{" "}
                {renderText(
                  "Which TWO educational skills were shown in the video of children doing origami?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "solving problems",
                  "following instructions",
                  "working cooperatively",
                  "learning through play",
                  "developing hand-eye coordination",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["21-22"] || [];
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
                        onChange={() => handleInputChange("21-22", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 23–27 ================= */}
            <div>
              <h2 className="font-bold text-xl mt-8">Questions 23–27</h2>
              <p className="mt-2">
                {renderText(
                  "Which comment do the students make about each of the following children in the video?"
                )}
              </p>
              <p className="mt-2">
                {renderText(
                  "Choose the correct letter, A–G, next to Questions 23–27."
                )}
              </p>

              <div className="mt-4 border max-w-[500px] mx-auto p-4">
                <h3 className="font-bold text-lg mb-2 text-center">
                  {renderText("Comments")}
                </h3>
                <ul className=" space-y-1">
                  {[
                    { letter: "A", text: "demonstrated independence" },
                    { letter: "B", text: "asked for teacher support" },
                    { letter: "C", text: "developed a competitive attitude" },
                    {
                      letter: "D",
                      text: "seemed to find the activity calming",
                    },
                    { letter: "E", text: "seemed pleased with the results" },
                    { letter: "F", text: "seemed confused" },
                    { letter: "G", text: "seemed to find the activity easy" },
                  ].map((comment) => (
                    <li key={comment.letter}>
                      <span className="font-semibold">{comment.letter}.</span>{" "}
                      {renderText(comment.text)}
                    </li>
                  ))}
                </ul>
              </div>

              {[
                { num: 23, child: "Sid" },
                { num: 24, child: "Jack" },
                { num: 25, child: "Naomi" },
                { num: 26, child: "Anya" },
                { num: 27, child: "Zara" },
              ].map(({ num, child }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <div className="font-bold flex items-center gap-2 justify-center">
                    <span>{num}.</span>
                    <h2>{renderText(child)}</h2>
                  </div>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 28–30 ================= */}
            <div>
              {/* ================= Questions 28–30 ================= */}
              <div>
                <h2 className="font-bold text-xl mt-10">Questions 28–30</h2>

                {[
                  {
                    num: 28,
                    question:
                      "Before starting an origami activity in class, the students think it is important for the teacher to",
                    options: [
                      "make models that demonstrate the different stages.",
                      "check children understand the terminology involved.",
                      "tell children not to worry if they find the activity difficult.",
                    ],
                  },
                  {
                    num: 29,
                    question:
                      "The students agree that some teachers might be unwilling to use origami in class because",
                    options: [
                      "they may not think that crafts are important.",
                      "they may not have the necessary skills.",
                      "they may worry that it will take up too much time.",
                    ],
                  },
                  {
                    num: 30,
                    question:
                      "Why do the students decide to use origami in their maths teaching practice?",
                    options: [
                      "to correct a particular misunderstanding",
                      "to set a challenge",
                      "to introduce a new concept",
                    ],
                  },
                ].map(({ num, question, options }) => (
                  <div key={num} className="mt-4">
                    <p className="font-bold">
                      {num}. {renderText(question)}
                    </p>
                    <div className="flex flex-col mt-2 space-y-1">
                      {options.map((opt, idx) => {
                        const value = String.fromCharCode(65 + idx); // A, B, C
                        const selected = userAnswers[num] || "";
                        return (
                          <label key={idx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`q${num}`}
                              value={value}
                              checked={selected === value}
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
            </div>

            {/* ================= Submit & Results ================= */}
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
                      {renderText("Your Score: ")}
                      {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (21–30)")}
                    </h3>

                    <ul className="space-y-3">
                      {["21-22", 23, 24, 25, 26, 27, 28, 29, 30].map((num) => {
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
      <Listening4Pagination2023></Listening4Pagination2023>
    </div>
  );
};

export default Listening4Part32023;
