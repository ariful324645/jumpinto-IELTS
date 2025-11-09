import React, { useState, useEffect } from "react";
import { GrClearOption } from "react-icons/gr";

const Test1Listening2020 = () => {
  const correctAnswers = {
    1: "Jamieson",
    2: "afternoon",
    3: "communication",
    4: "week",
    5: "10",
    6: "suit",
    7: "passport",
    8: "personality",
    9: "feedback",
    10: "effort",
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [activeButtons, setActiveButtons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // --- Handle input change and auto-check ---
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [id]: value };
      calculateScore(updated);
      return updated;
    });
  };

  // --- Calculate live score ---
  const calculateScore = (answers) => {
    let newScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        answers[key]?.trim().toLowerCase() ===
        correctAnswers[key].trim().toLowerCase()
      ) {
        newScore += 1;
      }
    });
    setScore(newScore);
    localStorage.setItem("/2020/Test 3/listening", newScore);
  };

  const toggleButton = (id) => {
    setActiveButtons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClear = () => {
    setUserAnswers({});
    setScore(0);
    setActiveButtons({});
    setIsOpen(false);
    localStorage.removeItem("/2020/Test 3/listening");
  };

  // --- Restore answers from localStorage (optional) ---
  useEffect(() => {
    const savedScore = localStorage.getItem("/2020/Test 3/listening");
    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <div className="md:w-[50%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[90vh]">
      {/* ---------- Header ---------- */}
      <div className="flex justify-between items-center p-4 text-gray-500">
        <h2 className="text-lg font-bold text-green-600">
          🎯 Marks: {score} / 10
        </h2>

        <div className="relative group">
          <span
            onClick={() => setIsOpen(true)}
            className="text-xl cursor-pointer"
          >
            <GrClearOption />
          </span>
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

      {/* ---------- Instructions ---------- */}
      <h2 className="text-lg font-bold mb-3">Questions 1–10</h2>
      <h3 className="text-lg mb-5">
        Complete the notes below. <br /> <br /> Write{" "}
        <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each
        answer.
      </h3>

      {/* ---------- Question Section ---------- */}
      <div className="overflow-x-auto border p-5 bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Bankside Recruitment Agency
        </h1>

        {/* ---------- Section 1 ---------- */}
        <ul className="list-disc list-inside space-y-3">
          <li className="text-lg">
            Address of agency: 497 Eastside, Docklands
          </li>

          <li className="text-lg">
            <span>Name of agent: Becky</span>
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
              type="text"
              value={userAnswers[1] || ""}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>.</span>
          </li>

          <li className="text-lg">Phone number: 07866 510333</li>

          <li className="text-lg">
            <span>Best to call her in the</span>
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
              type="text"
              value={userAnswers[2] || ""}
              onChange={(e) => handleInputChange(2, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>.</span>
          </li>
        </ul>

        {/* ---------- Section 2 ---------- */}
        <h2 className="text-lg font-bold mt-6">Typical jobs</h2>
        <ul className="list-disc list-inside space-y-3">
          <li className="text-lg">
            Clerical and admin roles, mainly in the finance industry
          </li>

          <li className="text-lg">
            <span>Must have good</span>
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
              type="text"
              value={userAnswers[3] || ""}
              onChange={(e) => handleInputChange(3, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>skills.</span>
          </li>

          <li className="text-lg">
            <span>Jobs are usually for at least one</span>
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
              type="text"
              value={userAnswers[4] || ""}
              onChange={(e) => handleInputChange(4, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>.</span>
          </li>

          <li className="text-lg">
            <span>Pay is usually £</span>
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
              type="text"
              value={userAnswers[5] || ""}
              onChange={(e) => handleInputChange(5, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>per hour.</span>
          </li>
        </ul>

        {/* ---------- Section 3 ---------- */}
        <h2 className="text-lg font-bold mt-6">Registration process</h2>
        <ul className="list-disc list-inside space-y-3">
          <li className="text-lg">
            <span>Wear a</span>
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
              type="text"
              value={userAnswers[6] || ""}
              onChange={(e) => handleInputChange(6, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>to the interview.</span>
          </li>

          <li className="text-lg">
            <span>Must bring your</span>
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
              type="text"
              value={userAnswers[7] || ""}
              onChange={(e) => handleInputChange(7, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>to the interview.</span>
          </li>

          <li className="text-lg">
            <span>They will ask questions about each applicant’s</span>
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
              type="text"
              value={userAnswers[8] || ""}
              onChange={(e) => handleInputChange(8, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>.</span>
          </li>
        </ul>

        {/* ---------- Section 4 ---------- */}
        <h2 className="text-lg font-bold mt-6">
          Advantages of using an agency
        </h2>
        <ul className="list-disc list-inside space-y-3">
          <li className="text-lg">
            <span>The</span>
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
              type="text"
              value={userAnswers[9] || ""}
              onChange={(e) => handleInputChange(9, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>
              you receive at interview will benefit you. <br />
              Will get access to vacancies which are not advertised.
            </span>
          </li>

          <li className="text-lg">
            <span>Less</span>
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
              type="text"
              value={userAnswers[10] || ""}
              onChange={(e) => handleInputChange(10, e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-400 focus:outline-none rounded-md px-2 py-1 mx-2"
            />
            <span>is involved in applying for jobs.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Test1Listening2020;
