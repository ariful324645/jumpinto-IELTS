// // import React, { useContext, useEffect, useState } from "react";
// // import { Link } from "react-router";
// // import { AuthContext } from "../context/AuthContext/AuthContext";
// // import { FaClock } from "react-icons/fa";

// // const Navbar = () => {
// //   const { user, logOut } = useContext(AuthContext);
// //   const [showConfirm, setShowConfirm] = useState(false);

// //   return (
// //     <div className="p-4 mx-auto sticky top-0 z-50  navbar flex justify-between  bg-base-100 ">
// //       <div className="flex items-center gap-5">
// //         <Link to="/voiceIelts">
// //           <div>
// //             <img
// //               className=" h-16"
// //               src="https://i.ibb.co.com/zTw3NXG3/images.png"
// //               alt=""
// //             />
// //           </div>
// //         </Link>

// //         <Link to="/">
// //           <h1
// //             className="text-2xl font-bold text-black hover:text-red-500 "
// //             onMouseEnter={(e) => (e.target.textContent = "IELTS")}
// //             onMouseLeave={(e) => (e.target.textContent = "Jumpinto")}
// //           >
// //             Jumpinto
// //           </h1>
// //         </Link>
// //       </div>

// //       <div>
// //         <span>
// //           <FaClock size={24} className="text-green-900" />
// //         </span>
// //       </div>

// //       <div className="flex items-center gap-5">
// //         <div className="relative flex flex-col items-center group">
// //           {/* Circle with message icon */}
// //           <div className="bg-white border-2 border-gray-300 h-10 w-10 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-blue-100">
// //             <img
// //               className="h-5 w-5 "
// //               src="https://i.ibb.co.com/Y4hBZK9n/message-1.jpg"
// //               alt="message icon"
// //             />
// //           </div>

// //           {/* Tooltip */}
// //           <div className="absolute top-12 left-1/2 -translate-x-1/2 w-max p-2.5 text-white border border-gray-300 rounded-md text-lg bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
// //             Have suggestions or need to report an issue? <br /> Email us at
// //             team@jumpinto.com
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-4">
// //           {!user ? (
// //             // 🔹 User not logged in → Show Sign In button
// //             <Link to="/login">
// //               <button className="btn text-white text-xl font-bold rounded-2xl bg-[#47698F]">
// //                 Sign In
// //               </button>
// //             </Link>
// //           ) : (
// //             // 🔹 User logged in → Show image
// //             <div className="relative">
// //               <img
// //                 src={user.photoURL}
// //                 alt="Google profile"
// //                 className="w-10 h-10 rounded-full border-2 border-[#47698F] cursor-pointer"
// //                 onClick={() => setShowConfirm(!showConfirm)}
// //               />

// //               {showConfirm && (
// //                 <div className="absolute top-12 right-0 bg-white shadow-lg p-4 rounded-2xl border w-56 text-center">
// //                   <p className="text-gray-700 font-semibold mb-3">
// //                     Are you sure to sign out?
// //                   </p>
// //                   <div className="flex justify-center gap-4">
// //                     <button
// //                       onClick={() => setShowConfirm(false)}
// //                       className="px-4 py-1 rounded-lg bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
// //                     >
// //                       No
// //                     </button>
// //                     <button
// //                       onClick={() => {
// //                         logOut();
// //                         setShowConfirm(false);
// //                       }}
// //                       className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
// //                     >
// //                       Yes
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router";
// import { AuthContext } from "../context/AuthContext/AuthContext";
// import { FaClock } from "react-icons/fa";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const location = useLocation();
//   const [time, setTime] = useState(0);
//   const [running, setRunning] = useState(false);

//   // Set dynamic countdown time based on page
// useEffect(() => {
//   let dynamicTime = 8; // default time

//   const path = location.pathname.toLowerCase(); // normalize

//   // Exceptions for specific paths
//   if (path.includes("/2020/test 1/listening")) dynamicTime = 5;
//   else if (path.includes("/2021/test 1/listening")) dynamicTime = 3;
//   else {
//     // Extract year dynamically like "/2025/..."
//     const match = path.match(/\/(\d{4})\//);
//     if (match) {
//       const year = parseInt(match[1]);
//       dynamicTime = year - 2000; // 2025 → 25 seconds
//     }
//   }

//   setTime(dynamicTime);
//   setRunning(false); // stop timer on page change
// }, [location]);

//   // Countdown effect
//   useEffect(() => {
//     if (!running) return;

//     const timer = setInterval(() => {
//       setTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setRunning(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [running]);

//   // Toggle start/stop on clock click
//   const handleClockClick = () => {
//     setRunning((prev) => !prev);
//   };

//   return (
//     <div className="p-4 mx-auto sticky top-0 z-50 navbar flex justify-between bg-base-100">
//       {/* Logo */}
//       <div className="flex items-center gap-5">
//         <Link to="/voiceIelts">
//           <div>
//             <img
//               className="h-16"
//               src="https://i.ibb.co.com/zTw3NXG3/images.png"
//               alt="Logo"
//             />
//           </div>
//         </Link>

//         <Link to="/">
//           <h1
//             className="text-2xl font-bold text-black hover:text-red-500"
//             onMouseEnter={(e) => (e.target.textContent = "IELTS")}
//             onMouseLeave={(e) => (e.target.textContent = "Jumpinto")}
//           >
//             Jumpinto
//           </h1>
//         </Link>
//       </div>

//       {/* Clock Timer */}
//       <div
//         className="flex items-center gap-2 cursor-pointer"
//         onClick={handleClockClick}
//       >
//         <FaClock
//           size={24}
//           className={`text-green-900 ${running ? "animate-pulse" : ""}`}
//         />
//         <span className="font-bold">{time}s</span>
//       </div>

//       {/* Message Icon and User */}
//       <div className="flex items-center gap-5">
//         <div className="relative flex flex-col items-center group">
//           <div className="bg-white border-2 border-gray-300 h-10 w-10 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-blue-100">
//             <img
//               className="h-5 w-5"
//               src="https://i.ibb.co.com/Y4hBZK9n/message-1.jpg"
//               alt="message icon"
//             />
//           </div>
//           <div className="absolute top-12 left-1/2 -translate-x-1/2 w-max p-2.5 text-white border border-gray-300 rounded-md text-lg bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//             Have suggestions or need to report an issue? <br /> Email us at
//             team@jumpinto.com
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           {!user ? (
//             <Link to="/login">
//               <button className="btn text-white text-xl font-bold rounded-2xl bg-[#47698F]">
//                 Sign In
//               </button>
//             </Link>
//           ) : (
//             <div className="relative">
//               <img
//                 src={user.photoURL}
//                 alt="Google profile"
//                 className="w-10 h-10 rounded-full border-2 border-[#47698F] cursor-pointer"
//                 onClick={() => setShowConfirm(!showConfirm)}
//               />
//               {showConfirm && (
//                 <div className="absolute top-12 right-0 bg-white shadow-lg p-4 rounded-2xl border w-56 text-center">
//                   <p className="text-gray-700 font-semibold mb-3">
//                     Are you sure to sign out?
//                   </p>
//                   <div className="flex justify-center gap-4">
//                     <button
//                       onClick={() => setShowConfirm(false)}
//                       className="px-4 py-1 rounded-lg bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
//                     >
//                       No
//                     </button>
//                     <button
//                       onClick={() => {
//                         logOut();
//                         setShowConfirm(false);
//                       }}
//                       className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
//                     >
//                       Yes
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { FaClock } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const [secondsLeft, setSecondsLeft] = useState(null); // initially null
  const [running, setRunning] = useState(false);
  const [showTimeOver, setShowTimeOver] = useState(false); // ✅ new state for modal

  // Define times for each pathname in seconds
  const pathTimes = {
    "/2021/test 1/listening": 0.1 * 60,
    "/2020/test 1/listening": 0.1 * 60,
    "/2020/test 2/listening": 7 * 60,
    "/2020/test 3/listening": 1 * 60,
  };

  // Format seconds to mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle clock click (start, pause, resume)
  const handleClockClick = () => {
    const path = decodeURIComponent(location.pathname.toLowerCase());

    // If timer not started yet, start it
    if (secondsLeft === null) {
      let dynamicTime = 0;
      for (const key in pathTimes) {
        if (path.includes(key.toLowerCase())) {
          dynamicTime = pathTimes[key];
          break;
        }
      }
      if (dynamicTime > 0) {
        setSecondsLeft(dynamicTime);
        setRunning(true);
      }
    }
    // If timer is running → pause it
    else if (running) {
      setRunning(false);
    }
    // If timer is paused → resume it
    else if (!running && secondsLeft > 0) {
      setRunning(true);
    }
  };

  // Countdown effect
  useEffect(() => {
    if (!running || secondsLeft === null) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          setShowTimeOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  return (
    <div className="p-4 mx-auto sticky top-0 z-50 navbar flex justify-between bg-base-100">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <Link to="/voiceIelts">
          <img
            className="h-16"
            src="https://i.ibb.co.com/zTw3NXG3/images.png"
            alt="Logo"
          />
        </Link>
        <Link to="/">
          <h1
            className="text-2xl font-bold text-black hover:text-red-500"
            onMouseEnter={(e) => (e.target.textContent = "IELTS")}
            onMouseLeave={(e) => (e.target.textContent = "Jumpinto")}
          >
            Jumpinto
          </h1>
        </Link>
      </div>

      {/* Clock Timer */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleClockClick}
      >
        <FaClock
          size={24}
          className={`text-green-900 ${running ? "animate-pulse" : ""}`}
        />
        <span className="font-bold">
          {secondsLeft !== null ? formatTime(secondsLeft) : ""}
        </span>
        {/* ✅ Time Over Modal */}
        {showTimeOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white py-4 px-14 rounded-xl shadow-xl text-center max-w-sm">
              <h2 className="text-xl font-bold text-red-600 mb-3">
                ⏰ Time’s Up!
              </h2>
         
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowTimeOver(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message Icon & User */}
      <div className="flex items-center gap-5">
        <div className="relative flex flex-col items-center group">
          <div className="bg-white border-2 border-gray-300 h-10 w-10 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-blue-100">
            <img
              className="h-5 w-5"
              src="https://i.ibb.co.com/Y4hBZK9n/message-1.jpg"
              alt="message icon"
            />
          </div>
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-max p-2.5 text-white border border-gray-300 rounded-md text-lg bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Have suggestions or need to report an issue? <br /> Email us at
            team@jumpinto.com
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link to="/login">
              <button className="btn text-white text-xl font-bold rounded-2xl bg-[#47698F]">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="Google profile"
                className="w-10 h-10 rounded-full border-2 border-[#47698F] cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              />
              {showConfirm && (
                <div className="absolute top-12 right-0 bg-white shadow-lg p-4 rounded-2xl border w-56 text-center">
                  <p className="text-gray-700 font-semibold mb-3">
                    Are you sure to sign out?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-4 py-1 rounded-lg bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        logOut();
                        setShowConfirm(false);
                      }}
                      className="px-4 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
