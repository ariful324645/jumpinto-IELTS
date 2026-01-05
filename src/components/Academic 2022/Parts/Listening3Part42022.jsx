import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2022 from "../Pagination2022/Listening3Pagination2022";
const Listening3Part42022 = () => {
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
        "Part 4. You will hear a zoology student giving a presentation on bird migration.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Scientists believe that a majority of the Earth's bird population migrate in some fashion or other.",
        "Some travel seasonally for relatively short distances, such as birds that move from their winter habitats in lowlands to mountaintops for the summers.",
        "Others, like the Arctic Tern, travel more than 25,000 miles seasonally, between the northern and southern poles.",
        "Bird migration has been studied over many centuries through a variety of observations, but until relatively recently, where birds went to in the winter was considered something of a mystery.",
        "The lack of modern science and technology led to many theories that we now recognize as error-filled, and even somewhat amusing.",
        "Take hibernation theory for example.",
        "Two thousand years ago, it was commonly believed that when birds left an area, they went underwater to hibernate in the seas and oceans.",
        "Another theory for the regular appearance and disappearance of birds was that they spent winter hidden in mud, till the weather changed and food became abundant again.",
        {
          text: "The theory that some birds hibernate persisted until experiments were done on caged birds in the 1940s, which demonstrated that birds have no hibernation instinct.",
          number: 31,
        },
        "One of the earliest naturalists and philosophers from ancient Greece was Aristotle, who was the first writer to discuss the disappearance and reappearance of some bird species at certain times of year.",
        "He developed the theory of transmutation, the seasonal change of one species into another, by observing redstarts and robins.",
        {
          text: "He observed that in the autumn, small birds called redstarts began to lose their feathers, which convinced Aristotle that they changed into robins for the winter.",
          number: 32,
        },
        "And back into redstarts in the summer.",
        {
          text: "These assumptions are understandable, given that this pair of species are similar in shape, but are a classic example of an incorrect interpretation based on correct observations.",
          number: 33,
        },
        "The most bizarre theory was put forward by an English amateur scientist, Charles Morton, in the 17th century.",
        "He wrote a surprisingly well regarded paper, claiming that birds migrate to the moon and back every year.",
        {
          text: "He came to this conclusion as the only logical explanation for the total disappearance of some species.",
          number: 34,
        },
        "One of the key moments in the development of migration theory came in 1822 when a white stork was shot in Germany.",
        "This particular stork made history because of the long spear in its neck, which incredibly had not killed it.",
        {
          text: "Everyone immediately realized this spear was definitely not European.",
          number: 35,
        },
        "It turned out to be a spear from a tribe in central Africa.",
        {
          text: "This was a truly defining moment in the history of ornithology, because it was the first evidence that storks spend their winters in sub-Saharan Africa.",
          number: 36,
        },
        "You can still see the arrow stork in the zoological collection of the University of Rostock in Germany.",
        "People gradually became aware that European birds moved south in autumn and north in summer, but didn't know much about it until the practice of catching birds and putting rings on their legs became established.",
        {
          text: "Before this, very little information was available about the actual destinations of particular species, and how they traveled there.",
          number: 37,
        },
        "People speculated that larger birds provided a kind of taxi service for smaller birds by carrying them on their backs.",
        {
          text: "This idea came about because it seemed impossible that small birds weighing only a few grams could fly over vast oceans.",
          number: 38,
        },
        "This idea was supported by observations of bird behavior, such as the harassment of larger birds by smaller birds.",
        "The development of bird ringing by a Danish school teacher, Hans Christian Cornelius Mortensen, made many discoveries possible.",
        "This is still common practice today, and relies upon what is known as recovery.",
        {
          text: "This is when ringed birds are found dead in the place they have migrated to and identified.",
          number: 39,
        },
        "Huge amounts of data were gathered in the early part of the 20th century, and for the first time in history, people understood where birds actually went to in winter.",
        {
          text: "In 1931, an atlas was published showing where the most common species of European birds migrated to.",
          number: 40,
        },
        "More recent theories about bird migration will be discussed next.",
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
    31: "mud", // birds hibernated underwater or buried themselves in mud
    32: "feathers", // redstarts experience the loss of feathers
    33: "appearance", // the two species had a similar appearance
    34: "moon", // birds fly to the moon in winter
    35: "neck", // African spear in its neck
    36: "proof", // no proof that storks migrate to Africa
    37: "routes", // routes and journeys of migrating birds
    38: "distances", // huge distances
    39: "recovery", // the 'recovery' of dead birds
    40: "map", // the first map to show migration
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
    localStorage.setItem("listening3Part42022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part42022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part42022");
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
                {renderText("Bird Migration Theory")}
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
          <div className="border p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Bird Migration Theory")}
            </h1>

            <p className="text-lg">
              {renderText("Most birds are believed to migrate seasonally.")}
            </p>

            {/* ---------- Hibernation theory ---------- */}
            <h2 className="text-xl font-bold mt-4">
              {renderText("Hibernation theory")}
            </h2>

            <p className="text-lg">
              {renderText(
                "It was believed that birds hibernated underwater or buried themselves in"
              )}
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
            </p>

            <p className="text-lg">
              {renderText(
                "This theory was later disproved by experiments on caged birds."
              )}
            </p>

            {/* ---------- Transmutation theory ---------- */}
            <h2 className="text-xl font-bold mt-4">
              {renderText("Transmutation theory")}
            </h2>

            <p className="text-lg">
              {renderText(
                "Aristotle believed birds changed from one species into another in summer and winter."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "In autumn he observed that redstarts experience the loss of"
              )}
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
              {renderText("and thought they then turned into robins.")}
            </p>

            <p className="text-lg">
              {renderText(
                "Aristotle’s assumptions were logical because the two species of birds had a similar"
              )}
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
            </p>

            {/* ---------- 17th century ---------- */}
            <h2 className="text-xl font-bold mt-4">
              {renderText("17th century")}
            </h2>

            <p className="text-lg">
              {renderText(
                "Charles Morton popularised the idea that birds fly to the"
              )}
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
              {renderText("in winter.")}
            </p>

            {/* ---------- Scientific developments ---------- */}
            <h2 className="text-xl font-bold mt-4">
              {renderText("Scientific developments")}
            </h2>

            <p className="text-lg">
              {renderText(
                "In 1822, a stork was killed in Germany which had an African spear in its"
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
            </p>

            <p className="text-lg">
              {renderText("Previously there had been no")}
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
              {renderText("that storks migrate to Africa.")}
            </p>

            <p className="text-lg">
              {renderText("Little was known about the")}
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
              {renderText(
                "and journeys of migrating birds until the practice of ringing was established."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "It was thought large birds carried small birds on some journeys because they were considered incapable of travelling across huge"
              )}
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
            </p>

            <p className="text-lg">
              {renderText("Ringing depended on what is called the '")}
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
              {renderText("' of dead birds.")}
            </p>

            <p className="text-lg">
              {renderText("In 1931, the first")}
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
              {renderText(
                "to show the migration of European birds was printed."
              )}
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
      <Listening3Pagination2022></Listening3Pagination2022>
    </div>
  );
};

export default Listening3Part42022;
