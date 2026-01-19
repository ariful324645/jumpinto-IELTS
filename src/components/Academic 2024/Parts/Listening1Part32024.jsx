import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening1Pagination2024 from "../Pagination 2024/Listening1Pagination2024";

const Listening1Part32024 = () => {
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
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const lines = [
    {
      speaker: "ANNOUNCER",
      text: [
        "Part 3, you will hear two food science students called Marie and Colin discussing their final year projects.",
        "First, you have some time to look at questions 21 to 24.",
        "Now listen carefully and answer questions 21 to 24.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["I haven't seen you for a bit, Marie."],
    },
    {
      speaker: "MARIE",
      text: ["No, I've been busy with my project."],
    },
    {
      speaker: "COLIN",
      text: [
        "You're making a vegan alternative to eggs, aren't you? Something that doesn't use animal products.",
      ],
    },
    {
      speaker: "MARIE",
      text: [
        "Yes. I'm using chickpeas. I had two main aims when I first started looking for an alternative to eggs, but actually I found chickpeas have got more advantages.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["Right."],
    },
    {
      speaker: "MARIE",
      text: [
        "But how about your project on reusing waste food? You were looking at bread, weren't you?",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Yes, it's been hard work, but I've enjoyed it. The basic process was quite straightforward, breaking the stale bread down to a paste, then reforming it.",
      ],
    },
    {
      speaker: "MARIE",
      text: [
        "But you were using 3D printing, weren't you, to make the paste into biscuits?",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Yeah, I'd used that before, but in this project, I had time to play around with different patterns for the biscuits, and finding how I could add fruit and vegetables to make them a more appetizing color.",
        {
          text: "And I was really pleased with what I managed to produce.",
          number: 22,
        },
      ],
    },
    {
      speaker: "MARIE",
      text: [
        {
          text: "It must have been a great feeling to make something appetizing out of bits of old bread that would have been thrown away otherwise",
          number: 21,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "It was. And I'm hoping that some of the restaurants in town will be interested in the biscuits. I'm going to send them some samples.",
      ],
    },
    {
      speaker: "MARIE",
      text: [
        "I came across something on the internet yesterday that might interest you. It was a company that's developed touch sensitive sensors for food labels. Hmm. It's a special sort of label on the food package. When the label's smooth, the food is fresh. And then when you can feel bumps on the label, that means the food's gone bad. It started off as a project to help visually impaired people. To know whether food was fit to eat or not.",
      ],
    },
    {
      speaker: "COLIN",
      text: ["Interesting. So just solid food?"],
    },
    {
      speaker: "MARIE",
      text: [
        "No, things like milk and juice as well. ",
        {
          text: "But actually I thought it might be really good for drug storage in hospitals and pharmacies.",
          number: 23,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Right. And coming back to food, maybe it would be possible to use it for other things besides freshness. ",
        {
          text: "Like how many kilograms a joint of meat is, for example?",
          number: 24,
        },
      ],
    },
    {
      speaker: "MARIE",
      text: ["Yes, there's all sorts of possibilities."],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 25 to 30.",
        "Now listen and answer questions 25 to 30.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "I was reading an article about food trends, predicting how eating habits might change in the next few years.",
      ],
    },
    {
      speaker: "MARIE",
      text: [
        "Oh, things like more focus on local products. That seems so obvious, but the shops are still full of imported foods.",
        {
          text: " Yes, they need to be more proactive to address that, and somehow motivate consumers to change, yes.",
          number: 25,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "One thing everyone's aware of is the need for a reduction in unnecessary packaging, but just about everything you buy in supermarkets is still covered in plastic.",
        { text: " The government needs to do something about it.", number: 26 },
      ],
    },
    {
      speaker: "MARIE",
      text: ["Absolutely. It's got to change."],
    },
    {
      speaker: "COLIN",
      text: [
        "Do you think there'll be more interest in gluten and lactose free food?",
      ],
    },
    {
      speaker: "MARIE",
      text: [
        "For people with allergies or food intolerances. ",
        {
          text: "I don't know, lots of people I know have been buying that type of food for years now.",
          number: 27,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: ["Yes, even if they haven't been diagnosed with an allergy."],
    },
    {
      speaker: "MARIE",
      text: [
        "That's right. One thing I've noticed is the number of branded products related to celebrity chefs. People watch them cooking on TV. And then buy things like spice mixes or frozen foods with the chef's name on. I bought something like that once, but I won't again.",
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Yeah, I bought a ready made spice mix for chicken, which was supposed to be used by a chef I'd seen on television. ",
        { text: "And it didn't actually taste of anything.", number: 28 },
      ],
    },
    {
      speaker: "MARIE",
      text: [
        "Hmm. Did the article mention ghost kitchens used to produce takeaway food?",
      ],
    },
    {
      speaker: "COLIN",
      text: ["No, what are they?"],
    },
    {
      speaker: "MARIE",
      text: [
        "Well, they might have the name of a restaurant, but actually they're a cooking facility just for delivery meals. The public don't ever go there. ",
        {
          text: "But people aren't aware of that, it's all kept very quiet.",
          number: 29,
        },
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "So, people don't realize the food's not actually from the restaurant?",
      ],
    },
    {
      speaker: "MARIE",
      text: ["Right."],
    },
    {
      speaker: "COLIN",
      text: [
        "Hmm. Did you know more and more people are using all sorts of different mushrooms now to treat different health concerns, uh, things like heart problems.",
      ],
    },
    {
      speaker: "MARIE",

      text: [
        { text: "Hmm, they might be taking a big risk there.", number: 30 },
      ],
    },
    {
      speaker: "COLIN",
      text: [
        "Yes, it's hard to know which varieties are safe to eat. Anyway, maybe now we should...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 3.",
        "You now have 30 seconds to check your answers to part 3.",
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
      if (speaker === "ANNOUNCER")
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      if (speaker === "TC EMPLOYEE")
        return voices.find((v) => v.name.includes("Zira")) || voices[0];
      if (speaker === "OFFICER")
        return voices.find((v) => v.name.includes("David")) || voices[0];
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
    // Questions 21–22 (Choose TWO letters, A–E)
    "21-22": ["B", "C"], // finding a good way to prevent waste, overcoming problems in a basic process

    // Questions 23–24 (Choose TWO letters, A–E)
    "23-24": ["B", "D"], // to show that food is no longer fit to eat, to provide applications for blind people

    // Questions 25–30 (Students' opinion about food trends, letters A–H)
    25: "C", // Use of local products → This already seems to be widespread
    26: "B", // Reduction in unnecessary packaging → This may have disappointing results
    27: "F", // Gluten-free and lactose-free food → Most people know little about this
    28: "D", // Use of branded products related to celebrity chefs → Retailers should do more to encourage this
    29: "E", // Development of 'ghost kitchens' for takeaway food → More financial support is needed for this
    30: "G", // Use of mushrooms for common health concerns → There should be stricter regulations about this
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "21-22" || id === "23-24") {
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

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/listening1Part22022");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/listening1Part22022");
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
                  "Colin and Marie's Discussion on Food Trends, Projects and Innovations"
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          {/* ---------- Header ---------- */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 21–30")}
          </h2>

          <div className="p-6 rounded-lg space-y-10 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Student Projects & Food Trends")}
            </h1>

            {/* ================= Questions 21–22 ================= */}
            <div>
              <h2 className="font-bold text-xl">Questions 21 and 22</h2>
              <p className="mt-2">
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                21–22{" "}
                {renderText(
                  "Which TWO things did Colin find most satisfying about his bread reuse project?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "receiving support from local restaurants",
                  "finding a good way to prevent waste",
                  "overcoming problems in a basic process",
                  "experimenting with designs and colours",
                  "learning how to apply 3-D printing",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["21-22"] || [];
                  const isChecked = selected.includes(value);
                  const isDisabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isDisabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleInputChange("21-22", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 23–24 ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-xl">Questions 23 and 24</h2>
              <p>
                {renderText("Choose TWO letters, ")}
                <span className="font-bold">A–E</span>.
              </p>

              <p className="font-bold text-lg mt-3">
                23–24{" "}
                {renderText(
                  "Which TWO ways do the students agree that touch-sensitive sensors for food labels could be developed in future?"
                )}
              </p>

              <div className="space-y-2">
                {[
                  "for use on medical products",
                  "to show that food is no longer fit to eat",
                  "for use with drinks as well as foods",
                  "to provide applications for blind people",
                  "to indicate the weight of certain foods",
                ].map((opt, idx) => {
                  const value = String.fromCharCode(65 + idx);
                  const selected = userAnswers["23-24"] || [];
                  const isChecked = selected.includes(value);
                  const isDisabled = selected.length === 2 && !isChecked;

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isDisabled ? "opacity-50" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleInputChange("23-24", value)}
                      />
                      <span className="font-semibold">{value}.</span>
                      <span>{renderText(opt)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ================= Questions 25–30 ================= */}
            <div className="mt-10">
              <h2 className="font-bold text-xl">Questions 25–30</h2>
              <p className="mt-2">
                {renderText(
                  "Choose the correct letter, A–H, next to each question."
                )}
              </p>
              <div className="space-y-2 border p-4 max-w-[450px] mx-auto mt-5">
                <h2 className="font-bold text-2xl text-center">
                  {renderText("Opinions")}
                </h2>
                <p>
                  <strong>A.</strong>{" "}
                  {renderText("This is only relevant to young people.")}
                </p>
                <p>
                  <strong>B.</strong>{" "}
                  {renderText("This may have disappointing results.")}
                </p>
                <p>
                  <strong>C.</strong>{" "}
                  {renderText("This already seems to be widespread.")}
                </p>
                <p>
                  <strong>D.</strong>{" "}
                  {renderText("Retailers should do more to encourage this.")}
                </p>
                <p>
                  <strong>E.</strong>{" "}
                  {renderText("More financial support is needed for this.")}
                </p>
                <p>
                  <strong>F.</strong>{" "}
                  {renderText("Most people know little about this.")}
                </p>
                <p>
                  <strong>G.</strong>{" "}
                  {renderText(
                    "There should be stricter regulations about this."
                  )}
                </p>
                <p>
                  <strong>H.</strong> {renderText("This could be dangerous.")}
                </p>
              </div>

              {[
                { num: 25, label: "Use of local products" },
                { num: 26, label: "Reduction in unnecessary packaging" },
                { num: 27, label: "Gluten-free and lactose-free food" },
                {
                  num: 28,
                  label: "Use of branded products related to celebrity chefs",
                },
                {
                  num: 29,
                  label: "Development of 'ghost kitchens' for takeaway food",
                },
                {
                  num: 30,
                  label: "Use of mushrooms for common health concerns",
                },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center gap-2 mt-4">
                  <div className="font-bold flex items-center gap-2 justify-center">
                    <span>{num}.</span>
                    <h2> {renderText(label)}</h2>
                  </div>
                  <select
                    value={userAnswers[num] || ""}
                    onChange={(e) => handleInputChange(num, e.target.value)}
                    className="border rounded-md px-3 py-1"
                  >
                    <option value="">{num}</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* ================= Submit & Result ================= */}
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
                      {renderText("Your Score: ")} {score}/10
                    </p>
                  </div>

                  {/* All Answers List */}
                  <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-700 mb-3">
                      {renderText("All Answers (21–30)")}
                    </h3>

                    <ul className="space-y-3">
                      {["21-22", "23-24", 25, 26, 27, 28, 29, 30].map((num) => {
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
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Listening1Pagination2024></Listening1Pagination2024>
    </div>
  );
};

export default Listening1Part32024;
