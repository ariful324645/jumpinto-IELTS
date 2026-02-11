import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2013 from "../Pagination 2013/Reading2Pagination2013";

const Reading2Part22013 = () => {
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
    // Questions 14–17 (Dropdown A–G)
    14: "D",
    15: "C",
    16: "F",
    17: "E",

    // Questions 18–21 (Dropdown A–D)
    18: "D",
    19: "A",
    20: "B",
    21: "C",

    // Questions 22–26 (TRUE / FALSE / NOT GIVEN)
    22: "FALSE",
    23: "FALSE",
    24: "TRUE",
    25: "NOT GIVEN",
    26: "TRUE",
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

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Venus in transit")}
            </h1>
            <div className="flex items-center justify-center">
              <img src="https://i.ibb.co.com/hjQXyJD/venus.jpg" alt="" />
            </div>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "June 2004 saw the first passage, known as a 'transit', of the planet Venus across the face of the Sun in 122 years.",
              )}
            </p>

            {/* Intro */}
            <p className="text-lg">
              {renderText(
                "Transits have helped shape our view of the whole Universe, as Heather Cooper and Nigel Henbest explain.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("A")}</span>
              <br />

              {renderText(
                "On 8 June 2004, more than half the population of the world were treated to a rare astronomical event.",
              )}

              {renderText(
                "For over six hours, the planet Venus steadily inched its way over the surface of the Sun.",
              )}

              {renderText(
                "This 'transit' of Venus was the first since 6 December 1882.",
              )}

              {renderText(
                "On that occasion, the American astronomer Professor Simon Newcomb led a party to South Africa to observe the event.",
              )}

              {renderText(
                "They were based at a girl's school, where - it is alleged - the combined forces of three schoolmistresses outperformed the professionals with the accuracy of their observations.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("B")}</span>
              <br />

              {renderText(
                "For centuries, transits of Venus have drawn explorers and astronomers alike to the four corners of the globe.",
              )}

              {renderText(
                "And you can put it all down to the extraordinary polymath Edmond Halley.",
              )}

              {renderText(
                "In November 1677, Halley observed a transit of the innermost planet, Mercury, from the desolate island of St Helena in the south Pacific.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He realized that, from different latitudes, the passage of the planet across the Sun's disc would appear to differ.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "By timing the transit from two widely-separated locations, teams of astronomers could calculate the parallax angle - the apparent difference in position of an astronomical body due to a difference in the observer's position.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>

              {renderText(
                "Calculating this angle would allow astronomers to measure what was then the ultimate goal: the distance of the Earth from the sun.",
              )}

              {renderText(
                "This distance is known as the 'astronomical' or AU.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("C")}</span>
              <br />

              {renderText(
                "Halley was aware that the AU was one of the most fundamental of all astronomical measurements.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Johannes Kepler, in the early 17th century, had shown that the distances of the planets from the Sun governed their orbital speeds, which were easily measurable.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>

              {renderText(
                "But no-one had found a way to calculate accurate distances to the planets from the Earth.",
              )}

              {renderText(
                "The goal was to measure the AU; then, knowing the orbital speeds of all the other planets round the Sun, the scale of the Solar System would fall into place.",
              )}

              {renderText(
                "However, Halley realised that Mercury was so far away that its parallax angle would be very difficult to determine.",
              )}

              {renderText(
                "As Venus was closer to the Earth, its parallax angle would be larger, and Halley worked out that by using Venus it would be possible to measure the Sun's distance to 1 part in 500.",
              )}

              {renderText(
                "But there was a problem: transits of Venus, unlike those of Mercury, are rare, occurring in pairs roughly eight years apart every hundred or so years.",
              )}

              {renderText(
                "Nevertheless, he accurately predicted that Venus would cross the face of the Sun in both 1761 and 1769-though he didn't survive to see either.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("D")}</span>
              <br />

              {renderText(
                "Inspired by Halley's suggestion of a way to pin down the scale of the Solar System, teams of British and French astronomers set out on expeditions to places as diverse as India and Siberia.",
              )}

              {renderText(
                "But things weren't helped by Britain and France being at war.",
              )}

              {renderText(
                "The person who deserves most sympathy is the French astronomer Guillaume Le Gentil.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He was thwarted by the fact that the British were besieging his observation site at Pondicherry in India.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>

              {renderText(
                "Fleeing on a French warship crossing the Indian Ocean, Le Gentil saw a wonderful transit - but the ship's pitching and rolling ruled out any attempt at making accurate observations.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Undaunted, he remained south of the equator, keeping himself busy by studying the islands of Mauritius and Madagascar before setting off to observe the next transit in the Philippines.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>

              {renderText(
                "Ironically after travelling nearly 50,000 kilometers, his view was clouded out at the last moment, a very dispiriting experience.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("23")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("E")}</span>
              <br />

              {renderText(
                "While the early transit timings were as precise as instruments would allow, the measurements were dogged by the 'black drop' effect.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "When Venus begins to cross the Sun's disc, it looks smeared not circular - which makes it difficult to establish timings.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>

              {renderText("This is due to diffraction of light.")}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The second problem is that Venus exhibits a halo of light when it is seen just outside the Sun's disc.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>

              {renderText(
                "While this showed astronomers that Venus was surrounded by thick layer of gases refracting sunlight around it, both effects made it impossible to obtain accurate timings.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("F")}</span>
              <br />

              {renderText(
                "But astronomers laboured hard to analyse the results of these expeditions to observe Venus transits.",
              )}

              {renderText(
                "Johann Franz Encke, Director of the Berlin Observatory, finally determined a value for the AU based on all these parallax measurements: 153,340,000km.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Reasonably accurate for the time, that is quite close to today's value of methods in accuracy.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>

              {renderText(
                "The AU is a cosmic measuring rod, and the basis of how we scale the Universe today.",
              )}

              {renderText(
                "The parallax principle can be extended to measure the distances to the stars.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "If we look at a star in January - when Earth is at one point in its orbit - it will seem to be in a different position from where it appears six months later.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Knowing the width of Earth's orbit, the parallax shift lets astronomers calculate the distance.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("G")}</span>
              <br />

              {renderText(
                "June 2004's transit of Venus was thus more of an astronomical spectacle than a scientifically important event.",
              )}

              {renderText(
                "But such transits have paved the way for what might prove to be one of the most vital breakthroughs in the cosmos - detecting Earth-sized planets orbiting other stars.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("16")}
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
            {renderText("Reading Passage 2 has seven paragraphs, A-G.")}
            <br />
            {renderText("Which paragraph contains the following information?")}
          </p>

          <p className="mb-4">
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A-G")}</strong>{" "}
            {renderText("in boxes 14–17 on your answer sheet.")}
          </p>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              {
                q: 14,
                text: "examples of different ways in which the parallax principle has been applied",
              },
              {
                q: 15,
                text: "a description of an event which prevented a transit observation",
              },
              {
                q: 16,
                text: "a statement about potential future discoveries leading on from transit observations",
              },
              {
                q: 17,
                text: "a description of physical states connected with Venus which early astronomical instruments failed to overcome",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>

                <select
                  className="border-2 border-gray-300 rounded-md px-3 py-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* ================= Questions 18–21 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 18–21")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Look at the following statements (Questions 18-21) and the list of people below.",
            )}
            <br />
            {renderText("Match each statement with the correct person, A-D.")}
          </p>

          <p className="mb-4">
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A-D")}</strong>{" "}
            {renderText("next to Questions 18–21.")}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[200px] mx-auto text-lg">
            <h3 className="font-bold mb-2">{renderText("List of People")}</h3>
            {[
              "A. Edmond Halley",
              "B. Johannes Kepler",
              "C. Guillaume Le Gentil",
              "D. Johann Franz Encke",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              {
                q: 18,
                text: "He calculated the distance of the Sun from the Earth based on observations of Venus with a fair degree of accuracy.",
              },
              {
                q: 19,
                text: "He understood that the distance of the Sun from the Earth could be worked out by comparing observations of a transit.",
              },
              {
                q: 20,
                text: "He realised that the time taken by a planet to go round the Sun depends on its distance from the Sun.",
              },
              {
                q: 21,
                text: "He witnessed a Venus transit but was unable to make any calculations.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>

                <select
                  className="border-2 border-gray-300 rounded-md px-3 py-2 "
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* ================= Questions 22–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 22–26")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 2?",
            )}
          </p>

          <p className="mb-4">
            {renderText("In boxes 22–26 on your answer sheet, choose ")}
            <strong>{renderText("TRUE")}</strong>,{" "}
            <strong>{renderText("FALSE")}</strong> {renderText("or ")}
            <strong>{renderText("NOT GIVEN")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 22,
                text: "Halley observed one transit of the planet Venus.",
              },
              {
                num: 23,
                text: "Le Gentil managed to observe a second Venus transit.",
              },
              {
                num: 24,
                text: "The shape of Venus appears distorted when it starts to pass in front of the Sun.",
              },
              {
                num: 25,
                text: "Early astronomers suspected that the atmosphere on Venus was toxic.",
              },
              {
                num: 26,
                text: "The parallax principle allows astronomers to work out how far away distant stars are from the Earth.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col pl-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
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

          {/* ================= Submit + Result Section ================= */}
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
                    Your Score: {score}/13
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
                              <span>{userAnswers[num]}</span>
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
      <Reading2Pagination2013></Reading2Pagination2013>
    </div>
  );
};

export default Reading2Part22013;
