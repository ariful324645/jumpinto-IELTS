import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading2024 = () => {
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
    "Forty years ago, there were fewer butterflies in Britain than at present.",
    "Caterpillars are eaten by a number of different predators.",
    "'Phenology' is a term used to describe a creature's ability to alter the location of a lifecycle event.",
    "Some species of butterfly have a reduced lifespan due to spring temperature increases.",
    "There is a clear reason for the adaptations that butterflies are making to climate change.",
    "The weather can affect how professional players adjust the strings on their rackets.",
    "The data used in the study was taken from the work of amateur butterfly watchers.",
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
            The impact of climate change on butterflies in Britain
          </h1>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                According to conservationists, populations of around two thirds
                of butterfly species have declined in Britain over the past 40
                years.(1)
              </span>
            )}
            If this trend continues, it might have unpredictable knock-on
            effects for other species in the ecosystem.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Butterfly eggs develop into caterpillars and these insects,
                which are the second stage in a new butterfly's lifecycle,
                consume vast quantities of plant material, and in turn act as
                prey for birds as well as bats and other small mammals.(2)
              </span>
            )}
            Only by arming themselves with an understanding of why butterfly
            numbers are down can conservationists hope to halt or reverse the
            decline.
          </p>
          <p className="text-lg">
            Butterflies prefer outdoor conditions to be "just right", which
            means neither too hot nor too cold.Under the conditions of climate
            change, the temperature at any given time in summer is generally
            getting warmer, leaving butterflies with the challenge of how to
            deal with this.One of the main ways in which species are ensuring
            conditions suit them is by changing the time of year at which they
            are active and reproduce.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Scientists refer to the timing of such lifecycle events as
                "phenology", so when an animal or plant starts to do something
                earlier in the year than it usually does, it is said to be
                "advancing its phenology". (3)
              </span>
            )}
          </p>
          <p className="text-lg">
            These advances have been observed already in a wide range of
            butterflies - indeed, most species are advancing their phenology to
            some extent.In Britain, as the average spring temperature has
            increased by roughly 0.5°C over the past 20 years, species have
            advanced by between three days and a week on average, to keep in
            line with cooler temperatures.Is this a sign that butterflies are
            well equipped to cope with climate change, and readily adjust to new
            temperatures?Or are these populations under stress, being dragged
            along unwillingly by unnaturally fast changes?
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The answer is still unknown, but a new study is seeking to
                answer these questions. (5)
              </span>
            )}
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                First, the researchers pulled together data from millions of
                records that had been submitted by butterfly enthusiasts -
                people who spend their free time observing the activities of
                different species.(6)
              </span>
            )}
            This provided information on 130 species of butterflies in Great
            Britain every year for a 20-year period.They then estimated the
            abundance and distribution of each species across this time, along
            with how far north in the country they had moved.The data also,
            crucially, allowed researchers to estimate subtle changes in what
            time of the year each species was changing into an adult butterfly.
          </p>

          <p className="text-lg">
            Analysing the trends in each variable, the researchers discovered
            that species with more flexible lifecycles were more likely to be
            able to benefit from an earlier emergence driven by climate
            change.Some species are able to go from caterpillar to butterfly
            twice or more per year, so that the individual butterflies you see
            flying in the spring are the grandchildren or great-grandchildren of
            the individuals seen a year previously.
          </p>

          <p className="text-lg">
            Among these species, researchers observed that those which have been
            advancing their phenology the most over the 20-year study period
            also had the most positive trends in abundance, distribution and
            northwards extent.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                For these species, such as Britain's tiniest butterfly, the
                dainty Small Blue, whose colonies are up to a hundred strong,
                some develop into butterflies early in spring, allowing their
                summer generations to complete another reproductive cycle by
                autumn so that more population growth occurs.(7,8)
              </span>
            )}
          </p>
          <p className="text-lg">
            Other species, however, are less flexible and restricted to a single
            reproductive cycle per year.For these species, there was no evidence
            of any benefit to emerging earlier.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                {" "}
                Indeed, worryingly, it was found that the species in this group
                that specialise in very specific habitat types, often related to
                the caterpillar's preferred diet, actually tended to be most at
                harm from advancing phenology.(10) The beautiful High Brown
                Fritillary, often described as Britain's most endangered
                butterfly, is in this group.(9)
              </span>
            )}
            It is found only in coppiced woodland and limestone pavement
            habitats.It is also a single-generation butterfly that has advanced
            its phenology.This suggests that climate change, while undoubtedly
            not the sole cause, might have played a part in the downfall of this
            species.
          </p>

          <p className="text-lg">
            All is not lost, however.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                {" "}
                Many of Britain's single-generation species show the capacity,
                in continental Europe, to add a second generation in years that
                are sufficiently warm.(11)
              </span>
            )}
            Therefore, as the climate continues to warm, species like the
            Silver-studded Blue might be able to switch to multiple generations
            in the UK as well, and so begin to extract benefits from the
            additional warmth, potentially leading to population increases.
          </p>

          <p className="text-lg">
            More immediately, conservationists can arm themselves with all this
            knowledge to spot the warning signs of species that may be at risk.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The White Admiral of southern England, a much sought-after
                butterfly, experienced a significant increase in numbers from
                the 1920s but has shown a considerable decline in the past 20
                years.(12)This may be because the caterpillar exists solely on a
                diet of a plant called honeysuckle.(13)
              </span>
            )}
            But it is also likely to be due to climate change.
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
          <h2 className="text-lg font-bold mb-3">Questions 1-6 </h2> <br />
          <h3 className="text-lg">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 1-6 on your answer sheet, choose
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
          {/* table above text */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">Questions 7–13</h2>

            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold mr-2">ONE WORD ONLY</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 7–13 on your answer sheet.
            </h1>
            <br />
          </div>
          {/* table */}
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Butterflies in the UK
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">The Small Blue</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>ives in large</span>
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

              <li className="text-lg">
                <span>first appears at the start of</span>
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
                <span>.</span>
              </li>
              <li className="text-lg">
                {" "}
                completes more than one reproductive cycle per year
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              The High Brown Fritillary
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">has one reproductive cycle</li>
              <li className="text-lg">
                <span>is considered to be more</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>than other species.</span>
              </li>

              <li className="text-lg">
                <span>its caterpillars occupy a limited range of</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">The Silver-studded Blue</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  is already able to reproduce twice a year in warm areas of
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
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">The White Admiral</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>s found in</span>
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
                <span>areas of England.</span>
              </li>
              <li className="text-lg">
                <span>both climate chenge and the</span>
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
                <span>of the caterpillar are possible reasons for decline.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Reading2024;
