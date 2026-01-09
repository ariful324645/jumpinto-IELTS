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
            <h1 className="text-2xl font-bold mb-5 text-center">
              To catch a king
            </h1>
            <p className="text-lg italic text-center mb-6">
              Anna Keay reviews Charles Spencer's book about the hunt for King
              Charles II during the English Civil War of the seventeenth century
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Charles Spencer's latest book, To Catch a King, tells us the
                story of the hunt for King Charles II in the six weeks after his
                resounding defeat at the Battle of Worcester in September 1651.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>
              And what a story it is.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                After his father was executed by the Parliamentarians in 1649,
                the young Charles II sacrificed one of the very principles his
                father had died for and did a deal with the Scots, thereby
                accepting Presbyterianism* as the national religion in return
                for being crowned King of Scots.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                      27
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      28
                    </span>
                  </>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              Years later, after his restoration as king, the 50-year-old
              Charles II requested a meeting with the writer and diarist Samuel
              Pepys.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                His intention when asking Pepys to commit his story to paper was
                to ensure that this most extraordinary episode was never
                forgotten.
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
                Over two three-hour sittings, the king related to him in great
                detail his personal recollections of the six weeks he had spent
                as a fugitive.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    34
                  </span>
                )}
              </span>
              As the king and secretary settled down (a scene that is surely a
              gift for a future scriptwriter), Charles commenced his story:
              "After the battle was so absolutely lost as to be beyond hope of
              recovery, I began to think of the best way of saving myself."
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                One of the joys of Spencer's book, a result not least of its use
                of Charles II's own narrative as well as those of his
                supporters, is just how close the reader gets to the action.
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
                The day-by-day retelling of the fugitives' doings provides
                delicious details: the cutting of the king's long hair with
                agricultural shears, the use of walnut leaves to dye his pale
                skin, and the day Charles spent lying on a branch of the great
                oak tree in Boscobel Wood as the Parliamentary soldiers scoured
                the forest floor below.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    37
                  </span>
                )}
              </span>
              Spencer draws out both the humour - such as the preposterous
              refusal of Charles's friend Henry Wilmot to adopt disguise on the
              grounds that it was beneath his dignity - and the emotional
              tension when the secret of the king's presence was cautiously
              revealed to his supporters.
            </p>
            <br />

            <p className="text-lg">
              Charles's adventures after losing the Battle of Worcester hide the
              uncomfortable truth that whilst almost everyone in England had
              been appalled by the execution of his father, they had not
              welcomed the arrival of his son with the Scots army, but had
              instead firmly bolted their doors. This was partly because he rode
              at the head of what looked like a foreign invasion force and
              partly because, after almost a decade of civil war, people were
              desperate to avoid it beginning again. This makes it all the more
              interesting that Charles II himself loved the story so much ever
              after. As well as retelling it to anyone who would listen, causing
              eyerolling among courtiers,
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                he set in train a series of initiatives to memorialise it.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    38
                  </span>
                )}
              </span>
              There was to be a new order of chivalry, the Knights of the Royal
              Oak. A series of enormous oil paintings depicting the episode were
              produced, including a two-metre-wide canvas of Boscobel Wood and a
              set of six similarly enormous paintings of the king on the run. In
              1660, Charles II commissioned the artist John Michael Wright to
              paint a flying squadron of cherubs* carrying an oak tree to the
              heavens on the ceiling of his bedchamber. It is hard to imagine
              many other kings marking the lowest point in their life so
              enthusiastically, or indeed pulling off such an escape in the
              first place.
            </p>

            <br />

            <p className="text-lg">
              Charles Spencer is the perfect person to pass the story on to a
              new generation. His pacey, readable prose steers deftly clear of
              modern idioms and elegantly brings to life the details of the
              great tale. He has even-handed sympathy for both the fugitive king
              and the fierce republican regime that hunted him, and
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                he succeeds in his desire to explore far more of the background
                of the story than previous books on the subject have done.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    39
                  </span>
                )}
              </span>
              Indeed, the opening third of the book is about how Charles II
              found himself at Worcester in the first place, which for some will
              be reason alone to read To Catch a King.
            </p>

            <br />

            <p className="text-lg">
              The tantalising question left, in the end, is that of what it all
              meant.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Would Charles II have been a different king had these six weeks
                never happened?
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    40
                  </span>
                )}
              </span>
              The days and nights spent in hiding must have affected him in some
              way. Did the need to assume disguises, to survive on wit and charm
              alone, to use trickery and subterfuge to escape from tight corners
              help form him? This is the one area where the book doesn't quite
              hit the mark. Instead its depiction of Charles II in his final
              years as an ineffective, pleasure-loving monarch doesn't do
              justice to the man (neither is it accurate), or to the complexity
              of his character. But this one niggle aside, To Catch a King is an
              excellent read, and those who come to it knowing little of the
              famous tale will find they have a treat in store.
            </p>

            <br />

            <p className="text-lg font-medium mt-4">Glossary</p>
            <p className="text-lg italic">
              * Presbyterianism: part of the reformed Protestant religion
            </p>
            <p className="text-lg italic">
              * cherub: an image of angelic children used in paintings
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
          <h2 className="text-lg font-bold mb-3">Questions 27–31</h2>

          <p className="mb-4">
            Complete the summary using the list of words or phrases below.
            <br />
            Choose the correct letter, A–J, in boxes 27–31 on your answer sheet.
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
              <p key={option}>{option}</p>
            ))}
          </div>

          <div className="border max-w-6xl  p-5 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              The story behind the hunt for Charles II
            </h3>
            <ul className="list-decimal list-inside space-y-4 text-lg">
              {[
                "Charles II's father was executed by the Parliamentarian forces in 1649 .Charles II then formed a",
                "with the Scots, and in order to become King of Scots, he abandoned an important",
                "that was held by his father and had contributed to his father's death. The opposing sides then met outside Worcester in 1651. The battle led to a",
                "for the Parliamentarians and Charles had to flee for his life. A",
                "was offered for Charles's capture, but after six weeks spent in hiding, he eventually managed to reach the",
              ].map((text, index) => {
                const qNum = 27 + index;
                const options = [
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "I",
                  "J",
                ];

                return (
                  <li key={qNum} className="flex gap-2">
                    <span>{text}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                        {qNum}
                      </span>
                      <select
                        className="border rounded px-2 py-1 w-20"
                        onChange={(e) =>
                          handleInputChange(qNum, e.target.value)
                        }
                        defaultValue=""
                      >
                        <option value="" disabled></option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4">
              Word/Phrase list: A.military innovation B.large reward
              C.widespread conspiracy D.relative safety E.new government
              F.decisive victory G.political debate H.strategic alliance
              I.popular solution J.religious conviction
            </p>
          </div>

          {/* ================= Questions 32–35 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 32–35</h2>

          <p className="mb-4">
            Do the following statements agree with the claims of the writer in
            Reading Passage 3?
            <br />
            In boxes 32–35 on your answer sheet, choose
          </p>

          <div className="mb-4 space-y-1">
            <p>
              <strong>YES</strong> if the statement agrees with the claims of
              the writer
            </p>
            <p>
              <strong>NO</strong> if the statement contradicts the claims of the
              writer
            </p>
            <p>
              <strong>NOT GIVEN</strong> if it is impossible to say what the
              writer thinks about this
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
                      {qNum}
                    </div>
                    <p className="text-lg">{q}</p>
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
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 36–40</h2>

          <p className="mb-4">Choose the correct letter, A, B, C or D.</p>

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
                      {qNum}
                    </div>
                    <p className="text-lg">{qObj.question}</p>
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
                          {optionText}
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
      <Reading1Pagination2022></Reading1Pagination2022>
    </div>
  );
};

export default Reading1Part32022;
