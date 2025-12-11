import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

const Test1Reading2017 = () => {
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
    "The cork oak has the thickest bark of any living tree.",
    "Scientists have developed a synthetic cork with the same cellular structure as natural cork.",
    "Individual cork oak trees must be left for 25 years between the first and second harvest.",
    "Cork bark should be stripped in dry atmospheric conditions.",
    "The only way to remove the bark from cork oak trees is by hand.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
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
    localStorage.setItem("/2017/Test 1/reading", newScore);
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
  1: "NOT GIVEN",
  2: "FALSE",
  3: "NOT GIVEN",
  4: "TRUE",
  5: "TRUE",
  6: "taste",
  7: "cheap",
  8: "convenient",
  9: "image",
  10: "natural",
  11: "recycled",
  12: "biodiversity",
  13: "desertification",
};


  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/reading");
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
    const savedScore = localStorage.getItem("/2017/Test 1/reading");
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
              {renderText("  which are based on Reading PASSAGE 1 bellow")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Cork")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Cork - the thick bark of the cork oak tree (Quercus suber) - is a remarkable material. It is tough, elastic, buoyant, and fire-resistant, and suitable for a wide range of purposes."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It has also been used for millennia: the ancient Egyptians sealed their sarcophagi (stone coffins) with cork, while the ancient Greeks and Romans used it for anything from beehives to sandals."
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
                "And the cork oak itself is an extraordinary tree. Its bark grows up to 20 cm in thickness, insulating the tree like a coat wrapped around the trunk and branches and keeping the inside at a constant 20°C all year round."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Developed most probably as a defence against forest fires, the bark of the cork oak has a particular cellular structure - with about 40 million cells per cubic centimetre - that technology has never succeeded in replicating."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                "The cells are filled with air, which is why cork is so buoyant. It also has an elasticity that means you can squash it and watch it spring back to its original size and shape when you release the pressure."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Cork oaks grow in a number of Mediterranean countries, including Portugal, Spain, Italy, Greece and Morocco. They flourish in warm, sunny climates where there is a minimum of 400 millimetres of rain per year, and not more than 800 millimetres."
              )}
              {renderText(
                "Like grape vines, the trees thrive in poor soil, putting down deep roots in search of moisture and nutrients."
              )}

              {renderText(
                "Southern Portugal's Alentejo region meets all of these requirements, which explains why, by the early 20th century, this region had become the world's largest producer of cork, and why today it accounts for roughly half of all cork production around the world."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Most cork forests are family-owned. Many of these family businesses, and indeed many of the trees themselves, are around 200 years old."
              )}
              {renderText(
                "Cork production is, above all, an exercise in patience. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "From the planting of a cork sapling to the first harvest takes 25 years, and a gap of approximately a decade must separate harvests from an individual tree"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              {renderText(
                "And for top-quality cork, it's necessary to wait a further 15 or 20 years. You even have to wait for the right kind of summer's day to harvest cork. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " If the bark is stripped on a day when it's too cold - or when the air is damp - the tree will be damaged."
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
              {renderText("Cork harvesting is a very specialised profession..")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " No mechanical means of stripping cork bark has been invented, so the job is done by teams of highly skilled workers."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}{" "}
              </span>
              {renderText(
                "First, they make vertical cuts down the bark using small sharp axes, then lever it away in pieces as large as they can manage. The most skilful cork-strippers prise away a semi-circular husk that runs the length of the trunk from just above ground level to the first branches."
              )}
              {renderText(
                "It is then dried on the ground for about four months, before being taken to factories, where it is boiled to kill any insects that might remain in the cork. Over 60% of cork then goes on to be made into traditional bottle stoppers, with most of the remainder being used in the construction trade."
              )}

              {renderText(
                "Corkboard and cork tiles are ideal for thermal and acoustic insulation, while granules of cork are used in the manufacture of concrete."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Recent years have seen the end of the virtual monopoly of cork as the material for bottle stoppers, due to concerns about the effect it may have on the contents of the bottle. This is caused by a chemical compound called 2,4,6-trichloroanisole (TCA), which forms through the interaction of plant phenols, chlorine and mould."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The tiniest concentrations - as little as three or four parts to a trillion - can spoil the taste of the product contained in the bottle."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The result has been a gradual yet steady move first towards plastic stoppers and, more recently, to aluminium screw caps."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " These substitutes are cheaper to manufacture and, in the case of screw caps, more convenient for the user."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7,8
                  </span>
                )}
              </span>
              {renderText(
                "The classic cork stopper does have several advantages, however."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Firstly, its traditional image is more in keeping with that of the type of high quality goods with which it has long been associated."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
                {renderText(
                  "Secondly - and very importantly - cork is a sustainable product that can be recycled without difficulty."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10,11
                  </span>
                )}{" "}
                {renderText(
                  " Moreover, cork forests are a resource which support local biodiversity, and prevent desertification in the regions where they are planted."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12,13
                  </span>
                )}
              </span>{" "}
              {renderText(
                " So, given the current concerns about environmental issues, the future of this ancient material once again looks promising"
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
            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 1-5")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 10-13 on your answer sheet, choose")}
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
                <span className="text-lg font-bold">
                  {renderText("NOT GIVEN")}
                </span>{" "}
                {renderText("if there is no information on this")}
              </h3>
            </div>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 1-5</h2>
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
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 6-13")}
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
                  "Write your answers in boxes 6-13 on your answer sheet."
                )}
              </h1>
              <br />
            </div>
            {/* box */}
            <div className="overflow-x-auto border p-5 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                {renderText(
                  "Comparison of aluminium screw caps and cork bottle stoppers"
                )}
              </h1>

              {/* ---------- Section 1 ---------- */}
              <ul className="list-disc list-inside space-y-3">
                <h1 className="text-lg font-bold">
                  {renderText("Advantages of aluminium screw caps")}
                </h1>
                <li className="text-lg">
                  {renderText("do not affect the")}
                  <button
                    onClick={() => toggleButton(6)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[6]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    6
                  </button>
                  <input
                    value={userAnswers[6] || ""}
                    onChange={(e) => handleInputChange(6, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("of the bottle contents")}
                </li>
                <li className="text-lg">
                  {renderText("are")}
                  <button
                    onClick={() => toggleButton(7)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[7]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    7
                  </button>
                  <input
                    value={userAnswers[7] || ""}
                    onChange={(e) => handleInputChange(7, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("to produce")}
                </li>
                <li className="text-lg">
                  {renderText("are")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("to use")}
                </li>
              </ul>

              {/* ---------- Section 2 ---------- */}
              <ul className="list-disc list-inside space-y-3">
                <h1 className="text-lg font-bold mt-3">
                  {renderText("Advantages of cork bottle stoppers")}
                </h1>
                <li className="text-lg">
                  {renderText("suit the")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("of quality products")}
                </li>
                <li className="text-lg">
                  {renderText("made from a")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("material")}
                </li>
                <li className="text-lg">
                  {renderText("easily")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                </li>
                <li className="text-lg">
                  {renderText("cork forests aid")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                </li>
                <li className="text-lg">
                  {renderText("cork forests stop")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("happening")}
                </li>
              </ul>
            </div>
          </div>

          <br />
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
      {/* <Reading2Pagination2018></Reading2Pagination2018> */}
    </div>
  );
};

export default Test1Reading2017;
