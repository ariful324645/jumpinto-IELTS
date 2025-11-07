import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test2Reading2021 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  const questions = [
    "Most geoglyphs in England are located in a particular area of the country.",
    "There are more geoglyphs in the shape of a horse than any other creature.",
    "A recent dating of the Uffington White Horse indicates that people were mistaken about its age",
    "Historians have come to an agreement about the origins of the Long Man of Wilmington.",
    "Geoglyphs were created by people placing white chalk on the hillside.",
    "Many geoglyphs in England are no longer visible.",
    "The shape of some geoglyphs has been altered over time.",
    "The fame of the Uffington White Horse is due to its size..",

  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);
  };

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
  return (
    <div className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">PASSAGE 1</h1>
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
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          {/* left text */}
          <div>
            {" "}
            <h1 className="text-2xl font-bold text-center mb-5 ">
              The White Horse of Uffington
            </h1>
            <p className="text-lg">
              The cutting of huge figures or 'geoglyphs' into the earth of
              English hillsides has taken place for more than 3,000 years.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                There are 56 hill figures scattered around England, with the
                vast majority on the chalk downlands of the country's southern
                counties.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>{" "}
              The figures include giants, horses, crosses and regimental badges.
              Although the majority of these geoglyphs date within the last 300
              years or so, there are one or two that are much older.
            </p>
            <p className="text-lg mt-4">
              The most famous of these figures is perhaps also the most
              mysterious - the Uffington White Horse in Oxfordshire.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                The White Horse has recently been re-dated and shown to be even
                older than its previously assigned ancient pre-Roman Iron Age*
                date.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>{" "}
              More controversial is the date of the enigmatic Long Man of
              Wilmington in Sussex.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                While many historians are convinced the figure is prehistoric,
                others believe that it was the work of an artistic monk from a
                nearby priory and was created between the 11th and 15th
                centuries.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                The method of cutting these huge figures was simply to remove
                the overlying grass to reveal the gleaming white chalk below.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>{" "}
              However, the grass would soon grow over the geoglyph again unless
              it was regularly cleaned or scoured by a fairly large team of
              people.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                One reason that the vast majority of hill figures have
                disappeared is that when the traditions associated with the
                figures faded, people no longer bothered or remembered to clear
                away the grass to expose the chalk outline.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>{" "}
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                Furthermore, over hundreds of years the outlines would sometimes
                change due to people not always cutting in exactly the same
                place, thus creating a different shape to the original geoglyph.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>{" "}
              The fact that any ancient hill figures survive at all in England
              today is testament to the strength and continuity of local customs
              and beliefs.
            </p>
            <p className="text-lg mt-4">
              The Uffington White Horse is a unique, stylised representation of
              a horse consisting of a long, sleek back, thin disjointed legs, a
              streaming tail, and a bird-like beaked head. The elegant creature
              almost melts into the landscape.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                The horse is situated 2.5 km from Uffington village on a steep
                slope close to the Late Bronze Age* (c. 7th century BCE)
                hillfort of Uffington Castle and below the Ridgeway, a
                long-distance Neolithic* track.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>{" "}
            </p>
            <p className="text-lg mt-4">
              The Uffington Horse is also surrounded by Bronze Age burial
              mounds. It is not far from the Bronze Age cemetery of Lambourn
              Seven Barrows, which consists of more than 30 well-preserved
              burial mounds. The carving has been placed in such a way as to
              make it extremely difficult to see from close quarters, and like
              many geoglyphs is best appreciated from the air. Nevertheless,
              there are certain areas of the Vale of the White Horse from which
              an adequate impression may be gained. Indeed, on a clear day the
              carving can be seen from up to 30 km away.
            </p>
            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                The earliest evidence of a horse at Uffington is from the 1070s
                CE when 'White Horse Hill' is mentioned in documents from the
                nearby Abbey of Abingdon, and the first reference to the horse
                itself is soon after, in 1190 CE.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>{" "}
              However, the carving is believed to date back much further than
              that.
            </p>
            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                However, in 1995 Optically Stimulated Luminescence (OSL) testing
                was carried out by the Oxford Archaeological Unit on soil from
                two of the lower layers of the horse's body, and from another
                cut near the base.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>{" "}
              The result was a date for the horse's construction somewhere
              between 1400 and 600 BCE - in other words, it had a Late Bronze
              Age or Early Iron Age origin.
            </p>
            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                Some researchers see the horse as representing the Celtic* horse
                goddess Epona, who was worshipped as a protector of horses, and
                for her associations with fertility.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>{" "}
              Nevertheless, the horse had great ritual and economic significance
              during the Bronze and Iron Ages.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                It is possible that the carving represents a goddess in native
                mythology, such as Rhiannon, described in later Welsh mythology
                as a beautiful woman dressed in gold and riding a white horse.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
            </p>
            <p className="text-lg mt-4">
              The fact that geoglyphs can disappear easily, along with their
              associated rituals and meaning, indicates that they were never
              intended to be anything more than temporary gestures. But this
              does not lessen their importance. These giant carvings are a
              fascinating glimpse into the minds of their creators and how they
              viewed the landscape in which they lived.
            </p>{" "}
            <br />
            <hr className="border border-gray-400 border-dotted" />
            <p className="text-lg mt-4 ">
              * Iron Age: a period (in Britain 800 BCE - 43 CE) that is
              characterised by the use of iron tools <br /> * Bronze Age: a period (in
              Britain c. 2500 BCE - 800 BCE) that is characterised by the
              development of bronze tools <br /> * Neolithic: a period (in Britain c.
              4000BCE - c. 2500BCE) that is significant for the spread of
              agricultural practices, and the use of stone tools <br /> * Celtic: an
              ancient people who migrated from Europe to Britain before the
              Romans
            </p>
          </div>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
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
                  Clear answer
                </span>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        Are you sure you want to clear all answers?
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                        >
                          No, keep them
                        </button>
                        <button
                          onClick={handleClear}
                          className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          Yes, clear them
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-lg font-bold mb-3">Questions 1-5</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-5 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              The Uffington White Horse
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              The location of the Uffington White Horse:
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className=" text-lg">
                a distance of 2.5 km from Uffington village
              </li>

              <li className="text-lg">
                <span>near an ancient road known as the</span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-100 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span></span>
              </li>
              <li className=" text-lg">
                close to an ancient cemetery that has a number of burial mounds
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Dating the Uffington White Horse:
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>first reference to White Horse Hill appears in</span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-100 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>from the 1070s.</span>
              </li>

              <li className="text-lg">
                <span>according to analysis of the surrounding</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>the Horse is Late Bronze Age / Early Iron Age.</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <h2 className="text-lg font-bold mt-6">
                Possible reasons for creation of the Uffington White Horse:
              </h2>
              <li className="text-lg"> an emblem to indicate land ownership</li>
              <li className="text-lg"> formed part of an ancient ritual</li>
              <li className="text-lg">
                <span>
                  was a representation of goddess Epona - associated with
                  protection of horses and
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>
              <li className="text-lg">
                <span>was a representation of a Welsh goddess called</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 6-14 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 6-14 on your answer sheet, choose
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">TRUE</span> if the statement
            agrees with the information
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">FALSE</span>if the statement
            contradicts the information
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">NOT GIVEN</span> if there is no
            information on this
          </h3>{" "}
          <br /> <br />
          <div className="space-y-6 leading-relaxed p-4">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => handleNumberClick(qIndex)}
                    className={`
                              w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg transition-all duration-300
                              border-2
                              ${
                                activeNumbers[qIndex]
                                  ? "bg-yellow-400 border-yellow-500"
                                  : "bg-white border-gray-300 hover:border-yellow-400"
                              }
                              cursor-pointer
                            `}
                  >
                    {qIndex + 7}
                  </div>
                  <h1 className="text-lg">{q}</h1>
                </div>

                <ul className="list-none ml-12 flex flex-col gap-3">
                  {options.map((option, oIndex) => (
                    <li
                      key={oIndex}
                      onClick={() => handleOptionClick(qIndex, oIndex)}
                      className="flex items-center gap-2 text-lg cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2 inline-block transition-colors duration-300 ${
                          selectedOptions[qIndex] === oIndex
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-700"
                        }`}
                      ></span>
                      <span
                        className={`transition-colors duration-300 ${
                          selectedOptions[qIndex] === oIndex
                            ? "text-blue-500"
                            : "text-black"
                        }`}
                      >
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2Reading2021;
