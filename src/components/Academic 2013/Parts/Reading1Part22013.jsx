import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2013 from "../Pagination 2013/Reading1Pagination2013";

const Reading1Part22013 = () => {
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
    // Questions 14–17 (Matching Headings)
    14: "vii", // Likelihood of life on other planets
    15: "iii", // Vast distances to Earth's closest neighbours
    16: "i", // Seeking the transmission of radio signals from planets
    17: "ii", // Appropriate responses to signals from other civilisations

    // Questions 18–20 (Short Answer)
    18: "five billion years", // life expectancy of Earth
    19: "radio signals", // signals SETI scientists are searching for
    20: "one million", // number of stars being searched

    // Questions 21–26 (YES / NO / NOT GIVEN)
    21: "YES", // Alien civilisations may help overcome serious problems
    22: "NO", // not necessarily human-like life form
    23: "NOT GIVEN", // no clear statement about joint projects
    24: "NO", // no confirmed signals picked up so far
    25: "YES", // NASA project criticized by Congress
    26: "NO", // writer suggests not responding quickly
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
            <h1 className="text-2xl font-bold text-center">
              {renderText("IS THERE ANYBODY OUT THERE?")}
            </h1>

            <p className="text-lg my-5 text-center font-semibold">
              {renderText("The Search for Extra-terrestrial Intelligence")}
            </p>

            {/* Intro */}
            <p className="text-lg">
              {renderText(
                "The question of whether we are alone in the Universe has haunted humanity for centuries, but we may now stand poised on the brink of the answer to that question, as we search for radio signals from other intelligent civilisations.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This search, often known by the acronym SETI (search for extra-terrestrial intelligence), is a difficult one.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>

              {renderText(
                "Although groups around the world have been searching intermittently for three decades, it is only now that we have reached the level of technology where we can make a determined attempt to search all nearby stars for any sign of life.",
              )}
            </p>

            {/* Section A */}
            <p className="text-lg">
              <span>
                {renderText(
                  "The primary reason for the search is basic curiosity - the same curiosity about the natural world that drives all pure science.",
                )}
              </span>

              {renderText(
                "We want to know whether we are alone in the Universe. We want to know whether life evolves naturally if given the right conditions, or whether there is something very special about the Earth to have fostered the variety of life forms that we see around us on the planet.",
              )}

              {renderText(
                "The simple detection of a radio signal will be sufficient to answer this most basic of all the questions.",
              )}

              {renderText(
                "In this sense, SETI is another cog in the machinery of pure science which is continually pushing out the horizon of our knowledge.",
              )}

              {renderText(
                "However, there are other reasons for being interested in whether life exists elsewhere.",
              )}

              {renderText(
                "For example, we have had civilization on Earth for perhaps only a few thousand years, and the threats of the nuclear war and pollution over the last few decades have told us that our survival may be tenuous.",
              )}

              {renderText(
                "Will we last another two thousand years or will we wipe ourselves out?",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Since the lifetime of a planet like ours is several billion years, we can expect that, if other civilizations do survive in our galaxy, their ages will range from zero to several billion years.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              {renderText(
                "Thus any mere existence of such a civilization will tell us that long-term survival is possible, and gives us some cause for optimism.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It is even possible that the older civilization may pass on the benefits of their experience in dealing with threats to survival such as nuclear war and global pollution, and other threats that we haven't yet discovered.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In discussing whether we are alone, most SETI scientists adopt two ground rules.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                "First, UFOs (Unidentified Flying Objects) are generally ignored since most scientists don't consider the evidence for them to be strong enough to bear serious consideration although it is also important to keep an open mind in case any really convincing evidence emerges in the future.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Second, we make a very conservative assumption that we are looking for a life form that is pretty well like us, since if it differs radically from us we may well not recognize it as a life form, quite apart from whether we are able to communicate with it.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>

              {renderText(
                "In other words, the life form we are looking for may well have two green heads and seven fingers, but it will nevertheless resemble us in that it should communicate with its fellows, be interested in the Universe, live on a planet orbiting a star like our Sun, and perhaps most restrictively, have a chemistry, like us, based on carbon and water.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Even when we make these assumptions, our understanding of other life forms is still severely limited.",
              )}

              {renderText(
                "We do not even know, for example, how many stars have planets, and we certainly do not know how likely it is that life will arise naturally, given the right conditions.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "However, when we look at the 100 billion stars in our galaxy (the Milky Way), and 100 billion galaxies in the observable Universe, it seems inconceivable that at least one of these planets does not have a life form on it:",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              {renderText(
                "in fact, the best educated guess we can make, using the little we do know about the conditions for carbon-based life, leads us to estimate that perhaps one in 100,000 stars might have a life-bearing planet orbiting it.",
              )}
              {renderText(
                "That means that our nearest neighbours are perhaps 100 light years away, which is almost next door in astronomical terms.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "An alien civilization could choose many different ways of sending information across the galaxy, but many of these either require too much energy, or else are severely attenuated while traversing the vast distances across the galaxy.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It turns out that, for a given amount of transmitted power, radio waves in the frequency range 1000 to 3000 MHz travel the greatest distance, and so all searches to date have concentrated on looking for radio waves in this frequency range.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>

              {renderText(
                "So far there have been a number of searches by various groups around the world, including Australian searches using the radio telescope at Parkes, New South Wales.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Until now there have not been any detections from the few hundred stars which have been searched.",
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>

              {renderText(
                "The scale of the searches has been increased dramatically since 1992, when the US Congress voted NASA $10 million per year for ten years to conduct a thorough search for extra-terrestrial life.",
              )}

              {renderText(
                "Much of the money in this project is being spent on the developing the special hardware needed to search many frequencies at once.",
              )}

              {renderText("The project has two parts.")}

              {renderText(
                "One part is a targeted search using the world's largest radio telescopes, the American-operated telescope in Arecibo, Puerto Rico and the French telescope in Nancy in France.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This part of the project is searching the nearest 1000 likely stars with high sensitivity for signals in the frequency range 1000 to 3000 MHz.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>

              {renderText(
                "The other part of the project is an undirected search which is monitoring all of space with a lower sensitivity, using the smaller antennas of NASA's Deep Space Network.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "There is considerable debate over how we should react if we detect a signal from an alien civilization.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Everybody agrees that we should not reply immediately.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>

              {renderText(
                "Quite apart from the impracticality of sending a reply over such large distances at short notice, it raises a host of ethical questions that would have to be addressed by the global community before any reply could be sent.",
              )}

              {renderText(
                "Would the human race face the culture shock if faced with a superior and much older civilization?",
              )}

              {renderText("Luckily, there is no urgency about this.")}

              {renderText(
                "The stars being searched are hundreds of light years away, so it takes hundreds of years for their signal to reach us, and a further few hundreds for our reply to reach them.",
              )}

              {renderText(
                "It's not important, then, if there's a delay of a few years, or decades, while the human race debates the question of whether to reply, and perhaps carefully drafts a reply.",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ================= Questions 14–17 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–17")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Reading Passage 2 has five paragraphs, A-E. Choose the correct heading for each paragraph from the list of headings below.",
            )}
          </p>

          <p className="mb-4">
            {renderText("Choose the correct number, ")}
            <strong>{renderText("i–vii")}</strong>{" "}
            {renderText("in boxes 14–17 on your answer sheet.")}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[500px] mx-auto text-lg">
            <h3 className="font-bold mb-2">{renderText("List of Headings")}</h3>
            {[
              "i. Seeking the transmission of radio signals from planets",
              "ii. Appropriate responses to signals from other civilisations",
              "iii. Vast distances to Earth's closest neighbours",
              "iv. Assumptions underlying the search for extra-terrestrial intelligence",
              "v. Reasons for the search for extra-terrestrial intelligence",
              "vi. Knowledge of extra-terrestrial life forms",
              "vii. Likelihood of life on other planets",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-5 p-4 rounded-lg">
            {[
              { q: 14, text: "Paragraph B" },
              { q: 15, text: "Paragraph C" },
              { q: 16, text: "Paragraph D" },
              { q: 17, text: "Paragraph E" },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center gap-2 text-lg">
                <p>{q}</p>
                <p className="font-semibold w-[140px]">{renderText(text)}</p>

                <div>
                  {" "}
                  <select
                    className="border-2 border-gray-300 rounded-md px-2 py-2 w-15"
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                  >
                    <option value="">{q}</option>
                    {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 18–20 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 18–20")}
          </h2>

          <p className="mb-4">
            {renderText("Answer the questions below.")}
            <br />
            {renderText("Choose ")}
            <strong>
              {renderText("NO MORE THAN THREE WORDS AND/OR A NUMBER")}
            </strong>{" "}
            {renderText("from the passage for each answer.")}
          </p>

          <div className="space-y-6  p-4 rounded-lg">
            {[
              {
                q: 18,
                text: "What is the life expectancy of Earth?",
              },
              {
                q: 19,
                text: "What kind of signals from other intelligent civilisations are SETI scientists searching for?",
              },
              {
                q: 20,
                text: "How many stars are the world's most powerful radio telescopes searching?",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 text-lg">
                <p>
                  <span className="font-bold"></span> {renderText(text)}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleButton(q)}
                    className={`w-8 h-8 rounded-full border-2  ${
                      activeButtons[q]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    {q}
                  </button>

                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded-md px-3 py-2 "
                    value={userAnswers[q] || ""}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        [q]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 21–26 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 21–26")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer in Reading Passage 2?",
            )}
          </p>

          <p className="mb-4">
            {renderText("In boxes 21–26 on your answer sheet, choose ")}
            <strong>{renderText("YES")}</strong>,{" "}
            <strong>{renderText("NO")}</strong> {renderText("or ")}
            <strong>{renderText("NOT GIVEN")}</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 21,
                text: "Alien civilisations may be able to help the human race to overcome serious problems.",
              },
              {
                num: 22,
                text: "SETI scientists are trying to find a life form that resembles humans in many ways.",
              },
              {
                num: 23,
                text: "The Americans and Australians have co-operated on joint research projects.",
              },
              {
                num: 24,
                text: "So far SETI scientists have picked up radio signals from several stars.",
              },
              {
                num: 25,
                text: "The NASA project attracted criticism from some members of Congress.",
              },
              {
                num: 26,
                text: "If a signal from outer space is received, it will be important to respond promptly.",
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

          {/* ================= Submit + Result Section ================= */}
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
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
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
      <Reading1Pagination2013></Reading1Pagination2013>
    </div>
  );
};

export default Reading1Part22013;
