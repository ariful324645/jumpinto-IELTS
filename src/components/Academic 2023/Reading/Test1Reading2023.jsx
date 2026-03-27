import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2023 from "../Pagination 2023/Reading1Pagination2023";

const Test1Reading2023 = () => {
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
                : [p]
            )
          : [part]
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
    Array(questions.length).fill(null)
  );
  const correctAnswers = {
    1: "strawberries",
    2: "1,000 kg",
    3: "consumption",
    4: "pesticides",
    5: "varieties",
    6: "producers",
    7: "flavour",
    8: "TRUE",
    9: "TRUE",
    10: "TRUE",
    11: "NOT GIVEN",
    12: "FALSE",
    13: "TRUE",
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
    Array(questions.length).fill(false)
  );

  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);

    // Map qIndex 0–5 to question numbers 8–13
    const questionNumber = qIndex + 8;
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
              {renderText("Urban farming")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "In Paris, urban farmers are trying a soil-free approach to agriculture that uses less space and fewer resources. Could it help cities face the threats to our food supplies?"
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "On top of a striking new exhibition hall in southern Paris, the world's largest urban rooftop farm has started to bear fruit."
              )}
              {renderText(
                " Strawberries that are small, intensely flavoured and resplendently red sprout abundantly from large plastic tubes."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " From identical vertical tubes nearby burst row upon row of lettuces; near those are aromatic herbs, such as basil, sage and peppermint"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                "Peer inside and you see the tubes are completely hollow, the roots of dozens of strawberry plants dangling down inside them.. Opposite, in narrow, horizontal trays packed not with soil but with coconut fibre, grow cherry tomatoes, shiny aubergines and brightly coloured chards."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Pascal Hardy, an engineer and sustainable development consultant, began experimenting with vertical farming and aeroponic growing towers on his Paris apartment block roof five years ago."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The urban rooftop space above the exhibition hall is much bigger: 14,000 square metres, almost exactly the size of a couple of football pitches."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
              {renderText(
                " Already, the team of young urban farmers who tend it have picked 3,000 lettuces and 150 punnets of strawberries in a single day."
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "When the remaining two thirds of the vast open area are in production, 20 staff will harvest up to 1,000 kilograms of around 35 different varieties of fruit and vegetables every day."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Hardy says this method will never feed the whole city, but believes it could eventually supply between 5% and 10% of local consumption if enough unused urban space is developed."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "Perhaps most significantly, the project showcases the work of Hardy’s urban agriculture consultancy, Agripolis, which now receives enquiries from across the world."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Hardy criticises conventional agriculture for its heavy pesticide use, high greenhouse gas emissions and long-distance transport of produce."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>
              {renderText(
                " He also objects to the poor quality of supermarket produce and the fact that most of the price consumers pay goes to wholesalers and transport companies rather than farmers."
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "Produce grown using soil-free methods relies on small quantities of water enriched with organic nutrients, circulated in a closed system."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Because the crops are produced locally, they barely travel at all, allowing farmers to select varieties for flavour rather than durability."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
              {renderText(
                " The method uses 90% less water than conventional intensive farming and does not exhaust soil."
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "Urban farming is not a new phenomenon and is expanding rapidly in cities across the globe, from Shanghai to Detroit."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Aeroponic farming equipment is lightweight, affordable, easy to install and cheap to run, using far less electricity than many alternatives."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "Although produce grown this way often costs more than conventional crops, it is usually cheaper than soil-based organic food."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " There are limits to what can be grown, such as root vegetables and fruit trees, but urban farming is becoming an important part of a changing food system."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>
            </p>
          </div>

          {isModalOpen && (
            <div
              style={{
                top: modalPosition.top,
                left: modalPosition.left,
              }}
              className="fixed bg-white p-3 rounded-lg shadow-lg flex gap-3 z-[9999]"
            >
              <button
                onClick={handleHighlight}
                className="bg-yellow-400 text-black px-3 py-1 rounded-md"
              >
                Highlight
              </button>
              <button
                onClick={handleClearHighlight}
                className="bg-gray-300 px-3 py-1 rounded-md"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
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
                {isModalOpen && (
                  <div
                    style={{
                      top: modalPosition.top + 5,
                      left: modalPosition.left,
                    }}
                    className="absolute bg-white p-3 rounded-lg shadow-lg flex gap-3 z-50"
                  >
                    <button
                      onClick={handleHighlight}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      {renderText("Highlight")}
                    </button>
                    <button
                      onClick={handleClearHighlight}
                      className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                    >
                      {renderText("Clear Highlight")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-3")}
            </h2>

            <h3 className="text-lg  mb-5">
              {renderText("Complete the notes below.")}
              <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("NO MORE THAN TWO WORDS AND/OR A NUMBER")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 1-3 on your answer sheet."
              )}
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              {renderText("Urban farming in Paris")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  {renderText("Vertical tubes are used to grow strawberries,")}
                </span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [1]: e.target.value,
                    }))
                  }
                />
                <span>{renderText("and herbs.")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "There will eventually be a daily harvest of as much as"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [2]: e.target.value,
                    }))
                  }
                />
                <span>{renderText("in weight of fruit and vegetables.")}</span>
              </li>

              <li className="text-lg">
                <span>
                  {renderText(
                    "It may be possible that the farm's produce will account for as much as 10% of the city's"
                  )}
                </span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [3]: e.target.value,
                    }))
                  }
                />
                <span>{renderText("overall.")}</span>
              </li>
            </ul>
          </div>
          <br />
          {/* TABLE SECTION */}
          <div className="mt-5 w-full h-full">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 4-7")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br /> <br /> {renderText("Write ")}
              <span className="font-bold">
                {renderText("ONLY ONE WORD")}
              </span>{" "}
              {renderText("for each answer.")}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
              <thead>
                <tr>
                  <th colSpan="4" className="border  text-lg font-bold p-2">
                    {renderText(
                      "Intensive farming versus aeroponic urban farming"
                    )}
                  </th>
                </tr>
                <tr>
                  <th className="border p-2"></th>
                  <th className="border p-2">{renderText("Growth")}</th>
                  <th className="border p-2">{renderText("Selection")}</th>
                  <th className="border p-2">{renderText("Sale")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border text-lg p-2">
                    {renderText("Intensive farming")}
                  </td>
                  <td className="border text-lg p-2">
                    <span>{renderText("wide range of")}</span>
                    <button
                      onClick={() => toggleButton(4)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[4]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      4
                    </button>
                    <input
                      className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          [4]: e.target.value,
                        }))
                      }
                    />
                    <span>{renderText("used")}</span>
                  </td>
                  <td className="border text-lg  p-2">
                    <span>
                      {renderText(
                        "varieties of fruit and vegetables chosen that can survive long"
                      )}
                    </span>
                    <button
                      onClick={() => toggleButton(5)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[5]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      5
                    </button>
                    <input
                      className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          [5]: e.target.value,
                        }))
                      }
                    />
                    <span>{renderText("used")}</span>
                  </td>
                  <td className="border text-lg p-2">
                    <span></span>
                    <button
                      onClick={() => toggleButton(6)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[6]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      6
                    </button>
                    <input
                      className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          [6]: e.target.value,
                        }))
                      }
                    />
                    <span>
                      {renderText("receive very little of overall income.")}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg p-2">
                    {renderText("Aeroponic urban farming")}
                  </td>
                  <td className="border  text-lg p-2">
                    {renderText("nutrients added to water, which is recycled")}
                  </td>
                  <td className="border  text-lg p-2">
                    <span>{renderText("produce chosen because of its")}</span>
                    <button
                      onClick={() => toggleButton(7)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[7]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      7
                    </button>
                    <input
                      className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          [7]: e.target.value,
                        }))
                      }
                    />
                    <span>{renderText(".")}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 8-13")}
          </h2>{" "}
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}
            <br /> <br />
            {renderText("In boxes 8-13 on your answer sheet, choose")}
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
          <div className="space-y-6 leading-relaxed p-4">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => handleNumberClick(qIndex)}
                    className={`
              w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg transition-all duration-300
              border-2
              ${
                activeNumbers[qIndex]
                  ? "bg-yellow-400 border-yellow-500"
                  : "bg-white border-gray-300 hover:border-yellow-400"
              }
              cursor-pointer
            `}
                  >
                    {qIndex + 8}
                  </div>
                  <h1 className="text-lg">{renderText(q)}</h1>
                </div>

                <ul className="list-none ml-12 flex flex-col gap-3">
                  {options.map((option, oIndex) => (
                    <li
                      key={oIndex}
                      onClick={() => handleOptionClick(qIndex, oIndex)}
                      className="flex items-center gap-2 text-lg cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2 inline-block transition-colors duration-300 ${
                          selectedOptions[qIndex] === oIndex
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-700"
                        }`}
                      ></span>
                      <span
                        className={`transition-colors duration-300 ${
                          selectedOptions[qIndex] === oIndex
                            ? "text-blue-500"
                            : "text-black"
                        }`}
                      >
                        {renderText(option)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
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
                    {renderText("All Answers (1–13)")}
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

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{renderText(userAnswer)}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
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
      <Reading1Pagination2023></Reading1Pagination2023>
    </div>
  );
};

export default Test1Reading2023;
