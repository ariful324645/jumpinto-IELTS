import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2023 from "../Pagination 2023/Reading2Pagination2023";

const Test2Reading2023 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
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
  const handleOptionClick = (id, option) => {
    // update selection highlight
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: option,
    }));

    // store in userAnswers for scoring
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: option };
      calculateScore(updated); // if you want live scoring
      return updated;
    });
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
    // Questions 1–8: Note completion (ONE OR TWO WORDS)
    1: "deer antlers", // tools made from deer antlers
    2: "timber posts", // may have been arranged in deep pits inside the circle
    3: "tree trunks", // builders used tree trunks to make sledges and rollers
    4: "oxen", // pulled them on giant baskets (hauled by oxen)
    5: "glaciers", // brought from Wales by glaciers (geological theory)
    6: "druids", // 17th century theory: builders were Celtic druids
    7: "burial ground", // purpose: used as a burial ground
    8: "calendar", // 1960s suggestion: worked as a kind of calendar

    // Questions 9–13: TRUE / FALSE / NOT GIVEN
    9: "TRUE", // Sandstone slabs placed in outer areas and trilithons in center
    10: "FALSE", // No scientific proof bluestones stayed until 1600 BCE
    11: "FALSE", // John Aubrey's claim was not supported by 20th-century findings
    12: "TRUE", // Evidence suggests multiple groups contributed
    13: "NOT GIVEN", // Criticism of Hawkins theory not specified as from other astronomers
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 2/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

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
              {renderText("Stonehenge")}
            </h1>

            <p className="text-lg">
              {renderText(
                "For centuries, historians and archaeologists have puzzled over the many mysteries of Stonehenge, a prehistoric monument that took an estimated 1,500 years to erect. Located on Salisbury Plain in southern England, it is comprised of roughly 100 massive upright stones placed in a circular layout."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Archaeologists believe England's most iconic prehistoric ruin was built in several stages, with the earliest constructed 5,000 or more years ago. First, Neolithic* Britons used primitive tools, which may have been fashioned out of deer antlers, to dig a massive circular ditch and bank, or henge."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Deep pits dating back to that era and located within the circle may have once held a ring of timber posts, according to some scholars."
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
                "Several hundred years later, it is thought, Stonehenge's builders hoisted an estimated 80 bluestones, 43 of which remain today, into standing positions and placed them in either a horseshoe or circular formation. These stones have been traced all the way to the Preseli Hills in Wales, some 300 kilometres from Stonehenge."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "How, then, did prehistoric builders without sophisticated tools or engineering haul these boulders, which weigh up to four tons, over such a great distance?"
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
                "According to one long-standing theory among archaeologists, Stonehenge's builders fashioned sledges and rollers out of tree trunks to lug the bluestones from the Preseli Hills. They then transferred the boulders onto rafts and floated them first along the Welsh coast and then up the River Avon toward Salisbury Plain; alternatively, they may have towed each stone with a fleet of vessels."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "More recent archaeological hypotheses have them transporting the bluestones with supersized wicker baskets on a combination of ball bearings and long grooved planks, hauled by oxen."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "As early as the 1970s, geologists have been adding their voices to the debate over how Stonehenge came into being. Challenging the classic image of industrious builders pushing, carting, rolling or hauling giant stones from faraway Wales, some scientists have suggested that it was glaciers, not humans, that carried the bluestones to Salisbury Plain."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Most archaeologists have remained sceptical about this theory, however, wondering how the forces of nature could possibly have delivered the exact number of stones needed to complete the circle."
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
                "The third phase of construction took place around 2000 BCE. At this point, sandstone slabs - known as 'sarsens' - were arranged into an outer crescent or ring; some were assembled into the iconic three-pieced structures called trilithons that stand tall in the centre of Stonehenge."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Some 50 of these stones are now visible on the site, which may once have contained many more. Radiocarbon dating has revealed that work continued at Stonehenge until roughly 1600 BCE, with the bluestones in particular being repositioned multiple times."
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
                "But who were the builders of Stonehenge? In the 17th century, archaeologist John Aubrey made the claim that Stonehenge was the work of druids, who had important religious, judicial and political roles in Celtic* society. This theory was widely popularized by the antiquarian William Stukeley, who had unearthed primitive graves at the site."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Even today, people who identify as modern druids continue to gather at Stonehenge for the summer solstice. However, in the mid-20th century, radiocarbon dating demonstrated that Stonehenge stood more than 1,000 years before the Celts inhabited the region."
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
                "Many modern historians and archaeologists now agree that several distinct tribes of people contributed to Stonehenge, each undertaking a different phase of its construction. Bones, tools and other artefacts found on the site seem to support this hypothesis."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The first stage was achieved by Neolithic agrarians who were likely to have been indigenous to the British Isles. Later, it is believed, groups with advanced tools and a more communal way of life left their mark on the site. Some believe that they were immigrants from the European continent, while others maintain that they were probably native Britons, descended from the original builders."
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
                "If the facts surrounding the architects and construction of Stonehenge remain shadowy at best, the purpose of the striking monument is even more of a mystery. While there is consensus among the majority of modern scholars that Stonehenge once served the function of burial ground, they have yet to determine what other purposes it had."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In the 1960s, the astronomer Gerald Hawkins suggested that the cluster of megalithic stones operated as a form of calendar, with different points corresponding to astrological phenomena such as solstices, equinoxes and eclipses occurring at different times of the year."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "While his theory has received a considerable amount of attention over the decades, critics maintain that Stonehenge's builders probably lacked the knowledge necessary to predict such events or that England's dense cloud cover would have obscured their view of the skies."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "More recently, signs of illness and injury in the human remains unearthed at Stonehenge led a group of British archaeologists to speculate that it was considered a place of healing, perhaps because bluestones were thought to have curative powers."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
            </p>

            <br />

            <p className="text-lg font-italic">
              Glossary
              <br />
              * Neolithic: The era, also known as the New Stone Age, which began
              around 12,000 years ago and ended around 3500 BCE
              <br />* Celtic: The Celts were people who lived in Britain and
              northwest Europe during the Iron Age from 600 BCE to 43 CE
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
            Complete the notes below.
            <br />
            Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for
            each answer.
            <br />
            Write your answers in boxes 1-8 on your answer sheet.
          </p>

          <div className="border p-5 mt-4">
            <h3 className="text-xl font-bold text-center mb-4">Stonehenge</h3>

            <ul className="list-disc list-inside space-y-4 text-lg">
              {/* 1 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Stage 1: the ditch and henge were dug, possibly using tools
                  made from
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  1
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(1, e.target.value)}
                />
              </li>

              {/* 2 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Stage 1: may have been arranged in deep pits inside the circle
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  2
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(2, e.target.value)}
                />
              </li>

              {/* 3 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Stage 2: bluestones from the Preseli Hills were placed in
                  standing position. Theories about transportation of the
                  bluestones (archaeological): builders used
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  3
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(3, e.target.value)}
                />
                <span>to make sledges and rollers</span>
              </li>

              {/* 4 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>Stage 2: pulled them on giant baskets</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  4
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(4, e.target.value)}
                />
              </li>

              {/* 5 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Stage 2: geological theory - they were brought from Wales by
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  5
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(5, e.target.value)}
                />
              </li>

              {/* 6 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Stage 3: Builders - a theory arose in the 17th century that
                  its builders were Celtic
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  6
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(6, e.target.value)}
                />
              </li>

              {/* 7 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>Purpose: many experts agree it has been used as a</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  7
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(7, e.target.value)}
                />
              </li>

              {/* 8 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Purpose: in the 1960s, it was suggested that it worked as a
                  kind of
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  8
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(8, e.target.value)}
                />
              </li>
            </ul>
          </div>

          {/* ================= Questions 9–13 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 9–13</h2>

          <p className="mt-4">
            Do the following statements agree with the information given in
            Reading Passage 1?
            <br />
            In boxes 9-13 on your answer sheet, choose:
          </p>

          <div className="mb-4 space-y-1 ml-3">
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
              "During the third phase of construction, sandstone slabs were placed in both the outer areas and the middle of the Stonehenge site.",
              "There is scientific proof that the bluestones stood in the same spot until approximately 1600 BCE.",
              "John Aubrey's claim about Stonehenge was supported by 20th-century findings.",
              "Objects discovered at Stonehenge seem to indicate that it was constructed by a number of different groups of people.",
              "Criticism of Gerald Hawkins' theory about Stonehenge has come mainly from other astronomers.",
            ].map((q, qIndex) => (
              <div key={qIndex + 9} className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div
                    onClick={() => handleNumberClick(qIndex + 9)}
                    className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer
              ${
                activeNumbers[qIndex + 9]
                  ? "bg-yellow-400 border-yellow-500"
                  : "border-gray-300"
              }`}
                  >
                    {qIndex + 9}
                  </div>
                  <p className="text-lg">{q}</p>
                </div>

                <div className="ml-12 space-y-2">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleOptionClick(qIndex + 9, option)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2
                  ${
                    selectedOptions[qIndex + 9] === option
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500"
                  }`}
                      />
                      <span
                        className={
                          selectedOptions[qIndex + 9] === option
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
      <Reading2Pagination2023></Reading2Pagination2023>
    </div>
  );
};

export default Test2Reading2023;
