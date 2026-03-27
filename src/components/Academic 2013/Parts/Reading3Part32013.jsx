import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2013 from "../Pagination 2013/Reading3Pagination2013";

const Reading3Part32013 = () => {
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
      const correctAnswer = correctAnswers[key];
      const userAnswer = answers[key];

      if (Array.isArray(correctAnswer)) {
        // For multi-input: check both parts
        const user1 = answers[`${key}-1`] || "";
        const user2 = answers[`${key}-2`] || "";
        if (
          user1.trim().toLowerCase() === correctAnswer[0].toLowerCase() &&
          user2.trim().toLowerCase() === correctAnswer[1].toLowerCase()
        ) {
          newScore += 1;
        }
      } else {
        // Single input
        if (
          userAnswer &&
          userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()
        ) {
          newScore += 1;
        }
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
    33: ["Jupiter", "Saturn"],
    34: "Solar System",
    35: ["sensors", "circuits"],
    36: "spares",
    37: "radio dish",
    38: "TRUE",
    39: "TRUE",
    40: "TRUE",
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
              {renderText("Information theory – the big idea")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Information theory lies at the heart of everything - from DVD players and the genetic code of DNA to the physics of the universe at its most fundamental. It has been central to the development of the science of communication, which enables data to be sent electronically and has therefore had a major impact on our lives.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("A")}</span>
              <br />
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In April 2002 an event took place which demonstrated one of the many applications of information theory",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The space probe Voyager I, launched in 1977, had sent back spectacular images of Jupiter and Saturn and then soared out of the Solar System on a one-way mission to the stars.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    <span>{renderText("33")}</span>,
                    <span>{renderText("34")}</span>
                  </span>
                )}
              </span>

              {renderText(
                ". After 25 years of exposure to the freezing temperatures of deep space, the probe was beginning to show its age.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Sensors and circuits were on the brink of failing and NASA experts realized that they had to do something or lose contact with their probe forever.",
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
                  " The solution was to get a message to Voyager I to instruct it to use spares to change the failing parts",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " By means of a radio dish belonging to NASA's Deep Space Network, the message was sent out into the depths of space.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>
              {renderText(
                " With the probe 12 billion kilometers from Earth, this was not an easy task. Yet, incredibly, the little probe managed to hear the faint call from its home planet and successfully made the switchover.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("B")}</span>
              <br />
              {renderText(
                "It was the longest-distance repair job in history, and a triumph for the NASA engineers. But it also highlighted the astonishing power of the techniques developed by American communications engineer Claude Shannon, who had died just a year earlier. Born in 1916 in Petoskey, Michigan, Shannon showed an early talent for maths and for building gadgets, and made breakthroughs in the foundations of computer technology when still a student.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "While at Bell Laboratories, Shannon developed information theory, but shunned the resulting acclaim.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
              {renderText(
                ". In the 1940s, he single-handedly created an entire science of communication which has since inveigled its way into a host of applications, from DVDs to satellite communications to bar codes - any area, in short, where data has to be conveyed rapidly yet accurately",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("C")}</span>
              <br />
              {renderText(
                "This all seems light years away from the down-to-earth uses Shannon originally had for his work, which began when he was a 22-year-old graduate engineering student at the prestigious Massachusetts Institute of Technology in 1939. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "He set out with an apparently simple aim: to pin down the precise meaning of the concept of 'information.'",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The most basic form of information, Shannon argued, is whether something is true or false - which can be captured in the binary unit, or 'bit', of the form 1 or 0.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
              {renderText("21")}
              {renderText(
                "Having identified this fundamental unit, Shannon set about defining otherwise vague ideas about information and how to transmit it from place to place. In the process he discovered something surprising: it is always possible to guarantee information will get through random interference - 'noise' - intact.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("D")}</span>
              <br />
              {renderText(
                "Noise usually means unwanted sounds which interfere with genuine information. Information theory generalises this idea via theorems that capture the effects of noise with mathematical precision..",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " In particular, Shannon showed that noise sets a limit on the rate at which information can pass along communication channels while remaining error-free. This rate depends on the relative strengths of the signal and noise travelling down the communication channel, and on its capacity (its 'bandwidth')",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27,39")}
                  </span>
                )}
              </span>
              {renderText(
                " The resulting limit, given in units of bits per second, is the absolute maximum rate of error-free communication given signal strength and noise level. The trick, Shannon showed, is to find ways of packaging up - 'coding' - information to cope with the ravages of noise, while staying within the information-carrying capacity - 'bandwidth' - of the communication system being used.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("E")}</span>
              <br />
              {renderText(
                "Over the years scientists have devised many such coding methods, and they have proved crucial in many technological feats. The Voyager spacecraft transmitted data using codes which added one extra bit for every single bit of information; the result was an error rate of just one bit in 10,000 - and stunningly clear pictures of the planets.. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Other codes have become part of everyday life - such as the Universal Product Code, or bar code, which uses a simple error-detecting system that ensures supermarket check-out lasers can read the price even on, say, a crumpled bag of crisps",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "As recently as 1993, engineers made a major breakthrough by discovering so-called turbo codes - which come very close to Shannon's ultimate limit for the maximum rate that data can be transmitted reliably, and now play a key role in the mobile videophone revolution.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("F")}</span>
              <br />
              {renderText(
                "Shannon also laid the foundations of more efficient ways of storing information, by stripping out superfluous ('redundant') bits from data which contributed little real information. As mobile phone text messages like 'I CN C U' show, it is often possible to leave out a lot of data without losing much meaning. As with error correction, however, there's a limit beyond which messages become too ambiguous. Shannon showed how to calculate this limit, opening the way to the design of compression methods that cram maximum information into the minimum space.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("28")}
                </span>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 27–32 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–32")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Reading Passage 3 has six paragraphs, A-F. Which paragraph contains the following information? Choose the correct letter, A-F, in boxes 27-32 on your answer sheet.",
            )}
          </p>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              {
                q: 27,
                text: "An explanation of the factors affecting the transmission of information",
              },
              {
                q: 28,
                text: "An example of how unnecessary information can be omitted",
              },
              { q: 29, text: "A reference to Shannon's attitude to fame" },
              {
                q: 30,
                text: "Details of a machine capable of interpreting incomplete information",
              },
              {
                q: 31,
                text: "A detailed account of an incident involving information theory",
              },
              {
                q: 32,
                text: "A reference to what Shannon initially intended to achieve in his research",
              },
            ].map(({ q, text }) => (
              <div
                key={q}
                className="space-y-2 text-lg flex items-center gap-2 "
              >
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 "
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* ================= Questions 33–37 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 33–37")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 33–37 on your answer sheet.",
            )}
          </p>

          <div className="space-y-5 p-4 rounded-lg border ">
            {[
              {
                num: 33,
                text: "The probe transmitted pictures of both",
                inputs: 2, // two fields
                afterText: ", then left the",
                nextNum: 34, // for the last blank
              },
              {
                num: 34,
                text: "The freezing temperatures were found to have a negative effect on parts of the space probe.",
                inputs: 1,
              },
              {
                num: 35,
                text: "Scientists feared that both",
                inputs: 2,
                afterText: "were about to stop working.",
              },
              {
                num: 36,
                text: "The only hope was to tell the probe to replace them with",
                inputs: 1,
                afterText:
                  "- but distance made communication with the probe difficult.",
              },
              {
                num: 37,
                text: "A",
                inputs: 1,
                afterText:
                  "was used to transmit the message at the speed of light.",
              },
            ].map(({ num, text, inputs, afterText, nextNum }) => (
              <div key={num} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{num}.</span> {renderText(text)}
                </p>

                {inputs === 1 ? (
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-2 mt-1"
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                  />
                ) : (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="First"
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-2 "
                      value={userAnswers[`${num}-1`] || ""}
                      onChange={(e) =>
                        handleInputChange(`${num}-1`, e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Second"
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-2"
                      value={userAnswers[`${num}-2`] || ""}
                      onChange={(e) =>
                        handleInputChange(`${num}-2`, e.target.value)
                      }
                    />
                  </div>
                )}

                {afterText && (
                  <p>
                    {renderText(afterText)}{" "}
                    {nextNum && (
                      <input
                        type="text"
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-2 mt-1"
                        value={userAnswers[nextNum] || ""}
                        onChange={(e) =>
                          handleInputChange(nextNum, e.target.value)
                        }
                      />
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ================= Questions 38–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 38–40")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 3? In boxes 38-40 on your answer sheet, choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.",
            )}
          </p>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              {
                q: 38,
                text: "The concept of describing something as true or false was the starting point for Shannon in his attempts to send messages over distances.",
              },
              {
                q: 39,
                text: "The amount of information that can be sent in a given time period is determined with reference to the signal strength and noise level.",
              },
              {
                q: 40,
                text: "Products have now been developed which can convey more information than Shannon had anticipated as possible.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold">{q}.</span> {renderText(text)}
                </p>
                <div className="flex flex-col pl-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() => handleInputChange(q, opt)}
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Submit & Result ================= */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    setShowResult(true);
                    calculateScore(userAnswers);
                  }}
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
                      let userAnswerDisplay;
                      let correctAnswerDisplay;

                      // Handle multi-input questions
                      if (Array.isArray(correctAnswers[num])) {
                        userAnswerDisplay =
                          `${userAnswers[`${num}-1`] || ""} ${userAnswers[`${num}-2`] || ""}`.trim();
                        correctAnswerDisplay = correctAnswers[num].join(" ");
                      } else {
                        userAnswerDisplay = (userAnswers[num] || "").trim();
                        correctAnswerDisplay = correctAnswers[num] || "";
                      }

                      const isCorrect =
                        userAnswerDisplay.toLowerCase() ===
                        correctAnswerDisplay.toLowerCase();
                      const isWrong = userAnswerDisplay && !isCorrect;
                      const noAnswer = !userAnswerDisplay;

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
                              <span>{userAnswerDisplay}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswerDisplay}</span>
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
      <Reading3Pagination2013></Reading3Pagination2013>
    </div>
  );
};

export default Reading3Part32013;
