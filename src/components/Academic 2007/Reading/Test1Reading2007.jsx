import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

//  Marks show

const Test1Reading2007 = () => {
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
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
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
  // Questions 1–7 (Paragraphs A–F)
  1: "C", // a reference to the exchange of expertise between different sports
  2: "C", // an explanation of how visual imaging is employed in investigations
  3: "B", // a reason for narrowing the scope of research activity
  4: "F", // how some AIS ideas have been reproduced
  5: "D", // how obstacles to optimum achievement can be investigated
  6: "A", // an overview of the funded support of athletes
  7: "E", // how performance requirements are calculated before an event

  // Questions 8–11 (Techniques classification)
  8: "A", // cameras – currently exclusively used by Australians
  9: "A", // sensors – currently exclusively used by Australians
  10: "A", // protein tests – currently exclusively used by Australians
  11: "C", // altitude tents – used by both Australians and rivals

  // Questions 12–13 (Summary completion)
  12: "competition model", // produced to help an athlete plan their performance
  13: "two per cent", // improvement in cyclists’ performance at 1996 Olympics
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
              {renderText(" which are based on Reading  PASSAGE 1 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("AUSTRALIA'S SPORTING SUCCESS")}
            </h1>

            {/* A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They play hard, they play often, and they play to win. Australian sports teams win more than their fair share of titles, demolishing rivals with seeming ease. How do they do it? A big part of the secret is an extensive and expensive network of sporting academies underpinned by science and medicine.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
              {renderText(
                " At the Australian Institute of Sport (AIS), hundreds of youngsters and pros live and train under the eyes of coaches. Another body, the Australian Sports Commission (ASC), finances programmes of excellence in a total of 96 sports for thousands of sportsmen and women. Both provide intensive coaching, training facilities and nutritional advice.",
              )}
            </p>

            {/* B */}
            <h2 className="text-xl font-bold my-4">{renderText("B")}</h2>
            <p className="text-lg">
              {renderText(
                "Inside the academies, science takes centre stage. The AIS employs more than 100 sports scientists and doctors, and collaborates with scores of others in universities and research centres. AIS scientists work across a number of sports, applying skills learned in one - such as building muscle strength in golfers - to others, such as swimming and squash.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "They are backed up by technicians who design instruments to collect data from athletes. They all focus on one aim: winning.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1,3")}
                  </span>
                )}
              </span>
            </p>

            {/* C */}
            <h2 className="text-xl font-bold my-4">{renderText("C")}</h2>
            <p className="text-lg">
              {renderText(
                "A lot of their work comes down to measurement - everything from the exact angle of a swimmer's dive to the second-by-second power output of a cyclist. This data is used to wring improvements out of athletes. The focus is on individuals, tweaking performances to squeeze an extra hundredth of a second here, an extra millimetre there. No gain is too slight to bother with. It's the tiny, gradual improvements that add up to world-beating results. To demonstrate how the system works, Bruce Mason at AIS shows off the prototype of a 3D analysis tool for studying swimmers.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "A wire-frame model of a champion swimmer slices through the water, her arms moving in slow motion. Looking side-on, Mason measures the distance between strokes. From above, he analyses how her spine swivels. When fully developed, this system will enable him to build a biomechanical profile for coaches to use to help budding swimmers. Mason's contribution to sport also includes the development of the SWAN (SWimming ANalysis) system now used in Australian national competitions. It collects images from digital cameras running at 50 frames a second and breaks down each part of a swimmer's performance into factors that can be analysed individually - stroke length, stroke frequency, average duration of each stroke, velocity, start, lap and finish times, and so on.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2,8")}
                  </span>
                )}
              </span>
            </p>

            {/* D */}
            <h2 className="text-xl font-bold my-4">{renderText("D")}</h2>
            <p className="text-lg">
              {renderText(
                `"Take a look," says Mason, pulling out a sheet of data. He points out the data on the swimmers in second and third place, which shows that the one who finished third actually swam faster. "So why did he finish 35 hundredths of a second down?" "His turn times were 44 hundredths of a second behind the other guy," says Mason. "If he can improve on his turns, he can do much better." This is the kind of accuracy that AIS scientists' research is bringing to a range of sports. With the Cooperative Research Centre for Micro Technology in Melbourne, they are developing unobtrusive sensors that will be embedded in an athlete's clothes or running shoes to monitor heart rate, sweating, heat production or any other factor that might have an impact on an athlete's ability to run."`,
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "There's more to it than simply measuring performance. Fricker gives the example of athletes who may be down with coughs and colds 11 or 12 times a year. After years of experimentation, AIS and the University of Newcastle in New South Wales developed a test that measures how much of the immune-system protein immunoglobulin A is present in athletes' saliva. If IgA levels suddenly fall below a certain level, training is eased or dropped altogether. Soon, IgA levels start rising again, and the danger passes. Since the tests were introduced, AIS athletes in all sports have been remarkably successful at staying healthy.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-20 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9,10,11,12")}
                  </span>
                )}
              </span>
            </p>

            {/* E */}
            <h2 className="text-xl font-bold my-4">{renderText("E")}</h2>
            <p className="text-lg">
              {renderText(
                "Using data is a complex business. Well before a championship, sports scientists and coaches start to prepare the athlete by developing a 'competition model', based on what they expect will be the winning times.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  `"You design the model to make 'that' time," says Mason. "A start of 'this' much, each free-swimming period has to be 'this' fast, with a certain stroke frequency and stroke length, with turns done in 'these' times." All the training is then geared towards making the athlete hit those targets, both overall and for each segment of the race. Techniques like these have transformed Australia into arguably the world's most successful sporting nation.`,
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-16 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7,12")}
                  </span>
                )}
              </span>
            </p>

            {/* F */}
            <h2 className="text-xl font-bold my-4">{renderText("F")}</h2>
            <p className="text-lg">
              {renderText(
                "Of course, there's nothing to stop other countries copying - and many have tried. Some years ago, the AIS unveiled coolant-lined jackets for endurance athletes. At the Atlanta Olympic Games in 1996, these sliced as much as two per cent off cyclists' and rowers' times. Now everyone uses them. The same has happened to the 'altitude tent', developed by AIS to replicate the effect of altitude training at sea level.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But Australia's success story is about more than easily copied technological fixes, and up to now no nation has replicated its all-encompassing system.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
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
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 1-7")}
              </h1>

              <p>{renderText("Reading Passage 1 has six paragraphs, A–F.")}</p>

              <p>
                {renderText(
                  "Which paragraph contains the following information?",
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A–F, in boxes 1-7 on your answer sheet.",
                )}
              </p>

              <p>{renderText("NB You may use any letter more than once.")}</p>

              <div className="space-y-4 mt-4">
                {/* 1 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("1")}</span>
                  <span>
                    {renderText(
                      "a reference to the exchange of expertise between different sports",
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("1")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* 2 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("2")}</span>
                  <span>
                    {renderText(
                      "an explanation of how visual imaging is employed in investigations",
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[2] || ""}
                      onChange={(e) => handleInputChange(2, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("2")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 3 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("3")}</span>
                  <span>
                    {renderText(
                      "a reason for narrowing the scope of research activity",
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[3] || ""}
                      onChange={(e) => handleInputChange(3, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("3")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 4 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("4")}</span>
                  <span>
                    {renderText("how some AIS ideas have been reproduced")}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[4] || ""}
                      onChange={(e) => handleInputChange(4, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("4")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 5 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("5")}</span>
                  <span>
                    {renderText(
                      "how obstacles to optimum achievement can be investigated",
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[5] || ""}
                      onChange={(e) => handleInputChange(5, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("5")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 6 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("6")}</span>
                  <span>
                    {renderText(
                      "an overview of the funded support of athletes",
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[6] || ""}
                      onChange={(e) => handleInputChange(6, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("6")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 7 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("7")}</span>
                  <span>
                    {renderText(
                      "how performance requirements are calculated before an event",
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("7")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>
              </div>
            </div>

            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 8-11")}
              </h1>

              <p>
                {renderText(
                  "Choose the correct heading for each section from the list of headings below.",
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct number, i–viii, in boxes 5-8 on your answer sheet.",
                )}
              </p>

              {/* ---------- List of Nationalities ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 w-96">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText(
                      "Classify the following techniques according to whether the writer states they",
                    )}
                  </h2>
                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText(
                        "A. are currently exclusively used by Australians",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "B. will be used in the future by Australians",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "C. are currently used by both Australians and their rivals",
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* ---------- Questions ---------- */}
              <div className="space-y-4 mt-4">
                {/* 8 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("8")}</span>
                  <span>{renderText("cameras")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("8")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 9 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("9")}</span>
                  <span>{renderText("sensors")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("9")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 10 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("10")}</span>
                  <span>{renderText("protein tests")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("10")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </p>

                {/* 11 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("11")}</span>
                  <span>{renderText("altitude tents")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[11] || ""}
                      onChange={(e) => handleInputChange(11, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("11")}</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
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
              {renderText("Questions 12-13")}
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
                "Write your answers in boxes 12-13 on your answer sheet.",
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Timekeeping Invention Details")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* 12 */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "What is produced to help an athlete plan their performance in an event?",
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
              </p>

              {/* 13 */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "By how much did some cyclists' performance improve at the 1996 Olympic Games?",
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
      {/* <Reading1Pagination2017></Reading1Pagination2017> */}
    </div>
  );
};

export default Test1Reading2007;
