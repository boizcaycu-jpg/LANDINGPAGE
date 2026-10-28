"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Award,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  BookOpen,
  BarChart3,
  Users,
  ExternalLink,
  Flame,
  Lock,
  Unlock,
  Layers,
  XCircle,
  RotateCcw,
  Star,
  Check,
  ChevronDown
} from "lucide-react";

// ==========================================
// 1. BI-DIRECTIONAL SCROLL REVEAL COMPONENT
// ==========================================
interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "slide-left" | "slide-right" | "zoom-pop";
  delay?: "delay-0" | "delay-75" | "delay-150" | "delay-200" | "delay-300" | "delay-500";
  className?: string;
}

function ScrollReveal({
  children,
  variant = "fade-up",
  delay = "delay-0",
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bi-directional: turns true on enter, turns false on leave!
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentEl = ref.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-up":
        return isVisible
          ? "opacity-100 translate-y-0 scale-100 blur-0"
          : "opacity-0 translate-y-12 scale-[0.96] blur-[4px]";
      case "slide-left":
        return isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 -translate-x-14 scale-95";
      case "slide-right":
        return isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-14 scale-95";
      case "zoom-pop":
        return isVisible
          ? "opacity-100 scale-100 rotate-0"
          : "opacity-0 scale-75 rotate-1";
      default:
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${delay} ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// 2. ANIMATED NUMBER COUNTER COMPONENT
// ==========================================
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ target, suffix = "", duration = 1500 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setCount(0); // Reset for bi-directional replay
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const stepTime = 16;
    const totalSteps = Math.floor(duration / stepTime);
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-black">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ==========================================
// CONSTANTS & STATIC DATA
// ==========================================
const EXTERNAL_LOGIN_URL = "https://caculus-web-thpt.vercel.app/login";
const ZALO_GROUP_URL = "https://zalo.me/g/mw6rrjaosw86oamzaxy1";
const YOUTUBE_URL = "https://www.youtube.com/@siiuuuu77777";
const HOTLINE = "0767588269";
const EMAIL = "support.caculus.edu.vn@gmail.com";

const GRADE_12_TOPICS = [
  "01. Cấp số cộng & Cấp số nhân",
  "02. Khảo sát & Vẽ đồ thị hàm số",
  "03. Toán tối ưu thực tế",
  "04. Hàm số Mũ & Lôgarit",
  "05. Hình học Không gian",
  "06. Thể tích Khối đa diện",
  "07. Nguyên hàm & Tích phân",
  "08. Thống kê ghép nhóm",
  "09. Tọa độ Oxyz",
  "10. Xác suất có điều kiện Bayes",
];

const STUDENT_ACHIEVEMENTS = [
  "🔥 Đề 01 Giữa Kì 1 Đang Mở Miễn Phí",
  "⚡ Chuẩn 3 Phần: 12 Trắc nghiệm - 4 Đúng/Sai - 6 Trả lời ngắn",
  "✨ Đầy Đủ Đáp Án & Hướng Dẫn Giải Chi Tiết",
  "🏆 Bảng Xếp Hạng Đua Top Toàn Quốc",
  "💎 Kích Hoạt VIP 49K Học Trọn Năm 12",
  "⏱️ Đồng Hồ Bấm Giờ Mô Phỏng Phòng Thi 90 Phút",
];

const STAGES = [
  {
    id: 1,
    title: "Chặng 1: Giữa Kì 1",
    range: "Đề 01 – 05",
    badge: "Đang mở Đề 01 Miễn phí",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Khảo sát hàm số, cực trị, tiệm cận, GTLN-GTNN & Cấp số cộng/nhân chuẩn GDPT 2018.",
    exams: [
      { id: "gk1-01", name: "Đề Thi Khảo Sát Giữa Kì 1 - Số 01", isFree: true, qCount: 22, time: "90p" },
      { id: "gk1-02", name: "Đề Thi Khảo Sát Giữa Kì 1 - Số 02", isFree: false, qCount: 22, time: "90p" },
      { id: "gk1-03", name: "Đề Chuyên Đề Cực Trị & Đồ Thị Hàm Số", isFree: false, qCount: 22, time: "90p" },
      { id: "gk1-04", name: "Đề Vận Dụng Cao Toán Tối Ưu Thực Tế", isFree: false, qCount: 22, time: "90p" },
      { id: "gk1-05", name: "Đề Tổng Ôn Giữa Kì 1 Chuẩn Cấu Trúc 3 Phần", isFree: false, qCount: 22, time: "90p" },
    ],
  },
  {
    id: 2,
    title: "Chặng 2: Học Kì 1",
    range: "Đề 06 – 10",
    badge: "Ôn tập học bạ HK1",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    description: "Mũ - Lôgarit, Khối đa diện, Thể tích, Thống kê ghép nhóm & Toàn bộ kiến thức HK1.",
    exams: [
      { id: "hk1-06", name: "Đề Thi Học Kì 1 - Số 01 Chuẩn Ma Trận", isFree: false, qCount: 22, time: "90p" },
      { id: "hk1-07", name: "Đề Thi Học Kì 1 - Số 02 Chuyên Sâu", isFree: false, qCount: 22, time: "90p" },
      { id: "hk1-08", name: "Đề Chuyên Đề Hàm Số Mũ & Logarit", isFree: false, qCount: 22, time: "90p" },
      { id: "hk1-09", name: "Đề Chuyên Đề Thể Tích Khối Đa Diện", isFree: false, qCount: 22, time: "90p" },
      { id: "hk1-10", name: "Đề Bứt Phá Điểm 9+ Học Kì 1", isFree: false, qCount: 22, time: "90p" },
    ],
  },
  {
    id: 3,
    title: "Chặng 3: Giữa Kì 2",
    range: "Đề 11 – 15",
    badge: "Nguyên hàm & Oxyz",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    description: "Nguyên hàm, Tích phân và Ứng dụng hình học, Hệ tọa độ Oxyz trong không gian 3D.",
    exams: [
      { id: "gk2-11", name: "Đề Thi Giữa Kì 2 - Số 01", isFree: false, qCount: 22, time: "90p" },
      { id: "gk2-12", name: "Đề Chuyên Đề Tích Phân & Diện Tích Hình Phẳng", isFree: false, qCount: 22, time: "90p" },
      { id: "gk2-13", name: "Đề Chuyên Đề Phương Trình Mặt Phẳng & Đường Thẳng Oxyz", isFree: false, qCount: 22, time: "90p" },
      { id: "gk2-14", name: "Đề Ứng Dụng Tích Phân Vào Vật Lý & Đời Sống", isFree: false, qCount: 22, time: "90p" },
      { id: "gk2-15", name: "Đề Tổng Ôn Giữa Kì 2 Chuẩn Phân Hóa", isFree: false, qCount: 22, time: "90p" },
    ],
  },
  {
    id: 4,
    title: "Chặng 4: Cuối Kì 2",
    range: "Đề 16 – 20",
    badge: "Tổng ôn lớp 12",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    description: "Xác suất có điều kiện, Công thức Bayes, Hoàn thành toàn diện kiến thức Lớp 12.",
    exams: [
      { id: "ck2-16", name: "Đề Thi Học Kì 2 - Số 01 Toàn Diện", isFree: false, qCount: 22, time: "90p" },
      { id: "ck2-17", name: "Đề Chuyên Đề Xác Suất Có Điều Kiện & Sơ Đồ Cây", isFree: false, qCount: 22, time: "90p" },
      { id: "ck2-18", name: "Đề Chuyên Đề Mặt Cầu & Vị Trí Tương Đối Oxyz", isFree: false, qCount: 22, time: "90p" },
      { id: "ck2-19", name: "Đề Thi Thử Học Kì 2 Chuẩn Điểm 10", isFree: false, qCount: 22, time: "90p" },
      { id: "ck2-20", name: "Đề Khảo Sát Toàn Diện Toán 12 Cả Năm", isFree: false, qCount: 22, time: "90p" },
    ],
  },
  {
    id: 5,
    title: "Chặng 5: Tốt Nghiệp THPT",
    range: "Đề 21 – 30+",
    badge: "Thực chiến 9+ cấu trúc mới",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    description: "Bộ đề tinh hoa thực chiến tổng hợp, quét sạch bẫy đề thi, rèn bản lĩnh đạt điểm 9.6 - 10.",
    exams: [
      { id: "tn-21", name: "Đề Thi Thử Tốt Nghiệp THPT 2026 - Đề Số 01", isFree: false, qCount: 22, time: "90p" },
      { id: "tn-22", name: "Đề Thi Thử Tốt Nghiệp THPT 2026 - Đề Số 02", isFree: false, qCount: 22, time: "90p" },
      { id: "tn-23", name: "Đề Thi Thử Dự Đoán Ma Trận Mới - Đề Số 03", isFree: false, qCount: 22, time: "90p" },
      { id: "tn-24", name: "Đề Chuyên Biệt Quét Sạch Bẫy Trả Lời Ngắn", isFree: false, qCount: 22, time: "90p" },
      { id: "tn-25", name: "Đề Đỉnh Cao 9.8+ Dành Cho Thủ Khoa", isFree: false, qCount: 22, time: "90p" },
    ],
  },
];

const SOCIAL_PROOFS = [
  "⚡ Vũ Hoàng Nam (THPTQG_082) vừa hoàn thành Đề Giữa Kì 1 Số 02 — 9.4 điểm",
  "💎 Trần Khánh Linh vừa mở khóa Gói VIP 49K Toán 12 cả năm",
  "🔥 Lê Minh Đức (THPTQG_119) vừa vươn lên Top 3 Bảng xếp hạng tuần",
  "✨ Nguyễn Thảo Nhi vừa đạt 10.0 Đề Chuyên Đề 01: Khảo Sát Hàm Số",
  "🚀 Đặng Quốc Hưng vừa kích hoạt Combo Đôi Bạn 79K",
];

const FAQS = [
  {
    q: "Cấu trúc đề thi Tốt nghiệp THPT môn Toán 2026 có gì mới?",
    a: "Đề thi Toán 12 theo chương trình GDPT 2018 gồm 3 phần với 22 câu trong 90 phút: Phần I gồm 12 câu trắc nghiệm 4 lựa chọn (3.0 điểm); Phần II gồm 4 câu trắc nghiệm Đúng/Sai với thang điểm lũy tiến (4.0 điểm); Phần III gồm 6 câu trả lời ngắn điền số (3.0 điểm). CACULUS mô phỏng chính xác 100% cấu trúc này.",
  },
  {
    q: "Gói VIP 49.000đ của CACULUS THPTQG bao gồm những gì?",
    a: "Gói VIP 49.000đ mở khóa toàn bộ 40 đề thi và chuyên đề từ Giữa Kì 1, Học Kì 1, Giữa Kì 2, Cuối Kì 2 đến Tốt Nghiệp THPT, không giới hạn lượt thi thử trong cả năm học, tích hợp đáp án và hướng dẫn giải chi tiết từng bước cùng bảng xếp hạng thi đua toàn quốc.",
  },
  {
    q: "Có được làm thử đề thi miễn phí trước khi đăng ký không?",
    a: "Có. CACULUS THPTQG luôn mở Đề 01 Giữa Kì 1 hoàn toàn miễn phí cho tất cả học sinh trải nghiệm phòng thi trực tuyến bấm giờ, chấm điểm tự động và xem hướng dẫn giải chi tiết mà không cần trả bất kỳ khoản phí nào.",
  },
  {
    q: "Kích hoạt tài khoản VIP 49K như thế nào và mất bao lâu?",
    a: "Sau khi đăng nhập tài khoản tại https://caculus-web-thpt.vercel.app/login, bạn quét mã QR chuyển khoản 49.000đ với nội dung tên tài khoản. Sau đó nhắn tin qua nhóm Zalo VIP hoặc Hotline 0767588269, admin hỗ trợ kích hoạt tức thì chỉ trong vòng 2 đến 5 phút.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function LandingPage() {
  // Simulator State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [aiText, setAiText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fullExplanation =
    "✨ Hướng Dẫn Giải Chi Tiết: Ta có đạo hàm y' = 3x² - 6x. Cho y' = 0 ⇔ 3x(x - 2) = 0 ⇔ x = 0 hoặc x = 2. Dựa vào bảng biến thiên hoặc dấu của đạo hàm cấp hai y'' = 6x - 6: Tại x = 0 ta có y''(0) = -6 < 0 nên hàm số đạt cực đại tại điểm x = 0. Giá trị cực đại tương ứng của hàm số là y_CĐ = f(0) = 0³ - 3(0)² + 2 = 2. Chọn đáp án chính xác là B.";

  // Countdown timer in Simulator (89:59 down)
  const [secondsLeft, setSecondsLeft] = useState(89 * 60 + 59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 90 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Typewriter effect when option chosen
  const handleSelectOption = (opt: string) => {
    setSelectedOption(opt);
    setAiText("");
    setIsTyping(true);
  };

  useEffect(() => {
    if (!isTyping) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullExplanation.length) {
        setAiText(fullExplanation.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isTyping]);

  // Social Proof Cycling (every 6 seconds)
  const [socialProofIndex, setSocialProofIndex] = useState(0);
  const [socialVisible, setSocialVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialVisible(false);
      setTimeout(() => {
        setSocialProofIndex((prev) => (prev + 1) % SOCIAL_PROOFS.length);
        setSocialVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Stage Switcher
  const [activeStageId, setActiveStageId] = useState(1);
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* ========================================== */}
      {/* SECTION 1: AMBIENT AURORA ORBS & NAVBAR    */}
      {/* ========================================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Blue Orb */}
        <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent blur-[120px] animate-float-slow" />
        {/* Cyan Orb */}
        <div className="absolute top-[25%] right-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-[110px] animate-pulse" />
        {/* Purple/Indigo Orb */}
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-indigo-700/15 via-purple-600/10 to-transparent blur-[140px] animate-float-slow" />
      </div>

      {/* Sticky Liquid Glass Navbar */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-5 sm:px-7 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#070d1e] rounded-[11px] flex items-center justify-center font-black text-white text-lg tracking-wider">
                C
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                CACULUS <span className="text-blue-500">THPTQG</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Toán 12 • 2026 Chuẩn Mới
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
            <a
              href="#trai-nghiem"
              className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Thi Thử Live
            </a>
            <a
              href="#lo-trinh"
              className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Lộ Trình 40 Đề
            </a>
            <a
              href="#uu-diem"
              className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Tính Năng Độc Bản
            </a>
            <a
              href="#bang-gia"
              className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Bảng Giá VIP 49K
            </a>
            <a
              href="#faq"
              className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Hỏi Đáp
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <a
              href={ZALO_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold transition-all"
            >
              <span>Nhóm Zalo 24/7</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={EXTERNAL_LOGIN_URL}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/30"
            >
              <span>Vào Phòng Thi</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* SECTION 2: HERO & LIVE STATS BAR          */}
      {/* ========================================== */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-8 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <ScrollReveal variant="fade-up" delay="delay-0">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-bold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Chương Trình GDPT 2018 Mới • Kỳ Thi Tốt Nghiệp THPT 2026 - 2027</span>
            </div>
          </ScrollReveal>

          {/* Explosive Headline */}
          <ScrollReveal variant="fade-up" delay="delay-75">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12]">
              Bùng Nổ Điểm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">9+ Toán 12</span> <br className="hidden sm:inline" />
              Từ Giữa Kì 1 Đến Tốt Nghiệp — <span className="underline decoration-blue-500 decoration-wavy decoration-2">Chỉ 49.000đ</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal variant="fade-up" delay="delay-150">
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Hệ thống phòng luyện đề toán trực tuyến mô phỏng 100% chuẩn cấu trúc 3 phần mới Bộ GD&ĐT:
              <strong className="text-white font-semibold"> 12 Trắc nghiệm • 4 Đúng/Sai • 6 Trả lời ngắn</strong>.
              Tích hợp <span className="text-cyan-300 font-bold">Đáp án & Lời giải chi tiết từng bước</span> chuẩn phương pháp sư phạm.
            </p>
          </ScrollReveal>

          {/* Dual CTAs */}
          <ScrollReveal variant="fade-up" delay="delay-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={EXTERNAL_LOGIN_URL}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-base shadow-[0_15px_45px_rgba(37,99,235,0.45)] hover:shadow-[0_20px_55px_rgba(6,182,212,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 group"
              >
                <span>🚀 Đăng Nhập Làm Đề Miễn Phí</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#bang-gia"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 text-white font-bold text-base hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
              >
                <span>💎 Mở Khóa Full 40 Đề — 49K</span>
              </a>
            </div>
          </ScrollReveal>

          {/* 4 Animated Counter Cards */}
          <ScrollReveal variant="fade-up" delay="delay-300">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10">
              <div className="glass-panel rounded-2xl p-5 text-center space-y-1">
                <div className="text-3xl sm:text-4xl text-cyan-400">
                  <AnimatedCounter target={40} suffix="" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">Bộ Đề & Chuyên Đề</div>
                <div className="text-[11px] text-slate-400">Từ Giữa Kì 1 đến THPT</div>
              </div>

              <div className="glass-panel rounded-2xl p-5 text-center space-y-1">
                <div className="text-3xl sm:text-4xl text-blue-400">
                  <AnimatedCounter target={880} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">Câu Hỏi Chuẩn 2026</div>
                <div className="text-[11px] text-slate-400">Đầy đủ 3 phần ma trận mới</div>
              </div>

              <div className="glass-panel rounded-2xl p-5 text-center space-y-1">
                <div className="text-3xl sm:text-4xl text-emerald-400">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">Lời Giải Chi Tiết</div>
                <div className="text-[11px] text-slate-400">Tường tận phương pháp giải</div>
              </div>

              <div className="glass-panel rounded-2xl p-5 text-center space-y-1">
                <div className="text-3xl sm:text-4xl text-amber-400">
                  <AnimatedCounter target={49} suffix="K" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300">Trọn Gói Cả Năm</div>
                <div className="text-[11px] text-slate-400">Chỉ bằng 1 cốc trà sữa</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: LIVE EXAM ROOM & SIMULATOR      */}
      {/* ========================================== */}
      <section id="trai-nghiem" className="py-16 sm:py-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
                TRẢI NGHIỆM TRỰC QUAN LIVE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Phòng Luyện Đề Chuẩn Cấu Trúc Bộ Giáo Dục & Đào Tạo 2027
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                Bấm vào các đáp án bên dưới để trải nghiệm ngay cảm giác phòng thi thực tế cùng hướng dẫn giải chi tiết từng bước!
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Exam Window */}
          <ScrollReveal variant="zoom-pop">
            <div className="glass-panel rounded-3xl p-6 sm:p-9 border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white pl-2">
                    Đề 01: Khảo Sát Giữa Kì 1 — Toán 12 GDPT 2018
                  </div>
                </div>

                {/* Clock & Status */}
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5 animate-pulse text-red-400" />
                    <span>Thời gian: {formatTime(secondsLeft)}</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Phần I: Câu 1 / 12
                  </span>
                </div>
              </div>

              {/* Window Body: Question + Options + Detailed Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Left: Question and Options */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold">
                      Câu 1 (Nhận biết - 0.25đ)
                    </div>
                    <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                      Cho hàm số <span className="font-mono text-cyan-300 font-bold">y = f(x) = x³ - 3x² + 2</span>.
                      Giá trị cực đại của hàm số đã cho bằng bao nhiêu?
                    </p>
                  </div>

                  {/* 4 Interactive Option Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { key: "A", label: "y = 0", correct: false },
                      { key: "B", label: "y = 2", correct: true },
                      { key: "C", label: "y = -2", correct: false },
                      { key: "D", label: "y = 1", correct: false },
                    ].map((opt) => {
                      const isSelected = selectedOption === opt.key;
                      let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white";

                      if (isSelected) {
                        if (opt.correct) {
                          btnStyle = "bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                        } else {
                          btnStyle = "bg-red-500/25 border-red-400 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          className={`p-4 rounded-xl border text-left font-semibold transition-all duration-200 flex items-center justify-between group active:scale-[0.98] ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected
                                  ? opt.correct
                                    ? "bg-emerald-500 text-white"
                                    : "bg-red-500 text-white"
                                  : "bg-white/10 text-slate-300 group-hover:bg-white/20"
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span className="text-base font-mono">{opt.label}</span>
                          </div>

                          {isSelected && (
                            <span>
                              {opt.correct ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Banner */}
                  {selectedOption && (
                    <div
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-bold ${
                        selectedOption === "B"
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                          : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                      }`}
                    >
                      <span>
                        {selectedOption === "B"
                          ? "🎉 Chính xác! Bạn nhận được +0.25 điểm."
                          : "💡 Chưa chính xác! Bấm B để xem đáp án đúng và theo dõi hướng dẫn giải chi tiết."}
                      </span>
                      <button
                        onClick={() => setSelectedOption(null)}
                        className="text-[11px] underline opacity-80 hover:opacity-100 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Chọn lại
                      </button>
                    </div>
                  )}

                  {/* CTA button right below simulator */}
                  <a
                    href={EXTERNAL_LOGIN_URL}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-cyan-500/30 transition-all group"
                  >
                    <span>🚀 Vào Làm Full 22 Câu Đề 01 Miễn Phí</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Right: Detailed Solution Box */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="flex-1 p-5 rounded-2xl bg-[#030612]/80 border border-cyan-500/30 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                          <BookOpen className="w-4 h-4 text-cyan-300" />
                          <span>Hướng Dẫn Giải Chi Tiết</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                          Step-by-Step Solution
                        </span>
                      </div>

                      <div className="min-h-[160px] text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                        {aiText ? (
                          <p>{aiText}</p>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2 py-8">
                            <BookOpen className="w-8 h-8 text-cyan-400/50" />
                            <p className="text-xs">
                              Bấm vào bất kỳ phương án A, B, C, D bên trái để kích hoạt xem phân tích phương pháp giải chi tiết!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Thuật toán giải tối ưu 2026 - 2027</span>
                      <span className="text-emerald-400 font-bold">100% Đề Thi Có Lời Giải</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: 5-STAGE CURRICULUM & MARQUEE    */}
      {/* ========================================== */}
      <section id="lo-trinh" className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                LỘ TRÌNH TOÀN DIỆN 40 ĐỀ
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Chinh Phục 9+ Qua 5 Chặng Về Đích
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                Hệ thống đề thi được phân cấp rõ ràng theo từng mốc thời gian của năm học Lớp 12, đảm bảo kiến thức bám chắc điểm số trên lớp và bứt phá kỳ thi THPTQG.
              </p>
            </div>
          </ScrollReveal>

          {/* 5-Tab Stage Selector */}
          <ScrollReveal variant="slide-left">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl glass-panel max-w-4xl mx-auto">
              {STAGES.map((stage) => {
                const isActive = activeStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/40 scale-105"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{stage.title}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Active Stage Content Card */}
          <ScrollReveal variant="slide-right">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{activeStage.title}</h3>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${activeStage.badgeColor}`}>
                      {activeStage.badge}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">{activeStage.description}</p>
                </div>
                <div className="text-right sm:text-left">
                  <span className="text-xs text-slate-400 block">Số lượng đề:</span>
                  <span className="text-base font-black text-cyan-300">{activeStage.range}</span>
                </div>
              </div>

              {/* Exam List in Active Stage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeStage.exams.map((exam, idx) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/10 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors line-clamp-1">
                          {exam.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{exam.qCount} Câu hỏi</span>
                          <span>•</span>
                          <span>{exam.time}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {exam.isFree ? (
                        <a
                          href={EXTERNAL_LOGIN_URL}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1 shadow-md hover:scale-105 transition-all"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Làm Miễn Phí</span>
                        </a>
                      ) : (
                        <a
                          href="#bang-gia"
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1 border border-white/10 transition-all"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Mở Khóa VIP</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Infinite Dual-Direction Marquee Tickers */}
          <div className="space-y-4 pt-4 overflow-hidden">
            <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              10 Chuyên Đề Trọng Tâm & Tính Năng Nổi Bật
            </div>

            {/* Row 1: Left Ticker */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <div className="animate-marquee-left flex gap-3">
                {[...GRADE_12_TOPICS, ...GRADE_12_TOPICS].map((topic, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full glass-panel-light text-xs font-semibold text-cyan-200 whitespace-nowrap shadow-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2: Right Ticker */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <div className="animate-marquee-right flex gap-3">
                {[...STUDENT_ACHIEVEMENTS, ...STUDENT_ACHIEVEMENTS].map((ach, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full glass-panel-light text-xs font-semibold text-emerald-200 whitespace-nowrap shadow-sm"
                  >
                    {ach}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: 3D SPOTLIGHT BENTO GRID         */}
      {/* ========================================== */}
      <section id="uu-diem" className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                TÍNH NĂNG VƯỢT TRỘI
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Giao diện UI-UX Mô Phỏng Liquid Glass & Khảo Thí Thông Minh
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                Trải nghiệm học tập hiện đại chuẩn quốc tế, giúp thí sinh làm quen hoàn hảo với định dạng thi trên máy tính.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1 (Large - 7 cols): Split-View & Dock 3 Phần */}
            <div className="md:col-span-7">
              <ScrollReveal variant="fade-up" delay="delay-75">
                <div className="glass-panel glass-card-interactive rounded-3xl p-7 sm:p-9 h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Giao Diện Split-View & Thanh Dock 3 Phần
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Thiết kế chuẩn công thái học: chia màn hình làm 2 cột độc lập (Bên trái đề bài & hình vẽ chất lượng cao, bên phải bảng câu hỏi và ô chọn đáp án). Dễ dàng chuyển đổi nhanh giữa Phần I (Trắc nghiệm), Phần II (Đúng/Sai) và Phần III (Trả lời ngắn).
                    </p>
                  </div>

                  {/* UI Preview Mini Dock */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around text-xs font-bold text-slate-300">
                    <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white">Phần I: Câu 1-12</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/10">Phần II: Câu 1-4</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/10">Phần III: Câu 1-6</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bento Card 2 (5 cols): Detailed Step-by-Step Solutions */}
            <div className="md:col-span-5">
              <ScrollReveal variant="fade-up" delay="delay-150">
                <div className="glass-panel glass-card-interactive rounded-3xl p-7 sm:p-9 h-full flex flex-col justify-between space-y-6 border border-cyan-500/30">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Kho Lời Giải & Hướng Dẫn Chi Tiết Từng Câu
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Không còn nỗi lo gặp bài khó không có lời giải. Mỗi câu hỏi đều có đáp án chuẩn xác cùng hướng dẫn giải từng bước chi tiết, phân tích bản chất toán học và vạch trần các bẫy thường gặp.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-200">
                    📖 Lời giải sư phạm chuẩn mực • Trình bày công thức sắc nét
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bento Card 3 (5 cols): Chấm Điểm Lũy Tiến Tự Động */}
            <div className="md:col-span-5">
              <ScrollReveal variant="fade-up" delay="delay-200">
                <div className="glass-panel glass-card-interactive rounded-3xl p-7 sm:p-9 h-full flex flex-col justify-between space-y-6 border border-emerald-500/30">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Chấm Điểm Lũy Tiến Chuẩn Quy Tắc 2026 - 2027
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Thuật toán chấm điểm tự động mô phỏng chính xác quy định Bộ GD&ĐT: Câu Đúng/Sai tính điểm lũy tiến (đúng 1 ý 0.1đ, 2 ý 0.25đ, 3 ý 0.5đ, 4 ý trọn vẹn 1.0đ).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-200">
                    🎯 Minh bạch 100% • Báo cáo sai sót từng câu
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bento Card 4 (7 cols): Bảng Xếp Hạng & Siêu Tiết Kiệm */}
            <div className="md:col-span-7">
              <ScrollReveal variant="fade-up" delay="delay-300">
                <div className="glass-panel glass-card-interactive rounded-3xl p-7 sm:p-9 h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Đua Top Toàn Quốc & Tiết Kiệm 90% Chi Phí
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Bảng xếp hạng thời gian thực tạo động lực đua top mỗi ngày cùng hàng ngàn sĩ tử cả nước. Tiết kiệm hàng triệu đồng so với việc mua sách và in đề photo truyền thống.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-300">Chi phí in đề giấy: ~500.000đ</span>
                    <span className="text-emerald-400 font-extrabold text-sm sm:text-base">CACULUS: Chỉ 49.000đ Trọn Gói</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 6: HIGH-CONVERSION 49K VIP UNLOCK  */}
      {/* ========================================== */}
      <section id="bang-gia" className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-14">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                ĐẦU TƯ THÔNG MINH CHO TƯƠNG LAI
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Mở Khóa Toàn Bộ Kho 40 Đề — Chỉ 49K
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                Không thu phí duy trì hàng tháng. Một lần kích hoạt duy nhất sử dụng trọn vẹn cả năm học Lớp 12 đến khi hoàn thành kỳ thi Tốt Nghiệp THPT.
              </p>
            </div>
          </ScrollReveal>

          {/* Pricing Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Free Trial */}
            <ScrollReveal variant="fade-up" delay="delay-75">
              <div className="glass-panel rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border border-white/15">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TÀI KHOẢN TRẢI NGHIỆM</span>
                    <h3 className="text-2xl font-black text-white mt-1">Học Thử Miễn Phí</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">0đ</span>
                      <span className="text-xs text-slate-400">/ mãi mãi</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Luyện thi thử Đề 01 Giữa Kì 1 miễn phí</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Đồng hồ đếm ngược 90 phút chuẩn phòng thi</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Xem điểm số & kết quả cơ bản sau khi nộp</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-slate-400">
                      <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Không mở khóa 39 đề thi còn lại</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-slate-400">
                      <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Giới hạn xem lời giải chi tiết</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href={EXTERNAL_LOGIN_URL}
                    className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Bắt Đầu Học Thử</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Plan 2: VIP 49K (POPULAR SPOTLIGHT) */}
            <ScrollReveal variant="fade-up" delay="delay-150">
              <div className="glass-panel rounded-3xl p-7 sm:p-9 flex flex-col justify-between h-full border-2 border-blue-400 shadow-[0_0_50px_rgba(37,99,235,0.35)] relative scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                  🔥 KHUYÊN DÙNG NHIỀU NHẤT
                </div>

                <div className="space-y-6 pt-2">
                  <div>
                    <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">GÓI VIP TOÀN DIỆN CẢ NĂM</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">Gói VIP Toán 12</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-5xl font-black text-cyan-300">49.000đ</span>
                      <span className="text-xs text-slate-400 line-through">199.000đ</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400">Tiết kiệm 75% • Sử dụng trọn năm học</span>
                  </div>

                  <ul className="space-y-3.5 text-sm text-slate-200">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <strong className="text-white">Mở khóa 100% 40 đề & chuyên đề</strong>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Luyện đề không giới hạn lượt thi trong 365 ngày</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <strong className="text-cyan-300">Đáp án & lời giải chi tiết 100% câu hỏi</strong>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Xếp hạng thời gian thực và lưu lịch sử thi</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Tham gia nhóm Zalo VIP giải đáp thắc mắc 24/7</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href={ZALO_GROUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-500/40 hover:scale-105 transition-all"
                  >
                    <span>💎 Kích Hoạt VIP 49K Ngay</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Plan 3: Desk-Mate Combo 79K */}
            <ScrollReveal variant="fade-up" delay="delay-200">
              <div className="glass-panel rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full border border-purple-500/30">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">COMBO ĐÔI BẠN CÙNG TIẾN</span>
                    <h3 className="text-2xl font-black text-white mt-1">Combo 2 Tài Khoản</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-purple-300">79.000đ</span>
                      <span className="text-xs text-slate-400">/ 2 bạn (~39k/bạn)</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Cấp mã kích hoạt cho 2 tài khoản riêng biệt</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Đầy đủ 100% quyền lợi VIP của Gói 49K</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Thi đấu so kè điểm số trên Bảng xếp hạng</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Hỗ trợ kích hoạt nhanh chóng cùng lúc 2 nick</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href={ZALO_GROUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-6 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Đăng Ký Combo Đôi Bạn</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 3-Step Instant Manual Activation Workflow */}
          <ScrollReveal variant="fade-up">
            <div className="glass-panel rounded-3xl p-6 sm:p-9 border border-white/15 space-y-6">
              <h3 className="text-xl font-black text-white text-center">
                Quy Trình 3 Bước Kích Hoạt VIP Nhanh Chóng (2 - 5 Phút)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 font-black flex items-center justify-center mx-auto text-base">
                    1
                  </div>
                  <h4 className="font-bold text-white text-base">Đăng Nhập Tài Khoản</h4>
                  <p className="text-xs text-slate-300">
                    Truy cập{" "}
                    <a href={EXTERNAL_LOGIN_URL} className="text-cyan-300 underline font-semibold">
                      caculus-web-thpt.vercel.app/login
                    </a>{" "}
                    để đăng nhập nhanh bằng Google hoặc SĐT.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center mx-auto text-base">
                    2
                  </div>
                  <h4 className="font-bold text-white text-base">Chuyển Khoản 49.000đ</h4>
                  <p className="text-xs text-slate-300">
                    Quét mã QR hoặc chuyển khoản 49K với nội dung chuyển khoản là{" "}
                    <strong className="text-white">Email hoặc SĐT</strong> đăng ký của bạn.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center mx-auto text-base">
                    3
                  </div>
                  <h4 className="font-bold text-white text-base">Kích Hoạt Tức Thì</h4>
                  <p className="text-xs text-slate-300">
                    Nhắn tin xác nhận qua Zalo{" "}
                    <a href={ZALO_GROUP_URL} target="_blank" rel="noreferrer" className="text-emerald-300 underline font-bold">
                      Nhóm VIP
                    </a>{" "}
                    hoặc Hotline <strong className="text-white">{HOTLINE}</strong>. Tài khoản được nâng cấp trong 2-5 phút!
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 7: SEO FAQ ACCORDION & FOOTER      */}
      {/* ========================================== */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-8 relative z-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                GIẢI ĐÁP THẮC MẮC
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Câu Hỏi Thường Gặp
              </h2>
            </div>
          </ScrollReveal>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={idx} variant="fade-up" delay="delay-75">
                  <div className="glass-panel rounded-2xl border border-white/15 overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-white flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4 font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apple Liquid Glass Semantic Footer */}
      <footer className="border-t border-white/10 bg-[#02050f]/90 py-16 px-4 sm:px-8 relative z-10 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-base">
                  C
                </div>
                <span className="font-black text-lg text-white">CACULUS THPTQG</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Hệ thống phòng luyện đề toán 12 trực tuyến chuẩn ma trận kỳ thi Tốt Nghiệp THPT 2026 - 2027. Đầy đủ đáp án và lời giải chi tiết từng bước.
              </p>
              <div className="text-xs text-slate-400">
                Hotline Hỗ Trợ: <strong className="text-white font-mono">{HOTLINE}</strong> • Email: <strong className="text-white font-mono">{EMAIL}</strong>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Hệ Thống Luyện Thi</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={EXTERNAL_LOGIN_URL} className="hover:text-cyan-300 transition-colors">
                    Đăng Nhập Phòng Thi
                  </a>
                </li>
                <li>
                  <a href="#trai-nghiem" className="hover:text-cyan-300 transition-colors">
                    Thi Thử Đề 01 Miễn Phí
                  </a>
                </li>
                <li>
                  <a href="#lo-trinh" className="hover:text-cyan-300 transition-colors">
                    Lộ Trình 40 Đề & Chuyên Đề
                  </a>
                </li>
                <li>
                  <a href="#bang-gia" className="hover:text-cyan-300 transition-colors">
                    Nâng Cấp VIP 49.000đ
                  </a>
                </li>
              </ul>
            </div>

            {/* Channels & Socials */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Kênh Truyền Thông & Hỗ Trợ</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={ZALO_GROUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Cộng Đồng Zalo Học Sinh VIP 24/7</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Kênh YouTube Video Lời Giải Toán 12</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href={`tel:${HOTLINE}`} className="hover:text-cyan-300 transition-colors">
                    Hotline Kỹ Thuật: {HOTLINE}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 CACULUS THPTQG. Tất cả các quyền được bảo lưu. Thiết kế theo tiêu chuẩn UI-UX Mô Phỏng Liquid Glass.
            </div>
            <div className="flex gap-4">
              <a href="#trai-nghiem" className="hover:text-white transition-colors">Thi Thử</a>
              <a href="#bang-gia" className="hover:text-white transition-colors">Gói 49K</a>
              <a href={EXTERNAL_LOGIN_URL} className="hover:text-white transition-colors">Vào Thi</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================== */}
      {/* 5. FLOATING LIVE SOCIAL PROOF TOAST       */}
      {/* ========================================== */}
      <div
        className={`fixed bottom-5 left-5 z-40 max-w-sm transition-all duration-500 pointer-events-none ${
          socialVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <div className="glass-panel rounded-2xl p-3 sm:p-3.5 border border-cyan-400/40 shadow-2xl flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Zap className="w-4 h-4 fill-current text-yellow-300" />
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-slate-200 leading-snug line-clamp-2">
            {SOCIAL_PROOFS[socialProofIndex]}
          </div>
        </div>
      </div>
    </div>
  );
}
