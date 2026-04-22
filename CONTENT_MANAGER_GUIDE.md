# 📋 Content Management System - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Hệ thống quản lý nội dung được xây dựng cho website THCS Đào Duy Tùng, cho phép:

- ✅ Quản lý bài viết / tin tức
- ✅ Quản lý sự kiện
- ✅ Quản lý thông báo
- ✅ Tất cả dùng chung 1 template form

---

## 📁 Cấu Trúc Folder

```
lib/
  ├── slug.ts                    # Slug generation utilities
  ├── validation.ts              # Zod validation schemas

components/
  └── ContentEditorForm.tsx       # Main editor component (reusable)

app/api/content/
  ├── post/
  │   ├── route.ts              # POST /api/content/post
  │   └── [id]/route.ts         # PUT/DELETE /api/content/post/{id}
  ├── event/
  │   ├── route.ts              # POST /api/content/event
  │   └── [id]/route.ts         # PUT/DELETE /api/content/event/{id}
  └── announcement/
      ├── route.ts              # POST /api/content/announcement
      └── [id]/route.ts         # PUT/DELETE /api/content/announcement/{id}

app/admin/content/
  ├── post/
  │   ├── new/page.tsx          # Create post
  │   └── [id]/edit/page.tsx    # Edit post
  ├── event/
  │   ├── new/page.tsx          # Create event
  │   └── [id]/edit/page.tsx    # Edit event
  └── announcement/
      ├── new/page.tsx          # Create announcement
      └── [id]/edit/page.tsx    # Edit announcement
```

---

## 🚀 Hướng Dẫn Sử Dụng

### 1️⃣ Tạo Bài Viết Mới

**URL:** `http://localhost:3000/admin/content/post/new`

```tsx
<ContentEditorForm type="post" />
```

**Các trường có sẵn:**

- Tiêu đề (tự động tạo slug)
- Slug
- Ảnh đại diện (URL)
- Tóm tắt ngắn
- Nội dung chi tiết
- Danh mục (dropdown)
- Trạng thái (Nháp/Chờ duyệt/Đã đăng)
- Ngày đăng
- Bài nổi bật (checkbox)

**Form này tự động:**

- Tạo slug từ tiêu đề
- Check unique slug (auto-append -1, -2 nếu trùng)
- Gán authorId từ user đăng nhập
- Validate dữ liệu với Zod

---

### 2️⃣ Tạo Sự Kiện

**URL:** `http://localhost:3000/admin/content/event/new`

```tsx
<ContentEditorForm type="event" />
```

**Các trường riêng cho Event:**

- Mô tả (thay vì excerpt)
- Ngày diễn ra (date picker)
- Địa điểm (text input)

---

### 3️⃣ Tạo Thông Báo

**URL:** `http://localhost:3000/admin/content/announcement/new`

```tsx
<ContentEditorForm type="announcement" />
```

**Form đơn giản hơn:**

- Chỉ có: Tiêu đề, Slug, Nội dung
- Không có: Ảnh, Tóm tắt, Danh mục
- Có: Trạng thái, Ngày đăng

---

## 🔧 API Endpoints

### Posts

```
POST   /api/content/post              # Create
PUT    /api/content/post/{id}         # Update
DELETE /api/content/post/{id}         # Delete
```

### Events

```
POST   /api/content/event             # Create
PUT    /api/content/event/{id}        # Update
DELETE /api/content/event/{id}        # Delete
```

### Announcements

```
POST   /api/content/announcement      # Create
PUT    /api/content/announcement/{id} # Update
DELETE /api/content/announcement/{id} # Delete
```

---

## 📝 Validation Rules

### Posts & Events

- **Title:** 3-200 ký tự (bắt buộc)
- **Content:** Tối thiểu 10 ký tự (bắt buộc)
- **Category:** Bắt buộc chọn
- **Slug:** Tự sinh hoặc chỉnh sửa

### Events (thêm)

- **Event Date:** Bắt buộc chọn
- **Location:** Bắt buộc nhập

### Announcements

- **Title:** 3-200 ký tự (bắt buộc)
- **Content:** Tối thiểu 10 ký tự (bắt buộc)

---

## 🎨 UI/UX Features

✨ **Responsive Design:**

- Desktop: 2-column layout (content left, sidebar right)
- Mobile/Tablet: 1-column layout (stacked)

✨ **Publishing Settings Sidebar:**

- Category dropdown
- Status selector (Draft/Pending/Published)
- Publish date picker
- Featured checkbox
- Save draft button
- Publish button

✨ **Auto-generation:**

- Slug từ tiêu đề (loại bỏ diacritics)
- Author ID từ user đăng nhập
- Created/Updated timestamps

---

## 🔐 Security

✅ **Authentication:**

- Yêu cầu đăng nhập admin
- Check role = "ADMIN"
- Middleware bảo vệ routes

✅ **Data Validation:**

- Zod schemas trên frontend
- Validation lại trên backend
- Unique slug checks

---

## 📦 Database Schema

### Post

```prisma
model Post {
  id          String
  title       String
  slug        String @unique
  content     String
  excerpt     String?
  coverImage  String?
  category    String
  status      ContentStatus
  featured    Boolean
  publishDate DateTime?
  authorId    String
  author      User
  createdAt   DateTime
  updatedAt   DateTime
}
```

### Event

```prisma
model Event {
  id          String
  title       String
  slug        String @unique
  description String
  excerpt     String?
  eventDate   DateTime
  location    String?
  coverImage  String?
  category    String?
  status      ContentStatus
  featured    Boolean
  publishDate DateTime?
  authorId    String
  author      User
  createdAt   DateTime
  updatedAt   DateTime
}
```

### Announcement

```prisma
model Announcement {
  id          String
  title       String
  slug        String @unique
  content     String
  status      ContentStatus
  publishDate DateTime?
  authorId    String
  author      User
  createdAt   DateTime
  updatedAt   DateTime
}
```

---

## 🎓 Mở Rộng

### Thêm loại content mới

1. **Thêm model vào prisma/schema.prisma**
2. **Tạo validation schema trong lib/validation.ts**
3. **Tạo API routes trong app/api/content/{type}/**
4. **Tạo admin pages trong app/admin/content/{type}/**
5. **Dùng ContentEditorForm với type mới**

### Custom fields

Sửa ContentEditorForm props để thêm custom fields cho type cụ thể

---

## 🐛 Troubleshooting

**Lỗi: "Bài viết không tồn tại"**

- Check ID trong URL
- Verify user có quyền xem

**Lỗi: "Slug đã tồn tại"**

- Auto-append -1, -2, ... nếu trùng
- Hoặc chỉnh sửa slug thủ công

**Lỗi: "Không có quyền truy cập"**

- Đảm bảo đã đăng nhập
- Check role = "ADMIN"

---

## 📞 Support

Liên hệ: admin@daoduytung.edu.vn
