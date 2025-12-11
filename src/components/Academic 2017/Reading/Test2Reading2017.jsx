import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

const Test2Reading2017 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
const questions = [
  "Which problem affects farmers with small farms in developing countries? (Q10)",
  "Which problem affects farmers with small farms in developing countries? (Q11)",
  "What action is recommended for improving conditions for farmers? (Q12)",
  "What action is recommended for improving conditions for farmers? (Q13)",
];

const options = [
  [
    "A. Lack of demand for locally produced food",
    "B. The effects of changing weather patterns", // correct
    "C. Having to sell their goods to intermediary buyers",
  ],

  [
    "A. Lack of irrigation programmes",
    "B. Being unable to get insurance",
    "C. Having to sell their goods to intermediary buyers", // correct
  ],

  [
    "A. Reducing the size of food stocks",
    "B. Organising co-operation between a wide range of interested parties", // correct
    "C. Making customers aware of the reasons for changing food prices",
  ],

  [
    "A. Encouraging consumers to take a financial stake in farming",
    "B. Attempting to ensure that prices rise at certain times of the year",
    "C. Making customers aware of the reasons for changing food prices", // correct
  ],
];


  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
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
      const answerKey = qIndex + 10;
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };
  // marks show
 const correctAnswers = {
   // Questions 1–3 (Paragraph Matching)
   1: "A", // characteristics that only apply to food production
   2: "B", // challenges faced only by farmers in some regions
   3: "H", // difficulties in co-operation between farmers

   // Questions 4–9 (People Matching)
   4: "D", // Rokeya Kabir
   5: "F", // Giel Ton
   6: "C", // Shenggen Fan
   7: "G", // Sonali Bisht
   8: "B", // Sophia Murphy
   9: "A", // Kanayo F. Nwanze

   // Questions 10–13 (MCQs)
   10: "B. The effects of changing weather patterns",
   11: "C. Having to sell their goods to intermediary buyers",
   12: "B. Organising co-operation between a wide range of interested parties",
   13: "C. Making customers aware of the reasons for changing food prices",
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
    localStorage.setItem("/reading1Part32020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/reading1Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part32020");
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
            <h1 className="text-xl font-bold">{renderText("PASSAGE 1")}</h1>
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
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 1-13")}
              </span>
              {renderText(", which are based on Reading Passage 1 below.")}
            </h1>
          </div>
          {/* left text */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "The risks agriculture faces in developing countries"
              )}
            </h1>
            <h1 className="text-lg font-bold italic text-center mt-3">
              {renderText("Synthesis of an online debate")}
            </h1>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("A")}</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Two things distinguish food production from all other productive activities: first, every single person needs food each day and has a right to it; and second, it is hugely dependent on nature."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                " These two unique aspects, one political, the other natural, make food production highly vulnerable and different from any other business. At the same time, cultural values are highly entrenched in food and agricultural systems worldwide."
              )}
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("B")}</h1>
              {renderText(
                "Farmers everywhere face major risks, including extreme weather, long-term climate change, and price volatility in input and product markets."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However, smallholder farmers in developing countries must in addition deal with adverse environments, both natural, in terms of soil quality, rainfall, etc., and human, in terms of infrastructure, financial systems, markets, knowledge and technology."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                " Counter-intuitively, hunger is prevalent among many smallholder farmers in the developing world."
              )}
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("C")}</h1>
              {renderText(
                "Participants in the online debate argued that our biggest challenge is to address the underlying causes of the agricultural system's inability to ensure sufficient food for all, and they identified as drivers of this problem our dependency on fossil fuels and unsupportive government policies."
              )}
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("D")}</h1>
              {renderText(
                "On the question of mitigating the risks farmers face, most essayists called for greater state intervention."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In his essay, Kanayo F. Nwanze, President of the International Fund for Agricultural Development, argued that governments can significantly reduce risks for farmers by providing basic services like roads to get produce more efficiently to markets, or water and food storage facilities to reduce losses."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
                {renderText(
                  "Sophia Murphy, senior advisor to the Institute for Agriculture and Trade Policy, suggested that the procurement and holding of stocks by governments can also help mitigate wild swings in food prices by alleviating uncertainties about market supply."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("8")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <h1 className="text-lg font-bold my-3">{renderText("E")}</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Shenggen Fan, Director General of the International Food Policy Research Institute, held up social safety nets and public welfare programmes in Ethiopia, Brazil and Mexico as valuable ways to address poverty among farming families and reduce their vulnerability to agriculture shocks."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
              {renderText(
                "However, some commentators responded that cash transfers to poor families do not necessarily translate into increased food security, as these programmes do not always strengthen food production or raise incomes.Regarding state subsidies for agriculture, Rokeya Kabir, Executive Director of Bangladesh Nari Progati Sangha, commented in her essay that these have not compensated for the stranglehold exercised by private traders"
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "In fact, studies show that sixty percent of beneficiaries of subsidies are not poor, but rich landowners and non-farmer traders."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("F")}</h1>
              {renderText(
                "Nwanze, Murphy and Fan argued that private risk management tools, like private insurance, commodity futures markets, and rural finance can help small-scale producers mitigate risk and allow for investment in improvements.Kabir warned that financial support schemes often encourage the adoption of high-input agricultural practices, which in the medium term may raise production costs beyond the value of their harvests.Murphy noted that when futures markets become excessively financialised they can contribute to short-term price volatility, which increases farmers' food insecurity.Many participants and commentators emphasised that greater transparency in markets is needed to mitigate the impact of volatility, and make evident whether adequate stocks and supplies are available.Others contended that agribusiness companies should be held responsible for paying for negative side effects."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Kabir warned that financial support schemes often encourage the adoption of high-input agricultural practices, which in the medium term may raise production costs beyond the value of their harvests."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("F1")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("G")}</h1>{" "}
              {renderText(
                "Many essayists mentioned climate change and its consequences for small-scale agriculture."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Fan explained that in addition to reducing crop yields, climate change increases the magnitude and the frequency of extreme weather events, which increase smallholder vulnerability."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The growing unpredictability of weather patterns increases farmers' difficulty in managing weather-related risks.According to this author, one solution would be to develop crop varieties that are more resilient to new climate trends and extreme weather patterns.Accordingly, Pat Mooney, co-founder and executive director of the ETC Group, suggested that if we are to survive climate change, we must adopt policies that let peasants diversify the plant and animal species and varieties / breeds that make up our menus.'"
              )}
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("H")}</h1>{" "}
              {renderText(
                "Some participating authors and commentators argued in favour of community-based and autonomous risk management strategies through collective action groups, co-operatives or producers' groups.Such groups enhance market opportunities for small-scale producers, reduce marketing costs and synchronise buying and selling with seasonal price conditions."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "According to Murphy, collective action offers an important way for farmers to strengthen their political and economic bargaining power, and to reduce their business risks"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
                {renderText(
                  "One commentator, Giel Ton, warned that collective action does not come as a free good.It takes time, effort and money to organise, build trust and to experiment"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
                {renderText(
                  "Others, like Marcel Vernooij and Marcel Beukeboom, suggested that in order to apply what we already know, all stakeholders, including business, government, scientists and civil society, must work together, starting at the beginning of the value chain"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {" "}
              <h1 className="text-lg font-bold my-3">{renderText("I")}</h1>{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Some participants explained that market price volatility is often worsened by the presence of intermediary purchasers who, taking advantage of farmers' vulnerability, dictate prices."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>
              {renderText(
                "One commentator suggested farmers can gain greater control over prices and minimise price volatility by selling directly to consumers."
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Similarly, Sonali Bisht, founder and advisor to the Institute of Himalayan Environmental Research and Education (INHERE), India, wrote that community-supported agriculture, where consumers invest in local farmers by subscription and guarantee producers a fair price, is a risk-sharing model worth more attention.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7,13")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "Direct food distribution systems not only encourage small-scale agriculture but also give consumers more control over the food they consume, she wrote"
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
            <h1 className="text-lg font-bold">{renderText("Questions 1-3")}</h1>

            <p>{renderText("Reading Passage 1 has nine paragraphs, A-I.")}</p>

            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-I, in boxes 1-3 on your answer sheet."
              )}
            </p>

            {/* Questions 1-3 */}
            {[
              "a reference to characteristics that only apply to food production",
              " a reference to challenges faced only by farmers in certain parts of the world",
              " a reference to difficulties in bringing about co-operation between farmers.",
            ].map((text, idx) => (
              <p key={idx} className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">
                  {renderText(idx + 1 + ".")}
                </span>
                <span>{renderText(text)}</span>
                <div className="relative w-40">
                  <select
                    value={userAnswers[idx + 1] || ""}
                    onChange={(e) => handleInputChange(idx + 1, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("Select")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                    <option value="G">{renderText("G")}</option>
                    <option value="H">{renderText("H")}</option>
                    <option value="I">{renderText("I")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}

            <h1 className="text-lg font-bold mt-6">
              {renderText("Questions 4-9")}
            </h1>

            <p>
              {renderText(
                "Look at the following statements (Questions 4-9) and the list of people below."
              )}
            </p>
            <p>
              {renderText("Match each statement with the correct person, A-G.")}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A-G, next to Questions 4-9."
              )}
            </p>
            <p>{renderText("NB You may use any letter more than once.")}</p>

            {/* List of People */}
            <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
              <div className="text-center">
                <h1 className="text-xl font-bold mb-5">List of People</h1>
                <ul className="space-y-1 text-lg">
                  <li>{renderText("A. Kanayo F. Nwanze")}</li>
                  <li>{renderText("B. Sophia Murphy")}</li>
                  <li>{renderText("C. Shenggen Fan")}</li>
                  <li>{renderText("D. Rokeya Kabir")}</li>
                  <li>{renderText("E. Pat Mooney")}</li>
                  <li>{renderText("F. Giel Ton")}</li>
                  <li>{renderText("G. Sonali Bisht")}</li>
                </ul>
              </div>
            </div>

            {/* Questions 4–9 */}
            {[
              "Financial assistance from the government does not always go to the farmers who most need it.",
              "Farmers can benefit from collaborating as a group.",
              "Financial assistance from the government can improve the standard of living of farmers.",
              "Farmers may be helped if there is financial input by the same individuals who buy from them.",
              "Governments can help to reduce variation in prices.",
              "Improvements to infrastructure can have a major impact on risk for farmers.",
            ].map((text, idx) => (
              <p key={idx} className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">
                  {renderText(idx + 4 + ".")}
                </span>
                <span>{renderText(text)}</span>
                <div className="relative w-40">
                  <select
                    value={userAnswers[idx + 4] || ""}
                    onChange={(e) => handleInputChange(idx + 4, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("Select")}</option>
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
            ))}
          </div>

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 10-13")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold">
                {" "}
                {renderText("  A, B , C or D")}
              </span>
              .
            </p>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 10;

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
      {/* <Reading2Pagination2018></Reading2Pagination2018> */}
    </div>
  );
};

export default Test2Reading2017;
