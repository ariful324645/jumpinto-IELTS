import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router";

const Writing1Pagination2017 = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sideButtonsList = ["Listening", "Reading", "Writing", "Speaking"];

  const [leftIndex, setLeftIndex] = React.useState(0);
  const [rightIndex, setRightIndex] = React.useState(2);

  const topicLinks = {
    Listening: "/2017/Test%201/listening",
    Reading:   "/2017/Test%201/reading",
    Writing:   "/2017/Test%201/writing",
    Speaking:  "/2017/Test%201/speaking",
  };

  const rotateLeft = () => {
    setLeftIndex((prev) => (prev + 1) % sideButtonsList.length);
    setRightIndex((prev) => (prev + 1) % sideButtonsList.length);
  };

  const rotateRight = () => {
    setLeftIndex(
      (prev) => (prev - 1 + sideButtonsList.length) % sideButtonsList.length
    );
    setRightIndex(
      (prev) => (prev - 1 + sideButtonsList.length) % sideButtonsList.length
    );
  };

  const centerLinks = [
    "/2017/Test%201/writing",

    "/writing1Part22017", // page 2
   
  ];

  // ---------- Detect Active Page ----------
  const activePage = centerLinks.findIndex((link) => link === currentPath) + 1;

  return (
    <div className="px-3">
      <div className="flex gap-5 items-center justify-center mt-6 mb-6 px-4">
        {/* Left Rotate Button */}
        <Link to={topicLinks[sideButtonsList[leftIndex]]} onClick={rotateLeft}>
          <button className="px-4 flex gap-2 items-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <IoIosArrowBack size={20} /> {sideButtonsList[leftIndex]}
          </button>
        </Link>

        {/* Center Page Buttons */}
        <div className="flex gap-2">
          {centerLinks.map((link, idx) => (
            <Link key={idx} to={link}>
              <button
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition ${
                  activePage === idx + 1
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            </Link>
          ))}
        </div>

        {/* Right Rotate Button */}
        <Link
          to={topicLinks[sideButtonsList[rightIndex]]}
          onClick={rotateRight}
        >
          <button className="px-4 py-2 bg-green-600 flex items-center gap-1 text-white rounded-lg hover:bg-green-700 transition">
            {sideButtonsList[rightIndex]}
            <IoIosArrowForward size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Writing1Pagination2017;
