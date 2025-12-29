import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2016 from "../Pagination2016/Reading4Pagination2016";

//  Marks show

const Reading4Part22016 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const questions = [
    "Audiences are likely to be surprised if a film lacks background music.",
    "Background music may anticipate a development in a film.",
    "Background music has more effect on some people than on others.",
    "Background music may help the audience to make certain connections within the film.",
    "Audiences tend to be aware of how the background music is affecting them.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  //   second
  // different option
  const question2 = [
    "In the first paragraph, the writer makes a point that",
    "One reason that the writer refers to Humphrey Bogart is to exemplify",
    "In the third paragraph, the writer suggests that",
    "What does the writer suggest about Bringing Up Baby?",
    "The writer refers to the 'click' of a door to make the point that realistic sounds",
  ];

  const options2 = [
    [
      "A. the director should plan the soundtrack at an early stage in filming.",
      "B. it would be wrong to overlook the contribution of sound to the artistry of films.",
      "C. the music industry can have a beneficial influence on sound in film.",
      "D. it is important for those working on the sound in a film to have sole responsibility for it.",
    ],
    [
      "A. the importance of the actor and the character appearing to have similar personalities.",
      "B. the audience's wish that actors are visually appropriate for their roles.",
      "C. the value of the actor having had similar feelings to the character.",
      "D. the audience's preference for dialogue to be as authentic as possible.",
    ],
    [
      "A. audiences are likely to be critical of film dialogue that does not reflect their own experience.",
      "B. film dialogue that appears to be dull may have a specific purpose.",
      "C. filmmakers vary considerably in the skill with which they handle dialogue.",
      "D. the most successful films are those with dialogue of a high quality.",
    ],
    [
      "A. The plot suffers from the filmmaker's wish to focus on humorous dialogue.",
      "B. The dialogue helps to make it one of the best comedy films ever produced.",
      "C. There is a mismatch between the speed of the dialogue and the speed of actions.",
      "D. The nature of the dialogue emphasises key elements of the film.",
    ],
    [
      "A. are often used to give the audience a false impression of events in the film.",
      "B. may be interpreted in different ways by different members of the audience.",
      "C. may be modified in order to manipulate the audience's response to the film.",
      "D. tend to be more significant in films presenting realistic situations.",
    ],
  ];

  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 19;
      const updated = { ...prev, [answerKey]: option };
      calculateScore(updated);
      return updated;
    });
  };

  const handleOptionClick2 = (qIndex, option) => {
    const updatedOptions = [...selectedOptions2]; // ✅ use selectedOptions2
    updatedOptions[qIndex] = option;
    setSelectedOptions2(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 14;
      const updated = { ...prev, [answerKey]: option };
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
    localStorage.setItem("/reading4Part32020", newScore);
  };

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

  // text highlight and clear

  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
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

  //  Marks show

const correctAnswers = {
  // Questions 14-18 (choose ONE letter A-D)
  14: "B. it would be wrong to overlook the contribution of sound to the artistry of films.", //
  15: "A. the importance of the actor and the character appearing to have similar personalities.", //
  16: "B. film dialogue that appears to be dull may have a specific purpose.", //
  17: "D. The nature of the dialogue emphasises key elements of the film.", //
  18: "C. may be modified in order to manipulate the audience's response to the film.", //

  // Questions 19-23 (TRUE/FALSE/NOT GIVEN)
  19: "TRUE", // Audiences are likely to be surprised if a film lacks background music
  20: "TRUE", // Background music may anticipate a development in a film
  21: "NOT GIVEN", // Background music has more effect on some people than on others
  22: "TRUE", // Background music may help the audience to make certain connections within the film
  23: "FALSE", // Audiences tend to be aware of how the background music is affecting them

  // Questions 24-26 (complete the sentences A-E)
  24: "D", // when the director is aware of how the audience will respond
  25: "A", // when the audience listens to the dialogue
  26: "E", // when the actor's appearance, voice and moves are consistent with each other
};

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

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

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 2")}</h1>
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
              {renderText("       You should spend about 20 minutes on")}

              <span className="text-lg font-bold">
                {renderText("          Questions 14-26")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            {" "}
            <h1 className="text-xl text-center font-bold mb-3">
              {" "}
              {renderText("        An Introduction to Film Sound")}
            </h1>
            <br />
            {/* A */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">A</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Though we might think of film as an essentially visual experience, we really cannot afford to underestimate the importance of film sound."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}
              </span>
              {renderText(
                "A meaningful soundtrack is often as complicated as the image on the screen, and is ultimately just as much the responsibility of the director."
              )}{" "}
              {renderText(
                "The entire soundtrack consists of three essential ingredients: the human voice, sound effects and music."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "These three tracks must be mixed and balanced so as to produce the necessary emphases which in turn create desired effects."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("24")}
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* B */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">B</h1>

              {renderText(
                "Topics which essentially refer to the three previously mentioned tracks are discussed below. They include dialogue, synchronous and asynchronous sound effects, and music."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "As is the case with stage drama, dialogue serves to tell the story and expresses feelings and motivations of characters as well."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}
                {renderText(
                  "Often with film characterization the audience perceives little or no difference between the character and the actor."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* C */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">C</h1>

              {renderText(
                "Thus, for example, the actor Humphrey Bogart is the character Sam Spade; film personality and life personality seem to merge. Perhaps this is because the very texture of a performer's voice supplies an element of character."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "When voice textures fit the performer's physiognomy and gestures, a whole and very realistic persona emerges."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}
              </span>

              {renderText(
                "The viewer sees not an actor working at his craft, but another human being struggling with life."
              )}
            </p>
            <br />
            {/* D */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">D</h1>

              {renderText(
                "It is interesting to note that how dialogue is used and the very amount of dialogue used varies widely among films."
              )}

              {renderText(
                "For example, in the highly successful science-fiction film 2001, little dialogue was evident, and most of it was banal and of little intrinsic interest."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In this way the film-maker was able to portray the 'inadequacy of human responses when compared with the magnificent technology created by man and the visual beauties of the universe'."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* E */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">E</h1>

              {renderText(
                "The comedy Bringing Up Baby, on the other hand, presents practically non-stop dialogue delivered at breakneck speed."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This use of dialogue underscores not only the dizzy quality of the character played by Katherine Hepburn, but also the absurdity of the film itself and thus its humor."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}
              </span>

              {renderText(
                "The audience is bounced from gag to gag and conversation to conversation; there is no time for audience reflection."
              )}
            </p>
            <br />
            {/* F */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">F</h1>

              {renderText(
                "Synchronous sound effects are those sounds which are synchronized or matched with what is viewed.For example, if the film portrays a character playing the piano, the sounds of the piano are projected.Synchronous sounds contribute to the realism of film and also help to create a particular atmosphere.For example, the 'click' of a door being opened may simply serve to convince the audience that the image portrayed is real, and the audience may only subconsciously note the expected sound"
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "However, if the 'click' of an opening door is part of an ominous action such as a burglary, the sound mixer may call attention to the 'click' with an increase in volume; this helps to engage the audience in a moment of suspense."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}
              </span>
            </p>
            <br />
            {/* G */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">G</h1>

              {renderText(
                "Asynchronous sound effects, on the other hand, are not matched with a visible source of the sound on screen.Such sounds are included so as to provide an appropriate emotional nuance, and they may also add to the realism of the film.For example, a film-maker might opt to include the background sound of an ambulance's siren while the foreground sound and image portrays an arguing couple.The asynchronous ambulance siren underscores the psychic injury incurred in the argument; at the same time the noise of the siren adds to the realism of the film by acknowledging the film's city setting."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "We are probably all familiar with background music in films, which has become so ubiquitous as to be noticeable in its absence."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}
              </span>
              {renderText(
                "We are aware that it is used to add emotion and rhythm.Usually not meant to be noticeable, it often provides a tone or an emotional attitude toward the story and/ or the characters depicted."
              )}
            </p>
            <br />
            {/* H */}{" "}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">H</h1>

              {renderText(
                "We are probably all familiar with background music in films, which has become so ubiquitous as to be noticeable in its absence."
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "It is used to add emotion and rhythm, provide a tone toward the story, and may foreshadow a change in mood."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("20")}
                  </span>
                )}
              </span>
              {renderText(
                "For example, dissonant music may be used in film to indicate an approaching (but not yet visible) menace or disaster."
              )}
            </p>
            <br />
            {/* I */}
            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">I</h1>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Background music may aid viewer understanding by linking scenes"
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("22")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                "For example, a particular musical theme associated with an individual character or situation may be repeated at various points in a film in order to remind the audience of salient motifs or ideas."
              )}
              {renderText(
                "Film sound comprises conventions and innovations. We have come to expect certain sound conventions, yet many effects are brilliantly conceived and subtly perceived."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The effects of sound are often noted only by our subconscious minds, highlighting the importance of cultivating awareness of both film sound and film space."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23")}
                  </span>
                )}
              </span>
              {renderText(
                "Understanding film sound allows us to truly appreciate cinema as a modern art form."
              )}
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

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
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
          </div>
          <div>
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 14-18")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">
                  {renderText(" A, B, C or D ")}
                </span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 14;

                return (
                  <div key={qIndex} className="flex flex-col gap-2">
                    <h3 className="text-lg">
                      {answerKey}. {q}
                    </h3>

                    <ul className="flex flex-col gap-2 ml-4">
                      {options2[qIndex].map((option, oIndex) => {
                        const isSelected = selectedOptions2[qIndex] === option;

                        return (
                          <li
                            key={oIndex}
                            onClick={() => handleOptionClick2(qIndex, option)}
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

            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 19-23")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 19-23 on your answer sheet, choose")}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
                {renderText(
                  "if the statement agrees with the claims of the writer"
                )}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
                {renderText(
                  "if the statement contradicts the claims of the writer"
                )}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">
                  {renderText("NOT GIVEN")}
                </span>{" "}
                {renderText(
                  "if it is impossible to say what the writer thinks about this"
                )}
              </h3>
              <br /> <br />
              {/* question dynamic */}
              <div className="space-y-6 leading-relaxed p-4">
                <h2 className="text-lg font-bold">Questions 19-23</h2>
                {questions.map((q, qIndex) => {
                  const answerKey = qIndex + 19;
                  const correct = correctAnswers[answerKey];

                  return (
                    <div key={qIndex} className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium">
                        {answerKey}. {q}
                      </h3>
                      <ul className="flex flex-col gap-2 ml-4">
                        {options.map((option, oIndex) => {
                          const isSelected = selectedOptions[qIndex] === option;
                          const isCorrect = option === correct;

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
            </div>
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 24-26")}
              </h1>

              <p>
                {renderText(
                  "Complete each sentence with the correct ending, A-E, below."
                )}
              </p>
              <p>
                {renderText(
                  "Choose the correct letter, A-E, next to Questions 24-26."
                )}
              </p>

              <div className="flex items-center justify-center border-2 p-5">
                <div className="space-y-1 ">
                  <p>
                    {renderText(
                      "A. when the audience listens to the dialogue."
                    )}
                  </p>
                  <p>
                    {renderText(
                      "B. if the film reflects the audience's own concerns."
                    )}
                  </p>
                  <p>
                    {renderText(
                      "C. if voice, sound and music are combined appropriately."
                    )}
                  </p>
                  <p>
                    {renderText(
                      "D. when the director is aware of how the audience will respond."
                    )}
                  </p>
                  <p>
                    {renderText(
                      "E. when the actor's appearance, voice and moves are consistent with each other."
                    )}
                  </p>
                </div>
              </div>

              {/* ---------- Question 24 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("24.")}</span>
                <span>
                  {renderText(
                    "The audience's response to different parts of a film can be controlled"
                  )}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[24] || ""}
                    onChange={(e) => handleInputChange(24, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("24")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 25 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("25.")}</span>
                <span>
                  {renderText(
                    "The feelings and motivations of characters become clear"
                  )}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[25] || ""}
                    onChange={(e) => handleInputChange(25, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("25")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 26 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("26.")}</span>
                <span>
                  {renderText(
                    "A character seems to be a real person rather than an actor"
                  )}
                </span>

                <div className="relative w-40">
                  <select
                    value={userAnswers[26] || ""}
                    onChange={(e) => handleInputChange(26, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("26")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                    <option value="E">{renderText("E")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            </div>
          </div>
          <br />

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
                    Your Score: {score}/12
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (14-26)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 14).map((num) => {
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
      <Reading4Pagination2016></Reading4Pagination2016>
    </div>
  );
};

export default Reading4Part22016;
