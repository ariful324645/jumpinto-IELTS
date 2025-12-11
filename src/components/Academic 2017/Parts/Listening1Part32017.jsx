import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2017 from "../Pagination2017/Listening1Pagination2017";

const Listening1Part32017 = () => {
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
        "Section 3. You will hear two students called Trudie and Stewart, who are both studying to be librarians, discussing a paper that they are going to write together.",
        "First, you have some time to look at questions 21 to 23.",
        "Now listen carefully and answer questions 21 to 23.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "OK, Stewart, we need to start planning our paper on public libraries. Have you thought of an angle yet?",
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "Well, there's so much we could look into, how libraries have changed over the centuries, for instance, or how different countries organize them, what do you think, Trudie?",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        {
          text: "Maybe we should concentrate on this country and try to relate the changes in libraries to external developments, like the fact that far more people can read than a century ago, and that the local population may speak lots of different languages.",
          number: 21,
        },
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "We could include something about changes in the source of funding too.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "Yes, but remember we're only supposed to write a short paper, so it's probably best if we don't go into funding in any detail.",
        "Right, well, shall we just brainstorm a few ideas to get started?",
        "OK, we obviously need to look at the impact of new technology, particularly the internet. Now that lots of books have been digitalized, people can access them from their own computers at home.",
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "And if everyone did that, libraries would be obsolete.",
        "Yes.",

        {
          text: "But the digitalized books that are available online for free are mostly out of copyright, aren't they?",
          number: 22,
        },
        "And copyright in this country lasts for 70 years after the author dies. So you won't find the latest best-seller or up-to-date information.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "That's an important point. Anyway, I find it hard to concentrate when I'm reading a long text on a screen. I'd much rather read a physical book, and it takes longer to read on a screen.",
      ],
    },

    {
      speaker: "STEWART",
      text: ["Oh, I prefer it. I suppose it's just a personal preference."],
    },

    {
      speaker: "TRUDIE",
      text: [
        "Hmm, I expect libraries will go on evolving in the next few years. Some have already become centers where community activities take place. Like local clubs meeting there, I think that'll become even more common.",
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "I'd like to think so, and that they'll still be serving their traditional function, but I'm not so sure. There are financial implications after all.",
        {
          text: " What I'm afraid will happen is that books and magazines will all disappear, and there'll just be rows and rows of computers.",
          number: 23,
        },
        "They won't look anything like the libraries we're used to.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 24 to 30.",
        "Now listen and answer questions 24 to 30.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "I've just had an idea. Why don't we make an in-depth study of our local public library as background to our paper?",
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "Yes, that'd be interesting, and raise all sorts of issues. Let's make a list of possible things we could ask about, then work out some sort of structure. .",
        {
          text: "For instance, um, we could interview some of the staff, and find out whether the library has its own budget, or if that's controlled by the local council",
          number: 24,
        },
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "And what their policies are. I know they don't allow food, but I'd love to find out what types of noise they ban. There always seems to be a lot of talking, but never music. Hmm, I don't know if that's a policy or it just happens.",
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "Ah. I've often wondered.",
        {
          text: " Then there are things like how the library is affected by employment laws.",
          number: 25,
        },
        "I suppose there are rules about working hours, facilities for staff and so on.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "Right. ",
        {
          text: "Then there are other issues relating to the design of the building and how customers use it, like what measures does the library take to ensure their safety?",
          number: 26,
        },
        "They'd need floor coverings that aren't slippery, and emergency exits for instance. ",
        {
          text: "Oh, and another thing, there's the question of the kind of insurance the library needs to have, in case anyone gets injured.",
          number: 27,
        },
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "Yes, that's something else to find out. You know something I've often wondered.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: ["What's that?"],
    },

    {
      speaker: "STEWART",
      text: [
        "Well, you know they've got an archive of local newspapers going back years. ",
        {
          text: "Well, next to it, they've got the diary of a well-known politician from the late 19th century.",
          number: 28,
        },
        "I wonder why it's there. Do you know what his connection was with this area?",
      ],
    },

    {
      speaker: "TRUDIE",
      text: [
        "No idea. Let's add it to our list of things to find out. Oh, I've just thought - you know people might ask in the library about local organizations, like sports clubs? ",
        {
          text: "Hmm. Well, I wonder if they keep a database, or whether they just look online.",
          number: 29,
        },
      ],
    },

    {
      speaker: "STEWART",
      text: [
        "Right.",
        {
          text: " I quite fancy finding out what the differences are between a library that's open to the public and one that's part of a museum, for example.",
          number: 30,
        },
        "They must be very different.",
      ],
    },

    {
      speaker: "TRUDIE",
      text: ["Hmm, then something else I'd like to know is..."],
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
    "What will be the main topic of Trudie and Stewart's paper?",
    "They agree that one disadvantage of free digitalised books is that",
    "Stewart expects that in the future libraries will",
  ];

  const options = [
    [
      "A. how public library services are organised in different countries",
      "B. how changes in society are reflected in public libraries",
      "C. how the funding of public libraries has changed",
    ],

    [
      "A. they may take a long time to read.",
      "B. they can be difficult to read.",
      "C. they are generally old.",
    ],

    [
      "A. maintain their traditional function.",
      "B. become centres for local communities.",
      "C. no longer contain any books.",
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
      if (speaker === "STEWART") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "TRUDIE") {
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
    // Section 3 – Public Libraries
    21: "B. how changes in society are reflected in public libraries",
    22: "C. they are generally old.",
    23: "A. maintain their traditional function.",
    24: "budget",
    25: "employment",
    26: "safety",
    27: "insurance",
    28: "diary",
    29: "database",
    30: "museum",
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
                {renderText("Paper on Public libraries")}
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

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 21-23")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Paper on Public Libraries")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col  gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

                      return (
                        <li
                          key={oIndex}
                          onClick={() => handleOptionClick(qIndex, option)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 inline-block ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-700"
                            }`}
                          ></span>

                          <span
                            className={
                              isSelected ? "text-blue-500" : "text-black"
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 2st section */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 24–30")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Study of Local Library: Possible Questions")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* 24 */}
              <li className="text-lg">
                <span>{renderText("whether it has a")}</span>

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

                <span>{renderText("of its own")}</span>
              </li>

              {/* 25 */}
              <li className="text-lg">
                <span>
                  {renderText(
                    "how it's affected by laws regarding all aspects of"
                  )}
                </span>

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
              </li>

              {/* 26 */}
              <li className="text-lg">
                <span>{renderText("how the design needs to take the")}</span>

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

                <span>{renderText("of customers into account")}</span>
              </li>

              {/* 27 */}
              <li className="text-lg">
                <span>{renderText("what")}</span>

                <button
                  onClick={() => toggleButton(27)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[27]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  27
                </button>

                <input
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("is required in case of accidents")}</span>
              </li>

              {/* 28 */}
              <li className="text-lg">
                <span>{renderText("why a famous person's")}</span>

                <button
                  onClick={() => toggleButton(28)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[28]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  28
                </button>

                <input
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("is located in the library")}</span>
              </li>

              {/* 29 */}
              <li className="text-lg">
                <span>{renderText("whether it has a")}</span>

                <button
                  onClick={() => toggleButton(29)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[29]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  29
                </button>

                <input
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("of local organisations")}</span>
              </li>

              {/* 30 */}
              <li className="text-lg">
                <span>
                  {renderText("how it's different from a library in a")}
                </span>

                <button
                  onClick={() => toggleButton(30)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[30]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  30
                </button>

                <input
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>
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
                    All Answers (21-30)
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
      <Listening1Pagination2017></Listening1Pagination2017>
    </div>
  );
};

export default Listening1Part32017;
