import React, { useState } from "react";
import { IoBookSharp } from "react-icons/io5";

const Test1Reading = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

 

  const questions = [
    "There are other parrots that share the kakapo's inability to fly.",
    "Adult kakapo produce chicks every year.",
    "Adult male kakapo bring food back to nesting females.",
    "The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.",
    "Kakapo were transferred from Rakiura Island to other locations because they were at risk from feral cats.",
    "One Recovery Plan initiative that helped increase the kakapo population size was caring for struggling young birds.",
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
          <h1 className="text-3xl font-bold text-center">The kākāpō</h1>

          <h1 className="text-2xl  italic font-bold text-center">
            The kākāpō is a nocturnal, flightless parrot that is critically
            endangered and one of New Zealand's unique treasures
          </h1>

          <p className="text-2xl">
            The kākāpō, also known as the owl parrot, is a large,
            forest-dwelling bird, with a pale owl-like face.Up to 64 cm in
            length, it has predominantly yellow-green feathers, forward-facing
            eyes, a large grey beak, large blue feet, and relatively short wings
            and tail.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                It is the world's only flightless parrot, and is also possibly
                one of the world's longest-living birds, with a reported
                lifespan of up to 100 years. (1)
              </span>
            )}
          </p>
          <p className="text-2xl">
            Kākāpō are solitary birds and tend to occupy the same home range for
            many years.They forage on the ground and climb high into trees.They
            often leap from trees and flap their wings, but at best manage a
            controlled descent to the ground.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                They are entirely vegetarian, with their diet including the
                leaves, roots and bark of trees as well as bulbs, and fern
                fronds. (7)
              </span>
            )}
          </p>
          <p className="text-2xl">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Kākāpō breed in summer and autumn, but only in years when food
                is plentiful. (2)
              </span>
            )}
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Males play no part in incubation or chick-rearing - females
                alone incubate eggs and feed the chicks (3)
              </span>
            )}
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The 1-4 eggs are laid in soil, which is repeatedly turned over
                before and during incubation.(8)
              </span>
            )}
            The female kākāpō has to spend long periods away from the nest
            searching for food, which leaves the unattended eggs and chicks
            particularly vulnerable to predators.
          </p>
          <p className="text-2xl">
            Before humans arrived, kākāpō were common throughout New Zealand's
            forests.However, this all changed with the arrival of the first
            Polynesian settlers about 700 years ago.For the early settlers, the
            flightless kākāpō was easy prey.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                They ate its meat and used its feathers to make soft cloaks. (9)
              </span>
            )}
            With them came the Polynesian dog and rat, which also preyed on
            kākāpō.By the time European colonisers arrived in the early 1800s,
            kākāpō had become confined to the central North Island and forested
            parts of the South Island.The fall in kākāpō numbers was accelerated
            by European colonisation.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                A great deal of habitat was lost through forest clearance, and
                introduced species such as deer depleted the remaining forests
                of food. (10)
              </span>
            )}
            Other predators such as cats, stoats and two more species of rat
            were also introduced.The kākāpō were in serious trouble.
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
            From 1949 to 1973, the newly formed New Zealand Wildlife Service
            made over 60 expeditions to find kākāpō, focusing mainly on
            Fiordland.Six were caught, but there were no females amongst them
            and all but one died within a few months of captivity.In 1974, a new
            initiative was launched, and by 1977, 18 more kākāpō were found in
            Fiordland.However, there were still no females.In 1977, a large
            population of males was spotted in Rakiura - a large island free
            from stoats, ferrets and weasels.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                There were about 200 individuals, and in 1980 it was confirmed
                females were also present.(11)
              </span>
            )}
            These birds have been the foundation of all subsequent work in
            managing the species.
          </p>
          <p className="text-2xl">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Unfortunately, predation by feral cats on Rakiura Island led to
                a rapid decline in kākāpō numbers.(5)
              </span>
            )}
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
          <p className="text-2xl">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In 1996, a new Recovery Plan was launched, together with a
                specialist advisory group called the Kākāpō Scientific and
                Technical Advisory Committee and a higher amount of funding.(12)
              </span>
            )}
            Renewed steps were taken to control predators on the three
            islands.Cats were eradicated from Little Barrier Island in 1980, and
            possums were eradicated from Codfish Island by 1986.However, the
            population did not start to increase until rats were removed from
            all three islands, and the birds were more intensively managed.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                This involved moving the birds between islands, supplementary
                feeding of adults and rescuing and hand-raising any failing
                chicks.(6)
              </span>
            )}
          </p>
          <p className="text-2xl">
            After the first five years of the Recovery Plan, the population was
            on target.By 2000, five new females had been produced, and the total
            population had grown to 62 birds.For the first time, there was
            cautious optimism for the future of kākāpō and by June 2020, a total
            of 210 birds was recorded.
          </p>
          <p className="text-2xl">
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
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <h2 className="text-2xl font-bold mb-3">Questions 1-6 </h2> <br />
          <h3 className="text-xl font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 1-6 on your answer sheet, choose
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
                    {qIndex + 1}
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
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-2xl font-bold mb-3">Questions 7–13</h2>

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
            <h1 className="text-2xl font-bold text-center mb-4">
              New Zealand's kakapo
            </h1>
            <h2 className="text-xl font-bold mt-6">A type of parrot</h2>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-2xl ">
                <span className=" inline-block">
                  diet consists of fern fronds, various parts of a tree and
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
              <li className=" text-2xl ">
                <span className=" inline-block">nests are created in</span>
                <button
                  onClick={() => toggleButton(8)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[8]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  8
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                where eggs are laid
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-xl font-bold mt-6">
              Arrival of Polynesian settlers
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-2xl ">
                <span className=" inline-block">the</span>
                <button
                  onClick={() => toggleButton(9)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[9]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  9
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                of the kakapo were used to make clothes
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-xl font-bold mt-6">
              Arrival of European colonisers
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-2xl ">
                <span className=" inline-block">the</span>
                <button
                  onClick={() => toggleButton(10)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[10]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  10
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                were an animal which they introduced that ate the kakapo's food
                sources
              </li>
            </ul>
            {/* Inner list with squares */}
            <h2 className="text-xl font-bold mt-6">Protecting kakapo</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-2xl">
                Richard Henry, a conservationist, tried to protect the kakapo
              </li>

              <li className=" text-2xl ">
                <span className=" inline-block">
                  a definite sighting of female kakapo on Rakiura Island was
                  reported in the year
                </span>
                <button
                  onClick={() => toggleButton(11)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[11]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  11
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
              </li>
              <li className=" text-2xl ">
                <span className=" inline-block">
                  the Recovery Plan included an increase in
                </span>
                <button
                  onClick={() => toggleButton(12)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[12]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  12
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
              </li>
              <li className=" text-2xl ">
                <span className=" inline-block">
                  a current goal of the Recovery Plan is to maintain the
                  involvement of
                </span>
                <button
                  onClick={() => toggleButton(13)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[13]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  13
                </button>
                <input
                  className="ml-3 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                  placeholder=""
                />
                in kakapo protection
              </li>
            </ul>

   
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Reading;
