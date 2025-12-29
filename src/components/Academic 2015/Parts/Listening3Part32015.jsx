import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening3Pagination2015 from "../Pagination 2015/Listening3Pagination2015";

const Listening3Part32015 = () => {
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
        "Section 3, you will hear a student called Rob, who is in the first year of a theatre studies course, talking to another student called Mia, who's in the fourth year of the same course.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "MIA",
      text: ["Hi, Rob. How's the course going?"],
    },
    {
      speaker: "ROB",
      text: [
        "Oh, hi, Mia. Yeah, great. I can't believe the first term's nearly over.",
      ],
    },
    {
      speaker: "MIA",
      text: [
        "I saw your group's performance last night at the student theater. It was good.",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "Really. Yeah, but now we have to write a report on the whole thing, an in-depth analysis. I don't know where to start. Like I have to write about the role I played, the doctor, how I developed the character.",
      ],
    },
    {
      speaker: "MIA",
      text: ["Well, what was your starting point?"],
    },
    {
      speaker: "ROB",
      text: [
        "Uh. My grandfather was a doctor before he retired, and I just based it on him.",
      ],
    },
    {
      speaker: "MIA",
      text: ["OK, but how? Uh. Did you talk to him about it?"],
    },
    {
      speaker: "ROB",
      text: [
        "He must have all sorts of stories, but he never says much about his work, even now. He has a sort of authority though.",
      ],
    },
    {
      speaker: "MIA",
      text: ["Hmm, so how did you manage to capture that?"],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "I'd visualize what he must have been like in the past when he was sitting in his consulting room, listening to his patients.",
          number: 21,
        },
      ],
    },
    {
      speaker: "MIA",
      text: [
        "OK, so that's what you explain in your report. Right, then there's the issue of atmosphere. So in the first scene, we needed to know how boring life was in the doctor's village in the 1950s. So when the curtain went up on the first scene in the waiting room, there was that long silence before anyone spoke. And then people kept saying the same thing over and over like 'Cold, isn't it?'",
        {
          text: "",
          number: 22,
        },
      ],
    },
    {
      speaker: "ROB",
      text: ["Yes, and everyone wore grey and brown, and just sat in a row."],
    },
    {
      speaker: "MIA",
      text: ["Yes, all those details of the production. Hmm."],
    },
    {
      speaker: "ROB",
      text: [
        "And I have to analyze how I functioned in the group, what I found out about myself. I know I was so frustrated at times when we couldn't agree.",
      ],
    },
    {
      speaker: "MIA",
      text: ["Hmm. Yes, so did one person emerge as the leader?"],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "Sophia did. That was OK. She helped us work out exactly what to do for the production, and that made me feel better, I suppose.",
          number: 23,
        },
      ],
    },
    {
      speaker: "MIA",
      text: ["When you understood what needed doing."],
    },
    {
      speaker: "ROB",
      text: [
        "Yes. And Sophia did some research too. That was useful in developing our approach.",
      ],
    },
    {
      speaker: "MIA",
      text: ["Like what?"],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "Well, she found these articles from the 1950s about how relationships between children and their parents, or between the public and people like bank managers or the police were shifting.",
          number: 24,
        },
      ],
    },
    {
      speaker: "MIA",
      text: [
        "Interesting, and did you have any practical problems to overcome?",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "Well, in the final rehearsal, everything was going fine until the last scene - that's where the doctor's first patient appears on stage on his own.",
      ],
    },
    {
      speaker: "MIA",
      text: ["The one in the wheelchair?"],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "Yes. And he had this really long speech with the stage all dark except for one spotlight. And then that stuck somehow, so it was shining on the wrong side of the stage.",
          number: 25,
        },
        "But anyway, we got that fixed, thank goodness.",
      ],
    },
    {
      speaker: "MIA",
      text: ["Yes, it was fine on the night."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "But while you're here, Mia, I wanted to ask you about the year abroad option. Would you recommend doing that?",
      ],
    },
    {
      speaker: "MIA",
      text: [
        "Yes, definitely. It's a fantastic chance to study in another country for a year.",
      ],
    },
    {
      speaker: "ROB",
      text: [
        "I think I'd like to do it, but it looks very competitive. There's only a limited number of places.",
      ],
    },
    {
      speaker: "MIA",
      text: [
        "Yes, so next year when you're in the second year of the course, you need to work really hard in all your theater studies modules. Only students with good marks get places.",
        {
          text: "You have to prove that you know your subject really well.",
          number: 26,
        },
      ],
    },
    {
      speaker: "ROB",
      text: ["Right. So how did you choose where to go?"],
    },
    {
      speaker: "MIA",
      text: [
        {
          text: "Well, I decided I wanted a program that would fit in with what I wanted to do after I graduate. So, I looked for a university with emphasis on acting, rather than directing, for example.",
          number: 27,
        },
        "It depends on you. Then about 6 months before you go, you have to email the scheme coordinator with your top 3 choices. I had a friend who missed the deadline and didn't get her first choice, so you do need to get a move on at that stage.",
      ],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "You'll find that certain places are very popular with everyone.",
          number: 28,
        },
      ],
    },
    {
      speaker: "MIA",
      text: ["And don't you have to write a personal statement at that stage?"],
    },
    {
      speaker: "ROB",
      text: ["Yes."],
    },
    {
      speaker: "ROB",
      text: [
        {
          text: "Right. I'll get some of the final year students to give me some tips, maybe see if I can read what they wrote.",
          number: 29,
        },
      ],
    },
    {
      speaker: "MIA",
      text: [
        {
          text: "I think that's a very good idea. I don't mind showing you what I did, and while you're abroad, don't make the mistake I made. I got so involved, I forgot all about making arrangements for when I came back here for the final year. Make sure you stay in touch so they know your choices for the optional modules. You don't want to miss out doing your preferred specialisms.",
          number: 30,
        },
      ],
    },
    {
      speaker: "ROB",
      text: ["Right."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 3.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "According to the manager, what do most people like about the job of kitchen assistant?",
    "The manager is concerned about some of the new staff's",
    "The manager says that the day is likely to be busy for kitchen staff because",
    "Only kitchen staff who are 18 or older are allowed to use",
    "What is one reason the job of kitchen assistant can be stressful?",
    "What is another reason the job of kitchen assistant can be stressful?",
  ];

  const options = [
    [
      "A. the variety of work",
      "B. the friendly atmosphere",
      "C. the opportunities for promotion",
    ],

    ["A. jewellery.", "B. hair styles.", "C. shoes."],

    [
      "A. it is a public holiday.",
      "B. the head chef is absent.",
      "C. the restaurant is almost fully booked.",
    ],

    [
      "A. the waste disposal unit.",
      "B. the electric mixer.",
      "C. the meat slicer.",
    ],
    [
      "A. They have to follow orders immediately.",
      "B. The kitchen gets very hot.",
      "C. They may not be able to take a break.",
    ],
    [
      "A. They have to do overtime.",
      "B. The work is physically demanding.",
      "C. They have to clean customer areas.",
    ],
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

  //  Marks show

  const correctAnswers = {
    // Questions 21–25 (radio buttons, A–C)
    21: "B", // the times when he watched his grandfather working
    22: "A", // repetition of words and phrases.
    23: "B", // He copes well with stress.
    24: "B", // changing social attitudes.
    25: "A", // one person forgetting their words

    // Questions 26–30 (dropdowns, A–G)
    26: "C", // in the second year of the course -> plan for the final year
    27: "D", // when first choosing where to go -> make sure the institution's focus is relevant
    28: "B", // when sending in your choices -> get a letter of recommendation
    29: "E", // when writing your personal statement -> show ability in Theatre Studies
    30: "F", // when doing the year abroad -> make travel arrangements and bookings
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
    localStorage.setItem("/listening3Part32015", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part32015");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part32015");
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
                {renderText("Theatre Studies Course")}
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
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          <p className="mb-4">
            {renderText("Answer the questions below.")} <br />
            {renderText("Choose the correct letters as instructed.")}
          </p>

          <div className="p-5 rounded-lg bg-white space-y-6">
            <h2 className="text-lg font-bold text-center">
              {renderText("Theatre Studies Course")}
            </h2>

            {/* ---------- Questions 21–25 ---------- */}
            <div>
              <h3 className="font-bold mb-2">
                {renderText("Questions 21–25")}
              </h3>
              <p className="mb-3">
                {renderText("Choose the correct letter, A, B or C.")}
              </p>

              {[
                {
                  q: 21,
                  text: "What helped Rob to prepare to play the character of a doctor?",
                  options: [
                    "the stories his grandfather told him",
                    "the times when he watched his grandfather working",
                    "the way he imagined his grandfather at work",
                  ],
                },
                {
                  q: 22,
                  text: "In the play's first scene, the boredom of village life was suggested by",
                  options: [
                    "repetition of words and phrases.",
                    "scenery painted in dull colours.",
                    "long pauses within conversations.",
                  ],
                },
                {
                  q: 23,
                  text: "What has Rob learned about himself through working in a group?",
                  options: [
                    "He likes to have clear guidelines.",
                    "He copes well with stress.",
                    "He thinks he is a good leader.",
                  ],
                },
                {
                  q: 24,
                  text: "To support the production, research material was used which described",
                  options: [
                    "political developments.",
                    "changing social attitudes.",
                    "economic transformations.",
                  ],
                },
                {
                  q: 25,
                  text: "What problem did the students overcome in the final rehearsal?",
                  options: [
                    "one person forgetting their words",
                    "an equipment failure",
                    "the injury of one character",
                  ],
                },
              ].map(({ q, text, options }) => (
                <div key={q} className="mb-4">
                  <p className="font-semibold">{renderText(`${q}. ${text}`)}</p>
                  {options.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <label key={letter} className="flex gap-2">
                        <input
                          type="radio"
                          name={`q${q}`}
                          onChange={() => handleInputChange(q, letter)}
                        />
                        <span>
                          <strong>{letter}.</strong> {renderText(opt)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* ---------- Questions 26–30 ---------- */}
            <div>
              <h3 className="font-bold mb-2">
                {renderText("Questions 26–30")}
              </h3>
              <p className="mb-3">
                {renderText(
                  "What action is needed for the following stages in doing the 'year abroad' option? Choose the correct letter, A–G."
                )}
              </p>

              <div className="border max-w-[200px] mx-auto text-center mb-4 p-4">
                <p className="mb-2 font-semibold">{renderText("Actions")}</p>
                <ul className="text-left">
                  <li>A. be on time</li>
                  <li>B. get a letter of recommendation</li>
                  <li>C. plan for the final year</li>
                  <li>D. make sure the institution's focus is relevant</li>
                  <li>E. show ability in Theatre Studies</li>
                  <li>F. make travel arrangements and bookings</li>
                  <li>G. ask for help</li>
                </ul>
              </div>

              {[
                { q: 26, text: "in the second year of the course" },
                { q: 27, text: "when first choosing where to go" },
                { q: 28, text: "when sending in your choices" },
                { q: 29, text: "when writing your personal statement" },
                { q: 30, text: "when doing the year abroad" },
              ].map(({ q, text }) => (
                <div key={q} className="flex items-center gap-2 mb-2">
                  <span className="font-bold w-6">{q}.</span>
                  <span>{renderText(text)}</span>
                  <select
                    className="border rounded px-2 py-1 ml-2"
                    onChange={(e) => handleInputChange(q, e.target.value)}
                  >
                    <option value="">{q}</option>{" "}
                    {/* <-- show question number as default */}
                    {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
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
                      All Answers (21-30)
                    </h3>

                    <ul className="space-y-3">
                      {Array.from({ length: 10 }, (_, i) => i + 21).map(
                        (num) => {
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
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
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
                        }
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening3Pagination2015></Listening3Pagination2015>
    </div>
  );
};

export default Listening3Part32015;
