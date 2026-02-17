import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2025 from "../Pagination 2025/Reading2Pagination2025";

const Test2Reading2025 = () => {
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
    // Questions 1–6 (ONE WORD AND/OR NUMBER)
    1: "appearance", // look similar to dugongs, but differently shaped
    2: "flippers", // movement: use flippers to turn body
    3: "hairs", // sense vibrations by hairs on skin
    4: "seagrasses", // feeding: eat mainly aquatic vegetation
    5: "lips", // grasp and pull up plants with their lips
    6: "buoyancy", // regulate the buoyancy of body using diaphragm

    // Questions 7–13 (TRUE / FALSE / NOT GIVEN)
    7: "TRUE", // West Indian manatees: variety of habitats
    8: "TRUE", // Florida manatee lives in warmer waters
    9: "TRUE", // African manatee: range limited to coastal West Africa
    10: "TRUE", // Amazonian manatees: mid-20th century loss revealed later
    11: "TRUE", // West Indian manatee populations predicted to fall
    12: "TRUE", // risk from entanglement & plastic increased 2009-2020
    13: "TRUE", // legislation for boat strikes in Florida
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
              {renderText("Manatees")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage below.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "Manatees, also known as sea cows, are aquatic mammals that belong to a group of animals called Sirenia. This group also contains dugongs. Dugongs and manatees look quite alike - they are similar in size, colour and shape, and both have flexible flippers for forelimbs. However, the manatee has a broad, rounded tail, whereas the dugong's is fluked, like that of a whale.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  'There are three species of manatees: the West Indian manatee ("Trichechus manatus"), the African manatee ("Trichechus senegalensis") and the Amazonian manatee ("Trichechus inunguis").',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Unlike most mammals, manatees have only six bones in their neck - most others, including humans and giraffes, have seven. This short neck allows a manatee to move its head up and down, but not side to side. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "To see something on its left or its right, a manatee must turn its entire body, steering with its flippers.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>

              {renderText(
                "Manatees have pectoral flippers but no back limbs, only a tail for propulsion. They do have pelvic bones, however - a leftover from their evolution from a four-legged to a fully aquatic animal. Manatees share some visual similarities to elephants. Like elephants, manatees have thick, wrinkled skin.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " They also have some hairs covering their bodies which help them sense vibrations in the water around them",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Seagrasses and other marine plants make up most of a manatee's diet",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>
              {renderText(
                ". Manatees spend about eight hours each day grazing and uprooting plants. They eat up to 15% of their weight in food each day. African manatees are omnivorous - studies have shown that molluscs and fish make up a small part of their diets. West Indian and Amazonian manatees are both herbivores.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "Manatees' teeth are all molars - flat, rounded teeth for grinding food. Due to manatees' abrasive aquatic plant diet, these teeth get worn down and they eventually fall out, so they continually grow new teeth that get pushed forward to replace the ones they lose. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Instead of having incisors to grasp their food, manatees have lips which function like a pair of hands to help tear food away from the seafloor.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Manatees are fully aquatic, but as mammals, they need to come up to the surface to breathe. When awake, they typically surface every two to four minutes, but they can hold their breath for much longer. Adult manatees sleep underwater for 10-12 hours a day, but they come up for air every 15-20 minutes. Active manatees need to breathe more frequently. . They may use diaphragm contractions to compress and store gas in folds in their large intestine to help them float.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It's thought that manatees use their muscular diaphragm and breathing to adjust their buoyancy",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "The West Indian manatee reaches about 3.5 metres long and weighs on average around 500 kilogrammes. It moves between fresh water and salt water, taking advantage of coastal mangroves and coral reefs, rivers, lakes and inland lagoons. There are two subspecies of West Indian manatee: the Antillean manatee is found in waters from the Bahamas to Brazil, whereas the Florida manatee is found in US waters, although some individuals have been recorded in the Bahamas. In winter, the Florida manatee is typically restricted to Florida. When the ambient water temperature drops below 20ºC, it takes refuge in naturally and artificially warmed water, such as at the warm-water outfalls from powerplants.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("6")}
                </span>
              )}
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "The African manatee is also about 3.5 metres long and found in the sea along the west coast of Africa, from Mauritania down to Angola. The species also makes use of rivers, with the mammals seen in landlocked countries such as Mali and Niger.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " It moves between fresh water and salt water, taking advantage of coastal mangroves and coral reefs, rivers, lakes and inland lagoons.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "The Amazonian manatee is the smallest species, though it is still a big animal. It grows to about 2.5 metres long and 350 kilogrammes. Amazonian manatees favour calm, shallow waters that are above 23ºC. This species is found in fresh water in the Amazon Basin in Brazil, as well as in Colombia, Ecuador and Peru. All three manatee species are endangered or at a heightened risk of extinction. The African manatee and Amazonian manatee are both listed as Vulnerable by the International Union for Conservation of Nature (IUCN). It is estimated that 140,000 Amazonian manatees were killed between 1935 and 1954 for their meat, fat and skin, with the latter used to make leather. In more recent years, African manatee decline has been tied to incidental capture in fishing nets and hunting. Manatee hunting is now illegal in every country the African species is found in.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " The species also makes use of rivers, with the mammals seen in landlocked countries such as Mali and Niger",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
            </p>

            {/* Section I */}
            <p className="text-lg">
              {renderText(
                "The two subspecies of West Indian manatee are listed as Endangered by the IUCN. Both are also expected to undergo a decline of 20% over the next 40 years. A review of almost 1,800 cases of entanglement in fishing nets and of plastic consumption among marine mammals in US waters from 2009 to 2020 found that at least 700 cases involved manatees. The chief cause of death in Florida manatees is boat strikes. However, laws in certain parts of Florida now limit boat speeds during winter, allowing slow-moving manatees more time to respond.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Both are also expected to undergo a decline of 20% over the next 40 years.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
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
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–6")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br />
              {renderText(
                "Choose ONE WORD AND/OR A NUMBER from the passage for each answer.",
              )}
              <br />
              {renderText(
                "Write your answers in boxes 1–6 on your answer sheet.",
              )}
            </h3>

            <div className="space-y-4 border p-4 list-decimal">
              <h2 className="font-bold text-xl text-center mt-2">
                {renderText("Manatees")}
              </h2>

              {/* Question 1 */}
              <p className="text-lg">
                {renderText(
                  "Appearance: look similar to dugongs, but with a differently shaped ",
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
              </p>

              {/* Question 2 */}
              <p className="text-lg">
                {renderText(
                  "Movement: have fewer neck bones than most mammals, need to use their ",
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
                {renderText(
                  " to help to turn their bodies around in order to look sideways.",
                )}
              </p>

              {/* Question 3 */}
              <p className="text-lg">
                {renderText("Sense vibrations in the water by means of ")}
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
                {renderText(" on their skin.")}
              </p>

              {/* Question 4 */}
              <p className="text-lg">
                {renderText("Feeding: eat mainly aquatic vegetation, such as ")}
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
              </p>

              {/* Question 5 */}
              <p className="text-lg">
                {renderText("Grasp and pull up plants with their ")}
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
              </p>

              {/* Question 6 */}
              <p className="text-lg">
                {renderText("Breathing: may regulate the ")}
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
                {renderText(
                  " of their bodies by using muscles of diaphragm to store air internally.",
                )}
              </p>
            </div>
          </div>

          {/* ---------- Questions 7–13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7–13")}
            </h2>

            <p className="text-lg font-semibold mb-4">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              {renderText("In boxes 7–13 on your answer sheet, choose")}
              <br />
              {renderText(
                "TRUE if the statement agrees with the information, FALSE if it contradicts the information, NOT GIVEN if there is no information on this.",
              )}
            </p>

            {[
              "West Indian manatees can be found in a variety of different aquatic habitats.",
              "The Florida manatee lives in warmer waters than the Antillean manatee.",
              "The African manatee's range is limited to coastal waters between the West African countries of Mauritania and Angola.",
              "The extent of the loss of Amazonian manatees in the mid-twentieth century was only revealed many years later.",
              "It is predicted that West Indian manatee populations will fall in the coming decades.",
              "The risk to manatees from entanglement and plastic consumption increased significantly in the period 2009-2020.",
              "There is some legislation in place which aims to reduce the likelihood of boat strikes on manatees in Florida.",
            ].map((statement, index) => (
              <div key={index} className="space-y-2">
                <p className="text-lg font-semibold">
                  {renderText(`${index + 7}. ${statement}`)}
                </p>
                {["TRUE", "FALSE", "NOT GIVEN"].map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center gap-2 cursor-pointer text-lg"
                  >
                    <input
                      type="radio"
                      name={`q${index + 7}`}
                      checked={selectedOptions[index + 7] === oIndex}
                      onChange={() => handleOptionClick(index + 7, oIndex)}
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
      <Reading2Pagination2025></Reading2Pagination2025>
    </div>
  );
};

export default Test2Reading2025;
