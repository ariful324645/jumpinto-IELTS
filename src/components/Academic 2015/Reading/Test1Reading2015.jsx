import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2015 from "../Pagination 2015/Reading1Pagination2015";
// import Reading1Pagination2017 from "../Pagination2017/Reading1Pagination2017";

const Test1Reading2015 = () => {
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
    "The cork oak has the thickest bark of any living tree.",
    "Scientists have developed a synthetic cork with the same cellular structure as natural cork.",
    "Individual cork oak trees must be left for 25 years between the first and second harvest.",
    "Cork bark should be stripped in dry atmospheric conditions.",
    "The only way to remove the bark from cork oak trees is by hand.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
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
    localStorage.setItem("/2017/Test 1/reading", newScore);
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

  const CircleNumber = ({ num }) => {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-black font-bold text-sm mx-2 select-none">
        {num}
      </span>
    );
  };

  //  Marks show

  const correctAnswers = {
    1: "NOT GIVEN",
    2: "FALSE",
    3: "NOT GIVEN",
    4: "TRUE",
    5: "TRUE",
    6: "taste",
    7: "cheap",
    8: "convenient",
    9: "image",
    10: "natural",
    11: "recycled",
    12: "biodiversity",
    13: "desertification",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/reading");
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
    const savedScore = localStorage.getItem("/2017/Test 1/reading");
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
            <h1 className="text-xl font-bold">{renderText("PASSAGE 1")}</h1>
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
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 1-13")}
              </span>
              {renderText(", which are based on Reading Passage 1 below")}
            </h1>
          </div>

          {/* Passage Title */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Stepwells")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg mb-4">
              {renderText(
                "A millennium ago, stepwells were fundamental to life in the driest parts of India. Richard Cox travelled to north-western India to document these spectacular monuments from a bygone era."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "During the sixth and seventh centuries, the inhabitants of the modern-day states of Gujarat and Rajasthan in north-western India developed a method of gaining access to clean, fresh groundwater during the dry season for drinking, bathing, watering animals and irrigation."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                " However, the significance of this invention - the stepwell - goes beyond its utilitarian application."
              )}
            </p>

            {/* Paragraph 2 */}
            <p className="text-lg mb-4">
              {renderText(
                "Unique to this region, stepwells are often architecturally complex and vary widely in size and shape. During their heyday, they were places of gathering, of leisure and relaxation and of worship for villagers of all but the lowest classes."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Most stepwells are found dotted round the desert areas of Gujarat (where they are called 'vav') and Rajasthan (where they are called 'baori'), while a few also survive in Delhi."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                " Some were located in or near villages as public spaces for the community; others were positioned beside roads as resting places for travellers."
              )}
            </p>

            {/* Paragraph 3 */}
            <p className="text-lg mb-4">
              {renderText(
                "As their name suggests, stepwells comprise a series of stone steps descending from ground level to the water source (normally an underground aquifer) as it recedes following the rains."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "When the water level was high, the user needed only to descend a few steps to reach it; when it was low, several levels would have to be negotiated."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 4 */}
            <p className="text-lg mb-4">
              {renderText(
                "Some wells are vast, open craters with hundreds of steps paving each sloping side, often in tiers. Others are more elaborate, with long stepped passages leading to the water via several storeys."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Built from stone and supported by pillars, they also included pavilions that sheltered visitors from the relentless heat."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                " But perhaps the most impressive features are the intricate decorative sculptures that embellish many stepwells, showing activities from fighting and dancing to everyday acts such as women combing their hair or churning butter."
              )}
            </p>

            {/* Paragraph 5 */}
            <p className="text-lg mb-4">
              {renderText(
                "Down the centuries, thousands of wells were constructed throughout north-western India, but the majority have now fallen into disuse; many are derelict and dry, as groundwater has been diverted for industrial use and the wells no longer reach the water table."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Their condition hasn't been helped by recent dry spells: southern Rajasthan suffered an eight-year drought between 1996 and 2004."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 6 */}
            <p className="text-lg mb-4">
              {renderText(
                "However, some important sites in Gujarat have recently undergone major restoration, and the state government announced in June last year that it plans to restore the stepwells throughout the state."
              )}
            </p>

            {/* Paragraph 7 */}
            <p className="text-lg mb-4">
              {renderText(
                "In Patan, the state's ancient capital, the stepwell of 'Rani Ki Vav' (Queen's Stepwell) is perhaps the finest current example."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It was built by Queen Udayamati during the late 11th century, but became silted up following a flood during the 13th century."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 8 */}
            <p className="text-lg mb-4">
              {renderText(
                "Another example is the 'Surya Kund' in Modhera, northern Gujarat, next to the Sun Temple, built by King Bhima I in 1026 to honour the sun god Surya."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It actually resembles a tank ('kund' means reservoir or pond) rather than a well, but displays the hallmarks of stepwell architecture, including four sides of steps that descend to the bottom in a stunning geometrical formation."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7,8
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 9 */}
            <p className="text-lg mb-4">
              {renderText(
                "Rajasthan also has a wealth of wells. The ancient city of Bundi, 200 kilometres south of Jaipur, is renowned for its architecture, including its stepwells."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One of the larger examples is 'Raniji Ki Baori', which was built by the queen of the region, Nathavatji, in 1699. At 46 metres deep, 20 metres wide and 40 metres long, the intricately carved monument is one of 21 'baoris' commissioned in the Bundi area by Nathavatji."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 10 */}
            <p className="text-lg mb-4">
              {renderText(
                "In the old ruined town of Abhaneri, about 95 kilometres east of Jaipur, is 'Chand Baori', one of India's oldest and deepest wells; aesthetically it's perhaps one of the most dramatic."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Built in around 850 AD next to the temple of Harshat Mata, the 'baori' comprises hundreds of zigzagging steps that run along three of its sides, steeply descending 11 storeys, resulting in a striking pattern when seen from afar."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 11 */}
            <p className="text-lg mb-4">
              {renderText(
                "Still in public use is 'Neemrana Ki Baori', located just off the Jaipur-Delhi highway. Constructed in around 1700, it is nine storeys deep, with the last two being underwater."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "At ground level, there are 86 colonnaded openings from where the visitor descends 170 steps to the deepest water source."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 12 */}
            <p className="text-lg mb-4">
              {renderText(
                "Today, following years of neglect, many of these monuments to medieval engineering have been saved by the Archaeological Survey of India, which has recognised the importance of preserving them as part of the country's rich history."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Tourists flock to wells in far-flung corners of north-western India to gaze in wonder at these architectural marvels from hundreds of years ago, which serve as a reminder of both the ingenuity and artistry of ancient civilisations and of the value of water to human existence."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12,13
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
          {/* ---------- QUESTIONS 1–5 ---------- */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–5")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?"
              )}
              <br />
              <br />
              {renderText("In boxes 1–5 on your answer sheet, choose")}
            </h3>

            <h3 className="flex gap-4 text-lg">
              <span className="font-bold">{renderText("TRUE")}</span>
              {renderText("if the statement agrees with the information")}
            </h3>

            <h3 className="flex gap-4 text-lg">
              <span className="font-bold">{renderText("FALSE")}</span>
              {renderText("if the statement contradicts the information")}
            </h3>

            <h3 className="flex gap-4 text-lg">
              <span className="font-bold">{renderText("NOT GIVEN")}</span>
              {renderText("if there is no information on this")}
            </h3>
          </div>

          <br />

          {/* ---------- QUESTIONS 1–5 LIST ---------- */}
          <div className="space-y-6 p-4">
            {[
              "Examples of ancient stepwells can be found all over the world.",
              "Stepwells had a range of functions, in addition to those related to water collection.",
              "The few existing stepwells in Delhi are more attractive than those found elsewhere.",
              "It took workers many years to build the stone steps characteristic of stepwells.",
              "The number of steps above the water level in a stepwell altered during the course of a year.",
            ].map((q, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium">
                  {index + 1}. {renderText(q)}
                </h3>

                <ul className="flex flex-col gap-2 ml-6 mt-2">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                    <li
                      key={option}
                      onClick={() => handleOptionClick(index, option)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedOptions[index] === option
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-700"
                        }`}
                      ></span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ---------- QUESTIONS 6–8 ---------- */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 6–8")}
            </h2>

            <p className="text-lg mb-4">
              {renderText("Complete the sentences below.")}
              <br />
              <br />
              {renderText("Choose")}
              <span className="font-bold mx-1">
                {renderText("ONE WORD ONLY")}
              </span>
              {renderText("from the passage for each answer.")}
            </p>

            <p className="font-semibold mb-6">
              {renderText(
                "Write your answers in boxes 6–8 on your answer sheet."
              )}
            </p>

            {[
              "Which part of some stepwells provided shade for people?",
              "What type of serious climatic event, which took place in southern Rajasthan, is mentioned in the article?",
              "Who are frequent visitors to stepwells nowadays?",
            ].map((q, i) => {
              const num = i + 6;
              return (
                <div key={num} className="mb-4">
                  <p className="text-lg">
                    {num}. {renderText(q)}
                  </p>
                  <input
                    type="text"
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="mt-2 border-2 border-gray-300 rounded-md px-3 py-1 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          {/* ---------- QUESTIONS 9–13 TABLE ---------- */}
          <div className="mt-12 overflow-x-auto p-5 rounded-lg bg-white">
            <h2 className="text-xl font-bold text-center mb-6">
              {renderText("Stepwell Information")}
            </h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Stepwell</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Features</th>
                  <th className="border p-2">Other notes</th>
                </tr>
              </thead>

              <tbody>
                {/* Q9 */}
                <tr>
                  <td className="border p-2 font-semibold">Rani Ki Vav</td>
                  <td className="border p-2">Late 11th century</td>
                  <td className="border p-2">
                    As many as 500 sculptures decorate the monument
                  </td>
                  <td className="border p-2">
                    Restored in the 1960s. Excellent condition, despite the
                    <CircleNumber num={9} />
                    <input
                      className="border-b-2 border-gray-400 w-24 text-center"
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                    />
                    of 2001
                  </td>
                </tr>

                {/* Q10 + Q11 */}
                <tr>
                  <td className="border p-2 font-semibold">Surya Kund</td>
                  <td className="border p-2">1026</td>
                  <td className="border p-2">
                    Steps on the
                    <CircleNumber num={10} />
                    <input
                      className="border-b-2 border-gray-400 w-24 text-center"
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                    />
                    produce a geometrical pattern
                  </td>
                  <td className="border p-2">
                    Carved shrines. Looks more like a
                    <CircleNumber num={11} />
                    <input
                      className="border-b-2 border-gray-400 w-24 text-center"
                      value={userAnswers[11] || ""}
                      onChange={(e) => handleInputChange(11, e.target.value)}
                    />
                    than a well
                  </td>
                </tr>

                <tr>
                  <td className="border p-2 font-semibold">Raniji Ki Baori</td>
                  <td className="border p-2">1699</td>
                  <td className="border p-2">Intricately carved monument</td>
                  <td className="border p-2">
                    One of 21 baoris in the area commissioned by Queen
                    Nathavatji
                  </td>
                </tr>

                {/* Q12 */}
                <tr>
                  <td className="border p-2 font-semibold">Chand Baori</td>
                  <td className="border p-2">850 AD</td>
                  <td className="border p-2">
                    Steps take you down 11 storeys to the bottom
                  </td>
                  <td className="border p-2">
                    Old, deep and dramatic. Has
                    <CircleNumber num={12} />
                    <input
                      className="border-b-2 border-gray-400 w-24 text-center"
                      value={userAnswers[12] || ""}
                      onChange={(e) => handleInputChange(12, e.target.value)}
                    />
                    which provide a view of the steps
                  </td>
                </tr>

                {/* Q13 */}
                <tr>
                  <td className="border p-2 font-semibold">
                    Neemrana Ki Baori
                  </td>
                  <td className="border p-2">1700</td>
                  <td className="border p-2">
                    Has two
                    <CircleNumber num={13} />
                    <input
                      className="border-b-2 border-gray-400 w-24 text-center"
                      value={userAnswers[13] || ""}
                      onChange={(e) => handleInputChange(13, e.target.value)}
                    />
                    levels
                  </td>
                  <td className="border p-2">Used by public today</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Reading1Pagination2015></Reading1Pagination2015>
    </div>
  );
};

export default Test1Reading2015;
