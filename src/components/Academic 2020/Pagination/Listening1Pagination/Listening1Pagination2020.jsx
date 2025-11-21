import React, { useState } from "react";
// ✅ must be react-router-dom
import { GrClearOption } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const Listening1Pagination = () => {
  const [activePage, setActivePage] = useState(1);

  const sideButtonsList = ["Listening", "Reading", "Writing", "Speaking"];

  // Index for side buttons rotation
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(2);

  // Each topic has its own URL
  const topicLinks = {
    Listening: "/2025/Test%201/listening",
    Reading: "/2025/Test%202/listening",
    Writing: "/2025/Test%203/listening",
    Speaking: "/2025/Test%204/listening",
  };

  // Rotate Left
  const rotateLeft = () => {
    setLeftIndex((prev) => (prev + 1) % sideButtonsList.length);
    setRightIndex((prev) => (prev + 1) % sideButtonsList.length);
  };

  // Rotate Right
  const rotateRight = () => {
    setLeftIndex(
      (prev) => (prev - 1 + sideButtonsList.length) % sideButtonsList.length
    );
    setRightIndex(
      (prev) => (prev - 1 + sideButtonsList.length) % sideButtonsList.length
    );
  };

  // Center page links (Tests)
  const centerLinks = ["/listening1Part22020", "/listening1Pagination"];

  return (
    <div className="px-3">
      {/* ===== Pagination Bottom ===== */}
      <div className="flex gap-5 items-center justify-center mt-6 mb-6 px-4">
        {/* === Left Button === */}
        <div className="flex gap-2">
          <Link
            to={topicLinks[sideButtonsList[leftIndex]]} // ✅ dynamic navigation
            onClick={rotateLeft} // ✅ rotate on click
          >
            <button className="px-4 flex gap-2 items-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <IoIosArrowBack size={20} /> {sideButtonsList[leftIndex]}
            </button>
          </Link>
        </div>

        {/* === Middle Buttons (Tests 1–4) === */}
        <div className="flex gap-2">
          {centerLinks.map((link, idx) => (
            <Link key={idx} to={link}>
              <button
                onClick={() => setActivePage(idx + 1)}
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

        {/* === Right Button === */}
        <div className="flex gap-2">
          <Link
            to={topicLinks[sideButtonsList[rightIndex]]} // ✅ dynamic navigation
            onClick={rotateRight} // ✅ rotate on click
          >
            <button className="px-4 py-2 bg-green-600 flex items-center gap-1 text-white rounded-lg hover:bg-green-700 transition">
              {sideButtonsList[rightIndex]}
              <IoIosArrowForward size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Listening1Pagination;
