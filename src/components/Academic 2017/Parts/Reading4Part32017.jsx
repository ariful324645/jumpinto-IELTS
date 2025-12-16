import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";


import Reading4Pagination2017 from "../Pagination2017/Reading4Pagination2017";

//  Marks show

const Reading4Part32017 = () => {
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
    "Close scrutiny of the behaviour of boards has increased since the economic downturn.",
    "Banks have been mismanaged to a greater extent than other businesses.",
    "Board meetings normally continue for as long as necessary to debate matters in full.",
    "Using a committee structure would ensure that board members are fully informed about significant issues.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 34;
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
  // Questions 27–33 (Headings)
  27: "iv",
  28: "ii",
  29: "vi",
  30: "viii",
  31: "vii",
  32: "i",
  33: "iii",

  // Questions 34–37 (YES / NO / NOT GIVEN)
  34: "YES",
  35: "NOT GIVEN",
  36: "NO",
  37: "NO",

  // Questions 38–40 (Summary Completion)
  38: "information",
  39: "financial",
  40: "shareholders",
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

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-3 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 3")}</h1>
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
                {renderText("          Questions 27-40")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div className="overflow-x-auto p-5 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText(
                "UK companies need more effective boards of directors"
              )}
            </h1>

            {/* ---------- Section A ---------- */}
            <p className="text-lg font-semibold">{renderText("A")}</p>
            <p className="text-lg">
              {renderText(
                "After a number of serious failures of governance (that is, how they are managed at the highest level), companies in Britain, as well as elsewhere, should consider radical changes to their directors' roles."
              )}
              {renderText(
                "It is clear that the role of a board director today is not an easy one."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Following the 2008 financial meltdown, which resulted in a deeper and more prolonged period of economic downturn than anyone expected, the search for explanations in the many post-mortems of the crisis has meant blame has been spread far and wide."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27,34
                  </span>
                )}
              </span>
              {renderText(
                "Governments, regulators, central banks and auditors have all been in the frame."
              )}
              {renderText(
                "The role of bank directors and management and their widely publicised failures have been extensively picked over and examined in reports, inquiries and commentaries."
              )}
            </p>

            <br />

            {/* ---------- Section B ---------- */}
            <p className="text-lg font-semibold">{renderText("B")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "The knock-on effect of this scrutiny has been to make the governance of companies in general an issue of intense public debate and has significantly increased the pressures on, and the responsibilities of, directors."
                )}
                {renderText("28")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28
                  </span>
                )}
              </span>
              {renderText(
                "At the simplest and most practical level, the time involved in fulfilling the demands of a board directorship has increased significantly, calling into question the effectiveness of the classic model of corporate governance by part-time, independent non-executive directors."
              )}
              {renderText(
                "Where once a board schedule may have consisted of between eight and ten meetings a year, in many companies the number of events requiring board input and decisions has dramatically risen."
              )}
              {renderText(
                "Furthermore, the amount of reading and preparation required for each meeting is increasing."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Agendas can become overloaded and this can mean the time for constructive debate must necessarily be restricted in favour of getting through the business."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ---------- Section C ---------- */}
            <p className="text-lg font-semibold">{renderText("C")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Often, board business is devolved to committees in order to cope with the workload, which may be more efficient but can mean that the board as a whole is less involved in fully addressing some of the most important issues."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    29,37
                  </span>
                )}
              </span>
              {renderText(
                "It is not uncommon for the audit committee meeting to last longer than the main board meeting itself."
              )}
              {renderText(
                "Process may take the place of discussion and be at the expense of real collaboration, so that boxes are ticked rather than issues tackled."
              )}
            </p>

            <br />

            {/* ---------- Section D ---------- */}
            <p className="text-lg font-semibold">{renderText("D")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "A radical solution, which may work for some very large companies whose businesses are extensive and complex, is the professional board, whose members would work up to three or four days a week, supported by their own dedicated staff and advisers."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    30
                  </span>
                )}
              </span>
              {renderText(
                "There are obvious risks to this and it would be important to establish clear guidelines for such a board to ensure that it did not step on the toes of management by becoming too engaged in the day-to-day running of the company."
              )}
              {renderText(
                "Problems of recruitment, remuneration and independence could also arise and this structure would not be appropriate for all companies."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "However, more professional and better-informed boards would have been particularly appropriate for banks where the executives had access to information that part-time non-executive directors lacked, leaving the latter unable to comprehend or anticipate the 2008 crash."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    38
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ---------- Section E ---------- */}
            <p className="text-lg font-semibold">{renderText("E")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "One of the main criticisms of boards and their directors is that they do not focus sufficiently on longer-term matters of strategy, sustainability and governance, but instead concentrate too much on short-term financial metrics."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31,39
                  </span>
                )}
              </span>
              {renderText(
                "Regulatory requirements and the structure of the market encourage this behaviour."
              )}
              {renderText(
                "The tyranny of quarterly reporting can distort board decision-making."
              )}
            </p>

            <br />

            {/* ---------- Section F ---------- */}
            <p className="text-lg font-semibold">{renderText("F")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Compensation for chief executives has become a combat zone where pitched battles between investors, management and board members are fought, often behind closed doors but increasingly frequently in the full glare of press attention."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
                {renderText(
                  "Many would argue that this is in the interest of transparency and good governance as shareholders use their muscle in the area of pay to pressure boards to remove underperforming chief executives"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    40
                  </span>
                )}
              </span>
              {renderText(
                "Their powers to vote down executive remuneration policies increased when binding votes came into force.The chair of the remuneration committee can be an exposed and lonely role, as Alison Carnwath, chair of Barclays Bank's remuneration committee, found when she had to resign, having been roundly criticised for trying to defend the enormous bonus to be paid to the chief executive; the irony being that she was widely understood to have spoken out against it in the privacy of the committee."
              )}
            </p>

            <br />

            {/* ---------- Section G ---------- */}
            <p className="text-lg font-semibold">{renderText("G")}</p>
            <p className="text-lg">
              {renderText(
                "The financial crisis stimulated a debate about the role and purpose of the company and a heightened awareness of corporate ethics.Trust in the corporation has been eroded and academics such as Michael Sandel, in his thoughtful and bestselling book What Money Can't Buy, are questioning the morality of capitalism and the market economy."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Boards of companies in all sectors will need to widen their perspective to encompass these issues and this may involve a realignment of corporate goals."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    33
                  </span>
                )}
              </span>
              {renderText("We live in challenging times.")}
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
                {renderText("Questions 27–32")}
              </h1>

              <p>{renderText("Reading Passage 3 has six sections, A–G.")}</p>

              <p>
                {renderText(
                  "Choose the correct heading for each section from the list of headings below."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct number, i–viii, in boxes 27–32 on your answer sheet."
                )}
              </p>

              {/* ---------- List of Headings ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 max-w-2xl">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Headings")}
                  </h2>
                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText(
                        "i. Disputes over financial arrangements regarding senior managers"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "ii. The impact on companies of being subjected to close examination"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iii. The possible need for fundamental change in every area of business"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iv. Many external bodies being held responsible for problems"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "v. The falling number of board members with broad enough experience"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "vi. A risk that not all directors take part in solving major problems"
                      )}
                    </li>
                    <li>
                      {renderText("vii. Boards not looking far enough ahead")}
                    </li>
                    <li>
                      {renderText(
                        "viii. A proposal to change the way the board operates"
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* ---------- Questions ---------- */}
              <div className="space-y-4">
                {/* 27 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("27")}</span>
                  <span>{renderText("Section A")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[27] || ""}
                      onChange={(e) => handleInputChange(27, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("27")}</option>
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
                  <span className="font-bold text-lg">{renderText("28")}</span>
                  <span>{renderText("Section B")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[28] || ""}
                      onChange={(e) => handleInputChange(28, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("28")}</option>
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
                  <span className="font-bold text-lg">{renderText("29")}</span>
                  <span>{renderText("Section C")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[29] || ""}
                      onChange={(e) => handleInputChange(29, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("29")}</option>
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
                  <span className="font-bold text-lg">{renderText("30")}</span>
                  <span>{renderText("Section D")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[30] || ""}
                      onChange={(e) => handleInputChange(30, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("30")}</option>
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
                  <span className="font-bold text-lg">{renderText("31")}</span>
                  <span>{renderText("Section E")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[31] || ""}
                      onChange={(e) => handleInputChange(31, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("31")}</option>
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
                  <span className="font-bold text-lg">{renderText("32")}</span>
                  <span>{renderText("Section F")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[32] || ""}
                      onChange={(e) => handleInputChange(32, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("32")}</option>
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
                {/* 33*/}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("33")}</span>
                  <span>{renderText("Section G")}</span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[33] || ""}
                      onChange={(e) => handleInputChange(33, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                    >
                      <option value="">{renderText("33")}</option>
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
          <br /> {/* 2nd step */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 34-37")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 2?"
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
              <h2 className="text-lg font-bold">Questions 34-37</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 34;
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
              {renderText("Questions 38-40")}
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
                "Write your answers in boxes 38-40 on your answer sheet."
              )}
            </h1>

            <br />
          </div>
          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <ul className="space-y-4">
              {/* ---------- Question 38 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "Before 2008, non-executive directors were at a disadvantage because of their lack of"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(38)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[38]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  38
                </button>

                <input
                  value={userAnswers[38] || ""}
                  onChange={(e) => handleInputChange(38, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText(".")}</span>
              </p>

              {/* ---------- Question 39 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText("Boards tend to place too much emphasis on")}
                </span>

                <button
                  onClick={() => toggleButton(39)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[39]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  39
                </button>

                <input
                  value={userAnswers[39] || ""}
                  onChange={(e) => handleInputChange(39, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText(
                    " considerations that are only of short-term relevance."
                  )}
                </span>
              </p>

              {/* ---------- Question 40 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "On certain matters, such as pay, the board may have to accept the views of"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(40)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[40]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  40
                </button>

                <input
                  value={userAnswers[40] || ""}
                  onChange={(e) => handleInputChange(40, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText(".")}</span>
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
                    All Answers (27-40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
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
      <Reading4Pagination2017></Reading4Pagination2017>
    </div>
  );
};

export default Reading4Part32017;
