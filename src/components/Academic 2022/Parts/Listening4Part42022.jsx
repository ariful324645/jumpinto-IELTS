import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2022 from "../Pagination2022/Listening4Pagination2022";
const Listening4Part42022 = () => {
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
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 4, you will hear a presentation by a food science student about the production of maple syrup.",
        "For first, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "Hello, everyone. Today we're going to look at another natural food product, and that's maple syrup.",
        "What is this exactly? Well, maple syrup looks rather like clear honey, but it's not made by bees.",
        "It's produced from the plant fluid or sap inside the maple tree, and that makes maple syrup a very natural product.",
        "Maple syrup is a thick, golden, sweet-tasting liquid.",
        {
          text: "That can be bought in bottles or jars, and poured onto foods such as waffles and ice cream, or used in the baking of cakes and pastries.",
          number: 31,
        },
        "It contains no preservatives or added ingredients, and it provides a healthy alternative to refined sugar.",
        {
          text: "Let's just talk a bit about the maple tree itself, which is where maple syrup comes from.",
          number: 32,
        },
        "So, there are many species of maple tree. And they'll grow without fertilizer in areas where there's plenty of moisture in the soil.",
        "However, they'll only do this if another important criterion is fulfilled, which is that they must have full or partial sun exposure during the day and very cool nights, and I'll talk more about that in a minute.",
        "There are only certain parts of the world that provide all these conditions. One is Canada, and by that, I mean all parts of Canada. And the other is the northeastern states of North America.",
        "In these areas, the climate suits the trees perfectly.",
        {
          text: "In fact, Canada produces over two thirds of the world's maple syrup.",
          number: 33,
        },
        "Which is why the five pointed maple leaf is a Canadian symbol, and has featured on the flag since 1964.",
        "So how did maple syrup production begin? Well, long before Europeans settled in these parts of the world, the indigenous communities had started producing maple sugar.",
        "They bored holes in the trunks of maple trees, and used containers made of tree bark to collect the liquid sap as it poured out.",
        "As they were unable to keep the liquid for any length of time, they didn't have storage facilities in those days.",
        {
          text: "They boiled the liquid by placing pieces of rock that had become scorching hot from the sun into the sap.",
          number: 34,
        },
        "They did this until it turned into sugar, and they were then able to use this to sweeten their food and drinks.",
        "Since that time, improvements have been made to the process, but it has changed very little overall.",
        "So, let's look at the production of maple syrup today.",
        "Clearly, the maple forests are a valuable resource in many Canadian and North American communities.",
        "The trees have to be well looked after, and they cannot be used to make syrup until the trunks reach a diameter of around 25 cm.",
        { text: "This can take anything up to 40 years.", number: 35 },
        "As I've already mentioned, maple trees need the right conditions to grow, and also to produce sap.",
        "Why is this? Well, what happens is that during a cold night, the tree absorbs water from the soil, and that rises through the tree's vascular system.",
        "But then in the warmer daytime, the change in temperature causes the water to be pushed back down to the bottom of the tree.",
        "This continual movement up and down leads to the formation of the sap needed for maple syrup production.",
        "When the tree is ready, it can be tapped, and this involves drilling a small hole into the trunk, and inserting a tube into it that ends in a bucket.",
        {
          text: "The trees can often take several taps, though the workers take care not to cause any damage to the healthy growth of the tree itself.",
          number: 36,
        },
        "The sap that comes out of the trees consists of 98% water and 2% sugar and other nutrients.",
        "It has to be boiled, so that much of that water evaporates.",
        "And this process has to take place immediately, using what are called evaporators.",
        {
          text: "These are basically extremely large pans. The sap is poured into these, a fire is built, and the pans are then heated until the sap boils.",
          number: 37,
        },
        "As it does this, the water evaporates, and the syrup begins to form.",
        "The evaporation process creates large quantities of steam, and the sap becomes thicker and denser, and at just the right moment, when the sap is thick enough to be called maple syrup, the worker removes it from the heat.",
        {
          text: "After this process, something called sugar sand has to be filtered out, as this builds up during the boiling and gives the syrup a cloudy appearance and a slightly gritty taste.",
          number: 38,
        },
        {
          text: "Once this has been done, the syrup is ready to be packaged, so that it can be used for a whole variety of products.",
          number: 39,
        },
        {
          text: "It takes 40 liters of sap to produce 1 liter of maple syrup.",
          number: 40,
        },
        "So you can get an idea of how much is needed. So that's the basic process. In places like Quebec where...",
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
      if (speaker === "SPEAKER") {
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
    31: "golden", // colour described as very golden
    32: "healthy", // compared to refined sugar, provides a healthy alternative
    33: "regions", // best growing conditions and regions are in Canada and North America
    34: "rocks", // used hot rocks to heat the sap
    35: "diameter", // tree trunks may not have the correct diameter until 40 years
    36: "tube", // a tap is drilled into the trunk and a tube carries the sap
    37: "fire", // evaporators are heated by means of a fire
    38: "steam", // a lot of steam is produced during evaporation
    39: "cloudy", // sugar sand makes syrup look cloudy and affects taste
    40: "liter", // a huge quantity of sap is needed to make 1 liter of maple syrup
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
    localStorage.setItem("/2021/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2021/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/listening");
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
                {renderText("Advice on Surfing Holidays")}
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
          <div className="border p-6 rounded-lg space-y-4 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Maple Syrup")}
            </h1>

            {/* What is maple syrup? */}
            <h2 className="font-semibold text-lg mt-4">
              {renderText("What is maple syrup?")}
            </h2>
            <p className="text-lg">
              {renderText("Made from the sap of the maple tree")}
            </p>
            <p className="text-lg">
              {renderText("Added to food or used in cooking")}
            </p>

            <p className="text-lg">
              {renderText("Colour described as")}
              <button
                onClick={() => toggleButton(31)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                31
              </button>
              <input
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            <p className="text-lg">{renderText("Compared to refined sugar")}</p>
            <p className="text-lg">
              <button
                onClick={() => toggleButton(32)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                32
              </button>
              <input
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* The maple tree */}
            <h2 className="font-semibold text-lg mt-4">
              {renderText("The maple tree")}
            </h2>
            <p className="text-lg">{renderText("Has many species")}</p>
            <p className="text-lg">
              {renderText("Needs sunny days and cool nights")}
            </p>
            <p className="text-lg">
              {renderText(
                "Maple leaf has been on the Canadian flag since 1964"
              )}
            </p>
            <p className="text-lg">
              {renderText(
                "Needs moist soil but does not need fertiliser as well"
              )}
            </p>

            <p className="text-lg">
              {renderText("Best growing conditions and")}
              <button
                onClick={() => toggleButton(33)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                33
              </button>
              <input
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
            </p>

            {/* Early maple sugar producers */}
            <h2 className="font-semibold text-lg mt-4">
              {renderText("Early maple sugar producers")}
            </h2>
            <p className="text-lg">
              {renderText("Made holes in the tree trunks")}
            </p>

            <p className="text-lg">
              {renderText("Used hot")}
              <button
                onClick={() => toggleButton(34)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                34
              </button>
              <input
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("to heat the sap")}
            </p>

            <p className="text-lg">
              {renderText("Used tree bark to make containers for collection")}
            </p>
            <p className="text-lg">
              {renderText("Sweetened food and drink with sugar")}
            </p>

            {/* Today's maple syrup */}
            <h2 className="font-semibold text-lg mt-4">
              {renderText("Today's maple syrup")}
            </h2>
            <p className="text-lg">{renderText("The trees")}</p>

            <p className="text-lg">
              {renderText("Tree trunks may not have the correct")}
              <button
                onClick={() => toggleButton(35)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                35
              </button>
              <input
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("until they have been growing for 40 years.")}
            </p>

            <p className="text-lg">
              {renderText(
                "The changing temperature and movement of water within the tree produces the sap."
              )}
            </p>

            <h2 className="font-semibold text-lg mt-4">
              {renderText("The production")}
            </h2>
            <p className="text-lg">
              {renderText("A tap is drilled into the trunk and a")}
              <button
                onClick={() => toggleButton(36)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                36
              </button>
              <input
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("carries the sap into a bucket.")}
            </p>

            <p className="text-lg">
              {renderText(
                "Large pans of sap called evaporators are heated by means of a"
              )}
              <button
                onClick={() => toggleButton(37)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                37
              </button>
              <input
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(".")}
            </p>

            <p className="text-lg">
              {renderText("A lot of")}
              <button
                onClick={() => toggleButton(38)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                38
              </button>
              <input
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("is produced during the evaporation process.")}
            </p>

            <p className="text-lg">
              {renderText(
                "'Sugar sand' is removed because it makes the syrup look"
              )}
              <button
                onClick={() => toggleButton(39)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                39
              </button>
              <input
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("and affects the taste.")}
            </p>

            <p className="text-lg">
              {renderText(
                "The syrup is ready for use. A huge quantity of sap is needed to make a"
              )}
              <button
                onClick={() => toggleButton(40)}
                className="mx-2 w-8 h-8 rounded-full border-2"
              >
                40
              </button>
              <input
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("of maple syrup.")}
            </p>
          </div>

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
                    All Answers (31–40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 31).map((num) => {
                      const userAnswer = userAnswers[num]?.trim() || "";
                      const correctAnswer = correctAnswers[num]?.trim();
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
                              <span className="italic">No answer provided</span>
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
      <Listening4Pagination2022></Listening4Pagination2022>
    </div>
  );
};

export default Listening4Part42022;
