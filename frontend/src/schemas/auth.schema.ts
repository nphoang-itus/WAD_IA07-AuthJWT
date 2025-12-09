import { z } from "zod";

// Định nghĩa Schema cho Login Form
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required") // Không được để trống
    .email("Invalid email address"), // Phải đúng định dạng email
  password: z.string().min(3, "Password must be at least 3 characters"), // Ví dụ luật độ dài
});

// Trích xuất kiểu dữ liệu TypeScript từ Schema (rất tiện lợi!)
// Thay vì phải viết interface thủ công: interface LoginInput { ... }
export type LoginInput = z.infer<typeof loginSchema>;

// Định nghĩa Schema cho Register Form
export const registerSchema = z
  .object({
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .regex(/[a-zA-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
