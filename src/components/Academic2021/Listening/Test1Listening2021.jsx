import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2021 from "../Pagination 2021/Listening1Pagination2021";
// import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";

const Test1Listening2021 = () => {
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
        "Part 1. You will hear a man phoning to find out about some children's engineering workshops.",
        "First, you have some time to look at questions 1 to 3.",
        "Now listen carefully and answer questions 1 to 3.",
      ],
    },
    {
      speaker: "SARAH",
      text: ["Hello, Children's Engineering Workshops."],
    },
    {
      speaker: "FATHER",
      text: [
        "Oh, hello. I wanted some information about the workshops in the school holidays.",
      ],
    },
    {
      speaker: "SARAH",
      text: ["Sure."],
    },
    {
      speaker: "FATHER",
      text: [
        "I have two daughters who are interested.",
        "The younger one's Lydia. She's 4.",
        "Do you take children as young as that?",
      ],
    },
    {
      speaker: "SARAH",
      text: [
        {
          text: "Yes, our Tiny Engineers workshop is for 4 to 5 year olds.",
          number: 1,
        },
      ],
    },
    {
      speaker: "FATHER",
      text: ["What sorts of activities do they do?"],
    },
    {
      speaker: "SARAH",
      text: [
        "All sorts.",
        "For example, they work together to design a special cover that goes round an egg,",
        "so that when it's inside, they can drop it from a height, and it doesn't break.",
        "Well, sometimes it does break, but that's part of the fun.",
      ],
    },
    {
      speaker: "FATHER",
      text: [
        "Right.",
        "And Lydia loves building things.",
        "Is there any opportunity for her to do that?",
      ],
    },
    {
      speaker: "SARAH",
      text: [
        {
          text: "Well, they have a competition to see who can make the highest tower.",
          number: 2,
        },
        "You'd be amazed how high they can go.",
      ],
    },
    {
      speaker: "FATHER",
      text: ["Right."],
    },
    {
      speaker: "SARAH",
      text: [
        "But they're learning all the time as well as having fun.",
        {
          text: "For example, one thing they do is to design and build a car that's attached to a balloon.",
          number: 3,
        },
        "And the force of the air in that actually powers the car, and makes it move along.",
        "They go really fast too.",
      ],
    },
    {
      speaker: "FATHER",
      text: ["OK, well, all this sounds perfect."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 4 to 10.",
        "Now listen and answer questions 4 to 10.",
      ],
    },
    {
      speaker: "FATHER",
      text: [
        "Now Carly, that's my older daughter, has just had her 7th birthday.",
        "So presumably she'd be in a different group.",
      ],
    },
    {
      speaker: "SARAH",
      text: [
        {
          text: "Yes. She'd be in the Junior Engineers. That's for children from 6 to 8.",
          number: 4,
        },
      ],
    },
    {
      speaker: "FATHER",
      text: ["And do they do the same sorts of activities?"],
    },
    {
      speaker: "SARAH",
      text: [
        "Some are the same, but a bit more advanced.",
        "So they work out how to build model vehicles, things like cars and trucks,",
        {
          text: "but also how to construct animals using the same sorts of material and technique.",
          number: 5,
        },
        "And then they learn how they can program them and make them move.",
      ],
    },
    {
      speaker: "FATHER",
      text: ["So they learn a bit of coding."],
    },
    {
      speaker: "SARAH",
      text: [
        "They do.",
        "They pick it up really quickly.",
        "We're there to help if they need it, but they learn from one another too.",
      ],
    },
    {
      speaker: "FATHER",
      text: ["Right. And do they have competitions too?"],
    },
    {
      speaker: "SARAH",
      text: [
        "Yes, with the Junior Engineers, it's to use recycled materials like card and wood.",
        {
          text: "To build a bridge, and the longest one gets a prize.",
          number: 6,
        },
      ],
    },
    {
      speaker: "FATHER",
      text: ["That sounds fun, I wouldn't mind doing that myself."],
    },
    {
      speaker: "SARAH",
      text: [
        "Then they have something a bit different.",
        {
          text: "Which is to think up an idea for a five-minute movie, and then film it using special animation software.",
          number: 7,
        },
        "You'd be amazed what they come up with.",
      ],
    },
    {
      speaker: "FATHER",
      text: [
        "And of course that's something they can put on their phone,",
        "and take home to show all their friends.",
      ],
    },
    {
      speaker: "SARAH",
      text: [
        "Exactly.",
        "And then they also build a robot in the shape of a human,",
        {
          text: "and they decorate it and program it so that it can move its arms and legs.",
          number: 8,
        },
      ],
    },
    {
      speaker: "FATHER",
      text: ["Perfect. So is it the same price as the Tiny Engineers?"],
    },
    {
      speaker: "SARAH",
      text: [
        { text: "It's just a bit more, £50 for the five weeks.", number: 9 },
      ],
    },
    {
      speaker: "FATHER",
      text: ["And are the classes on a Monday too?"],
    },
    {
      speaker: "SARAH",
      text: [
        "They used to be, but we found it didn't give our staff enough time to clear up after the first workshop,",
        { text: "so we moved them to Wednesdays.", number: 10 },
        "The classes are held in the morning from 10 to 11.",
      ],
    },
    {
      speaker: "FATHER",
      text: [
        "OK, that's better for me actually.",
        "And what about the location?",
        "Where exactly are the workshops held?",
      ],
    },
    {
      speaker: "SARAH",
      text: [
        "They're in building 10A.",
        "There's a big sign on the door, you can't miss it.",
        "And that's in Fradstone Industrial Estate.",
      ],
    },
    {
      speaker: "FATHER",
      text: ["Sorry?"],
    },
    {
      speaker: "SARAH",
      text: ["Fradstone. That's F-R-A-D-S-T-O-N-E."],
    },
    {
      speaker: "FATHER",
      text: ["And that's in Grasford, isn't it?"],
    },
    {
      speaker: "SARAH",
      text: ["Yes, up past the station."],
    },
    {
      speaker: "FATHER",
      text: ["And will I have any parking problems there?"],
    },
    {
      speaker: "SARAH",
      text: ["No, there's always plenty available."],
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "SARAH") {
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
    1: "egg",
    2: "tower",
    3: "car",
    4: "animals",
    5: "bridge",
    6: "movie",
    7: "decorate",
    8: "wednesdays",
    9: "fradstone",
    10: "parking",
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
                {renderText("Children's Engineering Workshops")}
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
              {renderText("Children’s Engineering Workshops")}
            </h1>

            {/* ---------- Tiny Engineers ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Tiny Engineers (ages 4–5)")}
            </h2>

            <h3 className="font-semibold">{renderText("Activities")}</h3>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Create a cover for an")}
              <button
                onClick={() => toggleButton(1)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[1]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                1
              </button>
              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                "so they can drop it from a height without breaking it."
              )}
            </p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Take part in a competition to build the tallest")}
              <button
                onClick={() => toggleButton(2)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[2]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                2
              </button>
              <input
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Make a")}
              <button
                onClick={() => toggleButton(3)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[3]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                3
              </button>
              <input
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("powered by a balloon.")}
            </p>

            {/* ---------- Junior Engineers ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Junior Engineers (ages 6–8)")}
            </h2>

            <h3 className="font-semibold">{renderText("Activities")}</h3>

            {/* Q4 */}
            <p className="text-lg">
              {renderText("Build model cars, trucks and")}
              <button
                onClick={() => toggleButton(4)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[4]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                4
              </button>
              <input
                value={userAnswers[4] || ""}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("and learn how to program them so they can move.")}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("Take part in a competition to build the longest")}
              <button
                onClick={() => toggleButton(5)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[5]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                5
              </button>
              <input
                value={userAnswers[5] || ""}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("using card and wood.")}
            </p>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("Create a short")}
              <button
                onClick={() => toggleButton(6)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[6]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                6
              </button>
              <input
                value={userAnswers[6] || ""}
                onChange={(e) => handleInputChange(6, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("with special software.")}
            </p>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("Build,")}
              <button
                onClick={() => toggleButton(7)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[7]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                7
              </button>
              <input
                value={userAnswers[7] || ""}
                onChange={(e) => handleInputChange(7, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("and program a humanoid robot.")}
            </p>

            {/* ---------- Details ---------- */}
            <p className="text-lg mt-4">
              {renderText("Cost for a five-week block: £50")}
            </p>

            {/* Q8 */}
            <p className="text-lg">
              {renderText("Held on")}
              <button
                onClick={() => toggleButton(8)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[8]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                8
              </button>
              <input
                value={userAnswers[8] || ""}
                onChange={(e) => handleInputChange(8, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("from 10 am to 11 am")}
            </p>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("Location: Building 10A,")}
              <button
                onClick={() => toggleButton(9)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[9]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                9
              </button>
              <input
                value={userAnswers[9] || ""}
                onChange={(e) => handleInputChange(9, e.target.value)}
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText("Industrial Estate, Grasford")}
            </p>

            {/* Q10 */}
            <p className="text-lg">
              {renderText("Plenty of")}
              <button
                onClick={() => toggleButton(10)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[10]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                10
              </button>
              <input
                value={userAnswers[10] || ""}
                onChange={(e) => handleInputChange(10, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("is available.")}
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
      <Listening1Pagination2021></Listening1Pagination2021>
    </div>
  );
};

export default Test1Listening2021;
