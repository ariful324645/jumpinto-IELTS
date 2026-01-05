import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2021 from "../Pagination 2021/Listening1Pagination2021";

const Listening1Part32021 = () => {
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
        "Part 3. You will hear two students called Jess and Tom discussing their art projects.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "JESS",
      text: ["How are you getting on with your art project, Tom?"],
    },
    {
      speaker: "TOM",
      text: [
        "OK, like they gave us the theme of birds to base our project on, and I'm not really all that interested in wildlife. But I'm starting to get into it. I've pretty well finished the introductory stage.",
      ],
    },
    {
      speaker: "JESS",
      text: [
        "So have I. When they gave us all those handouts with details of books and websites to look at, I was really put off. But the more I read, the more interested I got.",
        {
          text: "I was really put off at first, but gradually got more interested as I read more.",
          number: 22,
        },
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Hmm. Me too. I found I could research so many different aspects of birds in art - color, movement, texture. So I was looking forward to the bird park visit.",
      ],
    },
    {
      speaker: "JESS",
      text: [
        "What a letdown. It poured with rain, and we hardly saw a single bird. Much less use than the trip to the Natural History Museum.",
        {
          text: "The bird park trip was disappointing because it rained and we hardly saw any birds.",
          number: 21,
        },
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Yeah. I liked all the stuff about evolution there. The workshop sessions with Dr Fletcher were good too, especially the brainstorming sessions.",
      ],
    },
    {
      speaker: "JESS",
      text: [
        "Oh. I missed those because I was ill. I wish we could have seen the projects last year's students did.",
      ],
    },
    {
      speaker: "TOM",
      text: ["Hmm. I suppose they want us to do our own thing, not copy."],
    },
    {
      speaker: "JESS",
      text: ["Have you drafted your proposal yet?"],
    },
    {
      speaker: "TOM",
      text: [
        "Yes, but I haven't handed it in. I need to amend some parts. I've realized the notes from my research are almost all just descriptions. I haven't actually evaluated anything, so I'll have to fix that.",
        {
          text: "My research notes are mainly descriptive; I need to add evaluation.",
          number: 24,
        },
      ],
    },
    {
      speaker: "JESS",
      text: [
        "Oh, I didn't know we had to do that. I'll have to look at that too. Did you do a timeline for the project?",
      ],
    },
    {
      speaker: "TOM",
      text: ["Yes, and a mind map."],
    },
    {
      speaker: "JESS",
      text: [
        "Yeah, so did I. I quite enjoyed that. But it was hard having to explain the basis for my decisions in my action plan.",
      ],
    },
    {
      speaker: "TOM",
      text: ["What?"],
    },
    {
      speaker: "JESS",
      text: ["You know, give a rationale."],
    },
    {
      speaker: "TOM",
      text: [
        "I didn't realize we had to do that. OK, I can add it now, and I've done the video diary presentation, and worked out what I want my outcome to be in the project.",
      ],
    },
    {
      speaker: "JESS",
      text: [
        "Someone told me it's best not to be too precise about your actual outcome at this stage, so you have more scope to explore your ideas later on. So I'm going to go back to my proposal to make it a bit more vague.",
        {
          text: "It's better to keep the project outcome vague at this stage to allow flexibility.",
          number: 23,
        },
      ],
    },
    {
      speaker: "TOM",
      text: ["Really? OK, I'll change that too then."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "One part of the project I'm unsure about is where we choose some paintings of birds, and say what they mean to us. Like, I chose a painting of a falcon by Landseer. I like it because the bird's standing there with his head turned to one side, but he seems to be staring straight at you. But I can't just say it's a bit scary, can I?",
      ],
    },
    {
      speaker: "JESS",
      text: [
        "Hmm. You could talk about the possible danger suggested by the bird's look.",
        {
          text: "You can discuss the sense of danger implied by the bird's expression.",
          number: 25,
        },
      ],
    },
    {
      speaker: "TOM",
      text: ["Oh, OK."],
    },
    {
      speaker: "JESS",
      text: [
        "There's a picture of a fish hawk by Audubon I like. It's swooping over the water with a fish in its talons, and with great black wings which take up most of the picture.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "So you could discuss it in relation to predators and food chains.",
      ],
    },
    {
      speaker: "JESS",
      text: [
        "Well, actually, I think I'll concentrate on the impression of rapid motion it gives.",
        {
          text: "Focus on the impression of rapid movement in the painting.",
          number: 26,
        },
      ],
    },
    {
      speaker: "TOM",
      text: ["Right."],
    },
    {
      speaker: "JESS",
      text: [
        "Do you know that picture of a kingfisher by van Gosh? It's perching on a reed growing near a stream.",
      ],
    },
    {
      speaker: "TOM",
      text: ["Yes, it's got these beautiful blue and red and black shades."],
    },
    {
      speaker: "JESS",
      text: [
        "Hmm. I've actually chosen it because I saw a real kingfisher once, when I was little. I was out walking with my grandfather, and I've never forgotten it.",
        {
          text: "I chose it due to a personal memory of seeing a kingfisher as a child.",
          number: 27,
        },
      ],
    },
    {
      speaker: "TOM",
      text: ["Oh, so we can use a personal link?"],
    },
    {
      speaker: "JESS",
      text: ["Sure."],
    },
    {
      speaker: "TOM",
      text: [
        "OK. There's a portrait called William Wells. I can't remember the artist, but it's a middle aged man who's just shot a bird, and his expression, and the way he's holding the bird in his hand, suggests he's not sure about what he's done. To me, it's about how ambiguous people are in the way they exploit the natural world.",
        {
          text: "This painting shows human ambiguity in exploiting nature.",
          number: 28,
        },
      ],
    },
    {
      speaker: "JESS",
      text: [
        "Interesting. There's Gauguin's picture Vairumati. He did it in Tahiti. It's a woman with a White Bird behind her that is eating a lizard, and what I'm interested in is what idea this bird refers to. Apparently, it's a reference to the never ending cycle of existence.",
        {
          text: "The bird in Gauguin's painting represents the cycle of existence.",
          number: 29,
        },
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Wow. I chose a portrait of a little boy, Giovanni de Medici. He's holding a tiny bird in one fist. I like the way he's holding it carefully, so he doesn't hurt it.",
        {
          text: "The boy carefully holding the bird shows gentleness and care.",
          number: 30,
        },
      ],
    },
    {
      speaker: "JESS",
      text: ["Uh. Right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 3.",
        "You now have half a minute to check your answers to Part 3.",
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

  //  Marks show
  const correctAnswers = {
    "21-22": ["B", "D"],
    "23-24": ["A", "D"], // changes: giving rationale + providing timeline and mind map
    // same as above
    25: "C", // Falcon – fast movement
    26: "D", // Fish hawk – a potential threat
    27: "E", // Kingfisher – the power of colour
    28: "A", // Portrait of William Wells – a childhood memory
    29: "B", // Vairumati – hope for the future
    30: "F", // Portrait of Giovanni de Medici – continuity of life
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];

      if (prevAnswers.includes(value)) {
        updated[id] = prevAnswers.filter((v) => v !== value);
      } else {
        updated[id] = [...prevAnswers, value];
      }

      calculateScore(updated);
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
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22021");
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
                {renderText("Discussing an Art Project on Birds")}
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
          {/* ---------- Questions 21–24 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–24")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>
          {/* Q21–22 */}
          <div className="mt-6">
            <p className="mb-4 font-semibold">
              {renderText("Questions 21–22: Choose TWO letters, A–E.")}
            </p>

            {[
              "the Bird Park visit",
              "the workshop sessions",
              "the Natural History Museum visit",
              "the projects done in previous years",
              "the handouts with research sources",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A, B, C...

              const selectedOptions = userAnswers["21-22"] || [];
              const isChecked = selectedOptions.includes(value);

              // 🔥 Disable logic
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer mb-1
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("21-22", value)}
                  />

                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(optionText)}</span>
                </label>
              );
            })}
          </div>

          {/* Q23–24 */}
          <div className="mt-6">
            <p className="mb-4 font-semibold">
              {renderText("Questions 23–24: Choose TWO letters, A–E.")}
            </p>

            {[
              "by giving a rationale for their action plans",
              "by being less specific about the outcome",
              "by adding a video diary presentation",
              "by providing a timeline and a mind map",
              "by making their notes more evaluative",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A, B, C...

              const selectedOptions = userAnswers["23-24"] || [];
              const isChecked = selectedOptions.includes(value);

              // 🔥 Disable when already 2 selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 mb-1 cursor-pointer
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("23-24", value)}
                  />

                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(optionText)}</span>
                </label>
              );
            })}
          </div>

          {/* ---------- Questions 25–30 ---------- */}
          <div className="mb-6 p-4 ">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {renderText("Questions 25–30")}
            </h2>
            <p className="text-gray-700 mb-4">
              {renderText(
                "Which personal meaning do the students decide to give to each of the following pictures? Choose the correct letter, A–H, next to Questions 25–30."
              )}
            </p>

            <div className="border border-gray-400 rounded-md p-4 max-w-sm mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-3">
                {renderText("Personal meanings")}
              </h3>
              <ul className="space-y-1 text-gray-700">
                {[
                  "A. a childhood memory",
                  "B. hope for the future",
                  "C. fast movement",
                  "D. a potential threat",
                  "E. the power of colour",
                  "F. the continuity of life",
                  "G. protection of nature",
                  "H. a confused attitude to nature",
                ].map((item, index) => (
                  <li key={index} className="ml-2">
                    {renderText(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-white space-y-4">
            {[
              { qNum: 25, picture: "Falcon (Landseer)" },
              { qNum: 26, picture: "Fish hawk (Audubon)" },
              { qNum: 27, picture: "Kingfisher (van Gogh)" },
              { qNum: 28, picture: "Portrait of William Wells" },
              { qNum: 29, picture: "Vairumati (Gauguin)" },
              { qNum: 30, picture: "Portrait of Giovanni de Medici" },
            ].map(({ qNum, picture }) => (
              <div key={qNum} className="flex items-center gap-2">
                <span className="font-semibold">{qNum}.</span>
                <span className="">{picture}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
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
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (21–30)
                  </h3>

                  <ul className="space-y-3">
                    {["21-22", "23-24", 25, 26, 27, 28, 29, 30].map((num) => {
                      const user = userAnswers[num];
                      const correct = correctAnswers[num];

                      // Check correctness
                      const isCorrect = (() => {
                        // MULTIPLE ANSWER (checkbox)
                        if (Array.isArray(correct)) {
                          return (
                            Array.isArray(user) &&
                            user.length === correct.length &&
                            correct.every((val) => user.includes(val))
                          );
                        }

                        // SINGLE ANSWER (select)
                        if (
                          typeof user === "string" &&
                          typeof correct === "string"
                        ) {
                          return (
                            user.toLowerCase().trim() ===
                            correct.toLowerCase().trim()
                          );
                        }

                        return false;
                      })();

                      const noAnswer = !user;

                      const userAnswerDisplay = Array.isArray(user)
                        ? user.join(", ")
                        : typeof user === "string"
                        ? user.trim()
                        : "No answer";

                      const correctAnswerDisplay = Array.isArray(correct)
                        ? correct.join(", ")
                        : typeof correct === "string"
                        ? correct.trim()
                        : "";

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
      <Listening1Pagination2021></Listening1Pagination2021>
    </div>
  );
};

export default Listening1Part32021;
