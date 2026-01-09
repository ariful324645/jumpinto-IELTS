import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading2Pagination2023 from "../Pagination 2023/Reading2Pagination2023";

const Reading2Part22023 = () => {
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
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };

  //  Marks show
  const correctAnswers = {
    // Questions 14–19 (multiple choice)
    14: "D", // Experts disagree on which specialised tasks AI will be able to perform
    15: "C", // giving information about the development of machine intelligence
    16: "B", // to illustrate that poorly defined objectives can go wrong
    17: "B", // deciding which values we want AI to share with us
    18: "B", // It is hard to know what impact machines will have on the world
    19: "D", // Human shortcomings will make creating the machines we need more difficult

    // Questions 20–23 (YES/NO/NOT GIVEN)
    20: "NOT GIVEN", // Machines with moral decisions preventing community interests
    21: "NOT GIVEN", // Silicon police numbers
    22: "NOT GIVEN", // Many people are comfortable with independence restriction
    23: "YES", // We all need to work together to ensure machines act in our best interests

    // Questions 24–26 (summary completion)
    24: "C", // available resources
    25: "A", // medical practitioners
    26: "E", // professional authority
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
              <span className="text-lg font-bold"> Questions 14-26</span>
              which are based on Reading Passage 2 below.
            </h1>
          </div>

          {/* Reading Passage */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              Living with artificial intelligence
            </h1>

            <p className="text-lg">
              Powerful artificial intelligence (AI) needs to be reliably aligned
              with human values, but does this mean AI will eventually have to
              police those values?
            </p>

            <p className="text-lg">
              This has been the decade of AI, with one astonishing feat after
              another. A chessplaying AI that can defeat not only all human
              chess players, but also all previous human-programmed chess
              machines, after learning the game in just four hours? That's
              yesterday's news, what's next? True, these prodigious
              accomplishments are all in so called narrow AI, where machines
              perform highly specialised tasks. But many experts believe this
              restriction is very temporary.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                By mid-century, we may have artificial general intelligence
                (AGI) - machines that can achieve human-level performance on the
                full range of tasks that we ourselves can tackle.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    14
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                If so, there's little reason to think it will stop there.
                Machines will be free of many of the physical constraints on
                human intelligence.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    15
                  </span>
                )}
              </span>
              Our brains run at slow biochemical processing speeds on the power
              of a light bulb, and their size is restricted by the dimensions of
              the human birth canal. It is remarkable what they accomplish,
              given these handicaps. But they may be as far from the physical
              limits of thought as our eyes are from the incredibly powerful
              Webb Space Telescope.
            </p>

            <p className="text-lg">
              Once machines are better than us at designing even smarter
              machines, progress towards these limits could accelerate. What
              would this mean for us? Could we ensure a safe and worthwhile
              coexistence with such machines? On the plus side, AI is already
              useful and profitable for many things, and super AI might be
              expected to be super useful, and super profitable. But the more
              powerful AI becomes, the more important it will be to specify its
              goals with great care.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Folklore is full of tales of people who ask for the wrong thing,
                with disastrous consequences - King Midas, for example, might
                have wished that everything he touched turned to gold, but
                didn't really intend this to apply to his breakfast.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    16
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              So we need to create powerful AI machines that are
              'human-friendly' - that have goals reliably aligned with our own
              values.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                One thing that makes this task difficult is that we are far from
                reliably human-friendly ourselves.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    17
                  </span>
                )}
              </span>
              We do many terrible things to each other and to many other
              creatures with whom we share the planet. If superintelligent
              machines don't do a lot better than us, we'll be in deep trouble.
              We'll have powerful new intelligence amplifying the dark sides of
              our own fallible natures.
            </p>

            <p className="text-lg">
              For safety's sake, then, we want the machines to be ethically as
              well as cognitively superhuman. We want them to aim for the moral
              high ground, not for the troughs in which many of us spend some of
              our time. Luckily they'll be smart enough for the job.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                If there are routes to the moral high ground, they'll be better
                than us at finding them, and steering us in the right direction.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    18
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              However, there are two big problems with this utopian vision. One
              is how we get the machines started on the journey, the other is
              what it would mean to reach this destination. The 'getting
              started' problem is that we need to tell the machines what they're
              looking for with sufficient clarity that we can be confident they
              will find it - whatever 'it' actually turns out to be.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                This won't be easy, given that we are tribal creatures and
                conflicted about the ideals ourselves.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    19
                  </span>
                )}
              </span>
              We often ignore the suffering of strangers, and even contribute to
              it, at least indirectly. How then, do we point machines in the
              direction of something better?
            </p>

            <p className="text-lg">
              As for the 'destination' problem, we might, by putting ourselves
              in the hands of these moral guides and gatekeepers, be sacrificing
              our own autonomy - an important part of what makes us human.
              Machines who are better than us at sticking to the moral high
              ground may be expected to discourage some of the lapses we
              presently take for granted.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                We might lose our freedom to discriminate in favour of our own
                communities, for example.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    20
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              Loss of freedom to behave badly isn't always a bad thing, of
              course: denying ourselves the freedom to put children to work in
              factories, or to smoke in restaurants are signs of progress. But
              are we ready for ethical silicon police limiting our options?
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                They might be so good at doing it that we won't notice them; but
                few of us are likely to welcome such a future.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    22
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              We have a new powerful technology to deal with - itself,
              literally, a new way of thinking. For our own safety, we need to
              point these new thinkers in the right direction, and get them to
              act well for us.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                It is not yet clear whether this is possible, but if it is, it
                will require a cooperative spirit, and a willingness to set
                aside self-interest.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    23
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              These issues might seem far-fetched, but they are to some extent
              already here.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                AI already has some input into how resources are used in our
                National Health Service (NHS) here in the UK, for example.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    24
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                If it was given a greater role, it might do so much more
                efficiently than humans can manage, and act in the interests of
                taxpayers and those who use the health system. However, we'd be
                depriving some humans (e.g. senior doctors) of the control they
                presently enjoy.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-2">
                    25
                  </span>
                )}
              </span>
              Since we'd want to ensure that people are treated equally and that
              policies are fair, the goals of AI would need to be specified
              correctly.
            </p>

            <p className="text-lg">
              Both general intelligence and moral reasoning are often thought to
              be uniquely human capacities. But safety seems to require that we
              think of them as a package: if we are to give general intelligence
              to machines, we'll need to give them moral authority, too. And
              where exactly would that leave human beings? All the more reason
              to think about the destination now, and to be careful about what
              we wish for.
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
          {/* ================= Questions 14–19 ================= */}
          <h2 className="text-lg font-bold mb-3">Questions 14–19</h2>

          <p className="mb-4">
            Choose the correct letter, <strong>A, B, C or D</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 14,
                q: "What point does the writer make about AI in the first paragraph?",
                options: [
                  "It is difficult to predict how quickly AI will progress.",
                  "Much can be learned about the use of AI in chess machines.",
                  "The future is unlikely to see limitations on the capabilities of AI.",
                  "Experts disagree on which specialised tasks AI will be able to perform.",
                ],
              },
              {
                num: 15,
                q: "What is the writer doing in the second paragraph?",
                options: [
                  "explaining why machines will be able to outperform humans",
                  "describing the characteristics that humans and machines share",
                  "giving information about the development of machine intelligence",
                  "indicating which aspects of humans are the most advanced",
                ],
              },
              {
                num: 16,
                q: "Why does the writer mention the story of King Midas?",
                options: [
                  "to compare different visions of progress",
                  "to illustrate that poorly defined objectives can go wrong",
                  "to emphasise the need for cooperation",
                  "to point out the financial advantages of a course of action",
                ],
              },
              {
                num: 17,
                q: "What challenge does the writer refer to in the fourth paragraph?",
                options: [
                  "encouraging humans to behave in a more principled way",
                  "deciding which values we want AI to share with us",
                  "creating a better world for all creatures on the planet",
                  "ensuring AI is more human-friendly than we are ourselves",
                ],
              },
              {
                num: 18,
                q: "What does the writer suggest about the future of AI in the fifth paragraph?",
                options: [
                  "The safety of machines will become a key issue.",
                  "It is hard to know what impact machines will have on the world.",
                  "Machines will be superior to humans in certain respects.",
                  "Many humans will oppose machines having a wider role.",
                ],
              },
              {
                num: 19,
                q: "Which of the following best summarises the writer's argument in the sixth paragraph?",
                options: [
                  "More intelligent machines will result in greater abuses of power.",
                  "Machine learning will share very few features with human learning.",
                  "There are a limited number of people with the knowledge to program machines.",
                  "Human shortcomings will make creating the machines we need more difficult.",
                ],
              },
            ].map(({ num, q, options }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">{num}</span> {q}
                </p>

                <div className="space-y-2 pl-4">
                  {options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i); // A, B, C, D
                    return (
                      <label
                        key={letter}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${num}`}
                          value={letter}
                          checked={userAnswers[num] === letter}
                          onChange={() => handleInputChange(num, letter)}
                          className=""
                        />
                        <span>
                          <strong>{letter}.</strong> {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 20–23 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">Questions 20–23</h2>

          <p className="mb-4">
            Do the following statements agree with the claims of the writer in
            Reading Passage 2?
            <br />
            Choose <strong>YES</strong>, <strong>NO</strong> or{" "}
            <strong>NOT GIVEN</strong>.
          </p>

          <ul className="space-y-8 text-lg">
            {[
              {
                num: 20,
                text: "Machines with the ability to make moral decisions may prevent us from promoting the interests of our communities.",
              },
              {
                num: 21,
                text: "Silicon police would need to exist in large numbers in order to be effective.",
              },
              {
                num: 22,
                text: "Many people are comfortable with the prospect of their independence being restricted by machines.",
              },
              {
                num: 23,
                text: "If we want to ensure that machines act in our best interests, we all need to work together.",
              },
            ].map(({ num, text }) => (
              <li key={num} className="space-y-3">
                <p>
                  <span className="font-bold">{num}</span> {text}
                </p>

                <div className="flex flex-col">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${num}`}
                        value={opt}
                        checked={userAnswers[num] === opt}
                        onChange={() => handleInputChange(num, opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* ================= Questions 24–26 ================= */}
          <h2 className="text-lg font-bold mt-8 mb-3">Questions 24–26</h2>

          <p className="mb-4">
            Complete the summary using the list of words or phrases below.
            <br />
            Choose the correct letter, <strong>A–F</strong>.
          </p>

          <div className="border p-4 rounded mb-6 max-w-[250px] mx-auto text-lg">
            <p>A. medical practitioners</p>
            <p>B. specialised tasks</p>
            <p>C. available resources</p>
            <p>D. reduced illness</p>
            <p>E. professional authority</p>
            <p>F. technology experts</p>
          </div>

          <div className="space-y-5 text-lg border p-4">
            <h1 className="font-bold text-center text-xl">
              Using AI in the UK health system
            </h1>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold">24</span>
              <span>AI currently has a limited role in the way</span>
              <select
                className="border rounded px-2 py-1 w-15"
                defaultValue=""
                onChange={(e) => handleInputChange(24, e.target.value)}
              >
                <option value="" disabled>
                  {}
                </option>
                {["A", "B", "C", "D", "E", "F"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <span>
                are allocated in the health service. The positive aspect of AI
                having a bigger role is that it would be more efficient and lead
                to patient benefits
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold">25</span>
              <span>
                However, such a change would result, for example, in certain
              </span>
              <select
                className="border rounded px-2 py-1 w-15"
                defaultValue=""
                onChange={(e) => handleInputChange(25, e.target.value)}
              >
                <option value="" disabled></option>
                {["A", "B", "C", "D", "E", "F"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <span>not having their current level of</span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold">26</span>
              <select
                className="border rounded px-2 py-1 w-15"
                defaultValue=""
                onChange={(e) => handleInputChange(26, e.target.value)}
              >
                <option value="" disabled></option>
                <span>not having their current level of</span>
                {["A", "B", "C", "D", "E", "F"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <span>
                {" "}
                It is therefore important that AI goals are appropriate so that
                discriminatory practices could be avoided..
              </span>
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
                            {isCorrect ? (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
                            ) : (
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
        </div>
      </div>
      <Reading2Pagination2023></Reading2Pagination2023>
    </div>
  );
};

export default Reading2Part22023;
