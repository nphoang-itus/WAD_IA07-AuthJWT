import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const closePopup = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const switchPopup = (type: "login" | "register") => {
    if (type === "login") {
      setShowRegister(false);
      setShowLogin(true);
    } else {
      setShowLogin(false);
      setShowRegister(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
      <div className="max-w-2xl w-full flex flex-col items-center bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 mt-8 border-2 border-red-200">
        <img
          src="https://i.pinimg.com/736x/6d/7b/5d/6d7b5dc123388d6ed7142ea9d9467554.jpg"
          alt="Welcome"
          className="w-40 h-40 object-contain mb-6 rounded-full shadow-lg border-4 border-white"
        />
        <h1 className="text-5xl font-extrabold text-center mb-3 text-red-700">
          HCMUS <span className="text-red-600">User Portal</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-8 text-center">
          Đăng ký, đăng nhập và quản lý tài khoản của bạn một cách{" "}
          <span className="text-red-600 font-semibold">an toàn</span> và{" "}
          <span className="text-red-600 font-semibold">nhanh chóng</span>.
        </h2>
        <div className="flex gap-6 mb-2">
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-3 rounded-full bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="px-8 py-3 rounded-full bg-white border-2 border-red-600 text-red-700 font-bold text-lg hover:bg-red-50 transition"
          >
            Đăng ký
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-semibold">Nguyen Phuc Hoang</span>{" "}
          - 23120264
        </p>
      </div>

      {(showLogin || showRegister) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 relative max-w-md w-full">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
            >
              &times;
            </button>
            {showLogin && (
              <LoginPage
                onSwitch={() => switchPopup("register")}
                onClose={closePopup}
              />
            )}
            {showRegister && (
              <RegisterPage
                onSwitch={() => switchPopup("login")}
                onClose={closePopup}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
