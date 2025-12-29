import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";

const Listening1Part42015 = () => {
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
        "Section 4. You will hear a university lecture about an endangered bear in British Columbia, Canada, known as the spirit bear.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Today we continue our series on ecology and conservation with a look at a particularly endangered member of the black bear family.",
        {
          text: "One in ten black bears is actually born with a white coat, which is the result of a special gene that surfaces in a few.",
          number: 31,
        },
        {
          text: "Local people have named it the spirit bear, and according to the legends of these communities, its snowy fur brings with it a special power.",
          number: 32,
        },
        {
          text: "Because of this, it has always been highly regarded by them, so much that they do not speak of seeing it to anyone else.",
          number: 33,
        },
        "It is their way of protecting it when strangers visit the area.",
        "The white bear's habitat is quite interesting.",
        "The bear's strong relationship with the old growth rainforest is a complex one.",
        "The white bear relies on the huge centuries-old trees in the forest in many ways.",
        {
          text: "For example, the old growth trees have extremely long roots that help prevent erosion of the soil along the banks of the many fish streams.",
          number: 34,
        },
        "Keeping these banks intact is important, because these streams are home to salmon, which are the bear's main food source.",
        "In return, the bears' feeding habits nurture the forest.",
        "As the bears eat the salmon, they discard the skin and bones in great amounts on the forest floor, which provide vital nutrients.",
        "These produce lush vegetation that sustains thousands of other types of life forms, from birds to insects and more.",
        {
          text: "Today, the spirit bear lives off the coast of the province of British Columbia on a few islands.",
          number: 35,
        },
        "There is great concern for their survival, since it is estimated that less than 200 of these white bears remain.",
        "The best way to protect them is to make every effort to preserve the delicate balance of their forest environment, in other words, their ecosystem.",
        "The greatest threat to the bear's existence is the loss of its habitat.",
        "Over many years, logging companies have stripped the land by cutting down a large number of trees.",
        {
          text: "In addition, they have built roads which have fractured the areas where the bear usually feeds, and many hibernation sites have also been lost.",
          number: 36,
        },
        {
          text: "The logging of the trees along the streams has damaged the places where the bears fish.",
          number: 37,
        },
        "To make matters worse, the number of salmon in those streams is declining, because there is no legal limit on fishing at the moment.",
        {
          text: "All these influences have a negative impact on the spirit bear's very existence, which is made all the more fragile by the fact that reproduction among these bears has always been disappointingly low.",
          number: 38,
        },
        "And so, what's the situation going forward?",
        "Community organizations, environmental groups, and the British Columbia government are now working together on the problem.",
        {
          text: "The government is now requiring logging companies to adopt a better logging method, which is a positive step.",
          number: 39,
        },
        "However, these measures alone may not be sufficient to ensure a healthy population of the spirit bear in the future.",
        {
          text: "While it is important to maintain the spirit bear's habitat, there also needs to be more emphasis on its expansion.",
          number: 40,
        },
        "The move is justified, as it will also create space for other bears that are losing their homes.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 4.",
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
    // Questions 31–40 (Notes completion – The Spirit Bear)
    31: "gene", // uncommon gene
    32: "powers", // unusual powers
    33: "hunting", // protected from hunting
    34: "erosion", // tree roots stop erosion
    35: "islands", // found on a small number of islands
    36: "roads", // construction of roads
    37: "fishing", // unrestricted fishing
    38: "reproduction", // low rate of reproduction
    39: "methods", // improve methods of logging
    40: "expansion", // maintenance and expansion of territory
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
    localStorage.setItem("/listening1Part42015", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part42015");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part42015");
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
                {renderText("The Spirit Bear")}
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
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 31–40")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the notes below.")} <br />
            {renderText("Write ONE WORD ONLY for each answer.")}
          </p>

          <div className="border p-5 rounded-lg bg-white space-y-6">
            <h3 className="font-bold text-lg">
              {renderText("THE SPIRIT BEAR")}
            </h3>

            {/* ---------- General facts ---------- */}
            <h4 className="font-semibold">{renderText("General facts")}</h4>

            {/* Q31 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Its colour comes from an uncommon")}
              <button className="w-7 h-7 rounded-full border">31</button>
              <input
                type="text"
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* Q32 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Local people believe that it has unusual")}
              <button className="w-7 h-7 rounded-full border">32</button>
              <input
                type="text"
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* Q33 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("They protect the bear from")}
              <button className="w-7 h-7 rounded-full border">33</button>
              <input
                type="text"
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* ---------- Habitat ---------- */}
            <h4 className="font-semibold mt-4">{renderText("Habitat")}</h4>

            {/* Q34 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Tree roots stop")}
              <button className="w-7 h-7 rounded-full border">34</button>
              <input
                type="text"
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("along salmon streams.")}
            </p>

            {/* Q35 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("It is currently found on a small number of")}
              <button className="w-7 h-7 rounded-full border">35</button>
              <input
                type="text"
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* ---------- Threats ---------- */}
            <h4 className="font-semibold mt-4">{renderText("Threats")}</h4>

            {/* Q36 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText(
                "Habitat is being lost due to deforestation and construction of"
              )}
              <button className="w-7 h-7 rounded-full border">36</button>
              <input
                type="text"
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("by logging companies.")}
            </p>

            {/* Q37 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Unrestricted")}
              <button className="w-7 h-7 rounded-full border">37</button>
              <input
                type="text"
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("is affecting the salmon supply.")}
            </p>

            {/* Q38 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText(
                "The bears' existence is also threatened by their low rate of"
              )}
              <button className="w-7 h-7 rounded-full border">38</button>
              <input
                type="text"
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            </p>

            {/* ---------- Going forward ---------- */}
            <h4 className="font-semibold mt-4">
              {renderText("Going forward")}
            </h4>

            {/* Q39 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Logging companies must improve their")}
              <button className="w-7 h-7 rounded-full border">39</button>
              <input
                type="text"
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("of logging.")}
            </p>

            {/* Q40 */}
            <p className="flex flex-wrap items-center gap-2">
              {renderText("Maintenance and")}
              <button className="w-7 h-7 rounded-full border">40</button>
              <input
                type="text"
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
              {renderText("of the spirit bears' territory is needed.")}
            </p>
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
      <Listening1Pagination2015></Listening1Pagination2015>
    </div>
  );
};

export default Listening1Part42015;
