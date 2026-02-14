import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

import Reading3Pagination2013 from "../Pagination 2013/Reading3Pagination2013";

const Test3Reading2013 = () => {
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [activeButtons, setActiveButtons] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };
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

  const questions = [
    "Urban farming can take place above or below ground.",
    "Some of the equipment used in aeroponic farming can be made by hand.",
    "Urban farming relies more on electricity than some other types of farming.",
    "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
    "Most produce can be grown on an aeroponic urban farm at any time of the year.",
    "Beans take longer to grow on an urban farm than other vegetables.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const correctAnswers = {
    // Questions 1–8 (YES / NO / NOT GIVEN)
    1: "YES",
    2: "NO",
    3: "YES",
    4: "NOT GIVEN",
    5: "YES",
    6: "YES",
    7: "NO",
    8: "NOT GIVEN",

    // Questions 9–12 (Dropdown A–I)
    9: "H", // prescriptivists
    10: "F", // rules
    11: "A", // descriptivists
    12: "C", // popular speech

    // Question 13 (MCQ A–D)
    13: "B",
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  useEffect(() => {
    let newScore = 0;
    for (let i = 1; i <= 13; i++) {
      const answer = userAnswers[i]?.toString().trim().toLowerCase() || "";
      const correct = correctAnswers[i]?.toString().trim().toLowerCase() || "";
      if (answer && answer === correct) newScore += 1;
    }
    setScore(newScore);
  }, [userAnswers]);

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
  );

  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);

    // ✅ Correct mapping: Questions 1–7
    const questionNumber = qIndex + 1;

    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: options[oIndex],
    }));
  };

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

          <div className="">
            <h1 className="text-2xl font-bold text-center mb-5">
              {renderText("Attitudes to language")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "It is not easy to be systematic and objective about language study. Popular linguistic debate regularly deteriorates into invective and polemic. ",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Language belongs to everyone, so most people feel they have a right to hold an opinion about it. ",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText("And when opinions differ, emotions can run high.")}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Arguments can start as easily over minor points of usage as over major policies of linguistic education.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "Language, moreover, is a very public behavior, so it is easy for different usages to be noted and criticised. No part of society or social behavior is exempt. ",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Linguistic factors influence how we judge personality, intelligence, social status, educational standards, job aptitude, and many other areas of identity and social survival.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>

              {renderText(
                " As a result, it is easy to hurt, and to be hurt, when language use is unfeelingly attacked.",
              )}
            </p>

            {/* Paragraph 3 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In its most general sense, prescriptivism is the view that one variety of language has an inherently higher value than others, and that this ought to be imposed on the whole of the speech community.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>

              {renderText(
                "The view is propounded especially in relation to grammar and vocabulary, and frequently with reference to pronunciation.",
              )}

              {renderText(
                " The variety which is favoured, in this account, is usually a version of the 'standard' written language, especially as encountered in literature, or in the formal spoken language which most closely reflects this style. Adherents to this variety are said to speak or write 'correctly'; deviations from it are said to be 'incorrect'.",
              )}
            </p>

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "All the main languages have been studied prescriptively, especially in the 18th century approach to the writing of grammars and dictionaries. The aims of these early grammarians were threefold: (a) they wanted to codify the principles of their languages, to show that there was a system beneath the apparent chaos of usage; (b) they wanted a means of settling disputes over usage, and (c) they wanted to point out what they felt to be common errors, in order to 'improve' the language. ",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The authoritarian nature of the approach is best characterised by its reliance on 'rules' of grammar.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>

              {renderText(
                " Some usages are 'prescribed', to be learnt and followed accurately; others are 'proscribed', to be avoided.",
              )}
            </p>

            {/* Paragraph 5 */}
            <p className="text-lg">
              {renderText(
                "In this early period, there were no half-measures: usage was either right or wrong, and it was the task of the grammarian not simply to record alternatives, but to pronounce judgment upon them.",
              )}
            </p>

            {/* Paragraph 6 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "These attitudes are still with us, and they motivate a widespread concern that linguistic standards should be maintained.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>

              {renderText(
                " Nevertheless, there is an alternative point of view that is concerned less with standards than with the facts of linguistic usage. ",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This approach is summarised in the statement that it is the task of the grammarian to describe, not prescribe - to record the facts of linguistic diversity, and not to attempt the impossible tasks of evaluating language variation or halting language change.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  ' In the second half of the 18th century, we already find advocates of this view, such as Joseph Priestley, whose Rudiments of English Grammar (1761) insists that "the custom of speaking is the original and only just standard of any language".',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>

              {renderText(
                " Linguistic issues, it is argued, cannot be solved by logic and legislation. And this view has become the tenet of the modern linguistic approach to grammatical analysis.",
              )}
            </p>

            {/* Paragraph 7 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In our own time, the opposition between 'descriptivists' and 'prescriptivists' has often become extreme, with both sides painting unreal pictures of the other.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>

              {renderText(
                " Descriptive grammarians have been presented as people who do not care about standards, because of the way they see all forms of usage as equally valid. Prescriptive grammarians have been presented as blind adherents to a historical tradition. The opposition has even been presented in quasi-political terms - of radical liberalism vs elitist conservatism.",
              )}
            </p>
          </div>

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
          {/* ---------- Questions 1–8 ---------- */}
          <div className="space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–8")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 1?",
              )}
              <br />
              <br />
              {renderText("In boxes 1–8 on your answer sheet, choose")}
            </h3>

            <div className="flex gap-4 text-lg mb-5">
              <div className="flex flex-col">
                <span className="font-bold">{renderText("YES")}</span>
                <span className="font-bold ml-4">{renderText("NO")}</span>
                <span className="font-bold ml-4">
                  {renderText("NOT GIVEN")}
                </span>
              </div>

              <div className="flex flex-col">
                <span>
                  {renderText(
                    "if the statement agrees with the claims of the writer",
                  )}
                </span>
                <span>
                  {renderText(
                    "if the statement contradicts the claims of the writer",
                  )}
                </span>
                <span>
                  {renderText(
                    "if it is impossible to say what the writer thinks about this",
                  )}
                </span>
              </div>
            </div>

            {[
              "There are understandable reasons why arguments occur about language.",
              "People feel more strongly about language education than about small differences in language usage.",
              "Our assessment of a person's intelligence is affected by the way he or she uses language.",
              "Prescriptive grammar books cost a lot of money to buy in the 18th century.",
              "Prescriptivism still exists today.",
              "According to descriptivists it is pointless to try to stop language change.",
              "Descriptivism only appeared after the 18th century.",
              "Both descriptivists and prescriptivists have been misrepresented.",
            ].map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col gap-3">
                <p className="text-lg font-semibold">
                  {renderText(`${qIndex + 1}. ${q}`)}
                </p>

                <div className="flex flex-col gap-6">
                  {["YES", "NO", "NOT GIVEN"].map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className="flex items-center gap-2 cursor-pointer text-lg"
                    >
                      <input
                        type="radio"
                        name={`q${qIndex + 1}`}
                        value={option}
                        checked={userAnswers[qIndex + 1] === option}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            [qIndex + 1]: e.target.value,
                          }))
                        }
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span>{renderText(option)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ---------- Questions 9–12 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 9–12")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Complete the summary using the list of words or phrases below.",
              )}
              <br />
              <br />
              {renderText("Choose the correct letter, A–I, in boxes 9–12.")}
            </h3>

            <div className="mt-4 border max-w-[220px] text-lg mx-auto text-center text-gray-700 space-y-1">
              <p className="font-bold">{renderText("Word List:")}</p>
              <p>{renderText("A. descriptivists")}</p>
              <p>{renderText("B. language experts")}</p>
              <p>{renderText("C. popular speech")}</p>
              <p>{renderText("D. formal language")}</p>
              <p>{renderText("E. evaluation")}</p>
              <p>{renderText("F. rules")}</p>
              <p>{renderText("G. modern linguists")}</p>
              <p>{renderText("H. prescriptivists")}</p>
              <p>{renderText("I. change")}</p>
            </div>
            <div className="border p-4 rounded-lg space-y-4 bg-white">
              <p className="font-bold text-lg text-center">
                {renderText("The language debate")}
              </p>

              <p className="text-lg">
                {renderText("According to")}{" "}
                <select
                  value={userAnswers[9] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 9: e.target.value }))
                  }
                  className="border rounded-md px-3 py-1 mx-2"
                >
                  <option value="">{renderText("9")}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {renderText(", there is only one correct form of language.")}
              </p>

              <p className="text-lg">
                {renderText(
                  "Linguists who take this approach to language place great importance on grammatical",
                )}{" "}
                <select
                  value={userAnswers[10] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 10: e.target.value }))
                  }
                  className="border rounded-md px-3 py-1 mx-2"
                >
                  <option value="">{renderText("10")}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                .
              </p>

              <p className="text-lg">
                {renderText("Conversely, the view of")}{" "}
                <select
                  value={userAnswers[11] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 11: e.target.value }))
                  }
                  className="border rounded-md px-3 py-1 mx-2"
                >
                  <option value="">{renderText("11")}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {renderText(
                  ", such as Joseph Priestley, is that grammar should be based on",
                )}{" "}
                <select
                  value={userAnswers[12] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 12: e.target.value }))
                  }
                  className="border rounded-md px-3 py-1 mx-2"
                >
                  <option value="">{renderText("12")}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                .
              </p>
            </div>
          </div>

          {/* ---------- Question 13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Question 13")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </h3>

            <p className="text-lg font-semibold mb-4">
              {renderText(
                "13. What is the writer's purpose in Reading Passage 1?",
              )}
            </p>

            <div className="flex flex-col gap-5">
              {[
                "to argue in favour of a particular approach to writing dictionaries and grammar books",
                "to present a historical account of differing views of language",
                "to describe the differences between spoken and written language",
                "to show how modern linguistics has changed language education",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);

                return (
                  <label
                    key={idx}
                    className="flex items-center gap-2 cursor-pointer text-lg"
                  >
                    <input
                      type="radio"
                      name="q13"
                      value={value}
                      checked={userAnswers[13] === value}
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          13: e.target.value,
                        }))
                      }
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className="font-bold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ---------- Submit / Result ---------- */}
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
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
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
                              <span>{renderText(userAnswers[num])}</span>
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
      <Reading3Pagination2013></Reading3Pagination2013>
    </div>
  );
};

export default Test3Reading2013;
