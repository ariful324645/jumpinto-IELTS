import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading2Pagination2017 from "../Pagination2017/Reading2Pagination2017";

//  Marks show

const Reading2Part22017 = () => {
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
   "Bingham went to South America in search of an Inca city.",
   "Bingham chose a particular route down the Urubamba valley because it was the most common route used by travellers.",
   "Bingham understood the significance of Machu Picchu as soon as he saw it.",
   "Bingham returned to Machu Picchu in order to find evidence to support his theory.",
 ];


  const options = ["YES", "NO", "NOT GIVEN"];

  //   second

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  ); const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 21;
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
    localStorage.setItem("/reading4Part32020", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

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
   // Questions 14–20: Matching Headings
   14: "iv", // Section A – The aim of the trip
   15: "vi", // Section B – A new route
   16: "viii", // Section C – Bingham's lack of enthusiasm
   17: "v", // Section D – A dramatic description
   18: "i", // Section E – Different accounts of the same journey
   19: "vii", // Section F – Bingham publishes his theory
   20: "iii", // Section G – A common belief

   // Questions 21–24: YES / NO / NOT GIVEN
   21: "YES", // Went to South America in search of an Inca city
   22: "NO", // Route was not the most common
   23: "NO", // Did not understand importance immediately
   24: "NOT GIVEN", // No return visit mentioned

   // Questions 25–26: Summary Completion
   25: "rubber", // transportation of rubber
   26: "local farmer", // source of information
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
          <div className="w-full bg-white p-6 rounded-lg shadow-md space-y-5 overflow-y-scroll">
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("The Lost City")}
            </h1>

            <p className="text-center text-lg italic mb-6">
              {renderText(
                "An explorer's encounter with the ruined city of Machu Picchu, the most famous icon of the Inca civilisation"
              )}
            </p>

            {/* A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>
            <p className="text-lg">
              {renderText(
                "When the US explorer and academic Hiram Bingham arrived in South America in 1911, he was ready for what was to be the greatest achievement of his life: the exploration of the remote hinterland to the west of Cusco, the old capital of the Inca empire in the Andes mountains of Peru."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "His goal was to locate the remains of a city called Vitcos, the last capital of the Inca civilisation."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14,21")}
                  </span>
                )}
              </span>
              {renderText(
                " Cusco lies on a high plateau at an elevation of more than 3,000 metres, and Bingham's plan was to descend from this plateau along the valley of the Urubamba river, which takes a circuitous route down to the Amazon and passes through an area of dramatic canyons and mountain ranges."
              )}
            </p>

            {/* B */}
            <h2 className="text-xl font-bold my-4">{renderText("B")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "When Bingham and his team set off down the Urubamba in late July, they had an advantage over travellers who had preceded them a track had recently been blasted down the valley canyon to enable rubber to be brought up by mules from the jungle."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-20 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15,22,25")}
                  </span>
                )}
              </span>
              {renderText(
                " Almost all previous travellers had left the river at Ollantaytambo and taken a high pass across the mountains to rejoin the river lower down, thereby cutting a substantial corner, but also therefore never passing through the area around Machu Picchu."
              )}
            </p>

            {/* C */}
            <h2 className="text-xl font-bold my-4">{renderText("C")}</h2>
            <p className="text-lg">
              {renderText(
                "On 24 July they were a few days into their descent of the valley. The day began slowly, with Bingham trying to arrange sufficient mules for the next stage of the trek."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "His companions showed no interest in accompanying him up the nearby hill to see some ruins that a local farmer, Melchor Arteaga, had told them about the night before."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The morning was dull and damp, and Bingham also seems to have been less than keen on the prospect of climbing the hill."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "In his book Lost City of the Incas, he relates that he made the ascent without having the least expectation that he would find anything at the top."
              )}
            </p>

            {/* D */}
            <h2 className="text-xl font-bold my-4">{renderText("D")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Bingham writes about the approach in vivid style in his book."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                'First, as he climbs up the hill, he describes the ever-present possibility of deadly snakes, "capable of making considerable springs when in pursuit of their prey"; not that he sees any.'
              )}
              {renderText(
                " Then there's a sense of mounting discovery as he comes across great sweeps of terraces, then a mausoleum, followed by monumental staircases and, finally, the grand ceremonial buildings of Machu Picchu."
              )}
              {renderText(
                ' "It seemed like an unbelievable dream... the sight held me spellbound..." he wrote.'
              )}
            </p>

            {/* E */}
            <h2 className="text-xl font-bold my-4">{renderText("E")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "We should remember, however, that Lost City of the Incas is a work of hindsight, not written until 1948, many years after his journey."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "His journal entries of the time reveal a much more gradual appreciation of his achievement."
              )}
              {renderText(
                " He spent the afternoon at the ruins noting down the dimensions of some of the buildings, then descended and rejoined his companions, to whom he seems to have said little about his discovery."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "At this stage, Bingham didn't realise the extent or the importance of the site, nor did he realise what use he could make of the discovery."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
            </p>

            {/* F */}
            <h2 className="text-xl font-bold my-4">{renderText("F")}</h2>
            <p className="text-lg">
              {renderText(
                "However, soon after returning it occurred to him that he could make a name for himself from this discovery."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "When he came to write the National Geographic magazine article that broke the story to the world in April 1913, he knew he had to produce a big idea."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                " He wondered whether it could have been the birthplace of the very first Inca, Manco the Great, and whether it could also have been what chroniclers described as 'the last city of the Incas'. This term refers to Vilcabamba, the settlement where the Incas had fled from Spanish invaders in the 1530s."
              )}
              {renderText(
                " Bingham made desperate attempts to prove this belief for nearly 40 years. Sadly, his vision of the site as both the beginning and end of the Inca civilisation, while a magnificent one, is inaccurate. We now know that Vilcabamba actually lies 65 kilometres away in the depths of the jungle."
              )}
            </p>

            {/* G */}
            <h2 className="text-xl font-bold my-4">{renderText("G")}</h2>
            <p className="text-lg">
              {renderText(
                "One question that has perplexed visitors, historians and archaeologists alike ever since Bingham, is why the site seems to have been abandoned before the Spanish Conquest."
              )}
              {renderText(
                " There are no references to it by any of the Spanish chroniclers - and if they had known of its existence so close to Cusco they would certainly have come in search of gold."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'An idea which has gained wide acceptance over the past few years is that Machu Picchu was a "moya", a country estate built by an Inca emperor to escape the cold winters of Cusco, where the elite could enjoy monumental architecture and spectacular views.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                " Furthermore, the particular architecture of Machu Picchu suggests that it was constructed at the time of the greatest of all the Incas, the emperor Pachacuti (c. 1438–71). By custom, Pachacuti's descendants built other similar estates for their own use, and so Machu Picchu would have been abandoned after his death, some 50 years before the Spanish Conquest."
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
          </div>
          <div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 14-20")}
              </h1>

              <p>{renderText("Reading Passage 3 has six sections, A–G.")}</p>

              <p>
                {renderText(
                  "Choose the correct heading for each section from the list of headings below."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct number, i–viii, in boxes 14-20 on your answer sheet."
                )}
              </p>

              {/* ---------- List of Headings ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 w-96">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Headings")}
                  </h2>

                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText("i. Different accounts of the same journey")}
                    </li>
                    <li>{renderText("ii. Bingham gains support")}</li>
                    <li>{renderText("iii. A common belief")}</li>
                    <li>{renderText("iv. The aim of the trip")}</li>
                    <li>{renderText("v. A dramatic description")}</li>
                    <li>{renderText("vi. A new route")}</li>
                    <li>{renderText("vii. Bingham publishes his theory")}</li>
                    <li>{renderText("viii. Bingham's lack of enthusiasm")}</li>
                  </ul>
                </div>
              </div>

              {/* ---------- Questions ---------- */}
              <div className="space-y-4">
                {/* 27 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("14")}</span>
                  <span>{renderText("Section A")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[14] || ""}
                      onChange={(e) => handleInputChange(14, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="14">{renderText("14")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* 28 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("15")}</span>
                  <span>{renderText("Section B")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[15] || ""}
                      onChange={(e) => handleInputChange(15, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="15">{renderText("15")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 29 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("16")}</span>
                  <span>{renderText("Section C")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[16] || ""}
                      onChange={(e) => handleInputChange(16, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="16">{renderText("16")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 30 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("17")}</span>
                  <span>{renderText("Section D")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[17] || ""}
                      onChange={(e) => handleInputChange(17, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="17">{renderText("17")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 31 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("18")}</span>
                  <span>{renderText("Section E")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[18] || ""}
                      onChange={(e) => handleInputChange(18, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="18">{renderText("18")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 32 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("19")}</span>
                  <span>{renderText("Section F")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[19] || ""}
                      onChange={(e) => handleInputChange(19, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="19">{renderText("19")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("20")}</span>
                  <span>{renderText("Section F")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[20] || ""}
                      onChange={(e) => handleInputChange(20, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="20">{renderText("20")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>
              </div>
            </div>
          </div>
          <br />

          {/* 2nd step */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 21-24")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 3?"
              )}{" "}
              <br /> <br />
              {renderText("In boxes 36-40 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer"
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
              {renderText(
                "if the statement contradicts the claims of the writer"
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">
                {renderText("NOT GIVEN")}
              </span>{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this"
              )}
            </h3>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 21-24</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 21;
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

          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 25-26")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the summary below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("NO MORE THAN TWO WORDS")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 25-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <ul className="space-y-4">
              {/* Question 25 */}
              <p className="text-lg">
                {renderText(
                  "The track that took Bingham down the Urubamba valley had been created for the transportation of"
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
                  value={userAnswers[25] || ""}
                  onChange={(e) => handleInputChange(25, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText(".")}</span>
              </p>

              {/* Question 26 */}
              <p className="text-lg">
                {renderText(
                  "Bingham found out about the ruins of Machu Picchu from a"
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
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText(" in the Urubamba valley.")}</span>
              </p>
            </ul>
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
                    Your Score: {score}/12
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
      <Reading2Pagination2017></Reading2Pagination2017>
    </div>
  );
};

export default Reading2Part22017;
