import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2025 from "../Pagination 2025/Reading2Pagination2025";

const Reading2Part22025 = () => {
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
    // Questions 14–16 (Paragraph Matching, A–F)
    14: "A", // mention of false assumptions about why people procrastinate
    15: "B", // reference to the realisation that others also procrastinate
    16: "C", // neurological evidence of a link between procrastination and emotion

    // Questions 17–22 (ONE WORD ONLY)
    17: "laziness", // Many people think procrastination is the result of ...
    18: "anxiety", // tasks that could damage self-esteem or cause us to feel ...
    19: "problems", // differences in brain regions associated with identifying ...
    20: "exams", // getting ready to take ...
    21: "perfectionists", // people who are likely to procrastinate tend to be ...
    22: "guilt", // followed by a feeling of ...

    // Questions 23–24 (Choose TWO letters, A–E)
    "23-24": ["B", "D"], // comparisons between employees who procrastinate and those who do not

    // Questions 25–26 (Choose TWO letters, A–E)
    "25-26": ["A", "B"], // recommendations for getting out of a cycle of procrastination
  };

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "23-24" || id === "25-26") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
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
          replaced_content.txt
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Procrastination")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "A psychologist explains why we put off important tasks and how we can break this habit",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "Procrastination is the habit of delaying a necessary task, usually by focusing on less urgent, more enjoyable, and easier activities instead.",
              )}
              {renderText(" We all do it from time to time.")}
              {renderText(
                " We might be composing a message to a friend who we have to let down, or putting together an important report for college or work; we're doing our best to avoid doing the job at hand, but deep down we know that we should just be getting on with it.",
              )}
              {renderText(
                " Unfortunately, berating ourselves won't stop us procrastinating again.",
              )}
              {renderText(" In fact, it's one of the worst things we can do.")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " This matters because, as my research shows, procrastination doesn't just waste time, but is actually linked to other problems, too.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Contrary to popular belief, procrastination is not due to laziness or poor time management.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Scientific studies suggest procrastination is, in fact, caused by poor mood management.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              {renderText(
                " This makes sense if we consider that people are more likely to put off starting or completing tasks that they are really not keen to do.",
              )}
              {renderText(
                " If just thinking about the task threatens our sense of self-worth or makes us anxious, we will be more likely to put it off.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Research involving brain imaging has found that areas of the brain linked to detection of threats and emotion regulation are actually different in people who chronically procrastinate compared to those who don't procrastinate frequently.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Tasks that are emotionally loaded or difficult, such as preparing for exams, are prime candidates for procrastination.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " People with low self-esteem are more likely to procrastinate.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " Another group of people who tend to procrastinate are perfectionists, who worry their work will be judged harshly by others.",
              )}
              {renderText(
                " We know that if we don't finish that report or complete those home repairs, then what we did can't be evaluated.",
              )}
              {renderText(
                " When we avoid such tasks, we also avoid the negative emotions associated with them.",
              )}
              {renderText(
                " This is rewarding, and it conditions us to use procrastination to repair our mood.",
              )}
              {renderText(
                " If we engage in more enjoyable tasks instead, we get another mood boost.",
              )}
              {renderText(
                " In the long run, however, procrastination isn't an effective way of managing emotions.",
              )}
              {renderText(" The 'mood repair' we experience is temporary.")}
              {renderText(
                " Afterwards, people tend to be left with a sense of guilt that not only increases their negative mood, but also reinforces their tendency to procrastinate.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText("So why is this such a problem?")}
              {renderText(
                " When most people think of the costs of procrastination, they think of the toll on productivity.",
              )}
              {renderText(
                " For example, studies have shown that procrastination negatively impacts on student performance.",
              )}
              {renderText(
                " But putting off reading textbooks and writing essays may affect other areas of students' lives.",
              )}
              {renderText(
                " In one study of over 3,000 German students over a six-month period, those who reported procrastinating over their university work were also more likely to engage in study-related misconduct, such as cheating and plagiarism.",
              )}
              {renderText(
                " But the behaviour that procrastination was most closely linked with was using fraudulent excuses to get deadline extensions.",
              )}
              {renderText(
                " Other research shows that employees on average spend almost a quarter of their workday procrastinating, and again this is linked with negative outcomes.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In fact, in one US survey of over 22,000 employees, participants who said they regularly procrastinated had less annual income and less employment stability.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                " For every one-point increase on a measure of chronic procrastination, annual income decreased by US$15,000.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Procrastination also correlates with serious health and well-being problems.",
              )}
              {renderText(
                " A tendency to procrastinate is linked to poor mental health, including higher levels of depression and anxiety.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Across numerous studies, I've found people who regularly procrastinate report a greater number of health issues, such as headaches, flu and colds, and digestive issues.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                " They also experience higher levels of stress and poor sleep quality.",
              )}
              {renderText(
                " They are less likely to practise healthy behaviours, such as eating a healthy diet and regularly exercising, and use destructive coping strategies to manage their stress.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In one study of over 700 people, I found people prone to procrastination had a 63% greater risk of poor heart health after accounting for other personality traits and demographics.",
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
                "Finding better ways of managing our emotions is one route out of the vicious cycle of procrastination.",
              )}
              {renderText(
                " An important first step is to manage our environment and how we view the task.",
              )}
              {renderText(
                " There are a number of evidence-based strategies that can help us fend off distractions that can occupy our minds when we should be focusing on the thing we should be getting on with.",
              )}
              {renderText(
                " For example, reminding ourselves about why the task is important and valuable can increase positive feelings towards it.",
              )}
              {renderText(
                " Forgiving ourselves and feeling compassion when we procrastinate can help break the procrastination cycle.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24,25")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " We should admit that we feel bad, but not be overly critical of ourselves.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "We should remind ourselves that we're not the first person to procrastinate, nor the last.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " Doing this can take the edge off the negative feelings we have about ourselves when we procrastinate.",
              )}
              {renderText(" This can all make it easier to get back on track.")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–26")}
          </h2>
          <h2 className=" mb-3">
            {renderText("Reading Passage 2 has six paragraphs, A-F.")}
          </h2>
          <h2 className="text-lg mb-3">
            {renderText("Which paragraph contains the following information?")}
          </h2>
          <h2 className=" mb-3">
            {renderText(
              "Choose the correct letter, A–F, in boxes 14-16 on your answer sheet.",
            )}
          </h2>
          <h2 className=" mb-3">
            {renderText("NB You may use any letter more than once.")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            {/* ================= Questions 14–16 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 14–16</h2>
              <p className="mt-2">
                {renderText(
                  "Which paragraph contains the following information?",
                )}
              </p>

              {[
                {
                  num: 14,
                  text: "mention of false assumptions about why people procrastinate",
                },
                {
                  num: 15,
                  text: "reference to the realisation that others also procrastinate",
                },
                {
                  num: 16,
                  text: "neurological evidence of a link between procrastination and emotion",
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span>{renderText(text)}</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 17–22 ================= */}
            <div>
              <h2 className="font-bold text-xl mt-6">Questions 17–22</h2>
              <p className="mt-2">
                {renderText(
                  "Complete the summary below. Choose ONE WORD ONLY from the passage.",
                )}
              </p>

              <div className="mt-4 space-y-4 border p-4">
                <h2 className="font-bold text-xl text-center">
                  {renderText("What makes us procrastinate?")}
                </h2>
                <p>
                  {renderText(
                    "Many people think that procrastination is the result of",
                  )}
                  <button
                    onClick={() => toggleButton(17)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[17]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    17
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[17] || ""}
                    onChange={(e) => handleInputChange(17, e.target.value)}
                  />
                  {renderText(
                    ". Others believe it to be the result of an inability to organise time efficiently.",
                  )}
                </p>

                <p>
                  {renderText(
                    "Tasks we put off may damage our self-esteem or cause us to feel",
                  )}
                  <button
                    onClick={() => toggleButton(18)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[18]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    18
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[18] || ""}
                    onChange={(e) => handleInputChange(18, e.target.value)}
                  />
                  .
                </p>

                <p>
                  {renderText(
                    "Research comparing chronic procrastinators with others found differences in brain regions associated with identifying",
                  )}
                  <button
                    onClick={() => toggleButton(19)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[19]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    19
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[19] || ""}
                    onChange={(e) => handleInputChange(19, e.target.value)}
                  />
                  .
                </p>

                <p>
                  {renderText("Getting ready to take")}
                  <button
                    onClick={() => toggleButton(20)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[20]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    20
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[20] || ""}
                    onChange={(e) => handleInputChange(20, e.target.value)}
                  />
                  {renderText(
                    "might be a typical example of one such task. People who procrastinate tend to be either",
                  )}
                  <button
                    onClick={() => toggleButton(21)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[21]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    21
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[21] || ""}
                    onChange={(e) => handleInputChange(21, e.target.value)}
                  />
                  {renderText("or those with low self-esteem.")}
                </p>

                <p>
                  {renderText(
                    "Procrastination is only a short-term measure for managing emotions. It's often followed by a feeling of",
                  )}
                  <button
                    onClick={() => toggleButton(22)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[22]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    22
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[22] || ""}
                    onChange={(e) => handleInputChange(22, e.target.value)}
                  />
                  .
                </p>
              </div>
            </div>

            {/* ================= Questions 23–24 ================= */}
            <div className="mt-6">
              <h2 className="font-bold text-xl">Questions 23–24</h2>
              <p className="mt-2">{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO comparisons between employees who often procrastinate and those who do not are mentioned in the text?",
                )}
              </p>

              {[
                "Their salaries are lower.",
                "The quality of their work is inferior.",
                "They don't keep their jobs for as long.",
                "They don't enjoy their working lives as much.",
                "They have poorer relationships with colleagues.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["23-24"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("23-24", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 25–26 ================= */}
            <div className="mt-6">
              <h2 className="font-bold text-xl">Questions 25–26</h2>
              <p className="mt-2">{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO recommendations for getting out of a cycle of procrastination does the writer give?",
                )}
              </p>

              {[
                "not judging ourselves harshly",
                "setting ourselves manageable aims",
                "rewarding ourselves for tasks achieved",
                "prioritising tasks according to their importance",
                "avoiding things that stop us concentrating on our tasks",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["25-26"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("25-26", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
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
                  {/* Result Card */}
                  <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {renderText("Result")}
                    </h1>
                    <p className="text-green-600 text-2xl font-semibold">
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (11–20)")}
                    </h3>

                    <ul className="space-y-3">
                      {[
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        "23-24",
                        "25-26",
                      ].map((num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const isCorrect = (() => {
                          if (Array.isArray(correct)) {
                            return (
                              Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            );
                          } else {
                            return (
                              user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase()
                            );
                          }
                        })();

                        const noAnswer = !user;

                        const userAnswerDisplay = Array.isArray(user)
                          ? user.join(", ")
                          : user?.trim() || "";
                        const correctAnswerDisplay = Array.isArray(correct)
                          ? correct.join(", ")
                          : correct?.trim();

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
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                  <ImCross className="text-white text-sm font-bold" />
                                </div>
                              )}
                              <p className="font-bold">Q{num}:</p>
                            </div>

                            <p className="ml-8">
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {noAnswer ? (
                                <span className="italic">
                                  No answer provided
                                </span>
                              ) : (
                                userAnswerDisplay
                              )}
                            </p>

                            <p className="ml-8">
                              <span className="font-semibold text-green-600">
                                Correct Answer:
                              </span>{" "}
                              {correctAnswerDisplay}
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
      </div>
      <Reading2Pagination2025></Reading2Pagination2025>
    </div>
  );
};

export default Reading2Part22025;
