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
          <h1 className="text-lg font-bold text-center">
            Conversation about Caring for Elderly Mother and Council Support
          </h1>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span>
            Part 1. You will hear a woman who is caring for her elderly mother
            talking to a friend. First, you have some time to look at questions
            1 to 4. Now listen carefully and answer questions 1 to 4.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> It's really good to see
            you, Tom. Since I had to give up work, I feel I'm losing touch with
            my friends and colleagues.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> We really miss you in the
            office. We were all so sorry you had to leave. But you must be
            relieved to have more time to look after your mother. How is she?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Well, she's very cheerful,
            but she needs a lot of help.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> Have you tried to get any
            support from the local council?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> No, I didn't know I could.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> Yes, they offer different
            kinds of practical support.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They realize that carers sometimes need time for all the other
              responsibilities they have apart from the person they're caring
              for, and also that they sometimes need a break.
              {highlight && " (1)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Absolutely. Ok, so tell me
            more. How do I go about getting this support?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> Well, you'd have to have an
            assessment of your mother's needs. That means someone would come
            round and talk to you about the situation and what you need.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So for a start, they'd want to know the amount of time you spend
              looking after your mother every day.
              {highlight && " (2)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Ok.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> Then they'll probably ask
            you what sorts of tasks you do for your mother during the day.
            Things like if she needs help with getting dressed, for example.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Right, I help her with that, and also I help her get into the
              shower in the morning.
              {highlight && " (3)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> Yes, that sort of thing.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They'll probably ask you if you do the shopping for her, and help
              her at meal times, and whether she can cope using money.
              {highlight && " (4)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Yes, that's becoming a bit
            of a problem. She used to be very good at it, but not anymore.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> Before you hear the
            rest of the conversation, you have some time to look at questions 5
            to 10. Now listen and answer questions 5 to 10.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> And be ready to tell them
            about anything you find particularly difficult about caring for your
            mother.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              So recently, I've noticed she started to have quite bad problems
              with her memory.
              {highlight && " (5)"}
            </span>{" "}
            If I wasn't there, I think she'd forget to eat for example, and
            often she doesn't seem quite sure what day it is.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> Yes, tell them about that.
            And are there any physical difficulties you have caring for her?
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Lifting her for example?
              {highlight && " (6)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Yes, she's quite heavy,
            and I'm afraid of hurting my back. I'd be in real trouble if that
            happened.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              They can give you advice about that, and also about how to avoid
              the possibility of your mom having a fall.
              {highlight && " (7)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Great. So once they've
            done this assessment, if I'm eligible, what happens next?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well, they might support you financially, so they might help you
              with transport costs, like if you have to get a taxi to take your
              mother for an appointment for example.
              {highlight && " (8)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> I usually drive her
            myself, actually. So could I claim for the petrol?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              You could, and you can claim for the insurance too.
              {highlight && " (9)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Oh, right.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span> And if you need help with
            the housework, they can arrange for someone to come along once or
            twice a week. And one other thing, I hope you don't mind me saying
            this, but it's important you look after yourself, and it seems to me
            you're under quite a bit of stress.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> I am, yes.
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">TOM:</span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Well tell the council, because they may be able to give you some
              advice on how to minimize it.
              {highlight && " (10)"}
            </span>
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">CAROL:</span> Really? Though, actually,
            I feel so much better having talked to you. I'll get in touch with
            the council straight away. Now, shall we go for coffee or some?
          </h3>

          <h3 className="text-lg">
            <span className="font-bold">ANNOUNCER:</span> That is the end of
            part 1. You now have one minute to check your answers to part 1.
          </h3>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          <div className="flex justify-between items-center p-4 text-gray-500">
            {/* clear icon */}
            <p>Autosaved @ 2025-10-22 22:59:43. </p>
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
          <h2 className="text-lg font-bold mb-3">Questions 1–10</h2>
          <h3 className="text-lg mb-5">
            Complete the table below. <br /> <br /> Write{" "}
            <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
            answer.
          </h3>

          <div className="overflow-x-auto border-2 p-5 border-black bg-white rounded-lg">
            <h1 className="text-lg font-bold text-center mb-4">
              Help for carers
            </h1>

            {/* ---------- Section 1 ---------- */}
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg ">
                Local councils can arrange practical support to help those
                caring for elderly people at home.
              </li>

              <li className="text-lg ">
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
            <h2 className="text-lg font-bold mt-6">
              Assessment of mother's needs
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-lg ">This may include discussion of:</li>

              <li className="flex items-center text-lg gap-2">
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
                <div className="flex items-center text-lg gap-2">
                  <span className="w-3 h-3 border-2 text-lg border-gray-700 rounded-full inline-block"></span>
                  what types of tasks are involved, e.g.
                </div>

                {/* Inner square list */}
                <ul className="list-[square] ml-8 space-y-1">
                  <li className="text-lg">help with dressing</li>
                  <li className="text-lg">
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
                  <li className="text-lg">shopping</li>
                  <li className="text-lg">helping with meals</li>
                  <li className="text-lg">
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
            <div className="flex items-center text-lg gap-2 mt-4">
              <span className="w-3 h-3 border-2 border-gray-700 rounded-full inline-block"></span>
              any aspects of caring that are especially difficult, e.g.
            </div>

            {/* Inner list with squares */}
            <ul className="list-[square] ml-8 mt-2 space-y-1">
              <li className="text-lg">
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

              <li className="text-lg">
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
            <h2 className="text-lg font-bold mt-6">
              Types of support that may be offered to carers
            </h2>

            <ul className="list-disc list-inside space-y-2 mt-2">
              <li className="text-lg">
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

              <li className="text-lg">
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

              <li className="text-lg">help with housework</li>

              <li className="text-lg">
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
