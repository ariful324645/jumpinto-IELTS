import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2022 from "../Pagination2022/Reading2Pagination2022";
const Test2Reading2022 = () => {
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    // Questions 1–5 (ONE WORD ONLY)
    1: "noise", // "threw a noise of breaking" → likely "stone" or "noise", based on context. Using your mapping: "population" seems placeholder
    2: "cave", // "teenagers went into the ____"
    3: "clay", // "containers made of ____"
    4: "Essenes", // "group of people known as the ____"
    5: "Hebrew", // "written mainly in the ____ language"

    // Questions 6–13 (TRUE / FALSE / NOT GIVEN)
    6: "FALSE", // "The Bedouin teenagers were disappointed..." → FALSE
    7: "NOT GIVEN", // "agreement among academics..." → NOT GIVEN
    8: "TRUE", // "Most of the books of the Bible written on the scrolls are incomplete." → TRUE
    9: "TRUE", // "Copper Scroll is written in unusual way" → TRUE
    10: "TRUE", // "Mar Samuel was given some scrolls as a gift" → TRUE
    11: "TRUE", // "Educational establishments in US were keen to buy scrolls" → TRUE
    12: "TRUE", // "Scroll pieced together in 2017 contains info about annual occasions" → TRUE
    13: "NOT GIVEN", // "Academics at University of Haifa are researching final scroll" → NOT GIVEN
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

          <div>
            <h1 className="text-lg">
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 1-13</span>
              which are based on Reading Passage 1 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("The Dead Sea Scrolls")}
            </h1>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In late 1946 or early 1947, three Bedouin teenagers were tending their goats and sheep near the ancient settlement of Qumran, located on the northwest shore of the Dead Sea in what is now known as the West Bank."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " One of these young shepherds tossed a rock into an opening on the side of a cliff and was surprised to hear a shattering sound."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2,3
                  </span>
                )}
              </span>

              {renderText(
                " He and his companions later entered the cave and stumbled across a collection of large clay jars, seven of which contained scrolls with writing on them."
              )}
              {renderText(
                " The teenagers took the seven scrolls to a nearby town where they were sold for a small sum to a local antiquities dealer."
              )}
              {renderText(
                " Word of the find spread, and Bedouins and archaeologists eventually unearthed tens of thousands of additional scroll fragments from 10 nearby caves; together they make up between 800 and 900 manuscripts."
              )}
              {renderText(
                " It soon became clear that this was one of the greatest archaeological discoveries ever made."
              )}
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The origin of the Dead Sea Scrolls, which were written around 2,000 years ago between 150 BCE and 70 CE, is still the subject of scholarly debate even today."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>

              {renderText(
                " According to the prevailing theory, they are the work of a population that inhabited the area until Roman troops destroyed the settlement around 70 CE."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The area was known as Judea at that time, and the people are thought to have belonged to a group called the Essenes, a devout Jewish sect."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The majority of the texts on the Dead Sea Scrolls are in Hebrew, with some fragments written in an ancient version of its alphabet thought to have fallen out of use in the fifth century BCE."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>

              {renderText(
                " But there are other languages as well. Some scrolls are in Aramaic, the language spoken by many inhabitants of the region from the sixth century BCE to the siege of Jerusalem in 70 CE."
              )}
              {renderText(
                " In addition, several texts feature translations of the Hebrew Bible into Greek."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The Dead Sea Scrolls include fragments from every book of the Old Testament of the Bible except for the Book of Esther."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The only entire book of the Hebrew Bible preserved among the manuscripts from Qumran is Isaiah; this copy, dated to the first century BCE, is considered the earliest biblical manuscript still in existence."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>

              {renderText(
                " Along with biblical texts, the scrolls include documents about sectarian regulations and religious writings that do not appear in the Old Testament."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The writing on the Dead Sea Scrolls is mostly in black or occasionally red ink, and the scrolls themselves are nearly all made of either parchment or an early form of paper called papyrus."
              )}
              {renderText(
                " The only exception is the scroll numbered 3Q15, which was created out of a combination of copper and tin."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Using an unconventional vocabulary and odd spelling, it describes 64 underground hiding places that supposedly contain riches buried for safekeeping"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Some of the Dead Sea Scrolls have been on interesting journeys. In 1948, a Syrian Orthodox archbishop known as Mar Samuel acquired four of the original seven scrolls, paying less than $100 for them."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " He later travelled to the United States and unsuccessfully offered them to a number of universities."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>

              {renderText(
                " In 1954, he placed an advertisement in The Wall Street Journal offering the manuscripts for sale."
              )}
              {renderText(
                " Israeli archaeologist Yigael Yadin eventually negotiated their purchase and returned them to Jerusalem."
              )}
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In 2017, researchers from the University of Haifa restored and deciphered one of the last untranslated scrolls."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>

              {renderText(
                " The scroll provided insight into the community that wrote it and the 364-day calendar they used."
              )}
              {renderText(" Only one more known scroll remains untranslated.")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 1–5 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–5")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the notes below.")}
            <br />
            {renderText("Choose ")}
            <strong>{renderText("ONE WORD ONLY")}</strong>
            {renderText(" from the passage for each answer.")}
            <br />
            {renderText(
              "Write your answers in boxes 1-5 on your answer sheet."
            )}
          </p>

          <div className="border p-5 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              {renderText("The Dead Sea Scrolls")}
            </h3>

            <ul className="list-disc list-inside space-y-4 text-lg">
              {[
                "three Bedouin shepherds in their teens were near an opening on side of cliff heard a noise of breaking when one teenager threw a",
                "teenagers went into the",
                "and found a number of containers made of",
                "The scrolls date from between 150 BCE and 70 CE thought to have been written by group of people known as the",
                "written mainly in the language most are on religious topics, written using ink on parchment or papyrus",
              ].map((text, index) => {
                const qNum = index + 1;
                return (
                  <li key={qNum} className="flex flex-wrap items-center gap-2">
                    <span>{renderText(text)}</span>
                    <button
                      onClick={() => toggleButton(qNum)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        activeButtons[qNum]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      {qNum}
                    </button>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-32"
                      onChange={(e) => handleInputChange(qNum, e.target.value)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ================= Questions 6–13 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 6–13")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}
            <br />
            {renderText("In boxes 6-13 on your answer sheet, choose:")}
          </p>

          <div className="mb-4 space-y-1">
            <p>
              <strong>{renderText("TRUE")}</strong>{" "}
              {renderText("if the statement agrees with the information")}
            </p>
            <p>
              <strong>{renderText("FALSE")}</strong>{" "}
              {renderText("if the statement contradicts the information")}
            </p>
            <p>
              <strong>{renderText("NOT GIVEN")}</strong>{" "}
              {renderText("if there is no information on this")}
            </p>
          </div>

          <div className="space-y-6">
            {[
              "The Bedouin teenagers who found the scrolls were disappointed by how little money they received for them.",
              "There is agreement among academics about the origin of the Dead Sea Scrolls.",
              "Most of the books of the Bible written on the scrolls are incomplete.",
              "The information on the Copper Scroll is written in an unusual way.",
              "Mar Samuel was given some of the scrolls as a gift.",
              "In the early 1950s, a number of educational establishments in the US were keen to buy scrolls from Mar Samuel.",
              "The scroll that was pieced together in 2017 contains information about annual occasions in the Qumran area 2,000 years ago.",
              "Academics at the University of Haifa are currently researching how to decipher the final scroll.",
            ].map((statement, index) => {
              const qNum = index + 6;
              return (
                <div key={qNum} className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div
                      onClick={() => handleNumberClick(qNum)}
                      className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer ${
                        activeNumbers[qNum]
                          ? "bg-yellow-400 border-yellow-500"
                          : "border-gray-300"
                      }`}
                    >
                      {renderText(qNum.toString())}
                    </div>
                    <p className="text-lg">{renderText(statement)}</p>
                  </div>

                  <div className="ml-12 space-y-2">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(qNum, option)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedOptions[qNum] === option
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-500"
                          }`}
                        />
                        <span
                          className={
                            selectedOptions[qNum] === option
                              ? "text-blue-500"
                              : ""
                          }
                        >
                          {renderText(option)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Submit & Result ================= */}
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
                    {renderText(`Your Score: ${score}/13`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–13)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = userAnswers[num]?.trim();
                      const correctAnswer = correctAnswers[num]?.trim();

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
      <Reading2Pagination2022></Reading2Pagination2022>
    </div>
  );
};

export default Test2Reading2022;
