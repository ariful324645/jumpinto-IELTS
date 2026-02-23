import React, { useEffect, useRef, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

import Listening1Pagination2011 from "../Pagination 2011/Listening1Pagination2011";

const Listening1Part42011 = () => {
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
  31: "surface",
  32: "environment",
  33: "impact",
  34: "urban",
  35: "problems",
  36: "images",
  37: "patterns",
  38: "distortion",
  39: "traffic",
  40: "weather",
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

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/listening");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);
  //Button Update
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [voices, setVoices] = useState([]);

  const utteranceRef = useRef(null);
  const progressInterval = useRef(null);

const lines = [
  {
    speaker: "ANNOUNCER",
    text: [
      "Section 4, you will hear a lecturer's introduction to a geography module.",
      "First, you have some time to look at questions 31 to 40.",
      "Now listen carefully and answer questions 31 to 40.",
    ],
  },

  {
    speaker: "SPEAKER",
    text: [
      "So, welcome to your introductory geography lecture.",
      "We'll begin with some basics.",
      "Firstly, what do we learn by studying geography?",
      "Well, we learn a great deal about all the processes that have affected and that continue to affect the Earth's surface, but we learn far more than that.",
      {
        text: "Because studying geography also informs us about the different kinds of relationships that develop between a particular environment and the people that live there.",
        number: 31,
      },
      "OK, we like to think of geography as having two main branches.",
      "There's the study of the nature of our planet, its physical features, what it actually looks like.",
      "And then there's the study of the ways in which we choose to live, and of the impact of those on our planet.",
      {
        text: "Our current use of carbon fuels is a good example of that.",
        number: 33,
      },
      "But there are more specific study areas to consider too, and we'll be looking at each of these in turn throughout the semester.",
      "These include biophysical geography — the study of the natural environment and all its living things.",
      "Then there's topography, that looks at the shapes of the land and oceans.",
      "There's political geography and social geography too, which is the study of communities of people.",
      "We have economic geography, in which we examine all kinds of resources and their use — agriculture for example.",
      "Next comes historical geography, understanding how people and their environments and the ways they interact have changed over time.",
      "Urban geography focuses on the location of cities, the services they provide, and migration of people.",
      {
        text: "And lastly, we have cartography — the art and science of map making.",
        number: 34,
      },
      "Studying this subject is important because without geographical knowledge, we would know very little about our surroundings.",
      "We wouldn't be able to identify all the problems that relate to them.",
      {
        text: "By definition, we wouldn't be in an informed position to work out how to solve any of them.",
        number: 35,
      },
      "Now for some practicalities — what do geographers actually do?",
      "We collect data to begin with, for example by conducting a census.",
      "We also need images of the Earth's surface produced by computer technology or satellite relays.",
      {
        text: "We've come a very long way from the early exploration of the world by sailing ships when geographers only had pens and paper.",
        number: 36,
      },
      "After we've gathered information, we analyze it and look for patterns — most commonly causes and consequences.",
      {
        text: "This kind of information helps us to predict and resolve problems that could affect the world we live in.",
        number: 37,
      },
      "We then publish our findings so that other people can access and be informed by it — often in the form of maps.",
      "Maps can be folded and stored, or collected into an atlas.",
      "They show physical features of the entire planet or small areas in detail.",
      "However, there is a drawback — you cannot perfectly represent a three-dimensional planet on a flat map.",
      {
        text: "There will always be distortion.",
        number: 38,
      },
      "We can also use aerial photographs taken at high altitude.",
      "These show features not easily visible from the ground, such as diseased trees, traffic flow, or deep seabeds.",
      "Then there are landsats — satellites that circle the earth and transmit information to computers.",
      "They provide massive data, including weather information.",
      {
        text: "So what we're going to do now is look at a short presentation in which you'll see all these tools.",
        number: 40,
      },
    ],
  },

  {
    speaker: "ANNOUNCER",
    text: [
      "That is the end of Section 4.",
      "You now have half a minute to check your answers.",
    ],
  },
];
  const flatText = lines.flatMap((line, lineIndex) =>
    line.text.map((chunk, chunkIndex) => ({
      text: chunk,
      lineIndex,
      chunkIndex,
    })),
  );
  useEffect(() => {
    let total = 0;

    flatText.forEach((item) => {
      const actualText =
        typeof item.text === "string" ? item.text : item.text.text;

      total += actualText.split(" ").length * 0.45;
    });

    setTotalDuration(total);
  }, [flatText]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      if (voiceList.length > 0) {
        setVoices(voiceList);
        setVoicesLoaded(true);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }, []);

  const getVoice = (speaker) => {
    if (!voices.length) return null;

    if (speaker === "TUTOR")
      return voices.find((v) => v.name.includes("Male")) || voices[0];

    if (speaker === "SPEAKER")
      return (
        voices.find((v) => v.name.includes("Female")) || voices[1] || voices[0]
      );

    return voices[0]; // ANNOUNCER
  };

  const speakFromIndex = (index) => {
    if (index >= flatText.length) {
      stopCompletely();
      return;
    }

    const item = flatText[index];

    setCurrentLine(item.lineIndex);
    setCurrentChunk(item.chunkIndex);
    setCurrentIndex(index);

    const actualText =
      typeof item.text === "string" ? item.text : item.text.text;

    const utterance = new SpeechSynthesisUtterance(actualText);

    utterance.voice = getVoice(lines[item.lineIndex].speaker);
    utterance.rate = 1;

    utterance.onstart = () => {
      setCurrentLine(item.lineIndex);
      setCurrentChunk(item.chunkIndex);
    };

    utterance.onend = () => {
      speakFromIndex(index + 1);
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const startProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= totalDuration) {
          clearInterval(progressInterval.current);
          return totalDuration;
        }
        return prev + 0.5;
      });
    }, 500);
  };

  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleControl = () => {
    if (!voicesLoaded) {
      alert("Voices still loading... please wait 1 second and click again.");
      return;
    }

    if (!isPlaying) {
      // যদি আগে pause করা থাকে
      if (currentIndex > 0 && !window.speechSynthesis.speaking) {
        speakFromIndex(currentIndex);
        startProgress();
        setIsPlaying(true);
        return;
      }

      // First time start
      window.speechSynthesis.cancel();
      setCurrentIndex(0);
      setProgress(0);
      speakFromIndex(0);
      startProgress();
      setIsPlaying(true);
    } else {
      // Pause করলে পুরো speech cancel করবো
      window.speechSynthesis.cancel();
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    }
  };

  const stopCompletely = () => {
    window.speechSynthesis.cancel();
    clearInterval(progressInterval.current);
    setIsPlaying(false);
    setCurrentLine(null);
    setCurrentChunk(null);
    setCurrentIndex(0);
    setProgress(0);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const newIndex = Math.floor((percent / 100) * flatText.length);
    window.speechSynthesis.cancel();
    clearInterval(progressInterval.current);
    setCurrentIndex(newIndex);
    setProgress((percent / 100) * totalDuration);
    if (isPlaying) {
      speakFromIndex(newIndex);
      startProgress();
    }
  };

  const renderLine = (line, lineIdx) => (
    <p key={lineIdx} className="text-lg">
      <span className="font-bold">{line.speaker}:</span>{" "}
      {line.text.map((chunk, chunkIdx) => {
        let parts = [chunk];
        highlightedTexts.forEach((ht) => {
          parts = parts.flatMap((part) =>
            typeof part === "string"
              ? part.split(ht).flatMap((p, i, arr) =>
                  i < arr.length - 1
                    ? [
                        p,
                        <span key={Math.random()} className="bg-yellow-200">
                          {ht}
                        </span>,
                      ]
                    : [p],
                )
              : [part],
          );
        });

        return (
          <span
            key={chunkIdx}
            className={
              lineIdx === currentLine && chunkIdx === currentChunk
                ? "bg-green-200 transition-all duration-300"
                : ""
            }
          >
            {parts}{" "}
          </span>
        );
      })}
    </p>
  );

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
          <div className="space-y-4">
            <button
              onClick={handleControl}
              className={`px-6 py-2 rounded-full text-white ${isPlaying ? "bg-yellow-500" : "bg-green-500"}`}
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            <div className="flex items-center gap-4">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={(progress / totalDuration) * 100 || 0}
                onChange={handleSeek}
                className="w-full"
              />
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

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
                {renderText("An Introduction to Geography")}
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
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border max-w-2xl mx-auto p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Geography")}
            </h1>

            {/* Q31 */}
            <p className="text-lg">
              {renderText(
                "Studying geography helps us to understand the effects of different processes on the",
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText("of the Earth")}
            </p>

            {/* Q32 */}
            <p className="text-lg">
              {renderText("the dynamic between")}
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText("and population")}
            </p>

            {/* Q33 */}
            <p className="text-lg">
              {renderText("human lifestyles and their")}
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q34 */}
            <p className="text-lg">
              {renderText(
                "biophysical, topographic, political, social, economic, historical and",
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText("geography and also cartography")}
            </p>

            {/* Q35 */}
            <p className="text-lg">
              {renderText(
                "geography helps us to understand our surroundings and the associated",
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q36 */}
            <p className="text-lg">
              {renderText(
                "find data - e.g. conduct censuses, collect information in the form of",
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q37 */}
            <p className="text-lg">
              {renderText("analyse data - identify")}
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q38 */}
            <p className="text-lg">
              {renderText("BUT a two-dimensional map will always have some")}
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q39 */}
            <p className="text-lg">
              {renderText("aerial photos - can show vegetation problems,")}
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
            </p>

            {/* Q40 */}
            <p className="text-lg">
              {renderText("Landsat pictures used for monitoring")}
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
                className="border rounded-md px-2 py-1 w-32 mx-2"
              />
              {renderText("conditions etc.")}
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
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
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
      <Listening1Pagination2011></Listening1Pagination2011>
    </div>
  );
};

export default Listening1Part42011;
