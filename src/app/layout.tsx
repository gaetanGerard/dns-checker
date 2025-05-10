import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ThemeWrapper from "@/components/ThemeWrapper/ThemeWrapper";
import { ProfileProvider } from "@/context/profile";
import { NotificationProvider } from "@/context/notification";
import Header from "@/components/Header/Header";
import NotificationPortal from "@/components/Notification/NotificationPortal";
import "@/sass/styles.scss";

export const metadata: Metadata = {
  title: "DNS Checker",
  description: "An application to check the DNS availability of a domain name.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          <NotificationProvider>
            <ProfileProvider>
              <Header />
              <ErrorBoundary>{children}</ErrorBoundary>
              <NotificationPortal />
            </ProfileProvider>
          </NotificationProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
