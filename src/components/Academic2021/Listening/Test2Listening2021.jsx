import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test2Listening2021 = () => {
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

          {/* left text  */}

          <div className=" space-y-5">
            <h1 className="text-2xl font-bold mb-8 text-center">
              Picture Conversion Service
            </h1>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> Part 1. You will
              hear a woman phoning a company that converts old photographs to
              digital format. First, you have some time to look at questions 1
              to 3. Now listen carefully and answer questions 1 to 3.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Hello, Picturerep.
              Can I help you?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Oh, hi. I saw your
              advertisement about copying pictures to disk, and I'd like a bit
              more information about what you do.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Sure, what would you
              like to know?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Well, I've got a box
              full of old family photos that's been up in the attic for years.
              Some of them must be 50 or 60 years old. And I'd like to get them
              converted to digital format.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Sure, we can do that
              for you.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Right, and what about
              size? The photos are all sorts of sizes. Are there any
              restrictions?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Well, the maximum
              size of photo we can do with our normal service is 30 centimeters,
              and each picture must be at least 4 cm. That's the minimum we can
              cope with.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Oh, that should be fine.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                And some of them are in a frame.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    1
                  </span>
                )}
              </span>
              Should I take them out before I send them?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Yes, please. We can't
              copy them otherwise, and also the photos must all be separate,
              they mustn't be stuck into an album.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK, that's not a
              problem. So, can you give me an idea of how much this will cost?
              I've got about 360 photos, I think.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                We charge £195 for 300 to 400 photos for the basic service.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    2
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK, and does that
              include the disk?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Yes, one disk, but
              you can get extra ones for £5 each.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> That's good. So, do I
              need to pay when I send you the photos?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> No, we won't need
              anything until we've actually copied the pictures.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Then we'll let you know how much it is, and once we've received
                the payment, we'll send the parcel off to you.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    3
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> Before you hear the
              rest of the conversation, you have some time to look at questions
              4 to 10. Now listen and answer questions 4 to 10.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Is there anything
              else you'd like to ask about our services?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Yes, I've roughly sorted
              out the photos into groups according to what they're about. So,
              can you keep them in those groups when you copy them?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                Sure, we'll save each group in a different folder on the disk,
                and if you like, you can suggest a name for each folder.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    4
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> So, I could have one
              called 'Grandparents' for instance?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Exactly. And in the
              standard service, each photo is checked, and we can sometimes
              touch up the color a bit, or improve the contrast
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                — that can make a big difference.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    5
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK, and some of the
              photos are actually quite fragile. They won't get damaged in the
              process, will they?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                No, if any look particularly fragile, we'd do them by hand..
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    6
                  </span>
                )}
              </span>{" "}
              We do realize how precious these old photos can be
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> And another thing is
              we can make changes to a photo
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                so, if you want to remove an object from a photo, or maybe alter
                the background,
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    7
                  </span>
                )}
              </span>
              we can do that.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Really? I might be
              interested in that. I'll have a look through the photos and see.
              Oh, and talking of fixing photos,
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                I've got a few that aren't properly in focus.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    8
                  </span>
                )}
              </span>
              Can you do anything to make that better?
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> No, I'm afraid that's
              one thing we can't do.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span>
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                We aim to get the copying done in 10 days.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    9
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> Fine. Right, well, I'll
              get the photos packed up in a box and post them off to you.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Right, if you've got
              a strong cardboard box, that's best.
              <span
                className={`ml-2 ${
                  highlight ? "bg-yellow-100" : "bg-transparent"
                }`}
              >
                We've found that plastic ones sometimes break in the post.
                {highlight && (
                  <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                    10
                  </span>
                )}
              </span>
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">WOMAN:</span> OK. Right, thanks for
              your help. Bye.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">EMPLOYEE:</span> Bye.
            </h3>

            <h3 className="text-lg">
              <span className="font-bold">ANNOUNCER:</span> That is the end of
              part 1. You now have half a minute to check your answers to part
              1.
            </h3>
          </div>
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
          <div className="overflow-x-auto border p-5  bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Copying photos to digital format
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Name of company: Picturerep <br /> Requirements
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                Maximum size of photos is 30 cm, minimum size 4 cm.
              </li>
              <li className="text-lg">
                <span>Photos must not be in a</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>an album.</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">Cost</h2>
            <ul className="list-disc list-inside space-y-3">
              {" "}
              <li className="text-lg">
                <span>The cost for 360 photos is £</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>including one desk.</span>
              </li>
              <li className="text-lg">
                <span>Before the completed order is sent </span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>is required.</span>
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Services included in the price
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {" "}
              <li className="text-lg">
                <span>Photos can be placed in a folder,e.g. with the name</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>and learn how to program them so they can move.</span>
              </li>
              <li className="text-lg">
                <span>The</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>and contrast can be improved if necessary.</span>
              </li>
              <li className="text-lg">
                <span>Photos which are very fragile will be scanned by</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>
            {/* ---------- Section 5 ---------- */}
            <h2 className="text-lg font-bold mt-6">
              Special restore service (costs extra)
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {" "}
              <li className="text-lg">
                <span>
                  It may be possible to remove an object from a photo, or change
                  the
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>{" "}
              <li className="text-lg">
                <span>A photo which is not correctly in</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>can not be fixed.</span>
              </li>
            </ul>
            {/* ---------- Section 6 ---------- */}
            <h2 className="text-lg font-bold mt-6">Other information</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>Orders are completed within</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>.</span>
              </li>
              <li className="text-lg">
                <span>Send the photos in a box (not</span>
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
                  className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
                  type="text"
                />
                <span>).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2Listening2021;
