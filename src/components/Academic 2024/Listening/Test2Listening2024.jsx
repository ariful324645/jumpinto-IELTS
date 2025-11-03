import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test2Listening2024 = () => {
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
            Inside Coleman's Guitar Experience
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>Part 1, you will hear
            two friends talking about a guitar group.First, you have some time
            to look at questions 1 to 6.Now listen carefully and answer
            questions 1 to 6.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Hi, Coleman.How are you?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>Good, thanks.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>I wanted to have a chat
            with you, because our friend Josh told me that you've joined a
            guitar group.And it sounds interesting.I'd really like to learn
            myself.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> Why don't you come
            along?I'm sure there's room for another person..
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Really?So, who runs the
            classes?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> He's called a
            coordinator.His name's Gary Mathieson.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Let me note that down.Gary,
            how do you spell his surname?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's MATHIESON.
              {highlight && "(1)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            Right, thanks.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> He's retired actually,
            but he's a really nice guy.And he used to play in a lot of bands.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Thanks.So, how long have
            you been going?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>
            About a month now.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            And could you play anything before you started?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>I knew a few chords, but
            that's all.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> I'm sure everyone will be
            better than me.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> That's what I thought
            too.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              When I first spoke to Gary on the phone, he said it was a class
              for beginners, but I was still worried that everyone would be
              better than me.
              {highlight && "(2)"}
            </span>
            But we were all equally hopeless.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            Oh, that's reassuring.So, where do you meet?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>
            Well, when I joined the group, they were meeting in Gary's home
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              But as the group got bigger, he decided to book a room at the
              college in town.
              {highlight && "(3)"}
            </span>
            I prefer going there.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> I know that place.I used
            to go to tap dancing classes there when I was at secondary school.I
            haven't been since though, and I can't remember what road it's in.Is
            it Lock Street?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It's just beyond there, at the bottom of New Street, near the city
              roundabout.
              {highlight && "(4)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Yes, of course.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>
            The guitar club is on the first floor, in room T347.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>
            Right.And when do you meet?Is it at the weekend?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> We meet on Thursdays.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              It used to be 10:30 and that suited me well, but now we meet at
              11. {highlight && "(5)"}
            </span>
            The class that's in there before us asked if they could have the
            room for another 30 minutes.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span>Oh, I see.Well, I'd love to
            come.But I don't have a guitar.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, you can always buy a second-hand one.There's a website
              called The Perfect Instrument. {highlight && "(6)"}
            </span>
            That sells all kinds of guitars, violins, and so on.I'm sure you'll
            find something there.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Before you hear the
            rest of the conversation, you have some time to look at questions 7
            to 10.Now listen and answer questions 7 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> So, what's a typical
            lesson like with Gary?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> Well, he always starts
            by getting us to tune our guitars.That takes about 5 minutes.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Uh huh.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> .7
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Some people have an app they use, but others do it by ear{" "}
              {highlight && "(7)"}
            </span>
            Gary goes round and helps them.And while he's doing that, he tells
            us what he's going to do during the lesson.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Right.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> First, we usually spend
            about 10 minutes doing some strumming.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> So, is that using oh, what
            are they called plectrums?.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> Ha, no, we just use our
            thumbs.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Ha, much easier.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> Gary reminds us where to
            put our fingers for each chord, and then we play them
            together.Sometimes we all just start laughing.Because we're so bad
            at keeping time.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So Gary starts clapping to help us.
              {highlight && "(8)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Do you learn to play any
            songs?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> oh, I'm sure it is.
            songs?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> That part of the lesson
            takes about 15 minutes.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              He often brings a recording of the song, and plays it to us first.
              {highlight && "(9)"}
            </span>
            Then he hands out the song, and if there's a new chord in it, we
            practice that before we play it together, but really slowly.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Do you do any finger
            picking? songs?
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> That's the last 10
            minutes of the lesson, when we pick out the individual notes from a
            tune he's made up.It's always quite simple
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> That must be hard though.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> It is.But people like it
            because they can really concentrate.And if we're all playing well,
            it sounds quite impressive.The only trouble is that he sometimes
            gets us to play one at a time.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You know, alone.
              {highlight && "(10)"}
            </span>
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Oh, that's scary.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">COLEMAN:</span> Hmm, it is, but I've got
            used to it now.At the end he spends about five minutes telling us
            what to practice for the following week.
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">WOMAN:</span> Well, thanks Coleman.I'll
            go and have a look at that website I think.
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

          <h2 className="text-lg font-bold mb-3">Questions 1–6</h2>
          <h3 className="text-lg mb-5">
            Complete the notes below. <br /> <br />
            Write <span className="font-bold">
              ONE WORD AND/OR A NUMBER
            </span>{" "}
            for each answer.
          </h3>

          {/* ------------------- SECTION 1 ------------------- */}
          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">Guitar Group</h1>

            <h2 className="text-lg font-bold mt-6">Coordinator:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Gary</span>
                <button
                  onClick={() => toggleButton(1)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[1]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  1
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
            </ul>

            {/* ------------------- SECTION 2 ------------------- */}
            <h2 className="text-lg font-bold mt-6">Level:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Suitable for</span>
                <button
                  onClick={() => toggleButton(2)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[2]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  2
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
            </ul>

            {/* ------------------- SECTION 3 ------------------- */}
            <h2 className="text-lg font-bold mt-6">Place:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">The</span>
                <button
                  onClick={() => toggleButton(3)}
                  className={`mx-2 w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                    activeButtons[3]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-gray-200 border-gray-400"
                  }`}
                >
                  3
                </button>
                <input
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>

              <li className="text-lg">
                <span className="inline-block"></span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span className="ml-2">Street</span>
              </li>

              <li className="text-lg">
                <span className="inline-block">First floor, Room T347</span>
              </li>
            </ul>

            {/* ------------------- SECTION 4 ------------------- */}
            <h2 className="text-lg font-bold mt-6">Time:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">Thursday morning at</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
              </li>
            </ul>

            {/* ------------------- SECTION 5 ------------------- */}
            <h2 className="text-lg font-bold mt-6">Recommended website:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg">
                <span className="inline-block">The Perfect</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span className="ml-2">
                  % on ticket prices at bargaintickets.com
                </span>
              </li>
            </ul>
          </div>

          {/* ------------------- TABLE SECTION ------------------- */}
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">Questions 7–10</h2>
            <h3 className="text-lg font-semibold mb-5">
              Complete the notes below. <br /> <br /> Write{" "}
              <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for
              each answer.
            </h3>

            <table className="border-collapse border border-gray-400 w-full text-center">
              <thead>
                <tr>
                 
                  <th
                    colSpan="3"
                    className="border border-gray-400 text-lg font-bold p-2"
                  >
                    A typical 45-minute guitar lesson
                  </th>
                </tr>
                <tr>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Activity</th>
                  <th className="border p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">5 minutes</td>
                  <td className="border border-gray-400 p-2">tuning guitars</td>
                  <td className="border border-gray-400 p-2">
                    <span>using an app or by</span>
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
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">10 minutes</td>
                  <td className="border border-gray-400 p-2">
                    strumming chords using our thumbs
                  </td>
                  <td className="border border-gray-400 p-2">
                    <span>keeping time while the teacher is</span>
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
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">15 minutes</td>
                  <td className="border border-gray-400 p-2">playing songs</td>
                  <td className="border border-gray-400 p-2">
                    <span>often listening to a</span>
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
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                    />
                    <span className="ml-2">of a song</span>
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-400 p-2">10 minutes</td>
                  <td className="border border-gray-400 p-2">
                    playing single notes and simple tunes
                  </td>
                  <td className="border border-gray-400 p-2">
                    <span>playing together, then</span>
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
                      className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                      type="text"
                    />
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

export default Test2Listening2024;
