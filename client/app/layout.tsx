import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#f5f0e8] font-sans text-[#1a2640]">
        {children}
      </body>
    </html>
  );
}