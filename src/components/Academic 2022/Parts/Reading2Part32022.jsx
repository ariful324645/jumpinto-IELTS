import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2022 from "../Pagination2022/Reading2Pagination2022";

const Reading2Part32022 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);
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
    // ================= Questions 27–31 (MCQ A–D) =================
    27: "C", // disprove a widely held view
    28: "C", // explaining an approach
    29: "A", // exception to a general rule
    30: "C", // laid foundations for someone else's breakthrough
    31: "A", // simple reason why it was invented

    // ================= Questions 32–36 (YES / NO / NOT GIVEN) =================
    32: "NO",
    33: "NOT GIVEN",
    34: "YES",
    35: "NO",
    36: "YES",

    // ================= Questions 37–40 (SUMMARY A–G) =================
    37: "F", // inspiration
    38: "D", // mistakes
    39: "E", // luck
    40: "B", // goals
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
              {renderText("Insight or evolution?")}
            </h1>

            <p className="text-lg text-center mb-4">
              {renderText(
                "Two scientists consider the origins of discoveries and other innovative behavior"
              )}
            </p>

            {/* ===================== A ===================== */}
            <p className="text-lg">
              {renderText(
                "Scientific discovery is popularly believed to result from the sheer genius of such intellectual stars as naturalist Charles Darwin and theoretical physicist Albert Einstein."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Our view of such unique contributions to science often disregards the person's prior experience and the efforts of their lesser-known predecessors."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Conventional wisdom also places great weight on insight in promoting breakthrough scientific achievements, as if ideas spontaneously pop into someone's head – fully formed and functional."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    37
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText("There may be some limited truth to this view.")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " However, we believe that it largely misrepresents the real nature of scientific discovery, as well as that of creativity and innovation in many other realms of human endeavor."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== B ===================== */}
            <p className="text-lg">
              {renderText(
                "Setting aside such greats as Darwin and Einstein – whose monumental contributions are duly celebrated – we suggest that innovation is more a process of trial and error, where two steps forward may sometimes come with one step back, as well as one or more steps to the right or left."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " This evolutionary view of human innovation undermines the notion of creative genius and recognizes the cumulative nature of scientific progress."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    29
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== C ===================== */}
            <p className="text-lg">
              {renderText(
                "Consider one unheralded scientist: John Nicholson, a mathematical physicist working in the 1910s who postulated the existence of 'proto-elements' in outer space."
              )}
              {renderText(
                " By combining different numbers of weights of these proto-elements' atoms, Nicholson could recover the weights of all the elements in the then-known periodic table."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " These successes are all the more noteworthy given the fact that Nicholson was wrong about the presence of proto-elements: they do not actually exist."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    38
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Yet, amid his often fanciful theories and wild speculations, Nicholson also proposed a novel theory about the structure of atoms."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Niels Bohr, the Nobel prize-winning father of modern atomic theory, jumped off from this interesting idea to conceive his now-famous model of the atom."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    30
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== D ===================== */}
            <p className="text-lg">
              {renderText(
                "What are we to make of this story? One might simply conclude that science is a collective and cumulative enterprise."
              )}
              {renderText(
                " That may be true, but there may be a deeper insight to be gleaned."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " We propose that science is constantly evolving, much as species of animals do."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== E ===================== */}
            <p className="text-lg">
              {renderText(
                "Plenty of other stories show that fresh advances can arise from error, misadventure, and also pure serendipity – a happy accident."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Such examples give lie to the claim that ingenious, designing minds are responsible for human creativity and invention."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    39
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The notions of insight, creativity and genius are often invoked, but they remain vague and of doubtful scientific utility."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " These notions merely label rather than explain the evolution of human innovations."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The time seems right for abandoning the naive notions of intelligent design and genius, and for scientifically exploring the true origins of creative behavior."
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
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A, B, C or D")}</strong>
            {renderText(".")}
          </p>

          <ul className="space-y-5 text-lg">
            {[
              {
                q: 27,
                text: "The purpose of the first paragraph is to",
                options: [
                  "A. defend particular ideas.",
                  "B. compare certain beliefs.",
                  "C. disprove a widely held view.",
                  "D. outline a common assumption.",
                ],
              },
              {
                q: 28,
                text: "What are the writers doing in the second paragraph?",
                options: [
                  "A. criticising an opinion",
                  "B. justifying a standpoint",
                  "C. explaining an approach",
                  "D. supporting an argument",
                ],
              },
              {
                q: 29,
                text: "In the third paragraph, what do the writers suggest about Darwin and Einstein?",
                options: [
                  "A. They represent an exception to a general rule.",
                  "B. Their way of working has been misunderstood.",
                  "C. They are an ideal which others should aspire to.",
                  "D. Their achievements deserve greater recognition.",
                ],
              },
              {
                q: 30,
                text: "John Nicholson is an example of a person whose idea",
                options: [
                  "A. established his reputation as an influential scientist.",
                  "B. was only fully understood at a later point in history.",
                  "C. laid the foundations for someone else's breakthrough.",
                  "D. initially met with scepticism from the scientific community.",
                ],
              },
              {
                q: 31,
                text: "What is the key point of interest about the 'acey-deucy' stirrup placement?",
                options: [
                  "A. the simple reason why it was invented",
                  "B. the enthusiasm with which it was adopted",
                  "C. the research that went into its development",
                  "D. the cleverness of the person who first used it",
                ],
              },
            ].map(({ q, text, options }) => (
              <li key={q} className="space-y-2">
                <p>
                  <span className="font-bold">{renderText(q)}</span>{" "}
                  {renderText(text)}
                </p>

                <div className="ml-6 space-y-1">
                  {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt[0]}
                        onChange={(e) => handleInputChange(q, e.target.value)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 32–36 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 32–36")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 3?"
            )}
            <br />
            {renderText("In boxes 32–36 on your answer sheet, choose")}
            <br />
            <strong>{renderText("YES")}</strong>{" "}
            {renderText(
              "if the statement agrees with the claims of the writer"
            )}
            <br />
            <strong>{renderText("NO")}</strong>{" "}
            {renderText(
              "if the statement contradicts the claims of the writer"
            )}
            <br />
            <strong>{renderText("NOT GIVEN")}</strong>{" "}
            {renderText(
              "if it is impossible to say what the writer thinks about this"
            )}
          </p>

          <ul className="space-y-6 text-lg">
            {[
              "Acknowledging people such as Plato or da Vinci as geniuses will help us understand the process by which great minds create new ideas.",
              "The Law of Effect was discovered at a time when psychologists were seeking a scientific reason why creativity occurs.",
              "The Law of Effect states that no planning is involved in the behaviour of organisms.",
              "The Law of Effect sets out clear explanations about the sources of new ideas and behaviours.",
              "Many scientists are now turning away from the notion of intelligent design and genius.",
            ].map((text, idx) => {
              const qNum = 32 + idx;

              return (
                <li key={qNum} className="space-y-2">
                  {/* Question */}
                  <div className="flex gap-2">
                    <span className="font-bold">{renderText(qNum)}</span>
                    <span>{renderText(text)}</span>
                  </div>

                  {/* Options */}
                  <div className="ml-6 space-y-1">
                    {["YES", "NO", "NOT GIVEN"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q${qNum}`}
                          value={opt}
                          onChange={(e) =>
                            handleInputChange(qNum, e.target.value)
                          }
                        />
                        <span>{renderText(opt)}</span>
                      </label>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 37–40 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">
            {renderText("Questions 37–40")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the summary using the list of words or phrases below."
            )}
            <br />
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A–G")}</strong>
            {renderText(".")}
          </p>

          <div className="border p-4 max-w-[220px] mb-4 text-lg mx-auto space-y-1">
            {[
              "A. invention",
              "B. goals",
              "C. compromise",
              "D. mistakes",
              "E. luck",
              "F. inspiration",
              "G. experiments",
            ].map((opt) => (
              <p key={opt}>{renderText(opt)}</p>
            ))}
          </div>

          <div className="space-y-4 text-lg leading-relaxed border p-4">
            <h2 className="text-xl font-bold text-center">
              {renderText("The origins of creative behaviour")}
            </h2>

            <p className="flex flex-wrap items-center gap-2">
              <span>
                {renderText(
                  "The traditional view of scientific discovery is that breakthroughs happen when a single great mind has sudden"
                )}
              </span>

              <button
                onClick={() => toggleButton(37)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[37]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                37
              </button>

              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(37, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span>
                {renderText(
                  ". Although this can occur, it is not often the case. Advances are more likely to be the result of a longer process. In some cases, this process involves"
                )}
              </span>

              <button
                onClick={() => toggleButton(38)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[38]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                38
              </button>

              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(38, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span>
                {renderText(
                  ", such as Nicholson's theory about proto-elements. In others, simple necessity may provoke innovation, as with Westrope's decision to modify the position of his riding stirrups. There is also often an element of"
                )}
              </span>

              <button
                onClick={() => toggleButton(39)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[39]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                39
              </button>

              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(39, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span>
                {renderText(
                  ", for example, the coincidence of ideas that led to the invention of the Post-It note. With both the Law of Natural Selection and the Law of Effect, there may be no clear"
                )}
              </span>

              <button
                onClick={() => toggleButton(40)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[40]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                40
              </button>

              <select
                className="border rounded px-2 py-1"
                onChange={(e) => handleInputChange(40, e.target.value)}
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span>
                {renderText(
                  "involved, but merely a process of variation and selection."
                )}
              </span>
            </p>
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
      <Reading2Pagination2022></Reading2Pagination2022>
    </div>
  );
};

export default Reading2Part32022;
