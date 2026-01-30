import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2025 from "../Pagination 2025/Reading3Pagination2025";

const Reading3Part32025 = () => {
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
    localStorage.setItem("/2022/Test 1/reading", newScore); // match your latest key
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
    // Questions 27–33 (Experts A-C)
    27: "C", // For our own safety, humans will need to restrict robots → Kathleen Richardson
    28: "B", // The risk of robots harming us is less serious than humans believe → Daniel Wolpert
    29: "A", // Decades for robot intelligence to be imaginative → Martin Rees
    30: "C", // Considering if treating robots fairly → Kathleen Richardson
    31: "A", // Robots more help on Earth than in space → Martin Rees
    32: "B", // High-quality sci-fi may be as accurate as mediocre scientists → Daniel Wolpert
    33: "A", // Those looking forward to greater intelligence → Martin Rees

    // Questions 34–36 (Sentence completion A–D)
    34: "D", // Ethical aspect → the harm already done by AI
    35: "B", // Extent of → advances made in machine intelligence so far
    36: "C", // Disagreement → changes made to other planets for our own benefit

    // Questions 37–40 (Multiple choice A–D)
    37: "B", // Richardson on fear of machines → human traits attributed to non-human
    38: "C", // Rees sees AI developing independent thought as concerning
    39: "D", // Wolpert emphasizes reactions to similar portrayals vary
    40: "A", // Richardson on reality and fantasy → warning people not to confuse
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
  const handleSubmit = () => {
    calculateScore(userAnswers); // recalc score
    setShowResult(true);
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
            <h1 className="text-xl font-bold">PASSAGE 3</h1>
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
              {renderText("Robots and Us")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Three leaders in their fields answer questions about our relationships with robots",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                'When asked "Should robots be used to colonise other planets?", cosmology and astrophysics Professor Martin Rees said he believed the solar system would be mapped by robotic craft by the end of the century. "The next step would be mining of asteroids, enabling fabrication of large structures in space without having to bring all the raw materials from Earth....I think this is more realistic and benign than the... "terraforming"* of planets."',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He maintains that colonised planets should be preserved with a status that is analogous to Antarctica here on Earth.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    34
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                'On the question of using robots to colonise other planets and exploit mineral resources, engineering Professor Daniel Wolpert replied, "I don\'t see a pressing need to colonise other planets unless we can bring [these] resources back to Earth. The vast majority of Earth is currently inaccessible to us. "',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Using robots to gather resources nearer to home would seem to be a better use of our robotic tools.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Meanwhile, for anthropology Professor Kathleen Richardson, the idea of 'colonisation' of other planets seemed morally dubious: \"I think whether we do something on Earth or on Mars we should always do it in the spirit of a genuine interest in 'the Other', not to impose a particular model, but to meet 'the Other'.\"",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    34
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                'In response to the second question, "How soon will machine intelligence outstrip human intelligence?", Rees mentions robots that are advanced enough to beat humans at chess, but then goes on to say, "Robots are still limited in their ability to sense their environment: they can\'t yet recognise and move the pieces on a real chessboard as cleverly as a child can. Later',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " this century, however, their more advanced successors may relate to their surroundings, and to people, as adeptly as we do.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Moral questions then arise....Should we feel guilty about exploiting [sophisticated robots]?",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    30
                  </span>
                )}
              </span>
              {renderText(
                ' Should we fret if they are underemployed, frustrated, or bored?". However, there is no machine that can identify visual objects or speech with the reliability and flexibility of humans....Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious."',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Wolpert\'s response to the question about machine intelligence outstripping human intelligence was this: In a limited sense it already has. Machines can already navigate, remember and search for items with an ability that far outstrips humans",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    "Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      29
                    </span>
                  )}
                </span>
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Richardson believes that our fear of machines becoming too advanced has more to do with human nature than anything intrinsic to the machines themselves. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In her view, it stems from humans' tendency to personify inanimate objects: we create machines based on representations of ourselves, imagine that machines think and behave as we do, and therefore see them as an autonomous threat.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    37
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "This led on to the third question, 'Should we be scared by advances in artificial intelligence?' To this question, Rees replied, '",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "and that these could behave like a single 'brain' with a mind of its own, and with goals that may be contrary to human welfare",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    38
                  </span>
                )}
              </span>
              {renderText(
                "'Those who should be worried are the futurologists who believe in the so-called 'singularity'*....",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "And another worry is that we are increasingly dependent on computer networks, . I think we should ensure that robots remain as no more than 'idiot savants' lacking the capacity to outwit us, even though they may greatly surpass us in the ability to calculate and process information.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Wolpert\'s response was to say that we have already seen the damaging effects of artificial intelligence in the form of computer viruses.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>
              {renderText(
                ' "But in this case," he says, "the real intelligence is the malicious designer. Critically, the benefits of computers outweigh the damage that computer viruses cause. Similarly, while there may be misuses of robotics in the near future, the benefits that they will bring are likely to outweigh these negative aspects."',
              )}
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                'Richardson\'s response to this question was this: "We need to ask why fears of artificial intelligence and robots persist; none have in fact risen up and challenged human supremacy.""',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " She believes that as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will. In fact, she went on, Not all fear [robots]many people welcome machine intelligence.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28,36
                  </span>
                )}
              </span>
            </p>

            {/* Section I */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  'In answer to the fourth question, "What can science fiction tell us about robotics?", Rees replied, "I sometimes advise students that it\'s better to read first-rate science fiction than second-rate science - more stimulating, and perhaps no more likely to be wrong."',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>
            </p>

            {/* Section J */}
            <p className="text-lg">
              {renderText(
                'As his response, Wolpert commented, "Science fiction has often been remarkable at predicting the future....Science fiction has painted a vivid spectrum of possible futures, from cute and helpful robots to dystopian robotic societies. Interestingly, almost no science fiction envisages a future without robots."',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("39")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    39
                  </span>
                )}
              </span>
            </p>

            {/* Section K */}
            <p className="text-lg">
              {renderText(
                'Finally, on the question of science fiction, Richardson pointed out that in modern society, people tend to think there is reality on the one hand, and fiction and fantasy on the other. She then explained that the division did not always exist, and that scientists and technologists made this separation because they wanted to carve out the sphere of their work. "But the divide is not so clear cut, and that is why the worlds seem to collide at times," she said. "In some cases, we need to bring these different understandings together to get a whole perspective. Perhaps then, we won\'t be so frightened that something we create as a copy of ourselves will be a [threat] to us."',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("40")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    40
                  </span>
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
          {/* ================= Questions 27–33 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–33")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Look at the following statements (Questions 27–33) and the list of experts below. Match each statement with the correct expert, A–C. NB You may use any letter more than once.",
            )}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[350px] mx-auto text-lg">
            {[
              "A. Martin Rees",
              "B. Daniel Wolpert",
              "C. Kathleen Richardson",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <ul className="space-y-4 text-lg">
            {[
              {
                num: 27,
                text: "For our own safety, humans will need to restrict the abilities of robots.",
              },
              {
                num: 28,
                text: "The risk of robots harming us is less serious than humans believe it to be.",
              },
              {
                num: 29,
                text: "It will take many decades for robot intelligence to be as imaginative as human intelligence.",
              },
              {
                num: 30,
                text: "We may have to start considering whether we are treating robots fairly.",
              },
              {
                num: 31,
                text: "Robots are probably of more help to us on Earth than in space.",
              },
              {
                num: 32,
                text: "The ideas in high-quality science fiction may prove to be just as accurate as those found in the work of mediocre scientists.",
              },
              {
                num: 33,
                text: "There are those who look forward to robots developing greater intelligence.",
              },
            ].map(({ num, text }) => (
              <li key={num}>
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mt-1 w-15"
                  value={userAnswers[num] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [num]: e.target.value,
                    }))
                  }
                >
                  <option value=""></option>
                  {["A", "B", "C"].map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>

          {/* ================= Questions 34–36 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 34–36")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete each sentence with the correct ending, A–D, below. Choose the correct letter next to Questions 34–36.",
            )}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[350px] mx-auto text-lg">
            {[
              "A. robots to explore outer space.",
              "B. advances made in machine intelligence so far.",
              "C. changes made to other planets for our own benefit.",
              "D. the harm already done by artificial intelligence.",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <ul className="space-y-4 text-lg">
            {[
              {
                num: 34,
                text: "Richardson and Rees express similar views regarding the ethical aspect of",
              },
              {
                num: 35,
                text: "Rees and Wolpert share an opinion about the extent of",
              },
              {
                num: 36,
                text: "Wolpert disagrees with Richardson on the question of",
              },
            ].map(({ num, text }) => (
              <li key={num}>
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mt-1 w-15"
                  value={userAnswers[num] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => ({
                      ...prev,
                      [num]: e.target.value,
                    }))
                  }
                >
                  <option value=""></option>
                  {["A", "B", "C", "D"].map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>

          {/* ================= Questions 37–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 37–40")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 37,
                text: "What point does Richardson make about fear of machines?",
                options: [
                  "It has grown alongside the development of ever more advanced robots.",
                  "It is the result of our inclination to attribute human characteristics to non-human entities.",
                  "It has its origins in basic misunderstandings about how inanimate objects function.",
                  "It demonstrates a key difference between human intelligence and machine intelligence.",
                ],
              },
              {
                num: 38,
                text: "What potential advance does Rees see as a cause for concern?",
                options: [
                  "robots outnumbering people",
                  "robots having abilities which humans do not",
                  "artificial intelligence developing independent thought",
                  "artificial intelligence taking over every aspect of our lives",
                ],
              },
              {
                num: 39,
                text: "What does Wolpert emphasise in his response to the question about science fiction?",
                options: [
                  "how science fiction influences our attitudes to robots",
                  "how fundamental robots are to the science fiction genre",
                  "how the image of robots in science fiction has changed over time",
                  "how reactions to similar portrayals of robots in science fiction may vary",
                ],
              },
              {
                num: 40,
                text: "What is Richardson doing in her comment about reality and fantasy?",
                options: [
                  "warning people not to confuse one with the other",
                  "outlining ways in which one has impacted on the other",
                  "recommending a change of approach in how people view them",
                  "explaining why scientists have a different perspective on them from others",
                ],
              },
            ].map(({ num, text, options }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="space-y-2 pl-4">
                  {options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    return (
                      <label
                        key={letter}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${num}`}
                          value={letter}
                          checked={userAnswers[num] === letter}
                          onChange={() => handleInputChange(num, letter)}
                        />
                        <span>
                          <strong>{letter}.</strong> {renderText(opt)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Submit & Result ================= */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
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
                    {renderText("Your Score:")} {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer = (userAnswers[num] || "")
                        .toString()
                        .trim()
                        .toUpperCase();
                      const correctAnswer = (correctAnswers[num] || "")
                        .toString()
                        .trim()
                        .toUpperCase();
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
                            <p className="font-bold">
                              {renderText(`Q${num}:`)}
                            </p>
                          </div>

                          <p className="ml-8">
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            <span>{renderText(correctAnswer)}</span>
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
      <Reading3Pagination2025></Reading3Pagination2025>
    </div>
  );
};

export default Reading3Part32025;
