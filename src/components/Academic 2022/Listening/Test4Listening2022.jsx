import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2022 from "../Pagination2022/Listening4Pagination2022";
const Test4Listening2022 = () => {
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
      speaker: "JACINTA",
      text: [
        "We also offer additional services that you might want a bit less often, say every month.",
        "So for example, if the inside of your windows need cleaning, we could do that.",
      ],
    },
    {
      speaker: "CLIENT",
      text: [
        "Yes, that’d be good. I’m on the 15th floor, so the outside gets done regularly by specialists, but the inside does get a bit grubby.",
        {
          text: "So for example, if the inside of your windows need cleaning, we could do that",
          number: 4,
        },
      ],
    },
    {
      speaker: "JACINTA",
      text: [
        "And we could arrange for your curtains to get cleaned if necessary.",
      ],
    },
    {
      speaker: "CLIENT",
      text: [
        "No, they’re OK.",
        "But would you be able to do something about the balcony?",
        "It’s quite small, and I don’t use it much, but it could do with a wash every month or so.",
        {
          text: "It's quite small, and I don't use it much, but it could do with a wash every month or so",
          number: 5,
        },
      ],
    },
    {
      speaker: "JACINTA",
      text: ["Yes, we can get the pressure washer onto that."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "JACINTA",
      text: [
        "Now, if you’re interested, we do offer some other possibilities to do with general maintenance.",
        "For example, if you have a problem with water, and you need a plumber in a hurry,",
        "we can put you in touch with a reliable one who can come out straightaway.",
        {
          text: "we can put you in touch with a reliable one who can come out straightaway. And the same thing if you need an electrician",
          number: 6,
        },
        "And the same thing if you need an electrician.",
      ],
    },
    {
      speaker: "CLIENT",
      text: [
        "Right, that’s good to know. I’ve only just moved here, so I don’t have any of those sorts of contacts.",
      ],
    },
    {
      speaker: "JACINTA",
      text: [
        "And I don’t know if this is of interest to you, but we also offer a special vacuum cleaning system,",
        "which can improve the indoor air quality of your home by capturing up to 99% of all the dust in the air.",
        {
          text: "air quality And I don't know if this is of interest to you, but we also offer a special vacuum cleaning system, which can improve the indoor air quality of your home by capturing up to 99% of all the dust in the air",
          number: 7,
        },
        "So, if you’re troubled by allergies, this can make a big difference.",
      ],
    },
    {
      speaker: "CLIENT",
      text: [
        "Right. In fact, I don’t have that sort of problem, but I’ll bear it in mind.",
        "Now, can you tell me a bit about your cleaning staff?",
      ],
    },
    {
      speaker: "JACINTA",
      text: [
        "Of course, so all our cleaners are very carefully selected.",
        "When they apply to us, they have to undergo a security check with the police",
        "to make sure they don’t have any sort of criminal background.",
        {
          text: "security check When they apply to us, they have to undergo a security check with the police to make sure they don't have any sort of criminal background",
          number: 8,
        },
      ],
    },
    {
      speaker: "CLIENT",
      text: ["Right."],
    },
    {
      speaker: "JACINTA",
      text: [
        "And of course they have to provide references as well.",
        "Then if we think they might be suitable for the job, we give them training for it.",
        { text: "training", number: 9 },
        "That lasts for two weeks, so it’s very thorough. And at the end of it, they have a test.",
        "If they pass that, we take them on, but we monitor them very carefully.",
        "We ask all our clients to complete a review of their performance after every visit.",
        {
          text: "We ask all our clients to complete a review of their performance after every visit.",
          number: 10,
        },
        "And to email it to us, so we can pick up any problems straightaway and deal with them.",
      ],
    },
    {
      speaker: "CLIENT",
      text: [
        "OK, well, that all sounds good. And will I always have the same cleaner?",
      ],
    },
    {
      speaker: "JACINTA",
      text: [
        "Yes. We do our best to organize it that way, and we usually manage it.",
      ],
    },
    {
      speaker: "CLIENT",
      text: ["Good, that’s fine. Right, so I’d like to go ahead and..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1. You now have half a minute to check your answers to part 1.",
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
     if (speaker === "JACINTA") {
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
    1: "floor", // Cleaning the floor throughout the apartment
    2: "fridge", // Cleaning the fridge (every week)
    3: "shirts", // Ironing clothes - shirts only
    4: "windows", // Cleaning all the windows from the inside
    5: "balcony", // Washing down the balcony
    6: "electrician", // They can organise a plumber or an electrician if necessary
    7: "allergens", // A special cleaning service is available for customers who are allergic to allergens
    8: "police", // Background check carried out by the police
    9: "training", // All cleaners are given training for two weeks
    10: "review", // Customers send a review after each visit
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
                {renderText("Advice on Surfing Holidays")}
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
            {renderText("Questions 1–10")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 rounded-lg space-y-4 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Advice on Surfing Holidays")}
            </h1>

            <h2 className="font-semibold text-lg mt-4">
              {renderText("Basic cleaning package offered")}
            </h2>

            <p className="text-lg">{renderText("Cleaning all surfaces")}</p>

            <p className="text-lg">
              {renderText("Cleaning the")}
              <button
                onClick={() => toggleButton(1)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                1
              </button>
              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("throughout the apartment")}
            </p>

            <p className="text-lg">
              {renderText("Cleaning shower, sinks, toilet etc.")}
            </p>

            <h2 className="font-semibold text-lg mt-4">
              {renderText("Additional services agreed")}
            </h2>

            <p className="text-lg font-semibold">{renderText("Every week")}</p>

            <p className="text-lg">
              {renderText("Cleaning the")}
              <button
                onClick={() => toggleButton(2)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                2
              </button>
              <input
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            <p className="text-lg">
              {renderText("Ironing clothes –")}
              <button
                onClick={() => toggleButton(3)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                3
              </button>
              <input
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("only")}
            </p>

            <p className="text-lg font-semibold">{renderText("Every month")}</p>

            <p className="text-lg">
              {renderText("Cleaning all the")}
              <button
                onClick={() => toggleButton(4)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                4
              </button>
              <input
                value={userAnswers[4] || ""}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("from the inside")}
            </p>

            <p className="text-lg">
              {renderText("Washing down the")}
              <button
                onClick={() => toggleButton(5)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                5
              </button>
              <input
                value={userAnswers[5] || ""}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            <h2 className="font-semibold text-lg mt-4">
              {renderText("Other possibilities")}
            </h2>

            <p className="text-lg">
              {renderText("They can organise a plumber or an")}
              <button
                onClick={() => toggleButton(6)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                6
              </button>
              <input
                value={userAnswers[6] || ""}
                onChange={(e) => handleInputChange(6, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("if necessary.")}
            </p>

            <p className="text-lg">
              {renderText(
                "A special cleaning service is available for customers who are allergic to"
              )}
              <button
                onClick={() => toggleButton(7)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                7
              </button>
              <input
                value={userAnswers[7] || ""}
                onChange={(e) => handleInputChange(7, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            <h2 className="font-semibold text-lg mt-4">
              {renderText("Information on the cleaners")}
            </h2>

            <p className="text-lg">
              {renderText(
                "Before being hired, all cleaners have a background check carried out by the"
              )}
              <button
                onClick={() => toggleButton(8)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                8
              </button>
              <input
                value={userAnswers[8] || ""}
                onChange={(e) => handleInputChange(8, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            <p className="text-lg">{renderText("References are required.")}</p>

            <p className="text-lg">
              {renderText("All cleaners are given")}
              <button
                onClick={() => toggleButton(9)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                9
              </button>
              <input
                value={userAnswers[9] || ""}
                onChange={(e) => handleInputChange(9, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("for two weeks.")}
            </p>

            <p className="text-lg">
              {renderText("Customers send a")}
              <button
                onClick={() => toggleButton(10)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                10
              </button>
              <input
                value={userAnswers[10] || ""}
                onChange={(e) => handleInputChange(10, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("after each visit.")}
            </p>

            <p className="text-lg">
              {renderText("Usually, each customer has one regular cleaner.")}
            </p>
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
                    All Answers (1–10)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = userAnswers[num]?.trim() || "";
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
      <Listening4Pagination2022></Listening4Pagination2022>
    </div>
  );
};

export default Test4Listening2022;
