import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading2020 = () => {
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
    "Local families have told Whaley about some traditional uses of huarango products.",
    "Farmer Alberto Benevides is now making a good profit from growing huarangos..",
    "Whaley needs the co-operation of farmers to help preserve the area's wildlife.",
    "For Whaley's project to succeed, it needs to be extended over a very large area.",
    "Whaley has plans to go to Africa to set up a similar project.",
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

  // text highlight and clear

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

  //  Marks show

  const correctAnswers = {
    1: "They stretch down 50-80 metres and, as well as sucking up water for the tree, they bring it into the higher subsoil, creating a water source for other plant life",
    2: "He believes the huarango was key to the ancient people's diet and, because it could reach deep water sources, it allowed local people to withstand years of drought when their other crops failed",
    3: "He believes the huarango was key to the ancient people's diet and, because it could reach deep water sources, it allowed local people to withstand years of drought when their other crops failed",
    4: "Cutting down native woodland leads to erosion, as there is nothing to keep the soil in place",
    5: "So when the huarangos go, the land turns into a desert",
    6: "Its leaves and bark were used for herbal remedies, while its branches were used for charcoal for cooking and heating, and its trunk was used to build houses",
    7: "Its leaves and bark were used for herbal remedies, while its branches were used for charcoal for cooking and heating, and its trunk was used to build houses",
    8: "Its leaves and bark were used for herbal remedies, while its branches were used for charcoal for cooking and heating, and its trunk was used to build houses",
    9: "But now it is disappearing rapidly",
    10: "His farm is relatively small and doesn't yet provide him with enough to live on, but he hopes this will change",
    11: " In the hope of counteracting this, he's persuading farmers to let him plant forest corridors on their land",
    12: "It's not like a rainforest that needs to have this huge expanse. Life has always been confined to corridors and islands here. If you just have a few trees left, the population can grow up quickly because it's used to exploiting water when it arrives, an island off the coast of Africa",
    13: "Next, in 1778, a volcanic eruption in the Banda region caused a tsunami that wiped out half the nutmeg groveIt's not like a rainforest that needs to have this huge expanse. Life has always been confined to corridors and islands here. If you just have a few trees left, the population can grow up quickly because it's used to exploiting water when it arrives",
    14: "It's not like a rainforest that needs to have this huge expanse. Life has always been confined to corridors and islands here. If you just have a few trees left, the population can grow up quickly because it's used to exploiting water when it arrives",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        answers[key]?.trim().toLowerCase() ===
        correctAnswers[key].trim().toLowerCase()
      ) {
        newScore += 1;
      }
    });
    setScore(newScore);
    localStorage.setItem("/2020/Test 4/reading", newScore);
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 4/reading");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
        
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 1")}</h1>
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
              {renderText("       You should spend about 20 minutes on")}

              <span className="text-lg font-bold">
                {renderText("          Questions 1-13")}
              </span>
              {renderText("   PASSAGE 1")}
            </h1>
          </div>
          {/* left text */}
          <div>
            <h1 className="text-2xl font-bold mb-3 mt-5 text-center">
              {renderText(" The return of the huarango")}
            </h1>
            <h1 className="text-xl font-bold italic text-center mb-5">
              {renderText(
                "The arid valleys of southern Peru are welcoming the return of a native plant"
              )}
            </h1>

            <p className="text-lg">
              {renderText(
                "The south coast of Peru is a narrow, 2,000-kilometre-long strip of desert squeezed between the Andes and the Pacific Ocean. It is also one of the most fragile ecosystems on Earth."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              ></span>
              {renderText(
                " It hardly ever rains there, and the only year-round source of water is located tens of metres below the surface.This is why the huarango tree is so suited to life there: it has the longest roots of any tree in the world."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "They stretch down 50-80 metres and, as well as sucking up water for the tree, they bring it into the higher subsoil, creating a water source for other plant life."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "Dr David Beresford-Jones, archaeobotanist at Cambridge University, has been studying the role of the huarango tree in landscape change in the Lower lea Valley in southern Peru."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "He believes the huarango was key to the ancient people's diet and, because it could reach deep water sources, it allowed local people to withstand years of drought when their other crops failed."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2,3
                  </span>
                )}
              </span>
              {renderText(
                " But over the centuries huarango trees were gradually replaced with crops."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "Cutting down native woodland leads to erosion, as there is nothing to keep the soil in place."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
              {renderText(
                " So when the huarangos go, the land turns into a desert."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "So when the huarangos go, the land turns into a desert."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
              {renderText("Nothing grows at all in the Lower lea Valley now. ")}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "For centuries the huarango tree was vital to the people of the neighbouring Middle lea Valley too.They grew vegetables under it and ate products made from its seed pods."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              ></span>

              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Its leaves and bark were used for herbal remedies, while its branches were used for charcoal for cooking and heating, and its trunk was used to build houses."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6,7,8,
                  </span>
                )}
                {renderText("But now it is disappearing rapidly.")}
              </span>
              {renderText(
                " The majority of the huarango forests in the valley have already been cleared for fuel and agriculture - initially, these were smallholdings, but now they're huge farms producing crops for the international market."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"Of the forests that were here 1,000 years ago, 99 percent have already gone," says botanist Oliver Whaley from Kew Gardens in London, who, together with ethnobotanist Dr William Milliken, is running a pioneering project to protect and restore the rapidly disappearing habitat.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"Increasingly aspirational communities think that if you plant food trees in your home or street, it shows you are poor, and still need to grow your own food," he says.'
              )}
              {renderText(
                "In order to stop the Middle lea Valley going the same way as the Lower lea Valley, Whaley is encouraging locals to love the huarangos again."
              )}
              {renderText(
                '"It\'s a process of cultural resuscitation," he says. He has already set up a huarango festival to reinstate a sense of pride in their eco-heritage, and has helped local schoolchildren plant thousands of trees.'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"In order to get people interested in habitat restoration, you need to plant a tree that is useful to them," says Whaley.'
              )}
              {renderText(
                "So, he has been working with local families to attempt to create a sustainable income from the huarangos by turning their products into foodstuffs."
              )}
              ,
              {renderText(
                "\"Boil up the beans and you get this thick brown syrup like molasses.You can also use it in drinks, soups or stews.\" The pods can be ground into flour to make cakes, and the seeds roasted into a sweet, chocolatey 'coffee'."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"It\'s packed full of vitamins and minerals," Whaley says. And some farmers are already planting huarangos.'
              )}
              {renderText(
                "Alberto Benevides, owner of lea Valley's only certified organic farm, which Whaley helped set up, has been planting the tree for 13 years."
              )}
              {renderText(
                "He produces syrup and flour, and sells these products at an organic farmers' market in Lima.."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "His farm is relatively small and doesn't yet provide him with enough to live on, but he hopes this will change"
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
              {renderText(
                '"The organic market is growing rapidly in Peru," Benevides says. "I am investing in the future."'
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                "But even if Whaley can convince the local people to fall in love with the huarango again, there is still the threat of the larger farms."
              )}
              {renderText(
                "Some of these cut across the forests and break up the corridors that allow the essential movement of mammals, birds and pollen up and down the narrow forest strip."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " In the hope of counteracting this, he's persuading farmers to let him plant forest corridors on their land."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    11
                  </span>
                )}
              </span>

              {renderText(
                "He believes the extra woodland will also benefit the farms by reducing their water usage through a lowering of evaporation and providing a refuge for bio-control insects."
              )}
            </p>

            <br />

            <p className="text-lg">
              {renderText(
                '"If we can record biodiversity and see how it all works, then we\'re in a good position to move on from there. Desert habitats can reduce down to very little," Whaley explains.'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "\"It's not like a rainforest that needs to have this huge expanse. Life has always been confined to corridors and islands here. If you just have a few trees left, the population can grow up quickly because it's used to exploiting water when it arrives.\""
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-16 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    12,13,14
                  </span>
                )}
              </span>
              {renderText(
                "He sees his project as a model that has the potential to be rolled out across other arid areas around the world. \"If we can do it here, in the most fragile system on Earth, then that's a real message of hope for lots of places, including Africa, where there is drought and they just can't afford to wait for rain.\""
              )}
            </p>
          </div>

          {/* highlight modal */}

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
                  {renderText("Clear answer")}
                </span>

                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                      <h2 className="text-lg font-semibold mb-4">
                        {renderText(
                          "Are you sure you want to clear all answers?"
                        )}
                      </h2>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                        >
                          {renderText("No, keep them")}
                        </button>
                        <button
                          onClick={handleClear}
                          className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          {renderText("Yes, clear them")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 1-5")}
            </h2>

            <h3 className="text-lg  mb-5">
              {renderText("Complete the notes below.")} <br /> <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">
                {renderText("ONE WORD AND/OR A NUMBER")}
              </span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 1-5 on your answer sheet."
              )}
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              {renderText("The importance of the huarango tree")}
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                {" "}
                {renderText(
                  "its roots can extend as far as 80 metres into the soil"
                )}
              </li>
              <li className="text-lg">
                <span>{renderText("can access")}</span>
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
                  value={userAnswers[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("deep below the surface")}</span>
              </li>
              <li className="text-lg">
                <span>
                  {renderText("was a crucial part of local inhabitants'")}
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
                  value={userAnswers[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("a long time ago")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("helped people to survive periods o")}</span>
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
                  value={userAnswers[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("Prevents")}</span>
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
                  value={userAnswers[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("of the soil")}</span>
              </li>
              <li className="text-lg">
                <span>{renderText("prevents land from becoming a")}</span>
                <button
                  onClick={() => toggleButton(4)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[5]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  5
                </button>
                <input
                  value={userAnswers[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>{renderText("of the soil")}</span>
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 6-10")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 6-10 on your answer sheet, choose")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("TRUE")}</span>{" "}
            {renderText("if the statement agrees with the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("FALSE")}</span>{" "}
            {renderText("if the statement contradicts the information")}
          </h3>
          <h3 className="flex gap-5 text-lg">
            <span className="text-lg font-bold">{renderText("NOT GIVEN")}</span>{" "}
            {renderText("if there is no information on this")}
          </h3>
          <br /> <br />
          {/* question dynamic */}
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
          {/* table */}
          <h2 className="text-lg font-bold mb-3">
            {renderText("Questions 11-14")}
          </h2>
          <br />
          <h3 className="text-lg font-semibold mb-5">
            {renderText(
              "Do the following statements agree with the information given in Reading Passage 1?"
            )}{" "}
            <br /> <br />
            {renderText("In boxes 11-14 on your answer sheet, choose")}
          </h3>
          <table className="border-collapse border border-gray-400 w-full text-center text-sm mx-auto">
            <tbody>
              <tr>
                <th className="text-2xl p-4 font-bold" colSpan={2}>
                  Traditional uses of the huarango tree
                </th>
              </tr>
              <tr>
                <th className="border text-lg p-2">Part of tree</th>
                <th className="border text-lg p-2">Traditional use</th>
              </tr>
              <tr>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
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
                    value={userAnswers[11] || ""}
                    onChange={(e) => handleInputChange(11, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  <span>{renderText(".")}</span>
                </td>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("fuel.")}
                </td>
              </tr>
              <tr>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
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
                    value={userAnswers[12] || ""}
                    onChange={(e) => handleInputChange(12, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  <span>{renderText("")}</span>
                  and
                  <span>{renderText("")}</span>
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
                    value={userAnswers[13] || ""}
                    onChange={(e) => handleInputChange(13, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  <span>{renderText("")}</span>
                </td>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("medicine.")}
                </td>
              </tr>

              <tr>
                <td className="border text-lg p-2">
                  <span>{renderText("")}</span>
                  <button
                    onClick={() => toggleButton(14)}
                    className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      activeButtons[14]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    14
                  </button>
                  <input
                    value={userAnswers[14] || ""}
                    onChange={(e) => handleInputChange(14, e.target.value)}
                    className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                    type="text"
                  />
                  <span>{renderText(".")}</span>
                </td>
                <td className="border text-lg p-2 w-1/4">
                  {renderText("Construction.")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Test4Reading2020;
