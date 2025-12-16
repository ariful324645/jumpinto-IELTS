import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading1Pagination2017 from "../Pagination2017/Reading1Pagination2017";

//  Marks show

const Reading1Part32019 = () => {
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
    "It is difficult to attract students onto courses that do not focus on a career.",
    "The 'Arson for Profit' course would be useful for people intending to set fire to buildings.",
    "Fire science courses are too academic to help people to be good at the job of firefighting.",
    "The writer's fire science students provided a detailed definition of the purpose of their studies.",
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
      const answerKey = qIndex + 37;
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
    27: "E", // Enz and Siguaw
    28: "D", // Ng and Sorensen
    29: "B", // Lucas
    30: "C", // Maroudas et al.
    31: "C", // Maroudas et al.

    32: "YES",
    33: "YES",
    34: "NOT GIVEN",
    35: "YES",

    36: "restaurants",
    37: "performance",
    38: "turnover",
    39: "goals",
    40: "characteristics",
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
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("What's the purpose of gaining knowledge?")}
            </h1>

            {/* A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>

            <p className="text-lg">
              {renderText(
                '"I would found an institution where any person can find instruction in any subject." That was the founder\'s motto for Cornell University, and it seems an apt characterization of the different university, also in the USA, where I currently teach philosophy.'
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "A student can prepare for a career in resort management, engineering, interior design, accounting, music, law enforcement, you name it."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'But what would the founders of these two institutions have thought of a course called "Arson for Profit"?'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText("I kid you not: we have it on the books.")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'Any undergraduates who have met the academic requirements can sign up for the course in our program in "fire science".'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
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
                  "Naturally, the course is intended for prospective arson investigators, who can learn all the tricks of the trade for detecting whether a fire was deliberately set, discovering who did it, and establishing a chain of evidence for effective prosecution in a court of law."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-20 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34,35,36")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "But wouldn't this also be the perfect course for prospective arsonists to sign up for?"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-16 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28,38")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "My point is not to criticize academic programs in fire science: they are highly welcome as part of the increasing professionalization of this and many other occupations."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "However, it's not unknown for a firefighter to torch a building. This example suggests how dishonest and illegal behavior, with the help of higher education, can creep into every aspect of public and business life."
              )}
            </p>

            {/* C */}
            <h2 className="text-xl font-bold my-4">{renderText("C")}</h2>

            <p className="text-lg">
              {renderText(
                "I realized this anew when I was invited to speak before a class in marketing, which is another of our degree programs. The regular instructor is a colleague who appreciates the kind of ethical perspective I can bring as a philosopher."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                'There are endless ways I could have approached this assignment, but I took my cue from the title of the course: "Principles of Marketing"."'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  ' It made me think to ask the students, "Is marketing principled?"'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                'Many of the students immediately assumed that the answer was obvious: "no". Just look at the ways in which everything under the sun has been marketed; obviously it need not be done in a "principled" (=ethical) fashion.'
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
                {" "}
                {renderText(
                  'Is that obvious? I made the suggestion, which may sound downright crazy in light of the evidence, that perhaps marketing is "by definition" principled.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "My inspiration for this judgement is the philosopher Immanuel Kant, who argued that any body of knowledge consists of an end (or purpose) and a means."
              )}
            </p>

            {/* E */}
            <h2 className="text-xl font-bold my-4">{renderText("E")}</h2>

            <p className="text-lg">
              {renderText(
                `"Let us apply both the terms "means" and "end" to marketing.The students have signed up for a course in order to learn how to market effectively.But to what "end"?There seem to be two main attitudes toward that question.One is that the answer is obvious: the purpose of marketing is to sell things and to make money.The other attitude is that the "purpose" of marketing is irrelevant: Each person comes to the program and course with his or her own plans, and these need not even concern the acquisition of marketing expertise as such.My proposal, which I believe would also be Kant's, is that "neither" of these attitudes captures the significance of the end to the means for marketing"`
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
                  `"A field of knowledge or a professional endeavor is defined by both the means "and" the end; hence "both" deserve scrutiny"`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                `"Students need to study both how to achieve X, and also what X is."`
              )}
            </p>

            {/* F */}
            <h2 className="text-xl font-bold my-4">{renderText("F")}</h2>

            <p className="text-lg">
              {renderText(
                'It is at this point that "Arson for Profit" becomes supremely relevant.'
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
                  'When I ask fire science students to articulate the purpose of their field, they generalize to "the safety and welfare of society," which seems right.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                `As we have seen, someone could use the very same knowledge of "means" to achieve a much less noble end, such as personal profit via destructive, dangerous, reckless activity.But "we would not call that firefighting".We have a separate word for it:`
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  `Similarly, if you employed the "principles of marketing" in an unprincipled way, "you would not be doing marketing".32We have another term for it: "fraud".`
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Kant compares a doctor and a poisoner: they use identical knowledge, but one practices medicine and the other commits murder."
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
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 27–32")}
              </h1>

              <p>{renderText("Reading Passage 3 has six sections, A–F.")}</p>

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
                <div className="border border-black p-4 w-96">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Headings")}
                  </h2>
                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText(
                        "i. Courses that require a high level of commitment"
                      )}
                    </li>
                    <li>
                      {renderText("ii. A course title with two meanings")}
                    </li>
                    <li>
                      {renderText(
                        "iii. The equal importance of two key issues"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iv. Applying a theory in an unexpected context"
                      )}
                    </li>
                    <li>
                      {renderText("v. The financial benefits of studying")}
                    </li>
                    <li>{renderText("vi. A surprising course title")}</li>
                    <li>
                      {renderText(
                        "vii. Different names for different outcomes"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "viii. The possibility of attracting the wrong kind of student"
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
              </div>
            </div>
          </div>
          <br />
          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 33-36")}
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
                "Write your answers in boxes 33-36 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("The 'Arson for Profit' course")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>
                  {renderText(
                    "This is a university course intended for students who are undergraduates and who are studying"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(33)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[33]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  33
                </button>

                <input
                  value={userAnswers[33] || ""}
                  onChange={(e) => handleInputChange(33, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText(". The expectation is that they will become")}
                </span>
              </p>

              <p className="text-lg">
                <button
                  onClick={() => toggleButton(34)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[34]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  34
                </button>

                <input
                  value={userAnswers[34] || ""}
                  onChange={(e) => handleInputChange(34, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText(
                    " specialising in arson. The course will help them to detect cases of arson and find"
                  )}
                </span>
              </p>

              <p className="text-lg">
                <button
                  onClick={() => toggleButton(35)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[35]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  35
                </button>

                <input
                  value={userAnswers[35] || ""}
                  onChange={(e) => handleInputChange(35, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>
                  {renderText(" of criminal intent, leading to successful")}
                </span>
              </p>

              <p className="text-lg">
                <button
                  onClick={() => toggleButton(36)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[36]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  36
                </button>

                <input
                  value={userAnswers[36] || ""}
                  onChange={(e) => handleInputChange(36, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>{renderText(" in the courts.")}</span>
              </p>
            </ul>
          </div>

          {/* 2nd step */}
          <div  className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 37-40")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 3?"
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
              <h2 className="text-lg font-bold">Questions 37-40</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 37;
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
      <Reading1Pagination2017></Reading1Pagination2017>
    </div>
  );
};

export default Reading1Part32019;
