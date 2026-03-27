import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2025 from "../Pagination 2025/Listening3Pagination2025";

const Listening3Part42025 = () => {
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
        "Part 4. You will hear a design and technology lecturer talking about inclusive design.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "It's only relatively recently that designers have become aware of the need to be inclusive when designing products, but what does that mean exactly?",
        "Well, it simply means designing products that span economic, social and cultural barriers.",
        "It means making sure products are accessible, ",
        {
          text: "so that as many different types of people as possible can use them without any type of adaptation having to be made to the original design. Inclusive design explained.",
          number: 31,
        },
        "Inclusive design is often linked with universal design, although they are not quite the same thing.",
        "Universal design aims to make products that work for everyone, and ",
        {
          text: " that includes considering the needs of people who have cognitive difficulties, which can present quite a challenge. Challenges of inclusive design.",
          number: 32,
        },
        "Today, examples of successful inclusive design can be seen all around us.",

        {
          text: "In workplaces, it is common to see desks which can be adjusted to suit people of different heights, or for wheelchair users. Workplace examples of inclusive design.",
          number: 33,
        },
        "This still isn't always the case, however, and is one reason why office workers often suffer from back or neck problems.",
        "You'll find another example in the public toilets of countless hotels, airports and offices.",
        "",
        {
          text: " Taps that you activate by sensor require no pressing or twisting movements. .",
          number: 34,
        },
        "Accessible facilities in public places",
        "These are not only more hygienic, they're also easier for people with dexterity or mobility issues.",
        "The tech industry has been criticized in the past for focusing too much on young consumers, but this is changing.",
        "Many products are now designed with the elderly in mind.",
        "For example, it's well known that vision declines with age, and that we also become worse at distinguishing between similar colors,",
        {
          text: " in particular shades of blue, which is why software designers rarely create interfaces with this color. Inclusive design for the elderly.",
          number: 35,
        },
        "Motor skills also decline with age, and some people have difficulty doing everyday things, like picking up a cup or opening a door.",
        "This can also affect their ability to use a mouse or keyboard.",
        "",
        {
          text: "So voice access is now a routine way of making commands.",
          number: 36,
        },
        "Voice access and adaptive design",
        "It's worth looking at the problems non-inclusive designs cause when not enough consideration is given to a range of users, as it can have a serious impact on people's lives.",
        "Access is one obvious example, because it has such a huge impact on disabled people's independence.",
        "Not being able to access public transport because buses or trains are not wheelchair-friendly means many disabled people can't go out, unless someone goes with them.",
        "Safety is another issue, inexplicably, most cars are still crash tested using a dummy based on an average sized male.",
        "",
        {
          text: "This has safety implications for all women, particularly those who are pregnant, as the seat belts worn by the dummy are not adapted to accommodate them. Safety issues in design.",
          number: 37,
        },
        "Over the past 100 years, workplaces in the UK have on the whole become considerably safer.",
        "Employers are legally required to provide well maintained personal protective equipment or PPE, anything from goggles to full body suits, to workers who need it free of charge.",
        "But most PPE is designed to fit men.",
        "A recent report found that employers often think that when it comes to female workers, all they need to do to comply with this legal requirement is to buy jackets, for example, designed for a small man.",

        {
          text: "The problem with this is that women can be tall and still have much smaller shoulders than the average man. ",
          number: 38,
        },
        "Problems with PPE design for women.",
        "Ill-fitting PPE such as hi-vis jackets, vests, and body armor can put women at risk.",
        "The report found that 95% of women said that their PPE often hampered their work.",
        "And that this problem was worst in the emergency services, particularly the police.",
        "Another problem is related to comfort at work.",
        "A very common scenario in offices in summertime is to see women wrapped in blankets or wearing sweaters while the air conditioning is on high.",
        "Meanwhile, the men are in shorts and t-shirts.",
        "This is due to differences in metabolic rates for men and women.",
        "There is a standard setting for air conditioning to be at a temperature of 21 degrees.",
        {
          text: "And that this problem was worst in the emergency services, particularly the police",
          number: 39,
        },
        "Designed to suit men, and in most modern offices, it's not possible to turn the air conditioning up or down.",
        "This means that many offices which mainly employ women are wasting energy by having the air conditioning set too high.",
        "As you can see from the examples I've just mentioned, there are serious consequences for designs which don't consider the needs of all users.",
        { text: "Consequences of non-inclusive design.", number: 40 },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 4.",
        "You now have one minute to check your answers to part 4.",
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
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
    31: "accessibility", // Designing products that can be accessed by a diverse range of people
    32: "cognitive", // Including catering for people with cognitive problems
    33: "desks", // Desks which are adjustable, avoiding back or neck problems
    34: "taps", // Taps in public toilets which are easier to use
    35: "blue", // Designers avoid using blue in interfaces
    36: "voice", // People can make commands using a mouse, keyboard or their voice
    37: "pregnant", // Seatbelts especially problematic for pregnant women
    38: "shoulders", // PPE jackets often unsuitable because of the size of women's shoulders
    39: "female", // PPE for female officers dealing with emergencies is the worst
    40: "air-conditioning", // Air-conditioning in offices is often too low for women
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
                {renderText("Food Fashions and Marketing Campaigns")}
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
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6 space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Inclusive design")}
            </h1>

            <h3 className="font-semibold mt-4">{renderText("Definition")}</h3>

            <p className="text-lg">
              {renderText(
                "Designing products that can be accessed by a diverse range of people without the need for any",
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
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <p className="text-lg">
              {renderText(
                "Not the same as universal design: that is design for everyone, including catering for people with",
              )}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" problems.")}
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Examples of inclusive design")}
            </h3>

            <p className="text-lg">
              {renderText("Desks")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                " which are adjustable, avoiding back or neck problems.",
              )}
            </p>

            <p className="text-lg">
              {renderText("Taps")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" in public toilets which are easier to use.")}
            </p>

            <p className="text-lg">
              {renderText("To assist the elderly: designers avoid using")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" in interfaces.")}
            </p>

            <p className="text-lg">
              {renderText(
                "People can make commands using a mouse, keyboard or their",
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
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Impact of non-inclusive designs")}
            </h3>

            <p className="text-lg">
              {renderText("Seatbelts are especially problematic for")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" women.")}
            </p>

            <p className="text-lg">
              {renderText(
                "PPE jackets are often unsuitable because of the size of women's",
              )}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <p className="text-lg">
              {renderText("PPE for female")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" officers dealing with emergencies is the worst.")}
            </p>

            <p className="text-lg">
              {renderText("The")}
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
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(" in offices is often too low for women.")}
            </p>
          </div>

          {/* ---------- Submit / Result Section ---------- */}
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
      <Listening3Pagination2025></Listening3Pagination2025>
    </div>
  );
};

export default Listening3Part42025;
