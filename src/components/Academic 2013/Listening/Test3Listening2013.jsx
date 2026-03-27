import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2013 from "../Pagination 2013/Listening3Pagination2013";

const Test3Listening2013 = () => {
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
        "Section 1. You will hear a telephone conversation between a travel company employee and a customer.",
        "First, you have some time to look at questions 1 to 5.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Greek Island Holidays. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I hope so. I have a friend who's just come back from Corfu, and she's recommended some apartments in Arilas. She thought they might be on your list.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Arilas, Arilas. Let me see, uh, can you give me the names?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, the first's Rose Garden Apartments. I'd like to go with another friend in the last week of October.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Well, we've got a lovely studio flat available at that time. I'm sure you'd enjoy the entertainment program there too, with Greek dancing in the restaurant.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The entertainment program offers Greek dancing. So, Greek dancing has been written in the space.",
        "Now we shall begin. You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully, and answer questions 1 to 5.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Greek Island Holidays. Can I help you?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, I hope so. I have a friend who's just come back from Corfu, and she's recommended some apartments in Arilas. She thought they might be on your list.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Arilas, Arilas. Let me see, uh can you give me the names?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Yes, the first's Rose Garden Apartments. I'd like to go with another friend in the last week of October.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Well, we've got a lovely studio flat available at that time. I'm sure you'd enjoy the entertainment program there too, with Greek dancing in the restaurant.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["And the cost for each of us?"],
    },
    {
      speaker: "MAN",
      text: [{ text: "Two hundred and nineteen pounds.", number: 1 }],
    },
    {
      speaker: "WOMAN",
      text: [
        "That sounds very reasonable. I'm just jotting down some notes. Now the second one she mentioned was called Blue Bay.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Blue Bay. Yes, in fact that's very popular, and it has some special features.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Really?"],
    },
    {
      speaker: "MAN",
      text: [
        "The main attraction is the large swimming pool with salt water.",
        {
          text: "And it isn't far from the beach either, only 300 meters, and only around half a kilometer to some shops, so you don't have to be too energetic.",
          number: 2,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Is it much more expensive than the first one?"],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Let me just check. I think at the time you want to go, it's around 260 pounds - no 275 pounds to be exact.",
          number: 3,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Right, I've got that. Now, there are just 2 more apartments to ask you about. Um. I can't read my own writing. Something to do with sun... Sunshine, is it?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "I think you meant the Sunshade Apartments. They're on a mountainside.",
          number: 4,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Any special features?"],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, each room has its own sun terrace, and there are shared barbecue facilities.",
        "It also provides water sports. It has its own beach. There are facilities for water skiing.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Any kite-surfing? My friend's quite keen."],
    },
    {
      speaker: "MAN",
      text: [
        "Not at the hotel, but I'm sure you'll find some in Arilas. There's also satellite TV in the apartments.",
        { text: "And how much is that one? £490 with two sharing.", number: 5 },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["You mean £245 each?"],
    },
    {
      speaker: "MAN",
      text: [
        "I'm afraid not. Each person has to pay that amount, and there must be at least two in an apartment.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "Oh, I don't think that would be within our budget unfortunately. And the last one sounds a bit expensive too, the grand.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "Actually, it's quite reasonable. It's an older style house with Greek paintings in every room, and a balcony outside.",
          number: 6,
        },
        "Well, there are forests all round, and they hide a supermarket just down the road.",
        {
          text: "So that's very useful for all your shopping needs.",
          number: 7,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["And the price?"],
    },
    {
      speaker: "MAN",
      text: [
        { text: "319 pounds at that time.", number: 8 },
        "But if you leave it till November, it goes down by 40%.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Too late, I'm afraid."],
    },
    {
      speaker: "MAN",
      text: ["Well, why don't I send you a brochure with full details, Ms...?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Nash. But don't worry about that. I'm coming to Upminster soon, and I'll call and get one. I just wanted to get an idea first.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Well, that's fine. Um. We've got plenty here when you come."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.",
        "Now listen and answer questions 6 to 10.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "If you've got a minute, could I just check a couple of points about insurance? I got one policy through the post, but I'd like to see if yours is better.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Fine. Uh. What would you like to know?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "Well, the one I've got has benefits, and then the maximum amount you can claim. Is that like yours?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, that's how most of them are.",
        "Well, the first thing is cancellation. If the holiday's canceled on the policy I've got, you can claim £8,000.",
        {
          text: "We can improve on that, Ms Nash. For Greek Island Holidays, our maximum is £10,000.",
          number: 9,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "That's good, of course, our holiday won't even cost £1,000 together.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "It's still sensible to have good cover. Now, if you go to hospital, we allow 600 pounds.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Yes, mine's similar."],
    },
    {
      speaker: "MAN",
      text: [
        {
          text: "And we also allow a relative to travel to your holiday resort.",
          number: 10,
        },
      ],
    },
    {
      speaker: "WOMAN",
      text: ["My policy just says their representative will help you."],
    },
    {
      speaker: "MAN",
      text: [
        "You can see there's another difference there. And what happens if you don't get on the plane?",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Uh. Nothing as far as I can see on this form."],
    },
    {
      speaker: "MAN",
      text: [
        "Don't you have missed departure? We pay up to £1,000 for that, depending on the reason, and we're particularly generous about loss of personal belongings up to £3,000 but not more than £500 for a single item.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Then I'd better not take my laptop."],
    },
    {
      speaker: "MAN",
      text: ["Not unless you insure it separately."],
    },
    {
      speaker: "WOMAN",
      text: [
        "OK, thanks very much for your time. You've really been helpful. Can I get back to you? Your name is?",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Ben Ludlow. That's LUDLOW. I'm the Assistant Manager here. I'll give you my number. It's 081260543216.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "But didn't I phone 081260567294, that's what I've got on the paper.",
      ],
    },
    {
      speaker: "MAN",
      text: ["That's the main switchboard. I've given you my direct line."],
    },
    {
      speaker: "WOMAN",
      text: ["Right, thank you very much for your time..."],
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
    // Questions 1–5 (Accommodation Form)
    1: "anu", // Name
    2: "march 31st", // Date of birth
    3: "nursing", // Course of study
    4: "2", // Number of years planned in hall
    5: "no", // Special dietary requirements (no red meat)

    // Questions 6–10 (Greek Island Holidays)
    6: "1500", // Cancellation: £1500
    7: "relative", // Additional benefit allows a relative to travel to resort
    8: "delayed", // Delayed departure
    9: "item", // £500 for one item (personal belongings)
    10: "ben", // Name of Assistant Manager
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
                {renderText("Arranging University Hall Accommodation")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <h2 className="text-lg font-bold mb-3">Questions 1–5</h2>
          <h3 className="text-lg mb-6">
            Complete the table below. <br />
            Write <span className="font-bold">
              ONE WORD AND/OR A NUMBER
            </span>{" "}
            for each answer.
          </h3>

          <tbody>
            {/* Row 1 - Example */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-2">
                Rose Garden Apartments
              </td>
              <td className="border border-gray-300 px-4 py-2">studio flat</td>
              <td className="border border-gray-300 px-4 py-2">
                (Example) entertainment programme: Greek{" "}
                <input
                  value="dancing"
                  readOnly
                  className="border rounded-md px-2 py-1 w-28 bg-gray-100"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">£219</td>
            </tr>

            {/* Row 2 */}
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                Blue Bay Apartments
              </td>
              <td className="border border-gray-300 px-4 py-2">
                large salt-water swimming pool
              </td>
              <td className="border border-gray-300 px-4 py-2">
                just{" "}
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
                  className="border rounded-md px-2 py-1 w-16 mx-1"
                />{" "}
                metres from beach
                <br />
                near shops
              </td>
              <td className="border border-gray-300 px-4 py-2">£275</td>
            </tr>

            {/* Row 3 */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-2">
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
                  className="border rounded-md px-2 py-1 w-20 mr-1"
                />
                Apartments
              </td>
              <td className="border border-gray-300 px-4 py-2">terrace</td>
              <td className="border border-gray-300 px-4 py-2">water sports</td>
              <td className="border border-gray-300 px-4 py-2">£490</td>
            </tr>

            {/* Row 4 */}
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">The Grand</td>
              <td className="border border-gray-300 px-4 py-2">
                Greek paintings{" "}
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
                  className="border rounded-md px-2 py-1 w-20 ml-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                overlooking{" "}
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
                  className="border rounded-md px-2 py-1 w-20 ml-1"
                />
                <br />
                near a supermarket and a disco
              </td>
              <td className="border border-gray-300 px-4 py-2">
                £{" "}
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
                  className="border rounded-md px-2 py-1 w-20 ml-1"
                />
              </td>
            </tr>
          </tbody>

          <div className="mt-10">
            <h2 className="font-bold text-xl mb-4">
              {renderText("Questions 6-10")}
            </h2>
            <p className="mb-4">{renderText("Complete the table below")}</p>
            <p className="mb-4">
              {renderText("Write ONE WORD AND/OR A NUMBER for each answer.")}
            </p>
          </div>
          <div className="mt-20">
            <h2 className="text-xl font-bold text-center mb-4">
              {renderText("GREEK ISLAND HOLIDAYS")}
            </h2>
            <table className="min-w-full  border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  {["Insurance Benefits", "Maximum Amount"].map((col) => (
                    <th
                      key={col}
                      className="border border-gray-300 px-4 py-2 text-left font-semibold"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
                    Cancellation
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    £{" "}
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
                      className="border rounded-md px-2 py-1 w-24 ml-1"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Hospital</td>
                  <td className="border border-gray-300 px-4 py-2">
                    £600. Additional benefit allows a{" "}
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
                      className="border rounded-md px-2 py-1 w-28 mx-1"
                    />{" "}
                    to travel to resort
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
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
                      className="border rounded-md px-2 py-1 w-28"
                    />{" "}
                    departure
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Up to £1000. Depends on reason
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    Personal belongings
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Up to £3000; £500 for one{" "}
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
                      className="border rounded-md px-2 py-1 w-24 ml-1"
                    />
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
                    Name of Assistant Manager
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Ben{" "}
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
                      className="border rounded-md px-2 py-1 w-24 ml-1"
                    />
                  </td>
                </tr>

                {/* Row 6 */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    Direct phone line
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    081260 543216
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ---------- Submit ---------- */}
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
      <Listening3Pagination2013></Listening3Pagination2013>
    </div>
  );
};

export default Test3Listening2013;
