import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2024 from "../Pagination 2024/Reading1Pagination2024";

const Reading1Part32024 = () => {
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
    // Questions 27–30 (multiple choice)
    27: "D", // There may be a number of reasons for the spread of misinformation
    28: "A", // It may at some point provide us with a solution to misinformation
    29: "C", // outlining which issues connected with misinformation are significant today
    30: "D", // Regulation fails to prevent misinformation from appearing in the media

    // Questions 31–36 (summary completion)
    31: "G", // frequent exposure
    32: "J", // different ideas
    33: "H", // mental operation
    34: "B", // additional evidence
    35: "E", // short period
    36: "C", // different locations

    // Questions 37–40 (YES / NO / NOT GIVEN)
    37: "YES", // Campaigns fail if people cannot understand them
    38: "NOT GIVEN", // No mention of opposition to teaching children
    39: "NO", // The journey will be long and arduous
    40: "NOT GIVEN", // No claim about exaggeration of keeping up with information
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

          <div>
            <div className="">
              <h1 className="text-2xl font-bold text-center">
                {renderText("The persistence and peril of misinformation")}
              </h1>

              <p className="text-lg my-5">
                {renderText(
                  "Brian Southwell looks at how human brains verify information and discusses some of the challenges of battling widespread falsehoods",
                )}
              </p>

              {/* Section A */}
              <p className="text-lg">
                {renderText(
                  "Misinformation - both deliberately promoted and accidentally shared - is perhaps an inevitable part of the world in which we live, but it is not a new problem.",
                )}
                {renderText(
                  " People likely have lied to one another for roughly as long as verbal communication has existed.",
                )}
                {renderText(
                  " Deceiving others can offer an apparent opportunity to gain strategic advantage, to motivate others to action, or even to protect interpersonal bonds.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " Moreover, people inadvertently have been sharing inaccurate information with one another for thousands of years.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("27")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section B */}
              <p className="text-lg">
                {renderText(
                  "However, we currently live in an era in which technology enables information to reach large audiences distributed across the globe, and thus the potential for immediate and widespread effects from misinformation now looms larger than in the past.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " Yet the means to correct misinformation might, over time, be found in those same patterns of mass communication and of the facilitated spread of information.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("28")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section C */}
              <p className="text-lg">
                {renderText(
                  "The main worry regarding misinformation is its potential to unduly influence attitudes and behavior, leading people to think and act differently than they would if they were correctly informed.",
                )}
                {renderText(
                  " In other words, we worry that misinformation might lead people to hold misperceptions or false beliefs.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " These misperceptions, especially when they occur among large groups of people, may have detrimental downstream consequences for health, social harmony, and the political climate.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("29")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section D */}
              <p className="text-lg">
                {renderText(
                  "At least three observations related to misinformation in the contemporary mass-media environment warrant attention.",
                )}
                {renderText(
                  " First, people who encounter misinformation tend to believe it, at least initially.",
                )}
                {renderText(
                  " Second, electronic and print media often do not block many types of misinformation before it appears in content available to large audiences.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " Third, countering misinformation once it has enjoyed wide exposure can be a resource-intensive effort.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("30")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section E */}
              <p className="text-lg">
                {renderText(
                  "Knowing what happens when people initially encounter misinformation holds tremendous importance.",
                )}
                {renderText(
                  " Philosophers such as René Descartes and Baruch Spinoza debated whether people accept or reject information only after evaluating its truth.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " Recent empirical evidence supports Spinoza’s view that people initially accept information as true and later verify or reject it.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("31")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section F */}
              <p className="text-lg">
                {renderText(
                  "Misinformation often appears in media without being preemptively blocked.",
                )}
                {renderText(
                  " Regulatory agencies tend to focus on post hoc detection rather than prior censorship.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " Even when misinformation is corrected, it can continue to affect attitudes.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("37")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section G */}
              <p className="text-lg">
                {renderText(
                  "We live at a time when widespread misinformation is common, but efforts to counter it are also growing.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " Addressing misinformation will require coordinated, long-term efforts rather than any single solution.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("39")}
                    </span>
                  )}
                </span>
              </p>
            </div>
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
          {/* ================= Questions 27–30 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–30")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A, B, C or D")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 27,
                q: "What point does the writer make about misinformation in the first paragraph?",
                options: [
                  "Misinformation is a relatively recent phenomenon.",
                  "Some people find it easy to identify misinformation.",
                  "Misinformation changes as it is passed from one person to another.",
                  "There may be a number of reasons for the spread of misinformation.",
                ],
              },
              {
                num: 28,
                q: "What does the writer say about the role of technology?",
                options: [
                  "It may at some point provide us with a solution to misinformation.",
                  "It could fundamentally alter the way in which people regard information.",
                  "It has changed the way in which organisations use misinformation.",
                  "It has made it easier for people to check whether information is accurate.",
                ],
              },
              {
                num: 29,
                q: "What is the writer doing in the fourth paragraph?",
                options: [
                  "comparing the different opinions people have of misinformation",
                  "explaining how the effects of misinformation have changed over time",
                  "outlining which issues connected with misinformation are significant today",
                  "describing the attitude of policy makers towards misinformation in the media",
                ],
              },
              {
                num: 30,
                q: "What point does the writer make about regulation in the USA?",
                options: [
                  "The guidelines issued by the FDA need to be simplified.",
                  "Regulation does not affect people's opinions of new prescription drugs.",
                  "The USA has more regulatory bodies than most other countries.",
                  "Regulation fails to prevent misinformation from appearing in the media.",
                ],
              },
            ].map(({ num, q, options }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(q)}
                </p>

                <div className="space-y-2 pl-4">
                  {options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    return (
                      <label
                        key={letter}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${num}`}
                          value={letter}
                          checked={userAnswers[num] === letter}
                          onChange={() => handleInputChange(num, letter)}
                        />
                        <span>
                          <strong>{renderText(letter + ".")}</strong>{" "}
                          {renderText(opt)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 31–36 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 31–36")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the summary using the list of words or phrases below.",
            )}
            <br />
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A–J")}</strong>.
          </p>

          <div className="border p-4 rounded mb-6 max-w-[300px] mx-auto text-lg">
            {[
              "A. constant conflict",
              "B. additional evidence",
              "C. different locations",
              "D. experimental subjects",
              "E. short period",
              "F. extreme distrust",
              "G. frequent exposure",
              "H. mental operation",
              "I. dubious reason",
              "J. different ideas",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4 border p-4">
            <h2 className="font-bold text-xl text-center mt-2">
              {renderText("What happens when people encounter misinformation?")}
            </h2>

            {[
              {
                q: 31,
                before: "Although people have",
                after:
                  "to misinformation, there is debate about precisely how and when we label something as true or untrue.",
              },
              {
                q: 32,
                before: "The philosophers Descartes and Spinoza had",
                after: "about how people engage with information.",
              },
              {
                q: 33,
                before: "Moreover, Spinoza believed that a distinct",
                after: "is involved in these stages.",
              },
              {
                q: 34,
                before: "Recent research has provided",
                after: "for Spinoza's theory.",
              },
              {
                q: 35,
                before: "even if this is for an extremely",
                after: "",
              },
              {
                q: 36,
                before:
                  "This is consistent with the fact that the resources for scepticism and the resources for perceiving and encoding are in",
                after: "in the brain.",
              },
            ].map(({ q, before, after }) => (
              <p key={q} className="text-lg">
                {renderText(before)}{" "}
                <button
                  onClick={() => toggleButton(q)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[q]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  {q}
                </button>
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-20"
                  value={userAnswers[q] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [q]: e.target.value,
                    }))
                  }
                >
                  <option value=""></option>
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                    (letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ),
                  )}
                </select>{" "}
                {after && renderText(after)}
              </p>
            ))}
          </div>

          {/* ================= Questions 37–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 37–40")}
          </h2>

          <p className="mb-4">
            {renderText("Choose ")}
            <strong>{renderText("YES")}</strong>,{" "}
            <strong>{renderText("NO")}</strong> {renderText("or ")}
            <strong>{renderText("NOT GIVEN")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 37,
                text: "Campaigns designed to correct misinformation will fail to achieve their purpose if people are unable to understand them.",
              },
              {
                num: 38,
                text: "Attempts to teach elementary school students about misinformation have been opposed.",
              },
              {
                num: 39,
                text: "It may be possible to overcome the problem of misinformation in a relatively short period.",
              },
              {
                num: 40,
                text: "The need to keep up with new information is hugely exaggerated in today's world.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt}
                        checked={userAnswers[num] === opt}
                        onChange={() => handleInputChange(num, opt)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
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
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27–40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 27).map((num) => {
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
      <Reading1Pagination2024></Reading1Pagination2024>
    </div>
  );
};

export default Reading1Part32024;
