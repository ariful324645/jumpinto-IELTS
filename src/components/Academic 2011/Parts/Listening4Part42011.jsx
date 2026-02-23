import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";


import Listening4Pagination2011 from "../Pagination 2011/Listening4Pagination2011";

const Listening4Part42011 = () => {
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

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
  const questions = [
    "Paul decided to get work experience in South America because he wanted",
    "What project work did Paul originally intend to get involved in?",
    "Why did Paul change from one project to another?",
    "In the village community, he learnt how important it was to",
    "What does Paul say about his project manager?",
    "Paul was surprised to be given",
  ];

  const options = [
    [
      "A. to teach English there.",
      "B. to improve his Spanish.",
      "C. to learn about Latin American life.",
    ],
    ["A. construction", "B. agriculture", "C. tourism"],
    [
      "A. His first job was not well organised.",
      "B. He found doing the routine work very boring.",
      "C. The work was too physically demanding.",
    ],
    ["A. respect family life.", "B. develop trust.", "C. use money wisely."],
    [
      "A. He let Paul do most of the work.",
      "B. His plans were too ambitious.",
      "C. He was very supportive of Paul.",
    ],
    [
      "A. a computer to use",
      "B. so little money to live on.",
      "C. an extension to his contract",
    ],
  ];
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 21;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

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

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

const correctAnswers = {
  31: "C",
  32: "B",
  33: "C",
  34: "A",
  35: "B",
  36: "B",
  37: "animal",
  38: "sea levels",
  39: "hunting",
  40: "creation",
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
    localStorage.setItem("/listening2Part32020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  //update  button function
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
       "Section 4. You will hear a lecturer giving a talk about Australian rock art to a group of archaeology students.",
       "First, you have some time to look at questions 31 to 40.",
       "Now listen carefully and answer questions 31 to 40.",
     ],
   },

   {
     speaker: "SPEAKER",
     text: [
       "Good morning everyone.",
       "I've been invited to talk about my research project into Australian Aboriginal rock paintings.",
       "The Australian Aborigines have recorded both real and symbolic images of their time on rock walls for many thousands of years.",
       "Throughout the long history of this tradition, new images have appeared, and new painting styles have developed.",
       "And these characteristics can be used to categorize the different artistic styles.",
       "Among these are what we call the dynamic, yam, and modern styles of painting.",
       "One of the most significant characteristics of the different styles is the way that humans are depicted in the paintings.",
       "The more recent paintings show people in static poses.",
       {
         text: "But the first human images to dominate rock art paintings over 8,000 years ago were full of movement.",
         number: 31,
       },
       "These paintings showed people hunting and cooking food, and so they were given the name dynamic to reflect this energy.",
       "It's quite amazing considering they were painted in such a simple stick-like form.",
       "In the Yam period, there was a movement away from stick figures to a more naturalistic shape.",
       "However, they didn't go as far as the modern style, which is known as x-ray, because it actually makes a feature of the internal skeleton, as well as the organs of animals and humans.",
       {
         text: "The yam style of painting got its name from the fact that it featured much curvier figures that actually resembled the vegetable called yam, which is similar to a sweet potato.",
         number: 32,
       },
       {
         text: "The modern paintings are interesting because they include paintings at the time of the first contact with European settlers.",
         number: 33,
       },
       "Aborigines managed to convey the idea of the settlers' clothing by simply painting the Europeans without any hands, indicating the habit of standing with their hands in their pockets.",
       "Size is another characteristic.",
       "The more recent images tend to be life size or even larger.",
       {
         text: "But the dynamic figures are painted in miniature.",
         number: 34,
       },
       "Aboriginal rock art also records the environmental changes that occurred over thousands of years.",
       "For example, we know from the dynamic paintings that over 8,000 years ago Aborigines would have rarely eaten fish, and sea levels were much lower at this time.",
       {
         text: "In fact, fish didn't start to appear in paintings until the Yam period, along with shells and other marine images.",
         number: 35,
       },
       {
         text: "The paintings of the Yam tradition also suggest that during this time, the Aborigines moved away from animals as their main food source, and began including vegetables in their diet.",
         number: 36,
       },
       "Fresh water creatures didn't appear in the paintings until the modern period from 4,000 years ago.",
       "So these paintings have already taught us a lot, but one image that has always intrigued us is known as the Rainbow Serpent.",
       "The Rainbow Serpent, which is the focus of my most recent project, gets its name from its snake or serpent-like body, and it first appeared in the Yam period 4 to 6,000 years ago.",
       "Many believe it is a curious mixture of kangaroo, snake and crocodile, but we decided to study the rainbow serpent paintings to see if we could locate the animal that the very first painters based their image on.",
       {
         text: "The Yam period coincided with the end of the last Ice Age.",
         number: 37,
       },
       {
         text: "This brought about tremendous change in the environment, with the sea levels rising and creeping steadily inland.",
         number: 38,
       },
       {
         text: "This flooded many familiar land features, and also caused a great deal of disruption to traditional patterns of life, hunting in particular.",
         number: 39,
       },
       "New shores were formed, and totally different creatures would have washed up onto the shores.",
       "We studied 107 paintings of the rainbow serpent, and found that the one creature that matches it most closely was the ribboned pipefish, which is a type of seahorse.",
       "This sea creature would have been a totally unfamiliar sight in the inland regions where the image is found, and it may have been the inspiration behind the early paintings.",
       "So, at the end of the Ice Age, there would have been enormous changes in animal and plant life.",
       "It's not surprising then that the Aborigines linked this abundance to the new creatures they witnessed.",
       {
         text: "Even today, Aborigines see the rainbow serpent as a symbol of creation.",
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

    if (speaker === "PAUL")
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
            <h1 className="text-xl font-bold">{renderText("    PART 3")}</h1>
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight(!highlight)}
              className="toggle toggle-accent"
            />
          </div>
          {/* Updated button */}
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
                {renderText(
                  "Paul's South American Experience and University Module Choices",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
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
                        "Are you sure you want to clear all answers?",
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

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 31-36")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "Which painting styles have the following features?",
                )}
                <br />
                <br />
                {renderText("Choose the correct letter, ")}
                <span className="font-bold mx-2">{renderText("A-C")}</span>
                {renderText(" next to Questions 31-36.")}
              </h3>

              <div className="flex items-center justify-center border border-black py-4 px-4 w-80 mx-auto">
                <div className="text-center">
                  <h1 className="text-xl font-bold mb-5">
                    {renderText("Australian Aboriginal Rock Paintings")}
                  </h1>

                  <h2 className="text-lg font-semibold mb-3">
                    {renderText("Painting Styles")}
                  </h2>

                  <ul className="space-y-2 text-lg">
                    <li>{renderText("A. Dynamic")}</li>
                    <li>{renderText("B. Yam")}</li>
                    <li>{renderText("C. Modern")}</li>
                  </ul>
                </div>
              </div>
              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            <h1 className="text-lg font-bold">{renderText("Features")}</h1>

            {/* ---------- Question 31 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("31.")}</span>
              <span>{renderText("figures revealing bones")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("31")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 32 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("32.")}</span>
              <span>{renderText("rounded figures")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[32] || ""}
                  onChange={(e) => handleInputChange(32, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("32")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 33 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("33.")}</span>
              <span>{renderText("figures with parts missing")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[33] || ""}
                  onChange={(e) => handleInputChange(33, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("33")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 34 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("34.")}</span>
              <span>{renderText("figures smaller than life size")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[34] || ""}
                  onChange={(e) => handleInputChange(34, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("34")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 35 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("35.")}</span>
              <span>{renderText("sea creatures")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[35] || ""}
                  onChange={(e) => handleInputChange(35, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("35")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 36 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("36.")}</span>
              <span>{renderText("plants")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[36] || ""}
                  onChange={(e) => handleInputChange(36, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("36")}</option>
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

          {/* box*/}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 37-40")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("NO MORE THAN THREE WORDS AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          {/* ----------  Box ---------- */}
          <div className="border p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Rainbow Serpent Project")}
            </h1>

            <p className="text-lg font-semibold text-center">
              {renderText("Aim of project:")}
            </p>

            <p className="text-lg flex items-center justify-center gap-2 flex-wrap">
              {renderText("to identify the")}
              <button
                onClick={() => toggleButton(37)}
                className={`w-8 h-8 rounded-full border-2 ${
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
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText("used as the basis for the Rainbow Serpent")}
            </p>

            <hr />

            <p className="text-lg font-semibold text-center">
              {renderText("Yam Period")}
            </p>

            <p className="text-lg flex items-center justify-center gap-2 flex-wrap">
              {renderText("environmental changes led to higher")}
              <button
                onClick={() => toggleButton(38)}
                className={`w-8 h-8 rounded-full border-2 ${
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
            </p>

            <p className="text-lg flex items-center justify-center gap-2 flex-wrap">
              {renderText("traditional activities were affected, especially")}
              <button
                onClick={() => toggleButton(39)}
                className={`w-8 h-8 rounded-full border-2 ${
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
            </p>

            <hr />

            <p className="text-lg font-semibold text-center">
              {renderText("Rainbow Serpent image")}
            </p>

            <p className="text-lg text-center">
              {renderText("similar to a sea horse")}
            </p>

            <p className="text-lg text-center">
              {renderText("unusual because it appeared in inland areas")}
            </p>

            <p className="text-lg flex items-center justify-center gap-2 flex-wrap">
              {renderText("symbolises")}
              <button
                onClick={() => toggleButton(40)}
                className={`w-8 h-8 rounded-full border-2 ${
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
                className="border rounded-md px-2 py-1 w-40"
              />
              {renderText("in Aboriginal culture")}
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
                    All Answers (31-40)
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
      <Listening4Pagination2011></Listening4Pagination2011>
    </div>
  );
};

export default Listening4Part42011;
