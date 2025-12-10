import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import type { User } from "../api/authApi";
import { setAccessToken } from "../api/axiosClient";

// 1. Định nghĩa Shape của Context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Loading lúc khởi tạo (check auth ban đầu)
  login: (data: any) => void;
  logout: () => void;
  isLoggingIn: boolean; // Loading của action login
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // Trạng thái loading ban đầu khi mới F5 trang
  const [isInitializing, setIsInitializing] = useState(true);

  const queryClient = useQueryClient();

  // --- QUERY: CHECK USER SESSION (Khi F5) ---
  // Chúng ta không dùng useQuery theo cách thông thường để render,
  // mà dùng nó như một hàm check ngầm lúc mount.
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Thử gọi API cần quyền xác thực
        // Mẹo: Interceptor của chúng ta sẽ tự động xử lý:
        // 1. Gửi request (fail do chưa có AT) -> 2. Refresh Token -> 3. Retry -> 4. Thành công
        // Nếu Cookie hết hạn thì sẽ nhảy vào catch.
        const userData = await authApi.getProfile(); // Giả sử endpoint này trả về user info
        // Lưu ý: Cần chỉnh lại backend trả về user info ở endpoint /dashboard hoặc /me
        // Ở đây mình giả định userData có chứa thông tin user
        // Tạm thời hardcode để test logic flow nếu backend chưa chuẩn:
        setUser({ id: 1, email: "admin@gmail.com", name: "Restored User" });
      } catch (error) {
        setUser(null); // Không đăng nhập được
      } finally {
        setIsInitializing(false); // Kết thúc quá trình khởi tạo
      }
    };

    initAuth();
  }, []);

  // --- MUTATION: LOGIN ---
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // 1. Lưu Access Token vào Memory (thông qua hàm helper của Phase 3)
      setAccessToken(data.accessToken);

      // 2. Lưu User info vào State
      setUser(data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("Login failed!"); // Tạm thời alert
    },
  });

  // --- MUTATION: LOGOUT ---
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setUser(null);
      setAccessToken(null);
      // Xóa cache của React Query để tránh lộ data cũ
      queryClient.clear();
      // Redirect về login (đã xử lý ở component hoặc router)
    },
  });

  // Giá trị context export ra ngoài
  const value = {
    user,
    isAuthenticated: !!user, // Convert object sang boolean
    isLoading: isInitializing,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom Hook để dùng Context dễ dàng
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
