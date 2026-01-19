import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2024 from "../Pagination 2024/Reading1Pagination2024";

const Reading1Part22024 = () => {
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
    // Questions 14–19 (Paragraph Matching)
    14: "D",
    15: "G",
    16: "C",
    17: "A",
    18: "G",
    19: "B",

    // Questions 20–21 (Choose TWO letters)
    "20-21": ["B", "D"],

    // Questions 22–23 (Choose TWO letters)
    "22-23": ["C", "E"],

    // Questions 24–26 (ONE WORD ONLY)
    24: "grain",
    25: "punishment",
    26: "ransom",
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
              {renderText("The pirates of the ancient Mediterranean")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText(
                "In the first and second millennia BCE, pirates sailed around the Mediterranean, attacking ships and avoiding pursuers",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "When one mentions pirates, an image springs to most people's minds of a crew of misfits, daredevils and adventurers in command of a tall sailing ship in the Caribbean Sea.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Yet from the first to the third millennium BCE, thousands of years before these swashbucklers began spreading fear across the Caribbean, pirates prowled the Mediterranean, raiding merchant ships and threatening vital trade routes.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>
              {renderText(
                ' However, despite all efforts and the might of various ancient states, piracy could not be stopped. The situation remained unchanged for thousands of years. Only when the pirates directly threatened the interests of ancient Rome did the Roman Republic organise a massive fleet to eliminate piracy. Under the command of the Roman general Pompey, Rome eradicated piracy, transforming the Mediterranean into "Mare Nostrum" (Our Sea).',
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "Although piracy in the Mediterranean is first recorded in ancient Egypt during the reign of Pharaoh Amenhotep III (c 1390–1353 BCE), it is reasonable to assume it predated this powerful civilisation.",
              )}
              {renderText(
                " This is partly due to the great importance the Mediterranean held at this time, and partly due to its geography.",
              )}
              {renderText(
                " While the Mediterranean region is predominantly fertile, some parts are rugged and hilly, even mountainous.",
              )}
              {renderText(
                " In the ancient times, the inhabitants of these areas relied heavily on marine resources, including fish and salt.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Most had their own boats, possessed good seafaring skills, and unsurpassed knowledge of the local coastline and sailing routes.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              {renderText(
                " Thus, it is not surprising that during hardships, these men turned to piracy.",
              )}
              {renderText(
                " Geography itself further benefited the pirates, with the numerous coves along the coast providing places for them to hide their boats and strike undetected.",
              )}
              {renderText(
                " Before the invention of ocean-going caravels in the 15th century, ships could not easily cross long distances over open water.",
              )}
              {renderText(
                " Thus, in the ancient world most were restricted to a few well-known navigable routes that followed the coastline.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Caught in a trap, a slow merchant ship laden with goods had no other option but to surrender.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                " In addition, knowledge of the local area helped the pirates to avoid retaliation once a state fleet arrived.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "One should also add that it was not unknown in the first and second millennia BCE for governments to resort to pirates' services, especially during wartime, employing their skills and numbers against their opponents.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " A pirate fleet would serve in the first wave of attack, preparing the way for the navy.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
              {renderText(
                " Some of the regions were known for providing safe harbours to pirates, who, in return, boosted the local economy.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "The first known record of a named group of Mediterranean pirates, made during the rule of ancient Egyptian Pharaoh Akhenaten (c 1353–1336 BCE), was in the Amarna Letters.",
              )}
              {renderText(
                " These were extracts of diplomatic correspondence between the pharaoh and his allies, and covered many pressing issues, including piracy.",
              )}
              {renderText(
                " It seems the pharaoh was troubled by two distinct pirate groups, the Lukka and the Sherden.",
              )}
              {renderText(
                " Despite the Egyptian fleet's best efforts, the pirates continued to cause substantial disruption to regional commerce.",
              )}
              {renderText(
                " In the letters, the king of Alashiya (modern Cyprus) rejected Akhenaten's claims of a connection with the Lukka (based in modern-day Turkey).",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The king assured Akhenaten he was prepared to punish any of his subjects involved in piracy.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "The ancient Greek world's experience of piracy was different from that of Egyptian rulers.",
              )}
              {renderText(
                " While Egypt's power was land-based, the ancient Greeks relied on the Mediterranean in almost all aspects of life, from trade to warfare.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Interestingly, in his works the Iliad and the Odyssey, the ancient Greek writer Homer not only condones, but praises the lifestyle and actions of pirates.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                " The opinion remained unchanged in the following centuries.",
              )}
              {renderText(
                " The ancient Greek historian Thucydides, for instance, glorified pirates' daring attacks on ships or even cities.",
              )}
              {renderText(" For Greeks, piracy was a part of everyday life.")}
              {renderText(
                " Even high-ranking members of the state were not beyond engaging in such activities.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " According to the Greek orator Demosthenes, in 355 BCE, Athenian ambassadors made a detour from their official travel to capture a ship sailing from Egypt, taking the wealth found onboard for themselves!",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>
              {renderText(
                " The Greeks' liberal approach towards piracy does not mean they always tolerated it, but attempts to curtail piracy were hampered by the large number of pirates operating in the Mediterranean.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "The rising power of ancient Rome required the Roman Republic to deal with piracy in the Mediterranean.",
              )}
              {renderText(
                " While piracy was a serious issue for the Republic, Rome profited greatly from its existence.",
              )}
              {renderText(
                " Pirate raids provided a steady source of slaves, essential for Rome's agriculture and mining industries.",
              )}
              {renderText(
                " But this arrangement could work only while the pirates left Roman interests alone.",
              )}
              {renderText(
                " Pirate attacks on grain ships, which were essential to Roman citizens, led to angry voices in the Senate, demanding punishment of the culprits.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24,25")}
                  </span>
                )}
              </span>
              {renderText(
                " Rome, however, did nothing, further encouraging piracy.",
              )}
              {renderText(
                " By the 1st century BCE, emboldened pirates kidnapped prominent Roman dignitaries, asking for a large ransom to be paid.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Their most famous hostage was none other than Julius Caesar, captured in 75 BCE.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "By now, Rome was well aware that pirates had outlived their usefulness.",
              )}
              {renderText(" The time had come for concerted action.")}
              {renderText(
                " In 67 BCE, a new law granted Pompey vast funds to combat the Mediterranean menace.",
              )}
              {renderText(
                " Taking personal command, Pompey divided the entire Mediterranean into 13 districts, assigning a fleet and commander to each.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                " After cleansing one district of pirates, the fleet would join another in the next district.",
              )}
              {renderText(
                " The process continued until the entire Mediterranean was free of pirates.",
              )}
              {renderText(
                " Although thousands of pirates died at the hands of Pompey's troops, as a long-term solution to the problem, many more were offered land in fertile areas located far from the sea.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                " Instead of a maritime menace, Rome got productive farmers that further boosted its economy.",
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
            {renderText("Reading Passage 2 has seven paragraphs, A-G.")}
          </h2>
          <h2 className="text-lg  mb-3">
            {renderText("Which paragraph contains the following information?")}
          </h2>
          <h2 className=" mb-3">
            {renderText(
              "Choose the correct letter, A-G, in boxes 14-19 on your answer sheet.",
            )}
          </h2>
          <h2 className=" mb-3">
            {renderText("NB You may use any letter more than once.")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("The pirates of the ancient Mediterranean")}
            </h1>

            {/* ================= Questions 14–19 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 14–19</h2>
              <p className="mt-2">
                {renderText(
                  "Which paragraph contains the following information? Choose the correct letter, A–G.",
                )}
              </p>

              {[
                {
                  num: 14,
                  text: "a reference to a denial of involvement in piracy",
                },
                {
                  num: 15,
                  text: "details of how a campaign to eradicate piracy was carried out",
                },
                {
                  num: 16,
                  text: "a mention of the circumstances in which states in the ancient world would make use of pirates",
                },
                {
                  num: 17,
                  text: "a reference to how people today commonly view pirates",
                },
                {
                  num: 18,
                  text: "an explanation of how some people were encouraged not to return to piracy",
                },
                {
                  num: 19,
                  text: "a mention of the need for many sailing vessels to stay relatively close to land",
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span className="">{renderText(text)}</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 20–21 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 20 and 21</h2>
              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO statements does the writer make about inhabitants of the Mediterranean region in the ancient world?",
                )}
              </p>

              {[
                "They often used stolen vessels to carry out pirate attacks.",
                "They managed to escape capture by the authorities because they knew the area so well.",
                "They paid for information about the routes merchant ships would take.",
                "They depended more on the sea for their livelihood than on farming.",
                "They stored many of the goods taken in pirate attacks in coves along the coastline.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["20-21"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("20-21", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 22–23 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 22 and 23</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO statements does the writer make about piracy and ancient Greece?",
                )}
              </p>

              {[
                "The state estimated that very few people were involved in piracy.",
                "Attitudes towards piracy changed shortly after the Iliad and the Odyssey were written.",
                "Important officials were known to occasionally take part in piracy.",
                "Every citizen regarded pirate attacks on cities as unacceptable.",
                "A favourable view of piracy is evident in certain ancient Greek texts.",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["22-23"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("22-23", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 24–26 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 24–26</h2>
              <p className="mt-2">
                {renderText(
                  "Complete the summary below. Choose ONE WORD ONLY from the passage.",
                )}
              </p>

              <div className="mt-4 space-y-4 border p-4">
                <h2 className="font-bold text-xl text-center">
                  {renderText("Ancient Rome and piracy")}
                </h2>
                <p>
                  {renderText(
                    "Piracy was an issue ancient Rome had to deal with, but it also brought some benefits. However, attacks on vessels transporting",
                  )}{" "}
                  <button
                    onClick={() => toggleButton(24)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[24]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    24
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32"
                    value={userAnswers[24] || ""}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        24: e.target.value,
                      }))
                    }
                  />{" "}
                  {renderText("to Rome resulted in calls for")}{" "}
                  <button
                    onClick={() => toggleButton(25)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[25]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    25
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32"
                    value={userAnswers[25] || ""}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        25: e.target.value,
                      }))
                    }
                  />{" "}
                  {renderText(
                    "for the pirates responsible. Some pirates even demanded a",
                  )}{" "}
                  <button
                    onClick={() => toggleButton(26)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 ${
                      activeButtons[26]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    26
                  </button>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32"
                    value={userAnswers[26] || ""}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        26: e.target.value,
                      }))
                    }
                  />
                  .
                </p>
              </div>
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
                      {renderText("All Answers (14–26)")}
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
      <Reading1Pagination2024></Reading1Pagination2024>
    </div>
  );
};

export default Reading1Part22024;
