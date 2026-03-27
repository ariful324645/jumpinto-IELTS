import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2024 from "../Pagination 2024/Listening3Pagination2024";

const Test3Listening2024 = () => {
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
        "Part 1, you will hear two neighbors who live in an apartment block talking about shopping for food.",
        "First you have some time to look at questions 1 to 6.",
        "Now listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "LEON",
      text: ["Hi, Shannon. How are you settling into your new flat?"],
    },
    {
      speaker: "SHANNON",
      text: ["Really well, thanks."],
    },
    {
      speaker: "LEON",
      text: ["You look like you're going shopping."],
    },
    {
      speaker: "SHANNON",
      text: [
        "Yes, I am. My cousins are coming to stay for a couple of days, and I have to cook for them.",
      ],
    },
    {
      speaker: "LEON",
      text: [
        "Well, there are plenty of places to buy food in Kite Place. ",
        { text: "It's the area by the harbor.", number: 1 },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Oh, OK, I'll find that on the map. Thanks."],
    },
    {
      speaker: "LEON",
      text: ["What sort of food do you need to get?"],
    },
    {
      speaker: "SHANNON",
      text: ["Well, neither of them eats meat, but they both like fish."],
    },
    {
      speaker: "LEON",
      text: ["Well, there's a really good fish market there."],
    },
    {
      speaker: "SHANNON",
      text: ["Oh, great. Where is it exactly?"],
    },
    {
      speaker: "LEON",
      text: [
        "It's at the far end of Kite Place.",
        {
          text: " So you have to go over the bridge, and then it's on the right.",
          number: 2,
        },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["OK, is it open all day?"],
    },
    {
      speaker: "LEON",
      text: [
        "It doesn't close until 4, but I'd recommend going earlier than that. It does run out of some things.",
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Oh, I don't want that to happen."],
    },
    {
      speaker: "LEON",
      text: [
        "As long as you get there by 3:30 you should be fine.",
        { text: "It's only 11 now, so plenty of time.", number: 3 },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Right."],
    },
    {
      speaker: "LEON",
      text: ["Do you need to buy vegetables too?"],
    },
    {
      speaker: "SHANNON",
      text: [
        "I do, and I want to avoid all the plastic packaging in the supermarket.",
      ],
    },
    {
      speaker: "LEON",
      text: [
        "Well, there's a really nice organic shop there. Now what's it called?",
        { text: "It's the name of a flower. I know it's rose.", number: 4 },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Oh, that's a nice name."],
    },
    {
      speaker: "LEON",
      text: ["Yeah, it sells vegetables and quite a lot of other stuff."],
    },
    {
      speaker: "SHANNON",
      text: ["And where's that?"],
    },
    {
      speaker: "LEON",
      text: [
        "Well, as you reach the market, you'll see a big grey building on your left.",
        "I think it used to be a warehouse.",
        "Anyway, now it's a restaurant upstairs, but the ground floor has two shops either side of the entrance.",
        "And it's the one on the left.",
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Hmm, that's easy enough."],
    },
    {
      speaker: "LEON",
      text: [
        "You can't miss it. ",
        {
          text: "There's also a big sign on the pavement, so you can look for that.",
          number: 5,
        },
      ],
    },
    {
      speaker: "SHANNON",
      text: [
        "Fine. I guess if I need anything else, I'll have to go to the supermarket.",
      ],
    },
    {
      speaker: "LEON",
      text: [
        "Yeah, you should be able to get everything you need.",
        {
          text: "But there's a minibus that goes to the supermarket. It's purple, and the number is 289.",
          number: 6,
        },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Thanks, that's great."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "LEON",
      text: [
        "So, what do you need to get at the fish market?",
        "The salmon is always very good, and the shellfish.",
      ],
    },
    {
      speaker: "SHANNON",
      text: [
        "I'm going to make a curry, I think. And I need about 12 prawns for that.",
      ],
    },
    {
      speaker: "LEON",
      text: ["They'll have plenty of those. OK, have you ever tried samphire?"],
    },
    {
      speaker: "SHANNON",
      text: ["No, what's that?"],
    },
    {
      speaker: "LEON",
      text: [
        "It's a type of seaweed.",
        {
          text: "I just ask for a handful, and you fry it in butter. It's delicious.",
          number: 7,
        },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Oh, I might try that. How do you spell it?"],
    },
    {
      speaker: "LEON",
      text: ["It's SAMPHIRE."],
    },
    {
      speaker: "SHANNON",
      text: ["Great, it's always good to try something different."],
    },
    {
      speaker: "LEON",
      text: ["Yeah."],
    },
    {
      speaker: "SHANNON",
      text: [
        "I'll see what beans they have in the organic shop, and I think I'll get something for dessert there.",
      ],
    },
    {
      speaker: "LEON",
      text: ["How about a mango?"],
    },
    {
      speaker: "SHANNON",
      text: [
        "I'm not sure. They're not always ripe.",
        { text: "I'd prefer a melon, it's bigger too.", number: 8 },
      ],
    },
    {
      speaker: "LEON",
      text: [
        "Good idea.",
        {
          text: "The owner also sells a lot of spices there, that you can put in a curry, and things like coconut.",
          number: 9,
        },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Oh, that's very helpful. I'll have a look."],
    },
    {
      speaker: "LEON",
      text: ["No problem."],
    },
    {
      speaker: "SHANNON",
      text: [
        "I know bread doesn't really go with curry. But I always like to have some in case.",
      ],
    },
    {
      speaker: "LEON",
      text: [
        "As I said, all the bread is home made, and there's lots of variety.",
        "I like the brown bread myself.",
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Hmm, sounds good."],
    },
    {
      speaker: "LEON",
      text: ["They sell other things there too."],
    },
    {
      speaker: "SHANNON",
      text: ["Like cakes? Uh, I love chocolate cake."],
    },
    {
      speaker: "LEON",
      text: [
        "Well, uh, not that, uh, but they have a whole range of tarts.",
        { text: "And the best are the strawberry ones.", number: 10 },
      ],
    },
    {
      speaker: "SHANNON",
      text: ["Perfect. Hopefully I won't even have to go to the supermarket."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1.",
        "You now have one minute to check your answers to part 1.",
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
      if (speaker === "SHANNON") {
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
    // Questions 1–6 (notes)
    1: "river",
    2: "bridge",
    3: "4",
    4: "Green",
    5: "sign",
    6: "free",

    // Questions 7–10 (shopping table)
    7: "seaweed",
    8: "cake",
    9: "herbs",
    10: "fruit",
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
                {renderText("Shopping for a Meal in Kite Place")}
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
            {renderText("Questions 1–6")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>{" "}
            {renderText("for each answer.")}
          </h3>

          {/* ---------- Notes Q1–6 ---------- */}
          <div className="border p-6 rounded-lg space-y-4 max-w-[500px] mx-auto bg-white">
            <p className="font-bold text-center">
              {renderText("Local food shops")}
            </p>

            {[
              { text: "Kite Place – near the", num: 1 },
              { text: "Fish market: cross the", num: 2 },
              {
                text: "best to go before",
                num: 3,
                suffix: "pm, earlier than closing time",
              },
              { text: "Organic shop called", num: 4, prefix: "'", suffix: "'" },
              { text: "look for the large", num: 5, suffix: "outside" },
              { text: "take a", num: 6, suffix: "minibus, number 289" },
            ].map(({ text, num, prefix = "", suffix = "" }) => (
              <div key={num} className="flex items-center gap-2">
                <p className="w-[200px]">
                  {renderText(text)} {renderText(prefix)}
                </p>

                <button
                  onClick={() => toggleButton(num)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    activeButtons[num]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  {num}
                </button>

                <input
                  value={userAnswers[num] || ""}
                  onChange={(e) => handleInputChange(num, e.target.value)}
                  className="border rounded-md px-2 py-1 w-28"
                />

                <p>{renderText(suffix)}</p>
              </div>
            ))}
          </div>

          {/* ---------- Header for Questions 7–10 ---------- */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 7–10")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the table below.")} <br />
            <br />
            {renderText("Write ONE WORD ONLY for each answer.")}
          </h3>

          {/* ---------- Table Q7–10 (3 columns, 4 rows) ---------- */}
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold text-center mb-4">
              {renderText("Shopping")}
            </h2>

            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 w-[160px]"></th>
                  <th className="border p-2">{renderText("To buy")}</th>
                  <th className="border p-2">{renderText("Other ideas")}</th>
                </tr>
              </thead>

              <tbody>
                {/* -------- Row 1 -------- */}
                <tr>
                  <td className="border p-2 font-bold">
                    {renderText("Fish market")}
                  </td>

                  <td className="border p-2">{renderText("a dozen prawns")}</td>

                  <td className="border p-2 flex items-center gap-2">
                    {renderText("a handful of")}
                    <button
                      onClick={() => toggleButton(7)}
                      className={`w-7 h-7 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                    {renderText("(type of seaweed)")}
                  </td>
                </tr>

                {/* -------- Row 2 -------- */}
                <tr>
                  <td className="border p-2 font-bold">
                    {renderText("Organic shop")}
                  </td>

                  <td className="border p-2 flex items-center gap-2">
                    {renderText("beans and a")}
                    <button
                      onClick={() => toggleButton(8)}
                      className={`w-7 h-7 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-28"
                    />
                    {renderText("for dessert")}
                  </td>

                  <td className="border p-2">
                    {" "}
                    <td className="flex items-center gap-2">
                      {renderText("a handful of")}
                      <button
                        onClick={() => toggleButton(9)}
                        className={`w-7 h-7 rounded-full border-2 ${
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
                        className="border rounded-md px-2 py-1 w-28"
                      />
                      {renderText("(type of seaweed)")}
                    </td>
                  </td>
                </tr>

                {/* -------- Row 3 -------- */}
                <tr>
                  <td className="border p-2 font-bold">
                    {renderText("Bakery")}
                  </td>

                  <td className="border p-2">{renderText("a brown loaf")}</td>

                  <td className="border p-2 flex items-center gap-2">
                    <button
                      onClick={() => toggleButton(10)}
                      className={`w-7 h-7 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-24"
                    />
                    {renderText("tart")}
                  </td>
                </tr>
              </tbody>
            </table>
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
      <Listening3Pagination2024></Listening3Pagination2024>
    </div>
  );
};

export default Test3Listening2024;
