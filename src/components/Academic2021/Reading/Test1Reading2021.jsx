import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test1Reading2021= () => {
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
    "Polar bears suffer from various health problems due to the build-up of fat under their skin.",
    "The study done by Liu and his colleagues compared different groups of polar bears.",
    "Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.",
    "Polar bears are able to control their levels of bad' cholesterol by genetic means.",
    "Female polar bears are able to survive for about six months without food.",
    "It was found that the bones of female polar bears were very weak when they came out of their dens in spring.",
    "The polar bear's mechanism for increasing bone density could also be used by people one day.",
  
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
            <h1 className="text-2xl font-bold mb-5 text-center">
              Why we need to protect polar bears
            </h1>

            <p className="text-lg">
              Polar bears are being increasingly threatened by the effects of
              climate change, but their disappearance could have far-reaching
              consequences. They are uniquely adapted to the extreme conditions
              of the Arctic Circle, where temperatures can reach -40°C. One
              reason for this is that they have up to 11 centimetres of fat
              underneath their skin. Humans with comparative levels of adipose
              tissue would be considered obese and would be likely to suffer
              from diabetes and heart disease.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Yet the polar bear experiences no such consequences.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>
            <br />
            <p className="text-lg">
              A 2014 study by Shi Ping Liu and colleagues sheds light on this
              mystery.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                They compared the genetic structure of polar bears with that of
                their closest relatives from a warmer climate, the brown bears.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
              This allowed them to determine the genes that have allowed polar
              bears to survive in one of the toughest environments on Earth.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Liu and his colleagues found the polar bears had a gene known as
                APoB, which reduces levels of low-density lipoproteins (LDLs) -
                a form of 'bad' cholesterol.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              In humans, mutations of this gene are associated with increased
              risk of heart disease. Polar bears may therefore be an important
              study model to understand heart disease in humans.
            </p>
            <br />
            <p className="text-lg">
              The genome of the polar bear may also provide the solution for
              another condition, one that particularly affects our older
              generation: osteoporosis. This is a disease where bones show
              reduced density, usually caused by insufficient exercise, reduced
              calcium intake or food starvation. Bone tissue is constantly being
              remodelled, meaning that bone is added or removed, depending on
              nutrient availability and the stress that the bone is under.
              Female polar bears, however, undergo extreme conditions during
              every pregnancy. Once autumn comes around, these females will dig
              maternity dens in the snow and will remain there throughout the
              winter, both before and after the birth of their cubs.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                This process results in about six months of fasting, where the
                female bears have to keep themselves and their cubs alive,
                depleting their own calcium and calorie reserves.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              Despite this, their bones remain strong and dense.
            </p>
            <br />
            <p className="text-lg">
              Physiologists Alanda Lennox and Allen Goodship found an
              explanation for this paradox in 2008. They discovered that
              pregnant bears were able to increase the density of their bones
              before they started to build their dens.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                In addition, six months later, when they finally emerged from
                the den with their cubs, there was no evidence of significant
                loss of bone density.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
              Hibernating brown bears do not have this capacity and must
              therefore resort to major bone reformation in the following
              spring.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                If the mechanism of bone remodelling in polar bears can be
                understood, many bedridden humans, and even astronauts, could
                potentially benefit.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>
            <br />
            <p className="text-lg">
              The medical benefits of the polar bear for humanity certainly have
              their importance in our conservation efforts, but these should not
              be the only factors taken into consideration. We tend to want to
              protect animals we think are intelligent and possess emotions,
              such as elephants and primates.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                Bears, on the other hand, seem to be perceived as stupid and in
                many cases violent.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              And yet anecdotal evidence from the field challenges those
              assumptions, suggesting for example that polar bears have good
              problem-solving abilities.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                A male bear called GoGo in Tennoji Zoo, Osaka, has even been
                observed making use of a tool to manipulate his environment.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                The bear used a tree branch on multiple occasions to dislodge a
                piece of meat hung out of his reach.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              Problem-solving ability has also been witnessed in wild polar
              bears, although not as obviously as with GoGo.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                A calculated move by a male bear involved running and jumping
                onto barrels in an attempt to get to a photographer standing on
                a platform four metres high.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
            </p>
            <br />
            <p className="text-lg">
              In other studies, such as one by Alison Ames in 2008, polar bears
              showed deliberate and focused manipulation.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                For example, Ames observed bears putting objects in piles and
                then knocking them over in what appeared to be a game.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
              The study demonstrates that bears are capable of agile and
              thought-out behaviours. These examples suggest bears have greater
              creativity and problem-solving abilities than previously thought.
            </p>
            <br />
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                As for emotions, while the evidence is once again anecdotal,
                many bears have been seen to hit out at ice and snow—seemingly
                out of frustration—when they have just missed out on a kill.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
              Moreover, polar bears can form unusual relationships with other
              species, including playing with the dogs used to pull sleds in the
              Arctic. Remarkably, one hand-raised polar bear called Agee has
              formed a close relationship with her owner Mark Dumas to the point
              where they even swim together. This is even more astonishing since
              polar bears are known to actively hunt humans in the wild.
            </p>
            <br />
            <p className="text-lg">
              If climate change were to lead to their extinction, this would
              mean not only the loss of potential breakthroughs in human
              medicine, but more importantly, the disappearance of an
              intelligent, majestic animal.
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

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-6 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              Reasons why polar bears should be protected
            </h1>

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>People think of bears as unintelligent and</span>
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
                <span></span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              However, this may not be correct. For example:
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  In Tennoji Zoo, a bear has been seen using a branch as a
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
                <span>.</span>
              </li>

              <li className="text-lg">
                <span>This allowed him to knock down some</span>
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
                <span>
                  A wild polar bear worked out a method of reaching a platform
                  where a
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
                <span>was located.</span>
              </li>
              <li className="text-lg">
                <span>
                  Polar bears have displayed behaviour such as conscious
                  manipulation of objects and activity similar to a
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
            </ul>

            {/* ---------- Section 3 ---------- */}

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <h2 className="text-lg font-bold mt-6">
                Bears may also display emotions. For example:
              </h2>
              <li className="text-lg">
                <span>They may make movements suggesting</span>
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
                <span>if disappointed when hunting.</span>
              </li>
              <li className="text-lg">
                They may form relationships with other species.
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 6-13 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 6-13 on your answer sheet, choose
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

export default Test1Reading2021;
