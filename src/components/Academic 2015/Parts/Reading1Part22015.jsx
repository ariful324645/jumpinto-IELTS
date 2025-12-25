import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading1Pagination2015 from "../Pagination 2015/Reading1Pagination2015";

//  Marks show

const Reading1Part22015 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
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
      const answerKey = qIndex + 38;
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

  const correctAnswers = {
    // =========== Questions 1–7 (Paragraph headings) ===========
    1: "i", // Paragraph A → The search for the reasons for an increase in population
    2: "ii", // Paragraph B → Industrialisation and the fear of unemployment
    3: "iii", // Paragraph C → The development of cities in Japan
    4: "iv", // Paragraph D → The time and place of the Industrial Revolution
    5: "v", // Paragraph E → The cases of Holland, France and China
    6: "vi", // Paragraph F → Changes in drinking habits in Britain
    7: "vii", // Paragraph G → Two keys to Britain's industrial revolution

    // =========== Questions 8–13 (TRUE / FALSE / NOT GIVEN) ===========
    8: "TRUE", // China's transport system was not suitable for industry in the 18th century
    9: "TRUE", // Tea and beer both helped to prevent dysentery in Britain
    10: "FALSE", // Roy Porter disagrees with Professor Macfarlane's findings
    11: "FALSE", // After 1740, there was a reduction in population in Britain
    12: "TRUE", // People in Britain used to make beer at home
    13: "TRUE", // The tax on malt indirectly caused a rise in the death rate
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

          <div>
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("EUROPEAN TRANSPORT SYSTEMS 1990-2010")}
            </h1>

            <p className="italic text-center mb-6">
              {renderText(
                "What have been the trends and what are the prospects for European transport systems?"
              )}
            </p>

            {/* A */}
            <p className="font-bold mb-1">{renderText("A")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "It is difficult to conceive of vigorous economic growth without an efficient transport system. Although modern information technologies can reduce the demand for physical transport by facilitating teleworking and teleservices, the requirement for transport continues to increase."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "There are two key factors behind this trend. For passenger transport, the determining factor is the spectacular growth in car use. The number of cars on European Union [EU] roads saw an increase of three million cars each year from 1990 to 2010, and in the next decade the EU will see a further substantial increase in its fleet."
              )}
            </p>

            {/* B */}
            <p className="font-bold mb-1">{renderText("B")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "As far as goods transport is concerned, growth is due to a large extent to changes in the European economy and its system of production. In the last 20 years, as internal frontiers have been abolished, the EU has moved from a 'stock' economy to a 'flow' economy."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "This phenomenon has been emphasised by the relocation of some industries, particularly those which are labour intensive, to reduce production costs, even though the production site is hundreds or even thousands of kilometres away from the final assembly plant or away from users."
              )}
            </p>

            {/* C */}
            <p className="font-bold mb-1">{renderText("C")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "The strong economic growth expected in countries which are candidates for entry to the EU will also increase transport flows, in particular road haulage traffic. In 1998, some of these countries already exported more than twice their 1990 volumes and imported more than five times their 1990 volumes."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "And although many candidate countries inherited a transport system which encourages rail, the distribution between modes has tipped sharply in favour of road transport since the 1990s. Between 1990 and 1998, road haulage increased by 19.4%, while during the same period rail haulage decreased by 43.5%, although - and this could benefit the enlarged EU - it is still on average at a much higher level than in existing member states."
              )}
            </p>

            {/* D */}
            <p className="font-bold mb-1">{renderText("D")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "However, a new imperative - sustainable development - offers an opportunity for adapting the EU's common transport policy. This objective, agreed by the Gothenburg European Council, has to be achieved by integrating environmental considerations into Community policies, and shifting the balance between modes of transport lies at the heart of its strategy."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "The ambitious objective can only be fully achieved by 2020, but proposed measures are nonetheless a first essential step towards a sustainable transport system which will ideally be in place in 30 years' time, that is by 2040."
              )}
            </p>

            {/* E */}
            <p className="font-bold mb-1">{renderText("E")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "In 1998, energy consumption in the transport sector was to blame for 28% of emissions of CO₂, the leading greenhouse gas. According to the latest estimates, if nothing is done to reverse the traffic growth trend, CO₂ emissions from transport can be expected to increase by around 50% to 1,113 billion tonnes by 2020, compared with the 739 billion tonnes recorded in 1990."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Once again, road transport is the main culprit since it alone accounts for 84% of the CO₂ emissions attributable to transport. Using alternative fuels and improving energy efficiency is thus both an ecological necessity and a technological challenge."
              )}
            </p>

            {/* F */}
            <p className="font-bold mb-1">{renderText("F")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "At the same time greater efforts must be made to achieve a modal shift. Such a change cannot be achieved overnight, all the less so after over half a century of constant deterioration in favour of road. This has reached such a pitch that today rail freight services are facing marginalisation, with just 8% of market share, and with international goods trains struggling along at an average speed of 18km/h. Three possible options have emerged."
              )}
            </p>

            {/* G */}
            <p className="font-bold mb-1">{renderText("G")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "The first approach would consist of focusing on road transport solely through pricing. This option would not be accompanied by complementary measures in the other modes of transport. In the short term it might curb the growth in road transport through the better loading ratio of goods vehicles and occupancy rates of passenger vehicles expected as a result of the increase in the price of transport."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "However, the lack of measures available to revitalise other modes of transport would make it impossible for more sustainable modes of transport to take up the baton."
              )}
            </p>

            {/* H */}
            <p className="font-bold mb-1">{renderText("H")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "The second approach also concentrates on road transport pricing but is accompanied by measures to increase the efficiency of the other modes [better quality of services, logistics, technology]. However, this approach does not include investment in new infrastructure, nor does it guarantee better regional cohesion."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "It could help to achieve greater uncoupling than the first approach, but road transport would keep the lion's share of the market and continue to concentrate on saturated arteries, despite being the most polluting of the modes. It is therefore not enough to guarantee the necessary shift of the balance."
              )}
            </p>

            {/* I */}
            <p className="font-bold mb-1">{renderText("I")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "The third approach, which is not new, comprises a series of measures ranging from pricing to revitalising alternative modes of transport and targeting investment in the trans-European network. This integrated approach would allow the market shares of the other modes to return to their 1998 levels and thus make a shift of balance."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "It is far more ambitious than it looks, bearing in mind the historical imbalance in favour of roads for the last fifty years, but would achieve a marked break in the link between road transport growth and economic growth, without placing restrictions on the mobility of people and goods."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 14–21 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 14–21")}
            </h2>

            <p>{renderText("Reading Passage 2 has nine paragraphs, A–I.")}</p>

            <p>
              {renderText(
                "Choose the correct heading for each paragraph from the list of headings below."
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct number, i–xi, in boxes 14–21 on your answer sheet."
              )}
            </p>

            {/* -------- List of Headings -------- */}
            <div className="border border-black p-5 max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                {renderText("List of Headings")}
              </h3>

              <ul className="space-y-1 text-lg">
                <li>{renderText("i. A fresh and important long-term goal")}</li>
                <li>
                  {renderText(
                    "ii. Charging for roads and improving other transport methods"
                  )}
                </li>
                <li>
                  {renderText(
                    "iii. Changes affecting the distances goods may be transported"
                  )}
                </li>
                <li>
                  {renderText(
                    "iv. Taking all the steps necessary to change transport patterns"
                  )}
                </li>
                <li>
                  {renderText("v. The environmental costs of road transport")}
                </li>
                <li>
                  {renderText("vi. The escalating cost of rail transport")}
                </li>
                <li>
                  {renderText("vii. The need to achieve transport rebalance")}
                </li>
                <li>
                  {renderText("viii. The rapid growth of private transport")}
                </li>
                <li>
                  {renderText("ix. Plans to develop major road networks")}
                </li>
                <li>
                  {renderText(
                    "x. Restricting road use through charging policies alone"
                  )}
                </li>
                <li>
                  {renderText(
                    "xi. Transport trends in countries awaiting EU admission"
                  )}
                </li>
              </ul>
            </div>

            {/* -------- Questions 14–21 Dropdowns -------- */}
            {[
              { q: 14, text: "Paragraph A" },
              { q: 15, text: "Paragraph B" },
              { q: 16, text: "Paragraph C" },
              { q: 17, text: "Paragraph D" },
              { q: 18, text: "Paragraph E" },
              { q: 19, text: "Paragraph F" },
              { q: 20, text: "Paragraph G" },
              { q: 21, text: "Paragraph H" },
              //   { q: 22, text: "Paragraph I" }, // Actually box 21, keep consistent with numbering
            ].map(({ q, text }) => (
              <p key={q} className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-lg">{renderText(`${q}.`)}</span>
                <span>{renderText(text)}</span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                  >
                    <option value="">{q}</option>
                    {[
                      "i",
                      "ii",
                      "iii",
                      "iv",
                      "v",
                      "vi",
                      "vii",
                      "viii",
                      "ix",
                      "x",
                      "xi",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}

            {/* ================= Questions 22–26 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 22–26")}
            </h2>

            <p>
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 2?"
              )}
            </p>

            <p>{renderText("In boxes 22–26 on your answer sheet, choose")}</p>

            <ul className="ml-6 text-lg space-y-1">
              <li>
                <strong>TRUE</strong> –{" "}
                {renderText("if the statement agrees with the information")}
              </li>
              <li>
                <strong>FALSE</strong> –{" "}
                {renderText("if the statement contradicts the information")}
              </li>
              <li>
                <strong>NOT GIVEN</strong> –{" "}
                {renderText("if there is no information on this")}
              </li>
            </ul>

            {/* -------- Questions 22–26 YES/NO/NG -------- */}
            {[
              {
                q: 22,
                text: "The need for transport is growing, despite technological developments.",
              },
              {
                q: 23,
                text: "To reduce production costs, some industries have been moved closer to their relevant consumers.",
              },
              {
                q: 24,
                text: "Cars are prohibitively expensive in some EU candidate countries.",
              },
              {
                q: 25,
                text: "The Gothenburg European Council was set up 30 years ago.",
              },
              {
                q: 26,
                text: "By the end of this decade, CO₂ emissions from transport are predicted to reach 739 billion tonnes.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-6 ml-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() => handleInputChange(q, opt)}
                        className="radio radio-primary"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Reading1Pagination2015></Reading1Pagination2015>
    </div>
  );
};

export default Reading1Part22015;
