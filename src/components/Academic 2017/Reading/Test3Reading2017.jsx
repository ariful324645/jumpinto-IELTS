import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

const Test3Reading2017 = () => {
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
  // marks show
 const correctAnswers = {
   1: "v",
   2: "iii",
   3: "viii",
   4: "i",
   5: "iv",
   6: "vi",
   7: "ii",
   8: "pirates",
   9: "food",
   10: "oil",
   11: "settlers",
   12: "species",
   13: "eggs",
 };


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
    localStorage.setItem("/2020/Test 2/reading", newScore);
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 2/reading");
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
          {/* Header */}

          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 1")}</h1>
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

          {/* Highlight modal */}
          {isModalOpen && (
            <div
              style={{ top: modalPosition.top + 5, left: modalPosition.left }}
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

          {/* Intro */}
          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 1-13")}
              </span>
              {renderText(", which are based on Reading Passage 1 below.")}
            </h1>
          </div>

          {/* left text */}

          <div>
            <h1 className="text-2xl font-bold text-center">
              {renderText("Flying tortoises")}
            </h1>
            <h1 className="text-lg font-bold italic my-3 text-center">
              {renderText(
                "An airborne reintroduction programme has helped conservationists take significant steps to protect the endangered Galapágos tortoise."
              )}
            </h1>

            {/* Section A */}
            <h1 className="text-lg font-bold">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "Forests of spiny cacti cover much of the uneven lava plains that separate the interior of the Galapágos island of Isabela from the Pacific Ocean. With its five distinct volcanoes, the island resembles a lunar landscape. Only the thick vegetation at the skirt of the often cloud-covered peak of Sierra Negra offers respite from the barren terrain below. This inhospitable environment is home to the giant Galapágos tortoise."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Some time after the Galapágos's birth, around five million years ago, the islands were colonised by one or more tortoises from mainland South America."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "As these ancestral tortoises settled on the individual islands, the different populations adapted to their unique environments, giving rise to at least 14 different subspecies. Island life agreed with them. In the absence of significant predators, they grew to become the largest and longest-living tortoises on the planet, weighing more than 400 kilograms, occasionally exceeding 1.8 metres in length and living for more than a century."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Before human arrival, the archipelago's tortoises numbered in the hundreds of thousands. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "From the 17th century onwards, pirates took a few on board for food, but the arrival of whaling ships in the 1790s saw this exploitation grow exponentially."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2,8")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Relatively immobile and capable of surviving for months without food or water, the tortoises were taken on board these ships to act as food supplies during long ocean passages."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
                {renderText(
                  "Sometimes, their bodies were processed into high-grade oil."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>

              {renderText(
                "In total, an estimated 200,000 animals were taken from the archipelago before the 20th century. This historical exploitation was then exacerbated when settlers came to the islands. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They hunted the tortoises and destroyed their habitat to clear land for agriculture."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
                {renderText(
                  "They also introduced alien species - ranging from cattle, pigs, goats, rats and dogs to plants and ants - that either prey on the eggs and young tortoises or damage or destroy their habitat."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12,13")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "Today, only 11 of the original subspecies survive and of these, several are highly endangered. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In 1989, work began on a tortoise-breeding centre just outside the town of Puerto Villamil on Isabela, dedicated to protecting the island's tortoise populations."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The centre's captive-breeding programme proved to be extremely successful, and it eventually had to deal with an overpopulation problem."
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText("The problem was also a pressing one. ")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Captive-bred tortoises can't be reintroduced into the wild until they're at least five years old and weigh at least 4.5 kilograms, at which point their size and weight - and their hardened shells - are sufficient to protect them from predators."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "But if people wait too long after that point, the tortoises eventually become too large to transport."
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "For years, repatriation efforts were carried out in small numbers, with the tortoises carried on the backs of men over weeks of long, treacherous hikes along narrow trails. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But in November 2010, the environmentalist and Galapágos National Park liaison officer Godfrey Merlin, a visiting private motor yacht captain and a helicopter pilot gathered around a table in a small cafe in Puerto Ayora on the island of Santa Cruz to work out more ambitious reintroduction."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The aim was to use a helicopter to move 300 of the breeding centre's tortoises to various locations close to Sierra Negra."
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "This unprecedented effort was made possible by the owners of the 67-metre yacht White Cloud, who provided the Galapágos National Park with free use of their helicopter and its experienced pilot, as well as the logistical support of the yacht, its captain and crew."
              )}
              {renderText(
                "Originally an air ambulance, the yacht's helicopter has a rear double door and a large internal space that's well suited for cargo, so a custom crate was designed to hold up to 33 tortoises with a total weight of about 150 kilograms."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "During a period of three days, a group of volunteers from the breeding centre worked around the clock to prepare the young tortoises for transport."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Meanwhile, park wardens, dropped off ahead of time in remote locations, cleared landing sites within the thick brush, cacti and lava rocks."
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "Upon their release, the juvenile tortoises quickly spread out over their ancestral territory, investigating their new surroundings and feeding on the vegetation. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Eventually, one tiny tortoise came across a fully grown giant who had been lumbering around the island for around a hundred years."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
              {renderText(
                "The two stood side by side, a powerful symbol of the regeneration of an ancient species."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
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
                Clear answer
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to clear all answers?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        No, keep them
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Yes, clear them
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* optional question */}
          {/* optional question */}
          <div className="space-y-4 mb-5">
            {/* ---------- Section: Questions 1-7 ---------- */}
            <h1 className="text-lg font-bold">{renderText("Questions 1-7")}</h1>

            <p>{renderText("Reading Passage 1 has seven paragraphs, A-G.")}</p>

            <p>
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below."
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct number, i-viii, in boxes 1-7 on your answer sheet."
              )}
            </p>

            {/* List of Headings */}
            <div className="flex items-center justify-center border border-black py-4 px-4 w-96 mx-auto">
              <div className="text-center">
                <ul className="space-y-1 text-lg">
                  <h1 className="text-2xl font-bold text-center">
                    List of Headings
                  </h1>
                  <li>
                    {renderText(
                      "i. The importance of getting the timing right"
                    )}
                  </li>
                  <li>{renderText("ii. Young meets old")}</li>
                  <li>
                    {renderText(
                      "iii. Developments to the disadvantage of tortoise populations"
                    )}
                  </li>
                  <li>{renderText("iv. Planning a bigger idea")}</li>
                  <li>{renderText("v. Tortoises populate the islands")}</li>
                  <li>
                    {renderText(
                      "vi. Carrying out a carefully prepared operation"
                    )}
                  </li>
                  <li>
                    {renderText(
                      "vii. Looking for a home for the islands' tortoises"
                    )}
                  </li>
                  <li>
                    {renderText("viii. The start of the conservation project")}
                  </li>
                </ul>
              </div>
            </div>

            {/* Questions 1-7 Select Inputs */}
            {[1, 2, 3, 4, 5, 6, 7].map((q) => (
              <p className="flex items-center gap-2 flex-wrap" key={q}>
                <span className="font-bold text-lg">{renderText(`${q}.`)}</span>
                <span>
                  {renderText(`Paragraph ${String.fromCharCode(64 + q)}`)}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText(q.toString())}</option>
                    {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                      (option) => (
                        <option key={option} value={option}>
                          {renderText(option)}
                        </option>
                      )
                    )}
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}
          </div>
          <div className="space-y-5">
            <h1 className="text-lg font-bold">
              {renderText("Questions 8-13")}
            </h1>

            <p>{renderText("Complete the notes below.")}</p>

            <p>
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer."
              )}
            </p>

            <p>
              {renderText(
                "Write your answers in boxes 8-13 on your answer sheet."
              )}
            </p>
          </div>

          {/* box text */}
          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 mt-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("The decline of the Galapágos tortoise")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>
                  {renderText("Originally from mainland South America")}
                </span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "Numbers on Galapágos islands increased, due to lack of predators"
                  )}
                </span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "17th century: small numbers taken onto ships used by"
                  )}
                </span>
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
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "1790s: very large numbers taken onto whaling ships, kept for"
                  )}
                </span>
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

                <span>{renderText(", and also used to produce")}</span>

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
              </p>

              <p className="text-lg">
                <span>{renderText("Hunted by")}</span>
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
                <span>{renderText("on the islands")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "Habitat destruction: for the establishment of agriculture and by various"
                  )}
                </span>
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

                <span>
                  {renderText(
                    "not native to the islands, which also fed on baby tortoises and tortoises'"
                  )}
                </span>

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

export default Test3Reading2017;
