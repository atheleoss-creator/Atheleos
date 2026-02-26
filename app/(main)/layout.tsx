import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 pb-20 md:pb-8 pt-4">
        {children}
      </main>
    </>
  );
}
