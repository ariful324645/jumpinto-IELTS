import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test3Listening2024 = () => {
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
            <h1 className="text-3lg font-bold">PART 1</h1>
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
          <h1 className="text-2lg font-bold text-center">
            Shopping for a Meal in Kite Place
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear
            two neighbors who live in an apartment block talking about shopping
            for food.First you have some time to look at questions 1 to 6.Now
            listen carefully and answer questions 1 to 6.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> Hi, shannon.How are you
            settling into your new flat?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>Really well, thanks.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>You look like you're going
            shopping.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Yes, I am.My cousins are
            coming to stay for a couple of days, and I have to cook for them
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> Well.There are plenty of
            places to buy food in Kite Place.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's the area by the harbor.
              {highlight && "(1)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Oh, OK, I'll find that
            on the map.Thanks.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>What sort of food do you
            need to get?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>
            Well neither of them eats meat, but they both like fish.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>
            Well, there's a really good fish market there.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Oh, great.Where is it
            exactly?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> It's at the far end of Kite
            Place.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So you have to go over the bridge, and then it's on the right.
              {highlight && "(2)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>
            OK, is it open all day?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>
            It doesn't close until 4, but I'd recommend going earlier than
            that.It does run out of some things.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>Oh, I don't want that to
            happen.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              As long as you get there by 3:30 you should be fine.
              {highlight && "(3)"}
            </span>
            It's only 11 now, so, plenty of time.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Right.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>
            Do you need to buy vegetables too?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>I do, and I want to avoid
            all the plastic packaging in the supermarket.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> Well, there's a really nice
            organic shop there.Now what's it called?It's the name of a flower.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I know it's rose.
              {highlight && "(4)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>
            Oh, that's a nice name.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>Yeah, it sells vegetables
            and quite a lot of other stuff.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>
            Hmm, that's easy enough.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>
            You can't miss it.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              There's also a big sign on the pavement, so you can look for that.{" "}
              {highlight && "(5)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Fine.I guess if I need
            anything else, I'll have to go to the supermarket.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>Yeah, you should be able to
            get everything you need. But there's a minibus that goes to the
            supermarket, if you need it.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's purple, and the number is 289. {highlight && "(6)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span>
            No, what's that?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's a type of seaweed.7 {highlight && "(6)"}
            </span>
            I just ask for a handful, and you fry it in butter.It's delicious.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span>Oh, I might try that.How do
            you spell it?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> It's SAMPHIRE..
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> How about a mango?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> I'm not sure.They're not
            always ripe.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I'd prefer a melon, it's bigger too.
              {highlight && "(8)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> Good idea.The owner also
            sells a lot of spices there.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              That you can put in a curry, and things like coconut.
              {highlight && "(9)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Like cakes?Uh, I love
            chocolate cake.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">LEON:</span> Well, uh, not that, uh, but
            they have a whole range of tarts.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And the best are the strawberry ones.
              {highlight && "(10)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">SHANNON:</span> Perfect.Hopefully I
            won't even have to go to the supermarket.
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
          <h3 className="text-lg  mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">
              Local food shops
            </h1>
            <h2 className="text-lg font-bold mt-6">Where to go</h2>
            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">Kite Place - near the</span>
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
              </li>
            </ul>
            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Fish market</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">Cross the </span>
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
                and turn right
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">best to go before </span>
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
                pm, earlier than closing time
              </li>
            </ul>
            {/* ---------- Section 3 ---------- */}
            <h2 className="text-lg font-bold mt-6">Organic shop</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">called '</span>
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
              <li className="text-lg">
                below a restaurant in the large, grey building
              </li>
              <li className=" text-lg ">
                <span className=" inline-block">ook for the large</span>
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
                outside
              </li>
            </ul>
            {/* Inner list with squares */}
            <h2 className="text-lg font-bold mt-6">Supermarket:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className=" text-lg ">
                <span className=" inline-block">take a </span>
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
                minibus, number 289
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">Questions 7–10</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE ONLY FOR </span> for each
              answer.
            </h3>
            {/* table form */}

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2"></th>
                  <th
                    colSpan="3"
                    className="border border-gray-400 text-lg font-bold p-2"
                  >
                    Shopping
                  </th>
                </tr>
                <tr>
                  <th className="border  p-2"></th>
                  <th className="border p-2">To buy</th>
                  <th className="border p-2">Other ideas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 text-sm font-bold p-2">
                    Fish market
                  </td>
                  <td className="border border-gray-400 p-2">a dozen prawns</td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    <h3 className=" text-lg ">
                      <span className=" inline-block">a handful of</span>
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
                      (type of seaweed)
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-sm font-bold p-2">
                    Organic shop
                  </td>

                  <td className="border border-gray-400 p-2">
                    {" "}
                    <h3 className=" text-lg ">
                      <span className=" inline-block">beans and a</span>
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
                      for dessert
                    </h3>
                  </td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    <h3 className=" text-lg ">
                      <span className=" inline-block">spices and</span>
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
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 text-sm font-bold p-2">
                    Bakery
                  </td>
                  <td className="border border-gray-400 p-2">a brown loaf</td>
                  <td className="border border-gray-400 p-2">
                    {" "}
                    <h3 className=" text-lg ">
                      <span className=" inline-block">a </span>
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
                   tart.
                    </h3>
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

export default Test3Listening2024;
