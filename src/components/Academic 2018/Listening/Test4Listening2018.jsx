import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";

const Test4Listening2018 = () => {
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
      "Section 1. You will hear a phone conversation between Alex, an employee at a company called JPNW, and Martha, who wants to work as a trainee at the company.",
      "First, you have some time to look at questions 1 to 7.",
      "You will see that there is an example that has been done for you.",
      "On this occasion only, the conversation relating to this will be played first.",
    ],
  },
  {
    speaker: "MARTHA",
    text: [
      "Hi, Alex. It's Martha Clines here. James White gave me your number. I hope you don't mind me calling you.",
    ],
  },
  {
    speaker: "ALEX",
    text: ["Of course not. How are you, Martha?"],
  },
  {
    speaker: "MARTHA",
    text: ["Good, thanks. I'm ringing because I need a bit of advice."],
  },
  {
    speaker: "ALEX",
    text: ["Oh, yeah. What about?"],
  },
  {
    speaker: "MARTHA",
    text: [
      "The training you did at JPNW a few years ago. I'm applying for the same thing.",
    ],
  },
  {
    speaker: "ALEX",
    text: [
      "Oh, right. Yes, I did mine in 2014. Best thing I ever did, I'm still working there.",
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "Alex did his training in 2014. So 2014 has been written in the space.",
      "Now we shall begin.",
      "You should answer the questions as you listen, because you will not hear the recording a second time.",
      "Listen carefully and answer questions 1 to 7.",
    ],
  },
  {
    speaker: "MARTHA",
    text: [
      "Hi, Alex. It's Martha Clines here. James White gave me your number. I hope you don't mind me calling you.",
    ],
  },
  {
    speaker: "ALEX",
    text: ["Of course not. How are you, Martha?"],
  },
  {
    speaker: "MARTHA",
    text: ["Good, thanks. I'm ringing because I need a bit of advice."],
  },
  {
    speaker: "ALEX",
    text: ["Oh, yeah. What about?"],
  },
  {
    speaker: "MARTHA",
    text: [
      "The training you did at JPNW a few years ago. I'm applying for the same thing.",
    ],
  },
  {
    speaker: "ALEX",
    text: [
      "Oh, right. Yes, I did mine in 2014. Best thing I ever did. I'm still working there.Well, now I work in the customer services department.",
      {
        text: " But I did my initial training in Finance.",
        number: 1,
      },
      "I stayed there for the first two years, and then moved to where I am now.",
    ],
  },
  {
    speaker: "MARTHA",
    text: ["That's the same department I'm applying for. Did you enjoy it?"],
  },
  {
    speaker: "ALEX",
    text: [
      "Uh. I was pretty nervous to begin with. ",
      {
        text: "I didn't do well in my exams at school, and I was really worried because I failed maths.",
        number: 2,
      },
      "But it didn't actually matter, because I did lots of courses on the job.",
    ],
  },
  {
    speaker: "MARTHA",
    text: [
      "Did you get a diploma at the end of your trainee period? I'm hoping to do the one in business skills.",
    ],
  },
  {
    speaker: "ALEX",
    text: [
      "Yes, that sounds good.",
      {
        text: " I took the one on IT skills, but I wish I'd done that one instead.",
        number: 3,
      },
    ],
  },
  {
    speaker: "MARTHA",
    text: [
      "OK, that's good to know. Um. What about the other trainees? How did you get on with them?",
    ],
  },
  {
    speaker: "ALEX",
    text: [
      "There were about 20 of us who started at the same time. And we were all around the same age. ",
      {
        text: "I was 18, and there was only one person younger than me, who was 17.",
        number: 4,
      },
      "The rest were between 18 and 20. I made some good friends.",
    ],
  },
  {
    speaker: "MARTHA",
    text: [
      "I've heard lots of good things about the training at JPNW. It seems like there are a lot of opportunities there.",
    ],
  },
  {
    speaker: "ALEX",
    text: [
      "Yeah, definitely. Because of its size, you can work in loads of different areas within the organization.That's right, which isn't great.",
      {
        text: " But you get the same number of days' holiday as everyone else, and the pay goes up massively if they offer you a job at the end of the training period.",
        number: 5,
      },
    ],
  },
  {
    speaker: "MARTHA",
    text: [
      "Yeah, but I'm not doing it for the money. It's the experience I think will be really useful. Everyone says by the end of the year you gain so much confidence.",
    ],
  },
  {
    speaker: "ALEX",
    text: [
      "You're right. That's the most useful part about it. There's a lot of variety too. You're given lots of different things to do. I enjoyed it all. I didn't even mind the studying.",
      {
        text: "Yes, 1 day each month. ",
        number: 6,
      },
      "So you get lots of support from both your tutor and your manager.",
    ],
  },
  {
    speaker: "MARTHA",
    text: ["Hmm, that's good. And the company is easy to get to, isn't it?"],
  },
  {
    speaker: "ALEX",
    text: [
      {
        text: "Yes, it's very close to the train station, so the location's a real advantage.",
        number: 7,
      },
    ],
  },
  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the phone conversation, you have some time to look at questions 8 to 10.",
      "Now listen and answer questions 8 to 10.",
    ],
  },
  {
    speaker: "ALEX",
    text: ["Have you got a date for your interview yet?"],
  },
  {
    speaker: "MARTHA",
    text: ["Yes, it's on the 23rd of this month."],
  },
  {
    speaker: "ALEX",
    text: [
      "So long as you're well prepared, there's nothing to worry about. Everyone's very friendly.",
      {
        text: "Nothing too casual, like jeans for example. ",
        number: 8,
      },
      "If you've got a nice jacket, wear that with a skirt or trousers.",
    ],
  },
  {
    speaker: "MARTHA",
    text: ["OK, thanks. Any other tips?"],
  },
  {
    speaker: "ALEX",
    text: [
      "Um. Well, I know it's really obvious, but arrive in plenty of time.",
      {
        text: " They hate people who are late.",
        number: 9,
      },
      "So make sure you know exactly where you have to get to, and one other useful piece of advice my manager told me before I had the interview for this job is to smile.",

      { text: "", number: 10 },
      "Even if you feel terrified, it makes people respond better to you.",
    ],
  },
  {
    speaker: "MARTHA",
    text: ["Ha, I'll have to practice doing that in the mirror. Ha ha."],
  },
  {
    speaker: "ALEX",
    text: [
      "Yeah, well, good luck. Let me know if you need any more information.",
    ],
  },
  {
    speaker: "MARTHA",
    text: ["Thanks very much."],
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
      if (speaker === "ALEX") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "MARTHA") {
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
   1: "Finance", // At first, Alex did his training in the department
   2: "maths", // Alex didn't have a qualification from school in
   3: "IT", // Alex thinks he should have done the diploma in skills
   4: "17", // Age of the youngest trainee
   5: "holiday", // Trainees receive the same amount of ... as permanent staff
   6: "college", // Trainees go to ... one day per month
   7: "location", // The company is in a convenient ...
   8: "jeans", // Don't wear ...
   9: "late", // Don't be ...
   10: "smile", // Make sure you ...
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
    localStorage.setItem("/2018/Test 4/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2018/Test 4/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 4/listening");
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
                {renderText("Alex's Training")}
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

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–10")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          {/* box */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Alex's Training")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("About the applicant")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("(Example) Alex completed his training in")} 2014
              </li>

              <li className="text-lg">
                <span>
                  {renderText("At first, Alex did his training in the")}
                </span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "Alex didn't have a qualification from school in"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Alex thinks he should have done the diploma in")}
                </span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span> skills.</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText("Age of other trainees: the youngest was")}
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Benefits of doing training at JPNW")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText(
                  "Lots of opportunities because of the size of the organisation."
                )}
              </li>

              <li className="text-lg">
                <span>{renderText("Trainees receive the same amount of")}</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span> as permanent staff.</span>
              </li>

              <li className="text-lg">
                {renderText(
                  "The training experience increases people's confidence a lot."
                )}
              </li>

              <li className="text-lg">
                <span>{renderText("Trainees go to")}</span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  value={userAnswers[6] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span> one day per month.</span>
              </li>

              <li className="text-lg">
                <span>{renderText("The company is in a convenient")}</span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  value={userAnswers[7] || ""}
                  onChange={(e) => handleInputChange(7, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Advice for interview")}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("Don't wear")}</span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  value={userAnswers[8] || ""}
                  onChange={(e) => handleInputChange(8, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Don't be")}</span>
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  value={userAnswers[9] || ""}
                  onChange={(e) => handleInputChange(9, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>{renderText("Make sure you")}</span>
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  value={userAnswers[10] || ""}
                  onChange={(e) => handleInputChange(10, e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>
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
                    All Answers (1–10)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
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
      {/* <Listening1Pagination2020></Listening1Pagination2020> */}
    </div>
  );
};

export default Test4Listening2018;
