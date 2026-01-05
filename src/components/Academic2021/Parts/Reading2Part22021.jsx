import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2021 from "../Pagination 2021/Reading2Pagination2021";

const Reading2Part22021 = () => {
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
    // Questions 14–16: Multiple Choice (A–D)
    14: "D", // They will continue to exist for longer than the human race.
    15: "C", // The average individual has more microbial cells than human ones.
    16: "A", // Explaining how a discovery was made

    // Questions 17–20: Summary Completion (A–H)
    17: "G", // illness
    18: "B", // partnership
    19: "E", // cleanliness
    20: "H", // nutrition

    // Questions 21–26: Yes / No / Not Given
    21: "YES", // Using antibacterial products may fail to have the desired effect
    22: "NO", // Not a good idea to minimize children's contact with bacteria
    23: "NOT GIVEN", // The book’s number of case studies is not explicitly stated
    24: "YES", // Case study about squid may have limited appeal
    25: "YES", // Efforts to control dengue fever have been surprisingly successful
    26: "NOT GIVEN", // Microbes in hospital walls not yet implemented
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
              {renderText("You should spend about 20 minutes on")}
              <span className="text-lg font-bold">
                {renderText(" Questions 14-26")}
              </span>
              {renderText(" which are based on Reading Passage 2 below.")}
            </h1>
          </div>

          {/* Passage text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("I contain multitudes")}
            </h1>
            <p className="text-lg">
              {renderText(
                "Wendy Moore reviews Ed Yong's book about microbes. Microbes, most of them bacteria, have populated this planet since long before animal life developed and they will outlive us."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Invisible to the naked eye, they are ubiquitous. They inhabit the soil, air, rocks and water and are present within every form of life, from seaweed and coral to dogs and humans. And, as Yong explains in his utterly absorbing and hugely important book, we mess with them at our peril."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    14
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Every species has its own colony of microbes, called a 'microbiome', and these microbes vary not only between species but also between individuals and within different parts of each individual. What is amazing is that while the number of human cells in the average person is about 30 trillion, the number of microbial ones is higher - about 39 trillion."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
              {renderText(
                " At best, Yong informs us, we are only 50 per cent human. Indeed, some scientists even suggest we should think of each species and its microbes as a single unit, dubbed a 'holobiont'."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In each human there are microbes that live only in the stomach, the mouth or the armpit and by and large they do so peacefully. So 'bad' microbes are just microbes out of context. Microbes that sit contentedly in the human gut (where there are more microbes than there are stars in the galaxy) can become deadly if they find their way into the bloodstream."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These communities are constantly changing too. The right hand shares just one sixth of its microbes with the left hand. And, of course, we are surrounded by microbes. Every time we eat, we swallow a million microbes in each gram of food; we are continually swapping microbes with other humans, pets and the world at large."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    16
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "It's a fascinating topic and Yong, a young British science journalist, is an extraordinarily adept guide. Writing with lightness and panache, he has a knack of explaining complex science in terms that are both easy to understand and totally enthralling."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Yong is on a mission. Leading us gently by the hand, he takes us into the world of microbes - a bizarre, alien planet - in a bid to persuade us to love them as much as he does. By the end, we do."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    17
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "For most of human history we had no idea that microbes existed. The first man to see these extraordinarily potent creatures was a Dutch lens-maker called Antony van Leeuwenhoek in the 1670s."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Using microscopes of his own design that could magnify up to 270 times, he examined a drop of water from a nearby lake and found it teeming with tiny creatures he called 'animalcules'."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    18
                  </span>
                )}
              </span>
              {renderText(
                " It wasn't until nearly two hundred years later that the research of French biologist Louis Pasteur indicated that some microbes caused disease. It was Pasteur's 'germ theory' that gave bacteria the poor image that endures today."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Yong's book is in many ways a plea for microbial tolerance, pointing out that while fewer than one hundred species of bacteria bring disease, many thousands more play a vital role in maintaining our health."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The book also acknowledges that our attitude towards bacteria is not a simple one. We tend to see the dangers posed by bacteria, yet at the same time we are sold yoghurts and drinks that supposedly nurture 'friendly' bacteria."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    19
                  </span>
                )}
              </span>
              {renderText(
                " In reality, says Yong, bacteria should not be viewed as either friends or foes, villains or heroes. Instead we should realise we have a symbiotic relationship, that can be mutually beneficial or mutually destructive."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "What then do these millions of organisms do? The answer is pretty much everything. New research is now unravelling the ways in which bacteria aid digestion, regulate our immune systems, eliminate toxins, produce vitamins, affect our behaviour and even combat obesity."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  '"They actually help us become who we are," says Yong. But we are facing a growing problem. Our obsession with hygiene, our overuse of antibiotics and our unhealthy, low-fibre diets are disrupting the bacterial balance and may be responsible for soaring rates of allergies and immune problems, such as inflammatory bowel disease (IBD).'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    20
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The most recent research actually turns accepted norms upside down. For example, there are studies indicating that the excessive use of household detergents and antibacterial products actually destroys the microbes that normally keep the more dangerous germs at bay."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Other studies show that keeping a dog as a pet gives children early exposure to a diverse range of bacteria, which may help protect them against allergies later."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    21
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "The readers of Yong's book must be prepared for a decidedly unglamorous world. Among the less appealing case studies is one about a fungus that is wiping out entire populations of frogs and that can be halted by a rare microbial bacterium."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Another is about squid that carry luminescent bacteria that protect them against predators."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    22
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "However, if you can overcome your distaste for some of the investigations, the reasons for Yong's enthusiasm become clear. The microbial world is a place of wonder."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Already, in an attempt to stop mosquitoes spreading dengue fever - a disease that infects 400 million people a year - mosquitoes are being loaded with a bacterium to block the disease."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    24
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "In the future, our ability to manipulate microbes means we could construct buildings with useful microbes built into their walls to fight off infections."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Just imagine a neonatal hospital ward coated in a specially mixed cocktail of microbes so that babies get the best start in life."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    26
                  </span>
                )}
              </span>
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
          {/* ---------- Questions 14–16: Multiple Choice ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 14–16")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText("Choose the correct letter, A, B, C or D.")}
            </p>

            {[
              {
                qNum: 14,
                question:
                  "What point does the writer make about microbes in the first paragraph?",
                options: [
                  "A. They adapt quickly to their environment.",
                  "B. The risk they pose has been exaggerated.",
                  "C. They are more plentiful in animal life than plant life.",
                  "D. They will continue to exist for longer than the human race.",
                ],
              },
              {
                qNum: 15,
                question:
                  "In the second paragraph, the writer is impressed by the fact that",
                options: [
                  "A. each species tends to have vastly different microbes.",
                  "B. some parts of the body contain relatively few microbes.",
                  "C. the average individual has more microbial cells than human ones.",
                  "D. scientists have limited understanding of how microbial cells behave.",
                ],
              },
              {
                qNum: 16,
                question: "What is the writer doing in the fifth paragraph?",
                options: [
                  "A. explaining how a discovery was made",
                  "B. comparing scientists' theories about microbes",
                  "C. describing confusion among scientists",
                  "D. giving details of how microbes cause disease",
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

          {/* ---------- Questions 17–20: Summary Completion ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 17–20")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Complete the summary using the list of letters below."
              )}
            </p>
            <p className="mb-4 font-semibold">
              {renderText(
                "Choose the correct letter, A–H, in boxes 17–20 on your answer sheet."
              )}
            </p>

            {/* List of letters */}
            <div className="border border-gray-400 rounded-md p-4 mb-6 max-w-[420px] mx-auto bg-white shadow-sm">
              <h3 className="font-semibold text-center mb-3">
                {renderText("List of Letters")}
              </h3>
              <ul className="space-y-1 text-center text-gray-700">
                {[
                  "A. solution",
                  "B. partnership",
                  "C. destruction",
                  "D. exaggeration",
                  "E. cleanliness",
                  "F. regulations",
                  "G. illness",
                  "H. nutrition",
                ].map((item, idx) => (
                  <li key={idx}>{renderText(item)}</li>
                ))}
              </ul>
            </div>
            <div className="border p-5 leading-8">
              <p>
                {renderText(
                  "Yong's book argues that we should be more tolerant of microbes. Many have a beneficial effect, and only a relatively small number lead to"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    17
                  </span>
                  <select
                    value={userAnswers[17] || ""}
                    onChange={(e) => handleInputChange(17, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>
                {renderText(
                  ". And although it is misleading to think of microbes as 'friendly', we should also stop thinking of them as the enemy. In fact, we should accept that our relationship with microbes is one based on"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    18
                  </span>
                  <select
                    value={userAnswers[18] || ""}
                    onChange={(e) => handleInputChange(18, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>
                .
              </p>

              <br />

              <p>
                {renderText(
                  "New research shows that microbes have numerous benefits for humans. Amongst other things, they aid digestion, remove poisons, produce vitamins and may even help reduce obesity. However, there is a growing problem. Our poor"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    19
                  </span>
                  <select
                    value={userAnswers[19] || ""}
                    onChange={(e) => handleInputChange(19, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>
                {renderText(
                  ", our overuse of antibiotics, and our excessive focus on"
                )}{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border font-semibold">
                    20
                  </span>
                  <select
                    value={userAnswers[20] || ""}
                    onChange={(e) => handleInputChange(20, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=""></option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </span>
                {renderText(
                  " are upsetting the bacterial balance and may be contributing to the huge increase in allergies and immune system problems."
                )}
              </p>
            </div>
          </div>

          {/* ---------- Questions 21–26: Yes / No / Not Given ---------- */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 21–26")}
            </h2>
            <p className="mb-4 font-semibold">
              {renderText(
                "Do the following statements agree with the claims of the writer?"
              )}
            </p>

            {[
              {
                qNum: 21,
                text: "It is possible that using antibacterial products in the home fails to have the desired effect.",
              },
              {
                qNum: 22,
                text: "It is a good idea to ensure that children come into contact with as few bacteria as possible.",
              },
              {
                qNum: 23,
                text: "Yong's book contains more case studies than are necessary.",
              },
              {
                qNum: 24,
                text: "The case study about bacteria that prevent squid from being attacked may have limited appeal.",
              },
              {
                qNum: 25,
                text: "Efforts to control dengue fever have been surprisingly successful.",
              },
              {
                qNum: 26,
                text: "Microbes that reduce the risk of infection have already been put inside the walls of some hospital wards.",
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
                    Your Score: {score}/26
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14–26)
                  </h3>
                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
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

export default Reading2Part22021;
