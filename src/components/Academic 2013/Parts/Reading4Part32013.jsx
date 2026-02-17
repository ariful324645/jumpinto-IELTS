import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2013 from "../Pagination 2013/Reading4Pagination2013";

const Reading4Part32013 = () => {
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
    "Methods for predicting the Earth's population have recently changed.",
    "Human beings are responsible for some of the destruction to food-producing land.",
    "The crops produced in vertical farms will depend on the season.",
    "Some damage to food crops is caused by climate change.",
    "Fertilisers will be needed for certain crops in vertical farms.",
    "Vertical farming will make plants less likely to be affected by infectious diseases.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];
  const handleOptionClick = (qNum, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [qNum]: option,
    }));

    setUserAnswers((prev) => {
      const updated = { ...prev, [qNum]: option }; // ✅ FIX
      calculateScore(updated);
      return updated;
    });
  };

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

  const [selectedOptions, setSelectedOptions] = useState({});

  const [activeNumbers, setActiveNumbers] = useState(Array(14).fill(false));

  const handleNumberClick = (qIndex) => {
    const updatedActive = [...activeNumbers];
    updatedActive[qIndex] = !updatedActive[qIndex]; // toggle active state
    setActiveNumbers(updatedActive);
  };

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

  //  Marks show
  const correctAnswers = {
    // ================= Questions 27–30 (Headings i–vii) =================
    27: "ii", // Paragraph B
    28: "vi", // Paragraph C
    29: "i", // Paragraph D
    30: "iii", // Paragraph E

    // ================= Questions 31–36 (MCQ A–D) =================
    31: "B",
    32: "A",
    33: "D",
    34: "D",
    35: "C",
    36: "B",

    // ================= Questions 37–40 (TRUE/FALSE/NOT GIVEN) =================
    37: "NOT GIVEN",
    38: "NOT GIVEN",
    39: "FALSE",
    40: "TRUE",
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

          <div className="">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("The Development of Museums")}
            </h1>

            {/* Section A */}
            <p className="text-lg">
              <span className="font-bold">{renderText("A")}</span>
              <br />
              {renderText(
                "The conviction that historical relics provide infallible testimony about the past is rooted in the nineteenth and early twentieth centuries, when science was regarded as objective and value free. As one writer observes: \"Although it is now evident that artefacts are as easily altered as chronicles, public faith in their veracity endures: a tangible relic seems 'ipso facto' real.\" Such conviction was, until recently, reflected in museum displays. Museums used to look - and some still do - much like storage rooms of objects packed together in showcases: good for scholars who wanted to study the subtle differences in design, but not for the ordinary visitor, to whom it all looked alike. Similarly, the information accompanying the objects often made little sense to the lay visitor.",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " The content and format of explanations dated back to a time when the museum was the exclusive domain of the scientific researcher",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
            </p>

            {/* Section B */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("B")}</span>
              <br />
              {renderText(
                "Recently, however, attitudes towards history and the way it should be presented have altered. ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The key word in heritage display is now 'experience', the more exciting the better and if possible, involving all the senses.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>

              {renderText(
                " Good examples of this approach in the UK are the Jorvik Center in York; the National Museum of Photography, Film and Television in Bradford; and the Imperial War Museum in London. In the US the trend emerged much earlier: Williamsburg has been a prototype for many heritage developments in other parts of the world. No one can predict where the process will end. On so-called heritage sites the re-enactment of historical events is increasingly popular, and computers will soon provide virtual reality experiences, ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "which will present visitors with a vivid image of the period of their choice, in which they themselves can act as if part of the historical environment. Such developments have been criticized as an intolerable vulgarization, but the success of many historical theme parks and similar locations suggests that the majority of the public does not share this opinion.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("C")}</span>
              <br />

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "In a related development, the sharp distinction between museum and heritage sites on the one hand, and theme parks on the other, is gradually evaporating.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28,33")}
                  </span>
                )}
              </span>

              {renderText(
                " They already borrow ideas and concepts from one another. For example, museums have adopted story lines for exhibitions, sites have accepted 'theming' as a relevant tool, and theme parks are moving towards more authenticity and research-based presentations. In zoos, animals are no longer kept in cages, but in great spaces, either in the open air or in enormous greenhouses, such as the jungle and desert environments in Burgers' Zoo in Holland. This particular trend is regarded as one of the major developments in the presentation of natural history in the twentieth century.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("D")}</span>
              <br />

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Theme parks are undergoing other changes, too, as they try to present more serious social and cultural issues, and move away from fantasy.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("37")}
                  </span>
                )}
              </span>

              {renderText(
                " This development is a response to market forces and , although museums and heritage sites have a special, rather distinct, role to fulfil, they are also operating in a very competitive environment, where visitors make choices on how and where to spend their free time. Heritage and museum experts do not have to invent stories and recreate historical environments to attract their visitors: their assets are already in place. However, exhibits must be both based on artefacts and facts as we know them, and attractively presented. ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Those who are professionally engaged in the art of interpreting history are thus in a difficult position, as they must steer a narrow course between the demands of 'evidence' and 'attractiveness', especially given the increasing need in the heritage industry for income-generating activities.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29,34")}
                  </span>
                )}
              </span>
            </p>

            {/* Section E */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("E")}</span>
              <br />
              {renderText(
                "It could be claimed that in order to make everything in heritage more 'real', historical accuracy must be increasingly altered. For example, Pithecanthropus erectus is depicted in an Indonesian museum with Malay facial features, because this corresponds to public perceptions. Similarly, in the Museum of Natural History in Washington, Neanderthal man is shown making a dominant gesture to his wife. ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Such presentations tell us more about contemporary perceptions of the world than about our ancestors.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30,35")}
                  </span>
                )}
              </span>

              {renderText(
                " There is one compensation, however, for the professionals who make these interpretations: if they did not provide the interpretation, visitors would do it for themselves, based on their own ideas, misconceptions and prejudices. And no matter how exciting the result, it would contain a lot more bias than the presentations provided by experts.",
              )}
            </p>

            {/* Section F */}
            <p className="text-lg mt-5">
              <span className="font-bold">{renderText("F")}</span>
              <br />
              {renderText(
                "Human bias is inevitable, but another source of bias in the representation of history has to do with the transitory nature of the materials themselves. ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The simple fact is that not everything from history survives the historical process.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")}
                  </span>
                )}
              </span>

              {renderText(
                " Castles, palaces and cathedrals have a longer lifespan than the dwellings of ordinary people. The same applies to the furnishings and other contents of the premises. ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "In a town like Leyden in Holland, which in the seventeenth century was occupied by approximately the same number of inhabitants as today, people lived within the walled town, an area more than five times smaller than modern Leyden.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("39")}
                  </span>
                )}
              </span>

              {renderText(
                " In most of the houses several families lived together in circumstances beyond our imagination. Yet in museums, fine period rooms give only an image of the lifestyle of the upper class of that era. No wonder that people who stroll around exhibitions are filled with nostalgia; the evidence in museums indicates that life was so much better in the past. ",
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "This notion is induced by the bias in its representation in museums and heritage centers.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("40")}
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll ">
          {/* ================= Questions 27–30 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–30")}
          </h2>

          <p className="mb-4">
            {renderText("Reading Passage 3 has six paragraphs, A-F.")}
          </p>

          <p className="mb-4">
            {renderText(
              "Choose the correct heading for paragraphs B-E from the list of headings below.",
            )}
          </p>

          <p className="mb-4">
            {renderText(
              "Choose the correct number, i-vii, in boxes 27-30 on your answer sheet.",
            )}
          </p>

          <div className="border max-w-[420px]  mx-auto rounded-lg p-4 mb-6">
            <p className="font-bold mb-3">{renderText("List of Headings")}</p>
            <ul className="space-y-2 text-lg">
              <li>
                {renderText("i. Commercial pressures on people in charge")}
              </li>
              <li>
                {renderText("ii. Mixed views on current changes to museums")}
              </li>
              <li>
                {renderText(
                  "iii. Interpreting the facts to meet visitor expectations",
                )}
              </li>
              <li>{renderText("iv. The international dimension")}</li>
              <li>{renderText("v. Collections of factual evidence")}</li>
              <li>
                {renderText("vi. Fewer differences between public attractions")}
              </li>
              <li>{renderText("vii. Current reviews and suggestions")}</li>
            </ul>

            <p className="mt-4 font-semibold text-lg">
              {renderText("(Example) Paragraph A: v")}
            </p>
          </div>

          {[
            { q: 27, text: "Paragraph B" },
            { q: 28, text: "Paragraph C" },
            { q: 29, text: "Paragraph D" },
            { q: 30, text: "Paragraph E" },
          ].map(({ q, text }) => (
            <div
              key={q}
              className="space-y-2 text-lg mb-4 flex gap-2 items-center"
            >
              <p>
                <span className="font-bold">{q}.</span> {renderText(text)}
              </p>

              <select
                className="border-2 border-gray-300 rounded-md px-2 py-1"
                value={userAnswers[q] || ""}
                onChange={(e) => handleInputChange(q, e.target.value)}
              >
                <option value="">{q}</option>
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 31–36 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 31–36")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          {[
            {
              q: 31,
              text: "Compared with today's museums, those of the past",
              options: {
                A: "did not present history in a detailed way.",
                B: "were not primarily intended for the public.",
                C: "were more clearly organised.",
                D: "preserved items with greater care.",
              },
            },
            {
              q: 32,
              text: "According to the writer, current trends in the heritage industry",
              options: {
                A: "emphasise personal involvement.",
                B: "have their origins in York and London.",
                C: "rely on computer images.",
                D: "reflect minority tastes.",
              },
            },
            {
              q: 33,
              text: "The writer says that museums, heritage sites and theme parks",
              options: {
                A: "often work in close partnership.",
                B: "try to preserve separate identities.",
                C: "have similar exhibits.",
                D: "are less easy to distinguish than before.",
              },
            },
            {
              q: 34,
              text: "The writer says that in preparing exhibits for museums, experts",
              options: {
                A: "should pursue a single objective.",
                B: "have to do a certain amount of language translation.",
                C: "should be free from commercial constraints.",
                D: "have to balance conflicting priorities.",
              },
            },
            {
              q: 35,
              text: "In paragraph E, the writer suggests that some museum exhibits",
              options: {
                A: "fail to match visitor expectations.",
                B: "are based on the false assumptions of professionals.",
                C: "reveal more about present beliefs than about the past.",
                D: "allow visitors to make more use of their imagination.",
              },
            },
            {
              q: 36,
              text: "The passage ends by noting that our view of history is biased because",
              options: {
                A: "we fail to use our imagination.",
                B: "only very durable objects remain from the past.",
                C: "we tend to ignore things that displease us.",
                D: "museum exhibits focus too much on the local area.",
              },
            },
          ].map(({ q, text, options }) => (
            <div key={q} className="mb-6 text-lg  pb-4">
              <p className="mb-3">
                <span className="font-bold">{q}.</span> {renderText(text)}
              </p>

              <div className="space-y-2 ml-4">
                {Object.entries(options).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q-${q}`}
                      value={key}
                      checked={userAnswers[q] === key}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                    />
                    <span className="font-semibold">{key}.</span>{" "}
                    <span>{renderText(value)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* ================= Questions 37–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 37–40")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 3?",
            )}
          </p>

          <p className="mb-4">
            {renderText("In boxes 37-40 on your answer sheet, choose")}
          </p>

          <div className=" rounded-lg p-4 mb-6">
            <p className="font-semibold">
              {renderText("TRUE")} -{" "}
              {renderText("if the statement agrees with the information")}
            </p>
            <p className="font-semibold">
              {renderText("FALSE")} -{" "}
              {renderText("if the statement contradicts the information")}
            </p>
            <p className="font-semibold">
              {renderText("NOT GIVEN")} -{" "}
              {renderText("if there is no information on this")}
            </p>
          </div>

          {[
            {
              q: 37,
              text: "Consumers prefer theme parks which avoid serious issues.",
            },
            { q: 38, text: "More people visit museums than theme parks." },
            {
              q: 39,
              text: "The boundaries of Leyden have changed little since the seventeenth century.",
            },
            {
              q: 40,
              text: "Museums can give a false impression of how life used to be.",
            },
          ].map(({ q, text }) => (
            <div key={q} className="mb-6 text-lg pb-4">
              <p className="mb-3">
                <span className="font-bold">{q}.</span> {renderText(text)}
              </p>

              <div className="space-y-2 ml-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q-${q}`}
                      value={opt}
                      checked={userAnswers[q] === opt}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* ================= Submit / Result ================= */}
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
                      const userAnswer =
                        userAnswers[num]?.toString().trim().toLowerCase() || "";

                      const correctAnswer =
                        correctAnswers[num]?.toString().trim().toLowerCase() ||
                        "";

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
                              <span>{userAnswers[num]}</span>
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
      <Reading4Pagination2013></Reading4Pagination2013>
    </div>
  );
};

export default Reading4Part32013;
