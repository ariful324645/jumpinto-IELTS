import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading2019 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const questions = [
    "Children with good self-control are known to be likely to do well at school later on.",
    " The way a child plays may provide information about possible medical problems",
    " Playing with dolls was found to benefit girls' writing more than boys' writing.",
    "Children had problems thinking up ideas when they first created the story with Lego.",
    "People nowadays regard children's play as less significant than they did in the past.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 9;
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
    localStorage.setItem("/2019/Test 4/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

  const handleNumberClick = (qIndex) => {
    const updatedActive = [...activeNumbers];
    updatedActive[qIndex] = !updatedActive[qIndex]; // toggle active state
    setActiveNumbers(updatedActive);
  };

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

  //  Marks show

  const correctAnswers = {
    1: "Giraldo focused on ants at four age ranges: 20 to 22 days, 45 to 47 days, 95 to 97 days and 120 to 122 days",
    2: "Giraldo watched how well the ants took care of the young of the colony, recording how often each ant attended to, carried and fed them",
    3: "Out in the wild, the ants probably don't live for a full 140 days thanks to predators, disease and just being in an environment that's much harsher than the comforts of the lab",
    4: "She tested how ants responded to light and also measured how active they were by counting how often ants in a small dish walked across a line",
    5: "And when it came to reacting to prey, the older ants attacked the poor fruit fly just as aggressively as the young ones did, flaring their mandibles or pulling at the fly's legs",
    6: "She saw no major differences with age, nor was there any difference in the location of the dying cells, showing that age didn't seem to affect specific brain functions",
    7: "She also wanted to see if aging affects the density of synaptic complexes within these structures - regions where neurons come together. Again, the answer was no",
    8: "She also wanted to see if aging affects the density of synaptic complexes within these structures - regions where neurons come together. Again, the answer was no",
    9: "TRUE",
    10: "FALSE",
    11: "TRUE",
    12: "FALSE",
    13: "TRUE",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2019/Test 4/reading");
    if (savedScore) setScore(Number(savedScore));
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

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2019/Test 4/reading");
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
              {renderText("  which are based on Reading  PASSAGE 1 below")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("The secret of staying young")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Pheidole dentata, a native ant of the south-eastern U.S., isn't immortal. But scientists have found that it doesn't seem to show any signs of aging. Old worker ants can do everything just as well as the youngsters, and their brains appear just as sharp."
              )}

              {renderText(
                '"We get a picture that these ants really don\'t decline," says Ysabel Giraldo, who studied the ants for her doctoral thesis at Boston University.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Such age-defying feats are rare in the animal kingdom."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              {renderText(
                " They can still reproduce even when old, and they never get cancer. But the vast majority of animals deteriorate with age just like people do."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Like the naked mole rat, ants are social creatures that usually live in highly organised colonies."
              )}
              {renderText(
                '"It\'s this social complexity that makes P. dentata useful for studying aging in people," says Giraldo, now at the California Institute of Technology.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Humans are also highly social, a trait that has been connected to healthier aging. By contrast, most animal studies of aging use mice, worms or fruit flies, which all lead much more isolated lives."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In the lab, P. dentata worker ants typically live for around 140 days.  Then she put them through a range of tests."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Giraldo focused on ants at four age ranges: 20 to 22 days, 45 to 47 days, 95 to 97 days and 120 to 122 days. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Giraldo focused on ants at four age ranges: 20 to 22 days, 45 to 47 days, 95 to 97 days and 120 to 122 days. Unlike all previous studies, which only estimated how old the ants were, her work tracked the ants from the time the pupae became adults, so she knew their exact ages."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
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
                  "Giraldo watched how well the ants took care of the young of the colony, recording how often each ant attended to, carried and fed them."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}

                {renderText(
                  " She compared how well 20-day-old and 95-day-old ants followed the telltale scent that the insects usually leave to mark a trail to food."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
                {renderText(
                  "She tested how ants responded to light and also measured how active they were by counting how often ants in a small dish walked across a line."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                "  And she experimented with how ants react to live prey: a tethered fruit fly."
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
                  "Giraldo expected the older ants to perform poorly in all these tasks."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
                {renderText(
                  " But the elderly insects were all good caretakers and trail-followers - the 95-day-old ants could track the scent even longer than their younger counterparts"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
              {renderText(
                ". They all responded to light well, and the older ants were more active. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "And when it came to reacting to prey, the older ants attacked the poor fruit fly just as aggressively as the young ones did, flaring their mandibles or pulling at the fly's legs."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Then Giraldo compared the brains of 20-day-old and 95-day-old ants, identifying any cells that were close to death."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "She saw no major differences with age, nor was there any difference in the location of the dying cells, showing that age didn't seem to affect specific brain functions."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                "  Ants and other insects have structures in their brains called mushroom bodies, which are important for processing information, learning and memory. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "She also wanted to see if aging affects the density of synaptic complexes within these structures - regions where neurons come together. Again, the answer was no."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7,8
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "What was more, the old ants didn't experience any drop in the levels of either serotonin or dopamine - brain chemicals whose decline often coincides with aging. In humans, for example, a decrease in serotonin has been linked to Alzheimer's disease."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"This is the first time anyone has looked at both behavioral and neural changes in these ants so thoroughly," says Giraldo, who recently published the findings in the Proceedings of the Royal Society B.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Scientists have looked at some similar aspects in bees, but the results of recent bee studies were mixed - some studies showed age-related declines, which biologists call senescence, and others didn't."
              )}

              {renderText(
                '"For now, the study raises more questions than it answers," Giraldo says, "including how P. dentata stays in such good shape."'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Also, if the ants don't deteriorate with age, why do they die at all? "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Out in the wild, the ants probably don't live for a full 140 days thanks to predators, disease and just being in an environment that's much harsher than the comforts of the lab."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "\"The lucky ants that do live into old age may suffer a steep decline just before dying,\" Giraldo says, but she can't say for sure because her study wasn't designed to follow an ant's final moments."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"It will be important to extend these findings to other species of social insects," says Gene E. Robinson, an entomologist at the University of Illinois at Urbana-Champaign. This ant might be unique, or it might represent a broader pattern among other social bugs with possible clues to the science of aging in larger animals. Either way, it seems that for these ants, age really doesn’t matter."'
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
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

            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-8")}
            </h2>

            <h3 className="text-lg  mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("ONE WORD AND/OR A NUMBER")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 1-8 on your answer sheet."
              )}
            </h1>
            <br />
          </div>
          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Children's play")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-lg font-bold">
                {renderText("Uses of children's play")}
              </h1>

              <li className="text-lg">
                <span>
                  {renderText("building a 'magical kingdom' may help develop")}
                </span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("board games involve")}</span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  value={userAnswers[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("and turn-taking")}</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-lg font-bold mt-3">
                {renderText("Recent changes affecting children's play")}
              </h1>

              <li className="text-lg">
                <span>{renderText("populations of")}</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  value={userAnswers[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("have grown")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "opportunities for free play are limited due to fear of"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("fear of")}</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("increased")}</span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  value={userAnswers[6] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("in schools")}</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-lg font-bold mt-3">
                {renderText("International policies on children's play")}
              </h1>

              <li className="text-lg">
                <span>{renderText("it is difficult to find")}</span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  value={userAnswers[7] || ""}
                  onChange={(e) => handleInputChange(7, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("to support new policies")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "research needs to study the impact of play on the rest of the child's"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  value={userAnswers[8] || ""}
                  onChange={(e) => handleInputChange(8, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 9-13")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 9-13 on your answer sheet, choose")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
            {renderText("if the statement agrees with the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
            {renderText("if the statement contradicts the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("NOT GIVEN")}</span>{" "}
            {renderText("if there is no information on this")}
          </h3>
          <br /> <br />
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">Questions 9-13</h2>
            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 9;
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
      </div>
    </div>
  );
};

export default Test4Reading2019;
