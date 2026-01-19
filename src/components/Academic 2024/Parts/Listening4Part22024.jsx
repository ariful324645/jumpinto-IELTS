import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2024 from "../Pagination 2024/Listening4Pagination2024";

const Listening4Part22024 = () => {
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
        "Part 2, you will hear a podcast by a running coach giving advice about taking up running and giving information about her club.",
        "First, you have some time to look at questions 11 to 14.",
        "Now listen carefully and answer questions 11 to 14.",
      ],
    },
    {
      speaker: "LIZ FULLER",
      text: [
        "My name's Liz Fuller, and I'm a running coach with Compton Park Runners Club.",
        "Welcome to my podcast.",
        "If you're thinking about taking up running, I'm here to help.",
        "There are many training programs available online, which aim to help people build up to running 5 kilometers.",
        "Some of them are great, and thousands of people of all ages are taking part in 5 kilometer races across the country as a result.",
        "People like them because they're easy to follow, and don't push them too hard.",
        {
          text: "However, they don't work for everyone, especially if you suffer from something like heart condition or asthma.",
          number: 11,
        },
        {
          text: "Because they're aimed at people with average fitness and running ability.",
          number: 12,
        },
        "Another thing is that everyone is different, and if you have any specific questions related to your needs, there's no one to provide any answers.",
        "I have a couple of simple tips I always give to new runners.",
        "I expect you've been told to run very slowly until your fitness increases.",
        "Well, I find that can prevent progress.",
        "You should run at a speed that feels comfortable, but time yourself, and try to run a bit faster each time.",
        {
          text: "Listening to music can be very helpful.",
          number: 14,
        },
        "It takes your mind off things and helps your body get into a rhythm.",
        "I'd say that is better than running with a friend.",
        "Especially as most people are competitive, and that's not what you want when you're just starting.",
        "I don't think the time of day is especially important.",
        "Some people are better in the evening, while others are morning people.",
        {
          text: "But you need to be consistent, so aim to train regularly. Twice a week is enough to begin with.",
          number: 13,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the podcast, you have some time to look at questions 15 to 20.",
        "Now listen and answer questions 15 to 20.",
      ],
    },
    {
      speaker: "LIZ FULLER",
      text: [
        "New members often say to me that they've been put off running, either because they lack confidence, or they don't have time, or they think they dislike running.",
        {
          text: "Ceri, for example, joined the club two years ago at the age of 40.",
          number: 15,
        },
        "She'd always enjoyed running at school, but wasn't sure if she'd be able to do it.",
        "She was worried about being left behind and being the slowest runner, but she says she was made to feel so welcome, she soon forgot all about that.",
        {
          text: "James had always hated the idea of running, but a friend encouraged him to come along for a taster session, and he hasn't looked back.",
          number: 16,
        },
        "He never misses a training session, despite having a really demanding job.",
        {
          text: "Leo was worried about having to commit himself to training sessions every week, and wasn't sure he'd be able to fit training into his busy schedule.",
          number: 17,
        },
        "But after experiencing a lot of stress at work, he came along to us and gave it a go.",
        "Now he says he feels much more relaxed.",
        "And he looks forward to his weekly run.",
        {
          text: "Mark is quite typical of our new members.",
          number: 18,
        },
        "He's never considered himself to be a sporty person.",
        "And it was only when he retired that he decided to take up the challenge of trying to run 5 km.",
        "It took him months to find the courage to contact us.",
        "But he felt reassured immediately, as there were other people his age who were only just taking up running for the first time.",
        {
          text: "My own journey hasn't been easy.",
          number: 19,
        },
        "I did my first marathon when I was 37, after having had two kids.",
        "My husband had been running marathons for years.",
        "But I never dreamed I'd be doing one with him.",
        "I managed to complete it in four hours, but I felt like giving up halfway through.",
        "It was only the support of the spectators that kept me going.",
        "I do think signing up for a race of whatever length is motivating.",
        "Because it's good to have something to work towards.",
        {
          text: "After you've been training for a few weeks, it's worth putting your name down for a 5 k.",
          number: 20,
        },
        "Some people find they only need a few practice runs before taking part in a race.",
        "But I'd give yourself a couple of months at least.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have 30 seconds to check your answers to part 2.",
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

  //  Marks show
  const correctAnswers = {
    "11-12": ["C", "E"],
    "13-14": ["A", "D"],
    15: "A",
    16: "B",
    17: "C",
    18: "A",
    19: "C",
    20: "C",
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "11-12" || id === "13-14") {
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
                  "Running Tips and Inspiring Stories from Compton Park Runners Club"
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
            {renderText("Questions 11–20")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Running Tips and Club Members")}
            </h1>

            {/* ================= Questions 11–12 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 11 and 12</h2>
              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                11–12{" "}
                {renderText(
                  "Which TWO problems with some training programmes for new runners does Liz mention?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "There is a risk of serious injury.",
                  "They are unsuitable for certain age groups.",
                  "They are unsuitable for people with health issues.",
                  "It is difficult to stay motivated.",
                  "There is a lack of individual support.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["11-12"] || [];
                  const checked = selected.includes(value);
                  const disabled = selected.length === 2 && !checked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        disabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => handleInputChange("11-12", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 13–14 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 13 and 14</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                13–14{" "}
                {renderText(
                  "Which TWO tips does Liz recommend for new runners?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "doing two runs a week",
                  "running in the evening",
                  "going on runs with a friend",
                  "listening to music during runs",
                  "running very slowly",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["13-14"] || [];
                  const checked = selected.includes(value);
                  const disabled = selected.length === 2 && !checked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        disabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => handleInputChange("13-14", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 15–18 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 15–18</h2>
              <p className="mt-2">
                {renderText(
                  "Choose the correct letter, A–C, next to Questions 15–18."
                )}
              </p>

              <div className="border p-4 max-w-[200px] mx-auto mt-4 space-y-2">
                <h2 className="font-bold text-xl">{renderText("Reasons")}</h2>
                <p>
                  <strong>A.</strong> {renderText("a lack of confidence")}
                </p>
                <p>
                  <strong>B.</strong> {renderText("a dislike of running")}
                </p>
                <p>
                  <strong>C.</strong> {renderText("a lack of time")}
                </p>
              </div>

              {[
                { num: 15, name: "Ceri" },
                { num: 16, name: "James" },
                { num: 17, name: "Leo" },
                { num: 18, name: "Mark" },
              ].map(({ num, name }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">
                    {num}. {renderText(name)}
                  </span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 19–20 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 19 and 20</h2>
              <p>{renderText("Choose the correct letter, A, B or C.")}</p>

              {/* Q19 */}
              <div className="mt-4 space-y-2">
                <p className="font-bold">
                  19{" "}
                  {renderText(
                    "What does Liz say about running her first marathon?"
                  )}
                </p>
                {[
                  "It had always been her ambition.",
                  "Her husband persuaded her to do it.",
                  "She nearly gave up before the end.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  return (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="q19"
                        checked={userAnswers[19] === value}
                        onChange={() => handleInputChange(19, value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>

              {/* Q20 */}
              <div className="mt-6 space-y-2">
                <p className="font-bold">
                  20{" "}
                  {renderText("Liz says new runners should sign up for a race")}
                </p>
                {[
                  "every six months.",
                  "within a few weeks of taking up running.",
                  "after a few months of training.",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  return (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="q20"
                        checked={userAnswers[20] === value}
                        onChange={() => handleInputChange(20, value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
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
                      {["11-12", "13-14", 15, 16, 17, 18, 19, 20].map((num) => {
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
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening4Pagination2024></Listening4Pagination2024>
    </div>
  );
};

export default Listening4Part22024;
