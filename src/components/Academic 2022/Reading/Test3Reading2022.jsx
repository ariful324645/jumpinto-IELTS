import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2022 from "../Pagination2022/Reading3Pagination2022";
const Test3Reading2022 = () => {
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    // Questions 1–5 (ONE WORD ONLY)
    1: "carnivorous", // ate an entirely carnivorous diet
    2: "sight", // depended mainly on sight when hunting
    3: "pouch", // young spent first months inside its mother's pouch
    4: "fossil", // 3,100-year-old fossil
    5: "habitat", // reduction in habitat

    // Questions 6–13 (TRUE / FALSE / NOT GIVEN)
    6: "TRUE", // significant numbers killed by humans from 1830s
    7: "FALSE", // several born in zoos → FALSE
    8: "NOT GIVEN", // biologists surprised → NOT GIVEN
    9: "TRUE", // scientists worried in early 1900s
    10: "TRUE", // Flynn’s proposal proved impractical
    11: "FALSE", // not reasonable numbers when legislation passed
    12: "TRUE", // 1930–1936 only captive thylacines
    13: "FALSE", // attempts are still sometimes made
  };

  const NumberBox = ({ n }) => (
    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
      {n}
    </span>
  );

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

          <div>
            <h1 className="text-lg">
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 1-13</span>
              which are based on Reading Passage 1 below.
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              The thylacine
            </h1>

            <p className="text-lg">
              The extinct thylacine, also known as the Tasmanian tiger, was a
              marsupial* that bore a superficial resemblance to a dog. Its most
              distinguishing feature was the 13–19 dark brown stripes over its
              back, beginning at the rear of the body and extending onto the
              tail. The thylacine's average nose-to-tail length for adult males
              was 162.6 cm, compared to 153.7 cm for females.
            </p>

            <br />

            <p className="text-lg">
              The thylacine appeared to occupy most types of terrain except
              dense rainforest, with open eucalyptus forest thought to be its
              prime habitat. In terms of feeding, it was exclusively
              carnivorous, and its stomach was muscular with an ability to
              distend so that it could eat large amounts of food at one time,
              probably an adaptation to compensate for long periods when hunting
              was unsuccessful and food scarce.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                The thylacine was not a fast runner and probably caught its prey
                by exhausting it during a long pursuit.
                {highlight && <NumberBox n={1} />}
              </span>
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                During long-distance chases, thylacines were likely to have
                relied more on scent than any other sense.
                {highlight && <NumberBox n={2} />}
              </span>
              They emerged to hunt during the evening, night and early morning
              and tended to retreat to the hills and forest for shelter during
              the day. Despite the common name 'tiger', the thylacine had a shy,
              nervous temperament. Although mainly nocturnal, it was sighted
              moving during the day and some individuals were even recorded
              basking in the sun.
            </p>

            <br />

            <p className="text-lg">
              The thylacine had an extended breeding season from winter to
              spring, with indications that some breeding took place throughout
              the year. The thylacine, like all marsupials, was tiny and
              hairless when born. Newborns crawled into the pouch on the belly
              of their mother, and attached themselves to one of the four teats,
              remaining there for up to three months.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                When old enough to leave the pouch, the young stayed in a lair
                such as a deep rocky cave, well-hidden nest or hollow log,
                whilst the mother hunted.
                {highlight && <NumberBox n={3} />}
              </span>
            </p>

            <br />

            <p className="text-lg">
              Approximately 4,000 years ago, the thylacine was widespread
              throughout New Guinea and most of mainland Australia, as well as
              the island of Tasmania. The most recent, well-dated occurrence of
              a thylacine on the mainland is a carbon-dated fossil from Murray
              Cave in Western Australia, which is around 3,100 years old.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                Its extinction coincided closely with the arrival of wild dogs
                called dingoes in Australia and a similar predator in New
                Guinea.
                {highlight && <NumberBox n={4} />}
              </span>
              Dingoes never reached Tasmania, and most scientists see this as
              the main reason for the thylacine's survival there.
            </p>

            <br />

            <p className="text-lg">
              The dramatic decline of the thylacine in Tasmania, which began in
              the 1830s and continued for a century, is generally attributed to
              the relentless efforts of sheep farmers and bounty hunters* with
              shotguns.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                While this determined campaign undoubtedly played a large part,
                it is likely that various other factors also contributed to the
                decline and eventual extinction of the species.
                {highlight && <NumberBox n={6} />}
              </span>
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                These include competition with wild dogs introduced by European
                settlers, loss of habitat along with the disappearance of prey
                species, and a distemper-like disease which may also have
                affected the thylacine.
                {highlight && <NumberBox n={5} />}
              </span>
            </p>

            <br />

            <p className="text-lg">
              There was only one successful attempt to breed a thylacine in
              captivity, at Melbourne Zoo in 1899.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                This was despite the large numbers that went through some zoos,
                particularly London Zoo and Tasmania's Hobart Zoo.
                {highlight && <NumberBox n={7} />}
              </span>
            </p>

            <br />

            <p className="text-lg">
              However, there seems to have been little public pressure to
              preserve the thylacine, nor was much concern expressed by
              scientists at the decline of this species in the decades that
              followed.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                A notable exception was T.T. Flynn, Professor of Biology at the
                University of Tasmania.
                {highlight && <NumberBox n={9} />}
              </span>
              In 1914, he was sufficiently concerned about the scarcity of the
              thylacine to suggest that some should be captured and placed on a
              small island.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                But it was not until 1929, with the species on the very edge of
                extinction, that Tasmania's Animals and Birds Protection Board
                passed a motion protecting thylacines only for the month of
                December.
                {highlight && <NumberBox n={11} />}
              </span>
              The last known wild thylacine to be killed was shot by a farmer in
              the north-east of Tasmania in 1930, leaving just captive
              specimens.
              <span className={highlight ? "bg-yellow-100 ml-2" : "ml-2"}>
                Official protection of the species by the Tasmanian government
                was introduced in July 1936.
                {highlight && <NumberBox n={12} />}
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
            Complete the notes below. <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
            <br />
            Write your answers in boxes 1–5 on your answer sheet.
          </p>

          <div className="border p-5 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              The thylacine
            </h3>

            <p className="font-semibold">Appearance and behaviour</p>

            <ul className="space-y-4 text-lg">
              {[
                "ate an entirely",
                "probably depended mainly on",
                "young spent first months of life inside its mother's",
                "last evidence in mainland Australia is a 3,100-year-old",
                "reduction in",
              ].map((text, index) => {
                const qNum = index + 1;
                return (
                  <li key={qNum} className="flex flex-wrap items-center gap-3">
                    <span>{text}</span>
                    <span className="font-bold h-8 w-8 border text-center rounded-2xl">
                      {qNum}
                    </span>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-32"
                      onChange={(e) => handleInputChange(qNum, e.target.value)}
                    />
                  </li>
                );
              })}
            </ul>

            <p className="font-semibold mt-6">Decline and extinction</p>

            <ul className="space-y-4 text-lg">
              <li>
                probably went extinct in mainland Australia due to animals known
                as dingoes
              </li>
              <li>
                and available sources of food were partly responsible for
                decline in Tasmania
              </li>
            </ul>
          </div>

          {/* ================= Questions 6–13 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 6–13</h2>

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

          <div className="space-y-6">
            {[
              "Significant numbers of thylacines were killed by humans from the 1830s onwards.",
              "Several thylacines were born in zoos during the late 1800s.",
              "John Gould's prediction about the thylacine surprised some biologists.",
              "In the early 1900s, many scientists became worried about the possible extinction of the thylacine.",
              "T. T. Flynn's proposal to rehome captive thylacines on an island proved to be impractical.",
              "There were still reasonable numbers of thylacines in existence when a piece of legislation protecting the species during their breeding season was passed.",
              "From 1930 to 1936, the only known living thylacines were all in captivity.",
              "Attempts to find living thylacines are now rarely made.",
            ].map((statement, index) => {
              const qNum = index + 6;
              return (
                <div key={qNum} className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div
                      onClick={() => handleNumberClick(qNum)}
                      className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer ${
                        activeNumbers[qNum]
                          ? "bg-yellow-400 border-yellow-500"
                          : "border-gray-300"
                      }`}
                    >
                      {qNum}
                    </div>
                    <p className="text-lg">{statement}</p>
                  </div>

                  <div className="ml-12 space-y-2">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(qNum, option)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedOptions[qNum] === option
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-500"
                          }`}
                        />
                        <span
                          className={
                            selectedOptions[qNum] === option
                              ? "text-blue-500"
                              : ""
                          }
                        >
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
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
                    All Answers (1–13)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = userAnswers[num]?.trim();
                      const correctAnswer = correctAnswers[num]?.trim();

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
      <Reading3Pagination2022></Reading3Pagination2022>
    </div>
  );
};

export default Test3Reading2022;
