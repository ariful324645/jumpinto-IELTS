import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading2Pagination2011 from "../Pagination 2011/Reading2Pagination2011";

//  Marks show

const Reading2Part22011 = () => {
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


  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    localStorage.setItem("/reading4Part32020", newScore);
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
const correctAnswers = {
  // Questions 14-17 (Heading Matching)
  14: "ii",
  15: "vii",
  16: "ix",
  17: "iv",

  // Questions 18-22 (Summary Completion)
  18: "C",
  19: "B",
  20: "A",
  21: "H",
  22: "G",

  // Questions 23-26 (Classification)
  23: "C",
  24: "C",
  25: "A",
  26: "B",
};

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
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
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 2")}</h1>
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
                {renderText("          Questions 14-26")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 2 below")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold text-center mt-10">
              {renderText("THE LITTLE ICE AGE")}
            </h1>
            {/* Paragraph A */}
            <h1 className="text-xl font-bold">{renderText("A")}</h1>
            <p className="text-lg mt-5">
              {renderText(
                "This book will provide a detailed examination of the Little Ice Age and other climatic shifts, but, before I embark on that, let me provide a historical context. We tend to think of climate as something unchanging, yet humanity has been at the mercy of climate change for its entire existence, with at least eight glacial episodes in the past 730,000 years. Our ancestors adapted to global warming since the end of the last great Ice Age around 10,000 years ago. They developed agriculture and founded the world's first civilisations, but the price of sudden climate change in famine, disease and suffering was often high.",
              )}
            </p>
            {/* Paragraph B */}
            <h1 className="text-xl font-bold">{renderText("B")}</h1>
            <p className="text-lg mt-5">
              {" "}
              {renderText(
                "The Little Ice Age lasted from roughly 1300 until the middle of the nineteenth century.Only two centuries ago, Europe experienced a cycle of bitterly cold winters; mountain glaciers in the Swiss Alps were the lowest in recorded memory, and pack ice surrounded Iceland for much of the year.",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "The climatic events of the Little Ice Age did more than help shape the modern world.They are the deeply important context for the current unprecedented global warming.The Little Ice Age was far from a deep freeze, however; rather an irregular seesaw of rapid climatic shifts, few lasting more than a quarter-century, driven by complex and still little understood interactions between the atmosphere and the ocean.The seesaw brought cycles of intensely cold winters and easterly winds, then switched abruptly to years of heavy spring and early summer rains, mild winters, and frequent Atlantic storms, or to periods of droughts, light northeasterly winds, and summer heat waves.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-28 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("14,20,21,22")}
                </span>
              )}
            </p>
            {/* Paragraph C */}
            <h1 className="text-xl font-bold">{renderText("C")}</h1>
            <p className="text-lg mt-5">
              {renderText(
                "Reconstructing the climate changes of the past is extremely difficult, because systematic weather observations began only a few centuries ago, in Europe and North America.Records from India and tropical Africa are even more recent.",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "For the time before records began, we have only 'proxy records' reconstructed largely from tree rings and ice cores, supplemented by a few incomplete written accounts",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-16 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("18,19")}
                </span>
              )}
              {renderText(
                "We now have hundreds of tree-ring records from throughout the northern hemisphere, and many from south of the equator, too, amplified with a growing body of temperature data from ice cores drilled in Antarctica, Greenland, the Peruvian Andes, and other locations.We are close to a knowledge of annual summer and winter temperature variations over much of the northern hemisphere going back 600 years.",
              )}
            </p>
            {/* Paragraph D */}{" "}
            <h1 className="text-xl font-bold">{renderText("D")}</h1>
            <p className="text-lg mt-5">
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "This book is a narrative history of climatic shifts during the past ten centuries, and some of the ways in which people in Europe adapted to them.15Part One describes the Medieval Warm Period, roughly 900 to 1200.15,25During these three centuries, Norse voyagers from Northern Europe explored northern seas, settled Greenland, and visited North America.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-16 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("15,25")}
                </span>
              )}
              {renderText(
                "It was not a time of uniform warmth, for then, as always since the Great Ice Age, there were constant shifts in rainfall and temperature.Mean European temperatures were about the same as today, perhaps slightly cooler.",
              )}
            </p>
            {/* Paragraph E */}{" "}
            <h1 className="text-xl font-bold">{renderText("E")}</h1>
            <p className="text-lg mt-5">
              {renderText(
                "It is known that the Little Ice Age cooling began in Greenland and the Arctic in about 1200.As the Arctic ice pack spread southward, Norse voyages to the west were rerouted into the open Atlantic, then ended altogether.Storminess increased in the North Atlantic and North Sea.Colder, much wetter weather descended on Europe between 1315 and 1319, when thousands perished in a continent-wide famine.By 1400, the weather had become decidedly more unpredictable and stormier, with sudden shifts and lower temperatures that culminated in the cold decades of the late sixteenth century.Fish were a vital commodity in growing towns and cities, where food supplies were a constant concern.",
              )}
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "Dried cod and herring were already the staples of the European fish trade, but changes in water temperatures forced fishing fleets to work further offshore.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("26")}
                </span>
              )}
              {renderText(
                "The Basques, Dutch, and English developed the first offshore fishing boats adapted to a colder and stormier Atlantic.A gradual agricultural revolution in northern Europe stemmed from concerns over food supplies at a time of rising populations.The revolution involved intensive commercial farming and the growing of animal fodder on land not previously used for crops",
              )}
            </p>
            {/* Paragraph F */}{" "}
            <h1 className="text-xl font-bold">{renderText("F")}</h1>
            <p className="text-lg mt-5">
              <span className={`${highlight ? "bg-yellow-100 p-1" : ""}`}>
                {renderText(
                  "The increased productivity from farmland made some countries self-sufficient in grain and livestock and offered effective protection against famine.Global temperatures began to rise slowly after 1850, with the beginning of the Modern Warm Period.There was a vast migration from Europe by land-hungry farmers and others, to which the famine caused by the Irish potato blight contributed, to North America, Australia, New Zealand, and southern Africa.23Millions of hectares of forest and woodland fell before the newcomers' axes between 1850 and 1890, as intensive European farming methods expanded across the world.24The unprecedented land clearance released vast quantities of carbon dioxide into the atmosphere, triggering for the first time humanly caused global warming",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-24 h-6 bg-yellow-700 text-white rounded-sm">
                  {renderText("17,23,24")}
                </span>
              )}
              {renderText(
                "Temperatures climbed more rapidly in the twentieth century as the use of fossil fuels proliferated and greenhouse gas levels continued to soar.The rise has been even steeper since the early 1980s.The Little Ice Age has given way to a new climatic regime, marked by prolonged and steady warming.At the same time, extreme weather events like Category 5 hurricanes are becoming more frequent.",
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
          <div>
            {/* normal title 1*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 14-17")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Reading Passage 2 has six paragraphs, A-F.")}
                <br />
                <br />
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below.",
                )}
                <br />
                <br />
                {renderText(
                  "Choose the correct number, i-ix, in boxes 14-17 on your answer sheet.",
                )}
              </h3>

              <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
                <div className="text-left">
                  <h1 className="text-xl font-bold mb-5 text-center">
                    {renderText("List of Headings")}
                  </h1>

                  <ul className="space-y-2 text-lg">
                    <li>{renderText("i. Predicting climatic changes")}</li>
                    <li>
                      {renderText(
                        "ii. The relevance of the Little Ice Age today",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iii. How cities contribute to climate change",
                      )}
                    </li>
                    <li>{renderText("iv. Human impact on the climate")}</li>
                    <li>
                      {renderText(
                        "v. How past climatic conditions can be determined",
                      )}
                    </li>
                    <li>
                      {renderText("vi. A growing need for weather records")}
                    </li>
                    <li>
                      {renderText("vii. A study covering a thousand years")}
                    </li>
                    <li>
                      {renderText(
                        "viii. People have always responded to climate change",
                      )}
                    </li>
                    <li>{renderText("ix. Enough food at last")}</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>
          {/* optional question */}
          <div className="space-y-3">
            {/* ---------- Question 14 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("14")}</span>
              <span>{renderText("Paragraph B")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("14")}</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 15 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("15")}</span>
              <span>{renderText("Paragraph D")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("15")}</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 16 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("16")}</span>
              <span>{renderText("Paragraph E")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("16")}</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 17 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("17")}</span>
              <span>{renderText("Paragraph F")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("17")}</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          {/* normal title 2*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 18-22")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Complete the summary using the list of words or phrases below.",
              )}
              <br />
              <br />
              {renderText(
                "Choose the correct letter, A-I, in boxes 18-22 on your answer sheet.",
              )}
            </h3>

            <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
              <div className="text-left">
                <h1 className="text-xl font-bold mb-5 text-center">
                  {renderText("List of Words")}
                </h1>

                <ul className="space-y-2 text-lg">
                  <li>{renderText("A. climatic shifts")}</li>
                  <li>{renderText("B. ice cores")}</li>
                  <li>{renderText("C. tree rings")}</li>
                  <li>{renderText("D. glaciers")}</li>
                  <li>{renderText("E. interactions")}</li>
                  <li>{renderText("F. weather observations")}</li>
                  <li>{renderText("G. heat waves")}</li>
                  <li>{renderText("H. storms")}</li>
                  <li>{renderText("I. written accounts")}</li>
                </ul>
              </div>
            </div>

            <br />
          </div>
          {/* optional question */}
          <div className="space-y-3">
            {/* ---------- Question 18 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("18")}</span>
              <span>
                {renderText(
                  "Weather during the Little Ice Age Documentation of past weather conditions is limited: our main sources of knowledge of conditions in the distant past are",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("18")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 19 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("19")}</span>
              <span>{renderText("and")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("19")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 20 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("20")}</span>
              <span>
                {renderText(
                  "We can deduce that the Little Ice Age was a time of",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[20] || ""}
                  onChange={(e) => handleInputChange(20, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("20")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 21 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("21")}</span>
              <span>
                {renderText(
                  "Within it there were some periods of very cold winters, others of",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[21] || ""}
                  onChange={(e) => handleInputChange(21, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("21")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 22 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("22")}</span>
              <span>
                {renderText("and heavy rain, and yet others that saw")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[22] || ""}
                  onChange={(e) => handleInputChange(22, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("22")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          {/* normal title 3*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23-26")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText(
                "Choose the correct letter, A-C, next to Questions 23-26.",
              )}
              <br />
              <br />
              {renderText(
                "Classify the following events as occurring during the",
              )}
            </h3>

            <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
              <div className="text-left">
                <ul className="space-y-2 text-lg">
                  <li>{renderText("A. Medieval Warm Period")}</li>
                  <li>{renderText("B. Little Ice Age")}</li>
                  <li>{renderText("C. Modern Warm Period")}</li>
                </ul>
              </div>
            </div>

            <br />
          </div>
          {/* optional question */}
          <div className="space-y-3">
            {/* ---------- Question 23 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("23")}</span>
              <span>
                {renderText("Many Europeans started farming abroad.")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[23] || ""}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("23")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 24 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("24")}</span>
              <span>
                {renderText(
                  "The cutting down of trees began to affect the climate.",
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[24] || ""}
                  onChange={(e) => handleInputChange(24, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("24")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 25 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("25")}</span>
              <span>{renderText("Europeans discovered other lands.")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("25")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 26 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("26")}</span>
              <span>
                {renderText("Changes took place in fishing patterns.")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("26")}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14-26)
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

export default Reading2Part22011;
