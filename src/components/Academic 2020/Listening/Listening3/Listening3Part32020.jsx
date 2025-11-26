import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2020 from "../../Pagination/Listening3Pagination/Listening3Pagination2020";

const Listening3Part32020 = () => {
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
        "Part 3.You will hear two students called Hazel and Tom talking about Hazel's media studies assignment.",
        "First, you have some time to look at questions 21 to 26.Now listen carefully and answer questions 21 to 26.",
      ],
    },

    {
      speaker: "HAZEL",
      text: ["Tom, could I ask you for some advice, please?"],
    },

    {
      speaker: "TOM",
      text: ["Yes, of course.If you think I can help.What's it about?"],
    },

    {
      speaker: "HAZEL",
      text: [
        "It's my first media studies assignment, and I'm not sure how to go about it.You must have done it last year.",
      ],
    },

    {
      speaker: "TOM",
      text: [
        "Is that the one comparing the coverage of a particular story in a range of newspapers?",
      ],
    },

    {
      speaker: "HAZEL",
      text: ["That's right."],
    },

    {
      speaker: "TOM",
      text: ["Oh yes, I really enjoyed writing it."],
    },

    {
      speaker: "HAZEL",
      text: ["So, what sort of things do I need to compare?"],
    },

    {
      speaker: "TOM",
      text: [
        {
          text: "Well, there are several things.For example, there's the question of which page of the newspaper the item appears on.",
          number: 21,
        },
        "You mean because there's a big difference between having it on the front page and the bottom of page 10 for instance?",
      ],
    },

    {
      speaker: "TOM",
      text: [
        "Exactly.And that shows how important the editor thinks the story is.",
        {
          text: "Then there's the size, how many column inches the story is given, how many columns it spreads over.",
          number: 22,
        },
        "And I suppose that includes the headline.",
      ],
    },

    {
      speaker: "TOM",
      text: [
        {
          text: "What about graphics? ",
          number: 23,
        },
        "Whether there's anything visual in addition to the text?",
        "Yes, you need to consider those too.Because they can have a big effect on the reader's understanding of the story, sometimes a bigger effect than the text itself.Then you'll need to look at how the item is put together.",
        {
          text: "What structure is it given?",
          number: 24,
        },
        "Bear in mind that not many people read beyond the first paragraph, so what has the journalist put at the beginning?",
      ],
    },

    {
      speaker: "HAZEL",
      text: [
        "And newspapers sometimes give wrong or misleading information, don't they?Either deliberately or by accident, should I be looking at that too?",
      ],
    },

    {
      speaker: "TOM",
      text: [
        "Yes, if you can, compare what's in different versions, and as far as possible.Try and work out what's true and what isn't, and that relates to a very important point.",
        {
          text: "What's the writer's purpose? ",
          number: 25,
        },
        "Or at least the most important one, if they have several.",
        "It may seem to be to inform the public, but often it's that they want to create fear.Or controversy, or to make somebody look ridiculous.",
      ],
    },

    {
      speaker: "HAZEL",
      text: [
        "Gosh, I see what you mean.",
        {
          text: "And I suppose the writer may make assumptions about the reader.",
          number: 26,
        },
        "That's right, about their knowledge of the subject, their attitudes, and their level of education, which means writing so that the readers understand without feeling patronized.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.Now listen and answer questions 27 to 30.",
      ],
    },

    {
      speaker: "HAZEL",
      text: ["Does it matter what type of story I write about?"],
    },

    {
      speaker: "TOM",
      text: [
        "No, national or international politics, the arts, anything.As long as it's covered in two or three newspapers, though of course it'll be easier and more fun if it's something you're interested in, and know something about.",
      ],
    },

    {
      speaker: "HAZEL",
      text: [
        "And on that basis, a national news item would be worth analyzing.",
        {
          text: "I'm quite keen on politics, so I'll try and find a suitable topic.",
          number: 27,
        },
        "What did you choose for your analysis, Tom?",
      ],
    },

    {
      speaker: "TOM",
      text: [
        "I was interested in how newspapers express their opinions explicitly.So, I wanted to compare editorials in different papers, but when I started looking, I couldn't find two on the same topic that I felt like analyzing.",
      ],
    },

    {
      speaker: "HAZEL",
      text: [
        { text: "In that case, I wouldn't even bother to look.", number: 28 },
      ],
    },

    {
      speaker: "TOM",
      text: [
        "So in the end, I chose a human interest story, a terribly emotional story about a young girl who was very ill.And lots of other people, mostly strangers, raised money so she could go abroad for treatment.Actually, I was surprised.Some papers just wrote about how wonderful everyone was.But others considered the broader picture, like why treatment wasn't available here.",
      ],
    },

    {
      speaker: "HAZEL",
      text: [
        "Hmm, I usually find stories like that raise quite strong feelings in me.",
        {
          text: "I'll avoid that.",
          number: 29,
        },
        "Perhaps I'll choose an arts topic, like different reviews of a film or something about funding for the arts.",
        { text: "I'll think about that.", number: 30 },
      ],
    },

    {
      speaker: "TOM",
      text: ["Yes, that might be interesting."],
    },

    {
      speaker: "HAZEL",
      text: [
        "OK, well, thanks a lot for your help, Tom.It's been really useful.",
      ],
    },

    {
      speaker: "TOM",
      text: ["You're welcome.Good luck with the assignment, Hazel."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.You now have 30 seconds to check your answers to part 3.",
      ],
    },
  ];

  // different option
  const questions = [
    "Who is the display mainly aimed at?",
    "Who else is expected to attend the display?",
    "Why did Cathy and Graham choose Charles Dickens as their focus?",
    "What was another reason for choosing Charles Dickens?",
  ];

  const options = [
    [
      "A. Students from the English department",
      " B. Residents of the local area",
      " C. Potential new students",
    ],
    [
      "A. Students from other departments",
      " B. The university’s teaching staff",
      " C. Potential new students",
    ],
    [
      "A. His novels are widely known today",
      " B. He used his writing to highlight social problems",
      " C. His reputation has recently changed",
    ],
    [
      "A. He was consulted on social issues",
      " B. His speeches inspired positive change",
      " C. His novels link well to life in his time",
    ],
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
      const answerKey = qIndex + 21;
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
      if (speaker === "TOM") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "HAZEL") {
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
    21: "page",
    22: "size",
    23: "graphics",
    24: "structure",
    25: "purpose",
    26: "assumptions",

    27: "A", // national news item
    28: "C", // editorial
    29: "C", // human interest
    30: "B", // arts
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
    localStorage.setItem("/listening3Part32020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part32020");
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
                {renderText("Hazel newspaper articles")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>

              {/* Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {renderText("Clear answer")}
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      {renderText(
                        "Are you sure you want to clear all answers?"
                      )}
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        {renderText("No, keep them")}
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        {renderText("Yes, clear them")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 1st section */}{" "}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21-26")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText(
                "What Hazel should analyse about items in newspapers"
              )}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("What ")}</span>
                <button
                  onClick={() => toggleButton(21)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[21]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  21
                </button>
                <input
                  value={userAnswers[21] || ""}
                  onChange={(e) => handleInputChange(21, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText(" the item is on")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("the ")}</span>
                <button
                  onClick={() => toggleButton(22)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[22]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  22
                </button>
                <input
                  value={userAnswers[22] || ""}
                  onChange={(e) => handleInputChange(22, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>
                  {renderText(" of the item, including the headline")}
                </span>
              </li>

              <li className="text-lg">
                <span>{renderText("any ")}</span>
                <button
                  onClick={() => toggleButton(23)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[23]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  23
                </button>
                <input
                  value={userAnswers[23] || ""}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText(" accompanying the item")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("the ")}</span>
                <button
                  onClick={() => toggleButton(24)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[24]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  24
                </button>
                <input
                  value={userAnswers[24] || ""}
                  onChange={(e) => handleInputChange(24, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>
                  {renderText(" of the item, e.g. what's made prominent")}
                </span>
              </li>

              <li className="text-lg">
                <span>{renderText("the writer's main ")}</span>
                <button
                  onClick={() => toggleButton(25)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[25]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  25
                </button>
                <input
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("the ")}</span>
                <button
                  onClick={() => toggleButton(26)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[26]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  26
                </button>
                <input
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>
                  {renderText(" the writer may make about the reader")}
                </span>
              </li>
            </ul>
          </div>
          {/* 2st section */}
          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed mt-5">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 27-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What topic do Cathy and Graham choose to illustrate with each novel?"
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-C")}</span>{" "}
                {renderText("next to Questions 27-30.")}
              </h3>
              <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText(
                        "A. She will definitely look for a suitable article."
                      )}
                    </li>
                    <li>
                      {renderText("B. She may look for a suitable article.")}
                    </li>
                    <li>
                      {renderText(
                        "C. She definitely won't look for an article."
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>
          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 1 ---------- */}
            <h1 className="text-lg font-bold">Novels by Dickens</h1>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span>{renderText("national news item")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="1">{renderText("27")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              <span>{renderText("editorial")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="2">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              <span>{renderText("human interest")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="3">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("Martin Chuzzlewit")}
              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="4">{renderText("30")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
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
      <Listening3Pagination2020></Listening3Pagination2020>
    </div>
  );
};

export default Listening3Part32020;
