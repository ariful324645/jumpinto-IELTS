import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading3Pagination2009 from "../Pagination 2009/Reading3Pagination2009";

//  Marks show

const Reading3Part22009 = () => {
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
const question2 = ["Christy Turner's research involved the examination of"];

const options2 = [
  [
    "A. teeth from both prehistoric and modern Americans and Asians.",
    "B. thousands of people who live in either the New or the Old World.",
    "C. dental specimens from the majority of prehistoric Americans.",
    "D. the eating habits of American and Asian populations.",
  ],
];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );

  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions2]; // ✅ use selectedOptions2
    updatedOptions[qIndex] = option;
    setSelectedOptions2(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 26;
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
  // Questions 14–19 (Heading Matching)
  14: "iv", // Developments in the methods used to study early population movements
  15: "vii", // Long-standing questions about prehistoric migration to America
  16: "x", // How analysis of blood-variants measures closeness of relationship
  17: "i", // Results of research into blood-variants
  18: "vi", // Further genetic evidence relating to the three-wave theory
  19: "ii", // Dental evidence

  // Questions 20–21 (Route / Period)
  20: "A", // First wave (15,000+ years ago)
  21: "A", // Second wave (600–700 years ago / Na-Dene)

  // Questions 22–25 (Wave Classification)
  22: "C", // Inuit → Third wave
  23: "B", // Apache → Second wave
  24: "A", // Pima-Papago → First wave
  25: "A", // Ticuna → First wave

  // Question 40 (Multiple Choice)
  26: "A. teeth from both prehistoric and modern Americans and Asians.", // Teeth from both prehistoric and modern Americans and Asians
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
              {renderText("Population movements and genetics")}
            </h1>
            {/* A */}
            <h1 className="text-2xl font-bold mb-5">{renderText("A")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Study of the origins and distribution of human populations used to be based on archaeological and fossil evidence.",
                )}
              </span>

              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " A number of techniques developed since the 1950s have placed the study on a more objective footing.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-2">
                    14
                  </span>
                )}
              </span>

              {renderText(
                " The best information on early population movements is now obtained from genetic material.",
              )}
            </p>
            <br />
            {/* B */}{" "}
            <h1 className="text-2xl font-bold mb-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Recent work on the problem of when people first entered the Americas is an example of the value of these new techniques.North-east Asia and Siberia have long been accepted as the launching ground for the first human colonisers of the New World",
              )}

              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " But was there one major wave of migration across the Bering Strait into the Americas, or several?15And when did this event, or events, take place?",
                )}
              </span>

              {renderText(
                " But was there one wave of migration across the Bering Strait or several?",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-2">
                  15
                </span>
              )}
              {renderText(
                "In recent years, new clues have come from research into genetics, including the distribution of genetic markers in modern Native Americans",
              )}
            </p>
            <br />
            {/* C — ✅ 16 Added */}{" "}
            <h1 className="text-2xl font-bold mb-5">{renderText("C")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                "An important project, led by the biological anthropologist Robert Williams, focused on the variants (called Gm allotypes) of one particular protein immunoglobin G - found in the fluid portion of human blood.All proteins 'drift', or produce variants, over the generations, and members of an interbreeding human population will share a set of such variants.",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Robert Williams studied variants (Gm allotypes) of immunoglobin G found in human blood.",
                )}
              </span>
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Thus, by comparing the Gm allotypes of two different populations (e.g. two Indian tribes), one can establish their genetic 'distance', which itself can be calibrated to give an indication of the length of time since these populations last interbred",
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-2">
                    16
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* D */}{" "}
            <h1 className="text-2xl font-bold mb-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "Williams and his colleagues sampled the blood of over 5,000 American Indians in western North America during a twenty-year period",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " They found that their Gm allotypes could be divided into two groups, one of which also corresponded to the genetic typing of Central and South American Indians.Other tests showed that the Inuit (or Eskimo) and Aleut* formed a third group.From this evidence it was deduced that there had been three major waves of migration across the Bering Strait.The first, Paleo-Indian, wave more than 15,000 years ago was ancestral to all Central and South American Indians.20,24,25The second wave, about 14,000-12,000 years ago, brought Na-Dene hunters, ancestors of the Navajo and Apache (who only migrated south from Canada about 600 or 700 years ago).The third wave, perhaps 10,000 or 9,000 years ago, saw the migration from North-east Asia of groups ancestral to the modern Eskimo and Aleut.",
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-36 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-2">
                    17,20,21,22,23,24
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* E — ✅ 18 Added */}{" "}
            <h1 className="text-2xl font-bold mb-5">{renderText("E")}</h1>
            <p className="text-lg">
              {" "}
              {renderText(
                "How far does other research support these conclusions?",
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}></span>
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " Geneticist Douglas Wallace has studied mitochondrial DNA* in blood samples from three widely separated Native American groups: Pima-Papago Indians in Arizona, Maya Indians on the Yucatán peninsula, Mexico, and Ticuna Indians in the Upper Amazon region of Brazil.18As would have been predicted by Robert Williams's work, all three groups appear to be descended from the same ancestral (Paleo-Indian) population.",
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-28 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-2">
                    18,24,25
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* F — ✅ 19 Added */}{" "}
            <h1 className="text-2xl font-bold mb-5">{renderText("F")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "There are two other kinds of research that have thrown some light on the origins of the Native American population; they involve the study of teeth and of languages.19The biological anthropologist Christy Turner is an expert in the analysis of changing physical characteristics in human teeth.He argues that tooth crowns* and roots* have a high genetic component, minimally affected by environmental and other factors.Studies carried out by Turner of many thousands of New and Old World specimens, both ancient and modern, suggest that the majority of prehistoric Americans are linked to Northern Asian populations by crown and root traits such as incisor* shoveling (a scooping out on one or both surfaces of the tooth), single-rooted upper first premolars* and triple-rooted lower first molars",
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 text-white font-semibold rounded-sm ml-2">
                    19,26
                  </span>
                )}
              </span>
              {renderText(
                "According to Turner, this ties in with the idea of a single Paleo-lndian migration out of North Asia, which he sets at before 14,000 years ago by calibrating rates of dental micro-evolution.Tooth analyses also suggest that there were two later migrations of Na-Denes and Eskimo-Aleut.",
              )}
            </p>
            <br />
            {/* G */}{" "}
            <h1 className="text-2xl font-bold mb-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "The linguist Joseph Greenberg has, since the 1950s, argued that all Native American languages belong to a single 'Amerind' family, except for Na-Dene and Eskimo-Aleut - a view that gives credence to the idea of three main migrations.Greenberg is in a minority among fellow linguists, most of whom favour the notion of a great many waves of migration to account for the more than 1,000 languages spoken at one time by American Indians.But there is no doubt that the new genetic and dental evidence provides strong backing for Greenberg's view.Dates given for the migrations should nevertheless be treated with caution, except where supported by hard archaeological evidence.",
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
          {/* optional question */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14-19")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Complete the summary using the list of words or phrases below.",
              )}
              <br />
              <br />
              {renderText(
                "Choose the correct letter, A-G, in boxes 14-19 on your answer sheet.",
              )}
            </h3>

            {/* select */}
            <div className="flex items-center justify-center border border-black py-6 px-6 w-xl mx-auto">
              <div className="text-left">
                <h1 className="text-xl font-bold mb-5 text-center">
                  {renderText("List of Headings")}
                </h1>

                <ul className="space-y-2 text-lg">
                  <li>
                    {renderText(
                      "i. The results of the research into blood-variants",
                    )}
                  </li>
                  <li>{renderText("ii. Dental evidence")}</li>
                  <li>
                    {renderText(
                      "iii. Greenberg's analysis of the dental and linguistic evidence",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "iv. Developments in the methods used to study early population movements",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "v. Indian migration from Canada to the U.S.A.",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "vi. Further genetic evidence relating to the three-wave theory",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "vii. Long-standing questions about prehistoric migration to America",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "viii. Conflicting views of the three-wave theory, based on non-genetic evidence",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "ix. Questions about the causes of prehistoric migration to America",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "x. How analysis of blood-variants measures the closeness of the relationship between different populations",
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <br />
          </div>
          <div className="space-y-4 text-lg">
            {/* 14 */}
            <div>
              {renderText("14 Section A")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">14</option>
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
            </div>

            {/* 15 */}
            <div>
              {renderText("15 Section B")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">15</option>
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
            </div>

            {/* 16 */}
            <div>
              {renderText("16 Section C")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">16</option>
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
            </div>

            {/* 17 */}
            <div>
              {renderText("17 Section D")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">17</option>
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
            </div>

            {/* 18 */}
            <div>
              {renderText("18 Section E")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">18</option>
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
            </div>

            {/* 19 */}
            <div>
              {renderText("19 Section F")}
              <div className="relative w-40 inline-block mx-3">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                >
                  <option value="">19</option>
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
            </div>
          </div>
          <br /> <br />
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 20-21")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Complete the summary using the list of words or phrases below.",
              )}
              <br />
              <br />
              {renderText(
                "Choose the correct letter, A-F, in boxes 20-21 on your answer sheet.",
              )}
            </h3>
            {/* image */}
            <div className="flex items-center justify-center">
              <img
                className="w-auto h-auto"
                src="https://i.ibb.co.com/GQ76yV9z/a7t3r2.jpg"
                alt="Eikhane image bosabo"
              />
            </div>

            <div>
              <div>
                {renderText(
                  "20.Period (number of years ago): 15,000 or more; Route:",
                )}
                <div className="relative w-40 inline-block mx-3">
                  <select
                    value={userAnswers[20] || ""}
                    onChange={(e) => handleInputChange(20, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">20</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* 15 */}
              <div>
                {renderText(
                  "21.Period (number of years ago): 600 to 700; Route:",
                )}
                <div className="relative w-40 inline-block mx-3">
                  <select
                    value={userAnswers[21] || ""}
                    onChange={(e) => handleInputChange(21, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">21</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 22-25")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Reading Passage 2 refers to the three-wave theory of early migration to the Americas. It also suggests in which of these three waves the ancestors of various groups of modern native Americans first reached the continent.",
              )}
              <br />
              <br />
              {renderText(
                "Choose the correct letter, A-C, next to Questions 22-25.",
              )}
              <br />
              <br />
              {renderText(
                "Classify the groups named in the table below as originating from",
              )}
              <br />
              {renderText("A. the first wave")}
              <br />
              {renderText("B. the second wave")}
              <br />
              {renderText("C. the third wave")}
            </h3>

            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 22-25")}
              </h2>

              {/* 22 */}
              <div>
                {renderText("22 Name of group: 'Inuit'; wave number:")}
                <div className="relative w-40 inline-block mx-3">
                  <select
                    value={userAnswers[22] || ""}
                    onChange={(e) => handleInputChange(22, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">22</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>{" "}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* 23 */}
              <div>
                {renderText("23 Name of group: 'Apache'; wave number:")}
                <div className="relative w-40 inline-block mx-3">
                  <select
                    value={userAnswers[23] || ""}
                    onChange={(e) => handleInputChange(23, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">23</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>{" "}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* 24 */}
              <div>
                {renderText("24 Name of group: 'Pima-Papago'; wave number:")}
                <div className="relative w-40 inline-block mx-3">
                  <select
                    value={userAnswers[24] || ""}
                    onChange={(e) => handleInputChange(24, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">24</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>{" "}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>

              {/* 25 */}
              <div>
                {renderText("25 Name of group: 'Ticuna'; wave number:")}
                <div className="relative w-40 inline-block mx-3">
                  <select
                    value={userAnswers[25] || ""}
                    onChange={(e) => handleInputChange(25, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">25</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>{" "}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">{renderText("Questions 40")}</h2>
            <p className="text-xl">
              {renderText("Choose the correct letter,")}
              <span className="font-bold">{renderText(" A, B ,C or D")}</span>
            </p>

            {question2.map((q, qIndex) => {
              const answerKey = qIndex + 26;

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
      <Reading3Pagination2009></Reading3Pagination2009>
    </div>
  );
};

export default Reading3Part22009;
