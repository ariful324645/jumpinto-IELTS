import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2011 from "../Pagination 2011/Reading4Pagination2011";

//  Marks show

const Reading4Part32011 = () => {
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
    "Taxonomic research involves comparing members of one group of ants.",
    "New species of ant are frequently identified by taxonomists.",
    "Range is the key criterion for ecological collections.",
    "A single collection of ants can generally be used for both taxonomic and ecological purposes",
   
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 27;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
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
   // Questions 27-30 (TRUE / FALSE / NOT GIVEN)
   27: "TRUE",
   28: "NOT GIVEN",
   29: "TRUE",
   30: "FALSE",

   // Questions 31-36 (Classification)
   31: "A",
   32: "C",
   33: "B",
   34: "D",
   35: "A",
   36: "D",

   // Questions 37-40 (Summary – Max Two Words)
   37: "leaf litter",
   38: "large funnel",
   39: "heat",
   40: "alcohol",
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
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 3")}</h1>
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
                {renderText("          Questions 27-40")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>
          {/* left text */}
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Collecting Ant Specimens")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "Collecting ants can be as simple as picking up stray ones and placing them in a glass jar, or as complicated as completing an exhaustive survey of all species present in an area and estimating their relative abundances. The exact method used will depend on the final purpose of the collections.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "For taxonomy, or classification, long series, from a single nest, which contain all castes (workers, including majors and minors, and, if present, queens and males) are desirable, to allow the determination of variation within species.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "For ecological studies, the most important factor is collecting identifiable samples of as many of the different species present as possible.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Unfortunately, these methods are not always compatible.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
              {renderText(
                " The taxonomist sometimes overlooks whole species in favour of those groups currently under study, while the ecologist often collects only a limited number of specimens of each species, thus reducing their value for taxonomic investigations.",
              )}
            </p>

            <br />

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "To collect as wide a range of species as possible, several methods must be used. These include hand collecting, using baits to attract the ants, ground litter sampling, and the use of pitfall traps.",
              )}
            </p>

            <br />

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "Hand collecting consists of searching for ants everywhere they are likely to occur. This includes on the ground, under rocks, logs or other objects on the ground, in rotten wood on the ground or on trees, in vegetation, on tree trunks and under bark.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "When possible, collections should be made from nests or foraging columns and at least 20 to 25 individuals collected.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
              {renderText(
                " This will ensure that all individuals are of the same species and increase their value for detailed studies.",
              )}
            </p>

            <br />

            {/* Paragraph 5 */}
            <p className="text-lg">
              {renderText(
                "Specimens are collected using an aspirator, forceps, a fine moistened paint brush, or fingers if the ants are known not to sting.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Individual insects are placed in plastic or glass tubes containing 75% to 95% ethanol.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 6 */}
            <p className="text-lg">
              {renderText(
                "Baits can be used to attract and concentrate foragers. This often increases the number of individuals collected and attracts species that are otherwise elusive.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Sugars and meats or oils will attract different species and a range should be utilised.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 7 */}
            <p className="text-lg">
              {renderText(
                "Many ants forage primarily in the layer of leaves and debris on the ground. One of the most successful ways to collect them is to gather the leaf litter and extract the ants from it.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "As the leaf litter dries from above, ants move downward and fall into alcohol placed below the funnel.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
              {renderText(
                " This method works especially well in rain forests and marshy areas.",
              )}
            </p>

            <br />

            {/* Paragraph 8 */}
            <p className="text-lg">
              {renderText(
                "The pitfall trap is another commonly used tool for collecting ants. A pitfall trap is any small container placed in the ground with the top level with the surrounding surface and filled with a preservative.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The preservative used is usually ethylene glycol or propylene glycol, as alcohol will evaporate quickly and the traps will dry out.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
              {renderText(
                " One advantage of pitfall traps is that they can collect over time with minimal maintenance.",
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
            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 27-30")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?",
                )}{" "}
                <br /> <br />
                {renderText("In boxes 27-30 on your answer sheet, choose")}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
                {renderText(
                  "if the statement agrees with the claims of the writer",
                )}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
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
                <h2 className="text-lg font-bold">Questions 27-30</h2>
                {questions.map((q, qIndex) => {
                  const answerKey = qIndex + 27;
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

            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 31-36")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Reading Passage 3 has seven paragraphs, A-D.")}
                <br />
                <br />
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below.",
                )}
                <br />
                <br />
                {renderText(
                  "Choose the correct number, A-D, in boxes 14-19 on your answer sheet.",
                )}
              </h3>

              <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
                <div className="text-left">
                  <h1 className="text-xl font-bold mb-5 text-center">
                    {renderText(
                      "Classify the following statements as referring to",
                    )}
                  </h1>

                  <ul className="space-y-2 text-lg">
                    <li>{renderText("A. hand collecting")}</li>
                    <li>{renderText("B. using bait")}</li>
                    <li>{renderText("C. sampling ground litter")}</li>
                    <li>{renderText("D. using a pitfall trap")}</li>
                  </ul>
                </div>
              </div>
              <br />
            </div>
          </div>
          {/* optional question */}
          <div className="space-y-3">
            {/* ---------- Question 31 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("31")}</span>
              <span>
                {renderText(
                  "It is preferable to take specimens from groups of ants.",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("31")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 32 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("32")}</span>
              <span>
                {renderText("It is particularly effective for wet habitats.")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[32] || ""}
                  onChange={(e) => handleInputChange(32, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("32")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 33 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("33")}</span>
              <span>
                {renderText(
                  "It is a good method for species which are hard to find.",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[33] || ""}
                  onChange={(e) => handleInputChange(33, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("33")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 34 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("34")}</span>
              <span>{renderText("Little time and effort is required.")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[34] || ""}
                  onChange={(e) => handleInputChange(34, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("34")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 35 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("35")}</span>
              <span>
                {renderText(
                  "Separate containers are used for individual specimens.",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[35] || ""}
                  onChange={(e) => handleInputChange(35, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("35")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 36 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("36")}</span>
              <span>
                {renderText("Non-alcoholic preservative should be used.")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[36] || ""}
                  onChange={(e) => handleInputChange(36, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("36")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 37-40")}
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
                "Write your answers in boxes 37-40 on your answer sheet.",
              )}
            </h1>

            <br />
          </div>

          {/* image */}
          <div className="flex items-center justify-center">
            <img
              className="w-96 h-96"
              src="https://i.ibb.co.com/nMh9w80p/a8t4r3.jpg"
              alt="Eikhane image bosabo"
            />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Complete the summary below")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* 37 */}
              <p className="text-lg">
                <span>{renderText("some")}</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </p>

              {/* 38 */}
              <p className="text-lg">
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </p>

              {/* 39 */}
              <p className="text-lg">
                <span>{renderText("a")}</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </p>

              {/* 40 */}
              <p className="text-lg">
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
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
                    Your Score: {score}/14
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
      <Reading4Pagination2011></Reading4Pagination2011>
    </div>
  );
};

export default Reading4Part32011;
