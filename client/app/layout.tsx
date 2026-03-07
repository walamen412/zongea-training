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


import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://zongea-training.vercel.app"),

  title: "DBA Training Registration | Zongea",

  description:
    "Register for the Zongea Database Administration training program led by industry professionals.",

  openGraph: {
    title: "Zongea DBA Training Program",
    description:
      "Hands-on DBA training designed to build real job-ready skills.",
    url: "https://zongea-training.vercel.app",
    siteName: "Zongea",
    images: [
      {
        url: "/images/dba-training-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Zongea DBA Training",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zongea DBA Training Program",
    description:
      "Hands-on DBA training designed to build real job-ready skills.",
    images: ["/images/dba-training-banner.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/ZIT-FAV-01.png",
  },
};

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