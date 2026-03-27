import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading3Pagination2011 from "../Pagination 2011/Reading3Pagination2011";

//  Marks show

const Reading3Part32011 = () => {
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
    "The wear and tear theory applies to both artificial objects and biological systems.",
    "In principle, it is possible for a biological system to become older without ageing.",
    "Within seven years, about 90 per cent of a human body is replaced as new.",
    "Conserving energy may help to extend a human's life.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 37;
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
  // Questions 27-32 (Heading Matching)
  27: "ix",
  28: "ii",
  29: "v",
  30: "i",
  31: "viii",
  32: "iv",

  // Questions 33-36 (Notes – Two Words)
  33: "thermodynamics",
  34: "physical chemistry",
  35: "adapt",
  36: "immortality",

  // Questions 37-40 (YES / NO / NOT GIVEN)
  37: "NO",
  38: "YES",
  39: "NOT GIVEN",
  40: "YES",
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
            <h1 className="text-2xl font-bold text-center mt-10">
              {renderText("HOW DOES THE BIOLOGICAL CLOCK TICK?")}
            </h1>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                `Our life span is restricted.Everyone accepts this as 'biologically' obvious."Nothing lives for ever!"However, in this statement we think of artificially produced, technical objects, products which are subjected to natural wear and tear during use.This leads to the result that at some time or other the object stops working and is unusable ('death' in the biological sense).?`,
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "But are the wear and tear and loss of function of technical objects and the death of living organisms really similar or comparable?",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("27,37")}
                </span>
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                "Our 'dead' products are 'static', closed systems.It is always the basic material which constitutes the object and which, in the natural course of things, is worn down and becomes 'older'",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Ageing in this case must occur according to the laws of physical chemistry and of thermodynamics.33,34Although the same law holds for a living organism, the result of this law is not inexorable in the same way.At least as long as a biological system has the ability to renew itself it could actually become older without ageing; an organism is an open, dynamic system through which new material continuously flows.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-20 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("33,34,38")}
                </span>
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                "Destruction of old material and formation of new material are thus in permanent dynamic equilibrium.The material of which the organism is formed changes continuously.Thus our bodies continuously exchange old substance for new, just like a spring which more or less maintains its form and movement, but in which the water molecules are always different.Thus ageing and death should not be seen as inevitable, particularly as the organism possesses many mechanisms for repair.It is not, in principle, necessary for a biological system to age and die.Nevertheless, a restricted life span, ageing, and then death are basic characteristics of life.The reason for this is easy to recognise: in nature, the existent organisms either adapt or are regularly replaced by new types.",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Because of changes in the genetic material (mutations) these have new characteristics and in the course of their individual lives they are tested for optimal or better adaptation to the environmental conditions.35Immortality would disturb this system - it needs room for new and better life.28,36This is the basic problem of evolution.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-20 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("35,28,36")}
                </span>
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                "Every organism has a life span which is highly characteristic.There are striking differences in life span between different species, but within one species the parameter is relatively constant",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "For example, the average duration of human life has hardly changed in thousands of years",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("29")}
                </span>
              )}{" "}
              {renderText(
                "Although more and more people attain an advanced age as a result of developments in medical care and better nutrition, the characteristic upper limit for most remains 80 years.A further argument against the simple wear and tear theory is the observation that the time within which organisms age lies between a few days (even a few hours for unicellular organisms) and several thousand years, as with mammoth trees.",
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                "If a life span is a genetically determined biological characteristic, it is logically necessary to propose the existence of an internal clock, which in some way measures and controls the ageing process and which finally determines death as the last step in a fixed programme",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Like the life span, the metabolic rate has for different organisms a fixed mathematical relationship to the body mass.In comparison to the life span this relationship is 'inverted': the larger the organism the lower its metabolic rate.Again this relationship is valid not only for birds, but also, similarly on average within the systematic unit, for all other organisms (plants, animals, unicellular organisms).",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("30")}
                </span>
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Animals which behave 'frugally' with energy become particularly old, for example, crocodiles and tortoises",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("31")}
                </span>
              )}
              {renderText(
                "Parrots and birds of prey are often held chained up.Thus they are not able to 'experience life' and so they attain a high life span in captivity.Animals which save energy by hibernation or lethargy (e.g. bats or hedgehogs) live much longer than those which are always active.The metabolic rate of mice can be reduced by a very low consumption of food (hunger diet).They then may live twice as long as their well fed comrades.Women become distinctly (about 10 per cent) older than men.If you examine the metabolic rates of the two sexes you establish that the higher male metabolic rate roughly accounts for the lower male life span.That means that they live life 'energetically' - more intensively, but not for as long.",
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "It follows from the above that sparing use of energy reserves should tend to extend life.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("32,40")}
                </span>
              )}{" "}
              {renderText(
                "Extreme high performance sports may lead to optimal cardiovascular performance, but they quite certainly do not prolong life.Relaxation lowers metabolic rate, as does adequate sleep and in general an equable and balanced personality.Each of us can develop his or her own 'energy saving programme' with a little self-observation, critical self-control and, above all, logical consistency.Experience will show that to live in this way not only increases the life span but is also very healthy.This final aspect should not be forgotten.",
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
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 27-32")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Reading Passage 3 has seven paragraphs, A-G.")}
                <br />
                <br />
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below.",
                )}
                <br />
                <br />
                {renderText(
                  "Choose the correct number, i-x, in boxes 27-32 on your answer sheet.",
                )}
              </h3>
              <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
                <div className="text-left">
                  <h1 className="text-xl font-bold mb-5 text-center">
                    {renderText("List of Headings")}
                  </h1>

                  <ul className="space-y-2 text-lg">
                    <li>{renderText("i. The biological clock")}</li>
                    <li>{renderText("ii. Why dying is beneficial")}</li>
                    <li>
                      {renderText("iii. The ageing process of men and women")}
                    </li>
                    <li>{renderText("iv. Prolonging your life")}</li>
                    <li>{renderText("v. Limitations of life span")}</li>
                    <li>
                      {renderText(
                        "vi. Modes of development of different species",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "vii. A stable life span despite improvements",
                      )}
                    </li>
                    <li>{renderText("viii. Energy consumption")}</li>
                    <li>
                      {renderText(
                        "ix. Fundamental differences in ageing of objects and organisms",
                      )}
                    </li>
                    <li>{renderText("x. Repair of genetic material")}</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>
          {/* optional question */}
          <div className="space-y-3">
            {/* ---------- Question 27 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("27")}</span>
              <span>{renderText("Paragraph B")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("27")}</option>
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
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 28 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("28")}</span>
              <span>{renderText("Paragraph C")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("28")}</option>
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
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 29 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("29")}</span>
              <span>{renderText("Paragraph D")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("29")}</option>
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
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 30 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("30")}</span>
              <span>{renderText("Paragraph E")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("30")}</option>
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
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 31 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("31")}</span>
              <span>{renderText("Paragraph F")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("31")}</option>
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
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 32 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("32")}</span>
              <span>{renderText("Paragraph G")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[32] || ""}
                  onChange={(e) => handleInputChange(32, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("32")}</option>
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
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          <br />

          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 33-36")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("NO MORE THAN TWO WORDS")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 33-36 on your answer sheet.",
              )}
            </h1>

            <br />
          </div>

          {/* answer box */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <ul className="list-disc list-inside space-y-4">
              {/* ---------- Question 33 ---------- */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("Objects age in accordance with principles of")}
                <button
                  onClick={() => toggleButton(33)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[33]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  33
                </button>
                <input
                  value={userAnswers[33] || ""}
                  onChange={(e) => handleInputChange(33, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                .
              </p>

              {/* ---------- Question 34 ---------- */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("and of")}
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
                  value={userAnswers[34] || ""}
                  onChange={(e) => handleInputChange(34, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                .
              </p>

              {/* ---------- Question 35 ---------- */}
              <p className="text-lg flex items-center flex-wrap">
                {renderText("Through mutations, organisms can")}
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
                {renderText("better to the environment.")}
              </p>

              {/* ---------- Question 36 ---------- */}
              <p className="text-lg flex items-center flex-wrap">
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
                {renderText(
                  "would pose a serious problem for the theory of evolution.",
                )}
              </p>
            </ul>
          </div>
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 37-40")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 37-40 on your answer sheet, choose")}
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
              <h2 className="text-lg font-bold">Questions 37-40</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 37;
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
      <Reading3Pagination2011></Reading3Pagination2011>
    </div>
  );
};

export default Reading3Part32011;
