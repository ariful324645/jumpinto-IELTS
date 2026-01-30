import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2025 from "../Pagination 2025/Listening1Pagination2025";

const Listening1Part22025 = () => {
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
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 2. You will hear a potter, Heather McCallum, speaking to a group of people who are visiting a pottery, a place where people make pots and other objects from clay.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully and answer questions 11 to 16.",
      ],
    },
    {
      speaker: "HEATHER MCCALLUM",
      text: [
        "Hello, and welcome. My name's Heather McCallum, and I'm one of the potters who work here at Edelman Pottery.",
        "Before we go into the workshop, I just want to say a bit about the craft of pottery.",
        "Then we'll have a look at the equipment, and you can try making a pot of your own.",
        "Like many people, I'm sure you know that pottery as an art form is tens of thousands of years old, and we know this because it stands the test of time.",
        {
          text: "Things like baskets and pictures don't survive in the earth in the same way that pots do.",
          number: 11,
        },
        "And even if ancient pots are found in small pieces, they still provide a lot of information about the past.",
        "There's no doubt that pottery has given archaeologists a fascinating insight into how ancient humans lived.",
        "The shape of an artifact may have been lost.",
        {
          text: "But archaeologists can tell whether the pots were for, say, storage or cooking by examining the impressions on the clay, the scratches from tools.",
          number: 12,
        },
        "And the clay itself can reveal where the pots came from.",
        "When I ask people why they want to take a pottery class with me, they sometimes talk about these things, like our ancestors.",
        "They hope that something they create will also last longer than they do.",
        {
          text: "That their work, whether it is good or not, might say something about humanity many years after their death.",
          number: 13,
        },
        "Of course, you will all have your own reasons for coming here.",
        "As far as I'm concerned, what I love most is the concentration you need to make a good pot.",
        {
          text: "That focus takes you away from the stresses of everyday life.",
          number: 14,
        },
        "If you're elderly, it's also good exercise for hands and wrists.",
        "And helps with arthritis, and of course, it's a fun activity for children, because it's so messy.",
        "Here at Edelman Pottery we show you some of the basic pottery techniques, so that you can use these to create whatever you wish, a gift for a friend perhaps, like nearly everyone who comes here.",
        "I'm sure this is the first time you will have tried the art, so we'll keep things simple today.",
        {
          text: "Now, before we move on, can I just say a word about what you're wearing?",
          number: 15,
        },
        "As we said in our email, please remove any watches, necklaces, et cetera.",
        {
          text: "And put them somewhere safe.",
          number: 16,
        },
        "If you have long hair, do tie it back now.",
        "We'll provide aprons later, but I trust your clothes are old but comfortable.",
        "Not your favorite T-shirt or jeans.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 17 to 20.",
        "Now listen and answer questions 17 to 20.",
      ],
    },
    {
      speaker: "HEATHER MCCALLUM",
      text: [
        "So now we're in the workshop.",
        "Have a look around. There's a lot going on.",
        "To make pottery that will last, you need a potter's wheel.",
        "A kiln, which is basically a very hot oven where you fire the pottery, and some tools.",
        "So first the kiln.",
        "If you look over in the far corner, you'll see one of ours.",
        "Since their invention, kilns have changed very little.",
        "Though in the past 20 years, a lot of progress has been made in temperature control.",
        "Basically, a kiln removes the water from clay.",
        {
          text: "At temperatures of around 1,000 degrees Celsius.",
          number: 17,
        },
        "This allows anything you've made to set permanently in shape.",
        "It's a pretty ugly, heavy object that's hard to keep in a house or flat, so most people don't have one.",
        "You may think, 'can't I use my oven?'",
        "Well, that's possible, but domestic ovens don't really get hot enough, and eventually the clay will crack and fall apart.",
        {
          text: "Some people fire pottery in a fire pit outside, but bear in mind that can be dangerous.",
          number: 18,
        },
        "You also need to know about safety procedures for kilns.",
        "As they release toxic compounds into the air.",
        "Every potter needs a potter's wheel.",
        "This machine is used to shape the clay into an object with circular walls or sides, such as a bowl.",
        "Its invention revolutionized the pottery industry, allowing multiple items to be produced in a day.",
        "Lastly, there are a number of different tools that potters use, depending on what they want to make.",
        "When you start, your hands can make all kinds of shapes and curves without relying on a sculpting tool.",
        "However, there are some basic tools that you will need to handle the clay on the wheel.",
        {
          text: "Some look very strange and have even odder names.",
          number: 19,
        },
        "That you may find hard to remember.",
        "Rather than go through them all now, I'll just name a few tools as we go along.",
        "We can provide these.",
        {
          text: "And I wouldn't recommend spending money on them yet.",
          number: 20,
        },
        "So, let's try making a pot of your own.",
        "If you sit down...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have 30 seconds to check your answers to part two.",
      ],
    },
  ];

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
                : [p],
            )
          : [part],
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
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

  //  Marks show
  const correctAnswers = {
    // Questions 11–16 (Choose ONE letter, A, B or C)
    11: "A", // pottery lasts longer in the ground
    12: "B", // the marks that are on it
    13: "C", // make something that will outlive them
    14: "A", // its calming effect
    15: "B", // have never made a pot before
    16: "C", // take off their jewellery

    // Questions 17–18 (Choose TWO letters, A–E)
    "17-18": ["A", "E"],
    // what their function is
    // what some people use instead of one

    // Questions 19–20 (Choose TWO letters, A–E)
    "19-20": ["C", "E"],
    // Some are essential items
    // Some are available for use by participants
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "17-18" || id === "19-20") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
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
    localStorage.setItem("/listening1Part22025", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22025");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22025");
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
                {renderText("Introduction to Pottery at Edelman Pottery")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–20")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Introduction to Pottery at Edelman Pottery")}
            </h1>

            {/* ================= Questions 11–16 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 11–16</h2>
              <p className="mt-2">
                {renderText("Choose the correct letter, ")}
                <span className="font-bold">A, B or C</span>.
              </p>

              {[
                {
                  num: 11,
                  q: "Heather says pottery differs from other art forms because",
                  opts: [
                    "it lasts longer in the ground.",
                    "it is practised by more people.",
                    "it can be repaired more easily.",
                  ],
                },
                {
                  num: 12,
                  q: "Archaeologists sometimes identify the use of ancient pottery from",
                  opts: [
                    "the clay it was made with.",
                    "the marks that are on it.",
                    "the basic shape of it.",
                  ],
                },
                {
                  num: 13,
                  q: "Some people join Heather's pottery class because they want to",
                  opts: [
                    "create an item that looks very old.",
                    "find something that they are good at.",
                    "make something that will outlive them.",
                  ],
                },
                {
                  num: 14,
                  q: "What does Heather value most about being a potter?",
                  opts: [
                    "its calming effect",
                    "its messy nature",
                    "its physical benefits",
                  ],
                },
                {
                  num: 15,
                  q: "Most of the visitors to Edelman Pottery",
                  opts: [
                    "bring friends to join courses.",
                    "have never made a pot before.",
                    "try to learn techniques too quickly.",
                  ],
                },
                {
                  num: 16,
                  q: "Heather reminds her visitors that they should",
                  opts: [
                    "put on their aprons.",
                    "change their clothes.",
                    "take off their jewellery.",
                  ],
                },
              ].map(({ num, q, opts }) => (
                <div key={num} className="mt-6">
                  <p className="font-bold text-lg">
                    {num}. {renderText(q)}
                  </p>

                  <div className="space-y-2 mt-2">
                    {opts.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx);
                      return (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`q-${num}`}
                            checked={userAnswers[num] === value}
                            onChange={() => handleInputChange(num, value)}
                          />
                          <span className="font-semibold">{value}.</span>
                          <span>{renderText(opt)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* ================= Questions 17–18 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 17 and 18</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                17–18{" "}
                {renderText(
                  "Which TWO things does Heather explain about kilns?",
                )}
              </p>

              {[
                "what their function is",
                "when they were invented",
                "ways of keeping them safe",
                "where to put one in your home",
                "what some people use instead of one",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["17-18"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("17-18", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 19–20 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 19 and 20</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                19–20{" "}
                {renderText(
                  "Which TWO points does Heather make about a potter's tools?",
                )}
              </p>

              {[
                "Some are hard to hold.",
                "Some are worth buying.",
                "Some are essential items.",
                "Some have memorable names.",
                "Some are available for use by participants.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["19-20"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("19-20", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>
            <div className="mt-10">
              {!showResult ? (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setShowResult(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                  >
                    {renderText("Submit Answers")}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Result Card */}
                  <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {renderText("Result")}
                    </h1>
                    <p className="text-green-600 text-2xl font-semibold">
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (11–20)")}
                    </h3>

                    <ul className="space-y-3">
                      {[11, 12, 13, 14, 15, 16, "17-18", "19-20"].map((num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const isCorrect = (() => {
                          if (Array.isArray(correct)) {
                            return (
                              Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            );
                          } else {
                            return (
                              user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase()
                            );
                          }
                        })();

                        const noAnswer = !user;

                        const userAnswerDisplay = Array.isArray(user)
                          ? user.join(", ")
                          : user?.trim() || "";
                        const correctAnswerDisplay = Array.isArray(correct)
                          ? correct.join(", ")
                          : correct?.trim();

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
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {noAnswer ? (
                                <span className="italic">
                                  No answer provided
                                </span>
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
      </div>
      <Listening1Pagination2025></Listening1Pagination2025>
    </div>
  );
};

export default Listening1Part22025;
