import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";

const Test2Reading2022 = () => {
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

  const questions = [
    "The Bedouin teenagers who found the scrolls were disappointed by how little money they received for them.",
    "There is agreement among academics about the origin of the Dead Sea Scrolls.",
    "Most of the books of the Bible written on the scrolls are incomplete..",
    "The information on the Copper Scroll is written in an unusual way.",
    "Mar Samuel was given some of the scrolls as a gift.",
    "In the early 1950s, a number of educational establishments in the US were keen to buy scrolls from Mar Samuel.",
    "The scroll that was pieced together in 2017 contains information about annual occasions in the Qumran area 2,000 years ago.",
    "Academics at the University of Haifa are currently researching how to decipher the final scroll.",
  ];

  const options = ["TRUE", "FALSE", "NOT GIVEN"];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );

  const [activeNumbers, setActiveNumbers] = useState(
    Array(questions.length).fill(false)
  );

  const handleOptionClick = (qIndex, oIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[qIndex] = oIndex;
    setSelectedOptions(updatedOptions);
  };

  const handleNumberClick = (qIndex) => {
    const updatedActive = [...activeNumbers];
    updatedActive[qIndex] = !updatedActive[qIndex]; // toggle active state
    setActiveNumbers(updatedActive);
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
            <h1 className="text-xl font-bold">PASSAGE 1</h1>
            <div className="flex gap-3">
              <IoBookSharp className="text-green-900" size={28} />
              <input
                type="checkbox"
                checked={highlight}
                onChange={() => setHighlight(!highlight)}
                className="toggle toggle-accent"
              />
            </div>
          </div>

          <div>
            <h1 className="text-lg">
              You should spend about 20 minutes on{" "}
              <span className="text-lg font-bold">Questions 1-13</span>, which
              are based on Reading Passage 1 below.
            </h1>
          </div>

          <h1 className="text-2xl font-bold text-center">
            The Dead Sea Scrolls
          </h1>

          <p className="text-lg">
            In late 1946 or early 1947, three Bedouin teenagers were tending
            their goats and sheep near the ancient settlement of Qumran, located
            on the northwest shore of the Dead Sea in what is now known as the
            West Bank.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              One of these young shepherds tossed a rock into an opening on the
              side of a cliff and was surprised to hear a shattering sound.{" "}
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  1
                </span>
              )}
              He and his companions later entered the cave and stumbled across a
              collection of large clay jars, seven of which contained scrolls
              with writing on them.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  2,3
                </span>
              )}
            </span>
            The teenagers took the seven scrolls to a nearby town where they
            were sold for a small sum to a local antiquities dealer.Word of the
            find spread, and Bedouins and archaeologists eventually unearthed
            tens of thousands of additional scroll fragments from 10 nearby
            caves; together they make up between 800 and 900 manuscripts.It soon
            became clear that this was one of the greatest archaeological
            discoveries ever made.
          </p>

          <p className="text-lg">
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The origin of the Dead Sea Scrolls, which were written around
              2,000 years ago between 150 BCE and 70 CE, is still the subject of
              scholarly debate even today.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  7
                </span>
              )}
            </span>
            According to the prevailing theory, they are the work of a
            population that inhabited the area until Roman troops destroyed the
            settlement around 70 CE.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The area was known as Judea at that time, and the people are
              thought to have belonged to a group called the Essenes, a devout
              Jewish sect.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  4
                </span>
              )}
            </span>
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The majority of the texts on the Dead Sea Scrolls are in Hebrew,
              with some fragments written in an ancient version of its alphabet
              thought to have fallen out of use in the fifth century BCE.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  5
                </span>
              )}
            </span>
            But there are other languages as well.Some scrolls are in Aramaic,
            the language spoken by many inhabitants of the region from the sixth
            century BCE to the siege of Jerusalem in 70 CE.In addition, several
            texts feature translations of the Hebrew Bible into Greek. The Dead
            Sea Scrolls include fragments from every book of the Old Testament
            of the Bible except for the Book of Esther.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The only entire book of the Hebrew Bible preserved among the
              manuscripts from Qumran is Isaiah; this copy, dated to the first
              century BCE, is considered the earliest biblical manuscript still
              in existence.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  8
                </span>
              )}
            </span>
            Along with biblical texts, the scrolls include documents about
            sectarian regulations and religious writings that do not appear in
            the Old Testament.
          </p>

          <p className="text-lg">
            The writing on the Dead Sea Scrolls is mostly in black or
            occasionally red ink, and the scrolls themselves are nearly all made
            of either parchment (animal skin) or an early form of paper called
            'papyrus'.The only exception is the scroll numbered 3Q15, which was
            created out of a combination of copper and tin.Known as the Copper
            Scroll, this curious document features letters chiselled onto metal
            - perhaps, as some have theorized, to better withstand the passage
            of time.One of the most intriguing manuscripts from Qumran, this is
            a sort of ancient treasure map that lists dozens of gold and silver
            caches.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              Using an unconventional vocabulary and odd spelling, it describes
              64 underground hiding places that supposedly contain riches buried
              for safekeeping.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  9
                </span>
              )}
            </span>
            None of these hoards have been recovered, possibly because the
            Romans pillaged Judea during the first century CE.According to
            various hypotheses, the treasure belonged to local people, or was
            rescued from the Second Temple before its destruction or never
            existed to begin with.
          </p>

          <p className="text-lg">
            Some of the Dead Sea Scrolls have been on interesting journeys.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              In 1948, a Syrian Orthodox archbishop known as Mar Samuel acquired
              four of the original seven scrolls from a Jerusalem shoemaker and
              part-time antiquity dealer, paying less than $100 for them.10He
              then travelled to the United States and unsuccessfully offered
              them to a number of universities, including Yale.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  11
                </span>
              )}
            </span>
            Finally, in 1954, he placed an advertisement in the business
            newspaper The Wall Street Journal - under the category
            "Miscellaneous Items for Sale" - that read: "Biblical Manuscripts
            dating back to at least 200 B.C. are for sale.This would be an ideal
            gift to an educational or religious institution by an individual or
            group."Fortunately, Israeli archaeologist and statesman Yigael Yadin
            negotiated their purchase and brought the scrolls back to Jerusalem,
            where they remain to this day.
          </p>

          <p className="text-lg">
            In 2017, researchers from the University of Haifa restored and
            deciphered one of the last untranslated scrolls.The university's
            Eshbal Ratson and Jonathan Ben-Dov spent one year reassembling the
            60 fragments that make up the scroll.Deciphered from a band of coded
            text on parchment, the find provides insight into the community of
            people who wrote it and the 364-day calendar they would have used.
            <span
              className={`ml-2 ${
                highlight ? "bg-yellow-100" : "bg-transparent"
              }`}
            >
              The scroll names celebrations that indicate shifts in seasons and
              details two yearly religious events known from another Dead Sea
              Scroll.
              {highlight && (
                <span className="inline-flex items-center justify-center w-8 h-6 bg-yellow-700 rounded-sm text-white font-semibold">
                  12
                </span>
              )}
            </span>
            Only one more known scroll remains untranslated.
          </p>
        </div>

        {/* right div */}
        <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
          {/* table */}
          <div className="space-y-4 leading-relaxed">
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

            <h2 className="text-lg font-bold mb-3">Questions 1-8</h2>

            <h3 className="text-lg  mb-5">
              Complete the notes below. <br /> <br />
              Choose{" "}
              <span className="font-bold mr-2">ONE WORD AND/OR A NUMBER</span>
              from the passage for each answer.
            </h3>

            <h1 className="text-lg font-semibold">
              Write your answers in boxes 1-8 on your answer sheet.
            </h1>
            <br />
          </div>
          <div className="overflow-x-auto border p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              The Dead Sea Scrolls
            </h1>

            {/* ---------- Section 1 ---------- */}
            <h2 className="text-lg font-bold mt-6">Discovery</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">
                <span>heard a noise of breaking when one teenager threw a</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span></span>
              </li>
              <li className="text-lg">
                <span>teenagers went into the</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>
              <li className="text-lg">
                <span>and found a number of containers made of</span>
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
                  className="mx-2 border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1"
                  type="text"
                />
                <span>.</span>
              </li>
            </ul>

            {/* ---------- Section 2 ---------- */}
            <h2 className="text-lg font-bold mt-6">The scrolls</h2>
            <ul className="list-disc list-inside space-y-3">
              <li className="text-lg">date from between 150 BCE and 70 CE</li>

              <li className="text-lg">
                <span>
                  thought to have been written by group of people known as the
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
                <span></span>
              </li>
              <li className="text-lg">
                <span>written mainly in the</span>
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
                <span>language.</span>
              </li>
              <li className="text-lg">
                most are on religious topics, written using ink on parchment or
                papyrus
              </li>
            </ul>

            {/* ---------- Section 3 ---------- */}

         
          </div>
          <br />
          {/* 2nd step     */}
          <h2 className="text-lg font-bold mb-3">Questions 6-13 </h2> <br />
          <h3 className="text-lg font-semibold mb-5">
            Do the following statements agree with the information given in
            Reading Passage 1? <br /> <br />
            In boxes 6-13 on your answer sheet, choose
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">TRUE</span> if the statement
            agrees with the information
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">FALSE</span>if the statement
            contradicts the information
          </h3>
          <h3 className="flex gap-5 text-lg">
            {" "}
            <span className="text-lg font-bold">NOT GIVEN</span> if there is no
            information on this
          </h3>{" "}
          <br /> <br />
          <div className="space-y-6 leading-relaxed p-4">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => handleNumberClick(qIndex)}
                    className={`
                              w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg transition-all duration-300
                              border-2
                              ${
                                activeNumbers[qIndex]
                                  ? "bg-yellow-400 border-yellow-500"
                                  : "bg-white border-gray-300 hover:border-yellow-400"
                              }
                              cursor-pointer
                            `}
                  >
                    {qIndex + 6}
                  </div>
                  <h1 className="text-lg">{q}</h1>
                </div>

                <ul className="list-none ml-12 flex flex-col gap-3">
                  {options.map((option, oIndex) => (
                    <li
                      key={oIndex}
                      onClick={() => handleOptionClick(qIndex, oIndex)}
                      className="flex items-center gap-2 text-lg cursor-pointer"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border-2 inline-block transition-colors duration-300 ${
                          selectedOptions[qIndex] === oIndex
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-700"
                        }`}
                      ></span>
                      <span
                        className={`transition-colors duration-300 ${
                          selectedOptions[qIndex] === oIndex
                            ? "text-blue-500"
                            : "text-black"
                        }`}
                      >
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2Reading2022;
