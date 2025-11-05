import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test1Reading2023 = () => {
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
    "Urban farming can take place above or below ground.",
    "Some of the equipment used in aeroponic farming can be made by hand.",
    "Urban farming relies more on electricity than some other types of farming.",
    "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
    "Most produce can be grown on an aeroponic urban farm at any time of the year.",
    "Beans take longer to grow on an urban farm than other vegetables.",
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
          <h1 className="text-2xl font-bold text-center">Urban farming</h1>
          <h3 className="text-lg font-bold italic text-center">
            In Paris, urban farmers are trying a soil-free approach to
            agriculture that uses less space and fewer resources. Could it help
            cities face the threats to our food supplies?
          </h3>
          <p className="text-lg">
            Pascal Hardy, an engineer and sustainable development consultant,
            began experimenting with vertical farming and aeroponic growing
            towers - as the soil-free plastic tubes are known - on his Paris
            apartment block roof five years ago.The urban rooftop space above
            the exhibition hall is somewhat bigger: 14,000 square metres and
            almost exactly the size of a couple of football pitches.Already, the
            team of young urban farmers who tend it have picked, in one day,
            3,000 lettuces and 150 punnets of strawberries
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                When the remaining two thirds of the vast open area are in
                production, 20 staff will harvest up to 1,000 kg of perhaps 35
                different varieties of fruit and vegetables, every day.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  2
                </span>
              </span>
            )}
            "We're not ever, obviously, going to feed the whole city this way,"
            cautions Hardy."In the urban environment you're working with very
            significant practical constraints, clearly, on what you can do and
            where.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                But if enough unused space can be developed like this, there's
                no reason why you shouldn't eventually target maybe between 5%
                and 10% of consumption."{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  3
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            Perhaps most significantly, however, this is a real-life showcase
            for the work of Hardy's flourishing urban agriculture consultancy,
            Agripolis, which is currently fielding enquiries from around the
            world to design, build and equip a new breed of soil-free inner-city
            farm."The method's advantages are many," he says.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                "First, I don't much like the fact that most of the fruit and
                vegetables we eat have been treated with something like 17
                different pesticides, or that the intensive farming techniques
                that produced them are such huge generators of greenhouse gases.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  4
                </span>
                I don't much like the fact, either, that they've travelled an
                average of 2,000 refrigerated kilometres to my plate, that their
                quality is so poor, because the varieties are selected for their
                capacity to withstand such substantial journeys, or that 80% of
                the price I pay goes to wholesalers and transport companies, not
                the producers."{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  5,6
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            Produce grown using this soil-free method, on the other hand - which
            relies solely on a small quantity of water, enriched with organic
            nutrients, pumped around a closed circuit of pipes, towers and trays
            - is "produced up here, and sold locally, just down there.It barely
            travels at all," Hardy says.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                "You can select crop varieties for their flavour, not their
                resistance to the transport and storage chain, and you can pick
                them when they're really at their best, and not before."{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  7
                </span>
              </span>
            )}
            No soil is exhausted, and the water that gently showers the plants'
            roots every 12 minutes is recycled, so the method uses 90% less
            water than a classic intensive farm for the same yield.
          </p>
          <p className="text-lg">
            Urban farming is not, of course, a new phenomenon.Inner-city
            agriculture is booming from Shanghai to Detroit and Tokyo to
            Bangkok.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Strawberries are being grown in disused shipping containers,
                mushrooms in underground carparks.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  8
                </span>
              </span>
            )}
            Aeroponic farming, he says, is "virtuous".The equipment weighs
            little, can be installed on almost any flat surface and is cheap to
            buy: roughly €100 to €150 per square metre.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It is cheap to run, too, consuming a tiny fraction of the
                electricity used by some techniques.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  10
                </span>
              </span>
            )}
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Produce grown this way typically sells at prices that, while
                generally higher than those of classic intensive agriculture,
                are lower than soil-based organic growers.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  11
                </span>
                There are limits to what farmers can grow this way, of course,
                and much of the produce is suited to the summer months.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  12
                </span>
              </span>
            )}
            "Root vegetables we cannot do, at least not yet," he says."Radishes
            are OK, but carrots, potatoes, that kind of thing - the roots are
            simply too long.Fruit trees are obviously not an option.And beans
            tend to take up a lot of space for not much return."Nevertheless,
            urban farming of the kind being practised in Paris is one part of a
            bigger and fast-changing picture that is bringing food production
            closer to our lives.
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

            <h2 className="text-lg font-bold mb-3">Questions 1-3</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">
                NO MORE THAN TWO WORDS AND/OR A NUMBER
              </span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-3 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Urban farming in Paris
            </h1>

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Vertical tubes are used to grow strawberries,</span>
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
                <span>and herbs.</span>
              </li>

              <li className="text-lg">
                <span>
                  There will eventually be a daily harvest of as much as
                </span>
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
                <span>in weight of fruit and vegetables.</span>
              </li>
              <li className="text-lg">
                <span>
                  It may be possible that the farm's produce will account for as
                  much as 10% of the city's
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
                <span>overall.</span>
              </li>
            </ul>
          </div>
          <br />
          {/* TABLE SECTION */}
          <div className="mt-5 w-full h-full">
            <h2 className="text-lg font-bold mb-3">Questions 4-7</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE WORD</span> for each answer.
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
              <thead>
                <tr>
                  <th
                    colSpan="4"
                    className="border  text-lg font-bold p-2"
                  >
                    Intensive farming versus aeroponic urban farming
                  </th>
                </tr>
                <tr>
                  <th className="border p-2"></th>
                  <th className="border p-2">Growth</th>
                  <th className="border p-2">Selection</th>
                  <th className="border p-2">Sale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border text-lg p-2">Intensive farming</td>
                  <td
                    className="border
                   text-lg p-2"
                  >
                    <span>wide range of</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>used</span>
                  </td>
                  <td className="border text-lg  p-2">
                    <span>
                      varieties of fruit and vegetables chosen that can survive
                      long
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>used</span>
                  </td>

                  <td className="border text-lg p-2">
                    <span></span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>receive very little of overall income.</span>
                  </td>
                </tr>

                <tr>
                  <td className="border text-lg p-2">
                    Aeroponic urban farming
                  </td>
                  <td className="border  text-lg p-2">
                    nutrients added to water, which is recycled
                  </td>
                  <td className="border  text-lg p-2">
                    <span>produce chosen because of its</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default Test1Reading2023;
