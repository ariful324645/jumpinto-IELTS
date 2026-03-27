import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2021 from "../Pagination 2021/Listening2Pagination2021";

const Listening2Part32021 = () => {
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
        "Part 3. You will hear two psychology students called Luke and Susie discussing their assignment on sleep and dreams.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        "So, Luke, for our next psychology assignment, we have to do something on sleep and dreams.",
      ],
    },
    {
      speaker: "LUKE",
      text: [
        "Right. I've just read an article suggesting why we tend to forget most of our dreams soon after we wake up.",
        "I mean most of my dreams aren't that interesting anyway, but what it said was that if we remembered everything, we might get mixed up about what actually happened.",
        {
          text: "And what we dreamed, so it's a sort of protection.",
          number: 21,
        },
        "I hadn't heard that idea before. I'd always assumed that it was just that we didn't have room in our memories for all that stuff.",
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        "Me too. What do you think about the idea that our dreams may predict the future?",
      ],
    },
    {
      speaker: "LUKE",
      text: ["It's a belief that you get all over the world."],
    },
    {
      speaker: "SUSIE",
      text: [
        "Yeah, lots of people have a story of it happening to them.",
        "But the explanation I've read is that for each dream that comes true, we have thousands that don't.",
        "But we don't notice those, we don't even remember them.",
        "We just remember the ones where something in the real world, like a view or an action happens to trigger a dream memory.",
      ],
    },
    {
      speaker: "LUKE",
      text: [
        {
          text: "Right. So it's just a coincidence really.",
          number: 22,
        },
      ],
    },
    {
      speaker: "SUSIE",
      text: ["Hmm."],
    },
    {
      speaker: "LUKE",
      text: [
        "Something else I read about is what they call segmented sleeping.",
        "That's a theory that hundreds of years ago, people used to get up in the middle of the night, and have a chat or something to eat.",
        "Then go back to bed.",
        "So I tried it myself.",
      ],
    },
    {
      speaker: "SUSIE",
      text: ["Why?"],
    },
    {
      speaker: "LUKE",
      text: [
        "Well, it's meant to make you more creative.",
        "I don't know why, but I gave it up after a week, it just didn't fit in with my lifestyle.",
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        "But most preschool children have a short sleep in the day, don't they?",
        "There was an experiment some students did here last term.",
        "To see at what age kids should stop having naps, but they didn't really find an answer.",
        {
          text: "They spent a lot of time working out the most appropriate methodology, but the results didn't seem to show any obvious patterns.",
          number: 23,
        },
      ],
    },
    {
      speaker: "LUKE",
      text: [
        "Right.",
        "Anyway, let's think about our assignment.",
        "Last time, I had problems with the final stage.",
        "Where we had to describe and justify how successful we thought we'd been.",
        "I struggled a bit with the action plan too.",
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        "I was OK with the planning, but I got marked down for the self assessment as well.",
        {
          text: "And I had big problems with the statistical stuff. That's where I really lost marks.",
          number: 24,
        },
      ],
    },
    {
      speaker: "LUKE",
      text: ["Right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "SUSIE",
      text: ["So, shall we plan what we have to do for this assignment?"],
    },
    {
      speaker: "LUKE",
      text: ["OK."],
    },
    {
      speaker: "SUSIE",
      text: [
        "First we have to decide on our research question.",
        "So, how about 'Is there a relationship between hours of sleep and number of dreams?'",
      ],
    },
    {
      speaker: "LUKE",
      text: [
        "OK, then we need to think about who we'll do the study on.",
        "About 12 people.",
      ],
    },
    {
      speaker: "SUSIE",
      text: ["Right. And shall we use other psychology students?"],
    },
    {
      speaker: "LUKE",
      text: [
        {
          text: "Let's use people from a different department. What about history?",
          number: 25,
        },
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        "Yes, they might have interesting dreams, or literature students.",
      ],
    },
    {
      speaker: "LUKE",
      text: ["I don't really know any."],
    },
    {
      speaker: "SUSIE",
      text: [
        "OK, forget that idea.",
        "Then we have to think about our methodology.",
        "So we could use observation, but that doesn't seem appropriate.",
      ],
    },
    {
      speaker: "LUKE",
      text: [
        "No, it needs to be self reporting, I think.",
        "And we could ask them to answer questions online.",
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        {
          text: "But in this case, paper might be better, as they'll be doing it straight after they wake up, in fact, while they're still half-asleep.",
          number: 26,
        },
      ],
    },
    {
      speaker: "LUKE",
      text: [
        "Right. And we'll have to check the ethical guidelines for this sort of research.",
      ],
    },
    {
      speaker: "SUSIE",
      text: [
        {
          text: "Mm, because our experiment involves humans, so there are special regulations.",
          number: 27,
        },
      ],
    },
    {
      speaker: "LUKE",
      text: [
        "Yes, I had a look at those for another assignment I did.",
        "There's a whole section on risk assessment, and another section on making sure they aren't put under any unnecessary stress.",
        {
          text: "",
          number: 28,
        },
      ],
    },
    {
      speaker: "SUSIE",
      text: ["Let's hope they don't have any bad dreams."],
    },
    {
      speaker: "LUKE",
      text: ["Yeah."],
    },
    {
      speaker: "SUSIE",
      text: [
        "Then when we've collected all our data, we have to analyze it and calculate the correlation between our two variables.",
        "That's time sleeping and number of dreams, and then present our results visually in a graph.",
        {
          text: "",
          number: 29,
        },
      ],
    },
    {
      speaker: "LUKE",
      text: [
        {
          text: "Right, and the final thing is to think about our research and evaluate it.",
          number: 30,
        },
        "So that seems quite straightforward.",
      ],
    },
    {
      speaker: "SUSIE",
      text: ["Yeah, so now let's get started..."],
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
      if (speaker === "SUSIE") {
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
    21: "B",
    22: "A",
    23: "C",
    24: "A",
    25: "psychology",
    26: "questionnaire",
    27: "participants",
    28: "risk",
    29: "conclusion",
    30: "report",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

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
    localStorage.setItem("/listening1Part22021", newScore);
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
                {renderText(
                  "Planning a Psychology Assignment on Sleep and Dreams"
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–24")}
          </h2>

          <p className="text-lg mb-6 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          {/* ---------- MCQ SECTION ---------- */}
          <div className="space-y-8">
            {/* Q21 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "21. Luke read that one reason why we often forget dreams is that"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q21"
                    value={opt}
                    checked={userAnswers[21] === opt}
                    onChange={() => handleInputChange(21, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. our memories cannot cope with too much information."
                      : opt === "B"
                      ? "B. we might otherwise be confused about what is real."
                      : "C. we do not think they are important."
                  )}
                </label>
              ))}
            </div>

            {/* Q22 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "22. What do Luke and Susie agree about dreams predicting the future?"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q22"
                    value={opt}
                    checked={userAnswers[22] === opt}
                    onChange={() => handleInputChange(22, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. It may just be due to chance."
                      : opt === "B"
                      ? "B. It only happens with certain types of event."
                      : "C. It happens more often than some people think."
                  )}
                </label>
              ))}
            </div>

            {/* Q23 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "23. Susie says that a study on pre-school children having a short nap in the day"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q23"
                    value={opt}
                    checked={userAnswers[23] === opt}
                    onChange={() => handleInputChange(23, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. had controversial results."
                      : opt === "B"
                      ? "B. used faulty research methodology."
                      : "C. failed to reach any clear conclusions."
                  )}
                </label>
              ))}
            </div>

            {/* Q24 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "24. In their last assignment, both students had problems with"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q24"
                    value={opt}
                    checked={userAnswers[24] === opt}
                    onChange={() => handleInputChange(24, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. statistical analysis."
                      : opt === "B"
                      ? "B. making an action plan."
                      : "C. self-assessment."
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* ---------- FLOWCHART SECTION ---------- */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 25–30")}
          </h2>

          <p className="font-semibold mb-4">
            {renderText(
              "Complete the flowchart below. Write ONE WORD ONLY for each answer."
            )}
          </p>

          {/* ---------- FLOWCHART (Q25–30) ---------- */}
          <h2 className="text-xl font-bold text-center mb-6">
            {renderText("Assignment plan")}
          </h2>

          <div className="space-y-6 max-w-[700px] mx-auto border p-4">
            {/* Research Question */}
            <div className="border-2 rounded-lg p-4 bg-white">
              <p className="font-bold mb-2">
                {renderText("Decide on research question:")}
              </p>
              <p>
                •{" "}
                {renderText(
                  "Is there a relationship between hours of sleep and number of dreams?"
                )}
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Sample */}
            <div className="border-2 rounded-lg p-4 bg-white">
              <p className="font-bold mb-2">
                {renderText("Decide on sample:")}
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                • {renderText("Twelve students from the")}
                <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-sm font-semibold">
                  25
                </span>
                <span className="border px-3 py-1 rounded-md min-w-[90px] text-center">
                  <input
                    value={userAnswers[25] || ""}
                    onChange={(e) => handleInputChange(25, e.target.value)}
                    className="outline-none w-full text-center"
                  />
                </span>
                {renderText("department")}
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Methodology */}
            <div className="border-2 rounded-lg p-4  bg-white">
              <p className="font-bold mb-2">
                {renderText("Decide on methodology:")}
              </p>
              <p>• {renderText("Self-reporting")}</p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Procedure */}
            <div className="border-2 rounded-lg p-4  bg-white">
              <p className="font-bold mb-2">
                {renderText("Decide on procedure:")}
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                • {renderText("Answers on")}
                <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-sm font-semibold">
                  26
                </span>
                <span className="border px-3 py-1 rounded-md min-w-[90px] text-center">
                  <input
                    value={userAnswers[26] || ""}
                    onChange={(e) => handleInputChange(26, e.target.value)}
                    className="outline-none w-full text-center"
                  />
                </span>
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Ethics */}
            <div className="border-2 rounded-lg p-4  bg-white space-y-2">
              <p className="flex items-center gap-2 flex-wrap">
                • {renderText("Check ethical guidelines for working with")}
                <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-sm font-semibold">
                  27
                </span>
                <span className="border px-3 py-1 rounded-md min-w-[90px] text-center">
                  <input
                    value={userAnswers[27] || ""}
                    onChange={(e) => handleInputChange(27, e.target.value)}
                    className="outline-none w-full text-center"
                  />
                </span>
              </p>

              <p className="flex items-center gap-2 flex-wrap">
                • {renderText("Ensure that risk is assessed and")}
                <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-sm font-semibold">
                  28
                </span>
                <span className="border px-3 py-1 rounded-md min-w-[90px] text-center">
                  <input
                    value={userAnswers[28] || ""}
                    onChange={(e) => handleInputChange(28, e.target.value)}
                    className="outline-none w-full text-center"
                  />
                </span>
                {renderText("is kept to a minimum")}
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Analysis */}
            <div className="border-2 rounded-lg p-4 bg-white">
              <p>• {renderText("Analyse the results")}</p>
              <p className="flex items-center gap-2 flex-wrap">
                • {renderText("Calculate the correlation and make a")}
                <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-sm font-semibold">
                  29
                </span>
                <span className="border px-3 py-1 rounded-md min-w-[90px] text-center">
                  <input
                    value={userAnswers[29] || ""}
                    onChange={(e) => handleInputChange(29, e.target.value)}
                    className="outline-none w-full text-center"
                  />
                </span>
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Evaluation */}
            <div className="border-2 rounded-lg p-4 bg-white">
              <p className="flex items-center gap-2 flex-wrap">
                <span className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center text-sm font-semibold">
                  30
                </span>
                <span className="border px-3 py-1 rounded-md min-w-[90px] text-center">
                  <input
                    value={userAnswers[30] || ""}
                    onChange={(e) => handleInputChange(30, e.target.value)}
                    className="outline-none w-full text-center"
                  />
                </span>
                {renderText("the research")}
              </p>
            </div>
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
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
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();

                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;

                      const isWrong =
                        userAnswer && userAnswer !== correctAnswer;

                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
                            )}
                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}

                            <p className="font-bold">Q{num}:</p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswers[num]}</span>
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
      <Listening2Pagination2021></Listening2Pagination2021>
    </div>
  );
};

export default Listening2Part32021;
