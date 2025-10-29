import React from "react";
import { Link } from "react-router";

const data = [
  {
    headline: "IELTS 20 Academy 2025",
    tests: [
      {
        testName: "Test 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
    ],
  },
  {
    headline: "IELTS 20 Academy 2024",
    tests: [
      {
        testName: "Test 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
    ],
  },
  {
    headline: "IELTS 20 Academy 2023",
    tests: [
      {
        testName: "Test 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
    ],
  },
  {
    headline: "IELTS 20 Academy 2022",
    tests: [
      {
        testName: "Test 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
    ],
  },
  {
    headline: "IELTS 20 Academy 2021",
    tests: [
      {
        testName: "Test 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
    ],
  },
  {
    headline: "IELTS 20 Academy 2020",
    tests: [
      {
        testName: "Test 1",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 2",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 3",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
      {
        testName: "Test 4",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
      },
    ],
  },
];

const Home = () => {
  return (
    <div className="w-6/12 mx-auto py-10">
      {data.map((academy, index) => {
        const year = academy.headline.match(/\d{4}/)[0]; // extract year from headline
        return (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {academy.headline}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {academy.tests.map((test, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {test.testName}
                  </h3>
                  <hr className="hover:bg-gray-100 my-4" />
                  <ul className="space-y-2">
                    {test.sections.map((sec, j) => (
                      <li key={j}>
                        <Link
                          to={`/${year}/${encodeURIComponent(
                            test.testName
                          )}/${sec.toLowerCase()}`}
                        >
                          <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg w-full">
                            {sec}
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
