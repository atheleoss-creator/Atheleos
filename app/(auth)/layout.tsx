export const dynamic = "force-dynamic";

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen w-full bg-[#050505] overflow-x-hidden">
        {children}
      </div>
    );
  }
