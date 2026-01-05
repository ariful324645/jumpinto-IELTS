import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2021 from "../Pagination 2021/Reading3Pagination2021";

const Test3Reading2021 = () => {
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
    setUserAnswers((prev) => {
      const updated = { ...prev, [qNum]: option };
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
    // Questions 1–5: TRUE / FALSE / NOT GIVEN
    1: "FALSE", // The Romans' shipbuilding skills were not passed on to Greeks and Egyptians
    2: "TRUE", // Skilled craftsmen were needed for mortise and tenon method
    3: "NOT GIVEN", // Later practice info not mentioned
    4: "TRUE", // Romans called Mediterranean Sea Mare Nostrum
    5: "TRUE", // Most rowers were from Roman army

    // Questions 6–13: One Word Only
    6: "FALSE", // Warships were designed to be fast? (or might be 'light' depending on passage)
    7: "TRUE", // Battering ram included
    8: "clumsy", // Rowers on three different …
    9: "tool", // Broad … (hull)
    10: "meat", // Square and … sails
    11: "camera", // Used to keep rowers in time
    12: "game", // Transported agricultural goods
    13: "frustration", // Ships pulled ashore by …
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
              {renderText("Roman shipbuilding and navigation")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Shipbuilding today is based on science and ships are built using computers and sophisticated tools. Shipbuilding in ancient Rome, however, was more of an art relying on estimation, inherited techniques and personal experience."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The Romans were not traditionally sailors but mostly land-based people, who learned to build ships from the people that they conquered, namely the Greeks and the Egyptians."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "There are a few surviving written documents that give descriptions and representations of ancient Roman ships, including the sails and rigging. Excavated vessels also provide some clues about ancient shipbuilding techniques."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Studies of these have taught us that ancient Roman shipbuilders built the outer hull first, then proceeded with the frame and the rest of the ship."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              {renderText(
                " Planks used to build the outer hull were initially sewn together. Starting from the 6th century BCE, they were fixed using a method called mortise and tenon, whereby one plank locked into another without the need for stitching. Then in the first centuries of the current era, Mediterranean shipbuilders shifted to another shipbuilding method, still in use today, which consisted of building the frame first and then proceeding with the hull and the other components of the ship."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This method was more systematic and dramatically shortened ship construction times. The ancient Romans built large merchant ships and warships whose size and technology were unequalled until the 16th century CE."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Warships were built to be lightweight and very speedy."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They had to be able to sail near the coast, which is why they had no ballast or excess load and were built with a long, narrow hull."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              {renderText(
                " They did not sink when damaged and often would lie crippled on the sea's surface following naval battles. They had a bronze battering ram, which was used to pierce the timber hulls or break the oars of enemy vessels."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Warships used both wind (sails) and human power (oarsmen) and were therefore very fast. Eventually, Rome's navy became the largest and most powerful in the Mediterranean, and the Romans had control over what they therefore called Mare Nostrum meaning 'our sea'."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "There were many kinds of warship. The 'trireme' was the dominant warship from the 7th to 4th century BCE. It had rowers in the top, middle and lower levels, and approximately 50 rowers in each bank."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The rowers at the bottom had the most uncomfortable position as they were under the other rowers and were exposed to the water entering through the oar-holes. It is worth noting that contrary to popular perception, rowers were not slaves but mostly Roman citizens enrolled in the military."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              {renderText(
                " The trireme was superseded by larger ships with even more rowers."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Merchant ships were built to transport lots of cargo over long distances and at a reasonable cost."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They had a wider hull, double planking and a solid interior for added stability. Unlike warships, their V-shaped hull was deep underwater, meaning that they could not sail too close to the coast."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              {renderText(
                " They usually had two huge side rudders located off the stern and controlled by a small tiller bar connected to a system of cables. They had from one to three masts with large square sails and a small triangular sail at the bow."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Just like warships, merchant ships used oarsmen, but coordinating the hundreds of rowers in both types of ship was not an easy task. In order to assist them, music would be played on an instrument, and oars would then keep time with this."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The cargo on merchant ships included raw materials (e.g. iron bars, copper, marble and granite), and agricultural products (e.g. grain from Egypt's Nile valley)."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "During the Empire, Rome was a huge city by ancient standards of about one million inhabitants. Goods from all over the world would come to the city through the port of Pozzuoli situated west of the bay of Naples in Italy and through the gigantic port of Ostia situated at the mouth of the Tiber River. Large merchant ships would approach the destination port and, just like today, be intercepted by a number of towboats that would drag them to the quay."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The time of travel along the many sailing routes could vary widely. Navigation in ancient Rome did not rely on sophisticated instruments such as compasses but on experience, local knowledge and observation of natural phenomena."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In conditions of good visibility, seamen in the Mediterranean often had the mainland or islands in sight, which greatly facilitated navigation. They sailed by noting their position relative to a succession of recognisable landmarks. When weather conditions were not good or where land was no longer visible, Roman mariners estimated directions from the pole star or, with less accuracy, from the Sun at noon. They also estimated directions relative to the wind and swell. Overall, shipping in ancient Roman times resembled shipping today with large vessels regularly crossing the seas and bringing supplies from their Empire."
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 1–5 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 1–5</h2>

          <p className="mb-4">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>

          <div className="mb-4 space-y-1">
            <p>
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p>
              <strong>FALSE</strong> if the statement contradicts the
              information
            </p>
            <p>
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          {[
            "The Romans' shipbuilding skills were passed on to the Greeks and the Egyptians.",
            "Skilled craftsmen were needed for the mortise and tenon method of fixing planks.",
            "The later practice used by Mediterranean shipbuilders involved building the hull before the frame.",
            "The Romans called the Mediterranean Sea Mare Nostrum because they dominated its use.",
            "Most rowers on ships were people from the Roman army.",
          ].map((q, i) => (
            <div key={i} className="mb-6">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 flex items-center justify-center font-bold border rounded-lg">
                  {i + 1}
                </div>
                <p>{q}</p>
              </div>

              <div className="ml-12 mt-2 space-y-2">
                {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q${i + 1}`}
                      value={opt}
                      checked={userAnswers[i + 1] === opt}
                      onChange={() => handleOptionClick(i + 1, opt)}
                      className="hidden"
                    />

                    <span
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        userAnswers[i + 1] === opt
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400"
                      }`}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* ================= Questions 6–13 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 6–13</h2>

          <p className="mt-2">
            Complete the summary below. <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="border p-5 mt-4 leading-8">
            <h3 className="text-xl font-bold text-center mb-4">
              Warships and merchant ships
            </h3>

            <p>
              Warships were designed so that they were{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  6
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(6, e.target.value)}
                />
              </span>{" "}
              and moved quickly. They often remained afloat after battles and
              were able to sail close to land as they lacked any additional
              weight.
            </p>

            <p className="mt-4">
              A battering ram made of{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  7
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(7, e.target.value)}
                />
              </span>{" "}
              was included in the design for attacking and damaging the timber
              and oars of enemy ships.
            </p>

            <p className="mt-4">
              Warships, such as the &apos;trireme&apos;, had rowers on three
              different{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  8
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(8, e.target.value)}
                />
              </span>
              .
            </p>

            <p className="mt-4">
              Unlike warships, merchant ships had a broad{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  9
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(9, e.target.value)}
                />
              </span>{" "}
              that lay far below the surface of the sea.
            </p>

            <p className="mt-4">
              They had both square and{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  10
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(10, e.target.value)}
                />
              </span>{" "}
              sails.
            </p>

            <p className="mt-4">
              On merchant ships and warships,{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  11
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(11, e.target.value)}
                />
              </span>{" "}
              was used to ensure rowers moved their oars in and out of the water
              at the same time.
            </p>

            <p className="mt-4">
              Quantities of agricultural goods such as{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  12
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(12, e.target.value)}
                />
              </span>{" "}
              were transported by merchant ships to two main ports in Italy.
            </p>

            <p className="mt-4">
              The ships were pulled to the shore by{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                  13
                </span>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-32"
                  onChange={(e) => handleInputChange(13, e.target.value)}
                />
              </span>
              .
            </p>
          </div>
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
                      const userAnswer = userAnswers[num];
                      const correctAnswer = correctAnswers[num];

                      const isCorrect =
                        typeof userAnswer === "string" &&
                        userAnswer.trim().toLowerCase() ===
                          correctAnswer.trim().toLowerCase();

                      const isWrong = userAnswer && !isCorrect;

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
                              </span>
                            )}

                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <ImCross className="text-white text-sm" />
                              </div>
                            )}

                            <p className="font-bold">Q{num}:</p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswer}</span>
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
      <Reading3Pagination2021></Reading3Pagination2021>
    </div>
  );
};

export default Test3Reading2021;
