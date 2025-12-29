import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading1Pagination2015 from "../Pagination 2015/Reading1Pagination2015";

//  Marks show

const Reading1Part32015 = () => {
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
    27: "C", // having a shared objective
    28: "B", // brought complementary skills to their partnership
    29: "A", // inspire creative thinking
    30: "B", // feel that their contributions are valued

    // =========== Questions 31–35 (Sentence Completion) ===========
    31: "G", // remain in their jobs
    32: "E", // avoid risk
    33: "C", // become competitive
    34: "F", // ignore their duties
    35: "B", // share their ideas

    // =========== Questions 36–40 (YES / NO / NOT GIVEN) ===========
    36: "YES",
    37: "YES",
    38: "NO",
    39: "NOT GIVEN",
    40: "NO",
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
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 3")}</h1>
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

          <h1 className="text-lg">
            {renderText(
              "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below."
            )}
          </h1>

          <h2 className="text-2xl font-bold text-center">
            {renderText("The psychology of innovation")}
          </h2>

          <p className="italic text-center mb-6">
            {renderText("Why are so few companies truly innovative?")}
          </p>

          {/* Para 1 */}
          <p className="text-lg mb-5">
            {renderText(
              "Innovation is key to business survival, and companies put substantial resources into inspiring employees to develop new ideas."
            )}
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "There are, nevertheless, people working in luxurious, state-of-the-art centres designed to stimulate innovation who find that their environment doesn't make them feel at all creative."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  36
                </span>
              )}
            </span>
            {renderText(
              " And there are those who don't have a budget, or much space, but who innovate successfully."
            )}
          </p>

          {/* Para 2 */}
          <p className="text-lg mb-5">
            {renderText(
              "For Robert B. Cialdini, Professor of Psychology at Arizona State University, one reason that companies don't succeed as often as they should is that innovation starts with recruitment."
            )}
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "Research shows that the fit between an employee's values and a company's values makes a difference to what contribution they make and whether, two years after they join, they're still at the company."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  31
                </span>
              )}
            </span>
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "Studies at Harvard Business School show that, although some individuals may be more creative than others, almost every individual can be creative in the right circumstances."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  37
                </span>
              )}
            </span>
          </p>

          {/* Para 3 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "One of the most famous photographs in the story of rock'n'roll emphasises Cialdini's views."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  27
                </span>
              )}
            </span>
            {renderText(
              " The 1956 picture of singers Elvis Presley, Carl Perkins, Johnny Cash and Jerry Lee Lewis jamming at a piano in Sun Studios in Memphis tells a hidden story."
            )}
          </p>

          {/* Para 4 */}
          <p className="text-lg mb-5">
            {renderText(
              "The value fit matters, says Cialdini, because innovation is, in part, a process of change, and under that pressure we, as a species, behave differently."
            )}
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "'When things change, we are hard-wired to play it safe.'"
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  32
                </span>
              )}
            </span>
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "Studies show that we invariably take more gambles when threatened with a loss than when offered a reward."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  33
                </span>
              )}
            </span>
          </p>

          {/* Para 5 */}
          <p className="text-lg mb-5">
            {renderText("Managing innovation is a delicate art.")}
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "And without a system which ensures collaborative exchanges within the company, it's also easy for small 'pockets of innovation' to disappear."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  30
                </span>
              )}
            </span>
          </p>

          {/* Para 6 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "Cialdini believes that this 'follow-the-leader syndrome' is dangerous."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  34
                </span>
              )}
            </span>
            <span className={highlight ? "bg-yellow-100 ml-1" : "ml-1"}>
              {renderText(
                "He said he and Crick had succeeded because they were aware that they weren't the most intelligent of the scientists pursuing the answer."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  28
                </span>
              )}
            </span>
          </p>

          {/* Para 7 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "Research shows that peer power, used horizontally not vertically, is much more powerful than any boss's speech."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  40
                </span>
              )}
            </span>
          </p>

          {/* Para 8 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "The very act of writing makes us more likely to believe it."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  29
                </span>
              )}
            </span>
          </p>

          {/* Para 9 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "The wrong kind of leadership will lead to what Cialdini calls 'captainitis'."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  34
                </span>
              )}
            </span>
          </p>

          {/* Para 10 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "This environment encouraged a free interchange of ideas."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  35
                </span>
              )}
            </span>
          </p>

          {/* Para 11 */}
          <p className="text-lg mb-5">
            <span className={highlight ? "bg-yellow-100" : ""}>
              {renderText(
                "Leaders should encourage everyone to contribute and simultaneously assure all concerned that every recommendation is important."
              )}
              {highlight && (
                <span className="ml-2 inline-flex w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold items-center justify-center">
                  30
                </span>
              )}
            </span>
          </p>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 27–30 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 27–30")}
            </h2>

            <p>{renderText("Choose the correct letter, A, B, C or D.")}</p>

            {[
              {
                q: 27,
                text: "The example of the 'million-dollar quartet' underlines the writer's point about",
                options: [
                  "recognising talent.",
                  "working as a team.",
                  "having a shared objective.",
                  "being an effective leader.",
                ],
              },
              {
                q: 28,
                text: "James Watson suggests that he and Francis Crick won the race to discover the DNA code because they",
                options: [
                  "were conscious of their own limitations.",
                  "brought complementary skills to their partnership.",
                  "were determined to outperform their brighter rivals.",
                  "encouraged each other to realise their joint ambition.",
                ],
              },
              {
                q: 29,
                text: "The writer mentions competitions on breakfast cereal packets as an example of how to",
                options: [
                  "inspire creative thinking.",
                  "generate concise writing.",
                  "promote loyalty to a group.",
                  "strengthen commitment to an idea.",
                ],
              },
              {
                q: 30,
                text: "In the last paragraph, the writer suggests that it is important for employees to",
                options: [
                  "be aware of their company's goals.",
                  "feel that their contributions are valued.",
                  "have respect for their co-workers' achievements.",
                  "understand why certain management decisions are made.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-2 ml-4">
                  {options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={String.fromCharCode(65 + i)} // A, B, C, D
                        checked={userAnswers[q] === String.fromCharCode(65 + i)}
                        onChange={() =>
                          handleInputChange(q, String.fromCharCode(65 + i))
                        }
                        className="radio radio-primary"
                      />
                      <span>
                        {String.fromCharCode(65 + i)}. {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* ================= Questions 31–35 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 31–35")}
            </h2>

            <p>
              {renderText(
                "Complete each sentence with the correct ending, A–G, below."
              )}
            </p>

            <p className="mb-4">
              {renderText(
                "Choose the correct letter, A–G, next to Questions 31–35."
              )}
            </p>
            <div className="max-w-[220px] mx-auto border text-center p-2">
              <ul className="space-y-2 pl-4">
                <li>{renderText("A. take chances.")}</li>
                <li>{renderText("B. share their ideas.")}</li>
                <li>{renderText("C. become competitive.")}</li>
                <li>{renderText("D. get promotion.")}</li>
                <li>{renderText("E. avoid risk.")}</li>
                <li>{renderText("F. ignore their duties.")}</li>
                <li>{renderText("G. remain in their jobs.")}</li>
              </ul>
            </div>

            {[
              {
                q: 31,
                text: "Employees whose values match those of their employers are more likely to",
              },
              { q: 32, text: "At times of change, people tend to" },
              {
                q: 33,
                text: "If people are aware of what they might lose, they will often",
              },
              {
                q: 34,
                text: "People working under a dominant boss are liable to",
              },
              {
                q: 35,
                text: "Employees working in organisations with few rules are more likely to",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="relative ml-4 inline-block">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none border-2 border-gray-300 rounded-md px-3 py-2 pr-8 text-sm"
                  >
                    <option value="" disabled>
                      {q}
                    </option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* caret inside input */}
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    ^
                  </span>
                </div>
              </div>
            ))}

            {/* ================= Questions 36–40 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 36–40")}
            </h2>

            <p>
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 3?"
              )}
            </p>
            <p>{renderText("In boxes 36-40 on your answer sheet, choose")}</p>

            <ul className="ml-6 text-lg space-y-1">
              <li>
                <strong>YES</strong> –{" "}
                {renderText(
                  "if the statement agrees with the claims of the writer"
                )}
              </li>
              <li>
                <strong>NO</strong> –{" "}
                {renderText(
                  "if the statement contradicts the claims of the writer"
                )}
              </li>
              <li>
                <strong>NOT GIVEN</strong> –{" "}
                {renderText(
                  "if it is impossible to say what the writer thinks about this"
                )}
              </li>
            </ul>

            {[
              {
                q: 36,
                text: "The physical surroundings in which a person works play a key role in determining their creativity.",
              },
              { q: 37, text: "Most people have the potential to be creative." },
              {
                q: 38,
                text: "Teams work best when their members are of equally matched intelligence.",
              },
              {
                q: 39,
                text: "It is easier for smaller companies to be innovative.",
              },
              {
                q: 40,
                text: "A manager's approval of an idea is more persuasive than that of a colleague.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-2 ml-4">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() => handleInputChange(q, opt)}
                        className="radio radio-primary"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
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
                    {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
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
      <Reading1Pagination2015></Reading1Pagination2015>
    </div>
  );
};

export default Reading1Part32015;
