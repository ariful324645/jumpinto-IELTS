import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

//  Marks show

const Test3Reading2019 = () => {
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
    "Slow language development in children is likely to prove disappointing to their parents.",
    "People's expectations of what children should gain from education are universal.",
    "Scholars may discuss theories without fully understanding each other.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
  //   const question2 = [
  //     "The main idea of the third paragraph is that environmental damage",

  //     "In the fourth paragraph, the writer describes ways in which the public can",
  //     "What pressure was exerted by big business in the case of the disease BSE?",
  //     "What would be the best subheading for this passage?",
  //   ];

  //   const options2 = [
  //     [
  //       "A. requires political action if it is to be stopped.",
  //       "B. is the result of ignorance on the part of the public.",
  //       "C. could be prevented by the action of ordinary people.",
  //       "D. can only be stopped by educating business leaders.",
  //     ],

  //     [
  //       "A. reduce their own individual impact on the environment.",
  //       "B. learn more about the impact of business on the environment.",
  //       "C. raise awareness of the effects of specific environmental disasters.",
  //       "D. influence the environmental policies of businesses and governments.",
  //     ],

  //     [
  //       "A. Meat packers stopped supplying hamburgers to fast-food chains.",
  //       "B. A fast-food company forced their meat suppliers to follow the law.",
  //       "C. Meat packers persuaded the government to reduce their expenses.",
  //       "D. A fast-food company encouraged the government to introduce legislation.",
  //     ],
  //     [
  //       "A. Will the world survive the threat caused by big businesses?",
  //       "B. How can big businesses be encouraged to be less driven by profit?",
  //       "C. What environmental dangers are caused by the greed of businesses?",
  //       "D. Are big businesses to blame for the damage they cause the environment?",
  //     ],
  //   ];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 4;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions2]; // ✅ use selectedOptions2
    updatedOptions[qIndex] = option;
    setSelectedOptions2(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 32;
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
  // Questions 1-3: Reading Passage 1 – Sections A-J
  1: "B", // non-scientists' assumptions influence behavior
  2: "A", // lack of clarity over the definition of intelligence
  3: "D", // implicit and explicit theories may differ

  // Questions 4-6: Yes / No / Not Given
  4: "NOT GIVEN", // slow language development in children
  5: "NO", // expectations of children’s learning are not universal
  6: "YES", // scholars may discuss theories without fully understanding each other

  // Questions 7-13: Theories: A = Hamiltonian, B = Jeffersonian, C = Jacksonian
  7: "C", // same possibilities should be open to everyone
  8: "C", // no section of society should have preferential treatment
  9: "B", // people gain benefits based on actual achievement
  10: "A", // variation in intelligence begins at birth
  11: "A", // more intelligent people should be in positions of power
  12: "C", // everyone can develop the same abilities
  13: "A", // people of low intelligence likely to lead uncontrolled lives

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
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("The Concept of Intelligence")}
            </h1>

            {/* Intro paragraph */}

            {/* Section A */}
            <p className="text-lg font-semibold">{renderText("A")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Looked at in one way, everyone knows what intelligence is; looked at in another way, no one does. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
              {renderText(
                " In other words, people all have unconscious notions - known as 'implicit theories' - of intelligence, but no one knows for certain what it actually is. This chapter addresses how people conceptualize intelligence, whatever it may actually be."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "But why should we even care what people think intelligence is, as opposed only to valuing whatever it actually is? There are at least four reasons people's conceptions of intelligence matter."
              )}
            </p>

            <br />

            {/* Section B */}
            <p className="text-lg font-semibold">{renderText("B")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "First, implicit theories of intelligence drive the way in which people perceive and evaluate their own intelligence and that of others. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                "First, implicit theories of intelligence drive the way in which people perceive and evaluate their own intelligence and that of others. To better understand the judgments people make about their own and others' abilities, it is useful to learn about people's implicit theories. For example, parents' implicit theories of their children's language development will determine at what ages they will be willing to make various corrections in their children's speech. More generally, parents' implicit theories of intelligence will determine at what ages they believe their children are ready to perform various cognitive tasks. Job interviewers will make hiring decisions on the basis of their implicit theories of intelligence. People will decide who to be friends with on the basis of such theories. In sum, knowledge about implicit theories of intelligence is important because this knowledge is so often used by people to make judgments in the course of their everyday lives."
              )}
            </p>

            <br />

            {/* Section C */}
            <p className="text-lg font-semibold">{renderText("C")}</p>
            <p className="text-lg">
              {renderText(
                "Second, the implicit theories of scientific investigators ultimately give rise to their explicit theories. Thus it is useful to find out what these implicit theories are. Implicit theories provide a framework that is useful in defining the general scope of a phenomenon - especially a not-well-understood phenomenon. These implicit theories can suggest what aspects of the phenomenon have been more or less attended to in previous investigations."
              )}
            </p>

            <br />

            {/* Section D */}
            <p className="text-lg font-semibold">{renderText("D")}</p>
            <p className="text-lg">
              {renderText(
                "Third, implicit theories can be useful when an investigator suspects that existing explicit theories are wrong or misleading."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " If an investigation of implicit theories reveals little correspondence between the extant implicit and explicit theories, the implicit theories may be wrong."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                " But the possibility also needs to be taken into account that the explicit theories are wrong and in need of correction or supplementation. For example, some implicit theories of intelligence suggest the need for expansion of some of our explicit theories of the construct."
              )}
            </p>

            <br />

            {/* Section E */}
            <p className="text-lg font-semibold">{renderText("E")}</p>
            <p className="text-lg">
              {renderText(
                "Finally, understanding implicit theories of intelligence can help elucidate developmental and cross-cultural differences. As mentioned earlier, people have expectations for intellectual performances that differ for children of different ages. "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " How these expectations differ is in part a function of culture."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
              {renderText(
                "Finally, understanding implicit theories of intelligence can help elucidate developmental and cross-cultural differences. As mentioned earlier, people have expectations for intellectual performances that differ for children of different ages. For example, expectations for children who participate in Western-style schooling are almost certain to be different from those for children who do not participate in such schooling."
              )}
            </p>

            <br />

            {/* Section F */}
            <p className="text-lg font-semibold">{renderText("F")}</p>
            <p className="text-lg">
              {renderText(
                "I have suggested that there are three major implicit theories of how intelligence relates to society as a whole (Sternberg, 1997). These might be called Hamiltonian, Jeffersonian, and Jacksonian. These views are not based strictly, but rather, loosely, on the philosophies of Alexander Hamilton, Thomas Jefferson, and Andrew Jackson, three great statesmen in the history of the United States."
              )}
            </p>

            <br />

            {/* Section G */}
            <p className="text-lg font-semibold">{renderText("G")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The Hamiltonian view, which is similar to the Platonic view, is that people are born with different levels of intelligence and that those who are less intelligent need the good offices of the more intelligent to keep them in line, whether they are called government officials or, in Plato's term, philosopher-kings. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10,11")}
                  </span>
                )}
              </span>
              {renderText(
                "Herrnstein and Murray (1994) seem to have shared this belief when they wrote about the emergence of a cognitive (high-IQ) elite, which eventually would have to take responsibility for the largely irresponsible masses of non-elite (low-IQ) people who cannot take care of themselves.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  Left to themselves, the unintelligent would create, as they always have created, a kind of chaos "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section H */}
            <p className="text-lg font-semibold">{renderText("H")}</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  The Jeffersonian view is that people should have equal opportunities, but they do not necessarily avail themselves equally of these opportunities and are not necessarily equally rewarded for their accomplishments."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  People are rewarded for what they accomplish, if given equal opportunity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
              {renderText(
                "  Low achievers are not rewarded to the same extent as high achievers. In the Jeffersonian view, the goal of education is not to favor or foster an elite, as in the Hamiltonian tradition, but rather to allow children the opportunities to make full use of the skills they have."
              )}
            </p>

            <br />

            {/* Section I */}
            <p className="text-lg font-semibold">{renderText("I")}</p>
            <p className="text-lg">
              {renderText(
                "The Jacksonian view is that all people are equal, not only as human beings but in terms of their competencies - that one person would serve as well as another in government or on a jury or in almost any position of responsibility. In this view of democracy, people are essentially intersubstitutable except for specialized skills, all of which can be learned. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In this view, we do not need or want any institutions that might lead to favoring one group over another."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section J */}
            <p className="text-lg font-semibold">{renderText("J")}</p>
            <p className="text-lg">
              {renderText(
                "Implicit theories of intelligence and of the relationship of intelligence to society perhaps need to be considered more carefully than they have been because they often serve as underlying presuppositions for explicit theories and even experimental designs that are then taken as scientific contributions."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "   Until scholars are able to discuss their implicit theories and thus their assumptions, they are likely to miss the point of what others are saying when discussing their explicit theories and their data."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
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
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 1-3")}
              </h1>

              <p>{renderText("Reading Passage 1 has ten sections, A-J.")}</p>

              <p>
                {renderText(
                  "Which section contains the following information?"
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-J, in boxes 1-3 on your answer sheet."
                )}
              </p>

              {/* ---------- Question 1 ---------- */}
              <p className="flex items-center gap-2 flex-wrap mb-4">
                {renderText(
                  "1 information about how non-scientists' assumptions about intelligence influence their behaviour towards others"
                )}

                <div className="relative w-40">
                  <select
                    value={userAnswers[1] || ""}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="1">{renderText("1")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                    <option value="H">{renderText("H")}</option>
                    <option value="I">{renderText("I")}</option>
                    <option value="J">{renderText("J")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 2 ---------- */}
              <p className="flex items-center gap-2 flex-wrap mb-4">
                {renderText(
                  "2 a reference to lack of clarity over the definition of intelligence"
                )}

                <div className="relative w-40">
                  <select
                    value={userAnswers[2] || ""}
                    onChange={(e) => handleInputChange(2, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="2">{renderText("2")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                    <option value="H">{renderText("H")}</option>
                    <option value="I">{renderText("I")}</option>
                    <option value="J">{renderText("J")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 3 ---------- */}
              <p className="flex items-center gap-2 flex-wrap mb-4">
                {renderText(
                  "3 the point that a researcher's implicit and explicit theories may be very different"
                )}

                <div className="relative w-40">
                  <select
                    value={userAnswers[3] || ""}
                    onChange={(e) => handleInputChange(3, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="3">{renderText("3")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                    <option value="H">{renderText("H")}</option>
                    <option value="I">{renderText("I")}</option>
                    <option value="J">{renderText("J")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            </div>

            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 4-6")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 4-6 on your answer sheet, choose")}
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
                <h2 className="text-lg font-bold">Questions 36-40</h2>
                {questions.map((q, qIndex) => {
                  const answerKey = qIndex + 4;
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
                {renderText("Questions 7-13")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions 7-13) and the list of people below."
                )}
              </p>

              <p>
                {renderText("Match each statement with the correct person,")}
                <span className="font-bold text-lg">{renderText(" A-C")}</span>.
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-C, in boxes 7-13 on your answer sheet."
                )}
              </p>

              <p>{renderText("NB You may use any letter more than once.")}</p>

              {/* ---------- List of People ---------- */}
              <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
                <div className="text-center">
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("A. Hamiltonian")}</li>
                    <li>{renderText("B. Jeffersonian")}</li>
                    <li>{renderText("C. Jacksonian")}</li>
                  </ul>
                </div>
              </div>

              {/* ---------- big businesses ---------- */}
              {/* ---------- Theories / Questions 7-13 ---------- */}
              <div className="border-2 border-black rounded-lg p-5">
                {/* ---------- Question 7 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(
                    "It is desirable for the same possibilities to be open to everyone."
                  )}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[7] || ""}
                      onChange={(e) => handleInputChange(7, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="7">{renderText("7")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 8 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(
                    "No section of society should have preferential treatment at the expense of another."
                  )}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[8] || ""}
                      onChange={(e) => handleInputChange(8, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="8">{renderText("8")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 9 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(
                    "People should only gain benefits on the basis of what they actually achieve."
                  )}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[9] || ""}
                      onChange={(e) => handleInputChange(9, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="9">{renderText("9")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 10 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText("Variation in intelligence begins at birth.")}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[10] || ""}
                      onChange={(e) => handleInputChange(10, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="10">{renderText("10")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 11 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(
                    "The more intelligent people should be in positions of power."
                  )}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[11] || ""}
                      onChange={(e) => handleInputChange(11, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="11">{renderText("11")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 12 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(" Everyone can develop the same abilities.")}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[12] || ""}
                      onChange={(e) => handleInputChange(12, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="12">{renderText("12")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>

                {/* ---------- Question 13 ---------- */}
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText(
                    "People of low intelligence are likely to lead uncontrolled lives."
                  )}

                  <div className="relative w-40">
                    <select
                      value={userAnswers[13] || ""}
                      onChange={(e) => handleInputChange(13, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="13">{renderText("13")}</option>
                      <option value="A">{renderText("A")}</option>
                      <option value="B">{renderText("B")}</option>
                      <option value="C">{renderText("C")}</option>
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </p>
              </div>
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
    </div>
  );
};

export default Test3Reading2019;
