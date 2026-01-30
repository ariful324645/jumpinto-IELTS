import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2025 from "../Pagination 2025/Listening1Pagination2025";

const Listening1Part32025 = () => {
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
        "Part 3. You will hear two sociology students called Tamara and Dev discussing their research for a presentation on loneliness.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully and answer questions 21 to 26.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "Shall we go through the notes we've made from our research into loneliness now, Dev?",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "OK, Tamara. It's been a real eye-opener.",
        "I had no idea that loneliness has been increasing steadily for the last 20 years.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "I know. And it's the same all over the world, the downside of a modern lifestyle, I guess.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "Did you come to any conclusions about what the reasons for the increase are?",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "Well, I assumed it was mainly an issue for the elderly, but in fact it's something which affects young people just as much.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "So nothing really to do with longer life spans.",
        "What about social media? In my case, far from making me feel isolated, it actually does the opposite.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "It definitely does more good than harm.",
        {
          text: "I'd say loneliness has a lot to do with the way cities are designed. People living in high-rise flats with not much opportunity to speak to their neighbors.",
          number: 21,
        },
      ],
    },
    {
      speaker: "DEV",
      text: ["I think you're right."],
    },
    {
      speaker: "TAMARA",
      text: [
        "Another possible reason is that people are having fewer children, and don't live in large extended family groups.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "But in this country anyway, that all changed decades ago, and yet loneliness is a more recent problem.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        {
          text: "I suppose so. A more plausible explanation is that people are having to move around for work, and often end up living miles away from their family and friends.",
          number: 22,
        },
      ],
    },
    {
      speaker: "DEV",
      text: ["That's true."],
    },
    {
      speaker: "TAMARA",
      text: [
        "Looking at the studies on health risks and loneliness, there are claims that loneliness has as much impact as smoking 15 cigarettes a day.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "Or similar to the risks caused by obesity.",
        "But I'm not sure there's enough evidence for some of these claims.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        {
          text: "What about that one in Finland, which showed that loneliness increased the risk of cancer by about 10 percent, and those findings have been supported by other studies too?",
          number: 24,
        },
      ],
    },
    {
      speaker: "DEV",
      text: [
        "You're right about that one.",
        "I was actually thinking of the studies on dementia.",
        "Some found no association between loneliness and dementia, and others found the opposite.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "Not exactly reliable then.",
        "There's been a lot of research on cardiovascular disease, and whether loneliness contributes to that.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        {
          text: "Yes, I read that it was hard to reach a judgment, as the definition of loneliness varied quite a lot, and the responses from participants were too subjective, but there's no doubt that loneliness contributes to a weakened immune system.",
          number: 23,
        },
      ],
    },
    {
      speaker: "TAMARA",
      text: ["Unquestionably, the data on that is sound."],
    },
    {
      speaker: "DEV",
      text: ["What did you think about the evolutionary theory of loneliness?"],
    },
    {
      speaker: "TAMARA",
      text: [
        "I thought the idea that loneliness evolved because it motivated people to be with other people quite convincing.",
        "Survival often depended on group cooperation.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "But I don't think there's enough evidence to claim that there must be a group of neurons in our brains which influence social behavior by making us feel bad when we're alone.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        {
          text: "There are a few studies which support the theory, but not conclusively enough. More evidence is needed.",
          number: 26,
        },
      ],
    },
    {
      speaker: "DEV",
      text: [
        {
          text: "And anyway, this theory is not really useful when it comes to solving the problem of loneliness today.",
          number: 25,
        },
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
      speaker: "DEV",
      text: [
        "Should we look at the relationship between loneliness and mental health now?",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "OK. So loneliness and depression are clearly related, and that's been recognized by various governments around the world.",
        "But unlike depression, loneliness has no recognized clinical form.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        {
          text: "There's no available diagnosis or effective treatments, and that's not likely to change.",
          number: 27,
        },
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "I don't think so either.",
        "I was thinking we should start our presentation with an example from our own experience.",
        "I'd like to talk about how lonely I was when I started university.",
        "Being away from home for the first time and all that.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        {
          text: "Good idea. Everyone will be able to relate to that, although a lot of students were probably too embarrassed to admit to it.",
          number: 28,
        },
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        "We could discuss ways of dealing with loneliness as well, like just talking to strangers.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "Loads of studies have shown that interactions with shop assistants and bar staff make people feel more optimistic and relaxed.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        {
          text: "I don't know about that, but it must make people feel more connected with their community.",
          number: 29,
        },
      ],
    },
    {
      speaker: "DEV",
      text: [
        "True, although you need to be a certain kind of person to be able to just strike up a conversation.",
      ],
    },
    {
      speaker: "TAMARA",
      text: [
        {
          text: "We should say something about solitude, and how being alone and being lonely aren't the same thing.",
          number: 30,
        },
        "It's strange the way some people can't stand being by themselves, while others love it.",
      ],
    },
    {
      speaker: "DEV",
      text: [
        "Yeah, the research shows a certain amount of solitude is beneficial for well-being.",
        "But being alone isn't something I actually like.",
        "I'd never choose to go on holiday alone, for example.",
      ],
    },
    {
      speaker: "TAMARA",
      text: ["Me neither."],
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
      if (speaker === "TAMARA") {
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

  // Marks show
  const correctAnswers = {
    // Questions 21–22 (Choose TWO letters, A–E)
    "21-22": ["B", "E"],
    // smaller nuclear families
    // a mobile workforce

    // Questions 23–24 (Choose TWO letters, A–E)
    "23-24": ["B", "E"],
    // dementia
    // cardiovascular disease

    // Questions 25–26 (Choose TWO letters, A–E)
    "25-26": ["B", "E"],
    // It needs further investigation.
    // It is difficult to understand.

    // Questions 27–30 (Choose ONE letter, A, B or C)
    27: "C", // express frustration that loneliness is not taken more seriously
    28: "B", // highlight a situation that most students will recognise
    29: "A", // it creates a sense of belonging
    30: "C", // an enjoyable experience
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22" || id === "22-24" || id === "25-26") {
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
    localStorage.setItem("/listening1Part32022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part32025");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part32025");
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
                {renderText("Sociology Students' Research on Loneliness")}
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
              {renderText("Loneliness and Mental Health")}
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
                  "Which TWO things do the students both believe are responsible for the increase in loneliness?",
                )}
              </p>

              {[
                "social media",
                "smaller nuclear families",
                "urban design",
                "longer lifespans",
                "a mobile workforce",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["21-22"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
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
                  "Which TWO health risks associated with loneliness do the students agree are based on solid evidence?",
                )}
              </p>

              {[
                "a weakened immune system",
                "dementia",
                "cancer",
                "obesity",
                "cardiovascular disease",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["23-24"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
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

            {/* ================= Questions 25–26 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 25 and 26</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                25–26{" "}
                {renderText(
                  "Which TWO opinions do both the students express about the evolutionary theory of loneliness?",
                )}
              </p>

              {[
                "It has little practical relevance.",
                "It needs further investigation.",
                "It is misleading.",
                "It should be more widely accepted.",
                "It is difficult to understand.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["25-26"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
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
              <p>
                {renderText("Choose the correct letter, ")}
                <span className="font-bold">A, B or C</span>.
              </p>

              {[
                {
                  num: 27,
                  q: "When comparing loneliness to depression, the students",
                  opts: [
                    "doubt that there will ever be a medical cure for loneliness.",
                    "claim that the link between loneliness and mental health is overstated.",
                    "express frustration that loneliness is not taken more seriously.",
                  ],
                },
                {
                  num: 28,
                  q: "Why do the students decide to start their presentation with an example from their own experience?",
                  opts: [
                    "to explain how difficult loneliness can be",
                    "to highlight a situation that most students will recognise",
                    "to emphasise that feeling lonely is more common for men than women",
                  ],
                },
                {
                  num: 29,
                  q: "The students agree that talking to strangers is a good strategy for dealing with loneliness because",
                  opts: [
                    "it creates a sense of belonging.",
                    "it builds self-confidence.",
                    "it makes people feel more positive.",
                  ],
                },
                {
                  num: 30,
                  q: "The students find it difficult to understand why solitude is considered to be",
                  opts: [
                    "similar to loneliness.",
                    "necessary for mental health.",
                    "an enjoyable experience.",
                  ],
                },
              ].map(({ num, q, opts }) => (
                <div key={num} className="mt-6">
                  <p className="font-bold text-lg">
                    {num}. {renderText(q)}
                  </p>

                  <div className="space-y-2 mt-2">
                    {opts.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx);
                      return (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`q-${num}`}
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
                      {["21-22", "23-24", "25-26", 27, 28, 29, 30].map(
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
      <Listening1Pagination2025></Listening1Pagination2025>
    </div>
  );
};

export default Listening1Part32025;
