import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading2Pagination2011 from "../Pagination 2011/Reading2Pagination2011";

const Reading2Part32011 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
 const questions = [
   "According to the introduction, we become aware of the importance of smell when",
   "The experiment described in paragraph B",
   "What is the writer doing in paragraph C?",
   "What does the writer suggest about the study of smell in the atmosphere in paragraph E?",
 ];

 const options = [
   [
     "A. we discover a new smell.",
     "B. we experience a powerful smell.",
     "C. our ability to smell is damaged.",
     "D. we are surrounded by odours.",
   ],

   [
     "A. shows how we make use of smell without realising it.",
     "B. demonstrates that family members have a similar smell.",
     "C. proves that a sense of smell is learnt.",
     "D. compares the sense of smell in males and females.",
   ],

   [
     "A. supporting other research",
     "B. making a proposal",
     "C. rejecting a common belief",
     "D. describing limitations",
   ],

   [
     "A. The measurement of smell is becoming more accurate.",
     "B. Researchers believe smell is a purely physical reaction.",
     "C. Most smells are inoffensive.",
     "D. Smell is yet to be defined.",
   ],
 ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );

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

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 33;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
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
  // marks show
const correctAnswers = {
  27: "viii",
  28: "ii",
  29: "vi",
  30: "i",
  31: "iii",
  32: "v",
  33: "C. our ability to smell is damaged.",
  34: "A. shows how we make use of smell without realising it.",
  35: "C. rejecting a common belief",
  36: "D. Smell is yet to be defined.",
  37: "clothing",
  38: "vocabulary",
  39: "chemicals",
  40: "cultures",
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
    localStorage.setItem("/listening2Part22020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part22020");
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
            <h1 className="text-xl font-bold">{renderText("PASSAGE 3")}</h1>
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

          {/* left text */}

          <div className="">
            <div>
              <h1 className="text-lg">
                {renderText("You should spend about 20 minutes on ")}
                <span className="text-lg font-bold">
                  {renderText("Questions 27-40")}
                </span>
                {renderText(", which are based on Reading Passage 3 below.")}
              </h1>
            </div>

            <h1 className="text-2xl font-bold text-center mt-10">
              {renderText("The meaning and power of smell")}
            </h1>

            {/* Intro Paragraph */}
            <p className="text-lg mt-6">
              {renderText(
                "The sense of smell, or olfaction, is powerful. Odours affect us on a physical, psychological and social level. For the most part, however, we breathe in the aromas which surround us without being consciously aware of their importance to us.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " It is only when the faculty of smell is impaired for some reason that we begin to realise the essential role the sense of smell plays in our sense of well-being.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "A survey conducted by Anthony Synott at Montreal's Concordia University asked participants to comment on how important smell was to them in their lives.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " It became apparent that smell can evoke strong emotional responses.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                " A scent associated with a good experience can bring a rush of joy, while a foul odour or one associated with a bad memory may make us grimace with disgust.",
              )}
              {renderText(
                " Respondents to the survey noted that many of their olfactory likes and dislikes were based on emotional associations.",
              )}
              {renderText(
                " Such associations can be powerful enough so that odours that we would generally label unpleasant become agreeable, and those that we would generally consider fragrant become disagreeable for particular individuals.",
              )}
              {renderText(
                " The perception of smell, therefore, consists not only of the sensation of the odours themselves, but of the experiences and emotions associated with them.",
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Odours are also essential cues in social bonding.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>

              {renderText(
                " One respondent to the survey believed that there is no true emotional bonding without touching and smelling a loved one.",
              )}
              {renderText(
                " In fact, infants recognise the odours of their mothers soon after birth and adults can often identify their children or spouses by scent.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " In one well-known test, women and men were able to distinguish by smell alone clothing worn by their marriage partners from similar clothing worn by other people.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>

              {renderText(
                " Most of the subjects would probably never have given much thought to odour as a cue for identifying family members before being involved in the test, but as the experiment revealed, even when not consciously considered, smells register.",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("34")}
                </span>
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In spite of its importance to our emotional and sensory lives, smell is probably the most undervalued sense in many cultures.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>

              {renderText(
                " The reason often given for the low regard in which smell is held is that, in comparison with its importance among animals, the human sense of smell is feeble and undeveloped.",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("35")}
                </span>
              )}

              {renderText(
                " While it is true that the olfactory powers of humans are nothing like as fine as those possessed by certain animals, they are still remarkably acute.",
              )}
              {renderText(
                " Our noses are able to recognise thousands of smells, and to perceive odours which are present only in extremely small quantities.",
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Smell, however, is a highly elusive phenomenon. Odours, unlike colours, for instance, cannot be named in many languages because the specific vocabulary simply doesn't exist.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30,38")}
                  </span>
                )}
              </span>

              {renderText(
                " 'It smells like...,' we have to say when describing an odour, struggling to express our olfactory experience.",
              )}
              {renderText(
                " Nor can odours be recorded: there is no effective way to either capture or store them over time.",
              )}
              {renderText(
                " In the realm of olfaction, we must make do with descriptions and recollections. This has implications for olfactory research.",
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "Most of the research on smell undertaken to date has been of a physical scientific nature.",
              )}
              {renderText(
                " Significant advances have been made in the understanding of the biological and chemical nature of olfaction, but many fundamental questions have yet to be answered.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Researchers have still to decide whether smell is one sense or two - one responding to odours proper and the other registering odourless chemicals in the air.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36,39")}
                  </span>
                )}
              </span>

              {renderText(
                " Other unanswered questions are whether the nose is the only part of the body affected by odours, and how smells can be measured objectively given the nonphysical components.",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("31")}
                </span>
              )}

              {renderText(
                " Questions like these mean that interest in the psychology of smell is inevitably set to play an increasingly important role for researchers.",
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "However, smell is not simply a biological and psychological phenomenon. Smell is cultural, hence it is a social and historical phenomenon.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Odours are invested with cultural values: smells that are considered to be offensive in some cultures may be perfectly acceptable in others.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>

              {renderText(
                " Therefore, our sense of smell is a means of, and model for, interacting with the world.",
              )}
              {renderText(
                " Different smells can provide us with intimate and emotionally charged experiences and the value that we attach to these experiences is interiorised by the members of society in a deeply personal way.",
              )}

              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  {renderText("32")}
                </span>
              )}

              {renderText(
                " Importantly, our commonly held feelings about smells can help distinguish us from other cultures.",
              )}
              {renderText(
                " The study of the cultural history of smell is, therefore, in a very real sense, an investigation into the essence of human culture.",
              )}
            </p>
          </div>
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
            <h1 className="text-lg font-bold">
              {renderText("Questions 27-32")}
            </h1>

            <p>
              {renderText("Reading Passage 3 has six paragraphs,")}
              <span className="font-bold text-lg">{renderText(" A-F.")}</span>
            </p>

            <p>
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below.",
              )}
            </p>

            <p>
              {renderText("Choose the correct number,")}
              <span className="font-bold text-lg">{renderText(" i-viii")}</span>
              {renderText(", in boxes 27-32 on your answer sheet.")}
            </p>

            {/* ----------- List of Headings ----------- */}
            <div className="flex items-center justify-center border-2 w-sm p-8 ">
              <div className="mt-4">
                <h2 className="font-bold text-lg">
                  {renderText("List of Headings")}
                </h2>

                <ul className="space-y-1 mt-2">
                  <li>
                    {renderText("i. The difficulties of talking about smells")}
                  </li>
                  <li>
                    {renderText(
                      "ii. The role of smell in personal relationships",
                    )}
                  </li>
                  <li>{renderText("iii. Future studies into smell")}</li>
                  <li>
                    {renderText(
                      "iv. The relationship between the brain and the nose",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "v. The interpretation of smells as a factor in defining groups",
                    )}
                  </li>
                  <li>
                    {renderText(
                      "vi. Why our sense of smell is not appreciated",
                    )}
                  </li>
                  <li>{renderText("vii. Smell is our superior sense")}</li>
                  <li>
                    {renderText(
                      "viii. The relationship between smell and feelings",
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/* ---------- Question 27 ---------- */}
            <p className="flex items-center gap-2 flex-wrap mt-4">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              {renderText("Paragraph A")}

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="27">{renderText("27")}</option>
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

            {/* ---------- Question 28 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              {renderText("Paragraph B")}

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="28">{renderText("28")}</option>
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

            {/* ---------- Question 29 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("Paragraph C")}

              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="29">{renderText("29")}</option>
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

            {/* ---------- Question 30 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("Paragraph D")}

              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="30">{renderText("30")}</option>
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

            {/* ---------- Question 31 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("31.")}</span>
              {renderText("Paragraph E")}

              <div className="relative w-40">
                <select
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="31">{renderText("31")}</option>
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

            {/* ---------- Question 32 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("32.")}</span>
              {renderText("Paragraph F")}

              <div className="relative w-40">
                <select
                  value={userAnswers[32] || ""}
                  onChange={(e) => handleInputChange(32, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="32">{renderText("32")}</option>
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
          </div>

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 33-36")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold"> {renderText("  A, B or C")}</span>.
            </p>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 33;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col  gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

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
          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 37-40")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the sentences below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("ONE WORD ONLY")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 37-40 on your answer sheet.",
              )}
            </h1>

            <br />
          </div>

          {/* answer box */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <ul className="list-disc list-inside space-y-4">
              {/* ---------- Question 37 ---------- */}
              <p className="text-lg">
                {renderText(
                  "37 Tests have shown that odours can help people recognise the",
                )}
                <button
                  onClick={() => toggleButton(37)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[37]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  37
                </button>
                <input
                  value={userAnswers[37] || ""}
                  onChange={(e) => handleInputChange(37, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText("belonging to their husbands and wives.")}
              </p>

              {/* ---------- Question 38 ---------- */}
              <p className="text-lg">
                {renderText(
                  "38 Certain linguistic groups may have difficulty describing smell because they lack the appropriate",
                )}
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
                {renderText(".")}
              </p>

              {/* ---------- Question 39 ---------- */}
              <p className="text-lg">
                {renderText("39 The sense of smell may involve response to")}
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
                {renderText(
                  "which do not smell, in addition to obvious odours.",
                )}
              </p>

              {/* ---------- Question 40 ---------- */}
              <p className="text-lg">
                {renderText("40 Odours regarded as unpleasant in certain")}
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
                {renderText("are not regarded as unpleasant in others.")}
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
      <Reading2Pagination2011></Reading2Pagination2011>
    </div>
  );
};

export default Reading2Part32011;
