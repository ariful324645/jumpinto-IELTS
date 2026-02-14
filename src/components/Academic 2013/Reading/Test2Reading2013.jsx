import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2013 from "../Pagination 2013/Reading2Pagination2013";

const Test2Reading2013 = () => {
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
    // Questions 1–6 (Section Matching A-I)
    1: "H",
    2: "C",
    3: "E",
    4: "I",
    5: "F",
    6: "B",

    // Questions 7–10 (NO MORE THAN TWO WORDS AND/OR A NUMBER)
    7: "30 years",
    8: "traffic",
    9: "hidden hearing loss",
    10: "Action Plan",

    // Questions 11–12 (Choose TWO letters)
    "11-12": ["A", "D"],

    // Question 13 (MCQ A-D)
    13: "C",
  };

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "11-12") {
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
            <h1 className="text-xl font-bold">PASSAGE 1</h1>
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
              {renderText(
                "Classroom Noise and Auditory Function Deficits in Children",
              )}
            </h1>

            {/* Section A */}
            <p className="text-lg">
              {renderText(
                "Hearing impairment or other auditory function deficit in young children can have a major impact on their development of speech and communication, resulting in a detrimental effect on their ability to learn at school.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This is likely to have major consequences for the individual and the population as a whole.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("1")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The New Zealand Ministry of Health has found from research carried out over two decades that 6-10% of children in that country are affected by hearing loss.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("2")}
                  </span>
                )}
              </span>

              {renderText("6,7")}
            </p>

            {/* Section B */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "A preliminary study in New Zealand has shown that classroom noise presents a major concern for teachers and pupils.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("3")}
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Modern teaching practices, the organisation of desks in the classroom, poor classroom acoustics, and mechanical means of ventilation such as air-conditioning units all contribute to the number of children unable to comprehend the teacher's voice.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")},{renderText("12")}
                  </span>
                )}
              </span>

              {renderText(
                "Education researchers Nelson and Soli have also suggested that recent trends in learning often involve collaborative interaction of multiple minds and tools as much as individual possession of information.",
              )}

              {renderText("3")}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "This all amounts to heightened activity and noise levels, which have the potential to be particularly serious for children experiencing auditory function deficit.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("6")}
                  </span>
                )}
              </span>

              {renderText(
                "Noise in classrooms can only exacerbate their difficulty in comprehending and processing verbal communication with other children and instructions from the teacher.",
              )}
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "Children with auditory function deficit are potentially failing to learn to their maximum potential because of noise levels generated in classrooms.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The effects of noise on the ability of children to learn effectively in typical classroom environments are now the subject of increasing concern.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>

              {renderText(
                "The International Institute of Noise Control Engineering (WNCE), on the advice of the World Health Organization, has established an international working party, which includes New Zealand, to evaluate noise and reverberation control for school rooms.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "While the detrimental effects of noise in classroom situations are not limited to children experiencing disability, those with a disability that affects their processing of speech and verbal communication could be extremely vulnerable.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "The auditory function deficits in question include hearing impairment, autistic spectrum disorders (ASD) and attention deficit disorders (ADD / ADHD).",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>

              {renderText("5")}
            </p>

            {/* Section E */}
            <p className="text-lg">
              {renderText(
                "Autism is considered a neurological and genetic life-long disorder that causes discrepancies in the way information is processed.",
              )}
              {renderText(
                "This disorder is characterised by interlinking problems with social imagination, social communication and social interaction.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "According to Janzen, this affects the ability to understand and relate in typical ways to people, understand events and objects in the environment, and understand or respond to sensory stimuli.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("11")}
                  </span>
                )}
              </span>

              {renderText(
                "Autism does not allow learning or thinking in the same ways as in children who are developing normally.",
              )}
              {renderText(
                "Autistic spectrum disorders often result in major difficulties in comprehending verbal information and speech processing.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Those experiencing these disorders often find sounds such as crowd noise and the noise generated by machinery painful and distressing.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("12")}
                  </span>
                )}
              </span>

              {renderText("8")}

              {renderText(
                "This is difficult to scientifically quantify as such extra-sensory stimuli vary greatly from one autistic individual to another.",
              )}
              {renderText(
                "But a child who finds any type of noise in their classroom or learning space intrusive is likely to be adversely affected in their ability to process information.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "The attention deficit disorders are indicative of neurological and genetic disorders and are characterised by difficulties with sustaining attention, effort and persistence, organisation skills and disinhibition.",
              )}

              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Children experiencing these disorders find it difficult to screen out unimportant information, and focus on everything in the environment rather than attending to a single activity.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("13")}
                  </span>
                )}
              </span>

              {renderText(
                "Background noise in the classroom becomes a major distraction, which can affect their ability to concentrate.",
              )}
            </p>

            {/* Section G */}
            <p className="text-lg">
              {renderText(
                "Children experiencing an auditory function deficit can often find speech and communication very difficult to isolate and process when set against high levels of background noise.",
              )}
              {renderText(
                "These levels come from outside activities that penetrate the classroom structure, from teaching activities, and other noise generated inside, which can be exacerbated by room reverberation.",
              )}
              {renderText(
                "Strategies are needed to obtain the optimum classroom construction and perhaps a change in classroom culture and methods of teaching.",
              )}
              {renderText(
                "In particular, the effects of noisy classrooms and activities on those experiencing disabilities in the form of auditory function deficit need thorough investigation.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It is probable that many undiagnosed children exist in the education system with 'invisible' disabilities.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("9")}
                  </span>
                )}
              </span>
              {renderText(
                "Their needs are less likely to be met than those of children with known disabilities.",
              )}
            </p>

            {/* Section H */}
            <p className="text-lg">
              {renderText(
                "The New Zealand Government has developed a New Zealand Disability Strategy and has embarked on a wide-ranging consultation process.",
              )}
              {renderText("1")}
              {renderText(
                "The strategy recognises that people experiencing disability face significant barriers in achieving a full quality of life in areas such as attitude, education, employment and access to services.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Objective 3 of the New Zealand Disability Strategy is to 'Provide the Best Education for Disabled People' by improving education so that all children, youth learners and adult learners will have equal opportunities to learn and develop within their already existing local school.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("10")}
                  </span>
                )}
              </span>
              {renderText("10")}
              {renderText(
                "For a successful education, the learning environment is vitally significant, so any effort to improve this is likely to be of great benefit to all children, but especially to those with auditory function disabilities.",
              )}
            </p>

            {/* Section I */}
            <p className="text-lg">
              {renderText(
                "A number of countries are already in the process of formulating their own standards for the control and reduction of classroom noise.",
              )}
              {renderText("New Zealand will probably follow their example.")}
              {renderText(
                "The literature to date on noise in school rooms appears to focus on the effects on schoolchildren in general, their teachers and the hearing impaired.",
              )}
              {renderText(
                "Only limited attention appears to have been given to those students experiencing the other disabilities involving auditory function deficit.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It is imperative that the needs of these children are taken into account in the setting of appropriate international standards to be promulgated in future.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("4")}
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
            {renderText("Questions 1–13")}
          </h2>

          <h2 className="mb-3">
            {renderText("Reading Passage 1 has nine sections, A-I.")}
          </h2>

          <h2 className="mb-3">
            {renderText("Which section contains the following information?")}
          </h2>

          <h2 className="mb-3">
            {renderText(
              "Choose the correct letter, A-I, in boxes 1-6 on your answer sheet.",
            )}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            {/* ================= Questions 1–6 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 1–6</h2>

              {[
                {
                  num: 1,
                  text: "an account of a national policy initiative",
                },
                {
                  num: 2,
                  text: "a description of a global team effort",
                },
                {
                  num: 3,
                  text: "a hypothesis as to one reason behind the growth in classroom noise",
                },
                {
                  num: 4,
                  text: "a demand for suitable worldwide regulations",
                },
                {
                  num: 5,
                  text: "a list of medical conditions which place some children more at risk from noise than others",
                },
                {
                  num: 6,
                  text: "the estimated proportion of children in New Zealand with auditory problems",
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-center gap-3 mt-4">
                  <span className="font-bold">{num}.</span>
                  <span>{renderText(text)}</span>

                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Questions 7–10 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 7–10</h2>

              <p className="mt-2">
                {renderText("Answer the questions below.")}
                <br />
                {renderText(
                  "Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
                )}
              </p>

              {[
                {
                  num: 7,
                  text: "For what period of time has hearing loss in schoolchildren been studied in New Zealand?",
                },
                {
                  num: 8,
                  text: "In addition to machinery noise, what other type of noise can upset children with autism?",
                },
                {
                  num: 9,
                  text: "What term is used to describe the hearing problems of schoolchildren which have not been diagnosed?",
                },
                {
                  num: 10,
                  text: "What part of the New Zealand Disability Strategy aims to give schoolchildren equal opportunity?",
                },
              ].map(({ num, text }) => (
                <div key={num} className="mt-4">
                  <p className="font-semibold">
                    {num}. {renderText(text)}
                  </p>

                  <input
                    type="text"
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-3 py-2  mt-2"
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* ================= Questions 11–12 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 11 and 12</h2>

              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–F</span>.
              </p>

              <p className="font-bold mt-3">
                {renderText(
                  "The list below includes factors contributing to classroom noise. Which TWO are mentioned by the writer of the passage?",
                )}
              </p>

              {[
                "current teaching methods",
                "echoing corridors",
                "cooling systems",
                "large class sizes",
                "loud-voiced teachers",
                "playground games",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);
                const selected = userAnswers["11-12"] || [];
                const isChecked = selected.includes(value);
                const isDisabled = selected.length === 2 && !isChecked;

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 mt-2 ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => handleInputChange("11-12", value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Question 13 ================= */}
            <div>
              <h2 className="font-bold text-xl">Question 13</h2>

              <p className="mt-2 font-semibold">
                {renderText(
                  "What is the writer's overall purpose in writing this article?",
                )}
              </p>

              {[
                "to compare different methods of dealing with auditory problems",
                "to provide solutions for overly noisy learning environments",
                "to increase awareness of the situation of children with auditory problems",
                "to promote New Zealand as a model for other countries to follow",
              ].map((opt, idx) => {
                const value = String.fromCharCode(65 + idx);

                return (
                  <label key={idx} className="flex items-center gap-2 mt-2">
                    <input
                      type="radio"
                      name="question13"
                      value={value}
                      checked={userAnswers[13] === value}
                      onChange={(e) => handleInputChange(13, e.target.value)}
                    />
                    <span className="font-semibold">{value}.</span>
                    <span>{renderText(opt)}</span>
                  </label>
                );
              })}
            </div>

            {/* ================= Submit Button + Result ================= */}
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
                  <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                    <h1 className="text-3xl font-bold mb-2">
                      {renderText("Result")}
                    </h1>
                    <p className="text-green-600 text-2xl font-semibold">
                      {renderText("Your Score: ")} {score}/13
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (1–13)")}
                    </h3>

                    <ul className="space-y-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "11-12", 13].map(
                        (num) => {
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
                                {isCorrect ? (
                                  <FaDotCircle className="text-green-600 text-xl font-bold" />
                                ) : (
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
                        },
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Reading2Pagination2013></Reading2Pagination2013>
    </div>
  );
};

export default Test2Reading2013;
