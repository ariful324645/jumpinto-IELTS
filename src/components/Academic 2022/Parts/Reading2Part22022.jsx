import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2022 from "../Pagination2022/Reading2Pagination2022";

const Reading2Part22022 = () => {
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
    "Methods for predicting the Earth's population have recently changed.",
    "Human beings are responsible for some of the destruction to food-producing land.",
    "The crops produced in vertical farms will depend on the season.",
    "Some damage to food crops is caused by climate change.",
    "Fertilisers will be needed for certain crops in vertical farms.",
    "Vertical farming will make plants less likely to be affected by infectious diseases.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];
  const handleOptionClick = (qNum, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [qNum]: option,
    }));

    setUserAnswers((prev) => {
      const updated = { ...prev, [qNum]: option }; // ✅ FIX
      calculateScore(updated);
      return updated;
    });
  };

  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const userAnswer = answers[key];
      const correctAnswer = correctAnswers[key];

      if (
        typeof userAnswer === "string" &&
        userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      ) {
        newScore += 1;
      }
    });

    setScore(newScore);
    localStorage.setItem("/2022/Test 1/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState({});

  const [activeNumbers, setActiveNumbers] = useState(Array(14).fill(false));

  const handleNumberClick = (qIndex) => {
    const updatedActive = [...activeNumbers];
    updatedActive[qIndex] = !updatedActive[qIndex]; // toggle active state
    setActiveNumbers(updatedActive);
  };

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

  //  Marks show
  const correctAnswers = {
    // Questions 14–18 (MATCHING INFORMATION, Sections A–E)
    14: "D", // reference to disease-resistant tomato
    15: "B", // problems of focusing on one tomato type
    16: "A", // uncultivated plants as future food sources
    17: "E", // early domestication vs modern research
    18: "C", // personal reaction to genetically edited tomato

    // Questions 19–23 (MATCHING RESEARCHERS, A–D)
    19: "A", // Jorg Kudla – adaptation to future environments
    20: "C", // Joyce Van Eck – public acceptance issues
    21: "D", // Jonathan Jones – research direction secrecy
    22: "B", // Caixia Gao – cost limitations
    23: "A", // Jorg Kudla – limited plant food usage

    // Questions 24–26 (ONE WORD ONLY)
    24: "flavour",
    25: "size",
    26: "disease",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
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

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
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
            <h1 className="text-xl font-bold">PASSAGE 2</h1>
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
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 14-26</span>
              which are based on Reading Passage 2 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              A second attempt at domesticating the tomato
            </h1>

            <p className="text-lg font-bold">A</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                It took at least 3,000 years for humans to learn how to
                domesticate the wild tomato and cultivate it for food.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                      17
                    </span>
                  </>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Now two separate teams in Brazil and China have done it all over
                again in less than three years.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      17
                    </span>
                  </>
                )}
              </span>
              And they have done it better in some ways, as the re-domesticated
              tomatoes are more nutritious than the ones we eat at present.
            </p>
            <p className="text-lg">
              This approach relies on the revolutionary CRISPR genome editing
              technique, in which changes are deliberately made to the DNA of a
              living cell, allowing genetic material to be added, removed or
              altered. The technique could not only improve existing crops, but
              could also be used to turn thousands of wild plants into useful
              and appealing foods. In fact, a third team in the US has already
              begun to do this with a relative of the tomato called the
              groundcherry.
            </p>
            <p className="text-lg">
              This fast-track domestication could help make the world's food
              supply healthier and far more resistant to diseases, such as the
              rust fungus devastating wheat crops.
            </p>
            <p className="text-lg">
              "This could transform what we eat," says Jorg Kudla at the
              University of Munster in Germany, a member of the Brazilian team.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "There are 50,000 edible plants in the world, but 90 percent of
                our energy comes from just 15 crops."
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    23
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              "We can now mimic the known domestication course of major crops
              like rice, maize, sorghum or others," says Caixia Gao of the
              Chinese Academy of Sciences in Beijing. "Then we might try to
              domesticate plants that have never been domesticated."
            </p>

            <br />

            <p className="text-lg font-bold">B</p>
            <p className="text-lg">
              Wild tomatoes, which are native to the Andes region in South
              America, produce pea-sized fruits. Over many generations, peoples
              such as the Aztecs and Incas transformed the plant by selecting
              and breeding plants with mutations* in their genetic structure,
              which resulted in desirable traits such as larger fruit.
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But every time a single plant with a mutation is taken from a
                larger population for breeding, much genetic diversity is lost.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                And sometimes the desirable mutations come with less desirable
                traits. For instance, the tomato strains grown for supermarkets
                have lost much of their flavour.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    24
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              By comparing the genomes of modern plants to those of their wild
              relatives, biologists have been working out what genetic changes
              occurred as plants were domesticated. The teams in Brazil and
              China have now used this knowledge to reintroduce these changes
              from scratch while maintaining or even enhancing the desirable
              traits of wild strains.
            </p>

            <br />

            <p className="text-lg font-bold">C</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Kudla's team made six changes altogether. For instance, they
                tripled the size of fruit by editing a gene called FRUIT WEIGHT,
                and increased the number of tomatoes per truss by editing
                another called MULTIFLORA.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    25
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              While the historical domestication of tomatoes reduced levels of
              the red pigment lycopene - thought to have potential health
              benefits - the team in Brazil managed to boost it instead. The
              wild tomato has twice as much lycopene as cultivated ones; the
              newly domesticated one has five times as much.
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "They are quite tasty," says Kudla.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    18
                  </span>
                )}
              </span>
              "A little bit strong. And very aromatic."
            </p>
            <p className="text-lg">
              The team in China re-domesticated several strains of wild tomatoes
              with desirable traits lost in domesticated tomatoes.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                In this way they managed to create a strain resistant to a
                common disease called bacterial spot race, which can devastate
                yields.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                They also created another strain that is more salt tolerant -
                and has higher levels of vitamin C.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    26
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">D</p>
            <p className="text-lg">
              Meanwhile, Joyce Van Eck at the Boyce Thompson Institute in New
              York state decided to use the same approach to domesticate the
              groundcherry or goldenberry ("Physalis pruinosa") for the first
              time. This fruit looks similar to the closely related Cape
              gooseberry ("Physalis peruviana").
            </p>
            <p className="text-lg">
              Groundcherries are already sold to a limited extent in the US but
              they are hard to produce because the plant has a sprawling growth
              habit and the small fruits fall off the branches when ripe. Van
              Eck's team has edited the plants to increase fruit size, make
              their growth more compact and to stop fruits dropping.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "There's potential for this to be a commercial crop," says Van
                Eck. But she adds that taking the work further would be
                expensive because of the need to pay for a licence for the
                CRISPR technology and get regulatory approval.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    22
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">E</p>
            <p className="text-lg">
              This approach could boost the use of many obscure plants, says
              Jonathan Jones of the Sainsbury Lab in the UK.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But it will be hard for new foods to grow so popular with
                farmers and consumers that they become new staple crops, he
                thinks.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The three teams already have their eye on other plants that
                could be "catapulted into the mainstream", including foxtail,
                oat-grass and cowpea.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    16
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                By choosing wild plants that are drought or heat tolerant, says
                Gao, we could create crops that will thrive even as the planet
                warms.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    19
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But Kudla didn't want to reveal which species were in his team's
                sights, because CRISPR has made the process so easy.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    21
                  </span>
                )}
              </span>
              "Any one with the right skills could go to their lab and do this."
            </p>

            <br />

            <p className="text-lg font-medium mt-4">Glossary</p>
            <p className="text-lg italic">
              * mutations: changes in an organism's genetic structure that can
              be passed down to later generations
            </p>
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
          {/* ================= Questions 14–18 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 14–18</h2>

          <p className="mb-4">
            Reading Passage 2 has five sections, A–E.
            <br />
            Which section contains the following information?
            <br />
            Choose the correct letter, A–E, in boxes 14–18 on your answer sheet.
            <br />
            NB You may use any letter more than once.
          </p>

          <ul className="list-decimal list-inside space-y-4 text-lg">
            {[
              "14 A reference to a type of tomato that can resist a dangerous infection",
              "15 An explanation of how problems can arise from focusing only on a certain type of tomato plant",
              "16 A number of examples of plants that are not cultivated at present but could be useful as food sources",
              "17 A comparison between the early domestication of the tomato and more recent research",
              "18 A personal reaction to the flavour of a tomato that has been genetically edited",
            ].map((text, idx) => {
              const qNum = 14 + idx;
              const options = ["A", "B", "C", "D", "E"];
              const [num, ...rest] = text.split(" ");

              return (
                <li key={qNum} className="flex items-center">
                  <span>
                    <span className="font-bold">{num}</span> {rest.join(" ")}
                  </span>
                  <select
                    className="border rounded px-2 py-1 w-15"
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {qNum}
                    </option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 19–23 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 19–23</h2>

          <p className="mb-4">
            Look at the following statements (Questions 19–23) and the list of
            researchers below.
            <br />
            Match each statement with the correct researcher, A–D.
            <br />
            Choose the correct letter, A–D, next to Questions 19–23.
            <br />
            NB You may use any letter more than once.
          </p>

          <div className="space-y-2 border p-4 max-w-[220px] mb-4 text-lg mx-auto">
            {[
              "A. Jorg Kudla",
              "B. Caixia Gao",
              "C. Joyce Van Eck",
              "D. Jonathan Jones",
            ].map((opt) => (
              <p key={opt}>{opt}</p>
            ))}
          </div>

          <ul className="list-decimal list-inside space-y-4 text-lg">
            {[
              "19 Domestication of certain plants could allow them to adapt to future environmental challenges.",
              "20 The idea of growing and eating unusual plants may not be accepted on a large scale.",
              "21 It is not advisable for the future direction of certain research to be made public.",
              "22 Present efforts to domesticate one wild fruit are limited by the costs involved.",
              "23 Humans only make use of a small proportion of the plant food available on Earth.",
            ].map((text, idx) => {
              const qNum = 19 + idx;
              const options = ["A", "B", "C", "D"];
              const [num, ...rest] = text.split(" ");
              return (
                <li key={qNum} className="flex gap-2 items-center">
                  <span>
                    <span className="font-bold">{num}</span> {rest.join(" ")}
                  </span>
                  <select
                    className="border rounded px-2 py-1  w-15"
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {qNum}
                    </option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 24–26 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 24–26</h2>

          <p className="mb-4">
            Complete the sentences below.
            <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
            <br />
            Write your answers in boxes 24–26 on your answer sheet.
          </p>

          {/* ================= Questions 24–26 ================= */}
          <h2 className="text-lg font-bold mb-2">Questions 24–26</h2>

          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 24–26 on your answer sheet.
          </p>

          <div className="space-y-4 text-lg">
            {/* Question 24 */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-bold">24</span>
              <span>An undesirable trait such as loss of</span>
              <input
                type="text"
                placeholder="24"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(24, e.target.value)}
              />
              <span>may be caused by a mutation in a tomato gene.</span>
            </div>

            {/* Question 25 */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-bold">25</span>
              <span>
                By modifying one gene in a tomato plant, researchers made the
                tomato three times its original
              </span>
              <input
                type="text"
                placeholder="25"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(25, e.target.value)}
              />
              <span>.</span>
            </div>

            {/* Question 26 */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-bold">26</span>
              <span>A type of tomato which was not badly affected by</span>
              <input
                type="text"
                placeholder="26"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(26, e.target.value)}
              />
              <span>
                , and was rich in vitamin C, was produced by a team of
                researchers in China.
              </span>
            </div>
          </div>
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14–26)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
                      const userAnswer = userAnswers[num]?.trim() || "";
                      const correctAnswer = correctAnswers[num]?.trim();
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
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
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

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

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
      <Reading2Pagination2022></Reading2Pagination2022>
    </div>
  );
};

export default Reading2Part22022;
