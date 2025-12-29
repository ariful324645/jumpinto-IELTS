import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading4Pagination2015 from "../Pagination 2015/Reading4Pagination2015";

//  Marks show

const Reading4Part22015 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 38;
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
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  const correctAnswers = {
    // ================= Questions 14–18 (Summary completion) =================
    14: "change", // personality change was impossible
    15: "young age", // by a young age, character tends to be fixed
    16: "optimism", // easiest quality to acquire
    17: "skills", // learn a wide variety of skills
    18: "negative emotions", // must understand and feel negative emotions

    // ================= Questions 19–22 (Match statements to people) =================
    19: "E", // Todd Kashdan: accept ignorance when trying something new
    20: "C", // Suzanne Segerstrom: notice good things
    21: "G", // Cynthia Pury: courage learned via responsibility
    22: "A", // Christopher Peterson: overcome shyness

    // ================= Questions 23–26 (Passage sections A-H) =================
    23: "D", // rational thinking to achieve physical goals (Suzanne Segerstrom)
    24: "C", // overcame sad experience (David Fajgenbaum)
    25: "G", // rethinking academic career path (Mauro Zappaterra)
    26: "H", // risked career due to duty (Kenneth Pedeleose)
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

        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("PASSAGE 2")}</h1>
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

          <div className="mt-4">
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below."
              )}
            </h1>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {renderText("Second nature")}
            </h1>
            <p className="text-lg mb-5 italic text-center">
              {renderText(
                "Your personality isn't necessarily set in stone. With a little experimentation, people can reshape their temperaments and inject passion, optimism, joy and courage into their lives."
              )}
            </p>

            {/* Paragraph A */}
            <p className="text-lg mb-5 font-bold">{renderText("A")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Psychologists have long held that a person's character cannot undergo a transformation in any meaningful way and that the key traits of personality are determined at a very young age."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
              {renderText(
                " However, researchers have begun looking more closely at ways we can change. Positive psychologists have identified 24 qualities we admire, such as loyalty and kindness, and are studying them to find out why they come so naturally to some people. What they're discovering is that many of these qualities amount to habitual behaviour that determines the way we respond to the world. The good news is that all this can be learned."
              )}
            </p>

            {/* Paragraph B */}
            <p className="text-lg mb-5 font-bold">{renderText("B")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  '"The evidence is good that most personality traits can be altered," says Christopher Peterson, professor of psychology at the University of Michigan, who cites himself as an example.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
              {renderText(
                " Inherently introverted, he realised early on that as an academic, his reticence would prove disastrous in the lecture hall. So he learned to be more outgoing and to entertain his classes. 'Now my extroverted behaviour is spontaneous,' he says."
              )}
            </p>

            {/* Paragraph C */}
            <p className="text-lg mb-5 font-bold">{renderText("C")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "David Fajgenbaum had to make a similar transition."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    16
                  </span>
                )}
              </span>
              {renderText(
                " He was preparing for university, when he had an accident that put an end to his sports career. On campus, he quickly found that beyond ordinary counselling, the university had no services for students who were undergoing physical rehabilitation and suffering from depression like him. He therefore launched a support group to help others in similar situations. He took action despite his own pain - a typical response of an optimist."
              )}
            </p>

            {/* Paragraph D */}
            <p className="text-lg mb-5 font-bold">{renderText("D")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Suzanne Segerstrom, professor of psychology at the University of Kentucky, believes that the key to increasing optimism is through cultivating optimistic behaviour, rather than positive thinking."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    17
                  </span>
                )}
              </span>
              {renderText(
                " She recommends you train yourself to pay attention to good fortune by writing down three positive things that come about each day. This will help you convince yourself that favourable outcomes actually happen all the time, making it easier to begin taking action."
              )}
            </p>

            {/* Paragraph E */}
            <p className="text-lg mb-5 font-bold">{renderText("E")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "You can recognise a person who is passionate about a pursuit by the way they are so strongly involved in it."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    18
                  </span>
                )}
              </span>
              {renderText(
                " Tanya Streeter's passion is freediving - the sport of plunging deep into the water without tanks or other breathing equipment. Beginning in 1998, she set nine world records and can hold her breath for six minutes. The physical stamina required for this sport is intense but the psychological demands are even more overwhelming. Streeter learned to untangle her fears from her judgment of what her body and mind could do. 'In my career as a competitive freediver, there was a limit to what I could do - but it wasn't anywhere near what I thought it was,' she says."
              )}
            </p>

            {/* Paragraph F */}
            <p className="text-lg mb-5 font-bold">{renderText("F")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Finding a pursuit that excites you can improve anyone's life."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    19
                  </span>
                )}
              </span>
              {renderText(
                " The secret about consuming passions, though, according to psychologist Paul Silvia of the University of North Carolina, is that 'they require discipline, hard work and ability, which is why they are so rewarding.' Psychologist Todd Kashdan has this advice for those people taking up a new passion: 'As a newcomer, you also have to tolerate and laugh at your own ignorance. You must be willing to accept the negative feelings that come your way,' he says."
              )}
            </p>

            {/* Paragraph G */}
            <p className="text-lg mb-5 font-bold">{renderText("G")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In 2004, physician-scientist Mauro Zappaterra began his PhD research at Harvard Medical School."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>
              {renderText(
                " Unfortunately, he was miserable as his research wasn't compatible with his curiosity about healing. He finally took a break and during eight months in Santa Fe, Zappaterra learned about alternative healing techniques not taught at Harvard. When he got back, he switched labs to study how cerebrospinal fluid nourishes the developing nervous system. He also vowed to look for the joy in everything, including failure, as this could help him learn about his research and himself. One thing that can hold joy back is a person's concentration on avoiding failure rather than their looking forward to doing something well. 'Focusing on being safe might get in the way of your reaching your goals,' explains Kashdan."
              )}
            </p>

            {/* Paragraph H */}
            <p className="text-lg mb-5 font-bold">{renderText("H")}</p>
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Usually, we think of courage in physical terms but ordinary life demands something else."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    21
                  </span>
                )}
              </span>
              {renderText(
                " For marketing executive Kenneth Pedeleose, it meant speaking out against something he thought was ethically wrong. The new manager was intimidating staff so Pedeleose carefully recorded each instance of bullying and eventually took the evidence to a senior director, knowing his own job security would be threatened. Eventually the manager was the one to go. According to Cynthia Pury, a psychologist at Clemson University, Pedeleose's story proves the point that courage is not motivated by fearlessness, but by moral obligation. Pury also believes that people can acquire courage. Many of her students said that faced with a risky situation, they first tried to calm themselves down, then looked for a way to mitigate the danger, just as Pedeleose did by documenting his allegations."
              )}
            </p>

            {/* Conclusion */}
            <p className="text-lg mb-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Over the long term, picking up a new character trait may help you move toward being the person you want to be."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    22
                  </span>
                )}
              </span>
              {renderText(
                " And in the short term, the effort itself could be surprisingly rewarding, a kind of internal adventure."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 14–18 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 14–18")}
            </h2>

            <p>{renderText("Complete the summary below.")}</p>
            <p>
              {renderText(
                "Choose NO MORE THAN TWO WORDS from the passage for each answer."
              )}
            </p>

            <div className="border p-5 rounded-md leading-relaxed text-[15px]">
              <p>
                {renderText(
                  "Psychologists have traditionally believed that a personality"
                )}{" "}
                <span className="inline-flex items-center gap-1 mx-1">
                  <span className="text-sm text-gray-500">(14)</span>
                  <input
                    type="text"
                    value={userAnswers[14] || ""}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                    className="w-28 border border-gray-400 rounded px-2 py-1"
                  />
                </span>
                {renderText("was impossible and that by a")}{" "}
                <span className="inline-flex items-center gap-1 mx-1">
                  <span className="text-sm text-gray-500">(15)</span>
                  <input
                    type="text"
                    value={userAnswers[15] || ""}
                    onChange={(e) => handleInputChange(15, e.target.value)}
                    className="w-28 border border-gray-400 rounded px-2 py-1"
                  />
                </span>
                {renderText(
                  ", a person's character tends to be fixed. This is not true according to positive psychologists, who say that our personal qualities can be seen as habitual behaviour. One of the easiest qualities to acquire is"
                )}{" "}
                <span className="inline-flex items-center gap-1 mx-1">
                  <span className="text-sm text-gray-500">(16)</span>
                  <input
                    type="text"
                    value={userAnswers[16] || ""}
                    onChange={(e) => handleInputChange(16, e.target.value)}
                    className="w-28 border border-gray-400 rounded px-2 py-1"
                  />
                </span>
                .
              </p>

              <p className="mt-3">
                {renderText(
                  "However, regardless of the quality, it is necessary to learn a wide variety of different"
                )}{" "}
                <span className="inline-flex items-center gap-1 mx-1">
                  <span className="text-sm text-gray-500">(17)</span>
                  <input
                    type="text"
                    value={userAnswers[17] || ""}
                    onChange={(e) => handleInputChange(17, e.target.value)}
                    className="w-28 border border-gray-400 rounded px-2 py-1"
                  />
                </span>{" "}
                {renderText(
                  "in order for a new quality to develop; for example, a person must understand and feel some"
                )}{" "}
                <span className="inline-flex items-center gap-1 mx-1">
                  <span className="text-sm text-gray-500">(18)</span>
                  <input
                    type="text"
                    value={userAnswers[18] || ""}
                    onChange={(e) => handleInputChange(18, e.target.value)}
                    className="w-28 border border-gray-400 rounded px-2 py-1"
                  />
                </span>{" "}
                {renderText("in order to increase their happiness.")}
              </p>
            </div>

            {/* ================= Questions 19–22 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 19–22")}
            </h2>

            <p>
              {renderText(
                "Look at the following statements and the list of people below."
              )}
            </p>
            <p>
              {renderText("Match each statement with the correct person, A–G.")}
            </p>

            <div className="border max-w-[200px] mx-auto p-4">
              <h2 className="font-bold text-2xl mb-2">List of People</h2>
              <p className="font-semibold">
                {renderText(
                  "A. Christopher Peterson  B. David Fajgenbaum  C. Suzanne Segerstrom  D. Tanya Streeter  E. Todd Kashdan  F. Kenneth Pedeleose  G. Cynthia Pury"
                )}
              </p>
            </div>

            {[
              {
                q: 19,
                text: "People must accept that they do not know much when first trying something new.",
              },
              {
                q: 20,
                text: "It is important for people to actively notice when good things happen.",
              },
              {
                q: 21,
                text: "Courage can be learned once its origins in a sense of responsibility are understood.",
              },
              {
                q: 22,
                text: "It is possible to overcome shyness when faced with the need to speak in public.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center gap-2 mt-4">
                <span className="">
                  {q}. {renderText(text)}
                </span>

                <select
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="w-20 border-2 border-gray-300 rounded-md px-2 py-2"
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* ================= Questions 23–26 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 23–26")}
            </h2>

            <p>{renderText("Reading Passage 2 has eight sections, A–H.")}</p>
            <p>
              {renderText("Which section contains the following information?")}
            </p>

            {[
              {
                q: 23,
                text: "a mention of how rational thinking enabled someone to achieve physical goals",
              },
              {
                q: 24,
                text: "an account of how someone overcame a sad experience",
              },
              {
                q: 25,
                text: "a description of how someone decided to rethink their academic career path",
              },
              {
                q: 26,
                text: "an example of how someone risked his career out of a sense of duty",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center gap-3 mt-4">
                <span className="">
                  {q}. {renderText(text)}
                </span>

                <select
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="w-20 border-2 border-gray-300 rounded-md px-2 py-2"
                >
                  <option value="">{q}</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
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
                    {renderText("Your Score: ")}
                    {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (14–26)")}
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
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{userAnswers[num]}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
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
      <Reading4Pagination2015></Reading4Pagination2015>
    </div>
  );
};

export default Reading4Part22015;
