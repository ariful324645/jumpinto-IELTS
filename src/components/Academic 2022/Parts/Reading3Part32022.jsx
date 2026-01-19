import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2022 from "../Pagination2022/Reading3Pagination2022";

const Reading3Part32022 = () => {
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

  const correctAnswers = {
    // ================= Questions 27–31 (MCQ A–D) =================
    27: "D", // It covers a range of factors that affected the development of New York
    28: "B", // She indicates a potential problem with Barr's analysis
    29: "C", // It is too specialised for most readers
    30: "D", // Some parts will have limited appeal to certain people
    31: "B", // the interesting questions that Barr asks

    // ================= Questions 32–35 (YES / NO / NOT GIVEN) =================
    32: "NOT GIVEN",
    33: "YES",
    34: "NO",
    35: "YES",

    // ================= Questions 36–40 (SUMMARY A–J) =================
    36: "H", // specific areas
    37: "E", // impossible tasks
    38: "I", // total expenditure
    39: "A", // development plans
    40: "F", // associated risks
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
            <h1 className="text-lg">
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 27-40</span>
              which are based on Reading Passage 3 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText(
                "Building the Skyline: The Birth and Growth of Manhattan's Skyscrapers"
              )}
            </h1>

            {/* ===================== A ===================== */}
            <p className="text-lg">
              {renderText(
                "Katharine L. Shester reviews a book by Jason Barr about the development of New York City."
              )}
              {renderText(
                " In Building the Skyline, Jason Barr takes the reader through a detailed history of New York City."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The book combines geology, history, economics, and a lot of data to explain why business clusters developed where they did and how the early decisions of workers and firms shaped the skyline we see today."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27
                  </span>
                )}
              </span>

              {renderText(
                " Building the Skyline is organized into two distinct parts. The first is primarily historical and addresses New York's settlement and growth from 1609 to 1900; the second deals primarily with the 20th century and is a compilation of chapters commenting on different aspects of New York's urban development. The tone and organization of the book changes somewhat between the first and second parts, as the latter chapters incorporate aspects of Barr's related research papers."
              )}
            </p>

            <br />

            {/* ===================== B ===================== */}
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Barr begins chapter one by taking the reader on a 'helicopter time-machine' ride - giving a fascinating account of how the New York landscape in 1609 might have looked from the sky."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>

              {renderText(
                " He then moves on to a subterranean walking tour of the city, indicating the location of rock and water below the subsoil, before taking the reader back to the surface. His love of the city comes through as he describes various fun facts about the location of the New York residence of early 19th-century vice-president Aaron Burr as well as a number of legends about the city."
              )}
            </p>

            <br />

            {/* ===================== C ===================== */}
            <p className="text-lg">
              {renderText(
                "Chapters two and three take the reader up to the Civil War (1861-1865), with chapter two focusing on the early development of land and the implementation of a grid system in 1811. Chapter three focuses on land use before the Civil War. Both chapters are informative and well researched and set the stage for the economic analysis that comes later in the book."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " I would have liked Barr to expand upon his claim that existing tenements prevented skyscrapers in certain neighborhoods because 'likely no skyscraper developer was interested in performing the necessary slum clearance.' Later in the book, Barr makes the claim that the depth of bedrock was not a limiting factor for developers, as foundation costs were a small fraction of the cost of development. At first glance, it is not obvious why slum clearance would be limiting, while more expensive foundations would not."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== D ===================== */}
            <p className="text-lg">
              {renderText(
                "Chapter four focuses on immigration and the location of neighborhoods and tenements in the late 19th century."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Barr identifies four primary immigrant enclaves and analyzes their locations in terms of the amenities available in the area. Most of these enclaves were located on the least valuable land, between the industries located on the waterfront and the wealthy neighborhoods bordering Central Park"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== E ===================== */}
            <p className="text-lg">
              {renderText(
                "Part two of the book begins with a discussion of the economics of skyscraper height. In chapter five, Barr distinguishes between engineering height, economic height, and developer height - where engineering height is the tallest building that can be safely made at a given time, economic height is the height that is most efficient from society's point of view, and developer height is the actual height chosen by the developer, who is attempting to maximize return on investment."
              )}
            </p>

            <br />

            {/* ===================== F ===================== */}
            <p className="text-lg">
              {renderText(
                "Chapter five also has an interesting discussion of the technological advances that led to the construction of skyscrapers. For example, the introduction of iron and steel skeletal frames made thick, load-bearing walls unnecessary, expanding the usable square footage of buildings and increasing the use of windows and availability of natural light."
              )}
              {renderText(
                " Chapter six then presents data on building height throughout the 20th century and uses regression analysis to 'predict' building construction. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "While less technical than the research paper on which the chapter is based, it is probably more technical than would be preferred by a general audience."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    29
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== G ===================== */}
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Chapter seven tackles the 'bedrock myth', the assumption that the absence of bedrock close to the surface between Downtown and Midtown New York is the reason for skyscrapers not being built between the two urban centers."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>

              {renderText(
                " What I enjoyed the most about this chapter was Barr's discussion of how foundations are actually built. He describes the use of caissons, which enable workers to dig down for considerable distances, often below the water table, until they reach bedrock. Barr's thorough technological history discusses not only how caissons work, but also the dangers involved."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Rather, Barr argues that while deeper bedrock does increase foundation costs, these costs were neither prohibitively high nor were they large compared to the overall cost of building a skyscraper."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    37
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== H ===================== */}
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Chapters eight and nine focus on the birth of Midtown and the building boom of the 1920s. Chapter eight contains lengthy discussions of urban economic theory that may serve as a distraction to readers primarily interested in New York."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    30
                  </span>
                )}
              </span>
              {renderText(
                " However, they would be well-suited for undergraduates learning about the economics of cities. In the next chapter, Barr considers two of the primary explanations for the building boom of the 1920s - the first being exuberance, and the second being financing. He uses data to assess the viability of these two explanations and finds that supply and demand factors explain much of the development of the 1920s; though it enabled the boom, cheap credit was not, he argues, the primary cause."
              )}
            </p>

            <br />

            {/* ===================== I ===================== */}
            <p className="text-lg">
              {renderText(
                "In the final chapter (chapter 10), Barr discusses another of his empirical papers that estimates Manhattan land values from the mid-19th century to the present day."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The data work that went into these estimations is particularly impressive."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
              {renderText(
                " Toward the end of the chapter, Barr assesses 'whether skyscrapers are a cause or an effect of high land values'. He finds that changes in land values predict future building height, but the reverse is not true. The book ends with an epilogue, in which Barr discusses the impact of climate change on the city and makes policy suggestions for New York going forward."
              )}
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
          {/* ================= Questions 27–31 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–31")}
          </h2>
          <p className="mb-4">
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A, B, C or D")}</strong>.
          </p>

          <ul className="space-y-5 text-lg">
            {[
              {
                q: 27,
                text: "What point does Shester make about Barr's book in the first paragraph?",
                options: [
                  "A. It gives a highly original explanation for urban development.",
                  "B. Elements of Barr's research papers are incorporated throughout the book.",
                  "C. Other books that are available on the subject have taken a different approach.",
                  "D. It covers a range of factors that affected the development of New York.",
                ],
              },
              {
                q: 28,
                text: "How does Shester respond to the information in the book about tenements?",
                options: [
                  "A. She describes the reasons for Barr's interest.",
                  "B. She indicates a potential problem with Barr's analysis.",
                  "C. She compares Barr's conclusion with that of other writers.",
                  "D. She provides details about the sources Barr used for his research.",
                ],
              },
              {
                q: 29,
                text: "What does Shester say about chapter six of the book?",
                options: [
                  "A. It contains conflicting data.",
                  "B. It focuses too much on possible trends.",
                  "C. It is too specialised for most readers.",
                  "D. It draws on research that is out of date.",
                ],
              },
              {
                q: 30,
                text: "What does Shester suggest about the chapters focusing on the 1920s building boom?",
                options: [
                  "A. The information should have been organised differently.",
                  "B. More facts are needed about the way construction was financed.",
                  "C. The explanation that is given for the building boom is unlikely.",
                  "D. Some parts will have limited appeal to certain people.",
                ],
              },
              {
                q: 31,
                text: "What impresses Shester the most about the chapter on land values?",
                options: [
                  "A. the broad time period that is covered",
                  "B. the interesting questions that Barr asks",
                  "C. the nature of the research into the topic",
                  "D. the recommendations Barr makes for the future",
                ],
              },
            ].map(({ q, text, options }) => (
              <li key={q} className="space-y-2">
                <p>
                  <span className="font-bold">{renderText(q.toString())}</span>{" "}
                  {renderText(text)}
                </p>
                <div className="ml-6 space-y-1">
                  {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt[0]}
                        onChange={(e) => handleInputChange(q, e.target.value)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 32–35 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 32–35")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 3?"
            )}
            <br />
            {renderText("In boxes 32–35 on your answer sheet, choose")}
            <br />
            <strong>{renderText("YES")}</strong>{" "}
            {renderText(
              "if the statement agrees with the claims of the writer"
            )}
            <br />
            <strong>{renderText("NO")}</strong>{" "}
            {renderText(
              "if the statement contradicts the claims of the writer"
            )}
            <br />
            <strong>{renderText("NOT GIVEN")}</strong>{" "}
            {renderText(
              "if it is impossible to say what the writer thinks about this"
            )}
          </p>

          <ul className="space-y-6 text-lg">
            {[
              "The description in the first chapter of how New York probably looked from the air in the early 1600s lacks interest.",
              "Chapters two and three prepare the reader well for material yet to come.",
              "The biggest problem for many nineteenth-century New York immigrant neighbourhoods was a lack of amenities.",
              "In the nineteenth century, New York's immigrant neighbourhoods tended to concentrate around the harbour.",
            ].map((text, idx) => {
              const qNum = 32 + idx;
              return (
                <li key={qNum} className="space-y-2">
                  <div className="flex gap-2">
                    <span className="font-bold">
                      {renderText(qNum.toString())}
                    </span>
                    <span>{renderText(text)}</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    {["YES", "NO", "NOT GIVEN"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q${qNum}`}
                          value={opt}
                          onChange={(e) =>
                            handleInputChange(qNum, e.target.value)
                          }
                        />
                        <span>{renderText(opt)}</span>
                      </label>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 36–40")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Complete the summary using the list of words or phrases below."
            )}
            <br />
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A–J")}</strong>
            {renderText(", in boxes 36–40 on your answer sheet.")}
          </p>

          <div className="border p-4 max-w-[220px] mb-4 text-lg mx-auto space-y-1">
            {[
              "A. development plans",
              "B. deep excavations",
              "C. great distance",
              "D. excessive expense",
              "E. impossible tasks",
              "F. associated risks",
              "G. water level",
              "H. specific areas",
              "I. total expenditure",
              "J. construction guidelines",
            ].map((opt) => (
              <p key={opt}>{renderText(opt)}</p>
            ))}
          </div>

          <div className="space-y-2 text-lg border p-5">
            {[
              "In chapter seven, Barr indicates how the lack of bedrock close to the surface does not explain why skyscrapers are absent from",
              "He points out that although the cost of foundations increases when bedrock is deep below the surface, this cannot be regarded as",
              "especially when compared to",
              "A particularly enjoyable part of the chapter was Barr's account of how foundations are built. He describes not only how",
              "are made possible by the use of caissons, but he also discusses their",
            ].map((text, idx) => {
              const qNum = 36 + idx;
              return (
                <div key={qNum} className="flex flex-wrap items-center gap-2">
                  <span>{renderText(text)}</span>
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 font-bold rounded-full">
                    {renderText(qNum.toString())}
                  </div>
                  <select
                    className="border rounded px-2 py-1"
                    defaultValue=""
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                  >
                    <option value="" disabled></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
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
                    {renderText(`Your Score: ${score}/14`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer = userAnswers[num]?.trim() || "";
                      const correctAnswer = correctAnswers[num]?.trim();
                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect && (
                              <FaDotCircle className="text-green-600 text-xl font-bold" />
                            )}
                            {!isCorrect && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <ImCross className="text-white text-sm font-bold leading-none" />
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
                              renderText(userAnswer)
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            {renderText(correctAnswers[num])}
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
      <Reading3Pagination2022></Reading3Pagination2022>
    </div>
  );
};

export default Reading3Part32022;
