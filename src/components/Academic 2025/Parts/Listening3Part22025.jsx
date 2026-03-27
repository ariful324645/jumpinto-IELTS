import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2025 from "../Pagination 2025/Listening3Pagination2025";

const Listening3Part22025 = () => {
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
        "Part 2. You will hear an archaeologist who is part of a community project to excavate an ancient village, talking to members of the public who are visiting the site.",
        "First, you have some time to look at questions 11 to 16.",
        "Now listen carefully and answer questions 11 to 16.",
      ],
    },
    {
      speaker: "HAYDEN",
      text: [
        "Hello, I'm Hayden. I'm one of the archaeologists investigating the site here at Bidcaster.",
        "This is the third summer for this community project. And most of the people digging here are volunteers.",
        "I'm a full-time archaeologist for the town council, but I was asked to join the project by NHA,",
        {
          text: "a charity which sets up projects like this up and down the country.",
          number: 11,
        },
        "As you can see, we're next to Bidcaster Castle, which is great, because the owners let us use their facilities.",
        "So, how did we get to where we are today? Many archaeology projects happen when an ancient object is found, and in our case that object was a gold coin.",
        "Coins are often found by people using metal detectors to look for things buried in the ground, or coins are uncovered when wild animals like rabbits have been digging tunnels.",
        "Here, a walker found it on the ground after a rainstorm washed away some of the earth and sand.",
        {
          text: "When the story of the gold coin hit the news, Peter Swift, an amateur historian, contacted me to say he believed there had been a village on this site.",
          number: 12,
        },
        "Centuries before the castle was built. Just by chance, the team found some old maps and documents in our library, which showed 500-year-old drawings of ruined buildings on the grassy area between the outer stone walls of the castle and the river.",
        { text: "We knew then we were onto something.", number: 13 },
        "Over the three summers the team has been here, we found the remains of several buildings, and more broken pots than you can count.",
        "Normally you'd expect to find brooches and other jewelry.",
        {
          text: "But we're still waiting to uncover any such items.",
          number: 14,
        },
        "The people who once lived here were skilled at making tools from animal bones, as you'll see when you visit the exhibition.",
        "Besides the discovery of the village, we've also found evidence of human activity on the other side of the river. No other houses or huts so far.",
        "But we can see the borders of an ancient field system.",
        {
          text: "At one point we found a long wall and thought it was an ancient palace, but it turned out to be a modern wall.",
          number: 15,
        },
        "This summer's work will end soon, but we'll be back next summer.",
        "In the meantime, we're putting on a series of guided tours for school groups this autumn.",
        {
          text: "Oh, and um maybe you saw the TV documentary about our project. That suggested the objects we found are going to the town's museum, but we don't know that for sure yet.",
          number: 16,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 17 to 20.",
        "Now listen and answer questions 17 to 20.",
      ],
    },
    {
      speaker: "HAYDEN",
      text: [
        "When you enter the site, please make sure you keep to the paths at all times.",
        "There are a few other things, um the highlights of the site if you like that I want to mention.",
        "Take a look at the map. Our present location is marked at the bottom.",
        "This year, we've identified the foundations of an ancient bridge, and it's really exciting today because a team of divers are in the river searching for lost objects.",
        {
          text: "To reach the bridge, take the main path ahead of you, go straight on, and keep going till the path bends to the left. You'll see a smaller track leading off to the right. Follow that to take you to the river where the divers are.",
          number: 17,
        },
        "You might be interested to see the rubbish pit.",
        {
          text: "This is very near the castle walls in the northwest corner of the site. It actually dates to the time of the castle and not the ancient village. We found oyster shells and fish bones, and we assumed they were thrown from the castle kitchen above.",
          number: 18,
        },
        "One area we excavated in the first summer uncovered the site of a meeting hall.",
        {
          text: "We knew it was an important building, because it had two rows of post holes. Deep enough to support a large roof. It's the largest structure in the central area of the site, next to the current excavation area.",
          number: 19,
        },
        "Last year we discovered a fish pond in the ancient village.",
        {
          text: "Normally these were beside a river. The pond here is further away, but it's possible the river has moved slightly. Anyway, to get there from here, you turn right at the first information board you come to, and follow the path into the trees. Before you come out of the trees, you'll see it on your right. If you reach the river, you've gone too far.",
          number: 20,
        },
        "So does anyone have an...",
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
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
    // Questions 11–16 (Choose the correct letter, A–C)
    11: "B", // a national charity
    12: "A", // Heavy rain had removed some of the soil
    13: "A", // the lucky discovery of old records
    14: "C", // pieces of jewellery
    15: "B", // the outline of fields
    16: "C", // start to organise school visits

    // Questions 17–20 (Label the map, letters A–G)
    17: "A", // bridge foundations
    18: "B", // rubbish pit
    19: "C", // meeting hall
    20: "D", // fish pond
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
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
            <h1 className="text-xl font-bold">{renderText("    PART 2")}</h1>
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
                {renderText("Archaeological Excavation of an Ancient Village")}
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
              {renderText("Bidcaster Community Archaeology Project")}
            </h1>

            {/* ================= Questions 11–16 ================= */}
            <div>
              {[
                {
                  num: 11,
                  question:
                    "Who was responsible for starting the community project?",
                  options: [
                    "the castle owners",
                    "a national charity",
                    "the local council",
                  ],
                },
                {
                  num: 12,
                  question: "How was the gold coin found?",
                  options: [
                    "Heavy rain had removed some of the soil.",
                    "The ground was dug up by wild rabbits.",
                    "A person with a metal detector searched the area.",
                  ],
                },
                {
                  num: 13,
                  question:
                    "What led the archaeologists to believe there was an ancient village on this site?",
                  options: [
                    "the lucky discovery of old records",
                    "the bases of several structures visible in the grass",
                    "the unusual stones found near the castle",
                  ],
                },
                {
                  num: 14,
                  question: "What are the team still hoping to find?",
                  options: [
                    "everyday pottery",
                    "animal bones",
                    "pieces of jewellery",
                  ],
                },
                {
                  num: 15,
                  question:
                    "What was found on the other side of the river to the castle?",
                  options: [
                    "the remains of a large palace",
                    "the outline of fields",
                    "a number of small huts",
                  ],
                },
                {
                  num: 16,
                  question:
                    "What do the team plan to do after work ends this summer?",
                  options: [
                    "prepare a display for a museum",
                    "take part in a television programme",
                    "start to organise school visits",
                  ],
                },
              ].map(({ num, question, options }) => {
                const selected = userAnswers[num] || "";
                return (
                  <div key={num} className="mb-6">
                    <p className="font-bold text-lg mb-2">
                      {num}. {renderText(question)}
                    </p>
                    <div className="space-y-2">
                      {options.map((opt, idx) => {
                        const value = String.fromCharCode(65 + idx); // A, B, C
                        return (
                          <label key={idx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`q${num}`}
                              value={value}
                              checked={selected === value}
                              onChange={() => handleInputChange(num, value)}
                            />
                            <span className="font-semibold">{value}.</span>
                            <span>{renderText(opt)}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= Questions 17–20 ================= */}
            <div>
              <h2 className="font-bold text-xl mt-10">Questions 17–20</h2>
              <p className="mt-2">{renderText("Label the map below.")}</p>
              <p className="mt-2">
                {renderText("Choose the correct letter, A–G.")}
              </p>

              <div className="flex items-center justify-center mt-4">
                <img
                  src="https://i.ibb.co.com/Z65gQ7JN/apart.jpg"
                  className="w-[500px]"
                  alt="Map diagram"
                />
              </div>

              <div>
                {[
                  { num: 17, label: "bridge foundations" },
                  { num: 18, label: "rubbish pit" },
                  { num: 19, label: "meeting hall" },
                  { num: 20, label: "fish pond" },
                ].map(({ num, label }) => (
                  <div key={num} className="flex items-center gap-2 mt-4">
                    <div className="font-bold flex items-center gap-2 justify-center">
                      <span>{num}.</span>
                      <h2>{renderText(label)}</h2>
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

              {/* ---------- Submit & Results ---------- */}
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
                        {renderText("Your Score: ")}
                        {score}/10
                      </p>
                    </div>

                    {/* All Answers List */}
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-700 mb-3">
                        {renderText("All Answers (11–20)")}
                      </h3>

                      <ul className="space-y-3">
                        {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => {
                          const user = userAnswers[num];
                          const correct = correctAnswers[num];
                          const isCorrect = Array.isArray(correct)
                            ? Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            : user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase();
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
                                {isCorrect ? (
                                  <FaDotCircle className="text-green-600 text-xl font-bold" />
                                ) : (
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
      </div>
      <Listening3Pagination2025></Listening3Pagination2025>
    </div>
  );
};

export default Listening3Part22025;
