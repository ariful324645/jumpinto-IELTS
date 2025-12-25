import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";
import Listening4Pagination2015 from "../Pagination 2015/Listening4Pagination2015";

const Listening4Part22015 = () => {
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
        "Section 2, you will hear a recorded talk giving an introduction to the historical theme park of Manchester River Port in England.",
        "First, you have some time to look at questions 11 to 15.",
        "Now listen carefully and answer questions 11 to 15.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Welcome to Manham Port, where 1,000 years of history are brought to life.",
        "All the family can enjoy a day out at Manham.",
        "Visit our copper mine.",
        "See models of the machinery it used, have your photo taken in 19th century costume, experience at first hand how people lived at different stages throughout history.",
        "And especially how children studied, worked, and played.",
        "The port of Manham is located in beautiful and peaceful countryside, on a bend in the great River Avon, and developed here because it's the highest navigable point of the Avon.",
        {
          text: "Boats can go no higher up this river, and proved a handy place to load and unload cargo to and from the sea, which is over 23 miles away.",
          number: 11,
        },
        "A small port was already established here, when about 900 years ago, tin was discovered nearby.",
        "Though it wasn't until the Industrial Revolution,",
        {
          text: "when a tremendous need for metals of all kinds developed, that Manham expanded to become one of the busiest ports in the country, and because it was already so busy.",
          number: 12,
        },
        "Prospectors began to look for other minerals, and by the end of the nineteenth century, lead, copper, manganese and arsenic were added to the cargoes leaving Manham.",
        "In the early days, the ores had been smelted or processed in the same area they were mined.",
        "But as demand grew, the smelting process required huge factory furnaces or fires.",
        "To melt the metal from the rock, and there was not enough coal in the local area, so the rocks containing minerals had to be shipped long distances.",
        {
          text: "Sadly, in the 20th century, the great port of Manham declined, and thousands of workers were forced to emigrate out of the area.",
          number: 13,
        },
        {
          text: "The building at the port fell into disrepair.",
          number: 14,
        },
        "And the place became almost forgotten, but then the Manham Trust was formed to conserve the historical resources of the area.",
        "It organized scores of local volunteers to remove undergrowth.",
        "To find the original outlines of the installations, it then brought in paid professionals to match installations with maps of the original port complex.",
        "And to set about reconstructing it.",
        {
          text: "Today, you can see the results of this ambitious program of restoration.",
          number: 15,
        },
        "The intention, and we believe this will be realized before the end of the year, is to return Manham Port.",
        "To the condition it reached at its peak, as the greatest copper port in the country.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.",
        "Now listen and answer questions 16 to 20.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "But what can you do and see on your visit today? Here are just a few highlights.",
        "We suggest you start with the visit to the copper mine. Travel on converted mining trains.",
        {
          text: "And journey into the depths of the mountain, along seams once worked by hundreds of miners. Watch out especially for the great pumping machines which rid the mine of water.",
          number: 16,
        },
        "But please be warned that like all mines, ours is very dark and closed in, and we do say that children under five, and also dogs should not be taken into the mine.",
        {
          text: "The next recommended visit is to the village school. While looking around the classrooms, take a special look at our display of games, which is one of the largest in the world.",
          number: 17,
        },
        "And it's recommended that you time your visit to coincide with a guided tour.",
        {
          text: "This will give you the opportunity to ask lots of questions.",
          number: 18,
        },
        "Near the school is the beautiful old sailing ketch called the George.",
        "You're welcome to board the boat and look round the cabins.",
        "Look out for the ship's wheel, which was missing until only five years ago, when it was dredged out of the silt by a local fisherman.",
        "We have no idea how it got there, but it's been polished and proudly restored to its original place on the boat.",
        "Please take care going down the ladders, if you wish to visit the lower deck.",
        "We don't recommend you allow young children to use them.",
        {
          text: "So we hope you have a memorable visit to Manham Port, and will tell your friends all about us.",
          number: 20,
        },
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
                {renderText("Manham Port")}
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
          <div className="p-5 rounded-lg bg-white space-y-6">
            {/* ---------- Questions 11–15 ---------- */}
            <h2 className="font-bold text-lg">
              {renderText("Questions 11–15")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B or C.")}</p>

            {/* Question 11 */}
            <div className="mt-4">
              <p className="font-semibold">
                {renderText("11 Why did a port originally develop at Manham?")}
              </p>
              {[
                ["A", "It was safe from enemy attack."],
                ["B", "It was convenient for river transport."],
                ["C", "It had a good position on the sea coast."],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="q11"
                    value={key}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                  />
                  <span className="font-semibold">{key}.</span>
                  {renderText(text)}
                </label>
              ))}
            </div>

            {/* Question 12 */}
            <div className="mt-6">
              <p className="font-semibold">
                {renderText(
                  "12 What caused Manham's sudden expansion during the Industrial Revolution?"
                )}
              </p>
              {[
                ["A", "the improvement in mining techniques"],
                ["B", "the increase in demand for metals"],
                ["C", "the discovery of tin in the area"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="q12"
                    value={key}
                    onChange={(e) => handleInputChange(12, e.target.value)}
                  />
                  <span className="font-semibold">{key}.</span>
                  {renderText(text)}
                </label>
              ))}
            </div>

            {/* Question 13 */}
            <div className="mt-6">
              <p className="font-semibold">
                {renderText(
                  "13 Why did rocks have to be sent away from Manham to be processed?"
                )}
              </p>
              {[
                ["A", "shortage of fuel"],
                ["B", "poor transport systems"],
                ["C", "lack of skills among local people"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="q13"
                    value={key}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                  />
                  <span className="font-semibold">{key}.</span>
                  {renderText(text)}
                </label>
              ))}
            </div>

            {/* Question 14 */}
            <div className="mt-6">
              <p className="font-semibold">
                {renderText(
                  "14 What happened when the port declined in the twentieth century?"
                )}
              </p>
              {[
                ["A", "The workers went away."],
                ["B", "Traditional skills were lost."],
                ["C", "Buildings were used for new purposes."],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="q14"
                    value={key}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                  />
                  <span className="font-semibold">{key}.</span>
                  {renderText(text)}
                </label>
              ))}
            </div>

            {/* Question 15 */}
            <div className="mt-6">
              <p className="font-semibold">
                {renderText("15 What did the Manham Trust hope to do?")}
              </p>
              {[
                ["A", "discover the location of the original port"],
                ["B", "provide jobs for the unemployed"],
                ["C", "rebuild the port complex"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="q15"
                    value={key}
                    onChange={(e) => handleInputChange(15, e.target.value)}
                  />
                  <span className="font-semibold">{key}.</span>
                  {renderText(text)}
                </label>
              ))}
            </div>
          </div>
          <div className=" p-5 rounded-lg bg-white">
            <h2 className="font-bold text-lg mb-4">
              {renderText("Questions 16–20")}
            </h2>
            <p className="mb-4">
              {renderText(
                "Complete the table below. Write NO MORE THAN TWO WORDS for each answer."
              )}
            </p>
            <h2 className="mb-4 font-bold text-2xl text-center">
              {renderText("Tourist attractions in Manham")}
            </h2>

            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">{renderText("Place")}</th>
                  <th className="border p-2">
                    {renderText("Features and activities")}
                  </th>
                  <th className="border p-2">{renderText("Advice")}</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 - Copper mine */}
                <tr>
                  <td className="border p-2">{renderText("copper mine")}</td>
                  <td className="border p-2">
                    {renderText("specially adapted miners'")}
                    <input
                      type="text"
                      className="border p-1 ml-2 w-32"
                      onChange={(e) => handleInputChange(16, e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    {renderText("the mine is")}
                    <input
                      type="text"
                      className="border p-1 ml-2 w-32"
                      onChange={(e) => handleInputChange(17, e.target.value)}
                    />
                  </td>
                </tr>

                {/* Row 2 - Village school */}
                <tr>
                  <td className="border p-2">{renderText("village school")}</td>
                  <td className="border p-2">
                    {renderText("classrooms and a special exhibition of")}
                    <input
                      type="text"
                      className="border p-1 ml-2 w-32"
                      onChange={(e) => handleInputChange(18, e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    {renderText("a")}
                    <input
                      type="text"
                      className="border p-1 ml-2 w-32"
                      onChange={(e) => handleInputChange(19, e.target.value)}
                    />
                    {renderText("is recommended")}
                  </td>
                </tr>

                {/* Row 3 - 'The George' */}
                <tr>
                  <td className="border p-2">
                    {renderText("'The George' (old sailing ship)")}
                  </td>
                  <td className="border p-2">
                    {renderText(
                      "the ship's wheel (was lost but has now been restored)"
                    )}
                  </td>
                  <td className="border p-2">
                    {renderText("children shouldn't use the")}
                    <input
                      type="text"
                      className="border p-1 ml-2 w-32"
                      onChange={(e) => handleInputChange(20, e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Listening4Pagination2015></Listening4Pagination2015>
    </div>
  );
};

export default Listening4Part22015;
