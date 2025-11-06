import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading2022 = () => {
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
    "Many Madagascan forests are being destroyed by attacks from insects.",
    "Loss of habitat has badly affected insectivorous bats in Madagascar.",
    "Ricardo Rocha has carried out studies of bats in different parts of the world.",
    "Habitat modification has resulted in indigenous bats in Madagascar becoming useful to farmers.",
    "The Malagasy mouse-eared bat is more common than other indigenous bat species in Madagascar.",
    "Bats may feed on paddy swarming caterpillars and grass webworms..",
   
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

          <h1 className="text-2xl font-bold text-center">Bats to the rescue</h1>
          <h3 className="text-xl font-bold italic text-center">
            How Madagascar's bats are helping to save the rainforest
          </h3>

          <p className="text-lg">
            There are few places in the world where relations between
            agriculture and conservation are more strained.Madagascar's forests
            are being converted to agricultural land at a rate of one percent
            every year.Much of this destruction is fuelled by the cultivation of
            the country's main staple crop: rice.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And a key reason for this destruction is that insect pests are
              destroying vast quantities of what is grown by local subsistence
              farmers, leading them to clear forest to create new paddy fields.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            The result is devastating habitat and biodiversity loss on the
            island, but not all species are suffering.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              In fact, some of the island's insectivorous bats are currently
              thriving and this has important implications for farmers and
              conservationists alike.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
          </p>
          <p className="text-lg">
            Enter University of Cambridge zoologist Ricardo Rocha.He's
            passionate about conservation, and bats.More specifically, he's
            interested in how bats are responding to human activity and
            deforestation in particular.Rocha's new study shows that several
            species of bats are giving Madagascar's rice farmers a vital pest
            control service by feasting on plagues of insects.And this, he
            believes, can ease the financial pressure on farmers to turn forest
            into fields. Bats comprise roughly one-fifth of all mammal species
            in Madagascar and thirty-six recorded bat species are native to the
            island, making it one of the most important regions for conservation
            of this animal group anywhere in the world.
          </p>
          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Co-leading an international team of scientists, Rocha found that
              several species of indigenous bats are taking advantage of habitat
              modification to hunt insects swarming above the country's rice
              fields.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
            They include the Malagasy mouse-eared bat, Major's long-fingered
            bat, the Malagasy white-bellied free-tailed bat and Peters'
            wrinkle-lipped bat. "These winner species are providing a valuable
            free service to Madagascar as biological pest suppressors," says
            Rocha.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              "We found that six species of bat are preying on rice pests,
              including the paddy swarming caterpillar and grass webworm.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
            The damage which these insects cause puts the island's farmers under
            huge financial pressure and that encourages deforestation."
          </p>
          <p className="text-lg">
            The study, now published in the journal Agriculture, Ecosystems and
            Environment, set out to investigate the feeding activity of
            insectivorous bats in the farmland bordering the Ranomafana National
            Park in the southeast of the country. Rocha and his team used
            state-of-the-art ultrasonic recorders to record over a thousand bat
            'feeding buzzes' (echolocation sequences used by bats to target
            their prey) at 54 sites, in order to identify the favourite feeding
            spots of the bats.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They next used DNA barcoding techniques to analyse droppings
              collected from bats at the different sites.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
          </p>
          <p className="text-lg">
            The recordings revealed that bat activity over rice fields was much
            higher than it was in continuous forest - seven times higher over
            rice fields which were on flat ground, and sixteen times higher over
            fields on the sides of hills - leaving no doubt that the animals are
            preferentially foraging in these man-made ecosystems.The researchers
            suggest that the bats favour these fields because lack of water and
            nutrient run-off make these crops more susceptible to insect pest
            infestations.DNA analysis showed that all six species of bat had fed
            on economically important insect pests.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              While the findings indicated that rice farming benefits most from
              the bats, the scientists also found indications that the bats were
              consuming pests of other crops, including the black twig borer
              (which infests coffee plants), the sugarcane cicada, the macadamia
              nut-borer, and the sober tabby (a pest of citrus fruits).
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
          </p>
          <p className="text-lg">
            "The effectiveness of bats as pest controllers has already been
            proven in the USA and Catalonia," said co-author James Kemp, from
            the University of Lisbon."But our study is the first to show this
            happening in Madagascar, where the stakes for both farmers and
            conservationists are so high."
          </p>
          <p className="text-lg">
            Local people may have a further reason to be grateful to their bats.{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              While the animal is often associated with spreading disease, Rocha
              and his team found evidence that Malagasy bats feed not just on
              crop pests but also on mosquitoes - carriers of malaria, Rift
              Valley fever virus and elephantiasis - as well as blackflies,
              which spread river blindness.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
          </p>
          <p className="text-lg">
            Rocha points out that the relationship is complicated.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              When food is scarce, bats become a crucial source of protein for
              local people.10
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
            Even the children will hunt them.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And as well as roosting in trees, the bats sometimes roost in
              buildings, but are not welcomed there because they make them
              unclean.{" "}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  11
                </span>
              )}
              At the same time, however, they are associated with sacred caves
              and the ancestors, so they can be viewed as beings between worlds,
              which makes them very significant in the culture of the people.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  12
                </span>
              )}
            </span>
            And one potential problem is that while these bats are benefiting
            from farming, at the same time deforestation is reducing the places
            where they can roost, which could have long-term effects on their
            numbers.{" "}
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Rocha says, "With the right help, we hope that farmers can promote
              this mutually beneficial relationship by installing bat houses."
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  13
                </span>
              )}
            </span>
          </p>
          <p className="text-lg">
            Rocha and his colleagues believe that maximising bat populations can
            help to boost crop yields and promote sustainable livelihoods.The
            team is now calling for further research to quantify this
            contribution."I'm very optimistic," says Rocha."If we give nature a
            hand, we can speed up the process of regeneration."
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
          </div>
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 1-6 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
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
          {/* TABLE SECTION */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">Questions 7-13</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE WORD</span> for each answer.
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center text-lg mx-auto">
              <thead>
                <tr>
                  <th
                    colSpan="2"
                    className="border text-lg font-bold border-gray-400 p-2"
                  >
                    The study carried out by Rocha's team
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border  border-gray-400 text-lg  p-2">Aim</td>
                  <td className="border  border-gray-400 text-lg  p-2">
                    to investigate the feeding habits of bats in farmland near
                    the Ranomafana National Park
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    Method
                  </td>

                  <td className="border border-gray-400 p-2">
                    <span>
                      ultrasonic recording to identify favourite feeding spots{" "}
                      <br /> <br />
                      DNA analysis of bat
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span></span>
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    Findings
                  </td>
                  <td className="border border-gray-400 text-lg p-2">
                    <p className="">
                      <span>
                        were most active in rice fields located on hills ate
                        pests of rice,
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
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>"</span>
                    </p>
                    <p className="">
                      <span>
                        sugarcane, nuts and fruit prevent the spread of disease
                        by eating
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
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>.</span>
                    </p>
                    <p className="">
                      <span>
                        {" "}
                        local attitudes to bats are mixed: they provide food
                        rich in
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
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>.</span>
                    </p>
                    <p className="">
                      <span> the buildings where they roost become</span>
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
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>.</span>
                    </p>
                    <p className="">
                      <span>they play an important role in local</span>
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
                        className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                        type="text"
                      />
                      <span>.</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-lg  p-2">
                    Recomedation
                  </td>

                  <td className="border border-gray-400 p-2">
                    <span>farmers should provide special</span>
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
                      className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                      type="text"
                    />
                    <span>to support the bat population</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Reading2022;
