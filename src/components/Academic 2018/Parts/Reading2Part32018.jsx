import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading2Pagination2018 from "../Pagination2018/Reading2Pagination2018";

const Readign2Part32018 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
const questions = [
  "In the first paragraph, the writer says that most managers",
  "According to the third paragraph, Coach was anxious to",
  "What point is made about Tesco's Greener Living programme?",
  "What does the writer suggest about Nike's strategy?",
  "What was original about the ME2?",
];

const options = [
  [
    "A. fail to spot the key consumer trends of the moment.",
    "B. make the mistake of focusing only on the principal consumer trends.",
    "C. misinterpret market research data relating to current consumer trends.",
    "D. are unaware of the significant impact that trends have on consumers' lives.",
  ],

  [
    "A. follow what some of its competitors were doing.",
    "B. maintain its prices throughout its range.",
    "C. safeguard its reputation as a manufacturer of luxury goods.",
    "D. modify the entire look of its brand to suit the economic climate.",
  ],

  [
    "A. It did not require Tesco to modify its core business activities.",
    "B. It succeeded in attracting a more eco-conscious clientele.",
    "C. Its main aim was to raise consumers' awareness of environmental issues.",
    "D. It was not the first time that Tesco had implemented such an initiative.",
  ],

  [
    "A. It was an extremely risky strategy at the time.",
    "B. It was a strategy that only a major company could afford to follow.",
    "C. It was the type of strategy that would not have been possible in the past.",
    "D. It was the kind of strategy which might appear to have few obvious benefits.",
  ],

  [
    "A. It contained technology that had been developed for the sports industry.",
    "B. It appealed to young people who were keen to improve their physical fitness.",
    "C. It took advantage of a current trend for video games with colourful 3D graphics.",
    "D. It was a handheld game that addressed people's concerns about unhealthy lifestyles.",
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
      const answerKey = qIndex + 27;
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
  // Questions 27-31
  27: "A. fail to spot the key consumer trends of the moment.", //
  28: "C. safeguard its reputation as a manufacturer of luxury goods.", //
  29: "A. it did not require Tesco to modify its core business activities.", //
  30: "D. It was the kind of strategy which might appear to have few obvious benefits.", //
  31: "D. It was a handheld game that addressed people's concerns about unhealthy lifestyles.", //

  // Questions 32-37 (Companies)
  32: "D", // iToys
  33: "C", // Nike
  34: "B", // Tesco
  35: "A", // Coach
  36: "C", // Nike
  37: "A", // Coach

  // Questions 38-40 (Innovation Strategies)
  38: "A", // employ a combination of strategies to maintain your consumer base
  39: "C", // emphasise your brand's traditional values with the counteract-and-reaffirm strategy
  40: "D", // use the combine-and-transcend strategy to integrate the two worlds
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
          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 27-40")}
              </span>
              {renderText(", which are based on Reading Passage 1 below.")}
            </h1>
          </div>
          {/* left text */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("MAKING THE MOST OF TRENDS")}
            </h1>
            <h1 className="text-lg font-bold italic text-center mt-3">
              {renderText(
                "Experts from Harvard Business School give advice to managers. "
              )}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Most managers can identify the major trends of the day."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "But in the course of conducting research in a number of industries and working directly with companies, we have discovered that managers often fail to recognize the less obvious but profound ways these trends are influencing consumers' aspirations, attitudes, and behaviors."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                "This is especially true of trends that managers view as peripheral to their core markets."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "Many ignore trends in their innovation strategies or adopt a wait-and-see approach and let competitors take the lead. At a minimum, such responses mean missed profit opportunities. At the extreme, they can jeopardize a company by ceding to rivals the opportunity to transform the industry."
              )}
              {renderText(
                "The purpose of this article is twofold: to spur managers to think more expansively about how trends could engender new value propositions in their core markets, and to provide some high-level advice on how to make market research and product development personnel more adept at analyzing and exploiting trends."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "One strategy, known as 'infuse and augment', is to design a product or service that retains most of the attributes and functions of existing products in the category but adds others that address the needs and desires unleashed by a major trend."
              )}
              {renderText(
                "A case in point is the Poppy range of handbags, which the firm Coach created in response to the economic downturn of 2008. The Coach brand had been a symbol of opulence and luxury for nearly 70 years, and the most obvious reaction to the downturn would have been to lower prices."
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However, that would have risked cheapening the brand's image."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Instead, they initiated a consumer-research project which revealed that customers were eager to lift themselves and the country out of tough times."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
              {renderText(
                "Using these insights, Coach launched the lower-priced Poppy handbags, which were in vibrant colors, and looked more youthful and playful than conventional Coach products.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Creating the sub-brand allowed Coach to avert an across-the-board price cut."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "In contrast to the many companies that responded to the recession by cutting prices, Coach saw the new consumer mindset as an opportunity for innovation and renewal."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "A further example of this strategy was supermarket Tesco's response to consumers' growing concerns about the environment. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "With that in mind, Tesco, one of the world's top five retailers, introduced its Greener Living program, which demonstrates the company's commitment to protecting the environment by involving consumers in ways that produce tangible results."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "For example, Tesco customers can accumulate points for such activities as reusing bags, recycling cans and printer cartridges, and buying home-insulation materials."
              )}
              {renderText(
                "Like points earned on regular purchases, these green points can be redeemed for cash. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Tesco has not abandoned its traditional retail offerings but augmented its business with these innovations, thereby infusing its value proposition with a green streak."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "This approach infused its value proposition with a green streak."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "A more radical strategy is 'combine and transcend'. This entails combining aspects of the product's existing value proposition with attributes addressing changes arising from a trend, to create a novel experience - one that may land the company in an entirely new market space."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "At first glance, spending resources to incorporate elements of a seemingly irrelevant trend into one's core offerings sounds like it's hardly worthwhile."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "But consider Nike's move to integrate the digital revolution into its reputation for high-performance athletic footwear."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " In 2006, they teamed up with technology company Apple to launch Nike+, a digital sports kit comprising a sensor that attaches to the running shoe and a wireless receiver that connects to the user's iPod."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "By combining Nike's original value proposition for amateur athletes with one for digital consumers, the Nike+ sports kit and web interface moved the company from a focus on athletic apparel to a new plane of engagement with its customers."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "A third approach, known as 'counteract and reaffirm', involves developing products or services that stress the values traditionally associated with the category in ways that allow consumers to oppose - or at least temporarily escape from - the aspects of trends they view as undesirable."
              )}
              {renderText(
                "A product that accomplished this is the ME2, a video game created by Canada's iToys."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " By reaffirming the toy category's association with physical play, the ME2 counteracted some of the widely perceived negative impacts of digital gaming devices."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
              {renderText(
                "Like other handheld games, the device featured a host of exciting interactive games, a full-color LCD screen, and advanced 3D graphics."
              )}
              {renderText(
                "What set it apart was that it incorporated the traditional physical component of children's play: it contained a pedometer, which tracked and awarded points for physical activity (walking, running, biking, skateboarding, climbing stairs).The child could use the points to enhance various virtual skills needed for the video game. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The ME2, introduced in mid-2008, catered to kids' huge desire to play video games while countering the negatives, such as associations with lack of exercise and obesity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Once you have gained perspective on how trend-related changes in consumer opinions and behaviors impact on your category, you can determine which of our three innovation strategies to pursue."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "When your category's basic value proposition continues to be meaningful for consumers influenced by the trend, the infuse-and-augment strategy will allow you to reinvigorate the category."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "If analysis reveals an increasing disparity between your category and consumers' new focus, your innovations need to transcend the category to integrate the two worlds."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Finally, if aspects of the category clash with undesired outcomes of a trend, such as associations with unhealthy lifestyles, there is an opportunity to counteract those changes by reaffirming the core values of your category."
                )}{" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
              {renderText(
                "Trends - technological, economic, environmental, social, or political - that affect how people perceive the world around them and shape what they expect from products and services present firms with unique opportunities for growth."
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

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 27-31")}
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
              const answerKey = qIndex + 27;

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
          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 32-40")}
            </h1>

            <p>
              {renderText(
                "Look at the following statements (Questions 32-40) and the list of companies below."
              )}
            </p>

            <p>
              {renderText(
                "Match each statement with the correct company, A-D (for 32-37) or complete each sentence with the correct ending, A-D (for 38-40)."
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct letter in boxes 32-40 on your answer sheet. NB: You may use any letter more than once."
              )}
            </p>

            <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
              <div className="text-center">
                <h1 className="text-xl font-bold mb-5">List of Companies</h1>
                <ul className="space-y-1 text-lg">
                  <li>{renderText("A. Coach")}</li>
                  <li>{renderText("B. Tesco")}</li>
                  <li>{renderText("C. Nike")}</li>
                  <li>{renderText("D. iToys")}</li>
                </ul>
              </div>
            </div>

            {/* ---------- Questions 32-37: Companies ---------- */}
            {[
              "32. It turned the notion that its products could have harmful effects to its own advantage.",
              "33. It extended its offering by collaborating with another manufacturer.",
              "34. It implemented an incentive scheme to demonstrate its corporate social responsibility.",
              "35. It discovered that customers had a positive attitude towards dealing with difficult circumstances.",
              "36. It responded to a growing lifestyle trend in an unrelated product sector.",
              "37. It successfully avoided having to charge its customers less for its core products.",
            ].map((text, idx) => (
              <p key={idx} className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">
                  {renderText(32 + idx + ".")}
                </span>
                <span>{renderText(text)}</span>
                <div className="relative w-40">
                  <select
                    value={userAnswers[32 + idx] || ""}
                    onChange={(e) =>
                      handleInputChange(32 + idx, e.target.value)
                    }
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("Select")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}

            {/* ---------- Questions 38-40: Innovation Strategies ---------- */}
            <div className="flex items-center justify-center border border-black py-4 px-4 w-64 mx-auto">
              <div className="text-center">
                <h1 className="text-xl font-bold mb-5">
                  Innovation Strategies
                </h1>
                <ul className="space-y-1 text-lg">
                  <li>
                    {renderText(
                      "A. employ a combination of strategies to maintain your consumer base."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "B. identify the most appropriate innovation strategy to use."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "C. emphasise your brand's traditional values with the counteract-and-reaffirm strategy."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "D. use the combine-and-transcend strategy to integrate the two worlds."
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {[
              "38. If there are any trend-related changes impacting on your category, you should",
              "39. If a current trend highlights a negative aspect of your category, you should",
              "40. If the consumers' new focus has an increasing lack of connection with your offering, you should",
            ].map((text, idx) => (
              <p key={idx} className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">
                  {renderText(38 + idx + ".")}
                </span>
                <span>{renderText(text)}</span>
                <div className="relative w-40">
                  <select
                    value={userAnswers[38 + idx] || ""}
                    onChange={(e) =>
                      handleInputChange(38 + idx, e.target.value)
                    }
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("Select")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}
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
      <Reading2Pagination2018></Reading2Pagination2018>
    </div>
  );
};

export default Readign2Part32018;
