import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading1Pagination2011 from "../Pagination 2011/Reading1Pagination2011";

//  Marks show

const Reading1Part22011 = () => {
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
    "The FAA was created as a result of the introduction of the jet engine.",
    "Air Traffic Control started after the Grand Canyon crash in 1956.",
    "Beacons and flashing lights are still used by ATC today.",
    "Some improvements were made in radio communication during World War II..",
    "Class F airspace is airspace which is below 365m and not near airports.",
    "All aircraft in Class E airspace must use IFR.",
    "A pilot entering Class C airspace is flying over an average-sized city.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 20;
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

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
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
  // Questions 14-19 (Heading Matching)
  14: "ii",
  15: "iii",
  16: "v",
  17: "iv",
  18: "viii",
  19: "vii",

  // Questions 21-27 (True / False / Not Given)
  21: "FALSE",
  22: "FALSE",
  23: "NOT GIVEN",
  24: "TRUE",
  25: "TRUE",
  26: "FALSE",
  27: "TRUE",
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
          <div>
            <h1 className="text-2xl font-bold text-center mt-10">
              {renderText("AIR TRAFFIC CONTROL IN THE USA")}
            </h1>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "An accident that occurred in the skies over the Grand Canyon in 1956 resulted in the establishment of the Federal Aviation Administration (FAA) to regulate and oversee the operation of aircraft in the skies over the United States, which were becoming quite congested. ",
                )}

                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14,20")}
                  </span>
                )}
              </span>
              {renderText(
                "The resulting structure of air traffic control has greatly increased the safety of flight in the United States, and similar air traffic control procedures are also in place over much of the rest of the world.",
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Rudimentary air traffic control existed before the Grand Canyon disaster. ",
                )}
                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " In the 1920s controllers guided aircraft with lights and flags. Radio communication was introduced in the 1930s. The first modern ATC system developed in New York City and later expanded to other major cities.",
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "In the 1940s, ATC centres could and did take advantage of the newly developed radar and improved radio communication brought about by the Second World War, but the system remained rudimentary.It was only after the creation of the FAA that full-scale regulation of America's airspace took place, and this was fortuitous, for the advent of the jet engine suddenly resulted in a large number of very fast planes, reducing pilots' margin of error and practically demanding some set of rules to keep everyone well separated and operating safely in the air.",
                )}
                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15,23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Many people think that ATC consists of a row of controllers sitting in front of their radar screens at the nation's airports, telling arriving and departing traffic what to do.16This is a very incomplete part of the picture.",
                )}
                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                "he FAA realised that the airspace over the United States would at any time have many different kinds of planes, flying for many different purposes, in a variety of weather conditions, and the same kind of structure was needed to accommodate all of them.",
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "To meet this challenge, the following elements were put into effect.First, ATC extends over virtually the entire United States.In general, from 365m above the ground and higher, the entire country is blanketed by controlled airspace.In certain areas, mainly near airports, controlled airspace extends down to 215m above the ground, and, in the immediate vicinity of an airport, all the way down to the surface.Controlled airspace is that airspace in which FAA regulations apply.Elsewhere, in uncontrolled airspace, pilots are bound by fewer regulations.In this way, the recreational pilot who simply wishes to go flying for a while without all the restrictions imposed by the FAA has only to stay in uncontrolled airspace, below 365m, while the pilot who does want the protection afforded by ATC can easily enter the controlled airspace.24",
                )}

                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17,24")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "The FAA then recognised two types of operating environments.In good meteorological conditions, flying would be permitted under Visual Flight Rules (VFR), which suggests a strong reliance on visual cues to maintain an acceptable level of safety.18Poor visibility necessitated a set of Instrumental Flight Rules (IFR), under which the pilot relied on altitude and navigational information provided by the plane's instrument panel to fly safely.18",
                )}{" "}
                {highlight && (
                  <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                "On a clear day, a pilot in controlled airspace can choose a VFR or IFR flight plan, and the FAA regulations were devised in a way which accommodates both VFR and IFR operations in the same airspace.However, a pilot can only choose to fly IFR if they possess an instrument rating which is above and beyond the basic pilot's license that must also be held.",
              )}{" "}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "Controlled airspace is divided into several different types, designated by letters of the alphabet.Uncontrolled airspace is designated Class F, while controlled airspace below 5, 490m above sea level and not in the vicinity of an airport is Class E. All airspace above 5, 490m is designated Class A.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("19,24")}
                </span>
              )}

              {renderText(
                "The reason for the division of Class E and Class A airspace stems from the type of planes operating in them.Generally, Class E airspace is where one finds general aviation aircraft (few of which can climb above 5, 490m anyway), and commercial turboprop aircraft.Above 5, 490m is the realm of the heavy jets, since jet engines operate more efficiently at higher altitudes.The difference between Class E and A airspace is that in Class A, all operations are IFR, and pilots must be instrument-rated, that is, skilled and licensed in aircraft instrumentation.This is because ATC control of the entire space is essential.Three other types of airspace, Classes D, C and B, govern the vicinity of airports.",
              )}

              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  "These correspond roughly to small municipal, medium-sized metropolitan and major metropolitan airports respectively, and encompass an increasingly rigorous set of regulations.For example, all a VFR pilot has to do to enter Class C airspace is establish two-way radio contact with ATC.",
                )}
              </span>
              {highlight && (
                <span className="ml-2 inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("26")}
                </span>
              )}

              {renderText(
                "No explicit permission from ATC to enter is needed, although the pilot must continue to obey all regulations governing VFR flight.To enter Class B airspace, such as on approach to a major metropolitan airport, an explicit ATC clearance is required.The private pilot who cruises without permission into this airspace risks losing their license.",
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
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 14-19")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText("Reading Passage 2 has seven paragraphs, A-G.")}
                <br />
                <br />
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below.",
                )}
                <br />
                <br />
                {renderText(
                  "Choose the correct number, i-x, in boxes 14-19 on your answer sheet.",
                )}
              </h3>

              <div className="flex items-center justify-center border border-black py-6 px-6 w-96 mx-auto">
                <div className="text-left">
                  <h1 className="text-xl font-bold mb-5 text-center">
                    {renderText("List of Headings")}
                  </h1>

                  <ul className="space-y-2 text-lg">
                    <li>{renderText("i. Disobeying FAA regulations")}</li>
                    <li>
                      {renderText("ii. Aviation disaster prompts action")}
                    </li>
                    <li>{renderText("iii. Two coincidental developments")}</li>
                    <li>{renderText("iv. Setting altitude zones")}</li>
                    <li>{renderText("v. An oversimplified view")}</li>
                    <li>{renderText("vi. Controlling pilots' licences")}</li>
                    <li>{renderText("vii. Defining airspace categories")}</li>
                    <li>
                      {renderText("viii. Setting rules to weather conditions")}
                    </li>
                    <li>{renderText("ix. Taking off safely")}</li>
                    <li>{renderText("x. First steps towards ATC")}</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>
          {/* optional question */}
          <div className="space-y-3">
            {/* ---------- Question 14 (Example) ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("14")}</span>
              <span>{renderText("Paragraph A")}</span>

              <span className="text-lg font-semibold text-gray-600">
                {renderText("x")}
              </span>
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
                  <option value="x">x</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 14 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("15")}</span>
              <span>{renderText("Paragraph C")}</span>

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
                  <option value="x">x</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 16 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("16")}</span>
              <span>{renderText("Paragraph D")}</span>

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
                  <option value="x">x</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 17 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("17")}</span>
              <span>{renderText("Paragraph E")}</span>

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
                  <option value="x">x</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 18 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("18")}</span>
              <span>{renderText("Paragraph F")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("18")}</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                  <option value="x">x</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 19 ---------- */}
            <p className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg">{renderText("19")}</span>
              <span>{renderText("Paragraph G")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("19")}</option>
                  <option value="i">i</option>
                  <option value="ii">ii</option>
                  <option value="iii">iii</option>
                  <option value="iv">iv</option>
                  <option value="v">v</option>
                  <option value="vi">vi</option>
                  <option value="vii">vii</option>
                  <option value="viii">viii</option>
                  <option value="ix">ix</option>
                  <option value="x">x</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 21-26")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 21-26 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
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
              <h2 className="text-lg font-bold">Questions 21-26</h2>
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
                    {Array.from({ length: 12 }, (_, i) => i + 14).map((num) => {
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
      <Reading1Pagination2011></Reading1Pagination2011>
    </div>
  );
};

export default Reading1Part22011;
