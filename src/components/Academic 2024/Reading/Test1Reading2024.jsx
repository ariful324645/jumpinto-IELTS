import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test1Reading2024 = () => {
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
    "People had expected Andy Murray to become the world's top tennis player for at least five years before 2016.",
    "The change that Andy Murray made to his rackets attracted a lot of attention.",
    "Most of the world's top players take a professional racket stringer on tour with them.",
    "Mike and Bob Bryan use rackets that are light in comparison to the majority of rackets..",
    "Werner Fischer played with a spaghetti-strung racket that he designed himself.",
    "The weather can affect how professional players adjust the strings on their rackets.",
    "It was believed that the change Pete Sampras made to his rackets contributed to his strong serve.",
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
            How tennis rackets have changed
          </h1>

          <p className="text-lg">
            In 2016, the British professional tennis player Andy Murray was
            ranked as the world's number one.It was an incredible achievement by
            any standard - made even more remarkable by the fact that he did
            this during a period considered to be one of the strongest in the
            sport's history, competing against the likes of Rafael Nadal, Roger
            Federer and Novak Djokovic, to name just a few.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Yet five years previously, he had been regarded as a talented
                outsider who entered but never won the major tournaments.(1)
              </span>
            )}
          </p>
          <p className="text-lg">
            Of the changes that account for this transformation, one was visible
            and widely publicised: in 2011, Murray invited former number one
            player Ivan Lendl onto his coaching team - a valuable addition that
            had a visible impact on the player's playing style.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Another change was so subtle as to pass more or less unnoticed.
                (2)
              </span>
            )}
            Like many players, Murray has long preferred a racket that consists
            of two types of string: one for the mains (verticals) and another
            for the crosses (horizontals).While he continued to use natural
            string in the crosses, in 2012 he switched to a synthetic string for
            the mains.A small change, perhaps, but its importance should not be
            underestimated.
          </p>
          <p className="text-lg">
            The modification that Murray made is just one of a number of options
            available to players looking to tweak their rackets in order to
            improve their games."Touring professionals have their rackets
            customised to their specific needs," says Colin Triplow, a UK-based
            professional racket stringer."It's a highly important part of
            performance maximisation."Consequently, the specific rackets used by
            the world's elite are not actually readily available to the public;
            rather, each racket is individually made to suit the player who uses
            it.Take the US professional tennis players Mike and Bob Bryan, for
            example: "We're very particular with our racket specifications,"
            they say."All our rackets are sent from our manufacturer to Tampa,
            Florida, where our frames go through a... thorough customisation
            process.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                "They explain how they have adjusted not only racket length, but
                even experimented with different kinds of paint. (8)
              </span>
            )}
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The rackets they use now weigh more than the average model and
                also have a denser string pattern (i.e. more crosses and
                mains).(4)
              </span>
            )}
          </p>
          <p className=" text-lg">
            The primary reason for these modifications is simple: as the line
            between winning and losing becomes thinner and thinner, even these
            slight changes become more and more important.As a result, players
            and their teams are becoming increasingly creative with the
            modifications to their rackets as they look to maximise their
            competitive advantage.
          </p>
          <p className="text-lg">
            Racket modifications mainly date back to the 1970s, when the amateur
            German tennis player Werner Fischer started playing with the
            so-called spaghetti-strung racket.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It created a string bed that generated so much topspin that it
                was quickly banned by the International Tennis Federation. (9)
              </span>
            )}
            However, within a decade or two, racket modification became a
            regularity.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Today it is, in many ways, an aspect of the game that is equal
                in significance to nutrition or training. (10)
              </span>
            )}
          </p>

          <p className="text-lg">
            Modifications can be divided into two categories: those to the
            string bed and those to the racket frame.The former is far more
            common than the latter: the choice of the strings and the tension
            with which they are installed is something that nearly all
            professional players experiment with.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                They will continually change it depending on various factors
                including the court surface, climatic conditions, and game
                styles.(6)
              </span>
            )}
            Some will even change it depending on how they feel at the time.
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                At one time, all tennis rackets were strung with natural gut
                made from the outer layer of sheep or cow intestines.(11)
              </span>
            )}
            This all changed in the early 1990s with the development of
            synthetic strings that were cheaper and more durable.They are made
            from three materials: nylon (relatively durable and affordable),
            Kevlar (too stiff to be used alone) or co-polyester (polyester
            combined with additives that enhance its performance).Even so, many
            professional players continue to use a "hybrid set-up", where a
            combination of both synthetic and natural strings are used.
          </p>

          <p className="text-lg">
            Of the synthetics, co-polyester is by far the most widely used.It's
            a perfect fit for the style of tennis now played, where players tend
            to battle it out from the back of the court rather than coming to
            the net.Studies indicate that the average spin from a co-polyester
            string is 25% greater than that from natural string or other
            synthetics.In a sense, the development of co-polyester strings has
            revolutionised the game.
          </p>

          <p className="text-lg">
            As a result, during 1980-97, the surviving population was evacuated
            to three island sanctuaries: Codfish Island, Maud Island and Little
            Barrier Island.However, breeding success was hard to achieve.Rats
            were found to be a major predator of kākāpō chicks and an
            insufficient number of chicks survived to offset adult mortality.By
            1995, although at least 12 chicks had been produced on the islands,
            only three had survived.The kākāpō population had dropped to 51
            birds.The critical situation prompted an urgent review of kākāpō
            management in New Zealand.
          </p>
          <p className="text-lg">
            However, many players go beyond these basic adjustments to the
            strings and make changes to the racket frame itself.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                For example, much of the serving power of US professional player
                Pete Sampras was attributed to the addition of four to five lead
                weights onto his rackets, and today many professionals have the
                weight adjusted during the manufacturing process.(7),(12)
              </span>
            )}
          </p>
          <p className="text-lg">
            After the first five years of the Recovery Plan, the population was
            on target.By 2000, five new females had been produced, and the total
            population had grown to 62 birds.For the first time, there was
            cautious optimism for the future of kākāpō and by June 2020, a total
            of 210 birds was recorded.
          </p>
          <p className="text-lg">
            Today, kākāpō management continues to be guided by the kākāpō
            Recovery Plan.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Its key goals are: minimise the loss of genetic diversity in the
                kākāpō population, restore or maintain sufficient habitat to
                accommodate the expected increase in the kākāpō population, and
                ensure stakeholders continue to be fully engaged in the
                preservation of the species.(13)
              </span>
            )}
          </p>
          <p className="text-lg">
            Racket customisation and modification have pushed the standards of
            the game to greater levels that few could have anticipated in the
            days of natural strings and heavy, wooden frames, and it's exciting
            to see what further developments there will be in the future.
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
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">Questions 8–13</h2>

            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 8–13 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              The tennis racket and how it has changed
            </h1>

            {/* ---------- Section 1 ---------- */}

        
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg ">
                <span>Mike and Bob Bryan made changes to the types of</span>
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
                <span>used on their racket frames.</span>
              </li>

              <li className="text-lg ">
                <span>
                  Players were not allowed to use the spaghetti-strung racket
                  because of the amount of
                </span>
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
                <span>it created.</span>
              </li>

              <li className="text-lg">
                <span>
                  Changes to rackets can be regarded as being as important as
                  players' diets or the
                </span>
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
                <span>they do.</span>
              </li>

              <li className="text-lg ">
                <span>
                  All rackets used to have natural strings made from the
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>of animals.</span>
              </li>

              <li className="text-lg ">
                <span>Pete Sampras had metal</span>
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
                <span>put into the frames of his rackets.</span>
              </li>

              <li className="text-lg ">
                <span>Gonçalo Oliveira changed the</span>
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
                <span>on his racket handles.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Reading2024;
