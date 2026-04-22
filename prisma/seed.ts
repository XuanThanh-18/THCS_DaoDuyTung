const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Bắt đầu seed dữ liệu...");

  /**
   * Xóa dữ liệu cũ theo thứ tự tránh lỗi foreign key
   */
  await prisma.announcement.deleteMany();
  await prisma.document.deleteMany();
  await prisma.event.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Đã xóa dữ liệu cũ");

  /**
   * Tạo tài khoản Admin
   */
  const hashedPassword = await bcrypt.hash("admin123456", 10);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@daoduytung.edu.vn",
      password: hashedPassword,
      name: "Admin THCS Đào Duy Tùng",
      role: "ADMIN",
    },
  });

  console.log("✅ Tạo admin:");
  console.log("📧 admin@daoduytung.edu.vn");
  console.log("🔑 admin123456");

  /**
   * Tạo bài viết / tin tức
   */
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "Lễ Khai Giảng năm học 2024 - 2025",
        slug: "le-khai-giang-2024-2025",
        content:
          "Công tác chuẩn bị cho ngày tựu trường đang được thầy và trò nhà trường gấp rút hoàn thiện, hứa hẹn một năm học đầy thành công và hạnh phúc.",
        excerpt: "Chuẩn bị cho ngày tựu trường năm học mới.",
        coverImage: "https://picsum.photos/seed/school1/800/600",
        category: "Sự kiện nổi bật",
        status: "PUBLISHED",
        featured: true,
        publishDate: new Date("2024-09-01"),
        authorId: adminUser.id,
      },
      {
        title: 'Triển lãm mỹ thuật "Ước mơ tuổi hồng" lần thứ V',
        slug: "trien-lam-my-thuat-uoc-mo-tuoi-hong-5",
        content:
          "Nơi hội tụ hơn 200 tác phẩm hội họa độc đáo do chính bàn tay tài hoa của các em học sinh THCS Đào Duy Tùng thể hiện.",
        excerpt: "Triển lãm sáng tạo của học sinh.",
        coverImage: "https://picsum.photos/seed/art/800/600",
        category: "Hoạt động",
        status: "PUBLISHED",
        featured: false,
        publishDate: new Date("2024-10-15"),
        authorId: adminUser.id,
      },
      {
        title: "Giải bóng đá nam học sinh chào mừng 26/3",
        slug: "giai-bong-da-nam-chao-mung-26-3",
        content:
          "Sân chơi sôi động gắn kết tinh thần đoàn kết giữa các khối lớp.",
        excerpt: "Giải đấu thể thao học sinh.",
        coverImage: "https://picsum.photos/seed/football/800/600",
        category: "Thể thao",
        status: "PUBLISHED",
        featured: true,
        publishDate: new Date("2025-03-20"),
        authorId: adminUser.id,
      },
    ],
  });

  console.log(`✅ Tạo ${posts.count} bài viết`);

  /**
   * Tạo sự kiện
   */
  const events = await prisma.event.createMany({
    data: [
      {
        title: "Hội trại truyền thống 2024",
        slug: "hoi-trai-truyen-thong-2024",
        description:
          "Chương trình trải nghiệm kỹ năng sống và sinh hoạt tập thể lớn nhất năm.",
        excerpt: "Sự kiện trải nghiệm lớn nhất năm.",
        eventDate: new Date("2024-11-20"),
        location: "Sân trường THCS Đào Duy Tùng",
        category: "Sự kiện lớn",
        coverImage: "https://picsum.photos/seed/camp/800/600",
        status: "PUBLISHED",
        featured: true,
        publishDate: new Date("2024-10-01"),
        authorId: adminUser.id,
      },
      {
        title: "Lễ trao giải học sinh giỏi",
        slug: "le-trao-giai-hoc-sinh-gioi",
        description:
          "Tôn vinh những học sinh xuất sắc trong năm học với nhiều phần thưởng.",
        excerpt: "Vinh danh học sinh xuất sắc.",
        eventDate: new Date("2024-12-15"),
        location: "Hội trường THCS Đào Duy Tùng",
        category: "Thành tích",
        coverImage: "https://picsum.photos/seed/award/800/600",
        status: "PUBLISHED",
        featured: true,
        publishDate: new Date("2024-11-01"),
        authorId: adminUser.id,
      },
    ],
  });

  console.log(`✅ Tạo ${events.count} sự kiện`);

  /**
   * Tạo thông báo
   */
  const announcements = await prisma.announcement.createMany({
    data: [
      {
        title: "Thông báo hạn cuối nộp học phí",
        slug: "thong-bao-han-nop-hoc-phi",
        content: "Hạn cuối nộp học phí học kỳ I là ngày 30/11/2024.",
        status: "PUBLISHED",
        publishDate: new Date("2024-11-01"),
        authorId: adminUser.id,
      },
      {
        title: "Thông báo lịch thi học kỳ I",
        slug: "thong-bao-lich-thi-hoc-ky-1",
        content: "Lịch thi học kỳ I bắt đầu từ ngày 15/12/2024.",
        status: "PUBLISHED",
        publishDate: new Date("2024-11-20"),
        authorId: adminUser.id,
      },
    ],
  });

  console.log(`✅ Tạo ${announcements.count} thông báo`);

  const documents = await prisma.document.createMany({
    data: [
      {
        title: "Nội quy học sinh",
        description: "Quy định chung dành cho học sinh toàn trường.",
        fileUrl: "https://example.com/files/noi-quy-hoc-sinh.pdf",
        fileType: "PDF",
        category: "Nội quy",
      },
      {
        title: "Thời khóa biểu năm học 2024 - 2025",
        description: "Lịch học chi tiết toàn trường.",
        fileUrl: "https://example.com/files/thoi-khoa-bieu.pdf",
        fileType: "PDF",
        category: "Hành chính",
      },
      {
        title: "Mẫu đơn xin nghỉ học",
        description: "Dành cho học sinh và phụ huynh.",
        fileUrl: "https://example.com/files/don-xin-nghi.docx",
        fileType: "DOCX",
        category: "Biểu mẫu",
      },
    ],
  });

  console.log(`✅ Tạo ${documents.count} tài liệu`);

  console.log("🎉 Seed dữ liệu hoàn tất!");
}

main()
  .catch((error) => {
    console.error("❌ Seed lỗi:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
