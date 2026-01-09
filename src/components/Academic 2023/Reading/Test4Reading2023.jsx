import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2023 from "../Pagination 2023/Reading4Pagination2023";

const Test4Reading2023 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  // result marks display
  const [showResult, setShowResult] = useState(false);

  const questions = [
    "Methods for predicting the Earth's population have recently changed.",
    "Human beings are responsible for some of the destruction to food-producing land.",
    "The crops produced in vertical farms will depend on the season.",
    "Some damage to food crops is caused by climate change.",
    "Fertilisers will be needed for certain crops in vertical farms.",
    "Vertical farming will make plants less likely to be affected by infectious diseases.",
  ];

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
    // Questions 1–5: Paragraph matching (A–E)
    1: "B", // challenges before installing a green roof
    2: "A", // city promoting green roofs for many years
    3: "D", // belief that existing green roofs should be models
    4: "C", // green roofs working with other urban initiatives
    5: "E", // need to argue financial benefits

    // Questions 6–9: Summary completion (ONE WORD ONLY)
    6: "drainage", // reducing money spent on drainage
    7: "food", // producing food
    8: "gardening", // recommended activity for mental health
    9: "obesity", // preventing physical problems such as obesity

    // Questions 10–11: Multiple select (TWO letters)
    "10-11": ["C", "E"], // greater water-storage capacity, large surface area

    // Questions 12–13: Multiple select (TWO letters)
    "12-13": ["C", "D"], // regulate temperature, generate power
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2023/Test 3/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "10-11" || id === "12-13") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2023/Test 3/reading");
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
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 1-13")}
              </span>
              {renderText(" which are based on Reading Passage 1 below.")}
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Materials to take us beyond concrete")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Concrete is everywhere, but it's bad for the planet, generating large amounts of carbon dioxide - alternatives are being developed."
              )}
            </p>

            <br />

            {/* Section A */}
            <p className="text-lg font-bold">{renderText("A")}</p>
            <p className="text-lg">
              {renderText(
                "Concrete is the second most used substance in the global economy, after water - and one of the world's biggest single sources of greenhouse gas emissions. The chemical process by which cement, the key ingredient of concrete, is created results in large quantities of carbon dioxide."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The UN estimates that there will be 9.8 billion people living on the planet by mid-century. They will need somewhere to live."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If concrete is the only answer to the construction of new cities, then carbon emissions will soar, aggravating global warming."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "And so scientists have started innovating with other materials, in a scramble for alternatives to a universal commodity that has underpinned our modern life for many years."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section B */}
            <p className="text-lg font-bold">{renderText("B")}</p>
            <p className="text-lg">
              {renderText(
                "The problem with replacing concrete is that it is so very good at what it does. Chris Cheeseman, an engineering professor at Imperial College London, says the key thing to consider is the extent to which concrete is used around the world, and is likely to continue to be used."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "'Concrete is not a high-carbon product. Cement is high carbon, but concrete is not. But it is the scale on which it is used that makes it high carbon. The sheer scale of manufacture is so huge, that is the issue.'"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section C */}
            <p className="text-lg font-bold">{renderText("C")}</p>
            <p className="text-lg">
              {renderText(
                "Not only are the ingredients of concrete relatively cheap and found in abundance in most places around the globe, the stuff itself has marvellous properties: Portland cement, the vital component of concrete, is mouldable and pourable, but quickly sets hard."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Cheeseman also notes another advantage: concrete and steel have similar thermal expansion properties, so steel can be used to reinforce concrete, making it far stronger and more flexible as a building material than it could be on its own."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "According to Cheeseman, all these factors together make concrete hard to beat. 'Concrete is amazing stuff. Making anything with similar properties is going to be very difficult.'"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section D */}
            <p className="text-lg font-bold">{renderText("D")}</p>
            <p className="text-lg">
              {renderText(
                "A possible alternative to concrete is wood. Making buildings from wood may seem like a rather medieval idea, but climate change is driving architects to turn to treated timber as a possible resource."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Recent years have seen the emergence of tall buildings constructed almost entirely from timber. Vancouver, Vienna and Brumunddal in Norway are all home to constructed tall, wooden buildings."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section E */}
            <p className="text-lg font-bold">{renderText("E")}</p>
            <p className="text-lg">
              {renderText(
                "Using wood to construct buildings, however, is not straightforward. Wood expands as it absorbs moisture from the air and is susceptible to pests, not to mention fire."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But treating wood and combining it with other materials can improve its properties. Cross-laminated timber is engineered wood. An adhesive is used to stick layers of solid-sawn timber together, crosswise, to form building blocks."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This material is light but has the strength of concrete and steel. Construction experts say that wooden buildings can be constructed at a greater speed than ones of concrete and steel and the process, it seems, is quieter."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section F */}
            <p className="text-lg font-bold">{renderText("F")}</p>
            <p className="text-lg">
              {renderText(
                "Stora Enso is Europe's biggest supplier of cross-laminated timber, and its vice-president Markus Mannström reports that the company is seeing increasing demand globally for building in wood, with climate change concerns the key driver."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Finland, with its large forests, where Stora Enso is based, has been leading the way, but the company is seeing a rise in demand for its timber products across the world, including in Asia."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Of course, using timber in a building also locks away the carbon that it absorbed as it grew. But even treated wood has its limitations and only when a wider range of construction projects has been proven in practice will it be possible to see wood as a real alternative to concrete in constructing tall buildings."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section G */}
            <p className="text-lg font-bold">{renderText("G")}</p>
            <p className="text-lg">
              {renderText(
                "Fly ash and slag from iron ore are possible alternatives to cement in a concrete mix. Fly ash, a byproduct of coal-burning power plants, can be incorporated into concrete mixes to make up as much as 15 to 30% of the cement, without harming the strength or durability of the resulting mix. Iron-ore slag, a byproduct of the iron-ore smelting process, can be used in a similar way."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Their incorporation into concrete mixes has the potential to reduce greenhouse gas emissions."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "But Anna Surgenor, of the UK's Green Building Council, notes that although these waste products can save carbon in the concrete mix, their use is not always straightforward."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section H */}
            <p className="text-lg font-bold">{renderText("H")}</p>
            <p className="text-lg">
              {renderText(
                "While these technologies are all promising ideas, they are either unproven or based on materials that are not abundant. In their overview of innovation in the concrete industry, Felix Preston and Johanna Lehne of the UK's Royal Institute of International Affairs reached the conclusion, 'Some novel cements have been discussed for more than a decade within the research community, without breaking through. At present, these alternatives are rarely as cost-effective as conventional cement, and they face raw-material shortages and resistance from customers.'"
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 1–5 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 1–5</h2>
          <p className="mb-4">
            Reading Passage 1 has five paragraphs, A–E.
            <br />
            Which paragraph contains the following information?
            <br />
            Choose the correct letter, A–E, in boxes 1–5 on your answer sheet.
            <br />
            NB: You may use any letter more than once.
          </p>

          <ul className="list-decimal list-inside space-y-4 text-lg">
            {[
              "mention of several challenges to be overcome before a green roof can be installed",
              "reference to a city where green roofs have been promoted for many years",
              "a belief that existing green roofs should be used as a model for new ones",
              "examples of how green roofs can work in combination with other green urban initiatives",
              "the need to make a persuasive argument for the financial benefits of green roofs",
            ].map((q, idx) => (
              <li key={idx} className="flex items-center flex-wrap gap-2">
                <span className="font-bold mr-2">{idx + 1}.</span>
                <span>{q}</span>
                <select
                  className="border rounded px-2 py-1 w-16"
                  onChange={(e) => handleInputChange(idx + 1, e.target.value)}
                >
                  <option value="">{idx + 1}</option>
                  {["A", "B", "C", "D", "E"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>

          {/* ================= Questions 6–9 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 6–9</h2>
          <p className="mb-4">
            Complete the summary below.
            <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
            <br />
            Write your answers in boxes 6–9 on your answer sheet.
          </p>

          <div className="border p-5">
            <h2 className="font-bold text-center text-xl mt-4">
              Advantages of green roofs
            </h2>
            <ul className="space-y-4 text-lg mt-4">
              {[
                {
                  before:
                    "City rooftops covered with greenery have many advantages. These include lessening the likelihood that floods will occur, reducing how much money is spent on",
                  after:
                    "and creating environments that are suitable for wildlife.",
                },
                {
                  before: "In many cases, they can also be used for producing",
                  after: ".",
                },
                {
                  before: "For example, the medical profession recommends",
                  after:
                    "as an activity to help people cope with mental health issues.",
                },
                {
                  before:
                    "Studies have also shown that the availability of green spaces can prevent physical problems such as",
                  after: ".",
                },
              ].map((q, idx) => (
                <li key={idx} className="flex items-center flex-wrap gap-2">
                  <span className="font-bold">{idx + 6}.</span>
                  <span>{q.before}</span>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-32"
                    onChange={(e) => handleInputChange(idx + 6, e.target.value)}
                  />
                  <span>{q.after}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Questions 10–11 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 10–11</h2>
          <p className="mb-4">
            Choose <strong>TWO letters, A–E</strong>.
            <br />
            Which TWO advantages of using newer buildings for green roofs are
            mentioned in Paragraph C of the passage?
          </p>

          <div className="space-y-2">
            {[
              "a longer growing season for edible produce",
              "more economical use of water",
              "greater water-storage capacity.",
              "ability to cultivate more plant types",
              "a large surface area for growing plants",
            ].map((opt, idx) => {
              const value = String.fromCharCode(65 + idx);
              const selected = userAnswers["10-11"] || [];
              const isChecked = selected.includes(value);
              const isDisabled = selected.length === 2 && !isChecked;

              return (
                <label
                  key={idx}
                  className={`flex items-center gap-2 ${
                    isDisabled ? "opacity-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("10-11", value)}
                  />
                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(opt)}</span>
                </label>
              );
            })}
          </div>

          {/* ================= Questions 12–13 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 12–13</h2>
          <p className="mb-4">
            Choose <strong>TWO letters, A–E</strong>.
            <br />
            Which TWO aims of new variations on the concept of green roofs are
            mentioned in Paragraph E of the passage?
          </p>

          <div className="space-y-2">
            {[
              "to provide habitats for a wide range of species",
              "to grow plants successfully even in the wettest climates",
              "to regulate the temperature of the immediate environment.",
              "to generate power from a sustainable source",
              "to collect water to supply other buildings",
            ].map((opt, idx) => {
              const value = String.fromCharCode(65 + idx);
              const selected = userAnswers["12-13"] || [];
              const isChecked = selected.includes(value);
              const isDisabled = selected.length === 2 && !isChecked;

              return (
                <label
                  key={idx}
                  className={`flex items-center gap-2 ${
                    isDisabled ? "opacity-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("12-13", value)}
                  />
                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(opt)}</span>
                </label>
              );
            })}
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  {renderText("Submit Answers")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText("Your Score: ")}
                    {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (11–20)")}
                  </h3>

                  <ul className="space-y-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "10-11", "12-13"].map(
                      (num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const isCorrect = (() => {
                          if (Array.isArray(correct)) {
                            return (
                              Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            );
                          } else {
                            return (
                              user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase()
                            );
                          }
                        })();

                        const noAnswer = !user;

                        const userAnswerDisplay = Array.isArray(user)
                          ? user.join(", ")
                          : user?.trim() || "";
                        const correctAnswerDisplay = Array.isArray(correct)
                          ? correct.join(", ")
                          : correct?.trim();

                        return (
                          <li
                            key={num}
                            className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-2">
                              {isCorrect && (
                                <FaDotCircle className="text-green-600 text-xl font-bold" />
                              )}
                              {!isCorrect && (
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                  <ImCross className="text-white text-sm font-bold" />
                                </div>
                              )}
                              <p className="font-bold">Q{num}:</p>
                            </div>

                            <p className="ml-8">
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {noAnswer ? (
                                <span className="italic">
                                  No answer provided
                                </span>
                              ) : (
                                userAnswerDisplay
                              )}
                            </p>

                            <p className="ml-8">
                              <span className="font-semibold text-green-600">
                                Correct Answer:
                              </span>{" "}
                              {correctAnswerDisplay}
                            </p>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Reading4Pagination2023></Reading4Pagination2023>
    </div>
  );
};

export default Test4Reading2023;
