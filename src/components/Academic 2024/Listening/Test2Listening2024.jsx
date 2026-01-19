import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2024 from "../Pagination 2024/Listening2Pagination2024";

const Test2Listening2024 = () => {
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
        "Part 1, you will hear two friends talking about a guitar group.",
        "First, you have some time to look at questions 1 to 6.",
        "Now listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hi, Coleman. How are you?"],
    },
    {
      speaker: "COLEMAN",
      text: ["Good, thanks."],
    },
    {
      speaker: "WOMAN",
      text: [
        "I wanted to have a chat with you, because our friend Josh told me that you've joined a guitar group.",
        "And it sounds interesting. I'd really like to learn myself.",
      ],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Why don't you come along? I'm sure there's room for another person.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Really? So, who runs the classes?"],
    },
    {
      speaker: "COLEMAN",
      text: ["He's called a coordinator. His name's Gary Mathieson."],
    },
    {
      speaker: "WOMAN",
      text: ["Let me note that down. Gary, how do you spell his surname?"],
    },
    {
      speaker: "COLEMAN",
      text: [{ text: "It's MATHIESON.", number: 1 }],
    },
    {
      speaker: "WOMAN",
      text: ["Right, thanks."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "He's retired actually, but he's a really nice guy. And he used to play in a lot of bands.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Thanks. So, how long have you been going?"],
    },
    {
      speaker: "COLEMAN",
      text: ["About a month now."],
    },
    {
      speaker: "WOMAN",
      text: ["And could you play anything before you started?"],
    },
    {
      speaker: "COLEMAN",
      text: ["I knew a few chords, but that's all."],
    },
    {
      speaker: "WOMAN",
      text: ["I'm sure everyone will be better than me."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "That's what I thought too. When I first spoke to Gary on the phone, he said it was a class for beginners, but I was still worried that everyone would be better than me.",
        { text: "But we were all equally hopeless.", number: 2 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, that's reassuring. So, where do you meet?"],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Well, when I joined the group, they were meeting in Gary's home. But as the group got bigger, he decided to book a room at the college in town.",
        { text: "I prefer going there.", number: 3 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I know that place. I used to go to tap dancing classes there when I was at secondary school.",
        "I haven't been since though, and I can't remember what road it's in. Is it Lock Street?",
      ],
    },
    {
      speaker: "COLEMAN",
      text: [
        {
          text: "It's just beyond there, at the bottom of New Street, near the city roundabout.",
          number: 4,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, of course."],
    },
    {
      speaker: "COLEMAN",
      text: ["The guitar club is on the first floor, in room T347."],
    },
    {
      speaker: "WOMAN",
      text: ["Right. And when do you meet? Is it at the weekend?"],
    },
    {
      speaker: "COLEMAN",
      text: [
        "We meet on Thursdays. It used to be 10:30 and that suited me well, but now we meet at 11.",
        {
          text: "The class that's in there before us asked if they could have the room for another 30 minutes.",
          number: 5,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, I see. Well, I'd love to come. But I don't have a guitar."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Well, you can always buy a second-hand one. There's a website called The Perfect Instrument.",
        {
          text: "That sells all kinds of guitars, violins, and so on. I'm sure you'll find something there.",
          number: 6,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["So, what's a typical lesson like with Gary?"],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Well, he always starts by getting us to tune our guitars. That takes about 5 minutes.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Uh huh."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Some people have an app they use, but others do it by ear.",
        {
          text: "Gary goes round and helps them. And while he's doing that, he tells us what he's going to do during the lesson.",
          number: 7,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right."],
    },
    {
      speaker: "COLEMAN",
      text: ["First, we usually spend about 10 minutes doing some strumming."],
    },
    {
      speaker: "WOMAN",
      text: ["So, is that using oh, what are they called plectrums?"],
    },
    {
      speaker: "COLEMAN",
      text: ["Ha, no, we just use our thumbs."],
    },
    {
      speaker: "WOMAN",
      text: ["Ha, much easier."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Gary reminds us where to put our fingers for each chord, and then we play them together. Sometimes we all just start laughing. Because we're so bad at keeping time. ",
        { text: "So Gary starts clapping to help us.", number: 8 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Do you learn to play any songs?"],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Yes. We do at least one song with words and chords. I mean, that's harder than you think.",
        {
          text: "Then he hands out the song, and if there's a new chord in it, we practice that before we play it together, but really slowly.",
          number: 9,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Ha, oh, I'm sure it is."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Do you do any finger picking? That's the last 10 minutes of the lesson, when we pick out the individual notes from a tune he's made up. It's always quite simple.",
        {
          text: "The only trouble is that he sometimes gets us to play one at a time. You know, alone.",
          number: 10,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, that's scary."],
    },
    {
      speaker: "COLEMAN",
      text: [
        "Hmm, it is, but I've got used to it now. At the end he spends about five minutes telling us what to practice for the following week.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, thanks Coleman. I'll go and have a look at that website I think.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1. You now have one minute to check your answers to part 1.",
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
      if (speaker === "SADIE") {
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
    // Questions 1–6 (form)
    1: "beginner", // Level
    2: "home", // Place
    3: "New", // Street (New Street)
    4: "first", // First floor
    5: "11", // Time: Thursday morning at 11
    6: "instrument", // Recommended website: 'The perfect instrument'

    // Questions 7–10 (table)
    7: "ear", // 5 minutes tuning guitars: using an app or by ear
    8: "clapping", // 10 minutes strumming: keeping time while the teacher is clapping
    9: "recording", // 15 minutes playing songs: often listening to a recording
    10: "practice", // 10 minutes playing single notes and simple tunes: playing together, then practice
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
                {renderText("Inside Coleman's Guitar Experience")}
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
            {renderText("Complete the form below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Form for Q1–6 ---------- */}
          <div className="border p-6 rounded-lg space-y-4 max-w-[420px] mx-auto bg-white">
            {[
              { label: "Coordinator:", num: 1, placeholder: "" },
              { label: "Level:", num: 2, placeholder: "" },
              { label: "Place:", num: 3, placeholder: "" },
              { label: "Street:", num: 4, placeholder: "" },
              { label: "Time: Thursday morning at", num: 5, placeholder: "" },
              {
                label: "Recommended website: 'The perfect",
                num: 6,
                placeholder: "'",
              },
            ].map(({ label, num, placeholder }) => (
              <div key={num} className="flex items-center gap-2">
                <p className="w-[180px]">{renderText(label)}</p>
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
                  placeholder={placeholder}
                  className="border rounded-md px-2 py-1 w-32"
                />
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

          {/* ---------- Table for Q7–10 ---------- */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Activity</th>
                  <th className="border p-2">Notes</th>
                  <th className="border p-2">Answer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    num: 7,
                    time: "5 minutes",
                    activity: "tuning guitars",
                    notes: "using an app or by",
                  },
                  {
                    num: 8,
                    time: "10 minutes",
                    activity: "strumming chords using our thumbs",
                    notes: "keeping time while the teacher is",
                  },
                  {
                    num: 9,
                    time: "15 minutes",
                    activity: "playing songs",
                    notes: "often listening to a",
                  },
                  {
                    num: 10,
                    time: "10 minutes",
                    activity: "playing single notes and simple tunes",
                    notes: "playing together, then",
                  },
                ].map(({ num, time, activity, notes }) => (
                  <tr key={num} className="hover:bg-gray-100">
                    <td className="border p-2">{renderText(time)}</td>
                    <td className="border p-2">{renderText(activity)}</td>
                    <td className="border p-2">{renderText(notes)}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => toggleButton(num)}
                        className={`w-8 h-8 rounded-full border-2 mr-2 ${
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
                        className="border rounded-md px-2 py-1 w-32"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------- Submit / Result ---------- */}
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
                    {renderText("All Answers (1–10)")}
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
      <Listening2Pagination2024></Listening2Pagination2024>
    </div>
  );
};

export default Test2Listening2024;
