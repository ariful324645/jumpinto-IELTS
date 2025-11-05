import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test2Listening2022 = () => {
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
            Opportunities for voluntary work in Southoe village
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear a
            man asking about voluntary work in the village that he has just
            moved to.First, you have some time to look at questions 1 to 7.Now
            listen carefully and answer questions 1 to 7.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">JANE:</span> Hello, Jane Fairbanks
            speaking.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Oh, good morning.My name is
            Frank Pritchard.I've just retired and moved to Southoe.I'd like to
            become a volunteer.And I gather you coordinate voluntary work in the
            village.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span> That's right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>What sort of thing could I
            do?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>:Well, we need help with the
            village library.We borrow books from the town library, and
            individuals also donate them.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So one thing you could do is get involved in collecting them.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
            </span>
            If you've got a car, that is.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Yes, that's no problem.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>The times are pretty
            flexible, so we can arrange it to suit you.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Oh, another thing is the records that we keep of the books we're
              given.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2
                </span>
              )}
            </span>
            And those we borrow and need to return to the town library, it would
            be very useful to have another person to help keep them up to date.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Oh, yes.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Is the library purpose
            built?I haven't noticed it when I've walked around the village.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              No, we simply have the use of a room in the village hall, the West
              Room.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  3
                </span>
              )}
            </span>
            It's on the left as you go in.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Do you run a lunch club in
            the village for elderly people?I know a lot of places do.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Yes, we have a very
            successful club.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I could help with transport, if that's of any use.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Oh, definitely.People come
            to the club from neighboring villages, and we're always in need of
            more drivers.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>And does the club have
            groups that focus on a particular hobby too?
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              I could get involved in one or two, particularly if there are any
              art groups.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Excellent.I'll find out
            where we need help and get back to you.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Fine.What about help for
            individual residents?Do you arrange that at all?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Yes, we do it as a
            one-off.Oh, in fact, there's Mrs Carroll.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              She needs a lift to the hospital next week, and we're struggling
              to find someone.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  6
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>I could do that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Oh, that would be
            great.Thank you.And also next week, we're arranging to have some
            work done to Mr Selsbury's house before he moves, as he isn't
            healthy enough to do it himself.We've got some people to decorate
            his kitchen.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              But if you could do some weeding in his garden, that would be
              wonderful.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Uh huh.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So, next month on the 19th of October, we're holding a quiz.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
            A couple of residents are great at planning unusual ones, and we
            always fill the village hall.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>I'm sure I could.I'll think
            about what to make and let you know.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Thank you.Then on November
            the 18th.We're holding a dance, also in the village hall.We've
            booked a band that specializes in music of the 1930s - they've been
            before.And we've had a lot of requests to bring them back.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>I'm not really a dancer,
            but I'd like to do something to help.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Well, we sell tickets in
            advance.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              And having an extra person to check them at the door as people
              arrive would be good.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
            It can be quite a bottleneck if everyone arrives at once.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>OK, I'm happy with that.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Oh. We're also arranging a
            New Year's Eve party.We're expecting that to be a really big event,
            so instead of the village hall, it'll be held in the Mountfort
            hotel.The mountfort, MOUNTFORT Hotel.It isn't in Southoe itself, but
            it's only a couple of miles away.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The hotel will be providing dinner, and we've booked a band.The
              one thing we haven't got yet is a poster.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  10
                </span>
              )}
            </span>
            That isn't something you could do by any chance, is it?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Well, actually, yes.Uh.
            Before I retired, I was a graphic designer, so that's right up my
            street.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">JANE:</span>Perfect, I'll give you the
            details, and then perhaps you could send me a draft.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">FRANK:</span>Of course.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>That is the end of part
            1.You now have half a minute to check your answers to part 1.
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

          <h2 className="text-lg font-bold mb-3">Questions 1–7</h2>
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD ONLY</span> for each answer.
          </h3>

          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">
              Opportunities for voluntary work in Southoe village
            </h1>

            <h2 className="text-lg font-bold mt-6">Library</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Help with</span>
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
                <span>books (times to be arranged)</span>
              </li>
              <li className="text-lg">
                <span className="inline-block">Help needed to keep</span>
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
                <span>of books up to date.</span>
              </li>
              <li className="text-lg">
                <span className="inline-block">Library is in the</span>
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
                <span>Room in the village hall.</span>
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-6">Lunch club</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Help by providing</span>
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
                <span className="inline-block">Help with hobbies such as</span>
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
            <h2 className="text-lg font-bold mt-6">
              Help for individuals needed next week
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Taking Mrs Carroll to</span>
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
              <li className="text-lg">
                <span className="inline-block">Work in the</span>
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
                <span>at Mr Selsbury's house.</span>
              </li>
            </ul>
          </div>

          {/* TABLE SECTION */}
          <div className="mt-5 w-full h-full">
            <h2 className="text-lg font-bold mb-3">Questions 8–10</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONLY ONE WORD</span> for each answer.
            </h3>
            {/* table */}

            <div className="flex items-center justify-center">
              {" "}
              <table className="border-collapse border border-gray-400 w-[800px] text-center">
                <thead>
                  <tr>
                    <th colSpan="4" className="border text-lg font-bold p-2">
                      Village social events
                    </th>
                  </tr>
                  <tr>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Event</th>
                    <th className="border p-2">Location</th>
                    <th className="border p-2">Help needed</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="border text-lg  p-2">19 Oct</td>
                    <td className="">
                      <p className="text-lg">
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
                          className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                          type="text"
                        />
                        <span></span>
                      </p>
                    </td>
                    <td className="border text-lg p-2">Village hall</td>
                    <td className="border text-lg p-2">
                      providing refreshments
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="border text-lg p-2">18 Nov</td>
                    <td className="border text-lg p-2">dance</td>

                    <td className="border text-lg p-2">Village hall</td>
                    <td className="border text-lg  p-2">
                      <p className="text-lg">
                        <span className="inline-block">Checking</span>
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
                          className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                          type="text"
                        />
                        <span></span>
                      </p>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="border text-lg p-2">31 Dec</td>
                    <td className="border text-lg p-2">New Year's Eve party</td>
                    <td className="border text-lg p-2">Mountfort Hotel</td>
                    <td className="border text-lg  p-2">
                      <p className="text-lg">
                        <span className="inline-block">designing the</span>
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
                          className="mx-1 w-[100px] border border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-1 py-0.5 text-lg"
                          type="text"
                        />
                        <span></span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2Listening2022;
