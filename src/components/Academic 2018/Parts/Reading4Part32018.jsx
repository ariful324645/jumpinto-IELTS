import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2018 from "../Pagination2018/Reading4Pagination2018";

//  Marks show

const Reading1Part32018 = () => {
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
    "One strength of The Happiness Industry is its discussion of the relationship between psychology and economics.",
    "It is more difficult to measure some emotions than others.",
    "Watson's ideas on behaviourism were supported by research on humans he carried out before 1915.",
    "Watson's ideas have been most influential on governments outside America.",
    "The need for happiness is linked to industrialisation.",
    "A main aim of government should be to increase the happiness of the population.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  // different option
const question2 = [
  "What is the reviewer's attitude to advocates of positive psychology?",
  "The reviewer refers to the Greek philosopher Aristotle in order to suggest that happiness",
  "According to Davies, Bentham's suggestion for linking the price of goods to happiness was significant because",
];

const options2 = [
  [
    "A. They are wrong to reject the ideas of Bentham.",
    "B. They are over-influenced by their study of Bentham's theories.",
    "C. They have a fresh new approach to ideas on human happiness.",
    "D. They are ignorant about the ideas they should be considering.",
  ],

  [
    "A. may not be just pleasure and the absence of pain.",
    "B. should not be the main goal of humans.",
    "C. is not something that should be fought for.",
    "D. is not just an abstract concept.",
  ],

  [
    "A. it was the first successful way of assessing happiness.",
    "B. it established a connection between work and psychology.",
    "C. it was the first successful example of psychological research.",
    "D. it involved consideration of the rights of consumers.",
  ],
];


  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 35;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };
  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 27;
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
    localStorage.setItem("/reading4Part32018", newScore);
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
   27: "D. They are ignorant about the ideas they should be considering.",
   28: "A. may not be just pleasure and the absence of pain.",
   29: "A. it was the first successful way of assessing happiness.",
   30: "F",
   31: "D",
   32: "G",
   33: "E",
   34: "A",

   35: "YES",
   36: "NOT GIVEN",
   37: "NO",
   38: "NOT GIVEN",
   39: "YES",
   40: "NO",
 };


  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32018");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32018");
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
              {renderText("Book Review")}
            </h1>
            <h1 className="text-xl font-bold italic mb-5 text-center">
              {renderText(
                "The Happiness Industry: How the Government and Big Business Sold Us Well-Being"
              )}
            </h1>

            <p className="text-lg">
              {" "}
              {renderText(
                `"Happiness is the ultimate goal because it is self-evidently good. If we are asked why happiness matters we can give no further external reason. It just obviously does matter." This pronouncement by Richard Layard, an economist and advocate of 'positive psychology', summarises the beliefs of many people today.`
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "For Layard and others like him, it is obvious that the purpose of government is to promote a state of collective well-being. The only question is how to achieve it, and here positive psychology—a supposed science that not only identifies what makes people happy but also allows their happiness to be measured—can show the way. Equipped with this science, they say, governments can secure happiness in society in a way they never could in the past."
              )}
            </p>

            <br />

            <p className="text-lg">
              {" "}
              {renderText(
                "It is an astonishingly crude and simple-minded way of thinking, and for that very reason increasingly popular. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Those who think in this way are oblivious to the vast philosophical literature in which the meaning and value of happiness have been explored and questioned, and write as if nothing of any importance had been thought on the subject until it came to their attention."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "It was the philosopher Jeremy Bentham (1748-1832) who was more than anyone else responsible for the development of this way of thinking. For Bentham it was obvious that the human good consists of pleasure and the absence of pain. "
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The Greek philosopher Aristotle may have identified happiness with self-realisation in the 4th century BC, and thinkers throughout the ages may have struggled to reconcile the pursuit of happiness with other human values, but for Bentham all this was mere metaphysics or fiction.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Without knowing anything much of him or the school of moral theory he established—since they are by education and intellectual conviction illiterate in the history of ideas—our advocates of positive psychology follow in his tracks in rejecting as outmoded and irrelevant pretty much the entirety of ethical reflection on human happiness to date."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "But as William Davies notes in his recent book 'The Happiness Industry', the view that happiness is the only self-evident good is actually a way of limiting moral inquiry. One of the virtues of this rich, lucid and arresting book is that it places the current cult of happiness in a well-defined historical framework. Rightly, Davies begins his story with Bentham, noting that he was far more than a philosopher."
              )}
            </p>

            <br />

            <p className="text-lg">
              {" "}
              {renderText(
                'Davies writes, "Bentham\'s activities were those which we might now associate with a public sector management consultant".'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  ' In the 1790s, he wrote to the Home Office suggesting that the departments of government be linked together through a set of "conversation tubes", and to the Bank of England with a design for a printing device that could produce unforgeable banknotes.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30,31")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  `He drew up plans for a 'frigidarium' to keep provisions such as meat, fish, fruit and vegetables fresh.`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
                {renderText(
                  `His celebrated design for a prison to be known as a 'Panopticon', in which prisoners would be kept in solitary confinement while being visible at all times to the guards, was very nearly adopted. `
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
              {renderText(
                " (Surprisingly, Davies does not discuss the fact that Bentham meant his Panopticon not just as a model prison but also as an instrument of control that could be applied to schools and factories.)"
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Bentham was also a pioneer of the science of happiness. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If happiness is to be regarded as a science, it has to be measured, and Bentham suggested two ways in which this might be done."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>
              {renderText(
                " Viewing happiness as a complex of pleasurable sensations, he suggested that it might be quantified by measuring the human pulse rate. Alternatively, money could be used as the standard for quantification: if two different goods have the same price, it can be claimed that they produce the same quantity of pleasure in the consumer. Bentham was more attracted by the latter measure."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'By associating money so closely to inner experience, Davies writes, Bentham "set the stage for the entangling of psychological research and capitalism that would shape the business practices of the twentieth century".'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
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
                {renderText(
                  `The 'Happiness Industry' describes how the project of a science of happiness has become integral to capitalism.`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
              {renderText(
                " We learn much that is interesting about how economic problems are being redefined and treated as psychological maladies. In addition, Davies shows how the belief that inner states of pleasure and displeasure can be objectively measured has informed management studies and advertising. The tendency of thinkers such as J.B. Watson, the founder of behaviourism, was that human beings could be shaped, or manipulated, by policymakers and managers. Watson had no factual basis for his view of human action."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " When he became president of the American Psychological Association in 1915, he 'had never even studied a single human being': his research had been confined to experiments on white rats."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Yet Watson's reductive model is now widely applied, with 'behaviour change' becoming the goal of governments: in Britain, a 'Behaviour Insights Team' has been established by the government to study how people can be encouraged, at minimum cost to the public purse, to live in what are considered to be socially desirable ways."
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
                  "Modern industrial societies appear to need the possibility of ever-increasing happiness to motivate them in their labours. "
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
                {renderText(
                  "But whatever its intellectual pedigree, the idea that governments should be responsible for promoting happiness is always a threat to human freedom."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
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
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 27-31")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B ,C or D")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 27;

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg">
                      {answerKey}. {q}
                    </h3>

                    <ul className="flex flex-col gap-2 ml-4">
                      {options2[qIndex].map((option, oIndex) => {
                        const isSelected = selectedOptions[qIndex] === option;

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

            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 30-34")}
              </h1>

              <p>
                {renderText(
                  "Complete the summary using the list of words or phrases below."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-G, in boxes 30-34 on your answer sheet."
                )}
              </p>

              {/* ---------- List of Words/Phrases ---------- */}
              <div className="flex items-center justify-center border border-black py-4 px-4 w-80 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. measurement")}</li>
                    <li>{renderText("B. security")}</li>
                    <li>{renderText("C. implementation")}</li>
                    <li>{renderText("D. profits")}</li>
                    <li>{renderText("E. observation")}</li>
                    <li>{renderText("F. communication")}</li>
                    <li>{renderText("G. preservation")}</li>
                  </ul>
                </div>
              </div>

              {/* ---------- Questions 30–34 ---------- */}
              <div className="border-2 border-black rounded-lg p-5">
                <p className="text-2xl font-bold text-center mb-4">
                  {renderText("Jeremy Bentham")}
                </p>

                <p className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="font-bold text-lg">{renderText("30.")}</span>
                  <span>
                    {renderText(
                      "Jeremy Bentham suggested a type of technology to improve"
                    )}
                  </span>
                  <select
                    value={userAnswers[30] || ""}
                    onChange={(e) => handleInputChange(30, e.target.value)}
                    className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
                  >
                    <option value="30">30</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </p>

                <p className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="font-bold text-lg">{renderText("31.")}</span>
                  <span>
                    {renderText(
                      "He developed a new way of printing banknotes to increase"
                    )}
                  </span>
                  <select
                    value={userAnswers[31] || ""}
                    onChange={(e) => handleInputChange(31, e.target.value)}
                    className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
                  >
                    <option value="31">31</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </p>

                <p className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="font-bold text-lg">{renderText("32.")}</span>
                  <span>{renderText("He also designed a method for the")}</span>
                  <select
                    value={userAnswers[32] || ""}
                    onChange={(e) => handleInputChange(32, e.target.value)}
                    className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
                  >
                    <option value="32">32</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </p>

                <p className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="font-bold text-lg">{renderText("33.")}</span>
                  <span>
                    {renderText(
                      "He also drew up plans for a prison which allowed the"
                    )}
                  </span>
                  <select
                    value={userAnswers[33] || ""}
                    onChange={(e) => handleInputChange(33, e.target.value)}
                    className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
                  >
                    <option value="33">33</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </p>

                <p className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="font-bold text-lg">{renderText("34.")}</span>
                  <span>
                    {renderText(
                      "When researching happiness, he investigated possibilities for its"
                    )}
                  </span>
                  <select
                    value={userAnswers[34] || ""}
                    onChange={(e) => handleInputChange(34, e.target.value)}
                    className="mx-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32 focus:outline-none focus:border-blue-400"
                  >
                    <option value="34">34</option>
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
            </div>
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 35-40")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?"
              )}{" "}
              <br /> <br />
              {renderText("In boxes 35-40 on your answer sheet, choose")}
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
              <h2 className="text-lg font-bold">Questions 35-40</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 35;
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
      <Reading4Pagination2018></Reading4Pagination2018>
    </div>
  );
};

export default Reading1Part32018;
