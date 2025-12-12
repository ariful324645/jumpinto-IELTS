import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening4Pagination2017 from "../Pagination2017/Listening4Pagination2017";

const Listening4Part32017 = () => {
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
        "Section 3. You will hear two students, Katie and Joe discussing a presentation in their Film Studies course.",
        "First, you have some time to look at questions 21 to 24.",
        "Listen carefully, and answer questions 21 to 24.",
      ],
    },

    {
      speaker: "KATIE",
      text: [
        "Joe, you know I'm giving a presentation in our film studies class next week.",
      ],
    },

    {
      speaker: "JOE",
      text: ["Yes."],
    },

    {
      speaker: "KATIE",
      text: [
        "Well, could we discuss it? I could do with getting someone else's opinion.",
      ],
    },

    {
      speaker: "JOE",
      text: ["Of course, Katie. What are you going to talk about?"],
    },

    {
      speaker: "KATIE",
      text: [
        "It's about film adaptations of Shakespeare's plays. I've got very interested in all the different approaches that film directors take.",

        {
          text: "So I thought I'd start with Giannetti, who's a professor of film and literature, and in one of his books, he came up with a straightforward classification of film adaptations based on how faithful they are to the original plays and novels.",
          number: 21,
        },
      ],
    },

    {
      speaker: "JOE",
      text: ["Right."],
    },

    {
      speaker: "KATIE",
      text: [
        "I've already made some notes on that, so I just need to sort those out before the presentation.",
        {
          text: " I thought that next, I'd ask the class to come up with the worst examples of Shakespeare adaptations that they've seen.",
          number: 22,
        },
        "And to say why, that should be more fun than having their favorite versions.",
      ],
    },

    {
      speaker: "JOE",
      text: ["Yes, I can certainly think of a couple."],
    },

    {
      speaker: "KATIE",
      text: [
        "Hmm. Right, next, I want to talk about Rachel Malchow. I came across something on the internet about her work on film adaptations. And I was thinking of showing some film clips to illustrate her ideas.",
        "Will you have enough time though, both to prepare and during the presentation? After all, I doubt if you'll be able to find all the clips you want.",

        "Hmm. Perhaps you're right.  ",
        { text: "OK, well, I'd better do some slides instead.", number: 23 },
        "Saying how various films relate to what she says, that should encourage discussion.",
      ],
    },

    {
      speaker: "JOE",
      text: ["Hmm."],
    },

    {
      speaker: "KATIE",
      text: [
        "Next, I want to say something about how plays may be chosen for adaptation.",
        {
          text: " Because they're concerned with issues of the time when the film is made.",
          number: 24,
        },
      ],
    },

    {
      speaker: "JOE",
      text: ["You mean things like patriotism, or the role of governments?"],
    },

    {
      speaker: "KATIE",
      text: [
        "Exactly. It's quite tricky, but I've got a few ideas I'd like to discuss.",
      ],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Listen and answer questions 25 to 30.",
      ],
    },

    {
      speaker: "KATIE",
      text: [
        "And finally, I want to talk about a few adaptations that I think illustrate a range of approaches, and make some comments on them. Do you know the Japanese film Ran?",
      ],
    },

    {
      speaker: "JOE",
      text: [
        "I haven't seen it. It was based on Shakespeare's King Lear, wasn't it?",
      ],
    },

    {
      speaker: "KATIE",
      text: [
        "That's right. ",
        {
          text: "It was a very loose adaptation, using the same situation and story, but moving it to 16th century Japan.Instead of 16th century Britain",
          number: 25,
        },
        "So, for example, the king's daughters become sons, because in Japanese culture at that time women couldn't succeed to the throne.",
      ],
    },

    {
      speaker: "JOE",
      text: [
        "OK, I hope you're going to talk about the 1993 film of Much Ado About Nothing. I think that's one of the best Shakespeare films. It really brings the play to life, doesn't it?",
      ],
    },

    {
      speaker: "KATIE",
      text: [
        "Yes, I agree. ",
        {
          text: "And I think filming it in Italy, where the play is set, makes you see what life was like at the time of the play.",
          number: 26,
        },
      ],
    },

    {
      speaker: "JOE",
      text: ["Absolutely, right, what's next?"],
    },

    {
      speaker: "KATIE",
      text: [
        {
          text: "Uh. Next, I thought Romeo and Juliet, the 1996 film, which moves the action into the present day.",
          number: 27,
        },
      ],
    },

    {
      speaker: "JOE",
      text: [
        "Yes. It worked really well, I thought, changing the two feuding families in the original to two competing business empires, even though they're speaking in the English of the original play.",
        "You'd expect it would sound really bizarre, but I found I soon got used to it.",
      ],
    },

    {
      speaker: "KATIE",
      text: [
        "Me too. Then I thought I'd include a real Hollywood film. One that's intended to appeal to a mass commercial audience.",
        "Yes, but I've picked the 1996 film of Hamlet.",
        {
          text: " It included every line of the text, but it's more like a typical action hero movie.",
          number: 28,
        },
        "There are loads of special effects, but no unifying interpretation of the play.",
      ],
    },

    {
      speaker: "JOE",
      text: ["All show and no substance."],
    },

    {
      speaker: "KATIE",
      text: [
        "Exactly. Then there's Prospero's Books, based on The Tempest. That was really innovative from a stylistic point of view.",

        {
          text: "Didn't it include dance and singing and animation as well as live actors?",
          number: 29,
        },
        "Yes, it did. I also want to mention Looking for Richard. Did you ever see it?",
        "No, but I've read about it. ",
      ],
    },

    {
      speaker: "KATIE",
      text: [
        {
          text: "It was a blend of a documentary with a few scenes from Richard III, wasn't it?",
          number: 30,
        },
        "That's right. It's more a way of looking into how people nowadays connect with the playwright. The play is really just the starting point, and that'll be where I finish.",
      ],
    },

    {
      speaker: "JOE",
      text: ["Well, it sounds as though it'll be very interesting."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
        "You now have half a minute to check your answers.",
      ],
    },
  ];

  // Updated questions and options

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
      if (speaker === "JOE") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "KATIE") {
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
  // Questions 21–24
  21: "classification",
  22: "worst",
  23: "slides",
  24: "issues",

  // Questions 25–30
  25: "F",
  26: "A",
  27: "E",
  28: "C",
  29: "G",
  30: "B",
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
    localStorage.setItem("/listening2Part22019", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part22019");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part22019");
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
                {renderText("Film adaptations on Shakespeare's plays")}
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
                        "Are you sure you want to clear all answers?"
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
          {/* 1st section */}

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <div className="mt-5">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 21-24")}
              </h2>
              <h3 className="text-lg font-semibold mb-5">
                {renderText("Complete the notes below.")} <br /> <br />
                {renderText("Write")}{" "}
                <span className="font-bold">{renderText("ONLY ONE WORD")}</span>{" "}
                {renderText("for each answer.")}
              </h3>
              <h1 className="text-2xl font-bold text-center mb-5">
                {renderText(
                  "   Presentation on film adaptations of Shakespeare's plays"
                )}
              </h1>
              <tbody>
                {/* Task 21 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {renderText(
                        " Introduce Giannetti's book containing a of adaptations"
                      )}
                      <button
                        onClick={() => toggleButton(21)}
                        className={`h-8 w-8 rounded-full font-semibold border ${
                          activeButtons[21]
                            ? "bg-yellow-400 border-yellow-500 text-white"
                            : "bg-gray-200 border-gray-400 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        21
                      </button>
                      <input
                        value={userAnswers[21] || ""}
                        onChange={(e) => handleInputChange(21, e.target.value)}
                        className="w-[120px] border border-gray-300 rounded-md px-2 py-1 text-lg"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Organise notes")}
                  </td>
                </tr>

                {/* Task 22 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {renderText(" Ask class to suggest the adaptations")}
                      <button
                        onClick={() => toggleButton(22)}
                        className={`h-8 w-8 rounded-full  font-semibold border ${
                          activeButtons[22]
                            ? "bg-yellow-400 border-yellow-500 text-white"
                            : "bg-gray-200 border-gray-400 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        22
                      </button>
                      <input
                        value={userAnswers[22] || ""}
                        onChange={(e) => handleInputChange(22, e.target.value)}
                        className="w-[120px] border border-gray-300 rounded-md px-2 py-1 text-lg"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("No further work needed")}
                  </td>
                </tr>

                {/* Task 23 */}
                <tr>
                  {" "}
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("Present Rachel Malchow's ideas ")}
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {renderText("  Prepare some")}
                      <button
                        onClick={() => toggleButton(23)}
                        className={`h-8 w-8 rounded-full font-semibold border ${
                          activeButtons[23]
                            ? "bg-yellow-400 border-yellow-500 text-white"
                            : "bg-gray-200 border-gray-400 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        23
                      </button>
                      <input
                        value={userAnswers[23] || ""}
                        onChange={(e) => handleInputChange(23, e.target.value)}
                        className="w-[120px] border border-gray-300 rounded-md px-2 py-1 text-lg"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </td>
                </tr>

                {/* Task 24 */}
                <tr>
                  <td className="border border-gray-400 text-lg p-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {renderText(
                        "Discuss relationship between adaptations and at the time of making the film"
                      )}
                      <button
                        onClick={() => toggleButton(24)}
                        className={`h-8 w-8 rounded-full font-semibold border ${
                          activeButtons[24]
                            ? "bg-yellow-400 border-yellow-500 text-white"
                            : "bg-gray-200 border-gray-400 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        24
                      </button>
                      <input
                        value={userAnswers[24] || ""}
                        onChange={(e) => handleInputChange(24, e.target.value)}
                        className="w-[120px] border border-gray-300 rounded-md px-2 py-1 text-lg"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    {renderText("No further work needed")}
                  </td>
                </tr>
              </tbody>
            </div>
          </div>

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 25-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What did findings of previous research claim about the personality traits a child is likely to have because of their position in the family?"
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-G")}</span>{" "}
                {renderText("next to Questions 25-30")}
              </h3>
              <div className="flex items-center justify-center border border-black py-4 px-4 w-96 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText("A. clearly shows the historical period")}
                    </li>
                    <li>{renderText("B. contains only parts of the play")}</li>
                    <li>
                      {renderText("C. is too similar to another kind of film")}
                    </li>
                    <li>
                      {renderText(
                        "D. turned out to be unpopular with audiences"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "E. presents the play in a different period from the original"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "F. sets the original in a different country"
                      )}
                    </li>
                    <li>
                      {renderText("G. incorporates a variety of art forms")}
                    </li>
                  </ul>
                </div>{" "}
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 25 ---------- */}
            <h1 className="text-lg font-bold">{renderText("Films")}</h1>

            {/* ---------- Question 26 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("25.")}</span>
              {renderText("Run")}
              <div className="relative w-40">
                <select
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="25">{renderText("25")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>{" "}
            </p>
            {/* ---------- Question 26 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              {renderText("Much Ado About Nothing")}
              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="26">{renderText("26")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>{" "}
            </p>

            {/* ---------- Question 27 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              {renderText("Romeo & Juliet")}
              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="27">{renderText("27")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 28 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              {renderText("Hamlet")}
              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="28">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 29 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("Prospero's Books")}
              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="29">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 30 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("Looking for Richard")}
              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="30">{renderText("30")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>{" "}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
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
      <Listening4Pagination2017></Listening4Pagination2017>
    </div>
  );
};

export default Listening4Part32017;
