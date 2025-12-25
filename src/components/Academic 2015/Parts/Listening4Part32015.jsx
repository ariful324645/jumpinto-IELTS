import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";
import Listening2Pagination2015 from "../Pagination 2015/Listening2Pagination2015";
import Listening4Pagination2015 from "../Pagination 2015/Listening4Pagination2015";

const Listening4Part32015 = () => {
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
        "Section 3, you will hear two psychology students called Tim and Laura talking about Laura's work placement first.",
        "You have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Hi, Laura, could you spare a few minutes to talk about the work placement you did last summer? I'm thinking of doing one myself.",
      ],
    },
    {
      speaker: "LAURA",
      text: ["Hi, Tim. Sure."],
    },
    {
      speaker: "TIM",
      text: ["Didn't you do yours at an environmental services company?"],
    },
    {
      speaker: "LAURA",
      text: [
        "That's right. It's only a very small company, and they needed someone to produce a company brochure. And I wanted to get some business experience, because I'm interested in a career in occupational psychology in a business environment. It was good, because I had overall responsibility for the project.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "What kind of skills do you think you developed on the placement? I mean apart from the ones you already had. Did you have to do all the artwork for the brochure? The layout and everything.",
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "We hired the services of a professional photographer for that. I did have to use my IT skills to a certain extent, because I cut and pasted text from marketing leaflets. But that didn't involve anything I hadn't done before.",
        {
          text: "Oh, definitely. There was so much pressure to meet the project deadline, and I also got better at explaining things, and asserting my opinions. Because I had to have weekly consultations with the marketing manager, and give him a progress report.",
          number: 21,
        },
        {
          text: "Oh, definitely. There was so much pressure to meet the project deadline, and I also got better at explaining things, and asserting my opinions. Because I had to have weekly consultations with the marketing manager, and give him a progress report.",
          number: 22,
        },
      ],
    },
    {
      speaker: "TIM",
      text: ["It sounds as if you got a lot out of it then."],
    },
    {
      speaker: "LAURA",
      text: [
        "Absolutely. It was really worthwhile, but you know, the company benefited too.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Yes, they must have done. After all, if they'd used a professional advertising agency to produce their brochure, instead of doing it in-house. Presumably they'd have paid a lot more.",
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "Oh yes, I worked it out. It would have been 250% more, and I thought the end result was good. Even though we did everything on site, the company has quite a powerful computer, and I managed to borrow some scanning software from the university. The new brochure looks really professional. It enhances the image of the company straight away.",
        {
          text: "Even though we did everything on site, the company has quite a powerful computer, and I managed to borrow some scanning software from the university. The new brochure looks really professional. It enhances the image of the company straight away.",
          number: 23,
        },
        {
          text: "The new brochure looks really professional. It enhances the image of the company straight away.",
          number: 24,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "So, in the long run, it should help them to attract clients and improve their sales figures.",
      ],
    },
    {
      speaker: "LAURA",
      text: ["That's the idea, yeah."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Well, all in all, it sounds very positive. I think I'll go ahead and apply for a placement myself. How do I go about it?",
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "It's easy enough to do. Because there's a government agency called STEP - S T E P - that organizes placements for students. You should start by getting their booklet with all the details. I expect you can download one from their website.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Actually, they've got copies in the psychology department. I've seen them there. I'll just go to the office and pick one up.",
        {
          text: "I've seen them there. I'll just go to the office and pick one up.",
          number: 25,
        },
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "Right, and then, if I were you, after I'd looked at it, I'd go over all the options with someone.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "I suppose I should ask my tutor's advice. He knows more about me than anyone.",
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "One of the career officers would be better. They've got more knowledge about the jobs market than your personal tutor would have.",
        {
          text: "They've got more knowledge about the jobs market than your personal tutor would have.",
          number: 26,
        },
      ],
    },
    {
      speaker: "TIM",
      text: ["OK."],
    },
    {
      speaker: "LAURA",
      text: [
        "And then, when you know what you want, you can register with STEP. You'll find their address in the booklet, and once you've registered, they assign you to a mentor who looks after your application.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "And then I suppose you just sit back and wait till you hear something.",
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "They told me at the careers office that it's best to be proactive and get updates yourself. By checking the website for new placement alerts.",
        {
          text: "By checking the website for new placement alerts.",
          number: 27,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "I don't suppose it's a good idea to get in touch with companies directly, is it?",
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "Not really, but it is the company who notifies you if they want you to go for an interview. You get a letter of invitation or an email from the personnel department.",
        {
          text: "You get a letter of invitation or an email from the personnel department.",
          number: 28,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "And do I reply directly to them?",
        {
          text: "And do I reply directly to them?",
          number: 28,
        },
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "Yes, you do. STEP only gets involved again once you've been made a job offer.",
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Right, so once you've had an interview, you should let your mentor know what the outcome is. I mean, whether you're offered a job, and whether you've decided to accept it.",
        {
          text: "I mean, whether you're offered a job, and whether you've decided to accept it.",
          number: 29,
        },
      ],
    },
    {
      speaker: "LAURA",
      text: [
        "That's right. They'll inform the careers office once a placement has been agreed, so you don't have to do that.",
      ],
    },
    {
      speaker: "TIM",
      text: ["Is that all then?"],
    },
    {
      speaker: "LAURA",
      text: [
        "More or less. Only once you've accepted an offer, you'll probably have to supply a reference, because the placement will be conditional on that, and that's something you should ask your own tutor to provide. He knows about your academic ability, and also about your qualities like reliability.",
        {
          text: "He knows about your academic ability, and also about your qualities like reliability.",
          number: 30,
        },
      ],
    },
    {
      speaker: "TIM",
      text: [
        "Well, thanks very much for the information. I'm starting to look forward to...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 3.",
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
    // Questions 11 and 12 (Choose TWO: A and C)
    11: "A", // the gym (recently refurbished with 10 new running machines)
    12: "C", // the indoor pool (expanded to eight lanes, making it much wider)

    // Questions 13–20 (Notes completion)
    13: "health problems",
    14: "safety rules",
    15: "plan",
    16: "joining",
    17: "free entry",
    18: "peak",
    19: "guests",
    20: "photo card",
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
    localStorage.setItem("/listening2Part32018", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32018");
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
                {renderText("Laura's work placement")}
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
        <div className="p-4 max-w-4xl mx-auto overflow-y-scroll">
          {/* ---------- Questions 21–22 ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21 and 22")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>

          <p className="font-semibold mt-3">
            {renderText(
              "21–22 Which TWO skills did Laura improve as a result of her work placement?"
            )}
          </p>

          {[
            ["A", "communication"],
            ["B", "design"],
            ["C", "IT"],
            ["D", "marketing"],
            ["E", "organisation"],
          ].map(([key, text]) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                value={key}
                onChange={(e) => handleInputChange(21, e.target.value)}
              />
              <span className="font-semibold">{key}.</span>
              {renderText(text)}
            </label>
          ))}

          {/* ---------- Questions 23–24 ---------- */}
          <h2 className="font-bold text-lg mt-8">
            {renderText("Questions 23 and 24")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>

          <p className="font-semibold mt-3">
            {renderText(
              "23–24 Which TWO immediate benefits did the company get from Laura's work placement?"
            )}
          </p>

          {[
            ["A", "updates for its software"],
            ["B", "cost savings"],
            ["C", "an improved image"],
            ["D", "new clients"],
            ["E", "a growth in sales"],
          ].map(([key, text]) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                value={key}
                onChange={(e) => handleInputChange(23, e.target.value)}
              />
              <span className="font-semibold">{key}.</span>
              {renderText(text)}
            </label>
          ))}

          {/* ---------- Questions 25–30 ---------- */}
          <h2 className="font-bold text-lg mt-8">
            {renderText("Questions 25–30")}
          </h2>
          <p className="mb-4">
            {renderText(
              "What source of information should Tim use at each of the following stages of the work placement?"
            )}
            <br />
            {renderText(
              "Choose the correct letter, A–G, next to Questions 25–30."
            )}
          </p>

          {/* Sources list */}
          <div className="border p-5 rounded-lg bg-white max-w-sm mx-auto mb-6 text-center">
            {[
              { letter: "A", text: "company manager" },
              { letter: "B", text: "company's personnel department" },
              { letter: "C", text: "personal tutor" },
              { letter: "D", text: "psychology department" },
              { letter: "E", text: "mentor" },
              { letter: "F", text: "university careers officer" },
              { letter: "G", text: "internet" },
            ].map((item) => (
              <p key={item.letter}>
                <span className="font-semibold">{item.letter}.</span>{" "}
                {renderText(item.text)}
              </p>
            ))}
          </div>

          {/* Stages of work placement */}
          <div className="">
            <h1 className="font-bold text-2xl mb-4">
              Stages of the work placement procedure
            </h1>
            {[
              { q: 25, text: "obtaining booklet" },
              { q: 26, text: "discussing options" },
              { q: 27, text: "getting updates" },
              { q: 28, text: "responding to invitation for interview" },
              { q: 29, text: "informing about outcome of interview" },
              { q: 30, text: "requesting a reference" },
            ].map((item) => (
              <div key={item.q} className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{item.q}</span>
                <span>{item.text}</span>
                <select
                  value={userAnswers[item.q] || ""}
                  onChange={(e) => handleInputChange(item.q, e.target.value)}
                  className="border px-2 py-1 rounded-md"
                >
                  <option value="" disabled>
                    {item.q} {/* placeholder */}
                  </option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Listening4Pagination2015></Listening4Pagination2015>
    </div>
  );
};

export default Listening4Part32015;
