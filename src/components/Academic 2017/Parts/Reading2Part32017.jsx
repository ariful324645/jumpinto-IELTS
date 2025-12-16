import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading2Pagination2017 from "../Pagination2017/Reading2Pagination2017";

//  Marks show

const Reading2Part32019 = () => {
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
    "Attitudes towards bilingualism have changed in recent years.",
    "Bilingual people are better than monolingual people at guessing correctly what words are before they are finished.",
    "Bilingual people consistently name images faster than monolingual people.",
    "Bilingual people's brains process single sounds more efficiently than monolingual people in all situations.",
    "Fewer bilingual people than monolingual people suffer from brain disease in old age.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

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
  // Questions 27–31: Table
  27: "behavior", // Observing the behavior of Russian-English bilingual people
  28: "language co-activation", // Mechanism engaged by bilingual people
  29: "Stroop Task", // A test focusing on naming colours
  30: "conflict management", // Skill used by bilingual people
  31: "cognitive control", // Superior ability when changing strategies

  // Questions 32–36: YES / NO / NOT GIVEN
  32: "YES", // Attitudes towards bilingualism have changed
  33: "YES", // Bilinguals guess words before they are finished
  34: "NO", // Bilinguals do not consistently name images faster
  35: "NO", // Brains process single sounds more efficiently only in noise
  36: "NOT GIVEN", // Fewer bilinguals with brain disease is not specified

  // Questions 37–40: Paragraphs A-G
  37: "D", // Brains respond differently to non-verbal auditory input
  38: "G", // Benefits of bilingual upbringing before speech
  39: "B", // Process of identifying words heard
  40: "C", // Negative consequences of being bilingual
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
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("The Benefits of Being Bilingual")}
            </h1>

            {/* Section A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>
            <p className="text-lg">
              {renderText(
                "According to the latest figures, the majority of the world's population is now bilingual or multilingual, having grown up speaking two or more languages."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In the past, such children were considered to be at a disadvantage compared with their monolingual peers."
                )}{" "}
                {renderText(
                  " Over the past few decades, however, technological advances have allowed researchers to look more deeply at how bilingualism interacts with and changes the cognitive and neurological systems, thereby identifying several clear benefits of being bilingual."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("32")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section B */}
            <h2 className="text-xl font-bold mb-3">{renderText("B")}</h2>
            <p className="text-lg">
              {renderText(
                "Research shows that when a bilingual person uses one language, the other is active at the same time. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "When we hear a word, we don't hear the entire word all at once: the sounds arrive in sequential order."
                )}{" "}
                {renderText(
                  " Long before the word is finished, the brain's language system begins to guess what that word might be."
                )}
                {renderText("39")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("39")}
                  </span>
                )}
              </span>

              {renderText(
                " If you hear 'can', you will likely activate words like 'candy' and 'candle' as well, at least during the earlier stages of word recognition. For bilingual people, this activation is not limited to a single language; auditory input activates corresponding words regardless of the language to which they belong.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Some of the most compelling evidence for this phenomenon, called 'language co-activation', comes from studying eye movements"
                )}
                {renderText("27,28")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("27,28")}
                  </span>
                )}
              </span>

              {renderText(
                " A Russian-English bilingual asked to 'pick up a marker' from a set of objects would look more at a stamp than someone who doesn't know Russian, because the Russian word for 'stamp', marka, sounds like the English word he or she heard, 'marker'. In cases like this, language co-activation occurs because what the listener hears could map onto words in either language."
              )}
            </p>

            <br />

            {/* Section C */}
            <h2 className="text-xl font-bold mb-3">{renderText("C")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Having to deal with this persistent linguistic competition can result in difficulties, however."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("40")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " For instance, knowing more than one language can cause speakers to name pictures more slowly, and can increase 'tip-of-the-tongue states', when you can almost, but not quite, bring a word to mind."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("34,40")}
                  </span>
                )}
              </span>
              {renderText(
                " As a result, the constant juggling of two languages creates a need to control how much a person accesses a language at any given time. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "  For this reason, bilingual people often perform better on tasks that require conflict management."
                )}
                {renderText("30")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("30")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In the classic Stroop Task, people see a word and are asked to name the colour of the word's font."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("29")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " When the colour and the word match (i.e., the word 'red' printed in red), people correctly name the colour more quickly than when the colour and the word don't match (i.e., the word 'red' printed in blue). This occurs because the word itself ('red') and its font colour (blue) conflict."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Bilingual people often excel at tasks such as this, which tap into the ability to ignore competing perceptual information and focus on the relevant aspects of the input. Bilinguals are also better at switching between two tasks; for example, when bilinguals have to switch from categorizing objects by colour (red or green) to categorizing them by shape (circle or triangle), they do so more quickly than monolingual people, reflecting better cognitive control when having to make rapid changes of strategy."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("31")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section D */}
            <h2 className="text-xl font-bold mb-3">{renderText("D")}</h2>
            <p className="text-lg">
              {renderText(
                "It also seems that the neurological roots of the bilingual advantage extend to brain areas more traditionally associated with sensory processing. When monolingual and bilingual adolescents listen to simple speech sounds without any intervening background noise, they show highly similar brain stem responses."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " When monolingual and bilingual adolescents listen to simple speech sounds without any intervening background noise, they show highly similar brain stem responses."
                )}{" "}
                {renderText(
                  " When researchers play the same sound to both groups in the presence of background noise, however, the bilingual listeners' neural response is considerably larger, reflecting better encoding of the sound's fundamental frequency, a feature of sound closely related to pitch perception."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("35,37")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section E */}
            <h2 className="text-xl font-bold mb-3">{renderText("E")}</h2>
            <p className="text-lg">
              {renderText(
                "Such improvements in cognitive and sensory processing may help a bilingual person to process information in the environment, and help explain why bilingual adults acquire a third language better than monolingual adults master a second language."
              )}
              {renderText(
                " This advantage may be rooted in the skill of focussing on information about the new language while reducing interference from the languages they already know."
              )}
            </p>

            <br />

            {/* Section F */}
            <h2 className="text-xl font-bold mb-3">{renderText("F")}</h2>
            <p className="text-lg">
              {renderText(
                "Research also indicates that bilingual experience may help to keep the cognitive mechanisms sharp by recruiting alternate brain networks to compensate for those that become damaged during aging. Older bilinguals enjoy improved memory relative to monolingual people, which can lead to real-world health benefits. In a study of over 200 patients with Alzheimer's disease, a degenerative brain disease, bilingual patients reported showing initial symptoms of the disease an average of five years later than monolingual patients."
              )}
              {renderText(
                " In a follow-up study, researchers compared the brains of bilingual and monolingual patients matched on the severity of Alzheimer's symptoms. Surprisingly, the bilinguals' brains had more physical signs of disease than their monolingual counterparts, even though their outward behaviour and abilities were the same."
              )}
              {renderText(
                " If the brain is an engine, bilingualism may help it to go farther on the same amount of fuel."
              )}
            </p>

            <br />

            {/* Section G */}
            <h2 className="text-xl font-bold mb-3">{renderText("G")}</h2>
            <p className="text-lg">
              {renderText(
                "Furthermore, the benefits associated with bilingual experience seem to start very early. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " In one study, researchers taught seven-month-old babies growing up in monolingual or bilingual homes that when they heard a tinkling sound, a puppet appeared on one side of a screen.Halfway through the study, the puppet began appearing on the opposite side of the screen.In order to get a reward, the infants had to adjust the rule they'd learned; only the bilingual babies were able to successfully learn the new rule."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("38")}
                  </span>
                )}
              </span>

              {renderText(
                " This suggests that for very young children, as well as for older people, navigating a multilingual environment imparts advantages that transfer far beyond language."
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

          <br />
          <div className="mb-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27-31")}
            </h2>
            <h3 className="text-lg mb-5">
              {renderText("Complete the table below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("NO MORE THAN TWO WORDS")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>
            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 27-31 on your answer sheet."
              )}
            </h1>
            <br />

            <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
              <tbody>
                <tr>
                  <th className="text-xl border p-2 font-bold">Test</th>
                  <th className="text-xl border p-2 font-bold">Findings</th>
                </tr>

                {/* Question 27 */}
                <tr>
                  <td className="border text-lg p-2 text-left">
                    {renderText("Observing the")}
                    <button
                      onClick={() => toggleButton(27)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[27]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      27
                    </button>
                    <input
                      value={userAnswers[27] || ""}
                      onChange={(e) => handleInputChange(27, e.target.value)}
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    {renderText(
                      "of Russian-English bilingual people when asked to select certain objects"
                    )}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    {renderText(
                      "Bilingual people engage both languages simultaneously: a mechanism known as"
                    )}
                    <button
                      onClick={() => toggleButton(28)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[28]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      28
                    </button>
                    <input
                      value={userAnswers[28] || ""}
                      onChange={(e) => handleInputChange(28, e.target.value)}
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>

                {/* Question 28 */}

                <tr>
                  <td className="border text-lg p-2 text-left">
                    {renderText("A test called the")}
                    <button
                      onClick={() => toggleButton(29)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[29]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      29
                    </button>
                    <input
                      value={userAnswers[29] || ""}
                      onChange={(e) => handleInputChange(29, e.target.value)}
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />{" "}
                    {renderText("focusing on naming colours")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    {renderText(
                      "Bilingual people are more able to handle tasks involving a skill called"
                    )}
                    <button
                      onClick={() => toggleButton(30)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[30]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      30
                    </button>
                    <input
                      value={userAnswers[30] || ""}
                      onChange={(e) => handleInputChange(30, e.target.value)}
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>

                {/* Question 29 */}
                <tr>
                  <td className="border text-lg p-2 text-left">
                    {renderText("A test involving switching between tasks")}
                  </td>
                  <td className="border text-lg p-2 text-left">
                    {renderText(
                      "When changing strategies, bilingual people have superior"
                    )}
                    <button
                      onClick={() => toggleButton(31)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                        activeButtons[31]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      31
                    </button>
                    <input
                      value={userAnswers[31] || ""}
                      onChange={(e) => handleInputChange(30, e.target.value)}
                      className="mx-1 w-[120px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 32-36")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?"
              )}{" "}
              <br /> <br />
              {renderText("In boxes 38-40 on your answer sheet, choose")}
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
              <h2 className="text-lg font-bold">Questions 32-36</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 32;
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
          <div>
            {/* Questions 37-40 */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 37-40")}
              </h1>

              <p>
                {renderText("Reading Passage 3 has seven paragraphs, A-G.")}
              </p>

              <p>
                {renderText(
                  "Which paragraph contains the following information?"
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-G, in boxes 37-40 on your answer sheet."
                )}
              </p>

              {/* ---------- Question 37 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("37.")}</span>
                {renderText(
                  "an example of how bilingual and monolingual people's brains respond differently to a certain type of non-verbal auditory input"
                )}
                <div className="relative w-40">
                  <select
                    value={userAnswers[37] || ""}
                    onChange={(e) => handleInputChange(37, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("37")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 38 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("38.")}</span>
                {renderText(
                  "a demonstration of how a bilingual upbringing has benefits even before we learn to speak"
                )}
                <div className="relative w-40">
                  <select
                    value={userAnswers[38] || ""}
                    onChange={(e) => handleInputChange(38, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("38")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 39 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("39.")}</span>
                {renderText(
                  "a description of the process by which people identify words that they hear"
                )}
                <div className="relative w-40">
                  <select
                    value={userAnswers[39] || ""}
                    onChange={(e) => handleInputChange(39, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("39")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 40 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("40.")}</span>
                {renderText(
                  "reference to some negative consequences of being bilingual"
                )}
                <div className="relative w-40">
                  <select
                    value={userAnswers[40] || ""}
                    onChange={(e) => handleInputChange(40, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("40")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
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
      <Reading2Pagination2017></Reading2Pagination2017>
    </div>
  );
};

export default Reading2Part32019;
