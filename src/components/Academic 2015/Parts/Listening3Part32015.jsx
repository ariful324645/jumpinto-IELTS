import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";

const Listening3Part32015 = () => {
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
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        {
          text: "Sure. Why don't you begin with describing the type of boy he was? Especially his passion for collecting things.",
          number: 22,
        },
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        "That's right, he had his own little museum.",
        "And I think it's unusual for children to develop their own values, and not join in their parents' hobbies.",
        "I'm thinking of how Heyerdahl wouldn't go hunting with his dad for example.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "Yeah, he preferred to learn about nature by listening to his mother read to him.",
        "And quite early on, he knew he wanted to become an explorer when he grew up.",
        "That came from his camping trips he went on in Norway, I think.",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        {
          text: "No, it was climbing that he spent his time on as a young man.",
          number: 21,
        },
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        {
          text: "Oh, right. After university, he married a classmate, and together, they decided to experience living on a small island to find out how harsh weather conditions shaped people's lifestyles.",
          number: 24,
        },
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        {
          text: "As part of their preparation, before they left home, they learned basic survival skills like building a shelter.",
          number: 23,
        },
        "I guess they needed that knowledge in order to live wild in a remote location.",
        "With few inhabitants cut off by the sea, which is what they were aiming to do.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "An important part of your talk should be the radical theory Heyerdahl formed from examining mysterious ancient carvings that he happened to find on the island.",
        "I think you should finish with that.",
      ],
    },
    {
      speaker: "VICTOR",
      text: ["OK."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "All right, Victor.",
        "So after your part, I'll talk about Thor Heyerdahl's adult life, continuing from the theory he had about Polynesian migration.",
        "Up until that time, of course, academics had believed that humans first migrated to the islands in Polynesia from Asia in the west.",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        {
          text: "Yes, they thought that travel from the east was impossible, because of the huge empty stretch of ocean that lies between the islands and the nearest inhabited land.",
          number: 25,
        },
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "Yes, but Heyerdahl spent ages studying the cloud movements, ocean currents, and wind patterns to find if it was actually possible.",
        "And another argument was that there was no tradition of large ship building in the communities lying to the east of Polynesia.",
        "But Heyerdahl knew they made lots of coastal voyages in locally built canoes.",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        "Yes, or sailing on rafts, as was shown by the long voyage that Heyerdahl did next.",
        "It was an incredibly risky journey to undertake.",
        "Sometimes I wonder if he did that trip for private reasons, you know.",
        "To show others that he could have spectacular adventures.",
        "What do you think, Olivia?",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        {
          text: "Well, I think it was more a matter of simply trying out his idea, to see if migration from the east was possible.",
          number: 26,
        },
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        "Yes, that's probably it.",
        "And the poor guy suffered a bit at that time, because the war forced him to stop his work for some years.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "Yes, when he got started again and planned his epic voyage, do you think it was important to him that he achieve it before anyone else did?",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        {
          text: "I haven't read anywhere that that was his motivation.",
          number: 27,
        },
        "The most important factor seems to have been that he use only ancient techniques and local materials to build his raft.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: ["Yes, I wonder how fast it went."],
    },
    {
      speaker: "VICTOR",
      text: [
        "Well, it took them 97 days from South America to the Pacific Islands.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "And after that, Heyerdahl went to Easter Island, didn't he?",
        "We should mention the purpose of that trip.",
        "I think he sailed there in a boat made out of reeds.",
      ],
    },
    {
      speaker: "VICTOR",
      text: ["No, that was later on in Egypt, Olivia."],
    },
    {
      speaker: "OLIVIA",
      text: ["Oh, yes, that's right."],
    },
    {
      speaker: "VICTOR",
      text: [
        {
          text: "But what he wanted to do was talk to the local people about their old stone carvings, and then make one himself.",
          number: 28,
        },
        "To learn more about the process.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        {
          text: "To my mind, he was the first person to establish what modern academics call practical archaeology.",
          number: 29,
        },
        "I mean that they try to recreate something from the past today.",
        "Like he did with his raft trip.",
        "It's unfortunate that his ideas about where Polynesians originated from have been completely discredited.",
      ],
    },
    {
      speaker: "VICTOR",
      text: [
        {
          text: "I mainly used The Life and Work of Thor Heyerdahl by William Oliver.",
          number: 30,
        },
        "I thought the research methods he used were very sound, although I must say I found the overall tone somewhat old-fashioned.",
        "I think they need to do a new revised edition.",
      ],
    },
    {
      speaker: "OLIVIA",
      text: [
        "Yeah, I agree.",
        "What about the subject matter?",
        "I found it really challenging.",
      ],
    },
    {
      speaker: "VICTOR",
      text: ["Well, it's a complex issue."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
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
          <div className="border p-5 rounded-lg bg-white space-y-6">
            {/* ---------- Questions 21–22 ---------- */}
            <h2 className="font-bold text-lg">
              {renderText("Questions 21 and 22")}
            </h2>
            <p>{renderText("Choose TWO letters, A–E.")}</p>

            <p className="font-semibold mt-3">
              {renderText(
                "21–22 Which TWO hobbies was Thor Heyerdahl very interested in as a youth?"
              )}
            </p>

            {[
              ["A", "camping"],
              ["B", "climbing"],
              ["C", "collecting"],
              ["D", "hunting"],
              ["E", "reading"],
            ].map(([key, text]) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  value={key}
                  onChange={(e) => handleInputChange(21, e.target.value)}
                />
                <span className="font-semibold">{key}.</span>
                {renderText(text)}
              </label>
            ))}

            {/* ---------- Questions 23–24 ---------- */}
            <h2 className="font-bold text-lg mt-8">
              {renderText("Questions 23 and 24")}
            </h2>
            <p>{renderText("Choose TWO letters, A–E.")}</p>

            <p className="font-semibold mt-3">
              {renderText(
                "23–24 Which do the speakers say are the TWO reasons why Heyerdahl went to live on an island?"
              )}
            </p>

            {[
              ["A", "to examine ancient carvings"],
              ["B", "to experience an isolated place"],
              ["C", "to formulate a new theory"],
              ["D", "to learn survival skills"],
              ["E", "to study the impact of an extreme environment"],
            ].map(([key, text]) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  value={key}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                />
                <span className="font-semibold">{key}.</span>
                {renderText(text)}
              </label>
            ))}

            {/* ---------- Questions 25–30 ---------- */}
            <h2 className="font-bold text-lg mt-8">
              {renderText("Questions 25–30")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B or C.")}</p>

            <p className="font-bold mt-3">
              {renderText("The later life of Thor Heyerdahl")}
            </p>

            {/* Question 25 */}
            <div className="mt-4">
              <p className="font-semibold">
                {renderText(
                  "25 According to Victor and Olivia, academics thought that Polynesian migration from the east was impossible due to"
                )}
              </p>

              {[
                ["A", "the fact that Eastern countries were far away"],
                ["B", "the lack of materials for boat building"],
                ["C", "the direction of the winds and currents"],
              ].map(([key, text]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="q25"
                    value={key}
                    onChange={(e) => handleInputChange(25, e.target.value)}
                  />
                  <span className="font-semibold">{key}.</span>
                  {renderText(text)}
                </label>
              ))}
            </div>

            {/* Questions 26–30 */}
            {[
              [
                26,
                "Which do the speakers agree was the main reason for Heyerdahl's raft journey?",
                [
                  ["A", "to overcome a research setback"],
                  ["B", "to demonstrate a personal quality"],
                  ["C", "to test a new theory"],
                ],
              ],
              [
                27,
                "What was most important to Heyerdahl about his raft journey?",
                [
                  ["A", "the fact that he was the first person to do it"],
                  ["B", "the speed of crossing the Pacific"],
                  ["C", "the use of authentic construction methods"],
                ],
              ],
              [
                28,
                "Why did Heyerdahl go to Easter Island?",
                [
                  ["A", "to build a stone statue"],
                  ["B", "to sail a reed boat"],
                  ["C", "to learn the local language"],
                ],
              ],
              [
                29,
                "In Olivia's opinion, Heyerdahl's greatest influence was on",
                [
                  ["A", "theories about Polynesian origins"],
                  ["B", "the development of archaeological methodology"],
                  ["C", "establishing archaeology as an academic subject"],
                ],
              ],
              [
                30,
                "Which criticism do the speakers make of William Oliver's textbook?",
                [
                  ["A", "Its style is out of date"],
                  ["B", "Its content is over-simplified"],
                  ["C", "Its methodology is flawed"],
                ],
              ],
            ].map(([num, question, options]) => (
              <div key={num} className="mt-6">
                <p className="font-semibold">
                  {renderText(`${num} ${question}`)}
                </p>

                {options.map(([key, text]) => (
                  <label key={key} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`q${num}`}
                      value={key}
                      onChange={(e) => handleInputChange(num, e.target.value)}
                    />
                    <span className="font-semibold">{key}.</span>
                    {renderText(text)}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Listening3Pagination2015></Listening3Pagination2015>
    </div>
  );
};

export default Listening3Part32015;
