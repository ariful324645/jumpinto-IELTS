import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test1Listening2024 = () => {
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
          <div className="flex relative group justify-between items-center">
            <h1 className="text-xl font-bold">PART 1</h1>
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight(!highlight)}
              className="toggle toggle-accent"
            />
            <span className="absolute -top-7 right-6 text-left bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Toggle guided mode
            </span>
          </div>

          <div>
            <audio controls className="mt-2 w-7/12">
              <source type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <hr />
          <p>Audio Script</p>
          <h1 className="text-xl font-bold text-center">
            School Visit to Hinchingbrooke Country Park
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            teaching assistant calling a country park about a school
            visit.First, you have some time to look at questions 1 to 6.Now
            listen carefully, and answer questions 1 to 6.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> Good morning,
            Hinchingbrooke Country Park, Sally speaking.I'm one of the rangers.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>Oh, hello, uh, my name is
            John Chapman, and I'm a teaching assistant at a local primary
            school.I've been asked to arrange a visit to the park for two of our
            classes.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span>OK, what would you like to
            know?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> Well, I'm new to this
            area.So perhaps you could tell me something about the park first,
            please.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> Of course.Altogether the
            park covers 170 acres.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              That's 69 hectares.
              {highlight && "(1)"}
            </span>
            There are three main types of habitat, wetland, grassland, and
            woodland.The woods are well established and varied.With an oak
            plantation and other areas of mixed species.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> Right
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> The wetland is quite
            varied too.The original farmland was dug up around 40 years ago to
            extract gravel.Once this work was completed, the gravel pits filled
            with water, forming the two large lakes.There are also several
            smaller ones.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Ponds and a stream that flows through the park.
              {highlight && "(2)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>OK, so I suppose with these
            different habitats, there's quite a variety of wildlife.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span>There certainly is.A lot of
            different species of birds and insects, and also animals like deer
            and rabbits.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>
            And I understand you organize educational visits for school parties.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> That's right.We can
            organize a wide range of activities, and adapt them to suit all
            ages.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> Can you give me some
            examples of the activities?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> Well, one focus is on
            science, where we help children to discover and study plants, trees
            and insects.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They also collect and analyze data about the things they see.3{" "}
              {highlight && "(3)"}
            </span>{" "}
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>
            Uh huh.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span>
            Another focus is on geography.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The park is a great environment to learn and practice reading a
              map. {highlight && "(4)"}
            </span>{" "}
            And using a compass to navigate around the park.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> Do you do anything
            connected with history?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> Yes, we do.For instance,
            the children can explore how the use of the land has changed over
            time.Then there's leisure and tourism.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>
            That focuses on your visitors, I would imagine.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span>
            Yes, mostly.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The children find out about them, their requirements, the problems
              they may cause, and how we manage these.
              {highlight && "(5)"}
            </span>
            And another subject we cover is music.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Here the children experiment with natural materials to create
              sounds and explore rhythm and tempo.
              {highlight && "(6)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> That must be fun.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> Most children really enjoy
            it.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Before you hear the
            rest of the conversation, you have some time to look at questions 7
            to 10.Now listen and answer questions 7 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span>
            And of course, all the activities are educational too.Learning
            outside the classroom encourages children to be creative and to
            explore and discover for themselves.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>

            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I would imagine they get a sense of freedom that might not be a
              normal part of their lives. {highlight && "(7)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> That's right.And very
            often the children discover that they can do things they didn't know
            they could do.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And they develop new skills. {highlight && "(8)"}
            </span>
            This gives them greater self-confidence.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span>It sounds great.So what
            about the practical side of it?How much does it cost for a full day
            visit?We would expect to bring between 30 and 40 children
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              If there are over 30, it costs £4.95 for each child who attends on
              the day. {highlight && "(9)"}
            </span>
            We invoice you afterwards, so you don't pay for children who can't
            come because of sickness, for example.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There's no charge for leaders and other adults, as many as you
              want to bring. {highlight && "(10)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> That sounds very fair.Well,
            thanks for all the information.I'll need to discuss it with my
            colleagues, and I hope to get back to you soon to make a booking.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SALLY:</span> We'll look forward to
            hearing from you.Goodbye.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JOHN:</span> Goodbye, and thank you.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1.You now have one minute to check your answers to part 1.
          </h3>
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
          <h2 className="text-lg font-bold mb-3">Questions 1–10</h2> <br />
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Hinchingbrooke Country Park
            </h1>
            <h2 className="text-lg font-bold mt-6">The park</h2>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">Area:</span>
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
                hectares
              </li>
              <li className="text-lg">
                Habitats: wetland, grassland and woodland
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">
                  Wetland: lakes, ponds and a
                </span>
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
                (approx.)
              </li>
              <li className="text-lg">
                Wildlife includes birds, insects and animals
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Subjects studied in educational visits include
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">Science: Children look at</span>
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
                about plants,etc
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">
                  Geography: includes learning to use a
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
                and compass
              </li>
              <li className="text-lg">History: changes in land use</li>

              <li className=" text-lg ">
                <span className=" inline-block">
                  Leisure and tourism: mostly concentrates on the park's
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
              <li className=" text-lg ">
                <span className=" inline-block">Music: Children make</span>
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
                with natural materials, and experiment with rhythm and speed.
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Benefits of outdoor educational visits
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">
                  They give children a feeling of
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
                that they may not have elsewhere.
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">Children learn new</span>
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
                and gain self-confidence.
              </li>
            </ul>
            {/* Inner list with squares */}
            <h2 className="text-lg font-bold mt-6">Practical issues</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">Cost per child: £</span>
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
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">Adults, such as</span>
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
                ,free
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">Theatre tickets</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">save up to</span>
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
                % on ticket prices at bargaintickets.com
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">Free activities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">Blakewell Gardens:</li>
              <li className=" text-lg ">Roots Music Festival</li>
              <li className=" text-lg ">
                <span className=" inline-block">
                  climb Telegraph Hill to see a view of the
                </span>
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
                P.M
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test1Listening2024;
