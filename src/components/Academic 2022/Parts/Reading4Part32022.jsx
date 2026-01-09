import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2022 from "../Pagination2022/Reading4Pagination2022";

const Reading4Part32022 = () => {
  const [highlight, setHighlight] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const calculateScore = (answers) => {
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      const userAnswer = answers[key];
      const correctAnswer = correctAnswers[key];

      if (
        typeof userAnswer === "string" &&
        userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      ) {
        newScore += 1;
      }
    });

    setScore(newScore);
    localStorage.setItem("/2022/Test 1/reading", newScore);
  };

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

  const correctAnswers = {
    // Questions 27–32 (MATCHING PARAGRAPHS, A–H)
    27: "D", // earlier examples of blindfold chess
    28: "E", // what blindfold chess involves
    29: "F", // skill limited to chess
    30: "B", // why scientists are interested
    31: "H", // Gareyev's priorities
    32: "E", // why last part of game is difficult

    // Questions 33–36 (TRUE / FALSE / NOT GIVEN)
    33: "FALSE", // not all participants blindfolded
    34: "NOT GIVEN", // no info if he won BASE jumping competitions
    35: "FALSE", // UCLA is not the first to research
    36: "TRUE", // good chess players likely can play blindfold

    // Questions 37–40 (ONE WORD ONLY)
    37: "memory", // testing Gareyev's memory
    38: "numbers", // recall string of numbers
    39: "connectivity", // unusual connectivity in brain areas
    40: "visual", // visual input
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
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

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
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
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">PASSAGE 3</h1>
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
              You should spend about 20 minutes on
              <span className="text-lg font-bold"> Questions 27-40</span>, which
              are based on Reading Passage 3 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              Timur Gareyev - blindfold chess champion
            </h1>

            <p className="text-lg font-bold">A</p>
            <p className="text-lg">
              Next month, a chess player named Timur Gareyev will take on nearly
              50 opponents at once. But that is not the hard part. While his
              challengers will play the games as normal, Gareyev himself will be
              blindfolded.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Even by world record standards, it sets a high bar for human
                performance.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    33
                  </span>
                )}
              </span>
              The 28-year-old already stands out in the rarefied world of
              blindfold chess. He has a fondness for bright clothes and unusual
              hairstyles, and he gets his kicks from the adventure sport of BASE
              jumping. He has already proved himself a strong chess player, too.
              In a 10-hour chess marathon in 2013, Gareyev played 33 games in
              his head simultaneously. He won 29 and lost none. The skill has
              become his brand: he calls himself the Blindfold King.
            </p>

            <br />

            <p className="text-lg font-bold">B</p>
            <p className="text-lg">
              But Gareyev's prowess has drawn interest from beyond the
              chess-playing community.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                In the hope of understanding how he and others like him can
                perform such mental feats, researchers at the University of
                California in Los Angeles (UCLA) called him in for tests.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    30
                  </span>
                )}
              </span>
              They now have their first results. "The ability to play a game of
              chess with your eyes closed is not a far reach for most
              accomplished players," said Jesse Rissman, who runs a memory lab
              at UCLA.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "But the thing that's so remarkable about Timur and a few other
                individuals is the number of games they can keep active at once.
                To me it is simply astonishing."
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    36
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">C</p>
            <p className="text-lg">
              Gareyev learned to play chess in his native Uzbekistan when he was
              six years old. Tutored by his grandfather, he entered his first
              tournament aged eight and soon became obsessed with competitions.
              At 16, he was crowned Asia's youngest ever chess grandmaster. He
              moved to the US soon after, and as a student helped his university
              win its first national chess championship. In 2013, Gareyev was
              ranked the third best chess player in the US.
            </p>

            <br />

            <p className="text-lg font-bold">D</p>
            <p className="text-lg">
              To the uninitiated, blindfold chess seems to call for superhuman
              skill.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But displays of the feat go back centuries. The first recorded
                game in Europe was played in 13th-century Florence.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    27
                  </span>
                )}
              </span>
              In 1947, the Argentinian grandmaster Miguel Najdorf played 45
              simultaneous games in his mind, winning 39 in the 24-hour session.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    27
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">E</p>
            <p className="text-lg">
              Accomplished players can develop the skill of playing blind even
              without realising it.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The nature of the game is to run through possible moves in the
                mind to see how they play out.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    28
                  </span>
                )}
              </span>
              From this, regular players develop a memory for the patterns the
              pieces make, the defences and attacks.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "You recreate it in your mind," said Gareyev. "A lot of players
                are capable of doing what I'm doing."
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    28
                  </span>
                )}
              </span>
              The real mental challenge comes from playing multiple games at
              once in the head. Not only must the positions of each piece on
              every board be memorised, they must be recalled faithfully when
              needed, updated with each player's moves, and then reliably stored
              again, so the brain can move on to the next board.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                First moves can be tough to remember because they are fairly
                uninteresting. But the ends of games are taxing too, as
                exhaustion sets in.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    32
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">F</p>
            <p className="text-lg">
              The scientists first had Gareyev perform some standard memory
              tests.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                These assessed his ability to hold numbers, pictures and words
                in mind. One classic test measures how many numbers a person can
                repeat, both forwards and backwards, soon after hearing them.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    37
                  </span>
                )}
              </span>
              Most people manage about seven. "He was not exceptional on any of
              these standard tests," said Rissman. "We didn't find anything
              other than playing chess that he seems to be supremely gifted at."
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                But next came the brain scans. With Gareyev lying down in the
                machine, Rissman looked at how well connected the various
                regions of the chess player's brain were.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    29
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">G</p>
            <p className="text-lg">
              It was not the only hint of something special in Gareyev's brain.
              The scans also suggest that Gareyev's visual network is more
              highly connected to other brain parts than usual.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Initial results suggest that the areas of his brain that process
                visual images - such as chess boards - may have stronger links
                to other brain regions, and so be more powerful than normal.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    40
                  </span>
                )}
              </span>
              While the analyses are not finalised yet, they may hold the first
              clues to Gareyev's extraordinary ability.
            </p>

            <br />

            <p className="text-lg font-bold">H</p>
            <p className="text-lg">
              For the world record attempt, Gareyev hopes to play 47 blindfold
              games at once in about 16 hours. He will need to win 80% to claim
              the title.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "I don't worry too much about the winning percentage, that's
                never been an issue for me," he said.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    31
                  </span>
                )}
              </span>
              "The most important part of blindfold chess for me is that I have
              found the one thing that I can fully dedicate myself to. I miss
              having an obsession."
            </p>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* ================= Questions 27–32 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 27–32</h2>

          <p className="mb-4">
            Reading Passage 3 has eight paragraphs, A–H.
            <br />
            Which paragraph contains the following information?
            <br />
            Choose the correct letter, A–H, in boxes 27–32 on your answer sheet.
            <br />
            NB You may use any letter more than once.
          </p>

          <ul className="list-decimal list-inside space-y-4 text-lg">
            {[
              "27 a reference to earlier examples of blindfold chess",
              "28 an outline of what blindfold chess involves",
              "29 a claim that Gareyev's skill is limited to chess",
              "30 why Gareyev's skill is of interest to scientists",
              "31 an outline of Gareyev's priorities",
              "32 a reason why the last part of a game may be difficult",
            ].map((text, idx) => {
              const qNum = 27 + idx;
              const options = ["A", "B", "C", "D", "E", "F", "G", "H"];
              const [num, ...rest] = text.split(" ");
              return (
                <li key={qNum} className="flex items-center gap-2">
                  <span>
                    <span className="font-bold">{num}</span> {rest.join(" ")}
                  </span>
                  <select
                    className="border rounded px-2 py-1 w-15"
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {qNum}
                    </option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 33–36 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 33–36</h2>

          <p className="mb-4">
            Do the following statements agree with the information given in
            Reading Passage 3?
            <br />
            In boxes 33–36 on your answer sheet, choose
            <br />
            TRUE if the statement agrees with the information
            <br />
            FALSE if the statement contradicts the information
            <br />
            NOT GIVEN if there is no information on this
          </p>

          <ul className="list-decimal list-inside space-y-4 text-lg">
            {[
              "33 In the forthcoming games, all the participants will be blindfolded.",
              "34 Gareyev has won competitions in BASE jumping.",
              "35 UCLA is the first university to carry out research into blindfold chess players.",
              "36 Good chess players are likely to be able to play blindfold chess.",
            ].map((text, idx) => {
              const qNum = 33 + idx;
              const options = ["TRUE", "FALSE", "NOT GIVEN"];
              const [num, ...rest] = text.split(" ");
              return (
                <li key={qNum} className="flex items-center gap-2">
                  <span>
                    <span className="font-bold">{num}</span> {rest.join(" ")}
                  </span>
                  <select
                    className="border rounded px-2 py-1 w-24"
                    onChange={(e) => handleInputChange(qNum, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {qNum}
                    </option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>

          {/* ================= Questions 37–40 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 37–40</h2>

          <p className="mb-4">
            Complete the summary below.
            <br />
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
            <br />
            Write your answers in boxes 37–40 on your answer sheet.
          </p>

          <div className="space-y-4 text-lg border p-5 mt-4">
            <h2 className="font-bold text-center text-xl">
              How the research was carried out
            </h2>
            <div className="flex items-center flex-wrap gap-2">
              <span>The researchers started by testing Gareyev's</span>
              <span className="font-bold h-8 w-8 border rounded-2xl text-center">
                37
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(37, e.target.value)}
              />
              <span>;</span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <span>for example, he was required to recall a string of</span>
              <span className="font-bold h-8 w-8 border rounded-2xl text-center">
                38
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(38, e.target.value)}
              />
              <span>in order and also in reverse order.</span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <span>
                Although his performance was normal, scans showed an unusual
                amount of
              </span>
              <span className="font-bold h-8 w-8 border rounded-2xl text-center">
                39
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(39, e.target.value)}
              />
              <span>
                within the areas of Gareyev's brain that are concerned with
                directing attention.
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <span>
                In addition, the scans raised the possibility of unusual
                strength in the parts of his brain that deal with
              </span>
              <span className="font-bold h-8 w-8 border rounded-2xl text-center">
                40
              </span>
              <input
                type="text"
                className="border rounded px-2 py-1 w-28 text-center"
                onChange={(e) => handleInputChange(40, e.target.value)}
              />
              <span>input.</span>
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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27–40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer = userAnswers[num]?.trim() || "";
                      const correctAnswer = correctAnswers[num]?.trim();
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
      <Reading4Pagination2022></Reading4Pagination2022>
    </div>
  );
};

export default Reading4Part32022;
