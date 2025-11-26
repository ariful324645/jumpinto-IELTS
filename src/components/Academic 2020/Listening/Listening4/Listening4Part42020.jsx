import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Listening4Pagination2020 from "../../Pagination/Listening4Pagination/Listening4Pagination2020";

const Test4Listening2020 = () => {
  // 2nd

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
        "Part 4. You will hear a history student giving part of a presentation about changes in British society in the 19th century.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },

    {
      speaker: "SPEAKER",
      text: [
        "Hi, everyone. In this session, I'll be presenting my research about the social history of Britain during the Industrial Revolution.",
        "I particularly looked at how ordinary lives were affected by changes that happened at that time.",
        "This was a time that saw the beginning of a new phenomenon, consumerism, where buying and selling goods became a major part of ordinary people's lives.",

        {
          text: "In fact, it was in the 19th century that the quantity and quality of people's possessions was used as an indication of the wealth of the country.",
          number: 31,
        },
        "Before this, the vast majority of people had very few possessions, but all that was changed by the Industrial Revolution.",
      ],
    },

    {
      speaker: "SPEAKER",
      text: [
        {
          text: "This was the era from the mid 18th to the late 19th century, when improvements in how goods were made, as well as in technology, triggered massive social changes that transformed life for just about everybody in several key areas.",
          number: 32,
        },
        "First, let's look at manufacturing.",
        "When it comes to manufacturing, we tend to think of the Industrial Revolution in images of steam engines and coal.",

        {
          text: "And it's true that the Industrial Revolution couldn't have taken place at all, if it weren't for these new sources of power.",
          number: 33,
        },
        "They marked an important shift away from the traditional watermills and windmills that had dominated before this.",

        {
          text: "The most advanced industry for much of the 19th century was textiles.",
          number: 34,
        },
        "This meant that fashionable fabrics and lace and ribbons were made available to everyone.",
        "Before the Industrial Revolution, most people made goods to sell in small workshops, often in their own homes.",

        {
          text: "But enormous new machines were now being created.",
          number: 35,
        },
        "That could produce the goods faster, and on a larger scale, and these required a lot more space, so large factories were built.",
        "Replacing the workshops and forcing workers to travel to work.",
        "In fact, large numbers of people migrated from villages into towns as a result.",
      ],
    },

    {
      speaker: "SPEAKER",
      text: [
        "As well as manufacturing, there were new technologies in transport contributing to the growth of consumerism.",
        "The horse-drawn stagecoaches and carts of the 18th century which carried very few people and goods, and traveled slowly along poorly surfaced roads, were gradually replaced by the numerous canals that were constructed.",
        "These were particularly important for the transportation of goods.",
        "The canals gradually fell out of use, though, as railways were developed, becoming the main way of moving goods and people from one end of the country to the other, and the goods they moved weren't just coal, iron, clothes, and so on.",
        {
          text: "Significantly, they included newspapers, which meant that thousands of people were not only more knowledgeable about what was going on in the country.",
          number: 36,
        },
        "But could also read about what was available in the shops, and that encouraged them to buy more.",
        "So faster forms of transport resulted in distribution becoming far more efficient.",

        {
          text: "Goods could now be sold all over the country, instead of just in the local market.",
          number: 37,
        },
      ],
    },

    {
      speaker: "SPEAKER",
      text: [
        {
          text: "The third main area that saw changes that contributed to consumerism was retailing.",
        },
        "The number and quality of shops grew rapidly.",
        "And in particular, small shops suffered, as customers flocked to the growing number of department stores, a form of retailing that was new in the 19th century.",
        "The entrepreneurs who opened these found new ways to stock them with goods, and to attract customers.",

        {
          text: "For instance, improved lighting inside greatly increased the visibility of the goods for sale.",
          number: 38,
        },

        {
          text: "Another development that made goods more visible from outside resulted from the use of plate glass, which made it possible for windows to be much larger than previously.",
          number: 39,
        },
        "New ways of promoting goods were introduced too.",
        "Previously, the focus had been on informing potential customers about the availability of goods.",

        {
          text: "Now, there was an explosion in advertising, trying to persuade people to go shopping.",
          number: 40,
        },
        "Flanders claims that one of the great effects of the Industrial Revolution was that it created choice, all sorts of things that had previously been luxuries.",
        "From sugar to cutlery became conveniences, and before long, they turned into necessities.",
        "Life without sugar or cutlery was unimaginable. Rather like mobile phones these days.",
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

      //       if (speaker === "MAN")
      //         return voices.find((v) => v.name.includes("David")) || voices[0];
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
    31: "wealth",
    32: "technology",
    33: "power",
    34: "textiles",
    35: "machines",
    36: "newspapers",
    37: "local",
    38: "lighting",
    39: "windows",
    40: "advertising",
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
    localStorage.setItem("/listening4Part32020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening4Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening4Part32020");
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
                {renderText(
                  "How industrial revolution affected life in Britain"
                )}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>

              {/* Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {renderText("Clear answer")}
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      {renderText(
                        "Are you sure you want to clear all answers?"
                      )}
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        {renderText("No, keep them")}
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        {renderText("Yes, clear them")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 1st section */}

          <div className="my-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 31–40")}
            </h2>
            <br />
            <h3 className="text-lg mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Write ")}
              <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
              {renderText(" for each answer.")}
            </h3>

            <div className="overflow-x-auto border p-5 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                {renderText(
                  "How the Industrial Revolution affected life in Britain"
                )}
              </h1>

              {/* ---------- Notes Section ---------- */}
              <ul className="list-disc list-inside space-y-3">
                <li className="text-lg">
                  <span>
                    {renderText(
                      "19th century — For the first time, people's possessions were used to measure Britain's"
                    )}
                  </span>
                  <button
                    onClick={() => toggleButton(31)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>{renderText(".")}</span>
                </li>

                <li className="text-lg">
                  <span>
                    {renderText("Developments in production of goods and in")}
                  </span>
                  <button
                    onClick={() => toggleButton(32)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>{renderText(" greatly changed lives.")}</span>
                </li>

                {/* MAIN AREAS OF CHANGE */}
                <h2 className="text-lg font-bold mt-6">
                  {renderText("MAIN AREAS OF CHANGE")}
                </h2>

                {/* Manufacturing */}
                <h3 className="text-lg font-semibold">
                  {renderText("Manufacturing")}
                </h3>

                <li className="text-lg">
                  <span>
                    {renderText(
                      "The Industrial Revolution would not have happened without the new types of"
                    )}
                  </span>
                  <button
                    onClick={() => toggleButton(33)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>{renderText(" that were used then.")}</span>
                </li>

                <li className="text-lg">
                  <span>{renderText("The leading industry was")}</span>
                  <button
                    onClick={() => toggleButton(34)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>
                    {renderText(" (its products became widely available).")}
                  </span>
                </li>

                <li className="text-lg">
                  <span>{renderText("New")}</span>
                  <button
                    onClick={() => toggleButton(35)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>
                    {renderText(
                      " made factories necessary and so more people moved into towns."
                    )}
                  </span>
                </li>

                {/* Transport */}
                <h3 className="text-lg font-semibold">
                  {renderText("Transport")}
                </h3>

                <li className="text-lg">
                  {renderText("The railways took the place of canals.")}
                </li>

                <li className="text-lg">
                  <span>
                    {renderText(
                      "Because of the new transport: greater access to"
                    )}
                  </span>
                  <button
                    onClick={() => toggleButton(36)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>
                    {renderText(
                      " made people more aware of what they could buy in shops."
                    )}
                  </span>
                </li>

                <li className="text-lg">
                  <span>
                    {renderText(
                      "when shopping, people were not limited to buying"
                    )}
                  </span>
                  <button
                    onClick={() => toggleButton(37)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>{renderText(" goods.")}</span>
                </li>

                {/* Retailing */}
                <h3 className="text-lg font-semibold">
                  {renderText("Retailing")}
                </h3>

                <li className="text-lg">
                  {renderText("The first department stores were opened.")}
                </li>

                <li className="text-lg">
                  <span>
                    {renderText(
                      "The displays of goods were more visible: inside stores because of better"
                    )}
                  </span>
                  <button
                    onClick={() => toggleButton(38)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>{renderText(".")}</span>
                </li>

                <li className="text-lg">
                  <span>{renderText("outside stores, because")}</span>
                  <button
                    onClick={() => toggleButton(39)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>{renderText(" were bigger.")}</span>
                </li>

                <li className="text-lg">
                  <button
                    onClick={() => toggleButton(40)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                    type="text"
                  />
                  <span>
                    {renderText(
                      " that was persuasive became much more common."
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
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
      <Listening4Pagination2020></Listening4Pagination2020>
    </div>
  );
};

export default Test4Listening2020;
