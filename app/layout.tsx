import type { Metadata } from "next";
import "../assets/styles/main.scss";
import SkipToContent from "@/components/common/SkipToContent";
import AppHeader from "@/components/common/AppHeader";
import AppFooter from "@/components/common/AppFooter";
import LoginModal from "@/components/common/LoginModal";
import commonMsg from "@/messages/ko/common.json";
import commonData from "@/data/commonData.json";
import authMsg from "@/messages/ko/auth.json";

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
    <html lang="ko">
      <body>
        <SkipToContent label={commonMsg.skipToContent} />
        <AppHeader data={commonMsg.header} />
        <main id="main-content">{children}</main>
        <AppFooter company={commonData.company} messages={commonMsg.footer} />
        <LoginModal
          messages={authMsg.login}
          closeAriaLabel={authMsg.loginModal.closeAriaLabel}
        />
      </body>
    </html>
  );
}
