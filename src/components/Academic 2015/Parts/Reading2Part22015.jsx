import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading2Pagination2015 from "../Pagination 2015/Reading2Pagination2015";

//  Marks show

const Reading2Part22015 = () => {
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
    // =========== Questions 1–7 (Paragraph headings) ===========
    1: "i", // Paragraph A → The search for the reasons for an increase in population
    2: "ii", // Paragraph B → Industrialisation and the fear of unemployment
    3: "iii", // Paragraph C → The development of cities in Japan
    4: "iv", // Paragraph D → The time and place of the Industrial Revolution
    5: "v", // Paragraph E → The cases of Holland, France and China
    6: "vi", // Paragraph F → Changes in drinking habits in Britain
    7: "vii", // Paragraph G → Two keys to Britain's industrial revolution

    // =========== Questions 8–13 (TRUE / FALSE / NOT GIVEN) ===========
    8: "TRUE", // China's transport system was not suitable for industry in the 18th century
    9: "TRUE", // Tea and beer both helped to prevent dysentery in Britain
    10: "FALSE", // Roy Porter disagrees with Professor Macfarlane's findings
    11: "FALSE", // After 1740, there was a reduction in population in Britain
    12: "TRUE", // People in Britain used to make beer at home
    13: "TRUE", // The tax on malt indirectly caused a rise in the death rate
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

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
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

          <div>
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              {renderText("Gifted children and learning")}
            </h1>

            {/* A */}
            <p className="font-bold mb-1">{renderText("A")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Internationally, 'giftedness' is most frequently determined by a score on a general intelligence test, known as an IQ test, which is above a chosen cut-off point, usually at around the top 2–5%. Children's educational environment contributes to the IQ score and the way intelligence is used. For example, a very close positive relationship was found when children's IQ scores were compared with their home educational provision (Freeman, 2010). The higher the children's IQ scores, especially over IQ 130, the better the quality of their educational backup, measured in terms of reported verbal interactions with parents, number of books and activities in their home etc."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Because IQ tests are decidedly influenced by what the child has learned, they are to some extent measures of current achievement based on age-norms; that is, how well the children have learned to manipulate their knowledge and know-how within the terms of the test. The vocabulary aspect, for example, is dependent on having heard those words. But IQ tests can neither identify the processes of learning and thinking nor predict creativity."
              )}
            </p>

            {/* B */}
            <p className="font-bold mb-1">{renderText("B")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Excellence does not emerge without appropriate help. To reach an exceptionally high standard in any area very able children need the means to learn, which includes material to work with and focused challenging tuition – and the encouragement to follow their dream. There appears to be a qualitative difference in the way the intellectually highly able think, compared with more average-ability or older pupils, for whom external regulation by the teacher often compensates for lack of internal regulation."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "To be at their most effective in their self-regulation, all children can be helped to identify their own ways of learning – metacognition – which will include strategies of planning, monitoring, evaluation, and choice of what to learn. Emotional awareness is also part of metacognition, so children should be helped to be aware of their feelings around the area to be learned, feelings of curiosity or confidence, for example."
              )}
            </p>

            {/* C */}
            <p className="font-bold mb-1">{renderText("C")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "High achievers have been found to use self-regulatory learning strategies more often and more effectively than lower achievers, and are better able to transfer these strategies to deal with unfamiliar tasks. This happens to such a high degree in some children that they appear to be demonstrating talent in particular areas."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Overviewing research on the thinking process of highly able children, Shore and Kanevsky (1993) put the instructor's problem succinctly: 'If they merely think more quickly, then we need only teach more quickly. If they merely make fewer errors, then we can shorten the practice'. But of course, this is not entirely the case; adjustments have to be made in methods of learning and teaching, to take account of the many ways individuals think."
              )}
            </p>

            {/* D */}
            <p className="font-bold mb-1">{renderText("D")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "Yet in order to learn by themselves, the gifted do need some support from their teachers. Conversely, teachers who have a tendency to 'overdirect' can diminish their gifted pupils' learning autonomy. Although 'spoon-feeding' can produce extremely high examination results, these are not always followed by equally impressive life successes."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Too much dependence on the teacher risks loss of autonomy and motivation to discover. However, when teachers help pupils to reflect on their own learning and thinking activities, they increase their pupils' self-regulation. Given that a fundamental goal of education is to transfer the control of learning from teachers to pupils, improving pupils' learning to learn techniques should be a major outcome of the school experience, especially for the highly competent."
              )}
            </p>

            {/* E */}
            <p className="font-bold mb-1">{renderText("E")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "But scientific progress is not all theoretical; knowledge is also vital to outstanding performance: individuals who know a great deal about a specific domain will achieve at a higher level than those who do not. Research with creative scientists by Simonton (1988) brought him to the conclusion that above a certain high level, characteristics such as independence seemed to contribute more to reaching the highest levels of expertise than intellectual skills."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "Creativity in all forms can be seen as expertise mixed with a high level of motivation."
              )}
            </p>

            {/* F */}
            <p className="font-bold mb-1">{renderText("F")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "To sum up, learning is affected by emotions of both the individual and significant others. Positive emotions facilitate the creative aspects of learning and negative emotions inhibit it. Fear, for example, can limit the development of curiosity, which is a strong force in scientific advance."
              )}
            </p>
            <p className="text-lg mb-5">
              {renderText(
                "In Boekaerts' (1991) review of emotion in the learning of very high IQ and highly achieving children, she found emotional forces in harness. They were not only curious, but often had a strong desire to control their environment, improve their learning efficiency, and increase their own learning resources."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 14–17 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 14–17")}
            </h2>

            <p>{renderText("Reading Passage 2 has six paragraphs, A–F.")}</p>
            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A–F, in boxes 14–17 on your answer sheet."
              )}
            </p>
            <p>{renderText("NB You may use any letter more than once.")}</p>

            {[
              {
                q: 14,
                text: "a reference to the influence of the domestic background on the gifted child",
              },
              {
                q: 15,
                text: "reference to what can be lost if learners are given too much guidance",
              },
              { q: 16, text: "a reference to the damaging effects of anxiety" },
              {
                q: 17,
                text: "examples of classroom techniques which favour socially-disadvantaged children",
              },
            ].map(({ q, text }) => (
              <p key={q} className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-lg">{renderText(`${q}.`)}</span>
                <span>{renderText(text)}</span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10"
                  >
                    <option value="">{q}</option>
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}

            {/* ================= Questions 18–22 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 18–22")}
            </h2>
            <p>
              {renderText(
                "Look at the following statements (Questions 18–22) and the list of people below."
              )}
            </p>
            <p>
              {renderText(
                "Match each statement with the correct person or people, A–E."
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A–E, next to Questions 18–22."
              )}
            </p>

            <div className="border border-black p-5 max-w-sm text-center mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                {renderText("List of People")}
              </h3>
              <ul className="space-y-1 text-lg">
                <li>{renderText("A. Freeman")}</li>
                <li>{renderText("B. Shore and Kanevsky")}</li>
                <li>{renderText("C. Elshout")}</li>
                <li>{renderText("D. Simonton")}</li>
                <li>{renderText("E. Boekaerts")}</li>
              </ul>
            </div>

            {[
              {
                q: 18,
                text: "Less time can be spent on exercises with gifted pupils who produce accurate work.",
              },
              {
                q: 19,
                text: "Self-reliance is a valuable tool that helps gifted students reach their goals.",
              },
              {
                q: 20,
                text: "Gifted children know how to channel their feelings to assist their learning.",
              },
              {
                q: 21,
                text: "The very gifted child benefits from appropriate support from close relatives.",
              },
              {
                q: 22,
                text: "Really successful students have learnt a considerable amount about their subject.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex items-center flex-wrap">
                <span className="font-bold text-lg">{renderText(`${q}.`)}</span>
                <span>{renderText(text)}</span>

                {/* Dropdown only */}
                <div className="relative w-20 ml-2">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-2 py-2 pr-8"
                  >
                    <option value="">{q}</option>
                    {["A", "B", "C", "D", "E"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            ))}

            {/* ================= Questions 23–26 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 23–26")}
            </h2>
            <p>{renderText("Complete the sentences below.")}</p>
            <p>
              {renderText(
                "Choose NO MORE THAN TWO WORDS from the passage for each answer."
              )}
            </p>
            <p>
              {renderText(
                "Write your answers in boxes 23–26 on your answer sheet."
              )}
            </p>

            {[
              {
                q: 23,
                text: "One study found a strong connection between children's IQ and the availability of ___ and ___ at home.",
              },
              {
                q: 24,
                text: "Children of average ability seem to need more direction from teachers because they do not have ___.",
              },
              {
                q: 25,
                text: "Metacognition involves children understanding their own learning strategies, as well as developing ___.",
              },
              {
                q: 26,
                text: "Teachers who rely on what is known as ___ often produce sets of impressive grades in class tests.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>
                <input
                  type="text"
                  value={userAnswers[q] || ""}
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-4 w-20 py-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Reading2Pagination2015></Reading2Pagination2015>
    </div>
  );
};

export default Reading2Part22015;
