import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2023 from "../Pagination 2023/Listening2Pagination2023";

const Listening2Part32023 = () => {
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
        "Part 3, you will hear two geography students, Adam and Michelle, talking about a volcanic eruption which took place in Iceland in 1783.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully and answer questions 21 to 26.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "So, Michelle, shall we make a start on our presentation? We haven't got that much time left.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "No, Adam, but at least we've done all the background reading. I found it really interesting. I'd never even heard of the Laki eruption before this.",
      ],
    },
    {
      speaker: "ADAM",
      text: ["Me neither. I suppose 1783 is a long time ago."],
    },
    {
      speaker: "MICHELLE",
      text: [
        "But it was a huge eruption, and it had such devastating consequences.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "I know. It was great there were so many primary sources to look at. It really gives you a sense of how catastrophic the volcano was. People were really trying to make sense of the science for the first time.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        {
          text: "That's right. But what I found more significant was how it impacted directly and indirectly on political events, as well as having massive social and economic consequences.",
          number: 21,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: ["I know. That should be the main focus of our presentation."],
    },
    {
      speaker: "MICHELLE",
      text: [
        "Hmm. The observations made by people at the time were interesting, weren't they?",
      ],
    },
    {
      speaker: "ADAM",
      text: ["Hmm."],
    },
    {
      speaker: "MICHELLE",
      text: [
        "I mean, they all gave a pretty consistent account of what happened. Even if they didn't always use the same terminology.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        {
          text: "Yeah, I was surprised there were so many weather stations established by that time.",
          number: 22,
        },
        "So you know, you can see how the weather changed often by the hour.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "Right. Writers at the time talked about the Laki haze to describe the volcanic fog that spread across Europe. They all realized that this wasn't the sort of fog they were used to, and of course, this was in pre-industrial times, so they hadn't experienced sulfur smelling fog before.",
      ],
    },
    {
      speaker: "ADAM",
      text: ["No, that's true."],
    },
    {
      speaker: "MICHELLE",
      text: [
        {
          text: "Reports from the period blamed the haze for an increase in headaches, respiratory issues, and asthma attacks.",
          number: 23,
        },
        "And they all describe how it covered the sun. And made it look a strange red color.",
      ],
    },
    {
      speaker: "ADAM",
      text: ["Hmm, must have been very weird."],
    },
    {
      speaker: "MICHELLE",
      text: [
        "Ha, it's interesting that Benjamin Franklin wrote about the haze. Did you read that? He was the American ambassador in Paris at the time.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Yeah, at first no one realized that the haze was caused by the volcanic eruption in Iceland.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "It was Benjamin Franklin who realized that before anyone else.",
        {
          text: "He's often credited with that apparently, but a French naturalist beat him to it. I can't remember his name, I'd have to look it up. Then other naturalists had the same idea. All independently of each other.",
          number: 24,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Oh, right. We should talk about the immediate impact of the eruption, which was obviously enormous. Especially in Iceland where so many people died.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "Hmm, you'd expect that, and the fact that the volcanic ash drifted so swiftly, but not that the effects would go on for so long.",
        {
          text: "Or that two years after the eruption, strange weather events were being reported as far away as North America and North Africa.",
          number: 25,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "No, I found all that hard to believe too. It must have been terrible, and there was nothing anyone could do about it, even if they knew the ash cloud was coming in their direction.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "We should run through some of the terrible consequences of the eruption experienced in different countries. There's quite a varied range.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Starting with Iceland, where the impact on farming was devastating.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        {
          text: "Hmm, one of the most dramatic things there was the effect on livestock as they grazed in the fields. They were poisoned because they ate vegetation that had been contaminated with fluorine as a result of the volcanic fallout.",
          number: 27,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "That was horrible. In Egypt. The bizarre weather patterns led to a severe drought, and as a result the Nile didn't flood, which meant the crops all failed.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        {
          text: "It's so far from where the eruption happened. And yet the famine there led to more people dying than any other country.",
          number: 28,
        },
        "It was worse than the plague.",
      ],
    },
    {
      speaker: "ADAM",
      text: [
        {
          text: "OK, then in the UK the mortality rate went up a lot. Presumably from respiratory illnesses, according to one report, it was about double the usual number, and included an unusually high percentage of people under the age of 25.",
          number: 29,
        },
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "Hmm. I think people will be surprised to hear that the weather in the USA was badly affected too. George Washington even makes a note in his diary.",
        {
          text: "That they were snowbound until March in Virginia. That was before he became president.",
          number: 30,
        },
      ],
    },
    {
      speaker: "ADAM",
      text: [
        "Yes, and there was ice floating down the Mississippi, which was unprecedented.",
      ],
    },
    {
      speaker: "MICHELLE",
      text: [
        "Huh. Astonishing, really. Anyway, what do you think we should include next?",
      ],
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
      if (speaker === "MICHELLE") {
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
    // Questions 21–24 (single-choice, A–C)
    21: "C", // It had a profound effect on society
    22: "B", // the contradictions in them
    23: "B", // It was associated with health issues
    24: "A", // came to the wrong conclusion about the cause of the haze

    // Questions 25–26 (multiple-choice, choose TWO letters A–E)
    "25-26": ["A", "B"], // how widespread the effects were, how long-lasting the effects were

    // Questions 27–30 (dropdown, A–F)
    27: "A", // Iceland – This country suffered the most severe loss of life
    28: "E", // Egypt – This country saw the highest rise in food prices in the world
    29: "C", // UK – There was a significant increase in deaths of young people
    30: "F", // USA – It caused a particularly harsh winter
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "25-26") {
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
                {renderText("Laki Eruption")}
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
              {renderText("The Laki Eruption")}
            </h1>

            {/* ================= Questions 21–24 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 21–24</h2>
              <p className="mt-2">
                {renderText("Choose the correct letter, A, B or C.")}
              </p>
            </div>

            {[
              {
                num: 21,
                question:
                  "Why do the students think the Laki eruption of 1783 is so important?",
                options: [
                  "It was the most severe eruption in modern times.",
                  "It led to the formal study of volcanoes.",
                  "It had a profound effect on society.",
                ],
              },
              {
                num: 22,
                question:
                  "What surprised Adam about observations made at the time?",
                options: [
                  "the number of places producing them",
                  "the contradictions in them",
                  "the lack of scientific data to support them",
                ],
              },
              {
                num: 23,
                question:
                  "According to Michelle, what did the contemporary sources say about the Laki haze?",
                options: [
                  "People thought it was similar to ordinary fog.",
                  "It was associated with health issues.",
                  "It completely blocked out the sun for weeks.",
                ],
              },
              {
                num: 24,
                question:
                  "Adam corrects Michelle when she claims that Benjamin Franklin",
                options: [
                  "came to the wrong conclusion about the cause of the haze.",
                  "was the first to identify the reason for the haze.",
                  "supported the opinions of other observers about the haze.",
                ],
              },
            ].map(({ num, question, options }) => (
              <div key={num} className="mt-6">
                <p className="font-bold text-lg">
                  {num}. {renderText(question)}
                </p>
                <div className="space-y-2 mt-2">
                  {options.map((opt, idx) => {
                    const value = String.fromCharCode(65 + idx);
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

            {/* ================= Questions 25–26 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 25 and 26</h2>
              <p className="mt-2">{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold text-lg mt-3">
                25–26{" "}
                {renderText(
                  "Which TWO issues following the Laki eruption surprised the students?"
                )}
              </p>

              {[
                "how widespread the effects were",
                "how long-lasting the effects were",
                "the number of deaths it caused",
                "the speed at which the volcanic ash cloud spread",
                "how people ignored the warning signs",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["25-26"] || [];
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
                      onChange={() => handleInputChange("25-26", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 27–30 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 27–30</h2>
              <p className="mt-2">
                {renderText(
                  "What comment do the students make about the impact of the Laki eruption on the following countries?"
                )}
              </p>
              <p className="mt-2">
                {renderText("Choose the correct letter, A–F.")}
              </p>
              <div className="border p-4 rounded-lg max-w-[400px] mx-auto">
                <h2 className="font-bold text-xl text-center">Comments</h2>
                <ul className=" space-y-1">
                  {[
                    "This country suffered the most severe loss of life",
                    "The impact on agriculture was predictable.",
                    "There was a significant increase in deaths of young people.",
                    "Animals suffered from a sickness.",
                    "This country saw the highest rise in food prices in the world.",
                    "It caused a particularly harsh winter.",
                  ].map((comment, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">
                        {String.fromCharCode(65 + idx)}.
                      </span>{" "}
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
              <h2 className="font-bold text-xl">Countries</h2>
              {[
                { num: 27, country: "Iceland" },
                { num: 28, country: "Egypt" },
                { num: 29, country: "UK" },
                { num: 30, country: "USA" },
              ].map(({ num, country }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <div className="font-bold flex items-center gap-2 justify-center">
                    <span>{num}.</span>
                    <h2>{renderText(country)}</h2>
                  </div>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
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
                      {[21, 22, 23, 24, "25-26", 27, 28, 29, 30].map((num) => {
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
      <Listening2Pagination2023></Listening2Pagination2023>
    </div>
  );
};

export default Listening2Part32023;
