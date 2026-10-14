import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/layout/Analytics";
import { LiveFooter, LiveHeader } from "@/components/layout/LiveChrome";
import { PreviewBridge } from "@/components/layout/PreviewBridge";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amanjain.in"),
  title: {
    default: "Dr. Aman Jain",
    template: "%s · Dr. Aman Jain",
  },
  description: "Transforming Talent Strategy into Purposeful Action",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full w-full min-w-0 flex-col overflow-x-clip" suppressHydrationWarning>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VM7LDRRP2D" strategy="afterInteractive" />
        <Script id="aman-jain-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VM7LDRRP2D');`}
        </Script>
        <Analytics />
        <style>{`nextjs-portal{display:none !important}`}</style>
        <Suspense fallback={<div className="h-[76px] w-full bg-white" />}>
          <LiveHeader />
        </Suspense>
        <main className="flex w-full min-w-0 flex-1 flex-col">{children}</main>
        <Suspense fallback={<div className="h-40 w-full bg-white" />}>
          <LiveFooter />
        </Suspense>
        <PreviewBridge />
      </body>
    </html>
  );
}
