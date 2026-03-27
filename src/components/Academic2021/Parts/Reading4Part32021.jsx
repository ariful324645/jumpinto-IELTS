import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2021 from "../Pagination 2021/Reading4Pagination2021";

const Reading4Part32021 = () => {
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
    27: "iii", // Section A – The superiority of AI projections over those made by humans
    28: "vi", // Section B – Widespread distrust of an AI innovation
    29: "ii", // Section C – Reasons why we have more faith in human judgement than in AI
    30: "i", // Section D – An increasing divergence of attitudes towards AI
    31: "vii", // Section E – Encouraging openness about how AI functions
    32: "v", // Section F – The advantages of involving users in AI processes

    // Questions 33–35: Multiple Choice (A–D)
    33: "C", // highlighting the existence of a problem
    34: "B", // Its complexity makes them feel that they are at a disadvantage
    35: "A", // It leads the public to be mistrustful of AI

    // Questions 36–40: Yes / No / Not Given
    36: "YES", // Subjective depictions of AI in sci-fi films make people change their opinions
    37: "NOT GIVEN", // Portrayals of AI in media likely to become more positive – not stated
    38: "YES", // Rejection of AI possibilities may negatively affect people
    39: "NO", // Familiarity with AI has very little impact – actually it improves trust
    40: "YES",
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
    localStorage.removeItem("/reading2Part22021");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading2Part22021");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          {/* ===== Header ===== */}
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

          {/* ===== Instructions ===== */}
          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on")}
              <span className="font-bold">
                {renderText(" Questions 27–40")}
              </span>
              {renderText(" which are based on Reading Passage 3 below.")}
            </h1>
          </div>

          {/* ===== Passage Text ===== */}
          <div>
            <h1 className="text-2xl font-bold mb-3 text-center">
              {renderText("Attitudes towards Artificial Intelligence")}
            </h1>

            {/* Paragraph A */}
            <p className="text-lg">
              {renderText(
                "Artificial intelligence (AI) can already predict the future. Police forces are using it to map when and where crime is likely to occur. Doctors can use it to predict when a patient is most likely to have a heart attack or stroke. Researchers are even trying to give AI imagination so it can plan for unexpected consequences."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " Many decisions in our lives require a good forecast, and AI is almost always better at forecasting than we are."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    27
                  </span>
                )}
              </span>
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " Yet for all these technological advances, we still seem to deeply lack confidence in AI predictions. Recent cases show that people don't like relying on AI and prefer to trust human experts, even if these experts are wrong."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    33
                  </span>
                )}
              </span>
              {renderText(
                " If we want AI to really benefit people, we need to find a way to get people to trust it. To do that, we need to understand why people are so reluctant to trust AI in the first place."
              )}
            </p>

            <br />

            {/* Paragraph B */}
            <p className="text-lg">
              {renderText(
                "Take the case of Watson for Oncology, one of technology giant IBM's supercomputer programs. Their attempt to promote this program to cancer doctors was a PR disaster."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " The AI promised to deliver top-quality recommendations on the treatment of 12 cancers that accounted for 80% of the world's cases."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    28
                  </span>
                )}
              </span>
              {renderText(
                " But when doctors first interacted with Watson, they found themselves in a rather difficult situation. On the one hand, if Watson provided guidance about a treatment that coincided with their own opinions, physicians did not see much point in Watson's recommendations. The supercomputer was simply telling them what they already knew, and these recommendations did not change the actual treatment. On the other hand, if Watson generated a recommendation that contradicted the experts' opinion, doctors would typically conclude that Watson wasn't competent. And the machine wouldn't be able to explain why its treatment was plausible because its machine-learning algorithms were simply too complex to be fully understood by humans. Consequently, this has caused even more suspicion and disbelief, leading many doctors to ignore the seemingly outlandish AI recommendations and stick to their own expertise."
              )}
            </p>

            <br />

            {/* Paragraph C */}
            <p className="text-lg">
              {renderText(
                "This is just one example of people's lack of confidence in AI and their reluctance to accept what AI has to offer."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " Trust in other people is often based on our understanding of how others think and having experience of their reliability. This helps create a psychological feeling of safety. AI, on the other hand, is still fairly new and unfamiliar to most people. Even if it can be technically explained (and that's not always the case), AI's decision-making process is usually too difficult for most people to comprehend. And interacting with something we don't understand can cause anxiety and give us a sense that we're losing control."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    29
                  </span>
                )}
              </span>
              {renderText(
                " Many people are also simply not familiar with many instances of AI actually working, because it often happens in the background. Instead, they are acutely aware of instances where AI goes wrong. Embarrassing AI failures receive a disproportionate amount of media attention, emphasising the message that we cannot rely on technology. Machine learning is not foolproof, in part because the humans who design it aren't."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    34
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph D */}
            <p className="text-lg">
              {renderText(
                "Feelings about AI run deep. In a recent experiment, people from a range of backgrounds were given various sci-fi films about AI to watch and then asked questions about automation in everyday life. It was found that, regardless of whether the film they watched depicted AI in a positive or negative light, simply watching a cinematic vision of our technological future polarised the participants' attitudes. Optimists became more extreme in their enthusiasm for AI and sceptics became even more guarded."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " This suggests people use relevant evidence about AI in a biased manner to support their existing attitudes, a deep-rooted human tendency known as 'confirmation bias'. As AI is represented more and more in media and entertainment, it could lead to a society split between those who benefit from AI and those who reject it."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    30
                  </span>
                )}
              </span>
              {renderText(
                " More pertinently, refusing to accept the advantages offered by AI could place a large group of people at a serious disadvantage."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    38
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph E */}
            <p className="text-lg">
              {renderText(
                "Fortunately, we already have some ideas about how to improve trust in AI. Simply having previous experience with AI can significantly improve people's opinions about the technology, as was found in the study mentioned above. Evidence also suggests the more you use other technologies such as the internet, the more you trust them."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " Another solution may be to reveal more about the algorithms which AI uses and the purposes they serve."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    31
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Paragraph F */}
            <p className="text-lg">
              {renderText(
                "Research suggests that allowing people some control over AI decision-making could also improve trust and enable AI to learn from human experience."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {renderText(
                  " For example, one study showed that when people were allowed the freedom to slightly modify an algorithm, they felt more satisfied with its decisions, more likely to believe it was superior and more likely to use it in the future."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    32
                  </span>
                )}
              </span>
              {renderText(
                " We don't need to understand the intricate inner workings of AI systems, but if people are given a degree of responsibility for how they are implemented, they will be more willing to accept AI into their lives."
              )}
              <span className={`${highlight ? "bg-yellow-100" : ""}`}>
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    40
                  </span>
                )}
              </span>
            </p>
          </div>

          {/* ===== Highlight Modal (unchanged) ===== */}
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
          {/* ---------- Questions 27–32: Matching Headings ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27–32")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Reading Passage 3 has six sections, A–F.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                " Choose the correct heading for each section from the list of headings below."
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose the correct number, i–viii, in boxes 27–32 on your answer sheet."
              )}
            </p>

            {/* Headings List */}
            <div className="border border-gray-400 rounded-md p-4 mb-6 max-w-[300px] mx-auto bg-white shadow-sm">
              <h2 className="mb-4 font-semibold text-center">
                {renderText("List of Headings")}
              </h2>
              <ul className="space-y-1 text-gray-700">
                {[
                  "i. An increasing divergence of attitudes towards AI",
                  "ii. Reasons why we have more faith in human judgement than in AI",
                  "iii. The superiority of AI projections over those made by humans",
                  "iv. The process by which AI can help us make good decisions",
                  "v. The advantages of involving users in AI processes",
                  "vi. Widespread distrust of an AI innovation",
                  "vii. Encouraging openness about how AI functions",
                  "viii. A surprisingly successful AI application",
                ].map((item, idx) => (
                  <li key={idx}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            {/* Sections A–F */}
            {[
              { qNum: 27, section: "A", label: "Section A" },
              { qNum: 28, section: "B", label: "Section B" },
              { qNum: 29, section: "C", label: "Section C" },
              { qNum: 30, section: "D", label: "Section D" },
              { qNum: 31, section: "E", label: "Section E" },
              { qNum: 32, section: "F", label: "Section F" },
            ].map(({ qNum, section, label }) => (
              <div key={qNum} className="mb-4 flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                  {qNum}
                </span>
                <span className="font-semibold">{renderText(label)}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded px-2 py-1 ml-2"
                >
                  <option value="">{qNum}</option>
                  {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                    (l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    )
                  )}
                </select>
              </div>
            ))}
          </div>

          {/* ---------- Questions 33–35: Multiple Choice ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 33–35")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </p>

            {[
              {
                qNum: 33,
                question: "What is the writer doing in Section A?",
                options: [
                  "A. providing a solution to a concern",
                  "B. justifying an opinion about an issue",
                  "C. highlighting the existence of a problem",
                  "D. explaining the reasons for a phenomenon",
                ],
              },
              {
                qNum: 34,
                question:
                  "According to Section C, why might some people be reluctant to accept AI?",
                options: [
                  "A. They are afraid it will replace humans in decision-making jobs.",
                  "B. Its complexity makes them feel that they are at a disadvantage.",
                  "C. They would rather wait for the technology to be tested over a period of time.",
                  "D. Misunderstandings about how it works make it seem more challenging than it is.",
                ],
              },
              {
                qNum: 35,
                question:
                  "What does the writer say about the media in Section C of the text?",
                options: [
                  "A. It leads the public to be mistrustful of AI.",
                  "B. It devotes an excessive amount of attention to AI.",
                  "C. Its reports of incidents involving AI are often inaccurate.",
                  "D. It gives the impression that AI failures are due to designer error.",
                ],
              },
            ].map(({ qNum, question, options }) => (
              <div key={qNum} className="mb-6">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(question)}
                </p>
                {options.map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx); // A, B, C, D
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

          {/* ---------- Questions 36–40: Yes / No / Not Given ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 36–40")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 3?"
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "In boxes 36–40 on your answer sheet, choose YES, NO, or NOT GIVEN."
              )}
            </p>

            {[
              {
                qNum: 36,
                text: "Subjective depictions of AI in sci-fi films make people change their opinions about automation.",
              },
              {
                qNum: 37,
                text: "Portrayals of AI in media and entertainment are likely to become more positive.",
              },
              {
                qNum: 38,
                text: "Rejection of the possibilities of AI may have a negative effect on many people's lives.",
              },
              {
                qNum: 39,
                text: "Familiarity with AI has very little impact on people's attitudes to the technology.",
              },
              {
                qNum: 40,
                text: "AI applications which users are able to modify are more likely to gain consumer approval.",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="mb-4">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(text)}
                </p>
                <div className="flex flex-col gap-1 ml-4">
                  {["YES", "NO", "NOT GIVEN"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={option}
                        checked={userAnswers[qNum] === option}
                        onChange={() => handleInputChange(qNum, option)}
                        className="mr-1"
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
      <Reading4Pagination2021></Reading4Pagination2021>
    </div>
  );
};

export default Reading4Part32021;
