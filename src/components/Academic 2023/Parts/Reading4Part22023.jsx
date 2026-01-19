import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2023 from "../Pagination 2023/Reading4Pagination2023";

const Reading4Part22023 = () => {
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
    // Questions 14–16 (MCQ A–D)
    14: "B",
    15: "C",
    16: "D",

    // Questions 17–22 (Matching A–E)
    17: "C", // Andrew Gelman
    18: "B", // Carol Dweck
    19: "A", // Alfred Binet
    20: "E", // David Yeager and Gregory Walton
    21: "B", // Carol Dweck
    22: "D", // Timothy Bates

    // Questions 23–26 (YES / NO / NOT GIVEN)
    23: "YES",
    24: "NO",
    25: "NOT GIVEN",
    26: "YES",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part32023");
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
    const savedScore = localStorage.getItem("/reading2Part32023");
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
            <h1 className="text-lg">
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 14-26</span>
              which are based on Reading Passage 2 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("The Growth Mindset")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Over the past century, a powerful idea has taken root in the educational landscape."
              )}
              {renderText(
                " The concept of intelligence as something innate has been supplanted by the idea that intelligence is not fixed, and that, with the right training, we can be the authors of our own cognitive capabilities."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Psychologist Alfred Binet, the developer of the first intelligence tests, was one of many 19th-century scientists who held that earlier view and sought to quantify cognitive ability."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                " Then, in the early 20th century, progressive thinkers revolted against the notion that inherent ability is destiny."
              )}
              {renderText(
                " Instead, educators such as John Dewey argued that every child's intelligence could be developed, given the right environment."
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section A")}
            </h1>
            <p className="text-lg">
              {renderText(
                "'Growth mindset theory' is a relatively new - and extremely popular - version of this idea."
              )}
              {renderText(
                " In many schools today you will see hallways covered in motivational posters and hear speeches on the mindset of great sporting heroes who simply believed their way to the top."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "A major focus of the growth mindset in schools is coaxing students away from seeing failure as an indication of their ability, and towards seeing it as a chance to improve that ability."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                ' As educationalist Jeff Howard noted several decades ago: "Smart is not something that you just are, smart is something that you can get."'
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section B")}
            </h1>
            <p className="text-lg">
              {renderText(
                "The idea of the growth mindset is based on the work of psychologist Carol Dweck in California in the 1990s."
              )}
              {renderText(
                " In one key experiment, Dweck divided a group of 10- to 12-year-olds into two groups."
              )}
              {renderText(
                " All were told that they had achieved a high score on a test but the first group were praised for their intelligence in achieving this, while the others were praised for their effort."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The second group - those who had been instilled with a 'growth mindset' - were subsequently far more likely to put effort into future tasks."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " Meanwhile, the former took on only those tasks that would not risk their sense of worth."
              )}
              {renderText(
                " This group had inferred that success or failure is due to innate ability, and this 'fixed mindset' had led them to fear of failure and lack of effort."
              )}
              {renderText(
                " Praising ability actually made the students perform worse, while praising effort emphasised that change was possible."
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section C")}
            </h1>
            <p className="text-lg">
              {renderText(
                "One of the greatest impediments to successfully implementing a growth mindset, however, is the education system itself: in many parts of the world, the school climate is obsessed with performance in the form of constant testing, analysing and ranking of students - a key characteristic of the fixed mindset."
              )}
              {renderText(
                " Nor is it unusual for schools to create a certain cognitive dissonance, when they applaud the benefits of a growth mindset but then hand out fixed target grades in lessons based on performance."
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section D")}
            </h1>
            <p className="text-lg">
              {renderText(
                "Aside from the implementation problem, the original growth mindset research has also received harsh criticism."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'The statistician Andrew Gelman claims that "their research designs have enough degrees of freedom that they could take their data to support just about any theory at all".'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              {renderText(
                " Professor of Psychology Timothy Bates, who has been trying to replicate Dweck's work, is finding that the results are repeatedly null."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "He notes that: \"People with a growth mindset don't cope any better with failure...Kids with the growth mindset aren't getting better grades, either before or after our intervention study.\""
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section E")}
            </h1>
            <p className="text-lg">
              {renderText(
                "Much of this criticism is not lost on Dweck, and she deserves great credit for responding to it and adapting her work accordingly."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In fact, she argues that her work has been misunderstood and misapplied in a range of ways."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                ' She has also expressed concerns that her theories are being misappropriated in schools by being conflated with the self-esteem movement: "For me the growth mindset is a tool for learning and improvement.'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It's not just a vehicle for making children feel good."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section F")}
            </h1>
            <p className="text-lg">
              {renderText(
                "But there is another factor at work here. The failure to translate the growth mindset into the classroom might reflect a misunderstanding of the nature of teaching and learning itself."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Growth mindset supporters David Yeager and Gregory Walton claim that interventions should be delivered in a subtle way to maximise their effectiveness."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                " They say that if adolescents perceive a teacher's intervention as conveying that they are in need of help, this could undo its intended effects."
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">
              {renderText("Section G")}
            </h1>
            <p className="text-lg">
              {renderText(
                "A lot of what drives students is their innate beliefs and how they perceive themselves. There is a strong correlation between self-perception and achievement, but there is evidence to suggest that the actual effect of achievement on self-perception is stronger than the other way round."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "To stand up in a classroom and successfully deliver a good speech is a genuine achievement, and that is likely to be more powerfully motivating than vague notions of 'motivation' itself."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
              {renderText(
                " Recent evidence would suggest that growth mindset interventions are not the elixir of student learning that its proponents claim it to be."
              )}
              {renderText(
                " The growth mindset appears to be a viable construct in the lab, which, when administered in the classroom via targeted interventions, doesn't seem to work."
              )}
              {renderText(
                " It is hard to dispute that having faith in the capacity to change is a good attribute for students."
              )}
              {renderText(
                " Paradoxically, however, that aspiration is not well served by direct interventions that try to instil it."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Motivational posters and talks are often a waste of time, and might well give students a deluded notion of what success actually means."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
              {renderText(
                " Teaching concrete skills such as how to write an effective introduction to an essay then praising students' effort in getting there is probably a far better way of improving confidence than telling them how unique they are, or indeed how capable they are of changing their own brains."
              )}
              {renderText(
                " Perhaps growth mindset works best as a philosophy and not an intervention."
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
          {/* ================= Questions 14–16 ================= */}
          <div className="space-y-6 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14–16")}
            </h2>

            <p className="mb-4">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </p>

            {[
              {
                num: 14,
                text: "What can we learn from the first paragraph?",
                options: [
                  "A. where the notion of innate intelligence first began",
                  "B. when ideas about the nature of intelligence began to shift",
                  "C. how scientists have responded to changing views of intelligence",
                  "D. why thinkers turned away from the idea of intelligence being fixed",
                ],
              },
              {
                num: 15,
                text: "The second paragraph describes how schools encourage students to",
                options: [
                  "A. identify their personal ambitions.",
                  "B. help each other to realise their goals.",
                  "C. have confidence in their potential to succeed.",
                  "D. concentrate on where their particular strengths lie.",
                ],
              },
              {
                num: 16,
                text: "In the third paragraph, the writer suggests that students with a fixed mindset",
                options: [
                  "A. tend to be less competitive.",
                  "B. generally have a low sense of self-esteem.",
                  "C. will only work hard if they are given constant encouragement.",
                  "D. are afraid to push themselves beyond what they see as their limitations.",
                ],
              },
            ].map(({ num, text, options }) => (
              <div key={num} className="space-y-2">
                <p>
                  <span className="font-bold">{renderText(String(num))}</span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col">
                  {options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt.charAt(0)}
                        checked={userAnswers[num] === opt.charAt(0)}
                        onChange={() => handleInputChange(num, opt.charAt(0))}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 17–22 ================= */}
          <div className="space-y-6 mt-10 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 17–22")}
            </h2>

            <p className="mb-4">
              {renderText(
                "Match each statement with the correct person or people, A–E."
              )}
            </p>

            <div className="border max-w-[350px] mx-auto p-4">
              <ul className="text-center space-y-1">
                {[
                  "A. Alfred Binet",
                  "B. Carol Dweck",
                  "C. Andrew Gelman",
                  "D. Timothy Bates",
                  "E. David Yeager and Gregory Walton",
                ].map((name) => (
                  <li key={name}>{renderText(name)}</li>
                ))}
              </ul>
            </div>

            {[
              "The methodology behind the growth mindset studies was not strict enough.",
              "The idea of the growth mindset has been incorrectly interpreted.",
              "Intellectual ability is an unchangeable feature of each individual.",
              "The growth mindset should be promoted without students being aware of it.",
              "The growth mindset is not simply about boosting students' morale.",
              "Research shows that the growth mindset has no effect on academic achievement.",
            ].map((text, idx) => {
              const qNum = 17 + idx;
              return (
                <div key={qNum} className="space-y-2 flex items-center gap-3">
                  <p className="flex-1">
                    <span className="font-bold">
                      {renderText(String(qNum))}
                    </span>{" "}
                    {renderText(text)}
                  </p>

                  <select
                    className="border rounded px-2 py-1"
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                  >
                    <option value="">{renderText(String(qNum))}</option>
                    {["A", "B", "C", "D", "E"].map((opt) => (
                      <option key={opt} value={opt}>
                        {renderText(opt)}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          {/* ================= Questions 23–26 ================= */}
          <div className="space-y-6 mt-10 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23–26")}
            </h2>

            <p className="mb-4">
              {renderText("Choose")} <strong>{renderText("YES")}</strong>,{" "}
              <strong>{renderText("NO")}</strong> {renderText("or")}{" "}
              <strong>{renderText("NOT GIVEN")}</strong>.
            </p>

            {[
              "Dweck has handled criticisms of her work in an admirable way.",
              "Students' self-perception is a more effective driver of self-confidence than actual achievement is.",
              "Recent evidence about growth mindset interventions has attracted unfair coverage in the media.",
              "Deliberate attempts to encourage students to strive for high achievement may have a negative effect.",
            ].map((text, idx) => {
              const qNum = 23 + idx;
              return (
                <div key={qNum} className="space-y-2">
                  <p>
                    <span className="font-bold">
                      {renderText(String(qNum))}
                    </span>{" "}
                    {renderText(text)}
                  </p>

                  <div className="flex flex-col">
                    {["YES", "NO", "NOT GIVEN"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${qNum}`}
                          value={opt}
                          checked={userAnswers[qNum] === opt}
                          onChange={() => handleInputChange(qNum, opt)}
                        />
                        <span>{renderText(opt)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Submit / Result ================= */}
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
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>

                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText("Your Score:")} {score}/
                    {Object.keys(correctAnswers).length}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers")}
                  </h3>

                  <ul className="space-y-3">
                    {Object.keys(correctAnswers).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();
                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
                            ) : (
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
                            {noAnswer
                              ? renderText("No answer provided")
                              : renderText(userAnswer)}
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
      <Reading4Pagination2023></Reading4Pagination2023>
    </div>
  );
};

export default Reading4Part22023;
