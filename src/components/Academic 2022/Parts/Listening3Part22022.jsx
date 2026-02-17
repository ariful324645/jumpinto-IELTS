import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2022 from "../Pagination2022/Listening3Pagination2022";

const Listening3Part22022 = () => {
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
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 2. You will hear the manager of a childcare service at a primary school talking to parents at an open day about the school's childcare service offered before and after school.",
        "First, you have some time to look at questions 11 to 15.",
        "Now listen carefully and answer questions 11 to 15.",
      ],
    },
    {
      speaker: "MRS CARTER",
      text: [
        "Good afternoon. My name's Mrs Carter, and I run the before and after school extended hours childcare service.",
        "I hope you've had a chance to have a good look around the school, and talk to staff and pupils.",
        "I know that many of you are interested in using our childcare service when your child joins the school, and perhaps you already know something about it, but for those that don't, I'll go through the main details now.",
        "We offer child care for children from the ages of 4 to 11, both before and after school.",
        "I know that many parents who work find this service invaluable.",
        "You can leave your child with us, safe in the knowledge that they will be extremely well cared for.",
        "We are insured to provide care for up to 70 children, although we rarely have this many attending at any one session.",
        {
          text: "I think we generally expect around 50 to 60 children for the afternoon sessions.",
          number: 11,
        },
        {
          text: "And about half that number for the breakfast sessions, although we currently do have 70 children registered with us, not all of these attend every day.",
          number: 12,
        },
        "It's 10 years since we began offering an extended hours service, and we've come a long way during that time.",
        "When we first opened, we only had about 20 children attending regularly.",
        "We try to keep our costs as low as we can, and we think we provide very good value for money.",
        {
          text: "For the afternoon sessions, which run from 3.30 until 6 p.m., it's £7.20.",
          number: 13,
        },
        "But if you prefer, you can pay for one hour only, which costs £3.50, or two hours which costs £5.70.",
        "The cost of the child care includes food and snacks.",
        "They'll be given breakfast in the morning, and in the afternoon, a healthy snack as soon as they finish school.",
        {
          text: "At 5 pm, children are given something more substantial, such as pasta or a casserole.",
          number: 14,
        },
        "Please inform us of any allergies that your child might have.",
        "And we'll make sure they're offered a suitable alternative.",
        {
          text: "As you may know, the childcare service runs through the school holidays from 8:00 am to 6:00 pm.",
          number: 15,
        },
        "We offer a really varied and exciting program to keep the children entertained.",
        "We don't want them to feel as if they are still at school.",
        "It will also feel different because they'll get the chance to make new friends with children from other schools.",
        "Spaces are available for them, because a lot of our term time children don't always attend during the holiday.",
        "In the past, parents have asked if children over the age of 11 are allowed to come with their younger brothers and sisters, but I'm afraid we're unable to do this.",
        "Because of the type of insurance we have.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.",
        "Now listen and answer questions 16 to 20.",
      ],
    },
    {
      speaker: "MRS CARTER",
      text: [
        "So now let me tell you about some of the activities that your child can do during the after-school sessions, as well as being able to use the playground equipment, computers, and the library.",
        "There is usually at least one special activity that children can do each day.",
        "For example, Spanish.",
        "We have a specialist teacher coming in every Thursday.",
        "To give a basic introduction to the language through games and songs.",
        "She does two sessions: one for the over 8s, and one for the younger children.",
        {
          text: "This is the only activity which we have to make an extra charge for, but it's well worth it.",
          number: 16,
        },
        "Once a week the children have the opportunity to do some music.",
        "We're very lucky that one of our staff is a member of a folk band.",
        "On Mondays, she teaches singing and percussion to groups of children.",
        {
          text: "We do rely on parental support for this, so if any of you sing or play an instrument, and would be prepared to help out at these sessions, we'd be delighted.",
          number: 17,
        },
        "Painting continues to be one of the most popular activities.",
        {
          text: "To begin with, we weren't keen on offering this because of the extra mess involved, but children kept asking if they could do some art.",
          number: 18,
        },
        "And so we finally gave in.",
        "Art is great for helping the children to relax after working hard at school all day.",
        "Yoga is something that we've been meaning to introduce for some time, but haven't been able to find anyone available to teach it until now, that is.",
        {
          text: "So we'll see how this goes.",
          number: 19,
        },
        "Hopefully, children will benefit in all sorts of ways from this.",
        "Cooking is another popular activity.",
        "They make a different sort of cake or pizza or bread each week, although the younger children love doing it.",
        {
          text: "We found that the mess was just too much, so we've decided to restrict this to the over 8s, as they are better able to clean up after themselves.",
          number: 20,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 2.",
        "You now have half a minute to check your answers to part 2.",
      ],
    },
  ];

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
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "MRS CARTER") {
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

  //  Marks show

  const correctAnswers = {
    // Questions 11–12 (Choose TWO letters, A–E)
    "11-12": ["B", "E"],
    // B. More children attend after school than before school
    // E. The maximum number of children who can attend is 70

    // Questions 13–15 (Choose the correct letter, A, B or C)
    13: "B", // £5.70
    14: "B", // Children may bring healthy snacks with them
    15: "A", // Children from other schools can attend

    // Questions 16–20 (Match activities to information A–G)
    16: "F", // Spanish – is a new activity
    17: "G", // Music – was requested by children
    18: "D", // Painting – requires help from parents
    19: "C", // Yoga – is for over 8s only
    20: "E", // Cooking – involves an additional fee
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  // --- Handle input change and auto-check ---
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
    localStorage.setItem("/listening3Part22022", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening3Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening3Part22022");
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
            <h1 className="text-xl font-bold">{renderText("    PART 2")}</h1>
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
                {renderText("Childcare Services")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11–20")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Choose the correct letter or letters as instructed.")}
          </h3>

          <div className="p-6 rounded-lg space-y-6 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Extended hours childcare service")}
            </h1>

            {/* ---------- Questions 11–12 ---------- */}
            <h2 className="font-bold text-xl">
              {renderText("Questions 11 and 12")}
            </h2>
            <p className="mb-3">
              {renderText("Choose TWO letters, ")}
              <span className="font-bold">A–E</span>.
            </p>

            <p className="text-lg">
              <span className="font-bold">11–12 </span>
              {renderText(
                "Which TWO facts are given about the school’s extended hours childcare service?"
              )}
            </p>

            {[
              "It started recently.",
              "More children attend after school than before school.",
              "An average of 50 children attend in the mornings.",
              "A child cannot attend both the before and after school sessions.",
              "The maximum number of children who can attend is 70.",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              const selected = userAnswers["11-12"] || [];
              const checked = selected.includes(value);
              const disabled = selected.length === 2 && !checked;

              return (
                <label
                  key={value}
                  className={`flex items-center gap-3 mb-1 ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => handleInputChange("11-12", value)}
                  />
                  <span className="font-semibold">{value}.</span>
                  <span>{renderText(text)}</span>
                </label>
              );
            })}

            {/* ---------- Questions 13–15 ---------- */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 13–15")}
            </h2>
            <p className="mb-3">
              {renderText("Choose the correct letter, ")}
              <span className="font-bold">A, B or C</span>.
            </p>

            {/* Q13 */}
            <p className="text-lg font-bold">
              13{" "}
              {renderText(
                "How much does childcare cost for a complete afternoon session per child?"
              )}
            </p>
            {["£3.50", "£5.70", "£7.20"].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q13"
                    value={value}
                    checked={userAnswers[13] === value}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                  />
                  <span>
                    {value}. {text}
                  </span>
                </label>
              );
            })}

            {/* Q14 */}
            <p className="text-lg font-bold mt-4">
              14 {renderText("What does the manager say about food?")}
            </p>
            {[
              "Children with allergies should bring their own food.",
              "Children may bring healthy snacks with them.",
              "Children are given a proper meal at 5 p.m.",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q14"
                    value={value}
                    checked={userAnswers[14] === value}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                  />
                  <span>
                    {value}. {renderText(text)}
                  </span>
                </label>
              );
            })}

            {/* Q15 */}
            <p className="text-lg font-bold mt-4">
              15{" "}
              {renderText(
                "What is different about arrangements in the school holidays?"
              )}
            </p>
            {[
              "Children from other schools can attend.",
              "Older children can attend.",
              "A greater number of children can attend.",
            ].map((text, index) => {
              const value = String.fromCharCode(65 + index);
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="q15"
                    value={value}
                    checked={userAnswers[15] === value}
                    onChange={(e) => handleInputChange(15, e.target.value)}
                  />
                  <span>
                    {value}. {renderText(text)}
                  </span>
                </label>
              );
            })}

            {/* ---------- Questions 16–20 ---------- */}
            <h2 className="font-bold text-xl mt-6">
              {renderText("Questions 16–20")}
            </h2>
            <p className="mb-3">
              {renderText(
                "What information is given about each of the following activities on offer?"
              )}
            </p>

            <p className="font-semibold mb-2">
              {renderText("Choose the correct letter, A–G.")}
            </p>

            <div className="mb-4 border max-w-[250px] mx-auto p-4">
              <p className="font-semibold mb-2 text-center">
                {renderText("Information")}
              </p>
              {[
                "A. has limited availability",
                "B. is no longer available",
                "C. is for over 8s only",
                "D. requires help from parents",
                "E. involves an additional fee",
                "F. is a new activity",
                "G. was requested by children",
              ].map((item) => (
                <p key={item}>{renderText(item)}</p>
              ))}
            </div>

            {/* ---------- Questions 16–20 Activities ---------- */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">
                {renderText("Activities")}
              </h3>

              {["Spanish", "Music", "Painting", "Yoga", "Cooking"].map(
                (activity, index) => {
                  const qNum = 16 + index;

                  return (
                    <div key={qNum} className="flex items-center  mb-3">
                      {/* Left: number + activity */}
                      <div className="flex items-center gap-3">
                        <span className="font-bold w-6">{qNum}</span>
                        <span className="w-24">{renderText(activity)}</span>
                      </div>

                      {/* Right: dropdown */}
                      <select
                        value={userAnswers[qNum] || ""}
                        onChange={(e) =>
                          handleInputChange(qNum, e.target.value)
                        }
                        className="border rounded-md px-3 py-1 w-20 text-center"
                      >
                        <option value="">{qNum}</option>
                        {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                          <option key={letter} value={letter}>
                            {letter}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
              )}
            </div>
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
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (11–20)
                  </h3>

                  <ul className="space-y-3">
                    {["11-12", 13, 14, 15, 16, 17, 18, 19, 20].map((num) => {
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
      <Listening3Pagination2022></Listening3Pagination2022>
    </div>
  );
};

export default Listening3Part22022;
