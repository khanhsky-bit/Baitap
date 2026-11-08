import React, { useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  Download,
  CheckSquare,
  Square,
  Sliders,
  Sparkles,
  Share2,
  ArrowRight,
  FileCode,
} from 'lucide-react';
import { StudentProfile, SUBMISSION_CHECKLIST, PROJECTS_LIST } from '../data/portfolioData';

interface PublishedUrlViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onNavigatePage: (page: string) => void;
  submissionChecks: Record<string, boolean>;
  onToggleSubmissionCheck: (key: string) => void;
}

export const PublishedUrlView: React.FC<PublishedUrlViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigatePage,
  submissionChecks,
  onToggleSubmissionCheck,
}) => {
  const [slugInput, setSlugInput] = useState(profile.customSlug);
  const [studentIdInput, setStudentIdInput] = useState(profile.studentId);
  const [fullNameInput, setFullNameInput] = useState(profile.fullName);
  const [classInput, setClassInput] = useState(profile.className);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'aistudio' | 'googlesites' | 'netlify' | 'github'>('googlesites');

  const currentOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : profile.publishedUrl;

  const cleanSlug = slugInput
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'portfolio-nguyen-hung-nam';

  const fullPublishedUrl = `${currentOrigin}/?u=${cleanSlug}`;
  const staticHtmlUrl = `${currentOrigin}/web_port/index.html`;
  const googleSitesPreviewUrl = `https://sites.google.com/view/${cleanSlug}`;
  const netlifyPreviewUrl = `https://${cleanSlug}.netlify.app`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...profile,
      customSlug: cleanSlug,
      studentId: studentIdInput.trim() || '2552210033',
      fullName: fullNameInput.trim() || 'Nguyễn Hưng Nam',
      className: classInput.trim() || 'K20A SPAN',
    };
    onUpdateProfile(updated);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('u', cleanSlug);
      window.history.replaceState({}, '', url.toString());
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const allPages = [
    { id: 'index', name: 'Trang chủ · Giới thiệu (index.html)', staticFile: 'index.html' },
    { id: 'projects', name: 'Danh mục 6 Dự án (projects.html)', staticFile: 'projects.html' },
    ...PROJECTS_LIST.map((p) => ({
      id: p.id,
      name: `${p.title} (${p.id}.html)`,
      staticFile: `${p.id}.html`,
    })),
    { id: 'conclusion', name: 'Trang Tổng kết & Khai báo AI (conclusion.html)', staticFile: 'conclusion.html' },
  ];

  const completedChecksCount = SUBMISSION_CHECKLIST.filter((item) => submissionChecks[item.key]).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-blue-700 mb-2">
              Published Settings · Thiết lập Đường dẫn Công khai (URL) · Trạng thái: Đã xuất bản
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Thiết lập URL &amp; Xuất bản Portfolio (Published)
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-3xl">
              Cấu hình đường dẫn định danh (Custom URL Slug), thông tin sinh viên hiển thị ở chân trang và sao chép đường link công khai cho toàn bộ 9 trang của Portfolio <strong>{profile.fullName}</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigatePage('index')}
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span>Xem trang Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="/web_port/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở bản HTML tĩnh (/web_port)</span>
            </a>
          </div>
        </div>

        {/* Live Published URL Box */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>URL Công khai Chính thức (Published App URL)</span>
              </span>
              <span className="text-xs text-emerald-700 font-medium">Hoạt động · Công khai</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={fullPublishedUrl}
                aria-label="Published App URL"
                className="w-full px-3 py-2 text-xs font-mono-code bg-white border border-slate-200 rounded-lg text-slate-800 select-all focus:outline-none"
              />
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={fullPublishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở ngay URL</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(fullPublishedUrl, 'main-url')}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  {copiedKey === 'main-url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              * Đây là đường dẫn trực tiếp đang hoạt động. Bạn có thể bấm <strong>Mở ngay URL</strong> để mở tab mới hoặc bấm <strong>Sao chép</strong> để dán nộp bài.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>Đường dẫn Bản Gốc HTML Tĩnh (9 trang web_port)</span>
              </span>
              <a
                href="/assets/aistudio/web_port_1d65bfe7.zip"
                download="web_port_NguyenHungNam.zip"
                className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải tệp .ZIP</span>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={staticHtmlUrl}
                aria-label="Static HTML URL"
                className="w-full px-3 py-2 text-xs font-mono-code bg-white border border-slate-200 rounded-lg text-slate-800 select-all focus:outline-none"
              />
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/web_port/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở index.html</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(staticHtmlUrl, 'static-url')}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  {copiedKey === 'static-url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              * Bản HTML tĩnh lưu trữ trong thư mục <code className="font-mono-code">/web_port</code>, bấm <strong>Mở index.html</strong> để xem bản tĩnh gốc không qua React.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Custom URL Slug & Student Metadata Setup */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-600" />
                <span>1. Thiết lập Đường dẫn (URL Slug) &amp; Thông tin Nộp bài</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Đặt địa chỉ web ngắn gọn không dấu và cập nhật Mã sinh viên hiển thị đồng bộ trên tất cả 9 trang.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-5">
            <div>
              <label htmlFor="slug-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Đường dẫn tùy chỉnh (Custom URL Slug / Web Address)
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/15">
                <span className="px-3 py-2.5 text-xs font-mono-code text-slate-500 border-r border-slate-200 select-none whitespace-nowrap">
                  /?u=
                </span>
                <input
                  id="slug-input"
                  type="text"
                  value={slugInput}
                  onChange={(e) => setSlugInput(e.target.value)}
                  placeholder="portfolio-nguyen-hung-nam-k20a-span"
                  className="w-full px-3 py-2.5 text-sm font-mono-code bg-white text-slate-900 focus:outline-none"
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Gợi ý chuẩn tên miền:</span>
                {['portfolio-nguyen-hung-nam', 'nguyen-hung-nam-k20a-span', 'hungnam-sp-amnhac'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSlugInput(preset)}
                    className="underline hover:text-blue-600 font-mono-code"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fullname-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Họ và tên sinh viên
                </label>
                <input
                  id="fullname-input"
                  type="text"
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label htmlFor="studentid-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mã sinh viên
                </label>
                <input
                  id="studentid-input"
                  type="text"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  placeholder="Nhập mã SV..."
                  className="w-full px-3 py-2 text-sm font-mono-code border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label htmlFor="class-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Lớp hành chính
                </label>
                <input
                  id="class-input"
                  type="text"
                  value={classInput}
                  onChange={(e) => setClassInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Preview URLs across platforms */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="font-semibold text-slate-700">
                Xem trước địa chỉ URL sau khi thiết lập trên các nền tảng:
              </div>
              <div className="flex items-center justify-between gap-2 text-slate-600">
                <span>AI Studio Published URL:</span>
                <code className="font-mono-code text-slate-900 truncate max-w-[280px] sm:max-w-[360px]">
                  {fullPublishedUrl}
                </code>
              </div>
              <div className="flex items-center justify-between gap-2 text-slate-600">
                <span>Google Sites (Published URL):</span>
                <code className="font-mono-code text-slate-900">{googleSitesPreviewUrl}</code>
              </div>
              <div className="flex items-center justify-between gap-2 text-slate-600">
                <span>Netlify Drop Subdomain:</span>
                <code className="font-mono-code text-slate-900">{netlifyPreviewUrl}</code>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500">
                {savedNotice ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Đã lưu thiết lập URL và cập nhật toàn bộ Portfolio!
                  </span>
                ) : (
                  <span>Thay đổi được lưu tự động trên trình duyệt và áp dụng ngay.</span>
                )}
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                Lưu thiết lập URL &amp; Xuất bản
              </button>
            </div>
          </form>
        </section>

        {/* Right Column: Step-by-Step Platform URL Guide */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <span>2. Hướng dẫn vào phần Published để đặt URL</span>
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Chọn nền tảng bạn đang dùng để xem đúng vị trí nút <strong>Published / Thiết lập URL</strong>:
          </p>

          {/* Segmented Control */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg mb-5">
            {[
              { id: 'googlesites', label: 'Google Sites' },
              { id: 'aistudio', label: 'AI Studio' },
              { id: 'netlify', label: 'Netlify Drop' },
              { id: 'github', label: 'GitHub Pages' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGuideTab(tab.id as typeof activeGuideTab)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeGuideTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeGuideTab === 'googlesites' && (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="text-xs font-semibold text-slate-900">
                Cách vào phần Published để thiết lập URL trên Google Sites:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed">
                <li>
                  Ở góc trên bên phải giao diện Google Sites, bấm nút màu xanh <strong>Công bố (Publish)</strong> hoặc bấm mũi tên nhỏ cạnh nút <strong>Publish ▾</strong>.
                </li>
                <li>
                  Chọn <strong>Cài đặt công bố (Publish settings)</strong> để mở hộp thoại thiết lập URL.
                </li>
                <li>
                  Tại ô <strong>Địa chỉ web (Web address)</strong>, nhập đường dẫn định danh của bạn:{' '}
                  <code className="font-mono-code bg-slate-100 px-1.5 py-0.5 rounded text-slate-900">
                    {cleanSlug}
                  </code>
                </li>
                <li>
                  Tại mục <strong>Ai có thể xem trang web của tôi (Who can view my site)</strong>, bấm <strong>Quản lý (Manage)</strong> và chuyển sang <strong>Công khai (Public)</strong>.
                </li>
                <li>
                  Bấm <strong>Lưu (Save)</strong> rồi bấm <strong>Công bố (Publish)</strong>. Sau đó bấm biểu tượng mắt xích <strong>Sao chép đường liên kết của trang web đã công bố (Copy published site link)</strong> để lấy URL nộp bài.
                </li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'aistudio' && (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="text-xs font-semibold text-slate-900">
                Sử dụng trực tiếp đường dẫn Published trên hệ thống hiện tại:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed">
                <li>
                  Ứng dụng Portfolio của bạn đã được khởi chạy trực tiếp tại địa chỉ công khai:{' '}
                  <code className="font-mono-code bg-slate-100 px-1.5 py-0.5 rounded text-slate-900 break-all">
                    {currentOrigin}
                  </code>
                </li>
                <li>
                  Ở thanh công cụ phía trên bên phải màn hình, nhấn vào biểu tượng <strong>Share / Publish (Chia sẻ ứng dụng)</strong> và bật chế độ <strong>Public (Công khai)</strong>.
                </li>
                <li>
                  Sao chép đường dẫn <strong>Shared App URL</strong> ở ô phía trên để gửi cho giảng viên hoặc mở trên điện thoại.
                </li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'netlify' && (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="text-xs font-semibold text-slate-900">
                Cách đổi URL sau khi kéo thả thư mục lên Netlify Drop:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed">
                <li>
                  Tải tệp <code className="font-mono-code">web_port_1d65bfe7.zip</code> (hoặc giải nén thành thư mục <code className="font-mono-code">web_port</code>) rồi kéo thả vào <strong>app.netlify.com/drop</strong>.
                </li>
                <li>
                  Sau khi trang ở trạng thái <strong>Published</strong>, vào mục <strong>Site configuration &gt; Site details &gt; Change site name</strong>.
                </li>
                <li>
                  Nhập tên miền phụ: <code className="font-mono-code bg-slate-100 px-1.5 py-0.5 rounded">{cleanSlug}</code> để nhận ngay URL <code className="font-mono-code">{netlifyPreviewUrl}</code>.
                </li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'github' && (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="text-xs font-semibold text-slate-900">
                Cách lấy Published URL trên GitHub Pages:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed">
                <li>
                  Tạo repository công khai tên <code className="font-mono-code">{cleanSlug}</code> và tải toàn bộ tệp trong thư mục <code className="font-mono-code">web_port</code> lên.
                </li>
                <li>
                  Vào <strong>Settings &gt; Pages</strong> ở thanh bên trái.
                </li>
                <li>
                  Tại mục <strong>Build and deployment &gt; Branch</strong>, chọn nhánh <strong>main</strong> (thư mục <strong>/root</strong>) và bấm <strong>Save</strong>.
                </li>
                <li>
                  Sau 1 phút, khung <strong>Your site is live at...</strong> sẽ hiện đường link Published URL công khai của bạn.
                </li>
              </ol>
            </div>
          )}
        </section>
      </div>

      {/* Directory of All 9 Pages URLs + Pre-submission Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* All 9 Pages Links */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
            <Link2 className="w-5 h-5 text-blue-600" />
            <span>3. Danh sách URL trực tiếp của 9 trang trong Portfolio</span>
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Bấm vào tên trang để mở ngay hoặc sao chép đường dẫn riêng của từng bài tập.
          </p>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {allPages.map((item) => {
              const pageUrl = `${currentOrigin}/?page=${item.id}&u=${cleanSlug}`;
              const staticPageUrl = `${currentOrigin}/web_port/${item.staticFile}`;
              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => onNavigatePage(item.id)}
                      className="text-xs font-semibold text-slate-900 hover:text-blue-600 text-left block truncate"
                    >
                      {item.name}
                    </button>
                    <div className="text-[11px] font-mono-code text-slate-500 truncate mt-0.5">
                      {pageUrl}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(pageUrl, `page-${item.id}`)}
                      className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 whitespace-nowrap shrink-0 flex items-center gap-1"
                    >
                      {copiedKey === `page-${item.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                    <a
                      href={staticPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Mở trang HTML tĩnh"
                      className="px-2.5 py-1 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono-code text-slate-600 whitespace-nowrap shrink-0 flex items-center gap-1"
                    >
                      <span>{item.staticFile}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pre-Submission Checklist */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>4. Kiểm tra trước khi nộp URL</span>
            </h2>
            <span className="text-xs font-mono-code text-slate-600">
              {completedChecksCount}/{SUBMISSION_CHECKLIST.length} hoàn tất
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Danh mục rà soát bắt buộc theo hướng dẫn của học phần trước khi gửi đường link Published cho giảng viên:
          </p>

          <ul className="space-y-2.5">
            {SUBMISSION_CHECKLIST.map((item) => {
              const checked = !!submissionChecks[item.key];
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => onToggleSubmissionCheck(item.key)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors flex items-start gap-3 ${
                      checked
                        ? 'bg-blue-50/50 border-blue-200 text-slate-900'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-relaxed">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};
