import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";

const Listening3Part42015 = () => {
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
        "Section 4. You will hear a business student predicting how management might change in the next few years.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Well, I've been talking to managers in a number of businesses, and reading surveys about the future of management.",
        "And what I'm going to present in this seminar is a few ideas about how the activity is likely to change in the next 10 years.",
        "It isn't a scientific statistical analysis, just some ideas for us to discuss.",
        "One area I want to mention is business markets, and I'm sure a really significant development will be a major increase in competition with companies from all around the world trying to sell similar products.",
        {
          text: "Consumers will have much more choice, for instance, food products sold in Australia might be manufactured in the USA, China, Finland, and dozens of other countries.",
          number: 31,
        },
        {
          text: "At the same time, mergers and takeovers mean that governments are actually losing power to major global corporations.",
          number: 32,
        },
        {
          text: "In the rapidly expanding economies such as India, China, Brazil and Russia, demand is growing very fast.",
          number: 33,
        },
        {
          text: "This is putting pressure on resources all over the world.",
        },
        {
          text: "I think businesses are becoming more open to external influences, in particular, companies are consulting customers more and more before making their business decisions.",
          number: 34,
        },
        "Companies are finding out what they want and providing it, instead of making products and then trying to sell them, which is the model of years ago.",
        "Another influence is that concerns about the environment will force manufacturers to extend product life cycles to reduce the amount of pollution and waste.",
        {
          text: "And in some cases, regulation will need to be strengthened.",
          number: 35,
        },
        "Many societies are much more fluid and democratic, and the structure of companies is changing to reflect that.",
        {
          text: "I think we're going to see a greater emphasis within companies on teams created with a specific project in mind.",
          number: 36,
        },
        "And when they're completed, the teams will be disbanded and new ones formed.",
        "More and more people see work as simply one part of their lifestyle.",
        "And not the most important one, and as the workforce is shrinking in some countries, businesses are having to compete for staff instead of being able to choose among a lot of applicants.",
        "Typical examples that will attract and retain staff are traditional ones like flexible hours, and something that has been made possible by advances in technology.",
        {
          text: "Remote working, with people based at their home, abroad, or almost anywhere they choose.",
          number: 37,
        },
        "Management styles will almost certainly continue to change.",
        "Senior managers will require a lot more than the efficiency that they've always needed.",
        {
          text: "Above all, they'll need great skills in leadership.",
          number: 38,
        },
        "So that their organization can initiate and respond to change in a fast-moving world, where they face lots of competing requirements and potential conflicts.",
        "In most of the world, the senior managers of large businesses are mainly men in their 50s and 60s.",
        {
          text: "The predominant style of management will almost certainly become more consultative and collaborative.",
          number: 39,
        },
        "Caused, above all, by more women moving into senior management positions.",
        "Many of the changes are influenced by developments in the wider economy.",
        "The traditional emphasis of business was manufacturing, and of course the service sector is very important.",
        "But we shouldn't overlook the growing financial contribution of IP.",
        "That is intellectual property.",
        "Some books and films generate enormous sums from the sale of related DVDs, music, games, clothes, and so on.",
        "Another point I'd like to make is that although I've been talking about companies, one trend that they have to face is the move away from people working for the same employer for years.",
        {
          text: "Instead, more and more people are becoming self-employed to gain the freedom and control over their lives.",
          number: 40,
        },
        "That they're unlikely to get from being employed.",
        "OK, well, that's all I wanna say, so let's open it up for discussion.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 4.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "According to the manager, what do most people like about the job of kitchen assistant?",
    "The manager is concerned about some of the new staff's",
    "The manager says that the day is likely to be busy for kitchen staff because",
    "Only kitchen staff who are 18 or older are allowed to use",
    "What is one reason the job of kitchen assistant can be stressful?",
    "What is another reason the job of kitchen assistant can be stressful?",
  ];

  const options = [
    [
      "A. the variety of work",
      "B. the friendly atmosphere",
      "C. the opportunities for promotion",
    ],

    ["A. jewellery.", "B. hair styles.", "C. shoes."],

    [
      "A. it is a public holiday.",
      "B. the head chef is absent.",
      "C. the restaurant is almost fully booked.",
    ],

    [
      "A. the waste disposal unit.",
      "B. the electric mixer.",
      "C. the meat slicer.",
    ],
    [
      "A. They have to follow orders immediately.",
      "B. The kitchen gets very hot.",
      "C. They may not be able to take a break.",
    ],
    [
      "A. They have to do overtime.",
      "B. The work is physically demanding.",
      "C. They have to clean customer areas.",
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
    // Questions 11 and 12 (Choose TWO: A and C)
    11: "A", // the gym (recently refurbished with 10 new running machines)
    12: "C", // the indoor pool (expanded to eight lanes, making it much wider)

    // Questions 13–20 (Notes completion)
    13: "health problems",
    14: "safety rules",
    15: "plan",
    16: "joining",
    17: "free entry",
    18: "peak",
    19: "guests",
    20: "photo card",
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
    localStorage.setItem("/listening2Part32018", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32018");
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
                {renderText("The future of Management")}
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
        <div className="p-4 max-w-4xl mx-auto overflow-y-scroll">
          <div className="border p-5 rounded-lg bg-white space-y-6">
            <h2 className="font-bold text-lg">
              {renderText("Questions 31–40")}
            </h2>
            <p>
              {renderText("Complete the notes below.")}
              <br />
              {renderText("Write ONE WORD ONLY for each answer.")}
            </p>

            <p className="font-bold mt-4">
              {renderText("THE FUTURE OF MANAGEMENT")}
            </p>

            {/* Business markets */}
            <p className="font-semibold mt-3">
              {renderText("Business markets")}
            </p>

            <div className="flex items-center gap-3 mt-1">
              {renderText("greater")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                31
              </span>
              <input
                type="text"
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
              {renderText("among companies")}
            </div>

            <div className="flex items-center gap-3 mt-1">
              {renderText("increase in power of large")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                32
              </span>
              <input
                type="text"
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
              {renderText("companies")}
            </div>

            <div className="flex items-center gap-3 mt-1">
              {renderText("rising")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                33
              </span>
              <input
                type="text"
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
              {renderText("in certain countries")}
            </div>

            {/* External influences */}
            <p className="font-semibold mt-4">
              {renderText("External influences on businesses")}
            </p>

            <div className="flex items-center gap-3 mt-1">
              {renderText("more discussion with")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                34
              </span>
              <input
                type="text"
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
              {renderText("before making business decisions")}
            </div>

            <div className="flex items-center gap-3 mt-1">
              {renderText("environmental concerns which may lead to more")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                35
              </span>
              <input
                type="text"
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
            </div>

            {/* Business structures */}
            <p className="font-semibold mt-4">
              {renderText("Business structures")}
            </p>

            <div className="flex items-center gap-3 mt-1">
              {renderText("more teams will be formed to work on a particular")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                36
              </span>
              <input
                type="text"
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
            </div>

            <div className="flex items-center gap-3 mt-1">
              {renderText("businesses may need to offer hours that are")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                37
              </span>
              <input
                type="text"
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
              {renderText(", or the chance to work remotely")}
            </div>

            {/* Management styles */}
            <p className="font-semibold mt-4">
              {renderText("Management styles")}
            </p>

            <div className="flex items-center gap-3 mt-1">
              {renderText("increasing need for managers to provide good")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                38
              </span>
              <input
                type="text"
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
            </div>

            <div className="flex items-center gap-3 mt-1">
              {renderText("changes influenced by")}
              <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                39
              </span>
              <input
                type="text"
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border px-2 py-1 rounded-md w-24"
              />
              {renderText("taking senior roles")}
            </div>

            {/* Changes in the economy */}
            <p className="font-semibold mt-4">
              {renderText("Changes in the economy")}
            </p>

            <div className="flex flex-col gap-2 mt-1">
              <p>{renderText("service sector continues to be important")}</p>
              <p>{renderText("increasing value of intellectual property")}</p>
              <div className="flex items-center gap-3">
                {renderText("more and more")}
                <span className="w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold bg-gray-50">
                  40
                </span>
                <input
                  type="text"
                  value={userAnswers[40] || ""}
                  onChange={(e) => handleInputChange(40, e.target.value)}
                  className="border px-2 py-1 rounded-md w-24"
                />
                {renderText("workers")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Listening3Pagination2015></Listening3Pagination2015>
    </div>
  );
};

export default Listening3Part42015;
