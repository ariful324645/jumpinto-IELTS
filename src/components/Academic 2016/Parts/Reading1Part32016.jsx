import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

import { ImCross } from "react-icons/im";
import { FaChevronDown, FaDotCircle } from "react-icons/fa";

import Reading1Pagination2016 from "../Pagination2016/Reading1Pagination2016";

//  Marks show

const Reading1Part32016 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // result marks display
  const [showResult, setShowResult] = useState(false);

  const handleClear = () => {
    setActiveButtons({});
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => (input.value = ""));
    console.log("All answers cleared!");
    setIsOpen(false);
  };

  //   second
  const toggleButton = (id) => {
    setActiveButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    localStorage.setItem("/reading4Part32020", newScore);
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
   // Questions 27–29: Paragraph matching
   27: "D", // geo-engineering project based on a natural phenomenon (volcanic eruption – Pinatubo)
   28: "B", // successful use of geo-engineering (cloud dispersal in Moscow)
   29: "A", // common definition of geo-engineering

   // Questions 30–36: Table completion
   30: "sunshade", // spacecraft would create a sunshade
   31: "iron", // placed in the sea
   32: "algae", // encouraged to form
   33: "clouds", // created by aerosol sprays
   34: "cables", // fixed to Greenland ice sheets
   35: "snow", // reflects radiation
   36: "rivers", // redirected to bring cold water

   // Questions 37–40: Scientists
   37: "B", // Phil Rasch – effects may not be long-lasting
   38: "D", // Martin Sommerkorn – worth exploring geo-engineering
   39: "C", // Dan Lunt – limit effectiveness to avoid overshoot
   40: "A", // Roger Angel – geo-engineering can’t replace renewable energy
 };


  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/reading4Part32020");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

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

  return (
    <div onMouseUp={handleTextSelect} className="px-3">
      {/* Main Layout */}
      <div className="flex gap-6 h-[1000px]">
        {/* LEFT SIDE (dynamic texts) */}

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{renderText("   PASSAGE 3")}</h1>
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
                {renderText("          Questions 27-40")}
              </span>
              {renderText(" which are based on Reading  PASSAGE 3 below")}
            </h1>
          </div>

          {/* left text */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md space-y-5 overflow-y-scroll">
            <h1 className="text-2xl font-bold mb-5 text-center">
              {renderText("Reducing the Effects of Climate Change")}
            </h1>

            <p className="text-center italic mb-6">
              {renderText(
                "Mark Rowe reports on the increasingly ambitious geo-engineering projects being explored by scientists"
              )}
            </p>

            {/* Section A */}
            <h2 className="text-xl font-bold mb-3">{renderText("A")}</h2>
            <p className="text-lg">
              {renderText(
                "Such is our dependence on fossil fuels, and such is the volume of carbon dioxide already released into the atmosphere, that many experts agree that significant global warming is now inevitable."
              )}
              {renderText(
                " They believe that the best we can do is keep it at a reasonable level, and at present the only serious option for doing this is cutting back on our carbon emissions."
              )}
              {renderText(
                " But while a few countries are making major strides in this regard, the majority are having great difficulty even stemming the rate of increase, let alone reversing it."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Consequently, an increasing number of scientists are beginning to explore the alternative of geo-engineering – a term which generally refers to the intentional large-scale manipulation of the environment."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("29")}
                  </span>
                )}
              </span>
              {renderText(
                " According to its proponents, geo-engineering is the equivalent of a backup generator: if Plan A – reducing our dependency on fossil fuels – fails, we require a Plan B, employing grand schemes to slow down or reverse the process of global warming."
              )}
            </p>

            <br />

            {/* Section B */}
            <h2 className="text-xl font-bold mb-3">{renderText("B")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  "Geo-engineering has been shown to work, at least on a small localised scale."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("28")}
                  </span>
                )}
              </span>
              {renderText(
                " For decades, May Day parades in Moscow have taken place under clear blue skies, aircraft having deposited dry ice, silver iodide and cement powder to disperse clouds."
              )}
              {renderText(
                " Many of the schemes now suggested look to do the opposite, and reduce the amount of sunlight reaching the planet."
              )}
              {renderText(
                " The most eye-catching idea of all is suggested by Professor Roger Angel of the University of Arizona."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {renderText(
                  " His scheme would employ up to 16 trillion minute spacecraft, each weighing about one gram, to form a transparent, sunlight-refracting sunshade in an orbit 1.5 million km above the Earth."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("30")}
                  </span>
                )}
              </span>{" "}
              {renderText(
                " This could, argues Angel, reduce the amount of light reaching the Earth by two per cent."
              )}
            </p>

            <br />

            {/* Section C */}
            <h2 className="text-xl font-bold mb-3">{renderText("C")}</h2>
            <p className="text-lg">
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  "The majority of geo-engineering projects so far carried out – which include planting forests in deserts and depositing iron in the ocean to stimulate the growth of algae – have focused on achieving a general cooling of the Earth."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-12 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("31,32")}
                  </span>
                )}
              </span>
              {renderText(
                " But some look specifically at reversing the melting at the poles, particularly the Arctic."
              )}
              {renderText(
                " The reasoning is that if you replenish the ice sheets and frozen waters of the high latitudes, more light will be reflected back into space, so reducing the warming of the oceans and atmosphere."
              )}
            </p>

            <br />

            {/* Section D */}
            <h2 className="text-xl font-bold mb-3">{renderText("D")}</h2>
            <p className="text-lg">
              {renderText(
                "The concept of releasing aerosol sprays into the stratosphere above the Arctic has been proposed by several scientists."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " This would involve using sulphur or hydrogen sulphide aerosols so that sulphur dioxide would form clouds, which would in turn, lead to a global dimming."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("33")}
                  </span>
                )}
                {renderText(
                  " The idea is modelled on historic volcanic explosions, such as that of Mount Pinatubo in the Philippines in 1991, which led to a short-term cooling of global temperatures by 0.5 °C."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("27")}
                  </span>
                )}
                {renderText(
                  " Scientists have also scrutinised whether it's possible to preserve the ice sheets of Greenland with reinforced high-tension cables, preventing icebergs from moving into the sea."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("34")}
                  </span>
                )}
              </span>
              {renderText(
                " Meanwhile in the Russian Arctic, geo-engineering plans include the planting of millions of birch trees."
              )}{" "}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " Whereas the region's native evergreen pines shade the snow and absorb radiation, birches would shed their leaves in winter, thus enabling radiation to be reflected by the snow."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("35")}
                  </span>
                )}
                {renderText(
                  " Re-routing Russian rivers to increase cold water flow to ice-forming areas could also be used to slow down warming, say some climate scientists."
                )}

                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("36")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section E */}
            <h2 className="text-xl font-bold mb-3">{renderText("E")}</h2>
            <p className="text-lg">
              {renderText("But will such schemes ever be implemented?")}
              {renderText(
                " Generally speaking, those who are most cautious about geo-engineering are the scientists involved in the research."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  ' Angel says that his plan is "no substitute for developing renewable energy: the only permanent solution".'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("40")}
                  </span>
                )}
                {renderText(
                  ' And Dr Phil Rasch of the US-based Pacific Northwest National Laboratory is equally guarded about the role of geo-engineering: "I think all of us agree that if we were to end geo-engineering on a given day, then the planet would return to its pre-engineered condition very rapidly, and probably within ten to twenty years".'
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("40")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section F */}
            <h2 className="text-xl font-bold mb-3">{renderText("F")}</h2>
            <p className="text-lg">
              {" "}
              {renderText(
                "The US National Center for Atmospheric Research has already suggested that the proposal to inject sulphur into the atmosphere might affect rainfall patterns across the tropics and the Southern Ocean."
              )}
              {renderText(
                ' "Geo-engineering plans to inject stratospheric aerosols or to seed clouds would act to cool the planet, and act to increase the extent of sea ice," says Rasch.'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {" "}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("37")}
                  </span>
                )}
              </span>
              {renderText(
                ' "But all the models suggest some impact on the distribution of precipitation."'
              )}
            </p>

            <br />

            {/* Section G */}
            <h2 className="text-xl font-bold mb-3">{renderText("G")}</h2>
            <p className="text-lg">
              {" "}
              {renderText(
                " \"A further risk with geo-engineering projects is that you can 'overshoot',\" says Dr Dan Lunt, from the University of Bristol's School of Geophysical Sciences."
              )}
              {renderText(
                ' "You may bring global temperatures back to pre-industrial levels, but the risk is that the poles will still be warmer than they should be and the tropics will be cooler than before industrialisation."'
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " To avoid such a scenario, Lunt says Angel's project would have to operate at half strength; all of which reinforces his view that the best option is to avoid the need for geo-engineering altogether."
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("39")}
                  </span>
                )}
              </span>
            </p>

            <br />

            {/* Section H */}
            <h2 className="text-xl font-bold mb-3">{renderText("H")}</h2>
            <p className="text-lg">
              {renderText(
                "The main reason why geo-engineering is supported by many in the scientific community is that most researchers have little faith in the ability of politicians to agree – and then bring in – the necessary carbon cuts."
              )}
              {renderText(
                " Even leading conservation organisations see the value of investigating the potential of geo-engineering."
              )}
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                {renderText(
                  " According to Dr Martin Sommerkorn, climate change advisor for the World Wildlife Fund's International Arctic Programme, \"Human-induced climate change has brought humanity to a position where we shouldn't exclude thinking thoroughly about this topic and its possibilities.\""
                )}
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold ml-1">
                    {renderText("38")}
                  </span>
                )}
              </span>
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
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll pb-10">
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
          </div>

          <br />

          {/* Questions 27-29 */}
          <div className="space-y-4">
            <h1 className="text-lg font-bold">
              {renderText("Questions 27-29")}
            </h1>

            <p>{renderText("Reading Passage 3 has eight paragraphs, A-H.")}</p>

            <p>
              {renderText(
                "Which paragraph contains the following information?"
              )}
            </p>

            <p>
              {renderText(
                "Choose the correct letter, A-H, in boxes 27-29 on your answer sheet."
              )}
            </p>

            {/* ---------- Question 27 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("27.")}</span>
              {renderText(
                "mention of a geo-engineering project based on an earlier natural phenomenon"
              )}
              <div className="relative w-40">
                <select
                  value={userAnswers[27] || ""}
                  onChange={(e) => handleInputChange(27, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("27")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 28 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("28.")}</span>
              {renderText("an example of a successful use of geo-engineering")}
              <div className="relative w-40">
                <select
                  value={userAnswers[28] || ""}
                  onChange={(e) => handleInputChange(28, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("28")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>

            {/* ---------- Question 29 ---------- */}
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{renderText("29.")}</span>
              {renderText("a common definition of geo-engineering")}
              <div className="relative w-40">
                <select
                  value={userAnswers[29] || ""}
                  onChange={(e) => handleInputChange(29, e.target.value)}
                  className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{renderText("29")}</option>
                  <option value="A">{renderText("A")}</option>
                  <option value="B">{renderText("B")}</option>
                  <option value="C">{renderText("C")}</option>
                  <option value="D">{renderText("D")}</option>
                  <option value="E">{renderText("E")}</option>
                  <option value="F">{renderText("F")}</option>
                  <option value="G">{renderText("G")}</option>
                  <option value="H">{renderText("H")}</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaChevronDown />
                </span>
              </div>
            </p>
          </div>

          <div className="mb-5">
            <h2 className="text-lg font-bold mb-3">
              {renderText("Questions 30-36")}
            </h2>

            <h3 className="text-lg mb-5">
              {renderText("Complete the table below.")} <br />
              <br />
              {renderText("Choose ")}
              <span className="font-bold mr-2">{renderText("ONE WORD")}</span>
              {renderText(" from the passage for each answer.")}
            </h3>

            <h1 className="text-lg font-semibold">
              {renderText(
                "Write your answers in boxes 30-36 on your answer sheet."
              )}
            </h1>

            <br />

            <table className="border-collapse border border-gray-400 w-full text-sm mx-auto">
              <tbody>
                <tr>
                  <th className="text-xl border p-2 font-bold">
                    {renderText("Procedure")}
                  </th>
                  <th className="text-xl border p-2 font-bold">
                    {renderText("Aim")}
                  </th>
                </tr>

                {/* Question 30 */}
                <tr>
                  <td className="border p-2 text-left">
                    {renderText(
                      "put a large number of tiny spacecraft into orbit far above Earth"
                    )}
                  </td>
                  <td className="border p-2 text-left">
                    {renderText("to create a")}
                    <button
                      onClick={() => toggleButton(30)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[30]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      30
                    </button>
                    <input
                      value={userAnswers[30] || ""}
                      onChange={(e) => handleInputChange(30, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                    {renderText(
                      "that would reduce the amount of light reaching Earth"
                    )}
                  </td>
                </tr>

                {/* Question 31–32 */}
                <tr>
                  <td className="border p-2 text-left">
                    {renderText("place")}
                    <button
                      onClick={() => toggleButton(31)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[31]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      31
                    </button>
                    <input
                      value={userAnswers[31] || ""}
                      onChange={(e) => handleInputChange(31, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                    {renderText("in the sea")}
                  </td>
                  <td className="border p-2 text-left">
                    {renderText("to encourage")}
                    <button
                      onClick={() => toggleButton(32)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[32]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      32
                    </button>
                    <input
                      value={userAnswers[32] || ""}
                      onChange={(e) => handleInputChange(32, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                    {renderText("to form")}
                  </td>
                </tr>

                {/* Question 33 */}
                <tr>
                  <td className="border p-2 text-left">
                    {renderText("release aerosol sprays into the stratosphere")}
                  </td>
                  <td className="border p-2 text-left">
                    {renderText("to create")}
                    <button
                      onClick={() => toggleButton(33)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[33]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      33
                    </button>
                    <input
                      value={userAnswers[33] || ""}
                      onChange={(e) => handleInputChange(33, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                    {renderText(
                      "that would reduce the amount of light reaching Earth"
                    )}
                  </td>
                </tr>

                {/* Question 34 */}
                <tr>
                  <td className="border p-2 text-left">
                    {renderText("fix strong")}
                    <button
                      onClick={() => toggleButton(34)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[34]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      34
                    </button>
                    <input
                      value={userAnswers[34] || ""}
                      onChange={(e) => handleInputChange(34, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                    {renderText("to Greenland ice sheets")}
                  </td>
                  <td className="border p-2 text-left">
                    {renderText("to prevent icebergs moving into the sea")}
                  </td>
                </tr>

                {/* Question 35 */}
                <tr>
                  <td className="border p-2 text-left">
                    {renderText(
                      "plant trees in Russian Arctic that would lose their leaves in winter"
                    )}
                  </td>
                  <td className="border p-2 text-left">
                    {renderText("to allow the")}
                    <button
                      onClick={() => toggleButton(35)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[35]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      35
                    </button>
                    <input
                      value={userAnswers[35] || ""}
                      onChange={(e) => handleInputChange(35, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                    {renderText("to reflect radiation")}
                  </td>
                </tr>

                {/* Question 36 */}
                <tr>
                  <td className="border p-2 text-left">
                    {renderText("change the direction of")}
                    <button
                      onClick={() => toggleButton(36)}
                      className={`mx-2 w-8 h-8 rounded-full border-2 ${
                        activeButtons[36]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      36
                    </button>
                    <input
                      value={userAnswers[36] || ""}
                      onChange={(e) => handleInputChange(36, e.target.value)}
                      className="w-[120px] border border-gray-300 rounded-md px-1 py-0.5 text-lg focus:border-blue-400 focus:outline-none"
                      type="text"
                    />
                  </td>
                  <td className="border p-2 text-left">
                    {renderText(
                      "to bring more cold water into ice-forming areas"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="space-y-4">
              <h1 className="text-lg font-bold">
                {renderText("Questions 37-40")}
              </h1>

              <p>
                {renderText(
                  "Look at the following statements (Questions 37-40) and the list of scientists below."
                )}
              </p>

              <p>
                {renderText(
                  "Match each statement with the correct scientist, A-D."
                )}
              </p>

              <p>
                {renderText(
                  "Choose the correct letter, A-D, next to Questions 37-40."
                )}
              </p>
              <div className="flex items-center justify-center ">
                <div className="w-80 border-2">
                  <h2 className="font-bold mt-4 text-center">
                    {renderText("List of Scientists")}
                  </h2>

                  <ul className="list-none space-y-1 pl-4">
                    <li>{renderText("A. Roger Angel")}</li>
                    <li>{renderText("B. Phil Rasch")}</li>
                    <li>{renderText("C. Dan Lunt")}</li>
                    <li>{renderText("D. Martin Sommerkorn")}</li>
                  </ul>
                </div>
              </div>

              {/* ---------- Question 37 ---------- */}
              <p className="flex items-center gap-2 flex-wrap mt-4">
                <span className="font-bold text-lg">{renderText("37.")}</span>
                {renderText(
                  "The effects of geo-engineering may not be long-lasting."
                )}
                <div className="relative w-32">
                  <select
                    value={userAnswers[37] || ""}
                    onChange={(e) => handleInputChange(37, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("37")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 38 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("38.")}</span>
                {renderText("Geo-engineering is a topic worth exploring.")}
                <div className="relative w-32">
                  <select
                    value={userAnswers[38] || ""}
                    onChange={(e) => handleInputChange(38, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("38")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 39 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("39.")}</span>
                {renderText(
                  "It may be necessary to limit the effectiveness of geo-engineering projects."
                )}
                <div className="relative w-32">
                  <select
                    value={userAnswers[39] || ""}
                    onChange={(e) => handleInputChange(39, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("39")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>

              {/* ---------- Question 40 ---------- */}
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{renderText("40.")}</span>
                {renderText(
                  "Research into non-fossil-based fuels cannot be replaced by geo-engineering."
                )}
                <div className="relative w-32">
                  <select
                    value={userAnswers[40] || ""}
                    onChange={(e) => handleInputChange(40, e.target.value)}
                    className="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{renderText("40")}</option>
                    <option value="A">{renderText("A")}</option>
                    <option value="B">{renderText("B")}</option>
                    <option value="C">{renderText("C")}</option>
                    <option value="D">{renderText("D")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaChevronDown />
                  </span>
                </div>
              </p>
            </div>
          </div>

          {/* ---------- Marks display ---------- */}
          {/* ---------- Marks Section (Submit + Result Display) ---------- */}
          <div className="mt-10">
            {!showResult ? (
              <div className="flex items-center justify-center">
                {" "}
                <button
                  onClick={() => setShowResult(true)}
                  className="px-8 py-3 bg-blue-600  text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="border-2 border-gray-400 rounded-xl p-6 text-center shadow-sm bg-white">
                  <h1 className="text-3xl font-bold mb-2"> Result</h1>
                  <p className="text-green-600 text-2xl font-semibold">
                    Your Score: {score}/13
                  </p>
                </div>

                {/* All Answers List */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    All Answers (27-40)
                  </h3>

                  <ul className="space-y-3">
                    {Array.from({ length: 14 }, (_, i) => i + 27).map((num) => {
                      const userAnswer =
                        userAnswers[num]?.trim().toLowerCase() || "";
                      const correctAnswer = correctAnswers[num]
                        ?.trim()
                        .toLowerCase();

                      const isCorrect =
                        userAnswer && userAnswer === correctAnswer;

                      const isWrong =
                        userAnswer && userAnswer !== correctAnswer;

                      const noAnswer = !userAnswer;

                      return (
                        <li
                          key={num}
                          className="p-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-2">
                            {/* ICONS */}
                            {isCorrect && (
                              <span className="text-green-600 text-xl font-bold">
                                <FaDotCircle />
                              </span> // GREEN CIRCLE
                            )}
                            {(isWrong || noAnswer) && (
                              <div className="w-6 h-6 bg-red-500 p-3 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold leading-none">
                                  <ImCross />
                                </span>
                              </div>
                            )}

                            <p className="font-bold">Q{num}:</p>
                          </div>

                          {/* User Answer */}
                          <p className="ml-8">
                            <span className="font-semibold">Your Answer:</span>{" "}
                            {noAnswer ? (
                              <span className=" italic">
                                No answer provided
                              </span>
                            ) : (
                              <span>{userAnswer}</span>
                            )}
                          </p>

                          {/* Correct Answer */}
                          <p className="ml-8">
                            <span className="font-semibold text-green-600">
                              Correct Answer:
                            </span>{" "}
                            <span>{correctAnswers[num]}</span>
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
      <Reading1Pagination2016></Reading1Pagination2016>
      {/* <Reading2Pagination2017></Reading2Pagination2017> */}
    </div>
  );
};

export default Reading1Part32016;
