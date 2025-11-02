import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";


const Test3Listening = () => {
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
            <span className="absolute -top-7 right-6 text-left bg-gray-700 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
            Furniture Rental Company Consultation
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Part 1. You will hear
            a woman phoning the owner of a house she is going to rent about
            companies that she could rent furniture from. First, you have some
            time to look at questions 1 to 5. Now listen carefully and answer
            questions 1 to 5.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Good morning.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Hi, this is
            Shelley Mayer. I'm renting your house on Archwood Avenue. I'm due to
            move in next week.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Oh yes, hello, Ms Mayer.
            What can I do for you?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> When I viewed the
            house, I told you I'll most probably need to rent some furniture -
            at least until I know whether my temporary work contract is going to
            be made permanent.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Yes, of course. I remember.
            And I said I could give you some information about furniture rental
            companies in the city.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> That's right.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Well, the biggest company is
            called Peak Rentals. I've recommended them to other people, and I've
            always heard positive reports about them
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It says the monthly price per room starts at $105 and goes up to
              $239. {highlight && "(1)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Could you give me
            an idea of their costs?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Yes. People have mentioned that the furniture from Peak Rentals is
              more modern than any of the other companies.
              {highlight && "(2)"}
            </span>
            And also, once you place an order, the furniture will be delivered
            to you in just 1 or 2 days.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> That would be
            really helpful.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Oh, and the brochure says
            that there's a special offer at the moment, if you rent living room
            furniture.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You'll also get a lamp at no extra cost. {highlight && "(3)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Ok, but you know
            that price range you gave is more than I was hoping to pay.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Then you could try Aaron and Oliver.
              {highlight && "(4)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Sorry, what and
            Oliver?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Aaron, double A R O N.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Ok, are they
            cheaper?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I'd say they're a mid price company, but if you chose them, you
              need to be aware that they charge an extra 12% every month in case
              of damage.
              {highlight && "(5)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> I see. I'd have to
            do the math carefully then.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Right. But one helpful thing
            is that they also do cleaning for customers.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> For the furniture?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> For the house.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Oh, I see. I
            probably won't need that.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Before you hear the
            rest of the conversation, you have some time to look at questions 6
            to 10. Now listen and answer questions 6 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> There's another company
            called Larch Furniture. It's quite new, and it has the lowest prices
            in town.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              That's for both furniture and also electronic equipment.{" "}
              {highlight && "(6)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Well, that would
            be good. I'm not bringing much with me, and I won't have much time
            to go shopping after I start my job.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> There are two things you
            need to know about Larch Furniture.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              First of all, you have to take out insurance on the furniture, and
              you need to organize that yourself. {highlight && "(7)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> That wouldn't be
            too hard.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Also, you can't take out a
            contract for less than 6 months. But I figure that might not be a
            problem for you. You're renting the house for 12 months after all,
            aren't you?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> Yes. OK. Well,
            I...
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> Sorry to interrupt. I just
            thought of another furniture rental company.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's called Space Rentals, and it's located very near to the
              house. {highlight && "(8)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> OK.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span> I don't have any information
            about their charges.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So it's best to use their app to find out what it would cost you
              to use them. {highlight && "(9)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> OK, thanks. I'll
            do that.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">MAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              One good thing about that company is that if you don't like the
              furniture once it's delivered, you can request exchanges, as long
              as you do that within a week of receiving it.
              {highlight && "(10)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHELLEY MAYER:</span> That sounds really
            great. Ok, well thanks very much, that's so helpful.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1. You now have one minute to check your answers to part 1.
          </h3>
        </div>

     
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[80vh]">
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

          <h2 className="text-xl font-bold mb-3">Questions 1–10</h2>
          <h3 className="text-lg  mb-5">
            Complete the table below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left text-lg">
              <thead className="">
                <tr>
                  <th
                    className="border p-4 text-center text-lg font-bold"
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
