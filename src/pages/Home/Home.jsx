import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Pagination from "../../components/Pagination";

const data = [
  {
    headline: "IELTS 20 Academic 2025",
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
    headline: "IELTS 19 Academic 2024",
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
    headline: "IELTS 18 Academic 2023",
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
    headline: "IELTS 17 Academic 2022",
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
    headline: "IELTS 16 Academic 2021",
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
    headline: "IELTS 15 Academic 2020",
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
    headline: "IELTS 14 Academic 2019",
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
    headline: "IELTS 13 Academy 2018",
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
    headline: "IELTS 20 Academy 2017",
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
  // {
  //   headline: "IELTS 20 Academy 2016",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2015",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2013",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2011",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2009",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2007",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2006",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2005",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2002",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2000",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 1996",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
  // {
  //   headline: "IELTS 20 Academy 2014",
  //   tests: [
  //     {
  //       testName: "Test 1",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 2",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 3",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //     {
  //       testName: "Test 4",
  //       sections: ["Listening", "Reading", "Writing", "Speaking"],
  //     },
  //   ],
  // },
];

const Home = () => {
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const savedMarks = {};
    for (let key in localStorage) {
      if (localStorage.getItem(key) !== null) {
        savedMarks[key] = Number(localStorage.getItem(key));
      }
    }
    setMarks(savedMarks);
  }, []);

  const getMarkKey = (year, testName, section) => {
    return `/${year}/${testName}/${section.toLowerCase()}`;
  };

  const calculateTotal = (year, testName, sections) => {
    return sections.reduce((total, sec) => {
      const key = getMarkKey(year, testName, sec);
      return total + (marks[key] || 0);
    }, 0);
  };

  return (
    <div className="w-7/12 mx-auto py-10">
      {data.map((academy, index) => {
        const year = academy.headline.match(/\d{4}/)[0];
        return (
          <div key={index} className="mb-12 relative">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {academy.headline}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {academy.tests.map((test, i) => {
                const totalScore = calculateTotal(
                  year,
                  test.testName,
                  test.sections
                );

                return (
                  <div
                    key={i}
                    className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition relative"
                  >
                    {/* Show total only if > 0 */}

                    {/* {totalScore > 0 && (
                      <div className="absolute top-4 right-4 bg-green-200 px-3 py-1 rounded-lg font-bold">
                        <span> {totalScore}</span>
                      </div>
                    )} */}

                    <h3 className="text-xl font-semibold mb-3">
                      {test.testName}
                    </h3>
                    <hr className="hover:bg-gray-100 my-4" />

                    <ul className="space-y-2">
                      {test.sections.map((sec, j) => {
                        const key = getMarkKey(year, test.testName, sec);
                        const score = marks[key] || 0;

                        return (
                          <li
                            key={j}
                            className={`flex ${
                              score > 0
                                ? "justify-between items-center"
                                : "justify-center"
                            } gap-2`}
                          >
                            <Link
                              to={`/${year}/${encodeURIComponent(
                                test.testName
                              )}/${sec.toLowerCase()}`}
                              className="w-full"
                            >
                              <button
                                className={`text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg ${
                                  score > 0 ? "text-left" : "text-center w-full"
                                }`}
                              >
                                {sec}
                              </button>
                            </Link>

                            {/* Show mark only if score > 0 */}
                            {/* {score > 0 && (
                              <span className="bg-yellow-50 rounded-lg px-3 py-1 font-bold">
                                {score}
                              </span>
                            )} */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
   
  );
};

export default Home;
