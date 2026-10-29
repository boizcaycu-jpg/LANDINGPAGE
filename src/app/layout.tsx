import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050814",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://caculus-web-thpt.vercel.app"),
  title: "PARABOL KHẢO THÍ 2026 | Hệ Thống Luyện Đề Toán 12 & Tốt Nghiệp THPT (Chỉ 49K)",
  description:
    "Bứt phá 9+ Toán 12 cùng PARABOL KHẢO THÍ: Trọn bộ 40 Đề & Chuyên đề từ Giữa Kì 1, Học Kì 1, Giữa Kì 2, Cuối Kì 2 đến Tốt Nghiệp THPT 2026 chuẩn cấu trúc mới (Trắc nghiệm, Đúng/Sai, Trả lời ngắn) tích hợp AI giải chi tiết chỉ 49.000đ.",
  keywords: [
    "parabol khảo thí",
    "parabol toán 12",
    "luyện đề toán 12",
    "ôn thi thpt quốc gia 2026",
    "đề thi giữa kì 1 toán 12",
    "đề toán đúng sai trả lời ngắn",
    "phòng luyện đề toán online",
    "đề thi toán thpt quốc gia 2026",
    "toán 12 chương trình mới 2018",
  ],
  authors: [{ name: "PARABOL KHẢO THÍ Team", url: "https://caculus-web-thpt.vercel.app" }],
  creator: "PARABOL KHẢO THÍ",
  publisher: "PARABOL KHẢO THÍ",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://caculus-web-thpt.vercel.app",
  },
  openGraph: {
    title: "PARABOL KHẢO THÍ 2026 | Hệ Thống Luyện Đề Toán 12 & Tốt Nghiệp THPT (Chỉ 49K)",
    description:
      "Bứt phá 9+ Toán 12 cùng PARABOL KHẢO THÍ: Trọn bộ 40 Đề & Chuyên đề từ Giữa Kì 1, Học Kì 1, Giữa Kì 2, Cuối Kì 2 đến Tốt Nghiệp THPT 2026 chuẩn cấu trúc mới (Trắc nghiệm, Đúng/Sai, Trả lời ngắn) tích hợp AI giải chi tiết chỉ 49.000đ.",
    type: "website",
    locale: "vi_VN",
    siteName: "PARABOL KHẢO THÍ",
    url: "https://caculus-web-thpt.vercel.app",
    images: [
      {
        url: "/logo-parabol-horizontal.png",
        width: 1200,
        height: 630,
        alt: "PARABOL KHẢO THÍ - Hệ Thống Luyện Đề Toán 12 & Tốt Nghiệp THPT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PARABOL KHẢO THÍ 2026 | Hệ Thống Luyện Đề Toán 12 & Tốt Nghiệp THPT (Chỉ 49K)",
    description:
      "Bứt phá 9+ Toán 12 cùng PARABOL KHẢO THÍ: Trọn bộ 40 Đề & Chuyên đề từ Giữa Kì 1 đến Tốt Nghiệp THPT 2026 chuẩn cấu trúc mới chỉ 49.000đ.",
    images: ["/logo-parabol-horizontal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://caculus-web-thpt.vercel.app/#organization",
        "name": "PARABOL KHẢO THÍ",
        "url": "https://caculus-web-thpt.vercel.app",
        "logo": "https://caculus-web-thpt.vercel.app/logo-parabol.png",
        "telephone": "0767588269",
        "email": "support.parabol.edu.vn@gmail.com",
        "sameAs": [
          "https://www.youtube.com/@siiuuuu77777",
          "https://zalo.me/g/mw6rrjaosw86oamzaxy1"
        ],
        "description": "Nền tảng khảo thí và luyện đề thi trắc nghiệm Toán 12 chuẩn cấu trúc mới Bộ Giáo dục và Đào tạo."
      },
      {
        "@type": "Course",
        "@id": "https://caculus-web-thpt.vercel.app/#course",
        "name": "Lộ Trình 40 Đề & Chuyên Đề Toán 12 PARABOL KHẢO THÍ (Chuẩn GDPT 2018)",
        "description": "Kho 40 đề thi & chuyên đề ôn tập Toán 12 từ Giữa Kì 1 đến Tốt nghiệp THPT 2026 chuẩn cấu trúc 3 phần mới có đáp án và hướng dẫn giải chi tiết từng bước.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "PARABOL KHẢO THÍ"
        },
        "offers": {
          "@type": "Offer",
          "price": "49000",
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock",
          "url": "https://caculus-web-thpt.vercel.app/login"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://caculus-web-thpt.vercel.app/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Cấu trúc đề thi Tốt nghiệp THPT môn Toán 2026 có gì mới?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Đề thi Toán 12 theo chương trình GDPT 2018 gồm 3 phần với 22 câu trong 90 phút: Phần I gồm 12 câu trắc nghiệm 4 lựa chọn (3.0 điểm); Phần II gồm 4 câu trắc nghiệm Đúng/Sai với thang điểm lũy tiến (4.0 điểm); Phần III gồm 6 câu trả lời ngắn điền số (3.0 điểm). PARABOL KHẢO THÍ mô phỏng chính xác 100% cấu trúc này."
            }
          },
          {
            "@type": "Question",
            "name": "Gói VIP 49.000đ của PARABOL KHẢO THÍ bao gồm những gì?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gói VIP 49.000đ của PARABOL KHẢO THÍ mở khóa toàn bộ 40 đề thi và chuyên đề từ Giữa Kì 1, Học Kì 1, Giữa Kì 2, Cuối Kì 2 đến Tốt Nghiệp THPT, không giới hạn lượt thi thử trong cả năm học, tích hợp đáp án và hướng dẫn giải chi tiết từng bước cùng bảng xếp hạng thi đua toàn quốc."
            }
          },
          {
            "@type": "Question",
            "name": "Có được làm thử đề thi miễn phí trước khi đăng ký không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có. PARABOL KHẢO THÍ luôn mở Đề 01 Giữa Kì 1 hoàn toàn miễn phí cho tất cả học sinh trải nghiệm phòng thi trực tuyến bấm giờ, chấm điểm tự động và xem đáp án giải thích chi tiết mà không cần trả bất kỳ khoản phí nào."
            }
          },
          {
            "@type": "Question",
            "name": "Kích hoạt tài khoản VIP 49K như thế nào và mất bao lâu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sau khi đăng nhập bằng Google hoặc số điện thoại, bạn quét mã QR chuyển khoản 49.000đ với nội dung tên tài khoản. Sau đó nhắn tin qua nhóm Zalo VIP hoặc Hotline 0767588269 (Email hỗ trợ: support.parabol.edu.vn@gmail.com), admin hỗ trợ kích hoạt tức thì chỉ trong vòng 2 đến 5 phút."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="vi" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-parabol-app.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-parabol-app.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen bg-[#050814] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
