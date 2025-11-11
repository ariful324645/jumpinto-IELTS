import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

const Test2Listening2020 = () => {
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

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 1. You will hear a woman calling a tourist information office to ask about a festival.",
        "First, you have some time to look at questions 1 to 4.",
        "Now listen carefully and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Good morning, you're through to the tourist information office. Tim speaking. How can I help you?",
      ],
    },
    {
      speaker: "JEAN",
      text: [
        "Oh, hello. Could you give me some information about next month's festival, please? My family and I will be staying in the town that week.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Of course. Well, it starts with a concert on the afternoon of the 17th.",
      ],
    },
    {
      speaker: "JEAN",
      text: [
        "Oh, I heard about that. The orchestra and singers come from the USA, don't they?",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "They're from Canada. They're very popular over there. They're going to perform a number of well-known pieces that will appeal to children as well as adults.",
      ],
    },
    {
      speaker: "JEAN",
      text: ["That sounds good. My whole family are interested in music."],
    },
    {
      speaker: "TIM",
      text: [
        {
          text: "The next day, the 18th, there's a performance by a ballet company called Eustatis.",
          number: 1,
        },
      ],
    },
    {
      speaker: "JEAN",
      text: ["Sorry?"],
    },
    {
      speaker: "TIM",
      text: [
        "The name is spelled EUSTATIS. They appeared in last year's festival and went down very well. Again, their program is designed for all ages.",
      ],
    },
    {
      speaker: "JEAN",
      text: [
        "Good, I expect we'll go to that. I hope there's going to be a play during the festival. A comedy ideally.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "You're in luck. On the 19th and 20th, a local amateur group are performing one written by a member of the group. It's called Jemima. That'll be on in the town hall. They've already performed it 2 or 3 times.",
        {
          text: "I haven't seen it myself, but the review in the local paper was very good.",
          number: 2,
        },
      ],
    },
    {
      speaker: "JEAN",
      text: ["And is it suitable for children?"],
    },
    {
      speaker: "TIM",
      text: [
        "Yes, in fact, it's aimed more at children than at adults, so both performances are in the afternoon.",
      ],
    },
    {
      speaker: "JEAN",
      text: [
        {
          text: "And what about dance? Will there be any performances?",
          number: 3,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        {
          text: "Yes, also on the 20th, but in the evening.",
          number: 3,
        },
        {
          text: "A professional company is putting on a show of modern pieces.",
          number: 3,
        },
        "With electronic music by young composers. The show is about how people communicate or fail to communicate with each other, so it's got the rather strange name",
        {
          text: " Chat.",
          number: 4,
        },
      ],
    },
    {
      speaker: "JEAN",
      text: [
        "I suppose that's because that's something we do both face to face and online.",
      ],
    },
    {
      speaker: "TIM",
      text: ["That's right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 5 to 10.",
        "Listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Now, there are also some workshops and other activities. They'll all take place at least once every day, so everyone who wants to take part will have a chance.",
      ],
    },
    {
      speaker: "JEAN",
      text: [
        "Good, we're particularly interested in cookery. You don't happen to have a cookery workshop, do you?",
      ],
    },
    {
      speaker: "TIM",
      text: [
        {
          text: "We certainly do. It's going to focus on how to make food part of a healthy lifestyle.",
          number: 5,
        },
        "And it'll show that even sweet things like cakes can contain much less sugar than they usually do.",
      ],
    },
    {
      speaker: "JEAN",
      text: [
        "Hmm. That might be worth going to. We're trying to encourage our children to cook.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        {
          text: "Another workshop is just for children, and that's on creating posters.",
          number: 6,
        },
        "To reflect the history of the town. The aim is to make children aware of how both the town and people's lives have changed over the centuries.",
        "The results will be exhibited in the community center. Then, the other workshop is in toy making, and that's for adults only.",
      ],
    },
    {
      speaker: "JEAN",
      text: ["Oh. Why is that?"],
    },
    {
      speaker: "TIM",
      text: [
        "Because it involves carpentry",
        {
          text: ". Participants will be making toys out of wood, so there'll be a lot of sharp chisels and other tools around.",
          number: 7,
        },
      ],
    },
    {
      speaker: "JEAN",
      text: ["It makes sense to keep children away from it."],
    },
    {
      speaker: "TIM",
      text: [
        "Exactly. Now let me tell you about some of the outdoor activities. Uh. There'll be supervised wild swimming.",
      ],
    },
    {
      speaker: "JEAN",
      text: ["Wild swimming. What's that?"],
    },
    {
      speaker: "TIM",
      text: [
        "It just means swimming in natural waters, rather than a swimming pool.",
      ],
    },
    {
      speaker: "JEAN",
      text: ["Oh, OK. In a lake, for instance?"],
    },
    {
      speaker: "TIM",
      text: [
        {
          text: "Yes. There's a beautiful one just outside the town, and that'll be the venue for the swimming.",
          number: 8,
        },
        "There'll be lifeguards on duty, so it's suitable for all ages.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "And finally, there'll be a walk in some nearby woods every day.",
        {
          text: " The leader is an expert on insects.",
          number: 9,
        },
        "He'll show some that live in the woods, and how important they are for the environment. So, there are going to be all sorts of different things to do during the festival.",
      ],
    },
    {
      speaker: "JEAN",
      text: ["There certainly are."],
    },
    {
      speaker: "TIM",
      text: [
        "If you'd like to read about how the preparations for the festival are going",
        {
          text: ", the festival organizer is keeping a blog.",
          number: 10,
        },
        "Just search online for the festival website, and you'll find it.",
      ],
    },
    {
      speaker: "JEAN",
      text: ["Well, thank you very much for all the information."],
    },
    {
      speaker: "TIM",
      text: ["You're welcome."],
    },
    {
      speaker: "JEAN",
      text: ["Goodbye."],
    },
    {
      speaker: "TIM",
      text: ["Goodbye."],
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "JEAN")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "TIM")
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

  // marks


  const correctAnswers = {
    1: "The next day, the 18th, there's a performance by a ballet company called Eustatis",
    2: "I haven't seen it myself, but the review in the local paper was very good",
    3: "Yes, also on the 20th, but in the evening",
    4: "  Chat",
    5: "We certainly do. It's going to focus on how to make food part of a healthy lifestyle.",
    6: "Another workshop is just for children, and that's on creating posters",
    7: "Oh, yes, they will ask to see that",
    8: "Yes. There's a beautiful one just outside the town, and that'll be the venue for the swimming",
    9: "The leader is an expert on insects",
    10: "the festival organizer is keeping a blog",
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
    localStorage.setItem("/2020/Test 2/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2020/Test 2/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 2/listening");
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
                {renderText("Festival information")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-lg cursor-pointer"
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
            {renderText("Questions 1–6")}
          </h2>
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write")}{" "}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>{" "}
            {renderText("for each answer.")}
          </h3>

          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h2 className="text-lg font-bold mt-6">
              {renderText("Workshops")}
            </h2>
            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">{renderText("Making")}</span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
                <span>food.</span>
              </li>
              <li className="text-lg">
                <span className="inline-block">
                  {renderText("(children only) Making")}
                </span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span className="inline-block">
                  {renderText("(adults only) Making toys from")}
                </span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
                <span className="ml-2">
                  {renderText("using various tools.")}
                </span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Outdoor activities")}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">
                  {renderText("Swimming in the")}
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span className="inline-block">
                  {renderText("Walking in the woods, led by an expert on")}
                </span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
                <span className="ml-2">.</span>
              </li>
              <li className="text-lg">
                <span className="inline-block">
                  {renderText("See the festival organiser's")}
                </span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                  type="text"
                />
                <span className="ml-2">
                  {renderText("in more information")}
                </span>
              </li>
            </ul>
          </div>

          {/* ---------- Table Section ---------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7–11")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Write")}{" "}
              <span className="font-bold">{renderText("ONLY ONE WORD")}</span>{" "}
              {renderText("for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    className="border border-gray-400 text-lg font-bold p-2"
                  >
                    {renderText("Festival information")}
                  </th>
                </tr>
                <tr>
                  <th className="border p-2"> {renderText("Date")} </th>
                  <th className="border p-2">{renderText("Type of event")}</th>
                  <th className="border p-2">{renderText("Details")}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("17th")}
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("a concert")}
                  </td>
                  <td className="border border-gray-400 text-lg  p-2">
                    {renderText("performers from Canada")}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    {renderText("18th")}
                  </td>
                  <td className="border border-gray-400 text-lg  p-2">
                    {renderText("a ballet")}
                  </td>

                  <td className="border text-lg border-gray-400 p-2">
                    <span>{renderText("company called")}</span>
                    <button
                      onClick={() => toggleButton(7)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[7]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      7
                    </button>
                    <input
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span className="ml-2"></span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    {renderText("19th-20th (afternoon)")}
                  </td>
                  <td className="border border-gray-400 text-lg  p-2">
                    {renderText("a play")}
                  </td>

                  <td className="border text-lg border-gray-400 p-2">
                    <span>
                      {renderText(
                        "	type of play: a comedy called Jemima has had a good"
                      )}
                    </span>
                    <button
                      onClick={() => toggleButton(8)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[8]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      8
                    </button>
                    <input
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span className="ml-2"></span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    {renderText("20th (evening)")}
                  </td>

                  <td className="border text-lg border-gray-400 p-2">
                    <span>{renderText("a")}</span>
                    <button
                      onClick={() => toggleButton(9)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[9]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      9
                    </button>
                    <input
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span className="ml-2"> {renderText("show")} </span>
                  </td>
                  <td className="border text-lg border-gray-400 p-2">
                    <span>{renderText("show	show is called")}</span>
                    <button
                      onClick={() => toggleButton(10)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[10]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      10
                    </button>
                    <input
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span className="ml-2"> {renderText("show")} </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2Listening2020;
