import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2022 from "../Pagination2022/Reading1Pagination2022";

const Reading1Part22022 = () => {
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
    // Questions 1–6 (ONE WORD ONLY)
    14: "B", // a mention of negative attitudes towards stadium building projects
    15: "C", // figures demonstrating the environmental benefits of a certain stadium
    16: "E", // examples of the wide range of facilities available at some new stadiums
    17: "D", // reference to the disadvantages of the stadiums built during a certain era

    // ================= Questions 18–22 (ONE WORD ONLY) =================
    18: "fortress", // converted first into a ___
    19: "games", // finally into an arena where spectators could watch ___
    20: "opera", // venue where ___ is performed
    21: "grain", // storage of ___
    22: "shops", // now a market square with ___ and homes incorporated

    // ================= Questions 23–24 (Multi-select, TWO letters) =================
    "23-24": ["A", "D"], // negative features: less imaginatively designed & less versatile

    // ================= Questions 25–26 (Multi-select, TWO letters) =================
    "25-26": ["A", "B"], // advantages: improved amenities & bringing community life back
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "23-24" || id === "25-26") {
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
    localStorage.setItem("/listening1Part22022", newScore);
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
              Stadiums: past, present and future
            </h1>

            <p className="text-lg font-bold">A</p>
            <p className="text-lg">
              Stadiums are among the oldest forms of urban architecture: vast
              stadiums where the public could watch sporting events were at the
              centre of western city life as far back as the ancient Greek and
              Roman Empires, well before the construction of the great medieval
              cathedrals and the grand 19th- and 20th-century railway stations
              which dominated urban skylines in later eras.
            </p>
            <p className="text-lg">
              Today, however, stadiums are regarded with growing scepticism.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Construction costs can soar above £1 billion, and stadiums
                finished for major events such as the Olympic Games or the FIFA
                World Cup have notably fallen into disuse and disrepair.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              But this need not be the case. History shows that stadiums can
              drive urban development and adapt to the culture of every age.
              Even today, architects and planners are finding new ways to adapt
              the mono-functional sports arenas which became emblematic of
              modernisation during the 20th century.
            </p>

            <br />

            <p className="text-lg font-bold">B</p>
            <p className="text-lg">
              The amphitheatre* of Arles in southwest France, with a capacity of
              25,000 spectators, is perhaps the best example of just how
              versatile stadiums can be. Built by the Romans in 90 AD, it became
              a fortress with four towers after the fifth century, and was then
              transformed into a village containing more than 200 houses.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                With the growing interest in conservation during the 19th
                century, it was converted back into an arena for the staging of
                bullfights, thereby returning the structure to its original use
                as a venue for public spectacles.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      18
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      19
                    </span>
                  </>
                )}
              </span>
            </p>
            <p className="text-lg">
              Another example is the imposing arena of Verona in northern Italy,
              with space for 30,000 spectators, which was built 60 years before
              the Arles amphitheatre and 40 years before Rome's famous
              Colosseum.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                It has endured the centuries and is currently considered one of
                the world's prime sites for opera, thanks to its outstanding
                acoustics.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    20
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">C</p>
            <p className="text-lg">
              The area in the centre of the Italian town of Lucca, known as the
              Piazza dell'Anfiteatro, is yet another impressive example of an
              amphitheatre becoming absorbed into the fabric of the city.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The site evolved in a similar way to Arles and was progressively
                filled with buildings from the Middle Ages until the 19th
                century, variously used as houses, a salt depot and a prison.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    21
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But rather than reverting to an arena, it became a market
                square, designed by Romanticist architect Lorenzo Nottolini.
                Today, the ruins of the amphitheatre remain embedded in the
                various shops and residences surrounding the public square.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    22
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">D</p>
            <p className="text-lg">
              There are many similarities between modern stadiums and the
              ancient amphitheatres intended for games. But some of the
              flexibility was lost at the beginning of the 20th century, as
              stadiums were developed using new products such as steel and
              reinforced concrete, and made use of bright lights for night-time
              matches.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  24
                </span>
              )}
            </p>
            <p className="text-lg">
              Many such stadiums are situated in suburban areas, designed for
              sporting use only and surrounded by parking lots.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  23
                </span>
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                These factors mean that they may not be as accessible to the
                general public, require more energy to run and contribute to
                urban heat.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    17
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">E</p>
            <p className="text-lg">
              But many of today's most innovative architects see scope for the
              stadium to help improve the city. Among the current strategies,
              two seem to be having particular success: the stadium as an urban
              hub, and as a power plant.
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                There's a growing trend for stadiums to be equipped with public
                spaces and services that serve a function beyond sport, such as
                hotels, retail outlets, conference centres, restaurants and
                bars, children's playgrounds and green space.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    16
                  </span>
                )}
              </span>
              Creating mixed-use developments such as this reinforces
              compactness and multi-functionality, making more efficient use of
              land and helping to regenerate urban spaces.
            </p>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                This opens the space up to families and a wider cross-section of
                society, instead of catering only to sportspeople and
                supporters.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    25
                  </span>
                )}
              </span>
              There have been many examples of this in the UK: the mixed-use
              facilities at Wembley and Old Trafford have become a blueprint for
              many other stadiums in the world.
            </p>

            <br />

            <p className="text-lg font-bold">F</p>
            <p className="text-lg">
              The phenomenon of stadiums as power stations has arisen from the
              idea that energy problems can be overcome by integrating
              interconnected buildings by means of a smart grid, which is an
              electricity supply network that uses digital communications
              technology to detect and react to local changes in usage, without
              significant energy losses.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Stadiums are ideal for these purposes, because their canopies
                have a large surface area for fitting photovoltaic panels and
                rise high enough (more than 40 metres) to make use of micro wind
                turbines.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    26
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              Freiburg Mage Solar Stadium in Germany is the first of a new wave
              of stadiums as power plants, which also includes the Amsterdam
              Arena and the Kaohsiung Stadium. The latter, inaugurated in 2009,
              has 8,844 photovoltaic panels producing up to 1.14 GWh of
              electricity annually.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                This reduces the annual output of carbon dioxide by 660 tons and
                supplies up to 80 percent of the surrounding area when the
                stadium is not in use.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      15
                    </span>
                  </>
                )}
              </span>
              This is proof that a stadium can serve its city, and have a
              decidedly positive impact in terms of reduction of CO2 emissions.
            </p>

            <br />

            <p className="text-lg font-bold">G</p>
            <p className="text-lg">
              Sporting arenas have always been central to the life and culture
              of cities. In every era, the stadium has acquired new value and
              uses: from military fortress to residential village, public space
              to theatre and most recently a field for experimentation in
              advanced engineering.
            </p>
            <p className="text-lg">
              The stadium of today now brings together multiple functions, thus
              helping cities to create a sustainable future.
            </p>

            <br />

            <p className="text-lg font-medium mt-4">Glossary</p>
            <p className="text-lg italic">
              * amphitheatre: (especially in Greek and Roman architecture) an
              open circular or oval building with a central space surrounded by
              tiers of seats for spectators, for the presentation of dramatic or
              sporting events.
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
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ================= Questions 14–17 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 14–17</h2>
          <p className="mb-4 font-semibold">
            Reading Passage 2 has seven sections, A-G. <br />
            Which section contains the following information? <br />
            Choose the correct letter, A-G, in boxes 14–17 on your answer sheet.{" "}
            <br />
            NB You may use any letter more than once.
          </p>

          {[
            {
              num: 14,
              text: "a mention of negative attitudes towards stadium building projects",
            },
            {
              num: 15,
              text: "figures demonstrating the environmental benefits of a certain stadium",
            },
            {
              num: 16,
              text: "examples of the wide range of facilities available at some new stadiums",
            },
            {
              num: 17,
              text: "reference to the disadvantages of the stadiums built during a certain era",
            },
          ].map((q) => (
            <div key={q.num} className="flex flex-wrap items-center gap-3 mb-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                {q.num}
              </span>
              <span>{q.text}</span>
              <select
                className="border-1 rounded px-2 py-1 w-20 ml-3"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">Select</option>
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 18–22 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 18–22</h2>
          <p className="mb-4 font-semibold">
            Complete the summary below. Choose ONE WORD ONLY from the passage
            for each answer.
          </p>

          <div className="border p-5 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              Roman amphitheatres
            </h3>
            <ul className="list-disc list-inside space-y-4 text-lg">
              {[
                { num: 18, text: "was converted first into a" },
                {
                  num: 19,
                  text: "and finally into an arena where spectators could watch",
                },
                { num: 20, text: "is performed" },
                { num: 21, text: "including the storage of" },
                {
                  num: 22,
                  text: "and homes incorporated into the remains of the Roman amphitheatre",
                },
              ].map((q) => (
                <li key={q.num} className="flex flex-wrap items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border-1 font-bold">
                    {q.num}
                  </span>
                  <span>{q.text}</span>
                  <input
                    type="text"
                    className="border-1 rounded px-2 py-1 w-32 ml-2"
                    value={userAnswers[q.num] || ""}
                    onChange={(e) => handleInputChange(q.num, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Questions 23–24 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 23–24</h2>
          <p className="mb-4 font-semibold">Choose TWO letters, A–E.</p>
          <p className="mb-4 font-semibold">
            When comparing twentieth-century stadiums to ancient amphitheatres
            in Section D, which TWO negative features does the writer mention?
          </p>

          <div className=" p-5 mb-4">
            <p className="font-semibold mb-3">
              When comparing twentieth-century stadiums to ancient amphitheatres
              in Section D, which TWO negative features does the writer mention?
            </p>

            {[
              { letter: "A", text: "They are less imaginatively designed." },
              { letter: "B", text: "They are less spacious." },
              { letter: "C", text: "They are in less convenient locations." },
              { letter: "D", text: "They are less versatile." },
              { letter: "E", text: "They are made of less durable materials." },
            ].map(({ letter, text }) => {
              const selectedOptions = userAnswers["23-24"] || [];
              const isChecked = selectedOptions.includes(letter);
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={letter}
                  className={`flex items-start gap-3 mb-2 cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={letter}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("23-24", letter)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold">{letter}.</span>{" "}
                    <span>{text}</span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* ================= Questions 25–26 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 25–26</h2>
          <p className="mb-4 font-semibold">Choose TWO letters, A–E.</p>
          <p className="mb-4 font-semibold">
            Which TWO advantages of modern stadium design does the writer
            mention?
          </p>

          <div className=" p-5 mb-4">
            <p className="font-semibold mb-3">
              Which TWO advantages of modern stadium design does the writer
              mention?
            </p>

            {[
              {
                letter: "A",
                text: "offering improved amenities for the enjoyment of sports events",
              },
              {
                letter: "B",
                text: "bringing community life back into the city environment",
              },
              {
                letter: "C",
                text: "facilitating research into solar and wind energy solutions",
              },
              {
                letter: "D",
                text: "enabling local residents to reduce their consumption of electricity",
              },
              {
                letter: "E",
                text: "providing a suitable site for the installation of renewable power generators",
              },
            ].map(({ letter, text }) => {
              const selectedOptions = userAnswers["25-26"] || [];
              const isChecked = selectedOptions.includes(letter);
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={letter}
                  className={`flex items-start gap-3 mb-2 cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={letter}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("25-26", letter)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold">{letter}.</span>{" "}
                    <span>{text}</span>
                  </div>
                </label>
              );
            })}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14–30)
                  </h3>
                  <ul className="space-y-3">
                    {[14, 15, 16, 17, 18, 19, 20, 21, 22, "23-24", "25-26"].map(
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
      <Reading1Pagination2022></Reading1Pagination2022>
    </div>
  );
};

export default Reading1Part22022;
