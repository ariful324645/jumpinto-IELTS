import React, { useState } from "react";
import { IoBookSharp } from "react-icons/io5";

const Test3Reading = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

  const questions = [
    "The ice transportation business made some Boston ship owners very wealthy in the early 1800s.",
    "A disadvantage of the freezing process invented in Australia was that it affected the taste of food.",
    "Clarence Birdseye travelled to Labrador in order to learn how the Inuit people froze fish",
    "Swanson Foods invested a great deal of money in the promotion of the TV Dinner.",
    "Swanson Foods developed a new style of container for the launch of the TV Dinner.",
    "The US frozen food industry is currently the largest in the world.",
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
              <span className="text-xl font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-xl font-bold text-center">Frozen Food</h1>
          <h1 className="text-xl font-bold italic text-center">
            A US perspective on the development of the frozen food industry
          </h1>

          <p className="text-lg">
            At some point in history, humans discovered that ice preserved
            food.There is evidence that winter ice was stored to preserve food
            in the summer as far back as 10,000 years ago.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Two thousand years ago, the inhabitants of South America's
                Andean mountains had a unique means of conserving potatoes for
                later consumption.(1)
              </span>
            )}
            They froze them overnight, then trampled them to squeeze out the
            moisture, then dried them in the sun.This preserved their
            nutritional value - if not their aesthetic appeal.
          </p>
          <p className="text-lg">
            Natural ice remained the main form of refrigeration until late in
            the 19th century.In the early 1800s, ship owners from Boston, USA,
            had enormous blocks of Arctic ice towed all over the Atlantic for
            the purpose of food preservation.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In 1851, railroads first began putting blocks of ice in
                insulated rail cars to send butter from Ogdensburg, New York, to
                Boston. (2)
              </span>
            )}
          </p>
          <p className="text-lg">
            Finally, in 1870, Australian inventors found a way to make
            'mechanical ice'.They used a compressor to force a gas - ammonia at
            first and later Freon - through a condenser.The compressed gas gave
            up some of its heat as it moved through the condenser.Then the gas
            was released quickly into a low-pressure evaporator coil where it
            became liquid and cold.Air was blown over the evaporator coil and
            then this cooled air passed into an insulated compartment, lowering
            its temperature to freezing point.{" "}
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In 1880, a shipment of Australian beef and mutton was sent,
                frozen, to England.(3)
              </span>
            )}
            Initially, this process was invented to keep Australian beer cool
            even in hot weather.But Australian cattlemen were quick to realize
            that, if they could put this new invention on a ship, they could
            export meat across the oceans. While the food frozen this way was
            still palatable, there was some deterioration.
          </p>
          <p className="text-lg">
            Manatees' teeth are all molars - flat, rounded teeth for grinding
            food.Due to manatees' abrasive aquatic plant diet, these teeth get
            worn down and they eventually fall out, so they continually grow new
            teeth that get pushed forward to replace the ones they lose.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                During the freezing process, crystals formed within the cells of
                the food, and when the ice expanded and the cells burst, this
                spoilt the flavor and texture of the food. (9)
              </span>
            )}
          </p>

          <p className="text-lg">
            The modern frozen food industry began with the indigenous Inuit
            people of Canada.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In 1912, a biology student in Massachusetts, USA, named Clarence
                Birdseye, ran out of money and went to Labrador in Canada to
                trap and trade furs.(10)
              </span>
            )}
            While he was there, he became fascinated with how the Inuit would
            quickly freeze fish in the Arctic air.The fish looked and tasted
            fresh even months later.
          </p>
          <p className="text-lg">
            Birdseye returned to the USA in 1917 and began developing mechanical
            freezers capable of quick-freezing food.Birdseye methodically kept
            inventing better freezers and gradually built a business selling
            frozen fish from Gloucester, Massachusetts.In 1929, his business was
            sold and became General Foods, but he stayed with the company as
            director of research, and his division continued to innovate.
          </p>

          <p className="text-lg">
            Birdseye was responsible for several key innovations that made the
            frozen food industry possible.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                He developed quick-freezing techniques that reduced the damage
                that crystals caused, as well as the technique of freezing the
                product in the package it was to be sold in.(4)
              </span>
            )}
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                He also introduced the use of cellophane, the first transparent
                material for food packaging, which allowed consumers to see the
                quality of the product.(5)
              </span>
            )}
            Birdseye products also came in convenient size packages that could
            be prepared with a minimum of effort.
          </p>

          <p className="text-lg">
            But there were still obstacles.In the 1930s, few grocery stores
            could afford to buy freezers for a market that wasn't established
            yet.So, Birdseye leased inexpensive freezer cases to them.He also
            leased insulated railroad cars so that he could ship his products
            nationwide.However, few consumers had freezers large enough or
            efficient enough to take advantage of the products.
          </p>
          <p className="text-lg">
            Sales increased in the early 1940s, when World War II gave a boost
            to the frozen food industry because tin was being used for
            munitions.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Canned foods were rationed to save tin for the war effort, while
                frozen foods were abundant and cheap.(6)Finally, by the 1950s,
                refrigerator technology had developed far enough to make these
                appliances affordable for the average family.(7)
              </span>
            )}
            By 1953, 33 million US families owned a refrigerator, and
            manufacturers were gradually increasing the size of the freezer
            compartments in them.
          </p>
          <p className="text-lg">
            1950s families were also looking for convenience at mealtimes, so
            the moment was right for the arrival of the 'TV Dinner'.Swanson
            Foods was a large, nationally recognized producer of canned and
            frozen poultry.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In 1954, the company adapted some of Birdseye's freezing
                techniques, and with the help of a clever name and a huge
                advertising budget, it launched the first 'TV Dinner'. (11)This
                consisted of frozen turkey, potatoes and vegetables served in
                the same segmented aluminum tray that was used by airlines.(12)
              </span>
            )}
            The product was an instant success.Within a year, Swanson had sold
            13 million TV dinners.American consumers couldn't resist the
            combination of a trusted brand name, a single-serving package and
            the convenience of a meal that could be ready after only 25 minutes
            in a hot oven.By 1959, Americans were spending $2.7 billion annually
            on frozen foods, and half a billion of that was spent on ready-
            prepared meals such as the TV Dinner.
          </p>

          <p className="text-lg">
            Today, the US frozen food industry has a turnover of over $67
            billion annually, with $26.6 billion of that sold to consumers for
            home consumption.The remaining $40 billion in frozen food sales come
            through restaurants, cafeterias, hospitals and schools, and that
            represents a third of the total food service sales.
          </p>
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">Questions 1-7</h2>

            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-7 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              The history of frozen food
            </h1>
            <h2 className="text-xl font-bold mt-6">
              2,000 years ago, South America
            </h2>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  People conserved the nutritional value of
                </span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                , using a method of freezing then drying.
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-xl font-bold mt-6">1851, USA</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block"></span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                was kept cool by ice during transportation in specially adapted
                trains
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-xl font-bold mt-6">1880, Australia</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">Two kinds of</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                were the first frozen foods shipped to England.
              </li>
            </ul>
            {/* Inner list with squares */}
            <h2 className="text-xl font-bold mt-6">1917 onwards, USA</h2>

            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                Clarence Birdseye introduced innovations including:
              </li>

              <li className=" text-lg ">
                <span className=" inline-block">
                  quick-freezing methods, so that
                </span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[4]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  4
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                did not spoil the food
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">packaging products with</span>
                <button
                  onClick={() => toggleButton(5)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                , so the product was visible.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6">Early 1940s, USA</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  Frozen food became popular because of a shortage of
                </span>
                <button
                  onClick={() => toggleButton(6)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[6]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  6
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
              </li>
            </ul>
            <h2 className="text-xl font-bold mt-6">1950s, USA</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  A large number of homes now had a
                </span>
                <button
                  onClick={() => toggleButton(7)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[7]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  7
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 8-13 </h2> <br />
          <h3 className="text-xl font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 8-13 on your answer sheet, choose
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">TRUE</span>if the statement
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
          </h3>
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
                                                             activeNumbers[
                                                               qIndex
                                                             ]
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
                      className="flex items-center gap-2 text-xl cursor-pointer"
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

export default Test3Reading;
