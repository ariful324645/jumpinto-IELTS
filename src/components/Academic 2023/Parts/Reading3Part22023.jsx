import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2023 from "../Pagination 2023/Reading3Pagination2023";

const Reading3Part22023 = () => {
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
    14: "i",
    15: "ii",
    16: "iii",
    17: "iv",
    18: "v",
    19: "vi",
    20: "vii",
    21: "A",
    22: "C",
    23: "B",
    24: "popularity",
    25: "50",
    26: "emission",
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
              {renderText("The steam car")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "The successes and failures of the Doble brothers and their steam cars"
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "When primitive automobiles first began to appear in the 1800s, their engines were based on steam power."
              )}
              {renderText(
                " Steam had already enjoyed a long and successful career in the railways, so it was only natural that the technology evolved into a miniaturized version which was separate from the trains."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But these early cars inherited steam's weaknesses along with its strengths."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                "The boilers had to be lit by hand, and they required about twenty minutes to build up pressure before they could be driven. "
              )}
              {renderText(
                " Furthermore, their water reservoirs only lasted for about thirty miles before needing replenishment."
              )}
              {renderText(
                " Despite such shortcomings, these newly designed self-propelled carriages offered quick transportation, and by the early 1900s it was not uncommon to see such machines shuttling wealthy citizens around town."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But the glory days of steam cars were few. A new technology called the Internal Combustion Engine soon appeared, which offered the ability to drive down the road just moments after starting up."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              {renderText(
                " At first, these noisy gasoline cars were unpopular because they were more complicated to operate and they had difficult hand-crank starters, which were known to break arms when the engines backfired."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " But in 1912 General Motors introduced the electric starter, and over the following few years steam power was gradually phased out."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "Even as the market was declining, four brothers made one last effort to rekindle the technology."
              )}
              {renderText(
                " Between 1906 and 1909, while still attending high school, Abner Doble and his three brothers built their first steam car in their parents' basement."
              )}
              {renderText(
                " It comprised parts taken from a wrecked early steam car but reconfigured to drive an engine of their own design."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Though it did not run well, the Doble brothers went on to build a second and third prototype in the following years."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
              {renderText(
                " Though the Doble boys' third prototype, nicknamed the Model B, still lacked the convenience of an internal combustion engine, it drew the attention of automobile trade magazines due to its numerous improvements over previous steam cars."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The Model B proved to be superior to gasoline automobiles in many ways."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " Its high-pressure steam drove the engine pistons in virtual silence, in contrast to clattering gas engines which emitted the aroma of burned hydrocarbons."
              )}
              {renderText(
                " Perhaps most impressively, the Model B was amazingly swift. It could accelerate from zero to sixty miles per hour in just fifteen seconds, a feat described as 'remarkable acceleration' by Automobile magazine in 1914."
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "The following year Abner Doble drove the Model B from Massachusetts to Detroit in order to seek investment in his automobile design, which he used to open the General Engineering Company."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "He and his brothers immediately began working on the Model C, which was intended to expand upon the innovations of the Model B."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                " The brothers added features such as a key-based ignition in the cabin, eliminating the need for the operator to manually ignite the boiler."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "With these enhancements, the Dobles' new car company promised a steam vehicle which would provide all of the convenience of a gasoline car, but with much greater speed, much simpler driving controls, and a virtually silent powerplant."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              {renderText(
                " By the following April, the General Engineering Company had received 5,390 deposits for Doble Detroits, which were scheduled for delivery in early 1918."
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Later that year Abner Doble delivered unhappy news to those eagerly awaiting the delivery of their modern new cars."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                " Those buyers who received the handful of completed cars complained that the vehicles were sluggish and erratic, sometimes going in reverse when they should go forward."
              )}
              {renderText(
                " The new engine design, though innovative, was still plagued with serious glitches."
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "The brothers made one final attempt to produce a viable steam automobile."
              )}
              {renderText(
                " In early 1924, the Doble brothers shipped a Model E to New York City to be road-tested by the Automobile Club of America."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "After sitting overnight in freezing temperatures, the car was pushed out into the road and left to sit for over an hour in the frosty morning air."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                " At the turn of the key, the boiler lit and reached its operating pressure inside of forty seconds."
              )}
              {renderText(
                " As they drove the test vehicle further, they found that its evenly distributed weight lent it surprisingly good handling, even though it was so heavy."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As the new Doble steamer was further developed and tested, its maximum speed was pushed to over a hundred miles per hour, and it achieved about fifteen miles per gallon of kerosene with negligible emissions."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "Sadly, the Dobles' brilliant steam car never was a financial success."
              )}
              {renderText(
                " Priced at around $18,000 in 1924, it was popular only among the very wealthy."
              )}
              {renderText(
                " Plus, it is said that no two Model Es were quite the same, because Abner Doble tinkered endlessly with the design."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "By the time the company folded in 1931, fewer than fifty of the amazing Model E steam cars had been produced."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
              {renderText(
                " For his whole career, until his death in 1961, Abner Doble remained adamant that steam-powered automobiles were at least equal to gasoline cars, if not superior."
              )}
              {renderText(
                " Given the evidence, he may have been right. Many of the Model E Dobles which have survived are still in good working condition, some having been driven over half a million miles with only normal maintenance."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Astonishingly, an unmodified Doble Model E runs clean enough to pass the emissions laws in California today, and they are pretty strict."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
              {renderText(
                " It is true that the technology poses some difficult problems, but you cannot help but wonder how efficient a steam car might be with the benefit of modern materials and computers."
              )}
              {renderText(
                " Under the current pressure to improve automotive performance and reduce emissions, it is not unthinkable that the steam car may rise again."
              )}
              {renderText("20")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ================= Questions 14–20 ================= */}
          <div className="space-y-6 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14–20")}
            </h2>

            <p className="mb-4">
              {renderText("Reading Passage 2 has seven paragraphs, A–G.")}
              <br />
              {renderText(
                "Choose the correct heading for each paragraph from the dropdown (i–viii)."
              )}
            </p>

            {[
              { num: 14, text: "Paragraph A" },
              { num: 15, text: "Paragraph B" },
              { num: 16, text: "Paragraph C" },
              { num: 17, text: "Paragraph D" },
              { num: 18, text: "Paragraph E" },
              { num: 19, text: "Paragraph F" },
              { num: 20, text: "Paragraph G" },
            ].map(({ num, text }) => (
              <div key={num} className="flex items-center gap-4">
                <span className="font-bold">{renderText(String(num))}</span>

                <span className="font-semibold">{renderText(text)}</span>

                <select
                  className="border rounded px-2 py-1"
                  value={userAnswers[num] || ""}
                  onChange={(e) => handleInputChange(num, e.target.value)}
                >
                  <option value="">{renderText(String(num))}</option>
                  {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                    (opt) => (
                      <option key={opt} value={opt}>
                        {renderText(opt)}
                      </option>
                    )
                  )}
                </select>
              </div>
            ))}
          </div>

          {/* ================= Headings List ================= */}
          <div className="border p-5 max-w-[600px] mx-auto mt-5">
            <h2 className="text-lg font-bold mb-3 text-center">
              {renderText("List of Headings")}
            </h2>

            <ul className="text-lg ml-5">
              {[
                "i. A period in cold conditions before the technology is assessed",
                "ii. Marketing issues lead to failure",
                "iii. Good and bad aspects of steam technology are passed on",
                "iv. A possible solution to the issues of today",
                "v. Further improvements lead to commercial orders",
                "vi. Positive publicity at last for this quiet, clean, fast vehicle",
                "vii. A disappointing outcome for customers",
                "viii. A better option than the steam car arises",
              ].map((heading, index) => (
                <li key={index}>{renderText(heading)}</li>
              ))}
            </ul>
          </div>

          {/* ================= Questions 21–23 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 21–23")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 21,
                text: "What point does the writer make about the steam car in Paragraph B?",
                options: [
                  "A. Its success was short-lived.",
                  "B. Not enough cars were made.",
                  "C. Car companies found them hard to sell.",
                  "D. People found them hard to drive.",
                ],
              },
              {
                num: 22,
                text: "When building their first steam car, the Doble brothers",
                options: [
                  "A. constructed all the parts themselves.",
                  "B. made written notes at each stage of the construction.",
                  "C. needed several attempts to achieve a competitive model.",
                  "D. sought the advice of experienced people in the car industry.",
                ],
              },
              {
                num: 23,
                text: "In order to produce the Model C, the Doble brothers",
                options: [
                  "A. moved production to a different city.",
                  "B. raised financial capital.",
                  "C. employed an additional worker.",
                  "D. abandoned their earlier designs.",
                ],
              },
            ].map(({ num, text, options }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">{renderText(String(num))}</span>{" "}
                  {renderText(text)}
                </p>

                {options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${num}`}
                      checked={userAnswers[num] === opt.charAt(0)}
                      onChange={() => handleInputChange(num, opt.charAt(0))}
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </li>
            ))}
          </ul>

          {/* ================= Questions 24–26 ================= */}
          <div></div>
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 24–26")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the summary below.")}
            <br />
            {renderText(
              "Choose ONE WORD AND/OR A NUMBER from the passage for each answer."
            )}
          </p>

          <div className="space-y-4 text-lg border p-4 max-w-3xl mx-auto">
            <h2 className="font-bold text-xl text-center">
              {renderText("The Model E")}
            </h2>

            <p>
              {renderText(
                "The Model E was road-tested in 1924 by the Automobile Club of America. They found it easy to drive, despite its weight, and it impressed the spectators. A later version of the Model E raised its"
              )}

              <button
                onClick={() => toggleButton(24)}
                className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                  activeButtons[24]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                24
              </button>

              <input
                type="text"
                className="border rounded px-2 py-1 w-24 text-center"
                value={userAnswers[24] || ""}
                onChange={(e) => handleInputChange(24, e.target.value)}
              />

              {renderText(", while keeping its emissions extremely low.")}
            </p>

            <p>
              {renderText(
                "The steam car was too expensive for many people and its design was constantly being altered. Under"
              )}

              <button
                onClick={() => toggleButton(25)}
                className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                  activeButtons[25]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                25
              </button>

              <input
                type="text"
                className="border rounded px-2 py-1 w-24 text-center"
                value={userAnswers[25] || ""}
                onChange={(e) => handleInputChange(25, e.target.value)}
              />

              {renderText(
                "cars were produced before the company went out of business. However, even today, there are Model Es on the road in the US. They are straightforward to maintain, and they satisfy California's"
              )}

              <button
                onClick={() => toggleButton(26)}
                className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                  activeButtons[26]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                26
              </button>

              <input
                type="text"
                className="border rounded px-2 py-1 w-24 text-center"
                value={userAnswers[26] || ""}
                onChange={(e) => handleInputChange(26, e.target.value)}
              />

              {renderText("emissions laws.")}
            </p>
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
                    {renderText("Your Score:")} {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (14–26)")}
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
                            {(noAnswer || (!isCorrect && userAnswer)) && (
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
                              userAnswer
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            {correctAnswers[num]}
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
      <Reading3Pagination2023></Reading3Pagination2023>
    </div>
  );
};

export default Reading3Part22023;
