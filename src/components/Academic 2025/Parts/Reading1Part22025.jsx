import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2025 from "../Pagination 2025/Reading1Pagination2025";

const Reading1Part22025 = () => {
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

  const correctAnswers = {
    14: "C",
    15: "F",
    16: "E",
    17: "D",
    18: "D",
    19: "B",
    20: "A",
    21: "E",
    22: "B",
    23: "C",
    24: "waste",
    25: "machinery",
    26: "caution",
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
  const handleSubmit = () => {
    setShowResult(true);
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

          <div>
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "Return of the elm: reintroducing the beloved tree to Britain",
              )}
            </h1>

            <p className="text-lg my-5 text-center">
              {renderText(
                "Mark Rowe investigates attempts to reintroduce elms to Britain",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "Around 25 million elms, accounting for 90% of all elm trees in the UK, died during the 1960s and '70s of Dutch elm disease. In the aftermath, the elm, once so dominant in the British landscape, was largely forgotten. However, there's now hope the elm may be reintroduced to the countryside of central and southern England. Any reintroduction will start from a very low base.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"The impact of the disease is difficult to picture if you hadn\'t seen what was there before," says Matt Elliot of the Woodland Trust. "You look at old photographs from the 1960s and it\'s only then that you realise the impact [elms had]... They were significant, large trees... then they were gone."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "The disease is caused by a fungus that blocks the elms' vascular (water, nutrient and food transport) system, causing branches to wilt and die. A first epidemic, which occurred in the 1920s, gradually died down, but in the '70s a second epidemic was triggered by shipments of elm from Canada.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The wood came in the form of logs destined for boat building and its intact bark was perfect for the elm bark beetles that spread the deadly fungus.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " This time, the beetles carried a much more virulent strain that destroyed the vast majority of British elms.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Today, elms still exist in the southern English countryside but mostly only in low hedgerows between fields.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "\"We have millions of small elms in hedgerows but they get targeted by the beetle as soon as they reach a certain size,\" says Karen Russell, co-author of the report 'Where we are with elm'.",
                )}
              </span>
              {renderText(
                " Once the trunk of the elm reaches 10–15 centimetres or so in diameter, it becomes a perfect size for beetles to lay eggs and for the fungus to take hold.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Yet mature specimens have been identified, in counties such as Cambridgeshire, that are hundreds of years old, and have mysteriously escaped the epidemic.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>

              {renderText(
                " The key, Russell says, is to identify and study those trees that have survived and work out why they stood tall when millions of others succumbed.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Nevertheless, opportunities are limited as the number of these mature survivors is relatively small.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "\"What are the reasons for their survival? Avoidance, tolerance, resistance? We don't know where the balance lies between the three. I don't see how it can be entirely down to luck.\"",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "For centuries, elm ran a close second to oak as the hardwood tree of choice in Britain and was in many instances the most prominent tree in the landscape.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
              {renderText(
                " Not only was elm common in European forests, it became a key component of birch, ash and hazel woodlands. The use of elm is thought to go back to the Bronze Age, when it was widely used for tools.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Elm was also the preferred material for shields and early swords.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " It was also suitable for items that experienced high levels of impact and was used to build the keel of the 19th-century sailing ship Cutty Sark as well as mining equipment.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Given how ingrained elm is in British culture, it's unsurprising the tree has many advocates. Amongst them is Peter Bourne of the National Elm Collection in Brighton.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"I saw Dutch elm disease unfold as a small boy," he says. "The elm seemed to be part of rural England, but I remember watching trees just lose their leaves and that really stayed with me."',
                )}
              </span>
              {renderText(
                " Today, the city of Brighton's elms total about 17,000. Local factors appear to have contributed to their survival. Strong winds from the sea make it difficult for the determined elm bark beetle to attack this coastal city's elm population.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(" However, the situation is precarious.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"The beetles can just march in if we\'re not careful, as the threat is right on our doorstep," says Bourne.',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Any prospect of the elm returning relies heavily on trees being either resistant to, or tolerant of, the disease. This means a widespread reintroduction would involve existing or new hybrid strains derived from resistant, generally non-native elm species.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " A new generation of seedlings have been bred and tested to see if they can withstand the fungus by cutting a small slit on the bark and injecting a tiny amount of the pathogen.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                ' "The effects are very quick," says Russell. "You return in four to six weeks and trees that are resistant show no symptoms, whereas those that are susceptible show leaf loss and may even have died completely."',
              )}
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "All of this raises questions of social acceptance, acknowledges Russell.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"If we\'re putting elm back into the landscape, a small element of it is not native - are we bothered about that?"',
                )}
              </span>
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " For her, the environmental case for reintroducing elm is strong.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                ' Others are more wary. "On the face of it, it seems like a good idea," says Elliot. The problem, he suggests, is that, "You\'re replacing a native species with a horticultural analogue. You\'re effectively cloning."',
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " There's also the risk of introducing new diseases.",
                )}
              </span>
              {renderText(
                " Rather than plant new elms, the Woodland Trust emphasises providing space to those elms that have survived independently.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"Sometimes the best thing you can do is just give nature time to recover... over time, you might get resistance," says Elliot.',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 14–18 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–18")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Reading Passage 2 has seven sections, A-G. Which section contains the following information? Choose the correct letter, A-G, in boxes 14–18 on your answer sheet. NB You may use any letter more than once.",
            )}
          </p>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 14,
                text: "reference to the research problems that arise from there being only a few surviving large elms",
              },
              {
                q: 15,
                text: "details of a difference of opinion about the value of reintroducing elms to Britain",
              },
              {
                q: 16,
                text: "reference to how Dutch elm disease was brought into Britain",
              },
              {
                q: 17,
                text: "a description of the conditions that have enabled a location in Britain to escape Dutch elm disease",
              },
              {
                q: 18,
                text: "reference to the stage at which young elms become vulnerable to Dutch elm disease",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg">
                <span className="font-bold">{renderText(q.toString())}.</span>{" "}
                {renderText(text)}{" "}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value };
                      calculateScore(updated);
                      return updated;
                    });
                  }}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 19–23 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 19–23")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Look at the following statements (Questions 19–23) and the list of people below. Match each statement with the correct person, A–C. Choose the correct letter, A–C, next to Questions 19–23. NB You may use any letter more than once.",
            )}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[400px] mx-auto text-lg">
            <h2 className="font-bold text-xl text-center">
              {renderText("List of People")}
            </h2>
            {[
              { letter: "A", name: "Matt Elliot" },
              { letter: "B", name: "Karen Russell" },
              { letter: "C", name: "Peter Bourne" },
            ].map(({ letter, name }) => (
              <p key={letter}>
                <strong>{letter}.</strong> {renderText(name)}
              </p>
            ))}
          </div>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 19,
                text: "If a tree gets infected with Dutch elm disease, the damage rapidly becomes visible.",
              },
              {
                q: 20,
                text: "It may be better to wait and see if the mature elms that have survived continue to flourish.",
              },
              {
                q: 21,
                text: "There must be an explanation for the survival of some mature elms.",
              },
              {
                q: 22,
                text: "We need to be aware that insects carrying Dutch elm disease are not very far away.",
              },
              {
                q: 23,
                text: "You understand the effect Dutch elm disease has had when you see evidence of how prominent the tree once was.",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg">
                <span className="font-bold">{renderText(q.toString())}.</span>{" "}
                {renderText(text)}{" "}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value };
                      calculateScore(updated);
                      return updated;
                    });
                  }}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 24–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 24–26")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 24–26 on your answer sheet.",
            )}
          </p>

          <div className="space-y-4 border p-4 rounded mb-6 text-lg">
            <h2 className="font-bold text-xl text-center">
              {renderText("Uses of a popular tree")}
            </h2>
            {[
              {
                q: 24,
                before:
                  "For hundreds of years, the only tree that was more popular in Britain than elm was",
                after:
                  ". Starting in the Bronze Age, many tools were made from elm and people also used it to make weapons.",
              },
              {
                q: 25,
                before:
                  "In the 18th century, it was grown to provide wood for boxes and",
                after:
                  ". Due to its strength, elm was often used for mining equipment and the Cutty Sark's",
              },
              {
                q: 26,
                before: "",
                after: "was also constructed.",
              },
            ].map(({ q, before, after }) => (
              <div key={q} className="text-lg flex items-center flex-wrap">
                <span>{renderText(before)}</span>

                <button
                  onClick={() => toggleButton(q)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    activeButtons[q]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  {q}
                </button>

                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-24 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value };
                      calculateScore(updated);
                      return updated;
                    });
                  }}
                />

                {after && <span>{renderText(after)}</span>}
              </div>
            ))}
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
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
                    {renderText("Your Score:")} {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–13)")}
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
                      const userAnswer = (userAnswers[num] || "")
                        .toString()
                        .trim()
                        .toLowerCase();
                      const correctAnswer = (correctAnswers[num] || "")
                        .toString()
                        .trim()
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
      <Reading1Pagination2025></Reading1Pagination2025>
    </div>
  );
};

export default Reading1Part22025;
