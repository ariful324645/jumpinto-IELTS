import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading4Pagination2015 from "../Pagination 2015/Reading4Pagination2015";

//  Marks show

const Test4Reading2015 = () => {
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
    // =========== Questions 1–6 (Wildfires notes) ===========
    1: "more unpredictably", // movement
    2: "greater on average than two decades ago", // size of fires
    3: "average", // rainfall
    4: "increase in yearly temperature", // more brush to act as
    5: "extended fire", // extended fire
    6: "in vulnerable places", // more building of

    // =========== Questions 7–13 (TRUE / FALSE / NOT GIVEN) ===========
    7: "TRUE", // The amount of open space in California has diminished over the last ten years
    8: "FALSE", // Many experts believe California has made little progress → incorrect, they have made progress
    9: "TRUE", // Personnel in the past have been criticised for mishandling fire containment
    10: "TRUE", // California has replaced a range of firefighting tools
    11: "NOT GIVEN", // More firefighters hired → not explicitly mentioned
    12: "FALSE", // Citizens and government groups disapprove → incorrect, coordination praised
    13: "FALSE", // Randy Jacobs believes loss of life will no longer be the same → FALSE
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

          <div>
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("The megafires of California")}
            </h1>
            <p className="italic text-center mb-6">
              {renderText(
                "Drought, housing expansion, and oversupply of tinder make for bigger, hotter fires in the western United States"
              )}
            </p>

            {/* Paragraph A */}
            <p className="font-bold mb-1">{renderText("A")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Wildfires are becoming an increasing menace in the western United States, with Southern California being the hardest hit area. There's a reason fire squads battling more frequent blazes in Southern California are having such difficulty containing the flames, despite better preparedness than ever and decades of experience fighting fires fanned by the 'Santa Ana Winds'. The wildfires themselves, experts say, are generally hotter, faster, and spread more erratically than in the past."
              )}
            </p>

            {/* Paragraph B */}
            <p className="font-bold mb-1">{renderText("B")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Megafires, also called 'siege fires', are the increasingly frequent blazes that burn 500,000 acres or more - 10 times the size of the average forest fire of 20 years ago. Some recent wildfires are among the biggest ever in California in terms of acreage burned, according to state figures and news reports."
              )}
            </p>

            {/* Paragraph C */}
            <p className="font-bold mb-1">{renderText("C")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "One explanation for the trend to more superhot fires is that the region, which usually has dry summers, has had significantly below normal precipitation in many recent years. Another reason, experts say, is related to the century-long policy of the US Forest Service to stop wildfires as quickly as possible. The unintentional consequence has been to halt the natural eradication of underbrush, now the primary fuel for megafires."
              )}
            </p>

            {/* Paragraph D */}
            <p className="font-bold mb-1">{renderText("D")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Three other factors contribute to the trend, they add. First is climate change, marked by a 1-degree Fahrenheit rise in average yearly temperature across the western states. Second is fire seasons that on average are 78 days longer than they were 20 years ago. Third is increased construction of homes in wooded areas."
              )}
            </p>

            {/* Paragraph E */}
            <p className="font-bold mb-1">{renderText("E")}</p>
            <p className="text-lg mb-5">
              {renderText(
                '"We are increasingly building our homes in fire-prone ecosystems," says Dominik Kulakowski, adjunct professor of biology at Clark University Graduate School of Geography in Worcester, Massachusetts. "Doing that in many of the forests of the western US is like building homes on the side of an active volcano."'
              )}
            </p>

            {/* Paragraph F */}
            <p className="font-bold mb-1">{renderText("F")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "In California, where population growth has averaged more than 600,000 a year for at least a decade, more residential housing is being built. 'What once was open space is now residential homes providing fuel to make fires burn with greater intensity,' says Terry McHale of the California Department of Forestry firefighters' union. 'With so much dryness, so many communities to catch fire, so many fronts to fight, it becomes an almost incredible job.'"
              )}
            </p>

            {/* Paragraph G */}
            <p className="font-bold mb-1">{renderText("G")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "That said, many experts give California high marks for making progress on preparedness in recent years, after some of the largest fires in state history scorched thousands of acres, burned thousands of homes, and killed numerous people. Stung in the past by criticism of bungling that allowed fires to spread when they might have been contained, personnel are meeting the peculiar challenges of neighborhood- and canyon-hopping fires better than previously, observers say."
              )}
            </p>

            {/* Paragraph H */}
            <p className="font-bold mb-1">{renderText("H")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "State promises to provide more up-to-date engines, planes, and helicopters to fight fires have been fulfilled. Firefighters' unions that in the past complained of dilapidated equipment, old fire engines, and insufficient blueprints for fire safety are now praising the state's commitment, noting that funding for firefighting has increased, despite huge cuts in many other programs. 'We are pleased that the current state administration has been very proactive in its support of us, and [has] come through with budgetary support of the infrastructure needs we have long sought,' says Mr. McHale of the firefighters' union."
              )}
            </p>

            {/* Paragraph I */}
            <p className="font-bold mb-1">{renderText("I")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Besides providing money to upgrade the fire engines that must traverse the mammoth state and wind along serpentine canyon roads, the state has invested in better command-and-control facilities as well as in the strategies to run them. 'In the fire sieges of earlier years, we found that other jurisdictions and states were willing to offer mutual-aid help, but we were not able to communicate adequately with them,' says Kim Zagaris, chief of the state's Office of Emergency Services Fire and Rescue Branch. After a commission examined and revamped communications procedures, the statewide response 'has become far more professional and responsive,' he says. There is a sense among both government officials and residents that the speed, dedication, and coordination of firefighters from several states and jurisdictions are resulting in greater efficiency than in past 'siege fire' situations."
              )}
            </p>

            {/* Paragraph J */}
            <p className="font-bold mb-1">{renderText("J")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "In recent years, the Southern California region has improved building codes, evacuation procedures, and procurement of new technology. 'I am extraordinarily impressed by the improvements we have witnessed,' says Randy Jacobs, a Southern California-based lawyer who has had to evacuate both his home and business to escape wildfires. 'Notwithstanding all the damage that will continue to be caused by wildfires, we will no longer suffer the loss of life endured in the past because of the fire prevention and firefighting measures that have been put in place,' he says."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 1–6 ================= */}
            <h2 className="text-lg font-bold">{renderText("Questions 1–6")}</h2>

            <p>
              {renderText(
                "Complete the notes below. Choose ONE WORD AND/OR A NUMBER from the passage for each answer. Write your answers in boxes 1–6 on your answer sheet."
              )}
            </p>

            {/* -------- Questions 1–6 Input Fields -------- */}
            <div className="border p-5 space-y-4 max-w-xl mx-auto">
              <h2 className="text-lg font-bold text-center">
                {renderText("Wildfires")}
              </h2>
              <p className="font-medium">
                {renderText(
                  "Characteristics of wildfires and wildfire conditions today compared to the past:"
                )}
              </p>

              <p>{renderText("occurrence: more frequent")}</p>
              <p>{renderText("temperature: hotter")}</p>
              <p>{renderText("speed: faster")}</p>

              <div className="flex items-center gap-2">
                <span>{renderText("movement:")}</span>
                <input
                  type="text"
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-1 w-20"
                  placeholder="1"
                />
                <span>{renderText("more unpredictably")}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>{renderText("size of fires:")}</span>
                <input
                  type="text"
                  value={userAnswers[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-1 w-20"
                  placeholder="2"
                />
                <span>
                  {renderText("greater on average than two decades ago")}
                </span>
              </div>

              <p className="mt-4 font-medium">
                {renderText(
                  "Reasons wildfires cause more damage today compared to the past:"
                )}
              </p>

              <div className="flex items-center gap-2">
                <span>{renderText("rainfall:")}</span>
                <input
                  type="text"
                  value={userAnswers[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-1 w-20"
                  placeholder="3"
                />
                <span>{renderText("average")}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>{renderText("more brush to act as")}</span>
                <input
                  type="text"
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-1 w-20"
                  placeholder="4"
                />
                <span>{renderText("increase in yearly temperature")}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>{renderText("extended fire")}</span>
                <input
                  type="text"
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-1 w-20"
                  placeholder="5"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>{renderText("more building of")}</span>
                <input
                  type="text"
                  value={userAnswers[6] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 py-1 w-20"
                  placeholder="6"
                />
                <span>{renderText("in vulnerable places")}</span>
              </div>
            </div>

            {/* ================= Questions 7–13 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 7–13")}
            </h2>

            <p>
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1? In boxes 7–13 on your answer sheet, choose"
              )}
            </p>

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

            {/* -------- Questions 7–13 Radio Buttons -------- */}
            {[
              {
                q: 7,
                text: "The amount of open space in California has diminished over the last ten years.",
              },
              {
                q: 8,
                text: "Many experts believe California has made little progress in readying itself to fight fires.",
              },
              {
                q: 9,
                text: "Personnel in the past have been criticised for mishandling fire containment.",
              },
              {
                q: 10,
                text: "California has replaced a range of firefighting tools.",
              },
              {
                q: 11,
                text: "More firefighters have been hired to improve fire-fighting capacity.",
              },
              {
                q: 12,
                text: "Citizens and government groups disapprove of the efforts of different states and agencies working together.",
              },
              {
                q: 13,
                text: "Randy Jacobs believes that loss of life from fires will continue at the same levels, despite changes made.",
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
      <Reading4Pagination2015></Reading4Pagination2015>
    </div>
  );
};

export default Test4Reading2015;
