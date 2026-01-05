import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2022 from "../Pagination2022/Listening2Pagination2022";

const Listening2Part32022 = () => {
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

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 3, you will hear two Theater Studies students discussing stage and screen performances of Shakespeare's play Romeo and Juliet.",
        "First, you have some time to look at questions 21 and 22.",
        "Now listen carefully and answer questions 21 and 22.",
      ],
    },
    {
      speaker: "ED",
      text: [
        "Did you make notes while you were watching the performances of Romeo and Juliet, Gemma?",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        "Yes, I did. I found it quite hard though. I kept getting too involved in the play.",
      ],
    },
    {
      speaker: "ED",
      text: [
        "Me too. I ended up not taking notes. I wrote down my impressions when I got home. Do you mind if I check a few things with you, in case I've missed anything, and I've also got some questions about our assignment.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        "No, it's good to talk things through. I may have missed things too.",
      ],
    },
    {
      speaker: "ED",
      text: [
        "OK, great. So first of all I'm not sure how much information we should include in our reviews.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        "Right. Well, I don't think we need to describe what happens, especially as Romeo and Juliet is one of Shakespeare's most well-known plays.",
      ],
    },
    {
      speaker: "ED",
      text: [
        "Yeah, everyone knows the story. In an essay, we'd focus on the poetry and Shakespeare's use of imagery, et cetera. But that isn't really relevant in a review. We're supposed to focus on how effective this particular production is.",
      ],
    },
    {
      speaker: "GEMMA",
      text: ["Hmm, we should say what made it a success or a failure."],
    },
    {
      speaker: "ED",
      text: [
        {
          text: "And part of that means talking about the emotional impact the performance had on us.",
          number: 21,
        },
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "Yes. And we should definitely mention how well the director handled important bits of the play, like when Romeo climbs onto Juliet's balcony.",
          number: 22,
        },
      ],
    },
    {
      speaker: "ED",
      text: ["And the fight between Mercutio and Tybalt."],
    },
    {
      speaker: "GEMMA",
      text: [
        "Yes. It would also be interesting to mention the theater space, and how the director used it, but I don't think we'll have space in 800 words.",
      ],
    },
    {
      speaker: "ED",
      text: ["No, OK. That all sounds quite straightforward."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 23 to 30.",
        "Now listen and answer questions 23 to 30.",
      ],
    },
    {
      speaker: "ED",
      text: ["So, what about the Emporium Theater's production of the play?"],
    },
    {
      speaker: "GEMMA",
      text: [
        "I thought some things worked really well, but there were some problems too.",
      ],
    },
    {
      speaker: "ED",
      text: ["Yeah. What about the set for example?"],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "I think it was visually really stunning. I'd say that was probably the most memorable thing about this production.",
          number: 23,
        },
      ],
    },
    {
      speaker: "ED",
      text: [
        "You're right. The set design was really amazing, but actually I have seen similar ideas used in other productions.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        "Hmm. What about the lighting? Some of the scenes were so dimly lit, it was quite hard to see.",
      ],
    },
    {
      speaker: "ED",
      text: [
        {
          text: "I didn't dislike it. It helped to change the mood of the quieter scenes.",
          number: 24,
        },
      ],
    },
    {
      speaker: "GEMMA",
      text: ["That's a good point."],
    },
    {
      speaker: "ED",
      text: ["What did you think of the costumes?"],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "I was a bit surprised by the contemporary dress, I must say.",
          number: 25,
        },
      ],
    },
    {
      speaker: "ED",
      text: [
        "Yeah. I think it worked well, but I had assumed it would be more conventional.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "Me too. I liked the music at the beginning, and I thought the musicians were brilliant. But I thought they were wasted, because the music didn't have much impact in Acts 2 and 3.",
          number: 26,
        },
      ],
    },
    {
      speaker: "ED",
      text: ["Yes, that was a shame."],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "One problem with this production was that the actors didn't deliver the lines that well. They were speaking too fast.",
          number: 27,
        },
      ],
    },
    {
      speaker: "ED",
      text: [
        {
          text: "It was a problem I agree, but I thought it was because they weren't speaking loudly enough, especially at key points in the play.",
          number: 27,
        },
      ],
    },
    {
      speaker: "GEMMA",
      text: ["I actually didn't have a problem with that."],
    },
    {
      speaker: "ED",
      text: [
        "It's been an interesting experience watching different versions of Romeo and Juliet, hasn't it?",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        "Definitely. It's made me realize how relevant the play still is.",
      ],
    },
    {
      speaker: "ED",
      text: [
        "Right. I mean a lot's changed since Shakespeare's time, but in many ways nothing's changed. There are always disagreements and tension between teenagers and their parents.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "Yes. That's something all young people can relate to, more than the violence and the extreme emotions in the play.",
          number: 28,
        },
      ],
    },
    {
      speaker: "ED",
      text: ["How did you find watching it in translation?"],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "Really interesting. I expected to find it more challenging, but I could follow the story pretty well.",
          number: 29,
        },
      ],
    },
    {
      speaker: "ED",
      text: [
        "I stopped worrying about not being able to understand all the words, and focused on the actors' expressions. The ending was pretty powerful.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "Yes, that somehow intensified the emotion for me.",
          number: 29,
        },
      ],
    },
    {
      speaker: "ED",
      text: [
        "Did you know Shakespeare's been translated into more languages than any other writer?",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        {
          text: "What's the reason for his international appeal, do you think?",
          number: 30,
        },
      ],
    },
    {
      speaker: "ED",
      text: [
        "I was reading that it's because his plays are about basic themes that people everywhere are familiar with.",
      ],
    },
    {
      speaker: "GEMMA",
      text: [
        "Yeah. And they can also be understood on different levels. The characters have such depth.",
      ],
    },
    {
      speaker: "ED",
      text: [
        "Right. Which allows directors to experiment and find new angles.",
      ],
    },
    {
      speaker: "GEMMA",
      text: ["That's really important, because..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 3. You now have half a minute to check your answers to Part 3.",
      ],
    },
  ];

  // different option
  const questions = [
    "Which TWO facilities at the leisure club have recently been improved?",
  ];

  const options = [
    [
      "A. the gym",
      "B. the tracks",
      "C. the indoor pool",
      "D. the outdoor pool",
      "E. the sports training for children",
    ],
  ];
  const notesQuestions = [
    "New members should describe any ____.",
    "The ____ will be explained to you before you use the equipment.",
    "You will be given a six-week ____.",
    "There is a compulsory £90 ____ fee for members.",
    "Gold members are given ____ to all the LP clubs.",
    "Premier members are given priority during ____ hours.",
    "Premier members can bring some ____ every month.",
    "Members should always take their ____ with them.",
  ];
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 11;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

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
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JOY PARKINS") {
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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);
  // Marks show
  const correctAnswers = {
    "21-22": ["D", "E"],
    23: "D",
    24: "F",
    25: "A",
    26: "E",
    27: "G",
    28: "B",
    29: "C",
    30: "C",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

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
    localStorage.setItem("/listening2Part32022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32022");
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
                {renderText("Romeo and Juliet")}
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 21–22 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–22")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>

          <p className="mb-4 font-semibold">
            {renderText(
              "Which TWO things do the students agree they need to include in their reviews of Romeo and Juliet?"
            )}
          </p>

          {[
            "analysis of the text",
            "a summary of the plot",
            "a description of the theatre",
            "a personal reaction",
            "a reference to particular scenes",
          ].map((optionText, index) => {
            const value = String.fromCharCode(65 + index); // A, B, C, D, E
            const selectedOptions = userAnswers["21-22"] || [];
            const isChecked = selectedOptions.includes(value);
            const isDisabled = selectedOptions.length === 2 && !isChecked;

            return (
              <label
                key={index}
                className={`flex items-center gap-3 cursor-pointer mb-1 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleInputChange("21-22", value)}
                />
                <span className="font-semibold">{value}.</span>
                <span>{renderText(optionText)}</span>
              </label>
            );
          })}

          {/* ---------- Questions 23–27 ---------- */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23–27")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Which opinion do the speakers give about each of the following aspects of The Emporium's production of Romeo and Juliet?"
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose the correct letter, A–G, next to Questions 23–27."
              )}
            </p>

            {/* Opinions box */}
            <div className="border border-gray-400 rounded-md p-4 max-w-sm mx-auto bg-white shadow-sm mb-6">
              <h3 className="font-semibold text-center mb-3">
                {renderText("Opinions")}
              </h3>
              <ul className="space-y-1 text-gray-700">
                {[
                  "A. They both expected this to be more traditional.",
                  "B. They both thought this was original.",
                  "C. They agree this created the right atmosphere.",
                  "D. They agree this was a major strength.",
                  "E. They were both disappointed by this.",
                  "F. They disagree about why this was an issue.",
                  "G. They disagree about how this could be improved.",
                ].map((item, index) => (
                  <li key={index}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            {/* Aspects list */}
            <div className="p-5 rounded-lg bg-white space-y-4">
              {[
                { qNum: 23, aspect: "the set" },
                { qNum: 24, aspect: "the lighting" },
                { qNum: 25, aspect: "the costume design" },
                { qNum: 26, aspect: "the music" },
                { qNum: 27, aspect: "the actors' delivery" },
              ].map(({ qNum, aspect }) => (
                <div key={qNum} className="flex items-center gap-2">
                  <span className="font-semibold">{qNum}.</span>
                  <span>{renderText(aspect)}</span>
                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value="">{qNum}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Questions 28–30 ---------- */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 28–30")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose the correct letter, A, B or C.")}
            </p>

            {[
              {
                qNum: 28,
                question:
                  "The students think the story of Romeo and Juliet is still relevant for young people today because",
                options: [
                  {
                    letter: "A",
                    text: "it illustrates how easily conflict can start.",
                  },
                  {
                    letter: "B",
                    text: "it deals with problems that families experience.",
                  },
                  { letter: "C", text: "it teaches them about relationships." },
                ],
              },
              {
                qNum: 29,
                question:
                  "The students found watching Romeo and Juliet in another language",
                options: [
                  { letter: "A", text: "frustrating." },
                  { letter: "B", text: "demanding." },
                  { letter: "C", text: "moving." },
                ],
              },
              {
                qNum: 30,
                question:
                  "Why do the students think Shakespeare's plays have such international appeal?",
                options: [
                  { letter: "A", text: "The stories are exciting." },
                  { letter: "B", text: "There are recognisable characters." },
                  {
                    letter: "C",
                    text: "They can be interpreted in many ways.",
                  },
                ],
              },
            ].map(({ qNum, question, options }) => (
              <div key={qNum} className="flex flex-col gap-2 mt-4">
                <span className="font-semibold">{qNum}.</span>
                <span className="mb-2">{renderText(question)}</span>

                {options.map(({ letter, text }) => (
                  <label
                    key={letter}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q${qNum}`}
                      value={letter}
                      checked={userAnswers[qNum] === letter}
                      onChange={() => handleInputChange(qNum, letter)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">{letter}.</span>
                    <span>{renderText(text)}</span>
                  </label>
                ))}
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
      <Listening2Pagination2022></Listening2Pagination2022>
    </div>
  );
};

export default Listening2Part32022;
