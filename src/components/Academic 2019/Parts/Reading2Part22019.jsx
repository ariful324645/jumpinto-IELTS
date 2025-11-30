import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading2Pagination2019 from "../Pagination/Reading2Pagination2019";

const Reading2Part22019 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option

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
  14: "F", // why some people avoided hospitals in the 19th century
  15: "C", // popularity of tall buildings linked to prestige
  16: "E", // comparison between circulation of air in 19th-century building and modern standards
  17: "D", // how Short tested circulation of air
  18: "B", // advertising led to increased air conditioning use
  19: "design", // Professor Short examined the architectural design
  20: "pathogens", // calculated that pathogens would not harm patients
  21: "tuberculosis", // air coming from patients suffering from tuberculosis
  22: "wards", // air in wards could change as often as modern operating theatre
  23: "communal", // energy use could be reduced by locating patients in communal areas
  24: "public", // demand from the public
  25: "miasmas", // known as miasmas
  26: "cholera", // epidemics of cholera
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
    localStorage.setItem("/listening2Part22020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part22020");
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

          {/* left text */}

          <div className="">
            <div>
              <h1 className="text-lg">
                {renderText("You should spend about 20 minutes on ")}
                <span className="text-lg font-bold">
                  {renderText("Questions 14-26")}
                </span>
                {renderText(", which are based on Reading Passage 2 below.")}
              </h1>
            </div>

            <h1 className="text-2xl font-bold text-center mt-10">
              {renderText("Back to the future of skyscraper design")}
            </h1>
            <h1 className="text-lg font-bold text-center italic mt-5">
              {renderText(
                "Answers to the problem of excessive electricity use by skyscrapers and large public buildings can be found in ingenious but forgotten architectural designs of the 19th and early-20th centuries"
              )}
            </h1>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "The Recovery of Natural Environments in Architecture by Professor Alan Short is the culmination of 30 years of research and award-winning green building design by Short and colleagues in Architecture, Engineering, Applied Maths and Earth Sciences at the University of Cambridge."
              )}
              {renderText(
                '"The crisis in building design is already here," said Short. "Policy makers think you can solve energy and building problems with gadgets. You can\'t. As global temperatures continue to rise, we are going to continue to squander more and more energy on keeping our buildings mechanically cool until we have run out of capacity."'
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Short is calling for a sweeping reinvention of how skyscrapers and major public buildings are designed - to end the reliance on sealed buildings which exist solely via the 'life support' system of vast air conditioning units."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Instead, he shows it is entirely possible to accommodate natural ventilation and cooling in large buildings by looking into the past, before the widespread introduction of air conditioning systems, which were 'relentlessly and aggressively marketed' by their inventors."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "Short points out that to make most contemporary buildings habitable, they have to be sealed and air conditioned. The energy use and carbon emissions this generates is spectacular and largely unnecessary. Buildings in the West account for 40-50% of electricity usage, generating substantial carbon emissions, and the rest of the world is catching up at a frightening rate. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Short regards glass, steel and air-conditioned skyscrapers as symbols of status, rather than practical ways of meeting our requirements"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "Short's book highlights a developing and sophisticated art and science of ventilating buildings through the 19th and earlier-20th centuries, including the design of ingeniously ventilated hospitals."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Of particular interest were those built to the designs of John Shaw Billings, including the first Johns Hopkins Hospital in the US city of Baltimore (1873-1889)."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  '"We spent three years digitally modelling Billings\' final designs," says Short. "We put pathogens* in the airstreams, modelled for someone with tuberculosis (TB) coughing in the wards and we found the ventilation systems in the room would have kept other patients safe from harm."'
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-16 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17,20,21")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "We discovered that 19th-century hospital wards could generate up to 24 air changes an hour - that's similar to the performance of a modern-day, computer-controlled operating theatre."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-16 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16,22")}
                  </span>
                )}
              </span>
              {renderText(
                '" We believe you could build wards based on these principles now."'
              )}
              {renderText(
                '"Single rooms are not appropriate for all patients. "'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Communal wards appropriate for certain patients - older people with dementia, for example - would work just as well in today's hospitals, at a fraction of the energy cost."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
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
                  "Much of the ingenuity present in 19th-century hospital and building design was driven by a panicked public clamouring for buildings that could protect against what was thought to be the lethal threat of miasmas - toxic air that spread disease."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24,25")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Miasmas were feared as the principal agents of disease and epidemics for centuries, and were used to explain the spread of infection from the Middle Ages right through to the cholera outbreaks in London and Paris during the 1850s."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "Today, huge amounts of a building's space and construction cost are given over to air conditioning. 'But I have designed and built a series of buildings over the past three decades which have tried to reinvent some of these ideas and then measure what happens.'"
              )}
              {renderText(
                '"To go forward into our new low-energy, low-carbon future, we would be well advised to look back at design before our high-energy, high-carbon present appeared. What is surprising is what a rich legacy we have abandoned."'
              )}
            </p>

            {/* Section H */}
            <h1 className="text-lg font-bold my-5">{renderText("H")}</h1>
            <p className="text-lg">
              {renderText(
                "Successful examples of Short's approach include the Queen's Building at De Montfort University in Leicester. Containing as many as 2,000 staff and students, the entire building is naturally ventilated, passively cooled and naturally lit, including the two largest auditoria, each seating more than 150 people."
              )}
              {renderText(
                "Short contends that glass skyscrapers in London and around the world will become a liability over the next 20 or 30 years if climate modelling predictions and energy price rises come to pass as expected."
              )}
            </p>

            {/* Section I */}
            <h1 className="text-lg font-bold my-5">{renderText("I")}</h1>
            <p className="text-lg">
              {renderText(
                "He is convinced that sufficiently cooled skyscrapers using the natural environment can be produced in almost any climate. He and his team have worked on hybrid buildings in the harsh climates of Beijing and Chicago - built with natural ventilation assisted by back-up air conditioning - which, surprisingly perhaps, can be switched off more than half the time on milder days and during the spring and autumn."
              )}
              {renderText(
                "Short looks at how we might reimagine the cities, offices and homes of the future. Maybe it's time we changed our outlook."
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
          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 14-18")}
            </h1>

            <p>
              {renderText("Reading Passage 1 has five paragraphs,")}
              <span className="font-bold text-lg">{renderText(" A-I")}</span>
            </p>

            <p>
              {renderText("Which section contains the following information?")}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" A-I")}</span>
              {renderText(", in boxes 14-18 on your answer sheet.")}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" NB")}</span>
              {renderText(" You may use any letter more than once.")}
            </p>

            {/* ---------- Question 1 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("14.")}</span>
              <span>
                {renderText(
                  "why some people avoided hospitals in the 19th century"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="1">{renderText("14")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                  <option value="I">{renderText("I")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("15.")}</span>
              <span>
                {renderText(
                  "a suggestion that the popularity of tall buildings is linked to prestige"
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
                  <option value="I">{renderText("I")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("16.")}</span>
              <span>
                {renderText(
                  "a comparison between the circulation of air in a 19th-century building and modern standards"
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
                  <option value="I">{renderText("I")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("17.")}</span>
              {renderText(
                "how Short tested the circulation of air in a 19th-century building"
              )}
              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-17 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
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
                  <option value="I">{renderText("I")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              {renderText(
                "an implication that advertising led to the large increase in the use of air conditioning"
              )}
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
                  <option value="H">{renderText("H")}</option>{" "}
                  <option value="I">{renderText("I")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          <br />
          {/* normal title*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 29-26")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("ONE WORD ONLY")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 29-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Ventilation in 19th-century hospital wards")}
            </h1>

            <ul className="list-disc list-inside space-y-5">
              <p className="text-lg">
                <span>
                  {renderText(
                    "Professor Alan Short examined the work of John Shaw Billings, who influenced the architectural"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(19)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[19]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  19
                </button>
                <input
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  {renderText(
                    "of hospitals to ensure they had good ventilation."
                  )}
                </span>
              </p>

              <p className="text-lg">
                <span>{renderText("He calculated that")}</span>
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
                <span>
                  {renderText("in the air coming from patients suffering from")}
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
                <span>
                  {renderText("would not have harmed other patients.")}
                </span>
              </p>

              <p className="text-lg">
                <span>{renderText("He also found that the air in")}</span>
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
                    "in hospitals could change as often as in a modern operating theatre."
                  )}
                </span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "He suggests that energy use could be reduced by locating more patients in"
                  )}
                </span>
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
                <span>{renderText("areas.")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "A major reason for improving ventilation in 19th-century hospitals was the demand from the"
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
                <span>
                  {renderText("for protection against bad air, known as")}
                </span>
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
                    ". These were blamed for the spread of disease for hundreds of years, including epidemics of"
                  )}
                </span>
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
                  {renderText(
                    "in London and Paris in the middle of the 19th century."
                  )}
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
      <Reading2Pagination2019></Reading2Pagination2019>
    </div>
  );
};

export default Reading2Part22019;
