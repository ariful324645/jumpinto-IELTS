import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2024 from "../Pagination 2024/Reading4Pagination2024";

const Test4Reading2024 = () => {
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [activeButtons, setActiveButtons] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  const questions = [
    "Urban farming can take place above or below ground.",
    "Some of the equipment used in aeroponic farming can be made by hand.",
    "Urban farming relies more on electricity than some other types of farming.",
    "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
    "Most produce can be grown on an aeroponic urban farm at any time of the year.",
    "Beans take longer to grow on an urban farm than other vegetables.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const correctAnswers = {
    // ================= Questions 1–6 (TRUE / FALSE / NOT GIVEN) =================
    1: "FALSE", // Populations have declined over the past 40 years
    2: "TRUE", // Caterpillars act as prey for birds, bats and other mammals
    3: "FALSE", // Phenology refers to timing, not location
    4: "NOT GIVEN", // No mention of reduced lifespan
    5: "FALSE", // The reason is still unknown
    6: "TRUE", // Data came from butterfly enthusiasts (amateurs)

    // ================= Questions 7–13 (ONE WORD ONLY) =================
    7: "colonies", // Small Blue colonies up to a hundred strong
    8: "spring", // appears early in spring
    9: "endangered", // Britain's most endangered butterfly
    10: "habitats", // very specific habitat types
    11: "Europe", // continental Europe
    12: "southern", // southern England
    13: "diet", // caterpillar exists solely on a diet of honeysuckle
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  useEffect(() => {
    let newScore = 0;
    for (let i = 1; i <= 13; i++) {
      const answer = userAnswers[i]?.toString().trim().toLowerCase() || "";
      const correct = correctAnswers[i]?.toString().trim().toLowerCase() || "";
      if (answer && answer === correct) newScore += 1;
    }
    setScore(newScore);
  }, [userAnswers]);

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
  );

  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);

    // ✅ Correct mapping: Questions 1–7
    const questionNumber = qIndex + 1;

    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: options[oIndex],
    }));
  };

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
  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">PASSAGE 1</h1>
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
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "The Impact of Climate Change on Butterflies in Britain",
              )}
            </h1>

            <p className="text-lg mt-4">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "According to conservationists, populations of around two thirds of butterfly species have declined in Britain over the past 40 years",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                "If this trend continues, it might have unpredictable knock-on effects for other species in the ecosystem.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Butterfly eggs develop into caterpillars and these insects, which are the second stage in a new butterfly's lifecycle, consume vast quantities of plant material, and in turn act as prey for birds as well as bats and other small mammals",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Only by arming themselves with an understanding of why butterfly numbers are down can conservationists hope to halt or reverse the decline.",
              )}

              {renderText(
                "Butterflies prefer outdoor conditions to be 'just right', which means neither too hot nor too cold.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Under the conditions of climate change, the temperature at any given time in summer is generally getting warmer, leaving butterflies with the challenge of how to deal with this.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "One of the main ways in which species are ensuring conditions suit them is by changing the time of year at which they are active and reproduce.",
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Scientists refer to the timing of such lifecycle events as 'phenology', so when an animal or plant starts to do something earlier in the year than it usually does, it is said to be 'advancing its phenology'.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "These advances have been observed already in a wide range of butterflies – indeed, most species are advancing their phenology to some extent.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "In Britain, as the average spring temperature has increased by roughly 0.5°C over the past 20 years, species have advanced by between three days and a week on average, to keep in line with cooler temperatures.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Is this a sign that butterflies are well equipped to cope with climate change, and readily adjust to new temperatures? Or are these populations under stress, being dragged along unwillingly by unnaturally fast changes?",
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The answer is still unknown, but a new study is seeking to answer these questions.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "First, the researchers pulled together data from millions of records submitted by butterfly enthusiasts – people who spend their free time observing the activities of different species.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "This provided information on 130 species of butterflies in Great Britain every year for a 20-year period.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "They then estimated the abundance and distribution of each species across this time, along with how far north in the country they had moved.",
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "First, the researchers pulled together data from millions of records that had been submitted by butterfly enthusiasts - people who spend their free time observing the activities of different species",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Analysing the trends, researchers discovered that species with more flexible lifecycles were more likely to benefit from an earlier emergence driven by climate change.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Some species are able to go from caterpillar to butterfly twice or more per year, so that the individual butterflies you see flying in spring are the grandchildren or great-grandchildren of the individuals seen a year previously.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("5")}
                </span>
              )}
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Among these species, those advancing their phenology the most over the 20-year period also had the most positive trends in abundance, distribution, and northwards extent.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "For example, Britain's tiniest butterfly, the dainty Small Blue, whose colonies are up to a hundred strong, develops early in spring, allowing summer generations to complete another reproductive cycle by autumn, increasing population growth.",
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "For these species, such as Britain's tiniest butterfly, the dainty Small Blue, whose colonies are up to a hundred strong, some develop into butterflies early in spring, allowing their summer generations to complete another reproductive cycle by autumn so that more population growth occurs.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "Other species, less flexible and restricted to a single reproductive cycle per year, show no benefit to emerging earlier.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Species that specialise in very specific habitats or diets, like the High Brown Fritillary, are particularly harmed by advancing phenology.",
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Indeed, worryingly, it was found that the species in this group that specialise in very specific habitat types, often related to the caterpillar's preferred diet, actually tended to be most at harm from advancing phenology.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "Many of Britain's single-generation species in continental Europe can add a second generation in sufficiently warm years.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Therefore, as climate continues to warm, species like the Silver-studded Blue may produce multiple generations in the UK, potentially increasing populations.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("8")}
                </span>
              )}
            </p>

            {/* Section I */}
            <p className="text-lg">
              {renderText(
                "Conservationists can use this knowledge to identify species at risk.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "The White Admiral of southern England, once abundant from the 1920s, has declined considerably in the past 20 years, possibly due to climate change.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("9")}
                </span>
              )}
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The White Admiral of southern England, a much sought-after butterfly, experienced a significant increase in numbers from the 1920s but has shown a considerable decline in the past 20 years.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Its caterpillars feed solely on honeysuckle, which may also contribute to its decline.",
              )}
            </p>
          </div>

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
          {/* ---------- Questions 1–6 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1–6")}
            </h2>

            <p className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}
              <br />
              {renderText("TRUE if the statement agrees with the information")}
              <br />
              {renderText("FALSE if the statement contradicts the information")}
              <br />
              {renderText("NOT GIVEN if there is no information on this")}
            </p>

            {[
              "Forty years ago, there were fewer butterflies in Britain than at present.",
              "Caterpillars are eaten by a number of different predators.",
              "'Phenology' is a term used to describe a creature's ability to alter the location of a lifecycle event.",
              "Some species of butterfly have a reduced lifespan due to spring temperature increases.",
              "There is a clear reason for the adaptations that butterflies are making to climate change.",
              "The data used in the study was taken from the work of amateur butterfly watchers.",
            ].map((q, index) => (
              <div key={index} className="space-y-3">
                <p className="text-lg font-semibold">
                  {renderText(`${index + 1}. ${q}`)}
                </p>

                {["TRUE", "FALSE", "NOT GIVEN"].map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center gap-2 cursor-pointer text-lg"
                  >
                    <input
                      type="radio"
                      name={`q${index + 1}`}
                      checked={selectedOptions[index] === oIndex}
                      onChange={() => handleOptionClick(index, oIndex)}
                      className="w-5 h-5"
                    />
                    {renderText(option)}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* ---------- Questions 7–13 ---------- */}
          <div className="mt-10 space-y-6 p-4">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7–13")}
            </h2>

            <p className="text-lg font-semibold mb-5">
              {renderText("Complete the notes below.")}
              <br />
              {renderText("Choose ONE WORD ONLY from the passage.")}
            </p>

            <div className="space-y-4 border p-4 rounded-lg">
              <h2 className="font-bold text-xl text-center">
                {renderText("Butterflies in the UK")}
              </h2>

              {/* 7 */}
              <p className="text-lg">
                {renderText("The Small Blue lives in large")}{" "}
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[7] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 7: e.target.value }))
                  }
                />
              </p>

              {/* 8 */}
              <p className="text-lg">
                {renderText("first appears at the start of")}{" "}
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[8] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 8: e.target.value }))
                  }
                />
              </p>

              {/* 9 */}
              <p className="text-lg">
                {renderText(
                  "The High Brown Fritillary is considered to be more",
                )}{" "}
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[9] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 9: e.target.value }))
                  }
                />{" "}
                {renderText("than other species")}
              </p>

              {/* 10 */}
              <p className="text-lg">
                {renderText("its caterpillars occupy a limited range of")}{" "}
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[10] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 10: e.target.value }))
                  }
                />
              </p>

              {/* 11 */}
              <p className="text-lg">
                {renderText(
                  "The Silver-studded Blue can reproduce twice a year in warm areas of",
                )}{" "}
                <button
                  onClick={() => toggleButton(11)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[11]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  11
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[11] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 11: e.target.value }))
                  }
                />
              </p>

              {/* 12 */}
              <p className="text-lg">
                {renderText("The White Admiral is found in")}{" "}
                <button
                  onClick={() => toggleButton(12)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[12] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 12: e.target.value }))
                  }
                />{" "}
                {renderText("areas of England")}
              </p>

              {/* 13 */}
              <p className="text-lg">
                {renderText("both climate change and the")}{" "}
                <button
                  onClick={() => toggleButton(13)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[13]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  13
                </button>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-32 mx-2"
                  value={userAnswers[13] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({ ...prev, 13: e.target.value }))
                  }
                />{" "}
                {renderText("of the caterpillar are possible reasons")}
              </p>
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
                      All Answers (27–40)
                    </h3>

                    <ul className="space-y-3">
                      {Array.from({ length: 13 }, (_, i) => i + 1).map(
                        (num) => {
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
                                <span className="font-semibold">
                                  Your Answer:
                                </span>{" "}
                                {noAnswer ? (
                                  <span className="italic">
                                    No answer provided
                                  </span>
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
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Reading4Pagination2024></Reading4Pagination2024>
    </div>
  );
};

export default Test4Reading2024;
