import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Test2Listening2007 = () => {
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

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 1, you will hear a woman calling a local museum about children's art and craft workshops.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning, Synmouth Museum. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh yes, good morning. I'm interested in the children's workshops, and I'd like a little more information please.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Do you mean the art and craft workshops?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, a friend of a friend mentioned them. The children do painting and make models and so forth.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, of course. Um. Where to begin? First of all, as you probably know, they run every Saturday.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The workshops are organized every Saturday, so Saturday has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully, and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Good morning, Synmouth Museum. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, yes, good morning. I'm interested in the children's workshops, and I'd like a little more information please.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Do you mean the art and craft workshops?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, a friend of a friend mentioned them. The children do painting and make models and so forth.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, of course. Um. Where to begin? First of all, as you probably know, they run every Saturday.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Fine, and what about ages?"],
    },
    {
      speaker: "MAN",
      text: [
        "Well, all ages from 5 upwards are welcome, though we do ask that children below 8 years of age are accompanied by an adult.",
        { text: "5 upwards", number: 1 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Fine, that wouldn't be a problem. What about cost?"],
    },
    {
      speaker: "MAN",
      text: [
        "Well, I think you'll find them very reasonable. It's £2.50 a child, with 80 pence off for two or more children from the same family.",
        { text: "£2.50", number: 2 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, yes, very reasonable. And are they held in the main museum?"],
    },
    {
      speaker: "MAN",
      text: ["Not exactly, they're nearby."],
    },
    {
      speaker: "WOMAN",
      text: [
        "Could you give me the full address? I don't know the area very well.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Yes, it's Winter House.", { text: "Winter House", number: 3 }],
    },
    {
      speaker: "WOMAN",
      text: ["Right."],
    },
    {
      speaker: "MAN",
      text: [
        "And that's in Tamer Street.",
        { text: "Tamer Street", number: 4 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Could you spell that please?"],
    },
    {
      speaker: "MAN",
      text: ["Yes, TAMER Street."],
    },
    {
      speaker: "WOMAN",
      text: ["Lovely."],
    },
    {
      speaker: "MAN",
      text: [
        "And I do need to tell you that there's a security entrance, so you need to press the green button for someone to let you in.",
        "Don't press the red button please, but don't worry, it's all clearly labeled.",
        { text: "green button", number: 5 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, and one more question, is parking available nearby? We're driving in from out of town.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Your best bet is to leave your car at the back of the library, on a Saturday morning, there are plenty of spaces there.",
        "It's right next door to the museum.",
        { text: "back of the library", number: 6 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["And can I ask about booking places?"],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, and I must tell you, you really should book by calling the education department here.",
        { text: "education department", number: 7 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, I'm sorry. Should I have rung them instead of the main museum number?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "No, that's fine this time. Please don't worry. But for future reference, I'll give you the direct number.",
        "It's 200765.",
        { text: "200765", number: 8 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Great, I've got that."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "But I'm very happy to give you information about the next two workshops. On Saturday the 16th, there's Building Castles.",
        { text: "Building Castles", number: 9 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh. Sounds great."],
    },
    {
      speaker: "MAN",
      text: [
        "This involves quite a bit of glue, so just make sure the kids are in old clothes.",
        { text: "old clothes", number: 10 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["I know, ones I don't mind getting mucky."],
    },
    {
      speaker: "MAN",
      text: [
        "Exactly, and if possible, could you bring along bottle tops which the children might be able to use in the models, you know as decoration?",
        { text: "bottle tops", number: 11 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "We'll certainly try to find some for you. Then the following week, that'll be the 23rd, won't it?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, that's right. On that day, it's what we call Undersea Worlds. Uh. This is where they make scenes with fishes, underground caverns, and so on.",
        { text: "Undersea Worlds", number: 12 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Is that likely to get very dirty? Lots of paint splashes?"],
    },
    {
      speaker: "MAN",
      text: [
        "Not really, so we don't recommend any special clothes for that one. But if you could search out some silver paper to bring along to use in the sessions, you know, it's shiny, it looks like water, that would be great.",
        { text: "silver paper", number: 13 },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, of course. We'll see what we can come up with. Well, uh, thank you ever so much for all your help. The sessions sound really good, and I'll certainly book up for the next two.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Lovely, thanks very much for ringing."],
    },
    {
      speaker: "WOMAN",
      text: ["Bye."],
    },
    {
      speaker: "MAN",
      text: ["Bye bye."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 1. You now have half a minute to check your answers.",
      ],
    },
  ];


  // different option

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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

const correctAnswers = {
  1: "8",
  2: "£2.50",
  3: "Winter House",
  4: "Tamer",
  5: "green button",
  6: "back of the library",
  7: "education department",
  8: "200765",
  9: "Building Castles",
  10: "old clothes",
  11: "bottle tops",
  12: "Undersea Worlds",
  13: "silver paper",
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
    localStorage.setItem("/listening1Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22020");
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
                  "Synmouth Museum's Children's Art and Craft Workshops",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
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
                        "Are you sure you want to clear all answers?",
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
          {/* box*/}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–5")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("NO MORE THAN THREE WORDS AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ----------  Box ---------- */}
          <div className="border p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("CHILDREN'S ART AND CRAFT WORKSHOPS")}
            </h1>

            {/* Example: Workshops organised every */}
            <p className="text-lg">
              {renderText("(Example) Workshops organised every:")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Adults must accompany children under */}
            <p className="text-lg">
              {renderText("Adults must accompany children under")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Cost */}
            <p className="text-lg">
              {renderText("Cost:")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
            </p>

            {/* Workshops held in */}
            <p className="text-lg">
              {renderText("Workshops held in: Winter House,")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              <span className="ml-2">{renderText("Street")}</span>
            </p>

            {/* Security device */}
            <p className="text-lg">
              {renderText("Security device: must push the")}
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
                className="border rounded-md px-2 py-1 w-40"
              />
              <span className="ml-2">{renderText("to open door")}</span>
            </p>

            {/* Optional note: car and booking */}
            <p className="text-lg">
              {renderText(
                "Should leave car behind the library, and book workshops by phoning the education department (on 200765)",
              )}
            </p>
          </div>

          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 6-10")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br />
              {renderText("Write NO MORE THAN TWO NUMBERS for each answer.")}
            </h3>

            <h2 className="text-lg font-bold text-center mb-3">
              {renderText("Next two workshops")}
            </h2>
            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Date")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Workshop title")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Children advised to wear:")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Please bring (if possible):")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* First Workshop */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("16/11")}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {renderText("'Building")}
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    {renderText("'")}
                  </td>

                  <td className="border border-gray-400 p-2">
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>

                  <td className="border border-gray-400 p-2">
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>

                {/* Second Workshop */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("23/11")}
                  </td>

                  <td className="border border-gray-400 p-2">
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>

                  <td className="border border-gray-400 p-2">
                    {renderText("(Nothing special)")}
                  </td>

                  <td className="border border-gray-400 p-2">
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
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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
                    All Answers (1-10)
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
      {/* <Listening1Pagination></Listening1Pagination> */}
    </div>
  );
};

export default Test2Listening2007;
