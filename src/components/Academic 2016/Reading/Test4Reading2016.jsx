import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading4Pagination2016 from "../Pagination2016/Reading4Pagination2016";

//  Marks show

const Test4Reading2016 = () => {
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
    "There may be genetic causes for the differences in how young the skin of identical twins looks.",
    "Twins are at greater risk of developing certain illnesses than non-twins.",
    "Bouchard advertised in newspapers for twins who had been separated at birth.",
    "Epigenetic processes are different from both genetic and environmental processes.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 1;
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

  //  Marks show
  const correctAnswers = {
    // Questions 1–4: YES / NO / NOT GIVEN
    1: "YES", // Genetic causes may explain differences in twins’ skin appearance
    2: "NOT GIVEN", // No comparison of twins vs non-twins regarding illness
    3: "NOT GIVEN", // No information about Bouchard advertising in newspapers
    4: "YES", // Epigenetic processes are distinct from genetic and environmental processes

    // Questions 5–9: Matching Researchers
    5: "A", // Francis Galton – invented term to distinguish two factors
    6: "C", // Danielle Reed – expressed view on epigenetics increasing knowledge
    7: "B", // Thomas Bouchard – developed method measuring genetic influences
    8: "A", // Francis Galton – pioneered research using twins
    9: "B", // Thomas Bouchard – researched twins who had lived apart

    // Questions 10–13: Summary Completion
    10: "D", // chemicals – in epigenetic processes
    11: "B", // organs – influence activity of genes
    12: "E", // environment – how genes are affected
    13: "F", // behaviour/behavior – rat shows problems if stressed in womb
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

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 1")}</h1>
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
              {renderText("       You should spend about 20 minutes on")}

              <span className="text-lg font-bold">
                {renderText("          Questions 1-13")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 1 below")}
            </h1>
          </div>

          {/* left text */}
          <div className="overflow-x-auto p-5 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Research Using Twins")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <p className="text-lg">
              {renderText(
                "To biomedical researchers all over the world, twins offer a precious opportunity to untangle the influence of genes and the environment - of nature and nurture. Because identical twins come from a single fertilized egg that splits into two, they share virtually the same genetic code. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Any differences between them - one twin having younger looking skin, for example - must be due to environmental factors such as less time spent in the sun."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Alternatively, by comparing the experiences of identical twins with those of fraternal twins, who come from separate eggs and share on average half their DNA, researchers can quantify the extent to which our genes affect our lives. If identical twins are more similar to each other with respect to an ailment than fraternal twins are, then vulnerability to the disease must be rooted at least in part in heredity."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "These two lines of research - studying the differences between identical twins to pinpoint the influence of environment, and comparing identical twins with fraternal ones to measure the role of inheritance - have been crucial to understanding the interplay of nature and nurture in determining our personalities, behavior, and vulnerability to disease."
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The idea of using twins to measure the influence of heredity dates back to 1875, when the English scientist Francis Galton first suggested the approach (and coined the phrase 'nature and nurture')."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5,8
                  </span>
                )}
              </span>
              {renderText(
                " But twin studies took a surprising twist in the 1980s, with the arrival of studies into identical twins who had been separated at birth and reunited as adults.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Over two decades 137 sets of twins eventually visited Thomas Bouchard's lab in what became known as the Minnesota Study of Twins Reared Apart"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Bouchard and his colleagues used this mountain of data to identify how far twins were affected by their genetic makeup.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The key to their approach was a statistical concept called heritability"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
              {renderText(
                " In broad terms, the heritability of a trait measures the extent to which differences among members of a population can be explained by differences in their genetics. And wherever Bouchard and other scientists looked, it seemed, they found the invisible hand of genetic influence helping to shape our lives."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Lately, however, twin studies have helped lead scientists to a radical new conclusion: that nature and nurture are not the only elemental forces at work. According to a recent field called epigenetics, there is a third factor also in play, one that in some cases serves as a bridge between the environment and our genes, and in others operates on its own to shape who we are."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Epigenetic processes are chemical reactions tied to neither nature nor nurture but representing what researchers have called a 'third component'. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4,10
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "These reactions influence how our genetic code is expressed: how each gene is strengthened or weakened, even turned on or off, to build our bones, brains and all the other parts of our bodies."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One way the study of epigenetics is revolutionizing our understanding of biology is by revealing a mechanism by which the environment directly impacts on genes. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
                {renderText(
                  "Studies of animals, for example, have shown that when a rat experiences stress during pregnancy, it can cause epigenetic changes in a fetus that lead to behavioral problems as the rodent grows up."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
                {renderText(
                  " Other epigenetic processes appear to occur randomly, while others are normal, such as those that guide embryonic cells as they become heart, brain, or liver cells, for example."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Geneticist Danielle Reed has worked with many twins over the years and thought deeply about what twin studies have taught us. 'It's very clear when you look at twins that much of what they share is hardwired,' she says. 'Many things about them are absolutely the same and unalterable. But it's also clear, when you get to know them, that other things about them are different. Epigenetics is the origin of a lot of those differences, in my view.'"
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Reed credits Thomas Bouchard's work for today's surge in twin studies. 'He was the trailblazer,' she says. 'We forget that 50 years ago things like heart disease were thought to be caused entirely by lifestyle. Schizophrenia was thought to be due to poor mothering. Twin studies have allowed us to be more reflective about what people are actually born with and what's caused by experience.'"
              )}
            </p>

            <p className="text-lg">
              {" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Having said that, Reed adds, the latest work in epigenetics promises to take our understanding even further.'. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                " 'What I like to say is that nature writes some things in pencil and some things in pen,' she says. 'Things written in pen you can't change. That's DNA. But things written in pencil you can. That's epigenetics. Now that we're actually able to look at the DNA and see where the pencil writings are, it's sort of a whole new world.'"
              )}
            </p>
          </div>

          {/* highlight modal */}

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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <div className="flex justify-end items-center p-4 text-gray-500">
              {/* clear icon */}
              <div className="relative group">
                <div className="flex justify-between items-center">
                  <span
                    onClick={() => setIsOpen(true)}
                    className="text-xl cursor-pointer"
                  >
                    <GrClearOption />
                  </span>
                </div>
                {/* Tooltip */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {renderText("Clear answer")}
                </span>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        {renderText(
                          "Are you sure you want to clear all answers?"
                        )}
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                        >
                          {renderText("No, keep them")}
                        </button>
                        <button
                          onClick={handleClear}
                          className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          {renderText("Yes, clear them")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {" "}
            {/* 2nd step */}
            <div className="mt-5">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 1-4")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 3?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 1-4 on your answer sheet, choose")}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
                {renderText(
                  "if the statement agrees with the claims of the writer"
                )}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
                {renderText(
                  "if the statement contradicts the claims of the writer"
                )}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">
                  {renderText("NOT GIVEN")}
                </span>{" "}
                {renderText(
                  "if it is impossible to say what the writer thinks about this"
                )}
              </h3>
              <br /> <br />
              {/* question dynamic */}
              <div className="space-y-6 leading-relaxed p-4">
                <h2 className="text-lg font-bold">Questions 1-4</h2>
                {questions.map((q, qIndex) => {
                  const answerKey = qIndex + 1;
                  const correct = correctAnswers[answerKey];

                  return (
                    <div key={qIndex} className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium">
                        {answerKey}. {q}
                      </h3>
                      <ul className="flex flex-col gap-2 ml-4">
                        {options.map((option, oIndex) => {
                          const isSelected = selectedOptions[qIndex] === option;
                          const isCorrect = option === correct;

                          return (
                            <li
                              key={oIndex}
                              onClick={() => handleOptionClick(qIndex, option)}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <span
                                className={`w-5 h-5 rounded-full border-2 inline-block ${
                                  isSelected
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-700"
                                }`}
                              ></span>
                              <span
                                className={
                                  isSelected ? "text-blue-500" : "text-black"
                                }
                              >
                                {option}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 5-9")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions 5-9) and the list of researchers below."
                )}
              </p>

              <p>
                {renderText(
                  "Match each statement with the correct researcher, A-C."
                )}
              </p>
              <p>
                {renderText(
                  "Choose the correct letter, A-C, next to Questions 5-9. NB You may use any letter more than once."
                )}
              </p>

              {/* ---------- List of Researchers ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 w-80">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Researchers")}
                  </h2>
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. Francis Galton")}</li>
                    <li>{renderText("B. Thomas Bouchard")}</li>
                    <li>{renderText("C. Danielle Reed")}</li>
                  </ul>
                </div>
              </div>

              {/* ---------- Questions 5-9 ---------- */}
              <div className="space-y-4 mt-4">
                {[5, 6, 7, 8, 9].map((q) => (
                  <p key={q} className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-lg">
                      {renderText(q.toString())}
                    </span>
                    <span>
                      {renderText(
                        q === 5
                          ? "invented a term used to distinguish two factors affecting human characteristics"
                          : q === 6
                          ? "expressed the view that the study of epigenetics will increase our knowledge"
                          : q === 7
                          ? "developed a mathematical method of measuring genetic influences"
                          : q === 8
                          ? "pioneered research into genetics using twins"
                          : "carried out research into twins who had lived apart"
                      )}
                    </span>

                    <div className="relative w-40">
                      <select
                        value={userAnswers[q] || ""}
                        onChange={(e) => handleInputChange(q, e.target.value)}
                        className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                      >
                        <option value="">{renderText(q.toString())}</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                      <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </p>
                ))}
              </div>

              {/* ---------- Questions 10-13 ---------- */}
              <h1 className="text-lg font-bold mt-6">
                {renderText("Questions 10-13")}
              </h1>

              <p>
                {renderText(
                  "Complete the summary using the list of words or phrases below. Choose the correct letter, A-F, in boxes 10-13 on your answer sheet."
                )}
              </p>

              {/* ---------- List of Words ---------- */}
              <div className="flex justify-center mb-4">
                <div className="border border-black p-4 w-80">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Words")}
                  </h2>
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. nurture")}</li>
                    <li>{renderText("B. organs")}</li>
                    <li>{renderText("C. code")}</li>
                    <li>{renderText("D. chemicals")}</li>
                    <li>{renderText("E. environment")}</li>
                    <li>{renderText("F. behaviour/behavior")}</li>
                  </ul>
                </div>
              </div>

              {/* ---------- Summary Questions 10-13 ---------- */}
              {[10, 11, 12, 13].map((q) => (
                <p key={q} className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">
                    {renderText(q.toString())}
                  </span>
                  <span>
                    {renderText(
                      q === 10
                        ? "In epigenetic processes"
                        : q === 11
                        ? "influence the activity of our genes, for example in creating our internal"
                        : q === 12
                        ? ". The study of epigenetic processes is uncovering a way in which our genes can be affected by our"
                        : "One example is that if a pregnant rat suffers stress, the new-born rat may later show problems in its"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[q] || ""}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText(q.toString())}</option>
                      {["A", "B", "C", "D", "E", "F"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>
              ))}
            </div>
          </div>
          <br />

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1-13)
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
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
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

                          {/* User Answer */}
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

                          {/* Correct Answer */}
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
      <Reading4Pagination2016></Reading4Pagination2016>
    </div>
  );
};

export default Test4Reading2016;
