import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2022 from "../Pagination2022/Listening2Pagination2022";

const Listening2Part42022 = () => {
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
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 4. You will hear a lecturer on a languages course talking about the impact of digital technology on Icelandic, the native language of Iceland.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Right, everyone. Let's make a start.",
        "Over the past few sessions, we've been considering the reasons why some world languages are in decline.",
        "And today, I'm going to introduce another factor that affects languages, and the speakers of those languages, and that's technology, and in particular digital technology.",
        {
          text: "In order to illustrate its effect, I'm going to focus on the Icelandic language, which is spoken by around 321,000 people.",
          number: 31,
        },
        "Most of whom live in Iceland, an island in the North Atlantic Ocean.",
        "The problem for this language is not the number of speakers, even though this number is small, nor is it about losing words to other languages such as English.",
        "In fact, the vocabulary of Icelandic is continually increasing, because when speakers need a new word for something, they tend to create one, rather than borrowing from another language.",
        {
          text: "All this makes Icelandic quite a special language. It's changed very little in the past millennium, yet it can handle 21st century concepts related to the use of computers and digital technology.",
          number: 32,
        },
        "Take for example the word for web browser. This is vafri in Icelandic, which comes from the verb 'to wander'.",
        "I can't think of a more appropriate term, because that's exactly what you do mentally when you browse the internet.",
        "Then there's an Icelandic word for podcast, which is too hard to pronounce, and so on.",
        {
          text: "Icelandic then is alive and growing, but, and it's a big but, young Icelanders spend a great deal of time in the digital world, and this world is predominantly English.",
          number: 33,
        },
        "Think about smartphones.",
        {
          text: "They didn't even exist until comparatively recently, but today young people use them all the time to read books, watch TV or films.",
          number: 34,
        },
        "Play games, listen to music, and so on.",
        "Obviously, this is a good thing in many respects, because it promotes their bilingual skills.",
        {
          text: "But the extent of the influence of English in the virtual world is staggering. And it's all happening really fast.",
          number: 35,
        },
        "For their parents and grandparents, the change is less concerning, because they already have their native-speaker skills in Icelandic.",
        "But for young speakers, well, the outcome is a little troubling.",
        {
          text: "For example, teachers have found that playground conversations in Icelandic secondary schools can be conducted entirely in English, while teachers of much younger children have reported situations where their classes find it easier to say what is in a picture using English, rather than Icelandic.",
          number: 36,
        },
        {
          text: "The very real and worrying consequence of all this is that the young generation in Iceland is at risk of losing its mother tongue.",
          number: 37,
        },
        "Of course, this is happening to other European languages too, but while internet companies might be willing to offer say French options in their systems.",
        "It's much harder for them to justify the expense of doing the same for a language that has a population the size of a French town, such as Nice.",
        {
          text: "The other drawback of Icelandic is the grammar, which is significantly more complex than in most languages.",
          number: 38,
        },
        "At the moment, the tech giants are simply not interested in tackling this.",
        "So, what is the Icelandic government doing about this?",
        "Well, large sums of money are being allocated to a language technology fund that it is hoped will lead to the development of Icelandic sourced apps.",
        "And other social media and digital systems, but clearly this is going to be an uphill struggle.",
        "On the positive side, they know that Icelandic is still the official language of education and government.",
        "It has survived for well over 1,000 years, and the experts predict that its future in this nation state is sound, and will continue to be so.",
        {
          text: "However, there's no doubt that it's becoming an inevitable second choice in young people's lives. This raises important questions when you consider how much of the past is tied up in a language.",
          number: 39,
        },
        {
          text: "Will young Icelanders lose their sense of their own identity?",
          number: 40,
        },
        "Another issue that concerns the government of Iceland is this.",
        "If children are learning two languages through different routes, neither of which they are fully fluent in.",
        "Will they be able to express themselves properly?",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 4.",
        "You now have one minute to check your answers to Part 4.",
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
    // Questions 31-40: The impact of digital technology on the Icelandic language
    31: "330,000", // Approximately 330,000 speakers (typical population figure for Iceland)
    32: "vocabulary", // Vocabulary that is still growing
    33: "mouse", // Computer-based concepts - web browser and mouse
    34: "smartphones", // Digital technology such as smartphones
    35: "bilingual", // Becoming bilingual very quickly
    36: "playground", // In the playground at school
    37: "website", // Content of a website
    38: "grammar", // Complicated grammar
    39: "identity", // Lose their identity as Icelanders
    40: "fluent", // Not being fluent in either Icelandic or English
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
    localStorage.setItem("/listening2Part42022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part42022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part42022");
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
                  "Impact of digital technology on Icelandic language"
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
            {renderText("Questions 31–40")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border max-w-6xl mx-auto p-6 rounded-lg space-y-4 mt-4 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "The impact of digital technology on the Icelandic language"
              )}
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">
                  {renderText("The Icelandic language")}
                </h2>
                <div className="space-y-2 ml-4">
                  <p className="text-lg">
                    {renderText("has approximately")}{" "}
                    <button
                      onClick={() => toggleButton(31)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("speakers")}
                  </p>

                  <p className="text-lg">
                    {renderText("has a")}{" "}
                    <button
                      onClick={() => toggleButton(32)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("that is still growing")}
                  </p>

                  <p className="text-lg">
                    {renderText(
                      "has not changed a lot over the last thousand years"
                    )}
                  </p>

                  <p className="text-lg">
                    {renderText(
                      "has its own words for computer-based concepts, such as web browser and"
                    )}{" "}
                    <button
                      onClick={() => toggleButton(33)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {renderText("Young speakers")}
                </h2>
                <div className="space-y-2 ml-4">
                  <p className="text-lg">
                    {renderText("are big users of digital technology, such as")}{" "}
                    <button
                      onClick={() => toggleButton(34)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </p>

                  <p className="text-lg">
                    {renderText("are becoming")}{" "}
                    <button
                      onClick={() => toggleButton(35)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("very quickly")}
                  </p>

                  <p className="text-lg">
                    {renderText(
                      "are having discussions using only English while they are in the"
                    )}{" "}
                    <button
                      onClick={() => toggleButton(36)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("at school")}
                  </p>

                  <p className="text-lg">
                    {renderText("are better able to identify the content of a")}{" "}
                    <button
                      onClick={() => toggleButton(37)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("in English than Icelandic")}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {renderText("Technology and internet companies")}
                </h2>
                <div className="space-y-2 ml-4">
                  <p className="text-lg">
                    {renderText(
                      "write very little in Icelandic because of the small number of speakers and because of how complicated its"
                    )}{" "}
                    <button
                      onClick={() => toggleButton(38)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("is")}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {renderText("The Icelandic government")}
                </h2>
                <div className="space-y-2 ml-4">
                  <p className="text-lg">
                    {renderText(
                      "has set up a fund to support the production of more digital content in the language"
                    )}
                  </p>
                  <p className="text-lg">
                    {renderText("believes that Icelandic has a secure future")}
                  </p>
                  <p className="text-lg">
                    {renderText(
                      "is worried that young Icelanders may lose their"
                    )}{" "}
                    <button
                      onClick={() => toggleButton(39)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("as Icelanders")}
                  </p>
                  <p className="text-lg">
                    {renderText(
                      "is worried about the consequences of children not being"
                    )}{" "}
                    <button
                      onClick={() => toggleButton(40)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="border rounded-md px-2 py-1 w-32"
                    />{" "}
                    {renderText("in either Icelandic or English")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ---------- Submit / Result ---------- */}
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
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
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
                            {!isCorrect && (
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
      <Listening2Pagination2022></Listening2Pagination2022>
    </div>
  );
};

export default Listening2Part42022;
