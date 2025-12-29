import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading4Pagination2015 from "../Pagination 2015/Reading4Pagination2015";

//  Marks show

const Reading4Part32015 = () => {
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
    // ================= Questions 27–31 (Multiple Choice A–D) =================
    27: "D", // it was based on many years of research
    28: "D", // the reason given for its unusual features
    29: "C", // They could lead to the re-emergence of certain characteristics
    30: "C", // it has lost and regained more than one ability
    31: "A", // Members of the Bachia lizard family have lost and regained features several times

    // ================= Questions 32–36 (Sentence endings A–G) =================
    32: "F", // the possibility of evolution being reversible
    33: "G", // Dollo's findings and the convictions held by Lombroso
    34: "A", // the question of how certain long-lost traits could reappear
    35: "B", // the occurrence of a particular feature in different species
    36: "D", // the continued existence of certain genetic information

    // ================= Questions 37–40 (YES / NO / NOT GIVEN) =================
    37: "NO", // Wagner was NOT the first to research South American lizards
    38: "YES", // Wagner believes toed Bachia evolved from toeless ancestors
    39: "NO", // such embryonic traits are NOT rare
    40: "YES", // developmental problems may cause evolutionary throwbacks
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

          <div className="mt-4">
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below."
              )}
            </h1>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {renderText("When evolution runs backwards")}
            </h1>
            <p className="text-lg mb-5 italic text-center">
              {renderText(
                "Evolution isn't supposed to run backwards - yet an increasing number of examples show that it does and that it can sometimes represent the future of a species."
              )}
            </p>

            {/* Paragraph A */}
            <p className="text-lg mb-5 font-bold">{renderText("A")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The description of any animal as an 'evolutionary throwback' is controversial."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27
                  </span>
                )}
              </span>
              {renderText(
                " For the better part of a century, most biologists have been reluctant to use those words, mindful of a principle of evolution that says 'evolution cannot run backwards'. But as more and more examples come to light and modern genetics enters the scene, that principle is having to be rewritten. Not only are evolutionary throwbacks possible, they sometimes play an important role in the forward march of evolution."
              )}
            </p>

            {/* Paragraph B */}
            <p className="text-lg mb-5 font-bold">{renderText("B")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The technical term for an evolutionary throwback is an 'atavism', from the Latin atavus, meaning forefather."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28
                  </span>
                )}
              </span>
              {renderText(
                " The word has ugly connotations thanks largely to Cesare Lombroso, a 19th-century Italian medic who argued that criminals were born not made and could be identified by certain physical features that were throwbacks to a primitive, sub-human state."
              )}
            </p>

            {/* Paragraph C */}
            <p className="text-lg mb-5 font-bold">{renderText("C")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "While Lombroso was measuring criminals, a Belgian palaeontologist called Louis Dollo was studying fossil records and coming to the opposite conclusion."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    29
                  </span>
                )}
              </span>
              {renderText(
                " In 1890 he proposed that evolution was irreversible: that 'an organism is unable to return, even partially, to a previous stage already realised in the ranks of its ancestors'. Early 20th-century biologists came to a similar conclusion, though they qualified it in terms of probability, stating that there is no reason why evolution cannot run backwards - it is just very unlikely. And so the idea of irreversibility in evolution stuck and came to be known as 'Dollo's law'."
              )}
            </p>

            {/* Paragraph D */}
            <p className="text-lg mb-5 font-bold">{renderText("D")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If Dollo's law is right, atavisms should occur only very rarely, if at all."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    30
                  </span>
                )}
              </span>
              {renderText(
                " Yet almost since the idea took root, exceptions have been cropping up. In 1919, for example, a humpback whale with a pair of leg-like appendages over a metre long, complete with a full set of limb bones, was caught off Vancouver Island in Canada. Explorer Roy Chapman Andrews argued at the time that the whale must be a throwback to a land-living ancestor. 'I can see no other explanation,' he wrote in 1921."
              )}
            </p>

            {/* Paragraph E */}
            <p className="text-lg mb-5 font-bold">{renderText("E")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Since then, so many other examples have been discovered that it no longer makes sense to say that evolution is as good as irreversible."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
              {renderText(
                " This poses a puzzle: how can characteristics that disappeared millions of years ago suddenly reappear? In 1994, Rudolf Raff and colleagues at Indiana University in the USA decided to use genetics to put a number on the probability of evolution going into reverse. They reasoned that while some evolutionary changes involve the loss of genes and are therefore irreversible, others may be the result of genes being switched off. If these silent genes are somehow switched back on, they argued, long-lost traits could reappear."
              )}
            </p>

            {/* Paragraph F */}
            <p className="text-lg mb-5 font-bold">{renderText("F")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Raff's team went on to calculate the likelihood of it happening."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>
              {renderText(
                " Silent genes accumulate random mutations, they reasoned, eventually rendering them useless. So how long can a gene survive in a species if it is no longer used? The team calculated that there is a good chance of silent genes surviving for up to 6 million years in at least a few individuals in a population, and that some might survive as long as 10 million years. In other words, throwbacks are possible, but only to the relatively recent evolutionary past."
              )}
            </p>

            {/* Paragraph G */}
            <p className="text-lg mb-5 font-bold">{renderText("G")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As a possible example, the team pointed to the mole salamanders of Mexico and California."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    33
                  </span>
                )}
              </span>
              {renderText(
                " Like most amphibians these begin life in a juvenile 'tadpole' state, then metamorphose into the adult form - except for one species, the axolotl, which famously lives its entire life as a juvenile. The simplest explanation for this is that the axolotl lineage alone lost the ability to metamorphose, while others retained it. From a detailed analysis of the salamanders' family tree, however, it is clear that the other lineages evolved from an ancestor that itself had lost the ability to metamorphose. In other words, metamorphosis in mole salamanders is an atavism. The salamander example fits with Raff's 10-million-year time frame."
              )}
            </p>

            {/* Paragraph H */}
            <p className="text-lg mb-5 font-bold">{renderText("H")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "More recently, however, examples have been reported that break the time limit, suggesting that silent genes may not be the whole story."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    34
                  </span>
                )}
              </span>
              {renderText(
                " In a paper published last year, biologist Gunter Wagner of Yale University reported some work on the evolutionary history of a group of South American lizards called Bachia. Many of these have minuscule limbs; some look more like snakes than lizards and a few have completely lost the toes on their hind limbs. Other species, however, sport up to four toes on their hind legs. The simplest explanation is that the toed lineages never lost their toes, but Wagner begs to differ. According to his analysis of the Bachia family tree, the toed species re-evolved toes from toeless ancestors and, what is more, digit loss and gain has occurred on more than one occasion over tens of millions of years."
              )}
            </p>

            {/* Paragraph I */}
            <p className="text-lg mb-5 font-bold">{renderText("I")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "So what's going on? One possibility is that these traits are lost and then simply reappear, in much the same way that similar structures can independently arise in unrelated species, such as the dorsal fins of sharks and killer whales."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
              </span>
              {renderText(
                " Another more intriguing possibility is that the genetic information needed to make toes somehow survived for tens or perhaps hundreds of millions of years in the lizards and was reactivated. These atavistic traits provided an advantage and spread through the population, effectively reversing evolution."
              )}
            </p>

            {/* Paragraph J */}
            <p className="text-lg mb-5 font-bold">{renderText("J")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But if silent genes degrade within 6 to 10 million years, how can long-lost traits be reactivated over longer timescales?"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>
              {renderText(
                " The answer may lie in the womb. Early embryos of many species develop ancestral features. Snake embryos, for example, sprout hind limb buds. Later in development these features disappear thanks to developmental programs that say 'lose the leg'. If for any reason this does not happen, the ancestral feature may not disappear, leading to an atavism."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 27–31 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 27–31")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B, C or D.")}</p>

            {[
              {
                q: 27,
                text: "When discussing the theory developed by Louis Dollo, the writer says that",
                options: [
                  "A. it was immediately referred to as Dollo's law.",
                  "B. it supported the possibility of evolutionary throwbacks.",
                  "C. it was modified by biologists in the early twentieth century.",
                  "D. it was based on many years of research.",
                ],
              },
              {
                q: 28,
                text: "The humpback whale caught off Vancouver Island is mentioned because of",
                options: [
                  "A. the exceptional size of its body.",
                  "B. the way it exemplifies Dollo's law.",
                  "C. the amount of local controversy it caused.",
                  "D. the reason given for its unusual features.",
                ],
              },
              {
                q: 29,
                text: "What is said about 'silent genes'?",
                options: [
                  "A. Their numbers vary according to species.",
                  "B. Raff disagreed with the use of the term.",
                  "C. They could lead to the re-emergence of certain characteristics.",
                  "D. They can have an unlimited life span.",
                ],
              },
              {
                q: 30,
                text: "The writer mentions the mole salamander because",
                options: [
                  "A. it exemplifies what happens in the development of most amphibians.",
                  "B. it suggests that Raff's theory is correct.",
                  "C. it has lost and regained more than one ability.",
                  "D. its ancestors have become the subject of extensive research.",
                ],
              },
              {
                q: 31,
                text: "Which of the following does Wagner claim?",
                options: [
                  "A. Members of the Bachia lizard family have lost and regained certain features several times.",
                  "B. Evidence shows that the evolution of the Bachia lizard is due to the environment.",
                  "C. His research into South American lizards supports Raff's assertions.",
                  "D. His findings will apply to other species of South American lizards.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="flex flex-col gap-2 mt-4">
                <p className="font-medium">
                  {q}. {renderText(text)}
                </p>
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${q}`}
                      value={opt[0]}
                      checked={userAnswers[q] === opt[0]}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="radio radio-accent"
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            ))}

            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 32–36")}
            </h2>

            <p>
              {renderText(
                "Complete each sentence with the correct ending, A–G, below."
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A–G, next to Questions 32–36."
              )}
            </p>

            {/* Options Box */}
            <div className="border max-w-[500px] mx-auto rounded-md p-4 mt-4 space-y-2 ">
              <p>
                {renderText(
                  "A. the question of how certain long-lost traits could reappear"
                )}
              </p>
              <p>
                {renderText(
                  "B. the occurrence of a particular feature in different species."
                )}
              </p>
              <p>
                {renderText(
                  "C. parallels drawn between behaviour and appearance."
                )}
              </p>
              <p>
                {renderText(
                  "D. the continued existence of certain genetic information."
                )}
              </p>
              <p>
                {renderText(
                  "E. the doubts felt about evolutionary throwbacks."
                )}
              </p>
              <p>
                {renderText(
                  "F. the possibility of evolution being reversible."
                )}
              </p>
              <p>
                {renderText(
                  "G. Dollo's findings and the convictions held by Lombroso."
                )}
              </p>
            </div>

            {[
              { q: 32, text: "For a long time biologists rejected" },
              {
                q: 33,
                text: "Opposing views on evolutionary throwbacks are represented by",
              },
              {
                q: 34,
                text: "Examples of evolutionary throwbacks have led to",
              },
              {
                q: 35,
                text: "The shark and killer whale are mentioned to exemplify",
              },
              {
                q: 36,
                text: "One explanation for the findings of Wagner's research is",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center mt-4">
                <span className="gap-2">
                  {q}. {renderText(text)}
                </span>
                <div className="relative w-20">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-2 py-2 pr-8"
                  >
                    <option value="">{q}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            ))}

            {/* ================= Questions 37–40 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 37–40")}
            </h2>
            <p>
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 3?"
              )}
            </p>
            <p>{renderText("In boxes 37–40 on your answer sheet, choose")}</p>
            <ul className="list-disc ml-5">
              <li>
                {renderText(
                  "YES if the statement agrees with the claims of the writer"
                )}
              </li>
              <li>
                {renderText(
                  "NO if the statement contradicts the claims of the writer"
                )}
              </li>
              <li>
                {renderText(
                  "NOT GIVEN if it is impossible to say what the writer thinks about this"
                )}
              </li>
            </ul>

            {[
              {
                q: 37,
                text: "Wagner was the first person to do research on South American lizards.",
              },
              {
                q: 38,
                text: "Wagner believes that Bachia lizards with toes had toeless ancestors.",
              },
              {
                q: 39,
                text: "The temporary occurrence of long-lost traits in embryos is rare.",
              },
              {
                q: 40,
                text: "Evolutionary throwbacks might be caused by developmental problems in the womb.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex flex-col gap-2 mt-4">
                <p className="font-medium">
                  {q}. {renderText(text)}
                </p>
                {["YES", "NO", "NOT GIVEN"].map((opt) => (
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
      <Reading4Pagination2015></Reading4Pagination2015>
    </div>
  );
};

export default Reading4Part32015;
