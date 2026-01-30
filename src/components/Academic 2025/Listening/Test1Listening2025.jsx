import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2025 from "../Pagination 2025/Listening1Pagination2025";

const Test1Listening2025 = () => {
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
        "Part 1. You will hear a woman asking a friend for restaurant recommendations.",
        "First, you have some time to look at questions 1 to 4.",
        "Now listen carefully and answer questions 1 to 4.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I've been meaning to ask you for some advice about restaurants.",
        "I need to book somewhere to celebrate my sister's 30th birthday,",
        "and I like the sound of that place you went to for your mum's 50th.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "The Junction?",
        "Yeah, I'd definitely recommend that for a special occasion.",
        "We had a great time there.",
        "Everyone really enjoyed it.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Where is it again?", "I can't remember."],
    },
    {
      speaker: "MAN",
      text: [
        "It's on Greyson Street,",
        "only about a two minute walk from the station.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, that's good.",
        "I'd prefer not to have to drive anywhere,",
        "but I don't want to have to walk too far either.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, the location is perfect,",
        "but that's not necessarily why I'd recommend it.",
        "The food's amazing.",
        {
          text: "If you like fish, it's probably the best restaurant in town for that.",
          number: 1,
        },
        "It's always really fresh, and there are lots of interesting dishes to choose from.",
        "But all the food is good there.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Is it really expensive?"],
    },
    {
      speaker: "MAN",
      text: [
        "It's certainly not cheap,",
        "but for a special occasion, I think it's fine.",
        "It's got a great atmosphere.",
        "And before dinner, you can go up on the roof and have a drink.",
        {
          text: "It's really nice up there, but you need to book.",
          number: 2,
        },
        "It's very popular, as the views are spectacular.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Hmm, sounds good.",
        "So that's definitely a possibility then.",
        "Is there anywhere else you can think of?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "If you want somewhere a bit less formal,",
        "then you could try Paloma.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Where's that?", "I haven't heard of it."],
    },
    {
      speaker: "MAN",
      text: [
        "No, it's quite new.",
        "It's only been open a few months,",
        "but it's got a great reputation already.",
        "It's in a really beautiful old building on Bow Street.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, I think I know where you mean.", "Right beside the cinema."],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, that's it.",
        "I've only been there a couple of times,",
        "but I was really impressed.",
        "The chef used to work at Don Filipe's apparently.",
        "I was really sorry when that closed down.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "So is all the food they serve Spanish then?",
          number: 3,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yeah, you can get lots of small dishes to share,",
        {
          text: "which always works really well if you're in a group.",
          number: 3,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Hmm.", "Worth thinking about."],
    },
    {
      speaker: "MAN",
      text: [
        "Yeah, there's a lively atmosphere,",
        "and the waiters are really friendly.",
        "The only thing is that you need to pay a fifty pound deposit to book a table.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "A lot of restaurants are doing that these days.",
        "I should have a look at the menu to check there's a good choice of vegetarian dishes.",
        "A couple of my friends have stopped eating meat.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Not sure, I'd say the selection of those would be quite limited.",
          number: 4,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation,",
        "you have some time to look at questions 5 to 10.",
        "Now listen and answer questions 5 to 10.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "I've just thought of another idea.",
        "Have you been to the Audley?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["No, don't think I've heard of it.", "How's it spelt?"],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "AUDLEY.",
          number: 5,
        },
        "You must have heard of it.",
        "There's been a lot about it in the press.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "I don't tend to pay much attention to that kind of thing.",
        "So where is it exactly?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "It's in that hotel near Baxter Bridge,",
        {
          text: "on the top floor.",
          number: 6,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, the views would be incredible from up there."],
    },
    {
      speaker: "MAN",
      text: [
        "Yeah, I'd love to go.",
        "I can't think of the chef's name,",
        "but she was a judge on that TV cookery show recently,",
        "and she's written a couple of cookery books.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Oh, Angela Frayn."],
    },
    {
      speaker: "MAN",
      text: [
        "That's the one.",
        {
          text: "Anyway, it's had excellent reviews from all the newspapers.",
          number: 7,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["That would be a memorable place for a celebration."],
    },
    {
      speaker: "MAN",
      text: [
        "Definitely.",
        "Obviously it's worth going there just for the view,",
        "but the food is supposed to be really special.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["She only likes cooking with local products, doesn't she?"],
    },
    {
      speaker: "MAN",
      text: [
        "Yes.",
        {
          text: "Everything at the restaurant has to be sourced within a short distance,",
          number: 8,
        },
        "and absolutely nothing flown in from abroad.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["I imagine it's really expensive though."],
    },
    {
      speaker: "MAN",
      text: [
        "Well, you could go for the set lunch.",
        "That's quite reasonable for a top class restaurant,",
        {
          text: "£30 a head.",
          number: 9,
        },
        "In the evening, I think it would be more like £50.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "At least that I should think,",
        "but I'm sure everyone would enjoy it.",
        "It's not the kind of place you leave feeling hungry though, is it?",
        "With tiny portions.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "No, the reviews I've read didn't mention that.",
        {
          text: "I imagine they'd be average.",
          number: 10,
        },
      ],
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
    1: "fish", // Good for people who are especially keen on fish
    2: "roof", // The roof is a good place for a drink
    3: "Spanish", // Spanish food, good for sharing
    4: "vegetarian", // A limited selection of vegetarian food
    5: "Audley", // Name of restaurant: The Audley
    6: "hotel", // At the top of a hotel
    7: "reviews", // All the reviews are very good
    8: "local", // Only uses local ingredients
    9: "30", // Set lunch costs £30 per person
    10: "average", // Portions probably of average size
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
                {renderText("Restaurant Recommendations for a Celebration")}
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
            {renderText("Complete the table below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Table ---------- */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-400 text-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">
                    {renderText("Name of restaurant")}
                  </th>
                  <th className="border p-3 text-left">
                    {renderText("Location")}
                  </th>
                  <th className="border p-3 text-left">
                    {renderText("Reason for recommendation")}
                  </th>
                  <th className="border p-3 text-left">
                    {renderText("Other comments")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border p-3">The Junction</td>
                  <td className="border p-3">
                    Greyson Street, near the station
                  </td>
                  <td className="border p-3">
                    Good for people who are especially keen on
                    <div className="flex items-center gap-2 mt-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                  </td>
                  <td className="border p-3">
                    {" "}
                    <p>{renderText("Quite expensive")}</p>
                    <div className="flex  items-center gap-2 mt-2">
                      <p>{renderText("the")}</p>
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                    <p>{renderText("is a good place for a drink")}</p>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border p-3">{renderText("Paloma")}</td>
                  <td className="border p-3">
                    {renderText("	In Bow Street next to the cinema")}
                  </td>
                  <td className="border p-3">
                    <div className="flex items-center gap-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                    food, good for sharing
                  </td>
                  <td className="border p-3">
                    {" "}
                    Staff are very friendly <br />
                    Need to pay £50 deposit <br />A limited selection of
                    <div className="flex items-center gap-2 mt-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                    food on the menu
                  </td>
                </tr>

                {/* Row 3 */}

                {/* Row 4 */}
                <tr>
                  <td className="border p-3">
                    The
                    <div className="flex items-center gap-2 mt-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                  </td>
                  <td className="border p-3">
                    At the top of a
                    <div className="flex items-center gap-2 mt-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                  </td>
                  <td className="border p-3">
                    A famous chef <br />
                    All the
                    <div className="space-y-2 mt-2">
                      <div className="flex gap-2">
                        {" "}
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
                          className="border px-2 py-1 w-24"
                        />
                      </div>
                      <div className="flex gap-2">
                        {" "}
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
                          className="border px-2 py-1 w-24"
                        />
                      </div>
                    </div>
                    are very good
                  </td>
                  <td className="border p-3">
                    Only uses
                    <div className="flex items-center gap-2 mt-2"></div>
                    ingredients <br />
                    Set lunch costs £
                    <div className="flex items-center gap-2 mt-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                    per person <br />
                    Portions probably of
                    <div className="flex items-center gap-2 mt-2">
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
                        className="border px-2 py-1 w-24"
                      />
                    </div>
                    size
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      <Listening1Pagination2025></Listening1Pagination2025>
    </div>
  );
};

export default Test1Listening2025;
