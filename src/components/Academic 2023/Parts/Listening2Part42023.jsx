import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2023 from "../Pagination 2023/Listening2Pagination2023";

const Listening2Part42023 = () => {
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
        "Part 4, you will hear a student on a fashion design course giving a talk about the history of pockets.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning.",
        "Now we've been asked to choose an aspect of European clothing or fashion, and to talk about its development over time.",
        "I decided to focus on a rather small area of clothing, and that's pockets.",
        "I chose pockets for two reasons really.",
        "We all have them in jeans, jackets, coats for example, and even though we often carry bags or briefcases as well, nothing is quite as convenient as being able to pop your phone or credit card into your pocket.",
        {
          text: "Yet, I suspect that other than that, people don't really think about pockets too much, and they're rather overlooked as a fashion item.",
          number: 31,
        },
        "It's certainly very interesting to go back in time, and see how pockets developed for men and women.",
        "In the 18th century, fashions were quite different from the way they are now. Pockets were too.",
        "If we think about male fashion first, that was the time when suits became popular.",
        {
          text: "Trousers were knee length only, and referred to as breeches.",
          number: 32,
        },
        "The waistcoats were short, and the jackets were long, but all three garments were lined with material, and pockets were sewn into this cloth, by whichever tailor the customer used.",
        {
          text: "The wearer could then carry small objects such as pencils or coins on their person, and reach them through a gap in the lining.",
          number: 33,
        },
        "Coat pockets became increasingly decorative on the outside for men who wanted to look stylish, but they were often larger, but plainer, if the wearer was someone with a profession who needed to carry medical instruments, a doctor or physician for example.",
        {
          text: "The development of women's pockets was a little different.",
          number: 34,
        },
        "For one thing, they weren't nearly as visible or as easy to reach as men's.",
        "In the 18th and 19th centuries, women carried numerous possessions on their person, and some of these could be worth a lot of money.",
        "Women were more vulnerable to theft, and wealthy women in particular worried constantly about pickpockets.",
        {
          text: "So, what they did was to have a pair of pockets made that were tied together with string.",
          number: 35,
        },
        "The pockets were made of fabric, which might be recycled cloth if the wearer had little money, or something more expensive, such as linen, sometimes featuring very delicate embroidery.",
        {
          text: "Women tied the pockets around their waist, so that they hung beneath their clothes.",
          number: 36,
        },
        "Remember, skirts were long then, and there was plenty of room to hide a whole range of small possessions between the layers of petticoats that were commonly worn.",
        {
          text: "They would have an opening in the folds of their skirts, through which they could reach whatever they needed, like their perfume.",
          number: 37,
        },
        "Working women of course, also needed to carry around items that they might use for whatever job or trade they were involved in, but their pairs of pockets still remained on the inside of their clothing.",
        "They just got bigger or longer, sometimes reaching down to their knees.",
        {
          text: "So, the tie-on pockets went well into the 19th century, and only changed when fashion altered towards the end of that period.",
          number: 38,
        },
        "That's when dresses became tighter and less bulky, and the pairs of pockets became very noticeable.",
        "They stood out too much, and detracted from the woman's image.",
        {
          text: "Women who had been used to carrying around a range of personal possessions, and still wanted to, needed somewhere to carry these items about their person.",
          number: 39,
        },
        "That was when small bags or pouches, as they were known, came into fashion, and of course, they inevitably led on to the handbag of more modern times.",
        {
          text: "Particularly when fashion removed pockets altogether.",
          number: 40,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 4.",
        "You now have one minute to check your answers to part 4.",
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "SPEAKER") {
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

  //  Marks show

  const correctAnswers = {
    31: "convenient", // They are convenient but can be overlooked by consumers and designers.
    32: "breeches", // Men started to wear breeches in the 18th century.
    33: "tailor", // A tailor sewed pockets into the lining of the garments.
    34: "profession", // Bigger pockets might be made for men who belonged to a certain type of profession.
    35: "visible", // Women's pockets were less visible than men's.
    36: "string", // Pockets were produced in pairs using string to link them together.
    37: "waist", // Pockets hung from the women's waist under skirts and petticoats.
    38: "perfume", // Items such as perfume could be reached through a gap in the material.
    39: "image", // Hidden pockets had a negative effect on the image of women.
    40: "handbag", // Bags called 'pouches' became popular before women carried a handbag.
  };

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
    localStorage.setItem("/2021/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2021/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/listening");
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
            <h1 className="text-xl font-bold">{renderText("    PART 4")}</h1>
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
                {renderText("Pockets")}
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
            {renderText("Questions 31–40")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 max-w-3xl mx-auto rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Pockets")}
            </h1>

            {/* Q31 */}
            <p className="text-lg">
              {renderText("Reason for choice of subject: They are")}
              <button
                onClick={() => toggleButton(31)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[31]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                31
              </button>
              <input
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" but can be overlooked by consumers and designers.")}
            </p>

            {/* Q32 */}
            <p className="text-lg">
              {renderText("Men started to wear")}
              <button
                onClick={() => toggleButton(32)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[32]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                32
              </button>
              <input
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" in the 18th century.")}
            </p>

            {/* Q33 */}
            <p className="text-lg">
              <button
                onClick={() => toggleButton(33)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[33]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                33
              </button>
              <input
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                " sewed pockets into the lining of the garments. The wearer could use the pockets for small items."
              )}
            </p>

            {/* Q34 */}
            <p className="text-lg">
              {renderText(
                "Bigger pockets might be made for men who belonged to a certain type of"
              )}
              <button
                onClick={() => toggleButton(34)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[34]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                34
              </button>
              <input
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(".")}
            </p>

            {/* Q35 */}
            <p className="text-lg">
              {renderText("Women's pockets were less")}
              <button
                onClick={() => toggleButton(35)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[35]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                35
              </button>
              <input
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" than men's.")}
            </p>

            {/* Q36 */}
            <p className="text-lg">
              {renderText("Pockets were produced in pairs using")}
              <button
                onClick={() => toggleButton(36)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[36]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                36
              </button>
              <input
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" to link them together.")}
            </p>

            {/* Q37 */}
            <p className="text-lg">
              {renderText("Pockets hung from the women's")}
              <button
                onClick={() => toggleButton(37)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[37]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                37
              </button>
              <input
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" under skirts and petticoats.")}
            </p>

            {/* Q38 */}
            <p className="text-lg">
              {renderText("Items such as")}
              <button
                onClick={() => toggleButton(38)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[38]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                38
              </button>
              <input
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" could be reached through a gap in the material.")}
            </p>

            {/* Q39 */}
            <p className="text-lg">
              {renderText("Hidden pockets had a negative effect on the")}
              <button
                onClick={() => toggleButton(39)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[39]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                39
              </button>
              <input
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" of women.")}
            </p>

            {/* Q40 */}
            <p className="text-lg">
              {renderText(
                "Bags called 'pouches' became popular before women carried a"
              )}
              <button
                onClick={() => toggleButton(40)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[40]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                40
              </button>
              <input
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(".")}
            </p>
          </div>

          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
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
                    All Answers (31–40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 31).map((num) => {
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
                              </span>
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
      <Listening2Pagination2023></Listening2Pagination2023>
    </div>
  );
};

export default Listening2Part42023;
