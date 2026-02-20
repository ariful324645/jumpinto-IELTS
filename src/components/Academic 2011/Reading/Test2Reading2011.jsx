import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import Reading2Pagination2011 from "../Pagination 2011/Reading2Pagination2011";

//  Marks show

const Test2Reading2011 = () => {
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
    "The metal used in the float process had to have specific properties.",
    "Pilkington invested some of his own money in his float plant.",
    "Pilkington's first full-scale plant was an instant commercial success.",
    "The process invented by Pilkington has now been improved.",
    "Computers are better than humans at detecting faults in glass.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 9;
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
    localStorage.setItem("/2020/Test 1/reading", newScore);
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
  1: "Unblemished",
  2: "Slow",
  3: "thickness",
  4: "Non-stop",
  5: "20%",
  6: "glass",
  7: "Efficient",
  8: "14 months",
  9: "TRUE",
  10: "NOT GIVEN",
  11: "FALSE",
  12: "TRUE",
  13: "TRUE",
};


  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 1/reading");
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
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Sheet glass manufacture: the float process")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Glass, which has been made since the time of the Mesopotamians and Egyptians, is little more than a mixture of sand, soda ash and lime.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "When heated to about 1500 degrees Celsius (°C) this becomes a molten mass that hardens when slowly cooled.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                "The first successful method for making clear, flat glass involved spinning.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This method was very effective as the glass had not touched any surfaces between being soft and becoming hard, so it stayed perfectly unblemished, with a 'fire finish'.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                "However, the process took a long time and was labour intensive.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Nevertheless, demand for flat glass was very high and glassmakers across the world were looking for a method of making it continuously.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The first continuous ribbon process involved squeezing molten glass through two hot rollers, similar to an old mangle.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This allowed glass of virtually any thickness to be made non-stop, but the rollers would leave both sides of the glass marked, and these would then need to be ground and polished.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                "This part of the process rubbed away around 20 per cent of the glass, and the machines were very expensive.",
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The float process for making flat glass was invented by Alistair Pilkington.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This process allows the manufacture of clear, tinted and coated glass for buildings, and clear and tinted glass for vehicles.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              {renderText(
                "Pilkington had been experimenting with improving the melting process, and in 1952 he had the idea of using a bed of molten metal to form the flat glass, eliminating altogether the need for rollers within the float bath.",
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The rest of the concept relied on gravity, which guaranteed that the surface of the molten metal was perfectly flat and horizontal.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Consequently, when pouring molten glass onto the molten tin, the underside of the glass would also be perfectly flat.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                "If the glass were kept hot enough, it would flow over the molten tin until the top surface was also flat, horizontal and perfectly parallel to the bottom surface.",
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Pilkington built a pilot plant in 1953 and by 1955 he had convinced his company to build a full-scale plant.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "However, it took 14 months of non-stop production, costing the company £100,000 a month, before the plant produced any usable glass.",
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
                "Float plants today make glass of near optical quality. Several processes - melting, refining, homogenising - take place simultaneously in the 2000 tonnes of molten glass in the furnace.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It adds up to a continuous melting process, lasting as long as 50 hours, that delivers glass smoothly and continuously to the float bath, and from there to a coating zone and finally a heat treatment zone, where stresses formed during cooling are relieved.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The principle of float glass is unchanged since the 1950s. However, the product has changed dramatically, from a single thickness of 6.8 mm to a range from sub-millimetre to 25 mm, from a ribbon frequently marred by inclusions and bubbles to almost optical perfection.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "To ensure the highest quality, inspection takes place at every stage. Occasionally, a bubble is not removed during refining, a sand grain refuses to melt, a tremor in the tin puts ripples into the glass ribbon.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              {renderText(
                "Automated on-line inspection does two things. Firstly, it reveals process faults upstream that can be corrected. Secondly, it enables computers downstream to steer cutters around flaws.",
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Float glass is sold by the square metre, and at the final stage computers translate customer requirements into patterns of cuts designed to minimise waste.",
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
                          "Are you sure you want to clear all answers?",
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
          {/* table */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1-8")}
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
              "Write your answers in boxes 1-8 on your answer sheet.",
            )}
          </h1>
          <br />
          {/* image */}
          <div className="flex items-center justify-center">
            <img
              className="w-auto h-auto"
              src="https://i.ibb.co.com/tpqyTR45/a8t2r1.jpg"
              alt="Eikhane image bosabo"
            />
          </div>
          <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
            <tbody>
              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Method")}
                </td>
                <td className="border text-lg p-2">
                  {renderText("Advantages")}
                </td>
                <td className="border text-lg p-2">
                  {renderText("Disadvantage")}
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Glass remained")}
                </td>
                <td className="border text-lg p-2">
                  <span>{renderText("Perfectly")}</span>
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
                    value={userAnswers[1] || ""}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                </td>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
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
                    value={userAnswers[2] || ""}
                    onChange={(e) => handleInputChange(2, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Ribbon")}
                </td>
                <td className="border text-lg p-2">
                  <span>
                    {renderText("Could produce glass sheets of varying ")}
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
                    value={userAnswers[3] || ""}
                    onChange={(e) => handleInputChange(3, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                </td>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
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
                    value={userAnswers[4] || ""}
                    onChange={(e) => handleInputChange(4, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  process.
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Glass was")}
                </td>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
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
                    value={userAnswers[5] || ""}
                    onChange={(e) => handleInputChange(5, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  of glass rubbed away
                </td>
                <td className="border text-lg p-2">
                  {renderText("Machines were expensive")}
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Pilkington's float process")}
                </td>
                <td className="border text-lg p-2">
                  <span>
                    {renderText("Allows manufacture of flat, clear and tinted")}
                  </span>
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
                    value={userAnswers[6] || ""}
                    onChange={(e) => handleInputChange(6, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                </td>
                <td className="border text-lg p-2">
                  <span>{renderText("Continuous and ")}</span>
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
                    value={userAnswers[7] || ""}
                    onChange={(e) => handleInputChange(7, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
             
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Pilot and commercial plants")}
                </td>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
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
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
               for pilot, full-scale after 1955
                </td>
                <td className="border text-lg p-2">
                  {renderText("Non-stop production, expensive start-up")}
                </td>
              </tr>
            </tbody>
          </table>
          {/* 1nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 9-13")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?",
            )}{" "}
            <br /> <br />
            {renderText("In boxes 9-13 on your answer sheet, choose")}
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
            <h2 className="text-lg font-bold">Questions 5-7</h2>
            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 9;
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
                    All Answers (27-40)
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
   <Reading2Pagination2011></Reading2Pagination2011>
    </div>
  );
};

export default Test2Reading2011;
