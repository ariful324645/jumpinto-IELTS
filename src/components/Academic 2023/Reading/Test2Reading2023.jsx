import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test2Reading2023 = () => {
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
    "During the third phase of construction, sandstone slabs were placed in both the outer areas and the middle of the Stonehenge site.",
    "There is scientific proof that the bluestones stood in the same spot until approximately 1600 BCE.",
    "John Aubrey's claim about Stonehenge was supported by 20th-century findings.",
    "Objects discovered at Stonehenge seem to indicate that it was constructed by a number of different groups of people.",
    "Criticism of Gerald Hawkins' theory about Stonehenge has come mainly from other astronomers.",
  
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

          <div className="">
            <h1 className="text-lg">
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-2xl font-bold text-center">Stonehenge</h1>
          <p className="text-lg">
            For centuries, historians and archaeologists have puzzled over the
            many mysteries of Stonehenge, a prehistoric monument that took an
            estimated 1,500 years to erect.Located on Salisbury Plain in
            southern England, it is comprised of roughly 100 massive upright
            stones placed in a circular layout.
          </p>
          <p className="text-lg">
            Archaeologists believe England's most iconic prehistoric ruin was
            built in several stages, with the earliest constructed 5,000 or more
            years ago.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                First, Neolithic* Britons used primitive tools, which may have
                been fashioned out of deer antlers, to dig a massive circular
                ditch and bank, or henge.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  1
                </span>
                Deep pits dating back to that era and located within the circle
                may have once held a ring of timber posts, according to some
                scholars.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  2
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            Several hundred years later, it is thought, Stonehenge's builders
            hoisted an estimated 80 bluestones, 43 of which remain today, into
            standing positions and placed them in either a horseshoe or circular
            formation.These stones have been traced all the way to the Preseli
            Hills in Wales, some 300 kilometres from Stonehenge.How, then, did
            prehistoric builders without sophisticated tools or engineering haul
            these boulders, which weigh up to four tons, over such a great
            distance?
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                According to one long-standing theory among archaeologists,
                Stonehenge's builders fashioned sledges and rollers out of tree
                trunks to lug the bluestones from the Preseli Hills.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  3
                </span>
              </span>
            )}
            They then transferred the boulders onto rafts and floated them first
            along the Welsh coast and then up the River Avon toward Salisbury
            Plain; alternatively, they may have towed each stone with a fleet of
            vessels.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                More recent archaeological hypotheses have them transporting the
                bluestones with supersized wicker baskets on a combination of
                ball bearings and long grooved planks, hauled by oxen.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  4
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            As early as the 1970s, geologists have been adding their voices to
            the debate over how Stonehenge came into being.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Challenging the classic image of industrious builders pushing,
                carting, rolling or hauling giant stones from faraway Wales,
                some scientists have suggested that it was glaciers, not humans,
                that carried the bluestones to Salisbury Plain.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  5
                </span>
              </span>
            )}
            Most archaeologists have remained sceptical about this theory,
            however, wondering how the forces of nature could possibly have
            delivered the exact number of stones needed to complete the circle.
          </p>

          <p className="text-lg">
            The third phase of construction took place around 2000 BCE.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                At this point, sandstone slabs - known as 'sarsens' - were
                arranged into an outer crescent or ring; some were assembled
                into the iconic three-pieced structures called trilithons that
                stand tall in the centre of Stonehenge.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  9
                </span>
              </span>
            )}
            Some 50 of these stones are now visible on the site, which may once
            have contained many more.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Radiocarbon dating has revealed that work continued at
                Stonehenge until roughly 1600 BCE, with the bluestones in
                particular being repositioned multiple times.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  10
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            But who were the builders of Stonehenge?
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In the 17th century, archaeologist John Aubrey made the claim
                that Stonehenge was the work of druids, who had important
                religious, judicial and political roles in Celtic* society.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  6
                </span>
              </span>
            )}
            This theory was widely popularized by the antiquarian William
            Stukeley, who had unearthed primitive graves at the site.Even today,
            people who identify as modern druids continue to gather at
            Stonehenge for the summer solstice.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                However, in the mid-20th century, radiocarbon dating
                demonstrated that Stonehenge stood more than 1,000 years before
                the Celts inhabited the region.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  11
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            Many modern historians and archaeologists now agree that several
            distinct tribes of people contributed to Stonehenge, each
            undertaking a different phase of its construction.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Bones, tools and other artefacts found on the site seem to
                support this hypothesis.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  12
                </span>
              </span>
            )}
            The first stage was achieved by Neolithic agrarians who were likely
            to have been indigenous to the British Isles.Later, it is believed,
            groups with advanced tools and a more communal way of life left
            their mark on the site.Some believe that they were immigrants from
            the European continent, while others maintain that they were
            probably native Britons, descended from the original builders.
          </p>
          <p className="text-lg">
            If the facts surrounding the architects and construction of
            Stonehenge remain shadowy at best, the purpose of the striking
            monument is even more of a mystery.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                While there is consensus among the majority of modern scholars
                that Stonehenge once served the function of burial ground, they
                have yet to determine what other purposes it had.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  7
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In the 1960s, the astronomer Gerald Hawkins suggested that the
                cluster of megalithic stones operated as a form of calendar,
                with different points corresponding to astrological phenomena
                such as solstices, equinoxes and eclipses occurring at different
                times of the year.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  8
                </span>
              </span>
            )}
            While his theory has received a considerable amount of attention
            over the decades, critics maintain that Stonehenge's builders
            probably lacked the knowledge necessary to predict such events or
            that England's dense cloud cover would have obscured their view of
            the skies.
          </p>

          <p className="text-lg">
            More recently, signs of illness and injury in the human remains
            unearthed at Stonehenge led a group of British archaeologists to
            speculate that it was considered a place of healing, perhaps because
            bluestones were thought to have curative powers.
          </p>
          <hr className=" border-2 border-dotted border-gray-300 my-5" />
          <p className=" text-lg">
            * Neolithic: The era, also known as the New Stone Age, which began
            around 12,000 years ago and ended around 3500 BCE <br /> * Celtic:
            The Celts were people who lived in Britain and northwest Europe
            during the Iron Age from 600 BCE to 43 CE
          </p>
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

            <h2 className="text-lg font-bold mb-3">Questions 1-8</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-8 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Stonehenge</h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Construction <br /> Stage 1:
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Newcomen's steam engine was used in mines to remove water.
              </li>

              <li className="text-lg">
                <span>
                  the ditch and henge were dug, possibly using tools made from
                </span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>

              <li className="text-lg">
                <span></span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  may have been arranged in deep pits inside the circle
                </span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Stage 2:</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                bluestones from the Preseli Hills were placed in standing
                position
              </li>
              <li className="text-lg">
                theories about the transportation of the bluestones:
              </li>
              <li className="text-lg">
                <span>builders used</span>
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
                <span>to make sledges and rollers.</span>
              </li>

              <li className="text-lg">
                <span></span>
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
                <span>pulled them on giant baskets</span>
              </li>
              <li className="text-lg">
                <span>they were brought from Wales by</span>
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

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">Stage 3:</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                sandstone slabs were arranged into an outer crescent or ring:
              </li>
            </ul>
            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">Builders:</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">Stage 3:</li>
              <li className="text-lg">
                <span>
                  a theory arose in the 17th century that its builders were
                  Celtic
                </span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Purpose</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>many experts agree it has been used as a</span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>site.</span>
              </li>
              <li className="text-lg">
                <span>
                  in the 1960s, it was suggested that it worked as a kind of
                </span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>site.</span>
              </li>
            </ul>

      
        
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 9-13 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 9-13 on your answer sheet, choose
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
                    {qIndex + 8}
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

export default Test2Reading2023;
