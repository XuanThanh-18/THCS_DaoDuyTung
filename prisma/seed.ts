const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.document.deleteMany();
  await prisma.event.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Dữ liệu cũ đã được xóa");

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@daoduytung.edu.vn",
      password: "admin123", // In production, use hashed password
      name: "Admin THCS Đào Duy Tùng",
      role: "ADMIN",
    },
  });

  console.log("✅ Tạo tài khoản admin:", adminUser.email);

  // Create Posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title:
          "Rộn ràng không khí chuẩn bị cho Lễ Khai Giảng năm học mới 2024 - 2025",
        slug: "le-khai-giang-nam-hoc-2024-2025",
        content:
          "Công tác chuẩn bị cho ngày tựu trường đang được thầy và trò nhà trường gấp rút hoàn thiện, hứa hẹn một năm học đầy thành công và hạnh phúc. Các phòng chức năng đang tích cực chuẩn bị sân trường, phòng học, trang thiết bị dạy học để đón tiếp học sinh quay trở lại.",
        excerpt:
          "Công tác chuẩn bị cho ngày tựu trường đang được thầy và trò nhà trường gấp rút hoàn thiện, hứa hẹn một năm học đầy thành công và hạnh phúc.",
        coverImage: "https://picsum.photos/seed/school1/800/600",
        category: "Sự kiện nổi bật",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: 'Triển lãm mỹ thuật "Ước mơ tuổi hồng" lần thứ V',
        slug: "trien-lam-my-thuat-uoc-mo-tuoi-hong-5",
        content:
          "Nơi hội tụ hơn 200 tác phẩm hội họa độc đáo do chính bàn tay tài hoa của các em học sinh THCS Đào Duy Tùng thể hiện. Sự kiện là dịp để giáo viên và học sinh được thể hiện khả năng sáng tạo, tĩnh cảm và tình yêu với mỹ thuật.",
        excerpt:
          "Nơi hội tụ hơn 200 tác phẩm hội họa độc đáo do chính bàn tay tài hoa của các em học sinh THCS Đào Duy Tùng thể hiện.",
        coverImage: "https://picsum.photos/seed/art/800/600",
        category: "Hoạt động",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: 'Dự án "Happy School": Giờ học hạnh phúc với Yoga & Mindfulness',
        slug: "du-an-happy-school-yoga-mindfulness",
        content:
          "Áp dụng các bài tập thư giãn tâm trí giúp học sinh giảm căng thẳng và tăng cường khả năng tập trung trong học tập. Các buổi yoga và mindfulness được tổ chức hàng tuần, tạo ra một môi trường học tập tích cực và lành mạnh.",
        excerpt:
          "Áp dụng các bài tập thư giãn tâm trí giúp học sinh giảm căng thẳng và tăng cường khả năng tập trung trong học tập.",
        coverImage: "https://picsum.photos/seed/yoga/800/600",
        category: "Hoạt động",
        published: true,
        authorId: adminUser.id,
      },
      {
        title:
          'Phát động phong trào "Quyên góp sách - Trao gửi yêu thương" cho học sinh vùng cao',
        slug: "phat-dong-quyen-gop-sach-trao-gui-yeu-thuong",
        content:
          "Chương trình ý nghĩa nhằm xây dựng tủ sách dùng chung và tặng sách cho các bạn học sinh có hoàn cảnh khó khăn tại vùng cao. Đây là cơ hội để h học sinh THCS Đào Duy Tùng thể hiện lòng nhân ái và trách nhiệm xã hội.",
        excerpt:
          "Chương trình ý nghĩa nhằm xây dựng tủ sách dùng chung và tặng sách cho các bạn học sinh có hoàn cảnh khó khăn tại vùng cao.",
        coverImage: "https://picsum.photos/seed/books/800/600",
        category: "Tin tức",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: "Lễ vinh danh học sinh tiêu biểu học kỳ 1 năm học 2023-2024",
        slug: "le-vinh-danh-hoc-sinh-tieu-bieu-2023-2024",
        content:
          "Tôn vinh những nỗ lực không ngừng nghỉ của thầy và trò trong suốt kỳ học vừa qua với nhiều giải thưởng cấp thành phố. Các em học sinh giỏi, học sinh tốt, học sinh có tiến bộ vượt bậc đều được công nhận và trao thưởng.",
        excerpt:
          "Tôn vinh những nỗ lực không ngừng nghỉ của thầy và trò trong suốt kỳ học vừa qua với nhiều giải thưởng cấp thành phố.",
        coverImage: "https://picsum.photos/seed/awards/800/600",
        category: "Thành tích",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: "Giải bóng đá nam học sinh chào mừng 26/3",
        slug: "giai-bong-da-nam-chao-mung-26-3",
        content:
          "Sân chơi sôi động gắn kết tinh thần đoàn kết giữa các khối lớp. Giải đấu được tổ chức để rèn luyện thể chất, phát triển kỹ năng bóng đá và xây dựng tinh thần đồng đội.",
        excerpt:
          "Sân chơi sôi động gắn kết tinh thần đoàn kết giữa các khối lớp.",
        coverImage: "https://picsum.photos/seed/football/800/600",
        category: "Hoạt động",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: "Hội thảo định hướng nghề nghiệp 4.0",
        slug: "hoi-thao-dinh-huong-nghe-nghiep-4-0",
        content:
          "Giúp học sinh khối 9 hiểu rõ về lộ trình học tập tương lai. Hội thảo có sự tham gia của các chuyên gia, nhà tuyển dụng từ các công ty lớn để giới thiệu về các ngành nghề tương lai.",
        excerpt: "Giúp học sinh khối 9 hiểu rõ về lộ trình học tập tương lai.",
        coverImage: "https://picsum.photos/seed/career/800/600",
        category: "Giáo dục",
        published: true,
        authorId: adminUser.id,
      },
    ],
  });

  console.log(`✅ Tạo ${posts.count} bài viết tin tức`);

  // Create Events
  const events = await prisma.event.createMany({
    data: [
      {
        title: "Hội trại truyền thống 2024",
        description:
          "Chương trình trải nghiệm kỹ năng sống và sinh hoạt tập thể lớn nhất năm với nhiều hoạt động ý nghĩa. Học sinh sẽ được tham gia các trò chơi, hoạt động rèn luyện kỹ năng sống như nấu ăn, cắm trại, định hướng.",
        date: new Date("2024-11-20"),
        location: "Khu sinh hoạt ngoài trời THCS Đào Duy Tùng",
        category: "Sự kiện lớn",
        coverImage: "https://picsum.photos/seed/camp/800/600",
      },
      {
        title: "Triển lãm sáng tạo STEM",
        description:
          "Nơi các nhà khoa học nhí trình bày những dự án nghiên cứu độc đáo và sáng tạo của mình. Triển lãm giới thiệu các công nghệ mới, các dự án khoa học thực tế từ các em học sinh.",
        date: new Date("2024-12-05"),
        location: "Hội trường THCS Đào Duy Tùng",
        category: "Khoa học công nghệ",
        coverImage: "https://picsum.photos/seed/stem/800/600",
      },
      {
        title: "Lễ trao giải học sinh giỏi",
        description:
          "Tôn vinh những học sinh xuất sắc trong năm học với nhiều phần thưởng giá trị. Lễ trao giải sẽ vinh danh các em học sinh đạt thành tích cao trong học tập, thi cấp thành phố và quốc gia.",
        date: new Date("2024-12-15"),
        location: "Sân vận động THCS Đào Duy Tùng",
        category: "Tôn tạo",
        coverImage: "https://picsum.photos/seed/ceremony/800/600",
      },
      {
        title: "Ngày hội gia đình-nhà trường",
        description:
          "Tổ chức các hoạt động gắn kết giữa phụ huynh, học sinh và giáo viên. Ngày hội bao gồm các trò chơi vui vẻ, giới thiệu kế hoạch giáo dục và trao đổi giữa nhà trường và phụ huynh.",
        date: new Date("2025-01-10"),
        location: "Sân trường THCS Đào Duy Tùng",
        category: "Cộng đồng",
        coverImage: "https://picsum.photos/seed/family/800/600",
      },
      {
        title: "Chương trình Tết Nguyên Đán 2025",
        description:
          "Chương trình đống chóc ý nghĩa đón mừng năm mới. Các em học sinh sẽ tham gia các hoạt động truyền thống như múa lân, lẵng gió, trò chơi dân gian.",
        date: new Date("2025-01-28"),
        location: "Hội trường THCS Đào Duy Tùng",
        category: "Văn hóa truyền thống",
        coverImage: "https://picsum.photos/seed/tet/800/600",
      },
    ],
  });

  console.log(`✅ Tạo ${events.count} sự kiện`);

  // Create Documents
  const documents = await prisma.document.createMany({
    data: [
      {
        title: "Kế hoạch giáo dục nhà trường năm học 2024 - 2025",
        description:
          "Bản kế hoạch chi tiết về các mục tiêu giáo dục, phương pháp dạy học và hoạt động ngoại khóa cho năm học 2024-2025.",
        fileUrl: "https://example.com/files/ke-hoach-giao-duc-2024-2025.pdf",
        fileType: "PDF",
        category: "Hành chính",
      },
      {
        title: "Nội quy học sinh và Quy tắc ứng xử học đường",
        description:
          "Bản nội quy chi tiết cho học sinh và quy tắc ứng xử tại nhà trường.",
        fileUrl: "https://example.com/files/noi-quy-hoc-sinh.pdf",
        fileType: "PDF",
        category: "Nội quy",
      },
      {
        title: "Mẫu đơn xin nghỉ học dành cho học sinh",
        description: "Mẫu đơn chuẩn để học sinh hoặc phụ huynh xin nghỉ học.",
        fileUrl: "https://example.com/files/mau-don-xin-nghi.docx",
        fileType: "DOCX",
        category: "Biểu mẫu",
      },
      {
        title: "Hướng dẫn ôn tập học kỳ I các môn văn hóa",
        description:
          "Hướng dẫn ôn tập từng môn học để chuẩn bị cho kỳ thi học kỳ I.",
        fileUrl: "https://example.com/files/huong-dan-on-tap-hk1.pdf",
        fileType: "PDF",
        category: "Học tập",
      },
      {
        title: "Thời khóa biểu năm học 2024 - 2025",
        description:
          "Lịch học chi tiết của các khối lớp trong năm học 2024-2025.",
        fileUrl: "https://example.com/files/thoi-khoa-bieu-2024-2025.pdf",
        fileType: "PDF",
        category: "Hành chính",
      },
      {
        title: "Hướng dẫn an toàn giao thông cho học sinh",
        description:
          "Tài liệu hướng dẫn các quy tắc an toàn giao thông cho học sinh.",
        fileUrl: "https://example.com/files/an-toan-giao-thong.pdf",
        fileType: "PDF",
        category: "An toàn",
      },
      {
        title: "Danh sách công ty tuyển dụng thực tập",
        description:
          "Danh sách các công ty, doanh nghiệp nhận thực tập sinh từ nhà trường.",
        fileUrl: "https://example.com/files/danh-sach-cong-ty.xlsx",
        fileType: "XLSX",
        category: "Thực tập việc làm",
      },
      {
        title: "Chính sách học bổng và hỗ trợ tài chính",
        description:
          "Thông tin về các chương trình học bổng và hỗ trợ tài chính cho học sinh có hoàn cảnh khó khăn.",
        fileUrl: "https://example.com/files/hoc-bong-ho-tro.pdf",
        fileType: "PDF",
        category: "Tài chính",
      },
    ],
  });

  console.log(`✅ Tạo ${documents.count} tài liệu`);

  console.log("\n✅ Hoàn tất quá trình seed dữ liệu!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
