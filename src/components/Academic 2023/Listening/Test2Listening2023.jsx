import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test2Listening2023 = () => {
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

        <div className="w-1/2 bg-white space-y-5 rounded-lg shadow-md p-4 overflow-y-scroll">
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
            Working at Milo's Restaurants
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            woman from a job agency giving information to a man about work in a
            chain of restaurants.First, you have some time to look at questions
            1 to 5.Now listen carefully and answer questions 1 to 5. WOMAN:So, I
            understand you're interested in restaurant work.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Yes, I've got a bit of
            experience, and I can provide references.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>That's good, I can check
            all that later.Now, Milo's restaurants have some vacancies at the
            moment.They're a really good company to work for, lots of benefits.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>Oh right.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Yes.They've got a very good
            reputation for looking after staff.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              For example, all employees get training, even temporary staff.
              {highlight && "(1)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            Oh, really?That's quite unusual, isn't it?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            Certainly is.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            And do staff get free uniforms too?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            Um. You just need to wear a white T-shirt and black trousers, it
            says here, so I guess not.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              But another benefit of working for a big company like this is that
              you can get a discount at any of their restaurants.
              {highlight && "(2)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>Even at weekends?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>No, but you'll be working
            then anyway.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>Oh yes, I suppose so.Um. Most
            of their restaurants are in the city center, aren't they?So easy to
            get to by bus.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            Yes, that's right.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              But if you have to do a late shift and finish work after
              midnight,3the company will pay for you to get a taxi home.
              {highlight && "(3)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>I probably won't need one.I
            think I'd use my bike.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>OK.Now, they do have some
            quite specific requirements for the kind of person they're looking
            for.Milo's is a young dynamic company, and they're really keen on
            creating a strong team.It's really important that you can fit in and
            get on well with everyone.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            Yep, I've got no problem with that.It sounds good actually.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The last place I worked for was quite demanding too, we had to
              make sure we gave a really high level of service.
              {highlight && "(4)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> That's good to hear,
            because that will be equally important at Milo's.I know they want
            people who have an eye for detail.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            That's fine.I'm very used to working in that kind of environment.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Perfect.So the only other
            thing that's required is good communication skills.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So you'll need to have a certificate in English.
              {highlight && "(5)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            Sure.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Before you hear the
            rest of the conversation, you have some time to look at questions 6
            to 10.Now listen and answer questions 6 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            OK. Let's have a look at the current job vacancies at Milo's.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The first one is in Wivenhoe street.
              {highlight && "(6)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Sorry, where?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> They're looking for a
            breakfast supervisor.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> That would be OK.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>So you're probably familiar
            with the kind of responsibilities involved, obviously checking that
            all the portions are correct, et cetera.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And then things like checking all the procedures for cleaning the
              equipment are being followed.
              {highlight && "(7)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> OK, and what about the
            salary?In my last job, I was getting £9.50 per hour.I was hoping to
            get a bit more than that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, to begin with, you'd be getting £9.75, but that goes up to
              £11.25 after three months.
              {highlight && "(8)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>I might prefer that,
            actually.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Right, well obviously this
            role would involve supporting the sous chef and other senior staff,
            and you'd be responsible for making sure there's enough stock each
            week.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And sorting out all the deliveries.
              {highlight && "(9)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>I've never done that before,
            but I imagine it's fairly straightforward once you get the hang of
            it.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Yes, and you'd be working
            alongside more experienced staff to begin with.So I'm sure it
            wouldn't be a problem.The salary is slightly higher here. It's an
            annual salary of 23,000 pounds.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> I know that if they like
            you it's likely you'll be promoted quite quickly, so that's worth
            thinking about.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Yes, it does sound
            interesting.What are the hours like?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            The usual, I think.There's a lot of evening and weekend work, but
            they're closed on Mondays.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              But you do get one Sunday off every 4 weeks, so would you like me
              to send off your...
              {highlight && "(10)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1.You now have one minute to check your answers to part 1.
          </h3>
        </div>

        {/* right div */}
        <div className="md:w-[75%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-lg cursor-pointer"
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

          <h2 className="text-lg font-bold mb-3">Questions 1–6</h2>
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD ONLY</span> for each answer.
          </h3>

          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">
              Working at Milo's Restaurants
            </h1>

            <h2 className="text-lg font-bold mt-6">Benefits</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block"></span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>provided for all staff.</span>
              </li>
              <li className="text-lg">
                <span className="inline-block"></span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>during weekdays at all Milo's Restaurants.</span>
              </li>
              <li className="text-lg">
                <span className="inline-block"></span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>provided after midnight.</span>
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">Person specification</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                must be prepared to work well in a team
              </li>
              <li className="text-lg">
                <span className="inline-block">
                  must care about maintaining a high standard of
                </span>
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
                <span>.</span>
              </li>
              <li className="text-lg">
                <span className="inline-block">
                  must have a qualification in
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
                <span>.</span>
              </li>
            </ul>
          </div>

          {/* TABLE SECTION */}
          <div className="mt-5 w-[500px] h-full">
            <h2 className="text-lg font-bold mb-3">Questions 6–10</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE WORD</span> for each answer.
            </h3>
            {/* table */}
            <table className="border-collapse border border-gray-400 w-[400px] text-center">
              <thead>
                <tr>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Job title</th>
                  <th className="border p-2">Responsibilities include</th>
                  <th className="border p-2">Pay and conditions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 text-sm  p-2">
                    <p className="text-lg">
                      <span className="inline-block"></span>
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
                      <span>street.</span>
                    </p>
                  </td>
                  <td className="border border-gray-400 p-2">
                    Breakfast supervisor
                  </td>
                  <td className="border border-gray-400 p-2">
                    <ul className="list-disc list-inside ">
                      <li className="text-lg">
                        Checking portions, etc. are correct
                      </li>
                      <li className="text-lg">
                        <span className="inline-block">Making sure</span>
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
                        <span>is clean.</span>
                      </li>
                    </ul>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <ul className="list-disc list-inside ">
                      <li className="text-lg">
                        <span className="inline-block">Starting salary £</span>
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
                        <span>per hour.</span>
                      </li>
                      <li className="text-lg">Start work at 5.30 a.m.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-sm  p-2">
                    City Road
                  </td>
                  <td className="border border-gray-400 p-2">junior chef</td>
                  <td className="border border-gray-400 p-2">
                    <ul className="list-disc list-inside ">
                      <li className="text-lg">Supporting senior chefs</li>
                      <li className="text-lg">
                        <span className="inline-block">
                          Maintaining stock and organising
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
                        <span>is clean.</span>
                      </li>
                    </ul>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <ul className="list-disc list-inside ">
                      <li className="text-lg">Annual salary £23,000</li>
                      <li className="text-lg">
                        <span className="inline-block">No work on a</span>
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
                          className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                          type="text"
                        />
                        <span>once a month.</span>
                      </li>
                    </ul>
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

export default Test2Listening2023;
