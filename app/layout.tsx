import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Navbar } from "@/components/shared/navbar/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Layout/Footer";

import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies to Watch",
  description: "Your ultimate movie watchlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-[#0F1117]`}>
        <Navbar />
        <main className="pt-16 mx-auto bg-[#0F1117] max-w-screen-xl w-full">
          <Hero />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
