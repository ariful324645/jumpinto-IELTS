import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";

import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Listening4Pagination2019 from "../Pagination/Listening4Pagination2019";

const Listening4Part32020 = () => {
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

  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Section 3.You will hear Stephanie, who is thinking about taking a one year course in children's literature, talking to Trevor, who is currently taking the course.",
        "First, you have some time to look at questions 21 to 25",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: ["Hello, Trevor."],
    },

    {
      speaker: "TREVOR",
      text: [
        "Hello, Stephanie.You said you wanted to talk about the course I'm taking on literature for children.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "That's right.I'm thinking of doing it next year, but I'd like to find out more about it first.",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "OK, well as you probably know, it's a one year course. It's divided into 6 modules, and you have to take all of them.",
        "One of the most interesting ones for me at least, was about the purpose of children's literature.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "You mean whether it should just entertain children, or should be educational as well?",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "Right, and whether the teaching should be factual, giving them information about the world, or ethical, teaching them values.",
        "Hmm.",

        {
          text: "What's fascinating is that the writer isn't necessarily conscious of the message they're conveying. For instance, a story might show a child who has a problem as a result of not doing what an adult has told them to do, implying that children should always obey adults.",
          number: 21,
        },
      ],
    },

    {
      speaker: "STEPHANIE",
      text: ["I see what you mean."],
    },

    {
      speaker: "TREVOR",
      text: [
        "That module made me realize how important stories are.They can have a significant effect on children as they grow up.",
        {
          text: "Actually, it inspired me to have a go at it myself, just for my own interest.",
          number: 22,
        },
        "I know I can't compete with the really popular stories, like the Harry Potter books, they're very good. And even young kids like my 7 year old niece love reading them.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "Hmm, I'm very interested in illustrations in stories. Is that covered in the course?",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "Yes, there's a module on pictures. And how they're sometimes central to the story.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "Hmm, that's good.I remember some frightening ones I saw as a child, and I can still see them vividly in my mind years later. Pictures can be so powerful, just as powerful as words.",
        {
          text: " I've always enjoyed drawing, so that's the field I want to go into when I finish the course.",
          number: 23,
        },
        "I bet that module will be really helpful.",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "I'm sure it will.We also studied comics in that module, but I'm not convinced of their value, not compared with books. One of the great things about words is that you use your imagination, but with a comic you don't have to.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "But children are so used to visual input on TV, video games, and so on.",
        {
          text: "There are plenty of kids who wouldn't even try to read a book, so, I think comics can serve a really useful purpose.",
          number: 24,
        },
      ],
    },

    {
      speaker: "TREVOR",
      text: ["You mean it's better to read a comic than not to read at all?"],
    },

    {
      speaker: "STEPHANIE",
      text: ["Hmm."],
    },

    {
      speaker: "TREVOR",
      text: [
        "Yes, I suppose you're right.I just think it's sad when children don't read books.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "What about books for girls and books for boys?Does the course go into that?",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "Yes, there's a module on it.For years, lots of stories in English at least, assumed that boys went out and did adventurous things, and girls stayed at home and played with dolls.",
        {
          text: "I was amazed how many books were targeted at just one sex or the other.",
          number: 25,
        },
        "Of course, this reflects society as it is when the books are written.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "That's true.So it sounds as though you think it's a good course.",
      ],
    },

    {
      speaker: "TREVOR",
      text: ["Definitely."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "Have you been reading lots of children's stories to help you decide whether to take the course?",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "Yeah, I've gone as far back as the late 17th century, though I know there were earlier children's stories.",
      ],
    },

    {
      speaker: "TREVOR",
      text: [
        "So does that mean you've read Perrault's fairy tales, Cinderella, The Sleeping Beauty, and so on?",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "Yes, they must be important, because no stories of that type had been written before..",
        { text: "These were the first", number: 26 },
        "Then there's the Swiss family Robinson.",
      ],
    },

    {
      speaker: "TREVOR",
      text: ["I haven't read that."],
    },

    {
      speaker: "STEPHANIE",
      text: [
        {
          text: "The English name makes it sound as though Robinson is the family surname, but a more accurate translation would be the Swiss Robinsons, because it's about a Swiss family who are shipwrecked.Like Robinson Crusoe in the novel of a century earlier.",
          number: 27,
        },
      ],
    },

    {
      speaker: "TREVOR",
      text: ["Well, I never knew that."],
    },

    {
      speaker: "STEPHANIE",
      text: ["Have you read Hoffmann's The Nutcracker and the Mouse King?"],
    },

    {
      speaker: "TREVOR",
      text: [
        {
          text: "Wasn't that the basis for Tchaikovsky's ballet The Nutcracker?",
          number: 28,
        },
      ],
    },

    {
      speaker: "STEPHANIE",
      text: ["That's right.It has some quite bizarre elements."],
    },

    {
      speaker: "TREVOR",
      text: [
        "I hope you've read Oscar Wilde's The Happy Prince. It's probably my favorite children's story of all time.",
      ],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "Ah. Mine too.And it's so surprising, because Wilde is best known for his plays, and most of them are very witty, but The Happy Prince is really moving.",

        {
          text: "I struggled with Tolkien's The Lord of the Rings, they are long books, and I gave up after one.",
          number: 29,
        },
      ],
    },

    {
      speaker: "TREVOR",
      text: ["It's extremely popular though."],
    },

    {
      speaker: "STEPHANIE",
      text: [
        "Yeah.But whereas something like The Happy Prince just carried me along with it, The Lord of the Rings took more effort than I was prepared to give it.",
      ],
    },

    {
      speaker: "TREVOR",
      text: ["I didn't find that, I love it."],
    },

    {
      speaker: "STEPHANIE",
      text: ["Hmm.Another one I've read is War Horse."],
    },

    {
      speaker: "TREVOR",
      text: [
        "Oh yes, it's about the First World War, isn't it?",
        {
          text: "Hardly what you'd expect for a children's story.",
          number: 30,
        },
      ],
    },

    {
      speaker: "STEPHANIE",
      text: ["Exactly, but it's been very successful.Have you read any..."],
    },

    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 3.You now have half a minute to check your answers.",
      ],
    },
  ];

  // different option
  const questions = [
    "What does Trevor find interesting about the purpose of children's literature?",
    "Trevor says the module about the purpose of children's literature made him",
    "Stephanie is interested in the Pictures module because",
    "Trevor and Stephanie agree that comics",
    "With regard to books aimed at only boys or only girls, Trevor was surprised",
  ];

  const options = [
    [
      "A. the fact that authors may not realise what values they're teaching",
      "B. the fact that literature can be entertaining and educational at the same time",
      "C. the fact that adults expect children to imitate characters in literature",
    ],
    [
      "A. analyse some of the stories that his niece reads.",
      "B. wonder how far popularity reflects good quality.",
      "C. decide to start writing some children's stories.",
    ],
    [
      "A. she intends to become an illustrator.",
      "B. she can remember beautiful illustrations from her childhood.",
      "C. she believes illustrations are more important than words.",
    ],
    [
      "A. are inferior to books.",
      "B. have the potential for being useful.",
      "C. discourage children from using their imagination.",
    ],
    [
      "A. how long the distinction had gone unquestioned.",
      "B. how few books were aimed at both girls and boys.",
      "C. how many children enjoyed books intended for the opposite sex.",
    ],
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
      const answerKey = qIndex + 21;
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
      if (speaker === "GRAHAM") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "CATHY") {
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

  //  Marks show

  const correctAnswers = {
    21: "A. the fact that authors may not realise what values they're teaching",
    22: "C. decide to start writing some children's stories.",
    23: "A. she intends to become an illustrator.",
    24: "B. have the potential for being useful.",
    25: "A. how long the distinction had gone unquestioned.",
    26: "F",
    27: "E",
    28: "C",
    29: "B",
    30: "G",
  };

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
    localStorage.setItem("/listening2Part32020", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening2Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening2Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex relative group justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("    PART 3")}</h1>
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight(!highlight)}
              className="toggle toggle-accent"
            />
          </div>

          <button
            onClick={handleVoice}
            className={`mt-5 px-6 py-2 rounded-full font-medium text-white transition ${
              isSpeaking ? "bg-yellow-400" : "bg-green-400"
            }`}
          >
            {isSpeaking ? "⏹ Stop" : "🔊 Play Voice"}
          </button>

          <hr />
          <div className="flex justify-between items-center">
            <p onClick={() => setOpenScript(!openScript)}>
              {renderText("Audio Script")}
            </p>
            <span onClick={() => setOpenScript(!openScript)}>
              <IoIosArrowDown size={20} />
            </span>
          </div>

          {openScript ? (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold mb-8 text-center">
                {renderText(
                  "A Discussion about a Literature for Children Course and Related Books"
                )}
              </h1>
              {lines.map((line, index) => speakerText(line, index))}
            </div>
          ) : (
            <hr className="border border-gray-400 border-dotted" />
          )}

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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>

              {/* Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {renderText("Clear answer")}
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      {renderText(
                        "Are you sure you want to clear all answers?"
                      )}
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        {renderText("No, keep them")}
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        {renderText("Yes, clear them")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText(" Questions 21-25")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}{" "}
              <span className="font-bold"> {renderText("    A, B or C")}</span>.
            </p>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 21;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col gap-2 ml-4">
                    {options[qIndex].map((option, oIndex) => {
                      const isSelected = selectedOptions[qIndex] === option;

                      return (
                        <li
                          key={oIndex}
                          onClick={() => handleOptionClick(qIndex, option)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 inline-block ${
                              isSelected
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-700"
                            }`}
                          ></span>

                          <span
                            className={
                              isSelected ? "text-blue-500" : "text-black"
                            }
                          >
                            {option}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* 2st section */}

          <div>
            {/* normal title*/}
            <div className="space-y-4 leading-relaxed">
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 26-30")}
              </h2>

              <h3 className="text-lg mb-5">
                {renderText(
                  "What topic do Cathy and Graham choose to illustrate with each novel?"
                )}{" "}
                <br /> <br />
                {renderText("Choose the correct letter,  ")}{" "}
                <span className="font-bold mr-2">{renderText("A-G")}</span>{" "}
                {renderText("next to Questions 26-30.")}
              </h3>
              <div className="flex items-center justify-center border border-black py-4 px-4 w-80 mx-auto">
                <div className="text-center">
                  <h1 className="text-xl font-bold mb-5">Comments</h1>

                  <ul className="space-y-1 text-lg">
                    <li>
                      {renderText("A. translated into many other languages")}
                    </li>
                    <li>{renderText("B. hard to read")}</li>
                    <li>
                      {renderText(
                        "C. inspired a work in a different area of art"
                      )}
                    </li>
                    <li>
                      {renderText(
                        "D. more popular than the author's other works"
                      )}
                    </li>
                    <li>
                      {renderText("E. original title refers to another book")}
                    </li>
                    <li>{renderText("F. started a new genre")}</li>
                    <li>{renderText("G. unlikely topic")}</li>
                  </ul>
                </div>
              </div>

              <br />
            </div>
          </div>

          {/* optional question */}
          <div className="space-y-2">
            {/* ---------- Question 1 ---------- */}
            <h1 className="text-lg font-bold">Stories</h1>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("26.")}</span>
              <span>{renderText("Perrault's fairy tales")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[26] || ""}
                  onChange={(e) => handleInputChange(26, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="26">{renderText("26")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 2 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              <span>{renderText("The Swiss Family Robinson")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="27">{renderText("27")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 3 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              <span>{renderText("The Nutcracker and The Mouse King")}</span>

              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="28">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 4 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("The Lord of the Rings")}
              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="29">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 5 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("30.")}</span>
              {renderText("War Horse")}
              <div className="relative w-40">
                <select
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="30">{renderText("30")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (21–30)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 21).map((num) => {
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
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
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

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
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
      <Listening4Pagination2019></Listening4Pagination2019>
    </div>
  );
};

export default Listening4Part32020;
