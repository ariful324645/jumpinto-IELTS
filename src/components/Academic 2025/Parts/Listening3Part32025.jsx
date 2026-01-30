import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2025 from "../Pagination 2025/Listening3Pagination2025";

const Listening3Part32025 = () => {
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
        "Part 3. You will hear two theater studies students, Maya and Finn, discussing their project on theater programs.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully and answer questions 21 to 26.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "So Finn, I've done as much as I can for our project on theater programs. How's your research coming along?",
      ],
    },
    {
      speaker: "FINN",
      text: [
        "Ok, Maya. I didn't know theater programs are called playbills in the USA, till I started looking into the topic.",
        "Even though I struggled to find many useful websites, I'm glad we picked this subject.",
        "No one else on the course is doing the same as us, although it is one of the research areas of the module convenor.",
        { text: "Finn was pleased with the topic.", number: 21 },
      ],
    },
    {
      speaker: "MAYA",
      text: ["That might actually put some people off."],
    },
    {
      speaker: "FINN",
      text: [
        "Huh, I suppose so. Anyway, I hadn't realized there are actually companies specializing in creating theater programs.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "Yes, they're quite common nowadays. Contrary to what many people think, theatres don't hire people to do the programs.",
        { text: "Maya's mistaken belief about theater programs.", number: 22 },
        "In fact, companies buy the rights to publish programs on the theatre's behalf and make their money selling advertising space within the program booklet.",
      ],
    },
    {
      speaker: "FINN",
      text: ["It must be easier for theaters to do it that way."],
    },
    {
      speaker: "MAYA",
      text: ["Yes."],
    },
    {
      speaker: "FINN",
      text: [
        "I remember reading something about programs in early British theater. It said that the cast was always very important.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "Yeah, audiences were very familiar with leading actors, and big names would draw huge crowds.",
      ],
    },
    {
      speaker: "FINN",
      text: [
        "But I hadn't realized that if the program named a famous actor, that's who the public expected to perform, and if that didn't happen, people accused the theater of breaking their agreement with the audience.",
        {
          text: "Finn was surprised by early British theatre programs.",
          number: 23,
        },
        "They would demand refunds, and if they didn't get them, there were riots.",
      ],
    },
    {
      speaker: "MAYA",
      text: ["Outrageous. That'd never happen now."],
    },
    {
      speaker: "FINN",
      text: [
        "No, people are too polite, even when they're disappointed if the star of the show misses a performance.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "We should definitely include that information about early audiences in our project.",
        "I also think it's important to mention that lots of ordinary people at that time were illiterate, so theater programs were of limited value in advertising plays.",
        "When a company of actors arrived in a town, they'd parade around the streets in their costumes, beating drums and announcing their upcoming performances.",
        {
          text: "Maya explains why the project should include info about actors' practices.",
          number: 24,
        },
      ],
    },
    {
      speaker: "FINN",
      text: [
        "Interesting. I couldn't imagine that happening now either. Hmm.",
        "There's also an interesting comparison to make between 18th and 19th century programs.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "Yes. And unlike programs from the 18th century, they always used color.",
        "And there was a greater variety of designs. But personally, I think 18th-century programs were superior, because they told the theater goers so many things, including about the actors.",
        { text: "Finn & Maya discuss 18th-century programs.", number: 25 },
        "And about the writer, the plot, and sometimes the history of the play.",
      ],
    },
    {
      speaker: "FINN",
      text: [
        "That's right. What should we say about theater programs in the 20th century?",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "I reckon the most important thing is the dramatic change they underwent during World War 2.",
        "When the government imposed restrictions on the use of paper.",
        "Yeah, but that was only in the UK; in the USA, programs or rather playbills continued to be published in the same format.",
        "Well, here in the UK, programs became merely a single sheet of paper folded to create 4 pages for text. Hmm.",
        "What I don't really get is that after the war, they didn't go back to being more than one sheet, or change in any way for over 25 years.",
        {
          text: "Maya doesn't fully understand why 20th-century programs changed slowly.",
          number: 26,
        },
      ],
    },
    {
      speaker: "FINN",
      text: ["Hmm, strange."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "I've got some pictures of programs we could include on the slides for our presentation.",
      ],
    },
    {
      speaker: "FINN",
      text: [
        "I found a couple too, Maya. Let's go through and see what we think.",
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "Um, oh, this is an old one, for a play called Ruy Blas.",
        { text: "Comment on Ruy Blas program.", number: 27 },
      ],
    },
    {
      speaker: "FINN",
      text: [
        "Hmm, never heard of that, but the program looks very decorative.",
        "Good enough to put in a frame on the wall.",
      ],
    },
    {
      speaker: "MAYA",
      text: ["The images are just beautiful. Finn, what did you find?"],
    },
    {
      speaker: "FINN",
      text: [
        "I've got some pages from a program for Man of La Mancha. I thought this was a good program to show, not because of the pictures, but because it contains articles written by members of the theater company, so we can learn how the production was created, and the thoughts and feelings of the cast.",
        { text: "Comment on Man of La Mancha program.", number: 28 },
      ],
    },
    {
      speaker: "MAYA",
      text: [
        "Good. I've got a copy of a program that's now in a museum. It's for The Tragedy of Jane Shore, and it's said to be the earliest surviving document to have been printed on Australia's first printing press.",
        { text: "Comment on The Tragedy of Jane Shore program.", number: 29 },
      ],
    },
    {
      speaker: "FINN",
      text: ["Fantastic."],
    },
    {
      speaker: "MAYA",
      text: [
        "Another program to talk about is for the Sailors Festival. It comes from the British Library's digitized collection of programs that was started a few years ago.",
        { text: "Comment on The Sailors' Festival program.", number: 30 },
        "It already comprises over 200,000 programs, which is amazing.",
      ],
    },
    {
      speaker: "FINN",
      text: ["Huh, wish I'd known about it while I was doing my research."],
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
      if (speaker === "JANE") {
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
    // Questions 21–26 (radio buttons, A–C)
    21: "C", // Finn was pleased → did not prove to be difficult to research
    22: "A", // Maya's mistaken belief → theatres pay companies to produce them
    23: "B", // Finn surprised → programmes were given out free of charge
    24: "A", // Maya project explanation → promoted their own plays
    25: "C", // Finn & Maya → eighteenth-century programmes were more informative
    26: "B", // Maya doesn't understand → British theatre programmes failed to develop for so long

    // Questions 27–30 (dropdown, A–F)
    27: "A", // Ruy Blas → Its origin is somewhat controversial
    28: "C", // Man of La Mancha → It was effective at attracting audiences
    29: "B", // The Tragedy of Jane Shore → It is historically significant for a country
    30: "E", // The Sailors' Festival → It contains insights into the show
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
                  "Theater Studies Students' Discussion on Theater Programs",
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
              {renderText("Project on Theatre Programmes")}
            </h1>

            {/* ================= Questions 21–26 (Radio) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 21–26")}
              </h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {[
                {
                  num: 21,
                  question: "Finn was pleased to discover that their topic",
                  options: [
                    "was not familiar to their module leader.",
                    "had not been chosen by other students.",
                    "did not prove to be difficult to research.",
                  ],
                },
                {
                  num: 22,
                  question:
                    "Maya says a mistaken belief about theatre programmes is that",
                  options: [
                    "theatres pay companies to produce them.",
                    "few theatre-goers buy them nowadays.",
                    "they contain far more adverts than previously.",
                  ],
                },
                {
                  num: 23,
                  question:
                    "Finn was surprised that, in early British theatre, programmes",
                  options: [
                    "were difficult for audiences to obtain.",
                    "were given out free of charge.",
                    "were seen as a kind of contract.",
                  ],
                },
                {
                  num: 24,
                  question:
                    "Maya feels their project should include an explanation of why companies of actors",
                  options: [
                    "promoted their own plays.",
                    "performed plays outdoors.",
                    "had to tour with their plays.",
                  ],
                },
                {
                  num: 25,
                  question:
                    "Finn and Maya both think that, compared to nineteenth-century programmes, those from the eighteenth century",
                  options: [
                    "were more original.",
                    "were more colourful.",
                    "were more informative.",
                  ],
                },
                {
                  num: 26,
                  question:
                    "Maya doesn't fully understand why, in the twentieth century,",
                  options: [
                    "very few theatre programmes were printed in the USA.",
                    "British theatre programmes failed to develop for so long.",
                    "theatre programmes in Britain copied fashions from the USA.",
                  ],
                },
              ].map(({ num, question, options }) => (
                <div key={num} className="mt-6">
                  <p className="font-bold text-lg">
                    {num}. {renderText(question)}
                  </p>

                  <div className="space-y-2 mt-2">
                    {options.map((opt, idx) => {
                      const value = String.fromCharCode(65 + idx); // A, B, C
                      return (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`q${num}`}
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

            {/* ================= Questions 27–30 (Dropdown) ================= */}
            <div>
              <h2 className="font-bold text-xl mb-2">
                {renderText("Questions 27–30")}
              </h2>
              <p>{renderText("Choose the correct letter, A–F.")}</p>

              <div className="mt-4 space-y-4">
                {[
                  { num: 27, label: "Ruy Blas" },
                  { num: 28, label: "Man of La Mancha" },
                  { num: 29, label: "The Tragedy of Jane Shore" },
                  { num: 30, label: "The Sailors' Festival" },
                ].map(({ num, label }) => (
                  <div key={num} className="flex items-center gap-4">
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
                      {["A", "B", "C", "D", "E", "F"].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= Submit & Results ================= */}
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
      <Listening3Pagination2025></Listening3Pagination2025>
    </div>
  );
};

export default Listening3Part32025;
