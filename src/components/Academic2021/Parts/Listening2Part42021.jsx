import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening2Pagination2021 from "../Pagination 2021/Listening2Pagination2021";

const Listening2Part42021 = () => {
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

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 4. You will hear a sport science student giving a presentation on the health benefits of dance.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Dancing is something that humans do when they want to have a good time.",
        "It's a universal response to music found in all cultures.",
        "But what's only been discovered recently is that dancing not only makes us feel good, it's also extremely good for our health.",
        "Dancing, like other forms of exercise, releases hormones such as dopamine, which make us feel relaxed and happy, and it also reduces feelings of stress or anxiety.",
        "Dancing is also a sociable activity, which is another reason it makes us feel good.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "One study compared people's enjoyment of dancing at home, in front of a video, with dancing in a group in a studio.",
        "The people dancing in a group reported feeling happier, whereas those dancing alone did not.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "In another experiment, university researchers at York and Sheffield took a group of students and sent each of them into a lab where music was played for five minutes.",
        "Each had to choose from three options: to sit and listen quietly to the music, to cycle on an exercise bike while they listened, or to get up and dance.",
        "All were given cognitive tasks to perform before and after.",
        {
          text: "The result showed that those who chose to dance showed much more creativity when doing problem-solving tasks.",
          number: 31,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Doctor Lovatt, at the University of Hertfordshire, believes dance could be a very useful way to help people suffering from mental health problems.",
        {
          text: "He thinks dance should be prescribed as therapy to help people overcome issues such as depression.",
          number: 32,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "It's well established that dance is a good way of encouraging adolescent girls to take exercise, but what about older people?",
        "Studies have shown that there are enormous benefits for people in their 60s and beyond.",
        {
          text: "One of the great things about dance is that there are no barriers to participation, and anyone can have a go, even those whose standard of fitness is quite low.",
          number: 33,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Dance can be especially beneficial for older adults who can't run or do more intense workouts, or for those who don't want to.",
        "One 2015 study found that even a gentle dance workout helps to promote a healthy heart.",
        {
          text: "There's also plenty of evidence which suggests that dancing lowers the risk of falls by helping people to improve their balance.",
          number: 34,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "There are some less obvious benefits of dance for older people too.",
        "One thing I hadn't realized before researching this topic was that dance isn't just a physical challenge.",
        "It also requires a lot of concentration, because you need to remember different steps and routines.",
        {
          text: "For older people, this kind of activity is especially important because it helps the brain to process information more quickly and retain it.",
          number: 35,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Current research also shows that dance promotes a general sense of well-being in older participants, which can last up to a week after a class.",
        "Participants report feeling less tired, and having greater motivation to be more active, and do daily activities such as gardening,",
        {
          text: "or walking to the shops or a park.",
          number: 36,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Ballroom or country dancing, both popular with older people, have to be done in groups.",
        "They require collaboration, and often involve touching a dance partner.",
        {
          text: "All of this encourages interaction, helps to develop new relationships, and can reduce older people's sense of isolation.",
          number: 37,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "I also looked at the benefits of Zumba.",
        "Fifteen million people in 180 countries now regularly take a Zumba class.",
        "An aerobic workout based on Latin American dance moves.",
        "John Porcari, a professor of exercise and sport science at the University of Wisconsin, analyzed a group of women who were Zumba regulars.",
        {
          text: "He found that a class lasting 40 minutes burns about 370 calories.",
          number: 38,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "This is similar to moderately intense exercises like step aerobics or kickboxing.",
        "A study in the American Journal of Health Behavior showed that when women with obesity did Zumba three times a week for 16 weeks,",
        {
          text: "they lost an average of 1.2 kilos and reduced their body fat percentage by 1 percent.",
          number: 39,
        },
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "More importantly, the women enjoyed the class so much that they made it a habit, and continued to attend classes at least once a week.",
        "This is very unusual for an aerobic exercise program.",
        {
          text: "Dance may never compete with high-intensity workouts for fitness gains, but its popularity will continue to grow because it is such a fun way to keep fit.",
          number: 40,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Part 4.",
        "You now have one minute to check your answers to Part 4.",
      ],
    },
  ];

  // different option
  const questions = [
    "Which TWO facilities at the leisure club have recently been improved?",
  ];

  const options = [
    [
      "A. the gym",
      "B. the tracks",
      "C. the indoor pool",
      "D. the outdoor pool",
      "E. the sports training for children",
    ],
  ];
  const notesQuestions = [
    "New members should describe any ____.",
    "The ____ will be explained to you before you use the equipment.",
    "You will be given a six-week ____.",
    "There is a compulsory £90 ____ fee for members.",
    "Gold members are given ____ to all the LP clubs.",
    "Premier members are given priority during ____ hours.",
    "Premier members can bring some ____ every month.",
    "Members should always take their ____ with them.",
  ];
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 11;
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
      if (speaker === "JOY PARKINS") {
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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);
  // Marks show
  const correctAnswers = {
    31: "creativity",
    32: "therapy",
    33: "fitness",
    34: "balance",
    35: "brain",
    36: "motivation",
    37: "isolation",
    38: "calories",
    39: "obesity",
    40: "habit",
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
    localStorage.setItem("/listening1Part22021", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22021");
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
            <h1 className="text-xl font-bold">{renderText("    PART 3")}</h1>
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
                {renderText("Health Benefits of Dance")}
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
        {/* ---------- Questions 11–12 ---------- */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 31–40")}
          </h2>

          <p className="text-lg mb-6 font-semibold">
            {renderText("Complete the notes below.")}
            <br />
            {renderText("Write ONE WORD ONLY for each answer.")}
          </p>

          {/* ---------- NOTES SECTION ---------- */}
          <h2 className="text-xl font-bold mb-4">
            {renderText("Health benefits of dance")}
          </h2>

          <div className="space-y-4 border p-4 rounded-lg">
            <p className="font-semibold">{renderText("Recent findings:")}</p>

            <p>
              •{" "}
              {renderText(
                "All forms of dance produce various hormones associated with feelings of happiness."
              )}
            </p>
            <p>
              •{" "}
              {renderText(
                "Dancing with others has a more positive impact than dancing alone."
              )}
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              •{" "}
              {renderText(
                "An experiment on university students suggested that dance increases"
              )}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                31
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
              />
              .
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              •{" "}
              {renderText(
                "For those with mental illness, dance could be used as a form of"
              )}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                32
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
              />
              .
            </p>

            <p className="font-semibold mt-6">
              {renderText("Benefits of dance for older people:")}
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("accessible for people with low levels of")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                33
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
              />
              .
            </p>

            <p>• {renderText("reduces the risk of heart disease")}</p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("better")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                34
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
              />
            </p>

            <p>• {renderText("reduces the risk of accidents")}</p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("improves")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                35
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
              />
              {renderText("function by making it work faster")}
            </p>

            <p>• {renderText("improves participants' general well-being")}</p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("gives people more")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                36
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
              />
              {renderText("to take exercise")}
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("can lessen the feeling of")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                37
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
              />
              {renderText(", very common in older people")}
            </p>

            <p className="font-semibold mt-6">
              {renderText("Benefits of Zumba:")}
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              •{" "}
              {renderText(
                "A study at The University of Wisconsin showed that doing Zumba for 40 minutes uses up as many"
              )}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                38
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
              />
              {renderText("as other quite intense forms of exercise")}
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("women suffering from")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                39
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
              />
              {renderText("benefited from doing Zumba")}
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              • {renderText("Zumba became a")}
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm font-semibold">
                40
              </span>
              <input
                className="border px-3 py-1 rounded-md w-28 text-center outline-none"
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
              />
              {renderText("for the participants")}
            </p>
          </div>
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
      <Listening2Pagination2021></Listening2Pagination2021>
    </div>
  );
};

export default Listening2Part42021;
