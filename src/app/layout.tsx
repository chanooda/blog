import { Header } from "@/components/layout";
import { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "김찬우 개발 블로그",
  description: "웹 개발자 김찬우의 개발 블로그",
  keywords:
    "김찬우, 개발블로그, 개발 블로그, 웹개발자, 웹 개발자, 웹 개발자 김찬우, 웹개발자 김찬우, 웹개발자김찬우",
  authors: { name: "김찬우" },
  openGraph: {
    title: "김찬우 개발 블로그",
    siteName: "김찬우 개발 블로그",
    description: "김찬우의 프로젝트와 글이 담긴 개발 블로그",
    url: "https://blog-lyart-six-70.vercel.app",
    type: "website",
    images:
      "https://raw.githubusercontent.com/chanooda/blog/main/public/thumbnail.PNG",
    locale: "ko_KR",
  },
};

const noto_sans_korea = Noto_Sans_KR({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto-kr",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setThemeMode = `
        if (JSON.parse(localStorage.dark)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      `;
  return (
    <html lang="ko" className={`w-full h-full`}>
      <head>
        <meta
          name="google-site-verification"
          content="c8HDgSkg-YFixY5XVB4WTyP1IZzh6A1dduLmqST9VBk"
        />
        <meta
          name="naver-site-verification"
          content="c40bb5936a2380744bf41b3d493e530ef12deb04"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`font-sans w-full h-full bg-white dark:bg-gray-900 text-gray-700  dark:text-gray-300 overflow-hidden ${noto_sans_korea.variable} font-sans`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: setThemeMode,
          }}
        ></script>
        <div className="w-full h-full mx-auto max-w-[1400px] flex flex-col">
          <Header />
          <div className="w-full h-full px-4 mt-24 overflow-auto ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
