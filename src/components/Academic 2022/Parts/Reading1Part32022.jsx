import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2022 from "../Pagination2022/Reading1Pagination2022";

const Reading1Part32022 = () => {
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
    // Questions 27–31 (SUMMARY COMPLETION, letters A–J)
    27: "H", // strategic alliance
    28: "J", // religious conviction
    29: "F", // decisive victory
    30: "B", // large reward
    31: "D", // relative safety

    // Questions 32–35 (YES / NO / NOT GIVEN)
    32: "YES",
    33: "NOT GIVEN",
    34: "NOT GIVEN",
    35: "YES",

    // Questions 36–40 (MULTIPLE CHOICE, letters A–D)
    36: "B", // to give an account of the circumstances leading to Charles II's escape
    37: "C", // to illustrate how the events of the six weeks are brought to life
    38: "C", // He aimed to restore people's faith in the monarchy
    39: "D", // He chooses language that is suitable for a twenty-first-century audience
    40: "B", // it lacks an analysis of prevalent views on monarchy
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

          <div>
            <h1 className="text-lg">
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 27-40</span>
              which are based on Reading Passage 3 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("To catch a king")}
            </h1>

            <p className="text-sm italic text-center mb-6">
              {renderText(
                "Anna Keay reviews Charles Spencer's book about the hunt for King Charles II during the English Civil War of the seventeenth century"
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Charles Spencer's latest book, To Catch a King, tells us the story of the hunt for King Charles II in the six weeks after his resounding defeat at the Battle of Worcester in September 1651."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>
              {renderText(" And what a story it is.")}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " After his father was executed by the Parliamentarians in 1649, the young Charles II sacrificed one of the very principles his father had died for and did a deal with the Scots, thereby accepting Presbyterianism as the national religion in return for being crowned King of Scots."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27,28
                  </span>
                )}
              </span>
              {renderText(
                " His arrival in Edinburgh prompted the English Parliamentary army to invade Scotland in a pre-emptive strike."
              )}
              {renderText(
                " This was followed by a Scottish invasion of England."
              )}
              {renderText(
                " The two sides finally faced one another at Worcester in the west of England in 1651."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " After being comprehensively defeated on the meadows outside the city by the Parliamentarian army, the 21-year-old king found himself the subject of a national manhunt, with a huge sum offered for his capture."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    29,30
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Over the following six weeks he managed, through a series of heart-poundingly close escapes, to evade the Parliamentarians before seeking refuge in France."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
              {renderText(
                " For the next nine years, the penniless and defeated Charles wandered around Europe with only a small group of loyal supporters."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Years later, after his restoration as king, the 50-year-old Charles II requested a meeting with the writer and diarist Samuel Pepys."
              )}
              {renderText(
                " His intention when asking Pepys to commit his story to paper was to ensure that this most extraordinary episode was never forgotten."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Over two three-hour sittings, the king related to him in great detail his personal recollections of the six weeks he had spent as a fugitive."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    33
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  ' As the king and secretary settled down (a scene that is surely a gift for a future scriptwriter), Charles commenced his story: "After the battle was so absolutely lost as to be beyond hope of recovery, I began to think of the best way of saving myself."'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    34
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One of the joys of Spencer's book, a result not least of its use of Charles II's own narrative as well as those of his supporters, is just how close the reader gets to the action."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " The day-by-day retelling of the fugitives' doings provides delicious details: the cutting of the king's long hair with agricultural shears, the use of walnut leaves to dye his pale skin, and the day Charles spent lying on a branch of the great oak tree in Boscobel Wood as the Parliamentary soldiers scoured the forest floor below."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    37
                  </span>
                )}
              </span>
              {renderText(
                " Spencer draws out both the humour and the emotional tension when the secret of the king's presence was cautiously revealed to his supporters."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Charles's adventures after losing the Battle of Worcester hide the uncomfortable truth that whilst almost everyone in England had been appalled by the execution of his father, they had not welcomed the arrival of his son with the Scots army."
              )}
              {renderText(
                " This was partly because he rode at the head of what looked like a foreign invasion force and partly because, after almost a decade of civil war, people were desperate to avoid it beginning again."
              )}
              {renderText(
                " This makes it all the more interesting that Charles II himself loved the story so much ever after."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " As well as retelling it to anyone who would listen, he set in train a series of initiatives to memorialise it."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    38
                  </span>
                )}
              </span>
              {renderText(
                " It is hard to imagine many other kings marking the lowest point in their life so enthusiastically, or indeed pulling off such an escape in the first place."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Charles Spencer is the perfect person to pass the story on to a new generation."
              )}
              {renderText(
                " His pacey, readable prose steers deftly clear of modern idioms and elegantly brings to life the details of the great tale."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " He succeeds in his desire to explore far more of the background of the story than previous books on the subject have done."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    39
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The tantalising question left, in the end, is that of what it all meant."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Would Charles II have been a different king had these six weeks never happened?"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    40
                  </span>
                )}
              </span>

              {renderText(
                " This is the one area where the book doesn't quite hit the mark."
              )}
              {renderText(
                " But this one niggle aside, To Catch a King is an excellent read, and those who come to it knowing little of the famous tale will find they have a treat in store."
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 27–31 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–31")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the summary using the list of words or phrases below."
            )}
            <br />
            {renderText(
              "Choose the correct letter, A–J, in boxes 27–31 on your answer sheet."
            )}
          </p>

          <div className="space-y-1 border mb-4 p-4 max-w-[220px] mx-auto text-lg">
            {[
              "A. military innovation",
              "B. large reward",
              "C. widespread conspiracy",
              "D. relative safety",
              "E. new government",
              "F. decisive victory",
              "G. political debate",
              "H. strategic alliance",
              "I. popular solution",
              "J. religious conviction",
            ].map((option) => (
              <p key={option}>{renderText(option)}</p>
            ))}
          </div>

          <div className="space-y-4 text-lg leading-relaxed border p-4">
            <h2 className="text-xl font-bold text-center">
              {renderText("The story behind the hunt for Charles II")}
            </h2>

            <p className="flex flex-wrap items-center gap-2">
              <span>
                {renderText(
                  "Charles II's father was executed by the Parliamentarian forces in 1649. Charles II then formed a"
                )}
              </span>
              <button
                onClick={() => toggleButton(27)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[27]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                27
              </button>
              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(27, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

              <span>
                {renderText(
                  "with the Scots, and in order to become King of Scots, he abandoned an important"
                )}
              </span>
              <button
                onClick={() => toggleButton(28)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[28]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                28
              </button>
              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(28, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

              <span>
                {renderText(
                  "that was held by his father and had contributed to his father's death."
                )}
              </span>
            </p>

            <p className="flex flex-wrap items-center gap-2">
              <span>
                {renderText(
                  "The opposing sides then met outside Worcester in 1651. The battle led to a"
                )}
              </span>
              <button
                onClick={() => toggleButton(29)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[29]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                29
              </button>
              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(29, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

              <span>
                {renderText(
                  "for the Parliamentarians and Charles had to flee for his life. A"
                )}
              </span>
              <button
                onClick={() => toggleButton(30)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[30]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                30
              </button>
              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(30, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

              <span>
                {renderText(
                  "was offered for Charles's capture, but after six weeks spent in hiding, he eventually managed to reach the"
                )}
              </span>
              <button
                onClick={() => toggleButton(31)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[31]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                31
              </button>
              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(31, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

              <span>{renderText("of continental Europe.")}</span>
            </p>
          </div>

          {/* ================= Questions 32–35 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 32–35")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 3?"
            )}
            <br />
            {renderText("In boxes 32–35 on your answer sheet, choose")}
          </p>

          <div className="mb-4 space-y-1">
            <p>
              {renderText("YES")}{" "}
              {renderText(
                "if the statement agrees with the claims of the writer"
              )}
            </p>
            <p>
              {renderText("NO")}{" "}
              {renderText(
                "if the statement contradicts the claims of the writer"
              )}
            </p>
            <p>
              {renderText("NOT GIVEN")}{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this"
              )}
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Charles chose Pepys for the task because he considered him to be trustworthy.",
              "Charles's personal recollection of the escape lacked sufficient detail.",
              "Charles indicated to Pepys that he had planned his escape before the battle.",
              "The inclusion of Charles's account is a positive aspect of the book.",
            ].map((q, index) => {
              const qNum = 32 + index;
              return (
                <div key={qNum} className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div
                      onClick={() => handleNumberClick(qNum)}
                      className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer
              ${
                activeNumbers[qNum]
                  ? "bg-yellow-400 border-yellow-500"
                  : "border-gray-300"
              }`}
                    >
                      {renderText(qNum.toString())}
                    </div>
                    <p className="text-lg">{renderText(q)}</p>
                  </div>

                  <div className="ml-12 space-y-2">
                    {["YES", "NO", "NOT GIVEN"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(qNum, option)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2
                    ${
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
                          {renderText(option)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 36–40")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <div className="space-y-6">
            {[
              {
                question:
                  "What is the reviewer's main purpose in the first paragraph?",
                options: [
                  "A. to describe what happened during the Battle of Worcester",
                  "B. to give an account of the circumstances leading to Charles II's escape",
                  "C. to provide details of the Parliamentarians' political views",
                  "D. to compare Charles II's beliefs with those of his father",
                ],
              },
              {
                question:
                  "Why does the reviewer include examples of the fugitives' behaviour in the third paragraph?",
                options: [
                  "A. to explain how close Charles II came to losing his life",
                  "B. to suggest that Charles II's supporters were badly prepared",
                  "C. to illustrate how the events of the six weeks are brought to life",
                  "D. to argue that certain aspects are not as well known as they should be",
                ],
              },
              {
                question:
                  "What point does the reviewer make about Charles II in the fourth paragraph?",
                options: [
                  "A. He chose to celebrate what was essentially a defeat.",
                  "B. He misunderstood the motives of his opponents.",
                  "C. He aimed to restore people's faith in the monarchy.",
                  "D. He was driven by a desire to be popular.",
                ],
              },
              {
                question:
                  "What does the reviewer say about Charles Spencer in the fifth paragraph?",
                options: [
                  "A. His decision to write the book comes as a surprise.",
                  "B. He takes an unbiased approach to the subject matter.",
                  "C. His descriptions of events would be better if they included more detail.",
                  "D. He chooses language that is suitable for a twenty-first-century audience.",
                ],
              },
              {
                question:
                  "When the reviewer says the book 'doesn't quite hit the mark', she is making the point that",
                options: [
                  "A. it overlooks the impact of events on ordinary people.",
                  "B. it lacks an analysis of prevalent views on monarchy.",
                  "C. it omits any references to the deceit practised by Charles II during his time in hiding.",
                  "D. it fails to address whether Charles II's experiences had a lasting influence on him.",
                ],
              },
            ].map((qObj, index) => {
              const qNum = 36 + index;
              return (
                <div key={qNum} className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div
                      onClick={() => handleNumberClick(qNum)}
                      className={`w-9 h-9 flex items-center justify-center font-bold border-2 rounded-lg cursor-pointer
            ${
              activeNumbers[qNum]
                ? "bg-yellow-400 border-yellow-500"
                : "border-gray-300"
            }`}
                    >
                      {renderText(qNum.toString())}
                    </div>
                    <p className="text-lg">{renderText(qObj.question)}</p>
                  </div>

                  <div className="ml-12 space-y-2">
                    {qObj.options.map((optionText) => (
                      <div
                        key={optionText}
                        onClick={() => handleOptionClick(qNum, optionText[0])} // store letter only
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2
                  ${
                    selectedOptions[qNum] === optionText[0]
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500"
                  }`}
                        />
                        <span
                          className={
                            selectedOptions[qNum] === optionText[0]
                              ? "text-blue-500"
                              : ""
                          }
                        >
                          {renderText(optionText)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Submit & Result ================= */}
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
                    {renderText(`Your Score: ${score}/14`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer = userAnswers[num]?.trim() || "";
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
      <Reading1Pagination2022></Reading1Pagination2022>
    </div>
  );
};

export default Reading1Part32022;
