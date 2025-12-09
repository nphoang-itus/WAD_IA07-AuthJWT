import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất thành công!");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://img.icons8.com/color/96/vietnam-circular.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-red-600">HCMUS Portal</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-red-100">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Xin chào, {user?.name}!
              </h2>
              <p className="text-gray-600 text-lg">
                Chào mừng bạn quay trở lại Dashboard
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-gray-600 mb-1 font-medium">Email</p>
              <p className="text-lg font-semibold text-gray-900">
                {user?.email}
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-gray-600 mb-1 font-medium">User ID</p>
              <p className="text-lg font-semibold text-gray-900">#{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border-2 border-red-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Bảo mật</h3>
            </div>
            <p className="text-gray-600">
              Tài khoản của bạn được bảo vệ bởi JWT Authentication với Access
              Token và Refresh Token.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-red-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Dữ liệu</h3>
            </div>
            <p className="text-gray-600">
              Tất cả dữ liệu cá nhân được mã hóa và lưu trữ an toàn trên server.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-red-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Truy cập</h3>
            </div>
            <p className="text-gray-600">
              Bạn có thể truy cập tất cả các tính năng được bảo vệ của hệ thống.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4"> Đây là vùng bảo mật!</h3>
          <p className="text-lg mb-4">
            Chỉ những người dùng có Access Token hợp lệ mới có thể thấy trang
            này.
          </p>
          <p className="text-red-100">
            💡 <strong>Mẹo:</strong> Thử bấm F5 để tải lại trang - hệ thống sẽ
            tự động kiểm tra cookie và giữ bạn đăng nhập!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-red-600 font-semibold">Nguyen Phuc Hoang</span>{" "}
          - 23120264
        </p>
      </footer>
    </div>
  );
};

export default DashboardPage;
