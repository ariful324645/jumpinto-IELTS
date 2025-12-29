import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading2Pagination2015 from "../Pagination 2015/Reading2Pagination2015";

//  Marks show

const Test2Reading2015 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 38;
      const updated = { ...prev, [answerKey]: option };
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
    localStorage.setItem("/reading4Part32020", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

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

  const correctAnswers = {
    // =========== Questions 1–7 (Paragraph headings) ===========
    1: "i", // Paragraph A → The search for the reasons for an increase in population
    2: "ii", // Paragraph B → Industrialisation and the fear of unemployment
    3: "iii", // Paragraph C → The development of cities in Japan
    4: "iv", // Paragraph D → The time and place of the Industrial Revolution
    5: "v", // Paragraph E → The cases of Holland, France and China
    6: "vi", // Paragraph F → Changes in drinking habits in Britain
    7: "vii", // Paragraph G → Two keys to Britain's industrial revolution

    // =========== Questions 8–13 (TRUE / FALSE / NOT GIVEN) ===========
    8: "TRUE", // China's transport system was not suitable for industry in the 18th century
    9: "TRUE", // Tea and beer both helped to prevent dysentery in Britain
    10: "FALSE", // Roy Porter disagrees with Professor Macfarlane's findings
    11: "FALSE", // After 1740, there was a reduction in population in Britain
    12: "TRUE", // People in Britain used to make beer at home
    13: "TRUE", // The tax on malt indirectly caused a rise in the death rate
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2015/Test 2/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2015/Test 2/reading");
    if (savedScore) {
      setScore(Number(savedScore));
    }
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
              {renderText(
                "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("Tea and the Industrial Revolution")}
            </h1>

            <p className="italic text-center mb-6">
              {renderText(
                "A Cambridge professor says that a change in drinking habits was the reason for the Industrial Revolution in Britain. Anjana Ahuja reports"
              )}
            </p>

            {/* A */}
            <p className="font-bold mb-1">{renderText("A")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Alan Macfarlane, professor of anthropological science at King’s College, Cambridge, has, like other historians, spent decades wrestling with the enigma of the Industrial Revolution."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Why did this particular Big Bang – the world-changing birth of industry – happen in Britain?"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>

              {renderText(
                " And why did it strike at the end of the 18th century?"
              )}
            </p>

            {/* B */}
            <p className="font-bold mb-1">{renderText("B")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Macfarlane compares the puzzle to a combination lock."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "There are about 20 different factors and all of them need to be present before the revolution can happen."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "For industry to take off, there needs to be the technology and power to drive factories, large urban populations to provide cheap labour, easy transport to move goods around, an affluent middle-class willing to buy mass-produced objects, a market-driven economy and a political system that allows this to happen."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "While this was the case for England, other nations, such as Japan, the Netherlands and France, also met some of these criteria but were not industrialising."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "All these factors must have been necessary but not sufficient to cause the revolution."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Most historians are convinced there are one or two missing factors that you need to open the lock."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            {/* C */}
            <p className="font-bold mb-1">{renderText("C")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "The missing factors, he proposes, are to be found in almost every kitchen cupboard."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Tea and beer, two of the nation’s favourite drinks, fuelled the revolution."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "The antiseptic properties of tannin, the active ingredient in tea, and of hops in beer – plus the fact that both are made with boiled water – allowed urban communities to flourish at close quarters without succumbing to water-borne diseases such as dysentery."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "The theory sounds eccentric but once he explains the detective work behind his deduction, scepticism gives way to admiration. His case has been strengthened by support from notable figures, including medical historian Roy Porter."
              )}
            </p>

            {/* D */}
            <p className="font-bold mb-1">{renderText("D")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Macfarlane had wondered for a long time how the Industrial Revolution came about."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Historians identified one key factor in the mid-18th century that required explanation."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Between about 1650 and 1740, Britain’s population was static. Then suddenly there was a burst of population growth."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Macfarlane says the infant mortality rate halved in 20 years, in rural and urban areas and across all classes."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Possible explanations such as medical advances, environmental change and sanitation were ruled out. Food quality even appeared to decline. The reason for falling child deaths remained unexplained."
              )}
            </p>

            {/* E */}
            <p className="font-bold mb-1">{renderText("E")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "This population growth occurred at exactly the right time to supply labour for industry."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But dense populations also increase disease, especially from human waste."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Historical records showed a change in water-borne disease. Macfarlane concluded that what people drank mattered."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Beer, protected by antibacterial hops, had kept people healthy. But a late-17th-century tax on malt pushed poorer people towards water and gin, increasing mortality – until it suddenly fell again."
              )}
            </p>

            {/* F */}
            <p className="font-bold mb-1">{renderText("F")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Macfarlane examined Japan, which had large cities and no sanitation but far fewer water-borne diseases."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Tea was common in Japan, and Britain’s own tea consumption rose sharply in the early 18th century, just as infant mortality declined."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7,8
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Boiled water and tea’s purifying effects likely improved mothers’ breast milk. No other European nation drank tea on such a scale."
              )}
            </p>

            {/* G */}
            <p className="font-bold mb-1">{renderText("G")}</p>
            <p className="text-lg mb-5">
              {renderText("Why then did Japan not industrialise first?")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Macfarlane argues that Japan abandoned labour-saving devices, fearing unemployment."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Despite its sophistication, Japan entered the 19th century having effectively ‘abandoned the wheel’."
              )}
            </p>

            {/* Glossary */}
            <p className="text-sm italic mt-8">
              {renderText(
                "Glossary: Lister’s revolution – Joseph Lister pioneered antiseptic surgical techniques to prevent infection."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          {/* table */}

          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 1–7 ================= */}
            <h2 className="text-lg font-bold">{renderText("Questions 1–7")}</h2>

            <p>{renderText("Reading Passage 1 has seven paragraphs, A–G.")}</p>

            <p>
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below."
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct number, i–ix, in boxes 1–7 on your answer sheet."
              )}
            </p>

            {/* -------- List of Headings -------- */}
            <div className="border border-black p-5 max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                {renderText("List of Headings")}
              </h3>

              <ul className="space-y-1 text-lg">
                <li>
                  {renderText(
                    "i. The search for the reasons for an increase in population"
                  )}
                </li>
                <li>
                  {renderText(
                    "ii. Industrialisation and the fear of unemployment"
                  )}
                </li>
                <li>{renderText("iii. The development of cities in Japan")}</li>
                <li>
                  {renderText(
                    "iv. The time and place of the Industrial Revolution"
                  )}
                </li>
                <li>
                  {renderText("v. The cases of Holland, France and China")}
                </li>
                <li>
                  {renderText("vi. Changes in drinking habits in Britain")}
                </li>
                <li>
                  {renderText(
                    "vii. Two keys to Britain's industrial revolution"
                  )}
                </li>
                <li>
                  {renderText(
                    "viii. Conditions required for industrialisation"
                  )}
                </li>
                <li>
                  {renderText("ix. Comparisons with Japan lead to the answer")}
                </li>
              </ul>
            </div>

            {/* -------- Questions 1–7 Dropdowns -------- */}
            {[
              { q: 1, text: "Paragraph A" },
              { q: 2, text: "Paragraph B" },
              { q: 3, text: "Paragraph C" },
              { q: 4, text: "Paragraph D" },
              { q: 5, text: "Paragraph E" },
              { q: 6, text: "Paragraph F" },
              { q: 7, text: "Paragraph G" },
            ].map(({ q, text }) => (
              <p key={q} className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-lg">{renderText(`${q}.`)}</span>
                <span>{renderText(text)}</span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                  >
                    <option value="">{q}</option>
                    {[
                      "i",
                      "ii",
                      "iii",
                      "iv",
                      "v",
                      "vi",
                      "vii",
                      "viii",
                      "ix",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}

            {/* ================= Questions 8–13 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 8–13")}
            </h2>

            <p>
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?"
              )}
            </p>

            <p>{renderText("In boxes 8–13 on your answer sheet, choose")}</p>

            <ul className="ml-6 text-lg space-y-1">
              <li>
                <strong>TRUE</strong> –{" "}
                {renderText("if the statement agrees with the information")}
              </li>
              <li>
                <strong>FALSE</strong> –{" "}
                {renderText("if the statement contradicts the information")}
              </li>
              <li>
                <strong>NOT GIVEN</strong> –{" "}
                {renderText("if there is no information on this")}
              </li>
            </ul>

            {/* -------- Questions 8–13 YES/NO/NG -------- */}
            {[
              {
                q: 8,
                text: "China's transport system was not suitable for industry in the 18th century.",
              },
              {
                q: 9,
                text: "Tea and beer both helped to prevent dysentery in Britain.",
              },
              {
                q: 10,
                text: "Roy Porter disagrees with Professor Macfarlane's findings.",
              },
              {
                q: 11,
                text: "After 1740, there was a reduction in population in Britain.",
              },
              {
                q: 12,
                text: "People in Britain used to make beer at home.",
              },
              {
                q: 13,
                text: "The tax on malt indirectly caused a rise in the death rate.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-6 ml-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() => handleInputChange(q, opt)}
                        className="radio radio-primary"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  {renderText("Submit Answers")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText("Your Score: ")}
                    {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–13)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
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
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{userAnswers[num]}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
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
      <Reading2Pagination2015></Reading2Pagination2015>
    </div>
  );
};

export default Test2Reading2015;
