import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Listening1Pagination2015 from "../Pagination 2015/Listening1Pagination2015";
import Listening2Pagination2015 from "../Pagination 2015/Listening2Pagination2015";
import Listening4Pagination2015 from "../Pagination 2015/Listening4Pagination2015";

const Listening4Part42015 = () => {
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
        "Section 4, you will hear a woman talking to a group of first-year science undergraduates about the developing science of nanotechnology.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Today we're going to look at an important area of science, namely nanotechnology.",
        "So, what is it? Nano means tiny. So it's science and engineering on the scale of atoms and molecules.",
        "The idea is that by controlling and rearranging atoms, you can literally create anything.",
        "However, as we'll see, the science of the small has some big implications affecting us in many ways.",
        "There's no doubt that nanotechnology promises so much for civilization.",
        "However, all new technologies have their teething problems.",
        "And with nanotechnology, society often gets the wrong idea about its capabilities.",
        {
          text: "Numerous science fiction books and movies have raised people's fears about nanotechnology. With scenarios such as inserting little nano-robots into your body that monitor everything you do without you realizing it, or self-replicating nano-robots that eventually take over the world.",
          number: 31,
        },
        "So, how do we safeguard such a potentially powerful technology?",
        {
          text: "Some scientists recommend that nanoparticles be treated as new chemicals. With separate safety tests and clear labeling. They believe that greater care should also be taken with nanoparticles in laboratories and factories.",
          number: 32,
        },
        {
          text: "Others have called for a withdrawal of new nano-products, such as cosmetics, and a temporary halt to many kinds of nanotech research. But as far as I'm concerned, there's a need to plough ahead with the discoveries and applications of nanotechnology.",
          number: 33,
        },
        "I really believe that most scientists would welcome a way to guard against unethical uses of such technology.",
        "We can't go around thinking that all innovation is bad, all advancement is bad.",
        "As with the debate about any new technology, it is how you use it that's important.",
        "So, let's look at some of its possible uses.",
        {
          text: "Thanks to nanotechnology, there could be a major breakthrough in the field of transportation with the production of more durable metals.",
          number: 34,
        },
        "These could be virtually unbreakable, lighter, and much more pliable.",
        "Leading to planes that are 50 times lighter than at present.",
        {
          text: "Those same improved capabilities will dramatically reduce the cost of traveling into space.",
          number: 35,
        },
        "Making it more accessible to ordinary people, and opening up totally new holiday destinations.",
        {
          text: "In terms of technology, the computer industry will be able to shrink computer parts down to minute sizes. We need nanotechnology in order to create a new generation of computers that will work even faster, and will have a million times more memory, but will be about the size of a sugar cube.",
          number: 36,
        },
        {
          text: "Nanotechnology could also revolutionize the way that we generate power. The cost of solar cells will be drastically reduced, so harnessing this energy will be far more economical than at present.",
          number: 37,
        },
        "But nanotechnology has much wider applications than this, and could have an enormous impact on our environment.",
        {
          text: "For instance, tiny airborne nano-robots could be programmed to actually rebuild the ozone layer, which could lessen the impact of global warming on our planet. That's a pretty amazing thought, isn't it?",
          number: 38,
        },
        "On a more local scale, this new technology could help with the cleanup of environmental disasters, as nanotechnology will allow us to remove oil and other contaminants from the water far more effectively.",
        {
          text: "And if nanotechnology progresses as expected, as a sort of building block set of about 90 atoms, then you could build anything you wanted from the bottom up. In terms of production, this means that you only use what you need, and so there wouldn't be any waste.",
          number: 39,
        },
        {
          text: "The notion that you could create anything at all has major implications for our health. It means that we'll eventually be able to replicate anything. This would have a phenomenal effect on our society. In time, it could even lead to the eradication of famine, through the introduction of machines that produce food to feed the hungry.",
          number: 40,
        },
        "But it's in the area of medicine that nanotechnology may have its biggest impact. How we detect disease will change, as tiny biosensors are developed to analyze tests in minutes rather than days.",
        "There's even speculation nano-robots could be used to slow the aging process, lengthening life expectancy.",
        "As you can see, I'm very excited by the implications that could be available to us in the next few decades. Just how long it'll take, I honestly don't know.",
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
                {renderText("Nanotechnology")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 31–33")}
          </h2>

          <p className="mb-5 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          {/* Topic */}
          <h3 className="text-lg font-semibold mb-5">
            {renderText("Nanotechnology: technology on a small scale")}
          </h3>

          {/* Question 31 */}
          <div className="mb-4">
            <p className="font-semibold">
              {renderText(
                "31. The speaker says that one problem with nanotechnology is that"
              )}
            </p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>{renderText("A. it could threaten our way of life.")}</li>
              <li>{renderText("B. it could be used to spy on people.")}</li>
              <li>{renderText("C. it is misunderstood by the public.")}</li>
            </ul>
          </div>

          {/* Question 32 */}
          <div className="mb-4">
            <p className="font-semibold">
              {renderText(
                "32. According to the speaker, some scientists believe that nano-particles"
              )}
            </p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>
                {renderText("A. should be restricted to secure environments.")}
              </li>
              <li>{renderText("B. should be used with more caution.")}</li>
              <li>
                {renderText(
                  "C. should only be developed for essential products."
                )}
              </li>
            </ul>
          </div>

          {/* Question 33 */}
          <div className="mb-4">
            <p className="font-semibold">
              {renderText(
                "33. In the speaker's opinion, research into nanotechnology"
              )}
            </p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>{renderText("A. has yet to win popular support.")}</li>
              <li>{renderText("B. could be seen as unethical.")}</li>
              <li>{renderText("C. ought to be continued.")}</li>
            </ul>
          </div>
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 31–33")}
          </h2>

          <p className="mb-5 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          <h3 className="text-lg font-semibold mb-5">
            {renderText("Nanotechnology: technology on a small scale")}
          </h3>

          {/* Box with Transport Survey */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Uses of Nanotechnology")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* 34 */}
              <li className="text-lg">
                {renderText(
                  "Nanotechnology could allow the development of stronger"
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText(". Planes would be much lighter in weight.")}
              </li>

              {/* 35 */}
              <li className="text-lg">
                {renderText("Travel will be made available to the masses.")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              {/* 36 */}
              <li className="text-lg">
                {renderText(
                  "Computers will be even smaller, faster, and will have a greater"
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              {/* 37 */}
              <li className="text-lg">
                {renderText("Energy will become more affordable.")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              {/* 38 */}
              <li className="text-lg">
                {renderText("Pollutants such as")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText("could be removed from water more easily.")}
              </li>

              {/* 39 */}
              <li className="text-lg">
                {renderText("There will be no")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText("from manufacturing.")}
              </li>

              {/* 40 */}
              <li className="text-lg">
                {renderText("Analysis of medical")}
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
                  className="border-2 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                {renderText(
                  "will be speeded up. Life expectancy could be increased."
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Listening4Pagination2015></Listening4Pagination2015>
    </div>
  );
};

export default Listening4Part42015;
