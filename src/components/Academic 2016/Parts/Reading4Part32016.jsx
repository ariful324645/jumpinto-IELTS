import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2016 from "../Pagination2016/Reading4Pagination2016";

//  Marks show

const Reading4Part32016 = () => {
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
    "Human beings might have achieved their present position without language.",
    "The Port-Royal grammarians did justice to the nature of language.",
    "A complex idea can be explained more clearly in a sentence than in a single word.",
    "The Sumerians were responsible for starting the recording of events.",
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
   // Questions 27–32: Paragraph Headings
   27: "vi", // Paragraph A – Why language is the most important invention of all
   28: "iv", // Paragraph B – Apparently incompatible characteristics of language
   29: "ii", // Paragraph C – The way in which a few sounds are organised to convey a huge range of meaning
   30: "vii", // Paragraph D – The universal ability to use language
   31: "i", // Paragraph E – Differences between languages highlight their impressiveness
   32: "v", // Paragraph F – Even silence can be meaningful

   // Questions 33–36: Summary Completion
   33: "E", // The wheel is one invention that has had a major impact on material aspects of life
   34: "G", // but no impact has been as fundamental as that of language
   35: "B", // Language is very complex
   36: "F", // Language appears to be easy to use

   // Questions 37–40: YES / NO / NOT GIVEN
   37: "NO", // Human beings might have achieved their present position without language
   38: "YES", // The Port-Royal grammarians did justice to the nature of language
   39: "NO", // A complex idea can be explained more clearly in a sentence than in a single word
   40: "YES", // The Sumerians were responsible for starting the recording of events
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
          <div className="w-full bg-white p-6 rounded-lg shadow-md space-y-5 overflow-y-scroll">
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("This Marvellous Invention")}
            </h1>

            {/* A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Of all mankind's manifold creations, language must take pride of place." // number from your original text (adjust if needed)
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
                {renderText(
                  " Other inventions - the wheel, agriculture, sliced bread - may have transformed our material existence, but the advent of language is what made us human."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
                {renderText(
                  " Compared to language, all other inventions pale in significance, since everything we have ever achieved depends on language and originates from it."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
                {renderText(
                  " Without language, we could never have embarked on our ascent to unparalleled power over all other animals, and even over nature itself."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>
            </p>

            {/* B */}
            <h2 className="text-xl font-bold my-4">{renderText("B")}</h2>
            <p className="text-lg">
              {renderText(
                "But language is foremost not just because it came first. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In its own right it is a tool of extraordinary sophistication, yet based on an idea of ingenious simplicity: 'this marvellous invention of composing out of twenty-five or thirty sounds that infinite variety of expressions which, whilst having in themselves no likeness to what is in our mind, allow us to disclose to others its whole secret, and to make known to those who cannot penetrate it all that we imagine, and all the various stirrings of our soul'." // number from your original text (adjust if needed)
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}{" "}
                {renderText(
                  " This was how, in 1660, the renowned French grammarians of the Port-Royal abbey near Versailles distilled the essence of language, and no one since has celebrated more eloquently the magnitude of its achievement."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>

              {renderText(
                " Even so, there is just one flaw in all these hymns of praise, for the homage to language's unique accomplishment conceals a simple yet critical incongruity.  "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Language is mankind's greatest invention - except, of course, that it was never invented."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>

              {renderText(
                " This apparent paradox is at the core of our fascination with language, and it holds many of its secrets."
              )}
            </p>

            {/* C */}
            <h2 className="text-xl font-bold my-4">{renderText("C")}</h2>
            <p className="text-lg">
              {renderText(
                "Language often seems so skillfully drafted that one can hardly imagine it as anything other than the perfected handiwork of a master craftsman. How else could this instrument make so much out of barely three dozen measly morsels of sound?"
              )}
              {renderText(
                " In themselves, these configurations of mouth - 'p, f, b, v, t, d, k, g, sh, a, e' and so on - amount to nothing more than a few haphazard spits and splutters, random noises with no meaning, no ability to express, no power to explain."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " But run them through the cogs and wheels of the language machine, let it arrange them in some very special orders, and there is nothing that these meaningless streams of air cannot do: from sighing the interminable boredom of existence to unravelling the fundamental order of the universe."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            {/* D */}
            <h2 className="text-xl font-bold my-4">{renderText("D")}</h2>
            <p className="text-lg">
              {renderText(
                "The most extraordinary thing about language, however, is that one doesn't have to be a genius to set its wheels in motion. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The most extraordinary thing about language, however, is that one doesn't have to be a genius to set its wheels in motion. The language machine allows just about everybody - from pre-modern foragers in the subtropical savannah, to post-modern philosophers in the suburban sprawl - to tie these meaningless sounds together into an infinite variety of subtle senses, and all apparently without the slightest exertion."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30,36")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " Yet it is precisely this deceptive ease which makes language a victim of its own success, since in everyday life its triumphs are usually taken for granted."
              )}
              {renderText(
                " The wheels of language run so smoothly that one rarely bothers to stop and think about all the resourcefulness and expertise that must have gone into making it tick. Language conceals art."
              )}
            </p>

            {/* E */}
            <h2 className="text-xl font-bold my-4">{renderText("E")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Often, it is only the estrangement of foreign tongues, with their many exotic and outlandish features, that brings home the wonder of language's design."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " One of the showiest stunts that some languages can pull off is an ability to build up words of breath-breaking length, and thus express in one word what English takes a whole sentence to say."
              )}
              {renderText(
                " The Turkish word 'şehirliliştiremediklerimizdensiniz', to take one example, means nothing less than 'you are one of those whom we can't turn into a town-dweller'. (In case you were wondering, this monstrosity really is one word, not merely many different words squashed together - most of its components cannot even stand up on their own.)"
              )}
            </p>

            {/* F */}
            <h2 className="text-xl font-bold my-4">{renderText("F")}</h2>
            <p className="text-lg">
              {" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "And if that sounds like some one-off freak, then consider Sumerian, the language spoken on the banks of the Euphrates some 5,000 years ago by the people who invented writing and thus enabled the documentation of history. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
              {renderText(
                "A Sumerian word like 'munintuma'a' ('when he had made it suitable for her') might seem rather trim compared to the Turkish colossus above."
              )}
              {renderText(
                " What is so impressive about it, however, is not its lengthiness but rather the reverse - the thrifty compactness of its construction."
              )}
              {renderText(
                " The word is made up of different slots, each corresponding to a particular portion of meaning. This sleek design allows single sounds to convey useful information, and in fact even the absence of a sound has been enlisted to express something specific."
              )}
              {renderText(
                " If you were to ask which bit in the Sumerian word corresponds to the pronoun 'it' in the English translation 'when he had made it suitable for her', then the answer would have to be nothing. Mind you, a very particular kind of nothing: the nothing that stands in the empty slot in the middle."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The technology is so fine-tuned then that even a non-sound, when carefully placed in a particular position, has been invested with a specific function."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
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
                {renderText("Questions 37-40")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 3?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 37-40 on your answer sheet, choose")}
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
            </div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 27-32")}
              </h1>

              <p>
                {renderText(
                  "Reading Passage 3 has six paragraphs, A-F. Choose the correct heading for each paragraph from the list of headings below."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct number, i-vii, in boxes 27-32 on your answer sheet."
                )}
              </p>

              {/* ---------- List of Headings ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 w-80">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Headings")}
                  </h2>

                  <div className="flex items-center justify-center">
                    <ul className="space-y-1 text-lg">
                      <li>
                        {renderText(
                          "i. Differences between languages highlight their impressiveness"
                        )}
                      </li>
                      <li>
                        {renderText(
                          "ii. The way in which a few sounds are organised to convey a huge range of meaning"
                        )}
                      </li>
                      <li>
                        {renderText(
                          "iii. Why the sounds used in different languages are not identical"
                        )}
                      </li>
                      <li>
                        {renderText(
                          "iv. Apparently incompatible characteristics of language"
                        )}
                      </li>
                      <li>{renderText("v. Even silence can be meaningful")}</li>
                      <li>
                        {renderText(
                          "vi. Why language is the most important invention of all"
                        )}
                      </li>
                      <li>
                        {renderText(
                          "vii. The universal ability to use language"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ---------- Questions ---------- */}
              <div className="space-y-4 mt-4">
                {/* Question 27 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("27")}</span>
                  <span>{renderText("Paragraph A")}</span>

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
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* Question 28 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("28")}</span>
                  <span>{renderText("Paragraph B")}</span>

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
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* Question 29 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("29")}</span>
                  <span>{renderText("Paragraph C")}</span>

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
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* Question 30 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("30")}</span>
                  <span>{renderText("Paragraph D")}</span>

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
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* Question 31 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("31")}</span>
                  <span>{renderText("Paragraph E")}</span>

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
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* Question 32 */}
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-lg">{renderText("32")}</span>
                  <span>{renderText("Paragraph F")}</span>

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
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
              </div>
            </div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 33-36")}
              </h1>

              <p>
                {renderText(
                  "Complete the summary using the list of words or phrases below."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-G, in boxes 33-36 on your answer sheet."
                )}
              </p>

              {/* ---------- List of Words ---------- */}
              <div className="flex justify-center">
                <div className="border border-black p-4 w-80">
                  <h2 className="text-xl font-bold text-center mb-3">
                    {renderText("List of Words / Phrases")}
                  </h2>

                  <div className="flex items-center justify-center">
                    <ul className="space-y-1 text-lg">
                      <li>{renderText("A. difficult")}</li>
                      <li>{renderText("B. complex")}</li>
                      <li>{renderText("C. original")}</li>
                      <li>{renderText("D. admired")}</li>
                      <li>{renderText("E. material")}</li>
                      <li>{renderText("F. easy")}</li>
                      <li>{renderText("G. fundamental")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ---------- Questions ---------- */}
              <div className="space-y-4 mt-4">
                {[33, 34, 35, 36].map((q) => (
                  <p key={q} className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-lg">
                      {renderText(q.toString())}
                    </span>
                    <span>
                      {renderText(
                        q === 33
                          ? "The wheel is one invention that has had a major impact on"
                          : q === 34
                          ? "aspects of life, but no impact has been as"
                          : q === 35
                          ? "as that of language. Language is very"
                          : " yet composed of just a small number of sounds. Language appears to be"
                      )}
                    </span>

                    <div className="relative w-40">
                      <select
                        value={userAnswers[q] || ""}
                        onChange={(e) => handleInputChange(q, e.target.value)}
                        className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                      >
                        <option value="">{renderText(q.toString())}</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <FaChevronDown />
                      </span>
                    </div>
                  </p>
                ))}
              </div>
            </div>
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27-40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 27).map((num) => {
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

      <Reading4Pagination2016></Reading4Pagination2016>
    </div>
  );
};

export default Reading4Part32016;
