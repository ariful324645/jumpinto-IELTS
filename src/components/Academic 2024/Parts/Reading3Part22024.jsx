import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2024 from "../Pagination 2024/Reading3Pagination2024";

const Reading3Part22024 = () => {
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
    // Questions 14–17 (Matching paragraphs A–H)
    14: "C", // need to ensure inhabitants of wetland regions continue to benefit
    15: "B", // proportion of wetlands already lost
    16: "A", // people beginning to appreciate the value of wetlands
    17: "H", // cultural significance of wetlands

    // Questions 18–22 (ONE WORD ONLY)
    18: "carbon", // released instead of stored
    19: "fires", // more likely to occur
    20: "biodiversity", // destroyed by oil palm plantations
    21: "canals", // created by logging companies
    22: "subsidence", // leads to coastal flooding and land loss

    // Questions 23–26 (Matching experts A–D)
    23: "B", // Pieter van Eijk
    24: "A", // Matthew McCartney
    25: "C", // Marcel Silvius
    26: "D", // Dave Tickner
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
  const updateAnswer = (q, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [q]: value };
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
              {renderText("The global importance of wetlands")}
            </h1>

            {/* Section A */}
            <p className="text-lg my-5">
              {renderText(
                "Wetlands are areas where water covers the soil, or is present either at or near the surface of the soil, for all or part of the year. These are complex ecosystems, rich in unique plant and animal life. But according to the World Wide Fund for Nature (WWFN), half of the world's wetlands have disappeared since 1990 - converted or destroyed for commercial development, drainage schemes and the extraction of minerals and peat*.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Many of those that remain have been damaged by agricultural pesticides and fertilisers, industrial pollutants, and construction works.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Throughout history, humans have gathered around wetlands, and their fertile ecosystems have played an important part in human development. Consequently, they are of considerable religious, historical and archaeological value to many communities around the world.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"Wetlands directly support the livelihoods and well-being of millions of people," says Dr Matthew McCartney, principal researcher and hydrologist at the International Water Management Institute (IWMI). "In many developing countries, large numbers of people are dependent on wetland agriculture for their livelihoods."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                'They also serve a crucial environmental purpose. "Wetlands are one of the key tools in mitigating climate change across the planet," says Pieter van Eijk, head of Climate Adaptation at Wetlands International (WI), pointing to their use as buffers that protect coastal areas from sea-level rise and extreme weather events such as hurricanes and flooding.',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  'Wetland coastal forests provide food and water, as well as shelter from storms, and WI and other agencies are working to restore those forests which have been lost. "It can be as simple as planting a few trees per hectare to create shade and substantially change a microclimate," he says. "Implementing climate change projects isn\'t so much about money."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "The world's wetlands are, unfortunately, rich sources for in-demand commodities, such as palm oil and pulpwood. Peatlands - wetlands with a waterlogged organic soil layer - are particularly targeted.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "When peatlands are drained for cultivation, they become net carbon emitters instead of active carbon stores, and, according to Marcel Silvius, head of Climate-smart Land-use at WI, this practice causes six per cent of all global carbon emissions. The clearance of peatlands for planting also increases the risk of forest fires, which release huge amounts of CO₂. 'We're seeing huge peatland forests with extremely high biodiversity value being lost for a few decades of oil palm revenues,' says Silvius.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "The damage starts when logging companies arrive to clear the trees. They dig ditches to enter the peat swamps by boat and then float the logs out the same way. These are then used to drain water out of the peatlands to allow for the planting of corn, oil palms or pulpwood trees.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Once the water has drained away, bacteria and fungi then break down the carbon in the peat and turn it into CO₂ and methane. Meanwhile, the remainder of the solid matter in the peat starts to move downwards, in a process known as subsidence*. Peat comprises 90 per cent water, so this is one of the most alarming consequences of peatland clearances. 'In the tropics, peat subsides at about four centimetres a year, so within half a century, very large landscapes on Sumatra and Borneo will become flooded as the peat drops below water level,' says Silvius. 'It's a huge catastrophe that's in preparation. Some provinces will lose 40 per cent of their landmass.'",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "And while these industries affect wetlands in ways that can easily be documented, Dr Dave Tickner of the WWFN believes that more subtle impacts can be even more devastating. 'Sediment run-off and fertilisers can be pretty invisible,' says Tickner. 'Over-extraction of water is equally invisible. You do get shock stories about rivers running red, or even catching fire, but there's seldom one big impact that really hurts a wetland.'",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Tickner does not blame anyone for deliberate damage, however. 'I've worked on wetland issues for 20 years and have never met anybody who wanted to damage a wetland,' he says. 'It isn't something that people generally set out to do. Quite often, the effects simply come from people trying to make a living.'",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "Silvius also acknowledges the importance of income generation. 'It's not that we just want to restore the biodiversity of wetlands - which we do - but we recognise there's a need to provide an income for local people.'",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"The idea is that people in a developing country will only protect wetlands if they value and profit from them," says McCartney. "For sustainability, it\'s essential that local people are involved in wetland planning and decision making and have clear rights to use wetlands."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "The fortunes of wetlands would be improved, Silvius suggests, if more governments recognised their long-term value. 'Different governments have different attitudes,' he says, and goes on to explain that some countries place a high priority on restoring wetlands, while others still deny the issue.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  'McCartney is cautiously optimistic, however. "Awareness of the importance of wetlands is growing. It\'s true that wetland degradation still continues at a rapid pace, but my impression is that things are slowly changing."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 14–17 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–17")}
          </h2>

          <p className="mb-4">
            {renderText("Reading Passage 2 has eight paragraphs, A-H.")}
          </p>
          <p className="mb-4">
            {renderText(" Which paragraph contains the following information?")}
          </p>
          <p className="mb-4">
            {renderText(
              "  Choose the correct letter, A-H, in boxes 14-17 on your answer sheet.",
            )}
          </p>

          <div className="space-y-4">
            {[
              {
                q: 14,
                text: "reference to the need to ensure that inhabitants of wetland regions continue to benefit from them",
              },
              {
                q: 15,
                text: "the proportion of wetlands which have already been lost",
              },
              {
                q: 16,
                text: "reference to the idea that people are beginning to appreciate the value of wetlands",
              },
              {
                q: 17,
                text: "mention of the cultural significance of wetlands",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg flex items-center gap-2">
                {/* Question number */}
                <span className="font-bold w-6">
                  {renderText(q.toString())}
                </span>

                {/* Question text */}
                <span className="">{renderText(text)}</span>

                {/* Dropdown */}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15"
                  value={userAnswers[q] || ""}
                  onChange={(e) => updateAnswer(q, e.target.value)}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 18–22 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 18–22")}
          </h2>

          <p className="mb-4">{renderText("Complete the sentences below.")}</p>

          <p className="mb-4">
            {renderText(
              "Choose ONE WORD ONLY from the passage for each answer.",
            )}
          </p>
          <p className="mb-4">
            {renderText(
              "Write your answers in boxes 18-22 on your answer sheet.",
            )}
          </p>

          <div className="space-y-4">
            {[
              {
                q: 18,
                before: "Peatlands which have been drained begin to release",
                after: "instead of storing it.",
              },
              {
                q: 19,
                before: "Once peatland areas have been cleared,",
                after: "are more likely to occur.",
              },
              {
                q: 20,
                before:
                  "Clearing peatland forests to make way for oil palm plantations destroys the",
                after: "of the local environment.",
              },
              {
                q: 21,
                before: "Water is drained out of peatlands through the",
                after: "which are created by logging companies.",
              },
              {
                q: 22,
                before: "Draining peatlands leads to",
                after:
                  ": a serious problem which can eventually result in coastal flooding and land loss.",
              },
            ].map(({ q, before, after }) => (
              <p key={q} className="text-lg flex items-center gap-2 flex-wrap">
                {/* Question number */}
                <span className="font-bold w-6">
                  {renderText(q.toString())}
                </span>

                {/* Before text */}
                <span>{renderText(before)}</span>

                {/* Input in the middle */}
                <input
                  type="text"
                  placeholder=""
                  value={userAnswers[q] || ""}
                  onChange={(e) => updateAnswer(q, e.target.value)}
                  className="border-2 border-gray-400  px-1
                    w-30 shrink-0"
                />

                {/* After text */}
                <span>{renderText(after)}</span>
              </p>
            ))}
          </div>

          {/* ================= Questions 23–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 23–26")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Look at the following statements (Questions 23-26) and the list of experts below.",
            )}
          </p>
          <p className="mb-4">
            {renderText(" Match each statement with the correct expert, A-D")}
          </p>
          <p className="mb-4">
            {renderText(
              "  Choose the correct letter, A-D, next to Questions 23-26.",
            )}
          </p>
          <div className="border p-4 rounded mb-6 max-w-[300px] mx-auto text-lg">
            <h2 className=" font-bold text-xl text-center">
              {renderText("List of Experts")}
            </h2>
            {[
              "A. Matthew McCartney",
              "B. Pieter van Eijk",
              "C. Marcel Silvius",
              "D. Dave Tickner",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4">
            {[
              {
                q: 23,
                text: "Communities living in wetland regions must be included in discussions about the future of these areas.",
              },
              {
                q: 24,
                text: "Official policies towards wetlands vary from one nation to the next.",
              },
              {
                q: 25,
                text: "People cause harm to wetlands without having any intention to do so.",
              },
              {
                q: 26,
                text: "Initiatives to reverse environmental damage need not be complex.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-start gap-3 text-lg">
                {/* Question number */}
                <span className="font-bold w-6 shrink-0">
                  {renderText(q.toString())}
                </span>

                {/* Question text */}
                <span className="">{renderText(text)}</span>

                {/* Dropdown */}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15 shrink-0"
                  value={userAnswers[q] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: e.target.value };
                      calculateScore(updated);
                      return updated;
                    })
                  }
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
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
                    All Answers (14–26)
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
                              <span>{userAnswer}</span>
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
      <Reading3Pagination2024></Reading3Pagination2024>
    </div>
  );
};

export default Reading3Part22024;
