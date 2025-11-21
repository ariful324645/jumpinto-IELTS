import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

//  Marks show

const Test1Reading2020 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const questions = [
    "In the Middle Ages, most Europeans knew where nutmeg was grown.",
    "The VOC was the world's first major trading company.",
    "Following the Treaty of Breda, the Dutch had control of all the islands where nutmeg grew.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 5;
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
    localStorage.setItem("/2020/Test 1/reading", newScore);
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
    1: "oval",
    2: "husk",
    3: "seed",
    4: "mace",
    5: "FALSE",
    6: "TRUE",
    7: "TRUE",
    8: "Arabs",
    9: "plague",
    10: "lime",
    11: "Run",
    12: "nutmeg plants",
    13: "gloves",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 1/reading");
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
    const savedScore = localStorage.getItem("/2020/Test 1/reading");
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
              {renderText("Nutmeg - a valuable spice")}
            </h1>

            <p className="text-lg">
              {renderText(
                "The nutmeg tree, Myristica fragrans, is a large evergreen tree native to Southeast Asia. Until the late 18th century, it only grew in one place in the world: a small group of islands in the Banda Sea, part of the Moluccas - or Spice Islands - in northeastern Indonesia."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The tree is thickly branched with dense foliage of tough, dark green oval leaves, and produces small, yellow, bell-shaped flowers and pale yellow pear-shaped fruits."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
                {renderText(" The fruit is encased in a fleshy husk.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                " When the fruit is ripe, this husk splits into two halves along a ridge running the length of the fruit. Inside is a purple-brown shiny seed, 2-3 cm long by about 2 cm across, surrounded by a lacy red or crimson covering called an 'aril'."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These are the sources of the two spices nutmeg and mace, the former being produced from the dried seed and the latter from the aril."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3,4
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Nutmeg was a highly prized and costly ingredient in European cuisine in the Middle Ages, and was used as a flavouring, medicinal, and preservative agent."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Throughout this period, the Arabs were the exclusive importers of the spice to Europe."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They sold nutmeg for high prices to merchants based in Venice, but they never revealed the exact location of the source of this extremely valuable commodity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              {renderText(
                " The Arab-Venetian dominance of the trade finally ended in 1512, when the Portuguese reached the Banda Islands and began exploiting its precious resources."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Always in danger of competition from neighbouring Spain, the Portuguese began subcontracting their spice distribution to Dutch traders. Profits began to flow into the Netherlands, and the Dutch commercial fleet swiftly grew into one of the largest in the world. The Dutch quietly gained control of most of the shipping and trading of spices in Northern Europe. Then, in 1580, Portugal fell under Spanish rule, and by the end of the 16th century the Dutch found themselves locked out of the market. As prices for pepper, nutmeg, and other spices soared across Europe, they decided to fight back."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In 1602, Dutch merchants founded the VOC, a trading corporation better known as the Dutch East India Company. By 1617, the VOC was the richest commercial operation in the world. The company had 50,000 employees worldwide, with a private army of 30,000 men and a fleet of 200 ships."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "At the same time, thousands of people across Europe were dying of the plague, a highly contagious and deadly disease."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              {renderText(
                " Doctors were desperate for a way to stop the spread of this disease, and they decided nutmeg held the cure. Everybody wanted nutmeg, and many were willing to spare no expense to have it. Nutmeg bought for a few pennies in Indonesia could be sold for 68,000 times its original cost on the streets of London. The only problem was the short supply. And that's where the Dutch found their opportunity."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The Banda Islands were ruled by local sultans who insisted on maintaining a neutral trading policy towards foreign powers. This allowed them to avoid the presence of Portuguese or Spanish troops on their soil, but it also left them unprotected from other invaders. In 1621, the Dutch arrived and took over. Once securely in control of the Bandas, the Dutch went to work protecting their new investment. They concentrated all nutmeg production into a few easily guarded areas, uprooting and destroying any trees outside the plantation zones. Anyone caught growing a nutmeg seedling or carrying seeds without the proper authority was severely punished."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In addition, all exported nutmeg was covered with lime to make sure there was no chance a fertile seed which could be grown elsewhere would leave the islands."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              {renderText(" There was only one obstacle to Dutch domination.")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One of the Banda Islands, a sliver of land called Run, only 3 km long by less than 1 km wide, was under the control of the British."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
              {renderText(
                " After decades of fighting for control of this tiny island, the Dutch and British arrived at a compromise settlement, the Treaty of Breda, in 1667. Intent on securing their hold over every nutmeg-producing island, the Dutch offered a trade: if the British would give them the island of Run, they would in turn give Britain a distant and much less valuable island in North America. The British agreed. That other island was Manhattan, which is how New Amsterdam became New York."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The Dutch now had a monopoly over the nutmeg trade which would last for another century."
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
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Then, in 1770, a Frenchman named Pierre Poivre successfully smuggled nutmeg plants to safety in Mauritius, an island off the coast of Africa."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Some of these were later exported to the Caribbean where they thrived, especially on the island of Grenada."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Next, in 1778, a volcanic eruption in the Banda region caused a tsunami that wiped out half the nutmeg groves."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Finally, in 1809, the British returned to Indonesia and seized the Banda Islands by force. They returned the islands to the Dutch in 1817, but not before transplanting hundreds of nutmeg seedlings to plantations in several locations across southern Asia. The Dutch nutmeg monopoly was over."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Today, nutmeg is grown in Indonesia, the Caribbean, India, Malaysia, Papua New Guinea, and Sri Lanka, and world nutmeg production is estimated to average between 10,000 and 12,000 tonnes per year."
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
                          "Are you sure you want to clear all answers?"
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

            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-4")}
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
                "Write your answers in boxes 1-4 on your answer sheet."
              )}
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("The nutmeg tree and fruit")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("the leaves of the tree are")}</span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("in shape.")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("the")}</span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  value={userAnswers[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  {renderText(
                    "surrounds the fruit and breaks open when the fruit is ripe."
                  )}
                </span>
              </li>
              <li className="text-lg">
                <span>{renderText("the")}</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  value={userAnswers[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  {renderText("is used to produce the spice nutmeg.")}
                </span>
              </li>
              <li className="text-lg">
                <span>
                  {renderText(
                    "the covering known as the aril is used to produce"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
              <li className="text-lg">
                {renderText("the tree has yellow flowers and fruit")}
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 5-7")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 5-7 on your answer sheet, choose")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
            {renderText("if the statement agrees with the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
            {renderText("if the statement contradicts the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("NOT GIVEN")}</span>{" "}
            {renderText("if there is no information on this")}
          </h3>
          <br /> <br />
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">Questions 5-7</h2>
            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 5;
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
          {/* table */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 8-13")}
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
              "Write your answers in boxes 8-13 on your answer sheet."
            )}
          </h1>
          <br />
          <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
            <tbody>
              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Middle Ages")}
                </td>
                <td className="border text-lg p-2">
                  <span>
                    {renderText("Nutmeg was brought to Europe by the")}
                  </span>
                  <button
                    onClick={() => toggleButton(8)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[8]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    8
                  </button>
                  <input
                    value={userAnswers[8] || ""}
                    onChange={(e) => handleInputChange(8, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  <span>{renderText(".")}</span>
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("16th century")}
                </td>
                <td className="border text-lg p-2">
                  {renderText(
                    "European nations took control of the nutmeg trade"
                  )}
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("17th century")}
                </td>
                <td className="border text-lg p-2 text-left">
                  <ul className="list-disc list-inside space-y-3">
                    <li className="text-lg">
                      <span>
                        {renderText(
                          "Demand for nutmeg grew, as it was believed to be effective against the disease known as the"
                        )}
                      </span>
                      <button
                        onClick={() => toggleButton(9)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                          activeButtons[9]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        9
                      </button>
                      <input
                        value={userAnswers[9] || ""}
                        onChange={(e) => handleInputChange(9, e.target.value)}
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>{renderText(".")}</span>
                    </li>

                    <li className="text-lg">
                      <span>{renderText("put")}</span>
                      <button
                        onClick={() => toggleButton(10)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                          activeButtons[10]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        10
                      </button>
                      <input
                        value={userAnswers[10] || ""}
                        onChange={(e) => handleInputChange(10, e.target.value)}
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>
                        {renderText(
                          "on nutmeg to avoid it being cultivated outside the islands."
                        )}
                      </span>
                    </li>

                    <li>
                      <span>
                        {renderText("finally obtained the island of")}
                      </span>
                      <button
                        onClick={() => toggleButton(11)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                          activeButtons[11]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        11
                      </button>
                      <input
                        value={userAnswers[11] || ""}
                        onChange={(e) => handleInputChange(11, e.target.value)}
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>{renderText("from the British.")}</span>
                    </li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Late 18th century")}
                </td>
                <td className="border text-lg p-2 text-left">
                  <p>
                    {renderText(
                      "Clean the serving area, including the weighing scales."
                    )}
                  </p>
                  <p className="mt-2">
                    <span>{renderText("Collect")}</span>
                    <button
                      onClick={() => toggleButton(12)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[12]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      12
                    </button>
                    <input
                      value={userAnswers[12] || ""}
                      onChange={(e) => handleInputChange(12, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>
                      {renderText("for the fish from the cold-room.")}
                    </span>
                  </p>
                  <p className="mt-2">
                    <span>{renderText("Must wear special")}</span>
                    <button
                      onClick={() => toggleButton(13)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[13]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      13
                    </button>
                    <input
                      value={userAnswers[13] || ""}
                      onChange={(e) => handleInputChange(13, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>{renderText(".")}</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-8 border-t pt-6 text-center text-lg font-semibold">
            {!showResult ? (
              <button
                onClick={() => setShowResult(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Submit Answers
              </button>
            ) : (
              <>
                {/* <p className="text-green-600 mb-2">✅ Marks: {score}/10</p> */}

                {/* Buttons to toggle right/wrong answers */}
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => setShowRight((prev) => !prev)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    {showRight ? "Hide Right Answers" : "Show Right Answers"}
                  </button>
                  <button
                    onClick={() => setShowWrong((prev) => !prev)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    {showWrong ? "Hide Wrong Answers" : "Show Wrong Answers"}
                  </button>
                </div>

                {/* Right Answers List */}
                {showRight && (
                  <div className="mt-4 text-left bg-green-50 border border-green-300 rounded-lg p-4">
                    <h3 className="font-bold text-green-700 mb-2">
                      Correct Answers:
                    </h3>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      {Object.keys(userAnswers)
                        .filter(
                          (key) =>
                            userAnswers[key]?.trim().toLowerCase() ===
                            correctAnswers[key]?.trim().toLowerCase()
                        )
                        .map((key) => (
                          <li key={key}>
                            <span className="font-semibold">Q{key}:</span>{" "}
                            {correctAnswers[key]}
                          </li>
                        ))}
                      {Object.keys(userAnswers).filter(
                        (key) =>
                          userAnswers[key]?.trim().toLowerCase() ===
                          correctAnswers[key]?.trim().toLowerCase()
                      ).length === 0 && (
                        <p className="text-green-600">
                          No correct answers yet.
                        </p>
                      )}
                    </ul>
                  </div>
                )}

                {/* Wrong Answers List */}
                {showWrong && (
                  <div className="mt-4 text-left bg-red-50 border border-red-300 rounded-lg p-4">
                    <h3 className="font-bold text-red-700 mb-2">
                      ❌ Wrong Answers:
                    </h3>
                    <ul className="list-disc list-inside text-red-700 space-y-1">
                      {Object.keys(userAnswers)
                        .filter(
                          (key) =>
                            correctAnswers[key] &&
                            userAnswers[key]?.trim().toLowerCase() !==
                              correctAnswers[key]?.trim().toLowerCase()
                        )
                        .map((key) => (
                          <li key={key}>
                            <span className="font-semibold">Q{key}:</span> Your
                            answer:{" "}
                            <span className="italic">
                              {userAnswers[key] || "—"}
                            </span>{" "}
                            → Correct:{" "}
                            <span className="font-semibold">
                              {correctAnswers[key]}
                            </span>
                          </li>
                        ))}
                      {Object.keys(userAnswers).filter(
                        (key) =>
                          correctAnswers[key] &&
                          userAnswers[key]?.trim().toLowerCase() !==
                            correctAnswers[key]?.trim().toLowerCase()
                      ).length === 0 && (
                        <p className="text-red-600">No wrong answers </p>
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Reading2020;
