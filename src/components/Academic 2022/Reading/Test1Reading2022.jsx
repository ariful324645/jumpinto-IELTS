import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2022 from "../Pagination2022/Reading1Pagination2022";

const Test1Reading2022 = () => {
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
    // Questions 1–6 (ONE WORD ONLY)
    1: "population",
    2: "suburbs",
    3: "politicians",
    4: "funding",
    5: "press",
    6: "soil",

    // Questions 7–13 (TRUE / FALSE / NOT GIVEN)
    7: "FALSE",
    8: "TRUE",
    9: "TRUE",
    10: "TRUE",
    11: "FALSE",
    12: "FALSE",
    13: "NOT GIVEN",
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
            <h1 className="text-2xl font-bold mb-5 text-center">
              The development of the London underground railway
            </h1>

            <p className="text-lg">
              In the first half of the 1800s, London's population grew at an
              astonishing rate, and the central area became increasingly
              congested.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                In addition, the expansion of the overground railway network
                resulted in more and more passengers arriving in the capital.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              However, in 1846, a Royal Commission decided that the railways
              should not be allowed to enter the City, the capital's historic
              and business centre. The result was that the overground railway
              stations formed a ring around the City. The area within consisted
              of poorly built, overcrowded slums and the streets were full of
              horse-drawn traffic. Crossing the City became a nightmare. It
              could take an hour and a half to travel 8 km by horse-drawn
              carriage or bus. Numerous schemes were proposed to resolve these
              problems, but few succeeded.
            </p>

            <br />

            <p className="text-lg">
              Amongst the most vocal advocates for a solution to London's
              traffic problems was Charles Pearson, who worked as a solicitor
              for the City of London. He saw both social and economic advantages
              in building an underground railway that would link the overground
              railway stations together and clear London slums at the same time.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                His idea was to relocate the poor workers who lived in the
                inner-city slums to newly constructed suburbs, and to provide
                cheap rail travel for them to get to work.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Pearson's ideas gained support amongst some businessmen and in
                1851 he submitted a plan to Parliament.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              It was rejected, but coincided with a proposal from another group
              for an underground connecting line, which Parliament passed.
            </p>

            <br />

            <p className="text-lg">
              The two groups merged and established the Metropolitan Railway
              Company in August 1854. The company's plan was to construct an
              underground railway line from the Great Western Railway's (GWR)
              station at Paddington to the edge of the City at Farringdon Street
              - a distance of almost 5 km. The organisation had difficulty in
              raising the funding for such a radical and expensive scheme, not
              least because of the critical articles printed by the press.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Objectors argued that the tunnels would collapse under the
                weight of traffic overhead, buildings would be shaken and
                passengers would be poisoned by the emissions from the train
                engines.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      4
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      5
                    </span>
                  </>
                )}
              </span>
              However, Pearson and his partners persisted.
            </p>

            <br />

            <p className="text-lg">
              The GWR, aware that the new line would finally enable them to run
              trains into the heart of the City, invested almost £250,000 in the
              scheme. Eventually, over a five-year period, £1m was raised. The
              chosen route ran beneath existing main roads to minimise the
              expense of demolishing buildings. Originally scheduled to be
              completed in 21 months, the construction of the underground line
              took three years. It was built just below street level using a
              technique known as 'cut and cover'. A trench about ten metres wide
              and six metres deep was dug, and the sides temporarily held up
              with timber beams. Brick walls were then constructed, and finally
              a brick arch was added to create a tunnel.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                A two-metre-deep layer of soil was laid on top of the tunnel and
                the road above rebuilt.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
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
                The Metropolitan line, which opened on 10 January 1863, was the
                world's first underground railway.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
              On its first day, almost 40,000 passengers were carried between
              Paddington and Farringdon, the journey taking about 18 minutes. By
              the end of the Metropolitan's first year of operation, 9.5 million
              journeys had been made.
            </p>

            <br />

            <p className="text-lg">
              Even as the Metropolitan began operation, the first extensions to
              the line were being authorised; these were built over the next
              five years, reaching Moorgate in the east of London and
              Hammersmith in the west. The original plan was to pull the trains
              with steam locomotives, using firebricks in the boilers to provide
              steam, but these engines were never introduced. Instead, the line
              used specially designed locomotives that were fitted with water
              tanks in which steam could be condensed.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                However, smoke and fumes remained a problem, even though
                ventilation shafts were added to the tunnels.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              Despite the extension of the underground railway, by the 1880s,
              congestion on London's streets had become worse. The problem was
              partly that the existing underground lines formed a circuit around
              the centre of London and extended to the suburbs, but did not
              cross the capital's centre.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The 'cut and cover' method of construction was not an option in
                this part of the capital.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              The only alternative was to tunnel deep underground.
            </p>

            <br />

            <p className="text-lg">
              Although the technology to create these tunnels existed, steam
              locomotives could not be used in such a confined space. It wasn't
              until the development of a reliable electric motor, and a means of
              transferring power from the generator to a moving train, that the
              world's first deep-level electric railway, the City & South
              London, became possible. The line opened in 1890, and ran from the
              City to Stockwell, south of the River Thames. The trains were made
              up of three carriages and driven by electric engines.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The carriages were narrow and had tiny windows just below the
                roof because it was thought that passengers would not want to
                look out at the tunnel walls.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
              The line was not without its problems, mainly caused by an
              unreliable power supply.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Although the City & South London Railway was a great technical
                achievement, it did not make a profit.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
              Then, in 1900, the Central London Railway, known as the 'Tuppenny
              Tube', began operation using new electric locomotives. It was very
              popular and soon afterwards new railways and extensions were added
              to the growing tube network. By 1907, the heart of today's
              Underground system was in place.
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
          {/* ================= Questions 1–6 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 1–6</h2>

          <p className="mb-4">
            Complete the notes below.
            <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="border p-5 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              The London underground railway
            </h3>

            <ul className="list-disc list-inside space-y-4 text-lg">
              {/* 1 */}
              <li className="flex flex-wrap items-center gap-2">
                <span>The</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                  1
                </span>
                <input
                  type="text"
                  className="border-1 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(1, e.target.value)}
                />
                <span>of London increased rapidly between 1800 and 1850</span>
              </li>

              {/* 2 */}
              <li className="flex flex-wrap items-center gap-2">
                <span>Move people to better housing in the</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                  2
                </span>
                <input
                  type="text"
                  className="border-1 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(2, e.target.value)}
                />
              </li>

              {/* 3 */}
              <li className="flex flex-wrap items-center gap-2">
                <span>A number of</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                  3
                </span>
                <input
                  type="text"
                  className="border-1 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(3, e.target.value)}
                />
                <span>agreed with Pearson's idea</span>
              </li>

              {/* 4 */}
              <li className="flex flex-wrap items-center gap-2">
                <span>Problems getting the</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                  4
                </span>
                <input
                  type="text"
                  className="border-1 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(4, e.target.value)}
                />
                <span>needed for the project</span>
              </li>

              {/* 5 */}
              <li className="flex flex-wrap items-center gap-2">
                <span>Negative articles appeared in the</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                  5
                </span>
                <input
                  type="text"
                  className="border-1 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(5, e.target.value)}
                />
              </li>

              {/* 6 */}
              <li className="flex flex-wrap items-center gap-2">
                <span>Tunnel was covered with</span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                  6
                </span>
                <input
                  type="text"
                  className="border-1 rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(6, e.target.value)}
                />
              </li>
            </ul>
          </div>

          {/* ================= Questions 7–13 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 7–13</h2>

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
              "Other countries had built underground railways before the Metropolitan line opened.",
              "More people than predicted travelled on the Metropolitan line on the first day.",
              "The use of ventilation shafts failed to prevent pollution in the tunnels.",
              "A different approach from the 'cut and cover' technique was required in London's central area.",
              "The windows on City & South London trains were at eye level.",
              "The City & South London Railway was a financial success.",
              "Trains on the 'Tuppenny Tube' nearly always ran on time.",
            ].map((q, index) => {
              const qNum = index + 7;
              return (
                <div key={qNum} className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div
                      onClick={() => handleNumberClick(qNum)}
                      className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer
                ${
                  activeNumbers[qNum]
                    ? "bg-yellow-400 border-yellow-500"
                    : "border-gray-300"
                }`}
                    >
                      {qNum}
                    </div>
                    <p className="text-lg">{q}</p>
                  </div>

                  <div className="ml-12 space-y-2">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(qNum, option)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2
                    ${
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
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1–13)
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

                            <p className="font-bold">Q{num}:</p>
                          </div>

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
      <Reading1Pagination2022></Reading1Pagination2022>
    </div>
  );
};

export default Test1Reading2022;
