import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

const Test2Listening2009 = () => {
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
        "Section 1, you will hear a telephone conversation between a customer and a representative of an insurance company.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hello, motor insurance department."],
    },
    {
      speaker: "MAN",
      text: ["Oh, hello. I'd like to ask about insurance for my car."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, of course. I'll just take a few details. Uh. What's your name?",
      ],
    },
    {
      speaker: "MAN",
      text: [{ text: "Patrick Jones.", number: 1 }],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The customer's name is Patrick Jones, so Patrick Jones has been written in the space.",
        "Now we shall begin.",
        "You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully, and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hello, motor insurance department."],
    },
    {
      speaker: "MAN",
      text: ["Oh, hello, I'd like to ask about insurance for my car."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, of course. I'll just take a few details. Uh. What's your name?",
      ],
    },
    {
      speaker: "MAN",
      text: [{ text: "Patrick Jones.", number: 1 }],
    },
    {
      speaker: "WOMAN",
      text: ["And your address?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "27 Bank Road.", number: 2 }],
    },
    {
      speaker: "WOMAN",
      text: ["27 Bank Road. Is that in Greendale?"],
    },
    {
      speaker: "MAN",
      text: ["Yes."],
    },
    {
      speaker: "WOMAN",
      text: ["And what's your daytime phone number?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "730453", number: 3 }],
    },
    {
      speaker: "WOMAN",
      text: ["And could I ask what your occupation is?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "Dentist.", number: 4 }],
    },
    {
      speaker: "WOMAN",
      text: ["OK. Now a few details about your car. What size is the engine?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "1200 ccs.", number: 5 }],
    },
    {
      speaker: "WOMAN",
      text: ["Thank you. And the make and model?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "Hewton Sable.", number: 6 }],
    },
    {
      speaker: "WOMAN",
      text: ["Could you spell the model name please?"],
    },
    {
      speaker: "MAN",
      text: ["Yes, SABLE."],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, yes, uh, thanks, and when was it made?"],
    },
    {
      speaker: "MAN",
      text: ["1997."],
    },
    {
      speaker: "WOMAN",
      text: ["Lovely. I presume you've had a previous insurer."],
    },
    {
      speaker: "MAN",
      text: ["Yes."],
    },
    {
      speaker: "WOMAN",
      text: ["Right. We need to know the name of the company."],
    },
    {
      speaker: "MAN",
      text: [{ text: "Northern Star.", number: 7 }],
    },
    {
      speaker: "WOMAN",
      text: [
        "Thank you. And have you made any insurance claims in the last five years?",
      ],
    },
    {
      speaker: "MAN",
      text: [{ text: "1 in 1999.", number: 8 }],
    },
    {
      speaker: "WOMAN",
      text: ["And what was the problem?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "It was stolen.", number: 9 }],
    },
    {
      speaker: "WOMAN",
      text: [
        "That's fine, Mr Jones. That's all we need to know at the moment.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["And will there be any other named drivers?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "Simon Paynter.", number: 10 }],
    },
    {
      speaker: "WOMAN",
      text: ["Could you spell the surname please?"],
    },
    {
      speaker: "MAN",
      text: ["PAYNTER."],
    },
    {
      speaker: "WOMAN",
      text: ["OK, thank you. And what relationship is he to you?"],
    },
    {
      speaker: "MAN",
      text: ["He's my brother-in-law."],
    },
    {
      speaker: "WOMAN",
      text: ["And what will you or Mr Paynter be using the car for?"],
    },
    {
      speaker: "MAN",
      text: ["Well, um mainly for social use."],
    },
    {
      speaker: "WOMAN",
      text: ["Social use. Will you be using it to travel to work?"],
    },
    {
      speaker: "MAN",
      text: ["Yes, sometimes."],
    },
    {
      speaker: "WOMAN",
      text: ["Travel to work. Anything else?"],
    },
    {
      speaker: "MAN",
      text: ["No, that's it."],
    },
    {
      speaker: "WOMAN",
      text: ["And finally, when would you like to start the insurance?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "I'll need it from the 31st of January.", number: 11 }],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Mr Jones, I'm getting a couple of quotes coming up on the computer now, and best bet looks like being with a company called Red Flag.",
          number: 12,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [{ text: "$450 per year.", number: 13 }],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, well, that seems OK. Ha, it's quite a bit lower than I've been paying up to now.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Great, so would you like me to go ahead with that?"],
    },
    {
      speaker: "MAN",
      text: ["Sure, why not?"],
    },
    {
      speaker: "WOMAN",
      text: ["How would you like to pay?"],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1.",
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
    1: "27 Bank Road", // Address
    2: "Dentist", // Occupation
    3: "730453", // Contact number
    4: "Dentist", // Occupation repeated for clarity
    5: "stolen", // Insurance claim details
    6: "Sable", // Model
    7: "Northern Star", // Previous insurance company
    8: "1", // Number of claims
    9: "Red Flag", // Recommended insurance company
    10: "450", // Annual cost ($)
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
                {renderText("Insurance Enquiry for a Car")}
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
            {renderText("Questions 1–10")}
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

          {/* ----------  Box ---------- */}
          <div className="border max-w-2xl mx-auto p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("CAR INSURANCE")}
            </h1>

            <h3 className="font-semibold mt-2">{renderText("(Example)")}</h3>

            <p className="text-lg">{renderText("Name: Patrick Jones")}</p>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Address:")}
              <button
                onClick={() => toggleButton(1)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[1]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                1
              </button>
              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText(", Greendale")}
            </p>

            <p className="text-lg">{renderText("Contact number: 730453")}</p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Occupation:")}
              <button
                onClick={() => toggleButton(2)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[2]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                2
              </button>
              <input
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            <p className="text-lg">
              {renderText("Size of car engine: 1200cc")}
            </p>
            <p className="text-lg">{renderText("Type of car:")}</p>
            <p className="text-lg">{renderText("Manufacturer: Hewton")}</p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Model:")}
              <button
                onClick={() => toggleButton(3)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[3]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                3
              </button>
              <input
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            <p className="text-lg">{renderText("Year: 1997")}</p>

            {/* Q4 */}
            <p className="text-lg">
              {renderText("Previous insurance company:")}
              <button
                onClick={() => toggleButton(4)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[4]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                4
              </button>
              <input
                value={userAnswers[4] || ""}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            <p className="text-lg">
              {renderText(
                "Any insurance claims in the last five years? YES ✓ NO",
              )}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("If yes, give brief details: Car was")}
              <button
                onClick={() => toggleButton(5)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[5]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                5
              </button>
              <input
                value={userAnswers[5] || ""}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText(" in 1999")}
            </p>

            <p className="text-lg">
              {renderText("Name(s) of other driver(s): Simon")}
            </p>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("Relationship to main driver:")}
              <button
                onClick={() => toggleButton(6)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[6]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                6
              </button>
              <input
                value={userAnswers[6] || ""}
                onChange={(e) => handleInputChange(6, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("Uses of car: social")}
              <button
                onClick={() => toggleButton(7)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[7]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                7
              </button>
              <input
                value={userAnswers[7] || ""}
                onChange={(e) => handleInputChange(7, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            <p className="text-lg">{renderText("Start date: 31 January")}</p>

            {/* Q8 */}
            <p className="text-lg">
              {renderText("Recommended Insurance arrangement")}
            </p>

            <p className="text-lg">{renderText("Name of company:")}</p>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("Name of company:")}
              <button
                onClick={() => toggleButton(9)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[9]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                9
              </button>
              <input
                value={userAnswers[9] || ""}
                onChange={(e) => handleInputChange(9, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q10 */}
            <p className="text-lg">
              {renderText("Annual cost: $")}
              <button
                onClick={() => toggleButton(10)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[10]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                10
              </button>
              <input
                value={userAnswers[10] || ""}
                onChange={(e) => handleInputChange(10, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>
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
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1–10)
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
      {/* <Listening4Pagination2025></Listening4Pagination2025> */}
    </div>
  );
};

export default Test2Listening2009;
