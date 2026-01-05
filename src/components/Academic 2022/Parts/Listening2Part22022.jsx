import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2022 from "../Pagination2022/Listening2Pagination2022";

const Listening2Part22022 = () => {
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
        "Part 2. You will hear a guide at a tourist attraction called Oniton Hall talking to a group of visitors.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "NICK",
      text: [
        "Good morning, and welcome to Oniton Hall, one of the largest estates in the area.",
        "My name's Nick, and I'm one of the guides.",
        "I'll give you a brief introduction to the estate while you're sitting down, and then we'll walk round.",
        "The estate consists of the house, gardens, park land and farm, and it dates back to the 14th century.",
        "The original house was replaced in the late 17th century.",
        "And of course, it has had a large number of owners.",
        {
          text: "Almost all of them have left their mark, generally by adding new rooms, like the ballroom and conservatory, or by demolishing others.",
          number: 11,
        },
        "The farm looks much as it's always done, although the current owner has done a great deal of work to the flower beds.",
        "In the 17th century, the estate was owned by a very wealthy man called Sir Edward Downes.",
        "His intention was to escape from the world of politics.",
        "After years as an active politician, and to build a new house worthy of his big collection of books, paintings and sculptures.",
        {
          text: "He broke off contact with his former political allies and hosted meetings of creative and literary people, like painters and poets.",
          number: 12,
        },
        "Unusually for his time, he didn't care whether his guests were rich or poor, as long as they had talent.",
        "Big houses like Oniton had dozens of servants until the 1920s or 30s, and we've tried to show what their working lives were like.",
        "Photographs of course don't give much of an idea, so instead, as you go round the house, you'll see volunteers dressed up as nineteenth-century servants, going about their work.",
        {
          text: "They'll explain what they're doing, and tell you their recipes, or what tools they're using.",
          number: 13,
        },
        "We've just introduced this feature to replace the audio guide we used to have available.",
        "I see there are a number of children here with you today.",
        "Well, we have several activities specially for children, like dressing up in the sorts of clothes that children wore in the past.",
        "And as it's a fine day, some of you will probably want to play in the adventure playground.",
        {
          text: "Our latest addition is child-sized tractors, that you can drive around the grounds.",
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
      speaker: "NICK",
      text: [
        "We'll also be going into the farm, that's part of the estate, where there's plenty to do.",
        "Most of the buildings date from the 18th century.",
        "So you can really step back into an agricultural past.",
        "Until recently, the dairy was where milk from the cows was turned into cheese.",
        "It's now the place to go for lunch, or afternoon tea, or just a cup of coffee, and a slice of homemade cake.",
        {
          text: "The big stone building that dominates the farm is the large barn, and in here is our collection of agricultural tools.",
          number: 15,
        },
        {
          text: "These were used in the past to plough the earth, sow seeds, make gates, and much more.",
          number: 16,
        },
        {
          text: "There's a small barn, also made of stone, where you can groom the donkeys and horses to keep their coats clean.",
          number: 17,
        },
        "They really seem to enjoy having it done.",
        "And children love grooming them.",
        {
          text: "The horses no longer live in the stables, which instead is the place to go to buy gifts, books, our own jams and pickles.",
          number: 18,
        },
        "And clothes and blankets made of wool from our sheep.",
        {
          text: "Outside the shed, which is the only brick building, you can climb into a horse-drawn carriage for a lovely relaxing tour of the park and farm.",
          number: 19,
        },
        {
          text: "The parkland, which was laid out in the 18th century, with a lake and trees that are now well established.",
          number: 20,
        },
        "You'll see types of cattle and sheep that are hardly ever found on farms these days.",
        "We're helping to preserve them to stop their numbers falling further.",
        "OK, well, if you'd like to come with me, we will start...",
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
    11: "B", // Many past owners made changes to the house
    12: "B", // Sir Edward Downes built Oniton Hall to display his wealth
    13: "C", // Visitors can learn about the work of servants from people in costume
    14: "C", // New for children is the adventure playground
    15: "B", // Dairy – watching cows being milked
    16: "C", // Large barn – seeing old farming equipment
    17: "G", // Small barn – helping to look after animals
    18: "F", // Stables – seeing rare breeds of animals
    19: "H", // Shed – using farming tools
    20: "A", // Parkland – shopping
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
    localStorage.setItem("/listening2Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part22022");
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
                {renderText("Oniton Hall")}
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

          <p className="mb-4 font-semibold">{renderText("Questions 11-14")}</p>
          <p className="mb-3 italic">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          {/* ---------- Questions 11-14 ---------- */}
          <div className=" p-6 rounded-md space-y-6 text-gray-800 mb-8">
            <h3 className="font-bold text-lg text-center">
              {renderText("Oniton Hall")}
            </h3>

            {/* Q11 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold flex  items-center">
                <span className="mr-2">11</span>
                {renderText("Many past owners made changes to")}
              </p>
              <div className="flex flex-col space-x-4 ml-6">
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
                          ? "the gardens."
                          : option === "B"
                          ? "the house."
                          : "the farm."
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
                  "Sir Edward Downes built Oniton Hall because he wanted"
                )}
              </p>
              <div className="flex flex-col space-x-4 ml-6">
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
                          ? "a place for discussing politics."
                          : option === "B"
                          ? "a place to display his wealth."
                          : "a place for artists and writers."
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
                {renderText(
                  "Visitors can learn about the work of servants in the past from"
                )}
              </p>
              <div className="flex flex-col space-x-4 ml-6">
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
                          ? "audio guides."
                          : option === "B"
                          ? "photographs."
                          : "people in costume."
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
                {renderText("What is new for children at Oniton Hall?")}
              </p>
              <div className="flex flex-col space-x-4 ml-6">
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
                          ? "clothes for dressing up"
                          : option === "B"
                          ? "mini tractors"
                          : "the adventure playground"
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
              "Which activity is offered at each of the following locations on the farm?"
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
                {renderText("Activities")}
              </h3>
              {[
                { letter: "A", text: "shopping" },
                { letter: "B", text: "watching cows being milked" },
                { letter: "C", text: "seeing old farming equipment" },
                { letter: "D", text: "eating and drinking" },
                { letter: "E", text: "starting a trip" },
                { letter: "F", text: "seeing rare breeds of animals" },
                { letter: "G", text: "helping to look after animals" },
                { letter: "H", text: "using farming tools" },
              ].map((activity) => (
                <div key={activity.letter} className="flex items-start">
                  <span className="font-bold mr-2">{activity.letter}.</span>
                  <span>{renderText(activity.text)}</span>
                </div>
              ))}
            </div>

            <h4 className="font-bold text-lg text-center mb-4">
              {renderText("Locations on the farm")}
            </h4>

            {/* Q15-Q20 Dropdowns */}
            {[15, 16, 17, 18, 19, 20].map((questionNum) => {
              const locationText =
                questionNum === 15
                  ? "dairy"
                  : questionNum === 16
                  ? "large barn"
                  : questionNum === 17
                  ? "small barn"
                  : questionNum === 18
                  ? "stables"
                  : questionNum === 19
                  ? "shed"
                  : "parkland";

              return (
                <div key={questionNum} className="flex items-center">
                  <span className="font-bold text-lg min-w-[40px]">
                    {questionNum}
                  </span>
                  <span className="font-semibold">
                    {renderText(locationText)}
                  </span>
                  <select
                    value={userAnswers[questionNum] || ""}
                    onChange={(e) =>
                      handleInputChange(questionNum, e.target.value)
                    }
                    className="border rounded-md px-3 py-2 ml-4"
                  >
                    <option value="">{questionNum}</option>
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

          {/* ---------- Submit Button and Results ---------- */}
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
                              <span className="italic">No answer provided</span>
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
      <Listening2Pagination2022></Listening2Pagination2022>
    </div>
  );
};

export default Listening2Part22022;
