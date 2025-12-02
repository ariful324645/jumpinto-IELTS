import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

//  Marks show

const Test1Reading2018 = () => {
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
    "The website www.newzealand.com aimed to provide ready-made itineraries and packages for travel companies and individual tourists.",
    "It was found that most visitors started searching on the website by geographical location.",
    "According to research, 26% of visitor satisfaction is related to their accommodation.",
    "Visitors to New Zealand like to become involved in the local culture.",
    "Visitors like staying in small hotels in New Zealand rather than in larger ones.",
    "Many visitors feel it is unlikely that they will return to New Zealand after their visit.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 8;
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
    localStorage.setItem("/2018/Test 1/reading", newScore);
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
  1: "update", // Allowed businesses to update information regularly
  2: "environment", // Evaluation included impact on the environment
  3: "captain", // Interview with former sports captain
  4: "films", // Interactive tour of locations used in films
  5: "season", // Driving routes varied depending on the season
  6: "accommodation", // Travel Planner included local accommodation info
  7: "blog", // 'Your Words' allowed travellers to submit a blog
  8: "TRUE", // Website allowed creation of itineraries and packages
  9: "TRUE", // Most visitors searched first by geographical location
  10: "TRUE", // 26% of satisfaction related to transport & accommodation
  11: "TRUE", // Visitors enjoy engaging with local culture
  12: "NOT GIVEN", // No info on preference for small hotels
  13: "NOT GIVEN", // No info on likelihood of returning to New Zealand
};

  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2018/Test 1/reading");
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
              {renderText("Case Study: Tourism New Zealand website")}
            </h1>

            <p className="text-lg">
              {renderText(
                "New Zealand is a small country of four million inhabitants, a long-haul flight from all the major tourist-generating markets of the world. Tourism currently makes up 9% of the country's gross domestic product, and is the country's largest export sector."
              )}
              {renderText(
                "Unlike other export sectors, which make products and then sell them overseas, tourism brings its customers to New Zealand. The product is the country itself - the people, the places and the experiences."
              )}
              {renderText(
                "In 1999, Tourism New Zealand launched a campaign to communicate a new brand position to the world. The campaign focused on New Zealand's scenic beauty, exhilarating outdoor activities and authentic Maori culture, and it made New Zealand one of the strongest national brands in the world."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "A key feature of the campaign was the website www.newzealand.com, which provided potential visitors to New Zealand with a single gateway to everything the destination had to offer."
              )}
              {renderText(
                "The heart of the website was a database of tourism services operators, both those based in New Zealand and those based abroad which offered tourism services to the country. Any tourism-related business could be listed by filling in a simple form. This meant that even the smallest bed and breakfast address or specialist activity provider could gain a web presence with access to an audience of long-haul visitors."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In addition, because participating businesses were able to update the details they gave on a regular basis, the information provided remained accurate."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>{" "}
              {renderText(
                "And to maintain and improve standards, Tourism New Zealand organised a scheme whereby organisations appearing on the website underwent an independent evaluation against a set of agreed national standards of quality. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " As part of this, the effect of each business on the environment was considered."
                )}
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
                "To communicate the New Zealand experience, the site also carried features relating to famous people and places. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " One of the most popular was an interview with former New Zealand All Blacks rugby captain Tana Umaga."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Another feature that attracted a lot of attention was an interactive journey through a number of the locations chosen for blockbuster films which had made use of New Zealand's stunning scenery as a backdrop."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                " As the site developed, additional features were added to help independent travellers devise their own customised itineraries."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  To make it easier to plan motoring holidays, the site catalogued the most popular driving routes in the country, highlighting different routes according to the season and indicating distances and times."
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
                "Later, a Travel Planner feature was added, which allowed visitors to click and 'bookmark' places or attractions they were interested in, and then view the results on a map. The Travel Planner offered suggested routes and public transport options between the chosen locations. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  There were also links to accommodation in the area."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                " By registering with the website, users could save their Travel Plan and return to it later, or print it out to take on the visit. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  The website also had a 'Your Words' section where anyone could submit a blog of their New Zealand travels for possible inclusion on the website."
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
                "The Tourism New Zealand website won two Webby awards for online achievement and innovation. More importantly perhaps, the growth of tourism to New Zealand was impressive. Overall tourism expenditure increased by an average of 6.9% per year between 1999 and 2004. From Britain, visits to New Zealand grew at an average annual rate of 13% between 2002 and 2006, compared to a rate of 4% overall for British visits abroad."
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
                  "The website was set up to allow both individuals and travel organisations to create itineraries and travel packages to suit their own needs and interests."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              {renderText(
                " On the website, visitors can search for activities not solely by geographical location, but also by the particular nature of the activity. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This is important as research shows that activities are the key driver of visitor satisfaction, contributing 74% to visitor satisfaction, while transport and accommodation account for the remaining 26%"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              {renderText(
                " The more activities that visitors undertake, the more satisfied they will be.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " It has also been found that visitors enjoy cultural activities most when they are interactive, such as visiting a marae (meeting ground) to learn about traditional Maori life"
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
                "Many long-haul travellers enjoy such learning experiences, which provide them with stories to take home to their friends and family. In addition, it appears that visitors to New Zealand don't want to be 'one of the crowd' and find activities that involve only a few people more special and meaningful."
              )}
              {renderText(
                " It could be argued that New Zealand is not a typical destination. New Zealand is a small country with a visitor economy composed mainly of small businesses. It is generally perceived as a safe English-speaking country with a reliable transport infrastructure. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Because of the long-haul flight, most visitors stay for longer (average 20 days) and want to see as much of the country as possible on what is often seen as a once-in-a-lifetime visit."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
              {renderText(
                " However, the underlying lessons apply anywhere - the effectiveness of a strong brand, a strategy based on unique experiences and a comprehensive and user-friendly website."
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
              {renderText("Questions 1-7")}
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
                "Write your answers in boxes 1-7 on your answer sheet."
              )}
            </h1>
            <br />
            <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
              <tbody>
                <tr>
                  <th className="text-xl border p-2 font-bold">
                    Section of website
                  </th>
                  <th className="text-xl border p-2 font-bold">Comments</th>
                </tr>

                <tr>
                  <td className="border text-lg p-2 w-1/4">
                    {renderText("Database of tourism services")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    <p>
                      {renderText(
                        "Easy for tourism-related businesses to get on the list"
                      )}
                    </p>
                    <p className="mt-2">
                      {renderText("Allowed businesses to")}
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
                      {renderText(" information regularly")}
                    </p>
                    <p className="mt-2">
                      {renderText(
                        "Provided a country-wide evaluation of businesses, including their impact on the"
                      )}
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
                    </p>
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg p-2 w-1/4">
                    {renderText("Special features on local topics")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    <p>
                      {renderText("e.g. an interview with a former sports")}
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
                    </p>
                    <p className="mt-2">
                      {renderText(
                        "and an interactive tour of various locations used in"
                      )}
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
                    </p>
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg p-2 w-1/4">
                    {renderText("Information on driving routes")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    {renderText("Varied depending on the")}
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
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg p-2 w-1/4">
                    {renderText("Travel Planner")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    {renderText(
                      "Included a map showing selected places, details of public transport and local"
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg p-2 w-1/4">
                    {renderText("'Your Words'")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    {renderText("Travellers could send a link to their")}
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
              </tbody>
            </table>
          </div>
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Question 8-13")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 8-13 on your answer sheet, choose")}
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
            <h2 className="text-lg font-bold">Questions 8-13</h2>
            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 8;
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
      {/* <Reading1Pagination2020></Reading1Pagination2020> */}
    </div>
  );
};

export default Test1Reading2018;
