import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading4Pagination2019 from "../Pagination/Reading4Pagination2019";

//  Marks show

const Reading4Part22019 = () => {
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
    "An animal is likely to live longer in a zoo than in the wild..",
    "There are some species in zoos which can no longer be found in the wild.",
    "Improvements in the quality of TV wildlife documentaries have resulted in increased numbers of zoo visitors.",
    "Zoos have always excelled at transmitting information about animals to the public.",
    "Studying animals in zoos is less stressful for the animals than studying them in the wild.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  // different option
  const question2 = [
    "Which of the following is stated about zoo staff in the text? Choose ONE letter.",
    "Which of the following is stated about zoo staff in the text? Choose ONE letter.",
    "Which of these beliefs about zoos does the writer mention? Choose ONE letter.",
    "Which of these beliefs about zoos does the writer mention? Choose ONE letter.",
  ];

  const options2 = [
    [
      "A. Some take part in television documentaries about animals. ",
      "B. Some travel to overseas locations to join teams in zoos.",
      "C. Some get experience with species in the wild before taking up zoo jobs.",
    ],
    [
      "A. Some teach people who are involved with conservation projects.",
      "B. Some specialise in caring for species which are under threat. ",
      "C. Some get experience with species in the wild before taking up zoo jobs.",
    ],
    [
      "A. They can help children overcome their fears of wild animals.",
      "B. They can increase public awareness of environmental issues. ",
      "C. They can provide employment for a range of professional people.",
    ],
    [
      "A. They can generate income to support wildlife conservation projects. ",
      "B. They can raise animals which can later be released into the wild.",
      "C. They can help children overcome their fears of wild animals.",
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
      const answerKey = qIndex + 18;
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
      const answerKey = qIndex + 23;
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
  // Questions 14-17 (matching A-F)
  14: "B", // a reference to how quickly animal species can die out
  15: "E", // reasons why it is preferable to study animals in captivity rather than in the wild
  16: "C", // mention of two ways of learning about animals other than visiting them in zoos
  17: "A", // reasons why animals in zoos may be healthier than those in the wild

  // Questions 18-22 (YES/NO/NOT GIVEN)
  18: "YES", // An animal is likely to live longer in a zoo than in the wild
  19: "YES", // There are some species in zoos which can no longer be found in the wild
  20: "NOT GIVEN", // Improvements in the quality of TV wildlife documentaries have resulted in increased numbers of zoo visitors
  21: "NO", // Zoos have always excelled at transmitting information about animals to the public
  22: "YES", // Studying animals in zoos is less stressful for the animals than studying them in the wild

  // Questions 23-26 (choose ONE letter A/B/C)
  23: "A. Some take part in television documentaries about animals.", // Some take part in television documentaries about animals
  24: "B. Some specialise in caring for species which are under threat.", // Some specialise in caring for species which are under threat
  25: "B. They can increase public awareness of environmental issues.", // They can increase public awareness of environmental issues
  26: "A. They can generate income to support wildlife conservation projects.", // They can generate income to support wildlife conservation projects
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
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 3")}</h1>
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
                {renderText("          Questions 27-40")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Why zoos are good")}
            </h1>

            <p className="text-lg font-bold italic text-center">
              {renderText("Scientist David Hone makes the case for zoos")}
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3">{renderText("A")}</h1>
              {renderText(
                "In my view, it is perfectly possible for many species of animals living in zoos or wildlife parks to have a quality of life as high as, or higher than, in the wild. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Animals in good zoos get a varied and high-quality diet with all the supplements required, and any illnesses they might have will be treated."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("17")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                " Their movement might be somewhat restricted, but they have a safe environment in which to live, and they are spared bullying and social ostracism by others of their kind. They do not suffer from the threat or stress of predators, or the irritation and pain of parasites or injuries. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "The average captive animal will have a greater life expectancy compared with its wild counterpart, and will not die of drought, of starvation or in the jaws of a predator"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("18")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                " A lot of very nasty things happen to truly 'wild' animals that simply don't happen in good zoos, and to view a life that is 'free' as one that is automatically 'good' is, I think, an error. Furthermore, zoos serve several key purposes."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">B</h1>
              {renderText(
                "Firstly, zoos aid conservation. Colossal numbers of species are becoming extinct across the world, and many more are increasingly threatened and therefore risk extinction.A species protected in captivity can be bred up to provide a reservoir population against a population crash or extinction in the wild. ."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " Moreover, some of these collapses have been sudden, dramatic and unexpected, or were simply discovered very late in the day. "
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("14")}
                  </span>
                )}{" "}
              </span>{" "}
              {renderText(
                "Firstly, zoos aid conservation. Colossal numbers of species are becoming extinct across the world, and many more are increasingly threatened and therefore risk extinction."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "A good number of species only exist in captivity, with many of these living in zoos"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("19")}
                  </span>
                )}{" "}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Still more only exist in the wild because they have been reintroduced from zoos, or have wild populations that have been boosted by captive bred animals."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("26")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                "  Without these efforts there would be fewer species alive today. Although reintroduction successes are few and far between, the numbers are increasing, and the very fact that species have been saved or reintroduced as a result of captive breeding proves the value of such initiatives."
              )}
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3">C</h1>
              {renderText(
                "Zoos also provide education. Many children and adults, especially those in cities, will never see a wild animal beyond a fox or pigeon. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "While it is true that television documentaries are becoming ever more detailed and impressive, and many natural history specimens are on display in museums, there really is nothing to compare with seeing a living creature in the flesh, hearing it, smelling it, watching what it does and having the time to absorb details.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("16")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                " That alone will bring a greater understanding and perspective to many, and hopefully give them a greater appreciation for wildlife, conservation efforts and how they can contribute."
              )}
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">D</h1>
              {renderText(
                "In addition to this, there is also the education that can take place in zoos through signs, talks and presentations which directly communicate information to visitors about the animals they are seeing and their place in the world. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "This was an area where zoos used to be lacking, but they are now increasingly sophisticated in their communication and outreach work.."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("21")}
                  </span>
                )}{" "}
              </span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Many zoos also work directly to educate conservation workers in other countries, or send their animal keepers abroad to contribute their knowledge and skills to those working in zoos and reserves, thereby helping to improve conditions and reintroductions all over the world."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("23,24")}
                  </span>
                )}{" "}
              </span>
            </p>

            <br />

            <p className="text-lg">
              <h1 className="text-xl font-bold mb-3">E</h1>
              {renderText(
                "Zoos also play a key role in research. If we are to save wild species and restore and repair ecosystems we need to know about how key species live, act and react. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Being able to undertake research on animals in zoos where there is less risk and fewer variables means real changes can be effected on wild populations."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("15")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                " Finding out about, for example, the oestrus cycle of an animal or its breeding rate helps us manage wild populations. Procedures such as capturing and moving at-risk or dangerous individuals are bolstered by knowledge gained in zoos about doses for anaesthetics, and by experience in handling and transporting animals. This can make a real difference to conservation efforts and to the reduction of human-animal conflicts, and can provide a knowledge base for helping with the increasing threats of habitat destruction and other problems."
              )}
            </p>

            <br />

            <p className="text-lg">
              {" "}
              <h1 className="text-xl font-bold mb-3">F</h1>
              {renderText(
                "In conclusion, considering the many ongoing global threats to the environment, it is hard for me to see zoos as anything other than essential to the long-term survival of numerous species. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "They are vital not just in terms of protecting animals, but as a means of learning about them to aid those still in the wild, as well as educating and informing the general population about these animals and their world so that they can assist or at least accept the need to be more environmentally conscious."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("25")}
                  </span>
                )}{" "}
              </span>
              {renderText(
                " Without them, the world would be, and would increasingly become, a much poorer place."
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
            {/* optional question */}
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 14-17")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions  14-17) and the list of people below."
                )}
              </p>

              <p>
                {renderText("Match each statement with the correct person,")}
                <span className="font-bold text-lg">{renderText(" A-F")}</span>.
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-F , in boxes 14-17 on your answer sheet."
                )}
              </p>

              <p>{renderText("NB You may use any letter more than once.")}</p>

              {/* ---------- Question 14 ---------- */}
              {/* Question 14 */}
              <div className="space-y-3">
                {" "}
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("14.")}</span>
                  <span>
                    {renderText(
                      "a reference to how quickly animal species can die out"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[14] || ""}
                      onChange={(e) => handleInputChange(14, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("14")}</option>
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
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("15.")}</span>
                  <span>
                    {renderText(
                      "reasons why it is preferable to study animals in captivity rather than in the wild"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[15] || ""}
                      onChange={(e) => handleInputChange(15, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("15")}</option>
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
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("16.")}</span>
                  <span>
                    {renderText(
                      "mention of two ways of learning about animals other than visiting them in zoos"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[16] || ""}
                      onChange={(e) => handleInputChange(16, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("16")}</option>
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
                <p className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{renderText("17.")}</span>
                  <span>
                    {renderText(
                      "reasons why animals in zoos may be healthier than those in the wild"
                    )}
                  </span>

                  <div className="relative w-40">
                    <select
                      value={userAnswers[17] || ""}
                      onChange={(e) => handleInputChange(17, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                    >
                      <option value="">{renderText("17")}</option>
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
              </div>
            </div>
            {/* 2nd step */}
            <div>
              <h2 className="text-lg font-bold mb-3">
                {renderText("Questions 18-22")}
              </h2>
              <br />
              <h3 className="text-lg font-semibold mb-5">
                {renderText(
                  "Do the following statements agree with the information given in Reading Passage 1?"
                )}{" "}
                <br /> <br />
                {renderText("In boxes 18-22 on your answer sheet, choose")}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("YES")}</span>{" "}
                {renderText(
                  "if the statement agrees with the claims of the writer"
                )}
              </h3>
              <h3 className="flex gap-5 text-lg">
                <span className="text-lg font-bold">{renderText("NO")}</span>{" "}
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
                <h2 className="text-lg font-bold">Questions 18-22</h2>
                {questions.map((q, qIndex) => {
                  const answerKey = qIndex + 18;
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
            {/* question dynamic */}
            <div className="space-y-6 leading-relaxed p-4">
              <h2 className="text-lg font-bold">
                {renderText("Questions 23-26")}
              </h2>
              <p className="text-xl">
                {renderText("Choose the correct letter,")}
                <span className="font-bold">{renderText(" A, B or C ")}</span>
              </p>

              {question2.map((q, qIndex) => {
                const answerKey = qIndex + 23;

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
      <Reading4Pagination2019></Reading4Pagination2019>
    </div>
  );
};

export default Reading4Part22019;
