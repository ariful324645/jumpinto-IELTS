import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Listening3Pagination2016 from "../Pagination2016/Listening3Pagination2016";

const Test1Listening2018 = () => {
  // second

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
        "Section 3. You will hear two students called Helen and Jeremy, who are studying creative writing, discussing a project for their course, which involves writing and illustrating stories for children.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully, and answer questions 21 to 26.",
      ],
    },

    {
      speaker: "JEREMY",
      text: ["Hello, Helen. Sorry I'm late."],
    },

    {
      speaker: "HELEN",
      text: [
        "Hi, Jeremy. No problem.",
        "Well, we'd better work out where we are on our project, I suppose.",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "Yeah, I've looked at the drawings you've done for my story, 'The Forest'.",
        "And I think they're brilliant.",
        "They really create the atmosphere I had in mind when I was writing it.",
      ],
    },

    {
      speaker: "HELEN",
      text: ["Uh. I'm glad you like them."],
    },

    {
      speaker: "JEREMY",
      text: ["There are just a few suggestions I'd like to make."],
    },

    {
      speaker: "HELEN",
      text: ["Go ahead."],
    },

    {
      speaker: "JEREMY",
      text: [
        {
          text: "Now, I'm not sure about the drawing of the cave.",
          number: 21,
        },
        "It's got trees all around it, which is great, but the drawing's a bit too static, isn't it?",
        "I think it needs some action.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "Yes, there's nothing happening.",
        "Perhaps I should add the boy Malcolm, isn't it?",
        "He would be walking up to it.",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "Yes, let's have Malcolm in the drawing.",
        {
          text: "And what about putting in a tiger?",
          number: 22,
        },
        "The one that he makes friends with a bit later.",
        "Maybe it could be sitting under a tree washing itself.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "And the tiger stops in the middle of what it's doing when it sees Malcolm walking past.",
      ],
    },

    {
      speaker: "JEREMY",
      text: ["That's a good idea."],
    },

    {
      speaker: "HELEN",
      text: ["OK, I'll have a go at that."],
    },

    {
      speaker: "JEREMY",
      text: [
        {
          text: "Then there's the drawing of the crowd of men and women dancing.",
          number: 23,
        },
        "They're just outside the forest, and there's a lot going on.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "That's right.",
        "You wanted them to be watching a carnival procession, but I thought it would be too crowded.",
        "Do you think it works like this?",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "Yes, I like what you've done.",
        "The only thing is, could you add Malcolm to it without changing what's already there?",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "What about having him sitting on the tree trunk on the right of the picture?",
      ],
    },

    {
      speaker: "JEREMY",
      text: ["Yes, that would be fine."],
    },

    {
      speaker: "HELEN",
      text: ["And do you want him watching the other people?"],
    },

    {
      speaker: "JEREMY",
      text: [
        {
          text: "No, he's been left out of all the fun, so I'd like him to be crying.",
          number: 24,
        },
        "That'll contrast nicely with the next picture.",
        "Where he's laughing at the clowns in the carnival.",
      ],
    },

    {
      speaker: "HELEN",
      text: ["Right, I'll do that."],
    },

    {
      speaker: "JEREMY",
      text: ["And then the drawing of the people ice skating in the forest."],
    },

    {
      speaker: "HELEN",
      text: [
        "I wasn't too happy with that one.",
        {
          text: "Because they're supposed to be skating on grass, aren't they?",
          number: 25,
        },
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "That's right, and it's frozen over.",
        "At the moment, it doesn't look quite right.",
      ],
    },

    {
      speaker: "HELEN",
      text: ["I see what you mean. I'll have another go at that."],
    },

    {
      speaker: "JEREMY",
      text: [
        "And I like the wool hats they're wearing.",
        {
          text: "Maybe you could give each of them a scarf as well.",
          number: 26,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "Yeah, that's easy enough.",
        "They can be streaming out behind the people to suggest they're skating really fast.",
      ],
    },

    {
      speaker: "JEREMY",
      text: ["Great. Well, that's all on the drawings."],
    },

    {
      speaker: "HELEN",
      text: [
        "Right.",
        "So you've finished writing your story, and I just need to finish illustrating it.",
        "And my story and your drawings are done.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "So, the next thing is to decide what exactly we need to write about in the report that goes with the stories, and how we're going to divide the work.",
      ],
    },

    {
      speaker: "JEREMY",
      text: ["Right, Helen."],
    },

    {
      speaker: "HELEN",
      text: [
        "What do you think about including a section on how we planned the project as a whole, Jeremy?",
        "That's probably quite important.",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "Yeah, well you've had most of the good ideas so far.",
        {
          text: "How do you feel about drafting something?",
          number: 27,
        },
        {
          text: "Then we can go through it together and discuss it.",
          number: 27,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "OK, that seems reasonable.",
        "And I could include something on how we came up with the ideas for our two stories, couldn't I?",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        {
          text: "Well, I've started writing something about that, so why don't you do the same,and we can include the two things.",
          number: 28,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "Right.",
        "So what about our interpretation of the stories?",
        "Do we need to write about what we think they show, like the value of helping other people, all that sort of thing?",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "That's gonna come up later, isn't it?",
        {
          text: "I think everyone in the class is going to read each other's stories and come up with their own interpretations.",
          number: 29,
        },
        {
          text: "Which we're going to discuss.",
          number: 29,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "Oh, I missed that. So it isn't going to be part of the report at all.",
      ],
    },

    {
      speaker: "JEREMY",
      text: [
        "No, but we need to write about the illustrations because they're an essential element of children's experience of reading the stories.",
        {
          text: "It's probably easiest for you to write that section, as you know more about drawing than I do.",
          number: 30,
        },
      ],
    },

    {
      speaker: "HELEN",
      text: [
        "Maybe, but I find it quite hard to write about.",
        "I'd be happier if you did it.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 3.",
        "You now have half a minute to check your answers.",
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
      if (speaker === "JEREMY") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "HELEN") {
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
    21: "organisms",
    22: "left",
    23: "time",
    24: "waves",
    25: "beach",
    26: "photos",
    27: "A", // Helen only
    28: "B", // Colin only
    29: "D", // Neither Helen nor Jeremy
    30: "A", // Helen only
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
    localStorage.setItem("/2018/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2018/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 1/listening");
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
                {renderText("Cookery Classes")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-lg cursor-pointer"
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
          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 21-26")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Write")}{" "}
              <span className="font-bold">{renderText("ONLY ONE WORD")}</span>{" "}
              {renderText("for each answer.")}
            </h3>
            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 text-lg font-bold p-2">
                    {renderText("Subject of drawing")}
                  </th>
                  <th className="border border-gray-400 text-lg font-bold p-2">
                    {renderText("Change to be made")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Row 1: Q21 & Q22 */}
                <tr>
                  <td className="border p-2">
                    {renderText("surrounded by trees")}
                    <br />
                    {renderText("Add Malcolm and a")}
                    <button
                      onClick={() => toggleButton(21)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      21
                    </button>
                    <input
                      value={userAnswers[21] || ""}
                      onChange={(e) => handleInputChange(21, e.target.value)}
                      className="w-[110px] border rounded px-2 py-1"
                    />
                  </td>

                  <td className="border p-2">
                    {renderText("Add Malcolm and a")}
                    <br />
                    {renderText("noticing him")}
                    <button
                      onClick={() => toggleButton(22)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      22
                    </button>
                    <input
                      value={userAnswers[22] || ""}
                      onChange={(e) => handleInputChange(22, e.target.value)}
                      className="w-[110px] border rounded px-2 py-1"
                    />
                  </td>
                </tr>

                {/* Row 2: Q23 & Q24 */}
                <tr>
                  <td className="border p-2">
                    {renderText("People who are outside the forest")}
                    <br />
                    {renderText("Add Malcolm sitting on a tree trunk and")}
                    <button
                      onClick={() => toggleButton(23)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      23
                    </button>
                    <input
                      value={userAnswers[23] || ""}
                      onChange={(e) => handleInputChange(23, e.target.value)}
                      className="w-[110px] border rounded px-2 py-1"
                    />
                  </td>

                  <td className="border p-2">
                    {renderText("Add Malcolm sitting on a tree trunk and")}
                    <br />
                    {renderText("crying")}
                    <button
                      onClick={() => toggleButton(24)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      24
                    </button>
                    <input
                      value={userAnswers[24] || ""}
                      onChange={(e) => handleInputChange(24, e.target.value)}
                      className="w-[110px] border rounded px-2 py-1"
                    />
                  </td>
                </tr>

                {/* Row 3: Q25 & Q26 */}
                <tr>
                  <td className="border p-2">
                    {renderText("Ice-skaters on")}
                    <br />
                    {renderText("covered with ice")}
                    <button
                      onClick={() => toggleButton(25)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      25
                    </button>
                    <input
                      value={userAnswers[25] || ""}
                      onChange={(e) => handleInputChange(25, e.target.value)}
                      className="w-[110px] border rounded px-2 py-1"
                    />
                  </td>

                  <td className="border p-2">
                    {renderText("Add a")}
                    <br />
                    {renderText("for each person")}
                    <button
                      onClick={() => toggleButton(26)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      26
                    </button>
                    <input
                      value={userAnswers[26] || ""}
                      onChange={(e) => handleInputChange(26, e.target.value)}
                      className="w-[110px] border rounded px-2 py-1"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* second */}
          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 27-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "Who is going to write each of the following parts of the report?"
                )}
                <br /> <br />
                {renderText("Choose the correct letter, ")}{" "}
                <span className="font-bold mr-2">{renderText("A-D")}</span>{" "}
                {renderText("next to Questions 27-30.")}
              </h3>

              <div className="flex items-center justify-center">
                <div className="text-center border-2 border-black p-4 space-y-2">
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-lg font-bold text-center">
                      {renderText("Parts of the report")}
                    </h1>

                    <li className="text-lg">{renderText("A. Helen only")}</li>
                    <li className="text-lg">{renderText("B. Jeremy only")}</li>
                    <li className="text-lg">
                      {renderText("C. both Helen and Jeremy")}
                    </li>
                    <li className="text-lg">
                      {renderText("D. neither Helen nor Jeremy")}
                    </li>
                  </ul>
                </div>
              </div>

              <br />
            </div>

            <div className="space-y-2">
              {/* 27 */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("27.")}</span>
                <span className="text-lg">
                  {renderText("how they planned the project")}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[27] || ""}
                    onChange={(e) => handleInputChange(27, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("27")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* 28 */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("28.")}</span>
                <span className="text-lg">
                  {renderText("how they had ideas for their stories")}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[28] || ""}
                    onChange={(e) => handleInputChange(28, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("28")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* 29 */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("29.")}</span>
                <span className="text-lg">
                  {renderText("an interpretation of their stories")}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[29] || ""}
                    onChange={(e) => handleInputChange(29, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("29")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* 30 */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("30.")}</span>
                <span className="text-lg">
                  {renderText("comments on the illustrations")}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[30] || ""}
                    onChange={(e) => handleInputChange(30, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("30")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
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
                    All Answers (1-10)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
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
      <Listening3Pagination2016></Listening3Pagination2016>
    </div>
  );
};

export default Test1Listening2018;
