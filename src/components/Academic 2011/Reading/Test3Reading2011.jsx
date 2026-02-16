import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";



//  Marks show

const Test3Reading2011= () => {
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
    "Power companies have given Diels enough money to develop his laser.",
    "Obtaining money to improve the lasers will depend on tests in real storms..",
    "Weather forecasters are intensely interested in Diels's system.",
  
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
 const question2 = [
   "The main topic discussed in the text is",
   "According to the text, every year lightning",
   "Researchers at the University of Florida and at the University of New Mexico",
 ];

 const options2 = [
   [
     "A. the damage caused to US golf courses and golf players by lightning strikes.",
     "B. the effect of lightning on power supplies in the US and in Japan.",
     "C. a variety of methods used in trying to control lightning strikes.",
     "D. a laser technique used in trying to control lightning strikes.",
   ],
   [
     "A. does considerable damage to buildings during thunderstorms.",
     "B. kills or injures mainly golfers in the United States.",
     "C. kills or injures around 500 people throughout the world.",
     "D. damages more than 100 American power companies.",
   ],
   [
     "A. receive funds from the same source.",
     "B. are using the same techniques",
     "C. are employed by commercial companies.",
     "D. are in opposition to each other",
   ],
 ];


  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
const handleOptionClick = (qIndex, option) => {
  const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
  updatedOptions[qIndex] = option;
  setSelectedOptions(updatedOptions);

  setUserAnswers((prev) => {
    const answerKey = qIndex + 11;
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
  // Questions 1-3
  1: "C. a variety of methods used in trying to control lightning strikes.",
  2: "b. kills or injures mainly golfers in the united states.",
  3: "b. are using the same techniques",

  // Questions 4-6
  4: "E",
  5: "D",
  6: "A",

  // Questions 7-10 (Controlling Lightning with Lasers)
  7: "B",
  8: "C",
  9: "G",
  10: "D",

  // Questions 11-13 (YES / NO / NOT GIVEN)
  11: "NO",
  12: "YES",
  13: "NOT GIVEN",
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
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Striking Back at Lightning With Lasers")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "Seldom is the weather more dramatic than when thunderstorms strike. Their electrical fury inflicts death or serious injury on around 500 people each year in the United States alone. As the clouds roll in, a leisurely round of golf can become a terrifying dice with death - out in the open, a lone golfer may be a lightning bolt's most inviting target.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(" And there is damage to property too.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "Lightning damage costs American power companies more than $100 million a year.",
              )}
            </p>

            <br />

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "Researchers in the United States and Japan are planning to hit back.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " Already in laboratory trials they have tested strategies for neutralising the power of thunderstorms, and this winter they will brave real storms, equipped with an armoury of lasers that they will be pointing towards the heavens to discharge thunderclouds before lightning can strike.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "The idea of forcing storm clouds to discharge their lightning on command is not new. In the early 1960s, researchers tried firing rockets trailing wires into thunderclouds to set up an easy discharge path for the huge electric charges that these clouds generate. The technique survives to this day at a test site in Florida run by the University of Florida, with support from the Electrical Power Research Institute (EPRI), based in California. EPRI, which is funded by power companies, is looking at ways to protect the United States' power grid from lightning strikes.",
              )}
            </p>

            <br />

            {/* Paragraph 5 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "But while rockets are fine for research, they cannot provide the protection from lightning strikes that everyone is looking for. ",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
              {renderText(
                " The rockets cost around $1,200 each, can only be fired at a limited frequency and their failure rate is about 40 per cent. And even when they do trigger lightning, things still do not always go according to plan.",
              )}
            </p>

            <br />

            {/* Paragraph 6 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "Jean-Claude Diels of the University of New Mexico is leading a project, backed by EPRI, to try to use lasers to discharge lightning safely. With around $500,000 invested so far, a promising system is just emerging from the laboratory.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3,5")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 7 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "The idea began some 20 years ago, when high-powered lasers were revealing their ability to extract electrons out of atoms and create ions. If a laser could generate a line of ionisation in the air all the way up to a storm cloud, this conducting path could be used to guide lightning to Earth, before the electric field becomes strong enough to break down the air in an uncontrollable surge.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 8 */}
            <p className="text-lg">
              {renderText(
                "To stop the laser itself being struck, it would not be pointed straight at the clouds. Instead it would be directed at a mirror, and from there into the sky. The mirror would be protected by placing lightning conductors close by. Ideally, the cloud-zapper would be cheap enough to be installed around all key power installations, and portable enough to be taken to international sporting events.",
              )}
            </p>

            <br />

            {/* Paragraph 9 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "However, there is still a big stumbling block. The laser is no nifty portable: it's a monster that takes up a whole room.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
              {renderText(
                " Diels is trying to cut down the size and says that a laser around the size of a small table is in the offing. He plans to test this more manageable system on live thunderclouds next summer.",
              )}
            </p>

            <br />

            {/* Paragraph 10 */}
            <p className="text-lg">
              {renderText(
                "Bernstein says that Diels's system is attracting lots of interest from the power companies.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But they have not yet come up with the $5 million that EPRI says will be needed to develop a commercial system, by making the lasers yet smaller and cheaper. Bernstein reckons that the forthcoming field tests will be the turning point - and he's hoping for good news.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11,12")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 11 */}
            <p className="text-lg">
              {renderText(
                "Other scientists could also benefit. With a lightning 'switch' at their fingertips, materials scientists could find out what happens when mighty currents meet matter. Diels also hopes to see the birth of 'interactive meteorology' - not just forecasting the weather but controlling it. If we could discharge clouds, we might affect the weather.",
              )}
            </p>

            <br />

            {/* Paragraph 12 */}
            <p className="text-lg">
              {renderText(
                "Diels also suggests that lightning could be used to prevent hail, and that thunder may trigger torrential rain. A laser thunder factory could shake the moisture out of clouds, perhaps preventing giant hailstones that threaten crops. With luck, as the storm clouds gather this winter, laser-toting researchers could, for the first time, strike back.",
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
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 1-3")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B ,C or D")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 1;

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

            <h1 className="text-lg font-bold">{renderText("Questions 4-6")}</h1>
            <p>
              {renderText(
                "Look at the following statements (Questions 4-6) and the list of people below.",
              )}
            </p>
            <p>
              {renderText("Match each statement with the correct person,")}
              <span className="font-bold text-lg">{renderText(" A-I")}</span>.
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A-I, in boxes 4-6 on your answer sheet.",
              )}
            </p>
            <p>{renderText("NB You may use any letter more than once.")}</p>
            <div className="border-2 border-black rounded-lg p-5 mt-5">
              <p className="text-2xl font-bold text-center mb-4">
                {renderText("Laser Lightning Research")}
              </p>

              <p className="flex items-center gap-2 flex-wrap mb-4">
                {renderText("EPRI receives financial support from")}
                {/* ---- Box for 4 ---- */}
                <div className="relative w-40">
                  <select
                    value={userAnswers[4] || ""}
                    onChange={(e) => handleInputChange(4, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="4">{renderText("4")}</option>
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
                .
              </p>

              <p className="flex items-center gap-2 flex-wrap mb-4">
                {renderText(
                  "The advantage of the technique being developed by Diels is that it can be used",
                )}
                {/* ---- Box for 5 ---- */}
                <div className="relative w-40">
                  <select
                    value={userAnswers[5] || ""}
                    onChange={(e) => handleInputChange(5, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="5">{renderText("5")}</option>
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
                .
              </p>

              <p className="flex items-center gap-2 flex-wrap mb-4">
                {renderText(
                  "The main difficulty associated with using the laser equipment is related to its",
                )}
                {/* ---- Box for 6 ---- */}
                <div className="relative w-40">
                  <select
                    value={userAnswers[6] || ""}
                    onChange={(e) => handleInputChange(6, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="6">{renderText("6")}</option>
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
                .
              </p>
            </div>

            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 4-6")}
              </h1>
              <p>
                {renderText(
                  "Look at the following statements (Questions 32-36) and the list of people below.",
                )}
              </p>
              <p>
                {renderText("Match each statement with the correct person,")}
                <span className="font-bold text-lg">{renderText(" A-I")}</span>.
              </p>
              <p>
                {renderText(
                  "Choose the correct letter, A-I, in boxes 27-31 on your answer sheet.",
                )}
              </p>
              <p>{renderText("NB You may use any letter more than once.")}</p>
              //
              {/* ---------- List of People ---------- */}
              <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. cloud-zappers")}</li>
                    <li>{renderText("B. atoms")}</li>
                    <li>{renderText("C. storm clouds")}</li>
                    <li>{renderText("D. mirrors")}</li>
                    <li>{renderText("E. technique")}</li>
                    <li>{renderText("F. ions")}</li>
                    <li>{renderText("G. rockets")}</li>
                    <li>{renderText("H. conductors")}</li>
                    <li>{renderText("I. thunder")}</li>
                  </ul>
                </div>
              </div>
              {/* ---------- Laser Lightning Passage ---------- */}
              <div className="border-2 border-black rounded-lg p-5 mt-5">
                <p className="text-2xl font-bold text-center mb-4">
                  {renderText("Controlling Lightning with Lasers")}
                </p>

                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(
                    "In this method, a laser is used to create a line of ionisation by removing electrons from",
                  )}
                  {/* ---- Box for 7 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="7">{renderText("7")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                      <option value="I">{renderText("I")}</option>
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  {renderText(". This laser is then directed at")}
                  {/* ---- Box for 8 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="8">{renderText("8")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                      <option value="I">{renderText("I")}</option>
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  {renderText(
                    "in order to control electrical charges, a method which is less dangerous than using",
                  )}
                  {/* ---- Box for 9 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="9">{renderText("9")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                      <option value="I">{renderText("I")}</option>
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  {renderText(
                    ". As a protection for the lasers, the beams are aimed firstly at",
                  )}
                  {/* ---- Box for 10 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="10">{renderText("10")}</option>
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
                  .
                </p>
              </div>
            </div>
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 11-13")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 36-40 on your answer sheet, choose")}
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
              <h2 className="text-lg font-bold">Questions 11-13</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 11;
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
                    Your Score: {score}/14
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
      {/* <Reading4Pagination2020></Reading4Pagination2020> */}
    </div>
  );
};

export default Test3Reading2011;
