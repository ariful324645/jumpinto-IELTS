import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading4Pagination2018 from "../Pagination2018/Reading4Pagination2018";

const Readign4Part22018 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

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
  // marks show
const correctAnswers = {
  // Questions 14-17 (summary – no more than two words)
  14: "bacteria", // Healthy soil contains bacteria
  15: "carbon content", // Function in storing carbon content
  16: "water", // Prevents damage because it holds water
  17: "agriculture", // Main factor contributing to soil degradation

  // Questions 18-21 (A-F)
  18: "C", // Nutrients contained in unused parts may not be put back into the soil
  19: "E", // Synthetic fertilisers may cause damage to different aspects
  20: "A", // Addition of mixture by Pius Floris may improve plants
  21: "D", // Zero net soil degradation may help governments

  // Questions 22-26 (paragraphs A-G)
  22: "E", // One person's motivation for soil-improvement project
  23: "C", // How soil stayed healthy before farming
  24: "F", // Ways of collecting information on soil degradation
  25: "G", // Suggestion to keep soil safe in the future
  26: "F", // Reason why it's difficult to provide overview
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
    localStorage.setItem("/reading4Part22018", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/reading4Part22018");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part22018");
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
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
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
            <h1 className="text-lg mb-10">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 14-26")}
              </span>
              {renderText(", which are based on Reading Passage 1 below.")}
            </h1>
          </div>
          {/* left text */}

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("SAVING THE SOIL")}
            </h1>

            <p className="text-lg font-bold text-center italic">
              {renderText(
                "More than a third of the Earth's top layer is at risk. Is there hope for our planet's most precious resource?"
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "More than a third of the world's soil is endangered, according to a recent UN report. If we don't slow the decline, all farmable soil could be gone in 60 years. Since soil grows 95% of our food, and sustains human life in other more surprising ways, that is a huge problem."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                " A single gram of healthy soil might contain 100 million bacteria, as well as other microorganisms such as viruses and fungi, living amid decomposing plants and various minerals."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  " A single gram of healthy soil might contain 100 million bacteria, as well as other microorganisms such as viruses and fungi, living amid decomposing plants and various minerals."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                "That means soils do not just grow our food, but are the source of nearly all our existing antibiotics, and could be our best hope in the fight against antibiotic-resistant bacteria. "
              )}{" "}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  "Soil is also an ally against climate change: as microorganisms within soil digest dead animals and plants, they lock in their carbon content, holding three times the amount of carbon as does the entire atmosphere."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("15")}
                  </span>
                )}
                {renderText(
                  " Soils also store water, preventing flood damage: in the UK, damage to buildings, roads and bridges from floods caused by soil degradation costs £233 million every year."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "If the soil loses its ability to perform these functions, the human race could be in big trouble. The danger is not that the soil will disappear completely, but that the microorganisms that give it its special properties will be lost. And once this has happened, it may take the soil thousands of years to recover."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText("Agriculture is by far the biggest problem..")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("17")}
                  </span>
                )}
                {renderText(
                  "In the wild, when plants grow they remove nutrients from the soil, but then when the plants die and decay these nutrients are returned directly to the soil.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("23")}
                  </span>
                )}
                {renderText(
                  " Humans tend not to return unused parts of harvested crops directly to the soil to enrich it, meaning that the soil gradually becomes less fertile. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " Humans tend not to return unused parts of harvested crops directly to the soil to enrich it, meaning that the soil gradually becomes less fertile. In the past we developed strategies to get around the problem, such as regularly varying the types of crops grown, or leaving fields uncultivated for a season."
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "But these practices became inconvenient as populations grew and agriculture had to be run on more commercial lines. A solution came in the early 20th century with the Haber-Bosch process for manufacturing ammonium nitrate. Farmers have been putting this synthetic fertiliser on their fields ever since.But over the past few decades, it has become clear this wasn't such a bright idea."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  " Chemical fertilisers can release polluting nitrous oxide into the atmosphere and excess is often washed away with the rain, releasing nitrogen into rivers. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "  More recently, we have found that indiscriminate use of fertilisers hurts the soil itself, turning it acidic and salty, and degrading the soil they are supposed to nourish."
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "One of the people looking for a solution to this problem is Pius Floris, who started out running a tree-care business in the Netherlands, and now advises some of the world's top soil scientists. "
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "He came to realise that the best way to ensure his trees flourished was to take care of the soil, and has developed a cocktail of beneficial bacteria, fungi and humus* to do this."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Researchers at the University of Valladolid in Spain recently used this cocktail on soils destroyed by years of fertiliser overuse.  "
              )}{" "}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "When they applied Floris's mix to the desert-like test plots, a good crop of plants emerged that were not just healthy at the surface, but had roots strong enough to pierce dirt as hard as rock."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "The few plants that grew in the control plots, fed with traditional fertilisers, were small and weak.However, measures like this are not enough to solve the global soil degradation problem. To assess our options on a global scale we first need an accurate picture of what types of soil are out there, and the problems they face. That's not easy. "
              )}{" "}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "For one thing, there is no agreed international system for classifying soil."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "In an attempt to unify the different approaches, the UN has created the Global Soil Map project."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "Researchers from nine countries are working together to create a map linked to a database that can be fed measurements from field surveys, drone surveys, satellite imagery, lab analyses and so on to provide real-time data on the state of the soil. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " Within the next four years, they aim to have mapped soils worldwide to a depth of 100 metres, with the results freely accessible to all."
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                'But this is only a first step. We need ways of presenting the problem that bring it home to governments and the wider public, says Pamela Chasek at the International Institute for Sustainable Development, in Winnipeg, Canada. "Most scientists don\'t speak language that policy-makers can understand, and vice versa."'
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "Chasek and her colleagues have proposed a goal of 'zero net land degradation'. Like the idea of carbon neutrality, it is an easily understood target that can help shape expectations and encourage action. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              {" "}
              {renderText("For soils on the brink, that may be too late. ")}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "Several researchers are agitating for the immediate creation of protected zones for endangered soils. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
              {renderText(
                "One difficulty here is defining what these areas should conserve: areas where the greatest soil diversity is present?Or areas of unspoilt soils that could act as a future benchmark of quality? "
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
          {/* normal title*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold my-5">
              {renderText("Questions 14-17")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the summary below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("NO MORE THAN TWO WORDS")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 14-17 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText(
                "Why soil degradation could be a disaster for humans"
              )}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* ---------- Question 14 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "Healthy soil contains a large variety of bacteria and other microorganisms, as well as plant remains and"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(14)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[14]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  14
                </button>

                <input
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>.</span>
              </p>

              {/* ---------- Question 15 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "It provides us with food and also with antibiotics, and its function in storing"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(15)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[15]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  15
                </button>

                <input
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText("has a significant effect on the climate.")}
                </span>
              </p>

              {/* ---------- Question 16 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "In addition, it prevents damage to property and infrastructure because it holds"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(16)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[16]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  16
                </button>

                <input
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>.</span>
              </p>

              {/* ---------- Question 17 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "If these microorganisms are lost, soil may lose its special properties. The main factor contributing to soil degradation is the"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(17)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[17]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  17
                </button>

                <input
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>.</span>
              </p>
            </ul>
          </div>

          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 18-21")}
            </h1>

            <p>
              {renderText(
                "Complete each sentence with the correct ending, A-F, below."
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A-F, in boxes 18-21 on your answer sheet."
              )}
            </p>

            {/* List of endings */}
            <div className="flex items-center justify-center">
              <div className="w-96 border border-black p-5 bg-white rounded-lg">
                <p className="font-bold text-center mb-2">
                  {renderText("List of Endings")}
                </p>
                <p>
                  {renderText(
                    "A. may improve the number and quality of plants growing there"
                  )}
                </p>
                <p>
                  {renderText("B. may contain data from up to nine countries.")}
                </p>
                <p>{renderText("C. may not be put back into the soil.")}</p>
                <p>
                  {renderText(
                    "D. may help governments to be more aware of soil-related issues."
                  )}
                </p>
                <p>
                  {renderText(
                    "E. may cause damage to different aspects of the environment."
                  )}
                </p>
                <p>
                  {renderText("F. may be better for use at a global level.")}
                </p>
              </div>
            </div>

            {/* ---------- Question 18 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              <span>
                {renderText(
                  "Nutrients contained in the unused parts of harvested crops"
                )}
              </span>

              <select
                value={userAnswers[18] || ""}
                onChange={(e) => handleInputChange(18, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="18">18</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </p>

            {/* ---------- Question 19 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("19.")}</span>
              <span>
                {renderText(
                  "Synthetic fertilisers produced with the Haber-Bosch process"
                )}
              </span>

              <select
                value={userAnswers[19] || ""}
                onChange={(e) => handleInputChange(19, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="19">19</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </p>

            {/* ---------- Question 20 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("20.")}</span>
              <span>
                {renderText(
                  "Addition of a mixture developed by Pius Floris to the soil"
                )}
              </span>

              <select
                value={userAnswers[20] || ""}
                onChange={(e) => handleInputChange(20, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="20">20</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </p>

            {/* ---------- Question 21 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("21.")}</span>
              <span>{renderText("The idea of zero net soil degradation")}</span>

              <select
                value={userAnswers[21] || ""}
                onChange={(e) => handleInputChange(21, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="21">21</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </p>
          </div>

          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 22-26")}
            </h1>

            <p>
              {renderText("Reading Passage 2 has seven paragraphs,")}
              <span className="font-bold text-lg">{renderText(" A-G")}</span>.
            </p>

            <p>
              {renderText("Which section contains the following information?")}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" A-G")}</span>
              {renderText(", in boxes 22-26 on your answer sheet.")}
            </p>

            <p>{renderText("NB You may use any letter more than once.")}</p>

            {/** ---------- Question 22 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("22.")}</span>
              <span>
                {renderText(
                  "a reference to one person's motivation for a soil-improvement project"
                )}
              </span>

              <select
                value={userAnswers[22] || ""}
                onChange={(e) => handleInputChange(22, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="22">22</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </p>

            {/** ---------- Question 23 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("23.")}</span>
              <span>
                {renderText(
                  "an explanation of how soil stayed healthy before the development of farming"
                )}
              </span>

              <select
                value={userAnswers[23] || ""}
                onChange={(e) => handleInputChange(23, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="23">23</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </p>

            {/** ---------- Question 24 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("24.")}</span>
              <span>
                {renderText(
                  "examples of different ways of collecting information on soil degradation"
                )}
              </span>

              <select
                value={userAnswers[24] || ""}
                onChange={(e) => handleInputChange(24, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="24">24</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </p>

            {/** ---------- Question 25 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("25.")}</span>
              <span>
                {renderText(
                  "a suggestion for a way of keeping some types of soil safe in the near future"
                )}
              </span>

              <select
                value={userAnswers[25] || ""}
                onChange={(e) => handleInputChange(25, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="25">25</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </p>

            {/** ---------- Question 26 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span>
                {renderText(
                  "a reason why it is difficult to provide an overview of soil degradation"
                )}
              </span>

              <select
                value={userAnswers[26] || ""}
                onChange={(e) => handleInputChange(26, e.target.value)}
                className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
              >
                <option value="26">26</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </p>
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
                    Your Score: {score}/12
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14-26)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 12 }, (_, i) => i + 14).map((num) => {
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
      <Reading4Pagination2018></Reading4Pagination2018>
    </div>
  );
};

export default Readign4Part22018;
