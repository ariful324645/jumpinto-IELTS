import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2017 from "../Pagination2017/Reading1Pagination2017";

const Reading1Part22017 = () => {
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
    "The number of people buying dolls has grown over the centuries.",
    "Sixteenth century European dolls were normally made of wax and porcelain.",
    "Arranging a stamp collection by the size of the stamps is less common than other methods.",
    "Someone who collects unusual objects may want others to think he or she is also unusual.",
    "Collecting gives a feeling that other hobbies are unlikely to inspire.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 22;
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
    localStorage.setItem("/2017/Test 1/reading", newScore);
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
    // Questions 14–21 (Note completion)
    14: "antiques",
    15: "triumph",
    16: "information",
    17: "contact",
    18: "hunt",
    19: "aimless",
    20: "educational",
    21: "trainspotting",

    // Questions 22–26 (True / False / Not Given)
    22: "NOT GIVEN",
    23: "FALSE",
    24: "NOT GIVEN",
    25: "TRUE",
    26: "TRUE",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/reading");
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
    const savedScore = localStorage.getItem("/2017/Test 1/reading");
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
              {renderText("  which are based on Reading PASSAGE 1 bellow")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("COLLECTING AS A HOBBY")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Collecting must be one of the most varied of human activities, and it's one that many of us psychologists find fascinating."
              )}
              {renderText(
                "Many forms of collecting have been dignified with a technical name: an arctophilist collects teddy bears, a philatelist collects postage stamps, and a deltiologist collects postcards."
              )}
              {renderText(
                "Amassing hundreds or even thousands of postcards, chocolate wrappers or whatever, takes time, energy and money that could surely be put to much more productive use."
              )}
              {renderText(
                "And yet there are millions of collectors around the world. Why do they do it?"
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "There are the people who collect because they want to make money - this could be called an instrumental reason for collecting; that is, collecting as a means to an end."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They'll look for, say, antiques that they can buy cheaply and expect to be able to sell at a profit."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But there may well be a psychological element, too - buying cheap and selling dear can give the collector a sense of triumph."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
              {renderText(
                "And as selling online is so easy, more and more people are joining in."
              )}
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
                  "Many collectors collect to develop their social life, attending meetings of a group of collectors and exchanging information on items."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    16
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
                  "This is a variant on joining a bridge club or a gym, and similarly brings them into contact with like-minded people."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    17
                  </span>
                )}
              </span>{" "}
              {renderText("It can also help people build lasting friendships.")}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Another motive for collecting is the desire to find something special, or a particular example of the collected item, such as a rare early recording by a particular singer."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Some may spend their whole lives in a hunt for this."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    18
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Psychologically, this can give a purpose to a life that otherwise feels aimless."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    19
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
                  "If you think about collecting postage stamps, another potential reason for it - or perhaps a result of collecting - is its educational value."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Stamp collecting opens a window to other countries, and to the plants, animals, or famous people shown on their stamps."
              )}
              {renderText(
                "Similarly, in the 19th century, many collectors amassed fossils, animals and plants from around the globe, providing valuable scientific knowledge."
              )}
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
                  "In the past, a popular form of collecting, particularly among boys and men, was trainspotting."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    21
                  </span>
                )}
              </span>{" "}
              {renderText(
                "This might involve trying to see every locomotive of a particular type and ticking them off as they are seen."
              )}
              {renderText(
                "As a result, many trainspotters become extremely knowledgeable about railway systems."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Collectors of dolls may go beyond enlarging their collection and develop an interest in how dolls are made and the materials used."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These have changed over the centuries from the wood that was standard in 16th century Europe, through the wax and porcelain of later centuries, to the plastics of today's dolls."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    23
                  </span>
                )}
              </span>
              {renderText(
                "Or collectors might be inspired to study how dolls reflect notions of what children like, or ought to like."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Not all collectors are interested in learning from their hobby, though, so what we might call a psychological reason for collecting is the need for a sense of control, perhaps as a way of dealing with insecurity.Stamp collectors, for instance, arrange their stamps in albums, usually very neatly, organising their collection according to certain commonplace principles - perhaps by country in alphabetical order, or grouping stamps by what they depict - people, birds, maps, and so on."
              )}
              {renderText(
                "Stamp collectors, for example, carefully organise their stamps according to strict systems."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Another reason for collecting may be to express individuality."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Someone who decides to collect something as unexpected as dog collars, for instance, may be conveying their belief that they must be interesting themselves."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    25
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <p className="text-lg">
                {renderText(
                  "To outsiders it may seem eccentric, but collecting can be deeply rewarding."
                )}
              </p>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "More than most hobbies, collecting can be totally absorbing and provide a strong sense of fulfilment."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    26
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Of course, all hobbies give pleasure, but the common factor in collecting is usually passion: pleasure is putting it far too mildly."
              )}
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "More than most other hobbies, collecting can be totally engrossing, and can give a strong sense of personal fulfilment."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    26
                  </span>
                )}
              </span>{" "}
              {renderText(
                "To non-collectors it may appear an eccentric, if harmless, way of spending time, but potentially, collecting has a lot going for it."
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
                {renderText("Questions 14-21")}
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
                  "Write your answers in boxes 14-21 on your answer sheet."
                )}
              </h1>
              <br />
            </div>
            {/* box */}
            <div className="overflow-x-auto border p-5 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                {renderText(" Collecting as a Hobby")}
              </h1>

              <ul className="list-disc list-inside space-y-4">
                <li className="text-lg">
                  {renderText("The writer mentions collecting")}
                  <button
                    onClick={() => toggleButton(14)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[14]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    14
                  </button>
                  <input
                    value={userAnswers[14] || ""}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(
                    "as an example of collecting in order to make money."
                  )}
                </li>

                <li className="text-lg">
                  {renderText("Collectors may get a feeling of")}
                  <button
                    onClick={() => toggleButton(15)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[15]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    15
                  </button>
                  <input
                    value={userAnswers[15] || ""}
                    onChange={(e) => handleInputChange(15, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("from buying and selling items.")}
                </li>

                <li className="text-lg">
                  {renderText(
                    "Collectors' clubs provide opportunities to share"
                  )}
                  <button
                    onClick={() => toggleButton(16)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[16]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    16
                  </button>
                  <input
                    value={userAnswers[16] || ""}
                    onChange={(e) => handleInputChange(16, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(".")}
                </li>

                <li className="text-lg">
                  {renderText("Collectors' clubs offer")}
                  <button
                    onClick={() => toggleButton(17)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[17]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    17
                  </button>
                  <input
                    value={userAnswers[17] || ""}
                    onChange={(e) => handleInputChange(17, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("with people who have similar interests.")}
                </li>

                <li className="text-lg">
                  {renderText("Collecting sometimes involves a life-long")}
                  <button
                    onClick={() => toggleButton(18)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[18]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    18
                  </button>
                  <input
                    value={userAnswers[18] || ""}
                    onChange={(e) => handleInputChange(18, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("for a special item.")}
                </li>

                <li className="text-lg">
                  {renderText(
                    "Searching for something particular may prevent people from feeling their life is completely"
                  )}
                  <button
                    onClick={() => toggleButton(19)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[19]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    19
                  </button>
                  <input
                    value={userAnswers[19] || ""}
                    onChange={(e) => handleInputChange(19, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(".")}
                </li>

                <li className="text-lg">
                  {renderText("Stamp collecting may be")}
                  <button
                    onClick={() => toggleButton(20)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[20]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    20
                  </button>
                  <input
                    value={userAnswers[20] || ""}
                    onChange={(e) => handleInputChange(20, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(
                    "because it provides facts about different countries."
                  )}
                </li>

                <li className="text-lg">
                  <button
                    onClick={() => toggleButton(21)}
                    className={`mr-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[21]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    21
                  </button>
                  <input
                    value={userAnswers[21] || ""}
                    onChange={(e) => handleInputChange(21, e.target.value)}
                    className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText("tends to be mostly a male hobby.")}
                </li>
              </ul>
            </div>
            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 22-26")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes  22-26 on your answer sheet, choose")}
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
            </div>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 22-26</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 22;
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
      <Reading1Pagination2017></Reading1Pagination2017>
    </div>
  );
};

export default Reading1Part22017;
