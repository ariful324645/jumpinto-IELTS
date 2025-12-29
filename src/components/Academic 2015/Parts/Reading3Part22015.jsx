import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading3Pagination2015 from "../Pagination 2015/Reading3Pagination2015";

//  Marks show

const Reading3Part22015 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 38;
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
    localStorage.setItem("/reading4Part32020", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

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

  const correctAnswers = {
    // ================= Questions 14–18 (Paragraph location A–I) =================
    14: "C", // a description of the substance responsible for the red colouration of leaves → Paragraph C (anthocyanins)
    15: "B", // the reason why trees drop their leaves in autumn → Paragraph B (chlorophyll breakdown / leaf discard)
    16: "H", // some evidence to confirm a theory about the purpose of the red leaves → Paragraph H (reddest leaves on sun-facing side)
    17: "B", // an explanation of the function of chlorophyll → Paragraph B
    18: "E", // a suggestion that the red colouration in leaves could serve as a warning signal → Paragraph E (signal to insects)

    // ================= Questions 19–22 (Notes: ONE WORD ONLY) =================
    19: "sun", // most vividly coloured red leaves on the side of the tree facing the sun
    20: "upper", // the upper surfaces of leaves contain the most red pigment
    21: "dry", // red leaves most abundant in dry and sunny weather
    22: "north", // intensity increases as you go further north

    // ================= Questions 23–25 (TRUE / FALSE / NOT GIVEN) =================
    23: "TRUE", // red pigments help protect the leaf from freezing temperatures
    24: "TRUE", // 'light screen' hypothesis seems to contradict what is known about chlorophyll
    25: "NOT GIVEN", // leaves turning other colours → no info about likelihood of damage

    // ================= Question 26 (Multiple choice A–D) =================
    26: "B", // explanation offered for how leaves turn orange and yellow in autumn
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
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

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
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

          <div className="mt-4">
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below."
              )}
            </h1>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("Autumn leaves")}
            </h1>
            <p className="text-center italic mb-6">
              {renderText(
                "Canadian writer Jay Ingram investigates the mystery of why leaves turn red in the fall"
              )}
            </p>

            {/* A */}
            <p className="text-lg mb-5">
              {renderText(
                "One of the most captivating natural events of the year in many areas throughout North America is the turning of the leaves in the fall."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The colours are magnificent, but the question of exactly why some trees turn yellow or orange, and others red or purple, is something which has long puzzled scientists."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
            </p>

            {/* B */}
            <p className="text-lg mb-5">
              {renderText(
                "Summer leaves are green because they are full of chlorophyll, the molecule that captures sunlight and converts that energy into new building materials for the tree."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As fall approaches in the northern hemisphere, the amount of solar energy available declines considerably."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "For many trees – evergreen conifers being an exception – the best strategy is to abandon photosynthesis until the spring."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As chlorophyll is depleted, other colours that have been dominated by it throughout the summer begin to be revealed."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    26
                  </span>
                )}
              </span>
            </p>

            {/* C */}
            <p className="text-lg mb-5">
              {renderText(
                "The source of the red is widely known: it is created by anthocyanins, water-soluble plant pigments reflecting the red to blue range of the visible spectrum."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They belong to a class of sugar-based chemical compounds also known as flavonoids."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
            </p>

            {/* D */}
            <p className="text-lg mb-5">
              {renderText(
                "Some theories about anthocyanins have argued that they might act as a chemical defence against attacks by insects or fungi."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However there are problems with each of these theories."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    23
                  </span>
                )}
              </span>
            </p>

            {/* E */}
            <p className="text-lg mb-5">
              {renderText(
                "It has also been proposed that trees may produce vivid red colours to convince herbivorous insects that they are healthy and robust."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If insects paid attention to such advertisements, they might be prompted to lay their eggs on a duller host."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    18
                  </span>
                )}
              </span>
            </p>

            {/* F */}
            <p className="text-lg mb-5">
              {renderText(
                "Perhaps the most plausible suggestion is the theory known as the 'light screen' hypothesis."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The idea is that the red pigment is made in autumn leaves to protect chlorophyll from too much light."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    24
                  </span>
                )}
              </span>
            </p>

            {/* H */}
            <p className="text-lg mb-5">
              {renderText(
                "On many trees, the leaves that are the reddest are those on the side of the tree which gets most sun."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Not only that, but the red is brighter on the upper side of the leaf."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    16,19,20
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "The best conditions for intense red colours are dry, sunny days and cool nights."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Trees such as maples usually get much redder the more north you travel."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    21,22
                  </span>
                )}
              </span>
            </p>

            {/* I */}
            <p className="text-lg mb-5">
              {renderText(
                "What is still not fully understood, however, is why some trees resort to producing red pigments while others don't bother."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 14–18 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 14–18")}
            </h2>
            <p>{renderText("Reading Passage 2 has nine paragraphs, A–I.")}</p>
            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A–I, in boxes 14–18 on your answer sheet. NB You may use any letter more than once."
              )}
            </p>

            {[
              {
                q: 14,
                text: "a description of the substance responsible for the red colouration of leaves",
              },
              {
                q: 15,
                text: "the reason why trees drop their leaves in autumn",
              },
              {
                q: 16,
                text: "some evidence to confirm a theory about the purpose of the red leaves",
              },
              { q: 17, text: "an explanation of the function of chlorophyll" },
              {
                q: 18,
                text: "a suggestion that the red colouration in leaves could serve as a warning signal",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center gap-2 flex-wrap mt-4">
                <span className="">{renderText(text)}</span>
                <div className="relative w-20">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-2 py-2 pr-8"
                  >
                    <option value="">{q}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            ))}

            {/* ================= Questions 19–22 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 19–22")}
            </h2>
            <p>{renderText("Complete the notes below.")}</p>
            <p>
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer."
              )}
            </p>

            <div className="border p-4 mt-4">
              <h3 className="font-bold text-xl text-center mb-4">
                {renderText("Why believe the 'light screen' hypothesis?")}
              </h3>
              {[
                {
                  q: 19,
                  text: "The most vividly coloured red leaves are found on the side of the tree facing the ___.",
                },
                {
                  q: 20,
                  text: "The ___ surfaces of leaves contain the most red pigment.",
                },
                {
                  q: 21,
                  text: "Red leaves are most abundant when daytime weather conditions are ___ and sunny.",
                },
                {
                  q: 22,
                  text: "The intensity of the red colour of leaves increases as you go further ___.",
                },
              ].map(({ q, text }) => (
                <div key={q} className="flex items-center gap-2 flex-wrap mt-4">
                  <span className="flex-1">{renderText(text)}</span>
                  <input
                    type="text"
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-2 w-24"
                  />
                </div>
              ))}
            </div>

            {/* ================= Questions 23–25 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 23–25")}
            </h2>
            <p>
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 2?"
              )}
            </p>
            <p>{renderText("In boxes 23–25 on your answer sheet, choose")}</p>
            <ul className="list-disc ml-5">
              <li>
                {renderText(
                  "TRUE if the statement agrees with the information"
                )}
              </li>
              <li>
                {renderText(
                  "FALSE if the statement contradicts the information"
                )}
              </li>
              <li>
                {renderText("NOT GIVEN if there is no information on this")}
              </li>
            </ul>

            {[
              {
                q: 23,
                text: "It is likely that the red pigments help to protect the leaf from freezing temperatures.",
              },
              {
                q: 24,
                text: "The 'light screen' hypothesis would initially seem to contradict what is known about chlorophyll.",
              },
              {
                q: 25,
                text: "Leaves which turn colours other than red are more likely to be damaged by sunlight.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex flex-col gap-2 mt-4">
                <p className="font-medium">
                  {q}. {renderText(text)}
                </p>
                {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${q}`}
                      value={opt}
                      checked={userAnswers[q] === opt}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="radio radio-accent"
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            ))}

            {/* ================= Question 26 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Question 26")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B, C or D.")}</p>

            <div className="flex flex-col gap-2 mt-4">
              <p className="font-medium">
                {renderText(
                  "For which of the following questions does the writer offer an explanation?"
                )}
              </p>
              {[
                "A. why conifers remain green in winter",
                "B. how leaves turn orange and yellow in autumn",
                "C. how herbivorous insects choose which trees to lay their eggs in",
                "D. why anthocyanins are restricted to certain trees",
              ].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q26"
                    value={opt[0]}
                    checked={userAnswers[26] === opt[0]}
                    onChange={(e) => handleInputChange(26, e.target.value)}
                    className="radio radio-accent"
                  />
                  <span>{renderText(opt)}</span>
                </label>
              ))}
            </div>
          </div>
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
                    {renderText("Your Score: ")}
                    {score}/13
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
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{userAnswers[num]}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
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
      <Reading3Pagination2015></Reading3Pagination2015>
    </div>
  );
};

export default Reading3Part22015;
