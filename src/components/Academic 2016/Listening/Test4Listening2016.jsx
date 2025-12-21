import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Listening4Pagination2016 from "../Pagination2016/Listening4Pagination2016";

const Test4Listening2016 = () => {
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
        "Section 1. You will hear a woman telephoning for information about a festival.",
        "First, you have some time to look at questions 1 to 7.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "ROB",
      text: ["Good morning, Stretton Festival box office. How can I help you?"],
    },
    {
      speaker: "MELANIE",
      text: [
        "Oh, hello. My family and I are on holiday in the area, and we've seen some posters about the festival this week. Could you tell me about some of the events, please?",
      ],
    },
    {
      speaker: "ROB",
      text: ["Of course."],
    },
    {
      speaker: "MELANIE",
      text: [
        "Uh. First of all, are there still tickets available for the jazz band on Saturday?",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "There are, but only £15. The £12 seats have all been sold.",
        {
          text: "The man says that tickets are available for 15 pounds.",
          number: 0,
        },
      ],
    },
    {
      speaker: "MELANIE",
      text: ["OK, and the venue is the school, isn't it?"],
    },
    {
      speaker: "ROB",
      text: [
        "Yes, that's right.",
        {
          text: " The secondary school.",
          number: 1,
        },
        "Make sure you don't go to the primary school by mistake.",
        "And there's an additional performer who isn't mentioned on the posters. Carolyn Hart is going to play with the band.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "Oh, I think I've heard her on the radio. Doesn't she play the oboe or flute or something?",
      ],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "Yes, the flute.",
          number: 2,
        },
        "She usually plays with symphony orchestras, and apparently this is her first time with a jazz band.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "Well, I'd certainly like to hear her. Then the next thing I want to ask about is the duck races. I saw a poster beside a river. What are they exactly?",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "Well, you buy a yellow plastic duck, or as many as you like. They're a pound each, and you write your name on each one. There'll be several races, depending on the number of ducks taking part. And John Stevens, a champion swimmer who lives locally, is going to start the races. Then they'll float along the river for 500 meters, as far as the railway bridge.",
        {
          text: "All the ducks will be launched into the river at the back of the cinema.",
          number: 3,
        },
      ],
    },
    {
      speaker: "MELANIE",
      text: ["And are there any prizes?"],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "Yes, the first duck in each race to arrive at the finishing line wins its owner free tickets for the concert on the last night of the festival.",
          number: 4,
        },
        "The first duck in each race wins a prize.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "You said you can buy a duck. I'm sure my children will both want one.",
      ],
    },
    {
      speaker: "ROB",
      text: [
        { text: "They're on sale at a stall in the market.", number: 5 },
        "You can't miss it.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "OK, I'll go there this afternoon. I remember walking past there yesterday. Now, uh, could you tell me something about the flower show, please?",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "Well, admission is free. ",
        { text: "And the show is being held in Bythwaite Hall.", number: 6 },
        "The flower show is held in Bythwaite Hall.",
      ],
    },
    {
      speaker: "MELANIE",
      text: ["Sorry, how do you spell that?"],
    },
    {
      speaker: "ROB",
      text: ["BYTHWAITE. Bythwaite."],
    },
    {
      speaker: "MELANIE",
      text: ["Is it easy to find? I'm not very familiar with the town yet."],
    },
    {
      speaker: "ROB",
      text: [
        "Oh, you won't have any problem. It's right in the center of Stretton. It's the only old building in the town, so it's easy to recognize.",
      ],
    },
    {
      speaker: "MELANIE",
      text: ["I know it. I presume it's open all day."],
    },
    {
      speaker: "ROB",
      text: [
        "Yes, but if you'd like to see the prizes being awarded for the best flowers, you'll need to be there at 5 o'clock. ",
        { text: "The prizes are being given by a famous actor,", number: 7 },
        " Kevin Shapeless, he lives nearby and gets involved in a lot of community events.The prizes are awarded by Kevin Shapeless.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "Gosh, I've seen him on TV. I'll definitely go to the prize-giving.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 8 to 10.",
        "Now listen and answer questions 8 to 10.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "I've seen a list of plays that are being performed this week, and I'd like to know which are suitable for my children, and which ones my husband and I might go to.",
      ],
    },
    {
      speaker: "ROB",
      text: ["How old are your children?"],
    },
    {
      speaker: "MELANIE",
      text: ["5 and 7. What about 'The Mystery of Muldoon'?"],
    },
    {
      speaker: "ROB",
      text: [
        { text: "That's aimed at 5 to 10 year olds.", number: 8 },
        "'The Mystery of Muldoon' is for 5 to 10 year olds.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "So, if I take my children, I can expect them to enjoy it more than I do.",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "I think so. If you'd like something for yourself and your husband and leave your children with a babysitter, you might like to see 'Fire and Flood'.",
        {
          text: " It's about events that really happened in Stretton 200 years ago, and children might find it rather frightening.",
          number: 9,
        },
        "'Fire and Flood' might be frightening for children.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "Oh, thanks for the warning. And finally, what about 'Silly Sailor'?",
      ],
    },
    {
      speaker: "ROB",
      text: [
        { text: "That's a comedy, and it's for young and old. ", number: 10 },
        "'In fact, it won an award in the Stretton Drama Festival a couple of months ago.Silly Sailor' is suitable for all ages.",
      ],
    },
    {
      speaker: "MELANIE",
      text: [
        "OK, well, goodbye, and thanks for all the information. I'm looking forward to the festival.",
      ],
    },
    {
      speaker: "ROB",
      text: ["Goodbye."],
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "ROB") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "MELANIE") {
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
    1: "secondary", // The1 school → secondary
    2: "flute", // plays the2 → flute
    3: "cinema", // start behind the3 → cinema
    4: "concert", // Prize: tickets for4 → concert
    5: "market", // Ducks can be bought in the5 → market
    6: "free", // Flower show Fee Hall → free
    7: "Kevin Shapeless", // Prizes presented by Kevin Shapeless
    8: "A", // The Mystery of Muldoon: mainly for children
    9: "B", // Fire and Flood: mainly for adults
    10: "C", // Silly Sailor: suitable for all ages
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
                {renderText("Stretton Festival")}
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

          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-7")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")} <br /> <br />
              {renderText("Write")}{" "}
              <span className="font-bold">
                {renderText("ONE WORD AND/OR A NUMBER")}
              </span>{" "}
              {renderText("for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 text-lg font-bold p-2">
                    {renderText("Event")}
                  </th>
                  <th className="border border-gray-400 text-lg font-bold p-2">
                    {renderText("Cost")}
                  </th>
                  <th className="border border-gray-400 text-lg font-bold p-2">
                    {renderText("Venue")}
                  </th>
                  <th className="border border-gray-400 text-lg font-bold p-2">
                    {renderText("Notes")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Jazz band */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Jazz band")}
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>{renderText("Tickets available for £")}</span>
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>{renderText("The")}</span>
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
                    <span>{renderText("school")}</span>
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>
                      {renderText("Also appearing: Carolyn Hart (plays the")}
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
                    <span>{renderText(")")}</span>
                  </td>
                </tr>

                {/* Duck races */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Duck races")}
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("£1 per duck")}
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("start behind the")}
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
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>{renderText("Prize: tickets for")}</span>
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
                    <span>
                      {renderText(
                        "held at the end of the festival. Ducks can be bought in the"
                      )}
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
                  </td>
                </tr>

                {/* Flower show */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Flower show")}
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Fee")}
                  </td>

                  <td className="border border-gray-400 text-lg p-2">
                    {" "}
                    {renderText("Hall")}
                    <input
                      value={userAnswers[6] || ""}
                      onChange={(e) => handleInputChange(6, e.target.value)}
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <span>
                      {renderText("Prizes presented at 5 pm by a well-known")}
                    </span>
                    <input
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* third step */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 8-10")}
            </h1>
            <p>{renderText("Who is each play suitable for?")}</p>
            <p>
              {renderText("Choose the correct letter, ")}
              <span className="font-bold text-lg">{renderText("A-C")}</span>
              {renderText(", next to Questions 8-10.")}
            </p>

            <div className="flex items-center justify-center">
              <div className="flex items-center border-2 border-gray-300 w-80 md:w-96 px-4 py-8 justify-center">
                <div>
                  <h1 className="text-xl font-bold text-center mb-4 hidden sm:block">
                    {renderText("Plays")}
                  </h1>
                  <ul className="list-[upper-alpha] list-inside text-lg">
                    <li>{renderText("mainly for children")}</li>
                    <li>{renderText("mainly for adults")}</li>
                    <li>{renderText("suitable for people of all ages")}</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">{renderText("8.")}</span>
              <span>{renderText("The Mystery of Muldoon")}</span>
              <div className="relative w-40">
                <select
                  value={userAnswers[8] || ""}
                  onChange={(e) => handleInputChange(8, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="8">{renderText("8")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">{renderText("6.")}</span>
              <span>{renderText("Fire and Flood")}</span>
              <div className="relative w-40">
                <select
                  value={userAnswers[9] || ""}
                  onChange={(e) => handleInputChange(9, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="9">{renderText("9")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">{renderText("10.")}</span>
              <span>{renderText("Silly Sailor")}</span>
              <div className="relative w-40">
                <select
                  value={userAnswers[10] || ""}
                  onChange={(e) => handleInputChange(10, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="10">{renderText("10")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
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
      {/* <Listening4Pagination2019></Listening4Pagination2019> */}
      <Listening4Pagination2016></Listening4Pagination2016>
    </div>
  );
};

export default Test4Listening2016;
