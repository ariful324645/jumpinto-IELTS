import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2025 from "../Pagination 2025/Reading1Pagination2025";

const Test1Reading2025 = () => {
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
    // Questions 1–6 (TRUE / FALSE / NOT GIVEN)
    1: "FALSE", // Only flightless parrot
    2: "FALSE", // Do not produce chicks every year
    3: "FALSE", // Males play no role in feeding or nesting
    4: "NOT GIVEN", // No comparison of threat level stated
    5: "TRUE", // Moved due to danger from feral cats
    6: "TRUE", // Care of weak chicks increased survival

    // Questions 7–13 (ONE WORD AND/OR A NUMBER)
    7: "bulbs",
    8: "soil",
    9: "feathers",
    10: "deer",
    11: "1974",
    12: "monitoring",
    13: "volunteers",
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

  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);

    // ✅ Correct mapping: Questions 1–7
    const questionNumber = qIndex + 1;

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
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
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
              {renderText("The kākāpō")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "The kākāpō is a nocturnal, flightless parrot that is critically endangered and one of New Zealand's unique treasures.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "The kākāpō, also known as the owl parrot, is a large, forest-dwelling bird, with a pale owl-like face.Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Kākāpō are solitary birds and tend to occupy the same home range for many years.They forage on the ground and climb high into trees.They often leap from trees and flap their wings, but at best manage a controlled descent to the ground",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "It is the world's only flightless parrot, and is also possibly one of the world's longest-living birds, with a reported lifespan of up to 100 years.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Kākāpō are solitary birds and tend to occupy the same home range for many years.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled descent to the ground.",
              )}
              <span>
                {renderText(
                  "They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds.",
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "Kākāpō breed in summer and autumn, but only in years when food is plentiful.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The female kākāpō has to spend long periods away from the nest searching for food, leaving eggs and chicks vulnerable to predators.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Before humans arrived, kākāpō were common throughout New Zealand's forests.However, this all changed with the arrival of the first Polynesian settlers about 700 years ago.For the early settlers, the flightless kākāpō was easy prey.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They ate its meat and used its feathers to make soft cloaks",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
              {renderText(
                "With them came the Polynesian dog and rat, which also preyed on kākāpō.By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island.The fall in kākāpō numbers was accelerated by European colonisation",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "European colonisation caused rapid population decline through habitat loss and introduced predators.",
              )}
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "Early conservation attempts failed, and by the mid-1900s the kākāpō was nearly extinct.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Only a few individuals survived in the most remote areas of New Zealand.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              {renderText(
                "After the first five years of the Recovery Plan, the population was on target.By 2000, five new females had been produced, and the total population had grown to 62 birds.For the first time, there was cautious optimism for the future of kākāpō and by June 2020, a total of 210 birds was recorded.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Its key goals are: minimise the loss of genetic diversity in the kākāpō population, restore or maintain sufficient habitat to accommodate the expected increase in the kākāpō population, and ensure stakeholders continue to be fully engaged in the preservation of the species.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ---------- Questions 1–6 ---------- */}
          <div className="space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–6")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              <br />
              {renderText("In boxes 1–6 on your answer sheet, choose")}
            </h3>

            <div className="flex gap-6 text-lg mb-6">
              <div className="flex flex-col font-bold">
                <span>{renderText("TRUE")}</span>
                <span>{renderText("FALSE")}</span>
                <span>{renderText("NOT GIVEN")}</span>
              </div>
              <div className="flex flex-col">
                <span>
                  {renderText("if the statement agrees with the information")}
                </span>
                <span>
                  {renderText("if the statement contradicts the information")}
                </span>
                <span>{renderText("if there is no information on this")}</span>
              </div>
            </div>

            {[
              "There are other parrots that share the kakapo's inability to fly.",
              "Adult kakapo produce chicks every year.",
              "Adult male kakapo bring food back to nesting females.",
              "The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.",
              "Kakapo were transferred from Rakiura Island to other locations because they were at risk from feral cats.",
              "One Recovery Plan initiative that helped increase the kakapo population size was caring for struggling young birds.",
            ].map((q, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <p className="text-lg font-semibold">
                  {renderText(`${qIndex + 1}. ${q}`)}
                </p>

                {["TRUE", "FALSE", "NOT GIVEN"].map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center gap-2 cursor-pointer text-lg"
                  >
                    <input
                      type="radio"
                      name={`q${qIndex + 1}`}
                      checked={selectedOptions[qIndex] === oIndex}
                      onChange={() => handleOptionClick(qIndex, oIndex)}
                      className="w-5 h-5"
                    />
                    <span>{renderText(option)}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- Questions 7–13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7–13")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br />
              <br />
              {renderText(
                "Choose ONE WORD AND/OR A NUMBER from the passage for each answer.",
              )}
              <br />
              {renderText(
                "Write your answers in boxes 7–13 on your answer sheet.",
              )}
            </h3>

            <div className="space-y-4 border p-4">
              <h2 className="font-bold text-xl text-center">
                {renderText("New Zealand's kakapo")}
              </h2>

              <p className="text-lg">{renderText("A type of parrot")}</p>

              {/* Q7 */}
              <p className="text-lg">
                {renderText(
                  "diet consists of fern fronds, various parts of a tree and",
                )}
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
                  value={userAnswers[7] || ""}
                  onChange={(e) => handleInputChange(7, e.target.value)}
                  className="border rounded-md px-2 py-1 w-32"
                />
              </p>

              {/* Q8 */}
              <p className="text-lg">
                {renderText("nests are created in")}
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
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
                  className="border rounded-md px-2 py-1 w-32"
                />
                {renderText("where eggs are laid")}
              </p>

              <p className="text-lg font-semibold">
                {renderText("Arrival of Polynesian settlers")}
              </p>

              {/* Q9 */}
              <p className="text-lg">
                {renderText("the")}
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  value={userAnswers[9] || ""}
                  onChange={(e) => handleInputChange(9, e.target.value)}
                  className="border rounded-md px-2 py-1 w-32"
                />
                {renderText("of the kakapo were used to make clothes")}
              </p>

              <p className="text-lg font-semibold">
                {renderText("Arrival of European colonisers")}
              </p>

              {/* Q10 */}
              <p className="text-lg">
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  value={userAnswers[10] || ""}
                  onChange={(e) => handleInputChange(10, e.target.value)}
                  className="border rounded-md px-2 py-1 w-32"
                />
                {renderText(
                  "were an animal which they introduced that ate the kakapo's food sources",
                )}
              </p>

              <p className="text-lg font-semibold">
                {renderText("Protecting kakapo")}
              </p>

              {/* Q11 */}
              <p className="text-lg">
                {renderText(
                  "a definite sighting of female kakapo on Rakiura Island was reported in the year",
                )}
                <button
                  onClick={() => toggleButton(11)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[11]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  11
                </button>
                <input
                  value={userAnswers[11] || ""}
                  onChange={(e) => handleInputChange(11, e.target.value)}
                  className="border rounded-md px-2 py-1 w-32"
                />
              </p>

              {/* Q12 */}
              <p className="text-lg">
                {renderText("the Recovery Plan included an increase in")}
                <button
                  onClick={() => toggleButton(12)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  value={userAnswers[12] || ""}
                  onChange={(e) => handleInputChange(12, e.target.value)}
                  className="border rounded-md px-2 py-1 w-32"
                />
              </p>

              {/* Q13 */}
              <p className="text-lg">
                {renderText(
                  "a current goal of the Recovery Plan is to maintain the involvement of",
                )}
                <button
                  onClick={() => toggleButton(13)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[13]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  13
                </button>
                <input
                  value={userAnswers[13] || ""}
                  onChange={(e) => handleInputChange(13, e.target.value)}
                  className="border rounded-md px-2 py-1 w-32"
                />
                {renderText("in kakapo protection")}
              </p>
            </div>

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
                      {Array.from({ length: 13 }, (_, i) => i + 1).map(
                        (num) => {
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
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Reading1Pagination2025></Reading1Pagination2025>
    </div>
  );
};

export default Test1Reading2025;
