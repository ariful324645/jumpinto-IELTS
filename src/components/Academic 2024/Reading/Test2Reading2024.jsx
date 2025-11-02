import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test2Reading2024 = () => {
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
    "Britain's canal network grew rapidly so that more goods could be transported around the country..",
    "Costs in the iron industry rose when the technique of smelting iron ore with cokewas introduced.",
    "Samuel Morse's communication system was more reliable than that developed by William Cooke and Charles Wheatstone.",
    "The economic benefits of industrialisation were limited to certain sectors of society.",
    "It is predicted that West Indian manatee populations will fall in the coming decades.Some skilled weavers believed that the introduction of the new textile machines would lead to job losses.",
    "There was some sympathy among local people for the Luddites who were arrested near Huddersfield..",
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
          <h1 className="text-xl font-bold text-center">
            The Industrial Revolution in Britain
          </h1>
          <p className="text-lg">
            The Industrial Revolution began in Britain in the mid-1700s and by
            the 1830s and 1840s had spread to many other parts of the world,
            including the United States.In Britain, it was a period when a
            largely rural, agrarian* society was transformed into an
            industrialised, urban one.Goods that had once been crafted by hand
            started to be produced in mass quantities by machines in factories,
            thanks to the invention of steam power and the introduction of new
            machines and manufacturing techniques in textiles, iron-making and
            other industries.
          </p>
          <p className="text-lg">
            The foundations of the Industrial Revolution date back to the early
            1700s, when the English inventor Thomas Newcomen designed the first
            modern steam engine.Called the "atmospheric steam engine",
            Newcomen's invention was originally used to power machines that
            pumped water out of mines.In the 1760s, the Scottish engineer James
            Watt started to adapt one of Newcomen's models, and succeeded in
            making it far more efficient.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Watt later worked with the English manufacturer Matthew Boulton
                to invent a new steam engine driven by both the forward and
                backward strokes of the piston, while the gear mechanism it was
                connected to produced rotary motion.(1)
              </span>
            )}
            It was a key innovation that would allow steam power to spread
            across British industries.
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The demand for coal, which was a relatively cheap energy source,
                grew rapidly during the Industrial Revolution, as it was needed
                to run not only the factories used to produce manufactured
                goods, but also steam-powered transportation. (2)
              </span>
            )}
            In the early 1800s, the English engineer Richard Trevithick built a
            steam-powered locomotive, and by 1830 goods and passengers were
            being transported between the industrial centres of Manchester and
            Liverpool.In addition, steam-powered boats and ships were widely
            used to carry goods along Britain's canals as well as across the
            Atlantic.
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Britain had produced textiles like wool, linen and cotton, for
                hundreds of years, but prior to the Industrial Revolution, the
                British textile business was a true "cottage industry", with the
                work performed in small workshops or even homes by individual
                spinners, weavers and dyers.(3)
              </span>
            )}
            Starting in the mid-1700s, innovations like the spinning jenny and
            the power loom made weaving cloth and spinning yarn and thread much
            easier.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                With these machines, relatively little labour was required to
                produce cloth, and the new, mechanised textile factories that
                opened around the country were quickly able to meet customer
                demand for cloth both at home and abroad.(4)
              </span>
            )}
          </p>
          <p className="text-lg">
            The British iron industry also underwent major change as it adopted
            new innovations.Chief among the new techniques was the smelting of
            iron ore with coke (a material made by heating coal) instead of the
            traditional charcoal.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                This method was cheaper and produced metals that were of a
                higher quality, enabling Britain's iron and steel production to
                expand in response to demand created by the Napoleonic Wars
                (1803-15) and the expansion of the railways from the 1830s.5,6,9
                (5,6,9)
              </span>
            )}
          </p>

          <p className="text-lg">
            The latter part of the Industrial Revolution also saw key advances
            in communication methods, as people increasingly saw the need to
            communicate efficiently over long distances.In 1837, British
            inventors William Cooke and Charles Wheatstone patented the first
            commercial telegraphy system.In the 1830s and 1840s, Samuel Morse
            and other inventors worked on their own versions in the United
            States.Cooke and Wheatstone's system was soon used for railway
            signalling in the UK.As the speed of the new locomotives increased,
            it was essential to have a fast and effective means of avoiding
            collisions.
          </p>
          <p className="text-lg">
            The impact of the Industrial Revolution on people's lives was
            immense.Although many people in Britain had begun moving to the
            cities from rural areas before the Industrial Revolution, this
            accelerated dramatically with industrialisation, as the rise of
            large factories turned smaller towns into major cities in just a few
            decades.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                This rapid urbanisation brought significant challenges, as
                overcrowded cities suffered from pollution and inadequate
                sanitation.(7)
              </span>
            )}
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Although industrialisation increased the country's economic
                output overall and improved the standard of living for the
                middle and upper classes, many poor people continued to
                struggle.(11)
              </span>
            )}
            Factory workers had to work long hours in dangerous conditions for
            extremely low wages.These conditions along with the rapid pace of
            change fuelled opposition to industrialisation.A group of British
            workers who became known as "Luddites" were British weavers and
            textile workers who objected to the increased use of mechanised
            looms and knitting frames.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Many had spent years learning their craft, and they feared that
                unskilled machine operators were robbing them of their
                livelihood.(12)
              </span>
            )}
            A few desperate weavers began breaking into factories and smashing
            textile machines.They called themselves Luddites after Ned Ludd, a
            young apprentice who was rumoured to have wrecked a textile machine
            in 1779.
          </p>
          <p className="text-lg">
            The first major instances of machine breaking took place in 1811 in
            the city of Nottingham, and the practice soon spread across the
            country.Machine-breaking Luddites attacked and burned factories, and
            in some cases they even exchanged gunfire with company guards and
            soldiers.The workers wanted employers to stop installing new
            machinery, but the British government responded to the uprisings by
            making machine-breaking punishable by death.The unrest finally
            reached its peak in April 1812, when a few Luddites were shot during
            an attack on a mill near Huddersfield.In the days that followed,
            other Luddites were arrested, and dozens were hanged or transported
            to Australia.By 1813, the Luddite resistance had all but vanished.
          </p>
          <hr className=" border-2 border-dotted border-gray-300 my-5" />
          <p className=" text-lg">
            * agrarian: relating to the land, especially the use of land for
            farming
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

            <h2 className="text-lg font-bold mb-3">Questions 1-7</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-7 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Britain's Industrial Revolution
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Steam power</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Newcomen's steam engine was used in mines to remove water.
              </li>

              <li className="text-lg">
                <span>
                  In Watt and Boulton's steam engine, the movement of the
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
                <span>was linked to a gear system.</span>
              </li>

              <li className="text-lg">
                <span>A greater supply</span>
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
                <span>was required to power steam engines.</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Textile industry</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  Before the Industrial Revolution, spinners and weavers worked
                  at home and in
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
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>Not as much</span>
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
                <span>
                  was needed to produce cloth once the spinning jenny and power
                  loom were invented.
                </span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">Iron industry</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  Smelting of iron ore with coke resulted in material that was
                  better
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
              </li>

              <li className="text-lg">
                <span>Demand for iron increased with the growth of the</span>
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
            <h2 className="text-lg font-bold mt-6">Communications</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Cooke and Wheatstone patented the first telegraphy system.
              </li>
              <li className="text-lg">
                The telegraphy system was used to prevent locomotives colliding.
              </li>
            </ul>

            {/* ---------- Section 5 ---------- */}
            <h2 className="text-lg font-bold mt-6">Urbanisation</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Small towns turned into cities very quickly.
              </li>
              <li className="text-lg">
                <span>
                  The new cities were dirty, crowded and lacked sufficient
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
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 8-13 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 8-13 on your answer sheet, choose
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

export default Test2Reading2024;
