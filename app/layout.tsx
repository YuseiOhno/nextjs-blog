import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Navigation from "./ui/Navigation";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className}`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="grow container mx-auto px-4 py-8">{children}</main>
          <footer className="border-t border-gray-900/10 p-4">
            <div className="container mx-auto text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Test. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
