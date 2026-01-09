import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2023 from "../Pagination 2023/Listening4Pagination2023";

const Listening4Part22022 = () => {
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
        "Part 2. You will hear a guide at a farming museum talking to a group of visitors.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning everyone, and welcome to the Museum of Farming Life.",
        "I understand it's your first visit here, so I'd like to give you some background information about the museum.",
        "And then explain a little about what you can see during your visit.",
        "So, where we're standing at the moment is the entrance to a large building.",
        "That was constructed in 1880, as the home of a local businessman, Alfred Palmer, of the Palmer Biscuit Factory.",
        {
          text: "It was later sold, and became a hall of residence for students in 1911, and a museum in 1951.",
          number: 11,
        },
        "In 2005, a modern extension was built to accommodate the museum's collections.",
        "The museum's owned by the university, and apart from two rooms that are our offices, the university uses the main part of the building.",
        "You may see students going into the building for lessons, but it's not open to museum visitors, I'm afraid.",
        {
          text: "It's a shame, because the interior architectural features are outstanding. Especially the room that used to be the library.",
          number: 12,
        },
        "Luckily, we've managed to keep entry to the museum free.",
        {
          text: "This includes access to all the galleries, outdoor areas, and the rooms for special exhibitions.",
          number: 13,
        },
        "We run activities for children and students, such as the Museum Club, for which there's no charge.",
        "We do have a donation box just over there, so feel free to give whatever amount you consider appropriate.",
        "We do have a cloakroom.",
        {
          text: "If you'd like to leave your coats and bags somewhere.",
          number: 14,
        },
        "Unlike other museums, photography is allowed here, so you might like to keep your cameras with you.",
        "You might be more comfortable not carrying around heavy rucksacks.",
        "Though keep your coats and jackets on, as it's quite cold in the museum garden today.",
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
      speaker: "SPEAKER",
      text: [
        "I'd like to tell you about the different areas of the museum.",
        "Just inside and outside the main gallery, we have an area called Four Seasons.",
        "Here, you can watch a four-minute animation of a woodland scene.",
        "It was designed especially for the museum by a group of young people on a film studies course, and it's beautiful.",
        {
          text: "Children absolutely love it, but then so do adults.",
          number: 15,
        },
        "The main gallery's called Town and Country.",
        "It includes a photographic collection of prize-winning sheep and shepherds.",
        "Leaving Town and Country, you enter Farmhouse Kitchen, which is... well, self-explanatory.",
        "Here we have the oldest collection of equipment for making butter and cheese in the country.",
        "And this morning, a specialist cheesemaker will be giving demonstrations of how it's produced.",
        { text: "You may even get to try some.", number: 16 },
        "After that, you can go in two directions.",
        "To the right is a staircase that takes you up to a landing, from where you can look down on the galleries.",
        "To the left is a room called A Year on the Farm.",
        "There is lots of seating here, as sometimes we use the room for school visits, so it's a good place to stop for a rest.",
        "If you're feeling competitive, you can take our memory test, in which you answer questions about things you've seen in the museum.",
        {
          text: "The next area is called Wagon Walk. This contains farm carts from nearly every part of the country.",
          number: 17,
        },
        "It's surprising how much regional variation there was.",
        "Beside the carts are display boards with information about each one.",
        "The carts are old and fragile, so we ask you to keep your children close to you, and ensure they don't climb on the carts.",
        {
          text: "From Wagon Walk, you can either make your way back to reception, or go out into the garden, or even go back to take another look in the galleries.",
          number: 18,
        },
        "In the far corner of the garden is Bees are Magic, but we're redeveloping this area, so you can't visit that at the moment.",
        { text: "You can still buy our honey in the shop though.", number: 19 },
        "Finally, there is the pond, which contains all kinds of interesting wildlife.",
        "There are baby ducks that are only a few days old, as well as tiny frogs.",
        {
          text: "The pond isn't deep, and there is a fence around it, so it's perfectly safe for children.",
          number: 20,
        },
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
    11: "B", // The museum building was originally a private home
    12: "A", // The university uses part of the museum building as teaching rooms
    13: "A", // Visitors decide whether or not they wish to pay
    14: "B", // Visitors are advised to leave coats in the cloakroom
    15: "F", // Four Seasons – features something created by students
    16: "G", // Farmhouse Kitchen – an expert is here today
    17: "E", // A Year on the Farm – there is a quiz for visitors
    18: "A", // Wagon Walk – parents must supervise their children
    19: "C", // Bees are Magic – it is closed today
    20: "B", // The Pond – there are new things to see
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
    localStorage.setItem("/listening4Part42023", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening4Part42023");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening4Part42023");
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
                {renderText("The Museum Building")}
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

          {/* ---------- Questions 11-14 ---------- */}
          <p className="mb-4 font-semibold">{renderText("Questions 11-14")}</p>
          <p className="mb-3 italic">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          <div className="p-6 rounded-md space-y-6 text-gray-800 mb-8">
            <h3 className="font-bold text-lg text-center">
              {renderText("The Museum Building")}
            </h3>

            {/* Q11 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold flex items-center">
                <span className="mr-2">11</span>
                {renderText("The museum building was originally")}
              </p>
              <div className="flex flex-col ml-6">
                {["A", "B", "C"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="q11"
                      value={option}
                      checked={userAnswers[11] === option}
                      onChange={(e) => handleInputChange(11, e.target.value)}
                      className="w-4 h-4"
                    />
                    <strong>{option}.</strong>{" "}
                    <span>
                      {renderText(
                        option === "A"
                          ? "a factory."
                          : option === "B"
                          ? "a private home."
                          : "a hall of residence."
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q12 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold flex items-center">
                <span className="mr-2">12</span>
                {renderText(
                  "The university uses part of the museum building as"
                )}
              </p>
              <div className="flex flex-col ml-6">
                {["A", "B", "C"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="q12"
                      value={option}
                      checked={userAnswers[12] === option}
                      onChange={(e) => handleInputChange(12, e.target.value)}
                      className="w-4 h-4"
                    />
                    <strong>{option}.</strong>{" "}
                    <span>
                      {renderText(
                        option === "A"
                          ? "teaching rooms."
                          : option === "B"
                          ? "a research library."
                          : "administration offices."
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q13 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold flex items-center">
                <span className="mr-2">13</span>
                {renderText("What does the guide say about the entrance fee?")}
              </p>
              <div className="flex flex-col ml-6">
                {["A", "B", "C"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="q13"
                      value={option}
                      checked={userAnswers[13] === option}
                      onChange={(e) => handleInputChange(13, e.target.value)}
                      className="w-4 h-4"
                    />
                    <strong>{option}.</strong>{" "}
                    <span>
                      {renderText(
                        option === "A"
                          ? "Visitors decide whether or not they wish to pay."
                          : option === "B"
                          ? "Only children and students receive a discount."
                          : "The museum charges extra for special exhibitions."
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q14 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold flex items-center">
                <span className="mr-2">14</span>
                {renderText(
                  "What are visitors advised to leave in the cloakroom?"
                )}
              </p>
              <div className="flex flex-col ml-6">
                {["A", "B", "C"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="q14"
                      value={option}
                      checked={userAnswers[14] === option}
                      onChange={(e) => handleInputChange(14, e.target.value)}
                      className="w-4 h-4"
                    />
                    <strong>{option}.</strong>{" "}
                    <span>
                      {renderText(
                        option === "A"
                          ? "cameras"
                          : option === "B"
                          ? "coats"
                          : "bags"
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Questions 15-20 ---------- */}
          <p className="mb-4 font-semibold">{renderText("Questions 15-20")}</p>
          <p className="mb-3 italic">
            {renderText(
              "What information does the speaker give about each of the following areas of the museum?"
            )}
          </p>
          <p className="mb-6 italic">
            {renderText(
              "Choose the correct letter, A-H, next to Questions 15-20."
            )}
          </p>

          <div className="p-6 rounded-md space-y-6 text-gray-800">
            <div className="border p-4 max-w-[300px] mx-auto mb-6">
              <h3 className="font-bold text-lg text-center mb-4">
                {renderText("Information")}
              </h3>
              {[
                { letter: "A", text: "Parents must supervise their children." },
                { letter: "B", text: "There are new things to see." },
                { letter: "C", text: "It is closed today." },
                { letter: "D", text: "This is only for school groups." },
                { letter: "E", text: "There is a quiz for visitors." },
                {
                  letter: "F",
                  text: "It features something created by students.",
                },
                { letter: "G", text: "An expert is here today." },
                { letter: "H", text: "There is a one-way system." },
              ].map((item) => (
                <div key={item.letter} className="flex items-start">
                  <span className="font-bold mr-2">{item.letter}.</span>
                  <span>{renderText(item.text)}</span>
                </div>
              ))}
            </div>

            <h4 className="font-bold text-lg text-center mb-4">
              {renderText("Areas of museum")}
            </h4>

            {[15, 16, 17, 18, 19, 20].map((num) => {
              const area =
                num === 15
                  ? "Four Seasons"
                  : num === 16
                  ? "Farmhouse Kitchen"
                  : num === 17
                  ? "A Year on the Farm"
                  : num === 18
                  ? "Wagon Walk"
                  : num === 19
                  ? "Bees are Magic"
                  : "The Pond";
              return (
                <div key={num} className="flex items-center mb-3">
                  <span className="font-bold text-lg min-w-[40px]">{num}</span>
                  <span className="font-semibold">{renderText(area)}</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-2 ml-4"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
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
                    {Array.from({ length: 10 }, (_, i) => i + 11).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();

                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
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
                            {(noAnswer || (!isCorrect && userAnswer)) && (
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
                              <span className="italic">No answer provided</span>
                            ) : (
                              userAnswer
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            {correctAnswers[num]}
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
      <Listening4Pagination2023></Listening4Pagination2023>
    </div>
  );
};

export default Listening4Part22022;
