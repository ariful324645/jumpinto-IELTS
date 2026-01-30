import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2025 from "../Pagination 2025/Reading1Pagination2025";

const Reading1Part32025 = () => {
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
  const correctAnswers = {
    27: "B",
    28: "B",
    29: "C",
    30: "A",
    31: "B",
    32: "D",
    33: "A",
    34: "E",
    35: "C",
    36: "YES",
    37: "NOT GIVEN",
    38: "YES",
    39: "YES",
    40: "YES",
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
  const handleSubmit = () => {
    setShowResult(true);
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

          <div>
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("How stress affects our judgement")}
            </h1>

            {/* Section A */}
            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "Some of the most important decisions of our lives occur while we're feeling stressed and anxious.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                "From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions. But do we become better or worse at processing and using information under such circumstances?",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "My colleague and I, both neuroscientists, wanted to investigate how the mind operates under stress, so we visited some local fire stations. Firefighters' workdays vary quite a bit. Some are pretty relaxed; they'll spend their time washing the truck, cleaning equipment, cooking meals and reading. Other days can be hectic, with numerous life-threatening incidents to attend to; they'll enter burning homes to rescue trapped residents, and assist with medical emergencies. ",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "These ups and downs presented the perfect setting for an experiment on how people's ability to use information changes when they feel under pressure.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "We found that perceived threat acted as a trigger for a stress reaction that made the task of processing information easier for the firefighters - but only as long as it conveyed bad news.",
              )}
            </p>

            <p className="text-lg">
              {renderText("This is how we arrived at these results.")}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " We asked the firefighters to estimate their likelihood of experiencing 40 different adverse events in their life, such as being involved in an accident or becoming a victim of card fraud.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "We then gave them either good news (that their likelihood of experiencing these events was lower than they'd thought) or bad news (that it was higher) and asked them to provide new estimates.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "People are normally quite optimistic - they will ignore bad news and embrace the good.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This is what happened when the firefighters were relaxed; but when they were under stress, a different pattern emerged.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Under these conditions, they became hyper-vigilant to bad news, even when it had nothing to do with their job (such as learning that the likelihood of card fraud was higher than they'd thought), and altered their beliefs in response.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In contrast, stress didn't change how they responded to good news (such as learning that the likelihood of card fraud was lower than they'd thought).",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "In contrast, stress didn't change how they responded to good news (such as learning that the likelihood of card fraud was lower than they'd thought).",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "Back in our lab, we observed the same pattern in students who were told they had to give a surprise public speech, which would be judged by a panel, recorded and posted online.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Sure enough, their cortisol levels spiked, their heart rates went up and they suddenly became better at processing unrelated, yet alarming, information about rates of disease and violence.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "When we experience stressful events, a physiological change is triggered that causes us to take in warnings and focus on what might go wrong. ",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Brain imaging reveals that this 'switch' is related to a sudden boost in a neural signal important for learning, specifically in response to unexpected warning signs, such as faces expressing fear.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Such neural engineering could have helped prehistoric humans to survive. When our ancestors found themselves surrounded by hungry animals, they would have benefited from an increased ability to learn about hazards. In a safe environment, however, it would have been wasteful to be on high alert constantly. So, a neural switch that automatically increases or decreases our ability to process warnings in response to changes in our environment could have been useful. In fact, people with clinical depression and anxiety seem unable to switch away from a state in which they absorb all the negative messages around them.",
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                {renderText(
                  "It is also important to realise that stress travels rapidly from one person to the next. If a co-worker is stressed, we are more likely to tense up and feel stressed ourselves. We don't even need to be in the same room with someone for their emotions to influence our behaviour. Studies show that if we observe positive feeds on social media, such as images of a pink sunset, we are more likely to post uplifting messages ourselves. If we observe negative posts, such as complaints about a long queue at the coffee shop, we will in turn create more negative posts.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "In some ways, many of us now live as if we are in danger, constantly ready to tackle demanding emails and text messages, and respond to news alerts and comments on social media. Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress. In other words, a pre-programmed physiological reaction, which evolution has equipped us with to help us avoid famished predators, is now being triggered by an online post. Social media posting, according to one study, raises your pulse, makes you sweat, and enlarges your pupils more than most daily activities.",
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "The fact that stress increases the likelihood that we will focus more on alarming messages, together with the fact that it spreads extremely rapidly, can create collective fear that is not always justified. After a stressful public event, such as a natural disaster or major financial crash, there is often a wave of alarming information in traditional and social media, which individuals become very aware of. But that has the effect of exaggerating existing danger. And so, a reliable pattern emerges - stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which increases stress further.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "And so, a reliable pattern emerges - stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which increases stress further",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "As a result, trips are cancelled, even if the disaster took place across the globe; stocks are sold, even when holding on is the best thing to do.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions.",
              )}
              <span
                className={`ml-1 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Being aware of the close relationship between people's emotional state and how they process information can help us frame our messages more effectively and become conscientious agents of change.",
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 27–30 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–30")}
          </h2>
          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 27,
                text: "In the first paragraph, the writer introduces the topic of the text by",
                options: [
                  "A. defining some commonly used terms.",
                  "B. questioning a widely held assumption.",
                  "C. mentioning a challenge faced by everyone.",
                  "D. specifying a situation which makes us most anxious.",
                ],
              },
              {
                q: 28,
                text: "What point does the writer make about firefighters in the second paragraph?",
                options: [
                  "A. The regular changes of stress levels in their working lives make them ideal study subjects.",
                  "B. The strategies they use to handle stress are of particular interest to researchers.",
                  "C. The stressful nature of their job is typical of many public service professions.",
                  "D. Their personalities make them especially well-suited to working under stress.",
                ],
              },
              {
                q: 29,
                text: "What is the writer doing in the fourth paragraph?",
                options: [
                  "A. explaining their findings",
                  "B. justifying their approach",
                  "C. setting out their objectives",
                  "D. describing their methodology",
                ],
              },
              {
                q: 30,
                text: "In the seventh paragraph, the writer describes a mechanism in the brain which",
                options: [
                  "A. enables people to respond more quickly to stressful situations.",
                  "B. results in increased ability to control our levels of anxiety.",
                  "C. produces heightened sensitivity to indications of external threats.",
                  "D. is activated when there is a need to communicate a sense of danger.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="text-lg">
                <p className="font-bold mb-2">{renderText(`${q}. ${text}`)}</p>
                <div className="flex flex-col space-y-1 ml-4">
                  {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt[0]} // A, B, C, or D
                        checked={userAnswers[q] === opt[0]}
                        onChange={(e) => {
                          const value = e.target.value;
                          setUserAnswers((prev) => {
                            const updated = { ...prev, [q]: value };
                            calculateScore(updated);
                            return updated;
                          });
                        }}
                      />
                      {renderText(opt)}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================= Questions 31–35 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 31–35")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Complete each sentence with the correct ending, A-G, below. Choose the correct letter, A-G, next to Questions 31–35.",
            )}
          </p>
          <div className="border p-4 rounded mb-6 max-w-xl mx-auto text-lg">
            {[
              "A. made them feel optimistic.",
              "B. took relatively little notice of bad news.",
              "C. responded to negative and positive information in the same way.",
              "D. were feeling under stress.",
              "E. put them in a stressful situation.",
              "F. behaved in a similar manner, regardless of the circumstances.",
              "G. thought it more likely that they would experience something bad.",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 31,
                text: "At times when they were relaxed, the firefighters usually",
              },
              {
                q: 32,
                text: "The researchers noted that when the firefighters were stressed, they",
              },
              {
                q: 33,
                text: "When the firefighters were told good news, they always",
              },
              {
                q: 34,
                text: "The students' cortisol levels and heart rates were affected when the researchers",
              },
              {
                q: 35,
                text: "In both experiments, negative information was processed better when the subjects",
              },
            ].map(({ q, text }) => (
              <p key={q} className="text-lg flex items-center gap-2">
                <span className="font-bold">{renderText(`${q}.`)}</span>{" "}
                {renderText(text)}
                <select
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-15 mx-2"
                  value={userAnswers[q] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserAnswers((prev) => {
                      const updated = { ...prev, [q]: value };
                      calculateScore(updated);
                      return updated;
                    });
                  }}
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </p>
            ))}
          </div>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 36–40")}
          </h2>
          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer? In boxes 36–40 on your answer sheet, choose YES, NO or NOT GIVEN.",
            )}
          </p>

          <div className="space-y-4 mb-6 text-lg">
            {[
              {
                q: 36,
                text: "The tone of the content we post on social media tends to reflect the nature of the posts in our feeds.",
              },
              {
                q: 37,
                text: "Phones have a greater impact on our stress levels than other electronic media devices.",
              },
              {
                q: 38,
                text: "The more we read about a stressful public event on social media, the less able we are to take the information in.",
              },
              {
                q: 39,
                text: "Stress created by social media posts can lead us to take unnecessary precautions.",
              },
              {
                q: 40,
                text: "Our tendency to be affected by other people's moods can be used in a positive way.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="text-lg">
                <p className="font-bold mb-2">{renderText(`${q}. ${text}`)}</p>
                <div className="flex flex-col ml-4 gap-1">
                  {["YES", "NO", "NOT GIVEN"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={option}
                        checked={userAnswers[q] === option}
                        onChange={(e) => {
                          const value = e.target.value;
                          setUserAnswers((prev) => {
                            const updated = { ...prev, [q]: value };
                            calculateScore(updated);
                            return updated;
                          });
                        }}
                      />
                      {renderText(option)}
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
                    {renderText("Your Score:")} {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer = (userAnswers[num] || "")
                        .toString()
                        .trim()
                        .toLowerCase();
                      const correctAnswer = (correctAnswers[num] || "")
                        .toString()
                        .trim()
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
      <Reading1Pagination2025></Reading1Pagination2025>
    </div>
  );
};

export default Reading1Part32025;
