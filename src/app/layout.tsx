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
};

const notoSansKorea = Noto_Sans_KR({
  subsets: ["latin"],
  weight: "400",
  variable: "--noto-sans-korea",
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
    <html lang="ko" className="w-full h-full">
      <head>
        <meta
          name="google-site-verification"
          content="c8HDgSkg-YFixY5XVB4WTyP1IZzh6A1dduLmqST9VBk"
        />
        <meta name="og:site_name" content="김찬우 개발 블로그" />
        <meta
          name="og:description"
          content="김찬우의 프로젝트와 글이 담긴 개발 블로그"
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://blog-lyart-six-70.vercel.app" />
        <meta name="og:image" content="/thumnnail.png" />
        <meta property="og:site_name" content="김찬우의 개발 블로그"></meta>
        <meta property="og:locale" content="ko_KR"></meta>
      </head>
      <body
        className={`${notoSansKorea.variable}
        font-sans w-full h-full bg-white dark:bg-gray-900 text-gray-700  dark:text-gray-300 overflow-hidden`}
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
