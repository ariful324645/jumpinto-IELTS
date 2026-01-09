import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading1Pagination2023 from "../Pagination 2023/Reading1Pagination2023";

const Reading1Part32023 = () => {
  const [highlight, setHighlight] = useState(false);
  const [showResult, setShowResult] = useState(false);
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
    27: "D", // cooperation to minimise risk
    28: "B", // explanation of a person's aims
    29: "F", // major collision in space
    30: "C", // comparison between tracking objects and transportation system
    31: "E", // efforts to classify space junk

    // ================= Questions 32–35 (ONE WORD ONLY) =================
    32: "safety", // how the safety of space can be achieved
    33: "fuel", // unused fuel or pressurised material
    34: "damage", // material that could cause damage
    35: "irresponsible", // operators that become irresponsible

    // ================= Questions 36–40 (Person matching A–D) =================
    36: "D", // Knowing exact location of space junk
    37: "A", // Space should be available to everyone
    38: "B", // A recommendation regarding satellites widely ignored
    39: "C", // Conflicting info about satellites
    40: "B", //
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part22023");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        [id]: value,
      };

      calculateScore(updated); // recalc score immediately
      return updated;
    });
  };

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
    localStorage.setItem("/reading1Part22023", newScore);
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading1Part22023");
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
              <span className="text-lg font-bold"> Questions 27-40</span>
              which are based on Reading Passage 3 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              Conquering Earth's space junk problem
            </h1>
            <p className="text-lg text-center font-medium mb-6">
              Satellites, rocket shards and collision debris are creating major
              traffic risks in orbit around the planet. Researchers are working
              to reduce these threats
            </p>

            <p className="text-lg font-bold">A</p>
            <p className="text-lg">
              Last year, commercial companies, military and civil departments
              and amateurs sent more than 400 satellites into orbit, over four
              times the yearly average in the previous decade. Numbers could
              rise even more sharply if leading space companies follow through
              on plans to deploy hundreds to thousands of large constellations
              of satellites to space in the next few years.
            </p>
            <p className="text-lg">
              All that traffic can lead to disaster. Ten years ago, a US
              commercial Iridium satellite smashed into an inactive Russian
              communications satellite called Cosmos-2251, creating thousands of
              new pieces of space shrapnel that now threaten other satellites in
              low Earth orbit - the zone stretching up to 2,000 kilometres in
              altitude.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Altogether, there are roughly 20,000 human-made objects in
                orbit, from working satellites to small rocket pieces.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    29
                  </span>
                )}
              </span>
              And satellite operators can't steer away from every potential
              crash, because each move consumes time and fuel that could
              otherwise be used for the spacecraft's main job.
            </p>

            <br />

            <p className="text-lg font-bold">B</p>
            <p className="text-lg">
              Concern about space junk goes back to the beginning of the
              satellite era, but the number of objects in orbit is rising so
              rapidly that researchers are investigating new ways of attacking
              the problem. Several teams are trying to improve methods for
              assessing what is in orbit, so that satellite operators can work
              more efficiently in ever-more-crowded space.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Some researchers are now starting to compile a massive data set
                that includes the best possible information on where everything
                is in orbit. Others are developing taxonomies of space debris -
                working on measuring properties such as the shape and size of an
                object, so that satellite operators know how much to worry about
                what's coming their way.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    31
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              The alternative, many say, is unthinkable. Just a few uncontrolled
              space crashes could generate enough debris to set off a runaway
              cascade of fragments, rendering near-Earth space unusable.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "If we go on like this, we will reach a point of no return,"
                says Carolin Frueh, an astrodynamical researcher at Purdue
                University in West Lafayette, Indiana.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    40
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">C</p>
            <p className="text-lg">
              Even as our ability to monitor space objects increases, so too
              does the total number of items in orbit.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                That means companies, governments and other players in space are
                collaborating in new ways to avoid a shared threat.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    27
                  </span>
                )}
              </span>
              International groups such as the Inter-Agency Space Debris
              Coordination Committee have developed guidelines on space
              sustainability.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Those include inactivating satellites at the end of their useful
                life by venting pressurised materials or leftover fuel that
                might lead to explosions.
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      33
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      34
                    </span>
                  </>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                The intergovernmental groups also advise lowering satellites
                deep enough into the atmosphere that they will burn up or
                disintegrate within 25 years.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    32
                  </span>
                )}
              </span>
              But so far, only about half of all missions have abided by this
              25-year goal, says Holger Krag, head of the European Space
              Agency's space-debris office in Darmstadt, Germany.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Operators of the planned large constellations of satellites say
                they will be responsible stewards in their enterprises in space,
                but Krag worries that problems could increase, despite their
                best intentions. "What happens to those that fail or go
                bankrupt?" he asks.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    35
                  </span>
                )}
              </span>
              "They are probably not going to spend money to remove their
              satellites from space."
            </p>

            <br />

            <p className="text-lg font-bold">D</p>
            <p className="text-lg">
              In theory, given the vastness of space, satellite operators should
              have plenty of room for all these missions to fly safely without
              ever nearing another object. So some scientists are tackling the
              problem of space junk by trying to find out where all the debris
              is to a high degree of precision. That would alleviate the need
              for many of the unnecessary manoeuvres that are carried out to
              avoid potential collisions.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "If you knew precisely where everything was, you would almost
                never have a problem," says Marlon Sorge, a space-debris
                specialist at the Aerospace Corporation in El Segundo,
                California.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    36
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg font-bold">E</p>
            <p className="text-lg">
              The field is called space traffic management, because it's similar
              to managing traffic on the roads or in the air.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Think about a busy day at an airport, says Moriba Jah, an
                astrodynamicist at the University of Texas at Austin: planes
                line up in the sky, landing and taking off close to one another
                in a carefully choreographed routine.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    30
                  </span>
                )}
              </span>
              Air-traffic controllers know the location of the planes down to
              one metre in accuracy. The same can't be said for space debris.
              Not all objects in orbit are known, and even those included in
              databases are not tracked consistently.
            </p>

            <br />

            <p className="text-lg font-bold">F</p>
            <p className="text-lg">
              An additional problem is that there is no authoritative catalogue
              that accurately lists the orbits of all known space debris. Jah
              illustrates this with a web-based database that he has developed.
              It draws on several sources, such as catalogues maintained by the
              US and Russian governments, to visualise where objects are in
              space. When he types in an identifier for a particular space
              object, the database draws a purple line to designate its orbit.
              Only this doesn't quite work for a number of objects, such as a
              Russian rocket body designated in the database as object number
              32280. When Jah enters that number, the database draws two purple
              lines: the US and Russian sources contain two completely different
              orbits for the same object.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Jah says that it is almost impossible to tell which is correct,
                unless a third source of information made it possible to
                cross-correlate.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    39
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              Jah describes himself as a space environmentalist:
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                "I want to make space a place that is safe to operate, that is
                free and useful for generations to come."
                {highlight && (
                  <>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                      28
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                      37
                    </span>
                  </>
                )}
              </span>
              Until that happens, he argues, the space community will continue
              devolving into a tragedy in which all spaceflight operators are
              polluting a common resource.
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
        <div className="p-4 w-1/2 mx-auto overflow-y-scroll">
          {/* ================= Questions 27–31 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 27–31</h2>
          <p className="mb-4 font-semibold">
            Reading Passage 3 has six sections, A–F.
            <br />
            Which section contains the following information?
            <br />
            Choose the correct letter, A–F, in boxes 27–31 on your answer sheet.
          </p>

          {[
            {
              num: 27,
              text: "a reference to the cooperation that takes place to try and minimise risk",
            },
            { num: 28, text: "an explanation of a person's aims" },
            {
              num: 29,
              text: "a description of a major collision that occurred in space",
            },
            {
              num: 30,
              text: "a comparison between tracking objects in space and the efficiency of a transportation system",
            },
            { num: 31, text: "a reference to efforts to classify space junk" },
          ].map((q) => (
            <div key={q.num} className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-bold">{q.num}</span>
              <span>{q.text}</span>
              <select
                className="border rounded px-2 py-1 w-15"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">{q.num}</option>
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 32–35 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 32–35</h2>
          <p className="mb-4 font-semibold">
            Complete the summary below.
            <br />
            Choose ONE WORD ONLY from the passage for each answer.
          </p>
          <div>
            <ul className="list-disc list-inside space-y-4 text-lg border p-5">
              <h2 className="font-bold text-center text-xl">
                The Inter-Agency Space Debris Coordination Committee
              </h2>
              {[
                {
                  num: 32,
                  text: "The committee gives advice on how the",
                  suffix: "of space can be achieved.",
                },
                {
                  num: 33,
                  text: "The committee advises that when satellites are no longer active, any unused",
                  suffix: "or pressurised material that could cause",
                },
                { num: 34, text: "", suffix: "should be removed." },
                {
                  num: 35,
                  text: "Although operators of large satellite constellations accept that they have obligations as stewards of space, Holger Krag points out that the operators that become",
                  suffix:
                    "are unlikely to prioritise removing their satellites from space.",
                },
              ].map((q) => (
                <li key={q.num} className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{q.num}</span>
                  {q.text && <span>{q.text}</span>}
                  <input
                    type="text"
                    placeholder={q.num}
                    className="border rounded px-2 py-1 w-32"
                    value={userAnswers[q.num] || ""}
                    onChange={(e) => handleInputChange(q.num, e.target.value)}
                  />
                  {q.suffix && <span>{q.suffix}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-6">Questions 36–40</h2>
          <p className="mb-4 font-semibold">
            Look at the following statements (Questions 36–40) and the list of
            people below.
            <br />
            Match each statement with the correct person, A–D.
            <br />
            NB You may use any letter more than once.
          </p>

          <div className="border p-4 max-w-[320px] mx-auto mb-5">
            <p className="font-bold mb-2">List of People</p>
            <ul className="list-disc list-inside">
              <li>A. Carolin Frueh</li>
              <li>B. Holger Krag</li>
              <li>C. Marlon Sorge</li>
              <li>D. Moriba Jah</li>
            </ul>
          </div>

          {[
            {
              num: 36,
              text: "Knowing the exact location of space junk would help prevent any possible danger.",
            },
            {
              num: 37,
              text: "Space should be available to everyone and should be preserved for the future.",
            },
            {
              num: 38,
              text: "A recommendation regarding satellites is widely ignored.",
            },
            {
              num: 39,
              text: "There is conflicting information about where some satellites are in space.",
            },
            {
              num: 40,
              text: "There is a risk we will not be able to undo the damage that occurs in space.",
            },
          ].map((q) => (
            <div key={q.num} className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-bold">{q.num}</span>
              <span>{q.text}</span>
              <select
                className="border rounded px-2 py-1 w-15"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">{q.num}</option>
                {["A", "B", "C", "D"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
          ))}
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
                    Your Score: {score}/14
                  </p>
                </div>

                {/* All Answers List */}
                <div className="mt-10 flex items-center justify-center">
                  {!showResult && (
                    <button
                      onClick={() => setShowResult(true)}
                      className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                    >
                      Submit Answers
                    </button>
                  )}
                </div>

                {showResult && (
                  <div className="space-y-6">
                    {/* Result Card */}
                    <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                      <h1 className="text-3xl font-bold mb-2">Result</h1>
                      <p className="text-green-600 text-2xl font-semibold">
                        Your Score: {score}/{Object.keys(correctAnswers).length}
                      </p>
                    </div>

                    {/* All Answers List */}
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-700 mb-3">
                        All Answers
                      </h3>
                      <ul className="space-y-3">
                        {Object.keys(correctAnswers).map((num) => {
                          const userAnswer =
                            userAnswers[num]?.trim().toLowerCase() || "";
                          const correctAnswer = correctAnswers[num]
                            ?.trim()
                            .toLowerCase();
                          const isCorrect =
                            userAnswer && userAnswer === correctAnswer;
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
                                {(noAnswer || !isCorrect) && (
                                  <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold leading-none">
                                      <ImCross />
                                    </span>
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
                                  userAnswer
                                )}
                              </p>

                              <p className="ml-8">
                                <span className="font-semibold text-green-600">
                                  Correct Answer:
                                </span>{" "}
                                {correctAnswers[num]}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Reading1Pagination2023></Reading1Pagination2023>
    </div>
  );
};

export default Reading1Part32023;
