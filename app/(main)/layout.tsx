import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 pb-24 md:pb-8 pt-[72px] md:pt-[80px]">
        {children}
      </main>
    </>
  );
}
