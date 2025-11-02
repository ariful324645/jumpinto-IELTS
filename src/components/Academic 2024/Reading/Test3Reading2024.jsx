import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test3Reading2024 = () => {
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
    "Archaeological research had taken place on the island of Obi before the arrival of Ceri Shipton and his colleagues.",
    "At the Kelo sites, the researchers found the first clam shell axes ever to be discovered in the region.",
    "The size of Obi today is less than it was 18,000 years ago.",
    "A change in the climate around 11,700 years ago had a greater impact on Obi than on the surrounding islands.",
    "The researchers believe there is a connection between warmer, wetter weather and a change in the material used to make axes.",
    "Shipton's team were surprised to find evidence of the Obi islanders' hunting practices.",
    "It is thought that the Kelo shelters were occupied continuously until about 1,000 years ago.",
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
            <h1 className="text-xl">
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-xl font-bold text-center">
            Archaeologists discover evidence of prehistoric island settlers
          </h1>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In early April 2019, Dr Ceri Shipton and his colleagues from
                Australian National University became the first archaeologists
                to explore Obi, one of many tropical islands in Indonesia's
                Maluku Utara province. (1)
              </span>
            )}
            The research team's discoveries suggest that the prehistoric people
            who lived on Obi were adept on both and and sea, hunting in the
            dense rainforest, foraging on the seashore, and possibly even
            voyaging between islands.
          </p>
          <p className="text-lg">
            The excavations were part of a project to learn more about how
            people first dispersed from mainland Asia, through the Indonesian
            archipelago and into the prehistoric continent that once connected
            Australia and New Guinea.The team's earlier research suggested that
            the northernmost islands in the group, known as the Wallacean
            islands, including Obi, would have offered the easiest migration
            route.It also seemed likely that these islands were crucial
            "stepping stones" on humans' island-hopping voyages through this
            region millennia ago.But to support this idea, they needed
            archaeological evidence for humans living in this remote area in the
            ancient past.So, they travelled to Obi to look for sites that might
            reveal evidence of early occupation.
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Just inland from the village of Kelo on Obi's northern coast,
                Shipton and his colleagues found two caves containing
                prehistoric rock shelters that were suitable for excavation. (8)
              </span>
            )}
            With the permission and help of the local people of Kelo, they dug a
            small test excavation in each shelter.There they found numerous
            artefacts, including fragments of axes, some dating to about 14,000
            years ago.The earliest axes at Kelo were made using clam shells.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Axes made from clam shells from roughly the same time had also
                previously been found elsewhere in this region, including on the
                nearby island of Gebe to the northeast. (2)
              </span>
            )}
            As on Gebe, it is highly likely that Obi's axes were used in the
            construction of canoes, thus allowing these early peoples to
            maintain connections between communities on neighbouring islands.
          </p>
          <p className="text-lg">
            The oldest cultural layers from the Kelo site provided the team with
            the earliest record for human occupation on Obi, dating back around
            18,000 years.At this time the climate was drier and colder than
            today, and the island's dense rainforests would likely have been
            much less impenetrable than they are now.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Sea levels were about 120 metres lower, meaning Obi was a much
                larger island, encompassing what is today the separate island of
                Bisa, as well as several other small islands nearby. (3)
              </span>
            )}
          </p>

          <p className="text-lg">
            Roughly 11,700 years ago, as the most recent ice age ended, the
            climate became significantly warmer and wetter, no doubt making
            Obi's jungle much thicker.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                According to the researchers, it is no coincidence that around
                this time the first axes crafted from stone rather than sea
                shells appear, likely in response to their heavy-duty use for
                clearing and modification of the increasingly dense rainforest.
                (5,9)
              </span>
            )}
            While stone takes about twice as long to grind into an axe compared
            to shell, the harder material keeps its sharp edge for longer.
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Judging by the bones which the researchers unearthed in the Kelo
                caves, people living there mainly hunted the Rothschild's
                cuscus, a possum-like creature that still lives on Obi
                today.(10)
              </span>
            )}
            As the forest grew more dense, people probably used axes to clear
            patches of forest and make hunting easier.
          </p>
          <p className="text-lg">
            Shipton's team's excavation of the shelters at the Kelo site
            unearthed a volcanic glass substance called obsidian, which must
            have been brought over from another island, as there is no known
            source on Obi.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It also revealed particular types of beads, similar to those
                previously found on islands in southern Wallacea.(11)
              </span>
            )}
            These finds again support the idea that Obi islanders routinely
            travelled to other islands.
          </p>

          <p className="text-lg">
            The excavations suggest people successfully lived in the two Kelo
            shelters for about 10,000 years.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                But then, about 8,000 years ago, both were abandoned.(7)
              </span>
            )}
            Did the residents leave Obi completely, or move elsewhere on the
            island?Perhaps the jungle had grown so thick that axes were no
            longer a match for the dense undergrowth.Perhaps people simply moved
            to the coast and turned to fishing rather than hunting as a means of
            survival
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Whatever the reason for the departure, there is no evidence for
                use of the Kelo shelters after this time, until about 1,000
                years ago, when they were re-occupied by people who owned
                pottery as well as items made out of gold and silver.(12)
              </span>
            )}
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It seems likely, in view of Obi's location, that this final
                phase of occupation also saw the Kelo shelters used by people
                involved in the historic trade in spices between the Maluku
                islands and the rest of the world.(13)
              </span>
            )}
          </p>
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* cleaer icon */}
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
          <h2 className="text-lg font-bold mb-3">Questions 1-7 </h2> <br />
          <h3 className="text-xl  mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 1-7 on your answer sheet, choose
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
                    {qIndex + 1}
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
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">Questions 8–13</h2>

            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 8–13 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Archaeological findings on Obi
            </h1>

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg ">
                <span>Excavations of rock shelters inside</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>near the village of Kelo revealed</span>
              </li>

              <li className="text-lg">
                axes from around 14,000 years ago, probably used to make canoes
              </li>

              <li className="text-lg ">
                <span>axes made out of</span>
                <button
                  onClick={() => toggleButton(9)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>, dating from around 11,700 years ago</span>
              </li>

              <li className="text-lg">
                <span></span>
                <button
                  onClick={() => toggleButton(10)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>
                  of an animal: evidence of what ancient islanders ate
                </span>
              </li>
              <li className="text-lg">evidence of travel between islands:</li>
              <li className="text-lg">
                obsidian: a material that is not found naturally on Obi
              </li>

              <li className="text-lg ">
                <span></span>
                <button
                  onClick={() => toggleButton(11)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[11]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  11
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>which resembled ones found on other islands.</span>
              </li>
              <li className="text-lg">
                It is thought that from 8,000 years ago, Obi islanders:{" "}
              </li>
              <li className="text-lg">
                may have switched from hunting to fishing
              </li>

              <li className="text-lg ">
                <span>had</span>
                <button
                  onClick={() => toggleButton(12)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>as well as items made out of metal</span>
              </li>

              <li className="text-lg ">
                <span>probably took part in the production and sale of</span>
                <button
                  onClick={() => toggleButton(13)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[13]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  13
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3Reading2024;
