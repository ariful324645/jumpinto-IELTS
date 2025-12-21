import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";


const Test4Reading2016 = () => {
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
    "Gold was the most valuable material transported along the Silk Road.",
    "Most tradesmen only went along certain sections of the Silk Road.",
    "The Byzantines spread the practice of silk production across the West.",
    "Silk yarn makes up the majority of silk currently exported from China.",
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
    localStorage.setItem("/2018/Test 4/reading", newScore);
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
  1: "tea",
  2: "reel",
  3: "women",
  4: "royalty",
  5: "currency",
  6: "paper",
  7: "gold, silver, wool",
  8: "monks",
  9: "nylon",
  10: "NOT GIVEN",
  11: "TRUE",
  12: "TRUE",
  13: "TRUE",
};


  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 4/reading");
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
    const savedScore = localStorage.getItem("/2018/Test 4/reading");
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
          <div className="overflow-x-auto p-5 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("The Story of Silk")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <p className="text-lg">
              {renderText(
                "Silk is a fine, smooth material produced from the cocoons - soft protective shells - that are made by mulberry silkworms (insect larvae)."
              )}
              {renderText(
                "Legend has it that it was Lei Tzu, wife of the Yellow Emperor, ruler of China in about 3000 BC, who discovered silkworms. One account goes that as she was taking a walk in her husband's gardens, she discovered that silkworms were responsible for the destruction of several mulberry trees. She collected a number of cocoons and sat down to have a rest."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " It just so happened that while she was sipping some tea, one of the cocoons landed in the hot tea and started to unravel into a fine thread."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                "Lei Tzu found that she could wind this thread around her fingers. Subsequently, she persuaded her husband to allow her to rear silkworms on a grove of mulberry trees. She also devised a special reel to draw the fibres from the cocoon into a single thread so that they would be strong enough to be woven into fabric."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " She also devised a special reel to draw the fibres from the cocoon into a single thread so that they would be strong enough to be woven into fabric."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                "While it is unknown just how much of this is true, it is certainly known that silk cultivation has existed in China for several millennia."
              )}
            </p>

            <br />

            {/* ---------- Section 2 ---------- */}
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Originally, silkworm farming was solely restricted to women, and it was they who were responsible for the growing, harvesting, and weaving."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
                {renderText(
                  "Silk quickly grew into a symbol of status, and originally, only royalty were entitled to have clothes made of silk."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                "The rules were gradually relaxed over the years until finally during the Qing Dynasty (1644-1911 AD), even peasants, the lowest caste, were also entitled to wear silk. Sometime during the Han Dynasty (206 BC - 220 AD), silk was so prized that it was also used as a unit of currency. Government officials were paid their salary in silk, and farmers paid their taxes in grain and silk. Silk was also used as diplomatic gifts by the emperor."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Sometime during the Han Dynasty (206 BC - 220 AD), silk was so prized that it was also used as a unit of currency. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Government officials were paid their salary in silk, and farmers paid their taxes in grain and silk. Silk was also used as diplomatic gifts by the emperor.Fishing lines, bowstrings, musical instruments and paper were all made using silk."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " The earliest indication of silk paper being used was discovered in the tomb of a noble who is estimated to have died around 168 AD. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>{" "}
            </p>

            <br />

            {/* ---------- Section 3 ---------- */}
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Demand for this exotic fabric eventually created the lucrative trade route now known as the Silk Road, taking silk westward and bringing gold, silver, and wool to the East."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
                {renderText(
                  "It was named the Silk Road after its most precious commodity, considered to be worth more than gold. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The Silk Road stretched over 6,000 kilometres from Eastern China to the Mediterranean Sea, following the Great Wall of China, climbing the Pamir mountain range, crossing modern-day Afghanistan and going on to the Middle East, with a major trading market in Damascus. From there, the merchandise was shipped across the Mediterranean Sea. "
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Few merchants travelled the entire route; goods were handled mostly by a series of middlemen."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "With the mulberry silkworm being native to China, the country was the world's sole producer of silk for many hundreds of years. The secret of silk-making eventually reached the rest of the world via the Byzantine Empire, which ruled over the Mediterranean region of southern Europe, North Africa and the Middle East during the period 330-1453 AD."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "According to another legend, monks working for the Byzantine emperor Justinian smuggled silkworm eggs to Constantinople (Istanbul in modern-day Turkey) in 550 AD, concealed inside hollow bamboo walking canes. "
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
                "The Byzantines were as secretive as the Chinese, however, and for many centuries the weaving and trading of silk fabric was a strict imperial monopoly.Then in the seventh century, the Arabs conquered Persia, capturing their magnificent silks in the process. Silk production spread through Africa, Sicily and Spain. Andalusia in southern Spain was Europe's main silk-producing centre in the tenth century. By the thirteenth century, Italy became Europe's leader in silk production and export. Venetian merchants traded extensively in silk and encouraged silk growers to settle in Italy. Even now, silk processed in the province of Como in northern Italy enjoys an esteemed reputation."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "The Byzantines were as secretive as the Chinese, however, and for many centuries the weaving and trading of silk fabric was a strict imperial monopoly.Then in the seventh century, the Arabs conquered Persia, capturing their magnificent silks in the process. Silk production spread through Africa, Sicily and Spain. Andalusia in southern Spain was Europe's main silk-producing centre in the tenth century. By the thirteenth century, Italy became Europe's leader in silk production and export. Venetian merchants traded extensively in silk and encouraged silk growers to settle in Italy. Even now, silk processed in the province of Como in northern Italy enjoys an esteemed reputation."
                )}
                {renderText(
                  "Industrialisation and cheaper Japanese silk, trade facilitated by the Suez Canal in the 19th century, contributed to the decline of the European silk industry."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Then in the twentieth century, new manmade fibres, such as nylon, started to be used in what had traditionally been silk products, such as stockings and parachutes. The two world wars, which interrupted the supply of raw material from Japan, also stifled the European silk industry."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>{" "}
              {renderText(
                "After the Second World War, Japan's silk production was restored with improved production and quality of raw silk. Japan remained the world's biggest producer and exporter of raw silk until the 1970s. In recent decades, China has gradually recaptured its position as the world's biggest producer and exporter of raw silk and silk yarn. Today, around 125,000 metric tons of silk are produced in the world, and almost two thirds of that production takes place in China."
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
                {renderText("The Story of Silk")}
              </h1>

              <ul className="list-disc list-inside space-y-3">
                <h1 className="text-lg font-bold">
                  Early Silk Production in China
                </h1>

                <li className="text-lg">
                  {renderText(
                    "Around 3000 BC, according to legend: a silkworm cocoon fell into"
                  )}
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
                  {renderText("the emperor's wife's tea.")}
                </li>

                <li className="text-lg">
                  {renderText("The emperor's wife invented a")}
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
                  {renderText("to pull out silk fibres.")}
                </li>

                <li className="text-lg">
                  {renderText("Only")}
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
                  {renderText("were allowed to produce silk.")}
                </li>

                <li className="text-lg">
                  {renderText("Only")}
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
                  {renderText("were allowed to wear silk.")}
                </li>

                <li className="text-lg">
                  {renderText("Silk used as a form of")}
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
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("e.g. farmers' taxes consisted partly of silk.")}
                </li>

                <li className="text-lg">
                  {renderText(
                    "Silk used for many purposes, e.g. evidence found of"
                  )}
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
                  {renderText("made from silk around 168 AD.")}
                </li>

                <li className="text-lg">
                  {renderText(
                    "Merchants use Silk Road to take silk westward and bring back"
                  )}
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
                  {renderText("and precious metals.")}
                </li>

                <li className="text-lg">
                  {renderText("550 AD:")}
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
                  {renderText(
                    "hide silkworm eggs in canes and take them to Constantinople."
                  )}
                </li>

                <li className="text-lg">
                  {renderText("20th century:")}
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
                  {renderText(
                    "and other manmade fibres cause decline in silk production."
                  )}
                </li>
              </ul>
            </div>

            <div>
              {" "}
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
                <span className="text-lg font-bold">
                  {renderText("NOT GIVEN")}
                </span>{" "}
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
            </div>
          </div>
          {/* 2nd step */}

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

    </div>
  );
};

export default Test4Reading2016;
