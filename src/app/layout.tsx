import { Header } from "@/components/layout";
import { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "김찬우 개발 블로그",
  description: "웹 개발자 김찬우 개발 블로그",
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
          <div className="w-full h-full px-4 mt-24 overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-500 dark:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
