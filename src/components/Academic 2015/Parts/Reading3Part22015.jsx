import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading3Pagination2015 from "../Pagination 2015/Reading3Pagination2015";

//  Marks show

const Reading3Part22015 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 38;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        answers[key]?.trim().toLowerCase() ===
        correctAnswers[key].trim().toLowerCase()
      ) {
        newScore += 1;
      }
    });
    setScore(newScore);
    localStorage.setItem("/reading4Part32020", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

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

  const correctAnswers = {
    // ================= Questions 27–31 (Summary completion) =================
    27: "B", // mass production
    28: "J", // readers
    29: "L", // assistants
    30: "E", // paints
    31: "D", // public

    // ================= Questions 32–35 (Multiple choice A–D) =================
    32: "C", // the negative effect a museum can have on visitors' opinions of themselves
    33: "D", // they feel their personal reaction is of no significance
    34: "A", // the variety of works on display and the way they are arranged
    35: "D", // have a specific beginning or end

    // ================= Questions 36–40 (YES / NO / NOT GIVEN) =================
    36: "NOT GIVEN", // Art history should focus on discovering the meaning of art using a range of media
    37: "YES", // The approach of art historians conflicts with that of art museums
    38: "YES", // People should be encouraged to give their opinions openly on works of art
    39: "NOT GIVEN", // Reproductions of fine art should only be sold to the public if they are of high quality
    40: "NOT GIVEN", // In the future, those with power are likely to encourage more people to enjoy art
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
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

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
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

          <div className="mt-4">
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below."
              )}
            </h1>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {renderText("Autumn leaves")}
            </h1>
            <p className="text-lg mb-5">
              {renderText(
                "Canadian writer Jay Ingram investigates the mystery of why leaves turn red in the fall."
              )}
            </p>

            {/* Paragraphs A–I */}
            <p className="font-bold mb-1">{renderText("A")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "One of the most captivating natural events of the year in many areas throughout North America is the turning of the leaves in the fall. The colours are magnificent, but the question of exactly why some trees turn yellow or orange, and others red or purple, is something which has long puzzled scientists."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("B")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Summer leaves are green because they are full of chlorophyll, the molecule that captures sunlight and converts that energy into new building materials for the tree. As fall approaches in the northern hemisphere, the amount of solar energy available declines considerably. For many trees - evergreen conifers being an exception - the best strategy is to abandon photosynthesis until the spring. So rather than maintaining the now redundant leaves throughout the winter, the tree saves its precious resources and discards them. But before letting its leaves go, the tree dismantles their chlorophyll molecules and ships their valuable nitrogen back into the twigs. As chlorophyll is depleted, other colours that have been dominated by it throughout the summer begin to be revealed. This unmasking explains the autumn colours of yellow and orange, but not the brilliant reds and purples of trees such as the maple or sumac."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("C")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "The source of the red is widely known: it is created by anthocyanins, water-soluble plant pigments reflecting the red to blue range of the visible spectrum. They belong to a class of sugar-based chemical compounds also known as flavonoids. What's puzzling is that anthocyanins are actually newly minted, made in the leaves at the same time as the tree is preparing to drop them. But it is hard to make sense of the manufacture of anthocyanins - why should a tree bother making new chemicals in its leaves when it's already scrambling to withdraw and preserve the ones already there?"
              )}
            </p>

            <p className="font-bold mb-1">{renderText("D")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Some theories about anthocyanins have argued that they might act as a chemical defence against attacks by insects or fungi, or that they might attract fruit-eating birds or increase a leaf's tolerance to freezing. However, there are problems with each of these theories, including the fact that leaves are red for such a relatively short period that the expense of energy needed to manufacture the anthocyanins would outweigh any anti-fungal or anti-herbivore activity achieved."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("E")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "It has also been proposed that trees may produce vivid red colours to convince herbivorous insects that they are healthy and robust and would be easily able to mount chemical defences against infestation. If insects paid attention to such advertisements, they might be prompted to lay their eggs on a duller, and presumably less resistant host. The flaw in this theory lies in the lack of proof to support it. No one has as yet ascertained whether more robust trees sport the brightest leaves, or whether insects make choices according to colour intensity."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("F")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Perhaps the most plausible suggestion as to why leaves would go to the trouble of making anthocyanins when they're busy packing up for the winter is the theory known as the 'light screen' hypothesis. It sounds paradoxical, because the idea behind this hypothesis is that the red pigment is made in autumn leaves to protect chlorophyll, the light-absorbing chemical, from too much light. Why does chlorophyll need protection when it is the natural world's supreme light absorber? Why protect chlorophyll at a time when the tree is breaking it down to salvage as much of it as possible?"
              )}
            </p>

            <p className="font-bold mb-1">{renderText("G")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Chlorophyll, although exquisitely evolved to capture the energy of sunlight, can sometimes be overwhelmed by it, especially in situations of drought, low temperatures, or nutrient deficiency. Moreover, the problem of oversensitivity to light is even more acute in the fall, when the leaf is busy preparing for winter by dismantling its internal machinery. The energy absorbed by the chlorophyll molecules of the unstable autumn leaf is not immediately channelled into useful products and processes, as it would be in an intact summer leaf. The weakened fall leaf then becomes vulnerable to the highly destructive effects of the oxygen created by the excited chlorophyll molecules."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("H")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Even if you had never suspected that this is what was going on when leaves turn red, there are clues out there. One is straightforward: on many trees, the leaves that are the reddest are those on the side of the tree which gets most sun. Not only that, but the red is brighter on the upper side of the leaf. It has also been recognised for decades that the best conditions for intense red colours are dry, sunny days and cool nights, conditions that nicely match those that make leaves susceptible to excess light. And finally, trees such as maples usually get much redder the more north you travel in the northern hemisphere. It's colder there, they're more stressed, their chlorophyll is more sensitive and it needs more sunblock."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("I")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "What is still not fully understood, however, is why some trees resort to producing red pigments while others don't bother, and simply reveal their orange or yellow hues. Do these trees have other means at their disposal to prevent overexposure to light in autumn? Their story, though not as spectacular to the eye, will surely turn out to be as subtle and as complex."
              )}
            </p>

            <p className="text-lg mb-5 font-medium">
              {renderText(
                "* photosynthesis: the production of new material from sunlight, water and carbon dioxide"
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 14–18 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 14–18")}
            </h2>
            <p>{renderText("Reading Passage 2 has nine paragraphs, A–I.")}</p>
            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A–I, in boxes 14–18 on your answer sheet. NB You may use any letter more than once."
              )}
            </p>

            {[
              {
                q: 14,
                text: "a description of the substance responsible for the red colouration of leaves",
              },
              {
                q: 15,
                text: "the reason why trees drop their leaves in autumn",
              },
              {
                q: 16,
                text: "some evidence to confirm a theory about the purpose of the red leaves",
              },
              { q: 17, text: "an explanation of the function of chlorophyll" },
              {
                q: 18,
                text: "a suggestion that the red colouration in leaves could serve as a warning signal",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center gap-2 flex-wrap mt-4">
                <span className="flex-1">{renderText(text)}</span>
                <div className="relative w-24">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-2 py-2 pr-8"
                  >
                    <option value="">{q}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            ))}

            {/* ================= Questions 19–22 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 19–22")}
            </h2>
            <p>{renderText("Complete the notes below.")}</p>
            <p>
              {renderText(
                "Choose ONE WORD ONLY from the passage for each answer."
              )}
            </p>

            <div className="border p-4 mt-4">
              <h3 className="font-bold text-xl text-center mb-4">
                {renderText("Why believe the 'light screen' hypothesis?")}
              </h3>
              {[
                {
                  q: 19,
                  text: "The most vividly coloured red leaves are found on the side of the tree facing the ___.",
                },
                {
                  q: 20,
                  text: "The ___ surfaces of leaves contain the most red pigment.",
                },
                {
                  q: 21,
                  text: "Red leaves are most abundant when daytime weather conditions are ___ and sunny.",
                },
                {
                  q: 22,
                  text: "The intensity of the red colour of leaves increases as you go further ___.",
                },
              ].map(({ q, text }) => (
                <div key={q} className="flex items-center gap-2 flex-wrap mt-4">
                  <span className="flex-1">{renderText(text)}</span>
                  <input
                    type="text"
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="border-2 border-gray-300 rounded-md px-2 py-2 w-24"
                  />
                </div>
              ))}
            </div>

            {/* ================= Questions 23–25 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 23–25")}
            </h2>
            <p>
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 2?"
              )}
            </p>
            <p>{renderText("In boxes 23–25 on your answer sheet, choose")}</p>
            <ul className="list-disc ml-5">
              <li>
                {renderText(
                  "TRUE if the statement agrees with the information"
                )}
              </li>
              <li>
                {renderText(
                  "FALSE if the statement contradicts the information"
                )}
              </li>
              <li>
                {renderText("NOT GIVEN if there is no information on this")}
              </li>
            </ul>

            {[
              {
                q: 23,
                text: "It is likely that the red pigments help to protect the leaf from freezing temperatures.",
              },
              {
                q: 24,
                text: "The 'light screen' hypothesis would initially seem to contradict what is known about chlorophyll.",
              },
              {
                q: 25,
                text: "Leaves which turn colours other than red are more likely to be damaged by sunlight.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex flex-col gap-2 mt-4">
                <p className="font-medium">
                  {q}. {renderText(text)}
                </p>
                {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${q}`}
                      value={opt}
                      checked={userAnswers[q] === opt}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="radio radio-accent"
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            ))}

            {/* ================= Question 26 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Question 26")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B, C or D.")}</p>

            <div className="flex flex-col gap-2 mt-4">
              <p className="font-medium">
                {renderText(
                  "For which of the following questions does the writer offer an explanation?"
                )}
              </p>
              {[
                "A. why conifers remain green in winter",
                "B. how leaves turn orange and yellow in autumn",
                "C. how herbivorous insects choose which trees to lay their eggs in",
                "D. why anthocyanins are restricted to certain trees",
              ].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q26"
                    value={opt[0]}
                    checked={userAnswers[26] === opt[0]}
                    onChange={(e) => handleInputChange(26, e.target.value)}
                    className="radio radio-accent"
                  />
                  <span>{renderText(opt)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Reading3Pagination2015></Reading3Pagination2015>
    </div>
  );
};

export default Reading3Part22015;
