import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2023 from "../Pagination 2023/Listening3Pagination2023";

const Listening3Part22023 = () => {
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
        "Part 2, you will hear an expert on picking wild mushrooms called Dan talking on the radio.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "PRESENTER",
      text: [
        "This evening, we're delighted to welcome Dan Beagle, who's just written a book on looking for and finding food in the wild.",
        "He's going to tell us everything we need to know about picking wild mushrooms.",
      ],
    },
    {
      speaker: "DAN",
      text: [
        "Thank you very much.",
        "Well, I need to start by talking about safety.",
        "You really need to know what you're doing because some mushrooms are extremely poisonous.",
        "Having said that, once you know what to look for it's really worth doing for the amazing variety of mushrooms available, which you can't get in the shops.",
        "But of course you have to be very careful.",
        {
          text: "And that's why I always say you should never consume mushrooms picked by friends or neighbors.",
          number: 12,
        },
        "Always remember that some poisonous mushrooms look very similar to edible ones.",
        "And it's easy for people to get confused.",
        "The other thing to avoid is mushrooms growing beside busy roads for obvious reasons,",
        {
          text: "but nothing beats the taste of freshly picked mushrooms.",
          number: 11,
        },
        "Don't forget that the ones in the shops are often several days old and past their best.",
        "There are certain ideas about wild mushrooms that it's important to be aware of.",
        "Don't listen to people who tell you that it's only OK to eat mushrooms that are pale.",
        "Or dull.",
        {
          text: "This is completely untrue. Some edible mushrooms are bright red for example.",
          number: 14,
        },
        "Personally I prefer mushrooms cooked, but it won't do you any harm to eat them uncooked in salads.",
        "It's not necessary to peel them.",
        "Another thing you should remember is that you can't tell if a mushroom is safe to eat by its smell.",
        "Some of the most deadly mushrooms have no smell.",
        "And taste quite nice, apparently.",
        {
          text: "Finally, just because deer or squirrels eat a particular mushroom, doesn't mean that you can.",
          number: 13,
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
      speaker: "DAN",
      text: [
        "Of course, mushroom picking is associated with the countryside, but if you haven't got a car, your local park can be a great place to start.",
        "There are usually a range of habitats where mushrooms grow, such as playing fields and wooded areas,",
        {
          text: "but you need to be there first thing in the morning.",
          number: 15,
        },
        "As there's likely to be a lot of competition, not just from people, but wildlife too.",
        "The deer often get the best mushrooms in my local park.",
        "If you're a complete beginner, I wouldn't recommend going alone or relying on photos in a book, even the one I've written.",
        "There are some really good phone apps for identifying mushrooms, but you can't always rely on getting a good signal in the middle of a wood.",
        {
          text: "If possible, you should go with a group led by an expert.",
          number: 16,
        },
        "You'll stay safe, and learn a lot that way.",
        "Conservation is a really important consideration, and you must follow a few basic rules.",
        {
          text: "You should never pick all the mushrooms in one area.",
          number: 17,
        },
        "Collect only enough for your own needs.",
        "Be very careful that you don't trample on young mushrooms or other plants.",
        "And make sure you don't pick any mushrooms that are endangered and protected by law.",
        "There's been a decline in some varieties of wild mushrooms in this part of the country.",
        "Restaurants are becoming more interested in locally sourced food like wild mushrooms.",
        {
          text: "But the biggest problem is that so many new houses have been built in this area in the last 10 years, and more water is being taken from rivers and reservoirs.",
          number: 18,
        },
        "Because of this, mushroom habitats have been destroyed.",
        "Anyway, a word of advice on storing mushrooms.",
        "Collect them in a brown paper bag, and as soon as you get home, put them in the fridge.",
        {
          text: "They'll be fine for a couple of days, but it's best to cook them as soon as possible.",
          number: 19,
        },
        "After washing them really carefully first, of course.",
        "So, everybody knows what a mushroom tastes like, right?",
        "Well, you'll be surprised by the huge variety of wild mushrooms there are.",
        "Be adventurous.",
        {
          text: "They're great in so many dishes, stir fries, risottos, pasta.",
          number: 20,
        },
        "Just be aware that some people can react badly to certain varieties, so it's a good idea not to eat huge quantities to begin with.",
        "OK, so now I'm going to show you a few examples of poisonous...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have 30 seconds to check your answers to part 2.",
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

  const correctAnswers = {
    "11-12": ["B", "C"],
    "13-14": ["B", "D"],
    15: "C",
    16: "B",
    17: "B",
    18: "C",
    19: "A",
    20: "A",
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "11-12" || id === "13-14") {
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
    localStorage.setItem("/listening3Part22023", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part22023");
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
                {renderText("Picking Mushrooms")}
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
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–20")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Picking Mushrooms")}
            </h1>

            {/* ================= Questions 11–12 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 11 and 12</h2>
              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                11–12{" "}
                {renderText(
                  "Which TWO warnings does Dan give about picking mushrooms?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "Don't pick more than one variety of mushroom at a time.",
                  "Don't pick mushrooms near busy roads.",
                  "Don't eat mushrooms given to you.",
                  "Don't eat mushrooms while picking them.",
                  "Don't pick old mushrooms.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["11-12"] || [];
                  const isChecked = selected.includes(value);
                  const isDisabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isDisabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleInputChange("11-12", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 13–14 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 13 and 14</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                13–14{" "}
                {renderText(
                  "Which TWO ideas about wild mushrooms does Dan say are correct?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "Mushrooms should always be peeled before eating.",
                  "Mushrooms eaten by animals may be unsafe.",
                  "Cooking destroys toxins in mushrooms.",
                  "Brightly coloured mushrooms can be edible.",
                  "All poisonous mushrooms have a bad smell.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["13-14"] || [];
                  const isChecked = selected.includes(value);
                  const isDisabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isDisabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleInputChange("13-14", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 15–20 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 15–20</h2>
              <p className="mt-2">
                {renderText("Choose the correct letter, A, B or C.")}
              </p>
            </div>

            {[
              {
                num: 15,
                q: "What advice does Dan give about picking mushrooms in parks?",
                options: [
                  "Choose wooded areas.",
                  "Don't disturb wildlife.",
                  "Get there early.",
                ],
              },
              {
                num: 16,
                q: "Dan says it is a good idea for beginners to",
                options: [
                  "use a mushroom app.",
                  "join a group.",
                  "take a reference book.",
                ],
              },
              {
                num: 17,
                q: "What does Dan say is important for conservation?",
                options: [
                  "selecting only fully grown mushrooms",
                  "picking a limited amount of mushrooms",
                  "avoiding areas where rare mushroom species grow",
                ],
              },
              {
                num: 18,
                q: "According to Dan, some varieties of wild mushrooms are in decline because there is",
                options: [
                  "a huge demand for them from restaurants.",
                  "a lack of rain in this part of the country.",
                  "a rise in building developments locally.",
                ],
              },
              {
                num: 19,
                q: "Dan says that when storing mushrooms, people should",
                options: [
                  "keep them in the fridge for no more than two days.",
                  "keep them in a brown bag in a dark room.",
                  "leave them for a period after washing them.",
                ],
              },
              {
                num: 20,
                q: "What does Dan say about trying new varieties of mushrooms?",
                options: [
                  "Experiment with different recipes.",
                  "Expect some to have a strong taste.",
                  "Cook them for a long time.",
                ],
              },
            ].map(({ num, q, options }) => (
              <div key={num} className="space-y-2">
                <p className="font-bold">
                  {num} {renderText(q)}
                </p>
                {options.map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  return (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${num}`}
                        checked={userAnswers[num] === value}
                        onChange={() => handleInputChange(num, value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            ))}
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
                    {renderText("Your Score: ")}
                    {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (11–20)")}
                  </h3>

                  <ul className="space-y-3">
                    {["11-12", "13-14", 15, 16, 17, 18, 19, 20].map((num) => {
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
      <Listening3Pagination2023></Listening3Pagination2023>
    </div>
  );
};

export default Listening3Part22023;
