import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2025 from "../Pagination 2025/Reading2Pagination2025";

const Reading2Part32025 = () => {
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
    // Questions 27–32 (YES / NO / NOT GIVEN)
    27: "YES", // DeJesus shared strike decisions with ABS
    28: "NOT GIVEN", // No clear statement about resizing strike zone due to criticism
    29: "YES", // MLB wants to justify the money spent on ABS accuracy
    30: "NO", // 100mph fastballs did not make the game more exciting
    31: "NOT GIVEN", // No mention of fierce debate within Sword's team
    32: "YES", // ABS makes strike-zone shape changes possible

    // Questions 33–37 (Summary completion A–H)
    33: "F", // former roles
    34: "D", // subjective assessment
    35: "H", // perceived area
    36: "B", // numerous disputes
    37: "G", // total silence

    // Questions 38–40 (Multiple choice A–D)
    38: "B", // ABS may reduce some of the appeal of the game
    39: "A", // Seen as an experiment without guaranteed outcome
    40: "C", // Accuracy is not the same as enjoyment
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
              {renderText("Invasion of the Robot Umpires")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "A few years ago, Fred DeJesus from Brooklyn, New York became the first umpire in a minor league baseball game to use something called the Automated Ball-Strike System (ABS), often referred to as the 'robo-umpire'.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Instead of making any judgments himself about a strike, DeJesus had decisions fed to him through an earpiece, connected to a modified missile-tracking system.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "The contraption looked like a large black pizza box with one glowing green eye; it was mounted above the press stand.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Major League Baseball (MLB), who had commissioned the system, wanted human umpires to announce the calls, just as they would have done in the past.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "When the first pitch came in, a recorded voice told DeJesus it was a strike.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Previously, calling a strike was a judgment call on the part of the umpire",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Even if the batter does not hit the ball, a pitch that passes through the 'strike zone' (an imaginary zone about seventeen inches wide, stretching from the batter's knees to the middle of his chest) is considered a strike.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "During that first game, when DeJesus announced calls, there was no heckling and no shouted disagreement.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg"></p>

            {/* Section D */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "For a hundred and fifty years or so, the strike zone has been the game's animating force - countless arguments between a team's manager and the umpire have taken place over its boundaries and whether a ball had crossed through it",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>
              {renderText(
                " The rules of play have evolved in various stages. Today, everyone knows that you may scream your disagreement in an umpire's face, but you must never shout personal abuse at them or touch them. That's a no-no. When the robo-umpires came, however, the arguments stopped.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "During the first robo-umpire season, players complained about some strange calls.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In response, MLB decided to tweak the dimensions of the zone, and the following year the consensus was that ABS is profoundly consistent.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                'MLB says the device is near-perfect, precise to within fractions of an inch. "It\'ll reduce controversy in the game, and be good for the game," says Rob Manfred, who is Commissioner for MLB. But the question is whether controversy is worth reducing, or whether it is the sign of a human hand. A human, at least, yells back.',
              )}
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "When I spoke with Frank Viola, a coach for a North Carolina team, he said that ABS works as designed, but that it was also unforgiving and pedantic, almost legalistic. 'Manfred is a lawyer,' Viola noted. Some pitchers have complained that, compared with a human's, the robot's strike zone seems too precise.",
              )}
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "The executive tasked with running the experiment for MLB is Morgan Sword, who's in charge of baseball operations. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "According to Sword, ABS was part of a larger project to make baseball more exciting since executives are terrified of losing younger fans, as has been the case with horse racing and boxing.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
            </p>

            {/* Section I */}
            <p className="text-lg">
              {renderText(
                "He explains how they began the process by asking fans what version of baseball they found most exciting. The results showed that everyone wanted more action: more hits, more defense, more baserunning.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " This type of baseball essentially hasn't existed since the 1960s, when the hundred-mile-an-hour fastball, which is difficult to hit and control, entered the game.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
            </p>

            {/* Section J */}
            <p className="text-lg">
              {renderText(
                "It flattened the game into strikeouts, walks, and home runs - a type of play lacking much action. Sword's team brainstormed potential fixes. Any rule that existed, they talked about changing - from changing the bats to changing the geometry of the field. But while all of these were ruled out as potential fixes, ABS was seen as a perfect vehicle for change.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " According to Sword, once you get the technology right, you can load any strike zone you want into the system.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
            </p>

            {/* Section K */}
            <p className="text-lg">
              {renderText(
                "In the past twenty years, sports have moved away from judgment calls. Soccer has Video Assistant Referees (for offside decisions, for example). Tennis has Hawk-Eye (for line calls, for example). For almost a decade, baseball has used instant replay on the base paths. This is widely liked, even if the precision can sometimes cause problems. But these applications deal with something physical: bases, lines, goals. The boundaries of action are precise, delineated like the keys of a piano. This is not the case with ABS and the strike zone. Historically, a certain discretion has been appreciated.",
              )}
            </p>

            {/* Section L */}
            <p className="text-lg">
              {renderText(
                'I decided to email Alva Noë, a professor at Berkeley University and a baseball fan, for his opinion. "Hardly a day goes by that I don\'t wake up and run through the reasons that this [robo-umpires] is such a terrible idea," he replied. He later told me, "This is part of a movement to use algorithms to take the hard choices of living out of life." ',
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Perhaps he\'s right. We watch baseball to kill time, not to maximize it. Some players I have met take a dissenting stance toward the robots too, believing that accuracy is not the answer.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 27–32 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–32")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 3?",
            )}
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 27,
                text: "When DeJesus first used ABS, he shared decision-making about strikes with it.",
              },
              {
                num: 28,
                text: "MLB considered it necessary to amend the size of the strike zone when criticisms were received from players.",
              },
              {
                num: 29,
                text: "MLB is keen to justify the money spent on improving the accuracy of ABS's calculations.",
              },
              {
                num: 30,
                text: "The hundred-mile-an-hour fastball led to a more exciting style of play.",
              },
              {
                num: 31,
                text: "The differing proposals for alterations to the baseball bat led to fierce debate on Sword's team.",
              },
              {
                num: 32,
                text: "ABS makes changes to the shape of the strike zone feasible.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col pl-4">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt}
                        checked={userAnswers[num] === opt}
                        onChange={() => handleInputChange(num, opt)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 33–37 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 33–37")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the summary using the list of words or phrases below. Choose the correct letter, A–H.",
            )}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[350px] mx-auto text-lg">
            {[
              "A. pitch boundary",
              "B. numerous disputes",
              "C. team tactics",
              "D. subjective assessment",
              "E. widespread approval",
              "F. former roles",
              "G. total silence",
              "H. perceived area",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4 border p-4">
            <h2 className="font-bold text-xl text-center mt-2">
              {renderText("Calls by the umpire")}
            </h2>

            <p className="text-lg">
              {renderText(
                "Even after ABS was developed, MLB still wanted human umpires to shout out decisions as they had in their",
              )}{" "}
              <span className="font-bold">33</span>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2 w-20"
                value={userAnswers[33] || ""}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, 33: e.target.value }))
                }
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              .
            </p>

            <p className="text-lg">
              {renderText("The umpire's job had, at one time, required a")}{" "}
              <span className="font-bold">34</span>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2 w-20"
                value={userAnswers[34] || ""}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, 34: e.target.value }))
                }
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {renderText("about whether a ball was a strike.")}
            </p>

            <p className="text-lg">
              {renderText(
                "A ball is considered a strike when the batter does not hit it and it crosses through a",
              )}{" "}
              <span className="font-bold">35</span>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2 w-20"
                value={userAnswers[35] || ""}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, 35: e.target.value }))
                }
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {renderText(
                "extending approximately from the batter's knee to his chest.",
              )}
            </p>

            <p className="text-lg">
              {renderText("In the past,")} <span className="font-bold">36</span>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2 w-20"
                value={userAnswers[36] || ""}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, 36: e.target.value }))
                }
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {renderText(
                "over strike calls were not uncommon, but today everyone accepts the complete ban on pushing or shoving the umpire.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "One difference, however, is that during the first game DeJesus used ABS, strike calls were met with",
              )}{" "}
              <span className="font-bold">37</span>
              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2 w-20"
                value={userAnswers[37] || ""}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, 37: e.target.value }))
                }
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              .
            </p>
          </div>

          {/* ================= Questions 38–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 38–40")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 38,
                text: "What does the writer suggest about ABS in the fifth paragraph?",
                options: [
                  "It is bound to make key decisions that are wrong.",
                  "It may reduce some of the appeal of the game.",
                  "It will lead to the disappearance of human umpires.",
                  "It may increase calls for the rules of baseball to be changed.",
                ],
              },
              {
                num: 39,
                text: "Morgan Sword says that the introduction of ABS",
                options: [
                  "was regarded as an experiment without a guaranteed outcome.",
                  "was intended to keep up with developments in other sports.",
                  "was a response to changing attitudes about the role of sport.",
                  "was an attempt to ensure baseball retained a young audience.",
                ],
              },
              {
                num: 40,
                text: "Why does the writer include the views of Noë and Russo?",
                options: [
                  "to show that attitudes to technology vary widely",
                  "to argue that people have unrealistic expectations of sport",
                  "to indicate that accuracy is not the same thing as enjoyment",
                  "to suggest that the number of baseball fans needs to increase",
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
                    {renderText("Your Score:")} {score}/13
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
                        .toLowerCase();
                      const correctAnswer = (correctAnswers[num] || "")
                        .toString()
                        .trim()
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
                              <span>{renderText(userAnswer)}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            <span>{renderText(correctAnswers[num])}</span>
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
      <Reading2Pagination2025></Reading2Pagination2025>
    </div>
  );
};

export default Reading2Part32025;
