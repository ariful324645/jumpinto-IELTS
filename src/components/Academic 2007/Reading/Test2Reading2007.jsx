import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

//  Marks show

const Test2Reading2007 = () => {
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
    "The ISTP study examined public and private systems in every city of the world.",
    "Efficient cities can improve the quality of life for their inhabitants.",
    "An inner-city tram network is dangerous for car drivers",
    "In Melbourne, people prefer to live in the outer suburbs.",
    "Cities with high levels of bicycle usage can be efficient even when public transport is only averagely good.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 6;
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
    Array(questions.length).fill(null),
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
 const correctAnswers = {
   // Questions 1–5 (Matching Headings)
   1: "ii",
   2: "vii",
   3: "iv",
   4: "i",
   5: "iii",

   // Questions 6–10 (YES / NO / NOT GIVEN)
   6: "NO",
   7: "YES",
   8: "NOT GIVEN",
   9: "NO",
   10: "YES",

   // Questions 11–13 (Matching Cities)
   11: "F",
   12: "D",
   13: "C",
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
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Advantages of Public Transport")}
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg">
              {renderText(
                "A new study conducted for the World Bank by Murdoch University's Institute for Science and Technology Policy (ISTP) has demonstrated that public transport is more efficient than cars. The study compared the proportion of wealth poured into transport by thirty-seven cities around the world.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " This included both the public and private costs of building, maintaining and using a transport system.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 2 */}
            <p className="text-lg">
              {renderText(
                "The study found that the Western Australian city of Perth is a good example of a city with minimal public transport.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " As a result, 17% of its wealth went into transport costs.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>
              {renderText(
                " Some European and Asian cities, on the other hand, spent as little as 5%.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "  Professor Peter Newman, ISTP Director, pointed out that these more efficient cities were able to put the difference into attracting industry and jobs or creating a better place to live.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 3 */}
            <p className="text-lg">
              {renderText(
                "According to Professor Newman, the larger Australian city of Melbourne is a rather unusual city in this sort of comparison. He describes it as two cities: 'A European city surrounded by a car-dependent one'. Melbourne's large tram network has made car use in the inner city much lower, but the outer suburbs have the same car-based structure as most other Australian cities.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " The explosion in demand for accommodation in the inner suburbs of Melbourne suggests a recent change in many people's preferences as to where they live.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 4 */}
            <p className="text-lg">
              {renderText(
                "Newman says this is a new, broader way of considering public transport issues. In the past, the case for public transport has been made on the basis of environmental and social justice considerations rather than economics.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Newman, however, believes the study demonstrates that 'the auto-dependent city model is inefficient and grossly inadequate in economic as well as environmental terms'.",
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 5 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "Bicycle use was not included in the study but Newman noted that the two most 'bicycle friendly' cities considered - Amsterdam and Copenhagen - were very efficient, even though their public transport systems were 'reasonable but not special'.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph 6 */}
            <p className="text-lg">
              {renderText(
                "It is common for supporters of road networks to reject the models of cities with good public transport by arguing that such systems would not work in their particular city. One objection is climate. Some people say their city could not make more use of public transport because it is either too hot or too cold. Newman rejects this, pointing out that public transport has been successful in both Toronto and Singapore and, in fact, he has checked the use of cars against climate and found 'zero correlation'.",
              )}
            </p>

            <br />

            {/* Paragraph 7 */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "When it comes to other physical features, road lobbies are on stronger ground. For example, Newman accepts it would be hard for a city as hilly as Auckland to develop a really good rail network.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>
              {renderText(
                " However, he points out that both Hong Kong and Zurich have managed to make a success of their rail systems, heavy and light respectively, though there are few cities in the world as hilly.",
              )}
            </p>

            <br />

            {/* Section A */}
            <h2 className="text-xl font-bold mt-6">A</h2>
            <p className="text-lg">
              {renderText(
                "In fact, Newman believes the main reason for adopting one sort of transport over another is politics: 'The more democratic the process, the more public transport is favored.' He considers Portland, Oregon, a perfect example of this.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Some years ago, federal money was granted to build a new road. However, local pressure groups forced a referendum over whether to spend the money on light rail instead. The rail proposal won and the railway worked spectacularly well. In the years that have followed, more and more rail systems have been put in, dramatically changing the nature of the city.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1,13")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section B */}
            <h2 className="text-xl font-bold mt-6">B</h2>
            <p className="text-lg">
              {renderText(
                "In the UK, travel times to work had been stable for at least six centuries, with people avoiding situations that required them to spend more than half an hour travelling to work.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " However, public infrastructure did not keep pace with urban sprawl, causing massive congestion problems which now make commuting times far higher.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section C */}
            <h2 className="text-xl font-bold mt-6">C</h2>
            <p className="text-lg">
              {renderText(
                "There is a widespread belief that increasing wealth encourages people to live farther out where cars are the only viable transport.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " The example of European cities refutes that. They are often wealthier than their American counterparts but have not generated the same level of car use.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section D */}
            <h2 className="text-xl font-bold mt-6">D</h2>
            <p className="text-lg">
              {renderText(
                "Newman believes one of the best studies on how cities built for cars might be converted to rail use is The Urban Village report, which used Melbourne as an example.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Instead, the proposal advocated the creation of urban villages at hundreds of sites, mostly around railway stations.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section E */}
            <h2 className="text-xl font-bold mt-6">E</h2>
            <p className="text-lg">
              {renderText(
                "It was once assumed that improvements in telecommunications would lead to more dispersal in the population as people were no longer forced into cities.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " The explanation for this seems to be that it is valuable to place people working in related fields together.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
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
            {/*select optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 1-5")}
              </h1>

              <p>
                {renderText(
                  "Reading Passage 1 has five marked paragraphs, A-E.",
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below.",
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct number, i-viii, in boxes 1-5 on your answer sheet.",
                )}
              </p>

              {/* ---------- List of Headings ---------- */}
              <div className="flex items-center justify-center border border-black py-4 px-6 w-96 mx-auto">
                <div className="text-left">
                  <p className="font-bold text-lg text-center mb-2">
                    {renderText("List of Headings")}
                  </p>
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("i. Avoiding an overcrowded centre")}</li>
                    <li>
                      {renderText("ii. A successful exercise in people power")}
                    </li>
                    <li>
                      {renderText(
                        "iii. The benefits of working together in cities",
                      )}
                    </li>
                    <li>
                      {renderText("iv. Higher incomes need not mean more cars")}
                    </li>
                    <li>
                      {renderText("v. Economic arguments fail to persuade")}
                    </li>
                    <li>
                      {renderText(
                        "vi. The impact of telecommunications on population distribution",
                      )}
                    </li>
                    <li>{renderText("vii. Increases in travelling time")}</li>
                    <li>
                      {renderText(
                        "viii. Responding to arguments against public transport",
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* ---------- Matching Section ---------- */}
              <div className="border-2 border-black rounded-lg p-5 mt-5 space-y-4">
                {/* Question 1 */}
                <div className="flex items-center gap-3">
                  <p className="w-64">{renderText("1  Marked paragraph A")}</p>
                  <div className="relative w-32">
                    <select
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("1")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>{" "}
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Question 2 */}
                <div className="flex items-center gap-3">
                  <p className="w-64">{renderText("2  Marked paragraph B")}</p>
                  <div className="relative w-32">
                    <select
                      value={userAnswers[2] || ""}
                      onChange={(e) => handleInputChange(2, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("2")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>{" "}
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Question 3 */}
                <div className="flex items-center gap-3">
                  <p className="w-64">{renderText("3  Marked paragraph C")}</p>
                  <div className="relative w-32">
                    <select
                      value={userAnswers[3] || ""}
                      onChange={(e) => handleInputChange(3, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("3")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>{" "}
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Question 4 */}
                <div className="flex items-center gap-3">
                  <p className="w-64">{renderText("4  Marked paragraph D")}</p>
                  <div className="relative w-32">
                    <select
                      value={userAnswers[4] || ""}
                      onChange={(e) => handleInputChange(4, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("4")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>{" "}
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Question 5 */}
                <div className="flex items-center gap-3">
                  <p className="w-64">{renderText("5  Marked paragraph E")}</p>
                  <div className="relative w-32">
                    <select
                      value={userAnswers[5] || ""}
                      onChange={(e) => handleInputChange(5, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("5")}</option>
                      <option value="i">i</option>
                      <option value="ii">ii</option>
                      <option value="iii">iii</option>
                      <option value="iv">iv</option>
                      <option value="v">v</option>
                      <option value="vi">vi</option>
                      <option value="vii">vii</option>
                      <option value="viii">viii</option>
                    </select>{" "}
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 6-10")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 6-10 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
              {renderText(
                "if the statement contradicts the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">
                {renderText("NOT GIVEN")}
              </span>{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this",
              )}
            </h3>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 6-10</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 6;
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

          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 11-13")}
            </h1>

            <p>
              {renderText(
                "Look at the following cities (Questions 11-13) and the list of descriptions below.",
              )}
            </p>

            <p>
              {renderText("Match each city with the correct description, A-F.")}
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-F, next to Questions 11-13.",
              )}
            </p>

            {/* ---------- List of Descriptions ---------- */}
            <div className="flex items-center justify-center border border-black py-4 px-6 w-[32rem] mx-auto">
              <div className="text-left">
                <p className="font-bold text-lg text-center mb-2">
                  {renderText("List of Descriptions")}
                </p>
                <ul className="space-y-1 text-lg">
                  <li>
                    {renderText(
                      "A. successfully uses a light rail transport system in hilly environment",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "B. successful public transport system despite cold winters",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "C. profitably moved from road to light rail transport system",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "D. hilly and inappropriate for rail transport system",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "E. heavily dependent on cars despite widespread poverty",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "F. inefficient due to a limited public transport system",
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/* ---------- Matching Section ---------- */}
            <div className="border-2 border-black rounded-lg p-5 mt-5 space-y-4">
              {/* Question 11 */}
              <div className="flex items-center gap-3">
                <p className="w-64">{renderText("11  Perth")}</p>
                <div className="relative w-32">
                  <select
                    value={userAnswers[11] || ""}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("11")}</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              {/* Question 12 */}
              <div className="flex items-center gap-3">
                <p className="w-64">{renderText("12  Auckland")}</p>
                <div className="relative w-32">
                  <select
                    value={userAnswers[12] || ""}
                    onChange={(e) => handleInputChange(12, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("12")}</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              {/* Question 13 */}
              <div className="flex items-center gap-3">
                <p className="w-64">{renderText("13  Portland")}</p>
                <div className="relative w-32">
                  <select
                    value={userAnswers[13] || ""}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("13")}</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
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
      {/* <Reading4Pagination2020></Reading4Pagination2020> */}
    </div>
  );
};

export default Test2Reading2007;
