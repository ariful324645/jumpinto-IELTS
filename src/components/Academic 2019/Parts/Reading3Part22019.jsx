import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading3Pagination2019 from "../Pagination/Reading3Pagination2019";

//  Marks show

const Reading3Part22019 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);
  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };
  const questions = [
    "37. What method did Jamie Tehrani use to test his ideas about fairy tales?",
    "38. When discussing Tehrani's views, Jack Zipes suggests that",
    "39. Why does Tehrani refer to Chinese and Japanese fairy tales?",
    "40. What does Mathias Clasen believe about fairy tales?",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
  const question2 = [
    "Which ONE of the following makes insects interesting for drug research?",
    "Which ONE of the following makes insects interesting for drug research?",
  ];

  const options2 = [
    [
      "A. the huge number of individual insects in the world",
      "B. the variety of substances insects have developed to protect themselves",
      "C. the potential to extract and make use of insects' genetic codes",
    ],

    [
      "A. the similarities between different species of insect",
      "B. the manageable size of most insects",
      "C. the variety of substances insects have developed to protect themselves",
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
      const answerKey = qIndex + 37;
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
      const answerKey = qIndex + 21;
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
    localStorage.setItem("/reading3Part32020", newScore);
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
   14: "C", // Laboratory-based drug discovery prompted renewed interest in natural products → Section C
   15: "H", // Using DNA and cell lines to produce compounds → Section H
   16: "A", // Basic grasp of medicine → Section A
   17: "F", // Challenges of using insects (daunting task, small size, rare species) → Section F
   18: "I", // Conservation motivation → Section I
   19: "B", // Reasons why nature-based medicines fell out of favor → Section B
   20: "E", // Example of insect-derived medicine (larvae and wasp venom) → Section E
   21: "B. the variety of substances insects have developed to protect themselves", // Insects' diversity and interesting compounds → Section D
   22: "C. the variety of substances insects have developed to protect themselves",
   23: "ecology", // knowledge of ecology
   24: "prey", // compounds to overpower and preserve prey
   25: "habitats", // pathogenic bacteria and fungi in habitats
   26: "antibiotics", // inspire new antibiotics
 };


  useEffect(() => {
    const savedScore = localStorage.getItem("/reading3Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading3Part22020");
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
              {renderText("Saving bugs to find new drugs")}
            </h1>
            <h1 className="text-xl italic font-bold mb-5 text-center">
              {renderText(
                "Zoologist Ross Piper looks at the potential of insects in pharmaceutical research"
              )}
            </h1>

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3 ">{renderText("A")}</h1>
              {renderText(
                "More drugs than you might think are derived from, or inspired by, compounds found in living things. Looking to nature for the soothing and curing of our ailments is nothing new - we have been doing it for tens of thousands of years. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "You only have to look at other primates - such as the capuchin monkeys who rub themselves with toxin-oozing millipedes to deter mosquitoes, or the chimpanzees who use noxious forest plants to rid themselves of intestinal parasites - to realise that our ancient ancestors too probably had a basic grasp of medicine."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3 ">{renderText("B")}</h1>
              {renderText(
                "Pharmaceutical science and chemistry built on these ancient foundations and perfected the extraction, characterisation, modification and testing of these natural products."
              )}{" "}
              {renderText(
                " Then, for a while, modern pharmaceutical science moved its focus away from nature and into the laboratory, designing chemical compounds from scratch."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "The main cause of this shift is that although there are plenty of promising chemical compounds in nature, finding them is far from easy. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Securing sufficient numbers of the organism in question, isolating and characterising the compounds of interest, and producing large quantities of these compounds are all significant hurdles."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3 ">{renderText("C")}</h1>{" "}
              {renderText(
                "Laboratory-based drug discovery has achieved varying levels of success, something which has now prompted the development of new approaches focusing once again on natural products."
              )}{" "}
              {renderText(
                " With the ability to mine genomes for useful compounds, it is now evident that we have barely scratched the surface of nature's molecular diversity. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "  This realisation, together with several looming health crises, such as antibiotic resistance, has put bioprospecting - the search for useful compounds in nature - firmly back on the map."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3 ">{renderText("D")}</h1>
              {renderText(
                "Insects are the undisputed masters of the terrestrial domain, where they occupy every possible niche."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Consequently, they have a bewildering array of interactions with other organisms, something which has driven the evolution of an enormous range of very interesting compounds for defensive and offensive purposes. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " Their remarkable diversity exceeds that of every other group of animals on the planet combined. Yet even though insects are far and away the most diverse animals in existence, their potential as sources of therapeutic compounds is yet to be realised."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3 ">{renderText("E")}</h1>{" "}
              {renderText(
                "From the tiny proportion of insects that have been investigated, several promising compounds have been identified."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " For example, alloferon, an antimicrobial compound produced by blow fly larvae, is used as an antiviral and antitumor agent in South Korea and Russia."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                "The larvae of a few other insect species are being investigated for the potent antimicrobial compounds they produce. Meanwhile, a compound from the venom of the wasp Polybia paulista has potential in cancer treatment."
              )}
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3 ">{renderText("F")}</h1>
              {renderText(
                "Why is it that insects have received relatively little attention in bioprospecting?"
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Firstly, there are so many insects that, without some manner of targeted approach, investigating this huge variety of species is a daunting task. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " Secondly, insects are generally very small, and the glands inside them that secrete potentially useful compounds are smaller still. This can make it difficult to obtain sufficient quantities of the compound for subsequent testing. Thirdly, although we consider insects to be everywhere, the reality of this ubiquity is vast numbers of a few extremely common species. Many insect species are infrequently encountered and very difficult to rear in captivity, which, again, can leave us with insufficient material to work with."
              )}
            </p>

            <br />

            {/* ---------- SECTION G ---------- */}
            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3 ">{renderText("G")}</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "My colleagues and I at Aberystwyth University in the UK have developed an approach in which we use our knowledge of ecology as a guide to target our efforts."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
                {renderText(
                  "The creatures that particularly interest us are the many insects that secrete powerful poison for subduing prey and keeping it fresh for future consumption."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
                {renderText(
                  "There are even more insects that are masters of exploiting filthy habitats, such as faeces and carcasses, where they are regularly challenged by thousands of micro-organisms."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
                {renderText(
                  "  These insects have many antimicrobial compounds for dealing with pathogenic bacteria and fungi, suggesting that there is certainly potential to find many compounds that can serve as or inspire new antibiotics."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>{" "}
            </p>

            <br />

            {/* ---------- SECTION H ---------- */}
            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3 ">
                {renderText("H")}
              </h1>{" "}
              {renderText(
                "Although natural history knowledge points us in the right direction, it doesn't solve the problems associated with obtaining useful compounds from insects."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Fortunately, it is now possible to snip out the stretches of the insect's DNA that carry the codes for the interesting compounds and insert them into cell lines that allow larger quantities to be produced. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15,22")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "And although the road from isolating and characterising compounds with desirable qualities to developing a commercial product is very long and full of pitfalls, the variety of successful animal-derived pharmaceuticals on the market demonstrates there is a precedent here that is worth exploring."
              )}
            </p>

            <br />

            {/* ---------- SECTION I ---------- */}
            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3 ">{renderText("I")}</h1>
              {renderText(
                "With every bit of wilderness that disappears, we deprive ourselves of potential medicines."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As much as I'd love to help develop a groundbreaking insect-derived medicine, my main motivation for looking at insects in this way is conservation."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " I sincerely believe that all species, however small and seemingly insignificant, have a right to exist for their own sake. If we can shine a light on the darker recesses of nature's medicine cabinet, exploring the useful chemistry of the most diverse animals on the planet, I believe we can make people think differently about the value of nature."
              )}
            </p>

            <br />
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
                {renderText("Questions 14-20")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions  14-20) and the list of people below."
                )}
              </p>

              <p>
                {renderText("Match each statement with the correct person,")}
                <span className="font-bold text-lg">{renderText(" A-I")}</span>.
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-I , in boxes 27-32 on your answer sheet."
                )}
              </p>

              <p>{renderText("NB You may use any letter more than once.")}</p>

              {/* ---------- Question 14 ---------- */}
              {/* Question 14 */}
              <div className="space-y-3">
                {" "}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("14.")}</span>
                  <span>
                    {renderText(
                      "mention of factors driving a renewed interest in natural medicinal compounds"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[14] || ""}
                      onChange={(e) => handleInputChange(14, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("14")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("15.")}</span>
                  <span>
                    {renderText(
                      "how recent technological advances have made insect research easier"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[15] || ""}
                      onChange={(e) => handleInputChange(15, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("15")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("16.")}</span>
                  <span>
                    {renderText(
                      "examples of animals which use medicinal substances from nature"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[16] || ""}
                      onChange={(e) => handleInputChange(16, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("16")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("17.")}</span>
                  <span>
                    {renderText(
                      "reasons why it is challenging to use insects in drug research"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[17] || ""}
                      onChange={(e) => handleInputChange(17, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("17")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("18.")}</span>
                  <span>
                    {renderText(
                      "reference to how interest in drug research may benefit wildlife"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[18] || ""}
                      onChange={(e) => handleInputChange(18, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("18")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("19.")}</span>
                  <span>
                    {renderText(
                      "a reason why nature-based medicines fell out of favour for a period"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[19] || ""}
                      onChange={(e) => handleInputChange(19, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("19")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("20.")}</span>
                  <span>
                    {renderText(
                      "an example of an insect-derived medicine in use at the moment"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[20] || ""}
                      onChange={(e) => handleInputChange(20, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("20")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                      <option value="D">{renderText("D")}</option>
                      <option value="E">{renderText("E")}</option>
                      <option value="F">{renderText("F")}</option>
                      <option value="G">{renderText("G")}</option>
                      <option value="H">{renderText("H")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
              </div>
            </div>
            {/* 2nd step */}
            {/* last */} {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 21-22")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B or C ")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 21;

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
          </div>
          <br />

          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23-26")}
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
                "Write your answers in boxes 23-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Research at Aberystwyth University")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                {renderText(
                  "Ross Piper and fellow zoologists at Aberystwyth University are using their expertise in"
                )}
                <button
                  onClick={() => toggleButton(23)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[23]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  23
                </button>
                <input
                  value={userAnswers[23] || ""}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText("when undertaking bioprospecting with insects.")}
              </p>

              <p className="text-lg">
                {renderText(
                  "They are especially interested in the compounds that insects produce to overpower and preserve their"
                )}
                <button
                  onClick={() => toggleButton(24)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[24]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  24
                </button>
                <input
                  value={userAnswers[24] || ""}
                  onChange={(e) => handleInputChange(24, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
              </p>

              <p className="text-lg">
                {renderText(
                  "They are also interested in compounds which insects use to protect themselves from pathogenic bacteria and fungi found in their"
                )}
                <button
                  onClick={() => toggleButton(25)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[25]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  25
                </button>
                <input
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
              </p>

              <p className="text-lg">
                {renderText(
                  "Piper hopes that these substances will be useful in the development of drugs such as"
                )}
                <button
                  onClick={() => toggleButton(26)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[26]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  26
                </button>
                <input
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
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
                    Your Score: {score}/12
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14-26)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 12 }, (_, i) => i + 14).map((num) => {
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
      <Reading3Pagination2019></Reading3Pagination2019>
    </div>
  );
};

export default Reading3Part22019;
