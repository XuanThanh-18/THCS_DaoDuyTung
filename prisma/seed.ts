// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seed database...");

  // Tạo admin user
  const hashedPassword = await bcrypt.hash("Admin@123456", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@daoduytung.edu.vn" },
    update: {},
    create: {
      email: "admin@daoduytung.edu.vn",
      password: hashedPassword,
      name: "Quản trị viên",
      role: "SUPERADMIN",
    },
  });

  console.log(`✅ Admin user: ${admin.email}`);

  // Tạo bài viết mẫu
  const post = await prisma.post.upsert({
    where: { slug: "chao-mung-nam-hoc-moi" },
    update: {},
    create: {
      title: "Chào mừng năm học mới 2024-2025",
      slug: "chao-mung-nam-hoc-moi",
      content:
        "Trường THCS Đào Duy Tùng trân trọng chào đón toàn thể học sinh, phụ huynh và giáo viên bước vào năm học mới 2024-2025 với nhiều kỳ vọng và hoài bão...",
      excerpt: "Chào mừng năm học mới với nhiều hoạt động phong phú.",
      category: "Tin tức",
      status: "PUBLISHED",
      featured: true,
      publishDate: new Date(),
      authorId: admin.id,
    },
  });

  console.log(`✅ Post mẫu: ${post.title}`);

  // Tạo sự kiện mẫu
  const event = await prisma.event.upsert({
    where: { slug: "le-khai-giang-2024" },
    update: {},
    create: {
      title: "Lễ Khai Giảng Năm Học 2024-2025",
      slug: "le-khai-giang-2024",
      description:
        "Lễ khai giảng năm học mới được tổ chức long trọng tại sân trường với sự tham dự của toàn thể học sinh, giáo viên và phụ huynh.",
      category: "Lễ kỷ niệm",
      status: "PUBLISHED",
      featured: true,
      eventDate: new Date("2024-09-05T07:30:00"),
      location: "Sân trường THCS Đào Duy Tùng",
      publishDate: new Date(),
      authorId: admin.id,
    },
  });

  console.log(`✅ Event mẫu: ${event.title}`);

  // Tạo thông báo mẫu
  const announcement = await prisma.announcement.upsert({
    where: { slug: "lich-tuu-truong-nam-hoc-moi" },
    update: {},
    create: {
      title: "Lịch tựu trường năm học 2024-2025",
      slug: "lich-tuu-truong-nam-hoc-moi",
      content:
        "Nhà trường thông báo lịch tựu trường chính thức: Học sinh lớp 6 tựu trường ngày 02/09/2024. Học sinh các khối còn lại tựu trường ngày 03/09/2024.",
      status: "PUBLISHED",
      priority: 1,
      publishDate: new Date(),
      authorId: admin.id,
    },
  });

  console.log(`✅ Announcement mẫu: ${announcement.title}`);

  console.log("\n🎉 Seed hoàn thành!");
  console.log("─────────────────────────────");
  console.log("📧 Email:    admin@daoduytung.edu.vn");
  console.log("🔑 Password: Admin@123456");
  console.log("─────────────────────────────");
  console.log("⚠️  Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!");
}

main()
  .catch((e) => {
    console.error("❌ Seed thất bại:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
