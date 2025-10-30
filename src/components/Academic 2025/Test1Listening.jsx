import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test1Listening = () => {
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
            <h1 className="text-3xl font-bold">PART 1</h1>
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight(!highlight)}
              className="toggle toggle-accent"
            />
          </div>

          <div className="">
            <audio controls className="mt-2 w-7/12">
              <source type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <hr />
          <p>Audio Script</p>
          <h1 className="text-2xl font-bold text-center">
            Restaurant Recommendations for a Celebration
          </h1>

          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              Part 1.You will hear a woman asking a friend for restaurant
              recommendations.First, you have some time to look at questions 1
              to 4.Now listen carefully and answer questions 1 to 4.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              I've been meaning to ask you for some advice about restaurants.I
              need to book somewhere to celebrate my sister's 30th birthday, and
              I like the sound of that place you went to for your mum's 50th.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              The Junction?Yeah, I'd definitely recommend that for a special
              occasion.We had a great time there.Everyone really enjoyed it.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Where is it again?I can't remember.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              It's on Greyson Street, only about a 2 minute walk from the
              station.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Oh, that's good.I'd prefer not to have to drive anywhere, but I
              don't want to have to walk too far either.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Yes, the location is perfect, but that's not necessarily why I'd
              recommend it.,
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  The food's amazing. If you like fish (1)
                </span>
              )}
              it's probably the best restaurant in town for that.It's always
              really fresh, and there are lots of interesting dishes to choose
              from, but all the food is good there.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">Is it really expensive?</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              It's certainly not cheap, but for a special occasion, I think it's
              fine.It's got a great atmosphere.
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  And before dinner, you can go up on the roof and have a drink.
                  (2)
                </span>
              )}
              It's really nice up there, but you need to book.It's very popular,
              as the views are spectacular.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Hmm, sounds good.So that's definitely a possibility then.Is there
              anywhere else you can think of?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              um If you want somewhere a bit less formal then you could try
              Paloma.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Where's that?I haven't heard of it.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              No, it's quite new.It's only been open a few months, but it's got
              a great reputation already.It's in a really beautiful old building
              on Bow Street.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Oh, I think I know where you mean.Right beside the cinema.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Yes, that's it.I've only been there a couple of times, but I was
              really impressed.The chef used to work at Don Filipe's
              apparently.I was really sorry when that closed down.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              So is all the food they serve Spanish then?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              ,
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  Yeah, you can get lots of small dishes to share, which always
                  works really well if you're in a group. And before dinner (3)
                </span>
              )}
              you can go up on the roof and have a drink.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">Hmm.Worth thinking about.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Yeah, there's a lively atmosphere, and the waiters are really
              friendly.The only thing is that you need to pay a 50 pound deposit
              to book a table.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              A lot of restaurants are doing that these days.I should have a
              look at the menu to check there's a good choice of vegetarian
              dishes.A couple of my friends have stopped eating meat.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  Not sure, I'd say the selection of those would be quite
                  limited. (4)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Before you hear the rest of the conversation, you have some time
              to look at questions 5 to 10.Now listen and answer questions 5 to
              10.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              I've just thought of another idea.Have you been to the Audley?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              No, don't think I've heard of it.How's it spelt?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">AUDLEY (5)</span>
              )}
              .You must have heard of it.There's been a lot about it in the
              press
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              I don't tend to pay much attention to that kind of thing.So where
              is it exactly?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  {" "}
                  It's in that hotel near Baxter Bridge, on the top floor. (6)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Oh, the views would be incredible from up there.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Yeah, I'd love to go.I can't think of the chef's name, but she was
              a judge on that TV cookery show recently, and she's written a
              couple of cookery books.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">Oh, Angela Frayn.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  That's the one.Anyway, it's had excellent reviews from all the
                  newspapers. (7)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              That would be a memorable place for a celebration.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Definitely, obviously it's worth going there just for the view,
              but the food is supposed to be really special.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              She only likes cooking with local products, doesn't she?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  Yes.Everything at the restaurant has to be sourced within a
                  short distance, and absolutely nothing flown in from abroad.
                  (8)
                </span>
              )}
              That's the one.Anyway, it's had excellent reviews from all the
              newspapers.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              I imagine it's really expensive though.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Well, you could go for the set lunch.In the evening
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  That's quite reasonable for a top class restaurant, £30 a
                  head. (9)
                </span>
              )}
              In the evening , I think it would be more like £50.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              At least that I should think, but I'm sure everyone would enjoy
              it.It's not the kind of place you leave feeling hungry though, is
              it?With tiny portions.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              No, the reviews I've read didn't mention that.
              {highlight && (
                <span className="ml-2 bg-yellow-100 font-bold">
                  I imagine they'd be average. (10)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            WOMAN:
            <span className="font-normal">
              Well, that's all great.Thanks...
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              That is the end of part 1.You now have one minute to check your
              answers to part 1.
            </span>
          </h3>
        </div>

        {/* RIGHT SIDE (Questions Table) */}
        {/* <div className="w-1/2 bg-white rounded-lg shadow-md p-4 overflow-y-scroll">
          <h2 className="text-2xl font-bold mb-2">Questions 1–10</h2> <br />
          <h3 className="text-xl font-semibold mb-4">
            Complete the table below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>
          <table className="w-sm border border-gray-300 text-left text-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-4">Name of restaurant</th>
                <th className="border p-4">Location</th>
                <th className="border p-4">Reason for recommendation</th>
                <th className="border p-4">Other comments</th>
              </tr>
            </thead>

            <tbody>
           
              <tr>
                <td className="border p-4">The Junction</td>
                <td className="border p-4">Greyson Street, near the station</td>
                <td className="border p-4">
                  Good for people who are especially keen on{" "}
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
                </td>

                <td className="border p-4">
                  <ul className="list-disc list-inside text-black space-y-2">
                    <li>Quite expensive</li>
                    <li>
                      The{" "}
                      <button
                        onClick={() => toggleButton(2)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-1 ${
                          activeButtons[2]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        2
                      </button>
                      <input
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                        type="text"
                        placeholder=""
                      />
                      is a good place for a drink
                    </li>
                  </ul>
                </td>
              </tr>

        
              <tr>
                <td className="border p-4">Paloma</td>
                <td className="border p-4">In Bow Street next to the cinema</td>
                <td className="border p-4">
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
                  food, good for sharing
                </td>
                <td className="border p-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Staff are very friendly</li>
                    <li>Need to pay £50 deposit</li>
                    <li>
                      A limited selection of
                      <button
                        onClick={() => toggleButton(4)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                          activeButtons[4]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        4
                      </button>
                      <input
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                        type="text"
                        placeholder=""
                      />
                      food on the menu
                    </li>
                  </ul>
                </td>
              </tr>

      
              <tr>
                <td className="border p-4">
                  The{" "}
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
                </td>

                <td className="border p-4">
                  At the top of a
                  <button
                    onClick={() => toggleButton(6)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                      activeButtons[6]
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-200 border-gray-400"
                    }`}
                  >
                    6
                  </button>
                  <input
                    className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                    type="text"
                    placeholder=""
                  />
                </td>

                <td className="border p-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>A famous chef</li>
                    <li>
                      All the
                      <button
                        onClick={() => toggleButton(7)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                          activeButtons[7]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        7
                      </button>
                      <input
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                        type="text"
                        placeholder=""
                      />
                      are very good
                    </li>
                    <li>
                      Only uses
                      <button
                        onClick={() => toggleButton(8)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                          activeButtons[8]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        8
                      </button>
                      <input
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                        type="text"
                        placeholder=""
                      />
                      ingredients
                    </li>
                  </ul>
                </td>

                <td className="border p-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Set lunch costs £
                      <button
                        onClick={() => toggleButton(9)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                          activeButtons[9]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        9
                      </button>
                      <input
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                        type="text"
                        placeholder=""
                      />
                      per person
                    </li>
                    <li>
                      Portions probably of
                      <button
                        onClick={() => toggleButton(10)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                          activeButtons[10]
                            ? "bg-yellow-400 border-yellow-500"
                            : "bg-gray-200 border-gray-400"
                        }`}
                      >
                        10
                      </button>
                      <input
                        className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                        type="text"
                        placeholder=""
                      />
                      size
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="md:w-[60%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[80vh]">
          <div className="flex justify-end items-center p-4 text-gray-500">
            {/* clear icon */}
            <div className="relative group">
              <span
                onClick={() => setIsOpen(true)}
                className="text-xl cursor-pointer"
              >
                <GrClearOption />
              </span>
              {/* Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Clear answer of this Part
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

          <h2 className="text-2xl font-bold mb-3">Questions 1–10</h2>
          <h3 className="text-xl font-semibold mb-5">
            Complete the table below. <br /> <br /> Write
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className="">
            <table className="min-w-full border border-gray-300 text-left text-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 w-[10%]">Name of restaurant</th>
                  <th className="border p-3 w-[15%]">Location</th>
                  <th className="border p-3 w-[20%]">
                    Reason for recommendation
                  </th>
                  <th className="border p-3 w-[20%]">Other comments</th>
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border p-3">The Junction</td>
                  <td className="border p-3">
                    Greyson Street, near the station
                  </td>
                  <td className="border p-3">
                    Good for people who are especially keen on{" "}
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
                  </td>
                  <td className="border p-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Quite expensive</li>
                      <li>
                        The{" "}
                        <button
                          onClick={() => toggleButton(2)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-1 ${
                            activeButtons[2]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          2
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                          type="text"
                          placeholder=""
                        />
                        is a good place for a drink
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border p-3">Paloma</td>
                  <td className="border p-3">
                    In Bow Street next to the cinema
                  </td>
                  <td className="border p-3">
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
                    food, good for sharing
                  </td>
                  <td className="border p-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Staff are very friendly</li>
                      <li>Need to pay £50 deposit</li>
                      <li>
                        A limited selection of{" "}
                        <button
                          onClick={() => toggleButton(4)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                            activeButtons[4]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          4
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                          type="text"
                          placeholder=""
                        />{" "}
                        food on the menu
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border p-3">
                    The{" "}
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
                  </td>
                  <td className="border p-3">
                    At the top of a{" "}
                    <button
                      onClick={() => toggleButton(6)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                        activeButtons[6]
                          ? "bg-yellow-400 border-yellow-500"
                          : "bg-gray-200 border-gray-400"
                      }`}
                    >
                      6
                    </button>
                    <input
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                      placeholder=""
                    />
                  </td>
                  <td className="border p-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>A famous chef</li>
                      <li>
                        All the{" "}
                        <button
                          onClick={() => toggleButton(7)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                            activeButtons[7]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          7
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                          type="text"
                          placeholder=""
                        />{" "}
                        are very good
                      </li>
                      <li>
                        Only uses{" "}
                        <button
                          onClick={() => toggleButton(8)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                            activeButtons[8]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          8
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                          type="text"
                          placeholder=""
                        />{" "}
                        ingredients
                      </li>
                    </ul>
                  </td>
                  <td className="border p-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Set lunch costs £{" "}
                        <button
                          onClick={() => toggleButton(9)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                            activeButtons[9]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          9
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                          type="text"
                          placeholder=""
                        />{" "}
                        per person
                      </li>
                      <li>
                        Portions probably of{" "}
                        <button
                          onClick={() => toggleButton(10)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-2 ${
                            activeButtons[10]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          10
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                          type="text"
                          placeholder=""
                        />{" "}
                        size
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

export default Test1Listening;
