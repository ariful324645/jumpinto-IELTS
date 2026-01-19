import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening3Pagination2024 from "../Pagination 2024/Listening3Pagination2024";

const Listening3Part32024 = () => {
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
        "Part 3, you will hear a trainee science teacher called Clare talking about her practical teaching work to another trainee called Jake.",
        "First, you have some time to look at questions 21 to 25.",
        "Now listen carefully and answer questions 21 to 25.",
      ],
    },
    {
      speaker: "CLARE",
      text: ["Hi, Jake. How are you getting on with the practical teaching?"],
    },
    {
      speaker: "JAKE",
      text: [
        "Oh, it's harder than I expected, but I've got some great classes. How about you?",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "Not brilliant. I'm really struggling with my Year 12 science class.",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Hmm. Are they hard to control?"],
    },
    {
      speaker: "CLARE",

      text: [
        "Well, I don't have discipline problems as such.",
        {
          text: " It's just that they don't seem to think that science has anything to do with their lives. It's depressing.",
          number: 21,
        },
        "They listen to what I say, and I gave them a test last week, and the results werent too bad, but there's no real engagement",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Right."],
    },
    {
      speaker: "CLARE",
      text: [
        "And as part of my teaching practice, I have to design an experiment for them to do. I was wondering about something on the children's diets, you know, asking them to record what they eat, and maybe linking it to their state of health.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Hmm, let's think. So your methodology would involve the children recording what they eat, OK?",
        {
          text: " But you'd also need to have access to the children's medical records.",
          number: 22,
        },
        "And I don't think people would be happy about that, confidentiality would be an issue. If you could get the right data, the conclusions might be significant, but I suspect it's not going to be easy.",
      ],
    },
    {
      speaker: "CLARE",
      text: ["Right."],
    },
    {
      speaker: "JAKE",
      text: ["Have you thought about doing an experiment using animals?"],
    },
    {
      speaker: "CLARE",
      text: ["Wouldn't that be upsetting for the children?"],
    },
    {
      speaker: "JAKE",
      text: [
        "Well, the animals don't have to be harmed in any way. It could just be an experiment where they're given a certain diet and the effects are observed.",
      ],
    },
    {
      speaker: "CLARE",
      text: ["Would I have to get permission to use animals?"],
    },
    {
      speaker: "JAKE",
      text: [
        "Yes, you'd have to submit an outline of the experiment and fill in a form. It's quite straightforward.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        {
          text: "But if we found out that say a particular diet affects the health of animals, the same thing wouldn't necessarily be true for people, would it?",
          number: 23,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "No, that's true. But the findings for any experiment are going to be limited, it's inevitable.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "I suppose so. So what animals could I use to investigate the effect of diet? Mice?",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Yes, you'd need experimental mice, ones that have been specially bred for experiments. OK, so what will your experiment be investigating exactly?",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "Well, uh something to do with nutrition. So maybe we could look at food supplements, things like extra iron and extra protein, and their impact on health.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Hmm. That might be rather broad, maybe just look at the effects of one supplement like sugar on the health of the mice.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        {
          text: "In fact, maybe the focus could be on whether mice can control their own diet.",
          number: 24,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "So, what happens when they have access to more sugar that they don't really need?",
      ],
    },
    {
      speaker: "CLARE",
      text: ["Exactly. Do they eat it, or do they decide to leave it?"],
    },
    {
      speaker: "JAKE",
      text: [
        "Great. Then later on, you could do a follow up experiment, adding another variable, like you could give some of the mice the chance to be more active, running on a wheel or something, and the others just sit around and don't do much.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        {
          text: "Or I could repeat the experiment, but change the type of food I provided. Or use mice with a different genetic structure, but I think your idea would be more interesting. I might think about that some more.",
          number: 25,
        },
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.",
        "Now listen and answer questions 26 to 30.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "So, can I talk through a possible procedure for the experiment where mice are given a sugar supplement?",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Sure, I did a similar experiment in college, actually."],
    },
    {
      speaker: "CLARE",
      text: ["Great. So, how many mice would I need?"],
    },
    {
      speaker: "JAKE",
      text: [
        {
          text: "I'd say about 12, and all young ones, not a mixture of old and young.",
          number: 26,
        },
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "OK, and I'd need two groups of equal sizes, so 6 in each group. And how would I tell them apart? I suppose I could put some sort of tag on one group, or just mark them in some way.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        {
          text: "You could use food coloring, that wouldn't hurt them.",
          number: 27,
        },
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "Perfect. Then each group would go into a separate cage, and one group, let's call them group a, would be the control group. So they just have ordinary mouse food. Uh. I suppose you can buy that.",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Yes, it comes in dry pellets."],
    },
    {
      speaker: "CLARE",
      text: [
        "And the other group would have the same as the first group, but they'd also have the extra sugar.",
      ],
    },
    {
      speaker: "JAKE",
      text: ["Would you just give them straight sugar?"],
    },
    {
      speaker: "CLARE",
      text: [
        {
          text: "It might be better to give them something like cereal with it.",
          number: 28,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: [
        "Hmm. Then you'd need to weigh the mice, I should think once a week, and you'd need an electronic balance.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "But we can't hold them on the balance, or it'd affect the reading.",
      ],
    },
    {
      speaker: "JAKE",
      text: [
        {
          text: "Exactly. So you need something called a weighing chamber to stop the mice from running away.",
          number: 29,
        },
      ],
    },
    {
      speaker: "CLARE",
      text: [
        "It sounds complicated, but actually you can just use a plastic box with holes in the top.",
      ],
    },
    {
      speaker: "CLARE",
      text: [
        {
          text: "OK, so once we've measured the weight gain of each mouse, we can work out the average for each group, as well as the standard deviation. And then see where we go from there. That sounds cool. I think the students will enjoy it.",
          number: 30,
        },
      ],
    },
    {
      speaker: "JAKE",
      text: ["Yes. One thing..."],
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

      // Announcer: male
      if (speaker === "ANNOUNCER") {
        return voices.find((v) => v.name.includes("Alex")) || voices[0];
      }
      if (speaker === "FATHER") {
        return voices.find((v) => v.name.includes("David")) || voices[0];
      }

      // Erica: female
      if (speaker === "SPEAKER") {
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
    // MCQ: Questions 21–25
    21: "C", // frustrated at their lack of interest in the subject
    22: "B", // some of the data might be difficult to obtain
    23: "B", // complicated to get permission
    24: "B", // increase in sugar leads to health problems
    25: "C", // varying amounts of exercise

    // Flowchart: Questions 26–30 (A–H)
    26: "C", // age
    27: "A", // size
    28: "E", // cereal
    29: "B", // escape
    30: "F", // calculations
  };

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
    localStorage.setItem("/2021/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2021/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/listening");
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
                  "Designing a Mouse Diet Experiment in the Context of Science Teaching"
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
            {renderText("Questions 21–25")}
          </h2>

          <p className="text-lg mb-6 font-semibold">
            {renderText("Choose the correct letter, A, B or C.")}
          </p>

          <p className="text-xl mb-6 font-bold text-center">
            {renderText("Science experiment for Year 12 students")}
          </p>
          {/* ---------- MCQ SECTION ---------- */}
          <div className="space-y-8">
            {/* Q21 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "21. How does Clare feel about the students in her Year 12 science class?"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q21"
                    value={opt}
                    checked={userAnswers[21] === opt}
                    onChange={() => handleInputChange(21, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. worried that they are not making progress"
                      : opt === "B"
                      ? "B. challenged by their poor behaviour in class"
                      : "C. frustrated at their lack of interest in the subject"
                  )}
                </label>
              ))}
            </div>

            {/* Q22 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "22. How does Jake react to Clare's suggestion about an experiment based on children's diet?"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q22"
                    value={opt}
                    checked={userAnswers[22] === opt}
                    onChange={() => handleInputChange(22, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. He is concerned that the results might not be meaningful."
                      : opt === "B"
                      ? "B. He feels some of the data might be difficult to obtain."
                      : "C. He suspects that the conclusions might be upsetting."
                  )}
                </label>
              ))}
            </div>

            {/* Q23 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "23. What problem do they agree may be involved in an experiment involving animals?"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q23"
                    value={opt}
                    checked={userAnswers[23] === opt}
                    onChange={() => handleInputChange(23, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. Any results may not apply to humans."
                      : opt === "B"
                      ? "B. It may be complicated to get permission."
                      : "C. Students may not be happy about animal experiments."
                  )}
                </label>
              ))}
            </div>

            {/* Q24 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "24. What question do they decide the experiment should address?"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q24"
                    value={opt}
                    checked={userAnswers[24] === opt}
                    onChange={() => handleInputChange(24, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. Are mice capable of controlling their food intake?"
                      : opt === "B"
                      ? "B. Does an increase in sugar lead to health problems?"
                      : "C. How much do supplements of different kinds affect health?"
                  )}
                </label>
              ))}
            </div>

            {/* Q25 */}
            <div>
              <p className="font-semibold">
                {renderText(
                  "25. Clare might also consider doing another experiment involving"
                )}
              </p>
              {["A", "B", "C"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="q25"
                    value={opt}
                    checked={userAnswers[25] === opt}
                    onChange={() => handleInputChange(25, opt)}
                  />
                  {renderText(
                    opt === "A"
                      ? "A. other types of food supplement."
                      : opt === "B"
                      ? "B. different genetic strains of mice."
                      : "C. varying amounts of exercise."
                  )}
                </label>
              ))}
            </div>
          </div>

          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 26–30")}
          </h2>

          <p className="font-semibold mb-2">
            {renderText("Complete the flowchart below.")}
          </p>

          <p className="font-semibold mb-4">
            {renderText(
              "Choose the correct letter, A–H, in boxes 26–30 on your answer sheet."
            )}
          </p>

          <div className="border p-4 mb-6 max-w-[150px] mx-auto rounded">
            <p>A. size</p>
            <p>B. escape</p>
            <p>C. age</p>
            <p>D. water</p>
            <p>E. cereal</p>
            <p>F. calculations</p>
            <p>G. changes</p>
            <p>H. colour</p>
          </div>

          <h2 className="text-xl font-bold text-center mb-6">
            {renderText("Science experiment")}
          </h2>

          {/* A–H OPTIONS */}
          {/*
  Keep this array ABOVE return if needed
  const flowchartOptions = ["A","B","C","D","E","F","G","H"];
*/}

          <div className="space-y-6 max-w-[600px] mx-auto border p-4">
            {/* Step 26 */}
            <p className="flex items-center gap-2 border p-2  flex-wrap">
              {renderText("Choose mice which are all the same")}
              <button
                onClick={() => toggleButton(26)}
                className={`w-7 h-7 rounded-full border-2 ${
                  activeButtons[26]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                26
              </button>
              <select
                value={userAnswers[26] || ""}
                onChange={(e) => handleInputChange(26, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              .
            </p>

            <div className="text-center text-2xl">↓</div>

            {/* Step 27 */}
            <p className="flex items-center gap-2 border p-2 flex-wrap">
              {renderText(
                "Divide the mice into two groups, each with a different"
              )}
              <button
                onClick={() => toggleButton(27)}
                className={`w-7 h-7 rounded-full border-2 ${
                  activeButtons[27]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                27
              </button>
              <select
                value={userAnswers[27] || ""}
                onChange={(e) => handleInputChange(27, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              .
            </p>

            <div className="text-center text-2xl">↓</div>
            <div className="border p-2">
              <p>{renderText("Put each group in a separate cage.")}</p>
              <p>{renderText("Feed group A commercial mouse food.")}</p>

              {/* Step 28 */}
              <p className="flex items-center gap-2  flex-wrap">
                {renderText(
                  "Feed group B the same, but also sugar contained in"
                )}
                <button
                  onClick={() => toggleButton(28)}
                  className={`w-7 h-7 rounded-full border-2 ${
                    activeButtons[28]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  28
                </button>
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="border px-3 py-1 rounded"
                >
                  {" "}
                  <option value=""></option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                .
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>
            <div className="border p-2">
              <p>
                {renderText("Take measurements using an electronic scale.")}
              </p>

              {/* Step 29 */}
              <p className="flex items-center gap-2  flex-wrap">
                {renderText("Place them in a weighing chamber to prevent")}
                <button
                  onClick={() => toggleButton(29)}
                  className={`w-7 h-7 rounded-full border-2 ${
                    activeButtons[29]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  29
                </button>
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="border px-3 py-1 rounded"
                >
                  {" "}
                  <option value=""></option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                .
              </p>
            </div>

            <div className="text-center text-2xl">↓</div>

            {/* Step 30 */}
            <p className="flex items-center border p-2 gap-2 flex-wrap">
              {renderText("Do all necessary")}
              <button
                onClick={() => toggleButton(30)}
                className={`w-7 h-7 rounded-full border-2 ${
                  activeButtons[30]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                30
              </button>
              <select
                value={userAnswers[30] || ""}
                onChange={(e) => handleInputChange(30, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                {" "}
                <option value=""></option>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              .
            </p>
          </div>
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
                    {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((num) => {
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
      <Listening3Pagination2024></Listening3Pagination2024>
    </div>
  );
};

export default Listening3Part32024;
