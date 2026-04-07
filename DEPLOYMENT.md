# Hướng dẫn triển khai (Deployment Guide)

## 1. Yêu cầu hệ thống
- Node.js 18+
- PostgreSQL Database

## 2. Biến môi trường (.env)
Tạo file `.env` với các thông tin sau:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/daoduytung_db"
NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_api_key"
```

## 3. Cài đặt & Khởi tạo
```bash
npm install
npx prisma generate
npx prisma db push
```

## 4. Chạy ứng dụng
```bash
npm run dev
```

## 5. Triển khai lên Vercel
- Kết nối kho lưu trữ GitHub với Vercel.
- Thêm các biến môi trường trong phần Settings > Environment Variables.
- Vercel sẽ tự động nhận diện Next.js và triển khai.
- Đảm bảo cơ sở dữ liệu PostgreSQL đã được cấu hình (có thể dùng Vercel Postgres hoặc Supabase).

## 6. Tài khoản quản trị mặc định
- Email: `admin@daoduytung.edu.vn`
- Mật khẩu: `admin123`
