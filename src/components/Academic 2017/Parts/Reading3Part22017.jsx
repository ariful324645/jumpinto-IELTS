import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2017 from "../Pagination2017/Reading3Pagination2017";

const Reading3Part22017 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
  const questions = [
    "The writer refers to visitors to New York to illustrate the point that",
    "According to the second paragraph, what is the writer's view of explorers?",
    "The writer refers to a description of Egdon Heath to suggest that",
    "In the fourth paragraph, the writer refers to 'a golden age' to suggest that",
    "In the sixth paragraph, when discussing the definition of exploration, the writer argues that",
    "In the last paragraph, the writer explains that he is interested in",
  ];

  const options = [
    [
      "A. exploration is an intrinsic element of being human.",
      "B. most people are enthusiastic about exploring.",
      "C. exploration can lead to surprising results.",
      "D. most people find exploration daunting.",
    ],

    [
      "A. Their discoveries have brought both benefits and disadvantages.",
      "B. Their main value is in teaching others.",
      "C. They act on an urge that is common to everyone.",
      "D. They tend to be more attracted to certain professions than to others.",
    ],

    [
      "A. Hardy was writing about his own experience of exploration.",
      "B. Hardy was mistaken about the nature of exploration.",
      "C. Hardy's aim was to investigate people's emotional states.",
      "D. Hardy's aim was to show the attraction of isolation.",
    ],

    [
      "A. the amount of useful information produced by exploration has decreased.",
      "B. fewer people are interested in exploring than in the 19th century.",
      "C. recent developments have made exploration less exciting.",
      "D. we are wrong to think that exploration is no longer necessary.",
    ],

    [
      "A. people tend to relate exploration to their own professional interests.",
      "B. certain people are likely to misunderstand the nature of exploration.",
      "C. the generally accepted definition has changed over time.",
      "D. historians and scientists have more valid definitions than the general public.",
    ],

    [
      "A. how someone's personality is reflected in their choice of places to visit.",
      "B. the human ability to cast new light on places that may be familiar.",
      "C. how travel writing has evolved to meet changing demands.",
      "D. the feelings that writers develop about the places that they explore.",
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
      const answerKey = qIndex + 14;
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
  14: "A", // an acceptance that not all diseases can be totally eliminated
  15: "C", // examples of physical conditions caused by human behaviour
  16: "F", // a reference to classifying diseases on the basis of how far they extend geographically
  17: "G", // reasons why the level of access to healthcare can vary within a country
  18: "D", // a description of health geography as a mixture of different academic fields
  19: "B", // a description of the type of area where a particular illness is rare

  20: "vaccinations", // Certain diseases have disappeared, thanks to better ___ and healthcare
  21: "antibiotics", // Because there is more contact between people, ___ are losing their usefulness
  22: "mosquitos", // Disease-causing ___ are most likely to be found in hot, damp regions
  23: "factories", // One cause of pollution is ___ that burn a particular fuel
  24: "forests", // The growth of cities often has an impact on nearby ___
  25: "polio", // ___ is one disease that is growing after having been eradicated
  26: "mountain", // A physical barrier such as a ___ can prevent people from reaching a hospital
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
    localStorage.setItem("/reading2Part22020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/reading2Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part22020");
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
              {renderText(", which are based on Reading Passage 2 below.")}
            </h1>
          </div>
          {/* left text */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("The Intersection of Health Sciences and Geography")}
            </h1>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "While many diseases that affect humans have been eradicated due to improvements in vaccinations and the availability of healthcare, there are still areas around the world where certain health issues are more prevalent."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                "In a world that is far more globalised than ever before, people come into contact with one another through travel and living closer and closer to each other."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "As a result, super-viruses and other infections resistant to antibiotics are becoming more and more common."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Geography can often play a very large role in the health concerns of certain populations."
              )}
              {renderText(
                "For instance, depending on where you live, you will not have the same health concerns as someone who lives in a different geographical region."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Perhaps one of the most obvious examples of this idea is malaria-prone areas, which are usually tropical regions that foster a warm and damp environment in which the mosquitos that can give people this disease can grow."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Malaria is much less of a problem in high-altitude deserts, for instance."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "In some countries, geographical factors influence the health and well-being of the population in very obvious ways."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In many large cities, the wind is not strong enough to clear the air of the massive amounts of smog and pollution that cause asthma, lung problems, eyesight issues and more in the people who live there."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Part of the problem is, of course, the massive number of cars being driven, in addition to factories that run on coal power."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The rapid industrialisation of some countries in recent years has also led to the cutting down of forests to allow for the expansion of big cities, which makes it even harder to fight the pollution with the fresh air that is produced by plants."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "It is in situations like these that the field of health geography comes into its own."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "It is an increasingly important area of study in a world where diseases like polio are re-emerging, respiratory diseases continue to spread, and malaria-prone areas are still fighting to find a better cure."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
                {renderText(
                  "Health geography is the combination of, on the one hand, knowledge regarding geography and methods used to analyse and interpret geographical information, and on the other, the study of health, diseases and healthcare practices around the world."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                "The aim of this hybrid science is to create solutions for common geography-based health problems."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "While people will always be prone to illness, the study of how geography affects our health could lead to the eradication of certain illnesses, and the prevention of others in the future."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "The geography of disease and ill health analyses the frequency with which certain diseases appear in different parts of the world, and overlays the data with the geography of the region, to see if there could be a correlation between the two."
              )}
              {renderText(
                "Health geographers also study factors that could make certain individuals or a population more likely to be taken ill with a specific health concern or disease, as compared with the population of another area."
              )}
              {renderText(
                "Health geographers in this field are usually trained as healthcare workers, and have an understanding of basic epidemiology as it relates to the spread of diseases among the population."
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Researchers study the interactions between humans and their environment that could lead to illness (such as asthma in places with high levels of pollution) and work to create a clear way of categorising illnesses, diseases and epidemics into local and global scales."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                "Health geographers can map the spread of illnesses and attempt to identify the reasons behind an increase or decrease in illnesses, as they work to find a way to halt the further spread or re-emergence of diseases in vulnerable populations."
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "The second subcategory of health geography is the geography of healthcare provision."
              )}
              {renderText(
                "This group studies the availability (or lack thereof) of healthcare resources to individuals and populations around the world."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In both developed and developing nations there is often a very large discrepancy between the options available to people in different social classes, income brackets, and levels of education."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
                {renderText(
                  "Individuals working in the area of the geography of healthcare provision attempt to assess the levels of healthcare in the area (for instance, it may be very difficult for people to get medical attention because there is a mountain between their village and the nearest hospital)."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>

              {renderText(
                "These researchers are on the frontline of making recommendations regarding policy to international organisations, local government bodies and others."
              )}
            </p>

            {/* Section H */}
            <h1 className="text-lg font-bold my-5">{renderText("H")}</h1>
            <p className="text-lg">
              {renderText(
                "The field of health geography is often overlooked, but it constitutes a huge area of need in the fields of geography and healthcare."
              )}
              {renderText(
                "If we can understand how geography affects our health no matter where in the world we are located, we can better treat disease, prevent illness, and keep people safe and well."
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
          {/* select */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 14-19")}
            </h1>

            <p>{renderText("Reading Passage 2 has eight sections, A-H.")}</p>

            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-H, in boxes 14-19 on your answer sheet."
              )}
            </p>

            <p>{renderText("NB You may use any letter more than once.")}</p>

            {/* ---------- Question 14 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("14.")}</span>
              <span>
                {renderText(
                  "an acceptance that not all diseases can be totally eliminated"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="14">{renderText("14")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 15 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("15.")}</span>
              <span>
                {renderText(
                  "examples of physical conditions caused by human behaviour"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="15">{renderText("15")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 16 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("16.")}</span>
              <span>
                {renderText(
                  "a reference to classifying diseases on the basis of how far they extend geographically"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="16">{renderText("16")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 17 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("17.")}</span>
              <span>
                {renderText(
                  "reasons why the level of access to healthcare can vary within a country"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="17">{renderText("17")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 18 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              <span>
                {renderText(
                  "a description of health geography as a mixture of different academic fields"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="18">{renderText("18")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 19 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("19.")}</span>
              <span>
                {renderText(
                  "a description of the type of area where a particular illness is rare"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="19">{renderText("19")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          {/* normal title*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold my-5">
              {renderText("Questions 20-26")}
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
                "Write your answers in boxes 20-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Health and Geography: Key Concepts")}
            </h1>

            {/* ---------- Section ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>
                  {renderText(
                    "Certain diseases have disappeared, thanks to better"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(20)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[20]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  20
                </button>

                <input
                  value={userAnswers[20] || ""}
                  onChange={(e) => handleInputChange(20, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText("and healthcare.")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText("Because there is more contact between people,")}
                </span>

                <button
                  onClick={() => toggleButton(21)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[21]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  21
                </button>

                <input
                  value={userAnswers[21] || ""}
                  onChange={(e) => handleInputChange(21, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText("are losing their usefulness.")}</span>
              </p>

              <p className="text-lg">
                <span>{renderText("Disease-causing")}</span>

                <button
                  onClick={() => toggleButton(22)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[22]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  22
                </button>

                <input
                  value={userAnswers[22] || ""}
                  onChange={(e) => handleInputChange(22, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText(
                    "are most likely to be found in hot, damp regions."
                  )}
                </span>
              </p>

              <p className="text-lg">
                <span>{renderText("One cause of pollution is")}</span>

                <button
                  onClick={() => toggleButton(23)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[23]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  23
                </button>

                <input
                  value={userAnswers[23] || ""}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText("that burn a particular fuel.")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "The growth of cities often has an impact on nearby"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(24)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[24]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  24
                </button>

                <input
                  value={userAnswers[24] || ""}
                  onChange={(e) => handleInputChange(24, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>.</span>
              </p>

              <p className="text-lg">
                <span>{renderText("")}</span>

                <button
                  onClick={() => toggleButton(25)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[25]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  25
                </button>

                <input
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText(
                    "is one disease that is growing after having been eradicated."
                  )}
                </span>
              </p>

              <p className="text-lg">
                <span>{renderText("A physical barrier such as a")}</span>

                <button
                  onClick={() => toggleButton(26)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[26]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  26
                </button>

                <input
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText("can prevent people from reaching a hospital.")}
                </span>
              </p>
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
                    Your Score: {score}/12
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
      <Reading3Pagination2017></Reading3Pagination2017>
    </div>
  );
};

export default Reading3Part22017;
