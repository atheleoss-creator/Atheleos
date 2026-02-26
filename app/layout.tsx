import type { Metadata } from "next";
import { Outfit, Grand_Hotel } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
            {/* Navbar is now handled by conditional logic or specific page groups */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
