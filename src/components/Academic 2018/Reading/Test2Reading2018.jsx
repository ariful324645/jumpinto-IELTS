import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

const Test2Reading2018 = () => {
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
    "The Portuguese had control over the cinnamon trade in Ceylon throughout the 16th century.",
    "The Dutch took over the cinnamon trade from the Portuguese as soon as they arrived in Ceylon.",
    "The trees planted by the Dutch produced larger quantities of cinnamon than the wild trees.",
    "The spice trade maintained its economic importance during the 19th century.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 10;
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
    localStorage.setItem("/2018/Test 2/reading", newScore);
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
  1: "oils",
  2: "friendship",
  3: "funerals",
  4: "wealth",
  5: "indigestion",
  6: "India",
  7: "camels",
  8: "Alexandria",
  9: "Venice",
  10: "TRUE",
  11: "FALSE",
  12: "NOT GIVEN",
  13: "FALSE",
};


  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 2/reading");
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
    const savedScore = localStorage.getItem("/2018/Test 2/reading");
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
              {renderText("  which are based on Reading PASSAGE 1 bellow")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Bringing cinnamon to Europe")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Cinnamon is a sweet, fragrant spice produced from the inner bark of trees of the genus Cinnamomum, which is native to the Indian sub-continent."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It was known in biblical times, and is mentioned in several books of the Bible, both as an ingredient that was mixed with oils for anointing people's bodies, and also as a token indicating friendship among lovers and friends."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1,2
                  </span>
                )}
                {renderText(
                  "In ancient Rome, mourners attending funerals burnt cinnamon to create a pleasant scent."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              {renderText(
                " Most often, however, the spice found its primary use as an additive to food and drink."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In the Middle Ages, Europeans who could afford the spice used it to flavour food, particularly meat, and to impress those around them with their ability to purchase an expensive condiment from the 'exotic' East."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "At a banquet, a host would offer guests a plate with various spices piled upon it as a sign of the wealth at his or her disposal."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
                {renderText(
                  "Cinnamon was also reported to have health benefits, and was thought to cure various ailments, such as indigestion."
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
                "Toward the end of the Middle Ages, the European middle classes began to desire the lifestyle of the elite, including their consumption of spices."
              )}
              {renderText(
                "This led to a growth in demand for cinnamon and other spices."
              )}
              {renderText(
                "At that time, cinnamon was transported by Arab merchants, who closely guarded the secret of the source of the spice from potential rivals.  ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They took it from India, where it was grown, on camels via an overland route to the Mediterranean."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6,7
                  </span>
                )}
                {renderText("Their journey ended when they reached Alexandria")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
                {renderText(
                  "European traders sailed there to purchase their supply of cinnamon, then brought it back to Venice. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              {renderText(
                "The spice then travelled from that great trading city to markets all around Europe. Because the overland trade route allowed for only small quantities of the spice to reach Europe, and because Venice had a virtual monopoly of the trade, the Venetians could set the price of cinnamon exorbitantly high. These prices, coupled with the increasing demand, spurred the search for new routes to Asia by Europeans eager to take part in the spice trade."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Seeking the high profits promised by the cinnamon market, Portuguese traders arrived on the island of Ceylon in the Indian Ocean toward the end of the 15th century."
              )}
              {renderText(
                "Before Europeans arrived on the island, the state had organized the cultivation of cinnamon. People belonging to the ethnic group called the Salagama would peel the bark off young shoots of the cinnamon plant in the rainy season, when the wet bark was more pliable. During the peeling process, they curled the bark into the 'stick' shape still associated with the spice today. The Salagama then gave the finished product to the king as a form of tribute."
              )}
              {renderText(
                "When the Portuguese arrived, they needed to increase production significantly, and so enslaved many other members of the Ceylonese native population, forcing them to work in cinnamon harvesting. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In 1518, the Portuguese built a fort on Ceylon, which enabled them to protect the island, so helping them to develop a monopoly in the cinnamon trade and generate very high profits."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              {renderText(
                " In the late 16th century, for example, they enjoyed a tenfold profit when shipping cinnamon over a journey of eight days from Ceylon to India."
              )}
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "When the Dutch arrived off the coast of southern Asia at the very beginning of the 17th century, they set their sights on displacing the Portuguese as kings of cinnamon."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
              {renderText(
                "The Dutch allied themselves with Kandy, an inland kingdom on Ceylon. In return for payments of elephants and cinnamon, they protected the native king from the Portuguese. By 1640, the Dutch broke the 150-year Portuguese monopoly when they overran and occupied their factories. By 1658, they had permanently expelled the Portuguese from the island, thereby gaining control of the lucrative cinnamon trade."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In order to protect their hold on the market, the Dutch, like the Portuguese before them, treated the native inhabitants harshly."
              )}
              {renderText(
                "Because of the need to boost production and satisfy Europe's ever-increasing appetite for cinnamon, the Dutch began to alter the harvesting practices of the Ceylonese. Over time, the supply of cinnamon trees on the island became nearly exhausted, due to systematic stripping of the bark. Eventually, the Dutch began cultivating their own cinnamon trees to supplement the diminishing number of wild trees available for use."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Then, in 1796, the English arrived on Ceylon, thereby displacing the Dutch from their control of the cinnamon monopoly."
              )}
              {renderText(
                "By the middle of the 19th century, production of cinnamon reached 1,000 tons a year, after a lower grade quality of the spice became acceptable to European tastes. By that time, cinnamon was being grown in other parts of the Indian Ocean region and in the West Indies, Brazil, and Guyana. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Not only was a monopoly of cinnamon becoming impossible, but the spice trade overall was diminishing in economic potential, and was eventually superseded by the rise of trade in coffee, tea, chocolate, and sugar."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
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

            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 1-9")}
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
                  "Write your answers in boxes 1-9 on your answer sheet."
                )}
              </h1>
              <br />
            </div>
            {/* box */}
            <div className="overflow-x-auto border p-5 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                {renderText("The Early History of Cinnamon")}
              </h1>

              {/* ---------- Section 1 ---------- */}
              <ul className="list-disc list-inside space-y-3">
                <h1 className="text-lg font-bold">
                  {renderText("Biblical times")}
                </h1>
                <li className="text-lg">
                  {renderText("Cinnamon was added to")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                </li>
                <li className="text-lg">
                  {renderText("Used to show")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("between people")}
                </li>
              </ul>

              {/* ---------- Section 2 ---------- */}
              <ul className="list-disc list-inside space-y-3">
                <h1 className="text-lg font-bold mt-3">
                  {renderText("Ancient Rome")}
                </h1>
                <li className="text-lg">
                  {renderText("Used for its sweet smell at")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                </li>
              </ul>

              {/* ---------- Section 3 ---------- */}
              <ul className="list-disc list-inside space-y-3">
                <h1 className="text-lg font-bold mt-3">
                  {renderText("Middle Ages")}
                </h1>
                <li className="text-lg">
                  {renderText("Added to food, especially meat")}
                </li>
                <li className="text-lg">
                  {renderText("Was an indication of a person's")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                </li>
                <li className="text-lg">
                  {renderText("Known as a treatment for")}
                </li>
                <li className="text-lg">
                  {renderText("Grown in")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                </li>
                <li className="text-lg">
                  {renderText("Merchants used")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("to bring it to the Mediterranean")}
                </li>
                <li className="text-lg">
                  {renderText("Arrived in the Mediterranean at")}
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
                </li>
                <li className="text-lg">
                  {renderText("Traders took it to")}
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
                  {renderText("and sold it to destinations around Europe")}
                </li>
              </ul>
            </div>
          </div>
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 10-13")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 10-13 on your answer sheet, choose")}
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
            <h2 className="text-lg font-bold">Questions 10-13</h2>
            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 10;
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
      {/* <Reading3Pagination2020></Reading3Pagination2020> */}
    </div>
  );
};

export default Test2Reading2018;
