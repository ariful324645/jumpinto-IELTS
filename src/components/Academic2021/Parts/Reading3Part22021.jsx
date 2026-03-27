import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2021 from "../Pagination 2021/Reading3Pagination2021";

const Reading3Part22021 = () => {
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
    // Questions 14–19: Section Matching (A–H)
    14: "C", // an explanation for weapons being left behind in the mountains → Paragraph C
    15: "C",
    16: "F",
    17: "H",
    18: "G",
    // Questions 20–22: Gap-fill (ONE WORD ONLY)
    20: "microorganisms", // Organic materials decay due to microorganisms
    21: "reindeer", // reindeer gathered there in summer
    22: "insects", // to avoid being attacked by insects on lower ground

    "23-24": ["B", "C"], // same as above (boxes 23-24 are two-letter select)

    "25-26": ["A", "C"], // Norwegian towns attracted traders, Vikings interested in trade with Middle East
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "23-24" || id === "25-26") {
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
    localStorage.removeItem("/reading3Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading3Part22021");
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
              {renderText(
                "Climate change reveals ancient artefacts in Norway's glaciers"
              )}
            </h1>

            <p className="text-lg">
              {renderText(
                "Well above the treeline in Norway's highest mountains, ancient fields of ice are shrinking as Earth's climate warms. As the ice has vanished, it has been giving up the treasures it has preserved in cold storage for the last 6,000 years – items such as ancient arrows and skis from Viking Age* traders. And those artefacts have provided archaeologists with some surprising insights into how ancient Norwegians made their livings."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Organic materials like textiles and hides are relatively rare finds at archaeological sites. This is because unless they're protected from the microorganisms that cause decay, they tend not to last long."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Extreme cold is one reliable way to keep artefacts relatively fresh for a few thousand years, but once thawed out, these materials experience degradation relatively swiftly."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>
              {renderText(
                " With climate change shrinking ice cover around the world, glacial archaeologists need to race the clock to find newly revealed artefacts, preserve them, and study them. If something fragile dries and is windblown it might very soon be lost to science, or an arrow might be exposed and then covered again by the next snow and remain well-preserved. The unpredictability means that glacial archaeologists have to be systematic in their approach to fieldwork."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Over a nine-year period, a team of archaeologists, which included Lars Pile of Oppland County Council, Norway, and James Barrett of the McDonald Institute for Archaeological Research, surveyed patches of ice in Oppland, an area of south-central Norway that is home to some of the country's highest mountains."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Reindeer once congregated on these icy patches in the later summer months to escape biting insects, and from the late Stone Age*, hunters followed."
                )}
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      21
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      22
                    </span>
                  </>
                )}
              </span>
              {renderText(
                " In addition, trade routes threaded through the mountain passes of Oppland, linking settlements in Norway to the rest of Europe."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"Fieldwork is hard work - hiking with all our equipment, often camping on permafrost - but very rewarding.'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "You're rescuing the archaeology, bringing the melting ice to wider attention, discovering a unique environmental history and really connecting with the natural environment," +
                    " says Barrett."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "At the edges of the contracting ice patches, archaeologists found more than 2,000 artefacts, which formed a material record that ran from 4,000 BCE to the beginnings of the Renaissance in the 14th century. Many of the artefacts are associated with hunting."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Hunters would have easily misplaced arrows and they often discarded broken bows rather than take them all the way home."
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
                "Barrett's team radiocarbon-dated 153 of the artefacts and compared those dates to the timing of major environmental changes in the region - such as periods of cooling or warming - and major social and economic shifts - such as the growth of farming settlements and the spread of international trade networks leading up to the Viking Age."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They found that some periods had produced lots of artefacts, which indicates that people had been pretty active in the mountains during those times. But there were few or no signs of activity during other periods."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    24
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "What was surprising, according to Barrett, was the timing of these periods. Oppland's mountains present daunting terrain and in periods of extreme cold, glaciers could block the higher mountain passes and make travel in the upper reaches of the mountains extremely difficult."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Remarkably, though, the finds from the ice may have continued through this period, perhaps suggesting that the importance of mountain hunting increased to supplement failing agricultural harvests in times of low temperatures."
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
                "Many of the artefacts Barrett's team recovered date from the beginning of the Viking Age, the 700s through to the 900s CE. Trade networks connecting Scandinavia with Europe and the Middle East were expanding around this time."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Although we usually think of ships when we think of Scandinavian expansion, these recent discoveries show that plenty of goods travelled on overland routes, like the mountain passes of Oppland."
                )}
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      26
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      18
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      25
                    </span>
                  </>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Norway's mountains are probably still hiding a lot of history - and prehistory - in remote ice patches. When Barrett's team looked at the dates for their sample of 153 artefacts, they noticed a gap with almost no artefacts from about 3,800 to 2,200 BCE."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In fact, archaeological finds from that period are rare all over Norway. The researchers say that could be because many of those artefacts have already disintegrated or are still frozen in the ice. That means archaeologists could be extracting some of those artefacts from retreating ice in years to come."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    17
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
          {/* ---------- Questions 14–19: Section Matching ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14–19")}
            </h2>
            <p className="mb-4">
              {renderText("Reading Passage 2 has eight sections, A–H.")}
            </p>
            <p className="mb-4">
              {renderText("Which section contains the following information?")}
            </p>
            <p className="mb-4">
              {renderText(
                "Choose the correct letter, A–H, in boxes 14–19 on your answer sheet."
              )}
            </p>

            {/* Paragraph boxes */}
            {[
              {
                qNum: 14,
                text: "an explanation for weapons being left behind in the mountains",
              },
              {
                qNum: 15,
                text: "a reference to the physical difficulties involved in an archaeological expedition",
              },
              {
                qNum: 16,
                text: "an explanation of why less food may have been available",
              },
              {
                qNum: 17,
                text: "a reference to the possibility of future archaeological discoveries",
              },
              {
                qNum: 18,
                text: "examples of items that would have been traded",
              },
              {
                qNum: 19,
                text: "a reference to the pressure archaeologists are under to work quickly",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="flex items-center gap-2 mb-4">
                <span className="font-semibold">{qNum}.</span>
                <span className="">{renderText(text)}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* ---------- Questions 20–22: Gap Fill ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 20–22")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Complete the summary below.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer."
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Write your answers in boxes 20–22 on your answer sheet."
              )}
            </p>

            <div className="border p-5">
              <p className="mb-4 font-bold text-center">
                {renderText("Interesting finds at an archaeological site")}
              </p>
              <div className="space-y-4">
                {[
                  {
                    qNum: 20,
                    textBefore:
                      "Organic materials such as animal skins and textiles are not discovered very often at archaeological sites. They have little protection against ",
                    textAfter:
                      ", which means that they decay relatively quickly.",
                  },
                  {
                    qNum: 21,
                    textBefore:
                      "A team of archaeologists have been working in the mountains in Oppland in Norway to recover artefacts revealed by shrinking ice cover. In the past, there were trade routes through these mountains and ",
                    textAfter:
                      " gathered there in the summer months to avoid being attacked by ",
                  },
                  {
                    qNum: 22,
                    textBefore: "",
                    textAfter:
                      " on lower ground. The people who used these mountains left things behind and it is those objects that are of interest to archaeologists.",
                  },
                ].map(({ qNum, textBefore, textAfter }) => (
                  <div key={qNum} className="flex items-center gap-3">
                    <span>{renderText(textBefore)}</span>

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

          {/* ---------- Questions 23–24: Multiple Choice ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23–24")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose TWO letters, A–E. Which TWO of the following statements does the writer make about the discoveries of Barrett's team?"
              )}
            </p>

            {[
              "Artefacts found in the higher mountain passes were limited to skiing equipment.",
              "Hunters went into the mountains even during periods of extreme cold.",
              "The number of artefacts from certain time periods was relatively low.",
              "Radiocarbon dating of artefacts produced some unreliable results.",
              "More artefacts were found in Oppland than at any other mountain site.",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A–E

              const selectedOptions = userAnswers["23-24"] || [];
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
                    onChange={() => handleInputChange("23-24", value)}
                  />

                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(optionText)}</span>
                </label>
              );
            })}
          </div>

          {/* ---------- Questions 25–26: Multiple Choice ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 25–26")}
            </h2>

            <p className="mb-4 font-semibold">
              {renderText(
                "Choose TWO letters, A–E. Which TWO of the following statements does the writer make about the Viking Age?"
              )}
            </p>

            {[
              "Hunters at this time benefited from an increased demand for goods.",
              "The beginning of the period saw the greatest growth in the wealth of Vikings.",
              "Vikings did not rely on ships alone to transport goods.",
              "Norwegian towns at this time attracted traders from around the world.",
              "Vikings were primarily interested in their trading links with the Middle East.",
            ].map((optionText, index) => {
              const value = String.fromCharCode(65 + index); // A–E

              const selectedOptions = userAnswers["25-26"] || [];
              const isChecked = selectedOptions.includes(value);

              // Disable other options once TWO are selected
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 mb-1 relative cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
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

                  {isDisabled && (
                    <ImCross className="text-red-500 absolute right-0 top-1/2 -translate-y-1/2" />
                  )}
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
                    {[14, 15, 16, 17, 18, 19, 20, 21, 22, "23-24", "25-26"].map(
                      (num) => {
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
                      }
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Reading3Pagination2021></Reading3Pagination2021>
    </div>
  );
};

export default Reading3Part22021;
