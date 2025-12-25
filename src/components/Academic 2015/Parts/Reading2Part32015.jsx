import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading2Pagination2015 from "../Pagination 2015/Reading2Pagination2015";

//  Marks show

const Reading2Part32015 = () => {
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
    "Both businesses and people aim at order without really considering its value.",
    "Innovation is most successful if the people involved have distinct roles.",
    "Google was inspired to adopt flexibility by the success of General Electric.",
  ];

  const options = ["YES", "NO", "NOT GIVEN"];

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [selectedOptions2, setSelectedOptions2] = useState(
    Array(questions.length).fill(null)
  );
  const handleOptionClick = (qIndex, option) => {
    const updatedOptions = [...selectedOptions]; // ✅ use selectedOptions
    updatedOptions[qIndex] = option;
    setSelectedOptions(updatedOptions);

    setUserAnswers((prev) => {
      const answerKey = qIndex + 38;
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

  const correctAnswers = {
    // ================= Questions 27–31 (Summary completion) =================
    27: "B", // mass production
    28: "J", // readers
    29: "L", // assistants
    30: "E", // paints
    31: "D", // public

    // ================= Questions 32–35 (Multiple choice A–D) =================
    32: "C", // the negative effect a museum can have on visitors' opinions of themselves
    33: "D", // they feel their personal reaction is of no significance
    34: "A", // the variety of works on display and the way they are arranged
    35: "D", // have a specific beginning or end

    // ================= Questions 36–40 (YES / NO / NOT GIVEN) =================
    36: "NOT GIVEN", // Art history should focus on discovering the meaning of art using a range of media
    37: "YES", // The approach of art historians conflicts with that of art museums
    38: "YES", // People should be encouraged to give their opinions openly on works of art
    39: "NOT GIVEN", // Reproductions of fine art should only be sold to the public if they are of high quality
    40: "NOT GIVEN", // In the future, those with power are likely to encourage more people to enjoy art
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

          <div>
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below."
              )}
            </h1>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              {renderText("Museums of fine art and their public")}
            </h1>
            <div>
              <img src="" alt="" />
            </div>

            <p className="text-lg mb-5">
              {renderText(
                "The fact that people go to the Louvre museum in Paris to see the original painting Mona Lisa when they can see a reproduction anywhere leads us to question some assumptions about the role of museums of fine art in today's world."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "One of the most famous works of art in the world is Leonardo da Vinci's Mona Lisa. Nearly everyone who goes to see the original will already be familiar with it from reproductions, but they accept that fine art is more rewardingly viewed in its original form."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "However, if Mona Lisa was a famous novel, few people would bother to go to a museum to read the writer's actual manuscript rather than a printed reproduction. This might be explained by the fact that the novel has evolved precisely because of technological developments that made it possible to print out huge numbers of texts, whereas oil paintings have always been produced as unique objects. In addition, it could be argued that the practice of interpreting or 'reading' each medium follows different conventions. With novels, the reader attends mainly to the meaning of words rather than the way they are printed on the page, whereas the 'reader' of a painting must attend just as closely to the material form of marks and shapes in the picture as to any ideas they may signify."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Yet it has always been possible to make very accurate facsimiles of pretty well any fine art work. The seven surviving versions of Mona Lisa bear witness to the fact that in the 16th century, artists seemed perfectly content to assign the reproduction of their creations to their workshop apprentices as regular 'bread and butter' work. And today the task of reproducing pictures is incomparably more simple and reliable, with reprographic techniques that allow the production of high-quality prints made exactly to the original scale, with faithful colour values, and even with duplication of the surface relief of the painting."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "But despite an implicit recognition that the spread of good reproductions can be culturally valuable, museums continue to promote the special status of original work."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Unfortunately, this seems to place severe limitations on the kind of experience offered to visitors."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "One limitation is related to the way the museum presents its exhibits. As repositories of unique historical objects, art museums are often called 'treasure houses'. We are reminded of this even before we view a collection by the presence of security guards, attendants, ropes and display cases to keep us away from the exhibits. In many cases, the architectural style of the building further reinforces that notion. In addition, a major collection like that of London's National Gallery is housed in numerous rooms, each with dozens of works, any one of which is likely to be worth more than all the average visitor possesses. In a society that judges the personal status of the individual so much by their material worth, it is therefore difficult not to be impressed by one's own relative 'worthlessness' in such an environment."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Furthermore, consideration of the 'value' of the original work in its treasure house setting impresses upon the viewer that, since these works were originally produced, they have been assigned a huge monetary value by some person or institution more powerful than themselves. Evidently, nothing the viewer thinks about the work is going to alter that value, and so today's viewer is deterred from trying to extend that spontaneous, immediate, self-reliant kind of reading which would originally have met the work."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "The visitor may then be struck by the strangeness of seeing such diverse paintings, drawings and sculptures brought together in an environment for which they were not originally created. This 'displacement effect' is further heightened by the sheer volume of exhibits. In the case of a major collection, there are probably more works on display than we could realistically view in weeks or even months."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "This is particularly distressing because time seems to be a vital factor in the appreciation of all art forms. A fundamental difference between paintings and other art forms is that there is no prescribed time over which a painting is viewed. By contrast, the audience encounters an opera or a play over a specific time, which is the duration of the performance. Similarly, novels and poems are read in a prescribed temporal sequence, whereas a picture has no clear place at which to start viewing, or at which to finish. Thus art works themselves encourage us to view them superficially, without appreciating the richness of detail and labour that is involved."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Consequently, the dominant critical approach becomes that of the art historian, a specialised academic approach devoted to 'discovering the meaning' of art within the cultural context of its time. This is in perfect harmony with the museum's function, since the approach is dedicated to seeking out and conserving 'authentic', 'original' readings of the exhibits. Again, this seems to put paid to that spontaneous, participatory criticism which can be found in abundance in criticism of classic works of literature, but is absent from most art history."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "The displays of art museums serve as a warning of what critical practices can emerge when spontaneous criticism is suppressed. The museum public, like any other audience, experience art more rewardingly when given the confidence to express their views. If appropriate works of fine art could be rendered permanently accessible to the public by means of high-fidelity reproductions, as literature and music already are, the public may feel somewhat less in awe of them. Unfortunately, that may be too much to ask from those who seek to maintain and control the art establishment."
              )}
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
          <div className="space-y-6 leading-relaxed">
            {/* ================= Questions 27–31 ================= */}
            <h2 className="text-lg font-bold">
              {renderText("Questions 27–31")}
            </h2>
            <p>
              {renderText(
                "Complete the summary using the list of words or phrases below."
              )}
            </p>
            <p>
              {renderText(
                "Choose the correct letter, A–L, in boxes 27–31 on your answer sheet."
              )}
            </p>

            <div className="border border-black p-5 max-w-sm text-center mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                {renderText("List of Words/Phrases")}
              </h3>
              <ul className="space-y-1 text-lg text-left">
                {[
                  "A. institution",
                  "B. mass production",
                  "C. mechanical processes",
                  "D. public",
                  "E. paints",
                  "F. artist",
                  "G. size",
                  "H. underlying ideas",
                  "I. basic technology",
                  "J. readers",
                  "K. picture frames",
                  "L. assistants",
                ].map((item) => (
                  <li key={item}>{renderText(item)}</li>
                ))}
              </ul>
            </div>

            <div className="border p-4">
              <h1 className="font-bold text-2xl text-center">
                The value attached to original works of art
              </h1>
              {[
                {
                  q: 27,
                  text: "People go to art museums because they accept the value of seeing an original work of art. But they do not go to museums to read original manuscripts of novels, perhaps because the availability of novels has depended on ___ for so long.",
                },
                {
                  q: 28,
                  text: "and also because with novels, the ___ are the most important thing.",
                },
                {
                  q: 29,
                  text: "However, in historical times artists such as Leonardo were happy to instruct ___ to produce copies of their work.",
                },
                {
                  q: 30,
                  text: "and these days new methods of reproduction allow excellent replication of surface relief features as well as colour and ___ .",
                },
                {
                  q: 31,
                  text: "It is regrettable that museums still promote the superiority of original works of art, since this may not be in the interests of the ___ .",
                },
              ].map(({ q, text }) => (
                <div key={q} className="flex items-center gap-2 flex-wrap mt-4">
                  <span className="font-bold text-lg">
                    {/* {renderText(`${q}.`)} */}
                  </span>
                  <span className="flex-1">{renderText(text)}</span>
                  <div className="relative w-24">
                    <select
                      value={userAnswers[q] || ""}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-2 py-2 pr-8"
                    >
                      <option value="">{q}</option>
                      {[
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F",
                        "G",
                        "H",
                        "I",
                        "J",
                        "K",
                        "L",
                      ].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaChevronDown />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= Questions 32–35 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 32–35")}
            </h2>
            <p>{renderText("Choose the correct letter, A, B, C or D.")}</p>

            {[
              {
                q: 32,
                text: "The writer mentions London's National Gallery to illustrate",
                options: [
                  "A. the undesirable cost to a nation of maintaining a huge collection of art.",
                  "B. the conflict that may arise in society between financial and artistic values.",
                  "C. the negative effect a museum can have on visitors' opinions of themselves.",
                  "D. the need to put individual well-being above large-scale artistic schemes.",
                ],
              },
              {
                q: 33,
                text: "The writer says that today, viewers may be unwilling to criticise a work because",
                options: [
                  "A. they lack the knowledge needed to support an opinion.",
                  "B. they fear it may have financial implications.",
                  "C. they have no real concept of the work's value.",
                  "D. they feel their personal reaction is of no significance.",
                ],
              },
              {
                q: 34,
                text: "According to the writer, the 'displacement effect' on the visitor is caused by",
                options: [
                  "A. the variety of works on display and the way they are arranged.",
                  "B. the impossibility of viewing particular works of art over a long period.",
                  "C. the similar nature of the paintings and the lack of great works.",
                  "D. the inappropriate nature of the individual works selected for exhibition.",
                ],
              },
              {
                q: 35,
                text: "The writer says that unlike other forms of art, a painting does not",
                options: [
                  "A. involve direct contact with an audience.",
                  "B. require a specific location for a performance.",
                  "C. need the involvement of other professionals.",
                  "D. have a specific beginning or end.",
                ],
              },
            ].map(({ q, text, options }) => (
              <div key={q} className="flex flex-col gap-2 mt-4">
                <p className="font-medium">
                  {q}. {renderText(text)}
                </p>
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${q}`}
                      value={opt[0]}
                      checked={userAnswers[q] === opt[0]}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="radio radio-accent"
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            ))}

            {/* ================= Questions 36–40 ================= */}
            <h2 className="text-lg font-bold mt-10">
              {renderText("Questions 36–40")}
            </h2>
            <p>
              {renderText(
                "Do the following statements agree with the claims of the writer in Reading Passage 3?"
              )}
            </p>
            <p>{renderText("In boxes 36–40 on your answer sheet, choose")}</p>
            <ul className="list-disc ml-5">
              <li>
                {renderText(
                  "YES if the statement agrees with the claims of the writer"
                )}
              </li>
              <li>
                {renderText(
                  "NO if the statement contradicts the claims of the writer"
                )}
              </li>
              <li>
                {renderText(
                  "NOT GIVEN if it is impossible to say what the writer thinks about this"
                )}
              </li>
            </ul>

            {[
              {
                q: 36,
                text: "Art history should focus on discovering the meaning of art using a range of media.",
              },
              {
                q: 37,
                text: "The approach of art historians conflicts with that of art museums.",
              },
              {
                q: 38,
                text: "People should be encouraged to give their opinions openly on works of art.",
              },
              {
                q: 39,
                text: "Reproductions of fine art should only be sold to the public if they are of high quality.",
              },
              {
                q: 40,
                text: "In the future, those with power are likely to encourage more people to enjoy art.",
              },
            ].map(({ q, text }) => (
              <div key={q} className="flex flex-col gap-2 mt-4">
                <p className="font-medium">
                  {q}. {renderText(text)}
                </p>
                {["YES", "NO", "NOT GIVEN"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${q}`}
                      value={opt}
                      checked={userAnswers[q] === opt}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="radio radio-accent"
                    />
                    <span>{renderText(opt)}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Reading2Pagination2015></Reading2Pagination2015>
    </div>
  );
};

export default Reading2Part32015;
