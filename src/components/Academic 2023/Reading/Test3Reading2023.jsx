import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowUp } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";

const Test3Reading2023 = () => {
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
            <h1 className="text-lg">
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-2xl font-bold text-center">
            Materials to take us beyond concrete
          </h1>
          <h3 className="text-lg font-bold text-center italic">
            Concrete is everywhere, but it's bad for the planet, generating
            large amounts of carbon dioxide - alternatives are being developed
          </h3>
          <h1 className="text-lg font-bold">A</h1>
          <p className="text-lg">
            Concrete is the second most used substance in the global economy,
            after water - and one of the world's biggest single sources of
            greenhouse gas emissions.The chemical process by which cement, the
            key ingredient of concrete, is created results in large quantities
            of carbon dioxide.The UN estimates that there will be 9.8 billion
            people living on the planet by mid-century.They will need somewhere
            to live.If concrete is the only answer to the construction of new
            cities, then carbon emissions will soar, aggravating global
            warming.And so scientists have started innovating with other
            materials, in a scramble for alternatives to a universal commodity
            that has underpinned our modern life for many years.
          </p>
          <h1 className="text-lg font-bold">B</h1>
          <p className="text-lg">
            The problem with replacing concrete is that it is so very good at
            what it does.Chris Cheeseman, an engineering professor at Imperial
            College London, says the key thing to consider is the extent to
            which concrete is used around the world, and is likely to continue
            to be used."Concrete is not a high-carbon product.Cement is high
            carbon, but concrete is not.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                But it is the scale on which it is used that makes it high
                carbon.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  13
                </span>
                The sheer scale of manufacture is so huge, that is the issue."
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  13
                </span>
              </span>
            )}
          </p>
          <h1 className="text-lg font-bold">C</h1>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Not only are the ingredients of concrete relatively cheap and
                found in abundance in most places around the globe, the stuff
                itself has marvellous properties: Portland cement, the vital
                component of concrete, is mouldable and pourable, but quickly
                sets hard.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  3
                </span>
              </span>
            )}
            Cheeseman also notes another advantage: concrete and steel have
            similar thermal expansion properties, so steel can be used to
            reinforce concrete, making it far stronger and more flexible as a
            building material than it could be on its own.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                According to Cheeseman, all these factors together make concrete
                hard to beat.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  10
                </span>
                Making anything with similar properties is going to be very
                difficult."
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  10
                </span>
              </span>
            )}
          </p>
          <h1 className="text-lg font-bold">D</h1>
          <p className="text-lg">
            A possible alternative to concrete is wood.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Making buildings from wood may seem like a rather medieval idea,
                but climate change is driving architects to turn to treated
                timber as a possible resource.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  5
                </span>
              </span>
            )}
            Recent years have seen the emergence of tall buildings constructed
            almost entirely from timber.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Vancouver, Vienna and Brumunddal in Norway are all home to
                constructed tall, wooden buildings.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  2
                </span>
              </span>
            )}
          </p>
          <h1 className="text-lg font-bold">E</h1>
          <p className="text-lg">
            Using wood to construct buildings, however, is not straightforward.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Wood expands as it absorbs moisture from the air and is
                susceptible to pests, not to mention fire.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  6
                </span>
              </span>
            )}
            But treating wood and combining it with other materials can improve
            its properties.Cross-laminated timber is engineered wood.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                An adhesive is used to stick layers of solid-sawn timber
                together, crosswise, to form building blocks.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  7
                </span>
                This material is light but has the strength of concrete and
                steel.Construction experts say that wooden buildings can be
                constructed at a greater speed than ones of concrete and steel
                and the process, it seems, is quieter.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  8
                </span>
              </span>
            )}
          </p>
          <h1 className="text-lg font-bold">F</h1>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Stora Enso is Europe's biggest supplier of cross-laminated
                timber, and its vice-president Markus Mannström reports that the
                company is seeing increasing demand globally for building in
                wood, with climate change concerns the key driver.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  11
                </span>
              </span>
            )}
            Finland, with its large forests, where Stora Enso is based, has been
            leading the way, but the company is seeing a rise in demand for its
            timber products across the world, including in Asia.Of course, using
            timber in a building also locks away the carbon that it absorbed as
            it grew.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                But even treated wood has its limitations and only when a wider
                range of construction projects has been proven in practice will
                it be possible to see wood as a real alternative to concrete in
                constructing tall buildings.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  4
                </span>
              </span>
            )}
          </p>
          <h1 className="text-lg font-bold">G</h1>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Fly ash and slag from iron ore are possible alternatives to
                cement in a concrete mix.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  1
                </span>
                Fly ash, a byproduct of coal-burning power plants, can be
                incorporated into concrete mixes to make up as much as 15 to 30%
                of the cement, without harming the strength or durability of the
                resulting mix.{" "}
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  1
                </span>
                Iron-ore slag, a byproduct of the iron-ore smelting process, can
                be used in a similar way.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  1
                </span>
              </span>
            )}
            Their incorporation into concrete mixes has the potential to reduce
            greenhouse gas emissions.
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                But Anna Surgenor, of the UK's Green Building Council, notes
                that although these waste products can save carbon in the
                concrete mix, their use is not always straightforward.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  9
                </span>
              </span>
            )}
            "It's possible to replace the cement content in concrete with waste
            products to lower the overall carbon impact.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                But there are several calculations that need to be considered
                across the entire life cycle of the building - these include
                factoring in where these materials are being shipped from.
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  9
                </span>
                If they are transported over long distances, using fossil fuels,
                the use of alternative materials might not make sense from an
                overall carbon reduction perspective."
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  9
                </span>
              </span>
            )}
          </p>
          <h1 className="text-lg font-bold">H</h1>
          <p className="text-lg">
            While these technologies are all promising ideas, they are either
            unproven or based on materials that are not abundant.In their
            overview of innovation in the concrete industry, Felix Preston and
            Johanna Lehne of the UK's Royal Institute of International Affairs
            reached the conclusion that, "Some novel cements have been discussed
            for more than a decade within the research community, without
            breaking through.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                At present, these alternatives are rarely as cost-effective as
                conventional cement, and they face raw-material shortages and
                resistance from customers."
                <span className="inline-flex items-center justify-center w-8 h-6  bg-yellow-700 rounded-sm  text-white font-semibold">
                  12
                </span>
              </span>
            )}
          </p>
        </div>
      

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
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
          {/* optional question */}
          <div className="space-y-4">
            <h1 className=" text-lg font-bold">Questions 1-4</h1>
            <p>
              Reading Passage 1 has eight sections,{" "}
              <span className="font-bold text-lg">A-H</span>
            </p>
            <p>Which section contains the following information?</p>
            <p>
              Choose the correct letter,
              <span className="font-bold text-lg">A-H</span>, in boxes 1-4 on
              your answer sheet.
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">1.</span>
              <span>
                an explanation of the industrial processes that create potential
                raw materials for concrete
              </span>

              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">1</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">2.</span>
              <span>
                a reference to the various locations where high-rise wooden
                buildings can be found
              </span>

              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">2</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">3.</span>
              <span>
                an indication of how widely available the raw materials of
                concrete are
              </span>

              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="">3</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">4.</span>
              the belief that more high-rise wooden buildings are needed before
              wood can be regarded as a viable construction material
              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="">4</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
          </div>
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">Questions 5-8</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold mr-2">ONE WORD ONLY </span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg ">
              Write your answers in boxes 1-8 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              Making buildings with wood
            </h1>

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>
                  Wood is a traditional building material, but current
                  environmental concerns are encouraging
                </span>
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
                <span>to use wood in modern construction projects.</span>
              </p>
              <p className="text-lg">
                <span>
                  Using wood, however, has its challenges. For example, as
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
                <span>
                  {" "}
                  in the atmosphere enters wood, it increases in size. In
                  addition, wood is prone to pests and the risk of fire is
                  greater.
                </span>
              </p>
              <p className="text-lg">
                <span>
                  {" "}
                  However, wood can be turned into a better construction
                  material if it is treated and combined with other materials.
                  In one process
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  of solid wood are glued together to create building blocks..
                </span>
              </p>
              <p className="text-lg">
                <span>
                  These blocks are lighter than concrete and steel but equal
                  them in strength. Experts say that wooden buildings are an
                  improvement on those made of concrete and steel in terms of
                  the
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>
                  with which they can be constructed and how much noise is
                  generated by the process..
                </span>
              </p>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          {/* optional question */}
          <div className="space-y-4">
            <h1 className=" text-lg font-bold">Questions 9-13</h1>
            <p>
              Look at the following statements (Questions 9-13) and the list of
              people below.
            </p>
            <p>
              Match each statement with the correct person,
              <span className="font-bold text-lg">A-H</span>
            </p>

            <p>
              Choose the correct letter,
              <span className="font-bold text-lg">A-H</span>, in boxes 9-13 on
              your answer sheet.
            </p>
            <p>
              <span className="font-bold text-lg">NB</span> You may use any
              letter more than once.
            </p>
            <div className="flex items-center justify-center">
              <div className="flex items-center border-2 border-gray-300 w-80 md:w-96 px-4 py-8 justify-center">
                <div>
                  <h1 className="text-xl font-bold text-center mb-4 hidden sm:block">
                    List of People
                  </h1>
                  <ul className="list-[upper-alpha] list-inside text-lg">
                    <li>Chris Cheeseman</li>
                    <li>Markus Mannström</li>
                    <li>Anna Surgenor</li>
                    <li>Felix Preston and Johanna Lehne</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">9.</span>
              <span>
                The environmental advantage of cement alternatives may not be as
                great as initially assumed.
              </span>

              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">9</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">10.</span>
              <span>
                It would be hard to create a construction alternative to
                concrete that offers so many comparable benefits.
              </span>

              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="1">10</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">11.</span>
              <span>
                Worries about the environment have led to increased interest in
                wood as a construction material.
              </span>

              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="">11</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">12.</span>
              Expense has been a factor in the negative response to the
              development of new cements.
              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="">12</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
            <p className="flex items-center flex-wrap">
              <span className="font-bold text-lg">13.</span>
              The environmental damage caused by concrete is due to it being
              produced in large quantities.
              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="">13</option>
                  <option value="">A</option>
                  <option value="">B</option>
                  <option value="">C</option>
                  <option value="">D</option>
                  <option value="">E</option>
                  <option value="">F</option>
                  <option value="">G</option>
                  <option value="">H</option>
                </select>

                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <IoIosArrowUp />
                </span>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3Reading2023;
