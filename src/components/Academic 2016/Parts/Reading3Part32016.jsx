import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading3Pagination2016 from "../Pagination2016/Reading3Pagination2016";

const Reading3Part32016 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
  const questions = [
    "Which problem affects farmers with small farms in developing countries? ",
    "Which problem affects farmers with small farms in developing countries? ",
  ];

  const options = [
    [
      "A. Lack of demand for locally produced food",
      "B. The effects of changing weather patterns", // correct
      "C. Having to sell their goods to intermediary buyers",
    ],

    [
      "A. Lack of irrigation programmes",
      "B. Being unable to get insurance",
      "C. Having to sell their goods to intermediary buyers", // correct
    ],
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

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

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 25;
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
  // marks show
const correctAnswers = {
  // Questions 27–34 (Paragraph Headings)
  27: "D", // a reference to books that assume a lack of mathematical knowledge
  28: "B", // the way in which this is not a typical book about mathematics
  29: "G", // personal examples of being helped by mathematics
  30: "C", // examples of people who each had abilities that seemed incompatible
  31: "B", // mention of different focuses of books about mathematics
  32: "E", // a contrast between reading this book and reading other kinds of publication
  33: "A", // a claim that the whole of the book is accessible to everybody
  34: "F", // a reference to different categories of intended readers of this book

  // Questions 35–40 (Note Completion)
  35: "beginner",
  36: "arithmetic",
  37: "intuitive",
  38: "scientists",
  39: "experiments",
  40: "theorems",
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
    localStorage.setItem("/reading1Part32020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/reading1Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part32020");
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
          {/* Header */}

          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 3")}</h1>
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

          {/* Highlight modal */}
          {isModalOpen && (
            <div
              style={{ top: modalPosition.top + 5, left: modalPosition.left }}
              className="absolute bg-white p-3 rounded-lg shadow-lg flex gap-3 z-50"
            >
              <button
                onClick={handleHighlight}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                {renderText("Highlight")}
              </button>
              <button
                onClick={handleClearHighlight}
                className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition"
              >
                {renderText("Clear Highlight")}
              </button>
            </div>
          )}
          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 27-40")}
              </span>
              {renderText(", which are based on Reading Passage 3 below.")}
            </h1>
          </div>
          {/* left text */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "Preface to 'How the other half thinks: Adventures in mathematical reasoning'"
              )}
            </h1>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("A")}</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Occasionally, in some difficult musical compositions, there are beautiful, but easy parts - parts so simple a beginner could play them."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
              {renderText(
                " So it is with mathematics as well. There are some discoveries in advanced mathematics that do not depend on specialized knowledge, not even on algebra, geometry, or trigonometry.  ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Instead they may involve, at most, a little arithmetic, such as 'the sum of two odd numbers is even', and common sense."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "   Each of the eight chapters in this book illustrates this phenomenon. "
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Anyone can understand every step in the reasoning."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>{" "}
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("B")}</h1>
              {renderText(
                "One of my purposes in writing this book is to give readers who haven't had the opportunity to see and enjoy real mathematics the chance to appreciate the mathematical way of thinking. I want to reveal not only some of the fascinating discoveries, but, more importantly, the reasoning behind them."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In that respect, this book differs from most books on mathematics written for the general public. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
                {renderText(
                  "Some present the lives of colorful mathematicians. Others describe important applications of mathematics. Yet others go into mathematical procedures, but assume that the reader is adept in using algebra.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("C")}</h1>
              {renderText(
                "I hope this book will help bridge that notorious gap that separates the two cultures: the humanities and the sciences, or should I say the right brain (intuitive) and the left brain (analytical, numerical). "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " As the chapters will illustrate, mathematics is not restricted to the analytical and numerical; intuition plays a significant role."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
                {renderText(
                  "I hope this book will help bridge that notorious gap that separates the two cultures: the humanities and the sciences, or should I say the right brain (intuitive) and the left brain (analytical, numerical). "
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " To illustrate our human potential, I cite a structural engineer who is an artist, an electrical engineer who is an opera singer, an opera singer who published mathematical research, and a mathematician who publishes short stories."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("D")}</h1>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Other scientists have written books to explain their fields to non-scientists, but have necessarily had to omit the mathematics, although it provides the foundation of their theories."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27,38")}
                  </span>
                )}
              </span>
              {renderText(
                " The reader must remain a tantalized spectator rather than an involved participant, since the appropriate language for describing the details in much of science is mathematics, whether the subject is expanding universe, subatomic particles, or chromosomes. Though the broad outline of a scientific theory can be sketched intuitively, when a part of the physical universe is finally understood, its description often looks like a page in a mathematics text."
              )}
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("E")}</h1>
              {renderText(
                "Still, the non-mathematical reader can go far in understanding mathematical reasoning. This book presents the details that illustrate the mathematical style of thinking, which involves sustained, step-by-step analysis, experiments, and insights. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "You will turn these pages much more slowly than when reading a novel or a newspaper. "
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
                {renderText(
                  " It may help to have a pencil and paper ready to check claims and carry out experiments."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("F")}</h1>{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As I wrote, I kept in mind two types of readers: those who enjoyed mathematics until they were turned off by an unpleasant episode, usually around fifth grade, and mathematics aficionados, who will find much that is new throughout the book."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>
              {renderText(
                "This book also serves readers who simply want to sharpen their analytical skills. Many careers, such as law and medicine, require extended, precise analysis. Each chapter offers practice in following a sustained and closely argued line of thought. That mathematics can develop this skill is shown by these two testimonials:"
              )}
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("G")}</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  `"A physician wrote, "The discipline of analytical thought processes [in mathematics] prepared me extremely well for medical school."`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
              {renderText(
                ' In medicine one is faced with a problem which must be thoroughly analyzed before a solution can be found. The process is similar to doing mathematics."'
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  `"A lawyer made the same point, "Although I had no background in law - not even one political science course - I did well at one of the best law schools."`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
                {renderText(
                  `"I attribute much of my success there to having learned, through the study of mathematics, and, in particular, theorems, how to analyze complicated principles."`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
              {renderText(
                '  Lawyers who have studied mathematics can master the legal principles in a way that most others cannot."'
              )}
              {renderText(
                "I hope you will share my delight in watching as simple, even naive, questions lead to remarkable solutions and purely theoretical discoveries find unanticipated applications."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
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
                Clear answer
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to clear all answers?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        No, keep them
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Yes, clear them
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* select  */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold mt-6">
              {renderText("Questions 27-34")}
            </h1>

            <p>{renderText("Reading Passage 3 has seven paragraphs, A-G.")}</p>
            <p>
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below."
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct number, i-ix, in boxes 27-34 on your answer sheet."
              )}
            </p>
          </div>

          <div className="space-y-4 mt-4">
            {/* Question 27 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("27")}</span>
              <span>
                {renderText(
                  "a reference to books that assume a lack of mathematical knowledge"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("27")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 28 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("28")}</span>
              <span>
                {renderText(
                  "the way in which this is not a typical book about mathematics"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("28")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 29 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("29")}</span>
              <span>
                {renderText("personal examples of being helped by mathematics")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("29")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 30 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("30")}</span>
              <span>
                {renderText(
                  "examples of people who each had abilities that seemed incompatible"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("30")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 31 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("31")}</span>
              <span>
                {renderText(
                  "mention of different focuses of books about mathematics"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("31")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 32 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("32")}</span>
              <span>
                {renderText(
                  "a contrast between reading this book and reading other kinds of publication"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[32] || ""}
                  onChange={(e) => handleInputChange(32, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("32")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 33 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("33")}</span>
              <span>
                {renderText(
                  "a claim that the whole of the book is accessible to everybody"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[33] || ""}
                  onChange={(e) => handleInputChange(33, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("33")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>

            {/* Question 34 */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("34")}</span>
              <span>
                {renderText(
                  "a reference to different categories of intended readers of this book"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[34] || ""}
                  onChange={(e) => handleInputChange(34, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                >
                  <option value="">{renderText("34")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </p>
          </div>

          {/* box */}

          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 35-40")}
            </h2>

            <h3 className="text-lg  mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("ONE WORD AND/OR A NUMBER")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 35-40 on your answer sheet."
              )}
            </h1>
            <br />
          </div>
          {/* box */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <ul className="list-disc list-inside space-y-3">
              {/* Question 35 */}
              <li className="text-lg">
                {renderText(
                  "Some areas of both music and mathematics are suitable for someone who is a"
                )}
                <button
                  onClick={() => toggleButton(35)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-24"
                  type="text"
                />
                .
              </li>

              {/* Question 36 */}
              <li className="text-lg">
                {renderText(
                  "It is sometimes possible to understand advanced mathematics using no more than a limited knowledge of"
                )}
                <button
                  onClick={() => toggleButton(36)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-24"
                  type="text"
                />
                .
              </li>

              {/* Question 37 */}
              <li className="text-lg">
                {renderText(
                  "The writer intends to show that mathematics requires"
                )}
                <button
                  onClick={() => toggleButton(37)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-24"
                  type="text"
                />
                {renderText("thinking, as well as analytical skills.")}
              </li>

              {/* Question 38 */}
              <li className="text-lg">
                {renderText("Some books written by")}
                <button
                  onClick={() => toggleButton(38)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-24"
                  type="text"
                />
                {renderText(
                  "have had to leave out the mathematics that is central to their theories."
                )}
              </li>

              {/* Question 39 */}
              <li className="text-lg">
                {renderText(
                  "The writer advises non-mathematical readers to perform"
                )}
                <button
                  onClick={() => toggleButton(39)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-24"
                  type="text"
                />
                {renderText("while reading the book.")}
              </li>

              {/* Question 40 */}
              <li className="text-lg">
                {renderText("A lawyer found that studying")}
                <button
                  onClick={() => toggleButton(40)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-24"
                  type="text"
                />
                {renderText(
                  "helped even more than other areas of mathematics in the study of law."
                )}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27-40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
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
      <Reading3Pagination2016></Reading3Pagination2016>
    </div>
  );
};

export default Reading3Part32016;
