import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2024 from "../Pagination 2024/Listening4Pagination2024";

const Listening4Part42024 = () => {
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
        "Part 3, you will hear two students called Jane and Kieran talking about books.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "So, Jane, you'll be off to Denmark soon to do your work placement.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Yes, I'm really looking forward to it. And I've just started packing up all my books to put in storage.",
      ],
    },
    {
      speaker: "KIERAN",
      text: ["Well, I hope they don't get spoiled."],
    },
    {
      speaker: "JANE",
      text: [
        "It's OK. My grandfather works in a bookshop, and he told me how to pack them.",
      ],
    },
    {
      speaker: "KIERAN",
      text: ["Oh, that's helpful."],
    },
    {
      speaker: "JANE",
      text: [
        "He says you have to support the spine, otherwise the paper can come away from the cover.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [{ text: "Yeah, that's obvious.", number: 21 }],
    },
    {
      speaker: "JANE",
      text: [
        "He also told me to pack them flat in the box, not on their side. Again because they can bend, and if you leave them like that for, say, a year. It's quite hard to get them back to their normal shape.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "Well, it's pretty clear that ruins them, but a lot of people just can't be bothered to protect their books.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "He always says it's such a shame that publishers don't use better quality paper.",
      ],
    },
    {
      speaker: "KIERAN",
      text: ["It's the acid in the paper that causes the problem, isn't it?"],
    },
    {
      speaker: "JANE",
      text: [
        "Yeah, that's why old books go yellow. You know, some of the books my grandfather's given me are like that already. I should dump them really, if they're going to deteriorate further, but I'd feel bad. ",
        {
          text: "They'll always remind me of him, he's quite a collector you know.",
          number: 22,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: ["Well, if they're important to you."],
    },
    {
      speaker: "JANE",
      text: ["Yeah, I'd regret just throwing them away."],
    },
    {
      speaker: "KIERAN",
      text: [
        "You know, maybe it's because I was taught to treasure books, but I hate seeing students force open the pages of paperbacks. They press so hard they end up breaking the spine.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "I know, but unfortunately paperbacks aren't designed to last a long time, and people know that. Hardbacks aren't quite as weak.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "Yeah, they're different, I suppose. But I still don't think people value hardbacks like they used to.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Yeah, that's why old books go yellow.You know, some of the books my grandfather's given me are like that already.I should dump them really, if they're going to deteriorate further, but I'd feel bad",
        {
          text: "Well, they aren't decorative, are they, like other objects? Plus nowadays people don't keep them out on shelves as much as they used to.",
          number: 23,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "That's such a pity. When I visit someone - if they have, say, a colorful book on a table, it's the first thing I'm drawn to.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "I agree. And book covers can be a work of art in themselves. Some are really eye-catching.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "I've always been taught to handle books carefully. If you watch someone take a book off a shelf, well, they usually do it wrong.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Ah, my grandfather says, you should put your hand right over the top of the book... or if you can't do that, pull the other books on the shelf aside, so that you can hold the whole cover.",
      ],
    },
    {
      speaker: "KIERAN",
      text: ["When did you learn all this?"],
    },
    {
      speaker: "JANE",
      text: [
        {
          text: "He watched me pull a heavy book off the shelf when I was small.24And it fell on the floor and broke apart.",
          number: 24,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: ["Oh, dear."],
    },
    {
      speaker: "JANE",
      text: ["I can still remember it."],
    },
    {
      speaker: "KIERAN",
      text: ["You know what I really like?"],
    },
    {
      speaker: "JANE",
      text: ["What?"],
    },
    {
      speaker: "KIERAN",
      text: ["The smell of new books."],
    },
    {
      speaker: "JANE",
      text: ["Me too."],
    },
    {
      speaker: "KIERAN",
      text: [
        "My parents used to laugh at me when I was a kid, because I loved putting books up to my nose. Almost as much as reading them.",
      ],
    },
    {
      speaker: "JANE",
      text: [{ text: "New books aren't cheap though, are they?", number: 25 }],
    },
    {
      speaker: "KIERAN",
      text: [
        "I guess we're lucky we can buy them. My grandfather stocks second-hand books as well as new ones. And they don't smell quite as good.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "I'd love to have a bookshop like your grandfather. What's it like?",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Well, it's quite big. It's got two floors and an attic. And he stocks all kinds of books, really.",
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "I guess he treasures things like first editions and other rare books.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Yeah, you might think he'd keep those in the attic or somewhere.",
      ],
    },
    {
      speaker: "KIERAN",
      text: ["So they'd be hidden."],
    },
    {
      speaker: "JANE",
      text: [
        "Yeah, but he likes people to know that he has them.",
        {
          text: " So he puts them out in the shop, but makes sure you need a ladder to get them.",
          number: 26,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: ["Right, that would prevent any thefts."],
    },
    {
      speaker: "JANE",
      text: [
        "Uh-huh. ",
        {
          text: "He's got a dedicated area on the ground floor with cushions, so that parents can enter with their toddlers, go there, and spend some time reading to them",
          number: 27,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "Ah not exactly. He's got a dedicated area on the ground floor with cushions, so that parents can enter with their toddlers, go there, and spend some time reading to them.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "He hardly ever throws anything away.",
        {
          text: "He just leaves unwanted books by the front door for customers to take",
          number: 28,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "That's good to know. As I said, it's a big shop. And there's a storage area out the back as well.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "",
        {
          text: "Oh, what does he keep there? Books he wants to throw away?",
          number: 29,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "He hardly ever throws anything away. He just leaves unwanted books by the front door for customers to take.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Well, that's very nice.",
        {
          text: "They're actually part of the coffee shop on low shelves all around it.",
          number: 30,
        },
      ],
    },
    {
      speaker: "KIERAN",
      text: [
        "Did you get your course books from him? Naturally. He stocks books for a lot of the colleges. He used to keep these books on the first floor. But now there's a new university in my hometown. He's moved them downstairs to attract the students. They're actually part of the coffee shop on low shelves all around it.",
      ],
    },
    {
      speaker: "KIERAN",
      text: ["Pretty central then, you'll have to take me there sometime."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
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
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JANE") {
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

  // Marks show
  const correctAnswers = {
    31: "invasives", // not include invasive species because of possible invasives with native species
    32: "timber", // provide sustainable sources of timber for local people
    33: "diseases", // increase resistance to diseases and climate change
    34: "agriculture", // not select land which is being used for agriculture
    35: "data", // base planning decisions on accurate data
    36: "deforestation", // endangered by keeping deforestation and illegal logging
    37: "speed", // increasing the speed of recovery by attracting animals and birds
    38: "animals", // animals were soon attracted to the area
    39: "fishing", // difficult for people to make a living from fishing
    40: "floods", // protects against higher risk of floods
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
                  "Reforestation: Challenges, Best Practices, and Community Involvement"
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
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Tree Planting")}
            </h1>

            <h3 className="font-semibold mt-4">
              {renderText("Reforestation projects should:")}
            </h3>

            <p className="text-lg">
              {renderText(
                "include a range of tree species, not include invasive species because of possible"
              )}
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
              />
              {renderText("with native species.")}
            </p>

            <p className="text-lg">
              {renderText(
                "Aim to capture carbon, protect the environment and provide sustainable sources of"
              )}
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
              />
              {renderText("for local people.")}
            </p>

            <p className="text-lg">
              {renderText(
                "Use tree seeds with a high genetic diversity to increase resistance to"
              )}
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
              {renderText("and climate change.")}
            </p>

            <p className="text-lg">
              {renderText(
                "Plant trees on previously forested land which is in a bad condition, not select land which is being used for"
              )}
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
              .
            </p>

            <p className="text-lg">
              {renderText(
                "Base planning decisions on information from accurate"
              )}
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
              />
              .
            </p>

            <p className="text-lg">
              {renderText(
                "Drones are useful for identifying areas in Brazil which are endangered by keeping"
              )}
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
              />
              {renderText("and illegal logging.")}
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Lampang Province, Northern Thailand")}
            </h3>

            <p className="text-lg">
              {renderText(
                "A variety of native fig trees were planted, which are important for supporting many wildlife species, increasing the"
              )}
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
              />
              {renderText("of recovery by attracting animals and birds, e.g.,")}
            </p>

            <p className="text-lg">
              {renderText("were soon attracted to the area, e.g.,")}
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
              />
              .
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Involving local communities")}
            </h3>

            <p className="text-lg">
              {renderText(
                "Destruction of mangrove forests in Madagascar made it difficult for people to make a living from"
              )}
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
              />
              .
            </p>

            <p className="text-lg">
              {renderText(
                "The mangrove reforestation project provides employment, restores ecosystems, and protects against the higher risk of"
              )}
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
      <Listening4Pagination2024></Listening4Pagination2024>
    </div>
  );
};

export default Listening4Part42024;
