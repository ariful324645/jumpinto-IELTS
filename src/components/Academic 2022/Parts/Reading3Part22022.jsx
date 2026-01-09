import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2022 from "../Pagination2022/Reading3Pagination2022";

const Reading3Part22022 = () => {
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
    // Questions 14–20 (MATCHING INFORMATION, Sections A–H)
    14: "C", // examples of a range of potential environmental advantages of oil palm cultivation
    15: "F", // description of an organisation controlling environmental impact (RSPO)
    16: "A", // widespread global use of palm oil
    17: "H", // particular species benefiting ecosystem (bird’s nest fern)
    18: "B", // figures showing rapid expansion of palm oil industry
    19: "D", // economic justification for not opposing palm oil industry
    20: "E", // creatures badly affected by oil palm plantations

    // Questions 21–22 (MULTI SELECT – Choose TWO letters, A–E)
    "21-22": ["B", "C"],
    // B: demands openness and honesty
    // C: took several years to establish certification criteria

    // Questions 23–26 (NO MORE THAN TWO WORDS)
    23: "solid", // stays solid even when not refrigerated
    24: "orangutan", // best known animal affected
    25: "biodiversity", // growers must check biodiversity routinely
    26: "biodiversity", // restore biodiversity in plantations
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
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22") {
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
    localStorage.setItem("/listening3Part22022", newScore);
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
            <h1 className="text-2xl font-bold mb-5 text-center">Palm oil</h1>

            <p className="text-lg font-bold">A</p>
            <p className="text-lg">
              Palm oil is an edible oil derived from the fruit of the African
              oil palm tree, and is currently the most consumed vegetable oil in
              the world.It's almost certainly in the soap we wash with in the
              morning, the sandwich we have for lunch, and the biscuits we snack
              on during the day.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Why is palm oil so attractive for manufacturers?Primarily
                because its unique properties - such as remaining solid at room
                temperature - make it an ideal ingredient for long-term
                preservation, allowing many packaged foods on supermarket
                shelves to have 'best before' dates of months, even years, into
                the future.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    16
                  </span>
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    23
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">B</p>
            <p className="text-lg">
              Many farmers have seized the opportunity to maximise the planting
              of oil palm trees.Between 1990 and 2012, the global land area
              devoted to growing oil palm trees grew from 6 to 17 million
              hectares, now accounting for around ten percent of total cropland
              in the entire world.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                From a mere two million tonnes of palm oil being produced
                annually globally 50 years ago, there are now around 60 million
                tonnes produced every single year, a figure looking likely to
                double or even triple by the middle of the century.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    18
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">C</p>
            <p className="text-lg">
              However, there are multiple reasons why conservationists cite the
              rapid spread of oil palm plantations as a major concern.There are
              countless news stories of deforestation, habitat destruction and
              dwindling species populations, all as a direct result of land
              clearing to establish oil palm tree monoculture on an industrial
              scale, particularly in Malaysia and Indonesia.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Endangered species - most famously the Sumatran orangutan, but
                also rhinos, elephants, tigers, and numerous other fauna - have
                suffered from the unstoppable spread of oil palm plantations.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                      20
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      24
                    </span>
                  </>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">D</p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "Palm oil is surely one of the greatest threats to global
                biodiversity," declares Dr Farnon Ellwood of the University of
                the West of England, Bristol."Palm oil is replacing rainforest,
                and rainforest is where all the species are.That's a problem."
              </span>
              This has led to some radical questions among environmentalists,
              such as whether consumers should try to boycott palm oil entirely.
            </p>
            <p className="text-lg">
              Meanwhile Bhavani Shankar, Professor at London's School of
              Oriental and African Studies, argues, 'It's easy to say that palm
              oil is the enemy and we should be against it.It makes for a more
              dramatic story, and it's very intuitive.But given the complexity
              of the argument, I think a much more nuanced story is closer to
              the truth.'
            </p>

            <br />

            <p className="text-lg font-bold">E</p>
            <p className="text-lg">
              One response to the boycott movement has been the argument for the
              vital role palm oil plays in lifting many millions of people in
              the developing world out of poverty.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Is it desirable to have palm oil boycotted, replaced, eliminated
                from the global supply chain, given how many low-income people
                in developing countries depend on it for their livelihoods?How
                best to strike a utilitarian balance between these competing
                factors has become a serious bone of contention.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    19
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">F</p>
            <p className="text-lg">
              Even the deforestation argument isn't as straightforward as it
              seems.Oil palm plantations produce at least four and potentially
              up to ten times more oil per hectare than soybean, rapeseed,
              sunflower or other competing oils.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                That immensely high yield - which is predominantly what makes it
                so profitable - is potentially also an ecological benefit.If ten
                times more palm oil can be produced from a patch of land than
                any competing oil, then ten times more land would need to be
                cleared in order to produce the same volume of oil from that
                competitor.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    14
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              As for the question of carbon emissions, the issue really depends
              on what oil palm trees are replacing.Crops vary in the degree to
              which they sequester carbon - in other words, the amount of carbon
              they capture from the atmosphere and store within the plant.The
              more carbon a plant sequesters, the more it reduces the effect of
              climate change.As Shankar explains: '[Palm oil production]
              actually sequesters more carbon in some ways than other
              alternatives.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                [...] Of course, if you're cutting down virgin forest it's
                terrible - that's what's happening in Indonesia and Malaysia,
                it's been allowed to get out of hand.But if it's replacing rice,
                for example, it might actually sequester more carbon.'
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    14
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">G</p>
            <p className="text-lg">
              The industry is now regulated by a group called the Roundtable on
              Sustainable Palm Oil (RSPO), consisting of palm growers,
              retailers, product manufacturers, and other interested parties.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Over the past decade or so, an agreement has gradually been
                reached regarding standards that producers of palm oil have to
                meet in order for their product to be regarded as officially
                'sustainable'.The RSPO insists upon no virgin forest clearing,
                transparency and regular assessment of carbon stocks, among
                other criteria.Only once these requirements are fully satisfied
                is the oil allowed to be sold as certified sustainable palm oil
                (CSPO).Recent figures show that the RSPO now certifies around 12
                million tonnes of palm oil annually, equivalent to roughly 21
                percent of the world's total palm oil production.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                      15
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      21
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      25
                    </span>
                  </>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">H</p>
            <p className="text-lg">
              There is even hope that oil palm plantations might not need to be
              such sterile monocultures, or 'green deserts', as Ellwood
              describes them.New research at Ellwood's lab hints at one plant
              which might make all the difference.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The bird's nest fern (Asplenium nidus) grows on trees in an
                epiphytic fashion (meaning it's dependent on the tree only for
                support, not for nutrients), and is native to many tropical
                regions, where as a keystone species it performs a vital
                ecological role.Ellwood believes that reintroducing the bird's
                nest fern into oil palm plantations could potentially allow
                these areas to recover their biodiversity, providing a home for
                all manner of species, from fungi and bacteria, to invertebrates
                such as insects, amphibians, reptiles and even mammals.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                      17
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      26
                    </span>
                  </>
                )}
              </span>
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
          {/* ================= Questions 14–20 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 14–20</h2>

          <p className="mb-4">
            Reading Passage 2 has eight sections, A–H.
            <br />
            Which section contains the following information?
            <br />
            Choose the correct letter, A–H, in boxes 14–20 on your answer sheet.
          </p>

          <ul className="list-decimal list-inside space-y-4 text-lg">
            {[
              "examples of a range of potential environmental advantages of oil palm tree cultivation",
              "description of an organisation which controls the environmental impact of palm oil production",
              "examples of the widespread global use of palm oil",
              "reference to a particular species which could benefit the ecosystem of oil palm plantations",
              "figures illustrating the rapid expansion of the palm oil industry",
              "an economic justification for not opposing the palm oil industry",
              "examples of creatures badly affected by the establishment of oil palm plantations",
            ].map((text, idx) => {
              const qNum = 14 + idx;
              return (
                <li key={qNum} className="flex items-center gap-2">
                  <span className="">
                    <span className="font-bold">{qNum}</span> {text}
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    defaultValue=""
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                  >
                    <option value="" disabled>
                      {qNum}
                    </option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 21–22 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 21–22</h2>
          <h2 className="mt-4">
            {" "}
            Choose <strong>TWO</strong> letters, A–E.
          </h2>
          <p className="mt-4">
            Which TWO statements are made about the Roundtable on Sustainable
            Palm Oil (RSPO)?
          </p>

          {[
            "It started recently.",
            "More children attend after school than before school.",
            "An average of 50 children attend in the mornings.",
            "A child cannot attend both the before and after school sessions.",
            "The maximum number of children who can attend is 70.",
          ].map((text, index) => {
            const value = String.fromCharCode(65 + index);
            const selected = userAnswers["21-22"] || [];
            const checked = selected.includes(value);
            const disabled = selected.length === 2 && !checked;

            return (
              <label
                key={value}
                className={`flex items-center gap-3 mb-1 ${
                  disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => handleInputChange("21-22", value)}
                />
                <span className="font-semibold">{value}.</span>
                <span>{renderText(text)}</span>
              </label>
            );
          })}

          {/* ================= Questions 23–26 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 23–26</h2>

          <p className="mb-4">
            Complete the sentences below.
            <br />
            Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for
            each answer.
          </p>

          <div className="space-y-4 text-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">23</span>
              <span>
                One advantage of palm oil for manufacturers is that it stays
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 text-center"
                onChange={(e) => handleInputChange(23, e.target.value)}
              />
              <span>even when not refrigerated.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">24</span>
              <span>The</span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 text-center"
                onChange={(e) => handleInputChange(24, e.target.value)}
              />
              <span>
                is the best known of the animals suffering habitat loss as a
                result of oil palm plantations.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">25</span>
              <span>
                As one criterion for certification, the RSPO insists that
                growers check
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 text-center"
                onChange={(e) => handleInputChange(25, e.target.value)}
              />
              <span>on a routine basis.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">26</span>
              <span>
                Ellwood and his team are investigating whether the bird’s nest
                fern could restore
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 text-center"
                onChange={(e) => handleInputChange(26, e.target.value)}
              />
              <span>in oil palm plantations.</span>
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
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (11–20)
                  </h3>

                  <ul className="space-y-3">
                    {[14, 15, 16, 17, 18, 19, 20, "21-22", 23, 24, 25, 26].map(
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
      <Reading3Pagination2022></Reading3Pagination2022>
    </div>
  );
};

export default Reading3Part22022;
