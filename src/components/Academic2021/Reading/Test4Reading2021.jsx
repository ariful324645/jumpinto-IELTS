import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading2021 = () => {
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
    "The counter-excavation method completely replaced the qanat method in the 6th century BCE.",
    "Only experienced builders were employed to construct a tunnel using the counter-excavation method.",
    "The information about a problem that occurred during the construction of the Saldae aqueduct system was found in an ancient book.",
    "The mistake made by the builders of the Saldae aqueduct system was that the two parts of the tunnel failed to meet.",
  
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
            <h1 className="text-2xl font-bold text-center mb-5">
              Roman Tunnels
            </h1>

            <p className="text-lg">
              The Romans, who once controlled areas of Europe, North Africa and
              Asia Minor, adopted the construction techniques of other
              civilizations to build tunnels in their territories. The Persians,
              who lived in present-day Iran, were one of the first civilizations
              to build tunnels that provided a reliable supply of water to human
              settlements in dry areas.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                In the early first millennium BCE, they introduced the qanat
                method of tunnel construction, which consisted of placing posts
                over a hill in a straight line, to ensure that the tunnel kept
                to its route, and then digging vertical shafts down into the
                ground at regular intervals.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>{" "}
              Underground, workers removed the earth from between the ends of
              the shafts, creating a tunnel.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                The excavated soil was taken up to the surface using the shafts,
                which also provided ventilation during the work.{" "}
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
                Once the tunnel was completed, it allowed water to flow from the
                top of a hillside down towards a canal, which supplied water for
                human use.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>{" "}
              Remarkably, some qanats built by the Persians 2,700 years ago are
              still in use today.
            </p>

            <p className="text-lg mt-4">
              They later passed on their knowledge to the Romans, who also used
              the qanat method to construct water-supply tunnels for
              agriculture. Roman qanat tunnels were constructed with vertical
              shafts dug at intervals of between 30 and 60 meters.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                {" "}
                The shafts were equipped with handholds and footholds to help
                those climbing in and out of them and were covered with a wooden
                or stone lid.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4,6
                  </span>
                )}
              </span>{" "}
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                To ensure that the shafts were vertical, Romans hung a plumb
                line from a rod placed across the top of each shaft and made
                sure that the weight at the end of it hung in the center of the
                shaft.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>{" "}
              Plumb lines were also used to measure the depth of the shaft and
              to determine the slope of the tunnel. The 5.6-kilometer-long
              Claudius tunnel, built in 41 CE to drain the Fucine Lake in
              central Italy, had shafts that were up to 122 meters deep, took 11
              years to build and involved approximately 30,000 workers.
            </p>

            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                By the 6th century BCE, a second method of tunnel construction
                appeared called the counter-excavation method, in which the
                tunnel was constructed from both ends.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>{" "}
              It was used to cut through high mountains when the qanat method
              was not a practical alternative. This method required greater
              planning and advanced knowledge of surveying, mathematics and
              geometry as both ends of a tunnel had to meet correctly at the
              center of the mountain. Adjustments to the direction of the tunnel
              also had to be made whenever builders encountered geological
              problems or when it deviated from its set path. They constantly
              checked the tunnel's advancing direction, for example, by looking
              back at the light that penetrated through the tunnel mouth, and
              made corrections whenever necessary. Large deviations could
              happen, and they could result in one end of the tunnel not being
              usable.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                An inscription written on the side of a 428-meter tunnel, built
                by the Romans as part of the Saldae aqueduct system in
                modern-day Algeria, describes how the two teams of builders
                missed each other in the mountain and how the later construction
                of a lateral link between both corridors corrected the initial
                error.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9,10
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mt-4">
              The Romans dug tunnels for their roads using the
              counter-excavation method, whenever they encountered obstacles
              such as hills or mountains that were too high for roads to pass
              over. An example is the 37-meter-long, 6-meter-high, Furlo Pass
              Tunnel built in Italy in 69–79 CE. Remarkably, a modern road still
              uses this tunnel today. Tunnels were also built for mineral
              extraction. Miners would locate a mineral vein and then pursue it
              with shafts and tunnels underground.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                Traces of such tunnels used to mine gold can still be found at
                the Dolaucothi mines in Wales.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>{" "}
              When the sole purpose of a tunnel was mineral extraction,
              construction required less planning, as the tunnel route was
              determined by the mineral vein.
            </p>

            <p className="text-lg mt-4">
              Roman tunnel projects were carefully planned and carried out. The
              length of time it took to construct a tunnel depended on the
              method being used and the type of rock being excavated. The qanat
              construction method was usually faster than the counter-excavation
              method as it was more straightforward. This was because the
              mountain could be excavated not only from the tunnel mouths but
              also from shafts. The type of rock could also influence
              construction times. When the rock was hard, the Romans employed a
              technique called fire quenching which consisted of heating the
              rock with fire, and then suddenly cooling it with cold water so
              that it would crack. Progress through hard rock could be very
              slow, and it was not uncommon for tunnels to take years, if not
              decades, to be built. Construction marks left on a Roman tunnel in
              Bologna show that the rate of advance through solid rock was 30
              centimeters per day. In contrast, the rate of advance of the
              Claudius tunnel can be calculated at 1.4 meters per day.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                Most tunnels had inscriptions showing the names of patrons who
                ordered construction and sometimes the name of the architect.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}{" "}
                For example, the 1.4-kilometer Çevlik tunnel in Turkey, built to
                divert the floodwater threatening the harbor of the ancient city
                of Seleuceia Pieria, had inscriptions on the entrance, still
                visible today, that also indicate that the tunnel was started in
                69 CE and was completed in 81 CE.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>{" "}
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

            <h2 className="text-lg font-bold mb-3">Questions 1-6</h2>

            <h3 className="text-lg  ">
              Level the diagram below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg ">
              Write your answers in boxes 1-6 on your answer sheet.
            </h1>
            <br />

            <div className="flex items-center justify-center">
              <img
                className="w-96 h-96"
                src="https://i.ibb.co.com/VcQzJzYQ/r1-2021.jpg"
                alt="image bosabo"
              />
            </div>
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6 mb-5">
              The Persian Qanat Method
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span></span>
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
                <span>to direct the tunnelling</span>
              </li>
              <li className="text-lg">
                <span>water runs into a</span>
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
                <span>used by local place.</span>
              </li>
              <li className="text-lg">
                <span>vertical shafts to remove earth and for</span>
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
                <span></span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <h2 className="text-lg font-bold mt-6">
                Cross-section of a Roman Qanat Shaft
              </h2>

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
                <span>made of wood or stone.</span>
              </li>
              <li className="text-lg">
                <span></span>
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
                <span>attached to the plumb line.</span>
              </li>
              <li className="text-lg">
                <span>handholds and footholds used for</span>
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
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 7-10 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 7-10 on your answer sheet, choose
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
          {/* third step */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold mb-3">Questions 11-13</h2>

            <h3 className="text-lg  ">
              Answer the question below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2"> NO MORE THAN TWO WORDS</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg ">
              Write your answers in boxes 11-13 on your answer sheet.
            </h1>

            <p className="text-lg">
              <span>
                What type of mineral were the Dolaucothi mines in Wales built to
                extract? <br />
              </span>
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
                className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                type="text"
              />
              <span></span>
            </p>

            <p className="text-lg">
              <span>
                In addition to the patron, whose name might be carved onto a
                tunnel? <br />
              </span>
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
                className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                type="text"
              />
              <span></span>
            </p>

            <p className="text-lg">
              <span>
                What type of mineral were the Dolaucothi mines in Wales built to
                extract? <br />
              </span>
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
                className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                type="text"
              />
              <span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Reading2021;
