import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-headline font-bold text-on-surface mb-6">Liên hệ với chúng tôi</h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg font-body">
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của quý phụ huynh và học sinh.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2">Địa chỉ</h3>
                  <p className="text-on-surface-variant font-body">Cổ Loa, Đông Anh, Hà Nội, Việt Nam</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2">Email</h3>
                  <p className="text-on-surface-variant font-body">thcsdaoduytung@hanoi.edu.vn</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2">Điện thoại</h3>
                  <p className="text-on-surface-variant font-body">Hotline: 024.3XXX.XXXX</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-80 bg-slate-200 rounded-3xl overflow-hidden grayscale">
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-body">
                Google Maps Integration Placeholder
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl editorial-shadow">
            <h3 className="text-2xl font-headline font-bold mb-8">Gửi tin nhắn cho nhà trường</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface font-body">Họ và tên</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface font-body">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface font-body">Chủ đề</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body"
                  placeholder="Hỏi về thủ tục nhập học"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface font-body">Nội dung</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                ></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
                Gửi tin nhắn <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
