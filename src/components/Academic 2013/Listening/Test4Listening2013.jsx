import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2013 from "../Pagination 2013/Listening4Pagination2013";

const Test4Listening2013 = () => {
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
        "Section 1. You will hear a man asking for information about health services in the place where he is living.",
        "First, you have some time to look at questions 1 to 6.",
        "You will see that there is an example that has been done for you.",
        "On this occasion only, the conversation relating to this will be played first.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Can I help you?"],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, I've just moved to this area with my wife and children, and I'd like to know where we can all register with a doctor at a health center.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["OK. Well, there's Doctor Green at the Harvey clinic."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "The woman says the doctor at the Harvey clinic is called Doctor Green.",
        "So, Green has been written in the space.",
        "Now we shall begin.",
        "You should answer the questions as you listen, because you will not hear the recording a second time.",
        "Listen carefully and answer questions 1 to 6.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Can I help you?"],
    },
    {
      speaker: "MAN",
      text: [
        "Yes, I've just moved to this area with my wife and children, and I'd like to know where we can all register with a doctor at a health center.",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "OK. Well, there's Doctor Green at the Harvey clinic. We always recommend her for babies, because she's very good with them, and she runs a special clinic.",
          number: 1,
        },
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, actually my youngest child is 5, so that wouldn't be any good for us.",
      ],
    },
    {
      speaker: "WOMAN",
      text: ["Right."],
    },
    {
      speaker: "MAN",
      text: ["Is there anywhere else I could try?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Yes, the Eshcol health practice is the next one on my list.",
          number: 2,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["How do you spell that?"],
    },
    {
      speaker: "WOMAN",
      text: [
        "E S H C O L.",
        "And it's Doctor Fuller who has space on his list.",
        "The clinic only opened a year ago, so the facilities are all very modern.",
      ],
    },
    {
      speaker: "MAN",
      text: ["That sounds good."],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "And it's particularly good if you're busy during the day, because they also do appointments in the evening.",
          number: 3,
        },
        "They're closed on Saturday though.",
        "The only other place on the list is the health center on Shore Lane.",
        {
          text: "You can register with Doctor Gormley, that's G O R M L E Y.",
          number: 4,
        },
        "He's new there, but the center has a very good reputation.",
      ],
    },
    {
      speaker: "MAN",
      text: [
        "Oh, yes, I think I know the road.",
        "That would be the best one.",
        "Thanks, uh, could you tell me will all their services be free?",
      ],
    },
    {
      speaker: "WOMAN",
      text: [
        "There are usually some small charges that doctors make.",
        "Let me see what it says about the Shore Lane Center.",
        {
          text: "If you need to be vaccinated before any trips abroad, you won't have to pay for this.",
          number: 6,
        },
        "What else?",
        "The Sports Injury Treatment service operates on a paying basis.",
        "As does the nutritional therapy service.",
        "Some health centers do offer alternative therapies like homeopathy as part of their pay-to-use service.",
        "Shore Lane are hoping to do this soon.",
        "I think they may start with acupuncture.",
        {
          text: "And finally, if you need to prove you're healthy, or haven't had any serious injuries before a new employer will accept you, you can get a free fitness check-up there.",
          number: 5,
        },
        "But you'd most likely have to pay for insurance medicals though.",
      ],
    },
    {
      speaker: "MAN",
      text: ["OK, thanks."],
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
        "You might also be interested to know the center is running a pilot scheme of talks for patients.",
        "I've got the list here, actually they look very interesting.",
      ],
    },
    {
      speaker: "MAN",
      text: ["What sort of things?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Well, the first one's about giving up smoking. It's next week, February 25th at 7 pm, and that's in room 4. The talk will stress the health benefits particularly for people with asthma or heart disease.",
          number: 7,
        },
      ],
    },
    {
      speaker: "MAN",
      text: ["That sounds very interesting."],
    },
    {
      speaker: "WOMAN",
      text: [
        "There's also a talk for families with children, it's on healthy eating, and takes place on the first of March at 5:00.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Will that be at the health center?"],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "Actually it's at the primary school on Shore Lane.",
          number: 8,
        },
        "I imagine they're inviting the parents of pupils there.",
        "It says here all welcome.",
      ],
    },
    {
      speaker: "MAN",
      text: ["Hmm, I might go to that if I have time."],
    },
    {
      speaker: "WOMAN",
      text: [
        {
          text: "There's a couple of other talks, one giving advice about how to avoid injuries while doing exercise. It's on the ninth of March at 4:30 and it'll be in room 6.",
          number: 9,
        },
        {
          text: "It also says the talk is suitable for all ages.",
          number: 10,
        },
        "And finally there's a talk called Stress Management which is...",
      ],
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
    // Questions 1–4 (Health Centres)
    1: "eshcol", // The Eshcol Health Practice
    2: "evening", // offers evening appointments
    3: "gormley", // Dr Gormley
    4: "good", // good reputation

    // Questions 5–6 (Multiple choice – TWO letters)
    "5-6": ["D", "E"], // D. travel advice, E. vaccinations

    // Questions 7–10 (Talks at Shore Lane Health Centre)
    7: "heart", // asthma or heart problems
    8: "primary school", // location of healthy eating talk
    9: "4:30", // time of avoiding injuries talk
    10: "ages", // suitable for all ages
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "5-6") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

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
                {renderText("Healthcare Options and Talks in the Area")}
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
          {/* ================= Questions 1–4 ================= */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–4")}
            </h2>
            <p className="mb-4">
              {renderText(" Complete the table below.")} <br />
              Write <b>{renderText("ONE WORD ONLY")}</b>{" "}
              {renderText("for each answer.")}
            </p>

            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    renderText("Name of centre"),
                    renderText("Doctor's name"),
                    renderText("Advantage"),
                  ].map((h, idx) => (
                    <th key={idx} className="border px-4 py-2 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Row 1 Example */}
                <tr>
                  <td className="border px-4 py-2">
                    {renderText("The Harvey Clinic")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("(Example) Dr")} <b>{renderText("Green")}</b>
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("especially good with")}{" "}
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
                      className="border px-2 py-1 w-28"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">
                    {renderText("The")}{" "}
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
                      className="border px-2 py-1 w-28"
                    />{" "}
                    {renderText("Health Practice")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("Dr Fuller")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("offers")}{" "}
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
                      className="border px-2 py-1 w-28"
                    />{" "}
                    {renderText("appointments")}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border px-4 py-2">
                    {renderText("The Shore Lane Health Centre")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("Dr")}{" "}
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
                  </td>
                  <td className="border px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ================= Questions 5–6 ================= */}
          <div className="mt-8">
            <h2 className="font-bold text-xl">{renderText("Questions 5–6")}</h2>

            <p className="mt-1">{renderText("Choose TWO letters, A–E.")}</p>

            <p className="font-bold mt-2">
              5–6{" "}
              {renderText(
                "Which TWO of the following are offered free of charge at Shore Lane Health Centre?",
              )}
            </p>

            {[
              "acupuncture",
              "employment medicals",
              "sports injury therapy",
              "travel advice",
              "vaccinations",
            ].map((opt, idx) => {
              const value = String.fromCharCode(65 + idx); // A–E
              const selected = userAnswers["5-6"] || [];
              const isChecked = selected.includes(value);
              const isDisabled = selected.length === 2 && !isChecked;

              return (
                <label
                  key={value}
                  className={`flex items-center gap-2 mt-2 cursor-pointer ${
                    isDisabled ? "opacity-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("5-6", value)}
                  />
                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(opt)}</span>
                </label>
              );
            })}
          </div>

          {/* ================= Questions 7–10 ================= */}
          <div className="mt-14">
            <h2 className="text-lg font-bold mb-3">
              {" "}
              {renderText("Questions 7–10")}
            </h2>
            <p className="mb-4">
              {renderText("Complete the table below.")} <br />
              Write{" "}
              <b>{renderText("NO MORE THAN TWO WORDS AND/OR A NUMBER")}</b>.
            </p>

            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  {["Subject", "Date / Time", "Location", "Notes"].map((h) => (
                    <th key={h} className="border px-4 py-2 text-left">
                      {renderText(h)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border px-4 py-2">
                    {renderText("Giving up smoking")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("25th February, 7 pm")}
                  </td>
                  <td className="border px-4 py-2">{renderText("room 4")}</td>
                  <td className="border px-4 py-2">
                    {renderText("useful for people with asthma or")}{" "}
                    <button
                      onClick={() => toggleButton(7)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[7]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      {renderText("7")}
                    </button>
                    <input
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="border px-2 py-1 w-24"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">
                    {renderText("Healthy eating")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("1st March, 5 pm")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("the")}{" "}
                    <button
                      onClick={() => toggleButton(8)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[8]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      {renderText("8")}
                    </button>
                    <input
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="border px-2 py-1 w-28"
                    />{" "}
                    {renderText("(Shore Lane)")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("anyone welcome")}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border px-4 py-2">
                    {renderText("Avoiding injuries during exercise")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderText("9th March at")}{" "}
                    <button
                      onClick={() => toggleButton(9)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[9]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      {renderText("9")}
                    </button>
                    <input
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="border px-2 py-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">{renderText("room 6")}</td>
                  <td className="border px-4 py-2">
                    {renderText("for all")}{" "}
                    <button
                      onClick={() => toggleButton(10)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[10]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      {renderText("10")}
                    </button>
                    <input
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="border px-2 py-1 w-20"
                    />
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
                  {renderText("Submit Answers")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText("Your Score: ")} {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (11–20)")}
                  </h3>

                  <ul className="space-y-3">
                    {[1, 2, 3, 4, "5-6", 7, 8, 9, 10].map((num) => {
                      const user = userAnswers[num];
                      const correct = correctAnswers[num];

                      const isCorrect = (() => {
                        if (Array.isArray(correct)) {
                          return (
                            Array.isArray(user) &&
                            user.length === correct.length &&
                            correct.every((val) => user.includes(val))
                          );
                        } else {
                          return (
                            user?.trim().toLowerCase() ===
                            correct?.trim().toLowerCase()
                          );
                        }
                      })();

                      const noAnswer = !user;

                      const userAnswerDisplay = Array.isArray(user)
                        ? user.join(", ")
                        : user?.trim() || "";
                      const correctAnswerDisplay = Array.isArray(correct)
                        ? correct.join(", ")
                        : correct?.trim();

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect && (
                              <FaDotCircle className="text-green-600 text-xl font-bold" />
                            )}
                            {!isCorrect && (
                              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                <ImCross className="text-white text-sm font-bold" />
                              </div>
                            )}
                            <p className="font-bold">Q{num}:</p>
                          </div>

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              userAnswerDisplay
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            {correctAnswerDisplay}
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
      <Listening4Pagination2013></Listening4Pagination2013>
    </div>
  );
};

export default Test4Listening2013;
