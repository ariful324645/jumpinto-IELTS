import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import Listening4Pagination2017 from "../Pagination2017/Listening4Pagination2017";

const Listening4Part42017 = () => {
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
        "Section 4. You will hear part of a lecture about noise in cities.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "This lecture will be about the science of acoustics, the study of sound in relation to urban environments such as cities.",
        "As an acoustic engineer myself, I think this is an area where we're likely to see great changes.",
        "In the past, researching urban soundscapes was simple.",
        "We measured levels of sound in decibels.",
        "So I used to take my sound meter, and I measured the noise somewhere.",
        "And then I might ask a sample of people to say at what level the sound became annoying.",
        "With data like this, acoustic engineers have been able to build up what we call noise maps, maps of the sound environment.",
        "But actually these aren't a lot of use.",
        "What they do show is that the highest noise levels are generally on roads.",
        "Well, that's not really very surprising.",
        "But there's quite a lot going on that these maps don't show, because they can't capture the complex way that sound varies over time.",

        {
          text: "So they ignore important issues such as the noise someone might hear from the open windows or gardens of their neighbors, and this sort of noise can be quite significant in summer.",
          number: 31,
        },
        "We don't have any databases on this sort of information.",
        "As well as that, these records of sound levels take no account of the fact that people vary in their perceptions of noise.",
        "So someone like me with years of working in acoustics might be very different from you in that regard.",
        "But anyway, even though these noise maps are fairly crude, they've been useful in providing information and raising awareness that noise matters.",

        {
          text: "We need to deal with it, and so it's a political matter.",
          number: 32,
        },
        "And that's important.",
        "We need rules and regulations, because noise can cause all sorts of problems.",
        "Those of you who are city dwellers know that things go on 24 hours a day, so city dwellers often suffer from interrupted sleep.",
        "It's also known that noise can lead to a rise in levels of stress.",
        "Due to physical changes in the body, affecting the composition of the blood.",
        "And there are other problems as well.",
        "For instance, if school children don't have a quiet place to study, ",
        {
          text: "their work will suffer.",
          number: 33,
        },
        "Now one problem with decibel measurement is that it doesn't differentiate between different types of noise.",
        "Some types of sounds that most people would probably think of as nice and relaxing might well score quite highly in decibel levels.",
        {
          text: "Think of the sound made by a fountain in a town square, for example.",
          number: 34,
        },
        "That's not necessarily something that we'd want to control or reduce.",
        "So maybe researchers should consider these sorts of sounds in urban design.",
        "This is going to be tricky, because just measuring decibel levels isn't going to help us here.",

        {
          text: "Instead, many researchers are using social science techniques, studying people's emotional response to sound by using questionnaires and so on.",
          number: 35,
        },
        "So what exactly do people want to hear in an urban environment?",
        "Some recent interdisciplinary research has come out with results that at first sight seem contradictory.",

        {
          text: "A city needs to have a sense of activity, so it needs to be lively, with sounds like the clack of high heels on a pavement, or the hiss of a coffee machine.",
          number: 36,
        },
        "But these mustn't be too intrusive, because at the same time, we need to be able to relax.",
        "One of the major problems in achieving this will be getting architects and town planners to use the research, apart from studying the basics of acoustics.",

        {
          text: "These people receive very little training in this area.But in fact, they should be regarding sound as an opportunity to add to the experience of urban living.",
          number: 37,
        },
        "Or something that's just a job for engineers, like the street drainage system.",
        "What's needed is for noise in cities to be regarded as an aesthetic quality, as something that has the qualities of an art form.",
        "If we acknowledge this, then we urgently need to know what governs it, and how designers can work with it.",
        {
          text: "What is the relationship between sound and culture?",
          number: 38,
        },
        "What can we learn from disciplines such as psychology about the way that sound interacts with human development and social relationships?",
        "And the way that sound affects our thoughts and feelings.",
        {
          text: "Can we learn anything from physics about the nature of sound itself?",
          number: 39,
        },

        {
          text: "Today's powerful technologies can also help us.To show us their ideas, and help us to imagine the effect their buildings will have, architects and town planners already use virtual reality — but these programs are silent.",
          number: 40,
        },
        "In the future, such programs could use realistic sounds.",
        "Meaning that soundscapes could be explored before being built.",
        "So hopefully, using the best technology we can lay our hands on, the city of the future will be a pleasure to the ears as well as the eyes.",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of Section 4.",
        "You now have half a minute to check your answers.",
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
      if (speaker === "BOB") {
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
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const list = window.speechSynthesis.getVoices();
      console.log("Available voices:", list);
    };
  }, []);

  //  Marks show

 const correctAnswers = {
   31: "gardens",
   32: "political",
   33: "work",
   34: "fountain",
   35: "social",
   36: "lively",
   37: "training",
   38: "culture",
   39: "nature",
   40: "silent",
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
    localStorage.setItem("/2017/Test 4/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2017/Test 4/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 4/listening");
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
                {renderText("Noise in cities")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
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

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 31–40")}
          </h2>
          <br />
          <h3 className="text-lg mb-5">
            {renderText("Complete the notes below.")} <br /> <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>
          {/* box text */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("Noise in Cities")}
            </h1>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText(
                  "Past research focused on noise level (measured in decibels) and people's responses."
                )}
              </li>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Noise maps")}
              </h2>

              <ul className="list-disc list-inside ml-6 space-y-2">
                <li>
                  {renderText(
                    "show that the highest noise levels are usually found on roads"
                  )}
                </li>

                <li className="flex flex-wrap items-center">
                  {renderText(
                    "do not show other sources of noise, e.g. when windows are open or people's neighbours are in their"
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                </li>

                <li className="flex flex-wrap items-center">
                  {renderText(
                    "ignore variations in people's perceptions of noise"
                  )}
                </li>

                <li className="flex flex-wrap items-center">
                  {renderText("have made people realize that the noise is a")}
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(" issue that must be dealt with")}
                </li>
              </ul>

              <h2 className="text-lg font-bold mb-3">
                {renderText("Problems caused by noise")}
              </h2>

              <ul className="list-disc list-inside ml-6 space-y-2">
                <li>{renderText("sleep disturbance")}</li>
                <li>{renderText("increase in amount of stress")}</li>

                <li className="flex flex-wrap items-center">
                  {renderText("effect on the")}
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(" of schoolchildren")}
                </li>
              </ul>

              <h2 className="text-lg font-bold mb-3">
                {renderText("Different types of noise")}
              </h2>

              <ul className="list-disc list-inside ml-6 space-y-2">
                <li className="flex flex-wrap items-center">
                  {renderText(
                    "Some noises can be considered pleasant e.g. the sound of a"
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(" in a town")}
                </li>

                <li className="flex flex-wrap items-center">
                  {renderText(
                    "To investigate this, researchers may use methods from"
                  )}
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(" sciences e.g. questionnaires")}
                </li>
              </ul>

              <h2 className="text-lg font-bold mb-3">
                {renderText("What people want")}
              </h2>

              <ul className="list-disc list-inside ml-6 space-y-2">
                <li className="flex flex-wrap items-center">
                  {renderText(
                    "Plenty of activity in urban environments which are"
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(", but also allow people to relax")}
                </li>

                <li className="flex flex-wrap items-center">
                  {renderText(
                    "But architects and town planners do not get much"
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(" in acoustics")}
                </li>
              </ul>

              <h2 className="text-lg font-bold mb-3">
                {renderText("Understanding sound as an art form")}
              </h2>

              <ul className="list-disc list-inside ml-6 space-y-2">
                <li className="flex flex-wrap items-center">
                  {renderText("how sound relates to")}
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                </li>

                <li className="flex flex-wrap items-center">
                  {renderText("whether physics can help us understand the")}
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
                    className="border-2 rounded-md px-2 py-1"
                    type="text"
                  />
                  {renderText(" of sound")}
                </li>
              </ul>

              <li className="text-lg">
                {renderText("Virtual reality programs")}
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>
                    {renderText("advantage: predict the effect of buildings")}
                  </li>

                  <li className="flex flex-wrap items-center">
                    {renderText("current disadvantage: they are")}
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
                      className="border-2 rounded-md px-2 py-1"
                      type="text"
                    />
                  </li>
                </ul>
              </li>
            </ul>
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
      <Listening4Pagination2017></Listening4Pagination2017>
    </div>
  );
};

export default Listening4Part42017;
