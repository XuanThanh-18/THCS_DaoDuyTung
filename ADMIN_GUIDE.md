# 🔐 Hệ Thống Đăng Nhập Admin - Tài Liệu Hướng Dẫn

## 📋 Tổng Quan

Hệ thống đăng nhập Admin sử dụng:

- **JWT (JSON Web Tokens)** để xác thực
- **bcryptjs** để mã hóa mật khẩu
- **Next.js Middleware** để bảo vệ routes
- **HTTP-only Cookies** để lưu token

---

## 🚀 Bắt Đầu Nhanh

### 1. Thông Tin Đăng Nhập Mặc Định

```
📧 Email: admin@daoduytung.edu.vn
🔐 Password: admin123456
```

> ⚠️ **QUAN TRỌNG**: Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!

### 2. Truy Cập Admin Panel

1. Mở trình duyệt, truy cập: `http://localhost:3000/admin/login`
2. Nhập email và mật khẩu
3. Click "Đăng Nhập"
4. Sẽ chuyển hướng tới `/admin/dashboard`

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── lib/
│   ├── auth.ts                 # JWT utilities
│   ├── password.ts             # Bcrypt utilities
│   └── db.ts                   # Prisma client
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx        # Login form
│   │   └── dashboard/
│   │       └── page.tsx        # Dashboard
│   └── api/
│       └── auth/
│           ├── login/
│           │   └── route.ts    # POST /api/auth/login
│           ├── logout/
│           │   └── route.ts    # POST /api/auth/logout
│           └── change-password/
│               └── route.ts    # POST /api/auth/change-password
├── middleware.ts               # Authentication middleware
└── prisma/
    └── seed.ts                 # Database seeding
```

---

## 🔑 API Endpoints

### 1. Đăng Nhập

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@daoduytung.edu.vn",
  "password": "admin123456"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "user": {
    "id": "user123",
    "email": "admin@daoduytung.edu.vn",
    "name": "Admin THCS Đào Duy Tùng",
    "role": "ADMIN"
  }
}
```

**Response (Error):**

```json
{
  "error": "Email hoặc mật khẩu không chính xác"
}
```

---

### 2. Đăng Xuất

```bash
POST /api/auth/logout
```

**Response:**

```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

### 3. Thay Đổi Mật Khẩu

```bash
POST /api/auth/change-password
Content-Type: application/json
Authorization: JWT token (in cookie)

{
  "oldPassword": "admin123456",
  "newPassword": "newPassword123456",
  "confirmPassword": "newPassword123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Mật khẩu đã được thay đổi thành công"
}
```

---

## 🔒 Bảo Mật

### 1. Middleware Bảo Vệ

File `middleware.ts` bảo vệ tất cả routes dưới `/admin/*`:

- Ngoại trừ `/admin/login`
- Kiểm tra JWT token trong cookie
- Redirect về `/admin/login` nếu không có token

### 2. Password Hashing

- Sử dụng **bcryptjs** với salt rounds = 10
- Password không bao giờ lưu dưới dạng plain text
- Mỗi khi đăng nhập, so sánh hash bằng `bcrypt.compare()`

### 3. JWT Token

- Lưu trong **HTTP-only Cookie** (bảo vệ khỏi XSS)
- Hết hạn sau **7 ngày**
- Không thể truy cập từ JavaScript (secure)
- Tự động gửi kèm mỗi request

### 4. Environment Variables

Trong `.env.local`:

```env
JWT_SECRET="your-super-secret-key-change-in-production"
```

---

## 🛠️ Cách Hoạt động

### Quy Trình Đăng Nhập

```
1. User nhập email & password → Login Form
                    ↓
2. POST /api/auth/login
                    ↓
3. Tìm user theo email trong DB
                    ↓
4. Kiểm tra password bằng bcrypt.compare()
                    ↓
5. Nếu đúng: tạo JWT token
                    ↓
6. Lưu token vào HTTP-only cookie
                    ↓
7. Redirect đến /admin/dashboard
```

### Quy Trình Truy Cập Protected Routes

```
1. User truy cập /admin/dashboard
                    ↓
2. Middleware kiểm tra cookie
                    ↓
3. Xác minh JWT token
                    ↓
4. Nếu hợp lệ: cho phép truy cập
                    ↓
5. Nếu lỗi: redirect đến /admin/login
```

---

## 📝 Tạo Admin User Mới

### Cách 1: Dùng Prisma CLI

```bash
npx prisma studio
```

1. Mở Prisma Studio ở `http://localhost:5555`
2. Click vào model `User`
3. Click "Add record"
4. Điền:
   - email: `newadmin@daoduytung.edu.vn`
   - password: (lưu ý phải hash bằng bcrypt!)
   - name: `Admin Name`
   - role: `ADMIN` hoặc `SUPERADMIN`

### Cách 2: Dùng Script

```bash
# Tạo file scripts/create-admin.ts
node scripts/create-admin.ts --email admin2@daoduytung.edu.vn --password newPassword123
```

---

## 🧪 Test & Development

### Chạy Development Server

```bash
npm run dev
```

Truy cập: `http://localhost:3000/admin/login`

### Reset Dữ Liệu

```bash
npm run seed
```

Sẽ tạo lại admin user với thông tin mặc định.

### Test API

```bash
# Sử dụng cURL hoặc Postman

# 1. Đăng nhập
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@daoduytung.edu.vn",
    "password": "admin123456"
  }'

# 2. Truy cập dashboard (cookie sẽ được gửi tự động)
curl http://localhost:3000/admin/dashboard

# 3. Đăng xuất
curl -X POST http://localhost:3000/api/auth/logout
```

---

## ⚠️ Vấn Đề Thường Gặp

### Lỗi: "Email hoặc mật khẩu không chính xác"

- Kiểm tra email có đúng không (lowercase)
- Kiểm tra password có đúng không (case-sensitive)
- Chạy `npm run seed` để reset dữ liệu

### Lỗi: "Bạn không có quyền truy cập"

- User này không có role `ADMIN` hoặc `SUPERADMIN`
- Kiểm tra role trong database

### Lỗi: Redirect loop vô tận

- Cookie bị lỗi: Xóa cookie và thử lại
- JWT_SECRET không khớp: Kiểm tra .env.local

### Lỗi: "Unauthorized" ở protected routes

- Token hết hạn: Đăng nhập lại
- Cookie bị xóa: Đăng nhập lại

---

## 🚀 Production Deployment

### Trước khi deploy:

1. **Thay đổi JWT_SECRET**

   ```env
   JWT_SECRET="generate-a-new-random-secure-string"
   ```

2. **Thay đổi mật khẩu admin mặc định**

   ```bash
   # Không sử dụng seed.ts trong production!
   ```

3. **Bật HTTPS**

   ```env
   NODE_ENV=production
   ```

4. **Setup Database Production**
   - Sử dụng Supabase PostgreSQL
   - Backup dữ liệu thường xuyên

5. **Enable WAF & Security Headers**
   - Cấu hình trong `next.config.ts`

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra logs: `npm run dev` sẽ hiển thị lỗi chi tiết
2. Kiểm tra `.env.local` có đúng không
3. Xóa `.next` và `node_modules`, chạy `npm install` lại
4. Kiểm tra database connection

---

## 📚 Tham Khảo

- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [jose - JWT Library](https://github.com/panva/jose)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Prisma](https://www.prisma.io)
