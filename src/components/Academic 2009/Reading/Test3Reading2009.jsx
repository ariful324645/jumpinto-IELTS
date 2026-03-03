import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading3Pagination2009 from "../Pagination 2009/Reading3Pagination2009";

//  Marks show

const Test3Reading2009 = () => {
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
    "Ants use the same channels of communication as humans do.",
    "City life is one factor that encourages the development of intelligence.",
    "Ants can build large cities more quickly than humans do.",
    "Some ants can find their way by making calculations based on distance and position.",
    "In one experiment, foraging teams were able to use their sense of smell to find food.",
    "The essay, 'In the company of ants', explores ant communication.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 1;
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
    Array(questions.length).fill(null),
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
const correctAnswers = {
  // Questions 1–6 (YES / NO / NOT GIVEN)
  1: "NO",
  2: "NOT GIVEN",
  3: "NOT GIVEN",
  4: "YES",
  5: "NOT GIVEN",
  6: "NOT GIVEN",

  // Questions 7–13 (Summary Completion)
  7: "C",
  8: "M",
  9: "F",
  10: "D",
  11: "N",
  12: "O",
  13: "E",
};


  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
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
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 1")}</h1>
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
              {renderText("       You should spend about 20 minutes on")}

              <span className="text-lg font-bold">
                {renderText("          Questions 1-13")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 1 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Ant Intelligence")}
            </h1>

            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-96 h-96"
                src="https://i.ibb.co.com/BHgZ5JMv/a7t3r1.jpg"
                alt="Ant Intelligence"
              />
            </div>

            {/* Paragraph A */}
            <p className="text-lg">
              {renderText(
                "When we think of intelligent members of the animal kingdom, the creatures that spring immediately to mind are apes and monkeys. But in fact the social lives of some members of the insect kingdom are sufficiently complex to suggest more than a hint of intelligence. Among these, the world of the ant has come in for considerable scrutiny lately, and the idea that ants demonstrate sparks of cognition has certainly not been rejected by those involved in these investigations.",
              )}
            </p>

            <br />

            {/* Paragraph B */}
            <p className="text-lg">
              {renderText(
                "Ants store food, repel attackers and use chemical signals to contact one another in case of attack. Such chemical communication can be compared to the human use of visual and auditory channels to arouse and propagate moods and attitudes.",
              )}
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  ' The biologist Lewis Thomas wrote, "Ants are so much like human beings as to be an embarrassment..."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph C */}
            <p className="text-lg">
              {renderText(
                "However, in ants there is no cultural transmission - everything must be encoded in the genes - whereas in humans the opposite is true.",
              )}
            </p>

            <br />

            {/* Paragraph D */}
            <p className="text-lg">
              {renderText(
                "Or have they? The farming methods of ants are at least sustainable.",
              )}
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " They do not ruin environments or use enormous amounts of energy.",
                )}
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                      {renderText("11")}
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-1">
                      {renderText("12")}
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-1">
                      {renderText("13")}
                    </span>
                  </>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph E */}
            <p className="text-lg">
              {renderText(
                "Ants were farmers fifty million years before humans were. Ants can't digest the cellulose in leaves - but some fungi can.",
              )}
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " The ants therefore cultivate these fungi in their nests.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph F */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Farmer ants secrete antibiotics to control other fungi that might act as weeds, and spread waste to fertilise the crop.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("8,9")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph G */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "DNA analysis of the fungi suggests that the ants improve or modify the fungi by regularly swapping and sharing strains with neighbouring ant colonies.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("10")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph H */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Research conducted at Oxford, Sussex and Zürich Universities has shown that when desert ants return from a foraging trip, they navigate by integrating bearings and distances.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("5")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph I */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Ryabko and Reznikova have found evidence that ants can transmit very complex messages.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("4")}
                  </span>
                )}
              </span>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
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
                          "Are you sure you want to clear all answers?",
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
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-6")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 1-6 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
              {renderText(
                "if the statement contradicts the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">
                {renderText("NOT GIVEN")}
              </span>{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this",
              )}
            </h3>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 1-6</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 1;
                const correct = correctAnswers[answerKey];

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">
                      {answerKey}. {q}
                    </h3>
                    <ul className="flex flex-col gap-2 ml-4">
                      {options.map((option, oIndex) => {
                        const isSelected = selectedOptions[qIndex] === option;
                        const isCorrect = option === correct;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick(qIndex, option)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span
                              className={`w-5 h-5 rounded-full border-2 inline-block ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-700"
                              }`}
                            ></span>
                            <span
                              className={
                                isSelected ? "text-blue-500" : "text-black"
                              }
                            >
                              {option}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold mt-6">
                {renderText("Questions 7-13")}
              </h1>

              <p>
                {renderText(
                  "Complete the summary using the list of words or phrases below.",
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-O, in boxes 7-13 on your answer sheet.",
                )}
              </p>

              {/* Options List */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                {[
                  "A. aphids",
                  "B. agricultural",
                  "C. cellulose",
                  "D. exchanging",
                  "E. energy",
                  "F. fertilizers",
                  "G. food",
                  "H. fungi",
                  "I. growing",
                  "J. interbreeding",
                  "K. natural",
                  "L. other species",
                  "M. secretions",
                  "N. sustainable",
                  "O. environment",
                ].map((option, idx) => (
                  <p key={idx}>{renderText(option)}</p>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 mt-6">
                <h2 className="font-semibold">
                  {renderText("Ants as farmers")}
                </h2>

                <p>
                  {renderText(
                    "Ants have sophisticated methods of farming, including herding livestock and growing crops, which are in many ways similar to those used in human agriculture. The ants cultivate a large number of different species of edible fungi which convert",
                  )}{" "}
                  <select
                    value={userAnswers[7] || ""}
                    onChange={(e) => handleInputChange(7, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                  {renderText("into a form which they can digest.")}
                </p>

                <p>
                  {renderText("They use their own natural")}{" "}
                  <select
                    value={userAnswers[8] || ""}
                    onChange={(e) => handleInputChange(8, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>{" "}
                  {renderText(
                    "as weed-killers and also use unwanted materials as",
                  )}{" "}
                  <select
                    value={userAnswers[9] || ""}
                    onChange={(e) => handleInputChange(9, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                  .
                </p>

                <p>
                  {renderText(
                    "Genetic analysis shows they constantly upgrade these fungi by developing new species and by",
                  )}{" "}
                  <select
                    value={userAnswers[10] || ""}
                    onChange={(e) => handleInputChange(10, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>{" "}
                  {renderText("species with neighbouring ant colonies.")}
                </p>

                <p>
                  {renderText(
                    "In fact, the farming methods of ants could be said to be more advanced than human agribusiness, since they use",
                  )}{" "}
                  <select
                    value={userAnswers[11] || ""}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>{" "}
                  {renderText("methods, they do not affect the")}{" "}
                  <select
                    value={userAnswers[12] || ""}
                    onChange={(e) => handleInputChange(12, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>{" "}
                  {renderText("and do not waste")}{" "}
                  <select
                    value={userAnswers[13] || ""}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 15 }, (_, i) =>
                      String.fromCharCode(65 + i),
                    ).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                  .
                </p>
              </div>
            </div>
          </div>
          <br />
          {/* 2nd step */}

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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1-13)
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
   <Reading3Pagination2009></Reading3Pagination2009>
    </div>
  );
};

export default Test3Reading2009;
