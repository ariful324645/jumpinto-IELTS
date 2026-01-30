import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2025 from "../Pagination 2025/Reading3Pagination2025";

const Reading3Part22025 = () => {
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
    // Questions 14–19 (Dropdown, headings i–vii)
    14: "iii", // Section A → Working to lessen the problems
    15: "v", // Section B → Two clear educational goals
    16: "iv", // Section C → Disagreement about the accuracy of a certain phrase
    17: "vii", // Section D → A warning of further trouble ahead
    18: "vi", // Section E → Promoting hope
    19: "i", // Section F → Tried and tested solutions

    // Questions 20–21 (Multiple select, letters A–E)
    "20-21": ["A", "C"], // Causes of damage to coral reefs mentioned: extreme storms, contamination from waste

    // Questions 22–23 (Multiple select, letters A–E)
    "22-23": ["A", "B"], // True statements about researchers: expand coral numbers, identify resilient corals

    // Questions 24–26 (Input fields, ONE WORD ONLY)
    24: "polyps", // Corals have a number of polyps
    25: "nutrients", // Algae gain nutrients from being inside the coral
    26: "colour", // Increases in warmth can remove the colour from coral
  };

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "20-21" || id === "22-23") {
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

  // --- Calculate live score ---
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

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Can the planet's coral reefs be saved?")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "Conservationists and scientists are working on ways to protect and restore the world's coral reefs.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "Conservationists have put the final touches to a giant artificial reef they have been assembling at the world-renowned Zoological Society of London (London Zoo).",
              )}
              {renderText(
                " Samples of the planet's most spectacular corals - vivid green branching coral, yellow scroll, blue ridge and many more species - have been added to the giant tank along with fish that thrive in their presence: blue tang, clownfish and many others.",
              )}
              {renderText(
                " The reef is in the zoo's new gallery, Tiny Giants, which is dedicated to the minuscule invertebrate creatures that sustain life across the planet.",
              )}
              {renderText(
                " The coral reef tank and its seven-metre-wide window form the core of the exhibition.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  `"Coral reefs are the most diverse ecosystems on Earth and we want to show people how wonderful they are," said Paul Pearce-Kelly, senior curator of invertebrates and fish at the Zoological Society of London.`,
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                `"However, we also want to highlight the research and conservation efforts that are now being carried out to try to save them from the threat of global warming. They want people to see what is being done to try to save these wonders."`,
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Corals are composed of tiny animals, known as polyps, with tentacles for capturing small marine creatures in the sea water.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "These polyps are transparent but get their brilliant tones of pink, orange, blue, green, etc. from algae that live within them, which in turn get protection, while their photosynthesising of the sun's rays provides nutrients for the polyps.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15,25")}
                  </span>
                )}
              </span>
              {renderText(
                "This comfortable symbiotic relationship has led to the growth of coral reefs that cover 0.1% of the planet's ocean bed while providing homes for more than 25% of marine species, including fish, molluscs, sponges and shellfish.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "As a result, coral reefs are often described as the 'rainforests of the sea', though the comparison is dismissed by some naturalists, including David Attenborough.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  `"People say you cannot beat the rainforest," Attenborough has stated. "But that is simply not true. You go there and the first thing you think is: where... are the birds? Where are the animals? They are hiding in the trees, of course. No, if you want beauty and wildlife, you want a coral reef. Put on a mask and stick your head under the water. The sight is mind-blowing."`,
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "Unfortunately, these majestic sights are now under very serious threat, with the most immediate problem coming in the form of thermal stress.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Rising ocean temperatures are triggering bleaching events that strip reefs of their colour and eventually kill them.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17,26")}
                  </span>
                )}
              </span>
              {renderText(
                "Other menaces include ocean acidification, sea level increase, pollution by humans, deoxygenation and ocean current changes, while the climate crisis is also increasing habitat destruction. As a result, vast areas - including massive chunks of Australia's Great Barrier Reef - have already been destroyed, and scientists advise that more than 90% of reefs could be lost by 2050 unless urgent action is taken to tackle global heating and greenhouse gas emissions.",
              )}
              {renderText(
                "Pearce-Kelly says that coral reefs have to survive really harsh conditions - wave erosion and other factors. And when things start to go wrong in the oceans, then corals will be the first to react. And that is exactly what we are seeing now. Coral reefs are dying and they are telling us that all is not well with our planet.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "However, scientists are trying to pinpoint hardy types of coral that could survive our overheated oceans, and some of this research will be carried out at London Zoo.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"Behind our... coral reef tank we have built laboratories where scientists will be studying coral species," said Pearce-Kelly.',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18,22,23")}
                  </span>
                )}
              </span>
              {renderText(
                "One aim will be to carry out research on species to find those that can survive best in warm, acidic waters. Another will be to try to increase coral breeding rates. Coral spawn just once a year, however, aquarium-based research has enabled some corals to spawn artificially, which can assist coral reef restoration efforts. And if this can be extended for all species, we could consider the launching of coral-spawning programmes several times a year. That would be a big help in restoring blighted reefs.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Research in these fields is being conducted in laboratories around the world, with the London Zoo centre linked to this global network.",
              )}
              {renderText(
                "Studies carried out in one centre can then be tested in others. The resulting young coral can then be displayed in the tank in Tiny Giants.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"The crucial point is that the progress we make in making coral better able to survive in a warming world can be shown to the public and encourage them to believe that we can do something to save the planet\'s reefs," said Pearce-Kelly.',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                '"Saving our coral reefs is now a critically important ecological goal."',
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–26")}
          </h2>
          <h2 className=" mb-3">
            {renderText("Reading Passage 2 has six sections, A-F.")}
          </h2>
          <h2 className="text-lg mb-3">
            {renderText(
              "Choose the correct heading for each section from the list of headings below.",
            )}
          </h2>
          <h2 className=" mb-3">
            {renderText(
              "Choose the correct number, i-vii, in boxes 14-19 on your answer sheet.",
            )}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            {/* ================= Questions 14–19 (Dropdown) ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 14–19</h2>
              <p className="mt-2">
                {renderText(
                  "Choose the correct heading for each section from the list of headings below.",
                )}
              </p>

              {[
                { num: 14, section: "Section A" },
                { num: 15, section: "Section B" },
                { num: 16, section: "Section C" },
                { num: 17, section: "Section D" },
                { num: 18, section: "Section E" },
                { num: 19, section: "Section F" },
              ].map(({ num, section }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span>{renderText(section)}</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["i", "ii", "iii", "iv", "v", "vi", "vii"].map(
                      (opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 20–21 (Multiple select) ================= */}
            <div className="mt-6">
              <h2 className="font-bold text-xl">Questions 20–21</h2>
              <p className="mt-2">{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO of these causes of damage to coral reefs are mentioned by the writer of the text?",
                )}
              </p>

              {[
                "A. a rising number of extreme storms",
                "B. the removal of too many fish from the sea",
                "C. the contamination of the sea from waste",
                "D. increased disease among marine species",
                "E. alterations in the usual flow of water in the seas",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["20-21"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("20-21", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt.slice(3))}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 22–23 (Multiple select) ================= */}
            <div className="mt-6">
              <h2 className="font-bold text-xl">Questions 22–23</h2>
              <p className="mt-2">{renderText("Choose TWO letters, A–E.")}</p>
              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO of the following statements are true of the researchers at London Zoo?",
                )}
              </p>

              {[
                "A. They are hoping to expand the numbers of different corals being bred in laboratories.",
                "B. They want to identify corals that can cope well with the changed sea conditions.",
                "C. They are looking at ways of creating artificial reefs that corals could grow on.",
                "D. They are trying out methods that would speed up reproduction in some corals.",
                "E. They are investigating materials that might protect reefs from higher temperatures.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["22-23"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("22-23", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt.slice(3))}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 24–26 (Input fields) ================= */}
            <div className="mt-6">
              <h2 className="font-bold text-xl">Questions 24–26</h2>
              <p className="mt-2">
                {renderText(
                  "Complete the sentences below. Choose ONE WORD ONLY from the passage.",
                )}
              </p>

              {[
                { num: 24, text: "Corals have a number of" },
                { num: 25, text: "Algae gain" },
                {
                  num: 26,
                  text: "Increases in the warmth of the sea water can remove the",
                },
              ].map(({ num, text }) => (
                <p key={num} className="mt-4 flex items-center gap-2">
                  <span className="font-bold">{num}</span>
                  {renderText(text)}
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32 mx-2"
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    placeholder={num}
                  />
                  {renderText(
                    num === 24
                      ? "which they use to collect their food."
                      : num === 25
                        ? "from being inside the coral."
                        : "from coral.",
                  )}
                </p>
              ))}
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
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (11–20)")}
                    </h3>

                    <ul className="space-y-3">
                      {[
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        "20-21",
                        "22-23",
                        24,
                        25,
                        26,
                      ].map((num) => {
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
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Reading3Pagination2025></Reading3Pagination2025>
    </div>
  );
};

export default Reading3Part22025;
