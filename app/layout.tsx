import type { Metadata } from "next";
import "../assets/styles/main.scss";

export const metadata: Metadata = {
  title: "CrestLab Investment",
  description: "데이터 기반의 체계적 투자로 고객의 자산 가치를 극대화합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
