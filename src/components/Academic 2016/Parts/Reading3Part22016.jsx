import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading3Pagination2016 from "../Pagination2016/Reading3Pagination2016";

//  Marks show

const Reading3Part22016 = () => {
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
    "Local gulls and migrating arctic terns behave in the same way when offered food.",
    "Experts' definitions of migration tend to vary according to their area of study.",
    "Very few experts agree that the movement of aphids can be considered migration.",
    "Aphids' journeys are affected by changes in the light that they perceive.",
    "Dingle's aim is to distinguish between the migratory behaviours of different species",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const toggleButton = (id) => {
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
      const answerKey = qIndex + 14;
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
   // Questions 14–18: TRUE / FALSE / NOT GIVEN
   14: "NO", // Local gulls and migrating arctic terns behave differently
   15: "YES", // Experts' definitions vary according to study area
   16: "NOT GIVEN", // No information on experts agreeing about aphids
   17: "YES", // Aphids respond to changes in light
   18: "YES", // Dingle compares different species' migratory behaviours

   // Questions 19–22: Complete with letters A–G
   19: "G", // Migratory routes are likely to follow a straight line
   20: "C", // Animals fatten themselves to prepare for migration
   21: "D", // Migration is not repeated daily
   22: "E", // Arctic terns ignore distractions

   // Questions 23–26: Summary completion
   23: "speed", // Pronghorns rely on eyesight and speed to avoid predators
   24: "plains", // Winter home is on the plains
   25: "bottlenecks", // Route contains three bottlenecks
   26: "corridor", // Narrow corridor of land on the route
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
              {renderText("Great Migrations")}
            </h1>

            {/* A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>
            <p className="text-lg">
              {" "}
              {renderText(
                "Animal migration, however it is defined, is far more than just the movement of animals."
              )}
              {renderText(
                "It can loosely be described as travel that takes place at regular intervals - often in an annual cycle - that may involve many members of a species, and is rewarded only after a long journey."
              )}
              {renderText(
                " It suggests inherited instinct. The biologist Hugh Dingle has identified five characteristics that apply, in varying degrees and combinations, to all migrations."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They are prolonged movements that carry animals outside familiar habitats; they tend to be linear, not zigzaggy; they involve special behaviours concerning preparation (such as overfeeding) and arrival; they demand special allocations of energy."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19,20")}
                  </span>
                )}
                {renderText(
                  " And one more: migrating animals maintain an intense attentiveness to the greater mission, which keeps them undistracted by temptations and undeterred by challenges that would turn other animals aside."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>

            {/* B */}
            <h2 className="text-xl font-bold my-4">{renderText("B")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "An arctic tern, on its 20,000 km flight from the extreme south of South America to the Arctic circle, will take no notice of a nice smelly herring offered from a bird-watcher's boat along the way."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14,22")}
                  </span>
                )}
              </span>
              {renderText(
                " While local gulls will dive voraciously for such handouts, the tern flies on."
              )}
              {renderText(
                "Why? The arctic tern resists distraction because it is driven at that moment by an instinctive sense of something we humans find admirable: larger purpose."
              )}
              {renderText(
                " In other words, it is determined to reach its destination. The bird senses that it can eat, rest and mate later. Right now it is totally focused on the journey; its undivided intent is arrival."
              )}
            </p>

            {/* C */}
            <h2 className="text-xl font-bold my-4">{renderText("C")}</h2>
            <p className="text-lg">
              {renderText(
                "Reaching some gravelly coastline in the Arctic, upon which other arctic terns have converged, will serve its larger purpose as shaped by evolution: finding a place, a time, and a set of circumstances in which it can successfully hatch and rear offspring."
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
                {renderText(
                  "But migration is a complex issue, and biologists define it differently, depending in part on what sorts of animals they study. Joel Berger, of the University of Montana, who works on the American pronghorn and other large terrestrial mammals, prefers what he calls a simple, practical definition suited to his beasts: 'movements from a seasonal home area away to another home area and back again.'"
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " Generally the reason for such seasonal back-and-forth movement is to seek resources that aren't available within a single area year-round."
              )}
            </p>

            {/* E */}
            <h2 className="text-xl font-bold my-4">{renderText("E")}</h2>
            <p className="text-lg">
              {renderText(
                "But daily vertical movements by zooplankton in the ocean - upward by night to seek food, downward by day to escape predators - can also be considered migration. So can the movement of aphids when, having depleted the young leaves on one food plant, their offspring then fly onward to a different host plant, with no one aphid ever returning to where it started."
              )}
            </p>

            {/* F */}
            <h2 className="text-xl font-bold my-4">{renderText("F")}</h2>
            <p className="text-lg">
              {renderText(
                "Dingle is an evolutionary biologist who studies insects. His definition is more intricate than Berger's, citing those five features that distinguish migration from other forms of movement."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " They allow for the fact that, for example, aphids will become sensitive to blue light (from the sky) when it's time for takeoff on their big journey, and sensitive to yellow light (reflected from tender young leaves) when it's appropriate to land. "
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              {renderText(
                "Birds will fatten themselves with heavy feeding in advance of a long migrational flight."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " The value of his definition, Dingle argues, is that it focuses attention on what the phenomenon of wildebeest migration shares with the phenomenon of the aphids, and therefore helps guide researchers towards understanding how evolution has produced them all. "
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
            </p>

            {/* G */}
            <h2 className="text-xl font-bold my-4">{renderText("G")}</h2>
            <p className="text-lg">
              {renderText(
                "Human behaviour, however, is having a detrimental impact on animal migration. The pronghorn, which resembles an antelope, though they are unrelated, is the fastest land mammal of the New World."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " One population, which spends the summer in the mountainous Grand Teton National Park of the western USA, follows a narrow route from its summer range in the mountains, across a river, and down onto the plains."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
                {renderText(
                  " Here they wait out the frozen months, feeding mainly on sagebrush blown clear of snow."
                )}
                {renderText(
                  " These pronghorn are notable for the invariance of their migration route and the severity of its constriction at three bottlenecks."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>

              {renderText(
                " If they can't pass through each of the three during their spring migration, they can't reach their bounty of summer grazing; if they can't pass through again in autumn, escaping south onto those windblown plains, they are likely to die trying to overwinter in the deep snow."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Pronghorn, dependent on distance vision and speed to keep safe from predators, traverse high, open shoulders of land, where they can see and run."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
                {renderText(
                  " At one of the bottlenecks, forested hills rise to form a V, leaving a corridor of open ground only about 150 metres wide, filled with private homes."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>

              {renderText(
                " Increasing development is leading toward a crisis for the pronghorn, threatening to choke off their passageway."
              )}
            </p>

            {/* H */}
            <h2 className="text-xl font-bold my-4">{renderText("H")}</h2>
            <p className="text-lg">
              {renderText(
                "Conservation scientists, along with some biologists and land managers within the USA's National Park Service and other agencies, are now working to preserve migrational behaviours, not just species and habitats."
              )}
              {renderText(
                " A National Forest has recognised the path of the pronghorn, much of which passes across its land, as a protected migration corridor."
              )}
              {renderText(
                " But neither the Forest Service nor the Park Service can control what happens on private land at a bottleneck."
              )}
              {renderText(
                " And with certain other migrating species, the challenge is complicated further - by vastly greater distances traversed, more jurisdictions, more borders, more dangers along the way."
              )}
              {renderText(
                " We will require wisdom and resoluteness to ensure that migrating species can continue their journeying a while longer."
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
            {" "}
            {/* 2nd step */}
            <div className="mt-5">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 14-18")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 3?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 14-18 on your answer sheet, choose")}
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
                <h2 className="text-lg font-bold">Questions 14-18</h2>
                {questions.map((q, qIndex) => {
                  const answerKey = qIndex + 14;
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
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 19-22")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions 19-22) and the list of dates below."
                )}
              </p>

              <p>
                {renderText("Match each statement with the correct date, A-G.")}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-G, next to Questions 19-22."
                )}
              </p>

              {/* ---------- List of Dates ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 w-80">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Behaviours")}
                  </h2>

                  <div className="flex items-center justify-center">
                    <ul className="space-y-1 text-lg">
                      <li>
                        {renderText("A. be discouraged by difficulties.")}
                      </li>
                      <li>
                        {renderText(
                          "B. travel on open land where they can look out for predators."
                        )}
                      </li>
                      <li>
                        {renderText(
                          "C. eat more than they need for immediate purposes."
                        )}
                      </li>
                      <li>{renderText("D. be repeated daily.")}</li>
                      <li>{renderText("E. ignore distractions.")}</li>
                      <li>
                        {renderText(
                          "F. be governed by the availability of water."
                        )}
                      </li>
                      <li>{renderText("G. follow a straight line.")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ---------- Questions ---------- */}
              <div className="space-y-4 mt-4">
                {/* Question 19 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("19")}</span>
                  <span>
                    {renderText(
                      "According to Dingle, migratory routes are likely to"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[19] || ""}
                      onChange={(e) => handleInputChange(19, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("19")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* Question 20 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("20")}</span>
                  <span>
                    {renderText(
                      "To prepare for migration, animals are likely to"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[20] || ""}
                      onChange={(e) => handleInputChange(20, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("20")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* Question 21 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("21")}</span>
                  <span>
                    {renderText("During migration, animals are unlikely to")}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[21] || ""}
                      onChange={(e) => handleInputChange(21, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("21")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* Question 22 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("22")}</span>
                  <span>
                    {renderText(
                      "Arctic terns illustrate migrating animals' ability to"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[22] || ""}
                      onChange={(e) => handleInputChange(22, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("22")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>
              </div>
            </div>
          </div>
          <br />

          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 23-26")}
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
                "Write your answers in boxes 23-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 mt-5 border-black bg-white rounded-lg">
            <ul className="space-y-4">
              {/* Question 23 */}
              <p className="text-lg">
                {renderText("Pronghorns rely on their eyesight and")}

                <button
                  onClick={() => toggleButton(23)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[23]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  23
                </button>

                <input
                  value={userAnswers[23] || ""}
                  onChange={(e) => handleInputChange(23, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </p>

              {/* Question 24 */}
              <p className="text-lg">
                {renderText(
                  "One particular population's summer habitat is a national park, and their winter home is on the"
                )}

                <button
                  onClick={() => toggleButton(24)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[24]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  24
                </button>

                <input
                  value={userAnswers[24] || ""}
                  onChange={(e) => handleInputChange(24, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </p>

              {/* Question 25 */}
              <p className="text-lg">
                {renderText(
                  "However, their route between these two areas contains three"
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
              </p>

              {/* Question 26 */}
              <p className="text-lg">
                {renderText(
                  "One problem is the construction of new homes in a narrow"
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

      <Reading3Pagination2016></Reading3Pagination2016>
    </div>
  );
};

export default Reading3Part22016;
