import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test3Reading2021 = () => {
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
    "The Romans' shipbuilding skills were passed on to the Greeks and the Egyptians.",
    "Skilled craftsmen were needed for the mortise and tenon method of fixing planks..",
    "The later practice used by Mediterranean shipbuilders involved building the hull before the frame",
    "The Romans called the Mediterranean Sea Mare Nostrum because they dominated its use.",
    "Most rowers on ships were people from the Roman army",
  
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
              <span className="text-lg font-bold">Questions 1-8</span>, which
              are based on Reading Passage 1 below. 
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold text-center mb-5">
              Roman Shipbuilding and Navigation
            </h1>

            <p className="text-lg">
              Shipbuilding today is based on science and ships are built using
              computers and sophisticated tools. Shipbuilding in ancient Rome,
              however, was more of an art relying on estimation, inherited
              techniques and personal experience.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                The Romans were not traditionally sailors but mostly land-based
                people, who learned to build ships from the people that they
                conquered, namely the Greeks and the Egyptians.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mt-4">
              There are a few surviving written documents that give descriptions
              and representations of ancient Roman ships, including the sails
              and rigging. Excavated vessels also provide some clues about
              ancient shipbuilding techniques. Studies of these have taught us
              that ancient Roman shipbuilders built the outer hull first, then
              proceeded with the frame and the rest of the ship. Planks used to
              build the outer hull were initially sewn together. Starting from
              the 6th century BCE, they were fixed using a method called mortise
              and tenon, whereby one plank locked into another without the need
              for stitching.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                Then in the first centuries of the current era, Mediterranean
                shipbuilders shifted to another shipbuilding method, still in
                use today, which consisted of building the frame first and then
                proceeding with the hull and the other components of the ship.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
              This method was more systematic and dramatically shortened ship
              construction times. The ancient Romans built large merchant ships
              and warships whose size and technology were unequalled until the
              16th century CE.
            </p>

            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                Warships were built to be lightweight and very speedy.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              They had to be able to sail near the coast, which is why they had
              no ballast or excess load and were built with a long, narrow hull.
              They did not sink when damaged and often would lie crippled on the
              sea's surface following naval battles.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                They had a bronze battering ram, which was used to pierce the
                timber hulls or break the oars of enemy vessels.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
              Warships used both wind (sails) and human power (oarsmen) and were
              therefore very fast.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                Eventually, Rome's navy became the largest and most powerful in
                the Mediterranean, and the Romans had control over what they
                therefore called Mare Nostrum meaning 'our sea'.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mt-4">
              There were many kinds of warship. The 'trireme' was the dominant
              warship from the 7th to 4th century BCE.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                It had rowers in the top, middle and lower levels, and
                approximately 50 rowers in each bank.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              The rowers at the bottom had the most uncomfortable position as
              they were under the other rowers and were exposed to the water
              entering through the oar-holes.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                It is worth noting that contrary to popular perception, rowers
                were not slaves but mostly Roman citizens enrolled in the
                military.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              The trireme was superseded by larger ships with even more rowers.
            </p>

            <p className="text-lg mt-4">
              Merchant ships were built to transport lots of cargo over long
              distances and at a reasonable cost.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                They had a wider hull, double planking and a solid interior for
                added stability.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              Unlike warships, their V-shaped hull was deep underwater, meaning
              that they could not sail too close to the coast. They usually had
              two huge side rudders located off the stern and controlled by a
              small tiller bar connected to a system of cables.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                They had from one to three masts with large square sails and a
                small triangular sail at the bow.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              Just like warships, merchant ships used oarsmen, but coordinating
              the hundreds of rowers in both types of ship was not an easy task.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                In order to assist them, music would be played on an instrument,
                and oars would then keep time with this.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mt-4">
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                The cargo on merchant ships included raw materials (e.g. iron
                bars, copper, marble and granite), and agricultural products
                (e.g. grain from Egypt's Nile valley).
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
              During the Empire, Rome was a huge city by ancient standards of
              about one million inhabitants. Goods from all over the world would
              come to the city through the port of Pozzuoli situated west of the
              bay of Naples in Italy and through the gigantic port of Ostia
              situated at the mouth of the Tiber River.
              <span
                className={`${highlight ? "bg-yellow-100" : "bg-transparent"}`}
              >
                Large merchant ships would approach the destination port and,
                just like today, be intercepted by a number of towboats that
                would drag them to the quay.
                {highlight && (
                  <span className="ml-1 inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg mt-4">
              The time of travel along the many sailing routes could vary
              widely. Navigation in ancient Rome did not rely on sophisticated
              instruments such as compasses but on experience, local knowledge
              and observation of natural phenomena. In conditions of good
              visibility, seamen in the Mediterranean often had the mainland or
              islands in sight, which greatly facilitated navigation. They
              sailed by noting their position relative to a succession of
              recognisable landmarks. When weather conditions were not good or
              where land was no longer visible, Roman mariners estimated
              directions from the pole star or, with less accuracy, from the Sun
              at noon. They also estimated directions relative to the wind and
              swell. Overall, shipping in ancient Roman times resembled shipping
              today with large vessels regularly crossing the seas and bringing
              supplies from their Empire.
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
              Warships and merchant ships
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Warships and merchant ships
            </h2>

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>Warships were designed so that they were</span>
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
                <span>and moved quickly.</span>
              </p>
              <p className="text-lg">
                <span>
                  {" "}
                  They often remained afloat after battles and were able to sail
                  close to land as they lacked any additional weight. A
                  battering ram made of
                </span>
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
              </p>

              <p className="text-lg">
                <span>
                  was included in the design for attacking and damaging the
                  timber and oars of enemy ships. Warships, such as the
                  'trireme', had rowers on three different
                </span>
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
              </p>
              <p className="text-lg">
                <span>Unlike warships, merchant ships had a broad</span>
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
              </p>
              <p className="text-lg">
                <span>
                  that lay far below the surface of the sea. Merchant ships were
                  steered through the water with the help of large rudders and a
                  tiller bar. They had both square and
                </span>
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
              </p>
              <p className="text-lg">
                <span>sails. On merchant ships and warships,</span>
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
              </p>
              <p className="text-lg">
                <span>
                  was used to ensure rowers moved their oars in and out of the
                  water at the same time. Quantities of agricultural goods such
                  as
                </span>
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
                <span>.</span>
              </p>
              <p className="text-lg">
                <span>
                  were transported by merchant ships to two main ports in Italy.
                  The ships were pulled to the shore by
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
                <span>
                  When the weather was clear and they could see islands or land,
                  sailors used landmarks that they knew to help them navigate
                  their route..
                </span>
              </p>
            </ul>

            {/* ---------- Section 2 ---------- */}
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
                    {qIndex + 9}
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

export default Test3Reading2021;
