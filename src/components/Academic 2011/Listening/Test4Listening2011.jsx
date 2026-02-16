import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

const Test4Listening2011 = () => {
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
        "Section 1, you will hear a man telephoning to ask about a job in a hotel.",
        "First, you have some time to look at questions 1 to 4.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hello, West Bay Hotel. Can I help you?"],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, good morning. I'm ringing about your advertisement in the Evening Gazette.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Is that the one for temporary staff?"],
    },
    {
      speaker: "MAN",
      text: ["That's right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The advertisement is for temporary staff, so temporary has been written in the space.",
        "Now we shall begin.",
        "You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hello, West Bay Hotel. Can I help you?"],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, good morning. I'm ringing about your advertisement in the Evening Gazette.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Is that the one for temporary staff?"],
    },
    {
      speaker: "MAN",
      text: ["That's right."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I'm afraid the person who's dealing with that isn't in today, but I can give you the main details if you like.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, please. Could you tell me what kind of staff you're looking for?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "We are looking for waiters at the moment.",
        {
          text: "There was one post for a cook, but that's already been taken.",
          number: 1,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, right. Um. What are the hours of work?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "There are two different shifts.",
        "There is a day shift from 7 to 2, and a late shift from 4 to 11.",
      ],
    },
    {
      speaker: "MAN",
      text: ["And can people choose which one they want to do?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Not normally, because everyone would choose the day shift, I suppose.",
        "You alternate from one week to another.",
      ],
    },
    {
      speaker: "MAN",
      text: ["OK, uh, I'm just writing all this down. What about time off?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "You get one day off, and I think you can negotiate which one you want.",
        {
          text: "It's more or less up to you. But it has to be the same one every week.",
          number: 2,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Do you know what the rates of pay are?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I've got them here.",
        {
          text: "Uh. You get £5.50 an hour. And that includes a break.",
          number: 3,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Do I have to go home to eat or?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "You don't have to, you can get a meal in the hotel if you want to, and there's no charge for it, so you might as well.",
          number: 4,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, good. Yes, so let's see. I'd get er, two hundred and twenty one, no, no, two hundred and thirty one pounds a week.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["You'd also get tips. Our guests tend to be quite generous."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10.",
        "Now listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Is there a uniform? What about clothes?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I forgot to mention that.",
        {
          text: "You need to wear a white shirt, just a plain one, and dark trousers, you know, not green or anything.",
          number: 5,
        },
        "And we don't supply those.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's OK, I've got trousers. I just have to buy a couple of shirts. What about anything else? Do I need a waistcoat or anything?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "You have to wear a jacket, but the hotel lends you that.",
          number: 6,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "I see. Uh. One last thing. I don't know what the starting date is.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Hmm. Just a minute. I think it's some time around the end of June.",
        { text: "Uh. Yes, the 28th in time for the summer.", number: 7 },
      ],
    },
    {
      speaker: "MAN",
      text: ["That's great, I'm available from the 10th."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, good. Well, if you can call again, you need to speak to the service manager.",
        {
          text: "Her name's Jane Urwin, that's URWIN. And she'll probably arrange to meet you.",
          number: 8,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["OK, and when's the best time to ring?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Could you call tomorrow? Um. She usually starts checking the rooms at midday, so before then, if you can, so she'll have more time to chat.",
        {
          text: "I'll just give you her number, because she's got a direct line.",
          number: 9,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Thanks."],
    },
    {
      speaker: "WOMAN",
      text: ["It's 832009."],
    },
    {
      speaker: "MAN",
      text: ["823009."],
    },
    {
      speaker: "WOMAN",
      text: ["832."],
    },
    {
      speaker: "MAN",
      text: ["Oh, OK, uh, yes, I'll do that."],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "And by the way, she will ask you for a reference, so you might like to be thinking about that, you know, just someone who knows you and can vouch for you.",
          number: 10,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Yes, no problem. Well, thanks very much for your help."],
    },
    {
      speaker: "WOMAN",
      text: ["You're welcome. Bye."],
    },
    {
      speaker: "MAN",
      text: ["Bye."],
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
  1: "temporary", // Newspaper advert for temporary staff
  2: "shift", // Two shifts. Can choose your shift (must be the same each week)
  3: "break", // Pay: £5.50 per hour, including a break
  4: "meal", // A meal is provided in the hotel
  5: "shirt", // Dress: a white shirt and trousers (not supplied)
  6: "jacket", // a jacket (supplied)
  7: "28th june", // Starting date: 28th June
  8: "call", // Call Jane (Service Manager) before
  9: "midday", // Tomorrow (Tel: call before midday)
  10: "reference", // She'll require a reference
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
                {renderText(
                  "Inquiry about the West Bay Hotel's Temporary Staff Advertisement",
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

          {/* ---------- Notes Box ---------- */}
          <div className="border max-w-2xl mx-auto p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("West Bay Hotel - details of job")}
            </h1>

            <h3 className="font-semibold mt-2">{renderText("Job details")}</h3>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("(Example) Newspaper advert for")}{" "}
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
              {renderText(" staff")}
            </p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Two shifts. Can choose your")}{" "}
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
              {renderText("(must be the same each week)")}
            </p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Pay: £5.50 per hour, including a")}{" "}
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

            {/* Q4 */}
            <p className="text-lg">
              {renderText("A")}{" "}
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
              {renderText("is provided in the hotel")}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("Dress: a white shirt and")}{" "}
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
              {renderText("trousers (not supplied)")}
            </p>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("a")}{" "}
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
              {renderText("(supplied)")}
            </p>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("Starting date:")}{" "}
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

            {/* Q8 */}
            <p className="text-lg">
              {renderText("Call Jane")}{" "}
              <button
                onClick={() => toggleButton(8)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[8]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                8
              </button>
              <input
                value={userAnswers[8] || ""}
                onChange={(e) => handleInputChange(8, e.target.value)}
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText("(Service Manager) before")}
            </p>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("tomorrow (Tel:")}{" "}
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
              )
            </p>

            {/* Q10 */}
            <p className="text-lg">
              {renderText("She'll require a")}{" "}
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

export default Test4Listening2011;
