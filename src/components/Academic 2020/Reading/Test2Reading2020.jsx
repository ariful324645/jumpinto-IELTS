import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

import { IoBookSharp } from "react-icons/io5";

const Test2Reading2020 = () => {
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
    1: "B",
    2: "C",
    3: "F",
    4: "D",
    5: "E",
    6: "A",
    7: "safety",
    8: "traffic",
    9: "carriageway",
    10: "mobile",
    11: "dangerous",
    12: "communities",
    13: "healthy",
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

          <h1 className="text-2xl font-bold text-center">
            {renderText("Could urban engineers learn from dance?")}
          </h1>

          {/* Section A */}
          <h1 className="text-lg font-bold">{renderText("A")}</h1>
          <p className="text-lg">
            {renderText(
              "The way we travel around cities has a major impact on whether they are sustainable. Transportation is estimated to account for 30% of energy consumption in most of the world's most developed nations, so lowering the need for energy-using vehicles is essential for decreasing the environmental impact of mobility. But as more and more people move to cities, it is important to think about other kinds of sustainable travel too."
            )}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "The ways we travel affect our physical and mental health, our social lives, our access to work and culture, and the air we breathe."
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("6")}
                </span>
              )}
            </span>
            {renderText(`Engineers are tasked with changing how we travel round cities
through urban design, but the engineering industry still works on
the assumptions that led to the creation of the energy-consuming
transport systems we have now: the emphasis placed solely on
efficiency, speed, and quantitative data. We need radical changes,
to make it healthier, more enjoyable, and less environmentally
damaging to travel around cities.`)}
          </p>

          {/* Section B */}
          <h1 className="text-lg font-bold">{renderText("B")}</h1>
          <p className="text-lg">
            {renderText("Dance might hold some of the answers .")}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(`  That is not to suggest everyone should dance their way to work,
              however healthy and happy it might make us, but rather that the
              techniques used by choreographers to experiment with and design
              movement in dance could provide engineers with tools to stimulate
              new ideas in city-making`)}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("1")}
                </span>
              )}
            </span>
            {renderText(`    Richard Sennett, an influential urbanist and sociologist who has
            transformed ideas about the way cities are made, argues that urban
            design has suffered from a separation between mind and body since
            the introduction of the architectural blueprint.`)}
          </p>

          {/* Section C */}
          <h1 className="text-lg font-bold">{renderText("C")}</h1>
          <p className="text-lg">
            {renderText("")}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "Whereas medieval builders improvised and adapted construction through their intimate knowledge of materials and personal experience of the conditions on a site, building designs are now conceived and stored in media technologies that detach the designer from the physical and social realities they are creating."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("2")}
                </span>
              )}
            </span>
            {renderText(` While the design practices created by these new technologies are
            essential for managing the technical complexity of the modern city,
            they have the drawback of simplifying reality in the process.`)}
          </p>

          {/* Section D */}
          <h1 className="text-lg font-bold">{renderText("D")}</h1>
          <p className="text-lg">
            {renderText(
              "To illustrate, Sennett discusses the Peachtree Center in Atlanta, USA, a development typical of the modernist approach to urban planning prevalent in the 1970s. Peachtree created a grid of streets and towers intended as a new pedestrian-friendly downtown for Atlanta. According to Sennett, this failed because its designers had invested too much faith in computer-aided design to tell them how it would operate."
            )}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "They failed to take into account that purpose-built street cafes could not operate in the hot sun without the protective awnings common in older buildings, and would need energy-consuming air-conditioning instead, or that its giant car park would feel so unwelcoming that it would put people off getting out of their cars."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("4")}
                </span>
              )}
            </span>
          </p>

          {/* Sections E, F, G follow same pattern */}
          <h1 className="text-lg font-bold">{renderText("E")}</h1>
          <p className="text-lg">
            {renderText(
              "The same is true in transport engineering, which uses models to predict and shape the way people move through the city. Again, these models are necessary, but they are built on specific world views in which certain forms of efficiency and safety are considered and other experiences of the city ignored."
            )}
            {renderText(`     Designs that seem logical in models appear counter-intuitive in the
            actual experience of their users.`)}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "The guard rails that will be familiar to anyone who has attempted to cross a British road, for example, were an engineering solution to pedestrian safety based on models that prioritise the smooth flow of traffic."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("7,8")}
                </span>
              )}
            </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "On wide major roads, they often guide pedestrians to specific crossing points and slow down their progress across the road by using staggered access points to divide the crossing into two - one for each carriageway.."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("9")}
                </span>
              )}
            </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "In doing so they make crossings feel longer, introducing psychological barriers greatly impacting those that are the least mobile, and encouraging others to make dangerous crossings to get around the guard rails"
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("10,11")}
                </span>
              )}
            </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "These barriers don't just make it harder to cross the road: they divide communities and decrease opportunities for healthy transport."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("12,13")}
                </span>
              )}
            </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "As a result, many are now being removed, causing disruption, cost, and waste."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("5")}
                </span>
              )}
            </span>
          </p>

          <h1 className="text-lg font-bold">{renderText("F")}</h1>
          <p className="text-lg">
            {renderText(
              "If their designers had had the tools to think with their bodies - like dancers - and imagine how these barriers would feel, there might have been a better solution. In order to bring about fundamental changes to the ways we use our cities, engineering will need to develop a richer understanding of why people move in certain ways, and how this movement affects them."
            )}
            {renderText(`  Choreography may not seem an obvious choice for tackling this
            problem.`)}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                " Yet it shares with engineering the aim of designing patterns of movement within limitations of space."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("3")}
                </span>
              )}
            </span>
          </p>

          <h1 className="text-lg font-bold">{renderText("G")}</h1>
          <p className="text-lg">
            {renderText(
              "Observing the choreographer Wayne McGregor, cognitive scientist David Kirsh described how he 'thinks with the body'. Kirsh argues that by using the body to simulate outcomes, McGregor is able to imagine solutions that would not be possible using purely abstract thought."
            )}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              {renderText(
                "This kind of physical knowledge is valued in many areas of expertise, but currently has no place in formal engineering design processes."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("5")}
                </span>
              )}
            </span>
          </p>
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
          <div className="space-y-4">
            <h1 className="text-lg font-bold">{renderText("Questions 1-6")}</h1>

            <p>
              {renderText("Reading Passage 1 has five paragraphs,")}
              <span className="font-bold text-lg">{renderText(" A-G")}</span>
            </p>

            <p>
              {renderText("Which section contains the following information?")}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" A-G")}</span>
              {renderText(", in boxes 1-5 on your answer sheet.")}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" NB")}</span>
              {renderText(" You may use any letter more than once.")}
            </p>

            {/* ---------- Question 1 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("1.")}</span>
              <span>
                {renderText(
                  "reference to an appealing way of using dance that the writer is not proposing"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="1">{renderText("1")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("2.")}</span>
              <span>
                {renderText(
                  "an example of a contrast between past and present approaches to building"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="2">{renderText("2")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("3.")}</span>
              <span>
                {renderText(
                  "mention of an objective of both dance and engineering"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="3">{renderText("3")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("4.")}</span>
              {renderText(
                "reference to an unforeseen problem arising from ignoring the climate"
              )}
              <div className="relative w-40">
                <select
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="4">{renderText("4")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("5.")}</span>
              {renderText(
                "why some measures intended to help people are being reversed"
              )}
              <div className="relative w-40">
                <select
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="5">{renderText("5")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 6 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("6.")}</span>
              {renderText(
                "reference to how transport has an impact on human lives"
              )}
              <div className="relative w-40">
                <select
                  value={userAnswers[6] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="6">{renderText("6")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          {/* normal title*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7-13")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("ONE WORD ONLY")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 7-13 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Guard rails")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>
                  {renderText(
                    "Guard rails were introduced on British roads to improve the"
                  )}
                </span>
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
                <span>{renderText(".")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "of pedestrians, while ensuring that the movement of"
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
                <span>{renderText(".")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "is not disrupted. Pedestrians are led to access points, and encouraged to cross one"
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
                <span>{renderText(".")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "at a time. An unintended effect is to create psychological difficulties in crossing the road, particularly for less"
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
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "people. Another result is that some people cross the road in a"
                  )}
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
                <span>{renderText(".")}</span>
              </p>

              <p className="text-lg">
                <span>{renderText("way. The guard rails separate")}</span>
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
                <span>{renderText(".")}</span>
              </p>

              <p className="text-lg">
                <span>
                  {renderText(
                    "and make it more difficult to introduce forms of transport that are"
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
                <span>{renderText(".")}</span>
              </p>
            </ul>
          </div>

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

export default Test2Reading2020;
