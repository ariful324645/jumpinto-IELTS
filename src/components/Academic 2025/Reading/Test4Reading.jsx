import React, { useState } from "react";
import { IoBookSharp } from "react-icons/io5";

const Test4Reading = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

  const questions = [
    "Georgia O'Keeffe's style was greatly influenced by the changing fashions in art over the seven decades of her career.",
    "When O'Keeffe finished high school, she had already made her mind up about the career that she wanted.",
    "Alfred Stieglitz first discovered O'Keeffe's work when she sent some abstract drawings to his gallery in New York City.",
    "O'Keeffe was the subject of Stieglitz's photographic work for many years.",
    "O'Keeffe's paintings of the patio of her house in Abiquiú were among the artist's favourite works",
    "O'Keeffe produced a greater quantity of work during the 1950s to 1970s than at any other time in her life.",
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

          <div className="">
            <h1 className="text-xl">
              You should spend about 20 minutes on{" "}
              <span className="text-xl font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>
          <h1 className="text-xl font-bold text-center">Georgia O'Keeffe</h1>

          <p className="text-lg">
            For seven decades, Georgia O'Keeffe (1887-1986) was a major figure
            in American art.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                Remarkably, she remained independent from shifting art trends
                and her work stayed true to her own vision, which was based on
                finding the essential, abstract forms in nature.(8)
              </span>
            )}
            With exceptionally keen powers of observation and great finesse with
            a paintbrush, she recorded subtle nuances of colour, shape, and
            light that enlivened her paintings and attracted a wide audience.
          </p>
          <p className="text-lg">
            Born in 1887 near Sun Prairie, Wisconsin to cattle breeders Francis
            and Ida O'Keeffe, Georgia was raised on their farm along with her
            six siblings.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In 1851, railroads first began putting blocks of ice in
                insulated rail cars to send butter from Ogdensburg, New York, to
                Boston. (2)
              </span>
            )}
            By the time she graduated from high school in 1905, she had
            determined to make her way as an artist.9She studied the techniques
            of traditional painting at the Art Institute of Chicago school
            (1905) and the Art Students League of New York (1907-8).
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                After attending university and then training college, she became
                an art teacher and taught in elementary schools, high schools,
                and colleges in Virginia, Texas, and South Carolina from 1911 to
                1918. (1)
              </span>
            )}
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                During this period, O'Keeffe began to experiment with creating
                abstract compositions in charcoal, and produced a series of
                innovative drawings that led her art in a new direction. (2)She
                sent some of these drawings to a friend in New York, who showed
                them to art collector and photographer Alfred Stieglitz in
                January 1916.(10)
              </span>
            )}
            Stieglitz was impressed, and exhibited the drawings later that year
            at his gallery on Fifth Avenue, New York City, where the works of
            many avant-garde artists and photographers were introduced to the
            American public.
          </p>

          <p className="text-lg">
            With Stieglitz's encouragement and promise of financial support,
            O'Keeffe arrived in New York in June 1918 to begin a career as an
            artist.For the next three decades, Stieglitz vigorously promoted her
            work in twenty-two solo exhibitions and numerous group
            installations.The two were married in 1924.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                The ups and downs of their personal and professional
                relationship were recorded in Stieglitz's celebrated
                black-and-white portraits of O'Keeffe, taken over the course of
                twenty years (1917-37).(11)
              </span>
            )}
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                By the mid-1920s, O'Keeffe was recognized as one of America's
                most important and successful artists, widely known for the
                architectural pictures that dramatically depict the soaring
                skyscrapers of New York. (3)
              </span>
            )}
            But most often, she painted botanical subjects, inspired by annual
            trips to the Stieglitz family summer home.
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                In her magnified images depicting flowers, begun in 1924,
                O'Keeffe brings the viewer right into the picture. (4)
              </span>
            )}
          </p>

          <p className="text-lg">
            Enlarging the tiniest details to fill an entire metre-wide canvas
            emphasized their shapes and lines and made them appear abstract.Such
            daring compositions helped establish O'Keeffe's reputation as an
            innovative modernist.
            <br /> In 1929, O'Keeffe made her first extended trip to the state
            of New Mexico.It was a visit that had a lasting impact on her life,
            and an immediate effect on her work.Over the next two decades she
            made almost annual trips to New Mexico, staying up to six months
            there, painting in relative solitude, then returning to New York
            each winter to exhibit the new work at Stieglitz's gallery.This
            pattern continued until she moved permanently to New Mexico in 1949.
          </p>
          <p className="text-lg">
            There, O'Keeffe found new inspiration: at first, it was the numerous
            sun-bleached bones she came across in the state's rugged terrain
            that sparked her imagination.5
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                There, O'Keeffe found new inspiration: at first, it was the
                numerous sun-bleached bones she came across in the state's
                rugged terrain that sparked her imagination.(5)
              </span>
            )}
            Two of her earliest and most celebrated Southwestern paintings
            exquisitely reproduce a cow skull's weathered surfaces, jagged
            edges, and irregular openings.Later, she also explored another
            variation on this theme in her large series of Pelvis pictures,
            which focused on the contrasts between convex and concave surfaces,
            and solid and open spaces.
          </p>

          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                However, it was the region's spectacular landscape, with its
                unusual geological formations, vivid colours, clarity of light,
                and exotic vegetation, that held the artist's imagination for
                more than four decades.(6)
              </span>
            )}
            Often, she painted the rocks, cliffs, and mountains in striking
            close-up, just as she had done with her botanical subjects.
          </p>

          <p className="text-lg">
            O'Keeffe eventually owned two homes in New Mexico - the first, her
            summer retreat at Ghost Ranch, was nestled beneath 200-metre cliffs,
            while the second, used as her winter residence, was in the small
            town of Abiquiú.While both locales provided a wealth of imagery for
            her paintings, one feature of the Abiquiú house - the large walled
            patio with its black door - was particularly inspirational.In more
            than thirty pictures between 1946 and 1960, she reinvented the patio
            into an abstract arrangement of geometric shapes.
          </p>
          <p className="text-lg">
            {highlight && (
              <span className="ml-2 bg-yellow-100 ">
                From the 1950s into the 1970s, O'Keeffe travelled widely, making
                trips to Asia, the Middle East, and Europe. Flying in planes
                inspired her last two major series - aerial views of rivers and
                expansive paintings of the sky viewed from just above clouds.(7)
              </span>
            )}
            In both series, O'Keeffe increased the size of her canvases,
            sometimes to mural proportions, reflecting perhaps her newly
            expanded view of the world.When in 1965 she successfully translated
            one of her cloud motifs to a monumental canvas measuring 6 metres in
            length (with the help of assistants), it was an enormous challenge
            and a special feat for an artist nearing eighty years of age.
          </p>

          <p className="text-lg">
            The last two decades of the artist's life were relatively
            unproductive as ill health and blindness hindered her ability to
            work.O'Keeffe died in 1986 at the age of ninety-eight, but her rich
            legacy of some 900 paintings has continued to attract subsequent
            generations of artists and art lovers who derive inspiration from
            these very American images.
          </p>
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
            <h2 className="text-lg font-bold mb-3">Questions 1-7</h2>

            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br />
              Choose <span className="font-bold">ONE WORD ONLY</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-7 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              The life and work of Georgia O'Keeffe
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  studied art, then worked as a
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
                in various places in the USA
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}

            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">created drawings using</span>
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
                which were exhibited in New York City
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}

            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  moved to New York and became famous for her paintings of the 
                  city's
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
              </li>
            </ul>
            {/* Inner list with squares */}

            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  produced a series of innovative close-up paintings of
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
            </ul>

            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  went to New Mexico and was initially inspired to paint the
                  many
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
                that could be found there
              </li>
            </ul>

            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  continued to paint various features that together formed the
                  dramatic
                </span>
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
                of New Mexico for over forty years
              </li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  travelled widely by plane in later years, and painted pictures
                  of clouds and
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
                seen from above
              </li>
            </ul>
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 8-13 </h2> <br />
          <h3 className="text-xl font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 8-13 on your answer sheet, choose
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">TRUE</span>if the statement
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
                                                                                           activeNumbers[
                                                                                             qIndex
                                                                                           ]
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

export default Test4Reading;
