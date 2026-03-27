import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2023 from "../Pagination 2023/Reading1Pagination2023";

const Reading1Part22023 = () => {
  const [highlight, setHighlight] = useState(false);
  const [showResult, setShowResult] = useState(false);
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
    // ================= Questions 14–18 (Paragraph matching A–G) =================
    14: "B", // bad outcomes for a forest when people focus only on its financial reward
    15: "A", // reference to the aspects of any tree that contribute to its worth
    16: "C", // mention of the potential use of wood to help run vehicles
    17: "E", // examples of insects that attack trees
    18: "B", // an alternative name for trees that produce low-use wood ("junk trees")

    // ================= Questions 19–21 (Timber cuts A–C) =================
    19: "B", // to remove trees that are diseased (Salvage Cut)
    20: "C", // to generate income across a number of years (Shelterwood Cut)
    21: "C", // to create a forest whose trees are close in age (Shelterwood Cut)

    // ================= Questions 22–26 (ONE WORD ONLY) =================
    22: "fire", // avoid the possibility of fire
    23: "nutrients", // nutrients from the tops of cut trees
    24: "cavities", // cavities provide habitats
    25: "hawthorn", // hawthorn is a source of food
    26: "rare", // rare trees should be left
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part22023");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        [id]: value,
      };

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/reading1Part22023", newScore);
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part22023");
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
            <h1 className="text-xl font-bold">PASSAGE 2</h1>
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
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 14-26</span>
              which are based on Reading Passage 2 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Forest management in Pennsylvania, USA")}
            </h1>
            <p className="text-lg my-5">
              {renderText(
                "How managing low-quality wood (also known as low-use wood) for bioenergy can encourage sustainable forest management"
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "A tree's 'value' depends on several factors including its species, size, form, condition, quality, function, and accessibility, and depends on the management goals for a given forest."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " The same tree can be valued very differently by each person who looks at it. A large, straight black cherry tree has high value as timber to be cut into logs or made into furniture, but for a landowner more interested in wildlife habitat, the real value of that stem (or trunk) may be the food it provides to animals. Likewise, if the tree suffers from black knot disease, its value for timber decreases, but to a woodworker interested in making bowls, it brings an opportunity for a unique and beautiful piece of art."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "In the past, Pennsylvania landowners were solely interested in the value of their trees as high-quality timber. The norm was to remove the stems of highest quality and leave behind poorly formed trees that were not as well suited to the site where they grew."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This practice, called 'high-grading', has left a legacy of 'low-use wood' in the forests. Some people even call these 'junk trees', and they are abundant in Pennsylvania."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                " These trees have lower economic value for traditional timber markets, compete for growth with higher-value trees, shade out desirable regeneration and decrease the health of a stand, leaving it more vulnerable to poor weather and disease. Management that specifically targets low-use wood can help landowners manage these forest health issues, and wood energy markets help promote this."
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "Wood energy markets can accept less expensive wood material of lower quality than would be suitable for traditional timber markets. Most wood used for energy in Pennsylvania is used to produce heat or electricity through combustion. Many schools and hospitals use wood boiler systems to heat and power their facilities, many homes are primarily heated with wood, and some coal plants incorporate wood into their coal streams to produce electricity. Wood can also be gasified for electrical generation and can even be made into liquid fuels like ethanol and gasoline for lorries and cars."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "All these products are made primarily from low-use wood. Several tree- and plant-cutting approaches, which could greatly improve the long-term quality of a forest, focus strongly or solely on the use of wood for those markets."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "One such approach is called a Timber Stand Improvement (TSI) Cut. In a TSI Cut, really poor-quality tree and plant material is cut down to allow more space, light, and other resources to the highest-valued stems that remain. Removing invasive plants might be another primary goal of a TSI Cut."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The stems that are left behind might then grow in size and develop more foliage and larger crowns or tops that produce more coverage for wildlife; they have a better chance to regenerate in a less crowded environment. TSI Cuts can be tailored to one farmer's specific management goals for his or her land."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "Another approach that might yield a high amount of low-use wood is a Salvage Cut. With the many pests and pathogens visiting forests including hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth, to name just a few, it is important to remember that those working in the forests can help ease these issues through cutting procedures."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These types of cut reduce the number of sick trees and seek to manage the future spread of a pest problem. They leave vigorous trees that have stayed healthy enough to survive the outbreak."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "A Shelterwood Cut, which only takes place in a mature forest that has already been thinned several times, involves removing all the mature trees when other seedlings have become established. This then allows the forester to decide which tree species are regenerated. It leaves a young forest where all trees are at a similar point in their growth. It can also be used to develop a two-tier forest so that there are two harvests and the money that comes in is spread out over a decade or more."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "All these practices ensure sustainable forest management while maintaining biodiversity and ecosystem health."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood. However, it is important to remember that some retention of what many would classify as low-use wood is very important. The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil. In addition, trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals. They help control problem insects and increase the health and resilience of the forest."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It is also important to remember that not all small trees are low-use. For example, many species like hawthorn provide food for wildlife. Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
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
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ================= Questions 14–18 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–18")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Reading Passage 2 has seven paragraphs, A–G.")}
            <br />
            {renderText("Which paragraph contains the following information?")}
            <br />
            {renderText(
              "Choose the correct letter, A–G, in boxes 14–18 on your answer sheet."
            )}
            <br />
            {renderText("NB You may use any letter more than once.")}
          </p>

          {[
            {
              num: 14,
              text: "bad outcomes for a forest when people focus only on its financial reward",
            },
            {
              num: 15,
              text: "reference to the aspects of any tree that contribute to its worth",
            },
            {
              num: 16,
              text: "mention of the potential use of wood to help run vehicles",
            },
            {
              num: 17,
              text: "examples of insects that attack trees",
            },
            {
              num: 18,
              text: "an alternative name for trees that produce low-use wood",
            },
          ].map((q) => (
            <div key={q.num} className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-bold">{renderText(String(q.num))}</span>
              <span>{renderText(q.text)}</span>

              <select
                className="border rounded px-2 py-1 w-15"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">{renderText(q.num)}</option>
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <option key={letter} value={letter}>
                    {renderText(letter)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 19–21 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 19–21")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText(
              "Look at the following purposes (Questions 19–21) and the list of timber cuts below."
            )}
          </p>
          <p className="mb-4 font-semibold">
            {renderText("Match each purpose with the correct timber cut, A–C.")}
            <br />
            {renderText("NB You may use any letter more than once.")}
          </p>

          <div className="p-4 mb-4">
            <div className="border p-4 max-w-[320px] mx-auto">
              <p className="font-bold mb-2">
                {renderText("List of Timber Cuts")}
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>{renderText("A. a TSI Cut")}</li>
                <li>{renderText("B. a Salvage Cut")}</li>
                <li>{renderText("C. a Shelterwood Cut")}</li>
              </ul>
            </div>
            <div className="mt-5">
              {[
                {
                  num: 19,
                  text: "to remove trees that are diseased",
                },
                {
                  num: 20,
                  text: "to generate income across a number of years",
                },
                {
                  num: 21,
                  text: "to create a forest whose trees are close in age",
                },
              ].map((q) => (
                <div
                  key={q.num}
                  className="flex flex-wrap items-center gap-3 mb-3"
                >
                  <span className="font-bold">{renderText(String(q.num))}</span>
                  <span>{renderText(q.text)}</span>
                  <select
                    className="border rounded px-2 py-1 w-15"
                    value={userAnswers[q.num] || ""}
                    onChange={(e) => handleInputChange(q.num, e.target.value)}
                  >
                    <option value="">{renderText(q.num)}</option>
                    {["A", "B", "C"].map((letter) => (
                      <option key={letter} value={letter}>
                        {renderText(letter)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* ================= Questions 22–26 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 22–26")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Complete the sentences below.")}
            <br />
            {renderText(
              "Choose ONE WORD ONLY from the passage for each answer."
            )}
          </p>

          <ul className="list-disc list-inside space-y-4 text-lg border p-5">
            {[
              {
                num: 22,
                text: "Some dead wood is removed to avoid the possibility of",
              },
              {
                num: 23,
                text: "The",
                suffix:
                  "from the tops of cut trees can help improve soil quality.",
              },
              {
                num: 24,
                text: "Some damaged trees should be left, as their",
                suffix: "provide habitats for a range of creatures.",
              },
              {
                num: 25,
                text: "Some trees that are small, such as",
                suffix: ", are a source of food for animals and insects.",
              },
              {
                num: 26,
                text: "Any trees that are",
                suffix:
                  "should be left to grow, as they add to the variety of species in the forest.",
              },
            ].map((q) => (
              <li key={q.num} className="flex flex-wrap items-center gap-2">
                <span className="font-bold">{renderText(String(q.num))}</span>
                <span>{renderText(q.text)}</span>
                <input
                  type="text"
                  placeholder={q.num}
                  className="border rounded px-2 py-1 w-32"
                  value={userAnswers[q.num] || ""}
                  onChange={(e) => handleInputChange(q.num, e.target.value)}
                />
                {q.suffix && <span>{renderText(q.suffix)}</span>}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
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
                    {renderText(`Your Score: ${score}/10`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (14–26)")}
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
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

                          {/* User Answer */}
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

                          {/* Correct Answer */}
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
      <Reading1Pagination2023></Reading1Pagination2023>
    </div>
  );
};

export default Reading1Part22023;
