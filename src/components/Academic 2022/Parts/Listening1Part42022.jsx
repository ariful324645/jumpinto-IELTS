import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2022 from "../Pagination2022/Listening1Pagination2022";

const Listening1Part42022 = () => {
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
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 4. You will hear an anthropology student giving a presentation on spiral path designs known as labyrinths.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Labyrinths have existed for well over 4,000 years.",
        "Labyrinths and labyrinthine symbols have been found in regions as diverse as modern-day Turkey, Ireland, Greece, and India.",
        "There are various designs of labyrinth, but what they all have in common is a winding spiral path, which leads to a central area.",
        "There is one starting point at the entrance, and the goal is to reach the central area.",
        "Finding your way through a labyrinth involves many twists and turns, but it's not possible to get lost, as there is only one single path.",
        "In modern times, the word labyrinth has taken on a different meaning, and is often used as a synonym for a maze.",
        "A maze is quite different, as it is a kind of puzzle with an intricate network of paths.",
        {
          text: "Mazes became fashionable in the 15th and 16th centuries in Europe, and can still be found in the gardens of great houses and palaces.",
          number: 31,
        },
        "The paths are usually surrounded by thick high hedges, so that it's not possible to see over them.",
        "Entering a maze usually involves getting lost a few times before using logic to work out the pattern and find your way to the center, and then out again.",
        {
          text: "There are lots of dead ends and paths which lead you back to where you started.",
          number: 32,
        },
        "The word maze is believed to come from a Scandinavian word for a state of confusion.",
        {
          text: "This is where the word amazing comes from.",
          number: 33,
        },
        "Labyrinths on the other hand have a very different function, although people now often refer to things they find complicated as labyrinths.",
        "This is not how they were seen in the past.",
        "The winding spiral of the labyrinth has been used for centuries as a metaphor for life's journey.",
        "It served as a spiritual reminder that there is purpose and meaning to our lives, and helped to give people a sense of direction.",
        {
          text: "Labyrinths are thought to encourage a feeling of calm, and have been used as a meditation and prayer tool in many cultures over many centuries.",
          number: 34,
        },
        "The earliest examples of the labyrinth spiral pattern have been found carved into stone from Sardinia to Scandinavia, from Arizona to India, to Africa.",
        {
          text: "In Europe, these spiral carvings date from the late Bronze Age.",
          number: 35,
        },
        "The Native American Pima tribe wove baskets with a circular labyrinth design that depicted their own cosmology.",
        {
          text: "In ancient Greece, the labyrinth spiral was used on coins around 4,000 years ago.",
          number: 36,
        },
        "Labyrinths made of mosaics were commonly found in bathhouses, villas, and tombs throughout the Roman Empire.",
        "In Northern Europe, there were actual physical labyrinths designed for walking on.",
        "These were cut into the turf or grass, usually in a circular pattern.",
        "The origin of these walking labyrinths remains unclear, but they were probably used for fertility rites, which may date back thousands of years.",
        "11 examples of turf labyrinths survive today, including the largest one at Saffron Walden in England, which used to have a large tree in the middle of it.",
        {
          text: "More recently, labyrinths have experienced something of a revival.",
          number: 37,
        },
        "Some believe that walking a labyrinth promotes healing and mindfulness, and there are those who believe in its emotional and physical benefits, which include slower breathing and a restored sense of balance and perspective.",
        {
          text: "This idea has become so popular that labyrinths have been laid into the floors of spas, wellness centers, and even prisons in recent years.",
          number: 38,
        },
        "A pamphlet at Colorado Children's Hospital informs patients that 'walking a labyrinth can often calm people in the midst of a crisis'.",
        "And apparently, it's not only patients who benefit.",
        "Many visitors find walking a labyrinth less stressful than sitting in a corridor or waiting room.",
        "Some doctors even walk the labyrinth during their breaks.",
        {
          text: "In some hospitals, patients who can't walk can have a paper finger labyrinth brought to their bed.",
          number: 39,
        },
        "The science behind the theory is a little sketchy, but there are dozens of small-scale studies which support claims about the benefits of labyrinths.",
        {
          text: "For example, one study found that walking a labyrinth provided 'short-term calming, relaxation and relief from anxiety' for Alzheimer's patients.",
          number: 40,
        },
        "So what is it about labyrinths that makes their appeal so universal?",
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
    31: "puzzle", // Mazes are a type of puzzle
    32: "logic", // logic is needed to navigate through a maze
    33: "confusion", // feeling of confusion
    34: "meditation", // used in meditation and prayer
    35: "rocks", // carvings on rocks
    36: "coins", // symbol on coins
    37: "tree", // big tree at its centre
    38: "heart", // heart rate
    39: "wood", // finger labyrinths made from wood
    40: "anxiety",
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
    localStorage.setItem("/listening1Part42022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part42022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part42022");
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
                {renderText("Labyrinths")}
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

          <p className="mb-4 font-semibold">
            {renderText("Complete the notes below.")}
          </p>
          <p className="mb-6 italic">
            {renderText("Write ONE WORD ONLY for each answer.")}
          </p>

          {/* ---------- Notes Container ---------- */}
          <div className="">
            <div className="border p-6 rounded-md space-y-4 text-gray-800">
              <h3 className="font-bold text-lg text-center">
                {renderText("Labyrinths")}
              </h3>

              <p>
                <span className="font-semibold">Definition</span>
                <br />
                {renderText("a winding spiral path leading to a central area")}
              </p>

              <p className="font-semibold mt-4">
                {renderText("Labyrinths compared with mazes")}
              </p>

              {/* Q31 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("Mazes are a type of")}
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
              </p>

              {/* Q32 */}
              <p className="text-lg flex items-center flex-wrap">
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
                  className="border rounded-md px-2 py-1 w-32 mr-2"
                />
                {renderText("is needed to navigate through a maze")}
              </p>

              {/* Q33 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText(
                  "the word 'maze' is derived from a word meaning a feeling of"
                )}
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
              </p>

              {/* Q34 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("they have frequently been used in")}
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
                  className="border rounded-md px-2 py-1 w-32 mx-2"
                />
                {renderText("and prayer")}
              </p>

              <p className="font-semibold mt-4">
                {renderText("Early examples of the labyrinth spiral")}
              </p>

              {/* Q35 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("Ancient carvings on")}
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
                  className="border rounded-md px-2 py-1 w-32 mx-2"
                />
                {renderText("have been found across many cultures")}
              </p>

              <p>
                {renderText(
                  "The Pima, a Native American tribe, wove the symbol on baskets"
                )}
              </p>

              {/* Q36 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("Ancient Greeks used the symbol on")}
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
              </p>

              <p className="font-semibold mt-4">
                {renderText("Walking labyrinths")}
              </p>

              {/* Q37 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText(
                  "The largest surviving example of a turf labyrinth once had a big"
                )}
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
                  className="border rounded-md px-2 py-1 w-32 mx-2"
                />
                {renderText("at its centre")}
              </p>

              <p className="font-semibold mt-4">
                {renderText("Labyrinths nowadays")}
              </p>

              {/* Q38 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText(
                  "Believed to have a beneficial impact on mental and physical health, e.g., walking a maze can reduce a person's"
                )}
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
                  className="border rounded-md px-2 py-1 w-32 mx-2"
                />
                {renderText("rate")}
              </p>

              {/* Q39 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText(
                  "patients who can't walk can use 'finger labyrinths' made from"
                )}
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
              </p>

              {/* Q40 */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText(
                  "research has shown that Alzheimer's sufferers experience less"
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
              </p>
            </div>
          </div>
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
                    All Answers (31–40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 31).map((num) => {
                      const userAnswer = userAnswers[num]?.trim();
                      const correctAnswer = correctAnswers[num]?.trim();
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
      <Listening1Pagination2022></Listening1Pagination2022>
    </div>
  );
};

export default Listening1Part42022;
