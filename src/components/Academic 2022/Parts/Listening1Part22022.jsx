import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2022 from "../Pagination2022/Listening1Pagination2022";

const Listening1Part22022 = () => {
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
        "Part 2. You will hear a tour guide, Lou Miller, speaking to a group of people about a boat trip they are going to take around the Australian island of Tasmania.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "LOU MILLER",
      text: [
        "So, hello everyone, my name is Lou Miller, and I'm going to be your tour guide today, as we take this fantastic boat trip around the Tasmanian coast.",
        "Before we set off, I just want to tell you a few things about our journey.",
        "Our boats aren't huge, as you can see, we already have three staff members on board.",
        "And on top of that, we can transport a further 15 people, that's you, around the coastline.",
        {
          text: "But please note, if there are more than 9 people on either side of the boat, we'll move some of you over. Ha, otherwise all 18 of us will end up in the sea.",
          number: 11,
        },
        "We've recently upgraded all our boats.",
        "They used to be jet black, but our new ones now have these comfortable dark red seats and a light green exterior.",
        {
          text: "In order to stand out from others and help promote our company. This gives our boats a rather unique appearance, don't you think?",
          number: 12,
        },
        "We offer you a free lunch box during the trip. And we have three types.",
        "Lunch Box 1 contains ham and tomato sandwiches.",
        "Lunch Box 2 contains a cheddar cheese roll.",
        {
          text: "And lunch box 3 is salad based, and also contains eggs and tuna. All three lunch boxes also have a packet of crisps and chocolate bar inside. Please let staff know which lunch box you prefer.",
          number: 13,
        },
        "I'm sure I don't have to ask you not to throw anything into the sea.",
        {
          text: "We don't have any bins to put litter in, but Jess, myself or Ray, our other guide, will collect it from you after lunch and put it all in a large plastic sack.",
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
      speaker: "LOU MILLER",
      text: [
        "The engine on the boat makes quite a lot of noise, so before we head off, let me tell you a few things about what you're going to see.",
        "This area is famous for its ancient lighthouse, which you'll see from the boat as we turn past the first little island.",
        "It was built in 1838 to protect sailors, as a number of shipwrecks had led to significant loss of life.",
        {
          text: "The construction itself was complicated, as some of the original drawings kept by the local council show.",
          number: 15,
        },
        "It sits right on top of the cliffs in a very isolated spot.",
        "In the 19th century, there were many jobs there, such as polishing the brass lamps, chopping firewood, and cleaning windows that kept lighthouse keepers busy.",
        "These workers were mainly prison convicts until the middle of that century, when ordinary families willing to live in such circumstances took over.",
        {
          text: "Some of you have asked me what creatures we can expect to see. I know everyone loves the penguins, but they're very shy, and unfortunately tend to hide from passing boats. But you might see birds in the distance, such as sea eagles flying around the cliff edges where they nest. When we get to the rocky area inhabited by fur seals, we'll stop and watch them swimming around the coast.",
          number: 16,
        },
        {
          text: "They're inquisitive creatures, so don't be surprised if one pops up right in front of you. Their predators, orca whales, hunt along the coastline too. But spotting one of these is rare. Dolphins on the other hand can sometimes approach on their own or in groups, as they ride the waves beside us.",
          number: 17,
        },
        {
          text: "Lastly, I want to mention the caves. Tasmania is famous for its caves, and the ones we'll pass by are so amazing that people are lost for words when they see them. They can only be approached by sea, but if you feel that you want to see more than we're able to show you, then you can take a kayak into the area on another day.",
          number: 18,
        },
        {
          text: "And one of our staff will give you more information on that. What we'll do is to go through a narrow channel, past some incredible rock formations. And from there, we'll be able to see the openings to the caves, and at that point, we'll talk to you about what lies beyond.",
          number: 19,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have half a minute to check your answers to part 2.",
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
    // Questions 11–14 (Choose the correct letter, A, B, or C)
    11: "C", // 18 people
    12: "A", // dark red
    13: "B", // Lunchbox 2
    14: "C", // put it in the bins provided on the boat

    // Questions 15–16 (Choose TWO letters, A–E)
    "15-16": ["A", "E"], // why it was built, what it was built with

    // Questions 17–18 (Choose TWO letters, A–E)
    "17-18": ["B", "C"], // fur seals, dolphins

    // Questions 19–20 (Choose TWO letters, A–E)
    "19-20": ["B", "D"], // entrances often blocked, someone explains inside
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "15-16" || id === "17-18" || id === "19-20") {
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
    localStorage.setItem("/listening1Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
            <h1 className="text-xl font-bold">{renderText("    PART 1")}</h1>
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
                {renderText("Boat trip round Tasmania")}
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

          <h3 className="text-lg mb-6">
            {renderText(
              "Choose the correct letter A, B, C or choose TWO letters, A–E as instructed."
            )}
          </h3>

          {/* ---------- Questions 11–14 (single choice) ---------- */}
          <div className=" p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Boat trip round Tasmania")}
            </h1>

            {/* Q11 */}
            {/* Q11 */}
            <p className="text-lg font-bold">
              11{" "}
              {renderText(
                "What is the maximum number of people who can stand on each side of the boat?"
              )}
            </p>

            <div className="flex flex-col space-y-2 mt-1">
              {["A. 9", "B. 15", "C. 18"].map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q11"
                    value={opt[0]}
                    checked={userAnswers[11] === opt[0]}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                    className="form-radio"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* Q12 */}
            {/* Q12 */}
            <p className="text-lg font-bold mt-2">
              12 {renderText("What colour are the tour boats?")}
            </p>

            <div className="flex flex-col space-y-2 mt-1">
              {["A. dark red", "B. jet black", "C. light green"].map(
                (opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="q12"
                      value={opt[0]}
                      checked={userAnswers[12] === opt[0]}
                      onChange={(e) => handleInputChange(12, e.target.value)}
                      className="form-radio"
                    />
                    <span>{opt}</span>
                  </label>
                )
              )}
            </div>

            {/* Q13 */}
            <p className="text-lg font-bold">
              13{" "}
              {renderText(
                "Which lunchbox is suitable for someone who doesn't eat meat or fish?"
              )}
            </p>

            <div className="flex flex-col space-y-2 mt-1">
              {["A. Lunchbox 1", "B. Lunchbox 2", "C. Lunchbox 3"].map(
                (opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="q13"
                      value={opt[0]}
                      checked={userAnswers[13] === opt[0]}
                      onChange={(e) => handleInputChange(13, e.target.value)}
                      className="form-radio"
                    />
                    <span>{opt}</span>
                  </label>
                )
              )}
            </div>

            {/* Q14 */}
            {/* Q14 */}
            <p className="text-lg font-bold mt-2">
              14 {renderText("What should people do with their litter?")}
            </p>

            <div className="flex flex-col space-y-1 mt-1">
              {[
                "A. take it home",
                "B. hand it to a member of staff",
                "C. put it in the bins provided on the boat",
              ].map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q14"
                    value={opt[0]}
                    checked={userAnswers[14] === opt[0]}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                    className="form-radio"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <h2 className="font-bold text-xl">
              {renderText("Questions 15 and 16.")}
            </h2>
            <p className="mb-3">
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>

            {/* ---------- Questions 15–16 (choose TWO letters) ---------- */}
            <p className="text-lg mt-6">
              <span className="font-bold">15-16 </span>
              {renderText(
                "Which TWO features of the lighthouse does Lou mention?"
              )}
            </p>
            {[
              " why it was built",
              "who built it",
              "how long it took to build",
              "who staffed it",
              "what it was built with",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A–E

              const selectedOptions = userAnswers["15-16"] || [];
              const isChecked = selectedOptions.includes(value);

              // Disable other options once TWO are selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 mb-1 cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("15-16", value)}
                  />

                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(optionText)}</span>
                </label>
              );
            })}

            {/* ---------- Questions 17–18 (choose TWO letters) ---------- */}
            <p className="text-lg mt-6">
              <span className="font-bold">17-18 </span>
              {renderText(
                "Which TWO types of creature might come close to the boat?"
              )}
            </p>
            {["sea eagles", "fur seals", "dolphins", "whales", "penguins"].map(
              (optionText, index) => {
                const value = String.fromCharCode(65 + index); // A–E

                const selectedOptions = userAnswers["17-18"] || [];
                const isChecked = selectedOptions.includes(value);

                // Disable other options once TWO are selected
                const isDisabled = selectedOptions.length === 2 && !isChecked;

                return (
                  <label
                    key={index}
                    className={`flex items-center gap-3 mb-1 cursor-pointer ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("17-18", value)}
                    />

                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(optionText)}</span>
                  </label>
                );
              }
            )}

            {/* ---------- Questions 19–20 (choose TWO letters) ---------- */}
            <p className="text-lg mt-6">
              <span className="font-bold">19-20 </span>
              {renderText("Which TWO points does Lou make about the caves?")}
            </p>
            {[
              "Only large tourist boats can visit them.",
              "The entrances to them are often blocked.",
              "It is too dangerous for individuals to go near them.",
              "Someone will explain what is inside them.",
              "They cannot be reached on foot.",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A–E

              const selectedOptions = userAnswers["19-20"] || [];
              const isChecked = selectedOptions.includes(value);

              // Disable other options once TWO are selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 mb-1 cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("19-20", value)}
                  />

                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(optionText)}</span>
                </label>
              );
            })}
          </div>

          {/* ---------- Submit / Result ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
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
                    {[11, 12, 13, 14, "15-16", "17-18", "19-20"].map((num) => {
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
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
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
      <Listening1Pagination2022></Listening1Pagination2022>
    </div>
  );
};

export default Listening1Part22022;
