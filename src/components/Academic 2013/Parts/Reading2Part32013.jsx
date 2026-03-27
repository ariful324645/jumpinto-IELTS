import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2013 from "../Pagination 2013/Reading2Pagination2013";

const Reading2Part32013 = () => {
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
                : [p],
            )
          : [part],
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    27: "B",
    28: "B",
    29: "D",
    30: "C",
    31: "B",
    32: "YES",
    33: "YES",
    34: "YES",
    35: "NO",
    36: "NO",
    37: "NO",
    38: "A",
    39: "B",
    40: "C",
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

          <div className="">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("A neuroscientist reveals how to think differently")}
            </h1>

            <p className="text-lg ">
              {renderText(
                "In the last decade a revolution has occurred in the way that scientists think about the brain. We now know that the decisions humans make can be traced to the firing patterns of neurons in specific parts of the brain.",
              )}
            </p>

            {/* Intro */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "These discoveries have led to the field known as neuroeconomics, which studies the brain's secrets to success in an economic environment that demands innovation and being able to do things differently from competitors.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                "A brain that can do this is an iconoclastic one. Briefly, an iconoclast is a person who does something that others say can't be done.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("A")}</span>
              <br />

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "This definition implies that iconoclasts are different from other people, but more precisely, it is the brains that are different in three distinct ways: perception, fear response, and social intelligence.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
              {renderText(
                "Each of these three functions utilizes a different circuit in the brain.",
              )}

              {renderText(
                "Naysayers might suggest that the brain is irrelevant, that thinking in an original, even revolutionary, way is more a matter of personality than brain function.",
              )}

              {renderText(
                "But the field of neuroeconomics was born out of the realization that the physical workings of the brain place limitations on the way we make decisions.",
              )}

              {renderText(
                "By understanding these constraints, we begin to understand why some people march to a different drumbeat.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("B")}</span>
              <br />

              {renderText(
                "The first thing to realize is that the brain suffers from limited resources. It has a fixed energy budget, about the same as a 40 watt light bulb, so it has evolved to work as efficiently as possible.",
              )}

              {renderText(
                "This is where most people are impeded from being an iconoclast. For example, when confronted with information streaming from the eyes, the brain will interpret this information in the quickest way possible.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Thus it will draw on both past experience and any other source of information, such as what other people say, to make sense of what it is seeing.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>

              {renderText(
                "This happens all the time. The brain takes shortcuts that work so well we are hardly ever aware of them. We think our perceptions of the world are real, but they are only biological and electrical rumblings.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Perception is not simply a product of what your eyes or ears transmit to your brain. More than the physical reality of photons or sound waves, perception is a product of the brain.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("C")}</span>
              <br />

              {renderText(
                "Perception is central to iconoclasm. Iconoclasts see things differently to other people. Their brains do not fall into efficiency pitfalls as much as the average person's brain.",
              )}

              {renderText(
                "Iconoclasts, either because they were born that way or through learning, have found ways to work around the perceptual shortcuts that plague most people.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Perception is not something that is hardwired into the brain. It is a learned process, which is both a curse and an opportunity for change.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>

              {renderText(
                "The brain faces the fundamental problem of interpreting physical stimuli from the senses. Everything the brain sees, hears, or touches has multiple interpretations.",
              )}

              {renderText(
                "The one that is ultimately chosen is simply the brain's best theory. In technical terms, these conjectures have their basis in the statistical likelihood of one interpretation over another and are heavily influenced by past experience and, importantly for potential iconoclasts, what other people say.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("D")}</span>
              <br />

              {renderText(
                "The best way to see things differently to other people is to bombard the brain with things it has never encountered before.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Novelty releases the perceptual process from the chains of past experience and forces the brain to make new judgments.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>

              {renderText(
                "Successful iconoclasts have an extraordinary willingness to be exposed to what is fresh and different.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Observation of iconoclasts shows that they embrace novelty while most people avoid things that are different.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("E")}</span>
              <br />

              {renderText(
                "The problem with novelty, however, is that it tends to trigger the brain's fear system. Fear is a major impediment to thinking like an iconoclast and stops the average person in his tracks.",
              )}

              {renderText(
                "There are many types of fear, but the two that inhibit iconoclastic thinking and people generally find difficult to deal with are fear of uncertainty and fear of public ridicule.",
              )}

              {renderText(
                "These may seem like trivial phobias. But fear of public speaking, which everyone must do from time to time, afflicts one-third of the population. This makes it too common to be considered a mental disorder.",
              )}

              {renderText(
                "It is simply a common variant of human nature, one which iconoclasts do not let inhibit their reactions.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("F")}</span>
              <br />

              {renderText(
                "Finally, to be successful iconoclasts, individuals must sell their ideas to other people. This is where social intelligence comes in.",
              )}

              {renderText(
                "Social intelligence is the ability to understand and manage people in a business setting.",
              )}

              {renderText(
                "In the last decade there has been an explosion of knowledge about the social brain and how the brain works when groups coordinate decision making.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Neuroscience has revealed which brain circuits are responsible for functions like understanding what other people think, empathy, fairness, and social identity.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>

              {renderText(
                "These brain regions play key roles in whether people convince others of their ideas. Perception is important in social cognition too.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The perception of someone's enthusiasm, or reputation, can make or break a deal.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>

              {renderText(
                "Understanding how perception becomes intertwined with social decision making shows why successful iconoclasts are so rare.",
              )}
            </p>

            {/* Section G */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("G")}</span>
              <br />

              {renderText(
                "Iconoclasts create new opportunities in every area from artistic expression to technology to business. They supply creativity and innovation not easily accomplished by committees.",
              )}

              {renderText(
                "Rules aren't important to them. Iconoclasts face alienation and failure, but can also be a major asset to any organization.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It is crucial for success in any field to understand how the iconoclastic mind works.",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ================= Questions 27–31 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–31")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A, B, C or D")}</strong>
            {renderText(" for each question.")}
          </p>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              {
                q: 27,
                text: "Neuroeconomics is a field of study which seeks to",
                options: [
                  "A. cause a change in how scientists understand brain chemistry.",
                  "B. understand how good decisions are made in the brain.",
                  "C. understand how the brain is linked to achievement in competitive fields.",
                  "D. trace the specific firing patterns of neurons in different areas of the brain.",
                ],
              },
              {
                q: 28,
                text: "According to the writer, iconoclasts are distinctive because",
                options: [
                  "A. they create unusual brain circuits.",
                  "B. their brains function differently.",
                  "C. their personalities are distinctive.",
                  "D. they make decisions easily.",
                ],
              },
              {
                q: 29,
                text: "According to the writer, the brain works efficiently because",
                options: [
                  "A. it uses the eyes quickly.",
                  "B. it interprets data logically.",
                  "C. it generates its own energy.",
                  "D. it relies on previous events.",
                ],
              },
              {
                q: 30,
                text: "The writer says that perception is",
                options: [
                  "A. a combination of photons and sound waves.",
                  "B. a reliable product of what your senses transmit.",
                  "C. a result of brain processes.",
                  "D. a process we are usually conscious of.",
                ],
              },
              {
                q: 31,
                text: "According to the writer, an iconoclastic thinker",
                options: [
                  "A. centralises perceptual thinking in one part of the brain.",
                  "B. avoids cognitive traps.",
                  "C. has a brain that is hardwired for learning.",
                  "D. has more opportunities than the average person.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>

                <div className="flex flex-col pl-4">
                  {options.map((opt) => {
                    const value = opt[0]; // A, B, C, D
                    return (
                      <label
                        key={value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${q}`}
                          value={value}
                          checked={userAnswers[q] === value}
                          onChange={() => handleInputChange(q, value)}
                        />
                        <span>{renderText(opt)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 32–37 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 32–37")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 3?",
            )}
          </p>

          <p className="mb-4">
            {renderText("In boxes 32–37 on your answer sheet, choose ")}
            <strong>{renderText("YES")}</strong>,{" "}
            <strong>{renderText("NO")}</strong> {renderText("or ")}
            <strong>{renderText("NOT GIVEN")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 32,
                text: "Exposure to different events forces the brain to think differently.",
              },
              {
                num: 33,
                text: "Iconoclasts are unusually receptive to new experiences.",
              },
              {
                num: 34,
                text: "Most people are too shy to try different things.",
              },
              {
                num: 35,
                text: "If you think in an iconoclastic way, you can easily overcome fear.",
              },
              {
                num: 36,
                text: "When concern about embarrassment matters less, other fears become irrelevant.",
              },
              {
                num: 37,
                text: "Fear of public speaking is a psychological illness.",
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

          <div className="mb-4">
            {" "}
            <h2 className="mt-4 font-bold">{renderText("Questions 38-40")}</h2>
            <p>
              {renderText(
                "Choose the correct letter, A-E, next to Questions 38-40",
              )}
            </p>
            <p>
              {renderText(
                "Complete each sentence with the correct ending, A-E, below.",
              )}
            </p>
          </div>
          <div className="border p-4 rounded mb-6 max-w-[300px] mx-auto text-lg">
            <h3 className="font-bold mb-2">{renderText("Answer Options")}</h3>
            {[
              "A. requires both perceptual and social intelligence skills.",
              "B. focuses on how groups decide on an action.",
              "C. works in many fields, both artistic and scientific.",
              "D. leaves one open to criticism and rejection.",
              "E. involves understanding how organisations manage people.",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          {/* ================= Questions 38–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 38–40")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete each sentence with the correct ending, A-E, below.",
            )}
          </p>

          <p className="mb-4">
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A-E")}</strong>{" "}
            {renderText("next to Questions 38–40.")}
          </p>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              {
                q: 38,
                text: "Thinking like a successful iconoclast is demanding because it",
              },
              {
                q: 39,
                text: "The concept of the social brain is useful to iconoclasts because it",
              },
              {
                q: 40,
                text: "Iconoclasts are generally an asset because their way of thinking",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>

                <select
                  className="border-2 border-gray-300 rounded-md px-3 py-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14–26)
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
                              <span>{userAnswers[num]}</span>
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
      <Reading2Pagination2013></Reading2Pagination2013>
    </div>
  );
};

export default Reading2Part32013;
