import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2019 from "../Pagination/Reading4Pagination2019";

//  Marks show

const Reading4Part32019 = () => {
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
    "Rochman and her colleagues were the first people to research the problem of marine debris.",
    "The creatures most in danger from ocean trash are certain seabirds..",
    "The studies Rochman has reviewed have already proved that populations of some birds will soon become extinct.",
    "Rochman analysed papers on the different kinds of danger caused by ocean trash.",
    "Most of the research analysed by Rochman and her colleagues was badly designed.",
    "One study examined by Rochman was expecting to find that mussels were harmed by eating plastic.",
    "Some mussels choose to eat plastic in preference to their natural diet.",
  ];

  const options = ["FALSE", "TRUE", "NOT GIVEN"];

  //   second
  // different option
  const question2 = ["What would be the best title for this passage?"];

  const options2 = [
    [
      "A. Assessing the threat of marine debris",
      "B. Marine debris: who is to blame?",
      "C. A new solution to the problem of marine debris",
      "Marine debris: the need for international action",
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
      const answerKey = qIndex + 27;
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
  // Questions 27-33 (TRUE/FALSE/NOT GIVEN)
  27: "NOT GIVEN",
  28: "NOT GIVEN",
  29: "FALSE",
  30: "TRUE",
  31: "FALSE",
  32: "TRUE",
  33: "NOT GIVEN",

  34: "large",
  35: "microplastics",
  36: "populations",
  37: "concentration",
  38: "population",
  39: "disasters",

  40: "A. Assessing the threat of marine debris",
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
              {renderText("Marine Debris Impact Study")}
            </h1>

            <p className="text-lg font-bold italic text-center">
              {renderText(
                "Chelsea Rochman, an ecologist at the University of California, Davis, has been trying to answer a dismal question: Is everything terrible, or are things just very, very bad?"
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
                  "Rochman is a member of the National Center for Ecological Analysis and Synthesis's marine-debris working group, a collection of scientists who study, among other things, the growing problem of marine debris, also known as ocean trash."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}{" "}
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
                  "Plenty of studies have sounded alarm bells about the state of marine debris; in a recent paper published in the journal Ecology, Rochman and her colleagues set out to determine how many of those perceived risks are real."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30,40")}
                  </span>
                )}{" "}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Often, Rochman says, scientists will end a paper by speculating about the broader impacts of what they've found. For example, a study could show that certain seabirds eat plastic bags, and go on to warn that whole bird populations are at risk of dying out. \"There wasn't a lot of information.\""
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  ` "But the truth was that nobody had yet tested those perceived threats," Rochman says.`
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}{" "}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Rochman and her colleagues examined more than a hundred papers on the impacts of marine debris that were published through 2013. Within each paper, they asked what threats scientists had studied—366 perceived threats in all—and what they'd actually found."
              )}
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
                  ` In 83 percent of cases, the perceived dangers of ocean trash were proven true.`
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                " In the remaining cases, the working group found the studies had weaknesses in design and content which affected the validity of their conclusions—they lacked a control group, for example, or used faulty statistics."
              )}
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
                  `Strikingly, Rochman says, only one well-designed study failed to find the effect it was looking for, an investigation of mussels ingesting microscopic plastic bits. `
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                "The plastic moved from the mussels' stomachs to their bloodstreams, scientists found, and stayed there for weeks—but didn't seem to stress out the shellfish."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "While mussels may be fine eating trash, though, the analysis also gave a clearer picture of the many ways that ocean debris is bothersome."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Within the studies they looked at, most of the proven threats came from plastic debris, rather than other materials like metal or wood. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  `Most of the dangers also involved large pieces of debris—animals getting entangled in trash, for example, or eating it and severely injuring themselves`
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}{" "}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "But a lot of ocean debris is 'microplastic', or pieces smaller than five millimeters. These may be ingredients used in cosmetics and toiletries, fibers shed by synthetic clothing in the wash, or eroded remnants of larger debris."
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  ` Compared to the number of studies investigating large-scale debris, Rochman's group found little research on the effects of these tiny bits. `
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                ".'There are a lot of open questions still for microplastic,' Rochman says, though she notes that more papers on the subject have been published since 2013, the cutoff point for the group's analysis."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "There are also, she adds, a lot of open questions about the ways that ocean debris can lead to sea-creature death. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  ` Many studies have looked at how plastic affects an individual animal, or that animal's tissues or cells, rather than whole populations.`
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
                {renderText(
                  ` And in the lab, scientists often use higher concentrations of plastic than what's really in the ocean.`
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
                {renderText(
                  `   None of that tells us how many birds or fish or sea turtles could die from plastic pollution—or how deaths in one species could affect that animal's predators, or the rest of the ecosystem.`
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"We need to be asking more ecologically relevant questions," Rochman says. Usually, scientists don\'t know exactly how disasters such as a tanker accidentally spilling its whole cargo of oil and polluting huge areas of the ocean will affect the environment until after they\'ve happened. "We don\'t ask the right questions early enough," she says. But if ecologists can understand how the slow-moving effect of ocean trash is damaging ecosystems, they might be able to prevent things from getting worse.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Asking the right questions can help policy makers, and the public, figure out where to focus their attention. The problems that look or sound most dramatic may not be the best places to start. For example, the name of the 'Great Pacific Garbage Patch'—a collection of marine debris in the northern Pacific Ocean—might conjure up a vast, floating trash island. In reality though, much of the debris is tiny or below the surface; a person could sail through the area without seeing any trash at all. A Dutch group called 'The Ocean Cleanup' is currently working on plans to put mechanical devices in the Pacific Garbage Patch and similar areas to suck up plastic. But a recent paper used simulations to show that strategically positioning the cleanup devices closer to shore would more effectively reduce pollution over the long term."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"I think clearing up some of these misperceptions is really important," Rochman says. Among scientists as well as in the media, she says, "A lot of the images about strandings and entanglement and all of that cause the perception that plastic debris is killing everything in the ocean." Interrogating the existing scientific literature can help ecologists figure out which problems really need addressing, and which ones they\'d be better off—like the mussels—absorbing and ignoring.'
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
            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 27-33")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 27-33 on your answer sheet, choose")}
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
                <h2 className="text-lg font-bold">Questions 27-33</h2>
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

            {/* normal title */}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 34-39")}
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
                  "Write your answers in boxes 34-39 on your answer sheet."
                )}
              </h1>

              <br />
            </div>

            {/* box text */}
            <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                {renderText("Findings related to marine debris")}
              </h1>

              <ul className="list-disc list-inside space-y-3">
                <p className="text-lg">
                  {renderText(
                    "Studies of marine debris found the biggest threats were plastic (not metal or wood) bits of debris that were"
                  )}
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
                  {renderText("(harmful to animals)")}
                </p>

                <p className="text-lg">
                  {renderText("There was little research into")}
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
                  {renderText("e.g. from synthetic fibres.")}
                </p>

                <p className="text-lg">
                  {renderText(
                    "Drawbacks of the studies examined: most of them focused on individual animals, not entire"
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
                  {renderText("The")}
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
                  {renderText(
                    "of plastic used in the lab did not always reflect those in the ocean."
                  )}
                </p>

                <p className="text-lg">
                  {renderText(
                    "There was insufficient information on numbers of animals which could be affected; the impact of a reduction in numbers on the"
                  )}
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
                  {renderText(
                    "of that species and the impact on the ecosystem."
                  )}
                </p>

                <p className="text-lg">
                  {renderText(
                    "Rochman says more information is needed on the possible impact of future"
                  )}
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
                  {renderText("(e.g. involving oil).")}
                </p>
              </ul>
            </div>

            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 40")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">
                  {renderText(" A, B , C or D")}
                </span>
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
          </div>
          <br />

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
      <Reading4Pagination2019></Reading4Pagination2019>
    </div>
  );
};

export default Reading4Part32019;
