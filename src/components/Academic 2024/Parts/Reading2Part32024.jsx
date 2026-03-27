import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2024 from "../Pagination 2024/Reading2Pagination2024";

const Reading2Part32024 = () => {
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
    // Questions 27–32 (summary completion using A–K)
    27: "H", // unique
    28: "C", // intrigued
    29: "G", // involved
    30: "B", // determined
    31: "J", // satisfaction
    32: "I", // innovative

    // Questions 33–37 (YES / NO / NOT GIVEN)
    33: "YES", // Many Nobel/Fields Medal winners were unexceptional in childhood
    34: "NO", // Einstein's failures were not due to lack of confidence
    35: "YES", // Difficult to say if giftedness is innate
    36: "NOT GIVEN", // No mention of Einstein being upset by public view
    37: "NO", // Einstein credited persistence, not speed

    // Questions 38–40 (multiple choice A–D)
    38: "C", // development of a spirit of inquiry
    39: "B", // innate talent not key, deliberate practice matters
    40: "B", // loving support of more than one parent
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

          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("An inquiry into the existence of the gifted child")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Let us start by looking at a modern 'genius', Maryam Mirzakhani, who died at the early age of 40. She was the only woman to win the Fields Medal - the mathematical equivalent of a Nobel prize.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "It would be easy to assume that someone as special as Mirzakhani must have been one of those 'gifted' children, those who have an extraordinary ability in a specific sphere of activity or knowledge.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But look closer and a different story emerges. Mirzakhani was born in Tehran, Iran. She went to a highly selective girls' school but maths wasn't her interest - reading was.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "She loved novels and would read anything she could lay her hands on. As for maths, she did rather poorly at it for the first couple of years in her middle school, but became interested when her elder brother told her about what he'd learned.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He shared a famous maths problem from a magazine that fascinated her - and she was hooked.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "In adult life it is clear that she was curious, excited by what she did and also resolute in the face of setbacks.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "One of her comments sums it up: 'Of course, the most rewarding part is the 'Aha' moment, the excitement of discovery and enjoyment of understanding something new...'",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "But most of the time, doing mathematics for me is like being on a long hike with no trail and no end in sight. That trail took her to the heights of original research into mathematics.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("32")}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Is her background unusual? Apparently not. Most Nobel prize winners were unexceptional in childhood.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Einstein was slow to talk as a baby. He failed the general part of the entry test to Zurich Polytechnic - though they let him in because of high physics and maths scores. He struggled at work initially, but he kept plugging away and eventually rewrote the laws of Newtonian mechanics with his theory of relativity.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "There has been a considerable amount of research on high performance over the last century that suggests it goes way beyond tested intelligence.",
              )}
              {renderText(
                " On top of that, research is clear that brains are flexible, new neural pathways can be created, and IQ isn't fixed.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "For example, just because you can read stories with hundreds of pages at the age of five doesn't mean you will still be ahead of your contemporaries in your teens.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "According to my colleague Prof Deborah Eyre, with whom I've collaborated on the book Great Minds and How to Grow Them, the latest neuroscience and psychological research suggests most individuals can reach levels of performance associated in school with the gifted and talented.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "However, they must be taught the right attitudes and approaches to their learning and develop the attributes of high performers - curiosity, persistence and hard work, for example - an approach Eyre calls 'high performance learning'.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "Prof Anders Ericsson, an eminent education psychologist at Florida State University, US, is the co-author of Peak: Secrets from the New Science of Expertise. After research going back to 1980 into diverse achievements, from music to memory to sport, he doesn't think unique and innate talents are at the heart of performance.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Deliberate practice, that stretches you every step of the way, and around 10,000 hours of it, is what produces the goods. It's not a magic number - the highest performers move on to doing a whole lot more, of course. Ericsson's memory research is particularly interesting because random students, trained in memory techniques for the study, went on to outperform others thought to have innately superior memories - those who you might call gifted.",
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
                "But it is perhaps the work of Benjamin Bloom, another distinguished American educationist working in the 1980s, that gives the most pause for thought. Bloom's team looked at a group of extraordinarily high achieving people in disciplines as varied as ballet, swimming, piano, tennis, maths, sculpture and neurology.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He found a pattern of parents encouraging and supporting their children, often in areas they enjoyed themselves. Bloom's outstanding people had worked very hard and consistently at something they had become hooked on when at a young age, and their parents all emerged as having strong work ethics themselves.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            {/* Section J */}
            <p className="text-lg">
              {renderText(
                "Eyre says we know how high performers learn. From that she has developed a high performing learning approach. She is working on this with a group of schools, both in Britain and abroad. Some spin-off research, which looked in detail at 24 of the 3,000 children being studied who were succeeding despite difficult circumstances, found something remarkable.",
              )}
              {renderText(
                " Half were getting free school meals because of poverty, more than half were living with a single parent, and four in five were living in disadvantaged areas. Interviews uncovered strong evidence of an adult or adults in the child's life who valued and supported education, either in the immediate or extended family or in the child's wider community. Children talked about the need to work hard at school, to listen in class and keep trying.",
              )}
            </p>

            {/* Section K */}
            <p className="text-lg">
              {renderText(
                "Let us end with Einstein, the epitome of a genius. He clearly had curiosity, character and determination. He struggled against rejection in early life but was undeterred. Did he think he was a genius or even gifted?",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He once wrote: 'It's not that I'm so smart, it's just that I stay with problems longer. Most people say it is the intellect which makes a great scientist. They are wrong: it is character.'",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
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
              "Complete the summary using the list of words or phrases below. Choose the correct letter, ",
            )}
            <strong>{renderText("A–K")}</strong>.
          </p>

          <div className="border p-4 rounded mb-6 max-w-[300px] mx-auto text-lg">
            {[
              "A. appeal",
              "B. determined",
              "C. intrigued",
              "D. single",
              "E. achievement",
              "F. devoted",
              "G. involved",
              "H. unique",
              "I. innovative",
              "J. satisfaction",
              "K. intent",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4 border p-4">
            {[
              {
                q: 27,
                before: "Maryam Mirzakhani is regarded as",
                after:
                  "in the field of mathematics because she was the only female holder of the prestigious Fields Medal - a record that she retained at the time of her death.",
              },
              {
                q: 28,
                before: "However, maths held little",
                after:
                  "for her as a child and in fact her performance was below-average until she was",
              },
              {
                q: 29,
                before:
                  "by a difficult puzzle that one of her siblings showed her.",
                after: "",
              },
              {
                q: 30,
                before:
                  "Later, as a professional mathematician, she had an inquiring mind and proved herself to be",
                after: "when things did not go smoothly.",
              },
              {
                q: 31,
                before: "She said she got the greatest",
                after: "from making ground-breaking discoveries",
              },
              {
                q: 32,
                before: "and in fact she was responsible for some extremely",
                after: "mathematical studies.",
              },
            ].map(({ q, before, after }) => (
              <p key={q} className="text-lg">
                {renderText(before)}{" "}
                <button
                  onClick={() => toggleButton(q)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[q]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  {q}
                </button>
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-20"
                  value={userAnswers[q] || ""}
                  onChange={(e) =>
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: e.target.value };
                      calculateScore(updated); // calculate score immediately
                      return updated;
                    })
                  }
                >
                  <option value=""></option>
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].map(
                    (letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ),
                  )}
                </select>{" "}
                {after && renderText(after)}
              </p>
            ))}
          </div>

          {/* ================= Questions 33–37 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 33–37")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer? Choose ",
            )}
            <strong>{renderText("YES")}</strong>,{" "}
            <strong>{renderText("NO")}</strong> {renderText("or ")}
            <strong>{renderText("NOT GIVEN")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 33,
                text: "Many people who ended up winning prestigious intellectual prizes only reached an average standard when young.",
              },
              {
                num: 34,
                text: "Einstein's failures as a young man were due to his lack of confidence.",
              },
              {
                num: 35,
                text: "It is difficult to reach agreement on whether some children are actually born gifted.",
              },
              {
                num: 36,
                text: "Einstein was upset by the public's view of his life's work.",
              },
              {
                num: 37,
                text: "Einstein put his success down to the speed at which he dealt with scientific questions.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
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
              </li>
            ))}
          </ul>

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
                text: "What does Eyre believe is needed for children to equal 'gifted' standards?",
                options: [
                  "strict discipline from the teaching staff",
                  "assistance from their peers in the classroom",
                  "the development of a spirit of inquiry towards their studies",
                  "the determination to surpass everyone else's achievements",
                ],
              },
              {
                num: 39,
                text: "What is the result of Ericsson's research?",
                options: [
                  "Very gifted students do not need to work on improving memory skills.",
                  "Being born with a special gift is not the key factor in becoming expert.",
                  "Including time for physical exercise is crucial in raising performance.",
                  "10,000 hours of relevant and demanding work will create a genius.",
                ],
              },
              {
                num: 40,
                text: "In the penultimate paragraph, it is stated the key to some deprived children's success is",
                options: [
                  "a regular and nourishing diet at home.",
                  "the loving support of more than one parent.",
                  "a community which has well-funded facilities for learning.",
                  "",
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
      <Reading2Pagination2024></Reading2Pagination2024>
    </div>
  );
};

export default Reading2Part32024;
