import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2011 from "../Pagination 2011/Reading4Pagination2011";

//  Marks show

const Reading4Part22011 = () => {
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
    "Disease-spreading pests respond more quickly to pesticides than agricultural pests do.",
    "A number of pests are now born with an innate immunity to some pesticides.",
    "Biological control entails using synthetic chemicals to try and change the genetic make-up of the pests' offspring.",
    "Bio-control is free from danger under certain circumstances.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
  const question2 = [
    "The use of pesticides has contributed to",
    "The Food and Agriculture Organisation has counted more than 300 agricultural pests which",
    "Cotton farmers in Central America began to use pesticides",
    "By the mid-1960s, cotton farmers in Central America found that pesticides",
  ];

  const options2 = [
    [
      "A. a change in the way ecologies are classified by agroecologists.",
      "B. an imbalance in many ecologies around the world.",
      "C. the prevention of ecological disasters in some parts of the world.",
      "D. an increase in the range of ecologies which can be usefully farmed.",
    ],
    [
      "A. are no longer responding to most pesticides in use.",
      "B. can be easily controlled through the use of pesticides.",
      "C. continue to spread disease in a wide range of crops.",
      "D. may be used as part of bio-control's replacement of pesticides.",
    ],
    [
      "A. because of an intensive government advertising campaign.",
      "B. in response to the appearance of new varieties of pest.",
      "C. as a result of changes in the seasons and the climate.",
      "D. to ensure more cotton was harvested from each crop.",
    ],
    [
      "A. were wiping out 50% of the pests plaguing the crops.",
      "B. were destroying 50% of the crops they were meant to protect.",
      "C. were causing a 50% increase in the number of new pests reported.",
      "D. were costing 50% of the total amount they spent on their crops.",
    ],
  ];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 18;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions2]; // ✅ use selectedOptions2
    updatedOptions[qIndex] = option;
    setSelectedOptions2(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 14;
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

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
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
  // Questions 14-17 (Multiple Choice)
  14: "B. an imbalance in many ecologies around the world.",
  15: "A. are no longer responding to most pesticides in use.",
  16: "D. to ensure more cotton was harvested from each crop.",
  17: "D. were costing 50% of the total amount they spent on their crops.",

  // Questions 18-21 (YES / NO / NOT GIVEN)
  18: "NOT GIVEN",
  19: "YES",
  20: "NO",
  21: "YES",

  // Questions 22-26 (Matching A-I)
  22: "D",
  23: "A",
  24: "C",
  25: "E",
  26: "B",
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
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 2")}</h1>
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
                {renderText("          Questions 14-26")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 2 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Biological Control of Pests")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "The continuous and reckless use of synthetic chemicals for the control of pests which pose a threat to agricultural crops and human health is proving to be counter-productive.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Apart from engendering widespread ecological disorders, pesticides have contributed to the emergence of a new breed of chemical-resistant, highly lethal superbugs.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 2 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "According to a recent study by the Food and Agriculture Organisation (FAO), more than 300 species of agricultural pests have developed resistance to a wide range of potent chemicals.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " Not to be left behind are the disease-spreading pests, about 100 species of which have become immune to a variety of insecticides now in use.",
              )}
            </p>

            <br />

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "One glaring disadvantage of pesticides' application is that, while destroying harmful pests, they also wipe out many useful non-targeted organisms, which keep the growth of the pest population in check.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This results in what agroecologists call the 'treadmill syndrome'. Because of their tremendous breeding potential and genetic diversity, many pests are known to withstand synthetic chemicals and bear offspring with a built-in resistance to pesticides.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "The havoc that the 'treadmill syndrome' can bring about is well illustrated by what happened to cotton farmers in Central America.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In the early 1940s, basking in the glory of chemical-based intensive agriculture, the farmers avidly took to pesticides as a sure measure to boost crop yield.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " The insecticide was applied eight times a year in the mid-1940s, rising to 28 in a season in the mid-1950s, following the sudden proliferation of three new varieties of chemical-resistant pests.",
              )}
            </p>

            <br />

            {/* Paragraph 5 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "By the mid-1960s, the situation took an alarming turn with the outbreak of four more new pests, necessitating pesticide spraying to such an extent that 50% of the financial outlay on cotton production was accounted for by pesticides.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              {renderText(
                " In the early 1970s, the spraying frequently reached 70 times a season as the farmers were pushed to the wall by the invasion of genetically stronger insect species.",
              )}
            </p>

            <br />

            {/* Paragraph 6 */}
            <p className="text-lg">
              {renderText(
                "Most of the pesticides in the market today remain inadequately tested for properties that cause cancer and mutations as well as for other adverse effects on health, says a study by United States environmental agencies.",
              )}
              {renderText(
                " The United States National Resource Defense Council has found that DDT was the most popular of a long list of dangerous chemicals in use.",
              )}
            </p>

            <br />

            {/* Paragraph 7 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In the face of the escalating perils from indiscriminate applications of pesticides, a more effective and ecologically sound strategy of biological control, involving the selective use of natural enemies of the pest population, is fast gaining popularity - though, as yet, it is a new field with limited potential.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                " The advantage of biological control in contrast to other methods is that it provides a relatively low-cost, perpetual control system with a minimum of detrimental side-effects. When handled by experts, bio-control is safe, non-polluting and self-dispersing.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "When handled by experts, bio-control is safe, non-polluting and self-dispersing.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 8 */}
            <p className="text-lg">
              {renderText(
                "The Commonwealth Institute of Biological Control (CIBC) in Bangalore, with its global network of research laboratories and field stations, is one of the most active, non-commercial research agencies engaged in pest control by setting natural predators against parasites. CIBC also serves as a clearing-house for the export and import of biological agents for pest control world-wide.",
              )}
            </p>

            <br />

            {/* Paragraph 9 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "CIBC successfully used a seed-feeding weevil, native to Mexico, to control the obnoxious parthenium weed.",
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " Similarly the Hyderabad-based Regional Research Laboratory (RRL), supported by CIBC, is now trying out an Argentinian weevil for the eradication of water hyacinth.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
              {renderText(
                `CIBC is also perfecting the technique for breeding parasites that prey on 'disapene scale' insects - notorious defoliants of fruit trees in the US and India.According to Mrs Kaiser Jamil of RRL,Argentinian weevil does not attack any other plant and a pair of adult bugs could destroy the weed in 4-5 days.`,
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  `"CIBC is also perfecting the technique for breeding parasites that prey on 'disapene scale' insects - notorious defoliants of fruit trees in the US and India.`,
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 10 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "In the late 1960s, when Sri Lanka's flourishing coconut groves were plagued by leaf-mining hispides, a larval parasite imported from Singapore brought the pest under control.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " A natural predator indigenous to India, Neodumetia sangawani, was found useful in controlling the Rhodes grass-scale insect that was devouring forage grass in many parts of the US.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                " By using Neochetina bruchi, a beetle native to Brazil, scientists at Kerala Agricultural University freed a 12-kilometre-long canal from the clutches of the weed Salvinia molesta, popularly called 'African Payal' in Kerala",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " About 30, 000 hectares of rice fields in Kerala are infested by this weed.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
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
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 14-17")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B ,C or D")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 14;

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg">
                      {answerKey}. {q}
                    </h3>

                    <ul className="flex flex-col gap-2 ml-4">
                      {options2[qIndex].map((option, oIndex) => {
                        const isSelected = selectedOptions2[qIndex] === option;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick2(qIndex, option)}
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
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 18-21")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 18-21 on your answer sheet, choose")}
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
              <h2 className="text-lg font-bold">Questions 18-21</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 18;
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
          </div>

          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 22-26")}
            </h1>

            <p>
              {renderText(
                "Complete each sentence with the correct ending, A-I, below.",
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-I, next to Questions 22-26.",
              )}
            </p>

            {/* ---------- List A-I ---------- */}
            <div className="flex items-center justify-center border border-black py-4 px-4 w-72 mx-auto">
              <div className="text-center">
                <ul className="space-y-1 text-lg">
                  <li>{renderText("A. forage grass.")}</li>
                  <li>{renderText("B. rice fields.")}</li>
                  <li>{renderText("C. coconut trees.")}</li>
                  <li>{renderText("D. fruit trees.")}</li>
                  <li>{renderText("E. water hyacinth.")}</li>
                  <li>{renderText("F. parthenium weed.")}</li>
                  <li>{renderText("G. Brazilian beetles.")}</li>
                  <li>{renderText("H. grass-scale insects.")}</li>
                  <li>{renderText("I. larval parasites.")}</li>
                </ul>
              </div>
            </div>

            {/* ---------- Sentence Completion ---------- */}
            <div className="border-2 border-black rounded-lg p-5 mt-5 space-y-4">
              {/* Question 22 */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">22.</span>
                {renderText("Disapene scale insects feed on")}
                <div className="relative w-40">
                  <select
                    value={userAnswers[22] || ""}
                    onChange={(e) => handleInputChange(22, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">22</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (letter) => (
                        <option key={letter} value={letter}>
                          {renderText(letter)}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* Question 23 */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">23.</span>
                {renderText("Neodumetia sangawani ate")}
                <div className="relative w-40">
                  <select
                    value={userAnswers[23] || ""}
                    onChange={(e) => handleInputChange(23, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">23</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (letter) => (
                        <option key={letter} value={letter}>
                          {renderText(letter)}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* Question 24 */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">24.</span>
                {renderText("Leaf-mining hispides blighted")}
                <div className="relative w-40">
                  <select
                    value={userAnswers[24] || ""}
                    onChange={(e) => handleInputChange(24, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">24</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (letter) => (
                        <option key={letter} value={letter}>
                          {renderText(letter)}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* Question 25 */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">25.</span>
                {renderText(
                  "An Argentinian weevil may be successful in wiping out",
                )}
                <div className="relative w-40">
                  <select
                    value={userAnswers[25] || ""}
                    onChange={(e) => handleInputChange(25, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">25</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (letter) => (
                        <option key={letter} value={letter}>
                          {renderText(letter)}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* Question 26 */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">26.</span>
                {renderText("Salvinia molesta plagues")}
                <div className="relative w-40">
                  <select
                    value={userAnswers[26] || ""}
                    onChange={(e) => handleInputChange(26, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">26</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (letter) => (
                        <option key={letter} value={letter}>
                          {renderText(letter)}
                        </option>
                      ),
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            </div>
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
                    All Answers (14-26)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
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
      <Reading4Pagination2011></Reading4Pagination2011>
    </div>
  );
};

export default Reading4Part22011;
