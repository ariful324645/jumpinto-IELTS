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
              {renderText("Green roofs")}
            </h1>

            {/* Section A */}
            <p className="text-lg font-bold">{renderText("A")}</p>
            <p className="text-lg">
              {renderText(
                "Rooftops covered with grass, vegetable gardens and lush foliage are now a common sight in many cities around the world. More and more private companies and city authorities are investing in green roofs, drawn to their wide-ranging benefits. Among the benefits are saving on energy costs, mitigating the risk of floods, making habitats for urban wildlife, tackling air pollution and even growing food."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These increasingly radical urban designs can help cities adapt to the monumental problems they face, such as access to resources and a lack of green space due to development."
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
                  "But the involvement of city authorities, businesses and other institutions is crucial to ensuring their success - as is research investigating different options to suit the variety of rooftop spaces found in cities."
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
                  "The UK is relatively new to developing green roofs, and local governments and institutions are playing a major role in spreading the practice. London is home to much of the UK's green roof market, mainly due to forward-thinking policies such as the London Plan, which has paved the way to more than doubling the area of green roofs in the capital."
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
                "Ongoing research is showcasing how green roofs in cities can integrate with 'living walls': environmentally friendly walls which are partially or completely covered with greenery, including a growing medium, such as soil or water."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Research also indicates that green roofs can be integrated with drainage systems on the ground, such as street trees, so that the water is managed better and the built environment is made more sustainable."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "There is also evidence to demonstrate the social value of green roofs. Doctors are increasingly prescribing time spent gardening outdoors for patients dealing with anxiety and depression. And research has found that access to even the most basic green spaces can provide a better quality of life for dementia sufferers and help people avoid obesity."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section C */}
            <p className="text-lg font-bold">{renderText("C")}</p>
            <p className="text-lg">
              {renderText(
                "In North America, green roofs have become mainstream, with a wide array of expansive, accessible and food-producing roofs installed in buildings. Again, city leaders and authorities have helped push the movement forward - only recently, San Francisco, USA, created a policy requiring new buildings to have green roofs. Toronto, Canada, has policies dating from the 1990s, encouraging the development of urban farms on rooftops."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These countries also benefit from having newer buildings than in many parts of the world, which makes it easier to install green roofs. Being able to keep enough water at roof height and distribute it right across the rooftop is crucial to maintaining the plants on any green roof - especially on 'edible roofs' where fruit and vegetables are farmed."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "And it's much easier to do this in newer buildings, which can typically hold greater weight, than to retro-fit old ones. Having a stronger roof also makes it easier to grow a greater variety of plants, since the soil can be deeper."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section D */}
            <p className="text-lg font-bold">{renderText("D")}</p>
            <p className="text-lg">
              {renderText(
                "For green roofs to become the norm for new developments, there needs to be support from public authorities and private investors. Those responsible for maintaining buildings may have to acquire new skills, such as landscaping, and in some cases, volunteers may be needed to help out."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Other considerations include installing drainage paths, meeting health and safety requirements and perhaps allowing access for the public, as well as planning restrictions and disruption from regular activities in and around the buildings during installation."
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
                  "To convince investors and developers that installing green roofs is worthwhile, economic arguments are still the most important. The term 'natural capital' has been developed to explain the economic value of nature; for example, measuring the money saved by installing natural solutions to protect against flood damage, adapt to climate change or help people lead healthier and happier lives."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section E */}
            <p className="text-lg font-bold">{renderText("E")}</p>
            <p className="text-lg">
              {renderText(
                "As the expertise about green roofs grows, official standards have been developed to ensure that they are designed, constructed and maintained properly, and function well. Improvements in the science and technology underpinning green roof development have also led to new variations in the concept."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "For example, 'blue roofs' enable buildings to hold water over longer periods of time, rather than draining it away quickly - crucial in times of heavier rainfall. There are also combinations of green roofs with solar panels, and 'brown roofs' which are wilder in nature and maximise biodiversity."
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
                  "If the trend continues, it could create new jobs and a more vibrant and sustainable local food economy - alongside many other benefits. There are still barriers to overcome, but the evidence so far indicates that green roofs have the potential to transform cities and help them function sustainably long into the future."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 1–5 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1–5")}
          </h2>

          <p className="mb-4">
            {renderText("Reading Passage 1 has five paragraphs, A–E.")}
            <br />
            {renderText("Which paragraph contains the following information?")}
            <br />
            {renderText(
              "Choose the correct letter, A–E, in boxes 1–5 on your answer sheet."
            )}
            <br />
            {renderText("NB: You may use any letter more than once.")}
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
                <span>{renderText(q)}</span>
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
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 6–9")}
          </h2>

          <p className="mb-4">
            {renderText("Complete the summary below.")}
            <br />
            {renderText(
              "Choose ONE WORD ONLY from the passage for each answer."
            )}
            <br />
            {renderText(
              "Write your answers in boxes 6–9 on your answer sheet."
            )}
          </p>

          <div className="border p-5">
            <h2 className="font-bold text-center text-xl mt-4">
              {renderText("Advantages of green roofs")}
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
                  <span>{renderText(q.before)}</span>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-32"
                    onChange={(e) => handleInputChange(idx + 6, e.target.value)}
                  />
                  <span>{renderText(q.after)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Questions 10–11 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 10–11")}
          </h2>

          <p className="mb-4">
            {renderText("Choose TWO letters, A–E.")}
            <br />
            {renderText(
              "Which TWO advantages of using newer buildings for green roofs are mentioned in Paragraph C of the passage?"
            )}
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
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 12–13")}
          </h2>

          <p className="mb-4">
            {renderText("Choose TWO letters, A–E.")}
            <br />
            {renderText(
              "Which TWO aims of new variations on the concept of green roofs are mentioned in Paragraph E of the passage?"
            )}
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
