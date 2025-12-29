import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading3Pagination2015 from "../Pagination 2015/Reading3Pagination2015";

//  Marks show

const Test3Reading2015 = () => {
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
    // =========== Questions 1–4 (Paragraph headings) ===========
    1: "viii", // Paragraph A → The history of travel
    2: "ii", // Paragraph B → The development of mass tourism
    3: "i", // Paragraph C → Economic and social significance of tourism
    4: "v", // Paragraph D → Difficulty in recognising the economic effects of tourism
    5: "iii", // Paragraph E → Travel for the wealthy

    // =========== Questions 5–10 (TRUE / FALSE / NOT GIVEN) ===========
    5: "NOT GIVEN", // The largest employment figures in the world are found in the travel and tourism industry → Not mentioned
    6: "NOT GIVEN", // Tourism contributes over six per cent of the Australian gross national product → Not mentioned
    7: "TRUE", // Tourism has a social impact because it promotes recreation
    8: "TRUE", // Two main features of the travel and tourism industry make its economic significance difficult to ascertain
    9: "FALSE", // Visitor spending is always greater than the spending of residents in tourist areas
    10: "FALSE", // It is easy to show statistically how tourism affects individual economies

    // =========== Questions 11–13 (Completion: NO MORE THAN THREE WORDS) ===========
    11: "industry", // In Greece, tourism is the most important industry
    12: "foreign exchange", // The travel and tourism industry in Jamaica is the major foreign exchange
    13: "tourism statistics", // The problems associated with measuring international tourism are often reflected in the measurement of tourism statistics
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2015/Test 3/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2015/Test 3/reading");
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
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 1")}</h1>
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
              {renderText(
                "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("The Context, Meaning and Scope of Tourism")}
            </h1>

            {/* A */}
            <p className="font-bold mb-1">{renderText("A")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Travel has existed since the beginning of time, when primitive man set out, often traversing great distances in search of game, which provided the food and clothing necessary for his survival."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Throughout the course of history, people have travelled for purposes of trade, religious conviction, economic gain, war, migration and other equally compelling motivations."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                " In the Roman era, wealthy aristocrats and high government officials also travelled for pleasure. Seaside resorts located at Pompeii and Herculaneum afforded citizens the opportunity to escape to their vacation villas in order to avoid the summer heat of Rome. Travel, except during the Dark Ages, has continued to grow and, throughout recorded history, has played a vital role in the development of civilisations and their economies."
              )}
            </p>

            {/* B */}
            <p className="font-bold mb-1">{renderText("B")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Tourism in the mass form as we know it today is a distinctly twentieth-century phenomenon."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Historians suggest that the advent of mass tourism began in England during the industrial revolution with the rise of the middle class and the availability of relatively inexpensive transportation."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                " The creation of the commercial airline industry following the Second World War and the subsequent development of the jet aircraft in the 1950s signalled the rapid growth and expansion of international travel. This growth led to the development of a major new industry: tourism. In turn, international tourism became the concern of a number of world governments since it not only provided new employment opportunities but also produced a means of earning foreign exchange."
              )}
            </p>

            {/* C */}
            <p className="font-bold mb-1">{renderText("C")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Tourism today has grown significantly in both economic and social importance."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In most industrialised countries over the past few years the fastest growth has been seen in the area of services."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              {renderText(
                " One of the largest segments of the service industry, although largely unrecognised as an entity in some of these countries, is travel and tourism. According to the World Travel and Tourism Council (1992), 'Travel and tourism is the largest industry in the world on virtually any economic measure including value-added capital investment, employment and tax contributions.' In 1992, the industry's gross output was estimated to be $3.5 trillion, over 12 percent of all consumer spending. The travel and tourism industry is the world's largest employer with almost 130 million jobs, or almost 7 percent of all employees. This industry is the world's leading industrial contributor, producing over 6 percent of the world's gross national product and accounting for capital investment in excess of $422 billion in direct, indirect and personal taxes each year. Thus, tourism has a profound impact both on the world economy and, because of the educative effect of travel and the effects on employment, on society itself."
              )}
            </p>

            {/* D */}
            <p className="font-bold mb-1">{renderText("D")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "However, the major problems of the travel and tourism industry that have hidden, or obscured, its economic impact are the diversity and fragmentation of the industry itself."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The travel industry includes: hotels, motels and other types of accommodation; restaurants and other food services; transportation services and facilities; amusements, attractions and other leisure facilities; gift shops and a large number of other enterprises."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                " Since many of these businesses also serve local residents, the impact of spending by visitors can easily be overlooked or underestimated. In addition, Meis (1992) points out that the tourism industry involves concepts that have remained amorphous to both analysts and decision makers. Moreover, in all nations this problem has made it difficult for the industry to develop any type of reliable or credible tourism information base in order to estimate the contribution it makes to regional, national and global economies. However, the nature of this very diversity makes travel and tourism ideal vehicles for economic development in a wide variety of countries, regions or communities."
              )}
            </p>

            {/* E */}
            <p className="font-bold mb-1">{renderText("E")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Once the exclusive province of the wealthy, travel and tourism have become an institutionalised way of life for most of the population."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In fact, McIntosh and Goeldner (1990) suggest that tourism has become the largest commodity in international trade for many nations and, for a significant number of other countries, it ranks second or third."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              {renderText(
                " For example, tourism is the major source of income in Bermuda, Greece, Italy, Spain, Switzerland and most Caribbean countries. In addition, Hawkins and Ritchie, quoting from data published by the American Express Company, suggest that the travel and tourism industry is the number one ranked employer in the Bahamas, Brazil, Canada, France, (the former) West Germany, Hong Kong, Italy, Jamaica, Japan, Singapore, the United Kingdom and the United States. However, because of problems of definition, which directly affect statistical measurement, it is not possible with any degree of certainty to provide precise, valid or reliable data about the extent of world-wide tourism participation or its economic impact. In many cases, similar difficulties arise when attempts are made to measure domestic tourism."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 1–4 ================= */}
            <h2 className="text-lg font-bold">{renderText("Questions 1–4")}</h2>

            <p>{renderText("Reading Passage 1 has five paragraphs, A–E.")}</p>
            <p>
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below."
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct number, i–viii, in boxes 1–4 on your answer sheet."
              )}
            </p>

            {/* -------- List of Headings -------- */}
            <div className="border border-black p-5 max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                {renderText("List of Headings")}
              </h3>

              <ul className="space-y-1 text-lg">
                <li>
                  {renderText("i. Economic and social significance of tourism")}
                </li>
                <li>{renderText("ii. The development of mass tourism")}</li>
                <li>{renderText("iii. Travel for the wealthy")}</li>
                <li>
                  {renderText("iv. Earning foreign exchange through tourism")}
                </li>
                <li>
                  {renderText(
                    "v. Difficulty in recognising the economic effects of tourism"
                  )}
                </li>
                <li>
                  {renderText("vi. The contribution of air travel to tourism")}
                </li>
                <li>{renderText("vii. The world impact of tourism")}</li>
                <li>{renderText("viii. The history of travel")}</li>
              </ul>
            </div>

            {/* -------- Questions 1–4 Dropdowns -------- */}
            {[
              { q: 1, text: "Paragraph A" },
              { q: 2, text: "Paragraph B" },
              { q: 3, text: "Paragraph C" },
              { q: 4, text: "Paragraph D" },
              { q: 5, text: "Paragraph E" },
            ].map(({ q, text }) => (
              <p key={q} className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-lg">{renderText(`${q}.`)}</span>
                <span>{renderText(text)}</span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                  >
                    <option value="">{q}</option>
                    {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}

            {/* ================= Questions 5–10 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 5–10")}
            </h2>

            <p>
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?"
              )}
            </p>
            <p>{renderText("In boxes 5–10 on your answer sheet, choose")}</p>

            <ul className="ml-6 text-lg space-y-1">
              <li>
                <strong>TRUE</strong> –{" "}
                {renderText("if the statement agrees with the information")}
              </li>
              <li>
                <strong>FALSE</strong> –{" "}
                {renderText("if the statement contradicts the information")}
              </li>
              <li>
                <strong>NOT GIVEN</strong> –{" "}
                {renderText("if there is no information on this")}
              </li>
            </ul>

            {/* -------- Questions 5–10 Radio Buttons -------- */}
            {[
              {
                q: 5,
                text: "The largest employment figures in the world are found in the travel and tourism industry.",
              },
              {
                q: 6,
                text: "Tourism contributes over six per cent of the Australian gross national product.",
              },
              {
                q: 7,
                text: "Tourism has a social impact because it promotes recreation.",
              },
              {
                q: 8,
                text: "Two main features of the travel and tourism industry make its economic significance difficult to ascertain.",
              },
              {
                q: 9,
                text: "Visitor spending is always greater than the spending of residents in tourist areas.",
              },
              {
                q: 10,
                text: "It is easy to show statistically how tourism affects individual economies.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-6 ml-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
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

            {/* ================= Questions 11–13 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 11–13")}
            </h2>
            <p>
              {renderText(
                "Complete the sentences below. Choose NO MORE THAN THREE WORDS from the passage for each answer. Write your answers in boxes 11–13 on your answer sheet."
              )}
            </p>

            {[
              { q: 11, text: "In Greece, tourism is the most important" },
              {
                q: 12,
                text: "The travel and tourism industry in Jamaica is the major",
              },
              {
                q: 13,
                text: "The problems associated with measuring international tourism are often reflected in the measurement of",
              },
            ].map(({ q, text }) => (
              <div key={q} className="mt-4 flex items-center  gap-2 ">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>
                <input
                  type="text"
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-2 mt-2"
                  placeholder={q.toString()} // placeholder = 11, 12, 13
                />
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
                    {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–13)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
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

export default Test3Reading2015;
