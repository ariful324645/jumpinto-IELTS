import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

//  Marks show

const Test3Reading2018 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const questions = [
    "Coconut seeds need shade in order to germinate.",
    "Coconuts were probably transported to Asia from America in the 16th century.",
    "Coconuts found on the west coast of America were a different type from those found on the east coast.",
    "All the coconuts found in Asia are cultivated varieties.",
    "Coconuts are cultivated in different ways in America and the Pacific.",
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
    localStorage.setItem("/2018/Test 3/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

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
  1: "timber", // Trunk: Timber for houses and the making of
  2: "brushes", // Leaves: Used to make brushes
  3: "sugar", // Flowers: Sap boiled to produce sugar
  4: "ropes", // Fruits (middle layer / coir fibres): Used for ropes
  5: "charcoal", // Fruits (inner layer / shell): A source of charcoal
  5.5: "bowls", // Fruits (inner layer, when halved): Used for bowls
  6: "hormones", // Coconut water: A source of hormones for other plants
  7: "copra", // Coconut flesh: Used for cooking oil and milk
  7.5: "glycerine", // Coconut flesh: Glycerine (for dynamite)
  9: "NOT GIVEN", // Coconut seeds need shade
  10: "FALSE", // Coconuts transported from Asia to America, not vice versa
  11: "NOT GIVEN", // West vs East coast coconuts type
  12: "TRUE", // All coconuts in Asia are cultivated
  13: "NOT GIVEN", // No info on cultivation methods in America vs Pacific
};



  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 3/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 3/reading");
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
              {renderText("The coconut palm")}
            </h1>

            <p className="text-lg">
              {renderText(
                "For millennia, the coconut has been central to the lives of Polynesian and Asian peoples. In the western world, on the other hand, coconuts have always been exotic and unusual, sometimes rare."
              )}
              {renderText(
                " The Italian merchant traveller Marco Polo apparently saw coconuts in South Asia in the late 13th century, and among the mid-14th-century travel writings of Sir John Mandeville there is mention of 'great Notes of Ynde' (great Nuts of India)."
              )}
              {renderText(
                " Today, images of palm-fringed tropical beaches are cliches in the west to sell holidays, chocolate bars, fizzy drinks and even romance."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Typically, we envisage coconuts as brown cannonballs that, when opened, provide sweet white flesh. But we see only part of the fruit and none of the plant from which they come."
              )}
              {renderText(
                " The coconut palm has a smooth, slender, grey trunk, up to 30 metres tall. "
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This is an important source of timber for building houses, and is increasingly being used as a replacement for endangered hardwoods in the furniture construction industry."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                " The trunk is surmounted by a rosette of leaves, each of which may be up to six metres long. The leaves have hard veins in their centres which, in many parts of the world, are used as brushes after the green part of the leaf has been stripped away."
              )}
              {renderText(
                " Immature coconut flowers are tightly clustered together among the leaves at the top of the trunk. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The flower stems may be tapped for their sap to produce a drink, and the sap can also be reduced by boiling to produce a type of sugar used for cooking."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Coconut palms produce as many as seventy fruits per year, weighing more than a kilogram each. The wall of the fruit has three layers: a waterproof outer layer, a fibrous middle layer and a hard, inner layer."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The thick fibrous middle layer produces coconut fibre, 'coir', which has numerous uses and is particularly important in manufacturing ropes."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              {renderText(
                " The woody innermost layer, the shell, with its three prominent 'eyes', surrounds the seed. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " An important product obtained from the shell is charcoal, which is widely used in various industries as well as in the home as a cooking fuel."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
                {renderText(
                  " When broken in half, the shells are also used as bowls in many parts of Asia."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Inside the shell are the nutrients (endosperm) needed by the developing seed.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Initially, the endosperm is a sweetish liquid, coconut water, which is enjoyed as a drink, but also provides the hormones which encourage other plants to grow more rapidly and produce higher yields"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                " As the fruit matures, the coconut water gradually solidifies to form the brilliant white, fat-rich, edible flesh or meat. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Dried coconut flesh, 'copra', is made into coconut oil and coconut milk, which are widely used in cooking in different parts of the world, as well as in cosmetics."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
                {renderText(
                  " A derivative of coconut fat, glycerine, acquired strategic importance in a quite different sphere, as Alfred Nobel introduced the world to his nitroglycerine-based invention: dynamite."
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
                "Their biology would appear to make coconuts the great maritime voyagers and coastal colonizers of the plant world. The large, energy-rich fruits are able to float in water and tolerate salt, but cannot remain viable indefinitely; studies suggest after about 110 days at sea they are no longer able to germinate."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Literally cast onto desert island shores, with little more than sand to grow in and exposed to the full glare of the tropical sun, coconut seeds are able to germinate and root."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              {renderText(
                " The air pocket in the seed, created as the endosperm solidifies, protects the embryo. In addition, the fibrous fruit wall that helped it to float during the voyage stores moisture that can be taken up by the roots of the coconut seedling as it starts to grow."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "There have been centuries of academic debate over the origins of the coconut. There were no coconut palms in West Africa, the Caribbean or the east coast of the Americas before the voyages of the European explorers Vasco da Gama and Columbus in the late 15th and early 16th centuries."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " 16th century trade and human migration patterns reveal that Arab traders and European sailors are likely to have moved coconuts from South and Southeast Asia to Africa and then across the Atlantic to the east coast of America."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              {renderText(
                " But the origin of coconuts discovered along the west coast of America by 16th century sailors has been the subject of centuries of discussion. Two diametrically opposed origins have been proposed: that they came from Asia, or that they were native to America. Both suggestions have problems."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In Asia, there is a large degree of coconut diversity and evidence of millennia of human use - but there are no relatives growing in the wild"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
              {renderText(
                " In America, there are close coconut relatives, but no evidence that coconuts are indigenous.These problems have led to the intriguing suggestion that coconuts originated on coral islands in the Pacific and were dispersed from there."
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
          {" "}
          {/* table */}
          <div className="mb-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-8")}
            </h2>
            <h3 className="text-lg mb-5">
              {renderText("Complete the table below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("ONE WORD ONLY")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>
            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 1-8 on your answer sheet."
              )}
            </h1>
            <br />
          <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
  <tbody>
    <tr>
      <th className="text-xl border p-2 font-bold">Part</th>
      <th className="text-xl border p-2 font-bold">Description</th>
      <th className="text-xl border p-2 font-bold">Uses / Comments</th>
    </tr>

    <tr>
      <td className="border text-lg p-2 w-1/4">{renderText("Trunk")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("Up to 30 metres")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("Timber for houses and the making of")}
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
    </tr>

    <tr>
      <td className="border text-lg p-2 w-1/4">{renderText("Leaves")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("Up to 6 metres long")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("Used to make")}
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
      <td className="border text-lg p-2 w-1/4">{renderText("Flowers")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("At the top of the trunk")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("Stems provide sap, used as a drink or a source of")}
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
    </tr>

    <tr>
      <td className="border text-lg p-2 w-1/4">{renderText("Fruits: Middle layer (coir fibres)")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("Fibrous layer")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("Used for")}
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
      </td>
    </tr>

    <tr>
      <td className="border text-lg p-2 w-1/4">{renderText("Fruits: Inner layer (shell)")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("Hard shell")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("A source of")}
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
        {renderText(" (when halved) for")}
        <input
          value={userAnswers[5 + "b"] || ""}
          onChange={(e) => handleInputChange(5 + "b", e.target.value)}
          className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
          type="text"
        />
      </td>
    </tr>

    <tr>
      <td className="border text-lg p-2 w-1/4">{renderText("Coconut water")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("Inside the shell")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("A drink and a source of")}
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
        {renderText(" for other plants")}
      </td>
    </tr>

    <tr>
      <td className="border text-lg p-2 w-1/4">{renderText("Coconut flesh")}</td>
      <td className="border text-lg p-2 w-1/4">{renderText("Edible white flesh")}</td>
      <td className="border text-lg p-2 text-left">
        {renderText("Used for cooking oil and milk, and")}
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
        {renderText(" glycerine (for dynamite)")}
      </td>
    </tr>
  </tbody>
</table>

          </div>
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Question 9-13")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
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
            <h2 className="text-lg font-bold">Questions 9-13</h2>
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
      {/* <Reading1Pagination2020></Reading1Pagination2020> */}
    </div>
  );
};

export default Test3Reading2018;
