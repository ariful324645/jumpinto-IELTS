import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading1Pagination2011 from "../Pagination 2011/Reading1Pagination2011";

//  Marks show

const Reading1Part32011 = () => {
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
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const questions = [
    "The FAA was created as a result of the introduction of the jet engine.",
    "Air Traffic Control started after the Grand Canyon crash in 1956.",
    "Beacons and flashing lights are still used by ATC today.",
    "Some improvements were made in radio communication during World War II..",
    "Class F airspace is airspace which is below 365m and not near airports.",
    "All aircraft in Class E airspace must use IFR.",
    "A pilot entering Class C airspace is flying over an average-sized city.",
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
      const answerKey = qIndex + 20;
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
  // Questions 27-30 (Heading Matching)
  27: "E",
  28: "B",
  29: "A",
  30: "F",

  // Questions 31-40 (Table Answers)
  31: "sender",
  32: "image",
  33: "receiver",
  34: "sensory leakage",
  35: "fraud",
  36: "human involvement",
  37: "human involvement",
  38: "meta-analysis",
  39: "inconsistency",
  40: "large enough",
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
            <h1 className="text-2xl font-bold text-center mt-10">
              {renderText("TELEPATHY")}
            </h1>

            {/* Intro */}
            <p className="text-lg mt-5">
              {" "}
              {renderText(
                "Can human beings communicate by thought alone? For more than a century the issue of telepathy has divided the scientific community, and even today it still sparks bitter controversy among top academics. Since the 1970s, parapsychologists at leading universities and research institutes around the world have risked the derision of sceptical colleagues by putting the various claims for telepathy to the test in dozens of rigorous scientific studies. The results and their implications are dividing even the researchers who uncovered them.",
              )}{" "}
              <span
                className={`${highlight ? "bg-yellow-100 p-1" : ""}`}
              ></span>
            </p>

            {/* Section 27 + 28 */}
            <p className="text-lg mt-5">
              {" "}
              {renderText(
                "Some researchers say the results constitute compelling evidence that telepathy is genuine. Other parapsychologists believe the field is on the brink of collapse, having tried to produce definitive scientific proof and failed. ",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "Sceptics and advocates agree that the most impressive evidence so far has come from the so-called 'ganzfeld' experiments, a German term that means 'whole field'. Reports of telepathic experiences had by people during meditation led parapsychologists to suspect that telepathy might involve signals passing between people that were so faint that they were usually swamped by normal brain activity..",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("27,28")}
                </span>
              )}
              {renderText(
                "  In this case, such signals might be more easily detected by those experiencing meditation-like tranquillity in a relaxing whole field of light, sound and warmth.",
              )}
            </p>

            {/* Section 31,32,33 */}
            <p className="text-lg mt-5">
              {" "}
              {renderText(
                "The implication was that the ganzfeld method had revealed real evidence for telepathy.But there was a crucial flaw in this argument - one routinely overlooked in more conventional areas of science.Just because chance had been ruled out as an explanation did not prove telepathy must exist; there were many other ways of getting positive results..",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "These ranged from 'sensory leakage' - where clues about the pictures accidentally reach the receiver - to outright fraud",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-16 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("33,34")}
                </span>
              )}
              {renderText(
                "In response, the researchers issued a review of all the ganzfeld studies done up to 1985 to show that 80 per cent had found statistically significant evidence.However, they also agreed that there were still too many problems in the experiments which could lead to positive results, and they drew up a list demanding new standards for future research.",
              )}
            </p>

            {/* Section 34,35 */}
            <p className="text-lg mt-5">
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "After this, many researchers switched to autoganzfeld tests - an automated variant of the technique which used computers to perform many of the key tasks such as the random selection of images.36By minimising human involvement, the idea was to minimise the risk of flawed results.In 1987, results from hundreds of autoganzfeld tests were studied by Honorton in a 'meta-analysis', a statistical technique for finding the overall results from a set of studies.Though less compelling than before, the outcome was still impressive.Yet some parapsychologists remain disturbed by the lack of consistency between individual ganzfeld studies.",
                )}
              </span>

              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-28 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("36,37,38,39")}
                </span>
              )}
            </p>

            {/* Section 37,38,39,40 */}
            <p className="text-lg mt-5">
              {renderText(
                "Defenders of telepathy point out that demanding impressive evidence from every study ignores one basic statistical fact: it takes large samples to detect small effects.",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "If, as current results suggest, telepathy produces hit-rates only marginally above the 25 per cent expected by chance, it's unlikely to be detected by a typical ganzfeld study involving around 40 people: the group is just not big enough.",
                )}
              </span>

              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-20 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("40")}
                </span>
              )}
            </p>

            {/* Final Section */}
            <p className="text-lg mt-5">
              {" "}
              {renderText(
                "Only when many studies are combined in a meta-analysis will the faint signal of telepathy really become apparent.And that is what researchers do seem to be finding.What they are certainly not finding, however, is any change in attitude of mainstream scientists: most still totally reject the very idea of telepathy.The problem stems at least in part from the lack of any plausible mechanism for telepathy.Various theories have been put forward, many focusing on esoteric ideas from theoretical physics.They include 'quantum entanglement', in which events affecting one group of atoms instantly affect another group, no matter how far apart they may be.While physicists have demonstrated entanglement with specially prepared atoms, no-one knows if it also exists between atoms making up human minds.",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "Answering such questions would transform parapsychology.29This has prompted some researchers to argue that the future lies not in collecting more evidence for telepathy, but in probing possible mechanisms.Some work has begun already, with researchers trying to identify people who are particularly successful in autoganzfeld trials.",
                )}

                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 text-white rounded-sm">
                    {renderText("30")}
                  </span>
                )}
              </span>
              {renderText(
                "Early results show that creative and artistic people do much better than average: in one study at the University of Edinburgh, musicians achieved a hit-rate of 56 per cent.Perhaps more tests like these will eventually give the researchers the evidence they are seeking and strengthen the case for the existence of telepathy.",
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
                {renderText("Questions 27-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Reading Passage 3  has seven paragraphs, A-G.")}
                <br />
                <br />
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below.",
                )}
                <br />
                <br />
                {renderText(
                  "Choose the correct number, i-x, in boxes 14-19 on your answer sheet.",
                )}
              </h3>

              <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
                <div className="text-left">
                  <h1 className="text-xl font-bold mb-5 text-center">
                    {renderText("List of Headings")}
                  </h1>

                  <ul className="space-y-2 text-lg">
                    <li>
                      {renderText(
                        "A. the discovery of a mechanism for telepathy.",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "B. the need to create a suitable environment for telepathy.",
                      )}
                    </li>
                    <li>
                      {renderText("C. their claims of a high success rate.")}
                    </li>
                    <li>
                      {renderText(
                        "D. a solution to the problem posed by random guessing.",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "E. the significance of the ganzfeld experiments.",
                      )}
                    </li>
                    <li>
                      {renderText("F. a more careful selection of subjects.")}
                    </li>
                    <li>
                      {renderText("G. a need to keep altering conditions.")}
                    </li>
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
              <span>
                {renderText(
                  "Researchers with differing attitudes towards telepathy agree on",
                )}
              </span>

              {/* ----- Same select (NO FUNCTIONALITY CHANGE) ----- */}
              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("27")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 28 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("28")}</span>
              <span>
                {renderText(
                  "Reports of experiences during meditation indicated",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("28")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 29 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("29")}</span>
              <span>
                {renderText(
                  "Attitudes to parapsychology would alter drastically with",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("29")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 30 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("30")}</span>
              <span>
                {renderText(
                  "Recent autoganzfeld trials suggest that success rates will improve with",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("30")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          <br />
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 31-40")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the table below.")}
              <br />
              {renderText(
                "Choose NO MORE THAN THREE WORDS from the passage for each answer.",
              )}
              <br />
              {renderText(
                "Write your answers in boxes 31-40 on your answer sheet.",
              )}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Telepathy Experiments")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Description")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Result")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Flaw")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* ================= GANZFELD 1982 ================= */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Ganzfeld studies 1982")}
                  </td>

                  <td className="border border-gray-400 p-2 text-left">
                    Involved a person acting as a{" "}
                    <button
                      onClick={() => toggleButton(31)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[31]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      31
                    </button>
                    <input
                      value={userAnswers[31] || ""}
                      onChange={(e) => handleInputChange(31, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    who picked one{" "}
                    <button
                      onClick={() => toggleButton(32)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[32]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      32
                    </button>
                    <input
                      value={userAnswers[32] || ""}
                      onChange={(e) => handleInputChange(32, e.target.value)}
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    from four images and a{" "}
                    <button
                      onClick={() => toggleButton(33)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    tried to identify it.
                  </td>

                  <td className="border border-gray-400 p-2">
                    Hit-rates were higher than random guessing.
                  </td>

                  <td className="border border-gray-400 p-2 text-left">
                    Positive results could be produced by factors such as{" "}
                    <button
                      onClick={() => toggleButton(34)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    or{" "}
                    <button
                      onClick={() => toggleButton(35)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    .
                  </td>
                </tr>

                {/* ================= AUTOGANZFELD 1987 ================= */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    {renderText("Autoganzfeld studies 1987")}
                  </td>

                  <td className="border border-gray-400 p-2 text-left">
                    Computers were used to reduce{" "}
                    <button
                      onClick={() => toggleButton(36)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    in testing.
                    <br />
                    To reduce the amount of{" "}
                    <button
                      onClick={() => toggleButton(37)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    during experiments.
                  </td>

                  <td className="border border-gray-400 p-2 text-left">
                    Results analysed using a{" "}
                    <button
                      onClick={() => toggleButton(38)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    .
                  </td>

                  <td className="border border-gray-400 p-2 text-left">
                    The{" "}
                    <button
                      onClick={() => toggleButton(39)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    between test results was due to small sample groups.
                    <br />
                    Sample groups were not{" "}
                    <button
                      onClick={() => toggleButton(40)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                      className="mx-1 w-[100px] border border-gray-300 rounded-md px-1 py-0.5 text-lg"
                    />
                    (as with most ganzfeld studies).
                  </td>
                </tr>
              </tbody>
            </table>
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
                    {Array.from({ length: 12 }, (_, i) => i + 27).map((num) => {
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
      <Reading1Pagination2011></Reading1Pagination2011>
    </div>
  );
};

export default Reading1Part32011;
