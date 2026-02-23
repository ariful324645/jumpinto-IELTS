import React, { useEffect, useRef, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";


import Listening3Pagination2011 from "../Pagination 2011/Listening3Pagination2011";

const Listening3Part22011 = () => {
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
                : [p],
            )
          : [part],
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


  //  Marks show

 const correctAnswers = {
   11: "classical music",
   12: "bookshop",
   13: "planned",
   14: "1983",
   15: "City Council",
   16: "363",
   17: "Garden Hall",
   18: "Three Lives",
   19: "4.50",
   20: "Faces of China",
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

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/listening");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);
  //Button Update
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [voices, setVoices] = useState([]);

  const utteranceRef = useRef(null);
  const progressInterval = useRef(null);

const lines = [
  {
    speaker: "ANNOUNCER",
    text: [
      "Section 2, you will hear a man talking on the radio about a national arts center.",
      "First, you have some time to look at questions 11 to 16.",
      "Now listen carefully and answer questions 11 to 16.",
    ],
  },

  {
    speaker: "DAVE GREEN",
    text: [
      "Hello, and welcome to Focus on the Arts.",
      "I'm your host, Dave Green, and this is your very own local radio program.",
      "Every Friday evening, we put the spotlight on different arts and culture facilities.",
      "And look at the shows and events that are on offer in the coming week, and today the focus is on the National Arts Center.",
      "Now, if you don't already know it yourself, I'm sure you've all heard of it.",
      {
        text: "It's famous throughout the world as one of the major venues for classical music.",
        number: 11,
      },
      "But did you know that it's actually much more than just a place to hear concerts?",
      "The center itself is a huge complex that caters for a great range of arts.",
      {
        text: "Under a single roof, it houses concert rooms, theaters, cinemas, art galleries, and a wonderful public library, as well as service facilities including 3 restaurants and a bookshop.",
        number: 12,
      },
      "So, at any one time, the choice of entertainment there is simply enormous.",
      "So, how did they manage to build such a big arts complex right in the heart of the city?",
      "Well, the area was completely destroyed by bombs during the war in 1940.",
      "So the opportunity was taken to create a cultural center that would be what they called: 'the City's Gift to the Nation'.",
      {
        text: "Of course, it took a while for such a big project to get started, but it was planned in the 60s, built in the 70s, and eventually opened to the public in 1983.",
        number: 13,
      },
      {
        text: "Ever since then, it has proved to be a great success.",
        number: 14,
      },
      "It's not privately owned, like many arts centers, but is still in public hands — it's run by the City Council.",
      {
        text: "Both our National Symphony Orchestra and National Theatre Company were involved in the planning of the project.",
        number: 15,
      },
      {
        text: "And they're now based there, giving regular performances every week.",
        number: 16,
      },
    ],
  },

  {
    speaker: "ANNOUNCER",
    text: [
      "Before you hear the rest of the broadcast, you have some time to look at questions 17 to 20.",
      "Now listen and answer questions 17 to 20.",
    ],
  },

  {
    speaker: "DAVE GREEN",
    text: [
      "So, to give you some idea of what's on, and to help you choose from the many possibilities, we've made a selection of the star attractions.",
      "If you're interested in classical music, then we recommend you go along to the National on either Monday or Tuesday evening at 7:30 for a spectacular production of The Magic Flute, probably the most popular of all Mozart's operas.",
      {
        text: "It's in the Garden Hall, and tickets start at only £8, but you'll have to be early if you want to get them that cheap.",
        number: 17,
      },
      "And remember, it's only on for those two evenings.",
      "For those more interested in the cinema, you might like to see the new Canadian film, which is showing on Wednesday evening at 8 pm in Cinema 2.",
      {
        text: "And that's called Three Lives.",
        number: 18,
      },
      {
        text: "It's had fantastic reviews, and tickets cost just £4.50, which is a reduction on the usual price of £5.50.",
        number: 19,
      },
      "But you can see the center's main attraction at the weekend, because on Saturday and Sunday, 11:00 am to 10:00 pm, they're showing a wonderful new exhibition that hasn't been seen anywhere else in Europe yet.",
      {
        text: "It's a collection of Chinese art called 'Faces of China'.",
        number: 20,
      },
      "That's in Gallery 1, and it has some really fascinating paintings and sculptures by leading artists from all over China.",
      "And the good news is that it's completely free, so don't miss it.",
      "So why not go along to the National Arts Center next week for one or all of these great events?",
      "And you can always pick up a program and check out all the other performances and exhibitions on offer or coming soon on almost every day of the year.",
      "Next week, we'll be looking at the new Museum of Science.",
    ],
  },

  {
    speaker: "ANNOUNCER",
    text: [
      "That is the end of Section 2.",
      "You now have half a minute to check your answers.",
    ],
  },
];
  const flatText = lines.flatMap((line, lineIndex) =>
    line.text.map((chunk, chunkIndex) => ({
      text: chunk,
      lineIndex,
      chunkIndex,
    })),
  );
  useEffect(() => {
    let total = 0;

    flatText.forEach((item) => {
      const actualText =
        typeof item.text === "string" ? item.text : item.text.text;

      total += actualText.split(" ").length * 0.45;
    });

    setTotalDuration(total);
  }, [flatText]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      if (voiceList.length > 0) {
        setVoices(voiceList);
        setVoicesLoaded(true);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }, []);

  const getVoice = (speaker) => {
    if (!voices.length) return null;

    if (speaker === "TUTOR")
      return voices.find((v) => v.name.includes("Male")) || voices[0];

    if (speaker === "DAVE GREEN")
      return (
        voices.find((v) => v.name.includes("Female")) || voices[1] || voices[0]
      );

    return voices[0]; // ANNOUNCER
  };

  const speakFromIndex = (index) => {
    if (index >= flatText.length) {
      stopCompletely();
      return;
    }

    const item = flatText[index];

    setCurrentLine(item.lineIndex);
    setCurrentChunk(item.chunkIndex);
    setCurrentIndex(index);

    const actualText =
      typeof item.text === "string" ? item.text : item.text.text;

    const utterance = new SpeechSynthesisUtterance(actualText);

    utterance.voice = getVoice(lines[item.lineIndex].speaker);
    utterance.rate = 1;

    utterance.onstart = () => {
      setCurrentLine(item.lineIndex);
      setCurrentChunk(item.chunkIndex);
    };

    utterance.onend = () => {
      speakFromIndex(index + 1);
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const startProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= totalDuration) {
          clearInterval(progressInterval.current);
          return totalDuration;
        }
        return prev + 0.5;
      });
    }, 500);
  };

  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleControl = () => {
    if (!voicesLoaded) {
      alert("Voices still loading... please wait 1 second and click again.");
      return;
    }

    if (!isPlaying) {
      // যদি আগে pause করা থাকে
      if (currentIndex > 0 && !window.speechSynthesis.speaking) {
        speakFromIndex(currentIndex);
        startProgress();
        setIsPlaying(true);
        return;
      }

      // First time start
      window.speechSynthesis.cancel();
      setCurrentIndex(0);
      setProgress(0);
      speakFromIndex(0);
      startProgress();
      setIsPlaying(true);
    } else {
      // Pause করলে পুরো speech cancel করবো
      window.speechSynthesis.cancel();
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    }
  };

  const stopCompletely = () => {
    window.speechSynthesis.cancel();
    clearInterval(progressInterval.current);
    setIsPlaying(false);
    setCurrentLine(null);
    setCurrentChunk(null);
    setCurrentIndex(0);
    setProgress(0);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const newIndex = Math.floor((percent / 100) * flatText.length);
    window.speechSynthesis.cancel();
    clearInterval(progressInterval.current);
    setCurrentIndex(newIndex);
    setProgress((percent / 100) * totalDuration);
    if (isPlaying) {
      speakFromIndex(newIndex);
      startProgress();
    }
  };

  const renderLine = (line, lineIdx) => (
    <p key={lineIdx} className="text-lg">
      <span className="font-bold">{line.speaker}:</span>{" "}
      {line.text.map((chunk, chunkIdx) => {
        let parts = [chunk];
        highlightedTexts.forEach((ht) => {
          parts = parts.flatMap((part) =>
            typeof part === "string"
              ? part.split(ht).flatMap((p, i, arr) =>
                  i < arr.length - 1
                    ? [
                        p,
                        <span key={Math.random()} className="bg-yellow-200">
                          {ht}
                        </span>,
                      ]
                    : [p],
                )
              : [part],
          );
        });

        return (
          <span
            key={chunkIdx}
            className={
              lineIdx === currentLine && chunkIdx === currentChunk
                ? "bg-green-200 transition-all duration-300"
                : ""
            }
          >
            {parts}{" "}
          </span>
        );
      })}
    </p>
  );

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
          <div className="space-y-4">
            <button
              onClick={handleControl}
              className={`px-6 py-2 rounded-full text-white ${isPlaying ? "bg-yellow-500" : "bg-green-500"}`}
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            <div className="flex items-center gap-4">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={(progress / totalDuration) * 100 || 0}
                onChange={handleSeek}
                className="w-full"
              />
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

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
                  "The National Arts Centre: A Hub of Arts and Entertainment",
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
            {renderText("Questions 11-16")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          {/* ---------- Notes Box ---------- */}
          <div className="border max-w-2xl mx-auto p-6 rounded-lg space-y-5 bg-white">
            <h1 className="text-2xl font-bold text-center">
              {renderText("THE NATIONAL ARTS CENTRE")}
            </h1>

            {/* Q11 */}
            <p className="text-lg">
              {renderText("Well known for:")}
              <button
                onClick={() => toggleButton(11)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[11]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                11
              </button>
              <input
                value={userAnswers[11] || ""}
                onChange={(e) => handleInputChange(11, e.target.value)}
                className="border rounded-md px-2 py-1 w-40 mx-2"
              />
            </p>

            {/* Q12 */}
            <p className="text-lg">{renderText("Complex consists of:")}</p>

            <ul className="list-disc ml-6 space-y-1 text-lg">
              <li>{renderText("concert rooms")}</li>
              <li>{renderText("theatres")}</li>
              <li>{renderText("cinemas")}</li>
              <li>{renderText("art galleries")}</li>
              <li>{renderText("public library")}</li>
              <li>{renderText("restaurants")}</li>
              <li className="flex items-center">
                <button
                  onClick={() => toggleButton(12)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  value={userAnswers[12] || ""}
                  onChange={(e) => handleInputChange(12, e.target.value)}
                  className="border rounded-md px-2 py-1 w-40 mx-2"
                />
              </li>
            </ul>

            {/* Q13 & Q14 */}
            <p className="text-lg font-semibold mt-4">
              {renderText("Historical background:")}
            </p>

            <p className="text-lg">
              {renderText("1940 - area destroyed by bombs")}
            </p>

            <p className="text-lg flex items-center">
              {renderText("1960s-1970s - Centre was")}
              <button
                onClick={() => toggleButton(13)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[13]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                13
              </button>
              {renderText("and built")}
            </p>

            <p className="text-lg flex items-center">
              <button
                onClick={() => toggleButton(14)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[14]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                14
              </button>
              <input
                value={userAnswers[14] || ""}
                onChange={(e) => handleInputChange(14, e.target.value)}
                className="border rounded-md px-2 py-1 w-40 mx-2"
              />
              {renderText("- opened to public")}
            </p>

            {/* Q15 */}
            <p className="text-lg flex items-center">
              {renderText("Managed by: the")}
              <button
                onClick={() => toggleButton(15)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[15]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                15
              </button>
            </p>

            {/* Q16 */}
            <p className="text-lg flex items-center">
              {renderText("Open:")}
              <button
                onClick={() => toggleButton(16)}
                className={`mx-2 w-8 h-8 rounded-full border-2 ${
                  activeButtons[16]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                16
              </button>
              <input
                value={userAnswers[16] || ""}
                onChange={(e) => handleInputChange(16, e.target.value)}
                className="border rounded-md px-2 py-1 w-24 mx-2"
              />
              {renderText("days per year")}
            </p>
          </div>

          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 17-20")}
          </h2>

          <h3 className="text-lg mb-6">
            {renderText("Complete the notes below.")} <br />
            <br />
            {renderText("Write ")}
            <span className="font-bold">
              {renderText("ONE WORD AND/OR A NUMBER")}
            </span>
            {renderText(" for each answer.")}
          </h3>

          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("EVENT SCHEDULE")}
            </h2>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">
                    {renderText("Day")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Time")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Event")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Venue")}
                  </th>
                  <th className="border border-gray-400 p-2">
                    {renderText("Ticket price")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    Monday and Tuesday
                  </td>
                  <td className="border border-gray-400 p-2">7.30 p.m.</td>
                  <td className="border border-gray-400 p-2">
                    'The Magic Flute' (opera by Mozart)
                  </td>
                  <td className="border border-gray-400 p-2">
                    <button
                      onClick={() => toggleButton(17)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[17]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      17
                    </button>
                    <input
                      value={userAnswers[17] || ""}
                      onChange={(e) => handleInputChange(17, e.target.value)}
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg mx-2"
                      type="text"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">from £8.00</td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border border-gray-400 p-2">Wednesday</td>
                  <td className="border border-gray-400 p-2">8.00 p.m.</td>
                  <td className="border border-gray-400 p-2">
                    '
                    <button
                      onClick={() => toggleButton(18)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[18]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      18
                    </button>
                    <input
                      value={userAnswers[18] || ""}
                      onChange={(e) => handleInputChange(18, e.target.value)}
                      className="w-[150px] border border-gray-300 rounded-md px-1 py-0.5 text-lg mx-2"
                      type="text"
                    />
                    ' (Canadian film)
                  </td>
                  <td className="border border-gray-400 p-2">Cinema 2</td>
                  <td className="border border-gray-400 p-2">
                    £
                    <button
                      onClick={() => toggleButton(19)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[19]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      19
                    </button>
                    <input
                      value={userAnswers[19] || ""}
                      onChange={(e) => handleInputChange(19, e.target.value)}
                      className="w-[60px] border border-gray-300 rounded-md px-1 py-0.5 text-lg mx-2"
                      type="text"
                    />
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border border-gray-400 p-2">
                    Saturday and Sunday
                  </td>
                  <td className="border border-gray-400 p-2">
                    11 a.m. to 10 p.m.
                  </td>
                  <td className="border border-gray-400 p-2">
                    '
                    <button
                      onClick={() => toggleButton(20)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[20]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      20
                    </button>
                    <input
                      value={userAnswers[20] || ""}
                      onChange={(e) => handleInputChange(20, e.target.value)}
                      className="w-[150px] border border-gray-300 rounded-md px-1 py-0.5 text-lg mx-2"
                      type="text"
                    />
                    ' (art exhibition)
                  </td>
                  <td className="border border-gray-400 p-2">Gallery 1</td>
                  <td className="border border-gray-400 p-2">free</td>
                </tr>
              </tbody>
            </table>
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
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/10
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (11-20)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 10 }, (_, i) => i + 11).map((num) => {
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

                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className="italic">No answer provided</span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

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
      <Listening3Pagination2011></Listening3Pagination2011>
    </div>
  );
};

export default Listening3Part22011;
