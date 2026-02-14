import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

import Reading1Pagination2013 from "../Pagination 2013/Reading1Pagination2013";

const Test1Reading2013 = () => {
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
    // Questions 1–7 (TRUE / FALSE / NOT GIVEN)
    1: "FALSE",
    2: "NOT GIVEN",
    3: "FALSE",
    4: "TRUE",
    5: "NOT GIVEN",
    6: "TRUE",
    7: "NOT GIVEN",

    // Questions 8–13 (NO MORE THAN TWO WORDS)
    8: "the rich",
    9: "commercial possibilities",
    10: "mauve",
    11: "Robert Pullar",
    12: "France",
    13: "malaria",
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
            <h1 className="text-2xl font-bold text-center">
              {renderText("William Henry Perkin")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText("The man who invented synthetic dyes")}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "William Henry Perkin was born on March 12, 1838, in London, England. As a boy, Perkin's curiosity prompted early interests in the arts, sciences, photography, and engineering. But it was a chance stumbling upon a run-down, yet functional, laboratory in his late grandfather's home that solidified the young man's enthusiasm for chemistry.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "As a student at the City of London School, Perkin became immersed in the study of chemistry. His talent and devotion to the subject were perceived by his teacher, Thomas Hall, who encouraged him to attend a series of lectures given by the eminent scientist Michael Faraday at the Royal Institution.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Those speeches fired the young chemist's enthusiasm further, and he later went on to attend the Royal College of Chemistry, which he succeeded in entering in 1853, at the age of 15.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "At the time of Perkin's enrolment, the Royal College of Chemistry was headed by the noted German chemist August Wilhelm Hofmann.",
              )}
              <span>
                {renderText(
                  "Perkin's scientific gifts soon caught Hofmann's attention and, within two years, he became Hofmann's youngest assistant. Not long after that, Perkin made the scientific breakthrough that would bring him both fame and fortune.",
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "At the time, quinine was the only viable medical treatment for malaria. The drug is derived from the bark of the cinchona tree, native to South America, and by 1856, demand for the drug was surpassing the available supply.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Thus, when Hofmann made some passing comments about the desirability of a synthetic substitute for quinine, it was unsurprising that his star pupil was moved to take up the challenge.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "During his vacation in 1856, Perkin spent his time in the laboratory on the top floor of his family's house. He was attempting to manufacture quinine from aniline, an inexpensive and readily available coal tar waste product.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Despite his best efforts, however, he did not end up with quinine. Instead, he produced a mysterious dark sludge.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>

              {renderText(
                "Luckily, Perkin's scientific training and nature prompted him to investigate the substance further. Incorporating potassium dichromate and alcohol into the aniline at various stages of the experimental process, he finally produced a deep purple solution. And, proving the truth of the famous scientist Louis Pasteur's words 'chance favours only the prepared mind', Perkin saw the potential of his unexpected find.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Historically, textile dyes were made from such natural sources as plants and animal excretions. Some of these, such as the glandular mucus of snails, were difficult to obtain and outrageously expensive.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Indeed, the purple colour extracted from a snail was once so costly that in society at the time only the rich could afford it.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>

              {renderText(
                "Further, natural dyes tended to be muddy in hue and fade quickly. It was against this backdrop that Perkin's discovery was made.",
              )}
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "Perkin quickly grasped that his purple solution could be used to colour fabric, thus making it the world's first synthetic dye. Realising the importance of this breakthrough, he lost no time in patenting it.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But perhaps the most fascinating of all Perkin's reactions to his find was his nearly instant recognition that the new dye had commercial possibilities.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "Perkin originally named his dye Tyrian Purple, but it later became commonly known as mauve (from the French for the plant used to make the colour violet). He asked advice of Scottish dye works owner Robert Pullar, who assured him that manufacturing the dye would be well worth it if the colour remained fast (i.e. would not fade) and the cost was relatively low.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "So, over the fierce objections of his mentor Hofmann, he left college to give birth to the modern chemical industry.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
            </p>

            {/* Section I */}
            <p className="text-lg">
              {renderText(
                "With the help of his father and brother, Perkin set up a factory not far from London. Utilising the cheap and plentiful coal tar that was an almost unlimited byproduct of London's gas street lighting, the dye works began producing the world's first synthetically dyed material in 1857.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The company received a commercial boost from the Empress Eugénie of France, when she decided the new colour flattered her.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Section J */}
            <p className="text-lg">
              {renderText(
                "Very soon, mauve was the necessary shade for all the fashionable ladies in that country. Not to be outdone, England's Queen Victoria also appeared in public wearing a mauve gown, thus making it all the rage in England as well. The dye was bold and fast, and the public clamoured for more. Perkin went back to the drawing board.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Although Perkin's fame was achieved and fortune assured by his first discovery, the chemist continued his research.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>
            </p>

            {/* Section K */}
            <p className="text-lg">
              {renderText(
                "Among other dyes he developed and introduced were aniline red (1859) and aniline black (1863) and, in the late 1860s, Perkin's green. It is important to note that Perkin's synthetic dye discoveries had outcomes far beyond the merely decorative.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The dyes also became vital to medical research in many ways.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
            </p>

            {/* Section L */}
            <p className="text-lg">
              {renderText(
                "For instance, they were used to stain previously invisible microbes and bacteria, allowing researchers to identify such bacilli as tuberculosis, cholera, and anthrax. Artificial dyes continue to play a crucial role today.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "And, in what would have been particularly pleasing to Perkin, their current use is in the search for a vaccine against malaria.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ---------- Questions 1–7 ---------- */}
          <div className="space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–7")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              <br />
              {renderText("In boxes 1–7 on your answer sheet, choose")}
            </h3>

            <div className="flex gap-4 text-lg mb-5">
              <div className="flex flex-col">
                <span className="font-bold">{renderText("TRUE")}</span>
                <span className="font-bold ml-4">{renderText("FALSE")}</span>
                <span className="font-bold ml-4">
                  {renderText("NOT GIVEN")}
                </span>
              </div>

              <div className="flex flex-col">
                <span>
                  {renderText("if the statement agrees with the information")}
                </span>
                <span>
                  {renderText("if the statement contradicts the information")}
                </span>
                <span>{renderText("if there is no information on this")}</span>
              </div>
            </div>

            {[
              "Michael Faraday was the first person to recognise Perkin's ability as a student of chemistry.",
              "Michael Faraday suggested Perkin should enrol in the Royal College of Chemistry.",
              "Perkin employed August Wilhelm Hofmann as his assistant.",
              "Perkin was still young when he made the discovery that made him rich and famous.",
              "The trees from which quinine is derived grow only in South America.",
              "Perkin hoped to manufacture a drug from a coal tar waste product.",
              "Perkin was inspired by the discoveries of the famous scientist Louis Pasteur.",
            ].map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col gap-3">
                <p className="text-lg font-semibold">
                  {renderText(`${qIndex + 1}. ${q}`)}
                </p>

                <div className="flex flex-col gap-6">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className="flex items-center gap-2 cursor-pointer text-lg"
                    >
                      <input
                        type="radio"
                        name={`q${qIndex + 1}`}
                        value={option}
                        checked={selectedOptions[qIndex] === oIndex}
                        onChange={() => handleOptionClick(qIndex, oIndex)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span>{renderText(option)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ---------- Questions 8–13 ---------- */}
          <div className="mt-10 space-y-6 p-4 ">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 8–13")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Answer the questions below.")}
              <br />
              <br />
              {renderText(
                "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
              )}
              <br />
              <br />
              {renderText(
                "Write your answers in boxes 8–13 on your answer sheet.",
              )}
            </h3>

            {/* Fill-in-the-blank style */}
            <div className="space-y-4  p-4">
              <p className="text-lg">
                {renderText(
                  "Before Perkin's discovery, with what group in society was the colour purple associated?",
                )}{" "}
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-44"
                  value={userAnswers[8] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      8: e.target.value,
                    }))
                  }
                />
              </p>

              <p className="text-lg">
                {renderText(
                  "What potential did Perkin immediately understand that his new dye had?",
                )}{" "}
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-44"
                  value={userAnswers[9] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      9: e.target.value,
                    }))
                  }
                />
              </p>

              <p className="text-lg">
                {renderText(
                  "What was the name finally used to refer to the first colour Perkin invented?",
                )}{" "}
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-44"
                  value={userAnswers[10] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      10: e.target.value,
                    }))
                  }
                />
              </p>

              <p className="text-lg">
                {renderText(
                  "What was the name of the person Perkin consulted before setting up his own dye works?",
                )}{" "}
                <button
                  onClick={() => toggleButton(11)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[11]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  11
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-44"
                  value={userAnswers[11] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      11: e.target.value,
                    }))
                  }
                />
              </p>

              <p className="text-lg">
                {renderText(
                  "In what country did Perkin's newly invented colour first become fashionable?",
                )}{" "}
                <button
                  onClick={() => toggleButton(12)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-44"
                  value={userAnswers[12] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      12: e.target.value,
                    }))
                  }
                />
              </p>

              <p className="text-lg">
                {renderText(
                  "According to the passage, which disease is now being targeted by researchers using synthetic dyes?",
                )}{" "}
                <button
                  onClick={() => toggleButton(13)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[13]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  13
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-44"
                  value={userAnswers[13] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      13: e.target.value,
                    }))
                  }
                />
              </p>
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
      <Reading1Pagination2013></Reading1Pagination2013>
    </div>
  );
};

export default Test1Reading2013;
