import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeGov.AI - Next-Gen DAO Governance Made Simple",
  description:
    "Scale your DAO with simple yet powerful AI tools that make complex DAO governance seamless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(urbanist.className, "bg-black text-white antialiased")}
      >
        <div className="w-screen min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
