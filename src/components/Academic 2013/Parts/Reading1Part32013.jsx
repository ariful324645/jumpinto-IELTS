import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2013 from "../Pagination 2013/Reading1Pagination2013";

const Reading1Part32013 = () => {
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
    "Methods for predicting the Earth's population have recently changed.",
    "Human beings are responsible for some of the destruction to food-producing land.",
    "The crops produced in vertical farms will depend on the season.",
    "Some damage to food crops is caused by climate change.",
    "Fertilisers will be needed for certain crops in vertical farms.",
    "Vertical farming will make plants less likely to be affected by infectious diseases.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];
  const handleOptionClick = (qNum, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [qNum]: option,
    }));

    setUserAnswers((prev) => {
      const updated = { ...prev, [qNum]: option }; // ✅ FIX
      calculateScore(updated);
      return updated;
    });
  };

  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const userAnswer = answers[key];
      const correctAnswer = correctAnswers[key];

      if (
        typeof userAnswer === "string" &&
        userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      ) {
        newScore += 1;
      }
    });

    setScore(newScore);
    localStorage.setItem("/2022/Test 1/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState({});

  const [activeNumbers, setActiveNumbers] = useState(Array(14).fill(false));

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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    // Questions 27–30 (Sentence Completion)
    27: "oxygen", // oxygen had to transfer from sea to land
    28: "breathing and reproduction", // two processes
    29: "hind legs", // whales lack hind legs
    30: "dolphins", // ichthyosaurs resembled dolphins

    // Questions 31–33 (TRUE / FALSE / NOT GIVEN)
    31: "FALSE", // turtles were not among the first to migrate back
    32: "NOT GIVEN", // not always mentioned
    33: "TRUE", // habitat can be determined by appearance of remains

    // Questions 34–39 (Flowchart Completion)
    34: "245 measurements", // total measurements taken
    35: "triangular graph", // data recorded on triangular graph
    36: "cluster", // dense cluster of points
    37: "freshwater", // freshwater species data added
    38: "halfway", // positioned about halfway up
    39: "land-based", // indicated both were land-based

    // Question 40 (Multiple Choice)
    40: "D", // transition from sea to land more than once
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
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
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
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
            <h1 className="text-xl font-bold">PASSAGE 3</h1>
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

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("The history of the tortoise")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg mt-6">
              {renderText(
                "If you go back far enough, everything lived in the sea. At various points in evolutionary history, enterprising individuals within many different animal groups moved out onto the land, sometimes even to the most parched deserts, taking their own private seawater with them in blood and cellular fluids.",
              )}

              {renderText(
                "In addition to the reptiles, birds, mammals and insects which we see all around us, other groups that have succeeded out of water include scorpions, snails, crustaceans such as woodlice and land crabs, millipedes and centipedes, spiders and various worms.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "And we mustn't forget the plants, without whose prior invasion of the land none of the other migrations could have happened.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 2 */}
            <p className="text-lg mt-6">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Moving from water to land involved a major redesign of every aspect of life, including breathing and reproduction.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>

              {renderText(
                "Nevertheless, a good number of thoroughgoing land animals later turned around, abandoned their hard-earned terrestrial re-tooling, and returned to the water again.",
              )}

              {renderText(
                "Seals have only gone part way back. They show us what the intermediates might have been like, on the way to extreme cases such as whales and dugongs.",
              )}

              {renderText(
                "Whales (including the small whales we call dolphins) and dugongs, with their close cousins the manatees, ceased to be land creatures altogether and reverted to the full marine habits of their remote ancestors.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They don't even come ashore to breed. They do, however, still breathe air, having never developed anything equivalent to the gills of their earlier marine incarnation.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>

              {renderText(
                "Turtles went back to the sea a very long time ago and, like all vertebrate returnees to the water, they breathe air.",
              )}

              {renderText(
                "However, they are, in one respect, less fully given back to the water than whales or dugongs, for turtles still lay their eggs on beaches.",
              )}
            </p>

            {/* Paragraph 3 */}
            <p className="text-lg mt-6">
              {renderText(
                "There is evidence that all modern turtles are descended from a terrestrial ancestor which lived before most of the dinosaurs.",
              )}

              {renderText(
                "There are two key fossils called Proganochleys quenstedti and Palaeochersis talampayensis dating from early dinosaur times, which appear to be close to the ancestry of all modern turtles and tortoises.",
              )}

              {renderText(
                "You might wonder how we can tell whether fossil animals lived on land or in water, especially if only fragments are found.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("Sometimes it's obvious.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>

              {renderText(
                "Ichthyosaurs were reptilian contemporaries of the dinosaurs, with fins and streamlined bodies.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The fossils look like dolphins, and they surely lived like dolphins, in the water.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>

              {renderText(
                "With turtles it is a little less obvious. One way to tell is by measuring the bones of their forelimbs.",
              )}
            </p>

            {/* Paragraph 4 */}
            <p className="text-lg mt-6">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Walter Joyce and Jacques Gauthier, at Yale University, obtained three measurements in these particular bones of 71 species of living turtles and tortoises.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They used a kind of triangular graph paper to plot the three measurements against one another.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "All the land tortoise species formed a tight cluster of points in the upper part of the triangle; all the water turtles cluster in the lower part of the triangular graph.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>

              {renderText(
                "There was no overlap, except when they added some species that spend time both in water and on land.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Sure enough, these amphibious species show up on the triangular graph approximately half way between the 'wet cluster' of sea tortoises and the 'dry cluster' of land tortoises.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>

              {renderText(
                "The next step was to determine where the fossils fell.",
              )}

              {renderText(
                "The bones of P. quenstedti and P. talampayensis leave us in no doubt.",
              )}

              {renderText(
                "Their points on the graph are right in the thick of the dry cluster.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("Both these fossils were dry-land tortoises.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>

              {renderText(
                "They come from the era before our turtles returned to the water.",
              )}
            </p>

            {/* Paragraph 5 */}
            <p className="text-lg mt-6">
              {renderText(
                "You might think, therefore, that modern land tortoises have probably stayed on land ever since those early terrestrial times, as most mammals did after a few of them went back to the sea.",
              )}

              {renderText("But apparently not.")}

              {renderText(
                "If you draw out the family tree of all modern turtles and tortoises, nearly all the branches are aquatic.",
              )}

              {renderText(
                "Today's land tortoises constitute a single branch, deeply nested among branches consisting of aquatic turtles.",
              )}

              {renderText(
                "This suggests that modern land tortoises have not stayed on land continuously since the time of P. quenstedti and P. talampayensis.",
              )}

              {renderText(
                "Rather, their ancestors were among those who went back to the water, and they then re-emerged back onto the land in (relatively) more recent times.",
              )}
            </p>

            {/* Paragraph 6 */}
            <p className="text-lg mt-6">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Tortoises therefore represent a remarkable double return.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>

              {renderText(
                "In common with all mammals, reptiles and birds, their remote ancestors were marine fish and before that various more or less worm-like creatures stretching back, still in the sea, to the primeval bacteria.",
              )}

              {renderText(
                "Later ancestors lived on land and stayed there for a very large number of generations.",
              )}

              {renderText(
                "Later ancestors still evolved back into the water and became sea turtles.",
              )}

              {renderText(
                "And finally they returned yet again to the land as tortoises, some of which now live in the driest of deserts.",
              )}
            </p>
          </div>

          {/* Highlight modal */}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 27–30 ================= */}
          {/* ================= Questions 27–30 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–30")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the sentences below.")}
            <br />
            {renderText("Choose ")}
            <strong>{renderText("NO MORE THAN TWO WORDS")}</strong>{" "}
            {renderText("from the passage for each answer.")}
            <br />
            {renderText(
              "Write your answers in boxes 27-30 on your answer sheet.",
            )}
          </p>

          <div className="space-y-6 p-4 rounded-lg">
            {[
              {
                q: 27,
                text: "What had to transfer from sea to land before any animals could migrate?",
              },
              {
                q: 28,
                text: "Which TWO processes are mentioned as those in which animals had to make big changes as they moved onto land?",
              },
              {
                q: 29,
                text: "Which physical feature, possessed by their ancestors, do whales lack?",
              },
              {
                q: 30,
                text: "Which animals might ichthyosaurs have resembled?",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>

                <input
                  type="text"
                  className="border-1 border-gray-300 rounded-md px-3 py-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  placeholder={` ${q}`}
                />
              </div>
            ))}
          </div>

          {/* ================= Questions 31–33 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 31–33")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 3?",
            )}
          </p>

          <p className="mb-4">
            {renderText("In boxes 31–33 on your answer sheet, choose ")}
            <br />
            <strong>{renderText("TRUE")}</strong>{" "}
            {renderText("if the statement agrees with the information")}
            <br />
            <strong>{renderText("FALSE")}</strong>{" "}
            {renderText("if the statement contradicts the information")}
            <br />
            <strong>{renderText("NOT GIVEN")}</strong>{" "}
            {renderText("if there is no information on this")}
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 31,
                text: "Turtles were among the first group of animals to migrate back to the sea.",
              },
              {
                num: 32,
                text: "It is always difficult to determine where an animal lived when its fossilised remains are incomplete.",
              },
              {
                num: 33,
                text: "The habitat of ichthyosaurs can be determined by the appearance of their fossilised remains.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col pl-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt}
                        checked={userAnswers[num] === opt}
                        onChange={() => handleInputChange(num, opt)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 34–39 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 34–39")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the flowchart below.")}
            <br />
            {renderText("Choose ")}
            <strong>
              {renderText("NO MORE THAN TWO WORDS AND/OR A NUMBER")}
            </strong>{" "}
            {renderText("from the passage for each answer.")}
            <br />
            {renderText(
              "Write your answers in boxes 34–39 on your answer sheet.",
            )}
          </p>

          <div>
            <div className="border  rounded-lg p-5  space-y-6 text-lg">
              <h3 className="font-bold text-center text-xl mb-4">
                {renderText(
                  "Method of determining where the ancestors of turtles and tortoises come from",
                )}
              </h3>

              {/* Step 1 */}
              <div className="space-y-2 border p-4">
                <p className="font-bold">{renderText("Step 1")}</p>
                <p>
                  {renderText(
                    "71 species of living turtles and tortoises were examined and a total of",
                  )}{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-1 w-[120px] mx-2 text-center"
                    value={userAnswers[34] || ""}
                    onChange={(e) => handleInputChange(34, e.target.value)}
                    placeholder="34"
                  />{" "}
                  {renderText("were taken from the bones of their forelimbs.")}
                </p>
              </div>

              <p className="text-center text-2xl">↓</p>

              {/* Step 2 */}
              <div className="space-y-2 border p-4">
                <p className="font-bold">{renderText("Step 2")}</p>
                <p>
                  {renderText("The data was recorded on a")}{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-1 w-[160px] mx-2 text-center"
                    value={userAnswers[35] || ""}
                    onChange={(e) => handleInputChange(35, e.target.value)}
                    placeholder="35"
                  />{" "}
                  {renderText("(necessary for comparing the information).")}
                </p>

                <p>
                  <span className="font-semibold">
                    {renderText("Outcome:")}
                  </span>{" "}
                  {renderText("Land tortoises were represented by a dense")}{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-1 w-[150px] mx-2 text-center"
                    value={userAnswers[36] || ""}
                    onChange={(e) => handleInputChange(36, e.target.value)}
                    placeholder="36"
                  />{" "}
                  {renderText("of points towards the top.")}
                </p>

                <p>
                  {renderText(
                    "Sea turtles were grouped together in the bottom part.",
                  )}
                </p>
              </div>

              <p className="text-center text-2xl">↓</p>

              {/* Step 3 */}
              <div className="space-y-2 border p-4">
                <p className="font-bold">{renderText("Step 3")}</p>
                <p>
                  {renderText("The same data was collected from some living")}{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-1 w-[140px] mx-2 text-center"
                    value={userAnswers[37] || ""}
                    onChange={(e) => handleInputChange(37, e.target.value)}
                    placeholder="37"
                  />{" "}
                  {renderText("species and added to the other results.")}
                </p>

                <p>
                  <span className="font-semibold">
                    {renderText("Outcome:")}
                  </span>{" "}
                  {renderText(
                    "The points for these species turned out to be positioned about",
                  )}{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-1 w-[120px] mx-2 text-center"
                    value={userAnswers[38] || ""}
                    onChange={(e) => handleInputChange(38, e.target.value)}
                    placeholder="38"
                  />{" "}
                  {renderText(
                    "up the triangle between the land tortoises and the sea turtles.",
                  )}
                </p>
              </div>

              <p className="text-center text-2xl">↓</p>

              {/* Step 4 */}
              <div className="space-y-2 border p-4">
                <p className="font-bold">{renderText("Step 4")}</p>
                <p>
                  {renderText(
                    "Bones of P. quenstedti and P. talampayensis were examined in a similar way and the results added.",
                  )}
                </p>

                <p>
                  <span className="font-semibold">
                    {renderText("Outcome:")}
                  </span>{" "}
                  {renderText(
                    "The position of the points indicated that both these ancient creatures were",
                  )}{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-md px-2 py-1 w-[140px] mx-2 text-center"
                    value={userAnswers[39] || ""}
                    onChange={(e) => handleInputChange(39, e.target.value)}
                    placeholder="39"
                  />
                  .
                </p>
              </div>
            </div>
          </div>

          {/* ================= Question 40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Question 40")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <p className="mb-6 text-lg">
            <span className="font-bold">40.</span>{" "}
            {renderText(
              "According to the writer, the most significant thing about tortoises is that",
            )}
          </p>

          <div className="flex flex-col space-y-3 pl-4 text-lg">
            {[
              {
                letter: "A",
                text: "they are able to adapt to life in extremely dry environments.",
              },
              {
                letter: "B",
                text: "their original life form was a kind of primeval bacteria.",
              },
              {
                letter: "C",
                text: "they have so much in common with sea turtles.",
              },
              {
                letter: "D",
                text: "they have made the transition from sea to land more than once.",
              },
            ].map(({ letter, text }) => (
              <label
                key={letter}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="question-40"
                  value={letter}
                  checked={userAnswers[40] === letter}
                  onChange={() => handleInputChange(40, letter)}
                />
                <span>
                  <span className="font-bold">{letter}.</span>{" "}
                  {renderText(text)}
                </span>
              </label>
            ))}
          </div>

          {/* ================= Submit + Result Section ================= */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27–40)
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
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
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

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswers[num]}</span>
                            )}
                          </p>

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
      <Reading1Pagination2013></Reading1Pagination2013>
    </div>
  );
};

export default Reading1Part32013;
