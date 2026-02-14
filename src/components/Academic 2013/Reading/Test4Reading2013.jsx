import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

import Reading4Pagination2013 from "../Pagination 2013/Reading4Pagination2013";

const Test4Reading2013 = () => {
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
    // Questions 1–6 (TRUE / FALSE / NOT GIVEN)
    1: "FALSE",
    2: "NOT GIVEN",
    3: "TRUE",
    4: "FALSE",
    5: "TRUE",
    6: "FALSE",

    // Questions 7–13 (ONE WORD ONLY)
    7: "thorium",
    8: "pitchblende",
    9: "radium",
    10: "soldiers",
    11: "cancer",
    12: "neutron",
    13: "leukaemia",
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
              {renderText("The life and work of Marie Curie")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "Marie Curie is probably the most famous woman scientist who has ever lived. Born Maria Sklodowska in Poland in 1867, she is famous for her work on radioactivity, and was twice a winner of the Nobel Prize. ",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "With her husband, Pierre Curie, and Henri Becquerel, she was awarded the 1903 Nobel Prize for Physics, and was then sole winner of the 1911 Nobel Prize for Chemistry. She was the first woman to win a Nobel Prize.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg"></p>
            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "From childhood, Marie was remarkable for her prodigious memory, and at the age of 16 won a gold medal on completion of her secondary education.Because her father lost his savings through bad investment, she then had to take work as a teache",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "From childhood, Marie was remarkable for her prodigious memory, and at the age of 16 won a gold medal on completion of her secondary education. Because her father lost his savings through bad investment, she then had to take work as a teacher. From her earnings she was able to finance her sister Bronia's medical studies in Paris, on the understanding that Bronia would, in turn, later help her to get an education.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "In 1891 this promise was fulfilled and Marie went to Paris and began to study at the Sorbonne (the University of Paris). She often worked far into the night and lived on little more than bread and butter and tea. She came first in the examination in the physical sciences in 1893, and in 1894 was placed second in the examination in mathematical sciences. It was not until the spring of that year that she was introduced to Pierre Curie.",
              )}
            </p>

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "Their marriage in 1895 marked the start of a partnership that was soon to achieve results of world significance. Following Henry Becquerel's discovery in 1896 of a new phenomenon, which Marie later called 'radioactivity'. Marie Curie decided to find out if the radioactivity discovered in uranium was to be found in other elements. ",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("She discovered that this was true for thorium.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 5 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Turning her attention to minerals, she found her interest drawn to pitchblende, a mineral whose radioactivity, superior to that of pure uranium, could be explained only by the presence in the ore of small quantities of an unknown substance of very high activity.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>

              {renderText(
                "Pierre Curie joined her in the work that she had undertaken to resolve this problem, and that led to the discovery of the new elements, polonium and radium.",
              )}

              {renderText(
                "While Pierre Curie devoted himself chiefly to the physical study of the new radiations, Marie Curie struggled to obtain pure radium in the metallic state. This was achieved with the help of the chemist André-Louis Debierne, one of Pierre Curie's pupils. Based on the results of this research, Marie Curie received her Doctorate of Science, and in 1903 Marie and Pierre shared with Becquerel the Nobel Prize for Physics for the discovery of radioactivity.",
              )}
            </p>

            {/* Paragraph 6 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "The births of Marie's two daughters, Irène and Eve, in 1897 and 1904 failed to interrupt her scientific work.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>

              {renderText(
                "She was appointed lecturer in physics at the École Normale Supérieure for girls in Sèrves, France (1900), and introduced a method of teaching based on experimental demonstrations. In December 1904 she was appointed chief assistant in the laboratory directed by Pierre Curie.",
              )}
            </p>

            {/* Paragraph 7 */}
            <p className="text-lg">
              {renderText(
                "The sudden death of her husband in 1906 was a bitter blow to Marie Curie, but was also a turning point in her career: henceforth she was to devote all her energy to completing alone the scientific work that they had undertaken.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "On May 13, 1906, she was appointed to the professorship that had been left vacant on her husband's death, becoming the first woman to teach at the Sorbonne.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In 1911 she was awarded the Nobel Prize for Chemistry for the isolation of a pure form of radium.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 8 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "During World War I, Marie Curie, with the help of her daughter Irène devoted herself to the development of the use of X-radiography, including the mobile units which came to be known as 'little curies', used for the treatment of wounded soldiers.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>

              {renderText(
                "In 1918 the Radium Institute, whose staff Irène had joined, began to operate in earnest, and became a center for nuclear physics and chemistry. Marie Curie, now at the highest point of her fame and, from 1922, a member of the Academy of Medicine, researched the chemistry of radioactive substances and their medical applications.",
              )}
            </p>

            {/* Paragraph 9 */}
            <p className="text-lg">
              {renderText(
                "In 1921, accompanied by her two daughters, Marie Curie made a triumphant journey to the United States to raise funds for research on radium. Women there presented her with a gram of radium for her campaign. Marie also gave lectures in Belgium, Brazil, Spain and Czechoslovakia and, in addition, had the satisfaction of seeing the development of the Curie Foundation in Paris, and the inauguration in 1932 in Warsaw of the Radium Institute, where her sister Bronia became director.",
              )}
            </p>

            {/* Paragraph 10 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "One of Marie Curie's outstanding achievements was to have understood the need to accumulate intense radioactive sources, not only to treat illness but also to maintain an abundant supply for research.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>

              {renderText(
                "The existence in Pairs at the Radium Institute of a stock of 1.5 grams of radium made a decisive contribution to the success of the experiments undertaken in the years around 1930. This work prepared the way for the discovery of the neutron by Sir James Chadwick and, above all, for the discovery in 1934 by Irène and Frédéric Joliot-Curie of artificial radioactivity.",
              )}

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
                "A few months after this discovery, Marie Curie died as a result of leukaemia caused by exposure to radiation.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "She had often carried test tubes containing radioactive isotopes in her pocket, remarking on the pretty blue-green light they gave off.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>
            </p>

            {/* Paragraph 11 */}
            <p className="text-lg">
              {renderText(
                "Her contribution to physics had been immense, not only in her own work, the importance of which had been demonstrated by her two Nobel Prizes, but because of her influence on subsequent generations of nuclear physicists and chemists.",
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
          {/* ---------- Questions 1–6 ---------- */}
          <div className="space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–6")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              <br />
              {renderText("In boxes 1–6 on your answer sheet, choose")}
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
              "Marie Curie's husband was a joint winner of both Marie's Nobel Prizes.",
              "Marie became interested in science when she was a child.",
              "Marie was able to attend the Sorbonne because of her sister's financial contribution.",
              "Marie stopped doing research for several years when her children were born.",
              "Marie took over the teaching position her husband had held.",
              "Marie's sister Bronia studied the medical uses of radioactivity.",
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

          {/* ---------- Questions 7–13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7–13")}
            </h2>

            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br />
              <br />
              {renderText("Choose ONE WORD from the passage for each answer.")}
              <br />
              <br />
              {renderText(
                "Write your answers in boxes 7–13 on your answer sheet.",
              )}
            </h3>

            <div className="border p-4 rounded-lg space-y-5 bg-white">
              <p className="font-bold text-lg text-center">
                {renderText("Marie Curie's research on radioactivity")}
              </p>

              <p className="text-lg">
                {renderText(
                  "When uranium was discovered to be radioactive, Marie Curie found that the element called",
                )}{" "}
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  type="text"
                  value={userAnswers[7] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      7: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />{" "}
                {renderText("had the same property.")}
              </p>

              <p className="text-lg">
                {renderText(
                  "Marie and Pierre Curie's research into the radioactivity of the mineral known as",
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
                  value={userAnswers[8] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      8: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />{" "}
                {renderText("led to the discovery of two new elements.")}
              </p>

              <p className="text-lg">
                {renderText(
                  "In 1911, Marie Curie received recognition for her work on the element",
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
                  value={userAnswers[9] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      9: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />
                .
              </p>

              <p className="text-lg">
                {renderText(
                  "Marie and Irène Curie developed X-radiography which was used as a medical technique for",
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
                  value={userAnswers[10] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      10: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />
                .
              </p>

              <p className="text-lg">
                {renderText(
                  "Marie Curie saw the importance of collecting radioactive material both for research and for cases of",
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
                  value={userAnswers[11] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      11: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />
                .
              </p>

              <p className="text-lg">
                {renderText(
                  "The radioactive material stocked in Paris contributed to the discoveries in the 1930s of the",
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
                  value={userAnswers[12] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      12: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />{" "}
                {renderText(
                  "and of what was known as artificial radioactivity.",
                )}
              </p>

              <p className="text-lg">
                {renderText(
                  "During her research, Marie Curie was exposed to radiation and as a result she suffered from",
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
                  value={userAnswers[13] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      13: e.target.value,
                    }))
                  }
                  className="border rounded-md px-3 py-1 mx-2 w-40"
                />
                .
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
      <Reading4Pagination2013></Reading4Pagination2013>
    </div>
  );
};

export default Test4Reading2013;
