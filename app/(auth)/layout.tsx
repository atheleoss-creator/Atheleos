export const dynamic = "force-dynamic";

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center w-full px-4 relative z-10 overflow-hidden bg-black">
        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-accent-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>
    );
  }
