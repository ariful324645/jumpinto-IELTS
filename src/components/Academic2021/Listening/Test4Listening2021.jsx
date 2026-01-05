import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2021 from "../Pagination 2021/Listening4Pagination2021";

const Test4Listening2021 = () => {
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
        "Part 1. You will hear a man phoning the owner of a holiday cottage.",
        "First, you have some time to look at questions 1 to 6.",
        "Now listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: ["Hello?"],
    },
    {
      speaker: "TOM",
      text: [
        "Oh hello.",
        "I was hoping to speak to Jack Fitzgerald about renting a cottage.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "I'm his wife Shirley, and we own the cottages together, so I'm sure I can help you.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Great, my name's Tom.",
        "Some friends of ours rented Granary Cottage from you last year, and they thought it was great.",
        "So my wife and I are hoping to come in May for a week.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: ["What date did you have in mind?"],
    },
    {
      speaker: "TOM",
      text: ["The week beginning the 14th, if possible."],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "I'll just check.",
        "I'm sorry, Tom.",
        "It's already booked that week.",
        {
          text: "It's free the week beginning the 28th though, for seven nights.",
          number: 1,
        },
        "In fact, that's the only time you could have it in May.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Oh, well, we could manage that, I think.",
        "We'd just need to change a couple of things.",
        "How much would it cost?",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        {
          text: "That's the beginning of high season, so it'd be £550 for the week.",
          number: 2,
        },
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Ah, that's a bit more than we wanted to pay, I'm afraid.",
        "We've budgeted up to £500 for accommodation.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "Well, we've just finished converting another building into a cottage,",
        {
          text: "which we're calling Chervil Cottage.",
          number: 3,
        },
      ],
    },
    {
      speaker: "TOM",
      text: ["Sorry? what was that again?"],
    },
    {
      speaker: "SHIRLEY",
      text: ["Chervil.", "C H E R, V for Victor, I L."],
    },
    {
      speaker: "TOM",
      text: ["Oh, that's a herb, isn't it?"],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "That's right.",
        "It grows fairly wild around here.",
        "You could have that for the week you want for £480.",
      ],
    },
    {
      speaker: "TOM",
      text: ["OK, so could you tell me something about it, please?"],
    },
    {
      speaker: "SHIRLEY",
      text: [
        {
          text: "Of course. The building was built as a garage.",
          number: 4,
        },
        "It's a little smaller than Granary Cottage.",
      ],
    },
    {
      speaker: "TOM",
      text: ["So that must sleep two people as well."],
    },
    {
      speaker: "SHIRLEY",
      text: ["That's right. There's a double bedroom."],
    },
    {
      speaker: "TOM",
      text: ["Does it have a garden?"],
    },
    {
      speaker: "SHIRLEY",
      text: [
        {
          text: "Yes, you get to it from the living room through French doors.",
          number: 5,
        },
        "And we provide two deck chairs.",
        "We hope to build a patio in the near future, but I wouldn't like to guarantee it'll be finished by May.",
      ],
    },
    {
      speaker: "TOM",
      text: ["OK."],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "The front door opens onto the old farmyard, and parking isn't a problem.",
        {
          text: "There's plenty of room at the front for that.",
          number: 6,
        },
        "There are some trees and potted plants there.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "What about facilities in the cottage?",
        "It has standard things like a cooker and fridge, I presume.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "In the kitchen area, there's a fridge freezer.",
        "And we've just put in an electric cooker.",
      ],
    },
    {
      speaker: "TOM",
      text: ["Is there a washing machine?"],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "Yes, there's also a TV in the living room which plays DVDs too.",
        "The bathroom is too small for a bath, so there's a shower instead.",
        "I think a lot of people prefer that nowadays anyway.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "It's more environmentally friendly, isn't it?",
        "Unless you spend half the day in it.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: ["Exactly."],
    },
    {
      speaker: "TOM",
      text: [
        "What about heating? It sometimes gets quite cool at that time of year.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "There's central heating, and if you want to light a fire, there's a stove.",
        {
          text: "We can provide all the wood you need for it.",
          number: 7,
        },
        "It smells so much nicer than coal, and it makes the room very cozy.",
        "We've got one in our own house.",
      ],
    },
    {
      speaker: "TOM",
      text: [
        "That sounds very pleasant.",
        "Perhaps we should come in the winter to make the most of it.",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "Yes, we find we don't want to go out when we've got the fire burning.",
        "There's a famous stone bridge, it's one of the oldest in the region,",
        {
          text: "and you can see it from the living room.",
          number: 8,
        },
        "It isn't far away.",
        "The bedroom window looks in the opposite direction,",
        {
          text: "and has a lovely view of the hills, and the Monument at the top.",
          number: 9,
        },
      ],
    },
    {
      speaker: "TOM",
      text: [
        "Well, uh, that all sounds perfect.",
        "I'd like to book it, please.",
        "Would you want a deposit?",
      ],
    },
    {
      speaker: "SHIRLEY",
      text: [
        "Yes, we ask for 30% to secure your booking.",
        "So that'll be, um, £144.",
      ],
    },
    {
      speaker: "TOM",
      text: ["And when would you like the rest of the money?"],
    },
    {
      speaker: "SHIRLEY",
      text: [
        {
          text: "You're coming in May, so the last day of March, please.",
          number: 10,
        },
      ],
    },
    {
      speaker: "TOM",
      text: ["Fine."],
    },
    {
      speaker: "SHIRLEY",
      text: ["Excellent. Could I just take your details so that I can..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1.",
        "You now have half a minute to check your answers to part 1.",
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
    1: "1",
    2: "650",
    3: "480",
    4: "barn",
    5: "garden",
    6: "parking",
    7: "wood",
    8: "fields",
    9: "church",
    10: "April",
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
                {renderText("Renting a Cottage: Details and Arrangements")}
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
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Holiday rental")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Owners' names: Jack Fitzgerald and Shirley Fitzgerald"
              )}
            </p>

            <p className="text-lg font-semibold">
              {renderText("Granary Cottage")}
            </p>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("available for week beginning")}
              <button
                onClick={() => toggleButton(1)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                1
              </button>
              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-24"
              />
              {renderText(" May")}
            </p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("cost for the week: £")}
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

            <p className="text-lg font-semibold">{renderText("Cottage")}</p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("cost for the week: £")}
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
            </p>

            {/* Q4 */}
            <p className="text-lg">
              {renderText("building was originally a")}
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
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("walk through doors from living room into a")}
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

            {/* Q6 */}
            <p className="text-lg">
              {renderText("several")}
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
              {renderText(" spaces at the front")}
            </p>

            <p className="text-lg">{renderText("bathroom has a shower")}</p>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("central heating and stove that burns")}
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

            {/* Q8 */}
            <p className="text-lg">
              {renderText("views of old")}
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
              {renderText(" from living room")}
            </p>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("view of hilltop")}
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
              {renderText(" from the bedroom")}
            </p>

            <h2 className="text-lg font-bold mt-6">{renderText("Payment")}</h2>

            <p className="text-lg">{renderText("deposit: £144")}</p>

            {/* Q10 */}
            <p className="text-lg">
              {renderText("deadline for final payment: end of")}
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
                    All Answers (1–10)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
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
      <Listening4Pagination2021></Listening4Pagination2021>
    </div>
  );
};

export default Test4Listening2021;
