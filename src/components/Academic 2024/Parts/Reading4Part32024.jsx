import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2024 from "../Pagination 2024/Reading4Pagination2024";

const Reading4Part32024 = () => {
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
    // Questions 27–30 (multiple choice A–D)
    27: "C", // describing a commonly held belief about people's behaviour
    28: "A", // Its appeal lay in the radical nature of its ideas.
    29: "B", // Supplies of natural resources were probably relatively plentiful.
    30: "A", // selfishness is a relatively recent development in human societies.

    // Questions 31–35 (summary completion, one word only)
    31: "cooperation", // high level of cooperation
    32: "inequality", // prevent differences in inequality
    33: "hunting", // success at hunting
    34: "selfish", // behave in a selfish manner
    35: "influence", // women have a considerable amount of influence

    // Questions 36–40 (YES, NO, NOT GIVEN)
    36: "NOT GIVEN", // Some anthropologists are mistaken about the point …
    37: "YES", // Humans who developed warlike traits … advantage
    38: "NO", // Being peaceful and cooperative is a natural way …
    39: "YES", // Negative traits more apparent in some modern cultures
    40: "NOT GIVEN", // Animal research has failed to reveal …
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

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("The Unselfish Gene")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "A psychologist gives his view on how humans became self-centred",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                " There has long been a general assumption that human beings aressentially selfish.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "We're apparently ruthless, with strong impulses to compete against each other for resources and to accumulate power and possessions.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                " If we are kind to one another, it's usually because we have ulterior motives. If we are good, it's only because we have managed to control and transcend our innate selfishness and brutality.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "   This bleak view of human nature is closely associated with the science writer Richard Dawkins, whose 1976 book The Selfish Gene became popular because it fitted so well with - and helped to justify - the competitive and individualistic ethos that was so prevalent in late 20th-century societies.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Like many others, Dawkins justifies his views with reference to the field of evolutionary psychology.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("28")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "  Prehistory is usually seen as a period of intense competition when life was such a brutal battle that only those with trait such as selfishness, aggression and ruthlessness survived.  because survival depended on access to resources - such as rivers,forests and animals - there was bound to be conflict between rival groups, which led to the development of traits such as racism warfare. This seems logical. But, in fact, the assumption on which this all rests - that prehistoric life was a desperate struggle for survival - is false.",
              )}
            </p>

            <p className="text-lg">
              It's important to remember that in the prehistoric era, the world
              was very sparsely populated. According to some estimates, around
              15,000 years ago, the population of Europe was only 29,000, and
              the population of the whole world was less than half a million.
              Humans at that time were hunter-gatherers: people who lived by
              hunting wild animals and collecting wild plants.
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "With such small population densities, it seems unlikely that prehistoric hunter-gatherer groups had to compete against each other for resources or had any need to develop ruthlessness and competitiveness, or to go to war.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              There is significant evidence to back this notion from
              contemporary hunter-gatherer groups, who live in the same way as
              prehistoric humans did. As the anthropologist Bruce Knauft has
              remarked, hunter-gatherers are characterised by "extreme political
              and sexual egalitarianism."
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Knauft has observed that individuals in such groups don't accumulate property or possessions and have an ethical obligation to share everything.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("31")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They also have methods of preserving egalitarianism by ensuring that disparities of status don't arise.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("32")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              The “!Kung” people of southern Africa, for example, swap arrows
              before going hunting and when an animal is killed, the acclaim
              does not go to the person who fired the arrow, but to the person
              the arrow belongs to.
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "And if a person becomes too domineering, the other members of the group ostracise them, exiling the offender from society.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("34")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Typically in such groups, men do not dictate what women do.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("35")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              Many anthropologists believe that societies such as the “!Kung”
              were normal until a few thousand years ago, when population growth
              led to the development of agriculture and a settled lifestyle.
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In view of the above, there seems little reason to assume that traits such as racism, warfare and male domination should have been selected by evolution.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("30")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Individuals who behaved selfishly and ruthlessly would be less likely to survive, since they would have been ostracised from their groups.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("37")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              It makes more sense, then, to see traits such as cooperation,
              egalitarianism, altruism and peacefulness as innate
              characteristics of human beings.
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "These were the traits that were prevalent in human life for tens of thousands of years.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              But if prehistoric life wasn't really as brutal as has often been
              assumed, why do modern humans behave so selfishly and ruthlessly?
              Perhaps these negative traits should be seen as a later
              development, the result of environmental and psychological
              factors.
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Research has shown repeatedly that when the natural habitats of primates such as apes and gorillas are disrupted, they tend to become more violent and hierarchical.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              So, it could well be that the same thing has happened to us. I
              believe that the end of the hunter-gatherer lifestyle and the
              advent of farming was connected to a psychological change that
              occurred in some groups of people. There was a new sense of
              individuality and separateness, which led to a new selfishness,
              and ultimately to hierarchical societies, patriarchy and warfare.
              At any rate, these negative traits appear to have developed so
              recently that it doesn't seem feasible to explain them in adaptive
              or evolutionary terms.
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
          {/* ================= Questions 27–30 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–30")}
          </h2>
          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <div className="space-y-6 mb-6 text-lg">
            {[
              {
                q: 27,
                text: "What is the writer doing in the first paragraph?",
                options: [
                  "A. setting out two opposing views about human nature",
                  "B. justifying his opinion about our tendency to be greedy",
                  "C. describing a commonly held belief about people's behaviour",
                  "D. explaining why he thinks that humans act in a selfish manner",
                ],
              },
              {
                q: 28,
                text: "What point is made about Richard Dawkins' book The Selfish Gene?",
                options: [
                  "A. Its appeal lay in the radical nature of its ideas.",
                  "B. Its success was due to the scientific support it offered.",
                  "C. It presented a view that was in line with the attitudes of its time.",
                  "D. It took an innovative approach to the analysis of human psychology.",
                ],
              },
              {
                q: 29,
                text: "What does the writer suggest about the prehistoric era in the fourth paragraph?",
                options: [
                  "A. Societies were more complex than many people believe.",
                  "B. Supplies of natural resources were probably relatively plentiful.",
                  "C. Most estimates about population sizes are likely to be inaccurate.",
                  "D. Humans moved across continents more than was previously thought.",
                ],
              },
              {
                q: 30,
                text: "The writer refers to Bruce Knauft's work as support for the idea that",
                options: [
                  "A. selfishness is a relatively recent development in human societies.",
                  "B. only people in isolated communities can live in an unselfish manner.",
                  "C. very few lifestyles have survived unchanged since prehistoric times.",
                  "D. hunter-gatherer cultures worldwide are declining in number.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="space-y-2">
                <p className="font-bold">{renderText(`${q}. ${text}`)}</p>
                <div className="flex flex-col ml-4">
                  {options.map((opt) => {
                    const letter = opt[0];
                    return (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q${q}`}
                          value={letter}
                          checked={userAnswers[q] === letter}
                          onChange={() => {
                            setUserAnswers((prev) => {
                              const updated = { ...prev, [q]: letter };
                              calculateScore(updated);
                              return updated;
                            });
                          }}
                        />
                        <span>{renderText(opt)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 31–35 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 31–35")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
            )}
          </p>

          <div className="space-y-4 border p-4 rounded mb-6 text-lg">
            <h2 className="font-bold text-xl text-center">
              {renderText("Contemporary hunter-gatherer societies")}
            </h2>
            {[
              {
                q: 31,
                text: "Bruce Knauft's research shows that contemporary hunter-gatherer societies tend to exhibit a high level of",
              },
              {
                q: 32,
                text: "In these cultures, distributing resources fairly among all members is a moral obligation. These societies also employ strategies to prevent differences in",
              },
              {
                q: 33,
                text: "occurring: for example, the “!Kung” follow a custom whereby the credit for one person's success at",
              },
              {
                q: 34,
                text: "is given to another member of the group. Individuals who behave in a",
              },
              {
                q: 35,
                text: "manner are punished by being excluded from the group, and women have a considerable amount of",
              },
            ].map(({ q, text }) => (
              <div
                key={q}
                className="flex flex-wrap items-center text-lg gap-2"
              >
                <span>{renderText(text)}</span>
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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-24"
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
              </div>
            ))}
          </div>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 36–40")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 3? In boxes 36–40 on your answer sheet, choose YES, NO or NOT GIVEN.",
            )}
          </p>

          <div className="space-y-6 mb-6 text-lg">
            {[
              {
                q: 36,
                text: "Some anthropologists are mistaken about the point when the number of societies such as the “!Kung” began to decline.",
              },
              {
                q: 37,
                text: "Humans who developed warlike traits in prehistory would have had an advantage over those who did not.",
              },
              {
                q: 38,
                text: "Being peaceful and cooperative is a natural way for people to behave.",
              },
              {
                q: 39,
                text: "Negative traits are more apparent in some modern cultures than in others.",
              },
              {
                q: 40,
                text: "Animal research has failed to reveal a link between changes in the environment and the emergence of aggressive tendencies.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2">
                <p className="font-bold">{renderText(`${q}. ${text}`)}</p>
                <div className="flex flex-col ml-4">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() => {
                          setUserAnswers((prev) => {
                            const updated = { ...prev, [q]: opt };
                            calculateScore(updated);
                            return updated;
                          });
                        }}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Submit & Result ================= */}
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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27–40)
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toUpperCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toUpperCase();
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
      <Reading4Pagination2024></Reading4Pagination2024>
    </div>
  );
};

export default Reading4Part32024;
