import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2015 from "../Pagination 2015/Listening2Pagination2015";

const Listening2Part32015 = () => {
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
        "Section 3. You will hear two anthropology students called Victor and Olivia discussing their joint presentation about a Norwegian explorer called Thor Heyerdahl.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        "Right, well, for our presentation, shall I start with the early life of Thor Heyerdahl?",
        {
          text: "No, it was climbing that he spent his time on as a young man.",
          number: 21,
        },
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "Sure. Why don't you begin with describing the type of boy he was? Especially his passion for collecting things.",
        {
          text: "22",
          number: 22,
        },
        "Yeah, he preferred to learn about nature by listening to his mother read to him, and quite early on, he knew he wanted to become an explorer when he grew up. That came from his camping trips he went on in Norway, I think.",
        "Oh, right. After university, he married a classmate, and together, they decided to experience living on a small island to find out how harsh weather conditions shaped people's lifestyles.",
        {
          text: "24",
          number: 24,
        },
        "An important part of your talk should be the radical theory Heyerdahl formed from examining mysterious ancient carvings that he happened to find on the island. I think you should finish with that.",
        "I see. Well what a great life, even though many of his theories have been disproven, he certainly left a lasting impression on many disciplines, didn't he? To my mind, he was the first person to establish what modern academics call practical archaeology.",
        "I mean that they try to recreate something from the past today. Like he did with his raft trip. It's unfortunate that his ideas about where Polynesians originated from have been completely discredited.",
        "Yeah, I agree. What about the subject matter? I found it really challenging.",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        "That's right, he had his own little museum. And I think it's unusual for children to develop their own values, and not join in their parents' hobbies. I'm thinking of how Heyerdahl wouldn't go hunting with his dad for example.",
        "As part of their preparation, before they left home, they learned basic survival skills like building a shelter. I guess they needed that knowledge in order to live wild in a remote location. With few inhabitants cut off by the sea, which is what they were aiming to do.",
        {
          text: "23",
          number: 23,
        },
        "OK.",
        "Yes, they thought that travel from the east was impossible. Because of the huge empty stretch of ocean that lies between the islands and the nearest inhabited land.",
        {
          text: "25",
          number: 25,
        },
        "Yes, that's probably it. And the poor guy suffered a bit at that time, because the war forced him to stop his work for some years.",
        "Um. I haven't read anywhere that that was his motivation. The most important factor seems to have been that he use only ancient techniques and local materials to build his raft.",
        {
          text: "27",
          number: 27,
        },
        "Well, it took them 97 days from South America to the Pacific Islands.",
        "No, that was later on in Egypt, Olivia.",
        "But what he wanted to do was talk to the local people about their old stone carvings, and then make one himself. To learn more about the process.",
        {
          text: "28",
          number: 28,
        },
        "Yes. Right, well, I'll prepare a PowerPoint slide at the end that acknowledges our sources. I mainly used The Life and Work of Thor Heyerdahl by William Oliver. I thought the research methods he used were very sound, although I must say I found the overall tone somewhat old-fashioned.",
        {
          text: "30",
          number: 30,
        },
        "Well, it's a complex issue.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "Yes, but Heyerdahl spent ages studying the cloud movements, ocean currents, and wind patterns to find if it was actually possible. And another argument was that there was no tradition of large ship building in the communities lying to the east of Polynesia, but Heyerdahl knew they made lots of coastal voyages in locally built canoes.",
        {
          text: "26",
          number: 26,
        },
        "Hmm. And after that, Heyerdahl went to Easter Island, didn't he? We should mention the purpose of that trip. I think he sailed there in a boat made out of reeds.",
        "I see. Well what a great life, even though many of his theories have been disproven, he certainly left a lasting impression on many disciplines, didn't he? To my mind, he was the first person to establish what modern academics call practical archaeology.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
        "That is the end of section 3. You now have half a minute to check your answers.",
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
                {renderText("Thor Heyerdahl")}
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
          {/* ---------- Questions 21–24 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–24")}
          </h2>

          {/* Q21–22 */}
          <p className="mb-4 font-semibold">
            {renderText(
              "Choose TWO letters, A–E. Which TWO hobbies was Thor Heyerdahl very interested in as a youth?"
            )}
          </p>

          {[
            { q: 21, text: "camping" },
            { q: 21, text: "climbing" },
            { q: 21, text: "collecting" },
            { q: 21, text: "hunting" },
            { q: 21, text: "reading" },
          ].map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer mb-1"
            >
              <input
                type="checkbox"
                name={`q${item.q}`}
                value={String.fromCharCode(65 + index)}
                onChange={() =>
                  handleInputChange(item.q, String.fromCharCode(65 + index))
                }
              />
              <span className="font-semibold">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{renderText(item.text)}</span>
            </label>
          ))}

          {/* Q23–24 */}
          <div className="mt-6">
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose TWO letters, A–E. Which are the TWO reasons why Heyerdahl went to live on an island?"
              )}
            </p>

            {[
              { q: 23, text: "to examine ancient carvings" },
              { q: 23, text: "to experience an isolated place" },
              { q: 23, text: "to formulate a new theory" },
              { q: 23, text: "to learn survival skills" },
              { q: 23, text: "to study the impact of an extreme environment" },
            ].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-1"
              >
                <input
                  type="checkbox"
                  name={`q${item.q}`}
                  value={String.fromCharCode(65 + index)}
                  onChange={() =>
                    handleInputChange(item.q, String.fromCharCode(65 + index))
                  }
                />
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{renderText(item.text)}</span>
              </label>
            ))}
          </div>

          {/* ---------- Questions 25–30 ---------- */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 25–30")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          {[
            {
              q: 25,
              question:
                "According to Victor and Olivia, academics thought that Polynesian migration from the east was impossible due to",
              options: [
                "the fact that Eastern countries were far away.",
                "the lack of materials for boat building.",
                "the direction of the winds and currents.",
              ],
            },
            {
              q: 26,
              question:
                "Which do the speakers agree was the main reason for Heyerdahl's raft journey?",
              options: [
                "to overcome a research setback",
                "to demonstrate a personal quality",
                "to test a new theory",
              ],
            },
            {
              q: 27,
              question:
                "What was most important to Heyerdahl about his raft journey?",
              options: [
                "the fact that he was the first person to do it",
                "the speed of crossing the Pacific",
                "the use of authentic construction methods",
              ],
            },
            {
              q: 28,
              question: "Why did Heyerdahl go to Easter Island?",
              options: [
                "to build a stone statue",
                "to sail a reed boat",
                "to learn the local language",
              ],
            },
            {
              q: 29,
              question:
                "In Olivia's opinion, Heyerdahl's greatest influence was on",
              options: [
                "theories about Polynesian origins.",
                "the development of archaeological methodology.",
                "establishing archaeology as an academic subject.",
              ],
            },
            {
              q: 30,
              question:
                "Which criticism do the speakers make of William Oliver's textbook?",
              options: [
                "Its style is out of date.",
                "Its content is over-simplified.",
                "Its methodology is flawed.",
              ],
            },
          ].map((item) => (
            <div key={item.q} className="mb-6">
              <p className="font-semibold mb-2">
                {item.q}. {renderText(item.question)}
              </p>
              {item.options.map((opt, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer mb-1"
                >
                  <input
                    type="radio"
                    name={`q${item.q}`}
                    value={String.fromCharCode(65 + index)}
                    onChange={() =>
                      handleInputChange(item.q, String.fromCharCode(65 + index))
                    }
                  />
                  <span className="font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{renderText(opt)}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Listening2Pagination2015></Listening2Pagination2015>
    </div>
  );
};

export default Listening2Part32015;
