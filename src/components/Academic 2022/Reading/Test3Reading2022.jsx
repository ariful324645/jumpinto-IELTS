import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test3Reading2022 = () => {
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
    "Significant numbers of thylacines were killed by humans from the 1830s onwards.",
    "Several thylacines were born in zoos during the late 1800s.",
    "John Gould's prediction about the thylacine surprised some biologists.",
    "In the early 1900s, many scientists became worried about the possible extinction of the thylacine.",
    "T. T. Flynn's proposal to rehome captive thylacines on an island proved to be impractical.",
    "There were still reasonable numbers of thylacines in existence when a piece of legislation protecting the species during their breeding season was passed.",
    "From 1930 to 1936, the only known living thylacines were all in captivity.",
    "Attempts to find living thylacines are now rarely made.",
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

          <h1 className="text-2xl font-bold text-center">The thylacine</h1>

          <p className="text-lg">
            The extinct thylacine, also known as the Tasmanian tiger, was a
            marsupial* that bore a superficial resemblance to a dog.Its most
            distinguishing feature was the 13-19 dark brown stripes over its
            back, beginning at the rear of the body and extending onto the
            tail.The thylacine's average nose-to-tail length for adult males was
            162.6 cm, compared to 153.7 cm for females.
          </p>
          <p className="text-lg">
            The thylacine appeared to occupy most types of terrain except dense
            rainforest, with open eucalyptus forest thought to be its prime
            habitat.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              In terms of feeding, it was exclusively carnivorous, and its
              stomach was muscular with an ability to distend so that it could
              eat large amounts of food at one time, probably an adaptation to
              compensate for long periods when hunting was unsuccessful and food
              scarce.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            The thylacine was not a fast runner and probably caught its prey by
            exhausting it during a long pursuit.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              During long-distance chases, thylacines were likely to have relied
              more on scent than any other sense.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
            They emerged to hunt during the evening, night and early morning and
            tended to retreat to the hills and forest for shelter during the
            day.Despite the common name 'tiger', the thylacine had a shy,
            nervous temperament.Although mainly nocturnal, it was sighted moving
            during the day and some individuals were even recorded basking in
            the sun.
          </p>
          <p className="text-lg">
            The thylacine had an extended breeding season from winter to spring,
            with indications that some breeding took place throughout the
            year.The thylacine, like all marsupials, was tiny and hairless when
            born.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Newborns crawled into the pouch on the belly of their mother, and
              attached themselves to one of the four teats, remaining there for
              up to three months.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
            When old enough to leave the pouch, the young stayed in a lair such
            as a deep rocky cave, well-hidden nest or hollow log, whilst the
            mother hunted. Approximately 4,000 years ago, the thylacine was
            widespread throughout New Guinea and most of mainland Australia, as
            well as the island of Tasmania.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The most recent, well-dated occurrence of a thylacine on the
              mainland is a carbon-dated fossil from Murray Cave in Western
              Australia, which is around 3,100 years old.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
            Its extinction coincided closely with the arrival of wild dogs
            called dingoes in Australia and a similar predator in New
            Guinea.Dingoes never reached Tasmania, and most scientists see this
            as the main reason for the thylacine's survival there.
          </p>
          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The dramatic decline of the thylacine in Tasmania, which began in
              the 1830s and continued for a century, is generally attributed to
              the relentless efforts of sheep farmers and bounty hunters* with
              shotguns.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
            While this determined campaign undoubtedly played a large part, it
            is likely that various other factors also contributed to the decline
            and eventual extinction of the species.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              These include competition with wild dogs introduced by European
              settlers, loss of habitat along with the disappearance of prey
              species, and a distemper-like disease which may also have affected
              the thylacine.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
            <br /> <br />
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There was only one successful attempt to breed a thylacine in
              captivity, at Melbourne Zoo in 1899.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
            This was despite the large numbers that went through some zoos,
            particularly London Zoo and Tasmania's Hobart Zoo.The famous
            naturalist John Gould foresaw the thylacine's demise when he
            published his Mammals of Australia between 1848 and 1863, writing,
            "The numbers of this singular animal will speedily diminish,
            extermination will have its full sway, and it will then, like the
            wolf of England and Scotland, be recorded as an animal of the past."
          </p>
          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              However, there seems to have been little public pressure to
              preserve the thylacine, nor was much concern expressed by
              scientists at the decline of this species in the decades that
              followed.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
            A notable exception was T.T. Flynn, Professor of Biology at the
            University of Tasmania.In 1914, he was sufficiently concerned about
            the scarcity of the thylacine to suggest that some should be
            captured and placed on a small island.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              However, there seems to have been little public pressure to
              preserve the thylacine, nor was much concern expressed by
              scientists at the decline of this species in the decades that
              followed.9But it was not until 1929, with the species on the very
              edge of extinction, that Tasmania's Animals and Birds Protection
              Board passed a motion protecting thylacines only for the month of
              December, which was thought to be their prime breeding season.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  11
                </span>
              )}
              The last known wild thylacine to be killed was shot by a farmer in
              the north-east of Tasmania in 1930, leaving just captive
              specimens.12
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  12
                </span>
              )}
            </span>
            Official protection of the species by the Tasmanian government was
            introduced in July 1936, 59 days before the last known individual
            died in Hobart Zoo on 7th September, 1936.
          </p>
          <p className="text-lg">
            There have been numerous expeditions and searches for the thylacine
            over the years, none of which has produced definitive evidence that
            thylacines still exist.The species was declared extinct by the
            Tasmanian government in 1986.
          </p>

          <hr className="border border-gray-400 border-dotted" />
          <p className="text-lg">
            * marsupial: a mammal, such as a kangaroo, whose young are born
            incompletely developed and are typically carried and suckled in a
            pouch on the mother's belly * bounty hunters: people who are paid a
            reward for killing a wild animal
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
              The thylacine
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Appearance and behaviour</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">looked rather like a dog</li>
              <li className="text-lg">
                had a series of stripes along its body and tail
              </li>
              <li className="text-lg">
                <span>ate an entirely</span>
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
                <span>diet.</span>
              </li>
              <li className="text-lg">
                <span>probably depended mainly on</span>
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
                <span>when hunting.</span>
              </li>
              <li className="text-lg">
                <span>
                  young spent first months of life inside its mother's
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
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Decline and extinction</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>
                  last evidence in mainland Australia is a 3,100-year-old
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
                <span></span>
              </li>
              <li className="text-lg">
                probably went extinct in mainland Australia due to animals known
                as dingoes
              </li>
              <li className="text-lg">
                <span>reduction in</span>
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
                <span>
                  and available sources of food were partly responsible for
                  decline in Tasmania.
                </span>
              </li>
         
            </ul>

            {/* ---------- Section 3 ---------- */}
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
                    {qIndex + 6}
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

export default Test3Reading2022;
