import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";

const Test2Listening = () => {
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
            Conversation about Caring for Elderly Mother and Council Support
          </h1>

          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              Part 1.You will hear a woman who is caring for her elderly mother
              talking to a friend.First, you have some time to look at questions
              1 to 4.Now listen carefully and answer questions 1 to 4.
            </span>
          </h3>

          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              It's really good to see you, Tom.Since I had to give up work, I
              feel I'm losing touch with my friends and colleagues.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              We really miss you in the office.We were all so sorry you had to
              leave.But you must be relieved to have more time to look after
              your mother.How is she?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              Well, she's very cheerful, but she needs a lot of help.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              Have you tried to get any support from the local council?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">No, I didn't know I could.</span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              Yes, they offer different kinds of practical support.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  They realize that carers sometimes need time for all the other
                  responsibilities they have apart from the person they're
                  caring for, and also that they sometimes need a break. (1)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              uh Absolutely.Ok, so tell me more.How do I go about getting this
              support?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              Well, you'd have to have an assessment of your mother's needs.That
              means someone would come round and talk to you about the situation
              and what you need.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  So for a start, they'd want to know the amount of time you
                  spend looking after your mother every day.(2)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">Ok.</span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              Then they'll probably ask you what sorts of tasks you do for your
              mother during the day.Things like if she needs help with getting
              dressed, for example.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  Right, I help her with that, and also I help her get into the
                  shower in the morning. (3)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              Yes, that sort of thing.
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  They'll probably ask you if you do the shopping for her, and
                  help her at meal times, and whether she can cope using money.
                  (4)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              Yes, that's becoming a bit of a problem.She used to be very good
              at it, but uh not anymore.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              Before you hear the rest of the conversation, you have some time
              to look at questions 5 to 10.Now listen and answer questions 5 to
              10.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              And be ready to tell them about anything you find particularly
              difficult about caring for your mother.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  So recently, I've noticed she started to have quite bad
                  problems with her memory. (5)
                </span>
              )}
              If I wasn't there, I think she'd forget to eat for example, and
              often she doesn't seem quite sure what day it is.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              Yes, tell them about that.And are there any physical difficulties
              you have caring for her?
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  Lifting her for example? (6)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              Yes, she's quite heavy, and I'm afraid of hurting my back.I'd be
              in real trouble if that happened.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  They can give you advice about that, and also about how to
                  avoid the possibility of your mom having a fall. (7)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              Great.So once they've done this assessment, if I'm eligible, uh
              what happens next?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  Well, they might support you financially, so they might help
                  you with transport costs, like if you have to get a taxi to
                  take your mother for an appointment for example (8)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              I usually drive her myself, actually.So could I claim for the
              petrol?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  You could, and you can claim for the insurance too.(9)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">Oh, right.</span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              And if you need help with the housework, they can arrange for
              someone to come along once or twice a week.And one other thing, I
              hope you don't mind me saying this, but it's important you look
              after yourself, and it seems to me you're under quite a bit of
              stress.
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">I am, yes.</span>
          </h3>
          <h3 className="text-xl font-bold">
            TOM:
            <span className="font-normal">
              {highlight && (
                <span className="ml-2 bg-yellow-100 ">
                  Well tell the council, because they may be able to give you
                  some advice on how to minimize it.(10)
                </span>
              )}
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            CAROL:
            <span className="font-normal">
              Really?Though, actually, I feel so much better having talked to
              you.I'll get in touch with the council straight away.Now, shall we
              go for coffee or some?
            </span>
          </h3>
          <h3 className="text-xl font-bold">
            ANNOUNCER:
            <span className="font-normal">
              That is the end of part 1.You now have one minute to check your
              answers to part 1
            </span>
          </h3>
        </div>
        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <div className="flex justify-between items-center p-4 text-gray-500">
            {/* clear icon */}
            <p>Autosaved @ 2025-10-22 22:59:43. </p>
            <div className="relative ">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-xl cursor-pointer"
                >
                  <GrClearOption />
                </span>
              </div>
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
            Complete the table below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              Help for carers
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className="text-xl ">
                Local councils can arrange practical support to help those
                caring for elderly people at home.
              </li>

              <li className="text-xl ">
                This can give the carer:
                <ul className="list-none ml-6 mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-gray-700 rounded-full inline-block"></span>
                    time for other responsibilities
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-gray-700 rounded-full inline-block"></span>
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
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-xl font-bold mt-6">
              Assessment of mother's needs
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-xl ">This may include discussion of:</li>

              <li className="flex items-center text-xl gap-2">
                <span className="w-3 h-3  border-2 border-gray-700 rounded-full inline-block"></span>
                how much
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
                the caring involves
              </li>

              <li className="flex flex-col gap-2">
                <div className="flex items-center text-xl gap-2">
                  <span className="w-3 h-3 border-2 text-xl border-gray-700 rounded-full inline-block"></span>
                  what types of tasks are involved, e.g.
                </div>

                {/* Inner square list */}
                <ul className="list-[square] ml-8 space-y-1">
                  <li className="text-xl">help with dressing</li>
                  <li className="text-xl">
                    helping her have a
                    <button
                      onClick={() => toggleButton(3)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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
                  <li className="text-xl">shopping</li>
                  <li className="text-xl">helping with meals</li>
                  <li className="text-xl">
                    dealing with
                    <button
                      onClick={() => toggleButton(4)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}
            <div className="flex items-center text-xl gap-2 mt-4">
              <span className="w-3 h-3 border-2 border-gray-700 rounded-full inline-block"></span>
              any aspects of caring that are especially difficult, e.g.
            </div>

            {/* Inner list with squares */}
            <ul className="list-[square] ml-8 mt-2 space-y-1">
              <li className="text-xl">
                Loss of
                <button
                  onClick={() => toggleButton(5)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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

              <li>
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
                her
              </li>

              <li className="text-xl">
                Preventing a
                <button
                  onClick={() => toggleButton(7)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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
              </li>
            </ul>

            {/* ---------- Section 4 ---------- */}
            <h2 className="text-xl font-bold mt-6">
              Types of support that may be offered to carers
            </h2>

            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="text-xl">
                transport costs, e.g. cost of a
                <button
                  onClick={() => toggleButton(8)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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
              </li>

              <li className="text-xl">
                car-related costs, e.g. fuel and
                <button
                  onClick={() => toggleButton(9)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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

              <li className="text-xl">help with housework</li>

              <li className="text-xl">
                help to reduce
                <button
                  onClick={() => toggleButton(10)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ml-2 ${
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default Test2Listening ;
