import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test1Reading2022 = () => {
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
    "Other countries had built underground railways before the Metropolitan line opened.",
    "More people than predicted travelled on the Metropolitan line on the first day.",
    "The use of ventilation shafts failed to prevent pollution in the tunnels.",
    "A different approach from the 'cut and cover' technique was required in London's central area",
    "The windows on City & South London trains were at eye level.",
    "The City & South London Railway was a financial success.",
    "Trains on the 'Tuppenny Tube' nearly always ran on time.",
 
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
        {/* <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-6 overflow-y-scroll">
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
            <h1 className="text-lg">
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-2xl font-bold text-center">
            The development of the London underground railway
          </h1>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In the first half of the 1800s, London's population grew at an
                astonishing rate, and the central area became increasingly
                congested.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  1
                </span>
              </span>
            )}
            In addition, the expansion of the overground railway network
            resulted in more and more passengers arriving in the
            capital.However, in 1846, a Royal Commission decided that the
            railways should not be allowed to enter the City, the capital's
            historic and business centre.The result was that the overground
            railway stations formed a ring around the City.The area within
            consisted of poorly built, overcrowded slums and the streets were
            full of horse-drawn traffic.Crossing the City became a nightmare.It
            could take an hour and a half to travel 8 km by horse-drawn carriage
            or bus.Numerous schemes were proposed to resolve these problems, but
            few succeeded.
          </p>
          <p className="text-lg">
            Amongst the most vocal advocates for a solution to London's traffic
            problems was Charles Pearson, who worked as a solicitor for the City
            of London.He saw both social and economic advantages in building an
            underground railway that would link the overground railway stations
            together and clear London slums at the same time.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                His idea was to relocate the poor workers who lived in the
                inner-city slums to newly constructed suburbs, and to provide
                cheap rail travel for them to get to work.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  2
                </span>
                Pearson's ideas gained support amongst some businessmen and in
                1851 he submitted a plan to Parliament.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  3
                </span>
              </span>
            )}
            It was rejected, but coincided with a proposal from another group
            for an underground connecting line, which Parliament passed.
          </p>
          <p className="text-lg">
            The two groups merged and established the Metropolitan Railway
            Company in August 1854.The company's plan was to construct an
            underground railway line from the Great Western Railway's (GWR)
            station at Paddington to the edge of the City at Farringdon Street -
            a distance of almost 5 km.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The organisation had difficulty in raising the funding for such
                a radical and expensive scheme, not least because of the
                critical articles printed by the press.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  4,5
                </span>
              </span>
            )}
            Objectors argued that the tunnels would collapse under the weight of
            traffic overhead, buildings would be shaken and passengers would be
            poisoned by the emissions from the train engines.However, Pearson
            and his partners persisted.
          </p>

          <p className="text-lg">
            The GWR, aware that the new line would finally enable them to run
            trains into the heart of the City, invested almost £250,000 in the
            scheme.Eventually, over a five-year period, £1m was raised.The
            chosen route ran beneath existing main roads to minimise the expense
            of demolishing buildings.Originally scheduled to be completed in 21
            months, the construction of the underground line took three years.It
            was built just below street level using a technique known as 'cut
            and cover'.A trench about ten metres wide and six metres deep was
            dug, and the sides temporarily held up with timber beams.Brick walls
            were then constructed, and finally a brick arch was added to create
            a tunnel.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                A two-metre-deep layer of soil was laid on top of the tunnel and
                the road above rebuilt.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  6
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The Metropolitan line, which opened on 10 January 1863, was the
                world's first underground railway.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  7
                </span>
              </span>
            )}
            On its first day, almost 40,000 passengers were carried between
            Paddington and Farringdon, the journey taking about 18 minutes.By
            the end of the Metropolitan's first year of operation, 9.5 million
            journeys had been made.
          </p>
          <p className="text-lg">
            Even as the Metropolitan began operation, the first extensions to
            the line were being authorised; these were built over the next five
            years, reaching Moorgate in the east of London and Hammersmith in
            the west.The original plan was to pull the trains with steam
            locomotives, using firebricks in the boilers to provide steam, but
            these engines were never introduced.Instead, the line used specially
            designed locomotives that were fitted with water tanks in which
            steam could be condensed.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                However, smoke and fumes remained a problem, even though
                ventilation shafts were added to the tunnels.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  9
                </span>
              </span>
            )}
          </p>
          <p className="text-lg">
            Despite the extension of the underground railway, by the 1880s,
            congestion on London's streets had become worse.The problem was
            partly that the existing underground lines formed a circuit around
            the centre of London and extended to the suburbs, but did not cross
            the capital's centre.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The 'cut and cover' method of construction was not an option in
                this part of the capital
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  10
                </span>
              </span>
            )}
            The only alternative was to tunnel deep underground.
          </p>
          <p className="text-lg">
            Although the technology to create these tunnels existed, steam
            locomotives could not be used in such a confined space.It wasn't
            until the development of a reliable electric motor, and a means of
            transferring power from the generator to a moving train, that the
            world's first deep-level electric railway, the City & South London,
            became possible.The line opened in 1890, and ran from the City to
            Stockwell, south of the River Thames.The trains were made up of
            three carriages and driven by electric engines.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The carriages were narrow and had tiny windows just below the
                roof because it was thought that passengers would not want to
                look out at the tunnel walls.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  11
                </span>
              </span>
            )}
            The line was not without its problems, mainly caused by an
            unreliable power supply.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Although the City & South London Railway was a great technical
                achievement, it did not make a profit.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  12
                </span>
              </span>
            )}
            Then, in 1900, the Central London Railway, known as the 'Tuppenny
            Tube', began operation using new electric locomotives.It was very
            popular and soon afterwards new railways and extensions were added
            to the growing tube network.By 1907, the heart of today's
            Underground system was in place.
          </p>
        </div> */}

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

          <h1 className="text-2xl font-bold text-center">
            The development of the London underground railway
          </h1>

          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              In the first half of the 1800s, London's population grew at an
              astonishing rate, and the central area became increasingly
              congested.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            In addition, the expansion of the overground railway network
            resulted in more and more passengers arriving in the capital.
            However, in 1846, a Royal Commission decided that the railways
            should not be allowed to enter the City, the capital's historic and
            business centre. The result was that the overground railway stations
            formed a ring around the City. The area within consisted of poorly
            built, overcrowded slums and the streets were full of horse-drawn
            traffic. Crossing the City became a nightmare. It could take an hour
            and a half to travel 8 km by horse-drawn carriage or bus. Numerous
            schemes were proposed to resolve these problems, but few succeeded.
          </p>

          <p className="text-lg">
            Amongst the most vocal advocates for a solution to London's traffic
            problems was Charles Pearson, who worked as a solicitor for the City
            of London. He saw both social and economic advantages in building an
            underground railway that would link the overground railway stations
            together and clear London slums at the same time.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              His idea was to relocate the poor workers who lived in the
              inner-city slums to newly constructed suburbs, and to provide
              cheap rail travel for them to get to work.{" "}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
              Pearson's ideas gained support amongst some businessmen and in
              1851 he submitted a plan to Parliament.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
            It was rejected, but coincided with a proposal from another group
            for an underground connecting line, which Parliament passed.
          </p>

          <p className="text-lg">
            The two groups merged and established the Metropolitan Railway
            Company in August 1854. The company's plan was to construct an
            underground railway line from the Great Western Railway's (GWR)
            station at Paddington to the edge of the City at Farringdon Street -
            a distance of almost 5 km.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The organisation had difficulty in raising the funding for such a
              radical and expensive scheme, not least because of the critical
              articles printed by the press.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4,5
                </span>
              )}
            </span>
            Objectors argued that the tunnels would collapse under the weight of
            traffic overhead, buildings would be shaken and passengers would be
            poisoned by the emissions from the train engines. However, Pearson
            and his partners persisted.
          </p>

          <p className="text-lg">
            The GWR, aware that the new line would finally enable them to run
            trains into the heart of the City, invested almost £250,000 in the
            scheme. Eventually, over a five-year period, £1m was raised. The
            chosen route ran beneath existing main roads to minimise the expense
            of demolishing buildings. Originally scheduled to be completed in 21
            months, the construction of the underground line took three years.
            It was built just below street level using a technique known as 'cut
            and cover'. A trench about ten metres wide and six metres deep was
            dug, and the sides temporarily held up with timber beams. Brick
            walls were then constructed, and finally a brick arch was added to
            create a tunnel.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              A two-metre-deep layer of soil was laid on top of the tunnel and
              the road above rebuilt.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
          </p>

          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The Metropolitan line, which opened on 10 January 1863, was the
              world's first underground railway.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
            On its first day, almost 40,000 passengers were carried between
            Paddington and Farringdon, the journey taking about 18 minutes. By
            the end of the Metropolitan's first year of operation, 9.5 million
            journeys had been made.
          </p>

          <p className="text-lg">
            Even as the Metropolitan began operation, the first extensions to
            the line were being authorised; these were built over the next five
            years, reaching Moorgate in the east of London and Hammersmith in
            the west. The original plan was to pull the trains with steam
            locomotives, using firebricks in the boilers to provide steam, but
            these engines were never introduced. Instead, the line used
            specially designed locomotives that were fitted with water tanks in
            which steam could be condensed.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              However, smoke and fumes remained a problem, even though
              ventilation shafts were added to the tunnels.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
          </p>

          <p className="text-lg">
            Despite the extension of the underground railway, by the 1880s,
            congestion on London's streets had become worse. The problem was
            partly that the existing underground lines formed a circuit around
            the centre of London and extended to the suburbs, but did not cross
            the capital's centre.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The 'cut and cover' method of construction was not an option in
              this part of the capital
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
            </span>
            The only alternative was to tunnel deep underground.
          </p>

          <p className="text-lg">
            Although the technology to create these tunnels existed, steam
            locomotives could not be used in such a confined space. It wasn't
            until the development of a reliable electric motor, and a means of
            transferring power from the generator to a moving train, that the
            world's first deep-level electric railway, the City & South London,
            became possible. The line opened in 1890, and ran from the City to
            Stockwell, south of the River Thames. The trains were made up of
            three carriages and driven by electric engines.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The carriages were narrow and had tiny windows just below the roof
              because it was thought that passengers would not want to look out
              at the tunnel walls.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  11
                </span>
              )}
            </span>
            The line was not without its problems, mainly caused by an
            unreliable power supply.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Although the City & South London Railway was a great technical
              achievement, it did not make a profit.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  12
                </span>
              )}
            </span>
            Then, in 1900, the Central London Railway, known as the 'Tuppenny
            Tube', began operation using new electric locomotives. It was very
            popular and soon afterwards new railways and extensions were added
            to the growing tube network. By 1907, the heart of today's
            Underground system was in place.
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

            <h2 className="text-lg font-bold mb-3">Questions 1-8</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-8 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              The London underground railway
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">The problem</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>The</span>
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
                <span>of London increased rapidly between 1800 and 1850</span>
              </li>
              <li className="text-lg">
                The streets were full of horse-drawn vehicles
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">The proposed solution</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Charles Pearson, a solicitor, suggested building an underground
                railway
              </li>
              <li className="text-lg">
                <span>
                  Building the railway would make it possible to move people to
                  better housing in the
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
                <span>A number of</span>
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
                <span>agreed with Pearson's idea.</span>
              </li>

              <li className="text-lg">
                <span>The company initially had problems getting the</span>
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
                <span>needed for the project</span>
              </li>
              <li className="text-lg">
                <span>Negative articles about the project appeared in the</span>
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
         
            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">The construction</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                The chosen route did not require many buildings to be pulled
                down
              </li>
              <li className="text-lg">
                The 'cut and cover' method was used to construct the tunnels
              </li>
              <li className="text-lg">
                <span>
                  With the completion of the brick arch, the tunnel was covered
                  with
                </span>
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
                <span>.</span>
              </li>
            </ul>

         
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 7-13 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 7-13 on your answer sheet, choose
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
                    {qIndex + 8}
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

export default Test1Reading2022;
