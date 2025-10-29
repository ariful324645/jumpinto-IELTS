import React, { useState } from "react";

const Test3Listening = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

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
            Furniture Rental Company Consultation
          </h1>

          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              Part 1.You will hear a woman phoning the owner of a house she is
              going to rent about companies that she could rent furniture
              from.First, you have some time to look at questions 1 to 5.Now
              listen carefully and answer questions 1 to 5.
            </span>
          </h3>

          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">Good morning.</span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              Hi, this is Shelley Mayer.I'm renting your house on Archwood
              Avenue.I'm due to move in next week.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Oh yes, hello, Ms Mayer.What can I do for you?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              When I viewed the house, I told you I'll most probably need to
              rent some furniture - at least until I know whether my temporary
              work contract is going to be made permanent.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Yes, of course.I remember.And I said I could give you some
              information about furniture rental companies in the city.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">That's right.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Well, the biggest company is called Peak Rentals.I've recommended
              them to other people, and I've always heard positive reports about
              them
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              Could you give me an idea of their costs?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Sure, I actually have one of their brochures here.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  It says the monthly price per room starts at $105 and goes up
                  to $239. (1)
                </span>
              )}
              That depends on which rooms you need furniture for, of course.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              Sure. It's just to get a general idea of how much it's gonna
              cost.And you said you had some positive feedback about this
              company.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  Yes. People have mentioned that the furniture from Peak
                  Rentals is more modern than any of the other companies. (2)
                </span>
              )}
              And also, once you place an order, the furniture will be delivered
              to you in just 1 or 2 days.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">That would be really helpful.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Oh, and the brochure says that there's a special offer at the
              moment, if you rent living room furniture.I believe that's a set
              of chairs and a TV table.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  You'll also get a lamp at no extra cost. (3)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              Ok, but you know that price range you gave is more than I was
              hoping to pay.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  Then you could try Aaron and Oliver. (4)
                </span>
              )}
              you can go up on the roof and have a drink.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">Sorry, what and Oliver?</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">Aaron, double A R O N.</span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">Ok, are they cheaper?</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  I'd say they're a mid price company, but if you chose them,
                  you need to be aware that they charge an extra 12% every month
                  in case of damage. (5)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              I see.I'd have to do the math carefully then.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Right.But one helpful thing is that they also do cleaning for
              customers.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">For the furniture?</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">For the house.</span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              Oh, I see.I probably won't need that.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              Before you hear the rest of the conversation, you have some time
              to look at questions 6 to 10.Now listen and answer questions 6 to
              10.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              There's another company called Larch Furniture.It's quite new, and
              it has the lowest prices in town..
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  That's for both furniture and also electronic equipment (6)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              Well, that would be good.I'm not bringing much with me, and I
              won't have much time to go shopping after I start my job
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              There are two things you need to know about Larch Furniture.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  First of all, you have to take out insurance on the furniture,
                  and you need to organize that yourself. (7)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">That wouldn't be too hard.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Also, you can't take out a contract for less than 6 months.But I
              figure that might not be a problem for you.You're renting the
              house for 12 months after all, aren't you?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">Yes. OK. Well, I...</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              Sorry to interrupt.I just thought of another furniture rental
              company.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  It's called Space Rentals, and it's located very near to the
                  house. (8)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">OK.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              I don't have any information about their charges.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  So it's best to use their app to find out what it would cost
                  you to use them. (9)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">OK, thanks.I'll do that.</span>
          </h3>
          <h3 className="text-xl font-bold">
            MAN:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  One good thing about that company is that if you don't like
                  the furniture once it's delivered, you can request exchanges,
                  as long as you do that within a week of receiving it.(10)
                </span>
              )}
              In the evening , I think it would be more like £50.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            SHELLEY MAYER:
            <span className="font-normal">
              That sounds really great.Ok, well thanks very much, that's so
              helpful.
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
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[80vh]">
          <h2 className="text-2xl font-bold mb-3">Questions 1–10</h2>
          <h3 className="text-xl font-semibold mb-5">
            Complete the table below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left text-lg">
              <thead className="">
                <tr>
                  <th
                    className="border p-4 text-center text-2xl font-bold"
                    colSpan="3"
                  >
                    Furniture Rental Companies
                  </th>
                </tr>
                <tr>
                  <th className="border p-3 w-[20%]">Name of company</th>
                  <th className="border p-3 w-[20%]">
                    Information about costs
                  </th>
                  <th className="border p-3 w-[25%]">Additional notes</th>
                </tr>
              </thead>

              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border p-3">Peak Rentals</td>

                  <td className="border p-3">
                    Prices range from $105 to $
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
                    per room per month
                  </td>
                  <td className="border p-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        The furniture is very
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
                      <li>Delivers in 1-2 days</li>
                      <li>
                        Special offer: free
                        <button
                          onClick={() => toggleButton(3)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 mx-1 ${
                            activeButtons[3]
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200 border-gray-400"
                          }`}
                        >
                          3
                        </button>
                        <input
                          className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                          type="text"
                          placeholder=""
                        />
                        with every living room set
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border p-3">
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
                    and Oliver
                  </td>

                  <td className="border p-3">
                    Mid-range prices 12% monthly fee for
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
                  <td className="border p-3">Also offers a cleaning service</td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border p-3">Larch Furniture</td>

                  <td className="border p-3">
                    Offers cheapest prices for renting furniture and
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
                    items
                  </td>
                  <td className="border p-3">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Must have own
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
                      </li>
                      <li>Minimum contract length: six months</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border p-3">
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
                    Rentals
                  </td>
                  <td className="border p-3">
                    See the
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
                    for the most up-to-date prices
                  </td>
                  <td className="border p-3">
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
                    are allowed within 7 days of delivery
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

export default Test3Listening;
