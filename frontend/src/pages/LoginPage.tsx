import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.schema";
import type { LoginInput } from "../schemas/auth.schema";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface LoginPageProps {
  onSwitch?: () => void;
  onClose?: () => void;
}

const LoginPage = ({ onSwitch, onClose }: LoginPageProps) => {
  const { login, isLoggingIn, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // 1. Setup React Hook Form
  const {
    register, // Hàm để đăng ký input vào RHF
    handleSubmit, // Hàm xử lý submit
    formState: { errors }, // Lấy trạng thái lỗi
    setError, // Hàm để tự set lỗi (ví dụ lỗi từ server trả về)
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema), // Kết nối với Zod
  });

  // 2. Nếu đã login rồi thì đá về Dashboard ngay
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. Hàm xử lý khi user bấm Submit (và đã qua validation client)
  const onSubmit = (data: LoginInput) => {
    login(data, {
      onSuccess: () => {
        toast.success("Đăng nhập thành công!");
        onClose?.();
        navigate("/dashboard", { replace: true });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Đăng nhập thất bại");
        setError("root", {
          message: error.response?.data?.message || "Login failed",
        });
      },
    });
  };

  // Hiển thị loading khi đang check auth ban đầu
  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative bg-white rounded-[32px] shadow-2xl max-w-md w-full px-8 py-10">
        {/* Close button */}
        <button
          className="absolute top-3 right-5 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
          onClick={onClose}
          aria-label="Đóng"
          type="button"
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/color/96/vietnam-circular.png"
            alt="Logo"
            className="w-12 h-12"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Đăng nhập
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Tham gia để trải nghiệm
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-xl border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400 transition-all`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              autoComplete="current-password"
              {...register("password")}
              className={`w-full rounded-xl border ${
                errors.password ? "border-red-400" : "border-gray-300"
              } px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-400 transition-all`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full mt-2 py-3 rounded-full text-white font-bold text-lg transition-all
              ${
                isLoggingIn
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 hover:shadow-lg"
              }`}
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        {/* Register link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Chưa có tài khoản?{" "}
          <span
            className="font-bold text-red-600 cursor-pointer hover:underline transition-all"
            onClick={onSwitch}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
