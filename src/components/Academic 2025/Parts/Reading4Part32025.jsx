import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2025 from "../Pagination 2025/Reading4Pagination2025";

const Reading4Part32025 = () => {
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
  const handleSubmit = () => {
    setShowResult(true);
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

  const correctAnswers = {
    27: "D",
    28: "G",
    29: "B",
    30: "C",
    31: "A",
    32: "D",
    33: "E",
    34: "B",
    35: "C",
    36: "A",
    37: "jackals",
    38: "diseases",
    39: "food",
    40: "foxes",
  };
  ``;

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
            <div className="">
              <h1 className="text-2xl font-bold text-center">
                {renderText("A new role for livestock guard dogs")}
              </h1>

              <p className="text-lg my-5">
                {renderText(
                  "Livestock guard dogs, traditionally used to protect farm animals from predators, are now being used to protect the predators themselves",
                )}
              </p>

              {/* Section A */}
              <p className="text-lg">
                {renderText(
                  "For thousands of years, livestock guard dogs worked alongside shepherds to protect their sheep, goats and cattle from predators such as wolves and bears.",
                )}
                {renderText(
                  " But in the 19th and 20th centuries, when such predators were largely exterminated, most guard dogs lost their jobs.",
                )}
                {renderText(
                  " In recent years, however, as increased efforts have been made to protect wild animals, predators have become more widespread again.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    " As a result, farmers once more need to protect their livestock, and guard dogs are enjoying an unexpected revival.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("A")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section B */}
              <p className="text-lg">
                {renderText(
                  "Today there are around 50 breeds of guard dogs on duty in various parts of the world.",
                )}
                {renderText(
                  " These dogs are raised from an early age with the animals they will be watching and eventually these animals become the dog's family.",
                )}
                {renderText(
                  " The dogs will place themselves between the livestock and any threat, barking loudly.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    'If necessary, they will chase away predators, but often their mere presence is sufficient."Their initial training is to make them understand that livestock is going to be their life," says Dan Macon, a shepherd with three guard dogs.',
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("29")}
                    </span>
                  )}
                </span>
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    '"A fluffy white puppy is fun to be around, but too much human affection makes it a great dog for guarding the front porch, rather than a great livestock guard dog."',
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
                  {renderText("36")}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("36")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section C */}
              <p className="text-lg">
                {renderText(
                  "The evidence indicates that guard dogs are highly effective.",
                )}
                {renderText(
                  " For example, in Portugal, biologist Silvia Ribeiro has found that more than 90 per cent of the farmers participating in a programme to train and use guard dogs to protect their herds against attack from wolves rate the performance of the dogs as very good or excellent.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    "In a study carried out in Australia by Linda van Bommel and Chris Johnson at the University of Tasmania, more than 65 per cent of herders reported that predation stopped completely after they got the dogs, and almost all the rest saw a decrease in attacks.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("30")}
                    </span>
                  )}
                </span>
                {renderText(
                  '"If they are managed and used properly, livestock guard dogs are the most efficient control method that we have in terms of the amount of livestock that they save from predation," says van Bommel.',
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText("35")}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("35")}
                    </span>
                  )}
                </span>
              </p>

              {/* Section D */}
              <p className="text-lg">
                {renderText(
                  "But today's guard dogs also have a new role - to help preserve the predators.",
                )}
                {renderText(
                  " It is hoped that reductions in livestock losses can make farmers more tolerant of predators and less likely to kill them.",
                )}
                {renderText(
                  " In Namibia, more than 90 per cent of cheetahs live outside protected areas, close to humans raising livestock.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    "As a result, the cheetahs are often held responsible for animal losses, and large numbers have been killed by farmers.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("27")}
                    </span>
                  )}
                </span>
                {renderText(
                  "When guard dogs were introduced, more than 90 per cent of farmers reported a dramatic reduction in livestock losses, and said that as a result they were less likely to kill predators. Julie Young, at Utah State University in the US, believes this result applies widely.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    '"There is common ground from the livestock perspective and from the conservation perspective," she says.',
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
                    '"If ranchers don\'t have a dead cow, they will not make a call to apply for a permit to kill a wolf."',
                  )}
                </span>
              </p>

              {/* Section E */}
              <p className="text-lg">
                {renderText(
                  "Looking at all the published evidence, Bethany Smith at Nottingham Trent University in the UK found that up to 88 per cent of farmers said they no longer killed predators after using dogs - but warned that such self-reported results must be taken with a pinch of salt.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    "What's more, it is possible that livestock guard dogs merely displace predators to unprotected neighbouring properties, where their fate isn't recorded.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("33")}
                    </span>
                  )}
                </span>
                {renderText(
                  '"In some regions, we work with almost every farmer, but in others only one or two have dogs," says Ribeiro. "If we are not working with everybody, we are transferring the wolf pressure to the neighbour\'s herd and he can use poison and kill an entire pack of wolves."',
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText("34")}
                </span>
              </p>

              {/* Section F */}
              <p className="text-lg">
                {renderText(
                  "Another concern is whether there may be unintended ecological effects of using guard dogs.",
                )}
                {renderText(
                  " Studies suggest that reducing deaths of one type of predator may have a negative impact on other species.",
                )}
                {renderText(
                  " The extent of this problem isn't known, but the consequences are clear in Namibia.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    "Cheetahs aren't the only species that cause sheep and goat losses there: other predators also attack livestock.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("37")}
                    </span>
                  )}
                </span>
                {renderText(
                  "Guard dogs have other ecological impacts too. They have been found to spread diseases to wild animals, including endangered Ethiopian wolves.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText("38")}
                </span>
                {renderText(
                  "They may also compete with other carnivores for food. And by creating a 'landscape of fear', their mere presence can influence the behaviour of prey animals.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText("39")}
                </span>
              </p>

              {/* Section G */}
              <p className="text-lg">
                {renderText(
                  "The evidence so far, however, indicates that these consequences aren't always negative.",
                )}
                {renderText(
                  " Guard dogs can deliver unexpected benefits by protecting vulnerable wildlife from predators.",
                )}
                {renderText(
                  " For example, their presence has been found to protect birds which build their nests on the ground in fields, where foxes would normally raid them.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText(
                    "Indeed, Australian researchers are now using dogs to enhance biodiversity and create refuges for species threatened by predation.",
                  )}
                  {highlight && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      {renderText("40")}
                    </span>
                  )}
                </span>
                {renderText(
                  "So if we can get this right, there may be a bright future for guard dogs in promoting harmonious coexistence between humans and wildlife.",
                )}
                <span
                  className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
                >
                  {renderText("28")}
                </span>
              </p>
            </div>
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
              "Reading Passage 3 has seven paragraphs, A-G. Which paragraph contains the following information?",
            )}
            <br />
            {renderText("Choose the correct letter, ")}
            <strong>{renderText("A–G")}</strong>.
            <br />
            {renderText("NB You may use any letter more than once.")}
          </p>

          <div className="space-y-4  rounded">
            {[
              {
                num: 27,
                text: "an example of how one predator has been protected by the introduction of livestock guard dogs",
              },
              {
                num: 28,
                text: "an optimistic suggestion about the possible positive developments in the use of livestock guard dogs",
              },
              {
                num: 29,
                text: "a description of how the methods used by livestock guard dogs help to keep predators away",
              },
              {
                num: 30,
                text: "claims by different academics that the use of livestock guard dogs is a successful way of protecting farmers' herds",
              },
              {
                num: 31,
                text: "a reference to how livestock guard dogs gain their skills",
              },
            ].map(({ num, text }) => (
              <p key={num} className="text-lg">
                {renderText(num + ". " + text)}
                <select
                  className="ml-2 border-2 border-gray-300 rounded-md px-2 py-1 w-20"
                  value={userAnswers[num] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [num]: value };
                      calculateScore(updated); // call here
                      return updated;
                    });
                  }}
                >
                  <option value="">{num}</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 32–36 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 32–36")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Look at the following statements (Questions 32–36) and the list of people below.",
            )}
            <br />
            {renderText("Match each statement with the correct person, ")}
            <strong>{renderText("A–E")}</strong>.
            <br />
            {renderText("Choose the correct letter next to Questions 32–36.")}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[300px] text-center mx-auto text-lg">
            <h2 className="font-bold text-xl">
              {renderText("List of people")}
            </h2>
            {[
              "A. Dan Macon",
              "B. Silvia Ribeiro",
              "C. Linda van Bommel",
              "D. Julie Young",
              "E. Bethany Smith",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4">
            {[
              {
                q: 32,
                text: "The use of guard dogs may save the lives of both livestock and wild animals.",
              },
              {
                q: 33,
                text: "Claims of a change in behaviour from those using livestock guard dogs may not be totally accurate.",
              },
              {
                q: 34,
                text: "There may be negative results if the use of livestock guard dogs is not sufficiently widespread.",
              },
              {
                q: 35,
                text: "Livestock guard dogs are the best way of protecting farm animals, as long as the dogs are appropriately handled.",
              },
              {
                q: 36,
                text: "Teaching a livestock guard dog how to do its work needs a different focus from teaching a house guard dog.",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg">
                {renderText(q + ". " + text)}
                <select
                  className="ml-2 border-2 border-gray-300 rounded-md px-2 py-1 w-20"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [num]: value };
                      calculateScore(updated); // call here
                      return updated;
                    });
                  }}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 37–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 37–40")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
            )}
          </p>

          <div className="space-y-4 border p-4 rounded">
            {[
              {
                num: 37,
                text: "In Namibia, livestock guard dogs have been used to protect domestic animals from attacks by cheetahs. This has led to a rise in the deaths of other predators, particularly",
              },
              {
                num: 38,
                text: "In addition, it has been suggested that the dogs could have",
              },
              {
                num: 39,
                text: "which may affect other species, and that they may reduce the amount of",
              },
              {
                num: 40,
                text: "available to certain wild animals. On the other hand, these dogs may help birds by protecting their nests. These might otherwise be threatened by predators such as",
              },
            ].map(({ num, text }) => (
              <p key={num} className="text-lg flex items-center">
                <span className="flex-1">{renderText(num + ". " + text)}</span>

                {/* Dynamic Toggle Button */}
                <button
                  onClick={() => toggleButton(num)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    activeButtons[num]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  {num}
                </button>

                {/* Input */}
                <input
                  type="text"
                  className="ml-2 border-2 border-gray-300 rounded-md px-2 py-1 w-32"
                  value={userAnswers[num] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [num]: value };
                      calculateScore(updated); // call here
                      return updated;
                    });
                  }}
                />
              </p>
            ))}
          </div>

          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit}
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
                    {renderText("Your Score:")} {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (14–26)")}
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer = (userAnswers[num] || "")
                        .toString()
                        .trim()
                        .toUpperCase();
                      const correctAnswer = (correctAnswers[num] || "")
                        .toString()
                        .trim()
                        .toUpperCase();
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
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            <span>{renderText(correctAnswer)}</span>
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
      <Reading4Pagination2025></Reading4Pagination2025>
    </div>
  );
};

export default Reading4Part32025;
