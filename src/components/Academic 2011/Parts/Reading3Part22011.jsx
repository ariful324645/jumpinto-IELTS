import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading3Pagination2011 from "../Pagination 2011/Reading3Pagination2011";

//  Marks show

const Reading3Part22011 = () => {
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
    "Nineteenth-century studies of the nature of genius failed to take into account the uniqueness of the person's upbringing.",
    "Nineteenth-century studies of genius lacked both objectivity and a proper scientific approach",
    "A true genius has general powers capable of excellence in any area.",
    "The skills of ordinary individuals are in essence the same as the skills of prodigies.",
    "The ease with which truly great ideas are accepted and taken for granted fails to lessen their significance.",
    "Giftedness and genius deserve proper scientific research into their true nature so that all talent may be retained for the human race.",
    "Geniuses often pay a high price to achieve greatness.",
    "To be a genius is worth the high personal cost.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  // different option
  const question2 = [
    "Which belief about gifted people is reported by the writer?",
    "Which belief about genius and society is mentioned?",
    "Which belief about the development of greatness is reported?",
    "Which belief concerns how genius may be affected by others?",
    "Which belief relates to how often genius appears?",
  ];

  const options2 = [
    [
      "A. Truly gifted people are talented in all areas.",
      "B. Genius is inherited.",
      "C. Geniuses are natural leaders.",
    ],

    [
      "A. People never appreciate true genius.",
      "B. Gifted people are talented in every subject.",
      "C. Genius appears twice in every generation.",
    ],

    [
      "A. Gifted people avoid difficulties.",
      "B. Gifted people develop their greatness through difficulties.",
      "C. Genius disappears with age.",
    ],

    [
      "A. Genius can be easily destroyed by discouragement.",
      "B. Genius cannot be influenced by society.",
      "C. Geniuses never experience failure.",
    ],

    [
      "A. Genius appears once in every generation.",
      "B. Genius appears in every family.",
      "C. Genius only exists in childhood.",
    ],
  ];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 19;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };
  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 14;
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
    localStorage.setItem("/2020/Test 1/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show

const correctAnswers = {
  // Questions 14-18 (MCQ)
  14: "B. Genius is inherited.",
  15: "A. People never appreciate true genius.",
  16: "B. Gifted people develop their greatness through difficulties.",
  17: "A. Genius can be easily destroyed by discouragement.",
  18: "A. Genius appears once in every generation.",

  // Questions 19-26 (YES / NO / NOT GIVEN)
  19: "YES",
  20: "YES",
  21: "NOT GIVEN",
  22: "YES",
  23: "YES",
  24: "NOT GIVEN",
  25: "YES",
  26: "NO",
};

  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 1/reading");
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

        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <h1 className="text-2xl font-bold mb-5 text-center">
            {renderText("The Nature of Genius")}
          </h1>

          <p className="text-lg">
            {renderText(
              "There has always been an interest in geniuses and prodigies. The word 'genius', from the Latin gens (family) and the term 'genius', meaning 'begetter', comes from the early Roman cult of a divinity as the head of the family. In its earliest form, genius was concerned with the ability of the head of the family to perpetuate himself. Gradually, genius came to represent a person's characteristics and thence an individual's highest attributes derived from his guiding spirit. Today, people still look to stars or genes, astrology or genetics, in the hope of finding the source of exceptional abilities or personal characteristics.",
            )}
          </p>

          <br />

          <p className="text-lg">
            {renderText(
              "The concept of genius and gifts has become part of folk culture, and attitudes are ambivalent towards them. We envy the gifted and mistrust them. ",
            )}{" "}
            <span
              className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
            >
              {renderText(
                "In the mythology of giftedness, it is popularly believed that if people are talented in one area, they must be defective in another, that intellectuals are impractical, that prodigies burn too brightly too soon and burn out, that gifted people are eccentric, that they are physical weaklings, that there's a thin line between genius and madness, that genius runs in families, that the gifted are so clever they don't need special help, that giftedness is the same as having a high IQ, that some races are more intelligent or musical or mathematical than others, that genius goes unrecognised and unrewarded, that adversity makes men wise or that people with gifts have a responsibility to use them. ",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-28 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("14,15,16,17,18")}
                </span>
              )}
            </span>
            {renderText(
              " Language has been enriched with such terms as 'highbrow', 'egghead', 'blue-stocking', 'wiseacre', 'know-all', 'boffin' and, for many, 'intellectual' is a term of denigration.The nineteenth century saw considerable interest in the nature of genius, and produced not a few studies of famous prodigies.Perhaps for us today, two of the most significant aspects of most of these studies of genius are the frequency with which early encouragement and teaching by parents and tutors had beneficial effects on the intellectual, artistic or musical development of the children but caused great difficulties of adjustment later in their lives, and the frequency with which abilities went unrecognised by teachers and schools.",
            )}
          </p>

          <br />

          <p className="text-lg">
            {renderText(
              "Nineteenth-century studies examined famous prodigies. Early encouragement from parents and tutors often benefited development but sometimes created adjustment difficulties later. Many abilities also went unrecognised.",
            )}

            <span
              className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
            >
              {renderText(
                " However, the difficulty with the evidence produced by these studies, fascinating as they are in collecting together anecdotes and apparent similarities and exceptions, is that they are not what we would today call norm-referenced",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("19")}
                </span>
              )}
            </span>
          </p>

          <br />

          <p className="text-lg">
            {renderText(
              "In other words, when, for instance, information is collated about early illnesses, methods of upbringing, schooling, etc., we must also take into account information from other historical sources about how common or exceptional these were at the time.For instance, infant mortality was high and life expectancy much shorter than today, home tutoring was common in the families of the nobility and wealthy, bullying and corporal punishment were common at the best independent schools and, for the most part, the cases studied were members of the privileged classes",
            )}

            <span
              className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
            >
              {renderText(
                " It was only with the growth of paediatrics and psychology in the twentieth century that studies could be carried out on a more objective, if still not always very scientific, basis..",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("20")}
                </span>
              )}
            </span>

            {renderText(
              `Geniuses, however they are defined, are but the peaks which stand out through the mist of history and are visible to the particular observer from his or her particular vantage point.Change the observers and the vantage points, clear away some of the mist, and a different lot of peaks appear.Genius is a term we apply to those whom we recognise for their outstanding achievements and who stand near the end of the continuum of human abilities which reaches back through the mundane and mediocre to the incapable.There is still much truth in Dr Samuel Johnson's observation, "The true genius is a mind of large general powers, accidentally determined to some particular direction"`,
            )}
          </p>

          <br />

          <p className="text-lg">
            {renderText(
              "Assuming geniuses have different brains is questionable because every brain is unique. Education allows us to learn from gifted individuals.",
            )}

            <span
              className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
            >
              {renderText(
                "We may disagree with the 'general', for we doubt if all musicians of genius could have become scientists of genius or vice versa, but there is no doubting the accidental determination which nurtured or triggered their gifts into those channels into which they have poured their powers so successfully.21Along the continuum of abilities are hundreds of thousands of gifted men and women, boys and girls.What we appreciate, enjoy or marvel at in the works of genius or the achievements of prodigies are the manifestations of skills or abilities which are similar to, but so much superior to, our own.",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("21,22")}
                </span>
              )}
            </span>
          </p>

          <br />

          <p className="text-lg">
            {renderText(
              "But that their minds are not different from our own is demonstrated by the fact that the hard-won discoveries of scientists like Kepler or Einstein become the commonplace knowledge of schoolchildren and the once outrageous shapes and colours of an artist like Paul Klee so soon appear on the fabrics we wear.",
            )}
          </p>

          <p className="text-lg">
            {renderText(
              "Assuming geniuses have different brains is questionable because every brain is unique. Education allows us to learn from gifted individuals.",
            )}
            <span
              className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
            >
              {renderText(
                "This does not minimise the supremacy of their achievements, which outstrip our own as the sub-four-minute milers outstrip our jogging",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("23")}
                </span>
              )}
            </span>{" "}
            {renderText(
              "To think of geniuses and the gifted as having uniquely different brains is only reasonable if we accept that each human brain is uniquely different.The purpose of instruction is to make us even more different from one another, and in the process of being educated we can learn from the achievements of those more gifted than ourselves.But before we try to emulate geniuses or encourage our children to do so we should note that some of the things we learn from them may prove unpalatable.",
            )}
          </p>
          <p className="text-lg">
            <span
              className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
            >
              {renderText(
                "We may envy their achievements and fame, but we should also recognise the price they may have paid in terms of perseverance, single-mindedness, dedication, restrictions on their personal lives, the demands upon their energies and time, and how often they had to display great courage to preserve their integrity or to make their way to the top.",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("25")}
                </span>
              )}
            </span>{" "}
            {renderText(
              "Genius and giftedness are relative descriptive terms of no real substance.We may, at best, give them some precision by defining them and placing them in a context but, whatever we do, we should never delude ourselves into believing that gifted children or geniuses are different from the rest of humanity, save in the degree to which they have developed the performance of their abilities.",
            )}
          </p>
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <div className="flex justify-end items-center p-4 text-gray-500">
              {/* clear icon */}
              <div className="relative group">
                <div className="flex justify-between items-center">
                  <span
                    onClick={() => setIsOpen(true)}
                    className="text-xl cursor-pointer"
                  >
                    <GrClearOption />
                  </span>
                </div>
                {/* Tooltip */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {renderText("Clear answer")}
                </span>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        {renderText(
                          "Are you sure you want to clear all answers?",
                        )}
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                        >
                          {renderText("No, keep them")}
                        </button>
                        <button
                          onClick={handleClear}
                          className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          {renderText("Yes, clear them")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 14-18")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B ,C or D")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 14;

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg">
                      {answerKey}. {q}
                    </h3>

                    <ul className="flex flex-col gap-2 ml-4">
                      {options2[qIndex].map((option, oIndex) => {
                        const isSelected = selectedOptions[qIndex] === option;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick2(qIndex, option)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span
                              className={`w-5 h-5 rounded-full border-2 inline-block ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-700"
                              }`}
                            ></span>

                            <span
                              className={
                                isSelected ? "text-blue-500" : "text-black"
                              }
                            >
                              {option}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 19-26")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 19-26 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
              {renderText(
                "if the statement contradicts the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">
                {renderText("NOT GIVEN")}
              </span>{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this",
              )}
            </h3>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 19-26</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 19;
                const correct = correctAnswers[answerKey];

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">
                      {answerKey}. {q}
                    </h3>
                    <ul className="flex flex-col gap-2 ml-4">
                      {options.map((option, oIndex) => {
                        const isSelected = selectedOptions[qIndex] === option;
                        const isCorrect = option === correct;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick(qIndex, option)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span
                              className={`w-5 h-5 rounded-full border-2 inline-block ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-700"
                              }`}
                            ></span>
                            <span
                              className={
                                isSelected ? "text-blue-500" : "text-black"
                              }
                            >
                              {option}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
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
                    All Answers (14-26)
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
                              </span> // GREEN CIRCLE
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

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
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
      <Reading3Pagination2011></Reading3Pagination2011>
    </div>
  );
};

export default Reading3Part22011;
