export interface StudentProfile {
  fullName: string;
  studentId: string;
  major: string;
  className: string;
  university: string;
  faculty: string;
  courseName: string;
  hobbies: string;
  avatarUrl: string;
  customSlug: string;
  publishedUrl: string;
  customDomain: string;
}

export interface FigureItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectSummary {
  id: string;
  num: string;
  chapter: string;
  title: string;
  shortTitle: string;
  maxPoints: string;
  summary: string;
  coverImage: string;
  tools: string[];
  aiDeclaration: string;
}

export const DEFAULT_PROFILE: StudentProfile = {
  fullName: 'Nguyễn Hưng Nam',
  studentId: '2552210033',
  major: 'Sư phạm Âm nhạc',
  className: 'K20A SPAN',
  university: 'Trường Đại học Sư phạm Nghệ thuật Trung ương (NUAE)',
  faculty: 'Khoa Giáo dục Đại cương',
  courseName: 'Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo',
  hobbies: 'Nghe nhạc, xem phim, chơi nhạc cụ, ca hát',
  avatarUrl: '/assets/avatar.png',
  customSlug: 'portfolio-nguyen-hung-nam-k20a-span',
  publishedUrl: 'https://ais-pre-ilgmdsihocrcy7dok36r5a-841847835694.asia-east1.run.app',
  customDomain: 'nguyenhungnam-portfolio.edu.vn',
};

export const PROJECTS_LIST: ProjectSummary[] = [
  {
    id: 'bai1',
    num: 'Bài 1',
    chapter: 'Chương 1: Máy tính và các thiết bị ngoại vi',
    title: 'Bài 1: Thao tác cơ bản với tệp tin và thư mục',
    shortTitle: 'Quản lý tệp tin & thư mục',
    maxPoints: '0,5 điểm',
    summary:
      'Thực hành thành thạo việc tạo, đổi tên, sao chép, di chuyển, xóa và khôi phục tệp tin trên Windows File Explorer; thiết lập cấu trúc thư mục tối ưu và quy tắc đặt tên tệp cho toàn bộ học phần.',
    coverImage: '/assets/b1_anh1.png',
    tools: ['Windows File Explorer', 'Recycle Bin', 'Snipping Tool (Win + Shift + S)'],
    aiDeclaration:
      'Sử dụng Claude (Anthropic) để gợi ý cách trình bày bảng quy tắc đặt tên tệp khoa học; toàn bộ thao tác thực hành và chụp màn hình trên máy tính cá nhân do sinh viên tự thực hiện.',
  },
  {
    id: 'bai2',
    num: 'Bài 2',
    chapter: 'Chương 2: Khai thác dữ liệu và thông tin',
    title: 'Bài 2: Tìm kiếm và đánh giá thông tin học thuật',
    shortTitle: 'Tìm kiếm & đánh giá học thuật',
    maxPoints: '0,75 điểm',
    summary:
      'Xây dựng chiến lược tìm kiếm với toán tử nâng cao (allintitle, OR, filetype:pdf, site:) về chủ đề "Ứng dụng trí tuệ nhân tạo trong giáo dục nghệ thuật", đánh giá 11 nguồn học thuật theo 5 tiêu chí và trích dẫn chuẩn Harvard.',
    coverImage: '/assets/b2_anh1.png',
    tools: ['Google Scholar', 'Google Search nâng cao', 'Vietnam Journals Online (VJOL)', 'UNESCO & arXiv'],
    aiDeclaration:
      'Mình dùng Claude (Anthropic) để gợi ý hướng chọn chủ đề, từ khóa tìm kiếm và khung bảng đánh giá nguồn. Phần tìm kiếm trên Google Scholar, đọc tóm tắt, kiểm tra số trích dẫn và quyết định chọn hay loại từng tài liệu do mình tự thực hiện.',
  },
  {
    id: 'bai3',
    num: 'Bài 3',
    chapter: 'Chương 3: Tổng quan về trí tuệ nhân tạo',
    title: 'Bài 3: Viết Prompt hiệu quả cho các tác vụ học tập',
    shortTitle: 'Kỹ thuật viết Prompt (Prompt Engineering)',
    maxPoints: '0,75 điểm',
    summary:
      'Thiết kế và thử nghiệm 9 phiên bản prompt (Cơ bản, Cải tiến, Nâng cao) cho 3 tác vụ: tóm tắt tài liệu học thuật, giải thích mô hình khuếch tán (Diffusion Model) và tạo bộ câu hỏi trắc nghiệm ôn tập.',
    coverImage: '/assets/b3_anh1.png',
    tools: ['Claude (Anthropic) / ChatGPT', 'Role Prompting', 'Chain-of-Thought & Few-Shot'],
    aiDeclaration:
      'Sử dụng Claude (Anthropic) để chạy thử nghiệm đối chứng 9 phiên bản prompt trong các phiên hội thoại độc lập; phần phân tích so sánh 4 tiêu chí và rút ra 9 nguyên tắc do sinh viên tự tổng hợp.',
  },
  {
    id: 'bai4',
    num: 'Bài 4',
    chapter: 'Chương 4: Giao tiếp và hợp tác trong môi trường số',
    title: 'Bài 4: Sử dụng công cụ hợp tác trực tuyến cho dự án nhóm',
    shortTitle: 'Hợp tác trực tuyến & Quản lý nhóm',
    maxPoints: '0,5 điểm',
    summary:
      'Lập kế hoạch, chương trình nghị sự 25 phút, điều phối cuộc họp trên Google Meet, ghi biên bản và quản lý tiến độ nhiệm vụ thiết kế poster nhóm bằng bảng Trello cùng Google Drive.',
    coverImage: '/assets/b4_anh1.png',
    tools: ['Google Meet', 'Trello Kanban', 'Google Docs & Google Drive', 'Claude (Anthropic)'],
    aiDeclaration:
      'Mình dùng Claude (Anthropic) để gợi ý khung kế hoạch và biên bản cuộc họp. Nội dung cuộc họp, các quyết định, phân công và phần đánh giá do nhóm và mình tự thực hiện.',
  },
  {
    id: 'bai5',
    num: 'Bài 5',
    chapter: 'Chương 5: Sáng tạo nội dung số',
    title: 'Bài 5: Sử dụng AI tạo sinh để hỗ trợ sáng tạo nội dung',
    shortTitle: 'Sáng tạo Áp phích & Bài viết cùng AI',
    maxPoints: '1,0 điểm',
    summary:
      'Sáng tạo bộ sản phẩm áp phích (poster) truyền thông và bài viết ngắn với thông điệp "Nghệ thuật và AI: bạn đồng hành, không phải người thay thế", kết hợp tạo hình minh họa và biên tập đồ họa.',
    coverImage: '/assets/b5_anh1.png',
    tools: ['Gemini (Tạo ảnh & Dàn ý)', 'Canva (Biên tập & Typography)'],
    aiDeclaration:
      'Mình dùng Gemini để tạo hình minh họa và soạn nháp bài viết ngắn. Mình tự viết prompt, chọn phương án, chỉnh sửa giọng văn, kiểm tra nội dung và hoàn thiện áp phích.',
  },
  {
    id: 'bai6',
    num: 'Bài 6',
    chapter: 'Chương 6: An toàn và liêm chính học thuật trong môi trường số',
    title: 'Bài 6: Sử dụng AI có trách nhiệm trong học tập và nghiên cứu',
    shortTitle: 'Bộ 8 nguyên tắc AI có trách nhiệm',
    maxPoints: '0,5 điểm',
    summary:
      'Xây dựng bộ 8 nguyên tắc cá nhân về sử dụng AI có trách nhiệm (Minh bạch, Tự chủ, Kiểm chứng, Bảo vệ dữ liệu, Bản quyền, Công bằng văn hóa, Học thật, Tuân thủ) kèm Infographic và bảng tự kiểm tra tương tác.',
    coverImage: '/assets/b6_anh1.png',
    tools: ['Hướng dẫn UNESCO (2023)', 'Quy định học phần NUAE', 'ChatGPT (Hỗ trợ diễn đạt)'],
    aiDeclaration:
      'Mình dùng ChatGPT để gợi ý cách diễn đạt và sắp xếp các nguyên tắc. Mình tự đọc các nguồn ở Bài 2, chọn và chỉnh sửa từng nguyên tắc cho phù hợp với bản thân, đồng thời tự làm bảng tự kiểm tra.',
  },
];

export const BAI6_CHECKLIST = [
  {
    key: 'bai6-0',
    label: 'Mình đã ghi rõ công cụ AI và mục đích sử dụng trong từng bài.',
  },
  {
    key: 'bai6-1',
    label: 'Phần cảm nhận và tự đánh giá do chính mình viết.',
  },
  {
    key: 'bai6-2',
    label: 'Mình đã đối chiếu số liệu và tài liệu tham khảo với nguồn gốc.',
  },
  {
    key: 'bai6-3',
    label: 'Không có thông tin cá nhân nhạy cảm trên Portfolio.',
  },
  {
    key: 'bai6-4',
    label: 'Ảnh và tư liệu của người khác đều có nguồn.',
  },
  {
    key: 'bai6-5',
    label: 'Các liên kết tệp đều ở chế độ xem công khai và không bị hỏng.',
  },
  {
    key: 'bai6-6',
    label: 'Mình có thể giải thích lại bất kỳ phần nào của sản phẩm nếu giảng viên vấn đáp.',
  },
];

export const SUBMISSION_CHECKLIST = [
  {
    key: 'sub-incognito',
    label: 'Mở link Published URL bằng cửa sổ ẩn danh (Incognito) để chắc chắn không cần đăng nhập.',
  },
  {
    key: 'sub-mobile',
    label: 'Mở thử đường dẫn Portfolio trên điện thoại di động để kiểm tra bố cục hiển thị.',
  },
  {
    key: 'sub-drive',
    label: 'Mọi tệp đính kèm trên Google Drive / OneDrive đã cấp quyền xem công khai (Anyone with the link).',
  },
  {
    key: 'sub-footer',
    label: 'Chân trang (Footer) có đầy đủ Họ và tên, Mã sinh viên, Lớp, Tên học phần và Tên trường.',
  },
  {
    key: 'sub-deadline',
    label: 'Cam kết không chỉnh sửa nội dung sau hạn nộp bài chính thức.',
  },
];
