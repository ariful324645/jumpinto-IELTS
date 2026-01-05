import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2021 from "../Pagination 2021/Reading4Pagination2021";

const Test4Reading2021 = () => {
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
  const handleOptionClick = (questionNumber, option) => {
    // Convert question number (7–10) to local index (0–3)
    const localIndex = questionNumber - 7;

    // Update selectedOptions (UI state)
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[localIndex] = option;
      return updated;
    });

    // Update userAnswers (global answers)
    setUserAnswers((prev) => {
      const updated = { ...prev, [questionNumber]: option };
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
    localStorage.setItem("/2021/Test 3/reading", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

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
    // Questions 1–6 (Diagram labelling – ONE WORD ONLY)
    1: "plumb",
    2: "channel",
    3: "ventilation",
    4: "ladder",
    5: "weight",
    6: "access",

    // Questions 7–10 (TRUE / FALSE / NOT GIVEN)
    7: "FALSE",
    8: "NOT GIVEN",
    9: "TRUE",
    10: "FALSE",

    // Questions 11–13 (NO MORE THAN TWO WORDS)
    11: "gold",
    12: "engineer",
    13: "harbour",
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
              {renderText("Roman tunnels")}
            </h1>

            <p className="text-lg">
              {renderText(
                "The Romans, who once controlled areas of Europe, North Africa and Asia Minor, adopted the construction techniques of other civilizations to build tunnels in their territories."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The Persians, who lived in present-day Iran, were one of the first civilizations to build tunnels that provided a reliable supply of water to human settlements in dry areas. In the early first millennium BCE, they introduced the qanat method of tunnel construction, which consisted of placing posts over a hill in a straight line, to ensure that the tunnel kept to its route, and then digging vertical shafts down into the ground at regular intervals."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                " Underground, workers removed the earth from between the ends of the shafts, creating a tunnel. The excavated soil was taken up to the surface using the shafts, which also provided ventilation during the work."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Once the tunnel was completed, it allowed water to flow from the top of a hillside down towards a canal, which supplied water for human use."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                " Remarkably, some qanats built by the Persians 2,700 years ago are still in use today."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "They later passed on their knowledge to the Romans, who also used the qanat method to construct water-supply tunnels for agriculture."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Roman qanat tunnels were constructed with vertical shafts dug at intervals of between 30 and 60 meters. The shafts were equipped with handholds and footholds to help those climbing in and out of them and were covered with a wooden or stone lid."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                " To ensure that the shafts were vertical, Romans hung a plumb line from a rod placed across the top of each shaft and made sure that the weight at the end of it hung in the center of the shaft."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Plumb lines were also used to measure the depth of the shaft and to determine the slope of the tunnel."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              {renderText(
                " The 5.6-kilometer-long Claudius tunnel, built in 41 CE to drain the Fucine Lake in central Italy, had shafts that were up to 122 meters deep, took 11 years to build and involved approximately 30,000 workers."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "By the 6th century BCE, a second method of tunnel construction appeared called the counter-excavation method, in which the tunnel was constructed from both ends."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It was used to cut through high mountains when the qanat method was not a practical alternative. This method required greater planning and advanced knowledge of surveying, mathematics and geometry as both ends of a tunnel had to meet correctly at the center of the mountain."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
              {renderText(
                " Adjustments to the direction of the tunnel also had to be made whenever builders encountered geological problems or when it deviated from its set path. They constantly checked the tunnel's advancing direction, for example, by looking back at the light that penetrated through the tunnel mouth, and made corrections whenever necessary."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Large deviations could happen, and they could result in one end of the tunnel not being usable. An inscription written on the side of a 428-meter tunnel, built by the Romans as part of the Saldae aqueduct system in modern-day Algeria, describes how the two teams of builders missed each other in the mountain and how the later construction of a lateral link between both corridors corrected the initial error."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The Romans dug tunnels for their roads using the counter-excavation method, whenever they encountered obstacles such as hills or mountains that were too high for roads to pass over."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "An example is the 37-meter-long, 6-meter-high, Furlo Pass Tunnel built in Italy in 69-79 CE. Remarkably, a modern road still uses this tunnel today. Tunnels were also built for mineral extraction. Miners would locate a mineral vein and then pursue it with shafts and tunnels underground. Traces of such tunnels used to mine gold can still be found at the Dolaucothi mines in Wales."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Roman tunnel projects were carefully planned and carried out. The length of time it took to construct a tunnel depended on the method being used and the type of rock being excavated. The qanat construction method was usually faster than the counter-excavation method as it was more straightforward."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This was because the mountain could be excavated not only from the tunnel mouths but also from shafts. The type of rock could also influence construction times. When the rock was hard, the Romans employed a technique called fire quenching which consisted of heating the rock with fire, and then suddenly cooling it with cold water so that it would crack. Progress through hard rock could be very slow, and it was not uncommon for tunnels to take years, if not decades, to be built. Construction marks left on a Roman tunnel in Bologna show that the rate of advance through solid rock was 30 centimeters per day. In contrast, the rate of advance of the Claudius tunnel can be calculated at 1.4 meters per day. Most tunnels had inscriptions showing the names of patrons who ordered construction and sometimes the name of the architect."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "For example, the 1.4-kilometer Çevlik tunnel in Turkey, built to divert the floodwater threatening the harbor of the ancient city of Seleuceia Pieria, had inscriptions on the entrance, still visible today, that also indicate that the tunnel was started in 69 CE and was completed in 81 CE."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 1–6 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 1–6</h2>

          <p className="mb-4">
            Label the diagrams below. <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="p-5 rounded-lg space-y-4">
            <div className="max-w-2xs mx-auto">
              <img src="https://i.ibb.co.com/1fwHRPzt/pesian.jpg" alt="" />
            </div>
            <div className="border space-y-4 p-4 max-w-[500px] mx-auto">
              <h3 className="font-bold text-center text-lg">
                The Persian Qanat Method
              </h3>
              {[
                "to direct the tunnelling",
                "water runs into a",
                "used by local people",
                "vertical shafts to remove earth and for",
                "made of wood or stone",
                "attached to the plumb line",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 flex-wrap">
                  <span>{text}</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    className="border-2 rounded px-2 py-1 w-32"
                    onChange={(e) => handleInputChange(i + 1, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= Questions 7–10 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">Questions 7–10</h2>

          <p className="mb-4">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>

          <div className="space-y-6">
            {[
              "The counter-excavation method completely replaced the qanat method in the 6th century BCE.",
              "Only experienced builders were employed to construct a tunnel using the counter-excavation method.",
              "The information about a problem during the Saldae aqueduct construction was found in an ancient book.",
              "The mistake was that the two parts of the tunnel failed to meet.",
            ].map((q, i) => (
              <div key={i} className="space-y-3">
                <p className="font-semibold">
                  {i + 7}. {q}
                </p>

                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    key={option}
                    onClick={() => handleOptionClick(i + 7, option)}
                    className="flex items-center gap-3 cursor-pointer ml-4"
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 ${
                        userAnswers[i + 7] === option
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400"
                      }`}
                    />
                    <span
                      className={
                        userAnswers[i + 7] === option ? "text-blue-600" : ""
                      }
                    >
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ================= Questions 11–13 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">Questions 11–13</h2>

          <p className="mb-4">
            Answer the questions below. <br />
            Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage.
          </p>

          <div className="border p-5 rounded-lg space-y-4">
            {[
              "What type of mineral were the Dolaucothi mines in Wales built to extract?",
              "In addition to the patron, whose name might be carved onto a tunnel?",
              "What part of Seleuceia Pieria was the Çevlik tunnel built to protect?",
            ].map((q, i) => (
              <div key={i} className="space-y-2">
                <p className="font-semibold">{q}</p>
                <div className="flex gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold">
                    {i + 11}
                  </span>
                  <input
                    type="text"
                    className="border-2 rounded px-3 py-2 w-60"
                    onChange={(e) => handleInputChange(i + 11, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= SUBMIT ================= */}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1–13)
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const user = userAnswers[num];
                      const correct = correctAnswers[num];

                      // Check correctness
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
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
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
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Reading4Pagination2021></Reading4Pagination2021>
    </div>
  );
};

export default Test4Reading2021;
