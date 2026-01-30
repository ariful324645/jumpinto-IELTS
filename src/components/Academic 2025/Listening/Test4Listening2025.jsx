import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2025 from "../Pagination 2025/Listening4Pagination2025";

const Test4Listening2025 = () => {
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
        "Part 1. You will hear a man asking a friend for advice on things to do in the city with a family of visitors.",
        "First, you have some time to look at questions 1 to 6.",
        "Now listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Sandra, I seem to remember you had some family visitors staying with you recently.",
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "Yeah, that's right.",
        "My brother and his family were here a couple of months ago.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "OK, good.",
        "Well, I wanted to ask your advice.",
        "I've got my cousin and her family visiting next month,",
        "and as I don't have kids, I've no idea where to take them.",
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "Right, what about accommodation?",
        "Are they going to stay with you in your flat?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "No, thankfully, there wouldn't be room.",
        "My cousin wants me to recommend a hotel.",
        "Do you know anywhere?",
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "Yes, I do actually.",
        {
          text: "I always recommend people stay at the Kings Hotel.",
          number: 1,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Where's that near?"],
    },
    {
      speaker: "SANDRA",
      text: [
        "It's about 5 minutes' walk from Murray station, so nice and central.",
        "It's actually on George Street.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, yes, I know.",
        "I think they're on quite a tight budget,",
        "so how much roughly is it to stay there?",
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        {
          text: "If you book a family room, it's about £125 per night.",
          number: 2,
        },
        "My brother paid for two double rooms in the end,",
        "and I think that was around £95 for each room.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, that's not so bad."],
    },
    {
      speaker: "SANDRA",
      text: ["So how old are your cousin's kids?"],
    },
    {
      speaker: "MAN",
      text: [
        "12 and 9.",
        "So I want to organize some trips while they're here.",
        "I was thinking of doing a bus tour of the city center,",
        "as none of them have been here before.",
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "Those bus tours are quite expensive.",
        {
          text: "I think it's better to do a walking tour.",
          number: 3,
        },
        "It gives you a much better feel for the city.",
        "There's one that starts from Carlton Square.",
        "It takes a couple of hours and doesn't cost that much.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Sounds good.", "I'll look that up, thanks."],
    },
    {
      speaker: "SANDRA",
      text: [
        "If the weather's nice, one thing you could do is visit the old fort.",
        {
          text: "You could get there by boat.",
          number: 4,
        },
        "The whole trip takes half a day.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "That's a really good idea.",
        "I'd like to do that myself.",
        "And if the weather's bad, I was thinking they could go to the science museum.",
        "But maybe they could do that when I'm at work.",
      ],
    },
    {
      speaker: "SANDRA",
      text: ["Yeah, don't forget it's closed on Mondays."],
    },
    {
      speaker: "MAN",
      text: [
        "They're here from Saturday for 4 nights,",
        {
          text: "so Tuesday would be best I think.",
          number: 5,
        },
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "And it won't be so crowded then.",
        "Saturdays are terrible.",
        "I took my kids to the exhibition on old computers there,",
        "and it was far too crowded.",
        "I wanted to go back, but it's finished now.",
      ],
    },
    {
      speaker: "MAN",
      text: ["That's a shame.", "My cousin's kids would have enjoyed that."],
    },
    {
      speaker: "SANDRA",
      text: [
        "There's another one starting soon on space,",
        {
          text: "which looks really good too.",
          number: 6,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["OK, well I'll mention that to my cousin."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation,",
        "you have some time to look at questions 7 to 10.",
        "Now listen and answer questions 7 to 10.",
      ],
    },
    {
      speaker: "SANDRA",
      text: ["Have you thought about where to take them to eat?"],
    },
    {
      speaker: "MAN",
      text: [
        "Well, I really like all the food stalls at Clacton Market.",
        {
          text: "My cousin's vegetarian, I know it's one of the best places for that kind of food.",
          number: 7,
        },
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "Definitely.",
        "And there'll be loads of choice for the kids too.",
        {
          text: "You need to get there quite early though, at the weekend most of the stalls stop serving lunch at 2:30.",
          number: 8,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Good point, it's all going to need careful planning.",
        "My cousin said she'd love to take the kids to a show at the theater,",
        "but tickets are so expensive.",
      ],
    },
    {
      speaker: "SANDRA",
      text: [
        "I know, but you can get some good deals if you book online with bargaintickets.com for the following day.",
        {
          text: "On some seats, there's a 75% discount.",
          number: 9,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Really?", "Hmm, I must try and get some."],
    },
    {
      speaker: "SANDRA",
      text: [
        "Yeah, there are lots of things you can do for free as well.",
        "No need to spend a fortune.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Like what?"],
    },
    {
      speaker: "SANDRA",
      text: [
        "They're coming next month, right?",
        "Well check and see if it's the same weekend as the Roots Music Festival in Blakewell Gardens.",
      ],
    },
    {
      speaker: "MAN",
      text: ["R double O T S."],
    },
    {
      speaker: "SANDRA",
      text: [
        "Yeah, check it out online.",
        "It's always a family friendly event,",
        "and there's no entry charge.",
      ],
    },
    {
      speaker: "MAN",
      text: ["That sounds perfect."],
    },
    {
      speaker: "SANDRA",
      text: [
        "And if you're in Blakewell Gardens - climb Telegraph Hill -",
        {
          text: "you'll be able to look right down on the port.",
          number: 10,
        },
        "Everyone's always really impressed because it's so huge.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, yeah.",
        "I've been meaning to do that for ages.",
        "I've heard the view's amazing.",
      ],
    },
    {
      speaker: "SANDRA",
      text: ["Yeah, it's really worth the effort."],
    },
    {
      speaker: "MAN",
      text: ["Well, that's given me loads of ideas.", "Thanks so much."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 1.",
        "You now have one minute to check your answers to part 1.",
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
      if (speaker === "SANDRA") {
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
    1: "george", // Hotel on George Street
    2: "70", // Cost of family room per night (approx.)
    3: "walking", // a walking tour of the city centre
    4: "bus", // a trip by bus to the old fort
    5: "france", // Best day to visit Science Museum (example: exhibition about France)
    6: "dinosaurs", // See the exhibition about dinosaurs
    7: "fresh", // Clacton Market: good for fresh food
    8: "1", // Need to have lunch before 1 p.m.
    9: "20", // Save up to 20% on theatre ticket prices
    10: "town", // Climb Telegraph Hill to see a view of the town
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
                {renderText("Advice on City Activities for Family Visitors")}
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
              {renderText("Advice on family visit")}
            </h1>

            <h3 className="font-semibold mt-2">
              {renderText("Accommodation")}
            </h3>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Hotel on George Street:")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" cost of family room per night: £")}
            </p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("(approx.)")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Recommended trips")}
            </h3>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("a")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                " tour of the city centre (starts in Carlton Square)",
              )}
            </p>

            {/* Q4 */}
            <p className="text-lg">
              {renderText("a trip by")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" to the old fort")}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("Science Museum: best day to visit:")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("see the exhibition about")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(", which opens soon")}
            </p>

            <h3 className="font-semibold mt-4">{renderText("Food")}</h3>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("Clacton Market: good for")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" food")}
            </p>

            {/* Q8 */}
            <p className="text-lg">
              {renderText("need to have lunch before")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" p.m.")}
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Theatre tickets")}
            </h3>

            {/* Q9 */}
            <p className="text-lg">
              {renderText("save up to")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("% on ticket prices at bargaintickets.com")}
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Free activities")}
            </h3>

            {/* Q10 */}
            <p className="text-lg">
              {renderText(
                "Blakewell Gardens / Roots Music Festival: climb Telegraph Hill to see a view of the",
              )}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              .
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
      <Listening4Pagination2025></Listening4Pagination2025>
    </div>
  );
};

export default Test4Listening2025;
