import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Reading1Pagination2021 from "../Pagination 2021/Reading1Pagination2021";
import { IoBookSharp } from "react-icons/io5";

const Reading1Part32021 = () => {
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
    // Questions 27–30: Multiple Choice (single letter)
    27: "B", // AI will alter the nature of work
    28: "D", // Knowledge economy driving current workplace developments
    29: "C", // Staff making AI produce results they want
    30: "D", // McGaughey: changes in job market can be handled

    // Questions 31–34: Summary / Gap-fill (A–G)
    31: "G", // jobs rely on information
    32: "E", // growing reliance on AI
    33: "C", // prevented from using their own intuition
    34: "F", // increase users' confidence

    // Questions 35–40: Matching statements with people (A–C)
    35: "B", // Greater automation will not lower employment → Hamish Low
    36: "A", // Reasons AI is appealing → Stella Pachidi
    37: "C", // AI's potential parallels cultural shifts → Ewan McGaughey
    38: "A", // Problems AI causes → Stella Pachidi
    39: "B", // Less conventional career paths → Hamish Low
    40: "C", // Authorities ensuring fair work → Ewan McGaughey
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
              {renderText("The Future of Work")}
            </h1>

            <p className="text-lg">
              {renderText(
                "According to a leading business consultancy, 3-14% of the global workforce will need to switch to a different occupation within the next 10-15 years, and all workers will need to adapt as their occupations evolve alongside increasingly capable machines."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Automation - or 'embodied artificial intelligence' (AI) - is one aspect of the disruptive effects of technology on the labour market. 'Disembodied AI', like the algorithms running in our smartphones, is another."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Dr Stella Pachidi from Cambridge Judge Business School believes that some of the most fundamental changes are happening as a result of the 'algorithmication' of jobs that are dependent on data rather than on production - the so-called knowledge economy."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Algorithms are capable of learning from data to undertake tasks that previously needed human judgement, such as reading legal contracts, analysing medical scans and gathering market intelligence."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    28
                  </span>
                )}
              </span>
              {renderText(
                "In many cases, they can outperform humans, says Pachidi. Organisations are attracted to using algorithms because they want to make choices based on what they consider is 'perfect information', as well as to reduce costs and enhance productivity."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  31
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "But these enhancements are not without consequences, says Pachidi. If routine cognitive tasks are taken over by AI, how do professions develop their future experts? One way of learning about a job is 'legitimate peripheral participation' - a novice stands next to experts and learns by observation. If this isn't happening, then you need to find new ways to learn."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  36
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Another issue is the extent to which the technology influences or even controls the workforce. For over two years, Pachidi monitored a telecommunications company."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The way telecoms salespeople work is through personal and frequent contact with clients, using the benefit of experience to assess a situation and reach a decision. However, the company had started using an algorithm that defined when account managers should contact certain customers about which kinds of campaigns and what to offer them."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The algorithm - usually built by external designers - often becomes the keeper of knowledge, she explains. In cases like this, Pachidi believes, a short-sighted view begins to creep into working practices whereby workers learn through the 'algorithm's eyes' and become dependent on its instructions. Alternative explorations - where experimentation and human instinct lead to progress and new ideas - are effectively discouraged."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  33
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'Pachidi and colleagues even observed people developing strategies to make the algorithm work to their own advantage. "We are seeing cases where workers feed the algorithm with false data to reach their targets," she reports.'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  29
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "It's scenarios like these that many researchers are working to avoid. Their objective is to make AI technologies more trustworthy and transparent, so that organisations and individuals understand how AI decisions are made."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  34
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'In the meantime, says Pachidi, "We need to make sure we fully understand the dilemmas that this new world raises regarding expertise, occupational boundaries and control."'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  38
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'Economist Professor Hamish Low believes that the future of work will involve major transitions across the whole life course for everyone: "The traditional trajectory of full-time education followed by full-time work followed by a pensioned retirement is a thing of the past."'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  39
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "On the subject of job losses, Low believes the predictions are founded on a fallacy: 'It assumes that the number of jobs is fixed. If in 30 years, half of 100 jobs are being carried out by robots, that doesn't mean we are left with just 50 jobs for humans. The number of jobs will increase: we would expect there to be 150 jobs.'"
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  35
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Dr Ewan McGaughey, at Cambridge's Centre for Business Research and King's College London, agrees that \"apocalyptic\" views about the future of work are misguided."
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  30
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'His recently published research answers the question of whether automation, AI and robotics will mean a "jobless future" by looking at the causes of unemployment. "History is clear that change can mean redundancies. But social policies can tackle this through retraining and redeployment."'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  30
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                'He adds: "If there is going to be change to jobs as a result of AI and robotics then I\'d like to see governments seizing the opportunity to improve policy to enforce good job security. We can reprogramme the law to prepare for a fairer future of work and leisure."'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  40
                </span>
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"The promises of these new technologies are astounding. They deliver humankind the capacity to live in a way that nobody could have once imagined. Just as the industrial revolution brought people past subsistence agriculture, and the corporate revolution enabled mass production, a third revolution has been pronounced. But it will not only be one of technology. The next revolution will be social."'
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  37
                </span>
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

            {/* Questions */}
            {[
              {
                qNum: 27,
                question: "The first paragraph tells us about",
                options: [
                  "the kinds of jobs that will be most affected by the growth of AI.",
                  "the extent to which AI will alter the nature of the work that people do.",
                  "the proportion of the world's labour force who will have jobs in AI in the future.",
                  "the difference between ways that embodied and disembodied AI will impact on workers.",
                ],
              },
              {
                qNum: 28,
                question:
                  "According to the second paragraph, what is Stella Pachidi's view of the 'knowledge economy'?",
                options: [
                  "It is having an influence on the number of jobs available.",
                  "It is changing people's attitudes towards their occupations.",
                  "It is the main reason why the production sector is declining.",
                  "It is a key factor driving current developments in the workplace.",
                ],
              },
              {
                qNum: 29,
                question:
                  "What did Pachidi observe at the telecommunications company?",
                options: [
                  "staff disagreeing with the recommendations of AI",
                  "staff feeling resentful about the intrusion of AI in their work",
                  "staff making sure that AI produces the results that they want",
                  "staff allowing AI to carry out tasks they ought to do themselves",
                ],
              },
              {
                qNum: 30,
                question: "In his recently published research, Ewan McGaughey",
                options: [
                  "challenges the idea that redundancy is a negative thing.",
                  "shows the profound effect of mass unemployment on society.",
                  "highlights some differences between past and future job losses.",
                  "illustrates how changes in the job market can be successfully handled.",
                ],
              },
            ].map(({ qNum, question, options }) => (
              <div key={qNum} className="mb-6">
                <p className="font-semibold mb-2">
                  {qNum}. {renderText(question)}
                </p>
                {options.map((opt, index) => {
                  const letter = String.fromCharCode(65 + index);
                  return (
                    <label
                      key={letter}
                      className="flex items-center gap-3 cursor-pointer mb-1"
                    >
                      <input
                        type="radio"
                        name={`q${qNum}`}
                        value={letter}
                        checked={userAnswers[qNum] === letter}
                        onChange={(e) =>
                          handleInputChange(qNum, e.target.value)
                        }
                      />
                      <span className="font-semibold">{letter}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ---------- Questions 31–34: Summary / Gap Fill ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 31–34")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Complete the summary using the list of words or phrases below."
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose the correct letter, A–G, in boxes 31-34 on your answer sheet."
              )}
            </p>

            {/* List of words */}
            <div className="border border-gray-400 rounded-md p-4 mb-4 max-w-[220px] mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-2">
                {renderText("List of words/phrases")}
              </h3>
              <ul className="space-y-1 text-gray-700  text-center">
                {[
                  "A. pressure",
                  "B. satisfaction",
                  "C. intuition",
                  "D. promotion",
                  "E. reliance",
                  "F. confidence",
                  "G. information",
                ].map((item, idx) => (
                  <li key={idx}>{renderText(item)}</li>
                ))}
              </ul>
            </div>
            <div className="border p-5">
              <p className="mb-4 font-semibold text-2xl text-center">
                {renderText("The 'algorithmication' of jobs")}
              </p>

              {/* Summary */}
              {[
                {
                  qNum: 31,
                  text: "Stella Pachidi of Cambridge Judge Business School has been focusing on the 'algorithmication' of jobs which rely not on production but on ",
                },
                {
                  qNum: 32,
                  text: "While monitoring a telecommunications company, Pachidi observed a growing ",
                },
                {
                  qNum: 33,
                  text: "Meanwhile, staff are deterred from experimenting and using their own ",
                },
                {
                  qNum: 34,
                  text: "To avoid the kind of situations which Pachidi observed, researchers are trying to make AI's decision-making process easier to comprehend, and to increase users' ",
                },
              ].map(({ qNum, text }) => (
                <div key={qNum} className="flex items-center gap-3 mb-4">
                  <span>{renderText(text)}</span>
                  <select
                    value={userAnswers[qNum] || ""}
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    className="border rounded-md px-2 py-1 w-24"
                  >
                    <option value="">{qNum}</option>
                    {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Questions 35–40: Match Statements ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 35–40")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Match each statement with the correct person, A-C.")}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose the correct letter, A-C, next to Questions 35-40. NB: You may use any letter more than once."
              )}
            </p>

            {/* List of people */}
            <div className="border border-gray-400 rounded-md p-4 mb-4 max-w-[220px] mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-2">
                {renderText("List of people")}
              </h3>
              <ul className="space-y-1 text-gray-700">
                {[
                  "A. Stella Pachidi",
                  "B. Hamish Low",
                  "C. Ewan McGaughey",
                ].map((person, idx) => (
                  <li key={idx}>{renderText(person)}</li>
                ))}
              </ul>
            </div>

            {/* Statements */}
            {[
              {
                qNum: 35,
                text: "Greater levels of automation will not result in lower employment.",
              },
              {
                qNum: 36,
                text: "There are several reasons why AI is appealing to businesses.",
              },
              {
                qNum: 37,
                text: "AI's potential to transform people's lives has parallels with major cultural shifts which occurred in previous eras.",
              },
              {
                qNum: 38,
                text: "It is important to be aware of the range of problems that AI causes.",
              },
              {
                qNum: 39,
                text: "People are going to follow a less conventional career path than in the past.",
              },
              {
                qNum: 40,
                text: "Authorities should take measures to ensure that there will be adequately paid work for everyone.",
              },
            ].map(({ qNum, text }) => (
              <div key={qNum} className="flex items-center mb-4">
                <span className="">{renderText(text)}</span>
                <select
                  value={userAnswers[qNum] || ""}
                  onChange={(e) => handleInputChange(qNum, e.target.value)}
                  className="border rounded-md px-2 py-1"
                >
                  <option value="">{qNum}</option>
                  {["A", "B", "C"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* ---------- Submit / Result ---------- */}
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
                    Your Score: {score}/14
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

                      // Check correctness
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
      <Reading1Pagination2021></Reading1Pagination2021>
    </div>
  );
};

export default Reading1Part32021;
