import React, { useEffect, useState } from "react";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import { IoBookSharp } from "react-icons/io5";

import Reading3Pagination2017 from "../Pagination2017/Reading3Pagination2017";

const Reading3Part32017 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  // different option
const questions = [
  "What point does the writer emphasise in the first paragraph?",
  "What view of the Montreal study does the writer express in the second paragraph?",
  "What does the writer find interesting about the results of the Montreal study?",
  "Why does the writer refer to Meyer's work on music and emotion?",
  "According to Leonard Meyer, what causes the listener's emotional response to music?",
];

const options = [
  [
    "A. how dramatically our reactions to music can vary",
    "B. how intense our physical responses to music can be",
    "C. how little we know about the way that music affects us",
    "D. how much music can tell us about how our brains operate",
  ],
  [
    "A. its aims were innovative.",
    "B. The approach was too simplistic.",
    "C. it produced some remarkably precise data.",
    "D. The technology used was unnecessarily complex.",
  ],
  [
    "A. the timing of participants' neural responses to the music",
    "B. the impact of the music on participants' emotional state",
    "C. the section of participants' brains which was activated by the music",
    "D. the type of music which had the strongest effect on participants' brains",
  ],
  [
    "A. to propose an original theory about the subject",
    "B. to offer support for the findings of the Montreal study",
    "C. to recommend the need for further research into the subject",
    "D. to present a view which opposes that of the Montreal researchers",
  ],
  [
    "A. the way that the music evokes poignant memories in the listener",
    "B. the association of certain musical chords with certain feelings",
    "C. the listener's sympathy with the composer's intentions",
    "D. the internal structure of the musical composition",
  ],
];


  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // text highlight and clear

  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    // Update userAnswers for score calculation
    setUserAnswers((prev) => {
      const answerKey = qIndex + 32;
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
  // marks show
const correctAnswers = {
  // Questions 27-31 (Summary Completion)
  27: "dopamine",
  28: "pleasure",
  29: "caudate",
  30: "anticipatory phase",
  31: "food",

  // Questions 32-36 (Multiple Choice)
  32: "B. how intense our physical responses to music can be", //
  33: "C. it produced some remarkably precise data.", //
  34: "A. the timing of participants' neural responses to the music", //
  35: "B. to offer support for the findings of the Montreal study", //
  36: "D. the internal structure of the musical composition", //

  // Questions 37-40 (Sentence Completion)
  37: "F", // neuron activity increases prior to key points in a musical piece
  38: "B", // neuron activity decreases if outcomes become predictable
  39: "E", // emotive music delays giving listeners what they expect to hear
  40: "C", // emotive music can bring to mind actual pictures and events
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
    localStorage.setItem("/reading1Part32020", newScore);
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/reading1Part32020");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          {/* Header */}

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

          {/* Highlight modal */}
          {isModalOpen && (
            <div
              style={{ top: modalPosition.top + 5, left: modalPosition.left }}
              className="absolute bg-white p-3 rounded-lg shadow-lg flex gap-3 z-50"
            >
              <button
                onClick={handleHighlight}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                {renderText("Highlight")}
              </button>
              <button
                onClick={handleClearHighlight}
                className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition"
              >
                {renderText("Clear Highlight")}
              </button>
            </div>
          )}
          <div>
            <h1 className="text-lg">
              {renderText("You should spend about 20 minutes on ")}
              <span className="text-lg font-bold">
                {renderText("Questions 27-40")}
              </span>
              {renderText(", which are based on Reading Passage 1 below.")}
            </h1>
          </div>
          {/* left text */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Music and the Emotions")}
            </h1>
            <h1 className="text-lg font-bold italic text-center mt-3">
              {renderText(
                "Neuroscientist Jonah Lehrer considers the emotional power of music"
              )}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Why does music make us feel? On the one hand, music is a purely abstract art form, devoid of language or explicit ideas."
              )}{" "}
              {renderText(
                "And yet, even though music says little, it still manages to touch us deeply."
              )}
              {renderText(
                "When listening to our favourite songs, our body betrays all the symptoms of emotional arousal. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The pupils in our eyes dilate, our pulse and blood pressure rise, the electrical conductance of our skin is lowered, and the cerebellum, a brain region associated with bodily movement, becomes strangely active."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
              {renderText(
                ".Blood is even re-directed to the muscles in our legs.In other words, sound stirs us at our biological roots."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "A recent paper in Nature Neuroscience by a research team in Montreal, Canada, marks an important step in revealing the precise underpinnings of 'the potent pleasurable stimulus' that is music."
              )}
              {renderText(
                "Although the study involves plenty of fancy technology, including functional magnetic resonance imaging (fMRI) and ligand-based positron emission tomography (PET) scanning, the experiment itself was rather straightforward."
              )}
              {renderText(
                "After screening 217 individuals who responded to advertisements requesting people who experience 'chills' to instrumental music, the scientists narrowed down the subject pool to ten. They then asked the subjects to bring in their playlist of favourite songs - virtually every genre was represented, from techno to tango - and played them the music while their brain activity was monitored."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Because the scientists were combining methodologies (PET and fMRI), they were able to obtain an impressively exact and detailed portrait of music in the brain."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The first thing they discovered is that music triggers the production of dopamine - a chemical with a key role in setting people's moods - by the neurons (nerve cells) in both the dorsal and ventral regions of the brain."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
                {renderText(
                  "As these two regions have long been linked with the experience of pleasure, this finding isn't particularly surprising."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "What is rather more significant is the finding that the dopamine neurons in the caudate - a region of the brain involved in learning stimulus-response associations, and in anticipating food and other 'reward' stimuli - were at their most active around 15 seconds before the participants' favourite moments in the music."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-26 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29,31,34,37")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "The researchers call this the 'anticipatory phase' and argue that the purpose of this activity is to help us predict the arrival of our favourite part."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The question, of course, is what all these dopamine neurons are up to. Why are they so active in the period preceding the acoustic climax? After all, we typically associate surges of dopamine with pleasure, with the processing of actual rewards."
              )}
              {renderText(
                "And yet, this cluster of cells is most active when the 'chills' have yet to arrive, when the melodic pattern is still unresolved."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "One way to answer the question is to look at the music and not the neurons. While music can often seem (at least to the outsider) like a labyrinth of intricate patterns, it turns out that the most important part of every song or symphony is when the patterns break down, when the sound becomes unpredictable."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If the music is too obvious, it is annoyingly boring, like an alarm clock. Numerous studies, after all, have demonstrated that dopamine neurons quickly adapt to predictable rewards."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("38")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "This is why composers often introduce a key note in the beginning of a song, spend most of the rest of the piece in the studious avoidance of the pattern, and then finally repeat it only at the end."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "The longer we are denied the pattern we expect, the greater the emotional release when the pattern returns, safe and sound."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "To demonstrate this psychological principle, the musicologist Leonard Meyer, in his classic book 'Emotion and Meaning in Music' (1956), analysed the 5th movement of Beethoven's String Quartet in C-sharp minor, 'Op. 131'."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Meyer wanted to show how music is defined by its flirtation with - but not submission to - our expectations of order. Meyer dissected 50 measures (bars) of the masterpiece, showing how Beethoven begins with the clear statement of a rhythmic and harmonic pattern and then, in an ingenious tonal dance, carefully holds off repeating it."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg my-5">
              {renderText(
                "According to Meyer, it is the suspenseful tension of music, arising out of our unfulfilled expectations, that is the source of the music's feeling."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " While earlier theories of music focused on the way a sound can refer to the real world of images and experiences - its 'connotative' meaning - Meyer argued that the emotions we find in music come from the unfolding events of the music itself."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36,40")}
                  </span>
                )}
                {renderText(
                  "  It is this uncertainty that triggers the surge of dopamine in the caudate, as we struggle to figure out what will happen next."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "This 'embodied meaning' arises from the patterns the symphony invokes and then ignores."
              )}
            </p>

            <p className="text-lg my-5">
              {renderText(
                "We can predict some of the notes, but we can't predict them all, and that is what keeps us listening, waiting expectantly for our reward, for the pattern to be completed."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
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
                Clear answer
              </span>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to clear all answers?
                    </h2>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                      >
                        No, keep them
                      </button>
                      <button
                        onClick={handleClear}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Yes, clear them
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 27-31")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the summary below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("NO MORE THAN TWO WORDS")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 27-31 on your answer sheet."
              )}
            </h1>
            <br />

            <div className="overflow-x-auto border p-5 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-4">
                {renderText("The Montreal Study")}
              </h1>

              <p className="text-lg mb-3">
                {renderText(
                  "Participants, who were recruited for the study through advertisements, had their brain activity monitored while listening to their favourite music. It was noted that the music stimulated the brain's neurons to release a substance called"
                )}
                <button
                  onClick={() => toggleButton(27)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[27]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  27
                </button>
                <input
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(
                  "in two of the parts of the brain which are associated with feeling"
                )}
                <button
                  onClick={() => toggleButton(28)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[28]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  28
                </button>
                <input
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
              </p>

              <p className="text-lg mb-3">
                {renderText(
                  "Researchers also observed that the neurons in the area of the brain called the"
                )}
                <button
                  onClick={() => toggleButton(29)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[29]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  29
                </button>
                <input
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(
                  "were particularly active just before the participants' favourite moments in the music - the period known as the"
                )}
                <button
                  onClick={() => toggleButton(30)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[30]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  30
                </button>
                <input
                  value={userAnswers[30] || ""}
                  onChange={(e) => handleInputChange(30, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
              </p>

              <p className="text-lg mb-3">
                {renderText(
                  "Activity in this part of the brain is associated with the expectation of 'reward' stimuli such as"
                )}
                <button
                  onClick={() => toggleButton(31)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                {renderText(".")}
              </p>
            </div>
          </div>

          {/* question dynamic */}
          <div className="space-y-6 leading-relaxed p-4">
            <h2 className="text-lg font-bold">
              {renderText("Questions 32-36")}
            </h2>
            <p className="text-xl">
              {renderText("  Choose the correct letter,")}
              <span className="font-bold">
                {" "}
                {renderText("  A, B , C or D")}
              </span>
              .
            </p>

            {questions.map((q, qIndex) => {
              const answerKey = qIndex + 32;

              return (
                <div key={qIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg">
                    {answerKey}. {q}
                  </h3>

                  <ul className="flex flex-col  gap-2 ml-4">
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
          {/* optional question */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 37-40")}
            </h1>

            <p>
              {renderText(
                "Complete each sentence with the correct ending, A-F, below."
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-F, next to Questions 37-40."
              )}
            </p>

            <div className="flex items-center justify-center border border-black py-4 px-4 max-w-2xl mx-auto">
              <div className="text-center">
                <h1 className="text-xl font-bold mb-5">Answer Choices</h1>
                <ul className="space-y-1 text-lg">
                  <li>
                    {renderText(
                      "A. our response to music depends on our initial emotional state."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "B. neuron activity decreases if outcomes become predictable."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "C. emotive music can bring to mind actual pictures and events."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "D. experiences in our past can influence our emotional reaction to music."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "E. emotive music delays giving listeners what they expect to hear."
                    )}
                  </li>
                  <li>
                    {renderText(
                      "F. neuron activity increases prior to key points in a musical piece."
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {[
              "37. The Montreal researchers discovered that",
              "38. Many studies have demonstrated that",
              "39. Meyer's analysis of Beethoven's music shows that",
              "40. Earlier theories of music suggested that",
            ].map((text, idx) => (
              <p key={idx} className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">
                  {renderText(37 + idx + ".")}
                </span>
                <span>{renderText(text)}</span>
                <div className="relative w-40">
                  <select
                    value={userAnswers[37 + idx] || ""}
                    onChange={(e) =>
                      handleInputChange(37 + idx, e.target.value)
                    }
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("Select")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                    <option value="F">{renderText("F")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            ))}
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
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27-40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
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
      <Reading3Pagination2017></Reading3Pagination2017>
    </div>
  );
};

export default Reading3Part32017;
