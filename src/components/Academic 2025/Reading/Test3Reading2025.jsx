import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2025 from "../Pagination 2025/Reading3Pagination2025";

const Test3Reading2025 = () => {
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [activeButtons, setActiveButtons] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };
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

  const questions = [
    "Urban farming can take place above or below ground.",
    "Some of the equipment used in aeroponic farming can be made by hand.",
    "Urban farming relies more on electricity than some other types of farming.",
    "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
    "Most produce can be grown on an aeroponic urban farm at any time of the year.",
    "Beans take longer to grow on an urban farm than other vegetables.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const correctAnswers = {
    // Questions 1–7 (ONE WORD ONLY)
    1: "food", // conserve nutritional value of food
    2: "meat", // meat kept cool by ice during transportation
    3: "fish", // two kinds of fish first shipped to England
    4: "food", // quick-freezing methods so that food did not spoil
    5: "glass", // packaging with glass so product was visible
    6: "workers", // shortage of workers
    7: "refrigerator", // large number of homes had a refrigerator

    // Questions 8–13 (TRUE / FALSE / NOT GIVEN)
    8: "TRUE", // ice transportation made some Boston ship owners wealthy
    9: "NOT GIVEN", // no info about taste of food affected in Australia
    10: "TRUE", // Birdseye travelled to Labrador to learn Inuit methods
    11: "NOT GIVEN", // no info about Swanson investing money in TV Dinner promotion
    12: "TRUE", // Swanson developed new style of container for TV Dinner
    13: "NOT GIVEN", // no info about US being largest frozen food industry currently
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  useEffect(() => {
    let newScore = 0;
    for (let i = 1; i <= 13; i++) {
      const answer = userAnswers[i]?.toString().trim().toLowerCase() || "";
      const correct = correctAnswers[i]?.toString().trim().toLowerCase() || "";
      if (answer && answer === correct) newScore += 1;
    }
    setScore(newScore);
  }, [userAnswers]);

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
  );

  const handleOptionClick = (questionNumber, oIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionNumber]: oIndex,
    }));

    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: options[oIndex],
    }));
  };

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
  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">PASSAGE 1</h1>
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
              {renderText("Frozen Food")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "A US perspective on the development of the frozen food industry",
              )}
            </p>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "At some point in history, humans discovered that ice preserved food. There is evidence that winter ice was stored to preserve food in the summer as far back as 10,000 years ago. Two thousand years ago, the inhabitants of South America's Andean mountains had a unique means of conserving potatoes for later consumption.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They froze them overnight, then trampled them to squeeze out the moisture, then dried them in the sun.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                " This preserved their nutritional value – if not their aesthetic appeal.",
              )}
            </p>

            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "Natural ice remained the main form of refrigeration until late in the 19th century. In the early 1800s, ship owners from Boston, USA, had enormous blocks of Arctic ice towed all over the Atlantic for the purpose of food preservation. In 1851, railroads first began putting blocks of ice in insulated rail cars to send butter from Ogdensburg, New York, to Boston.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("2")}
                </span>
              )}
            </p>

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "Finally, in 1870, Australian inventors found a way to make 'mechanical ice'. They used a compressor to force a gas – ammonia at first and later Freon – through a condenser. The compressed gas gave up some of its heat as it moved through the condenser. Then the gas was released quickly into a low-pressure evaporator coil where it became liquid and cold. Air was blown over the evaporator coil and then this cooled air passed into an insulated compartment, lowering its temperature to freezing point.",
              )}
            </p>

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "Initially, this process was invented to keep Australian beer cool even in hot weather. But Australian cattlemen were quick to realize that, if they could put this new invention on a ship, they could export meat across the oceans. In 1880, a shipment of Australian beef and mutton was sent, frozen, to England.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "While the food frozen this way was still palatable, there was some deterioration.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
              {renderText(
                " During the freezing process, crystals formed within the cells of the food, and when the ice expanded and the cells burst, this spoilt the flavor and texture of the food.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("9")}
                </span>
              )}
            </p>

            {/* Paragraph 5 */}
            <p className="text-lg">
              {renderText(
                "The modern frozen food industry began with the indigenous Inuit people of Canada. In 1912, a biology student in Massachusetts, USA, named Clarence Birdseye, ran out of money and went to Labrador in Canada to trap and trade furs.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "While he was there, he became fascinated with how the Inuit would quickly freeze fish in the Arctic air.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
              {renderText(
                " The fish looked and tasted fresh even months later.",
              )}
            </p>

            {/* Paragraph 6 */}
            <p className="text-lg">
              {renderText(
                "Birdseye returned to the USA in 1917 and began developing mechanical freezers capable of quick-freezing food. Birdseye methodically kept inventing better freezers and gradually built a business selling frozen fish from Gloucester, Massachusetts. In 1929, his business was sold and became General Foods, but he stayed with the company as director of research, and his division continued to innovate.",
              )}
            </p>

            {/* Paragraph 7 */}
            <p className="text-lg">
              {renderText(
                "Birdseye was responsible for several key innovations that made the frozen food industry possible.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He developed quick-freezing techniques that reduced the damage that crystals caused, as well as the technique of freezing the product in the package it was to be sold in.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He also introduced the use of cellophane, the first transparent material for food packaging, which allowed consumers to see the quality of the product.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 8 */}
            <p className="text-lg">
              {renderText(
                "Sales increased in the early 1940s, when World War II gave a boost to the frozen food industry because tin was being used for munitions.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Canned foods were rationed to save tin for the war effort, while frozen foods were abundant and cheap.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Finally, by the 1950s, refrigerator technology had developed far enough to make these appliances affordable for the average family.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 9 */}
            <p className="text-lg">
              {renderText(
                "1950s families were also looking for convenience at mealtimes, so the moment was right for the arrival of the 'TV Dinner'. Swanson Foods adapted Birdseye's freezing techniques and launched the first TV Dinner.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("11")}
                </span>
              )}
              {renderText(
                " The product was an instant success, and by 1959 Americans were spending billions annually on frozen foods.",
              )}
            </p>

            {/* Paragraph 10 */}
            <p className="text-lg">
              {renderText(
                "Today, the US frozen food industry has a turnover of over $67 billion annually, with a significant proportion sold through restaurants, cafeterias, hospitals and schools.",
              )}
            </p>
          </div>

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
          {/* ---------- Questions 1–7 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–7")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br />
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer.",
              )}
              <br />
              {renderText(
                "Write your answers in boxes 1–7 on your answer sheet.",
              )}
            </h3>

            <div className="space-y-4 border p-4 list-decimal">
              {/* Question 1 */}
              <p className="text-lg">
                {renderText(
                  "2,000 years ago, South America. People conserved the nutritional value of ",
                )}
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[1] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 1: e.target.value }))
                  }
                />
                {renderText(", using a method of freezing then drying.")}
              </p>

              {/* Question 2 */}
              <p className="text-lg">
                {renderText(
                  "1851, USA. During transportation in specially adapted trains, ",
                )}
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[2] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 2: e.target.value }))
                  }
                />
                {renderText(" was kept cool by ice.")}
              </p>

              {/* Question 3 */}
              <p className="text-lg">
                {renderText("1880, Australia. Two kinds of ")}
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[3] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 3: e.target.value }))
                  }
                />
                {renderText(" were the first frozen foods shipped to England.")}
              </p>

              {/* Question 4 */}
              <p className="text-lg">
                {renderText(
                  "1917 onwards, USA. Clarence Birdseye introduced innovations including quick-freezing methods, so that ",
                )}
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[4] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 4: e.target.value }))
                  }
                />
                {renderText(" did not spoil the food.")}
              </p>

              {/* Question 5 */}
              <p className="text-lg">
                {renderText("Packaging products with ")}
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[5] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 5: e.target.value }))
                  }
                />
                {renderText(", so the product was visible.")}
              </p>

              {/* Question 6 */}
              <p className="text-lg">
                {renderText(
                  "Early 1940s, USA. Frozen food became popular because of a shortage of ",
                )}
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[6] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 6: e.target.value }))
                  }
                />
                {renderText(".")}
              </p>

              {/* Question 7 */}
              <p className="text-lg">
                {renderText("1950s, USA. A large number of homes now had a ")}
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[7] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 7: e.target.value }))
                  }
                />
                {renderText(".")}
              </p>
            </div>
          </div>

          {/* ---------- Questions 8–13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 8–13")}
            </h2>

            <p className="text-lg font-semibold mb-4">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              {renderText("In boxes 8–13 on your answer sheet, choose")}
              <br />
              {renderText("TRUE if the statement agrees with the information")}
              <br />
              {renderText("FALSE if the statement contradicts the information")}
              <br />
              {renderText("NOT GIVEN if there is no information on this")}
            </p>

            {[
              "The ice transportation business made some Boston ship owners very wealthy in the early 1800s.",
              "A disadvantage of the freezing process invented in Australia was that it affected the taste of food.",
              "Clarence Birdseye travelled to Labrador in order to learn how the Inuit people froze fish.",
              "Swanson Foods invested a great deal of money in the promotion of the TV Dinner.",
              "Swanson Foods developed a new style of container for the launch of the TV Dinner.",
              "The US frozen food industry is currently the largest in the world.",
            ].map((statement, index) => (
              <div key={index} className="space-y-2">
                <p className="text-lg font-semibold">
                  {renderText(`${index + 8}. ${statement}`)}
                </p>
                {["TRUE", "FALSE", "NOT GIVEN"].map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center gap-2 cursor-pointer text-lg"
                  >
                    <input
                      type="radio"
                      name={`q${index + 8}`}
                      checked={selectedOptions[index + 8] === oIndex}
                      onChange={() => handleOptionClick(index + 8, oIndex)}
                      className="w-5 h-5"
                    />
                    {renderText(option)}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- Submit / Result ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  {renderText("Submit Answers")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText("Your Score:")} {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–13)")}
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = (userAnswers[num] || "")
                        .toString()
                        .trim()
                        .toLowerCase();
                      const correctAnswer = (correctAnswers[num] || "")
                        .toString()
                        .trim()
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
                            <p className="font-bold">
                              {renderText(`Q${num}:`)}
                            </p>
                          </div>

                          <p className="ml-8">
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{renderText(userAnswer)}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            <span>{renderText(correctAnswers[num])}</span>
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
      <Reading3Pagination2025></Reading3Pagination2025>
    </div>
  );
};

export default Test3Reading2025;
