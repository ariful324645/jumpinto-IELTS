import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import Reading4Pagination2022 from "../Pagination2022/Reading4Pagination2022";
const Test4Reading2022 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

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
  const correctAnswers = {
    1: "FALSE",
    2: "TRUE",
    3: "NOT GIVEN",
    4: "TRUE",
    5: "FALSE",
    6: "TRUE",
    7: "droppings", // Example one-word answer
    8: "rice",
    9: "mosquitoes",
    10: "protein",
    11: "unclean",
    12: "culture",
    13: "bat houses",
  };

  const options = ["TRUE", "FALSE", "NOT GIVEN"];
  // text highlight and clear
  const [activeNumbers, setActiveNumbers] = useState(Array(14).fill(false));
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedText, setSelectedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0).getBoundingClientRect();
      setModalPosition({
        top: range.bottom + window.scrollY,
        left: range.left + window.scrollX,
      });
      setSelectedText(selection.toString());
      setIsModalOpen(true);
    }
  };

  const handleHighlight = () => {
    if (selectedText) {
      setHighlightedTexts((prev) => [...prev, selectedText]);
      setSelectedText("");
      setIsModalOpen(false);
    }
  };

  const handleClearHighlight = () => {
    setHighlightedTexts([]);
    setSelectedText("");
    setIsModalOpen(false);
  };

  const renderText = (chunk) => {
    const text = typeof chunk === "string" ? chunk : chunk.text;
    let parts = [text];
    highlightedTexts.forEach((ht) => {
      parts = parts.flatMap((part) =>
        typeof part === "string"
          ? part.split(ht).flatMap((p, i, arr) =>
              i < arr.length - 1
                ? [
                    p,
                    <span key={Math.random()} className="bg-yellow-200 ">
                      {ht}
                    </span>,
                  ]
                : [p]
            )
          : [part]
      );
    });
    return parts;
  };
  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);

    // Save to userAnswers
    setUserAnswers((prev) => ({
      ...prev,
      [qIndex + 1]: options[oIndex], // +1 because question numbers start from 1
    }));
  };

  const handleNumberClick = (qIndex) => {
    const updatedActive = [...activeNumbers];
    updatedActive[qIndex] = !updatedActive[qIndex]; // toggle active state
    setActiveNumbers(updatedActive);
  };
  const score = Object.entries(userAnswers).reduce((acc, [key, val]) => {
    if (val === correctAnswers[key]) return acc + 1;
    return acc;
  }, 0);
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div onMouseUp={handleTextSelect} className="px-3">
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
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {renderText("Bats to the rescue")}
            </h1>

            <h3 className="text-xl font-bold italic text-center">
              {renderText(
                "How Madagascar's bats are helping to save the rainforest"
              )}
            </h3>

            <p className="text-lg mt-4">
              {renderText(
                "There are few places in the world where relations between agriculture and conservation are more strained. Madagascar's forests are being converted to agricultural land at a rate of one percent every year. Much of this destruction is fuelled by the cultivation of the country's main staple crop: rice."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " And a key reason for this destruction is that insect pests are destroying vast quantities of what is grown by local subsistence farmers, leading them to clear forest to create new paddy fields."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              {renderText(
                " The result is devastating habitat and biodiversity loss on the island, but not all species are suffering."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " In fact, some of the island's insectivorous bats are currently thriving and this has important implications for farmers and conservationists alike."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Enter University of Cambridge zoologist Ricardo Rocha. He's passionate about conservation, and bats. More specifically, he's interested in how bats are responding to human activity and deforestation in particular. Rocha's new study shows that several species of bats are giving Madagascar's rice farmers a vital pest control service by feasting on plagues of insects. And this, he believes, can ease the financial pressure on farmers to turn forest into fields."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Bats comprise roughly one-fifth of all mammal species in Madagascar and thirty-six recorded bat species are native to the island, making it one of the most important regions for conservation of this animal group anywhere in the world."
              )}
            </p>

            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Co-leading an international team of scientists, Rocha found that several species of indigenous bats are taking advantage of habitat modification to hunt insects swarming above the country's rice fields."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                " They include the Malagasy mouse-eared bat, Major's long-fingered bat, the Malagasy white-bellied free-tailed bat and Peters' wrinkle-lipped bat."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                '"These winner species are providing a valuable free service to Madagascar as biological pest suppressors," says Rocha.  The damage which these insects cause puts the island\'s farmers under huge financial pressure and that encourages deforestation."'
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "We found that six species of bat are preying on rice pests, including the paddy swarming caterpillar and grass webworm."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "The study, now published in the journal Agriculture, Ecosystems and Environment, set out to investigate the feeding activity of insectivorous bats in the farmland bordering the Ranomafana National Park in the southeast of the country."
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Rocha and his team used state-of-the-art ultrasonic recorders to record over a thousand bat 'feeding buzzes' (echolocation sequences used by bats to target their prey) at 54 sites, in order to identify the favourite feeding spots of the bats."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " They next used DNA barcoding techniques to analyse droppings collected from bats at the different sites."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "The recordings revealed that bat activity over rice fields was much higher than it was in continuous forest - seven times higher over rice fields which were on flat ground, and sixteen times higher over fields on the sides of hills - leaving no doubt that the animals are preferentially foraging in these man-made ecosystems.The researchers suggest that the bats favour these fields because lack of water and nutrient run-off make these crops more susceptible to insect pest infestations. DNA analysis showed that all six species of bat had fed on economically important insect pests. While the findings indicated that rice farming benefits most from the bats, "
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  the scientists also found indications that the bats were consuming pests of other crops, including the black twig borer (which infests coffee plants), the sugarcane cicada, the macadamia nut-borer, and the sober tabby (a pest of citrus fruits)."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                '"The effectiveness of bats as pest controllers has already been proven in the USA and Catalonia," said co-author James Kemp, from the University of Lisbon. "But our study is the first to show this happening in Madagascar, where the stakes for both farmers and conservationists are so high."'
              )}
            </p>

            <p className="text-lg">
              {renderText(
                "Local people may have a further reason to be grateful to their bats. While the animal is often associated with spreading disease,"
              )}

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " While the animal is often associated with spreading disease, Rocha and his team found evidence that Malagasy bats feed not just on crop pests but also on mosquitoes - carriers of malaria, Rift Valley fever virus and elephantiasis - as well as blackflies, which spread river blindness"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "Rocha points out that the relationship is complicated. "
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " When food is scarce, bats become a crucial source of protein for local people."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              {renderText(" Even the children will hunt them. ")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " And as well as roosting in trees, the bats sometimes roost in buildings, but are not welcomed there because they make them unclean."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>
              {renderText(" ")}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " At the same time, however, they are associated with sacred caves and the ancestors, so they can be viewed as beings between worlds, which makes them very significant in the culture of the people."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                "And one potential problem is that while these bats are benefiting from farming, at the same time deforestation is reducing the places where they can roost, which could have long-term effects on their numbers.'"
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "  Rocha says, 'With the right help, we hope that farmers can promote this mutually beneficial relationship by installing bat houses."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    13
                  </span>
                )}
              </span>
            </p>

            <p className="text-lg">
              {renderText(
                'Rocha and his colleagues believe that maximising bat populations can help to boost crop yields and promote sustainable livelihoods. The team is now calling for further research to quantify this contribution. "I\'m very optimistic," says Rocha. "If we give nature a hand, we can speed up the process of regeneration."'
              )}
            </p>
          </div>
        </div>
        {isModalOpen && (
          <div
            style={{ top: modalPosition.top + 5, left: modalPosition.left }}
            className="absolute bg-white p-3 rounded-lg shadow-lg flex gap-3 z-50"
          >
            <button
              onClick={handleHighlight}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Highlight
            </button>
            <button
              onClick={handleClearHighlight}
              className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition"
            >
              Clear Highlight
            </button>
          </div>
        )}

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <div className="flex justify-end items-center p-4 text-gray-500">
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
                  {renderText("Clear answer")}
                </span>
              </div>
            </div>
          </div>
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 1-6")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?\nIn boxes 1-6 on your answer sheet, choose"
            )}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("TRUE")}</span>
            {renderText("if the statement agrees with the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("FALSE")}</span>
            {renderText("if the statement contradicts the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("NOT GIVEN")}</span>
            {renderText("if there is no information on this")}
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
                activeNumbers[qIndex]
                  ? "bg-yellow-400 border-yellow-500"
                  : "bg-white border-gray-300 hover:border-yellow-400"
              }
              cursor-pointer
            `}
                  >
                    {qIndex + 1}
                  </div>
                  <h1 className="text-lg">{renderText(q)}</h1>
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
                        {renderText(option)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* TABLE SECTION */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 7-13")}
            </h2>
            <h3 className="text-lg font-semibold mb-5">
              {renderText(
                "Complete the notes below. Write ONLY ONE WORD for each answer."
              )}
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center text-lg mx-auto">
              <thead>
                <tr>
                  <th
                    colSpan="2"
                    className="border text-lg font-bold border-gray-400 p-2"
                  >
                    {renderText("The study carried out by Rocha's team")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Aim */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("Aim")}
                  </td>
                  <td className="border border-gray-400 p-2 text-left">
                    {renderText(
                      "to investigate the feeding habits of bats in farmland near the Ranomafana National Park"
                    )}
                  </td>
                </tr>

                {/* Method */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("Method")}
                  </td>
                  <td className="border border-gray-400 p-2 text-left">
                    {renderText(
                      "ultrasonic recording to identify favourite feeding spots"
                    )}
                    <br />
                    <br />
                    {renderText("DNA analysis of bat")}
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
                      value={userAnswers[7] || ""}
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          7: e.target.value,
                        }))
                      }
                    />
                  </td>
                </tr>

                {/* Findings */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("Findings")}
                  </td>
                  <td className="border border-gray-400 p-2 text-left space-y-2">
                    <div>
                      {renderText(
                        "the bats were most active in rice fields located on hills"
                      )}
                    </div>

                    <div>
                      {renderText("ate pests of rice,")}
                      <button
                        onClick={() => toggleButton(8)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[8]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        8
                      </button>
                      <input
                        className="mx-1 w-[100px] border rounded-md px-1 py-0.5"
                        type="text"
                        value={userAnswers[8] || ""}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            8: e.target.value,
                          }))
                        }
                      />
                      {renderText(", sugarcane, nuts and fruit")}
                    </div>

                    <div>
                      {renderText("prevent the spread of disease by eating")}
                      <button
                        onClick={() => toggleButton(9)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[9]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        9
                      </button>
                      <input
                        className="mx-1 w-[100px] border rounded-md px-1 py-0.5"
                        type="text"
                        value={userAnswers[9] || ""}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            9: e.target.value,
                          }))
                        }
                      />
                      {renderText(" and blackflies")}
                    </div>

                    <div>
                      {renderText("local attitudes to bats are mixed:")}
                    </div>

                    <div>
                      {renderText("they provide food rich in")}
                      <button
                        onClick={() => toggleButton(10)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[10]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        10
                      </button>
                      <input
                        className="mx-1 w-[100px] border rounded-md px-1 py-0.5"
                        type="text"
                        value={userAnswers[10] || ""}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            10: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      {renderText("the buildings where they roost become")}
                      <button
                        onClick={() => toggleButton(11)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[11]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        11
                      </button>
                      <input
                        className="mx-1 w-[100px] border rounded-md px-1 py-0.5"
                        type="text"
                        value={userAnswers[11] || ""}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            11: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      {renderText("they play an important role in local")}
                      <button
                        onClick={() => toggleButton(12)}
                        className={`mx-2 w-8 h-8 rounded-full border-2 ${
                          activeButtons[12]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        12
                      </button>
                      <input
                        className="mx-1 w-[100px] border rounded-md px-1 py-0.5"
                        type="text"
                        value={userAnswers[12] || ""}
                        onChange={(e) =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            12: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </td>
                </tr>

                {/* Recommendation */}
                <tr>
                  <td className="border border-gray-400 p-2 font-semibold">
                    {renderText("Recommendation")}
                  </td>
                  <td className="border border-gray-400 p-2 text-left">
                    {renderText("farmers should provide special")}
                    <button
                      onClick={() => toggleButton(13)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[13]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      13
                    </button>
                    <input
                      className="mx-1 w-[100px] border rounded-md px-1 py-0.5"
                      type="text"
                      value={userAnswers[13] || ""}
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          13: e.target.value,
                        }))
                      }
                    />
                    {renderText(" to support the bat population")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ================= Submit & Result ================= */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  {renderText("Submit Answers")}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {renderText("Result")}
                  </h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    {renderText(`Your Score: ${score}/13`)}
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    {renderText("All Answers (1–13)")}
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
                      const userAnswer = userAnswers[num]?.trim();
                      const correctAnswer = correctAnswers[num]?.trim();
                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;
                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span>
                            )}
                            {!isCorrect && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}
                            <p className="font-bold">
                              {renderText(`Q${num}:`)}
                            </p>
                          </div>

                          <p className="ml-8">
                            <span className="font-semibold">
                              {renderText("Your Answer:")}
                            </span>{" "}
                            {noAnswer ? (
                              <span className="italic">
                                {renderText("No answer provided")}
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              {renderText("Correct Answer:")}
                            </span>{" "}
                            <span>{correctAnswer}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Reading4Pagination2022></Reading4Pagination2022>
    </div>
  );
};

export default Test4Reading2022;
