import axiosClient from "./axiosClient";

// Định nghĩa kiểu dữ liệu (Typescript Interface)
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface DashboardResponse {
  message: string;
  secretData: number[];
  user: User;
}

export const authApi = {
  // Login: Gửi user/pass, nhận về User info + Access Token
  login: async (credentials: { email: string; password: string }) => {
    const response = await axiosClient.post<LoginResponse>(
      "/login",
      credentials
    );
    return response.data;
  },

  // Register: Tạo tài khoản mới
  register: async (credentials: {
    email: string;
    password: string;
    name?: string;
  }) => {
    const response = await axiosClient.post<LoginResponse>(
      "/register",
      credentials
    );
    return response.data;
  },

  // Logout: Gọi server để xóa Cookie RT
  logout: async () => {
    return axiosClient.post("/logout");
  },

  // Get Profile: Dùng để check xem user có đang đăng nhập hợp lệ không
  getProfile: async () => {
    const response = await axiosClient.get<DashboardResponse>("/dashboard");
    return response.data.user; // Trả về user object thay vì toàn bộ response
  },
};
