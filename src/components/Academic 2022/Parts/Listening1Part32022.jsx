import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2022 from "../Pagination2022/Listening1Pagination2022";

const Listening1Part32022 = () => {
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
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 3, you will hear two veterinary science students called Diana and Tim discussing their work placements and their course modules.",
        "First, you have some time to look at questions 21 to 26.",
        "Now listen carefully and answer questions 21 to 26.",
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "So, Tim, we have to do a short summary of our work experience on a farm.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Right. My farm was great, but arranging the work experience was hard.",
        {
          text: "One problem was it was miles away, and I don't drive. And also, I'd really wanted a placement for a month, but I could only get one for two weeks.",
          number: 21,
        },
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "Hmm. I was lucky. The farmer let me stay on the farm, so I didn't have to travel. But finding the right sort of farm to apply to wasn't easy.",
        {
          text: "No, they don't seem to have websites, do they? I found mine through a friend of my mother's, but it wasn't easy.",
          number: 21,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "My farm was mostly livestock, especially sheep. I really enjoyed helping out with them. I was up most of one night helping a sheep deliver a lamb.",
        { text: "On your own?", number: 22 },
        "No, the farmer was there, and he told me what to do. It wasn't a straightforward birth.",
        {
          text: "But I managed. It was a great feeling to see the lamb stagger to its feet and start feeding almost straight away, and to know that it was OK.",
          number: 22,
        },
        "Then another time a lamb had broken its leg, and they got the vet in to set it, and he talked me through what he was doing. That was really useful.",
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "Yes, my farm had sheep too. The farm was in a valley, and they had a lowland breed called Suffolks, although the farmer said they'd had other breeds in the past.",
        { text: "So were they bred for their meat?", number: 23 },
        "Mostly, yes.",
        { text: "They're quite big and solid.", number: 23 },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "My farm was up in the hills, and they had a different breed of sheep. They were Cheviots.",
      ],
    },
    {
      speaker: "DIANA",
      text: ["Oh. I heard their wool's really sought after."],
    },
    {
      speaker: "TIM",
      text: ["Yes, it's very hard wearing, and they use it for carpets."],
    },
    {
      speaker: "DIANA",
      text: ["Right."],
    },
    {
      speaker: "TIM",
      text: [
        "I was interested in the amount of supplements they add to animals' feed nowadays. Like, even the chickens got extra vitamins and electrolytes in their feed.",
        {
          text: "Yes, I found that too, and they're not cheap. But my farmer said some are overpriced for what they are. And he didn't give them as a matter of routine, just at times when the chickens seemed to particularly require them.",
          number: 24,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Yes, mine said the same. He said certain breeds of chickens might need more supplements than the others.",
        {
          text: "But the cheap and expensive ones are all basically the same. So did your farm have any other livestock, Diana?",
          number: 24,
        },
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "Yes, dairy cows. Uh. I made a really embarrassing mistake when I was working in the milk shed. Some cows had been treated with antibiotics, so their milk wasn't suitable for human consumption.",
        {
          text: "And it had to be put in a separate container, but I got mixed up, and I poured some milk from the wrong cow in with the milk for humans, so the whole lot had to be thrown away.",
          number: 25,
        },
        "The farmer wasn't too happy with me.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "I asked my farmer how much he depended on the vet to deal with health problems. I'd read reports that the livestock's health is being affected, as farmers are under pressure to increase production.",
        {
          text: "Well, he didn't agree with that, but he said that actually some of the stuff the vets do, like minor operations, he'd be quite capable of doing himself.",
          number: 26,
        },
        "Yeah. My farmer said the same. But he reckons vets' skills are still needed.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the conversation, you have some time to look at questions 27 to 30.",
        "Now listen and answer questions 27 to 30.",
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "Now we've got to give a bit of feedback about last term's modules, just short comments, apparently. Shall we do that now?",
      ],
    },
    {
      speaker: "TIM",
      text: ["OK, so medical terminology."],
    },
    {
      speaker: "DIANA",
      text: [
        "Well, my heart sank when I saw that, especially right at the beginning of the course. And I did struggle with it.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "I thought it would be hard, but actually I found it all quite straightforward.",
        { text: "What did you think about diet and nutrition?", number: 27 },
      ],
    },
    {
      speaker: "DIANA",
      text: ["OK, I suppose."],
    },
    {
      speaker: "TIM",
      text: [
        "Do you remember what they told us about pet food, and the fact that there's such limited checking into whether or not it's contaminated?",
        {
          text: "I mean in comparison with the checks on food for humans, I thought that was terrible.",
          number: 28,
        },
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "Hmm. I think the module that really impressed me was the animal disease one. When we looked at domesticated animals in different parts of the world, like camels and water buffalo and alpaca, the economies of so many countries depend on these.",
        {
          text: "But scientists don't know much about the diseases that affect them.",
          number: 29,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Yes, I thought they'd know a lot about ways of controlling and eradicating those diseases, but that's not the case at all.",
        "I loved the wildlife medication unit. Things like helping birds that have been caught in oil spills. That's something I hadn't thought about before.",
      ],
    },
    {
      speaker: "DIANA",
      text: [
        "Yeah. I thought I might write my dissertation on something connected with that.",
        { text: "Right. So...", number: 30 },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3. You now have half a minute to check your answers to part 3.",
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
     if (speaker === "FATHER") {
       return voices.find((v) => v.name.includes("David")) || voices[0];
     }

     // Erica: female
     if (speaker === "DIANA") {
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
    // Questions 21–26 (A, B, C)
    21: "C", // finding a placement for the required length of time
    22: "C", // a newly born lamb that was having trouble feeding
    23: "A", // were of various different varieties
    24: "A", // These should only be given if specially needed
    25: "B", // She accidentally threw some milk away
    26: "A", // Vets are failing to cope with some aspects of animal health

    // Questions 27–30 (A–F)
    27: "B", // Medical terminology – Tim thought this was not very clearly organised
    28: "C", // Diet and nutrition – Diana may do some further study on this
    29: "D", // Animal disease – They both found the reading required for this was difficult
    30: "F", // Wildlife medication – They were both surprised how little is known about some aspects of this
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
    localStorage.setItem("/listening1Part32022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part32022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part32022");
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
                {renderText("Work experience for veterinary science students")}
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
            {renderText("Questions 21–30")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Work experience for veterinary science students")}
          </h3>

          {/* ---------- Questions 21–26 (A–C) ---------- */}
          {[
            {
              qNum: 21,
              question:
                "What problem did both Diana and Tim have when arranging their work experience?",
              options: [
                "A. making initial contact with suitable farms",
                "B. organising transport to and from the farm",
                "C. finding a placement for the required length of time",
              ],
            },
            {
              qNum: 22,
              question: "Tim was pleased to be able to help",
              options: [
                "A. a lamb that had a broken leg.",
                "B. a sheep that was having difficulty giving birth.",
                "C. a newly born lamb that was having trouble feeding.",
              ],
            },
            {
              qNum: 23,
              question: "Diana says the sheep on her farm",
              options: [
                "A. were of various different varieties",
                "B. were mainly reared for their meat",
                "C. had better quality wool than sheep on the hills",
              ],
            },
            {
              qNum: 24,
              question:
                "What did the students learn about adding supplements to chicken feed?",
              options: [
                "A. These should only be given if specially needed.",
                "B. It is worth paying extra for the most effective ones.",
                "C. The amount given at one time should be limited.",
              ],
            },
            {
              qNum: 25,
              question: "What happened when Diana was working with dairy cows?",
              options: [
                "A. She identified some cows incorrectly.",
                "B. She accidentally threw some milk away.",
                "C. She made a mistake when storing milk.",
              ],
            },
            {
              qNum: 26,
              question: "What did both farmers mention about vets and farming?",
              options: [
                "A. Vets are failing to cope with some aspects of animal health.",
                "B. There needs to be a fundamental change in the training of vets.",
                "C. Some jobs could be done by the farmer rather than by a vet.",
              ],
            },
          ].map(({ qNum, question, options }) => (
            <div key={qNum} className="mb-6">
              <p className="text-lg mb-2">
                <span className="font-bold">{qNum} </span>
                {renderText(question)}
              </p>
              {options.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name={`q${qNum}`}
                    value={opt[0]}
                    checked={userAnswers[qNum] === opt[0]}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="form-radio"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}

          {/* ---------- Questions 27–30 (A–F) ---------- */}
          <h2 className="text-lg font-bold mt-6 mb-3">
            {renderText("Questions 27–30")}
          </h2>
          <h3 className="text-lg mb-4">
            {renderText("Choose the correct letter, A–F, for each module.")}
          </h3>
          <div className="border border-gray-400 rounded-md p-4 max-w-sm mx-auto bg-white shadow-sm">
            <h3 className="font-semibold text-center mb-3">
              {renderText("Opinions")}
            </h3>
            <ul className="space-y-1 text-gray-700">
              {[
                "A. Tim found this easier than expected.",
                "B. Tim thought this was not very clearly organised.",
                "C. Diana may do some further study on this.",
                "D. They both found the reading required for this was difficult.",
                "E. Tim was shocked at something he learned on this module.",
                "F. They were both surprised how little is known about some aspects of this.",
              ].map((item, index) => (
                <li key={index} className="ml-2">
                  {renderText(item)}
                </li>
              ))}
            </ul>
          </div>

          {[
            "Medical terminology",
            "Diet and nutrition",
            "Animal disease",
            "Wildlife medication",
          ].map((module, index) => {
            const qNum = 27 + index; // Questions 27–30
            return (
              <div key={qNum} className="flex items-center gap-3 mb-4">
                <span className="font-semibold">
                  {qNum}. {module}
                </span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C", "D", "E", "F"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}

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
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (21–30)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toUpperCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toUpperCase();
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
      <Listening1Pagination2022></Listening1Pagination2022>
    </div>
  );
};

export default Listening1Part32022;
