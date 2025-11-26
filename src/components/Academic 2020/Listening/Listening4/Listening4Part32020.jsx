import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening4Pagination2020 from "../../Pagination/Listening4Pagination/Listening4Pagination2020";

const Listening4Part32020 = () => {
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
        "Part 3. You will hear two students of social history called Annie and Jack discussing their presentation about refrigeration.",
        "You have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "OK, Jack. Before we plan our presentation about refrigeration, let's discuss what we've discovered so far.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Fine, Annie. Though I have to admit I haven't done much research yet.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "Nor me. But I found an interesting article about ice houses. I'd seen some 18th- and 19th-century ones here in the UK, so I knew they were often built in a shady area. Or underground, close to lakes that might freeze in the winter. Then blocks of ice could be cut and stored in the icehouse..",
        {
          text: " But I didn't realize that insulating the blocks with straw or sawdust meant they didn't melt for months",
          number: 21,
        },
        "The ancient Romans had refrigeration too.",
      ],
    },

    {
      speaker: "JACK",
      text: ["I didn't know that."],
    },

    {
      speaker: "ANNIE",
      text: [
        "Yes, pits were dug in the ground, and snow was imported from the mountains. Even though they were at quite a distance, the snow was stored in the pits.",
        {
          text: " Ice formed at the bottom of it, both the ice and the snow were then sold.",
          number: 22,
        },
        "The ice cost more than the snow, and my guess is that only the wealthy members of society could afford it.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "I wouldn't be surprised. I also came across an article about modern domestic fridges. Several different technologies are used, but they were too complex for me to understand.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "You have to wonder what happens when people get rid of old ones.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "You mean because the gases in them are harmful for the environment?",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "Exactly.",
        {
          number: 23,
          text: " At least there are now plenty of organizations that will recycle most of the components safely, but of course some people just dump old fridges in the countryside.",
        },
      ],
    },

    {
      speaker: "JACK",
      text: [
        "It's hard to see how they can be stopped unfortunately. In the UK, we get rid of 3 million a year altogether.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "That sounds a lot, especially because fridges hardly ever break down.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "That's right. In this country, we keep domestic fridges for 11 years on average. And a lot last for 20 or more. ",
        {
          text: "So if you divide the cost by the number of years you can use a fridge, they're not expensive compared with some household appliances.",
          number: 24,
        },
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "True. I suppose manufacturers encourage people to spend more by making them different colors and designs. I'm sure when my parents bought their first fridge, they had hardly any choice.",
      ],
    },

    {
      speaker: "JACK",
      text: ["Yes, there's been quite a change."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Right, let's make a list of topics to cover in our presentation, and decide who's going to do more research on them. Then later we can get together and plan the next step.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "OK, how about starting with how useful refrigeration is, and the range of goods that are refrigerated nowadays? Because of course, it's not just food and drinks.",
      ],
    },

    {
      speaker: "JACK",
      text: ["No, I suppose flowers and medicines are refrigerated, too."],
    },

    {
      speaker: "ANNIE",
      text: [
        { text: "And computers. I could do that.", number: 25 },
        "Unless you particularly want to.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "No, that's fine by me. What about the effects of refrigeration on people's health? After all, some of the chemicals used in the 19th century were pretty harmful. But there have been lots of benefits too, like always having access to fresh food. Do you fancy dealing with that?",
      ],
    },

    {
      speaker: "ANNIE",
      text: ["I'm not terribly keen to be honest. Hmm, nor me."],
    },

    {
      speaker: "JACK",
      text: ["My mind just goes blank when I read anything about chemicals."],
    },

    {
      speaker: "ANNIE",
      text: [
        {
          text: "Oh, all right then, I'll do you a favor, but you owe me, Jack.",
          number: 26,
        },
        "OK?What about the effects on food producers, like farmers in poorer countries being able to export their produce to developed countries? Something for you maybe?",
      ],
    },

    {
      speaker: "JACK",
      text: [
        { number: 27, text: "I don't mind, it should be quite interesting." },
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "I think we should also look at how refrigeration has helped whole cities, like Las Vegas, which couldn't exist without refrigeration, because it's in the middle of a desert.",
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Right. I had a quick look at an economics book in the library that's got a chapter about this sort of thing. I could give you the title if you want to do this section.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "Not particularly to be honest. I find economics books pretty heavy going as a rule.",
      ],
    },

    {
      speaker: "JACK",
      text: [{ text: "OK, leave it to me then.", number: 28 }],
    },

    {
      speaker: "ANNIE",
      text: [
        "Thanks. Then there's transport, and the difference that refrigerated trucks have made..",
        { text: " I wouldn't mind having a go at that", number: 29 },
      ],
    },

    {
      speaker: "JACK",
      text: [
        "Don't forget trains too. I read something about milk and butter being transported in refrigerated railroad cars in the USA, right back in the 1840s.",
      ],
    },

    {
      speaker: "ANNIE",
      text: ["I hadn't thought of trains. Thanks."],
    },

    {
      speaker: "JACK",
      text: [
        "Should we have a separate section on domestic fridges? After all, they're something everyone's familiar with.",
      ],
    },

    {
      speaker: "ANNIE",
      text: [
        "What about splitting it into two? ",
        {
          number: 30,
          text: "You could investigate 19th and 20th century fridges, and I'll concentrate on what's available these days, and how manufacturers differentiate their products from those of their competitors.",
        },
      ],
    },

    {
      speaker: "JACK",
      text: ["OK, that suits me."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
      ],
    },
  ];

  // different option
  const questions = [
    "What did Annie discover from reading about icehouses?",
    "What point does Annie make about refrigeration in ancient Rome?",
    "In connection with modern refrigerators, both Annie and Jack are worried about",
    "What do Jack and Annie agree regarding domestic fridges?",
  ];

  const options = [
    [
      "A. why they were first created",
      " B. how the ice was kept frozen",
      " C. where they were located",
    ],
    [
      "A. It became a commercial business.",
      " B. It used snow from nearby.",
      " C. It took a long time to become popular.",
    ],
    [
      "A. the complexity of the technology.",
      " B. the fact that some are disposed of irresponsibly.",
      " C. the large number that quickly break down",
    ],
    [
      "A. They are generally good value for money.",
      " B. There are plenty of useful variations.",
      " C. They are more useful than other domestic appliances.",
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
      const answerKey = qIndex + 21;
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
      if (speaker === "JACK") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "ANNIE") {
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
    21: "B. how the ice was kept frozen",
    22: "A. It became a commercial business.",
    23: "B. the fact that some are disposed of irresponsibly.",
    24: "A. they are generally good value for money.",
    25: "A",
    26: "A",
    27: "B",
    28: "B",
    29: "A",
    30: "C",
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
            <h1 className="text-xl font-bold">{renderText("    PART 3")}</h1>
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
                {renderText("Presentation about Refrigeration")}
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

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {" "}
              {renderText(" Questions 21-24")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}{" "}
              <span className="font-bold"> {renderText("    A, B or C")}</span>.
            </p>

            <h1 className="font-bold text-2xl text-center">
              {renderText("  Presentation about refrigeration")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

                      return (
                        <li
                          key={oIndex}
                          onClick={() => handleOptionClick(qIndex, option)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 inline-block ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-700"
                            }`}
                          ></span>

                          <span
                            className={
                              isSelected ? "text-blue-500" : "text-black"
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 2st section */}

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 25-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What topic do Cathy and Graham choose to illustrate with each novel?"
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-H")}</span>{" "}
                {renderText("next to Questions 25-30.")}
              </h3>
              <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
                <div className="text-center">
                  <h1 className="text-xl font-bold mb-5">People</h1>

                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. Annie ")}</li>
                    <li>{renderText("B. Jack ")}</li>
                    <li>{renderText("C. both Annie and Jack")} </li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 1 ---------- */}
            <h1 className="text-lg font-bold">Novels by Dickens</h1>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("25.")}</span>
              <span>{renderText("the goods that are refrigerated")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="1">{renderText("25")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span>{renderText("the effects on health")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="2">{renderText("26")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span>{renderText("the impact on food producers")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="3">{renderText("27")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              {renderText("the impact on cities")}
              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="4">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("refrigerated transport")}
              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="5">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 6 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("domestic fridges")}
              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="6">{renderText("30")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
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
                    All Answers (21–30)
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
      <Listening4Pagination2020></Listening4Pagination2020>
    </div>
  );
};

export default Listening4Part32020;
