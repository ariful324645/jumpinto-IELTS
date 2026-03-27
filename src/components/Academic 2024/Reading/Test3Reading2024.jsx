import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2024 from "../Pagination 2024/Reading3Pagination2024";

const Test3Reading2024 = () => {
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
    // Questions 1–7 (TRUE / FALSE / NOT GIVEN)
    1: "NOT GIVEN", // No prior research mentioned before Shipton
    2: "FALSE", // Clam shell axes had been found elsewhere too
    3: "TRUE", // Obi was larger 18,000 years ago
    4: "NOT GIVEN", // Passage doesn’t compare Obi to other islands
    5: "TRUE", // Warm, wet climate → stone axes
    6: "NOT GIVEN", // No mention of surprise about hunting practices
    7: "FALSE", // Shelters were abandoned ~8,000 years ago

    // Questions 8–13 (ONE WORD ONLY)
    8: "caves", // Excavations were inside caves
    9: "stone", // Axes from 11,700 years ago were stone
    10: "cuscus", // Animal bones found
    11: "beads", // Resembling beads from other islands
    12: "pottery", // Items found included pottery
    13: "spices", // Likely involved in historic trade of spices
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
              {renderText(
                "Archaeologists Discover Evidence of Prehistoric Island Settlers",
              )}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "In early April 2019, Dr Ceri Shipton and colleagues became the first archaeologists to explore Obi, an island in Indonesia's Maluku Utara province.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "The research team's discoveries suggest that the prehistoric people who lived on Obi were adept on both land and sea, hunting in dense rainforest, foraging on the seashore, and possibly voyaging between islands.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "The excavations were part of a project to learn more about how people first dispersed from mainland Asia through the Indonesian archipelago and into the prehistoric continent that once connected Australia and New Guinea.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The team's earlier research suggested that the northernmost islands, known as the Wallacean islands, including Obi, offered the easiest migration route.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Just inland from the village of Kelo on Obi's northern coast, Shipton and colleagues found two caves containing prehistoric rock shelters suitable for excavation.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "With the permission and help of the local people, they dug a small test excavation in each shelter and found numerous artefacts, including fragments of axes dating to about 14,000 years ago.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "The earliest axes at Kelo were made using clam shells. Similar axes from roughly the same time had also been found elsewhere, including on the nearby island of Gebe.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It is highly likely that Obi's axes were used in canoe construction, allowing early peoples to maintain connections between neighboring islands.",
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
                "The oldest cultural layers from the Kelo site provided the earliest record of human occupation on Obi, dating back around 18,000 years.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "At that time, the climate was drier and colder, and Obi's dense rainforests were likely less impenetrable. Sea levels were about 120 metres lower, making Obi a much larger island, including what is today the separate island of Bisa and other small islands.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Roughly 11,700 years ago, as the most recent ice age ended, the climate became warmer and wetter, thickening Obi's jungle.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Around this time, the first stone axes appear, likely in response to heavy-duty use for clearing and modifying the increasingly dense rainforest.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "Bones unearthed in the Kelo caves indicate that people mainly hunted the Rothschild's cuscus, a possum-like creature still present on Obi.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As the forest grew denser, axes were likely used to clear patches to facilitate hunting.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "The excavation also uncovered obsidian, which must have been brought from another island, as well as beads similar to those found elsewhere in southern Wallacea.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These finds support the idea that Obi islanders routinely traveled to other islands.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Section I */}
            <p className="text-lg">
              {renderText(
                "The Kelo shelters were occupied for about 10,000 years, but around 8,000 years ago, both were abandoned.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The reason for departure is uncertain—perhaps the jungle grew too thick, or people moved to the coast and focused on fishing.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>
            </p>

            {/* Section J */}
            <p className="text-lg">
              {renderText(
                "There is no evidence for use of the Kelo shelters until about 1,000 years ago, when they were re-occupied by people who owned pottery and items made of gold and silver.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This final phase of occupation likely involved people participating in the historic spice trade between the Maluku islands and the rest of the world.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
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
          {/* ---------- Questions 1–7 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–7")}
            </h2>

            <p className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              {renderText("In boxes 1–7 on your answer sheet, choose")}
              <br />
              {renderText("TRUE if the statement agrees with the information")}
              <br />
              {renderText("FALSE if the statement contradicts the information")}
              <br />
              {renderText("NOT GIVEN if there is no information on this")}
            </p>

            {[
              "Archaeological research had taken place on the island of Obi before the arrival of Ceri Shipton and his colleagues.",
              "At the Kelo sites, the researchers found the first clam shell axes ever to be discovered in the region.",
              "The size of Obi today is less than it was 18,000 years ago.",
              "A change in the climate around 11,700 years ago had a greater impact on Obi than on the surrounding islands.",
              "The researchers believe there is a connection between warmer, wetter weather and a change in the material used to make axes.",
              "Shipton's team were surprised to find evidence of the Obi islanders' hunting practices.",
              "It is thought that the Kelo shelters were occupied continuously until about 1,000 years ago.",
            ].map((q, index) => (
              <div key={index} className="space-y-3">
                <p className="text-lg font-semibold">
                  {renderText(`${index + 1}. ${q}`)}
                </p>

                {["TRUE", "FALSE", "NOT GIVEN"].map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center gap-2 cursor-pointer text-lg"
                  >
                    <input
                      type="radio"
                      name={`q${index + 1}`}
                      checked={selectedOptions[index] === oIndex}
                      onChange={() => handleOptionClick(index, oIndex)}
                      className="w-5 h-5"
                    />
                    {renderText(option)}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- Questions 8–13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 8–13")}
            </h2>

            <p className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br />
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer.",
              )}
              <br />
              {renderText(
                "Write your answers in boxes 8–13 on your answer sheet.",
              )}
            </p>

            <div className="space-y-4 border p-4 list-decimal">
              <h2 className="font-bold text-xl text-center mt-2">
                {renderText("Archaeological findings on Obi")}
              </h2>

              <p className="text-lg">
                {renderText("Excavations of rock shelters inside")}{" "}
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
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[8] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 8: e.target.value }))
                  }
                />{" "}
                {renderText(
                  "near the village of Kelo revealed: axes from around 14,000 years ago, probably used to make canoes.",
                )}
              </p>

              <p className="text-lg">
                {renderText("Axes made out of")}{" "}
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
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[9] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 9: e.target.value }))
                  }
                />
                , {renderText("dating from around 11,700 years ago.")}
              </p>

              <p className="text-lg">
                {renderText("Evidence of an animal:")}{" "}
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
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[10] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 10: e.target.value }))
                  }
                />
              </p>

              <p className="text-lg">
                {renderText(
                  "Evidence of travel between islands: obsidian, a material that is not found naturally on Obi,",
                )}{" "}
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
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[11] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 11: e.target.value }))
                  }
                />{" "}
                {renderText("which resembled ones found on other islands.")}
              </p>

              <p className="text-lg">
                {renderText(
                  "It is thought that from 8,000 years ago, Obi islanders may have switched from hunting to fishing and had",
                )}{" "}
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
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[12] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 12: e.target.value }))
                  }
                />{" "}
                {renderText("as well as items made out of metal.")}
              </p>

              <p className="text-lg">
                {renderText("Probably took part in the production and sale of")}{" "}
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
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[13] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 13: e.target.value }))
                  }
                />
                {"."}
              </p>
            </div>
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
      <Reading3Pagination2024></Reading3Pagination2024>
    </div>
  );
};

export default Test3Reading2024;
