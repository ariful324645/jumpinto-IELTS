import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2021 from "../Pagination 2021/Reading2Pagination2021";

const Reading2Part32021 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [openScript, setOpenScript] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [currentChunk, setCurrentChunk] = useState(null);

  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // result marks display
  const [showResult, setShowResult] = useState(false);
  const questions = [
    // Questions 11–12
    {
      qNum: 11,
      text: "According to Megan, what are the TWO main advantages of working in the agriculture and horticulture sectors?",
      options: ["A", "B", "C", "D", "E"],
    },
    // Questions 13–14
    {
      qNum: 13,
      text: "Which TWO of the following are likely to be disadvantages for people working outdoors?",
      options: ["A", "B", "C", "D", "E"],
    },
    // Questions 15–20
    {
      qNum: 15,
      text: "Fresh food commercial manager",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 16,
      text: "Agronomist",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 17,
      text: "Fresh produce buyer",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 18,
      text: "Garden centre sales manager",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 19,
      text: "Tree technician",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
    {
      qNum: 20,
      text: "Farm worker",
      options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 11;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  const speakerText = (line, lineIdx) => {
    const chunks = Array.isArray(line.text) ? line.text : [line.text];
    return (
      <h3 key={lineIdx} className="text-lg">
        <span className="font-bold">{line.speaker}:</span>{" "}
        {chunks.map((chunk, idx) => {
          const chunkNumber = typeof chunk === "string" ? null : chunk.number;
          return (
            <span
              key={idx}
              className={`ml-2 ${
                lineIdx === currentLine && idx === currentChunk
                  ? "bg-green-200"
                  : highlight && chunkNumber
                  ? "bg-yellow-100"
                  : "bg-transparent"
              }`}
            >
              {renderText(chunk)}{" "}
              {chunkNumber &&
                highlight &&
                !(lineIdx === currentLine && idx === currentChunk) && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white">
                    {chunkNumber}
                  </span>
                )}
              {chunkNumber &&
                lineIdx === currentLine &&
                idx === currentChunk && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-green-700 rounded-sm text-white ">
                    {chunkNumber}
                  </span>
                )}
            </span>
          );
        })}
      </h3>
    );
  };

  // ---- Voice function ----
  const handleVoice = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentLine(null);
      setCurrentChunk(null);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    const getVoice = (speaker) => {
      if (!voices.length) return null;

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "RUSS") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "JOY PARKINS") {
        return (
          voices.find((v) => v.name.includes("Aria")) ||
          voices.find((v) => v.name.includes("Jenny")) ||
          voices.find((v) => v.name.includes("Ana")) ||
          voices.find((v) => v.name.includes("Female")) ||
          voices[0]
        );
      }

      return voices[0];
    };

    let lineIndex = 0;
    let chunkIndex = 0;
    setIsSpeaking(true);
    const speakNextChunk = () => {
      if (lineIndex >= lines.length) {
        setIsSpeaking(false);
        setCurrentLine(null);
        setCurrentChunk(null);
        return;
      }
      const line = lines[lineIndex];
      const chunks = Array.isArray(line.text) ? line.text : [line.text];
      if (chunkIndex >= chunks.length) {
        lineIndex++;
        chunkIndex = 0;
        speakNextChunk();
        return;
      }
      setCurrentLine(lineIndex);
      setCurrentChunk(chunkIndex);
      const chunk = chunks[chunkIndex];
      const text = typeof chunk === "string" ? chunk : chunk.text;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = getVoice(line.speaker);
      utterance.rate = 1;
      utterance.onend = () => {
        chunkIndex++;
        speakNextChunk();
      };
      window.speechSynthesis.speak(utterance);
    };
    speakNextChunk();
  };
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);
  // Marks show
  const correctAnswers = {
    // Questions 27–30: Multiple Choice (A–D)
    27: "B", // A basic assumption about wisdom may be wrong.
    28: "C", // The importance of certain influences on it was underestimated.
    29: "B", // Will be different in different circumstances.
    30: "D", // A recommended strategy that can help people to reason wisely.

    // Questions 31–35: Summary Completion (A–J)
    31: "D", // modesty (intellectual humility)
    32: "A", // opinions
    33: "C", // view
    34: "F", // objectivity
    35: "G", // fairness

    // Questions 36–40: TRUE / FALSE / NOT GIVEN
    36: "FALSE", // Students were instructed, not allowed to choose
    37: "NOT GIVEN", // No information about participants' awareness
    38: "NOT GIVEN", // Relationship length not mentioned as a factor
    39: "TRUE", // Detached viewpoint led to wiser reasoning
    40: "TRUE", // Intelligence has only a small influence
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev };

      // If it's a multiple-answer question
      if (Array.isArray(correctAnswers[id])) {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];

        if (prevAnswers.includes(value)) {
          // Uncheck: remove from array
          updated[id] = prevAnswers.filter((ans) => ans !== value);
        } else {
          // Check: add to array
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-answer question
        updated[id] = value;
      }

      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const correct = correctAnswers[key];
      const user = answers[key];

      // 🟢 CASE 1: Choose TWO letters (array)
      if (Array.isArray(correct)) {
        if (
          Array.isArray(user) &&
          correct.length === user.length &&
          correct.every((val) => user.includes(val))
        ) {
          newScore += 1;
        }
      }

      // 🟢 CASE 2: Single answer (string)
      else {
        if (
          typeof user === "string" &&
          user.trim().toLowerCase() === correct.trim().toLowerCase()
        ) {
          newScore += 1;
        }
      }
    });

    setScore(newScore);
    localStorage.setItem("/listening2Part32015", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22021");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
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
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 27-40")}
              </span>
              {renderText(" which are based on Reading Passage 3 below.")}
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("How to make wise decisions")}
            </h1>

            <p className="text-lg">
              {renderText(
                "Across cultures, wisdom has been considered one of the most revered human qualities. Although the truly wise may seem few and far between, empirical research examining wisdom suggests that it isn't an exceptional trait possessed by a small handful of bearded philosophers after all - in fact, the latest studies suggest that most of us have the ability to make wise decisions, given the right context."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  27
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  '"It appears that experiential, situational, and cultural factors are even more powerful in shaping wisdom than previously imagined," says Associate Professor Igor Grossmann of the University of Waterloo in Ontario, Canada.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    28
                  </span>
                )}
              </span>
              {renderText(
                ' "Recent empirical findings from cognitive, developmental, social, and personality psychology cumulatively suggest that people\'s ability to reason wisely varies dramatically across experiential and situational contexts."'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  29
                </span>
              )}
              {renderText(
                '"Understanding the role of such contextual factors offers unique insights into understanding wisdom in daily life, as well as how it can be enhanced and taught."'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'It seems that it\'s not so much that some people simply possess wisdom and others lack it, but that our ability to reason wisely depends on a variety of external factors. "It is impossible to characterize thought processes attributed to wisdom without considering the role of contextual factors," explains Grossmann. "In other words, wisdom is not solely an "inner quality" but rather unfolds as a function of situations people happen to be in. Some situations are more likely to promote wisdom than others."'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Coming up with a definition of wisdom is challenging, but Grossmann and his colleagues have identified four key characteristics as part of a framework of wise reasoning. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One is intellectual humility or recognition of the limits of our own knowledge, and another is appreciation of perspectives wider than the issue at hand."
                )}
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      31
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      32
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      33
                    </span>
                  </>
                )}
              </span>
              {renderText(
                " Sensitivity to the possibility of change in social relations is also key, along with compromise or integration of different attitudes and beliefs."
              )}
            </p>

            <br />
            <p className="text-lg">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Grossmann and his colleagues have also found that one of the most reliable ways to support wisdom in our own day-to-day decisions is to look at scenarios from a third-party perspective, as though giving advice to a friend."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    30
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Research suggests that when adopting a first-person viewpoint we focus on 'the focal features of the environment' and when we adopt a third-person, 'observer' viewpoint we reason more broadly and focus more on interpersonal and moral ideals such as justice and impartiality."
                )}
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                      34
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      35
                    </span>
                  </>
                )}
              </span>
              {renderText(
                " Looking at problems from this more expansive viewpoint appears to foster cognitive processes related to wise decisions."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "What are we to do, then, when confronted with situations like a disagreement with a spouse or negotiating a contract at work, that require us to take a personal stake? Grossmann argues that even when we aren't able to change the situation, we can still evaluate these experiences from different perspectives."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "For example, in one experiment that took place during the peak of a recent economic recession, graduating college seniors were asked to reflect on their job prospects. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  'The students were instructed to imagine their career either "as if you were a distant observer" or "before your own eyes as if you were right there".'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    36
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Participants in the group assigned to the 'distant observer' role displayed more wisdom-related reasoning (intellectual humility and recognition of change) than did participants in the control group."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    39
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In another study, couples in long-term romantic relationships were instructed to visualize an unresolved relationship conflict either through the eyes of an outsider or from their own perspective. Participants then discussed the incident with their partner for 10 minutes, after which they wrote down their thoughts about it. Couples in the \"other's eyes\" condition were significantly more likely to rely on wise reasoning—recognizing others' perspectives and searching for a compromise—compared to the couples in the egocentric condition."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"Ego-decentering promotes greater focus on others and enables a bigger picture, conceptual view of the experience, affording recognition of intellectual humility and change," says Grossmann.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "We might associate wisdom with intelligence or particular personality traits, but research shows only a small positive relationship between wise thinking and crystallized intelligence and the personality traits of openness and agreeableness."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                  40
                </span>
              )}
              {renderText(
                " \"It is remarkable how much people can vary in their wisdom from one situation to the next, and how much stronger such contextual effects are for understanding the relationship between wise judgment and its social and affective outcomes as compared to the generalized 'traits',\" Grossmann explains. \"That is, knowing how wisely a person behaves in a given situation is more informative for understanding their emotions or likelihood to forgive [or] retaliate as compared to knowing whether the person may be wise 'in general'.\""
              )}
            </p>
          </div>

          {/* highlight modal */}
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

        {/* RIGHT SIDE */}
        {/* ---------- Questions 11–12 ---------- */}
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ---------- Questions 27–30: Multiple Choice ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27–30")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </p>

            {[
              {
                qNum: 27,
                question:
                  "What point does the writer make in the first paragraph?",
                options: [
                  "A. Wisdom appears to be unique to the human race.",
                  "B. A basic assumption about wisdom may be wrong.",
                  "C. Concepts of wisdom may depend on the society we belong to.",
                  "D. There is still much to be discovered about the nature of wisdom.",
                ],
              },
              {
                qNum: 28,
                question:
                  "What does Igor Grossmann suggest about the ability to make wise decisions?",
                options: [
                  "A. It can vary greatly from one person to another.",
                  "B. Earlier research into it was based on unreliable data.",
                  "C. The importance of certain influences on it was underestimated.",
                  "D. Various branches of psychology define it according to their own criteria.",
                ],
              },
              {
                qNum: 29,
                question:
                  "According to the third paragraph, Grossmann claims that the level of wisdom an individual shows",
                options: [
                  "A. can be greater than they think it is.",
                  "B. will be different in different circumstances.",
                  "C. may be determined by particular aspects of their personality.",
                  "D. should develop over time as a result of their life experiences.",
                ],
              },
              {
                qNum: 30,
                question: "What is described in the fifth paragraph?",
                options: [
                  "A. a difficulty encountered when attempting to reason wisely",
                  "B. an example of the type of person who is likely to reason wisely",
                  "C. a controversial view about the benefits of reasoning wisely",
                  "D. a recommended strategy that can help people to reason wisely",
                ],
              },
            ].map(({ qNum, question, options }) => (
              <div key={qNum} className="mb-6">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(question)}
                </p>
                {options.map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-3 cursor-pointer mb-1"
                    >
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={value}
                        checked={userAnswers[qNum] === value}
                        onChange={(e) =>
                          handleInputChange(qNum, e.target.value)
                        }
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt.replace(/^.\s/, ""))}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ---------- Questions 31–35: Summary Completion ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 31–35")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Complete the summary using the list of letters below."
              )}
            </p>

            {/* Letter List */}
            <div className="border border-gray-400 rounded-md p-4 mb-6 max-w-[180px] mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-3">
                {renderText("List of Words")}
              </h3>
              <ul className="space-y-1 text-center">
                {[
                  "A. opinions",
                  "B. confidence",
                  "C. view",
                  "D. modesty",
                  "E. problems",
                  "F. objectivity",
                  "G. fairness",
                  "H. experiences",
                  "I. range",
                  "J. reasons",
                ].map((item, idx) => (
                  <li key={idx}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            <div className="border p-5 leading-8">
              <h3 className="font-semibold text-center mb-4">
                {renderText("The characteristics of wise reasoning")}
              </h3>

              <p>
                {renderText(
                  "Igor Grossmann and colleagues have established four characteristics which enable us to make wise decisions. It is important to have a certain degree of"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    31
                  </span>
                  <select
                    value={userAnswers[31] || ""}
                    onChange={(e) => handleInputChange(31, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                      (l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </span>{" "}
                {renderText(
                  " regarding the extent of our knowledge, and to take into account"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    32
                  </span>
                  <select
                    value={userAnswers[32] || ""}
                    onChange={(e) => handleInputChange(32, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                      (l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </span>{" "}
                {renderText(
                  " which may not be the same as our own. We should also be able to take a broad"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    33
                  </span>
                  <select
                    value={userAnswers[33] || ""}
                    onChange={(e) => handleInputChange(33, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                      (l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </span>{" "}
                {renderText(
                  " of any situation. Another key characteristic is being aware of the likelihood of alterations in the way that people relate to each other."
                )}
              </p>

              <br />

              <p>
                {renderText(
                  "Grossmann also believes that it is better to regard scenarios with"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    34
                  </span>
                  <select
                    value={userAnswers[34] || ""}
                    onChange={(e) => handleInputChange(34, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                      (l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </span>
                .{" "}
                {renderText(
                  "By avoiding the first-person perspective, we focus more on"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    35
                  </span>
                  <select
                    value={userAnswers[35] || ""}
                    onChange={(e) => handleInputChange(35, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                      (l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </span>{" "}
                {renderText(
                  " and on other moral ideals, which in turn leads to wiser decision-making."
                )}
              </p>
            </div>
          </div>

          {/* ---------- Questions 36–40: TRUE / FALSE / NOT GIVEN ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 36–40")}
            </h2>

            {[
              {
                qNum: 36,
                text: "Students participating in the job prospects experiment could choose one of two perspectives to take.",
              },
              {
                qNum: 37,
                text: "Participants in the couples experiment were aware that they were taking part in a study about wise reasoning.",
              },
              {
                qNum: 38,
                text: "In the couples experiments, the length of the couples' relationships had an impact on the results.",
              },
              {
                qNum: 39,
                text: "In both experiments, participants who adopted a more detached viewpoint tended to make wiser decisions.",
              },
              {
                qNum: 40,
                text: "Grossmann believes that a person's wisdom is determined by their intelligence to only a very limited extent.",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="mb-4">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(text)}
                </p>
                <div className="flex flex-col gap-1 ml-4">
                  {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={option}
                        checked={userAnswers[qNum] === option}
                        onChange={() => handleInputChange(qNum, option)}
                      />
                      {option}
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
                    All Answers (27–40)
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
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
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
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
      <Reading2Pagination2021></Reading2Pagination2021>
    </div>
  );
};

export default Reading2Part32021;
