import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2021 from "../Pagination 2021/Reading2Pagination2021";

const Test2Reading2021 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const questions = [
    "Methods for predicting the Earth's population have recently changed.",
    "Human beings are responsible for some of the destruction to food-producing land.",
    "The crops produced in vertical farms will depend on the season.",
    "Some damage to food crops is caused by climate change.",
    "Fertilisers will be needed for certain crops in vertical farms.",
    "Vertical farming will make plants less likely to be affected by infectious diseases.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 1; // IMPORTANT (see note below)
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const userAnswer = answers[key];
      const correctAnswer = correctAnswers[key];

      if (
        typeof userAnswer === "string" &&
        userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      ) {
        newScore += 1;
      }
    });

    setScore(newScore);
    localStorage.setItem("/2021/Test 1/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

  const handleNumberClick = (qIndex) => {
    const updatedActive = [...activeNumbers];
    updatedActive[qIndex] = !updatedActive[qIndex]; // toggle active state
    setActiveNumbers(updatedActive);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // text highlight and clear

  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
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

  //  Marks show

  const correctAnswers = {
    // Questions 1–8: TRUE / FALSE / NOT GIVEN
    1: "FALSE", // Most geoglyphs in England are located in a particular area → FALSE
    2: "TRUE", // There are more geoglyphs in the shape of a horse → TRUE
    3: "NOT GIVEN", // Recent dating of Uffington White Horse → NOT GIVEN
    4: "TRUE", // Historians agree about Long Man → TRUE
    5: "TRUE", // Geoglyphs created by placing white chalk → TRUE
    6: "FALSE", // Many geoglyphs no longer visible → FALSE
    7: "TRUE", // Some shapes altered over time → TRUE

    // Questions 8–13: Gap-fill (ONE WORD ONLY)
    8: "clumsy", // People think of bears as unintelligent and clumsy
    9: "tool", // A bear has been seen using a branch as a tool
    10: "meat", // Knock down some meat
    11: "camera", // Method of reaching a platform where a camera was located
    12: "game", // Behaviour similar to a game
    13: "frustration", // Movements suggesting frustration
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 2/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

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

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 1")}</h1>
            <div className="flex gap-3">
              <IoBookSharp className="text-green-900" size={28} />
              <input
                type="checkbox"
                checked={highlight}
                onChange={() => setHighlight(!highlight)}
                className="toggle toggle-accent"
              />
            </div>
          </div>

          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 1-13")}
              </span>
              {renderText(" which are based on Reading Passage 1 below.")}
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("The White Horse of Uffington")}
            </h1>

            <p className="text-lg">
              {renderText(
                "The cutting of huge figures or 'geoglyphs' into the earth of English hillsides has taken place for more than 3,000 years. There are 56 hill figures scattered around England, with the vast majority on the chalk downlands of the country's southern counties."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The figures include giants, horses, crosses and regimental badges. Although the majority of these geoglyphs date within the last 300 years or so, there are one or two that are much older."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The most famous of these figures is perhaps also the most mysterious - the Uffington White Horse in Oxfordshire. The White Horse has recently been re-dated and shown to be even older than its previously assigned ancient pre-Roman Iron Age* date."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "More controversial is the date of the enigmatic Long Man of Wilmington in Sussex. While many historians are convinced the figure is prehistoric, others believe that it was the work of an artistic monk from a nearby priory and was created between the 11th and 15th centuries."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The method of cutting these huge figures was simply to remove the overlying grass to reveal the gleaming white chalk below."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However, the grass would soon grow over the geoglyph again unless it was regularly cleaned or scoured by a fairly large team of people. One reason that the vast majority of hill figures have disappeared is that when the traditions associated with the figures faded, people no longer bothered or remembered to clear away the grass to expose the chalk outline."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              {renderText(
                "Furthermore, over hundreds of years the outlines would sometimes change due to people not always cutting in exactly the same place, thus creating a different shape to the original geoglyph. The fact that any ancient hill figures survive at all in England today is testament to the strength and continuity of local customs and beliefs which, in one case at least, must stretch back over millennia."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The Uffington White Horse is a unique, stylised representation of a horse consisting of a long, sleek back, thin disjointed legs, a streaming tail, and a bird-like beaked head. The elegant creature almost melts into the landscape."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The horse is situated 2.5 km from Uffington village on a steep slope close to the Late Bronze Age* (c. 7th century BCE) hillfort of Uffington Castle and below the Ridgeway, a long-distance Neolithic* track."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The Uffington Horse is also surrounded by Bronze Age burial mounds. It is not far from the Bronze Age cemetery of Lambourn Seven Barrows, which consists of more than 30 well-preserved burial mounds. The carving has been placed in such a way as to make it extremely difficult to see from close quarters, and like many geoglyphs is best appreciated from the air."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Nevertheless, there are certain areas of the Vale of the White Horse, the valley containing and named after the enigmatic creature, from which an adequate impression may be gained. Indeed on a clear day the carving can be seen from up to 30 km away."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The earliest evidence of a horse at Uffington is from the 1070s CE when 'White Horse Hill' is mentioned in documents from the nearby Abbey of Abingdon, and the first reference to the horse itself is soon after, in 1190 CE."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However, the carving is believed to date back much further than that. Due to the similarity of the Uffington White Horse to the stylised depictions of horses on 1st century BCE coins, it had been thought that the creature must also date to that period."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In 1995 Optically Stimulated Luminescence (OSL) testing was carried out by the Oxford Archaeological Unit on soil from two of the lower layers of the horse's body, and from another cut near the base."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The result was a date for the horse's construction somewhere between 1400 and 600 BCE - in other words, it had a Late Bronze Age or Early Iron Age origin."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The latter end of this date range would tie the carving of the horse in with occupation of the nearby Uffington hillfort, indicating that it may represent a tribal emblem marking the land of the inhabitants of the hillfort. Alternatively, the carving may have been carried out during a Bronze or Iron Age ritual."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Some researchers see the horse as representing the Celtic* horse goddess Epona, who was worshipped as a protector of horses, and for her associations with fertility. However, the cult of Epona was not imported from Gaul (France) until around the first century CE. This date is at least six centuries after the Uffington Horse was probably carved."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              {renderText(
                "Nevertheless, the horse had great ritual and economic significance during the Bronze and Iron Ages, as attested by its depictions on jewellery and other metal objects. It is possible that the carving represents a goddess in native mythology, such as Rhiannon, described in later Welsh mythology as a beautiful woman dressed in gold and riding a white horse."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The fact that geoglyphs can disappear easily, along with their associated rituals and meaning, indicates that they were never intended to be anything more than temporary gestures. But this does not lessen their importance. These giant carvings are a fascinating glimpse into the minds of their creators and how they viewed the landscape in which they lived."
              )}
            </p>
          </div>

          {/* highlight modal */}
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

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 1–8 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 1–8</h2>

          <p className="mb-4">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>

          <div className="mb-4 space-y-1">
            <p>In boxes 1-8 on your answer sheet, choose:</p>
            <p>
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p>
              <strong>FALSE</strong> if the statement contradicts the
              information
            </p>
            <p>
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Most geoglyphs in England are located in a particular area of the country.",
              "There are more geoglyphs in the shape of a horse than any other creature.",
              "A recent dating of the Uffington White Horse indicates that people were mistaken about its age.",
              "Historians have come to an agreement about the origins of the Long Man of Wilmington.",
              "Geoglyphs were created by people placing white chalk on the hillside.",
              "Many geoglyphs in England are no longer visible.",
              "The shape of some geoglyphs has been altered over time.",
              "The fame of the Uffington White Horse is due to its size.",
            ].map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div
                    onClick={() => handleNumberClick(qIndex)}
                    className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer
              ${
                activeNumbers[qIndex]
                  ? "bg-yellow-400 border-yellow-500"
                  : "border-gray-300"
              }`}
                  >
                    {qIndex + 1}
                  </div>
                  <p className="text-lg">{q}</p>
                </div>

                <div className="ml-12 space-y-2">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleOptionClick(qIndex, option)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2
                  ${
                    selectedOptions[qIndex] === option
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500"
                  }`}
                      />
                      <span
                        className={
                          selectedOptions[qIndex] === option
                            ? "text-blue-500"
                            : ""
                        }
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 9–13 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 9–13</h2>

          <p className="mt-4">
            Complete the notes below. <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="border p-5 mt-4">
            <h3 className="text-xl font-bold text-center mb-4">
              The Uffington White Horse
            </h3>

            <ul className="list-disc list-inside space-y-4 text-lg">
              {/* 9 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  The location of the Uffington White Horse: a distance of 2.5
                  km from Uffington village near an ancient road known as the
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  9
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(9, e.target.value)}
                />
                <span>
                  close to an ancient cemetery that has a number of burial
                  mounds.
                </span>
              </li>

              {/* 10 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>First reference to White Horse Hill appears in</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  10
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(10, e.target.value)}
                />
                <span>
                  from the 1070s; horses shown on coins from the period 100 BCE
                  - 1 BCE are similar in appearance.
                </span>
              </li>

              {/* 11 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>According to analysis of the surrounding</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  11
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(11, e.target.value)}
                />
                <span>the Horse is Late Bronze Age / Early Iron Age.</span>
              </li>

              {/* 12 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Was a representation of goddess Epona - associated with
                  protection of horses and
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  12
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(12, e.target.value)}
                />
              </li>

              {/* 13 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>Was a representation of a Welsh goddess called</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  13
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(13, e.target.value)}
                />
              </li>
            </ul>
          </div>

          {/* ================= Submit / Result ================= */}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1–13)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = userAnswers[num];
                      const correctAnswer = correctAnswers[num];

                      const isCorrect =
                        typeof userAnswer === "string" &&
                        userAnswer.trim().toLowerCase() ===
                          correctAnswer.trim().toLowerCase();

                      const isWrong = userAnswer && !isCorrect;

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
                                <ImCross className="text-white text-sm" />
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
                            <span>{correctAnswer}</span>
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
      <Reading2Pagination2021></Reading2Pagination2021>
    </div>
  );
};

export default Test2Reading2021;
