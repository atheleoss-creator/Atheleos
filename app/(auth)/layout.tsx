export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center w-full px-4 relative z-10 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bg-surface via-bg-body to-black">
        {/* Subtle glowing orb behind auth cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>
    );
  }
