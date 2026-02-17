import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2024 from "../Pagination 2024/Reading4Pagination2024";

const Reading4Part22024 = () => {
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    14: "C", // rapidly increasing need for one raw material in the transport industry
    15: "F", // rough estimate of the area of the Earth covered by the oceans
    16: "E", // how a particular underwater habitat, where minerals and organisms co-exist, is formed
    17: "D", // countries yet to agree on rules for seabed exploration

    // Questions 18–23 (matching experts)
    18: "D", // move away from heavily mined land reserves → Mike Johnston
    19: "B", // negative effects on local areas ignored → Julie Hunter, Julian Aguon, Pradeep Singh
    20: "A", // more worthwhile things than minerals → Professor Mat Upton
    21: "E", // destructive impact on marine life → Verena Tunnicliffe
    22: "B", // more known about outer space than seabed → Hunter, Aguon, Singh
    23: "C", // one habitat where mining should not occur → Dr Jon Copley

    // Questions 24–26 (summary completion, one word only)
    24: "waste", // removed without producing much
    25: "machinery", // adapted machinery previously used on land
    26: "caution", // necessary due to potential unidentified consequences
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
            <h1 className="text-2xl font-bold text-center">
              {renderText("Deep-sea mining")}
            </h1>

            <p className="text-lg my-5 text-center">
              {renderText(
                "Bacteria from the ocean floor can beat superbugs and cancer. But habitats are at risk from the hunger for marine minerals",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "When Professor Mat Upton found that a microbe from a deep-sea sponge was killing pathogenic bugs in his laboratory, he realised it could be a breakthrough in the fight against antibiotic-resistant superbugs, which are responsible for thousands of deaths a year in the UK alone. Further tests confirmed that an antibiotic from the sponge bacteria, found living more than 700 metres under the sea at the Rockall trough in the north-east Atlantic, was previously unknown to science, boosting its potential as a life-saving medicine. But Upton, and other scientists who view the deep ocean and its wealth of unique and undocumented species as a prospecting ground for new medicines, fear such potential will be lost in the rush to exploit the deep sea's equally rich metal and mineral resources.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"We\'re looking at the bioactive potential of marine resources, to see if there are any more medicines or drugs down there before we destroy it for ever," says Upton, a medical microbiologist at the University of Plymouth.',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                " He is among many scientists urging a halt to deep-sea mining, asking for time to weigh up the pros and cons. In sustainability terms, this could be a better way of exploiting the economic potential of the deep sea, he argues. Oceanographers using remotely operated vehicles have spotted many new species. Among them have been sea cucumbers with tails allowing them to sail along the ocean floor, and a rare 'Dumbo' octopus, found 3,000 metres under the Pacific Ocean, off the coast of California. Any one of these could offer lifesaving potential. Upton estimates it could take up to a decade for a newly discovered antibiotic to become a medicine - but the race towards commercial mining in the ocean abyss has already begun.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "The deep sea contains more nickel, cobalt and rare earth metals than all land reserves combined, according to the US Geological Survey.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Mining corporations argue that deep-sea exploration could help diversify the supply of metals and point to the fact that demand for resources such as copper, aluminium, cobalt for electric car batteries and other metals to power technology and smartphones, is soaring.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>

              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " They say that deep-sea mining could yield far superior ore to land mining with little, if any, waste.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>

              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Different methods of extraction exist, but most involve employing some form of converted machinery previously used in terrestrial mining to excavate materials from the sea floor, at depths of up to 6,000 metres, then drawing a seawater slurry, containing rock and other solid particles, from the sea floor to ships on the surface.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
              </span>
              {renderText(
                " The slurry is then 'de-watered' and transferred to another vessel for shipping. Extracted seawater is pumped back down and discharged close to the sea floor.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But environmental and legal groups have urged caution, arguing there are potentially massive and unknown ramifications for the environment and for nearby communities, and that the global regulatory framework is not yet drafted.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")},{renderText("27")}
                  </span>
                )}
              </span>

              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Despite arising in the last half century, the 'new global gold rush' of deep-sea mining shares many features with past resource scrambles - including a general disregard for environmental and social impacts, and the marginalisation of indigenous peoples and their rights, a paper written by Julie Hunter and Julian Aguon from Blue Ocean Law, and Pradeep Singh from the Center for Marine Environmental Sciences, Bremen, argues.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                " The authors say that knowledge of the deep seabed remains extremely limited. ",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "'The surface of the Moon, Mars and even Venus have all been mapped and studied in much greater detail, leading marine scientists to commonly remark that, with respect to the deep sea, 'We don't yet know what we need to know'.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Scientific research - including a recent paper in Marine Policy journal - has suggested the deep seabed, and hydrothermal vents, which are created when seawater meets volcanic magma, have crucial impacts upon biodiversity and the global climate.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " The mineral-rich vents and their surrounds are also home to many well-known animals including crustaceans, tubeworms, clams, slugs, anemones and fish. 'It is becoming increasingly clear that deep-sea mining poses a grave threat to these vital seabed functions,' the paper says. 'Extraction methods would produce large sediment plumes and involve the discharge of waste back into the ocean, significantly disturbing seafloor environments,' the paper continues. ''",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "'On deep sea vents, scientists are clear, says Dr Jon Copley of the National Oceanography Centre, Southampton: 'we don't want mining on them.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "The oceans occupy around 70% of the planet and are relatively unexplored, says Mike Johnston, chief executive of Nautilus, a Canadian underwater exploration company: 'It makes sense to explore this untapped potential in an environmentally sustainable way, instead of continually looking at the fast depleting land resources of the planet to meet society's rising needs.'",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("15")}
              </span>
              {renderText(
                " Those leading the global rush to place giant mining machines thousands of metres below the sea surface say the environmental impacts will be far lower than on land. But critics say exotic and little-known ecosystems in the deep oceans could be destroyed and must be protected. 'Mining will be the greatest assault on deep-sea ecosystems ever inflicted by humans,' according to hydrothermal vent expert Verena Tunnicliffe, at the University of Victoria in Canada.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("21")}
              </span>
              {renderText(
                " She argues that active vents must be off-limits for mining to protect the new knowledge and biotechnology spin-offs they can deliver, and that strict controls must be in place elsewhere.",
              )}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ================= Questions 14–17 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–17")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Reading Passage 2 has six paragraphs, A-F. Which paragraph contains the following information?",
            )}
          </p>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 14,
                text: "reference to the rapidly increasing need for one raw material in the transport industry",
              },
              {
                q: 15,
                text: "a rough estimate of the area of the Earth covered by the oceans",
              },
              {
                q: 16,
                text: "how a particular underwater habitat, where minerals and organisms co-exist, is formed",
              },
              {
                q: 17,
                text: "reference to the fact that the countries of the world have yet to agree on rules for the exploration of the seabed",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg">
                <span className="font-bold">{renderText(q.toString())}.</span>{" "}
                {renderText(text)}{" "}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value }; // update state
                      calculateScore(updated); // recalc score immediately
                      return updated;
                    });
                  }}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 18–23 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 18–23")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Match each statement with the correct person or people, A–E.",
            )}
          </p>
          <div className="border p-4 rounded mb-6 max-w-[400px] mx-auto text-lg">
            <h2 className="font-bold text-xl text-center">
              {renderText("List of People")}
            </h2>
            {[
              { letter: "A", name: "Professor Mat Upton" },
              {
                letter: "B",
                name: "Julie Hunter, Julian Aguon and Pradeep Singh",
              },
              { letter: "C", name: "Dr Jon Copley" },
              { letter: "D", name: "Mike Johnston" },
              { letter: "E", name: "Verena Tunnicliffe" },
            ].map(({ letter, name }) => (
              <p key={letter}>
                <strong>{letter}.</strong> {renderText(name)}
              </p>
            ))}
          </div>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 18,
                text: "A move away from the exploration of heavily mined reserves on land is a good idea.",
              },
              {
                q: 19,
                text: "The negative effects of undersea exploration on local areas and their inhabitants are being ignored.",
              },
              {
                q: 20,
                text: "There are more worthwhile things to extract from the sea than minerals.",
              },
              {
                q: 21,
                text: "No other form of human exploration will have such a destructive impact on marine life as deep-sea mining.",
              },
              {
                q: 22,
                text: "More is known about outer space than about what lies beneath the oceans.",
              },
              {
                q: 23,
                text: "There is one marine life habitat where experts agree mining should not take place.",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg">
                <span className="font-bold">{renderText(q.toString())}.</span>{" "}
                {renderText(text)}{" "}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value }; // update state
                      calculateScore(updated); // recalc score immediately
                      return updated;
                    });
                  }}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 24–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 24–26")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
            )}
          </p>

          <div className="space-y-4 border p-4 rounded mb-6 text-lg">
            <h2 className="font-bold text-xl text-center">
              {renderText("Mining the sea floor")}
            </h2>
            {[
              {
                q: 24,
                before:
                  "Mining corporations believe that the mineral resources lying under the sea may be superior to those found in the earth. They also say that these can be removed without producing much",
                after: ".",
              },
              {
                q: 25,
                before: "The extraction is often done by adapting the",
                after:
                  " that has already been used to work on land. The method of excavation involves removing the seawater from the slurry that is brought up to ships and returning it to the seabed.",
              },
              {
                q: 26,
                before: "However, concerned groups strongly believe that",
                after:
                  " is necessary due to the possible number of unidentified consequences.",
              },
            ].map(({ q, before, after }) => (
              <div key={q} className="text-lg flex items-center flex-wrap">
                {/* Before text */}
                <span>{renderText(before)}</span>

                {/* Number button */}
                <button
                  onClick={() => toggleButton(q)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    activeButtons[q]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  {q}
                </button>

                {/* Input field */}
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-24 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value }; // update answers
                      calculateScore(updated); // recalc score immediately
                      return updated;
                    });
                  }}
                />

                {/* After text */}
                {after && <span>{renderText(after)}</span>}
              </div>
            ))}
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
                    {Array.from({ length: 14 }, (_, i) => i + 14).map((num) => {
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
      <Reading4Pagination2024></Reading4Pagination2024>
    </div>
  );
};

export default Reading4Part22024;
