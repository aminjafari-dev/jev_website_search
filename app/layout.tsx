import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shelf — describe what you want",
  description:
    "Natural-language product search powered by TypeSafe Jev. Describe what you need; Shelf ranks matching products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
