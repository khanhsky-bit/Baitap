import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Globe,
  X,
  ExternalLink,
  Sliders,
} from 'lucide-react';
import {
  DEFAULT_PROFILE,
  PROJECTS_LIST,
  BAI6_CHECKLIST,
  SUBMISSION_CHECKLIST,
  StudentProfile,
} from './data/portfolioData';
import { PortfolioImage } from './components/PortfolioImage';
import { ProjectDetailView } from './components/ProjectDetailView';
import { PublishedUrlView } from './components/PublishedUrlView';

type PageId =
  | 'index'
  | 'projects'
  | 'bai1'
  | 'bai2'
  | 'bai3'
  | 'bai4'
  | 'bai5'
  | 'bai6'
  | 'conclusion'
  | 'published';

interface LightboxState {
  src: string;
  alt: string;
  caption?: string;
}

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile_v1');
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROFILE;
  });

  const [activePage, setActivePage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as PageId | null;
      if (
        pageParam &&
        [
          'index',
          'projects',
          'bai1',
          'bai2',
          'bai3',
          'bai4',
          'bai5',
          'bai6',
          'conclusion',
          'published',
        ].includes(pageParam)
      ) {
        return pageParam;
      }
    }
    return 'published';
  });

  const [bai6Checks, setBai6Checks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    BAI6_CHECKLIST.forEach((item) => {
      try {
        const val = localStorage.getItem(`chk-${item.key}`);
        initial[item.key] = val === null ? true : val === '1';
      } catch {
        initial[item.key] = true;
      }
    });
    return initial;
  });

  const [submissionChecks, setSubmissionChecks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SUBMISSION_CHECKLIST.forEach((item) => {
      try {
        const val = localStorage.getItem(`chk-${item.key}`);
        initial[item.key] = val === null ? true : val === '1';
      } catch {
        initial[item.key] = true;
      }
    });
    return initial;
  });

  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [copiedTopUrl, setCopiedTopUrl] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateProfile = (updated: StudentProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('portfolio_profile_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleNavigate = (page: string) => {
    const nextPage = page as PageId;
    setActivePage(nextPage);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', nextPage);
      url.searchParams.set('u', profile.customSlug);
      window.history.replaceState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBai6Check = (key: string) => {
    setBai6Checks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`chk-${key}`, next[key] ? '1' : '0');
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleToggleSubmissionCheck = (key: string) => {
    setSubmissionChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(`chk-${key}`, next[key] ? '1' : '0');
      } catch {
        // ignore
      }
      return next;
    });
  };

  const currentOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : profile.publishedUrl;

  const livePublishedUrl = `${currentOrigin}/?u=${profile.customSlug}`;

  const handleCopyPublishedUrl = () => {
    navigator.clipboard.writeText(livePublishedUrl);
    setCopiedTopUrl(true);
    setTimeout(() => setCopiedTopUrl(false), 2000);
  };

  const isProjectPage = ['projects', 'bai1', 'bai2', 'bai3', 'bai4', 'bai5', 'bai6'].includes(
    activePage
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      {/* Top Bar Contract: 1-row, 3-zone header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('index')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-600 transition-colors"
          >
            Portfolio {profile.fullName}
          </button>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => handleNavigate('index')}
              className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                activePage === 'index'
                  ? 'border-blue-600 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Giới thiệu
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('projects')}
              className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                isProjectPage
                  ? 'border-blue-600 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Dự án (6 Bài)
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('conclusion')}
              className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                activePage === 'conclusion'
                  ? 'border-blue-600 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Tổng kết
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('published')}
              className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                activePage === 'published'
                  ? 'border-blue-600 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Published · Thiết lập URL
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                activePage === 'published'
                  ? handleCopyPublishedUrl()
                  : handleNavigate('published')
              }
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              {activePage === 'published' ? (
                copiedTopUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã sao chép URL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép Published URL</span>
                  </>
                )
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5" />
                  <span>Thiết lập URL (Published)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sub-navigation bar */}
      <div className="bg-slate-100/80 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {[
              { id: 'index', label: 'Giới thiệu' },
              { id: 'projects', label: 'Tất cả Dự án' },
              { id: 'bai1', label: 'Bài 1' },
              { id: 'bai2', label: 'Bài 2' },
              { id: 'bai3', label: 'Bài 3' },
              { id: 'bai4', label: 'Bài 4' },
              { id: 'bai5', label: 'Bài 5' },
              { id: 'bai6', label: 'Bài 6' },
              { id: 'conclusion', label: 'Tổng kết' },
              { id: 'published', label: '⚙ Published URL' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activePage === item.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600">
            <span className="text-slate-500">URL công khai:</span>
            <code className="font-mono-code text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
              /?u={profile.customSlug}
            </code>
            <button
              type="button"
              onClick={handleCopyPublishedUrl}
              className="text-blue-600 hover:underline font-medium"
            >
              {copiedTopUrl ? 'Đã chép!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container (1200px desktop width) */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 md:py-10">
        {activePage === 'published' && (
          <PublishedUrlView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigatePage={handleNavigate}
            submissionChecks={submissionChecks}
            onToggleSubmissionCheck={handleToggleSubmissionCheck}
          />
        )}

        {activePage === 'index' && (
          <div className="space-y-10">
            {/* Split-Screen Hero per Portfolio Reference Guidelines */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-blue-700">Giới thiệu · About Me</span>
                      <span aria-hidden="true">·</span>
                      <span>{profile.university}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-slate-900 leading-[1.15]">
                      Xin chào, mình là {profile.fullName}
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                      Sinh viên ngành <strong>{profile.major}</strong>, lớp{' '}
                      <strong>{profile.className}</strong>, {profile.university}. Đây là Portfolio lưu giữ toàn bộ sản phẩm thực hành của học phần{' '}
                      <em className="font-serif-editorial text-slate-900">{profile.courseName}</em>.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleNavigate('projects')}
                      className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Xem 6 dự án học phần</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('conclusion')}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Đọc trang Tổng kết
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('published')}
                      className="px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Sliders className="w-3.5 h-3.5 text-blue-600" />
                      <span>Thiết lập URL Published</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  <div
                    onClick={() =>
                      setLightbox({
                        src: profile.avatarUrl,
                        alt: `Ảnh đại diện của ${profile.fullName}`,
                        caption: `${profile.fullName} – Lớp ${profile.className} – Ngành ${profile.major}`,
                      })
                    }
                    className="w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 cursor-zoom-in shadow-sm"
                  >
                    <img
                      src={profile.avatarUrl}
                      alt={`Ảnh đại diện của ${profile.fullName}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Full-width KPI & Student Metadata Strip below Hero Split */}
              <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-slate-500">Họ và tên sinh viên</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{profile.fullName}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Mã SV · Lớp</div>
                  <div className="text-sm font-bold font-mono-code text-slate-900 mt-0.5">
                    {profile.studentId} · {profile.className}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Chuyên ngành đào tạo</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{profile.major}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Hoàn thành học phần</div>
                  <div className="text-sm font-bold font-mono-code text-blue-700 mt-0.5">
                    6/6 Bài tập · 9 Trang
                  </div>
                </div>
              </div>
            </section>

            {/* Personal Info & Objectives Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Thông tin cá nhân</h2>
                <dl className="divide-y divide-slate-200 text-sm">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Họ và tên</dt>
                    <dd className="font-semibold text-slate-900 text-right">{profile.fullName}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Mã sinh viên</dt>
                    <dd className="font-mono-code font-semibold text-slate-900 text-right">
                      {profile.studentId}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Ngành học</dt>
                    <dd className="font-semibold text-slate-900 text-right">{profile.major}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Lớp</dt>
                    <dd className="font-semibold text-slate-900 text-right">{profile.className}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Sở thích</dt>
                    <dd className="text-slate-800 text-right">{profile.hobbies}</dd>
                  </div>
                </dl>
              </section>

              <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">
                    Mục tiêu học tập và định hướng phát triển
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                    <li>
                      Nắm vững kiến thức nền tảng về công nghệ số: quản lý tệp, khai thác thông tin, trí tuệ nhân tạo, hợp tác trực tuyến, sáng tạo nội dung số và liêm chính học thuật.
                    </li>
                    <li>
                      Sử dụng công nghệ và AI một cách có trách nhiệm để phục vụ học tập và sáng tạo trong lĩnh vực Sư phạm Âm nhạc.
                    </li>
                    <li>
                      Định hướng sau khi tốt nghiệp: trở thành giáo viên âm nhạc, kèm kế hoạch phát triển kỹ năng số trong 1–2 năm tới: học sử dụng phần mềm soạn nhạc và thu âm, biết làm video bài giảng, và dùng AI có trách nhiệm để hỗ trợ soạn giáo án.
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    Mục tiêu của Portfolio này
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 leading-relaxed">
                    <li>Thể hiện các kỹ năng số đã học qua 6 bài tập của học phần.</li>
                    <li>
                      Lưu trữ sản phẩm học tập tại một nơi để dễ truy cập và chia sẻ với giảng viên, bạn học và nhà tuyển dụng sau này.
                    </li>
                    <li>
                      Rèn thói quen ghi nhận quá trình học, tự đánh giá và khai báo minh bạch việc sử dụng AI.
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Sitemap Structure Section */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Cấu trúc Portfolio (9 Trang)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sơ đồ kiến trúc thông tin từ trang Giới thiệu, Danh mục Dự án (Bài 1 – Bài 6) đến trang Tổng kết.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('projects')}
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Khám phá chi tiết 6 bài tập</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <PortfolioImage
                src="/assets/fig_sitemap.png"
                alt="Sơ đồ cấu trúc các trang của Portfolio"
                caption="Sơ đồ cấu trúc các trang của Portfolio Nguyễn Hưng Nam"
                onExpand={(src, alt, caption) => setLightbox({ src, alt, caption })}
              />
            </section>
          </div>
        )}

        {activePage === 'projects' && (
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
              <div className="text-xs text-slate-500 flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-700">Dự án · Projects</span>
                <span aria-hidden="true">·</span>
                <span>Học phần: {profile.courseName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-code">Tổng điểm: 4,0 điểm</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Sáu bài tập thực hành của học phần
              </h1>
              <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
                Mỗi bài tập là một trang chuyên sâu gồm mục tiêu, quy trình thực hiện, bảng dữ liệu đối chứng, hình chụp màn hình thực tế và khai báo minh bạch việc sử dụng AI.
              </p>
            </section>

            {/* 3-Column Editorial Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS_LIST.map((proj) => (
                <article
                  key={proj.id}
                  onClick={() => handleNavigate(proj.id)}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer hover:border-blue-600/50 hover:shadow-md transition-all duration-150"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200 overflow-hidden">
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-blue-700">{proj.num}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-code">Điểm tối đa: {proj.maxPoints}</span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {proj.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">{proj.chapter}</p>
                      <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Xem chi tiết sản phẩm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {['bai1', 'bai2', 'bai3', 'bai4', 'bai5', 'bai6'].includes(activePage) && (
          <ProjectDetailView
            projectId={activePage}
            profile={profile}
            onNavigate={handleNavigate}
            onExpandImage={(src, alt, caption) => setLightbox({ src, alt, caption })}
            bai6Checks={bai6Checks}
            onToggleBai6Check={handleToggleBai6Check}
          />
        )}

        {activePage === 'conclusion' && (
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
              <div className="text-xs text-slate-500 flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-700">Tổng kết · Conclusion</span>
                <span aria-hidden="true">·</span>
                <span>{profile.fullName}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.className}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Nhìn lại hành trình làm Portfolio
              </h1>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-3">
                <h2 className="text-xl font-bold text-slate-900">Trải nghiệm và cảm nhận cá nhân</h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Lúc đầu mình phải mò từng chút một để làm Portfolio vì mọi thứ còn rất mới. Nhưng càng học thêm và biết nhiều hơn, mình càng thấy việc xây dựng một trang web của riêng mình thật thú vị. Sau mỗi bài tập, mình tự tin hơn với công nghệ số và biết cách dùng AI như một công cụ hỗ trợ.
                </p>
              </section>

              <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-3">
                <h2 className="text-xl font-bold text-slate-900">
                  Điều tâm đắc nhất và những thách thức
                </h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  <strong>Tâm đắc nhất:</strong> Mình đã hoàn thành được một trang web Portfolio hoàn chỉnh của riêng mình, có đủ các trang và sản phẩm của từng bài tập.
                </p>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  <strong>Thách thức:</strong> Lúc đầu mình chưa quen với ngôn ngữ code (HTML) nên rất bối rối khi chỉnh sửa. Mình vượt qua bằng cách thử từng bước nhỏ, kiểm tra lại trên trình duyệt và sửa dần cho đến khi chạy đúng.
                </p>
              </section>
            </div>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Kiến thức và kỹ năng quan trọng nhất đã tiếp thu
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <th className="p-3.5 font-semibold w-64">Chương</th>
                      <th className="p-3.5 font-semibold">Kiến thức và kỹ năng chính</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-medium">1. Máy tính, thiết bị ngoại vi</td>
                      <td className="p-3.5">
                        Tổ chức thư mục, đặt tên tệp có hệ thống, phân biệt Copy, Cut, Delete và khôi phục tệp
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">2. Khai thác dữ liệu, thông tin</td>
                      <td className="p-3.5">
                        Tìm kiếm bằng toán tử nâng cao, đánh giá độ tin cậy nguồn, trích dẫn Harvard
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">3. Trí tuệ nhân tạo</td>
                      <td className="p-3.5">
                        Viết prompt có vai trò, ngữ cảnh, định dạng; dùng chain-of-thought, few-shot; kiểm chứng kết quả
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">4. Giao tiếp, hợp tác số</td>
                      <td className="p-3.5">
                        Tổ chức họp trực tuyến, ghi biên bản, quản lý nhiệm vụ nhóm
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">5. Sáng tạo nội dung số</td>
                      <td className="p-3.5">
                        Dùng AI tạo sinh hỗ trợ thiết kế, biên tập và khai báo việc sử dụng AI
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">6. An toàn, liêm chính học thuật</td>
                      <td className="p-3.5">
                        Bộ nguyên tắc sử dụng AI có trách nhiệm, bảo vệ dữ liệu cá nhân, tôn trọng bản quyền
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Điều quan trọng nhất mình rút ra: công nghệ và AI chỉ thật sự hữu ích khi mình chủ động học, tự kiểm tra và chịu trách nhiệm với sản phẩm của mình. Kiên nhẫn làm từng bước nhỏ sẽ giúp mình hoàn thành được những việc ban đầu tưởng là khó.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Khai báo sử dụng AI trong Portfolio
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <th className="p-3.5 font-semibold">Công cụ</th>
                      <th className="p-3.5 font-semibold">Mục đích</th>
                      <th className="p-3.5 font-semibold">Trang áp dụng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-medium">Claude (Anthropic)</td>
                      <td className="p-3.5">Gợi ý bố cục, soạn nháp nội dung, chỉnh sửa ngôn ngữ</td>
                      <td className="p-3.5">Các trang bài tập (Bài 1 – Bài 4)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">Gemini</td>
                      <td className="p-3.5">Tạo hình minh họa áp phích và gợi ý dàn ý bài viết</td>
                      <td className="p-3.5">Bài 5</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium">ChatGPT</td>
                      <td className="p-3.5">Gợi ý cách diễn đạt bộ 8 nguyên tắc AI có trách nhiệm</td>
                      <td className="p-3.5">Bài 6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500">
                Phần cảm nhận và tự đánh giá do chính mình ({profile.fullName}) tự viết.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Liên kết đến các trang bài tập đã hoàn thành
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PROJECTS_LIST.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleNavigate(p.id)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-600/50 bg-slate-50/60 hover:bg-white text-left transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{p.chapter}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Quiet, Complete Academic Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-900">
              {profile.fullName} – Mã sinh viên: {profile.studentId} – Lớp: {profile.className} – Học phần: {profile.courseName}
            </p>
            <p className="text-slate-500">
              {profile.university} – {profile.faculty}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('published')}
              className="hover:text-blue-600 font-medium underline"
            >
              Thiết lập URL (Published)
            </button>
            <a
              href="/web_port/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 font-medium flex items-center gap-1"
            >
              <span>Bản HTML gốc (/web_port)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* High-Resolution Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs p-4 sm:p-8 flex flex-col items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-slate-900 text-white">
              <div className="text-xs sm:text-sm font-medium truncate">
                {lightbox.caption || lightbox.alt}
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Đóng hộp thoại ảnh"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
