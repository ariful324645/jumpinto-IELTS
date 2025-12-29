import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2016 from "../Pagination2016/Listening1Pagination2016";


const Test1Listening2016 = () => {
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
      "Section 1. You will hear a telephone conversation between an official at a village hall and a woman who wants to hire a public room.",
      "First, you have some time to look at questions 1 to 6.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: ["Hello?"],
  },
  {
    speaker: "WOMAN",
    text: [
      "Oh hello, I wanted to inquire about hiring a room in the village hall for the evening of September the first.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Let me just see.",
      "Uh. Yes, we have both rooms available that evening.",
      "There's our Main Hall, that's got seating for 200 people.",
      "Or there's the Charlton Room.",
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "The Main Hall seat's 200, so 200 has been written in the space.",
      "Now, we shall begin.",
      "You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully, and answer questions 1 to 6.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: ["Hello?"],
  },
  {
    speaker: "WOMAN",
    text: [
      "Oh hello, I wanted to inquire about hiring a room in the village hall for the evening of September the first.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Let me just see.",
      "Uh. Yes, we have both rooms available that evening.",
      "There's our Main Hall, that's got seating for 200 people.",
      "Or there's the Charlton Room.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Sorry?"],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "The Charlton Room, CHARLTON.",
        number: 1,
      },
      "That's got seating for up to 100.",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Well, we're organizing a dinner to raise money for a charity, and we're hoping for at least 150 people.",
      "So, I think we'll go for the Main Hall.",
      "How much would that cost?",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Let's see, um, you wanted it for the evening of September the first.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Yes, that's a Saturday."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "So from 6 pm to midnight, that would be £115 that's the weekend price.",
        number: 2,
      },
      "It's £75 on weekdays.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["That's all right."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "And I have to tell you there's also a deposit of £250 which is returnable of course, as long as there's no damage.",
      {
        text: "But we do insist that this is paid in cash.",
        number: 3,
      },
      "We don't take cards for that.",
      "You can pay the actual rent of the room, however you like though.",
      "Cash, credit card, cheque...",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Oh, well, I suppose that's OK.",
      "So does the charge include use of tables and chairs and so on?",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: ["Oh, yes."],
  },
  {
    speaker: "WOMAN",
    text: ["And what about parking?"],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "Yeah, that's all included.",
        number: 4,
      },
      "The only thing that isn't included is... you said you were organizing a dinner.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Yeah."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Well, you'll have to pay extra for the kitchen if you want to use that.",
      "It's £25.",
      "It's got very good facilities, good quality cookers and fridges and so on.",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "OK, well I suppose that's all right.",
      "We can cover the cost in our entry charges.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Right, so I'll make a note of that.",
      "Now, there are just one or two things you need to think about before the event.",
      {
        text: "For example, you'll have to see about getting a license if you're planning to have any music during the meal.",
        number: 5,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Oh, really?"],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "It's quite straightforward.",
      "I'll give you the details later on.",
      "And about a week or 10 days before your event, you'll need to contact the caretaker, that's Mr Evans.",
      {
        text: "Uh. To make the arrangements for entry, he'll sort that out with you.",
        number: 6,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: ["And do I give him the payment as well?"],
  },
  {
    speaker: "OFFICIAL",
    text: ["No, you do that directly with me."],
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
    text: [
      "Right, now is there anything I need to know about what happens during the event?",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Well, as you'll be aware, of course, the building is no smoking throughout.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Of course."],
  },
  {
    speaker: "OFFICIAL",
    text: ["Now are you having a band?"],
  },
  {
    speaker: "WOMAN",
    text: ["Yes."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "Well, they'll have a lot of equipment, so rather than using the front door, they should park their van round the back, and use the stage door there.",
        number: 7,
      },
      "You can open that from inside, but don't forget to lock it at the end.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["OK."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "And talking of bands, I'm sure I don't need to tell you this, but you must make sure that no one fiddles about with the black box by the fire door.",
      "That's a system that cuts in when the volume reaches a certain level, it's a legal requirement.",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Sure.",
      "Anyway, we want people to be able to talk to one another.",
      "So we don't want anything too loud.",
      "Oh, that reminds me, we'll be having speeches.",
      "Are there any microphones available?",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "Yeah.",
      "Just let the caretaker know, he'll get those for you.",
      "Right, now when the event is over, we do ask that the premises are left in good condition.",

      {
        text: "So there's a locked cupboard, and you'll be informed of the code you need to open that.",
        number: 8,
      },
      "It's got all the cleaning equipment, brushes and detergent and so on.",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Right, so what do we need to do after everyone's gone?",
      "Uh. Sweep the floors, I suppose.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "Well, actually they have to be washed, not just swept.",
        number: 9,
      },
      "Then you'll be provided with black plastic bags, so all the rubbish must be collected up and left outside the door.",
    ],
  },
  {
    speaker: "WOMAN",
    text: [
      "Of course, we'll make sure everything's left tidy.",
      "Oh, and I forgot to ask.",
      "I presume we can have decorations in the room.",
    ],
  },
  {
    speaker: "OFFICIAL",
    text: [
      {
        text: "Yes, but you must take them down afterwards.",
        number: 10,
      },
    ],
  },
  {
    speaker: "WOMAN",
    text: ["Sure."],
  },
  {
    speaker: "OFFICIAL",
    text: [
      "And the chairs and tables should be stacked up neatly at the back of the room.",
    ],
  },
  {
    speaker: "WOMAN",
    text: ["I'll make sure I've got a few people to help me."],
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
    if (speaker === "WOMAN") {
      return (
        voices.find((v) => v.name.includes("Aria")) ||
        voices.find((v) => v.name.includes("Jenny")) ||
        voices.find((v) => v.name.includes("Ana")) ||
        voices.find((v) => v.name.includes("Female")) ||
        voices[0]
      );
    }
      if (speaker === "ROGER")
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
  };  useEffect(() => {
      window.speechSynthesis.onvoiceschanged = () => {
        const list = window.speechSynthesis.getVoices();
        console.log("Available voices:", list);
      };
    }, []);

  //  Marks show

const correctAnswers = {
  1: "Charlton",
  2: "115",
  3: "cash",
  4: "parking",
  5: "music",
  6: "entry",
  7: "stage",
  8: "code",
  9: "floors",
  10: "decorations",
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
    localStorage.setItem("/2017/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2017/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/listening");
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
                {renderText("Hiring a public room")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>

              {/* Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {renderText("Clear answer")}
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      {renderText(
                        "Are you sure you want to clear all answers?"
                      )}
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        {renderText("No, keep them")}
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        {renderText("Yes, clear them")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–10")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("HIRING A PUBLIC ROOM")}
            </h1>

            {/* ---------- Example ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) the Main Hall - seats 200")}
              </li>
            </ul>

            {/* ---------- Room and Cost ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Room and cost")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("the")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("Room - seats 100")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Cost of Main Hall for Saturday evening: £")}
                </span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("+ £250 deposit (")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("payment is required)")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Cost includes use of tables and chairs and also"
                  )}
                </span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("Additional charge for use of the kitchen: £25")}
              </li>
            </ul>

            {/* ---------- Before the Event ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Before the event")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("We need a")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("licence")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Need to contact caretaker (Mr Evans) in advance to arrange"
                  )}
                </span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>

            {/* ---------- During the Event ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("During the event")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("The building is no smoking")}
              </li>

              <li className="text-lg">
                <span>{renderText("The band should use the")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("door at the back")}</span>
              </li>

              <li className="text-lg">
                {renderText("Don't touch the system that controls the volume")}
              </li>

              <li className="text-lg">
                {renderText("For microphones, contact the caretaker")}
              </li>
            </ul>

            {/* ---------- After the Event ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("After the event")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Need to know the")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("for the cleaning cupboard")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("The")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>
                  {renderText(
                    "must be washed and rubbish placed in black bags"
                  )}
                </span>
              </li>

              <li className="text-lg">
                <span>{renderText("All")}</span>

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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("must be taken down")}</span>
              </li>

              <li className="text-lg">
                {renderText("Chairs and tables must be piled up")}
              </li>
            </ul>
          </div>

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
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
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
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

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
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
      <Listening1Pagination2016></Listening1Pagination2016>
    </div>
  );
};

export default Test1Listening2016;
