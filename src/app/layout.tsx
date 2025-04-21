import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "AI Test Automation",
  description: "Apply AI to automate your tests and generate test cases",
  icons: {
    icon: "https://ffo3gv1cf3ir.merlincdn.net/static_lib/assetsv2/common/images/favicon.ico?20250421_03",}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
