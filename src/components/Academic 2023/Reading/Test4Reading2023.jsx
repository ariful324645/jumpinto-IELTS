import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowUp } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading2023 = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // First question group options
  const peopleQ1 = [
    "a longer growing season for edible produce",
    "more economical use of water",
    "greater water-storage capacity",
    "ability to cultivate more plant types",
    "a large surface area for growing plants",
  ];

  // Second question group options
  const peopleQ2 = [
    "to provide habitats for a wide range of species",
    "to grow plants successfully even in the wettest climates",
    "to regulate the temperature of the immediate environment",
    "to generate power from a sustainable source",
    "to collect water to supply other buildings",
  ];

  // State for each question group
  const [selectedQ1, setSelectedQ1] = useState([]);
  const [selectedQ2, setSelectedQ2] = useState([]);

  // Handler for first group (max 2)
  const handleChangeQ1 = (person) => {
    if (selectedQ1.includes(person)) {
      setSelectedQ1(selectedQ1.filter((p) => p !== person));
    } else {
      if (selectedQ1.length < 2) {
        setSelectedQ1([...selectedQ1, person]);
      }
    }
  };

  // Handler for second group (max 2)
  const handleChangeQ2 = (person) => {
    if (selectedQ2.includes(person)) {
      setSelectedQ2(selectedQ2.filter((p) => p !== person));
    } else {
      if (selectedQ2.length < 2) {
        setSelectedQ2([...selectedQ2, person]);
      }
    }
  };

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

          <div>
            <h1 className="text-lg">
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>

          <h1 className="text-2xl font-bold text-center">Green roofs</h1>

          <h1 className="text-lg font-bold">A</h1>
          <p className="text-lg">
            Rooftops covered with grass, vegetable gardens and lush foliage are
            now a common sight in many cities around the world. More and more
            private companies and city authorities are investing in green roofs,
            drawn to their wide-ranging benefits.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Among the benefits are saving on energy costs, mitigating the risk
              of floods, making habitats for urban wildlife, tackling air
              pollution and even growing food.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6,7
                </span>
              )}
            </span>
            These increasingly radical urban designs can help cities adapt to
            the monumental problems they face, such as access to resources and a
            lack of green space due to development. But the involvement of city
            authorities, businesses and other institutions is crucial to
            ensuring their success - as is research investigating different
            options to suit the variety of rooftop spaces found in cities. The
            UK is relatively new to developing green roofs, and local
            governments and institutions are playing a major role in spreading
            the practice. London is home to much of the UK's green roof market,
            mainly due to forward-thinking policies such as the London Plan,
            which has paved the way to more than doubling the area of green
            roofs in the capital.
          </p>

          <h1 className="text-lg font-bold">B</h1>
          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Ongoing research is showcasing how green roofs in cities can
              integrate with 'living walls': environmentally friendly walls
              which are partially or completely covered with greenery, including
              a growing medium, such as soil or water.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
              Research also indicates that green roofs can be integrated with
              drainage systems on the ground, such as street trees, so that the
              water is managed better and the built environment is made more
              sustainable.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
            There is also evidence to demonstrate the social value of green
            roofs.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Doctors are increasingly prescribing time spent gardening outdoors
              for patients dealing with anxiety and depression.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
              And research has found that access to even the most basic green
              spaces can provide a better quality of life for dementia sufferers
              and help people avoid obesity.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
          </p>

          <h1 className="text-lg font-bold">C</h1>
          <p className="text-lg">
            In North America, green roofs have become mainstream, with a wide
            array of expansive, accessible and food-producing roofs installed in
            buildings. Again, city leaders and authorities have helped push the
            movement forward - only recently, San Francisco, USA, created a
            policy requiring new buildings to have green roofs.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Toronto, Canada, has policies dating from the 1990s, encouraging
              the development of urban farms on rooftops.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
            These countries also benefit from having newer buildings than in
            many parts of the world, which makes it easier to install green
            roofs.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Being able to keep enough water at roof height and distribute it
              right across the rooftop is crucial to maintaining the plants on
              any green roof - especially on 'edible roofs' where fruit and
              vegetables are farmed.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
              And it's much easier to do this in newer buildings, which can
              typically hold greater weight, than to retro-fit old ones.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
              Having a stronger roof also makes it easier to grow a greater
              variety of plants, since the soil can be deeper.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  11
                </span>
              )}
            </span>
          </p>

          <h1 className="text-lg font-bold">D</h1>
          <p className="text-lg">
            For green roofs to become the norm for new developments, there needs
            to be support from public authorities and private investors.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Those responsible for maintaining buildings may have to acquire
              new skills, such as landscaping, and in some cases, volunteers may
              be needed to help out.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
              Other considerations include installing drainage paths, meeting
              health and safety requirements and perhaps allowing access for the
              public, as well as planning restrictions and disruption from
              regular activities in and around the buildings during
              installation.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
              To convince investors and developers that installing green roofs
              is worthwhile, economic arguments are still the most important.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
            The term 'natural capital' has been developed to explain the
            economic value of nature; for example, measuring the money saved by
            installing natural solutions to protect against flood damage, adapt
            to climate change or help people lead healthier and happier lives.
          </p>

          <h1 className="text-lg font-bold">E</h1>
          <p className="text-lg">
            As the expertise about green roofs grows, official standards have
            been developed to ensure that they are designed, constructed and
            maintained properly, and function well. Improvements in the science
            and technology underpinning green roof development have also led to
            new variations in the concept. For example, 'blue roofs' enable
            buildings to hold water over longer periods of time, rather than
            draining it away quickly - crucial in times of heavier rainfall.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There are also combinations of green roofs with solar panels, and
              'brown roofs' which are wilder in nature and maximise
              biodiversity.
              {highlight && (
                <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  12,13
                </span>
              )}
            </span>
            If the trend continues, it could create new jobs and a more vibrant
            and sustainable local food economy - alongside many other benefits.
            There are still barriers to overcome, but the evidence so far
            indicates that green roofs have the potential to transform cities
            and help them function sustainably long into the future.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The success stories need to be studied and replicated elsewhere,
              to make green, blue, brown and food-producing roofs the norm in
              cities around the world.
              {highlight && (
                <span className="inline-flex items-center justify-center w-10 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
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
            <h1 className=" text-lg font-bold">Questions 1-5</h1>
            <p>
              Reading Passage 1 has five paragraphs,
              <span className="font-bold text-lg">A-H</span>
            </p>
            <p>Which section contains the following information?</p>
            <p>
              Choose the correct letter,
              <span className="font-bold text-lg">A-H</span>, in boxes 1-5 on
              your answer sheet.
            </p>
            <p>
              Choose the correct letter,
              <span className="font-bold text-lg">NB</span> You may use any
              letter more than once.
            </p>

            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">1.</span>
              <span>
                mention of several challenges to be overcome before a green roof
                can be installed
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
                reference to a city where green roofs have been promoted for
                many years
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
                a belief that existing green roofs should be used as a model for
                new ones
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
              examples of how green roofs can work in combination with other
              green urban initiatives
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
            <p className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">5.</span>
              the need to make a persuasive argument for the financial benefits
              of green roofs
              <div class="relative w-40">
                <select class="appearance-none w-full border-2 border-gray-300 rounded-md px-4 py-2 text-gray-700 pr-10 focus:outline-none focus:border-blue-400">
                  <option value="">5</option>
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
            <h2 className="text-lg font-bold mb-3">Questions 6-9</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold mr-2">ONE WORD ONLY </span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg ">
              Write your answers in boxes 6-9 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              Advantages of green roofs
            </h1>

            {/* ---------- Section 1 ---------- */}

            <ul className="list-disc list-inside space-y-3">
              <p className="text-lg">
                <span>
                  City rooftops covered with greenery have many advantages.
                  These include lessening the likelihood that floods will occur,
                  reducing how much money is spent on
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
                <span></span>
              </p>
              <p className="text-lg">
                <span>
                  {" "}
                  and creating environments that are suitable for wildlife. In
                  many cases, they can also be used for producing
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
                <span>.</span>
              </p>
              <p className="text-lg">
                <span>
                  There are also social benefits of green roofs. For example,
                  the medical profession recommends
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
                <span></span>
              </p>
              <p className="text-lg">
                <span>
                  as an activity to help people cope with mental health issues.
                  Studies have also shown that the availability of green spaces
                  can prevent physical problems such as
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </p>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}

          <div className="space-y-4">
            {/* section 1 */}
            <h1 className=" text-lg font-bold">Questions 10 and 11</h1>

            <p>
              Choose <span className="font-bold text-lg">TWO</span> letters,
              A-E.
              <span className="font-bold text-lg">A-H</span>
            </p>

            <p>
              <span className="font-bold text-lg"> 10-11</span> Which{" "}
              <span className="font-bold text-lg mr-2"> TWO</span>
              advantages of using newer buildings for green roofs are mentioned
              in Paragraph C of the passage?
            </p>

            {/* Questions 10 and 11 */}
            <div>
              <h2 className="text-lg font-bold mb-2">Questions 10-11</h2>
              <ul className="list-[upper-alpha] ml-10 list-inside space-y-2">
                {peopleQ1.map((person, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedQ1.includes(person)}
                      onChange={() => handleChangeQ1(person)}
                      disabled={
                        !selectedQ1.includes(person) && selectedQ1.length >= 2
                      }
                      className="w-5 h-5"
                    />
                    <span>{person}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* section 2 */}
            <h1 className=" text-lg font-bold">Questions 12 and 13</h1>

            <p>
              Choose <span className="font-bold text-lg">TWO</span> letters,
              A-E.
              <span className="font-bold text-lg">A-H</span>
            </p>

            <p>
              <span className="font-bold text-lg"> 12-13</span> Which{" "}
              <span className="font-bold text-lg mr-2"> TWO</span>
              advantages of using newer buildings for green roofs are mentioned
              in Paragraph C of the passage?
            </p>

            {/* Questions 12 and 13 */}
            <div>
              <h2 className="text-lg font-bold mb-2">Questions 12-13</h2>
              <ul className="list-[upper-alpha] list-inside ml-10 space-y-2">
                {peopleQ2.map((person, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedQ2.includes(person)}
                      onChange={() => handleChangeQ2(person)}
                      disabled={
                        !selectedQ2.includes(person) && selectedQ2.length >= 2
                      }
                      className="w-5 h-5"
                    />
                    <span>{person}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test4Reading2023;
