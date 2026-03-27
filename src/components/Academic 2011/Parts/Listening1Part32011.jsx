import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening1Pagination2011 from "../Pagination 2011/Listening1Pagination2011";

const Listening1Part32011 = () => {
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

const questions = [
  "The tutor thinks that Sandra's proposal",
  "The proposal would be easier to follow if Sandra",
  "What was the problem with the formatting on Sandra's proposal?",
  "Sandra became interested in visiting the Navajo National Park through",
  "Sandra agrees to include information about",
  "Sandra agrees to include information about",
  "Sandra agrees to include information about",
];

const options = [
  [
    "A. should be re-ordered in some parts.",
    "B. needs a contents page.",
    "C. ought to include more information.",
  ],
  [
    "A. inserted subheadings.",
    "B. used more paragraphs.",
    "C. shortened her sentences.",
  ],
  [
    "A. Separate points were not clearly identified.",
    "B. The headings were not always clear.",
    "C. Page numbering was not used in an appropriate way.",
  ],
  [
    "A. articles she read.",
    "B. movies she saw as a child.",
    "C. photographs she found on the internet.",
  ],
  [
    "A. climate change",
    "B. field trip activities.",
    "C. geographical features",
  ],
  ["A. impact of tourism", "B. myths and legends", "C. plant and animal life"],
  ["A. social history", "B. climate change", "C. field trip activities"],
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
  // different option

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

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

 const correctAnswers = {
   21: "A. should be re-ordered in some parts.",
   22: "C. shortened her sentences.",
   23: "A. Separate points were not clearly identified.",
   24: "B. movies she saw as a child.",
   25: "B. field trip activities.",
   26: "C. plant and animal life",
   27: "C. field trip activities",
   28: "12,000",
   29: "hire horses",
   30: "caves",
 };

  // const [userAnswers, setUserAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState({
    "9-10": [], // initialize empty array
  });

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
    localStorage.setItem("/listening1Part22020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22020");
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
      "Section 3, you will hear a student called Sandra talking to her tutor about a draft proposal she has written for a competition.",
      "First, you have some time to look at questions 21 to 24.",
      "Now listen carefully and answer questions 21 to 24.",
    ],
  },

  {
    speaker: "TUTOR",
    text: [
      "Right, Sandra. You wanted to see me to get some feedback on your group's proposal, the one you're submitting for the Geography Society Field Trip competition.",
      "I've had a look through your proposal, and I think it's a really good choice.",
      "In fact, I only have a few things to say about it, but even in an outline document like this.",
      "You really have to be careful to avoid typos and problems with layout in the proposal, and even in the contents page.",
      "So read it through carefully before submitting it, OK?",
    ],
  },

  {
    speaker: "SANDRA",
    text: ["Will do."],
  },

  {
    speaker: "TUTOR",
    text: [
      {
        text: "And I've made a few notes on the proposal about things which could have been better sequenced.",
        number: 21,
      },
    ],
  },

  {
    speaker: "SANDRA",
    text: ["OK."],
  },

  {
    speaker: "TUTOR",
    text: [
      "As for the writing itself, I've annotated the proposal as and where I thought it could be improved.",
      {
        text: "Generally speaking, I feel you've often used complex structures and long sentences for the sake of it, and as a consequence, although your paragraphing and inclusion of subheadings help.",
        number: 22,
      },
      "It's quite hard to follow your train of thought at times.",
      "Oh, so cut them down a bit, can you?",
    ],
  },

  {
    speaker: "SANDRA",
    text: ["Really?"],
  },

  {
    speaker: "TUTOR",
    text: ["Yes, and don't forget simple formatting like numbering."],
  },

  {
    speaker: "SANDRA",
    text: ["Didn't I use page numbers?"],
  },

  {
    speaker: "TUTOR",
    text: [
      "I didn't mean that.",
      "Look, you've remembered to include headers and footers, which is good, but listing ideas clearly is important.",
      {
        text: "Number them or use bullet points, which is even clearer.",
        number: 23,
      },
      "Then you'll focus the reader on your main points.",
      "I thought your suggestion to go to the Navajo tribal park was a very good idea.",
    ],
  },

  {
    speaker: "SANDRA",
    text: [
      "I've always wanted to go there.",
      "My father was a great fan of cowboy films and the Wild West, so I was subjected to seeing all the epics.",
      { text: "Many of which were shot there.", number: 24 },
      "As a consequence, it feels very familiar to me, and it's awesome both geographically and visually.",
      "So it's somewhere I've always wanted to visit.",
      "The subsequent research I did, and the online photographs made me even keener.",
    ],
  },

  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the conversation, you have some time to look at questions 25 to 30.",
      "Now listen and answer questions 25 to 30.",
    ],
  },

  {
    speaker: "TUTOR",
    text: [
      "Interesting. Right, let's look at the content of your proposal now.",
    ],
  },

  {
    speaker: "SANDRA",
    text: ["Did you find it comprehensive enough?"],
  },

  {
    speaker: "TUTOR",
    text: [
      "Well, yes and no. You've listed several different topics on your contents page.",
      "But I'm not sure they're all relevant.",
    ],
  },

  {
    speaker: "SANDRA",
    text: [
      {
        text: "No? well, I thought that from the perspective of a field trip, one thing I needed to focus on was the sandstone plateau and cliffs themselves.",
        number: 26,
      },
      "The way they tower up from the flat landscape is just amazing.",
      "The fact that the surrounding softer rocks were eroded by wind and rain, leaving these huge outcrops high above the plain.",
      "It's hardly surprising that tourists flock to see the area.",
    ],
  },

  {
    speaker: "TUTOR",
    text: ["Well, yes, I'd agree with including those points."],
  },

  {
    speaker: "SANDRA",
    text: [
      "And then the fact that it's been home to Native American Navajos, and all the social history that goes with that.",
      "The hardships they endured trying to save their territory from the invading settlers, their culture is so rich, all those wonderful stories.",
    ],
  },

  {
    speaker: "TUTOR",
    text: [
      "Well, I agree it's interesting, but it's not immediately relevant to your proposal, Sandra.",
      {
        text: "I think an indication of what the students on the trip could actually do when they get there should be far more central, so that certainly needs to be included, and to be expanded upon.",
        number: 25,
      },
      {
        text: "And I'd like to see something about the local wildlife and vegetation too.",
        number: 27,
      },
    ],
  },

  {
    speaker: "SANDRA",
    text: [
      "OK, I'll do some work on those two areas as well, but you're right, there's not much apart from some very shallow rooted species.",
      "Although it's cold and snowy there in the winter, the earth is baked so hard in the summer sun that rainwater can't penetrate.",
      "So it's a case of flood or drought really.",
    ],
  },

  {
    speaker: "TUTOR",
    text: [
      "So I understand.",
      "Now, before we look at everything in more detail, I've got a few factual questions for you.",
      "It would be a good idea to include the answers in your finished proposal.",
      "Because they're missing from your draft.",
    ],
  },

  {
    speaker: "SANDRA",
    text: ["Fine."],
  },

  {
    speaker: "TUTOR",
    text: [
      "So you mention the monoliths and the spires which was good, but what area does the tribal park cover?",
    ],
  },

  {
    speaker: "SANDRA",
    text: [
      {
        text: "12,000 hectares, and the plain is at about 5,850 meters above sea level.",
        number: 28,
      },
    ],
  },

  {
    speaker: "TUTOR",
    text: [
      "Hmm, larger than I expected.",
      "OK, where's the nearest accommodation?",
      "That's a practical detail that you haven't included.",
    ],
  },

  {
    speaker: "SANDRA",
    text: [
      "Yes, there's nowhere to stay in the park itself.",
      "But there's an old trading post called Goulding quite near.",
      "All kinds of tours start from Goulding, too.",
    ],
  },

  {
    speaker: "TUTOR",
    text: ["What kind of tours?"],
  },

  {
    speaker: "SANDRA",
    text: [
      "Well the most popular are in 4 wheel drive jeeps, but I wouldn't recommend hiring those.",
      {
        text: "I think the best way to appreciate the area would be to hire horses instead and trek around on those.",
        number: 29,
      },
      "Biking is not allowed, and it's impossible to drive around the area in private vehicles.",
      "The tracks are too rough.",
    ],
  },

  {
    speaker: "TUTOR",
    text: ["OK, lastly, what else is worth visiting there?"],
  },

  {
    speaker: "SANDRA",
    text: [
      {
        text: "There are several caves, but I haven't looked into any details.",
        number: 30,
      },
      "I'll find out about them.",
    ],
  },

  {
    speaker: "ANNOUNCER",
    text: [
      "That is the end of section 3.",
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

    if (speaker === "SANDRA")
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
                  "Feedback on the Geography Society Field Trip Proposal",
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

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 21-27")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>
            <h1 className="text-2xl font-bold text-center">
              {renderText("  Field Trip Proposal")}
            </h1>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

                      return (
                        <li
                          key={oIndex}
                          onClick={() => handleOptionClick(qIndex, option)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 inline-block ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-700"
                            }`}
                          ></span>

                          <span
                            className={
                              isSelected ? "text-blue-500" : "text-black"
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* box*/}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 28-30")}
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
              {renderText("Proposal Notes")}
            </h1>

            {/* Question 28 */}
            <p className="text-lg">
              {renderText("28. The tribal park covers")}
              <button
                onClick={() => toggleButton(28)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[28]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                28
              </button>
              <input
                value={userAnswers[28] || ""}
                onChange={(e) => handleInputChange(28, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("hectares.")}
            </p>

            {/* Question 29 */}
            <p className="text-lg">
              {renderText("29. Sandra suggests that they share the")}
              <button
                onClick={() => toggleButton(29)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[29]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                29
              </button>
              <input
                value={userAnswers[29] || ""}
                onChange={(e) => handleInputChange(29, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("for transport.")}
            </p>

            {/* Question 30 */}
            <p className="text-lg">
              {renderText("30. She says they could also explore the local")}
              <button
                onClick={() => toggleButton(30)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[30]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                30
              </button>
              <input
                value={userAnswers[30] || ""}
                onChange={(e) => handleInputChange(30, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(".")}
            </p>
          </div>

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
                    All Answers (21-30)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
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

      <Listening1Pagination2011></Listening1Pagination2011>
    </div>
  );
};

export default Listening1Part32011;
