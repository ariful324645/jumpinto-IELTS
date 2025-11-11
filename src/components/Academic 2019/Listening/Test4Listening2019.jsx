import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Test4Listening2019 = () => {
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

  //   voice
  const [voices, setVoices] = useState([]);

  // Load voices
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const allVoices = synth.getVoices();
      if (allVoices.length) setVoices(allVoices);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 1. You will hear a woman phoning a hotel about holding a party there.",
        "First, you have some time to look at questions 1 to 7.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "ANDREW",
      text: [
        "Good morning, Clare House Hotel, Andrew speaking, I'm the Events Manager.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Andrew is the Events Manager, so Events has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 7.",
      ],
    },
    {
      speaker: "ANDREW",
      text: [
        "Good morning, Clare House Hotel, Andrew speaking, I'm the Events Manager.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: [
        "Good morning, Andrew. My name is Samantha. I'm arranging a party for my parents' 50th wedding anniversary.",
        "And I'm ringing to ask about hiring a room sometime next September, also my parents and several of the guests will need accommodation.",
      ],
    },
    {
      speaker: "ANDREW",
      text: [
        "OK, I'm sure we can help you with that. Will you be having a sit down meal or a buffet?",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Probably a sit down."],
    },
    {
      speaker: "ANDREW",
      text: ["And do you know how many people there'll be?"],
    },
    {
      speaker: "SAMANTHA",
      text: ["Around 80, I think."],
    },
    {
      speaker: "ANDREW",
      text: [
        "Well we have two rooms that can hold that number. ",
        {
          text: "One is the Adelphi room, that can seat 85 or hold over 100 if people are standing for a buffet.",
          number: 1,
        },
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Right."],
    },
    {
      speaker: "ANDREW",
      text: [
        "If you have live music, there's room for four or five musicians in the gallery. Overlooking the room, our guests usually appreciate the fact that the music can be loud enough for dancing, but not too loud for conversation.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Yes, I really don't like it when you can't talk."],
    },
    {
      speaker: "ANDREW",
      text: [
        "Exactly. Now the Adelphi Room is at the back of the hotel, and there are French windows. Leading out onto the terrace. ",
        {
          text: "This has a beautiful display of pots of roses at that time of the year.",
          number: 2,
        },
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Which direction does it face?"],
    },
    {
      speaker: "ANDREW",
      text: [
        "Southwest, so that side of the hotel gets the sun in the afternoon and early evening.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Very nice."],
    },
    {
      speaker: "ANDREW",
      text: [
        {
          text: "From the terrace, you can see the area of trees within the grounds of the hotel.",
          number: 3,
        },
        "  Or you can stroll through there to the river. That's on the far side, so it isn't visible from the hotel. OK, then another option is the Carlton room. This is a bit bigger.",
        {
          text: " It can hold up to 110 people, and it has the advantage of a stage, which is useful if you have any entertainment.",
          number: 4,
        },
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Hmm. And can you go outside from the room?"],
    },
    {
      speaker: "ANDREW",
      text: [
        "No, the Carlton room is on the first floor. But on one side, the windows look out onto the lake.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Lovely. I think either of those rooms would be suitable."],
    },
    {
      speaker: "ANDREW",
      text: ["Can I tell you about some of the options we offer in addition?"],
    },
    {
      speaker: "SAMANTHA",
      text: ["Please do."],
    },
    {
      speaker: "ANDREW",
      text: [
        "As well as a meal, you can have a MC, a master of ceremonies, who'll be with you throughout the party.",
        "What exactly is the MC's function? I suppose they make a speech during the meal, if we need one, do they?",
        { text: "That's right.", number: 5 },
        "All our MCs are trained as public speakers, so they can easily get people's attention. Many guests are glad to have someone who can make themselves heard above the chatter, and they're also your support. ",
        {
          text: "If anything goes wrong, the MC will deal with it, so you can relax.",
          number: 6,
        },
      ],
    },
    {
      speaker: "SAMANTHA",
      text: [
        "Great, I'll need to ask you about food, but something else that's important is accommodation. You obviously have rooms in the hotel. But do you also have any other accommodation, like cabins, for example?",
      ],
    },
    {
      speaker: "ANDREW",
      text: [
        {
          text: "Yes, there are 5 in the grounds, all self contained.",
          number: 7,
        },
        "They each sleep 2 to 4 people, and have their own living room, bathroom, and small kitchen.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["That sounds perfect for what we'll need."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 8 to 10.",
        "Now listen and answer questions 8 to 10.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: [
        "Now you have various facilities, don't you? Are they all included in the price of hiring the room? The pool for instance.",
      ],
    },
    {
      speaker: "ANDREW",
      text: [
        {
          text: "Normally you'd be able to use it, but it'll be closed throughout September for refurbishment, I'm afraid.",
          number: 8,
        },

        {
          text: "The gym will be available though, at no extra charge.",
          number: 9,
        },
        "That's open all day from 6 in the morning until midnight.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: ["Right."],
    },
    {
      speaker: "ANDREW",
      text: [
        {
          text: "And the tennis courts but there is a small additional payment for those.",
          number: 10,
        },
        "We have four courts, and it's worth booking in advance if you possibly can, as there can be quite a long waiting list for them.",
      ],
    },
    {
      speaker: "SAMANTHA",
      text: [
        "Right, now could we discuss the food? This would be dinner around 7 o'clock...",
      ],
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
      if (speaker === "SAMANTHA")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "ANDREW")
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
    1: "One is the Adelphi room, that can seat 85 or hold over 100 if people are standing for a buffet",
    2: "This has a beautiful display of pots of roses at that time of the year",
    3: "From the terrace, you can see the area of trees within the grounds of the hotel",
    4: "It can hold up to 110 people, and it has the advantage of a stage, which is useful if you have any entertainment",
    5: "That's right",
    6: "If anything goes wrong, the MC will deal with it, so you can relax",
    7: "Yes, there are 5 in the grounds, all self contained",
    8: "Normally you'd be able to use it, but it'll be closed throughout September for refurbishment, I'm afraid",
    9: "The gym will be available though, at no extra charge",
    10: "And the tennis courts but there is a small additional payment for those",
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
    localStorage.setItem("/2019/Test 4/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2019/Test 4/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2019/Test 4/listening");
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
                {renderText("Enquiry about booking hotel room")}
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
              {renderText("Enquiry about booking hotel room for event")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* ---------- Example ---------- */}
              <li className="text-lg">
                <span>{renderText("(Example) Andrew is the")}</span>
                <span className="ml-2 font-semibold">
                  {renderText("Events Manager")}
                </span>
              </li>

              <h2 className="text-lg font-bold mt-6">{renderText("Rooms")}</h2>

              <li className="text-lg">
                <span>{renderText("Adelphi Room")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("number of people who can sit down to eat:")}
                </span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("has a gallery suitable for musicians")}
              </li>

              <li className="text-lg">
                <span>{renderText("can go out and see the")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("in pots on the terrace")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("terrace has a view of a group of")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">{renderText("Carlton Room")}</li>

              <li className="text-lg">
                <span>
                  {renderText("number of people who can sit down to eat:")}
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">{renderText("view of the lake")}</li>

              <h2 className="text-lg font-bold mt-6">
                {renderText("Options")}
              </h2>

              <li className="text-lg">
                <span>{renderText("Master of Ceremonies: can give")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("while people are eating")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("will provide")}</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>{renderText("if there are any problems")}</span>
              </li>

              <h2 className="text-lg font-bold mt-6">
                {renderText("Accommodation")}
              </h2>

              <li className="text-lg">
                <span>{renderText("in hotel rooms or")}</span>
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
                  value={userAnswers[7] || ""}
                  onChange={(e) => handleInputChange(7, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>
          </div>

          {/* third step */}

          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 8-10")}
            </h1>
            <p>
              {renderText(
                "Look at the following statements (Questions 8-10) and the list of people below."
              )}
            </p>
            <p>
              {renderText("Match each statement with the correct person, ")}
              <span className="font-bold text-lg">{renderText("A-C")}</span>
            </p>
            <p>
              {renderText("Choose the correct letter, ")}
              <span className="font-bold text-lg">{renderText("A-C")}</span>
              {renderText(", in boxes 9-13 on your answer sheet.")}
            </p>
            <p>
              <span className="font-bold text-lg">{renderText("NB")}</span>
              {renderText(" You may use any letter more than once.")}
            </p>

            <div className="flex items-center justify-center">
              <div className="flex items-center border-2 border-gray-300 w-80 md:w-96 px-4 py-8 justify-center">
                <div>
                  <h1 className="text-xl font-bold text-center mb-4 hidden sm:block">
                    {renderText("Availability")}
                  </h1>
                  <ul className="list-[upper-alpha] list-inside text-lg">
                    <li>{renderText("included in cost of hiring room")}</li>
                    <li>{renderText(".available at extra charge")}</li>
                    <li>{renderText("not available")}</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">{renderText("8.")}</span>
              <span>{renderText("outdoor swimming pool")}</span>

              <div className="relative w-40">
                <select className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">{renderText("8")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">{renderText("9.")}</span>
              <span>{renderText("gym")}</span>

              <div className="relative w-40">
                <select className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">{renderText("9")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">{renderText("10.")}</span>
              <span>{renderText("tennis courts")}</span>

              <div className="relative w-40">
                <select className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">{renderText("10")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Listening2019;
