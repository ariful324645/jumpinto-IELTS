import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

import Listening1Pagination2016 from "../Pagination2016/Listening1Pagination2016";

const Listening1Part42016 = () => {
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
        "Section 4. You will hear part of a student presentation about the variety of different species that live in the world's oceans.",
        "First, you have some time to look at questions 31 to 40.",
        "Now listen carefully, and answer questions 31 to 40.",
      ],
    },
    {
      speaker: "SPEAKER",
      text: [
        "I've been looking at ocean biodiversity.",
        "That's the diversity of species that live in the world's oceans.",
        "About 20 years ago, biologists developed the idea of what they called biodiversity hotspots.",
        "These are the areas which have the greatest mixture of species, so one example is Madagascar.",
        "These hotspots are significant.",

        {
          text: "Because they allow us to locate key areas for focusing efforts at conservation.",
          number: 31,
        },
        "Biologists can identify hotspots on land fairly easily.",
        "But until recently, very little was known about species distribution and diversity in the oceans, and no one even knew if hotspots existed there.",
        "Then a Canadian biologist called Boris Worm did some research in 2005 on data on ocean species that he got from the fishing industry.",
        "Worm located five hotspots for large ocean predators like sharks, and looked at what they had in common.",
        "The main thing he'd expected to find was that they had very high concentrations of food.",
        {
          text: "But to his surprise, that was only true for four of the hotspots.",
          number: 32,
        },
        "The remaining hotspots were quite badly off in that regard.",

        {
          text: "But what he did find was that in all cases, the water at the surface of the ocean had relatively high temperatures.",
          number: 33,
        },
        "Even when it was cool at greater depths.",
        "So, this seemed to be a factor in supporting a diverse range of these large predators.",

        {
          text: "However, this wasn't enough on its own, because he also found that the water needed to have enough oxygen in it.",
          number: 34,
        },
        "So these two factors seem necessary to support the high metabolic rate of these large fish.",
        "A couple of years later, in 2007, a researcher called Lisa Balance, who was working in California, also started looking for ocean hotspots.",
        "But not for fish.",

        {
          text: "What she was interested in was marine mammals, things like seals.",
          number: 35,
        },
        "And she found three places in the oceans which were hotspots.",
        "And what these had in common was that these hotspots were all located at boundaries between ocean currents.",
        "This seems to be the sort of place that has lots of the plankton that some of these species feed on.",
        "So now people who want to protect the species that are endangered need to get as much information as possible.",
        "For example, there's an international project called the Census of Marine Life.",
        "They've been surveying oceans all over the world, including the Arctic.",

        {
          text: "One thing they found there, which stunned other researchers, was that there were large numbers of species which live below the ice.",
          number: 36,
        },
        "Sometimes under a layer up to 20 meters thick.",
        "Some of these species had never been seen before.",
        "They've even found species of octopus living in these conditions.",
        "And other scientists working on the same project, but researching very different habitats on the ocean floor, have found large numbers of species congregating around volcanoes.",
        "Attracted to them by the warmth and nutrients there.",
        "However, biologists still don't know how serious the threat to their survival is for each individual species.",
        "So a body called the Global Marine Species Assessment is now creating a list of endangered species.",
        "They consider things like the size of the population, how many members of one species there are in a particular place.",
        "And then they look at their distribution in geographical terms.",
        "Although this is quite difficult when you're looking at fish, because they're so mobile.",
        {
          text: "And then thirdly, they calculate the rate at which the decline of the species is happening.",
          number: 37,
        },
        "So far, only 1,500 species have been assessed, but they want to increase this figure to 20,000.",
        "For each one they assess, ",
        {
          text: "they use the data they collect to produce a map showing its distribution.",
          number: 38,
        },
        "Ultimately, they will be able to use these to figure out not only where most species are located.",
        "But also where they are most threatened.",
        "So finally, what can be done to retain the diversity of species in the world's oceans?",
        "Firstly, we need to set up more reserves in our oceans, places where marine species are protected.",
        "We have some, but not enough.",
        "In addition, to preserve species such as leatherback turtles, which live out in the high seas, but have their nesting sites on the American coast.",
        {
          text: "We need to create corridors for migration, so they can get from one area to another safely.",
          number: 39,
        },
        "As well as this, action needs to be taken to lower the levels of fishing quotas.",
        "To prevent overfishing of endangered species.",
        "And finally, there's the problem of by-catch.",
        "This refers to the catching of unwanted fish by fishing boats.",
        "They're returned to the sea, but they're often dead or dying.",
        {
          text: "If these commercial fishing boats used equipment which was more selective, this problem could be overcome.",
          number: 40,
        },
        "So does anyone have any questions?",
      ],
    },
    {
      speaker: "ANNOUNCER",
      text: [
        "That is the end of section 4.",
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
   31: "land",
   32: "food",
   33: "surface",
   34: "oxygen",
   35: "mammals",
   36: "ice",
   37: "decline",
   38: "map",
   39: "migration",
   40: "consumption",
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
    localStorage.setItem("/2017/Test 1/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2017/Test 1/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2017/Test 1/listening");
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
                {renderText("Ocean Biodiversity")}
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
            {renderText("Questions 31-40")}
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
              {renderText("OCEAN BIODIVERSITY")}
            </h1>

            {/* ---------- Biodiversity Hotspots ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Biodiversity hotspots")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText("areas containing many different species")}
              </li>

              <li className="text-lg">
                {renderText("important for locating targets for conservation")}
              </li>

              <li className="text-lg">
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

                <span>{renderText("at first only identified on")}</span>

                <input
                  value={userAnswers[31] || ""}
                  onChange={(e) => handleInputChange(31, e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>
            </ul>

            {/* ---------- Boris Worm ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Boris Worm, 2005")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {renderText(
                  "identified hotspots for large ocean predators (e.g. sharks)"
                )}
              </li>

              <li className="text-lg">
                <span>{renderText("were not always rich in")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("had higher temperatures at the")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("had sufficient")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("in the water")}</span>
              </li>
            </ul>

            {/* ---------- Lisa Ballance ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Lisa Ballance, 2007")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("looked for hotspots for marine")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText(
                  "found these were located where ocean currents meet"
                )}
              </li>
            </ul>

            {/* ---------- Census of Marine Life ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Census of Marine Life")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("found new species living under the")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                {renderText("near volcanoes on the ocean floor")}
              </li>
            </ul>

            {/* ---------- Global Marine Species Assessment ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Global Marine Species Assessment")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("rate of")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span>{renderText("make a distribution")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("for each species")}</span>
              </li>
            </ul>

            {/* ---------- Recommendations ---------- */}
            <h2 className="text-lg font-bold mt-6">
              {renderText("Recommendations")}
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>{renderText("establish")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />

                <span>{renderText("corridors (e.g. turtles)")}</span>
              </li>

              <li className="text-lg">
                <span>{renderText("catch fish only for the purpose of")}</span>

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
                  className="border-2 border-gray-300 rounded-md px-2 py-1 mx-2"
                  type="text"
                />
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
                    All Answers (31-40)
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
      {/* <Listening1Pagination2017></Listening1Pagination2017> */}
      <Listening1Pagination2016></Listening1Pagination2016>
    </div>
  );
};

export default Listening1Part42016;
