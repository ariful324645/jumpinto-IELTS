import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Reading1Pagination2021 from "../Pagination 2021/Reading1Pagination2021";
import { IoBookSharp } from "react-icons/io5";

const Reading1Part22021 = () => {
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
  const questions = [
    // Questions 11–12
    {
      qNum: 11,
      text: "According to Megan, what are the TWO main advantages of working in the agriculture and horticulture sectors?",
      options: ["A", "B", "C", "D", "E"],
    },
    // Questions 13–14
    {
      qNum: 13,
      text: "Which TWO of the following are likely to be disadvantages for people working outdoors?",
      options: ["A", "B", "C", "D", "E"],
    },
    // Questions 15–20
    {
      qNum: 15,
      text: "Fresh food commercial manager",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 16,
      text: "Agronomist",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 17,
      text: "Fresh produce buyer",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 18,
      text: "Garden centre sales manager",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 19,
      text: "Tree technician",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 20,
      text: "Farm worker",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
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
  // Marks show
  const correctAnswers = {
    // Questions 14–20: Paragraph Headings
    14: "i", // Paragraph A → The areas and artefacts within the pyramid itself
    15: "v", // Paragraph B → An overview of the external buildings and areas
    16: "vi", // Paragraph C → A pyramid design that others copied
    17: "ii", // Paragraph D → A difficult task for those involved
    18: "viii", // Paragraph E → An incredible experience despite the few remains
    19: "iv", // Paragraph F → A single certainty among other less definite facts
    20: "ix", // Paragraph G → The answers to some unexpected questions

    // Questions 21–24: Gap-fill (ONE WORD ONLY)
    21: "city", // "as big as an Egyptian city"
    22: "workers", // "accommodation that was occupied by workers"
    23: "ditch", // "a long ditch encircled the wall"
    24: "location", // "unless they knew the location of the real entrance"

    // Questions 25–26: Multiple-choice (TWO letters)
    // 25: ["A", "B"], // King Djoser points
    "25-26": ["D", "E"], // Second correct point (depending on your test logic)
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "25-26") {
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
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22021");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
            <div className="flex gap-3">
              <IoBookSharp className="text-green-900" size={28} />
              <input
                type="checkbox"
                checked={highlight}
                onChange={() => setHighlight(!highlight)}
                className="toggle toggle-accent"
              />
            </div>
          </div>

          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 14-26")}
              </span>
              {renderText(" which are based on Reading Passage 2 below.")}
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("The Step Pyramid of Djoser")}
            </h1>

            <p className="text-lg">
              {renderText(
                "The pyramids are the most famous monuments of ancient Egypt and still hold enormous interest for people in the present day. These grand, impressive tributes to the memory of the Egyptian kings have become linked with the country even though other cultures, such as the Chinese and Mayan, also built pyramids. The evolution of the pyramid form has been written and argued about for centuries."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However, there is no question that, as far as Egypt is concerned, it began with one monument to one king designed by one brilliant architect: the Step Pyramid of Djoser at Saqqara."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Djoser was the first king of the Third Dynasty of Egypt and the first to build in stone. Prior to Djoser's reign, tombs were rectangular monuments made of dried clay brick, which covered underground passages where the deceased person was buried."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "For reasons which remain unclear, Djoser's main official, whose name was Imhotep, conceived of building a taller, more impressive tomb for his king by stacking stone slabs on top of one another, progressively making them smaller, to form the shape now known as the Step Pyramid."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
              {renderText(
                " Djoser is thought to have reigned for 19 years, but some historians and scholars attribute a much longer time for his rule, owing to the number and size of the monuments he built."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    25
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The Step Pyramid has been thoroughly examined and investigated over the last century, and it is now known that the building process went through many different stages."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'Historian Marc Van de Mieroop comments on this, writing "Much experimentation was involved, which is especially clear in the construction of the pyramid in the center of the complex. It had several plans... before it became the first Step Pyramid in history, piling six levels on top of one another...The weight of the enormous mass was a challenge for the builders, who placed the stones at an inward incline in order to prevent the monument breaking up."'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    16
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "When finally completed, the Step Pyramid rose 62 meters high and was the tallest structure of its time. The complex in which it was built was the size of a city in ancient Egypt and included a temple, courtyards, shrines, and living quarters for the priests."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It covered a region of 16 hectares and was surrounded by a wall 10.5 meters high. The wall had 13 false doors cut into it with only one true entrance cut into the south-east corner; the entire wall was then ringed by a trench 750 meters long and 40 meters wide."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    17
                  </span>
                )}
              </span>
              {renderText(
                " The false doors and the trench were incorporated into the complex to discourage unwanted visitors. If someone wished to enter, he or she would have needed to know in advance how to find the location of the true opening in the wall. Djoser was so proud of his accomplishment that he broke the tradition of having only his own name on the monument and had Imhotep's name carved on it as well."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The burial chamber of the tomb, where the king's body was laid to rest, was dug beneath the base of the pyramid, surrounded by a vast maze of long tunnels that had rooms off them to discourage robbers."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One of the most mysterious discoveries found inside the pyramid was a large number of stone vessels."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    18
                  </span>
                )}
              </span>
              {renderText(
                " Over 40,000 of these vessels, of various forms and shapes, were discovered in storerooms off the pyramid's underground passages. They are inscribed with the names of rulers from the First and Second Dynasties of Egypt and made from different kinds of stone."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "There is no agreement among scholars and archaeologists on why the vessels were placed in the tomb of Djoser or what they were supposed to represent. The archaeologist Jean-Philippe Lauer, who excavated most of the pyramid and complex, believes they were originally stored and then given a 'proper burial' by Djoser in his pyramid to honor his predecessors."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    19
                  </span>
                )}
              </span>
              {renderText(
                " There are other historians, however, who claim the vessels were dumped into the shafts as yet another attempt to prevent grave robbers from getting to the king's burial chamber."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Unfortunately, all of the precautions and intricate design of the underground network did not prevent ancient robbers from finding a way in."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Djoser's grave goods, and even his body, were stolen at some point in the past and all archaeologists found were a small number of his valuables overlooked by the thieves."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>
              {renderText(
                " There was enough left throughout the pyramid and its complex, however, to astonish and amaze the archaeologists who excavated it."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    26
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'Egyptologist Miroslav Verner writes, "Few monuments hold a place in human history as significant as that of the Step Pyramid in Saqqara...It can be said without exaggeration that this pyramid complex constitutes a milestone in the evolution of monumental stone architecture in Egypt and in the world as a whole."'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The Step Pyramid was a revolutionary advance in architecture and became the archetype which all the other great pyramid builders of Egypt would follow."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>
            </p>
          </div>

          {/* highlight modal */}
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 14–20: Headings ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14–20")}
            </h2>
            <p className="mb-4">
              {renderText("Reading Passage 2 has seven paragraphs,A–G.")}
            </p>
            <p className="mb-4 ">
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below."
              )}
            </p>
            <p className="mb-4 ">
              {renderText(
                "Choose the correct number, i-ix, in boxes 14-20 on your answer sheet."
              )}
            </p>

            {/* List of headings */}
            <div className="border border-gray-400 rounded-md p-4 mb-6 max-w-[420px] mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-3">
                {renderText("List of Headings")}
              </h3>
              <ul className="space-y-1 text-gray-700">
                {[
                  "i. The areas and artefacts within the pyramid itself",
                  "ii. A difficult task for those involved",
                  "iii. A king who saved his people",
                  "iv. A single certainty among other less definite facts",
                  "v. An overview of the external buildings and areas",
                  "vi. A pyramid design that others copied",
                  "vii. An idea for changing the design of burial structures",
                  "viii. An incredible experience despite the few remains",
                  "ix. The answers to some unexpected questions",
                ].map((heading, index) => (
                  <li key={index}>{renderText(heading)}</li>
                ))}
              </ul>
            </div>

            {/* Paragraph boxes */}
            {[
              { qNum: 14, para: "Paragraph A" },
              { qNum: 15, para: "Paragraph B" },
              { qNum: 16, para: "Paragraph C" },
              { qNum: 17, para: "Paragraph D" },
              { qNum: 18, para: "Paragraph E" },
              { qNum: 19, para: "Paragraph F" },
              { qNum: 20, para: "Paragraph G" },
            ].map(({ qNum, para }) => (
              <div key={qNum} className="flex items-center gap-2 mb-4">
                <span className="font-semibold">{qNum}.</span>
                <span className="">{renderText(para)}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"].map(
                    (num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    )
                  )}
                </select>
              </div>
            ))}
          </div>

          {/* ---------- Questions 21–24: Gap Fill ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 21–24")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Complete the notes below.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer"
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                " Write your answers in boxes 21–24 on your answer sheet."
              )}
            </p>

            <div className="border p-5">
              <p className="mb-4 font-bold text-center">
                {renderText("The Step Pyramid of Djoser")}
              </p>
              <div className="space-y-4">
                {[
                  {
                    qNum: 21,
                    textBefore:
                      "The complex that includes the Step Pyramid and its surroundings is considered to be as big as an Egyptian ",
                    textAfter: " of the past.",
                  },
                  {
                    qNum: 22,
                    textBefore:
                      "The area outside the pyramid included accommodation that was occupied by ",
                    textAfter:
                      ", along with many other buildings and features.",
                  },
                  {
                    qNum: 23,
                    textBefore:
                      "A wall ran around the outside of the complex and a number of false entrances were built into this. In addition, a long ",
                    textAfter: " encircled the wall.",
                  },
                  {
                    qNum: 24,
                    textBefore:
                      "As a result, any visitors who had not been invited were cleverly prevented from entering the pyramid grounds unless they knew the ",
                    textAfter: " of the real entrance.",
                  },
                ].map(({ qNum, textBefore, textAfter }) => (
                  <div key={qNum} className="flex items-center gap-3">
                    <span>{renderText(textBefore)}</span>

                    {/* Number circle with input */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 font-bold">
                        {qNum}
                      </div>
                      <input
                        type="text"
                        value={userAnswers[qNum] || ""}
                        onChange={(e) =>
                          handleInputChange(qNum, e.target.value)
                        }
                        className="border rounded-md px-2 py-1 w-24"
                      />
                    </div>

                    <span>{renderText(textAfter)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Questions 25–26: Multiple Choice ---------- */}
          <div className="mb-10">
            {/* Instructions */}
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 25–26")}
            </h2>
            <p className="mb-2 font-semibold">
              {renderText("Choose TWO letters, A–E.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Which TWO of the following points does the writer make about King Djoser?"
              )}
            </p>

            {/* Options */}
            {[
              "Initially he had to be persuaded to build in stone rather than clay.",
              "There is disagreement concerning the length of his reign.",
              "He failed to appreciate Imhotep's part in the design of the Step Pyramid.",
              "A few of his possessions were still in his tomb when archaeologists found it.",
              "He criticised the design and construction of other pyramids in Egypt.",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A–E

              const selectedOptions = userAnswers["25-26"] || [];
              const isChecked = selectedOptions.includes(value);

              // Disable others once TWO are selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 mb-1 ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("25-26", value)}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14–26)
                  </h3>
                  <ul className="space-y-3">
                    {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, "25-26"].map(
                      (num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        // Check correctness
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
                      }
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Reading1Pagination2021></Reading1Pagination2021>
    </div>
  );
};

export default Reading1Part22021;
