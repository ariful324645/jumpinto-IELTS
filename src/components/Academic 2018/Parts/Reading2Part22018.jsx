import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading2Pagination2018 from "../Pagination2018/Reading2Pagination2018";

const Readign2Part22018 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

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
  // marks show
const correctAnswers = {
  14: "B", // reference to beneficial effects of oxytocin
  15: "E", // reasons why effects are complex
  16: "B", // period of little scientific attention
  17: "E", // people ignoring aspects of their data
  18: "A", // people more trusting under oxytocin
  19: "B", // oxytocin increases jealousy
  20: "C", // effect varies depending on person
  21: "animals", // earliest findings from research involving animals
  22: "childbirth", // humans produce oxytocin during childbirth
  23: "placebo", // given oxytocin or placebo
  24: "competitive game", // negative emotions triggered
  25: "strangers", // lack of willingness to help strangers
  26: "Dutch names", // familiar names have positive associations
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
    localStorage.setItem("/reading2Part22020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/reading2Part22020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part22020");
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
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
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
          <div>
            <h1 className="text-lg mb-10">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 14-26")}
              </span>
              {renderText(", which are based on Reading Passage 1 below.")}
            </h1>
          </div>
          {/* left text */}

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Oxytocin")}
            </h1>

            <p className="text-lg font-bold text-center italic">
              {renderText(
                "The positive and negative effects of the chemical known as the 'love hormone'"
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "Oxytocin is a chemical, a hormone produced in the pituitary gland in the brain. "
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  "It was through various studies focusing on animals that scientists first became aware of the influence of oxytocin."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              {renderText(
                "They discovered that it helps reinforce the bonds between prairie voles, which mate for life, and triggers the motherly behaviour that sheep show towards their newborn lambs."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  "It is also released by women in childbirth, strengthening the attachment between mother and baby."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Few chemicals have as positive a reputation as oxytocin, which is sometimes referred to as the 'love hormone'."
              )}
              {renderText(
                "One sniff of it can, it is claimed, make a person more trusting, empathetic, generous and cooperative. It is time, however, to revise this wholly optimistic view. A new wave of studies has shown that its effects vary greatly depending on the person and the circumstances, and it can impact on our social interactions for worse as well as for better."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Oxytocin's role in human behaviour first emerged in 2005. In a groundbreaking experiment, Markus Heinrichs and his colleagues at the University of Freiburg, Germany, asked volunteers to do an activity in which they could invest money with an anonymous person who was not guaranteed to be honest."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  "The team found that participants who had sniffed oxytocin via a nasal spray beforehand invested more money than those who received a placebo instead."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("18,23")}
                  </span>
                )}
              </span>
              {renderText(
                'The study was the start of research into the effects of oxytocin on human interactions. "'
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  'For eight years, it was quite a lonesome field," Heinrichs recalls.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText('"Now, everyone is interested."')}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  "These follow-up studies have shown that after a sniff of the hormone, people become more charitable, better at reading emotions on others' faces and at communicating constructively in arguments."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Together, the results fuelled the view that oxytocin universally enhanced the positive aspects of our social nature.Then, after a few years, contrasting findings began to emerge."
              )}
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  " Simone Shamay-Tsoory at the University of Haifa, Israel, found that when volunteers played a competitive game, those who inhaled the hormone showed more pleasure when they beat other players, and felt more envy when others won."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("19,24")}
                  </span>
                )}
              </span>{" "}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  "What's more, administering oxytocin also has sharply contrasting outcomes depending on a person's disposition."
                )}
                {renderText(
                  "Jennifer Bartz from Mount Sinai School of Medicine, New York, found that it improves people's ability to read emotions, but only if they are not very socially adept to begin with.Her research also shows that oxytocin in fact reduces cooperation in subjects who are particularly anxious or sensitive to rejection."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "Another discovery is that oxytocin's effects vary depending on who we are interacting with. "
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  " Studies conducted by Carolyn DeClerck of the University of Antwerp, Belgium, revealed that people who had received a dose of oxytocin actually became less cooperative when dealing with complete strangers."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("25")}
                  </span>
                )}
              </span>
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  "Meanwhile, Carsten De Dreu at the University of Amsterdam in the Netherlands discovered that volunteers given oxytocin showed favouritism: Dutch men became quicker to associate positive words with Dutch names than with foreign ones, for example."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("26")}
                  </span>
                )}
              </span>

              {renderText(
                "According to De Dreu, oxytocin drives people to care for those in their social circles and defend them from outside dangers. So, it appears that oxytocin strengthens biases, rather than promoting general goodwill, as was previously thought."
              )}
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "There were signs of these subtleties from the start."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  " Bartz has recently shown that in almost half of the existing research results, oxytocin influenced only certain individuals or in certain circumstances.Where once researchers took no notice of such findings, now a more nuanced understanding of oxytocin's effects is propelling investigations down new lines."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-sm font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>

              {renderText(
                "To Bartz, the key to understanding what the hormone does lies in pinpointing its core function rather than in cataloguing its seemingly endless effects. There are several hypotheses which are not mutually exclusive. Oxytocin could help to reduce anxiety and fear. Or it could simply motivate people to seek out social connections."
              )}

              {renderText(
                "She believes that oxytocin acts as a chemical spotlight that shines on social clues - a shift in posture, a flicker of the eyes, a dip in the voice - making people more attuned to their social environment."
              )}

              {renderText(
                "This would explain why it makes us more likely to look others in the eye and improves our ability to identify emotions. But it could also make things worse for people who are overly sensitive or prone to interpreting social cues in the worst light."
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "Perhaps we should not be surprised that the oxytocin story has become more perplexing."
              )}
              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {renderText(
                  '" The hormone is found in everything from octopuses to sheep, and its evolutionary roots stretch back half a billion years.It\'s a very simple and ancient molecule that has been co-opted for many different functions," says Sue Carter at the University of Illinois, Chicago, USA.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("15")}
                  </span>
                )}
              </span>

              <span
                className={`${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                } ml-2`}
              >
                {" "}
                {renderText(
                  'Bartz agrees. "Oxytocin probably does some very basic things, but once you add our higher-order thinking and social situations, these basic processes could manifest in different ways depending on individual differences and context."'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white font-semibold rounded-sm">
                    {renderText("15")}
                  </span>
                )}
              </span>
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
              {renderText("Questions 14-17")}
            </h1>

            <p>
              {renderText("Reading Passage 2 has six paragraphs,")}
              <span className="font-bold text-lg">{renderText(" A-F")}</span>
            </p>

            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" A-F")}</span>
              {renderText(", in boxes 14-17 on your answer sheet.")}
            </p>

            <p>
              {renderText("Choose the correct letter,")}
              <span className="font-bold text-lg">{renderText(" NB")}</span>
              {renderText(" You may use any letter more than once.")}
            </p>

            {/* ---------- Question 1 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("14.")}</span>
              <span>
                {renderText(
                  "reference to research showing the beneficial effects of oxytocin on people"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[14] || ""}
                  onChange={(e) => handleInputChange(14, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="14">{renderText("14")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("15.")}</span>
              <span>
                {renderText("reasons why the effects of oxytocin are complex")}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[15] || ""}
                  onChange={(e) => handleInputChange(15, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="15">{renderText("15")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("16.")}</span>
              <span>
                {renderText(
                  "mention of a period in which oxytocin attracted little scientific attention"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[16] || ""}
                  onChange={(e) => handleInputChange(16, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="16">{renderText("16")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("17.")}</span>
              <span>
                {renderText(
                  "reference to people ignoring certain aspects of their research data"
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[17] || ""}
                  onChange={(e) => handleInputChange(17, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="17">{renderText("17")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 18-20")}
            </h1>

            <p>
              {renderText(
                "Look at the following research findings (Questions 18-20) and the list of researchers below."
              )}
            </p>

            <p>
              {renderText(
                "Match each research finding with the correct researcher,"
              )}
              <span className="font-bold text-lg">{renderText(" A-F")}</span>.
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-F, in boxes 18-20 on your answer sheet."
              )}
            </p>

            {/* ---------- List of Researchers ---------- */}
            <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
              <div className="text-center">
                <h1 className="text-xl font-bold mb-5">
                  {renderText("List of Researchers")}
                </h1>

                <ul className="space-y-1 text-lg">
                  <li>{renderText("A. Markus Heinrichs")}</li>
                  <li>{renderText("B. Simone Shamay-Tsoory")}</li>
                  <li>{renderText("C. Jennifer Bartz")}</li>
                  <li>{renderText("D. Carolyn DeClerck")}</li>
                  <li>{renderText("E. Carsten De Dreu")}</li>
                  <li>{renderText("F. Sue Carter")}</li>
                </ul>
              </div>
            </div>

            {/* ---------- Question 18 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("18.")}</span>
              <span>
                {renderText(
                  "People are more trusting when affected by oxytocin."
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[18] || ""}
                  onChange={(e) => handleInputChange(18, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="18">{renderText("18")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 19 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("19.")}</span>
              <span>
                {renderText(
                  "Oxytocin increases people's feelings of jealousy."
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[19] || ""}
                  onChange={(e) => handleInputChange(19, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="19">{renderText("19")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 20 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("20.")}</span>
              <span>
                {renderText(
                  "The effect of oxytocin varies from one type of person to another."
                )}
              </span>

              <div className="relative w-40">
                <select
                  value={userAnswers[20] || ""}
                  onChange={(e) => handleInputChange(20, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="20">{renderText("20")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          {/* normal title*/}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold my-5">
              {renderText("Questions 21-26")}
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
                "Write your answers in boxes 21-26 on your answer sheet."
              )}
            </h1>

            <br />
          </div>

          {/* box text */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Oxytocin research")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              {/* ---------- Question 21 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "The earliest findings about oxytocin and bonding came from research involving"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(21)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[21]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  21
                </button>

                <input
                  value={userAnswers[21] || ""}
                  onChange={(e) => handleInputChange(21, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>.</span>
              </p>

              {/* ---------- Question 22 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "It was also discovered that humans produce oxytocin during"
                  )}
                </span>

                <button
                  onClick={() => toggleButton(22)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[22]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  22
                </button>

                <input
                  value={userAnswers[22] || ""}
                  onChange={(e) => handleInputChange(22, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />

                <span>.</span>
              </p>

              {/* ---------- Question 23 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "An experiment in 2005, in which participants were given either oxytocin or a"
                  )}
                </span>

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

                <span>
                  {renderText(
                    ", reinforced the belief that the hormone had a positive effect."
                  )}
                </span>
              </p>

              {/* ---------- Question 24 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "However, later research suggests that this is not always the case. A study at the University of Haifa where participants took part in a"
                  )}
                </span>

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

                <span>
                  {renderText(
                    " revealed the negative emotions which oxytocin can trigger."
                  )}
                </span>
              </p>

              {/* ---------- Question 25 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "A study at the University of Antwerp showed people's lack of willingness to help"
                  )}
                </span>

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

                <span>
                  {renderText(" while under the influence of oxytocin.")}
                </span>
              </p>

              {/* ---------- Question 26 ---------- */}
              <p className="text-lg">
                <span>
                  {renderText(
                    "Meanwhile, research at the University of Amsterdam revealed that people who have been given oxytocin consider"
                  )}
                </span>

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

                <span>
                  {renderText(
                    " that are familiar to them in their own country to have more positive associations than those from other cultures."
                  )}
                </span>
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
                    Your Score: {score}/12
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
      <Reading2Pagination2018></Reading2Pagination2018>
    </div>
  );
};

export default Readign2Part22018;
