import type { Metadata } from "next";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ThemeWrapper from "@/components/ThemeWrapper/ThemeWrapper";
import Header from "@/components/Header/Header";
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
          <Header />
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeWrapper>
      </body>
    </html>
  );
}
