import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";

const Listening3Part22015 = () => {
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
        "Section 2. You will hear a woman called Alice Bussell talking on the radio about the Dolphin Conservation Trust, an organization which tries to protect dolphins.",
        "First, you have some time to look at questions 11 to 15.",
        "Now listen carefully and answer questions 11 to 15.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: [
        "Today we're pleased to have on the show Alice Bussell from the Dolphin Conservation Trust.",
        "Tell us about the trust, Alice.",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "Well, obviously, its purpose is to protect dolphins in seas all around the world.",
        "It tries to raise people's awareness of the problems these marine creatures are suffering because of pollution and other threats.",
        "It started 10 years ago, and it's one of the fastest growing animal charities in the country.",
        "Although it's still fairly small compared with the big players in animal protection, we're particularly proud of the work we do in education.",
        "Last year, we visited a huge number of schools in different parts of the country, going round to talk to children and young people aged from 5 to 18.",
        "In fact, about 35% of our members are children.",
        "The charity uses its money to support campaigns, for example, for changes in fishing policy and so forth.",
        {
          text: "It hopes soon to be able to employ its first full-time biologist with dolphin expertise to monitor populations.",
          number: 11,
        },
        "Of course, many people give their services on a voluntary basis, and we now have volunteers working in observation, office work, and other things.",
        {
          text: "",
          number: 12,
        },
        "I should also tell you about the award we won from the Charity Commission last year, for our work in education.",
        "Although it's not meant an enormous amount of money for us, it has made our activities even more widely publicized and understood.",
        {
          text: "",
          number: 13,
        },
        "In the long term, it may not bring in extra members, but we're hoping it'll have this effect.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Is it possible to see dolphins in UK waters?"],
    },
    {
      speaker: "ALICE",
      text: [
        "Yes, in several locations, and we have a big project in the east part of Scotland.",
        "This has long been a haven for dolphins, because it has very little shipping.",
        "However, that may be about to change soon, because oil companies want to increase exploration there.",
        "We're campaigning against this, because although there'll be little pollution from oil, exploration creates a lot of underwater noise.",
        {
          text: "It means the dolphins can't rest and socialize.",
          number: 14,
        },
        "This is how I became interested in dolphin conservation in the first place.",
        "I had never seen one, and I hadn't been particularly interested in them at school.",
        "Then I came across this story about a family of dolphins who had to leave their home in the Moray Firth,",
        {
          text: "because of the oil companies.",
          number: 15,
        },
        "And about a child who campaigned to save them.",
        "I couldn't put the book down. I was hooked.",
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
      speaker: "INTERVIEWER",
      text: [
        "I'm sure our listeners will want to find out what they can do to help.",
        "You mentioned the Adopt a Dolphin scheme.",
        "Can you tell us about that?",
      ],
    },
    {
      speaker: "ALICE",
      text: [
        "Of course, people can choose one of our dolphins to sponsor.",
        "They receive a picture of it, and news updates.",
        "I'd like to tell you about four, which are currently being adopted by our members.",
        "Moondancer, Echo, Kiwi, and Samson.",
        "Unfortunately, Echo is being rather elusive this year, and hasn't yet been sighted by our observers.",
        {
          text: "",
          number: 16,
        },
        "But we remain optimistic that he'll be out there soon.",
        "All the others have been out in force.",
        "Samson and Moondancer are often photographed together, but it's Kiwi who's our real character, as she seems to love coming up close for the cameras, and we've captured her on film hundreds of times.",
        {
          text: "",
          number: 17,
        },
        "They all have their own personalities.",
        "Moondancer is very elegant and curves out and into the water very smoothly, whereas Samson has a lot of energy.",
        {
          text: "He's always leaping out of the water with great vigor.",
          number: 20,
        },
        {
          text: "",
          number: 18,
        },
        "You'd probably expect him to be the youngest, he's not quite, that's Kiwi, but Samson's the latest of our dolphins to be chosen for the scheme.",
        {
          text: "",
          number: 19,
        },
        "Kiwi makes a lot of noise, so we can often pick her out straight away.",
        "Echo and Moondancer are noisy too, but Moondancer is easy to find, because she has a particularly large fin on her back, which makes her easy to identify.",
        "So, yes, they're all very different.",
      ],
    },
    {
      speaker: "INTERVIEWER",
      text: ["Well, they sound a fascinating group."],
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
    // Questions 11 and 12 (Choose TWO letters)
    11: ["C", "E"],

    // Questions 13–15 (Choose the correct letter)
    13: "B", // It made the work of the trust better known.
    14: "A", // Noise.
    15: "C", // She read a book about them.

    // Questions 16–20 (Dolphins)
    16: "B", // Echo - It has not been seen this year.
    17: "C", // Kiwi - It is photographed more than the others.
    18: "D", // Samson - It is always very energetic.
    19: "C", // Kiwi - It is the newest one in the scheme.
    20: "A", // Moondancer - It has an unusual shape.
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
  const handleCheckboxChange = (qNum, letter) => {
    setUserAnswers((prev) => {
      const prevArr = Array.isArray(prev[qNum]) ? prev[qNum] : [];
      const updatedArr = prevArr.includes(letter)
        ? prevArr.filter((l) => l !== letter)
        : [...prevArr, letter];

      const updated = { ...prev, [qNum]: updatedArr };
      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const correct = correctAnswers[key];
      const user = answers[key];

      // 🔹 Choose TWO letters
      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((ans) => user.includes(ans))
        ) {
          newScore += 1;
        }
      }
      // 🔹 Single answer
      else {
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
                {renderText("Dolphin Conservation Trust")}
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
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          <p className="mb-4">
            {renderText("Answer the questions below.")} <br />
            {renderText("Choose the correct letters as instructed.")}
          </p>

          <div className=" p-5 rounded-lg bg-white space-y-6">
            <h2 className="text-lg font-bold text-center">
              {renderText("Dolphin Conservation Trust")}
            </h2>

            {/* ---------- Questions 11–12 ---------- */}
            <div>
              <h3 className="font-bold mb-2">
                {renderText("Questions 11 and 12")}
              </h3>
              <p className="mb-3">{renderText("Choose TWO letters, A–E.")}</p>

              <p className="font-semibold mb-2">
                {renderText(
                  "Which TWO things does Alice say about the Dolphin Conservation Trust?"
                )}
              </p>

              {[
                "Children make up most of the membership.",
                "It's the country's largest conservation organisation.",
                "It helps finance campaigns for changes in fishing practices.",
                "It employs several dolphin experts full-time.",
                "Volunteers help in various ways.",
              ].map((text, idx) => {
                const letter = String.fromCharCode(65 + idx);
                return (
                  <label key={letter} className="flex items-start gap-2 mb-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(11, letter)}
                    />
                    <span>
                      <strong>{letter}.</strong> {renderText(text)}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* ---------- Questions 13–15 ---------- */}
            <div>
              <h3 className="font-bold mb-2">
                {renderText("Questions 13–15")}
              </h3>
              <p className="mb-3">
                {renderText("Choose the correct letter, A, B or C.")}
              </p>

              {/* 13 */}
              <div className="mb-4">
                <p className="font-semibold">
                  {renderText(
                    "13 Why is Alice so pleased the Trust has won the Charity Commission award?"
                  )}
                </p>
                {[
                  "It has brought in extra money.",
                  "It made the work of the trust better known.",
                  "It has attracted more members.",
                ].map((text, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <label key={letter} className="flex gap-2">
                      <input
                        type="radio"
                        name="q13"
                        onChange={() => handleInputChange(13, letter)}
                      />
                      <span>
                        <strong>{letter}.</strong> {renderText(text)}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* 14 */}
              <div className="mb-4">
                <p className="font-semibold">
                  {renderText(
                    "14 Alice says oil exploration causes problems to dolphins because of"
                  )}
                </p>
                {["noise.", "oil leaks.", "movement of ships."].map(
                  (text, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <label key={letter} className="flex gap-2">
                        <input
                          type="radio"
                          name="q14"
                          onChange={() => handleInputChange(14, letter)}
                        />
                        <span>
                          <strong>{letter}.</strong> {renderText(text)}
                        </span>
                      </label>
                    );
                  }
                )}
              </div>

              {/* 15 */}
              <div>
                <p className="font-semibold">
                  {renderText("15 Alice became interested in dolphins when")}
                </p>
                {[
                  "she saw one swimming near her home.",
                  "she heard a speaker at her school.",
                  "she read a book about them.",
                ].map((text, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <label key={letter} className="flex gap-2">
                      <input
                        type="radio"
                        name="q15"
                        onChange={() => handleInputChange(15, letter)}
                      />
                      <span>
                        <strong>{letter}.</strong> {renderText(text)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ---------- Questions 16–20 ---------- */}
            <div>
              <h3 className="font-bold mb-2">
                {renderText("Questions 16–20")}
              </h3>
              <p className="mb-3">
                {renderText(
                  "Which dolphin does Alice make each of the following comments about?"
                )}
              </p>

              <div className="border max-w-[150px] mx-auto text-center">
                {" "}
                <p className="mb-2 font-semibold">{renderText("Dolphins")}</p>
                <ul className="mb-4">
                  <li>A. Moondancer</li>
                  <li>B. Echo</li>
                  <li>C. Kiwi</li>
                  <li>D. Samson</li>
                </ul>
              </div>

              {[
                "It has not been seen this year.",
                "It is photographed more than the others.",
                "It is always very energetic.",
                "It is the newest one in the scheme.",
                "It has an unusual shape.",
              ].map((text, idx) => {
                const qNum = 16 + idx;
                return (
                  <div key={qNum} className="flex items-center gap-2 mb-2">
                    <span className="font-bold w-6">{qNum}.</span>
                    <span>{renderText(text)}</span>
                    <select
                      className="border rounded px-2 py-1 ml-2"
                      onChange={(e) => handleInputChange(qNum, e.target.value)}
                    >
                      <option value="">{qNum}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                );
              })}
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
                      All Answers (11–20)
                    </h3>

                    <ul className="space-y-3">
                      {[11, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const noAnswer =
                          user === undefined ||
                          (Array.isArray(user) && user.length === 0);

                        const isCorrect = Array.isArray(correct)
                          ? Array.isArray(user) &&
                            user.length === correct.length &&
                            correct.every((a) => user.includes(a))
                          : user === correct;

                        const isWrong = !noAnswer && !isCorrect;

                        return (
                          <li
                            key={num}
                            className="p-3 rounded-lg bg-white shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              {isCorrect && (
                                <span className="text-green-600 text-xl">
                                  <FaDotCircle />
                                </span>
                              )}
                              {(isWrong || noAnswer) && (
                                <span className="text-red-600 text-xl">
                                  <ImCross />
                                </span>
                              )}
                              <p className="font-bold">Q{num}:</p>
                            </div>

                            <p className="ml-8">
                              <strong>Your Answer:</strong>{" "}
                              {noAnswer ? (
                                <em>No answer provided</em>
                              ) : Array.isArray(user) ? (
                                user.join(", ")
                              ) : (
                                user
                              )}
                            </p>

                            <p className="ml-8 text-green-600">
                              <strong>Correct Answer:</strong>{" "}
                              {Array.isArray(correct)
                                ? correct.join(", ")
                                : correct}
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
      </div>
      <Listening3Pagination2015></Listening3Pagination2015>
    </div>
  );
};

export default Listening3Part22015;
