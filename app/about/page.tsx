import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Quote } from 'lucide-react';

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
            Established 1994
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-6 tracking-tight">Khai Phóng & Sáng Tạo</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Nurturing excellence through tradition and innovation at THCS Đào Duy Tùng.
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
              <span className="font-body tracking-widest uppercase text-sm">Our Heritage</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 text-on-surface">Ba thập kỷ kiến tạo những giá trị bền vững</h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
              <p>Được thành lập từ những năm 1994, THCS Đào Duy Tùng đã trải qua một hành trình dài đầy tự hào. Từ những ngày đầu khó khăn với cơ sở vật chất đơn sơ, nhà trường đã không ngừng vươn mình để trở thành điểm sáng của giáo dục khu vực.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-surface-container-low rounded-xl">
                  <h4 className="text-primary font-bold text-3xl mb-2 font-headline">1994</h4>
                  <p className="text-sm">Ngày thành lập trường với khóa học đầu tiên gồm 120 học sinh.</p>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl">
                  <h4 className="text-secondary font-bold text-3xl mb-2 font-headline">2015</h4>
                  <p className="text-sm">Đạt chuẩn Quốc gia mức độ 2 và đầu tư trang thiết bị hiện đại.</p>
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
              <h3 className="text-3xl font-headline font-bold mb-6 text-secondary">Tầm Nhìn</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                Trở thành biểu tượng của sự "Hạnh Phúc" trong giáo dục, nơi mỗi học sinh được tôn trọng sự khác biệt và phát triển toàn diện cả về trí tuệ, tâm hồn và thể chất.
              </p>
            </div>
            <div className="p-12 bg-secondary text-white rounded-2xl shadow-xl transform translate-y-8">
              <h3 className="text-3xl font-headline font-bold mb-6">Sứ Mệnh</h3>
              <p className="opacity-90 text-lg leading-relaxed font-body">
                Kiến tạo môi trường học tập hiện đại, kết hợp giữa tri thức hàn lâm và kỹ năng thực tiễn, giúp học sinh sẵn sàng hội nhập toàn cầu nhưng vẫn giữ vững bản sắc dân tộc.
              </p>
            </div>
          </div>
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
            <h2 className="text-3xl font-headline font-bold mb-8 italic">"Giáo dục không phải là việc đổ đầy một cái bình, mà là thắp sáng một ngọn lửa."</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed font-body">
              Tại THCS Đào Duy Tùng, chúng tôi tin rằng mỗi đứa trẻ là một hạt mầm tiềm năng. Nhiệm vụ của chúng tôi là tạo ra mảnh đất màu mỡ và ánh sáng phù hợp để các em tự tin nở hoa theo cách riêng của mình. Chào mừng các bậc phụ huynh và học sinh đến với gia đình Đào Duy Tùng.
            </p>
            <div>
              <p className="font-bold text-xl text-on-surface font-headline">Nhà giáo Ưu tú Nguyễn Văn A</p>
              <p className="text-primary font-medium font-body">Hiệu trưởng Nhà trường</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
