import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="p-4 mx-auto sticky top-0 z-50  navbar flex justify-between  bg-base-100 ">
      <div className="flex items-center gap-5">
        <Link to="/voiceIelts">
          <div>
            <img
              className=" h-16"
              src="https://i.ibb.co.com/zTw3NXG3/images.png"
              alt=""
            />
          </div>
        </Link>

        <Link to="/">
          <h1
            className="text-2xl font-bold text-black hover:text-red-500 "
            onMouseEnter={(e) => (e.target.textContent = "IELTS")}
            onMouseLeave={(e) => (e.target.textContent = "Jumpinto")}
          >
            Jumpinto
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative flex flex-col items-center group">
          {/* Circle with message icon */}
          <div className="bg-white border-2 border-gray-300 h-10 w-10 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-blue-100">
            <img
              className="h-5 w-5 "
              src="https://i.ibb.co.com/Y4hBZK9n/message-1.jpg"
              alt="message icon"
            />
          </div>

          {/* Tooltip */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-max p-2.5 text-white border border-gray-300 rounded-md text-lg bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Have suggestions or need to report an issue? <br /> Email us at
            team@jumpinto.com
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            // 🔹 User not logged in → Show Sign In button
            <Link to="/login">
              <button className="btn text-white text-xl font-bold rounded-2xl bg-[#47698F]">
                Sign In
              </button>
            </Link>
          ) : (
            // 🔹 User logged in → Show image
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
