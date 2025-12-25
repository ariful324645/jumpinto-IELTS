import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import Reading4Pagination2015 from "../Pagination 2015/Reading4Pagination2015";

//  Marks show

const Reading4Part22015 = () => {
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
    27: "B", // plantation
    28: "F", // archaeological discovery
    29: "I", // animals
    30: "G", // burial urn
    31: "D", // bones

    // ================= Questions 32–35 (Multiple choice A–D) =================
    32: "A", // the canoes that have been discovered offer relatively few clues
    33: "A", // They sailed beyond the point where land was visible
    34: "B", // the Lapita's ability to detect signs of land
    35: "C", // It provided a navigational aid for the Lapita

    // ================= Questions 36–40 (YES / NO / NOT GIVEN) =================
    36: "NOT GIVEN", // It is not clear whether the Lapita could sail into a prevailing wind
    37: "YES", // Extreme climate conditions (El Nino) may have influenced migration
    38: "NOT GIVEN", // No information suggests they predicted the duration of El Ninos
    39: "YES", // It remains unclear why they halted their expansion
    40: "NO", // Majority did not settle on Fiji; only some islands were inhabited
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

        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-6 overflow-y-scroll">
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

          <div className="mt-4">
            <h1 className="text-lg">
              {renderText(
                "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below."
              )}
            </h1>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {renderText("Beyond the blue horizon")}
            </h1>
            <p className="text-lg mb-5">
              {renderText(
                "Ancient voyagers who settled the far-flung islands of the Pacific Ocean."
              )}
            </p>

            <p className="font-bold mb-1">{renderText("Image 1")}</p>
            <p className="text-lg mb-5">
              {renderText(
                "An important archaeological discovery on the island of Efate in the Pacific archipelago of Vanuatu has revealed traces of an ancient seafaring people, the distant ancestors of today's Polynesians. The site came to light only by chance. An agricultural worker, digging in the grounds of a derelict plantation, scraped open a grave - the first of dozens in a burial ground some 3,000 years old. It is the oldest cemetery ever found in the Pacific islands, and it harbors the remains of an ancient people archaeologists call the Lapita."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "They were daring blue-water adventurers who used basic canoes to rove across the ocean. But they were not just explorers. They were also pioneers who carried with them everything they would need to build new lives - their livestock, taro seedlings and stone tools. Within the span of several centuries, the Lapita stretched the boundaries of their world from the jungle-clad volcanoes of Papua New Guinea to the loneliest coral outliers of Tonga."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "The Lapita left precious few clues about themselves, but Efate expands the volume of data available to researchers dramatically. The remains of 62 individuals have been uncovered so far, and archaeologists were also thrilled to find six complete Lapita pots. Other items included a Lapita burial urn with modeled birds arranged on the rim as though peering down at the human remains sealed inside. 'It's an important discovery,' says Matthew Spriggs, professor of archaeology at the Australian National University and head of the international team digging up the site, 'for it conclusively identifies the remains as Lapita.'"
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "DNA teased from these human remains may help answer one of the most puzzling questions in Pacific anthropology: did all Pacific islanders spring from one source or many? Was there only one outward migration from a single point in Asia, or several from different points? 'This represents the best opportunity we've had yet,' says Spriggs, 'to find out who the Lapita actually were, where they came from, and who their closest descendants are today'."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "There is one stubborn question for which archaeology has yet to provide any answers: how did the Lapita accomplish the ancient equivalent of a moon landing, many times over? No-one has found one of their canoes or any rigging, which could reveal how the canoes were sailed. Nor do the oral histories and traditions of later Polynesians offer any insights, for they turn into myths long before they reach as far back in time as the Lapita."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "'All we can say for certain is that the Lapita had canoes that were capable of ocean voyages, and they had the ability to sail them,' says Geoff Irwin, a professor of archaeology at the University of Auckland. Those sailing skills, he says, were developed and passed down over thousands of years by earlier mariners who worked their way through the archipelagoes of the western Pacific, making short crossings to nearby islands. The real adventure didn't begin, however, until their Lapita descendants sailed out of sight of land, with empty horizons on every side. This must have been as difficult for them as landing on the moon is for us today. Certainly it distinguished them from their ancestors, but what gave them the courage to launch out on such risky voyages?"
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "The Lapita's thrust into the Pacific was eastward, against the prevailing trade winds, Irwin notes. Those nagging headwinds, he argues, may have been the key to their success. 'They could sail out for days into the unknown and assess the area, secure in the knowledge that if they didn't find anything, they could turn about and catch a swift ride back on the trade winds. This is what would have made the whole thing work.' Once out there, skilled seafarers would have detected abundant leads to follow to land: seabirds, coconuts and twigs carried out to sea by the tides, and the afternoon pile-up of clouds on the horizon which often indicates an island in the distance."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "For returning explorers, successful or not, the geography of their own archipelagoes would have provided a safety net. Without this to go by, overshooting their home ports, getting lost and sailing off into eternity would have been all too easy. Vanuatu, for example, stretches more than 500 miles in a northwest-southeast trend, its scores of intervisible islands forming a backstop for mariners riding the trade winds home."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "All this presupposes one essential detail, says Atholl Anderson, professor of prehistory at the Australian National University: the Lapita had mastered the advanced art of sailing against the wind. 'And there's no proof they could do any such thing,' Anderson says. 'There has been this assumption they did, and people have built canoes to re-create those early voyages based on that assumption. But nobody has any idea what their canoes looked like or how they were rigged.'"
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "Rather than give all the credit to human skill, Anderson invokes the winds of chance. El Nino, the same climate disruption that affects the Pacific today, may have helped scatter the Lapita, Anderson suggests. He points out that climate data obtained from slow-growing corals around the Pacific indicate a series of unusually frequent El Ninos around the time of the Lapita expansion. By reversing the regular east-to-west flow of the trade winds for weeks at a time, these 'super El Ninos' might have taken the Lapita on long unplanned voyages."
              )}
            </p>

            <p className="text-lg mb-5">
              {renderText(
                "However they did it, the Lapita spread themselves a third of the way across the Pacific, then called it quits for reasons known only to them. Ahead lay the vast emptiness of the central Pacific and perhaps they were too thinly stretched to venture farther. They probably never numbered more than a few thousand in total, and in their rapid migration eastward they encountered hundreds of islands - more than 300 in Fiji alone."
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
                "Choose the correct letter, A–J, in boxes 27–31 on your answer sheet."
              )}
            </p>
            <p>
              {renderText(
                "A. proof  B. plantation  C. harbour  D. bones  E. data  F. archaeological discovery  G. burial urn  H. source  I. animals  J. maps"
              )}
            </p>

            <div className="border p-4 mt-4">
              <h3 className="font-bold text-xl text-center mb-4">
                {renderText("The Éfaté burial site")}
              </h3>
              {[
                {
                  q: 27,
                  text: "A 3,000-year-old burial ground of a seafaring people called the Lapita has been found on an abandoned",
                },
                {
                  q: 28,
                  text: "on the Pacific island of Éfaté. The cemetery, which is a significant",
                },
                {
                  q: 29,
                  text: "The Lapita explored and colonised many Pacific islands over several centuries. They took many things with them on their voyages including",
                },
                {
                  q: 30,
                  text: "The burial ground increases the amount of information about the Lapita available to scientists. A team of researchers, led by Matthew Spriggs from the Australian National University, are helping with the excavation of the site. Spriggs believes the",
                },
                {
                  q: 31,
                  text: "which was found at the site is very important since it confirms that the",
                },
              ].map(({ q, text }) => (
                <div key={q} className="flex items-center gap-2 flex-wrap mt-4">
                  <span className="flex-1">{renderText(text)}</span>
                  <div className="relative w-24">
                    <select
                      value={userAnswers[q] || ""}
                      onChange={(e) => handleInputChange(q, e.target.value)}
                      className="appearance-none w-full border-2 border-gray-300 rounded-md px-2 py-2 pr-8"
                    >
                      <option value="">{q}</option>
                      {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                        (opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        )
                      )}
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
                text: "According to the writer, there are difficulties explaining how the Lapita accomplished their journeys because",
                options: [
                  "A. the canoes that have been discovered offer relatively few clues.",
                  "B. archaeologists have shown limited interest in this area of research.",
                  "C. little information relating to this period can be relied upon for accuracy.",
                  "D. technological advances have altered the way such achievements are viewed.",
                ],
              },
              {
                q: 33,
                text: "According to the sixth paragraph, what was extraordinary about the Lapita?",
                options: [
                  "A. They sailed beyond the point where land was visible.",
                  "B. Their cultural heritage discouraged the expression of fear.",
                  "C. They were able to build canoes that withstood ocean voyages.",
                  "D. Their navigational skills were passed on from one generation to the next.",
                ],
              },
              {
                q: 34,
                text: "What does 'This' refer to in the seventh paragraph?",
                options: [
                  "A. the Lapita's seafaring talent",
                  "B. the Lapita's ability to detect signs of land",
                  "C. the Lapita's extensive knowledge of the region",
                  "D. the Lapita's belief they would be able to return home",
                ],
              },
              {
                q: 35,
                text: "According to the eighth paragraph, how was the geography of the region significant?",
                options: [
                  "A. It played an important role in Lapita culture.",
                  "B. It meant there were relatively few storms at sea.",
                  "C. It provided a navigational aid for the Lapita.",
                  "D. It made a large number of islands habitable.",
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
                text: "It is now clear that the Lapita could sail into a prevailing wind.",
              },
              {
                q: 37,
                text: "Extreme climate conditions may have played a role in Lapita migration.",
              },
              {
                q: 38,
                text: "The Lapita learnt to predict the duration of El Ninos.",
              },
              {
                q: 39,
                text: "It remains unclear why the Lapita halted their expansion across the Pacific.",
              },
              {
                q: 40,
                text: "It is likely that the majority of Lapita settled on Fiji.",
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
      <Reading4Pagination2015></Reading4Pagination2015>
    </div>
  );
};

export default Reading4Part22015;
