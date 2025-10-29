import React, { useState } from "react";
import { IoBookSharp } from "react-icons/io5";

const Test2Reading = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

  const questions = [
    "West Indian manatees can be found in a variety of different aquatic habitats.",
    "The Florida manatee lives in warmer waters than the Antillean manatee.",
    "The African manatee's range is limited to coastal waters between the West African countries of Mauritania and Angola.",
    "The extent of the loss of Amazonian manatees in the mid-twentieth century was only revealed many years later.",
    "It is predicted that West Indian manatee populations will fall in the coming decades.",
    "The risk to manatees from entanglement and plastic consumption increased significantly in the period 2009-2020.",
    "There is some legislation in place which aims to reduce the likelihood of boat strikes on manatees in Florida.",
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
            <h1 className="text-3xl font-bold">PASSAGE 1</h1>
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
              <span className="text-2xl font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-3xl font-bold text-center">Manatees</h1>

          <p className="text-2xl">
            Manatees, also known as sea cows, are aquatic mammals that belong to
            a group of animals called Sirenia.This group also contains
            dugongs.Dugongs and manatees look quite alike - they are similar in
            size, colour and shape, and both have flexible flippers for
            forelimbs.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                However, the manatee has a broad, rounded tail, whereas the
                dugong's is fluked, like that of a whale.(1)
              </span>
            )}
            There are three species of manatees: the West Indian manatee
            ("Trichechus manatus"), the African manatee ("Trichechus
            senegalensis") and the Amazonian manatee ("Trichechus inunguis").
          </p>
          <p className="text-2xl">
            Unlike most mammals, manatees have only six bones in their neck -
            most others, including humans and giraffes, have seven.This short
            neck allows a manatee to move its head up and down, but not side to
            side.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                To see something on its left or its right, a manatee must turn
                its entire body, steering with its flippers. (2)
              </span>
            )}
            Manatees have pectoral flippers but no back limbs, only a tail for
            propulsion.They do have pelvic bones, however - a leftover from
            their evolution from a four-legged to a fully aquatic
            animal.Manatees share some visual similarities to elephants.Like
            elephants, manatees have thick, wrinkled skin.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                They also have some hairs covering their bodies which help them
                sense vibrations in the water around them.(3)
              </span>
            )}
          </p>
          <p className="text-2xl">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Seagrasses and other marine plants make up most of a manatee's
                diet.(4)
              </span>
            )}
            Manatees spend about eight hours each day grazing and uprooting
            plants.They eat up to 15% of their weight in food each day.African
            manatees are omnivorous - studies have shown that molluscs and fish
            make up a small part of their diets.West Indian and Amazonian
            manatees are both herbivores.
          </p>
          <p className="text-2xl">
            Manatees' teeth are all molars - flat, rounded teeth for grinding
            food.Due to manatees' abrasive aquatic plant diet, these teeth get
            worn down and they eventually fall out, so they continually grow new
            teeth that get pushed forward to replace the ones they lose.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Instead of having incisors to grasp their food, manatees have
                lips which function like a pair of hands to help tear food away
                from the seafloor. (5)
              </span>
            )}
          </p>

          <p className="text-2xl">
            In 1894, the New Zealand government launched its first attempt to
            save the kākāpō.Conservationist Richard Henry led an effort to
            relocate several hundred of the birds to predator-free Resolution
            Island in Fiordland.Unfortunately, the island didn't remain predator
            free - stoats arrived within six years, eventually destroying the
            kākāpō population.By the mid-1900s, the kākāpō was practically a
            lost species.Only a few clung to life in the most isolated parts of
            New Zealand.
          </p>
          <p className="text-2xl">
            Manatees are fully aquatic, but as mammals, they need to come up to
            the surface to breathe.When awake, they typically surface every two
            to four minutes, but they can hold their breath for much
            longer.Adult manatees sleep underwater for 10-12 hours a day, but
            they come up for air every 15-20 minutes.Active manatees need to
            breathe more frequently.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It's thought that manatees use their muscular diaphragm and
                breathing to adjust their buoyancy.(6)
              </span>
            )}
            They may use diaphragm contractions to compress and store gas in
            folds in their large intestine to help them float. These birds have
            been the foundation of all subsequent work in managing the species.
          </p>
          <p className="text-2xl">
            The West Indian manatee reaches about 3.5 metres long and weighs on
            average around 500 kilogrammes.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It moves between fresh water and salt water, taking advantage of
                coastal mangroves and coral reefs, rivers, lakes and inland
                lagoons.(7)
              </span>
            )}
            There are two subspecies of West Indian manatee: the Antillean
            manatee is found in waters from the Bahamas to Brazil, whereas the
            Florida manatee is found in US waters, although some individuals
            have been recorded in the Bahamas.In winter, the Florida manatee is
            typically restricted to Florida.When the ambient water temperature
            drops below 20ºC, it takes refuge in naturally and artificially
            warmed water, such as at the warm-water outfalls from powerplants.
          </p>
          <p className="text-2xl">
            The African manatee is also about 3.5 metres long and found in the
            sea along the west coast of Africa, from Mauritania down to Angola.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The species also makes use of rivers, with the mammals seen in
                landlocked countries such as Mali and Niger.(9)
              </span>
            )}
          </p>
          <p className="text-2xl">
            The Amazonian manatee is the smallest species, though it is still a
            big animal.It grows to about 2.5 metres long and 350
            kilogrammes.Amazonian manatees favour calm, shallow waters that are
            above 23ºC. This species is found in fresh water in the Amazon Basin
            in Brazil, as well as in Colombia, Ecuador and Peru.All three
            manatee species are endangered or at a heightened risk of
            extinction.The African manatee and Amazonian manatee are both listed
            as Vulnerable by the International Union for Conservation of Nature
            (IUCN).It is estimated that 140,000 Amazonian manatees were killed
            between 1935 and 1954 for their meat, fat and skin, with the latter
            used to make leather.In more recent years, African manatee decline
            has been tied to incidental capture in fishing nets and
            hunting.Manatee hunting is now illegal in every country the African
            species is found in.
          </p>
          <p className="text-2xl">
            The two subspecies of West Indian manatee are listed as Endangered
            by the IUCN.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Both are also expected to undergo a decline of 20% over the next
                40 years.(11)
              </span>
            )}
            A review of almost 1,800 cases of entanglement in fishing nets and
            of plastic consumption among marine mammals in US waters from 2009
            to 2020 found that at least 700 cases involved manatees.The chief
            cause of death in Florida manatees is boat strikes.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                However, laws in certain parts of Florida now limit boat speeds
                during winter, allowing slow-moving manatees more time to
                respond.(13)
              </span>
            )}
          </p>
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-2xl font-bold mb-3">Questions 1-6</h2>

            <h3 className="text-2xl font-semibold mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-2xl font-semibold">
              Write your answers in boxes 7–13 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Manatees</h1>
            <h2 className="text-xl font-bold mt-6">Appearance</h2>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-2xl ">
                <span className=" inline-block">
                  look similar to dugongs, but with a differently shaped
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
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-xl font-bold mt-6">Movement</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-2xl">
                have fewer neck bones than most mammals
              </li>
              <li className=" text-2xl ">
                <span className=" inline-block">need to use their</span>
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
                to help to turn their bodies around in order to look sideways
              </li>
              <li className=" text-2xl ">
                <span className=" inline-block">
                  sense vibrations in the water by means of
                </span>
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
                on their skin
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-xl font-bold mt-6">Feeding</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-2xl ">
                <span className=" inline-block">
                  eat mainly aquatic vegetation, such as
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
              </li>
              <li className=" text-2xl ">
                <span className=" inline-block">
                  grasp and pull up plants with their
                </span>
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
              </li>
            </ul>
            {/* Inner list with squares */}
            <h2 className="text-xl font-bold mt-6">Breathing</h2>

            <ul className="list-disc list-inside space-y-2">
              <li className="text-2xl">
                {" "}
                come to the surface for air every 2-4 minutes when awake and
                every 15-20 while sleeping
              </li>

              <li className=" text-2xl ">
                <span className=" inline-block">may regulate the</span>
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
                of their bodies by using muscles of diaphragm to store air
                internally
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-2xl font-bold mb-3">Questions 7-13 </h2> <br />
          <h3 className="text-xl font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 7-13 on your answer sheet, choose
          </h3>
          <h3 className="flex gap-5 text-2xl">
            {" "}
            <span className="text-2xl font-bold">TRUE</span> if the statement
            agrees with the information
          </h3>
          <h3 className="flex gap-5 text-2xl">
            {" "}
            <span className="text-2xl font-bold">FALSE</span>if the statement
            contradicts the information
          </h3>
          <h3 className="flex gap-5 text-2xl">
            {" "}
            <span className="text-2xl font-bold">NOT GIVEN</span> if there is no
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
                              w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-300
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
                  <h1 className="text-2xl">{q}</h1>
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

export default Test2Reading;
