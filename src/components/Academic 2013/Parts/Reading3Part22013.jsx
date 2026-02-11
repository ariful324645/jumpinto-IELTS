import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2013 from "../Pagination 2013/Reading3Pagination2013";

const Reading3Part22013 = () => {
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [activeButtons, setActiveButtons] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };
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

  const questions = [
    "Urban farming can take place above or below ground.",
    "Some of the equipment used in aeroponic farming can be made by hand.",
    "Urban farming relies more on electricity than some other types of farming.",
    "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
    "Most produce can be grown on an aeroponic urban farm at any time of the year.",
    "Beans take longer to grow on an urban farm than other vegetables.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const correctAnswers = {
    // Questions 14–17 (Dropdown A–F)
    14: "C", // location of first test site (Lynmouth, Devon)
    15: "E", // bringing power back to Britain (Channel Islands cable)
    16: "D", // previous attempt by Britain (wind power abandoned)
    17: "F", // applying technology from another industry (North Sea oil industry)

    // Questions 18–22 (Multi-select A–J, choose FIVE)
    "18-22": ["A", "D", "E", "F", "J"],

    // Questions 23–26 (Input, NO MORE THAN TWO WORDS)
    23: "maintenance",
    24: "slow",
    25: "low pressure",
    26: "cavitation",
  };

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "18-22") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 5; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
  };

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
  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">PASSAGE 1</h1>
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
          <div className="">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Tidal Power")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Undersea turbines which produce electricity from the tides are set to become an important source of renewable energy for Britain. It is still too early to predict the extent of the impact they may have, but all the signs are that they will play a significant role in the future.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "Operating on the same principle as wind turbines, the power in sea turbines comes from tidal currents which turn blades similar to ships propellers, but, unlike wind, the tides are predictable and the power input is constant.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The technology raises the prospect of Britain becoming self-sufficient in renewable energy and drastically reducing its carbon dioxide emissions.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                "If tide, wind and wave power are all developed, Britain would be able to close gas, coal and nuclear plants and export renewable power to other parts of Europe.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Unlike wind power, which Britain originally developed and then abandoned for 20 years allowing the Dutch to make it a major industry, undersea turbines could become a big export earner to island nations such as Japan and New Zealand.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText("21")}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Tidal sites have already been identified that will produce one sixth or more of the UK's power - and at prices competitive with modern gas turbines and undercutting those of the already ailing nuclear industry.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "One site alone, the Pentland Firth, between Orkney and mainland Scotland, could produce 10% of the country's electricity with banks of turbines under the sea, and another at Alderney in the Channel Islands three times the 1,2000 megawatts of Britain's largest and newest nuclear plant, Sizewell B, in Suffolk.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                "Other sites identified include the Bristol Channel and the west coast of Scotland, particularly the channel between Campbelttown and Northern Ireland.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Work on designs for the new turbine blades and sites are well advanced at the University of Southampton's sustainable energy research group.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The first station is expected to be installed off Lynmouth in Devon shortly to test the technology in a venture jointly funded by the Department of Trade and Industry and the European Union.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                "AbuBakr Bahaj, in charge of the Southampton research, said: 'The prospects for energy from tidal currents are far better than from wind because the flows of water are predictable and constant.'",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The technology for dealing with the hostile saline environment under the sea has been developed in the North Sea oil industry and much is already known about turbine blade design, because of wind power and ship propellers.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              {renderText(
                "There are a few technical difficulties, but I believe in the next five to ten years we will be installing commercial marine turbine farms.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Southampton has been awarded £215,000 over three years to develop the turbines and is working with Marine Current Turbines, a subsidiary of IT Power, on the Lynmouth project.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                "EU research has now identified 106 potential sites for tidal power, 80% round the coasts of Britain. The best sites are between islands or around heavily indented coasts where there are strong tidal currents.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "A marine turbine blade needs to be only one third of the size of a wind generator to produce three times as much power. The blades will be about 20 meters in diameter, so around 30 meters of water is required.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Unlike wind power, there are unlikely to be environmental objections. Fish and other creatures are thought unlikely to be at risk from the relatively slow-turning blades.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
              {renderText(
                "Each turbine will be mounted on a tower which will connect to the national power supply grid via underwater cables. The towers will stick out of the water and be lit, to warn shipping, and also be designed to be lifted out of the water for maintenance and to clean seaweed from the blades.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Dr Bahaj has done most work on the Alderney site, where there are powerful currents. The single undersea turbine farm would produce far more power than needed for the Channel Islands and most would be fed into the French Grid and be re-imported into Britain via the cable under the Channel.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "One technical difficulty is cavitation, where low pressure behind a turning blade causes air bubbles. These can cause vibration and damage the blades of the turbines.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Dr Bahaj said: 'We have to test a number of blade types to avoid this happening or at least make sure it does not damage the turbines or reduce performance.'",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
              {renderText(
                "Another slight concern is submerged debris floating into the blades. So far we do not know how much of a problem it might be. We will have to make the turbines robust because the sea is a hostile environment, but all the signs that we can do it are good.",
              )}
            </p>
          </div>

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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–26")}
          </h2>

          <h2 className="mb-3">
            {renderText("Reading Passage 2 has six paragraphs, A–F.")}
          </h2>

          <h2 className="mb-3">
            {renderText("Which paragraph contains the following information?")}
          </h2>

          <h2 className="mb-3">
            {renderText(
              "Choose the correct letter, A–F, in boxes 14–17 on your answer sheet. NB: You may use any letter more than once.",
            )}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            {/* ================= Questions 14–17 (Dropdown A–F) ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 14–17</h2>

              {[
                { num: 14, text: "the location of the first test site" },
                {
                  num: 15,
                  text: "a way of bringing the power produced on one site back into Britain",
                },
                {
                  num: 16,
                  text: "a reference to a previous attempt by Britain to find an alternative source of energy",
                },
                {
                  num: 17,
                  text: "mention of the possibility of applying technology from another industry",
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span>{renderText(text)}</span>

                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 18–22 (Multi-select A–J) ================= */}
            <div>
              <h2 className="font-bold text-xl mt-6">Questions 18–22</h2>

              <p className="mt-2">
                {renderText(
                  "Which FIVE of the following claims about tidal power are made by the writer?",
                )}
              </p>

              {[
                "It is a more reliable source of energy than wind power.",
                "It would replace all other forms of energy in Britain.",
                "Its introduction has come as a result of public pressure.",
                "It would cut down on air pollution.",
                "It could contribute to the closure of many existing power stations in Britain.",
                "It could be a means of increasing national income.",
                "It could face a lot of resistance from other fuel industries.",
                "It could be sold more cheaply than any other type of fuel.",
                "It could compensate for the shortage of inland sites for energy production.",
                "It is best produced in the vicinity of coastlines with particular features.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["18-22"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 5 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("18-22", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 23–26 (Text Input) ================= */}
            <div>
              <h2 className="font-bold text-xl mt-6">Questions 23–26</h2>

              <p className="mt-2">
                {renderText(
                  "Label the diagram below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
                )}
              </p>
              <div className="flex justify-center">
                <img src="https://i.ibb.co.com/xSCPRjkL/turbine.jpg" alt="" />
              </div>
              <div className="border p-4 space-y-4 mt-4">
                {[
                  { num: 23, text: "Whole tower can be raised for" },
                  {
                    num: 24,
                    text: "Sea life not in danger due to the fact that blades are comparatively",
                  },
                  { num: 25, text: "Air bubbles result from the" },
                  { num: 26, text: "behind blades. This is known as" },
                ].map(({ num, text }) => (
                  <div key={num} className="flex items-center gap-3">
                    <p className="font-semibold whitespace-nowrap">
                      {num}. {renderText(text)}
                    </p>
                    <input
                      type="text"
                      className="border-1 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-2 "
                      value={userAnswers[num] || ""}
                      onChange={(e) => handleInputChange(num, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-10">
                {!showResult ? (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setShowResult(true)}
                      className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                    >
                      {renderText("Submit Answers")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                      <h1 className="text-3xl font-bold mb-2">
                        {renderText("Result")}
                      </h1>
                      <p className="text-green-600 text-2xl font-semibold">
                        {renderText("Your Score: ")} {score}/13
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-700 mb-3">
                        {renderText("All Answers (1–13)")}
                      </h3>

                      <ul className="space-y-3">
                        {[14, 15, 16, 17, "18-22", 23, 24, 25].map((num) => {
                          const user = userAnswers[num];
                          const correct = correctAnswers[num];

                          const isCorrect = (() => {
                            if (Array.isArray(correct)) {
                              return (
                                Array.isArray(user) &&
                                user.length === correct.length &&
                                correct.every((val) => user.includes(val))
                              );
                            } else {
                              return (
                                user?.trim().toLowerCase() ===
                                correct?.trim().toLowerCase()
                              );
                            }
                          })();

                          const noAnswer = !user;

                          const userAnswerDisplay = Array.isArray(user)
                            ? user.join(", ")
                            : user?.trim() || "";

                          const correctAnswerDisplay = Array.isArray(correct)
                            ? correct.join(", ")
                            : correct?.trim();

                          return (
                            <li
                              key={num}
                              className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                            >
                              <div className="flex items-center gap-2">
                                {isCorrect ? (
                                  <FaDotCircle className="text-green-600 text-xl font-bold" />
                                ) : (
                                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                    <ImCross className="text-white text-sm font-bold" />
                                  </div>
                                )}
                                <p className="font-bold">Q{num}:</p>
                              </div>

                              <p className="ml-8">
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
                                {noAnswer ? (
                                  <span className="italic">
                                    No answer provided
                                  </span>
                                ) : (
                                  userAnswerDisplay
                                )}
                              </p>

                              <p className="ml-8">
                                <span className="font-semibold text-green-600">
                                  Correct Answer:
                                </span>{" "}
                                {correctAnswerDisplay}
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
      </div>
      <Reading3Pagination2013></Reading3Pagination2013>
    </div>
  );
};

export default Reading3Part22013;
