import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening2Pagination2022 from "../Pagination2022/Listening2Pagination2022";
const Test2Listening2022 = () => {
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
        "Part 1. You will hear a man asking about voluntary work in the village that he has just moved to.",
        "First, you have some time to look at questions 1 to 7.",
        "Now listen carefully and answer questions 1 to 7.",
      ],
    },
    {
      speaker: "JANE",
      text: ["Hello, Jane Fairbanks speaking."],
    },
    {
      speaker: "FRANK",
      text: [
        "Oh, good morning. My name is Frank Pritchard.",
        "I've just retired and moved to Southoe.",
        "I'd like to become a volunteer.",
        "And I gather you coordinate voluntary work in the village.",
      ],
    },
    {
      speaker: "JANE",
      text: ["That's right."],
    },
    {
      speaker: "FRANK",
      text: ["What sort of thing could I do?"],
    },
    {
      speaker: "JANE",
      text: [
        "Well, we need help with the village library.",
        "We borrow books from the town library, and individuals also donate them.",
        {
          text: "So one thing you could do is get involved in collecting them, if you've got a car.",
          number: 1,
        },
      ],
    },
    {
      speaker: "FRANK",
      text: ["Yes, that's no problem."],
    },
    {
      speaker: "JANE",
      text: [
        "The times are pretty flexible, so we can arrange it to suit you.",
        {
          text: "Oh, another thing is the records that we keep of the books we're given and those we borrow and need to return to the town library.",
          number: 2,
        },
        "It would be very useful to have another person to help keep them up to date.",
      ],
    },
    {
      speaker: "FRANK",
      text: [
        "Right. I'm used to working on a computer.",
        "I presume they're computerized?",
      ],
    },
    {
      speaker: "JANE",
      text: ["Oh, yes."],
    },
    {
      speaker: "FRANK",
      text: [
        "Is the library purpose built?",
        "I haven't noticed it when I've walked around the village.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        {
          text: "No, we simply have the use of a room in the village hall, the West Room.",
          number: 3,
        },
        "It's on the left as you go in.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["I must go and have a look inside the hall."],
    },
    {
      speaker: "JANE",
      text: ["Yes, it's a nice building."],
    },
    {
      speaker: "FRANK",
      text: [
        "Do you run a lunch club in the village for elderly people?",
        "I know a lot of places do.",
      ],
    },
    {
      speaker: "JANE",
      text: ["Yes, we have a very successful club."],
    },
    {
      speaker: "FRANK",
      text: [
        {
          text: "I could help with transport, if that's of any use.",
          number: 4,
        },
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Oh, definitely.",
        "People come to the club from neighboring villages, and we're always in need of more drivers.",
      ],
    },
    {
      speaker: "FRANK",
      text: [
        "And does the club have groups that focus on a particular hobby too?",
        {
          text: "I could get involved in one or two, particularly if there are any art groups.",
          number: 5,
        },
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Excellent. I'll find out where we need help and get back to you.",
      ],
    },
    {
      speaker: "FRANK",
      text: [
        "Fine. What about help for individual residents? Do you arrange that at all?",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Yes, we do it as a one-off.",
        {
          text: "Oh, in fact, there's Mrs Carroll. She needs a lift to the hospital next week, and we're struggling to find someone.",
          number: 6,
        },
      ],
    },
    {
      speaker: "FRANK",
      text: ["When's her appointment?"],
    },
    {
      speaker: "JANE",
      text: ["On Tuesday. It would take the whole morning."],
    },
    {
      speaker: "FRANK",
      text: ["I could do that."],
    },
    {
      speaker: "JANE",
      text: [
        "Oh, that would be great. Thank you.",
        {
          text: "And also next week, we're arranging to have some work done to Mr Selsbury's house before he moves. If you could do some weeding in his garden, that would be wonderful.",
          number: 7,
        },
      ],
    },
    {
      speaker: "FRANK",
      text: [
        "OK, I'd enjoy that.",
        "And presumably the day and time are flexible.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Oh, yes.",
        "Just say when would suit you best, and we'll let Mr Selsbury know.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["Good."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 8 to 10.",
        "Now listen and answer questions 8 to 10.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "The volunteers group also organizes monthly social events, which is a great way to meet other people, of course.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["Uh huh."],
    },
    {
      speaker: "JANE",
      text: [
        {
          text: "So, next month on the 19th of October, we're holding a quiz.",
          number: 8,
        },
        "A couple of residents are great at planning unusual ones, and we always fill the village hall.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["That sounds like fun. Can I do anything to help?"],
    },
    {
      speaker: "JANE",
      text: [
        "Well, because of the number of people, we need plenty of refreshments for halfway through.",
        "So, if you could provide any, we'd be grateful.",
      ],
    },
    {
      speaker: "FRANK",
      text: [
        "I'm sure I could. I'll think about what to make and let you know.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Thank you.",
        "Then on November the 18th, we're holding a dance, also in the village hall.",
        "We've booked a band that specializes in music of the 1930s.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["I'm not really a dancer, but I'd like to do something to help."],
    },
    {
      speaker: "JANE",
      text: [
        {
          text: "Well, we sell tickets in advance, and having an extra person to check them at the door would be good.",
          number: 9,
        },
        "It can be quite a bottleneck if everyone arrives at once.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["OK, I'm happy with that."],
    },
    {
      speaker: "JANE",
      text: [
        "Oh, we're also arranging a New Year's Eve party.",
        "Instead of the village hall, it'll be held in the Mountfort Hotel.",
        {
          text: "The one thing we haven't got yet is a poster.",
          number: 10,
        },
      ],
    },
    {
      speaker: "FRANK",
      text: [
        "Well, actually, yes.",
        "Before I retired, I was a graphic designer, so that's right up my street.",
      ],
    },
    {
      speaker: "JANE",
      text: [
        "Perfect. I'll give you the details, and then perhaps you could send me a draft.",
      ],
    },
    {
      speaker: "FRANK",
      text: ["Of course."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 1.",
        "You now have half a minute to check your answers to Part 1.",
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
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
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
    1: "collecting", // Help with collecting books
    2: "records", // Keep records of books up to date
    3: "West", // West Room in the village hall
    4: "transport", // Help by providing transport
    5: "art", // Help with hobbies such as art
    6: "hospital", // Taking Mrs Carroll to hospital
    7: "garden", // Work in the garden at Mr Selsbury's house
    8: "quiz", // Event on 19 Oct is a quiz
    9: "tickets", // Checking tickets
    10: "poster", // Designing the poster
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
                {renderText(
                  "Opportunities for voluntary work in Southoe village"
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
            {renderText("Questions 1–7")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border max-w-xl mx-auto p-6 rounded-lg space-y-4 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "Opportunities for voluntary work in Southoe village"
              )}
            </h1>

            {/* ---------- Library ---------- */}
            <h2 className="text-lg font-bold mt-4">{renderText("Library")}</h2>

            {/* Q1 */}
            <p className="text-lg">
              {renderText("Help with")}
              <button
                onClick={() => toggleButton(1)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                1
              </button>
              <input
                value={userAnswers[1] || ""}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("books (times to be arranged)")}
            </p>

            {/* Q2 */}
            <p className="text-lg">
              {renderText("Help needed to keep")}
              <button
                onClick={() => toggleButton(2)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                2
              </button>
              <input
                value={userAnswers[2] || ""}
                onChange={(e) => handleInputChange(2, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("of books up to date")}
            </p>

            {/* Q3 */}
            <p className="text-lg">
              {renderText("Library is in the")}
              <button
                onClick={() => toggleButton(3)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                3
              </button>
              <input
                value={userAnswers[3] || ""}
                onChange={(e) => handleInputChange(3, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("Room in the village hall")}
            </p>

            {/* ---------- Lunch club ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Lunch club")}
            </h2>

            {/* Q4 */}
            <p className="text-lg">
              {renderText("Help by providing")}
              <button
                onClick={() => toggleButton(4)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                4
              </button>
              <input
                value={userAnswers[4] || ""}
                onChange={(e) => handleInputChange(4, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Q5 */}
            <p className="text-lg">
              {renderText("Help with hobbies such as")}
              <button
                onClick={() => toggleButton(5)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                5
              </button>
              <input
                value={userAnswers[5] || ""}
                onChange={(e) => handleInputChange(5, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* ---------- Help for individuals ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Help for individuals needed next week")}
            </h2>

            {/* Q6 */}
            <p className="text-lg">
              {renderText("Taking Mrs Carroll to")}
              <button
                onClick={() => toggleButton(6)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                6
              </button>
              <input
                value={userAnswers[6] || ""}
                onChange={(e) => handleInputChange(6, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Q7 */}
            <p className="text-lg">
              {renderText("Work in the")}
              <button
                onClick={() => toggleButton(7)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                7
              </button>
              <input
                value={userAnswers[7] || ""}
                onChange={(e) => handleInputChange(7, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("at Mr Selsbury's house")}
            </p>
          </div>

          {/* ---------- Questions 8–10 ---------- */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 8–10")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the table below.")} <br />
            {renderText("Write ONE WORD ONLY for each answer.")}
          </p>

          {/* ---------- Table ---------- */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-400 text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Event</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Help needed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">19 Oct</td>
                  <td className="border p-2">
                    <button
                      onClick={() => toggleButton(8)}
                      className="mr-2 w-8 h-8 rounded-full border-2"
                    >
                      8
                    </button>
                    <input
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </td>
                  <td className="border p-2">Village hall</td>
                  <td className="border p-2">providing refreshments</td>
                </tr>

                <tr>
                  <td className="border p-2">18 Nov</td>
                  <td className="border p-2">dance</td>
                  <td className="border p-2">Village hall</td>
                  <td className="border p-2">
                    checking
                    <button
                      onClick={() => toggleButton(9)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      9
                    </button>
                    <input
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="border rounded-md px-2 py-1 w-32"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border p-2">31 Dec</td>
                  <td className="border p-2">New Year's Eve party</td>
                  <td className="border p-2">Mountfort Hotel</td>
                  <td className="border p-2">
                    designing the
                    <button
                      onClick={() => toggleButton(10)}
                      className="mx-2 w-8 h-8 rounded-full border-2"
                    >
                      10
                    </button>
                    <input
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="border rounded-md px-2 py-1 w-32"
                    />
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
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
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
                      const userAnswer = userAnswers[num]?.trim() || "";
                      const correctAnswer = correctAnswers[num]?.trim();
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
                              <span className=" italic">
                                No answer provided
                              </span>
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
      <Listening2Pagination2022></Listening2Pagination2022>
    </div>
  );
};

export default Test2Listening2022;
