// prisma/seed.ts — FIXED VERSION
// Fix: Dùng import thay vì require để tương thích ESM
// Fix: Seed tạo admin@test.com như yêu cầu
// Chạy: npx tsx prisma/seed.ts
// Hoặc: npm run seed (sau khi sửa package.json script)

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seed database...\n");

  // ── Admin accounts ──────────────────────────────────────
  const admins = [
    {
      email: "admin@daoduytung.edu.vn",
      password: "admin123456",
      name: "Admin THCS Đào Duy Tùng",
      role: "SUPERADMIN" as const,
    },
    {
      // Account test theo yêu cầu
      email: "admin@test.com",
      password: "123456",
      name: "Test Admin",
      role: "ADMIN" as const,
    },
  ];

  for (const admin of admins) {
    const existing = await prisma.user.findUnique({
      where: { email: admin.email },
    });

    if (existing) {
      console.log(`⏭️  User đã tồn tại: ${admin.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const user = await prisma.user.create({
      data: {
        email: admin.email,
        password: hashedPassword,
        name: admin.name,
        role: admin.role,
      },
    });

    console.log(`✅ Tạo user: ${user.email} (${user.role})`);
  }

  // ── Sample Posts ─────────────────────────────────────────
  const superAdmin = await prisma.user.findUnique({
    where: { email: "admin@daoduytung.edu.vn" },
  });

  if (!superAdmin) {
    console.error("❌ Không tìm thấy super admin để tạo sample data");
    return;
  }

  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.createMany({
      data: [
        {
          title: "Chào mừng năm học mới 2025-2026",
          slug: "chao-mung-nam-hoc-moi-2025-2026",
          content:
            "Nhà trường xin nhiệt liệt chào mừng tất cả giáo viên, học sinh và phụ huynh bước vào năm học mới 2025-2026 với nhiều kỳ vọng và mục tiêu mới.",
          excerpt:
            "Chào mừng năm học mới với nhiều hoạt động phong phú và ý nghĩa.",
          category: "Thông tin nhà trường",
          status: "PUBLISHED",
          featured: true,
          publishDate: new Date(),
          authorId: superAdmin.id,
        },
        {
          title: "Kết quả thi học kỳ I năm học 2024-2025",
          slug: "ket-qua-thi-hoc-ky-i-2024-2025",
          content:
            "Nhà trường thông báo kết quả thi học kỳ I năm học 2024-2025. Nhìn chung các em học sinh đã đạt được kết quả tốt.",
          excerpt:
            "Kết quả thi học kỳ I với nhiều học sinh đạt thành tích xuất sắc.",
          category: "Học tập",
          status: "PUBLISHED",
          featured: false,
          publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          authorId: superAdmin.id,
        },
      ],
    });
    console.log("✅ Tạo 2 bài viết mẫu");
  } else {
    console.log(`⏭️  Bỏ qua tạo posts (đã có ${postCount} bài)`);
  }

  // ── Sample Announcements ──────────────────────────────────
  const annCount = await prisma.announcement.count();
  if (annCount === 0) {
    await prisma.announcement.createMany({
      data: [
        {
          title: "Lịch nghỉ Tết Nguyên Đán 2025",
          slug: "lich-nghi-tet-nguyen-dan-2025",
          content:
            "Nhà trường thông báo lịch nghỉ Tết Nguyên Đán từ ngày 25/01/2025 đến 05/02/2025. Học sinh đi học lại từ ngày 06/02/2025.",
          status: "PUBLISHED",
          priority: 10,
          publishDate: new Date(),
          expiryDate: new Date("2025-02-10"),
          authorId: superAdmin.id,
        },
      ],
    });
    console.log("✅ Tạo 1 thông báo mẫu");
  } else {
    console.log(`⏭️  Bỏ qua tạo announcements (đã có ${annCount})`);
  }

  // ── Sample Events ─────────────────────────────────────────
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    await prisma.event.createMany({
      data: [
        {
          title: "Lễ khai giảng năm học 2025-2026",
          slug: "le-khai-giang-2025-2026",
          description:
            "Lễ khai giảng năm học mới sẽ được tổ chức tại sân trường với sự tham dự của toàn thể giáo viên, học sinh và phụ huynh.",
          excerpt: "Lễ khai giảng trang trọng đánh dấu năm học mới.",
          category: "Sự kiện nhà trường",
          status: "PUBLISHED",
          featured: true,
          eventDate: new Date("2025-09-05"),
          location: "Sân trường THCS Đào Duy Tùng",
          publishDate: new Date(),
          authorId: superAdmin.id,
        },
      ],
    });
    console.log("✅ Tạo 1 sự kiện mẫu");
  } else {
    console.log(`⏭️  Bỏ qua tạo events (đã có ${eventCount})`);
  }

  console.log("\n🎉 Seed hoàn tất!");
  console.log("─────────────────────────────────────");
  console.log("📧 Admin chính: admin@daoduytung.edu.vn / admin123456");
  console.log("📧 Admin test:  admin@test.com / 123456");
  console.log("🔗 Login tại:   http://localhost:3000/admin/login");
}

main()
  .catch((e) => {
    console.error("❌ Seed thất bại:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
