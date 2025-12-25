import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";
import Listening2Pagination2015 from "../Pagination 2015/Listening2Pagination2015";

const Listening2Part22015 = () => {
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
        "Section 2. You will hear a representative of a city council giving information about two new facilities which are opening soon in the city.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning.",
        "I'm very pleased to have this opportunity to say a little about two exciting new developments in the city.",
        "The Brackenside Open-air Swimming Pool, and the children's adventure playground in Central Park.",
        "As many of you may know, the idea for these initiatives came from you, the public, in the extensive consultation exercise which the City Council conducted last year.",
        {
          text: "And they have been realized using money from the SWRDC - the South West Regional Development Commission.",
          number: 11,
        },
        "First of all, Brackenside Pool.",
        "As many of the older members of the audience will remember, there used to be a wonderful open air pool on the seafront 30 years ago, but it had to close when it was judged to be unsafe.",
        "For the design of this new heated pool, we were very happy to secure the talents of internationally renowned architect, Ellen Wendon,",
        "who has managed to combine a charming 1930s design which fits so well with many of the other buildings in the area.",
        "With up to the minute features such as a recycling system, the only one of its kind in the world,",
        {
          text: "which enables seawater to be used in the pool.",
          number: 12,
        },
        "Now, there's been quite a bit of discussion in the local press about whether there would be enough room for the number of visitors we're hoping to attract,",
        {
          text: "but the design is deceptive, and there have been rigorous checks about capacity.",
          number: 13,
        },
        "Also just in case you were wondering, we're on schedule for June 15th opening date, and well within budget,",
        "a testimony to the excellent work of local contractors Hickman's.",
        "We hope that as many people as possible will be there on June 15th.",
        "We have engaged award winning actress Coral White to declare the pool open,",
        "and there'll be drinks and snacks available at the poolside.",
        "There'll also be a competition for the public to decide on the sculpture we plan to have at the entrance.",
        {
          text: "You will decide which famous historical figure from the city we should have.",
          number: 14,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 15 to 20.",
        "Now listen and answer questions 15 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "And now, moving on to the Central Park playground, which we're pleased to announce has just won the Douglas Award for safety.",
        "The news came through only last week.",
        "The unique design is based on the concept of the Global Village,",
        "with the playground being divided into six areas showing different parts of the world, each with a representative feature.",
        "For example, there is a section on Asia,",
        {
          text: "and this is represented by rides and equipment in the shape of snakes, orangutans, tigers, and so on.",
          number: 15,
        },
        "Fauna native to the forests of the region.",
        "Moving south to the Antarctic,",
        "we couldn't run to an ice rink, I'm afraid,",
        {
          text: "but opted instead for climbing blocks in the shape of mountains.",
          number: 16,
        },
        "I thought they could have had slides for the glaciers, but the designers did want to avoid being too literal.",
        "Then onto South America,",
        "and here the theme is El Dorado, games replicating the search for mines full of precious stones,",
        "and then moving up to North America.",
        {
          text: "Here the designers finally opted for rockets and the International Space Station.",
          number: 17,
        },
        "Eastwards to Europe then,",
        "and perhaps the most traditional choice of all the areas, medieval castles and other fortifications,",
        "then last but not least, moving south to Africa.",
        {
          text: "A whole set of wonderful mosaics and trails to represent the great rivers of this fascinating and varied continent.",
          number: 19,
        },
        {
          text: "Now, the opening date for our Global Playground is the 10th of July.",
          number: 20,
        },
        "And again, we'd love to see you there.",
        "So, make a date and come and see this magnificent original new amenity right in the heart of the city.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 2.",
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
                {renderText("New city developments")}
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
          {/* ---------- Questions 11–14 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–14")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          <h3 className="font-bold mb-4">
            {renderText("New city developments")}
          </h3>

          {/* Q11 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              11.{" "}
              {renderText(
                "The idea for the two new developments in the city came from"
              )}
            </p>
            {["local people.", "the City Council.", "the SWRDC."].map(
              (item, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer mb-1"
                >
                  <input
                    type="radio"
                    name="q11"
                    value={String.fromCharCode(65 + index)}
                    onChange={() =>
                      handleInputChange(11, String.fromCharCode(65 + index))
                    }
                  />
                  <span className="font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{renderText(item)}</span>
                </label>
              )
            )}
          </div>

          {/* Q12 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              12. {renderText("What is unusual about Brackenside pool?")}
            </p>
            {[
              "its architectural style",
              "its heating system",
              "its method of water treatment",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q12"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(12, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* Q13 */}
          <div className="mb-6">
            <p className="font-semibold mb-2">
              13. {renderText("Local newspapers have raised worries about")}
            </p>
            {[
              "the late opening date.",
              "the cost of the project.",
              "the size of the facilities.",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q13"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(13, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* Q14 */}
          <div className="mb-10">
            <p className="font-semibold mb-2">
              14.{" "}
              {renderText(
                "What decision has not yet been made about the pool?"
              )}
            </p>
            {[
              "whose statue will be at the door",
              "the exact opening times",
              "who will open it",
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="radio"
                  name="q14"
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(14, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item)}</span>
              </label>
            ))}
          </div>

          {/* ---------- Questions 15–20 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 15–20")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Which feature is related to each of the following areas of the world represented in the playground?"
            )}
            <br />
            {renderText(
              "Choose the correct letter, A–I, next to Questions 15–20."
            )}
          </p>

          {/* Features list */}
          <div className="border p-5 rounded-lg bg-white max-w-sm mx-auto  mb-6 text-center">
            {[
              { letter: "A", text: "ancient forts" },
              { letter: "B", text: "waterways" },
              { letter: "C", text: "ice and snow" },
              { letter: "D", text: "jewels" },
              { letter: "E", text: "local animals" },
              { letter: "F", text: "mountains" },
              { letter: "G", text: "music and film" },
              { letter: "H", text: "space travel" },
              { letter: "I", text: "volcanoes" },
            ].map((item) => (
              <p key={item.letter}>
                <span className="font-semibold">{item.letter}.</span>{" "}
                {renderText(item.text)}
              </p>
            ))}
          </div>

          {/* Areas of the world */}
          <div className="">
            <h1 className="font-bold text-2xl mb-4">Areas of the world</h1>
            {[
              { q: 15, text: "Asia" },
              { q: 16, text: "Antarctic" },
              { q: 17, text: "South America" },
              { q: 18, text: "North America" },
              { q: 19, text: "Europe" },
              { q: 20, text: "Africa" },
            ].map((item) => (
              <div key={item.q} className="flex items-center gap-2 mb-2">
                {/* Number */}
                <span className="font-semibold">{item.q}</span>
                {/* Text */}
                <span>{item.text}</span>
                {/* Dropdown */}
                <select
                  value={userAnswers[item.q] || ""}
                  onChange={(e) => handleInputChange(item.q, e.target.value)}
                  className="border px-2 py-1 rounded-md"
                >
                  {/* Placeholder */}
                  <option value="" disabled>
                    {item.q} {/* shows number as placeholder */}
                  </option>
                  {/* Options A–I */}
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                    (letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    )
                  )}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Listening2Pagination2015></Listening2Pagination2015>
    </div>
  );
};

export default Listening2Part22015;
