import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2024 from "../Pagination 2024/Reading2Pagination2024";

const Reading2Part22024 = () => {
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [activeButtons, setActiveButtons] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };
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

  const questions = [
    "Urban farming can take place above or below ground.",
    "Some of the equipment used in aeroponic farming can be made by hand.",
    "Urban farming relies more on electricity than some other types of farming.",
    "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
    "Most produce can be grown on an aeroponic urban farm at any time of the year.",
    "Beans take longer to grow on an urban farm than other vegetables.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const correctAnswers = {
    // Questions 14–18 (Paragraph Matching, A–F)
    14: "A", // reference to two chemical compounds which impact on performance
    15: "B", // examples of strategies for minimising the effects of stress
    16: "C", // how a sportsperson accounted for their own experience of stress
    17: "D", // study results indicating links between stress responses and performance
    18: "F", // mention of people who can influence how athletes perceive their stress responses

    // Questions 19–22 (ONE WORD ONLY)
    19: "injury", // Performance stress involves demands like coping with injury
    20: "serves", // Cortisol can cause tennis players to produce fewer good serves
    21: "excitement", // view physiological responses as positive feeling like excitement
    22: "visualisation", // example of a psychological technique

    // Questions 23–24 (Choose TWO letters, A–E)
    "23-24": ["A", "B"], // facts about Emma Raducanu's withdrawal

    // Questions 25–26 (Choose TWO letters, A–E)
    "25-26": ["A", "E"], // facts about anxiety
  };

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "23-24" || id === "25-26") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.entries(correctAnswers).forEach(([key, correct]) => {
      const user = answers[key];

      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          user.length === correct.length &&
          correct.every((v) => user.includes(v))
        ) {
          newScore += 2; // 🔥 21–22 & 23–24
        }
      } else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening1Part22022", newScore);
  };

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
              {renderText("Athletes and stress")}
            </h1>

            {/* Section A */}
            <p className="text-lg my-5 ">
              {renderText(
                "It isn't easy being a professional athlete. Not only are the physical demands greater than most people could handle, athletes also face intense psychological pressure during competition. This is something that British tennis player Emma Raducanu wrote about on social media following her withdrawal from the 2021 Wimbledon tournament. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '" Though the young player had been doing well in the tournament, she began having difficulty regulating her breathing and heart rate during a match, which she later attributed to the accumulation of the excitement and the buzz"',
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16,23")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "For athletes, some level of performance stress is almost unavoidable. But there are many different factors that dictate just how people's minds and bodies respond to stressful events. Typically, stress is the result of an exchange between two factors: demands and resources. An athlete may feel stressed about an event if they feel the demands on them are greater than they can handle. These demands include the high level of physical and mental effort required to succeed, and also the athlete's concerns about the difficulty of the event, their chance of succeeding, and any potential dangers such as injury. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Resources, on the other hand, are a person's ability to cope with these demands. These include factors such as the competitor's degree of confidence, how much they believe they can control the situation's outcome, and whether they're looking forward to the event or not.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Each new demand or change in circumstances affects whether a person responds positively or negatively to stress. Typically, the more resources a person feels they have in handling the situation, the more positive their stress response. This positive stress response is called a challenge state. But should the person feel there are too many demands placed on them, the more likely they are to experience a negative stress response - known as a threat state. Research shows that the challenge states lead to good performance, while threat states lead to poorer performance. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "So, in Emma Raducanu's case, a much larger audience, higher expectations and facing a more skilful opponent, may all have led her to feel there were greater demands being placed on her at Wimbledon - but she didn't have the resources to tackle them. This led to her experiencing a threat response.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17,24")}
                  </span>
                )}
              </span>
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "Our challenge and threat responses essentially influence how our body responds to stressful situations, as both affect the production of adrenaline and cortisol - also known as 'stress hormones'. During a challenge state, adrenaline increases the amount of blood pumped from the heart and expands the blood vessels, which allows more energy to be delivered to the muscles and brain. This increase of blood and decrease of pressure in the blood vessels has been consistently related to superior sport performance in everything from cricket batting, to golf putting and football penalty taking. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But during a threat state, cortisol inhibits the positive effect of adrenaline, resulting in tighter blood vessels, higher blood pressure, slower psychological responses, and a faster heart rate. In short, a threat state makes people more anxious - they make worse decisions and perform more poorly. In tennis players, cortisol has been associated with more unsuccessful serves and greater anxiety.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "That said, anxiety is also a common experience for athletes when they're under pressure. Anxiety can increase heart rate and perspiration, cause heart palpitations, muscle tremors and shortness of breath, as well as headaches, nausea, stomach pain, weakness and a desire to escape in more extreme cases. Anxiety can also reduce concentration and self-control and cause overthinking. The intensity with which a person experiences anxiety depends on the demands and resources they have. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Anxiety may also manifest itself in the form of excitement or nervousness depending on the stress response. Negative stress responses can be damaging to both physical and mental health - and repeated episodes of anxiety coupled with negative responses can increase risk of heart disease and depression.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25,26")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "But there are many ways athletes can ensure they respond positively under pressure. Positive stress responses can be promoted through the language that they and others - such as coaches or parents - use. Psychologists can also help athletes change how they see their physiological responses - such as helping them see a higher heart rate as excitement, rather than nerves. Developing psychological skills, such as visualisation, can also help decrease physiological responses to threat. Visualisation may involve the athlete recreating a mental picture of a time when they performed well, or picturing themselves doing well in the future. This can help create a feeling of control over the stressful event. Recreating competitive pressure during training can also help athletes learn how to deal with stress. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "But there are many ways athletes can ensure they respond positively under pressure.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Positive stress responses can be promoted through the language that they and others - such as coaches or parents - use.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Psychologists can also help athletes change how they see their physiological responses - such as helping them see a higher heart rate as excitement, rather than nerves",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Developing psychological skills, such as visualisation, can also help decrease physiological responses to threat",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
            </p>
          </div>

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
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–26")}
          </h2>
          <h2 className=" mb-3">
            {renderText("Reading Passage 2 has six paragraphs, A-F.")}
          </h2>
          <h2 className="text-lg mb-3">
            {renderText("Which paragraph contains the following information?")}
          </h2>
          <h2 className=" mb-3">
            {renderText(
              "Choose the correct letter, A-F, in boxes 14-18 on your answer sheet.",
            )}
          </h2>
          <h2 className=" mb-3">
            {renderText("NB You may use any letter more than once.")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            {/* ================= Questions 14–18 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 14–18</h2>
              <p className="mt-2">
                {renderText(
                  "Which paragraph contains the following information? Choose the correct letter, A–F.",
                )}
              </p>

              {[
                {
                  num: 14,
                  text: "reference to two chemical compounds which impact on performance",
                },
                {
                  num: 15,
                  text: "examples of strategies for minimising the effects of stress",
                },
                {
                  num: 16,
                  text: "how a sportsperson accounted for their own experience of stress",
                },
                {
                  num: 17,
                  text: "study results indicating links between stress responses and performance",
                },
                {
                  num: 18,
                  text: "mention of people who can influence how athletes perceive their stress responses",
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span className="">{renderText(text)}</span>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 19–22 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 19–22</h2>
              <p className="mt-2">
                {renderText(
                  "Complete the sentences below. Choose ONE WORD ONLY from the passage.",
                )}
              </p>

              {[
                {
                  num: 19,
                  text: "Performance stress involves many demands on the athlete, for example, coping with the possible risk of",
                },
                {
                  num: 20,
                  text: "Cortisol can cause tennis players to produce fewer good",
                },
                {
                  num: 21,
                  text: "Psychologists can help athletes to view their physiological responses as the effect of a positive feeling such as",
                },
                {
                  num: 22,
                  text: "is an example of a psychological technique which can reduce an athlete's stress responses",
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span>{renderText(text)}</span>
                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 w-32"
                    value={userAnswers[num] || ""}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        [num]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </div>

            {/* ================= Questions 23–24 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 23–24</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>
              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO facts about Emma Raducanu's withdrawal from the Wimbledon tournament are mentioned in the text?",
                )}
              </p>

              {[
                "the stage at which she dropped out of the tournament",
                "symptoms of her performance stress at the tournament",
                "measures which she had taken to manage her stress levels",
                "aspects of the Wimbledon tournament which increased her stress levels",
                "reactions to her social media posts about her experience at Wimbledon",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["23-24"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("23-24", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Questions 25–26 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 25–26</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>
              <p className="font-bold mt-3">
                {renderText(
                  "Which TWO facts about anxiety are mentioned in Paragraph E of the text?",
                )}
              </p>

              {[
                "the factors which determine how severe it may be",
                "how long it takes for its effects to become apparent",
                "which of its symptoms is most frequently encountered",
                "the types of athletes who are most likely to suffer from it",
                "the harm that can result if athletes experience it too often",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["25-26"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("25-26", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
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
                      {renderText("Your Score: ")} {score}/13
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (14–26)")}
                    </h3>

                    <ul className="space-y-3">
                      {[
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        "23-24",
                        "25-26",
                        25,
                        26,
                      ].map((num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const isCorrect = (() => {
                          if (Array.isArray(correct)) {
                            return (
                              Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            );
                          } else {
                            return (
                              user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase()
                            );
                          }
                        })();

                        const noAnswer = !user;

                        const userAnswerDisplay = Array.isArray(user)
                          ? user.join(", ")
                          : user?.trim() || "";
                        const correctAnswerDisplay = Array.isArray(correct)
                          ? correct.join(", ")
                          : correct?.trim();

                        return (
                          <li
                            key={num}
                            className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-2">
                              {isCorrect && (
                                <FaDotCircle className="text-green-600 text-xl font-bold" />
                              )}
                              {!isCorrect && (
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                  <ImCross className="text-white text-sm font-bold" />
                                </div>
                              )}
                              <p className="font-bold">Q{num}:</p>
                            </div>

                            <p className="ml-8">
                              <span className="font-semibold">
                                Your Answer:
                              </span>{" "}
                              {noAnswer ? (
                                <span className="italic">
                                  No answer provided
                                </span>
                              ) : (
                                userAnswerDisplay
                              )}
                            </p>

                            <p className="ml-8">
                              <span className="font-semibold text-green-600">
                                Correct Answer:
                              </span>{" "}
                              {correctAnswerDisplay}
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
      </div>
      <Reading2Pagination2024></Reading2Pagination2024>
    </div>
  );
};

export default Reading2Part22024;
