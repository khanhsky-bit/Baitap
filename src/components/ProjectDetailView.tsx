import React from 'react';
import { ArrowLeft, ArrowRight, CheckSquare, Square, Copy, Check } from 'lucide-react';
import { PortfolioImage } from './PortfolioImage';
import { BAI6_CHECKLIST, StudentProfile } from '../data/portfolioData';

interface ProjectDetailViewProps {
  projectId: string;
  profile: StudentProfile;
  onNavigate: (page: string) => void;
  onExpandImage: (src: string, alt: string, caption?: string) => void;
  bai6Checks: Record<string, boolean>;
  onToggleBai6Check: (key: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  projectId,
  profile,
  onNavigate,
  onExpandImage,
  bai6Checks,
  onToggleBai6Check,
}) => {
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  if (projectId === 'bai1') {
    return (
      <article className="space-y-8">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-2">
            <span className="font-semibold text-blue-700">Bài 1</span>
            <span aria-hidden="true">·</span>
            <span>Chương 1: Máy tính và các thiết bị ngoại vi</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code">Điểm tối đa: 0,5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Bài 1: Thao tác cơ bản với tệp tin và thư mục
          </h1>
          <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Dự án</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bai2')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Bài 2: Tìm kiếm học thuật</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">a) Mục tiêu bài tập</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Yêu cầu của bài tập:</strong> Thực hành thành thạo việc tạo, đổi tên, sao chép, di chuyển và xóa tệp tin, thư mục trên hệ điều hành Windows (có thể áp dụng tương tự cho macOS/Linux), sau đó thiết lập cấu trúc thư mục tối ưu và quy tắc đặt tên tệp cho toàn bộ học phần.
          </p>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Kỹ năng được rèn luyện:</strong> Sử dụng File Explorer và các phím tắt (<code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Windows + E</code>, <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Ctrl + C</code>, <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Ctrl + X</code>, <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Ctrl + V</code>, <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Shift + Delete</code>); phân biệt rõ Copy, Cut và Delete; khôi phục tệp từ Thùng rác; tổ chức và đặt tên tệp có hệ thống.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">b) Tóm tắt quá trình thực hiện</h2>
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">Các bước thực hiện</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
              <li>Mở File Explorer bằng tổ hợp phím <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Windows + E</code>.</li>
              <li>Vào This PC, mở ổ đĩa không phải ổ hệ thống (ổ D: hoặc E:); nếu chỉ có ổ C: thì vào thư mục Documents.</li>
              <li>Tạo thư mục mới tên <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">ThucHanh_NguyenHungNam</code>: chuột phải vào khoảng trống, chọn New, chọn Folder.</li>
              <li>Mở thư mục vừa tạo, tạo tệp văn bản <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChu.txt</code> (New &gt; Text Document) rồi đổi tên thành <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChuQuanTrong.txt</code> bằng lệnh Rename.</li>
              <li>Tạo thư mục con <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">TaiLieu</code>; sao chép <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChuQuanTrong.txt</code> vào <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">TaiLieu</code> bằng Copy và Paste.</li>
              <li>Quay lại thư mục gốc, tạo tệp <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">DiChuyen.txt</code> rồi dùng Cut và Paste để chuyển vào <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">TaiLieu</code>; kiểm tra tệp gốc không còn ở vị trí cũ.</li>
              <li>Trong <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">TaiLieu</code>, xóa <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChuQuanTrong.txt</code> bằng Delete (tệp vào Thùng rác).</li>
              <li>Chọn <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">DiChuyen.txt</code>, nhấn <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">Shift + Delete</code> để xóa vĩnh viễn, xác nhận cảnh báo.</li>
              <li>Mở Recycle Bin, chuột phải vào <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChuQuanTrong.txt</code>, chọn Restore để khôi phục về vị trí ban đầu.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Công cụ đã sử dụng</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Windows File Explorer</li>
              <li>Thùng rác (Recycle Bin)</li>
              <li>Công cụ chụp màn hình (Snipping Tool / phím Windows + Shift + S)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">Khó khăn và cách giải quyết</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3.5 font-semibold">Khó khăn</th>
                    <th className="p-3.5 font-semibold">Cách giải quyết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3.5">Tên tệp thành GhiChu.txt.txt do Windows ẩn phần mở rộng.</td>
                    <td className="p-3.5">Bật View &gt; Show &gt; File name extensions trong File Explorer trước khi đổi tên.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Nhầm lẫn giữa Copy và Cut nên tệp gốc biến mất ngoài ý muốn.</td>
                    <td className="p-3.5">Ghi nhớ: Copy giữ lại bản gốc, Cut chuyển bản gốc; kiểm tra lại cả hai thư mục sau khi Paste.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Shift + Delete không thể hoàn tác.</td>
                    <td className="p-3.5">Chỉ dùng cho tệp thử nghiệm; với tệp thật thì xóa thường để còn khôi phục từ Thùng rác.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
            <strong>Khai báo sử dụng AI:</strong> Mình dùng Claude (Anthropic) để gợi ý cách trình bày bảng quy tắc đặt tên tệp rõ ràng. Toàn bộ các bước thao tác tạo, đổi tên, sao chép, di chuyển, xóa và khôi phục tệp trên máy tính đều do mình tự thực hiện và chụp màn hình trực tiếp.
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">c) Sản phẩm cuối cùng</h2>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">a) Bảng thao tác và kết quả kiểm tra</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <caption className="text-left text-xs font-medium text-slate-500 p-3 bg-slate-50 border-b border-slate-200">
                  Các bước thực hành và kết quả mong đợi
                </caption>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold w-24">Bước</th>
                    <th className="p-3 font-semibold">Thao tác</th>
                    <th className="p-3 font-semibold">Kết quả kiểm tra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-variant-numeric tabular-nums">
                  <tr><td className="p-3 font-mono-code text-xs">1</td><td className="p-3">Windows + E</td><td className="p-3">File Explorer mở ra</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">2–3</td><td className="p-3">Tạo thư mục ThucHanh_HoTen</td><td className="p-3">Thư mục xuất hiện đúng ổ đĩa, đúng tên</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">4–6</td><td className="p-3">Tạo GhiChu.txt, đổi tên thành GhiChuQuanTrong.txt</td><td className="p-3">Tệp có đuôi .txt, tên đúng quy tắc</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">7</td><td className="p-3">Tạo thư mục con TaiLieu</td><td className="p-3">TaiLieu nằm bên trong ThucHanh_HoTen</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">8</td><td className="p-3">Copy, Paste GhiChuQuanTrong.txt</td><td className="p-3">Có 2 bản: thư mục gốc và TaiLieu</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">9</td><td className="p-3">Tạo DiChuyen.txt, Cut, Paste vào TaiLieu</td><td className="p-3">DiChuyen.txt chỉ còn ở TaiLieu</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">10</td><td className="p-3">Delete GhiChuQuanTrong.txt trong TaiLieu</td><td className="p-3">Tệp nằm trong Recycle Bin</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">11</td><td className="p-3">Shift + Delete DiChuyen.txt</td><td className="p-3">Tệp mất vĩnh viễn, không có trong Recycle Bin</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">12</td><td className="p-3">Restore từ Recycle Bin</td><td className="p-3">GhiChuQuanTrong.txt trở lại TaiLieu</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PortfolioImage
              src="/assets/b1_anh1.png"
              alt="Mở File Explorer, vào ổ đĩa và tạo thư mục ThucHanh_HoTen"
              caption="Hình 1.1: Mở File Explorer, vào ổ đĩa và tạo thư mục ThucHanh_HoTen"
              onExpand={onExpandImage}
            />
            <PortfolioImage
              src="/assets/b1_anh2.png"
              alt="Tạo GhiChu.txt, đổi tên thành GhiChuQuanTrong.txt và tạo thư mục TaiLieu"
              caption="Hình 1.2: Tạo GhiChu.txt, đổi tên thành GhiChuQuanTrong.txt và tạo thư mục TaiLieu"
              onExpand={onExpandImage}
            />
            <PortfolioImage
              src="/assets/b1_anh3.png"
              alt="Thực hiện Copy/Paste và Cut/Paste"
              caption="Hình 1.3: Thực hiện Copy/Paste và Cut/Paste"
              onExpand={onExpandImage}
            />
            <PortfolioImage
              src="/assets/b1_anh4.png"
              alt="Delete, Shift + Delete, Recycle Bin và Restore"
              caption="Hình 1.4: Delete, Shift + Delete, Recycle Bin và Restore"
              onExpand={onExpandImage}
            />
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Sau khi hoàn tất, cấu trúc thực tế là: <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">ThucHanh_HoTen</code> chứa <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChuQuanTrong.txt</code> và thư mục <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">TaiLieu</code>; bên trong <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">TaiLieu</code> có <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">GhiChuQuanTrong.txt</code> (đã khôi phục). Tệp <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">DiChuyen.txt</code> đã bị xóa vĩnh viễn.
          </p>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">b) Cấu trúc thư mục tối ưu cho học phần</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Từ bài thực hành, mình áp dụng cách tổ chức sau để lưu toàn bộ sản phẩm của học phần. Mỗi chương một thư mục, đánh số để luôn sắp xếp đúng thứ tự, và mỗi thư mục chia thành nguồn, sản phẩm và ảnh chụp.
            </p>
            <PortfolioImage
              src="/assets/fig_folder.png"
              alt="Cấu trúc thư mục tối ưu cho học phần"
              caption="Hình 1.5: Cấu trúc thư mục tối ưu cho học phần"
              onExpand={onExpandImage}
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">c) Quy tắc đặt tên tệp</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
              <li><strong>Không dấu, không khoảng trắng, không ký tự đặc biệt.</strong> Dùng gạch dưới hoặc kiểu viết hoa từng chữ (ví dụ <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">BaoCao_Chuong2.docx</code>).</li>
              <li><strong>Có số thứ tự ở đầu</strong> để sắp xếp tự động (<code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">01_</code>, <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">02_</code>, ...).</li>
              <li><strong>Có ngày hoặc phiên bản</strong> khi tệp thay đổi nhiều lần: <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">20261024_BaoCao_v02.docx</code>; tránh các tên như <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">final_final</code>.</li>
              <li><strong>Tên ngắn, mô tả đúng nội dung</strong>, không quá 50 ký tự, phần mở rộng viết thường.</li>
              <li><strong>Tệp nộp bài đặt theo mẫu giảng viên yêu cầu</strong>, ví dụ <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">{profile.studentId}_NguyenHungNam_BaoCao.docx</code>.</li>
            </ul>
          </div>
        </section>

        <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Danh mục Dự án</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bai2')}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Bài tiếp theo: Bài 2</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </article>
    );
  }

  if (projectId === 'bai2') {
    return (
      <article className="space-y-8">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-2">
            <span className="font-semibold text-blue-700">Bài 2</span>
            <span aria-hidden="true">·</span>
            <span>Chương 2: Khai thác dữ liệu và thông tin</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code">Điểm tối đa: 0,75</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Bài 2: Tìm kiếm và đánh giá thông tin học thuật
          </h1>
          <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('bai1')}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bài 1</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bai3')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Bài 3: Viết Prompt hiệu quả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">a) Mục tiêu bài tập</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Yêu cầu của bài tập:</strong> Chọn một chủ đề liên quan đến ngành học; tìm kiếm trên cơ sở dữ liệu học thuật, tạp chí chuyên ngành, sách chuyên khảo và nguồn mở; thu thập ít nhất 10 tài liệu (trong đó có ít nhất 5 bài báo khoa học); đánh giá độ tin cậy theo tiêu chí tác giả, cơ quan xuất bản, phương pháp nghiên cứu, trích dẫn, tính cập nhật; lập bảng tổng hợp và xếp hạng.
          </p>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            Chủ đề đã chọn: <strong>Ứng dụng trí tuệ nhân tạo trong giáo dục nghệ thuật</strong> (chủ đề gắn với môi trường đào tạo sư phạm nghệ thuật). Kỹ năng được rèn luyện: dùng toán tử tìm kiếm nâng cao, chọn lọc nguồn, đánh giá độ tin cậy và trích dẫn theo chuẩn Harvard.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">b) Tóm tắt quá trình thực hiện</h2>
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">Các bước thực hiện</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
              <li>Xác định câu hỏi nghiên cứu: AI đang được ứng dụng trong giáo dục nghệ thuật như thế nào, mang lại lợi ích và rủi ro gì?</li>
              <li>Liệt kê từ khóa tiếng Anh và tiếng Việt: artificial intelligence, generative AI, art education, visual arts; trí tuệ nhân tạo, giáo dục nghệ thuật, mỹ thuật, âm nhạc.</li>
              <li>Tìm trên Google Scholar bằng dấu ngoặc kép, toán tử OR, allintitle và bộ lọc năm xuất bản từ 2022.</li>
              <li>Tìm trên Google Search bằng <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">filetype:pdf</code> và <code className="font-mono-code text-xs bg-slate-100 px-1.5 py-0.5 rounded">site:</code> để lấy báo cáo chính sách và bài báo tiếng Việt.</li>
              <li>Đọc tóm tắt, lọc theo mức độ liên quan, chọn 11 tài liệu phù hợp nhất với chủ đề.</li>
              <li>Đánh giá từng tài liệu theo 5 tiêu chí, xếp hạng A, B, C và lập bảng tổng hợp.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Công cụ đã sử dụng</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Google Scholar</li>
              <li>Google Search (toán tử nâng cao)</li>
              <li>Vietnam Journals Online (VJOL)</li>
              <li>Trang web của UNESCO và arXiv</li>
              <li>Claude (Anthropic) hỗ trợ gợi ý từ khóa và khung bảng đánh giá nguồn</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">Khó khăn và cách giải quyết</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3.5 font-semibold">Khó khăn</th>
                    <th className="p-3.5 font-semibold">Cách giải quyết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3.5">Kết quả quá nhiều và nhiều bài chỉ nhắc đến AI chứ không nghiên cứu về nghệ thuật.</td>
                    <td className="p-3.5">Thu hẹp bằng allintitle và cụm từ trong ngoặc kép, đồng thời đọc tóm tắt trước khi chọn.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Một số nguồn là bản thảo (preprint) hoặc tin tức, khó so sánh với bài báo phản biện.</td>
                    <td className="p-3.5">Phân loại riêng và xếp hạng thấp hơn, chỉ dùng làm bối cảnh.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Không truy cập được toàn văn một số bài trả phí.</td>
                    <td className="p-3.5">Chỉ dùng thông tin từ tóm tắt công khai và ghi chú rõ mức độ đã đọc.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
            <strong>Khai báo sử dụng AI:</strong> Mình dùng Claude (Anthropic) để gợi ý hướng chọn chủ đề, từ khóa tìm kiếm và khung bảng đánh giá nguồn. Phần tìm kiếm trên Google Scholar, đọc tóm tắt, kiểm tra số trích dẫn và quyết định chọn hay loại từng tài liệu do mình tự thực hiện.
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">c) Sản phẩm cuối cùng</h2>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">a) Chiến lược tìm kiếm với toán tử nâng cao</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <caption className="text-left text-xs font-medium text-slate-500 p-3 bg-slate-50 border-b border-slate-200">
                  Các truy vấn tìm kiếm đã sử dụng
                </caption>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold">Nguồn</th>
                    <th className="p-3 font-semibold">Truy vấn</th>
                    <th className="p-3 font-semibold">Mục đích toán tử</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3">Google Scholar</td>
                    <td className="p-3 font-mono-code text-xs">"artificial intelligence" "art education"</td>
                    <td className="p-3">Ngoặc kép: khớp đúng cụm từ</td>
                  </tr>
                  <tr>
                    <td className="p-3">Google Scholar</td>
                    <td className="p-3 font-mono-code text-xs">allintitle: "generative AI" "art education"</td>
                    <td className="p-3">Chỉ lấy bài có từ khóa trong tiêu đề</td>
                  </tr>
                  <tr>
                    <td className="p-3">Google Scholar</td>
                    <td className="p-3 font-mono-code text-xs">("generative AI" OR "AI") "visual arts" education</td>
                    <td className="p-3">OR mở rộng từ đồng nghĩa; lọc từ 2022</td>
                  </tr>
                  <tr>
                    <td className="p-3">Google Search</td>
                    <td className="p-3 font-mono-code text-xs">"generative AI" education research guidance filetype:pdf</td>
                    <td className="p-3">Lấy báo cáo chính sách dạng PDF</td>
                  </tr>
                  <tr>
                    <td className="p-3">Google Search</td>
                    <td className="p-3 font-mono-code text-xs">"trí tuệ nhân tạo" "mỹ thuật" site:vjol.info.vn</td>
                    <td className="p-3">Giới hạn trong kho tạp chí Việt Nam</td>
                  </tr>
                  <tr>
                    <td className="p-3">CSDL Thư viện ĐHSP Nghệ thuật TW</td>
                    <td className="p-3 font-mono-code text-xs">"giáo dục nghệ thuật" AND "công nghệ số"</td>
                    <td className="p-3">Bổ sung sách chuyên khảo &amp; tạp chí Giáo dục Nghệ thuật</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <PortfolioImage
            src="/assets/b2_anh1.png"
            alt="Kết quả tìm kiếm trên Google Scholar với toán tử allintitle, cụm từ trong ngoặc kép và bộ lọc năm xuất bản từ 2022"
            caption="Hình 2.1: Kết quả tìm kiếm trên Google Scholar với toán tử allintitle, cụm từ trong ngoặc kép và bộ lọc năm xuất bản từ 2022"
            onExpand={onExpandImage}
          />

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">b) Bảng đánh giá và xếp hạng độ tin cậy</h3>
            <p className="text-sm text-slate-600 mb-3">
              Thang xếp hạng: <strong>A</strong> là rất tin cậy (phản biện, nhà xuất bản hoặc tổ chức uy tín, phương pháp rõ), <strong>B</strong> là tin cậy nhưng cần dùng có đối chiếu, <strong>C</strong> chỉ để tham khảo bối cảnh.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs md:text-sm text-left border-collapse">
                <caption className="text-left text-xs font-medium text-slate-500 p-3 bg-slate-50 border-b border-slate-200">
                  Bảng tổng hợp và xếp hạng độ tin cậy của 11 nguồn thông tin
                </caption>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold">TT</th>
                    <th className="p-3 font-semibold">Tài liệu (tác giả, năm)</th>
                    <th className="p-3 font-semibold">Loại</th>
                    <th className="p-3 font-semibold">Tác giả &amp; cơ quan xuất bản</th>
                    <th className="p-3 font-semibold">Phương pháp</th>
                    <th className="p-3 font-semibold">Cập nhật, trích dẫn</th>
                    <th className="p-3 font-semibold">Hạng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-variant-numeric tabular-nums">
                  <tr>
                    <td className="p-3 font-mono-code">1</td>
                    <td className="p-3 font-medium">Heaton, Low và Chen (2024)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Nhóm tác giả là nhà giáo dục nghệ thuật; tạp chí Pedagogies (Taylor &amp; Francis)</td>
                    <td className="p-3">Phản tư định tính từ 3 bối cảnh ở Singapore</td>
                    <td className="p-3">2024 · Cited by: 28</td>
                    <td className="p-3 font-bold text-blue-700">A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">2</td>
                    <td className="p-3 font-medium">Heaton (2025)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí International Journal of Art &amp; Design Education (Wiley)</td>
                    <td className="p-3">Bài đối thoại, tổng hợp học liệu và trải nghiệm nhà giáo</td>
                    <td className="p-3">2025 · Cited by: 14</td>
                    <td className="p-3 font-bold text-blue-700">A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">3</td>
                    <td className="p-3 font-medium">Yu và Sun (2026)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí International Journal of Arts and Technology</td>
                    <td className="p-3">Tổng quan hệ thống 372 công bố Web of Science, mô hình chủ đề</td>
                    <td className="p-3">2026 · Cited by: 6</td>
                    <td className="p-3 font-bold text-blue-700">A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">4</td>
                    <td className="p-3 font-medium">Miao và Holmes (2023), UNESCO</td>
                    <td className="p-3">Báo cáo</td>
                    <td className="p-3">UNESCO, tổ chức liên chính phủ về giáo dục</td>
                    <td className="p-3">Hướng dẫn chính sách dựa trên khung đạo đức AI</td>
                    <td className="p-3">2023 · Cited by: 840+</td>
                    <td className="p-3 font-bold text-blue-700">A</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">5</td>
                    <td className="p-3 font-medium">Adeel và Yasmeen (2025)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí JDSS (truy cập mở, có DOI)</td>
                    <td className="p-3">Tổng quan hệ thống 20 nghiên cứu phản biện 2020–2025</td>
                    <td className="p-3">2025 · Cited by: 9</td>
                    <td className="p-3 font-semibold text-slate-700">B</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">6</td>
                    <td className="p-3 font-medium">Blair (2025)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí AJSTEM, Đại học Tennessee Tech</td>
                    <td className="p-3">Bài thảo luận khái niệm, không có dữ liệu thực nghiệm</td>
                    <td className="p-3">2025 · Cited by: 11</td>
                    <td className="p-3 font-semibold text-slate-700">B</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">7</td>
                    <td className="p-3 font-medium">Wang và cs. (2025)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí IJICT (Inderscience)</td>
                    <td className="p-3">Tổng quan kỹ thuật học sâu, GAN, chuyển phong cách</td>
                    <td className="p-3">2025 · Cited by: 7</td>
                    <td className="p-3 font-semibold text-slate-700">B</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">8</td>
                    <td className="p-3 font-medium">Sims (2024)</td>
                    <td className="p-3">Bản thảo</td>
                    <td className="p-3">arXiv, tác giả Đại học Kyoto Seika</td>
                    <td className="p-3">Phân tích và đề xuất tích hợp Stable Diffusion; chưa phản biện</td>
                    <td className="p-3">2024 · Cited by: 5</td>
                    <td className="p-3 font-semibold text-slate-700">B</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">9</td>
                    <td className="p-3 font-medium">Nguyễn và Đặng (2026)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí Khoa học Đại học Khánh Hòa (VJOL)</td>
                    <td className="p-3">Khảo sát giáo viên THCS Khánh Hòa</td>
                    <td className="p-3">2026 · Cited by: 2</td>
                    <td className="p-3 font-semibold text-slate-700">B</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">10</td>
                    <td className="p-3 font-medium">Bùi (2025)</td>
                    <td className="p-3">Bài báo</td>
                    <td className="p-3">Tạp chí Khoa học Đại học Mở Hà Nội (VJOL)</td>
                    <td className="p-3">Tổng hợp tài liệu quốc tế và trường hợp tại Việt Nam</td>
                    <td className="p-3">2025 · Cited by: 4</td>
                    <td className="p-3 font-semibold text-slate-700">B</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code">11</td>
                    <td className="p-3 font-medium">Đào (2026)</td>
                    <td className="p-3">Tin báo chí</td>
                    <td className="p-3">Báo Giáo dục và Thời đại</td>
                    <td className="p-3">Tường thuật sự kiện tập huấn, không phải nghiên cứu</td>
                    <td className="p-3">08/2026 · Không áp dụng</td>
                    <td className="p-3 text-slate-500">C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">c) Nhận xét ngắn</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Các nguồn hạng A đều có phản biện hoặc đến từ tổ chức uy tín, cùng nhấn mạnh rằng AI nên hỗ trợ chứ không thay thế sáng tạo của người học (Heaton, Low và Chen, 2024; Miao và Holmes, 2023). Các tài liệu tiếng Việt còn ít và thiên về khảo sát nhận thức, vì vậy khi viết bài cần đối chiếu với nguồn quốc tế.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">Tài liệu tham khảo (Chuẩn Harvard)</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600 leading-relaxed">
              <li>Adeel, T.J. và Yasmeen, K. (2025) 'An overview of artificial intelligence applications in art education', <em>Journal of Development and Social Sciences</em>, 6(2), tr. 357–366. doi:10.47205/jdss.2025(6-II)30.</li>
              <li>Blair, J. (2025) 'Art meets AI: exploring the opportunities and challenges of integrating artificial intelligence in the art classroom', <em>American Journal of STEM Education: Issues and Perspectives</em>, 14, tr. 59–74. doi:10.32674/5hm64807.</li>
              <li>Bùi, T.T.T. (2025) 'AI trong giáo dục liên ngành: cơ hội và thách thức đối với nghệ thuật, thiết kế và văn hóa', <em>Vietnam Journals Online (VJOL)</em>.</li>
              <li>Đào, H. (2026) 'Tập huấn kỹ năng ứng dụng AI nâng cao cho giảng viên, giáo viên nghệ thuật', <em>Giáo dục và Thời đại</em>, 26/08.</li>
              <li>Heaton, R. (2025) 'Making peace with artificial intelligence (AI) in art education', <em>International Journal of Art &amp; Design Education</em>, tr. 1–16.</li>
              <li>Heaton, R., Low, J.H. và Chen, V. (2024) 'AI art education – artificial or intelligent? Transformative pedagogic reflections from three art educators in Singapore', <em>Pedagogies: An International Journal</em>, 19(4). doi:10.1080/1554480X.2024.2395260.</li>
              <li>Miao, F. và Holmes, W. (2023) <em>Guidance for generative AI in education and research</em>. Paris: UNESCO.</li>
              <li>Nguyễn, V.T. và Đặng, V.Đ. (2026) 'Ứng dụng trí tuệ nhân tạo (AI) trong dạy học mỹ thuật ở trung học cơ sở trên địa bàn tỉnh Khánh Hòa', <em>Vietnam Journals Online (VJOL)</em>.</li>
              <li>Sims, A. (2024) 'From creation to curriculum: examining the role of generative AI in arts universities', <em>arXiv preprint</em> arXiv:2412.16531.</li>
              <li>Wang, L., Li, B., Fan, X. và Ji, Y. (2025) 'A review of AI-driven art education: enhancing creativity through deep learning and digital image processing', <em>International Journal of Information and Communication Technology</em>, 26(23).</li>
              <li>Yu, Y. và Sun, R. (2026) 'Trends and topics in arts education and artificial intelligence: a systematic review using a human-in-the-loop model', <em>International Journal of Arts and Technology</em>, 16.</li>
            </ul>
          </div>
        </section>

        <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('bai1')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bài trước: Bài 1</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bai3')}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Bài tiếp theo: Bài 3</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </article>
    );
  }

  if (projectId === 'bai3') {
    return (
      <article className="space-y-8">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-2">
            <span className="font-semibold text-blue-700">Bài 3</span>
            <span aria-hidden="true">·</span>
            <span>Chương 3: Tổng quan về trí tuệ nhân tạo</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code">Điểm tối đa: 0,75</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Bài 3: Viết Prompt hiệu quả cho các tác vụ học tập
          </h1>
          <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('bai2')}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bài 2</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bai4')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Bài 4: Hợp tác trực tuyến</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">a) Mục tiêu bài tập</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Yêu cầu của bài tập:</strong> Chọn 3 tác vụ học tập phổ biến (tóm tắt tài liệu, giải thích khái niệm phức tạp, tạo bộ câu hỏi ôn tập); với mỗi tác vụ viết 3 phiên bản prompt (cơ bản, cải tiến, nâng cao); thử nghiệm với một công cụ AI, so sánh kết quả, phân tích lý do và tổng hợp nguyên tắc viết prompt hiệu quả.
          </p>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Kỹ năng được rèn luyện:</strong> Viết prompt rõ ràng, có cấu trúc; vận dụng role prompting, chain-of-thought và few-shot examples; đánh giá và kiểm chứng đầu ra của AI.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">b) Tóm tắt quá trình thực hiện</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
            <li>Chọn 3 tác vụ: tóm tắt một tài liệu học thuật, giải thích khái niệm "mô hình khuếch tán (diffusion)", tạo bộ câu hỏi ôn tập về liêm chính học thuật.</li>
            <li>Viết 3 phiên bản prompt cho mỗi tác vụ (tổng 9 prompt).</li>
            <li>Chạy từng prompt trong một cuộc trò chuyện mới trên Claude (Anthropic), giữ nguyên công cụ và chế độ để so sánh công bằng; chụp màn hình kết quả.</li>
            <li>Chấm từng kết quả theo 4 tiêu chí: độ chính xác, cấu trúc, mức phù hợp với người học, khả năng dùng ngay.</li>
            <li>Phân tích nguyên nhân khác biệt và tổng hợp 9 nguyên tắc viết prompt.</li>
          </ol>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
            <strong>Khai báo sử dụng AI:</strong> Mình sử dụng Claude (Anthropic) để thực nghiệm 9 phiên bản prompt cho 3 tác vụ học tập. Phần thiết kế câu lệnh, đối chiếu với văn bản gốc và tổng hợp bảng đánh giá do mình tự thực hiện.
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">c) Sản phẩm cuối cùng</h2>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">a) Tác vụ 1: Tóm tắt tài liệu học thuật</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold w-28">Phiên bản</th>
                    <th className="p-3 font-semibold">Nội dung prompt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold">Cơ bản</td>
                    <td className="p-3">Tóm tắt bài này: 1.1. Art Education and Technology Integration (Dobbs, 1998; Freedman, 2025; Zimmerman, 2009...)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Cải tiến</td>
                    <td className="p-3">Hãy tóm tắt văn bản dưới đây trong tối đa 150 từ cho sinh viên năm nhất. Gồm 4 phần: vấn đề chính, phương pháp hoặc lập luận, kết luận, hạn chế. Trình bày bằng gạch đầu dòng, viết tiếng Việt, giữ nguyên thuật ngữ tiếng Anh quan trọng.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-blue-700">Nâng cao</td>
                    <td className="p-3">Vai trò: bạn là trợ lý nghiên cứu giàu kinh nghiệm, hướng dẫn sinh viên nghệ thuật đọc tài liệu học thuật. Hãy làm lần lượt: (1) liệt kê các luận điểm chính, mỗi ý kèm câu nguồn trong văn bản; (2) loại bỏ chi tiết phụ; (3) viết bản tóm tắt tối đa 150 từ; (4) tự kiểm tra từng ý có thật sự xuất hiện trong văn bản không và đánh dấu ý chưa chắc chắn. Không được thêm thông tin ngoài văn bản.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">b) Tác vụ 2: Giải thích khái niệm phức tạp (Diffusion Model)</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold w-28">Phiên bản</th>
                    <th className="p-3 font-semibold">Nội dung prompt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold">Cơ bản</td>
                    <td className="p-3">Giải thích mô hình khuếch tán.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Cải tiến</td>
                    <td className="p-3">Giải thích mô hình khuếch tán (diffusion model) trong tạo ảnh bằng AI cho sinh viên ngành nghệ thuật không có nền tảng toán. Tối đa 300 từ, có một phép ẩn dụ đời thường, chia 3 phần: ý tưởng chính, cách hoạt động, ví dụ ứng dụng.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-blue-700">Nâng cao</td>
                    <td className="p-3">Vai trò: bạn là giảng viên giàu kinh nghiệm giải thích khái niệm khó cho người mới. Hãy suy luận từng bước: (1) xác định 3 ý cốt lõi cần hiểu; (2) chọn một phép ẩn dụ gần gũi với hội họa; (3) giải thích theo thứ tự từ đơn giản đến phức tạp; (4) kết thúc bằng 3 câu hỏi kiểm tra hiểu bài. Đối tượng: sinh viên sư phạm nghệ thuật. Độ dài: tối đa 350 từ.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">c) Tác vụ 3: Tạo bộ câu hỏi ôn tập</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold w-28">Phiên bản</th>
                    <th className="p-3 font-semibold">Nội dung prompt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold">Cơ bản</td>
                    <td className="p-3">Tạo câu hỏi ôn tập về liêm chính học thuật.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Cải tiến</td>
                    <td className="p-3">Tạo 10 câu hỏi trắc nghiệm, mỗi câu 4 đáp án, về liêm chính học thuật trong môi trường số cho sinh viên đại học (đạo văn, trích dẫn, sử dụng AI). Phân bố độ khó: 5 dễ, 3 trung bình, 2 khó. Cuối bài có đáp án và giải thích một câu cho mỗi câu hỏi.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-blue-700">Nâng cao</td>
                    <td className="p-3">Vai trò: bạn là giảng viên thiết kế đề kiểm tra. Hãy làm lần lượt: (1) lập bảng chủ đề cần kiểm tra và mức độ nhận thức; (2) viết 10 câu hỏi theo mẫu bên dưới; (3) kiểm tra từng câu để chắc chắn chỉ có một đáp án đúng, sửa nếu cần; (4) xuất kết quả dạng bảng gồm câu hỏi, đáp án, giải thích.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PortfolioImage
              src="/assets/b3_anh1.png"
              alt="Kết quả 3 prompt cho tác vụ 1: tóm tắt tài liệu"
              caption="Hình 3.1: Kết quả 3 prompt cho tác vụ 1 (Tóm tắt tài liệu)"
              onExpand={onExpandImage}
            />
            <PortfolioImage
              src="/assets/b3_anh2.png"
              alt="Kết quả 3 prompt cho tác vụ 2: giải thích khái niệm mô hình khuếch tán"
              caption="Hình 3.2: Kết quả 3 prompt cho tác vụ 2 (Giải thích khái niệm)"
              onExpand={onExpandImage}
            />
            <PortfolioImage
              src="/assets/b3_anh3.png"
              alt="Kết quả 3 prompt cho tác vụ 3: tạo bộ câu hỏi ôn tập"
              caption="Hình 3.3: Kết quả 3 prompt cho tác vụ 3 (Tạo câu hỏi ôn tập)"
              onExpand={onExpandImage}
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">d) Bảng so sánh kết quả &amp; 9 nguyên tắc viết Prompt</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl mb-5">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold">Tiêu chí</th>
                    <th className="p-3 font-semibold">Cơ bản</th>
                    <th className="p-3 font-semibold">Cải tiến</th>
                    <th className="p-3 font-semibold text-blue-700">Nâng cao</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-medium">Độ chính xác</td>
                    <td className="p-3">Dễ chung chung, có thể lệch trọng tâm</td>
                    <td className="p-3">Bám sát yêu cầu hơn</td>
                    <td className="p-3">Cao nhất, có bước tự kiểm tra</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Cấu trúc</td>
                    <td className="p-3">Không ổn định, độ dài tùy ý</td>
                    <td className="p-3">Đúng số phần, độ dài yêu cầu</td>
                    <td className="p-3">Đúng cấu trúc và có phần phụ (câu hỏi kiểm tra, chú thích nguồn)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Phù hợp người học</td>
                    <td className="p-3">Thấp, không rõ đối tượng</td>
                    <td className="p-3">Khá, đúng trình độ</td>
                    <td className="p-3">Cao, ngôn ngữ và ví dụ sát đối tượng</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Khả năng dùng ngay</td>
                    <td className="p-3">Cần chỉnh sửa nhiều</td>
                    <td className="p-3">Chỉnh sửa ít</td>
                    <td className="p-3">Thường dùng được ngay sau khi kiểm chứng</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
              <li>Nêu <strong>vai trò</strong> của AI và <strong>đối tượng</strong> người đọc.</li>
              <li>Nói rõ <strong>mục tiêu</strong> cuối cùng của tác vụ.</li>
              <li>Cung cấp <strong>ngữ cảnh và dữ liệu đầu vào</strong> đầy đủ, tách riêng bằng dấu phân cách.</li>
              <li>Quy định <strong>định dạng, độ dài, ngôn ngữ</strong> của đầu ra.</li>
              <li>Chia tác vụ lớn thành <strong>các bước nhỏ</strong> có thứ tự (Chain-of-Thought).</li>
              <li>Đưa <strong>ví dụ mẫu</strong> (Few-Shot) khi cần định dạng hoặc phong cách cụ thể.</li>
              <li>Thêm <strong>ràng buộc</strong>: không bịa thông tin, nêu rõ chỗ chưa chắc chắn.</li>
              <li><strong>Lặp và cải tiến</strong>: đọc kết quả, bổ sung yêu cầu, chạy lại.</li>
              <li><strong>Kiểm chứng</strong> kết quả với nguồn gốc trước khi sử dụng.</li>
            </ol>
          </div>
        </section>

        <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('bai2')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bài trước: Bài 2</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bai4')}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Bài tiếp theo: Bài 4</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </article>
    );
  }

  if (projectId === 'bai4') {
    return (
      <article className="space-y-8">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-2">
            <span className="font-semibold text-blue-700">Bài 4</span>
            <span aria-hidden="true">·</span>
            <span>Chương 4: Giao tiếp và hợp tác trong môi trường số</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code">Điểm tối đa: 0,5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Bài 4: Sử dụng công cụ hợp tác trực tuyến cho dự án nhóm
          </h1>
          <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('bai3')}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bài 3</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bai5')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Bài 5: Sáng tạo nội dung số</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">a) Mục tiêu bài tập</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Yêu cầu của bài tập:</strong> Cùng nhóm chọn một chủ đề học thuật hoặc dự án; lên kế hoạch cuộc họp trực tuyến (chọn nền tảng, xác định mục tiêu và chương trình nghị sự, phân công vai trò, chuẩn bị tài liệu); tổ chức họp 20–30 phút và ghi lại khi có sự đồng ý của mọi thành viên; lập biên bản, tổng hợp quyết định và nhiệm vụ, chia sẻ kết quả; mỗi thành viên viết đánh giá ngắn.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">b) Tóm tắt quá trình thực hiện &amp; Sản phẩm cuộc họp</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <caption className="text-left text-xs font-medium text-slate-500 p-3 bg-slate-50 border-b border-slate-200">
                  Thông tin kế hoạch cuộc họp trực tuyến
                </caption>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr><th className="p-3 bg-slate-50 font-semibold w-36">Nền tảng</th><td className="p-3">Google Meet (meet.google.com/wcc-guyx-ktj)</td></tr>
                  <tr><th className="p-3 bg-slate-50 font-semibold">Thời gian</th><td className="p-3 font-mono-code text-xs">22h25 – 22h50 ngày 29/11/2026 (25 phút)</td></tr>
                  <tr><th className="p-3 bg-slate-50 font-semibold">Thành viên</th><td className="p-3">Nguyễn Hưng Nam, Nguyễn Văn A (2/2 có mặt)</td></tr>
                  <tr><th className="p-3 bg-slate-50 font-semibold">Mục tiêu</th><td className="p-3">Chốt ý tưởng, bố cục và phân công thực hiện poster "Sử dụng AI có trách nhiệm trong học tập"</td></tr>
                  <tr><th className="p-3 bg-slate-50 font-semibold">Phân công vai trò</th><td className="p-3">Điều phối &amp; Trình bày: Nguyễn Hưng Nam · Thư ký: Nguyễn Văn A</td></tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <caption className="text-left text-xs font-medium text-slate-500 p-3 bg-slate-50 border-b border-slate-200">
                  Chương trình nghị sự (25 phút)
                </caption>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold">Thời gian</th>
                    <th className="p-3 font-semibold">Nội dung</th>
                    <th className="p-3 font-semibold">Phụ trách</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-variant-numeric tabular-nums">
                  <tr><td className="p-3 font-mono-code text-xs">0–3 phút</td><td className="p-3">Khai mạc, nhắc mục tiêu, xin ý kiến ghi hình</td><td className="p-3">Điều phối</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">3–8 phút</td><td className="p-3">Báo cáo tiến độ chuẩn bị của từng người</td><td className="p-3">Từng thành viên</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">8–18 phút</td><td className="p-3">Thảo luận ý tưởng, bố cục, thông điệp poster</td><td className="p-3">Cả nhóm</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">18–23 phút</td><td className="p-3">Phân công nhiệm vụ và hạn hoàn thành</td><td className="p-3">Điều phối, thư ký</td></tr>
                  <tr><td className="p-3 font-mono-code text-xs">23–25 phút</td><td className="p-3">Tổng kết, nhắc lại quyết định, hẹn buổi sau</td><td className="p-3">Người trình bày</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <PortfolioImage
            src="/assets/b4_anh1.png"
            alt="Ảnh chụp màn hình cuộc họp nhóm trên Google Meet"
            caption="Hình 4.1: Ảnh chụp màn hình cuộc họp nhóm trực tuyến trên Google Meet"
            onExpand={onExpandImage}
          />

          {/* Visual Kanban Trello Board for Group Tasks */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900">
              Bảng Trello theo dõi nhiệm vụ của nhóm (3 cột: Cần làm · Đang làm · Hoàn thành)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-100 border border-slate-200">
              <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5">
                <div className="text-xs font-bold text-slate-700 pb-2 border-b border-slate-100 flex justify-between">
                  <span>1. Cần làm (To Do)</span>
                  <span className="font-mono-code text-slate-400">1 thẻ</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-900">Rà soát nguồn ảnh &amp; ghi chú việc dùng AI</div>
                  <div className="text-[11px] text-slate-500">Phụ trách: Nguyễn Văn A · Hạn: 10h00 01/12/2026</div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5">
                <div className="text-xs font-bold text-blue-700 pb-2 border-b border-slate-100 flex justify-between">
                  <span>2. Đang làm (Doing)</span>
                  <span className="font-mono-code text-slate-400">1 thẻ</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-50/40 border border-blue-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-900">Thiết kế bản nháp poster khổ dọc 4:5</div>
                  <div className="text-[11px] text-slate-600">Phụ trách: Nguyễn Hưng Nam · Hạn: 09h00 01/12/2026</div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2.5">
                <div className="text-xs font-bold text-emerald-700 pb-2 border-b border-slate-100 flex justify-between">
                  <span>3. Hoàn thành (Done)</span>
                  <span className="font-mono-code text-slate-400">2 thẻ</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-900">Tìm tư liệu và số liệu cho poster</div>
                  <div className="text-[11px] text-slate-500">Phụ trách: Nguyễn Văn A · Hoàn tất 30/11/2026</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-900">Soạn nội dung chữ &amp; thông điệp chính</div>
                  <div className="text-[11px] text-slate-500">Phụ trách: Nguyễn Hưng Nam · Hoàn tất 30/11/2026</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Đánh giá cá nhân về hiệu quả cuộc họp</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Cuộc họp diễn ra đúng kế hoạch và hoàn thành tốt mục tiêu đã đề ra: cả hai thành viên đều có mặt, thảo luận tập trung và chốt được ý tưởng, bố cục cho poster. Nội dung công việc được phân chia đầy đủ, rõ người, rõ hạn nên không bị chồng chéo. Mình làm điều phối nên giữ giờ theo từng mục, nhờ vậy cuộc họp không bị kéo dài. Điều làm tốt là Nguyễn Văn A ghi biên bản kịp thời, các quyết định được cập nhật ngay lên Trello.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
            <strong>Khai báo sử dụng AI:</strong> Mình dùng Claude (Anthropic) để gợi ý khung kế hoạch và biên bản cuộc họp. Nội dung cuộc họp, các quyết định, phân công và phần đánh giá do nhóm và mình tự thực hiện.
          </div>
        </section>

        <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('bai3')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bài trước: Bài 3</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bai5')}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Bài tiếp theo: Bài 5</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </article>
    );
  }

  if (projectId === 'bai5') {
    const posterPrompt =
      'Tranh minh họa phong cách phẳng, tối giản, bố cục dọc tỉ lệ 4:5. Một sinh viên đang vẽ trên máy tính bảng, bên cạnh là một cánh tay robot thân thiện cầm bảng màu. Nền có họa tiết hoa sen cách điệu, màu ấm (cam, vàng, xanh lá nhạt). Không có chữ, không có logo, không dùng phong cách của nghệ sĩ cụ thể.';

    return (
      <article className="space-y-8">
        <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-2">
            <span className="font-semibold text-blue-700">Bài 5</span>
            <span aria-hidden="true">·</span>
            <span>Chương 5: Sáng tạo nội dung số</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-code">Điểm tối đa: 1,0</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Bài 5: Sử dụng AI tạo sinh để hỗ trợ sáng tạo nội dung
          </h1>
          <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('bai4')}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bài 4</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bai6')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Bài 6: AI có trách nhiệm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">a) Mục tiêu bài tập</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            <strong>Sản phẩm đã chọn:</strong> Một áp phích (poster) kèm bài viết ngắn với thông điệp <em>"Nghệ thuật và AI: bạn đồng hành, không phải người thay thế"</em>. Kỹ năng được rèn luyện: viết prompt cho AI tạo ảnh và AI soạn văn bản, biên tập, chỉnh sửa trong Canva và khai báo minh bạch việc sử dụng AI.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">b) Sản phẩm Áp phích &amp; Quá trình thực hiện</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <PortfolioImage
              src="/assets/b5_anh1.png"
              alt='Áp phích hoàn thiện "Nghệ thuật và AI: bạn đồng hành, không phải người thay thế"'
              caption='Hình 5.1: Áp phích hoàn thiện "Nghệ thuật và AI: bạn đồng hành, không phải người thay thế"'
              onExpand={onExpandImage}
            />
            <PortfolioImage
              src="/assets/b5_anh2.png"
              alt="Quá trình tạo ảnh bằng Gemini: prompt và kết quả"
              caption="Hình 5.2: Quá trình viết prompt tạo hình minh họa và kết quả"
              onExpand={onExpandImage}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Prompt tạo ảnh đã sử dụng</h3>
              <button
                type="button"
                onClick={() => handleCopyPrompt(posterPrompt)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1.5"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép Prompt</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono-code text-xs leading-relaxed whitespace-pre-wrap">
              {posterPrompt}
            </pre>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-lg font-serif-editorial font-semibold text-slate-900">
              Bài viết kèm theo: Nghệ thuật và AI – Bạn đồng hành, không phải người thay thế
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Mỗi lần có một công cụ mới xuất hiện, từ máy ảnh đến phần mềm đồ họa, nghệ thuật lại phải trả lời câu hỏi về vai trò của con người. Trí tuệ nhân tạo tạo sinh khiến câu hỏi ấy trở nên gần gũi hơn bao giờ hết. Với người học nghệ thuật, AI có thể giúp thử nhanh nhiều ý tưởng bố cục, màu sắc và phong cách trước khi bắt tay vào thực hiện thật.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Tuy nhiên, các nghiên cứu về giáo dục nghệ thuật đều nhấn mạnh rằng AI nên hỗ trợ chứ không thay thế các thực hành truyền thống và quyền tự chủ sáng tạo của người học (Blair, 2025; Heaton, Low và Chen, 2024). Ý tưởng, cảm xúc và trách nhiệm với sản phẩm vẫn thuộc về con người. AI cũng có thể cho kết quả thiên lệch hoặc gây tranh cãi về bản quyền, vì vậy cần ghi rõ nguồn và việc sử dụng công cụ (Miao và Holmes, 2023).
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Thông điệp của áp phích này vì thế rất đơn giản: hãy dùng AI như một người bạn để mở rộng trí tưởng tượng, và luôn giữ phần quyết định cuối cùng cho chính mình.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-3">Bảng khai báo sử dụng AI trong Bài 5</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-3 font-semibold">Công cụ</th>
                    <th className="p-3 font-semibold">Mục đích</th>
                    <th className="p-3 font-semibold">Phần do sinh viên ({profile.fullName}) thực hiện</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-medium">Gemini (tạo ảnh)</td>
                    <td className="p-3">Tạo hình minh họa</td>
                    <td className="p-3">Viết prompt, chọn phương án, biên tập bố cục, thêm chữ trong Canva</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Gemini (soạn văn bản)</td>
                    <td className="p-3">Gợi ý dàn ý và bản nháp bài viết</td>
                    <td className="p-3">Chỉnh sửa giọng văn, kiểm tra nội dung trích dẫn, chốt bản cuối</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('bai4')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bài trước: Bài 4</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bai6')}
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Bài tiếp theo: Bài 6</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </article>
    );
  }

  // Default to bai6
  const checkedCount = BAI6_CHECKLIST.filter((c) => bai6Checks[c.key]).length;

  return (
    <article className="space-y-8">
      <header className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-2">
          <span className="font-semibold text-blue-700">Bài 6</span>
          <span aria-hidden="true">·</span>
          <span>Chương 6: An toàn và liêm chính học thuật trong môi trường số</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-code">Điểm tối đa: 0,5</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Bài 6: Sử dụng AI có trách nhiệm trong học tập và nghiên cứu
        </h1>
        <div className="mt-5 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('bai5')}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bài 5</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('conclusion')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Xem Trang Tổng kết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">a) Bộ 8 nguyên tắc sử dụng AI có trách nhiệm của mình</h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="p-3 font-semibold">Nguyên tắc</th>
                <th className="p-3 font-semibold text-emerald-800">Mình sẽ</th>
                <th className="p-3 font-semibold text-rose-800">Mình sẽ không</th>
                <th className="p-3 font-semibold">Căn cứ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">1. Minh bạch</td>
                <td className="p-3">Ghi rõ công cụ AI và mục đích sử dụng trong từng bài</td>
                <td className="p-3">Giấu việc dùng AI</td>
                <td className="p-3">Quy định của học phần</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">2. Tự chủ</td>
                <td className="p-3">Tự viết phần cảm nhận, tự đánh giá; xem AI là trợ lý</td>
                <td className="p-3">Nộp nguyên văn nội dung AI tạo</td>
                <td className="p-3">Quy định của học phần; Miao và Holmes (2023)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">3. Kiểm chứng</td>
                <td className="p-3">Đối chiếu số liệu, trích dẫn với nguồn gốc</td>
                <td className="p-3">Tin ngay thông tin hoặc tài liệu tham khảo do AI đưa ra</td>
                <td className="p-3">Miao và Holmes (2023)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">4. Bảo vệ dữ liệu</td>
                <td className="p-3">Ẩn thông tin cá nhân khi hỏi AI</td>
                <td className="p-3">Nhập số căn cước, địa chỉ, tài khoản ngân hàng</td>
                <td className="p-3">Quy định của học phần; Miao và Holmes (2023)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">5. Bản quyền, nguồn</td>
                <td className="p-3">Ghi nguồn ảnh, tư liệu; trích dẫn theo Harvard</td>
                <td className="p-3">Dùng tên nghệ sĩ hay nhân vật có bản quyền để sao chép phong cách</td>
                <td className="p-3">Blair (2025)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">6. Công bằng, nhạy cảm văn hóa</td>
                <td className="p-3">Xem xét thiên lệch và tính phù hợp văn hóa của kết quả</td>
                <td className="p-3">Dùng nội dung AI có định kiến hay sai lệch văn hóa</td>
                <td className="p-3">Adeel và Yasmeen (2025); Bùi (2025)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">7. Học thật</td>
                <td className="p-3">Tự thử trước, dùng AI để hiểu sâu và phản biện</td>
                <td className="p-3">Dùng AI để né tránh việc học</td>
                <td className="p-3">Heaton (2025)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">8. Tuân thủ quy định</td>
                <td className="p-3">Đọc và làm theo quy định của trường, giảng viên</td>
                <td className="p-3">Sao chép Portfolio hoặc sản phẩm của người khác</td>
                <td className="p-3">Quy định của học phần</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PortfolioImage
          src="/assets/b6_anh1.png"
          alt="Infographic bộ 8 nguyên tắc sử dụng AI có trách nhiệm"
          caption="Hình 6.1: Infographic bộ 8 nguyên tắc sử dụng AI có trách nhiệm"
          onExpand={onExpandImage}
        />

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-base font-semibold text-slate-900">
              b) Bảng tự kiểm tra tương tác trước khi nộp bài
            </h3>
            <span className="text-xs font-mono-code text-blue-700 font-semibold">
              Đã đạt {checkedCount}/{BAI6_CHECKLIST.length} tiêu chí
            </span>
          </div>
          <ul className="space-y-2">
            {BAI6_CHECKLIST.map((item) => {
              const isChecked = !!bai6Checks[item.key];
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => onToggleBai6Check(item.key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center gap-3 ${
                      isChecked
                        ? 'bg-blue-50/50 border-blue-200 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('bai5')}
          className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Bài trước: Bài 5</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('conclusion')}
          className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5"
        >
          <span>Trang Tổng kết</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>
    </article>
  );
};
