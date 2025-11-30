import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading2Pagination2019 from "../Pagination/Reading2Pagination2019";

//  Marks show

const Reading2Part32019 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 38;
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
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  //  Marks show

const correctAnswers = {
  27: "vi", // Section A → What people are increasingly expected to do
  28: "i", // Section B → Complaints about the impact of a certain approach
  29: "iii", // Section C → Early recommendations concerning business activities
  30: "ii", // Section D → Fundamental beliefs that are in fact incorrect
  31: "ix", // Section E → Evidence that a certain approach can have more disadvantages than advantages
  32: "vii", // Section F → How to achieve outcomes that are currently impossible
  33: "iv", // Section G → Organisations that put a new approach into practice
  34: "viii", // Section H → Neither approach guarantees continuous improvement

  35: "organised", // People who feel they are not organised enough
  36: "perfectionists", // People who regard themselves as perfectionists
  37: "dissatisfied", // Many people feel dissatisfied with aspects of their work

  38: "YES", // Both businesses and people aim at order without considering its value
  39: "NO", // Innovation is most successful if people have distinct roles → passage says the opposite
  40: "NOT GIVEN", // Google and GE → not specified
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
              {renderText("Why companies should welcome disorder")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Organisation is big business. Whether it is of our lives - all those inboxes and calendars - or how companies are structured, a multi-billion dollar industry helps to meet this need."
              )}
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "We have more strategies for time management, project management and self-organisation than at any other time in human history. We are told that we ought to organise our company, our home life, our week, our day and even our sleep, all as a means to becoming more productive."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27,35")}
                  </span>
                )}
              </span>
              {renderText(
                "Every week, countless seminars and workshops take place around the world to tell a paying public that they ought to structure their lives in order to achieve this."
              )}
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "This rhetoric has also crept into the thinking of business leaders and entrepreneurs, much to the delight of self-proclaimed perfectionists with the need to get everything right."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
              {renderText(
                "The number of business schools and graduates has massively increased over the past 50 years, essentially teaching people how to organise well."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Ironically, however, the number of businesses that fail has also steadily increased. Work-related stress has increased. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " A large proportion of workers from all demographics claim to be dissatisfied with the way their work is structured and the way they are managed."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28,37")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "This begs the question: what has gone wrong? Why is it that on paper the drive for organisation seems a sure shot for increasing productivity, but in reality falls well short of what is expected?"
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "This has been a problem for a while now. Frederick Taylor was one of the forefathers of scientific management."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Writing in the first half of the 20th century, he designed a number of principles to improve the efficiency of the work process, which have since become widespread in modern companies."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "New research suggests that this obsession with efficiency is misguided. The problem is not necessarily the management theories or strategies we use to organise our work; it's the basic assumptions we hold in approaching how we work. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Here it's the assumption that order is a necessary condition for productivity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "What's more, recent studies show that order actually has diminishing returns. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "What's more, recent studies show that order actually has diminishing returns. Order does increase productivity to a certain extent, but eventually the usefulness of the process of organisation, and the benefit it yields, reduce until the point where any further increase in order reduces productivity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
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
                {" "}
                {renderText(
                  "In fact, research shows that, when innovating, the best approach is to create an environment devoid of structure and hierarchy and enable everyone involved to engage as one organic group."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "These environments can lead to new solutions that, under conventionally structured environments (filled with bottlenecks in terms of information flow, power structures, rules, and routines) would never be reached."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In recent times companies have slowly started to embrace this disorganisation. Many of them embrace it in terms of perception (embracing the idea of disorder, as opposed to fearing it) and in terms of process (putting mechanisms in place to reduce structure)."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "For example, Oticon, a large Danish manufacturer of hearing aids, used what it called a 'spaghetti' structure in order to reduce the organisation's rigid hierarchies. ."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
              {renderText(
                " This involved scrapping formal job titles and giving staff huge amounts of ownership over their own time and projects."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "A word of warning to others thinking of jumping on this bandwagon: the evidence so far suggests disorder, much like order, also seems to have diminishing utility, and can also have detrimental effects on performance if overused."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "A word of warning to others thinking of jumping on this bandwagon: the evidence so far suggests disorder, much like order, also seems to have diminishing utility, and can also have detrimental effects on performance if overused."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Like order, disorder should be embraced only so far as it is useful.But we should not fear it - nor venerate one over the other.This research also shows that we should continually question whether or not our existing assumptions work."
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
          </div>
          <div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 27-31")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions 27-34) and the list of people below."
                )}
              </p>

              <p>
                {renderText("Match each statement with the correct person,")}
                <span className="font-bold text-lg">{renderText(" i-x")}</span>.
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, i-x, in boxes 27-34 on your answer sheet."
                )}
              </p>

              <p>{renderText("NB You may use any letter more than once.")}</p>
              {/* ---------- List of Researchers ---------- */}
              <div className="flex items-center justify-center border border-black py-4 px-4 max-w-xl mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <h1 className="text-2xl font-bold text-center">
                      List of Headings
                    </h1>
                    <li>
                      {renderText(
                        "i. Complaints about the impact of a certain approach"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "ii. Fundamental beliefs that are in fact incorrect"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iii. Early recommendations concerning business activities"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iv. Organisations that put a new approach into practice"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "v. Companies that have suffered from changing their approach"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "vi. What people are increasingly expected to do"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "vii. How to achieve outcomes that are currently impossible"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "viii. Neither approach guarantees continuous improvement"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "ix. Evidence that a certain approach can have more disadvantages than advantages"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              {/* optional question */}
              <div className="space-y-4">
                {/* ---------- Question 1 ---------- */}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("27.")}</span>
                  <span>{renderText("Section A")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[27] || ""}
                      onChange={(e) => handleInputChange(27, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="27">{renderText("27")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 2 ---------- */}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("28.")}</span>
                  <span>{renderText("Section B")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[28] || ""}
                      onChange={(e) => handleInputChange(28, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="28">{renderText("28")}</option>

                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 3 ---------- */}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("29.")}</span>
                  <span>{renderText("Section C")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[29] || ""}
                      onChange={(e) => handleInputChange(29, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="29">{renderText("29")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 5 ---------- */}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("30.")}</span>
                  {renderText("Section D")}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[30] || ""}
                      onChange={(e) => handleInputChange(30, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="30">{renderText("30")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                {/* ---------- Question 5 ---------- */}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("31.")}</span>
                  {renderText("Section E")}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[31] || ""}
                      onChange={(e) => handleInputChange(31, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="31">{renderText("31")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("32.")}</span>
                  {renderText("Section F")}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[32] || ""}
                      onChange={(e) => handleInputChange(32, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="32">{renderText("32")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("33.")}</span>
                  {renderText("Section G")}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[33] || ""}
                      onChange={(e) => handleInputChange(33, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="33">{renderText("33")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("34.")}</span>
                  {renderText("Section H")}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[34] || ""}
                      onChange={(e) => handleInputChange(34, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="34">{renderText("34")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <br />

          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 35-37")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the summary below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("ONE WORD ONLY")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 35-37 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Disorder and organisation")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                {renderText(
                  "Numerous training sessions are aimed at people who feel they are not"
                )}
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
                  value={userAnswers[35] || ""}
                  onChange={(e) => handleInputChange(35, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText("enough.")}
              </p>

              <p className="text-lg">
                {renderText(
                  "Being organised appeals to people who regard themselves as"
                )}
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
                  value={userAnswers[36] || ""}
                  onChange={(e) => handleInputChange(36, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
              </p>

              <p className="text-lg">
                {renderText("Many people feel")}
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
                {renderText("with aspects of their work.")}
              </p>
            </ul>
          </div>

          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 38-40")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?"
              )}{" "}
              <br /> <br />
              {renderText("In boxes 38-40 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer"
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
              {renderText(
                "if the statement contradicts the claims of the writer"
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">
                {renderText("NOT GIVEN")}
              </span>{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this"
              )}
            </h3>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 36-40</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 38;
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
      <Reading2Pagination2019></Reading2Pagination2019>
    </div>
  );
};

export default Reading2Part32019;
