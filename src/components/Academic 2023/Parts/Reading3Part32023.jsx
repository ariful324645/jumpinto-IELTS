import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2023 from "../Pagination 2023/Reading3Pagination2023";

const Reading3Part32023 = () => {
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
    27: "B",
    28: "C",
    29: "C",
    30: "C",

    // Questions 31–35 (dropdown A–I)
    31: "H", // higher achievements
    32: "D", // bottom sets
    33: "F", // disadvantaged backgrounds
    34: "E", // brightest pupils
    35: "B", // lower expectations

    // Questions 36–40 (radio YES/NO/NOT GIVEN)
    36: "YES",
    37: "NOT GIVEN",
    38: "YES",
    39: "NO",
    40: "YES",
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part32023");
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
    const savedScore = localStorage.getItem("/reading2Part32023");
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
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("The case for mixed-ability classes")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Picture this scene. It's an English literature lesson in a UK school, and the teacher has just read an extract from Shakespeare's Romeo and Juliet with a class of 15-year-olds. He's given some of the students copies of No Fear Shakespeare, a kid-friendly translation of the original. For three students, even these literacy demands are beyond them. Another girl simply can't focus and he gives her pens and paper to draw with. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The teacher can ask the No Fear group to identify the key characters and maybe provide a tentative plot summary."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                " He can ask most of the class about character development, and five of them might be able to support their statements with textual evidence. Now two curious students are wondering whether Shakespeare advocates living a life of moderation or one of passionate engagement."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "As a teacher myself, I'd think my lesson would be going rather well if the discussion went as described above. But wouldn't this kind of class work better if there weren't such a huge gap between the top and the bottom? If we put all the kids who needed literacy support into one class, and all the students who want to discuss the virtue of moderation into another?"
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "The practice of 'streaming', or 'tracking', involves separating students into classes depending on their diagnosed levels of attainment. At a macro level, it requires the establishment of academically selective schools for the brightest students, and comprehensive schools for the rest. Within schools, it means selecting students into a 'stream' of general ability, or 'sets' of subject specific ability. The practice is intuitively appealing to almost every stakeholder."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(" ")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {renderText(
                "I have heard the mixed-ability model attacked by way of analogy: a group hike. The fittest in the group take the lead and set a brisk pace, only to have to stop and wait every 20 minutes. This is frustrating, and their enthusiasm wanes. Meanwhile, the slowest ones are not only embarrassed but physically struggling to keep up. What's worse, they never get a long enough break. They honestly just want to quit. Hiking, they feel, is not for them."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "Mixed-ability classes bore students, frustrate parents and burn out teachers. The brightest ones will never summit Mount Qomolangma, and the stragglers won't enjoy the lovely stroll in the park they are perhaps more suited to."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Individuals suffer at the demands of the collective, mediocrity prevails."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
              {renderText(" So: is learning like hiking?")}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "The current pedagogical paradigm is arguably that of constructivism, which emerged out of the work of psychologist Lev Vygotsky. In the 1930s, Vygotsky emphasised the importance of targeting a student's specific 'zone of proximal development' (ZPD). This is the gap between what they can achieve only with support - teachers, textbooks, worked examples, parents and so on - and what they can achieve independently. The purpose of teaching is to provide and then gradually remove this 'scaffolding' until they are autonomous."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " If we accept this model, it follows that streaming students with similar ZPDs would be an efficient and effective solution."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
              {renderText(
                " And that forcing everyone on the same hike - regardless of aptitude - would be madness."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "Despite all this, there is limited empirical evidence to suggest that streaming results in better outcomes for students."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Professor John Hattie, director of the Melbourne Education Research Institute, notes that 'tracking has minimal effects on learning outcomes'."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
              {renderText(
                " What is more, streaming appears to significantly - and negatively - affect those students assigned to the lowest sets."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " These students tend to have much higher representation of low socioeconomic class."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
              {renderText(
                " Less significant is the small benefit for those lucky clever students in the higher sets."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The overall result is that the smart stay smart and the dumb get dumber, further entrenching the social divide."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {renderText(
                "In the latest update of Hattie's influential meta-analysis of factors influencing student achievement, one of the most significant factors is the teachers' estimate of achievement. Streaming students by diagnosed achievement automatically limits what the teacher feels the student is capable of."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Meanwhile, in a mixed environment, teachers' estimates need to be more diverse and flexible."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {renderText(
                "While streaming might seem to help teachers effectively target a student's ZPD, it can underestimate the importance of peer-to-peer learning. A crucial aspect of constructivist theory is the role of the MKO - 'more knowledgeable other' - in knowledge construction. While teachers are traditionally the MKOs in classrooms, the value of knowledgeable student peers must not go unrecognised either."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "I find it amazing to watch students get over an idea to their peers in ways that I would never think of. They operate with different language tools and different social tools from teachers and, having just learnt it themselves, they possess similar cognitive structures to their struggling classmates."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " There is also something exciting about passing on skills and knowledge that you yourself have just mastered - a certain pride and zeal, a certain freshness to the interaction between 'teacher' and 'learner' that is often lost by the expert for whom the steps are obvious and the joy of discovery forgotten."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {renderText(
                "Having a variety of different abilities in a collaborative learning environment provides valuable resources for helping students meet their learning needs, not to mention improving their communication and social skills. And today, more than ever, we need the many to flourish - not suffer at the expense of a few bright stars."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Once a year, I go on a hike with my class, a mixed bunch of students."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
              {renderText(
                " It is challenging. The fittest students realise they need to encourage the reluctant. There are lookouts who report back, and extra items to carry for others. We make it - together."
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
          {/* ================= Questions 27–30 ================= */}
          <div className="space-y-6 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27–30")}
            </h2>

            <p className="mb-4">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </p>

            {[
              {
                num: 27,
                text: "The writer describes the Romeo and Juliet lesson in order to demonstrate",
                options: [
                  "A. how few students are interested in literature.",
                  "B. how a teacher handles a range of learning needs.",
                  "C. how unsuitable Shakespeare is for most teenagers.",
                  "D. how weaker students can disrupt their classmates' learning.",
                ],
              },
              {
                num: 28,
                text: "What does the writer say about streaming in the third paragraph?",
                options: [
                  "A. It has a very broad appeal.",
                  "B. It favours cleverer students.",
                  "C. It is relatively simple to implement.",
                  "D. It works better in some schools than others.",
                ],
              },
              {
                num: 29,
                text: "What idea is suggested by the reference to Mount Qomolangma in the fifth paragraph?",
                options: [
                  "A. students following unsuitable paths",
                  "B. students attempting interesting tasks",
                  "C. students not achieving their full potential",
                  "D. students not being aware of their limitations",
                ],
              },
              {
                num: 30,
                text: "What does the word 'scaffolding' in the sixth paragraph refer to?",
                options: [
                  "A. the factors which prevent a student from learning effectively",
                  "B. the environment where most of a student's learning takes place",
                  "C. the assistance given to a student in their initial stages of learning",
                  "D. the setting of appropriate learning targets for a student's aptitude",
                ],
              },
            ].map(({ num, text, options }) => (
              <div key={num} className="space-y-2">
                <p>
                  <button
                    onClick={() => toggleButton(num)}
                    className={`flex-shrink-0 mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[num]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    {num}
                  </button>
                  {renderText(text)}
                </p>

                <div className="flex flex-col">
                  {options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt.charAt(0)}
                        checked={userAnswers[num] === opt.charAt(0)}
                        onChange={() => handleInputChange(num, opt.charAt(0))}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 31–35 ================= */}
          <div className="space-y-6 mt-8 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 31–35")}
            </h2>

            <p className="mb-4">
              {renderText(
                "Complete the summary using the list of words or phrases below."
              )}
              <br />
              {renderText(
                "Choose the correct letter, A–I, in boxes 31–35 on your answer sheet."
              )}
            </p>

            <div className="border max-w-[350px] mx-auto p-4">
              <ul className="text-center">
                {[
                  "A. wrong classes",
                  "B. lower expectations",
                  "C. average learners",
                  "D. bottom sets",
                  "E. brightest pupils",
                  "F. disadvantaged backgrounds",
                  "G. weaker students",
                  "H. higher achievements",
                  "I. positive impressions",
                ].map((item) => (
                  <li key={item}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            <div className="border p-4 rounded space-y-3 mt-3">
              <p className="flex flex-wrap items-center gap-2 text-lg">
                {renderText(
                  "According to Professor John Hattie of the Melbourne Education Research Institute, there is very little indication that streaming leads to"
                )}

                {/* Question 31 */}
                <span className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold bg-gray-200 border-gray-400">
                    31
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    value={userAnswers[31] || ""}
                    onChange={(e) => handleInputChange(31, e.target.value)}
                  >
                    <option value=""></option>
                    {"ABCDEFGHI".split("").map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </span>

                {renderText(
                  ". He points out that, in schools which use streaming, the most significant impact is on those students placed in the"
                )}

                {/* Question 32 */}
                <span className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold bg-gray-200 border-gray-400">
                    32
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    value={userAnswers[32] || ""}
                    onChange={(e) => handleInputChange(32, e.target.value)}
                  >
                    <option value=""></option>
                    {"ABCDEFGHI".split("").map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </span>

                {renderText(
                  ", especially where a large proportion of them have"
                )}

                {/* Question 33 */}
                <span className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold bg-gray-200 border-gray-400">
                    33
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    value={userAnswers[33] || ""}
                    onChange={(e) => handleInputChange(33, e.target.value)}
                  >
                    <option value=""></option>
                    {"ABCDEFGHI".split("").map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </span>

                {renderText(". Meanwhile, for the")}

                {/* Question 34 */}
                <span className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold bg-gray-200 border-gray-400">
                    34
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    value={userAnswers[34] || ""}
                    onChange={(e) => handleInputChange(34, e.target.value)}
                  >
                    <option value=""></option>
                    {"ABCDEFGHI".split("").map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </span>

                {renderText(
                  ", there appears to be only minimal advantage. A further issue is that teachers tend to have"
                )}

                {/* Question 35 */}
                <span className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold bg-gray-200 border-gray-400">
                    35
                  </span>
                  <select
                    className="border rounded px-2 py-1"
                    value={userAnswers[35] || ""}
                    onChange={(e) => handleInputChange(35, e.target.value)}
                  >
                    <option value=""></option>
                    {"ABCDEFGHI".split("").map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </span>

                {renderText("of students in streamed groups.")}
              </p>
            </div>
          </div>

          {/* ================= Questions 36–40 ================= */}
          <div className="space-y-6 mt-8 text-lg">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 36–40")}
            </h2>

            <p className="mb-4">
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 3?"
              )}
              <br />
              {renderText("In boxes 36–40 on your answer sheet, choose")}
              <strong> {renderText("YES")}</strong>,{" "}
              <strong>{renderText("NO")}</strong>, {renderText("or")}{" "}
              <strong>{renderText("NOT GIVEN")}</strong>.
            </p>

            {[
              {
                num: 36,
                text: "The Vygotsky model of education supports the concept of a mixed-ability class.",
              },
              {
                num: 37,
                text: "Some teachers are uncertain about allowing students to take on MKO roles in the classroom.",
              },
              {
                num: 38,
                text: "It can be rewarding to teach knowledge which you have only recently acquired.",
              },
              {
                num: 39,
                text: "The priority should be to ensure that the highest-achieving students attain their goals.",
              },
              {
                num: 40,
                text: "Taking part in collaborative outdoor activities with teachers and classmates can improve student outcomes in the classroom.",
              },
            ].map(({ num, text }) => (
              <div key={num} className="space-y-2">
                <p>
                  <span className="font-bold">
                    {renderText(num.toString())}
                  </span>{" "}
                  {renderText(text)}
                </p>

                <div className="flex flex-col">
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
              </div>
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
                    {renderText("Your Score:")} {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();
                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
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
                            {(noAnswer || (!isCorrect && userAnswer)) && (
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
                              userAnswer
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            {correctAnswers[num]}
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
      <Reading3Pagination2023></Reading3Pagination2023>
    </div>
  );
};

export default Reading3Part32023;
