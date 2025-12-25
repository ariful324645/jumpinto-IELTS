import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading1Pagination2015 from "../Pagination 2015/Reading1Pagination2015";

//  Marks show

const Reading1Part32015 = () => {
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
    // =========== Questions 27–30 (Multiple Choice) ===========
    27: "C", // having a shared objective
    28: "B", // brought complementary skills to their partnership
    29: "C", // promote loyalty to a group
    30: "B", // feel that their contributions are valued

    // =========== Questions 31–35 (Sentence Completion) ===========
    31: "G", // remain in their jobs
    32: "E", // avoid risk
    33: "C", // become competitive
    34: "F", // ignore their duties
    35: "A", // take chances

    // =========== Questions 36–40 (YES / NO / NOT GIVEN) ===========
    36: "YES",
    37: "YES",
    38: "NO",
    39: "NOT GIVEN",
    40: "NO",
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
            <h1 className="text-xl font-bold">{renderText("PASSAGE 3")}</h1>
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
                "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("The psychology of innovation")}
            </h1>

            <p className="italic text-center mb-6">
              {renderText("Why are so few companies truly innovative?")}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Innovation is key to business survival, and companies put substantial resources into inspiring employees to develop new ideas. There are, nevertheless, people working in luxurious, state-of-the-art centres designed to stimulate innovation who find that their environment doesn't make them feel at all creative. And there are those who don't have a budget, or much space, but who innovate successfully."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "For Robert B. Cialdini, Professor of Psychology at Arizona State University, one reason that companies don't succeed as often as they should is that innovation starts with recruitment. Research shows that the fit between an employee's values and a company's values makes a difference to what contribution they make and whether, two years after they join, they're still at the company. Studies at Harvard Business School show that, although some individuals may be more creative than others, almost every individual can be creative in the right circumstances."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "One of the most famous photographs in the story of rock'n'roll emphasises Cialdini's views. The 1956 picture of singers Elvis Presley, Carl Perkins, Johnny Cash and Jerry Lee Lewis jamming at a piano in Sun Studios in Memphis tells a hidden story. Missing from the picture is Roy Orbison, a greater natural singer than Lewis, Perkins or Cash. Sam Phillips, who owned Sun, wanted to revolutionise popular music with songs that fused black and white music, and country and blues. Presley, Cash, Perkins and Lewis instinctively understood Phillips's ambition and believed in it. Orbison wasn't inspired by the goal, and only ever achieved one hit with the Sun label."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "The value fit matters, says Cialdini, because innovation is, in part, a process of change, and under that pressure we, as a species, behave differently. 'When things change, we are hard-wired to play it safe.' Managers should therefore adopt an approach that appears counter-intuitive – they should explain what stands to be lost if the company fails to seize a particular opportunity. Studies show that we invariably take more gambles when threatened with a loss than when offered a reward."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Managing innovation is a delicate art. It's easy for a company to be pulled in conflicting directions as the marketing, product development, and finance departments each get different feedback from different sets of people. And without a system which ensures collaborative exchanges within the company, it's also easy for small 'pockets of innovation' to disappear. Innovation is a contact sport. You can't brief people just by saying, 'We're going in this direction and I'm going to take you with me.'"
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Cialdini believes that this 'follow-the-leader syndrome' is dangerous, not least because it encourages bosses to go it alone. 'It's been scientifically proven that three people will be better than one at solving problems, even if that one person is the smartest person in the field.' To prove his point, Cialdini cites an interview with molecular biologist James Watson. Watson, together with Francis Crick, discovered the structure of DNA, the genetic information carrier of all living organisms. 'When asked how they had cracked the code ahead of an array of highly accomplished rival investigators, he said something that stunned me. He said he and Crick had succeeded because they were aware that they weren't the most intelligent of the scientists pursuing the answer. The smartest scientist was called Rosalind Franklin who, Watson said,"
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Teamwork taps into one of the basic drivers of human behaviour. 'The principle of social proof is so pervasive that we don't even recognise it,' says Cialdini. 'If your project is being resisted, for example, by a group of veteran employees, ask another old-timer to speak up for it.' Cialdini is not alone in advocating this strategy. Research shows that peer power, used horizontally not vertically, is much more powerful than any boss's speech."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Writing, visualising and prototyping can stimulate the flow of new ideas. Cialdini cites scores of research papers and historical events that prove that even something as simple as writing deepens every individual's engagement in the project. It is, he says, the reason why all those competitions on breakfast cereal packets encouraged us to write in saying, in no more than 10 words: 'I like Kellogg's Corn Flakes because...' The very act of writing makes us more likely to believe it."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Authority doesn't have to inhibit innovation but it often does. The wrong kind of leadership will lead to what Cialdini calls 'captainitis, the regrettable tendency of team members to opt out of team responsibilities that are properly theirs'. He calls it captainitis because, he says, 'crew members of multipilot aircraft exhibit a sometimes deadly passivity when the flight captain makes a clearly wrong-headed decision'. This behaviour is not, he says, unique to air travel, but can happen in any workplace where the leader is overbearing."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "At the other end of the scale is the 1980s Memphis design collective, a group of young designers for whom 'the only rule was that there were no rules'. This environment encouraged a free interchange of ideas, which led to more creativity with form, function, colour and materials that revolutionised attitudes to furniture design."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Many theorists believe the ideal boss should lead from behind, taking pride in collective accomplishment and giving credit where it is due. Cialdini says: 'Leaders should encourage everyone to contribute and simultaneously assure all concerned that every recommendation is important to making the right decision and will be given full attention.' The frustrating thing about innovation is that there are many approaches, but no magic formula. However, a manager who wants to create a truly innovative culture can make their job a lot easier by recognising these psychological realities."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 27–30 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 27–30")}
            </h2>

            <p>{renderText("Choose the correct letter, A, B, C or D.")}</p>

            {[
              {
                q: 27,
                text: "The example of the 'million-dollar quartet' underlines the writer's point about",
                options: [
                  "recognising talent.",
                  "working as a team.",
                  "having a shared objective.",
                  "being an effective leader.",
                ],
              },
              {
                q: 28,
                text: "James Watson suggests that he and Francis Crick won the race to discover the DNA code because they",
                options: [
                  "were conscious of their own limitations.",
                  "brought complementary skills to their partnership.",
                  "were determined to outperform their brighter rivals.",
                  "encouraged each other to realise their joint ambition.",
                ],
              },
              {
                q: 29,
                text: "The writer mentions competitions on breakfast cereal packets as an example of how to",
                options: [
                  "inspire creative thinking.",
                  "generate concise writing.",
                  "promote loyalty to a group.",
                  "strengthen commitment to an idea.",
                ],
              },
              {
                q: 30,
                text: "In the last paragraph, the writer suggests that it is important for employees to",
                options: [
                  "be aware of their company's goals.",
                  "feel that their contributions are valued.",
                  "have respect for their co-workers' achievements.",
                  "understand why certain management decisions are made.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-2 ml-4">
                  {options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={String.fromCharCode(65 + i)} // A, B, C, D
                        checked={userAnswers[q] === String.fromCharCode(65 + i)}
                        onChange={() =>
                          handleInputChange(q, String.fromCharCode(65 + i))
                        }
                        className="radio radio-primary"
                      />
                      <span>
                        {String.fromCharCode(65 + i)}. {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* ================= Questions 31–35 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 31–35")}
            </h2>

            <p>
              {renderText(
                "Complete each sentence with the correct ending, A–G, below."
              )}
            </p>

            <p className="mb-4">
              {renderText(
                "Choose the correct letter, A–G, next to Questions 31–35."
              )}
            </p>
            <div className="max-w-[220px] mx-auto border text-center p-2">
              <ul className="space-y-2 pl-4">
                <li>{renderText("A. take chances.")}</li>
                <li>{renderText("B. share their ideas.")}</li>
                <li>{renderText("C. become competitive.")}</li>
                <li>{renderText("D. get promotion.")}</li>
                <li>{renderText("E. avoid risk.")}</li>
                <li>{renderText("F. ignore their duties.")}</li>
                <li>{renderText("G. remain in their jobs.")}</li>
              </ul>
            </div>

            {[
              {
                q: 31,
                text: "Employees whose values match those of their employers are more likely to",
              },
              { q: 32, text: "At times of change, people tend to" },
              {
                q: 33,
                text: "If people are aware of what they might lose, they will often",
              },
              {
                q: 34,
                text: "People working under a dominant boss are liable to",
              },
              {
                q: 35,
                text: "Employees working in organisations with few rules are more likely to",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="relative ml-4 inline-block">
                  <select
                    value={userAnswers[q] || ""}
                    onChange={(e) => handleInputChange(q, e.target.value)}
                    className="appearance-none border-2 border-gray-300 rounded-md px-3 py-2 pr-8 text-sm"
                  >
                    <option value="" disabled>
                      {q}
                    </option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* caret inside input */}
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    ^
                  </span>
                </div>
              </div>
            ))}

            {/* ================= Questions 36–40 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 36–40")}
            </h2>

            <p>
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 3?"
              )}
            </p>
            <p>{renderText("In boxes 36-40 on your answer sheet, choose")}</p>

            <ul className="ml-6 text-lg space-y-1">
              <li>
                <strong>YES</strong> –{" "}
                {renderText(
                  "if the statement agrees with the claims of the writer"
                )}
              </li>
              <li>
                <strong>NO</strong> –{" "}
                {renderText(
                  "if the statement contradicts the claims of the writer"
                )}
              </li>
              <li>
                <strong>NOT GIVEN</strong> –{" "}
                {renderText(
                  "if it is impossible to say what the writer thinks about this"
                )}
              </li>
            </ul>

            {[
              {
                q: 36,
                text: "The physical surroundings in which a person works play a key role in determining their creativity.",
              },
              { q: 37, text: "Most people have the potential to be creative." },
              {
                q: 38,
                text: "Teams work best when their members are of equally matched intelligence.",
              },
              {
                q: 39,
                text: "It is easier for smaller companies to be innovative.",
              },
              {
                q: 40,
                text: "A manager's approval of an idea is more persuasive than that of a colleague.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="space-y-2 mt-4">
                <p className="text-lg font-medium">
                  {q}. {renderText(text)}
                </p>

                <div className="flex flex-col gap-2 ml-4">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() => handleInputChange(q, opt)}
                        className="radio radio-primary"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Reading1Pagination2015></Reading1Pagination2015>
    </div>
  );
};

export default Reading1Part32015;
