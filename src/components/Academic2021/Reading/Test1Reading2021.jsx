import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2021 from "../Pagination 2021/Reading1Pagination2021";

const Test1Reading2021 = () => {
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
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 1; // IMPORTANT (see note below)
      const updated = { ...prev, [answerKey]: option };
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
    localStorage.setItem("/2021/Test 1/reading", newScore);
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
    1: "FALSE",
    2: "TRUE",
    3: "NOT GIVEN",
    4: "TRUE",
    5: "TRUE",
    6: "FALSE",
    7: "TRUE",
    8: "clumsy",
    9: "tool",
    10: "meat",
    11: "camera",
    12: "game",
    13: "frustration",
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
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 1-13")}
              </span>
              {renderText(" which are based on Reading Passage 1 below.")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Why we need to protect polar bears")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Polar bears are being increasingly threatened by the effects of climate change, but their disappearance could have far-reaching consequences. They are uniquely adapted to the extreme conditions of the Arctic Circle, where temperatures can reach -40°C. One reason for this is that they have up to 11 centimetres of fat underneath their skin. Humans with comparative levels of adipose tissue would be considered obese and would be likely to suffer from diabetes and heart disease. Yet the polar bear experiences no such consequences."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "A 2014 study by Shi Ping Liu and colleagues sheds light on this mystery. They compared the genetic structure of polar bears with that of their closest relatives from a warmer climate, the brown bears."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This allowed them to determine the genes that have allowed polar bears to survive in one of the toughest environments on Earth."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                " Liu and his colleagues found the polar bears had a gene known as APoB, which reduces levels of low-density lipoproteins (LDLs) - a form of 'bad' cholesterol. In humans, mutations of this gene are associated with increased risk of heart disease. Polar bears may therefore be an important study model to understand heart disease in humans."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The genome of the polar bear may also provide the solution for another condition, one that particularly affects our older generation: osteoporosis. This is a disease where bones show reduced density, usually caused by insufficient exercise, reduced calcium intake or food starvation. Bone tissue is constantly being remodelled, meaning that bone is added or removed, depending on nutrient availability and the stress that the bone is under."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Female polar bears, however, undergo extreme conditions during every pregnancy. Once autumn comes around, these females will dig maternity dens in the snow and will remain there throughout the winter, both before and after the birth of their cubs. This process results in about six months of fasting, where the female bears have to keep themselves and their cubs alive, depleting their own calcium and calorie reserves."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              {renderText(
                " Despite this, their bones remain strong and dense."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Physiologists Alanda Lennox and Allen Goodship found an explanation for this paradox in 2008. They discovered that pregnant bears were able to increase the density of their bones before they started to build their dens. In addition, six months later, when they finally emerged from the den with their cubs, there was no evidence of significant loss of bone density."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Hibernating brown bears do not have this capacity and must therefore resort to major bone reformation in the following spring. If the mechanism of bone remodelling in polar bears can be understood, many bedridden humans, and even astronauts, could potentially benefit."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The medical benefits of the polar bear for humanity certainly have their importance in our conservation efforts, but these should not be the only factors taken into consideration. We tend to want to protect animals we think are intelligent and possess emotions, such as elephants and primates. Bears, on the other hand, seem to be perceived as stupid and in many cases violent."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "And yet anecdotal evidence from the field challenges those assumptions, suggesting for example that polar bears have good problem-solving abilities. A male bear called GoGo in Tennoji Zoo, Osaka, has even been observed making use of a tool to manipulate his environment."
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
                "The bear used a tree branch on multiple occasions to dislodge a piece of meat hung out of his reach. Problem-solving ability has also been witnessed in wild polar bears, although not as obviously as with GoGo."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "A calculated move by a male bear involved running and jumping onto barrels in an attempt to get to a photographer standing on a platform four metres high."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In other studies, such as one by Alison Ames in 2008, polar bears showed deliberate and focused manipulation. For example, Ames observed bears putting objects in piles and then knocking them over in what appeared to be a game."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The study demonstrates that bears are capable of agile and thought-out behaviours. These examples suggest bears have greater creativity and problem-solving abilities than previously thought."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "As for emotions, while the evidence is once again anecdotal, many bears have been seen to hit out at ice and snow—seemingly out of frustration—when they have just missed out on a kill. Moreover, polar bears can form unusual relationships with other species, including playing with the dogs used to pull sleds in the Arctic."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Remarkably, one hand-raised polar bear called Agee has formed a close relationship with her owner Mark Dumas to the point where they even swim together. This is even more astonishing since polar bears are known to actively hunt humans in the wild."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "If climate change were to lead to their extinction, this would mean not only the loss of potential breakthroughs in human medicine, but more importantly, the disappearance of an intelligent, majestic animal."
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
          {/* ================= Questions 1–7 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 1–7</h2>

          <p className="mb-4">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>

          <div className="mb-4 space-y-1">
            <p>
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p>
              <strong>FALSE</strong> if the statement contradicts the
              information
            </p>
            <p>
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Polar bears suffer from various health problems due to the build-up of fat under their skin.",
              "The study done by Liu and his colleagues compared different groups of polar bears.",
              "Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.",
              "Polar bears are able to control their levels of bad cholesterol by genetic means.",
              "Female polar bears are able to survive for about six months without food.",
              "It was found that the bones of female polar bears were very weak when they came out of their dens in spring.",
              "The polar bear's mechanism for increasing bone density could also be used by people one day.",
            ].map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div
                    onClick={() => handleNumberClick(qIndex)}
                    className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer
              ${
                activeNumbers[qIndex]
                  ? "bg-yellow-400 border-yellow-500"
                  : "border-gray-300"
              }
            `}
                  >
                    {qIndex + 1}
                  </div>
                  <p className="text-lg">{q}</p>
                </div>

                <div className="ml-12 space-y-2">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleOptionClick(qIndex, option)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2
          ${
            selectedOptions[qIndex] === option
              ? "bg-blue-500 border-blue-500"
              : "border-gray-500"
          }
        `}
                      />
                      <span
                        className={
                          selectedOptions[qIndex] === option
                            ? "text-blue-500"
                            : ""
                        }
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 8–13 ================= */}

          <h2 className="text-lg font-bold mt-4">Questions 8–13</h2>

          <h2 className="mt-4">
            Complete the notes below. <br />
          </h2>
          <p className="mt-4">
            {" "}
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <div className="border p-5 mt-4">
            <h3 className="text-xl font-bold text-center mb-4">
              Reasons why polar bears should be protected
            </h3>

            <ul className="list-disc list-inside space-y-4 text-lg">
              {/* 8 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>People think of bears as unintelligent and</span>

                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  8
                </span>

                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(8, e.target.value)}
                />
              </li>

              <li className="font-semibold">
                However, this may not be correct. For example:
              </li>

              {/* 9 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  In Tennoji Zoo, a bear has been seen using a branch as a
                </span>

                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  9
                </span>
                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(9, e.target.value)}
                />
              </li>

              {/* 10 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>This allowed him to knock down some</span>

                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  10
                </span>

                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(10, e.target.value)}
                />
              </li>

              {/* 11 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  A wild polar bear worked out a method of reaching a platform
                  where a
                </span>

                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  11
                </span>

                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(11, e.target.value)}
                />

                <span>was located.</span>
              </li>

              {/* 12 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>
                  Polar bears have displayed behaviour such as conscious
                  manipulation of objects and activity similar to a
                </span>

                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  12
                </span>

                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(12, e.target.value)}
                />
              </li>

              <li className="font-semibold">
                Bears may also display emotions. For example:
              </li>

              {/* 13 */}
              <li className="flex items-center flex-wrap gap-2">
                <span>They may make movements suggesting</span>

                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 font-bold">
                  13
                </span>

                <input
                  type="text"
                  className="border-2 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(13, e.target.value)}
                />

                <span>if disappointed when hunting.</span>
              </li>

              <li>They may form relationships with other species.</li>
            </ul>
          </div>

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
                    All Answers (1-13)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = userAnswers[num];
                      const correctAnswer = correctAnswers[num];

                      const isCorrect =
                        typeof userAnswer === "string" &&
                        userAnswer.trim().toLowerCase() ===
                          correctAnswer.trim().toLowerCase();

                      const isWrong = userAnswer && !isCorrect;

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
                              </span>
                            )}

                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <ImCross className="text-white text-sm" />
                              </div>
                            )}

                            <p className="font-bold">Q{num}:</p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswer}</span>
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
      <Reading1Pagination2021></Reading1Pagination2021>
    </div>
  );
};

export default Test1Reading2021;
