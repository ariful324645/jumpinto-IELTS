import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test3Reading2020 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const questions = [
    "On leaving school, Moore did what his father wanted him to do.",
    "Moore began studying sculpture in his first term at the Leeds School of Art..",
    "When Moore started at the Royal College of Art, its reputation for teaching sculpture was excellent.",
    "Moore became aware of ancient sculpture as a result of visiting London museums.",
    "The Trocadero Museum's Mayan sculpture attracted a lot of public interest.",
    "Moore thought the Mayan sculpture was similar in certain respects to other stone sculptures",
    "The artists who belonged to Unit One wanted to make modern art and architecture more popular",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
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
    localStorage.setItem("/2020/Test 3/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

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
    1: "TRUE",
    2: "FALSE",
    3: "NOT GIVEN",
    4: "TRUE",
    5: "NOT GIVEN",
    6: "FALSE",
    7: "TRUE",
    8: "resignation",
    9: "materials",
    10: "miners",
    11: "family",
    12: "collectors",
    13: "TRUE",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 3/reading");
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
    const savedScore = localStorage.getItem("/2020/Test 3/reading");
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
              {renderText("   PASSAGE 1")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Henry Moore (1898–1986)")}
            </h1>
            <h1 className="text-xl font-bold italic text-center mb-5">
              {renderText(
                "The British sculptor Henry Moore was a leading figure in the 20th-century art world"
              )}
            </h1>

            <p className="text-lg">
              {renderText(
                "The British sculptor Henry Moore was a leading figure in the 20th-century art world. Henry Moore was born in Castleford, a small town near Leeds in the north of England. He was the seventh child of Raymond Moore and his wife Mary Baker. He studied at Castleford Grammar School from 1909 to 1915, where his early interest in art was encouraged by his teacher Alice Gostick.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " After leaving school, Moore hoped to become a sculptor, but instead he complied with his father's wish that he train as a schoolteacher."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              He had to abandon his training in 1917 when he was sent to France
              to fight in the First World War
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "After the war, Moore enrolled at the Leeds School of Art, where he studied for two years. In his first year, he spent most of his time drawing. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Although he wanted to study sculpture, no teacher was appointed until his second year"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              At the end of that year, he passed the sculpture examination and
              was awarded a scholarship to the Royal College of Art in London.
              In September 1921, he moved to London and began three years of
              advanced study in sculpture.
            </p>

            <br />

            <p className="text-lg">
              {renderText(".")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Alongside the instruction he received at the Royal College, Moore visited many of the London museums, particularly the British Museum, which had a wide-ranging collection of ancient sculpture"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              During these visits, he discovered the power and beauty of ancient
              Egyptian and African sculpture. As he became increasingly
              interested in these 'primitive' forms of art, he turned away from
              European sculptural traditions.
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "After graduating, Moore spent the first six months of 1925 travelling in France. When he visited the Trocadero Museum in Paris, he was impressed by a cast of a Mayan sculpture of the rain spirit. It was a male reclining figure with its knees drawn up together, and its head at a right angle to its body."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Moore became fascinated with this stone sculpture, which he thought had a power and originality that no other stone sculpture possessed."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                " He himself started carving a variety of subjects in stone, including depictions of reclining women, mother-and-child groups, and masks."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Moore's exceptional talent soon gained recognition, and in 1926 he started work as a sculpture instructor at the Royal College. In 1933, he became a member of a group of young artists called Unit One."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The aim of the group was to convince the English public of the merits of the emerging international movement in modern art and architecture."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Around this time, Moore moved away from the human figure to experiment with abstract shapes. In 1931, he held an exhibition at the Leicester Galleries in London."
              )}
              {renderText(
                "His work was enthusiastically welcomed by fellow sculptors, but the reviews in the press were extremely negative and turned Moore into a notorious figure."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " There were calls for his resignation from the Royal College, and the following year, when his contract expired, he left to start a sculpture department at the Chelsea School of Art in London."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              {renderText("")}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In 1940, during the Second World War, Moore stopped teaching at the Chelsea School and moved to a farmhouse about 20 miles north of London. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "A shortage of materials forced him to focus on drawing."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>

              {renderText(
                "He did numerous small sketches of Londoners, later turning these ideas into large coloured drawings in his studio. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In 1942, he returned to Castleford to make a series of sketches of the miners who worked there.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(".")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In 1944, Harlow, a town near London, offered Moore a commission for a sculpture depicting a family"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
              {renderText(
                " The resulting work signifies a dramatic change in Moore's style, away from the experimentation of the 1930s towards a more natural and humanistic subject matter. He did dozens of studies in clay for the sculpture, and these were cast in bronze and issued in editions of seven to nine copies each."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In this way, Moore's work became available to collectors all over the world."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The boost to his income enabled him to take on ambitious projects and start working on the scale he felt his sculpture demanded."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In his final years, Moore created the Henry Moore Foundation to promote art appreciation and to display his work. Moore was the first modern English sculptor to achieve international critical acclaim and he is still regarded as one of the most important sculptors of the 20th century."
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
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1-7")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 1-7 on your answer sheet, choose")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
            {renderText("if the statement agrees with the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
            {renderText("if the statement contradicts the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("NOT GIVEN")}</span>{" "}
            {renderText("if there is no information on this")}
          </h3>
          <br /> <br />
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">Questions 1-7</h2>
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

            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 8-13")}
            </h2>

            <h3 className="text-lg  mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("ONE WORD AND/OR A NUMBER")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 8-13 on your answer sheet."
              )}
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Moore's career as an artist")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-lg font-bold  ">{renderText("1930s")}</h1>
              <li className="text-lg">
                Moore's exhibition at the Leicester Galleries is criticised by
                the press
              </li>
              <li className="text-lg">
                <span>{renderText("Moore is urged to offer his")}</span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  value={userAnswers[8] || ""}
                  onChange={(e) => handleInputChange(8, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("and leave the Royal College.")}</span>
              </li>
            </ul>
            {/* ---------- Section 2 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-lg font-bold mt-3 ">{renderText("1940s")}</h1>

              <li className="text-lg">
                <span>{renderText("Moore turns to drawing because")}</span>
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  value={userAnswers[9] || ""}
                  onChange={(e) => handleInputChange(9, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  {renderText("for sculpting are not readily available")}
                </span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "While visiting his hometown, Moore does some drawings of"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  value={userAnswers[10] || ""}
                  onChange={(e) => handleInputChange(10, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText(".")}</span>
              </li>
              <li className="text-lg">
                <span>
                  {renderText("Moore is employed to produce a sculpture of a")}
                </span>
                <button
                  onClick={() => toggleButton(11)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[11]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  11
                </button>
                <input
                  value={userAnswers[11] || ""}
                  onChange={(e) => handleInputChange(11, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
              <li className="text-lg">
                <span>{renderText("")}</span>
                <button
                  onClick={() => toggleButton(12)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  value={userAnswers[12] || ""}
                  onChange={(e) => handleInputChange(12, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText("start to buy Moore's work")}
              </li>
              <li className="text-lg">
                <span>{renderText("Moore increased")}</span>
                <button
                  onClick={() => toggleButton(13)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[13]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  13
                </button>
                <input
                  value={userAnswers[13] || ""}
                  onChange={(e) => handleInputChange(13, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(
                  "makes it possible for him to do more ambitious sculpture"
                )}
              </li>
            </ul>

            <ul className="list-disc list-inside space-y-3">
              <h1 className="text-lg font-bold mt-3"> {renderText("1950s")}</h1>
              <li className="text-lg">
                {renderText(
                  "Moore's series of bronze figures marks a further change in his style"
                )}
              </li>
            </ul>
          </div>
          <br />
          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-8 border-t pt-6 text-center text-lg font-semibold">
            {!showResult ? (
              <button
                onClick={() => setShowResult(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Submit Answers
              </button>
            ) : (
              <>
                {/* <p className="text-green-600 mb-2">✅ Marks: {score}/10</p> */}

                {/* Buttons to toggle right/wrong answers */}
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => setShowRight((prev) => !prev)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    {showRight ? "Hide Right Answers" : "Show Right Answers"}
                  </button>
                  <button
                    onClick={() => setShowWrong((prev) => !prev)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    {showWrong ? "Hide Wrong Answers" : "Show Wrong Answers"}
                  </button>
                </div>

                {/* Right Answers List */}
                {showRight && (
                  <div className="mt-4 text-left bg-green-50 border border-green-300 rounded-lg p-4">
                    <h3 className="font-bold text-green-700 mb-2">
                      Correct Answers:
                    </h3>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      {Object.keys(userAnswers)
                        .filter(
                          (key) =>
                            userAnswers[key]?.trim().toLowerCase() ===
                            correctAnswers[key]?.trim().toLowerCase()
                        )
                        .map((key) => (
                          <li key={key}>
                            <span className="font-semibold">Q{key}:</span>{" "}
                            {correctAnswers[key]}
                          </li>
                        ))}
                      {Object.keys(userAnswers).filter(
                        (key) =>
                          userAnswers[key]?.trim().toLowerCase() ===
                          correctAnswers[key]?.trim().toLowerCase()
                      ).length === 0 && (
                        <p className="text-green-600">
                          No correct answers yet.
                        </p>
                      )}
                    </ul>
                  </div>
                )}

                {/* Wrong Answers List */}
                {showWrong && (
                  <div className="mt-4 text-left bg-red-50 border border-red-300 rounded-lg p-4">
                    <h3 className="font-bold text-red-700 mb-2">
                      ❌ Wrong Answers:
                    </h3>
                    <ul className="list-disc list-inside text-red-700 space-y-1">
                      {Object.keys(userAnswers)
                        .filter(
                          (key) =>
                            correctAnswers[key] &&
                            userAnswers[key]?.trim().toLowerCase() !==
                              correctAnswers[key]?.trim().toLowerCase()
                        )
                        .map((key) => (
                          <li key={key}>
                            <span className="font-semibold">Q{key}:</span> Your
                            answer:{" "}
                            <span className="italic">
                              {userAnswers[key] || "—"}
                            </span>{" "}
                            → Correct:{" "}
                            <span className="font-semibold">
                              {correctAnswers[key]}
                            </span>
                          </li>
                        ))}
                      {Object.keys(userAnswers).filter(
                        (key) =>
                          correctAnswers[key] &&
                          userAnswers[key]?.trim().toLowerCase() !==
                            correctAnswers[key]?.trim().toLowerCase()
                      ).length === 0 && (
                        <p className="text-red-600">No wrong answers </p>
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3Reading2020;
