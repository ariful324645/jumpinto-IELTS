import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2023 from "../Pagination 2023/Reading4Pagination2023";

const Reading4Part32023 = () => {
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
    // Questions 27–30 (YES / NO / NOT GIVEN)
    27: "YES",
    28: "NOT GIVEN",
    29: "NO",
    30: "NO",

    // Questions 31–36 (Summary completion A–J)
    31: "I", // biographer's perspective
    32: "F", // professional interests
    33: "A", // modest fame
    34: "C", // record-breaking achievement
    35: "H", // hazardous exploration
    36: "E", // select group

    // Questions 37–40 (MCQ A–D)
    37: "B",
    38: "C",
    39: "D",
    40: "C",
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
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              Alfred Wegener: science, exploration and the theory of continental
              drift
            </h1>
            <p className="text-lg font-medium mb-5 text-center">
              by Mott T Greene
            </p>

            <p className="text-lg font-bold">Introduction</p>

            <p className="text-lg">
              This is a book about the life and scientific work of Alfred
              Wegener, whose reputation today rests with his theory of
              continental displacements, better known as 'continental
              drift'.Wegener proposed this theory in 1912 and developed it
              extensively for nearly 20 years.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                His book on the subject, "The Origin of Continents and Oceans",
                went through four editions and was the focus of an international
                controversy in his lifetime and for some years after his death.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    27
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              Wegener's basic idea was that many mysteries about the Earth's
              history could be solved if one supposed that the continents moved
              laterally, rather than supposing that they remained fixed in
              place.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Wegener showed in great detail how such continental movements
                were plausible and how they worked, using evidence from a large
                number of sciences including geology, geophysics, paleontology,
                and climatology.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    29
                  </span>
                )}
              </span>
              Wegener's idea - that the continents move - is at the heart of the
              theory that guides Earth sciences today: namely plate tectonics.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Plate tectonics is in many respects quite different from
                Wegener's proposal, in the same way that modern evolutionary
                theory is very different from the ideas Charles Darwin proposed
                in the 1850s about biological evolution.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    30
                  </span>
                )}
              </span>
              Yet plate tectonics is a descendant of Alfred Wegener's theory of
              continental drift, in quite the same way that modern evolutionary
              theory is a descendant of Darwin's theory of natural selection.
            </p>

            <p className="text-lg">
              When I started writing about Wegener's life and work, one of the
              most intriguing things about him for me was that, although he came
              up with a theory on continental drift, he was not a geologist.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                He trained as an astronomer and pursued a career in atmospheric
                physics.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    31
                  </span>
                )}
              </span>
              When he proposed the theory of continental displacements in 1912,
              he was a lecturer in physics and astronomy at the University of
              Marburg, in southern Germany.However, he was not an 'unknown'.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                In 1906 he had set a world record (with his brother Kurt) for
                time aloft in a hot-air balloon: 52 hours.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    34
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Between 1906 and 1908 he had taken part in a highly publicized
                and extremely dangerous expedition to the coast of northeast
                Greenland.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    35
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                He had also made a name for himself amongst a small circle of
                meteorologists and atmospheric physicists in Germany as the
                author of a textbook, "Thermodynamics of the Atmosphere" (1911),
                and of a number of interesting scientific papers.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    36
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                As important as Wegener's work on continental drift has turned
                out to be, it was largely a sideline to his interest in
                atmospheric physics, geophysics, and paleoclimatology*, and thus
                I have been at great pains to put Wegener's work on continental
                drift in the larger context of his other scientific work, and in
                the even larger context of atmospheric sciences in his lifetime.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    32
                  </span>
                )}
              </span>
              This is a 'continental drift book' only to the extent that Wegener
              was interested in that topic and later became famous for it.My
              treatment of his other scientific work is no less detailed, though
              I certainly have devoted more attention to the reception of his
              ideas on continental displacement, as they were much more
              controversial than his other work.
            </p>

            <p className="text-lg">
              Readers interested in the specific detail of Wegener's career will
              see that he often stopped pursuing a given line of investigation
              (sometimes for years on end), only to pick it up later.I have
              tried to provide guideposts to his rapidly shifting interests by
              characterizing different phases of his life as careers in
              different sciences, which is reflected in the titles of the
              chapters.Thus, the index should be a sufficient guide for those
              interested in a particular aspect of Wegener's life but perhaps
              not all of it.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                My own feeling, however, is that the parts do not make as much
                sense on their own as do all of his activities taken together.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    37
                  </span>
                )}
              </span>
              In this respect I urge readers to try to experience Wegener's life
              as he lived it, with all the interruptions, changes of mind, and
              renewed efforts this entailed.
            </p>

            <p className="text-lg">
              Wegener left behind a few published works but, as was standard
              practice, these reported the results of his work - not the journey
              he took to reach that point.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Only a few hundred of the many thousands of letters he wrote and
                received in his lifetime have survived and he didn't keep
                notebooks or diaries that recorded his life and activities.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    38
                  </span>
                )}
              </span>
              He was not active (with a few exceptions) in scientific societies,
              and did not seek to find influence or advance his ideas through
              professional contacts and politics, spending most of his time at
              home in his study reading and writing, or in the field collecting
              observations.
            </p>

            <p className="text-lg">
              Some famous scientists, such as Newton, Darwin, and Einstein, left
              mountains of written material behind, hundreds of notebooks and
              letters numbering in the tens of thousands.Others, like Michael
              Faraday, left extensive journals of their thoughts and
              speculations, parallel to their scientific notebooks.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The more such material a scientist leaves behind, the better
                chance a biographer has of forming an accurate picture of how a
                scientist's ideas took shape and evolved.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    39
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                I am firmly of the opinion that most of us, Wegener included,
                are not in any real sense the authors of our own lives.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    40
                  </span>
                )}
              </span>
              We plan, think, and act, often with apparent freedom, but most of
              the time our lives 'happen to us', and we only retrospectively
              turn this happenstance into a coherent narrative of fulfilled
              intentions.This book, therefore, is a story both of the life and
              scientific work that Alfred Wegener planned and intended and of
              the life and scientific work that actually 'happened to him'.These
              are, as I think you will soon see, not always the same thing.
            </p>

            <p className="text-lg font-bold mt-4">Glossary</p>
            <p className="text-lg italic">
              * Paleoclimatology: The study of past climates
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
            <h2 className="text-lg font-bold mb-3">Questions 27–30</h2>

            <p className="mb-4">
              Do the following statements agree with the claims of the writer in
              Reading Passage 3?
              <br />
              Choose <strong>YES</strong>, <strong>NO</strong> or{" "}
              <strong>NOT GIVEN</strong>.
            </p>

            {[
              "Wegener's ideas about continental drift were widely disputed while he was alive.",
              "The idea that the continents remained fixed in place was defended in a number of respected scientific publications.",
              "Wegener relied on a limited range of scientific fields to support his theory of continental drift.",
              "The similarities between Wegener's theory of continental drift and modern-day plate tectonics are enormous.",
            ].map((text, idx) => {
              const qNum = 27 + idx;
              return (
                <div key={qNum} className="space-y-2">
                  <p>
                    <span className="font-bold">{qNum}</span> {text}
                  </p>
                  <div className="flex flex-col">
                    {["YES", "NO", "NOT GIVEN"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${qNum}`}
                          value={opt}
                          checked={userAnswers[qNum] === opt}
                          onChange={() => handleInputChange(qNum, opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= Questions 31–36 ================= */}
          <div className="space-y-6 mt-10 text-lg">
            <h2 className="text-lg font-bold mb-3">Questions 31–36</h2>

            <p className="mb-4">
              Complete the summary using the list of words or phrases below.
              <br />
              Choose the correct letter, <strong>A–J</strong>.
            </p>

            <div className="border max-w-[300px] mx-auto p-4 mb-6">
              <ul className=" text-center">
                {[
                  "A. modest fame",
                  "B. vast range",
                  "C. record-breaking achievement",
                  "D. research methods",
                  "E. select group",
                  "F. professional interests",
                  "G. scientific debate",
                  "H. hazardous exploration",
                  "I. biographer's perspective",
                  "J. narrow investigation",
                ].map((opt) => (
                  <li key={opt}>{opt}</li>
                ))}
              </ul>
            </div>

            <div className="border space-y-1 p-4">
              <p>
                <h2 className="text-center font-bold text-xl">
                  {" "}
                  Wegener's life and work
                </h2>
                <br />
                One of the remarkable things about Wegener from a{" "}
                <strong>31</strong>{" "}
                <select
                  className="border rounded px-2 py-1 mx-1"
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                >
                  <option value=""></option>
                  {"ABCDEFGHIJ".split("").map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                is that although he proposed a theory of continental drift, he
                was not a geologist. His <strong>32</strong>{" "}
                <select
                  className="border rounded px-2 py-1 mx-1"
                  value={userAnswers[32] || ""}
                  onChange={(e) => handleInputChange(32, e.target.value)}
                >
                  <option value=""></option>
                  {"ABCDEFGHIJ".split("").map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                were limited to atmospheric physics. However, at the time he
                proposed his theory in 1912, he was already a person of{" "}
                <strong>33</strong>{" "}
                <select
                  className="border rounded px-2 py-1 mx-1"
                  value={userAnswers[33] || ""}
                  onChange={(e) => handleInputChange(33, e.target.value)}
                >
                  <option value=""></option>
                  {"ABCDEFGHIJ".split("").map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                . Six years previously, there had been his <strong>34</strong>{" "}
                <select
                  className="border rounded px-2 py-1 mx-1"
                  value={userAnswers[34] || ""}
                  onChange={(e) => handleInputChange(34, e.target.value)}
                >
                  <option value=""></option>
                  {"ABCDEFGHIJ".split("").map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                of 52 hours in a hot-air balloon, followed by his
                well-publicised but <strong>35</strong>{" "}
                <select
                  className="border rounded px-2 py-1 mx-1"
                  value={userAnswers[35] || ""}
                  onChange={(e) => handleInputChange(35, e.target.value)}
                >
                  <option value=""></option>
                  {"ABCDEFGHIJ".split("").map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                of Greenland's coast. With the publication of his textbook, he
                had also come to the attention of a <strong>36</strong>{" "}
                <select
                  className="border rounded px-2 py-1 mx-1"
                  value={userAnswers[36] || ""}
                  onChange={(e) => handleInputChange(36, e.target.value)}
                >
                  <option value=""></option>
                  {"ABCDEFGHIJ".split("").map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                of German scientists.
              </p>
            </div>
          </div>

          {/* ================= Questions 37–40 ================= */}
          <div className="space-y-6 mt-10 text-lg">
            <h2 className="text-lg font-bold mb-3">Questions 37–40</h2>

            {[
              {
                num: 37,
                text: "What is Mott T Greene doing in the fifth paragraph?",
                options: [
                  "A. describing what motivated him to write the book",
                  "B. explaining why it is desirable to read the whole book",
                  "C. suggesting why Wegener pursued so many different careers",
                  "D. indicating what aspects of Wegener's life interested him most",
                ],
              },
              {
                num: 38,
                text: "What is said about Wegener in the sixth paragraph?",
                options: [
                  "A. He was not a particularly ambitious person.",
                  "B. He kept a record of all his scientific observations.",
                  "C. He did not adopt many of the scientific practices of the time.",
                  "D. He enjoyed discussing new discoveries with other scientists.",
                ],
              },
              {
                num: 39,
                text: "What does Greene say about some other famous scientists?",
                options: [
                  "A. Their published works had a greater impact than Wegener's did.",
                  "B. They had fewer doubts about their scientific ideas than Wegener did.",
                  "C. Their scientific ideas were more controversial than Wegener's.",
                  "D. They are easier subjects to write about than Wegener.",
                ],
              },
              {
                num: 40,
                text: "What is Greene's main point in the final paragraph?",
                options: [
                  "A. It is not enough in life to have good intentions.",
                  "B. People need to plan carefully if they want to succeed.",
                  "C. People have little control over many aspects of their lives.",
                  "D. It is important that people ensure they have the freedom to act.",
                ],
              },
            ].map(({ num, text, options }) => (
              <div key={num} className="space-y-2">
                <p>
                  <span className="font-bold">{num}</span> {text}
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
                      <span>{opt}</span>
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
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/{Object.keys(correctAnswers).length}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers
                  </h3>
                  <ul className="space-y-3">
                    {Object.keys(correctAnswers).map((num) => {
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
                            {isCorrect ? (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
                            ) : (
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
                              userAnswer
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
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
      <Reading4Pagination2023></Reading4Pagination2023>
    </div>
  );
};

export default Reading4Part32023;
