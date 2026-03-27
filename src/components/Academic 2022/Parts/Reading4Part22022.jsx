import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2022 from "../Pagination2022/Reading4Pagination2022";

const Reading4Part22022 = () => {
  const [highlight, setHighlight] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [activeButtons, setActiveButtons] = useState({});
  const [score, setScore] = useState(0);
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
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle true/false
    }));
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
    // ================= Questions 14–18 (dropdown select A–F) =================
    14: "A", // an explanation of the need for research to focus on individuals with a fairly consistent income
    15: "B", // examples of the sources the database has been compiled from
    16: "C", // an account of one individual's refusal to obey an order
    17: "D", // a reference to a region being particularly suited to research into the link between education and economic growth
    18: "E", // examples of the items included in a list of personal possessions

    // ================= Questions 19–22 (ONE WORD ONLY) =================
    19: "family", // the lives of a range of individuals, as well as those of their ___
    20: "lesson", // paying attention to a ___
    21: "fine", // as a punishment, she was later given a ___
    22: "migration", // guilds could prevent ___ and stop skilled people from working

    // ================= Questions 23–24 (Multi-select, TWO letters) =================
    "23-24": ["A", "B"], // literacy rates: little research & very good literacy rates

    // ================= Questions 25–26 (Multi-select, TWO letters) =================
    "25-26": ["A", "D"], // guilds: helped young people learn & opposed practices threatening control
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("/2021/Test 1/reading");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      let updated = { ...prev };

      // Multi-select (arrays) for 11-12, 13-14
      if (id === "23-24" || id === "25-26") {
        const prevAnswers = Array.isArray(prev[id]) ? [...prev[id]] : [];
        if (prevAnswers.includes(value)) {
          updated[id] = prevAnswers.filter((v) => v !== value);
        } else {
          updated[id] = [...prevAnswers, value];
        }
      } else {
        // Single-select (string) for 15–20
        updated[id] = value;
      }

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
    localStorage.setItem("/listening1Part22022", newScore);
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
            <h1 className="text-xl font-bold">PASSAGE 2</h1>
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
              <span className="text-lg font-bold"> Questions 14-26</span>, which
              are based on Reading Passage 2 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("Does education fuel economic growth?")}
            </h1>

            {/* ===================== A ===================== */}
            <p className="text-lg">
              {renderText(
                "Over the last decade, a huge database about the lives of southwest German villagers between 1600 and 1900 has been compiled by a team led by Professor Sheilagh Ogilvie at Cambridge University's Faculty of Economics. It includes court records, guild ledgers, parish registers, village censuses, tax lists and - the most recent addition - 9,000 handwritten inventories listing over a million personal possessions belonging to ordinary women and men across three centuries."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Ogilvie, who discovered the inventories in the archives of two German communities 30 years ago, believes they may hold the answer to a conundrum that has long puzzled economists: the lack of evidence for a causal link between education and a country's economic growth."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    15
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== B ===================== */}
            <p className="text-lg">
              {renderText(
                'As Ogilvie explains, "Education helps us to work more productively, invent better technology, and earn more...surely it must be critical for economic growth? But, if you look back through history, there\'s no evidence that having a high literacy rate made a country industrialise earlier."'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Between 1600 and 1900, England had only mediocre literacy rates by European standards, yet its economy grew fast and it was the first country to industrialise. During this period, Germany and Scandinavia had excellent literacy rates, but their economies grew slowly and they industrialised late."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    23
                  </span>
                )}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  ' "Modern cross-country analyses have also struggled to find evidence that education causes economic growth, even though there is plenty of evidence that growth increases education," she adds.'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    24
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* ===================== C ===================== */}
            <p className="text-lg">
              {renderText(
                "In the handwritten inventories that Ogilvie is analysing are the belongings of women and men at marriage, remarriage and death. From badger skins to Bibles, sewing machines to scarlet bodices - the villagers' entire worldly goods are included. Inventories of agricultural equipment and craft tools reveal economic activities; ownership of books and education-related objects like pens and slates suggests how people learned. In addition, the tax lists included in the database record the value of farms, workshops, assets and debts; signatures and people's estimates of their age indicate literacy and numeracy levels; and court records reveal obstacles (such as the activities of the guilds*) that stifled industry."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Previous studies usually had just one way of linking education with economic growth - the presence of schools and printing presses, perhaps, or school enrolment, or the ability to sign names. According to Ogilvie, the database provides multiple indicators for the same individuals, making it possible to analyse links between literacy, numeracy, wealth, and industriousness, for individual women and men over the long term."
              )}
            </p>

            <br />

            {/* ===================== D ===================== */}
            <p className="text-lg">
              {renderText(
                'Ogilvie and her team have been building the vast database of material possessions on top of their full demographic reconstruction of the people who lived in these two German communities. "We can follow the same people - and their descendants - across 300 years of educational and economic change," she says. Individual lives have unfolded before their eyes.'
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Stories like that of the 24-year-olds Ana Regina and Magdalena Riethmüllerin, who were chastised in 1707 for reading books in church instead of listening to the sermon. This tells us they were continuing to develop their reading skills at least a decade after leaving school, explains Ogilvie."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "The database also reveals the case of Juliana Schweickherdt, a 50-year-old spinster living in the small Black Forest community of Wildberg, who was reprimanded in 1752 by the local weavers weaving cloth and combing wool, counter to the guild ordinance"
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " When Juliana continued taking jobs reserved for male guild members, she was summoned before the guild court and told to pay a fine equivalent to one third of a servant's annual wage."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    21
                  </span>
                )}
              </span>

              {renderText(
                " It was a small act of defiance by today's standards, but it reflects a time when laws in Germany and elsewhere regulated people's access to labour markets. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The dominance of guilds not only prevented people from using their skills, but also held back even the simplest industrial innovation."
                )}
              </span>
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  22
                </span>
              )}
            </p>

            <br />

            {/* ===================== E ===================== */}
            <p className="text-lg">
              {renderText(
                "The data-gathering phase of the project has been completed and now, according to Ogilvie, it is time 'to ask the big questions'. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "One way to look at whether education causes economic growth is to 'hold wealth constant'."
                )}
              </span>
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  14
                </span>
              )}
              {renderText(
                " This involves following the lives of different people with the same level of wealth over a period of time. If wealth is constant, it is possible to discover whether education was, for example, linked to the cultivation of new crops, or to the adoption of industrial innovations like sewing machines. The team will also ask what aspect of education helped people engage more with productive and innovative activities. Was it, for instance, literacy, numeracy, book ownership, years of schooling? Was there a threshold level - a tipping point - that needed to be reached to affect economic performance?"
              )}
            </p>

            <br />

            {/* ===================== F ===================== */}
            <p className="text-lg">
              {renderText(
                "Ogilvie hopes to start finding answers to these questions over the next few years. One thing is already clear, she says: the relationship between education and economic growth is far from straightforward. German-speaking central Europe is an excellent laboratory for testing theories of economic growth, she explains. Between 1600 and 1900, literacy rates and book ownership were high and yet the region remained poor."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " It was also the case that local guilds and merchant associations were extremely powerful and legislated against anything that undermined their monopolies."
                )}
              </span>
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  26
                </span>
              )}
              {renderText(
                " In villages throughout the region, guilds blocked labour migration and resisted changes that might reduce their influence. Early findings suggest that the potential benefits of education for the economy can be held back by other barriers, and this has implications for today. Huge amounts are spent improving education in developing countries, but this spending can fail to deliver economic growth if restrictions block people - especially women and the poor - from using their education in economically productive ways. If economic institutions are poorly set up, for instance, education can't lead to growth."
              )}
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
          {/* ================= Questions 14–18 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 14–18")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText(
              "Reading Passage 2 has six sections, A-F. \nWhich section contains the following information? \nChoose the correct letter, A-F, in boxes 14–18 on your answer sheet. \nNB You may use any letter more than once."
            )}
          </p>

          {[
            {
              num: 14,
              text: "an explanation of the need for research to focus on individuals with a fairly consistent income",
            },
            {
              num: 15,
              text: "examples of the sources the database has been compiled from",
            },
            {
              num: 16,
              text: "an account of one individual's refusal to obey an order",
            },
            {
              num: 17,
              text: "a reference to a region being particularly suited to research into the link between education and economic growth",
            },
            {
              num: 18,
              text: "examples of the items included in a list of personal possessions",
            },
          ].map((q) => (
            <div key={q.num} className="flex flex-wrap items-center gap-3 mb-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full border font-bold">
                {renderText(q.num.toString())}
              </span>
              <span>{renderText(q.text)}</span>
              <select
                className="border rounded px-2 py-1 w-20 ml-3"
                value={userAnswers[q.num] || ""}
                onChange={(e) => handleInputChange(q.num, e.target.value)}
              >
                <option value="">{renderText("Select")}</option>
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* ================= Questions 19–22 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 19–22")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText(
              "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer."
            )}
          </p>

          <div className="border p-5 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              {renderText(
                "Demographic reconstruction of two German communities"
              )}
            </h3>
            <p className="text-lg">
              {renderText(
                "The database that Ogilvie and her team has compiled sheds light on the lives of a range of individuals, as well as those of their "
              )}
              <button
                onClick={() => toggleButton(19)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[19]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                19
              </button>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 mx-1"
                value={userAnswers[19] || ""}
                onChange={(e) => handleInputChange(19, e.target.value)}
              />
              {renderText(
                ", over a 300-year period. For example, Ana Regina and Magdalena Riethmüllerin were reprimanded for reading while they should have been paying attention to a "
              )}
              <button
                onClick={() => toggleButton(20)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[20]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                20
              </button>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 mx-1"
                value={userAnswers[20] || ""}
                onChange={(e) => handleInputChange(20, e.target.value)}
              />
              {renderText(
                ". There was also Juliana Schweickherdt, who came to the notice of the weavers' guild in the year 1752 for breaking guild rules. As a punishment, she was later given a "
              )}
              <button
                onClick={() => toggleButton(21)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[21]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                21
              </button>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 mx-1"
                value={userAnswers[21] || ""}
                onChange={(e) => handleInputChange(21, e.target.value)}
              />
              {renderText(
                ". Cases like this illustrate how the guilds could prevent "
              )}
              <button
                onClick={() => toggleButton(22)}
                className={`w-8 h-8 rounded-full border-2 ${
                  activeButtons[22]
                    ? "bg-yellow-400 border-yellow-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                22
              </button>
              <input
                type="text"
                className="border rounded px-2 py-1 w-32 mx-1"
                value={userAnswers[22] || ""}
                onChange={(e) => handleInputChange(22, e.target.value)}
              />{" "}
              {renderText("and stop skilled people from working.")}
            </p>
          </div>

          {/* ================= Questions 23–24 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 23–24")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>
          <p className="mb-4 font-semibold">
            {renderText(
              "Which TWO of the following statements does the writer make about literacy rates in Section B?"
            )}
          </p>

          <div className="p-5 mb-4">
            {[
              {
                letter: "A",
                text: "Very little research has been done into the link between high literacy rates and improved earnings.",
              },
              {
                letter: "B",
                text: "Literacy rates in Germany between 1600 and 1900 were very good.",
              },
              {
                letter: "C",
                text: "There is strong evidence that high literacy rates in the modern world result in economic growth.",
              },
              {
                letter: "D",
                text: "England is a good example of how high literacy rates helped a country industrialise.",
              },
              {
                letter: "E",
                text: "Economic growth can help to improve literacy rates.",
              },
            ].map(({ letter, text }) => {
              const selectedOptions = userAnswers["23-24"] || [];
              const isChecked = selectedOptions.includes(letter);
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={letter}
                  className={`flex items-start gap-3 mb-2 cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={letter}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("23-24", letter)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold">{renderText(letter)}.</span>{" "}
                    {renderText(text)}
                  </div>
                </label>
              );
            })}
          </div>

          {/* ================= Questions 25–26 ================= */}
          <h2 className="text-lg font-bold mt-6">
            {renderText("Questions 25–26")}
          </h2>
          <p className="mb-4 font-semibold">
            {renderText("Choose TWO letters, A–E.")}
          </p>
          <p className="mb-4 font-semibold">
            {renderText(
              "Which TWO of the following statements does the writer make in Section F about guilds in German-speaking Central Europe between 1600 and 1900?"
            )}
          </p>

          <div className="p-5 mb-4">
            {[
              {
                letter: "A",
                text: "They helped young people to learn a skill.",
              },
              {
                letter: "B",
                text: "They were opposed to people moving to an area for work.",
              },
              {
                letter: "C",
                text: "They kept better records than guilds in other parts of the world.",
              },
              {
                letter: "D",
                text: "They opposed practices that threatened their control over a trade.",
              },
              {
                letter: "E",
                text: "They predominantly consisted of wealthy merchants.",
              },
            ].map(({ letter, text }) => {
              const selectedOptions = userAnswers["25-26"] || [];
              const isChecked = selectedOptions.includes(letter);
              const isDisabled = selectedOptions.length === 2 && !isChecked;

              return (
                <label
                  key={letter}
                  className={`flex items-start gap-3 mb-2 cursor-pointer ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={letter}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleInputChange("25-26", letter)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold">{renderText(letter)}.</span>{" "}
                    {renderText(text)}
                  </div>
                </label>
              );
            })}
          </div>

          {/* ================= Submit & Result ================= */}
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
                    {renderText(`Your Score: ${score}/13`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (14–26)")}
                  </h3>
                  <ul className="space-y-3">
                    {[14, 15, 16, 17, 18, 19, 20, 21, 22, "23-24", "25-26"].map(
                      (num) => {
                        const user = userAnswers[num];
                        const correct = correctAnswers[num];

                        const isCorrect = (() => {
                          if (Array.isArray(correct)) {
                            return (
                              Array.isArray(user) &&
                              user.length === correct.length &&
                              correct.every((val) => user.includes(val))
                            );
                          } else {
                            return (
                              user?.trim().toLowerCase() ===
                              correct?.trim().toLowerCase()
                            );
                          }
                        })();

                        const noAnswer = !user;
                        const userAnswerDisplay = Array.isArray(user)
                          ? user.join(", ")
                          : user?.trim() || "";
                        const correctAnswerDisplay = Array.isArray(correct)
                          ? correct.join(", ")
                          : correct?.trim();

                        return (
                          <li
                            key={num}
                            className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-2">
                              {isCorrect && (
                                <FaDotCircle className="text-green-600 text-xl font-bold" />
                              )}
                              {!isCorrect && (
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500">
                                  <ImCross className="text-white text-sm font-bold" />
                                </div>
                              )}
                              <p className="font-bold">
                                {renderText(`Q${num}:`)}
                              </p>
                            </div>
                            <p className="ml-8">
                              <span className="font-semibold">
                                {renderText("Your Answer:")}
                              </span>{" "}
                              {noAnswer ? (
                                <span className="italic">
                                  {renderText("No answer provided")}
                                </span>
                              ) : (
                                renderText(userAnswerDisplay)
                              )}
                            </p>
                            <p className="ml-8">
                              <span className="font-semibold text-green-600">
                                {renderText("Correct Answer:")}
                              </span>{" "}
                              {renderText(correctAnswerDisplay)}
                            </p>
                          </li>
                        );
                      }
                    )}
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

export default Reading4Part22022;
