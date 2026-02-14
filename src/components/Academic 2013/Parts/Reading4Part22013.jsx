import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2013 from "../Pagination 2013/Reading4Pagination2013";

const Reading4Part22013 = () => {
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
    14: "B",
    15: "C",
    16: "G",
    17: "D",
    18: "H",
    19: "E",
    20: "D",
    21: "B",
    22: "E",
    23: "C",
    24: "mirror",
    25: "communication",
    26: "ownership",
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
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Young children's sense of identity")}
            </h1>

            {/* Section A */}
            <p className="text-lg">
              <span className="font-bold">{renderText("A")}</span>
              <br />
              {renderText(
                "A sense of self develops in young children by degrees. The process can usefully be thought of in terms of the gradual emergence of two somewhat separate features: the self as a subject, and the self as an object. William James introduced the distinction in 1892, and contemporaries of his, such as Charles Cooley, added to the developing debate. Ever since then psychologists have continued building on the theory.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("B")}</span>
              <br />
              {renderText(
                "According to James, a child's first step on the road to self-understanding can be seen as the recognition that he or she exists. This is an aspect of the self that he labelled 'self-as-subject', and he gave it various elements. These included an awareness of one's own agency (i.e. one's power to act), and an awareness of one's distinctiveness from other people. These features gradually emerge as infants explore their world and interact with caregivers. Cooley (1902) suggested that a sense of the self-as-subject was primarily concerned with being able to exercise power.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He proposed that the earliest examples of this are an infant's attempts to control physical objects, such as toys or his or her own limbs.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              {renderText(
                " This is followed by attempts to affect the behavior of other people. For example, infants learn that when they cry or smile someone responds to them.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("C")}</span>
              <br />
              {renderText(
                "Another powerful source of information for infants about the effects they can have on the world around them is provided when others mimic them. Many parents spend a lot of time, particularly in the early months, copying their infant's vocalizations and expressions. In addition, young children enjoy looking in mirrors, where the movements they can see are dependent upon their own movements.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This is not to say that infants recognize the reflection as their own image (a later development). However, Lewis and Brooks-Gunn (1979) suggest that infants' developing understanding that the movements they see in the mirror are contingent on their own, leads to a growing awareness that they are distinct from other people.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                " This is because they, and only they, can change the reflection in the mirror.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("D")}</span>
              <br />
              {renderText(
                "This understanding that children gain of themselves as active agents continues to develop in their attempts to co-operate with others in play. Dunn (1988) points out that it is in such day-to-day relationships and interactions that the child's understanding of his- or herself emerges. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Empirical investigations of the self-as-subject in young children are, however, rather scarce because of difficulties of communication: even if young infants can reflect on their experience, they certainly cannot express this aspect of the self directly.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17,25")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("E")}</span>
              <br />
              {renderText(
                "Once children have acquired a certain level of self-awareness, they begin to place themselves in a whole series of categories, which together play such an important part in defining them uniquely as 'themselves'. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This second step in the development of a full sense of self is what James called the 'self-as-object'. This has been seen by many to be the aspect of the self which is most influenced by social elements, since it is made up of social roles (such as student, brother, colleague) and characteristics which derive their meaning from comparison or interaction with other people (such as trustworthiness, shyness, sporting ability).",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("F")}</span>
              <br />
              {renderText(
                "Cooley and other researchers suggested a close connection between a person's own understanding of their identity and other people's understanding of it. Cooley believed that people build up their sense of identity from the reactions of others to them, and from the view they believe others have of them. He called the self-as-object the 'looking-glass self', since people come to see themselves as they are reflected in others. Mead (1934) went even further, and saw the self and the social world as inextricably bound together: 'The self is essentially a social structure, and it arises in social experience...'",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "it is impossible to conceive of a self arising outside of social experience.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("G")}</span>
              <br />
              {renderText(
                "Lewis and Brooks-Gunn argued that an important development milestone is reached when children become able to recognize themselves visually without the support of seeing contingent movement. . . ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This recognition occurs around their second birthday",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In one experiment, Lewis and Brooks-Gunn (1979) dabbed some red powder on the noses of children who were playing in front of a mirror, and then observed how often they touched their noses",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                "The psychologists reasoned that if the children knew what they usually looked like, they would be surprised by the unusual red mark and would start touching it. On the other hand, they found that children of 15 to 18 months are generally not able to recognize themselves unless other cues such as movement are present.",
              )}
            </p>

            {/* Section H */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("H")}</span>
              <br />
              {renderText(
                "Finally, perhaps the most graphic expressions of self-awareness in general can be seen in the displays of rage which are most common from 18 months to 3 years of age.. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " In a longitudinal study of groups of three or four children, Bronson (1975) found that the intensity of the frustration and anger in their disagreements increased sharply between the ages of 1 and 2 years",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
              {renderText(
                "Often, the children's disagreements involved a struggle over a toy that none of them had played with before or after the tug-of-war: the children seemed to be disputing ownership rather than wanting to play with it. Although it may be less marked in other societies, the link between the sense of 'self' and of 'ownership' is a notable feature of childhood in Western societies.",
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
          {/* ================= Questions 14–19 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–19")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Reading Passage 2 has eight paragraphs, A-H. Which paragraph contains the following information?",
            )}
          </p>
          <p className="mb-4">
            {renderText(
              "Choose the correct letter, A-H, in boxes 14-19 on your answer sheet. NB You may use any letter more than once.",
            )}
          </p>

          {[
            {
              q: 14,
              text: "an account of the method used by researchers in a particular study",
            },
            {
              q: 15,
              text: "the role of imitation in developing a sense of identity",
            },
            {
              q: 16,
              text: "the age at which children can usually identify a static image of themselves",
            },
            {
              q: 17,
              text: "a reason for the limitations of scientific research into 'self-as-subject'",
            },
            {
              q: 18,
              text: "reference to a possible link between culture and a particular form of behaviour",
            },
            {
              q: 19,
              text: "examples of the wide range of features that contribute to the sense of 'self-as-object'",
            },
          ].map(({ q, text }) => (
            <div key={q} className="space-y-2 text-lg mb-4 flex gap-2">
              <p>
                <span className="font-bold">{q}.</span> {renderText(text)}
              </p>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1"
                value={userAnswers[q] || ""}
                onChange={(e) => handleInputChange(q, e.target.value)}
              >
                <option value="">{q}</option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 20–23 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 20–23")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Look at the following findings (Questions 20-23) and the list of researchers below. Match each finding with the correct researcher or researchers A–E.",
            )}
          </p>
          <p className="mb-4">
            {renderText(
              "Choose the correct letter, A–E, next to Questions 20–23.",
            )}
          </p>
          <p className="mb-4 font-semibold">
            {renderText(
              "List of Researchers: A. James B. Cooley C. Lewis and Brooks-Gunn D. Mead E. Bronson",
            )}
          </p>

          {[
            {
              q: 20,
              text: "A sense of identity can never be formed without relationships with other people.",
            },
            {
              q: 21,
              text: "A child's awareness of self is related to a sense of mastery over things and people.",
            },
            {
              q: 22,
              text: "At a certain age, children's sense of identity leads to aggressive behaviour.",
            },
            {
              q: 23,
              text: "Observing their own reflection contributes to children's self awareness.",
            },
          ].map(({ q, text }) => (
            <div key={q} className="space-y-2 text-lg mb-4 flex gap-2">
              <p>
                <span className="font-bold">{q}.</span> {renderText(text)}
              </p>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1"
                value={userAnswers[q] || ""}
                onChange={(e) => handleInputChange(q, e.target.value)}
              >
                <option value="">{q}</option>
                {["A", "B", "C", "D", "E"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 24–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 24–26")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
            )}
          </p>
          <div className="border p-4 text-lg">
            <p className="mb-4 font-bold text-center text-xl">
              {renderText("How children acquire a sense of identity")}
            </p>

            {/* Q24 */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="font-bold">24.</span>
              <span>
                {renderText(
                  "First, children come to realise that they can have an effect on the world around them, for example by handling objects, or causing the image to move when they face a",
                )}
              </span>

              <input
                type="text"
                className="border-2 border-gray-300 rounded-md px-3 py-1 w-32"
                value={userAnswers[24] || ""}
                onChange={(e) => handleInputChange(24, e.target.value)}
              />

              <span>.</span>
            </div>

            {/* Q25 */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="font-bold">25.</span>
              <span>
                {renderText(
                  "This aspect of self-awareness is difficult to research directly, because of",
                )}
              </span>

              <input
                type="text"
                className="border-2 border-gray-300 rounded-md px-3 py-1 w-40"
                value={userAnswers[25] || ""}
                onChange={(e) => handleInputChange(25, e.target.value)}
              />

              <span>{renderText("problems.")}</span>
            </div>

            {/* Q26 */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="font-bold">26.</span>
              <span>
                {renderText(
                  "Secondly, children start to become aware of how they are viewed by others. One important stage in this process is the visual recognition of themselves which usually occurs when they reach the age of two. In Western societies at least, the development of self awareness is often linked to a sense of",
                )}
              </span>

              <input
                type="text"
                className="border-2 border-gray-300 rounded-md px-3 py-1 w-40"
                value={userAnswers[26] || ""}
                onChange={(e) => handleInputChange(26, e.target.value)}
              />

              <span>{renderText(", and can lead to disputes.")}</span>
            </div>
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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27–40)
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
      <Reading4Pagination2013></Reading4Pagination2013>
    </div>
  );
};

export default Reading4Part22013;
