import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2025 from "../Pagination 2025/Listening2Pagination2025";

const Listening2Part32025 = () => {
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
        "Part 3. You will hear two students called Rosie and Colin discussing their human geography assignment.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Colin, I'm really struggling to think of a topic for our human geography assignment.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Me too, Rosie.",
        "I'll tell you what, let's think about the different aspects of human geography,",
        "and see if we can narrow the topic down a bit to help us decide.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "OK.",
        "So one aspect is population.",
        "That would be all about population density and migration and so on,",
        "lots of facts and statistics, maybe a bit boring.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        {
          text: "Yeah, but quite straightforward to find on the internet.",
          number: 21,
        },
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Suppose so.",
        "How about health?",
        "I'd never thought about the links between that and geography until Professor Lee gave us that lecture on cholera.",
        "How in the 19th century, a physician used street plans and plans of water supplies to find the source of a cholera epidemic.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        {
          text: "Yes, fascinating, wasn't it?",
          number: 22,
        },
        "Or we could do something more general like economies.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "So how financial and commercial factors are linked to the physical environment?",
      ],
    },
    {
      speaker: "COLIN",
      text: ["Yeah."],
    },
    {
      speaker: "ROSIE",
      text: [
        {
          text: "I thought that had been taken off the syllabus for this year.",
          number: 23,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: ["Has it?"],
    },
    {
      speaker: "ROSIE",
      text: ["I'm not sure, but it might be best to avoid it."],
    },
    {
      speaker: "COLIN",
      text: [
        "Ok, maybe we could do something on culture.",
        "We had that lecture about culture and geography last week.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        {
          text: "I didn't get much out of that.",
          number: 24,
        },
        "It was all so general, and the lecturer didn't give any useful examples.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["Yeah, I hardly took any notes.", "It didn't seem worth it."],
    },
    {
      speaker: "ROSIE",
      text: ["Me neither."],
    },
    {
      speaker: "COLIN",
      text: [
        "We could focus on poverty, that's something that's a global problem.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        {
          text: "The trouble is, Doctor Lee was saying that you have to be careful with some of the figures relating to poverty – they're sometimes deliberately manipulated.",
          number: 25,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: ["You mean the information gets changed for political reasons?"],
    },
    {
      speaker: "ROSIE",
      text: ["That sort of thing, yes."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "So what are we gonna do our assignment on?",
        "I'll tell you what, one of the possibilities we haven't discussed is urbanization,",
        "and now over half the world's population lives in cities.",
        "That's really important.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["OK, good idea, Rosie.", "Let's do that."],
    },
    {
      speaker: "ROSIE",
      text: ["I love living in a big city, but of course there are problems."],
    },
    {
      speaker: "COLIN",
      text: ["Things like theft and robbery."],
    },
    {
      speaker: "ROSIE",
      text: [
        "Yes, but where I come from that's linked to another more serious issue,",
        {
          text: "which is that a lot of people don't have jobs.",
          number: 26,
        },
        "That's getting worse and worse,",
        "and we also still have quite a lot of people who are homeless,",
        "though that's not quite so bad as it was.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "It'd be nice to talk about some positive developments,",
        "like some of the new developments on the outskirts of cities.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Yeah, they've opened some massive new shopping centres outside my city.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Yeah, the same with mine.",
        "But it's meant a lot of the shops in the city centre are closing down,",
        {
          text: "but the outskirts are ideal for buildings that need a lot of space, like for conferences.",
          number: 27,
        },
        "They've opened a couple of big ones.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Yes, we've got some too.",
        "It'd be nicer to have more facilities for things like football too,",
        "but that's not happening where I live.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["Same in my area."],
    },
    {
      speaker: "ROSIE",
      text: [
        "We could include something about developing disused industrial sites.",
        "It seems like a good idea, because you're not doing any harm to the natural environment.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["Yeah, but aren't the buildings architecturally significant?"],
    },
    {
      speaker: "ROSIE",
      text: [
        "Not really.",
        "And what people forget is that they often used quite dangerous materials,",
        "chemicals and things, which haven't been properly cleared away,",
        "so the whole site has to be made safe.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        {
          text: "Hmm, that can't be cheap.",
          number: 28,
        },
        "And I bet it's often not budgeted for.",
      ],
    },
    {
      speaker: "ROSIE",
      text: ["You're right."],
    },
    {
      speaker: "COLIN",
      text: ["Have you read about Masdar City?"],
    },
    {
      speaker: "ROSIE",
      text: [
        "In Abu Dhabi?",
        "Yes, it was designed to be a green city, wasn't it?",
        {
          text: "That might be a good example of a city which set out to depend entirely on renewable energy.",
          number: 29,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Yes, we should say something about that.",
        "It was designed to be totally pedestrianised too, wasn't it?",
        "With the transport underground.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Yes, and they had big plans for recycling to reduce waste to the lowest possible level.",
        "But let's stick to talking about power sources.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Then there's that eco-town in England, Greenhill Abbots.",
        "It set out to conform to the usual principles, sustainability and so on.",
        "A lot of people were against it at first.",
        "They said the plans were unrealistic.",
        {
          text: "I'm not sure how far they've got with it.",
          number: 30,
        },
        "I'll check.",
      ],
    },
    {
      speaker: "ROSIE",
      text: [
        "Right, so it looks as if we have a sort of plan,",
        "and we can work from that.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
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
      if (speaker === "ROSIE") {
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

  const correctAnswers = {
    // Questions 21–25 (dropdown, A–G)
    21: "D", // Population → It will be easy to find facts about this
    22: "G", // Health → The information provided about this was interesting
    23: "B", // Economies → This may not be relevant to their course
    24: "A", // Culture → The information given about this was too vague
    25: "E", // Poverty → The facts about this may not be reliable

    // Questions 26–30 (radio buttons, A–C)
    26: "C", // unemployment
    27: "A", // conference centres
    28: "A", // have unexpected costs
    29: "B", // sustainable energy use
    30: "C", // how much progress has been made
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "17-18" || id === "19-20") {
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
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
                {renderText(
                  "Rosie and Colin's Discussion on Human Geography Assignment",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–30")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Human Geography Assignment")}
            </h1>

            {/* ================= Questions 21–25 (Dropdown) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 21–25")}
              </h2>

              <p>
                {renderText(
                  "What is Rosie and Colin's opinion about each of the following aspects of human geography?",
                )}
              </p>
              <p>{renderText("Choose the correct letter, A–G.")}</p>

              {/* Opinion List */}
              <div className="space-y-1 border p-4 max-w-[600px] mx-auto mt-4">
                <h3 className="font-bold text-xl text-center">
                  {renderText("Opinions")}
                </h3>

                {[
                  "The information given about this was too vague.",
                  "This may not be relevant to their course.",
                  "This will involve only a small number of statistics.",
                  "It will be easy to find facts about this.",
                  "The facts about this may not be reliable.",
                  "No useful research has been done on this.",
                  "The information provided about this was interesting.",
                ].map((text, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <p key={idx}>
                      <strong>{letter}.</strong> {renderText(text)}
                    </p>
                  );
                })}
              </div>
              <h2 className="font-bold text-xl mt-4">
                {renderText("Aspects of human geography")}
              </h2>
              {[
                { num: 21, label: "Population" },
                { num: 22, label: "Health" },
                { num: 23, label: "Economies" },
                { num: 24, label: "Culture" },
                { num: 25, label: "Poverty" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-4 mt-4">
                  <span className="font-bold">{num}.</span>
                  <div>
                    <span className="w-[200px]">{renderText(label)}</span>
                  </div>

                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 26–30 (Radio) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 26–30")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  num: 26,
                  question:
                    "Rosie says that in her own city the main problem is",
                  options: ["crime.", "housing.", "unemployment."],
                },
                {
                  num: 27,
                  question:
                    "What recent additions to the outskirts of their cities are both students happy about?",
                  options: [
                    "conference centres",
                    "sports centres",
                    "retail centres",
                  ],
                },
                {
                  num: 28,
                  question:
                    "The students agree that developing disused industrial sites may",
                  options: [
                    "have unexpected costs.",
                    "damage the urban environment.",
                    "destroy valuable historical buildings.",
                  ],
                },
                {
                  num: 29,
                  question:
                    "The students will mention Masdar City as an example of an attempt to achieve",
                  options: [
                    "daily collections for waste recycling.",
                    "sustainable energy use.",
                    "free transport for everyone.",
                  ],
                },
                {
                  num: 30,
                  question:
                    "When discussing the ecotown of Greenhill Abbots, Colin is uncertain about",
                  options: [
                    "what its objectives were.",
                    "why there was opposition to it.",
                    "how much progress has been made.",
                  ],
                },
              ].map(({ num, question, options }) => (
                <div key={num} className="mt-6">
                  <p className="font-bold text-lg">
                    {num}. {renderText(question)}
                  </p>

                  <div className="space-y-2 mt-2">
                    {options.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx);
                      return (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={num}
                            value={value}
                            checked={userAnswers[num] === value}
                            onChange={() => handleInputChange(num, value)}
                          />
                          <span className="font-semibold">{value}.</span>
                          <span>{renderText(opt)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
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
                      All Answers (21–30)
                    </h3>

                    <ul className="space-y-3">
                      {Array.from({ length: 10 }, (_, i) => i + 21).map(
                        (num) => {
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
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
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
      <Listening2Pagination2025></Listening2Pagination2025>
    </div>
  );
};

export default Listening2Part32025;
