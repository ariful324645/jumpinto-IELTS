import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2013 from "../Pagination 2013/Listening1Pagination2013";

const Test1Listening2013 = () => {
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
        "Section 1. You will hear a man phoning to inquire about a job vacancy.",
        "First, you have some time to look at questions 1 to 4.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Good evening, King's restaurant."],
    },
    {
      speaker: "MAN",
      text: [
        "Uh. Good evening. I'm ringing about the job. I understand you have vacant.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, yes."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The job vacancy is at a restaurant. So, a restaurant has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Good evening, King's restaurant."],
    },
    {
      speaker: "MAN",
      text: [
        "Uh. Good evening. I'm ringing about the job. I understand you have vacant.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, yes."],
    },
    {
      speaker: "MAN",
      text: ["I'd like to find out a few more details if I may."],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, of course. Can I take your name?"],
    },
    {
      speaker: "MAN",
      text: ["It's Peter Chin."],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, Peter. Well, if you want to ask about the job, and then if we're both still interested, we could arrange for you to come for an interview.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Uh. Great, thanks. I'm afraid I missed the advert for the job, but heard about it from a friend.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["That's no problem at all. What would you like to know?"],
    },
    {
      speaker: "MAN",
      text: ["Well, uh, what sort of work is it? Washing up?"],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "It's answering the phone.", number: 1 }],
    },
    {
      speaker: "MAN",
      text: ["Oh, right, fine."],
    },
    {
      speaker: "WOMAN",
      text: ["And not waiting at table."],
    },
    {
      speaker: "MAN",
      text: ["That would be good, and how many nights a week would it be?"],
    },
    {
      speaker: "WOMAN",
      text: ["Well, we're really only busy at the weekend."],
    },
    {
      speaker: "MAN",
      text: ["So, two nights?"],
    },
    {
      speaker: "WOMAN",
      text: ["Three actually, so it would work out at 12 hours a week."],
    },
    {
      speaker: "MAN",
      text: ["That would be fine. It wouldn't interfere with my studies."],
    },
    {
      speaker: "WOMAN",
      text: ["Are you at the university?"],
    },
    {
      speaker: "MAN",
      text: ["Yes, 1st year physics student."],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, right."],
    },
    {
      speaker: "MAN",
      text: [
        "Um. And because I'm not an EU national, would I need a work permit?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, you would. Just get your tutor to sign it."],
    },
    {
      speaker: "MAN",
      text: [
        "And that wouldn't be a problem if I were to get the job. Um. Where exactly is the restaurant?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, we have 2 branches. ",
        {
          text: "The one we're recruiting for is in Hillsdunne Road.",
          number: 2,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Hmm. I don't know that. Uh. How do you spell it please?"],
    },
    {
      speaker: "WOMAN",
      text: ["It's HILLSDUNNE Road."],
    },
    {
      speaker: "MAN",
      text: ["Got that, thanks. I- is it near a bus stop?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Yes, the nearest one would probably be just beside the library.",
          number: 3,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh yes, I know it. That would be fine for me. And could I ask about the pay?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [{ text: "We're offering £4.45 an hour.", number: 4 }],
    },
    {
      speaker: "MAN",
      text: ["That's very good. My last job was £3.95 an hour."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10.",
        "Now listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "We feel it's pretty good, and we also offer some good fringe benefits.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Really?"],
    },
    {
      speaker: "WOMAN",
      text: ["Well, we give you a free dinner, so you eat well."],
    },
    {
      speaker: "MAN",
      text: ["Right, better than hostel food."],
    },
    {
      speaker: "WOMAN",
      text: [
        "We certainly hope so. ",
        {
          text: "And we also offer extra pay for working on national holidays.",
          number: 5,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, that's a really good perk, isn't it?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, we think so. And then because of the difficulties of getting public transport, ",
        {
          text: "if you're working after 11 o'clock, we drive you home.",
          number: 6,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Oh, that's good to know."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, we'd certainly be interested in inviting you for an interview, if you're still interested.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh yes, certainly. Uh. Could I just also ask what qualities you're looking for?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Well, for this particular job, we want a clear voice, which you obviously do have.",
          number: 7,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Thanks."],
    },
    {
      speaker: "WOMAN",
      text: [
        { text: "And you must be able to think quickly, you know.", number: 8 },
      ],
    },
    {
      speaker: "MAN",
      text: ["Well, I hope I'd..."],
    },
    {
      speaker: "WOMAN",
      text: [
        "So, when could you come in for an interview? We're actually quite quiet tonight.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Uh. Sorry, I couldn't come tonight, or tomorrow, I'm afraid. Uh. ",
        { text: "Thursday's OK. That'd be 22nd of October.", number: 9 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Fine, after 5 pm."],
    },
    {
      speaker: "MAN",
      text: ["Yes, fine. Would 6 o'clock be OK?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Perfect. And could you bring along the names of two referees?",
          number: 10,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["Yes, that's fine. No problem."],
    },
    {
      speaker: "WOMAN",
      text: ["Good, I look forward to seeing you."],
    },
    {
      speaker: "MAN",
      text: ["Oh, uh, by the way, who should I ask for?"],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, yes, of course. Sorry, my name is Samira Manuja."],
    },
    {
      speaker: "MAN",
      text: ["Uh. Can you spell that please?"],
    },
    {
      speaker: "WOMAN",
      text: ["MANUJA."],
    },
    {
      speaker: "MAN",
      text: ["OK, I've got that. Thanks very much."],
    },
    {
      speaker: "WOMAN",
      text: ["Look forward to seeing you..."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1. You now have half a minute to check your answers.",
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
    1: "answering the phone", // Type of work
    2: "hillsdunne road", // Work in the branch
    3: "beside the library", // Nearest bus stop
    4: "4.45", // Pay: £
    5: "national holidays", // Extra pay when you work on
    6: "after 11 o'clock", // Transport home when you work
    7: "clear voice", // Qualities required
    8: "think quickly", // Ability to
    9: "thursday", // Interview arranged for
    10: "samira manuja", // Bring the names of two referees / Ask for
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
                {renderText("Inquiry about the Restaurant Job")}
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
            • {renderText("Questions 1–10")}
          </h2>

          <h3 className="text-lg mb-6">
            • {renderText("Complete the notes below.")} <br />
            <br />• {renderText("Write ")}
            <span className="font-bold">
              {renderText("NO MORE THAN THREE WORDS AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 max-w-2xl mx-auto  rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              • {renderText("JOB ENQUIRY")}
            </h1>

            {/* Example */}
            <p className="text-lg">
              • {renderText("(Example) Work at:")}
              <input
                value={userAnswers["example"] || "a restaurant"}
                readOnly
                className="border rounded-md px-2 py-1 w-40 ml-2 bg-gray-100"
              />
            </p>

            {/* Q1 */}
            <p className="text-lg">
              • {renderText("Type of work:")}
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
            </p>

            {/* Q2 */}
            <p className="text-lg">
              • {renderText("Work in the:")}
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
              {renderText(" branch")}
            </p>

            {/* Q3 */}
            <p className="text-lg">
              • {renderText("Nearest bus stop: next to")}
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
            </p>

            {/* Q4 */}
            <p className="text-lg">
              • {renderText("Pay: £")}
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
              {renderText(" an hour")}
            </p>

            {/* Q5 */}
            <p className="text-lg">
              • {renderText("Extra benefits:")}
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
                className="border rounded-md px-2 py-1 w-64"
              />
              {renderText(" extra pay when you work on")}
            </p>

            {/* Q6 */}
            <p className="text-lg">
              • {renderText("Transport home when you work after 11 p.m.:")}
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
                className="border rounded-md px-2 py-1 w-64"
              />
            </p>

            {/* Q7 */}
            <p className="text-lg">
              • {renderText("Qualities required:")}
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
                className="border rounded-md px-2 py-1 w-64"
              />
            </p>

            {/* Q8 */}
            <p className="text-lg">
              • {renderText("Ability to:")}
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
                className="border rounded-md px-2 py-1 w-64"
              />
            </p>

            {/* Q9 */}
            <p className="text-lg">
              • {renderText("Interview arranged for:")}
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
              {renderText(" at 6 p.m.")}
            </p>

            {/* Q10 */}
            <p className="text-lg">
              • {renderText("Bring the names of two referees. Ask for:")}
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
              {renderText(" Samira")}
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
      <Listening1Pagination2013></Listening1Pagination2013>
    </div>
  );
};

export default Test1Listening2013;
