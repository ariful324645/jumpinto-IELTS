import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2013 from "../Pagination 2013/Listening4Pagination2013";

const Listening4Part42013 = () => {
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
        "Section 4. You will hear a talk about a project on the wildlife found in city gardens in Britain.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Good morning. Today I'd like to present the findings of our Year 2 project on wildlife found in gardens throughout our city.",
        "I'll start by saying something about the background to the project.",
        "Then talk a little bit about our research techniques, and then indicate some of our interim findings.",
        "First of all, how did we choose our topic?",
        "Well, there are four of us in the group, and one day while we were discussing a possible focus,",
        "two of the group mentioned that they had seen yet more sparrow hawks - one of Britain's most interesting birds of prey - in their own city center gardens, and wondered why they were turning up in these gardens in great numbers.",
        {
          text: "We were all very engaged by the idea of why wild animals would choose to inhabit a city garden.",
          number: 31,
        },
        "Why is it so popular with wildlife when the countryside itself is becoming less so?",
        "The first thing we did was to establish what proportion of the urban land is taken up by private gardens.",
        {
          text: "We estimated that it was about 1/5, and this was endorsed by looking at large scale usage maps in the town land survey office.",
          number: 32,
        },
        "24% to be precise.",
        "Our own informal discussions with neighbors and friends led us to believe that many garden owners had interesting experiences to relate regarding wild animal sightings.",
        "So we decided to survey garden owners from different areas of the city.",
        "Just over 100 of them completed a survey once every two weeks for 12 months.",
        "Ticking off species they had seen from a pro forma list, and adding the names of any rarer ones.",
        {
          text: "Meanwhile, we were doing our own observations in selected gardens throughout the city.",
          number: 33,
        },
        "We deliberately chose smaller ones because they were by far the most typical in the city.",
        {
          text: "The whole point of the project was to look at the norm, not the exception.",
          number: 34,
        },
        "Alongside this primary research on urban gardens we were studying a lot of books about the decline of wild animals in the countryside, and thinking of possible causes for this.",
        { text: "So what did we find?", number: 35 },
        "Well, so much that I just won't have time to tell you about here.",
        "If you're interested in reading our more comprehensive findings, we've produced detailed graphic representations on the college website, and of course any of the group would be happy to talk to you about them.",
        "Just email us.",
        "What we've decided to present today is information about just three species, because we felt these gave a good indication of the processes at work in rural and urban settings as a whole.",
        {
          text: "The first species to generate a lot of interesting information was frogs, and there was a clear pattern here.",
          number: 36,
        },
        "They proliferate where there is suitable water, garden ponds are on the increase.",
        "Rural ponds are disappearing, leading to massive migration to the towns.",
        "Hedgehogs are also finding it easier to live in urban areas this time because their predators are not finding it quite so attractive to leave their rural environment.",
        {
          text: "So hedgehogs have a better survival rate in cities.",
          number: 37,
        },
        "We had lots of sightings, so all in all we had no difficulties with our efforts to count their numbers precisely.",
        {
          text: "Our final species is the finest of bird singers, the song thrush.",
          number: 38,
        },
        "On the decline in the countryside, they are experiencing a resurgence in urban gardens, because these days gardeners are buying lots of different plants, which means there's an extensive range of seeds around, which is what they feed on.",
        {
          text: "Another factor is the provision of nesting places, which is actually better in gardens than the countryside.",
          number: 39,
        },
        "Hard to believe it, but it's true.",
        "Incidentally, we discovered that a massive new survey on song thrushes is about to be launched, so you should keep an eye open for that.",
        "Now, I'd be happy to answer any questions you may have.",
        { text: "That is the end of Section 4.", number: 40 },
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
                : [p],
            )
          : [part],
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
      if (speaker === "WOMAN") {
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
    // Questions 31–36 (Wildlife in city gardens)
    31: "B", // They were interested in the effects of city growth
    32: "B", // taking large-scale photos
    33: "B", // keep a record of animals they saw
    34: "B", // which they considered to be representative
    35: "B", // urban animal populations
    36: "A", // a lot of data has been obtained about them

    // Questions 37–40 (Table – ONE WORD ONLY)
    37: "cats", // safer from cats
    38: "count", // easy to count
    39: "estimate", // them accurately
    40: "food", // to eat
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "5-6") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
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
                {renderText("Healthcare Options and Talks in the Area")}
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
            {renderText("Questions 31–40")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            {/* ================= Questions 31–36 (Radio Buttons) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-4">
                {renderText("Questions 31–36")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  num: 31,
                  question: "What led the group to choose their topic?",
                  options: [
                    "They were concerned about the decline of one species.",
                    "They were interested in the effects of city growth.",
                    "They wanted to investigate a recent phenomenon.",
                  ],
                },
                {
                  num: 32,
                  question:
                    "The exact proportion of land devoted to private gardens was confirmed by",
                  options: [
                    "consulting some official documents.",
                    "taking large-scale photos.",
                    "discussions with town surveyors.",
                  ],
                },
                {
                  num: 33,
                  question: "The group asked garden owners to",
                  options: [
                    "take part in formal interviews.",
                    "keep a record of animals they saw.",
                    "get in contact when they saw a rare species.",
                  ],
                },
                {
                  num: 34,
                  question: "The group made their observations in gardens",
                  options: [
                    "which had a large number of animal species.",
                    "which they considered to be representative.",
                    "which had stable populations of rare animals.",
                  ],
                },
                {
                  num: 35,
                  question: "The group did extensive reading on",
                  options: [
                    "wildlife problems in rural areas.",
                    "urban animal populations.",
                    "current gardening practices.",
                  ],
                },
                {
                  num: 36,
                  question:
                    "The speaker focuses on three animal species because",
                  options: [
                    "a lot of data has been obtained about them.",
                    "the group were most interested in them.",
                    "they best indicated general trends.",
                  ],
                },
              ].map(({ num, question, options }) => (
                <div key={num} className="mt-4">
                  <p className="font-semibold">
                    {num}. {renderText(question)}
                  </p>
                  <div className="flex flex-col mt-1 ml-4 gap-2">
                    {options.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <label
                          key={letter}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`q${num}`}
                            value={letter}
                            checked={userAnswers[num] === letter}
                            onChange={(e) =>
                              handleInputChange(num, e.target.value)
                            }
                            className="accent-blue-600"
                          />
                          <span>
                            {letter}. {renderText(opt)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 37–40")}
              </h2>
              <p className="mb-4">
                {renderText("Complete the table below.")} <br />
                <b>{renderText("Write ONE WORD ONLY for each answer")}</b>.
              </p>

              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      "Animals",
                      "Reason for population increase in gardens",
                      "Comments",
                    ].map((h) => (
                      <th key={h} className="border px-4 py-2 text-left">
                        {renderText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="border px-4 py-2">
                      <div className="flex">
                        {" "}
                        <button
                          onClick={() => toggleButton(37)}
                          className={`mx-2 w-8 h-8 rounded-full border-2 ${
                            activeButtons[37]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          {renderText("37")}
                        </button>
                        <input
                          value={userAnswers[37] || ""}
                          onChange={(e) =>
                            handleInputChange(37, e.target.value)
                          }
                          className="border px-2 py-1 w-24 mx-2"
                        />
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <h2>{renderText("suitable stretches of water")}</h2>
                    </td>
                    <td className="border px-4 py-2">
                      {renderText("massive increase in urban population")}
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2">
                      {renderText("Hedgehogs")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderText("safer from")}
                      <button
                        onClick={() => toggleButton(38)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[38]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        {renderText("38")}
                      </button>
                      <input
                        value={userAnswers[38] || ""}
                        onChange={(e) => handleInputChange(38, e.target.value)}
                        className="border px-2 py-1 w-24 mx-2"
                      />
                      {renderText("when in cities")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderText("easy to")}
                      <button
                        onClick={() => toggleButton(39)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[39]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        {renderText("39")}
                      </button>
                      <input
                        value={userAnswers[39] || ""}
                        onChange={(e) => handleInputChange(39, e.target.value)}
                        className="border px-2 py-1 w-24 mx-2"
                      />
                      {renderText("them accurately")}
                    </td>
                  </tr>

                  {/* Row 3 */}

                  {/* Row 4 */}
                  <tr className="bg-gray-50">
                    <td className="border px-4 py-2">
                      {renderText("Song thrushes")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderText("a variety of")}
                      <button
                        onClick={() => toggleButton(40)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[40]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        {renderText("40")}
                      </button>
                      <input
                        value={userAnswers[40] || ""}
                        onChange={(e) => handleInputChange(40, e.target.value)}
                        className="border px-2 py-1 w-24 mx-2"
                      />
                      {renderText("to eat")} <br />
                      {renderText("more nesting places available")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderText("large survey starting soon")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ================= Submit Button ================= */}
            <div className="mt-10">
              {!showResult ? (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setShowResult(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                  >
                    {renderText("Submit Answers")}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Result Card */}
                  <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {renderText("Result")}
                    </h1>
                    <p className="text-green-600 text-2xl font-semibold">
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (21–30)")}
                    </h3>
                    <ul className="space-y-3">
                      {Array.from({ length: 10 }, (_, i) => i + 31).map(
                        (num) => {
                          const user = userAnswers[num];
                          const correct = correctAnswers[num];

                          const isCorrect = (() => {
                            if (Array.isArray(correct)) {
                              return (
                                Array.isArray(user) &&
                                user.length === correct.length &&
                                correct.every((val) => user.includes(val))
                              );
                            } else {
                              return (
                                user?.trim().toLowerCase() ===
                                correct?.trim().toLowerCase()
                              );
                            }
                          })();

                          const noAnswer = !user;

                          const userAnswerDisplay = Array.isArray(user)
                            ? user.join(", ")
                            : user?.trim() || "";
                          const correctAnswerDisplay = Array.isArray(correct)
                            ? correct.join(", ")
                            : correct?.trim();

                          return (
                            <li
                              key={num}
                              className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                            >
                              <div className="flex items-center gap-2">
                                {isCorrect && (
                                  <FaDotCircle className="text-green-600 text-xl font-bold" />
                                )}
                                {!isCorrect && (
                                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                    <ImCross className="text-white text-sm font-bold" />
                                  </div>
                                )}
                                <p className="font-bold">Q{num}:</p>
                              </div>

                              <p className="ml-8">
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
                                {noAnswer ? (
                                  <span className="italic">
                                    No answer provided
                                  </span>
                                ) : (
                                  userAnswerDisplay
                                )}
                              </p>

                              <p className="ml-8">
                                <span className="font-semibold text-green-600">
                                  Correct Answer:
                                </span>{" "}
                                {correctAnswerDisplay}
                              </p>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening4Pagination2013></Listening4Pagination2013>
    </div>
  );
};

export default Listening4Part42013;
