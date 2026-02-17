import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading3Pagination2024 from "../Pagination 2024/Reading3Pagination2024";

const Reading3Part32024 = () => {
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
    27: "D", // Aspects of the conversation are challenging for both speakers
    28: "A", // the repeated content of lectures
    29: "B", // the book was not seriously intending to predict the future
    30: "B", // the reluctance to share earpieces is understandable

    // ================= Questions 31–34 (Sentence endings A–F) =================
    31: "A", // but there are concerns about this
    32: "D", // despite the noise issues
    33: "F", // and have an awareness of good manners
    34: "B", // as systems do not need to conform to standard practices

    // ================= Questions 35–40 (YES / NO / NOT GIVEN) =================
    35: "YES",
    36: "NOT GIVEN",
    37: "NO",
    38: "YES",
    39: "NOT GIVEN",
    40: "YES",
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
  const updateAnswer = (q, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [q]: value };
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
            <h1 className="text-2xl font-bold text-center">
              {renderText(
                "Is the era of artificial speech translation upon us?",
              )}
            </h1>

            {/* Section A */}
            <p className="text-lg my-5">
              {renderText(
                "Once the stuff of science fiction, technology that enables people to talk using different languages is now here. But how effective is it?",
              )}

              {renderText(
                "Noise, Alex Waibel tells me, is one of the major challenges that artificial speech translation has to meet.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "A device may be able to recognise speech in a laboratory, or a meeting room, but will struggle to cope with the kind of background noise I can hear in my office surrounding Professor Waibel as he speaks to me from Kyoto station in Japan.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("27")}
                  </span>
                )}
              </span>
              {renderText(
                " I'm struggling to follow him in English, on a scratchy line that reminds me we are nearly 10,000 kilometres apart - and that distance is still an obstacle to communication even if you're speaking the same language, as we are. We haven't reached the future yet. If we had, Waibel would have been able to speak more comfortably in his native German and I would have been able to hear his words in English.",
              )}
            </p>

            {/* Section B */}
            <p className="text-lg">
              {renderText(
                "At Karlsruhe Institute of Technology, where he is a professor of computer science, Waibel and his colleagues already give lectures in German that their students can follow in English via an electronic translator. The system generates text that students can read on their laptops or phones, so the process is somewhat similar to subtitling. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It helps that lecturers speak clearly, don't have to compete with background chatter, and say much  the same thing each year.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("28")}
                  </span>
                )}
              </span>

              {renderText(
                "The idea of artificial speech translation has been around for a long time. Douglas Adams' science fiction novel, 'The Hitchhiker's Guide to the Galaxy', published in 1979, featured a life form called the 'Babel fish' which, when placed in the ear, enabled a listener to understand any language in the universe. It came to represent one of those devices that technology enthusiasts dream of long before they become practically realisable, like TVs flat enough to hang on walls: objects that we once could only dream of having but that are now commonplace. Now devices that look like prototype Babel fish have started to appear, riding a wave of advances in artificial translation and voice recognition.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "It came to represent one of those devices that technology enthusiasts dream of long before they become practically realisable, like TVs flat enough to hang on walls: objects that we once could only dream of having but that are now commonplace",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("29")}
                  </span>
                )}
              </span>
            </p>

            {/* Section C */}
            <p className="text-lg">
              {renderText(
                "At this stage, however, they seem to be regarded as eye-catching novelties rather than steps towards what Waibel calls 'making a language-transparent society'. They tend to be domestic devices or applications suitable for hotel check-ins, for example, providing a practical alternative to speaking traveller's English. The efficiency of the translator is less important than the social function.",
              )}
              className=
              {`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              {renderText(
                "However, 'Professionals are less inclined to be patient in a conversation,' founder and CEO at Waverly Labs, Andrew Ochoa, observes. To redress this, Waverly is now preparing a new model for professional applications, which entails performance improvements in speech recognition, translation accuracy and the time it takes to deliver the translated speech.",
              )}
            </p>

            {/* Section D */}
            <p className="text-lg">
              {renderText(
                "For a conversation, both speakers need to have devices called Pilots (translator earpieces) in their ears. 'We find that there's a barrier with sharing one of the earphones with a stranger,' says Ochoa.  The problem would be solved if earpiece translators became sufficiently prevalent that strangers would be likely to already have their own in their ears. Whether that happens, and how quickly, will probably depend not so much on the earpieces themselves, but on the prevalence of voice-controlled devices and artificial translation in general.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText("That can't have been totally unexpected.")}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("30")}
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  " Waibel highlights the significance of certain Asian nations, noting that voice translation has really taken off in countries such as Japan with a range of systems",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("31")}
                  </span>
                )}
              </span>
              {renderText(
                " There is still a long way to go, though.  It needs to work offline, for situations where internet access isn't possible, and to address apprehensions about the amount of private speech data accumulating in the cloud, having been sent to servers for processing.",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "A translation system needs to be simultaneous, like the translator's voice speaking over the foreign politician being interviewed on the TV, rather than in sections that oblige speakers to pause after every few remarks and wait for the translation to be delivered.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("32")}
                  </span>
                )}
              </span>
              {renderText(
                "It needs to work offline, for situations where internet access isn't possible, and to address apprehensions about the amount of private speech data accumulating in the cloud, having been sent to servers for processing.",
              )}
            </p>

            {/* Section E */}
            <p className="text-lg">
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Systems not only need to cope with physical challenges such as noise, they will also need to be socially aware by addressing people in the right way.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("33")}
                  </span>
                )}
              </span>
              {renderText(
                "Some cultural traditions demand solemn respect for academic status, for example, and it is only polite to respect this. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Etiquette-sensitive artificial translators could relieve people of the need to know these differing cultural norms. At the same time, they might help to preserve local customs, slowing the spread of habits associated with international English, such as its readiness to get on first-name terms.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("34")}
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg">
              {" "}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Professors and other professionals will not outsource language awareness to software, though.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("35")}
                  </span>
                )}
              </span>
              {renderText(
                " If the technology matures into seamless, ubiquitous artificial speech translation, it will actually add value to language skills. ",
              )}
              <span
                className={`ml-2 ${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {renderText(
                  "Whether it will help people conduct their family lives or relationships is open to question - though one noteworthy possibility is that it could overcome the language barriers that often arise between generations after migration, leaving children and their grandparents without a shared language.",
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    {renderText("36")},{renderText("37")}
                  </span>
                )}
              </span>
            </p>

            {/* Section F */}
            <p className="text-lg">
              {renderText(
                "Whatever uses it is put to, though, it will never be as good as the real thing. Even if voice-morphing technology simulates the speaker's voice, their lip movements won't match, and they will look like they are in a dubbed movie. The contrast will underline the value of shared languages, and the value of learning them. Sharing a language can promote a sense of belonging and community, as with the international scientists who use English as a lingua franca, where their predecessors used Latin. Though the practical need for a common language will diminish, the social value of sharing one will persist. And software will never be a substitute for the subtle but vital understanding that comes with knowledge of a language.",
              )}
              {highlight && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  {renderText("40")}
                </span>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-6 overflow-y-scroll ">
          {/* ================= Questions 27–30 ================= */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 27–30")}
          </h2>

          <p className="mb-4">
            {renderText("Choose the correct letter, A, B, C or D.")}
          </p>

          <div className="space-y-6">
            {[
              {
                q: 27,
                text: "What does the reader learn about the conversation in the first paragraph?",
                options: [
                  "The speakers are communicating in different languages.",
                  "Neither of the speakers is familiar with their environment.",
                  "The topic of the conversation is difficult for both speakers.",
                  "Aspects of the conversation are challenging for both speakers.",
                ],
              },
              {
                q: 28,
                text: "What assists the electronic translator during lectures at Karlsruhe Institute of Technology?",
                options: [
                  "the repeated content of lectures",
                  "the students' reading skills",
                  "the languages used",
                  "the lecturers' technical ability",
                ],
              },
              {
                q: 29,
                text: "When referring to The Hitchhiker's Guide to the Galaxy, the writer suggests that",
                options: [
                  "the Babel fish was considered undesirable at the time.",
                  "this book was not seriously intending to predict the future.",
                  "artificial speech translation was not a surprising development.",
                  "some speech translation techniques are better than others.",
                ],
              },
              {
                q: 30,
                text: "What does the writer say about sharing earpieces?",
                options: [
                  "It is something people will get used to doing.",
                  "The reluctance to do this is understandable.",
                  "The equipment will be unnecessary in the future.",
                  "It is something few people need to worry about.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="space-y-2 text-lg">
                <p className="font-bold">
                  {renderText(q.toString())} {renderText(text)}
                </p>

                {options.map((opt, i) => {
                  const letter = ["A", "B", "C", "D"][i];
                  return (
                    <label
                      key={letter}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q-${q}`}
                        value={letter}
                        checked={userAnswers[q] === letter}
                        onChange={() =>
                          setUserAnswers((prev) => {
                            const updated = { ...prev, [q]: letter };
                            calculateScore(updated);
                            return updated;
                          })
                        }
                      />
                      <span>{renderText(`${letter}. ${opt}`)}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ================= Questions 31–34 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 31–34")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Complete each sentence with the correct ending, A–F, below.",
            )}
          </p>
          <p className="mb-4">
            {renderText(
              "Choose the correct letter, A-F, next to Questions 31-34.",
            )}
          </p>

          <div className="border p-4 rounded mb-6 max-w-[450px] mx-auto text-lg">
            {[
              "A. but there are concerns about this.",
              "B. as systems do not need to conform to standard practices.",
              "C. but they are far from perfect.",
              "D. despite the noise issues.",
              "E. because translation is immediate.",
              "F. and have an awareness of good manners.",
            ].map((line) => (
              <p key={line}>{renderText(line)}</p>
            ))}
          </div>

          <div className="space-y-4">
            {[
              "Speech translation methods are developing fast in Japan",
              "TV interviews that use translation voiceover methods are successful",
              "Future translation systems should address people appropriately",
              "Users may be able to maintain their local customs",
            ].map((sentence, i) => {
              const q = 31 + i;
              return (
                <div key={q} className="flex items-center gap-3 text-lg">
                  <span className="font-bold w-6">
                    {renderText(q.toString())}
                  </span>

                  <span>{renderText(sentence)}</span>

                  <select
                    className="border-2 border-gray-300 rounded-md px-2 py-1"
                    value={userAnswers[q] || ""}
                    onChange={(e) =>
                      setUserAnswers((prev) => {
                        const updated = { ...prev, [q]: e.target.value };
                        calculateScore(updated);
                        return updated;
                      })
                    }
                  >
                    <option value="">{q}</option>
                    {["A", "B", "C", "D", "E", "F"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          {/* ================= Questions 35–40 ================= */}
          <h2 className="text-lg font-bold mt-10 mb-3">
            {renderText("Questions 35–40")}
          </h2>

          <p className="mb-4">
            {renderText(
              "Do the following statements agree with the claims of the writer?",
            )}
          </p>

          <div className="space-y-6">
            {[
              "Language translation systems will be seen as very useful throughout the academic and professional worlds.",
              "The overall value of automated translation to family life is yet to be shown.",
              "Automated translation could make life more difficult for immigrant families.",
              "Visual aspects of language translation are being considered by scientists.",
              "International scientists have found English easier to translate into other languages than Latin.",
              "As far as language is concerned, there is a difference between people's social and practical needs.",
            ].map((text, i) => {
              const q = 35 + i;
              return (
                <div key={q} className="space-y-2 text-lg">
                  <p className="font-bold">
                    {renderText(q.toString())} {renderText(text)}
                  </p>

                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${q}`}
                        value={opt}
                        checked={userAnswers[q] === opt}
                        onChange={() =>
                          setUserAnswers((prev) => {
                            const updated = { ...prev, [q]: opt };
                            calculateScore(updated);
                            return updated;
                          })
                        }
                      />
                      <span>{renderText(opt)}</span>
                    </label>
                  ))}
                </div>
              );
            })}
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
      <Reading3Pagination2024></Reading3Pagination2024>
    </div>
  );
};

export default Reading3Part32024;
