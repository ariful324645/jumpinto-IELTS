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
          {/* Reading Passage */}
          <div className="">
            <h1 className="text-2xl font-bold text-center">
              {renderText("Conquering Earth's space junk problem")}
            </h1>

            <p className="text-lg my-5">
              {renderText(
                "Satellites, rocket shards and collision debris are creating major traffic risks in orbit around the planet. Researchers are working to reduce these threats."
              )}
            </p>

            {/* Section A */}
            <h1 className="text-lg font-bold my-5">{renderText("A")}</h1>
            <p className="text-lg">
              {renderText(
                "Last year, commercial companies, military and civil departments and amateurs sent more than 400 satellites into orbit, over four times the yearly average in the previous decade."
              )}
              {renderText(
                " Numbers could rise even more sharply if leading space companies follow through on plans to deploy hundreds to thousands of large constellations of satellites to space in the next few years."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "All that traffic can lead to disaster. Ten years ago, a US commercial Iridium satellite smashed into an inactive Russian communications satellite called Cosmos-2251, creating thousands of new pieces of space shrapnel that now threaten other satellites in low Earth orbit — the zone stretching up to 2,000 kilometres in altitude."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
              {renderText(
                " Altogether, there are roughly 20,000 human-made objects in orbit, from working satellites to small rocket pieces."
              )}
              {renderText(
                " And satellite operators can't steer away from every potential crash, because each move consumes time and fuel that could otherwise be used for the spacecraft's main job."
              )}
            </p>

            {/* Section B */}
            <h1 className="text-lg font-bold my-5">{renderText("B")}</h1>
            <p className="text-lg">
              {renderText(
                "Concern about space junk goes back to the beginning of the satellite era, but the number of objects in orbit is rising so rapidly that researchers are investigating new ways of attacking the problem."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Several teams are trying to improve methods for assessing what is in orbit, so that satellite operators can work more efficiently in ever-more-crowded space."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
              {renderText(
                " Some researchers are now starting to compile a massive data set that includes the best possible information on where everything is in orbit."
              )}
              {renderText(
                " Others are developing taxonomies of space debris, working on measuring properties such as the shape and size of an object, so that satellite operators know how much to worry about what's coming their way."
              )}
              {renderText(" The alternative, many say, is unthinkable.")}
              {renderText(
                " Just a few uncontrolled space crashes could generate enough debris to set off a runaway cascade of fragments, rendering near-Earth space unusable."
              )}
              {renderText(
                ' "If we go on like this, we will reach a point of no return," says Carolin Frueh, an astrodynamical researcher at Purdue University in West Lafayette, Indiana.'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If we go on like this, we will reach a point of no return, says Carolin Frueh, an astrodynamical researcher at Purdue University in West Lafayette, Indiana"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <h1 className="text-lg font-bold my-5">{renderText("C")}</h1>
            <p className="text-lg">
              {renderText(
                "Even as our ability to monitor space objects increases, so too does the total number of items in orbit."
              )}
              {renderText(
                " That means companies, governments and other players in space are collaborating in new ways to avoid a shared threat."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "International groups such as the Inter-Agency Space Debris Coordination Committee have developed guidelines on space sustainability."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                " Those include inactivating satellites at the end of their useful life by venting pressurised materials or leftover fuel that might lead to explosions."
              )}
              {renderText(
                " The intergovernmental groups also advise lowering satellites deep enough into the atmosphere that they will burn up or disintegrate within 25 years."
              )}
              {renderText(
                " But so far, only about half of all missions have abided by this 25-year goal."
              )}
              {renderText(
                " Operators of planned large constellations of satellites say they will be responsible stewards, but concerns remain about satellites that fail or companies that go bankrupt."
              )}
            </p>

            {/* Section D */}
            <h1 className="text-lg font-bold my-5">{renderText("D")}</h1>
            <p className="text-lg">
              {renderText(
                "In theory, given the vastness of space, satellite operators should have plenty of room for all these missions to fly safely without ever nearing another object."
              )}

              {renderText(
                "Some scientists are tackling the problem by trying to determine where all the debris is to a high degree of precision."
              )}

              {renderText(
                " That would alleviate the need for many unnecessary manoeuvres carried out to avoid potential collisions."
              )}
              {renderText(" ")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "If you knew precisely where everything was, you would almost never have a problem, says Marlon Sorge, a space-debris specialist at the Aerospace Corporation in El Segundo, California"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <h1 className="text-lg font-bold my-5">{renderText("E")}</h1>
            <p className="text-lg">
              {renderText(
                "The field is called space traffic management, because it is similar to managing traffic on the roads or in the air."
              )}
              {renderText(
                " Think about a busy day at an airport: planes line up in the sky, landing and taking off close to one another in a carefully choreographed routine."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Air-traffic controllers know the location of planes down to one metre in accuracy."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
              {renderText(
                " The same cannot be said for space debris, as not all objects in orbit are known or tracked consistently."
              )}
            </p>

            {/* Section F */}
            <h1 className="text-lg font-bold my-5">{renderText("F")}</h1>
            <p className="text-lg">
              {renderText(
                "An additional problem is that there is no authoritative catalogue that accurately lists the orbits of all known space debris."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "When Jah enters that number, the database draws two purple lines: the US and Russian sources contain two completely different orbits for the same object"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>
              {renderText(
                " Without a third source for cross-checking, resolving these discrepancies can be nearly impossible."
              )}
            </p>

            {/* Section G */}
            <h1 className="text-lg font-bold my-5">{renderText("G")}</h1>
            <p className="text-lg">
              {renderText(
                "Some researchers describe themselves as space environmentalists who want to make space safe and usable for generations to come."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Until that happens, they argue, the space community risks falling into a tragedy in which all spaceflight operators pollute a shared resource."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>
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
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–31")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Reading Passage 3 has six sections, A–F.")}
            <br />
            {renderText("Which section contains the following information?")}
            <br />
            {renderText(
              "Choose the correct letter, A–F, in boxes 27–31 on your answer sheet."
            )}
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
              <span className="font-bold">{renderText(String(q.num))}</span>
              <span>{renderText(q.text)}</span>
              <select
                className="border rounded px-2 py-1 w-15"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">{renderText(String(q.num))}</option>
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <option key={letter} value={letter}>
                    {renderText(letter)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 32–35 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 32–35")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText("Complete the summary below.")}
            <br />
            {renderText(
              "Choose ONE WORD ONLY from the passage for each answer."
            )}
          </p>

          <div>
            <ul className="list-disc list-inside space-y-4 text-lg border p-5">
              <h2 className="font-bold text-center text-xl">
                {renderText(
                  "The Inter-Agency Space Debris Coordination Committee"
                )}
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
                  {q.text && <span>{renderText(q.text)}</span>}

                  <span className="font-semibold h-8 w-8 border-1 rounded-full flex items-center justify-center">
                    {renderText(String(q.num))}
                  </span>

                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-32"
                    value={userAnswers[q.num] || ""}
                    onChange={(e) => handleInputChange(q.num, e.target.value)}
                  />

                  {q.suffix && <span>{renderText(q.suffix)}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Questions 36–40 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 36–40")}
          </h2>

          <p className="mb-4 font-semibold">
            {renderText(
              "Look at the following statements (Questions 36–40) and the list of people below."
            )}
            <br />
            {renderText("Match each statement with the correct person, A–D.")}
            <br />
            {renderText("NB You may use any letter more than once.")}
          </p>

          <div className="border p-4 max-w-[320px] mx-auto mb-5">
            <p className="font-bold mb-2">{renderText("List of People")}</p>
            <ul className="list-disc list-inside">
              <li>{renderText("A. Carolin Frueh")}</li>
              <li>{renderText("B. Holger Krag")}</li>
              <li>{renderText("C. Marlon Sorge")}</li>
              <li>{renderText("D. Moriba Jah")}</li>
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
              <span className="font-bold">{renderText(String(q.num))}</span>
              <span>{renderText(q.text)}</span>
              <select
                className="border rounded px-2 py-1 w-15"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">{renderText(String(q.num))}</option>
                {["A", "B", "C", "D"].map((letter) => (
                  <option key={letter} value={letter}>
                    {renderText(letter)}
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
                    {renderText(`Your Score: ${score}/14`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (27–40)")}
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
                              </span>
                            )}
                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}

                            <p className="font-bold">
                              {renderText(`Q${num}:`)}
                            </p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{renderText(userAnswer)}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            <span>{renderText(correctAnswers[num])}</span>
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
      <Reading1Pagination2023></Reading1Pagination2023>
    </div>
  );
};

export default Reading1Part32023;
