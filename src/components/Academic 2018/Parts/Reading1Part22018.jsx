import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading1Pagination2018 from "../Pagination2018/Reading1Pagination2018";

//  Marks show

const Reading1Part22018 = () => {
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
    localStorage.setItem("/reading1Part22018", newScore);
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
  // Questions 14-19 (Headings for paragraphs A-F)
  14: "iv", // Problems with a scientific approach to boredom
  15: "vi", // Creating a system of classification for feelings of boredom
  16: "i", // The productive outcomes that may result from boredom
  17: "v", // A potential danger arising from boredom
  18: "viii", // Identifying those most affected by boredom
  19: "iii", // A new explanation and a new cure for boredom

  // Questions 20-23 (Matching people with ideas)
  20: "E", // Peter Toohey - Boredom may encourage us to avoid an unpleasant experience
  21: "B", // Thomas Goetz - One sort of boredom is worse than all the others
  22: "D", // John Eastwood - Trying to cope with boredom can increase its negative effects
  23: "A", // Francoise Wemelsfelder - The way we live today may encourage boredom

  // Questions 24-26 (Summary completion)
  24: "focus",
  25: "pleasure",
  26: "curiosity",
};


  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part22018");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part22018");
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
                {renderText("          Questions 14-26")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Why being bored is stimulating - and useful, too")}
            </h1>
            <h1 className="text-lg font-bold mb-5 italic text-center">
              {renderText(
                "This most common of emotions is turning out to be more interesting than we thought."
              )}
            </h1>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-5">{renderText("A")}</h1>
              {renderText(
                "We all know how it feels - it's impossible to keep your mind on anything, time stretches out, and all the things you could do seem equally unlikely to make you feel better. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But defining boredom so that it can be studied in the lab has proved difficult."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                " For a start, it can include a lot of other mental states, such as frustration, apathy, depression and indifference. There isn't even agreement over whether boredom is always a low-energy, flat kind of emotion or whether feeling agitated and restless counts as boredom, too. In his book, Boredom: A Lively History, Peter Toohey at the University of Calgary, Canada, compares it to disgust - an emotion that motivates us to stay away from certain situations."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "\"If disgust protects humans from infection, boredom may protect them from 'infectious' social situations,\" he suggests."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-5">{renderText("B")}</h1>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "By asking people about their experiences of boredom, Thomas Goetz and his team at the University of Konstanz in Germany have recently identified five distinct types: indifferent, calibrating, searching, reactant and apathetic."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " These can be plotted on two axes - one running left to right, which measures low to high arousal, and the other from top to bottom, which measures how positive or negative the feeling is. Intriguingly, Goetz has found that while people experience all kinds of boredom, they tend to specialise in one."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Of the five types, the most damaging is 'reactant' boredom with its explosive combination of high arousal and negative emotion."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              {renderText(
                " The most useful is what Goetz calls 'indifferent' boredom: someone isn't engaged in anything satisfying but still feels relaxed and calm. However, it remains to be seen whether there are any character traits that predict the kind of boredom each of us might be prone to."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-5">{renderText("C")}</h1>
              {renderText(
                'Psychologist Sandi Mann at the University of Central Lancashire, UK, goes further. "All emotions are there for a reason, including boredom," she says.'
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "B Mann has found that being bored makes us more creative."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                "We're all afraid of being bored but in actual fact it can lead to all kinds of amazing things. In experiments published last year, Mann found that people who had been made to feel bored by copying numbers out of the phone book for 15 minutes came up with more creative ideas about how to use a polystyrene cup than a control group. Mann concluded that a passive, boring activity is best for creativity because it allows the mind to wander. In fact, she goes so far as to suggest that we should seek out more boredom in our lives."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-5">{renderText("D")}</h1>
              {renderText(
                'Psychologist John Eastwood at York University in Toronto, Canada, isn\'t convinced. "If you are in a state of mind-wandering you are not bored," he says. "In my view, by definition boredom is an undesirable state." That doesn\'t necessarily mean that it isn\'t adaptive, he adds. "Pain is adaptive - if we didn\'t have physical pain, bad things would happen to us. Does that mean that we should actively cause pain? No.."'
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " But even if boredom has evolved to help us survive, it can still be toxic if allowed to fester"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " This causes an inability to focus on anything, which makes time seem to go painfully slowly."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " What's more, your efforts to improve the situation can end up making you feel worse. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
              {renderText(
                " People try to connect with the world and if they are not successful there's that frustration and irritability. Perhaps most worryingly, repeatedly failing to engage attention can lead to a state where we don't know what to do any more, and no longer care."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-5">{renderText("E")}</h1>
              {renderText(
                "Eastwood's team is now trying to explore why the attention system fails. It's early days but they think that at least some of it comes down to personality.",
                <span
                  className={`ml-2 ${
                    highlight ? "bg-yellow-100" : "bg-transparent"
                  }`}
                >
                  {renderText(
                    "Boredom proneness has been linked with a variety of traits. "
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("18")}
                    </span>
                  )}
                </span>,
                <span
                  className={`ml-2 ${
                    highlight ? "bg-yellow-100" : "bg-transparent"
                  }`}
                >
                  {renderText(
                    " People who are motivated by pleasure seem to suffer particularly badly. "
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("25")}
                    </span>
                  )}
                </span>,
                <span
                  className={`ml-2 ${
                    highlight ? "bg-yellow-100" : "bg-transparent"
                  }`}
                >
                  {renderText(
                    " Other personality traits, such as curiosity, are associated with a high boredom threshold.  "
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("26")}
                    </span>
                  )}
                </span>,

                "  More evidence that boredom has detrimental effects comes from studies of people who are more or less prone to boredom. It seems those who bore easily face poorer prospects in education, their career and even life in general. But of course, boredom itself cannot kill - it's the things we do to deal with it that may put us in danger. What can we do to alleviate it before it comes to that? Goetz's group has one suggestion."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  Working with teenagers, they found that those who 'approach' a boring situation - in other words, see that it's boring and get stuck in anyway - report less boredom than those who try to avoid it by using snacks, TV or social media for distraction. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-5">{renderText("F")}</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  Psychologist Francoise Wemelsfelder speculates that our over-connected lifestyles might even be a new source of boredom. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19,23")}
                  </span>
                )}
              </span>
              {renderText(
                " 'In modern human society there is a lot of overstimulation but still a lot of problems finding meaning,' she says. So instead of seeking yet more mental stimulation, perhaps we should leave our phones alone, and use boredom to motivate us to engage with the world in a more meaningful way."
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
              {/* ---------- Section: Questions 14-19 ---------- */}
              <h1 className="text-lg font-bold">
                {renderText("Questions 14-19")}
              </h1>

              <p>{renderText("Reading Passage 2 has six paragraphs, A-F.")}</p>

              <p>
                {renderText(
                  "Choose the correct heading for each paragraph from the list of headings below."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct number, i-viii, in boxes 14-19 on your answer sheet."
                )}
              </p>

              {/* List of Headings */}
              <div className="flex items-center justify-center border border-black py-4 px-4 w-96 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <h1 className="text-2xl font-bold text-center">
                      List of Headings
                    </h1>
                    <li>
                      {renderText(
                        "i. The productive outcomes that may result from boredom"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "ii. What teachers can do to prevent boredom"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iii. A new explanation and a new cure for boredom"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "iv. Problems with a scientific approach to boredom"
                      )}
                    </li>
                    <li>
                      {renderText("v. A potential danger arising from boredom")}
                    </li>
                    <li>
                      {renderText(
                        "vi. Creating a system of classification for feelings of boredom"
                      )}
                    </li>
                    <li>
                      {renderText("vii. Age groups most affected by boredom")}
                    </li>
                    <li>
                      {renderText(
                        "viii. Identifying those most affected by boredom"
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Questions 14-19 Select Inputs */}
              {[14, 15, 16, 17, 18, 19].map((q) => (
                <p className="flex items-center gap-2 flex-wrap" key={q}>
                  <span className="font-bold text-lg">
                    {renderText(`${q}.`)}
                  </span>
                  <span>
                    {renderText(
                      `Paragraph ${String.fromCharCode(64 + q - 13)}`
                    )}
                  </span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[q] || ""}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText(q.toString())}</option>
                      {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                        (option) => (
                          <option key={option} value={option}>
                            {renderText(option)}
                          </option>
                        )
                      )}
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
              ))}

              <br />

              {/* ---------- Section: Questions 20-23 ---------- */}
              <h1 className="text-lg font-bold">
                {renderText("Questions 20-23")}
              </h1>

              <p>
                {renderText(
                  "Look at the following people (Questions 20-23) and the list of ideas below."
                )}
              </p>
              <p>
                {renderText("Match each person with the correct idea, A-E.")}
              </p>
              <p>
                {renderText(
                  "Choose the correct letter, A-E, in boxes 20-23 on your answer sheet."
                )}
              </p>

              {/* List of Ideas */}
              <div className="flex items-center justify-center border border-black py-4 px-4 w-96 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <h1 className="text-2xl font-bold text-center">
                      List of Ideas
                    </h1>
                    <li>
                      {renderText(
                        "A. The way we live today may encourage boredom."
                      )}
                    </li>
                    <li>
                      {renderText(
                        "B. One sort of boredom is worse than all the others."
                      )}
                    </li>
                    <li>
                      {renderText(
                        "C. Levels of boredom may fall in the future."
                      )}
                    </li>
                    <li>
                      {renderText(
                        "D. Trying to cope with boredom can increase its negative effects."
                      )}
                    </li>
                    <li>
                      {renderText(
                        "E. Boredom may encourage us to avoid an unpleasant experience."
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Questions 20-23 Select Inputs */}
              {[
                { q: 20, person: "Peter Toohey" },
                { q: 21, person: "Thomas Goetz" },
                { q: 22, person: "John Eastwood" },
                { q: 23, person: "Francoise Wemelsfelder" },
              ].map(({ q, person }) => (
                <p className="flex items-center gap-2 flex-wrap" key={q}>
                  <span className="font-bold text-lg">
                    {renderText(`${q}.`)}
                  </span>
                  <span>{renderText(person)}</span>
                  <div className="relative w-40">
                    <select
                      value={userAnswers[q] || ""}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText(q.toString())}</option>
                      {["A", "B", "C", "D", "E"].map((option) => (
                        <option key={option} value={option}>
                          {renderText(option)}
                        </option>
                      ))}
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
              ))}
            </div>
          </div>
          <br />

          {/* normal title */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 24-26")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the summary below.")} <br /> <br />
              {renderText("Choose")}{" "}
              <span className="font-bold mr-2">
                {renderText("ONE WORD ONLY")}
              </span>{" "}
              {renderText("from the passage for each answer.")}
            </h3>

            <h1 className="text-lg">
              {renderText(
                "Write your answers in boxes 24-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Responses to boredom")}
            </h1>

            <p className="text-lg">
              {renderText(
                "For John Eastwood, the central feature of boredom is that people cannot"
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
              {renderText(
                ", due to a failure in what he calls the 'attention system', and as a result they become frustrated and irritable. His team suggests that those for whom"
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
              {renderText(
                " is an important aim in life may have problems in coping with boredom, whereas those who have the characteristic of"
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
              {renderText(" can generally cope with it.")}
            </p>
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
                    Your Score: {score}/12
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
      {/* <Reading1Pagination2019></Reading1Pagination2019> */}
      <Reading1Pagination2018></Reading1Pagination2018>
    </div>
  );
};

export default Reading1Part22018;
