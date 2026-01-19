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
        "Part 4, you will hear an archaeology student giving a presentation on an important site in Ireland called the Céide Fields.",
        "First you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "For my presentation today, I'm going to talk about the Céide Fields in the northwest of Ireland, one of the largest Neolithic sites in the world.",
        "I recently visited this site and observed the work that is currently being done by a team of archaeologists there.",
        "The site was first discovered in the 1930s by a local teacher, Patrick Caulfield.",
        "He noticed that when local people were digging in the bog, they were constantly hitting against what seemed to be rows of stones.",
        "He realized that these must be walls, and that they must be thousands of years old for them to predate the bog which subsequently grew over them.",
        {
          text: "He wrote to the National Museum in Dublin to ask them to investigate, but no one took him seriously.",
          number: 31,
        },
        "It wasn't until 40 years later, when Patrick Caulfield's son Seamus, who had become an archaeologist by then, began to explore further.",
        {
          text: "He inserted iron probes into the bog, to map the formation of the stones. A traditional method which local people had always used for finding fuel buried in the bog for thousands of years.",
          number: 32,
        },
        "Carbon dating later proved that the site was over 5,000 years old, and was the largest Neolithic site in Ireland.",
        "Thanks to the bog which covers the area, the remains of the settlement at Céide Fields, which is over 5,000 years old, are extremely well preserved.",
        "A bog is 90% water, its soil so saturated that when the grasses and heathers that grow on its surface die, they don't fully decay, but accumulate in layers.",
        "Objects remain so well preserved in these conditions because of the acidity of the peat, and the deficiency of oxygen.",
        {
          text: "At least 175 days of rain a year are required for this to happen. This part of Ireland gets an average of 225 days.",
          number: 33,
        },
        "The Neolithic farmers at Céide would have enjoyed several centuries of relative peace and stability.",
        "Neolithic farmers generally lived in larger communities than their predecessors, with a number of houses built around a community building.",
        "As they lived in permanent settlements, Neolithic farmers were able to build bigger houses.",
        "These weren't round as people often assume, but rectangular, with a small hole in the roof that allowed smoke to escape.",
        {
          text: "This is one of many innovations, and indicates that the Neolithic farmers were the first people to cook indoors.",
          number: 34,
        },
        "Another new technology that Neolithic settlers brought to Ireland was pottery.",
        "Fragments of Neolithic pots have been found in Céide and elsewhere in Ireland.",
        "The pots were used for many things, as well as for storing food.",
        "Pots were filled with a small amount of fat, and when this was set alight, they served as lamps.",
        {
          text: "It's thought that the Céide Fields were mainly used as paddocks for animals to graze in.",
          number: 35,
        },
        "Evidence from the Céide Fields suggests that each plot of land was of a suitable size, to sustain an extended family.",
        {
          text: "Uh. They may have used a system of rotational grazing in order to prevent overgrazing and to allow for plant recovery and regrowth. This must have been a year-round activity, as no structures have been found which would have been used to shelter animals in the winter.",
          number: 36,
        },
        "However, archaeologists believe that this way of life at Céide ceased abruptly.",
        "Why was this?",
        "Well, several factors may have contributed to the changing circumstances.",
        "The soil would have become less productive, and led to the abandonment of farming.",
        {
          text: "The crop rotation system was partly responsible for this, as it would have been very intensive and was not sustainable.",
          number: 37,
        },
        "But there were also climatic pressures too.",
        "The farmers at Céide would have enjoyed a relatively dry period, but this began to change, and the conditions became wetter as there was a lot more rain.",
        {
          text: "It was these conditions that encouraged the bog to form over the area, which survives today.",
          number: 38,
        },
        "So now I'd like to show you some...",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of part 4.",
        "You now have one minute to check your answers to part 4.",
        "That is the end of the listening test.",
        "In the IELTS test, you would now have 10 minutes to transfer your answers to the listening answer sheet.",
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
    // Questions 31–40 (Céide Fields, one-word answers)
    31: "fields", // stones beneath the bog surface were once fields
    32: "son", // His son became an archaeologist
    33: "turf", // traditional method to dig for turf
    34: "oxygen", // Items preserved due to lack of oxygen
    35: "rectangular", // Houses were rectangular in shape
    36: "food", // pots used to store and make food
    37: "family", // Each field supported a big family
    38: "winter", // No evidence of structures to house animals during winter
    39: "soil", // decline in soil quality
    40: "rainfall",
  };

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
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
            <h1 className="text-xl font-bold">{renderText("    PART 4")}</h1>
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
                {renderText("The Céide Fields: A Neolithic Site in Ireland")}
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
            {renderText("Questions 31–40")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">{renderText("ONE WORD ONLY")}</span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border p-6  space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Céide Fields")}
            </h1>

            <h3 className="font-semibold mt-4">{renderText("Discovery")}</h3>

            <p className="text-lg">
              {renderText(
                "In the 1930s, a local teacher realised that stones beneath the bog surface were once"
              )}
              <button
                onClick={() => toggleButton(31)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[31]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                31
              </button>
              <input
                value={userAnswers[31] || ""}
                onChange={(e) => handleInputChange(31, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <p className="text-lg">
              {renderText("His")}
              <button
                onClick={() => toggleButton(32)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[32]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                32
              </button>
              <input
                value={userAnswers[32] || ""}
                onChange={(e) => handleInputChange(32, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                "became an archaeologist and undertook an investigation of the site:"
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "A traditional method used by local people to dig for"
              )}
              <button
                onClick={() => toggleButton(33)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[33]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                33
              </button>
              <input
                value={userAnswers[33] || ""}
                onChange={(e) => handleInputChange(33, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText(
                "was used to identify where stones were located. Carbon dating later proved the site was Neolithic."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Items are well preserved in the bog because of a lack of"
              )}
              <button
                onClick={() => toggleButton(34)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[34]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                34
              </button>
              <input
                value={userAnswers[34] || ""}
                onChange={(e) => handleInputChange(34, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Neolithic farmers")}
            </h3>

            <p className="text-lg">
              {renderText("Houses were")}
              <button
                onClick={() => toggleButton(35)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[35]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                35
              </button>
              <input
                value={userAnswers[35] || ""}
                onChange={(e) => handleInputChange(35, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("in shape and had a hole in the roof.")}
            </p>

            <p className="text-lg">
              {renderText(
                "Neolithic innovations include pots used for storage and to make"
              )}
              <button
                onClick={() => toggleButton(36)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[36]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                36
              </button>
              <input
                value={userAnswers[36] || ""}
                onChange={(e) => handleInputChange(36, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <p className="text-lg">
              {renderText(
                "Each field at Céide was large enough to support a big"
              )}
              <button
                onClick={() => toggleButton(37)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[37]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                37
              </button>
              <input
                value={userAnswers[37] || ""}
                onChange={(e) => handleInputChange(37, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <p className="text-lg">
              {renderText(
                "The fields were probably used to restrict the grazing of animals - no evidence of structures to house them during"
              )}
              <button
                onClick={() => toggleButton(38)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[38]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                38
              </button>
              <input
                value={userAnswers[38] || ""}
                onChange={(e) => handleInputChange(38, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>

            <h3 className="font-semibold mt-4">
              {renderText("Reasons for the decline in farming")}
            </h3>

            <p className="text-lg">
              {renderText("A decline in")}
              <button
                onClick={() => toggleButton(39)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[39]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                39
              </button>
              <input
                value={userAnswers[39] || ""}
                onChange={(e) => handleInputChange(39, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              {renderText("quality.")}
            </p>

            <p className="text-lg">
              {renderText("An increase in")}
              <button
                onClick={() => toggleButton(40)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[40]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                40
              </button>
              <input
                value={userAnswers[40] || ""}
                onChange={(e) => handleInputChange(40, e.target.value)}
                className="border rounded-md px-2 py-1 w-32"
              />
              .
            </p>
          </div>

          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
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
                    All Answers (31–40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 31).map((num) => {
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
                              </span>
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
      <Listening1Pagination2024></Listening1Pagination2024>
    </div>
  );
};

export default Listening1Part32024;
