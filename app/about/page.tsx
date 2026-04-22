import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Quote, Award, Users, BookOpen, Home } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/about-hero/1920/1080"
            alt="About Hero"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-white border border-primary/20 backdrop-blur-md font-body text-sm tracking-widest uppercase mb-4">
            Thành lập ngày 26/8/2025
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-6 tracking-tight">
            Thực Học - Thực Làm - Thực Giá Trị
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Trường THCS Đào Duy Tùng - Nơi thắp sáng niềm tin và gieo mầm khát
            vọng tại xã Đông Anh, Hà Nội.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl z-10 relative">
              <img
                src="https://picsum.photos/seed/history/800/1000"
                alt="School History"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full -z-10 blur-3xl"></div>
          </div>
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-tertiary font-bold mb-4">
              <div className="w-12 h-1 bg-tertiary"></div>
              <span className="font-body tracking-widest uppercase text-sm">
                Lịch sử hình thành
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 text-on-surface">
              Mốc son lịch sử giáo dục xã Đông Anh
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
              <p>
                Ngày 26/8/2025 đánh dấu một cột mốc quan trọng với sự ra đời của
                Trường THCS Đào Duy Tùng – ngôi trường công lập được xây dựng
                theo mô hình định hướng Chất lượng cao tại Xã Đông Anh, Thành
                phố Hà Nội. Trường có địa chỉ tại thôn Đài Bi, xã Đông Anh với
                diện tích 7.567 m².
              </p>

              <p>
                Ngôi trường vinh dự được mang tên nhà chí sĩ yêu nước{" "}
                <span className="font-bold">Đào Duy Tùng</span> – một tấm gương
                sáng về lòng yêu nước và tinh thần kiên cường – là niềm tự hào
                và động lực để thầy trò phấn đấu xây dựng một môi trường giáo
                dục hiện đại, nhân văn và giàu bản sắc.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-surface-container-low rounded-xl border border-primary/20">
                  <h4 className="text-primary font-bold text-3xl mb-2 font-headline">
                    26/8/2025
                  </h4>
                  <p className="text-sm">
                    Ngày thành lập Trường THCS Đào Duy Tùng mô hình Chất lượng
                    cao.
                  </p>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border border-secondary/20">
                  <h4 className="text-secondary font-bold text-3xl mb-2 font-headline">
                    10/10/2025
                  </h4>
                  <p className="text-sm">
                    Lễ khánh thành trường trong không khí trang trọng, khẳng
                    định vị thế giáo dục chất lượng cao.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-surface-container-high relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-12 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm">
              <h3 className="text-3xl font-headline font-bold mb-6 text-tertiary">
                Sứ Mệnh
              </h3>
              <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                <span className="font-bold">
                  "Thắp sáng niềm tin – Gieo mầm khát vọng"
                </span>{" "}
                – Nơi dạy chữ, dạy người, nuôi dưỡng những ước mơ, bồi đắp tinh
                thần hiếu học, rèn luyện bản lĩnh và sáng tạo cho các em học
                sinh.
              </p>
            </div>
            <div className="p-12 bg-secondary text-white rounded-2xl shadow-xl transform translate-y-8">
              <h3 className="text-3xl font-headline font-bold mb-6">
                Tôn Chỉ Hoạt Động
              </h3>
              <p className="opacity-90 text-lg leading-relaxed font-body">
                <span className="font-bold">
                  "Thực học - Thực làm - Thực giá trị"
                </span>{" "}
                – Xây dựng môi trường học tập thân thiện, đổi mới, sáng tạo,
                khơi dậy khát vọng, nuôi dưỡng đam mê và lan tỏa tinh thần nhân
                ái.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cơ Sở Vật Chất */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-tertiary font-bold mb-4">
            <div className="w-12 h-1 bg-tertiary"></div>
            <span className="font-body tracking-widest uppercase text-sm">
              Cơ Sở Vật Chất
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
            Trang Thiết Bị Hiện Đại Đạt Chuẩn Quốc Gia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="p-8 bg-surface-container-low rounded-2xl border border-primary/10 hover:border-primary/30 transition-all">
            <Home size={40} className="text-primary mb-4" />
            <h3 className="text-xl font-headline font-bold mb-4 text-on-surface">
              Quy Mô Khối Học
            </h3>
            <ul className="space-y-2 text-on-surface-variant font-body text-sm">
              <li>✓ 20 lớp học với sức chứa 800 học sinh</li>
              <li>✓ 05 phòng học văn hóa mỗi tầng</li>
              <li>✓ 01 phòng nghỉ giáo viên</li>
              <li>✓ 02 khu vệ sinh nam, nữ riêng biệt</li>
            </ul>
          </div>

          <div className="p-8 bg-surface-container-low rounded-2xl border border-secondary/10 hover:border-secondary/30 transition-all">
            <BookOpen size={40} className="text-secondary mb-4" />
            <h3 className="text-xl font-headline font-bold mb-4 text-on-surface">
              Phòng Học Bộ Môn
            </h3>
            <ul className="space-y-2 text-on-surface-variant font-body text-sm">
              <li>✓ 12 Phòng học bộ môn</li>
              <li>✓ Phục vụ giảng dạy tất cả môn học</li>
              <li>✓ Trang bị đầy đủ thiết bị giảng dạy</li>
              <li>✓ Không gian học tập hiện đại</li>
            </ul>
          </div>

          <div className="p-8 bg-surface-container-low rounded-2xl border border-tertiary/10 hover:border-tertiary/30 transition-all">
            <Award size={40} className="text-tertiary mb-4" />
            <h3 className="text-xl font-headline font-bold mb-4 text-on-surface">
              Khối Đa Năng
            </h3>
            <ul className="space-y-2 text-on-surface-variant font-body text-sm">
              <li>✓ Diện tích 810 m²</li>
              <li>✓ Tầng 1-2: 3,9m, Sàn thi đấu: 10,8m</li>
              <li>✓ Phục vụ hoạt động thể thao</li>
              <li>✓ Sự kiện, sân khấu ngoài trời</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Đội Ngũ CBGVNV */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-surface-container-low rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-tertiary font-bold mb-4">
              <div className="w-12 h-1 bg-tertiary"></div>
              <span className="font-body tracking-widest uppercase text-sm">
                Đội Ngũ
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 text-on-surface">
              Các Cán Bộ, Giáo Viên Tâm Huyết
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed font-body mb-6">
              Trường THCS Đào Duy Tùng được hỗ trợ bởi một đội ngũ cán bộ, giáo
              viên, nhân viên có tay nghề cao và đức hiến thúc, luôn sẵn sàng
              phục vụ sự phát triển toàn diện của các em học sinh.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-4xl font-bold text-primary mb-2 font-headline">
                42
              </p>
              <p className="text-sm font-body text-on-surface-variant">
                Tổng số CBGVNV
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-4xl font-bold text-secondary mb-2 font-headline">
                31
              </p>
              <p className="text-sm font-body text-on-surface-variant">
                Tổng số Giáo Viên
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-4xl font-bold text-tertiary mb-2 font-headline">
                2
              </p>
              <p className="text-sm font-body text-on-surface-variant">
                Cán Bộ Quản Lý
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <p className="text-4xl font-bold text-green-600 mb-2 font-headline">
                9
              </p>
              <p className="text-sm font-body text-on-surface-variant">
                Nhân Viên Hành Chính
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-white rounded-2xl border-l-4 border-primary">
          <p className="text-on-surface font-body text-lg">
            <span className="font-bold">Tổng số học sinh:</span> 615 HS phân bổ
            về 16 lớp, luôn nhận được sự chăm sóc chu đáo từ toàn thể đội ngũ
            nhà trường.
          </p>
        </div>
      </section>

      {/* Sự Ủng Hộ Từ Gia Đình Đào Duy Tùng */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-tertiary font-bold mb-4">
            <div className="w-12 h-1 bg-tertiary"></div>
            <span className="font-body tracking-widest uppercase text-sm">
              Sự Ủng Hộ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
            Hỗ Trợ Từ Gia Đình Đào Duy Tùng
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border-l-4 border-primary">
              <h3 className="font-bold text-on-surface mb-3 text-lg">
                Ngay Từ Khi Thành Lập
              </h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Trường luôn nhận được sự quan tâm, giúp đỡ, tạo điều kiện về cả
                vật chất lẫn tinh thần của gia đình cụ Đào Duy Tùng.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-secondary/10 to-tertiary/10 rounded-xl border-l-4 border-secondary">
              <h3 className="font-bold text-on-surface mb-3 text-lg">
                Tiến Sĩ Đào Duy Quát
              </h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Nguyên Phó Trưởng ban Thường trực Ban Tư tưởng Văn hóa Trung
                ương, con trai của đồng chí Đào Duy Tùng, luôn ủng hộ sâu sắc
                nhà trường.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-tertiary/10 to-green-500/10 rounded-xl border-l-4 border-tertiary">
              <h3 className="font-bold text-on-surface mb-3 text-lg">
                Quỹ Khuyến Học Đào Duy Tùng
              </h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Tại lễ khánh thành, gia đình trao học bổng cho 51 HS có hoàn
                cảnh khó khăn, đạt thành tích xuất sắc trong học tập.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white rounded-2xl shadow-lg border-t-4 border-primary">
              <h3 className="text-2xl font-headline font-bold mb-4 text-on-surface">
                Xuân Bính Ngọ 2026
              </h3>
              <p className="text-on-surface-variant font-body leading-relaxed mb-4">
                Nhà trường vinh dự đón tiếp bác Đào Duy Quát cùng gia đình ghé
                thăm và trao tặng hơn{" "}
                <span className="font-bold text-primary">
                  15.000 đầu sách quý
                </span>
                .
              </p>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Với những chia sẻ chân thành về sự nghiệp trồng người, thầy và
                trò nhà trường đều được truyền cảm hứng cùng nguồn động lực to
                lớn, thêm vững lòng tin vào sứ mệnh "Thực học - Thực làm - Thực
                giá trị".
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
              <p className="text-on-surface font-body italic leading-relaxed">
                "Từng lời chia sẻ, động viên ấm áp, từng cuốn sách bổ ích làm
                phong phú thêm tủ sách của các em học sinh... những món quà ấy
                đều mang ý nghĩa tinh thần vô giá mà Tiến sĩ cùng gia đình gửi
                gắm."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thành Tích */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-surface-container-high rounded-3xl">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-tertiary font-bold mb-4">
            <div className="w-12 h-1 bg-tertiary"></div>
            <span className="font-body tracking-widest uppercase text-sm">
              Thành Tích
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
            Những Bước Đi Đầu Tiên Đầy Ý Nghĩa
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-headline font-bold mb-6 text-secondary">
              Thành Tích Của Giáo Viên
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Award size={20} className="text-primary flex-shrink-0 mt-1" />
                <p className="text-on-surface-variant font-body">
                  <span className="font-bold">Cô Nguyễn Thị Thanh Thuỷ</span> -
                  Phó Hiệu trưởng được Thủ tướng Chính phủ tặng bằng khen
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Award
                  size={20}
                  className="text-secondary flex-shrink-0 mt-1"
                />
                <p className="text-on-surface-variant font-body">
                  <span className="font-bold">Cô Nguyễn Thị Lan</span> và{" "}
                  <span className="font-bold">Cô Nguyễn Thị Bích Thành</span>{" "}
                  được CT UBND TP tặng bằng khen
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Award size={20} className="text-tertiary flex-shrink-0 mt-1" />
                <p className="text-on-surface-variant font-body">
                  Các giáo viên đạt giải Nhất, Nhì, Kỳ trong hội thi Giáo Viên
                  Dạy Giỏi cấp xã
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Award
                  size={20}
                  className="text-green-600 flex-shrink-0 mt-1"
                />
                <p className="text-on-surface-variant font-body">
                  Đạt giải Nhì trong cuộc thi hướng dẫn học sinh thi Nghiên cứu
                  khoa học cấp xã
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-headline font-bold mb-6 text-primary">
              Thành Tích Của Học Sinh
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users size={20} className="text-primary flex-shrink-0 mt-1" />
                <p className="text-on-surface-variant font-body">
                  Đạt các giải Nhì, Ba, Kỳ trong Kì thi Học Sinh Giỏi các môn
                  văn hóa khối 9
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users
                  size={20}
                  className="text-secondary flex-shrink-0 mt-1"
                />
                <p className="text-on-surface-variant font-body">
                  Đạt giải thi toán quốc tế{" "}
                  <span className="font-bold">TIMO</span> (Thai International
                  Mathematical Olympiad)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users size={20} className="text-tertiary flex-shrink-0 mt-1" />
                <p className="text-on-surface-variant font-body">
                  Đạt giải Nhì thi Nghiên cứu khoa học cấp xã
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users
                  size={20}
                  className="text-green-600 flex-shrink-0 mt-1"
                />
                <p className="text-on-surface-variant font-body">
                  Học kỳ I năm học 2025-2026: Nhiều chuyển biến tích cực trong
                  từng giờ dạy, từng lớp học
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
          <p className="text-on-surface font-body text-lg leading-relaxed">
            Những kết quả bước đầu trong học kỳ I chính là nền tảng để thầy và
            trò tiếp tục nỗ lực, tự tin bước vào học kỳ II với quyết tâm và niềm
            tin mới.{" "}
            <span className="font-bold">
              Mỗi ngày đến trường là một ngày vui, giàu sáng tạo và khát vọng
              vươn lên.
            </span>
          </p>
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch editorial-shadow">
          <div className="md:w-1/3 relative min-h-[400px]">
            <img
              src="https://picsum.photos/seed/principal/600/800"
              alt="Principal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-12 md:p-20 flex flex-col justify-center">
            <Quote size={48} className="text-primary opacity-20 mb-4" />
            <h2 className="text-3xl font-headline font-bold mb-8 italic">
              "Giáo dục không phải là việc đổ đầy một cái bình, mà là thắp sáng
              một ngọn lửa."
            </h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed font-body">
              Tại THCS Đào Duy Tùng, chúng tôi tin rằng mỗi đứa trẻ là một hạt
              mầm tiềm năng. Nhiệm vụ của chúng tôi là tạo ra mảnh đất màu mỡ và
              ánh sáng phù hợp để các em tự tin nở hoa theo cách riêng của mình.
            </p>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed font-body">
              Với tôn chỉ "Thực học - Thực làm - Thực giá trị", chúng tôi cam
              kết xây dựng một môi trường học tập nơi mỗi học sinh không chỉ
              tiếp nhận kiến thức mà còn phát triển kỹ năng sống, rèn luyện bản
              lĩnh và tôn trọng giá trị của bản thân. Chào mừng các bậc phụ
              huynh và học sinh đến với gia đình Đào Duy Tùng.
            </p>
            <div>
              <p className="font-bold text-xl text-on-surface font-headline">
                Hiệu Trưởng Nhà Trường
              </p>
              <p className="text-primary font-medium font-body">
                Trường THCS Đào Duy Tùng
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
