import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2021 from "../Pagination 2021/Listening4Pagination2021";

const Listening4Part42021 = () => {
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
        "Part 4, you will hear part of an environmental science lecture about a large bird called the dodo, which is now extinct.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "One of the most famous cases of extinction is that of a bird known as the dodo.",
        "In fact, there's even a saying in English, as dead as the dodo.",
        "Used to refer to something which no longer exists.",
        "But for many centuries, the dodo was alive and well, although it could only be found in one place, the island of Mauritius in the Indian Ocean.",
        "It was a very large bird, about 1 meter tall, and over the centuries it had lost the ability to fly, but it survived happily under the trees that covered the island.",
        "Then, in the year 1507, the first Portuguese ships stopped at the island.",
        "The sailors were carrying spices back to Europe.",
        {
          text: "And found the island a convenient stopping place where they could stock up with food and water for the rest of the voyage, but they didn't settle on Mauritius.",
          number: 31,
        },
        "However, in 1638 the Dutch arrived and set up a colony there.",
        {
          text: "These first human inhabitants of the island found the dodo birds a convenient source of meat, although not everyone liked the taste.",
          number: 32,
        },
        "It's hard to get an accurate description of what the dodo actually looked like.",
        "We do have some written records from sailors, and a few pictures.",
        "But we don't know how reliable these are.",
        {
          text: "The best known picture is a Dutch painting, in which the bird appears to be extremely fat, but this may not be accurate.",
          number: 33,
        },
        "An Indian painting done at the same time shows a much thinner bird.",
        "Although attempts were made to preserve the bodies of some of the birds, no complete specimen survives.",
        "In the early 17th century, four dried parts of a bird were known to exist.",
        "Of these, three have disappeared.",
        {
          text: "So only one example of soft tissue from the dodo survives, a dodo head.",
          number: 34,
        },
        "Bones have also been found, but there's only one complete skeleton in existence.",
        "This single dodo skeleton has recently been the subject of scientific research, which suggests that many of the earlier beliefs about dodos may have been incorrect.",
        "For example, early accounts of the birds mention how slow and clumsy it was, but scientists now believe the bird's strong knee joints would have made it capable of movement, which was not slow, but actually quite fast.",
        {
          text: "In fact, one 17th century sailor wrote that he found the birds hard to catch.",
          number: 35,
        },
        "It's true that the dodo's small wings wouldn't have allowed it to leave the ground, but the scientists suggest that these were probably employed for balance,",
        { text: "while going over uneven ground.", number: 36 },
        "Another group of scientists carried out analysis of the dodo's skull.",
        "They found that the reports of the lack of intelligence of the dodo were not borne out by their research, which suggested the bird's brain was not small.",
        { text: "But average in size.", number: 37 },
        "In fact, in relation to its body size, it was similar to that of the pigeon, which is known to be a highly intelligent bird.",
        "The researchers also found that the structure of the bird's skull suggested that one sense which was particularly well developed was that of smell.",
        {
          text: "So, the dodo may also have been particularly good at locating ripe fruit and other food in the island's thick vegetation.",
          number: 38,
        },
        "So it looks as if the dodo was better able to survive and defend itself than was originally believed, yet less than 200 years after Europeans first arrived on the island, they had become extinct.",
        "So what was the reason for this?",
        "For a long time, it was believed that the dodos were hunted to extinction, but scientists now believe the situation was more complicated than this.",
        "Another factor may have been the new species brought to the island by the sailors.",
        "These included dogs, which would have been a threat to the dodos, and also monkeys, which ate the fruit that was the main part of the dodo's diet.",
        "These were brought to the island deliberately.",
        "The ships also brought another type of creature, rats, which came to land from the ships and rapidly overran the island.",
        {
          text: "These upset the ecology of the island, not just the dodos, but other species too.",
          number: 39,
        },
        "However, they were a particular danger to the dodos, because they consumed their eggs, and since each dodo only laid one at a time.",
        "This probably had a devastating effect on populations.",
        "However, we now think that probably the main cause of the bird's extinction was not the introduction of non-native species.",
        "But the introduction of agriculture.",
        {
          text: "This meant that the forest that had once covered all the island, and that had provided a perfect home for the dodo, was cut down.",
          number: 40,
        },
        "So that crops such as sugar could be grown.",
        "So, although the dodo had survived for thousands of years, suddenly it was gone.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 4.",
        "You now have one minute to check your answers to part 4.",
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
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "SPEAKER") {
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
    31: "spices", // Portuguese ships transporting spices
    32: "colony", // Dutch established a colony
    33: "fat", // Dutch painting shows dodo was fat
    34: "head", // Only remaining soft tissue is a dried head
    35: "movement", // Birds capable of rapid movement
    36: "balance", // Wings used to maintain balance
    37: "brain", // Their brain was of average size
    38: "smell", // Sense of smell enabled them to find food
    39: "rats", // Rats also escaped and ate eggs
    40: "forest", // Farming destroyed the forest
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
    localStorage.setItem("/listening4Part42021", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("listening4Part42021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("listening4Part42021");
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
                {renderText("The Dodo: From History to Extinction")}
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
          <div className="border p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("THE EXTINCTION OF THE DODO BIRD")}
            </h1>

            <p className="text-lg">
              {renderText(
                "The dodo was a large flightless bird which used to inhabit the island of Mauritius."
              )}
            </p>

            <p className="text-lg font-semibold">{renderText("History")}</p>

            {/* Q31 */}
            <p className="text-lg">
              {renderText("1507 - Portuguese ships transporting")}
              <button
                onClick={() => toggleButton(31)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                31
              </button>
              <input
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" stopped at the island to collect food and water.")}
            </p>

            {/* Q32 */}
            <p className="text-lg">
              {renderText("1638 - The Dutch established a")}
              <button
                onClick={() => toggleButton(32)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                32
              </button>
              <input
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" on the island.")}
            </p>

            <p className="text-lg">
              {renderText("They killed the dodo birds for their meat.")}
              <br />
              {renderText("The last one was killed in 1681.")}
            </p>

            <p className="text-lg font-semibold">{renderText("Description")}</p>

            {/* Q33 */}
            <p className="text-lg">
              {renderText("A Dutch painting suggests the dodo was very")}
              <button
                onClick={() => toggleButton(33)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                33
              </button>
              <input
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            {/* Q34 */}
            <p className="text-lg">
              {renderText("The only remaining soft tissue is a dried")}
              <button
                onClick={() => toggleButton(34)}
                className="mx-2 w-8 h-8 rounded-full border-2"
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

            {/* Q35 */}
            <p className="text-lg">
              {renderText(
                "Recent studies of a dodo skeleton suggest the birds were capable of rapid"
              )}
              <button
                onClick={() => toggleButton(35)}
                className="mx-2 w-8 h-8 rounded-full border-2"
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

            {/* Q36 */}
            <p className="text-lg">
              {renderText(
                "It's thought they were able to use their small wings to maintain"
              )}
              <button
                onClick={() => toggleButton(36)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                36
              </button>
              <input
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            {/* Q37 */}
            <p className="text-lg">
              {renderText("Their")}
              <button
                onClick={() => toggleButton(37)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                37
              </button>
              <input
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" was of average size.")}
            </p>

            {/* Q38 */}
            <p className="text-lg">
              {renderText("Their sense of")}
              <button
                onClick={() => toggleButton(38)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                38
              </button>
              <input
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" enabled them to find food.")}
            </p>

            <p className="text-lg font-semibold">
              {renderText("Reasons for extinction")}
            </p>

            <p className="text-lg">
              {renderText("Hunting was probably not the main cause.")}
              <br />
              {renderText("Sailors brought dogs and monkeys.")}
            </p>

            {/* Q39 */}
            <p className="text-lg">
              <button
                onClick={() => toggleButton(39)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                39
              </button>
              <input
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                " also escaped onto the island and ate the birds' eggs."
              )}
            </p>

            {/* Q40 */}
            <p className="text-lg">
              {renderText("The arrival of farming meant the")}
              <button
                onClick={() => toggleButton(40)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                40
              </button>
              <input
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" was destroyed.")}
            </p>
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
      <Listening4Pagination2021></Listening4Pagination2021>
    </div>
  );
};

export default Listening4Part42021;
