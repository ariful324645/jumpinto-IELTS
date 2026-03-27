import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2023 from "../Pagination 2023/Reading2Pagination2023";

const Reading2Part32023 = () => {
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
  const handleOptionClick = (qNum, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [qNum]: option,
    }));

    setUserAnswers((prev) => {
      const updated = { ...prev, [qNum]: option }; // ✅ FIX
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
    localStorage.setItem("/2022/Test 1/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState({});

  const [activeNumbers, setActiveNumbers] = useState(Array(14).fill(false));

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
    // Questions 27–33 (TRUE/FALSE/NOT GIVEN)
    27: "NOT GIVEN", // No info on when Leonardo was first called a genius
    28: "TRUE", // Passage predicts more deaths from climate crisis than plague
    29: "TRUE", // Some modern challenges compared to earlier times
    30: "NOT GIVEN", // His ideal city wasn't actually constructed
    31: "FALSE", // Poor town planning contributes to pollution, not climate change
    32: "NOT GIVEN", // No info about local resistance in Renaissance times
    33: "FALSE", // Leonardo's notes were messy and detailed, not neat

    // Questions 34–40 (summary completion – ONE WORD)
    34: "space", // for trade and a less polluted environment
    35: "balconies", // features on the exterior of buildings
    36: "hydraulics", // expertise evident in artificial canals
    37: "principle", // the height of houses should relate to street width
    38: "ancient", // some cities from ancient times
    39: "Pienza", // example of a redesigned city in the 19th century
    40: "height", // building height no longer seems best
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part32023");
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
    const savedScore = localStorage.getItem("/reading2Part32023");
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
            <h1 className="text-xl font-bold">PASSAGE 3</h1>
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
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 27-40</span>
              which are based on Reading Passage 3 below.
            </h1>
          </div>

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("An ideal city")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Leonardo da Vinci's ideal city was centuries ahead of its time"
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "The word 'genius' is universally associated with the name of Leonardo da Vinci."
              )}
              {renderText(
                " A true Renaissance man, he embodied scientific spirit, artistic talent and humanist sensibilities."
              )}
              {renderText(
                " Five hundred years have passed since Leonardo died in his home at Château du Clos Lucé, outside Tours, France."
              )}
              {renderText(
                " Yet far from fading into insignificance, his thinking has carried down the centuries and still surprises today."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "The Renaissance marked the transition from the 15th century to modernity and took place after the spread of the plague in the 14th century, which caused a global crisis resulting in some 200 million deaths across Europe and Asia."
              )}
              {renderText(
                " Today, the world is on the cusp of a climate crisis, which is predicted to cause widespread displacement, extinctions and death, if left unaddressed."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Then, as now, radical solutions were called for to revolutionise the way people lived and safeguard humanity against catastrophe."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "Around 1486 - after a pestilence that killed half the population in Milan, Italy - Leonardo turned his thoughts to urban planning problems."
              )}
              {renderText(
                " Following a typical Renaissance trend, he began to work on an 'ideal city' project, which - due to its excessive costs - would remain unfulfilled."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Yet given that unsustainable urban models are a key cause of global climate change today, it's only natural to wonder how Leonardo might have changed the shape of modern cities."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("31")}
                </span>
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "Although the Renaissance is renowned as an era of incredible progress in art and architecture, it is rarely noted that the 15th century also marked the birth of urbanism as a true academic discipline."
              )}
              {renderText(
                " The rigour and method behind the conscious conception of a city had been largely missing in Western thought until the moment when prominent Renaissance men pushed forward large-scale urban projects in Italy."
              )}
              {renderText(
                " These works surely inspired Leonardo's decision to rethink the design of medieval cities, with their winding and overcrowded streets and with houses piled against one another."
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "It is not easy to identify a coordinated vision of Leonardo's ideal city because of his disordered way of working with notes and sketches."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But from the largest collection of Leonardo's papers ever assembled, a series of innovative thoughts can be reconstructed regarding the foundation of a new city along the Ticino River."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
              {renderText(
                " He designed the city for the easy transport of goods and clean urban spaces, and he wanted a comfortable and spacious city, with well-ordered streets and architecture."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "He recommended 'high, strong walls', with 'towers and battlements of all necessary and pleasant beauty'."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "His plans for a modern and 'rational' city were consistent with Renaissance ideals."
              )}
              {renderText(
                " But, in keeping with his personality, Leonardo included several innovations in his urban design."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Leonardo wanted the city to be built on several levels, linked with vertical outdoor staircases."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
              {renderText(
                " Indeed, this idea of taking full advantage of the interior spaces wasn't implemented until the 1920s and 1930s."
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "While in the upper layers of the city, people could walk undisturbed between elegant palaces and streets, the lower layer was the place for services, trade, transport and industry."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But the true originality of Leonardo's vision was its fusion of architecture and engineering."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
              {renderText(
                " Leonardo designed extensive hydraulic plants to create artificial canals throughout the city."
              )}
              {renderText(
                " Leonardo also thought that the width of the streets ought to match the average height of the adjacent houses."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This rule is still followed in many contemporary cities across Italy."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>
            </p>

            {/* Final Section */}
            <p className="text-lg mt-5">
              {renderText(
                "Although some of these features existed in Roman cities, before Leonardo's drawings there had never been a multi-level, compact modern city which was thoroughly technically conceived."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Indeed, it wasn't until the 19th century that some of his ideas were applied."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This can be seen in Haussmann's renovation of Paris under Emperor Napoleon III."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Today, Leonardo's ideas suggest a way forward for modern, sustainable urban planning."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 27–33 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–33")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 3?"
            )}
            <br />
            {renderText("In boxes 27–33 on your answer sheet, choose ")}
            <strong>{renderText("TRUE")}</strong>,{" "}
            <strong>{renderText("FALSE")}</strong> {renderText("or ")}
            <strong>{renderText("NOT GIVEN")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 27,
                text: "People first referred to Leonardo da Vinci as a genius 500 years ago.",
              },
              {
                num: 28,
                text: "The current climate crisis is predicted to cause more deaths than the plague.",
              },
              {
                num: 29,
                text: "Some of the challenges we face today can be compared to those of earlier times.",
              },
              {
                num: 30,
                text: "Leonardo da Vinci's ideal city was constructed in the 15th century.",
              },
              {
                num: 31,
                text: "Poor town planning is a major contributor to climate change.",
              },
              {
                num: 32,
                text: "In Renaissance times, local people fought against the changes to Pienza and Ferrara.",
              },
              {
                num: 33,
                text: "Leonardo da Vinci kept a neat, organised record of his designs.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt}
                        checked={userAnswers[num] === opt}
                        onChange={() => handleInputChange(num, opt)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 34–40 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 34–40")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the summary below.")}
            <br />
            {renderText("Choose ")}
            <strong>{renderText("ONE WORD ONLY")}</strong>{" "}
            {renderText("from the passage for each answer.")}
          </p>

          <div className="space-y-5 text-lg border p-4">
            <div>
              <h1 className="text-2xl font-bold mb-6 text-center">
                {renderText("Leonardo da Vinci's ideal city")}
              </h1>

              <div className="space-y-4 text-lg">
                <p>
                  {renderText(
                    "A collection of Leonardo da Vinci's paperwork reveals his design of a new city beside the Ticino River. This was to provide better"
                  )}
                  <span className="inline-flex items-center mx-1">
                    <button
                      onClick={() => toggleButton(34)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[34]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      34
                    </button>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[34] || ""}
                      onChange={(e) => handleInputChange(34, e.target.value)}
                    />
                  </span>
                  {renderText(
                    "for trade and a less polluted environment. Although Leonardo da Vinci's city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as"
                  )}
                  <span className="inline-flex items-center mx-1">
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
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[35] || ""}
                      onChange={(e) => handleInputChange(35, e.target.value)}
                    />
                  </span>
                  {renderText("on the exterior of a building.")}
                </p>

                <p>
                  {renderText(
                    "Leonardo da Vinci wasn't only an architect. His expertise in"
                  )}
                  <span className="inline-flex items-center mx-1">
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
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[36] || ""}
                      onChange={(e) => handleInputChange(36, e.target.value)}
                    />
                  </span>
                  {renderText(
                    "was evident in his plans for artificial canals within his ideal city. He also believed that the height of houses should relate to the width of streets in case earthquakes occurred. The design of many cities in Italy today follows this"
                  )}
                  <span className="inline-flex items-center mx-1">
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
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[37] || ""}
                      onChange={(e) => handleInputChange(37, e.target.value)}
                    />
                  </span>
                  {renderText(".")}
                </p>

                <p>
                  {renderText("While some cities from")}
                  <span className="inline-flex items-center mx-1">
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
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[38] || ""}
                      onChange={(e) => handleInputChange(38, e.target.value)}
                    />
                  </span>
                  {renderText(
                    "times have aspects that can also be found in Leonardo's designs, his ideas weren't put into practice until long after his death."
                  )}
                  <span className="inline-flex items-center mx-1">
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
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[39] || ""}
                      onChange={(e) => handleInputChange(39, e.target.value)}
                    />
                  </span>
                  {renderText(
                    "is one example of a city that was redesigned in the 19th century in the way that Leonardo had envisaged. His ideas are also relevant to today's world, where building"
                  )}
                  <span className="inline-flex items-center mx-1">
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
                      type="text"
                      className="border rounded px-2 py-1 w-32 text-center"
                      value={userAnswers[40] || ""}
                      onChange={(e) => handleInputChange(40, e.target.value)}
                    />
                  </span>
                  {renderText("no longer seems to be the best approach.")}
                </p>
              </div>
            </div>
          </div>

          {/* ================= Submit / Result ================= */}
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
                    {renderText("Your Score:")} {score}/
                    {Object.keys(correctAnswers).length}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers")}
                  </h3>
                  <ul className="space-y-3">
                    {Object.keys(correctAnswers).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();
                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
                            ) : (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}
                            <p className="font-bold">
                              {renderText(`Q${num}:`)}
                            </p>
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
                              userAnswer
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            {correctAnswers[num]}
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

export default Reading2Part32023;
