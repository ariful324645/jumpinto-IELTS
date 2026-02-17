import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2025 from "../Pagination 2025/Reading4Pagination2025";

const Reading4Part22025 = () => {
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
    localStorage.setItem("/2022/Test 1/reading", newScore); // match your latest key
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
    14: "C",
    15: "A",
    16: "D",
    17: "F",
    18: "pumps",
    19: "dams",
    20: "float",
    21: "crops",
    22: "trees",
    23: "B",
    24: "E",
    25: "C",
    26: "A",
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
  const handleSubmit = () => {
    setShowResult(true);
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
              {renderText("Adapting to the effects of climate change")}
            </h1>

            {/* Section A */}
            <p className="text-lg mt-5">
              {renderText(
                "All around the world, nations are already preparing for, and adapting to, climate change and its impacts.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Even if we stopped all CO2 emissions tomorrow, we would continue to see the impact of the CO2 already released since industrial times, with scientists forecasting that global warming would continue for around 40 years.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " In the meantime, ice caps would continue to melt and sea levels rise. Some countries and regions will suffer more extreme impacts from these changes than others. It's in these places that innovation is thriving.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg mt-5">
              {renderText(
                " In Miami Beach, Florida, USA, seawater isn't just breaching the island city's walls, it's seeping up through the ground, so the only way to save the city is to lift it up above sea level.Starting in the lowest and most vulnerable neighbourhoods, roads have been raised by as much as 61 centimetres.The elevation work was carried out as part of Miami Beach's ambitious but much-needed stormwater-management programme.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Starting in the lowest and most vulnerable neighbourhoods, roads have been raised by as much as 61 centimetres.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                " The elevation work was carried out as part of Miami Beach's ambitious but much-needed stormwater-management programme.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " In the face of floods, climate-mitigation strategies have often been overlooked, says Yanira Pineda.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg mt-5">
              {renderText(
                "Seawalls are a staple strategy for many coastal communities, but on the soft, muddy northern shores of Java, Indonesia, they frequently collapse, further exacerbating coastal erosion.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " There have been many attempts to restore the island's coastal mangroves: ecosystems of trees and shrubs that help defend coastal areas by trapping sediment in their net-like root systems, elevating the sea bed and dampening the energy of waves and tidal currents.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                " Wetlands International therefore built semi-permeable dams to encourage mangroves to grow back naturally.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " For long-term success, it's critical that we transition towards multifunctional approaches.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg mt-5">
              {renderText(
                "As the floodwaters rose in the rice fields of the Mekong Delta in September 2018, four small houses rose with them.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Homes in this part of Vietnam are traditionally built on stilts but these ones had been built to float.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " This technology is becoming necessary in places that didn't previously need it.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg mt-5">
              {renderText(
                "Bangladesh is especially vulnerable to climate change.Most of the country is less than a metre above sea level and 80 per cent of its land lies on floodplains.Almost 35 million people living on the coastal belt of Bangladesh are currently affected by soil and water salinity, says Raisa Chowdhury of the international development organisation ICCO Cooperation.Rather than fighting against it, one project is helping communities adapt to salt-affected soils.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " ICCO Cooperation has been working with farmers to cultivate salt-tolerant crops.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg mt-5">
              {renderText(
                "Greg Spotts from Los Angeles leads the Cool Streets LA programme.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Urban cooling is literally a matter of life and death.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Using a Geographic Information System data mapping tool, the programme identified streets with low tree canopy cover in three of the city's neighbourhoods and covered them with a light-grey, light-reflecting coating, which had already been shown to lower road surface temperature in Los Angeles by 6°C",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ================= Questions 14–17 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–17")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information?",
            )}
          </p>

          <ul className="space-y-6 text-lg">
            {[
              {
                num: 14,
                text: "how a type of plant functions as a natural protection for coastlines",
              },
              {
                num: 15,
                text: "a prediction about how long it could take to stop noticing the effects of climate change",
              },
              {
                num: 16,
                text: "a reference to the fact that a solution is particularly cost-effective",
              },
              {
                num: 17,
                text: "a mention of a technology used to locate areas most in need of intervention",
              },
            ].map(({ num, text }) => (
              <li key={num} className="flex items-center gap-3">
                {/* Number + Text */}
                <p className="">
                  <span className="font-bold mr-2">
                    {renderText(num.toString())}
                  </span>
                  {renderText(text)}
                </p>

                {/* Select */}
                <select
                  className="border-2 border-gray-300 rounded-md px-3 py-1 w-20"
                  value={userAnswers[num] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [num]: value };
                      calculateScore(updated); // ✅ recalc score immediately
                      return updated;
                    });
                  }}
                >
                  <option value="">{num}</option>
                  {["A", "B", "C", "D", "E", "F"].map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>

          {/* ================= Questions 18–22 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 18–22")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.",
            )}
          </p>

          <ul className="space-y-6 text-lg">
            {[
              {
                num: 18,
                before:
                  "The stormwater-management programme in Miami Beach has involved the installation of efficient",
                after: ".",
              },
              {
                num: 19,
                before: "The construction of",
                after:
                  "was the first stage of a project to ensure the success of mangroves in Indonesia.",
              },
              {
                num: 20,
                before:
                  "As a response to rising floodwaters in the Mekong Delta, a not-for-profit organisation has been building houses that can",
                after: ".",
              },
              {
                num: 21,
                before:
                  "Rising sea levels in Bangladesh have made it necessary to introduce various",
                after: "that are suitable for areas of high salt content.",
              },
              {
                num: 22,
                before: "A project in LA has increased the number of",
                after: "on the city's streets.",
              },
            ].map(({ num, before, after }) => (
              <li key={num} className="flex items-center flex-wrap gap-2">
                {/* number */}
                <span className="font-bold">{renderText(num.toString())}</span>

                {/* text before */}
                <span>{renderText(before)}</span>

                {/* BOX input (AGER MOTO) */}
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-3 py-1 w-40"
                  value={userAnswers[num] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [num]: value };
                      calculateScore(updated); // ✅ recalc score immediately
                      return updated;
                    });
                  }}
                />

                {/* text after */}
                <span>{renderText(after)}</span>
              </li>
            ))}
          </ul>

          {/* ================= Questions 23–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 23–26")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Look at the following statements and the list of people below. Match each statement with the correct person.",
            )}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[300px] mx-auto text-lg">
            <p>{renderText("A. Yanira Pineda")}</p>
            <p>{renderText("B. Susanna Tol")}</p>
            <p>{renderText("C. Elizabeth English")}</p>
            <p>{renderText("D. Raisa Chowdhury")}</p>
            <p>{renderText("E. Greg Spotts")}</p>
          </div>

          <div>
            <ul className="space-y-4 text-lg flex flex-col">
              {[
                {
                  num: 23,
                  text: "It is essential to adopt strategies which involve and help residents of the region.",
                },
                {
                  num: 24,
                  text: "Interventions which reduce heat are absolutely vital for our survival in this location.",
                },
                {
                  num: 25,
                  text: "More work will need to be done in future decades to deal with the impact of rising water levels.",
                },
                {
                  num: 26,
                  text: "The number of locations requiring action to adapt to flooding has grown in recent years.",
                },
              ].map(({ num, text }) => (
                <li key={num} className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold whitespace-nowrap">
                    {renderText(num.toString())}
                  </span>

                  <span className="">{renderText(text)}</span>

                  <select
                    className="border-2 border-gray-300 rounded-md px-3 py-1 w-20"
                    value={userAnswers[num] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserAnswers((prev) => {
                        const updated = { ...prev, [num]: value };
                        calculateScore(updated); // ✅ recalc score immediately
                        return updated;
                      });
                    }}
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
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
                      {renderText("Your Score:")} {score}/14
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (14–26)")}
                    </h3>
                    <ul className="space-y-3">
                      {Array.from({ length: 13 }, (_, i) => i + 14).map(
                        (num) => {
                          const userAnswer = (userAnswers[num] || "")
                            .toString()
                            .trim()
                            .toUpperCase();
                          const correctAnswer = (correctAnswers[num] || "")
                            .toString()
                            .trim()
                            .toUpperCase();
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
                                  <span>{userAnswer}</span>
                                )}
                              </p>

                              <p className="ml-8">
                                <span className="font-semibold text-green-600">
                                  {renderText("Correct Answer:")}
                                </span>{" "}
                                <span>{renderText(correctAnswer)}</span>
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
      <Reading4Pagination2025></Reading4Pagination2025>
    </div>
  );
};

export default Reading4Part22025;
