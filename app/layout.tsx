import type { Metadata } from "next";
import { Outfit, Grand_Hotel } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const grandHotel = Grand_Hotel({
  subsets: ["latin"],
  variable: "--font-grand-hotel",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Atheleos - Premium Sports Social Network",
  description: "Join the elite sports community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${grandHotel.variable} antialiased font-sans bg-bg-body text-text-primary min-h-screen`}
      >
        <AuthProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 pb-20 md:pb-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
