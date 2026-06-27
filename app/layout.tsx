import type { Metadata } from "next";
import { Outfit, Grand_Hotel } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import { NotificationProvider } from "@/context/NotificationContext";
import NotificationToast from "@/components/NotificationToast";

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
  icons: {
    icon: "/atheleos.png",
    apple: "/atheleos.png",
  },
  verification: {
    google: "JRXgHPlZovtILo_bWg5Ru_1ssJRONv7OfaJVJeuinXw",
  },
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
          <SocketProvider>
            <NotificationProvider>
              <div className="relative min-h-screen flex flex-col">
                {/* Navbar is now handled by conditional logic or specific page groups */}
                {children}
              </div>
              <NotificationToast />
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
