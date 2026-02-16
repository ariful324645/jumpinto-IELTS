import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

//  Marks show

const Test4Reading2011 = () => {
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
    "There is a wider range of achievement amongst English pupils studying maths than amongst their Japanese counterparts.",
    "The percentage of Gross National Product spent on education generally reflects the level of attainment in mathematics.",
    "Private schools in Japan are more modern and spacious than state-run lower secondary schools.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
  const question2 = [
    "Maths textbooks in Japanese schools are",
    "When a new maths topic is introduced,",
    "How do schools deal with students who experience difficulties?",
    "Why do Japanese students tend to achieve relatively high rates of success in maths?",
  ];

  const options2 = [
    [
      "A. cheap for pupils to buy.",
      "B. well organised and adapted to the needs of the pupils.",
      "C. written to be used in conjunction with TV programmes.",
      "D. not very popular with many Japanese teachers.",
    ],
    [
      "A. students answer questions on the board.",
      "B. students rely entirely on the textbook.",
      "C. it is carefully and patiently explained to the students.",
      "D. it is usual for students to use extra worksheets.",
    ],
    [
      "A. They are given appropriate supplementary tuition.",
      "B. They are encouraged to copy from other pupils.",
      "C. They are forced to explain their slow progress.",
      "D. They are placed in a mixed-ability class.",
    ],
    [
      "A. It is a compulsory subject in Japan.",
      "B. They are used to working without help from others.",
      "C. Much effort is made and correct answers are emphasised.",
      "D. There is a strong emphasis on repetitive learning.",
    ],
  ];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null),
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 6;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions2]; // ✅ use selectedOptions2
    updatedOptions[qIndex] = option;
    setSelectedOptions2(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 10;
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
    Array(questions.length).fill(null),
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false),
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    // Questions 1–5 (Matching Headings)
    1: "iv",
    2: "vii",
    3: "i",
    4: "v",
    5: "viii",

    // Questions 6–8 (YES / NO / NOT GIVEN)
    6: "YES",
    7: "NO",
    8: "NOT GIVEN",

    // Questions 10–13 (Multiple Choice)
    10: "B. well organised and adapted to the needs of the pupils.",
    11: "C. it is carefully and patiently explained to the students.",
    12: "A. They are given appropriate supplementary tuition.",
    13: "C. Much effort is made and correct answers are emphasised.",
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

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 1")}</h1>
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
              {renderText("       You should spend about 20 minutes on")}

              <span className="text-lg font-bold">
                {renderText("          Questions 1-13")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("LAND OF THE RISING SUN")}
            </h1>

            {/* Paragraph A */}
            <p className="text-lg">
              {renderText(
                "Japan has a significantly better record in terms of average mathematical attainment than England and Wales.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " Large sample international comparisons of pupils' attainments since the 1960s have established that not only did Japanese pupils at age 13 have better scores of average attainment, but there was also a larger proportion of 'low' attainers in England, where, incidentally, the variation in attainment scores was much greater.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " The percentage of Gross National Product spent on education is reasonably similar in the two countries, so how is this higher and more consistent attainment in maths achieved?",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("7")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph B */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "Lower secondary schools in Japan cover three school years, from the seventh grade (age 13) to the ninth grade (age 15).",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>
              {renderText(
                " Virtually all pupils at this stage attend state schools: only 3 per cent are in the private sector. Schools are usually modern in design, set well back from the road and spacious inside. Classrooms are large and pupils sit at single desks in rows. Lessons last for a standardised 50 minutes and are always followed by a 10-minute break, which gives the pupils a chance to let off steam. Teachers begin with a formal address and mutual bowing, and then concentrate on whole-class teaching. Classes are large - usually about 40 - and are unstreamed. Pupils stay in the same class for all lessons throughout the school and develop considerable class identity and loyalty. Pupils attend the school in their own neighbourhood, which in theory removes ranking by school. In practice in Tokyo, because of the relative concentration of schools, there is some competition to get into the 'better' school in a particular area.",
              )}
            </p>

            <br />

            {/* Paragraph C */}
            <p className="text-lg">
              {renderText(
                "Traditional ways of teaching form the basis of the lesson and the remarkably quiet classes take their own notes of the points made and the examples demonstrated. Everyone has their own copy of the textbook supplied by the central education authority, Monbusho, as part of the concept of free compulsory education up to the age of 15.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " These textbooks are, on the whole, small, presumably inexpensive to produce, but well set out and logically developed.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
              {renderText(
                " (One teacher was particularly keen to introduce colour and pictures into maths textbooks: he felt this would make them more accessible to pupils brought up in a cartoon culture.) ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " Besides approving textbooks, Monbusho also decides the highly centralised national curriculum and how it is to be delivered.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph D */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText("Lessons all follow the same pattern.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>
              {renderText(
                " At the beginning, the pupils put solutions to the homework on the board, then the teachers comment, correct or elaborate as necessary.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "  Pupils mark their own homework: this is an important principle in Japanese schooling as it enables pupils to see where and why they made a mistake, so that these can be avoided in future.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
              {renderText(
                " No one minds mistakes or ignorance as long as you are prepared to learn from them. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " After the homework has been discussed, the teacher explains the topic of the lesson, slowly and with a lot of repetition and elaboration.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph E */}
            <p className="text-lg">
              {renderText(
                "It is remarkable that large, mixed-ability classes could be kept together for maths throughout all their compulsory schooling from 6 to 15. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Teachers say that they give individual help at the end of a lesson or after school, setting extra work if necessary.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  " Parents are kept closely informed of their children's progress and will play a part in helping their children to keep up with class, sending them to 'Juku' (private evening tuition) if extra help is needed and encouraging them to work harder.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph F */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "So what are the major contributing factors in the success of maths teaching?",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("5")}
                  </span>
                )}
              </span>
              {renderText(" Clearly, attitudes are important. ")}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "  Education is valued greatly in Japanese culture; maths is recognised as an important compulsory subject throughout schooling; and the emphasis is on hard work coupled with a focus on accuracy.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <div className="flex justify-end items-center p-4 text-gray-500">
              {/* clear icon */}
              <div className="relative group">
                <div className="flex justify-between items-center">
                  <span
                    onClick={() => setIsOpen(true)}
                    className="text-xl cursor-pointer"
                  >
                    <GrClearOption />
                  </span>
                </div>
                {/* Tooltip */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {renderText("Clear answer")}
                </span>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        {renderText(
                          "Are you sure you want to clear all answers?",
                        )}
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                        >
                          {renderText("No, keep them")}
                        </button>
                        <button
                          onClick={handleClear}
                          className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          {renderText("Yes, clear them")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 1-5")}
              </h1>
              <p>
                {renderText(
                  "Look at the following statements (Questions 1-5) and the list of people below.",
                )}
              </p>
              <p>
                {renderText("Match each statement with the correct person,")}
                <span className="font-bold text-lg">{renderText(" A-F")}</span>.
              </p>
              <p>
                {renderText(
                  "Choose the correct letter, i-x, in boxes 1-5 on your answer sheet.",
                )}
              </p>
              <p>{renderText("NB You may use any letter more than once.")}</p>
              //
              {/* ---------- List of People ---------- */}
              <div className="flex items-center justify-center border border-black py-4 px-4 w-80 mx-auto">
                <div className="text-left">
                  <ul className="space-y-1 text-lg">
                    <li>{renderText("i. The influence of Monbusho")}</li>
                    <li>
                      {renderText("ii. Helping less successful students")}
                    </li>
                    <li>
                      {renderText("iii. The success of compulsory education")}
                    </li>
                    <li>
                      {renderText(
                        "iv. Research findings concerning achievements in maths",
                      )}
                    </li>
                    <li>
                      {renderText("v. The typical format of a maths lesson")}
                    </li>
                    <li>
                      {renderText(
                        "vi. Comparative expenditure on maths education",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "vii. Background to middle-years education in Japan",
                      )}
                    </li>
                    <li>
                      {renderText(
                        "viii. The key to Japanese successes in maths education",
                      )}
                    </li>
                    <li>{renderText("ix. The role of homework correction")}</li>
                  </ul>
                </div>
              </div>
              {/* ---------- Laser Lightning Passage ---------- */}
              <div className="border-2 border-black rounded-lg p-5 mt-5">
                <p className="flex items-center gap-2 flex-wrap mb-4">
                  {renderText("Section B")}
                  {/* ---- Box for 7 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[1] || ""}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="1">{renderText("1")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  {renderText("Section C")}
                  {/* ---- Box for 8 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[2] || ""}
                      onChange={(e) => handleInputChange(2, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="2">{renderText("2")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>{" "}
                  </div>
                  {renderText("Section D")}
                  {/* ---- Box for 9 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[3] || ""}
                      onChange={(e) => handleInputChange(3, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="3">{renderText("3")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>{" "}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  {renderText("Section E")}
                  {/* ---- Box for 10 ---- */}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[4] || ""}
                      onChange={(e) => handleInputChange(4, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="4">{renderText("4")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  {renderText("Section F")}
                  <div className="relative w-40">
                    <select
                      value={userAnswers[5] || ""}
                      onChange={(e) => handleInputChange(5, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="5">{renderText("5")}</option>
                      <option value="i">{renderText("i")}</option>
                      <option value="ii">{renderText("ii")}</option>
                      <option value="iii">{renderText("iii")}</option>
                      <option value="iv">{renderText("iv")}</option>
                      <option value="v">{renderText("v")}</option>
                      <option value="vi">{renderText("vi")}</option>
                      <option value="vii">{renderText("vii")}</option>
                      <option value="viii">{renderText("viii")}</option>
                      <option value="ix">{renderText("ix")}</option>
                      <option value="x">{renderText("x")}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                  .
                </p>
              </div>
            </div>
          </div>
          <br />
          {/* 2nd step */}
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 6-9")}
            </h2>
            <br />
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Do the following statements agree with the information given in Reading Passage 1?",
              )}{" "}
              <br /> <br />
              {renderText("In boxes 6-9 on your answer sheet, choose")}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
              {renderText(
                "if the statement agrees with the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
              {renderText(
                "if the statement contradicts the claims of the writer",
              )}
            </h3>
            <h3 className="flex gap-5 text-lg">
              <span className="text-lg font-bold">
                {renderText("NOT GIVEN")}
              </span>{" "}
              {renderText(
                "if it is impossible to say what the writer thinks about this",
              )}
            </h3>
            <br /> <br />
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">Questions 6-9</h2>
              {questions.map((q, qIndex) => {
                const answerKey = qIndex + 6;
                const correct = correctAnswers[answerKey];

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">
                      {answerKey}. {q}
                    </h3>
                    <ul className="flex flex-col gap-2 ml-4">
                      {options.map((option, oIndex) => {
                        const isSelected = selectedOptions[qIndex] === option;
                        const isCorrect = option === correct;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick(qIndex, option)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span
                              className={`w-5 h-5 rounded-full border-2 inline-block ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-700"
                              }`}
                            ></span>
                            <span
                              className={
                                isSelected ? "text-blue-500" : "text-black"
                              }
                            >
                              {option}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 10-13")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B ,C or D")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 10;

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg">
                      {answerKey}. {q}
                    </h3>

                    <ul className="flex flex-col gap-2 ml-4">
                      {options2[qIndex].map((option, oIndex) => {
                        const isSelected = selectedOptions2[qIndex] === option;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick2(qIndex, option)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span
                              className={`w-5 h-5 rounded-full border-2 inline-block ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-700"
                              }`}
                            ></span>

                            <span
                              className={
                                isSelected ? "text-blue-500" : "text-black"
                              }
                            >
                              {option}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (1-13)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
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
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
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

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
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
      {/* <Reading4Pagination2020></Reading4Pagination2020> */}
      {/* <Reading4Pagination2020></Reading4Pagination2020> */}
    </div>
  );
};

export default Test4Reading2011;
