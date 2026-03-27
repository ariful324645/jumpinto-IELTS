import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";


import Reading2Pagination2009 from "../Pagination 2009/Reading2Pagination2009";

//  Marks show

const Reading2Part32009 = () => {
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
    "MIRTP was divided into five phases.",
    "Prior to the start of MIRTP the Makete district was almost inaccessible during the rainy season",
    "Phase I of MIRTP consisted of a survey of household expenditure on transport.",
    "The survey concluded that one-fifth or 20% of the household transport requirement as outside the local area.",

    "MIRTP hoped to improve the movement of goods from Makete district to the country's capital.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
const question2 = [
  "Which of the following phrases best describes the main aim of Reading Passage 3?",
];

const options2 = [
  [
    "A. to suggest that projects such as MIRTP are needed in other countries",
    "B. to describe how MIRTP was implemented and how successful it was",
    "C. to examine how MIRTP promoted the use of donkeys",
    "D. to warn that projects such as MIRTP are likely to have serious problems",
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
      const answerKey = qIndex + 31;
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
      const answerKey = qIndex + 40;
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
   // Questions 27–30 (Heading Matching / Summary)
   27: "ii", // Identifying the main transport problems
   28: "v", // Initial improvements in mobility and transport modes
   29: "x", // Co-operation of district officials
   30: "i", // MIRTP as a future model

   // Questions 31–35 (YES / NO / NOT GIVEN)
   31: "NO",
   32: "YES",
   33: "YES",
   34: "NOT GIVEN",
   35: "NOT GIVEN",

   // Questions 36–39 (Statement Matching)
   36: "D", // Construction of footbridges, steps and handrails
   37: "I", // Frequent breakdown of buses and trucks
   38: "G", // Improvement of secondary roads and paths
   39: "E", // Isolation of Makete for part of the year

   // Question 40 (Multiple Choice)
   40: "B. to describe how MIRTP was implemented and how successful it was", // Describe how MIRTP was implemented and how successful it was
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
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Makete Integrated Rural Transport Project")}
            </h1>

            {/* A */}
            <p className="text-lg">
              {renderText(
                "The disappointing results of many conventional road transport projects in Africa led some experts to rethink the strategy by which rural transport problems were to be tackled at the beginning of the 1980s.",
              )}{" "}
              {renderText(
                "A request for help in improving the availability of transport within the remote Makete District of south-western Tanzania presented the opportunity to try a new approach.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}
              ></span>
              {renderText(
                "The concept of 'integrated rural transport' was adopted in the task of examining the transport needs of the rural households in the district. The objective was to reduce the time and effort needed to obtain access to essential goods and services through an improved rural transport system. The underlying assumption was that the time saved would be used instead for activities that would improve the social and economic development of the communities.",
              )}
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " The Makete Integrated Rural Transport Project (MIRTP) started in 1985 with financial support from the Swiss Development Corporation and was co-ordinated with the help of the Tanzanian government.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    40
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* B */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "When the project began, Makete District was virtually totally isolated during the rainy season.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    32
                  </span>
                )}
              </span>

              {renderText(
                "The regional road was in such bad shape that access to the main towns was impossible for about three months of the year. Road traffic was extremely rare within the district, and alternative means of transport were restricted to donkeys in the north of the district. People relied primarily on the paths, which were slippery and dangerous during the rains.Before solutions could be proposed, the problems had to be understood. ",
              )}

              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Little was known about the transport demands of the rural households, so Phase I, between December 1985 and December 1987, focused on research.",
                )}{" "}
                {renderText(
                  "The socio-economic survey of more than 400 households indicated that a household in Makete spent, on average, seven hours a day on transporting themselves and their goods. Interesting facts regarding transport were found: 95% was on foot; 80% was within the locality; and 70% was related to the collection of water and firewood and travelling to grinding mills.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-28 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    27,31,33,34
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* C */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Having determined the main transport needs, possible solutions were identified which might reduce the time and burden. During Phase II, from January to February 1991, a number of approaches were implemented in an effort to improve mobility and access to transport.",
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    28,31
                  </span>
                )}
              </span>

              {renderText(
                "An improvement of the road network was considered necessary to ensure the import and export of goods to the district. These improvements were carried out using methods that were heavily dependent on labour. In addition to the improvement of roads, these methods provided training in the operation of a mechanical workshop and bus and truck services.",
              )}

              {renderText(
                "Most goods were transported along the paths that provide short-cuts up and down the hillsides, but the paths were a real safety risk and made the journey on foot even more arduous. ",
              )}

              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "It made sense to improve the paths by building steps, handrails and footbridges.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    36
                  </span>
                )}
              </span>

              {renderText(
                "It was uncommon to find means of transport that were more efficient than walking but less technologically advanced than motor vehicles. MIRTP focused on what would be most appropriate for the inhabitants in terms of affordability and acceptance. The project chose the promotion of donkeys and the introduction of a locally manufacturable wheelbarrow.",
              )}
            </p>

            <br />

            {/* D */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "At the end of Phase II, it was clear that the selected approaches had had different degrees of success. Phase III from March 1991 to March 1993 focused on refinement and institutionalisation.",
                )}{" "}
                {renderText(
                  "The road improvements and maintenance system helped make the district centre accessible throughout the year. Essential goods became more readily available and prices did not fluctuate as much.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-28 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    40,31,39
                  </span>
                )}
              </span>

              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Efforts to improve motorised transport were unsuccessful because most vehicles broke down and there were no resources to repair them.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    37
                  </span>
                )}
              </span>

              {renderText(
                "Paths and secondary roads were improved only at the request of communities willing to participate. However, improved paths increased requests for assistance.",
              )}
            </p>

            <br />

            {/* E */}
            <p className="text-lg">
              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "It would have been easy to criticise the MIRTP for using a top-down approach, but it was necessary to start from the level of district authorities. Without their support it would have been difficult to respond to villagers' requests.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    29
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* F */}
            <p className="text-lg">
              {renderText(
                "Today, nobody argues about the importance of improved paths and inexpensive transport. Dedicated work by community development officers raised awareness among rural communities. The concept of integrated rural transport is now well established in Tanzania..",
              )}

              <span className={`ml-2 ${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " The experiences from Makete will help future initiatives, and the district will act as a reference for future work",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    30
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
          {/* optional question */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27-30")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Complete the summary using the list of words or phrases below.",
              )}
              <br />
              <br />
              {renderText(
                "Choose the correct letter, A-F, in boxes 27-30 on your answer sheet.",
              )}
            </h3>

            {/* select */}
            <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
              <div className="text-left">
                <h1 className="text-xl font-bold mb-5 text-center">
                  {renderText("List of Headings")}
                </h1>

                <ul className="space-y-2 text-lg">
                  <li>{renderText("i. MIRTP as a future model")}</li>
                  <li>
                    {renderText("ii. Identifying the main transport problems")}
                  </li>
                  <li>
                    {renderText("iii. Preference for motorised vehicles")}
                  </li>
                  <li>
                    {renderText("iv. Government authorities' instructions")}
                  </li>
                  <li>
                    {renderText(
                      "v. Initial improvements in mobility and transport modes",
                    )}
                  </li>
                  <li>
                    {renderText("vi. Request for improved transport in Makete")}
                  </li>
                  <li>
                    {renderText(
                      "vii. Transport improvements in the northern part of the district",
                    )}
                  </li>
                  <li>
                    {renderText("viii. Improvements in the rail network")}
                  </li>
                  <li>{renderText("ix. Effects of initial MIRTP measures")}</li>
                  <li>{renderText("x. Co-operation of district officials")}</li>
                  <li>{renderText("xi. Role of wheelbarrows and donkeys")}</li>
                </ul>
              </div>
            </div>

            <br />
          </div>
          <div className="space-y-4 text-lg">
            {/* 27 */}
            <div>
              {renderText("27 Section B")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">27</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                  <option value="x">x</option>
                  <option value="xi">xi</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>

            {/* 28 */}
            <div>
              {renderText("28 Section C")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">28</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                  <option value="x">x</option>
                  <option value="xi">xi</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>

            {/* Example */}
            <div>{renderText("(Example) Section D ix")}</div>

            {/* 29 */}
            <div>
              {renderText("29 Section E")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">29</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                  <option value="x">x</option>
                  <option value="xi">xi</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>

            {/* 30 */}
            <div>
              {renderText("30 Section F")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">30</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                  <option value="x">x</option>
                  <option value="xi">xi</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>
          </div>
          {/* 2nd step */}
          <div></div>
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 31-35")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 3?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 31-35 on your answer sheet, choose")}
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
              <h2 className="text-lg font-bold">Questions 31-35</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 31;
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
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 36-39")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Complete the summary using the list of words or phrases below.",
              )}
              <br />
              <br />
              {renderText(
                "Choose the correct letter, A-J, in boxes 36-39 on your answer sheet.",
              )}
            </h3>

            {/* select */}
            <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
              <div className="text-left">
                <h1 className="text-xl font-bold mb-5 text-center">
                  {renderText("List of Statements")}
                </h1>

                <ul className="space-y-2 text-lg">
                  <li>
                    {renderText(
                      "A. provided the people of Makete with experience in running bus and truck services",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "B. was especially successful in the northern part of the district",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "C. differed from earlier phases in that the community became less actively involved",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "D. improved paths used for transport up and down hillsides.",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "E. was no longer a problem once the roads had been improved.",
                    )}
                  </li>
                  <li>
                    {renderText("F. cost less than locally made wheelbarrows.")}
                  </li>
                  <li>
                    {renderText(
                      "G. was done only at the request of local people who were willing to lend a hand",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "H. was at first considered by MIRTP to be affordable for the people of the district",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "I. hindered attempts to make the existing transport services more efficient.",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "J. was thought to be the most important objective of Phase III.",
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <br />
          </div>
          <div className="space-y-4 text-lg">
            {/* 36 */}
            <div>
              {renderText(
                "36 Construction of footbridges, steps and handrails",
              )}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[36] || ""}
                  onChange={(e) => handleInputChange(36, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">36</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>

            {/* 37 */}
            <div>
              {renderText(
                "37 Frequent breakdown of buses and trucks in Makete",
              )}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[37] || ""}
                  onChange={(e) => handleInputChange(37, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">37</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>

            {/* 38 */}
            <div>
              {renderText("38 The improvement of secondary roads and paths")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[38] || ""}
                  onChange={(e) => handleInputChange(38, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">38</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>

            {/* 39 */}
            <div>
              {renderText("39 The isolation of Makete for part of the year")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[39] || ""}
                  onChange={(e) => handleInputChange(39, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">39</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </div>
          </div>{" "}
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">{renderText("Questions 40")}</h2>
            <p className="text-xl">
              {renderText("Choose the correct letter,")}
              <span className="font-bold">{renderText(" A, B ,C or D")}</span>
            </p>

            {question2.map((q, qIndex) => {
              const answerKey = qIndex + 40;

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
          <br />
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
      <Reading2Pagination2009></Reading2Pagination2009>
    </div>
  );
};

export default Reading2Part32009;
